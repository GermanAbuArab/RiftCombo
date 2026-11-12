#!/usr/bin/env node
// Check 2 of #585: after `npm run build:web`, the set of functions Vercel would deploy is exactly the
// table in `scripts/api-routes.mjs`. It runs as the last step of `build:web`, so a function nobody
// classified under `api/`, a root middleware, a `vercel.json` `builds` entry or a Build Output tree
// that this build writes fails it before it can deploy, and it prints both lists either way. It runs
// before Vercel's own packaging, so it sees what the repo and this build produce, not what the
// platform generates afterwards (with `framework: null`, nothing).
//
//   node scripts/check-functions.mjs [root]

import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compareWithTable, deployableFunctions } from "./api-routes.mjs";

export function checkFunctions(root) {
  const result = compareWithTable(deployableFunctions(root));
  const lines = [
    `functions in the table: ${result.listed.join(", ") || "(none)"}`,
    `functions Vercel would deploy: ${result.found.join(", ") || "(none)"}`,
  ];
  for (const p of result.unclassified) lines.push(`FAIL unclassified function: ${p} (classify this route in scripts/api-routes.mjs)`);
  for (const p of result.stale) lines.push(`FAIL in the table but not deployed: ${p}`);
  return { ok: result.unclassified.length === 0 && result.stale.length === 0, lines };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), ".."));
  const { ok, lines } = checkFunctions(root);
  for (const l of lines) (ok ? console.log : console.error)(l);
  process.exit(ok ? 0 : 1);
}
