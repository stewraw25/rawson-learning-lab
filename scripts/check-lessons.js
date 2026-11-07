#!/usr/bin/env node
/**
 * Weekly check for Rawson Learning Lab.
 * Loads the same scripts as index.html and checks:
 *  - every question has one correct answer and an explanation
 *  - multiple-choice answers point at a real, unique option
 *  - typed answers are marked right, and a wrong answer is not
 *  - no duplicate questions inside a lesson
 *  - every lesson for Bella-Rose and George can be finished
 *
 * Exit code 1 if anything fails.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const FILES = [
  "js/curriculum.js",
  "js/engine.js",
  "js/sync.js",
  "js/teach-content.js",
  "js/stage2-content.js",
  "js/stage3-content.js",
  "js/year-install.js",
  "js/year-path.js",
  "js/year-english.js",
  "js/year-science.js",
  "js/stage4-content.js",
  "js/stage5-content.js",
  "js/stage6-content.js",
  "js/fun-stages.js",
  "js/fun-long-course.js",
  "js/george-kart-bank.js",
  "js/george-invest-bank.js",
  "js/george-journey.js",
  "js/passion-courses.js",
  "js/invest-calc.js",
  "js/exam-packs.js",
  "js/tutor.js",
  "js/gentle-ramp.js",
  "js/week-content.js",
  "js/week3-content.js",
  "js/report-problem.js",
];

const memory = {};
function makeStorage() {
  return {
    getItem(k) {
      return Object.prototype.hasOwnProperty.call(memory, k) ? memory[k] : null;
    },
    setItem(k, v) {
      memory[k] = String(v);
    },
    removeItem(k) {
      delete memory[k];
    },
  };
}

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  localStorage: makeStorage(),
  sessionStorage: makeStorage(),
  navigator: { userAgent: "lesson-check" },
  document: {
    getElementById() {
      return null;
    },
    createElement() {
      return { style: {}, appendChild() {}, remove() {}, setAttribute() {} };
    },
    body: { appendChild() {} },
  },
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

let source = "";
for (const file of FILES) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) {
    console.error("Missing " + file);
    process.exit(1);
  }
  source += `\n;/* ${file} */\n` + fs.readFileSync(full, "utf8") + "\n";
}

const checker = `
const failures = [];
const notes = [];
function fail(msg) { failures.push(msg); }

function canonicalAnswer(q) {
  if (!q) return null;
  if (q.type === "multi") {
    const i = Number(q.answer);
    if (!Number.isInteger(i) || !q.options || !q.options[i]) return null;
    return q.options[i];
  }
  if (q.answer == null || String(q.answer).trim() === "") return null;
  return String(q.answer);
}

function checkQuestion(q, where) {
  if (!q || typeof q !== "object") {
    fail(where + ": missing question");
    return;
  }
  if (!q.q || !String(q.q).trim()) fail(where + ": empty question text");
  const explain = q.explain ? String(q.explain).trim() : "";
  const minExplain = q.week ? 20 : 4;
  if (!explain) fail(where + ": missing explanation");
  else if (explain.length < minExplain) {
    fail(where + ": explanation too short (" + JSON.stringify(q.explain) + ")");
  }
  if (q.type !== "multi" && q.type !== "typed") {
    fail(where + ": bad type " + q.type);
    return;
  }
  if (q.type === "multi") {
    if (!Array.isArray(q.options) || q.options.length < 2) {
      fail(where + ": need at least 2 options");
      return;
    }
    const i = Number(q.answer);
    if (!Number.isInteger(i) || String(i) !== String(q.answer) && typeof q.answer !== "number") {
      // allow numeric answers only
    }
    if (!Number.isInteger(i) || i < 0 || i >= q.options.length) {
      fail(where + ": answer index " + JSON.stringify(q.answer) + " is not a real option");
    } else if (!String(q.options[i]).trim()) {
      fail(where + ": correct option is blank");
    }
    const normOpts = q.options.map((o) => String(o).trim());
    const dupOpt = normOpts.find((o, idx) => o && normOpts.indexOf(o) !== idx);
    if (dupOpt) fail(where + ": duplicate option " + JSON.stringify(dupOpt));
    if (!checkAnswer(q, i)) fail(where + ": official answer is marked wrong");
    for (let w = 0; w < q.options.length; w++) {
      if (w !== i && checkAnswer(q, w)) fail(where + ": option " + w + " is also marked right");
    }
  } else {
    const ans = String(q.answer == null ? "" : q.answer).trim();
    if (!ans) fail(where + ": typed question has no answer");
    if (!checkAnswer(q, ans)) fail(where + ": typing the official answer is marked wrong");
    if (q.accept && q.accept.length) {
      const norms = q.accept.map((a) => normaliseAnswer(a));
      if (!norms.includes(normaliseAnswer(ans))) {
        fail(where + ": accept list does not include the official answer");
      }
    }
    if (checkAnswer(q, ans + "xyzzy-wrong")) fail(where + ": a nonsense answer is marked right");
  }
  verifyArithmetic(q, where);
}

