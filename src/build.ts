// Deck construction (#43). One row per rule of Riftbound's deck-building section, each carrying the
// paragraph it stands on. Every number here was opened in data/Riftbound-Core-Rules-2026-07-16.txt or
// data/Riftbound-Tournament-Rules-2026-07-16.txt and quoted verbatim in
// docs/phase0/walks/2026-09-06-deck-construction-rules.md; a row with no quote there must not exist.
//
// Pure: no DOM, no network, so it is tested the way planDeck and checkSave are.

import { deckRestrictions } from "./deck.js";
import type { CardIndex } from "./cards.js";
import type { Card, Deck, Domain, Format } from "./types.js";

/**
 * "pass" and "fail" are computed. "unknown" is a rule we can state but not check from Riot's card data —
 * no legend named, so nothing can be scoped to its Domain Identity or champion tag, or a restricted card
 * whose limit is a per-team rule rather than a copy count (103.2.d's Signature cap was one of these until
 * #103 resolved Signature by name from two independent mirrors). Showing the row and saying it is
 * unchecked beats both silence and a guess.
 */
export type BuildStatus = "pass" | "fail" | "unknown";

export interface BuildRule {
  /** Paragraph numbers, exactly as the walk cites them. */
  rule: string;
  /** What is being checked, in three or four words. */
  label: string;
  status: BuildStatus;
  /** One short sentence carrying the figure. */
  detail: string;
}

export interface BuildReport {
  rules: BuildRule[];
  /** No row failed. An "unknown" row does not make a list illegal — nobody checked it, that is all. */
  legal: boolean;
}

const total = (bag: Record<string, number>) => Object.values(bag).reduce((a, b) => a + b, 0);

export function checkBuild(deck: Deck, cards: CardIndex, format: Format): BuildReport {
  // The legend comes first because every other row is scoped to it.
  const rules: BuildRule[] = [
    legendRule(deck, cards),
    identityRule(deck, cards),
    championRule(deck, cards),
    sizeRule(deck),
    copiesRule(deck, cards),
    uniqueRule(deck, cards),
    signatureRule(deck, cards),
    runeRule(deck, cards),
    battlefieldRule(deck, cards),
    ...sideboardRules(deck, cards),
    // Last, because it is the only row that is about the tournament rather than about the deck.
    legalityRule(deck, cards, format),
  ];
  return { rules, legal: rules.every((r) => r.status !== "fail") };
}

function legendRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.1", label: "One Champion Legend" };
  if (!deck.legend) {
    return { ...base, status: "fail", detail: "This list names no legend, so nothing below can be scoped to a Domain Identity." };
  }
  const name = cards.get(deck.legend)!.name.replace(/ - Starter$/, "");
  return { ...base, status: "pass", detail: `${name} · ${cards.domainsOf(deck.legend).join(" + ")}` };
}

/**
 * 103.2 sets a FLOOR of 40 and Tournament Rules 601.1.b sets an EQUALITY - "In competitions, a player’s
 * Main Deck must be exactly 40 cards" - so a 41-card deck is legal under the Core Rules and illegal at
 * every event; Tournament Rules 104.1 gives the contradiction to the second book, and 601.1.a declares
 * the override in its own first line. 402.1 is the REGISTRATION rule ("including a chosen champion"),
 * which is a different question from the FORMAT rule, and 403.4.c makes that explicit by measuring a
 * post-sideboard deck against the format requirement. They are different rules, so the row says which
 * one a list broke rather than printing one number for both. Lines the card index did not recognise ride along: a list of 38 known cards plus 2 unknown ones
 * is not a 38-card deck, and saying "38" alone would misname the problem.
 */
export function sizeRule(deck: Deck): BuildRule {
  const base = { rule: "103.2 · Tournament Rules 601.1.b", label: "Main Deck of 40" };
  const n = total(deck.main);
  const lost = deck.unresolved.length;
  const tail = lost ? ` · ${lost} line${lost === 1 ? "" : "s"} not recognised` : "";
  if (n === 40) return { ...base, status: "pass", detail: `40 cards, Chosen Champion included${tail}` };
  if (n < 40) return { ...base, status: "fail", detail: `${n} cards — a Main Deck is at least 40 (103.2)${tail}` };
  return { ...base, status: "fail", detail: `${n} cards — a competition Main Deck is exactly 40 (Tournament Rules 601.1.b)${tail}` };
}

