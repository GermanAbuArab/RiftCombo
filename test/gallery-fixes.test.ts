import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
// scripts/build-cards.mjs is plain JS with no declaration file; see test/errata.test.ts.
// @ts-expect-error — untyped .mjs import
import { applyGalleryFixes } from "../scripts/build-cards.mjs";

// #664: Riot's gallery ships Radiance with the wrong type, domain or tags on most of its printings
// (Bushwhack Trap RAD-108 is a Chaos gear on its printed card and a Fury unit in the gallery). The
// overlay replaces exactly the value it names, and like the errata overlay it fails the build the
// moment the gallery stops shipping that value, so a fix retires itself when Riot corrects the data.

const card = (code: string, o: { type?: string[]; domains?: string[]; tags?: string[] } = {}) => ({
  code,
  base: code.replace(/[a-z*]$/, ""),
  type: o.type ?? ["unit"],
  domains: o.domains ?? ["fury"],
  tags: o.tags ?? [],
});

const fix = (o: Record<string, unknown> = {}) => ({
  base: "TST-001",
  read: "2026-11-23",
  source: "https://example.com/TST-001.png",
  gallery: { type: ["unit"], domains: ["fury"] },
  printed: { type: ["gear"], domains: ["chaos"] },
  ...o,
});

describe("applyGalleryFixes (#664)", () => {
  it("replaces the named fields on every printing of the base and records the fix", () => {
    const cards = [card("TST-001"), card("TST-001a"), card("TST-002")];
    applyGalleryFixes(cards, [fix()]);
    for (const c of cards.slice(0, 2)) {
      expect(c.type).toEqual(["gear"]);
      expect(c.domains).toEqual(["chaos"]);
      expect((c as any).galleryFix).toEqual({ fields: ["type", "domains"], read: "2026-11-23", source: "https://example.com/TST-001.png" });
    }
    expect(cards[2]!.type).toEqual(["unit"]);
    expect((cards[2] as any).galleryFix).toBeUndefined();
  });

  it("leaves a field the entry does not name alone", () => {
    const cards = [card("TST-001", { tags: ["Yordle"] })];
    applyGalleryFixes(cards, [fix()]);
    expect(cards[0]!.tags).toEqual(["Yordle"]);
  });

  it("fails once the gallery ships the printed value, so the entry is deleted", () => {
    const cards = [card("TST-001", { type: ["gear"], domains: ["chaos"] })];
    expect(() => applyGalleryFixes(cards, [fix()])).toThrow(/now ships the printed value; delete the entry/);
  });

  it("fails when the gallery value moved to anything else", () => {
    const cards = [card("TST-001", { type: ["spell"] })];
    expect(() => applyGalleryFixes(cards, [fix()])).toThrow(/TST-001 type is \["spell"\], the entry expects \["unit"\]/);
  });

  it("fails a base with no printing", () => {
    expect(() => applyGalleryFixes([card("TST-002")], [fix()])).toThrow(/no printing of TST-001/);
  });

  it("fails a field outside type, domains and tags, so card text stays the errata overlay's", () => {
    const cards = [card("TST-001")];
    expect(() => applyGalleryFixes(cards, [fix({ gallery: { text: "a" }, printed: { text: "b" } })])).toThrow(/field text/);
  });

  it("fails an entry whose gallery and printed name different fields", () => {
    const cards = [card("TST-001")];
    expect(() => applyGalleryFixes(cards, [fix({ printed: { type: ["gear"] } })])).toThrow(/same fields/);
  });

  it("fails a base listed twice", () => {
    expect(() => applyGalleryFixes([card("TST-001")], [fix(), fix()])).toThrow(/TST-001 is listed twice/);
  });
});

describe("data/gallery-fixes.json", () => {
  const { entries } = JSON.parse(readFileSync(new URL("../data/gallery-fixes.json", import.meta.url), "utf8"));
  it("cites a Riot card image and a read date on every entry", () => {
    for (const e of entries) {
      expect(e.source, e.base).toMatch(/^https:\/\/cmsassets\.rgpub\.io\//);
      expect(e.read, e.base).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
  it("is applied to the committed pool: every fixed printing carries the printed value", () => {
    const { cards } = JSON.parse(readFileSync(new URL("../data/cards.json", import.meta.url), "utf8"));
    for (const e of entries) {
      const printings = cards.filter((c: { base: string }) => c.base === e.base);
      expect(printings.length, e.base).toBeGreaterThan(0);
      for (const c of printings) for (const [f, v] of Object.entries(e.printed)) expect(c[f], `${c.code} ${f}`).toEqual(v);
    }
  });

  it("corrects the old-set rows #692 read from the card images: VEN-058 a unit gear, Heart of the Tempest no Yordle", () => {
    const { cards } = JSON.parse(readFileSync(new URL("../data/cards.json", import.meta.url), "utf8"));
    const at = (code: string) => cards.find((c: { code: string }) => c.code === code);
    expect(at("VEN-058").type).toEqual(["unit", "gear"]);
    expect(at("VEN-058").might).toBe(2);
    for (const code of ["VEN-155", "VEN-197", "VEN-197*"]) expect(at(code).tags, code).toEqual(["Kennen"]);
  });
});
