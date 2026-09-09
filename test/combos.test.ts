import { describe, expect, it } from "vitest";
import { CardIndex } from "../src/cards.js";
import { CLASS_RANK, generateVariants, sourceHref, validateCombos } from "../src/combos.js";
import { loadCombos } from "../src/load.js";
import { SOURCE_KINDS } from "../src/types.js";
import type { Card, Combo, ComboClass, ComboStatus, Domain, Ingredient } from "../src/types.js";

// Only the feature vocabulary comes from data/ — it is capped at ~20 entries by design and every
// id here is one of them. The combos are synthetic so that growing the catalogue cannot move
// these assertions, and so that the paths the real 52 entries never take (refuted status,
// legend-restricted entries, cycles) are exercised at all.
const { features } = loadCombos();

const card = (base: string, domains: Domain[] = ["fury"], over: Partial<Card> = {}): Card => ({
  id: base, code: base, base, variant: "", publicCode: base, name: base,
  set: base.slice(0, 3), collectorNumber: Number(base.slice(4)) || 0, type: ["unit"],
  rarity: null, domains, energy: null, power: null, might: null, mightBonus: null,
  text: null, effect: null, tags: [], orientation: "portrait", artist: null, image: null,
  signature: false, ...over,
});

const cards = new CardIndex(
  [
    card("TST-001"), card("TST-002"), card("TST-003"), card("TST-004"),
    card("TST-010", ["order"]), card("TST-011", ["mind", "order"]),
    // An alt-art printing, so "quantity declared against a non-base code" has something to hit.
    card("TST-020a", ["fury"], { base: "TST-020" }), card("TST-020"),
  ],
  [],
);

const uses = (spec: Record<string, number>): Ingredient[] =>
  Object.entries(spec).map(([card, quantity]) => ({ card, quantity, role: "engine" as const }));

const combo = (over: Partial<Combo> & { id: string }): Combo => ({
  name: over.id, class: "ENGINE", status: "verified", uses: [], needs: [], produces: [],
  prerequisites: { easy: [], notable: [] },
  // Every fixture says "repeat" so an INFINITE one passes validateCombos without extra setup;
  // the rule itself is pinned by its own test below.
  steps: ["repeat as needed"],
  terminatesIn: "one turn", sources: [], rulesVersion: "2026-07-16", ...over,
});

const variantsOf = (list: Combo[], maxDepth?: number) => generateVariants(list, cards, maxDepth);
/** The variants headed by `id` — the ones generateVariants built by expanding that combo's needs. */
const withCombo = (list: Combo[], id: string, maxDepth?: number) =>
  variantsOf(list, maxDepth).filter((v) => v.comboIds[0] === id);

describe("validateCombos", () => {
  it("passes a well-formed entry", () => {
    const ok = combo({ id: "ok", uses: uses({ "TST-001": 2 }), produces: ["infinite-energy"] });
    expect(validateCombos([ok], features, cards)).toEqual([]);
  });

  it("rejects a duplicate id", () => {
    const a = combo({ id: "twice" });
    expect(validateCombos([a, combo({ id: "twice" })], features, cards)).toEqual(["twice: duplicate id"]);
  });

  it("rejects a card the index does not know", () => {
    const bad = combo({ id: "ghost", uses: uses({ "ZZZ-999": 1 }) });
    expect(validateCombos([bad], features, cards)).toEqual(["ghost: unknown card ZZZ-999"]);
  });

  it("rejects an ingredient declared against an alt-art code instead of the base", () => {
    const bad = combo({ id: "alt", uses: uses({ "TST-020a": 1 }) });
    expect(validateCombos([bad], features, cards)).toEqual(["alt: TST-020a is not a base code (use TST-020)"]);
  });

  it("rejects a quantity below one", () => {
    const bad = combo({ id: "zero", uses: uses({ "TST-001": 0 }) });
    expect(validateCombos([bad], features, cards)).toEqual(["zero: TST-001 quantity must be >= 1"]);
  });

  it("rejects an unknown feature in needs, produces or removes alike", () => {
    const bad = combo({ id: "vocab", needs: ["not-a-feature"], produces: ["nope"], removes: ["neither"] });
    expect(validateCombos([bad], features, cards)).toEqual([
      "vocab: unknown feature not-a-feature",
      "vocab: unknown feature nope",
      "vocab: unknown feature neither",
    ]);
  });

  it("requires an INFINITE entry to have a step that says repeat", () => {
    const loop = combo({ id: "loop", class: "INFINITE", steps: ["gain 1 Energy", "do it again"] });
    expect(validateCombos([loop], features, cards)).toEqual([
      'loop: INFINITE combos must have a step that says "repeat"',
    ]);
    expect(validateCombos([combo({ id: "loop", class: "INFINITE" })], features, cards)).toEqual([]);
    // The rule is scoped to INFINITE: nothing else has to promise a repeat.
    expect(validateCombos([combo({ id: "burst", class: "BURST", steps: ["score 8"] })], features, cards)).toEqual([]);
  });
});