const COPY_CAP = 3;
/**
 * 002 — card text supersedes rules text. `VEN-097 Spiderling` prints "Your deck can have any number of
 * cards named Spiderling", which is the whole of the exception today; matching the clause rather than
 * keeping a list of codes means the next card printing it is exempt the day it ships.
 */
export const ANY_NUMBER = /can have any number of cards named/i;

/**
 * 825.3.a — "A deck can contain only one card of a given name if the card has Unique". The mirror of
 * ANY_NUMBER above: that clause caps a name UP, this one caps it DOWN to one. Matched on the printed
 * keyword for the same reason — the next card to print it is covered the day it ships, with no list of
 * codes to maintain. Three cards carry it today (SFD-190 Forgefire Cape, SFD-191 Rabadon's Deathcrown,
 * SFD-192 Shurelya's Requiem) and all three are Ornn Signature Equipment, which is exactly why the gap
 * was reachable: see `uniqueRule`.
 */
export const UNIQUE = /\[Unique\]/i;

/**
 * Copies of every name across the given bags, with the Spiderling exemption folded in once here rather
 * than at every call site. `copiesRule` (103.2.b) calls this with `[deck.main]` alone; the sideboard row
 * below (Tournament Rules 601.1.c.3 · 403.3) calls it with `[deck.main, deck.sideboard]` — same grouping, same exemption,
 * so the two counts can never drift apart. `src/builder.ts`'s `sideboardCapOf` reads the single-name
 * answer through this too, so there is exactly one place that knows what "copies of a name" means.
 */
export function copiesByName(
  cards: CardIndex,
  bags: readonly Record<string, number>[],
): Map<string, { name: string; count: number; exempt: boolean; unique: boolean }> {
  const byName = new Map<string, { name: string; count: number; exempt: boolean; unique: boolean }>();
  for (const bag of bags) {
    for (const [code, n] of Object.entries(bag)) {
      const card = cards.get(code);
      if (!card) continue;
      const prev = byName.get(card.name);
      if (prev) prev.count += n;
      else byName.set(card.name, {
        name: card.name,
        count: n,
        exempt: ANY_NUMBER.test(card.text ?? ""),
        unique: UNIQUE.test(card.text ?? ""),
      });
    }
  }
  return byName;
}

/**
 * The cap is on the MAIN DECK — "Your Main Deck can include up to 3 copies of the same named card" — and
 * on nothing else. The Rune Deck is kept separate by 103.3.b and every real list runs 6 or 12 of one rune;
 * battlefields have their own limit in 103.4.c. Counting either here would call every legal deck illegal.
 *
 * And the cap is per NAME, not per code: 103.2.b.2 says two cards of the same character are different
 * names, and the corollary is that two printings of one name are the same card — `Lux, Crownguard` is both
 * OGS-014 and VEN-SP6. The sideboard stays out of THIS row on purpose — 103.2.b is a Main Deck rule — but
 * it is not ignored: `sideboardCopiesRule` below folds it in under its own citation (Tournament Rules 601.1.c.3 · 403.3).
 */
function copiesRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.2.b", label: "Up to 3 of a name" };
  const byName = copiesByName(cards, [deck.main]);
  const over = [...byName.values()].filter((x) => !x.exempt && x.count > COPY_CAP).sort((a, b) => b.count - a.count);
  if (over.length) {
    return { ...base, status: "fail", detail: over.map((x) => `${x.count}× ${x.name}`).join(" · ") };
  }
  const exempt = [...byName.values()].filter((x) => x.exempt && x.count > COPY_CAP);
  return {
    ...base,
    status: "pass",
    detail: exempt.length
      ? `No name over three, and ${exempt.map((x) => `${x.count}× ${x.name}`).join(" · ")} is past it only because its own text says so (002).`
      : "No name appears more than three times.",
  };
}

