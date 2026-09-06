# Deck construction, rule by rule — what `checkBuild` may claim

Date: 2026-09-06 · Issue: #43 · Rules: Core Rules 2026-07-16, Tournament Rules 2026-07-16

Every row `src/build.ts` prints stands on a paragraph opened in
`data/Riftbound-Core-Rules-2026-07-16.txt` or `data/Riftbound-Tournament-Rules-2026-07-16.txt` and quoted
here verbatim. A row with no quote below is a row that must not ship.

---

## 1. One Champion Legend — 103.1

> 103.1.                1 Champion Legend
>
> 103.1.a.                       This is placed in the Legend Zone at the start of the game.

What the row checks: the list names a legend, and prints its two domains, because every other row is
scoped to them.

What it cannot check: `normalizeDeck` keeps the last legend line it sees, so a list naming two legends
looks like a list naming one. The row does not claim otherwise.

---

## 2. Domain Identity — 103.1.b

> 103.1.b.                       This will dictate the Domain Identity of the deck.
>
> 103.1.b.1.                              Cards included in your deck must abide by your Domain Identity.
>
> 103.1.b.2.                              Your deck's Domain Identity is dictated by the domains of your Champion Legend.
>                                         In the default card frame, these domains appear as symbols in the legend's upper
>                                         left corner.
>
> 103.1.b.3.                              If a card has a single Domain, then that card is permitted in the Domain Identity
>                                         that corresponds to the same Domain.
>
> 103.1.b.4.                              If a card has more than one Domain, then that card is permitted only in a Domain
>                                         Identity that contains all of the indicated Domains on that card.

A card that indicates **no** domain is inside every identity: b.3 and b.4 both speak of the domains a card
indicates, and there are none to fail. Every battlefield in the pool is such a card — measured 2026-09-06,
all 66 battlefield printings in `data/cards.json` carry `domains: []`. This is why the row must not blame
The Grand Plaza for being outside Mind + Order.

103.1.b.5 (game effects that add cards to a deck irrespective of their domains) is not modelled: no card in
the pool does it today.

---

## 3. Chosen Champion — 103.2.a.2

> 103.2.a.2.                              Must be a champion unit with a champion tag that matches the tag on your
>                                         Champion Legend.
>                                                 Example: Loose Cannon has the tag Jinx. Therefore, a player could choose
>                                                 Jinx, Rebel or Jinx, Demolitionist as their Chosen Champion, because they
>                                                 also have the tag Jinx.
>
>                                                  Example: Tibbers has the tag Annie, but it is a signature unit, not a
>                                                  champion unit. It cannot be your Chosen Champion, even if your
>                                                  Champion Legend has the tag Annie.

What the row checks: the Chosen Champion is a card carrying the legend's champion tag.

**What it cannot check, and says so in its own words:** the rule's second example is exactly the case our
data cannot see. `OGS-018 Tibbers` is `type: ["unit"]`, `tags: ["Annie"]` in `data/cards.json` — nothing
distinguishes it from a champion unit, because Riot's gallery API ships no signature marker (see §5). The
row therefore passes a Tibbers-shaped Chosen Champion and prints the caveat rather than claiming more than
it knows.

---

## 4. Main Deck size — 103.2 and Tournament Rules 402.1

> 103.2.                A Main Deck of at least 40 cards: A Chosen Champion Unit, as well as Units, Gear, and Spells

