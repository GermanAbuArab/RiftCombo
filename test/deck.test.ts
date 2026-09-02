import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getCodeFromDeck } from "@piltoverarchive/riftbound-deck-codes";
import { loadCardIndex } from "../src/load.js";
import { decodeDeckCode, isDeckCode, loadDeck, normalizeDeck, parseDeckText } from "../src/deck.js";

const cards = loadCardIndex();
const fixture = (n: string) => readFileSync(new URL(`./fixtures/${n}`, import.meta.url), "utf8");

describe("plaintext decklists", () => {
  it("parses the article-style Lux list with section headers and 'Name - Title' dialect", () => {
    const deck = loadDeck(fixture("lux.txt"), cards);
    expect(deck.unresolved).toEqual([]);
    expect(deck.legend).toBe("OGS-021");
    expect(deck.champion).toBe("OGS-006");
    expect(Object.values(deck.main).reduce((a, b) => a + b, 0)).toBe(40);
    expect(Object.values(deck.runes).reduce((a, b) => a + b, 0)).toBe(12);
    expect(Object.keys(deck.battlefields)).toHaveLength(3);
    expect(deck.main["OGN-110"]).toBe(3); // Ekko - Recurrent
    expect(deck.main["UNL-173"]).toBe(3); // Sacrifice
  });

  it("parses strikethrough headers, 'Nx' counts and 'Rune Pool' alias", () => {
    const deck = loadDeck(fixture("fury.txt"), cards);
    expect(deck.unresolved).toEqual([]);
    expect(deck.legend).toBe("OGN-249");
    expect(deck.runes["OGN-007"]).toBe(12);
    expect(deck.main["UNL-029"]).toBe(2);
    expect(deck.battlefields["OGN-284"]).toBe(1); // Obelisk of Power (banned, still parsed)
  });

  it("parses inline headers, 'Name (CODE)' lines and matches on the code", () => {
    const deck = loadDeck(fixture("recruits.txt"), cards);
    expect(deck.unresolved).toEqual([]);
    expect(deck.legend).toBe("VEN-155");
    expect(deck.main["OGN-177"]).toBe(3);
    expect(deck.main["SFD-153"]).toBe(3);
  });

  it("parses TTS token dumps and 'Name xN'", () => {
    const entries = parseDeckText("OGN-212-1 OGN-212-1 OGN-110-2\nForge of the Future x2");
    expect(entries).toHaveLength(4);
    const deck = normalizeDeck(entries, cards);
    expect(deck.main["OGN-212"]).toBe(4);
    expect(deck.main["OGN-110"]).toBe(1);
  });

  it("reports unresolved lines instead of dropping them", () => {
    const deck = loadDeck("3 Totally Fake Card\n2 Retreat", cards);
    expect(deck.unresolved).toEqual([{ raw: "Totally Fake Card", count: 3 }]);
    expect(deck.main["OGN-104"]).toBe(2);
  });
});

describe("deck codes", () => {
  it("round-trips through the Piltover Archive codec and classifies legend/runes/main", () => {
    const code = getCodeFromDeck(
      [
        { cardCode: "OGN-212", count: 3 }, { cardCode: "OGN-110", count: 3 },
        { cardCode: "UNL-165", count: 3 }, { cardCode: "UNL-173", count: 3 },
        { cardCode: "OGS-021", count: 1 }, { cardCode: "OGN-089", count: 6 }, { cardCode: "OGN-214", count: 6 },
      ],
      [{ cardCode: "OGN-104", count: 2 }],
      "OGS-006",
    );
    expect(isDeckCode(code)).toBe(true);
    const deck = normalizeDeck(decodeDeckCode(code), cards);
    expect(deck.unresolved).toEqual([]);
    expect(deck.legend).toBe("OGS-021");
    expect(deck.champion).toBe("OGS-006");
    expect(deck.main["OGN-212"]).toBe(3);
    expect(deck.runes["OGN-089"]).toBe(6);
    expect(deck.sideboard["OGN-104"]).toBe(2);
    expect(loadDeck(code, cards).legend).toBe("OGS-021");
  });
});
