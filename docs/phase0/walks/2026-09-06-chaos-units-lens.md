# Hand walk — issue #146, uncatalogued Chaos units

Date: 2026-09-06 · Rules version: `data/Riftbound-Core-Rules-2026-07-16.txt` · Card text: `data/corpus_flat.txt`, verbatim, grepped.

Scope given to this walk: the one thin ENGINE candidate (`snapjaws-xp-mill`), the "play me to an open
battlefield" amendment to the evacuate-conquer family, the two alternate Chaos evacuators, and the
Vision/Karma gap recorded for the synergies layer.

Outcome in one line: **the candidate is REFUTED as its own entry and folded into
`voidreaver-khazix-xp-removal` as a notable; four entries gain notables; two of them also carry a
CORRECTION, because both stated "open" as "uncontrolled" alone.** No entry changed class, quantity or
`uses`. The catalogue stays at 242 entries, all `verified`.

---

## 1. `snapjaws-xp-mill` — REFUTED as an entry, kept as a notable on `voidreaver-khazix-xp-removal`

### 1.1 The card

```
UNL-129 | Vicious Snapjaws | Unit | Chaos | E5 M5 | When another friendly unit dies, gain 1 XP. [Tags: Bilgewater]
```

Ban check: no `[BANNED` marker on the line. `data/cards.json`: `domains: ["chaos"]`, `signature: false`.

### 1.2 The one thing #146 got right: it fires per death, not once a turn

**383.3.e** — "Some Triggered Abilities will trigger 'once each turn,' or 'N times each turn.'"
**383.3.e.1** — "Such a Triggered Ability will only be performed the specified number of times each
turn. If its trigger condition would be fulfilled and it has already been performed that many times,
it does not trigger."

Snapjaws prints no such clause, so 383.3.e.1 does not reach it. The pool's own contrast is the two
cards that DO carry it, and both are worded the other way:

```
OGN-118 | Wraith of Echoes  | Unit | Mind  | The first time a friendly unit dies each turn, draw 1.
UNL-174 | Shard of Undoing  | Gear | Order | The first time a friendly unit dies during your Beginning Phase each turn, ...
```

Snapjaws also names no location — unlike `UNL-145 Pyke, Returned`'s "while I'm at a battlefield" —
so it pays from your base. Both readings in the issue stand.

### 1.3 The shell the issue names is ILLEGAL

#146's ledger is "attach it to `lux-infinite-energy`, which kills Ekko every pass". The kill is real:
`UNL-173 Sacrifice` reads "As an additional cost to play this, kill a friendly [Mighty] unit", and
`OGN-110 Ekko, Recurrent` is M5. (`OGN-212 Forge of the Future` also dies each pass, but it is Gear
and Snapjaws counts a *unit*.)

The deck is not legal:

- **103.1.b.2** — "Your deck's Domain Identity is dictated by the domains of your Champion Legend."
- **103.1.b.1** — "Cards included in your deck must abide by your Domain Identity."
- **103.1.b.3** — "If a card has a single Domain, then that card is permitted in the Domain Identity
  that corresponds to the same Domain."

`lux-infinite-energy`'s own `easy` requires a legend covering Mind **and** Order, and every legend has
exactly two domains, so the identity is Mind/Order. Snapjaws is mono-Chaos. Not includable. The
candidate's whole ledger dies here.

Nor is there another home in the catalogue: of the fourteen `INFINITE` entries, the domain union of
their `uses` is Chaos only for `pursuer-herald-recruits` (Chaos/Order) — which is a token loop with
no death in it at all, and whose engine card `OGN-177 Stealthy Pursuer` is banned in Constructed.

### 1.4 The product is inert wherever it is put — the numbers

**733** — "There is no limit to an amount of XP a player can accrue." So the accrual is legal and
unbounded. It buys nothing unbounded, and this is the full census, not a sample.

