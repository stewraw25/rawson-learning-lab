/**
 * Progress store + adaptive course engine
 * Saves to localStorage; export/import for backup across devices
 */

const STORAGE_KEY = "rawson-learning-lab-v1";

function defaultProfile(learnerId) {
  const learner = LEARNERS[learnerId];
  return {
    id: learnerId,
    fullName: learner.fullName,
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: null,
    badges: [],
    diagnostics: {
      // subject -> { completed, score, skillScores, date, answers }
    },
    courses: {
      // subject -> { path: [lessonKey...], completed: { lessonKey: true }, generatedAt }
    },
    lessonHistory: [],
    examHistory: [],
    daily: null, // { date, lessons, exams, goal }
    tutorMemory: null, // AI coach memory — see companion.js
    parentNotes: "",
    // Time on Learning Lab (seconds) — synced across Macs
    // totalSec / days = ACTIVE learning; idleSec / idleDays = sitting idle
    learningTime: {
      totalSec: 0,
      idleSec: 0,
      todaySec: 0,
      todayIdleSec: 0,
      todayKey: null,
      sessions: [], // { id, date, startMs, endMs, sec, idleSec }
      days: {}, // active seconds by date
      idleDays: {}, // idle seconds by date
    },
    // Adaptive difficulty: -3 easier … 0 … +3 harder (per subject)
    adapt: {
      bySubject: {},
    },
    // 0 = empty shell — must NOT beat real cloud progress on merge
    updatedAt: 0,
  };
}

/** Make sure a profile is always a safe object (never null diagnostics etc.) */
function normalizeProfile(learnerId, raw) {
  const base = defaultProfile(learnerId);
  if (!raw || typeof raw !== "object") return base;
  const p = { ...base, ...raw, id: learnerId };
  if (!Array.isArray(p.badges)) p.badges = [];
  if (!Array.isArray(p.lessonHistory)) p.lessonHistory = [];
  if (!Array.isArray(p.examHistory)) p.examHistory = [];
  if (typeof p.xp !== "number" || Number.isNaN(p.xp)) p.xp = Number(p.xp) || 0;
  if (typeof p.level !== "number" || Number.isNaN(p.level) || p.level < 1) {
    p.level = 1 + Math.floor((p.xp || 0) / 100);
  }
  if (!p.diagnostics || typeof p.diagnostics !== "object" || Array.isArray(p.diagnostics)) {
    p.diagnostics = {};
  }
  // Clean diagnostic entries
  for (const [sk, d] of Object.entries(p.diagnostics)) {
    if (!d || typeof d !== "object") {
      delete p.diagnostics[sk];
      continue;
    }
    if (d.answers && (typeof d.answers !== "object" || Array.isArray(d.answers))) {
      d.answers = {};
    }
    if (d.skillScores && (typeof d.skillScores !== "object" || Array.isArray(d.skillScores))) {
      d.skillScores = {};
    }
  }
  if (!p.courses || typeof p.courses !== "object" || Array.isArray(p.courses)) {
    p.courses = {};
  }
  // Fix course shapes from Firebase + migrate flat → staged courses
  for (const [sk, c] of Object.entries(p.courses)) {
    if (!c || typeof c !== "object") {
      delete p.courses[sk];
      continue;
    }
    p.courses[sk] = migrateCourseEntry(c);
  }
  // Restore ticks that a rebuild / Firebase array wipe dropped
  const subjectsToRepair = new Set([
    ...Object.keys(p.courses),
    ...Object.keys(p.diagnostics || {}),
  ]);
  for (const sk of subjectsToRepair) {
    try {
      recoverCompletionsFromHistory(p, sk);
    } catch (_) {
      /* ignore */
    }
  }
  if (p.daily && typeof p.daily !== "object") p.daily = null;
  if (p.tutorMemory && typeof p.tutorMemory !== "object") p.tutorMemory = null;
  if (typeof p.streak !== "number" || Number.isNaN(p.streak)) p.streak = Number(p.streak) || 0;
  if (typeof p.updatedAt !== "number") p.updatedAt = Number(p.updatedAt) || 0;
  if (!p.fullName) p.fullName = base.fullName;
  p.learningTime = ensureLearningTime(p);
  p.adapt = ensureAdapt(p);
  return p;
}

/** Per-subject adaptive difficulty (-3 easy … +3 hard) */
function ensureAdapt(profile) {
  const base = { bySubject: {} };
  let a =
    profile && profile.adapt && typeof profile.adapt === "object"
      ? { ...base, ...profile.adapt }
      : { ...base };
  if (!a.bySubject || typeof a.bySubject !== "object" || Array.isArray(a.bySubject)) {
    a.bySubject = {};
  }
  if (profile) profile.adapt = a;
  return a;
}

function ensureAdaptSubject(profile, subject) {
  const a = ensureAdapt(profile);
  if (!a.bySubject[subject] || typeof a.bySubject[subject] !== "object") {
    a.bySubject[subject] = {
      level: 0,
      correctStreak: 0,
      missStreak: 0,
      dontKnowCount: 0,
      correctCount: 0,
      answeredCount: 0,
    };
  }
  const s = a.bySubject[subject];
  s.level = Math.max(-3, Math.min(3, Math.round(Number(s.level) || 0)));
  s.correctStreak = Math.max(0, Math.floor(Number(s.correctStreak) || 0));
  s.missStreak = Math.max(0, Math.floor(Number(s.missStreak) || 0));
  s.dontKnowCount = Math.max(0, Math.floor(Number(s.dontKnowCount) || 0));
  s.correctCount = Math.max(0, Math.floor(Number(s.correctCount) || 0));
  s.answeredCount = Math.max(0, Math.floor(Number(s.answeredCount) || 0));
  return s;
}

function getAdaptLevel(profile, subject) {
  return ensureAdaptSubject(profile, subject).level;
}

function adaptLevelLabel(level) {
  const n = Math.max(-3, Math.min(3, Number(level) || 0));
  if (n <= -2) return "Easier questions";
  if (n === -1) return "A bit easier";
  if (n === 0) return "Just right";
  if (n === 1) return "A bit harder";
  return "Harder questions";
}

/**
 * Update difficulty from an answer.
 * result: "correct" | "wrong" | "dontKnow"
 */
function recordAdaptResult(profile, subject, result) {
  if (!profile || !subject) return 0;
  const s = ensureAdaptSubject(profile, subject);
  s.answeredCount++;
  if (result === "correct") {
    s.correctCount++;
    s.correctStreak++;
    s.missStreak = 0;
    // Getting loads right → harder
    if (s.correctStreak >= 5) {
      s.level = Math.min(3, s.level + 1);
      s.correctStreak = 0;
    } else if (s.correctStreak >= 3 && s.level < 2) {
      s.level = Math.min(3, s.level + 1);
      s.correctStreak = 1;
    }
  } else if (result === "dontKnow") {
    s.dontKnowCount++;
    s.missStreak++;
    s.correctStreak = 0;
    // Each "I don't know" eases; repeated ones ease faster
    const drop = s.missStreak >= 3 ? 2 : 1;
    s.level = Math.max(-3, s.level - drop);
  } else {
    // wrong
    s.missStreak++;
    s.correctStreak = 0;
    if (s.missStreak >= 3) {
      s.level = Math.max(-3, s.level - 1);
      s.missStreak = 1;
    } else if (s.missStreak >= 2 && s.level > 0) {
      s.level = Math.max(-3, s.level - 1);
    }
  }
  profile.updatedAt = Date.now();
  return s.level;
}

function mergeAdapt(a, b) {
  const out = { bySubject: {} };
  const A = a && typeof a === "object" ? a : {};
  const B = b && typeof b === "object" ? b : {};
  const keys = new Set([
    ...Object.keys(A.bySubject || {}),
    ...Object.keys(B.bySubject || {}),
  ]);
  for (const sub of keys) {
    const x = (A.bySubject && A.bySubject[sub]) || {};
    const y = (B.bySubject && B.bySubject[sub]) || {};
    out.bySubject[sub] = {
      level: Math.round(
        ((Number(x.level) || 0) + (Number(y.level) || 0)) / 2
      ),
      correctStreak: Math.max(Number(x.correctStreak) || 0, Number(y.correctStreak) || 0),
      missStreak: Math.max(Number(x.missStreak) || 0, Number(y.missStreak) || 0),
      dontKnowCount: Math.max(Number(x.dontKnowCount) || 0, Number(y.dontKnowCount) || 0),
      correctCount: Math.max(Number(x.correctCount) || 0, Number(y.correctCount) || 0),
      answeredCount: Math.max(Number(x.answeredCount) || 0, Number(y.answeredCount) || 0),
    };
  }
  return out;
}

