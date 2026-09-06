// Deck construction (#43). One row per rule of Riftbound's deck-building section, each carrying the
// paragraph it stands on. Every number here was opened in data/Riftbound-Core-Rules-2026-07-16.txt or
// data/Riftbound-Tournament-Rules-2026-07-16.txt and quoted verbatim in
// docs/phase0/walks/2026-09-06-deck-construction-rules.md; a row with no quote there must not exist.
//
// Pure: no DOM, no network, so it is tested the way planDeck and checkSave are.

import type { CardIndex } from "./cards.js";
import type { Deck, Domain, Format } from "./types.js";

/**
 * "pass" and "fail" are computed. "unknown" is a rule we can state but not check from Riot's card data —
 * a Signature cap with no Signature marker in the gallery, a restricted card whose limit is a per-team
 * rule rather than a copy count. Showing the row and saying it is unchecked beats both silence and a guess.
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

export function checkBuild(deck: Deck, cards: CardIndex, _format: Format): BuildReport {
  const rules: BuildRule[] = [legendRule(deck, cards), sizeRule(deck), copiesRule(deck, cards), runeRule(deck, cards)];
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
function sizeRule(deck: Deck): BuildRule {
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
const ANY_NUMBER = /can have any number of cards named/i;

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
