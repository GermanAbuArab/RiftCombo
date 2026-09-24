#!/usr/bin/env node
// Step 8 of the Neon cutover (docs/superpowers/plans/2026-09-21-neon-migration-plan.md): copy every
// deck saved on Supabase into Neon's `migration.staged_decks`, keyed to its owner's Google account
// id, where each player's first sign-in on Neon claims it (neon/migrations/0004_staged_decks.sql).
//
//   node scripts/stage-supabase-decks.mjs <export-file-outside-the-repo>
//
// Supabase credentials come from `.env.local` through site-config's loader (SUPABASE_URL and the
// service_role key, which exist only on the operator's machine). Neon is reached through `neonctl`,
// already authenticated there, with NEON_PROJECT_ID and NEON_BRANCH_ID naming the target. No
// credential is printed, and the deck text only ever goes to the export file (mode 0600, refused
// inside the repository) and to psql's stdin.
//
// Run it at cutover, not before: a deck saved on Supabase after the export would be left behind.
// It refuses to run against a non-empty staging table, so it cannot double-stage.

import { execFileSync } from "node:child_process";
import { realpathSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvLocal } from "./site-config.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2];
if (!out) { console.error("usage: node scripts/stage-supabase-decks.mjs <export-file-outside-the-repo>"); process.exit(64); }
// Real paths on both sides: /tmp is a symlink to /private/tmp on macOS, and comparing the spelled
// paths let an export land inside a worktree there (caught 2026-09-24 by the refusal test).
if (join(realpathSync(dirname(resolve(out))), "/").startsWith(join(realpathSync(ROOT), "/"))) { console.error("refusing: the export is user data and must live outside the repository"); process.exit(64); }

loadEnvLocal(ROOT);
const { SUPABASE_URL: sb, SUPABASE_SERVICE_ROLE_KEY: key, NEON_PROJECT_ID: project, NEON_BRANCH_ID: branch } = process.env;
if (!sb || !key || !project || !branch) {
  console.error("need SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (from .env.local), NEON_PROJECT_ID, NEON_BRANCH_ID");
  process.exit(2);
}

const target = ["--project-id", project, "--branch", branch, "--role-name", "neondb_owner"];
const psql = (args, input) => execFileSync("neonctl", ["psql", ...target, "--", ...args],
  { encoding: "utf8", input, stdio: [input === undefined ? "ignore" : "pipe", "pipe", "pipe"] });
const value = (q) => (psql(["-Atc", `select 'v:' || (${q})`]).split("\n").find((l) => l.startsWith("v:")) ?? "").slice(2);

const already = value("select count(*) from migration.staged_decks");
if (already !== "0") { console.error(`refusing: migration.staged_decks already holds ${already || "?"} rows`); process.exit(1); }

const h = { apikey: key, Authorization: `Bearer ${key}` };
const get = async (path) => {
  const res = await fetch(`${sb}${path}`, { headers: h });
  if (!res.ok) throw new Error(`${path.split("?")[0]} answered ${res.status}`);
  return res.json();
};

const decks = await get("/rest/v1/decks?select=user_id,name,deck_text,format,created_at,updated_at");
const subOf = new Map();
for (const id of new Set(decks.map((d) => d.user_id))) {
  const user = await get(`/auth/v1/admin/users/${id}`);
  const google = (user.identities ?? []).find((i) => i.provider === "google");
  const sub = google?.identity_data?.sub;
  // A deck whose owner has no Google identity could never be claimed; stop rather than strand it.
  if (!/^\d+$/.test(sub ?? "")) throw new Error(`owner ${id.slice(0, 8)}… has no Google account id; nothing staged`);
  subOf.set(id, sub);
}

const rows = decks.map((d) => ({ google_sub: subOf.get(d.user_id), name: d.name, deck_text: d.deck_text, format: d.format, created_at: d.created_at, updated_at: d.updated_at }));
writeFileSync(out, JSON.stringify({ exported_at: new Date().toISOString(), supabase_decks: decks, staged: rows }, null, 1), { mode: 0o600 });

const lit = (v) => `'${String(v).replace(/'/g, "''")}'`;
const insert = rows.length === 0 ? "select 1;" :
  "insert into migration.staged_decks (google_sub, name, deck_text, format, created_at, updated_at) values\n" +
  rows.map((r) => `(${[r.google_sub, r.name, r.deck_text, r.format, r.created_at, r.updated_at].map(lit).join(", ")})`).join(",\n") + ";";
psql(["-v", "ON_ERROR_STOP=1", "-f", "-"], `begin;\n${insert}\ncommit;\n`);

const staged = value("select count(*) from migration.staged_decks");
console.log(`supabase decks: ${decks.length} from ${subOf.size} owners | staged on Neon: ${staged} | export: ${out}`);
process.exit(String(decks.length) === staged ? 0 : 1);
