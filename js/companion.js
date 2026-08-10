/**
 * AI Teacher companion — memory, greetings, guidance, bite-size facts.
 * Works offline with smart local guidance; upgrades with Grok when configured.
 */

const TEACHER_NAME = "Coach";

function escapeHtmlCoach(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Stage letter meanings for kids */
function stageLegendHtml() {
  const rows = Object.values(COURSE_STAGES)
    .map(
      (s) =>
        `<tr>
          <td class="leg-chip">${s.emoji} <strong>${escapeHtmlCoach(s.short)}</strong></td>
          <td><strong>${escapeHtmlCoach(s.name)}</strong></td>
          <td class="muted">${escapeHtmlCoach(s.gradeBand)}</td>
        </tr>`
    )
    .join("");
  return `
    <div class="card stage-legend-card mb-2">
      <h3 style="margin:0 0 0.5rem;font-family:var(--display)">What F · I · S · C · H · A* mean</h3>
      <p class="muted" style="margin:0 0 0.65rem;font-size:0.88rem">
        These are your levels. Finish every lesson in a level to unlock the next one.
      </p>
      <div class="table-wrap">
        <table class="legend-table">
          <thead><tr><th>Code</th><th>Level</th><th>About</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function defaultTutorMemory() {
  return {
    lastSeenAt: 0,
    lastSubject: null,
    lastSkillId: null,
    lastStage: null,
    visitCount: 0,
    struggles: {}, // key subject:skill -> { wrong, attempts, lastAt, title }
    wins: [], // recent { subject, skillId, score, at }
    chat: [], // { role, text, at } last few
    weeklyGoal: 8, // activities per week
    monthlyGoal: 30,
    weekKey: null,
    weekDone: 0,
    monthKey: null,
    monthDone: 0,
    coachNotes: "", // short parent-visible note
  };
}

function ensureTutorMemory(profile) {
  if (!profile.tutorMemory || typeof profile.tutorMemory !== "object") {
    profile.tutorMemory = defaultTutorMemory();
  }
  const m = profile.tutorMemory;
  if (!m.struggles || typeof m.struggles !== "object") m.struggles = {};
  if (!Array.isArray(m.wins)) m.wins = [];
  if (!Array.isArray(m.chat)) m.chat = [];
  if (typeof m.weeklyGoal !== "number") m.weeklyGoal = 8;
  if (typeof m.monthlyGoal !== "number") m.monthlyGoal = 30;
  if (typeof m.weekDone !== "number") m.weekDone = 0;
  if (typeof m.monthDone !== "number") m.monthDone = 0;
  // Roll week / month counters
  const weekKey = isoWeekKey();
  const monthKey = todayKey().slice(0, 7);
  if (m.weekKey !== weekKey) {
    m.weekKey = weekKey;
    m.weekDone = 0;
  }
  if (m.monthKey !== monthKey) {
    m.monthKey = monthKey;
    m.monthDone = 0;
  }
  return m;
}

function isoWeekKey() {
  const d = new Date();
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}

/** Call when learner opens hub */
function touchTutorVisit(profile) {
  const m = ensureTutorMemory(profile);
  m.visitCount = (m.visitCount || 0) + 1;
  m.lastSeenAt = Date.now();
  return m;
}

function recordTutorStruggle(profile, subject, skillId, title) {
  const m = ensureTutorMemory(profile);
  const key = `${subject}:${skillId}`;
  const cur = m.struggles[key] || { wrong: 0, attempts: 0, lastAt: 0, title: title || skillId };
  cur.wrong += 1;
  cur.attempts += 1;
  cur.lastAt = Date.now();
  cur.title = title || cur.title;
  m.struggles[key] = cur;
}

function recordTutorWin(profile, subject, skillId, score, title) {
  const m = ensureTutorMemory(profile);
  m.wins.unshift({
    subject,
    skillId,
    score,
    title: title || skillId,
    at: Date.now(),
  });
  m.wins = m.wins.slice(0, 12);
  m.lastSubject = subject;
  m.lastSkillId = skillId;
  // Count toward week/month when a lesson finishes
  m.weekDone = (m.weekDone || 0) + 1;
  m.monthDone = (m.monthDone || 0) + 1;
}

function topStruggles(profile, limit) {
  const m = ensureTutorMemory(profile);
  return Object.entries(m.struggles || {})
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => b.wrong - a.wrong || b.lastAt - a.lastAt)
    .slice(0, limit || 3);
}

/** Fun, motivational “classroom facts” — not real live stats; framed as coach chat */
const COACH_FACTS = [
  "Lots of clever people found fractions tricky at first — your brain grows when it wrestles!",
  "Olympic athletes practise the same moves hundreds of times. Lessons work the same way.",
  "Most GCSE top-graders still get questions wrong in practice — then they learn why.",
  "A 12-minute focused lesson beats an hour of distracted scrolling every time.",
  "When you explain a method out loud, you remember it better. Try it with Coach!",
  "Algebra is just a puzzle with a secret code. Crack one, and the next feels easier.",
  "Scientists fail experiments on purpose to learn. Wrong answers are data, not drama.",
  "Reading a question twice is a superpower — many mistakes vanish on the second look.",
  "Your pathway has six levels up to A*. Every lesson is a step up the mountain.",
  "Streaks beat cramming: small daily practice beats one giant panic session.",
  "Even pro racing drivers study data after every lap. Checking mistakes is pro behaviour.",
  "If a topic feels hard, that means you’re at the edge of growth — perfect place to be.",
];

function randomCoachFact() {
  return COACH_FACTS[Math.floor(Math.random() * COACH_FACTS.length)];
}

function timeOfDayGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/**
 * Build a local (no API) coach speech bubble from memory + next action.
 */
function buildCoachGreeting(profile, learnerMeta, nextAct) {
  const m = ensureTutorMemory(profile);
  const name = learnerMeta.name || "friend";
  const hi = timeOfDayGreeting();
  const parts = [];

  if (m.visitCount <= 1) {
    parts.push(
      `${hi}, ${name}! I’m ${TEACHER_NAME} — your learning coach. I’ll remember where you left off and cheer you on to GCSE A*.`
    );
  } else {
    const hours = m.lastSeenAt ? (Date.now() - m.lastSeenAt) / 3600000 : 99;
    if (hours > 48) {
      parts.push(`${hi}, ${name}! Great to have you back — ready for a short, powerful session?`);
    } else {
      parts.push(`${hi}, ${name}! Welcome back.`);
    }
  }

  if (m.lastSubject && m.lastSkillId) {
    const title =
      (typeof getLessonMeta === "function" &&
        getLessonMeta(m.lastSubject, m.lastSkillId, m.lastStage || 1).title) ||
      m.lastSkillId;
    const subName = SUBJECTS[m.lastSubject]?.name || m.lastSubject;
    parts.push(`Last time you were on ${subName}: “${title}”.`);
  }

  const struggles = topStruggles(profile, 1);
  if (struggles.length) {
    const s = struggles[0];
    const [sub] = s.key.split(":");
    parts.push(
      `I’ve noticed ${SUBJECTS[sub]?.name || "a topic"} (“${s.title}”) needs a little extra love — we can practise that gently.`
    );
  }

  if (nextAct?.label) {
    parts.push(`Right now, the best next step is: ${nextAct.label}.`);
  }

  const weekLeft = Math.max(0, (m.weeklyGoal || 8) - (m.weekDone || 0));
  if (weekLeft > 0) {
    parts.push(`This week’s goal: ${m.weekDone || 0}/${m.weeklyGoal} activities — ${weekLeft} to go. You’ve got this!`);
  } else {
    parts.push(`Weekly goal smashed (${m.weekDone}/${m.weeklyGoal}) — legend. Keep the streak warm!`);
  }

  parts.push(`💡 ${randomCoachFact()}`);

  return parts.join(" ");
}

/**
 * Offline coach answers for common asks.
 */
function localCoachReply(profile, learnerMeta, question, nextAct) {
  const q = (question || "").toLowerCase().trim();
  const name = learnerMeta.name || "friend";
  const struggles = topStruggles(profile, 2);

  if (!q) return "Ask me anything — e.g. “What should I do next?” or “Help me with fractions”.";

  if (/next|where|start|do now|continue|what should/.test(q)) {
    return nextAct?.label
      ? `I’d go here next, ${name}: **${nextAct.label}**. Tap Continue or open that subject and hit the big green button.`
      : `Open a subject card and I’ll guide you step by step.`;
  }
  if (/stuck|hard|struggl|hate|can't|cannot|difficult/.test(q)) {
    if (struggles.length) {
      return `That’s brave to say. You’re not alone — many students find “${struggles[0].title}” tough at first. Open that lesson, use the support path if you miss one, or ask “explain ${struggles[0].title} simply”.`;
    }
    return `When you’re stuck: (1) re-read the teach points, (2) try the easier practice path, (3) ask me to explain the idea with a real-life example.`;
  }
  if (/goal|week|month/.test(q)) {
    const m = ensureTutorMemory(profile);
    return `This week: ${m.weekDone}/${m.weeklyGoal} activities. This month: ${m.monthDone}/${m.monthlyGoal}. Small daily chunks beat giant weekend crams.`;
  }
  if (/f\b|i\b|stage|level|mean|letter|a\*/.test(q)) {
    return `F Foundation → I Intermediate → S Secure → C GCSE Core → H Higher → A* Mastery. Finish every lesson in a level to unlock the next. There’s a table on your hub that explains each one.`;
  }
  if (/fraction|algebra|percent|angle|grammar|punctuation|cell|force|energy/.test(q)) {
    return `Good topic choice. Open the matching lesson in your course list (or Continue). In the lesson, use Teach → Example → Practice. If you miss one, the easier path kicks in. Ask me again with the exact question text if you want a walkthrough.`;
  }
  if (/bored|fun|why|pointless/.test(q)) {
    return `Fair question. Every short lesson is a brick in a GCSE-strong brain. We keep chunks small on purpose so you stay sharp — like training laps, not a 10-hour slog. Pick one 10-minute win right now.`;
  }
  if (/power\s*5|quick|drill|warm.?up|keep sharp|blitz/.test(q)) {
    const sub = nextAct?.subject || "maths";
    return `Power 5 is a super-fast 5-question blitz — perfect warm-up or cool-down. Tap **Power 5** on your hub (or Continue when you're all caught up). I'd start with ${SUBJECTS[sub]?.name || sub}. Aim under 90 seconds if you want the Speed Demon badge!`;
  }
  if (/streak|daily|habit/.test(q)) {
    const d = typeof dailyProgress === "function" ? dailyProgress(profile) : null;
    return d
      ? `Today: ${d.done}/${d.goal} activities. Streaks grow when you open the lab and finish something every day — even a Power 5 counts. Consistency beats cramming.`
      : `Open the hub each day and hit Continue or Power 5 — small daily practice wins.`;
  }

  return `I’m here. Try: “What next?”, “What am I stuck on?”, “Power 5”, or describe a question. ${
    isAiConfigured()
      ? "With AI connected I can also give a full personal explanation."
      : "(Parent can turn on full AI in Parent zone for deeper answers.)"
  }`;
}

/**
 * Full AI coach reply (Grok) with memory context; falls back locally.
 */
async function askCoach(profile, learnerMeta, question, nextAct) {
  const local = localCoachReply(profile, learnerMeta, question, nextAct);
  if (!isAiConfigured()) return local;

  const m = ensureTutorMemory(profile);
  const struggles = topStruggles(profile, 3)
    .map((s) => `${s.title} (${s.wrong} tough attempts)`)
    .join("; ");
  const next = nextAct?.label || "explore subjects";
  const system = `You are ${TEACHER_NAME}, an extraordinary UK home-education coach for ${learnerMeta.fullName}, age ${learnerMeta.age} (${learnerMeta.yearGroup}).
Be warm, clear, never condescending. British spelling. Keep answers under 120 words.
You remember their journey: next best action is "${next}".
Recent struggles: ${struggles || "none logged yet"}.
Weekly progress: ${m.weekDone}/${m.weeklyGoal}. Monthly: ${m.monthDone}/${m.monthlyGoal}.
Guide them to small, fun, doable next steps. Use one short encouraging fact if natural.
Do not invent that you can open screens for them — tell them which button to tap.`;

  try {
    const text = await askGrok([
      { role: "system", content: system },
      { role: "user", content: question },
    ]);
    return (text || local).trim();
  } catch (e) {
    return `${local}\n\n(Full AI was offline just now — used my built-in coach brain.)`;
  }
}

function pushChat(profile, role, text) {
  const m = ensureTutorMemory(profile);
  m.chat.push({ role, text, at: Date.now() });
  m.chat = m.chat.slice(-16);
}

/**
 * HTML for the companion panel (hub / subject).
 */
function coachPanelHtml(profile, learnerMeta, nextAct, opts) {
  opts = opts || {};
  const m = ensureTutorMemory(profile);
  const speech =
    opts.speech || buildCoachGreeting(profile, learnerMeta, nextAct);
  // Cool teacher avatar (learner-themed), not racing cars / animals in the chat row
  const img = illustFor("coach", learnerMeta.id);
  const struggles = topStruggles(profile, 2);
  const struggleLine = struggles.length
    ? `<p class="coach-struggle">🎯 Focus zone: <strong>${escapeHtmlCoach(
        struggles.map((s) => s.title).join(", ")
      )}</strong></p>`
    : "";
  const voiceOn =
    typeof getVoicePrefs === "function" && getVoicePrefs().enabled === true;

  return `
    <div class="card coach-panel mb-2" id="coachPanel">
      <div class="coach-row">
        <div class="coach-avatar-wrap">
          <img class="coach-avatar" src="${img.src}" alt="${escapeHtmlCoach(img.alt)}" width="112" height="112" />
          <span class="coach-online">Online</span>
        </div>
        <div class="coach-main">
          <div class="coach-name">
            <span>${TEACHER_NAME} · chat with your AI teacher</span>
          </div>
          <div class="speech-bubble" id="coachSpeech">${escapeHtmlCoach(speech)}</div>
          ${struggleLine}
          <div class="coach-goals muted">
            Week ${m.weekDone}/${m.weeklyGoal} · Month ${m.monthDone}/${m.monthlyGoal}
            ${voiceOn ? "" : " · Chat only (voice off until Grok Voice is ready)"}
          </div>
          ${voiceOn ? `<div class="voice-status-slot" id="voiceStatusBanner"></div>` : ""}
        </div>
      </div>
      <div class="coach-ask">
        <input type="text" class="coach-input" id="coachInput" maxlength="280"
          placeholder="Type a message to Coach… e.g. What should I do next?" autocomplete="off" />
        <button type="button" class="btn btn-primary" id="coachSend">Send</button>
      </div>
      <div class="coach-chips">
        <button type="button" class="coach-chip" data-coach-q="What should I do next?">What next?</button>
        <button type="button" class="coach-chip" data-coach-q="Where did I leave off?">Where did I leave off?</button>
        <button type="button" class="coach-chip" data-coach-q="What am I struggling with?">What am I stuck on?</button>
        <button type="button" class="coach-chip" data-coach-q="Tell me about Power 5">⚡ Power 5?</button>
        <button type="button" class="coach-chip" data-coach-q="What do F I S C H A* mean?">What do the letters mean?</button>
      </div>
      <div id="coachChatLog" class="coach-chat-log" hidden></div>
    </div>`;
}

function bindCoachPanel(profile, learnerMeta, nextAct) {
  const speechEl = document.getElementById("coachSpeech");
  const input = document.getElementById("coachInput");
  const send = document.getElementById("coachSend");
  const log = document.getElementById("coachChatLog");

  // Voice optional — only if parent explicitly enabled Grok Voice
  if (typeof getVoicePrefs === "function" && getVoicePrefs().enabled) {
    if (typeof bindSpeakButtons === "function")
      bindSpeakButtons(document.getElementById("coachPanel"));
    if (typeof updateVoiceStatusBanners === "function") updateVoiceStatusBanners();
    if (speechEl && typeof maybeAutoSpeak === "function") {
      const greets = speechEl.textContent || "";
      if (greets && !window.__coachGreetSpoken) {
        window.__coachGreetSpoken = true;
        maybeAutoSpeak(greets);
      }
    }
  }

  async function handleAsk(q) {
    q = (q || input?.value || "").trim();
    if (!q) return;
    if (input) input.value = "";
    if (typeof stopSpeaking === "function") stopSpeaking();
    if (speechEl) speechEl.textContent = "Thinking…";
    pushChat(profile, "user", q);
    try {
      const reply = await askCoach(profile, learnerMeta, q, nextAct);
      pushChat(profile, "coach", reply);
      const clean = reply.replace(/\*\*/g, "");
      if (speechEl) speechEl.textContent = clean;
      if (
        typeof getVoicePrefs === "function" &&
        getVoicePrefs().enabled &&
        typeof maybeAutoSpeak === "function"
      ) {
        maybeAutoSpeak(clean);
      }
      if (log) {
        log.hidden = false;
        log.innerHTML = ensureTutorMemory(profile)
          .chat.slice(-6)
          .map(
            (c) =>
              `<div class="coach-log-line ${c.role}"><strong>${
                c.role === "user" ? "You" : TEACHER_NAME
              }:</strong> ${escapeHtmlCoach(c.text)}</div>`
          )
          .join("");
      }
      if (typeof save === "function") save({ quiet: true }).catch(() => {});
    } catch (e) {
      if (speechEl)
        speechEl.textContent =
          "I hit a snag — try again, or use the big green Continue button.";
    }
  }

  send?.addEventListener("click", () => handleAsk());
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAsk();
  });
  document.querySelectorAll("[data-coach-q]").forEach((btn) => {
    btn.addEventListener("click", () => handleAsk(btn.dataset.coachQ));
  });
}

/** Tiny rotating fact strip for lessons */
function lessonFunFactHtml(subject, skillId) {
  const facts = {
    maths: [
      "Even NASA engineers double-check their arithmetic.",
      "The word ‘algebra’ comes from Arabic — a thousand-year-old toolkit.",
      "Top GCSE scorers still miss easy marks when they rush. Slow is smooth.",
    ],
    english: [
      "Authors rewrite sentences dozens of times. First drafts are allowed to be messy.",
      "Your brain loves stories — link a grammar rule to a silly example and it sticks.",
      "Reading 10 minutes a day grows vocabulary faster than cramming word lists.",
    ],
    science: [
      "Every smartphone is packed with physics and chemistry working together.",
      "Scientists celebrate ‘failed’ trials — they narrow the truth.",
      "You are made of elements forged in ancient stars. Science is personal.",
    ],
  };
  const bank = facts[subject] || COACH_FACTS;
  const line = bank[Math.abs(hashStr(skillId || subject)) % bank.length];
  return `<p class="fun-fact-strip">💡 <strong>Did you know?</strong> ${escapeHtmlCoach(line)}</p>`;
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < String(s).length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
