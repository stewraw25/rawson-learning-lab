/**
 * Rawson Learning Lab — UI
 */

let state = loadState();
function getAppEl() {
  return document.getElementById("app");
}
/** @deprecated use getAppEl() — kept for existing code paths */
let appEl = getAppEl();
let parentPollTimer = null;
let syncStatus = ""; // parent diagnostics only
let autoSyncTimer = null;
let saveToastTimer = null;
let debouncedSaveTimer = null;
/** Cancels stale home-page repaints that stole focus from George's hub */
let homePaintGeneration = 0;
let currentScreen = "home";

function stopParentPoll() {
  if (parentPollTimer) {
    clearInterval(parentPollTimer);
    parentPollTimer = null;
  }
}

/** Tiny kid-friendly toast — no buttons, just reassurance */
function showSavedToast(msg = "Progress saved ✓") {
  let el = document.getElementById("autoSaveToast");
  if (!el) {
    el = document.createElement("div");
    el.id = "autoSaveToast";
    el.className = "auto-save-toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(saveToastTimer);
  saveToastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

/**
 * Fully automatic save: always local, always try cloud.
 * Kids never need to click anything.
 */
async function save(options = {}) {
  const { pushCloud = true, quiet = false, learnerId = null } = options;
  const who = learnerId || state.activeLearner;

  try {
    if (who && state.profiles[who]) {
      state.profiles[who].updatedAt = Date.now();
      state.profiles[who].id = who;
    }
    saveState(state);
  } catch (e) {
    console.error(e);
    if (!quiet) {
      showSavedToast("Storage blocked — tell a parent");
    }
    return { ok: false, error: e };
  }

  if (!pushCloud) {
    if (!quiet) showSavedToast("Progress saved ✓");
    return { ok: true, local: true };
  }

  try {
    ensureCloudEnabled();
    // Push the kid who just worked, plus any richer locals
    if (who && state.profiles[who]) {
      const result = await pushProfile(who, state.profiles[who]);
      if (result?.remote && result.skipped) {
        state.profiles[who] = normalizeProfile(who, result.remote);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (_) {
          /* ignore */
        }
      } else if (result?.updatedAt && state.profiles[who]) {
        state.profiles[who].updatedAt = result.updatedAt;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (_) {
          /* ignore */
        }
      }
    }
    await pushRicherLocals(state);
    syncStatus = "Auto-saved ✓ " + formatTime(Date.now());
    if (!quiet) showSavedToast("Progress saved ✓");
    return { ok: true, cloud: true };
  } catch (err) {
    console.error(err);
    syncStatus = "Saved on Mac only — " + (err.message || "");
    if (!quiet) showSavedToast("Saved on this Mac ✓");
    return { ok: true, cloud: false, error: err };
  }
}

/** Debounced autosave (e.g. after each quiz answer) */
function autosaveSoon() {
  clearTimeout(debouncedSaveTimer);
  debouncedSaveTimer = setTimeout(() => {
    save({ quiet: true }).catch(() => {});
  }, 400);
}

async function refreshFromCloud(opts = {}) {
  const { silent = true } = opts; // default silent for kids
  try {
    ensureCloudEnabled();
  } catch {
    /* ignore */
  }
  if (!isSyncEnabled()) return false;
  try {
    if (!silent) syncStatus = "Syncing…";
    const result = await Promise.race([
      pullProfiles(state),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Cloud timeout")), 10000)
      ),
    ]);
    if (result.changed) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error(e);
      }
      syncStatus =
        "Updated from cloud ✓ " +
        formatTime(Date.now()) +
        (result.restored?.length
          ? ` (${result.restored.join(", ")})`
          : "");
    } else if (!silent) {
      syncStatus = "Up to date ✓ " + formatTime(Date.now());
    }
    try {
      await pushRicherLocals(state);
    } catch (e) {
      console.warn(e);
    }
    return result.changed;
  } catch (err) {
    console.error(err);
    if (!silent) syncStatus = "Cloud sync error";
    return false;
  }
}

/** Background: pull + push every few seconds — fully automatic */
function startAutoSync() {
  if (autoSyncTimer) return;
  ensureCloudEnabled();
  autoSyncTimer = setInterval(() => {
    refreshFromCloud({ silent: true }).catch(() => {});
  }, 12000);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refreshFromCloud({ silent: true }).catch(() => {});
    } else {
      // Tab hidden — flush save
      try {
        saveState(state);
      } catch (_) {
        /* ignore */
      }
      if (state.activeLearner) {
        pushProfile(state.activeLearner, state.profiles[state.activeLearner]).catch(
          () => {}
        );
      }
    }
  });

  window.addEventListener("pagehide", () => {
    try {
      saveState(state);
    } catch (_) {
      /* ignore */
    }
    // Best-effort cloud flush
    if (state.activeLearner && isSyncEnabled()) {
      const p = state.profiles[state.activeLearner];
      const root =
        typeof familyRoot === "function" ? familyRoot() : null;
      if (root && p && navigator.sendBeacon) {
        try {
          const blob = new Blob(
            [JSON.stringify({ ...p, id: state.activeLearner, updatedAt: Date.now() })],
            { type: "application/json" }
          );
          navigator.sendBeacon(
            `${root}/profiles/${state.activeLearner}.json`,
            blob
          );
        } catch (_) {
          /* ignore */
        }
      }
    }
  });
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
  return LEARNERS[state.activeLearner] || null;
}

function go(screen, params = {}) {
  stopParentPoll();
  try {
    window.scrollTo(0, 0);
  } catch (_) {
    /* ignore */
  }
  // Leaving home — cancel any pending home repaint from cloud load
  if (screen !== "home") {
    homePaintGeneration++;
  }
  appEl = getAppEl();
  if (!appEl) {
    console.error("Missing #app element");
    return;
  }
  // If learner data is broken, force home
  if (screen !== "home" && screen !== "parent" && screen !== "sync" && screen !== "aiSettings") {
    if (!state.activeLearner || !LEARNERS[state.activeLearner]) {
      state.activeLearner = null;
      screen = "home";
    } else {
      state.profiles[state.activeLearner] = normalizeProfile(
        state.activeLearner,
        state.profiles[state.activeLearner]
      );
    }
  }
  currentScreen = screen;
  const routes = {
    home: renderHome,
    dashboard: renderDashboard,
    diagnostic: renderDiagnostic,
    diagnosticResult: renderDiagnosticResult,
    lesson: renderLesson,
    lessonResult: renderLessonResult,
    exam: renderExam,
    examResult: renderExamResult,
    parent: renderParent,
    subject: renderSubject,
    sync: renderSyncSetup,
    aiSettings: renderAiSettings,
  };
  const fn = routes[screen];
  try {
    if (fn) fn(params);
  } catch (err) {
    console.error("Screen failed:", screen, err);
    try {
      // Stay with learner if possible — show a simple hub recovery
      if (state.activeLearner && LEARNERS[state.activeLearner]) {
        appEl.innerHTML =
          topbar() +
          `<div class="card" style="margin-top:1rem">
            <h2>Almost there</h2>
            <p class="muted">Couldn’t open that screen. Your progress is still saved.</p>
            <p class="muted" style="font-size:0.8rem">${escapeHtml(String(err.message || err))}</p>
            <button class="btn btn-primary" type="button" id="btnRetryHub">Open hub again</button>
            <button class="btn btn-secondary" type="button" data-go="home">Home</button>
          </div>` +
          siteFooter();
        bindShell();
        const btn = document.getElementById("btnRetryHub");
        if (btn) btn.onclick = () => go("dashboard");
      } else {
        state.activeLearner = null;
        renderHome();
      }
    } catch (err2) {
      showFatalError(err2 || err);
    }
  }
}

/** Open a kid hub — load cloud first, never get sent back to home by a race */
function applyLearnerTheme(learnerId) {
  try {
    document.body.classList.remove("theme-learner-bella", "theme-learner-george");
    if (learnerId && LEARNERS[learnerId]) {
      document.body.classList.add(`theme-learner-${learnerId}`);
    }
  } catch (_) {
    /* ignore */
  }
}

