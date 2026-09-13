# `Combo.anyBodies`, and the three sweeps around it (rc-schema, 2026-09-13)

The schema half of the defect rc-gap swept: **an entry's prose states a requirement its own `uses`
does not supply**, so `matchDeck` reports the line COMPLETE for a board that cannot run it and
`planDeck` can never name what is missing. Reproduced through the matcher before anything was
built — a list of `3x UNL-044` and one `OGN-293` **with no units in it at all** came back with
`flurry-of-feathers-grand-plaza-win` INCLUDED, `3x UNL-088` came back with `gutter-palace`, and a
**ONE-CARD** deck holding only `SFD-214` came back with `power-nexus-rune-recycle-any-identity`.
Two of the three are ALT_WIN, so the sentence the site puts in front of that player is *"you win the
game"*.

Shipped: `df5de99` (mechanism), `341ecd7` (rc-manager7 applied 27 of 28 rows), `2410030` (ratchet to
zero), `b67dcdf` (the diagram, with rendered-output tests).

---

## 1. WHY THE #165 REPAIR COULD NOT BE REUSED

`CLAUDE.md`'s rule is *"a body the condition requires is a use at quantity 1, role `enabler`, not a
phrase in a notable"*, and that is exactly what the #165 cross-audit did to
`shen-kinkou-svellsongur-hold`. It works when the requirement NAMES a card. It cannot work here:
`OGN-293 The Grand Plaza` counts ANY seven units, and `UNL-088 Gutter Palace` prints *"if you have
exactly 4 cards in hand and exactly 4 units at battlefields, you win the game"* naming no card at
all. Pinning named bodies into `uses` would invent a decklist and make the entry match only the decks
holding those cards. `Ingredient` is keyed on a base code and has no way to say "any N bodies".

**Two members, `count` and `note`, and the two things it does NOT have are the design.**

**No zone and no relation field.** Four requirements are relational — *"besides the Apothecary"*, *"a
spare unit"*, *"at a different location"*, *"wherever the fight is going to be"* — and none is a
`Zone`. The matcher reads a DECKLIST and never a board, so a structured field for that is the
phrase-in-a-notable defect with a JSON key on it. A `zone` alone would carry *"at a battlefield"* and
silently drop *"besides me"*, which reads as if the zone were the whole requirement.

**No severity flag.** A body that is not required is not a requirement, and the catalogue already has
the right home for one and uses it: `sprite-queen-dusk-rose-lab-shard-undoing` says in prose that its
second body *"is a deckbuilding choice, not a requirement"*. A `blocking: false` would mean *a
requirement that is not required* and would hand the next author a switch to defuse the check.

**`count` merges with `max()`, not `sum()`**, matching the card multiset merge in `generateVariants`
and for the stated reason — the same physical bodies serve both halves within a turn — so a composed
variant is never easier than its hardest half, which is the direction `worst()` moves `status` in.
The requirement is also part of the variant dedupe key, or a cheap flattening would hide a dearer one
over the same cards.

**The check is deliberately weak and says so** (`src/bodies.ts`): it can only ask whether the list
holds `count` unit cards beyond the ones the line commits. Nearly vacuous on a real deck, decisive on
the three above. Tokens are not counted, because reading token production out of card text is the
instrument that under-reported its own supply in rc-gap's sweep — the author nets them out when they
write the count, which is why `flurry` needs seven at the Plaza, `UNL-044` supplies four Birds, and
the authored count is 3.

---

## 2. PREDICATE E, THE SHIPPED RATCHET: IT READS THE RULES, NOT THE PROSE

Predicates A, B and C all read HOW AN AUTHOR PHRASED SOMETHING; each needed three or four narrowings
and each still carries a false-positive taxonomy, and the sharpest case was invisible to all three —
`apothecary-pridestalker-buff` opens *"Have a friendly unit at a battlefield besides the
Apothecary"*, with no counting word in it. A human found that one by reading.

- **190.1** — *"Control is established over Battlefields through the course of play"* — you take a
  battlefield by walking a body onto it (144.4.a), and **323.6** strips Control the moment your last
  body leaves. So a line whose payoff sits on a battlefield it must CONTROL requires a unit.
- **190.6.d** blanks only the WORD *"you"*: *"If the battlefield has no Controller, 'you' refers to
  no one, and all such instructions are ignored."* A battlefield printing neither *"you"* nor
  *"your"* needs no Controller. That is the ONE narrowing and it did not have to be invented —
  `CLAUDE.md` already records that 26 of the 64 non-token battlefields print no *"you"*.

