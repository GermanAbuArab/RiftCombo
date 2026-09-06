// @vitest-environment happy-dom
//
// #138: web/decks.ts is 426 lines of library, editor, save, delete and the unsaved-changes guard,
// and not one line of it was reachable from the suite — every rule it enforces lived in src/saved.ts
// while the CRUD that calls them had no test at all. The network is the one thing mocked; everything
// else here is the real module reading a real card index.
import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadCardIndex } from "../../src/load.js";
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

/** Boot My decks with a session, on a fresh copy of every module that keeps state. */
async function boot(hash = "#/decks") {
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
    cards: () => cards,
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
