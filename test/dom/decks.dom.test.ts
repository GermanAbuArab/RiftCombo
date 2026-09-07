// @vitest-environment happy-dom
//
// #138: web/decks.ts is 426 lines of library, editor, save, delete and the unsaved-changes guard,
// and not one line of it was reachable from the suite — every rule it enforces lived in src/saved.ts
// while the CRUD that calls them had no test at all. The network is the one thing mocked; everything
// else here is the real module reading a real card index.
import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadCardIndex } from "../../src/load.js";
import type { CardIndex } from "../../src/cards.js";
import type { SavedDeck } from "../../src/saved.js";

const cards = loadCardIndex();
const list = readFileSync(`${process.cwd()}/test/fixtures/lux.txt`, "utf8");

const row = (over: Partial<SavedDeck> = {}): SavedDeck => ({
  id: "d1",
  name: "Lux engine",
  deckText: list,
  format: "constructed",
  createdAt: "2026-09-01T00:00:00Z",
  updatedAt: "2026-09-01T00:00:00Z",
  ...over,
});

const api = vi.hoisted(() => ({
  listeners: [] as ((a: { id: string; label: string } | null) => void)[],
  decks: [] as SavedDeck[],
  createDeck: vi.fn(),
  updateDeck: vi.fn(),
  deleteDeck: vi.fn(async () => {}),
}));

vi.mock("../../web/supabase.js", () => ({
  accountsEnabled: true,
  onAccount: (cb: (a: { id: string; label: string } | null) => void) => { api.listeners.push(cb); },
  listDecks: async () => api.decks,
  createDeck: api.createDeck,
  updateDeck: api.updateDeck,
  deleteDeck: api.deleteDeck,
}));

const HTML = `
  <nav class="topnav"><a href="#/combos">Combos</a><a href="#/decks">My decks</a>
    <a href="#/guide">Guide</a><a href="#/sources">Sources</a></nav>
  <main id="view-combos"></main>
  <main id="view-decks"><div id="decks-host"></div></main>
  <main id="view-guide" hidden></main>
  <main id="view-sources" hidden></main>`;

const analyzed: SavedDeck[] = [];
/** happy-dom implements no `confirm`, and `guardUnsaved` is the one place the app asks a question. */
const confirmed = vi.fn(() => true);
vi.stubGlobal("confirm", confirmed);

/**
 * The same pool with every card's art pointed at a URL that does not answer, which is the shape of a
 * CDN 404: `image` is present, so the markup writes the `<img>`, and the failure only exists at load
 * time. happy-dom fetches no images, so the `error` the browser would dispatch is dispatched by the
 * test; that Chrome does dispatch it for this host, and draws a broken-image glyph in the 72px box
 * when it does, was checked in a real browser on 2026-09-07 rather than assumed.
 */
const DEAD_ART = "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/deadbeef-744x1039.png";
const deadArtIndex = (base: CardIndex): CardIndex => new Proxy(base, {
  get(target, prop) {
    if (prop === "get") return (code: string) => {
      const card = target.get(code);
      return card ? { ...card, image: DEAD_ART } : card;
    };
    const value = Reflect.get(target, prop, target) as unknown;
    return typeof value === "function" ? value.bind(target) : value;
  },
});

/** Boot My decks with a session, on a fresh copy of every module that keeps state. */
async function boot(hash = "#/decks", index: CardIndex = cards) {
  vi.resetModules();
  api.listeners.length = 0;
  api.createDeck.mockReset();
  api.updateDeck.mockReset();
  api.deleteDeck.mockClear();
  analyzed.length = 0;
  confirmed.mockClear();
  confirmed.mockReturnValue(true);
  document.body.innerHTML = HTML;
  location.hash = hash;
  const decks = await import("../../web/decks.js");
  const router = await import("../../web/router.js");
  decks.initDecks({
    cards: () => index,
    analyze: (d) => analyzed.push(d),
    showCard: () => {},
  });
  router.startRouter();
  api.listeners.forEach((cb) => cb({ id: "u1", label: "german abu arab" }));
  await tick();
  return router;
}

