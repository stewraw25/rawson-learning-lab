/**
 * Rawson Learning Lab — UI
 */

let state = loadState();
const appEl = document.getElementById("app");
let parentPollTimer = null;
let syncStatus = ""; // shown in UI after push/pull

function stopParentPoll() {
  if (parentPollTimer) {
    clearInterval(parentPollTimer);
    parentPollTimer = null;
  }
}

async function save(options = {}) {
  const { pushCloud = true } = options;
  saveState(state);
  if (pushCloud && isSyncEnabled() && state.activeLearner) {
    try {
      syncStatus = "Saving to family cloud…";
      await pushProfile(state.activeLearner, state.profiles[state.activeLearner]);
      syncStatus = "Cloud saved ✓ " + formatTime(Date.now());
    } catch (err) {
      console.error(err);
      syncStatus = "Cloud save failed — still saved on this Mac";
    }
  }
}

async function refreshFromCloud(opts = {}) {
  const { silent = false } = opts;
  if (!isSyncEnabled()) return false;
  try {
    if (!silent) syncStatus = "Syncing…";
    const result = await Promise.race([
      pullProfiles(state),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Cloud timeout")), 8000)
      ),
    ]);
    if (result.changed) {
      saveState(state);
      syncStatus = "Updated from family cloud ✓ " + formatTime(Date.now());
    } else if (!silent) {
      syncStatus = "Up to date ✓ " + formatTime(Date.now());
    }
    return result.changed;
  } catch (err) {
    console.error(err);
    if (!silent) syncStatus = "Cloud sync error — check Family sync setup";
    return false;
  }
}

function profile() {
  return state.profiles[state.activeLearner];
}

function learner() {
  return LEARNERS[state.activeLearner];
}

function go(screen, params = {}) {
  stopParentPoll();
  window.scrollTo(0, 0);
  const routes = {
    home: renderHome,
    dashboard: renderDashboard,
    diagnostic: renderDiagnostic,
    diagnosticResult: renderDiagnosticResult,
    lesson: renderLesson,
    lessonResult: renderLessonResult,
    parent: renderParent,
    subject: renderSubject,
    sync: renderSyncSetup,
    aiSettings: renderAiSettings,
  };
  const fn = routes[screen];
  if (fn) fn(params);
}

// —— Shell helpers ——
function topbar(extraRight = "") {
  const L = state.activeLearner ? learner() : null;
  return `
    <header class="topbar">
      <div class="logo" role="button" tabindex="0" data-go="home">
        <img class="logo-mark" src="assets/logo.svg" width="46" height="46" alt="Rawson Learning Lab" />
        <div>
          <h1>Rawson Learning Lab</h1>
          <p>Homeschooling tuition · tailored for each student</p>
        </div>
      </div>
      <div class="pill-row">
        ${
          L
            ? `<span class="pill">${L.emoji} <strong>${escapeHtml(
                L.name
              )}</strong></span>
               <span class="pill">⚡ Lv <strong>${
                 profile().level
               }</strong></span>
               <span class="pill">🔥 <strong>${
                 profile().streak
               }</strong> day streak</span>
               <button class="btn btn-ghost" data-go="dashboard" type="button">My hub</button>
               <button class="btn btn-ghost" data-switch type="button">Switch kid</button>`
            : ""
        }
        ${extraRight}
      </div>
    </header>`;
}

