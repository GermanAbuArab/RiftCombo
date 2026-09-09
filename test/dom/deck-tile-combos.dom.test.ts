// @vitest-environment happy-dom
//
// #179: a deck tile said nothing about what the deck DOES. This is not a generic deck manager — its
// reason to exist is "does this list complete a line" — so the tile now carries the one number that
// answers it.
//
// The spec asked for two numbers and MEASUREMENT DROPPED ONE. Over the 222 registered lists the
// complete count discriminates (0–5, median 2, and 26 lists at zero) while the near-miss count does
// not: every list is 1–2 cards from at least four lines, median twelve. A number that says the same
// thing about every deck says nothing, so "0 complete, 1 card from a 4th" would have been misleading
// copy and is not shipped.
//
// Two things this file pins that a reader should not have to re-derive:
//
// 1. THE TILE AND THE ENGINE CAN NEVER DISAGREE. The count is `matchDeck` — the same machinery the
//    deckbuilder runs — never a second scoring path and never a stored number. A count written at
//    save time is stale the moment the catalogue grows, which it does daily, so the cache is ruled
//    out by CORRECTNESS, not by cost. The assertions therefore compare the tile against a match run
//    in the test rather than against a frozen integer, which would break on every catalogue change.
//
// 2. IT COUNTS COMBOS, NOT ROUTES. `included` holds one hit per VARIANT, and a variant can head more
//    than one combo, so `included.length` is a route count. Measured over the 222 lists on
//    2026-09-09 the two differ on 2 of them (447 routes against 445 combos; `barcelona-16` is one),
//    and the tile says "combos" — so it counts distinct combo ids. `barcelona-16` is in the fixtures
//    below for that reason. If the catalogue ever makes those two numbers agree this test stops
//    catching that particular slip; it does not become wrong.
//
// WHAT THIS DOES NOT DO: it does not say WHICH combos, or how close the deck is to the next one.
// Opening the deck is still the only way to see the lines themselves.
import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadCardIndex, loadCombos } from "../../src/load.js";
import { generateVariants } from "../../src/combos.js";
import { matchDeck } from "../../src/matcher.js";
import { loadDeck } from "../../src/deck.js";
import type { SavedDeck } from "../../src/saved.js";

const cards = loadCardIndex();
const variants = generateVariants(loadCombos().combos, cards);
const fixture = (p: string) => readFileSync(`${process.cwd()}/${p}`, "utf8");

/** What the engine says, computed the way the deckbuilder does: distinct combos, not routes. */
const enginesAnswer = (text: string, format: "constructed" | "2v2" = "constructed") => {
  const deck = loadDeck(text, cards);
  const r = matchDeck(deck, variants, cards, { format, maxMissing: 0 });
  return new Set(r.included.flatMap((h) => h.variant.comboIds)).size;
};

const row = (over: Partial<SavedDeck> = {}): SavedDeck => ({
  id: "d1", name: "A list", deckText: fixture("test/fixtures/lux.txt"), format: "constructed",
  createdAt: "2026-09-01T00:00:00Z", updatedAt: "2026-09-01T00:00:00Z", ...over,
});

const api = vi.hoisted(() => ({ listeners: [] as ((a: { id: string; label: string } | null) => void)[], decks: [] as SavedDeck[] }));
vi.mock("../../web/supabase.js", () => ({
  accountsEnabled: true,
  onAccount: (cb: (a: { id: string; label: string } | null) => void) => { api.listeners.push(cb); },
  listDecks: async () => api.decks,
  createDeck: vi.fn(), updateDeck: vi.fn(), deleteDeck: vi.fn(async () => {}),
}));

const HTML = `
  <nav class="topnav"><a href="#/combos">Combos</a><a href="#/decks">My decks</a>
    <a href="#/guide">Guide</a><a href="#/sources">Sources</a></nav>
  <main id="view-combos"></main>
  <main id="view-decks"><div id="decks-host"></div></main>
  <main id="view-guide" hidden></main>
  <main id="view-sources" hidden></main>`;

const tick = async () => { for (let i = 0; i < 4; i++) await Promise.resolve(); };

async function boot() {
  vi.resetModules();
  api.listeners.length = 0;
  document.body.innerHTML = HTML;
  location.hash = "#/decks";
  const decks = await import("../../web/decks.js");
  const router = await import("../../web/router.js");
  decks.initDecks({ cards: () => cards, variants: () => variants, analyze: () => {}, showCard: () => {} });
  router.startRouter();
  api.listeners.forEach((cb) => cb({ id: "u1", label: "german abu arab" }));
  await tick();
}

const tiles = () => [...document.querySelectorAll<HTMLElement>(".deck-card")];
const metaOf = (i: number) => tiles()[i]!.querySelector<HTMLElement>(".deck-card-meta")!.textContent ?? "";

beforeEach(() => { api.decks = []; document.body.innerHTML = HTML; });

