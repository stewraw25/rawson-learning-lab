/**
 * Stage 2: adaptive placement that can set a starting level,
 * a GCSE 9–1 ladder on each subject, and spaced review of past topics.
 * Does not change STORAGE_KEY or wipe existing progress.
 * Never promises a grade.
 */
const PLACEMENT_TARGET = 12;
const PLACEMENT_STAGE_CAP = 4;
const SPACED_INTERVALS_DAYS = [1, 3, 7, 14];

const PLACEMENT_BANK = {
  maths: [
    { id: "m1a", skill: "number", level: 1, type: "typed", q: "What is 7 + 5?", answer: "12", accept: ["12"], hint: "Count on from 7.", explain: "7 + 5 = 12." },
    { id: "m1b", skill: "number", level: 1, type: "typed", q: "How many tens are in 40?", answer: "4", accept: ["4"], hint: "40 is 4 groups of 10.", explain: "40 = 4 tens." },
    { id: "m1c", skill: "operations", level: 1, type: "typed", q: "What is 12 − 4?", answer: "8", accept: ["8"], hint: "Count back from 12.", explain: "12 − 4 = 8." },
    { id: "m1d", skill: "fractions", level: 1, type: "typed", q: "What is half of 10?", answer: "5", accept: ["5"], hint: "Half means share into 2 equal parts.", explain: "Half of 10 is 5." },
    { id: "m2a", skill: "operations", level: 2, type: "typed", q: "What is 23 + 18?", answer: "41", accept: ["41"], hint: "Add the tens, then the ones.", explain: "20 + 10 = 30 and 3 + 8 = 11, so 41." },
    { id: "m2b", skill: "operations", level: 2, type: "typed", q: "What is 6 × 7?", answer: "42", accept: ["42"], hint: "6 sevens, or 7 sixes.", explain: "6 × 7 = 42." },
    { id: "m2c", skill: "operations", level: 2, type: "typed", q: "What is 84 − 29?", answer: "55", accept: ["55"], hint: "84 − 30 is 54, then add 1 back.", explain: "84 − 29 = 55." },
    { id: "m2d", skill: "fractions", level: 2, type: "typed", q: "What is 3/4 of 12?", answer: "9", accept: ["9"], hint: "Find a quarter first, then take 3 of them.", explain: "A quarter of 12 is 3, so three quarters is 9." },
    { id: "m3a", skill: "operations", level: 3, type: "typed", q: "What is 8 × 7?", answer: "56", accept: ["56"], hint: "Think of 8 × 5 and 8 × 2.", explain: "8 × 7 = 56." },
    { id: "m3b", skill: "operations", level: 3, type: "typed", q: "What is 144 ÷ 12?", answer: "12", accept: ["12"], hint: "How many 12s make 144?", explain: "12 × 12 = 144, so 144 ÷ 12 = 12." },
    { id: "m3c", skill: "number", level: 3, type: "typed", q: "How many thousands are in 3472?", answer: "3", accept: ["3"], hint: "Look at the thousands column.", explain: "3472 has 3 thousands." },
    { id: "m3d", skill: "number", level: 3, type: "typed", q: "What is 2.3 + 1.8?", answer: "4.1", accept: ["4.1", "4.10"], hint: "3 tenths + 8 tenths is 11 tenths, which is 1 and 1 tenth.", explain: "2.3 + 1.8 = 4.1." },
    { id: "m4a", skill: "fractions", level: 4, type: "typed", q: "Simplify 12/18.", answer: "2/3", accept: ["2/3", "2 / 3"], hint: "Divide the top and bottom by 6.", explain: "12 ÷ 6 = 2 and 18 ÷ 6 = 3, so 2/3." },
    { id: "m4b", skill: "number", level: 4, type: "typed", q: "What is 15% of 80?", answer: "12", accept: ["12"], hint: "10% of 80 is 8, and 5% is 4.", explain: "10% is 8 and 5% is 4, so 15% is 12." },
    { id: "m4c", skill: "algebra", level: 4, type: "typed", q: "Solve 3x + 5 = 20. What is x?", answer: "5", accept: ["5"], hint: "Take 5 from both sides, then divide by 3.", explain: "3x = 15, so x = 5." },
    { id: "m4d", skill: "geometry", level: 4, type: "typed", q: "A rectangle is 7 cm by 4 cm. What is its area in cm²?", answer: "28", accept: ["28"], hint: "Area of a rectangle is length times width.", explain: "7 × 4 = 28 cm²." },
    { id: "m5a", skill: "algebra", level: 5, type: "typed", q: "Expand 3(x + 4).", answer: "3x+12", accept: ["3x+12", "3x + 12", "12+3x", "12 + 3x"], hint: "Multiply 3 by x and 3 by 4.", explain: "3 × x and 3 × 4 gives 3x + 12." },
    { id: "m5b", skill: "data", level: 5, type: "typed", q: "Find the mean of 2, 5, 8 and 5.", answer: "5", accept: ["5"], hint: "Add them, then divide by how many numbers there are.", explain: "2 + 5 + 8 + 5 = 20, and 20 ÷ 4 = 5." },
    { id: "m5c", skill: "number", level: 5, type: "typed", q: "Share 20 in the ratio 2 : 3. What is the larger share?", answer: "12", accept: ["12"], hint: "2 + 3 = 5 parts. One part is 4.", explain: "5 parts of 4 make 20. The larger share is 3 parts, which is 12." },
    { id: "m6a", skill: "algebra", level: 6, type: "typed", q: "Factorise x² + 5x + 6.", answer: "(x+2)(x+3)", accept: ["(x+2)(x+3)", "(x+3)(x+2)", "(x + 2)(x + 3)", "(x + 3)(x + 2)"], hint: "Find two numbers that multiply to 6 and add to 5.", explain: "2 and 3 work, so (x + 2)(x + 3)." },
    { id: "m6b", skill: "number", level: 6, type: "typed", q: "Write 45000 in standard form.", answer: "4.5 × 10^4", accept: ["4.5 × 10^4", "4.5x10^4", "4.5 × 10⁴", "4.5x104", "4.5*10^4", "4.5e4"], hint: "Move the point so there is one digit before it.", explain: "4.5 × 10⁴, because the point moved 4 places." }
  ],
  english: [
    { id: "e1a", skill: "punctuation", level: 1, type: "multi", q: "Which sentence is written correctly?", options: ["the dog ran.", "The dog ran.", "the Dog ran."], answer: 1, hint: "Sentences start with a capital letter.", explain: "The first word needs a capital: The dog ran." },
    { id: "e1b", skill: "grammar", level: 1, type: "multi", q: "Which of these is a complete sentence?", options: ["Ran down the hill.", "The cat sat on the mat.", "Because it was raining."], answer: 1, hint: "A sentence needs a subject and a verb.", explain: "“The cat sat on the mat” has a subject (the cat) and a verb (sat)." },
    { id: "e2a", skill: "grammar", level: 2, type: "multi", q: "Which word is a verb in “The children play in the park”?", options: ["children", "play", "park"], answer: 1, hint: "A verb is a doing or being word.", explain: "“Play” is the doing word." },
    { id: "e2b", skill: "punctuation", level: 2, type: "multi", q: "Which sentence uses a comma correctly in a list?", options: ["I bought apples bananas and pears.", "I bought apples, bananas and pears.", "I bought, apples bananas and pears."], answer: 1, hint: "Use commas to separate items in a list.", explain: "The comma comes between the items: apples, bananas and pears." },
    { id: "e3a", skill: "writing", level: 3, type: "multi", q: "What is the topic sentence of a paragraph usually for?", options: ["To end the story", "To tell the reader what the paragraph is about", "To list only adjectives"], answer: 1, hint: "It comes first and points the way.", explain: "A topic sentence tells the reader the main idea of that paragraph." },
    { id: "e3b", skill: "reading", level: 3, type: "multi", q: "If a text says “the sky bruised purple”, what is “bruised” doing?", options: ["Giving an exact measurement", "Using an image to describe the colour", "Naming a character"], answer: 1, hint: "The writer is comparing the sky to a bruise.", explain: "It is figurative language: the colour is described with an image." },
    { id: "e4a", skill: "punctuation", level: 4, type: "multi", q: "Which punctuation best joins two closely linked complete sentences?", options: ["A comma only", "A semicolon", "A question mark in the middle"], answer: 1, hint: "A comma alone cannot join two complete sentences.", explain: "A semicolon can join two closely linked complete sentences." },
    { id: "e4b", skill: "reading", level: 4, type: "multi", q: "What does a writer’s viewpoint mean?", options: ["The font they chose", "The attitude or stance they take towards the topic", "The number of paragraphs"], answer: 1, hint: "Think about how they want the reader to feel or think.", explain: "Viewpoint is the writer’s stance or attitude." },
    { id: "e5a", skill: "writing", level: 5, type: "multi", q: "Which is the best thesis-style opening for a formal article about school sport?", options: ["Sport is stuff.", "School sport should be protected because it supports health, teamwork and focus.", "I went to PE once."], answer: 1, hint: "A clear opening states a view and a reason.", explain: "It states a clear view and gives reasons the rest of the piece can prove." },
    { id: "e6a", skill: "reading", level: 6, type: "multi", q: "What is the most precise way to comment on a writer’s method?", options: ["The writer uses words to be nice.", "The writer uses a short sentence after a long one to jolt the reader.", "It is descriptive."], answer: 1, hint: "Name the method and the effect.", explain: "Strong analysis names a method and explains its effect on the reader." }
  ],
  science: [
    { id: "s1a", skill: "biology", level: 1, type: "multi", q: "Is a tree living or not living?", options: ["Living", "Not living"], answer: 0, hint: "Does it grow and need water?", explain: "A tree grows, needs water and makes more trees, so it is living." },
    { id: "s1b", skill: "chemistry", level: 1, type: "multi", q: "Which of these is a solid at room temperature?", options: ["Water in a glass", "A wooden block", "Steam"], answer: 1, hint: "Solids keep their shape.", explain: "A wooden block keeps its shape, so it is a solid." },
    { id: "s2a", skill: "biology", level: 2, type: "multi", q: "What do plants mainly use sunlight for?", options: ["To make food", "To keep their roots warm only", "To turn into animals"], answer: 0, hint: "Think about leaves and food-making.", explain: "Plants use sunlight to make food in their leaves." },
    { id: "s2b", skill: "physics", level: 2, type: "multi", q: "What happens if you push a shopping trolley harder?", options: ["It stays still", "It usually speeds up", "It turns into a solid"], answer: 1, hint: "A bigger push is a bigger force.", explain: "A bigger push usually makes it speed up." },
    { id: "s3a", skill: "biology", level: 3, type: "multi", q: "In photosynthesis, what gas do plants take in?", options: ["Oxygen only", "Carbon dioxide", "Helium"], answer: 1, hint: "Animals breathe it out. Plants take it in.", explain: "Plants take in carbon dioxide and give out oxygen." },
    { id: "s3b", skill: "physics", level: 3, type: "multi", q: "Why does a simple series circuit with a gap in the wire not light a bulb?", options: ["The bulb is too heavy", "The circuit is not complete, so current cannot flow", "Batteries only work at night"], answer: 1, hint: "Current needs a complete loop.", explain: "A break in the loop stops the current, so the bulb stays off." },
    { id: "s4a", skill: "biology", level: 4, type: "multi", q: "Where does photosynthesis mainly happen in a plant?", options: ["The roots only", "The leaves", "The flower petals only"], answer: 1, hint: "Look for the green parts that catch light.", explain: "Leaves contain chlorophyll and are where most photosynthesis happens." },
    { id: "s4b", skill: "chemistry", level: 4, type: "multi", q: "When ice melts, what kind of change is it?", options: ["A chemical change that makes a new substance", "A physical change of state", "The water disappearing"], answer: 1, hint: "The substance is still water.", explain: "Melting is a physical change: ice becomes liquid water, not a new substance." },
    { id: "s5a", skill: "physics", level: 5, type: "multi", q: "If the current in a resistor increases and the resistance stays the same, what happens to the potential difference?", options: ["It decreases", "It stays the same", "It increases"], answer: 2, hint: "Think V = IR.", explain: "From V = IR, if I increases and R is unchanged, V increases." },
    { id: "s6a", skill: "method", level: 6, type: "multi", q: "Why is a control important in a fair test of enzyme activity?", options: ["It makes the graph colourful", "It shows what happens without the factor you are changing", "It replaces the method"], answer: 1, hint: "You need something to compare against.", explain: "A control lets you compare results with and without the factor you changed." }
  ]
};

