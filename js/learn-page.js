/**
 * Dedicated learning window — AI step-by-step guide for one question
 */

(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const statusEl = document.getElementById("learnStatus");
  const guideContent = document.getElementById("guideContent");
  const guidePlaceholder = document.getElementById("guidePlaceholder");
  const questionBlock = document.getElementById("questionBlock");
  const titleEl = document.getElementById("learnTitle");

  let ctx = null;

  function setStatus(msg) {
    statusEl.textContent = msg || "";
  }

  function escapeHtml(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Lightweight markdown → HTML for AI output */
  function simpleMarkdown(md) {
    let html = escapeHtml(md || "");
    // code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    // bold
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    // headings
    html = html.replace(/^### (.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.+)$/gm, "<h2>$1</h2>");
    // unordered lists
    html = html.replace(/(?:^|\n)((?:[-*] .+(?:\n|$))+)/g, (block) => {
      const items = block
        .trim()
        .split("\n")
        .map((line) => line.replace(/^[-*] /, "").trim())
        .filter(Boolean)
        .map((i) => `<li>${i}</li>`)
        .join("");
      return `\n<ul>${items}</ul>\n`;
    });
    // ordered lists
    html = html.replace(/(?:^|\n)((?:\d+\. .+(?:\n|$))+)/g, (block) => {
      const items = block
        .trim()
        .split("\n")
        .map((line) => line.replace(/^\d+\. /, "").trim())
        .filter(Boolean)
        .map((i) => `<li>${i}</li>`)
        .join("");
      return `\n<ol>${items}</ol>\n`;
    });
    // paragraphs
    html = html
      .split(/\n{2,}/)
      .map((chunk) => {
        const t = chunk.trim();
        if (!t) return "";
        if (t.startsWith("<h2") || t.startsWith("<ul") || t.startsWith("<ol")) return t;
        return `<p>${t.replace(/\n/g, "<br>")}</p>`;
      })
      .join("\n");
    return html;
  }

  function loadContext() {
    if (!id) {
      questionBlock.innerHTML =
        "<p>No lesson was linked. Go back to a question and press <strong>Learn about this subject</strong>.</p>";
      document.getElementById("btnGenerate").disabled = true;
      return;
    }
    try {
      const raw = localStorage.getItem("rawson-learn-session-" + id);
      if (!raw) {
        questionBlock.innerHTML =
          "<p>This learning session expired or was opened on a different browser profile. Close this window and press the button again from the quiz.</p>";
        document.getElementById("btnGenerate").disabled = true;
        return;
      }
      ctx = JSON.parse(raw);
    } catch {
      questionBlock.innerHTML = "<p>Could not read the question data.</p>";
      document.getElementById("btnGenerate").disabled = true;
      return;
    }

    titleEl.textContent = ctx.skillName
      ? `Learn: ${ctx.skillName}`
      : "Learn about this subject";

    let opts = "";
    if (ctx.type === "multi" && Array.isArray(ctx.options)) {
      opts = `<ol class="learn-options" type="A">${ctx.options
        .map((o) => `<li>${escapeHtml(o)}</li>`)
        .join("")}</ol>`;
    }

    questionBlock.innerHTML = `
      ${
        ctx.passage
          ? `<p class="learn-passage">${escapeHtml(ctx.passage)}</p>`
          : ""
      }
      <p class="learn-q-text">${escapeHtml(ctx.question)}</p>
      ${opts}
      <p class="learn-meta">${escapeHtml(ctx.subjectName || "")}${
      ctx.skillName ? " · " + escapeHtml(ctx.skillName) : ""
    }${ctx.learnerName ? " · for " + escapeHtml(ctx.learnerName) : ""}</p>
    `;
  }

  function offlineGuide() {
    const steps = [
      `## What this is about`,
      `This question is about **${ctx.skillName || "this topic"}** in ${ctx.subjectName || "your subject"}.`,
      `## What you need to know first`,
      ctx.explain
        ? `- Teacher tip: ${ctx.explain}`
        : `- Read the question slowly twice.\n- Underline the key numbers or words.`,
      `## Worked idea`,
      `1. Write down what you already know.`,
      `2. Choose a method (calculate, eliminate options, or find evidence in the passage).`,
      `3. Check your answer makes sense.`,
      `## How to tackle THIS question`,
      ctx.explain
        ? `Follow this: ${ctx.explain}`
        : `Break the problem into small steps and check each one.`,
      ctx.type === "multi"
        ? `Look at each option and cross out ones that cannot be right.`
        : `Estimate first, then work it out carefully.`,
      `## Encouragement`,
      `You are learning — working slowly is smart. Try the question again on the main page when you are ready.`,
    ];
    return steps.join("\n\n");
  }

  async function generate(anotherWay) {
    if (!ctx) return;
    const btn = document.getElementById("btnGenerate");
    const btn2 = document.getElementById("btnRegenerate");
    btn.disabled = true;
    btn2.disabled = true;
    setStatus(anotherWay ? "Asking the tutor for another explanation…" : "AI tutor is writing your guide…");
    guidePlaceholder.hidden = true;
    guideContent.hidden = false;
    guideContent.innerHTML = `<p class="muted">Growing your garden lesson… 🌱</p>`;

    try {
      if (typeof isAiConfigured === "function" && isAiConfigured()) {
        const prompt = buildLearnWalkthroughPrompt(ctx);
        const extra = anotherWay
          ? "\n\nPlease explain it in a DIFFERENT way — use a simpler analogy (garden, cooking, or sport) and shorter sentences."
          : "";
        const text = await askGrok([
          {
            role: "system",
            content:
              "You are a warm UK home-education tutor. Use British spelling. Be clear and kind.",
          },
          { role: "user", content: prompt + extra },
        ]);
        guideContent.innerHTML = simpleMarkdown(text);
        setStatus("Guide ready ✓");
      } else {
        guideContent.innerHTML =
          simpleMarkdown(offlineGuide()) +
          `<p class="muted" style="margin-top:1rem"><em>Built-in guide (no AI key on this Mac). Add a Grok key under Parent zone → AI settings for richer walkthroughs.</em></p>`;
        setStatus("Built-in guide shown (AI key not set on this Mac)");
      }
      btn2.style.display = "inline-flex";
    } catch (e) {
      console.error(e);
      guideContent.innerHTML =
        simpleMarkdown(offlineGuide()) +
        `<p class="feedback bad" style="margin-top:1rem">AI could not run (${escapeHtml(
          e.message || "error"
        )}). Showing the built-in guide instead.</p>`;
      setStatus("Used built-in guide");
      btn2.style.display = "inline-flex";
    }

    btn.disabled = false;
    btn2.disabled = false;
  }

  document.getElementById("btnClose").onclick = () => window.close();
  document.getElementById("btnGenerate").onclick = () => generate(false);
  document.getElementById("btnRegenerate").onclick = () => generate(true);

  loadContext();
  // Auto-start guide so kids don't have an extra click if they want
  if (ctx) {
    setTimeout(() => generate(false), 200);
  }
})();
