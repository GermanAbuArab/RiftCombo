export type Domain = "fury" | "calm" | "mind" | "body" | "chaos" | "order";
/**
 * The card types, as a RUNTIME list — the FOURTH in this file after `SOURCE_KINDS`, `ZONES` and
 * `COMBO_KEYS`, which stops being a coincidence and starts being the rule: **nothing this project
 * authors is ever WRITTEN in TypeScript.** Cards, combos and synergies are all authored as JSON and
 * read through an unchecked cast, so a compile-time union is never applied to the values it
 * describes and only a runtime list can refuse a wrong one.
 *
 * The immediate need is `Synergy.partner.types`, which nothing validated: `src/synergies.ts` reads
 * it straight into a filter, so a mistyped type would silently match NOTHING rather than fail —
 * and a rule stamped in the same edit would carry the mistake as its reviewed baseline.
 */
export const CARD_TYPES = ["unit", "spell", "legend", "gear", "battlefield", "rune"] as const;
export type CardType = (typeof CARD_TYPES)[number];
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
  /** Core Rules 133.7.b supertype. Not in Riot's gallery data; resolved by name from
   *  data/signature.src.json in scripts/build-cards.mjs (#103). */
  signature: boolean;
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
/**
 * What a piece DOES in the line. A RUNTIME list with the type derived from it — the FIFTH in this
 * file after `SOURCE_KINDS`, `ZONES`, `COMBO_KEYS` and `CARD_TYPES`, and it is here because it was
 * the one this file had already stated the rule for and then left behind: the docblock three lines
 * below says *"nothing this project authors is ever WRITTEN in TypeScript"*, and `IngredientRole`
 * sat directly above it as a compile-time union anyway.
 *
 * The cost was not hypothetical and it reached a player. `role: "multiplier"` was authored on THREE
 * `uses` rows and is not a member of this union; nothing checked, because no `Ingredient` is ever
 * written in TypeScript — they are authored in `data/combos.json` and arrive through an unchecked
 * cast in `src/load.ts`. `web/main.ts` renders `u.role` straight into the route card's sub-line, so
 * three entries showed a reader *"multiplier"* where every other entry using the same card showed
 * *"engine"*.
 *
 * The three were NORMALISED rather than the union EXTENDED, and the catalogue settled that rather
 * than anybody's taste: across the pool's three trigger multipliers the convention is
 * `UNL-029` engine 11 / multiplier 2, `UNL-087` engine 20 / multiplier 0, `OGN-236` engine 10 /
 * multiplier 1 — forty-one rows to three, and the most-used of the three is `engine` in all twenty.
 * A category the catalogue wanted would not lose 41 to 3 on its own best-covered card.
 *
 * Found by cross-tabbing roles and reading a cell of size ONE. That is the argument for reading the
 * small cells: the defect is never in the big ones, because a big cell is a convention.
 */
export const INGREDIENT_ROLES = [
  "engine",
  "enabler",
  "payoff",
  "resource",
  "ready",
  "battlefield",
  "legend",
] as const;
export type IngredientRole = (typeof INGREDIENT_ROLES)[number];
/**
 * Where a piece has to be for the line to work. A RUNTIME list with the type derived from it, for
 * the reason `SOURCE_KINDS` below is one: a union that exists only at compile time is checked only
 * where a value is WRITTEN in TypeScript, and no `Ingredient` ever is — they are authored in
 * `data/combos.json` and arrive through an unchecked cast in `src/load.ts`.
 *
 * That is not hypothetical here. `ATTACHED` was in use on 24 `uses` rows across 22 entries, every
 * one an Equipment on a carrier, while this union declared eight members and not that one, and
 * nothing anywhere noticed — the identical failure `SOURCE_KINDS` records for `video`, which sat in
 * the catalogue 54 times undeclared. `validateCombos` now walks every zone against this list.
 *
 * `ATTACHED` IS AN ON-BOARD ZONE and a checker written from the name alone would get that wrong:
 * 718.5.b keeps an attached card a legal target *while attached*, and 719.5 detaches it only when
 * the Top-Most Card leaves the board. So anything counting what a deck has standing must treat it
 * as present, not as a non-board zone like `TRASH` or `DECK`.
 */
export const ZONES = [
  "BOARD", "BATTLEFIELD", "BASE", "HAND", "TRASH", "DECK", "LEGEND", "CHAMPION", "ATTACHED",
] as const;
export type Zone = (typeof ZONES)[number];

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

/**
 * The kinds a source can carry. A runtime list, and the type is derived from it, because a union that
 * exists only at compile time is checked only where a source is WRITTEN in TypeScript — and none are:
 * they are authored in `data/combos.json` and arrive through a JSON import. `video` (the deck-tech
 * transcripts of #46 and #62) sat in the catalogue 54 times without ever being declared here, and
 * nothing said so. `test/combos.test.ts` walks every source in the catalogue against this list.
 */