/** Let the listDecks promise and the render it triggers settle. */
const tick = async () => { for (let i = 0; i < 4; i++) await Promise.resolve(); };
const host = () => document.querySelector<HTMLElement>("#decks-host")!;
const press = (sel: string) => document.querySelector<HTMLButtonElement>(sel)!.click();

beforeEach(() => { api.decks = []; document.body.innerHTML = HTML; });

describe("the library", () => {
  it("says the account is empty rather than that it is loading", async () => {
    await boot();
    expect(host().textContent).toContain("Nothing saved yet.");
    expect(host().textContent).toContain("Press New deck");
    expect(host().querySelectorAll(".deck-card")).toHaveLength(0);
  });

  it("draws a saved list with its legend, its size and its verdict", async () => {
    api.decks = [row()];
    await boot();
    const card = host().querySelector<HTMLAnchorElement>("a.deck-card")!;
    expect(card.getAttribute("href")).toBe("#/decks/d1");
    expect(card.textContent).toContain("Lux engine");
    expect(card.textContent).toContain("Lady of Luminosity");
    expect(card.textContent).toContain("40 cards");
    expect(card.querySelector(".badge")!.textContent).toBe("Legal");
    // The legend's domains are dots, and they are the library's own 8px ones (#109 renamed the
    // filter chip's dot after this one grew by accident).
    expect(card.querySelectorAll(".dom-dot")).toHaveLength(2);
  });

  /**
   * #177: the tile leads with the legend's art. The URL is the card's own — the same `image` field
   * every other view draws — so the assertion is that this tile carries THAT legend's art, not that
   * some image is present.
   */
  it("leads the tile with the legend's own art, inside the one link", async () => {
    api.decks = [row()];
    await boot();
    const card = host().querySelector<HTMLAnchorElement>("a.deck-card")!;
    const img = card.querySelector<HTMLImageElement>(".deck-card-art img")!;
    expect(img).not.toBeNull();
    const src = img.getAttribute("src")!;
    expect(src).toContain(cards.get(cards.resolveName("Lady of Luminosity")!)!.image!);
    // The crop is geometry, not a class: Lady of Luminosity's scan is 744x1039, so the square window
    // on the illustration is 0.52 x 1039 = 540 a side, taken 0.05 x 1039 = 52 down and centred
    // across (744 - 540) / 2 = 102. Asking the CDN for it is what keeps the name plate and the rules
    // box out of a 72px box, which `object-fit: cover` alone cannot do on a 0.716 scan.
    expect(src).toContain("&rect=102,52,540,540");
    // Decorative: the legend's name is already on the line beside it.
    expect(img.getAttribute("alt")).toBe("");
    expect(img.getAttribute("loading")).toBe("lazy");
    // The whole tile is still one link, and the badge and the text moved into the body beside the art.
    expect(host().querySelectorAll("a.deck-card")).toHaveLength(1);
    expect(card.querySelector(".deck-card-body .deck-card-name")!.textContent).toBe("Lux engine");
    expect(card.querySelector(".deck-card-body .badge")!.textContent).toBe("Legal");
  });

  /** A list with no legend gets the strip's empty state, never a broken image frame. */
  it("marks the strip empty, with a dash, when the list has no legend", async () => {
    api.decks = [row({ deckText: "3 Forge of the Future\n3 Shadow's Call\n" })];
    await boot();
    const card = host().querySelector<HTMLAnchorElement>("a.deck-card")!;
    const art = card.querySelector<HTMLElement>(".deck-card-art")!;
    expect(art.classList.contains("noart")).toBe(true);
    expect(art.querySelector("img")).toBeNull();
    expect(art.textContent).toBe("—");
    // The dash is the strip saying nothing is there; "No legend" beside it is what is announced.
    expect(art.getAttribute("aria-hidden")).toBe("true");
    expect(card.querySelector(".deck-card-legend")!.textContent).toContain("No legend");
  });

  /**
   * The CDN answering 404 is the one failure the markup cannot see, and `alt=""` hides the alt text
   * while leaving the browser's broken-image glyph. The listener is real because the CSP forbids an
   * inline `onerror=`.
   */
  it("falls back to the empty thumbnail when a dead URL fails to load", async () => {
    api.decks = [row()];
    await boot("#/decks", deadArtIndex(cards));
    const img = host().querySelector<HTMLImageElement>(".deck-card-art img")!;
    expect(img.getAttribute("src")).toContain("deadbeef");
    const box = img.parentElement!;
    expect(box.classList.contains("noart")).toBe(false);
    img.dispatchEvent(new Event("error"));
    // The same empty state a deck with no legend gets, rather than a 72px hole with a glyph in it.
    expect(box.classList.contains("noart")).toBe(true);
    expect(box.querySelector("img")).toBeNull();
    expect(box.textContent).toBe("—");
  });

  /**
   * `render()` replaces the whole library's innerHTML, so the images it guards are new objects every
   * time and the listener has to be re-attached. Opening a deck and coming back is the ordinary way
   * that second render happens.
   */
  it("guards the art again after the library is re-rendered", async () => {
    api.decks = [row()];
    const router = await boot("#/decks", deadArtIndex(cards));
    router.go("#/decks/d1");
    await tick();
    router.go("#/decks");
    await tick();
    const img = host().querySelector<HTMLImageElement>(".deck-card-art img")!;
    // Held before the event: the handler empties the box, so the image has no parent afterwards.
    const box = img.parentElement!;
    img.dispatchEvent(new Event("error"));
    expect(box.classList.contains("noart")).toBe(true);
    expect(box.querySelector("img")).toBeNull();
  });

  /**
   * #177: the reason line is reserved on a legal list too. Without it a row of the grid held tiles of
   * two heights, the strip stretched to each, and no two art crops were the same window.
   */
  it("reserves the reason row on a legal list, so every tile has the same rows", async () => {
    api.decks = [row({ id: "legal" }), row({ id: "illegal", name: "Broken", deckText: "3 Forge of the Future\n" })];
    await boot();
    const tiles = [...host().querySelectorAll<HTMLElement>("a.deck-card")];
    expect(tiles).toHaveLength(2);
    const rows = (t: HTMLElement) => [...t.querySelectorAll(".deck-card-body > *")].map((e) => e.className);
    expect(rows(tiles[0]!)).toEqual(rows(tiles[1]!));
    const legal = tiles.find((t) => t.querySelector(".badge")!.textContent === "Legal")!;
    expect(legal.querySelector(".deck-card-why")).not.toBeNull();
    expect(legal.querySelector(".deck-card-why")!.textContent).toBe("");
    const illegal = tiles.find((t) => t.querySelector(".badge")!.textContent === "Illegal")!;
    expect(illegal.querySelector(".deck-card-why")!.textContent!.length).toBeGreaterThan(0);
  });

  it("opens the editor on a saved list, with the builder inside it", async () => {
    api.decks = [row()];
    const router = await boot();
    router.go("#/decks/d1");
    await tick();
    expect(host().querySelector<HTMLInputElement>("#deck-name")!.value).toBe("Lux engine");
    expect(host().querySelector("#builder")).not.toBeNull();
    expect(host().querySelector("#bld-totals")!.textContent).toContain("Main 40/40");
    // Nothing is dirty yet, so there is nothing to save.
    expect(host().querySelector<HTMLButtonElement>('[data-act="save"]')!.disabled).toBe(true);
    expect(host().querySelector('[data-act="save"]')!.textContent).toBe("Update");
  });
});

