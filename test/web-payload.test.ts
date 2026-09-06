import { describe, expect, it } from "vitest";
import { CardIndex } from "../src/cards.js";
import { loadCardIndex, loadSynergies } from "../src/load.js";
import { partnersOf } from "../src/synergies.js";
// @ts-expect-error plain .mjs shared with scripts/build-web.mjs, which cannot import TypeScript.
import { slimCard, WEB_CARD_FIELDS } from "../scripts/web-card-fields.mjs";

const cards = loadCardIndex();
const synergies = loadSynergies();

/**
 * The browser gets a slimmed card record. A field src/ reads at match time that the projection
 * drops fails ONLY in the browser and passes every test here, because node loads the whole file:
 * that is exactly how the Mech rules of #27 shipped reading `tags` while the payload had none, and
 * the deployed site threw on any deck. These tests run the real predicates against the real
 * projection, so the next dropped field fails the build instead of the site.
 */
describe("the card payload the browser downloads", () => {
  // No legality entries: partnersOf never reads them, and the ban list is applied a layer up.
  const slim = new CardIndex(cards.cards.map((c: unknown) => slimCard(c)), []);

  it("matches every synergy rule to exactly the same cards as the full record", () => {
    for (const s of synergies) {
      expect(partnersOf(s, slim).map((c) => c.base), s.id).toEqual(partnersOf(s, cards).map((c) => c.base));
    }
  });

  it("carries every field a rule can read", () => {
    for (const f of ["type", "domains", "text", "effect", "tags", "mightBonus"]) {
      expect(WEB_CARD_FIELDS, `${f} is read by src/synergies.ts`).toContain(f);
    }
  });
});
