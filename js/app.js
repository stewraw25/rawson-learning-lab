/**
 * Rawson Learning Lab — rebuilt kid-first UI
 * Simple flow: Home → Hub → Subject → Lesson → Done → Next lesson
 * Cloud + engine + content stay in other modules.
 */

let state = loadState();
let appEl = document.getElementById("app");
let syncStatus = "";
let autoSyncTimer = null;
let saveToastTimer = null;
let debouncedSaveTimer = null;
let currentScreen = "home";
let homePaintGen = 0;

function root() {
  appEl = document.getElementById("app");
  return appEl;
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Save / cloud (automatic) ─────────────────────────────────
function showSavedToast(msg) {
  let el = document.getElementById("autoSaveToast");
  if (!el) {
    el = document.createElement("div");
    el.id = "autoSaveToast";
    el.className = "auto-save-toast";
    document.body.appendChild(el);
  }
  el.textContent = msg || "Saved ✓";
  el.classList.add("show");
  clearTimeout(saveToastTimer);
  saveToastTimer = setTimeout(() => el.classList.remove("show"), 1600);
}

async function save(opts) {
  const options = opts || {};
  const quiet = !!options.quiet;
  const who = options.learnerId || state.activeLearner;
  try {
    if (who && state.profiles[who]) {
      state.profiles[who] = normalizeProfile(who, state.profiles[who]);
      state.profiles[who].updatedAt = Date.now();
    }
    saveState(state);
  } catch (e) {
    console.error(e);
    if (!quiet) showSavedToast("Could not save — tell a parent");
    return { ok: false };
  }
  try {
    ensureCloudEnabled();
    if (who && state.profiles[who]) {
      const result = await pushProfile(who, state.profiles[who]);
      if (result && result.remote && result.skipped) {
        state.profiles[who] = normalizeProfile(who, result.remote);
        saveState(state);
      }
    }
    if (typeof pushRicherLocals === "function") await pushRicherLocals(state);
    if (!quiet) showSavedToast("Saved ✓");
    return { ok: true };
  } catch (e) {
    console.warn(e);
    if (!quiet) showSavedToast("Saved on this Mac ✓");
    return { ok: true, cloud: false };
  }
}

function autosaveSoon() {
  clearTimeout(debouncedSaveTimer);
  debouncedSaveTimer = setTimeout(() => {
    save({ quiet: true }).catch(() => {});
  }, 350);
}

async function refreshFromCloud() {
  try {
    ensureCloudEnabled();
    const result = await Promise.race([
      pullProfiles(state),
      new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 10000)),
    ]);
    if (result && result.changed) {
      for (const id of Object.keys(LEARNERS)) {
        state.profiles[id] = normalizeProfile(id, state.profiles[id]);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (_) {}
    }
    if (typeof pushRicherLocals === "function") await pushRicherLocals(state);
    return !!(result && result.changed);
  } catch (e) {
    console.warn("cloud", e);
    return false;
  }
}

function startAutoSync() {
  if (autoSyncTimer) return;
  ensureCloudEnabled();
  autoSyncTimer = setInterval(() => {
    refreshFromCloud().catch(() => {});
  }, 15000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshFromCloud().catch(() => {});
    else {
      try {
        saveState(state);
      } catch (_) {}
    }
  });
}

// ─── Navigation ───────────────────────────────────────────────
function go(screen, params) {
  params = params || {};
  currentScreen = screen;
  if (screen !== "home") homePaintGen++;
  const el = root();
  if (!el) return;
  try {
    window.scrollTo(0, 0);
  } catch (_) {}

  try {
    if (screen === "home") return renderHome();
    if (screen === "hub") return renderHub();
    if (screen === "subject") return renderSubject(params);
    if (screen === "diagnostic") return renderDiagnostic(params);
    if (screen === "diagDone") return renderDiagDone(params);
    if (screen === "lesson") return renderLesson(params);
    if (screen === "lessonDone") return renderLessonDone(params);
    if (screen === "parent") return renderParent();
    renderHome();
  } catch (err) {
    console.error(err);
    el.innerHTML = `
      <div class="rb-fatal">
        <h1>Rawson Learning Lab</h1>
        <p>Something went wrong. Your progress is in the cloud.</p>
        <p class="muted">${escapeHtml(err.message || String(err))}</p>
        <a class="btn btn-primary" href="?v=60&reset=1">Reset &amp; reload</a>
      </div>`;
  }
}

function profile() {
  if (!state.activeLearner) return null;
  state.profiles[state.activeLearner] = normalizeProfile(
    state.activeLearner,
    state.profiles[state.activeLearner]
  );
  return state.profiles[state.activeLearner];
}

function learner() {
  return state.activeLearner ? LEARNERS[state.activeLearner] : null;
}

