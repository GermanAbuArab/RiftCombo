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
- ~~The `note` is asserted verbatim at staging time and by nothing afterwards.~~ **CLOSED the same
  day** (`d68ef02`): `test/body-requirements.test.ts` now requires every note to contain a verbatim
  run of 20+ characters from its own entry's prose or from card text, and floors the share of
  FULLY verbatim notes at 85% (95% today). The shape was chosen by measurement rather than guessed —
  78 of 82 are 100% verbatim, the four that are not are a card citation and three counts rc-manager7
  appended arithmetic to, and the ratios run 17% to 100%, so a percentage floor would have been
  wrong. **Its limit is stated in the test**: a note that quotes twenty characters and invents the
  rest would pass.
- Predicate E is one shape of one defect class. `gutter-palace` is NOT in its population, because
  `UNL-088` is a GEAR — E and the prose predicates are complementary and neither subsumes the other.
- `scripts/web-card-fields.mjs` needs nothing and this was checked rather than assumed: that list
  projects CARD records for the fetched `data/cards.json`, while combos reach the browser through an
  esbuild JSON import of the whole file at `web/main.ts:1`, which is why `terminatesIn` and `notes`
  already render in the drawer while appearing in no field list.

---

## 7. PREDICATES G AND H, AND THE ONE RULE THAT DECIDES EVERY FUTURE ROW

E is blind twice over. **485.4.a** has each player bring three battlefields from the deck, so a line
can turn on a Conquer or a Hold and name none of them; and E keys on ZERO units, so a line that
holds one body and needs two is invisible to it. Both gaps were real and both were productive. All
three predicates now ship in `test/body-requirements.test.ts` rather than living in a gitignored
directory — a predicate nobody can run twice is a predicate nobody runs twice.

**G — a card whose own text needs a unit you control, with no unit in `uses`.** One paragraph:
**818.1.c.2**, *"Equip is functionally short for '[Cost]: Attach this gear to a unit you control.'"* — **a unit you control** is the whole clause
So an Equipment line with no body requires one BY THE KEYWORD'S OWN DEFINITION, and the same holds
for a card acting on a friendly unit or scoring on a Conquer or a Hold (469.1, 469.2, 190.1). Read
entry by entry: **31 fresh rows, 29 exposed, 2 refused.**

**THE TOKEN EXCLUSION IS CORRECT FOR G AND WRONG FOR E, AND ONE RULE SEPARATES THEM.** 355.2.a plays
a token to *"the controller's Base or a battlefield the controller CONTROLS"* — a token can HOLD
ground you already took and can never TAKE it, so E has no exclusion and its three novel rows all
mint tokens and are all exposed anyway. 818.1.c.2 asks only for a unit you control, and 185.2.d
makes a token follow all rules for its type, so a token IS a legal carrier and G must exclude.
`blade-ruined-king-detach-recovery` is the case, and it is emphatic: it mints three Recruits with
the Vanguard Armory and its [Equip] even KILLS one, citing 185.2.d in its own step.

**H — a line that holds ONE body and needs TWO**, on the card's own words: *another*, *other*, *a
different* unit you control. **203** entries hold exactly one unit copy, **15** use such a card,
**8 are exposed**. Two are worth stating alone: `SFD-180 Fiora, Worthy` is printed **Might 5**, so
709's own second example makes her unable to become Mighty and the crossing body can never be the
unit in `uses`; and `UNL-056 Yuumi, Magical Cat` grants +3 Might and [Tank] to *"one of your OTHER
units here"* while being **Might 1** herself, so she can be neither the Tank nor a survivor of it —
and her Might 1 also puts her in `OGN-133 Flurry of Blades` range, **the hole #203 found on the
other Yuumi entry, reached from a completely different direction.**

**THE RULE THAT DECIDES EVERY FUTURE ROW, and it came out of H's refusals rather than its hits:
IS THE BODY BEING SPENT, OR ASKED FOR?**

- An **EFFECT** that wants another friendly unit is **NOT** a requirement. **055.1** and
  **359.3.e.11** ignore an impossible instruction, so it simply fizzles. `SFD-132 Beast Below` prints
  *"When you play me, return another friendly unit and an enemy unit to their owners' hands"* with no
  *"you may"* — and its entry calls that *"accepting its ETB"*, i.e. a drawback the line is better
  off failing to pay.
