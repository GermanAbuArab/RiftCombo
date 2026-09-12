# Play — Chaos/Order, the identity with one answer: is it actually viable?

Issue #200, lane rc-synth, 2026-09-12. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`.

The user asked for run plays as *"things to check if they are viable"*. This is the first one written
for a **specific line** rather than for the baseline, and the line is the one this lane wrote for the
only identity that had no legal finisher surviving a stalled board —
`ivern-ride-the-wind-double-conquer`. The catalogue says it reaches eight points. **A run play asks a
different question: on which turn, against an opponent who is doing something, and does that beat
what they are doing?**

---

## Needs

| | |
|---|---|
| **Legend** | `VEN-155 Heart of the Tempest` — a forced shell; the pool prints exactly ONE Chaos/Order legend name |
| **Main deck, the line** | 3× `UNL-177 Ivern, Friend to All` (E6, no Power) · 1× `OGN-210 Daring Poro` (E2) · 3× `OGN-173 Ride the Wind` (E2 + 1 Chaos Power) |
| **Rune deck** | 12 (161.2.a), of which **at least 3 must be Chaos** — 164.2.b.1 adds Power that "corresponds to the Domain of the Rune that is being Recycled", and the three spells want Chaos Power |
| **Total** | **E26 + 3 Chaos Power**, 7 cards |

**The scenario is a stalled board**, because that is what the line is for: the opponent controls both
battlefields and garrisons them, so 315.2.b.2 Holds nothing for you and your Hold curve pays zero.

## The mana, so every line below is checkable

From [the unopposed clock](2026-09-12-the-unopposed-clock.md): 315.3.b channels 2 runes a turn, 161.2.a
caps the deck at 12, **164.2.a taps a rune for 1 Energy and 164.2.b recycles it for 1 Power of its
domain — and 164.2.b's cost is the RECYCLE, not an exhaust**, so one rune pays Energy *and* Power in
the same turn. 161.2.b sends a recycled rune back to the Rune Deck, so **every Power you spend costs
you a rune on the board.** Going first, which 485.7 makes the slower seat.

Runes available: **T1 = 2, T2 = 4, T3 = 6, T4 = 8, T5 = 10, T6 = 12.**

---

## The turns

| turn | runes | play | board |
|---|---|---|---|
| **T1** | 2 | `OGN-210 Daring Poro` (E2) | Poro at base, exhausted (143.4). It never has to move again — Ivern reads *"your units"* with no location clause. |
| **T2** | 4 | **nothing** | Ivern is E6 and nothing in the line costs 4. This turn is dead, and it is the price of a 6-drop payoff. |
| **T3** | 6 | Ivern #1 (E6), choosing **Cat** | enters exhausted |
| **T4** | 8 | Ivern #2 (E6), choosing **Dog** | 2 Energy unspent |
| **T5** | 10 | Ivern #3 (E6), choosing **Poro** | 4 Energy unspent. All four tags — Bird from the Daring Poro… |

> **Correction caught while writing this table, and it is the sort a run play exists to catch.**
> `OGN-210 Daring Poro` carries the tag **Poro**, not Bird. So the three Iverns must choose **Bird,
> Cat and Dog**, and the Poro supplies the fourth. Reading a card's tag off its *name* is exactly the
> kind of slip that survives a rules check, because every paragraph cited is still correct.

| turn | runes | play |
|---|---|---|
| **T6** | 12 | 315.1.b readies all three Iverns at your Awakening. **The finishing turn:** |

1. Standard-Move all three Iverns to the first battlefield — **one game action** (144.3, with 144.3.a
   requiring the shared destination), each paying its own exhaust (144.2). 450 applies Contested.
2. Cleanup: 323.9 stages a Combat (opposing units are present), it opens, and your summed Might is
   **18** against their garrison (465.2.c). You win under 466.3.a, 466.5 establishes Control,
   466.5.d makes it a **Conquer**.
3. **1 Score + 3 Ivern Gains = four points.** 383.4.c.2.a pays every Ivern *present*, not the one
   that walked in.
4. Still your Main Phase: cast three `Ride the Wind` — **E6 and 3 Chaos Power**, which 12 runes cover
   with room (tap 6 for Energy, recycle 3 Chaos for Power, leaving 9 on the board). Each moves one
   Ivern to the second battlefield and readies it. The move is by effect (449, 420.2.b), so 144.4's
   base↔battlefield restriction does not bind it and **420.3.a's exhaust is not charged** — which is
   the only reason three already-exhausted Iverns can make the trip.
