import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadCardIndex } from "../src/load.js";
import { checkSave, fromRow, MAX_NAME, normalizeName, savedSummary, sortSaved, suggestName, type SavedDeck } from "../src/saved.js";

const cards = loadCardIndex();
const fixture = (n: string) => readFileSync(new URL(`./fixtures/${n}`, import.meta.url), "utf8");

const saved = (over: Partial<SavedDeck> = {}): SavedDeck => ({
  id: "a", name: "Lux ramp", deckText: "1 Lux, Illuminated", format: "constructed",
  createdAt: "2026-09-01T00:00:00Z", updatedAt: "2026-09-01T00:00:00Z", ...over,
});

describe("saved deck names", () => {
  it("trims and collapses whitespace and caps at the column length", () => {
    expect(normalizeName("  Lux   ramp \n")).toBe("Lux ramp");
    expect(normalizeName("x".repeat(200))).toHaveLength(MAX_NAME);
  });

  it("refuses an empty name and an empty list", () => {
    expect(checkSave("  ", "1 Lux, Illuminated", [])).toEqual({ ok: false, message: "Give the deck a name first." });
    expect(checkSave("Lux ramp", "   ", [])).toEqual({ ok: false, message: "Paste a deck list before saving it." });
  });

  it("refuses a name the player already used, whatever the case", () => {
    const check = checkSave("LUX RAMP", "1 Lux, Illuminated", [saved()]);
    expect(check.ok).toBe(false);
    // The unique index on (user_id, lower(name)) enforces the same rule in the database.
    expect(check.ok === false && check.message).toContain("Lux ramp");
  });

  it("lets a deck keep its own name when it is the one being saved over", () => {
    expect(checkSave("Lux ramp", "1 Lux, Illuminated", [saved()], "a")).toEqual({ ok: true, name: "Lux ramp" });
  });
});

describe("saved deck rows", () => {
  it("maps the snake_case row and keeps an unknown format out of the app", () => {
    const row = fromRow({ id: "1", name: "n", deck_text: "t", format: "pauper", created_at: "c", updated_at: "u" });
    expect(row).toEqual({ id: "1", name: "n", deckText: "t", format: "constructed", createdAt: "c", updatedAt: "u" });
    expect(fromRow({ id: "1", name: "n", deck_text: "t", format: "2v2", created_at: "c", updated_at: "u" }).format).toBe("2v2");
  });

  it("lists the most recently edited first", () => {
    const rows = [
      saved({ id: "old", name: "Old", updatedAt: "2026-09-01T00:00:00Z" }),
      saved({ id: "new", name: "New", updatedAt: "2026-09-04T00:00:00Z" }),
    ];
    expect(sortSaved(rows).map((d) => d.id)).toEqual(["new", "old"]);
  });
});

describe("saved deck summaries", () => {
  it("counts the stored text against the current card index rather than a stored result", () => {
    expect(savedSummary(fixture("lux.txt"), cards)).toBe("40 cards · Lady of Luminosity");
  });

  it("names a new deck after its legend and numbers the ones that clash", () => {
    expect(suggestName(fixture("lux.txt"), cards, [])).toBe("Lady of Luminosity");
    const taken = [saved({ name: "Lady of Luminosity" }), saved({ id: "b", name: "lady of luminosity 2" })];
    expect(suggestName(fixture("lux.txt"), cards, taken)).toBe("Lady of Luminosity 3");
  });

  it("falls back to a neutral name when the list has no legend", () => {
    expect(suggestName("3 Sacrifice", cards, [])).toBe("My deck");
  });
});
