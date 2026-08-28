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
let learningTimeTimer = null;
let learningTimeLastTick = 0;
let learningTimeLearnerId = null;
let learningTimeSessionSec = 0; // live session display only
let autoSyncTimer = null;
let saveToastTimer = null;
let debouncedSaveTimer = null;
/** Cancels stale home-page repaints that stole focus from George's hub */
let homePaintGeneration = 0;
let currentScreen = "home";
/** Live in-progress quiz — remounting the same lesson must NOT restart Q1 */
let liveLesson = null;
let liveDiag = null;
let navLock = false;

function stopParentPoll() {
  if (parentPollTimer) {
    clearInterval(parentPollTimer);
    parentPollTimer = null;
  }
}

/** Flush active learning seconds into the kid's profile (and cloud). */
function flushLearningTimeTick(forceEnd) {
  if (!learningTimeLearnerId) return;
  const id = learningTimeLearnerId;
  const p = state.profiles[id];
  if (!p) return;
  const now = Date.now();
  if (learningTimeLastTick && !document.hidden) {
    const delta = Math.floor((now - learningTimeLastTick) / 1000);
    if (delta > 0 && delta < 120) {
      addLearningSeconds(p, delta, now);
      learningTimeSessionSec += delta;
    }
  }
  learningTimeLastTick = document.hidden ? 0 : now;
  if (forceEnd) {
    endLearningSession(p);
    learningTimeLearnerId = null;
    learningTimeSessionSec = 0;
    learningTimeLastTick = 0;
  }
  try {
    saveState(state);
  } catch (_) {
    /* ignore */
  }
  updateLiveTimePill();
}

function stopLearningTimeTracker(flush) {
  if (learningTimeTimer) {
    clearInterval(learningTimeTimer);
    learningTimeTimer = null;
  }
  if (flush && learningTimeLearnerId) flushLearningTimeTick(true);
  else if (learningTimeLearnerId) {
    // pause without ending session row
    flushLearningTimeTick(false);
    learningTimeLastTick = 0;
  }
}

function startLearningTimeTracker(learnerId) {
  if (!learnerId || !LEARNERS[learnerId]) return;
  if (learningTimeLearnerId && learningTimeLearnerId !== learnerId) {
    flushLearningTimeTick(true);
  }
  const p = state.profiles[learnerId];
  if (!p) return;
  if (learningTimeLearnerId !== learnerId) {
    beginLearningSession(p);
    learningTimeSessionSec = 0;
  }
  learningTimeLearnerId = learnerId;
  learningTimeLastTick = Date.now();
  if (learningTimeTimer) clearInterval(learningTimeTimer);
  learningTimeTimer = setInterval(() => {
    if (!learningTimeLearnerId) return;
    if (document.hidden) {
      learningTimeLastTick = 0;
      return;
    }
    if (!learningTimeLastTick) learningTimeLastTick = Date.now();
    flushLearningTimeTick(false);
    // Quiet cloud push every ~minute of active time
    if (learningTimeSessionSec > 0 && learningTimeSessionSec % 60 < 16) {
      save({ quiet: true, learnerId: learningTimeLearnerId }).catch(() => {});
    }
  }, 15000);
  updateLiveTimePill();
}

function updateLiveTimePill() {
  const el = document.getElementById("liveTimePill");
  if (!el || !state.activeLearner) return;
  const p = state.profiles[state.activeLearner];
  if (!p) return;
  const sum = learningTimeSummary(p);
  const sessionBit =
    learningTimeLearnerId === state.activeLearner && learningTimeSessionSec > 0
      ? ` · this visit ${formatDuration(learningTimeSessionSec)}`
      : "";
  el.textContent = `⏱ Today ${sum.todayLabel} · total ${sum.totalLabel}${sessionBit}`;
}