function placementStartLevel(learnerId) {
  const age = typeof ageYears === "function" ? ageYears(learnerId) : (learnerId === "bella" ? 12 : 10);
  if (age >= 12) return 3;
  if (age >= 9) return 2;
  return 1;
}

function placementQuestionsAtLevel(subject, level) {
  const bank = PLACEMENT_BANK[subject] || [];
  const lvl = Math.max(1, Math.min(6, Number(level) || 1));
  let pool = bank.filter((q) => q.level === lvl);
  if (!pool.length) {
    pool = bank.filter((q) => q.level === lvl - 1);
  }
  if (!pool.length) {
    pool = bank.filter((q) => q.level === lvl + 1);
  }
  return pool.slice();
}

function startAdaptivePlacement(subject, learnerId) {
  const state = {
    subject,
    learnerId,
    level: placementStartLevel(learnerId),
    asked: [],
    answers: [],
    streakRight: 0,
    streakWrong: 0,
    target: PLACEMENT_TARGET
  };

  function pickNext() {
    if (state.asked.length >= state.target) return null;
    const used = new Set(state.asked.map((q) => q.id));
    let pool = placementQuestionsAtLevel(subject, state.level).filter((q) => !used.has(q.id));
    if (!pool.length) {
      for (let d = 1; d <= 5 && !pool.length; d++) {
        pool = placementQuestionsAtLevel(subject, state.level + d).filter((q) => !used.has(q.id));
        if (!pool.length) pool = placementQuestionsAtLevel(subject, state.level - d).filter((q) => !used.has(q.id));
      }
    }
    if (!pool.length) return null;
    const next = pool[0];
    state.asked.push(next);
    return next;
  }

  pickNext();

  return {
    subject,
    target: state.target,
    current() {
      return state.asked[state.asked.length - 1] || null;
    },
    index() {
      return Math.max(0, state.asked.length - 1);
    },
    askedCount() {
      return state.asked.length;
    },
    record(ok) {
      if (ok) {
        state.streakRight += 1;
        state.streakWrong = 0;
        if (state.streakRight >= 2) {
          state.level = Math.min(6, state.level + 1);
          state.streakRight = 0;
        }
      } else {
        state.streakWrong += 1;
        state.streakRight = 0;
        if (state.streakWrong >= 2) {
          state.level = Math.max(1, state.level - 1);
          state.streakWrong = 0;
        }
      }
    },
    done() {
      if (state.asked.length >= state.target) return true;
      const used = new Set(state.asked.map((q) => q.id));
      const remaining = (PLACEMENT_BANK[subject] || []).filter((q) => !used.has(q.id));
      return remaining.length === 0;
    },
    next() {
      if (this.done()) return null;
      return pickNext();
    },
    finish() {
      const total = state.answers.length || state.asked.length;
      const correct = state.answers.filter((a) => a.ok).length;
      const levelReached = state.level;
      let placedStage = 1;
      if (levelReached >= 6 && correct / Math.max(1, total) >= 0.7) placedStage = 4;
      else if (levelReached >= 5) placedStage = 4;
      else if (levelReached >= 4) placedStage = 3;
      else if (levelReached >= 3) placedStage = 3;
      else if (levelReached >= 2) placedStage = 2;
      else placedStage = 1;
      if (correct / Math.max(1, total) < 0.35) placedStage = Math.min(placedStage, 1);
      else if (correct / Math.max(1, total) < 0.5) placedStage = Math.min(placedStage, 2);
      placedStage = Math.max(1, Math.min(PLACEMENT_STAGE_CAP, placedStage));
      const skillScores = {};
      const skillTot = {};
      const skillOk = {};
      state.answers.forEach((a) => {
        const skill = a.skill || "general";
        skillTot[skill] = (skillTot[skill] || 0) + 1;
        skillOk[skill] = (skillOk[skill] || 0) + (a.ok ? 1 : 0);
      });
      Object.keys(skillTot).forEach((skill) => {
        skillScores[skill] = Math.round((100 * skillOk[skill]) / skillTot[skill]);
      });
      return {
        score: total ? Math.round((100 * correct) / total) : 0,
        skillScores,
        correct,
        total: total || state.asked.length,
        placedStage,
        levelReached,
        asked: state.asked.slice(),
        answers: state.answers.slice()
      };
    },
    storeAnswer(entry) {
      state.answers.push(entry);
    },
    snapshot() {
      return state;
    }
  };
}