/**
 * 825.3.a — "A deck can contain only one card of a given name if the card has Unique". A SEPARATE row
 * from 103.2.b rather than a tightening of it, because 825.3.b says the two caps are independent:
 * "If a card is a Signature card and is also Unique, then that deck can contain any combination of
 * three Signature cards, but still only one of each named Unique card." So 103.2.b keeps passing at
 * three while this fails at two, and the checklist says which rule the list actually broke.
 *
 * That sentence is why the gap was reachable at all, and it is worth stating because the corner looks
 * unreachable until you build it. All three cards printing the keyword are Ornn Signature Equipment
 * (SFD-190, SFD-191, SFD-192, all calm/mind) and the only Ornn legend is Fire Below the Mountain, also
 * calm/mind — so three copies of one of them satisfied 103.2.b (three of a name), 103.2.d.1 (three
 * Signature TOTAL, "regardless of name"), 103.2.d.2 (all carry the champion tag) and 103.1.b at once.
 * Every implemented row returned pass and `checkBuild` reported `legal: true` on an illegal deck,
 * through the `#/decks` editor. Found by the #191 orphan-neighbour probe over the keyword blocks;
 * the whole 825 block is uncited except these two paragraphs. Issue #208,
 * docs/phase0/walks/2026-09-13-keyword-subrules.md.
 *
 * The sideboard is folded in, unlike 103.2.b's row: 825.3.a says "a deck", and Tournament Rules 403.3
 * puts limits on copies of named cards on "the combination of Main Deck and sideboard" — the same
 * reasoning `sideboardCopiesRule` already applies to the cap of three. One row rather than two,
 * because the population is three cards and a second row would be noise in a player-facing checklist.
 */
function uniqueRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "825.3.a · 825.3.b", label: "One of each Unique name" };
  const byName = copiesByName(cards, [deck.main, deck.sideboard]);
  const held = [...byName.values()].filter((x) => x.unique);
  if (!held.length) return { ...base, status: "pass", detail: "No card in this list has Unique." };

  const over = held.filter((x) => x.count > 1).sort((a, b) => b.count - a.count);
  if (over.length) {
    return {
      ...base,
      status: "fail",
      detail: `${over.map((x) => `${x.count}× ${x.name}`).join(" · ")} — a Unique card is capped at one per deck (825.3.a), and being a Signature card does not lift it (825.3.b).`,
    };
  }
  return {
    ...base,
    status: "pass",
    detail: `${held.map((x) => x.name).join(", ")} ${held.length === 1 ? "is Unique and appears" : "are Unique and each appears"} once.`,
  };
}

/**
 * 103.1.b.3 and 103.1.b.4 both speak of the domains a card indicates, so a card indicating none — every
 * one of the 66 battlefield printings in the pool — is inside every identity. With no legend there is no
 * identity to break, which is a different answer from "it is broken".
 */
function identityOf(deck: Deck, cards: CardIndex): ((base: string) => boolean) | null {
  if (!deck.legend) return null;
  const identity = new Set<Domain>(cards.domainsOf(deck.legend));
  return (base) => cards.domainsOf(base).every((d) => identity.has(d));
}

const RUNE_COUNT = 12;

/**
 * One row for 103.3.a and 103.3.a.1. The identity half is reported first: when both are wrong, "your Fury
 * Rune is not in a Mind + Order deck" is the more useful of the two answers.
 */
function runeRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.3.a · 103.3.a.1", label: "12 runes in the identity" };
  const inIdentity = identityOf(deck, cards);
  const off = inIdentity
    ? Object.keys(deck.runes).filter((b) => !inIdentity(b)).map((b) => cards.get(b)?.name ?? b)
    : [];
  if (off.length) {
    return { ...base, status: "fail", detail: `${off.join(", ")} ${off.length === 1 ? "is" : "are"} outside the legend's domains (103.3.a.1).` };
  }
  const n = total(deck.runes);
  if (n !== RUNE_COUNT) return { ...base, status: "fail", detail: `${n} rune${n === 1 ? "" : "s"} — the Rune Deck is 12.` };
  return { ...base, status: "pass", detail: "12 runes, all inside the legend's domains." };
}

