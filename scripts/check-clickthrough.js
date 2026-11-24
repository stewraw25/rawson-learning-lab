#!/usr/bin/env node
/**
 * End-to-end click-through test for Rawson Learning Lab.
 *
 * For both children and every subject / topic / stage, answers every question
 * in a set, then checks that the next set loads: no blank screen, no stuck
 * button, no repeated questions within a sitting or between consecutive sets,
 * and that progress is saved under rawson-learning-lab-v1.
 *
 * Usage:
 *   node scripts/check-clickthrough.js --base http://127.0.0.1:8765/ --out ./out
 *   node scripts/check-clickthrough.js --base https://stewraw25.github.io/rawson-learning-lab/ --out ./out
 *
 * Optional: --learners george,bella  --subjects maths,english  --limit 20
 * Chrome: set CHROME_PATH or uses /usr/bin/google-chrome.
 * Puppeteer: puppeteer-core or puppeteer, or PUPPETEER_MODULE.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");

const STORAGE_KEY = "rawson-learning-lab-v1";

function parseArgs(argv) {
  const out = { base: "", outDir: "", learners: null, subjects: null, limit: 0, serve: "" };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = argv[i + 1];
    if (a === "--base" && next) { out.base = next; i++; }
    else if (a === "--out" && next) { out.outDir = next; i++; }
    else if (a === "--learners" && next) { out.learners = next.split(",").map((s) => s.trim()).filter(Boolean); i++; }
    else if (a === "--subjects" && next) { out.subjects = next.split(",").map((s) => s.trim()).filter(Boolean); i++; }
    else if (a === "--limit" && next) { out.limit = Number(next) || 0; i++; }
    else if (a === "--serve" && next) { out.serve = next; i++; }
  }
  return out;
}

function loadPuppeteer() {
  const tries = [];
  if (process.env.PUPPETEER_MODULE) tries.push(process.env.PUPPETEER_MODULE);
  tries.push("/tmp/pwshot/node_modules/puppeteer-core");
  tries.push(path.join(__dirname, "../node_modules/puppeteer-core"));
  tries.push(path.join(__dirname, "../node_modules/puppeteer"));
  tries.push(path.join(__dirname, "node_modules/puppeteer-core"));
  tries.push("puppeteer-core");
  tries.push("puppeteer");
  const errors = [];
  for (const t of tries) {
    try {
      return require(t);
    } catch (e) {
      errors.push(t + ": " + (e && e.message));
    }
  }
  throw new Error("Could not load puppeteer-core. " + errors.join(" | "));
}

function chromePath() {
  const cands = [
    process.env.CHROME_PATH,
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  for (const p of cands) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("No Chrome/Chromium found. Set CHROME_PATH.");
}

function startStaticServer(root, port) {
  const mime = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon",
    ".json": "application/json",
    ".woff2": "font/woff2",
    ".md": "text/markdown; charset=utf-8",
  };
  const server = http.createServer((req, res) => {
    try {
      const url = new URL(req.url, "http://127.0.0.1");
      let rel = decodeURIComponent(url.pathname);
      if (rel === "/") rel = "/index.html";
      const file = path.normalize(path.join(root, rel));
      if (!file.startsWith(path.resolve(root))) {
        res.writeHead(403); res.end("forbidden"); return;
      }
      if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end("not found"); return;
      }
      const type = mime[path.extname(file).toLowerCase()] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
      fs.createReadStream(file).pipe(res);
    } catch (e) {
      res.writeHead(500); res.end(String(e));
    }
  });
  return new Promise((resolve, reject) => {
    server.listen(port, "127.0.0.1", () => resolve(server));
    server.on("error", reject);
  });
}

async function blockCloud(page) {
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    if (/firebase|firebasestorage|firebasedatabase|identitytoolkit|securetoken\.googleapis/i.test(url)) {
      return req.abort();
    }
    req.continue();
  });
}

async function waitApp(page) {
  await page.waitForFunction(
    () =>
      typeof go === "function" &&
      typeof defaultProfile === "function" &&
      typeof buildCourse === "function" &&
      typeof saveState === "function" &&
      typeof STORAGE_KEY === "string",
    { timeout: 30000 }
  );
}

async function preparePage(page, base) {
  await blockCloud(page);
  const url = base + (base.includes("?") ? "&" : "?") + "cb=" + Date.now();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await waitApp(page);
  await page.evaluate(() => {
    try {
      if (typeof pushProfile === "function") {
        window.pushProfile = async function () { return { skipped: true }; };
      }
      if (typeof refreshFromCloud === "function") {
        window.refreshFromCloud = async function () { return false; };
      }
      if (typeof startAutoSync === "function") {
        window.startAutoSync = function () {};
      }
    } catch (_) { /* ignore */ }
  });
}

