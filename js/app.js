/**
 * Rawson Learning Lab — UI
 */

let state = loadState();
const appEl = document.getElementById("app");

function save() {
  saveState(state);
}

function profile() {
  return state.profiles[state.activeLearner];
}

function learner() {
  return LEARNERS[state.activeLearner];
}

function go(screen, params = {}) {
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
        <div class="logo-mark">R</div>
        <div>
          <h1>Rawson Learning Lab</h1>
          <p>English · Maths · Science · GCSE pathway</p>
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

// —— HOME ——
function renderHome() {
  appEl.innerHTML = `
    ${topbar(`<button class="btn btn-ghost" data-go="parent" type="button">Parent zone</button>`)}
    <section class="hero">
      <h2>Learning that feels like a <span class="sparkle">game</span></h2>
      <p class="lead center">Built for <strong>Bella-Rose</strong> (12) &amp; <strong>George</strong> (10) · UK curriculum · GCSE-ready foundations</p>
    </section>
    <div class="grid-2">
      ${profileCard("bella")}
      ${profileCard("george")}
    </div>
    <div class="parent-bar">
      <button class="btn btn-secondary" type="button" id="btnExport">⬇ Export progress</button>
      <button class="btn btn-secondary" type="button" id="btnImport">⬆ Import progress</button>
      <input type="file" id="importFile" accept="application/json" hidden />
    </div>
    <p class="muted center mt-1" style="font-size:0.8rem">Progress saves automatically on this device. Export a backup to share between computers.</p>
  `;
  bindShell();
  appEl.querySelectorAll("[data-pick]").forEach((el) => {
    el.addEventListener("click", () => {
      state.activeLearner = el.dataset.pick;
      save();
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
        <p class="muted" style="margin:0.35rem 0 0">Your personalised path to GCSE-ready English, Maths &amp; Science</p>
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
        <li><strong style="color:var(--text)">Personal course</strong> — we prioritise your weaker skills (GCSE-linked)</li>
        <li><strong style="color:var(--text)">Lessons &amp; XP</strong> — practise, level up, earn badges</li>
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
                        ${done ? "Practise again" : "Start"}
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
  document.getElementById("regenCourse")?.addEventListener("click", () => {
    buildCourse(p, subject);
    save();
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

  function finish() {
    const result = scoreDiagnostic(subject, state.activeLearner, answers);
    recordDiagnostic(profile(), subject, answers, result);
    save();
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

// —— LESSON ——
function renderLesson({ subject, skillId }) {
  if (!state.activeLearner) return go("home");
  const lesson = LESSONS[subject][skillId];
  const items = lesson.items;
  const answers = {};
  let index = 0;
  let correctCount = 0;
  let revealed = false;

  function paint() {
    const q = items[index];
    const pct = Math.round((index / items.length) * 100);
    appEl.innerHTML = `
      ${topbar()}
      <div class="quiz-header">
        <div>
          <div class="q-meta">${SUBJECTS[subject].emoji} ${escapeHtml(
      lesson.title
    )} · ${index + 1}/${items.length}</div>
          <strong>${escapeHtml(SKILLS[subject][skillId].name)}</strong>
        </div>
        <div class="progress-track" style="max-width:200px"><span style="width:${pct}%"></span></div>
      </div>
      <div class="card question-card">
        ${
          q.passage
            ? `<blockquote class="muted" style="border-left:3px solid var(--science);padding-left:0.75rem;margin:0 0 1rem">${escapeHtml(
                q.passage
              )}</blockquote>`
            : ""
        }
        <h3>${escapeHtml(q.q)}</h3>
        <div id="qBody"></div>
        <div id="feedback"></div>
        <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
          <button class="btn btn-primary" type="button" id="btnCheck">Check</button>
          <button class="btn btn-ok" type="button" id="btnNext" style="display:none">${
            index + 1 >= items.length ? "Finish lesson" : "Next →"
          }</button>
        </div>
      </div>
    `;
    bindShell();
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
          answers[index] = Number(btn.dataset.i);
        };
      });
    } else {
      body.innerHTML = `<input class="input-answer" id="typedAns" placeholder="Type your answer…" autocomplete="off" />`;
      const input = document.getElementById("typedAns");
      input.focus();
      input.oninput = () => {
        answers[index] = input.value;
      };
      input.onkeydown = (e) => {
        if (e.key === "Enter") document.getElementById("btnCheck").click();
      };
    }

    document.getElementById("btnCheck").onclick = () => {
      if (revealed) return;
      if (answers[index] === undefined || answers[index] === "") {
        alert("Answer first!");
        return;
      }
      revealed = true;
      const ok = checkAnswer(q, answers[index]);
      if (ok) correctCount++;
      const fb = document.getElementById("feedback");
      fb.className = `feedback ${ok ? "good" : "bad"}`;
      fb.textContent = (ok ? "✓ Nice! " : "Almost — ") + q.explain;
      if (q.type === "multi") {
        body.querySelectorAll(".option").forEach((btn) => {
          const i = Number(btn.dataset.i);
          if (i === q.answer) btn.classList.add("correct");
          if (i === answers[index] && !ok) btn.classList.add("wrong");
          btn.disabled = true;
        });
      }
      document.getElementById("btnCheck").disabled = true;
      document.getElementById("btnNext").style.display = "inline-flex";
    };

    document.getElementById("btnNext").onclick = () => {
      if (index + 1 >= items.length) {
        const scorePct = Math.round((correctCount / items.length) * 100);
        recordLesson(profile(), subject, skillId, scorePct);
        save();
        go("lessonResult", { subject, skillId, scorePct, correctCount, total: items.length });
      } else {
        index++;
        revealed = false;
        paint();
      }
    };
  }

  paint();
}

function renderLessonResult({ subject, skillId, scorePct, correctCount, total }) {
  appEl.innerHTML = `
    ${topbar()}
    <div class="card score-hero celebrate mb-2">
      <div class="q-meta">Lesson complete</div>
      <h2 style="font-family:var(--display);margin:0.5rem 0">${escapeHtml(
        LESSONS[subject][skillId].title
      )}</h2>
      <div class="score-big">${scorePct}%</div>
      <p>${correctCount}/${total} correct · +XP earned!</p>
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
  appEl.innerHTML = `
    ${topbar(`<button class="btn btn-ghost" data-go="home" type="button">Home</button>`)}
    <h2 class="section-title">Parent zone</h2>
    <p class="lead">Progress for Bella-Rose Rawson &amp; George Rawson · UK GCSE pathway foundations</p>
    ${parentKid("bella")}
    ${parentKid("george")}
    <div class="card mt-2">
      <h3 style="margin-top:0">Backup &amp; devices</h3>
      <p class="muted">Data stays in this browser. Export regularly, or import on another device so progress follows you.</p>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
        <button class="btn btn-primary" type="button" id="pExport">Export all progress</button>
        <button class="btn btn-secondary" type="button" id="pImport">Import backup</button>
        <input type="file" id="pFile" accept="application/json" hidden />
      </div>
    </div>
    <div class="card mt-2">
      <h3 style="margin-top:0">Curriculum note</h3>
      <p class="muted" style="margin:0;line-height:1.55">
        Content is aligned to the <strong style="color:var(--text)">English National Curriculum</strong>
        (KS2 for George, KS3 for Bella-Rose) with skills mapped toward
        <strong style="color:var(--text)">GCSE Maths, English Language &amp; Combined/Triple Science</strong>.
        This is a practice hub, not a full exam board course — use it alongside school.
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
      save();
      alert("Imported!");
      go("parent");
    } catch {
      alert("Import failed");
    }
  };
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
  } XP · Streak ${p.streak} days · ${p.badges.length} badges</p>
      <div class="table-wrap">
        <table class="progress-table">
          <thead><tr><th>Subject</th><th>Test</th><th>Date</th><th>Lessons</th><th>Level</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

// —— Boot ——
go(state.activeLearner ? "dashboard" : "home");
