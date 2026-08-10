/**
 * Grok Voice (TTS) for Rawson Learning Lab Coach
 * Primary: xAI TTS via proxy or API key
 * Fallback: browser SpeechSynthesis (always available)
 *
 * Docs: POST https://api.x.ai/v1/tts  { text, voice_id, language }
 */

const VOICE_PREF_KEY = "rawson-learning-voice-prefs-v1";
const GROK_VOICES = [
  { id: "eve", label: "Eve (default, clear)" },
  { id: "ara", label: "Ara" },
  { id: "rex", label: "Rex" },
  { id: "sal", label: "Sal" },
  { id: "leo", label: "Leo" },
];

let currentAudio = null;
let speaking = false;

function defaultVoicePrefs() {
  return {
    enabled: true,
    autoSpeak: true, // speak coach greetings & replies
    provider: "auto", // auto | grok | browser
    voiceId: "eve",
    rate: 1,
  };
}

function getVoicePrefs() {
  try {
    const raw = localStorage.getItem(VOICE_PREF_KEY);
    if (!raw) return defaultVoicePrefs();
    return { ...defaultVoicePrefs(), ...JSON.parse(raw) };
  } catch {
    return defaultVoicePrefs();
  }
}

function setVoicePrefs(partial) {
  const next = { ...getVoicePrefs(), ...partial };
  localStorage.setItem(VOICE_PREF_KEY, JSON.stringify(next));
  return next;
}

function stopSpeaking() {
  speaking = false;
  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = "";
      currentAudio = null;
    }
  } catch (_) {
    /* ignore */
  }
  try {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  } catch (_) {
    /* ignore */
  }
  document.querySelectorAll("[data-voice-speaking]").forEach((el) => {
    el.removeAttribute("data-voice-speaking");
    if (el.dataset.voiceLabel) el.textContent = el.dataset.voiceLabel;
  });
}

function stripForSpeech(text) {
  return String(text || "")
    .replace(/\*\*/g, "")
    .replace(/[_#`]/g, "")
    .replace(/💡/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1200); // keep TTS snappy for kids
}

/**
 * Speak text with Grok TTS if possible, else browser voice.
 * @returns {Promise<"grok"|"browser"|"off"|"error">}
 */
async function speakText(text, opts) {
  opts = opts || {};
  const prefs = getVoicePrefs();
  if (!prefs.enabled && !opts.force) return "off";

  const clean = stripForSpeech(text);
  if (!clean) return "off";

  stopSpeaking();
  speaking = true;

  const preferGrok =
    prefs.provider === "grok" ||
    (prefs.provider === "auto" &&
      typeof isAiConfigured === "function" &&
      isAiConfigured());

  if (preferGrok && prefs.provider !== "browser") {
    try {
      await speakWithGrok(clean, prefs.voiceId || "eve");
      speaking = false;
      return "grok";
    } catch (e) {
      console.warn("Grok TTS failed, falling back to browser", e);
      if (prefs.provider === "grok") {
        speaking = false;
        throw e;
      }
    }
  }

  try {
    await speakWithBrowser(clean, prefs.rate || 1);
    speaking = false;
    return "browser";
  } catch (e) {
    speaking = false;
    console.warn("Browser TTS failed", e);
    return "error";
  }
}

async function speakWithGrok(text, voiceId) {
  const proxy =
    typeof getAiProxy === "function" ? getAiProxy() : "";
  const key = typeof getAiKey === "function" ? getAiKey() : "";

  let res;
  if (proxy) {
    res = await fetch(`${proxy.replace(/\/$/, "")}/tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(key ? { "X-Api-Key": key } : {}),
      },
      body: JSON.stringify({
        text,
        voice_id: voiceId || "eve",
        language: "en",
      }),
    });
  } else if (key) {
    // Direct (may fail on CORS in some browsers)
    res = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        text,
        voice_id: voiceId || "eve",
        language: "en",
      }),
    });
  } else {
    throw new Error("No API key or proxy for Grok Voice");
  }

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`TTS ${res.status}: ${t.slice(0, 100)}`);
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  await new Promise((resolve, reject) => {
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      URL.revokeObjectURL(url);
      currentAudio = null;
      resolve();
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      currentAudio = null;
      reject(new Error("Audio playback failed"));
    };
    audio.play().catch(reject);
  });
}

function speakWithBrowser(text, rate) {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error("No speechSynthesis"));
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    u.rate = Math.min(1.15, Math.max(0.85, rate || 1));
    // Prefer a British voice if available
    const voices = window.speechSynthesis.getVoices() || [];
    const gb =
      voices.find((v) => /en-GB/i.test(v.lang) && /female|samantha|moira|fiona/i.test(v.name)) ||
      voices.find((v) => /en-GB/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang));
    if (gb) u.voice = gb;
    u.onend = () => resolve();
    u.onerror = (e) => reject(e.error || new Error("speech error"));
    window.speechSynthesis.speak(u);
  });
}

/** Wire a Speak button: data-speak-src="#elementId" or data-speak-text="..." */
function bindSpeakButtons(root) {
  const scope = root || document;
  scope.querySelectorAll("[data-speak]").forEach((btn) => {
    if (btn.dataset.speakBound) return;
    btn.dataset.speakBound = "1";
    btn.dataset.voiceLabel = btn.dataset.voiceLabel || btn.textContent;
    btn.addEventListener("click", async () => {
      if (speaking || btn.hasAttribute("data-voice-speaking")) {
        stopSpeaking();
        btn.textContent = btn.dataset.voiceLabel;
        return;
      }
      let text = btn.dataset.speakText || "";
      const src = btn.dataset.speakSrc;
      if (src) {
        const el = document.querySelector(src);
        if (el) text = el.textContent || "";
      }
      btn.setAttribute("data-voice-speaking", "1");
      btn.textContent = "⏹ Stop";
      try {
        await speakText(text, { force: true });
      } catch (e) {
        alert(
          "Could not play voice. Check AI settings (API key or proxy) or allow sound in the browser."
        );
      }
      btn.removeAttribute("data-voice-speaking");
      btn.textContent = btn.dataset.voiceLabel;
    });
  });
}

/**
 * Auto-speak if prefs allow (greetings / coach replies).
 */
async function maybeAutoSpeak(text) {
  const prefs = getVoicePrefs();
  if (!prefs.enabled || !prefs.autoSpeak) return;
  try {
    await speakText(text);
  } catch (_) {
    /* silent fail on auto */
  }
}