Eleven cards print a "Spend N XP" cost — twelve costs in all, since `UNL-201` prints two
(`grep -oi "spend [0-9]* XP"`): `UNL-102` (2, [Buff]), `UNL-109` (3, ready), `UNL-119` (3, damage),
`UNL-126` (3, [Ganking] this turn), `UNL-140` (5, additional cost), `UNL-158` (1, [Equip]), `UNL-162`
(2, [Buff]), `UNL-164` (3, additional cost), `UNL-178` (3, additional cost), `UNL-201` (1 and 2, both
with an exhaust), `UNL-203` (3, draw). Twenty `[Level N]` clauses across fifteen cards, the largest
threshold in the whole pool being `UNL-059 Master Yi, Unstoppable`'s `[Level 16]`.

None scores a point — the finding of #116, re-measured here. And each is capped besides:

- an exhaust in the cost is one activation a turn (`315.1.b` readies in Awaken): `UNL-109`, `UNL-201`,
  `UNL-203`;
- a "this turn" grant is idempotent within the turn it names: `UNL-126`'s [Ganking];
- **702.3** — "There can only be one Buff on a Unit at a time" — and **702.3.a** — "If a Buff is
  added, or instructed to be added, on a Unit that already has a Buff, it is not placed instead" — so
  the 2-XP [Buff] of `UNL-102` / `UNL-162` is one-shot per body;
- an additional cost rides on a card, and 103.2.b caps that at 3 copies.

And spending is self-defeating for the Level half: **730.2** — "To Spend XP, reduce the value of XP
marked on the Player spending it" — read with **824.1.d** — "The Dependent Ability will be Inactive
as soon as the controlling player has less than [N]" — walks your own thresholds back down. That is
the drain `wuju-master-blood-rose-level` already registered on 2026-09-04.

So the utility of an XP balance is a **step function that tops out at 16**, plus a handful of spends
each capped by an exhaust, a "this turn", 702.3 or 103.2.b. An unbounded faucet is worth a bounded
constant. There is no `netPerIteration` an ENGINE entry could honestly declare.

**Verdict: refuted as an entry.** Not for a rules error — #146's mechanics are right — but because
the shell it names is illegal and the product does not compound.

### 1.5 Where it does belong: a notable on `voidreaver-khazix-xp-removal`

That entry is the one catalogued shell whose identity admits Snapjaws. `UNL-201 Voidreaver` is the
legend, so 103.1.b.2 fixes the identity at Body/Chaos and 103.1.b.3 admits mono-Chaos `UNL-129`.
`UNL-129` is `signature: false`, so 103.2.d.3 does not touch the Chosen Champion choice.

It is a third faucet beside Voidreaver's "+1 XP per combat won" and `UNL-143`'s "+2 per lone-enemy
attack or defence", feeding that entry's named sink (`UNL-119`, 3 XP for damage equal to its Might).
It is the counter-cyclical one: Voidreaver's income needs the combat **won**, while Snapjaws pays for
the bodies you lose getting there — **465.2.c** assigns damage by summed Might on both sides, so a
win still costs bodies.

Honest rate: **one XP per friendly unit death**, a small number a turn in a combat deck. E5 M5 is the
price. `notable`, not `uses`.

---

## 2. The four "play me to an open battlefield" printings — amendment, and a correction

### 2.1 The census is four, not five

`grep -in "open battlefield" data/corpus_flat.txt` returns five lines:

```
OGN-174 | Sai Scout                | Unit | Chaos | E6 M5    | [Vision] (...) You may play me to an open battlefield.
OGN-176 | Sneaky Deckhand          | Unit | Chaos | E3 M2    | You may play me to an open battlefield.
OGN-193 | Miss Fortune, Buccaneer  | Unit | Chaos | E4 P1 M4 | You may play me to an open battlefield. Friendly units may be played to open battlefields.
SFD-079 | Bard, Mercurial          | Unit | Mind  | E4 P1 M4 | ... move any number of your units to an open battlefield.
VEN-115 | Ocean Drake              | Unit | Chaos | E8 P2 M7 | You may play me to an open battlefield. When you play me, ...
```

