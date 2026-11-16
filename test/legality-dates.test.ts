import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CardIndex } from "../src/cards.js";
import type { Card, LegalityEntry } from "../src/types.js";
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
const built = read<{ entries: LegalityEntry[] }>("data/legality.json");
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
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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

  it("OGN-160 Dazzling Aurora is marked banned from 2026-11-23; OGN-110 Ekko, Recurrent is banned now", () => {
    expect(row("OGN-160")).toContain("[BANNED constructed:banned from 2026-11-23, 2v2:banned from 2026-11-23]");
    expect(row("OGN-110")).toContain("[BANNED constructed:banned, 2v2:banned]");
  });
});

describe("notInPool records a ban on a card the pool does not hold yet", () => {
  const one = (ban: Record<string, unknown>) => ({
    source: "https://example.test/", retrieved: "2026-11-16",
    formats: [{ id: "constructed", lastUpdated: "2026-11-16", source: "https://example.test/", banned: [ban] }],
  });

  it("records it under the declared code, without a pool lookup", () => {
    const out = resolveLegality(pool, one({ entity: "unit", name: "Riven, Broken Blade", notInPool: "RAD-043" }));
    expect(out.entries[0]).toMatchObject({ name: "Riven, Broken Blade", codes: ["RAD-043"], bases: ["RAD-043"] });
  });

  it("fails the build once the pool holds the card, so the field cannot outlive the ingestion", () => {
    expect(() => resolveLegality(pool, one({ entity: "unit", name: "Ekko, Recurrent", notInPool: "OGN-110" })))
      .toThrow(/notInPool/);
  });

  it("an ordinary name that does not resolve still fails", () => {
    expect(() => resolveLegality(pool, one({ entity: "unit", name: "Riven, Broken Blade" }))).toThrow(/not found/);
  });
});