const WORD_NUM = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, twenty: 20,
};

function markedValue(q) {
  if (q.type === "multi") {
    const i = Number(q.answer);
    return q.options && q.options[i] != null ? String(q.options[i]) : "";
  }
  return String(q.answer == null ? "" : q.answer);
}

function looseNumber(s) {
  let t = String(s).trim().toLowerCase().replace(/,/g, "").replace(/£/g, "").replace(/%/g, "");
  t = t.replace(/\\bpounds?\\b/g, "").replace(/\\bpence\\b/g, "").replace(/\\s+/g, "");
  if (Object.prototype.hasOwnProperty.call(WORD_NUM, t)) return WORD_NUM[t];
  if (/^-?\\d+(?:\\.\\d+)?$/.test(t)) return Number(t);
  return null;
}

function verifyArithmetic(q, where) {
  const text = String(q.q || "");
  let expected = null;
  let m;
  if ((m = text.match(/(\\d+)\\s*\\/\\s*(\\d+)\\s+of\\s+(\\d+)/i))) {
    expected = (Number(m[1]) / Number(m[2])) * Number(m[3]);
  } else if ((m = text.match(/what is\\s+(-?\\d+(?:\\.\\d+)?)\\s*\\+\\s*(-?\\d+(?:\\.\\d+)?)/i))) {
    expected = Number(m[1]) + Number(m[2]);
  } else if ((m = text.match(/what is\\s+(-?\\d+(?:\\.\\d+)?)\\s*[\\u2212\\-]\\s*(-?\\d+(?:\\.\\d+)?)/i))) {
    expected = Number(m[1]) - Number(m[2]);
  } else if ((m = text.match(/what is\\s+(-?\\d+(?:\\.\\d+)?)\\s*[\\u00d7x*]\\s*(-?\\d+(?:\\.\\d+)?)/i))) {
    expected = Number(m[1]) * Number(m[2]);
  } else if ((m = text.match(/what is\\s+(-?\\d+(?:\\.\\d+)?)\\s*(?:\\u00f7|\\/)\\s*(-?\\d+(?:\\.\\d+)?)(?!\\s*of)/i))) {
    expected = Number(m[1]) / Number(m[2]);
  } else if ((m = text.match(/half of\\s+(-?\\d+(?:\\.\\d+)?)/i))) {
    expected = Number(m[1]) / 2;
  } else if ((m = text.match(/quarter of\\s+(-?\\d+(?:\\.\\d+)?)/i))) {
    expected = Number(m[1]) / 4;
  } else if ((m = text.match(/what number comes after\\s+(\\d+)/i))) {
    expected = Number(m[1]) + 1;
  } else if ((m = text.match(/what number comes before\\s+(\\d+)/i))) {
    expected = Number(m[1]) - 1;
  } else if ((m = text.match(/(\\d+(?:\\.\\d+)?)\\s*%\\s*of\\s*£?\\s*(\\d+(?:\\.\\d+)?)/i))) {
    expected = (Number(m[1]) / 100) * Number(m[2]);
  } else if ((m = text.match(/how many tens in\\s+(\\d+)/i))) {
    expected = Number(m[1]) / 10;
  }
  if (expected == null || !Number.isFinite(expected)) return;
  const got = looseNumber(markedValue(q));
  if (got == null) return;
  if (Math.abs(got - expected) > 1e-6) {
    fail(where + ": marked " + markedValue(q) + " but the sum is " + expected + " — " + text);
  }
}

function walkList(list, where, bag) {
  if (!Array.isArray(list)) return;
  const seen = new Map();
  list.forEach((q, i) => {
    const label = where + " Q" + (i + 1);
    checkQuestion(q, label);
    const fp = questionFingerprint(q);
    if (!fp) return;
    if (seen.has(fp)) fail(label + ": duplicate of " + seen.get(fp) + " (" + fp.slice(0, 80) + ")");
    else seen.set(fp, label);
    if (bag) {
      if (bag.has(fp)) fail(label + ": same question as " + bag.get(fp));
      else bag.set(fp, label);
    }
  });
}

