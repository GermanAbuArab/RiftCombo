# Play — LeBlanc stays home and two bodies keep the Tomb

Issue #303 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `hallowed-tomb-leblanc-shadows-call`**, the Order ENGINE in which `UNL-165 Shadow's Call`
gives `UNL-172 LeBlanc, Fragmented` [Temporary], she dies at the start of your Beginning Phase for two
cards, and `OGN-281 Hallowed Tomb` returns her to the Champion Zone in the Scoring Step of the same
phase. The entry is right about the two steps and about the doubled Deathknell. Walked as a game, the
engine has two weak points and the entry names only half of one. A single body on the Tomb dies to a
one-rune spell on the opponent's turn, and then the Tomb is not yours when it has to be held. And
LeBlanc herself must never stand at a battlefield, because every card in the pool that banishes an
enemy unit from the board reaches only units at a battlefield.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `4035579`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 69 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 30 (a hit on *before*), first in the list. The other entry of this slice is rank 31,
played in [the Seer stays home and the Birds answer their spell](2026-10-07-the-seer-stays-home-and-the-birds-answer-their-spell.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-199 Deceiver` (Mind/Order), forced by the LeBlanc tag (103.2.a.2) |
| **Chosen Champion** | `UNL-172 LeBlanc, Fragmented` (Order, E3 + 1 Power, M3), in the Champion Zone |
| **Battlefield** | `OGN-281 Hallowed Tomb`, the one you bring |
| **Garrison** | two `SFD-155 Honest Broker` (Order, E2, M2) on the Tomb, not one |
| **Held** | `UNL-165 Shadow's Call` (Order, E2) |

The card text the play turns on:

- Hallowed Tomb: *"When you hold here, you may return your Chosen Champion from your trash to your
  Champion Zone if it is empty."*
- LeBlanc, Fragmented: *"[Assault] (+1 :rb_might: while I'm an attacker.) [Deathknell][>] Draw 1. If
  it's your Beginning Phase, draw 2 instead. (When I die, get the effect.)"*
- Shadow's Call: *"Choose a friendly unit without [Temporary]. Give it [Temporary]. Draw 2. (Kill it at
  the start of its controller's Beginning Phase, before scoring.)"*
- Honest Broker: *"[Deathknell] — Play a Gold gear token exhausted. (When I die, get the effect.)"*

## 2. Your order: the kill, then the Hold

The two halves sit in two steps of one phase. 816.1.b: *"It is functionally short for "At the start of
this permanent's controller's Beginning Phase, before scoring, kill this.""* That is the Beginning
Step, 315.2.a.1: *"At the start of Beginning Phase game effects take place."* Her Deathknell is
808.1.c, *"It is functionally short for "When I die, [Effect].""*, and it resolves inside your
Beginning Phase, so it draws 2. Then the Scoring Step, 315.2.b.2: *"1. The Turn Player Holds all
Battlefields they Control."* A Hold is 469.2: *"Hold: A player maintains Control of a Battlefield they
did not yet Score this turn during their Beginning Phase."* The Tomb fires, she is in the trash, and the
zone she was played out of is empty, which is the condition of 108.3.c.1: *"If a Chosen Champion is
instructed to be returned to this zone, it can only do so if there is not a card already in this
zone."* From there 108.3.d plays her again: *"The Chosen Champion can be played from here as normal,
following the rules of Playing a Card."*

The order inside the phase is fixed by the rules, so your choices are elsewhere, and there are two.

**Where LeBlanc stands.** At your base, always. A unit is played to 355.2.a's default: *"By default,
Valid locations include the controller's Base or a Battlefield the controller controls."* Her [Assault]
invites an attack, and an attack puts her at a battlefield. Swept with `grep -i banish
data/corpus_flat.txt` and read row by row: exactly three cards banish an enemy unit off the board, and
all three say *at a battlefield*. `UNL-007 Smite` (Fury, E2 + 1 Power): *"Deal 3 to a unit at a
battlefield. If it would die this turn, banish it instead."* `VEN-106 Wind and Ghosts` (Chaos, E3 + 1
Power): *"Choose a unit at a battlefield. If it has 3 :rb_might: or less, banish it."* `VEN-110 Mel,
Defiant Soul`: *"banish an enemy unit at a battlefield with 3 :rb_might: or less."* At the base, every
answer to her is a kill, and a kill sends her where the Tomb looks. A banished card is somewhere else,
108.6.c: *"Represents cards that have been removed from play in a more difficult-to-recover way"*.

**How many bodies stand on the Tomb.** Two, and neither is LeBlanc. She dies in the Beginning Step, so
she is gone before 315.2.b.2 asks what you control; a cleanup runs after she leaves the board (319.6,
*"After any number of Game Objects enter or leave the Board"*) and 323.6 strips an empty battlefield:
*"4. Players lose control of any controlled Battlefields without their Units occupying them if the turn
is in an Open State and there is no Showdown or Combat ongoing there."* The entry already puts one
other body there. One is not enough, because the opponent has a whole turn between your Shadow's Call
and your Beginning Phase. Kill the lone Broker then, and the same 323.6 takes the Tomb from you in their
turn's cleanup. LeBlanc still dies on schedule and still draws 2, but nothing returns her. So the second
Broker is played straight onto the Tomb (355.2.a) on the turn Shadow's Call is cast, not after.

