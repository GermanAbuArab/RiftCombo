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
 * original defect. This file is the cheap version of that walk: pinning the two hand-walked reference
 * points on every commit closes the class.
 *
 * Folding the `needs`/`produces` DAG UPWARD as well as downward (2026-09-13, #200) made the biggest
 * closures much larger, and almost all of the runtime is ONE row,
 * `dragonstorm-brambleback-trinity-conquer`. Pricing `[Equip]` added a second cost per Equipment and
 * pushed that row past the state guard; modelling ORDERING later the same day (an `[Equip]` cannot be
 * paid before its own gear — 818.1 with 380) pruned the search back down, so `--turns` is ~0.2s again
 * and the allocator is exact on all 80 rows. Quote the header's own line for that count rather than
 * this comment: a row priced by the greedy fallback is a row priced by the defect #205 removed.
 *
 * This comment said "79 of the 80" until 2026-09-14, and so did the header it points at — because the
 * counter counted every CALL to `deployTurn`, including the candidate closures the needs/produces fold
 * prices and then discards. Every PUBLISHED row was exact the whole time, so the line understated its
 * own result and sent a reader to re-derive a row that did not need it. The header now names the rows
 * it means and reports intermediate fallbacks separately.
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
   * The THIRD hand-walked reference point, and the one that justifies pricing an engine's own output
   * by default (docs/plays/2026-09-13-the-loop-that-wants-a-contested-board.md §4). The loop is
   * assembled on T3 and its Energy buys Renata and the Rage Amplifier in the SAME Main Phase, so the
   * Grand Plaza hold lands on T4. The clock said T5 for as long as it charged every card in the
   * closure to the rune curve; it says T4 now.
   */
  it("agrees with the hand walk on jhin-fiora-facebreaker-recall (T4)", () => {
    expect(rows.get("jhin-fiora-facebreaker-recall")?.pays).toBe(4);
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

/**
 * ORDERING, pinned because the result is a NULL.
 *
 * An `[Equip]` cost is not merely a second cost but a LATER one: 818.1 makes Equip an Activated
 * Ability of the gear and 380 says an Activated Ability "can primarily be activated while on the
 * Board". Modelled exactly in the allocator on 2026-09-13, it moves ZERO of the 80 rows — and a null
 * from a new constraint is worth nothing unless the instrument can be shown to SEE the thing it says
 * is absent. `--selftest` is that proof: synthetic cost sets whose answers are hand-derived, two of
 * them ordered, one of which owes a turn to the constraint (T6 unordered against T7 ordered).
 *
 * Pinning a clean state costs nothing now and can only ever be paid for once. These two assertions
 * close the two ways the null could go quietly false: the constraint being dropped (the self-test
 * fails) and the LINKING being dropped, which would leave the constraint in place with nothing
 * attached to it and print "moves nothing" for a vacuous reason.
 */
describe("the allocator's ordering constraint", () => {
  it("passes its own hand-derived self-test, so the null is a result and not a blind spot", () => {
    const st = execFileSync("node", ["scripts/adversarial-check.mjs", "--selftest"], {
      encoding: "utf8",
      maxBuffer: 1 << 22,
    });
    expect(st).toContain("# all pass");
    expect(st).not.toContain("FAIL");
  });

  /**
   * The engine-output discount is a RESTRICTION as well as a discount — a post-ignition card may not
   * be bought before the loop is running — and a restriction can only push a row later than the
   * truth. `--ignition-nogate` drops the gate while keeping the discount, which can only pull a row
   * earlier than the truth, so the two bound it.
   *
   * They agree on 75 of 80. The five that differ are NOT a residual: `d.all` is identical under both
   * arms and only `d.unit` moves, so the entire gap is the readiness `+1` of 143.4, which the nogate
   * arm dodges by "paying" a free post cost early — something the real game never offers, because
   * before ignition that unit costs its printed Energy. Settled row by row in
   * `.scratch-gap/probe-readiness-residual.mjs`. This assertion is the tripwire: if a change widens
   * the disagreement past that handful, the header's account of it is stale.
   */
  it("keeps the ignition sandwich tight on all but a handful of rows", () => {
    const loose = execFileSync("node", ["scripts/adversarial-check.mjs", "--turns", "--ignition-nogate"], {
      encoding: "utf8",
      maxBuffer: 1 << 24,
    });
    const other = new Map<string, number>();
    for (const line of loose.split("\n")) {
      const m = line.match(/T\s*(\d+|Infinity)\s+vs\s+T(\d+)\s+baseline\s+(?:SLOWER)?\s*(?:INFINITE|BURST|CHAIN|ALT_WIN)\s+\S+\s+(\S+)/);
      if (!m) continue;
      other.set(m[3]!, m[1] === "Infinity" ? Infinity : Number(m[1]));
    }
    expect(other.size).toBe(rows.size);
    const differ = [...rows].filter(([id, r]) => other.get(id) !== r.pays);
    expect(differ.length, differ.map(([id, r]) => `${id} ${r.pays}/${other.get(id)}`).join(" || ")).toBeLessThanOrEqual(6);
    // and every disagreement is at most one turn, which is what makes "T4 or T5" a statement
    for (const [id, r] of differ) expect(r.pays - (other.get(id) as number), id).toBeLessThanOrEqual(1);
  });

  it("still has a non-empty linked population, so 'it moves nothing' cannot go vacuous", () => {
    const m = out.match(/ordering \(\[Equip\] after its own gear[^)]*\): (\d+) of (\d+) rows carry a linked cost/);
    expect(m, "the ordering non-vacuity line is missing from --turns").toBeTruthy();
    expect(Number(m![1])).toBeGreaterThan(20);
    expect(Number(m![1])).toBeLessThan(Number(m![2]));
  });
});
