import { describe, expect, it } from "vitest";
import { loadCardIndex, loadCombos } from "../src/load.js";
import type { Combo } from "../src/types.js";

/**
 * WHAT A TIME WARP CAN MULTIPLY, PINNED AS A STRUCTURE AND NOT AS A COUNT (#200, 2026-09-14).
 *
 * `OGN-122 Time Warp` reads *"Take a turn after this one. Banish this."* — and on that extra turn the
 * opponent has not acted, so the board is exactly as you left it. Whether a point source pays again
 * therefore depends on what its gate reads, and the Core Rules split the gates on two adjacent
 * paragraphs that had never been read against each other:
 *
 *   469.2  HOLD    "A player MAINTAINS Control of a Battlefield they did not yet Score this turn
 *                   during their Beginning Phase."   The verb is MAINTAINS and "this turn" resets,
 *                   so 315.2.b.2 pays again on every extra turn, for free.
 *   469.1  CONQUER "A player GAINS Control of a Battlefield they did not yet Score this turn."
 *                   The verb is GAINS, and 348.2.a adds "if that player does not already Control the
 *                   Battlefield" — and you already control what you took. It STARVES.
 *   323.9  COMBAT  A Combat is Staged only "at each Battlefield that Contested was applied to that
 *                   have Units present controlled by opposing players". The opponent never replayed
 *                   a body, so after you clear their garrisons there is no combat anywhere. It
 *                   STARVES HARDER: no amount of your own mana fixes it.
 *
 * So an entry that stands a Time Warp on a conquer- or combat-gated point card is not a matter of
 * taste — its ARITHMETIC over-counts, because the second and third turns of the chain are priced as
 * if they paid and 348.2.a or 323.9 gives them nothing.
 *
 * The catalogue already obeyed this, eleven entries out of eleven, before it was written down. THAT
 * COUNT IS DELIBERATELY NOT ASSERTED HERE: it moves every time a lane merges a Time Warp entry, and
 * a test that pins a count fails on somebody else's good work. What is pinned is the structure.
 *
 * SCOPE, stated so a failure is readable: this reads an entry's own `uses` and nothing else. A
 * closure assembled through `needs`/`produces` is the variant walker's business, not this file's.
 */
const cards = loadCardIndex();
const { combos } = loadCombos();

const TIME_WARP = "OGN-122";

/**
 * The gate of each point card, by base code, with the clause that decides it. Only the two starving
 * kinds are listed — a hold-gated or not-opponent-gated source is exactly what this rule permits, so
 * enumerating those would be enumerating the pass case.
 */
const STARVES: Record<string, { kind: "conquer" | "combat"; clause: string }> = {
  "VEN-046": { kind: "conquer", clause: "When I conquer, you score 1 point" },
  "VEN-065": { kind: "conquer", clause: "When I conquer, if you've played" },
  "OGN-034": { kind: "combat", clause: "When I conquer after an attack" },
  "SFD-148": { kind: "combat", clause: "The first time I win a combat each turn" },
};

/**
 * `UNL-177 Ivern, Friend to All` is excluded BY NAME and with its reason, which is the only kind of
 * exclusion worth having. It reads *"When I conquer or hold, score 1 point if…"*, and 823.1.b — the
 * paragraph that makes [Hunt] both a Conquer and a Hold effect — is why that clause is BOTH kinds at
 * once. Its hold half survives the extra turn exactly as `VEN-138 Shen`'s does, so a Time Warp entry
 * running Ivern would be correct and this check must not flag it.
 */
const EXEMPT = new Set(["UNL-177"]);

const usesCard = (c: Combo, base: string) => c.uses.some((u) => u.card === base);
const timeWarpEntries = combos.filter((c) => usesCard(c, TIME_WARP));

/** The predicate under test, reused by the known-positive proof below so both exercise one code path. */
const starvingPointCards = (combo: Combo) =>
  combo.uses
    .map((u) => u.card)
    .filter((base) => !EXEMPT.has(base) && base in STARVES)
    .map((base) => `${base} (${STARVES[base]!.kind}-gated: "${STARVES[base]!.clause}")`);

describe("a Time Warp chain multiplies a rate, and only a gate that survives the opponent's absence is one", () => {
  it("has a Time Warp population to check at all, and cards whose text still says what the gates claim", () => {
    // NON-VACUITY. A sweep that silently matches nothing reads exactly like a pass.
    expect(timeWarpEntries.length, "no entry uses OGN-122 — the predicate has nothing to check").toBeGreaterThan(0);
    expect(cards.get(TIME_WARP)?.text ?? "").toContain("Take a turn after this one");

    // And the gate table is a claim about CARD TEXT, so it goes stale if Riot errata a clause. Check
    // it rather than trusting it: a set rotation should fail here loudly, not quietly mis-classify.
    for (const [base, gate] of Object.entries(STARVES)) {
      const card = cards.get(base);
      expect(card, `${base} is not in the pool any more — the gate table needs re-reading`).toBeTruthy();
      expect(`${card!.text ?? ""} ${card!.effect ?? ""}`, `${base} no longer prints the clause this gate stands on`)
        .toContain(gate.clause);
    }
    expect(cards.get("UNL-177")?.text ?? "", "the Ivern exemption stands on 'conquer or hold' — re-read it")
      .toContain("When I conquer or hold");
  });

  it("proves the check can SEE a violation, before its null is believed", () => {
    // A null from a new constraint is worth nothing until the instrument is shown able to see the
    // thing it says is absent. Two synthetic entries, differing ONLY in the gate of their point card.
    const synth = (base: string): Combo =>
      ({ ...timeWarpEntries[0]!, id: `synthetic-${base}`, uses: [{ card: TIME_WARP, quantity: 1, role: "engine" }, { card: base, quantity: 1, role: "payoff" }] }) as Combo;

    expect(starvingPointCards(synth("SFD-148")), "a combat-gated point card must be flagged").toHaveLength(1);
    expect(starvingPointCards(synth("VEN-065")), "a conquer-gated point card must be flagged").toHaveLength(1);
    expect(starvingPointCards(synth("VEN-138")), "a HOLD-gated point card must NOT be flagged").toHaveLength(0);
    expect(starvingPointCards(synth("UNL-177")), "Ivern is exempt by 823.1.b and must NOT be flagged").toHaveLength(0);
  });

  it("stands no Time Warp on a point source the extra turn cannot pay", () => {
    const bad = timeWarpEntries
      .map((c) => ({ id: c.id, hits: starvingPointCards(c) }))
      .filter((r) => r.hits.length > 0)
      .map((r) => `${r.id}: ${r.hits.join(", ")}`);

    // If you are reading this because it failed: the entry is not merely inelegant, its point total is
    // wrong. 348.2.a refuses Control to a player who already has it and 323.9 stages no Combat where
    // the opponent has no units, so whichever turn of the chain that card was counted on pays zero.
    // The escape exists and is expensive — 323.6 lets you walk a garrison off, lose the battlefield and
    // retake it, at two Standard Moves per body per turn (144.4.b then 144.4.a, each exhausting under
    // 144.2) — so if the entry really pays that price, say so in its steps and add it to EXEMPT with
    // the reason, exactly as UNL-177 is.
    expect(bad, `Time Warp entries standing on a starving gate (checked ${timeWarpEntries.length})`).toEqual([]);
  });
});