function topbar(showBack) {
  const L = learner();
  const p = profile();
  return `
    <header class="rb-top">
      <button type="button" class="rb-brand" data-nav="home">
        <img src="assets/logo.svg" width="40" height="40" alt="" />
        <span>
          <strong>Rawson Learning Lab</strong>
          <small>AI tutors · saves automatically</small>
        </span>
      </button>
      <div class="rb-top-right">
        ${
          L && p
            ? `<span class="rb-pill">${L.emoji} ${escapeHtml(L.name)} · Lv ${p.level}</span>
               <button type="button" class="btn btn-ghost btn-sm" data-nav="hub">Hub</button>
               <button type="button" class="btn btn-ghost btn-sm" data-nav="home">Switch</button>`
            : `<button type="button" class="btn btn-ghost btn-sm" data-nav="parent">Parent</button>`
        }
      </div>
    </header>`;
}

function footer() {
  return `
    <footer class="site-powered">
      <span class="powered-label">Powered via</span>
      <span class="powered-brands">
        <img class="powered-logo" src="assets/grok-logo.svg" alt="Grok" height="28" />
        <span class="powered-amp">&amp;</span>
        <img class="powered-logo" src="assets/rawson-labs-logo.svg" alt="Rawson LABS" height="28" />
      </span>
    </footer>`;
}

function bindNav(container) {
  container = container || root();
  if (!container) return;
  container.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const n = btn.getAttribute("data-nav");
      if (n === "home") {
        state.activeLearner = null;
        go("home");
      } else if (n === "hub") go("hub");
      else if (n === "parent") go("parent");
    });
  });
}

async function openKid(id) {
  if (!LEARNERS[id]) return;
  homePaintGen++;
  state.activeLearner = id;
  state.profiles[id] = normalizeProfile(id, state.profiles[id]);
  try {
    await refreshFromCloud();
  } catch (_) {}
  state.profiles[id] = normalizeProfile(id, state.profiles[id]);
  try {
    saveState(state);
  } catch (_) {}
  save({ quiet: true, learnerId: id }).catch(() => {});
  go("hub");
}

// ─── HOME ─────────────────────────────────────────────────────
function kidScoreCard(id) {
  const L = LEARNERS[id];
  const p = normalizeProfile(id, state.profiles[id]);
  const rows = ["maths", "english", "science"]
    .map((sub) => {
      const pct = subjectOverall(p, sub);
      const d = p.diagnostics && p.diagnostics[sub];
      const label =
        pct != null ? pct + "%" : d && d.completed ? d.score + "%" : "—";
      const w = pct != null ? pct : d && d.completed ? Number(d.score) || 0 : 4;
      return `
        <div class="rb-score-row">
          <span>${SUBJECTS[sub].emoji} ${SUBJECTS[sub].name}</span>
          <div class="rb-bar"><i style="width:${Math.max(4, w)}%"></i></div>
          <strong>${label}</strong>
        </div>`;
    })
    .join("");
  const lessons = (p.lessonHistory || []).length;
  return `
    <article class="card rb-kid-card ${L.theme}">
      <div class="rb-kid-head">
        <span class="rb-avatar">${L.emoji}</span>
        <div>
          <h2>${escapeHtml(L.fullName)}</h2>
          <p class="muted">Age ${L.age} · ${lessons} lessons · ${p.xp || 0} XP</p>
        </div>
      </div>
      ${rows}
      <button type="button" class="btn btn-primary btn-xl rb-open-kid" data-kid="${id}">
        Open ${escapeHtml(L.name)}'s hub →
      </button>
    </article>`;
}

function renderHome() {
  const gen = ++homePaintGen;
  state.activeLearner = null;
  const paint = () => {
    if (gen !== homePaintGen || currentScreen !== "home") return;
    const el = root();
    el.innerHTML = `
      ${topbar()}
      <section class="rb-hero card">
        <img class="rb-hero-logo" src="assets/logo.svg" width="72" height="72" alt="" />
        <h1>Rawson Learning Lab</h1>
        <p class="lead">Homeschooling with <strong>AI tutors</strong> — so learning fits around life</p>
        <p class="muted">Pick who is learning. Progress saves by itself.</p>
      </section>
      <section class="rb-grid-2">
        ${kidScoreCard("bella")}
        ${kidScoreCard("george")}
      </section>
      <p class="muted center rb-hint">Parent tools are at the top right.</p>
      ${footer()}
    `;
    bindNav(el);
    el.querySelectorAll("[data-kid]").forEach((btn) => {
      btn.addEventListener("click", () => openKid(btn.getAttribute("data-kid")));
    });
  };
  paint();
  refreshFromCloud().then(() => {
    if (gen === homePaintGen && currentScreen === "home") paint();
  });
}

