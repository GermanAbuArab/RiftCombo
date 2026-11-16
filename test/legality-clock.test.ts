import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it } from "vitest";
import { banDay, CardIndex } from "../src/cards.js";
import type { Card, LegalityEntry } from "../src/types.js";

/**
 * #671. The as-of day is the UTC calendar day for every viewer: Riot's announcement of the 2026-11-23
 * bans says "effective on Monday, November 23" and names no hour or timezone (read 2026-11-16). It is
 * read again each time the list is evaluated, not frozen at page load.
 */
const root = new URL("..", import.meta.url);
const read = <T>(p: string): T => JSON.parse(readFileSync(new URL(p, root), "utf8")) as T;
const pool = read<{ cards: Card[] }>("data/cards.json").cards;
const rows = read<{ entries: LegalityEntry[] }>("data/legality.json").entries;
const CARD = "OGN-160"; // Dazzling Aurora, banned since 2026-11-23

const before = new Date("2026-11-22T23:59:59.999Z");
const after = new Date("2026-11-23T00:00:00.000Z");
const banned = (i: CardIndex) => i.legality(CARD, "constructed")?.status === "banned";

const tz = process.env.TZ;
afterEach(() => { if (tz === undefined) delete process.env.TZ; else process.env.TZ = tz; });

describe("the ban day is the UTC day, whatever the viewer's timezone (#671)", () => {
  // Kiritimati is UTC+14 (already 2026-11-23 at `before`); Pago Pago is UTC-11 (still 2026-11-22 at `after`).
  for (const zone of ["Pacific/Kiritimati", "Pacific/Pago_Pago", "America/Los_Angeles", "UTC"]) {
    it(`from ${zone} the ban switches at 00:00:00 UTC`, () => {
      process.env.TZ = zone;
      expect(banDay(before)).toBe("2026-11-22");
      expect(banDay(after)).toBe("2026-11-23");
      expect(banned(new CardIndex(pool, rows, banDay(before)))).toBe(false);
      expect(banned(new CardIndex(pool, rows, banDay(after)))).toBe(true);
    });
  }
});

describe("an index kept open re-reads the day on each evaluation (#671)", () => {
  it("current() keeps the same index while the day holds and returns the new list across midnight UTC", () => {
    const open = new CardIndex(pool, rows, banDay(before));
    expect(banned(open)).toBe(false);
    expect(open.current(new Date("2026-11-22T12:00:00Z"))).toBe(open);
    const next = open.current(after);
    expect(next).not.toBe(open);
    expect(next.asOf).toBe("2026-11-23");
    expect(banned(next)).toBe(true);
    expect(next.current(new Date("2026-11-23T23:59:59Z"))).toBe(next);
  });
});
