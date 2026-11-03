/**
 * George’s karting season and investing pot.
 *
 * Why questions used to repeat: each lesson only kept about three prompts.
 * Once those sat in the short “recent” list, the picker gave up and served
 * the same three again (Power 5 did the same). Misses were not stored.
 *
 * Now a correct answer is retired for good. A miss is kept and comes back
 * on purpose. A practice lap is the only other way to see a cleared question.
 * Progress lives on the profile, which already saves to localStorage.
 */

function georgeIsJourneySubject(subject) {
  return (
    subject === "karting" ||
    subject === "investing" ||
    subject === "f1" ||
    subject === "horseworld"
  );
}

function georgeQuestionFingerprint(q) {
  if (typeof questionFingerprint === "function") return questionFingerprint(q);
  if (!q) return "";
  return String(q.q || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .slice(0, 120);
}

function georgeRowToQuestion(row) {
  const q = {
    q: row[0],
    type: "multi",
    options: row[1].slice(),
    answer: row[2],
    explain: row[3],
    diff: row[4] || 1,
    stage: "both",
  };
  if (row[5]) q.week = row[5];
  return q;
}

function georgeEnsureModule(subject, skillId, stage) {
  const title =
    (typeof SKILLS !== "undefined" && SKILLS[subject] && SKILLS[subject][skillId] && SKILLS[subject][skillId].name) ||
    skillId;
  const blank = () =>
    typeof funMod === "function"
      ? funMod(
          title,
          "",
          ["Read the question, then pick the best answer."],
          ["Think about what you just learned."],
          [],
          ["Start with the simplest idea."],
          {
            q: "Ready?",
            type: "multi",
            options: ["Yes", "Not yet"],
            answer: 0,
            explain: "When you are ready, try the questions.",
            stage: "both",
          }
        )
      : {
          title,
          blurb: "",
          teach: { points: [], visual: "" },
          example: { title: "Example", steps: [] },
          practice: [],
          struggle: { points: [], practice: [] },
        };

  if (stage <= 1) {
    if (typeof TEACH_MODULES === "undefined") return null;
    if (!TEACH_MODULES[subject]) TEACH_MODULES[subject] = {};
    if (!TEACH_MODULES[subject][skillId]) TEACH_MODULES[subject][skillId] = blank();
    return TEACH_MODULES[subject][skillId];
  }
  const fun = typeof funStageBank === "function" ? funStageBank(subject) : null;
  if (!fun) return null;
  if (!fun[stage]) fun[stage] = {};
  if (!fun[stage][skillId]) fun[stage][skillId] = blank();
  return fun[stage][skillId];
}

function installGeorgeBanks() {
  if (typeof TEACH_MODULES === "undefined") return;
  const packs = [
    ["karting", typeof GEORGE_KART_BANK !== "undefined" ? GEORGE_KART_BANK : null],
    ["investing", typeof GEORGE_INVEST_BANK !== "undefined" ? GEORGE_INVEST_BANK : null],
  ];
  for (const [subject, bank] of packs) {
    if (!bank) continue;
    for (const skillId of Object.keys(bank)) {
      const byStage = bank[skillId] || {};
      for (let stage = 1; stage <= 6; stage++) {
        const rows = byStage[stage];
        if (!rows || !rows.length) continue;
        const questions = rows.map(georgeRowToQuestion);
        const mod = georgeEnsureModule(subject, skillId, stage);
        if (!mod) continue;
        mod.practice = questions;
        const easy = questions.filter((q) => (Number(q.diff) || 1) <= 1).slice(0, 2);
        if (!mod.struggle || typeof mod.struggle !== "object") {
          mod.struggle = { points: [], practice: [] };
        }
        mod.struggle.practice = (easy.length ? easy : questions.slice(0, 1)).map((q) => ({
          ...q,
        }));
      }
    }
  }
  if (typeof funInstallStages === "function") {
    try {
      funInstallStages();
    } catch (_) {
      /* ignore */
    }
  }
}

function ensureJourney(profile, subject) {
  if (!profile) return { correct: [], retry: [], stars: {} };
  if (!profile.journey || typeof profile.journey !== "object" || Array.isArray(profile.journey)) {
    profile.journey = {};
  }
  if (!subject) return profile.journey;
  let j = profile.journey[subject];
  if (!j || typeof j !== "object" || Array.isArray(j)) j = {};
  if (!Array.isArray(j.correct)) j.correct = [];
  if (!Array.isArray(j.retry)) j.retry = [];
  if (!j.stars || typeof j.stars !== "object" || Array.isArray(j.stars)) j.stars = {};
  profile.journey[subject] = j;
  return j;
}

function mergeJourney(a, b) {
  const A = a && typeof a === "object" && !Array.isArray(a) ? a : {};
  const B = b && typeof b === "object" && !Array.isArray(b) ? b : {};
  const out = {};
  const subs = new Set([...Object.keys(A), ...Object.keys(B)]);
  for (const sub of subs) {
    const x = A[sub] && typeof A[sub] === "object" ? A[sub] : {};
    const y = B[sub] && typeof B[sub] === "object" ? B[sub] : {};
    const correct = [
      ...new Set([...(x.correct || []), ...(y.correct || [])].filter(Boolean)),
    ].slice(-800);
    const correctSet = new Set(correct);
    const retry = [
      ...new Set([...(x.retry || []), ...(y.retry || [])].filter(Boolean)),
    ]
      .filter((fp) => !correctSet.has(fp))
      .slice(-200);
    const stars = {};
    const keys = new Set([
      ...Object.keys(x.stars || {}),
      ...Object.keys(y.stars || {}),
    ]);
    for (const k of keys) {
      stars[k] = Math.max(Number(x.stars && x.stars[k]) || 0, Number(y.stars && y.stars[k]) || 0);
    }
    out[sub] = { correct, retry, stars };
  }
  return out;
}

function journeyStarKey(stage, skillId) {
  return `s${Number(stage) || 1}:${skillId}`;
}

function journeyStarsFor(profile, subject, skillId, stage) {
  const log = ensureJourney(profile, subject);
  const n = Number(log.stars[journeyStarKey(stage, skillId)]) || 0;
  if (!n) return "";
  return "★".repeat(n) + "☆".repeat(Math.max(0, 3 - n));
}

function journeyPool(subject, skillId, stage, learnerId) {
  if (typeof installGeorgeBanks === "function") installGeorgeBanks();
  let mod = null;
  if (typeof getTeachModule === "function") {
    mod = getTeachModule(subject, skillId, stage, learnerId || null);
  }
  const list = (mod && mod.practice) || [];
  return list
    .map((q, i) => ({
      ...q,
      _src: "main",
      _i: i,
      _diff: Number(q.diff) || 1,
      _stage: Number(stage) || 1,
      _skillId: skillId,
    }))
    .sort((a, b) => a._diff - b._diff || a._i - b._i);
}

function buildJourneyQueue(mod, profile, subject, extra) {
  extra = extra || {};
  const stage = Number(extra.stage) || 1;
  const skillId = extra.skillId || (mod && mod.skillId) || null;
  const learnerId = extra.learnerId || (profile && profile.id) || null;
  const mode = extra.mode || "";
  let pool = skillId ? journeyPool(subject, skillId, stage, learnerId) : [];
  if (!pool.length && mod && Array.isArray(mod.practice)) {
    pool = mod.practice.map((q, i) => ({
      ...q,
      _src: "main",
      _i: i,
      _diff: Number(q.diff) || 1,
      _stage: stage,
    }));
    pool.sort((a, b) => a._diff - b._diff || a._i - b._i);
  }
  if (mode === "lap") {
    return pool.slice(0, 4).map((q) => ({ ...q, _deliberate: true, _src: "lap" }));
  }
  const log = ensureJourney(profile, subject);
  const correct = new Set(log.correct || []);
  const retry = new Set(log.retry || []);
  const seen = new Set();
  const queue = [];
  for (const q of pool) {
    const fp = georgeQuestionFingerprint(q);
    if (!fp || seen.has(fp) || correct.has(fp)) continue;
    seen.add(fp);
    queue.push(retry.has(fp) ? { ...q, _retry: true, _src: "retry" } : q);
  }
  if (mode === "retry") return queue.filter((q) => q._retry);
  return queue;
}

function journeyLessonStatus(profile, subject, skillId, stage) {
  const pool = journeyPool(subject, skillId, stage, profile && profile.id);
  const log = ensureJourney(profile, subject);
  const correct = new Set(log.correct || []);
  const retry = new Set(log.retry || []);
  let open = 0;
  let misses = 0;
  for (const q of pool) {
    const fp = georgeQuestionFingerprint(q);
    if (!fp || correct.has(fp)) continue;
    open++;
    if (retry.has(fp)) misses++;
  }
  return { total: pool.length, open, misses, cleared: Math.max(0, pool.length - open) };
}

function journeyNoteAnswer(profile, subject, question, ok) {
  if (!profile || !georgeIsJourneySubject(subject) || !question) return;
  const fp = georgeQuestionFingerprint(question);
  if (!fp) return;
  const log = ensureJourney(profile, subject);
  const correct = new Set(log.correct.filter(Boolean));
  const retry = new Set(log.retry.filter(Boolean));
  if (ok) {
    correct.add(fp);
    retry.delete(fp);
  } else {
    correct.delete(fp);
    retry.add(fp);
  }
  log.correct = [...correct].slice(-800);
  log.retry = [...retry].filter((fp2) => !correct.has(fp2)).slice(-200);
  profile.updatedAt = Date.now();
  try {
    if (typeof state !== "undefined" && typeof saveState === "function") saveState(state);
  } catch (_) {
    /* ignore */
  }
}

/** One deliberate retry at the end of this sitting. Never loops. */
function journeyScheduleRetry(session, question) {
  if (!session || !question || !georgeIsJourneySubject(session.subject)) return;
  const fp = georgeQuestionFingerprint(question);
  if (!fp) return;
  session._journeyRetried = session._journeyRetried || {};
  if (session._journeyRetried[fp]) return;
  const later = (session.queue || []).slice((Number(session.practiceIndex) || 0) + 1);
  if (later.some((q) => georgeQuestionFingerprint(q) === fp)) return;
  session._journeyRetried[fp] = true;
  session.queue = [...(session.queue || []), { ...question, _retry: true, _src: "retry" }];
}

function journeyAwardLesson(profile, subject, skillId, stage, scorePct) {
  if (!profile || (subject !== "horses" && !georgeIsJourneySubject(subject))) return 0;
  const log = ensureJourney(profile, subject);
  const key = journeyStarKey(stage, skillId);
  const pct = Number(scorePct) || 0;
  let stars = 1;
  if (pct >= 90) stars = 3;
  else if (pct >= 70) stars = 2;
  const prev = Number(log.stars[key]) || 0;
  if (stars > prev) log.stars[key] = stars;
  journeyAwardBadges(profile, subject);
  profile.updatedAt = Date.now();
  return Number(log.stars[key]) || stars;
}

function journeyStarPoints(subject, stars) {
  const n = Number(stars) || 0;
  if (subject === "investing") return n >= 3 ? 500 : n === 2 ? 200 : n === 1 ? 100 : 0;
  return n >= 3 ? 25 : n === 2 ? 18 : n === 1 ? 10 : 0;
}

function journeyScore(profile, subject) {
  const log = ensureJourney(profile, subject);
  let points = 0;
  let starSum = 0;
  for (const n of Object.values(log.stars || {})) {
    points += journeyStarPoints(subject, n);
    starSum += Number(n) || 0;
  }
  return { points, starSum, retries: (log.retry || []).length };
}

function journeyStageStarSum(profile, subject, stage) {
  const log = ensureJourney(profile, subject);
  const prefix = `s${Number(stage) || 1}:`;
  let sum = 0;
  for (const [k, n] of Object.entries(log.stars || {})) {
    if (String(k).indexOf(prefix) === 0) sum += Number(n) || 0;
  }
  return sum;
}

function journeyAwardBadges(profile, subject) {
  if (!profile || typeof unlockBadge !== "function") return;
  const score = journeyScore(profile, subject);
  const stageDone = (n) =>
    typeof isStageComplete === "function" && isStageComplete(profile, subject, n);
  if (subject === "karting") {
    if (score.starSum >= 1) unlockBadge(profile, "kart_outlap");
    if (stageDone(1)) unlockBadge(profile, "kart_first_laps");
    for (let s = 1; s <= 6; s++) {
      if (stageDone(s)) unlockBadge(profile, "kart_podium");
    }
    if (stageDone(6)) unlockBadge(profile, "kart_champion");
    if (Object.values(ensureJourney(profile, subject).stars).some((n) => Number(n) >= 3)) {
      unlockBadge(profile, "kart_hattrick");
    }
  }
  if (subject === "investing") {
    if (score.starSum >= 1) unlockBadge(profile, "inv_coin");
    if (stageDone(1)) unlockBadge(profile, "inv_pocket");
    if (stageDone(2)) unlockBadge(profile, "inv_snow");
    if (score.points >= 1000) unlockBadge(profile, "inv_jar");
    const stars = ensureJourney(profile, subject).stars;
    if ((Number(stars["s5:patience"]) || 0) >= 1 || (Number(stars["s6:patience"]) || 0) >= 1) {
      unlockBadge(profile, "inv_jisa");
    }
    if ((Number(stars["s5:risk"]) || 0) >= 1 || (Number(stars["s6:risk"]) || 0) >= 1) {
      unlockBadge(profile, "inv_scam");
    }
    if (stageDone(6)) unlockBadge(profile, "inv_long");
  }
  if (subject === "horses") {
    if (score.starSum >= 1) unlockBadge(profile, "horse_hands");
    if (stageDone(1)) unlockBadge(profile, "horse_first_yard");
    if (stageDone(3)) unlockBadge(profile, "horse_riding");
    if (stageDone(6)) unlockBadge(profile, "horse_master");
    if (Object.values(ensureJourney(profile, subject).stars).some((n) => Number(n) >= 3)) {
      unlockBadge(profile, "horse_rosette");
    }
  }
  if (subject === "f1") {
    if (score.starSum >= 1) unlockBadge(profile, "f1_grid");
    if (stageDone(1)) unlockBadge(profile, "f1_flags");
    if (stageDone(6)) unlockBadge(profile, "f1_champion");
    if (Object.values(ensureJourney(profile, subject).stars).some((n) => Number(n) >= 3)) {
      unlockBadge(profile, "f1_hattrick");
    }
  }
  if (subject === "horseworld") {
    if (score.starSum >= 1) unlockBadge(profile, "hw_bridle");
    if (stageDone(1)) unlockBadge(profile, "hw_first");
    if (stageDone(6)) unlockBadge(profile, "hw_master");
    if (Object.values(ensureJourney(profile, subject).stars).some((n) => Number(n) >= 3)) {
      unlockBadge(profile, "hw_rosette");
    }
  }
}

function journeyRoundStats(profile, subject, stage) {
  const ids =
    typeof SKILLS !== "undefined" && SKILLS[subject] ? Object.keys(SKILLS[subject]) : [];
  let open = 0;
  let total = 0;
  let misses = 0;
  for (const id of ids) {
    const st = journeyLessonStatus(profile, subject, id, stage);
    open += st.open;
    total += st.total;
    misses += st.misses;
  }
  return { open, total, misses, cleared: Math.max(0, total - open) };
}

function journeyMissList(profile, subject, uptoStage) {
  const stage = Number(uptoStage) || 1;
  const ids =
    typeof SKILLS !== "undefined" && SKILLS[subject] ? Object.keys(SKILLS[subject]) : [];
  const out = [];
  const seen = new Set();
  for (let s = 1; s <= stage; s++) {
    for (const skillId of ids) {
      const part = buildJourneyQueue(null, profile, subject, {
        skillId,
        stage: s,
        learnerId: profile && profile.id,
        mode: "retry",
      });
      for (const q of part) {
        const fp = georgeQuestionFingerprint(q);
        if (!fp || seen.has(fp)) continue;
        seen.add(fp);
        out.push(q);
      }
    }
  }
  return out;
}

function buildJourneyDrill(profile, subject, count) {
  count = count || 5;
  let mode = "";
  try {
    if (typeof sessionStorage !== "undefined") {
      mode = sessionStorage.getItem("journey-drill") || "";
      if (mode) sessionStorage.removeItem("journey-drill");
    }
  } catch (_) {
    mode = "";
  }
  const stage =
    typeof getActiveStage === "function" ? getActiveStage(profile, subject) || 1 : 1;
  if (mode === "retry") return journeyMissList(profile, subject, stage).slice(0, count);
  const ids =
    typeof SKILLS !== "undefined" && SKILLS[subject] ? Object.keys(SKILLS[subject]) : [];
  const fresh = [];
  for (const skillId of ids) {
    const part = buildJourneyQueue(null, profile, subject, {
      skillId,
      stage,
      learnerId: profile && profile.id,
    });
    for (const q of part) {
      if (!q._retry) fresh.push(q);
    }
  }
  const misses = journeyMissList(profile, subject, stage);
  const seen = new Set();
  const ordered = [];
  for (const q of [...fresh, ...misses]) {
    const fp = georgeQuestionFingerprint(q);
    if (!fp || seen.has(fp)) continue;
    seen.add(fp);
    ordered.push(q);
  }
  return ordered.slice(0, count);
}

function journeyFormatPot(pence) {
  const n = Math.max(0, Math.round(Number(pence) || 0));
  const pounds = Math.floor(n / 100);
  const rest = n % 100;
  return `£${pounds}.${String(rest).padStart(2, "0")}`;
}

function journeyNextGoal(profile, subject, stage) {
  const meta =
    typeof courseStageMeta === "function" ? courseStageMeta(subject, stage) : { name: "this round" };
  const st =
    typeof getCourseStageData === "function" ? getCourseStageData(profile, subject, stage) : null;
  const path = (st && st.path) || [];
  const done = path.filter((id) => st && st.completed && st.completed[id]).length;
  const left = Math.max(0, path.length - done);
  const misses =
    typeof journeyMissList === "function"
      ? journeyMissList(profile, subject, stage).length
      : (ensureJourney(profile, subject).retry || []).length;
  if (subject === "karting" || subject === "f1" || subject === "horseworld" || subject === "horses") {
    if (left > 0) {
      return `Finish ${left} more ${meta.name} lesson${left === 1 ? "" : "s"} to move up.`;
    }
    if (stage < 6) return `${meta.name} is complete — unlock the next round when you are ready.`;
    return "This course is complete. Retry any misses, or take a practice lap.";
  }
  const pot = journeyScore(profile, subject).points;
  const marks = [500, 1000, 2500, 5000, 10000];
  const next = marks.find((m) => pot < m);
  if (misses > 0) {
    return `You have ${misses} miss${misses === 1 ? "" : "es"} to retry. That is the only repeat.`;
  }
  if (next) {
    return `Next pot goal: ${journeyFormatPot(next)} pretend pounds. ${left ? left + " lessons left in " + meta.name + "." : ""}`.trim();
  }
  return "The pretend pot is full for now. Keep going for the long-term badges.";
}

function journeyBadgeChips(profile, subject) {
  if (typeof BADGES === "undefined") return "";
  const prefix =
    subject === "karting"
      ? "kart_"
      : subject === "f1"
        ? "f1_"
        : subject === "horseworld"
          ? "hw_"
          : subject === "horses"
            ? "horse_"
            : "inv_";
  const mine = BADGES.filter((b) => String(b.id).indexOf(prefix) === 0);
  const have = new Set(profile.badges || []);
  return mine
    .map((b) => {
      const on = have.has(b.id);
      return `<span class="journey-badge ${on ? "is-on" : ""}" title="${escapeHtml(b.desc)}">${
        on ? b.emoji : "🔒"
      } ${escapeHtml(b.name)}</span>`;
    })
    .join("");
}

function journeyPanelHtml(profile, subject) {
  if (!profile || !georgeIsJourneySubject(subject)) return "";
  if (typeof installGeorgeBanks === "function") installGeorgeBanks();
  const stage =
    typeof getActiveStage === "function" ? Number(getActiveStage(profile, subject)) || 1 : 1;
  const maxS = typeof maxStageWithContent === "function" ? maxStageWithContent(subject) : 6;
  const score = journeyScore(profile, subject);
  const round = journeyRoundStats(profile, subject, stage);
  const streak = Number(profile.streak) || 0;
  const nodes = [];
  let lockWhy = "";
  for (let s = 1; s <= maxS; s++) {
    const meta =
      typeof courseStageMeta === "function"
        ? courseStageMeta(subject, s)
        : { name: "Round " + s, emoji: "•", short: String(s) };
    const unlocked = s === 1 ? !!(profile.diagnostics && profile.diagnostics[subject] && profile.diagnostics[subject].completed) : typeof canAccessStage === "function" && canAccessStage(profile, subject, s);
    const done = typeof isStageComplete === "function" && isStageComplete(profile, subject, s);
    const why =
      !unlocked && typeof stageLockReason === "function" ? stageLockReason(profile, subject, s) : "";
    if (!unlocked && why && !lockWhy) lockWhy = why;
    const stars = journeyStageStarSum(profile, subject, s);
    nodes.push(
      `<button type="button" class="journey-node ${s === stage ? "is-active" : ""} ${
        done ? "is-done" : ""
      } ${unlocked ? "" : "is-locked"}" data-switch-stage="${s}" ${
        unlocked ? "" : "disabled"
      } title="${escapeHtml(why || meta.name)}">
        <span class="journey-node-emoji">${done ? "🏆" : meta.emoji}</span>
        <span class="journey-node-name">${escapeHtml(meta.name)}</span>
        <span class="journey-node-meta">${
          unlocked ? (done ? "Podium" : stars ? stars + " ★" : "Ready") : "Locked"
        }</span>
      </button>`
    );
  }
  const diagDone = !!(profile.diagnostics && profile.diagnostics[subject] && profile.diagnostics[subject].completed);
  const st = diagDone && typeof getCourseStageData === "function" ? getCourseStageData(profile, subject, stage) : null;
  const path = (st && st.path) || [];
  const doneLessons = path.filter((id) => st && st.completed && st.completed[id]).length;
  const position = path.length ? Math.max(1, path.length - doneLessons) : 12;
  const posLabel =
    path.length && doneLessons >= path.length ? "P1 · round won" : `P${position} on the grid`;
  const pot = journeyFormatPot(score.points);
  const potPct = Math.max(6, Math.min(100, Math.round((score.points / 10000) * 100)));
  const qPct = round.total ? Math.round((round.cleared / round.total) * 100) : 0;
  const missN = journeyMissList(profile, subject, stage).length;

  const childName =
    typeof LEARNERS !== "undefined" && profile.id && LEARNERS[profile.id]
      ? LEARNERS[profile.id].name
      : "Your";
  if (subject === "karting") {
    return `<section class="journey-card journey-kart" aria-label="Karting season">
      <p class="journey-kicker">${escapeHtml(childName)}’s season · six rounds</p>
      <h2 class="journey-title">From the back of the grid to champion</h2>
      <p class="journey-lead">${escapeHtml(posLabel)} · ${escapeHtml(
        (typeof courseStageMeta === "function" ? courseStageMeta(subject, stage).name : "") || ""
      )}. Questions start easy and get harder each round. A question you get right stays retired.</p>
      <div class="journey-track">${nodes.join("")}</div>
      ${
        lockWhy
          ? `<p class="journey-lock">${escapeHtml(lockWhy)}</p>`
          : ""
      }
      <div class="journey-stats">
        <div><span>Championship points</span><strong>${score.points}</strong></div>
        <div><span>Stars</span><strong>${score.starSum}</strong></div>
        <div><span>Streak</span><strong>${streak} day${streak === 1 ? "" : "s"}</strong></div>
        <div><span>Grid</span><strong>${escapeHtml(posLabel)}</strong></div>
      </div>
      <div class="journey-bar" aria-hidden="true"><i style="width:${qPct}%"></i></div>
      <p class="journey-goal"><strong>Next goal.</strong> ${escapeHtml(journeyNextGoal(profile, subject, stage))}</p>
      <p class="muted journey-note">${round.cleared} of ${round.total} questions cleared this round · ${missN} miss${
        missN === 1 ? "" : "es"
      } waiting. ${
        missN
          ? "Misses come back on purpose."
          : "Nothing repeats unless you ask for a practice lap."
      }</p>
      <div class="journey-actions">
        <button type="button" class="btn btn-secondary" id="btnJourneyMisses" ${
          missN ? "" : "disabled"
        }>${missN ? `Retry ${missN} miss${missN === 1 ? "" : "es"}` : "No misses to retry"}</button>
      </div>
      <div class="journey-badges">${journeyBadgeChips(profile, subject)}</div>
    </section>`;
  }

  if (subject === "f1" || subject === "horseworld") {
    const f1 = subject === "f1";
    const roundName =
      (typeof courseStageMeta === "function" ? courseStageMeta(subject, stage).name : "") || "";
    return `<section class="journey-card ${f1 ? "journey-kart" : "journey-horse"}" aria-label="${
      f1 ? "Formula 1 season" : "Horse world"
    }">
      <p class="journey-kicker">${escapeHtml(childName)}’s ${f1 ? "Formula 1" : "horse world"} · six rounds</p>
      <h2 class="journey-title">${f1 ? "From the first flag to champion" : "From first horses to horsemaster"}</h2>
      <p class="journey-lead">${escapeHtml(roundName)}. Each round is the same ideas, a step harder, with new questions. Stars and badges save with the rest of the course. ${
        f1
          ? "Go-karting uses the same flags — open that course when you want the kart itself."
          : "Daily horse care lives in the Horses course. This one is breeds, sports and history."
      }</p>
      <div class="journey-track">${nodes.join("")}</div>
      ${lockWhy ? `<p class="journey-lock">${escapeHtml(lockWhy)}</p>` : ""}
      <div class="journey-stats">
        <div><span>${f1 ? "Championship points" : "Rosette points"}</span><strong>${score.points}</strong></div>
        <div><span>Stars</span><strong>${score.starSum}</strong></div>
        <div><span>Streak</span><strong>${streak} day${streak === 1 ? "" : "s"}</strong></div>
        <div><span>Round</span><strong>${escapeHtml(roundName)}</strong></div>
      </div>
      <div class="journey-bar" aria-hidden="true"><i style="width:${qPct}%"></i></div>
      <p class="journey-goal"><strong>Next goal.</strong> ${escapeHtml(journeyNextGoal(profile, subject, stage))}</p>
      <p class="muted journey-note">${round.cleared} of ${round.total} questions cleared this round · ${missN} miss${
        missN === 1 ? "" : "es"
      } waiting. ${
        missN ? "Misses come back on purpose." : "Nothing repeats unless you ask for a practice lap."
      }</p>
      <div class="journey-actions">
        <button type="button" class="btn btn-secondary" id="btnJourneyMisses" ${missN ? "" : "disabled"}>${
          missN ? `Retry ${missN} miss${missN === 1 ? "" : "es"}` : "No misses to retry"
        }</button>
      </div>
      <div class="journey-badges">${journeyBadgeChips(profile, subject)}</div>
    </section>`;
  }

  return `<section class="journey-card journey-invest" aria-label="Investing journey">
    <p class="journey-kicker">${escapeHtml(childName)}’s pot · a game score, not real money</p>
    <h2 class="journey-title">Grow the piggy bank</h2>
    <p class="journey-lead">Pocket money ideas first, then saving, compound growth, funds, a Junior ISA and scams to refuse. This is learning, not financial advice. A parent decides what happens to real money.</p>
    <div class="journey-pot">
      <div class="journey-pot-figure" aria-hidden="true"><span style="height:${potPct}%"></span></div>
      <div>
        <p class="journey-pot-value">${pot}</p>
        <p class="muted" style="margin:0">Pretend pounds from stars. Not a balance you can spend.</p>
      </div>
    </div>
    <div class="journey-track">${nodes.join("")}</div>
    ${
      lockWhy
        ? `<p class="journey-lock">${escapeHtml(lockWhy)}</p>`
        : ""
    }
    <div class="journey-stats">
      <div><span>Pretend pot</span><strong>${pot}</strong></div>
      <div><span>Stars</span><strong>${score.starSum}</strong></div>
      <div><span>Streak</span><strong>${streak} day${streak === 1 ? "" : "s"}</strong></div>
      <div><span>Cleared</span><strong>${round.cleared}/${round.total || "—"}</strong></div>
    </div>
    <div class="journey-bar" aria-hidden="true"><i style="width:${qPct}%"></i></div>
    <p class="journey-goal"><strong>Next goal.</strong> ${escapeHtml(journeyNextGoal(profile, subject, stage))}</p>
    <p class="muted journey-note">Past growth in these lessons is an illustration, not a promise. ${
      missN
        ? missN + " miss" + (missN === 1 ? "" : "es") + " will come back so you can try again."
        : "Questions you get right do not come back unless you tap a practice lap."
    }</p>
    <div class="journey-actions">
      <button type="button" class="btn btn-secondary" id="btnJourneyMisses" ${
        missN ? "" : "disabled"
      }>${missN ? `Retry ${missN} miss${missN === 1 ? "" : "es"}` : "No misses to retry"}</button>
    </div>
    <div class="journey-badges">${journeyBadgeChips(profile, subject)}</div>
  </section>`;
}

function journeyEmptyPracticeHtml(profile, subject, skillId, stage) {
  const status = journeyLessonStatus(profile, subject, skillId, stage);
  const stars = journeyStarsFor(profile, subject, skillId, stage);
  return `
    <div class="phase-pill">Cleared</div>
    <h3 class="teach-heading">You have answered this set</h3>
    <p class="muted">${status.cleared} of ${status.total} questions retired${
      stars ? " · " + stars : ""
    }. A question only comes back if you missed it, or if you ask for a practice lap.</p>
    <div class="journey-actions" style="margin-top:1rem">
      <button type="button" class="btn btn-primary" id="btnJourneyRetry" ${
        status.misses ? "" : "disabled"
      }>${
        status.misses ? `Retry ${status.misses} miss${status.misses === 1 ? "" : "es"}` : "No misses in this lesson"
      }</button>
      <button type="button" class="btn btn-secondary" id="btnJourneyLap">Practice lap (on purpose)</button>
    </div>`;
}

function journeyCountQuestions() {
  const packs = [
    ["karting", typeof GEORGE_KART_BANK !== "undefined" ? GEORGE_KART_BANK : null],
    ["investing", typeof GEORGE_INVEST_BANK !== "undefined" ? GEORGE_INVEST_BANK : null],
  ];
  const out = {};
  for (const [subject, bank] of packs) {
    let n = 0;
    if (bank) {
      for (const skill of Object.keys(bank)) {
        for (let s = 1; s <= 6; s++) n += ((bank[skill] || {})[s] || []).length;
      }
    }
    out[subject] = n;
  }
  return out;
}

installGeorgeBanks();