function learningTimeBoardHtml(id) {
  const p = normalizeProfile(id, state.profiles[id]);
  const sum = learningTimeSummary(p);
  const days =
    sum.recentDays.length > 0
      ? sum.recentDays
          .map((d) => {
            const times = d.slotText
              ? `<span class="time-slots">${escapeHtml(d.slotText)}</span>`
              : `<span class="time-slots muted">—</span>`;
            return `<div class="time-day-row">
              <strong>${escapeHtml(d.label)}</strong>
              <span class="time-day-dur">${escapeHtml(d.dur)}</span>
              ${times}
            </div>`;
          })
          .join("")
      : `<p class="muted" style="margin:0.35rem 0 0;font-size:0.82rem">No learning time recorded yet.</p>`;
  return `
    <div class="time-board">
      <div class="time-board-head">
        <strong>⏱ Time on Learning Lab</strong>
        <span>Total <strong>${escapeHtml(sum.totalLabel)}</strong> · Today <strong>${escapeHtml(
          sum.todayLabel
        )}</strong></span>
      </div>
      <div class="time-day-list">${days}</div>
    </div>`;
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
      if (learningTimeLearnerId) learningTimeLastTick = Date.now();
      refreshFromCloud({ silent: true }).catch(() => {});
      updateLiveTimePill();
    } else {
      // Tab hidden — pause timer + flush save
      flushLearningTimeTick(false);
      learningTimeLastTick = 0;
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
    flushLearningTimeTick(true);
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
            [
              JSON.stringify(
                prepareProfileForCloud(
                  { ...p, id: state.activeLearner, updatedAt: Date.now() },
                  state.activeLearner
                )
              ),
            ],
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

/**
 * Hash router so browser Back works inside the lab.
 * #/dashboard  #/subject/maths  #/lesson/maths/algebra/1
 */
function parseHashRoute() {
  const h = (location.hash || "").replace(/^#\/?/, "");
  if (!h) return { screen: "home", params: {} };
  const parts = h.split("/").filter(Boolean);
  const screen = parts[0] || "home";
  const params = {};
  if (screen === "subject" && parts[1]) params.subject = parts[1];
  if (screen === "diagnostic" && parts[1]) params.subject = parts[1];
  if (screen === "lesson") {
    params.subject = parts[1];
    params.skillId = parts[2];
    params.stage = Number(parts[3]) || 1;
    // Finished-lesson hash — never remount the quiz from Q1
    if (parts[2] === "done" || parts[4] === "done") {
      return { screen: "subject", params: { subject: parts[1] } };
    }
  }
  if (screen === "exam") {
    params.subject = parts[1];
    params.packStage = Number(parts[2]) || 4;
    params.mode = parts[3] || "practice";
  }
  if (screen === "power5") {
    params.subject = parts[1] || "maths";
  }
  return { screen, params };
}

function hashFor(screen, params = {}) {
  if (screen === "home") return "#/";
  if (screen === "dashboard") return "#/dashboard";
  if (screen === "subject") return `#/subject/${params.subject || "maths"}`;
  if (screen === "diagnostic") return `#/diagnostic/${params.subject || "maths"}`;
  if (screen === "lesson")
    return `#/lesson/${params.subject}/${params.skillId}/${params.stage || 1}`;
  if (screen === "lessonResult")
    return `#/lesson/${params.subject}/${params.skillId || "done"}/${params.stage || 1}/done`;
  if (screen === "diagnosticResult")
    return `#/subject/${params.subject || "maths"}`;
  if (screen === "exam")
    return `#/exam/${params.subject}/${params.packStage || 4}/${params.mode || "practice"}`;
  if (screen === "power5") return `#/power5/${params.subject || "maths"}`;
  if (screen === "parent") return "#/parent";
  if (screen === "aiSettings") return "#/aiSettings";
  if (screen === "sync") return "#/sync";
  if (screen === "examResult") {
    return `#/subject/${params.subject || "maths"}`;
  }
  return `#/${screen}`;
}

function cleanupTransientUi() {
  // Drop leftover keyboard listeners from quizzes / Power 5
  if (window.__diagKeyHandler) {
    try {
      window.removeEventListener("keydown", window.__diagKeyHandler);
    } catch (_) {
      /* ignore */
    }
    window.__diagKeyHandler = null;
  }
  if (typeof stopSpeaking === "function") {
    try {
      stopSpeaking();
    } catch (_) {
      /* ignore */
    }
  }
}

function go(screen, params = {}, opts = {}) {
  navLock = true;
  stopParentPoll();
  cleanupTransientUi();
  try {
    window.scrollTo(0, 0);
  } catch (_) {
    /* ignore */
  }
  // Time tracking: stop when leaving a child's screens; keep ticking on kid screens
  const kidScreens = {
    dashboard: 1,
    subject: 1,
    diagnostic: 1,
    diagnosticResult: 1,
    lesson: 1,
    lessonResult: 1,
    exam: 1,
    examResult: 1,
    power5: 1,
  };
  if (!kidScreens[screen]) {
    if (learningTimeLearnerId) flushLearningTimeTick(true);
    stopLearningTimeTracker(false);
  } else if (state.activeLearner) {
    startLearningTimeTracker(state.activeLearner);
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
  // Guard deep links with missing params
  if (screen === "lesson" && (!params.subject || !params.skillId)) {
    screen = params.subject ? "subject" : "dashboard";
  }
  if (screen === "subject" && !params.subject) {
    screen = "dashboard";
  }
  if (screen === "diagnostic" && !params.subject) {
    screen = "dashboard";
  }
  if (
    (screen === "exam" || screen === "power5") &&
    params.subject &&
    !SUBJECTS[params.subject]
  ) {
    params.subject = "maths";
  }
  currentScreen = screen;

  // Keep Bella pink for her whole session (hub, lessons, parent, settings).
  // Only the shared home screen goes back to garden green.
  if (screen === "home") {
    applyLearnerTheme(null);
  } else if (state.activeLearner && LEARNERS[state.activeLearner]) {
    applyLearnerTheme(state.activeLearner);
  }

  // Browser history: real places get a hash entry; result screens replace
  // so Back returns to the hub/subject instead of a broken empty result.
  const ephemeral = new Set([
    "diagnosticResult",
    "lessonResult",
    "examResult",
  ]);
  if (!opts.fromHash) {
    const nextHash = hashFor(screen, params);
    try {
      if (ephemeral.has(screen)) {
        history.replaceState({ screen, params }, "", nextHash);
      } else if (location.hash !== nextHash) {
        history.pushState({ screen, params }, "", nextHash);
      }
    } catch (_) {
      try {
        location.hash = nextHash;
      } catch (__) {
        /* ignore */
      }
    }
  }

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
    power5: renderPower5,
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
  } finally {
    setTimeout(() => {
      navLock = false;
    }, 50);
  }
}

function onHashNavigation() {
  if (navLock) return;
  if (
    currentScreen === "lessonResult" ||
    currentScreen === "diagnosticResult" ||
    currentScreen === "examResult"
  ) {
    return;
  }
  // Never remount an in-progress quiz — that was resetting kids to Q1
  if (
    liveLesson &&
    liveLesson.session &&
    !liveLesson.session.finished &&
    typeof liveLesson.paint === "function"
  ) {
    liveLesson.paint();
    return;
  }
  if (liveDiag && !liveDiag.finished && typeof liveDiag.paint === "function") {
    liveDiag.paint();
    return;
  }
  const { screen, params } = parseHashRoute();
  const allowed = new Set([
    "home",
    "dashboard",
    "subject",
    "diagnostic",
    "lesson",
    "exam",
    "power5",
    "parent",
    "sync",
    "aiSettings",
  ]);
  const safeScreen = allowed.has(screen) ? screen : "dashboard";
  // Require learner for deep links except home/parent/settings
  if (
    safeScreen !== "home" &&
    safeScreen !== "parent" &&
    safeScreen !== "sync" &&
    safeScreen !== "aiSettings" &&
    (!state.activeLearner || !LEARNERS[state.activeLearner])
  ) {
    go("home", {}, { fromHash: true });
    return;
  }
  go(safeScreen, params, { fromHash: true });
}

/** Open a kid hub — load cloud first, never get sent back to home by a race */
function applyLearnerTheme(learnerId) {
  try {
    const body = document.body;
    const root = document.documentElement;
    const next = learnerId && LEARNERS[learnerId] ? learnerId : null;

    // Toggle only — never strip all themes first (that flashed garden green)
    for (const id of Object.keys(LEARNERS)) {
      const on = next === id;
      body.classList.toggle(`theme-${id}`, on);
      body.classList.toggle(`theme-learner-${id}`, on);
      root.classList.toggle(`theme-${id}`, on);
      root.classList.toggle(`theme-learner-${id}`, on);
    }
    if (next) {
      body.setAttribute("data-learner", next);
      root.setAttribute("data-learner", next);
    } else {
      body.removeAttribute("data-learner");
      root.removeAttribute("data-learner");
    }

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", next === "bella" ? "#2c1a24" : "#0f1a12");
    }

    // Drive page chrome via CSS variables (no green flash between class swaps)
    if (next === "bella") {
      const pink =
        "radial-gradient(900px 500px at 12% -8%, rgba(183, 110, 132, 0.32), transparent 55%)," +
        "radial-gradient(780px 460px at 98% 8%, rgba(212, 165, 180, 0.18), transparent 50%)," +
        "radial-gradient(680px 400px at 50% 110%, rgba(90, 45, 65, 0.45), transparent 45%)," +
        "linear-gradient(180deg, #3a2430 0%, #2c1a24 42%, #21141c 100%)";
      root.style.setProperty("--page-bg-color", "#2c1a24");
      root.style.setProperty("--page-bg", pink);
      root.style.setProperty(
        "--topbar-bg",
        "linear-gradient(180deg, rgba(44, 26, 36, 0.98) 70%, rgba(44, 26, 36, 0.92))"
      );
      root.style.setProperty("background-color", "#2c1a24", "important");
      body.style.setProperty("background-color", "#2c1a24", "important");
    } else {
      root.style.removeProperty("--page-bg-color");
      root.style.removeProperty("--page-bg");
      root.style.removeProperty("--topbar-bg");
      root.style.removeProperty("background-color");
      body.style.removeProperty("background-color");
    }
  } catch (_) {
    /* ignore */
  }
}

function bellaThemeChip() {
  return `<span class="rb-theme-chip">Black horse · mini poodles</span>`;
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

  // Start counting time on the Learning Lab for this child
  startLearningTimeTracker(learnerId);

  // Instant hub — never wait on network for the kid's first paint
  go("dashboard");
}

/** Prefetch next teach module so the next lesson feels instant */
function prefetchNextLesson(profile, subject) {
  try {
    if (typeof getTeachModule !== "function") return;
    const stage = getActiveStage(profile, subject);
    const next = nextLesson(profile, subject, stage);
    if (!next) return;
    // Warm the module into memory (getTeachModule is sync but warms caches)
    getTeachModule(subject, next, stage, profile.id);
  } catch (_) {
    /* ignore */
  }
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

/**
 * Always-visible Daily · Weekly · Monthly goals strip for the active learner.
 * Shows mini bars + ✅ when each goal is hit (badges unlock too).
 */
function goalsBarHtml(p) {
  if (!p || typeof allGoalsProgress !== "function") return "";
  // Quietly grant badges if goals already met (no confetti spam on every paint)
  try {
    const g0 = allGoalsProgress(p);
    let granted = false;
    if (g0.daily.met && unlockBadge(p, "daily_goal")) granted = true;
    if (g0.week.met && unlockBadge(p, "weekly_goal")) granted = true;
    if (g0.month.met && unlockBadge(p, "monthly_goal")) granted = true;
    if (g0.allMet && unlockBadge(p, "goal_triple")) granted = true;
    if (granted) save({ quiet: true }).catch(() => {});
  } catch (_) {
    /* ignore */
  }
  const g = allGoalsProgress(p);
  const hasDailyBadge = (p.badges || []).includes("daily_goal");
  const hasWeekBadge = (p.badges || []).includes("weekly_goal");
  const hasMonthBadge = (p.badges || []).includes("monthly_goal");
  const hasTriple = (p.badges || []).includes("goal_triple");

  function chip(key, emoji, label, part, badgeEarned) {
    const met = part.met;
    const title = met
      ? `${label} goal hit! ${part.done}/${part.goal}`
      : `${label}: ${part.done} of ${part.goal} activities`;
    return `
      <div class="goal-chip goal-${key} ${met ? "is-met" : ""}" title="${escapeHtml(title)}" role="status">
        <span class="goal-chip-top">
          <span class="goal-chip-emoji">${met ? "✅" : emoji}</span>
          <span class="goal-chip-name">${escapeHtml(label)}</span>
          ${badgeEarned ? `<span class="goal-chip-badge" title="Badge earned">🏅</span>` : ""}
        </span>
        <span class="goal-chip-nums"><strong>${part.done}</strong><span class="goal-slash">/</span>${part.goal}</span>
        <span class="goal-chip-bar" aria-hidden="true"><i style="width:${part.pct}%"></i></span>
      </div>`;
  }

  return `
    <div class="goals-bar" aria-label="Daily, weekly and monthly goals">
      ${chip("day", "☀️", "Today", g.daily, hasDailyBadge && g.daily.met)}
      ${chip("week", "📅", "Week", g.week, hasWeekBadge && g.week.met)}
      ${chip("month", "🌙", "Month", g.month, hasMonthBadge && g.month.met)}
      ${
        /* Only show Triple chip when all three are currently met (not a past badge alone) */
        g.allMet
          ? `<div class="goal-chip goal-triple is-met" title="Daily + weekly + monthly all hit!${
              hasTriple ? " Badge earned." : ""
            }">
              <span class="goal-chip-top">
                <span class="goal-chip-emoji">🎯</span>
                <span class="goal-chip-name">Triple</span>
                ${hasTriple ? `<span class="goal-chip-badge">🏅</span>` : ""}
              </span>
              <span class="goal-chip-nums"><strong>All hit!</strong></span>
            </div>`
          : ""
      }
    </div>`;
}

function topbar(extraRight = "") {
  const L = state.activeLearner ? learner() : null;
  const p = L ? profile() : null;
  return `
    <header class="topbar">
      <div class="topbar-main">
        <div class="logo" role="button" tabindex="0" data-go="home">
          <img class="logo-mark" src="assets/logo.svg" width="46" height="46" alt="Rawson Learning Lab" />
          <span class="sr-only">Rawson Learning Lab v68</span>
          <div>
            <h1>Rawson Learning Lab</h1>
            <p>AI tutors · v68 · learning that fits around life</p>
          </div>
        </div>
        <div class="pill-row">
          ${
            L
              ? `<span class="pill">${L.emoji} <strong>${escapeHtml(
                  L.name
                )}</strong></span>
                 <span class="pill">⚡ Lv <strong>${p.level}</strong></span>
                 <span class="pill">🔥 <strong>${p.streak || 0}</strong> day streak</span>
                 <span class="pill" id="liveTimePill">⏱ …</span>
                 <button class="btn btn-ghost" data-go="dashboard" type="button">My hub</button>
                 <button class="btn btn-ghost" data-switch type="button">Switch kid</button>`
              : ""
          }
          ${extraRight}
        </div>
      </div>
      ${L && p ? goalsBarHtml(p) : ""}
    </header>`;
}

function siteFooter() {
  return `
    <footer class="site-powered">
      <span class="powered-label">Powered via</span>
      <span class="powered-brands">
        <a id="linkGrok"
           class="brand-chip brand-grok"
           href="https://grok.com/"
           target="_blank"
           rel="noopener noreferrer"
           title="Open Grok by xAI — grok.com">
          <img class="brand-grok-mark" src="assets/grok-mark.svg?v=63" alt="" width="28" height="28" draggable="false" />
          <span class="brand-grok-text">Grok</span>
        </a>
        <span class="powered-amp">&amp;</span>
        <img class="powered-logo powered-rawson" src="assets/rawson-labs-logo.svg?v=63" alt="Rawson Labs" height="52" width="200" />
      </span>
    </footer>`;
}

function bindShell() {
  appEl = getAppEl();
  if (!appEl || typeof appEl.querySelectorAll !== "function") return;
  appEl.querySelectorAll("[data-go]").forEach((el) => {
    el.addEventListener("click", () => go(el.dataset.go));
    // Keyboard activation for logo / role=button shells
    if (el.getAttribute("role") === "button" || el.tabIndex >= 0) {
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go(el.dataset.go);
        }
      });
    }
  });
  const sw = appEl.querySelector("[data-switch]");
  if (sw) {
    sw.addEventListener("click", () => {
      flushLearningTimeTick(true);
      stopLearningTimeTracker(false);
      state.activeLearner = null;
      applyLearnerTheme(null);
      save({ quiet: true }).catch(function () {});
      go("home");
    });
  }
  updateLiveTimePill();
  // External brand links (Grok) — never swallowed by SPA handlers
  appEl.querySelectorAll("a.brand-grok, a[href^='http']").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.stopPropagation();
      const url = a.getAttribute("href");
      if (!url || !/^https?:\/\//i.test(url)) return;
      // Force navigation in a new tab even if something blocks default
      e.preventDefault();
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) {
        // Popup blocked — fall back to same-tab navigation
        window.location.href = url;
      }
    });
  });
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
          <p class="muted">Age ${L.age} · Lv ${p.level} · ${p.xp} XP · 🔥 ${p.streak || 0}</p>
          ${id === "bella" ? bellaThemeChip() : `<span class="rb-theme-chip" style="background:rgba(109,191,138,0.2);border-color:rgba(109,191,138,0.35)">${escapeHtml(L.themeLabel)}</span>`}
        </div>
        <div class="home-avg">
          <span class="home-avg-num">${avg != null ? avg + "%" : "—"}</span>
          <span class="muted">avg test</span>
        </div>
      </div>
      <div class="home-score-bars">${bars}</div>
      ${learningTimeBoardHtml(id)}
      <p class="home-last muted">${escapeHtml(lastLine)}</p>
      <button class="btn ${id === "bella" ? "btn-bella" : "btn-primary"} btn-block mt-1" type="button" data-pick="${id}">
        Open ${escapeHtml(L.name)}'s hub →
      </button>
    </article>`;
}

function renderHome() {
  const myGen = ++homePaintGeneration;
  if (learningTimeLearnerId) flushLearningTimeTick(true);
  stopLearningTimeTracker(false);
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
      <div class="home-hero-media home-hero-split">
        <img src="${illustFor("pick", "bella").src}" alt="${escapeHtml(illustFor("pick", "bella").alt)}" />
        <img src="${illustFor("pick", "george").src}" alt="${escapeHtml(illustFor("pick", "george").alt)}" />
        <div class="home-hero-overlay"></div>
      </div>
      <div class="home-hero-copy">
        <img class="hero-logo" src="assets/logo.svg" width="96" height="96" alt="Rawson Learning Lab" />
        <p class="home-kicker">Rawson Learning Lab</p>
        <h2>Homeschooling with <span class="sparkle">AI tutors</span> — so learning fits around life</h2>
        <p class="lead">Personal paths for <strong>Bella-Rose</strong> &amp; <strong>George</strong> · English, Maths &amp; Science · GCSE → A*</p>
        <div class="home-hero-cta">
          <button class="btn btn-primary btn-lg btn-bella" type="button" data-pick="bella">Bella-Rose 🌸</button>
          <button class="btn btn-secondary btn-lg" type="button" data-pick="george">George 🍃</button>
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="home-theme-row">
        <figure class="home-theme-card bella">
          <img src="${illustFor("pick","bella").src}" alt="${escapeHtml(illustFor("pick","bella").alt)}" />
          <figcaption>Bella-Rose · horses &amp; mini poodles</figcaption>
        </figure>
        <figure class="home-theme-card">
          <img src="${illustFor("pick","george").src}" alt="${escapeHtml(illustFor("pick","george").alt)}" />
          <figcaption>🍃 George</figcaption>
        </figure>
      </div>
      <h2 class="section-title">Recent scores &amp; time on Lab</h2>
      <p class="lead">Scores plus how long each child has been learning — days and times update automatically.</p>
      <div class="grid-2">
        ${scoreBoardCard("bella")}
        ${scoreBoardCard("george")}
      </div>
    </section>

    <section class="home-section">
      <h2 class="section-title">How it works</h2>
      <div class="home-features">
        <article class="card home-feature">
          <img src="${illustFor("teach","bella").src}" alt="" />
          <h3>Placement &amp; practice</h3>
          <p class="muted">Tests find gaps, then lessons teach step by step — not just quizzes.</p>
        </article>
        <article class="card home-feature">
          <img src="${illustFor("welcome","george").src}" alt="" />
          <h3>Coach + Power 5</h3>
          <p class="muted">Your AI coach remembers where you left off. Power 5 is a 5-question blitz to stay sharp in under 90 seconds.</p>
        </article>
        <article class="card home-feature">
          <img src="${illustFor("pathway","george").src}" alt="" />
          <h3>Path to GCSE A*</h3>
          <p class="muted">Six stages: F → I → S → C → H → A*. Finish every lesson in a level to unlock the next.</p>
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
  const nextAct = findNextAction(p);
  touchTutorVisit(p);
  window.__coachGreetSpoken = false; // allow auto-speak greeting this visit
  save({ quiet: true }).catch(() => {});

  const isBella = L.id === "bella";
  appEl.innerHTML = `
    ${topbar()}
    <div class="welcome-banner ${L.theme} welcome-with-art">
      <img class="welcome-mascot" src="${illustFor("welcome", L.id).src}" alt="${escapeHtml(
    illustFor("welcome", L.id).alt
  )}" width="120" height="120" />
      <div class="welcome-copy">
        <h2>Hey ${escapeHtml(L.name)}! ${L.emoji}</h2>
        <p class="muted" style="margin:0.35rem 0 0">${
          isBella
            ? "Your path to GCSE A* — tailored around how you learn"
            : "Your path to GCSE A* — Coach is with you"
        }</p>
        ${isBella ? bellaThemeChip() : ""}
      </div>
      <div class="xp-ring">
        <div class="lvl">Level ${p.level}</div>
        <div class="xp-bar"><div class="xp-fill" style="width:${xpInLevel}%"></div></div>
        <div class="muted" style="font-size:0.75rem;margin-top:0.25rem">${xpInLevel}/100 XP</div>
      </div>
    </div>

    ${coachPanelHtml(p, L, nextAct)}

    ${(() => {
      const g = typeof allGoalsProgress === "function" ? allGoalsProgress(p) : null;
      return g
        ? `<div class="card mb-2 hub-goals-echo">
        <h3 style="margin:0 0 0.35rem;font-family:var(--display)">Your goals live up top ☝️</h3>
        <p class="muted" style="margin:0;font-size:0.9rem">
          Today <strong style="color:var(--gold)">${g.daily.done}/${g.daily.goal}</strong>${
            g.daily.met ? " ✅" : ""
          }
          · Week <strong style="color:var(--gold)">${g.week.done}/${g.week.goal}</strong>${
            g.week.met ? " ✅" : ""
          }
          · Month <strong style="color:var(--gold)">${g.month.done}/${g.month.goal}</strong>${
            g.month.met ? " ✅" : ""
          }
          ${g.allMet ? " · <strong>🎯 Triple Goal badge!</strong>" : ""}
          ${
            p.streak
              ? ` · 🔥 ${p.streak}-day streak${p.streak >= 7 ? " (Week Warrior)" : ""}`
              : ""
          }
        </p>
        <p class="muted" style="margin:0.4rem 0 0;font-size:0.8rem">
          Parent can set daily / weekly / monthly targets in Parent zone. Hit a goal → earn a badge 🏅
        </p>
      </div>`
        : "";
    })()}

    <div class="card continue-card mb-2">
      <h3 style="margin-top:0;font-family:var(--display)">▶️ Do this next</h3>
      <p class="muted" style="margin:0 0 0.75rem;min-height:2.4em">${escapeHtml(
        nextAct?.label || "Open a subject to begin"
      )}</p>
      <button class="btn btn-primary btn-lg btn-xl" type="button" id="btnContinue" style="max-width:100%">
        ${
          nextAct?.type === "unlock"
            ? "Unlock next stage →"
            : nextAct?.type === "power5"
              ? "⚡ Power 5 →"
              : "Let's go →"
        }
      </button>
    </div>

    <div class="quick-actions mb-2" role="group" aria-label="Quick actions">
      <button type="button" class="quick-act" id="btnPower5Maths" title="5 quick Maths questions">
        <span class="qa-emoji">⚡</span>
        <span class="qa-label">Power 5 Maths</span>
      </button>
      <button type="button" class="quick-act" id="btnPower5English" title="5 quick English questions">
        <span class="qa-emoji">⚡</span>
        <span class="qa-label">Power 5 English</span>
      </button>
      <button type="button" class="quick-act" id="btnPower5Science" title="5 quick Science questions">
        <span class="qa-emoji">⚡</span>
        <span class="qa-label">Power 5 Science</span>
      </button>
    </div>

    <h2 class="section-title">Your subjects</h2>
    <p class="lead">Short lessons. Clear next steps. All the way to <strong>GCSE A*</strong>.</p>
    <div class="grid-3 mb-2">
      ${subjectDashCard("maths")}
      ${subjectDashCard("english")}
      ${subjectDashCard("science")}
    </div>

    ${stageLegendHtml()}

    <div class="card mb-2 pathway-card-art">
      <div class="pathway-art-wrap">
        <img src="${illustFor("pathway").src}" alt="${escapeHtml(
    illustFor("pathway").alt
  )}" class="pathway-art" />
      </div>
      <h3 style="margin-top:0.85rem;font-family:var(--display)">Your pathway map</h3>
      <p class="muted" style="margin-top:0">Finish each stage to unlock the next — all the way to A*.</p>
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
    ${siteFooter()}
  `;
  bindShell();
  bindCoachPanel(p, L, nextAct);
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
    if (nextAct.type === "power5") {
      return go("power5", { subject: nextAct.subject || "maths" });
    }
    go("dashboard");
  });
  document.getElementById("btnPower5Maths")?.addEventListener("click", () =>
    go("power5", { subject: "maths" })
  );
  document.getElementById("btnPower5English")?.addEventListener("click", () =>
    go("power5", { subject: "english" })
  );
  document.getElementById("btnPower5Science")?.addEventListener("click", () =>
    go("power5", { subject: "science" })
  );
}

/**
 * Power 5 — ultra-fast 5-question drill to stay sharp.
 * Instant feedback, XP, confetti, badges. Under 90s = Speed Demon.
 */
function renderPower5({ subject }) {
  if (!state.activeLearner) return go("home");
  subject = subject || "maths";
  if (!SUBJECTS[subject]) subject = "maths";
  const p = profile();
  if (!p) return go("home");
  let qs = [];
  try {
    qs = buildPower5Questions(p, subject) || [];
  } catch (e) {
    console.warn("Power5 bank", e);
    qs = [];
  }
  if (!qs.length) {
    // Soft recover — never trap the kid
    appEl.innerHTML =
      topbar() +
      `<div class="card" style="margin-top:1rem">
        <h2>Power 5 needs a warm-up</h2>
        <p class="muted">Do a short placement test or one lesson first, then come back for the blitz.</p>
        <button class="btn btn-primary" type="button" id="p5GoSub">Open ${SUBJECTS[subject].name}</button>
        <button class="btn btn-secondary" type="button" data-go="dashboard">Hub</button>
      </div>`;
    bindShell();
    document.getElementById("p5GoSub")?.addEventListener("click", () =>
      go("subject", { subject })
    );
    return;
  }

  const answers = {};
  let index = 0;
  let revealed = false;
  let answerVal = null;
  let keyHandler = null;
  let tickId = null;
  const startedAt = Date.now();
  const targetSec =
    typeof power5TargetSeconds === "function" ? power5TargetSeconds() : 90;

  function cleanupP5() {
    if (keyHandler) {
      window.removeEventListener("keydown", keyHandler);
      keyHandler = null;
    }
    if (tickId) {
      clearInterval(tickId);
      tickId = null;
    }
  }

  function paint() {
    cleanupP5();
    const q = qs[index];
    const pct = Math.round((index / qs.length) * 100);
    const elapsed = Math.round((Date.now() - startedAt) / 1000);
    appEl.innerHTML = `
      ${topbar()}
      <div class="quiz-header">
        <div>
          <div class="q-meta">⚡ Power 5 · ${SUBJECTS[subject].emoji} ${
      SUBJECTS[subject].name
    } · Q${index + 1} of ${qs.length}</div>
          <strong>Keep sharp — short &amp; sweet · keys 1–4 select</strong>
        </div>
        <div style="display:flex;align-items:center;gap:0.65rem">
          <div class="power5-timer muted" id="p5Timer" title="Target under ${targetSec}s">${elapsed}s</div>
          <div class="progress-track" style="max-width:140px"><span style="width:${pct}%"></span></div>
        </div>
      </div>
      <div class="card question-card power5-card">
        ${
          q.passage
            ? `<blockquote class="passage">${escapeHtml(q.passage)}</blockquote>`
            : ""
        }
        <h3 class="teach-heading">${escapeHtml(q.q)}</h3>
        <div id="qBody"></div>
        <div id="feedback"></div>
        <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
          <button class="btn btn-primary" type="button" id="btnCheck">Check</button>
          <button class="btn btn-ok" type="button" id="btnNext" style="display:none">Next →</button>
        </div>
      </div>
      <button class="btn btn-ghost mt-1" type="button" id="btnExitP5">Exit</button>
    `;
    bindShell();
    document.getElementById("btnExitP5").onclick = () => {
      cleanupP5();
      go("dashboard");
    };
    answerVal = null;
    revealed = false;

    tickId = setInterval(() => {
      const el = document.getElementById("p5Timer");
      if (!el || !document.body.contains(el)) {
        clearInterval(tickId);
        tickId = null;
        return;
      }
      el.textContent = Math.round((Date.now() - startedAt) / 1000) + "s";
    }, 500);

    const body = document.getElementById("qBody");
    if (q.type === "multi") {
      body.innerHTML = `<div class="options">${q.options
        .map(
          (opt, i) =>
            `<button type="button" class="option" data-i="${i}"><span class="opt-key">${
              i + 1
            }</span> ${escapeHtml(opt)}</button>`
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
      keyHandler = (e) => {
        if (revealed) return;
        if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA"))
          return;
        const n = Number(e.key);
        if (n >= 1 && n <= (q.options?.length || 0)) {
          const btn = body.querySelector(`.option[data-i="${n - 1}"]`);
          if (btn) btn.click();
        }
        if (e.key === "Enter") document.getElementById("btnCheck")?.click();
      };
      window.addEventListener("keydown", keyHandler);
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
      const nextBtn = document.getElementById("btnNext");
      nextBtn.style.display = "inline-flex";
      nextBtn.focus();
      nextBtn.onclick = async () => {
        if (index + 1 >= qs.length) {
          cleanupP5();
          await finishP5();
        } else {
          index++;
          paint();
        }
      };
      // Auto-advance on correct after short beat (speed)
      if (ok) {
        setTimeout(() => {
          if (document.getElementById("btnNext") === nextBtn) nextBtn.click();
        }, 550);
      }
    };
  }

  async function finishP5() {
    const correct = Object.values(answers).filter((a) => a.ok).length;
    const total = qs.length;
    const scorePct = Math.round((correct / total) * 100);
    const elapsedSec = Math.round((Date.now() - startedAt) / 1000);
    const prof = profile();
    updateStreak(prof);
    recordDailyActivity(prof, "exam");
    if (typeof bumpWeekMonth === "function") bumpWeekMonth(prof);
    if (typeof ensureTutorMemory === "function") {
      ensureTutorMemory(prof).lastSubject = subject;
    }
    addXp(prof, 25 + Math.round(scorePct / 4) + (scorePct === 100 ? 15 : 0));
    unlockBadge(prof, "power_blitz");
    if (scorePct === 100) unlockBadge(prof, "power_perfect");
    if (elapsedSec <= targetSec && scorePct >= 60) unlockBadge(prof, "speed_demon");
    if ((prof.streak || 0) >= 7) unlockBadge(prof, "streak_7");
    if (!prof.examHistory) prof.examHistory = [];
    prof.examHistory.push({
      subject,
      packStage: 0,
      score: scorePct,
      correct,
      total,
      date: todayKey(),
      mode: "power5",
      elapsedSec,
    });
    try {
      await save({ quiet: false });
    } catch (e) {
      console.error(e);
    }
    if (scorePct >= 80) {
      if (typeof fireConfetti === "function") fireConfetti();
    }
    const speedNote =
      elapsedSec <= targetSec
        ? ` · 🏎️ ${elapsedSec}s — under ${targetSec}s!`
        : ` · ${elapsedSec}s`;
    appEl.innerHTML = `
      ${topbar()}
      <div class="card score-hero celebrate mb-2 score-hero-art">
        <img class="score-illust" src="${illustFor(
          scorePct >= 80 ? "celebrate" : "welcome"
        ).src}" alt="" />
        <div class="q-meta">⚡ Power 5 complete${speedNote}</div>
        <h2 style="font-family:var(--display);margin:0.5rem 0">${
          SUBJECTS[subject].emoji
        } ${SUBJECTS[subject].name}</h2>
        <div class="score-big">${scorePct}%</div>
        <p>${correct}/${total} correct · +XP earned!</p>
        <p class="muted">${escapeHtml(randomEncouragement())}</p>
      </div>
      <div style="display:flex;gap:0.6rem;flex-wrap:wrap">
        <button class="btn btn-primary" type="button" id="p5Again">Another Power 5 →</button>
        <button class="btn btn-secondary" type="button" id="p5Subject">Open ${
          SUBJECTS[subject].name
        }</button>
        <button class="btn btn-ghost" type="button" data-go="dashboard">Hub</button>
      </div>
    `;
    bindShell();
    document.getElementById("p5Again").onclick = () => go("power5", { subject });
    document.getElementById("p5Subject").onclick = () => go("subject", { subject });
  }

  paint();
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
      <button class="btn btn-primary" type="button" id="btnPower5Sub">⚡ Power 5 (fast)</button>
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
  if (!subject || !SUBJECTS[subject]) return go("dashboard");
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
    appEl.innerHTML =
      topbar() +
      `<div class="card" style="margin-top:1rem">
        <h2>No questions yet</h2>
        <p class="muted">Complete a few lessons first, then try revision or exam workouts.</p>
        <button class="btn btn-primary" type="button" data-go-subject="${subject}">Back to ${SUBJECTS[subject].name}</button>
        <button class="btn btn-secondary" type="button" data-go="dashboard">Hub</button>
      </div>`;
    bindShell();
    appEl.querySelector("[data-go-subject]")?.addEventListener("click", (e) =>
      go("subject", { subject: e.currentTarget.dataset.goSubject })
    );
    return;
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
      // Stop if user left the exam screen
      if (currentScreen !== "exam" || !document.getElementById("examTimer")) {
        stopTimer();
        return;
      }
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
    if (typeof bumpWeekMonth === "function") bumpWeekMonth(p);
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
  if (scorePct >= 80 && typeof fireConfetti === "function") fireConfetti();
  appEl.innerHTML = `
    ${topbar()}
    <div class="card score-hero celebrate mb-2 score-hero-art">
      <img class="score-illust" src="${illustFor(
        scorePct >= 80 ? "celebrate" : "exam"
      ).src}" alt="${escapeHtml(illustFor("exam").alt)}" />
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
      <button class="btn btn-secondary" type="button" id="btnP5FromExam">⚡ Power 5</button>
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
  document.getElementById("btnP5FromExam")?.addEventListener("click", () =>
    go("power5", { subject })
  );
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

// —— SUBJECT HUB (kid-clear layout) ——
function renderSubject({ subject }) {
  if (!state.activeLearner) return go("home");
  const S = SUBJECTS[subject];
  const p = profile();
  const diag = p.diagnostics[subject];

  // Always repair empty courses — keeps completed lesson scores
  if (diag?.completed) {
    ensureCourseReady(p, subject);
  }

  const courseRoot = p.courses[subject] ? ensureCourseShape(p, subject) : null;
  const activeStage = Number(courseRoot?.activeStage) || 1;
  const stageMeta = COURSE_STAGES[activeStage] || COURSE_STAGES[1];
  let stageData = courseRoot?.stages?.[activeStage] || null;
  if (diag?.completed && (!stageData || !stageData.path?.length)) {
    ensureCourseReady(p, subject);
    stageData = p.courses[subject]?.stages?.[activeStage] || null;
  }

  const path = (stageData && Array.isArray(stageData.path) && stageData.path) || [];
  const completedMap = (stageData && stageData.completed) || {};
  const doneCount = path.filter((id) => completedMap[id]).length;
  const totalCount = path.length || 1;
  const stagePct = Math.round((doneCount / totalCount) * 100);
  const stageComplete = path.length > 0 && path.every((id) => completedMap[id]);
  const nextId = path.length ? nextLesson(p, subject, activeStage) : null;
  const nextMeta = nextId ? getLessonMeta(subject, nextId, activeStage) : null;
  const nextStageNum =
    stageComplete && activeStage < MAX_COURSE_STAGE ? activeStage + 1 : null;
  const nextStageMeta = nextStageNum ? COURSE_STAGES[nextStageNum] : null;
  const pathPct = pathwayProgressPct(p, subject);
  const kidName = learner().name;

  // —— Giant “do this now” card ——
  let nextStepHtml = "";
  if (!diag?.completed) {
    nextStepHtml = `
      <div class="card next-step-card next-step-primary mb-2">
        <p class="next-step-label">👆 Start here</p>
        <h2 class="next-step-title">Placement test</h2>
        <p class="next-step-desc">About 10 quick questions so we know what to teach ${escapeHtml(
          kidName
        )} first. Wrong answers help — be honest!</p>
        <button class="btn btn-primary btn-xl" type="button" id="startDiag">
          Start ${S.name} test →
        </button>
      </div>`;
  } else if (nextStageNum && stageComplete) {
    nextStepHtml = `
      <div class="card next-step-card next-step-unlock mb-2">
        <p class="next-step-label">🎉 Level complete!</p>
        <h2 class="next-step-title">${stageMeta.emoji} ${escapeHtml(
      stageMeta.name
    )} finished</h2>
        <p class="next-step-desc">Brilliant work, ${escapeHtml(
          kidName
        )}! Unlock the next level: <strong>${escapeHtml(
      nextStageMeta.name
    )}</strong>.</p>
        <button class="btn btn-primary btn-xl" type="button" id="startNextStage" data-next-stage="${nextStageNum}">
          ${nextStageMeta.emoji} Unlock ${escapeHtml(nextStageMeta.name)} →
        </button>
      </div>`;
  } else if (stageComplete && activeStage >= MAX_COURSE_STAGE) {
    nextStepHtml = `
      <div class="card next-step-card next-step-done mb-2">
        <p class="next-step-label">⭐ Amazing!</p>
        <h2 class="next-step-title">A* path complete for ${S.name}</h2>
        <p class="next-step-desc">You can revise any lesson below, blitz a Power 5, or try exam workouts to stay sharp.</p>
        <button class="btn btn-primary btn-xl" type="button" id="btnSubjectPower5">
          ⚡ Power 5 ${S.name} →
        </button>
      </div>`;
  } else if (nextId && nextMeta) {
    const nextIndex = path.indexOf(nextId) + 1;
    nextStepHtml = `
      <div class="card next-step-card next-step-primary mb-2">
        <p class="next-step-label">👆 Do this next</p>
        <h2 class="next-step-title">${escapeHtml(nextMeta.title)}</h2>
        <p class="next-step-desc">Lesson ${nextIndex} of ${
      path.length
    } · ${escapeHtml(stageMeta.name)} ${S.name}</p>
        <button class="btn btn-primary btn-xl" type="button" id="btnDoNext"
          data-lesson="${nextId}" data-stage="${activeStage}">
          Start lesson →
        </button>
      </div>`;
  } else {
    nextStepHtml = `
      <div class="card next-step-card mb-2">
        <p class="next-step-label">Getting ready…</p>
        <h2 class="next-step-title">Building your lessons</h2>
        <p class="next-step-desc">Tap the green button if lessons don’t appear.</p>
        <button class="btn btn-primary btn-xl" type="button" id="regenCourse">Show my lessons →</button>
      </div>`;
  }

  // Stage progress chips (simple for kids)
  const stageChips = diag?.completed
    ? `<div class="stage-chip-row" role="list">
        ${Array.from({ length: MAX_COURSE_STAGE }, (_, i) => i + 1)
          .map((s) => {
            const meta = COURSE_STAGES[s];
            const unlocked = s === 1 ? true : canAccessStage(p, subject, s);
            const isActive = activeStage === s;
            const done = isStageComplete(p, subject, s);
            return `<button type="button" role="listitem" class="stage-chip ${
              isActive ? "is-active" : ""
            } ${done ? "is-done" : ""} ${!unlocked ? "is-locked" : ""}"
              data-switch-stage="${s}" ${unlocked ? "" : "disabled"}
              title="${escapeHtml(meta.name)}">${
              done ? "✓" : meta.short
            }</button>`;
          })
          .join("")}
      </div>
      <p class="stage-chip-caption muted">
        ${escapeHtml(stageMeta.emoji + " " + stageMeta.name)} · ${doneCount} of ${
        path.length
      } lessons done · whole path to A* <strong style="color:var(--gold)">${pathPct}%</strong>
      </p>`
    : "";

  // Lesson list — big, clear states
  let lessonsHtml = "";
  if (diag?.completed && path.length) {
    lessonsHtml = `
      <div class="card mb-2">
        <div class="lessons-head">
          <h3 style="margin:0;font-family:var(--display)">Your ${escapeHtml(
            stageMeta.name
          )} lessons</h3>
          <div class="lessons-progress">
            <div class="skill-meter"><div class="skill-fill" style="width:${stagePct}%"></div></div>
            <span class="muted" style="font-size:0.85rem;font-weight:800">${doneCount}/${
      path.length
    }</span>
          </div>
        </div>
        <p class="muted" style="margin:0.5rem 0 1rem;font-size:0.9rem">
          Finish them in order. Green = done. The bright one is next.
        </p>
        <div class="lesson-stack">
          ${path
            .map((skillId, i) => {
              const lesson = getLessonMeta(subject, skillId, activeStage);
              const done = completedMap[skillId];
              const prevDone = i === 0 || completedMap[path[i - 1]];
              const isNext = skillId === nextId;
              const canDo = !!(done || isNext || prevDone);
              let stateClass = "is-locked";
              let badge = "🔒";
              let action = "Locked";
              if (done) {
                stateClass = "is-done";
                badge = "✓";
                action = "Revise";
              } else if (isNext || (canDo && !done)) {
                stateClass = isNext ? "is-next" : "is-open";
                badge = isNext ? "▶" : String(i + 1);
                action = isNext ? "Start →" : "Open";
              } else {
                badge = String(i + 1);
              }
              return `
                <button type="button" class="lesson-row ${stateClass}"
                  data-lesson="${skillId}" data-stage="${activeStage}"
                  ${canDo ? "" : "disabled"}>
                  <span class="lesson-badge">${badge}</span>
                  <span class="lesson-copy">
                    <strong>${escapeHtml(lesson.title)}</strong>
                    <span class="muted">${escapeHtml(
                      lesson.blurb || SKILLS[subject][skillId]?.name || ""
                    )}${
                done && done.score != null ? ` · scored ${done.score}%` : ""
              }</span>
                  </span>
                  <span class="lesson-action">${action}</span>
                </button>`;
            })
            .join("")}
        </div>
      </div>`;
  }

  // Secondary: placement + extras (smaller)
  const secondaryHtml = diag?.completed
    ? `<details class="card more-options mb-2">
        <summary>More options (placement, exams, rebuild)</summary>
        <div class="more-options-body">
          <p style="margin:0 0 0.75rem">Placement score: <strong style="color:var(--gold)">${
            diag.score
          }%</strong> (${diag.correct}/${diag.total}) on ${escapeHtml(
        diag.date || ""
      )}</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem">
            <button class="btn btn-secondary" type="button" id="retakeDiag">Retake placement test</button>
            <button class="btn btn-ghost" type="button" id="regenCourse">Refresh this level (keep scores)</button>
          </div>
          ${examPacksCardHtml(subject, p, activeStage)}
        </div>
      </details>`
    : "";

  appEl.innerHTML = `
    ${topbar()}
    <button class="btn btn-ghost mb-1" type="button" data-go="dashboard">← Back to hub</button>

    <div class="subject-top card mb-2">
      <img class="subject-top-img" src="${subjectIllust(subject).src}" alt="" />
      <div>
        <h1 class="subject-top-title">${S.emoji} ${S.name}</h1>
        <p class="muted" style="margin:0.25rem 0 0">For ${escapeHtml(
          kidName
        )} · ${escapeHtml(learner().yearGroup)}</p>
        ${state.activeLearner === "bella" ? bellaThemeChip() : ""}
      </div>
    </div>

    ${nextStepHtml}
    ${
      /* Keep stage chips small — not the main focus for kids */
      stageChips
        ? `<details class="card mb-2 more-options"><summary>Levels (Foundation → A*)</summary><div class="more-options-body">${stageChips}</div></details>`
        : ""
    }
    ${lessonsHtml}
    ${secondaryHtml}
  `;

  // Persist repair if we rebuilt an empty path
  if (diag?.completed) {
    save({ quiet: true }).catch(() => {});
    prefetchNextLesson(p, subject);
  }

  bindShell();

  document.getElementById("startDiag")?.addEventListener("click", () =>
    go("diagnostic", { subject })
  );
  document.getElementById("retakeDiag")?.addEventListener("click", () =>
    go("diagnostic", { subject })
  );
  document.getElementById("regenCourse")?.addEventListener("click", async () => {
    recoverCompletionsFromHistory(p, subject);
    ensureCourseReady(p, subject);
    const stNow = Number(p.courses[subject]?.activeStage) || activeStage;
    const stageDone = isStageComplete(p, subject, stNow);
    if (stageDone && stNow < MAX_COURSE_STAGE) {
      startCourseStage(p, subject, stNow + 1);
      ensureCourseReady(p, subject);
    } else {
      const kept = { ...(p.courses[subject].stages[stNow]?.completed || {}) };
      buildCourse(p, subject, stNow);
      p.courses[subject].stages[stNow].completed = {
        ...kept,
        ...(p.courses[subject].stages[stNow].completed || {}),
      };
    }
    await save();
    go("subject", { subject });
  });
  document.getElementById("startNextStage")?.addEventListener("click", async (e) => {
    const n = Number(e.currentTarget.dataset.nextStage) || activeStage + 1;
    startCourseStage(p, subject, n);
    ensureCourseReady(p, subject);
    await save();
    go("subject", { subject });
  });
  document.getElementById("btnDoNext")?.addEventListener("click", (e) => {
    const btn = e.currentTarget;
    go("lesson", {
      subject,
      skillId: btn.dataset.lesson,
      stage: Number(btn.dataset.stage) || activeStage,
    });
  });
  document.getElementById("btnSubjectPower5")?.addEventListener("click", () =>
    go("power5", { subject })
  );

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
  document.getElementById("btnPower5Sub")?.addEventListener("click", () =>
    go("power5", { subject })
  );
  appEl.querySelectorAll("[data-switch-stage]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const s = Number(btn.dataset.switchStage);
      if (s === 1) {
        if (!diag?.completed) return;
        ensureCourseShape(p, subject);
        p.courses[subject].activeStage = 1;
        ensureCourseReady(p, subject);
      } else {
        if (!canAccessStage(p, subject, s)) return;
        startCourseStage(p, subject, s);
        ensureCourseReady(p, subject);
      }
      await save();
      go("subject", { subject });
    });
  });
  appEl.querySelectorAll(".lesson-row[data-lesson]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      go("lesson", {
        subject,
        skillId: btn.dataset.lesson,
        stage: Number(btn.dataset.stage) || activeStage,
      });
    });
  });
}

// —— DIAGNOSTIC QUIZ ——
function renderDiagnostic({ subject }) {
  if (!state.activeLearner) return go("home");
  if (!subject || !SUBJECTS[subject]) return go("dashboard");
  const diagKey = `${state.activeLearner}:${subject}`;
  if (
    liveDiag &&
    liveDiag.key === diagKey &&
    typeof liveDiag.paint === "function" &&
    !liveDiag.finished
  ) {
    liveDiag.paint();
    return;
  }
  let qs = [];
  try {
    qs = questionsForLearner(subject, state.activeLearner) || [];
  } catch (e) {
    console.warn("diagnostic questions", e);
  }
  if (!qs.length) {
    appEl.innerHTML =
      topbar() +
      `<div class="card" style="margin-top:1rem">
        <h2>Placement not ready</h2>
        <p class="muted">Couldn’t load questions for ${escapeHtml(
          SUBJECTS[subject].name
        )}. Try again or open the hub.</p>
        <button class="btn btn-primary" type="button" data-go="dashboard">Hub</button>
      </div>`;
    bindShell();
    return;
  }
  const answers = {};
  let index = 0;
  let revealed = false;
  const diagStore = `rawson-live-diag-v1:${diagKey}`;
  try {
    const saved = JSON.parse(sessionStorage.getItem(diagStore) || "null");
    if (saved && typeof saved.index === "number" && saved.index >= 0) {
      index = saved.index;
      if (saved.answers && typeof saved.answers === "object") {
        Object.assign(answers, saved.answers);
      }
    }
  } catch (_) {
    /* ignore */
  }
  liveDiag = { key: diagKey, finished: false, paint: null };
  const persistDiag = () => {
    try {
      sessionStorage.setItem(diagStore, JSON.stringify({ index, answers }));
    } catch (_) {
      /* ignore */
    }
  };

  function paint() {
    const q = qs[index];
    if (!q) {
      finish();
      return;
    }
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
    if (window.__diagKeyHandler) {
      window.removeEventListener("keydown", window.__diagKeyHandler);
      window.__diagKeyHandler = null;
    }
    if (q.type === "multi") {
      body.innerHTML = `<div class="options">${q.options
        .map(
          (opt, i) =>
            `<button type="button" class="option" data-i="${i}"><span class="opt-key">${
              i + 1
            }</span> ${escapeHtml(opt)}</button>`
        )
        .join("")}</div>`;
      body.querySelectorAll(".option").forEach((btn) => {
        btn.onclick = () => {
          if (revealed) return;
          const already = btn.classList.contains("selected");
          body.querySelectorAll(".option").forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          answers[q.id] = Number(btn.dataset.i);
          if (already) document.getElementById("btnCheck")?.click();
        };
      });
      window.__diagKeyHandler = (e) => {
        if (revealed) return;
        if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA"))
          return;
        const n = Number(e.key);
        if (n >= 1 && n <= (q.options?.length || 0)) {
          body.querySelector(`.option[data-i="${n - 1}"]`)?.click();
        }
        if (e.key === "Enter") document.getElementById("btnCheck")?.click();
      };
      window.addEventListener("keydown", window.__diagKeyHandler);
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
      if (window.__diagKeyHandler) {
        window.removeEventListener("keydown", window.__diagKeyHandler);
        window.__diagKeyHandler = null;
      }
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
      const nextBtn = document.getElementById("btnNext");
      nextBtn.style.display = "inline-flex";
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
        persistDiag();
      } catch (_) {
        /* ignore */
      }
      if (ok) {
        setTimeout(() => {
          if (document.getElementById("btnNext") === nextBtn) nextBtn.click();
        }, 550);
      } else {
        nextBtn.focus();
      }
    };

    document.getElementById("btnNext").onclick = () => {
      if (window.__diagKeyHandler) {
        window.removeEventListener("keydown", window.__diagKeyHandler);
        window.__diagKeyHandler = null;
      }
      if (index + 1 >= qs.length) {
        finish();
      } else {
        index++;
        revealed = false;
        persistDiag();
        paint();
      }
    };
  }

  async function finish() {
    if (liveDiag && liveDiag.key === diagKey) {
      liveDiag.finished = true;
      liveDiag = null;
    }
    try {
      sessionStorage.removeItem(diagStore);
    } catch (_) {
      /* ignore */
    }
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

  if (liveDiag && liveDiag.key === diagKey) liveDiag.paint = paint;
  paint();
}

function renderDiagnosticResult({ subject, result }) {
  if (!subject || !SUBJECTS[subject] || !result) return go("dashboard");
  const S = SUBJECTS[subject];
  const skillHtml = Object.entries(result.skillScores || {})
    .map(([id, score]) => {
      const name = SKILLS[subject]?.[id]?.name || id;
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
  if (!subject || !SUBJECTS[subject] || !skillId) {
    return go(subject && SUBJECTS[subject] ? "subject" : "dashboard", { subject });
  }
  const p = profile();
  if (!p) return go("home");
  const stageNum =
    Number(stage) ||
    (p.courses?.[subject] ? getActiveStage(p, subject) : 1) ||
    1;
  const stageMeta = COURSE_STAGES[stageNum] || COURSE_STAGES[1];
  if (!SKILLS[subject]?.[skillId]) {
    return go("subject", { subject });
  }
  const mod = getTeachModule(subject, skillId, stageNum, state.activeLearner);
  if (!mod) {
    return go("subject", { subject });
  }

  const liveKey = `${state.activeLearner}:${subject}:${skillId}:${stageNum}`;
  if (
    liveLesson &&
    liveLesson.key === liveKey &&
    liveLesson.session &&
    !liveLesson.session.finished &&
    typeof liveLesson.paint === "function"
  ) {
    liveLesson.paint();
    return;
  }

  // Revising a finished lesson? Offer a fast skip to practice.
  let isRevise = false;
  try {
    const st = p.courses?.[subject]?.stages?.[stageNum];
    isRevise = !!(st?.completed && st.completed[skillId]);
  } catch (_) {
    isRevise = false;
  }

  const session = createTutorSession(
    subject,
    skillId,
    state.activeLearner,
    stageNum
  );
  if (!session) {
    return go("subject", { subject });
  }
  let answerVal = null;
  let revealed = false;
  let finishing = false;
  liveLesson = { key: liveKey, session, paint: null };

  function paint() {
    if (session.finished || session.phase === "complete") {
      finishSession();
      return;
    }
    const prog = sessionProgress(session);
    const skillName = SKILLS[subject]?.[skillId]?.name || skillId;
    let bodyHtml = "";

    if (session.phase === "teach") {
      bodyHtml = `
        <div class="phase-pill">📖 Teach · ${escapeHtml(stageMeta.name)}${
        isRevise ? " · revise" : ""
      }</div>
        <img class="lesson-illust" src="${illustFor("teach").src}" alt="${escapeHtml(
        illustFor("teach").alt
      )}" />
        ${
          typeof lessonFunFactHtml === "function"
            ? lessonFunFactHtml(subject, skillId)
            : ""
        }
        <h3 class="teach-heading">${escapeHtml(mod.title)}</h3>
        <p class="muted">${escapeHtml(mod.blurb)}</p>
        ${mod.teach.visual ? `<div class="visual-wrap">${mod.teach.visual}</div>` : ""}
        <ul class="teach-points" id="teachPointsList">
          ${mod.teach.points.map((pt) => `<li>${escapeHtml(pt)}</li>`).join("")}
        </ul>
        ${
          typeof getVoicePrefs === "function" && getVoicePrefs().enabled
            ? `<div class="mt-1" style="display:flex;gap:0.5rem;flex-wrap:wrap">
          <button type="button" class="btn btn-secondary" data-speak
            data-speak-src="#teachPointsList" data-voice-label="🔊 Hear this lesson">
            🔊 Hear this lesson
          </button>
        </div>`
            : ""
        }
        <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
          <button class="btn btn-primary btn-lg" type="button" id="btnAdvance">Got it — show example →</button>
          ${
            isRevise
              ? `<button class="btn btn-secondary btn-lg" type="button" id="btnSkipPractice">⚡ Skip to practice</button>`
              : ""
          }
        </div>`;
    } else if (session.phase === "example") {
      bodyHtml = `
        <div class="phase-pill">✏️ Example</div>
        <h3 class="teach-heading">${escapeHtml(mod.example.title)}</h3>
        <ol class="teach-steps">
          ${mod.example.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}
        </ol>
        <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
          <button class="btn btn-primary btn-lg" type="button" id="btnAdvance">I'm ready to practise →</button>
          ${
            isRevise
              ? `<button class="btn btn-secondary" type="button" id="btnSkipPractice">⚡ Skip to practice</button>`
              : ""
          }
        </div>`;
    } else {
      // practice — linear queue only (never restarts from Q1)
      const list = currentPracticeList(session);
      const q = list[session.practiceIndex];
      if (!q) {
        session.phase = "complete";
        session.finished = true;
        finishSession();
        return;
      }
      const isHelp = q._src === "help";
      bodyHtml = `
        <div class="phase-pill">${isHelp ? "🛟 Extra practice" : "🎯 Practice"}</div>
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
          <button class="btn btn-ok" type="button" id="btnAdvance" style="display:none">Next →</button>
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
        <div style="min-width:160px">
          <div class="muted" style="font-size:0.75rem;margin-bottom:0.25rem">${escapeHtml(
            prog.label
          )} · ${prog.pct}%</div>
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
    if (typeof bindSpeakButtons === "function") bindSpeakButtons(appEl);

    const skipP = document.getElementById("btnSkipPractice");
    if (skipP) {
      skipP.onclick = () => {
        if (typeof stopSpeaking === "function") stopSpeaking();
        session.phase = "practice";
        session.practiceIndex = 0;
        answerVal = null;
        revealed = false;
        paint();
      };
    }

    if (adv && session.phase === "teach") {
      adv.onclick = () => {
        if (typeof stopSpeaking === "function") stopSpeaking();
        session.phase = "example";
        if (typeof persistQuizSession === "function") persistQuizSession(session);
        paint();
      };
    } else if (adv && session.phase === "example") {
      adv.onclick = () => {
        session.phase = "practice";
        if (session.practiceIndex == null) session.practiceIndex = 0;
        answerVal = null;
        revealed = false;
        if (typeof persistQuizSession === "function") persistQuizSession(session);
        paint();
      };
    }

    if (session.phase === "practice") {
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

    // Clean any prior keyboard binding for this lesson paint
    if (session._keyHandler) {
      window.removeEventListener("keydown", session._keyHandler);
      session._keyHandler = null;
    }

    const doCheck = () => document.getElementById("btnCheck")?.click();

    if (q.type === "multi") {
      body.innerHTML = `<div class="options">${q.options
        .map(
          (opt, i) =>
            `<button type="button" class="option" data-i="${i}"><span class="opt-key">${
              i + 1
            }</span> ${escapeHtml(opt)}</button>`
        )
        .join("")}</div>`;
      body.querySelectorAll(".option").forEach((btn) => {
        btn.onclick = () => {
          if (revealed) return;
          const already = btn.classList.contains("selected");
          body.querySelectorAll(".option").forEach((b) =>
            b.classList.remove("selected")
          );
          btn.classList.add("selected");
          answerVal = Number(btn.dataset.i);
          // Double-tap same option = check (speed)
          if (already) doCheck();
        };
      });
      session._keyHandler = (e) => {
        if (revealed) return;
        if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA"))
          return;
        const n = Number(e.key);
        if (n >= 1 && n <= (q.options?.length || 0)) {
          const btn = body.querySelector(`.option[data-i="${n - 1}"]`);
          if (btn) btn.click();
        }
        if (e.key === "Enter") doCheck();
      };
      window.addEventListener("keydown", session._keyHandler);
    } else {
      body.innerHTML = `<input class="input-answer" id="typedAns" placeholder="Type your answer…" autocomplete="off" />`;
      const input = document.getElementById("typedAns");
      input.focus();
      input.oninput = () => {
        answerVal = input.value;
      };
      input.onkeydown = (e) => {
        if (e.key === "Enter") doCheck();
      };
    }

    document.getElementById("btnCheck").onclick = async () => {
      if (revealed) return;
      if (answerVal === null || answerVal === "") {
        alert("Pick or type an answer first!");
        return;
      }
      revealed = true;
      if (session._keyHandler) {
        window.removeEventListener("keydown", session._keyHandler);
        session._keyHandler = null;
      }
      const ok = handlePracticeAnswer(session, q, answerVal);
      if (typeof persistQuizSession === "function") persistQuizSession(session);
      const fb = document.getElementById("feedback");
      fb.className = `feedback ${ok ? "good" : "bad"}`;
      fb.innerHTML = ok
        ? `✓ Nice! ${escapeHtml(q.explain || "Correct!")}`
        : `Not quite. ${escapeHtml(q.explain || "Read the tip, then press Next.")}`;

      if (q.type === "multi") {
        body.querySelectorAll(".option").forEach((btn) => {
          const i = Number(btn.dataset.i);
          if (i === q.answer) btn.classList.add("correct");
          if (i === answerVal && !ok) btn.classList.add("wrong");
          btn.disabled = true;
        });
      }
      document.getElementById("btnCheck").disabled = true;
      autosaveSoon();

      if (!ok && isAiConfigured()) {
        const box = document.getElementById("aiHelpBox");
        if (box) {
          box.innerHTML = `<p class="muted" style="font-size:0.85rem">✨ Getting an extra tip…</p>`;
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

      const advBtn = document.getElementById("btnAdvance");
      const remaining = session.queue.length - session.practiceIndex - 1;
      const willInject =
        !ok &&
        mod.struggle?.practice?.length &&
        !session.helpShownForIndex[session.practiceIndex];
      advBtn.style.display = "inline-flex";
      advBtn.textContent =
        remaining <= 0 && !willInject ? "Finish lesson →" : "Next →";
      advBtn.onclick = () => {
        const result = advanceAfterAnswer(session, ok);
        if (typeof persistQuizSession === "function") persistQuizSession(session);
        if (result.done || session.finished || session.phase === "complete") {
          finishSession();
          return;
        }
        answerVal = null;
        revealed = false;
        paint();
      };
      // Auto-advance when correct (fast loop) — still goes Next, never restarts
      if (ok) {
        setTimeout(() => {
          if (document.getElementById("btnAdvance") === advBtn) advBtn.click();
        }, 550);
      } else {
        advBtn.focus();
      }
    };
  }

  async function finishSession() {
    if (finishing) return;
    finishing = true;
    session.finished = true;
    session.phase = "complete";
    if (liveLesson && liveLesson.key === liveKey) liveLesson = null;
    if (typeof clearQuizSession === "function") {
      clearQuizSession(state.activeLearner, subject, skillId, stageNum);
    }
    if (session._keyHandler) {
      window.removeEventListener("keydown", session._keyHandler);
      session._keyHandler = null;
    }
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
    // AI coach memory
    const title =
      getLessonMeta(subject, skillId, stageNum).title || skillId;
    if (typeof recordTutorWin === "function") {
      recordTutorWin(profile(), subject, skillId, scorePct, title);
    }
    if (
      typeof recordTutorStruggle === "function" &&
      (session.struggleUsed || session.totalWrong >= 2)
    ) {
      recordTutorStruggle(profile(), subject, skillId, title);
    }
    const mem = ensureTutorMemory(profile());
    mem.lastSubject = subject;
    mem.lastSkillId = skillId;
    mem.lastStage = stageNum;
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
    // Ensure complete is stamped on the right stage before reading next
    try {
      const course = profile().courses?.[subject];
      if (course) {
        const migrated = migrateCourseEntry(course);
        profile().courses[subject] = migrated;
        const st = migrated.stages[stageNum];
        if (st) {
          if (!st.completed || typeof st.completed !== "object" || Array.isArray(st.completed)) {
            st.completed = {};
          }
          if (!st.completed[skillId]) {
            st.completed[skillId] = {
              score: scorePct,
              date: todayKey(),
              stage: stageNum,
            };
          }
        }
      }
    } catch (_) {
      /* ignore */
    }
    autoProgressStages(profile(), subject);
    const nextSkill = nextLesson(profile(), subject, stageNum, skillId);
    go("lessonResult", {
      subject,
      skillId,
      scorePct,
      correctCount: session.practiceCorrect,
      total: session.practiceTotal,
      struggle: session.struggleUsed,
      stage: stageNum,
      nextSkill: nextSkill === skillId ? null : nextSkill,
    });
  }

  if (liveLesson && liveLesson.key === liveKey) liveLesson.paint = paint;
  paint();
}

function renderLessonResult({
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
  // Re-read next skill AFTER save — never point back at the lesson just finished
  let nextId = nextSkill;
  try {
    const again = nextLesson(p, subject, stageNum, skillId);
    if (again && again !== skillId) nextId = again;
    else if (again === skillId) {
      // Force mark complete if next still points at same skill
      const course = p.courses?.[subject] && migrateCourseEntry(p.courses[subject]);
      if (course?.stages?.[stageNum]) {
        if (!course.stages[stageNum].completed || Array.isArray(course.stages[stageNum].completed)) {
          course.stages[stageNum].completed = {};
        }
        course.stages[stageNum].completed[skillId] = {
          score: scorePct,
          date: todayKey(),
          stage: stageNum,
        };
        p.courses[subject] = course;
        nextId = nextLesson(p, subject, stageNum);
      }
    }
  } catch (e) {
    console.warn(e);
  }

  const stageJustDone = isStageComplete(p, subject, stageNum);
  const nextStage = stageJustDone && stageNum < MAX_COURSE_STAGE ? stageNum + 1 : null;
  const canUnlockStage = nextStage && canAccessStage(p, subject, nextStage);
  const nextMeta = nextStage ? COURSE_STAGES[nextStage] : null;
  const mod = getTeachModule(subject, skillId, stageNum, state.activeLearner);
  const nextTitle =
    nextId && typeof getLessonMeta === "function"
      ? getLessonMeta(subject, nextId, stageNum).title
      : nextId;

  // ONE clear action for kids — no clutter
  let primaryHtml = "";
  if (canUnlockStage && nextMeta) {
    primaryHtml = `
      <button class="btn btn-primary btn-xl big-next-btn" type="button" id="unlockNext">
        🎉 Level done! Unlock ${escapeHtml(nextMeta.name)} →
      </button>`;
  } else if (nextId && nextId !== skillId) {
    primaryHtml = `
      <button class="btn btn-primary btn-xl big-next-btn" type="button" id="btnNextSkill">
        ✅ Next: ${escapeHtml(nextTitle || "continue")} →
      </button>
      <p class="muted" id="autoNextHint" style="margin-top:0.75rem;font-size:0.9rem">
        Starting automatically in <strong id="autoNextCount">3</strong>…
      </p>`;
  } else {
    primaryHtml = `
      <button class="btn btn-primary btn-xl big-next-btn" type="button" id="more">
        ✅ Back to ${escapeHtml(SUBJECTS[subject].name)} →
      </button>`;
  }

  const celeb =
    state.activeLearner === "bella" ? illustFor("celebrate", "bella") : null;
  appEl.innerHTML = `
    ${topbar()}
    <div class="card simple-done-card mb-2">
      ${
        celeb
          ? `<img class="home-score-art" src="${celeb.src}" alt="${escapeHtml(celeb.alt)}" style="border-radius:14px;margin:0 0 1rem;max-height:180px;object-fit:cover;width:100%" />`
          : ""
      }
      <p class="next-step-label" style="margin:0 0 0.5rem">Lesson finished · saved ✓</p>
      <h1 class="simple-done-title">${escapeHtml(mod?.title || "Well done!")}</h1>
      <p class="simple-done-score">${scorePct}%</p>
      <p class="muted" style="margin:0 0 1.25rem">${correctCount || 0} of ${
    total || "?"
  } correct</p>
      ${primaryHtml}
      <div style="margin-top:1.25rem">
        <button class="btn btn-ghost" type="button" data-go="dashboard">Home hub</button>
      </div>
    </div>
  `;
  if (scorePct >= 80 && typeof fireConfetti === "function") fireConfetti();
  bindShell();

  let autoTimer = null;
  let countTimer = null;
  const clearAuto = () => {
    if (autoTimer) clearTimeout(autoTimer);
    if (countTimer) clearInterval(countTimer);
    const hint = document.getElementById("autoNextHint");
    if (hint) hint.remove();
  };

  document.getElementById("more")?.addEventListener("click", () => {
    clearAuto();
    go("subject", { subject });
  });
  document.getElementById("btnNextSkill")?.addEventListener("click", () => {
    clearAuto();
    go("lesson", { subject, skillId: nextId, stage: stageNum });
  });
  document.getElementById("unlockNext")?.addEventListener("click", async () => {
    clearAuto();
    startCourseStage(p, subject, nextStage);
    await save({ quiet: true });
    go("subject", { subject });
  });

  // Auto-start next lesson so kids aren't stuck choosing
  if (nextId && nextId !== skillId && !canUnlockStage) {
    let n = 3;
    const countEl = document.getElementById("autoNextCount");
    countTimer = setInterval(() => {
      n -= 1;
      if (countEl) countEl.textContent = String(Math.max(0, n));
      if (n <= 0) clearInterval(countTimer);
    }, 1000);
    autoTimer = setTimeout(() => {
      if (currentScreen === "lessonResult" || document.getElementById("btnNextSkill")) {
        go("lesson", { subject, skillId: nextId, stage: stageNum });
      }
    }, 3000);
  }
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
      <h3 style="margin-top:0;font-family:var(--display)">📅 Weekly &amp; monthly goals</h3>
      <p class="muted">Coach uses these to nudge each child. Counts lessons + exam workouts.</p>
      <div class="grid-2">
        ${parentGoalsForm("bella")}
        ${parentGoalsForm("george")}
      </div>
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

  document.querySelectorAll("[data-save-goals]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.saveGoals;
      const p = state.profiles[id];
      if (!p) return;
      const m = ensureTutorMemory(p);
      const w = Number(document.getElementById(`wg-${id}`)?.value);
      const mo = Number(document.getElementById(`mg-${id}`)?.value);
      if (w >= 1 && w <= 40) m.weeklyGoal = w;
      if (mo >= 1 && mo <= 120) m.monthlyGoal = mo;
      const dailyG = Number(document.getElementById(`dg-${id}`)?.value);
      if (dailyG >= 1 && dailyG <= 10) {
        ensureDaily(p);
        p.daily.goal = dailyG;
      }
      await persistLearner(state, id);
      showSavedToast("Goals saved ✓");
      go("parent");
    });
  });

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
    for (const h of p.examHistory || []) {
      const modeLabel =
        h.mode === "power5"
          ? "Power 5"
          : h.mode === "timed"
            ? "timed mock"
            : h.mode === "revision"
              ? "revision"
              : "exam";
      events.push({
        t: h.date || "",
        ts: p.updatedAt || 0,
        text: `${name} ${modeLabel}: ${SUBJECTS[h.subject]?.name || h.subject} — ${h.score}%${
          h.elapsedSec != null ? ` (${h.elapsedSec}s)` : ""
        }`,
      });
    }
    // Coach goals snapshot
    if (typeof ensureTutorMemory === "function") {
      const m = ensureTutorMemory(p);
      if (m.weekDone > 0) {
        events.push({
          t: "",
          ts: (p.updatedAt || 0) - 1,
          text: `${name} this week: ${m.weekDone}/${m.weeklyGoal} activities · streak ${p.streak || 0}`,
        });
      }
    }
  }
  events.sort((a, b) => (b.ts || 0) - (a.ts || 0));
  const top = events.slice(0, 16);
  if (!top.length) {
    return "No activity yet — when the kids finish a test or lesson (with cloud sync on), it will show up here.";
  }
  return top.map((e) => `• ${escapeHtml(e.text)}`).join("<br>");
}