> 402.1.             In a constructed event, players must register a Main Deck of exactly 40 cards (including a
>                    chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name.

These are not the same number. The Core Rules set a floor; a registered list is exactly 40. The row fails
below 40 citing 103.2's "at least 40", and fails above 40 citing 402.1's "exactly 40", so a casual 41-card
list is not told it broke a rule it did not break.

The Chosen Champion counts inside the 40 — 402.1 says "including a chosen champion", and `normalizeDeck`
already adds it to `deck.main`.

Lines the card index did not recognise are reported alongside the count instead of being silently dropped:
a list that is 38 recognised cards plus 2 unknown lines is not a 38-card deck, and saying "38" without the
tail would be a lie about which rule was broken.

---

## 5. Copies of a name — 103.2.b, and 002

> 103.2.b.                       Your Main Deck can include up to 3 copies of the same named card.
>
> 103.2.b.1.                              This includes your Chosen Champion.
>                                                   Example: A deck could include Volibear, Furious as its Chosen Champion
>                                                   and still include 2 more copies of Volibear, Furious in their Main Deck.
>
> 103.2.b.2.                              Cards have different names even if they represent the same character.
>                                                 Example: A deck could include 3 copies of Yasuo, Remorseful and 3 copies
>                                                 of Yasuo, Windrider, because they have different names.

> 002.     Card text supersedes rules text. Whenever a card fundamentally contradicts the rules, the card's
>          indication is what is true.

The cap is on the **Main Deck** and on nothing else — the rule's own first six words say so. Runes and
battlefields are out:

> 103.3.b.                       Must be shuffled and kept separate from the Main Deck.

Every legal list runs 6 or 12 copies of one rune name, and battlefields have their own limit in 103.4.c, so
a check that swept all three bags would call every legal deck illegal. It did, on the first run — the
reference list in `test/build.test.ts` failed on `6× Mind Rune` before the loop was narrowed to
`deck.main`. That is the test earning its place.

The cap is also per **name**, not per code. 103.2.b.2 says so from the other side — two cards of the same
character are different names — and the corollary is what matters here: two printings under different
codes are the same name and count together. `Lux, Crownguard` is both `OGS-014` and `VEN-SP6`. The check
therefore keys on `Card.name`.

`VEN-097 Spiderling` prints, in `data/corpus_flat.txt`:

> Your deck can have any number of cards named Spiderling.

002 makes the card win, so the row exempts it. It looks for that sentence in the card's own text rather
than keeping a hard-coded list, so a future card printing the same clause is exempt the day it ships.

---

## 6. Signature cards — 103.2.d — STATED, NOT CHECKED

> 103.2.d.                       Your deck may only contain 3 total Signature cards that have the same Champion tag as
>                                your Champion Legend.
>
> 103.2.d.1.                               Regardless of name, a deck may only contain a sum total of 3 Signature cards.
>
> 103.2.d.2.                               All of the Signature cards must have the Champion tag that corresponds to the
>                                          Champion Legend of the deck.
>
> 103.2.d.3.                               Signature cards are not Champion units and cannot be placed in the Champion
>                                          Zone.

Riot's gallery API ships no Signature flag. Measured 2026-09-06:

```
$ grep -oci signature data/cards_full.json
0
$ node -e '…cards.filter(c => c.tags.some(t => /signature/i.test(t))).length'
0
```

So the row states the rule, reports `unchecked`, and stops. A heuristic here would sit next to eight
computed rows and read like one of them; the project's standing rule is that the panel answers only what is
computable, and this is not.

This is also what limits §3: with no Signature marker there is no way to enforce 103.2.a.2's Tibbers
example either.

---

## 7. Rune Deck — 103.3.a and 103.3.a.1

> 103.3.a.                       12 Rune Cards
>
> 103.3.a.1.                               Cards in the Rune Deck must be of the Domain Identity of your Champion
>                                          Legend.

One row: twelve runes, all inside the legend's two domains. The identity half is checked first, because
"11 runes" is a less useful answer than "your Fury Rune is not in a Mind + Order deck" when both are true.

---

## 8. Battlefields — 103.4.a, 103.4.c, 485.4.a, 489.4.a, TR 402.1

> 103.4.a.                       The number will be dictated by your Mode of Play.
>
> 103.4.b.                       Subject to Domain Identity if applicable.
>
> 103.4.c.                       Cannot include more than one of a Battlefield of the same name when there are more than
>                                one required for the deck.

The number is three in both of the formats this site offers:

> 485.4.a.                        Each player provides three (3) Battlefields, included in their deck during deck building. Only
>                                 1 will be used, chosen during setup.

> 489.4.a.                         Each player provides three (3) Battlefields, included in their deck during deck building.

485 is 1v1 (Duel), 489 is 2v2 (Magma Chamber). The row therefore does not branch on the format.

Unique names is 103.4.c and, independently, Tournament Rules 402.1 ("exactly 3 battlefields each with a
unique name"). Both are quoted above.

Worth stating in the detail because players get it wrong: only one of the three reaches the board, and it
is picked at random.

> 485.5.              Setup: Each player randomly selects one (1) of their three (3) Battlefields. The other two are removed
>                     and will not be used for this game. The selected Battlefields are placed simultaneously in the
>                     Battlefield Zone.

---

## 9. Format legality — 103.2.e

> 103.2.e.                       Subject to card legality of the Format being played.

Delegated to `deckRestrictions(deck, cards, format)`, which #23 already built and tested.

A **banned** card fails the row. A **restricted** card does not: restricted is a cap, not an illegal card,
and the one restricted entry on Riot's list today (`OGS-019 Wuju Bladesman - Starter`, 2v2 only, since
2026-07-24) is a limit our data does not quantify. That row reports `unchecked` and points at the
Banned and restricted panel, which already renders the two differently.

---

## What the champion tag is, and how it is derived

Riot's data has no field saying which of a card's tags is the champion. `OGN-247 Daughter of the Void` is
tagged `["Kai'Sa"]`; `VEN-155 Heart of the Tempest` is tagged `["Yordle", "Kennen"]`, and only one of those
two is a champion.

The derivation: a tag `T` is a champion tag when some card in the pool is named `T, <epithet>` —
"Lux, Illuminated" for `Lux`, "Jinx, Rebel" for `Jinx`, which is 103.2.a.2's own example. Measured
2026-09-06 across all 1189 printings in `data/cards.json`: **all 127 legend printings resolve to exactly
one** such tag, the four with two or three tags included (`VEN-155` → `Kennen`, `VEN-192*` Curator of the
Sands, tagged `Dog, Shurima, Nasus` → `Nasus`).

`test/build.test.ts` re-measures this over the whole pool, so a set that broke the derivation would fail
the build rather than mislabel a legend — the same shape of invariant as `reviewedCount` in
`data/synergies.json`.

---

## Order of the rows

`103.1` → `103.1.b` → `103.2.a.2` → `103.2 · TR 402.1` → `103.2.b` → `103.2.d` → `103.3.a · 103.3.a.1` →
`103.4.a · 103.4.c` → `103.2.e`.

The legend comes first because everything else is scoped to it; format legality comes last because it is
the one row that is about the tournament rather than about the deck. `103.2.e` sitting out of numeric order
is deliberate and pinned by a test.

---

## #103 — Signature stopped being unknown

The walk above (`signatureRule()`, `championRule()`) left 103.2.d fully `unknown` and half of 103.2.a.2
unchecked because Riot's gallery API carries no Signature marker at all — `grep -oci signature
data/cards_full.json` was 0, and no card in `data/cards.json` had a Signature tag either.

Two independent mirrors closed the gap on 2026-09-06: Piltover Archive's `api/external/v1/cards` (field
`card.super`) and dotgg's `api.dotgg.gg/cgfw/getcards?game=riftbound&mode=indexed` (column `supertype`)
each list Signature cards, and they agree by name — Piltover Archive's 51 and dotgg's 55 differ only by
four `(Spiritforged Nexus Night Promo)` reprints of names already in the 51 (Tibbers, Highlander, Final
Spark, Decisive Strike), which Riot's own gallery does not carry as separate cards at all. The 51 names
went into `data/signature.src.json`, transcribed the same way `data/legality.src.json` transcribes bans —
names only, with `source` and `accessed` — and `scripts/build-cards.mjs` resolves each to exactly one base
code, failing the build if a name resolves to zero or to more than one. It emits `Card.signature: boolean`.

Verified against the whole pool on 2026-09-06: all 51 resolve to a single base (12 OGN, 4 OGS, 15 SFD, 12
UNL, 8 VEN), 3 are units, 4 are Equipment gear, the rest are spells, and every one carries exactly one
champion tag (using the same derivation as the section above) — pinned by `test/build.test.ts`.

`checkBuild` now scores two rules that were previously `unknown`:

- **103.2.d** — 103.2.d.1 caps the whole Main Deck at 3 Signature cards **regardless of name**, which is
  a raw count and needs no legend at all, so it is checked even when the list names none. 103.2.d.2 (every
  Signature card must carry the legend's champion tag) does need a legend for the tag to compare against;
  with none named, the row still reports the 103.2.d.1 count rather than falling back to `unknown` for
  having only half the picture — Core Rules text does not gate the count on a legend being named, so
  neither does this row.
- **103.2.a.2** — 103.2.d.3 ("Signature cards are not Champion units and cannot be placed in the Champion
  Zone") is now checked on the Chosen Champion: a card tagged correctly but carrying `signature: true`
  fails, which is 103.2.a.2's own worked example — Tibbers, tagged Annie, cannot be Dark Child's Chosen
  Champion even though the tag matches.

## Links

- Spec: `docs/superpowers/specs/2026-09-05-my-decks-design.md`
- Plan: `docs/superpowers/plans/2026-09-06-my-decks-plan.md`
- Data anomalies (`OGN-235 Karma, Channeler` is tagged `Vi`, which is Riot's own error and is registered,
  not normalised): `docs/data-anomalies.md`
- #103: `data/signature.src.json`, `scripts/build-cards.mjs`, `src/build.ts`