describe("generateVariants — merging the card multisets", () => {
  const feed = combo({ id: "feed", produces: ["infinite-energy"], uses: uses({ "TST-001": 1, "TST-002": 3 }) });

  it("counts a card shared by both halves once, not twice", () => {
    // The same physical copies serve both halves within one turn, so max() is the merge, not sum.
    const payoff = combo({
      id: "payoff", needs: ["infinite-energy"], produces: ["win-the-game"], uses: uses({ "TST-001": 1 }),
    });
    const [v] = withCombo([payoff, feed], "payoff");
    expect(v!.cards["TST-001"]).toBe(1);
  });

  it("keeps the larger of the two quantities for a shared card", () => {
    const payoff = combo({ id: "payoff", needs: ["infinite-energy"], uses: uses({ "TST-001": 3, "TST-002": 1 }) });
    const [v] = withCombo([payoff, feed], "payoff");
    expect(v!.cards).toEqual({ "TST-001": 3, "TST-002": 3 });
  });

  it("unions the cards only one half asks for", () => {
    const payoff = combo({ id: "payoff", needs: ["infinite-energy"], uses: uses({ "TST-003": 2 }) });
    const [v] = withCombo([payoff, feed], "payoff");
    expect(v!.cards).toEqual({ "TST-001": 1, "TST-002": 3, "TST-003": 2 });
    expect(v!.comboIds).toEqual(["payoff", "feed"]);
    expect(v!.id).toBe("payoff+feed");
    expect(v!.produces.sort()).toEqual(["infinite-energy"]);
  });
});