export const SOURCE_KINDS = ["riot", "tournament-report", "article", "agent", "manual-walk", "video"] as const;
export type SourceKind = (typeof SOURCE_KINDS)[number];

export interface Source {
  title: string;
  kind: SourceKind;
  url?: string;
  date?: string;
  /** Verbatim passage this entry stands on, transcribed from the source itself. */
  quote?: string;
  /** Date somebody on this project opened the url and read the quote there. */
  accessed?: string;
}

/**
 * A body the line needs that NO CARD CAN SUPPLY BY NAME — the schema half of the defect class found
 * on 2026-09-13 (#165 repair, rc-synth2's two ALT_WINs, rc-gap's sweep).
 *
 * An entry's prose kept stating a requirement its own `uses` did not name — *"Get three of your
 * units onto The Grand Plaza"*, *"Have a friendly unit at a battlefield besides the Apothecary"* —
 * so `matchDeck` reported the line COMPLETE for a board that cannot run it and `planDeck` could
 * never say what was missing. Verified through the matcher: a deck of `3x UNL-044` and one
 * `OGN-293`, **with no units in it at all**, came back with `flurry-of-feathers-grand-plaza-win`
 * included, and the site's word for that is *"you win the game"*.
 *
 * `CLAUDE.md`'s rule is *"a body the condition requires is a use at quantity 1, role `enabler`"*,
 * and the #165 repair did exactly that. It cannot work here: The Grand Plaza counts ANY seven
 * units, and `UNL-088 Gutter Palace` prints *"exactly 4 cards in hand and exactly 4 units at
 * battlefields"* naming no card at all — so pinning named bodies into `uses` would invent a
 * decklist and make the entry match only the decks holding those cards. `Ingredient` is keyed on a
 * base code and has no way to say "any N bodies". This is that missing way.
 *
 * WHAT IT DELIBERATELY DOES NOT MODEL. Many of these requirements are RELATIONAL — *"besides the
 * Apothecary"*, *"a spare unit"*, *"at a different location"*, *"wherever the fight is going to
 * be"* — and none of them is a `Zone`. (Four of the first eleven read; **11 of the 82 notes carry a
 * relational phrase as of 2026-09-13**, and a count is dated here because the durable half is the
 * decision, not the number.) There is no field for them and that is a decision, not an
 * omission: **the matcher reads a DECKLIST, never a board**, so it cannot know where a body stands
 * or which card it is standing beside, and a structured field nothing can read is the
 * phrase-in-a-notable defect again with a JSON key on it. The relation lives in `note`, verbatim,
 * where a reader can check it. For the same reason there is no `zone`: it would carry *"at a
 * battlefield"* and silently drop *"besides me"*, which reads as if the zone were the whole
 * requirement.
 *
 * AND THERE IS NO SEVERITY FLAG, and the reason is a rule rather than a tally: **a body that is not
 * required is not a requirement.** A `blocking: false` would mean *a requirement that is not
 * required*, and it would hand the next author a switch to defuse the check.
 *
 * The evidence is corroboration, not the argument, and it is dated: the first eleven entries were
 * read one by one and in every one the missing body is the whole line rather than tempo —
 * `OGN-108 Convergent Mutation` says *"another friendly unit"* in its own text, `434.1.g` makes the
 * Aphelios cycle's re-attach do nothing without a second carrier, and
 * `svellsongur-faefolk-mass-evacuation` produces no `conquer-engine` at all. Nothing found since
 * (82 entries as of 2026-09-13) has been a tempo case. And the catalogue already has the right home
 * for one:
 * `sprite-queen-dusk-rose-lab-shard-undoing` says outright that its second body *"is a deckbuilding
 * choice, not a requirement"*, in prose. A `blocking: false` would mean "a requirement that is not
 * required" and would hand the next author a switch to defuse the check — the defect returning with
 * permission.
 */