- A **COST** that wants one **IS**. **203.3** makes an impossible cost unpayable, so the card cannot
  legally be PLAYED. Swept the whole pool for an additional cost spending a unit with no *"you may"*
  (356.2.b.1 is what makes the optional ones declinable): **four printings** — Meditation is
  optional, Cruel Patron is itself a unit, Sacrifice wants a MIGHTY one and no zero-unit entry plays
  it — leaving `UNL-142 Heedless Resurrection` and **exactly two entries**. That is the hardest
  refusal in the class: not a line that fails, a card stuck in hand.

`heedless-resurrection-removal-blank` carries a second, narrower reason the body must be a real unit
CARD: a token CAN pay the cost (185.2.d) but 185 and 186.1 stop one ever reaching the trash, so the
*"play a unit from your trash"* half would find nothing. **The cost half and the payoff half of one
card disagree about tokens.**

The four refusals that share a rule of their own: `blade-dancer-irelia-defiant-dance`,
`annie-fiery-piercing-light-bonus-per-instance` and `arcane-shift-zaunite-bouncer-two-choices-one-card`
all have an *"another unit"* that is an ENEMY; `jae-medarda-repulse-counter-that-pays-for-itself`
needs the exact opposite, its step 2 requiring the opponent to choose Jae *and no other friendly
unit*. Two more run on `UNL-041 Allay`'s OWN printed [Deflect], which one of them states in its own
step 3.

**THE INSTRUMENT FAILED SIX TIMES ACROSS THESE SWEEPS AND FIVE ARE TRAPS THIS PROJECT ALREADY
RECORDS.** A 6-character minimum on a name head; `\bJhin\b` not matching *"Jhins"*; a card named by
its TAG (*"six 5 Might Dragons"*); the epithet after the comma; a trailing `\b` needing a word
character in front of it, so **`Arise!`, `Guards!` and `Daisy!` match nothing** — that one is new.
And the sixth: `\bunit token\b` not matching *"unit tokenS"*, **which is the plural trap a second
time, in a different script, by the same author, an hour later.** The staging extractor caught two
more of my own keys where I retyped an em-dash as a hyphen, and its sentence-start guard rejected a
correct note because this catalogue opens sentences with rule numbers — **a guard that rejects
correct work is a guard people route around**, so it was widened rather than worked around.

Both new ratchets are pinned at today's count for the reason E was, and **the population floors are
not the real guard**: at zero a population floor says nothing about whether a regex still matches.
So each predicate is **pinned against named cards** chosen because each one broke something —
`UNL-188` for [Equip], `SFD-168` for the plural, `UNL-056` for *"other units"*, `OGN-044` and
`OGN-293` as negatives. Proved out of band by corrupting the predicate and watching it name itself.

---

## 8. THE CLASS IS CLOSED, AND THE MAP IS THE RESULT

Every shape of *"an entry states a requirement its own `uses` does not supply"* has now been swept.
Four of the six came back empty or near-empty, and **a measured empty is a full result** — it says
the catalogue is sound in that direction and it stops the next session re-deriving it.

| Shape | Population | Verdict |
|---|---|---|
| A body the prose states, `uses` omits | 65 entries | **`Combo.anyBodies`**, all repaired |
| A named CARD in prose, `uses` omits | 208 codes + 1,836 name occurrences in steps | **CLEAN** — bounded by nameability |
| A `uses` row the prose never names | 1,898 rows → 18 | **CLEAN** — no matcher defect; 15 of 18 are units |
| XP | 52 entries spend it, 19 with no faucet | **ONE** (`monch-skyward-strike-stun-discount`) |
| A banked resource (Power, runes, trash) | 60 entries mention one | **ZERO deck-checkable** |
| A card CATEGORY (`[Hidden]`) | 3 flagged | **TWO** genuine, 1 discussion |

**Why the banked-resource row is zero rather than unswept.** 161.2.a fixes the Rune Deck at exactly
twelve and 315.3.b channels two a turn, so *"eleven Power banked"* is a question of TURNS and not of
deckbuilding; a trash fills itself; and the rune SPLIT is a build decision `checkBuild` already
scores. None of the sixty is a thing a decklist could fail to supply, so none can be a matcher
defect. That is a property of the resource, not of the entries, which is why it did not need reading.

**The two `[Hidden]` cases are the same shape one noun across, and they are un-nameable for the same
reason.** `katarina-reckless-hidden-burn` and `frigid-jewel-mushroom-pouch-second-card` both instruct
you to hide a card and neither's `uses` carries one; 811.1.b asks for a facedown card and names none,
exactly as The Grand Plaza counts any seven units. Naming one would over-constrain by the width of
the pool: **46 printings carry the keyword, and even inside one domain it is 9 distinct names in
Mind, 11 in Chaos, 6 in Calm.** `brynhir-lockout-window` is the third flag and is discussion — its
step 3 says opponents play *no card from [Hidden]*, the opposite of an instruction to hide one.