describe("generateVariants — satisfying needs", () => {
  it("generates nothing for a combo whose need nobody produces", () => {
    const orphan = combo({ id: "orphan", needs: ["infinite-power"], uses: uses({ "TST-001": 1 }) });
    const other = combo({ id: "other", produces: ["infinite-energy"], uses: uses({ "TST-002": 1 }) });
    const all = variantsOf([orphan, other]);
    expect(all.map((v) => v.id)).toEqual(["other"]);
  });

  it("does not let a combo satisfy its own need with its own produces", () => {
    const selfish = combo({
      id: "selfish", needs: ["infinite-energy"], produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }),
    });
    expect(variantsOf([selfish])).toEqual([]);
  });

  it("emits one variant per producer when several can feed the same need", () => {
    const a = combo({ id: "a", produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }) });
    const b = combo({ id: "b", produces: ["infinite-energy"], uses: uses({ "TST-002": 1 }) });
    const payoff = combo({ id: "payoff", needs: ["infinite-energy"], uses: uses({ "TST-003": 1 }) });
    expect(withCombo([payoff, a, b], "payoff").map((v) => v.id).sort()).toEqual(["payoff+a", "payoff+b"]);
  });

  it("uses a producer once when it covers two of the same combo's needs", () => {
    const both = combo({
      id: "both", produces: ["infinite-energy", "infinite-power"], uses: uses({ "TST-001": 1 }),
    });
    const payoff = combo({
      id: "payoff", needs: ["infinite-energy", "infinite-power"], uses: uses({ "TST-002": 1 }),
    });
    const hits = withCombo([payoff, both], "payoff");
    expect(hits.length).toBe(1);
    expect(hits[0]!.comboIds).toEqual(["payoff", "both"]);
  });

  it("pulls in one producer per need when no single combo covers both", () => {
    const e = combo({ id: "e", produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }) });
    const p = combo({ id: "p", produces: ["infinite-power"], uses: uses({ "TST-002": 1 }) });
    const payoff = combo({
      id: "payoff", needs: ["infinite-energy", "infinite-power"], uses: uses({ "TST-003": 1 }),
    });
    const hits = withCombo([payoff, e, p], "payoff");
    expect(hits.length).toBe(1);
    expect(hits[0]!.comboIds.sort()).toEqual(["e", "p", "payoff"]);
    expect(hits[0]!.produces.sort()).toEqual(["infinite-energy", "infinite-power"]);
  });

  it("terminates on a cycle instead of expanding A -> B -> A forever", () => {
    const a = combo({ id: "a", needs: ["infinite-power"], produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }) });
    const b = combo({ id: "b", needs: ["infinite-energy"], produces: ["infinite-power"], uses: uses({ "TST-002": 1 }) });
    expect(variantsOf([a, b])).toEqual([]);
  });

  it("still expands the far side of a cycle when a standalone producer exists", () => {
    const a = combo({ id: "a", needs: ["infinite-power"], produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }) });
    const b = combo({ id: "b", needs: ["infinite-energy"], produces: ["infinite-power"], uses: uses({ "TST-002": 1 }) });
    const ground = combo({ id: "ground", produces: ["infinite-power"], uses: uses({ "TST-003": 1 }) });
    expect(withCombo([a, b, ground], "a").map((v) => v.id)).toEqual(["a+ground"]);
    // b can only reach infinite-energy through a, and a is back on b through the cycle guard.
    expect(withCombo([a, b, ground], "b").map((v) => v.id)).toEqual(["b+a+ground"]);
  });
});

describe("generateVariants — the depth limit", () => {
  // root <- a <- b <- c, each one needing what the next produces.
  const chain = [
    combo({ id: "root", needs: ["infinite-energy"], uses: uses({ "TST-001": 1 }) }),
    combo({ id: "a", needs: ["infinite-power"], produces: ["infinite-energy"], uses: uses({ "TST-002": 1 }) }),
    combo({ id: "b", needs: ["infinite-ready"], produces: ["infinite-power"], uses: uses({ "TST-003": 1 }) }),
    combo({ id: "c", produces: ["infinite-ready"], uses: uses({ "TST-004": 1 }) }),
  ];

  it("walks a three-link chain at the default depth", () => {
    const hits = withCombo(chain, "root");
    expect(hits.length).toBe(1);
    expect(hits[0]!.comboIds).toEqual(["root", "a", "b", "c"]);
    expect(hits[0]!.cards).toEqual({ "TST-001": 1, "TST-002": 1, "TST-003": 1, "TST-004": 1 });
  });

  it("drops the whole variant when the chain outruns maxDepth, rather than truncating it", () => {
    expect(withCombo(chain, "root", 2)).toEqual([]);
    // The tail that does fit is still generated on its own.
    expect(withCombo(chain, "b", 2).map((v) => v.id)).toEqual(["b+c"]);
  });

  it("refuses to expand anything at maxDepth 0", () => {
    expect(variantsOf(chain, 0).map((v) => v.id)).toEqual(["c"]);
  });
});

