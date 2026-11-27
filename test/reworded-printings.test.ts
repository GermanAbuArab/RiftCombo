import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Riot re-worded old printings in the live gallery with no errata page (#663, read from the gallery
 * 2026-11-27). Every catalogue quote of the old wording was re-pasted to the current text; the walk
 * and play documents keep their dated words with a dated note, so they are where an author could copy
 * the retired wording back from. This pins the catalogue against that.
 *
 * `old` is the retired span and `now` the span that replaced it, whitespace collapsed, as quotes
 * flatten the card's line breaks. A retired span that a current card still prints is banned in every
 * string of an entry that uses `code` and none of those cards, and elsewhere only in strings tied to
 * `code` (a `uses` row of that card, or a string naming its code or its name): `OGN-305` Unforgiven,
 * the showcase printing, still reads "to or from its base" (docs/data-anomalies.md).
 */
const REWORDED = [
  {
    code: "OGN-002",
    old: "discard 1 as an additional cost. If you do",
    now: "discard a card as an additional cost. If you do",
  },
  { code: "OGN-123", old: "deal 12 to ALL units", now: "deal 12 to all units" },
  { code: "OGN-158", old: "(Bases are not battlefield.)", now: "(Bases are not battlefields.)" },
  { code: "OGN-259", old: "to or from its base", now: "Move a friendly unit to or from your base" },
  { code: "OGN-264", old: "You can hide cards ignoring costs", now: "You can hide ignoring costs" },
  {
    code: "OGS-001",
    old: "Your spells and abilities deal 1 Bonus Damage. (Each instance of damage the spell deals",
    now: "Your spells and abilities deal 1 Bonus Damage. (Each instance of damage they deal",
  },
  { code: "SFD-145", old: "Swap the Might of two units", now: "Swap the Mights of two units" },
  { code: "SFD-217", old: "you or allies control..", now: "you or allies control." },
  {
    code: "UNL-044",
    old: "[Reaction] Choose one — • Counter a spell.",
    now: "[Reaction] (Play any time, even before spells and abilities resolve.) Choose one — • Counter a spell.",
  },
  { code: "UNL-160", old: "Play two :rb_energy_1: :rb_might: Bird", now: "Play two 1 :rb_might: Bird" },
];

type Card = { code: string; name: string; text: string | null };
const cards: Card[] = JSON.parse(readFileSync("data/cards.json", "utf8")).cards;
const flat = (s: string) => s.replace(/\s+/g, " ");
const printed = cards.map((c) => flat(c.text ?? ""));

type Use = { card: string; note?: string };
type Entry = { id: string; uses?: Use[] };
const catalogue: { file: string; entries: Entry[] }[] = [
  { file: "data/combos.json", entries: JSON.parse(readFileSync("data/combos.json", "utf8")).combos },
  { file: "data/synergies.json", entries: JSON.parse(readFileSync("data/synergies.json", "utf8")).synergies },
];

const strings = (v: unknown, out: string[] = []): string[] => {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => strings(x, out));
  return out;
};

describe("printings Riot re-worded without an errata page (#663)", () => {
  it("each card prints the new span and not the old one", () => {
    for (const r of REWORDED) {
      const text = flat(cards.find((c) => c.code === r.code)?.text ?? "");
      expect(text, r.code).toContain(r.now);
      expect(text, r.code).not.toContain(r.old);
    }
  });

  it("the catalogue quotes none of the retired spans", () => {
    const hits: string[] = [];
    for (const { file, entries } of catalogue) {
      for (const e of entries) {
        for (const r of REWORDED) {
          const elsewhere = cards.filter((c, i) => printed[i].includes(r.old)).map((c) => c.code);
          const used = (e.uses ?? []).map((u) => u.card);
          const name = cards.find((c) => c.code === r.code)!.name;
          const tied =
            elsewhere.length === 0 || (used.includes(r.code) && !used.some((c) => elsewhere.includes(c)))
              ? strings(e)
              : [
                  ...(e.uses ?? []).filter((u) => u.card === r.code).map((u) => u.note ?? ""),
                  ...strings(e).filter((s) => s.includes(r.code) || s.includes(name)),
                ];
          if (tied.some((s) => flat(s).includes(r.old))) hits.push(`${file} ${e.id}: ${r.code}`);
        }
      }
    }
    expect(hits).toEqual([]);
  });
});