**Numbers with the predicate stated beside them**, because this investigation moved a count four
times by changing one: of 766 entries, **112** use no unit and declare no `needs`, **32** of those use
a battlefield, **18** use one whose text matches a word-boundary `your?` over text plus effect.
rc-gap's own run of the same idea reported 27 and 14 — a different predicate, and neither is wrong,
but nobody should quote 14 against the shipped test.

**A TOKEN CARVE-OUT WOULD BE A BUG, and the three rows E found that were on nobody's list are the
proof.** `grand-plaza-recruit-vanguard`, `arise-sand-soldiers-plaza` and
`vanguard-armory-dusk-rose-lab-altar-draw` all PLAY unit tokens — the obvious narrowing — and all
three are exposed anyway, because **355.2.a** plays a token to *"the controller's Base or a
battlefield the controller controls"*. **A token can hold ground it already has and can never take
it.** `arise-sand-soldiers-plaza` says it out loud in its own step 2: *"Take control of The Grand
Plaza with ANY BODY and keep it"*, with no unit in `uses`.

The test pinned at 18 on the day it shipped and at **0** once the rows landed, lowered in the same
commit per the rule this repo applies to its other ratchet. **A zero ceiling has a failure mode the
75-style one does not** — a count of DEFECTS that can only go down says nothing if the predicate
quietly stops matching — so the same `describe` also FLOORS the count of REPAIRS at 27. That number
reads the FIELD where the ceiling reads the PREDICATE, so the two ratchet in opposite directions and
a silent failure of either surfaces in the other.

---

## 3. SHAPE 3, A NAMED CARD THE `uses` OMITS: **CLEAN**, AND THE BOUNDARY IS THE FINDING

