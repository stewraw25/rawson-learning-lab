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
  if (!Array.isArray(p.examHistory)) p.examHistory = [];
  if (p.daily && typeof p.daily !== "object") p.daily = null;
  if (p.tutorMemory && typeof p.tutorMemory !== "object") p.tutorMemory = null;
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
  if (profile.streak >= 7) unlockBadge(profile, "streak_7");
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
  if (!st || !Array.isArray(st.path) || st.path.length === 0) {
    buildCourse(profile, subject, stage);
    st = c.stages[stage];
  }
  // Still empty? force unfiltered skill path so kids are never stuck
  if (!st || !st.path || !st.path.length) {
    const skillIds = Object.keys(SKILLS[subject] || {});
    c.stages[stage] = {
      path: skillIds,
      completed: (st && st.completed) || {},
      generatedAt: Date.now(),
      focusMessage:
        (st && st.focusMessage) ||
        `Your ${SUBJECTS[subject].name} lessons are ready — start at the top!`,
    };
  }
  return c.stages[stage];
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
    pct: Math.min(100, Math.round((done / goal) * 100)),
    met: done >= goal,
    date: d.date,
  };
}

function recordDailyActivity(profile, kind) {
  const d = ensureDaily(profile);
  if (kind === "lesson") d.lessons = (d.lessons || 0) + 1;
  if (kind === "exam") d.exams = (d.exams || 0) + 1;
  if (dailyProgress(profile).met) unlockBadge(profile, "daily_goal");
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
        pushQ(q, q.skillId || null, 1);
      }
    }
  }

  // Shuffle
  for (let i = bank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bank[i], bank[j]] = [bank[j], bank[i]];
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