/** Safe learning-time shape + roll “today” if the calendar day changed */
function ensureLearningTime(profile) {
  const base = {
    totalSec: 0,
    idleSec: 0,
    todaySec: 0,
    todayIdleSec: 0,
    todayKey: null,
    sessions: [],
    days: {},
    idleDays: {},
  };
  let lt =
    profile && profile.learningTime && typeof profile.learningTime === "object"
      ? { ...base, ...profile.learningTime }
      : { ...base };
  if (!lt.days || typeof lt.days !== "object" || Array.isArray(lt.days)) lt.days = {};
  if (!lt.idleDays || typeof lt.idleDays !== "object" || Array.isArray(lt.idleDays)) {
    lt.idleDays = {};
  }
  if (!Array.isArray(lt.sessions)) lt.sessions = [];
  lt.totalSec = Math.max(0, Math.floor(Number(lt.totalSec) || 0));
  lt.idleSec = Math.max(0, Math.floor(Number(lt.idleSec) || 0));
  lt.todaySec = Math.max(0, Math.floor(Number(lt.todaySec) || 0));
  lt.todayIdleSec = Math.max(0, Math.floor(Number(lt.todayIdleSec) || 0));
  const today = todayKey();
  if (lt.todayKey !== today) {
    lt.todayKey = today;
    lt.todaySec = Math.max(0, Math.floor(Number(lt.days[today]) || 0));
    lt.todayIdleSec = Math.max(0, Math.floor(Number(lt.idleDays[today]) || 0));
  }
  if (profile) profile.learningTime = lt;
  return lt;
}

/** Human duration: 45s · 12m · 1h 05m · 2h 30m */
function formatDuration(sec) {
  sec = Math.max(0, Math.floor(Number(sec) || 0));
  if (sec < 60) return sec + "s";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h <= 0) return m + "m";
  if (m <= 0) return h + "h";
  return h + "h " + String(m).padStart(2, "0") + "m";
}

