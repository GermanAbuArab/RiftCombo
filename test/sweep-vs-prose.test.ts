import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

/**
 * `scripts/sweep-vs-prose.mjs` diffs the answer sets `scripts/adversarial-check.mjs` sweeps out of
 * `data/cards.json` against the cards the 767 hand-authored entries NAME. Those are two independent
 * descriptions of one pool, and diffing them finds the wording a predicate's author had not met yet.
 *
 * WHAT THIS FILE PINS, AND WHY IT IS A TEST RATHER THAN A REPORT.
 *
 * The `protection` set came back CLEAN on the first run — four candidates, all four correctly
 * excluded on reading. CLAUDE.md's own rule is that a clean result is exactly the one worth pinning,
 * "because pinning it costs nothing at a clean state and it can only ever be paid for once". If a
 * future set prints a board-wide +Might the protection predicate cannot match, this fails instead of
 * sitting in a report nobody re-runs.
 *
 * The other two sets are NOT pinned at their current numbers on purpose: they hold genuine misses
 * today (`UNL-072 Crescent Strike`; the `SFD-135` / `SFD-109` / `SFD-147` bounce family), and pinning
 * a known-bad state asserts the bug rather than the fix. What IS pinned for them is that the probe
 * can still SEE them — a probe that silently stops matching reads exactly like a clean sweep.
 *
 * Every assertion below was proved to FIRE out of band before being committed:
 *   - corrupting one copied predicate           -> the drift guard exits 2 and names it
 *   - counting `own` without `gate` in one place -> "protection set is CLEAN" FAILs (got 1, want 0),
 *     which is how the two-places-computing-one-thing defect was found and folded into one helper
 */
const run = (...args: string[]) =>
  execFileSync("node", ["scripts/sweep-vs-prose.mjs", ...args], { encoding: "utf8", cwd: process.cwd() });

describe("sweep-vs-prose", () => {
  it("self-test passes in both directions, and is not vacuous", () => {
    const out = run("--selftest");
    // NON-VACUITY: a self-test that asserts nothing passes forever.
    expect(out).toMatch(/# --selftest: (\d+) assertions/);
    const n = Number(/# --selftest: (\d+) assertions/.exec(out)![1]);
    expect(n).toBeGreaterThanOrEqual(7);
    expect(out).toContain("# all pass");
    expect(out).not.toContain("FAIL");
  });

  it("pins the protection set CLEAN — the whole reason this is a test", () => {
    const out = run();
    const block = out.slice(out.indexOf("## protection"));
    expect(block).toMatch(/\d+ candidates, \d+ correctly excluded, 0 GENUINE/);
    // and --strict must agree, since that is the exit code CI would gate on
    expect(() => run("--strict")).not.toThrow();
  });

  it("can still SEE the two known misses, so a silent stop cannot read as clean", () => {
    const out = run();
    expect(out).toContain("UNL-072");
    expect(out).toContain("SFD-135");
    // both must be reported as genuine, not merely mentioned
    const mass = out.slice(out.indexOf("## massAnswer"), out.indexOf("## gearAnswer"));
    expect(mass).toMatch(/UNL-072[^\n]*GENUINE MISS/);
    const gear = out.slice(out.indexOf("## gearAnswer"), out.indexOf("## protection"));
    expect(gear).toMatch(/SFD-135[^\n]*GENUINE MISS/);
  });

  it("reports its own denominators, so a probe matching nothing cannot pass as a result", () => {
    const out = run();
    expect(out).toMatch(/# NON-VACUITY: \d+ entries, \d+ cards, \d+ cards named by at least one entry/);
    expect(out).toMatch(/swept sets: massAnswer \d+, gearAnswer \d+, protection \d+/);
  });
});
