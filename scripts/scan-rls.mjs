#!/usr/bin/env node
// Check 4 of #585: row access proved UNMOCKED, as the security scan's access-control suite check
// (personal-claude-issues#808). One command does the whole cycle on a throwaway Neon child branch
// named after the scan run, and leaves its output where the scan reads it back:
//
//   npm run scan:rls -- --run <run_name> [--out <dir>]
//
//   1. `neonctl branches create --parent main --name rls-<run_name>`, then email-and-password ON for
//      that branch only (production keeps it off; see the header of scripts/check-rls-neon.mjs).
//   2. reads the branch's own Neon Auth and Data API URLs, and refuses if either is main's.
//   3. runs `scripts/check-rls-neon.mjs` against the branch (two real users; it refuses main itself).
//   4. ALWAYS deletes the branch, then reads main back: email-and-password must read disabled and the
//      branch must be gone from `neonctl branches list`.
//   5. writes `check-rls.log` (every line of the run) and `check-rls.json` (the verdict) to
//      `<main checkout>/security_runs/<run_name>/suite/`, or to `--out`.
//
// Exit 0 only when the RLS run exited 0 with at least one pass line and no FAIL line, the branch is deleted and main reads disabled. The verdict
// counts for the scan run it is named after and for no other. No key is handled: `neonctl` is
// already authenticated on the operator's machine, the two URLs are public coordinates, and the RLS
// script creates and deletes its own random throwaway users.

import { execFileSync, spawnSync } from "node:child_process";
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT = process.env.NEON_PROJECT_ID || "quiet-breeze-27436036";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** `rls-<run>`, the run name verbatim (`RiftCombo_1e6375cf`, or an issue tag such as `585-…`), so two runs never share a branch. */
export function branchName(run) {
  if (typeof run !== "string" || !/^[A-Za-z0-9_-]{1,48}$/.test(run)) {
    throw new Error("--run <name> is required: letters, digits, '-' or '_', at most 48 characters");
  }
  return `rls-${run}`;
}

function main() {
  const arg = (flag) => { const i = process.argv.indexOf(flag); return i > 0 ? process.argv[i + 1] : undefined; };
  const run = arg("--run");
  const branch = branchName(run);
  const common = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], { cwd: ROOT, encoding: "utf8" }).trim();
  const out = resolve(arg("--out") ?? join(dirname(common), "security_runs", run, "suite"));
  mkdirSync(out, { recursive: true });
  const logFile = join(out, "check-rls.log");
  writeFileSync(logFile, "");
  const log = (line) => { console.log(line); appendFileSync(logFile, `${line}\n`); };
  const neon = (args) => execFileSync("neonctl", [...args, "--project-id", PROJECT, "-o", "json"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const verdict = { check: "check 4 of #585: RLS unmocked on a throwaway branch", run, branch, project: PROJECT, started: new Date().toISOString() };

  log(`scan:rls run ${run} -> branch ${branch} (project ${PROJECT})`);
  let created = false;
  try {
    const made = neon(["branches", "create", "--parent", "main", "--name", branch]);
    // Set before the output is read: once neonctl has returned, the branch exists and must be deleted.
    created = true;
    verdict.branch_id = (JSON.parse(made).branch ?? JSON.parse(made)).id;
    log(`created branch ${branch} = ${verdict.branch_id}`);
    neon(["neon-auth", "config", "email-password", "update", "--branch", branch, "--enabled", "true"]);
    log(`email-and-password enabled on ${branch} only`);

    const authUrl = JSON.parse(neon(["neon-auth", "status", "--branch", branch])).base_url;
    const dataUrl = JSON.parse(neon(["data-api", "get", "--branch", branch, "--database", "neondb"])).url;
    const mainAuth = JSON.parse(neon(["neon-auth", "status", "--branch", "main"])).base_url;
    const mainData = JSON.parse(neon(["data-api", "get", "--branch", "main", "--database", "neondb"])).url;
    if (!authUrl || !dataUrl) throw new Error(`branch ${branch} has no Neon Auth or Data API URL`);
    if (authUrl === mainAuth || dataUrl === mainData) throw new Error(`refusing: ${branch} answers on main's endpoint`);
    log(`branch endpoints: auth ${new URL(authUrl).host}, data ${new URL(dataUrl).host}`);

    const rls = spawnSync(process.execPath, [join(ROOT, "scripts", "check-rls-neon.mjs")], {
      cwd: ROOT,
      encoding: "utf8",
      env: { ...process.env, NEON_PROJECT_ID: PROJECT, NEON_BRANCH_ID: verdict.branch_id, NEON_AUTH_URL: authUrl, NEON_DATA_API_URL: dataUrl },
    });
    for (const line of `${rls.stdout}${rls.stderr}`.split("\n")) if (line.trim()) log(`  ${line}`);
    verdict.rls_exit = rls.status;
    verdict.rls_pass = (rls.stdout.match(/^pass {2}/gm) ?? []).length;
    verdict.rls_fail = (rls.stdout.match(/^FAIL {2}/gm) ?? []).length;
    log(`check-rls-neon.mjs exit ${rls.status}: ${verdict.rls_pass} pass, ${verdict.rls_fail} FAIL`);
  } catch (err) {
    verdict.error = err.message;
    log(`ERROR ${err.message}`);
  } finally {
    if (created) {
      try { neon(["branches", "delete", branch]); log(`deleted branch ${branch}`); }
      catch (err) { log(`ERROR deleting ${branch}: ${err.message}`); }
    }
    // Each read-back is guarded on its own, so a failed read is a `fail` verdict on disk, never a
    // missing one.
    try {
      const listed = JSON.parse(neon(["branches", "list"]));
      const after = Array.isArray(listed) ? listed : listed.branches;
      verdict.branches_after = after.map((b) => b.name).sort();
      // By id first, so the check does not depend on how Neon spells the name back.
      verdict.branch_deleted = !after.some((b) => b.id === verdict.branch_id || b.name.toLowerCase() === branch.toLowerCase());
      log(`branches after: ${verdict.branches_after.join(", ")}`);
    } catch (err) { verdict.error ??= `branches list: ${err.message}`; log(`ERROR branches list: ${err.message}`); }
    try {
      verdict.main_email_password_enabled = JSON.parse(neon(["neon-auth", "config", "email-password", "get", "--branch", "main"])).enabled;
      log(`main email-and-password enabled: ${verdict.main_email_password_enabled}`);
    } catch (err) { verdict.error ??= `main email-password read: ${err.message}`; log(`ERROR main email-password read: ${err.message}`); }
  }
  verdict.ended = new Date().toISOString();
  verdict.result = verdict.rls_exit === 0 && verdict.rls_fail === 0 && verdict.rls_pass > 0 && !verdict.error && verdict.branch_deleted && verdict.main_email_password_enabled === false ? "pass" : "fail";
  writeFileSync(join(out, "check-rls.json"), `${JSON.stringify(verdict, null, 2)}\n`);
  log(`result: ${verdict.result} (written to ${out})`);
  process.exit(verdict.result === "pass" ? 0 : 1);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
