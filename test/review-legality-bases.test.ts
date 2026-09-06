import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * A ban is on the CARD, so it has to reach every printing family of that card. 104 names in this pool
 * already span two or more base codes, so `LegalityEntry.bases` being a SET is load-bearing, not a
 * loose end — and `resolveLegality` in scripts/build-cards.mjs deliberately does not insist on one
 * base the way `resolveSignature` does.
 *
 * This is pinned because the asymmetry reads like an oversight and invites the wrong fix: a 2026-09-06
 * review proposed adding `resolveSignature`'s `distinctBases.length > 1` throw to `resolveLegality`,
 * which would fail the build the first time a reprinted card is banned, and "fixing" that by taking
 * bases[0] would leave the reprint quietly legal.
 */
const root = new URL("..", import.meta.url);
const cards = JSON.parse(readFileSync(new URL("data/cards.json", root), "utf8")) as
  | { cards: { name: string; base: string }[] }
  | { name: string; base: string }[];
const list = Array.isArray(cards) ? cards : cards.cards;

const norm = (s: string) => s.replace(/[‘’']/g, "'").replace(/\s+/g, " ").trim().toLowerCase();

const basesByName = new Map<string, Set<string>>();
for (const c of list) {
  const k = norm(c.name);
  if (!basesByName.has(k)) basesByName.set(k, new Set());
  basesByName.get(k)!.add(c.base);
}

describe("a ban has to reach every printing of the card", () => {
  it("finds names in the pool that span more than one base code", () => {
    const spanning = [...basesByName].filter(([, b]) => b.size > 1);
    // Not pinned to exactly 104: a new set adds reprints. Pinned as "many", so the test states the
    // fact it exists to protect rather than breaking on the next release.
    expect(spanning.length).toBeGreaterThan(50);
    // Two the comment in scripts/build-cards.mjs names by hand, so the example cannot go stale silently.
    expect(basesByName.get("vi, destructive")!.size).toBeGreaterThan(1);
    expect(basesByName.get("ahri, inquisitive")!.size).toBeGreaterThan(1);
  });

  it("keeps resolveLegality free of the single-base throw that resolveSignature has", () => {
    const src = readFileSync(new URL("scripts/build-cards.mjs", root), "utf8");
    const legality = src.slice(src.indexOf("function resolveLegality"), src.indexOf("function resolveSignature"));
    const signature = src.slice(src.indexOf("function resolveSignature"));
    expect(signature).toContain("distinctBases.length > 1");
    expect(legality).not.toContain("distinctBases.length > 1");
    // It still has to fail loudly when a banned name matches nothing at all.
    expect(legality).toContain("not found");
  });
});