## 3. Their order: a one-rune spell on the holder

Fury/Chaos against you, holding the other battlefield, B. On their turn after your Shadow's Call they
cast `OGN-009 Hextech Ray` (Fury, E1 + 1 Power): *"[Action] (Play on your turn or in showdowns.) Deal 3
to a unit at a battlefield."* One rune, exhausted and recycled. Against the entry's single Broker that
is the whole answer for this cycle. Against two, it kills one, the Broker's Deathknell gives you an
exhausted Gold, and the other keeps the Tomb.

## 4. The turns, going first

Mind/Order against Fury/Chaos.

```
turn    runes   your turn                                                 points
T1      2       Honest Broker (E2) at base                                0
their T1        a unit at base, with the 485.7 extra rune.
T2      4       Broker walks to the Tomb, Conquer: +1. LeBlanc from       1
                the Champion Zone (E3 + 1 Order Power) to base: three
                runes exhausted, one Order rune recycled. 3 runes on
                the board.
their T2        their unit walks to B, Conquer.
T3      5       Hold the Tomb: +1 (nothing in the trash, nothing          2
                returns). Shadow's Call (E2) on LeBlanc: draw 2. Second
                Honest Broker (E2) straight to the Tomb. 1 rune unspent.
their T3        Hextech Ray on a Broker at the Tomb (one rune). It dies:
                Gold token, exhausted. The other Broker holds the Tomb.
T4      7       Beginning Step: LeBlanc dies to [Temporary], Deathknell
                in your Beginning Phase: draw 2. Scoring Step: Hold the
                Tomb: +1, and the Tomb returns her to the empty Champion
                Zone. Draw Phase: draw 1. Main: LeBlanc again (three
                runes, one recycled), Shadow's Call (E2): draw 2.          3
                6 runes on the board, 2 unspent.
```

T4 is the engine at full speed: five cards (2 + 1 + 2) and a Hold, for five runes, one of them leaving
the board. The rune count follows 315.3.b, *"1. The Turn Player channels 2 runes from their Rune
Deck."*, less the one Order rune each LeBlanc recycles.

## 5. Breaks to

**The line breaks to `SFD-023 Piercing Light`** (Fury, E2 + 1 Power), cast on their T3 instead of
Hextech Ray: *"[Repeat] :rb_energy_2::rb_rune_fury: (You may pay the additional cost to repeat this
spell's effect.) Deal 2 to a unit at a battlefield, then deal 2 to up to one other unit."* Both Might-2
Brokers die in one spell, and 323.6 takes the Tomb in their cleanup. Two runes, one of them recycled.
On your T4 LeBlanc still dies and still draws 2, but you hold nothing, so she stays in the trash. Taking
the Tomb back that turn is a Conquer, not a Hold, and the Tomb reads *"When you hold here"*. She is
still in the trash on their T4, and that is where `VEN-101 Gust Monk` (Chaos, E2 M2, plus E1) finishes
it: *"You may pay :rb_energy_1: as an additional cost to play me. When you play me, if you paid the
additional cost, banish a card from any trash to give a unit [Assault 2] this turn."* Banished, the
Chosen Champion is out of the Tomb's reach for the rest of the game. Five runes over two turns, and the
second card leaves them a body.

A third body on the Tomb beats Piercing Light without its [Repeat]. With it paid, the spell costs four
runes, two of them recycled, and kills up to four Might-2 bodies, while 103.2.b allows three Brokers.
That is not a race a garrison of Might-2 units wins.

## 6. Verdict

**Four cards a turn and a Hold, as the entry says, if the Tomb survives the opponent's turn.** The
rules hold up: the kill is in the Beginning Step, the return in the Scoring Step, and the doubled
Deathknell is real. The cost the entry leaves out is the garrison. It needs two bodies that are not
LeBlanc, placed the turn Shadow's Call is cast, and LeBlanc must stay at her base, where nothing in the
pool can banish her. The line breaks to a two-rune spell that kills both bodies, and a three-Energy
unit then removes LeBlanc from the trash for good.

## 7. Not verified

I did not walk the opponent killing LeBlanc on their own turn (she draws 1, and the Tomb still returns
her at your Hold), `OGN-033 Shakedown` on her at base, or Deceiver's own Hold trigger, which could make
a [Temporary] Reflection copy of a Broker and does not help the Hold because it dies in the Beginning
Step too. Burn Out (431.1.a) after the third Shadow's Call was not counted. 2v2 was not walked.

## Leads

- The entry's step 2 says one body on the Tomb is enough (*"Honest Broker is enough"*). Against a
  one-rune spell on the opponent's turn (`OGN-009 Hextech Ray`) it is not: 323.6 takes the Tomb in
  their cleanup and nothing returns LeBlanc. Two bodies other than LeBlanc, placed the turn Shadow's
  Call is cast.
- The entry does not say where LeBlanc stands. The three cards that banish an enemy unit off the board
  (`UNL-007 Smite`, `VEN-106 Wind and Ghosts`, `VEN-110 Mel, Defiant Soul`) all read *at a
  battlefield*, so at her base the only removal is a kill, which feeds the Tomb.
- The entry names no answer. `SFD-023 Piercing Light` kills both Might-2 holders for two runes, and
  `VEN-101 Gust Monk` (*"banish a card from any trash"*) then removes LeBlanc while she waits in the
  trash for a Hold that does not come.