function subjectHasLessonProgress(profile, subject) {
  if (!profile || !subject) return false;
  const course = profile.courses && profile.courses[subject];
  if (course && course.stages) {
    const keys = Object.keys(course.stages);
    for (let i = 0; i < keys.length; i++) {
      const completed = course.stages[keys[i]] && course.stages[keys[i]].completed;
      if (completed && Object.keys(completed).length) return true;
    }
  }
  if (Array.isArray(profile.lessonHistory)) {
    for (let i = 0; i < profile.lessonHistory.length; i++) {
      const h = profile.lessonHistory[i];
      if (h && h.subject === subject && Number(h.score) >= 70) return true;
    }
  }
  return false;
}

function applyPlacementStart(profile, subject, placedStage) {
  const stage = Math.max(1, Math.min(PLACEMENT_STAGE_CAP, Number(placedStage) || 1));
  if (!profile) return stage;
  if (!profile.courses || !profile.courses[subject]) {
    if (typeof buildCourse === "function") buildCourse(profile, subject, 1);
  }
  const course = profile.courses && profile.courses[subject];
  if (!course) return stage;
  course.placedStage = stage;
  course.placementAt = typeof todayKey === "function" ? todayKey() : undefined;
  if (subjectHasLessonProgress(profile, subject)) {
    return stage;
  }
  course.paceVersion = typeof PACE_VERSION !== "undefined" ? PACE_VERSION : "pace-years-v1";
  course.homeStage = stage;
  course.paceClimbedTo = Math.max(Number(course.paceClimbedTo) || 1, stage);
  if (!course.paceStartedOn && typeof todayKey === "function") course.paceStartedOn = todayKey();
  if (typeof startCourseStage === "function") startCourseStage(profile, subject, stage);
  course.activeStage = stage;
  return stage;
}

