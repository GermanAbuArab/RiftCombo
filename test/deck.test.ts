import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getCodeFromDeck } from "@piltoverarchive/riftbound-deck-codes";
import { loadCardIndex } from "../src/load.js";
import { deckCountLine, deckRestrictions, decodeDeckCode, deckToText, encodeDeckCode, isDeckCode, loadDeck, normalizeDeck, parseDeckText, type DeckEntry } from "../src/deck.js";

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

  it("keeps a TTS dump that mixes alt-art codes with plain ones", () => {
    const entries = parseDeckText("OGN-212-1 OGN-299*-1 OGN-110-1");
    expect(entries.map((e) => e.code)).toEqual(["OGN-212", "OGN-299*", "OGN-110"]);
  });

  it("resolves the 22 base codes that are not SET-NNN", () => {
    const deck = loadDeck("3 VEN-SP6\n1 Lux, Crownguard (VEN-SP6)\nUNL-T04-1 VEN-R01-1", cards);
    expect(deck.unresolved).toEqual([]);
    expect(deck.main["VEN-SP6"]).toBe(4);
    expect(deck.main["UNL-T04"]).toBe(1);
    expect(deck.runes["VEN-R01"]).toBe(1);
  });

  /**
   * #87. `CODE_RE` was never the problem — it carries `/i`, so it matched `UNL-113A` all along.
   * `resolveCode` upper-cases what it is given, and `baseOf` then refused to strip the upper-case
   * suffix, so the code found neither a printing nor a base and the line was dropped. That took the
   * gallery's OWN spelling down with it: 102 of the 1189 printings end in a lower-case `a`, and a
   * list that named one lost the card. riftbound.gg's API writes the same suffix upper-case
   * (`UNL-113A`, `VEN-038A`), which is how it surfaced, over 4548 of its lists.
   */
  it("reads an alt-art suffix in either case, and the gallery's own is lower case", () => {
    const deck = loadDeck("3 UNL-113A\n3 UNL-113a\n2 VEN-038A\n1 UNL-113\n1 OGN-299*", cards);
    expect(deck.unresolved).toEqual([]);
    expect(deck.main["UNL-113"]).toBe(7); // Master Yi, Tempered — six alt-art plus one plain
    expect(deck.main["VEN-038"]).toBe(2); // Akali, Silent
    expect(deck.legend).toBe("OGN-299"); // Daughter of the Void, the `*` spelling of an alt-art
  });

  it("resolves every printing in the pool from its own printed code, in either case", () => {
    // The sweep #14 ran over all 1189 codes, plus the upper-case dialect. A regression here means
    // some shape of code stopped round-tripping, which is exactly how both halves of #87 hid.
    const lost: string[] = [];
    for (const card of cards.cards) {
      for (const spelling of [card.code, card.code.toUpperCase(), card.code.toLowerCase()]) {
        if (cards.resolveCode(spelling) !== card.base) lost.push(spelling);
      }
    }
    expect(lost).toEqual([]);
  });

  /**
   * #90. riftbound.gg (api.dotgg.gg) writes two suffixes of its own on top of the gallery's spelling.
   * Measured 2026-09-06 over that site's whole 1427-card index: `-STAR` marks the 45 alt-arts Riot's
   * gallery spells with a trailing `*` — the same 45 printings, one for one — and `-P` marks a promo
   * (`promo: "1"` in that index: Nexus Night, Judge, Release Event, Summoner Skirmish), of which the
   * gallery carries none of the 150, so it can only resolve to the base printing. `-P2` and
   * `-P-Champion` are a second promo of the same card, `SFD-178a-P` a promo of an alt-art, and
   * `OGN-263-a` the one id that hyphenates the variant letter. Over 452 tournament lists (12,150
   * lines) the two shapes were 309 and 149 dropped lines.
   */
  it("reads riftbound.gg's -STAR alt-art suffix and its -P promo suffix", () => {
    const deck = loadDeck("1 OGN-299-STAR\n3 UNL-113-STAR\n2 VEN-038-P\n1 OGN-183-P\n1 SFD-139-P2\n1 UNL-058-P-Champion\n1 SFD-178a-P", cards);
    expect(deck.unresolved).toEqual([]);
    expect(deck.legend).toBe("OGN-299"); // Daughter of the Void, the alt-art the gallery writes `OGN-299*`
    expect(deck.main["UNL-113"]).toBe(3); // Master Yi, Tempered
    expect(deck.main["VEN-038"]).toBe(2); // Akali, Silent
    expect(deck.main["OGN-183"]).toBe(1); // Stacked Deck, Origins Nexus Night promo
    expect(deck.main["SFD-139"]).toBe(1); // Edge of Night, a second Summoner Skirmish promo
    expect(deck.main["UNL-058"]).toBe(1); // Lillia, Protector of Dreams
    expect(deck.main["SFD-178"]).toBe(1); // Blade of the Ruined King, promo of the `a` alt-art
  });

  it("reads the one dialect id that hyphenates the variant letter", () => {
    const deck = loadDeck("1 OGN-263-a", cards);
    expect(deck.unresolved).toEqual([]);
    expect(deck.legend).toBe("OGN-263"); // Swift Scout
  });

  /**
   * #90. Riot's gallery prints the six runes under their Origins numbers and reprints them only in
   * Vendetta (`VEN-R01`…`VEN-R06`); it has no `SFD-R0x` and no `UNL-R0x` at all. Every list on
   * riftbound.gg that ran the Unleashed printing therefore lost its whole Rune Deck: 696 of the 775
   * rune lines across 452 tournament lists. The correspondence is read off that site's own index,
   * where the number is the same domain in all three sets — R01 Fury, R02 Calm, R03 Mind, R04 Body,
   * R05 Chaos, R06 Order — and not guessed from the order of the alias already there.
   */
  it("resolves the Unleashed rune reprints the gallery never printed", () => {
    const deck = loadDeck("4 UNL-R05a\n4 UNL-R05\n4 UNL-R03A", cards);
    expect(deck.unresolved).toEqual([]);
    expect(deck.runes["OGN-166"]).toBe(8); // Chaos Rune
    expect(deck.runes["OGN-089"]).toBe(4); // Mind Rune
  });

  it("gives every rune reprint the name Riot's gallery gives its Origins printing", () => {
    const domains = ["Fury Rune", "Calm Rune", "Mind Rune", "Body Rune", "Chaos Rune", "Order Rune"];
    for (const set of ["SFD", "UNL"]) {
      for (let i = 0; i < domains.length; i++) {
        const base = cards.resolveCode(`${set}-R0${i + 1}`);
        expect(cards.get(base!)?.name).toBe(domains[i]);
      }
    }
  });

  it("resolves every printing in the pool through riftbound.gg's suffixes too", () => {
    // The sweep of #87 (1189 codes in three spellings) extended to the two shapes of #90, through
    // `parseDeckText` rather than `resolveCode` alone, because the suffix is normalised in the
    // parser: a code the regex refuses never reaches the index at all, which is how `-STAR` and
    // `-P` were being dropped as if they were card names.
    const lost: string[] = [];
    for (const card of cards.cards) {
      const spellings = card.code.endsWith("*")
        ? [card.code.replace("*", "-STAR"), card.code.replace("*", "-star")]
        : [`${card.code}-P`, `${card.code}-p`];
      for (const spelling of spellings) {
        const [entry] = parseDeckText(`1 ${spelling}`);
        if (!entry?.code || cards.resolveCode(entry.code) !== card.base) lost.push(spelling);
      }
    }
    expect(lost).toEqual([]);
  });

  it("reads the long champion head Riot's articles write for a short printed name", () => {
    // #86. Riot printed the same champion two ways — `OGS-009 Yi, Honed` in the starter set,
    // `UNL-113 Master Yi, Tempered` in Unleashed — and its own "<City>'s Top Decks" articles write
    // the long head for both. The short head has to keep working, and so does the epithet-only
    // retry that was already there for legends.
    const deck = loadDeck("1 Master Yi, Honed\n1 Yi, Meditative\n1 Master Yi, Tempered\n1 LeBlanc, Deceiver", cards);
    expect(deck.unresolved).toEqual([]);
    expect(deck.main["OGS-009"]).toBe(1);
    expect(deck.main["OGS-004"]).toBe(1);
    expect(deck.main["UNL-113"]).toBe(1);
    expect(deck.legend).toBe("UNL-199"); // Deceiver, named the way Riot's errata pages do
  });

  it("does not invent a card when the head is not a tag the pool prints", () => {
    const deck = loadDeck("1 Grand Master Yi, Honed\n1 Master Yi, Nonexistent", cards);
    expect(deck.unresolved).toEqual([
      { raw: "Grand Master Yi, Honed", count: 1 },
      { raw: "Master Yi, Nonexistent", count: 1 },
    ]);
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

describe("restricted cards in a pasted list", () => {
  it("reports a banned battlefield the list actually holds", () => {
    const deck = loadDeck(fixture("fury.txt"), cards);
    const r = deckRestrictions(deck, cards, "constructed");
    expect(r.map((x) => x.base)).toEqual(["OGN-284"]); // Obelisk of Power
    expect(r[0]!.count).toBe(1);
    expect(r[0]!.entry.status).toBe("banned");
    expect(r[0]!.entry.since).toBe("2026-07-16");
  });

  it("counts every copy and keeps the format scope", () => {
    const deck = loadDeck(fixture("recruits.txt"), cards);
    expect(deckRestrictions(deck, cards, "constructed").map((x) => [x.base, x.count])).toEqual([["OGN-177", 3]]);
    expect(deckRestrictions(deck, cards, "2v2").map((x) => [x.base, x.count])).toEqual([["OGN-177", 3]]);
  });

  it("separates restricted from banned and only flags the format that says so", () => {
    const deck = loadDeck("1 OGS-019\n3 Stealthy Pursuer\n2 Retreat", cards);
    expect(deck.legend).toBe("OGS-019");
    expect(deckRestrictions(deck, cards, "constructed").map((x) => x.base)).toEqual(["OGN-177"]);
    const duo = deckRestrictions(deck, cards, "2v2");
    expect(duo.map((x) => [x.base, x.entry.status])).toEqual([["OGN-177", "banned"], ["OGS-019", "restricted"]]);
  });

  it("says nothing about a clean list", () => {
    expect(deckRestrictions(loadDeck(fixture("lux.txt"), cards), cards, "constructed")).toEqual([]);
  });
});

describe("writing a deck back out", () => {
  const payload = JSON.parse(fixture("piltover-api.json")) as { title: string; entries: DeckEntry[] };

  it("serialises a Piltover Archive payload into a list our own parser reads back identically", () => {
    const text = deckToText(payload.entries, cards);
    expect(loadDeck(text, cards)).toEqual(normalizeDeck(payload.entries, cards));
  });

  it("writes the sections a player expects to see, in reading order", () => {
    const text = deckToText(payload.entries, cards);
    const at = (s: string) => {
      const i = text.indexOf(s);
      expect(i, `${s} is missing`).toBeGreaterThan(-1);
      return i;
    };
    expect(at("Legend")).toBeLessThan(at("Champion"));
    expect(at("Champion")).toBeLessThan(at("Battlefields"));
    expect(at("Battlefields")).toBeLessThan(at("Runes"));
    expect(at("Runes")).toBeLessThan(at("Main Deck"));
    expect(at("Main Deck")).toBeLessThan(at("Sideboard"));
    expect(text).toContain("6 Mind Rune (OGN-089)");
  });

  /**
   * #74. A deck imported by URL never reached the textarea, and everything that hangs off the textarea
   * reads from there: the counter said "0 cards" beside a status card reading "40 in the main deck",
   * and "Save this list to My decks" never appeared, so the import was a dead end. `fromUrl` now writes
   * `deckToText` into it before matching. What has to hold for that to be safe is that the text shown
   * to the player and the deck handed to the matcher are the same deck — otherwise the fix trades one
   * pair of contradicting numbers for another.
   */
  it("makes the counter agree with the deck the matcher is given", () => {
    const shown = loadDeck(deckToText(payload.entries, cards), cards);
    const matched = normalizeDeck(payload.entries, cards);
    expect(deckCountLine(shown)).toBe(deckCountLine(matched));
    expect(deckCountLine(shown)).not.toBe("0 cards");
    // The number the status card prints, from the same list the counter is describing.
    const total = (d: typeof shown) => Object.values(d.main).reduce((a, b) => a + b, 0);
    expect(deckCountLine(shown)).toContain(`${total(matched)} main`);
  });

  it("keeps an unrecognised entry in the text rather than dropping it", () => {
    expect(deckToText([{ code: "ZZZ-999", count: 2, section: "main" }], cards)).toContain("2 ZZZ-999");
  });

  it("round-trips a parsed list through a deck code", () => {
    const deck = loadDeck(fixture("lux.txt"), cards);
    const code = encodeDeckCode(deck);
    expect(isDeckCode(code)).toBe(true);
    const back = normalizeDeck(decodeDeckCode(code), cards);
    expect(back.legend).toBe(deck.legend);
    expect(back.champion).toBe(deck.champion);
    expect(back.main).toEqual(deck.main);
    expect(back.runes).toEqual(deck.runes);
    expect(back.battlefields).toEqual(deck.battlefields);
  });
});

describe("what the live counter says it counted (#53)", () => {
  it("names every zone instead of one bare total", () => {
    // The counter used to add every parsed line into "56 cards" while the status card beside it called
    // the same list "40 cards" — the Main Deck, which is what Tournament Rules 402.1 registers.
    expect(deckCountLine(loadDeck(fixture("lux.txt"), cards))).toBe("40 main · 12 runes · 3 battlefields · legend");
  });

  it("says nothing about zones a list does not fill", () => {
    expect(deckCountLine(loadDeck("3 Forge of the Future", cards))).toBe("3 main");
  });

  it("still reads as cards when there is nothing at all", () => {
    expect(deckCountLine(loadDeck("", cards))).toBe("0 cards");
  });
});