// ─── HUB ──────────────────────────────────────────────────────
function renderHub() {
  const L = learner();
  const p = profile();
  if (!L || !p) return go("home");

  // Next action for this kid
  let continueHtml = "";
  try {
    const act = typeof findNextAction === "function" ? findNextAction(p) : null;
    if (act && act.subject) {
      const sub = act.subject;
      const stage = act.stage || getActiveStage(p, sub) || 1;
      if (act.kind === "placement" || act.type === "placement") {
        continueHtml = `
          <button type="button" class="btn btn-primary btn-xl rb-continue" data-go-subject="${sub}" data-placement="1">
            Continue: ${SUBJECTS[sub].emoji} ${SUBJECTS[sub].name} placement →
          </button>`;
      } else if (act.skillId) {
        continueHtml = `
          <button type="button" class="btn btn-primary btn-xl rb-continue"
            data-go-subject="${sub}" data-skill="${act.skillId}" data-stage="${stage}">
            Continue: ${escapeHtml(act.label || act.skillId)} →
          </button>`;
      } else {
        continueHtml = `
          <button type="button" class="btn btn-primary btn-xl rb-continue" data-go-subject="${sub}">
            Continue: ${SUBJECTS[sub].emoji} ${SUBJECTS[sub].name} →
          </button>`;
      }
    }
  } catch (_) {}

  if (!continueHtml) {
    // Fallback: first subject without placement, else first subject with next lesson
    for (const sub of ["maths", "english", "science"]) {
      const d = p.diagnostics && p.diagnostics[sub];
      if (!d || !d.completed) {
        continueHtml = `
          <button type="button" class="btn btn-primary btn-xl rb-continue" data-go-subject="${sub}" data-placement="1">
            Start: ${SUBJECTS[sub].emoji} ${SUBJECTS[sub].name} placement →
          </button>`;
        break;
      }
      const next = nextLesson(p, sub);
      if (next) {
        const st = getActiveStage(p, sub) || 1;
        const meta = getLessonMeta(sub, next, st);
        continueHtml = `
          <button type="button" class="btn btn-primary btn-xl rb-continue"
            data-go-subject="${sub}" data-skill="${next}" data-stage="${st}">
            Continue: ${escapeHtml(meta.title || next)} →
          </button>`;
        break;
      }
    }
  }

  const subjectCards = ["maths", "english", "science"]
    .map((sub) => {
      const pct = subjectOverall(p, sub);
      const d = p.diagnostics && p.diagnostics[sub];
      let status = "Start with a short test";
      if (d && d.completed) {
        const n = nextLesson(p, sub);
        if (n) {
          const st = getActiveStage(p, sub) || 1;
          status = "Next: " + (getLessonMeta(sub, n, st).title || n);
        } else status = "Stage lessons complete";
      }
      return `
        <button type="button" class="card rb-subject-card" data-go-subject="${sub}">
          <span class="rb-subject-emoji">${SUBJECTS[sub].emoji}</span>
          <strong>${SUBJECTS[sub].name}</strong>
          <span class="muted">${escapeHtml(status)}</span>
          <div class="rb-bar"><i style="width:${pct != null ? pct : 5}%"></i></div>
          <span class="rb-pct">${pct != null ? pct + "%" : "—"}</span>
        </button>`;
    })
    .join("");

  const el = root();
  el.innerHTML = `
    ${topbar()}
    <section class="rb-welcome card">
      <h1>Hi ${escapeHtml(L.name)}! ${L.emoji}</h1>
      <p class="muted">Pick a subject — or tap the big green button.</p>
      ${continueHtml || ""}
    </section>
    <section class="rb-subjects">${subjectCards}</section>
    ${footer()}
  `;
  bindNav(el);
  el.querySelectorAll("[data-go-subject]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sub = btn.getAttribute("data-go-subject");
      const skill = btn.getAttribute("data-skill");
      const stage = Number(btn.getAttribute("data-stage")) || 0;
      const placement = btn.getAttribute("data-placement");
      if (placement) return go("diagnostic", { subject: sub });
      if (skill) return go("lesson", { subject: sub, skillId: skill, stage: stage || 1 });
      go("subject", { subject: sub });
    });
  });
}