async function openLearnerHub(learnerId) {
  if (!LEARNERS[learnerId]) return;
  homePaintGeneration++; // cancel home repaint
  state.activeLearner = learnerId;
  applyLearnerTheme(learnerId);

  // Ensure profile shell exists
  state.profiles[learnerId] = normalizeProfile(
    learnerId,
    state.profiles[learnerId]
  );

  try {
    ensureCloudEnabled();
    await refreshFromCloud({ silent: true });
  } catch (e) {
    console.warn("openLearnerHub cloud", e);
  }

  state.profiles[learnerId] = normalizeProfile(
    learnerId,
    state.profiles[learnerId]
  );

  // Persist selection locally (don't block hub on cloud)
  try {
    saveState(state);
  } catch (_) {
    /* ignore */
  }

  // Push quietly in background — never block opening hub
  save({ quiet: true, learnerId }).catch(() => {});

  go("dashboard");
}

function showFatalError(err) {
  const el = getAppEl();
  if (!el) return;
  const msg = String(err && err.message ? err.message : err || "Unknown error");
  el.innerHTML =
    '<div style="padding:2rem;font-family:system-ui;max-width:32rem;margin:2rem auto;color:#f7f1e3;background:#2a3d30;border-radius:16px">' +
    "<h1 style=\"margin-top:0\">Rawson Learning Lab</h1>" +
    "<p>Something went wrong loading the app.</p>" +
    '<p style="font-size:0.85rem;opacity:0.8">' +
    msg.replace(/</g, "&lt;") +
    "</p>" +
    '<p><a href="?v=18" style="color:#a5d6a7">Reload clean link</a></p>' +
    '<p style="margin-top:1rem">' +
    '<a href="?v=18&amp;reset=1" id="btnResetLocal" ' +
    'style="display:inline-block;padding:0.75rem 1rem;border-radius:10px;background:#43a047;color:#fff;font-weight:700;text-decoration:none">' +
    "Reset local data &amp; reload</a></p>" +
    '<p style="font-size:0.8rem;opacity:0.7;margin-top:1rem">Your exam scores are still in the family cloud and will reload after reset.</p>' +
    "</div>";
  // Inline-safe: also clear storage when link is clicked (in case query handling fails)
  const btn = document.getElementById("btnResetLocal");
  if (btn) {
    btn.onclick = function (e) {
      e.preventDefault();
      try {
        localStorage.removeItem("rawson-learning-lab-v1");
        localStorage.removeItem("rawson-learning-sync-config-v1");
      } catch (_) {
        /* ignore */
      }
      window.location.href =
        "https://stewraw25.github.io/rawson-learning-lab/?v=18&reset=1&t=" + Date.now();
    };
  }
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
          <p>AI tutors · learning that fits around life</p>
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

function siteFooter() {
  return `
    <footer class="site-powered">
      <span class="powered-label">Powered via</span>
      <span class="powered-brands">
        <img class="powered-logo powered-grok" src="assets/grok-logo.svg?v=15" alt="Grok" height="28" />
        <span class="powered-amp">&amp;</span>
        <img class="powered-logo powered-rawson" src="assets/rawson-labs-logo.svg" alt="Rawson LABS" height="28" />
      </span>
    </footer>`;
}

function bindShell() {
  appEl = getAppEl();
  if (!appEl || typeof appEl.querySelectorAll !== "function") return;
  appEl.querySelectorAll("[data-go]").forEach((el) => {
    el.addEventListener("click", () => go(el.dataset.go));
  });
  const sw = appEl.querySelector("[data-switch]");
  if (sw) {
    sw.addEventListener("click", () => {
      state.activeLearner = null;
      save({ quiet: true }).catch(function () {});
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
function recentScoresSummary(id) {
  const p = state.profiles[id] || defaultProfile(id);
  const L = LEARNERS[id];
  const subjects = ["maths", "english", "science"].map((sub) => {
    const d = p.diagnostics?.[sub];
    const overall = subjectOverall(p, sub);
    return {
      sub,
      name: SUBJECTS[sub].name,
      emoji: SUBJECTS[sub].emoji,
      test: d?.completed ? d.score : null,
      level: overall,
      date: d?.date || null,
    };
  });
  const recentLessons = (p.lessonHistory || []).slice(-3).reverse();
  const lastLesson = recentLessons[0] || null;
  const avgTest = subjects.filter((s) => s.test != null);
  const avg =
    avgTest.length > 0
      ? Math.round(avgTest.reduce((a, s) => a + s.test, 0) / avgTest.length)
      : null;

  return { p, L, subjects, recentLessons, lastLesson, avg };
}

function scoreBoardCard(id) {
  const { p, L, subjects, lastLesson, avg } = recentScoresSummary(id);
  const bars = subjects
    .map((s) => {
      const pct = s.level ?? s.test ?? 0;
      const label =
        s.test != null ? `${s.test}% test` : s.level != null ? `~${s.level}%` : "—";
      return `
        <div class="home-score-row">
          <span>${s.emoji} ${s.name}</span>
          <div class="home-score-bar"><i style="width:${Math.max(pct, 4)}%"></i></div>
          <strong>${label}</strong>
        </div>`;
    })
    .join("");

  const lastLine = lastLesson
    ? `Last lesson: ${SUBJECTS[lastLesson.subject]?.name || lastLesson.subject} · ${
        lastLesson.score
      }% · ${lastLesson.date || ""}`
    : "No lessons completed yet";
  const themeArt = illustFor("welcome", id);

  return `
    <article class="card home-score-card ${L.theme}">
      <img class="home-score-art" src="${themeArt.src}" alt="${escapeHtml(themeArt.alt)}" />
      <div class="home-score-head">
        <div class="avatar mini">${L.emoji}</div>
        <div>
          <h3>${escapeHtml(L.fullName)}</h3>
          <p class="muted" style="font-size:0.78rem">${escapeHtml(L.themeLabel || "")}</p>
          <p class="muted">Age ${L.age} · Lv ${p.level} · ${p.xp} XP · 🔥 ${p.streak || 0}</p>
        </div>
        <div class="home-avg">
          <span class="home-avg-num">${avg != null ? avg + "%" : "—"}</span>
          <span class="muted">avg test</span>
        </div>
      </div>
      <div class="home-score-bars">${bars}</div>
      <p class="home-last muted">${escapeHtml(lastLine)}</p>
      <button class="btn btn-primary btn-block mt-1" type="button" data-pick="${id}">
        Open ${escapeHtml(L.name)}'s hub →
      </button>
    </article>`;
}

function renderHome() {
  const myGen = ++homePaintGeneration;
  state.activeLearner = null; // home = no kid selected
  applyLearnerTheme(null);

  const paint = () => {
    // Don't stomp on George's hub if user already opened it
    if (myGen !== homePaintGeneration) return;
    if (currentScreen !== "home") return;
    if (state.activeLearner) return;

    appEl = getAppEl();
    if (!appEl) return;

    appEl.innerHTML = `
    ${topbar(`<button class="btn btn-ghost" data-go="parent" type="button">Parent zone</button>`)}

    <section class="home-hero">
      <div class="home-hero-media">
        <img src="assets/hero-home.jpg" alt="Homeschool study table with books in a garden setting" />
        <div class="home-hero-overlay"></div>
      </div>
      <div class="home-hero-copy">
        <img class="hero-logo" src="assets/logo.svg" width="72" height="72" alt="Rawson Learning Lab" />
        <p class="home-kicker">Rawson Learning Lab</p>
        <h2>Homeschooling with <span class="sparkle">AI tutors</span> — so learning fits around life</h2>
        <p class="lead">Personal paths for <strong>Bella-Rose</strong> (garden · poodles · horses) &amp; <strong>George</strong> (garden · poodles · F1 / go-karts) · English, Maths &amp; Science · GCSE → A*</p>
        <div class="home-hero-cta">
          <button class="btn btn-primary btn-lg" type="button" data-pick="bella">Bella-Rose 🌸</button>
          <button class="btn btn-secondary btn-lg" type="button" data-pick="george">George 🍃</button>
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="home-theme-row">
        <figure class="home-theme-card">
          <img src="${illustFor("pick","bella").src}" alt="${escapeHtml(illustFor("pick","bella").alt)}" />
          <figcaption>🌸 Bella-Rose · garden, poodles &amp; horses</figcaption>
        </figure>
        <figure class="home-theme-card">
          <img src="${illustFor("pick","george").src}" alt="${escapeHtml(illustFor("pick","george").alt)}" />
          <figcaption>🍃 George · garden, poodles &amp; go-karts</figcaption>
        </figure>
      </div>
      <h2 class="section-title">Recent scores</h2>
      <p class="lead">How each student is doing right now (updates automatically).</p>
      <div class="grid-2">
        ${scoreBoardCard("bella")}
        ${scoreBoardCard("george")}
      </div>
    </section>

    <section class="home-section">
      <h2 class="section-title">How it works</h2>
      <div class="home-features">
        <article class="card home-feature">
          <img src="${illustFor("teach").src}" alt="${escapeHtml(illustFor("teach").alt)}" />
          <h3>Placement &amp; practice</h3>
          <p class="muted">Tests find gaps, then lessons teach step by step — not just quizzes.</p>
        </article>
        <article class="card home-feature">
          <img src="${illustFor("mascot").src}" alt="${escapeHtml(illustFor("mascot").alt)}" />
          <h3>AI tutors on demand</h3>
          <p class="muted">“Learn about this subject” opens a full walkthrough when they’re stuck.</p>
        </article>
        <article class="card home-feature">
          <img src="${illustFor("pathway").src}" alt="${escapeHtml(illustFor("pathway").alt)}" />
          <h3>Path to GCSE A*</h3>
          <p class="muted">Six stages from Foundation to A* Mastery — climb the garden path.</p>
        </article>
      </div>
    </section>

    <div class="parent-bar">
      <button class="btn btn-primary" type="button" data-go="parent">Parent zone</button>
      <button class="btn btn-secondary" type="button" id="btnExport">⬇ Export backup</button>
      <button class="btn btn-secondary" type="button" id="btnImport">⬆ Import backup</button>
      <input type="file" id="importFile" accept="application/json" hidden />
    </div>
    <p class="muted center mt-1" style="font-size:0.8rem">
      Progress saves automatically — kids just open their hub and learn.
    </p>
    ${siteFooter()}
  `;
    bindShell();
    appEl.querySelectorAll("[data-pick]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const id = el.getAttribute("data-pick");
        openLearnerHub(id);
      });
    });
    const exp = document.getElementById("btnExport");
    if (exp) {
      exp.onclick = () => {
        const blob = new Blob([exportState(state)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `rawson-learning-backup-${todayKey()}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
      };
    }
    const imp = document.getElementById("btnImport");
    const impFile = document.getElementById("importFile");
    if (imp && impFile) {
      imp.onclick = () => impFile.click();
      impFile.onchange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        try {
          const text = await file.text();
          state = importState(text);
          for (const id of Object.keys(LEARNERS)) {
            state.profiles[id] = normalizeProfile(id, state.profiles[id]);
          }
          saveState(state);
          alert("Progress imported!");
          go("home");
        } catch {
          alert("Could not import that file.");
        }
      };
    }
  };

  // Paint immediately with local scores, then refresh from cloud and repaint if still on home
  paint();
  ensureCloudEnabled();
  refreshFromCloud({ silent: true })
    .then(() => {
      if (myGen === homePaintGeneration && currentScreen === "home" && !state.activeLearner) {
        paint();
      }
    })
    .catch(() => {});
}

// —— DASHBOARD ——
function renderDashboard() {
  if (!state.activeLearner || !LEARNERS[state.activeLearner]) {
    return go("home");
  }
  // Never bounce to home for missing shell — recreate it
  state.profiles[state.activeLearner] = normalizeProfile(
    state.activeLearner,
    state.profiles[state.activeLearner]
  );
  const L = learner();
  const p = profile();
  if (!L || !p) {
    return go("home");
  }
  const xpInLevel = (p.xp || 0) % 100;
  const daily = dailyProgress(p);
  const nextAct = findNextAction(p);

  appEl.innerHTML = `
    ${topbar()}
    <div class="welcome-banner ${L.theme} welcome-with-art">
      <img class="welcome-mascot" src="${illustFor("welcome", L.id).src}" alt="${escapeHtml(
    illustFor("welcome", L.id).alt
  )}" width="120" height="120" />
      <div class="welcome-copy">
        <h2>Hey ${escapeHtml(L.name)}! ${L.emoji}</h2>
        <p class="muted" style="margin:0.35rem 0 0">Your path to GCSE A* · ${escapeHtml(L.themeLabel || "")}</p>
      </div>
      <div class="xp-ring">
        <div class="lvl">Level ${p.level}</div>
        <div class="xp-bar"><div class="xp-fill" style="width:${xpInLevel}%"></div></div>
        <div class="muted" style="font-size:0.75rem;margin-top:0.25rem">${xpInLevel}/100 XP</div>
      </div>
    </div>

    <div class="grid-2 mb-2">
      <div class="card daily-goal-card ${daily.met ? "daily-met" : ""}">
        <h3 style="margin-top:0;font-family:var(--display)">☀️ Today's goal</h3>
        <p class="muted" style="margin:0 0 0.5rem">Aim for ${daily.goal} activities (lessons or exam workouts).</p>
        <div class="skill-meter"><div class="skill-fill" style="width:${daily.pct}%"></div></div>
        <p style="margin:0.5rem 0 0;font-weight:800">${daily.done} / ${daily.goal}${
    daily.met ? " · Goal hit! 🎉" : ""
  }</p>
      </div>
      <div class="card continue-card">
        <h3 style="margin-top:0;font-family:var(--display)">▶️ Continue</h3>
        <p class="muted" style="margin:0 0 0.75rem;min-height:2.4em">${escapeHtml(
          nextAct?.label || "Open a subject to begin"
        )}</p>
        <button class="btn btn-primary btn-lg" type="button" id="btnContinue">
          ${nextAct?.type === "unlock" ? "Unlock next stage →" : "Let's go →"}
        </button>
      </div>
    </div>

    <h2 class="section-title">Your subjects</h2>
    <p class="lead">Placement test → personal path all the way to <strong>GCSE A*</strong> (grades 8–9).</p>
    <div class="grid-3 mb-2">
      ${subjectDashCard("maths")}
      ${subjectDashCard("english")}
      ${subjectDashCard("science")}
    </div>

    <div class="card mb-2 pathway-card-art">
      <div class="pathway-art-wrap">
        <img src="${illustFor("pathway").src}" alt="${escapeHtml(
    illustFor("pathway").alt
  )}" class="pathway-art" />
      </div>
      <h3 style="margin-top:0.85rem;font-family:var(--display)">GCSE pathway map</h3>
      <p class="muted" style="margin-top:0">Finish each stage to unlock the next. Climb the garden path to the A* star!</p>
      ${pathwayMapHtml(p)}
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
        <li><strong style="color:var(--text)">Six stages</strong> — Foundation → Intermediate → Secure → GCSE Core → Higher → A* Mastery</li>
        <li><strong style="color:var(--text)">Unlock the next stage</strong> when you finish every lesson in the current one</li>
        <li><strong style="color:var(--text)">Adaptive lessons</strong> — teach → example → practice; support path if you struggle</li>
        <li><strong style="color:var(--text)">XP &amp; badges</strong> — level up all the way to Triple A*</li>
      </ol>
    </div>
    ${siteFooter()}
  `;
  bindShell();
  appEl.querySelectorAll("[data-subject]").forEach((el) => {
    el.addEventListener("click", () => go("subject", { subject: el.dataset.subject }));
  });
  document.getElementById("btnContinue")?.addEventListener("click", async () => {
    if (!nextAct) return go("home");
    if (nextAct.type === "diagnostic") return go("diagnostic", { subject: nextAct.subject });
    if (nextAct.type === "lesson") {
      return go("lesson", {
        subject: nextAct.subject,
        skillId: nextAct.skillId,
        stage: nextAct.stage,
      });
    }
    if (nextAct.type === "unlock") {
      startCourseStage(p, nextAct.subject, nextAct.stage);
      await save();
      return go("subject", { subject: nextAct.subject });
    }
    if (nextAct.type === "exam") {
      return go("exam", {
        subject: nextAct.subject,
        packStage: nextAct.stage,
        mode: "practice",
      });
    }
    go("dashboard");
  });
}

function subjectDashCard(subject) {
  const S = SUBJECTS[subject];
  const p = profile();
  if (!p) {
    return `<article class="card subject-card"><h3>${S.name}</h3></article>`;
  }
  let overall = null;
  let diag = null;
  let next = null;
  let status = "Placement test ready";
  try {
    overall = subjectOverall(p, subject);
    diag = p.diagnostics && p.diagnostics[subject];
    if (diag && diag.completed) {
      ensureCourseShape(p, subject);
      const active = getActiveStage(p, subject);
      const stageMeta = COURSE_STAGES[active] || COURSE_STAGES[1];
      next = nextLesson(p, subject, active);
      if (next) {
        const meta = getLessonMeta(subject, next, active);
        status = `${stageMeta.emoji} ${stageMeta.name}: ${meta.title || next}`;
      } else if (active < MAX_COURSE_STAGE && isStageComplete(p, subject, active)) {
        const nextMeta = COURSE_STAGES[active + 1];
        status = `${stageMeta.name} done — unlock ${nextMeta.name}!`;
      } else if (isStageComplete(p, subject, active)) {
        status = active >= MAX_COURSE_STAGE
          ? "⭐ A* pathway complete — revise anytime"
          : `${stageMeta.name} complete — revise anytime`;
      } else {
        const pct = pathwayProgressPct(p, subject);
        status = `${stageMeta.name} · pathway ${pct}% to A*`;
      }
    } else {
      status = "Placement test ready";
    }
  } catch (e) {
    console.warn("subjectDashCard", subject, e);
    status = "Open to continue";
  }

  return `
    <article class="card subject-card subject-card-art ${S.colour}" data-subject="${subject}" style="cursor:pointer">
      <div class="subject-art-wrap">
        <img src="${subjectIllust(subject).src}" alt="${escapeHtml(subjectIllust(subject).alt || S.name)}" class="subject-art" loading="lazy" />
      </div>
      <div class="subject-card-body">
        <div class="icon">${S.emoji}</div>
        <h3>${S.name}</h3>
        <p class="muted" style="margin:0;font-size:0.85rem;min-height:2.4em">${status}</p>
        <div class="skill-meter">
          <div class="skill-fill" style="width:${overall ?? 5}%"></div>
        </div>
        <div class="muted" style="font-size:0.78rem;font-weight:800">
          ${overall == null ? "Not assessed yet" : `Skill level ~${overall}%`}
        </div>
      </div>
    </article>`;
}

/** Exam-style mixed workouts (stages 4–6) */
function examPacksCardHtml(subject, p, activeStage) {
  if (typeof EXAM_PACKS === "undefined" || !EXAM_PACKS[subject]) return "";
  const packs = EXAM_PACKS[subject];
  const stages = Object.keys(packs)
    .map(Number)
    .sort((a, b) => a - b);
  if (!stages.length) return "";
  const rows = stages
    .map((st) => {
      const pack = packs[st];
      const open =
        activeStage >= (pack.minStage || st) ||
        canAccessStage(p, subject, pack.minStage || st) ||
        isStageComplete(p, subject, (pack.minStage || st) - 1) ||
        getActiveStage(p, subject) >= (pack.minStage || st);
      const hist = (p.examHistory || []).filter(
        (h) => h.subject === subject && h.packStage === st
      );
      const best = hist.length ? Math.max(...hist.map((h) => h.score)) : null;
      return `<div class="course-item ${open ? "" : "locked"}">
        <div class="num">📝</div>
        <div class="body">
          <h4>${escapeHtml(pack.title)}</h4>
          <p>${escapeHtml(pack.blurb)}${
            best != null ? ` · best ${best}%` : ""
          }</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.35rem">
          <button class="btn ${open ? "btn-primary" : "btn-secondary"}" type="button"
            data-exam-stage="${st}" data-exam-mode="practice" ${open ? "" : "disabled"}>
            ${open ? "Practice" : "🔒"}
          </button>
          <button class="btn btn-secondary" type="button"
            data-exam-stage="${st}" data-exam-mode="timed" ${open ? "" : "disabled"}
            style="font-size:0.78rem">
            ⏱️ Timed
          </button>
        </div>
      </div>`;
    })
    .join("");
  let revUnlocked = false;
  try {
    if (p.courses?.[subject]) {
      const c = migrateCourseEntry(p.courses[subject]);
      for (const st of Object.values(c.stages || {})) {
        if (st?.completed && Object.keys(st.completed).length) {
          revUnlocked = true;
          break;
        }
      }
    }
  } catch (_) {
    /* ignore */
  }

  return `<div class="card mt-2 exam-card-art">
    <div class="exam-art-row">
      <img src="${illustFor("exam").src}" alt="${escapeHtml(illustFor("exam").alt)}" class="exam-art" />
      <div>
        <h3 style="margin-top:0">3. Exam &amp; revision</h3>
        <p class="muted" style="margin:0">Practice with feedback, or timed mocks like a real paper. Unlock packs as you climb GCSE Core → Higher → A*.</p>
      </div>
    </div>
    <div class="course-list mt-1">${rows}</div>
    <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
      <button class="btn btn-secondary" type="button" id="btnRevision" ${
        revUnlocked ? "" : "disabled"
      }>🔁 Mixed revision (10 Qs)</button>
    </div>
  </div>`;
}

/**
 * Exam modes:
 * - practice: check answers as you go (default)
 * - timed: countdown, mark only at the end (exam conditions)
 * - revision: mixed Qs from completed lessons
 */
function renderExam({ subject, packStage, mode, questions, title, minutes }) {
  if (!state.activeLearner) return go("home");
  mode = mode || "practice";
  const isTimed = mode === "timed";
  const isRevision = mode === "revision";

  let pack = null;
  let qs = questions || null;
  let packTitle = title || "Workout";
  let minutesLeft = minutes || 0;

  if (!isRevision) {
    if (typeof EXAM_PACKS === "undefined" || !EXAM_PACKS[subject]?.[packStage]) {
      return go("subject", { subject });
    }
    pack = EXAM_PACKS[subject][packStage];
    qs = pack.questions || [];
    packTitle = pack.title;
    if (isTimed) minutesLeft = minutes || pack.timedMinutes || Math.max(8, Math.ceil(qs.length * 1.2));
  } else {
    qs = questions || buildRevisionQuestions(profile(), subject, 10) || [];
    packTitle = title || `${SUBJECTS[subject].name} mixed revision`;
    packStage = packStage || 0;
  }

  if (!qs.length) {
    alert("No questions ready yet — complete some lessons first.");
    return go("subject", { subject });
  }

  const answers = {};
  let index = 0;
  let revealed = false;
  let answerVal = null;
  let timerId = null;
  let secondsLeft = isTimed ? minutesLeft * 60 : 0;
  let timedOut = false;

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, "0")}`;
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function startTimer() {
    if (!isTimed) return;
    stopTimer();
    timerId = setInterval(() => {
      secondsLeft--;
      const el = document.getElementById("examTimer");
      if (el) {
        el.textContent = formatTime(Math.max(0, secondsLeft));
        if (secondsLeft <= 60) el.classList.add("timer-urgent");
      }
      if (secondsLeft <= 0) {
        stopTimer();
        timedOut = true;
        finishExam();
      }
    }, 1000);
  }

  function paint() {
    const q = qs[index];
    const pct = Math.round((index / qs.length) * 100);
    const modeLabel = isTimed
      ? "⏱️ Timed mock"
      : isRevision
        ? "🔁 Revision"
        : "📝 Practice";
    appEl.innerHTML = `
      ${topbar()}
      <div class="quiz-header">
        <div>
          <div class="q-meta">${modeLabel} · ${escapeHtml(packTitle)} · Q${
      index + 1
    } of ${qs.length}</div>
          <strong>${SUBJECTS[subject].emoji} ${
      isTimed ? "Exam conditions — answers marked at the end" : "Exam workout"
    }</strong>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem">
          ${
            isTimed
              ? `<div class="exam-timer" id="examTimer">${formatTime(secondsLeft)}</div>`
              : ""
          }
          <div class="progress-track" style="max-width:160px"><span style="width:${pct}%"></span></div>
        </div>
      </div>
      <div class="card question-card">
        <h3 class="teach-heading">${escapeHtml(q.q)}</h3>
        <div id="qBody"></div>
        <div id="feedback"></div>
        <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
          ${
            isTimed
              ? `<button class="btn btn-primary" type="button" id="btnNext">Next →</button>`
              : `<button class="btn btn-primary" type="button" id="btnCheck">Check</button>
                 <button class="btn btn-ok" type="button" id="btnNext" style="display:none">Continue →</button>`
          }
        </div>
      </div>
      <button class="btn btn-ghost mt-1" type="button" id="btnExitExam">Exit</button>
    `;
    bindShell();
    document.getElementById("btnExitExam").onclick = () => {
      stopTimer();
      go("subject", { subject });
    };
    answerVal = answers[index]?.answer ?? null;
    revealed = false;
    const body = document.getElementById("qBody");
    if (q.type === "multi") {
      body.innerHTML = `<div class="options">${q.options
        .map(
          (opt, i) =>
            `<button type="button" class="option ${
              answerVal === i ? "selected" : ""
            }" data-i="${i}">${escapeHtml(opt)}</button>`
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
      body.innerHTML = `<input class="input-answer" id="typedAns" placeholder="Type your answer…" autocomplete="off" value="${
        answerVal != null ? escapeHtml(String(answerVal)) : ""
      }" />`;
      const input = document.getElementById("typedAns");
      input.focus();
      input.oninput = () => {
        answerVal = input.value;
      };
      input.onkeydown = (e) => {
        if (e.key === "Enter") {
          if (isTimed) document.getElementById("btnNext")?.click();
          else document.getElementById("btnCheck")?.click();
        }
      };
    }

    if (isTimed) {
      document.getElementById("btnNext").onclick = async () => {
        if (answerVal === null || answerVal === "") {
          if (!confirm("No answer — leave blank and continue?")) return;
        }
        const ok = checkAnswer(q, answerVal);
        answers[index] = { ok, answer: answerVal };
        if (index + 1 >= qs.length) await finishExam();
        else {
          index++;
          paint();
        }
      };
    } else {
      document.getElementById("btnCheck").onclick = () => {
        if (revealed) return;
        if (answerVal === null || answerVal === "") {
          alert("Pick or type an answer first!");
          return;
        }
        revealed = true;
        const ok = checkAnswer(q, answerVal);
        answers[index] = { ok, answer: answerVal };
        const fb = document.getElementById("feedback");
        fb.className = `feedback ${ok ? "good" : "bad"}`;
        fb.innerHTML = ok
          ? `✓ ${escapeHtml(q.explain || "Correct!")}`
          : `Not quite. ${escapeHtml(q.explain || "")}`;
        if (q.type === "multi") {
          body.querySelectorAll(".option").forEach((btn) => {
            const i = Number(btn.dataset.i);
            if (i === q.answer) btn.classList.add("correct");
            if (i === answerVal && !ok) btn.classList.add("wrong");
            btn.disabled = true;
          });
        }
        document.getElementById("btnCheck").disabled = true;
        document.getElementById("btnNext").style.display = "inline-flex";
        document.getElementById("btnNext").onclick = async () => {
          if (index + 1 >= qs.length) await finishExam();
          else {
            index++;
            paint();
          }
        };
        autosaveSoon();
      };
    }
  }

  async function finishExam() {
    stopTimer();
    // Score any unanswered as wrong
    for (let i = 0; i < qs.length; i++) {
      if (!answers[i]) {
        answers[i] = { ok: false, answer: null };
      } else if (answers[i].ok == null) {
        answers[i].ok = checkAnswer(qs[i], answers[i].answer);
      }
    }
    const correct = Object.values(answers).filter((a) => a.ok).length;
    const scorePct = Math.round((correct / qs.length) * 100);
    const p = profile();
    if (!p.examHistory) p.examHistory = [];
    p.examHistory.push({
      subject,
      packStage,
      score: scorePct,
      correct,
      total: qs.length,
      date: todayKey(),
      mode: isTimed ? "timed" : isRevision ? "revision" : "practice",
      timedOut: !!timedOut,
    });
    updateStreak(p);
    recordDailyActivity(p, "exam");
    const xpBonus = isTimed ? 20 : isRevision ? 10 : 0;
    addXp(p, 40 + Math.round(scorePct / 5) + (packStage || 0) * 5 + xpBonus);
    if (scorePct >= 80) unlockBadge(p, "exam_star");
    if (scorePct >= 90 && packStage >= 6) unlockBadge(p, "exam_astar");
    if (isTimed) unlockBadge(p, "timed_mock");
    if (isRevision) unlockBadge(p, "revision_king");
    try {
      await save({ quiet: false });
    } catch (e) {
      console.error(e);
    }
    go("examResult", {
      subject,
      packStage,
      scorePct,
      correct,
      total: qs.length,
      mode: isTimed ? "timed" : isRevision ? "revision" : "practice",
      timedOut,
      title: packTitle,
    });
  }

  paint();
  startTimer();
}

function renderExamResult({
  subject,
  packStage,
  scorePct,
  correct,
  total,
  mode,
  timedOut,
  title,
}) {
  const pack =
    typeof EXAM_PACKS !== "undefined" ? EXAM_PACKS[subject]?.[packStage] : null;
  const modeLabel =
    mode === "timed" ? "Timed mock" : mode === "revision" ? "Revision" : "Practice";
  appEl.innerHTML = `
    ${topbar()}
    <div class="card score-hero celebrate mb-2 score-hero-art">
      <img class="score-illust" src="${illustFor("exam").src}" alt="${escapeHtml(
    illustFor("exam").alt
  )}" />
      <div class="q-meta">📝 ${escapeHtml(modeLabel)} complete${
    timedOut ? " · time up" : ""
  }</div>
      <h2 style="font-family:var(--display);margin:0.5rem 0">${escapeHtml(
        title || pack?.title || "Workout"
      )}</h2>
      <div class="score-big">${scorePct}%</div>
      <p>${correct}/${total} correct · +XP earned!</p>
      <p class="muted">${escapeHtml(randomEncouragement())}</p>
    </div>
    <div style="display:flex;gap:0.6rem;flex-wrap:wrap">
      <button class="btn btn-primary" type="button" id="again">Try again</button>
      ${
        mode !== "timed" && pack
          ? `<button class="btn btn-secondary" type="button" id="timed">⏱️ Timed mock</button>`
          : ""
      }
      <button class="btn btn-secondary" type="button" data-go-subject="${subject}">Back to ${
    SUBJECTS[subject].name
  }</button>
    </div>
  `;
  bindShell();
  document.getElementById("again").onclick = () =>
    go("exam", {
      subject,
      packStage,
      mode: mode === "revision" ? "revision" : mode === "timed" ? "timed" : "practice",
      questions: mode === "revision" ? buildRevisionQuestions(profile(), subject, 10) : null,
      title: mode === "revision" ? `${SUBJECTS[subject].name} mixed revision` : undefined,
    });
  document.getElementById("timed")?.addEventListener("click", () =>
    go("exam", { subject, packStage, mode: "timed" })
  );
  appEl.querySelector("[data-go-subject]")?.addEventListener("click", (e) =>
    go("subject", { subject: e.currentTarget.dataset.goSubject })
  );
}

/** Visual map of the 6-stage GCSE → A* pathway */
function pathwayMapHtml(p) {
  const stages = [];
  for (let s = 1; s <= MAX_COURSE_STAGE; s++) stages.push(COURSE_STAGES[s]);
  const subjectRows = Object.keys(SUBJECTS)
    .map((sub) => {
      const pct = pathwayProgressPct(p, sub);
      const cells = stages
        .map((meta) => {
          const done = isStageComplete(p, sub, meta.id);
          const unlocked =
            meta.id === 1
              ? !!(p.diagnostics?.[sub]?.completed)
              : canAccessStage(p, sub, meta.id);
          const active =
            p.courses?.[sub] && getActiveStage(p, sub) === meta.id;
          let cls = "path-cell";
          if (done) cls += " path-done";
          else if (active) cls += " path-active";
          else if (unlocked) cls += " path-open";
          else cls += " path-locked";
          return `<span class="${cls}" title="${escapeHtml(
            SUBJECTS[sub].name + " · " + meta.name + " · " + meta.gradeBand
          )}">${done ? "✓" : meta.short}</span>`;
        })
        .join("");
      return `<div class="path-row">
        <span class="path-sub">${SUBJECTS[sub].emoji} ${SUBJECTS[sub].name}</span>
        <div class="path-cells">${cells}</div>
        <span class="path-pct muted">${pct}%</span>
      </div>`;
    })
    .join("");
  const legend = stages
    .map(
      (m) =>
        `<span class="muted" style="font-size:0.75rem;margin-right:0.65rem">${m.emoji} ${escapeHtml(
          m.name
        )}</span>`
    )
    .join("");
  return `<div class="pathway-map">${subjectRows}</div>
    <div class="mt-1" style="line-height:1.8">${legend}</div>
    <p class="muted" style="font-size:0.78rem;margin:0.5rem 0 0">✓ done · highlighted = current · locked stages open when you finish the one before</p>`;
}

// —— SUBJECT HUB ——
function renderSubject({ subject }) {
  if (!state.activeLearner) return go("home");
  const S = SUBJECTS[subject];
  const p = profile();
  const diag = p.diagnostics[subject];
  if (diag?.completed && !p.courses[subject]) buildCourse(p, subject, 1);
  if (diag?.completed) ensureCourseShape(p, subject);

  const courseRoot = p.courses[subject] ? migrateCourseEntry(p.courses[subject]) : null;
  if (courseRoot) p.courses[subject] = courseRoot;
  const activeStage = courseRoot?.activeStage || 1;
  const stageMeta = COURSE_STAGES[activeStage] || COURSE_STAGES[1];
  const stageData = courseRoot?.stages?.[activeStage] || null;
  const stageComplete = stageData && isStageComplete(p, subject, activeStage);
  const nextStageNum =
    stageComplete && activeStage < MAX_COURSE_STAGE ? activeStage + 1 : null;
  const canStartNext =
    nextStageNum &&
    canAccessStage(p, subject, nextStageNum) &&
    activeStage < nextStageNum;
  const pathPct = pathwayProgressPct(p, subject);
  const nextId = stageData ? nextLesson(p, subject, activeStage) : null;

  // Full pathway stage tabs once diagnostic done
  let stageTabsHtml = "";
  if (diag?.completed) {
    stageTabsHtml = `<div class="stage-tabs mt-1" style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.75rem">
      ${Array.from({ length: MAX_COURSE_STAGE }, (_, i) => i + 1)
        .map((s) => {
          const meta = COURSE_STAGES[s];
          const unlocked = s === 1 ? true : canAccessStage(p, subject, s);
          const isActive = activeStage === s;
          const done = isStageComplete(p, subject, s);
          return `<button type="button" class="btn ${
            isActive ? "btn-primary" : "btn-secondary"
          }" style="font-size:0.8rem;padding:0.4rem 0.65rem" data-switch-stage="${s}" ${
            unlocked ? "" : "disabled"
          } title="${escapeHtml(
            unlocked ? meta.gradeBand + " — " + meta.blurb : "Finish the previous stage to unlock"
          )}">${meta.emoji} ${escapeHtml(meta.short)}${done ? " ✓" : ""}${
            !unlocked ? " 🔒" : ""
          }</button>`;
        })
        .join("")}
    </div>
    <p class="muted" style="font-size:0.8rem;margin:0 0 0.75rem">${escapeHtml(
      stageMeta.name
    )} · ${escapeHtml(stageMeta.gradeBand)} · pathway to A* <strong style="color:var(--gold)">${pathPct}%</strong></p>`;
  }

  let unlockBanner = "";
  if (canStartNext && nextStageNum) {
    const nextMeta = COURSE_STAGES[nextStageNum];
    unlockBanner = `
      <div class="card mb-2 celebrate unlock-banner-art" style="border-color:rgba(61,220,151,0.55);background:rgba(61,220,151,0.08)">
        <img class="banner-illust" src="${illustFor("unlock").src}" alt="${escapeHtml(
      illustFor("unlock").alt
    )}" />
        <div>
        <h3 style="margin-top:0;font-family:var(--display)">${stageMeta.emoji} ${escapeHtml(
      stageMeta.name
    )} complete!</h3>
        <p style="margin:0 0 0.75rem">Fantastic — ${escapeHtml(learner().name)} finished
        <strong>${escapeHtml(stageMeta.name)} ${S.name}</strong>.
        Next: <strong>${escapeHtml(nextMeta.name)}</strong> (${escapeHtml(nextMeta.gradeBand)}).</p>
        <button class="btn btn-primary btn-lg" type="button" id="startNextStage" data-next-stage="${nextStageNum}">
          ${nextMeta.emoji} Start ${escapeHtml(nextMeta.name)} ${S.name} →
        </button>
        </div>
      </div>`;
  } else if (stageComplete && activeStage >= MAX_COURSE_STAGE) {
    unlockBanner = `
      <div class="card mb-2 unlock-banner-art" style="border-color:rgba(255,200,80,0.55)">
        <img class="banner-illust" src="${illustFor("celebrate").src}" alt="${escapeHtml(
      illustFor("celebrate").alt
    )}" />
        <div>
        <h3 style="margin-top:0;font-family:var(--display)">⭐ A* Mastery complete in ${S.name}!</h3>
        <p class="muted" style="margin:0">You've climbed the full pathway for this subject. Revise any stage below to stay sharp for exams.</p>
        </div>
      </div>`;
  }

  appEl.innerHTML = `
    ${topbar()}
    <button class="btn btn-ghost mb-1" type="button" data-go="dashboard">← Back to hub</button>
    <div class="subject-hero-art card mb-2">
      <img src="${subjectIllust(subject).src}" alt="${escapeHtml(subjectIllust(subject).alt || S.name)}" />
      <div class="subject-hero-copy">
        <h2 class="section-title" style="margin:0">${S.emoji} ${S.name}</h2>
        <p class="lead" style="margin:0.35rem 0 0">Full GCSE → A* pathway (${
          learner().yearGroup
        }) · ${stageMeta.emoji} <strong>${escapeHtml(stageMeta.name)}</strong></p>
      </div>
    </div>

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

    ${unlockBanner}

    <div class="card">
      <h3 style="margin-top:0">2. Your personalised course</h3>
      ${stageTabsHtml}
      <p class="muted">${
        stageData
          ? escapeHtml(stageData.focusMessage || stageMeta.blurb)
          : "Complete the placement test and we'll build a course aimed at your gaps."
      }</p>
      ${
        stageData
          ? `<div class="course-list mt-1">
              ${stageData.path
                .map((skillId, i) => {
                  const lesson = getLessonMeta(subject, skillId, activeStage);
                  const done = stageData.completed[skillId];
                  const prevDone =
                    i === 0 || stageData.completed[stageData.path[i - 1]];
                  const isNext = skillId === nextId;
                  const canDo =
                    diag?.completed && (done || isNext || i === 0 || prevDone);
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
                      }" type="button" data-lesson="${skillId}" data-stage="${activeStage}" ${
                    canDo ? "" : "disabled"
                  }>
                        ${done ? "Revise again" : "Learn & practise"}
                      </button>
                    </div>`;
                })
                .join("")}
            </div>
            <button class="btn btn-ghost mt-2" type="button" id="regenCourse">Rebuild ${
              stageMeta.name
            } path from latest test</button>`
          : ""
      }
    </div>

    ${examPacksCardHtml(subject, p, activeStage)}
  `;
  bindShell();
  const start = document.getElementById("startDiag");
  const retake = document.getElementById("retakeDiag");
  if (start) start.onclick = () => go("diagnostic", { subject });
  if (retake) retake.onclick = () => go("diagnostic", { subject });
  document.getElementById("regenCourse")?.addEventListener("click", async () => {
    buildCourse(p, subject, activeStage);
    await save();
    go("subject", { subject });
  });
  document.getElementById("startNextStage")?.addEventListener("click", async (e) => {
    const n = Number(e.currentTarget.dataset.nextStage) || activeStage + 1;
    startCourseStage(p, subject, n);
    await save();
    go("subject", { subject });
  });
  appEl.querySelectorAll("[data-exam-stage]").forEach((btn) => {
    btn.addEventListener("click", () =>
      go("exam", {
        subject,
        packStage: Number(btn.dataset.examStage),
        mode: btn.dataset.examMode || "practice",
      })
    );
  });
  document.getElementById("btnRevision")?.addEventListener("click", () => {
    const qs = buildRevisionQuestions(profile(), subject, 10);
    if (!qs?.length) {
      alert("Complete a lesson first so we have questions to revise.");
      return;
    }
    go("exam", {
      subject,
      packStage: 0,
      mode: "revision",
      questions: qs,
      title: `${SUBJECTS[subject].name} mixed revision`,
    });
  });
  appEl.querySelectorAll("[data-switch-stage]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const s = Number(btn.dataset.switchStage);
      if (s === 1) {
        if (!diag?.completed) return;
        ensureCourseShape(p, subject);
        p.courses[subject].activeStage = 1;
        if (!p.courses[subject].stages[1]?.path?.length) {
          buildCourse(p, subject, 1);
        }
      } else {
        if (!canAccessStage(p, subject, s)) return;
        startCourseStage(p, subject, s);
      }
      await save();
      go("subject", { subject });
    });
  });
  appEl.querySelectorAll("[data-lesson]").forEach((btn) => {
    btn.addEventListener("click", () =>
      go("lesson", {
        subject,
        skillId: btn.dataset.lesson,
        stage: Number(btn.dataset.stage) || activeStage,
      })
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
      // Auto-save progress mid-test (kids never click save)
      try {
        if (!profile().diagnostics) profile().diagnostics = {};
        profile().diagnostics[subject] = {
          ...(profile().diagnostics[subject] || {}),
          inProgress: true,
          answers: { ...answers },
          date: todayKey(),
        };
        autosaveSoon();
      } catch (_) {
        /* ignore */
      }
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
    try {
      await save({ quiet: false }); // toast: Progress saved ✓
    } catch (e) {
      console.error(e);
      try {
        await persistLearner(state, state.activeLearner);
        showSavedToast("Progress saved ✓");
      } catch (_) {
        /* ignore */
      }
    }
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
      <p class="muted" style="color:var(--ok);font-weight:800">Automatically saved ✓</p>
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
function renderLesson({ subject, skillId, stage }) {
  if (!state.activeLearner) return go("home");
  const p = profile();
  const stageNum =
    Number(stage) ||
    (p.courses?.[subject] ? getActiveStage(p, subject) : 1) ||
    1;
  const stageMeta = COURSE_STAGES[stageNum] || COURSE_STAGES[1];
  const mod = getTeachModule(subject, skillId, stageNum, state.activeLearner);
  if (!mod) {
    alert("Lesson module missing — try another skill.");
    return go("subject", { subject });
  }

  const session = createTutorSession(
    subject,
    skillId,
    state.activeLearner,
    stageNum
  );
  let answerVal = null;
  let revealed = false;

  function paint() {
    const prog = sessionProgress(session);
    const skillName = SKILLS[subject][skillId].name;
    let bodyHtml = "";

    if (session.phase === "teach") {
      bodyHtml = `
        <div class="phase-pill">📖 Teach · ${escapeHtml(stageMeta.name)}</div>
        <img class="lesson-illust" src="${illustFor("teach").src}" alt="${escapeHtml(
        illustFor("teach").alt
      )}" />
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
          <div class="q-meta">${SUBJECTS[subject].emoji} ${escapeHtml(
      stageMeta.emoji + " " + stageMeta.name
    )} · ${escapeHtml(skillName)}</div>
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
      autosaveSoon(); // auto mid-lesson

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
    recordLesson(profile(), subject, skillId, scorePct, stageNum);
    // Store adaptive stats
    if (!profile().tutorStats) profile().tutorStats = {};
    profile().tutorStats[`${subject}:${skillId}:s${stageNum}`] = {
      wrong: session.totalWrong,
      struggle: session.struggleUsed,
      video: session.videoShown,
      at: todayKey(),
      stage: stageNum,
    };
    try {
      await save({ quiet: false });
    } catch (e) {
      console.error(e);
      try {
        await persistLearner(state, state.activeLearner);
        showSavedToast("Progress saved ✓");
      } catch (_) {
        /* ignore */
      }
    }
    go("lessonResult", {
      subject,
      skillId,
      scorePct,
      correctCount: session.practiceCorrect,
      total: session.practiceTotal,
      struggle: session.struggleUsed,
      stage: stageNum,
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
  stage,
}) {
  const stageNum = Number(stage) || 1;
  const stageMeta = COURSE_STAGES[stageNum] || COURSE_STAGES[1];
  const mod = getTeachModule(subject, skillId, stageNum, state.activeLearner);
  const p = profile();
  const stageJustDone = isStageComplete(p, subject, stageNum);
  const nextStage = stageJustDone && stageNum < MAX_COURSE_STAGE ? stageNum + 1 : null;
  const canGoNext = nextStage && canAccessStage(p, subject, nextStage);
  const nextMeta = nextStage ? COURSE_STAGES[nextStage] : null;
  const pathPct = pathwayProgressPct(p, subject);

  appEl.innerHTML = `
    ${topbar()}
    <div class="card score-hero celebrate mb-2 score-hero-art">
      <img class="score-illust" src="${
        canGoNext || (stageJustDone && stageNum >= MAX_COURSE_STAGE)
          ? illustFor("celebrate").src
          : illustFor("welcome").src
      }" alt="" />
      <div class="q-meta">${escapeHtml(stageMeta.emoji + " " + stageMeta.name)} lesson complete</div>
      <h2 style="font-family:var(--display);margin:0.5rem 0">${escapeHtml(
        mod?.title || skillId
      )}</h2>
      <div class="score-big">${scorePct}%</div>
      <p>${correctCount}/${total || "?"} correct on practice · +XP earned!</p>
      <p class="muted" style="font-size:0.85rem">${SUBJECTS[subject].name} pathway to A*: <strong style="color:var(--gold)">${pathPct}%</strong></p>
      ${
        struggle
          ? `<p class="muted">You used the support path — that's smart learning, not failure.</p>`
          : ""
      }
      <p class="muted">${escapeHtml(randomEncouragement())}</p>
    </div>
    ${
      canGoNext && nextMeta
        ? `<div class="card mb-2 unlock-banner-art" style="border-color:rgba(61,220,151,0.5)">
        <img class="banner-illust" src="${illustFor("unlock").src}" alt="${escapeHtml(
            illustFor("unlock").alt
          )}" />
        <div>
        <h3 style="margin-top:0;font-family:var(--display)">${stageMeta.emoji} ${escapeHtml(
            stageMeta.name
          )} complete!</h3>
        <p class="muted">Every lesson in this stage is done for ${SUBJECTS[subject].name}.
        Unlock <strong>${escapeHtml(nextMeta.name)}</strong> (${escapeHtml(nextMeta.gradeBand)}).</p>
        <button class="btn btn-primary btn-lg" type="button" id="unlockNext">${nextMeta.emoji} Start ${escapeHtml(
            nextMeta.name
          )} →</button>
        </div>
      </div>`
        : stageJustDone && stageNum >= MAX_COURSE_STAGE
          ? `<div class="card mb-2 unlock-banner-art" style="border-color:rgba(255,200,80,0.5)">
        <img class="banner-illust" src="${illustFor("celebrate").src}" alt="${escapeHtml(
              illustFor("celebrate").alt
            )}" />
        <div>
        <h3 style="margin-top:0;font-family:var(--display)">⭐ A* Mastery complete!</h3>
        <p class="muted">Full pathway finished for ${SUBJECTS[subject].name}. Keep revising to stay exam-sharp.</p>
        </div>
      </div>`
          : ""
    }
    <div style="display:flex;gap:0.6rem;flex-wrap:wrap">
      <button class="btn btn-primary" type="button" id="more">Continue course →</button>
      <button class="btn btn-secondary" type="button" data-go="dashboard">Back to hub</button>
    </div>
  `;
  bindShell();
  document.getElementById("more").onclick = () => go("subject", { subject });
  document.getElementById("unlockNext")?.addEventListener("click", async () => {
    startCourseStage(p, subject, nextStage);
    await save();
    go("subject", { subject });
  });
}

// —— PARENT ZONE ——
function renderParent() {
  const synced = isSyncEnabled();
  const cfg = getSyncConfig();

  appEl.innerHTML = `
    ${topbar(`<button class="btn btn-ghost" data-go="home" type="button">Home</button>`)}
    <h2 class="section-title">Parent zone</h2>
    <p class="lead">Live progress for Bella-Rose &amp; George · watch from your iMac while they learn on theirs</p>

    <div class="card mb-2" style="border-color:rgba(61,220,151,0.45)">
      <h3 style="margin-top:0">☁️ Automatic saving (kids do nothing)</h3>
      <p class="muted" style="margin:0 0 0.5rem">
        Progress is saved <strong style="color:var(--text)">automatically</strong> after every answer, test and lesson —
        on this Mac and to the family cloud. No “save” or “restore” for the children.
      </p>
      <p class="muted" id="syncStatusLine" style="margin:0 0 0.5rem;font-size:0.85rem">${escapeHtml(
        syncStatus || "Background sync every few seconds…"
      )}</p>
      <p class="muted" id="metaLine" style="margin:0 0 0.75rem;font-size:0.85rem"></p>
      <p class="muted" style="font-size:0.8rem;margin:0">
        Cloud: Firebase <em>Rawson Labs</em> · family <code style="color:var(--gold)">RAWSON-HOME</code>
        ${cfg ? "" : " · connecting…"}
      </p>
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
        Full pathway: Foundation → Intermediate → Secure → GCSE Core → Higher → A* Mastery
        in Maths, English Language and Science (KS2 George · KS3 Bella-Rose entry points).
        Complements school / home education — not a substitute for past papers under timed exam conditions,
        but designed to take them from current level to A* potential (grades 8–9).
      </p>
    </div>
    ${siteFooter()}
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

  // Always live-poll for parent — fully automatic
  (async () => {
    await refreshFromCloud({ silent: true });
    const kids = document.getElementById("parentKids");
    const feed = document.getElementById("activityFeed");
    const status = document.getElementById("syncStatusLine");
    if (kids) kids.innerHTML = parentKid("bella") + parentKid("george");
    if (feed) feed.innerHTML = activityFeedHtml();
    if (status) status.textContent = syncStatus || "Auto-syncing…";
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
    if (status) status.textContent = syncStatus || "Auto-syncing…";
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
          getLessonMeta(h.subject, h.skillId, h.stage || 1).title || h.skillId
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
      let lessonsDone = 0;
      let totalLessons = "—";
      let stageLabel = "—";
      try {
        if (p.courses?.[sub]) {
          const c = migrateCourseEntry(p.courses[sub]);
          const active = c.activeStage || 1;
          stageLabel = (COURSE_STAGES[active] || COURSE_STAGES[1]).name;
          const st = c.stages?.[active];
          if (st) {
            lessonsDone = Object.keys(st.completed || {}).length;
            totalLessons = Array.isArray(st.path) ? st.path.length : "—";
          }
          // Show foundation complete hint
          const pathPct = pathwayProgressPct(p, sub);
          stageLabel = `${stageLabel} · ${pathPct}%→A*`;
        }
      } catch (_) {
        /* ignore */
      }
      return `<tr>
        <td>${SUBJECTS[sub].emoji} ${SUBJECTS[sub].name}</td>
        <td>${d?.completed ? d.score + "%" : "—"}</td>
        <td>${escapeHtml(stageLabel)}</td>
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
      · Today ${dailyProgress(p).done}/${dailyProgress(p).goal} goal
      · Updated ${formatTime(p.updatedAt)}</p>
      <div class="table-wrap">
        <table class="progress-table">
          <thead><tr><th>Subject</th><th>Test</th><th>Course</th><th>Lessons</th><th>Level</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

// —— FAMILY SYNC (auto — parents only see status) ——
function renderSyncSetup() {
  ensureCloudEnabled();
  appEl.innerHTML = `
    ${topbar(`<button class="btn btn-ghost" data-go="parent" type="button">← Parent zone</button>`)}
    <h2 class="section-title">☁️ Automatic cloud save</h2>
    <p class="lead">Kids never need this screen. Saving is automatic after every go.</p>
    <div class="card mb-2">
      <p style="margin:0;font-weight:800;color:var(--ok)">✓ Connected to Rawson Labs family cloud</p>
      <p class="muted mt-1">Family: <strong style="color:var(--gold)">RAWSON-HOME</strong> · Firebase europe-west1</p>
      <p class="muted" id="syncSetupMsg" style="font-size:0.9rem">Running auto-sync…</p>
      <button class="btn btn-secondary mt-1" type="button" data-go="parent">Back to Parent zone</button>
    </div>
    ${siteFooter()}
  `;
  bindShell();
  refreshFromCloud({ silent: true }).then(() => {
    const msg = document.getElementById("syncSetupMsg");
    if (msg) msg.textContent = syncStatus || "Auto-sync OK";
  });
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
    ${siteFooter()}
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
  // Handle ?reset=1 from the error screen (works even if JS partially broken)
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") === "1") {
      try {
        localStorage.removeItem("rawson-learning-lab-v1");
      } catch (_) {
        /* ignore */
      }
      // Keep cloud config so auto-sync still works
      window.history.replaceState({}, "", "?v=18");
    }
  } catch (_) {
    /* ignore */
  }

  try {
    // Re-load state after possible reset
    state = loadState();
    // Normalize all profiles
    for (const id of Object.keys(LEARNERS)) {
      state.profiles[id] = normalizeProfile(id, state.profiles[id]);
    }
    appEl = getAppEl();

    try {
      ensureCloudEnabled();
      startAutoSync();
      await refreshFromCloud({ silent: true });
      // Normalize again after cloud merge
      for (const id of Object.keys(LEARNERS)) {
        state.profiles[id] = normalizeProfile(id, state.profiles[id]);
      }
    } catch (syncErr) {
      console.warn("Cloud sync on boot failed (app still opens)", syncErr);
    }

    // Prefer home if learner data odd — safer than crashing dashboard
    const canDash =
      state.activeLearner &&
      LEARNERS[state.activeLearner] &&
      state.profiles[state.activeLearner];
    go(canDash ? "dashboard" : "home");
  } catch (err) {
    console.error("Boot failed", err);
    showFatalError(err);
  }
})();
