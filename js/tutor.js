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
 * Create an adaptive session state for a skill module
 * @param {number} [stageNum=1] Foundation=1 Intermediate=2
 */
function createTutorSession(subject, skillId, learnerId, stageNum) {
  const stage = Number(stageNum) || 1;
  const mod = getTeachModule(subject, skillId, stage, learnerId);
  if (!mod) return null;
  return {
    subject,
    skillId,
    learnerId,
    stage,
    phase: "teach", // teach | example | practice | struggle_teach | struggle_practice | video | complete
    practiceIndex: 0,
    practiceCorrect: 0,
    practiceTotal: 0,
    wrongStreak: 0,
    totalWrong: 0,
    struggleUsed: false,
    videoShown: false,
    aiHelp: null,
    history: [],
    startedAt: Date.now(),
  };
}

function currentPracticeList(session) {
  const mod = getTeachModule(
    session.subject,
    session.skillId,
    session.stage || 1,
    session.learnerId
  );
  if (!mod) return [];
  if (session.phase === "struggle_practice") {
    return mod.struggle?.practice || mod.practice || [];
  }
  return mod.practice || [];
}

function sessionProgress(session) {
  const list = currentPracticeList(session);
  if (session.phase === "teach" || session.phase === "example") {
    return { label: "Learning", pct: session.phase === "teach" ? 10 : 25 };
  }
  if (session.phase === "video") return { label: "Video boost", pct: 50 };
  if (session.phase === "complete") return { label: "Done", pct: 100 };
  const idx = session.practiceIndex;
  const n = list.length || 1;
  const base = session.phase.startsWith("struggle") ? 55 : 30;
  const span = session.phase.startsWith("struggle") ? 35 : 60;
  return {
    label: `Question ${Math.min(idx + 1, n)} / ${n}`,
    pct: Math.min(99, base + Math.round((idx / n) * span)),
  };
}

/**
 * After answering: returns { correct, nextPhase updates to apply }
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
    session.practiceIndex++;
    const list = currentPracticeList(session);
    if (session.practiceIndex >= list.length) {
      session.phase = "complete";
    }
  } else {
    session.totalWrong++;
    session.wrongStreak++;
    // Branch into struggle path
    if (!session.struggleUsed && session.wrongStreak >= 1) {
      session.struggleUsed = true;
      session.phase = "struggle_teach";
      session.practiceIndex = 0;
    } else if (session.wrongStreak >= 2 && !session.videoShown) {
      session.videoShown = true;
      session.phase = "video";
    } else {
      // stay on question but mark for feedback — caller shows explain then next
      session.practiceIndex++;
      const list = currentPracticeList(session);
      if (session.practiceIndex >= list.length) {
        session.phase = "complete";
      }
    }
  }

  return ok;
}

function scoreSession(session) {
  if (!session.practiceTotal) return 0;
  return Math.round((session.practiceCorrect / session.practiceTotal) * 100);
}