function formatClockMs(ms) {
  try {
    return new Date(ms).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (_) {
    return "—";
  }
}

function formatDayLabel(dateStr) {
  if (!dateStr) return "—";
  const today = todayKey();
  if (dateStr === today) return "Today";
  try {
    const y = new Date(today + "T12:00:00");
    y.setDate(y.getDate() - 1);
    const yKey =
      y.getFullYear() +
      "-" +
      String(y.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(y.getDate()).padStart(2, "0");
    if (dateStr === yKey) return "Yesterday";
  } catch (_) {
    /* ignore */
  }
  try {
    return new Date(dateStr + "T12:00:00").toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  } catch (_) {
    return dateStr;
  }
}

/**
 * Add learning seconds while the child has the lab open.
 * kind: "active" (interacting) | "idle" (tab open but not doing anything)
 */
function addLearningSeconds(profile, seconds, atMs, kind) {
  if (!profile || !(seconds > 0)) return ensureLearningTime(profile);
  const now = typeof atMs === "number" ? atMs : Date.now();
  const isIdle = kind === "idle";
  const lt = ensureLearningTime(profile);
  const day = todayKey();
  const add = Math.floor(seconds);
  if (lt.todayKey !== day) {
    lt.todayKey = day;
    lt.todaySec = Math.max(0, Math.floor(Number(lt.days[day]) || 0));
    lt.todayIdleSec = Math.max(0, Math.floor(Number(lt.idleDays[day]) || 0));
  }

  if (isIdle) {
    lt.idleSec += add;
    lt.todayIdleSec += add;
    lt.idleDays[day] = Math.max(0, Math.floor(Number(lt.idleDays[day]) || 0)) + add;
  } else {
    lt.totalSec += add;
    lt.todaySec += add;
    lt.days[day] = Math.max(0, Math.floor(Number(lt.days[day]) || 0)) + add;
  }

  let open = lt.sessions.find((s) => s && s.open);
  if (!open) {
    open = {
      id: (profile.id || "kid") + "-" + now,
      date: day,
      startMs: now,
      endMs: now,
      sec: 0,
      idleSec: 0,
      open: true,
    };
    lt.sessions.push(open);
  }
  if (isIdle) {
    open.idleSec = Math.max(0, Math.floor(Number(open.idleSec) || 0)) + add;
  } else {
    open.sec = Math.max(0, Math.floor(Number(open.sec) || 0)) + add;
  }
  open.endMs = now;
  open.date = open.date || day;

  // Keep last 80 sessions + prune day maps to ~60 days
  if (lt.sessions.length > 80) lt.sessions = lt.sessions.slice(-80);
  for (const map of [lt.days, lt.idleDays]) {
    const dayKeys = Object.keys(map).sort();
    if (dayKeys.length > 60) {
      for (const k of dayKeys.slice(0, dayKeys.length - 60)) delete map[k];
    }
  }
  profile.learningTime = lt;
  profile.updatedAt = Math.max(Number(profile.updatedAt) || 0, now);
  return lt;
}

function beginLearningSession(profile) {
  if (!profile) return null;
  const lt = ensureLearningTime(profile);
  // Close any dangling open session
  for (const s of lt.sessions) {
    if (s && s.open) {
      s.open = false;
      if (!s.endMs) s.endMs = Date.now();
    }
  }
  const now = Date.now();
  const sess = {
    id: (profile.id || "kid") + "-" + now,
    date: todayKey(),
    startMs: now,
    endMs: now,
    sec: 0,
    idleSec: 0,
    open: true,
  };
  lt.sessions.push(sess);
  if (lt.sessions.length > 80) lt.sessions = lt.sessions.slice(-80);
  profile.learningTime = lt;
  return sess;
}

function endLearningSession(profile) {
  if (!profile) return;
  const lt = ensureLearningTime(profile);
  for (const s of lt.sessions) {
    if (s && s.open) {
      s.open = false;
      s.endMs = Date.now();
    }
  }
  profile.learningTime = lt;
}

function mergeLearningTime(a, b) {
  const A = ensureLearningTime({ learningTime: a || {} });
  const B = ensureLearningTime({ learningTime: b || {} });
  const byId = new Map();
  for (const s of [...(A.sessions || []), ...(B.sessions || [])]) {
    if (!s || !s.id) continue;
    const prev = byId.get(s.id);
    const active = Math.max(0, Math.floor(Number(s.sec) || 0));
    const idle = Math.max(0, Math.floor(Number(s.idleSec) || 0));
    const prevActive = prev ? Math.max(0, Math.floor(Number(prev.sec) || 0)) : -1;
    const prevIdle = prev ? Math.max(0, Math.floor(Number(prev.idleSec) || 0)) : -1;
    if (!prev || active + idle >= prevActive + prevIdle) {
      byId.set(s.id, {
        id: s.id,
        date: s.date || "",
        startMs: Number(s.startMs) || 0,
        endMs: Number(s.endMs) || Number(s.startMs) || 0,
        sec: Math.max(active, prevActive, 0),
        idleSec: Math.max(idle, prevIdle, 0),
        open: false,
      });
    }
  }
  const sessions = [...byId.values()].sort(
    (x, y) => (x.startMs || 0) - (y.startMs || 0)
  );
  const days = {};
  const idleDays = {};
  for (const s of sessions) {
    if (!s.date) continue;
    days[s.date] = (days[s.date] || 0) + (s.sec || 0);
    idleDays[s.date] = (idleDays[s.date] || 0) + (s.idleSec || 0);
  }
  for (const src of [A.days, B.days]) {
    for (const [k, v] of Object.entries(src || {})) {
      days[k] = Math.max(days[k] || 0, Math.floor(Number(v) || 0));
    }
  }
  for (const src of [A.idleDays, B.idleDays]) {
    for (const [k, v] of Object.entries(src || {})) {
      idleDays[k] = Math.max(idleDays[k] || 0, Math.floor(Number(v) || 0));
    }
  }
  const totalSec = Math.max(
    A.totalSec || 0,
    B.totalSec || 0,
    Object.values(days).reduce((n, v) => n + (Number(v) || 0), 0)
  );
  const idleSec = Math.max(
    A.idleSec || 0,
    B.idleSec || 0,
    Object.values(idleDays).reduce((n, v) => n + (Number(v) || 0), 0)
  );
  const today = todayKey();
  return {
    totalSec,
    idleSec,
    todaySec: Math.max(0, Math.floor(Number(days[today]) || 0)),
    todayIdleSec: Math.max(0, Math.floor(Number(idleDays[today]) || 0)),
    todayKey: today,
    sessions: sessions.slice(-80),
    days,
    idleDays,
  };
}

/** Summary for scoreboards / parent view */
function learningTimeSummary(profile) {
  const lt = ensureLearningTime(profile || {});
  const today = todayKey();
  const todayActive =
    lt.todayKey === today ? lt.todaySec : Math.floor(Number(lt.days[today]) || 0);
  const todayIdle =
    lt.todayKey === today
      ? lt.todayIdleSec
      : Math.floor(Number(lt.idleDays[today]) || 0);

  const dayKeys = [
    ...new Set([
      ...Object.keys(lt.days || {}),
      ...Object.keys(lt.idleDays || {}),
    ]),
  ]
    .filter(
      (d) => (Number(lt.days[d]) || 0) > 0 || (Number(lt.idleDays[d]) || 0) > 0
    )
    .sort()
    .reverse()
    .slice(0, 7);

  const recentDays = dayKeys.map((date) => {
    const active = Math.floor(Number(lt.days[date]) || 0);
    const idle = Math.floor(Number(lt.idleDays[date]) || 0);
    const daySessions = (lt.sessions || [])
      .filter(
        (s) =>
          s && s.date === date && ((s.sec || 0) > 0 || (s.idleSec || 0) > 0)
      )
      .sort((a, b) => (a.startMs || 0) - (b.startMs || 0));
    const slots = daySessions.map((s) => {
      const start = formatClockMs(s.startMs);
      const end = formatClockMs(s.endMs || s.startMs);
      return {
        start,
        end,
        sec: s.sec || 0,
        idleSec: s.idleSec || 0,
        label: start === end ? start : start + "–" + end,
        open: !!s.open,
      };
    });
    return {
      date,
      label: formatDayLabel(date),
      sec: active,
      idleSec: idle,
      dur: formatDuration(active),
      idleDur: formatDuration(idle),
      slots,
      slotText: slots.map((s) => s.label + (s.open ? " (now)" : "")).join(", "),
    };
  });

  return {
    totalSec: lt.totalSec,
    idleSec: lt.idleSec,
    todaySec: todayActive,
    todayIdleSec: todayIdle,
    totalLabel: formatDuration(lt.totalSec),
    idleLabel: formatDuration(lt.idleSec),
    todayLabel: formatDuration(todayActive),
    todayIdleLabel: formatDuration(todayIdle),
    recentDays,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createFreshState();
    const data = JSON.parse(raw);
    if (!data.profiles || typeof data.profiles !== "object") {
      return createFreshState();
    }
    // Ensure both kids exist and are safe shapes
    for (const id of Object.keys(LEARNERS)) {
      data.profiles[id] = normalizeProfile(id, data.profiles[id]);
    }
    // Drop invalid active learner
    if (data.activeLearner && !LEARNERS[data.activeLearner]) {
      data.activeLearner = null;
    }
    return data;
  } catch {
    return createFreshState();
  }
}

function createFreshState() {
  return {
    version: 1,
    activeLearner: null,
    profiles: {
      bella: defaultProfile("bella"),
      george: defaultProfile("george"),
    },
  };
}

function saveState(state) {
  // Bump updatedAt on active profile when they have progress or are saving work
  if (state.activeLearner && state.profiles[state.activeLearner]) {
    const p = state.profiles[state.activeLearner];
    p.updatedAt = Date.now();
    p.id = state.activeLearner;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("localStorage save failed", e);
    throw e;
  }
}

/** Force-save a specific learner (e.g. after exam) to local + cloud */
async function persistLearner(state, learnerId) {
  if (!state.profiles[learnerId]) return;
  state.profiles[learnerId].updatedAt = Date.now();
  state.profiles[learnerId].id = learnerId;
  saveState(state);
  if (typeof ensureCloudEnabled === "function") ensureCloudEnabled();
  if (typeof pushProfile === "function" && typeof isSyncEnabled === "function" && isSyncEnabled()) {
    return pushProfile(learnerId, state.profiles[learnerId]);
  }
  return { skipped: true };
}

function exportState(state) {
  return JSON.stringify(state, null, 2);
}

function importState(json) {
  const data = JSON.parse(json);
  if (!data.profiles) throw new Error("Invalid backup");
  for (const id of Object.keys(LEARNERS)) {
    if (!data.profiles[id]) data.profiles[id] = defaultProfile(id);
  }
  data.version = 1;
  return data;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function updateStreak(profile) {
  const today = todayKey();
  if (profile.lastActiveDate === today) return;
  if (!profile.lastActiveDate) {
    profile.streak = 1;
  } else {
    const prev = new Date(profile.lastActiveDate);
    const now = new Date(today);
    const diff = Math.round((now - prev) / 86400000);
    profile.streak = diff === 1 ? (profile.streak || 0) + 1 : 1;
  }
  profile.lastActiveDate = today;
  if (profile.streak >= 3) unlockBadge(profile, "streak_3");
  if (profile.streak >= 7) unlockBadge(profile, "streak_7");
}

function addXp(profile, amount) {
  profile.xp += amount;
  const newLevel = 1 + Math.floor(profile.xp / 100);
  profile.level = newLevel;
}

function unlockBadge(profile, badgeId) {
  if (!profile || !badgeId) return false;
  if (!Array.isArray(profile.badges)) profile.badges = [];
  if (!profile.badges.includes(badgeId)) {
    profile.badges.push(badgeId);
    return true;
  }
  return false;
}

function questionsForLearner(subject, learnerId) {
  const stage = LEARNERS[learnerId].stage;
  return DIAGNOSTICS[subject].filter(
    (q) => q.stage === "both" || q.stage === stage
  );
}

function normaliseAnswer(str) {
  return String(str ?? "")
    .trim()
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/%/g, "")
    .replace(/\s+/g, " ");
}

function checkAnswer(question, userAnswer) {
  if (question.type === "multi") {
    return Number(userAnswer) === question.answer;
  }
  const user = normaliseAnswer(userAnswer);
  if (question.accept && question.accept.length) {
    return question.accept.some((a) => normaliseAnswer(a) === user);
  }
  return normaliseAnswer(question.answer) === user;
}

/**
 * Full Rawson pathway: current level → GCSE A* (grades 8–9).
 * Each stage unlocks when the previous stage is 100% complete for that subject.
 */
const COURSE_STAGES = {
  1: {
    id: 1,
    name: "Foundation",
    emoji: "🌱",
    short: "F",
    gradeBand: "Entry · secure the basics",
    blurb: "Placement-based first course — close the gaps.",
  },
  2: {
    id: 2,
    name: "Intermediate",
    emoji: "🚀",
    short: "I",
    gradeBand: "Grades 2–3 · building fluency",
    blurb: "Harder practice — next step after Foundation.",
  },
  3: {
    id: 3,
    name: "Secure",
    emoji: "🔷",
    short: "S",
    gradeBand: "Grades 3–4 · KS3 secure",
    blurb: "Secondary-ready depth — ready for GCSE Core.",
  },
  4: {
    id: 4,
    name: "GCSE Core",
    emoji: "📘",
    short: "C",
    gradeBand: "Grades 4–5 · Foundation tier",
    blurb: "GCSE Foundation tier skills across the full specification map.",
  },
  5: {
    id: 5,
    name: "GCSE Higher",
    emoji: "🎯",
    short: "H",
    gradeBand: "Grades 5–7 · Higher tier",
    blurb: "Higher-tier methods, multi-step problems and exam technique.",
  },
  6: {
    id: 6,
    name: "A* Mastery",
    emoji: "⭐",
    short: "A*",
    gradeBand: "Grades 8–9 · A* stretch",
    blurb: "Grade 8–9 stretch, synthesis and top-band exam craft.",
  },
};

const MAX_COURSE_STAGE = 6;

/** XP base per lesson by stage (higher stages reward more) */
function stageXpBase(stageNum) {
  const s = Number(stageNum) || 1;
  return 20 + s * 10; // 30 … 80
}

/** Lookup teach bank for a stage number */
function getStageTeachBank(stageNum) {
  const stage = Number(stageNum) || 1;
  if (stage <= 1) {
    return typeof TEACH_MODULES !== "undefined" ? TEACH_MODULES : null;
  }
  const name = `TEACH_MODULES_STAGE${stage}`;
  try {
    // eslint-disable-next-line no-eval
    const bank = typeof globalThis !== "undefined" ? globalThis[name] : undefined;
    if (bank) return bank;
  } catch (_) {
    /* ignore */
  }
  // Browser globals (no modules)
  if (stage === 2 && typeof TEACH_MODULES_STAGE2 !== "undefined") return TEACH_MODULES_STAGE2;
  if (stage === 3 && typeof TEACH_MODULES_STAGE3 !== "undefined") return TEACH_MODULES_STAGE3;
  if (stage === 4 && typeof TEACH_MODULES_STAGE4 !== "undefined") return TEACH_MODULES_STAGE4;
  if (stage === 5 && typeof TEACH_MODULES_STAGE5 !== "undefined") return TEACH_MODULES_STAGE5;
  if (stage === 6 && typeof TEACH_MODULES_STAGE6 !== "undefined") return TEACH_MODULES_STAGE6;
  return null;
}

/** Cloud-safe stage key. Firebase RTDB turns {1: …} into [null, …] and wipes progress. */
function stageStorageKey(n) {
  return `s${Number(n) || 1}`;
}

function parseStageStorageKey(k) {
  if (typeof k === "number" && Number.isFinite(k)) return k;
  const s = String(k || "");
  if (/^s\d+$/i.test(s)) return Number(s.slice(1));
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

function normaliseStageRecord(st) {
  if (!st || typeof st !== "object") {
    return { path: [], completed: {}, generatedAt: 0, focusMessage: "" };
  }
  return {
    path: Array.isArray(st.path) ? st.path.slice() : [],
    completed:
      st.completed && typeof st.completed === "object" && !Array.isArray(st.completed)
        ? { ...st.completed }
        : {},
    generatedAt: st.generatedAt || 0,
    focusMessage: st.focusMessage || "",
  };
}

/**
 * Pull stages out of every shape we have shipped:
 *   { s1: … }           — cloud-safe
 *   { 1: … } / { "1" }  — in-memory / localStorage
 *   [null, stage1]      — Firebase array (the wipe bug)
 *   { path, completed } — original flat course
 */
function collectStageMap(c) {
  const out = {};
  const src = c && c.stages;
  if (Array.isArray(src)) {
    src.forEach((st, i) => {
      if (!st || typeof st !== "object") return;
      const n = i >= 1 ? i : 1;
      out[n] = normaliseStageRecord(st);
    });
  } else if (src && typeof src === "object") {
    for (const [k, st] of Object.entries(src)) {
      if (!st || typeof st !== "object") continue;
      const n = parseStageStorageKey(k);
      if (!Number.isFinite(n) || n < 1) continue;
      out[n] = normaliseStageRecord(st);
    }
  }
  if (!out[1] && (Array.isArray(c.path) || c.completed)) {
    out[1] = normaliseStageRecord({
      path: c.path,
      completed: c.completed,
      generatedAt: c.generatedAt,
      focusMessage: c.focusMessage,
    });
  }
  return out;
}

/** Normalise one subject course: flat / Firebase-array / s-keys → { activeStage, stages } */
function migrateCourseEntry(c) {
  if (!c || typeof c !== "object") return null;
  const stages = collectStageMap(c);
  const active = Number(c.activeStage) || 1;
  return {
    activeStage: active >= 1 ? active : 1,
    stages,
  };
}

/** Write stages as s1/s2 so Firebase cannot turn them into an array. */
function serializeCourseEntry(c) {
  const m = migrateCourseEntry(c);
  if (!m) return null;
  const stages = {};
  for (const [k, st] of Object.entries(m.stages || {})) {
    const n = Number(k);
    if (!Number.isFinite(n) || n < 1 || !st) continue;
    stages[stageStorageKey(n)] = normaliseStageRecord(st);
  }
  return {
    activeStage: Number(m.activeStage) || 1,
    stages,
  };
}

/** Union two course maps so cloud sync cannot drop completed lessons. */
function mergeCourseEntry(a, b) {
  const A = migrateCourseEntry(a) || { activeStage: 1, stages: {} };
  const B = migrateCourseEntry(b) || { activeStage: 1, stages: {} };
  const stages = {};
  const keys = new Set([
    ...Object.keys(A.stages || {}),
    ...Object.keys(B.stages || {}),
  ]);
  for (const k of keys) {
    const sa = A.stages[k] || { path: [], completed: {}, generatedAt: 0, focusMessage: "" };
    const sb = B.stages[k] || { path: [], completed: {}, generatedAt: 0, focusMessage: "" };
    const completed = { ...(sb.completed || {}) };
    for (const [id, rec] of Object.entries(sa.completed || {})) {
      const prev = completed[id];
      if (!prev || (Number(rec?.score) || 0) >= (Number(prev?.score) || 0)) {
        completed[id] = rec;
      }
    }
    const path =
      (sa.path || []).length >= (sb.path || []).length ? sa.path || [] : sb.path || [];
    stages[k] = {
      path,
      completed,
      generatedAt: Math.max(Number(sa.generatedAt) || 0, Number(sb.generatedAt) || 0),
      focusMessage: sa.focusMessage || sb.focusMessage || "",
    };
  }
  return {
    activeStage: Math.max(Number(A.activeStage) || 1, Number(B.activeStage) || 1),
    stages,
  };
}

function mergeHistory(a, b) {
  const out = [];
  const seen = new Set();
  const push = (h) => {
    if (!h || typeof h !== "object") return;
    const key = [h.date || "", h.subject || "", h.skillId || "", h.stage || "", h.score || ""].join("|");
    if (seen.has(key)) return;
    seen.add(key);
    out.push(h);
  };
  (Array.isArray(a) ? a : []).forEach(push);
  (Array.isArray(b) ? b : []).forEach(push);
  return out;
}

/** Keep the best of both profiles. Never replace a working local with a wiped cloud copy. */
function mergeProfiles(localP, remoteP, learnerId) {
  if (!remoteP) return localP;
  if (!localP) return normalizeProfile(learnerId, remoteP);
  const L = normalizeProfile(learnerId, localP);
  const R = normalizeProfile(learnerId, remoteP);
  const out = { ...R, ...L, id: learnerId };
  out.xp = Math.max(Number(L.xp) || 0, Number(R.xp) || 0);
  out.level = Math.max(Number(L.level) || 1, Number(R.level) || 1);
  out.streak = Math.max(Number(L.streak) || 0, Number(R.streak) || 0);
  out.updatedAt = Math.max(Number(L.updatedAt) || 0, Number(R.updatedAt) || 0);
  out.badges = [...new Set([...(L.badges || []), ...(R.badges || [])])];
  out.lessonHistory = mergeHistory(L.lessonHistory, R.lessonHistory);
  out.examHistory = mergeHistory(L.examHistory, R.examHistory);
  out.diagnostics = { ...(R.diagnostics || {}), ...(L.diagnostics || {}) };
  for (const sub of new Set([
    ...Object.keys(R.diagnostics || {}),
    ...Object.keys(L.diagnostics || {}),
  ])) {
    const ld = L.diagnostics?.[sub];
    const rd = R.diagnostics?.[sub];
    if (ld && rd) {
      out.diagnostics[sub] = {
        ...rd,
        ...ld,
        completed: !!(ld.completed || rd.completed),
        score: Math.max(Number(ld.score) || 0, Number(rd.score) || 0),
        skillScores: { ...(rd.skillScores || {}), ...(ld.skillScores || {}) },
      };
    }
  }
  out.courses = {};
  const courseKeys = new Set([
    ...Object.keys(L.courses || {}),
    ...Object.keys(R.courses || {}),
  ]);
  for (const sub of courseKeys) {
    if (L.courses?.[sub] && R.courses?.[sub]) {
      out.courses[sub] = mergeCourseEntry(L.courses[sub], R.courses[sub]);
    } else {
      out.courses[sub] = migrateCourseEntry(L.courses?.[sub] || R.courses?.[sub]);
    }
  }
  if (L.tutorMemory || R.tutorMemory) {
    out.tutorMemory = { ...(R.tutorMemory || {}), ...(L.tutorMemory || {}) };
  }
  out.learningTime = mergeLearningTime(L.learningTime, R.learningTime);
  out.adapt = mergeAdapt(L.adapt, R.adapt);
  return normalizeProfile(learnerId, out);
}

/** Copy a profile for localStorage / Firebase without mutating live state. */
function prepareProfileForCloud(profile, learnerId) {
  if (!profile || typeof profile !== "object") return profile;
  const p = { ...profile, id: learnerId || profile.id };
  const courses = {};
  for (const [sub, c] of Object.entries(p.courses || {})) {
    const ser = serializeCourseEntry(c);
    if (ser) courses[sub] = ser;
  }
  p.courses = courses;
  return p;
}

/**
 * Re-apply completed ticks from lessonHistory.
 * Rebuilds were wiping the path; history still has every lesson the kids finished.
 */
function recoverCompletionsFromHistory(profile, subject) {
  if (!profile || !subject) return null;
  if (!profile.courses || typeof profile.courses !== "object") profile.courses = {};
  if (!profile.courses[subject]) {
    profile.courses[subject] = { activeStage: 1, stages: {} };
  } else {
    profile.courses[subject] = migrateCourseEntry(profile.courses[subject]);
  }
  const c = profile.courses[subject];
  const hist = Array.isArray(profile.lessonHistory) ? profile.lessonHistory : [];
  for (const h of hist) {
    if (!h || h.subject !== subject || !h.skillId) continue;
    const stage = Number(h.stage) || 1;
    if (!c.stages[stage]) {
      c.stages[stage] = normaliseStageRecord(null);
    }
    const done = c.stages[stage].completed;
    const prev = done[h.skillId];
    const score = Number(h.score);
    const better =
      !prev || (Number.isFinite(score) && score > (Number(prev.score) || 0));
    if (better) {
      done[h.skillId] = {
        score: Number.isFinite(score) ? score : Number(prev && prev.score) || 0,
        date: h.date || (prev && prev.date) || todayKey(),
        stage,
      };
    }
  }
  return c;
}

function ensureCourseShape(profile, subject) {
  if (!profile.courses || typeof profile.courses !== "object") profile.courses = {};
  const c = profile.courses[subject];
  if (!c) return null;
  profile.courses[subject] = migrateCourseEntry(c);
  // Normalise string stage keys from Firebase ("1") → number keys
  const stages = profile.courses[subject].stages || {};
  const fixed = {};
  for (const [k, st] of Object.entries(stages)) {
    const n = Number(k);
    if (!Number.isNaN(n) && st) fixed[n] = st;
  }
  profile.courses[subject].stages = fixed;
  return profile.courses[subject];
}

/**
 * After placement: always ensure a non-empty lesson path for the active stage.
 * Keeps any completed lesson scores already saved.
 */
function ensureCourseReady(profile, subject) {
  if (!profile?.diagnostics?.[subject]?.completed) return null;
  if (!profile.courses) profile.courses = {};
  recoverCompletionsFromHistory(profile, subject);
  if (!profile.courses[subject]) {
    buildCourse(profile, subject, 1);
  } else {
    ensureCourseShape(profile, subject);
  }
  const c = profile.courses[subject];
  if (!c) return null;
  const stage = Number(c.activeStage) || 1;
  c.activeStage = stage;
  let st = c.stages[stage];
  const keptCompleted = (st && st.completed) || {};
  if (!st || !Array.isArray(st.path) || st.path.length === 0) {
    buildCourse(profile, subject, stage);
    st = c.stages[stage];
    if (st) {
      st.completed = { ...keptCompleted, ...(st.completed || {}) };
    }
  }
  // Still empty? force unfiltered skill path so kids are never stuck
  if (!st || !st.path || !st.path.length) {
    const skillIds = Object.keys(SKILLS[subject] || {});
    c.stages[stage] = {
      path: skillIds,
      completed: { ...keptCompleted, ...((st && st.completed) || {}) },
      generatedAt: Date.now(),
      focusMessage:
        (st && st.focusMessage) ||
        `Your ${SUBJECTS[subject].name} lessons are ready — start at the top!`,
    };
  }
  if (!profile._autoProgressing) {
    profile._autoProgressing = true;
    try {
      autoProgressStages(profile, subject);
    } finally {
      profile._autoProgressing = false;
    }
  }
  return c.stages[c.activeStage] || c.stages[stage];
}

/** If Foundation (or any stage) is finished, move them on. Don't send them back to Q1. */
function autoProgressStages(profile, subject) {
  if (!profile?.diagnostics?.[subject]?.completed) return;
  recoverCompletionsFromHistory(profile, subject);
  let guard = 0;
  while (guard++ < MAX_COURSE_STAGE) {
    const stage = Number(profile.courses?.[subject]?.activeStage) || 1;
    if (!isStageComplete(profile, subject, stage)) break;
    if (stage >= MAX_COURSE_STAGE) break;
    const next = stage + 1;
    if (!canAccessStage(profile, subject, next)) break;
    startCourseStage(profile, subject, next);
    if (!profile.courses[subject].stages[next]?.path?.length) {
      buildCourse(profile, subject, next);
    }
  }
}

function getCourseStageData(profile, subject, stageNum) {
  const c = ensureCourseShape(profile, subject);
  if (!c) return null;
  const stage = Number(stageNum) || Number(c.activeStage) || 1;
  return c.stages[stage] || c.stages[String(stage)] || null;
}

function getActiveStage(profile, subject) {
  const c = ensureCourseShape(profile, subject);
  return c?.activeStage || 1;
}

/** True if every lesson on this stage path is completed */
function isStageComplete(profile, subject, stageNum) {
  const st = getCourseStageData(profile, subject, stageNum);
  if (!st || !Array.isArray(st.path) || !st.path.length) return false;
  if (!st.completed || typeof st.completed !== "object") return false;
  return st.path.every((id) => !!st.completed[id]);
}

/** Stage N unlocks when N-1 is complete (stage 1 needs diagnostic) */
function canAccessStage(profile, subject, stageNum) {
  const stage = Number(stageNum) || 1;
  if (stage < 1 || stage > MAX_COURSE_STAGE) return false;
  if (stage === 1) return !!(profile.diagnostics?.[subject]?.completed);
  return isStageComplete(profile, subject, stage - 1);
}

function lessonExistsForStage(subject, skillId, stageNum) {
  const stage = Number(stageNum) || 1;
  const bank = getStageTeachBank(stage);
  if (bank && bank[subject] && bank[subject][skillId]) return true;
  if (stage <= 1) {
    if (typeof TEACH_MODULES !== "undefined" && TEACH_MODULES[subject]?.[skillId]) return true;
    return !!(LESSONS[subject] && LESSONS[subject][skillId]);
  }
  return false;
}

function getLessonMeta(subject, skillId, stageNum) {
  const stage = Number(stageNum) || 1;
  if (typeof getTeachModule === "function") {
    const mod = getTeachModule(subject, skillId, stage);
    if (mod) return { title: mod.title, blurb: mod.blurb || "" };
  }
  const L = LESSONS[subject]?.[skillId];
  if (L) return { title: L.title, blurb: L.blurb || "" };
  return { title: skillId, blurb: "" };
}

/**
 * Adaptive course builder for a stage:
 * ranks skills by diagnostic score (weak first), builds ordered lesson path
 */
function buildCourse(profile, subject, stageNum) {
  if (!profile.courses) profile.courses = {};
  recoverCompletionsFromHistory(profile, subject);
  const existing = profile.courses[subject]
    ? migrateCourseEntry(profile.courses[subject])
    : { activeStage: 1, stages: {} };
  profile.courses[subject] = existing;

  const stage = Number(stageNum) || existing.activeStage || 1;
  const diag = profile.diagnostics[subject];
  const skillDefs = SKILLS[subject];
  const skillIds = Object.keys(skillDefs);

  let ranked;
  if (diag && diag.skillScores) {
    ranked = skillIds
      .map((id) => ({
        id,
        score: diag.skillScores[id] ?? 50,
      }))
      .sort((a, b) => a.score - b.score);
  } else {
    ranked = skillIds.map((id, i) => ({ id, score: 50 - i }));
  }

  const path = ranked.map((s) => s.id);
  const filtered = path.filter((id) => lessonExistsForStage(subject, id, stage));
  const prevCompleted = existing.stages[stage]?.completed || {};

  const focus =
    stage <= 1
      ? makeFocusMessage(subject, ranked, diag)
      : makeStageFocusMessage(subject, ranked, diag, stage);

  existing.stages[stage] = {
    path: filtered,
    completed: prevCompleted,
    generatedAt: Date.now(),
    focusMessage: focus,
  };
  if (!existing.activeStage) existing.activeStage = stage;
  return existing.stages[stage];
}

function makeStageFocusMessage(subject, ranked, diag, stageNum) {
  const subName = SUBJECTS[subject].name;
  const stageMeta = COURSE_STAGES[stageNum] || COURSE_STAGES[2];
  if (!diag) {
    return `${stageMeta.emoji} ${stageMeta.name} ${subName}: take the placement test first, then climb the GCSE pathway.`;
  }
  const weak = ranked.slice(0, 2).map((s) => SKILLS[subject][s.id].name);
  return `${stageMeta.emoji} ${stageMeta.name} ${subName} (${stageMeta.gradeBand}): prioritising ${weak.join(
    " and "
  )}. Finish this stage to unlock the next step toward A*.`;
}

/** Start any unlocked stage (2–6) after the previous is complete */
function startCourseStage(profile, subject, stageNum) {
  const stage = Number(stageNum) || 2;
  if (!canAccessStage(profile, subject, stage)) return null;
  if (!profile.courses) profile.courses = {};
  if (!profile.courses[subject]) {
    profile.courses[subject] = { activeStage: 1, stages: {} };
  } else {
    profile.courses[subject] = migrateCourseEntry(profile.courses[subject]);
  }
  profile.courses[subject].activeStage = stage;
  if (!profile.courses[subject].stages[stage]?.path?.length) {
    buildCourse(profile, subject, stage);
  }
  unlockBadge(profile, "pathway_climber");
  unlockBadge(profile, `stage_${stage}_start`);
  if (stage === 2) unlockBadge(profile, `intermediate_${subject}`);
  if (stage === 4) unlockBadge(profile, `gcse_core_${subject}`);
  if (stage === 5) unlockBadge(profile, `gcse_higher_${subject}`);
  if (stage === 6) unlockBadge(profile, `astar_${subject}`);
  return profile.courses[subject].stages[stage];
}

/** Count completed stages across subjects (for parent / hub) */
function countCompletedStages(profile, subject) {
  let n = 0;
  for (let s = 1; s <= MAX_COURSE_STAGE; s++) {
    if (isStageComplete(profile, subject, s)) n++;
  }
  return n;
}

function pathwayProgressPct(profile, subject) {
  // Weight: each stage equal; partial credit for lessons on active incomplete stage
  let score = 0;
  const per = 100 / MAX_COURSE_STAGE;
  for (let s = 1; s <= MAX_COURSE_STAGE; s++) {
    if (isStageComplete(profile, subject, s)) {
      score += per;
    } else {
      const st = getCourseStageData(profile, subject, s);
      if (st && st.path && st.path.length) {
        const done = st.path.filter((id) => st.completed && st.completed[id]).length;
        score += per * (done / st.path.length);
      }
      break; // only credit into the first incomplete stage
    }
  }
  return Math.min(100, Math.round(score));
}

function makeFocusMessage(subject, ranked, diag) {
  const subName = SUBJECTS[subject].name;
  if (!diag) {
    return `Take the ${subName} placement test first so we can personalise your course.`;
  }
  const weak = ranked.slice(0, 2).map((s) => SKILLS[subject][s.id].name);
  const strong = ranked
    .slice(-1)
    .map((s) => SKILLS[subject][s.id].name);
  return `Based on your test, we'll boost ${weak.join(" and ")} first (GCSE: ${
    SKILLS[subject][ranked[0].id].gcse
  }). You're already stronger on ${strong[0]} — we'll keep that sharp too!`;
}

function scoreDiagnostic(subject, learnerId, answers) {
  // answers: { questionId: userAnswer }
  const qs = questionsForLearner(subject, learnerId);
  const skillTotals = {};
  const skillCorrect = {};
  let correct = 0;

  for (const q of qs) {
    skillTotals[q.skill] = (skillTotals[q.skill] || 0) + 1;
    skillCorrect[q.skill] = skillCorrect[q.skill] || 0;
    const ok = checkAnswer(q, answers[q.id]);
    if (ok) {
      correct++;
      skillCorrect[q.skill]++;
    }
  }

  const skillScores = {};
  for (const skill of Object.keys(skillTotals)) {
    skillScores[skill] = Math.round(
      (skillCorrect[skill] / skillTotals[skill]) * 100
    );
  }

  const score = qs.length ? Math.round((correct / qs.length) * 100) : 0;
  return { score, skillScores, correct, total: qs.length };
}

function recordDiagnostic(profile, subject, answers, result) {
  profile.diagnostics[subject] = {
    completed: true,
    score: result.score,
    skillScores: result.skillScores,
    correct: result.correct,
    total: result.total,
    date: todayKey(),
    answers,
  };
  updateStreak(profile);
  addXp(profile, 40 + Math.round(result.score / 5));
  unlockBadge(profile, "first_steps");
  if (result.score >= 70) {
    if (subject === "maths") unlockBadge(profile, "maths_star");
    if (subject === "english") unlockBadge(profile, "english_star");
    if (subject === "science") unlockBadge(profile, "science_star");
  }
  const doneCount = Object.values(profile.diagnostics).filter(
    (d) => d && d.completed
  ).length;
  if (doneCount >= 3) unlockBadge(profile, "triple_test");

  // Placement tests count toward daily / weekly / monthly goals
  recordDailyActivity(profile, "exam");
  if (typeof bumpWeekMonth === "function") bumpWeekMonth(profile);

  buildCourse(profile, subject);

  // GCSE pathway badge
  const avg =
    Object.values(result.skillScores).reduce((a, b) => a + b, 0) /
    Math.max(1, Object.keys(result.skillScores).length);
  if (avg >= 80) unlockBadge(profile, "gcse_ready");
}

function recordLesson(profile, subject, skillId, scorePct, stageNum) {
  if (!profile.courses[subject]) buildCourse(profile, subject, 1);
  const course = migrateCourseEntry(profile.courses[subject]);
  profile.courses[subject] = course;
  const stage = Number(stageNum) || course.activeStage || 1;
  if (!course.stages[stage]) buildCourse(profile, subject, stage);
  const st = course.stages[stage];
  if (!st.completed || typeof st.completed !== "object" || Array.isArray(st.completed)) {
    st.completed = {};
  }
  st.completed[skillId] = {
    score: scorePct,
    date: todayKey(),
    stage,
  };
  // Update skill estimate so bars move after each lesson
  if (!profile.diagnostics) profile.diagnostics = {};
  if (!profile.diagnostics[subject]) {
    profile.diagnostics[subject] = {
      completed: true,
      score: scorePct,
      skillScores: {},
      date: todayKey(),
    };
  }
  if (
    !profile.diagnostics[subject].skillScores ||
    typeof profile.diagnostics[subject].skillScores !== "object" ||
    Array.isArray(profile.diagnostics[subject].skillScores)
  ) {
    profile.diagnostics[subject].skillScores = {};
  }
  const prevSkill = profile.diagnostics[subject].skillScores[skillId];
  if (typeof prevSkill === "number") {
    profile.diagnostics[subject].skillScores[skillId] = Math.round(
      prevSkill * 0.35 + scorePct * 0.65
    );
  } else {
    profile.diagnostics[subject].skillScores[skillId] = scorePct;
  }
  const skillVals = Object.values(profile.diagnostics[subject].skillScores).filter(
    (v) => typeof v === "number"
  );
  if (skillVals.length) {
    profile.diagnostics[subject].score = Math.round(
      skillVals.reduce((a, b) => a + b, 0) / skillVals.length
    );
  }
  profile.lessonHistory.push({
    subject,
    skillId,
    score: scorePct,
    date: todayKey(),
    stage,
  });
  updateStreak(profile);
  addXp(profile, stageXpBase(stage) + Math.round(scorePct / 10));
  unlockBadge(profile, "lesson_1");
  const lessonCount = profile.lessonHistory.length;
  if (lessonCount >= 5) unlockBadge(profile, "lesson_5");
  if (lessonCount >= 25) unlockBadge(profile, "lesson_25");
  if (lessonCount >= 50) unlockBadge(profile, "lesson_50");

  const ranked = Object.keys(SKILLS[subject])
    .map((id) => ({
      id,
      score: profile.diagnostics[subject]?.skillScores?.[id] ?? 50,
    }))
    .sort((a, b) => a.score - b.score);
  st.focusMessage =
    stage <= 1
      ? makeFocusMessage(subject, ranked, profile.diagnostics[subject])
      : makeStageFocusMessage(subject, ranked, profile.diagnostics[subject], stage);

  // Re-order remaining lessons by live skill scores (AI-style continuous tailoring)
  retailorRemainingPath(profile, subject, stage);

  if (isStageComplete(profile, subject, stage)) {
    unlockBadge(profile, `stage_${stage}_done`);
    if (stage === 1) {
      unlockBadge(profile, "foundation_done");
      unlockBadge(profile, `foundation_${subject}`);
    }
    if (stage === 2) unlockBadge(profile, "intermediate_done");
    if (stage === 4) unlockBadge(profile, "gcse_core_done");
    if (stage === 5) unlockBadge(profile, "gcse_higher_done");
    if (stage === 6) {
      unlockBadge(profile, "astar_done");
      unlockBadge(profile, `astar_complete_${subject}`);
    }
    // All 3 subjects at stage 6
    const allAstar = ["maths", "english", "science"].every((sub) =>
      isStageComplete(profile, sub, 6)
    );
    if (allAstar) unlockBadge(profile, "triple_astar");
  }
  recordDailyActivity(profile, "lesson");
}

/**
 * After each lesson: keep completed skills in order, re-sort remaining
 * by current weakness so the pathway adapts as the student develops.
 */
function retailorRemainingPath(profile, subject, stageNum) {
  try {
    if (!profile.courses?.[subject]) return;
    const course = migrateCourseEntry(profile.courses[subject]);
    profile.courses[subject] = course;
    const stage = Number(stageNum) || course.activeStage || 1;
    const st = course.stages[stage];
    if (!st || !Array.isArray(st.path)) return;
    if (!st.completed || typeof st.completed !== "object" || Array.isArray(st.completed)) {
      st.completed = {};
    }
    const scores = profile.diagnostics?.[subject]?.skillScores || {};
    const done = [];
    const remaining = [];
    for (const id of st.path) {
      if (st.completed[id]) done.push(id);
      else remaining.push(id);
    }
    remaining.sort((a, b) => (scores[a] ?? 50) - (scores[b] ?? 50));
    st.path = [...done, ...remaining];
    const ranked = st.path.map((id) => ({
      id,
      score: scores[id] ?? 50,
    }));
    st.focusMessage =
      stage <= 1
        ? makeFocusMessage(subject, ranked, profile.diagnostics?.[subject])
        : makeStageFocusMessage(
            subject,
            ranked,
            profile.diagnostics?.[subject],
            stage
          );
    // Surface adaptation note for coach/UI
    if (remaining.length) {
      const weakest = remaining[0];
      const wName = SKILLS[subject]?.[weakest]?.name || weakest;
      st.adaptNote = `Pathway updated: next focus is ${wName} (based on how you’re doing).`;
    } else {
      st.adaptNote = `Stage complete — every skill practiced.`;
    }
  } catch (e) {
    console.warn("retailorRemainingPath", e);
  }
}

/**
 * Subject % for progress bars — rises as lessons complete (not stuck near placement %).
 * Starts at placement; each finished lesson lifts toward mastery.
 */
function subjectOverall(profile, subject) {
  if (!profile) return null;
  const diag = profile.diagnostics && profile.diagnostics[subject];

  let placement = null;
  if (diag && diag.skillScores && typeof diag.skillScores === "object") {
    const vals = Object.values(diag.skillScores).filter((v) => typeof v === "number");
    if (vals.length) {
      placement = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    }
  }
  if (placement == null && diag && diag.score != null) {
    placement = Number(diag.score);
  }

  // Count completed lessons across stages
  let doneCount = 0;
  let pathLen = 0;
  const lessonScores = [];
  const c = profile.courses && profile.courses[subject];
  if (c) {
    try {
      const migrated = migrateCourseEntry(c);
      for (const st of Object.values(migrated.stages || {})) {
        if (!st) continue;
        const path = Array.isArray(st.path) ? st.path : [];
        pathLen += path.length || 0;
        const completed =
          st.completed && typeof st.completed === "object" && !Array.isArray(st.completed)
            ? st.completed
            : {};
        for (const [k, v] of Object.entries(completed)) {
          if (!v) continue;
          doneCount++;
          if (typeof v.score === "number") lessonScores.push(v.score);
        }
        // If path empty but completed has keys
        if (!path.length) {
          /* already counted completed keys */
        }
      }
      // Fallback path length from skills if stages empty
      if (!pathLen) {
        pathLen = Math.max(doneCount, Object.keys(SKILLS[subject] || {}).length, 1);
      }
    } catch (_) {
      pathLen = Math.max(1, Object.keys(SKILLS[subject] || {}).length);
    }
  }

  const completionRatio = pathLen > 0 ? Math.min(1, doneCount / pathLen) : 0;
  const lessonAvg = lessonScores.length
    ? lessonScores.reduce((a, b) => a + b, 0) / lessonScores.length
    : null;

  if (placement == null && doneCount === 0) return null;
  if (doneCount === 0 && placement != null) {
    return Math.min(100, Math.max(0, Math.round(placement)));
  }
  if (placement == null) {
    const q =
      lessonAvg != null
        ? lessonAvg * 0.4 + completionRatio * 100 * 0.6
        : completionRatio * 100;
    return Math.min(100, Math.max(0, Math.round(q)));
  }

  // Rise from placement toward a high target as more lessons finish
  const target = Math.max(placement, lessonAvg != null ? lessonAvg : placement, 72);
  const blended = placement + (target - placement) * completionRatio;
  const finishBonus = completionRatio * 14;
  const overall = Math.round(blended + finishBonus);
  // Never drop below placement after they've started learning
  return Math.min(100, Math.max(placement, overall));
}

/** Next incomplete skill on the active stage (null if stage path finished) */
function nextLesson(profile, subject, stageNum, skipSkillId) {
  recoverCompletionsFromHistory(profile, subject);
  if (!profile.courses || !profile.courses[subject]) {
    buildCourse(profile, subject, 1);
  }
  const course = migrateCourseEntry(profile.courses[subject]);
  profile.courses[subject] = course;
  const stage = Number(stageNum) || course.activeStage || 1;
  let st = course.stages[stage];
  if (!st || !Array.isArray(st.path) || !st.path.length) {
    buildCourse(profile, subject, stage);
    st = course.stages[stage];
  }
  if (!st || !Array.isArray(st.path)) return null;
  if (!st.completed || typeof st.completed !== "object" || Array.isArray(st.completed)) {
    st.completed = {};
  }
  const skip = skipSkillId || null;
  // Prefer the next item AFTER the one just finished so we never rewind
  const startAt = skip && st.path.includes(skip) ? st.path.indexOf(skip) + 1 : 0;
  for (let i = startAt; i < st.path.length; i++) {
    const skillId = st.path[i];
    if (skillId === skip) continue;
    if (!st.completed[skillId]) return skillId;
  }
  for (let i = 0; i < startAt; i++) {
    const skillId = st.path[i];
    if (skillId === skip) continue;
    if (!st.completed[skillId]) return skillId;
  }
  return null; // this stage complete
}

/** Highest stage the learner can open (1 or 2 for now) */
function maxUnlockedStage(profile, subject) {
  let max = 0;
  for (let s = 1; s <= MAX_COURSE_STAGE; s++) {
    if (canAccessStage(profile, subject, s) || (s === 1 && profile.diagnostics?.[subject]?.completed)) {
      // Stage 1 accessible after diagnostic; stage 2 after foundation complete
      if (s === 1 && profile.diagnostics?.[subject]?.completed) max = 1;
      if (s > 1 && isStageComplete(profile, subject, s - 1)) max = s;
    }
  }
  if (profile.diagnostics?.[subject]?.completed && max < 1) max = 1;
  // If they're mid-stage-2
  const active = getActiveStage(profile, subject);
  if (active > max && canAccessStage(profile, subject, active)) max = active;
  return max || (profile.diagnostics?.[subject]?.completed ? 1 : 0);
}

function randomEncouragement() {
  return ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)];
}

/** Daily goal tracker (lessons + exams count toward goal) */
function ensureDaily(profile) {
  const d = todayKey();
  if (!profile.daily || profile.daily.date !== d) {
    profile.daily = {
      date: d,
      lessons: 0,
      exams: 0,
      goal: 2,
    };
  }
  if (typeof profile.daily.goal !== "number" || profile.daily.goal < 1) {
    profile.daily.goal = 2;
  }
  return profile.daily;
}

function dailyProgress(profile) {
  const d = ensureDaily(profile);
  const done = (d.lessons || 0) + (d.exams || 0);
  const goal = d.goal || 2;
  return {
    done,
    goal,
    remaining: Math.max(0, goal - done),
    pct: Math.min(100, Math.round((done / Math.max(1, goal)) * 100)),
    met: done >= goal,
    date: d.date,
  };
}

/**
 * Weekly + monthly activity goals (from coach memory).
 * Week/month counters roll in ensureTutorMemory.
 */
function weekMonthProgress(profile) {
  const m =
    typeof ensureTutorMemory === "function"
      ? ensureTutorMemory(profile)
      : profile.tutorMemory || { weekDone: 0, weeklyGoal: 8, monthDone: 0, monthlyGoal: 30 };
  const weekDone = m.weekDone || 0;
  const weeklyGoal = m.weeklyGoal || 8;
  const monthDone = m.monthDone || 0;
  const monthlyGoal = m.monthlyGoal || 30;
  return {
    weekDone,
    weeklyGoal,
    weekRemaining: Math.max(0, weeklyGoal - weekDone),
    weekPct: Math.min(100, Math.round((weekDone / Math.max(1, weeklyGoal)) * 100)),
    weekMet: weekDone >= weeklyGoal,
    monthDone,
    monthlyGoal,
    monthRemaining: Math.max(0, monthlyGoal - monthDone),
    monthPct: Math.min(100, Math.round((monthDone / Math.max(1, monthlyGoal)) * 100)),
    monthMet: monthDone >= monthlyGoal,
  };
}

/** Snapshot of all three goals for UI */
function allGoalsProgress(profile) {
  const daily = dailyProgress(profile);
  const wm = weekMonthProgress(profile);
  return {
    daily,
    week: {
      done: wm.weekDone,
      goal: wm.weeklyGoal,
      remaining: wm.weekRemaining,
      pct: wm.weekPct,
      met: wm.weekMet,
    },
    month: {
      done: wm.monthDone,
      goal: wm.monthlyGoal,
      remaining: wm.monthRemaining,
      pct: wm.monthPct,
      met: wm.monthMet,
    },
    allMet: daily.met && wm.weekMet && wm.monthMet,
  };
}

/** Prevent double confetti/toast when daily + week award in the same tick */
let _goalCelebrateTimer = null;
let _goalCelebrateQueue = [];

function celebrateGoalHits(newly) {
  if (!newly || !newly.length) return;
  _goalCelebrateQueue.push(...newly);
  clearTimeout(_goalCelebrateTimer);
  _goalCelebrateTimer = setTimeout(() => {
    const hits = [...new Set(_goalCelebrateQueue)];
    _goalCelebrateQueue = [];
    if (!hits.length) return;
    if (typeof fireConfetti === "function") {
      try {
        fireConfetti();
      } catch (_) {
        /* ignore */
      }
    }
    if (typeof showSavedToast === "function") {
      const labels = {
        daily_goal: "☀️ Daily goal hit!",
        weekly_goal: "📅 Weekly goal hit!",
        monthly_goal: "🌙 Monthly goal hit!",
        goal_triple: "🎯 Triple goal — legend!",
      };
      // Prefer the biggest milestone in the toast
      const order = ["goal_triple", "monthly_goal", "weekly_goal", "daily_goal"];
      const best = order.find((id) => hits.includes(id)) || hits[hits.length - 1];
      showSavedToast(labels[best] || "Goal hit! 🏅");
    }
  }, 80);
}

/**
 * Unlock goal badges whenever a goal is newly met.
 * @returns {{ goals: object, newly: string[] }}
 */
function awardGoalBadges(profile) {
  const g = allGoalsProgress(profile);
  const newly = [];
  if (g.daily.met && unlockBadge(profile, "daily_goal")) newly.push("daily_goal");
  if (g.week.met && unlockBadge(profile, "weekly_goal")) newly.push("weekly_goal");
  if (g.month.met && unlockBadge(profile, "monthly_goal")) newly.push("monthly_goal");
  if (g.allMet && unlockBadge(profile, "goal_triple")) newly.push("goal_triple");
  celebrateGoalHits(newly);
  return { goals: g, newly };
}

/**
 * Count an activity toward week + month goals (lessons, exams, Power 5).
 * Call after daily is updated when appropriate.
 */
function bumpWeekMonth(profile) {
  if (typeof ensureTutorMemory !== "function") return;
  const m = ensureTutorMemory(profile);
  m.weekDone = (m.weekDone || 0) + 1;
  m.monthDone = (m.monthDone || 0) + 1;
  awardGoalBadges(profile);
  return m;
}

function recordDailyActivity(profile, kind) {
  const d = ensureDaily(profile);
  if (kind === "lesson") d.lessons = (d.lessons || 0) + 1;
  if (kind === "exam") d.exams = (d.exams || 0) + 1;
  // Exams/Power 5 also feed week+month; lessons get week/month via recordTutorWin
  // but award daily badge immediately either way
  awardGoalBadges(profile);
  return d;
}

/**
 * Best next action for the hub "Continue" button.
 * Order: resume last subject → any open lesson → unlock → missing placement → exams
 * @returns {{ type: string, subject?: string, skillId?: string, stage?: number, label: string } | null}
 */
function findNextAction(profile) {
  if (!profile) return null;
  const subjects = ["maths", "english", "science"];
  const mem =
    typeof ensureTutorMemory === "function" ? ensureTutorMemory(profile) : null;

  function tryLesson(sub) {
    const diag = profile.diagnostics?.[sub];
    if (!diag?.completed) return null;
    try {
      ensureCourseReady(profile, sub);
    } catch (_) {
      if (!profile.courses?.[sub]) buildCourse(profile, sub, 1);
    }
    const stage = getActiveStage(profile, sub);
    const next = nextLesson(profile, sub, stage);
    if (next) {
      const meta = getLessonMeta(sub, next, stage);
      const stName = (COURSE_STAGES[stage] || {}).name || `Stage ${stage}`;
      return {
        type: "lesson",
        subject: sub,
        skillId: next,
        stage,
        label: `Continue ${SUBJECTS[sub].name}: ${meta.title} (${stName})`,
      };
    }
    if (stage < MAX_COURSE_STAGE && isStageComplete(profile, sub, stage)) {
      const ns = stage + 1;
      const nm = COURSE_STAGES[ns];
      return {
        type: "unlock",
        subject: sub,
        stage: ns,
        label: `Unlock ${nm.emoji} ${nm.name} ${SUBJECTS[sub].name}`,
      };
    }
    return null;
  }

  // 1) Resume where they left off
  if (mem?.lastSubject && SUBJECTS[mem.lastSubject]) {
    const r = tryLesson(mem.lastSubject);
    if (r) return r;
  }

  // 2) Any subject with open work
  for (const sub of subjects) {
    const r = tryLesson(sub);
    if (r) return r;
  }

  // 3) Missing placement (weakest first: none done → start maths)
  for (const sub of subjects) {
    if (!profile.diagnostics?.[sub]?.completed) {
      return {
        type: "diagnostic",
        subject: sub,
        label: `Start ${SUBJECTS[sub].name} placement test`,
      };
    }
  }

  // 4) Exam / power practice
  for (const sub of subjects) {
    const stage = getActiveStage(profile, sub) || 1;
    if (stage >= 4 && typeof EXAM_PACKS !== "undefined" && EXAM_PACKS[sub]) {
      const packStage = stage >= 6 ? 6 : stage >= 5 ? 5 : 4;
      if (EXAM_PACKS[sub][packStage]) {
        return {
          type: "exam",
          subject: sub,
          stage: packStage,
          label: `Exam workout: ${EXAM_PACKS[sub][packStage].title}`,
        };
      }
    }
  }

  return {
    type: "power5",
    subject: mem?.lastSubject || "maths",
    label: "Power 5 — 5 quick questions (keep sharp!)",
  };
}

/**
 * Build an ultra-fast 5-question drill from weak skills / completed content.
 * Always returns up to 5 questions when any curriculum content exists.
 */
function buildPower5Questions(profile, subject) {
  subject = subject || "maths";
  const bank = [];
  const seen = new Set();

  function pushQ(q, skillId, stage) {
    if (!q || !q.q) return;
    const key = String(q.q).slice(0, 80);
    if (seen.has(key)) return;
    seen.add(key);
    bank.push({ ...q, _skillId: skillId || null, _stage: stage || 1 });
  }

  // 1) Prefer diagnostic weak skills (lowest scores first)
  const scores = profile.diagnostics?.[subject]?.skillScores || {};
  const weak = Object.keys(SKILLS[subject] || {}).sort(
    (a, b) => (scores[a] ?? 50) - (scores[b] ?? 50)
  );
  const stagesToTry = [1, 2, 3, 4, 5, 6];
  for (const skillId of weak) {
    for (const st of stagesToTry) {
      if (typeof getTeachModule !== "function") continue;
      const mod = getTeachModule(subject, skillId, st, profile.id);
      if (!mod?.practice?.length) continue;
      for (const q of mod.practice) pushQ(q, skillId, st);
      break;
    }
  }

  // 2) Completed-lesson revision bank
  if (bank.length < 5 && typeof buildRevisionQuestions === "function") {
    const rev = buildRevisionQuestions(profile, subject, 12) || [];
    for (const q of rev) pushQ(q, q._skillId, q._stage);
  }

  // 3) Diagnostic placement bank (always available)
  if (bank.length < 5 && typeof DIAGNOSTICS !== "undefined" && DIAGNOSTICS[subject]) {
    const stage = profile.id && LEARNERS[profile.id] ? LEARNERS[profile.id].stage : "both";
    for (const q of DIAGNOSTICS[subject]) {
      if (q.stage === "both" || q.stage === stage || !q.stage) {
        pushQ(q, q.skill || q.skillId || null, 1);
      }
    }
  }

  // Adaptive difficulty: easier → prefer struggle-style / earlier items
  const adaptLv = getAdaptLevel(profile, subject);
  if (adaptLv <= -1) {
    // Pull in struggle questions from weak skills
    for (const skillId of weak.slice(0, 3)) {
      if (typeof getTeachModule !== "function") break;
      const mod = getTeachModule(subject, skillId, 1, profile.id);
      if (mod?.struggle?.practice) {
        for (const q of mod.struggle.practice) pushQ(q, skillId, 1);
      }
    }
  }

  // Shuffle
  for (let i = bank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bank[i], bank[j]] = [bank[j], bank[i]];
  }
  // Harder adapt → take from the back of bank after a second shuffle pass bias
  if (adaptLv >= 2 && bank.length > 5) {
    return bank.slice(-5);
  }
  return bank.slice(0, 5);
}