describe("writing to the account", () => {
  it("creates a deck from the editor, and only when Save is pressed", async () => {
    const router = await boot();
    router.go("#/decks/new");
    await tick();
    const name = host().querySelector<HTMLInputElement>("#deck-name")!;
    name.value = "My new list";
    name.dispatchEvent(new Event("input", { bubbles: true }));

    // Paste a list through the Import dialog, which is the only way text arrives now.
    press('[data-act="import"]');
    const box = document.querySelector<HTMLTextAreaElement>("#bld-import-text")!;
    box.value = list;
    press('[data-b="import-go"]');
    await tick();
    expect(host().querySelector("#bld-totals")!.textContent).toContain("Main 40/40");
    expect(api.createDeck).not.toHaveBeenCalled();

    api.createDeck.mockResolvedValue(row({ id: "d2", name: "My new list" }));
    press('[data-act="save"]');
    await tick();
    expect(api.createDeck).toHaveBeenCalledTimes(1);
    const [userId, savedName, text, format] = api.createDeck.mock.calls[0]!;
    expect(userId).toBe("u1");
    expect(savedName).toBe("My new list");
    expect(format).toBe("constructed");
    // What is stored is the plaintext list, never a match result.
    expect(text).toContain("Forge of the Future");
  });

  it("refuses to save a list with no name, and says so in the status line", async () => {
    const router = await boot();
    router.go("#/decks/new");
    await tick();
    press('[data-act="import"]');
    document.querySelector<HTMLTextAreaElement>("#bld-import-text")!.value = list;
    press('[data-b="import-go"]');
    await tick();
    press('[data-act="save"]');
    await tick();
    expect(api.createDeck).not.toHaveBeenCalled();
    expect(document.querySelector("#decks-msg")!.textContent).toMatch(/name/i);
  });

  it("deletes only on the second press, and goes back to the library", async () => {
    api.decks = [row()];
    const router = await boot();
    router.go("#/decks/d1");
    await tick();

    press('[data-act="delete"]');
    expect(api.deleteDeck).not.toHaveBeenCalled();
    expect(host().textContent).toContain("Delete for good");

    press('[data-act="delete-cancel"]');
    expect(api.deleteDeck).not.toHaveBeenCalled();

    press('[data-act="delete"]');
    press('[data-act="delete-confirm"]');
    await tick();
    expect(api.deleteDeck).toHaveBeenCalledWith("d1");
    expect(location.hash).toBe("#/decks");
    expect(host().textContent).toContain("Nothing saved yet.");
  });

  /**
   * Leaving a dirty editor asks once, and the guard sits on the ROUTE rather than on `beforeunload`
   * because switching views is the way out a player actually takes.
   */
  it("asks before leaving an edit, and stays put when the answer is no", async () => {
    api.decks = [row()];
    const router = await boot();
    router.go("#/decks/d1");
    await tick();
    const name = host().querySelector<HTMLInputElement>("#deck-name")!;
    name.value = "Lux engine, edited";
    name.dispatchEvent(new Event("input", { bubbles: true }));

    confirmed.mockReturnValue(false);
    router.go("#/decks");
    await tick();
    expect(confirmed).toHaveBeenCalledTimes(1);
    expect(location.hash).toBe("#/decks/d1");
    expect(host().querySelector("#deck-name")).not.toBeNull();

    confirmed.mockReturnValue(true);
    router.go("#/decks");
    await tick();
    expect(location.hash).toBe("#/decks");
    expect(host().querySelector("#deck-name")).toBeNull();
  });

  it("does not ask when nothing was edited", async () => {
    api.decks = [row()];
    const router = await boot();
    router.go("#/decks/d1");
    await tick();
    router.go("#/decks");
    await tick();
    expect(confirmed).not.toHaveBeenCalled();
    expect(location.hash).toBe("#/decks");
  });

  /**
   * Analyze hands the list to whoever owns the Combos view and does not navigate itself — the view
   * switch belongs to that side, which is why the hook takes a whole SavedDeck rather than an id.
   * An edited draft hands over what is ON SCREEN, not what is stored.
   */
  it("hands the list to Combos, saved or edited, without navigating itself", async () => {
    api.decks = [row()];
    const router = await boot();
    router.go("#/decks/d1");
    await tick();
    press('[data-act="analyze"]');
    await tick();
    expect(analyzed).toHaveLength(1);
    expect(analyzed[0]!.id).toBe("d1");
    expect(analyzed[0]!.name).toBe("Lux engine");
    expect(location.hash).toBe("#/decks/d1");

    // Now edit the list and hand it over again: the draft wins over the stored row.
    press('[data-act="import"]');
    document.querySelector<HTMLTextAreaElement>("#bld-import-text")!.value = "Legend\n1 Nine-Tailed Fox\n";
    press('[data-b="import-go"]');
    await tick();
    press('[data-act="analyze"]');
    await tick();
    expect(analyzed).toHaveLength(2);
    expect(analyzed[1]!.deckText).toContain("Nine-Tailed Fox");
    expect(analyzed[1]!.deckText).not.toContain("Forge of the Future");
  });
});
