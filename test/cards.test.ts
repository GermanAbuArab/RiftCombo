import { describe, expect, it } from "vitest";
import { CardIndex, baseOf, normalizeName } from "../src/cards.js";

const cards = CardIndex.load();

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

  it("groups printings of one card that sit under different collector numbers", () => {
    expect(cards.equivalents("UNL-191")).toContain("UNL-231"); // Wuju Master, promo printing
    expect(cards.equivalents("OGN-066")).toEqual(["OGN-066"]); // Ahri, Alluring: alt-art shares the base
    expect(cards.get("OGN-293")!.domains).toEqual([]); // The Grand Plaza is domainless, not "colorless"
  });
});
