import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
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
   * The FOURTH hand-walked reference point, and the one that pins in-chain casts (#339). The walk in
   * `docs/phase0/walks/2026-10-13-b3-renata-time-warp-anomaly.md` §6 puts the chain on T6 on the play
   * and T5 on the draw: three Time Warps are cast one per turn INSIDE the chain, each paying its four
   * Power from the six rainbow two Blue Sentinels Add (R1 = A), and each Additional Turn is taken
   * before the opponent's next turn, so the chain does not advance the clock. The clock said T11 for
   * as long as it charged all three Warps to the rune curve before the chain and modelled no Add.
   */
  it("agrees with the hand walk on power-nexus-sentinel-renata-time-warp-chain (T5-T6)", () => {
    const pays = rows.get("power-nexus-sentinel-renata-time-warp-chain")?.pays;
    expect(pays).toBeGreaterThanOrEqual(5);
    expect(pays).toBeLessThanOrEqual(6);
  });

  /**
   * The same Adds and Additional Turns, on the bare line without Renata. Its walk
   * (`docs/phase0/walks/2026-10-13-bare-nexus-three-time-warps.md` §5) puts it on T7 on the play,
   * one turn later than the clock, because the clock prices no Nexus firing and the walk's extra
   * turn buys the runes those firings recycle. A lower bound may sit under its walk, never over it.
   */
  it("stays at or under the hand walk on power-nexus-sentinel-three-time-warps (T7)", () => {
    expect(rows.get("power-nexus-sentinel-three-time-warps")?.pays).toBeLessThanOrEqual(7);
  });

  /**
   * The FIFTH and SIXTH reference points, and the ones that pin `anyBodies` (#494). Neither line names
   * a unit in `uses`, so until the clock charged the field it priced the spell alone and printed T3.
   * Up from the Deep (chaos): three E2 bodies on T1-T2 and the spell on T3, Hold on T4
   * (docs/plays/2026-10-27-up-from-the-deep-*.md §6). Flurry of Feathers (calm): three E1 bodies on
   * T1-T2, the T2 body leaves 3 of 4 runes so the E4 Reaction waits for their T3, Hold on your T4.
   */
  it("charges anyBodies on up-from-the-deep-flow-grand-plaza (T4)", () => {
    expect(rows.get("up-from-the-deep-flow-grand-plaza")?.pays).toBe(4);
  });

  it("charges anyBodies on flurry-of-feathers-grand-plaza-win (T4)", () => {
    expect(rows.get("flurry-of-feathers-grand-plaza-win")?.pays).toBe(4);
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
   * They agree on 75 of 80 (80 of 85 on 2026-10-13). The five that differ are NOT a residual: `d.all` is identical under both
   * arms and only `d.unit` moves, so the entire gap is the readiness `+1` of 143.4, which the nogate
   * arm dodges by "paying" a free post cost early — something the real game never offers, because
   * before ignition that unit costs its printed Energy. Settled row by row in
   * `.scratch-gap/probe-readiness-residual.mjs`. This assertion is the tripwire: if a change widens
   * the disagreement past that handful, the header's account of it is stale.
   *
   * Since #339 a card that queues a turn stays gated in both arms, so the lower arm is not a pure
   * relaxation for Time Warp. The header's sandwich note names the two rows that holds back and gives
   * the necessary condition that makes their gated T4 the true one.
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
  }, 60_000); // spawns scripts/adversarial-check.mjs: 3.4s in a full run on the Windows tower (#244)

  /**
   * #205 shipped because one of two cost builders was patched. There is one builder now, but three
   * callers price with it - the closure search, the consumer search and the final row - and a caller
   * that drops the bodies argument picks its fold as if bodies were free while the row pays for them.
   * That is how `candlelit-sanctum-known-next-draw` folded `amateur-recital-free-evacuation` at T0.
   */
  it("passes a bodies argument at every costsOfSet call, so no fold is chosen bodies-free", () => {
    const src = readFileSync("scripts/adversarial-check.mjs", "utf8");
    const calls: string[] = [];
    for (let at = src.indexOf("costsOfSet("); at >= 0; at = src.indexOf("costsOfSet(", at + 1)) {
      let depth = 0, i = at + "costsOfSet".length, commas = 0;
      for (; i < src.length; i++) {
        const ch = src[i];
        if ("([{".includes(ch!)) depth++;
        else if (")]}".includes(ch!) && --depth === 0) break;
        else if (ch === "," && depth === 1) commas++;
      }
      calls.push(`${commas}:${src.slice(at, i + 1)}`);
    }
    expect(calls.length, "fewer costsOfSet calls than the four in the script, so this check may be reading the wrong thing").toBeGreaterThanOrEqual(4);
    for (const c of calls) expect(Number(c.split(":")[0]), c).toBeGreaterThanOrEqual(2);
  });

  it("prices a body in the identities the baseline calls cheap (--selftest-bodies)", () => {
    const st = execFileSync("node", ["scripts/adversarial-check.mjs", "--selftest-bodies"], { encoding: "utf8" });
    expect(st).toContain("# all pass");
    expect(st).not.toContain("FAIL");
  });

  it("still has a non-empty linked population, so 'it moves nothing' cannot go vacuous", () => {
    const m = out.match(/ordering \(\[Equip\] after its own gear[^)]*\): (\d+) of (\d+) rows carry a linked cost/);
    expect(m, "the ordering non-vacuity line is missing from --turns").toBeTruthy();
    expect(Number(m![1])).toBeGreaterThan(20);
    expect(Number(m![1])).toBeLessThan(Number(m![2]));
  });
});

