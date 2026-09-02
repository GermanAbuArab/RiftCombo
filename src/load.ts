// Node-only loaders. The browser bundle constructs the same classes from fetched JSON instead.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CardIndex } from "./cards.js";
import type { Card, Combo, Feature, LegalityEntry } from "./types.js";

const DATA = join(dirname(fileURLToPath(import.meta.url)), "..", "data");
const read = <T>(file: string): T => JSON.parse(readFileSync(join(DATA, file), "utf8")) as T;

export function loadCardIndex(): CardIndex {
  const cards = read<{ cards: Card[] }>("cards.json");
  const legality = read<{ entries: LegalityEntry[] }>("legality.json");
  return new CardIndex(cards.cards, legality.entries);
}

export function loadCombos(): { combos: Combo[]; features: Feature[] } {
  return {
    combos: read<{ combos: Combo[] }>("combos.json").combos,
    features: read<{ features: Feature[] }>("features.json").features,
  };
}