5. Cleanup: the second battlefield Conquers the same way. 470 permits it because it is a *different*
   battlefield. **1 Score + 3 Gains = four more.**

**Eight points on turn 6.**

### Breaks to

- **One removal spell aimed at the Daring Poro, cast on their own turn.** Ivern's four-tag clause
  follows the effect verb, so 383.2.a.1 makes it part of the **Effect**, checked on resolution — kill
  the Poro and all six Ivern Gains blank, leaving the two bare Conquer Scores. **Two points instead of
  eight, for one card.** `OGN-229 Vengeance` (Order, E4 + 2 Power, *"Kill a unit."*),
  `VEN-154 Public Execution` (Body/Order, E2 + 1 Power) and `SFD-158 Sandshifter` (Order, E5 + 2
  Power) all reach a base.
- **It cannot be done at instant speed**, which is the only reason the line survives: swept over every
  non-banned card carrying `[Reaction]` in its own text, the only one reaching a base is
  `OGN-033 Shakedown`, and its own text lets the defender decline by having the caster draw 2. So the
  answer is cast a full turn early and is fully telegraphed.
- **The answer to the answer costs two Energy**: a second Daring Poro (103.2.b allows three).
- **A garrison of summed Might 18 or more at either battlefield** stops a leg outright.

---

## The verdict: it is a race, and going first it is roughly a tie

**This is the part the catalogue cannot say.** The opponent on this board is not idle — they are
holding two battlefields, which is the do-nothing Hold curve, and that curve pays **2 points a turn
from their own Beginning Phase** (315.2.b.2 with 470). If they took both battlefields on their turn 2
or 3, they are at eight on **turn 5 or 6** — for free, having spent nothing but the bodies.

So the honest reading of "is it viable":

- **It is not fast.** Turn 6 is the floor and it cannot be improved: three E6 bodies cannot land
  before T5 on 2-runes-a-turn, and 143.4 costs a turn after that. T2 is dead.
- **It does not interact.** Nothing in the seven cards slows the opponent down. It races a curve that
  is already ahead and wins only if their start was slow or their garrison thin.
- **It is still the identity's best answer**, which is the actual finding: Chaos/Order owns no
  board-independent point source (they are all Mind), and its only other finishers are Hold-gated and
  therefore dead on exactly this board. **The line is correct and the identity is the problem.**

The constructive version, and it is a design note rather than a line: at E26 the deck has **four to
six unspent Energy on turns 4 and 5** and every card in it is a payoff. Chaos is the domain of
movement and denial; spending T2's dead four Energy and T4-T5's spare on anything that costs the
opponent a Hold would move this from a tie to a win, and none of that is in the entry because the
entry prices a combo rather than a game.

---

## What writing this play found in the catalogue's own instrument

`npm run adversarial -- --turns` reports this line at **T8**. Played by hand it is **T6**, and the
difference is a defect in the clock rather than in the line.

`deployTurn()` in `scripts/adversarial-check.mjs` is a greedy allocator: each turn it buys the first
affordable card from a list sorted by total cost. Traced on this line it buys a **Ride the Wind on
turn 1** — and since the model does `runes -= c.p` when a Power cost is paid (correctly, per 161.2.b),
spending Power on turn 1 drops the board to **one rune** and stunts rune growth for the rest of the
game. It then cannot afford an Ivern until T5, and finishes deployment on T7:

```
T1: runes 1, bought [RideTheWind]      <- a human never does this
T2: runes 2, bought [RideTheWind]
T3: runes 3, bought [RideTheWind, DaringPoro]
T4: runes 5, bought [-]
T5: runes 7, bought [Ivern]
T6: runes 9, bought [Ivern]
T7: runes 11, bought [Ivern]           -> reported as deploy+1 = T8
```

**A spell is not deployed; it is cast on the turn it is used.** Treating spells as finishing-turn
costs and permanents as deployment gives T6 here, and across the catalogue it **moves 25 of the 80
finishers and flips 8 out of the "slower than doing nothing" bucket** — which is §7's headline, so
the 33-of-45 figure is an over-count by something like that margin.

**That correction is NOT being shipped, because it is not right yet**: the same change sends
`gutter-palace-keeper-time-warp` and `time-warp-hold-burst` to Infinity (it demands every spell be
payable in a single turn, which a Time-Warp CHAIN spreads across several) and moves
`grand-plaza-recruit-vanguard` the wrong way. The defect is real and demonstrated; the replacement
model needs a turn-by-turn allocator rather than a sorted greedy pass, and that is a bigger change
than this play should make.
