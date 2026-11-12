// @vitest-environment happy-dom
//
// #138: everything the router DOES — hiding the other views, naming the tab, marking the current
// link, and applying a route the same tick it is asked for — is pinned here. #287 moved it to the
// History API and added the boundary: inside the app shell a route is a pushState, and crossing to or
// from a public page is a full load, so the browser applies the destination's own headers (#272 §5).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const HTML = `
  <nav class="topnav">
    <a href="/app">Combos</a><a href="/decks">My decks</a><a href="/plays">Run plays</a>
    <a href="/guide">Guide</a><a href="/sources">Sources</a>
  </nav>
  <main id="view-combos"><a id="to-deck" href="/decks/d1">a deck</a><a id="to-stage" href="#stage">diagram</a></main>
  <main id="view-decks" hidden></main>
  <main id="view-plays" hidden></main>
  <main id="view-guide" hidden></main>
  <main id="view-sources" hidden></main>`;

/** Detaches the router the previous test started; its listeners outlive vi.resetModules(). */
let stopRouter = (): void => {};

/** The router keeps `applied` and its listeners at module scope, so every test gets a fresh one. */
const load = async (url: string) => {
  stopRouter();
  vi.resetModules();
  document.body.innerHTML = HTML;
  history.replaceState(null, "", url);
  const mod = await import("../../web/router.js");
  const load = vi.spyOn(mod.navigate, "load").mockImplementation(() => {});
  const replace = vi.spyOn(mod.navigate, "replace").mockImplementation(() => {});
  const push = vi.spyOn(history, "pushState");
  const startRouter = () => { stopRouter(); stopRouter = mod.startRouter(); };
  return { ...mod, startRouter, spies: { load, replace, push } };
};

const shown = () =>
  [...document.querySelectorAll<HTMLElement>("main[id^=view-]")].filter((el) => !el.hidden).map((el) => el.id);

/**
 * A left click, as the browser dispatches it; returns whether the router cancelled it. The router
 * listens on `document`, so a listener on `window` sees its decision, and then cancels the click
 * itself so the test environment does not try to follow the link.
 */
const click = (el: Element, init: MouseEventInit = {}): boolean => {
  let prevented = false;
  const seen = (ev: Event) => { prevented = ev.defaultPrevented; ev.preventDefault(); };
  window.addEventListener("click", seen);
  el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, button: 0, ...init }));
  window.removeEventListener("click", seen);
  return prevented;
};

beforeEach(() => { document.body.innerHTML = HTML; });
afterEach(() => { vi.restoreAllMocks(); });

describe("what a route does to the page", () => {
  it("shows one view, names the tab and marks the link", async () => {
    const { startRouter } = await load("/decks");
    startRouter();
    expect(document.body.dataset["view"]).toBe("decks");
    expect(shown()).toEqual(["view-decks"]);
    expect(document.title).toBe("My decks — RiftCombo");
    const current = [...document.querySelectorAll("a[aria-current]")].map((a) => a.getAttribute("href"));
    expect(current).toEqual(["/decks"]);
    expect(document.querySelector('a[href="/decks"]')!.classList.contains("active")).toBe(true);
  });

  it("opens Combos on / and on /app, and marks the Combos tab on both", async () => {
    for (const url of ["/", "/app?deck=d1"]) {
      const { startRouter } = await load(url);
      startRouter();
      expect(shown(), url).toEqual(["view-combos"]);
      expect(document.querySelector('a[href="/app"]')!.getAttribute("aria-current"), url).toBe("page");
    }
  });

  it("opens Combos on a deck code carried in the fragment", async () => {
    const { startRouter, route } = await load("/app#deck=CMAAAAA");
    startRouter();
    expect(document.body.dataset["view"]).toBe("combos");
    expect(route().legacyDeck).toBe("CMAAAAA");
  });

  /**
   * `go()` must switch the view in the same tick: anything on the next line would otherwise still be
   * measuring the old view, which is how a diagram came to size itself against a hidden container (#57).
   */
  it("applies an in-app route the moment it is asked for, with a pushState", async () => {
    const { startRouter, go, spies } = await load("/app");
    startRouter();
    go("/decks/d1");
    expect(document.body.dataset["view"]).toBe("decks");
    expect(shown()).toEqual(["view-decks"]);
    expect(location.pathname).toBe("/decks/d1");
    expect(spies.push).toHaveBeenCalledTimes(1);
    expect(spies.load).not.toHaveBeenCalled();
  });

  it("tells its listeners once per route, and again on Back", async () => {
    const { startRouter, onRoute, go } = await load("/app");
    const seen: string[] = [];
    onRoute((r) => seen.push(r.view));
    startRouter();
    expect(seen).toEqual(["combos"]);

    go("/decks");
    expect(seen).toEqual(["combos", "decks"]);

    history.replaceState(null, "", "/app");
    window.dispatchEvent(new PopStateEvent("popstate"));
    expect(seen).toEqual(["combos", "decks", "combos"]);
    // A popstate that changes nothing the route reads does not run the work again.
    window.dispatchEvent(new PopStateEvent("popstate"));
    expect(seen).toEqual(["combos", "decks", "combos"]);
  });

  it("carries the deck id into the route it applies", async () => {
    const { startRouter, onRoute } = await load("/decks/abc%20123");
    const seen: { view: string; deckId: string | null }[] = [];
    onRoute((r) => seen.push({ view: r.view, deckId: r.deckId }));
    startRouter();
    expect(seen).toEqual([{ view: "decks", deckId: "abc 123" }]);
  });
});

describe("links inside the app shell", () => {
  it("keeps a plain click on an in-app link in the page", async () => {
    const { startRouter, spies } = await load("/app");
    startRouter();
    expect(click(document.querySelector("#to-deck")!)).toBe(true);
    expect(location.pathname).toBe("/decks/d1");
    expect(shown()).toEqual(["view-decks"]);
    expect(spies.load).not.toHaveBeenCalled();
  });

  it("leaves a modified click, a new-tab link and an in-page fragment to the browser", async () => {
    const { startRouter, spies } = await load("/app?deck=d1");
    startRouter();
    const deck = document.querySelector("#to-deck")!;
    expect(click(deck, { metaKey: true })).toBe(false);
    expect(click(deck, { ctrlKey: true })).toBe(false);
    deck.setAttribute("target", "_blank");
    expect(click(deck)).toBe(false);
    expect(click(document.querySelector("#to-stage")!)).toBe(false);
    expect(spies.push).not.toHaveBeenCalled();
  });
});

/**
 * The boundary (#287, #272 §5). Public pages and the app are different surfaces with their own
 * headers, so a pushState across them would leave the browser enforcing the page it started on.
 */
describe("the public/app boundary is a full load, never a pushState", () => {
  it("public → app: go() asks for a full load and pushes nothing", async () => {
    const { startRouter, go, spies } = await load("/combos/some-entry");
    startRouter();
    for (const url of ["/app", "/app?deck=d1", "/decks", "/decks/d1"]) {
      go(url);
      expect(spies.load).toHaveBeenLastCalledWith(`${location.origin}${url}`);
    }
    expect(spies.push).not.toHaveBeenCalled();
    expect(location.pathname).toBe("/combos/some-entry");
  });

  it("public → app: a click on a link to the app is left to the browser", async () => {
    const { startRouter, spies } = await load("/plays/some-play");
    startRouter();
    expect(click(document.querySelector("#to-deck")!)).toBe(false);
    expect(click(document.querySelector('a[href="/app"]')!)).toBe(false);
    expect(spies.push).not.toHaveBeenCalled();
  });

  /**
   * A route guard never sees a full load, so leaving the shell for a public page would drop an
   * unsaved edit with no word. The browser's own leave prompt is what is left to ask with.
   */
  it("a full load away from unsaved work raises the browser's leave prompt, and only then", async () => {
    const { startRouter, onLeave } = await load("/decks/d1");
    let dirty = true;
    onLeave(() => dirty);
    startRouter();
    const leave = () => {
      const ev = new Event("beforeunload", { cancelable: true });
      window.dispatchEvent(ev);
      return ev.defaultPrevented;
    };
    expect(leave()).toBe(true);
    dirty = false;
    expect(leave()).toBe(false);
  });

  it("app → public: go() and a click both leave the shell with a full load", async () => {
    const { startRouter, go, spies } = await load("/app");
    startRouter();
    go("/plays/some-play");
    expect(spies.load).toHaveBeenCalledWith(`${location.origin}/plays/some-play`);
    for (const href of ["/plays", "/guide", "/sources"]) {
      expect(click(document.querySelector(`.topnav a[href="${href}"]`)!), href).toBe(false);
    }
    expect(spies.push).not.toHaveBeenCalled();
    expect(location.pathname).toBe("/app");
  });
});

describe("old hash links (#287)", () => {
  it("rewrites an in-app one in place, before the route is read", async () => {
    const { redirectLegacyHash, route, spies } = await load("/#/combos?deck=d1");
    expect(redirectLegacyHash()).toBe(false);
    expect(location.pathname + location.search + location.hash).toBe("/app?deck=d1");
    expect(route().analyzing).toBe("d1");
    expect(spies.replace).not.toHaveBeenCalled();
  });

  it("keeps a deck code in the fragment", async () => {
    const { redirectLegacyHash, route } = await load("/#deck=CMAAAAA");
    redirectLegacyHash();
    expect(location.pathname + location.hash).toBe("/app#deck=CMAAAAA");
    expect(route().legacyDeck).toBe("CMAAAAA");
  });

  it("sends a public one to its page with a full load that replaces the old entry", async () => {
    const { redirectLegacyHash, spies } = await load("/#/plays/some-play");
    expect(redirectLegacyHash()).toBe(true);
    expect(spies.replace).toHaveBeenCalledWith("/plays/some-play");
    expect(spies.push).not.toHaveBeenCalled();
  });

  it("does nothing on a plain fragment", async () => {
    const { redirectLegacyHash, spies } = await load("/app#stage");
    expect(redirectLegacyHash()).toBe(false);
    expect(location.pathname + location.hash).toBe("/app#stage");
    expect(spies.replace).not.toHaveBeenCalled();
  });
});
