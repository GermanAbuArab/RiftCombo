#!/usr/bin/env node
// Serve the built site for signed-in QA on a THROWAWAY Neon branch (#533). The whole procedure, and
// what a green run does not prove, is "Signed-in QA" in docs/rules-notes/method.md.
//
// The product has one sign-in button and it is Google, which no agent can pass. So this script gives
// the test identity another way in that exists only on this machine: `/__qa/sign-in` is answered from
// this file, is never written to `public/`, and is the reason the entrance did not have to change.
//
// NEVER AGAINST PRODUCTION `main`. Email-and-password is off there on purpose (see the header of
// `scripts/check-rls-neon.mjs`), so this script refuses the default branch before it creates anyone,
// refuses URLs that are not that branch's own, and refuses a bundle built against any other auth URL.
//
//   NEON_AUTH_URL=... NEON_DATA_API_URL=... NEON_PROJECT_ID=... NEON_BRANCH_ID=... \
//     ~/.personal-claude/scripts/secret-env riftcombo -- node scripts/qa-serve.mjs
//
// The four coordinates are public. RIFTCOMBO_QA_EMAIL and RIFTCOMBO_QA_PASSWORD come from the secrets
// file, and THE CREDENTIAL IS NEVER PRINTED OR LOGGED: the browser receives it once, inside the
// sign-in script, so nobody types it and neither a tool call nor a page snapshot ever carries it.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export const SIGN_IN_PAGE = "/__qa/sign-in";
export const SIGN_IN_SCRIPT = "/__qa/sign-in.js";

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2", ".map": "application/json", ".png": "image/png", ".txt": "text/plain; charset=utf-8",
};

/** Only a branch that says it is not the default counts: an answer with no such field is not a yes. */
export const isThrowaway = (answer) => (answer?.branch ?? answer)?.default === false;

/**
 * Production's own headers, so a CSP or COOP break shows up here too. Two changes: `connect-src` names
 * the child branch's origins, since a new branch mints a new endpoint, and HSTS goes, because it means
 * nothing on plain http.
 */
export function qaHeaders(vercel, origins) {
  const all = vercel.headers.find((h) => h.source === "/(.*)").headers;
  const headers = Object.fromEntries(all.map((h) => [h.key, h.value]));
  delete headers["Strict-Transport-Security"];
  headers["Content-Security-Policy"] = headers["Content-Security-Policy"]
    .replace(/connect-src [^;]*/, `connect-src 'self' ${origins.join(" ")}`);
  return headers;
}

/**
 * Whether the two URLs are the ones Neon names for the branch `isThrowaway` checked. Without this a
 * child's id passes that check while the credential goes to whatever URL sits next to it.
 */
export function urlsOfBranch({ authUrl, dataUrl }, auth, dataApi) {
  const trim = (url) => url?.replace(/\/+$/, "");
  return trim(auth?.base_url) === authUrl && trim(dataApi?.url) === dataUrl;
}

/** Whether the bundle talks to this branch: with only the auth URL right, the page reads another branch's rows. */
export const isBuiltFor = (bundle, { authUrl, dataUrl }) => bundle.includes(authUrl) && bundle.includes(dataUrl);

/**
 * The destination a vercel.json rewrite gives a path, or the path itself. Only the two source shapes
 * the file uses: an exact path and a `/<prefix>/:path*` tail, which matches `/<prefix>` too (#287).
 */
export function rewritten(rewrites, pathname) {
  for (const { source, destination } of rewrites ?? []) {
    const tail = /^(.*)\/:path\*$/.exec(source);
    if (tail ? pathname === tail[1] || pathname.startsWith(`${tail[1]}/`) : pathname === source) return destination;
  }
  return pathname;
}

