# Play — the toll is paid in runes, and the Investigator has to stand there before anyone moves

Issue #264 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `mageseeker-investigator-mass-move-tax`**, the mono-Order ENGINE that sets `UNL-163
Mageseeker Investigator` (a rainbow per extra unit moved to his battlefield at once) in front of
`VEN-118 Horns of the Dragon` (a 6-Might [Tank]). The entry is right that the toll prices 144.3 and
right that it is not a lock. Walked as a game, two orders matter: yours, because the Investigator taxes
nothing until he is standing at the battlefield, so you conquer it first and then play him straight
there; and theirs, because the toll is paid out of runes, and a rune spent on it is a rune that is not
on the board next turn.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `4925586`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 77 of them with no play** —
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 22 (hits on *first* and *before*), first in the list. The other entry of this slice is
rank 23, played in [the Axe sleeps only while someone carries it](2026-10-05-the-axe-sleeps-only-while-someone-carries-it.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Order in its pair (103.1.b) |
| **First** | a battlefield you control, A |
| **Then** | `UNL-163 Mageseeker Investigator` (Order, E4, M4) played to A |
| **And** | `VEN-118 Horns of the Dragon` (Order, E6, M6) at A |

The card text the play turns on:

- Mageseeker Investigator: *"Opponents must pay :rb_rune_rainbow: for each unit beyond the first to
  move multiple units to my battlefield at the same time."*
- Horns of the Dragon: *"[Tank] (I must be assigned combat damage first.)"*

## 2. Your order: conquer A, then play him to it

The clause reads *"my battlefield"*. An Investigator at your base taxes nothing, and a unit played to
the base enters exhausted — 143.4: *"Units enter the Board exhausted."* — so walking him in costs a
turn. But a unit does not have to start at the base. 355.2.a: *"By default, Valid locations include the
controller’s Base or a Battlefield the controller controls."* So on T2 the Poro walks into A first, the
Showdown closes, and 348.2.a hands you A — *"If only one player’s Units remain at the Battlefield, and if
that player does not already Control the Battlefield, that player establishes Control over the
Battlefield."* Only then is A a legal place to play the Investigator. Played in the other order, he goes
to the base and the toll starts a turn later. Horns of the Dragon follows him straight to A on T3 the
same way.

The rule he prices is the one that lets a swarm arrive at all. 144.3: *"Players may perform multiple
Units' standard move simultaneously. This is treated as one game action performed on multiple Units."*
And the rules use him as the example of what kind of cost the toll is — 204.4: *"Applied Costs: These
Costs are applied to one or more Game Actions, and typically take the form of a passive ability with a
Cost within Instructions preceded by “must.”"*

## 3. Their order: the toll is paid from the board

The opponent never needs priority to pay. 429.3: *"Activated abilities that Add resources and have the
Reaction tag can be activated at any time that spells or abilities require resources be paid."* — and its
second example is this exact move, two units walking to a battlefield where an Investigator stands. A
rune's Power ability costs the rune itself — 164.2.b: *"Recycle this: [Reaction] — Add [C]."* — and
161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."*

So the real price of moving three bodies into A at once is two runes off the board. It costs nothing
this turn — 164.2.b has no exhaust in its cost, so runes already tapped for Energy still pay — and two
Energy on their next turn: a board of six runes on their T3 is four, and six again on their T4 instead of
eight, a turn behind their curve.

## 4. The turns, going first

Mono-Order. The opponent is a token swarm holding the other battlefield, B, and wants A.

```
turn    runes   your turn                                                 at A
T1      2       Daring Poro (E2) at base                                  —
T2      4       Poro walks to A, Conquer: +1. Then Mageseeker             Poro, Investigator
                Investigator (E4) played to A.
their T2        Three bodies to A at once: 2 rainbow, two runes           (toll live)
                recycled. Or one body alone, no toll, into a 6-Might
                garrison.
T3      6       Hold A: +1. Horns of the Dragon (E6) played to A.         Poro, Investigator,
                                                                          Horns
their T3        An attack must assign 6 to Horns before any other         (toll + Tank)
                body of yours (815.1.c.2).
T4      8       Hold A: +1. 8 Energy of bodies to A or base.              same
```

The garrison is Poro M2, Investigator M4 and Horns M6, summed Might 12 for 465.2.c — *"Starting with the
Attacker, each player assigns an amount of damage equal to their summed Might among the other's Units."*
815.1.c.2 then orders the bill: *"Units without Tank are invalid assignments until all units with Tank
have lethal damage assigned to them."*

## 5. Breaks to

**The toll breaks to their own runes**, at one recycled rune per body beyond the first, paid inside the
move (429.3). It is never a lock: a player with the runes walks in.

**The Investigator breaks to `OGN-213 Hidden Blade`** (Order, E2 + 1 Power, *"[Action] (Play on your
turn or in showdowns.) Kill a unit at a battlefield. Its controller draws 2."*), cast in their Main
Phase **before** the move. That is their order: kill first, then move as many bodies as they like for
free. The Power is one recycled rune, the same price as one extra body's toll, and it draws you two — so
killing him is worth it to them only for a move of three or more. Outside Order, `OGN-229 Vengeance`
(E4 + 2 Power) is the same answer at double the price. `OGN-133 Flurry of Blades` does nothing here:
the cheapest body at A is Might 2.

**Splitting the move costs the turn.** 144.2: *"Exhausting the Unit is the Cost for this action."*, and
the unit readies again only at their next Awakening, so one body a turn walks in for free into a
garrison that is growing faster.

## 6. Verdict

**The toll is real and small, and it lands on the one resource a swarm cannot replace in a turn.** A
rainbow per extra body is a recycled rune each, so a three-body move costs a swarm its next turn's
curve, not just its Power. The Tank behind it makes whatever does walk in pay six damage before
anything else of yours can be assigned. Nothing here scores: the points are the contested Hold curve,
one a turn from A. The line's only ordering demand is yours, on T2 — conquer, then play him to A.

## 7. Not verified

I did not walk a swarm that arrives by effect rather than by Standard Move, a two-domain shell, or
2v2. That a move by effect of several units at once is also taxed is read from the card's *"to move
multiple units"*, which does not say Standard Move; I found no worked example either way.

## Leads

- The entry's first step plays the Investigator and then *"garrison the battlefield"*, which reads as
  play him at the base and walk him in. 355.2.a lets him be played straight to a battlefield you already
  control, so the toll goes live a turn earlier if A is conquered first.
- The entry prices the toll as Power. Paid through 164.2.b, every rainbow is a rune sent to the Rune
  Deck (161.2.b), so the toll also costs the opponent board, which is the larger half.
- `OGN-213 Hidden Blade` is the opponent's cheapest answer if they run Order, and it hands you two
  cards; the entry names no answer to the Investigator.