function parentGoalsForm(id) {
  const L = LEARNERS[id];
  const p = state.profiles[id] || defaultProfile(id);
  const m = ensureTutorMemory(p);
  const d = ensureDaily(p);
  return `
    <div class="card" style="margin:0;background:rgba(0,0,0,0.15)">
      <h4 style="margin:0 0 0.5rem">${L.emoji} ${escapeHtml(L.name)}</h4>
      <p class="muted" style="font-size:0.82rem;margin:0 0 0.65rem">
        This week <strong>${m.weekDone}/${m.weeklyGoal}</strong> ·
        This month <strong>${m.monthDone}/${m.monthlyGoal}</strong>
      </p>
      <label class="muted" style="font-size:0.78rem;display:block">Daily goal (activities)
        <input class="input-answer" id="dg-${id}" type="number" min="1" max="10" value="${
    d.goal || 2
  }" style="margin-top:0.25rem" />
      </label>
      <label class="muted" style="font-size:0.78rem;display:block;margin-top:0.5rem">Weekly goal
        <input class="input-answer" id="wg-${id}" type="number" min="1" max="40" value="${
    m.weeklyGoal
  }" style="margin-top:0.25rem" />
      </label>
      <label class="muted" style="font-size:0.78rem;display:block;margin-top:0.5rem">Monthly goal
        <input class="input-answer" id="mg-${id}" type="number" min="1" max="120" value="${
    m.monthlyGoal
  }" style="margin-top:0.25rem" />
      </label>
      <button class="btn btn-primary mt-1" type="button" data-save-goals="${id}">Save goals</button>
    </div>`;
}

