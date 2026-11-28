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
          if (missing.length) {
            // The commonest cause is not a wrong legend: it is the legality sentence. A walk that
            // writes "OGS-019 is restricted in 2v2" into prerequisites.easy has written a legend base
            // code into a field this check reads as "legends named FOR this entry", and the entry then
            // fails a domain test it never meant to take. It bit four times in one batch on 2026-09-12,
            // and the two standing rules genuinely pull against each other, so the hint goes here where
            // the failure is read rather than in a document nobody opens at that moment.
            const hint =
              base === "OGS-019"
                ? " — this looks like the LEGALITY sentence, not a legend line: describe the restricted row WITHOUT its base code unless that legend is genuinely legal for the entry"
                : "";
            bad.push(`${combo.id}: ${base} (${[...has].join("/")}) cannot hold ${missing.join("/")}${hint}`);
          }
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

  /**
   * #187 batch 11, 2026-09-07: a walk caught itself naming the Body/Chaos legends as "OGN-259 /
   * OGN-305 Grinning Fisherman and UNL-201 / UNL-238 Voidreaver" — typed from memory, with two of
   * three names and three of four base codes wrong. Neither check above can see that: an
   * invented-but-existing base code of the right domain pair passes the first by construction, and
   * the second only fires on Signature cards. What IS checkable is the pairing itself — this
   * catalogue writes a legend as `CODE Name` or `Name (CODE)`, so whenever a base code sits
   * immediately beside a legend name, they must be the same legend. Measured 2026-09-07: 2,515 such
   * pairs across the catalogue, all correct.
   */
  it("never writes a legend base code beside the name of a different legend", () => {
    const legends = poolOf(cards).filter((c) => c.type.includes("legend"));
    const nameOf = new Map(legends.map((c) => [c.base, c.name]));
    const basesByName = new Map<string, Set<string>>();
    for (const c of legends) {
      const set = basesByName.get(c.name) ?? new Set<string>();
      for (const e of cards.equivalents(c.base)) set.add(e);
      set.add(c.base);
      basesByName.set(c.name, set);
    }
    const CODES = "[A-Z]{3}-(?:\\d{3}|SP\\d|R0\\d|T0\\d)";
    const NAME = "[A-Z][A-Za-z'\u2019-]*(?:[ -][A-Za-z'\u2019][A-Za-z'\u2019-]*){0,4}";
    const codeThenName = new RegExp(`((?:${CODES})(?:\\s*/\\s*(?:${CODES}))*)\\s+(${NAME})`, "g");
    const nameThenCode = new RegExp(`(${NAME})\\s*\\(((?:${CODES})(?:\\s*/\\s*(?:${CODES}))*)\\)`, "g");
    const known = new Set(basesByName.keys());
    const resolve = (raw: string): string | null => {
      let s = raw.trim().replace(/[,.;:]$/, "");
      while (s) {
        if (known.has(s)) return s;
        if (known.has(`${s} - Starter`)) return `${s} - Starter`;
        const i = s.lastIndexOf(" ");
        if (i < 0) return null;
        s = s.slice(0, i);
      }
      return null;
    };
    const bad: string[] = [];
    let checked = 0;
    const check = (id: string, name: string | null, codes: string) => {
      if (!name) return;
      for (const code of codes.match(new RegExp(CODES, "g")) ?? []) {
        if (!nameOf.has(code)) continue;
        checked++;
        if (!basesByName.get(name)!.has(code)) bad.push(`${id}: "${name}" is written beside ${code}, which is ${nameOf.get(code)}`);
      }
    };
    for (const combo of combos) {
      for (const line of combo.prerequisites.easy) {
        for (const m of line.matchAll(codeThenName)) check(combo.id, resolve(m[2]!), m[1]!);
        for (const m of line.matchAll(nameThenCode)) check(combo.id, resolve(m[1]!), m[2]!);
      }
    }
    expect(checked, "no legend name sits beside a base code — the writing convention or the regex changed").toBeGreaterThan(500);
    expect(bad, bad.join("\n")).toEqual([]);
  });
});

/**
 * #193 batch 3, 2026-09-09: the second time the #165 shape shipped. `UNL-177 Ivern, Friend to All`
 * gains EXACTLY ONE tag as he is played and then scores "if your units have all of the following
 * tags among them — Bird, Cat, Dog, and Poro", which 383.2.a.1 makes part of the TRIGGER CONDITION.
 * So N Iverns supply N of the four and the rest must come from other bodies — and two entries named
 * that body in prose while leaving it out of `uses[]`, so `matchDeck` reported a complete 10-point
 * BURST for a board on which every Ivern trigger fails its condition. Measured 2026-09-09: 67
 * printings carry at least one of the four tags and ZERO carry two, so there is no two-for-one.
 * `uses[]` is what the matcher and the planner price; this pins that it can satisfy the condition
 * on its own.
 */
describe("a tag condition a Trigger Condition requires is satisfiable from uses[] alone", () => {
  it("gives every Ivern, Friend to All entry all four of Bird, Cat, Dog and Poro", () => {
    const FOUR = ["Bird", "Cat", "Dog", "Poro"];
    const bad: string[] = [];
    let checked = 0;
    for (const combo of combos) {
      const ivern = combo.uses.find((u) => u.card === "UNL-177");
      if (!ivern) continue;
      checked++;
      // Ivern chooses one tag per copy; every other body brings whatever it prints.
      const fromOthers = new Set<string>();
      for (const u of combo.uses) {
        if (u.card === "UNL-177") continue;
        for (const t of cards.get(u.card)?.tags ?? []) if (FOUR.includes(t)) fromOthers.add(t);
      }
      if (ivern.quantity + fromOthers.size < FOUR.length) {
        bad.push(`${combo.id}: ${ivern.quantity} Ivern + [${[...fromOthers].join(",")}] = ${ivern.quantity + fromOthers.size} of 4 tags`);
      }
    }
    expect(checked, "no entry uses UNL-177 — the card or the field changed").toBeGreaterThan(0);
    expect(bad, bad.join("\n")).toEqual([]);
  });
});