const GCSE_LADDER_NOTES = {
  1: { gradeBand: "Building towards GCSE", note: "First steps. Secure the basics before the climb gets steeper." },
  2: { gradeBand: "Building towards GCSE", note: "Intermediate work. The same ideas start to link together." },
  3: { gradeBand: "Towards grades 4–5", note: "Secure work. This is the bridge into GCSE-style questions." },
  4: { gradeBand: "Towards grades 4–5", note: "GCSE Core. Standard exam-style skills, without a grade promise." },
  5: { gradeBand: "Towards grades 6–7", note: "GCSE Higher. Longer, linked questions." },
  6: { gradeBand: "Working towards grades 8–9", note: "Stretch work. This is practice, not a promised grade." }
};

function gcseLadderHtml(profile, subject) {
  const esc = typeof escapeHtml === "function" ? escapeHtml : (s) => String(s || "");
  if (!profile || !subject) return "";
  const course = profile.courses && profile.courses[subject];
  const home = course && course.homeStage ? Number(course.homeStage) : (typeof homeStageForLearner === "function" ? homeStageForLearner(profile.id, subject) : 1);
  const placed = course && course.placedStage ? Number(course.placedStage) : null;
  const climbed = course && course.paceClimbedTo ? Number(course.paceClimbedTo) : home;
  const stageNums = [1, 2, 3, 4, 5, 6];
  const rows = stageNums.map((num) => {
    const st = (typeof COURSE_STAGES !== "undefined" && COURSE_STAGES[num]) || { name: "Stage " + num, blurb: "" };
    const unlocked = typeof canAccessStage === "function" ? canAccessStage(profile, subject, num) : num <= Math.max(home, climbed);
    const complete = typeof isStageComplete === "function" ? isStageComplete(profile, subject, num) : false;
    const note = GCSE_LADDER_NOTES[num] || { gradeBand: "", note: st.blurb || "" };
    const marks = [];
    if (placed && placed === num) marks.push("placement start");
    if (home === num && !placed) marks.push("start");
    if (complete) marks.push("done");
    if (!unlocked) marks.push("locked");
    const mark = marks.length ? ` <span class="ladder-mark">${esc(marks.join(" · "))}</span>` : "";
    const cls = ["ladder-row", complete ? "is-done" : "", !unlocked ? "is-locked" : "", (placed && placed === num) || home === num ? "is-here" : ""].filter(Boolean).join(" ");
    return `<li class="${cls}"><strong>Stage ${num}: ${esc(st.name)}</strong> <span class="ladder-band">${esc(note.gradeBand)}</span>${mark}<p class="muted">${esc(note.note)}</p></li>`;
  }).join("");
  const cap = placed
    ? `<p class="muted">Your placement suggested stage ${placed} as a start. Existing completed work is kept, and nothing is moved backwards.</p>`
    : `<p class="muted">A short placement test can set a starting level on a new subject. It will not wipe work already done.</p>`;
  return `<section class="ladder-panel" aria-label="GCSE 9 to 1 ladder">
    <h3>The climb towards GCSE (9–1)</h3>
    <p class="muted">England uses grades 9 to 1. These labels show the direction of travel. They are not a predicted or promised grade.</p>
    ${cap}
    <ol class="ladder-list">${rows}</ol>
  </section>`;
}