describe("a deck tile says how many combos the list completes", () => {
  it("agrees with the engine on every fixture, rather than carrying its own number", async () => {
    const lists = [
      ["lux", "test/fixtures/lux.txt"],
      ["recruits", "test/fixtures/recruits.txt"],
      ["barcelona-16", "test/fixtures/tournament-lists/barcelona-16.txt"],
      ["sydney-10", "test/fixtures/tournament-lists/sydney-10.txt"],
    ] as const;
    api.decks = lists.map(([name, path], i) => row({ id: `d${i}`, name, deckText: fixture(path), updatedAt: `2026-09-0${i + 1}T00:00:00Z` }));
    await boot();
    expect(tiles()).toHaveLength(lists.length);
    for (const [i, [, path]] of lists.entries()) {
      const n = enginesAnswer(fixture(path));
      const meta = metaOf(tiles().findIndex((t) => t.textContent?.includes(lists[i]![0])));
      expect(meta).toContain(n === 0 ? "No combos complete" : `${n} combo${n === 1 ? "" : "s"} complete`);
    }
  });

  /**
   * A tile reading zero is the COMMON CASE — 26 of 222 registered lists complete nothing — so it has
   * to read as a fact about the deck, not as a failure and not as something the app failed to load.
   * Two things carry that: the sentence is about combos rather than about absence, and it sits in the
   * meta line beside "40 cards · Constructed", which are facts of the same kind. It is deliberately
   * NOT a badge: this tile's badges are Legal/Illegal, a pass/fail vocabulary, and zero is neither.
   */
  it("states zero as a fact in the meta line, never as a badge or an empty state", async () => {
    api.decks = [row({ deckText: fixture("test/fixtures/tournament-lists/sydney-10.txt") })];
    await boot();
    expect(enginesAnswer(fixture("test/fixtures/tournament-lists/sydney-10.txt"))).toBe(0);
    const meta = metaOf(0);
    expect(meta).toContain("No combos complete");
    expect(meta).toMatch(/cards? · (Constructed|2v2) · No combos complete/);
    // The meta line wraps at the 250px minimum column, so the sentence is one unbreakable run and
    // the break can only fall on a separator. Asserted against the stylesheet, since happy-dom lays
    // nothing out and the class alone would prove nothing.
    const count = tiles()[0]!.querySelector(".deck-card-count");
    expect(count?.textContent).toBe("No combos complete");
    expect(readFileSync(`${process.cwd()}/web/styles.css`, "utf8")).toMatch(/\.deck-card-count\s*\{[^}]*white-space:\s*nowrap/);
    // The only badge on the tile is still the legality one.
    const badges = tiles()[0]!.querySelectorAll(".badge");
    expect(badges).toHaveLength(1);
    expect(badges[0]!.textContent).toMatch(/Legal|Illegal/);
    expect(tiles()[0]!.textContent).not.toMatch(/error|failed|unavailable|loading/i);
  });

  /**
   * Whether any fixture completes exactly one line is a property of today's catalogue and will drift,
   * so the singular is pinned across every fixture that HAS the count rather than on one list: the
   * sentence is one of exactly three shapes, and a "1 combos complete" can never be one of them.
   */
  it("never says 'combos' for one, or 'combo' for several", async () => {
    const paths = ["test/fixtures/lux.txt", "test/fixtures/recruits.txt", "test/fixtures/fury.txt",
                   "test/fixtures/tournament-lists/barcelona-16.txt", "test/fixtures/tournament-lists/sydney-10.txt"];
    api.decks = paths.map((path, i) => row({ id: `d${i}`, name: `list ${i}`, deckText: fixture(path), updatedAt: `2026-09-0${i + 1}T00:00:00Z` }));
    await boot();
    expect(tiles()).toHaveLength(paths.length);
    for (let i = 0; i < paths.length; i++) {
      const meta = metaOf(i);
      expect(meta).toMatch(/· (No combos|1 combo|[2-9]\d* combos) complete$/);
    }
  });

  /**
   * The count follows the tile's own format, because legality is format-scoped and a line whose card
   * is banned in one format is not complete in it. A stored count could not do this at all.
   */
  it("counts under the deck's own format", async () => {
    const text = fixture("test/fixtures/lux.txt");
    api.decks = [row({ id: "a", name: "as constructed", deckText: text, format: "constructed" }),
                 row({ id: "b", name: "as 2v2", deckText: text, format: "2v2", updatedAt: "2026-09-02T00:00:00Z" })];
    await boot();
    for (const fmt of ["constructed", "2v2"] as const) {
      const i = tiles().findIndex((t) => t.textContent?.includes(fmt === "2v2" ? "as 2v2" : "as constructed"));
      const n = enginesAnswer(text, fmt);
      expect(metaOf(i)).toContain(n === 0 ? "No combos complete" : `${n} combo${n === 1 ? "" : "s"} complete`);
    }
  });
});
