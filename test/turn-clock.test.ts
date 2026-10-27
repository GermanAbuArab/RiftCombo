import { execFileSync, spawnSync } from "node:child_process";
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
   * Since #517 every caller prices through `priceSet`, which chooses the bodies and is the one caller
   * of `costsOfSet`, so both are read: a `priceSet` call needs the bodies and `costsOfSet` the pick.
   */
  it("passes a bodies argument at every costsOfSet and priceSet call, so no fold is chosen bodies-free", () => {
    const src = readFileSync("scripts/adversarial-check.mjs", "utf8");
    const callsOf = (name: string) => {
      const calls: string[] = [];
      for (let at = src.indexOf(`${name}(`); at >= 0; at = src.indexOf(`${name}(`, at + 1)) {
        let depth = 0, i = at + name.length, commas = 0;
        for (; i < src.length; i++) {
          const ch = src[i];
          if ("([{".includes(ch!)) depth++;
          else if (")]}".includes(ch!) && --depth === 0) break;
          else if (ch === "," && depth === 1) commas++;
        }
        calls.push(`${commas}:${src.slice(at, i + 1)}`);
      }
      return calls;
    };
    const price = callsOf("priceSet");
    const costs = callsOf("costsOfSet");
    expect(price.length, "fewer priceSet calls than the five in the script, so this check may be reading the wrong thing").toBeGreaterThanOrEqual(5);
    expect(costs.length, "costsOfSet has no caller, so this check may be reading the wrong thing").toBeGreaterThanOrEqual(1);
    for (const c of price) expect(Number(c.split(":")[0]), c).toBeGreaterThanOrEqual(2);
    for (const c of costs) expect(Number(c.split(":")[0]), c).toBeGreaterThanOrEqual(3);
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
 * SEAL WITHOUT COMEDY was T7 here, the second Tryndamere landing on T6 exhausted. It is T6 since #510,
 * because Red Brambleback carries [Accelerate] and the last unit can be a Brambleback instead:
 *   T2  4 runes: the Seal (one recycle) and a Brambleback, its Power the Seal's Add. 3 left.
 *   T3  5 runes: a Brambleback off the Seal. 5 left.
 *   T4  7 runes: Tryndamere, 2 Power = Seal + one recycle. 6 left.
 *   T5  8 runes: the second Tryndamere the same way. 7 left.
 *   T6  9 runes: the third Brambleback Accelerated, E5 and 2 Power = Seal + one recycle, so it enters
 *       ready (805.1.a) and both Tryndameres readied at the Awakening (415.3.a).
 * So on these cards Comedy is no longer the only route to T6, and the readier needs a witness whose
 * units have no Accelerate: SEAL + THREE TRYNDAMERES (OGN-034 has none). The Seal on T2, a Tryndamere
 * on T4 (7 runes) and T5 (8), each paid Seal + one recycle, leave 9 runes on T6: the third Tryndamere
 * and Comedy are E9 with 2 Power, and Comedy readies him, so T6. Without Comedy he lands exhausted, T7.
 * Not earlier either way: only T4 and T5 hold the 7 runes a Tryndamere needs by T5, so `all` is T6.
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

  it("pays the Seal line without Comedy on T6 too, through the third Brambleback's [Accelerate] (#510)", () => {
    expect(pays("OGN-040:1,UNL-029:3,OGN-034:2")).toBe(6);
  });

  it("pays Seal + three Tryndameres + Comedy on T6, as walked: no unit has Accelerate", () => {
    expect(pays("OGN-040:1,OGN-034:3,UNL-009:1")).toBe(6);
  });

  it("pays the same three Tryndameres without Comedy on T7, so the readier is what moved it", () => {
    expect(pays("OGN-040:1,OGN-034:3")).toBe(7);
  });

  it("still finds rows that hold a readier, so 'it moved no finisher' cannot go vacuous", () => {
    const m = out.match(/readying \([^)]*\): (\d+) of (\d+) rows hold a readier/);
    expect(m, "the readier non-vacuity line is missing from --turns").toBeTruthy();
    expect(Number(m![1])).toBeGreaterThan(5);
  });
});