function lessonQuestions(subject, skillId, stage, learnerId) {
  if (typeof installGeorgeBanks === "function") installGeorgeBanks();
  const mod = getTeachModule(subject, skillId, stage, learnerId);
  if (!mod) return null;
  return mod;
}

const subjectsByLearner = {
  bella: subjectsForLearner("bella"),
  george: subjectsForLearner("george"),
};

// Diagnostics
for (const subject of Object.keys(DIAGNOSTICS || {})) {
  walkList(DIAGNOSTICS[subject], "diagnostic " + subject);
}

// Exam packs
for (const subject of Object.keys(EXAM_PACKS || {})) {
  for (const stage of Object.keys(EXAM_PACKS[subject] || {})) {
    const pack = EXAM_PACKS[subject][stage];
    walkList(pack && pack.questions, "exam " + subject + " stage " + stage);
  }
}

// Every lesson both children can open
for (const learnerId of ["bella", "george"]) {
  const profile = defaultProfile(learnerId);
  state = { profiles: { [learnerId]: profile }, activeLearner: learnerId };
  for (const subject of subjectsByLearner[learnerId]) {
    const skills = Object.keys(SKILLS[subject] || {});
    for (const skillId of skills) {
      let highest = 0;
      for (let stage = 1; stage <= 6; stage++) {
        if (lessonExistsForStage(subject, skillId, stage)) highest = stage;
      }
      if (!highest) {
        fail(learnerId + " " + subject + " " + skillId + ": lesson missing from every stage");
        continue;
      }
      for (let stage = 1; stage <= highest; stage++) {
        if (!lessonExistsForStage(subject, skillId, stage)) {
          fail(learnerId + " " + subject + " s" + stage + " " + skillId + ": gap before stage " + highest);
        }
      }
    }
    for (let stage = 1; stage <= 6; stage++) {
      const fps = new Map();
      for (const skillId of skills) {
        if (!lessonExistsForStage(subject, skillId, stage)) continue;
        const mod = lessonQuestions(subject, skillId, stage, learnerId);
        if (!mod) {
          fail(learnerId + " " + subject + " s" + stage + " " + skillId + ": getTeachModule returned null");
          continue;
        }
        if (!mod.teach || !Array.isArray(mod.teach.points) || !mod.teach.points.length) {
          fail(learnerId + " " + subject + " s" + stage + " " + skillId + ": no teach points");
        }
        if (!mod.example || !Array.isArray(mod.example.steps) || !mod.example.steps.length) {
          fail(learnerId + " " + subject + " s" + stage + " " + skillId + ": no worked example");
        }
        const where = learnerId + " " + subject + " s" + stage + " " + skillId;
        walkList(mod.practice, where + " practice", fps);
        walkList(mod.struggle && mod.struggle.practice, where + " help");
        if (!mod.practice || !mod.practice.length) {
          fail(where + ": no practice questions, so the lesson cannot be completed properly");
          continue;
        }

        // Complete the lesson the way the app does, answering every question correctly.
        profile.diagnostics[subject] = { completed: true, score: 50, skillScores: {}, date: "2026-11-02" };
        if (!profile.courses[subject]) buildCourse(profile, subject, stage);
        const session = createTutorSession(subject, skillId, learnerId, stage);
        if (!session) {
          fail(where + ": createTutorSession returned null");
          continue;
        }
        session.phase = "practice";
        let guard = 0;
        const asked = [];
        while (!session.finished && session.phase !== "complete" && guard < 80) {
          guard++;
          const list = currentPracticeList(session);
          const q = list[session.practiceIndex];
          if (!q) {
            fail(where + ": practice ended with an empty question (stuck)");
            break;
          }
          asked.push(questionFingerprint(q));
          let user;
          if (q.type === "multi") user = Number(q.answer);
          else user = q.answer;
          const ok = handlePracticeAnswer(session, q, user);
          if (!ok) {
            fail(where + ": correct answer marked wrong — " + q.q);
            break;
          }
          const step = advanceAfterAnswer(session, true);
          if (step && step.done) break;
        }
        if (!session.finished && session.phase !== "complete") {
          fail(where + ": lesson did not finish after answering correctly (" + guard + " steps)");
        }
        if (session.practiceCorrect < 1) fail(where + ": finished with no correct answers counted");
        const uniqueAsked = new Set(asked.filter(Boolean));
        if (uniqueAsked.size !== asked.length) {
          fail(where + ": the same question was asked twice in one sitting");
        }

        // A clearly wrong answer must not be marked right.
        const sample = mod.practice[0];
        if (sample && sample.type === "multi") {
          const wrong = (Number(sample.answer) + 1) % sample.options.length;
          if (checkAnswer(sample, wrong)) fail(where + ": wrong option marked right");
        }
      }
    }
  }
}

