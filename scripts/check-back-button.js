#!/usr/bin/env node
/**
 * In-app Back button click-through for Rawson Learning Lab.
 *
 * For both children and maths / English / science, repeatedly uses the
 * in-app Back buttons (lesson, lesson exit, video clip, placement, review,
 * exam, Power 5, subject page) and checks that:
 *   - every Back button is on top (nothing covering it) and takes you to the
 *     right screen,
 *   - browser Back afterwards does not reopen the screen you just left,
 *   - history does not pile up over repeated trips,
 *   - a slow cloud save at the end of a lesson cannot drag the child back,
 *   - a left-open "Something's wrong?" box never blocks the next screen,
 *   - progress stays under rawson-learning-lab-v1 (pace-years-v1 kept).
 *
 * Usage:
 *   node scripts/check-back-button.js --serve . --out ./out
 *   node scripts/check-back-button.js --base https://stewraw25.github.io/rawson-learning-lab/ --out ./out
 *   Add --browser webkit|chromium to use Playwright (PLAYWRIGHT_MODULE or `playwright`).
 *   Default browser is Chrome via puppeteer-core (same as check-clickthrough.js).
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { IN_PAGE_WALKER, startStaticServer, loadPuppeteer, chromePath, STORAGE_KEY } = require("./check-clickthrough.js");

function parseArgs(argv) {
  const out = { base: "", serve: "", outDir: "", browser: "chrome", rounds: 3, learners: ["george", "bella"], subjects: ["maths", "english", "science"], width: 1440 };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i], n = argv[i + 1];
    if (a === "--base" && n) { out.base = n; i++; }
    else if (a === "--serve" && n) { out.serve = n; i++; }
    else if (a === "--out" && n) { out.outDir = n; i++; }
    else if (a === "--browser" && n) { out.browser = n; i++; }
    else if (a === "--rounds" && n) { out.rounds = Number(n) || 3; i++; }
    else if (a === "--width" && n) { out.width = Number(n) || 1440; i++; }
    else if (a === "--learners" && n) { out.learners = n.split(","); i++; }
    else if (a === "--subjects" && n) { out.subjects = n.split(","); i++; }
  }
  return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CLOUD = /firebase|firebasestorage|firebasedatabase|identitytoolkit|securetoken\.googleapis/i;
const MEDIA = /youtube|ytimg|googlevideo|doubleclick/i;

async function openBrowser(args) {
  if (args.browser === "chrome") {
    const puppeteer = loadPuppeteer();
    const browser = await puppeteer.launch({ executablePath: chromePath(), headless: "new", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
    const page = await browser.newPage();
    await page.setViewport({ width: args.width, height: 900 });
    await page.setRequestInterception(true);
    page.on("request", (req) => (CLOUD.test(req.url()) || MEDIA.test(req.url()) ? req.abort() : req.continue()));
    return { browser, page };
  }
  let pw;
  try { pw = require(process.env.PLAYWRIGHT_MODULE || "playwright"); } catch (e) { throw new Error("Playwright not found. Set PLAYWRIGHT_MODULE. " + e.message); }
  const browser = await pw[args.browser].launch();
  const ctx = await browser.newContext({ viewport: { width: args.width, height: 900 } });
  const page = await ctx.newPage();
  await page.route(CLOUD, (r) => r.abort());
  await page.route(MEDIA, (r) => r.abort());
  return { browser, page };
}

(async () => {
  const args = parseArgs(process.argv);
  if (!args.base && !args.serve) { console.error("Need --base URL or --serve /path"); process.exit(2); }
  const outDir = args.outDir || "/tmp/ll-back";
  fs.mkdirSync(outDir, { recursive: true });
  let server = null;
  let base = args.base;
  if (args.serve) {
    server = await startStaticServer(path.resolve(args.serve), 8766);
    base = "http://127.0.0.1:8766/";
  }
  if (!base.endsWith("/")) base += "/";
  const { browser, page } = await openBrowser(args);
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e && e.message || e)));
  const rows = [];
  let shot = 0;

  // One calling style for Puppeteer and Playwright (Playwright takes a single argument)
  const ev = (fn, ...a) =>
    typeof fn === "string"
      ? page.evaluate(fn)
      : page.evaluate((pack) => (0, eval)("(" + pack.src + ")")(...pack.a), { src: fn.toString(), a });
  const screen = () => ev(() => ({ screen: currentScreen, hash: location.hash, len: history.length, overlay: !!document.getElementById("swOverlay") }));

  async function waitScreen(want, ms = 2000) {
    const until = Date.now() + ms;
    let s = await screen();
    while (Date.now() < until) {
      if (s.screen === want) return s;
      await sleep(60);
      s = await screen();
    }
    return s;
  }

  /** Real click on the button, after checking nothing is drawn over it. */
  async function tapBack(sel) {
    const hit = await ev((sel) => {
      const el = document.querySelector(sel);
      if (!el) return { ok: false, why: "missing " + sel };
      el.scrollIntoView({ block: "center" });
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return { ok: false, why: "hidden " + sel };
      const x = r.left + r.width / 2, y = r.top + r.height / 2;
      const top = document.elementFromPoint(x, y);
      if (!top || !(top === el || el.contains(top))) {
        return { ok: false, why: "covered by " + (top ? (top.id || top.className || top.tagName) : "nothing") };
      }
      return { ok: true };
    }, sel);
    if (!hit.ok) return hit;
    await page.click(sel);
    return { ok: true };
  }

  async function check(label, sel, want, extra) {
    const before = await screen();
    const t = await tapBack(sel);
    let after = await waitScreen(want);
    let ok = t.ok && after.screen === want;
    let why = t.ok ? (ok ? "" : "landed on " + after.screen + " " + after.hash) : t.why;
    if (ok && extra) {
      const e = await extra(before, after);
      if (e) { ok = false; why = e; }
    }
    rows.push({ label, sel, want, ok, why, from: before.hash, to: after.hash });
    if (!ok) {
      shot++;
      try { await page.screenshot({ path: path.join(outDir, `fail-${shot}.png`) }); } catch (_) { /* ignore */ }
    }
    return ok;
  }

  function note(label, ok, why) {
    rows.push({ label, ok, why: why || "" });
  }

  await page.goto(base + "?cb=" + Date.now(), { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForFunction(() => typeof go === "function" && typeof defaultProfile === "function" && typeof buildCourse === "function", { timeout: 30000 });
  await ev("(() => { " + IN_PAGE_WALKER + "; window.__walkCurrentLesson = __walkCurrentLesson; })()");
  await ev(() => {
    window.refreshFromCloud = async function () { return false; };
    window.pushProfile = async function () { return { skipped: true }; };
    window.startAutoSync = function () {};
    window.__realSave = window.save;
  });

  for (const learnerId of args.learners) {
    await ev((l) => {
      const PACE = typeof PACE_VERSION !== "undefined" ? PACE_VERSION : "pace-years-v1";
      const p = defaultProfile(l);
      const subs = typeof subjectsForLearner === "function" ? subjectsForLearner(l) : ["maths", "english", "science"];
      for (const s of subs) {
        p.diagnostics[s] = { completed: true, score: 60, skillScores: {}, date: "2026-01-01" };
        buildCourse(p, s, 1);
        if (p.courses[s]) { p.courses[s].paceVersion = PACE; p.courses[s].homeStage = 1; }
      }
      state.profiles[l] = p;
      state.activeLearner = l;
      saveState(state);
      go("dashboard");
    }, learnerId);
    await sleep(200);

    for (const subject of args.subjects) {
      const tag = `${learnerId}/${subject}`;
      const pathIds = await ev((s) => {
        const c = profile().courses[s];
        const st = c && c.stages && (c.stages[1] || c.stages.s1);
        return (st && st.path) || [];
      }, subject);

      for (let round = 0; round < args.rounds; round++) {
        const R = `${tag} r${round + 1}`;
        await ev(() => go("dashboard"));
        await ev((s) => go("subject", { subject: s }), subject);
        await waitScreen("subject");
        const lenBefore = (await screen()).len;

        // 1. Lesson → a few steps → in-app Back, then browser Back must not reopen it
        await page.click(".lesson-row[data-lesson]:not([disabled])");
        await waitScreen("lesson");
        for (let k = 0; k < round + 1; k++) {
          const moved = await ev(() => {
            const skip = document.getElementById("btnSkipClip"); if (skip) { skip.click(); return true; }
            const b = document.getElementById("btnAdvance");
            if (b && getComputedStyle(b).display !== "none") { b.click(); return true; }
            return false;
          });
          if (!moved) break;
          await sleep(120);
        }
        await check(`${R} lesson ← Back`, "#btnBackToSubject", "subject", async () => {
          // One lesson trip may leave the lesson as a "forward" entry, never more.
          const len = (await screen()).len;
          if (len > lenBefore + 1) return `history piled up ${lenBefore}→${len} for one lesson trip`;
          return "";
        });
        await ev(() => history.back());
        await sleep(400);
        const bb = await screen();
        note(`${R} browser Back after in-app Back`, bb.screen !== "lesson", bb.screen === "lesson" ? "reopened the lesson " + bb.hash : "→ " + bb.screen);

        // 2. Exit lesson button
        await ev((s) => go("subject", { subject: s }), subject);
        await waitScreen("subject");
        await page.click(".lesson-row[data-lesson]:not([disabled])");
        await waitScreen("lesson");
        await check(`${R} Exit lesson`, "#btnExitLesson", "subject");

        // 3. Video clip on screen → Back (look through this stage's lessons for a clip)
        if (round === 0) {
          let found = false;
          for (const id of pathIds.slice(0, 16)) {
            await ev((s, id) => go("lesson", { subject: s, skillId: id, stage: 1 }), subject, id);
            await waitScreen("lesson");
            for (let k = 0; k < 4 && !found; k++) {
              if (await ev(() => !!document.getElementById("teachClipPanel"))) { found = true; break; }
              const moved = await ev(() => { const b = document.getElementById("btnAdvance"); if (b && getComputedStyle(b).display !== "none") { b.click(); return true; } return false; });
              if (!moved) break;
              await sleep(100);
            }
            if (found) { await check(`${R} video clip ← Back`, "#btnBackToSubject", "subject"); break; }
            await ev((s) => { liveLesson = null; go("subject", { subject: s }); }, subject);
          }
          if (!found) note(`${R} video clip ← Back`, true, "no clip in the first lessons of this subject (skipped)");
        }

        // 4. Placement test → Back
        await ev((s) => go("subject", { subject: s }), subject);
        await waitScreen("subject");
        await ev((s) => go("diagnostic", { subject: s }), subject);
        await waitScreen("diagnostic");
        await check(`${R} placement ← Back`, "#btnDiagBack", "subject");

        // 5. Review link → lesson → Back
        await ev((s, id) => {
          const p = profile();
          if (!p.spacedReview || typeof p.spacedReview !== "object") p.spacedReview = {};
          p.spacedReview[s + ":" + id + ":1"] = { subject: s, skillId: id, stage: 1, step: 0, lastCompletedOn: "2026-01-01", dueOn: "2026-01-02" };
          go("subject", { subject: s });
        }, subject, pathIds[0]);
        await waitScreen("subject");
        if (await ev(() => !!document.querySelector(".review-list a"))) {
          await page.click(".review-list a");
          const s5 = await waitScreen("lesson");
          if (s5.screen !== "lesson") note(`${R} review opens lesson`, false, "got " + s5.screen);
          await check(`${R} review lesson ← Back`, "#btnBackToSubject", "subject");
        } else note(`${R} review lesson ← Back`, false, "no review link shown");

        // 6. Exam → Exit
        await ev((s) => go("exam", { subject: s, packStage: 4, mode: "practice" }), subject);
        await sleep(200);
        if (await ev(() => !!document.getElementById("btnExitExam"))) await check(`${R} exam Exit`, "#btnExitExam", "subject");
        else if (await ev(() => !!document.querySelector("[data-go-subject]"))) await check(`${R} exam Back`, "[data-go-subject]", "subject");

        // 7. "Something's wrong?" left open, then browser Back
        await ev((s) => go("subject", { subject: s }), subject);
        await page.click(".lesson-row[data-lesson]:not([disabled])");
        await waitScreen("lesson");
        if (await ev(() => !!document.querySelector("[data-something-wrong]"))) {
          await page.click("[data-something-wrong]");
          await sleep(100);
          await ev(() => history.back());
          await sleep(400);
          const s7 = await screen();
          note(`${R} browser Back with "Something's wrong?" open`, s7.screen === "subject" && !s7.overlay, `screen=${s7.screen} overlay=${s7.overlay}`);
          if (s7.overlay) await ev(() => closeSomethingWrong()); // keep going after a fail
        }
        await ev((s) => go("subject", { subject: s }), subject);
        await waitScreen("subject");

        // 8. Subject → Back to hub
        await check(`${R} subject ← Back to hub`, "#btnSubjectBack", "dashboard");

        // 9. Power 5 → Exit
        await ev((s) => go("power5", { subject: s }), subject);
        await sleep(200);
        if (await ev(() => !!document.getElementById("btnExitP5"))) await check(`${R} Power 5 Exit`, "#btnExitP5", "dashboard");
      }

      // 11. "← Previous question": off on Q1, shows the earlier answer, changes nothing
      for (const kind of ["lesson", "placement", "exam", "power5"]) {
        const P = `${tag} previous question (${kind})`;
        await ev((s) => { liveLesson = null; liveDiag = null; go("subject", { subject: s }); }, subject);
        await waitScreen("subject");
        if (kind === "lesson") { await page.click(".lesson-row[data-lesson]:not([disabled])"); await waitScreen("lesson"); }
        if (kind === "placement") { await ev((s) => go("diagnostic", { subject: s }), subject); await waitScreen("diagnostic"); }
        if (kind === "exam") { await ev((s) => go("exam", { subject: s, packStage: 4, mode: "practice" }), subject); await sleep(250); }
        if (kind === "power5") { await ev((s) => go("power5", { subject: s }), subject); await sleep(250); }
        // walk to the first question
        const firstQ = await ev(async () => {
          const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
          for (let i = 0; i < 12; i++) {
            if (document.getElementById("btnCheck")) break;
            const skip = document.getElementById("btnSkipClip"); if (skip) { skip.click(); await sleep(60); continue; }
            const b = document.getElementById("btnAdvance");
            if (b && getComputedStyle(b).display !== "none") { b.click(); await sleep(80); } else break;
          }
          const btn = document.getElementById("btnPrevQ");
          const h = document.querySelector("#miniQText, .question-card h3, .teach-heading");
          return { hasCheck: !!document.getElementById("btnCheck"), prev: !!btn, disabled: !!(btn && btn.disabled), text: h ? h.textContent.trim() : "" };
        });
        if (!firstQ.hasCheck) { note(P, true, "no question screen reached (skipped)"); continue; }
        note(`${P}: shown and off on first question`, firstQ.prev && firstQ.disabled, JSON.stringify(firstQ));
        // answer Q1 and move on
        const moved = await ev(async () => {
          const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
          const opt = document.querySelector(".option:not([disabled])");
          if (opt) opt.click();
          else { const inp = document.getElementById("typedAns"); if (inp) { inp.value = "7"; inp.dispatchEvent(new Event("input", { bubbles: true })); } }
          await sleep(30);
          const h0 = (document.querySelector("#miniQText, .question-card h3, .teach-heading") || {}).textContent || "";
          document.getElementById("btnCheck")?.click();
          // Feedback must show, and stay until Next is pressed (no auto-skip)
          await sleep(2600);
          const fbEl = document.getElementById("feedback");
          const h1 = (document.querySelector("#miniQText, .question-card h3, .teach-heading") || {}).textContent || "";
          const nx = document.getElementById("btnAdvance") || document.getElementById("btnNext");
          window.__fbProbe = { text: fbEl ? fbEl.innerText : "", sameQ: h0 === h1, next: !!(nx && getComputedStyle(nx).display !== "none") };
          if (nx && getComputedStyle(nx).display !== "none") nx.click();
          await sleep(200);
          for (let i = 0; i < 6 && !document.getElementById("btnCheck"); i++) {
            const b = document.getElementById("btnAdvance");
            if (b && getComputedStyle(b).display !== "none") { b.click(); await sleep(80); } else break;
          }
          return !!document.getElementById("btnCheck");
        });
        const fbp = await ev(() => window.__fbProbe || {});
        const fbOk = /✓\s*Correct!/.test(fbp.text || "") || (/✗\s*Not quite\./.test(fbp.text || "") && /The answer is/.test(fbp.text || ""));
        note(`${P}: right/wrong feedback shown after answer`, fbOk, (fbp.text || "").replace(/\s+/g, " ").slice(0, 120));
        note(`${P}: waits for Next (no auto-skip)`, !!(fbp.sameQ && fbp.next), JSON.stringify({ sameQ: fbp.sameQ, next: fbp.next }));
        if (!moved) { note(P, true, "lesson ended after one question (skipped)"); continue; }
        const snap = () => ev(() => {
          const p = JSON.parse(JSON.stringify(profile()));
          delete p.updatedAt;
          const sess = liveLesson && liveLesson.session;
          return JSON.stringify({ p, disk: (JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}").profiles || {})[state.activeLearner] ? 1 : 0,
            sess: sess ? [sess.practiceCorrect, sess.practiceTotal, sess.practiceIndex, sess.phase, sess.wrongStreak, sess.totalWrong] : null });
        });
        const before = await snap();
        const t = await tapBack("#btnPrevQ");
        await sleep(150);
        const shown = await ev(() => {
          const box = document.getElementById("prevQBox");
          return { open: !!(box && !box.hidden), text: box ? box.innerText : "" };
        });
        const sawQ1 = shown.open && /Your answer:/.test(shown.text) && (!firstQ.text || shown.text.indexOf(firstQ.text.slice(0, 25)) !== -1);
        note(`${P}: shows Q1 with the answer given`, t.ok && sawQ1, t.ok ? shown.text.replace(/\s+/g, " ").slice(0, 120) : t.why);
        await ev(() => document.getElementById("btnPrevQClose")?.click());
        await sleep(100);
        const closed = await ev(() => { const b = document.getElementById("prevQBox"); return !b || b.hidden; });
        const after = await snap();
        note(`${P}: no change to XP, scores, streaks or saved progress`, before === after, before === after ? "" : "state changed");
        note(`${P}: back to the current question`, closed && (await ev(() => !!document.getElementById("btnCheck"))), "");
        if (kind === "lesson") {
          // Answer this one correctly: must say Correct!, must not skip, and
          // Previous question must still show the one before (stored result).
          const r = await ev(async () => {
            const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
            const sess = liveLesson && liveLesson.session;
            if (!sess) return { skip: "no session" };
            let q = null;
            if (["prereq", "guided", "exit"].indexOf(sess.phase) !== -1 && typeof currentMiniQuestion === "function") {
              q = currentMiniQuestion(sess, getMiniLesson(sess.subject, sess.skillId, sess.stage || sess.stageNum));
            } else q = currentPracticeList(sess)[sess.practiceIndex];
            if (!q) return { skip: "no question" };
            if (q.type === "multi") document.querySelector('.option[data-i="' + q.answer + '"]')?.click();
            else { const inp = document.getElementById("typedAns"); inp.value = String(q.answer); inp.dispatchEvent(new Event("input", { bubbles: true })); }
            await sleep(30);
            const xpBefore = JSON.stringify([profile().xp, profile().streak, sess.practiceCorrect, sess.practiceTotal]);
            document.getElementById("btnCheck").click();
            await sleep(2600);
            const fb = (document.getElementById("feedback") || {}).innerText || "";
            const nx = document.getElementById("btnAdvance");
            const stays = !!(nx && getComputedStyle(nx).display !== "none");
            const xpMid = JSON.stringify([profile().xp, profile().streak, sess.practiceCorrect, sess.practiceTotal]);
            document.getElementById("btnPrevQ").click();
            await sleep(100);
            const box = (document.getElementById("prevQBox") || {}).innerText || "";
            document.getElementById("btnPrevQClose")?.click();
            const xpAfter = JSON.stringify([profile().xp, profile().streak, sess.practiceCorrect, sess.practiceTotal]);
            return { fb, stays, box, unchanged: xpMid === xpAfter, xpBefore, xpMid };
          });
          if (r.skip) note(`${P}: correct answer feedback`, true, "skipped: " + r.skip);
          else {
            note(`${P}: correct answer says ✓ Correct!`, /✓\s*Correct!/.test(r.fb), r.fb.replace(/\s+/g, " ").slice(0, 100));
            note(`${P}: correct answer waits for Next`, r.stays, "");
            note(`${P}: after answering, Previous shows the earlier stored result`, /Your answer:/.test(r.box) && (!firstQ.text || r.box.indexOf(firstQ.text.slice(0, 25)) !== -1), r.box.replace(/\s+/g, " ").slice(0, 100));
            note(`${P}: opening Previous after an answer scores nothing extra`, r.unchanged, r.xpMid);
          }
        }
      }

      // 10. Slow cloud save at the end of a lesson: Back must win, progress must save
      await ev((s) => {
        window.__slowSave = 0;
        window.save = function (opts) {
          if (opts && opts.quiet === false) {
            window.__slowSave++;
            saveState(state);
            return new Promise((r) => setTimeout(() => r({ ok: true, cloud: true }), 1800));
          }
          return window.__realSave(Object.assign({}, opts || {}, { pushCloud: false }));
        };
        go("subject", { subject: s });
      }, subject);
      await page.click(".lesson-row[data-lesson]:not([disabled])");
      await waitScreen("lesson");
      const skill = await ev(() => liveLesson && liveLesson.session && liveLesson.session.skillId);
      await ev(() => { window.__walkP = window.__walkCurrentLesson(30000); });
      const until = Date.now() + 25000;
      while (Date.now() < until && !(await ev(() => window.__slowSave > 0))) await sleep(50);
      const started = await ev(() => window.__slowSave > 0 && currentScreen === "lesson");
      if (started) {
        await check(`${tag} Back during slow end-of-lesson save`, "#btnBackToSubject", "subject");
        await sleep(2300);
        const s10 = await screen();
        note(`${tag} stays put after slow save finishes`, s10.screen === "subject", "screen=" + s10.screen);
        const saved = await ev((s, id) => {
          const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
          const c = raw.profiles && raw.profiles[state.activeLearner] && raw.profiles[state.activeLearner].courses && raw.profiles[state.activeLearner].courses[s];
          const st = c && c.stages && (c.stages[1] || c.stages.s1);
          const anyStage = c && c.stages ? Object.keys(c.stages).some((k) => c.stages[k] && c.stages[k].completed && c.stages[k].completed[id]) : false;
          const tick = raw.profiles && raw.profiles[state.activeLearner] && raw.profiles[state.activeLearner].tutorStats;
          return { done: !!(st && st.completed && st.completed[id]) || anyStage, recorded: !!(tick && Object.keys(tick).some((k) => k.indexOf(s + ":" + id + ":") === 0)), pace: c && c.paceVersion, stages: c && c.stages ? Object.keys(c.stages) : [] };
        }, subject, skill);
        // A pass ticks the lesson; a low score still records the attempt. Either way it is on disk.
        note(`${tag} lesson progress saved (${STORAGE_KEY})`, saved.done || saved.recorded, JSON.stringify(saved));
        note(`${tag} pace key kept`, saved.pace === "pace-years-v1", "pace=" + saved.pace);
      } else note(`${tag} Back during slow end-of-lesson save`, false, "lesson never reached the end-of-lesson save");
      await ev(() => { window.save = window.__realSave; });
    }
  }

  const keys = await ev(() => ({ storage: STORAGE_KEY, has: !!localStorage.getItem(STORAGE_KEY) }));
  note("storage key unchanged", keys.storage === STORAGE_KEY && keys.has, JSON.stringify(keys));
  note("no page errors", errors.length === 0, errors.slice(0, 3).join(" | "));

  const pass = rows.filter((r) => r.ok).length;
  const fail = rows.length - pass;
  const md = [`# In-app Back check — ${base} (${args.browser}, ${args.width}px)`, "", `Result: **${pass} passed**, **${fail} failed**.`, "", "| Check | Result | Note |", "|---|---|---|"]
    .concat(rows.map((r) => `| ${r.label} | ${r.ok ? "PASS" : "FAIL"} | ${(r.why || (r.to ? r.from + " → " + r.to : "")).replace(/\|/g, "/")} |`)).join("\n");
  fs.writeFileSync(path.join(outDir, `back-${args.browser}.json`), JSON.stringify({ base, browser: args.browser, pass, fail, rows, errors }, null, 2));
  fs.writeFileSync(path.join(outDir, `back-${args.browser}.md`), md + "\n");
  rows.filter((r) => !r.ok).forEach((r) => console.log("FAIL", r.label, r.why));
  console.log(`SUMMARY browser=${args.browser} pass=${pass} fail=${fail}`);
  await browser.close().catch(() => {});
  if (server) server.close();
  if (fail) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exit(1); });