/**
 * Three in both of the formats this site offers: 485.4.a (1v1 Duel) and 489.4.a (2v2 Magma Chamber) both
 * read "Each player provides three (3) Battlefields, included in their deck during deck building", and
 * Tournament Rules 402.1 registers "exactly 3 battlefields each with a unique name". The number is a
 * property of the Mode of Play (103.4.a), which is why it is named here rather than assumed.
 */
const BATTLEFIELDS = 3;

function battlefieldRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.4.a · 103.4.c", label: "3 battlefields, unique names" };
  const names = new Map<string, number>();
  for (const [code, n] of Object.entries(deck.battlefields)) {
    const name = cards.get(code)?.name ?? code;
    names.set(name, (names.get(name) ?? 0) + n);
  }
  const dupes = [...names.entries()].filter(([, n]) => n > 1);
  if (dupes.length) {
    return { ...base, status: "fail", detail: `${dupes.map(([n, c]) => `${c}× ${n}`).join(" · ")} — a deck cannot hold two battlefields of the same name (103.4.c).` };
  }
  const n = total(deck.battlefields);
  if (n !== BATTLEFIELDS) return { ...base, status: "fail", detail: `${n} battlefield${n === 1 ? "" : "s"} — a deck provides 3.` };
  // "Picked at random" is true of a DUEL and false of a MATCH, which is how a tournament is played,
  // and the difference is one word in Riot's own text: 485.5 reads "Each player RANDOMLY SELECTS one
  // (1) of their three (3) Battlefields", while 486.5 reads "Each player SELECTS one (1)..." and then
  // "After this game, if a player won, the Battlefields that were used are to be removed and not
  // selected again for this Match". So in a best-of-three it is a free choice in game 1 and then a
  // REMOVAL, which is better than random in the first game and worse in the rest. CLAUDE.md corrected
  // this on 2026-09-12 for the 81 combo entries carrying the caveat; the correction never reached this
  // string, which is player-facing and was telling a tournament player the Duel rule.
  return { ...base, status: "pass", detail: "3 battlefields, all named differently. Only one reaches the board: at random in a single game (485.5), or your free choice in game 1 of a match and then removed for the rest of it (486.5)." };
}

/**
 * 103.1.b.1: "Cards included in your deck must abide by your Domain Identity", with 103.1.b.3 and
 * 103.1.b.4 as the test — a card with more than one domain "is permitted only in a Domain Identity
 * that contains all of the indicated Domains on that card". Runes have their own row (103.3.a.1), so
 * this one reads the Main Deck and the battlefields.
 *
 * The battlefields are here under 103.4.b, "Subject to Domain Identity if applicable", which is the
 * paragraph this row is implementing for that zone and which was cited nowhere in the code until now
 * — diagnosed by #187 on 2026-09-07 and unapplied since. It bites nothing today, and for a measured
 * reason rather than an assumed one: measured 2026-09-13 over all 1189 printings, the 66 battlefields
 * (66 distinct names, two of them tokens) indicate NO domain between them, so `identityOf` passes them
 * vacuously. The clause the rules themselves hedge with is "if applicable".
 */
function identityRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.1.b", label: "Domain Identity" };
  const inIdentity = identityOf(deck, cards);
  if (!inIdentity) return { ...base, status: "unknown", detail: "No legend named, so there is no Domain Identity to measure against." };
  const off = [...new Set([...Object.keys(deck.main), ...Object.keys(deck.battlefields)])]
    .filter((b) => !inIdentity(b))
    .map((b) => cards.get(b)?.name ?? b)
    .sort((a, b) => a.localeCompare(b));
  const pair = cards.domainsOf(deck.legend!).join(" + ");
  if (off.length) {
    return { ...base, status: "fail", detail: `Outside ${pair}: ${off.slice(0, 4).join(", ")}${off.length > 4 ? ` and ${off.length - 4} more` : ""}.` };
  }
  return { ...base, status: "pass", detail: `Every card sits inside ${pair}.` };
}

/**
 * Riot's gallery data has no field saying which of a card's tags is the champion, so it is derived: a tag
 * T is a champion tag when some card in the pool is named "T, <epithet>" — "Jinx, Rebel" for Jinx, which
 * is 103.2.a.2's own example. All 127 legend printings resolve to exactly one, the four carrying a
 * creature or region tag as well included (VEN-155 Heart of the Tempest is Yordle + Kennen; the champion
 * is Kennen). test/build.test.ts re-measures that over the whole pool.
 * See docs/phase0/walks/2026-09-06-deck-construction-rules.md.
 */