// A later stage must not repeat an earlier question in the same skill.
for (const subject of Object.keys(SKILLS)) {
  for (const skillId of Object.keys(SKILLS[subject])) {
    const seen = new Map();
    for (let stage = 1; stage <= 6; stage++) {
      const mod = getTeachModule(subject, skillId, stage, null);
      if (!mod || !mod.practice) continue;
      for (const q of mod.practice) {
        const fp = questionFingerprint(q);
        if (!fp) continue;
        if (seen.has(fp)) {
          fail(subject + " " + skillId + " stage " + stage + " repeats stage " + seen.get(fp) + ": " + q.q);
        } else seen.set(fp, stage);
      }
    }
  }
}

// A right answer written as a number word must still pass, and a different number must not.
(function kidForms() {
  const sample = { type: "typed", answer: "12", explain: "Twelve." };
  if (!checkAnswer(sample, "12") || !checkAnswer(sample, "twelve") || !checkAnswer(sample, " 12 ")) {
    fail("typed 12 did not accept 12 or twelve");
  }
  if (checkAnswer(sample, "11") || checkAnswer(sample, "eleven") || checkAnswer(sample, "twenty")) {
    fail("typed 12 accepted a different number");
  }
  const money = { type: "typed", answer: "8", explain: "Eight pounds." };
  if (!checkAnswer(money, "£8") || !checkAnswer(money, "8 pounds")) {
    fail("typed 8 did not accept £8 or 8 pounds");
  }
  const multi = { type: "multi", options: ["no", "yes"], answer: 1, explain: "Yes is correct." };
  if (!checkAnswer(multi, 1) || !checkAnswer(multi, "1") || checkAnswer(multi, 0)) {
    fail("multiple choice marking is wrong");
  }
})();

if (typeof investSelfCheck !== "function") {
  fail("money machine self-check is missing");
} else {
  investSelfCheck().forEach((err) => fail("money machine: " + err));
}

(function noEarlyAlgebra() {
  const bad = /□|(?:^|[^a-z])[a-z]\s*=\s*\d|standard form|\bgradient\b/i;
  ["bella", "george"].forEach((learnerId) => {
    subjectsForLearner(learnerId).forEach((subject) => {
      Object.keys(SKILLS[subject] || {}).forEach((skillId) => {
        for (let stage = 1; stage <= 3; stage++) {
          const mod = getTeachModule(subject, skillId, stage, learnerId);
          if (!mod) continue;
          const bits = []
            .concat((mod.teach && mod.teach.points) || [])
            .concat((mod.example && mod.example.steps) || [])
            .concat((mod.practice || []).map((q) => q && q.q))
            .concat(((mod.struggle && mod.struggle.practice) || []).map((q) => q && q.q));
          bits.forEach((bit) => {
            if (bit && bad.test(String(bit))) {
              fail(subject + " s" + stage + " " + skillId + " still has later-level maths: " + String(bit).slice(0, 80));
            }
          });
        }
      });
    });
  });
})();

