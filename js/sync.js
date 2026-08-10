/**
 * Family cloud sync via Firebase Realtime Database (REST API)
 *
 * Cloud: Google Firebase project "Rawson Labs"
 * URL: https://rawson-labs-default-rtdb.europe-west1.firebasedatabase.app
 * Family: RAWSON-HOME
 *
 * Path: /families/RAWSON-HOME/profiles/{bella|george}
 */

const SYNC_CONFIG_KEY = "rawson-learning-sync-config-v1";

const BUILTIN_CLOUD = {
  databaseURL:
    "https://rawson-labs-default-rtdb.europe-west1.firebasedatabase.app",
  familyCode: "RAWSON-HOME",
};

function getSyncConfig() {
  try {
    const raw = localStorage.getItem(SYNC_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
}

function setSyncConfig(cfg) {
  if (!cfg) {
    localStorage.removeItem(SYNC_CONFIG_KEY);
    return;
  }
  localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify(cfg));
}

function enableBuiltinCloud() {
  setSyncConfig({
    databaseURL: BUILTIN_CLOUD.databaseURL,
    familyCode: BUILTIN_CLOUD.familyCode,
  });
  return getSyncConfig();
}

/** Always ensure family cloud is configured (fixes "forgot to turn on sync") */
function ensureCloudEnabled() {
  if (!isSyncEnabled()) enableBuiltinCloud();
  return isSyncEnabled();
}

function isSyncEnabled() {
  const c = getSyncConfig();
  return !!(c && c.databaseURL && c.familyCode);
}

async function testCloudConnection() {
  ensureCloudEnabled();
  const root = familyRoot();
  if (!root) throw new Error("Sync not configured");
  const probe = { ok: true, t: Date.now() };
  const putRes = await fetch(`${root}/_ping.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(probe),
  });
  if (!putRes.ok) {
    const text = await putRes.text();
    throw new Error(`Cannot write to cloud (${putRes.status}). ${text.slice(0, 100)}`);
  }
  const getRes = await fetch(`${root}/_ping.json`);
  if (!getRes.ok) {
    throw new Error(`Cannot read from cloud (${getRes.status})`);
  }
  return true;
}

function normaliseDatabaseURL(url) {
  let u = String(url || "").trim().replace(/\/$/, "");
  if (u.endsWith(".json")) u = u.replace(/\.json$/, "");
  return u;
}

function familyRoot() {
  const c = getSyncConfig();
  if (!c) return null;
  const base = normaliseDatabaseURL(c.databaseURL);
  const code = encodeURIComponent(String(c.familyCode).trim().toUpperCase());
  return `${base}/families/${code}`;
}

function generateFamilyCode() {
  const part = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RAWSON-${part()}-${part()}`;
}

/**
 * How much real progress a profile has — used so empty "fresh" profiles
 * never wipe real exam/lesson data from the cloud.
 */
function progressScore(p) {
  if (!p || typeof p !== "object") return 0;
  let score = 0;
  const diags = Object.values(p.diagnostics || {}).filter((d) => d && d.completed);
  score += diags.length * 1000;
  score += diags.reduce((a, d) => a + (Number(d.score) || 0), 0);
  score += (p.lessonHistory || []).length * 50;
  score += (p.examHistory || []).length * 35;
  // Week/month activity so cloud doesn't undervalue recent drills
  try {
    const tm = p.tutorMemory;
    if (tm && typeof tm === "object") {
      score += (Number(tm.weekDone) || 0) * 5;
      score += (Number(tm.monthDone) || 0) * 2;
    }
  } catch (_) {
    /* ignore */
  }
  score += Number(p.xp) || 0;
  score += (p.badges || []).length * 20;
  // completed lesson keys in courses (legacy flat + staged)
  for (const c of Object.values(p.courses || {})) {
    if (!c || typeof c !== "object") continue;
    if (c.completed && typeof c.completed === "object") {
      score += Object.keys(c.completed).length * 40;
    }
    if (c.stages && typeof c.stages === "object") {
      for (const st of Object.values(c.stages)) {
        if (st && st.completed && typeof st.completed === "object") {
          score += Object.keys(st.completed).length * 40;
        }
      }
      // Reward intermediate progress so it never loses a merge
      if ((c.activeStage || 1) >= 2) score += 80;
    }
  }
  return score;
}

function profileHasProgress(p) {
  return progressScore(p) > 0;
}

/** Prefer richer progress; only use timestamp as tie-breaker */
function preferRemoteProfile(localP, remoteP) {
  if (!remoteP) return false;
  if (!localP) return true;
  const rs = progressScore(remoteP);
  const ls = progressScore(localP);
  if (rs > ls) return true;
  if (rs < ls) return false;
  // equal progress — newer timestamp wins
  return (remoteP.updatedAt || 0) > (localP.updatedAt || 0);
}

async function cloudPut(path, data) {
  const root = familyRoot();
  if (!root) throw new Error("Cloud sync not configured");
  const url = `${root}/${path}.json`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloud save failed (${res.status}): ${text.slice(0, 120)}`);
  }
  return res.json();
}

async function cloudGet(path = "profiles") {
  const root = familyRoot();
  if (!root) throw new Error("Cloud sync not configured");
  const url = `${root}/${path}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloud load failed (${res.status}): ${text.slice(0, 120)}`);
  }
  return res.json();
}

/** Push one learner profile to the cloud (never push empty over rich remote) */
async function pushProfile(learnerId, profile) {
  ensureCloudEnabled();
  if (!isSyncEnabled()) return { skipped: true };

  let remote = null;
  try {
    remote = await cloudGet(`profiles/${learnerId}`);
  } catch {
    remote = null;
  }

  // Don't clobber richer cloud data with emptier local
  if (remote && progressScore(remote) > progressScore(profile)) {
    return { skipped: true, reason: "remote_richer", remote };
  }

  const payload = {
    ...profile,
    id: learnerId,
    updatedAt: Date.now(),
  };
  // Keep a fingerprint of progress for debugging
  payload._progressScore = progressScore(payload);

  await cloudPut(`profiles/${learnerId}`, payload);
  await cloudPut("meta", {
    lastActivityAt: Date.now(),
    lastActivityBy: learnerId,
    lastActivityName: profile.fullName || learnerId,
  });
  return { ok: true, updatedAt: payload.updatedAt };
}

/**
 * Pull all profiles; merge so real progress is never wiped by empty defaults.
 * Returns { state, changed, restored } — restored = ids loaded from cloud.
 */
async function pullProfiles(state) {
  ensureCloudEnabled();
  if (!isSyncEnabled()) return { skipped: true, state, changed: false, restored: [] };

  const remote = await cloudGet("profiles");
  if (!remote || typeof remote !== "object") {
    return { ok: true, state, changed: false, restored: [] };
  }

  let changed = false;
  const restored = [];

  for (const id of Object.keys(LEARNERS)) {
    const remoteP = remote[id];
    if (!remoteP) continue;
    const localP = state.profiles[id] || defaultProfile(id);

    if (preferRemoteProfile(localP, remoteP)) {
      state.profiles[id] = normalizeProfile(id, {
        ...remoteP,
        updatedAt: remoteP.updatedAt || localP.updatedAt || 0,
      });
      changed = true;
      if (profileHasProgress(remoteP)) restored.push(id);
    }
  }
  return { ok: true, state, changed, restored };
}

/**
 * After pull: if local is richer for any kid, push them up.
 */
async function pushRicherLocals(state) {
  ensureCloudEnabled();
  if (!isSyncEnabled()) return;
  for (const id of Object.keys(LEARNERS)) {
    const localP = state.profiles[id];
    if (!profileHasProgress(localP)) continue;
    try {
      await pushProfile(id, localP);
    } catch (e) {
      console.warn("pushRicherLocals", id, e);
    }
  }
}

/** Upload locals only when remote missing or local is richer */
async function seedCloudFromLocal(state) {
  ensureCloudEnabled();
  if (!isSyncEnabled()) throw new Error("Configure sync first");

  let remote = {};
  try {
    remote = (await cloudGet("profiles")) || {};
  } catch {
    remote = {};
  }

  for (const id of Object.keys(LEARNERS)) {
    const p = state.profiles[id] || defaultProfile(id);
    const r = remote[id];
    if (!r || progressScore(p) >= progressScore(r)) {
      p.updatedAt = Date.now();
      state.profiles[id] = p;
      await cloudPut(`profiles/${id}`, {
        ...p,
        id,
        _progressScore: progressScore(p),
      });
    }
  }
  await cloudPut("meta", {
    lastActivityAt: Date.now(),
    lastActivityBy: "parent",
    lastActivityName: "Family setup",
    createdAt: Date.now(),
  });
  return true;
}

async function fetchMeta() {
  ensureCloudEnabled();
  if (!isSyncEnabled()) return null;
  try {
    return await cloudGet("meta");
  } catch {
    return null;
  }
}

function inviteText() {
  return [
    "Rawson Learning Lab — Family Cloud",
    "",
    "1. Open: https://stewraw25.github.io/rawson-learning-lab/",
    "2. Parent zone → Family cloud",
    "3. Press: Turn on family cloud on this Mac",
    "",
    "Progress is stored in Google Firebase (Rawson Labs project).",
  ].join("\n");
}

function formatTime(ts) {
  if (!ts) return "—";
  try {
    return new Date(ts).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return "—";
  }
}

function cloudSystemDescription() {
  return {
    name: "Google Firebase Realtime Database",
    project: "Rawson Labs",
    family: BUILTIN_CLOUD.familyCode,
    url: BUILTIN_CLOUD.databaseURL,
  };
}
