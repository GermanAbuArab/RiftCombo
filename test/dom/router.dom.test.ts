// @vitest-environment happy-dom
//
// #138: only `parseHash` was reachable from the suite. Everything the router DOES — hiding the other
// views, naming the tab, marking the current link, and applying a route the same tick it is asked
// for — had no test at all, and that last one is what stops #57 (a diagram measuring a hidden
// container and drawing itself with a NaN viewBox) from coming back.
import { beforeEach, describe, expect, it, vi } from "vitest";

const HTML = `
  <nav class="topnav">
    <a href="#/combos">Combos</a><a href="#/decks">My decks</a><a href="#/plays">Run plays</a>
    <a href="#/guide">Guide</a><a href="#/sources">Sources</a>
  </nav>
  <main id="view-combos"></main>
  <main id="view-decks" hidden></main>
  <main id="view-plays" hidden></main>
  <main id="view-guide" hidden></main>
  <main id="view-sources" hidden></main>`;

/** The router keeps `applied` and its listeners at module scope, so every test gets a fresh one. */
const load = async (hash: string) => {
  vi.resetModules();
  document.body.innerHTML = HTML;
  location.hash = hash;
  return await import("../../web/router.js");
};

const shown = () =>
  [...document.querySelectorAll<HTMLElement>("main[id^=view-]")].filter((el) => !el.hidden).map((el) => el.id);

beforeEach(() => { document.body.innerHTML = HTML; });

describe("what a route does to the page", () => {
  it("shows one view, names the tab and marks the link", async () => {
    const { startRouter } = await load("#/decks");
    startRouter();
    expect(document.body.dataset["view"]).toBe("decks");
    expect(shown()).toEqual(["view-decks"]);
    expect(document.title).toBe("My decks — RiftCombo");
    const current = [...document.querySelectorAll("a[aria-current]")].map((a) => a.getAttribute("href"));
    expect(current).toEqual(["#/decks"]);
    expect(document.querySelector('a[href="#/decks"]')!.classList.contains("active")).toBe(true);
  });

  /**
   * #206. A play's own address is `#/plays/<slug>`, which has a second path segment — the shape that
   * `#/decks-of-cards` is deliberately NOT: the view is the whole first segment, so a slug opens the
   * view and a lookalike view name does not.
   */
  it("opens Run plays on a slug route, not only on the index", async () => {
    const { startRouter, route } = await load("#/plays/2026-09-12-the-unopposed-clock");
    startRouter();
    expect(shown()).toEqual(["view-plays"]);
    expect(document.title).toBe("Run plays — RiftCombo");
    expect(route().playSlug).toBe("2026-09-12-the-unopposed-clock");
    // The tab is marked from the view, so the deep link still lights the nav entry.
    expect(document.querySelector('a[href="#/plays"]')!.classList.contains("active")).toBe(true);
  });

  it("falls back to Combos on a hash it does not know", async () => {
    const { startRouter } = await load("#/nonsense");
    startRouter();
    expect(document.body.dataset["view"]).toBe("combos");
    expect(shown()).toEqual(["view-combos"]);
  });

  it("opens Combos on the legacy #deck= link a player may have shared", async () => {
    const { startRouter, route } = await load("#deck=CMAAAAA");
    startRouter();
    expect(document.body.dataset["view"]).toBe("combos");
    expect(route().legacyDeck).toBe("CMAAAAA");
  });

  /**
   * `go()` must switch the view in the same tick. Setting `location.hash` alone fires `hashchange`
   * on a LATER task, so anything running on the next line would still be measuring the old view —
   * which is exactly how a diagram came to size itself against a hidden container (#57).
   */
  it("applies a route the moment it is asked for, not on the next task", async () => {
    const { startRouter, go } = await load("#/combos");
    startRouter();
    go("#/guide");
    expect(document.body.dataset["view"]).toBe("guide");
    expect(shown()).toEqual(["view-guide"]);
    expect(location.hash).toBe("#/guide");
  });

  it("tells its listeners once per route, however the hash was changed", async () => {
    const { startRouter, onRoute, go } = await load("#/combos");
    const seen: string[] = [];
    onRoute((r) => seen.push(r.view));
    startRouter();
    expect(seen).toEqual(["combos"]);

    go("#/decks");
    // The hashchange the assignment queues must not run the same work a second time.
    window.dispatchEvent(new Event("hashchange"));
    expect(seen).toEqual(["combos", "decks"]);

    go("#/decks");
    expect(seen).toEqual(["combos", "decks", "decks"]);
  });

  it("carries the deck id and the analyzing id into the route it applies", async () => {
    const { startRouter, onRoute } = await load("#/decks/abc%20123");
    const seen: { view: string; deckId: string | null }[] = [];
    onRoute((r) => seen.push({ view: r.view, deckId: r.deckId }));
    startRouter();
    expect(seen).toEqual([{ view: "decks", deckId: "abc 123" }]);
  });
});