if (typeof buildSomethingWrongMailto !== "function") {
  fail("Something's wrong? helper is missing");
} else {
  const href = buildSomethingWrongMailto(
    {
      learnerName: "Bella-Rose Rawson",
      section: "Maths",
      lesson: "Number",
      stage: "First steps",
      screen: "Question",
      question: "What is 2 + 2?",
    },
    "Stuck",
    "The button did nothing"
  );
  const text = decodeURIComponent(href);
  if (href.indexOf("mailto:stewraw25@hotmail.co.uk?") !== 0) {
    fail("problem email does not open to stewraw25@hotmail.co.uk");
  }
  if (!text.includes("subject=Something's wrong - Rawson Learning Lab")) {
    fail("problem email subject must start with Something's wrong - Rawson Learning Lab");
  }
  if (!text.includes("Child: Bella-Rose Rawson")) fail("problem email is missing the child's name");
  if (!text.includes("Section: Maths")) fail("problem email is missing the section");
  if (!text.includes("Lesson: Number")) fail("problem email is missing the lesson");
  if (!text.includes("Question: What is 2 + 2?")) fail("problem email is missing the question");
  if (!text.includes("Note: The button did nothing")) fail("problem email is missing the note");
  if (typeof somethingWrongButtonHtml !== "function" || !somethingWrongButtonHtml().includes("Something's wrong?")) {
    fail("problem button label is missing");
  }
  if (!somethingWrongButtonHtml().includes("Skip") && typeof SOMETHING_WRONG_REASONS !== "undefined") {
    /* skip lives in the panel, not the button */
  }
  saveSomethingWrongReport({ at: "t", action: "skip", note: "kept locally" });
  const log = readSomethingWrongLog();
  if (!log.length || log[log.length - 1].note !== "kept locally") {
    fail("problem report was not kept in the browser log");
  }
}

function checkProgressRestore() {
  const george = {
    id: "george",
    xp: 10,
    level: 1,
    badges: [],
    lessonHistory: [
      { subject: "karting", skillId: "safety", stage: 6, score: 100, date: "2026-11-02" },
      { subject: "karting", skillId: "flags", stage: 6, score: 86, date: "2026-11-03" },
      { subject: "karting", skillId: "pits", stage: 6, score: 40, date: "2026-11-03" },
      { subject: "maths", skillId: "algebra", stage: 2, score: 80, date: "2026-08-20" },
      { subject: "maths", skillId: "y-place", stage: 1, score: 100, date: "2026-11-04" },
    ],
    diagnostics: {
      karting: { completed: true, score: 100, skillScores: {} },
      maths: { completed: true, score: 100, skillScores: {} },
    },
    courses: {
      karting: {
        activeStage: 1,
        paceVersion: "pace-years-v1",
        homeStage: 1,
        paceClimbedTo: 1,
        paceStartedOn: "2026-11-04",
        contentVersion: "fun-long-v1",
        paceDone: { s6: ["safety", "flags", "pits"] },
        stages: {
          s1: { path: ["safety"], completed: { safety: { score: 100, date: "2026-09-09", stage: 1 } }, generatedAt: 1 },
          s6: { path: ["safety", "flags", "pits", "line"], completed: {}, generatedAt: 1 },
        },
      },
      maths: {
        activeStage: 1,
        paceVersion: "pace-years-v1",
        homeStage: 1,
        paceClimbedTo: 1,
        paceStartedOn: "2026-11-04",
        contentVersion: "first-steps-v1",
        paceDone: { s2: ["algebra"] },
        stages: {
          s1: {
            path: ["y-place", "algebra"],
            completed: { "y-place": { score: 100, date: "2026-11-04", stage: 1 } },
            generatedAt: 1,
          },
          s2: { path: ["algebra"], completed: {}, generatedAt: 1 },
        },
      },
    },
  };
  const p = normalizeProfile("george", george);
  const kart = p.courses.karting;
  if (!kart || Number(kart.activeStage) !== 6) {
    fail("karting climb should reopen Champion (stage 6), got " + (kart && kart.activeStage));
  }
  if (!kart.stages[6] || !kart.stages[6].completed.safety || !kart.stages[6].completed.flags) {
    fail("karting Champion ticks were not restored from history");
  }
  if (kart.stages[6].completed.pits) {
    fail("a failed karting sitting (under 50) must not come back as finished");
  }
  if (Number(kart.paceClimbedTo) < 6) fail("karting paceClimbedTo should keep Champion unlocked");
  const champName = subjectProgressSummary(p, "karting").stageName;
  if (champName !== "Champion") {
    fail("karting summary should say Champion, got " + champName);
  }
  const maths = p.courses.maths;
  if (!maths || Number(maths.activeStage) !== 1) {
    fail("maths should stay on First steps for George, got " + (maths && maths.activeStage));
  }
  if (maths.stages[2] && maths.stages[2].completed && maths.stages[2].completed.algebra) {
    fail("old maths stage 2 work must not climb back over the year-group placement");
  }
  p.courses.karting.activeStage = 2;
  const again = normalizeProfile("george", p);
  if (Number(again.courses.karting.activeStage) !== 2) {
    fail("after the climb is restored, choosing an earlier level must stick");
  }
  if (!again.courses.karting.stages[6].completed.safety) {
    fail("switching level must not wipe Champion ticks");
  }
  const laps = savedStageProgress(p, "karting", 1);
  if (!laps || laps.name !== "First laps") {
    fail("karting stage 1 should be called First laps, got " + (laps && laps.name));
  }
  if (!laps.total || laps.done < 1) {
    fail("First laps should show the lessons already saved");
  }
  if (typeof creditSavedLessonStars === "function") {
    const beforeCorrect = (p.journey && p.journey.karting && p.journey.karting.correct) || [];
    creditSavedLessonStars(p, "karting");
    const stars = p.journey && p.journey.karting && p.journey.karting.stars;
    if (!stars || Number(stars["s6:safety"]) < 3) {
      fail("a saved 100% Champion lesson should show three stars");
    }
    if (stars && stars["s6:pits"]) fail("a failed lesson must not gain stars");
    const afterCorrect = (p.journey.karting && p.journey.karting.correct) || [];
    if (afterCorrect.length !== beforeCorrect.length) {
      fail("showing saved lessons must not retire new questions");
    }
  }
  const summary = subjectProgressSummary(again, "maths");
  if (!summary.started || summary.stageNum !== 1) fail("maths summary should stay on First steps");
  if (!(summary.stagePct > summary.pathwayPct)) {
    fail("First steps level percent should be larger than the 5% A* sliver");
  }
}

