# Hand walk — issue #150, uncatalogued Mind units

Date: 2026-09-06 · Rules version: `data/Riftbound-Core-Rules-2026-07-16.txt` · Card text:
`data/corpus_flat.txt`, verbatim, grepped.

Scope given to this walk: the two ENGINE candidates of #150
(`petal-pixie-keeper-of-masks-might-wall`, `covert-informant-signpost-move-draw`) and the three
structural facts the issue asked to be recorded with their rule text.

Outcome in one line: **both candidates stand as ENGINE and are authored, but BOTH were rewritten at
the mechanism** — candidate 1 gains the repeating half it did not have (its own legend, `UNL-189`
Bashful Bloom) and a damage ledger that 143.2.a changes; candidate 2 loses its premise, because the
Informant already moves herself for free and the pool prints the same trigger with no Empower cost at
all (`SFD-048` Stellacorn Herder). One CORRECTION is applied to an existing verified entry
(`gutter-palace-keeper-time-warp`), whose note credits 477.1.b.1.b's worked example with saying
something it does not say. No existing entry changes class, quantity, `uses` or steps. The catalogue
goes from 243 to **245 entries, all `verified`**.

---

## 1. `petal-pixie-keeper-of-masks-might-wall` — VERIFIED as ENGINE, REWRITTEN

### 1.1 The cards

```
UNL-076 | Petal Pixie | Unit | Mind | E2 M2 | I have +1 :rb_might: for each of your units with
[Temporary] at my battlefield. [Tags: Fae, Ionia]

UNL-081 | Keeper of Masks | Unit | Mind | E2 M1 | [Hidden] (Hide now for :rb_rune_rainbow: to react
with later for :rb_energy_0:.) [Temporary] (Kill me at the start of my controller's Beginning Phase,
before scoring.) When you play me, play two Reflection unit tokens here. Then do this: They become
copies of me. [Tags: Ionia]

UNL-T06 | Reflection | Unit | Colorless | M0 | (I become a copy of something when played. I don't get
that card's play effects.)

UNL-189 | Bashful Bloom | Legend | Calm/Mind | - | :rb_energy_4:, :rb_exhaust:: Play a ready
3 :rb_might: Sprite unit token with [Temporary]. This ability costs :rb_energy_1: less for each
friendly unit with [Temporary]. [Tags: Lillia]
```

Ban check: no `[BANNED` marker on any of the four lines. `data/cards.json`: UNL-076 `domains:
["mind"]`, `might: 2`, `mightBonus: null`; UNL-081 `["mind"]`, `might: 1`; UNL-T06 `domains: []`,
`might: 0`; UNL-189 `["calm","mind"]`. All four `signature: false`, so 103.2.d never arises.

### 1.2 The Reflections do carry `[Temporary]`, and they do stay at 0 Might

**477.1.b.1.a** — copyable traits are, verbatim: "Name / Super Type / Type / Tags / Cost / Domain /
Rules Text." **477.1.a.1** — "Assignment of Might is dealt with in this layer", i.e. Might is handled
separately and is not on the copyable list. That is R27, already retired on issue #11, and this is
its second independent case.