function bindShell() {
  appEl.querySelectorAll("[data-go]").forEach((el) => {
    el.addEventListener("click", () => go(el.dataset.go));
  });
  const sw = appEl.querySelector("[data-switch]");
  if (sw) {
    sw.addEventListener("click", () => {
      state.activeLearner = null;
      save();
      go("home");
    });
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Build context + open AI learning window for a question */
function learnAboutButtonHtml() {
  return `<button type="button" class="btn-learn-about" id="btnLearnAbout">📖 Learn about this subject</button>`;
}

function bindLearnAbout(btn, payload) {
  if (!btn) return;
  btn.onclick = () => {
    const L = state.activeLearner ? learner() : null;
    openLearnAboutSubject({
      ...payload,
      learnerId: state.activeLearner || null,
      learnerName: L?.fullName || L?.name || "",
      age: L?.age,
      yearGroup: L?.yearGroup,
    });
  };
}

function questionLearnPayload(subject, skillId, q) {
  return {
    subject,
    subjectName: SUBJECTS[subject]?.name || subject,
    skillId: skillId || q.skill || "",
    skillName:
      (skillId && SKILLS[subject]?.[skillId]?.name) ||
      (q.skill && SKILLS[subject]?.[q.skill]?.name) ||
      "This topic",
    question: q.q,
    passage: q.passage || "",
    type: q.type,
    options: q.options || null,
    explain: q.explain || "",
  };
}

// —— HOME ——
function renderHome() {
  appEl.innerHTML = `
    ${topbar(`<button class="btn btn-ghost" data-go="parent" type="button">Parent zone</button>`)}
    <section class="hero">
      <img class="hero-logo" src="assets/logo-icon.jpg" width="96" height="96" alt="Rawson Learning Lab" />
      <h2>Homeschooling tuition programme <span class="sparkle">tailored for each student</span></h2>
      <p class="lead center">For <strong>Bella-Rose</strong> (12) &amp; <strong>George</strong> (10) · English, Maths &amp; Science · UK GCSE foundations</p>
    </section>
    <div class="grid-2">
      ${profileCard("bella")}
      ${profileCard("george")}
    </div>
    <div class="parent-bar">
      <button class="btn btn-primary" type="button" data-go="sync">☁️ Family cloud sync</button>
      <button class="btn btn-secondary" type="button" id="btnExport">⬇ Export backup</button>
      <button class="btn btn-secondary" type="button" id="btnImport">⬆ Import backup</button>
      <input type="file" id="importFile" accept="application/json" hidden />
    </div>
    <p class="muted center mt-1" style="font-size:0.8rem">
      ${
        isSyncEnabled()
          ? "☁️ Family cloud is ON — progress shares across your iMacs."
          : "Tip: set up Family cloud sync once so Mum/Dad can watch progress live on another Mac."
      }
    </p>
  `;
  bindShell();
  appEl.querySelectorAll("[data-pick]").forEach((el) => {
    el.addEventListener("click", async () => {
      state.activeLearner = el.dataset.pick;
      await refreshFromCloud({ silent: true });
      await save();
      go("dashboard");
    });
  });
  document.getElementById("btnExport").onclick = () => {
    const blob = new Blob([exportState(state)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `rawson-learning-backup-${todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  document.getElementById("btnImport").onclick = () =>
    document.getElementById("importFile").click();
  document.getElementById("importFile").onchange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      state = importState(text);
      save();
      alert("Progress imported!");
      go("home");
    } catch {
      alert("Could not import that file.");
    }
  };
}

function profileCard(id) {
  const L = LEARNERS[id];
  const p = state.profiles[id];
  const tests = Object.values(p.diagnostics).filter((d) => d?.completed).length;
  const lessons = p.lessonHistory.length;
  return `
    <article class="card profile-card ${L.theme}" data-pick="${id}">
      <div class="avatar">${L.emoji}</div>
      <h3>${escapeHtml(L.fullName)}</h3>
      <div class="age">Age ${L.age} · ${L.yearGroup}</div>
      <p class="muted mb-1">${escapeHtml(L.tagline)}</p>
      <div class="profile-stats">
        <span class="stat-chip">Lv ${p.level}</span>
        <span class="stat-chip">${p.xp} XP</span>
        <span class="stat-chip">${tests}/3 tests</span>
        <span class="stat-chip">${lessons} lessons</span>
      </div>
      <button class="btn btn-primary btn-block mt-2" type="button">Enter ${escapeHtml(
        L.name
      )}'s hub →</button>
    </article>`;
}

// —— DASHBOARD ——
function renderDashboard() {
  if (!state.activeLearner) return go("home");
  const L = learner();
  const p = profile();
  const xpInLevel = p.xp % 100;

  appEl.innerHTML = `
    ${topbar()}
    <div class="welcome-banner ${L.theme}">
      <div>
        <h2>Hey ${escapeHtml(L.name)}! ${L.emoji}</h2>
        <p class="muted" style="margin:0.35rem 0 0">Your homeschool path — English, Maths &amp; Science toward GCSE</p>
      </div>
      <div class="xp-ring">
        <div class="lvl">Level ${p.level}</div>
        <div class="xp-bar"><div class="xp-fill" style="width:${xpInLevel}%"></div></div>
        <div class="muted" style="font-size:0.75rem;margin-top:0.25rem">${xpInLevel}/100 XP</div>
      </div>
    </div>

    <h2 class="section-title">Your subjects</h2>
    <p class="lead">Take a placement test first — then we tailor lessons to what <em>you</em> need.</p>
    <div class="grid-3 mb-2">
      ${subjectDashCard("maths")}
      ${subjectDashCard("english")}
      ${subjectDashCard("science")}
    </div>

    <div class="card mb-2">
      <h3 style="margin-top:0;font-family:var(--display)">Badges</h3>
      <div class="badge-list">
        ${BADGES.map((b) => {
          const on = p.badges.includes(b.id);
          return `<span class="badge ${on ? "" : "locked"}" title="${escapeHtml(
            b.desc
          )}">${b.emoji} ${escapeHtml(b.name)}</span>`;
        }).join("")}
      </div>
    </div>

    <div class="card">
      <h3 style="margin-top:0;font-family:var(--display)">How it works</h3>
      <ol class="muted" style="line-height:1.6;margin:0;padding-left:1.2rem">
        <li><strong style="color:var(--text)">Placement test</strong> — see where you are in each subject</li>
        <li><strong style="color:var(--text)">Personal course</strong> — weaker skills first (GCSE-linked)</li>
        <li><strong style="color:var(--text)">Adaptive lessons</strong> — teach → example → practice; if you struggle it slows down &amp; helps</li>
        <li><strong style="color:var(--text)">XP &amp; badges</strong> — level up as you learn</li>
      </ol>
    </div>
  `;
  bindShell();
  appEl.querySelectorAll("[data-subject]").forEach((el) => {
    el.addEventListener("click", () => go("subject", { subject: el.dataset.subject }));
  });
}

function subjectDashCard(subject) {
  const S = SUBJECTS[subject];
  const p = profile();
  const overall = subjectOverall(p, subject);
  const diag = p.diagnostics[subject];
  const next = nextLesson(p, subject);
  let status;
  if (!diag?.completed) status = "Placement test ready";
  else if (next) status = `Next: ${LESSONS[subject][next]?.title || next}`;
  else status = "Course complete — retake lessons anytime";

  return `
    <article class="card subject-card ${S.colour}" data-subject="${subject}" style="cursor:pointer">
      <div class="icon">${S.emoji}</div>
      <h3>${S.name}</h3>
      <p class="muted" style="margin:0;font-size:0.85rem;min-height:2.4em">${status}</p>
      <div class="skill-meter">
        <div class="skill-fill" style="width:${overall ?? 5}%"></div>
      </div>
      <div class="muted" style="font-size:0.78rem;font-weight:800">
        ${overall == null ? "Not assessed yet" : `Skill level ~${overall}%`}
      </div>
    </article>`;
}

// —— SUBJECT HUB ——
function renderSubject({ subject }) {
  if (!state.activeLearner) return go("home");
  const S = SUBJECTS[subject];
  const p = profile();
  const diag = p.diagnostics[subject];
  if (!p.courses[subject] && diag?.completed) buildCourse(p, subject);
  const course = p.courses[subject];

  appEl.innerHTML = `
    ${topbar()}
    <button class="btn btn-ghost mb-1" type="button" data-go="dashboard">← Back to hub</button>
    <h2 class="section-title">${S.emoji} ${S.name}</h2>
    <p class="lead">UK National Curriculum foundations on the GCSE pathway (${
      learner().yearGroup
    })</p>

    <div class="card mb-2">
      <h3 style="margin-top:0">1. Placement test</h3>
      ${
        diag?.completed
          ? `<p>Last score: <strong style="color:var(--gold)">${diag.score}%</strong> (${diag.correct}/${diag.total}) on ${diag.date}</p>
             <button class="btn btn-secondary" type="button" id="retakeDiag">Retake test</button>`
          : `<p class="muted">Find your starting level — about 10–12 questions. Be honest; wrong answers help us teach better!</p>
             <button class="btn btn-primary btn-lg" type="button" id="startDiag">Start ${S.name} placement test →</button>`
      }
    </div>

    <div class="card">
      <h3 style="margin-top:0">2. Your personalised course</h3>
      <p class="muted">${
        course
          ? escapeHtml(course.focusMessage)
          : "Complete the placement test and we'll build a course aimed at your gaps."
      }</p>
      ${
        course
          ? `<div class="course-list mt-1">
              ${course.path
                .map((skillId, i) => {
                  const lesson = LESSONS[subject][skillId];
                  const done = course.completed[skillId];
                  const prevDone =
                    i === 0 || course.completed[course.path[i - 1]];
                  const locked = !diag?.completed || (!done && !prevDone && i > 0);
                  // unlock sequential but allow any done; first available next is unlocked
                  const nextId = nextLesson(p, subject);
                  const isNext = skillId === nextId;
                  const canDo = diag?.completed && (done || isNext || i === 0 || prevDone);
                  return `
                    <div class="course-item ${done ? "done" : ""} ${
                      !canDo ? "locked" : ""
                    }">
                      <div class="num">${done ? "✓" : i + 1}</div>
                      <div class="body">
                        <h4>${escapeHtml(lesson.title)}</h4>
                        <p>${escapeHtml(lesson.blurb)} · <em>${escapeHtml(
                    SKILLS[subject][skillId].gcse
                  )}</em></p>
                        ${
                          done
                            ? `<p style="color:var(--ok);font-weight:800">Scored ${done.score}%</p>`
                            : ""
                        }
                      </div>
                      <button class="btn ${
                        done ? "btn-secondary" : "btn-primary"
                      }" type="button" data-lesson="${skillId}" ${
                    canDo ? "" : "disabled"
                  }>
                        ${done ? "Revise again" : "Learn & practise"}
                      </button>
                    </div>`;
                })
                .join("")}
            </div>
            <button class="btn btn-ghost mt-2" type="button" id="regenCourse">Rebuild course from latest test</button>`
          : ""
      }
    </div>
  `;
  bindShell();
  const start = document.getElementById("startDiag");
  const retake = document.getElementById("retakeDiag");
  if (start) start.onclick = () => go("diagnostic", { subject });
  if (retake) retake.onclick = () => go("diagnostic", { subject });
  document.getElementById("regenCourse")?.addEventListener("click", async () => {
    buildCourse(p, subject);
    await save();
    go("subject", { subject });
  });
  appEl.querySelectorAll("[data-lesson]").forEach((btn) => {
    btn.addEventListener("click", () =>
      go("lesson", { subject, skillId: btn.dataset.lesson })
    );
  });
}

// —— DIAGNOSTIC QUIZ ——
function renderDiagnostic({ subject }) {
  if (!state.activeLearner) return go("home");
  const qs = questionsForLearner(subject, state.activeLearner);
  const answers = {};
  let index = 0;
  let revealed = false;

  function paint() {
    const q = qs[index];
    const S = SUBJECTS[subject];
    const pct = Math.round((index / qs.length) * 100);
    appEl.innerHTML = `
      ${topbar()}
      <div class="quiz-header">
        <div>
          <div class="q-meta">${S.emoji} ${S.name} placement · Q${index + 1} of ${
      qs.length
    }</div>
          <strong>${escapeHtml(SKILLS[subject][q.skill].name)}</strong>
        </div>
        <div class="progress-track" style="max-width:200px"><span style="width:${pct}%"></span></div>
      </div>
      <div class="card question-card">
        ${
          q.passage
            ? `<blockquote class="muted" style="border-left:3px solid var(--english);padding-left:0.75rem;margin:0 0 1rem">${escapeHtml(
                q.passage
              )}</blockquote>`
            : ""
        }
        <h3>${escapeHtml(q.q)}</h3>
        <div id="qBody"></div>
        ${learnAboutButtonHtml()}
        <div id="feedback"></div>
        <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
          <button class="btn btn-primary" type="button" id="btnCheck" ${
            revealed ? "disabled" : ""
          }>Check answer</button>
          <button class="btn btn-ok" type="button" id="btnNext" style="display:${
            revealed ? "inline-flex" : "none"
          }">${index + 1 >= qs.length ? "See results" : "Next →"}</button>
        </div>
      </div>
    `;
    bindShell();
    bindLearnAbout(
      document.getElementById("btnLearnAbout"),
      questionLearnPayload(subject, q.skill, q)
    );
    const body = document.getElementById("qBody");
    if (q.type === "multi") {
      body.innerHTML = `<div class="options">${q.options
        .map(
          (opt, i) =>
            `<button type="button" class="option" data-i="${i}">${escapeHtml(
              opt
            )}</button>`
        )
        .join("")}</div>`;
      body.querySelectorAll(".option").forEach((btn) => {
        btn.onclick = () => {
          if (revealed) return;
          body.querySelectorAll(".option").forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          answers[q.id] = Number(btn.dataset.i);
        };
      });
    } else {
      body.innerHTML = `<input class="input-answer" id="typedAns" placeholder="Type your answer…" autocomplete="off" />`;
      const input = document.getElementById("typedAns");
      input.focus();
      input.addEventListener("input", () => {
        answers[q.id] = input.value;
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") document.getElementById("btnCheck").click();
      });
    }

    document.getElementById("btnCheck").onclick = () => {
      if (revealed) return;
      if (answers[q.id] === undefined || answers[q.id] === "") {
        alert("Pick or type an answer first!");
        return;
      }
      revealed = true;
      const ok = checkAnswer(q, answers[q.id]);
      const fb = document.getElementById("feedback");
      fb.className = `feedback ${ok ? "good" : "bad"}`;
      fb.textContent = (ok ? "✓ Correct! " : "Not quite. ") + q.explain;
      if (q.type === "multi") {
        body.querySelectorAll(".option").forEach((btn) => {
          const i = Number(btn.dataset.i);
          if (i === q.answer) btn.classList.add("correct");
          if (i === answers[q.id] && !ok) btn.classList.add("wrong");
          btn.disabled = true;
        });
      }
      document.getElementById("btnCheck").disabled = true;
      document.getElementById("btnNext").style.display = "inline-flex";
    };

    document.getElementById("btnNext").onclick = () => {
      if (index + 1 >= qs.length) {
        finish();
      } else {
        index++;
        revealed = false;
        paint();
      }
    };
  }

  async function finish() {
    const result = scoreDiagnostic(subject, state.activeLearner, answers);
    recordDiagnostic(profile(), subject, answers, result);
    await save();
    go("diagnosticResult", { subject, result });
  }

  paint();
}

function renderDiagnosticResult({ subject, result }) {
  const S = SUBJECTS[subject];
  const skillHtml = Object.entries(result.skillScores)
    .map(([id, score]) => {
      const name = SKILLS[subject][id].name;
      return `
        <div class="skill-row">
          <label><span>${escapeHtml(name)}</span><span>${score}%</span></label>
          <div class="bar"><i style="width:${score}%"></i></div>
        </div>`;
    })
    .join("");

  appEl.innerHTML = `
    ${topbar()}
    <div class="card score-hero celebrate mb-2">
      <div class="q-meta">${S.emoji} ${S.name} placement complete</div>
      <div class="score-big">${result.score}%</div>
      <p>${result.correct} of ${result.total} correct</p>
      <p class="muted">${escapeHtml(randomEncouragement())}</p>
    </div>
    <div class="card mb-2">
      <h3 style="margin-top:0;font-family:var(--display)">Skill breakdown</h3>
      <div class="skill-bars">${skillHtml}</div>
      <p class="muted mt-1" style="font-size:0.85rem">Your course prioritises the lowest bars first — just like a tutor would.</p>
    </div>
    <button class="btn btn-primary btn-lg btn-block" type="button" id="toCourse">See my personalised ${
      S.name
    } course →</button>
  `;
  bindShell();
  document.getElementById("toCourse").onclick = () => go("subject", { subject });
}

// —— ADAPTIVE LESSON (Teach → Example → Practice → branch if stuck) ——
function renderLesson({ subject, skillId }) {
  if (!state.activeLearner) return go("home");
  const mod = getTeachModule(subject, skillId);
  if (!mod) {
    // Fallback to old item list if no teach module
    alert("Lesson module missing — try another skill.");
    return go("subject", { subject });
  }

  const session = createTutorSession(subject, skillId, state.activeLearner);
  let answerVal = null;
  let revealed = false;

  function paint() {
    const prog = sessionProgress(session);
    const skillName = SKILLS[subject][skillId].name;
    let bodyHtml = "";

    if (session.phase === "teach") {
      bodyHtml = `
        <div class="phase-pill">📖 Teach</div>
        <h3 class="teach-heading">${escapeHtml(mod.title)}</h3>
        <p class="muted">${escapeHtml(mod.blurb)}</p>
        ${mod.teach.visual ? `<div class="visual-wrap">${mod.teach.visual}</div>` : ""}
        <ul class="teach-points">
          ${mod.teach.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}
        </ul>
        <button class="btn btn-primary btn-lg mt-2" type="button" id="btnAdvance">Got it — show example →</button>`;
    } else if (session.phase === "example") {
      bodyHtml = `
        <div class="phase-pill">✏️ Example</div>
        <h3 class="teach-heading">${escapeHtml(mod.example.title)}</h3>
        <ol class="teach-steps">
          ${mod.example.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}
        </ol>
        <button class="btn btn-primary btn-lg mt-2" type="button" id="btnAdvance">I'm ready to practise →</button>`;
    } else if (session.phase === "struggle_teach") {
      const st = mod.struggle || {};
      bodyHtml = `
        <div class="phase-pill phase-struggle">🛟 Let's slow down</div>
        <h3 class="teach-heading">Another way to see it</h3>
        <p class="muted">No worries — everyone gets stuck. Here's a simpler path.</p>
        ${st.visual ? `<div class="visual-wrap">${st.visual}</div>` : ""}
        <ul class="teach-points">
          ${(st.points || []).map((p) => `<li>${escapeHtml(p)}</li>`).join("")}
        </ul>
        <div id="aiHelpBox"></div>
        <button class="btn btn-primary btn-lg mt-2" type="button" id="btnAdvance">Try an easier question →</button>
        ${
          isAiConfigured()
            ? `<button class="btn btn-secondary mt-1" type="button" id="btnAiHelp">✨ Ask AI tutor to explain differently</button>`
            : `<p class="muted mt-1" style="font-size:0.8rem">Tip: Parent can turn on Grok AI in Parent zone for extra explanations.</p>`
        }`;
    } else if (session.phase === "video") {
      const vid = getVideoForModule(mod);
      bodyHtml = `
        <div class="phase-pill">🎬 Video boost</div>
        <h3 class="teach-heading">Watch a quick helper</h3>
        <p class="muted">Trusted UK education site — open it, watch a bit, then come back.</p>
        ${
          vid
            ? `<a class="btn btn-primary btn-lg" href="${escapeHtml(
                vid.url
              )}" target="_blank" rel="noopener">${escapeHtml(vid.title)} ↗</a>`
            : `<p>Keep practising — you've got this.</p>`
        }
        <button class="btn btn-ok btn-lg mt-2" type="button" id="btnAdvance">Back to practice →</button>`;
    } else if (session.phase === "complete") {
      finishSession();
      return;
    } else {
      // practice or struggle_practice
      const list = currentPracticeList(session);
      const q = list[session.practiceIndex];
      if (!q) {
        session.phase = "complete";
        paint();
        return;
      }
      bodyHtml = `
        <div class="phase-pill">${
          session.phase === "struggle_practice" ? "🛟 Easier practice" : "🎯 Practice"
        }</div>
        ${
          q.passage
            ? `<blockquote class="passage">${escapeHtml(q.passage)}</blockquote>`
            : ""
        }
        <h3 class="teach-heading">${escapeHtml(q.q)}</h3>
        <div id="qBody"></div>
        ${learnAboutButtonHtml()}
        <div id="feedback"></div>
        <div id="aiHelpBox"></div>
        <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
          <button class="btn btn-primary" type="button" id="btnCheck">Check</button>
          <button class="btn btn-ok" type="button" id="btnAdvance" style="display:none">Continue →</button>
        </div>`;
    }

    appEl.innerHTML = `
      ${topbar()}
      <div class="quiz-header">
        <div>
          <div class="q-meta">${SUBJECTS[subject].emoji} Adaptive lesson · ${escapeHtml(
      skillName
    )}</div>
          <strong>${escapeHtml(mod.title)}</strong>
        </div>
        <div style="min-width:140px">
          <div class="muted" style="font-size:0.75rem;margin-bottom:0.25rem">${escapeHtml(
            prog.label
          )}</div>
          <div class="progress-track"><span style="width:${prog.pct}%"></span></div>
        </div>
      </div>
      <div class="card question-card tutor-card">${bodyHtml}</div>
      <button class="btn btn-ghost mt-1" type="button" id="btnExitLesson">Exit lesson</button>
    `;
    bindShell();
    document.getElementById("btnExitLesson").onclick = () =>
      go("subject", { subject });

    const adv = document.getElementById("btnAdvance");
    if (adv && session.phase === "teach") {
      adv.onclick = () => {
        session.phase = "example";
        paint();
      };
    } else if (adv && session.phase === "example") {
      adv.onclick = () => {
        session.phase = "practice";
        session.practiceIndex = 0;
        answerVal = null;
        revealed = false;
        paint();
      };
    } else if (adv && session.phase === "struggle_teach") {
      adv.onclick = () => {
        session.phase = "struggle_practice";
        session.practiceIndex = 0;
        answerVal = null;
        revealed = false;
        paint();
      };
    } else if (adv && session.phase === "video") {
      adv.onclick = () => {
        session.phase = session.struggleUsed ? "struggle_practice" : "practice";
        answerVal = null;
        revealed = false;
        paint();
      };
    }

    const aiBtn = document.getElementById("btnAiHelp");
    if (aiBtn) {
      aiBtn.onclick = async () => {
        const box = document.getElementById("aiHelpBox");
        box.innerHTML = `<p class="muted">✨ AI tutor is thinking…</p>`;
        try {
          const lastWrong = [...session.history].reverse().find((h) => !h.ok);
          const text = await grokStruggleHelp({
            learnerMeta: learner(),
            subject: SUBJECTS[subject].name,
            skillName,
            question: lastWrong?.q || mod.title,
            userAnswer: String(lastWrong?.answer ?? "?"),
            correctExplain: mod.teach.points.join(" "),
          });
          box.innerHTML = `<div class="ai-bubble"><strong>✨ AI tutor</strong><p>${escapeHtml(
            text
          ).replace(/\n/g, "<br>")}</p></div>`;
        } catch (e) {
          box.innerHTML = `<p class="feedback bad">AI unavailable (${escapeHtml(
            e.message || "error"
          )}). Using built-in teaching instead — you're fine!</p>`;
        }
      };
    }

    if (session.phase === "practice" || session.phase === "struggle_practice") {
      wirePracticeQuestion();
    }
  }

  function wirePracticeQuestion() {
    const list = currentPracticeList(session);
    const q = list[session.practiceIndex];
    answerVal = null;
    revealed = false;
    const body = document.getElementById("qBody");
    if (!body || !q) return;

    bindLearnAbout(
      document.getElementById("btnLearnAbout"),
      questionLearnPayload(subject, skillId, q)
    );

    if (q.type === "multi") {
      body.innerHTML = `<div class="options">${q.options
        .map(
          (opt, i) =>
            `<button type="button" class="option" data-i="${i}">${escapeHtml(
              opt
            )}</button>`
        )
        .join("")}</div>`;
      body.querySelectorAll(".option").forEach((btn) => {
        btn.onclick = () => {
          if (revealed) return;
          body.querySelectorAll(".option").forEach((b) =>
            b.classList.remove("selected")
          );
          btn.classList.add("selected");
          answerVal = Number(btn.dataset.i);
        };
      });
    } else {
      body.innerHTML = `<input class="input-answer" id="typedAns" placeholder="Type your answer…" autocomplete="off" />`;
      const input = document.getElementById("typedAns");
      input.focus();
      input.oninput = () => {
        answerVal = input.value;
      };
      input.onkeydown = (e) => {
        if (e.key === "Enter") document.getElementById("btnCheck")?.click();
      };
    }

    document.getElementById("btnCheck").onclick = async () => {
      if (revealed) return;
      if (answerVal === null || answerVal === "") {
        alert("Pick or type an answer first!");
        return;
      }
      revealed = true;
      const ok = checkAnswer(q, answerVal);
      const fb = document.getElementById("feedback");
      fb.className = `feedback ${ok ? "good" : "bad"}`;
      fb.innerHTML = ok
        ? `✓ Nice! ${escapeHtml(q.explain)}`
        : `Not quite. ${escapeHtml(q.explain)}`;

      if (q.type === "multi") {
        body.querySelectorAll(".option").forEach((btn) => {
          const i = Number(btn.dataset.i);
          if (i === q.answer) btn.classList.add("correct");
          if (i === answerVal && !ok) btn.classList.add("wrong");
          btn.disabled = true;
        });
      }
      document.getElementById("btnCheck").disabled = true;

      // Optional live AI tip on wrong
      if (!ok && isAiConfigured()) {
        const box = document.getElementById("aiHelpBox");
        if (box) {
          box.innerHTML = `<p class="muted" style="font-size:0.85rem">✨ Getting an extra AI tip…</p>`;
          try {
            const text = await grokStruggleHelp({
              learnerMeta: learner(),
              subject: SUBJECTS[subject].name,
              skillName: SKILLS[subject][skillId].name,
              question: q.q,
              userAnswer:
                q.type === "multi" ? q.options[answerVal] : String(answerVal),
              correctExplain: q.explain,
            });
            box.innerHTML = `<div class="ai-bubble"><strong>✨ AI tip</strong><p>${escapeHtml(
              text
            ).replace(/\n/g, "<br>")}</p></div>`;
          } catch {
            box.innerHTML = "";
          }
        }
      }

      const prevPhase = session.phase;
      handlePracticeAnswer(session, q, answerVal);

      document.getElementById("btnAdvance").style.display = "inline-flex";
      document.getElementById("btnAdvance").onclick = () => {
        // handlePracticeAnswer already advanced index / phase
        if (session.phase === "complete") {
          finishSession();
          return;
        }
        // If phase changed to struggle/video, paint that; else next Q
        if (
          session.phase !== prevPhase ||
          session.phase === "struggle_teach" ||
          session.phase === "video"
        ) {
          paint();
        } else {
          paint();
        }
      };
    };
  }

  async function finishSession() {
    const scorePct = scoreSession(session);
    recordLesson(profile(), subject, skillId, scorePct);
    // Store adaptive stats
    if (!profile().tutorStats) profile().tutorStats = {};
    profile().tutorStats[`${subject}:${skillId}`] = {
      wrong: session.totalWrong,
      struggle: session.struggleUsed,
      video: session.videoShown,
      at: todayKey(),
    };
    await save();
    go("lessonResult", {
      subject,
      skillId,
      scorePct,
      correctCount: session.practiceCorrect,
      total: session.practiceTotal,
      struggle: session.struggleUsed,
    });
  }

  paint();
}