**`SFD-079` is not one of them.** Its text is a *Move* by effect (449), not a play permission, so
#146's "5 printings pool-wide … `SFD-079 Bard, Mercurial` in Mind" over-counts by one. The play
permission is four printings, all mono-Chaos, none banned, none signature.

### 2.2 The rules, opened

- **355.2.a** — "By default, Valid locations include the controller's Base or a Battlefield the
  controller controls."
- **355.2.b** — "Some Game Effects may grant players permission to play Units to locations that are
  not normally Valid. Such locations become Valid for the purposes of Playing the Unit."
- **190.3.a.1** — "Units moving to **or being played to** a battlefield apply Contested status if that
  battlefield is not already Contested and that Unit's controller does not already control that
  battlefield."

That last one is the load-bearing sentence and it says the amendment outright: a body **played** into
the battlefield applies Contested exactly as a Standard Move does, so the whole downstream route of
the family (323.8 stages the Showdown → 323.9 stages no Combat, since it needs "Units present
controlled by opposing players" → 323.12 opens it → 348.2.a establishes Control → 348.2.a.1 "This
results in a Conquer") is unchanged.

**450 is NOT the citation for this half.** It reads "The Destination becomes Contested if it is an
Uncontested Battlefield not controlled by the controller of the Unit or Units that *moved*". The
entries cite 450 + 190.3.a.1 together for the Standard Move; the play route stands on 190.3.a.1 alone.

### 2.3 "Open" is BOTH conditions — and two verified entries said otherwise

**170.11.a** — "Battlefields can be 'occupied.' This means they have a Unit present."
**170.11.b** — "Battlefields can be 'uncontrolled.' This means no player controls them."
**170.11.c** — "Battlefields can be 'open.' This means they are unoccupied and uncontrolled."

`charm-evacuate-conquer`'s last notable read "so **open = without a Controller**", and
`faefolk-challenger-forced-attacker`'s read "which is 'open' in Riot's sense (the Spiritforged errata
to Yone, Blademaster rewrote 'an open battlefield' as 'a battlefield that was uncontrolled')". Both
state only half the definition. This is exactly what CLAUDE.md's R31 retirement warns about ("Every
entry that leans on the word must check both"), diagnosed on 2026-09-06 and never applied to the two
entries that lean on it. **Corrected in this walk.** Neither correction changes either verdict — the
battlefields in question are unoccupied too — but the rule as stated was wrong, and the four printings
above are gated on the word.

The errata is not contradicted: an uncontrolled battlefield that still has units on it is not open,
so "a battlefield that was uncontrolled" is a consistent rewrite of the narrower trigger Yone prints.

### 2.4 Per entry: does the battlefield actually become open?

**`charm-evacuate-conquer` — YES.** The entry declares a garrison of exactly one; Charm sends it to
its own base, so the battlefield is unoccupied (170.11.a fails to apply), and the Cleanup strips the
opponent's Control at 323.6 ("Players lose control of any controlled Battlefields without their Units
occupying them if the turn is in an Open State and there is no Showdown or Combat ongoing there"), so
it is uncontrolled (170.11.b). Both halves of 170.11.c hold. Your own body has not walked in yet.

**`faefolk-challenger-forced-attacker` — the FAEFOLK half only.**
- Faefolk (`UNL-112`): the drag takes the enemy's last body off a battlefield *they* controlled; 323.6
  strips Control and nothing of yours is there. Open. This is precisely the "a second ready body of
  yours walks in and Conquers it in the same Main Phase" the entry already declares.
- Challenger (`UNL-105`): **NO.** He Standard-Moves in **first** and pushes the garrison out
  afterwards, so he is standing there. 170.11.a — occupied — and 170.11.c fails on that half alone,
  even though 323.6 has taken their Control. #146 proposes the four for "the evacuate-conquer engine
  family" without making this split.

**`amateur-recital-free-evacuation` — YES**, and this entry alone already cited 170.11.c correctly.
The Hold-triggered evacuation runs in the Beginning Phase (315.2.b.2), the Cleanup strips Control
(323.6), and the walk-in happens in the Main Phase (316) — the walker is played there instead.

### 2.5 It is a trade, not a strict upgrade

The Standard Move costs **0 Energy** and one exhaust off a body already deployed (144.2 / 420.3.a).
The play costs the walker's **full printed Energy** and needs no prior board presence, no readying and
no exhaust. 143.4 ("Units enter the Board exhausted") costs nothing here, because 323.9 never stages
a Combat on this route. Which is cheaper depends on the board, so both stay on the entries as
alternatives and neither goes into `uses`.

`OGN-193 Miss Fortune, Buccaneer` is the one that generalises: her second sentence, "Friendly units
may be played to open battlefields", is a static grant with no location clause of its own, so once she
is on the board *any* friendly unit is a walker. She reaches the board through her own first sentence.

### 2.6 Domain Identity gates each entry differently (103.1.b.1)

| entry | the entry's own cards | legends that also run the four Chaos walkers |
|---|---|---|
| `charm-evacuate-conquer` | `OGN-043` Charm, mono-**Calm** | Calm/Chaos: `OGN-259` Unforgiven, `SFD-195` Blade Dancer, `UNL-193` Gloomist |
| `faefolk-challenger-forced-attacker` | `UNL-112`, `UNL-105`, mono-**Body** | Body/Chaos: `OGN-267` Bounty Hunter, `UNL-201` Voidreaver |
| `amateur-recital-free-evacuation` | `UNL-207`, **Colorless** | any legend with Chaos |

The mono-Chaos version of the Charm line needs no Calm at all: swap Charm for `UNL-124 Isolate`
(E2), already listed among that entry's alternatives, and the whole Conquer is **Isolate + Sneaky
Deckhand = 5 Energy, two cards, one Main Phase, nothing on the board beforehand**. Recorded as a
notable; flagged to the orchestrator as arguably its own entry, since it is a different cost shape
from the entry's declared "spell + a Standard Move".

---

## 3. `OGN-191` and `OGN-188` — two more evacuators, `notable` only

```
OGN-191 | Maddened Marauder | Unit | Chaos | E5 M4    | [Tank] (...) When you play me, move a unit from a battlefield to its base.
OGN-188 | Zaunite Bouncer   | Unit | Chaos | E4 P2 M2 | When you play me, return another unit at a battlefield to its owner's hand.
```

**"A unit" reaches the enemy.** **355.9.a.1** — "'Unit,' 'gear,' and 'rune' refer to objects on the
Board unless specified otherwise" — carries no ownership default. The pool evidence for that reading
is already in `amateur-recital-free-evacuation`: `OGN-168 Fight or Flight` prints the same unqualified
sentence and is banned in both formats as removal.

Two differences worth writing down:

- The Marauder's destination is the moved unit's **own** base, so 323.7 (which recalls "all Permanents
  and Runes in Bases other than their controller's") never bites — the trap `charm-evacuate-conquer`
  documents for moving an enemy to *your* base.
- The Bouncer returns to **hand**, which costs the opponent the replay, and being a return rather than
  a Move (449) it fires no "when I move" ability on the body it removes. The Marauder does fire them:
  455 carves Recalls out of Move, and this is neither.

**Both are evacuators, never walkers.** Neither carries the 355.2.b permission, so 355.2.a puts each
at your base or a battlefield you already control — and the location is chosen at 355.2, during the
play steps, *before* the trigger that empties the enemy battlefield has resolved and before the
Cleanup of 323.6. So neither can be played into the battlefield it is about to open; a second card
still takes it. Each moves ONE unit, so like Charm they close only against a garrison of exactly one.

**They add nothing to `amateur-recital-free-evacuation`, and the reason is arithmetic, not rules.**
That entry's evacuation is the Recital's own Hold trigger — free, repeating, and already there. A Duel
has exactly two battlefields (485.4) and you control the Recital, so there is one enemy battlefield
and one evacuation to make. A second evacuator is redundant, not additive. Recorded on that entry so
the next hunt does not re-propose it.

---

## 4. For the synergies layer, not an entry: `[Vision]` is uncaught

`OGN-235 Karma, Channeler` (Order, E6 P1 M6) reads "When you recycle one or more cards to your Main
Deck, buff a friendly unit." Every `[Vision]` card recycles to the Main Deck by its own reminder text
("look at the top card of your Main Deck. You may recycle it"), so each is a Karma trigger.

Census: nine printings carry `[Vision]` — `OGN-086`, `OGN-100`, `OGN-171`, `OGN-174`, `OGN-235`
itself, `SFD-065` (grants it to Mechs), `UNL-089`, `UNL-161` (Gear), `VEN-065`. **`grep -in vision
data/synergies.json` returns nothing**: no rule's predicate catches the keyword.

Two notes for whoever writes the rule. Karma is Order and the two Chaos partners `OGN-171 Mystic Poro`
and `OGN-174 Sai Scout` need an Order/Chaos legend, of which the pool has exactly one — `VEN-155 Heart
of the Tempest`. And 702.3 caps the payoff: per the #106 finding, a repeatable buffer yields
min(triggers, new unbuffed bodies), so the product is a wide board of 2-Might units, never cumulative
Might. `karma-lux-recycle-buff-army` already carries that arithmetic.

Not walked further here — this walk owns `data/combos.json`, not `data/synergies.json`.

### 4.1 Also handed to the synergies layer, not walked here

`#146`'s finding 5 was outside this walk's scope and is recorded so it is not lost with the issue.
`UNL-146 Syndra, Transcendent` — "While I'm in a showdown, your spells have [Repeat]
:rb_energy_2::rb_rune_chaos:" — is proposed as a synergy anchor whose partners are the `[Action]` and
`[Reaction]` spells, on the argument that 344.1 makes a Combat's Showdown still a Showdown, so her
grant is live in the bloodless Non-Combat Showdown this evacuate-conquer family opens as well as in a
real Combat. `SFD-146 Vex, Cheerless` stacks a same-window discount on it. Not verified here: the
walk that adopts it must open 344.1 itself and check the partner list against the existing
`dark-child-off-turn-reactions` rule before duplicating it. Same for `#146`'s finding 4, which
concluded that `[Weaponmaster]`'s "even if it's already attached" clause cannot loop under 818.1
(Equip is an Activated Ability, so attaching is never Playing) — consistent with #89's finding for a
different card, and needing no entry.

---

## 5. Trap check on everything written above

No attack is declared anywhere (807.1.d / 383.4.e / 461: no Combat is ever staged on the Showdown
route, 323.9). No Energy is banked across 167. No `[Repeat]`, no `[Temporary]`, no token, no recall
used as a move (455/456.1), no would-die shield (808.1.d.1). Nothing was recycled that is a token
(185 / 416.1). No new numbered reading is filed: every question this walk raised was answered by
opening a paragraph.

## 6. Citations opened for this walk

103.1.b.1, 103.1.b.2, 103.1.b.3, 103.2.b, 103.2.d.3, 143.4, 143.4.a, 144.2, 170.11.a, 170.11.b,
170.11.c, 190.3.a, 190.3.a.1, 315.1.b, 315.2.b.2, 316, 323.6, 323.7, 323.8, 323.8.a, 323.9, 323.9.a,
323.10, 323.11, 323.11.a, 323.12, 323.13, 348.2.a, 348.2.a.1, 355.2, 355.2.a, 355.2.b, 355.9.a,
355.9.a.1, 383.3.e, 383.3.e.1, 383.3.e.2, 420.3.a, 449, 449.1, 450, 455, 465.2.c, 485.4, 702.3,
702.3.a, 703, 729, 730, 730.1, 730.2, 731, 733, 824.1.b.1, 824.1.c, 824.1.d.