So when Keeper's own instruction — "Then do this: They become copies of me" — resolves (an
`477.1.c` Layer-1 effect, identified by the word "become"), each Reflection token receives Keeper's
**Rules Text**, `[Temporary]` included, and keeps its printed **0 Might** (`187.6`: "A 0 [M]
Reflection token is a domainless unit token with 0 Might").

**816.3** is what lets Petal Pixie see it: "Temporary, and whether or not a permanent has Temporary,
is a characteristic of the permanent and may be checked or referenced by other Game Effects."

**No recursion.** `UNL-T06` prints "I don't get that card's play effects" on its own line, and the
sequence is explicit: the tokens are *played* as Reflections first and *become* copies afterwards, so
Keeper's "When you play me, play two Reflection unit tokens here" never fires from them. The count is
exactly three `[Temporary]` bodies per Keeper, not a runaway.

### 1.3 CORRECTION applied to `gutter-palace-keeper-time-warp`

That entry's note says:

> "(3) The copies DO inherit [Temporary], because Rules Text is copyable and Riot's own worked example
> at 477.1.b.1.b says so outright (\"two of which are token Copies with Temporary\")"

The conclusion is right; **the citation is not**. 477.1.b.1.b's example is:

> "A player triggers Leblanc, Deceiver's hold effect and plays a Reflection token, making it a copy of
> Honest Broker. […] That player will have three units named Honest Broker in play, two of which are
> token Copies with Temporary."

`SFD-155 Honest Broker` has **no** `[Temporary]` (`data/corpus_flat.txt` line 483: "[Deathknell] —
Play a Gold gear token exhausted."). The `[Temporary]` in that example comes from LeBlanc's own text,
`UNL-199 Deceiver`: "It becomes a copy of another unit there. **Give it [Temporary].**" So the example
does not say what the entry credits it with saying. The note was rewritten to stand on
477.1.b.1.a + 816.3 alone, which is sufficient. Class, `uses`, quantities and steps unchanged.

### 1.4 Where the bodies land, and where Petal Pixie has to stand

- **355.2.a** — "By default, Valid locations include the controller's Base or a Battlefield the
  controller controls." So Keeper is played to a battlefield **you control**, which is where Petal
  Pixie must already be.
- **359.3.f.1 / 359.3.f.2** — "here" is a referent, "checked on execution of the instruction". The
  Reflections are born wherever Keeper is at that moment: his own battlefield.
- **811.1.d.3**, on the `[Hidden]` route — "If a hidden spell or a play effect of a hidden permanent
  causes you to play a unit, you must choose to play that unit at that battlefield." Same answer,
  reached by a second road.
- Bashful Bloom's Sprite names no location. It is **played**, so 355.2.a governs (and 439.2.b.1 —
  "Permanents will be Created at any location on the Board that they can be played to" — agrees):
  the base, or a battlefield you control, i.e. Petal Pixie's.
- If Petal Pixie is at your **base** she has no battlefield, the referent returns null
  (359.3.f.2.a) and she is a plain 2 Might body. The entry declares this.

### 1.5 The `[Hidden]` route, and why it reaches into a combat

**811.1.b**, verbatim: "While this card is in your hand or in your Champion Zone on your turn during
an Open State, you may pay [A] to hide this facedown at a battlefield you control that doesn't already
have a facedown card hidden there for as long as you control that battlefield. Beginning on the next
turn, this gains [Reaction] and you may play this, ignoring its base cost."

**811.6** — "A card that is Hidden gains Reaction while facedown or played from facedown, and may be
played any time a card with Reaction may be played as a result." **813.1.c.1** — a `[Reaction]` card
"can be played during Closed States on any player's turn."

So a Keeper hidden on turn N is a **0 Energy** play from turn N+1, on either player's turn, in any
Closed State. Played inside a combat at that battlefield, the three bodies still fight:

- **319.6** — a Cleanup is made an Outstanding Task "After any number of Game Objects enter or leave
  the Board".
- **323.2.a** — in that Cleanup, "If there are Units present at the Battlefield the Combat is taking
  place at, but do not have a designation, they gain the same designation as their Controller now".
- **464.2.c.3.a** says the same from the other side: a unit becoming present after the designation
  moment "will gain the Attacker or Defender designation during the Cleanup phase following the action
  that caused it to become present".
- **465.2** resolves damage only "When the Showdown closes", which is later.

Three costs of the `[Hidden]` route that the entry declares: it is one card per battlefield
(811.1.b, "doesn't already have a facedown card hidden there"), so at most one of the three Keepers
can come this way; the hide costs 1 rainbow Power a turn early; and **323.7** — "Remove all Hidden
cards from all Battlefields that are not controlled by the same player and place them in their owner's
Trash" — trashes it if control of that battlefield changes hands first.

### 1.6 The arithmetic, and 143.2.a is what the issue missed

The wall's value is not the Might sum alone; it is the **damage the attacker has to find**, and that
is set by two rules read together:

- **143.2.a** — "If a Unit ever has **nonzero** damage marked on it equalling or exceeding its Might,
  it is Killed." A 0 Might Reflection is therefore **not** free: it needs 1 damage.
- **465.2.c.4** — "Units cannot have more damage assigned to them than the minimum required to
  constitute lethal damage unless no further units remain to have damage assigned to them", with
  **465.2.c.3** forcing lethal in full onto one unit before moving to the next.
- **466.3.a** — a player wins the combat only if they "are the **only** Player that has units
  remaining at this battlefield during this step". One survivor is the whole job.
- **465.2.b** sums the Might of all Defending Units. It does **not** filter by exhausted state, which
  is why 143.4 ("Units enter the Board exhausted") costs this line nothing.

Three boards, all with Petal Pixie already standing at a battlefield you control:

| board | Energy this turn | Petal Pixie | garrison | summed defending Might (465.2.b) | damage to clear it |
|---|---|---|---|---|---|
| bare | 0 | M2 | Pixie | 2 | **2** |
| + Bashful Bloom's Sprite | 4 | M3 | Pixie, Sprite M3 | 6 | **6** |
| + one Keeper | 2 | M5 | Pixie, Keeper M1, 2 × Reflection M0 | 6 | **8** |
| + Keeper then Bloom | 2 + 1 | M6 | Pixie, Keeper M1, 2 × Reflection M0, Sprite M3 | 10 | **12** |
| ceiling: 3 Keepers then Bloom | 6 + 0 | M12 | Pixie, 3 × Keeper M1, 6 × Reflection M0, Sprite M3 | 18 | **24** |

Bloom's discount is "1 Energy less for each friendly unit with [Temporary]", counted when the ability
is activated, so playing the Keepers **first** is what pays for the Sprite: three `[Temporary]`
friends take her from 4 to 1, nine take her to 0. `356.4` prints no floor on this discount and
`356.4.e` scopes minimums to the discount that states one; Bloom states none. Same reading as
`leblanc-bashful-bloom-trevor-plaza`, which already runs her "at 0".

### 1.7 Why ENGINE, and what the repeating half is

`[Temporary]`, **816.1.b**: "At the start of this permanent's controller's Beginning Phase, before
scoring, kill this." **816.1.c**: "The Trigger Condition is the controller of the permanent's Beginning
Phase starting." So the whole wall dies at the start of **your** next Beginning Phase — through the
opponent's entire turn, then gone, and gone **before** the Scoring Step (315.2.b.2). That is the
point: the wall never Holds, Petal Pixie does. She survives at M2 and the battlefield is still yours,
so the Hold happens as normal (469.2).

Keeper alone is a **trick**, not an engine: three copies (103.2.b) is three turns in a whole game.
What makes this an ENGINE is `UNL-189 Bashful Bloom` — an exhaust ability, readied every Awakening
(415.3.a), so **one `[Temporary]` 3 Might body every turn, forever**, for 4 Energy falling to 1 or 0
whenever a Keeper is on the board. Petal Pixie is mono-Mind and Keeper is mono-Mind, so Bloom's
Calm/Mind identity holds them both (103.1.b.3); the entry names her in `legends`.

Not INFINITE and not BURST: nothing here scores, and there is no repeat step inside a turn.

### 1.8 Traps checked

- **It cannot attack.** Petal Pixie's bonus reads "at my battlefield"; move her and the count is
  whatever stands at the new one. The Keeper and its Reflections enter exhausted (143.4) and cannot
  pay 144.2 that turn, and 144.4.c keeps a Standard Move off battlefield-to-battlefield without
  `[Ganking]`. This is a defensive engine, and the entry says so.
- **The empty-battlefield trap does not arise**: no attack, no Attacker designation, no "when I
  attack" text anywhere in the line.
- **The `[Temporary]`-never-Holds trap is the mechanism, not a flaw**, and the entry states the real
  exposure: if Petal Pixie dies in combat and only `[Temporary]` bodies survive, they all die at your
  Beginning Phase and 323.6 strips your control before the Scoring Step — no Hold at all.
- 186.1: the Reflections cease to exist on death, so nothing recycles them and no `[Deathknell]`
  fodder line rides along. 185: they are not cards.
- No `[Repeat]` (429.3 / R21 never arise), no Gold token (R25 never arises), no recall (455/456 never
  arise), no rune recycled for Power, no Energy carried across a phase boundary (167).
- 709 fires once: Petal Pixie "becomes Mighty" the moment she crosses 2 → 5, and "A Unit with Might 5
  that gets +1 does not become Mighty, because it was already Mighty" — so a Keeper played on top of a
  Keeper does not re-fire it.
- **Do not add `UNL-090 LeBlanc, Everywhere at Once`.** With the `[Temporary]` trigger switched off
  (R10 = A) the bodies accumulate and Petal Pixie grows permanently — but that is exactly
  `leblanc-bashful-bloom-trevor-plaza`'s engine, which already carries Petal Pixie as a named rider.
  The two entries are kept apart on purpose.

---

## 2. `covert-informant-signpost-move-draw` — VERIFIED as ENGINE, REWRITTEN AT THE PREMISE

### 2.1 The cards

```
VEN-057 | Covert Informant | Unit | Mind | E3 P1 M4 | [Empower] :rb_energy_3: (:rb_energy_3:: Empower
me. Use only if not Empowered.) [Empowered][>] When I move, draw 1. [Tags: Noxus]

UNL-045 | Forgotten Signpost | Gear | Calm | E2 | [Action][>] Exhaust a unit you control,
:rb_exhaust:: Move a different unit you control to the location of the unit you exhausted to pay for
this ability.
```

Ban check: neither line carries a `[BANNED` marker. `data/cards.json`: VEN-057 `["mind"]`, E3 P1 M4;
UNL-045 `["calm"]`, E2, `type: ["gear"]`. Both `signature: false`.

Domain Identity (103.1.b): Mind + Calm. Four legends cover it, and `grep "| Legend | Calm/Mind |"`
returns exactly those four — `OGN-255` Nine-Tailed Fox, `SFD-189` Fire Below the Mountain,
`UNL-189` Bashful Bloom, `VEN-145` Curator of the Sands. None is banned.

### 2.2 The premise #150 got wrong: she already moves herself, for free

The issue's ledger is "have Signpost in play … every turn after that … draw 1. Marginal cost per
draw: 0 Energy". That undercounts the baseline, because a unit does not need the Signpost to move:

- **144** — "Units have the Inherent Ability to perform a Standard Move." **144.2** — "Exhausting the
  Unit is the Cost for this action." **420.3.a** — "The Cost is Exhausting one or more Units."
- **415.3.a** — "A player Readies all non-spell Game Objects they Control during the Awakening Phase".

So an Empowered Covert Informant draws **one card a turn for zero Energy with no other card on the
board at all**, by standard-moving between base and battlefield and back on alternate turns. What
Forgotten Signpost actually buys is a **second move in the same turn**, and it is worth exactly
**+1 card per turn** — no more, because the Signpost carries its own exhaust and only readies at the
next Awakening.

### 2.3 The second thing #150 missed: the destination must differ

**420.1** — "Moving is the act of a Game Object moving between **two Locations** on The Board."
The Signpost's destination is "the location of the unit you exhausted to pay for this ability", so the
fuel unit has to be standing somewhere the Informant is not. #150 wrote the requirement as "any second
friendly unit to serve as the fuel"; it is narrower than that, and it is the same correction
`conscription-signpost-empty-garrison` already applied to issue #61 ("you must already have a body at
the destination").

There is no rule that would let the move happen anyway: 447.2.a and 447.2.b are the Invalid
Destination list and both open with a player count this Duel does not have ("In Modes of Play with
more than two players", "In Modes of Play with teammates").

### 2.4 The move by effect is a Move, and it does fire her trigger

- **420.2** / **420.2.a** — "Moving is a Limited Action. Players may only move Game Objects when
  instructed to do so by Game Effects or costs." The Signpost instructs one.
- **359.3.f.3**'s own example is a move trigger firing off a move: "Lillia, Fae Fawn reads 'when I
  move from a location, play a 3 [M] Sprite token with Temporary there.'"
- The project already stands on this: the synergy rules `ride-the-wind-move-triggers`,
  `relentless-pursuit-move-triggers` and `windswept-hillock-move-triggers` all carry
  `basis.rules = ["420.1", "420.2.a", "456.1", …]`. Nothing new is being claimed.
- **420.3.a** puts the exhaust cost on the **Standard** Move only, so the Signpost move leaves the
  Informant ready — which is what lets her spend her own exhaust on her own move in the same turn.

### 2.5 `[Empower]` is paid once and stays paid

- **827.1.c.1** — "Empower is functionally short for '[Cost]: Empower this. Play only if not
  Empowered.'" Her cost is 3 Energy with no exhaust in it.
- **828.1.b.1** — "[Empowered] … is functionally short for 'While I have the Empowered status, this
  card gains "[Text]"'", and **828.1.c** — "As long as the Game Object has the Empowered status, then
  the Dependent Ability will be active."
- **441.2** — "'Empowered' is a state for Game Objects on the board that other game effects and
  abilities can reference." **441.1.a** — "Empowered is a binary state."

So 3 Energy, once, and the trigger is live for the rest of the game — unless she leaves the board, in
which case the state goes with the object and has to be bought again.

### 2.6 The turn, and the ledger

Setup, once: Covert Informant 3 Energy + 1 Power, her Empower 3 Energy, Forgotten Signpost 2 Energy —
**8 Energy + 1 Power**. Plus one friendly unit parked at a battlefield you control.

Every turn after that, with the Informant starting at your base:

1. Signpost (`[Action][>]`, so a Main Phase activation is fine; 806.1.b only widens it): exhaust the
   parked unit at battlefield X, exhaust the Signpost → move the Informant base → X. She moves →
   **draw 1**. She is still ready.
2. Her own Standard Move: exhaust her, X → base (144.4.b). She moves → **draw 1**.
3. Everything readies at the next Awakening (415.3.a). Repeat.

**Two cards a turn, 0 Energy and 0 Power marginal.** Measured against the project's own ledger
(#21 / #44), where Renata Glasc, Mastermind's extra card is "1 Energy + 1 Mind Power ≈ 10 Energy", the
setup pays for itself on the first turn it runs.

Why the parked unit must be at a battlefield **you control**: 190.3.a.1 — "Units moving to or being
played to a battlefield apply Contested status if that battlefield is not already Contested and that
Unit's controller does not already control that battlefield." Send the Informant onto a battlefield
you do not control and you have started a fight, not drawn a card in peace.

### 2.7 The correction that reprices the whole family: `SFD-048`

```
SFD-048 | Stellacorn Herder | Unit | Calm | E4 M3 | When I move, draw 1. [Tags: Mount Targon]
```

The pool prints **the identical trigger with no `[Empower]` gate at all**, in Calm — the Signpost's own
domain, and inside the same Calm/Mind identity. Covert Informant costs 3 Energy + 1 Power plus a
3 Energy Empower to reach "When I move, draw 1"; Stellacorn Herder costs 4 Energy flat. What the
Informant buys over him is 1 Might (M4 vs M3) and a Mind body instead of a Calm one.

This does not refute the entry — the mechanism is unchanged and the Informant is the card #150's lens
is about — but it does mean the honest line is "run both". A second mover adds its own free Standard
Move, so Informant + Herder + Signpost is **three cards a turn**: Signpost moves one of them (it stays
ready), then each spends its own exhaust on its own Standard Move. The Signpost is still worth exactly
+1; the movers are worth +1 each. Recorded in the entry's `notable`, not in `uses`.

`grep -i "when i move"` over `data/corpus_flat.txt` returns 28 cards. Two carry `[Empower]`
(`VEN-021` Akali, Deadly Weapon in Fury; `VEN-057`). The only other unconditional draw-on-move is
`SFD-048`; `SFD-041` Apprentice Smith and `VEN-033` Pakaa Protector draw only on a hit, and
`UNL-080` Hwei, Brooding Painter draws-then-discards.

### 2.8 Burn Out is a real ceiling, and it is not the loop wall

**431.1.a** — "If a player must Draw cards in excess to the number of cards in their Main Deck, they
will Draw as many as possible, perform this action, then Draw the remaining amount instructed."
**431.2.b / 431.2.c** — a Burn Out recycles your trash into your Main Deck and then "Chooses an
opponent to gain 1 point" (**194.1.d**).

Two extra cards a turn on top of the Draw Phase empties a 39-card deck (103.2 counts the Chosen
Champion inside the 40, 103.2.a.1 removes it before play) in roughly a dozen turns, and the first
Burn Out costs a point but refills from the trash. **This entry is not inside a loop shell**: the "0
spare draws" wall of `lux-infinite-energy` (#21 / #59) is a per-pass, empty-deck measurement, and
nothing here runs with the Main Deck empty. Declared in `notable` so the two are never confused.

### 2.9 Traps checked

- No attack, no Attacker designation, no combat: the empty-battlefield trap never arises.
- Not a Recall: **455** carves recalls out of Moves and there is no recall here, so 456's exception
  does not apply and the move trigger fires normally.
- No `[Repeat]`, no `[Temporary]`, no token (185 / 186.1 never arise), no Gold (R25 never arises).
- No Energy is added or carried across a phase, so 167 never bites.
- 143.4 is respected: the Informant enters exhausted and cannot Standard Move the turn she is played,
  so the engine starts on the following turn.
- Overlap declared: `UNL-045` is already in `signpost-corina-two-battlefields` and
  `conscription-signpost-empty-garrison`, both for different payoffs. `VEN-057` appears in no entry.

---

## 3. The three structural facts #150 asked to be recorded

### 3.1 `OGN-084 Eager Apprentice` is the Core Rules' own worked example of 356.4.e

**356.4.e**, verbatim, with its example:

> "If a discount applies a minimum cost, that minimum applies only to that discount.
> Example: Eager Apprentice says 'While I'm at a battlefield, the Energy costs for spells you play is
> reduced by [1], to a minimum of [1].' A player who controls Eager Apprentice and a unit with 7 Might
> plays Sky Splitter, a spell that costs 8 Energy and says 'This spell's Energy cost is reduced by the
> highest Might among units you control.' That player can choose to apply Eager Apprentice's discount
> first, reducing Sky Splitter's Energy cost to 7, then apply Sky Splitter's discount, reducing its
> Energy cost to 0. If they applied these discounts in the other order, Sky Splitter's Energy cost
> would be 1."

Both cards are in the pool (`OGN-084`, `OGN-014`), and **356.4.c.1** is what makes the choice of order
the player's: "Discounts that apply to a given component of a spell's cost may be applied in any order
to that component." The project already carries 356.4.e from the #85 walk (three Applied Researchers
on Time Warp); what #150 adds is that the rule's illustration is this pool's own pair. Left to the
synergies layer as `eager-apprentice-sky-splitter` — a one-partner rule, which is thin.

### 3.2 477.1.b.1.a is the second independent case of R27

Recorded in §1.2 above. R27 was ruled on a Deceiver Reflection copy; `UNL-081` Keeper of Masks reaches
the same place by a different card, and `petal-pixie-keeper-of-masks-might-wall` is the first entry
that *needs* the 0 Might half to be true rather than merely tolerating it — Petal Pixie counts the
keyword, never the size of the body carrying it. Also recorded here: the reading must **not** be
sourced to 477.1.b.1.b's worked example (§1.3).

### 3.3 The friendly-unit-dies family went to the synergies batch, not to an entry

#150's fourth shape — payoffs on `when a friendly unit dies` (`OGN-118` Wraith of Echoes,
`UNL-068` Spectral Centaur, `OGN-228`, `OGN-246`, `SFD-169`, `UNL-129`, `UNL-174`) with
`OGN-113 Malzahar, Fanatic` ("Kill a friendly unit or gear, exhaust: Add [rainbow][rainbow]") as the
mono-Mind sac outlet — is a **synergy pattern, not a combo**, and was handed to the synergies batch
(syn10). Two rules of the project decide it, and they are why no entry was authored here:

- **383.3.e.1** — "Such a Triggered Ability will only be performed the specified number of times each
  turn." `OGN-118` ("the first time … each turn") and `UNL-174` ("the first time … during your
  Beginning Phase each turn") are one execution per turn however many bodies die, so neither is an
  engine's scaling piece. This is #98's finding, and being part of an uncatalogued theme does not undo
  it.
- Malzahar's outlet carries its own exhaust, so 415.3.a caps it at one activation per turn: the
  family is a per-turn pairing, which is exactly what a synergy rule is for.

`data/synergies.json` is owned by another session this walk did not touch.

---

## 4. What changed in `data/combos.json`

| entry | change |
|---|---|
| `petal-pixie-keeper-of-masks-might-wall` | **NEW**, ENGINE, `verified` |
| `covert-informant-signpost-move-draw` | **NEW**, ENGINE, `verified` |
| `gutter-palace-keeper-time-warp` | note corrected (§1.3). No change to class, `uses`, quantities or steps. |

Catalogue: 243 → **245 entries, all `verified`**. No new numbered rules reading was filed; both
candidates were settled by a different legal ordering or by rule text already in the file.
