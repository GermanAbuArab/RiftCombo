import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CardIndex } from "../src/cards.js";
import { deckRestrictions, deckUpcomingBans, loadDeck } from "../src/deck.js";
import type { Card, LegalityEntry } from "../src/types.js";
// @ts-expect-error — untyped .mjs import, see test/errata.test.ts
import { resolveLegality } from "../scripts/build-cards.mjs";

/**
 * #647. Riot announced the Radiance ban list on 2026-11-13 with `Effective : November 23, 2026`
 * (https://playriftbound.com/en-us/news/announcements/radiance-ban-list-updates-effective-november-23-2026,
 * read 2026-11-16). A card on it is legal until that date, so `since` is no longer display-only:
 * `CardIndex` takes the date it answers for and holds back any entry whose `since` is later.
 */
const root = new URL("..", import.meta.url);
const read = <T>(p: string): T => JSON.parse(readFileSync(new URL(p, root), "utf8")) as T;
const pool = read<{ cards: Card[] }>("data/cards.json").cards;
const built = read<{ retrieved: string; entries: LegalityEntry[] }>("data/legality.json");
const src = read<{ formats: { banned: Record<string, unknown>[] }[] }>("data/legality.src.json");

const on = (date: string) => new CardIndex(pool, built.entries, date);

describe("a ban is in force from its effective date, not before (#647)", () => {
  it("OGN-160 Dazzling Aurora is legal on 2026-11-22 and banned from 2026-11-23, in both formats", () => {
    for (const format of ["constructed", "2v2"] as const) {
      expect(on("2026-11-22").legality("OGN-160", format)).toBeUndefined();
      const e = on("2026-11-23").legality("OGN-160", format);
      expect(e?.status).toBe("banned");
      expect(e?.since).toBe("2026-11-23");
      expect(e?.source).toBe("https://playriftbound.com/en-us/news/announcements/radiance-ban-list-updates-effective-november-23-2026");
    }
  });

  it("the 2026-09-18 additions are in force now: OGN-110 Ekko, Recurrent and OGN-183 Stacked Deck", () => {
    for (const format of ["constructed", "2v2"] as const) {
      expect(on("2026-11-16").legality("OGN-110", format)?.since).toBe("2026-09-18");
      expect(on("2026-11-16").legality("OGN-183", format)?.since).toBe("2026-09-18");
      expect(on("2026-09-17").legality("OGN-110", format)).toBeUndefined();
    }
  });

  it("an entry from July keeps its date: OGN-177 Stealthy Pursuer since 2026-07-24", () => {
    expect(on("2026-11-16").legality("OGN-177", "constructed")?.since).toBe("2026-07-24");
  });

  it("with no date given, the index answers for today", () => {
    const today = new Date().toISOString().slice(0, 10); // the UTC day, #671
    expect(!!new CardIndex(pool, built.entries).legality("OGN-160", "constructed")).toBe(today >= "2026-11-23");
  });
});

describe("data/legality.json is what the build makes of legality.src.json over the committed pool", () => {
  it("rebuilding gives the committed file", () => {
    expect(resolveLegality(pool, src)).toEqual(built);
  });

  it("names every Radiance entry with its codes", () => {
    const radiance = built.entries.filter((e) => e.since === "2026-11-23");
    const rows = radiance.map((e) => `${e.format} ${e.entity} ${e.name} ${e.bases.join("+")}`);
    expect(rows).toEqual(["constructed", "2v2"].flatMap((f) => [
      `${f} unit Riven, Broken Blade RAD-043`,
      `${f} gear Zhonya's Hourglass OGN-077`,
      `${f} unit Stellacorn Herder SFD-048`,
      `${f} unit Nocturne, Horrifying OGN-194`,
      `${f} unit Rhasa the Sunderer OGN-195`,
      `${f} unit Brynhir Thundersong OGN-026`,
      `${f} gear Dazzling Aurora OGN-160`,
      `${f} gear Baited Hook OGN-242`,
      `${f} battlefield Emperor's Dais SFD-207`,
      `${f} battlefield Star Spring UNL-215`,
    ]));
  });
});

