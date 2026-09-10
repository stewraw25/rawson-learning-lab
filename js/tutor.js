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
  // v3: old queues never pulled harder (stage+1) questions — drop sticky first-sets
  return `rawson-live-quiz-v3:${learnerId || "x"}:${subject}:${skillId}:${stage}`;
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
 * Current-stage easy/main plus later-stage stretch questions for the same skill.
 * This is how F1 / horse courses actually get harder instead of looping set 1.
 */
function collectAdaptiveBanks(subject, skillId, learnerId, currentStage) {
  const stage = Number(currentStage) || 1;
  const maxStage = typeof MAX_COURSE_STAGE === "number" ? MAX_COURSE_STAGE : 6;
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

  const harder = [];
  const seen = new Set(
    main.concat(easy).map((q) => String(q.q || "").trim().toLowerCase())
  );
  for (let s = stage + 1; s <= maxStage; s++) {
    const raw = rawStageModule(subject, skillId, s);
    if (!raw || !Array.isArray(raw.practice) || !raw.practice.length) continue;
    const diff = s === stage + 1 ? 2 : 3;
    const tagged = _tagQs(
      _filterQsForLearner(raw.practice, learnerId),
      "stretch",
      diff,
      s
    );
    for (const q of tagged) {
      const fp = String(q.q || "").trim().toLowerCase();
      if (!fp || seen.has(fp)) continue;
      seen.add(fp);
      harder.push(q);
    }
  }
  return { main, easy, harder };
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
 * Build practice queue shaped by adaptive difficulty.
 * Getting better MUST pull later-stage questions — never recycle the first set.
 */
function buildAdaptivePracticeQueue(mod, profile, subject, extra) {
  extra = extra || {};
  const skillId = extra.skillId || (mod && mod.skillId) || null;
  const stage = Number(extra.stage) || 1;
  const learnerId =
    extra.learnerId || (profile && profile.id) || null;
  const level =
    extra.level != null
      ? Number(extra.level)
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

  let easy = _freshOnly(banks.easy, profile, subject);
  let main = _freshOnly(banks.main, profile, subject);
  let harder = _freshOnly(banks.harder, profile, subject);
  // Fresh-empty on this stage → use harder, not the same first set again
  if (!main.length && banks.harder.length) main = banks.harder.slice();
  else if (!main.length) main = (banks.main || []).slice();
  if (!easy.length) easy = (banks.easy || []).slice();
  if (!harder.length) harder = (banks.harder || []).slice();

  easy = _shuffleQs(easy);
  main = _shuffleQs(main);
  harder = _shuffleQs(harder);

  let queue;
  if (level <= -2) {
    const softMain = main.slice(0, Math.max(2, Math.ceil(main.length * 0.5)));
    queue = [...easy, ...softMain];
  } else if (level === -1) {
    queue = easy.length
      ? [...easy.slice(0, Math.min(2, easy.length)), ...main]
      : main;
  } else if (level === 1) {
    queue = [
      ...main.slice(0, Math.max(3, Math.min(4, main.length))),
      ...harder.slice(0, 4),
    ];
  } else if (level === 2) {
    queue = harder.length
      ? [...main.slice(0, 2), ...harder.slice(0, 6)]
      : main;
  } else if (level >= 3) {
    queue = harder.length ? [...harder.slice(0, 7), ...main.slice(0, 1)] : main;
  } else {
    // First try / just right — stay on this easy set. Climb after they ace a streak.
    queue = main.length ? main : easy;
  }

  queue = dedupeQuestionQueue(queue);
  if (!queue.length) {
    queue = dedupeQuestionQueue([...main, ...easy, ...harder]);
  }
  if (queue.length > 8) queue = queue.slice(0, 8);
  return queue;
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
    profile && typeof getAdaptLevel === "function"
      ? getAdaptLevel(profile, subject)
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
        if (saved && typeof saved === "object" && saved.phase && saved.phase !== "complete") {
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

/**
 * Rebuild EVERYTHING still ahead in this lesson to be easier.
 * Called immediately on "I don't know" so the next tap is actually easier.
 */
function easeRemainingQueue(session, mod) {
  if (!session || !mod) return false;
  const idx = Math.max(0, Number(session.practiceIndex) || 0);
  const kept = (session.queue || []).slice(0, idx + 1);
  const seen = new Set(kept.map((q) => _qFp(q)).filter(Boolean));

  const shuffle =
    typeof shuffleArray === "function"
      ? shuffleArray
      : (arr) => arr.slice().sort(() => Math.random() - 0.5);

  let easy = (mod.struggle?.practice || []).map((q, i) => ({
    ...q,
    _src: "help",
    _i: i,
    _diff: 0,
  }));
  let main = (mod.practice || []).map((q, i) => ({
    ...q,
    _src: "main",
    _i: i,
    _diff: 1,
  }));

  easy = shuffle(easy.filter((q) => {
    const fp = _qFp(q);
    return fp && !seen.has(fp);
  }));
  main = shuffle(main.filter((q) => {
    const fp = _qFp(q);
    return fp && !seen.has(fp);
  }));

  // Prefer help/easy first; only a soft slice of main
  const softCount = Math.max(1, Math.min(3, Math.ceil(main.length * 0.4)));
  let tail = [...easy, ...main.slice(0, softCount)];

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
 * Rebuild remaining questions to be harder (later-stage stretch).
 * Called after a correct streak so the lesson climbs instead of looping set 1.
 */
function hardenRemainingQueue(session, mod) {
  if (!session) return false;
  const idx = Math.max(0, Number(session.practiceIndex) || 0);
  const kept = (session.queue || []).slice(0, idx + 1);
  const seen = new Set(kept.map((q) => _qFp(q)).filter(Boolean));
  (session.history || []).forEach((h) => {
    if (h && h.q) seen.add(String(h.q).trim().toLowerCase());
  });

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
    const mod = getTeachModule(
      session.subject,
      session.skillId,
      session.stage || 1,
      session.learnerId
    );
    easeRemainingQueue(session, mod);
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
      let easier = (mod.struggle.practice || [])
        .map((q, i) => ({
          ...q,
          _src: "help",
          _i: i,
          _diff: 0,
        }))
        .filter((q) => {
          const fp = _qFp(q);
          return fp && !already.has(fp);
        });
      if (typeof shuffleArray === "function") easier = shuffleArray(easier);
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
