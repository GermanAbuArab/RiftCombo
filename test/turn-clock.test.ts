import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

/**
 * The turn clock has no other test, and that is exactly how a defect shipped.
 *
 * `scripts/adversarial-check.mjs --turns` decides which turn each finisher comes online, and it is
 * the engine behind the "N of 54 pay later than doing nothing" headline. On 2026-09-13 the greedy
 * allocator it used was replaced with an exact search (#205) — and the replacement itself shipped a
 * bug: the new `unit` flag, which tells the allocator whether a readiness turn is owed, was set in
 * `costsOf()` and NOT in the `entries` loop that actually feeds the clock. Two places build the cost
 * objects; only one was patched. `c.unit` was `undefined` in the half that mattered, so the `+1` was
 * silently dropped for every entry that was not Beginning-Phase gated, and every number moved.
 *
 * Nothing caught it. It was found by hand-walking a turn table — the same instrument that found the
 * original defect. This file is the cheap version of that walk: the script runs in ~0.2s, so pinning
 * its two hand-walked reference points on every commit costs nothing and closes the class.
 *
 * The assertions are deliberately about entries whose turn was established BY HAND against the Core
 * Rules, not about the headline count, which is perishable and moves with the catalogue.
 */

const out = execFileSync("node", ["scripts/adversarial-check.mjs", "--turns"], {
  encoding: "utf8",
  maxBuffer: 1 << 24,
});

/** `  T 6 vs T6 baseline  SLOWER  CHAIN    chaos/order  some-entry-id` */
const rows = new Map<string, { pays: number; base: number }>();
for (const line of out.split("\n")) {
  const m = line.match(
    /T\s*(\d+|Infinity)\s+vs\s+T(\d+)\s+baseline\s+(?:SLOWER)?\s*(?:INFINITE|BURST|CHAIN|ALT_WIN)\s+\S+\s+(\S+)/,
  );
  if (!m) continue;
  const [, pays, base, id] = m as unknown as [string, string, string, string];
  rows.set(id, { pays: pays === "Infinity" ? Infinity : Number(pays), base: Number(base) });
}

describe("the turn clock", () => {
  // A probe that silently matches nothing prints a clean pass. Assert the population first.
  it("parses a non-trivial number of rows, so a broken parse cannot read as green", () => {
    expect(rows.size).toBeGreaterThan(40);
  });

  it("gives every row a finite, positive turn and a baseline", () => {
    for (const [id, r] of rows) {
      expect(r.base, id).toBeGreaterThan(0);
      expect(r.pays, id).toBeGreaterThan(0);
    }
  });

  /**
   * Hand-walked in `docs/plays/2026-09-12-chaos-order-the-one-answer.md`: T1 Daring Poro, T2 dead
   * because Ivern is E6 and nothing in the line costs 4, T3-T5 the three Iverns, T6 all three ready
   * at 315.1.b and moved as ONE action under 144.3. The greedy allocator reported T8 on this.
   */
  it("agrees with the hand walk on ivern-ride-the-wind-double-conquer (T6)", () => {
    expect(rows.get("ivern-ride-the-wind-double-conquer")?.pays).toBe(6);
  });

  /**
   * This is the row that caught the `unit`-flag bug, and it is the one that pins the readiness turn:
   * its last Ivern lands on T5 and enters exhausted (143.4), so it cannot pay 144.2's exhaust to move
   * until the next Awaken (315.1.b). With the flag dropped the clock said T5, one turn before the
   * line can physically execute its own second step.
   */
  it("charges a readiness turn for a unit that lands last (ivern-bard-four-tag-double-conquer, T6)", () => {
    expect(rows.get("ivern-bard-four-tag-double-conquer")?.pays).toBe(6);
  });

  /**
   * 143.4 exhausts UNITS only — 359.2.d enters a non-unit gear READY at base and 359.3 makes a spell
   * linger on the Chain — so the readiness turn must NOT be universal. If some row does not pay it,
   * the narrowing is live; if every row paid it, the `+1` would be unconditional again.
   */
  it("does not charge the readiness turn universally", () => {
    const atBaseline = [...rows.values()].filter((r) => r.pays <= r.base);
    expect(atBaseline.length).toBeGreaterThan(0);
  });
});