// Keyed by the index that asked (#134). A single global cache let the FIRST CardIndex to reach
// championTagOf decide the champion tags for the rest of the process: a small or slimmed index
// answering first left an empty set behind, and every later question about the real 1189-card pool
// came back null — 103.2.a.2 and 103.2.d.2 degrading in silence, with no error anywhere. The
// browser builds one index per page load so nothing shipped was wrong, but test/web-payload.test.ts
// already builds a trimmed index beside a full one. This is the pattern the pool caches in
// src/builder.ts use, for the same reason.
const championTagsByIndex = new WeakMap<CardIndex, Set<string>>();
const tagKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function championTagSet(cards: CardIndex): Set<string> {
  const cached = championTagsByIndex.get(cards);
  if (cached) return cached;
  const named = new Set<string>();
  for (const c of cards.cards) {
    const m = /^([^,]+),\s/.exec(c.name);
    if (m) named.add(tagKey(m[1]!));
  }
  championTagsByIndex.set(cards, named);
  return named;
}

/** The one tag on this card that names a champion, or null if it carries none. */
export function championTagOf(code: string, cards: CardIndex): string | null {
  const card = cards.get(code);
  if (!card) return null;
  const named = championTagSet(cards);
  return card.tags.find((t) => named.has(tagKey(t))) ?? null;
}

function championRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.2.a.2", label: "Chosen Champion" };
  const tag = deck.legend ? championTagOf(deck.legend, cards) : null;
  if (!tag) return { ...base, status: "unknown", detail: "Name a legend and this checks that your Chosen Champion carries its champion tag." };
  if (!deck.champion) {
    return { ...base, status: "fail", detail: `This list names no Chosen Champion. It needs one champion unit tagged ${tag}.` };
  }
  const champ = cards.get(deck.champion);
  if (!champ) return { ...base, status: "fail", detail: "The Chosen Champion line was not recognised as a card." };
  // 103.2.a.2 asks for a champion UNIT. The Legend Zone and the Champion Zone are different zones
  // (108.3), so a Champion Legend card can never fill the role however well its tag matches — and a
  // list pasted with a legend under "Champion" used to be certified legal here (#133). The click
  // path has always refused it (`setChampion` in src/builder.ts), so this makes the two agree.
  if (!champ.type.includes("unit")) {
    return {
      ...base,
      status: "fail",
      detail: `${champ.name} is a ${champ.type.join("/") || "card"}, not a champion unit, so it cannot be your Chosen Champion.`,
    };
  }
  if (!champ.tags.includes(tag)) {
    return { ...base, status: "fail", detail: `${champ.name} is not tagged ${tag}, so it cannot be this legend's Chosen Champion.` };
  }
  // 103.2.a.2's own second example is Tibbers: tagged Annie, but a Signature card, not a champion unit
  // (103.2.d.3), and therefore not a legal Chosen Champion even though the tag matches. #103 resolved
  // Signature from data/signature.src.json, so this is now checked rather than left to the player.
  if (champ.signature) {
    return {
      ...base,
      status: "fail",
      detail: `${champ.name} carries the ${tag} tag but is a Signature card, not a champion unit (103.2.d.3), so it cannot be your Chosen Champion.`,
    };
  }
  return { ...base, status: "pass", detail: `${champ.name} carries the ${tag} tag and is not a Signature card, so it is a legal Chosen Champion.` };
}

/** Exported so the editor's click-time cap (`src/builder.ts`) counts to the same number this row does. */
export const SIGNATURE_CAP = 3;

/**
 * 103.2.d caps a deck at 3 Signature cards TOTAL (103.2.d.1, "regardless of name") and requires every one
 * of them to carry the legend's champion tag (103.2.d.2). Riot's gallery API ships no Signature marker,
 * so #103 resolved it from two independent mirrors (Piltover Archive's `card.super`, dotgg's `supertype`,
 * 51 names that agree) into data/signature.src.json -> `Card.signature`.
 *
 * 103.2.d.1 does not need a legend at all — it is a raw count over the whole Main Deck — so it is checked
 * even when no legend is named. 103.2.d.2 does need one (the champion tag it compares against), so with
 * no legend this row reports the count check alone rather than falling back to "unknown" for lacking half
 * of the picture.
 */
function signatureRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.2.d", label: "Up to 3 Signature cards" };
  const held = Object.entries(deck.main)
    .map(([code, n]) => ({ card: cards.get(code), n }))
    .filter((x): x is { card: Card; n: number } => Boolean(x.card?.signature));
  const totalN = held.reduce((a, x) => a + x.n, 0);
  if (totalN > SIGNATURE_CAP) {
    return {
      ...base,
      status: "fail",
      detail: `${totalN} Signature cards (103.2.d.1 caps the deck at 3, regardless of name): ${held.map((x) => `${x.n}× ${x.card.name}`).join(" · ")}.`,
    };
  }
  const tag = deck.legend ? championTagOf(deck.legend, cards) : null;
  if (!tag) {
    return {
      ...base,
      status: "pass",
      detail: totalN
        ? `${totalN} Signature card${totalN === 1 ? "" : "s"} (103.2.d.1 OK). Name a legend to also check they carry its champion tag (103.2.d.2).`
        : "No Signature cards.",
    };
  }
  const offTag = held.filter((x) => !x.card.tags.includes(tag));
  if (offTag.length) {
    return {
      ...base,
      status: "fail",
      detail: `${offTag.map((x) => x.card.name).join(", ")} ${offTag.length === 1 ? "is" : "are"} Signature but not tagged ${tag} (103.2.d.2).`,
    };
  }
  return {
    ...base,
    status: "pass",
    detail: totalN ? `${totalN} Signature card${totalN === 1 ? "" : "s"}, all tagged ${tag}.` : "No Signature cards.",
  };
}

const SIDEBOARD_CAP = 10;

/**
 * The sideboard (#197). `checkBuild` had zero rows for `deck.sideboard`, so a list arriving already built
 * — pasted, deck-code imported, Piltover-imported — could break every sideboard rule at once and still
 * read `legal: true`. Three Tournament Rules paragraphs, none previously cited by any code in `src/`:
 *
 *   601.1.c.1  "A player's sideboard can include 10 or fewer cards."
 *   601.1.c.2  "A sideboard can consist only of valid Main Deck cards."
 *   601.1.c.3  "Limits on copies of named cards apply to the combination of main deck and sideboard."
 *   403.3      restates 601.1.c.3 in the general Sideboard section. TOURNAMENT RULES 403.3 — the
 *              Core Rules also have a 403.3 ("Apply any other cost increases or decreases as
 *              necessary"), which is one of the 52 numbers that exist in both books. Riot settles
 *              which is meant at 601.1.c.5, "See 403 for more information about sideboards", so every
 *              citation in this block is labelled rather than left to the reader.
 *
 * 601.1.c.2's "valid Main Deck card" is read narrowly here as a TYPE question — a card of one of the
 * types 103.2's own intro sentence enumerates for the Main Deck (unit, spell, gear) — the same test
 * `src/builder.ts`'s sideboard pool filter already runs at add-time (`zoneOf(card) !== "main"`). It is
 * NOT read as also demanding Domain Identity: 103.2.c states identity as a rule distinct from membership
 * type, no paragraph says a sideboard card must sit inside the deck's identity, and 601.1.c.4 only ties
 * identity to the one card a player swaps in as Chosen Champion, not to the sideboard as a whole. Ban and
 * restriction status needs no new row either — `legalityRule` below already reads `deckRestrictions`,
 * which folds `deck.sideboard` in for every format.
 *
 * 601.1.c itself opens "In competitions where a sideboard is allowed" — whether one is depends on event
 * addenda this project has no data for (the same kind of gap as 601.1.d's battlefield exceptions, out of
 * scope per #197). But neither format this tool offers is Sealed or Draft (602), whose sideboards are a
 * different shape entirely (the player's whole remaining pool, no 10-card cap) and which this tool does
 * not build decks for at all — so 601.1.c.1-.c.3 are the only sideboard rules either "constructed" or
 * "2v2" can mean here, and there is nothing format-specific left to branch on.
 *
 * A deck with no sideboard gets no rows at all rather than three trivial passes: the overwhelming
 * majority of pasted lists never register one, and three more "pass, nothing here" rows on every one of
 * them would be noise the Construction checklist does not need.
 */
