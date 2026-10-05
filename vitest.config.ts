import { configDefaults, defineConfig } from "vitest/config";

/**
 * THE ONLY REASON THIS FILE EXISTS: vitest's default include glob matches every `.test.ts` at any
 * depth, and this repo had no config at all — so it collected LANES' SCRATCH DIRECTORIES.
 *
 * Five sessions share one working tree here, and a gitignored `.scratch-<lane>` directory is the
 * scratch space every lane uses. A half-written probe named with a `.test.ts` suffix in one lane's
 * scratch directory therefore failed EVERYONE's suite, and — worse, because it is quiet — a
 * finished one inflated the file count, which this fleet uses as a gate. Measured on the shared
 * tree before this config: 49 files collected, TWO of them from `.scratch-kw`, which is why a full
 * run read 50 files at one moment and 49 at another while staying green. Nothing had stopped being
 * collected; something had started.
 *
 * That is the THIRD mechanism for a shared-tree false red, beside another lane's two-file window
 * and in-flight data, and it is the only one closable from inside the repo.
 *
 * `configDefaults.exclude` is SPREAD rather than replaced: it carries node_modules and dist, and
 * writing the list from scratch would silently drop those. The include glob is left at its default
 * for the same reason — this file adds one exclusion and changes nothing else.
 */
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "**/.scratch-*/**"],
    // A SECOND reason, added 2026-09-24. Seven DOM files import the whole app in `beforeAll` — every
    // combo, synergy and card the bundle carries — and under the load this machine runs at (load
    // average 55-60, several sessions at once) that import passed vitest's 10s hook default and the
    // suite went red with "Hook timed out", which reads exactly like a failure. The same files pass
    // at once when run alone. A hook whose cost is the point of it gets a budget, not a retry.
    hookTimeout: 60_000,
    // A THIRD reason, added 2026-10-04 (#244). On the 12-core Windows tower vitest's default runs 11
    // forks, and a fork that loads the catalogue peaks at 400-900 MB, so the default measured 5.7 GB of
    // node at its peak; with other sessions holding the rest of the 32 GB that twice ended in "Worker
    // exited unexpectedly", which reports as neither passed nor failed. Four forks peaked at 3.5 GB and
    // were green. Linux CI (ubuntu-latest, 4 vCPU) defaults to 3 forks, so a cap of 4 changes nothing
    // there.
    maxWorkers: 4,
  },
});