/**
 * [ACCELERATE] (#510), pinned against REAL card text through `--price`. 805.1.a: "Accelerate is
 * functionally short for "As you play me, you may pay [1][C] as an additional cost. If you do, I enter
 * ready."" 805.2: "Accelerate is an Optional Additional Cost to be paid as a player plays the unit with
 * the ability." So a unit carrying it can skip 143.4's readiness turn for one more Energy and one more
 * Power of its domain, and only on the turn it is played. These read `pays`, because Accelerate never
 * moves `all`: it is an extra cost, and the clock pays it only when it lands the last unit ready.
 *
 * Cards: UNL-029 Red Brambleback (Fury, E4 + 1 Fury Power, "[Accelerate] (You may pay
 * :rb_energy_1::rb_rune_fury: as an additional cost to have me enter ready.)") and OGN-034 Tryndamere
 * (E7 + 2, no Accelerate). Going first, 2 runes a turn (315.3.b), a recycled rune leaves (161.2.b),
 * and one rune can pay its exhaust for Energy and its recycle for Power on the same turn (164.2.a,
 * 164.2.b). An Accelerated Brambleback is E5 + 2 Power.
 *
 * TWO BRAMBLEBACKS + TRYNDAMERE, T5: the "T=1, K=2" row of
 * docs/plays/2026-10-24-tryndamere-scores-two-on-turn-five-*.md ("Brambleback T3, Tryndamere T4, one
 * Accelerated T5"). T3 6 runes: a Brambleback, one recycle, 5 left. T4 7 runes: Tryndamere, E7 and
 * two recycles, 5 left. T5 7 runes: the second Brambleback Accelerated, E5 and two recycles, and it
 * enters ready, so every unit can act on T5. Not earlier: `all` is T5, because a Tryndamere needs 7
 * runes (T4 at the earliest, 8 at most), which leaves 1 Energy beside him on T4, so both Bramblebacks
 * would have to land by T3 (T2 then T3 leaves 4 runes on T3 and 6 on T4, short of 7). Without
 * Accelerate the unit that lands on T5 is exhausted until T6, which is what the clock printed before.
 *
 * ONE BRAMBLEBACK, T3 (the control, "the extra rune is not there"). T2 holds 4 runes: the plain E4 +
 * 1 fits and the Accelerated E5 + 2 does not, so the Brambleback lands exhausted and acts on T3. Paying
 * Accelerate on T3 instead also acts on T3. Paying it never helps here, and a model that waived the
 * readiness turn without charging the extra rune would print T2.
 */
