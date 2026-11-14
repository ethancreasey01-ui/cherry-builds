// Tiny static server for checking dist/ locally the way Vercel serves it: a real file, else <path>/index.html,
// else the app shell (vercel.json rewrite). Usage: node scripts/serve-dist.mjs [port]   (default 4173)
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");
const port = Number(process.argv[2] ?? 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".mp4": "video/mp4" };

async function find(urlPath) {
  const p = path.join(dist, path.normalize(decodeURIComponent(urlPath)));
  if (!p.startsWith(dist)) return null;
  for (const candidate of [p, path.join(p, "index.html")]) {
    try { if ((await stat(candidate)).isFile()) return candidate; } catch { /* try next */ }
  }
  return null;
}

http.createServer(async (req, res) => {
  const urlPath = new URL(req.url, "http://x").pathname;
  const file = await find(urlPath);
  const target = file ?? path.join(dist, "app-shell.html");
  res.writeHead(200, { "content-type": types[path.extname(target)] ?? "application/octet-stream" });
  res.end(await readFile(target));
}).listen(port, () => console.log(`serving dist/ at http://localhost:${port}`));
