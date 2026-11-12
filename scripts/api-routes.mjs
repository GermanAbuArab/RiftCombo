// The one hand-written table of what this site deploys as code (#585), and the reader that finds
// what Vercel would deploy. Two checks read it: `test/api-routes.test.ts` (every route classified,
// and each class proved in process) and `scripts/check-functions.mjs` (the build exposes nothing
// outside this table). A route that is not here fails both, by name.
//
// Classes, after peak-panel#351: `token` names the environment variable whose value a caller must
// present as `Authorization: Bearer <value>`, and the suite proves every exported method refuses
// without it before any upstream fetch. `public` carries the one-line reason it is open on purpose,
// and the suite proves its own guards in process instead.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Path relative to the repo root -> its class. The ONLY hand-written list. */
export const ROUTES = {
  "api/deck-url.ts": {
    kind: "public",
    reason: "imports a public Piltover Archive deck page for a signed-out or signed-in browser alike; it reads no account data, and its host allowlist, redirect check, timeout and byte cap are the defence",
  },
};

/** What Vercel's zero-config build turns into a function when it sits under `api/`. */
const FUNCTION_EXT = /\.(js|mjs|cjs|jsx|ts|mts|cts|tsx|go|py|rb)$/;

/**
 * Every file under `api/` Vercel would deploy as a function: a function extension, and no path
 * segment starting with `_` or `.` (Vercel skips those, which is why `api/_deck-url-guards.ts` is a
 * module and not a route). A `.d.ts` is counted on purpose: the check would rather name a file
 * that never deploys than miss one that does.
 */
export function apiFunctions(root) {
  const dir = join(root, "api");
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    // A symlinked file is not `isFile()` on its Dirent, and Vercel deploys what the link points at.
    .filter((e) => e.isFile() || e.isSymbolicLink())
    .map((e) => join(e.parentPath, e.name).slice(root.length + 1).split("\\").join("/"))
    .filter((p) => FUNCTION_EXT.test(p) && !p.split("/").some((s) => s.startsWith("_") || s.startsWith(".")))
    .sort();
}

/**
 * The other ways a Vercel project grows code that runs on a request, outside `api/`: Edge
 * Middleware at the root, a Build Output API tree the build may write, the legacy `builds` key in
 * `vercel.json`, and a `functions` entry there that sets its own `runtime`. None exists today; each
 * one found is named so it can be classified.
 */
export function otherFunctions(root) {
  const found = [];
  for (const f of readdirSync(root)) if (/^middleware\.(js|mjs|cjs|ts|mts|cts)$/.test(f)) found.push(f);
  const output = join(root, ".vercel", "output", "functions");
  if (existsSync(output)) {
    for (const e of readdirSync(output, { recursive: true, withFileTypes: true })) {
      if (e.isDirectory() && e.name.endsWith(".func")) found.push(join(e.parentPath, e.name).slice(root.length + 1).split("\\").join("/"));
    }
  }
  const vercel = join(root, "vercel.json");
  if (existsSync(vercel)) {
    const config = JSON.parse(readFileSync(vercel, "utf8"));
    for (const b of config.builds ?? []) found.push(`vercel.json builds: ${b.src}`);
    // A `functions` entry that names a runtime (a community runtime such as vercel-php) deploys files
    // whose extension the list above does not know, so the entry itself is named.
    for (const [glob, f] of Object.entries(config.functions ?? {})) if (f?.runtime) found.push(`vercel.json functions runtime: ${glob}`);
  }
  return found.sort();
}

/** Every deployable function, as one sorted list to compare with the table. */
export function deployableFunctions(root) {
  return [...apiFunctions(root), ...otherFunctions(root)].sort();
}

/** The table's paths that are not deployed, and the deployed paths that are not in the table. */
export function compareWithTable(found, table = ROUTES) {
  const listed = Object.keys(table).sort();
  return {
    listed,
    found,
    unclassified: found.filter((p) => !listed.includes(p)),
    stale: listed.filter((p) => !found.includes(p)),
  };
}