export interface BodyRequirement {
  /**
   * Unit CARDS the line needs beyond the ones in `uses`, for ONE execution.
   *
   * THIS IS A DECK-CONTENT NUMBER AND NEVER A BOARD-STATE CLAIM, and the two are different axes
   * that a single integer cannot carry. A `note` may state an EXACTNESS condition about the board —
   * `gutter-palace` is count 1 and quotes *"exactly 4 cards in hand and exactly 4 units at
   * battlefields"* — and that is not a shortfall this number could ever express: you need one unit
   * CARD because a token cannot take a battlefield (355.2.a), and you need exactly four BODIES
   * there when the check fires. Measured over the 82 declaring the field: 7 notes carry an
   * exactness marker and, read one by one, TWO state a board-state exactness of their own
   * (`gutter-palace`, `shadow-dash-eye-of-twilight-dragged-attacker-tank`) — the other five are the
   * opponent's garrison, an explicit *"at least"*, or damage arithmetic.
   *
   * NO SEPARATE FIELD FOR IT. An `exact: boolean` would conflate the axes rather than separate
   * them: the count would still be a deck number while the flag described the board, and the next
   * author would have to guess which one the flag qualified. What the rendering owes instead is to
   * NAME ITS AXIS, which is why the diagram badge says UNIT CARDS and not MORE UNITS — a badge that
   * can be read as a board instruction is one that can be followed into breaking the line.
   *
   * Tokens the line's own cards play are already netted out by the author: `flurry-of-feathers-grand-plaza-win` needs
   * seven at the Plaza, `UNL-044` supplies four Birds, and the count here is 3. A rate statement
   * (*"repeat on a DIFFERENT unbuffed Might-4 body"*) is not a requirement and does not raise it.
   */
  count: number;
  /**
   * The requirement in the entry's own words, quoted rather than paraphrased. `apothecary-
   * pridestalker-buff`'s is *"Have a friendly unit at a battlefield besides the Apothecary you are
   * about to play"* — a board precondition with no counting word in it, which three separate
   * machine predicates missed and a reader found. A normalised paraphrase is exactly what loses the
   * cases a regex could not see in the first place, so this field carries the sentence.
   */
  note: string;
}

/**
 * Every key an entry may carry, as a RUNTIME list — the third place in this file that has needed
 * one, after `SOURCE_KINDS` and `ZONES`, and for the identical reason: no `Combo` is ever WRITTEN
 * in TypeScript, so the interface below is never applied to the values it describes. `src/load.ts`
 * reads `data/combos.json` through an unchecked cast, and an EXTRA key is the one shape a cast
 * cannot notice at all — a missing key at least breaks a reader eventually.
 *
 * That is not hypothetical. `spinning-axe-factory-recall-inactive-temporary` carried a TOP-LEVEL
 * `notable` of seven values, byte-identical to its own `prerequisites.notable`, absent from this
 * interface, and read by nothing in `src/`, `web/`, `scripts/` or `test/`. It was inert and it was
 * invisible, and it was found only because a guard that walks every string path enumerated it.
 *
 * TWO FIELDS OF THE SAME NAME AT DIFFERENT LEVELS IS THE CONDITION THAT MAKES GUARDS AND REPAIRS
 * MISS, so the schema's job here is to REFUSE the misplacement rather than to document it. A reader
 * wanting to know where a notable belongs has one answer, `prerequisites.notable`, and no second
 * place to wonder about.
 */
export const COMBO_KEYS = [
  "id", "name", "class", "status", "uses", "needs", "produces", "removes", "legends", "anyBodies",
  "prerequisites", "steps", "netPerIteration", "terminatesIn", "sources", "rulesVersion", "notes",
] as const;

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
  /** Optional: bodies the line needs that no card in `uses` supplies. See `BodyRequirement`. */
  anyBodies?: BodyRequirement;
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
  /**
   * Merged `anyBodies` of every combo this variant flattens. `count` is the MAX rather than the
   * sum, for the same reason `generateVariants` merges card multisets with `max()`: the same
   * physical bodies serve both halves of a line within one turn. `notes` keeps every contributing
   * sentence, because the reader has to be able to check each one against its own entry.
   */
  anyBodies?: { count: number; notes: string[] };
}

export interface Deck {
  legend: string | null;
  champion: string | null;
  battlefields: Record<string, number>;
  runes: Record<string, number>;
  main: Record<string, number>;
  sideboard: Record<string, number>;
  /**
   * Lines the card index did not recognise, kept as written so a save gives them back (#135). The
   * `section` is the header they appeared under: without it every unrecognised line came back under
   * "Main Deck", so a misspelling in a sideboard silently moved into the deck on save and reload.
   */
  unresolved: { raw: string; count: number; section?: string }[];
}

export type SynergyStatus = "rule-verified";

/**
 * Predicate over the card pool. Every field is required to hold at once. `textMatches` runs
 * against the card's rules text and, for Equipment, the text it grants the unit it is attached to —
 * that second half is where Trinity Force keeps "When I hold, score 1 point".
 */