**`anyBodies` was NOT widened for XP or for `[Hidden]`, and the reasoning is the same both times.**
Three instances across two different nouns is not a schema axis; generalising `count` and `note` into
a kind/count/note triple is one edit whenever a fourth lands, and the two fields carry over
unchanged. What is NOT acceptable is the middle road of naming one arbitrary member in `uses`, which
turns a false COMPLETE into a false MISSING — `matchDeck` would report *missing Scuttle Crab* at a
deck running Mosstomper. The recommendation on the record is prose in `prerequisites.notable`, where
a reader sees it and no machine pretends to check it.

---

## 9. WHAT SHIPPED, SO A LATER SESSION CAN FIND IT

- **`src/types.ts`** — `BodyRequirement`, `Combo.anyBodies`, `Variant.anyBodies`, and `ZONES` as a
  runtime list (`ATTACHED` was in use on 24 rows and undeclared).
- **`src/bodies.ts`** — `bodyCheck`, the deliberately weak decklist-level check, with its limits in
  its own docblock. It honours `includeSideboard` because `matchDeck` does.
- **`src/combos.ts`** — propagation through `generateVariants` (`max()` merge, part of the dedupe
  key) and the `anyBodies` and `zone` validation.
- **`src/matcher.ts` / `src/plan.ts`** — `Hit.missingBodies` folded into `missingCount`,
  `Route.addBodies` folded into `cost`.
- **`web/main.ts` / `web/graph.ts`** — four surfaces: the tray chip, the plan panel row and
  footnote, the drawer, and the layered diagram's route node and its accessible name.
- **`test/body-requirements.test.ts`** — the mechanism, predicates E, G and H (E as a CEILING with a
  REPAIRS floor, G and H as NAMED SETS of refusals), the zone vocabulary, and the note-verbatim
  floors.
- **`test/dom/body-requirement.dom.test.ts`** — the four surfaces read back out of a real DOM.
- **`test/prose-emphasis.test.ts`** and **`test/loose-cannon-shape.test.ts`** — handed over by
  rc-gap2 and rc-kw2 and shipped here; each found or repaired something on its first run.

**Every one of those checks was proved OUT OF BAND** — corrupt the thing it guards, watch it name
itself, revert — because an assertion whose plumbing is broken passes forever.

---

# HANDOFF — rc-schema, 2026-09-13 (SUPERSEDES ANY EARLIER HANDOFF IN THIS DOCUMENT)

## WHAT I OWN

`src/types.ts`, `src/combos.ts`, `src/matcher.ts`, `src/plan.ts`, `src/bodies.ts`,
`src/synergies.ts`, `web/main.ts`, `web/graph.ts`, `vitest.config.ts`, and their tests.

**DO NOT TOUCH:** `data/combos.json` and `data/synergies.json` are the manager's — both were handed
to me formally for one change each and handed back in those words. `src/build.ts`, `src/builder.ts`
and `web/builder.ts` are rc-builder's; I only ever IMPORT `src/builder.ts`.

## THE FRAME TO READ FIRST

Sections 1 and 2 of this document are the schema and predicate E. **Section 8 is the map** — six
shapes of one defect class, four of which came back empty — and it is the fastest way in. Sections
3 to 5 are the sweeps behind it and can be skipped unless you are re-running one. Section 9 indexes
the code.

## WHAT IS OPEN

**What I would do next.**

- `basis.combos` is validated in `test/synergies.test.ts` and not in `validateSynergies`, where the
  combos equivalent (features) IS in the validator. Moving it needs the combo list as a new
  parameter across a CLI and ten call sites, for no new coverage. Worth doing only if the validator
  gains that dependency for another reason.
- #218 and #219 are filed with their measurements. #219 is BUILT; #218 is a recorded approximation
  and not a task.
- The paraphrase vein: quoted spans in `combos.json` prose that CLAIM to be rules text (a rule
  number within 40 characters) and are verbatim in no source. **401 after one narrowing**, with four
  false-positive classes visible in the first twenty and NOT worked through. It is rc-gap2's
  subject; the probe is gone with `.scratch-schema`, but the predicate is one line.

**What I deliberately refused, with the reason — these are worth more than the to-dos.**