function dayOffsetKey(days, fromKey) {
  const src = fromKey || (typeof todayKey === "function" ? todayKey() : "");
  if (!src || typeof src !== "string") return src;
  const parts = src.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => !n && n !== 0)) return src;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  d.setDate(d.getDate() + Number(days || 0));
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function scheduleSpacedReview(profile, subject, skillId, stage) {
  if (!profile || !subject || !skillId) return;
  if (!profile.spacedReview || typeof profile.spacedReview !== "object" || Array.isArray(profile.spacedReview)) {
    profile.spacedReview = {};
  }
  const key = subject + ":" + skillId + ":" + (Number(stage) || 1);
  const today = typeof todayKey === "function" ? todayKey() : "";
  const existing = profile.spacedReview[key];
  if (existing && existing.lastCompletedOn === today) return;
  let step = 0;
  if (existing && Number.isFinite(Number(existing.step))) {
    if (existing.dueOn && String(existing.dueOn) <= String(today)) {
      step = Math.min(SPACED_INTERVALS_DAYS.length - 1, Number(existing.step) + 1);
    } else {
      step = Math.max(0, Number(existing.step));
    }
  }
  profile.spacedReview[key] = {
    subject,
    skillId,
    stage: Number(stage) || 1,
    step,
    lastCompletedOn: today,
    dueOn: dayOffsetKey(SPACED_INTERVALS_DAYS[step], today)
  };
}

