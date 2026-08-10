/**
 * Cloudflare Worker — Grok (xAI) proxy for Rawson Learning Lab
 *
 * Routes:
 *   POST /chat  — chat completions
 *   POST /tts   — Grok Text-to-Speech (returns audio/mpeg)
 *
 * Deploy:
 *   1. npx wrangler login
 *   2. cd worker && npx wrangler secret put XAI_API_KEY
 *   3. npx wrangler deploy
 *   4. Paste worker URL into Learning Lab → Parent zone → AI settings
 */

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Api-Key",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/health") {
      return json({ ok: true, service: "rawson-xai-proxy", routes: ["/chat", "/tts"] }, cors);
    }

    const key =
      env.XAI_API_KEY ||
      request.headers.get("X-Api-Key") ||
      request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");

    if (!key) {
      return json({ error: "Missing XAI_API_KEY" }, cors, 401);
    }

    // —— Text to Speech ——
    if (url.pathname === "/tts" && request.method === "POST") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, cors, 400);
      }
      const text = String(body.text || "").slice(0, 2000);
      if (!text) return json({ error: "Missing text" }, cors, 400);

      const upstream = await fetch("https://api.x.ai/v1/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          text,
          voice_id: body.voice_id || body.voice || "eve",
          language: body.language || "en",
        }),
      });

      if (!upstream.ok) {
        const errText = await upstream.text();
        return new Response(errText, {
          status: upstream.status,
          headers: { ...cors, "Content-Type": "application/json" },
        });
      }

      const audio = await upstream.arrayBuffer();
      return new Response(audio, {
        status: 200,
        headers: {
          ...cors,
          "Content-Type": upstream.headers.get("Content-Type") || "audio/mpeg",
          "Cache-Control": "no-store",
        },
      });
    }

    // —— Chat ——
    if (url.pathname === "/chat" && request.method === "POST") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, cors, 400);
      }

      const upstream = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: body.model || "grok-3-mini",
          messages: body.messages || [],
          temperature: body.temperature ?? 0.5,
        }),
      });

      const text = await upstream.text();
      return new Response(text, {
        status: upstream.status,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return json({ error: "Not found. Use POST /chat or POST /tts" }, cors, 404);
  },
};

function json(obj, cors, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
