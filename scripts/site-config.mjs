// Build-time configuration shared by the bundler and the header generator.
//
// Both values are PUBLIC: they are the Neon Auth and Neon Data API endpoints of the project's branch,
// and every browser that signs in calls them. What keeps one player's rows away from another is RLS
// in the database. No key and no connection string is read here, and none reaches the client.
//
// They come from the environment — `.env.local` when building on a laptop, Vercel project
// environment variables in production — so the origin is set in one place and flows to both the
// bundle and the Content-Security-Policy.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Read `.env.local` without overriding anything already exported. No dependency, no surprises. */
export function loadEnvLocal(root) {
  const file = join(root, ".env.local");
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (!m) continue;
    const value = m[2].trim().replace(/^["'](.*)["']$/, "$1");
    if (process.env[m[1]] === undefined) process.env[m[1]] = value;
  }
}

/**
 * A Neon endpoint: https on a `*.neon.tech` host, and NOTHING FINER. The endpoint id and the
 * regional label vary between projects and branches (this project's hosts carry a `c-11` label that
 * Neon's own docs omit), so a regex fitted to one shape rejects the next. What the check buys is
 * refusing a typo or a non-Neon origin, which would otherwise switch the account layer off silently.
 */
const NEON = /^https:\/\/[a-z0-9.-]+\.neon\.tech\/.+$/;

export function siteConfig(root) {
  loadEnvLocal(root);
  const authUrl = (process.env.NEON_AUTH_URL ?? "").trim().replace(/\/+$/, "");
  const dataUrl = (process.env.NEON_DATA_API_URL ?? "").trim().replace(/\/+$/, "");
  if (Boolean(authUrl) !== Boolean(dataUrl)) {
    throw new Error("NEON_AUTH_URL and NEON_DATA_API_URL are set together or not at all");
  }
  for (const [name, value] of [["NEON_AUTH_URL", authUrl], ["NEON_DATA_API_URL", dataUrl]]) {
    if (value && !NEON.test(value)) throw new Error(`${name} is not a Neon endpoint: ${value}`);
  }
  // The CSP needs ORIGINS, and Neon serves Auth and the Data API from two different hosts.
  const origins = [...new Set([authUrl, dataUrl].filter(Boolean).map((u) => new URL(u).origin))];
  return { authUrl, dataUrl, origins };
}