// ─── SUBJECT ──────────────────────────────────────────────────
function renderSubject({ subject }) {
  const L = learner();
  const p = profile();
  if (!L || !p || !SUBJECTS[subject]) return go("hub");

  if (p.diagnostics?.[subject]?.completed) {
    try {
      ensureCourseReady(p, subject);
    } catch (_) {}
  }

  const course = p.courses?.[subject] ? ensureCourseShape(p, subject) : null;
  const stage = Number(course?.activeStage) || 1;
  const stageMeta = COURSE_STAGES[stage] || COURSE_STAGES[1];
  let stageData = course?.stages?.[stage];
  if (p.diagnostics?.[subject]?.completed && (!stageData || !stageData.path?.length)) {
    try {
      ensureCourseReady(p, subject);
      stageData = p.courses[subject]?.stages?.[stage];
    } catch (_) {}
  }
  const path = (stageData && Array.isArray(stageData.path) && stageData.path) || [];
  const completed =
    stageData && stageData.completed && typeof stageData.completed === "object" && !Array.isArray(stageData.completed)
      ? stageData.completed
      : {};
  const doneCount = path.filter((id) => completed[id]).length;
  const nextId = path.length ? nextLesson(p, subject, stage) : null;
  const nextMeta = nextId ? getLessonMeta(subject, nextId, stage) : null;
  const diag = p.diagnostics && p.diagnostics[subject];
  const overall = subjectOverall(p, subject);

  let hero = "";
  if (!diag || !diag.completed) {
    hero = `
      <div class="card rb-next-card">
        <p class="rb-label">Start here</p>
        <h2>Placement test</h2>
        <p class="muted">About 10 questions so we know what to teach you.</p>
        <button type="button" class="btn btn-primary btn-xl" id="btnPrimary">
          Start ${SUBJECTS[subject].name} test →
        </button>
      </div>`;
  } else if (nextId && nextMeta) {
    hero = `
      <div class="card rb-next-card">
        <p class="rb-label">Do this next</p>
        <h2>${escapeHtml(nextMeta.title)}</h2>
        <p class="muted">Lesson ${path.indexOf(nextId) + 1} of ${path.length} · ${escapeHtml(stageMeta.name)}</p>
        <button type="button" class="btn btn-primary btn-xl" id="btnPrimary"
          data-skill="${nextId}" data-stage="${stage}">
          Start lesson →
        </button>
      </div>`;
  } else {
    hero = `
      <div class="card rb-next-card">
        <p class="rb-label">Nice work</p>
        <h2>This level's lessons are done</h2>
        <p class="muted">You can revise any lesson below, or go back to your hub.</p>
        <button type="button" class="btn btn-primary btn-xl" id="btnHub">Back to hub →</button>
      </div>`;
  }

  const list = path.length
    ? `
    <div class="card">
      <h3 style="margin-top:0">Lessons (${doneCount}/${path.length})</h3>
      <div class="rb-lesson-list">
        ${path
          .map((sid, i) => {
            const meta = getLessonMeta(subject, sid, stage);
            const done = !!completed[sid];
            const isNext = sid === nextId;
            const prevDone = i === 0 || !!completed[path[i - 1]];
            const open = done || isNext || prevDone;
            return `
              <button type="button" class="rb-lesson ${done ? "done" : ""} ${isNext ? "next" : ""}"
                data-skill="${sid}" data-stage="${stage}" ${open ? "" : "disabled"}>
                <span class="rb-lesson-num">${done ? "✓" : i + 1}</span>
                <span class="rb-lesson-body">
                  <strong>${escapeHtml(meta.title)}</strong>
                  <small>${done ? "Done · tap to revise" : isNext ? "← do this next" : open ? "Ready" : "Locked"}</small>
                </span>
                <span class="rb-lesson-cta">${done ? "Revise" : isNext ? "Start" : open ? "Open" : "🔒"}</span>
              </button>`;
          })
          .join("")}
      </div>
    </div>`
    : diag && diag.completed
      ? `<div class="card"><button type="button" class="btn btn-primary" id="btnRebuild">Show my lessons →</button></div>`
      : "";

  const el = root();
  el.innerHTML = `
    ${topbar()}
    <button type="button" class="btn btn-ghost mb-1" data-nav="hub">← Hub</button>
    <div class="rb-subject-head">
      <h1>${SUBJECTS[subject].emoji} ${SUBJECTS[subject].name}</h1>
      <p class="muted">${overall != null ? overall + "% level" : "Not started"} · ${escapeHtml(L.name)}</p>
      <div class="rb-bar big"><i style="width:${overall != null ? overall : 4}%"></i></div>
    </div>
    ${hero}
    ${list}
    ${
      diag && diag.completed
        ? `<p class="muted center"><button type="button" class="btn btn-ghost btn-sm" id="btnRetest">Retake placement test</button></p>`
        : ""
    }
    ${footer()}
  `;
  bindNav(el);

  const primary = document.getElementById("btnPrimary");
  if (primary) {
    primary.onclick = () => {
      const skill = primary.getAttribute("data-skill");
      if (skill) {
        go("lesson", {
          subject,
          skillId: skill,
          stage: Number(primary.getAttribute("data-stage")) || stage,
        });
      } else {
        go("diagnostic", { subject });
      }
    };
  }
  document.getElementById("btnHub")?.addEventListener("click", () => go("hub"));
  document.getElementById("btnRetest")?.addEventListener("click", () =>
    go("diagnostic", { subject })
  );
  document.getElementById("btnRebuild")?.addEventListener("click", async () => {
    buildCourse(p, subject, stage);
    ensureCourseReady(p, subject);
    await save({ quiet: true });
    go("subject", { subject });
  });
  el.querySelectorAll(".rb-lesson[data-skill]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      go("lesson", {
        subject,
        skillId: btn.getAttribute("data-skill"),
        stage: Number(btn.getAttribute("data-stage")) || stage,
      });
    });
  });

  if (diag?.completed) save({ quiet: true }).catch(() => {});
}