function parentKid(id) {
  const L = LEARNERS[id];
  const p = state.profiles[id];
  const mem = ensureTutorMemory(p);
  const struggles = topStruggles(p, 3);
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

  const nextRec = typeof findNextAction === "function" ? findNextAction(p) : null;
  return `
    <div class="card mb-2">
      <h3 style="margin-top:0;font-family:var(--display)">${L.emoji} ${escapeHtml(
    L.fullName
  )}</h3>
      <p class="muted">Age ${L.age} · ${L.yearGroup} · Level ${p.level} · ${
    p.xp
  } XP · Streak ${p.streak} days · ${p.badges.length} badges
      · Today ${dailyProgress(p).done}/${dailyProgress(p).goal} goal
      · Week ${mem.weekDone}/${mem.weeklyGoal} · Month ${mem.monthDone}/${mem.monthlyGoal}
      · Updated ${formatTime(p.updatedAt)}</p>
      ${learningTimeBoardHtml(id)}
      ${
        nextRec
          ? `<p class="parent-next-rec"><strong>Coach next step:</strong> ${escapeHtml(
              nextRec.label
            )}</p>`
          : ""
      }
      ${
        struggles.length
          ? `<p class="muted" style="font-size:0.85rem">Coach focus zone: <strong style="color:var(--gold)">${escapeHtml(
              struggles.map((s) => s.title).join(", ")
            )}</strong></p>`
          : ""
      }
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
  const vp = typeof getVoicePrefs === "function" ? getVoicePrefs() : {};
  const voiceOpts = (typeof GROK_VOICES !== "undefined" ? GROK_VOICES : [{ id: "eve", label: "Eve" }])
    .map(
      (v) =>
        `<option value="${escapeHtml(v.id)}" ${
          vp.voiceId === v.id ? "selected" : ""
        }>${escapeHtml(v.label)}</option>`
    )
    .join("");

  appEl.innerHTML = `
    ${topbar(`<button class="btn btn-ghost" data-go="parent" type="button">← Parent zone</button>`)}
    <h2 class="section-title">✨ AI + Voice settings</h2>
    <p class="lead">Text lessons work without AI. Grok chat + <strong>Grok Voice</strong> make Coach speak and explain out loud.</p>

    <div class="card mb-2">
      <h3 style="margin-top:0">💬 Coach chat (recommended)</h3>
      <p class="muted" style="font-size:0.9rem;margin:0">
        Kids chat with <strong style="color:var(--text)">Coach</strong> on their hub — greets them, remembers progress, guides next steps.
        Paste your xAI key below so Coach answers with Grok. <strong style="color:var(--text)">Voice is optional and off by default</strong> (Apple robot voice is disabled for kids).
      </p>
    </div>

    <div class="card mb-2">
      <h3 style="margin-top:0">🔊 Grok Voice (optional — later)</h3>
      <p class="muted" style="font-size:0.9rem;margin-top:0">
        Leave voice <strong style="color:var(--text)">off</strong> until we wire real Grok Voice properly.
        Do not use Apple’s built-in voice for the kids.
      </p>
      <label class="muted" style="display:flex;align-items:center;gap:0.5rem;font-weight:700;margin:0.5rem 0">
        <input type="checkbox" id="voiceEnabled" ${vp.enabled === true ? "checked" : ""} />
        Enable Grok Voice on this Mac (advanced)
      </label>
      <label class="muted" style="display:flex;align-items:center;gap:0.5rem;font-weight:700;margin:0.5rem 0">
        <input type="checkbox" id="voiceAuto" ${vp.autoSpeak === true ? "checked" : ""} />
        Auto-speak Coach messages (only if Grok Voice works)
      </label>
      <details class="muted" style="margin:0.75rem 0;font-size:0.85rem">
        <summary style="cursor:pointer;font-weight:800;color:var(--gold)">Setup notes for later (proxy)</summary>
        <pre class="proxy-cmd" style="margin:0.5rem 0;padding:0.65rem;border-radius:10px;background:rgba(0,0,0,0.35);font-size:0.78rem;overflow:auto;color:var(--text)">cd ~/rawson-learning-lab
export XAI_API_KEY="xai-your-key"
node worker/local-voice-proxy.mjs
# Proxy URL = http://127.0.0.1:8787</pre>
      </details>
      <label class="sync-label mt-1" style="display:flex;flex-direction:column;gap:0.35rem;font-size:0.8rem;font-weight:800;color:var(--muted)">
        Voice engine
        <select id="voiceProvider" class="input-answer">
          <option value="grok" ${vp.provider === "grok" || !vp.provider ? "selected" : ""}>Grok Voice only (recommended)</option>
          <option value="auto" ${vp.provider === "auto" ? "selected" : ""}>Auto (Grok, then Apple if Grok fails)</option>
          <option value="browser" ${vp.provider === "browser" ? "selected" : ""}>Apple/Mac voice only</option>
        </select>
      </label>
      <label class="sync-label mt-1" style="display:flex;flex-direction:column;gap:0.35rem;font-size:0.8rem;font-weight:800;color:var(--muted)">
        Grok voice
        <select id="voiceId" class="input-answer">${voiceOpts}</select>
      </label>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.75rem">
        <button class="btn btn-primary" type="button" id="btnSaveVoice">Save voice settings</button>
        <button class="btn btn-secondary" type="button" id="btnTestVoice">Test voice</button>
        <button class="btn btn-ghost" type="button" id="btnStopVoice">Stop</button>
      </div>
      <p id="voiceMsg" class="muted mt-1" style="font-size:0.85rem"></p>
    </div>

    <div class="card mb-2">
      <h3 style="margin-top:0">Optional: connect Grok (xAI) text + voice</h3>
      <p class="muted" style="font-size:0.9rem">
        1. API key at
        <a href="https://console.x.ai/" target="_blank" rel="noopener" style="color:#7ec0f0">console.x.ai</a><br>
        2. Paste on <strong style="color:var(--text)">each Mac</strong><br>
        3. For best Voice results, redeploy the proxy worker (supports <code style="color:var(--gold)">/tts</code>) and paste its URL.
      </p>
      <label class="sync-label" style="display:flex;flex-direction:column;gap:0.35rem;font-size:0.8rem;font-weight:800;color:var(--muted)">
        xAI API key
        <input type="password" id="aiKey" class="input-answer" placeholder="xai-…" value="${escapeHtml(
          key
        )}" autocomplete="off" />
      </label>
      <label class="sync-label mt-1" style="display:flex;flex-direction:column;gap:0.35rem;font-size:0.8rem;font-weight:800;color:var(--muted)">
        AI proxy URL (recommended for Voice)
        <input type="url" id="aiProxy" class="input-answer" placeholder="https://your-worker.workers.dev" value="${escapeHtml(
          proxy
        )}" />
      </label>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem">
        <button class="btn btn-primary" type="button" id="btnSaveAi">Save AI settings</button>
        <button class="btn btn-secondary" type="button" id="btnTestAi">Test chat AI</button>
        <button class="btn btn-ghost" type="button" id="btnClearAi">Clear key</button>
      </div>
      <p id="aiMsg" class="muted mt-1" style="font-size:0.85rem"></p>
    </div>
    ${siteFooter()}
  `;
  bindShell();
  const msg = document.getElementById("aiMsg");
  const vMsg = document.getElementById("voiceMsg");

  document.getElementById("btnSaveVoice").onclick = () => {
    setVoicePrefs({
      enabled: document.getElementById("voiceEnabled").checked,
      autoSpeak: document.getElementById("voiceAuto").checked,
      provider: document.getElementById("voiceProvider").value,
      voiceId: document.getElementById("voiceId").value,
    });
    vMsg.textContent = "Voice settings saved ✓";
  };
  document.getElementById("btnTestVoice").onclick = async () => {
    setAiKey(document.getElementById("aiKey").value);
    setAiProxy(document.getElementById("aiProxy").value);
    setVoicePrefs({
      enabled: true,
      provider: document.getElementById("voiceProvider").value,
      voiceId: document.getElementById("voiceId").value,
      allowBrowserFallback: document.getElementById("voiceProvider").value !== "grok",
    });
    vMsg.textContent = "Playing Grok Voice…";
    try {
      const which = await speakText(
        "Hello! I’m Coach, powered by Grok. Ready for a quick learning win today?",
        { force: true, allowBrowserFallback: false }
      );
      vMsg.textContent =
        which === "grok"
          ? "✓ That was Grok Voice — not Apple. You’re set!"
          : which === "browser"
            ? "That was the Mac voice. Start the local proxy and set Proxy URL to http://127.0.0.1:8787"
            : "Voice finished.";
      if (typeof updateVoiceStatusBanners === "function") updateVoiceStatusBanners();
    } catch (e) {
      vMsg.innerHTML =
        "<strong style='color:var(--danger)'>Grok Voice failed</strong> (so you were hearing Apple before).<br>" +
        escapeHtml(e.message || e) +
        "<br><br>Run the Terminal commands above, set Proxy URL to <code>http://127.0.0.1:8787</code>, then Test again.";
    }
  };
  document.getElementById("btnStopVoice").onclick = () => {
    if (typeof stopSpeaking === "function") stopSpeaking();
    vMsg.textContent = "Stopped.";
  };

  document.getElementById("btnSaveAi").onclick = () => {
    setAiKey(document.getElementById("aiKey").value);
    setAiProxy(document.getElementById("aiProxy").value);
    msg.textContent = isAiConfigured()
      ? "Saved ✓ AI + Voice enabled on this Mac."
      : "Cleared — using built-in lessons; browser voice still works.";
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

    // Browser back/forward inside the lab
    window.addEventListener("popstate", () => {
      try {
        onHashNavigation();
      } catch (e) {
        console.warn("popstate nav", e);
      }
    });
    window.addEventListener("hashchange", () => {
      try {
        onHashNavigation();
      } catch (e) {
        console.warn("hashchange nav", e);
      }
    });

    // Deep link or resume from hash when possible
    const route = parseHashRoute();
    const deepOk =
      route.screen &&
      route.screen !== "home" &&
      (canDash ||
        route.screen === "parent" ||
        route.screen === "sync" ||
        route.screen === "aiSettings");
    if (deepOk) {
      go(route.screen, route.params, { fromHash: true });
    } else {
      go(canDash ? "dashboard" : "home");
    }
  } catch (err) {
    console.error("Boot failed", err);
    showFatalError(err);
  }
})();
