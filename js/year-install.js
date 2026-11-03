/**
 * Shared installer for the extra primary lessons.
 * A spec is [subject, id, name, stage, title, blurb, points, steps, questions, helpLine, helpQuestion].
 * A question is ["t", text, answer, explain] or ["m", text, options, index, explain].
 */
function yearInstallSpecs(specs) {
  if (typeof SKILLS === "undefined" || typeof TEACH_MODULES === "undefined") return;
  const banks = {
    1: TEACH_MODULES,
    2: typeof TEACH_MODULES_STAGE2 !== "undefined" ? TEACH_MODULES_STAGE2 : null,
    3: typeof TEACH_MODULES_STAGE3 !== "undefined" ? TEACH_MODULES_STAGE3 : null,
  };
  specs.forEach((row) => {
    const subject = row[0];
    const id = row[1];
    const name = row[2];
    const stage = row[3];
    const bank = banks[stage];
    if (!bank) return;
    if (!SKILLS[subject]) SKILLS[subject] = {};
    if (!SKILLS[subject][id]) SKILLS[subject][id] = { name: name, gcse: "Primary" };
    if (!bank[subject]) bank[subject] = {};
    const qs = row[8].map((q, i) => {
      const ramp = stage >= 3 && i === row[8].length - 1 ? 2 : 1;
      if (q[0] === "m") {
        return { q: q[1], type: "multi", options: q[2], answer: q[3], explain: q[4], stage: "both", ramp: ramp };
      }
      return { q: q[1], type: "typed", answer: String(q[2]), explain: q[3], stage: "both", ramp: ramp };
    });
    const hq = row[10];
    const helpQ =
      hq[0] === "m"
        ? { q: hq[1], type: "multi", options: hq[2], answer: hq[3], explain: hq[4], stage: "both", ramp: 1 }
        : { q: hq[1], type: "typed", answer: String(hq[2]), explain: hq[3], stage: "both", ramp: 1 };
    bank[subject][id] = {
      title: row[4],
      blurb: row[5],
      videoKey: "",
      teach: { points: row[6], visual: "" },
      example: { title: "Worked example", steps: row[7] },
      practice: qs,
      struggle: { points: [row[9]], practice: [helpQ] },
    };
  });
}
