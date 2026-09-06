import { describe, expect, it } from "vitest";
import { baseOf, normalizeName, readableCardText } from "../src/cards.js";
import { loadCardIndex } from "../src/load.js";

const cards = loadCardIndex();

describe("card index", () => {
  it("loads every printing and prefers base printings for base lookups", () => {
    expect(cards.cards.length).toBeGreaterThan(1100);
    expect(cards.get("UNL-079")!.text).toContain("(To Predict"); // base keeps reminder text
    expect(cards.get("UNL-079a")!.variant).toBe("a");
  });

  it("carries Equipment effect text (the field RiftScribe drops)", () => {
    const eye = cards.get("SFD-153")!;
    expect(eye.name).toBe("Eye of the Herald");
    expect(eye.effect).toBe("When I move, play a 1 :rb_might: Recruit unit token here.");
  });

  it("applies Riot's Vendetta errata", () => {
    expect(cards.get("SFD-020")!.text).toContain("pay :rb_rune_fury: to give me +2");
    expect(cards.get("SFD-020")!.errata?.[0]?.effective).toBe("2026-07-23");
  });

  it("knows the Rules Hub ban list per format and entity", () => {
    expect(cards.legality("OGN-177", "constructed")?.status).toBe("banned");
    expect(cards.legality("OGN-177", "2v2")?.status).toBe("banned");
    expect(cards.legality("OGS-019", "2v2")?.status).toBe("restricted");
    expect(cards.legality("OGS-019", "constructed")).toBeUndefined();
    expect(cards.legality("OGN-212", "constructed")).toBeUndefined();
  });

  it("every legend has exactly two domains", () => {
    const legends = cards.cards.filter((c) => c.type.includes("legend"));
    expect(legends.length).toBeGreaterThan(90);
    for (const l of legends) expect(l.domains.length).toBe(2);
  });

  it("resolves codes in every dialect and names in every dialect", () => {
    expect(baseOf("UNL-079a")).toBe("UNL-079");
    expect(baseOf("SFD-227*")).toBe("SFD-227");
    expect(cards.resolveCode("OGN-212/298")).toBe("OGN-212");
    expect(cards.resolveCode("ogn-212")).toBe("OGN-212");
    expect(cards.resolveCode("SFD-R03")).toBe("OGN-089"); // Piltover rune alias
    expect(cards.resolveCode("XXX-999")).toBeNull();
    expect(normalizeName("Ekko - Recurrent")).toBe(normalizeName("Ekko, Recurrent"));
    expect(cards.resolveName("Ekko - Recurrent")).toBe("OGN-110");
    expect(cards.resolveName("Lady of Luminosity")).toBe("OGS-021");
    expect(cards.resolveName("The Arena’s Greatest")).toBe("OGN-290");
    expect(cards.resolveName("Nope Not A Card")).toBeNull();
  });

  it("resolves legends written as \"Champion, Epithet\", which is how Riot's own errata writes them", () => {
    // Every one of the 94 legends is a bare epithet in the gallery, but players and Riot's errata
    // pages prefix the champion. Without the fallback a pasted list loses its legend, and with it
    // the domain pair that gates every match.
    expect(cards.resolveName("Deceiver")).toBe("UNL-199");
    expect(cards.resolveName("LeBlanc, Deceiver")).toBe("UNL-199");
    expect(cards.resolveName("Ahri, Nine-Tailed Fox")).toBe("OGN-255");
    expect(cards.resolveName("Ornn, Fire Below the Mountain")).toBe("SFD-189");
    // A real comma in a card's own name still wins outright.
    expect(cards.resolveName("Jhin, Murderous Artist")).toBe("UNL-022");
    expect(cards.resolveName("Lux, Crownguard")).toBe("OGS-014");
    // The fallback only rescues; it never invents a match.
    expect(cards.resolveName("Garen, Not A Real Epithet")).toBeNull();
    // Riot writes the starter suffix with a comma on its errata pages and a dash in the gallery.
    expect(cards.resolveName("Dark Child, Starter")).toBe("OGS-017");
    expect(cards.resolveName("Dark Child - Starter")).toBe("OGS-017");
  });

  it("groups printings of one card that sit under different collector numbers", () => {
    expect(cards.equivalents("UNL-191")).toContain("UNL-231"); // Wuju Master, promo printing
    expect(cards.equivalents("OGN-066")).toEqual(["OGN-066"]); // Ahri, Alluring: alt-art shares the base
    expect(cards.get("OGN-293")!.domains).toEqual([]); // The Grand Plaza is domainless, not "colorless"
  });
});

describe("readableCardText", () => {
  it("joins adjacent symbols instead of gluing the words together", () => {
    // UNL-029 Red Brambleback, the card the bug was reported from. It used to render
    // "1 EnergyFury Rune".
    expect(readableCardText(cards.get("UNL-029")!.text!)).toContain(
      "You may pay 1 Energy + 1 Fury Power as an additional cost",
    );
  });

  it("collapses a repeated domain symbol into a count", () => {
    // SFD-088 Renata Glasc, Mastermind: four Mind symbols, once rendered as four clauses.
    expect(readableCardText(cards.get("SFD-088")!.text!)).toContain("4 Energy + 4 Mind Power, Exhaust:");
  });

  it("calls a domain symbol Power, not a Rune", () => {
    // 135.2.e.4/e.5: the symbol is Power of a domain. A Rune is a card on the board, and
    // recycling one for Power sends it to the Rune Deck (161.2.b) — a different cost entirely.
    expect(readableCardText(":rb_rune_fury:")).toBe("1 Fury Power");
    expect(readableCardText(":rb_rune_rainbow:")).toBe("1 Power of any domain");
    expect(readableCardText(":rb_rune_rainbow::rb_rune_rainbow:")).toBe("2 Power of any domain");
  });

  it("leaves the non-cost symbols alone", () => {
    expect(readableCardText("+2 :rb_might: this turn")).toBe("+2 Might this turn");
    // The corpus writes an exhaust cost as `:rb_exhaust::`, so the trailing colon must survive.
    expect(readableCardText(":rb_exhaust:: Deal 2")).toBe("Exhaust: Deal 2");
  });

  it("spells out every symbol on every printing", () => {
    for (const c of cards.cards) {
      for (const field of [c.text, c.effect]) {
        if (!field) continue;
        const out = readableCardText(field);
        expect(out).not.toMatch(/:rb_/);
        expect(out).not.toMatch(/(Energy|Power|Might|Exhaust)[A-Z]/); // the glue bug
      }
    }
  });
});
