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
  return `You are a friendly UK tutor for ${learnerMeta.fullName}, age ${learnerMeta.age} (${learnerMeta.yearGroup}).
Follow the English National Curriculum. Keep language clear and encouraging.
Explain mistakes simply, give one mini worked example, then one similar practice question.
Never be condescending. Use British spelling. Keep answers under 180 words unless asked.
Format practice question clearly at the end if you include one.`;
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
  // v2: clears sticky old Science queues that only had 3 questions
  return `rawson-live-quiz-v2:${learnerId || "x"}:${subject}:${skillId}:${stage}`;
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

/**
 * Build practice queue shaped by adaptive difficulty.
 * Always shuffles and prefers questions not asked recently (stops Science loops).
 */
function buildAdaptivePracticeQueue(mod, profile, subject) {
  const shuffle =
    typeof shuffleArray === "function"
      ? shuffleArray
      : (arr) => arr.slice().sort(() => Math.random() - 0.5);
  const freshen =
    typeof preferFreshQuestions === "function"
      ? (pool) => preferFreshQuestions(pool, profile, subject)
      : (pool) => pool.slice();

  let main = (mod.practice || []).map((q, i) => ({
    ...q,
    _src: "main",
    _i: i,
    _diff: 1,
  }));
  let easy = (mod.struggle?.practice || []).map((q, i) => ({
    ...q,
    _src: "help",
    _i: i,
    _diff: 0,
  }));

  main = shuffle(freshen(main));
  easy = shuffle(freshen(easy));

  const level =
    profile && typeof getAdaptLevel === "function"
      ? getAdaptLevel(profile, subject)
      : 0;

  let queue;
  if (level <= -2) {
    const softMain = main.slice(0, Math.max(2, Math.ceil(main.length * 0.7)));
    queue = [...easy, ...softMain];
  } else if (level === -1) {
    queue = easy.length
      ? [...easy.slice(0, Math.min(2, easy.length)), ...main]
      : main;
  } else if (level >= 2) {
    queue = main; // already shuffled; no forced reverse (that caused repeats)
  } else {
    queue = main;
  }

  // De-dupe by question text inside this queue
  const seen = new Set();
  queue = queue.filter((q) => {
    const fp =
      typeof questionFingerprint === "function"
        ? questionFingerprint(q)
        : String(q.q || "");
    if (!fp || seen.has(fp)) return false;
    seen.add(fp);
    return true;
  });

  // Cap length but keep variety
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
  const queue = buildAdaptivePracticeQueue(mod, profile, subject);
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
          ok ? "correct" : "wrong"
        );
      }
    }
  } catch (_) {
    /* ignore */
  }
  return ok;
}

/**
 * "I don't know" — honest skip that eases future questions and unlocks help.
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
          "dontKnow"
        );
      }
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
  const mod = getTeachModule(
    session.subject,
    session.skillId,
    session.stage || 1,
    session.learnerId
  );
  const idx = session.practiceIndex;
  const queue = session.queue || [];
  const level = Number(session.adaptLevel) || 0;

  // High difficulty: only inject help after a short wrong streak
  const allowHelp =
    !wasCorrect &&
    mod?.struggle?.practice?.length &&
    !session.helpShownForIndex[idx] &&
    (level < 2 || session.wrongStreak >= 2 || (session.dontKnowCount || 0) > 0);

  if (allowHelp) {
    session.helpShownForIndex[idx] = true;
    const already = new Set(
      (session.queue || []).map((q) =>
        typeof questionFingerprint === "function"
          ? questionFingerprint(q)
          : String(q.q || "")
      )
    );
    let easier = (mod.struggle.practice || [])
      .map((q, i) => ({
        ...q,
        _src: "help",
        _i: i,
        _diff: 0,
      }))
      .filter((q) => {
        const fp =
          typeof questionFingerprint === "function"
            ? questionFingerprint(q)
            : String(q.q || "");
        return fp && !already.has(fp);
      });
    if (typeof shuffleArray === "function") easier = shuffleArray(easier);
    // Inject one fresh help question (or two if very easy)
    easier = easier.slice(0, level <= -2 ? 2 : 1);
    if (easier.length) {
      session.queue = [
        ...queue.slice(0, idx + 1),
        ...easier,
        ...queue.slice(idx + 1),
      ];
    }
  }

  session.practiceIndex++;
  if (session.practiceIndex >= (session.queue || []).length) {
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
