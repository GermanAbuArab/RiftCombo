import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
// scripts/build-cards.mjs is plain JS with no declaration file, and the project's tsconfig does
// not enable allowJs (it would pull the whole scripts/ directory into typecheck). applyErrata's
// signature is (cards: Record<string, unknown>[], errata: Record<string, unknown>[]) => void.
// @ts-expect-error — untyped .mjs import, see above
import { applyErrata } from "../scripts/build-cards.mjs";

// Fixture cards deliberately shaped like the real overlay's targets: two printings sharing one
// name, one still carrying the old text and one already reprinted with the new text. Issue #136:
// the build used to infer "already reprinted" from content alone (find absent, replace present),
// which could let a mistyped find-string hide behind a coincidental match. The fix scopes the skip
// to printings named in the entry's own `alreadyReprinted` list, and still requires the replace-text
// to be present on them.

function card(code: string, name: string, text: string) {
  return { code, base: code, variant: "", name, text };
}

describe("applyErrata / alreadyReprinted (#136)", () => {
  it("skips exactly the printing named in alreadyReprinted, and still replaces the others", () => {
    const cards = [card("X-001", "Test Card", "has OLD text here"), card("X-002", "Test Card", "has NEW text here")];
    const entry = {
      name: "Test Card",
      effective: "2026-01-01",
      source: "https://example.com",
      find: "OLD",
      replace: "NEW",
      alreadyReprinted: ["X-002"],
    };
    applyErrata(cards, [entry]);
    expect(cards[0]!.text).toBe("has NEW text here");
    expect((cards[0] as any).errata?.[0]?.effective).toBe("2026-01-01");
    expect(cards[1]!.text).toBe("has NEW text here"); // unchanged
    expect((cards[1] as any).errata).toBeUndefined(); // never marked erratad — it always had the new text
  });

  it("fails an unlisted printing that already has the new text, instead of inferring a skip", () => {
    const cards = [card("Y-001", "Other Card", "has NEW text already, no trace of the old one")];
    const entry = {
      name: "Other Card",
      effective: "2026-01-01",
      source: "https://example.com",
      find: "OLD",
      replace: "NEW",
      // no alreadyReprinted
    };
    expect(() => applyErrata(cards, [entry])).toThrow(/expected exactly 1 match/);
  });

  it("fails a find-string that matches twice", () => {
    const cards = [card("Z-001", "Twice Card", "OLD stuff and OLD stuff again")];
    const entry = {
      name: "Twice Card",
      effective: "2026-01-01",
      source: "https://example.com",
      find: "OLD",
      replace: "NEW",
    };
    expect(() => applyErrata(cards, [entry])).toThrow(/expected exactly 1 match/);
  });

  it("fails a printing listed in alreadyReprinted whose text does not actually contain the replace-string, naming the printing", () => {
    const cards = [
      card("W-001", "Named Card", "has OLD text here"),
      card("W-002", "Named Card", "completely unrelated text"),
    ];
    const entry = {
      name: "Named Card",
      effective: "2026-01-01",
      source: "https://example.com",
      find: "OLD",
      replace: "NEW",
      alreadyReprinted: ["W-002"],
    };
    expect(() => applyErrata(cards, [entry])).toThrow(/W-002/);
  });

  it("fails when alreadyReprinted names a code that is not among the card's own printings", () => {
    const cards = [card("V-001", "Lonely Card", "has OLD text here")];
    const entry = {
      name: "Lonely Card",
      effective: "2026-01-01",
      source: "https://example.com",
      find: "OLD",
      replace: "NEW",
      alreadyReprinted: ["V-999"],
    };
    expect(() => applyErrata(cards, [entry])).toThrow(/V-999/);
  });

  it("matches the two documented real cases (Sona VEN-SP2, Void Burrower SFD-243)", () => {
    const errata = JSON.parse(readFileSync(new URL("../data/errata.json", import.meta.url), "utf8"));
    const sona = errata.entries.find((e: any) => e.name === "Sona, Harmonious");
    const burrower = errata.entries.find((e: any) => e.name === "Void Burrower");
    expect(sona.alreadyReprinted).toEqual(["VEN-SP2"]);
    expect(burrower.alreadyReprinted).toEqual(["SFD-243"]);
  });
});