/** The file under `root` a path means, with Vercel's `cleanUrls` reading, or null. Never outside `root`. */
export function publicFile(root, pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  const base = resolve(root);
  const file = resolve(base, `.${decoded === "/" ? "/index.html" : decoded}`);
  if (!file.startsWith(base + sep)) return null;
  for (const candidate of [file, `${file}.html`]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

const signInPage = `<!doctype html>
<meta charset="utf-8">
<title>QA sign-in</title>
<link rel="icon" href="data:,">
<p id="state">Signing in. If this line stays, the script was already spent: restart qa-serve.</p>
<script type="module" src="${SIGN_IN_SCRIPT}"></script>
`;

// Only the status reaches the page: an error body could echo what was sent.
const signInScript = ({ authUrl, email, password }) => `const state = document.getElementById("state");
try {
  const res = await fetch(${JSON.stringify(`${authUrl}/sign-in/email`)}, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: ${JSON.stringify(JSON.stringify({ email, password }))},
  });
  if (res.ok) location.replace("/decks");
  else state.textContent = "Sign-in refused: " + res.status;
} catch {
  state.textContent = "Sign-in failed: no answer from the auth host";
}
`;

// The page's own module script, as a browser describes it. A browser will not let a page forge these,
// so another origin is refused here, before it can read the credential or spend it.
const isOwnScript = ({ "sec-fetch-site": site, "sec-fetch-mode": mode, "sec-fetch-dest": dest }) =>
  site === "same-origin" && mode === "cors" && dest === "script";

/**
 * Bound to loopback by the caller. The Host check is what stops a rebound DNS name from reaching this
 * server from a web page, Fetch Metadata stops any other page, opened anywhere on this machine, from
 * running the sign-in or touching its script, and the credential goes out once, so a second reader
 * gets nothing. A local process can forge those headers, but it can read the secrets file as well.
 */
export function createQaServer({ root, headers, rewrites, authUrl, email, password }) {
  let handedOut = false;
  const server = createServer((req, res) => {
    const { port } = server.address();
    const send = (status, type, body, extra = {}) => {
      res.writeHead(status, { ...headers, "Content-Type": type, ...extra });
      res.end(body);
    };
    if (req.headers.host !== `localhost:${port}`) return send(403, TYPES[".txt"], "Forbidden");
    if (req.method !== "GET" && req.method !== "HEAD") return send(405, TYPES[".txt"], "Method not allowed");

    if (!req.url.startsWith("/")) return send(400, TYPES[".txt"], "Bad request");
    const [pathname] = req.url.split(/[?#]/, 1);
    if (pathname === SIGN_IN_PAGE) {
      if (req.headers["sec-fetch-site"] !== "none") return send(403, TYPES[".txt"], "Forbidden");
      return send(200, TYPES[".html"], signInPage);
    }
    if (pathname === SIGN_IN_SCRIPT) {
      if (req.method !== "GET" || !isOwnScript(req.headers)) return send(403, TYPES[".txt"], "Forbidden");
      if (handedOut) return send(410, TYPES[".txt"], "Gone");
      handedOut = true;
      return send(200, TYPES[".js"], signInScript({ authUrl, email, password }), { "Cache-Control": "no-store" });
    }
    const file = publicFile(root, rewritten(rewrites, pathname));
    if (!file) return send(404, TYPES[".txt"], "Not found");
    return send(200, TYPES[extname(file)] ?? "application/octet-stream", readFileSync(file));
  });
  return server;
}

/** Create the identity on this branch if it is new, and make sure it owns one saved deck. */
async function seed({ authUrl, dataUrl, email, password }) {
  const json = { "Content-Type": "application/json", Origin: new URL(authUrl).origin };
  const post = (path, body) => fetch(`${authUrl}${path}`, { method: "POST", headers: json, body: JSON.stringify(body) });

  const signUp = await post("/sign-up/email", { email, password, name: "QA", callbackURL: new URL(authUrl).origin });
  // 422 is Better Auth's answer for an address already registered: a second run on the same branch.
  if (!signUp.ok && signUp.status !== 422) throw new Error(`sign-up answered ${signUp.status}`);
  const login = await post("/sign-in/email", { email, password });
  if (!login.ok) throw new Error(`sign-in answered ${login.status}`);

  const cookie = login.headers.getSetCookie().map((line) => line.split(";", 1)[0]).join("; ");
  const session = await fetch(`${authUrl}/get-session`, { headers: { Cookie: cookie } });
  const jwt = session.headers.get("Set-Auth-Jwt");
  if (!jwt) throw new Error("get-session returned no Set-Auth-Jwt");

  const rest = { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" };
  const listed = await fetch(`${dataUrl}/decks?select=id`, { headers: rest });
  if (!listed.ok) throw new Error(`listing decks answered ${listed.status}`);
  const decks = await listed.json();
  if (decks.length) return decks.length;

  const userId = JSON.parse(Buffer.from(jwt.split(".")[1], "base64url")).sub;
  const created = await fetch(`${dataUrl}/decks`, {
    method: "POST", headers: rest,
    body: JSON.stringify({ user_id: userId, name: "QA deck", deck_text: "1 Lux, Illuminated", format: "constructed" }),
  });
  if (!created.ok) throw new Error(`saving the deck answered ${created.status}`);
  return 1;
}

async function main() {
  const { NEON_AUTH_URL, NEON_DATA_API_URL, NEON_PROJECT_ID, NEON_BRANCH_ID, RIFTCOMBO_QA_EMAIL, RIFTCOMBO_QA_PASSWORD } = process.env;
  const missing = Object.entries({
    NEON_AUTH_URL, NEON_DATA_API_URL, NEON_PROJECT_ID, NEON_BRANCH_ID, RIFTCOMBO_QA_EMAIL, RIFTCOMBO_QA_PASSWORD,
  }).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) {
    console.error(`missing from the environment: ${missing.join(", ")}`);
    process.exit(2);
  }

  const neon = (...args) => JSON.parse(execFileSync("neonctl",
    [...args, "--project-id", NEON_PROJECT_ID, "-o", "json"],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
  if (!isThrowaway(neon("branches", "get", NEON_BRANCH_ID))) {
    console.error(`refusing: ${NEON_BRANCH_ID} is not a throwaway child branch.`);
    process.exit(2);
  }

  const root = join(ROOT, "public");
  const authUrl = NEON_AUTH_URL.replace(/\/+$/, "");
  const dataUrl = NEON_DATA_API_URL.replace(/\/+$/, "");
  const [auth, dataApi] = [neon("neon-auth", "status", "--branch", NEON_BRANCH_ID), neon("data-api", "get", "--branch", NEON_BRANCH_ID)];
  if (!urlsOfBranch({ authUrl, dataUrl }, auth, dataApi)) {
    console.error(`refusing: the two URLs are not the ones Neon names for ${NEON_BRANCH_ID}.`);
    process.exit(2);
  }
  if (!isBuiltFor(readFileSync(join(root, "app.js"), "utf8"), { authUrl, dataUrl })) {
    console.error("refusing: public/app.js was not built against this branch. Run npm run build:web with these two URLs.");
    process.exit(2);
  }

  const identity = { email: RIFTCOMBO_QA_EMAIL, password: RIFTCOMBO_QA_PASSWORD };
  const decks = await seed({ authUrl, dataUrl, ...identity });
  const origins = [new URL(authUrl).origin, new URL(dataUrl).origin];
  const vercel = JSON.parse(readFileSync(join(ROOT, "vercel.json"), "utf8"));
  const headers = qaHeaders(vercel, origins);

  const server = createQaServer({ root, headers, rewrites: vercel.rewrites, authUrl, ...identity });
  server.listen(0, "127.0.0.1", () => {
    console.log(`saved decks of the test identity: ${decks}`);
    console.log(`open http://localhost:${server.address().port}${SIGN_IN_PAGE}`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