const IN_PAGE_WALKER = `async function __walkCurrentLesson(timeoutMs) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const visible = (el) => {
    if (!el) return false;
    const s = getComputedStyle(el);
    return s.display !== "none" && s.visibility !== "hidden" && !el.disabled;
  };
  const fpOf = (q) => {
    if (!q) return "";
    if (typeof questionFingerprint === "function") return questionFingerprint(q) || "";
    if (typeof _qSeenFp === "function") return _qSeenFp(q) || "";
    return String(q.q || q.prompt || "");
  };
  const appRoot = () => document.getElementById("app") || document.body;
  const screenshotState = () => {
    const app = appRoot();
    const text = (app.innerText || "").replace(/\\s+/g, " ").trim();
    const buttons = [...document.querySelectorAll("button")].filter(visible).map((b) => b.id || b.textContent.trim().slice(0, 40));
    const sess = (typeof liveLesson !== "undefined" && liveLesson && liveLesson.session) ? liveLesson.session : null;
    let q = null;
    if (sess && typeof currentMiniQuestion === "function" && ["prereq", "guided", "exit"].indexOf(sess.phase) !== -1) {
      const mini = typeof getMiniLesson === "function" ? getMiniLesson(sess.subject, sess.skillId, sess.stage || sess.stageNum) : null;
      q = currentMiniQuestion(sess, mini);
    } else if (sess && typeof currentPracticeList === "function") {
      q = currentPracticeList(sess)[sess.practiceIndex];
    }
    return {
      hash: location.hash,
      text: text.slice(0, 500),
      textLen: text.length,
      buttons,
      pill: (document.querySelector(".phase-pill") || {}).textContent || "",
      heading: (document.querySelector(".teach-heading, .simple-done-title, .level-complete-title, h1") || {}).textContent || "",
      phase: sess && sess.phase,
      finished: !!(sess && sess.finished),
      idx: sess && sess.practiceIndex,
      qText: q && (q.q || ""),
      hasNextSkill: !!document.getElementById("btnNextSkill"),
      hasUnlock: !!document.getElementById("btnUnlockLevel") || !!document.getElementById("btnLevelStay"),
      hasRetry: !!document.getElementById("btnRetryLesson"),
      hasCleared: !!(document.getElementById("btnCorePractice") || document.getElementById("btnJourneyPractice")) && !document.getElementById("btnNextSkill") && !document.querySelector(".simple-done-card, .level-complete-screen"),
      hasResult: !!document.querySelector(".simple-done-card, .level-complete-screen"),
      levelComplete: !!document.querySelector(".level-complete-screen"),
    };
  };

  const asked = [];
  const started = Date.now();
  let lastSig = "";
  let stuck = 0;
  let steps = 0;

  function currentQ() {
    const sess = liveLesson && liveLesson.session;
    if (!sess) return null;
    if (["prereq", "guided", "exit"].indexOf(sess.phase) !== -1 && typeof currentMiniQuestion === "function") {
      const mini = typeof getMiniLesson === "function" ? getMiniLesson(sess.subject, sess.skillId, sess.stage || sess.stageNum) : null;
      return currentMiniQuestion(sess, mini);
    }
    if (typeof currentPracticeList === "function") {
      return currentPracticeList(sess)[sess.practiceIndex] || null;
    }
    return null;
  }

  async function answerCurrent() {
    const q = currentQ();
    if (!q) return { ok: false, reason: "no-question" };
    const fp = fpOf(q);
    if (fp) asked.push(fp);
    if (q.type === "multi") {
      const opt = document.querySelector('.option[data-i="' + q.answer + '"]');
      if (!opt) return { ok: false, reason: "missing-option", q: q.q };
      opt.click();
    } else {
      const input = document.getElementById("typedAns");
      if (!input) return { ok: false, reason: "missing-typed", q: q.q };
      const val = q.answer == null ? "" : String(q.answer);
      input.focus();
      input.value = val;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await sleep(15);
    const check = document.getElementById("btnCheck");
    if (!check || !visible(check)) return { ok: false, reason: "missing-check", q: q.q };
    check.click();
    const deadline = Date.now() + 4000;
    while (Date.now() < deadline) {
      const next = document.getElementById("btnAdvance") || document.getElementById("btnNext");
      if (next && visible(next)) {
        next.click();
        await sleep(20);
        return { ok: true, fp };
      }
      if (document.querySelector(".simple-done-card, .level-complete-screen")) {
        return { ok: true, fp, finished: true };
      }
      await sleep(20);
    }
    return { ok: false, reason: "stuck-after-check", q: q.q };
  }

  while (Date.now() - started < timeoutMs && steps < 200) {
    steps++;
    const skip = document.getElementById("btnSkipClip");
    if (skip && visible(skip)) { skip.click(); await sleep(20); }

    const snap = screenshotState();
    const sig = [snap.hash, snap.phase, snap.idx, snap.qText, snap.pill, snap.hasResult, snap.hasCleared].join("|");
    if (sig === lastSig) stuck++; else { stuck = 0; lastSig = sig; }
    if (stuck >= 12) {
      return { status: "fail", reason: "stuck-same-screen", steps, asked, snap };
    }

    if (snap.levelComplete || snap.hasResult || snap.hasNextSkill || snap.hasUnlock || snap.hasRetry) {
      return { status: "pass", reason: snap.levelComplete ? "level-complete" : (snap.hasRetry ? "retry-screen" : "lesson-result"), steps, asked, snap };
    }

    if (snap.hasCleared) {
      const nextOnCleared = document.getElementById("btnCoreNext");
      if (nextOnCleared) {
        return { status: "pass", reason: "cleared-with-next", steps, asked, snap };
      }
      return { status: "fail", reason: "cleared-or-empty-set", steps, asked, snap };
    }

    if (!snap.textLen || snap.textLen < 15) {
      if (stuck >= 4) return { status: "fail", reason: "blank-screen", steps, asked, snap };
      await sleep(40);
      continue;
    }

    const sess = (typeof liveLesson !== "undefined" && liveLesson && liveLesson.session) ? liveLesson.session : null;
    const phase = sess && sess.phase;

    if (phase === "complete" || (sess && sess.finished)) {
      await sleep(50);
      const after = screenshotState();
      if (after.hasResult || after.levelComplete || after.hasNextSkill || after.hasUnlock) {
        return { status: "pass", reason: after.levelComplete ? "level-complete" : "lesson-result", steps, asked, snap: after };
      }
      await sleep(200);
      continue;
    }

    if (phase === "goal" || phase === "teach" || phase === "example") {
      const b = document.getElementById("btnAdvance");
      if (!b || !visible(b)) {
        return { status: "fail", reason: "stuck-button", detail: "no Advance on " + phase, steps, asked, snap };
      }
      b.click();
      await sleep(20);
      continue;
    }

    const ans = await answerCurrent();
    if (!ans.ok) {
      // Maybe the lesson already finished while we were answering
      const after = screenshotState();
      if (after.hasResult || after.levelComplete || after.hasNextSkill || after.hasUnlock) {
        return { status: "pass", reason: after.levelComplete ? "level-complete" : "lesson-result", steps, asked, snap: after };
      }
      return { status: "fail", reason: ans.reason || "answer-failed", detail: ans.q || "", steps, asked, snap: after };
    }
    if (ans.finished) {
      const after = screenshotState();
      return { status: "pass", reason: after.levelComplete ? "level-complete" : "lesson-result", steps, asked, snap: after };
    }
  }
  return { status: "fail", reason: "timeout", steps, asked, snap: screenshotState() };
}`;