function renderLessonResult({
  subject,
  skillId,
  scorePct,
  correctCount,
  total,
  struggle,
}) {
  const mod = getTeachModule(subject, skillId);
  appEl.innerHTML = `
    ${topbar()}
    <div class="card score-hero celebrate mb-2">
      <div class="q-meta">Adaptive lesson complete</div>
      <h2 style="font-family:var(--display);margin:0.5rem 0">${escapeHtml(
        mod?.title || skillId
      )}</h2>
      <div class="score-big">${scorePct}%</div>
      <p>${correctCount}/${total || "?"} correct on practice · +XP earned!</p>
      ${
        struggle
          ? `<p class="muted">You used the support path — that's smart learning, not failure.</p>`
          : ""
      }
      <p class="muted">${escapeHtml(randomEncouragement())}</p>
    </div>
    <div style="display:flex;gap:0.6rem;flex-wrap:wrap">
      <button class="btn btn-primary" type="button" id="more">Continue course →</button>
      <button class="btn btn-secondary" type="button" data-go="dashboard">Back to hub</button>
    </div>
  `;
  bindShell();
  document.getElementById("more").onclick = () => go("subject", { subject });
}

// —— PARENT ZONE ——
function renderParent() {
  const synced = isSyncEnabled();
  const cfg = getSyncConfig();

  appEl.innerHTML = `
    ${topbar(`<button class="btn btn-ghost" data-go="home" type="button">Home</button>`)}
    <h2 class="section-title">Parent zone</h2>
    <p class="lead">Live progress for Bella-Rose &amp; George · watch from your iMac while they learn on theirs</p>

    <div class="card mb-2" style="border-color:${synced ? "rgba(61,220,151,0.45)" : "rgba(255,209,102,0.45)"}">
      <h3 style="margin-top:0">☁️ Family cloud ${synced ? "· connected" : "· not set up"}</h3>
      ${
        synced
          ? `<p class="muted" style="margin:0 0 0.75rem">Family code: <strong style="color:var(--gold)">${escapeHtml(
              cfg.familyCode
            )}</strong></p>
             <p class="muted" id="syncStatusLine" style="margin:0 0 0.75rem;font-size:0.85rem">${escapeHtml(
               syncStatus || "Live refresh every 5 seconds when this page is open."
             )}</p>
             <p class="muted" id="metaLine" style="margin:0 0 0.75rem;font-size:0.85rem"></p>
             <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
               <button class="btn btn-primary" type="button" id="btnPullNow">Refresh now</button>
               <button class="btn btn-secondary" type="button" data-go="sync">Sync settings</button>
             </div>`
          : `<p class="muted">To see updates on <strong style="color:var(--text)">your</strong> iMac when they finish tasks on <strong style="color:var(--text)">theirs</strong>, set up free family cloud sync (about 5 minutes, once).</p>
             <button class="btn btn-primary btn-lg mt-1" type="button" data-go="sync">Set up family cloud →</button>`
      }
    </div>

    <div id="parentKids">
      ${parentKid("bella")}
      ${parentKid("george")}
    </div>

    <div class="card mt-2">
      <h3 style="margin-top:0">Recent activity</h3>
      <div id="activityFeed" class="muted" style="font-size:0.9rem;line-height:1.5">
        ${activityFeedHtml()}
      </div>
    </div>

    <div class="card mt-2">
      <h3 style="margin-top:0">✨ AI tutor (Grok)</h3>
      <p class="muted">
        Lessons already adapt offline (teach → practice → easier path → video).
        Optional Grok AI adds personalised explanations when they get stuck.
        ${
          isAiConfigured()
            ? `<strong style="color:var(--ok)"> · AI is ON on this Mac</strong>`
            : `<strong style="color:var(--gold)"> · AI not connected yet</strong>`
        }
      </p>
      <button class="btn btn-primary" type="button" data-go="aiSettings">AI settings →</button>
    </div>

    <div class="card mt-2">
      <h3 style="margin-top:0">Local backup (optional)</h3>
      <p class="muted">Extra safety copy as a file — not required if cloud sync is on.</p>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
        <button class="btn btn-secondary" type="button" id="pExport">Export file</button>
        <button class="btn btn-secondary" type="button" id="pImport">Import file</button>
        <input type="file" id="pFile" accept="application/json" hidden />
      </div>
    </div>

    <div class="card mt-2">
      <h3 style="margin-top:0">Curriculum note</h3>
      <p class="muted" style="margin:0;line-height:1.55">
        English National Curriculum (KS2 George · KS3 Bella-Rose) mapped toward
        GCSE Maths, English Language &amp; Science foundations. Complements school.
      </p>
    </div>
  `;
  bindShell();

  document.getElementById("pExport").onclick = () => {
    const blob = new Blob([exportState(state)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `rawson-learning-backup-${todayKey()}.json`;
    a.click();
  };
  document.getElementById("pImport").onclick = () =>
    document.getElementById("pFile").click();
  document.getElementById("pFile").onchange = async (e) => {
    try {
      state = importState(await e.target.files[0].text());
      await save({ pushCloud: false });
      alert("Imported!");
      go("parent");
    } catch {
      alert("Import failed");
    }
  };

  const pullBtn = document.getElementById("btnPullNow");
  if (pullBtn) {
    pullBtn.onclick = async () => {
      await refreshFromCloud();
      go("parent");
    };
  }

  if (synced) {
    // Initial pull + live poll while parent page is open
    (async () => {
      await refreshFromCloud({ silent: true });
      const kids = document.getElementById("parentKids");
      const feed = document.getElementById("activityFeed");
      const status = document.getElementById("syncStatusLine");
      if (kids) kids.innerHTML = parentKid("bella") + parentKid("george");
      if (feed) feed.innerHTML = activityFeedHtml();
      if (status) status.textContent = syncStatus || "Live";
      try {
        const meta = await fetchMeta();
        const metaLine = document.getElementById("metaLine");
        if (metaLine && meta) {
          metaLine.textContent = meta.lastActivityName
            ? `Last activity: ${meta.lastActivityName} · ${formatTime(meta.lastActivityAt)}`
            : "";
        }
      } catch {
        /* ignore */
      }
    })();

    parentPollTimer = setInterval(async () => {
      const changed = await refreshFromCloud({ silent: true });
      const status = document.getElementById("syncStatusLine");
      if (status) status.textContent = syncStatus || "Live";
      if (changed) {
        const kids = document.getElementById("parentKids");
        const feed = document.getElementById("activityFeed");
        if (kids) kids.innerHTML = parentKid("bella") + parentKid("george");
        if (feed) feed.innerHTML = activityFeedHtml();
      }
      try {
        const meta = await fetchMeta();
        const metaLine = document.getElementById("metaLine");
        if (metaLine && meta?.lastActivityName) {
          metaLine.textContent = `Last activity: ${meta.lastActivityName} · ${formatTime(
            meta.lastActivityAt
          )}`;
        }
      } catch {
        /* ignore */
      }
    }, 5000);
  }
}

function activityFeedHtml() {
  const events = [];
  for (const id of Object.keys(LEARNERS)) {
    const p = state.profiles[id];
    const name = LEARNERS[id].name;
    for (const [sub, d] of Object.entries(p.diagnostics || {})) {
      if (d?.completed) {
        events.push({
          t: d.date || "",
          ts: p.updatedAt || 0,
          text: `${name} finished ${SUBJECTS[sub].name} placement test — ${d.score}%`,
        });
      }
    }
    for (const h of p.lessonHistory || []) {
      events.push({
        t: h.date || "",
        ts: p.updatedAt || 0,
        text: `${name} completed ${SUBJECTS[h.subject].name}: ${
          LESSONS[h.subject][h.skillId]?.title || h.skillId
        } (${h.score}%)`,
      });
    }
  }
  events.sort((a, b) => (b.ts || 0) - (a.ts || 0));
  const top = events.slice(0, 12);
  if (!top.length) {
    return "No activity yet — when the kids finish a test or lesson (with cloud sync on), it will show up here.";
  }
  return top.map((e) => `• ${escapeHtml(e.text)}`).join("<br>");
}

function parentKid(id) {
  const L = LEARNERS[id];
  const p = state.profiles[id];
  const rows = Object.keys(SUBJECTS)
    .map((sub) => {
      const d = p.diagnostics[sub];
      const lessonsDone = p.courses[sub]
        ? Object.keys(p.courses[sub].completed || {}).length
        : 0;
      const totalLessons = p.courses[sub]?.path?.length || "—";
      return `<tr>
        <td>${SUBJECTS[sub].emoji} ${SUBJECTS[sub].name}</td>
        <td>${d?.completed ? d.score + "%" : "—"}</td>
        <td>${d?.date || "—"}</td>
        <td>${lessonsDone}/${totalLessons}</td>
        <td>${subjectOverall(p, sub) ?? "—"}%</td>
      </tr>`;
    })
    .join("");

  return `
    <div class="card mb-2">
      <h3 style="margin-top:0;font-family:var(--display)">${L.emoji} ${escapeHtml(
    L.fullName
  )}</h3>
      <p class="muted">Age ${L.age} · ${L.yearGroup} · Level ${p.level} · ${
    p.xp
  } XP · Streak ${p.streak} days · ${p.badges.length} badges
      · Updated ${formatTime(p.updatedAt)}</p>
      <div class="table-wrap">
        <table class="progress-table">
          <thead><tr><th>Subject</th><th>Test</th><th>Date</th><th>Lessons</th><th>Level</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