describe("generateVariants — class and status of a composed variant", () => {
  it("ranks the classes in the order the labels depend on", () => {
    expect(CLASS_RANK).toEqual({ ENGINE: 0, INFINITE: 1, BURST: 2, CHAIN: 3, ALT_WIN: 4 });
  });

  it("labels an ENGINE fed by a CHAIN payoff as CHAIN", () => {
    const feed = combo({ id: "feed", class: "CHAIN", produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }) });
    const root = combo({ id: "root", class: "ENGINE", needs: ["infinite-energy"], uses: uses({ "TST-002": 1 }) });
    expect(withCombo([root, feed], "root")[0]!.class).toBe("CHAIN");
  });

  it("takes the higher-ranked class for every pair, keeping the root's class on a tie", () => {
    // Written out as a literal so reordering CLASS_RANK fails here instead of silently
    // relabelling composed variants in the UI.
    const order: ComboClass[] = ["ENGINE", "INFINITE", "BURST", "CHAIN", "ALT_WIN"];
    for (const rootClass of order) {
      for (const feedClass of order) {
        const feed = combo({
          id: "feed", class: feedClass, produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }),
        });
        const root = combo({
          id: "root", class: rootClass, needs: ["infinite-energy"], uses: uses({ "TST-002": 1 }),
        });
        const expected = order.indexOf(rootClass) >= order.indexOf(feedClass) ? rootClass : feedClass;
        expect(withCombo([root, feed], "root")[0]!.class, `${rootClass} fed by ${feedClass}`).toBe(expected);
      }
    }
  });

  it("carries the worse status of the two halves", () => {
    const pairs: [ComboStatus, ComboStatus, ComboStatus][] = [
      ["verified", "verified", "verified"],
      ["verified", "candidate", "candidate"],
      ["candidate", "verified", "candidate"],
      ["candidate", "candidate", "candidate"],
      // A refuted producer is not filtered out, so it poisons the composed variant instead of
      // vanishing from it. That is what keeps a refuted half visible rather than silently used.
      ["verified", "refuted", "refuted"],
      ["candidate", "refuted", "refuted"],
    ];
    for (const [rootStatus, feedStatus, expected] of pairs) {
      const feed = combo({
        id: "feed", status: feedStatus, produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }),
      });
      const root = combo({
        id: "root", status: rootStatus, needs: ["infinite-energy"], uses: uses({ "TST-002": 1 }),
      });
      expect(withCombo([root, feed], "root")[0]!.status, `${rootStatus} + ${feedStatus}`).toBe(expected);
    }
  });

  it("never makes a refuted combo the head of a variant", () => {
    const dead = combo({ id: "dead", status: "refuted", produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }) });
    const root = combo({ id: "root", needs: ["infinite-energy"], uses: uses({ "TST-002": 1 }) });
    expect(variantsOf([dead, root]).map((v) => v.id)).toEqual(["root+dead"]);
  });
});

describe("generateVariants — the shape of the output", () => {
  it("unions the domains of every card in the merged multiset", () => {
    // TST-011 is Mind/Order and TST-010 is Order: the shared domain is counted once.
    const feed = combo({ id: "feed", produces: ["infinite-energy"], uses: uses({ "TST-010": 1 }) });
    const root = combo({ id: "root", needs: ["infinite-energy"], uses: uses({ "TST-011": 1 }) });
    expect(withCombo([root, feed], "root")[0]!.domains.sort()).toEqual(["mind", "order"]);
  });

  it("emits one variant per distinct card multiset and payoff, not one per combo", () => {
    const a = combo({ id: "a", produces: ["infinite-energy"], uses: uses({ "TST-001": 2 }) });
    const twin = combo({ id: "twin", produces: ["infinite-energy"], uses: uses({ "TST-001": 2 }) });
    expect(variantsOf([a, twin]).map((v) => v.id)).toEqual(["a"]);
  });

  it("keeps two variants apart when they differ only in what they produce", () => {
    const a = combo({ id: "a", produces: ["infinite-energy"], uses: uses({ "TST-001": 2 }) });
    const b = combo({ id: "b", produces: ["infinite-power"], uses: uses({ "TST-001": 2 }) });
    expect(variantsOf([a, b]).map((v) => v.id)).toEqual(["a", "b"]);
  });

  it("intersects the legend restrictions of the two halves", () => {
    const feed = combo({
      id: "feed", produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }), legends: ["OGN-001", "OGN-002"],
    });
    const root = combo({
      id: "root", needs: ["infinite-energy"], uses: uses({ "TST-002": 1 }), legends: ["OGN-002", "OGN-003"],
    });
    expect(withCombo([root, feed], "root")[0]!.legends).toEqual(["OGN-002"]);
  });

  it("inherits the one restriction when only one half names legends", () => {
    const feed = combo({ id: "feed", produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }) });
    const root = combo({
      id: "root", needs: ["infinite-energy"], uses: uses({ "TST-002": 1 }), legends: ["OGN-003"],
    });
    expect(withCombo([root, feed], "root")[0]!.legends).toEqual(["OGN-003"]);
    const feedOnly = combo({
      id: "feed", produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }), legends: ["OGN-003"],
    });
    const plain = combo({ id: "root", needs: ["infinite-energy"], uses: uses({ "TST-002": 1 }) });
    expect(withCombo([plain, feedOnly], "root")[0]!.legends).toEqual(["OGN-003"]);
  });

  it("generates nothing when the two halves need different legends", () => {
    // Domain Identity aside, a deck has exactly one legend: halves that disagree cannot both run.
    const feed = combo({
      id: "feed", produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }), legends: ["OGN-001"],
    });
    const root = combo({
      id: "root", needs: ["infinite-energy"], uses: uses({ "TST-002": 1 }), legends: ["OGN-002"],
    });
    expect(withCombo([root, feed], "root")).toEqual([]);
  });
});