async function installWalker(page) {
  await page.evaluate(IN_PAGE_WALKER + "; window.__walkCurrentLesson = __walkCurrentLesson;");
}

async function bootstrapLearner(page, learnerId) {
  return page.evaluate((learnerId) => {
    const PACE = typeof PACE_VERSION !== "undefined" ? PACE_VERSION : "pace-years-v1";
    const maxS = typeof MAX_COURSE_STAGE === "number" ? MAX_COURSE_STAGE : 6;
    if (!state.profiles) state.profiles = {};
    const p = defaultProfile(learnerId);
    p.updatedAt = Date.now();
    const subjects = typeof subjectsForLearner === "function" ? subjectsForLearner(learnerId) : ["maths", "english", "science"];
    for (const subject of subjects) {
      p.diagnostics[subject] = { completed: true, score: 60, skillScores: {}, date: "2026-01-01" };
      if (typeof buildCourse === "function") buildCourse(p, subject, 1);
      if (!p.courses[subject]) p.courses[subject] = { stages: {} };
      const c = p.courses[subject];
      c.paceVersion = PACE;
      c.homeStage = 1;
      c.paceClimbedTo = maxS;
      c.paceStartedOn = "2026-01-01";
      for (let stage = 1; stage <= maxS; stage++) {
        try {
          if (typeof buildCourse === "function") buildCourse(p, subject, stage);
          if (typeof startCourseStage === "function") startCourseStage(p, subject, stage);
        } catch (_) { /* ignore */ }
      }
      c.paceClimbedTo = maxS;
      c.paceVersion = PACE;
    }
    state.profiles[learnerId] = p;
    state.activeLearner = learnerId;
    if (typeof saveState === "function") saveState(state);
    return { subjects, storageKey: STORAGE_KEY, maxStage: maxS };
  }, learnerId);
}

