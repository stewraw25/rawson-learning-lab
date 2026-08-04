/**
 * Family cloud sync via Firebase Realtime Database (REST API)
 * Each kid's Mac writes only their profile; parent Mac reads both live.
 *
 * Pre-configured for Rawson Labs Firebase (Stewart's project).
 * One-click join on each Mac — no URL pasting needed.
 */

const SYNC_CONFIG_KEY = "rawson-learning-sync-config-v1";

/** Built-in cloud for this family — from Firebase project "Rawson Labs" */
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

/** One-click: use the built-in Rawson Labs cloud */
function enableBuiltinCloud() {
  setSyncConfig({
    databaseURL: BUILTIN_CLOUD.databaseURL,
    familyCode: BUILTIN_CLOUD.familyCode,
  });
  return getSyncConfig();
}

function isSyncEnabled() {
  const c = getSyncConfig();
  return !!(c && c.databaseURL && c.familyCode);
}

/** Quick read/write test so we know Firebase rules allow access */
async function testCloudConnection() {
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

/** Push one learner profile to the cloud */
async function pushProfile(learnerId, profile) {
  if (!isSyncEnabled()) return { skipped: true };
  const payload = {
    ...profile,
    id: learnerId,
    updatedAt: Date.now(),
  };
  await cloudPut(`profiles/${learnerId}`, payload);
  await cloudPut("meta", {
    lastActivityAt: Date.now(),
    lastActivityBy: learnerId,
    lastActivityName: profile.fullName || learnerId,
  });
  return { ok: true, updatedAt: payload.updatedAt };
}

/** Pull all profiles; merge into local state by newer updatedAt */
async function pullProfiles(state) {
  if (!isSyncEnabled()) return { skipped: true, state };
  const remote = await cloudGet("profiles");
  if (!remote || typeof remote !== "object") {
    return { ok: true, state, changed: false };
  }

  let changed = false;
  for (const id of Object.keys(LEARNERS)) {
    const remoteP = remote[id];
    if (!remoteP) continue;
    const localP = state.profiles[id] || defaultProfile(id);
    const remoteTs = remoteP.updatedAt || 0;
    const localTs = localP.updatedAt || 0;
    if (remoteTs > localTs) {
      state.profiles[id] = { ...defaultProfile(id), ...remoteP, id };
      changed = true;
    }
  }
  return { ok: true, state, changed };
}

/** First-time: upload both local profiles so family cloud is seeded */
async function seedCloudFromLocal(state) {
  if (!isSyncEnabled()) throw new Error("Configure sync first");
  for (const id of Object.keys(LEARNERS)) {
    const p = state.profiles[id] || defaultProfile(id);
    p.updatedAt = p.updatedAt || Date.now();
    state.profiles[id] = p;
    await cloudPut(`profiles/${id}`, p);
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
    "Do this once on each iMac.",
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
