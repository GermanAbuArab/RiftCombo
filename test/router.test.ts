import { describe, expect, it } from "vitest";
import { parseHash, VIEWS } from "../web/router.js";

/**
 * The hash is the site's only durable address (#43): a link to the Guide has to open the Guide, and the
 * `#deck=<list>` links shared before the views existed have to keep opening Combos with that list. Both
 * are contracts with URLs already in the wild, so they are pinned here rather than only walked in a
 * browser. `parseHash` is pure — it never touches `location` — precisely so this test can exist.
 */
describe("the hash routes", () => {
  it("reads each of the four views", () => {
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