async function listPath(page, learnerId, subject, stage) {
  return page.evaluate((learnerId, subject, stage) => {
    state.activeLearner = learnerId;
    const p = state.profiles[learnerId];
    try {
      if (typeof startCourseStage === "function") startCourseStage(p, subject, stage);
    } catch (_) { /* ignore */ }
    const course = p.courses && p.courses[subject];
    const st = course && course.stages && (course.stages[stage] || course.stages["s" + stage]);
    const pathIds = (st && Array.isArray(st.path) ? st.path : []).filter(Boolean);
    const stageName = (typeof courseStageMeta === "function" && courseStageMeta(subject, stage) && courseStageMeta(subject, stage).name) || ("Stage " + stage);
    return { path: pathIds, stageName, canAccess: typeof canAccessStage === "function" ? canAccessStage(p, subject, stage) : true };
  }, learnerId, subject, stage);
}

async function openLesson(page, learnerId, subject, skillId, stage) {
  return page.evaluate((learnerId, subject, skillId, stage) => {
    state.activeLearner = learnerId;
    const p = state.profiles[learnerId];
    try {
      if (typeof startCourseStage === "function") startCourseStage(p, subject, stage);
      if (p.courses && p.courses[subject]) p.courses[subject].activeStage = stage;
    } catch (_) { /* ignore */ }
    go("lesson", { subject, skillId, stage });
    return location.hash;
  }, learnerId, subject, skillId, stage);
}

async function walkLesson(page, timeoutMs) {
  return page.evaluate(async (timeoutMs) => {
    if (typeof __walkCurrentLesson !== "function") throw new Error("walker missing");
    return __walkCurrentLesson(timeoutMs);
  }, timeoutMs);
}

async function clickNextSet(page) {
  return page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const visible = (el) => {
      if (!el) return false;
      const s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden" && !el.disabled;
    };
    const beforeHash = location.hash;
    const beforeText = ((document.getElementById("app") || document.body).innerText || "").slice(0, 200);
    if (document.querySelector(".level-complete-screen")) {
      return { kind: "level-complete", hash: beforeHash, heading: (document.querySelector(".level-complete-title, .level-complete-stage") || {}).textContent || "" };
    }
    const nextBtn = document.getElementById("btnNextSkill") || document.getElementById("btnCoreNext");
    if (nextBtn && visible(nextBtn)) {
      const label = nextBtn.textContent.trim();
      nextBtn.click();
      const deadline = Date.now() + 8000;
      while (Date.now() < deadline) {
        if (location.hash !== beforeHash || ((document.getElementById("app") || document.body).innerText || "").slice(0, 200) !== beforeText) {
          await sleep(30);
          const pill = (document.querySelector(".phase-pill") || {}).textContent || "";
          const heading = (document.querySelector(".teach-heading, h3, h1") || {}).textContent || "";
          const text = ((document.getElementById("app") || document.body).innerText || "").replace(/\\s+/g, " ").trim();
          const blank = !text || text.length < 15;
          const sess = (typeof liveLesson !== "undefined" && liveLesson && liveLesson.session) ? liveLesson.session : null;
          return {
            kind: "opened-next",
            label,
            hash: location.hash,
            pill,
            heading,
            blank,
            phase: sess && sess.phase,
            skillId: sess && sess.skillId,
            stuckBtn: false,
          };
        }
        await sleep(30);
      }
      return { kind: "next-did-not-load", label, hash: location.hash, blank: true };
    }
    if (document.getElementById("btnRetryLesson")) {
      return { kind: "retry-only", hash: beforeHash };
    }
    if (document.getElementById("more") || document.getElementById("btnBackToSubject")) {
      return { kind: "back-only", hash: beforeHash, heading: (document.querySelector(".simple-done-title, h1") || {}).textContent || "" };
    }
    return { kind: "no-next-button", hash: beforeHash, text: beforeText };
  });
}