// —— FAMILY SYNC SETUP (simple one-click) ——
function renderSyncSetup() {
  const on = isSyncEnabled();
  appEl.innerHTML = `
    ${topbar(`<button class="btn btn-ghost" data-go="parent" type="button">← Parent zone</button>`)}
    <h2 class="section-title">☁️ Family cloud</h2>
    <p class="lead">One button on each Mac. That’s it.</p>

    <div class="card mb-2" style="text-align:center;padding:1.75rem">
      ${
        on
          ? `<p style="font-size:1.15rem;font-weight:800;color:var(--ok);margin:0 0 0.5rem">✓ This Mac is connected</p>
             <p class="muted" style="margin:0 0 1rem">Family: <strong style="color:var(--gold)">${escapeHtml(
               getSyncConfig().familyCode
             )}</strong></p>
             <p id="syncSetupMsg" class="muted" style="min-height:1.4em;font-size:0.9rem"></p>
             <div style="display:flex;gap:0.6rem;flex-wrap:wrap;justify-content:center">
               <button class="btn btn-primary btn-lg" type="button" id="btnOneClick">Reconnect / test</button>
               <button class="btn btn-ok btn-lg" type="button" id="btnSeed">Upload progress from this Mac</button>
               <button class="btn btn-secondary" type="button" data-go="parent">Open Parent zone →</button>
             </div>`
          : `<p class="muted" style="margin:0 0 1.25rem;max-width:28rem;margin-left:auto;margin-right:auto">
               Connects to your <strong style="color:var(--text)">Rawson Labs</strong> cloud so all three iMacs share progress.
             </p>
             <p id="syncSetupMsg" class="muted" style="min-height:1.4em;font-size:0.9rem"></p>
             <button class="btn btn-primary btn-lg" type="button" id="btnOneClick" style="font-size:1.15rem;padding:1rem 1.75rem">
               ☁️ Turn on family cloud on this Mac
             </button>`
      }
    </div>

    <div class="card mb-2">
      <h3 style="margin-top:0">What to do on each computer</h3>
      <ol class="muted" style="line-height:1.7;margin:0;padding-left:1.2rem">
        <li><strong style="color:var(--text)">Your Mac</strong> — press the green button above, then open Parent zone and leave it open</li>
        <li><strong style="color:var(--text)">Bella-Rose’s Mac</strong> — open the same website → Parent zone → Family cloud → press the same button</li>
        <li><strong style="color:var(--text)">George’s Mac</strong> — same as Bella-Rose</li>
        <li>Kids pick <em>their</em> name and learn as normal — you watch live on your Mac</li>
      </ol>
    </div>

    <div class="card">
      <button class="btn btn-ghost" type="button" id="btnDisconnect">Turn off cloud on this Mac only</button>
    </div>
  `;
  bindShell();

  const msg = document.getElementById("syncSetupMsg");

  async function oneClick() {
    msg.textContent = "Connecting…";
    try {
      enableBuiltinCloud();
      await testCloudConnection();
      await refreshFromCloud({ silent: true });
      // Seed if cloud empty for both profiles
      try {
        await seedCloudFromLocal(state);
        saveState(state);
      } catch {
        /* may already have data */
      }
      msg.textContent = "Connected ✓ You’re on the family cloud.";
      go("sync");
    } catch (e) {
      console.error(e);
      msg.textContent =
        "Couldn’t connect. In Firebase open Rules and make sure test mode allows read/write. " +
        (e.message || "");
    }
  }

  document.getElementById("btnOneClick").onclick = oneClick;
  const seed = document.getElementById("btnSeed");
  if (seed) {
    seed.onclick = async () => {
      msg.textContent = "Uploading…";
      try {
        if (!isSyncEnabled()) enableBuiltinCloud();
        await seedCloudFromLocal(state);
        saveState(state);
        msg.textContent = "Uploaded ✓";
      } catch (e) {
        msg.textContent = "Upload failed: " + (e.message || e);
      }
    };
  }
  document.getElementById("btnDisconnect").onclick = () => {
    if (confirm("Turn off cloud on this Mac only?")) {
      setSyncConfig(null);
      go("sync");
    }
  };
}

