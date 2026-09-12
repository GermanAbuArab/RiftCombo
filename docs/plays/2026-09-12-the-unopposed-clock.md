# Play — the unopposed clock: eight points by turn 5 with no combo at all

Issue #200, lane rc-synth, 2026-09-12. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules paragraphs pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`.

**This is the yardstick every other play and every finisher in the catalogue should be measured
against, and the project has never written it down.** Almost every entry says "reaches 8" and almost
none says "by turn N, having spent this much". Until you know what a deck does with no combo, you
cannot tell whether a combo is fast.

---

## The mana model, so every later line is checkable

| rule | text |
|---|---|
| 161.2.a | "Exactly 12 Rune cards chosen during Deck Construction." |
| 315.3.b | "The Turn Player channels 2 runes from their Rune Deck." |
| 485.7 | "The player going second channels an extra Rune from their Rune Deck during their first Channel Phase of the game." |
| 164.2.a | "[E]: [Reaction] — Add [1]." |
| 164.2.b | "Recycle this: [Reaction] — Add [C]." |
| 161.2.b | "When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck." |
| 415.3.a | (readies all non-spell Game Objects in your Awakening, so every rune on the board is Energy again each turn) |

Two consequences the arithmetic turns on:

- **A rune pays Energy AND Power in the same turn.** 164.2.a costs the rune's exhaust; 164.2.b's cost
  is the RECYCLE and carries no exhaust. So a rune already tapped for 1 Energy still recycles for 1
  Power of its Domain. With `R` runes on the board a turn affords up to `R` Energy and up to `R`
  Power — but every Power spent this way takes that rune OFF the board.
- **Therefore `R` grows by 2 a turn minus whatever you recycled**, capped at 12 simultaneously
  (161.2.a), and a recycled rune returns to the Rune Deck to be re-channelled. Going first:
  R = 2, 4, 6, 8, 10, 12, 12 … if you never spend Power.

## The points model

| rule | text |
|---|---|
| 190.1 | "Control is established over Battlefields through the course of play." (both battlefields start uncontrolled) |
| 143.4 | units enter exhausted, so a body played on turn N moves on turn N+1 (315.1.b readies it at your Awaken) |
| 344.2 | "If Control of a Battlefield is Contested, there aren't units controlled by different players there, and the turn is in a Neutral Open State, a Showdown is opened during the next Cleanup." |
| 348.2.a / 348.2.a.1 | "…that player establishes Control over the Battlefield." / "This results in a Conquer if that player has not yet scored that Battlefield this turn." |
| 315.2.b.2 | "The Turn Player Holds all Battlefields they Control." |
| 470 | "A player may only Score, from either method, once per Battlefield per turn." |
| 194.3 / 472 | Victory Score 8; you win at the Cleanup once you are at or above it with more points than any opponent |

So: **walking one body into an empty, uncontrolled battlefield is a free Conquer in your own Main
Phase, and every battlefield you still control at your next Beginning Phase pays again.** The ceiling
is 2 points a turn on a two-battlefield board.

---

## The play: mono-Body, two Determined Sentry, turn 5

**Needs.** 2× `UNL-111 Determined Sentry` (Body, E1, M1, *"I can't move to base."*) — the cheapest
bodies that exist. Swept over `data/cards.json`, **the entire pool prints exactly TWO units at Energy
cost 1 or less**: `UNL-111 Determined Sentry` (Body, E1, M1) and `VEN-043 Steel Paws` (Calm, E1, M0).
Nothing else. Any legend whose domains include Body. No battlefield requirement — 485.5 puts one of
each player's battlefields on the table at setup whatever you do.

```
T1  channel 2 (R=2).  Play both Determined Sentry to base (E1 + E1 = 2 Energy). They enter
                      exhausted (143.4).
T2  channel 2 (R=4).  Awaken readies both (315.1.b).
                      Standard-Move Sentry A to battlefield A (144.4.a, exhaust 144.2).
                      Cleanup -> Contested (190.3.a.1) -> 344.2 opens a Showdown -> nobody
                      contests -> 348.2.a Control -> 348.2.a.1 CONQUER.               +1  = 1
                      Standard-Move Sentry B to battlefield B. Same sequence.         +1  = 2
T3  channel 2 (R=6).  315.2.b.2 Holds both battlefields.                              +2  = 4
T4  channel 2 (R=8).  Hold both.                                                      +2  = 6
T5  channel 2 (R=10). Hold both.                                                      +2  = 8  -> 472 wins at the Cleanup
```