/**
 * POWER INCOME (#501), pinned against REAL card text through `--price`, because the line it rests on
 * declares no Seal in `data/combos.json` and the clock could not see one until this.
 *
 * The cards are the ones PR #500 walked for `tryndamere-brambleback-conquer` - OGN-040 Seal of Rage,
 * three UNL-029 Red Brambleback (E4 + 1), two OGN-034 Tryndamere (E7 + 2) - with SFD-004 Bushwhack
 * (E2 + 1, "Friendly units enter ready this turn"), which the issue names as the other T6 route. Hand
 * walk, going first (2 runes a turn, 315.3.b; a recycled rune leaves the board, 161.2.b):
 *   T2  4 runes: recycle one for the Seal, which enters ready (359.2.d) and Adds Fury for a Brambleback
 *   T3  5 runes: a Brambleback, its Power from the Seal, readied at the Awakening (415.3.a)
 *   T4  7 runes: a Tryndamere, Seal + one recycle
 *   T5  8 runes: the third Brambleback off the Seal
 *   T6 10 runes: Bushwhack, then the second Tryndamere, E9 and 3 Power = Seal + two recycles
 *
 * THE CONTROL, without the Seal, is T7, and by hand: every Power is then a recycle, 8 of them. A
 * Tryndamere on T6 needs 7 runes there, so at most 5 recycles before T6, so 3 Power paid on T6 - a
 * Tryndamere plus a Brambleback or Bushwhack, E9 or more on 7 runes. With both on T4 and T5 instead
 * (T3 has 6 runes at most), T4 needs at most 1 recycle before it and T5 at most 3, which leaves
 * E10 or more on T6's 7 or 8 runes. So the Seal is worth exactly one turn here.
 *
 * Upstage Comedy, the walk's own route, was NOT the pin here: until #506 the clock paid a readying
 * spell whenever it was cheapest (T1) rather than with the last unit, so with Comedy the no-Seal
 * control also read T6 and the pair proved nothing. #506 pins it below.
 */
describe("power income (#501)", () => {
  const price = (set: string) => {
    const s = execFileSync("node", ["scripts/adversarial-check.mjs", "--price", set], { encoding: "utf8" });
    const m = s.match(/all T(\d+|Infinity), last unit T(\d+|Infinity), unitLast \w+, pays T(\d+|Infinity)/);
    expect(m, s).toBeTruthy();
    return { all: Number(m![1]), unit: Number(m![2]), pays: Number(m![3]) };
  };

  it("pays the Seal of Rage + Bushwhack Tryndamere line on T6, as walked", () => {
    expect(price("OGN-040:1,UNL-029:3,OGN-034:2,SFD-004:1").all).toBe(6);
  });

  it("pays the same cards without the Seal on T7 (the control)", () => {
    expect(price("UNL-029:3,OGN-034:2,SFD-004:1").all).toBe(7);
  });

  it("still finds ENGINE rows that hold an income card, so 'it moved no row' cannot go vacuous", () => {
    const eng = execFileSync("node", ["scripts/adversarial-check.mjs", "--engines"], {
      encoding: "utf8",
      maxBuffer: 1 << 24,
    });
    const m = eng.match(/power income \([^)]*\): (\d+) of (\d+) rows hold an income card/);
    expect(m, "the income non-vacuity line is missing from --engines").toBeTruthy();
    expect(Number(m![1])).toBeGreaterThan(5);
  }, 60_000);
});