export interface SynergyPartner {
  /**
   * JavaScript regular expression source, applied to the card's rules text and, for Equipment, the
   * text it grants the unit it is attached to. Optional: a tribal rule has no text signature at all
   * (Mega-Mech is a Mech with no rules text), so `tags` alone may carry the predicate.
   */
  textMatches?: string;
  /** Regular expression that disqualifies a card `textMatches` caught. */
  textExcludes?: string;
  /** Card types a partner may have. Omitted means any type. */
  types?: CardType[];
  /** Card tags a partner must carry, e.g. ["Mech"]. A card carrying any one of them passes. */
  tags?: string[];
  /** Equipment only: the Might it grants on attaching must be at least this. */
  minMightBonus?: number;
  /**
   * Printed Energy cost floor. 206 makes a "costs N or more" clause read the PRINTED cost (its own
   * worked example is Lux, Illuminated), so this reads `energy` straight off cards.json and a card
   * that prints no Energy at all never matches.
   */
  minEnergy?: number;
  /** Printed Power cost floor, same reading of 206 as `minEnergy`. */
  minPower?: number;
  /** Base codes read out of the match list by hand, each with the reason it does not belong. */
  excludes?: { card: string; why: string }[];
}

/**
 * Every key a synergy rule and its nested objects may carry. The argument is the one `COMBO_KEYS`
 * makes and it applies here WORD FOR WORD: 220 rules authored by hand as JSON, read through an
 * unchecked cast, so AN EXTRA KEY IS THE SHAPE NOTHING CAN NOTICE — a missing one at least breaks a
 * reader eventually, while a misplaced one sits there inert. `combos[].notable` proved that on the
 * other file: seven values at the wrong level, byte-identical to the right level, invisible for days.
 *
 * THE NESTED LISTS EARN THEIR KEEP MORE THAN THE TOP-LEVEL ONE HERE, because `partner` is where a
 * typo is silent AND consequential: `textExclude` for `textExcludes` would simply not exclude
 * anything, the match list would be wider than intended, and a rule stamped in the same edit would
 * carry that as its reviewed baseline — the exact failure `reviewedSet` exists to catch, arriving
 * through a door it cannot watch.
 *
 * Built from a census of the keys actually in use plus these interfaces, never from memory: 10 rule
 * keys all universal, 8 partner keys, 3 basis keys, 2 exclude keys.
 */
export const SYNERGY_KEYS = [
  "id", "name", "anchor", "partner", "why", "basis", "status", "reviewed", "reviewedCount", "reviewedSet",
] as const;
export const SYNERGY_PARTNER_KEYS = [
  "textMatches", "textExcludes", "types", "tags", "minMightBonus", "minEnergy", "minPower", "excludes",
] as const;
export const SYNERGY_BASIS_KEYS = ["readings", "rules", "combos"] as const;
export const SYNERGY_EXCLUDE_KEYS = ["card", "why"] as const;

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
  /**
   * How many partners the predicate caught on that date. The build fails when the live count
   * differs, which is what turns "somebody read it once" into an invariant a new set cannot erode.
   * A count cannot see a swap that leaves the total unchanged, and THE COMPENSATION WRITTEN HERE IS
   * ONLY HALF OF ONE. *"Sets only add cards, and the one thing that removes one — an errata
   * rewriting card text — is already gated by the find-string in `data/errata.json`"* is true and it
   * is entirely CARD-SIDE. It says nothing about a PREDICATE-side swap, which is the commoner change
   * in this repo: 220 rules are authored by hand here, and an edit to `partner.textMatches` that
   * drops one member and admits another leaves `reviewedCount` correct, `reviewed` untouched, and
   * every check in the tree green. Demonstrated in memory rather than argued — nothing anywhere
   * stores the SET, only its size (220 rules, 5,475 reviewed partners).
   *
   * The fix is cheap and is not this field's to make: a stable fingerprint of the sorted base codes
   * alongside the count would close it, and that is a `data/synergies.json` schema change. Filed
   * rather than built. What this docblock owed was to stop presenting the card-side half as the
   * whole guarantee.
   */
  reviewedCount: number;
  /**
   * A fingerprint of the reviewed match list, which pins it by IDENTITY where `reviewedCount` pins
   * it only by SIZE (#219). The count above catches a list that GROWS or SHRINKS and is blind to a
   * SWAP — a predicate edit that drops one member and admits another leaves it correct, `reviewed`
   * untouched, and every check in the tree green. Measured before this field existed: 220 rules,
   * 5,475 reviewed partners, and nothing anywhere stored the set.
   *
   * The two together CLASSIFY the drift rather than merely detecting it, which is what an author
   * needs: a different SIZE is a widening or a shrink, which a new set legitimately causes and which
   * is usually accepted by re-reading and restamping; the same size with a different fingerprint is
   * a SWAP, which is always a predicate change and always has to be read. `validateSynergies` says
   * which of the two it is and prints the value to paste.
   *
   * FNV-1a over the sorted base codes, eight hex characters — the largest list in the file is 106
   * and `test/synergies.test.ts` caps a rule at 150, so nothing here needs a real hash. A collision
   * would hide ONE swap in ONE rule at about 2^-32 per check, which is the stated cost of not
   * storing 5,475 base codes in the file.
   */
  reviewedSet: string;
}
