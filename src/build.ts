// Deck construction (#43). One row per rule of Riftbound's deck-building section, each carrying the
// paragraph it stands on. Every number here was opened in data/Riftbound-Core-Rules-2026-07-16.txt or
// data/Riftbound-Tournament-Rules-2026-07-16.txt and quoted verbatim in
// docs/phase0/walks/2026-09-06-deck-construction-rules.md; a row with no quote there must not exist.
//
// Pure: no DOM, no network, so it is tested the way planDeck and checkSave are.

import type { CardIndex } from "./cards.js";
import type { Deck, Format } from "./types.js";

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
  const rules: BuildRule[] = [legendRule(deck, cards), sizeRule(deck)];
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