/**
 * READYING (#506), pinned against REAL card text through `--price`. A readier works on the turn it is
 * paid and only on the units that land with it, so it waives the last unit's 143.4 readiness turn
 * when it shares that turn and does nothing on any other. These read `pays`, the turn the last unit
 * can act, because a readier never moves `all`.
 *
 * The cards are #501's: OGN-040 Seal of Rage, three UNL-029 Red Brambleback (E4 + 1), two OGN-034
 * Tryndamere (E7 + 2), now with UNL-009 Upstage Comedy (E2, "Ready a unit."), PR #500's own route.
 * Going first, 2 runes a turn (315.3.b), a recycled rune leaves (161.2.b), and one rune can pay its
 * exhaust for Energy and its recycle for Power on the same turn (164.2.a, 164.2.b).
 *
 * SEAL + COMEDY, T6. #501's walk to T5 (Seal and a Brambleback on T2, a Brambleback T3, a Tryndamere
 * T4, a Brambleback T5) reaches T6 with 10 runes: the second Tryndamere (E7, its 2 Power the Seal's
 * Add plus one recycle) and Comedy (E2) are E9, and Comedy readies him on the turn he lands, so he
 * attacks on T6. Not earlier: `all` is already T6 without Comedy (#501).
 *
 * NO SEAL, T7 (the control). Every Power is now a recycle, 7 of them, and a Tryndamere needs 7 runes,
 * which T3 (6 at most) never has, so the two land on T4 and T5 or later. Acting on T6 needs one of:
 *   (a) every unit landed by T5. A Tryndamere on T4 allows at most 1 recycle before T4, so at most one
 *       Brambleback lands before T4 (one recycle each). T4's 7 or 8 runes then hold only the
 *       Tryndamere, which recycles 2, so T5 has at most 10 - 2 = 8 runes: the second Tryndamere and
 *       no E4 beside it. At most one Brambleback of three by T5.
 *   (b) the last unit on T6 with Comedy beside it. If a Tryndamere lands on T6 with k Bramblebacks,
 *       T6 pays E9 + 4k with 2 + k Power, so 5 - k recycles came earlier and T6 has 7 + k runes,
 *       short by 2 + 3k. If only Bramblebacks land on T6, k of them, T6 pays E2 + 4k on 5 + k runes,
 *       so k = 1, and both Tryndamere and two Bramblebacks are down by T5 with 6 recycles. T5 then
 *       holds a Tryndamere (T4 and T5 are the only turns with 7 runes) and, with b Bramblebacks
 *       beside it, pays E7 + 4b on 4 + (2 + b) runes, which no b affords.
 * Neither exists, so T7: which is why the Seal, and not Comedy alone, is worth the turn.
 *
 * SEAL WITHOUT COMEDY, T7: the same `all` T6 with the second Tryndamere landing on it exhausted.
 */
describe("readying (#506)", () => {
  const pays = (set: string) => {
    const s = execFileSync("node", ["scripts/adversarial-check.mjs", "--price", set], { encoding: "utf8" });
    const m = s.match(/pays T(\d+|Infinity)/);
    expect(m, s).toBeTruthy();
    return Number(m![1]);
  };

  it("pays the Seal of Rage + Upstage Comedy Tryndamere line on T6, as walked", () => {
    expect(pays("OGN-040:1,UNL-029:3,OGN-034:2,UNL-009:1")).toBe(6);
  });

  it("pays the same cards without the Seal on T7 (the control)", () => {
    expect(pays("UNL-029:3,OGN-034:2,UNL-009:1")).toBe(7);
  });

  it("pays the Seal line without Comedy on T7, so the readier is what moved it", () => {
    expect(pays("OGN-040:1,UNL-029:3,OGN-034:2")).toBe(7);
  });

  it("still finds rows that hold a readier, so 'it moved no finisher' cannot go vacuous", () => {
    const m = out.match(/readying \([^)]*\): (\d+) of (\d+) rows hold a readier/);
    expect(m, "the readier non-vacuity line is missing from --turns").toBeTruthy();
    expect(Number(m![1])).toBeGreaterThan(5);
  });
});