/** Estimate seconds remaining for a snappy Power 5 (for UI only) */
function power5TargetSeconds() {
  return 90;
}

/** Simple confetti burst for wins (DOM-based, no deps) */
function fireConfetti() {
  try {
    const layer = document.createElement("div");
    layer.className = "confetti-layer";
    layer.setAttribute("aria-hidden", "true");
    const colors = ["#e8c547", "#81c784", "#6b9fd4", "#e891a8", "#f3e6c8"];
    for (let i = 0; i < 36; i++) {
      const p = document.createElement("i");
      p.style.left = Math.random() * 100 + "%";
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = Math.random() * 0.4 + "s";
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 2200);
  } catch (_) {
    /* ignore */
  }
}

/**
 * Build a mixed revision set from completed stage content.
 * @returns {Array|null}
 */
function buildRevisionQuestions(profile, subject, count) {
  count = count || 10;
  const bank = [];
  if (!profile.courses?.[subject]) return null;
  const c = migrateCourseEntry(profile.courses[subject]);
  for (const [stageKey, st] of Object.entries(c.stages || {})) {
    const stageNum = Number(stageKey);
    if (!st?.completed) continue;
    for (const skillId of Object.keys(st.completed)) {
      if (typeof getTeachModule !== "function") continue;
      const mod = getTeachModule(subject, skillId, stageNum, profile.id);
      if (!mod?.practice) continue;
      for (const q of mod.practice) {
        bank.push({ ...q, _skillId: skillId, _stage: stageNum });
      }
    }
  }
  if (!bank.length) return null;
  // Shuffle
  for (let i = bank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bank[i], bank[j]] = [bank[j], bank[i]];
  }
  return bank.slice(0, Math.min(count, bank.length));
}
