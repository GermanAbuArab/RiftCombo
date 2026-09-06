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
    signatureRule(deck, cards),
    runeRule(deck, cards),
    battlefieldRule(deck, cards),
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
 * 103.2 sets a floor of 40; Tournament Rules 402.1 registers exactly 40 "including a chosen champion".
 * They are different rules, so the row says which one a list broke rather than printing one number for
 * both. Lines the card index did not recognise ride along: a list of 38 known cards plus 2 unknown ones
 * is not a 38-card deck, and saying "38" alone would misname the problem.
 */
export function sizeRule(deck: Deck): BuildRule {
  const base = { rule: "103.2 · Tournament Rules 402.1", label: "Main Deck of 40" };
  const n = total(deck.main);
  const lost = deck.unresolved.length;
  const tail = lost ? ` · ${lost} line${lost === 1 ? "" : "s"} not recognised` : "";
  if (n === 40) return { ...base, status: "pass", detail: `40 cards, Chosen Champion included${tail}` };
  if (n < 40) return { ...base, status: "fail", detail: `${n} cards — a Main Deck is at least 40 (103.2)${tail}` };
  return { ...base, status: "fail", detail: `${n} cards — an event registers exactly 40 (Tournament Rules 402.1)${tail}` };
}

const COPY_CAP = 3;
/**
 * 002 — card text supersedes rules text. `VEN-097 Spiderling` prints "Your deck can have any number of
 * cards named Spiderling", which is the whole of the exception today; matching the clause rather than
 * keeping a list of codes means the next card printing it is exempt the day it ships.
 */
export const ANY_NUMBER = /can have any number of cards named/i;

/**
 * The cap is on the MAIN DECK — "Your Main Deck can include up to 3 copies of the same named card" — and
 * on nothing else. The Rune Deck is kept separate by 103.3.b and every real list runs 6 or 12 of one rune;
 * battlefields have their own limit in 103.4.c. Counting either here would call every legal deck illegal.
 *
 * And the cap is per NAME, not per code: 103.2.b.2 says two cards of the same character are different
 * names, and the corollary is that two printings of one name are the same card — `Lux, Crownguard` is both
 * OGS-014 and VEN-SP6. The sideboard stays out, as it does everywhere else on this site.
 */
function copiesRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.2.b", label: "Up to 3 of a name" };
  const byName = new Map<string, { name: string; count: number; exempt: boolean }>();
  for (const [code, n] of Object.entries(deck.main)) {
    const card = cards.get(code);
    if (!card) continue;
    const prev = byName.get(card.name);
    if (prev) prev.count += n;
    else byName.set(card.name, { name: card.name, count: n, exempt: ANY_NUMBER.test(card.text ?? "") });
  }
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
  return { ...base, status: "pass", detail: "3 battlefields, all named differently. Only one reaches the board, picked at random (485.5)." };
}

/**
 * 103.1.b.1: cards included in your deck must abide by your Domain Identity. Runes have their own row
 * (103.3.a.1), so this one reads the Main Deck and the battlefields.
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
let championTags: Set<string> | null = null;
const tagKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function championTagSet(cards: CardIndex): Set<string> {
  if (championTags) return championTags;
  const named = new Set<string>();
  for (const c of cards.cards) {
    const m = /^([^,]+),\s/.exec(c.name);
    if (m) named.add(tagKey(m[1]!));
  }
  championTags = named;
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

const SIGNATURE_CAP = 3;

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
