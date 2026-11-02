/**
 * "Something's wrong?" — a way out of any lesson.
 * No accounts, no paid service, no secret keys.
 * Email opens on the device if Mail is set up. A copy is always kept
 * in this browser so a note is not lost.
 */
const SOMETHING_WRONG_EMAIL = "stewraw25@hotmail.co.uk";
const SOMETHING_WRONG_SUBJECT = "Something's wrong - Rawson Learning Lab";
const SOMETHING_WRONG_LOG_KEY = "rawson-something-wrong-v1";
const SOMETHING_WRONG_REASONS = [
  "Stuck",
  "The answer seems wrong",
  "A button doesn't work",
  "Too hard",
];

function somethingWrongButtonHtml() {
  return `<div class="sw-slot"><button type="button" class="btn btn-ghost btn-sw" data-something-wrong>Something's wrong?</button></div>`;
}

function clipReportText(value, max) {
  const text = String(value == null ? "" : value).replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return text.slice(0, max - 1) + "…";
}

function buildSomethingWrongMailto(ctx, reason, note) {
  const info = ctx || {};
  const body = [
    "Child: " + (info.learnerName || "Not signed in"),
    "Section: " + (info.section || ""),
    "Lesson: " + (info.lesson || ""),
    "Stage: " + (info.stage || ""),
    "Screen: " + (info.screen || ""),
    "Question: " + (clipReportText(info.question, 500) || "(not on a question yet)"),
    "Reason: " + (reason || "Not sure"),
    "Note: " + (clipReportText(note, 400) || "(no note)"),
  ].join("\n");
  return (
    "mailto:" +
    SOMETHING_WRONG_EMAIL +
    "?subject=" +
    encodeURIComponent(SOMETHING_WRONG_SUBJECT) +
    "&body=" +
    encodeURIComponent(body)
  );
}

function readSomethingWrongLog() {
  try {
    const raw = localStorage.getItem(SOMETHING_WRONG_LOG_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (_) {
    return [];
  }
}

function saveSomethingWrongReport(entry) {
  const list = readSomethingWrongLog();
  list.push(entry);
  const kept = list.slice(-100);
  localStorage.setItem(SOMETHING_WRONG_LOG_KEY, JSON.stringify(kept));
  return kept;
}

function closeSomethingWrong() {
  const old = document.getElementById("swOverlay");
  if (old) old.remove();
}

function bindSomethingWrong(root, ctx) {
  const scope = root && root.querySelector ? root : document;
  const btn = scope.querySelector("[data-something-wrong]");
  if (!btn || btn.dataset.swBound === "1") return;
  btn.dataset.swBound = "1";
  btn.addEventListener("click", () => openSomethingWrong(ctx || {}));
}

function openSomethingWrong(ctx) {
  closeSomethingWrong();
  if (window.__autoNextTimer) {
    clearTimeout(window.__autoNextTimer);
    window.__autoNextTimer = null;
  }
  const info = ctx || {};
  const overlay = document.createElement("div");
  overlay.className = "sw-overlay";
  overlay.id = "swOverlay";
  overlay.innerHTML = `
    <div class="sw-card" role="dialog" aria-labelledby="swTitle">
      <h2 id="swTitle">Something's wrong?</h2>
      <p class="sw-lead">Tell Stewart, then carry on. You will not get stuck.</p>
      <div class="sw-reasons" id="swReasons">
        ${SOMETHING_WRONG_REASONS.map(
          (reason) =>
            `<button type="button" class="sw-reason" data-reason="${escapeReport(reason)}">${escapeReport(
              reason
            )}</button>`
        ).join("")}
      </div>
      <label class="sw-label" for="swNote">Short note (you can leave this blank)</label>
      <textarea id="swNote" class="sw-note" maxlength="400" placeholder="What happened?"></textarea>
      <p class="sw-saved" id="swSaved" hidden>Saved on this device. If Mail did not open, the note is still here.</p>
      <div class="sw-actions">
        <button type="button" class="btn btn-primary btn-lg" id="swEmail">Email Stewart</button>
        <button type="button" class="btn btn-secondary btn-lg" id="swSkip">Skip this and carry on</button>
        <button type="button" class="btn btn-ghost" id="swClose">Close</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  let reason = "";
  let logged = false;
  overlay.querySelectorAll(".sw-reason").forEach((chip) => {
    chip.addEventListener("click", () => {
      reason = chip.getAttribute("data-reason") || "";
      overlay.querySelectorAll(".sw-reason").forEach((other) => {
        other.classList.toggle("is-on", other === chip);
      });
    });
  });

  function noteText() {
    const box = overlay.querySelector("#swNote");
    return box ? box.value : "";
  }

  function persist(action) {
    if (logged) return;
    logged = true;
    try {
      saveSomethingWrongReport({
        at: new Date().toISOString(),
        action: action,
        learnerName: info.learnerName || "",
        section: info.section || "",
        lesson: info.lesson || "",
        stage: info.stage || "",
        screen: info.screen || "",
        question: clipReportText(info.question, 500),
        reason: reason || "Not sure",
        note: clipReportText(noteText(), 400),
      });
    } catch (_) {
      /* storage blocked — email can still open */
    }
  }

  overlay.querySelector("#swEmail").addEventListener("click", () => {
    persist("email");
    const saved = overlay.querySelector("#swSaved");
    if (saved) saved.hidden = false;
    window.location.href = buildSomethingWrongMailto(info, reason || "Not sure", noteText());
  });
  overlay.querySelector("#swSkip").addEventListener("click", () => {
    persist("skip");
    closeSomethingWrong();
    if (typeof info.onSkip === "function") info.onSkip();
  });
  overlay.querySelector("#swClose").addEventListener("click", () => closeSomethingWrong());
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeSomethingWrong();
  });
}

function escapeReport(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