describe("generateVariants — Domain Identity, 103.1.b (#64)", () => {
  // A legend has exactly two domains and 103.1.b.4 only lets a card into an identity that holds
  // all of its own, so a card pool spanning three domains is one no deck can assemble. The
  // generator used to build those anyway and matchDeck threw them out one by one.
  const payoff = combo({ id: "payoff", needs: ["infinite-energy"], uses: uses({ "TST-010": 1 }) });

  it("composes two halves whose domains together fit inside one identity", () => {
    const feed = combo({ id: "feed", produces: ["infinite-energy"], uses: uses({ "TST-011": 1 }) });
    const [v] = withCombo([payoff, feed], "payoff");
    expect(v!.id).toBe("payoff+feed");
    expect(v!.domains.sort()).toEqual(["mind", "order"]);
  });

  it("generates nothing when the two halves together span three domains", () => {
    const feed = combo({
      id: "feed", produces: ["infinite-energy"], uses: uses({ "TST-001": 1, "TST-011": 1 }),
    });
    expect(withCombo([payoff, feed], "payoff")).toEqual([]);
  });

  it("drops an authored entry that spans three domains on its own", () => {
    const wide = combo({ id: "wide", produces: ["infinite-energy"], uses: uses({ "TST-001": 1, "TST-011": 1 }) });
    expect(variantsOf([wide])).toEqual([]);
  });

  it("prunes only the composition that overflows, keeping its siblings in order", () => {
    const fits = combo({ id: "fits", produces: ["infinite-energy"], uses: uses({ "TST-011": 1 }) });
    const also = combo({ id: "also", produces: ["infinite-energy"], uses: uses({ "TST-001": 1 }) });
    const over = combo({
      id: "over", produces: ["infinite-energy"], uses: uses({ "TST-001": 1, "TST-011": 1 }),
    });
    expect(withCombo([payoff, fits, also, over], "payoff").map((v) => v.id))
      .toEqual(["payoff+fits", "payoff+also"]);
  });

  it("prunes a branch as soon as it overflows, leaving the tail that still fits", () => {
    // root needs a, a needs b. root+a+b is three domains, so nothing headed by root survives —
    // but a+b is two and is still generated on its own.
    const root = combo({ id: "root", needs: ["infinite-energy"], uses: uses({ "TST-001": 1 }) });
    const a = combo({
      id: "a", needs: ["infinite-power"], produces: ["infinite-energy"], uses: uses({ "TST-010": 1 }),
    });
    const b = combo({ id: "b", produces: ["infinite-power"], uses: uses({ "TST-011": 1 }) });
    const all = variantsOf([root, a, b]);
    expect(all.map((v) => v.id)).toEqual(["a+b", "b"]);
    expect(all[0]!.cards).toEqual({ "TST-010": 1, "TST-011": 1 });
  });
});

