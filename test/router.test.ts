import { describe, expect, it } from "vitest";
import { parseHash, VIEWS } from "../web/router.js";

/**
 * The hash is the site's only durable address (#43): a link to the Guide has to open the Guide, and the
 * `#deck=<list>` links shared before the views existed have to keep opening Combos with that list. Both
 * are contracts with URLs already in the wild, so they are pinned here rather than only walked in a
 * browser. `parseHash` is pure — it never touches `location` — precisely so this test can exist.
 */
describe("the hash routes", () => {
  it("reads each of the five views", () => {
    for (const view of VIEWS) expect(parseHash(`#/${view}`).view).toBe(view);
  });

  it("falls back to Combos on an empty or unknown hash", () => {
    for (const h of ["", "#", "#/", "#/nonsense", "#/decks-of-cards"]) {
      expect(parseHash(h).view, h).toBe("combos");
    }
  });

  it("carries the saved deck id out of #/decks/<id>", () => {
    expect(parseHash("#/decks/8f3c-1").deckId).toBe("8f3c-1");
    expect(parseHash("#/decks/new").deckId).toBe("new");
    expect(parseHash("#/decks").deckId).toBeNull();
  });

  it("carries which saved deck Combos is analysing", () => {
    expect(parseHash("#/combos?deck=8f3c-1").analyzing).toBe("8f3c-1");
    expect(parseHash("#/combos").analyzing).toBeNull();
    // A deck id only means something on Combos; on another view it is not this route's business.
    expect(parseHash("#/guide?deck=8f3c-1").analyzing).toBeNull();
  });

  /**
   * The fifth view (#206). A play is a document addressed by its own slug, so `#/plays/<slug>` has to
   * survive being pasted: the four plays cross-link each other by filename, and those links are
   * rewritten to this shape at render time.
   */
  it("carries the play slug out of #/plays/<slug>", () => {
    expect(parseHash("#/plays/2026-09-12-the-unopposed-clock").playSlug).toBe("2026-09-12-the-unopposed-clock");
    expect(parseHash("#/plays").playSlug).toBeNull();
    expect(parseHash("#/plays").view).toBe("plays");
  });

  it("keeps a slug and a deck id out of each other's routes", () => {
    // Both live in the same path position; neither may be read on the other's view.
    expect(parseHash("#/plays/2026-09-12-the-unopposed-clock").deckId).toBeNull();
    expect(parseHash("#/decks/8f3c-1").playSlug).toBeNull();
  });

  it("still opens Combos with a list shared as the old #deck= link", () => {
    const list = "1 Lady of Luminosity - Starter\n3 Retreat";
    const r = parseHash(`#deck=${encodeURIComponent(list)}`);
    expect(r.view).toBe("combos");
    expect(r.legacyDeck).toBe(list);
    expect(r.deckId).toBeNull();
  });

  it("does not mistake a route for a legacy list", () => {
    expect(parseHash("#/decks").legacyDeck).toBeNull();
  });

  it("decodes an id that needed escaping", () => {
    expect(parseHash(`#/decks/${encodeURIComponent("a b/c")}`).deckId).toBe("a b/c");
  });
});