Eight points on turn 5, for two Energy spent on turn 1 and nothing afterwards. The other 38 cards of
the deck never have to be drawn.

**Why the two moves on T2 are two separate actions.** 144.3.a requires a shared Destination for a
simultaneous multi-unit move, and these go to different battlefields, so they are two game actions —
both legal, because 144.1.a allows the Standard Move "any time during a player's Main Phase" and the
first Showdown has already resolved by the time the second move is declared. 144.1.c ("This action
cannot be performed during a Showdown or Combat") is the rule to watch, and it is why they are
sequenced rather than interleaved.

**Why `UNL-111`'s drawback is free here.** "I can't move to base" costs a holding body nothing: it is
already where it wants to die.

### Breaks to

- **`OGN-133 Flurry of Blades` — Body, E1: *"[Reaction] (Play any time, even before spells and
  abilities resolve.) Deal 1 to all units at battlefields."*** One Energy kills BOTH Sentries at once
  (143.2.a: marked damage at or above Might kills, and they are Might 1), and because it is
  [Reaction] it lands inside the Showdown that the first move opened (345/346 give both players
  Focus and priority there, 813.1.c.1 admits a [Reaction] in any Closed State). It is the single
  cheapest card in the pool against the single fastest clock in the pool, and the answer costs one
  Energy against their one Energy.
- **Any body the opponent puts on a battlefield first.** 344.2 needs "there aren't units controlled
  by different players there"; a garrison turns the free walk-in into a Combat (323.9), where a
  Might 1 Sentry loses to anything.
- **Any single removal spell**, because losing one Sentry costs 1 point a turn forever.

### What the opponent does with their turns

They get four of them (T1–T4 on the draw). Turn 2 is the one that matters: the Sentries are Might 1
and on battlefields, so anything that deals 1 damage answers the whole play for its cost. **A clock
this fast is also this fragile — that is the honest content of the play, and it is why the catalogue
is full of five-card finishers rather than two-card ones.**

---

## The same clock in every other identity, and why it is one turn slower

Chaos/Fury (and every identity that is not Body or Calm) has **no unit at Energy 1**. Its cheapest
bodies are Energy 2 — twenty-four of them, all at 2 Might and no Power cost — and turn 1 affords
exactly one. That costs a whole turn:

```
T1  R=2.  Play one E2 body to base.                                              0
T2  R=4.  Move it in -> Conquer.  Play a second E2 body (2 Energy spare).       +1  = 1
T3  R=6.  Hold A (+1). Move body 2 in -> Conquer (+1).                          +2  = 3
T4  R=8.  Hold both.                                                            +2  = 5
T5  R=10. Hold both.                                                            +2  = 7
T6  R=12. Hold both.                                                            +2  = 9  -> win
```

**Turn 6, not turn 5.** The whole difference is the one turn of setup that the two Energy-1 bodies
skip.

---

## The consequence for the catalogue, which is the reason to write this down

Price `tryndamere-brambleback-conquer` — the catalogue's mono-Fury BURST, 9 points in one Conquer —
against this clock. Its own cost line is 26 Energy and 7 Fury Power for 3 `UNL-029 Red Brambleback`
(E4 + 1 Fury each) and 2 `OGN-034 Tryndamere, Barbarian` (E7 + 2 Fury each). Deployed as fast as the
rune curve physically allows, spending on nothing else and drawing perfectly:

```
T2  R=4 -> Brambleback 1 (4 Energy, recycle 1 Fury rune)      R=3
T3  R=5 -> Brambleback 2                                      R=4
T4  R=6 -> Brambleback 3                                      R=5
T5  R=7 -> Tryndamere 1 (7 Energy, recycle 2)                 R=5
T6  R=7 -> Tryndamere 2                                       R=5
T7  attack, win the combat, Conquer: 1 + T x (1 + K) = 9
```

**Turn 7 — one turn slower than doing nothing at all, in the same identity.** That is not an argument
against the entry; it is an argument about what the entry is FOR. Unopposed, the Hold curve has
already won. The BURST earns its slot only on a board where the opponent is taking your battlefields,
because it converts one Conquer into nine points instead of one, and the Hold curve converts it into
one. **A finisher in this catalogue is insurance against a contested board, not a clock — and no
entry says so, because no entry is denominated in turns.**
