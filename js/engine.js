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
  // Fix course shapes from Firebase + migrate flat → staged courses
  for (const [sk, c] of Object.entries(p.courses)) {
    if (!c || typeof c !== "object") {
      delete p.courses[sk];
      continue;
    }
    p.courses[sk] = migrateCourseEntry(c);
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

/** Course tiers: Foundation (1) → Intermediate (2) → more later */
const COURSE_STAGES = {
  1: {
    id: 1,
    name: "Foundation",
    emoji: "🌱",
    blurb: "Placement-based first course — close the gaps.",
  },
  2: {
    id: 2,
    name: "Intermediate",
    emoji: "🚀",
    blurb: "Harder practice for both KS2 and KS3 — next step after Foundation.",
  },
};

const MAX_COURSE_STAGE = 2;

/** Normalise one subject course: flat legacy → { activeStage, stages } */
function migrateCourseEntry(c) {
  if (!c || typeof c !== "object") return null;
  // Already staged
  if (c.stages && typeof c.stages === "object" && !Array.isArray(c.stages)) {
    const out = {
      activeStage: Number(c.activeStage) || 1,
      stages: {},
    };
    for (const [k, st] of Object.entries(c.stages)) {
      if (!st || typeof st !== "object") continue;
      out.stages[k] = {
        path: Array.isArray(st.path) ? st.path : [],
        completed:
          st.completed && typeof st.completed === "object" && !Array.isArray(st.completed)
            ? st.completed
            : {},
        generatedAt: st.generatedAt || 0,
        focusMessage: st.focusMessage || "",
      };
    }
    if (!out.stages[1] && (c.path || c.completed)) {
      // partial hybrid
      out.stages[1] = {
        path: Array.isArray(c.path) ? c.path : [],
        completed:
          c.completed && typeof c.completed === "object" && !Array.isArray(c.completed)
            ? c.completed
            : {},
        generatedAt: c.generatedAt || 0,
        focusMessage: c.focusMessage || "",
      };
    }
    return out;
  }
  // Legacy flat shape
  return {
    activeStage: 1,
    stages: {
      1: {
        path: Array.isArray(c.path) ? c.path : [],
        completed:
          c.completed && typeof c.completed === "object" && !Array.isArray(c.completed)
            ? c.completed
            : {},
        generatedAt: c.generatedAt || 0,
        focusMessage: c.focusMessage || "",
      },
    },
  };
}

function ensureCourseShape(profile, subject) {
  if (!profile.courses || typeof profile.courses !== "object") profile.courses = {};
  const c = profile.courses[subject];
  if (!c) return null;
  profile.courses[subject] = migrateCourseEntry(c);
  return profile.courses[subject];
}

function getCourseStageData(profile, subject, stageNum) {
  const c = ensureCourseShape(profile, subject);
  if (!c) return null;
  const stage = stageNum || c.activeStage || 1;
  return c.stages[stage] || null;
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
  if (stage >= 2 && typeof TEACH_MODULES_STAGE2 !== "undefined") {
    return !!(TEACH_MODULES_STAGE2[subject] && TEACH_MODULES_STAGE2[subject][skillId]);
  }
  if (typeof TEACH_MODULES !== "undefined" && TEACH_MODULES[subject]?.[skillId]) return true;
  return !!(LESSONS[subject] && LESSONS[subject][skillId]);
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
    stage >= 2
      ? makeStage2FocusMessage(subject, ranked, diag)
      : makeFocusMessage(subject, ranked, diag);

  existing.stages[stage] = {
    path: filtered,
    completed: prevCompleted,
    generatedAt: Date.now(),
    focusMessage: focus,
  };
  if (!existing.activeStage) existing.activeStage = stage;
  return existing.stages[stage];
}

function makeStage2FocusMessage(subject, ranked, diag) {
  const subName = SUBJECTS[subject].name;
  const stageMeta = COURSE_STAGES[2];
  if (!diag) {
    return `${stageMeta.emoji} ${stageMeta.name} ${subName}: take the placement test if you haven't — then tackle harder skill challenges.`;
  }
  const weak = ranked.slice(0, 2).map((s) => SKILLS[subject][s.id].name);
  return `${stageMeta.emoji} Intermediate ${subName}: deeper practice, still prioritising ${weak.join(
    " and "
  )}. You've finished Foundation — this is the next step on the GCSE pathway.`;
}

/** Start Intermediate (or later) after previous stage is complete */
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
  unlockBadge(profile, "stage2_ready");
  if (stage === 2) unlockBadge(profile, `intermediate_${subject}`);
  return profile.courses[subject].stages[stage];
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

function recordLesson(profile, subject, skillId, scorePct, stageNum) {
  if (!profile.courses[subject]) buildCourse(profile, subject, 1);
  const course = migrateCourseEntry(profile.courses[subject]);
  profile.courses[subject] = course;
  const stage = Number(stageNum) || course.activeStage || 1;
  if (!course.stages[stage]) buildCourse(profile, subject, stage);
  const st = course.stages[stage];
  st.completed[skillId] = {
    score: scorePct,
    date: todayKey(),
    stage,
  };
  profile.lessonHistory.push({
    subject,
    skillId,
    score: scorePct,
    date: todayKey(),
    stage,
  });
  updateStreak(profile);
  // Intermediate lessons worth a bit more XP
  const xpBase = stage >= 2 ? 35 : 25;
  addXp(profile, xpBase + Math.round(scorePct / 10));
  unlockBadge(profile, "lesson_1");
  const lessonCount = profile.lessonHistory.length;
  if (lessonCount >= 5) unlockBadge(profile, "lesson_5");

  const ranked = Object.keys(SKILLS[subject])
    .map((id) => ({
      id,
      score: profile.diagnostics[subject]?.skillScores?.[id] ?? 50,
    }))
    .sort((a, b) => a.score - b.score);
  st.focusMessage =
    stage >= 2
      ? makeStage2FocusMessage(subject, ranked, profile.diagnostics[subject])
      : makeFocusMessage(subject, ranked, profile.diagnostics[subject]);

  // Foundation complete → badge + ready for Intermediate
  if (stage === 1 && isStageComplete(profile, subject, 1)) {
    unlockBadge(profile, "foundation_done");
    unlockBadge(profile, `foundation_${subject}`);
  }
  if (stage === 2 && isStageComplete(profile, subject, 2)) {
    unlockBadge(profile, "intermediate_done");
  }
}

function subjectOverall(profile, subject) {
  if (!profile || !profile.diagnostics || typeof profile.diagnostics !== "object") {
    return null;
  }
  const diag = profile.diagnostics[subject];
  if (diag && diag.skillScores && typeof diag.skillScores === "object") {
    const vals = Object.values(diag.skillScores).filter((v) => typeof v === "number");
    if (!vals.length) return diag.score != null ? Number(diag.score) : null;
    let boost = 0;
    const c = profile.courses && profile.courses[subject];
    if (c) {
      const migrated = migrateCourseEntry(c);
      for (const st of Object.values(migrated.stages || {})) {
        if (st && st.completed && typeof st.completed === "object") {
          boost += Object.keys(st.completed).length * 3;
        }
      }
      boost = Math.min(20, boost);
    }
    const base = vals.reduce((a, b) => a + b, 0) / vals.length;
    return Math.min(100, Math.round(base + boost * 0.3));
  }
  if (diag && diag.completed && diag.score != null) return Number(diag.score);
  return null;
}

/** Next incomplete skill on the active stage (null if stage path finished) */
function nextLesson(profile, subject, stageNum) {
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
  for (const skillId of st.path) {
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
