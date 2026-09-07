import { describe, expect, it } from "vitest";
import { loadCardIndex, loadCombos } from "../src/load.js";
import { poolOf } from "../src/builder.js";
import { championTagOf } from "../src/build.js";
import type { Domain } from "../src/types.js";

/**
 * #166: three of the four defects a cross-audit found in one night were legend-list arithmetic in
 * `prerequisites.easy` — an entry naming three Mind/Chaos legends as able to run an Order card, an
 * undercount, a name-versus-base-code slip. The combo ledgers all held; the prose about which legend
 * can hold the deck did not. That prose is mechanically checkable: every legend base code an entry
 * names in `prerequisites.easy` must carry every domain the entry's own cards indicate (103.1.b —
 * a card is legal only inside an identity that contains all of its domains).
 */
const cards = loadCardIndex();
const { combos } = loadCombos();
const CODE = /\b([A-Z]{3}-(?:\d{3}|SP\d|R0\d|T0\d))\b/g;
const legendBases = new Set(poolOf(cards).filter((c) => c.type.includes("legend")).map((c) => c.base));

describe("the legends an entry names can actually hold its cards (103.1.b)", () => {
  it("names no legend whose two domains miss a domain the entry's cards indicate", () => {
    const bad: string[] = [];
    let checked = 0;
    for (const combo of combos) {
      const need = new Set<Domain>();
      for (const u of combo.uses) for (const d of cards.domainsOf(u.card)) need.add(d);
      for (const line of combo.prerequisites.easy) {
        for (const m of line.matchAll(CODE)) {
          const base = m[1]!;
          if (!legendBases.has(base)) continue;
          checked++;
          const has = new Set(cards.domainsOf(base));
          const missing = [...need].filter((d) => !has.has(d));
          if (missing.length) bad.push(`${combo.id}: ${base} (${[...has].join("/")}) cannot hold ${missing.join("/")}`);
        }
      }
    }
    expect(checked, "no legend base code found in any prerequisites.easy line — the regex or the field changed").toBeGreaterThan(50);
    expect(bad, bad.join("\n")).toEqual([]);
  });

  /**
   * #167: a Signature card in `uses[]` turns the legend line into a ONE-LEGEND field. 103.2.d.2 makes
   * every Signature card carry the legend's champion tag, so a domain-correct list of legends can
   * still be mostly illegal — an entry named four Mind/Chaos legends for three Moonfall (Diana), of
   * which one was legal; another said "a Calm/Order legend" for Daisy! (Ivern), admitting six of eight.
   */
  it("names no legend that lacks the champion tag of a Signature card the entry uses (103.2.d.2)", () => {
    const bad: string[] = [];
    let checked = 0;
    for (const combo of combos) {
      const tags = new Set<string>();
      for (const u of combo.uses) {
        const card = cards.get(u.card);
        if (!card?.signature) continue;
        const tag = championTagOf(u.card, cards);
        if (tag) tags.add(tag);
      }
      if (!tags.size) continue;
      for (const line of combo.prerequisites.easy) {
        for (const m of line.matchAll(CODE)) {
          const base = m[1]!;
          if (!legendBases.has(base)) continue;
          checked++;
          const legendTag = championTagOf(base, cards);
          for (const tag of tags) if (legendTag !== tag) bad.push(`${combo.id}: ${base} is not a ${tag} legend, and the entry uses a ${tag} Signature card`);
        }
      }
    }
    expect(checked, "no entry with a Signature card names a legend base code in prerequisites.easy").toBeGreaterThan(0);
    expect(bad, bad.join("\n")).toEqual([]);
  });
});
