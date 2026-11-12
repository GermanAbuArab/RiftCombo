import { describe, expect, it } from "vitest";
import { isAppPath, legacyTarget, parseUrl, VIEW_PATHS, VIEWS } from "../web/router.js";

/**
 * Since #287 the address is a path (#272 design §2). Two contracts are pinned here because they are
 * contracts with URLs already in the wild: every path the app shell serves opens the right view, and
 * every hash link shared before #287 (`#/plays/x`, `#/combos?deck=<id>`, `#deck=<list>`) maps onto a
 * path. `parseUrl` and `legacyTarget` are pure — they never touch `location` — so this test can exist.
 */
describe("the path routes", () => {
  it("reads each of the five views from its own path", () => {
    for (const view of VIEWS) expect(parseUrl(VIEW_PATHS[view]).view, view).toBe(view);
  });

  it("reads Combos on / and on any path it does not know", () => {
    for (const p of ["/", "/app", "/nonsense", "/decks-of-cards"]) expect(parseUrl(p).view, p).toBe("combos");
  });

  it("carries the saved deck id out of /decks/<id>", () => {
    expect(parseUrl("/decks/8f3c-1").deckId).toBe("8f3c-1");
    expect(parseUrl("/decks/new").deckId).toBe("new");
    expect(parseUrl("/decks").deckId).toBeNull();
  });

  it("carries which saved deck Combos is analysing, and keeps it across an in-page fragment", () => {
    expect(parseUrl("/app?deck=8f3c-1").analyzing).toBe("8f3c-1");
    expect(parseUrl("/app").analyzing).toBeNull();
    // Under the hash router `#stage` was an unknown view and lost the id; now the fragment is not the route.
    expect(parseUrl("/app?deck=8f3c-1#stage").analyzing).toBe("8f3c-1");
    expect(parseUrl("/guide?deck=8f3c-1").analyzing).toBeNull();
  });

  it("carries the play slug out of /plays/<slug>, and keeps slug and deck id apart", () => {
    expect(parseUrl("/plays/2026-09-12-the-unopposed-clock").playSlug).toBe("2026-09-12-the-unopposed-clock");
    expect(parseUrl("/plays").playSlug).toBeNull();
    expect(parseUrl("/plays/2026-09-12-the-unopposed-clock").deckId).toBeNull();
    expect(parseUrl("/decks/8f3c-1").playSlug).toBeNull();
  });

  it("opens Combos with a list carried in the fragment, never in the query a server logs", () => {
    const list = "1 Lady of Luminosity - Starter\n3 Retreat";
    const r = parseUrl(`/app#deck=${encodeURIComponent(list)}`);
    expect(r.view).toBe("combos");
    expect(r.legacyDeck).toBe(list);
    expect(parseUrl("/decks#deck=x").legacyDeck).toBeNull();
  });

  it("decodes an id that needed escaping", () => {
    expect(parseUrl(`/decks/${encodeURIComponent("a b/c")}`).deckId).toBe("a b/c");
  });

  it("knows which paths the app shell serves; every other path is a public page", () => {
    for (const p of ["/", "/app", "/decks", "/decks/new", "/decks/8f3c-1"]) expect(isAppPath(p), p).toBe(true);
    for (const p of ["/combos", "/combos/x", "/plays", "/plays/x", "/guide", "/sources", "/about", "/privacy", "/decksx", "/application"]) {
      expect(isAppPath(p), p).toBe(false);
    }
  });
});

describe("old hash links land on the new paths (#287)", () => {
  it("maps the three link shapes named in the issue", () => {
    expect(legacyTarget("#/plays/2026-09-12-the-unopposed-clock")).toBe("/plays/2026-09-12-the-unopposed-clock");
    expect(legacyTarget("#/combos?deck=8f3c-1")).toBe("/app?deck=8f3c-1");
    expect(legacyTarget("#deck=CMAAAAA")).toBe("/app#deck=CMAAAAA");
  });

  it("maps every other old view, and an unknown one to Combos as the hash router did", () => {
    expect(legacyTarget("#/combos")).toBe("/app");
    expect(legacyTarget("#/decks")).toBe("/decks");
    expect(legacyTarget("#/decks/new")).toBe("/decks/new");
    expect(legacyTarget("#/decks/abc%20123")).toBe("/decks/abc%20123");
    expect(legacyTarget("#/plays")).toBe("/plays");
    expect(legacyTarget("#/guide")).toBe("/guide");
    expect(legacyTarget("#/sources")).toBe("/sources");
    expect(legacyTarget("#/")).toBe("/app");
    expect(legacyTarget("#/nonsense")).toBe("/app");
  });

  it("keeps the id escaped, so an id with a separator is still one id", () => {
    const id = "a&b=c d";
    expect(parseUrl(legacyTarget(`#/combos?deck=${encodeURIComponent(id)}`)!).analyzing).toBe(id);
  });

  it("never builds an address off this origin, whatever the fragment says", () => {
    for (const h of ["#//evil.example", "#/plays//evil.example", "#/decks/\\evil.example", "#/\\evil.example", "#/guide/x?deck=//e"]) {
      const target = legacyTarget(h)!;
      expect(new URL(target, "https://riftcombo.app").origin, h).toBe("https://riftcombo.app");
      expect(target, h).toMatch(/^\/(app|decks|plays|guide|sources)\b/);
    }
  });

  it("leaves a plain fragment and an empty hash alone", () => {
    for (const h of ["", "#", "#stage", "#how"]) expect(legacyTarget(h), h).toBeNull();
  });
});
