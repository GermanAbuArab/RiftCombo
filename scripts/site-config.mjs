// Build-time configuration shared by the bundler and the header generator.
//
// Both values are PUBLIC: the Supabase anon key travels inside every browser bundle Supabase ships,
// and what keeps one player's rows away from another is RLS in the database. The service_role key
// and the database password are not read here and never reach the client.
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

export function siteConfig(root) {
  loadEnvLocal(root);
  const url = (process.env.SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
  const anonKey = (process.env.SUPABASE_ANON_KEY ?? "").trim();
  if (url && !/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/.test(url)) {
    throw new Error(`SUPABASE_URL is not a Supabase project origin: ${url}`);
  }
  return { url, anonKey };
}