function reviewsDueFor(profile, onDay) {
  if (!profile || !profile.spacedReview) return [];
  const day = onDay || (typeof todayKey === "function" ? todayKey() : "");
  const due = [];
  Object.keys(profile.spacedReview).forEach((key) => {
    const item = profile.spacedReview[key];
    if (!item || !item.dueOn) return;
    if (String(item.dueOn) <= String(day)) due.push(item);
  });
  due.sort((a, b) => String(a.dueOn).localeCompare(String(b.dueOn)));
  return due;
}

function reviewPanelHtml(profile, subject) {
  const esc = typeof escapeHtml === "function" ? escapeHtml : (s) => String(s || "");
  const due = reviewsDueFor(profile).filter((item) => !subject || item.subject === subject);
  if (!due.length) {
    return `<section class="review-panel"><h3>Review</h3><p class="muted">When you finish a topic, it comes back after 1 day, then 3, 7 and 14 days, so it stays in memory. Nothing is due today.</p></section>`;
  }
  const items = due.slice(0, 6).map((item) => {
    const skill = (typeof getSkill === "function" && getSkill(item.skillId)) || { name: item.skillId };
    const href = `#/lesson/${encodeURIComponent(item.subject)}/${encodeURIComponent(item.skillId)}/${encodeURIComponent(item.stage)}`;
    return `<li><a href="${href}">${esc(skill.name || item.skillId)} · stage ${item.stage}</a> <span class="muted">due ${esc(item.dueOn)}</span></li>`;
  }).join("");
  return `<section class="review-panel review-due"><h3>Review due</h3><p class="muted">A short revisit keeps earlier topics from fading. These are ready now.</p><ul class="review-list">${items}</ul></section>`;
}