// ─── DIAGNOSTIC ───────────────────────────────────────────────
function renderDiagnostic({ subject }) {
  if (!learner() || !SUBJECTS[subject]) return go("hub");
  const qs = questionsForLearner(subject, state.activeLearner) || [];
  if (!qs.length) {
    root().innerHTML = `${topbar()}<div class="card"><p>No questions loaded.</p>
      <button class="btn btn-primary" data-nav="hub">Hub</button></div>`;
    bindNav();
    return;
  }
  const answers = {};
  let index = 0;
  let revealed = false;

  function paint() {
    const q = qs[index];
    const pct = Math.round((index / qs.length) * 100);
    const el = root();
    el.innerHTML = `
      ${topbar()}
      <div class="rb-progress-line">
        <span>${SUBJECTS[subject].emoji} Test · ${index + 1} of ${qs.length}</span>
        <div class="rb-bar"><i style="width:${pct}%"></i></div>
      </div>
      <div class="card rb-q-card">
        ${q.passage ? `<blockquote class="passage">${escapeHtml(q.passage)}</blockquote>` : ""}
        <h2>${escapeHtml(q.q)}</h2>
        <div id="qBody"></div>
        <button type="button" class="btn-learn-about" id="btnLearn">📖 Learn about this</button>
        <div id="feedback"></div>
        <div class="rb-actions">
          <button type="button" class="btn btn-primary" id="btnCheck">Check</button>
          <button type="button" class="btn btn-ok" id="btnNext" style="display:none">
            ${index + 1 >= qs.length ? "See results →" : "Next →"}
          </button>
        </div>
      </div>
    `;
    bindNav(el);
    wireQuestion(q, answers, () => {
      /* on check */
    });
    document.getElementById("btnLearn").onclick = () =>
      openLearnAboutSubject({
        subject,
        subjectName: SUBJECTS[subject].name,
        skillId: q.skill,
        skillName: SKILLS[subject]?.[q.skill]?.name || q.skill,
        question: q.q,
        passage: q.passage || "",
        type: q.type,
        options: q.options || null,
        explain: q.explain || "",
        learnerName: learner().fullName,
        age: learner().age,
        yearGroup: learner().yearGroup,
      });

    document.getElementById("btnCheck").onclick = () => {
      if (revealed) return;
      const val = answers[q.id];
      if (val === undefined || val === "") {
        alert("Pick or type an answer first!");
        return;
      }
      revealed = true;
      const ok = checkAnswer(q, val);
      const fb = document.getElementById("feedback");
      fb.className = `feedback ${ok ? "good" : "bad"}`;
      fb.textContent = (ok ? "✓ Correct! " : "Not quite. ") + (q.explain || "");
      const body = document.getElementById("qBody");
      if (q.type === "multi") {
        body.querySelectorAll(".option").forEach((btn) => {
          const i = Number(btn.dataset.i);
          if (i === q.answer) btn.classList.add("correct");
          if (i === val && !ok) btn.classList.add("wrong");
          btn.disabled = true;
        });
      }
      document.getElementById("btnCheck").disabled = true;
      document.getElementById("btnNext").style.display = "inline-flex";
      autosaveSoon();
    };
    document.getElementById("btnNext").onclick = () => {
      if (index + 1 >= qs.length) finish();
      else {
        index++;
        revealed = false;
        paint();
      }
    };
  }

  function wireQuestion(q) {
    const body = document.getElementById("qBody");
    if (q.type === "multi") {
      body.innerHTML = `<div class="options">${q.options
        .map(
          (opt, i) =>
            `<button type="button" class="option" data-i="${i}">${escapeHtml(opt)}</button>`
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
      body.innerHTML = `<input class="input-answer" id="typed" placeholder="Type your answer…" />`;
      const input = document.getElementById("typed");
      input.focus();
      input.oninput = () => {
        answers[q.id] = input.value;
      };
      input.onkeydown = (e) => {
        if (e.key === "Enter") document.getElementById("btnCheck").click();
      };
    }
  }

  async function finish() {
    const result = scoreDiagnostic(subject, state.activeLearner, answers);
    recordDiagnostic(profile(), subject, answers, result);
    try {
      ensureCourseReady(profile(), subject);
    } catch (_) {}
    await save({ quiet: false });
    go("diagDone", { subject, result });
  }

  paint();
}

function renderDiagDone({ subject, result }) {
  const el = root();
  el.innerHTML = `
    ${topbar()}
    <div class="card rb-done">
      <p class="rb-label">Test complete · saved ✓</p>
      <h1>${SUBJECTS[subject].emoji} ${result.score}%</h1>
      <p class="muted">${result.correct} of ${result.total} correct</p>
      <button type="button" class="btn btn-primary btn-xl" id="btnGo">
        Start my ${SUBJECTS[subject].name} lessons →
      </button>
    </div>
  `;
  bindNav(el);
  document.getElementById("btnGo").onclick = () => go("subject", { subject });
}

// ─── LESSON ───────────────────────────────────────────────────
function renderLesson({ subject, skillId, stage }) {
  const p = profile();
  const L = learner();
  if (!p || !L || !SUBJECTS[subject] || !skillId) return go("hub");

  const stageNum =
    Number(stage) ||
    (p.courses?.[subject] ? getActiveStage(p, subject) : 1) ||
    1;
  const mod = getTeachModule(subject, skillId, stageNum, state.activeLearner);
  if (!mod) {
    alert("That lesson could not load. Opening your course list.");
    return go("subject", { subject });
  }

  const session = createTutorSession(subject, skillId, state.activeLearner, stageNum);
  if (!session || !session.queue.length) {
    // No questions — mark complete and move on
    recordLesson(p, subject, skillId, 100, stageNum);
    save({ quiet: true });
    const next = nextLesson(p, subject, stageNum);
    return go("lessonDone", {
      subject,
      skillId,
      scorePct: 100,
      correctCount: 0,
      total: 0,
      stage: stageNum,
      nextSkill: next && next !== skillId ? next : null,
    });
  }

  let answerVal = null;
  let revealed = false;
  let finishing = false;

  function paint() {
    if (session.finished || session.phase === "complete") {
      finish();
      return;
    }
    const prog = sessionProgress(session);
    const skillName = SKILLS[subject]?.[skillId]?.name || skillId;
    let body = "";

    if (session.phase === "teach") {
      body = `
        <p class="rb-label">1 · Learn</p>
        <h2>${escapeHtml(mod.title)}</h2>
        <p class="muted">${escapeHtml(mod.blurb)}</p>
        ${mod.teach.visual ? `<div class="visual-wrap">${mod.teach.visual}</div>` : ""}
        <ul class="teach-points">
          ${(mod.teach.points || []).map((pt) => `<li>${escapeHtml(pt)}</li>`).join("")}
        </ul>
        <button type="button" class="btn btn-primary btn-xl" id="btnGo">Next: example →</button>`;
    } else if (session.phase === "example") {
      body = `
        <p class="rb-label">2 · Example</p>
        <h2>${escapeHtml(mod.example?.title || "Worked example")}</h2>
        <ol class="teach-steps">
          ${(mod.example?.steps || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("")}
        </ol>
        <button type="button" class="btn btn-primary btn-xl" id="btnGo">Next: questions →</button>`;
    } else {
      const q = session.queue[session.practiceIndex];
      if (!q) {
        session.finished = true;
        finish();
        return;
      }
      const isHelp = q._src === "help";
      body = `
        <p class="rb-label">${isHelp ? "Extra practice" : "3 · Question"} ${
        session.practiceIndex + 1
      } of ${session.queue.length}</p>
        ${q.passage ? `<blockquote class="passage">${escapeHtml(q.passage)}</blockquote>` : ""}
        <h2>${escapeHtml(q.q)}</h2>
        <div id="qBody"></div>
        <button type="button" class="btn-learn-about" id="btnLearn">📖 Learn about this</button>
        <div id="feedback"></div>
        <div class="rb-actions">
          <button type="button" class="btn btn-primary" id="btnCheck">Check</button>
          <button type="button" class="btn btn-ok" id="btnGo" style="display:none">Next →</button>
        </div>`;
    }

    const el = root();
    el.innerHTML = `
      ${topbar()}
      <div class="rb-progress-line">
        <span>${SUBJECTS[subject].emoji} ${escapeHtml(skillName)}</span>
        <div class="rb-bar"><i style="width:${prog.pct}%"></i></div>
      </div>
      <div class="card rb-q-card">${body}</div>
      <button type="button" class="btn btn-ghost btn-sm" id="btnExit">Exit</button>
    `;
    bindNav(el);
    document.getElementById("btnExit").onclick = () => go("subject", { subject });

    if (session.phase === "teach") {
      document.getElementById("btnGo").onclick = () => {
        session.phase = "example";
        paint();
      };
    } else if (session.phase === "example") {
      document.getElementById("btnGo").onclick = () => {
        session.phase = "practice";
        session.practiceIndex = 0;
        paint();
      };
    } else {
      wirePractice();
    }
  }

  function wirePractice() {
    const q = session.queue[session.practiceIndex];
    answerVal = null;
    revealed = false;
    const body = document.getElementById("qBody");
    document.getElementById("btnLearn").onclick = () =>
      openLearnAboutSubject({
        subject,
        subjectName: SUBJECTS[subject].name,
        skillId,
        skillName: SKILLS[subject]?.[skillId]?.name || skillId,
        question: q.q,
        passage: q.passage || "",
        type: q.type,
        options: q.options || null,
        explain: q.explain || "",
        learnerName: L.fullName,
        age: L.age,
        yearGroup: L.yearGroup,
      });

    if (q.type === "multi") {
      body.innerHTML = `<div class="options">${q.options
        .map(
          (opt, i) =>
            `<button type="button" class="option" data-i="${i}">${escapeHtml(opt)}</button>`
        )
        .join("")}</div>`;
      body.querySelectorAll(".option").forEach((btn) => {
        btn.onclick = () => {
          if (revealed) return;
          body.querySelectorAll(".option").forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          answerVal = Number(btn.dataset.i);
        };
      });
    } else {
      body.innerHTML = `<input class="input-answer" id="typed" placeholder="Type your answer…" />`;
      const input = document.getElementById("typed");
      input.focus();
      input.oninput = () => {
        answerVal = input.value;
      };
      input.onkeydown = (e) => {
        if (e.key === "Enter") document.getElementById("btnCheck").click();
      };
    }

    document.getElementById("btnCheck").onclick = () => {
      if (revealed) return;
      if (answerVal === null || answerVal === "") {
        alert("Pick or type an answer first!");
        return;
      }
      revealed = true;
      const ok = handlePracticeAnswer(session, q, answerVal);
      const fb = document.getElementById("feedback");
      fb.className = `feedback ${ok ? "good" : "bad"}`;
      fb.textContent =
        (ok ? "✓ Correct! " : "Not quite. ") + (q.explain || "");
      if (q.type === "multi") {
        body.querySelectorAll(".option").forEach((btn) => {
          const i = Number(btn.dataset.i);
          if (i === q.answer) btn.classList.add("correct");
          if (i === answerVal && !ok) btn.classList.add("wrong");
          btn.disabled = true;
        });
      }
      document.getElementById("btnCheck").disabled = true;
      const nextBtn = document.getElementById("btnGo");
      nextBtn.style.display = "inline-flex";
      const last =
        session.practiceIndex >= session.queue.length - 1 &&
        !(
          !ok &&
          mod.struggle?.practice?.length &&
          !session.helpShownForIndex[session.practiceIndex]
        );
      nextBtn.textContent = last ? "Finish lesson →" : "Next →";
      nextBtn.onclick = () => {
        const r = advanceAfterAnswer(session, ok);
        if (r.done || session.finished) {
          finish();
          return;
        }
        paint();
      };
      if (ok) {
        setTimeout(() => {
          if (document.getElementById("btnGo") === nextBtn) nextBtn.click();
        }, 500);
      }
      autosaveSoon();
    };
  }

  async function finish() {
    if (finishing) return;
    finishing = true;
    session.finished = true;
    const scorePct = scoreSession(session);
    recordLesson(profile(), subject, skillId, scorePct, stageNum);
    // Double-stamp complete on stage
    try {
      const course = migrateCourseEntry(profile().courses[subject]);
      profile().courses[subject] = course;
      const st = course.stages[stageNum];
      if (st) {
        if (!st.completed || Array.isArray(st.completed)) st.completed = {};
        st.completed[skillId] = {
          score: scorePct,
          date: todayKey(),
          stage: stageNum,
        };
      }
    } catch (_) {}
    await save({ quiet: false });
    let next = nextLesson(profile(), subject, stageNum);
    if (next === skillId) next = null;
    go("lessonDone", {
      subject,
      skillId,
      scorePct,
      correctCount: session.practiceCorrect,
      total: session.practiceTotal,
      stage: stageNum,
      nextSkill: next,
    });
  }

  paint();
}

function renderLessonDone({
  subject,
  skillId,
  scorePct,
  correctCount,
  total,
  stage,
  nextSkill,
}) {
  const stageNum = Number(stage) || 1;
  const p = profile();
  // Refresh next skill after save
  let nextId = nextSkill;
  try {
    const n = nextLesson(p, subject, stageNum);
    if (n && n !== skillId) nextId = n;
    else if (n === skillId) nextId = null;
  } catch (_) {}

  const title =
    typeof getLessonMeta === "function"
      ? getLessonMeta(subject, skillId, stageNum).title
      : skillId;
  const nextTitle = nextId
    ? typeof getLessonMeta === "function"
      ? getLessonMeta(subject, nextId, stageNum).title
      : nextId
    : "";

  const el = root();
  el.innerHTML = `
    ${topbar()}
    <div class="card rb-done">
      <p class="rb-label">Finished · saved ✓</p>
      <h1>${escapeHtml(title)}</h1>
      <p class="rb-done-score">${scorePct}%</p>
      <p class="muted">${correctCount || 0} of ${total || "?"} correct</p>
      ${
        nextId
          ? `<button type="button" class="btn btn-primary btn-xl" id="btnNext">
               Next lesson: ${escapeHtml(nextTitle)} →
             </button>
             <p class="muted" id="countHint">Starting in <strong id="cd">3</strong>…</p>`
          : `<button type="button" class="btn btn-primary btn-xl" id="btnNext">
               Back to ${SUBJECTS[subject].name} →
             </button>`
      }
      <p style="margin-top:1rem">
        <button type="button" class="btn btn-ghost" data-nav="hub">Hub</button>
      </p>
    </div>
  `;
  bindNav(el);

  let t = null;
  let iv = null;
  const clear = () => {
    if (t) clearTimeout(t);
    if (iv) clearInterval(iv);
  };

  document.getElementById("btnNext").onclick = () => {
    clear();
    if (nextId) go("lesson", { subject, skillId: nextId, stage: stageNum });
    else go("subject", { subject });
  };

  if (nextId) {
    let n = 3;
    iv = setInterval(() => {
      n--;
      const cd = document.getElementById("cd");
      if (cd) cd.textContent = String(Math.max(0, n));
      if (n <= 0) clearInterval(iv);
    }, 1000);
    t = setTimeout(() => {
      if (document.getElementById("btnNext")) {
        go("lesson", { subject, skillId: nextId, stage: stageNum });
      }
    }, 3000);
  }
}

// ─── PARENT ───────────────────────────────────────────────────
function renderParent() {
  const rows = ["bella", "george"]
    .map((id) => {
      const L = LEARNERS[id];
      const p = normalizeProfile(id, state.profiles[id]);
      const cells = ["maths", "english", "science"]
        .map((sub) => {
          const o = subjectOverall(p, sub);
          const d = p.diagnostics?.[sub];
          return `<td>${SUBJECTS[sub].emoji} ${
            o != null ? o + "%" : d?.completed ? d.score + "%" : "—"
          }</td>`;
        })
        .join("");
      return `<tr><td><strong>${escapeHtml(L.name)}</strong><br><small class="muted">${
        p.xp || 0
      } XP · ${(p.lessonHistory || []).length} lessons</small></td>${cells}</tr>`;
    })
    .join("");

  const el = root();
  el.innerHTML = `
    ${topbar()}
    <h1>Parent zone</h1>
    <p class="muted">Progress saves automatically (this Mac + Firebase cloud RAWSON-HOME).</p>
    <div class="card">
      <table class="rb-table">
        <thead><tr><th>Student</th><th>Maths</th><th>English</th><th>Science</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="rb-actions" style="margin-top:1rem">
      <button type="button" class="btn btn-secondary" id="btnExport">Export backup</button>
      <button type="button" class="btn btn-secondary" id="btnImport">Import backup</button>
      <input type="file" id="importFile" accept="application/json" hidden />
    </div>
    <div class="card mt-2">
      <h3 style="margin-top:0">Grok AI key (optional)</h3>
      <p class="muted">For “Learn about this” rich guides. Leave blank to use built-in explanations.</p>
      <input class="input-answer" id="aiKey" type="password" placeholder="xai-…" value="${escapeHtml(
        typeof getAiKey === "function" ? getAiKey() : ""
      )}" />
      <button type="button" class="btn btn-primary mt-1" id="btnSaveAi">Save AI key</button>
      <p id="aiMsg" class="muted"></p>
    </div>
    ${footer()}
  `;
  bindNav(el);
  document.getElementById("btnExport").onclick = () => {
    const blob = new Blob([exportState(state)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `rawson-learning-backup-${todayKey()}.json`;
    a.click();
  };
  document.getElementById("btnImport").onclick = () =>
    document.getElementById("importFile").click();
  document.getElementById("importFile").onchange = async (e) => {
    try {
      state = importState(await e.target.files[0].text());
      for (const id of Object.keys(LEARNERS)) {
        state.profiles[id] = normalizeProfile(id, state.profiles[id]);
      }
      saveState(state);
      alert("Imported");
      go("parent");
    } catch {
      alert("Import failed");
    }
  };
  document.getElementById("btnSaveAi").onclick = () => {
    setAiKey(document.getElementById("aiKey").value);
    document.getElementById("aiMsg").textContent = isAiConfigured()
      ? "AI key saved on this Mac ✓"
      : "Cleared";
  };
  refreshFromCloud().then(() => {
    /* scores may update if re-opened */
  });
}

// ─── Boot ─────────────────────────────────────────────────────
(async function boot() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") === "1") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (_) {}
      try {
        history.replaceState({}, "", "?v=60");
      } catch (_) {}
      state = loadState();
    }
    for (const id of Object.keys(LEARNERS)) {
      state.profiles[id] = normalizeProfile(id, state.profiles[id]);
    }
    ensureCloudEnabled();
    startAutoSync();
    await refreshFromCloud();
    for (const id of Object.keys(LEARNERS)) {
      state.profiles[id] = normalizeProfile(id, state.profiles[id]);
    }
    if (state.activeLearner && LEARNERS[state.activeLearner]) go("hub");
    else go("home");
  } catch (err) {
    console.error(err);
    const el = root();
    if (el) {
      el.innerHTML = `
        <div class="rb-fatal">
          <h1>Rawson Learning Lab</h1>
          <p>Could not start. Progress may still be in the cloud.</p>
          <p class="muted">${escapeHtml(err.message || String(err))}</p>
          <a class="btn btn-primary" href="?v=60&reset=1">Reset &amp; reload</a>
        </div>`;
    }
  }
})();