- **No `zone` and no relational field on `anyBodies`.** The matcher reads a DECKLIST and never a
  board, so a structured field for *"besides the Apothecary"* is the phrase-in-a-notable defect with
  a JSON key on it.
- **No severity flag.** A body that is not required is not a requirement, and `blocking: false`
  would hand the next author a switch to defuse the check.
- **No `exact: boolean`.** It would CONFLATE the axes rather than separate them: `count` is a
  DECK-CONTENT number and every exactness condition is a BOARD-STATE one. Naming the axis on the
  badge — UNIT CARDS, never MORE UNITS — is the repair.
- **`anyBodies` not widened for XP (1 case) or `[Hidden]` (2 cases).** Three instances across two
  nouns is not a schema axis; generalising to kind/count/note is one edit if a fourth lands.
- **`bodyCheck` is not format-aware**, so a BANNED unit still counts toward spare. Flattering
  direction, on a deck `matchDeck` already flags through `hit.illegal` for the same card.
- **`max()` not `sum()` on the variant merge.** Measured: 905 variants flatten 2+ entries and ZERO
  flatten two that both declare `anyBodies`, so it has never had two contributors. `sum()` would
  over-report every pair whose legs genuinely share a body.

## PREDICATE TRAPS I HIT, SO NOBODY RE-FINDS THEM

1. **A trailing `\b` needs a word character in front of it**, so `Arise!`, `Guards!` and `Daisy!`
   match nothing. This pool prints three card names ending in punctuation.
2. **`\bJhin\b` does not match "Jhins"** — a plural is a word character. Cost me a whole sweep, an
   hour after fixing the same trap in another script.
3. **`\bunit token\b` does not match "unit tokenS"** — the same trap again, in a different script,
   by me, the same hour.
4. **A name head under six characters** excluded Jhin, Ahri, Vi and Fizz from a name sweep.
5. **A card referred to by its TAG** — *"six 5 Might Dragons"* and never *"Blazing Scorcher"*.
6. **The EPITHET after the comma** is how this catalogue writes a name: *"Brambleback"*,
   *"Industrialist"*, *"Reveler"*.
7. **`partnersOf` folds reprints onto one FAMILY**, so a predicate chosen by counting BASES gives
   the wrong size. Broke my first swap test.
8. **An unused import is tree-shaken**, so a bundle measurement with an import you do not CALL
   proves nothing. My first #216 bundle number was worthless.
9. **A glob containing `*` then `/` ends a block comment early.** `vitest.config.ts` did not load.
   Describe the glob; do NOT hide the closer behind an invisible character.
10. **A guard that rebuilds an object with a spread puts the key at the END**, and
    `JSON.stringify` is order-sensitive — my own migration guard aborted on its own reconstruction.
    Build the baseline from a SECOND PARSE so key order is identical by construction.
11. **`git stash` can FAIL because of ANOTHER lane's staged file** on this tree, so it is not a safe
    isolation tool here.

## NUMBERS I AM QUOTING, WITH PREDICATE AND DATE

All measured 2026-09-13 unless stated. **An entry count rots on every merge; a card count rots only
when Riot prints a set; a rule does not rot at all.**

- **82 entries carry `anyBodies`** — rots on every merge. `REPAIRS` in
  `test/body-requirements.test.ts` floors it.
- **Predicate E 0, G 2, H 7**, pinned as NAMED SETS of refusals rather than counts, so they do not
  rot — a new member turns them red.
- **220 synergy rules, 5,475 reviewed partners, largest list 106, 168 distinct fingerprints, ZERO
  real collisions** (compared the SETS, not the hashes).
- **prose-emphasis: 47 string paths, 29 excluded, 18 walked, 18,914 strings, 8,307 spans of 25+,
  6,154 verbatim, 0 flagged.** Floors set below each.
- **424 join: 29 reveal printings, 38 entries using one, 26 citing 431.1.c, 0 owed.** Floors, not
  pins — the population grows whenever a lane writes a reveal entry.
- **vitest: 49 files collected before the config, 47 after** — and 47 is exactly 33 in `test/` plus
  14 in `test/dom/`.
- **766 entries, 17 distinct top-level keys, 16 declared and one not** — that one is now deleted and
  the check refuses its return.

## THE RULE THAT OUTLIVES ALL OF THESE

**Is the body being SPENT, or asked for?** An EFFECT that wants another friendly unit is not a
requirement — 055.1 and 359.3.e.11 ignore an impossible instruction and it fizzles. A COST that
wants one is — 203.3 makes an impossible cost unpayable and the card is stuck in hand. That is the
test for every future row in this class, and it does not rot.

