#!/usr/bin/env node
// The `devCommand` in vercel.json (#586). `vercel dev` runs that command and proxies to the port in $PORT;
// without one it falls back to the package.json `dev` script, which calls `vercel dev` again and fails with
// DEV_RECURSIVE_INVOCATION. vercel dev itself applies cleanUrls, rewrites and the api/ functions, so this
// only has to hand out the built files in public/ (requestPath drops the query vercel dev encodes into a
// rewritten path, #597), with the headers vercel.json declares for it, which vercel dev does not add to a
// proxied response (#605). vercel.json is read once at start: restart npm run dev after `npm run headers`.
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { headerRules, headersFor, requestPath } from "./dev-support.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = resolve(join(ROOT, "public"));
const HEADERS = headerRules(JSON.parse(readFileSync(join(ROOT, "vercel.json"), "utf8")));
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2", ".map": "application/json", ".png": "image/png", ".txt": "text/plain; charset=utf-8",
};

createServer((req, res) => {
  const path = requestPath(req.url);
  // On every answer, 400 and 404 included, as production's vercel.json headers are; a path that does not
  // decode is matched raw, which only the /(.*) rule can match.
  for (const [key, value] of Object.entries(headersFor(path ?? req.url, HEADERS))) res.setHeader(key, value);
  if (path === null) { res.writeHead(400).end("bad request"); return; }
  let file = resolve(join(PUBLIC, path.endsWith("/") ? `${path}index.html` : path));
  if (file !== PUBLIC && !file.startsWith(PUBLIC + sep)) { res.writeHead(403).end(); return; }
  try {
    if (!existsSync(file) || statSync(file).isDirectory()) file = existsSync(`${file}.html`) ? `${file}.html` : join(file, "index.html");
    if (!existsSync(file) || !statSync(file).isFile()) { res.writeHead(404).end("not found"); return; }
    const body = readFileSync(file);
    // hasHeader is case-insensitive: a vercel.json Content-Type (the manifest's) wins over ours, not doubles it.
    if (!res.hasHeader("content-type")) res.setHeader("content-type", TYPES[extname(file)] ?? "application/octet-stream");
    res.writeHead(200).end(body);
  } catch { res.writeHead(500).end("read failed"); }
}).listen(Number(process.env.PORT), "127.0.0.1");