function sideboardRules(deck: Deck, cards: CardIndex): BuildRule[] {
  const n = total(deck.sideboard);
  if (n === 0) return [];

  const size: BuildRule = n > SIDEBOARD_CAP
    ? { rule: "Tournament Rules 601.1.c.1", label: "Sideboard of 10 or fewer", status: "fail", detail: `${n} cards in the sideboard — a sideboard is 10 or fewer (601.1.c.1).` }
    : { rule: "Tournament Rules 601.1.c.1", label: "Sideboard of 10 or fewer", status: "pass", detail: `${n} card${n === 1 ? "" : "s"} in the sideboard, within the 10-card cap.` };

  const invalid = Object.entries(deck.sideboard)
    .map(([code, count]) => ({ card: cards.get(code), count }))
    .filter((x): x is { card: Card; count: number } => Boolean(x.card))
    .filter((x) => x.card.type.includes("legend") || x.card.type.includes("rune") || x.card.type.includes("battlefield"));
  const contents: BuildRule = invalid.length
    ? {
        rule: "Tournament Rules 601.1.c.2",
        label: "Sideboard cards only",
        status: "fail",
        detail: `${invalid.map((x) => `${x.card.name} (${x.card.type.join("/")})`).join(", ")} — a sideboard holds only Main Deck cards: units, spells and gear (601.1.c.2).`,
      }
    : { rule: "Tournament Rules 601.1.c.2", label: "Sideboard cards only", status: "pass", detail: "Every sideboard card is a unit, spell or gear — a valid Main Deck card." };

  /**
   * Domain Identity over the SIDEBOARD (#215). 103.1.b's own row reads the Main Deck and the
   * battlefields, so an off-identity sideboard card passed the checklist while the editor refused to
   * put one there — the one place the button and this report disagreed, found by the tier audit in
   * docs/phase0/walks/2026-09-13-builder-vs-checkbuild.md §7. The button was right.
   *
   * Why it is a TOURNAMENT RULES row and not part of 103.1.b's. 103.1.b.1 is "Cards included in your
   * deck must abide by your Domain Identity", and at registration a sideboard card is not in the deck:
   * Tournament Rules 601.1.b makes the Main Deck exactly 40 and 601.1.c keeps the sideboard beside it.
   * What makes an off-identity sideboard card illegal is what it is FOR — 403.4, "Sideboard cards must
   * be exchanged 1 for 1 with Main Deck cards", read with 403.4.b, "a player may not change their
   * Runes, Legend, or Battlefields at any point after deck registration". The Legend is frozen for the
   * match, so the identity the card would be swapped into is frozen with it and the swap can never be
   * legal. That is the same shape as the copies row below, which keeps 103.2.b's Main Deck cap where
   * it belongs and folds the sideboard in under 403.3 instead.
   *
   * It is a ROW of its own rather than a widening of 601.1.c.2's "valid Main Deck cards", on this
   * project's own precedent: 825.3.a got its own row rather than tightening 103.2.b, so that the
   * checklist names the rule the list actually broke. A domain is not a card type.
   *
   * WHAT IT DOES NOT CHECK, stated because its pass sentence used to imply otherwise. It read "so any
   * of them can be swapped in", which is a claim about SWAPPABILITY where the row measured only the
   * DOMAIN: `OGN-256 Fox-Fire` is calm + mind and therefore inside an Ornn identity, and 103.2.d.2
   * still forbids it, because it carries the Ahri tag and the Legend is the very thing 403.4.b
   * freezes. The sentence now says only what was measured. Whether this row should widen to the
   * champion tag, or `signatureRule` should read the sideboard as `uniqueRule` already does, is a
   * separate question with its own issue — it is what #215 answered for the identity, one rule over.
   *
   * Reported FIRST of the four, for the reason `capOf` reports identity first: no quantity of an
   * off-identity card is ever legal here, while the other three are caps.
   */
  const inIdentity = identityOf(deck, cards);
  const offIdentity = inIdentity
    ? Object.keys(deck.sideboard).filter((b) => !inIdentity(b)).map((b) => cards.get(b)?.name ?? b).sort((a, b) => a.localeCompare(b))
    : [];
  const identity: BuildRule = !inIdentity
    ? { rule: "Tournament Rules 403.4.b", label: "Sideboard inside the identity", status: "unknown", detail: "No legend named, so there is no Domain Identity to measure the sideboard against." }
    : offIdentity.length
      ? {
          rule: "Tournament Rules 403.4.b",
          label: "Sideboard inside the identity",
          status: "fail",
          detail: `Outside ${cards.domainsOf(deck.legend!).join(" + ")}: ${offIdentity.slice(0, 4).join(", ")}${offIdentity.length > 4 ? ` and ${offIdentity.length - 4} more` : ""} — a sideboard card is swapped into the Main Deck (Tournament Rules 403.4) and the Legend cannot change mid-match (403.4.b), so it could never be played.`,
        }
      : { rule: "Tournament Rules 403.4.b", label: "Sideboard inside the identity", status: "pass", detail: `Every sideboard card sits inside ${cards.domainsOf(deck.legend!).join(" + ")}.` };

  const byName = copiesByName(cards, [deck.main, deck.sideboard]);
  const over = [...byName.values()].filter((x) => !x.exempt && x.count > COPY_CAP).sort((a, b) => b.count - a.count);
  const copies: BuildRule = over.length
    ? {
        rule: "Tournament Rules 601.1.c.3 · 403.3",
        label: "Copies across Main Deck and sideboard",
        status: "fail",
        detail: `${over.map((x) => `${x.count}× ${x.name}`).join(" · ")} across Main Deck and sideboard — the cap of 3 applies to the combination (Tournament Rules 601.1.c.3 · 403.3).`,
      }
    : {
        rule: "Tournament Rules 601.1.c.3 · 403.3",
        label: "Copies across Main Deck and sideboard",
        status: "pass",
        detail: (() => {
          const exempt = [...byName.values()].filter((x) => x.exempt && x.count > COPY_CAP);
          return exempt.length
            ? `No name over three, and ${exempt.map((x) => `${x.count}× ${x.name}`).join(" · ")} is past it only because its own text says so (002).`
            : "No name exceeds 3 copies across Main Deck and sideboard combined.";
        })(),
      };

  return [identity, size, contents, copies];
}

