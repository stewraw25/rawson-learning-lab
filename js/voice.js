/**
 * Grok Voice (TTS) for Rawson Learning Lab Coach
 * Primary: xAI TTS via proxy (required for real Grok voice in browser)
 * Fallback: browser SpeechSynthesis — only if provider is "auto" or "browser"
 *
 * Docs: POST https://api.x.ai/v1/tts  { text, voice_id, language } → audio
 */

const VOICE_PREF_KEY = "rawson-learning-voice-prefs-v1";
const GROK_VOICES = [
  { id: "eve", label: "Eve (clear, friendly)" },
  { id: "ara", label: "Ara" },
  { id: "rex", label: "Rex" },
  { id: "sal", label: "Sal" },
  { id: "leo", label: "Leo" },
];

let currentAudio = null;
let speaking = false;
/** Last error / status for UI */
let lastVoiceStatus = { ok: false, provider: null, error: "" };

function getLastVoiceStatus() {
  return lastVoiceStatus;
}

function defaultVoicePrefs() {
  return {
    // Off by default — Apple robot voice is scary for kids; enable when Grok Voice is proven
    enabled: false,
    autoSpeak: false,
    provider: "grok",
    voiceId: "eve",
    rate: 1,
    allowBrowserFallback: false,
  };
}

function getVoicePrefs() {
  try {
    // One-time: turn off robot voice if older prefs had auto Apple TTS on
    const migKey = "rawson-voice-mig-v2-off";
    if (!localStorage.getItem(migKey)) {
      localStorage.setItem(migKey, "1");
      const raw0 = localStorage.getItem(VOICE_PREF_KEY);
      if (raw0) {
        try {
          const old = JSON.parse(raw0);
          // Force chat-only until parent re-enables Grok Voice intentionally
          localStorage.setItem(
            VOICE_PREF_KEY,
            JSON.stringify({
              ...defaultVoicePrefs(),
              ...old,
              enabled: false,
              autoSpeak: false,
            })
          );
        } catch (_) {
          localStorage.setItem(VOICE_PREF_KEY, JSON.stringify(defaultVoicePrefs()));
        }
      }
    }
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
    .slice(0, 1200);
}

function voiceStatusHtml() {
  const s = lastVoiceStatus;
  const prefs = getVoicePrefs();
  if (!prefs.enabled) {
    return `<p class="voice-status muted">Voice is off in AI settings.</p>`;
  }
  if (s.provider === "grok" && s.ok) {
    return `<p class="voice-status voice-ok">🔊 Using <strong>Grok Voice</strong> (${prefs.voiceId || "eve"})</p>`;
  }
  if (s.provider === "browser" && s.ok) {
    return `<p class="voice-status voice-warn">⚠️ Using <strong>Apple/Mac voice</strong> — Grok Voice did not connect.
      ${s.error ? `<br><span class="muted">${escapeVoice(s.error)}</span>` : ""}
      <br>Fix: Parent zone → AI settings → set Proxy to <code>http://127.0.0.1:8787</code> and run the local proxy (see README).</p>`;
  }
  if (s.error) {
    return `<p class="voice-status voice-warn">⚠️ Grok Voice error: ${escapeVoice(s.error)}</p>`;
  }
  return `<p class="voice-status muted">Voice ready — tap Hear Coach (needs Grok key + proxy for real Grok sound).</p>`;
}

function escapeVoice(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .slice(0, 200);
}

/**
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

  const wantGrok = prefs.provider !== "browser";
  const allowBrowser =
    prefs.provider === "browser" ||
    prefs.provider === "auto" ||
    prefs.allowBrowserFallback === true ||
    opts.allowBrowserFallback === true;

  if (wantGrok && prefs.provider !== "browser") {
    try {
      await speakWithGrok(clean, prefs.voiceId || "eve");
      speaking = false;
      lastVoiceStatus = { ok: true, provider: "grok", error: "" };
      updateVoiceStatusBanners();
      return "grok";
    } catch (e) {
      const err = e.message || String(e);
      console.warn("Grok TTS failed", e);
      lastVoiceStatus = { ok: false, provider: "grok", error: err };
      updateVoiceStatusBanners();

      if (prefs.provider === "grok" && !allowBrowser && !opts.allowBrowserFallback) {
        speaking = false;
        // Don't silently use Apple — surface the problem
        throw new Error(
          "Grok Voice failed: " +
            err +
            ". Run the local proxy (node worker/local-voice-proxy.mjs) and set Proxy URL to http://127.0.0.1:8787"
        );
      }
    }
  }

  if (allowBrowser || prefs.provider === "browser" || prefs.provider === "auto") {
    try {
      await speakWithBrowser(clean, prefs.rate || 1);
      speaking = false;
      if (wantGrok && lastVoiceStatus.error) {
        lastVoiceStatus = {
          ok: true,
          provider: "browser",
          error: lastVoiceStatus.error,
        };
      } else {
        lastVoiceStatus = { ok: true, provider: "browser", error: "" };
      }
      updateVoiceStatusBanners();
      return "browser";
    } catch (e) {
      speaking = false;
      lastVoiceStatus = {
        ok: false,
        provider: "browser",
        error: e.message || String(e),
      };
      updateVoiceStatusBanners();
      return "error";
    }
  }

  speaking = false;
  return "error";
}

function updateVoiceStatusBanners() {
  document.querySelectorAll("#voiceStatusBanner, .voice-status-slot").forEach((el) => {
    el.innerHTML = voiceStatusHtml();
  });
}

async function speakWithGrok(text, voiceId) {
  const proxy = typeof getAiProxy === "function" ? getAiProxy() : "";
  const key = typeof getAiKey === "function" ? getAiKey() : "";

  // Prefer proxy — browsers block api.x.ai with CORS
  const endpoints = [];
  if (proxy) {
    endpoints.push({
      url: `${proxy.replace(/\/$/, "")}/tts`,
      headers: {
        "Content-Type": "application/json",
        ...(key ? { "X-Api-Key": key } : {}),
      },
    });
  }
  // Also try default local proxy if not set (common setup)
  if (!proxy || !/127\.0\.0\.1|localhost/.test(proxy)) {
    endpoints.push({
      url: "http://127.0.0.1:8787/tts",
      headers: {
        "Content-Type": "application/json",
        ...(key ? { "X-Api-Key": key } : {}),
      },
    });
  }
  if (key) {
    endpoints.push({
      url: "https://api.x.ai/v1/tts",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    });
  }

  if (!endpoints.length) {
    throw new Error("No API key and no proxy URL set");
  }

  let lastErr = "Unknown error";
  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url, {
        method: "POST",
        headers: ep.headers,
        body: JSON.stringify({
          text,
          voice_id: voiceId || "eve",
          language: "en",
        }),
      });

      const ct = (res.headers.get("content-type") || "").toLowerCase();
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        lastErr = `${ep.url} → ${res.status} ${t.slice(0, 120)}`;
        // CORS failures throw before this; 404 means old proxy without /tts
        continue;
      }

      // Must be audio, not JSON error
      if (ct.includes("json")) {
        const t = await res.text();
        lastErr = `Got JSON not audio: ${t.slice(0, 120)}`;
        continue;
      }

      const blob = await res.blob();
      if (blob.size < 100) {
        lastErr = "Audio response too small";
        continue;
      }

      // Ensure browser treats as audio
      const audioBlob =
        ct.includes("audio") || ct.includes("mpeg") || ct.includes("mp3")
          ? blob
          : new Blob([blob], { type: "audio/mpeg" });

      const url = URL.createObjectURL(audioBlob);
      await playAudioUrl(url);
      return;
    } catch (e) {
      lastErr = `${ep.url} → ${e.message || e}`;
      // TypeError Failed to fetch = CORS or proxy not running
      if (/Failed to fetch|NetworkError|Load failed/i.test(String(e.message || e))) {
        lastErr =
          "Cannot reach Grok Voice (proxy not running or blocked). Start: node worker/local-voice-proxy.mjs";
      }
    }
  }
  throw new Error(lastErr);
}

function playAudioUrl(url) {
  return new Promise((resolve, reject) => {
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
    const voices = window.speechSynthesis.getVoices() || [];
    const gb =
      voices.find((v) => /en-GB/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang));
    if (gb) u.voice = gb;
    u.onend = () => resolve();
    u.onerror = (e) => reject(e.error || new Error("speech error"));
    window.speechSynthesis.speak(u);
  });
}

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
        const which = await speakText(text, { force: true });
        if (which === "browser") {
          // brief non-blocking notice
          console.info("Played with Apple voice — start local Grok proxy for real Grok Voice");
        }
      } catch (e) {
        alert(
          (e.message || "Could not play Grok Voice") +
            "\n\nQuick fix on this Mac:\n1. Terminal: export XAI_API_KEY='your-key'\n2. node worker/local-voice-proxy.mjs\n3. AI settings → Proxy = http://127.0.0.1:8787\n4. Voice engine = Grok Voice only\n5. Test voice"
        );
      }
      btn.removeAttribute("data-voice-speaking");
      btn.textContent = btn.dataset.voiceLabel;
    });
  });
}

async function maybeAutoSpeak(text) {
  // Voice disabled by default for kids — chat-only Coach until Grok Voice is set up
  const prefs = getVoicePrefs();
  if (!prefs.enabled || !prefs.autoSpeak) return;
  // Never auto-use Apple robot voice
  if (prefs.provider === "browser") return;
  try {
    await speakText(text, { allowBrowserFallback: false });
  } catch (e) {
    console.warn("Auto-speak Grok failed (silent — chat still works)", e.message || e);
    updateVoiceStatusBanners();
  }
}
