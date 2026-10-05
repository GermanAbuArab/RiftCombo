# Play — the Bow fires before the giant swings, and one Calm counter undoes the turn

Issue #252 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `noxian-guillotine-recurve-bow-delayed-kill`**, the Fury/Order ENGINE that opens a turn
with `OGN-254 Noxian Guillotine` so its [Legion] stays off, marks a unit to die the next time it
takes damage, and lets `SFD-016 Recurve Bow`'s attack trigger supply the damage. The rule is right
and Riot works it on this card. Walked as a game, the Bow's real job is not the damage: it is that
the marked body dies **before** the damage step, so its Might never reaches your attacker.

**Why this line.** `scripts/sequence-pick.mjs` re-run on 2026-10-05 at `63b679a` reads 771 entries,
262 with forced-ordering language and **102 in the queue**, unchanged from the last slice. The pick
is by global rank, skipping entries that already have a play. This entry is rank 8 (two hits on
*first*); rank 7 is played in
[the Blade draws what it costs](2026-10-05-the-blade-draws-what-it-costs.md). The other entry of
this slice is rank 10, played in
[the buff is a Flurry insurance policy](2026-10-05-the-buff-is-a-flurry-insurance-policy.md); rank 9
already has a play.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-253 Hand of Noxus` — forced: the Guillotine is a Signature card tagged Darius |
| **The kill** | `OGN-254 Noxian Guillotine` (Fury/Order spell, E4 + 1 Power, [Action]) x3 |
| **The damage** | `SFD-016 Recurve Bow` (Fury gear, E2, Might Bonus +0, [Equip] one Fury rune) |
| **Carrier, walked here** | `OGN-219 Vanguard Sergeant` (Order, E4, M4) — not in the entry |
| **Bodies** | `OGN-210 Daring Poro` (Order, E2, M2), `SFD-159 Trusty Ramhound` (Order, E2, M2) |
| **Board it wants** | an enemy battlefield with one big body on it |

The card text the play turns on:

- Noxian Guillotine: *"[Action] (Play on your turn or in showdowns.) Choose a unit. Kill it the
  next time it takes damage this turn. [Legion] — Kill it now instead. (Get the effect if you've
  played another card this turn.)"*
- Recurve Bow: *"[Equip] :rb_rune_fury: (:rb_rune_fury:: Attach this to a unit you control.)
  [Effect] When I attack or defend, deal 2 to an enemy unit here."*
- Hand of Noxus: *":rb_exhaust:: [Reaction], [Legion] — [Add] :rb_energy_1:. (Abilities that add
  resources can't be reacted to. Get the effect if you've played a card this turn.)"*

## 2. The rule, and why it holds

158.2's worked example is the Guillotine's own text: *"If the Legion condition is satisfied, the
unit is killed immediately and the instruction to kill it the next time it takes damage is ignored,
even if the unit remains on the board somehow."* So the order of the turn decides the mode, and
812.1.c says what counts: *"As long as a card different than the one with the Legion ability has
been Finalized by you on the same turn then the Dependent Ability is Active on the card with
Legion."* A card, not an ability. Two consequences for the walk:

- **The Bow must be played on an earlier turn.** It is a card; playing it this turn switches the
  Guillotine to the immediate mode. Its [Equip] is an Activated Ability (818.1), so attaching it
  this turn does not count.
- **The legend's Energy arrives after the Guillotine, never before.** Hand of Noxus is also
  [Legion]-gated, so on a Guillotine-first turn the Guillotine is paid entirely out of runes, and
  the legend's 1 Energy is only for what comes after.

## 3. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of your Main Phase. A rune pays 1 Energy by exhausting
(164.2.a) and 1 Power by recycling (164.2.b); the recycled rune goes to the Rune Deck (161.2.b) and
two come back each Channel Phase (315.3.b).

```
       R   your Main Phase                                         spent      you
T1     2   Daring Poro                                              E2          0
T2     4   Poro walks to the empty battlefield A -> Conquer;
           Trusty Ramhound to A; Recurve Bow (unattached, at base)  E4          1
  their T2: a body walks into B and Conquers it
T3     6   Hold A. Vanguard Sergeant at base; [Equip] the Bow
           on him (one Fury rune, recycled -> R 5)                  E4+1P       2
  their T3: they play a Might 6 body at B
T4     7   Hold A. Noxian Guillotine FIRST, on their Might 6 body
           (recycle -> R 6). Sergeant walks base -> B, attacks.
           Bow trigger: 2 to the marked body -> it dies.
           No defender left: Conquer B. Legend adds 1 Energy.      E4+1P       4