describe("[Accelerate] (#510)", () => {
  const pays = (set: string) => {
    const s = execFileSync("node", ["scripts/adversarial-check.mjs", "--price", set], { encoding: "utf8" });
    const m = s.match(/pays T(\d+|Infinity)/);
    expect(m, s).toBeTruthy();
    return Number(m![1]);
  };

  it("pays two Red Bramblebacks + Tryndamere on T5, the last Brambleback Accelerated, as walked", () => {
    expect(pays("UNL-029:2,OGN-034:1")).toBe(5);
  });

  it("pays one Red Brambleback on T3, because T2 has no rune for Accelerate (the control)", () => {
    expect(pays("UNL-029:1")).toBe(3);
  });

  it("prints its predicate and finds units and rows that carry it, so 'it moved nothing' cannot go vacuous", () => {
    const m = out.match(/# accelerate \((.*)\): (\d+) units carry it; (\d+) of (\d+) rows hold one/);
    expect(m, "the accelerate non-vacuity line is missing from --turns").toBeTruthy();
    expect(m![1]).toContain(String.raw`\[Accelerate\]`);
    // A second instrument, not the predicate itself: every base whose text or effect says
    // "accelerate" at all, read straight from data/cards.json. The predicate may not miss one, and
    // each of them is a unit (Rek'Sai's grant sits on a unit that carries the keyword herself).
    // Comparing sizes is enough: whatever the predicate matches contains "[Accelerate]" and so says
    // "accelerate", i.e. its set is a SUBSET of this one, and a subset of equal size is the same set.
    const all = JSON.parse(readFileSync("data/cards.json", "utf8")).cards as {
      base: string; type: string[]; text?: string; effect?: string;
    }[];
    const said = new Map<string, string[]>();
    for (const c of all) if (/accelerate/i.test(`${c.text || ""} ${c.effect || ""}`)) said.set(c.base, c.type);
    expect([...said.values()].every((t) => t.includes("unit"))).toBe(true);
    expect(Number(m![2])).toBe(said.size);
    expect(said.size).toBe(28);
    expect(Number(m![3])).toBeGreaterThan(0);
  });
});

/**
 * READYING RUNES (#513), pinned against REAL card text through `--price`. 164.2.a: "[E]: [Reaction] —
 * Add [1]." 164.2.b: "Recycle this: [Reaction] — Add [C]." A rune's Energy is its EXHAUST and its
 * Power is its RECYCLE, whose cost has no exhaust in it, so a readied rune pays one more Energy and no
 * more Power: an exhausted rune recycles all the same, and a recycled one is gone (161.2.b) and cannot
 * be readied. 167 empties the pool only "at the start of each player's Main Phase and the end of each
 * player's turn", so every rune can be exhausted up front and the Energy held while the readier
 * resolves.
 *
 * Cards: VEN-150 Acceleration Gate (Spell, E3 + 1, "Ready up to 4 units, gear, and/or runes."),
 * UNL-066 Moonlight Affliction (Spell, E7), VEN-090 Cataclysmic Duel (Spell, E8 + 3), OGN-142
 * Mountain Drake (Unit, E9, no text), SFD-087 Premonition (Spell, E2 + 3). Going first, 2 runes a
 * turn (315.3.b).
 *
 * GATE + AFFLICTION, T3. E10 + 1. T3 holds 6 runes: exhaust all six (pool 6), recycle one for the
 * Gate's Power (5 left, all exhausted), cast the Gate (pool 3), ready 4 of the 5 and exhaust them
 * again (pool 7), cast Affliction. Not T2: 4 runes, one recycled for the Gate, give 4 + 3 = 7 of 10.
 * Without the readying it is T4: the same turn needs 10 runes (T5), and the Gate on T2 leaves 3 runes,
 * so T3 has 5 and T4 has 7, which is Affliction's 7.
 *
 * GATE + DUEL, T4 (the control, "up to 4", not every rune). E11 + 4. T3's 6 runes, one recycled for
 * the Gate, leave 5 to ready, and the Gate readies 4: 6 + 4 = 10 of 11. T4's 8 runes give 8 + 4 = 12,
 * and Duel's 3 recycles come after the Gate resolves. A clock that readied every rune would print T3
 * (6 + 5 = 11); one with no readying prints T5 (the Gate on T2 leaves 3, 5, 7, 9 runes, and Duel's E8
 * first fits on T5).
 *
 * GATE + DRAKE, pays T5 (the "up to 4" is SHARED by units, gear and runes). E12 + 1, so `all` is T4
 * the same way, 8 + 4. All four readies go to runes, so the Gate has none left for the Drake that
 * lands with it: he is exhausted (143.4) until T5. A clock that readied 4 runes AND 4 units would say
 * T4; the clock before #513 said T6 (`all` T5, the Drake landing that turn with the Gate on T2).
 *
 * THREE GATES + AFFLICTION, T3 (PR #522's review). E16 + 3. T3's 6 runes: exhaust all six (pool 6),
 * recycle one for the first Gate (5 left), cast it (pool 3), ready 4 and exhaust them (pool 7); recycle
 * the fifth, still exhausted, for the second Gate (4 left), cast it (pool 4), ready all 4 (pool 8);
 * recycle one for the third (3 left), cast it (pool 5), ready 3 (pool 8); Affliction is 7. That is
 * 4 + 4 + 3 = 11 readied, 6 + 11 = 17 of 16. Not T2: 4 runes give 3 + 2 + 1 = 6 back, 10 of 16. A clock
 * that charged every Gate's recycle to all three readies 3 + 3 + 3 = 9 and says T4.
 *
 * GATE ALONE, T2. It is paid before it resolves, so T1's 2 runes cannot pay its E3 whatever it readies.
 *
 * GATE + TWO PREMONITIONS, T4 (the Power control, "no Power comes back"). E7 + 7. Seven recycles need
 * seven runes channelled, and T3 has channelled six, so T4: the Gate and one Premonition on T3 (E5,
 * 4 recycles, 2 left), the second on T4's 4 runes. A clock that returned Power with the readied runes
 * would print T2 (4 + 4 of each). This one passes without #513 too: it guards the model, not the bug.
 */
describe("readying runes (#513)", () => {
  const price = (set: string) => {
    const s = execFileSync("node", ["scripts/adversarial-check.mjs", "--price", set], { encoding: "utf8" });
    const m = s.match(/all T(\d+|Infinity).*pays T(\d+|Infinity)/);
    expect(m, s).toBeTruthy();
    return { all: Number(m![1]), pays: Number(m![2]) };
  };

  it("pays Acceleration Gate + Moonlight Affliction on T3, as walked: four readied runes are four Energy", () => {
    expect(price("VEN-150:1,UNL-066:1").all).toBe(3);
  });

  it("pays Acceleration Gate + Cataclysmic Duel on T4, not T3: the Gate readies up to 4, not every rune (the control)", () => {
    expect(price("VEN-150:1,VEN-090:1").all).toBe(4);
  });

  it("pays Acceleration Gate + Mountain Drake all T4 and pays T5: the 4 readies are shared by units and runes", () => {
    expect(price("VEN-150:1,OGN-142:1")).toEqual({ all: 4, pays: 5 });
  });

  it("pays three Acceleration Gates + Moonlight Affliction on T3, as walked: each recycle shrinks only the Gates after it", () => {
    expect(price("VEN-150:3,UNL-066:1").all).toBe(3);
  });

  it("pays Acceleration Gate alone on T2, not T1: the runes it readies cannot pay its own cost", () => {
    expect(price("VEN-150:1").all).toBe(2);
  });

  it("pays Acceleration Gate + two Premonitions on T4: a readied rune returns no Power", () => {
    expect(price("VEN-150:1,SFD-087:2").all).toBe(4);
  });

  it("prints its predicate and every member, each modelled or refused with a reason", () => {
    const m = out.match(/# readying runes \((.*)\): (\d+) cards say it; modelled (\d+): (.*); refused (\d+): (.*); unclassified (\d+); (\d+) of (\d+) rows hold a modelled one/);
    expect(m, "the rune-readying line is missing from --turns").toBeTruthy();
    // A second instrument, not the predicate itself: every base whose text says "ready" and "rune" in
    // one sentence, icons stripped, read straight from data/cards.json.
    const all = JSON.parse(readFileSync("data/cards.json", "utf8")).cards as { base: string; text?: string; effect?: string }[];
    const said = new Set<string>();
    for (const c of all) {
      const t = `${c.text || ""} ${c.effect || ""}`.replace(/:rb_[a-z_0-9]+:/g, "");
      if (t.split(/[.\n]/).some((s) => /\bready\b/i.test(s) && /\brunes?\b/i.test(s))) said.add(c.base);
    }
    expect(said.size).toBe(12);
    expect(Number(m![2])).toBe(said.size);
    expect(Number(m![3]) + Number(m![5])).toBe(said.size);
    expect(Number(m![7])).toBe(0);
    for (const b of said) expect(`${m![4]} ${m![6]}`, b).toContain(b);
    expect(m![4]).toContain("VEN-150");
    expect(m![6]).toContain("OGN-110");
    // #523: the three conditional readiers left the refused list for the modelled one.
    for (const b of ["SFD-049", "SFD-224", "VEN-145", "VEN-192", "UNL-104"]) {
      expect(m![4], b).toContain(b);
      expect(m![6], b).not.toContain(b);
    }
    expect(Number(m![8])).toBeGreaterThan(0);
  });
});

/**
 * THREE CONDITIONAL RUNE READIERS (#523), pinned against REAL card text through `--price`, each with a
 * control that a looser model fails. Same rules as #513's block above: a readied rune is one more
 * Energy and no more Power (164.2.a/b), and a trigger resolves only after the cost that fired it is
 * paid. Going first, 2 runes a turn (315.3.b).
 *
 * Cards: SFD-049 Aphelios, Exalted (Unit, E4 + 1, "When you attach an Equipment to me, choose one that
 * hasn't been chosen this turn — • Ready 2 runes. • Channel 1 rune exhausted. • Buff a friendly
 * unit."), UNL-039 Soul Sword (Equipment, E1, "[Equip] [C]"), UNL-066 Moonlight Affliction (Spell, E7),
 * OGN-129 Confront (Spell, E2), VEN-145 Curator of the Sands (Legend, "When you play a unit, gear, or
 * activated ability with Energy cost [7] or more, you may exhaust me to ready up to 2 runes."),
 * OGN-088 Mega-Mech (Unit, E7, no text), VEN-056 Clairvoyance (Spell, E7), UNL-104 Gentle Gemdragon
 * (Unit, Dragon, E8, "When you play me or another Dragon, ready up to 2 runes."), OGN-131 Dune Drake
 * (Unit, Dragon, E5), OGN-142 Mountain Drake (Unit, Dragon, E9, no text).
 *
 * APHELIOS + SOUL SWORD + AFFLICTION, T3. T1: the Sword (2 runes). T2: Aphelios, 4 runes, one recycled
 * for his Power (3 left). T3: 5 runes, exhaust all five (pool 5), recycle one for the [Equip] (4 left),
 * attach to him and choose Ready 2 runes, exhaust them (pool 7), cast Affliction. Not T2: Affliction
 * wants a pool of 7 and T2's is 4 runes + 2. Without the trigger it is T4: Affliction needs 7 runes, and
 * the Sword and Aphelios on T1/T2 leave 3, 5, 7 of them, so T4 with the attach's recycle after it.
 *
 * THE SAME + A SECOND SWORD + CONFRONT, T4 (the control: Ready is ONE mode, once a turn). E15 + 3. T3
 * would need a pool of 7 for Affliction out of one Ready, so a board of 5 runes, so at most ONE
 * recycle before T3, which is Aphelios's own: no attach before T3, nothing readied on T1 or T2, and
 * those turns' 2 + 4 runes cannot pay the other E8 (Aphelios, two Swords, Confront). T4: Confront T1,
 * Aphelios T2 (3 runes left), both Swords and one attach on T3 (4 left), the other attach on T4's 6
 * runes (5 left, pool 6 + 2) and Affliction. A clock that let both attaches choose Ready on T3 says T3
 * (pool 5 - 2 + 2 + 2 = 7); this one passes without #523 too: it guards the model, not the bug.
 *
 * CURATOR + THREE MEGA-MECHS + AFFLICTION, T6. Four E7 cards. T4: 8 runes, a Mech (pool 1), exhaust
 * Curator to ready 2 (pool 3). T5: 10 runes, a Mech, ready 2. T6: 12 runes, the third Mech (pool 5),
 * Curator readied at the Awaken (415.3.a) readies 2 (pool 7), Affliction. Not T5: a turn holds two E7s
 * only with 12 runes + her 2 = 14, she fires only after a 7+ play, and before T4 no turn has 7 runes, so
 * T4 and T5 take one each. Without her it is T7: no turn ever holds two (161.2.a caps the board at 12),
 * so the four need T4, T5, T6 and T7.
 *
 * CURATOR + FOUR E7 SPELLS, T7 (the control: she reads a unit, gear or activated ability, never a
 * spell). The same four E7 costs as above, two Afflictions and two Clairvoyances, so she never fires and
 * the four need four turns of 7 runes. A clock that let a spell fire her prints T6.
 *
 * TWO GEMDRAGONS + TWO DUNE DRAKES, T5. T4: 8 runes, a Gemdragon (pool 0), its own trigger readies 2.
 * T5: 10 runes (pool 10). The second Gemdragon (pool 2): its own trigger and the first one's "another
 * Dragon" ready 2 each (pool 6). A Drake (pool 1): both Gemdragons ready 2 each (pool 5). The other
 * Drake (pool 0). Not T4: a Gemdragon is E8, so T4 is the first turn that can land one, and it leaves
 * 0 + 2 of T4's 8, short of the second. Without the other-Dragon half it is T6: T5's second Gemdragon leaves 2 + 2 = 4,
 * short of a Drake, so a Drake on T3, the Gemdragons on T4 and T5 and the other Drake on T6.
 *
 * TWO GEMDRAGONS + A MOUNTAIN DRAKE, T6 (the control: a trigger comes AFTER the Dragon is paid). T4 the
 * first Gemdragon. T5's 10 runes: the second (pool 2 + 4 = 6), and the Drake's E9 is not payable out of
 * 6, whatever its two triggers would return. T6: 12 runes, the Drake (pool 3 + 4). A clock that counted
 * the Drake's own triggers toward its own cost would say T5 (10 + 4 + 4 = 18 of 17).
 */
describe("conditional rune readiers (#523)", () => {
  const price = (set: string) => {
    const s = execFileSync("node", ["scripts/adversarial-check.mjs", "--price", set], { encoding: "utf8" });
    const m = s.match(/all T(\d+|Infinity)/);
    expect(m, s).toBeTruthy();
    return Number(m![1]);
  };

  it("pays Aphelios + Soul Sword + Moonlight Affliction on T3, as walked: the attach to him readies 2 runes", () => {
    expect(price("SFD-049:1,UNL-039:1,UNL-066:1")).toBe(3);
  });

  it("pays Aphelios + two Soul Swords + Affliction + Confront on T4, not T3: one Ready a turn (the control)", () => {
    expect(price("SFD-049:1,UNL-039:2,UNL-066:1,OGN-129:1")).toBe(4);
  });

  it("pays Curator + three Mega-Mechs + Moonlight Affliction on T6, as walked: an E7 unit fires her", () => {
    expect(price("VEN-145:1,OGN-088:3,UNL-066:1")).toBe(6);
  });

  it("pays Curator + four E7 spells on T7: a spell never fires her (the control)", () => {
    expect(price("VEN-145:1,UNL-066:2,VEN-056:2")).toBe(7);
  });

  it("pays two Gemdragons + two Dune Drakes on T5, as walked: every Gemdragon on the board readies 2 per Dragon", () => {
    expect(price("UNL-104:2,OGN-131:2")).toBe(5);
  });

  it("pays two Gemdragons + a Mountain Drake on T6, not T5: the triggers follow the Dragon's cost (the control)", () => {
    expect(price("UNL-104:2,OGN-142:1")).toBe(6);
  });

  // The set #523's security scan found: legal, 3 copies of each, and it walked 195 million leaves
  // (past 120s) before the work guard. It must finish and SAY its answer is the greedy one.
  it("sends 3 Gemdragons + 21 other Dragons + 2 Aphelios to the greedy fallback instead of hanging, and says so", () => {
    const s = execFileSync("node", ["scripts/adversarial-check.mjs", "--price",
      "UNL-104:3,OGN-001:3,OGN-131:3,OGN-038:3,VEN-016:3,OGN-142:3,SFD-006:3,UNL-118:3,SFD-224:2"],
      { encoding: "utf8", timeout: 60_000 });
    expect(s).toContain("GREEDY FALLBACK");
  }, 60_000); // ~6s alone: it walks the whole leaf budget before it falls back
});

/**
 * WHICH UNIT A BODY IS (#517). An `anyBodies` body was priced only as the cheapest unit in the
 * identity, which lands exhausted (143.4), never as a dearer one that lands ready, so a row whose last
 * unit was a body read late. `--price ... --bodies N` prices N bodies chosen as a row's are, and
 * prints the pick. Hand walks, Body/Fury and Body, runes 2/4 on T1/T2 (161.2.a), and 164.2.a/b: R
 * runes pay R Energy and R Power in one turn, a recycled rune leaving the board.
 *
 * CHEMTECH ENFORCER + PUNCH FIRST + ONE BODY, T2 (the Accelerate body is a turn earlier). OGN-003 is
 * an E2 unit, SFD-097 an E1 + 2 Power spell. T1: the Enforcer, both runes. T2: 4 runes pay Punch
 * First and OGN-010 Legion Rearguard Accelerated, E2 + E1 and 1 Fury Power (805.1.a): E4 + 3 Power,
 * so it enters ready, and the Enforcer readied at T2's Awaken. With UNL-111 Determined Sentry (E1)
 * every order lands a unit on T2 exhausted: T1 holds the Enforcer, the Sentry, or the Sentry and
 * Punch First (E2 + 2), and T2 takes the rest, which always holds a unit. So T3, which is what the
 * clock printed before this.
 *
 * TWO DETERMINED SENTRIES + ONE BODY, T2 (the same, inside one domain). T1: two Sentries. T2: UNL-115
 * Nilah, Joyful Ascetic Accelerated, E3 + 1 and E1 + 1: E4 + 2 Power on 4 runes, ready. Three
 * Sentries cannot all land on T1's 2 runes, so one lands on T2 exhausted: T3.
 *
 * CLEAVE + ONSLAUGHT + ONE BODY, T2 (the control, the cheap body wins). OGN-004 is an E1 spell,
 * VEN-081 an E4 one. T1: the Sentry and Cleave; T2: Onslaught, and the Sentry is ready. An E2 body
 * leaves no room for Cleave on T1, and T2's 4 runes cannot pay Onslaught and either of them: T3.
 */
describe("anyBodies: which unit a body is (#517)", () => {
  const price = (set: string, bodies: number) => {
    const s = execFileSync("node", ["scripts/adversarial-check.mjs", "--price", set, "--bodies", String(bodies)], { encoding: "utf8" });
    const m = s.match(/pays T(\d+|Infinity), .*, bodies (\S+) of \[/);
    expect(m, s).toBeTruthy();
    return { pays: Number(m![1]), bodies: m![2] };
  };

  it("pays Chemtech Enforcer + Punch First + one body on T2, the body a Legion Rearguard Accelerated, as walked", () => {
    expect(price("OGN-003:1,SFD-097:1", 1)).toEqual({ pays: 2, bodies: "OGN-010" });
  });

  it("pays two Determined Sentries + one body on T2, the body a Nilah Accelerated, as walked", () => {
    expect(price("UNL-111:2", 1)).toEqual({ pays: 2, bodies: "UNL-115" });
  });

  it("pays Cleave + Onslaught + one body on T2 with the cheap Determined Sentry (the control)", () => {
    expect(price("OGN-004:1,VEN-081:1", 1)).toEqual({ pays: 2, bodies: "UNL-111" });
  });

  it.each(["1e0", "01", "9", "-1", ""])("refuses --bodies %j", (n) => {
    const r = spawnSync("node", ["scripts/adversarial-check.mjs", "--price", "OGN-004:1", "--bodies", n], { encoding: "utf8" });
    expect(r.status).toBe(2);
    expect(r.stderr).toContain("# --price: bad --bodies");
  });

  it("prints the candidates of every identity a row with bodies is priced in", () => {
    const m = out.match(/# body candidates \(anyBodies, #517[^)]*\): (\d+) of (\d+) rows carry bodies, in (\d+) identities\n((?:#   .*\n)*)/);
    expect(m, "the body candidates line is missing from --turns").toBeTruthy();
    expect(Number(m![1])).toBeGreaterThan(0);
    const lines = m![4]!.trim().split("\n");
    expect(lines.length).toBe(Number(m![3]));
    // A second instrument: the identities read off the rows themselves, for the rows that carry bodies.
    const combos = JSON.parse(readFileSync("data/combos.json", "utf8")).combos as { id: string; anyBodies?: { count: number } }[];
    const withBodies = new Set(combos.filter((c) => c.anyBodies?.count).map((c) => c.id));
    const doms = new Set<string>();
    for (const line of out.split("\n")) {
      const r = line.match(/T\s*(?:\d+|Infinity)\s+vs\s+T\d+\s+baseline\s+(?:SLOWER)?\s*\S+\s+(\S+)\s+(\S+)/);
      if (r && withBodies.has(r[2]!)) doms.add(r[1]!);
    }
    expect(doms.size).toBeGreaterThan(0);
    for (const d of doms) expect(lines.some((l) => l.startsWith(`#   ${d} `)), d).toBe(true);
  });
});

/** --price input validation (#511): Number() read 0x1 and 1e0 as 1 and the destructure dropped a third field. */
describe("--price refuses malformed specs (#511)", () => {
  const run = (spec: string) => spawnSync("node", ["scripts/adversarial-check.mjs", "--price", spec], { encoding: "utf8" });
  it.each([
    ["", ""],
    [",", ""],
    ["OGN-040:0x1", "OGN-040:0x1"],
    ["OGN-040:1e0", "OGN-040:1e0"],
    ["OGN-040:1:9", "OGN-040:1:9"],
    ["OGN-040:0", "OGN-040:0"],
    ["OGN-040:01", "OGN-040:01"],
    ["OGN-040", "OGN-040"],
  ])("refuses %j", (spec, token) => {
    const r = run(spec);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toContain("# --price:");
    expect(r.stderr).toContain(token);
  });
  it("prints the refused token escaped, never as a raw control byte", () => {
    const r = run("\x1b[31mOGN-040:1");
    expect(r.status).toBe(2);
    expect(r.stderr).not.toContain("\x1b");
    expect(r.stderr).toContain("\\u001b");
  });
  it("still prices a valid spec", () => {
    const r = run("OGN-040:1");
    expect(r.status, r.stderr).toBe(0);
    expect(r.stdout).toMatch(/^price OGN-040x1: all T/);
  });
});