describe("a cited walk is a link a reader can open (#55)", () => {
  it("turns the repo path inside a source title into a GitHub url", () => {
    expect(sourceHref({ title: "Phase 0 hunt, entry A-01 (docs/phase0/hunt.md)" }))
      .toBe("https://github.com/GermanAbuArab/RiftCombo/blob/master/docs/phase0/hunt.md");
  });

  it("stops the path at the file, not at the note after it", () => {
    expect(sourceHref({ title: "Hand walk against Core Rules 2026-07-16 (docs/phase0-findings.md Result 5)" }))
      .toBe("https://github.com/GermanAbuArab/RiftCombo/blob/master/docs/phase0-findings.md");
  });

  it("leaves an external url alone and gives nothing for a title with no file", () => {
    expect(sourceHref({ title: "TCGplayer article", url: "https://www.tcgplayer.com/content/article/x/" }))
      .toBe("https://www.tcgplayer.com/content/article/x/");
    expect(sourceHref({ title: "Equipment lens hunt, issue #41 candidate 1 (rc-huntE)" })).toBeNull();
  });
});

/**
 * Every source in the catalogue, against the declared vocabulary. `Source["kind"]` is a compile-time
 * union over data that is never written in TypeScript — the entries are authored in
 * `data/combos.json` and arrive through a JSON import — so nothing was checking it: `video` was used
 * 54 times by the deck-tech walks of #46 and #62 while the union still listed five kinds. This is the
 * check that was missing, and it runs over the real catalogue rather than a fixture, because that is
 * where an undeclared kind can actually appear.
 */
describe("the source vocabulary covers what the catalogue actually uses", () => {
  const { combos } = loadCombos();
  const sources = combos.flatMap((c) => c.sources ?? []);

  it("declares every kind in use, so a new one cannot ride along unannounced", () => {
    const used = [...new Set(sources.map((s) => s.kind as string))].sort();
    const undeclared = used.filter((k) => !(SOURCE_KINDS as readonly string[]).includes(k));
    expect(undeclared).toEqual([]);
  });

  it("reads a real catalogue, so the check above cannot pass by finding nothing", () => {
    expect(sources.length).toBeGreaterThan(100);
    expect(new Set(sources.map((s) => s.kind)).size).toBeGreaterThan(1);
  });
});

/**
 * #157, 2026-09-09. Two guards on the outcome vocabulary, both measured before being written.
 *
 * The first is a real bug shape rather than a style rule: `expand()` in `src/combos.ts` starts
 * `partials` at `[self]` and short-circuits the needs loop on `p.produces.has(need)`, so an entry
 * that both NEEDS and PRODUCES the same feature satisfies its own need and emits a variant with no
 * feeder at all — publishing an incomplete line as complete. Zero entries have that overlap today;
 * this keeps it that way, and it matters most for the four entries that need `token-body-engine` or
 * `conquer-engine` and plainly make bodies or Conquers of their own.
 *
 * The second pins three of the five values added with this issue as OUTPUT ONLY. CLAUDE.md records
 * why in its own words: Brynhir's lockout window is its own entry and not a `uses[]` of the loop it
 * protects, because "adding it would force the matcher to require it". A `needs: board-protection`
 * or `needs: tempo-denial` does exactly that to every deck running the protected line.
 */
describe("the outcome vocabulary cannot publish an incomplete line as complete", () => {
  const { combos } = loadCombos();

  it("never lets an entry satisfy its own need", () => {
    const bad = combos
      .filter((c: Combo) => c.needs.some((n: string) => c.produces.includes(n)))
      .map((c: Combo) => `${c.id}: needs and produces ${c.needs.filter((n: string) => c.produces.includes(n)).join(", ")}`);
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("never consumes a feature that only exists to be shown", () => {
    const OUTPUT_ONLY = ["board-protection", "tempo-denial", "combat-might", "unit-delivery"];
    const bad = combos
      .filter((c: Combo) => c.needs.some((n: string) => OUTPUT_ONLY.includes(n)))
      .map((c: Combo) => `${c.id}: needs ${c.needs.filter((n: string) => OUTPUT_ONLY.includes(n)).join(", ")}`);
    expect(bad, bad.join("\n")).toEqual([]);
  });
});