// —— AI SETTINGS ——
function renderAiSettings() {
  const key = getAiKey();
  const proxy = getAiProxy();
  appEl.innerHTML = `
    ${topbar(`<button class="btn btn-ghost" data-go="parent" type="button">← Parent zone</button>`)}
    <h2 class="section-title">✨ AI tutor settings</h2>
    <p class="lead">Adaptive lessons work <strong>without</strong> AI. Grok is optional for richer explanations.</p>

    <div class="card mb-2">
      <h3 style="margin-top:0">What works right now (no key needed)</h3>
      <ul class="muted" style="line-height:1.6">
        <li>Teach → example → practice for every skill</li>
        <li>If they get stuck → simpler path + diagrams</li>
        <li>Video boost links to BBC Bitesize / Oak National Academy</li>
        <li>Personal course still prioritises weak skills from tests</li>
      </ul>
    </div>

    <div class="card mb-2">
      <h3 style="margin-top:0">Optional: connect Grok (xAI)</h3>
      <p class="muted" style="font-size:0.9rem">
        1. Create an API key at
        <a href="https://console.x.ai/" target="_blank" rel="noopener" style="color:#7ec0f0">console.x.ai</a>
        (Stewart’s xAI account)<br>
        2. Paste it below on <strong style="color:var(--text)">each Mac</strong> that should use AI<br>
        3. Browser apps often need a small proxy (CORS). If direct call fails, deploy
        <code style="color:var(--gold)">worker/</code> from this project and paste the proxy URL.
      </p>
      <label class="sync-label" style="display:flex;flex-direction:column;gap:0.35rem;font-size:0.8rem;font-weight:800;color:var(--muted)">
        xAI API key
        <input type="password" id="aiKey" class="input-answer" placeholder="xai-…" value="${escapeHtml(
          key
        )}" autocomplete="off" />
      </label>
      <label class="sync-label mt-1" style="display:flex;flex-direction:column;gap:0.35rem;font-size:0.8rem;font-weight:800;color:var(--muted)">
        AI proxy URL (optional)
        <input type="url" id="aiProxy" class="input-answer" placeholder="https://your-worker.workers.dev" value="${escapeHtml(
          proxy
        )}" />
      </label>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem">
        <button class="btn btn-primary" type="button" id="btnSaveAi">Save AI settings</button>
        <button class="btn btn-secondary" type="button" id="btnTestAi">Test AI</button>
        <button class="btn btn-ghost" type="button" id="btnClearAi">Clear</button>
      </div>
      <p id="aiMsg" class="muted mt-1" style="font-size:0.85rem"></p>
    </div>
  `;
  bindShell();
  const msg = document.getElementById("aiMsg");
  document.getElementById("btnSaveAi").onclick = () => {
    setAiKey(document.getElementById("aiKey").value);
    setAiProxy(document.getElementById("aiProxy").value);
    msg.textContent = isAiConfigured()
      ? "Saved ✓ AI tutor enabled on this Mac."
      : "Cleared — using built-in adaptive lessons only.";
  };
  document.getElementById("btnClearAi").onclick = () => {
    setAiKey("");
    setAiProxy("");
    document.getElementById("aiKey").value = "";
    document.getElementById("aiProxy").value = "";
    msg.textContent = "AI cleared on this Mac.";
  };
  document.getElementById("btnTestAi").onclick = async () => {
    setAiKey(document.getElementById("aiKey").value);
    setAiProxy(document.getElementById("aiProxy").value);
    msg.textContent = "Testing…";
    try {
      const reply = await askGrok([
        {
          role: "user",
          content:
            "In one short friendly sentence for a 10-year-old in the UK: what is half of 10?",
        },
      ]);
      msg.textContent = "AI OK ✓ “" + reply.slice(0, 120) + "”";
    } catch (e) {
      msg.textContent =
        "Test failed: " +
        (e.message || e) +
        " — Built-in lessons still work. A proxy may be required for browser calls.";
    }
  };
}

