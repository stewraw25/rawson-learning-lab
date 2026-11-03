/**
 * Adaptive tutor engine + optional Grok (xAI) enhancement
 */

const AI_KEY_STORAGE = "rawson-learning-xai-key";
const AI_PROXY_STORAGE = "rawson-learning-xai-proxy";

function getAiKey() {
  try {
    return localStorage.getItem(AI_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

function setAiKey(key) {
  if (!key) localStorage.removeItem(AI_KEY_STORAGE);
  else localStorage.setItem(AI_KEY_STORAGE, key.trim());
}

function getAiProxy() {
  try {
    return localStorage.getItem(AI_PROXY_STORAGE) || "";
  } catch {
    return "";
  }
}

function setAiProxy(url) {
  if (!url) localStorage.removeItem(AI_PROXY_STORAGE);
  else localStorage.setItem(AI_PROXY_STORAGE, url.trim().replace(/\/$/, ""));
}

function isAiConfigured() {
  return !!(getAiKey() || getAiProxy());
}

/**
 * Call Grok via proxy (preferred) or direct API if key set.
 * Proxy should accept POST { messages, model } and forward to xAI.
 */
async function askGrok(messages, opts = {}) {
  const model = opts.model || "grok-3-mini";
  const proxy = getAiProxy();
  const key = getAiKey();

  if (proxy) {
    const res = await fetch(`${proxy}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(key ? { "X-Api-Key": key } : {}),
      },
      body: JSON.stringify({ messages, model }),
    });
    if (!res.ok) throw new Error(`AI proxy error ${res.status}`);
    const data = await res.json();
    return (
      data.choices?.[0]?.message?.content ||
      data.content ||
      data.reply ||
      ""
    );
  }

  if (!key) throw new Error("No AI key or proxy configured");

  // Direct xAI call (may fail on CORS in browser — proxy recommended)
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.5,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`xAI error ${res.status}: ${t.slice(0, 120)}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

function tutorSystemPrompt(learnerMeta) {
  const coach =
    learnerMeta.id === "bella"
      ? "Kimi Antonelli"
      : learnerMeta.id === "george"
        ? "Gwen Stacy"
        : "Coach";
  return `You are ${coach}, a friendly UK AI tutor in Rawson Learning Lab for ${learnerMeta.fullName}, age ${learnerMeta.age} (${learnerMeta.yearGroup}). Stay in character as ${coach} but never claim to be the real person.
They are home-educated and a bit behind school age, so keep EVERYTHING very easy.
Use Year 2–4 language. No GCSE algebra unless they are clearly ready.
Money lessons start at piggy-bank easy (save vs spend, 20p of £1). Then snowball, 20% rule, gold coins, internet money, a bag of many shops, one shop. Past returns are not promises. Never tell them to buy anything.
If they say they don't know, praise them for asking and show a simpler example (e.g. 2+2, half of 4).
Explain mistakes simply, give one mini worked example, then one similar easy practice question.
Never be condescending. Use British spelling. Keep answers under 180 words unless asked.`;
}

const LEARN_SESSION_PREFIX = "rawson-learn-session-";

/**
 * Open a full browser window with an AI-guided walkthrough for this question.
 * @param {object} ctx
 */
function openLearnAboutSubject(ctx) {
  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  try {
    localStorage.setItem(
      LEARN_SESSION_PREFIX + id,
      JSON.stringify({
        ...ctx,
        createdAt: Date.now(),
      })
    );
  } catch (e) {
    alert("Could not open the learning window (storage full or blocked).");
    return;
  }
  // Relative path works on GitHub Pages and local files
  const url = new URL("learn.html", window.location.href);
  url.searchParams.set("id", id);
  const w = window.open(url.toString(), "rawson_learn_" + id, "noopener,noreferrer");
  if (!w) {
    alert("Please allow pop-ups for this site so the learning window can open.");
  }
}

/** Shared prompt for the full learning window walkthrough */
function buildLearnWalkthroughPrompt(ctx) {
  const optionsText =
    ctx.type === "multi" && Array.isArray(ctx.options)
      ? ctx.options.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join("\n")
      : "(typed answer)";
  const learnerLine = ctx.learnerName
    ? `Student: ${ctx.learnerName}, age ${ctx.age || "?"} (${ctx.yearGroup || "UK school"}).`
    : "Student: UK homeschool learner.";

  return `You are a patient UK home-education tutor in a garden learning studio.
${learnerLine}
Subject: ${ctx.subjectName || ctx.subject || "General"}
Topic/skill: ${ctx.skillName || ctx.skillId || "this topic"}

QUESTION:
${ctx.passage ? `Passage: ${ctx.passage}\n` : ""}${ctx.question}

${ctx.type === "multi" ? `Options:\n${optionsText}` : "The student types their own answer."}

Teacher mark-scheme note (use to guide; do NOT dump the final answer in step 1): ${ctx.explain || "n/a"}

Write a clear learning guide with these exact sections and markdown headings:

## What this is about
(2–3 friendly sentences)

## What you need to know first
(bullet key facts / rules)

## Worked example (step by step)
Number the steps. Show the thinking. British spelling.

## How to tackle THIS question
Guide them through the process without spoiling in the first line. Reveal the answer only in the final step labelled **Answer**.

## Check you understand
One short similar practice question (and its answer in brackets).

## Encouragement
One short positive line.

Keep it suitable for a ${ctx.age || 11}-year-old. Use British English.`;
}

/**
 * When student is wrong, ask Grok for a personalised re-teach.
 */
async function grokStruggleHelp({
  learnerMeta,
  subject,
  skillName,
  question,
  userAnswer,
  correctExplain,
}) {
  const messages = [
    { role: "system", content: tutorSystemPrompt(learnerMeta) },
    {
      role: "user",
      content: `Subject: ${subject}
Skill: ${skillName}
Question: ${question}
Student answered: ${userAnswer}
Mark scheme hint: ${correctExplain}

The student got this wrong. Explain gently why, teach the idea in 3 short steps, and end with ONE new similar question (multiple choice with 4 options labelled A-D, and state the correct letter).`,
    },
  ];
  return askGrok(messages);
}

/**
 * Create lesson session — linear queue that NEVER restarts from Q1 after wrong answers.
 * @param {number} [stageNum=1]
 */
function quizPersistKey(learnerId, subject, skillId, stage) {
  // v6: do not resume a queue that started on a GCSE question after the warm-ups were already seen
  return `rawson-live-quiz-v6:${learnerId || "x"}:${subject}:${skillId}:${stage}`;
}

function persistQuizSession(session) {
  if (!session || session.finished || typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(
      quizPersistKey(session.learnerId, session.subject, session.skillId, session.stage),
      JSON.stringify({
        phase: session.phase,
        practiceIndex: session.practiceIndex,
        practiceCorrect: session.practiceCorrect,
        practiceTotal: session.practiceTotal,
        wrongStreak: session.wrongStreak,
        totalWrong: session.totalWrong,
        dontKnowCount: session.dontKnowCount || 0,
        helpShownForIndex: session.helpShownForIndex || {},
        struggleUsed: !!session.struggleUsed,
        adaptLevel: session.adaptLevel,
        choiceAt: session.choiceAt || 0,
        extendedHarder: session.extendedHarder || 0,
        queue: session.queue,
        history: session.history,
        startedAt: session.startedAt,
      })
    );
  } catch (_) {
    /* ignore quota */
  }
}

function clearQuizSession(learnerId, subject, skillId, stage) {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.removeItem(quizPersistKey(learnerId, subject, skillId, stage));
  } catch (_) {
    /* ignore */
  }
}

function _shuffleQs(arr) {
  if (typeof shuffleArray === "function") return shuffleArray(arr);
  const a = (arr || []).slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function _filterQsForLearner(items, learnerId) {
  if (!Array.isArray(items)) return [];
  if (!learnerId || typeof LEARNERS === "undefined" || !LEARNERS[learnerId]) {
    return items.slice();
  }
  const learnerStage = LEARNERS[learnerId].stage;
  const filtered = items.filter(
    (q) => !q.stage || q.stage === "both" || q.stage === learnerStage
  );
  return filtered.length ? filtered : items.slice();
}

function _tagQs(items, src, diff, stage) {
  return (items || []).map((q, i) => ({
    ...q,
    _src: src,
    _i: i,
    _diff: diff,
    _stage: stage,
  }));
}

/** Raw module for a stage — no Foundation fallback (that recycled the first set). */
function rawStageModule(subject, skillId, stageNum) {
  const stage = Number(stageNum) || 1;
  if (typeof getStageTeachBank === "function") {
    const bank = getStageTeachBank(stage);
    const raw = bank?.[subject]?.[skillId] || null;
    if (raw) return raw;
  }
  if (stage <= 1 && typeof TEACH_MODULES !== "undefined") {
    return TEACH_MODULES[subject]?.[skillId] || null;
  }
  return null;
}

/**
 * Current-stage easy/main only.
 * Later stages are what Unlock is for — never mix stage 2–6 into First steps.
 */
function collectAdaptiveBanks(subject, skillId, learnerId, currentStage) {
  const stage = Number(currentStage) || 1;
  const current =
    rawStageModule(subject, skillId, stage) ||
    (typeof getTeachModule === "function"
      ? getTeachModule(subject, skillId, stage, learnerId)
      : null);

  const main = _tagQs(
    _filterQsForLearner(current && current.practice, learnerId),
    "main",
    1,
    stage
  );
  const easy = _tagQs(
    _filterQsForLearner(current && current.struggle && current.struggle.practice, learnerId),
    "help",
    0,
    stage
  );

  return { main, easy, harder: [] };
}

function _qSeenFp(q) {
  return typeof questionFingerprint === "function"
    ? questionFingerprint(q)
    : String((q && q.q) || "")
        .trim()
        .toLowerCase();
}

function _freshOnly(pool, profile, subject) {
  if (!pool || !pool.length) return [];
  if (typeof preferFreshQuestions === "function") {
    const recent = new Set(
      profile && subject && typeof ensureRecentQuestions === "function"
        ? ensureRecentQuestions(profile, subject)
        : []
    );
    return pool.filter((q) => {
      const fp = _qSeenFp(q);
      return fp && !recent.has(fp);
    });
  }
  return pool.slice();
}

function dedupeQuestionQueue(queue) {
  const seen = new Set();
  return (queue || []).filter((q) => {
    const fp = _qSeenFp(q);
    if (!fp || seen.has(fp)) return false;
    seen.add(fp);
    return true;
  });
}

/**
 * Build practice queue from THIS stage’s teach bank only.
 * Getting better does not pull later-stage questions — Unlock does that.
 */
function buildAdaptivePracticeQueue(mod, profile, subject, extra) {
  extra = extra || {};
  if (
    (subject === "karting" || subject === "investing") &&
    typeof buildJourneyQueue === "function"
  ) {
    return buildJourneyQueue(mod, profile, subject, extra);
  }
  const skillId = extra.skillId || (mod && mod.skillId) || null;
  const stage = Number(extra.stage) || 1;
  const learnerId =
    extra.learnerId || (profile && profile.id) || null;
  const level =
    extra.level != null
      ? Number(extra.level)
      : profile && typeof effectiveAdaptLevel === "function"
        ? effectiveAdaptLevel(profile, subject, stage)
        : profile && typeof getAdaptLevel === "function"
          ? getAdaptLevel(profile, subject)
          : 0;

  const banks = skillId
    ? collectAdaptiveBanks(subject, skillId, learnerId, stage)
    : {
        main: _tagQs(_filterQsForLearner(mod && mod.practice, learnerId), "main", 1, stage),
        easy: _tagQs(
          _filterQsForLearner(mod && mod.struggle && mod.struggle.practice, learnerId),
          "help",
          0,
          stage
        ),
        harder: [],
      };

  const mainList = banks.main || [];
  const mainLen = mainList.length;
  const explicit = mainList.some((q) => q && typeof q.ramp === "number");
  const mainFp = new Set(mainList.map((q) => _qSeenFp(q)).filter(Boolean));
  // A help question that copies a main question is not an easy start.
  const easyList = (banks.easy || []).filter((q) => {
    const fp = _qSeenFp(q);
    return fp && !mainFp.has(fp);
  });

  let pool = [
    ...easyList.map((q, i) => ({ ...q, _ramp: _rampOf(q, i, easyList.length, false), _ord: i })),
    ...mainList.map((q, i) => ({
      ...q,
      _ramp: _rampOf(q, i, mainLen, explicit),
      _ord: 1000 + i,
    })),
  ];
  pool = dedupeQuestionQueue(pool);

  const mastered = new Set(
    profile &&
    profile.masteredQs &&
    Array.isArray(profile.masteredQs[subject])
      ? profile.masteredQs[subject]
      : []
  );
  const recent = new Set(
    profile && subject && typeof ensureRecentQuestions === "function"
      ? ensureRecentQuestions(profile, subject)
      : []
  );
  let fresh = pool.filter((q) => {
    const fp = _qSeenFp(q);
    return fp && !mastered.has(fp) && !recent.has(fp);
  });
  if (fresh.length < 3) {
    fresh = pool.filter((q) => {
      const fp = _qSeenFp(q);
      return fp && !mastered.has(fp);
    });
  }
  if (fresh.length < 3) fresh = pool.slice();
  // Easier stays on the warm-ups. A pile of unseen GCSE questions must not
  // push those warm-ups out of the lesson.
  if (level <= -2) {
    const gentle = pool.filter((q) => Number(q._ramp) <= 1);
    if (gentle.length) {
      const gentleFresh = gentle.filter((q) => {
        const fp = _qSeenFp(q);
        return fp && !mastered.has(fp) && !recent.has(fp);
      });
      fresh = gentleFresh.length >= 2 ? gentleFresh : gentle;
    }
  }
  fresh = _orderRamp(fresh);

  let queue = _pickRamp(fresh, level);
  queue = dedupeQuestionQueue(queue);
  if (!queue.length) queue = dedupeQuestionQueue(pool);
  return queue;
}

/** Easy (0) → stretch (3). An explicit ramp wins. Week questions sit at the hard end. */
function _rampOf(q, index, total, listHasExplicit) {
  if (q && typeof q.ramp === "number" && !Number.isNaN(Number(q.ramp))) return Number(q.ramp);
  if (q && q.week) return 3;
  if (q && (q._src === "help" || q._diff === 0)) {
    // Later-stage "help" copies are still GCSE. They must not lead an easier lesson.
    if (Number(q._stage) >= 4) return 2;
    return 0;
  }
  if (listHasExplicit) return 2;
  if (!total || total <= 1) return 1;
  const t = index / (total - 1);
  if (t <= 0.34) return 1;
  if (t <= 0.7) return 2;
  return 3;
}

function _orderRamp(items) {
  return (items || [])
    .map((q, i) => ({ q, i }))
    .sort((a, b) => {
      const ra = Number(a.q && a.q._ramp) || 0;
      const rb = Number(b.q && b.q._ramp) || 0;
      if (ra !== rb) return ra - rb;
      return a.i - b.i;
    })
    .map((x) => x.q);
}

/** Always begin with the easiest questions, then climb. Level only changes how far. */
function _pickRamp(sorted, level) {
  const warm = sorted.filter((q) => Number(q._ramp) <= 0);
  const easy = sorted.filter((q) => Number(q._ramp) === 1);
  const mid = sorted.filter((q) => Number(q._ramp) === 2);
  const hard = sorted.filter((q) => Number(q._ramp) >= 3);
  const lv = Number(level) || 0;
  // Easier stays on gentle questions. One "middle" item on stage 4 is still GCSE
  // (the jump from 4 × 2 straight to gradient).
  const open = [...warm.slice(0, 2), ...easy.slice(0, lv <= -2 ? 6 : 4)];
  let rest;
  if (lv <= -2) rest = open.slice();
  else if (lv === -1) rest = [...open, ...mid.slice(0, 1)];
  else if (lv >= 2) rest = [...open.slice(0, 3), ...mid.slice(0, 2), ...hard.slice(0, 3)];
  else if (lv >= 1) rest = [...open.slice(0, 3), ...mid.slice(0, 2), ...hard.slice(0, 1)];
  else rest = [...open.slice(0, 4), ...mid.slice(0, 2), ...hard.slice(0, 1)];
  if (!rest.length) {
    const gentleOnly = lv <= -2 ? sorted.filter((q) => Number(q._ramp) <= 1) : [];
    rest = (gentleOnly.length ? gentleOnly : sorted).slice(0, 4);
  }
  const seen = new Set(rest.map((q) => _qSeenFp(q)));
  const weeks = [];
  if (lv >= 0) {
    for (const q of sorted) {
      if (!q || !q.week) continue;
      const fp = _qSeenFp(q);
      if (!fp || seen.has(fp)) continue;
      if (weeks.length >= 2) break;
      weeks.push(q);
      seen.add(fp);
    }
  }
  const plain = rest.filter((q) => !(q && q.week));
  const keptWeeks = [...rest.filter((q) => q && q.week), ...weeks].slice(0, 2);
  const room = 8 - keptWeeks.length;
  return [...plain.slice(0, Math.max(0, room)), ...keptWeeks];
}

function createTutorSession(subject, skillId, learnerId, stageNum) {
  const stage = Number(stageNum) || 1;
  const mod = getTeachModule(subject, skillId, stage, learnerId);
  if (!mod) return null;
  const profile =
    typeof state !== "undefined" && state.profiles && state.profiles[learnerId]
      ? state.profiles[learnerId]
      : null;
  const queue = buildAdaptivePracticeQueue(mod, profile, subject, {
    skillId,
    stage,
    learnerId,
  });
  const adaptLevel =
    profile && typeof effectiveAdaptLevel === "function"
      ? effectiveAdaptLevel(profile, subject, stage)
      : profile && typeof getAdaptLevel === "function"
        ? getAdaptLevel(profile, subject)
        : 0;
  const choiceAt =
    profile && typeof ensureAdaptSubject === "function"
      ? Number(ensureAdaptSubject(profile, subject).choiceAt) || 0
      : 0;
  const session = {
    subject,
    skillId,
    learnerId,
    stage,
    phase: "teach", // teach | example | practice | complete
    /** One queue — wrong answers may INSERT extra help Qs after current, never reset to 0 */
    queue,
    extendedHarder: 0,
    practiceIndex: 0,
    practiceCorrect: 0,
    practiceTotal: 0,
    wrongStreak: 0,
    totalWrong: 0,
    dontKnowCount: 0,
    helpShownForIndex: {},
    struggleUsed: false,
    videoShown: false,
    adaptLevel,
    choiceAt,
    history: [],
    startedAt: Date.now(),
    finished: false,
  };
  // Resume mid-quiz if the screen remounted (this was sending kids back to Q1)
  if (typeof sessionStorage !== "undefined") {
    try {
      const raw = sessionStorage.getItem(quizPersistKey(learnerId, subject, skillId, stage));
      if (raw) {
        const saved = JSON.parse(raw);
        const samePin = Number(saved && saved.choiceAt) === choiceAt;
        if (
          saved &&
          samePin &&
          typeof saved === "object" &&
          saved.phase &&
          saved.phase !== "complete"
        ) {
          session.phase = saved.phase;
          session.practiceIndex = Number(saved.practiceIndex) || 0;
          session.practiceCorrect = Number(saved.practiceCorrect) || 0;
          session.practiceTotal = Number(saved.practiceTotal) || 0;
          session.wrongStreak = Number(saved.wrongStreak) || 0;
          session.totalWrong = Number(saved.totalWrong) || 0;
          session.dontKnowCount = Number(saved.dontKnowCount) || 0;
          session.helpShownForIndex = saved.helpShownForIndex || {};
          session.struggleUsed = !!saved.struggleUsed;
          if (typeof saved.adaptLevel === "number") session.adaptLevel = saved.adaptLevel;
          session.extendedHarder = Number(saved.extendedHarder) || 0;
          if (Array.isArray(saved.queue) && saved.queue.length) session.queue = saved.queue;
          if (Array.isArray(saved.history)) session.history = saved.history;
          if (saved.startedAt) session.startedAt = saved.startedAt;
        }
      }
    } catch (_) {
      /* ignore */
    }
  }
  // Karting and investing: never resume a saved loop of the old tiny bank.
  // Rebuild from questions he has not got right yet.
  if (
    (subject === "karting" || subject === "investing") &&
    typeof buildJourneyQueue === "function"
  ) {
    const phase = session.phase;
    session.queue = buildJourneyQueue(mod, profile, subject, {
      skillId,
      stage,
      learnerId,
    });
    session.practiceIndex = 0;
    if (phase === "teach" || phase === "example") session.phase = phase;
  }
  return session;
}

function currentPracticeList(session) {
  return session.queue || [];
}

function sessionProgress(session) {
  if (session.phase === "teach") return { label: "Learn", pct: 8 };
  if (session.phase === "example") return { label: "Example", pct: 18 };
  if (session.phase === "complete" || session.finished)
    return { label: "Complete!", pct: 100 };
  const n = Math.max(1, (session.queue || []).length);
  const idx = Math.min(session.practiceIndex, n);
  const pct = 20 + Math.round((idx / n) * 75);
  return {
    label: `Question ${Math.min(idx + 1, n)} of ${n}`,
    pct: Math.min(95, pct),
  };
}

/**
 * Record answer only (does NOT advance index).
 * Caller should call advanceAfterAnswer() on "Next".
 */
function handlePracticeAnswer(session, question, userAnswer) {
  const ok = checkAnswer(question, userAnswer);
  session.practiceTotal++;
  session.history.push({
    q: question.q,
    ok,
    answer: userAnswer,
    at: Date.now(),
  });
  if (ok) {
    session.practiceCorrect++;
    session.wrongStreak = 0;
  } else {
    session.totalWrong++;
    session.wrongStreak++;
    session.struggleUsed = true;
  }
  try {
    if (
      typeof state !== "undefined" &&
      state.profiles &&
      session.learnerId &&
      typeof recordAdaptResult === "function"
    ) {
      const prof = state.profiles[session.learnerId];
      if (prof) {
        session.adaptLevel = recordAdaptResult(
          prof,
          session.subject,
          ok ? "correct" : "wrong",
          session.skillId
        );
        if (typeof journeyNoteAnswer === "function") {
          journeyNoteAnswer(prof, session.subject, question, ok);
        }
        if (ok && typeof noteMasteredQuestion === "function") {
          noteMasteredQuestion(prof, session.subject, question);
        }
        if (ok && question && question.week && typeof unlockBadge === "function") {
          unlockBadge(prof, "week_fresh");
        }
        if (!ok && typeof journeyScheduleRetry === "function") {
          journeyScheduleRetry(session, question);
        }
      }
    }
  } catch (_) {
    /* ignore */
  }
  return ok;
}

function _qFp(q) {
  return typeof questionFingerprint === "function"
    ? questionFingerprint(q)
    : String((q && q.q) || "")
        .trim()
        .toLowerCase();
}

/** A help question has to be easier than the lesson. A GCSE copy is not help. */
function _isGentleHelp(q, mainFps, stage) {
  const fp = _qFp(q);
  if (!fp || (mainFps && mainFps.has(fp))) return false;
  if (q && typeof q.ramp === "number" && Number(q.ramp) >= 2) return false;
  if ((Number(stage) || 1) >= 4) return typeof q.ramp === "number" && Number(q.ramp) <= 1;
  return true;
}

function _mainFingerprints(mod) {
  return new Set(((mod && mod.practice) || []).map((q) => _qFp(q)).filter(Boolean));
}

/**
 * Rebuild EVERYTHING still ahead in this lesson to be easier.
 * Called immediately on "I don't know" so the next tap is actually easier.
 */
function easeRemainingQueue(session, mod) {
  if (!session || !mod) return false;
  const idx = Math.max(0, Number(session.practiceIndex) || 0);
  const kept = (session.queue || []).slice(0, idx + 1);
  const seen = new Set(kept.map((q) => _qFp(q)).filter(Boolean));

  const stage = Number(session.stage) || 1;
  const mainFps = _mainFingerprints(mod);
  let easy = (mod.struggle?.practice || [])
    .map((q, i) => ({
      ...q,
      _src: "help",
      _i: i,
      _diff: 0,
    }))
    .filter((q) => _isGentleHelp(q, mainFps, stage));
  let main = (mod.practice || []).map((q, i) => ({
    ...q,
    _src: "main",
    _i: i,
    _diff: 1,
  }));

  easy = easy.filter((q) => {
    const fp = _qFp(q);
    return fp && !seen.has(fp);
  });
  main = main.filter((q) => {
    const fp = _qFp(q);
    return fp && !seen.has(fp);
  });

  const level = Number(session.adaptLevel) || 0;
  const warmMain = main.filter((q) => typeof q.ramp === "number" && Number(q.ramp) <= 1);
  let tail;
  if (stage >= 4 || level <= -2) tail = [...easy, ...warmMain];
  else {
    const softCount = Math.max(1, Math.min(3, Math.ceil(main.length * 0.4)));
    tail = [...easy, ...main.slice(0, softCount)];
  }

  // If help bank exhausted, still demote remaining original items that were help
  if (!tail.length) {
    const oldTail = (session.queue || []).slice(idx + 1);
    tail = oldTail.filter((q) => q && (q._src === "help" || q._diff === 0));
    if (!tail.length) tail = oldTail.slice(0, Math.min(3, oldTail.length));
  }

  const dedup = [];
  const seenTail = new Set(seen);
  for (const q of tail) {
    const fp = _qFp(q);
    if (!fp || seenTail.has(fp)) continue;
    seenTail.add(fp);
    dedup.push(q);
  }

  if (!dedup.length) return false;
  session.queue = [...kept, ...dedup.slice(0, 6)];
  session.easedAfterIdk = true;
  session.hardenedAfterCorrect = false;
  session.helpShownForIndex = session.helpShownForIndex || {};
  session.helpShownForIndex[idx] = true;
  return true;
}

/**
 * Rebuild remaining questions from unused items on THIS stage.
 * Do not inject later-stage banks (that mixed A* into First steps).
 */
function hardenRemainingQueue(session, mod) {
  if (!session) return false;
  // Later-stage questions are what Unlock is for. Do not reshuffle this lesson into them.
  const banks = collectAdaptiveBanks(
    session.subject,
    session.skillId,
    session.learnerId,
    session.stage || 1
  );
  if (!banks.harder || !banks.harder.length) return false;
  const idx = Math.max(0, Number(session.practiceIndex) || 0);
  const kept = (session.queue || []).slice(0, idx + 1);
  const seen = new Set(kept.map((q) => _qFp(q)).filter(Boolean));
  (session.history || []).forEach((h) => {
    if (h && h.q) seen.add(String(h.q).trim().toLowerCase());
  });

  let harder = _shuffleQs(
    (banks.harder || []).filter((q) => {
      const fp = _qFp(q);
      return fp && !seen.has(fp);
    })
  );
  let main = _shuffleQs(
    (banks.main || []).filter((q) => {
      const fp = _qFp(q);
      return fp && !seen.has(fp);
    })
  );

  const level = Number(session.adaptLevel) || 0;
  let tail;
  if (level >= 2 && harder.length) {
    tail = [...harder, ...main.slice(0, 1)];
  } else if (harder.length) {
    tail = [...harder.slice(0, 5), ...main.slice(0, 2)];
  } else {
    tail = main;
  }

  const dedup = [];
  const seenTail = new Set(seen);
  for (const q of tail) {
    const fp = _qFp(q);
    if (!fp || seenTail.has(fp)) continue;
    seenTail.add(fp);
    dedup.push(q);
  }
  if (!dedup.length) return false;
  session.queue = [...kept, ...dedup.slice(0, 4)];
  session.hardenedAfterCorrect = true;
  session.easedAfterIdk = false;
  session.extendedHarder = (session.extendedHarder || 0) + 1;
  return true;
}

/** If they smashed the first set, append a harder round instead of ending. */
function appendHarderRound(session) {
  if (!session) return 0;
  if ((session.extendedHarder || 0) >= 1) return 0;
  const total = Math.max(1, Number(session.practiceTotal) || 0);
  const correct = Number(session.practiceCorrect) || 0;
  const score = Math.round((correct / total) * 100);
  const level = Number(session.adaptLevel) || 0;
  if (score < 70 && level < 1) return 0;

  const seen = new Set(
    (session.queue || [])
      .map((q) => _qFp(q))
      .concat((session.history || []).map((h) => String((h && h.q) || "").trim().toLowerCase()))
      .filter(Boolean)
  );
  const banks = collectAdaptiveBanks(
    session.subject,
    session.skillId,
    session.learnerId,
    session.stage || 1
  );
  let harder = _shuffleQs(
    (banks.harder || []).filter((q) => {
      const fp = _qFp(q);
      return fp && !seen.has(fp);
    })
  );
  if (!harder.length) return 0;
  const add = harder.slice(0, level >= 2 ? 5 : 4);
  session.queue = [...(session.queue || []), ...add];
  session.extendedHarder = (session.extendedHarder || 0) + 1;
  session.hardenedAfterCorrect = true;
  return add.length;
}

/**
 * "I don't know" — lowers adapt level AND swaps remaining questions to easier ones now.
 */
function handleDontKnow(session, question) {
  session.practiceTotal++;
  session.totalWrong++;
  session.wrongStreak++;
  session.dontKnowCount = (session.dontKnowCount || 0) + 1;
  session.struggleUsed = true;
  session.history.push({
    q: question?.q || "",
    ok: false,
    dontKnow: true,
    answer: null,
    at: Date.now(),
  });
  try {
    if (
      typeof state !== "undefined" &&
      state.profiles &&
      session.learnerId &&
      typeof recordAdaptResult === "function"
    ) {
      const prof = state.profiles[session.learnerId];
      if (prof) {
        session.adaptLevel = recordAdaptResult(
          prof,
          session.subject,
          "dontKnow",
          session.skillId
        );
      }
    }
  } catch (_) {
    /* ignore */
  }

  try {
    if (
      session.subject === "karting" ||
      session.subject === "investing"
    ) {
      if (typeof journeyNoteAnswer === "function" && state.profiles && session.learnerId) {
        const prof = state.profiles[session.learnerId];
        if (prof) journeyNoteAnswer(prof, session.subject, question, false);
      }
      if (typeof journeyScheduleRetry === "function") journeyScheduleRetry(session, question);
    } else {
      const mod = getTeachModule(
        session.subject,
        session.skillId,
        session.stage || 1,
        session.learnerId
      );
      easeRemainingQueue(session, mod);
    }
  } catch (_) {
    /* ignore */
  }
  return false;
}

/**
 * Move to next question. Optionally insert easier Qs after a miss / don't know.
 * Never restarts the full set from the beginning.
 */
function advanceAfterAnswer(session, wasCorrect) {
  if (
    session &&
    (session.subject === "karting" || session.subject === "investing")
  ) {
    session.practiceIndex++;
    if (session.practiceIndex >= (session.queue || []).length) {
      session.phase = "complete";
      session.finished = true;
      return { done: true };
    }
    session.phase = "practice";
    return { done: false };
  }
  const mod = getTeachModule(
    session.subject,
    session.skillId,
    session.stage || 1,
    session.learnerId
  );
  const idx = session.practiceIndex;
  const level = Number(session.adaptLevel) || 0;
  const lastWasIdk = !!(
    session.history &&
    session.history.length &&
    session.history[session.history.length - 1] &&
    session.history[session.history.length - 1].dontKnow
  );

  // If they just said "I don't know", remaining queue was already rebuilt —
  // just advance. For normal wrongs, inject help. For streaks of correct,
  // swap remaining to later-stage harder questions.
  if (lastWasIdk) {
    // Ensure ease ran (in case older callers skipped handleDontKnow path)
    if (!session.easedAfterIdk) easeRemainingQueue(session, mod);
  } else if (wasCorrect) {
    const trail = (session.history || []).slice().reverse();
    let consec = 0;
    for (const h of trail) {
      if (h && h.ok && !h.dontKnow) consec++;
      else break;
    }
    const remaining = (session.queue || []).slice(idx + 1);
    const remainingEasy =
      remaining.length > 0 &&
      remaining.every((q) => (Number(q._diff) || 1) < 2);
    if ((consec >= 3 || level >= 1) && remainingEasy) {
      hardenRemainingQueue(session, mod);
    }
  } else {
    const allowHelp =
      !wasCorrect &&
      mod?.struggle?.practice?.length &&
      !session.helpShownForIndex[idx] &&
      (level < 2 || session.wrongStreak >= 2 || (session.dontKnowCount || 0) > 0);

    if (allowHelp) {
      session.helpShownForIndex[idx] = true;
      const already = new Set(
        (session.queue || []).map((q) => _qFp(q)).filter(Boolean)
      );
      const stage = Number(session.stage) || 1;
      const mainFps = _mainFingerprints(mod);
      let easier = (mod.struggle.practice || [])
        .map((q, i) => ({
          ...q,
          _src: "help",
          _i: i,
          _diff: 0,
        }))
        .filter((q) => {
          const fp = _qFp(q);
          return fp && !already.has(fp) && _isGentleHelp(q, mainFps, stage);
        });
      easier = easier.slice(0, level <= -2 ? 2 : 1);
      if (easier.length) {
        session.queue = [
          ...(session.queue || []).slice(0, idx + 1),
          ...easier,
          ...(session.queue || []).slice(idx + 1),
        ];
      }
    }
  }

  session.practiceIndex++;
  if (session.practiceIndex >= (session.queue || []).length) {
    const added = appendHarderRound(session);
    if (added > 0 && session.practiceIndex < (session.queue || []).length) {
      session.phase = "practice";
      session.finished = false;
      return { done: false, leveledUp: true };
    }
    session.phase = "complete";
    session.finished = true;
    return { done: true };
  }
  session.phase = "practice";
  return { done: false };
}

function scoreSession(session) {
  if (!session.practiceTotal) return 0;
  return Math.round((session.practiceCorrect / session.practiceTotal) * 100);
}