T5         Hold A and B                                                         6
T6         Hold A and B                                                         8
```

The Sergeant walks from the base because 144.4.a is the move a body at A does not have: a body
already at A would need [Ganking] (144.4.c.1, *"Units with Ganking may use their Standard Move to
Move from Battlefield to Battlefield."*). Poro and Ramhound stay at A so 323.6 does not take it
when the Sergeant is elsewhere.

**Why the Bow and not just the combat.** Combat damage also arms the Guillotine — 417.1.a: damage
assigned in the damage step *"will cause Damage to be Dealt when assignment is complete"* — so a
plain attack into the marked body kills it too. But then it dies in the same step it hits back:
465.2.c, *"each player assigns an amount of damage equal to their summed Might among the other's
Units"*, and the Sergeant takes 6. The Bow's 2 lands at the attack trigger, before the damage step,
so the marked body is gone and 465.1's tasks never run: *"If both Attacking and Defending units
remain at this battlefield, the following Tasks become Outstanding"* — they do not. 466.5 then
gives the Sergeant the battlefield. **The Bow buys a bloodless conquer against a body four times
its damage.**

**On the board it scores what the bodies score.** Eight on **T6** only if they never retake B; on
the ordinary board it is the contested curve, **T9**, and the Guillotine is the tool that keeps B
from being held against you. Three copies (103.2.b) is three such turns a game.

## 4. Breaks to

**`OGN-045 Defy`** — Calm, E1 + 1 Power, [Reaction]: *"Counter a spell that costs no more than
:rb_energy_4: and no more than :rb_rune_rainbow:."* The Guillotine costs exactly E4 and one Power,
so it is inside Defy's range by one point on each axis. Cast it on the Guillotine; 425.1.c:
*"Countering does not refund any costs paid to play a card, activate an ability, or trigger an
ability."* You lose the card and E4 + 1 Power, and the Sergeant now walks into a Might 6 body with
Might 4. One Energy and one Power undo the turn.

**Cheaper, if the carrier is small: `OGN-169 Gust`** — Chaos, E1, [Reaction]: *"Return a unit at a
battlefield with 3 :rb_might: or less to its owner's hand."* Cast in response to the Bow's trigger,
on the carrier. 359.3.f.2's worked example is this case: Yasuo, moved home in response to his own
attack trigger, and *"“here” is no longer the battlefield where combat is ongoing and the attack
trigger mistargets."* The Guillotine is scoped *"this turn"*, so it is spent. **The Bow's +0 Might
Bonus is why this bites**: a +0 gear never lifts its carrier out of Gust's range, so the carrier has
to be printed at Might 4. That is why the walk uses the Sergeant and not the Poro (Might 3 while
attacking, with [Assault]).

**What does not break it: damage.** `OGN-133 Flurry of Blades` and every other ping arms the
Guillotine for you. The marked body dies to the first point of damage from anyone.

## 5. Verdict

**The rule is right, and the Bow's value is timing, not damage.** Played first in the turn, the
Guillotine plus a Bow trigger kills a body of any Might before the damage step, so the attacker
walks in, takes nothing, and conquers. Played second, it is a plain kill that one would-die shield
answers whole.

**It scores nothing; priced as a game it is the contested curve, T9**, with three turns a game
where a big defender does not hold the battlefield. It breaks to `OGN-045 Defy` for E1 + 1 Power,
and to `OGN-169 Gust` for E1 if the carrier is printed at Might 3 or less.

## 6. Not verified

I assumed perfect draws, runes in the domains the costs want (108.5.d), and an opponent with one
body at B. I did not walk a second defender at B (the Sergeant then fights it at full summed Might),
the defence half of the Bow on their turn, or a would-die shield on the marked body, which this
mode survives only because the delayed kill is not spent by a death that did not happen.

## Leads

- The entry's notable says *"the Bow is the cheap answer for a turn where you would rather not open
  a combat"*. The Bow fires only *"When I attack or defend"*, i.e. inside a combat; its real
  advantage over combat damage is that the marked body dies at the attack trigger, before 465.2.c
  sums its Might against your attacker.
- The entry's step 1 does not say the Bow must be PLAYED on an earlier turn: 812.1.c counts any
  Finalized card, so playing the Bow on the Guillotine turn switches [Legion] on. Attaching it does
  not (818.1).
- Hand of Noxus's own Energy is [Legion]-gated, so on the turn the line wants the legend adds
  nothing towards the Guillotine; the entry calls the play-order decision *"a real one"* without
  pricing that.
- `OGN-045 Defy` counters the Guillotine exactly at its ceiling (E4, one Power), and
  `OGN-169 Gust` on a carrier of Might 3 or less mistargets the Bow (359.3.f.2). The +0 Might Bonus
  the entry praises is what keeps every small carrier in Gust's range.
