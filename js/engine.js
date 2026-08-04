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
    parentNotes: "",
    // 0 = empty shell — must NOT beat real cloud progress on merge
    updatedAt: 0,
  };
}

/** Make sure a profile is always a safe object (never null diagnostics etc.) */
function normalizeProfile(learnerId, raw) {
  const base = defaultProfile(learnerId);
  if (!raw || typeof raw !== "object") return base;
  const p = { ...base, ...raw, id: learnerId };
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
  // Fix course shapes from Firebase (completed must be object, path must be array)
  for (const [sk, c] of Object.entries(p.courses)) {
    if (!c || typeof c !== "object") {
      delete p.courses[sk];
      continue;
    }
    if (!Array.isArray(c.path)) c.path = [];
    if (!c.completed || typeof c.completed !== "object" || Array.isArray(c.completed)) {
      c.completed = {};
    }
  }
  if (!Array.isArray(p.badges)) p.badges = [];
  if (!Array.isArray(p.lessonHistory)) p.lessonHistory = [];
  if (typeof p.xp !== "number" || Number.isNaN(p.xp)) p.xp = Number(p.xp) || 0;
  if (typeof p.level !== "number" || Number.isNaN(p.level)) p.level = Number(p.level) || 1;
  if (typeof p.streak !== "number" || Number.isNaN(p.streak)) p.streak = Number(p.streak) || 0;
  if (typeof p.updatedAt !== "number") p.updatedAt = Number(p.updatedAt) || 0;
  if (!p.fullName) p.fullName = base.fullName;
  return p;
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
}

function addXp(profile, amount) {
  profile.xp += amount;
  const newLevel = 1 + Math.floor(profile.xp / 100);
  profile.level = newLevel;
}

function unlockBadge(profile, badgeId) {
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
 * Adaptive "AI" course builder:
 * ranks skills by diagnostic score (weak first), builds ordered lesson path
 */
function buildCourse(profile, subject) {
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
    // Default starter path if no diagnostic yet
    ranked = skillIds.map((id, i) => ({ id, score: 50 - i }));
  }

  // Path: weakest skills first, then a mixed recap of stronger ones
  const path = ranked.map((s) => s.id);
  // Ensure we have lesson content
  const filtered = path.filter((id) => LESSONS[subject][id]);

  profile.courses[subject] = {
    path: filtered,
    completed: profile.courses[subject]?.completed || {},
    generatedAt: Date.now(),
    focusMessage: makeFocusMessage(subject, ranked, diag),
  };
  return profile.courses[subject];
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

  buildCourse(profile, subject);

  // GCSE pathway badge
  const avg =
    Object.values(result.skillScores).reduce((a, b) => a + b, 0) /
    Math.max(1, Object.keys(result.skillScores).length);
  if (avg >= 80) unlockBadge(profile, "gcse_ready");
}

function recordLesson(profile, subject, skillId, scorePct) {
  if (!profile.courses[subject]) buildCourse(profile, subject);
  profile.courses[subject].completed[skillId] = {
    score: scorePct,
    date: todayKey(),
  };
  profile.lessonHistory.push({
    subject,
    skillId,
    score: scorePct,
    date: todayKey(),
  });
  updateStreak(profile);
  addXp(profile, 25 + Math.round(scorePct / 10));
  unlockBadge(profile, "lesson_1");
  const lessonCount = profile.lessonHistory.length;
  if (lessonCount >= 5) unlockBadge(profile, "lesson_5");

  // Refresh course message but keep path order stable unless parent regenerates
  const ranked = Object.keys(SKILLS[subject])
    .map((id) => ({
      id,
      score: profile.diagnostics[subject]?.skillScores?.[id] ?? 50,
    }))
    .sort((a, b) => a.score - b.score);
  profile.courses[subject].focusMessage = makeFocusMessage(
    subject,
    ranked,
    profile.diagnostics[subject]
  );
}

function subjectOverall(profile, subject) {
  if (!profile || !profile.diagnostics || typeof profile.diagnostics !== "object") {
    return null;
  }
  const diag = profile.diagnostics[subject];
  if (diag && diag.skillScores && typeof diag.skillScores === "object") {
    const vals = Object.values(diag.skillScores).filter((v) => typeof v === "number");
    if (!vals.length) return diag.score != null ? Number(diag.score) : null;
    const course = profile.courses && profile.courses[subject];
    let boost = 0;
    if (course && course.completed && typeof course.completed === "object") {
      boost = Math.min(15, Object.keys(course.completed).length * 3);
    }
    const base = vals.reduce((a, b) => a + b, 0) / vals.length;
    return Math.min(100, Math.round(base + boost * 0.3));
  }
  if (diag && diag.completed && diag.score != null) return Number(diag.score);
  return null;
}

function nextLesson(profile, subject) {
  if (!profile.courses || !profile.courses[subject] || !Array.isArray(profile.courses[subject].path)) {
    buildCourse(profile, subject);
  }
  const course = profile.courses[subject];
  if (!course || !Array.isArray(course.path)) return null;
  if (!course.completed || typeof course.completed !== "object" || Array.isArray(course.completed)) {
    course.completed = {};
  }
  for (const skillId of course.path) {
    if (!course.completed[skillId]) return skillId;
  }
  return null; // all done — can retake
}

function randomEncouragement() {
  return ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)];
}