async function progressTick(page, learnerId, subject, skillId, stage) {
  return page.evaluate((learnerId, subject, skillId, stage, key) => {
    const raw = localStorage.getItem(key);
    const data = raw ? JSON.parse(raw) : null;
    const p = data && data.profiles && data.profiles[learnerId];
    const course = p && p.courses && p.courses[subject];
    const st = course && course.stages && (course.stages[stage] || course.stages["s" + stage]);
    const rec = st && st.completed && st.completed[skillId];
    const history = ((p && p.lessonHistory) || []).filter((h) => h.subject === subject && h.skillId === skillId && Number(h.stage) === Number(stage));
    return {
      keyPresent: !!raw,
      key: typeof STORAGE_KEY !== "undefined" ? STORAGE_KEY : null,
      saved: !!rec,
      score: rec && rec.score,
      history: history.length,
      xp: p && p.xp,
    };
  }, learnerId, subject, skillId, stage, STORAGE_KEY);
}

function repeatsIn(asked) {
  const seen = new Set();
  const dups = [];
  for (const fp of asked || []) {
    if (!fp) continue;
    if (seen.has(fp)) dups.push(fp);
    seen.add(fp);
  }
  return dups;
}

function overlap(a, b) {
  const setA = new Set((a || []).filter(Boolean));
  return (b || []).filter((fp) => fp && setA.has(fp));
}

function printRow(row) {
  const mark = row.status === "pass" ? "PASS" : row.status === "skip" ? "SKIP" : "FAIL";
  console.log(mark, row.learner, row.subject, "s" + row.stage, row.skillId, row.reason, row.detail || "");
}

