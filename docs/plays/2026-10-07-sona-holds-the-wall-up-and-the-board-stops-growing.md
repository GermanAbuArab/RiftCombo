# Play — Sona holds the wall up, and the board stops growing

Issue #309 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `sona-wind-wall-condition-not-effect`**, the Calm ENGINE in which `OGN-073 Sona, Harmonious`
readies up to four runes at the end of your turn and `OGN-064 Wind Wall` spends them on the opponent's
turn to counter a spell. The entry is right about the rule, and the case is Riot's own: the first
example at 383.2.a.1 is this card. Walked as a game, the line works. Sona lands on T3, and her own
runes counter the two removal spells aimed at her on the opponent's T3 and T4. The price is not in
Energy. Every Wind Wall recycles two runes, which is exactly what the Channel Phase brings back, so on
the turns you hold the wall up your board does not grow: five runes on T4 and on T5, where it would
have been eight and ten. When the opponent plays only units, the readied runes have nothing to counter.
What breaks the line is `VEN-015 Decree of Rage`: one rune, cast on their own turn. It can't be
countered, and it names Sona's domain.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `4015c20`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 63 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 36 (a hit on *in response*), first in the list. The other entry of this slice is rank
37, played in
[the refill held for the Burn Out never gets a turn](2026-10-07-the-refill-held-for-the-burn-out-never-gets-a-turn.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Calm among its domains (103.1.b); here `VEN-145 Curator of the Sands` (Calm/Mind), idle in the walk because nothing in the list costs seven Energy |
| **First** | Sona at a battlefield you control when your turn ends |
| **Held open** | three runes to tap and two Calm runes to recycle, on their turn |
| **Then** | `OGN-064 Wind Wall` (Calm, E3 + 2 Power) in hand |

The card text the play turns on:

- Sona, Harmonious (Calm, E4 + 1 Power, M4): *"At the end of your turn, if I'm at a battlefield, ready
  up to 4 friendly runes."*
- Wind Wall: *"[Reaction] (Play any time, even before spells and abilities resolve.) Counter a spell."*
- Void Seeker (theirs, Fury, E3 + 1 Power): *"[Action] (Play on your turn or in showdowns.) Deal 4 to a
  unit at a battlefield. Draw 1."*
- Sky Splitter (theirs, Fury, E8 + 1 Power): *"[Action] (Play on your turn or in showdowns.) This
  spell's Energy cost is reduced by the highest Might among units you control. Deal 5 to a unit at a
  battlefield."*

## 2. The trigger is decided when it is placed

383.2.a.1: *"Any additional conditional statement immediately after the Condition must be true in
order for the Condition to be fulfilled. Such a conditional statement is part of the Trigger Condition
and not the Effect."* Riot's example is this card: *"Her Trigger Ability’s Condition will be fulfilled
in the Ending Step, but the Triggered Ability will only be placed on the chain if she is located at a
battlefield when the Condition is fulfilled. If she is removed in reaction to the triggered ability, it
will still resolve."* So the readied runes are safe once the trigger is on the chain.

The other half of the same paragraph is the card across the table in this walk. Loose Cannon is the
opponent's legend, and Riot's second example says its *"if you have one or fewer cards in your hand"*
clause *"is not immediately after the trigger condition, so it is part of the effect and not the
condition."* Their hand never drops to one in this game, so the legend never draws.

What the trigger buys is the opponent's turn. 415.3.a: *"A player Readies all non-spell Game Objects
they Control during the Awakening Phase on their turn."* A rune you tap on your turn would normally
stay exhausted through theirs. Sona readies it in the Ending Step, after 167 has emptied the pool
(*"Every player's Rune Pool empties at the start of each player's Main Phase and the end of each
player's turn."*), and the rune itself is what carries over. Wind Wall then costs three of those runes
tapped and two Calm runes recycled.

**The recycle is the price, and it is paid in board.** 164.2.b reads *"Recycle this: [Reaction] — Add
[C]."* That needs no exhaust, so the entry is right that a tapped rune still pays Power. But 161.2.b:
*"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."* And 416.1 puts it
*"on the bottom of the corresponding deck."* The Channel Phase, 315.3.b, says *"The Turn Player
channels 2 runes from their Rune Deck."* Until the twelfth rune is out, those two come off the top
whatever you recycled, so a recycled rune is a rune of growth lost. One Wind Wall a round is two
recycles, and the round ends with the board where it started.

## 3. Their order: removal at Sona, then units

Fury/Chaos with `OGN-251 Loose Cannon`, holding B. Going second, the 485.7 extra rune gives them seven
runes on their T3. Their plan for Sona is the ordinary one: an [Action] removal spell on their own turn,
when she is a 4-Might unit at a battlefield. Void Seeker deals four, which kills her. On their T4 Sky
Splitter costs five Energy and one Fury Power, cut from eight by their 3-Might Skulker, and deals five.

## 4. The turns, going first

Calm/Mind against Fury/Chaos. Your rune deck is nine Calm and three Mind.

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base                                0
their T1        Mystic Poro to base, with the 485.7 extra rune.
T2      4       Poro walks to A, Conquer: +1. Mutated Mouser (E2) to A.   1
their T2        Mystic Poro walks to B, Conquer. Shipyard Skulker (E3)
                to B.
T3      6       Hold A: +1. Sona (E4 + 1 Calm) to A: four tapped, one of  2
                them recycled, five runes left. Ending Step: she is at
                A, so the trigger goes on the chain and readies the
                three still exhausted. Five ready.
their T3        Hold B. Void Seeker on Sona. Wind Wall: three tapped,
                two Calm recycled, three runes left. Countered: no
                damage and no draw. Flame Chompers (E3) to B.
T4      5       Hold A: +1. Sunlit Guardian (E3) to A, two idle. Ending   3
                Step: three readied, five ready.
their T4        Hold B. Sky Splitter on Sona (E5 + 1 Fury). Wind Wall
                again: three runes left. Pouty Poro (E2) to B.
T5      5       Hold A: +1. Allay, Eager Admirer (E3) to A, two idle.     4
                Five ready at the Ending Step.
their T5        Hold B. Jinx, Rebel (E5 + 1 Chaos) and Kai'Sa, Survivor
                (E4) to B. No spell is cast, so the five ready runes
                have nothing to counter.
T6      7       Hold A: +1. A second Sunlit Guardian (E3) and a second    5
                Stalwart Poro (E2) to A, two idle.
their T6        Hold B.
```

Their points: 1 on T2, then one Hold a turn, 5 on T6. The opponent was never idle. They took B,
spent two removal spells on Sona, and built B to nineteen Might.

Your runes: twelve channeled by T6 and five recycled, one for Sona and four for the two Wind Walls.
That leaves five on T4, five on T5 and seven on T6. Without Sona and the Walls the same turns have
eight, ten and twelve. In this game the freeze cost nothing, because the hand was three-drops and two
runes idled on each of those turns anyway. A hand holding a six-drop on T4 would have felt it.

Their T5 is the other cost. 337.2: *"If, after finalizing the Chain Item, that item is a Unit, Gear,
or an ability that Adds resources, it resolves immediately"*. A unit gives no window, and a [Reaction]
in the pool that counters one does not exist. So the five runes Sona readied on T5 did nothing. The
opponent decides which turns the engine is worth anything.

From T6 on, the race is the one the unopposed clock prices. A defends at twenty-four Might
(Stalwart Poro 3 and Mutated Mouser 3 with their [Shield], Sona 4, two Sunlit Guardians 4 each,
Allay 3, the second Poro 3), B at nineteen plus their T6. You hold A to eight on T9, a turn before they
reach eight on theirs, unless they take A first.

## 5. Breaks to

**The line breaks to `VEN-015 Decree of Rage`** (Fury, E1 + 1 Power: one rune, tapped for the Energy and then
recycled for the Power), cast on their T3 in place of Void Seeker: *"[Action] (Play on your turn or in showdowns.) This can't be countered. Deal 4
to an enemy Calm (:rb_rune_calm:) unit."* Sona has four Might and is Calm, so she dies. Wind Wall
cannot touch it. 425.1.a says *"A card or ability that is Countered does nothing and is cleared from
the chain."*, and this card says it can't be countered. The runes she readied on T3 are still ready,
because that trigger resolved before their turn began, so you keep five runes for one Wind Wall on
something else. There is no second trigger. You paid four runes and a card for one turn of the engine;
they paid one rune, and Decree of Rage is not a Signature card, so any Fury deck can run it.

The entry says the only window that beats Sona is *before* the Ending Step, on your turn. That is true of the trigger, and
383.2.a.1 says so. It is not true of the engine. Decree of Rage is cast on their own turn, after the
trigger has resolved, and it ends every later cycle.

The reply is a buff. In Calm/Body, `OGN-257 Blind Monk` reads *":rb_energy_1:, :rb_exhaust:: Buff a
friendly unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff.)"*. That puts Sona at five, so
Decree of Rage and Void Seeker no longer kill her. In this Calm/Mind list the best reply is Allay at A:
*"While I'm at a battlefield, your other units here have [Deflect]."* That makes Decree of Rage E1 + 2 Power,
two runes, but does not stop it.

## 6. Verdict

**Right, and it pays for its own protection, but it holds the board still and it dies for one rune.**
The rules reading is right: the readied runes survive removal in response, and Sona's own runes
countered both spells aimed at her. The play adds two prices. The Power for each Wind Wall is two runes
the board does not get back until the twelfth rune is out, so a wall held up every round keeps you
at five runes. And the four readied Energy count only on turns the opponent casts a spell. The
cheapest answer in the pool needs no counter-play at all, because it can't be countered.

## 7. Not verified

The walk assumes two Calm runes are on the board at each Wind Wall. With nine Calm of twelve that held
here, but I did not deal the channel order. I did not walk their T7 to T9, so I don't know whether
nineteen Might plus three more turns of units takes A. I did not walk `OGN-033 Shakedown`, a [Reaction]
that could hit Sona on your turn, which needs a Closed State there to be played into. I did not walk
2v2 or the `VEN-SP2` reprint.

## Leads

- The entry's notable says the only window that beats Sona is *"removal BEFORE the Ending Step, on your
  own turn"*. That is the window that beats one trigger. The engine dies to [Action] removal on the
  opponent's own turn, after the trigger has resolved, and `VEN-015 Decree of Rage` does it for one
  rune.
- The entry says *"The Power is already free"*. It is free in exhaust. Before the twelfth rune is out,
  every Power is a rune of growth lost (161.2.b, 416.1, 315.3.b). One Wind Wall a round is two
  recycles, the same two runes the Channel Phase brings, so the board does not grow on the rounds the
  wall is used. The walk sits at five runes on T4 and T5.
- The entry names no answer. Decree of Rage (one rune, can't be countered) names Calm units and kills
  a 4-Might Sona. A +1 buff, which `OGN-257 Blind Monk` offers in Calm/Body for one Energy, puts her
  out of its reach.
- Units cannot be countered (337.2). On a turn the opponent plays only units, the readied runes have
  no Wind Wall target.