describe("the text corpus names the date an announced ban starts (#647)", () => {
  const corpus = readFileSync(new URL("data/corpus_flat.txt", root), "utf8").split("\n");
  const row = (code: string) => corpus.find((l) => l.startsWith(`${code} | `)) ?? "";

  // "from <date>" is printed only for a ban dated after the day the list was read, so the expected
  // row follows the committed `retrieved` and does not go stale when the list is re-read.
  const tag = (since: string) => (since > built.retrieved ? ` from ${since}` : "");

  it("OGN-160 Dazzling Aurora carries its 2026-11-23 start while the list was read before it; OGN-110 Ekko, Recurrent is banned now", () => {
    expect(row("OGN-160")).toContain(`[BANNED constructed:banned${tag("2026-11-23")}, 2v2:banned${tag("2026-11-23")}]`);
    expect(row("OGN-110")).toContain(`[BANNED constructed:banned${tag("2026-09-18")}, 2v2:banned${tag("2026-09-18")}]`);
  });
});

describe("notInPool records a ban on a card the pool does not hold yet", () => {
  const one = (ban: Record<string, unknown>) => ({
    source: "https://example.test/", retrieved: "2026-11-16",
    formats: [{ id: "constructed", lastUpdated: "2026-11-16", source: "https://example.test/", banned: [ban] }],
  });

  // A made-up card: Riven, Broken Blade (RAD-043) was the real case until #664 put Radiance in the pool.
  it("records it under the declared code, without a pool lookup", () => {
    const out = resolveLegality(pool, one({ entity: "unit", name: "Nobody, Unprinted", notInPool: "TST-001" }));
    expect(out.entries[0]).toMatchObject({ name: "Nobody, Unprinted", codes: ["TST-001"], bases: ["TST-001"] });
  });

  it("fails the build once the pool holds the card, so the field cannot outlive the ingestion", () => {
    expect(() => resolveLegality(pool, one({ entity: "unit", name: "Ekko, Recurrent", notInPool: "OGN-110" })))
      .toThrow(/notInPool/);
  });

  it("an ordinary name that does not resolve still fails", () => {
    expect(() => resolveLegality(pool, one({ entity: "unit", name: "Nobody, Unprinted" }))).toThrow(/not found/);
  });
});

describe("an announced ban is exposed with its date before it is in force (#670)", () => {
  const list = readFileSync(new URL("test/fixtures/tournament-lists/atlanta-06.txt", root), "utf8");

  it("the day before, SFD-048 Stellacorn Herder and OGN-077 Zhonya's Hourglass are upcoming with their date and not banned; on the day, nothing is upcoming and both are banned", () => {
    for (const format of ["constructed", "2v2"] as const) {
      const before = on("2026-11-22");
      const deck = loadDeck(list, before);
      const up = deckUpcomingBans(deck, before, format);
      expect(up.map((r) => [r.base, r.entry.since, r.count])).toEqual([["SFD-048", "2026-11-23", 3], ["OGN-077", "2026-11-23", 3]]);
      expect(deckRestrictions(deck, before, format).map((r) => r.base)).not.toContain("OGN-077");
      expect(deckRestrictions(deck, before, format).map((r) => r.base)).not.toContain("SFD-048");

      const day = on("2026-11-23");
      expect(deckUpcomingBans(loadDeck(list, day), day, format)).toEqual([]);
      for (const base of ["SFD-048", "OGN-077"]) {
        expect(deckRestrictions(loadDeck(list, day), day, format).find((r) => r.base === base)?.entry.status).toBe("banned");
      }
    }
  });

  it("the index answers upcoming() only for rows not yet in force", () => {
    expect(on("2026-11-22").upcoming("OGN-160", "constructed").map((e) => e.since)).toEqual(["2026-11-23"]);
    expect(on("2026-11-23").upcoming("OGN-160", "constructed")).toEqual([]);
    expect(on("2026-11-22").upcoming("OGN-110", "constructed")).toEqual([]);
  });

  it("an announced ban still shows when an earlier restriction is announced for the same card", () => {
    const row = (status: "banned" | "restricted", since: string): LegalityEntry => ({
      format: "constructed", entity: "gear", name: "Zhonya's Hourglass", codes: ["OGN-077"], bases: ["OGN-077"], status, since, source: "test",
    });
    const index = new CardIndex(pool, [row("banned", "2026-12-10"), row("restricted", "2026-12-01")], "2026-11-22");
    const deck = loadDeck(list, index);
    expect(deckUpcomingBans(deck, index, "constructed").map((r) => [r.base, r.entry.status, r.entry.since])).toEqual([["OGN-077", "banned", "2026-12-10"]]);
  });
});