async function runSuite(page, opts) {
  const rows = [];
  let failCount = 0;
  const learners = opts.learners || ["george", "bella"];
  let remaining = opts.limit || Infinity;

  for (const learnerId of learners) {
    if (remaining <= 0) break;
    const boot = await bootstrapLearner(page, learnerId);
    if (boot.storageKey && boot.storageKey !== STORAGE_KEY) {
      const row = { learner: learnerId, subject: "*", skillId: "*", stage: 0, status: "fail", reason: "storage-key", detail: boot.storageKey };
      rows.push(row); failCount++; printRow(row);
    }
    let subjects = boot.subjects || ["maths", "english", "science"];
    if (opts.subjects) subjects = subjects.filter((s) => opts.subjects.includes(s));
    const maxS = boot.maxStage || 6;

    for (const subject of subjects) {
      if (remaining <= 0) break;
      let prevAsked = [];
      for (let stage = 1; stage <= maxS; stage++) {
        if (remaining <= 0) break;
        const listed = await listPath(page, learnerId, subject, stage);
        if (!listed.path.length) continue;
        if (!listed.canAccess) {
          // Test still opens lessons after unlocking in bootstrap; record if a stage stays closed.
          const row = { learner: learnerId, subject, skillId: "*", stage, status: "fail", reason: "stage-locked", detail: listed.stageName, asked: 0 };
          rows.push(row); failCount++; printRow(row);
          continue;
        }

        let i = 0;
        while (i < listed.path.length) {
          if (remaining <= 0) break;
          const skillId = listed.path[i];
          remaining--;
          await openLesson(page, learnerId, subject, skillId, stage);
          await new Promise((r) => setTimeout(r, 30));
          const walked = await walkLesson(page, 45000);
          const dups = repeatsIn(walked.asked);
          const shared = overlap(prevAsked, walked.asked);
          const prog = await progressTick(page, learnerId, subject, skillId, stage);

          let status = walked.status === "pass" ? "pass" : "fail";
          let reason = walked.reason || "unknown";
          let detail = walked.detail || "";

          if (status === "pass" && dups.length) {
            status = "fail"; reason = "repeat-in-set"; detail = dups.slice(0, 3).join(" || ");
          }
          if (status === "pass" && shared.length) {
            // Consecutive sets should not reuse the same questions.
            status = "fail"; reason = "repeat-between-sets"; detail = shared.length + " overlapping (" + shared.slice(0, 2).join(" || ") + ")";
          }
          if (status === "pass" && walked.reason === "retry-screen") {
            status = "fail"; reason = "did-not-count"; detail = "finished on retry, lesson not saved";
          }
          if (status === "pass" && !(prog.keyPresent && prog.key === STORAGE_KEY)) {
            status = "fail"; reason = "storage-key"; detail = String(prog.key);
          }
          if (status === "pass" && !prog.saved) {
            status = "fail"; reason = "progress-not-saved"; detail = "no completion tick after a finished set";
          }

          let nextInfo = null;
          const isLast = i === listed.path.length - 1;
          if (status === "pass") {
            nextInfo = await clickNextSet(page);
            if (isLast) {
              if (nextInfo.kind === "opened-next") {
                // Last lesson should celebrate or stay, not silently jump if stage isn't complete — but opening next stage is ok if unlocked.
                // If it opened another skill in the same stage, the path listing was incomplete.
                status = "fail"; reason = "expected-level-complete"; detail = "last lesson opened " + (nextInfo.hash || nextInfo.skillId);
              } else if (nextInfo.kind === "level-complete" || nextInfo.kind === "back-only") {
                // Good: end of set is a clear screen, not a dead end.
              } else if (nextInfo.kind === "no-next-button") {
                status = "fail"; reason = "dead-end"; detail = "last lesson had no result / level-complete action";
              }
            } else {
              if (nextInfo.kind === "opened-next") {
                if (nextInfo.blank) {
                  status = "fail"; reason = "next-set-blank"; detail = nextInfo.hash;
                } else if (nextInfo.skillId && nextInfo.skillId === skillId) {
                  status = "fail"; reason = "next-set-same-lesson"; detail = skillId;
                } else {
                  // Continue into the loaded next lesson rather than go() again.
                  const expected = listed.path[i + 1];
                  if (nextInfo.skillId && expected && nextInfo.skillId !== expected) {
                    // Not necessarily a fail if path order differs, but record it.
                    detail = (detail ? detail + "; " : "") + "opened " + nextInfo.skillId + " expected " + expected;
                  }
                  prevAsked = walked.asked || [];
                  const row = {
                    learner: learnerId, subject, skillId, stage, stageName: listed.stageName,
                    status, reason, detail, asked: (walked.asked || []).length, steps: walked.steps,
                    score: prog.score, next: nextInfo.kind + (nextInfo.skillId ? ":" + nextInfo.skillId : ""),
                  };
                  rows.push(row);
                  if (status !== "pass") failCount++;
                  printRow(row);
                  if (status === "pass" && nextInfo.skillId) {
                    // Walk the lesson already opened by Next.
                    const idx = listed.path.indexOf(nextInfo.skillId);
                    if (idx > i) { i = idx; continue; }
                  }
                  i++;
                  continue;
                }
              } else if (nextInfo.kind === "level-complete") {
                // Stage ended early even though path has more — remaining lessons weren't offered.
                status = "fail"; reason = "next-set-skipped"; detail = "level complete before " + listed.path.slice(i + 1).join(",");
              } else if (nextInfo.kind === "next-did-not-load") {
                status = "fail"; reason = "next-set-did-not-load"; detail = nextInfo.label || "";
              } else if (nextInfo.kind === "retry-only") {
                status = "fail"; reason = "next-set-missing"; detail = "retry offered instead of next lesson";
              } else if (nextInfo.kind === "back-only" || nextInfo.kind === "no-next-button") {
                status = "fail"; reason = "next-set-missing"; detail = nextInfo.kind;
              }
            }
          }

          const row = {
            learner: learnerId,
            subject,
            skillId,
            stage,
            stageName: listed.stageName,
            status,
            reason,
            detail,
            asked: (walked.asked || []).length,
            steps: walked.steps,
            score: prog.score,
            next: nextInfo ? nextInfo.kind + (nextInfo.skillId ? ":" + nextInfo.skillId : "") : "",
          };
          rows.push(row);
          if (status !== "pass") failCount++;
          printRow(row);
          prevAsked = walked.asked || [];
          i++;
        }
        prevAsked = [];
      }
    }
  }
  return { rows, failCount, passCount: rows.filter((r) => r.status === "pass").length };
}