`.scratch-schema/named-cards.mjs`, base codes, no prose judgement: 4,283 step strings hold **208**
resolvable base codes; **165** survive dropping tokens, legends and runes; **50** survive dropping
what `uses` or the `needs` chain already supplies; **4** survive requiring an imperative within 60
characters; **2** survive dropping a negated clause — **and both are conditional on reading**
(*"**if** the deck runs [Level] cards, play UNL-151 BEFORE drawing"*; *"add UNL-092 or UNL-094 **if**
the ladder is slow"*).

`.scratch-schema/named-by-name.mjs`, by NAME rather than code, which is where a miss could hide: 766
distinct multi-word non-legend names, **1,836** occurrences in steps, **69** not supplied by `uses`
or `needs`, **ZERO** with an imperative in front. A zero that large is a confident empty, so it was
not written down — all 69 were dumped with their preceding text and READ. Every one is an
alternative, an example, an OPPONENT'S card, a rules citation or a comparison; **32 of the 69 carry
the base code immediately before the name**, so the house style writes both and the code half had
already swept them.

**THE DEFECT CLASS IS BOUNDED BY NAMEABILITY.** A card an entry NAMES is a card its author put in
`uses`. The defect lives exactly where the requirement names NO card — which is what `anyBodies`
covers, and it is why the #165 shape does not recur.

---

## 4. SHAPE 4, A REQUIRED RESOURCE: **ONE ENTRY**, AND MOST OF THE SHAPE IS NOT DECK-CHECKABLE

**161.2.a** fixes the Rune Deck at exactly 12 and `checkBuild` already scores it, so *"four runes on
the board"* is a question of TURNS and not of deckbuilding; a trash fills itself. **XP is the one
resource that is the exact analogue of a body**: **730.2** makes you HAVE it before you spend it,
**824.1.d** switches a `[Level N]` rung off below the threshold, and **823.1.c.1** makes a faucet a
CARD.

Swept (`.scratch-schema/xp-requirement.mjs`): **30** distinct card names grant XP; **52** entries
spend XP or stand on a `[Level]` rung; **19** have no faucet in `uses` or their `needs` chain; all
nineteen were read and **eighteen are an upgrade, an alternative, a rules quotation or a card being
discussed** — `conscription-signpost-empty-garrison` says *"OR the same plus 5 XP"*,
`viktor-leader-safety-inspector-symmetric-kill` says *"WITHOUT paying the 3 XP"*, and
`energy-conduit-honeyfruit-off-turn-energy` works at 0 XP with the 6-XP mode as a better rate.

**THE ONE: `monch-skyward-strike-stun-discount`.** Step 1 IS the requirement — *"Bank 6 XP and do not
spend it (824.1.d, 730.2)"* — and its own `terminatesIn` says *"the whole thing is dark below six
XP"*. `uses` is `UNL-035 Monch` and `UNL-038 Skyward Strike`; Monch is a cost reduction and Skyward
Strike's `[Level 6]` is a CONSUMER of XP, so neither is a faucet.

**`anyBodies` was NOT widened for it, and the measurement is why.** Naming one faucet in `uses`
over-constrains: mono-Calm prints **five** non-legend XP faucets — Herald of Spring, Wuju Apprentice,
Mosstomper, Scuttle Crab, Gardens of Becoming — plus the legends Voidreaver and Keeper of the Hammer,
so pinning one would make `matchDeck` report MISSING Scuttle Crab at a deck running Mosstomper, which
is a different lie. Generalising the field to a kind/count/note triple is the only honest mechanism,
and **a schema axis at a population of ONE is a knob nobody asked for.** Recommendation on the record:
state it in that entry's `prerequisites.notable`, and generalise only if a second instance lands — at
which point it is one edit, because `count` and `note` carry over unchanged.

---

## 5. THE MIRROR SWEEP, AND IT EXPLAINS THE ONE ROW THAT WAS OVERRULED

`uses` is what the matcher and the planner PRICE, so the inverse defect is a `uses` row the prose
never uses: it makes every deck one card further from the line than it is — **a false MISSING where
`anyBodies` fixed a false COMPLETE.**

`.scratch-schema/unused-uses.mjs`: 1,898 `uses` rows, 115 legends skipped by design (a legend is the
`legends` and `prerequisites.easy` channel). **86 → 49 → 35 → 20 → 18** across five instrument
fixes, every one of which this project has paid for before:

1. a 6-character minimum on the name head reported **Jhin, Ahri, Vi and Fizz** as unmentioned;
2. `\bJhin\b` does not match **"Jhins"** — the plural is a word character, so the boundary is not
   there, and `jhin-emperors-divide-hidden` writes *"Jhins A, B, C"* throughout;
3. a card referred to by its **TAG** — `gemdragon-henge-vi-blind-fury` writes *"six 5 Might
   Dragons"* and never *"Blazing Scorcher"*, which is how a walker writes a line standing on six
   interchangeable bodies;
4. the **epithet** after the comma, which is the `resolveName` family `CLAUDE.md` already records —
   an author writes *"Brambleback"*, *"Industrialist"*, *"Reveler"*;
5. a trailing `\b` needs a word character in front of it, so **`Arise!`, `Guards!` and `Daisy!`**
   never matched the entries that play them.

**NO MATCHER DEFECT SURVIVED — every one of the 18 is genuinely used — AND THE RESIDUE IS THE
FINDING. 15 of the 18 are UNITS**, ten of them in the generic roles `enabler` and `resource`. So the
unnamed `uses` rows and the unstated `anyBodies` requirements **are the same objects seen from
opposite sides**: a body that is not the point of a line gets recorded in exactly one of the two
places, in `uses` but not in the prose, or in the prose but not in `uses`.

**`irelia-fervent-forgotten-signpost-choose` is in BOTH populations and that is the proof.** rc-gap
read its prose — *"Keep a third unit at a different location"* — and concluded a body was missing
from `uses`. rc-manager7 read its `uses` and found `OGN-044 Clockwork Keeper` already there, and
overruled the row. **Both readings are right.** The entry's actual defect is that its prose never
names the Keeper, which is precisely why the prose reads as if a third body were needed. The row was
not a false positive; it was a PROSE defect detected from the wrong end.

---

## 6. WHAT IS NOT CHECKED, STATED SO NOBODY INHERITS IT AS CHECKED

- The **relational** half of every requirement — *"besides the Apothecary"*, *"at a different
  location"* — is displayed and never verified. `matchDeck` reads a decklist, not a board.
- The `note` is asserted **verbatim and at a sentence boundary** at staging time
  (`.scratch-schema/stage.mjs`) and by nothing afterwards. A reword in `data/combos.json` can drift
  from the step it was cut from.
- Predicate E is one shape of one defect class. `gutter-palace` is NOT in its population, because
  `UNL-088` is a GEAR — E and the prose predicates are complementary and neither subsumes the other.
- `scripts/web-card-fields.mjs` needs nothing and this was checked rather than assumed: that list
  projects CARD records for the fetched `data/cards.json`, while combos reach the browser through an
  esbuild JSON import of the whole file at `web/main.ts:1`, which is why `terminatesIn` and `notes`
  already render in the drawer while appearing in no field list.
