import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs so it stays runnable as `node scripts/or-pairs.mjs`, which is how the
// docblock tells a reader to re-run it; same convention as test/markdown.test.ts.
import { orPairs } from "../scripts/or-pairs.mjs";

/**
 * Pins the population of "worded to satisfy BOTH halves of a distinction" cards.
 *
 * This is the clean-state pinning rule applied to an INSTRUMENT rather than to data: the fifteen
 * pairs were read card by card on 2026-09-14, two of them are known historical defects
 * (`look at OR reveal` -> OGN-194 Nocturne; `attack OR defend` -> 11 cards, six entries repriced),
 * and the other thirteen are dispositioned in `scripts/or-pairs.mjs`'s docblock.
 *
 * THE POINT IS THE DELTA, NOT THE NUMBER. A new set changes the population, this test goes red, and
 * somebody has to READ the new rows and ask whether CLAUDE.md contains a sentence treating that pair
 * as exclusive. Pinning a clean state costs nothing and can only be paid for once.
 *
 * Asserted as an exact SET rather than a count, for the reason this project already records about an
 * errata pin: exact equality fails both when a row APPEARS and when one stops needing to be there,
 * and the second half is the one people forget.
 */
const corpus = readFileSync(new URL("../data/corpus_flat.txt", import.meta.url), "utf8");

const READ_2026_09_14 = [
  "attack OR defend", "conquer OR discard", "conquer OR exhaust", "conquer OR gain",
  "conquer OR hold", "conquer OR play", "conquer OR score", "discard OR ready",
  "draw OR buff", "look at OR reveal", "play OR attack", "play OR draw",
  "play OR exhaust", "play OR look at", "play OR ready",
].sort();

describe("or-pairs: cards worded to satisfy both halves of a distinction", () => {
  it("has exactly the fifteen pairs read on 2026-09-14", () => {
    expect([...orPairs(corpus).keys()].sort()).toEqual(READ_2026_09_14);
  });

  it("finds the control, or the sweep is not reading the pool it thinks it is", () => {
    // OGN-194 Nocturne, Horrifying is the card that motivated the check: "As you look at or reveal
    // me from the top of your deck". A sweep that loses him is broken, and a broken sweep returning
    // a short list reads exactly like a clean result.
    expect(orPairs(corpus).get("look at OR reveal")).toEqual(["OGN-194"]);
  });

  it("finds the other known historical defect, and pins its MEMBERS rather than its count", () => {
    // `attack OR defend` was found on 2026-09-12 with six entries priced at half rate. It is the one
    // member whose defect was found AND fixed, so it is the natural control for the whole signature.
    //
    // PINNED AS A MEMBER LIST, NOT A COUNT, and that is the whole point of this assertion. A TOTAL CAN
    // COLLIDE ACROSS TWO PREDICATES while the sets differ - two lanes both published "sixteen point
    // cards" on 2026-09-14 from predicates whose sets were two members apart, and both had stated
    // their predicates. Stating the predicate and naming the members are ONE rule and neither half is
    // sufficient. A count of 11 would go green for any future predicate that happens to land on 11.
    //
    // No collision was DEMONSTRATED for this claim: varying the match window 12/18/25/40 gives
    // 11/11/10/10 and the shorter sets are strict SUBSETS. Pinned anyway, because pinning a clean
    // state costs nothing and can only be paid for once.
    expect(orPairs(corpus).get("attack OR defend")).toEqual([
      "OGN-055", "OGN-060", "OGN-119", "SFD-016", "SFD-020", "SFD-082",
      "SFD-110", "SFD-190", "UNL-056", "UNL-143", "VEN-079",
    ]);
  });
});