function matrixMarkdown(rows, title) {
  const lines = [];
  lines.push("# Click-through test — " + title);
  lines.push("");
  const pass = rows.filter((r) => r.status === "pass").length;
  const fail = rows.filter((r) => r.status === "fail").length;
  lines.push("Result: **" + pass + " passed**, **" + fail + " failed**, " + rows.length + " lessons.");
  lines.push("");
  const by = new Map();
  for (const r of rows) {
    const key = r.learner + " / " + r.subject + " / " + (r.stageName || ("Stage " + r.stage));
    if (!by.has(key)) by.set(key, []);
    by.get(key).push(r);
  }
  for (const [key, list] of by) {
    const f = list.filter((r) => r.status === "fail").length;
    lines.push("## " + key + (f ? " — " + f + " failed" : " — all passed"));
    lines.push("");
    lines.push("| Topic | Status | Reason | Questions | Next set |");
    lines.push("|---|---|---|---:|---|");
    for (const r of list) {
      const mark = r.status === "pass" ? "PASS" : "FAIL";
      const detail = (r.reason + (r.detail ? ": " + String(r.detail).replace(/\\|/g, "/") : "")).slice(0, 160);
      lines.push("| " + r.skillId + " | " + mark + " | " + detail + " | " + (r.asked || 0) + " | " + (r.next || "") + " |");
    }
    lines.push("");
  }
  const failures = rows.filter((r) => r.status === "fail");
  if (failures.length) {
    lines.push("## Failures (plain terms)");
    lines.push("");
    for (const r of failures) {
      lines.push("- **" + r.learner + "** " + r.subject + " " + r.skillId + " (stage " + r.stage + "): " + r.reason + (r.detail ? " — " + r.detail : ""));
    }
    lines.push("");
  }
  return lines.join("\n");
}

(async () => {
  const args = parseArgs(process.argv);
  if (!args.base && !args.serve) {
    console.error("Need --base URL or --serve /path/to/repo");
    process.exit(2);
  }
  const outDir = args.outDir || "/tmp/ll-tests";
  fs.mkdirSync(outDir, { recursive: true });

  let server = null;
  let base = args.base;
  if (args.serve) {
    const port = 8765;
    server = await startStaticServer(path.resolve(args.serve), port);
    base = "http://127.0.0.1:" + port + "/";
    console.log("Serving", args.serve, "at", base);
  }
  if (!base.endsWith("/")) base += "/";

  const puppeteer = loadPuppeteer();
  const browser = await puppeteer.launch({
    executablePath: chromePath(),
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(45000);
  await page.setViewport({ width: 1280, height: 900 });
  page.on("pageerror", (err) => console.log("PAGEERROR", err.message));

  const started = new Date();
  try {
    await preparePage(page, base);
    await installWalker(page);
    const storage = await page.evaluate(() => STORAGE_KEY);
    if (storage !== STORAGE_KEY) {
      console.error("STORAGE_KEY changed:", storage);
    }
    const result = await runSuite(page, args);
    const title = base;
    const report = {
      base,
      started: started.toISOString(),
      finished: new Date().toISOString(),
      storageKey: STORAGE_KEY,
      pass: result.passCount,
      fail: result.failCount,
      total: result.rows.length,
      rows: result.rows,
    };
    fs.writeFileSync(path.join(outDir, "clickthrough.json"), JSON.stringify(report, null, 2));
    fs.writeFileSync(path.join(outDir, "clickthrough.md"), matrixMarkdown(result.rows, title));
    console.log("\nSUMMARY", "pass=" + result.passCount, "fail=" + result.failCount, "total=" + result.rows.length);
    console.log("Wrote", path.join(outDir, "clickthrough.md"));
    if (result.failCount) process.exitCode = 1;
  } finally {
    await browser.close().catch(() => {});
    if (server) server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