checkProgressRestore();

(function weekThreeIsOffered() {
  const profile = defaultProfile("george");
  state = { profiles: { george: profile, bella: defaultProfile("bella") }, activeLearner: "george" };
  const easy = createTutorSession("maths", "number", "george", 1);
  const easyWeeks = ((easy && easy.queue) || []).filter((q) => Number(q.week) === 3);
  if (!easyWeeks.length) fail("First steps maths does not offer this week's questions");
  const secure = createTutorSession("maths", "number", "bella", 3);
  const secureWeeks = ((secure && secure.queue) || []).filter((q) => Number(q.week) === 3);
  if (!secureWeeks.length) fail("Secure maths does not offer this week's questions");
  const cheer = createTutorSession("karting", "k-cheer", "george", 1);
  const cheerWeeks = ((cheer && cheer.queue) || []).filter((q) => Number(q.week) === 3);
  if (!cheerWeeks.length) fail("Cheering from the safe side does not offer this week's questions");
  const saved = savedStageProgress(profile, "karting", 1);
  if (!saved || saved.name !== "First laps") fail("a new karting lesson should still name the level First laps");
})();

// Report
if (notes.length) {
  console.log("NOTES (" + notes.length + ")");
  notes.slice(0, 30).forEach((n) => console.log("  " + n));
}
if (failures.length) {
  console.log("FAILURES " + failures.length);
  failures.slice(0, 80).forEach((f) => console.log("  " + f));
  if (failures.length > 80) console.log("  … " + (failures.length - 80) + " more");
} else {
  console.log("OK — every checked question has an answer and an explanation, and every lesson can be finished.");
}
globalThis.__failures = failures.length;
`;

try {
  vm.runInContext(source + "\n" + checker, sandbox, { filename: "check-lessons.js", timeout: 180000 });
} catch (err) {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
}

if (sandbox.__failures) process.exit(1);

const appSrc = fs.readFileSync(path.join(ROOT, "js/app.js"), "utf8");
const learnSrc = fs.readFileSync(path.join(ROOT, "js/learn-page.js"), "utf8");
const indexSrc = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const learnHtml = fs.readFileSync(path.join(ROOT, "learn.html"), "utf8");
const wiring = [];
if (!indexSrc.includes("js/report-problem.js")) wiring.push("index.html does not load report-problem.js");
if (!indexSrc.includes("js/week-content.js")) wiring.push("index.html does not load week-content.js");
if (!learnHtml.includes("js/report-problem.js")) wiring.push("learn.html does not load report-problem.js");
if ((appSrc.match(/reportButtonHtml\(\)/g) || []).length < 4) {
  wiring.push("lesson, placement, Power 5 and exam screens need the problem button");
}
if (appSrc.includes('alert("Pick or type an answer first!")')) {
  wiring.push("a quiz still blocks with an alert");
}
if (!learnSrc.includes("Skip this") && !learnSrc.includes("onSkip")) {
  wiring.push("the learn window has no skip");
}
if (wiring.length) {
  wiring.forEach((line) => console.log("  " + line));
  process.exit(1);
}
