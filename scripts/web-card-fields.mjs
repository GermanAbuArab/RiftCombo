// Fields the browser payload keeps. The full card record carries more (artist, rarity, id, errata)
// and shipping it would double the download for nothing.
//
// EVERY field src/ reads while matching has to be in this list. One that is not fails ONLY in the
// browser, and silently in every test, because node loads data/cards.json whole: the Mech synergy
// rules of #27 read `tags`, which was missing here, and the deployed site threw on any deck.
// test/web-payload.test.ts pins that by running the predicates against this projection.
export const WEB_CARD_FIELDS = [
  "code", "base", "variant", "name", "set", "collectorNumber",
  "type", "domains", "energy", "power", "might", "mightBonus",
  "text", "effect", "tags", "image", "orientation",
];

/** Project one full card record onto the fields the browser gets. */
export const slimCard = (c) => Object.fromEntries(WEB_CARD_FIELDS.map((k) => [k, c[k]]));
