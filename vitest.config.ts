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
  },
});
