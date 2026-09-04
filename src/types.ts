export type Domain = "fury" | "calm" | "mind" | "body" | "chaos" | "order";
export type CardType = "unit" | "spell" | "legend" | "gear" | "battlefield" | "rune";
export type Format = "constructed" | "2v2";

export interface Card {
  id: string;
  /** Short code as used by deck codes: "OGN-212", "UNL-079a", "SFD-227*", "VEN-R01", "UNL-T01" */
  code: string;
  /** Code without the alt-art suffix: "UNL-079a" -> "UNL-079" */
  base: string;
  variant: string;
  publicCode: string;
  name: string;
  set: string;
  collectorNumber: number;
  type: CardType[];
  rarity: string | null;
  domains: Domain[];
  energy: number | null;
  power: number | null;
  might: number | null;
  mightBonus: number | null;
  /** Rules text (the gear's own text for Equipment). */
  text: string | null;
  /** Equipment only: text granted to the equipped unit ("I" = that unit). */
  effect: string | null;
  tags: string[];
  orientation: string;
  artist: string | null;
  image: string | null;
  errata?: { effective: string; source: string }[];
}

export interface LegalityEntry {
  format: Format;
  entity: CardType;
  name: string;
  codes: string[];
  bases: string[];
  status: "banned" | "restricted";
  since: string;
  source: string;
}

export type ComboClass = "INFINITE" | "BURST" | "CHAIN" | "ALT_WIN" | "ENGINE";
export type ComboStatus = "verified" | "candidate" | "refuted";
export type IngredientRole = "engine" | "enabler" | "payoff" | "resource" | "ready" | "battlefield" | "legend";
export type Zone = "BOARD" | "BATTLEFIELD" | "BASE" | "HAND" | "TRASH" | "DECK" | "LEGEND" | "CHAMPION";

export interface Ingredient {
  /** Base card code (no alt-art suffix). */
  card: string;
  /** Copies the combo needs. Multiset semantics: a deck with fewer copies is "missing" the difference. */
  quantity: number;
  role: IngredientRole;
  zone?: Zone;
  state?: string;
  note?: string;
}

export type FeatureStatus = "STANDALONE" | "HELPER" | "HIDDEN";

export interface Feature {
  id: string;
  name: string;
  status: FeatureStatus;
  uncountable: boolean;
  description?: string;
}

export interface Source {
  title: string;
  kind: "riot" | "tournament-report" | "article" | "agent" | "manual-walk";
  url?: string;
  date?: string;
  /** Verbatim passage this entry stands on, transcribed from the source itself. */
  quote?: string;
  /** Date somebody on this project opened the url and read the quote there. */
  accessed?: string;
}

/** AUTHORED. One entry per reviewed combo. Combos compose through needs/produces into a DAG. */
export interface Combo {
  id: string;
  name: string;
  class: ComboClass;
  status: ComboStatus;
  uses: Ingredient[];
  /** Feature ids this combo requires from another combo (e.g. "infinite-energy"). */
  needs: string[];
  produces: string[];
  removes?: string[];
  /** Optional: only these legends (base codes) work, e.g. a Signature requirement. */
  legends?: string[];
  prerequisites: { easy: string[]; notable: string[] };
  steps: string[];
  netPerIteration?: string;
  terminatesIn: string;
  sources: Source[];
  rulesVersion: string;
  notes?: string;
}

/** GENERATED. A flattened path through the combo DAG: concrete cards, what it produces. */
export interface Variant {
  id: string;
  comboIds: string[];
  /** base code -> copies required */
  cards: Record<string, number>;
  produces: string[];
  class: ComboClass;
  status: ComboStatus;
  /** Union of ingredient domains. Length > 2 means no legend can run it. */
  domains: Domain[];
  legends?: string[];
}

export interface Deck {
  legend: string | null;
  champion: string | null;
  battlefields: Record<string, number>;
  runes: Record<string, number>;
  main: Record<string, number>;
  sideboard: Record<string, number>;
  unresolved: { raw: string; count: number }[];
}

export type SynergyStatus = "rule-verified";

/**
 * Predicate over the card pool. Every field is required to hold at once. `textMatches` runs
 * against the card's rules text and, for Equipment, the text it grants the unit it is attached to —
 * that second half is where Trinity Force keeps "When I hold, score 1 point".
 */
export interface SynergyPartner {
  /** JavaScript regular expression source, applied to text + Equipment effect text. */
  textMatches: string;
  /** Regular expression that disqualifies a card `textMatches` caught. */
  textExcludes?: string;
  /** Card types a partner may have. Omitted means any type. */
  types?: CardType[];
  /** Equipment only: the Might it grants on attaching must be at least this. */
  minMightBonus?: number;
  /** Base codes read out of the match list by hand, each with the reason it does not belong. */
  excludes?: { card: string; why: string }[];
}

export interface SynergyBasis {
  /** Rules readings from issue #11 this rule leans on, e.g. "R1". */
  readings?: string[];
  /** Core Rules paragraph numbers, checked against data/Riftbound-Core-Rules-2026-07-16.txt. */
  rules: string[];
  /** Ids in combos.json this pattern was extracted from. Empty means it stands on the rules alone. */
  combos: string[];
}

/**
 * AUTHORED RULE, TEXT-MATCHED INSTANCES — a weaker guarantee than a Combo and it must be shown as
 * one. The rule itself was walked by hand once against card text and the Core Rules, exactly like a
 * combo. The cards it pairs the anchor with come from running `partner` over the pool: nobody
 * walked those pairs one by one. Never merge these into combos.json.
 */
export interface Synergy {
  id: string;
  name: string;
  /** Base code of the one card that anchors the pattern. */
  anchor: string;
  partner: SynergyPartner;
  /** What the pair does, in one sentence. */
  why: string;
  basis: SynergyBasis;
  status: SynergyStatus;
  /** Date somebody on this project read this rule's whole match list, card by card. */
  reviewed: string;
}
