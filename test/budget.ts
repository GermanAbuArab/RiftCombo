import os from "node:os";

/**
 * The wall budget of the suite's slow tests and hooks, scaled by how loaded the machine is (#765).
 *
 * A fixed 60 s budget met an oversubscribed tower: at load 57 on 12 cores a child script that costs
 * 20 s of CPU gets about a fifth of a core and needs about 100 s of wall time, so five tests timed
 * out while their cost had not grown. An idle machine keeps the base (factor 1), which is the
 * tripwire for a real cost regression; a loaded one gets `max(load1, load5) / cores` times the base,
 * capped at 8 so a hang still ends. The 5-minute average is in the `max` so that a file starting in
 * a lull still gets room. A load that is non-finite or negative, or fewer than 1 core, is factor 1:
 * `os.loadavg()` is `[0, 0, 0]` on Windows, which is factor 1 anyway.
 */
export function budgetMs(baseMs: number, load: readonly number[], cores: number): number {
  const [load1 = Number.NaN, load5 = Number.NaN] = load;
  const usable = (l: number) => Number.isFinite(l) && l >= 0;
  if (!usable(load1) || !usable(load5) || !(cores >= 1)) return Math.round(baseMs);
  return Math.round(baseMs * Math.min(8, Math.max(1, Math.max(load1, load5) / cores)));
}

/** Sampled once per importing module: once per vitest worker file, and once in the config process. */
export const BUDGET_MS = budgetMs(60_000, os.loadavg(), os.cpus().length);
