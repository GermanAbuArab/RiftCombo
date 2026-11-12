#!/usr/bin/env node
// The `devCommand` in vercel.json (#586). `vercel dev` runs that command and proxies to the port in $PORT;
// without one it falls back to the package.json `dev` script, which calls `vercel dev` again and fails with
// DEV_RECURSIVE_INVOCATION. vercel dev itself applies cleanUrls, rewrites and the api/ functions, so this
// only has to hand out the built files in public/.
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC = resolve(join(dirname(fileURLToPath(import.meta.url)), "..", "public"));
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2", ".map": "application/json", ".png": "image/png", ".txt": "text/plain; charset=utf-8",
};

createServer((req, res) => {
  let path;
  try { path = decodeURIComponent(new URL(req.url, "http://x").pathname); } catch { res.writeHead(400).end("bad request"); return; }
  let file = resolve(join(PUBLIC, path.endsWith("/") ? `${path}index.html` : path));
  if (file !== PUBLIC && !file.startsWith(PUBLIC + sep)) { res.writeHead(403).end(); return; }
  if (!existsSync(file) || statSync(file).isDirectory()) file += ".html";
  if (!existsSync(file)) { res.writeHead(404).end("not found"); return; }
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file));
}).listen(Number(process.env.PORT), "127.0.0.1");
