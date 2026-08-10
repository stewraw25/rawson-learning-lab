/**
 * Local Grok Voice + Chat proxy for Rawson Learning Lab
 * Fixes browser CORS so Grok TTS (not Apple) can play.
 *
 * Setup (one Mac is enough if kids use that Mac; for every Mac, run this or use Cloudflare):
 *
 *   export XAI_API_KEY="xai-..."
 *   node worker/local-voice-proxy.mjs
 *
 * Then in Parent zone → AI settings:
 *   Proxy URL:  http://127.0.0.1:8787
 *   (API key can stay blank if set in the environment, or paste key in the app too)
 *
 * Leave this terminal window open while kids learn.
 */

import http from "http";

const PORT = Number(process.env.PORT || 8787);
const KEY = process.env.XAI_API_KEY || "";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Api-Key",
};

function sendJson(res, status, obj) {
  res.writeHead(status, { ...cors, "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function getKey(req) {
  return (
    KEY ||
    req.headers["x-api-key"] ||
    (req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  );
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, cors);
    res.end();
    return;
  }

  const url = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);

  if (url.pathname === "/" || url.pathname === "/health") {
    sendJson(res, 200, {
      ok: true,
      service: "rawson-local-xai-proxy",
      hasEnvKey: !!KEY,
      routes: ["/chat", "/tts"],
    });
    return;
  }

  const key = getKey(req);
  if (!key) {
    sendJson(res, 401, {
      error:
        "Missing API key. Set XAI_API_KEY in the terminal or paste key in the Learning Lab AI settings.",
    });
    return;
  }

  try {
    if (url.pathname === "/tts" && req.method === "POST") {
      const raw = await readBody(req);
      const body = JSON.parse(raw.toString("utf8") || "{}");
      const text = String(body.text || "").slice(0, 2000);
      if (!text) return sendJson(res, 400, { error: "Missing text" });

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

      const buf = Buffer.from(await upstream.arrayBuffer());
      if (!upstream.ok) {
        res.writeHead(upstream.status, { ...cors, "Content-Type": "application/json" });
        res.end(buf);
        return;
      }
      res.writeHead(200, {
        ...cors,
        "Content-Type": upstream.headers.get("content-type") || "audio/mpeg",
        "Cache-Control": "no-store",
      });
      res.end(buf);
      return;
    }

    if (url.pathname === "/chat" && req.method === "POST") {
      const raw = await readBody(req);
      const body = JSON.parse(raw.toString("utf8") || "{}");
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
      res.writeHead(upstream.status, { ...cors, "Content-Type": "application/json" });
      res.end(text);
      return;
    }

    sendJson(res, 404, { error: "Not found. Use POST /chat or POST /tts" });
  } catch (e) {
    sendJson(res, 500, { error: String(e.message || e) });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("");
  console.log("✓ Rawson Grok Voice proxy running");
  console.log(`  URL:  http://127.0.0.1:${PORT}`);
  console.log(`  Key:  ${KEY ? "from XAI_API_KEY env" : "will use key from the website"}`);
  console.log("");
  console.log("In Learning Lab → Parent zone → AI settings:");
  console.log(`  Proxy URL = http://127.0.0.1:${PORT}`);
  console.log("  Voice engine = Grok Voice only");
  console.log("  Then Test voice — you should hear Grok, not Apple.");
  console.log("");
  console.log("Keep this window open while learning.");
});
