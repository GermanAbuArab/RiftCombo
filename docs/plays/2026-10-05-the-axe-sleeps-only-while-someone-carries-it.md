# Play — the Axe sleeps only while someone carries it, and the rescue has to come before the blow

Issue #264 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `spinning-axe-factory-recall-inactive-temporary`**, the Fury/Chaos ENGINE in which
`SFD-186 Spinning Axe`'s [Temporary] sleeps while it is attached, and `SFD-135 Factory Recall` returns
it to hand when its carrier is about to die, so [Quick-Draw] can put it on a new body for its play cost
alone. The entry is right about the rules: 718.2 silences the drawback, 719.5 wakes it, 819.1.d makes
the re-attach free. Walked as a game, the rescue has a narrow window. Factory Recall is an [Action], so
on the opponent's turn it exists only inside a Showdown, which means **before** the combat damage that
would kill the carrier — and a carrier killed by a spell in their Main Phase takes the Axe with it,
because nothing you hold can be played before your Beginning Phase kills it.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `4925586`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 77 of them with no play** —
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 23 (hits on *first* and *before*), second in the list. The other entry of this slice is
rank 22, played in [the toll is paid in runes](2026-10-05-the-toll-is-paid-in-runes.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-185 Glorious Executioner` (Fury/Chaos), forced: the Axe is a Signature card tagged Draven (103.2.d.2) |
| **First** | a body to carry the Axe |
| **Then** | `SFD-186 Spinning Axe` (Fury/Chaos gear, E2 + 1 Power, +3 Might) |
| **And** | `SFD-135 Factory Recall` (Chaos, E1) in hand, with one rune left **ready** on the opponent's turn |

The card text the play turns on:

- Spinning Axe: *"[Quick-Draw] (This has [Reaction]. When you play it, attach it to a unit you
  control.) [Equip] :rb_rune_rainbow: (:rb_rune_rainbow:: Attach this to a unit you control.)
  [Temporary] (If this is unattached, kill it at the start of its controller's Beginning Phase, before
  scoring.)"*
- Factory Recall: *"[Action] (Play on your turn or in showdowns.) Return a gear to its owner's hand."*

## 2. The order: the rescue comes before the blow

Attached, the Axe's [Temporary] is off — 718.2: *"While in this state, the card’s printed Rules Text is
Inactive."* When the carrier leaves the board it is not — 719.5: *"When a Top-Most Card changes zones
from a board zone to a non-board zone, all Attached cards Detach from it, remaining in their current
zones."* — and the clock is 816.1.b: *"At the start of this permanent's controller's Beginning Phase,
before scoring, kill this."*

On the opponent's turn, Factory Recall has exactly one kind of window. 806.1.c.1: *"This can be played
during showdowns on any player's turn."* A combat is one — 464.2: *"When Combat opens, it either opens
with a Combat Showdown, or the current Showdown becomes a Combat Showdown."* — and the damage comes after
it closes, 465.2: *"When the Showdown closes, Attackers and Defenders resolve Combat Damage at the
Battlefield that was attacked, using their current Might."* So the rescue is cast **before** the damage,
and the carrier then fights at its printed Might, not with the +3 it was carrying.

After the damage there is no window at all. A removal spell on the chain is a Closed State, and 309.1.a:
*"Only cards and abilities with the Reaction keyword can be played or activated in a Closed State."*
Factory Recall is not a Reaction. Your own next turn opens with the Beginning Phase, where 335 gives
nobody priority — *"If there are no Outstanding Tasks, no pending Chain Items, no ongoing Showdown, and
it is any other phase of the turn, proceed to the next substep, step, phase, or turn."* — and the
[Temporary] kill is the first thing in it.

The Energy has to be on the board, too. 167: *"Every player's Rune Pool empties at the start of each
player's Main Phase and the end of each player's turn."* — and 415.3.a: *"A player Readies all non-spell
Game Objects they Control during the Awakening Phase on their turn."* So the one Energy for a rescue on
their turn is a rune you did not tap on yours.

On your own turn it is cheaper still. A detached Axe has its printed text back, and 818.1.c.2: *"Equip is
functionally short for “[Cost]: Attach this gear to a unit you control.”"* — one rainbow, against
Factory Recall's E1 plus a replay at E2 + 1 Power. 381 confines that to your own turn: *"All Activated
Abilities can only be activated on the Controlling Player's Turn and during an Open State."*

## 3. The turns, going first

Glorious Executioner. The opponent holds the other battlefield, B.

```
turn    runes   your turn                                                 at A
T1      2       Legion Rearguard (E2) at base                             —
T2      4       Spinning Axe (E2; the Power from a tapped rune, 164.2.b)  Rearguard M5
                attaches to the Rearguard at base. It walks to A,
                Conquer: +1. Two runes left ready, 3 on board.
their T2        They attack A. In the Combat Showdown: Factory Recall     (rescue, M2)
                (E1) the Axe home before damage — or keep it on and
                fight at M5.
T3      5       Hold A if the Rearguard survived: +1. Replay the Axe      a body + Axe
                (E2 + 1 Power) onto any body: [Quick-Draw], no Equip
                cost. Three runes left ready, 4 on board.
```

Two Energy and a Power is the price of every redeploy; one Energy and one untapped rune is the price of
every rescue, and both buy the same +3.

## 4. Breaks to

**The Axe breaks to `SFD-011 Angle Shot`** (Fury, E2, *"[Reaction] (Play any time, even before spells
and abilities resolve.) Choose a unit and an Equipment with the same controller. Attach that Equipment
to that unit or detach that Equipment from that unit. Draw 1."*), cast in their own Main Phase. The
attached Axe is a legal choice — 718.5.b: *"Attached cards still can be chosen or targeted by game
effects while Attached."* — it is detached outside any Showdown, Factory Recall has no window, and your
Beginning Phase kills it before you can [Equip] it. Two Energy, a card for them, and the Axe gone for
good.

**Outside Fury, it breaks to whatever kills the carrier in their Main Phase.** `OGN-213 Hidden Blade`
(Order, E2 + 1 Power, *"Kill a unit at a battlefield. Its controller draws 2."*) on the M5 Rearguard
takes the body and the Axe, and 309.1.a keeps Factory Recall out of the Closed State it opens. You draw
two; you lose a card and a Signature slot.

**The cheapest is `OGN-179 Acceptable Losses`** (Chaos, E1, *"Each player kills one of their gear."*),
if the Axe is your only gear: 355.10.e makes you the one who chooses, and you have only one choice.

## 5. Verdict

**The engine is real and its window is half what it reads.** The Axe survives its carrier when the
carrier dies in a combat you saw coming, at one untapped rune and the +3 in that fight, or on your own
turn at one rainbow through [Equip]. It does not survive a carrier killed by a spell in the opponent's
Main Phase, and it does not survive a detach there. Nothing here scores: the points are the contested
Hold curve, one a turn from A.

## 6. Not verified

I did not walk a second Axe in hand played at [Reaction] speed after the first is lost, or 2v2. That a
detached Axe's [Equip] is usable is read from 718.2 being scoped to *"this state"*, the attached one;
I found no worked example of [Equip] on a detached Equipment.

## Leads

- The entry's step 4 says *"If the carrier dies first, 719.5 detaches the Axe on the board and its
  [Temporary] goes live: Factory Recall it before your next Beginning Phase."* That is possible only if
  the carrier died on your turn or inside a Showdown on theirs. A carrier killed by a spell in their
  Main Phase leaves no window: 309.1.a bars an [Action] from the Closed State, and 335 gives no priority
  before your Beginning Phase.
- The entry's step 3 window is the Combat Showdown, before damage (465.2), so the rescue costs the +3 in
  the very combat it is rescuing from.
- On your own turn the cheaper rescue is the Axe's own [Equip], one rainbow (818.1.c.2), against Factory
  Recall plus a replay at E3 + 1 Power.
- The entry names no answer. `SFD-011 Angle Shot` detaches at [Reaction] speed in their Main Phase and
  leaves the Axe to die at your Beginning Phase; `OGN-179 Acceptable Losses` takes it for one Energy.