// —— Boot ——
(async function boot() {
  try {
    if (isSyncEnabled()) {
      try {
        await refreshFromCloud({ silent: true });
      } catch {
        /* offline / timeout ok — still open the app */
      }
    }
    go(state.activeLearner ? "dashboard" : "home");
  } catch (err) {
    console.error("Boot failed", err);
    // Last resort UI so the page is never a blank screen
    const el = document.getElementById("app");
    if (el) {
      el.innerHTML = `
        <div style="padding:2rem;font-family:system-ui;max-width:32rem;margin:2rem auto;color:#f7f1e3;background:#2a3d30;border-radius:16px">
          <h1 style="margin-top:0">Rawson Learning Lab</h1>
          <p>Something went wrong loading the full app. Try a hard refresh (Cmd+Shift+R).</p>
          <p style="font-size:0.85rem;opacity:0.8">${String(err && err.message ? err.message : err)}</p>
          <p><a href="?v=9" style="color:#a5d6a7">Reload clean link</a></p>
          <button type="button" id="btnResetLocal" style="margin-top:1rem;padding:0.75rem 1rem;border-radius:10px;border:0;background:#43a047;color:#fff;font-weight:700;cursor:pointer">
            Reset local data &amp; reload
          </button>
        </div>`;
      document.getElementById("btnResetLocal")?.addEventListener("click", () => {
        try {
          localStorage.removeItem("rawson-learning-lab-v1");
        } catch (_) {}
        location.href = "?v=9&reset=1";
      });
    }
  }
})();