/**
 * 103.2.e delegated to the ban list (#23). Banned fails. Restricted does NOT: it is a cap, not an illegal
 * card, and the one restricted entry on Riot's list today is a per-team limit on a legend that our data
 * does not quantify. Calling that illegal would be false.
 */
/**
 * The paragraph `legalityRule` answers to. Exported because the Combos panel (#92) shows every failing
 * row of this report EXCEPT this one — there the ban list is already drawn card by card, with the copy
 * count, the format and a link to Riot's notice, so repeating it as one sentence would say it twice.
 */
export const LEGALITY_RULE = "103.2.e";

function legalityRule(deck: Deck, cards: CardIndex, format: Format): BuildRule {
  const base = { rule: LEGALITY_RULE, label: "Legal in this format" };
  const found = deckRestrictions(deck, cards, format);
  const banned = found.filter((r) => r.entry.status === "banned");
  const restricted = found.filter((r) => r.entry.status === "restricted");
  // Every card the list is in trouble over, in one sentence, carrying the status of the worst of
  // them (#124). Returning on the first non-empty bucket dropped a restricted card the moment a
  // banned one was in the list, so a player who deleted the banned card met a second problem they
  // had never been told about.
  if (banned.length || restricted.length) {
    const parts = [
      ...banned.map((r) => `${r.entry.name} is banned`),
      ...restricted.map((r) => `${r.entry.name} is restricted`),
    ];
    const tail = restricted.length ? " A restriction is a cap, not a ban — read Riot's notice for what it limits." : "";
    return { ...base, status: banned.length ? "fail" : "unknown", detail: `${parts.join(" · ")} in this format.${tail}` };
  }
  return { ...base, status: "pass", detail: "No banned or restricted card in this list." };
}