let _paceProfileHint = null;

var _homeStageForLearnerOriginal = typeof homeStageForLearner === "function" ? homeStageForLearner : null;
homeStageForLearner = function (learnerId, subject) {
  const hinted = _paceProfileHint && _paceProfileHint.id === learnerId ? _paceProfileHint : null;
  const profile = hinted
    || (typeof getProfile === "function" ? getProfile(learnerId) : null)
    || (typeof state !== "undefined" && state.profile && state.profile.id === learnerId ? state.profile : null);
  if (profile && subject && profile.courses && profile.courses[subject]) {
    const saved = Number(profile.courses[subject].homeStage);
    if (saved >= 1 && saved <= 6) return saved;
  }
  if (_homeStageForLearnerOriginal) return _homeStageForLearnerOriginal(learnerId, subject);
  return 1;
};

var _applyPacePlacementOriginal = typeof applyPacePlacement === "function" ? applyPacePlacement : null;
applyPacePlacement = function (profile, subject) {
  _paceProfileHint = profile || null;
  try {
    if (_applyPacePlacementOriginal) return _applyPacePlacementOriginal(profile, subject);
  } finally {
    _paceProfileHint = null;
  }
};

var _recordLessonOriginal = typeof recordLesson === "function" ? recordLesson : null;
recordLesson = function (profile, subject, skillId, scorePct, stageNum) {
  const result = _recordLessonOriginal
    ? _recordLessonOriginal(profile, subject, skillId, scorePct, stageNum)
    : undefined;
  if (typeof lessonCountsAsDone === "function" ? lessonCountsAsDone(scorePct) : Number(scorePct) >= 70) {
    scheduleSpacedReview(profile, subject, skillId, stageNum);
  }
  return result;
};

var _recordDiagnosticOriginal = typeof recordDiagnostic === "function" ? recordDiagnostic : null;
recordDiagnostic = function (profile, subject, answers, result) {
  const out = _recordDiagnosticOriginal
    ? _recordDiagnosticOriginal(profile, subject, answers, result)
    : undefined;
  const fun = typeof isFunSubject === "function"
    ? isFunSubject(subject)
    : !!(typeof SUBJECTS !== "undefined" && SUBJECTS[subject] && SUBJECTS[subject].fun);
  if (!fun && result && result.placedStage) {
    applyPlacementStart(profile, subject, result.placedStage);
    if (profile && profile.diagnostics && profile.diagnostics[subject]) {
      profile.diagnostics[subject].placedStage = result.placedStage;
    }
  }
  return out;
};

var _normalizeProfileOriginal = typeof normalizeProfile === "function" ? normalizeProfile : null;
normalizeProfile = function (learnerId, raw) {
  const profile = _normalizeProfileOriginal
    ? _normalizeProfileOriginal(learnerId, raw)
    : (raw || {});
  if (!profile.spacedReview || typeof profile.spacedReview !== "object" || Array.isArray(profile.spacedReview)) {
    profile.spacedReview = {};
  }
  return profile;
};
