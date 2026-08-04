/**
 * Cloudflare Worker — Grok (xAI) proxy for Rawson Learning Lab
 *
 * Deploy:
 *   1. npm i -g wrangler  (or use npx wrangler)
 *   2. wrangler login
 *   3. cd worker && wrangler secret put XAI_API_KEY
 *   4. wrangler deploy
 *   5. Paste the worker URL into Learning Lab → Parent zone → AI settings → Proxy URL
 *
 * wrangler.toml example is alongside this file.
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
      return json({ ok: true, service: "rawson-xai-proxy" }, cors);
    }

    if (url.pathname !== "/chat" || request.method !== "POST") {
      return json({ error: "Not found" }, cors, 404);
    }

    const key =
      env.XAI_API_KEY ||
      request.headers.get("X-Api-Key") ||
      request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");

    if (!key) {
      return json({ error: "Missing XAI_API_KEY" }, cors, 401);
    }

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
  },
};

function json(obj, cors, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
