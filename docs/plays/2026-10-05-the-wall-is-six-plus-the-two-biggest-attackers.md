# Play — the wall is six damage plus the two biggest attackers, and width walks through it

Issue #254 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `vex-mocking-thwonk-wall`**, the mono-Calm ENGINE that answers an attack on the
opponent's turn: `SFD-040 Thwonk!` stuns two attackers inside the Combat Showdown, and
`UNL-055 Vex, Mocking` moves on the stun into the attacked battlefield as a 6-Might [Tank]. The
entry's mechanics hold. Walked as a game, the line has one exposed turn, a fixed price that has to be
left untapped through your own turn, and a ceiling that is a number: it absorbs the two largest
attackers plus six damage, so the opponent's answer is width, not removal.

**Why this line.** `scripts/sequence-pick.mjs` re-run on 2026-10-05 at `74259ff` reads 771 entries,
262 with forced-ordering language and **102 in the queue**, unchanged since slice 8. The pick is by
global rank, skipping entries that already have a play: `node scripts/sequence-pick.mjs --unplayed`
lists 87 unplayed, and this entry is first, at rank 11 (two hits, *before* and *first*). The other
entry of this slice is rank 12, played in
[play the bodies before the spell](2026-10-05-play-the-bodies-before-the-spell.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Calm in its pair (103.1.b) |
| **The wall** | `UNL-055 Vex, Mocking` (Calm, E5 + 1 Power, M5), anywhere on your board |
| **The trigger** | `SFD-040 Thwonk!` (Calm, E2, [Repeat] 2 Energy), in hand |
| **Mana it holds** | 4 runes left **ready** through your own turn |
| **Board it wants** | a battlefield you control with a garrison the opponent wants to take |

The card text the play turns on:

- Vex, Mocking: *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I must be assigned combat
  damage first.) When you [Stun] an enemy unit at a battlefield, you may move me to that
  battlefield."*
- Thwonk!: *"[Action] (Play on your turn or in showdowns.) [Repeat] :rb_energy_2: (You may pay the
  additional cost to repeat this spell's effect.) Stun an attacking unit. (It doesn't deal combat
  damage this turn.)"*

## 2. The order inside the combat

Thwonk! can only be cast once there is an attacking unit, so it is cast in the Combat Showdown on
the opponent's turn. 806.1.b: *"Action grants the corresponding card or effect permission to be
played or activated during Showdowns, even when it is not the Controlling player's turn."* The two
stuns are chosen as it is played, not on resolution — 820.2: *"When a spell or ability's effect is
performed an additional time with Repeat, choices must be made at the usual time during the Make
Relevant Choices step of Playing a Card."*

Each stun fires Vex. Her move is an effect move, so it ignores her own exhaustion and the Closed
State — 420.2.a: *"Players may only move Game Objects when instructed to do so by Game Effects or
costs."* The move is completed, a Cleanup runs (319.8, *"After a Move is completed"*), and 323.2.a
hands her the Defender designation before damage: *"If there are Units present at the Battlefield
the Combat is taking place at, but do not have a designation, they gain the same designation as
their Controller now"*. The second stun's trigger finds her already there and is declined; 355.4.a
gives it nowhere to go: *"A valid Location for a Move Effect is one other than the Units’ current
Location where they are allowed to be present."*

Then the damage step, in this order:

1. The two stunned attackers add nothing. 423.1.b: *"A Stunned Unit does not contribute its might
   to damage in the combat damage step."*
2. What is left goes into Vex first. 815.1.b: *"I must be assigned lethal damage before any other
   unit with the same controller as me that does not have [Tank] during the Combat Damage step."*
   She is 5 + 1 while defending (814.1.c), so the first 6 points stop on her.
3. Your side swings back at full strength, and the stunned attackers still die at full Might —
   423.1.c: *"A Stunned Unit must still have damage applied to it equal to, or greater than, its
   full might value to be killed."*

**So the wall's ceiling is exact: the two largest attackers, plus six damage.** Anything past that
reaches the garrison.

## 3. The turns, going first

Mono-Calm, two 2-Energy 2-Might bodies as the curve, battlefield A taken early. The opponent is on
an aggressive three-body curve and attacks A on their turn 4 with bodies of 3, 3 and 4 Might.

```
turn   runes   your Main Phase                                     ready on THEIR turn
T1     2       a 2-drop                                            0
T2     4       a 2-drop; walk the T1 body to A, Conquer            2 (nothing to cast)
T3     6       Vex: exhaust 5 for E5, recycle one exhausted rune   1   <- the exposed turn
               for the Calm Power (5 runes left); walk T2 body to A
T4     7       spend at most 3; LEAVE 4 READY                      4   <- the wall is live
  their T4: they attack A with 3 + 3 + 4 = 10 Might
               Thwonk! + Repeat (E4): stun the 4 and a 3
               Vex moves base -> A, becomes a Defender
               3 damage left, all of it into Vex (needs 6); both 2-drops untouched
               your side deals 6 + 2 + 2 = 10; the attackers need 3 + 3 + 4 = 10: all three die
T5     9       Hold A
```

Without the wall, the same attack puts 10 into a garrison of 2 + 2, both die, and the opponent
Conquers A. With it, the opponent loses three bodies and you Hold. 466.3.a gives you the combat:
*"A Player has won a combat if they received either the attacker or defender designation and are
the only Player that has units remaining at this battlefield during this step."*

**The price is paid on your own turn.** Runes ready only in your own Awakening — 415.3.a: *"A player
Readies all non-spell Game Objects they Control during the Awakening Phase on their turn."* — so the
4 Energy for Thwonk! has to be left untapped through T4's Main Phase, out of 7. That is what makes
T3 the exposed turn: Vex costs the whole board of runes that turn, and one ready rune casts nothing.

**Park Vex at your base, not at a battlefield.** The move is by effect, so she reaches either of
your battlefields from base, and from base no battlefield is left empty when she leaves. If she
stands alone at B and they attack A, she still goes — but 323.6 then strips B: *"Players lose
control of any controlled Battlefields without their Units occupying them if the turn is in an Open
State and there is no Showdown or Combat ongoing there."* After the combat she is at A; on your next
turn a Standard Move takes her back (144.4.b, *"Units may move from a Battlefield to their Base."*),
and her exhaustion costs her nothing on defence.

## 4. Breaks to

**Width, for no card at all.** The wall stops the two biggest attackers and six more damage. Four
attackers of 3 Might each: two stunned, 6 left, exactly lethal on Vex (143.2.a: *"If a Unit ever has
nonzero damage marked on it equalling or exceeding its Might, it is Killed."*). Five of them: Vex
dies and the fifth body's 3 reaches the garrison. The opponent's cheapest answer is to attack A with
one more body than you can stun, which their curve was going to play anyway.

**A counter, if they hold one. `OGN-045 Defy`** — Calm, E1 + 1 Power: *"Counter a spell that costs no
more than :rb_energy_4: and no more than :rb_rune_rainbow:."* Thwonk! is printed at E2, and the
Repeat does not lift it out of range (206's own example is Defy against a Repeated Rocket Barrage).
Countered, nothing is stunned, Vex never moves, and the Repeat's 2 Energy is gone too — 425.1.c.1:
*"This includes additional costs."* Defy is a mirror-match card. Outside Calm, `UNL-106 Repulse`
(Body, E1 + 1 Power) counters an enemy spell *"that chooses it and no other friendly unit"*, so it
answers a Thwonk! cast without its Repeat; a Repeated Thwonk!
that stuns two different attackers chooses two of their units and is out of its reach (820.2).

**Kill Vex before attacking. `OGN-229 Vengeance`** — Order, E4 + 2 Power, *"Kill a unit."* No
location clause, so it reaches her at your base. The most expensive of the three.

## 5. Verdict

**The entry is right and the line is a real defensive engine.** On their turn 4 it turns a lost
battlefield into a three-body blowout for E4, and it does so three times a game (one Thwonk! per
copy, 103.2.b).

**It scores nothing, it costs a turn of exposure (T3) and 4 untapped runes on every turn after, and
its ceiling is a number the opponent can count:** two stuns and six damage. It breaks to a fifth
attacker for free, to `OGN-045 Defy` for E1 + 1 Power in a mirror, and to `OGN-229 Vengeance` for
E4 + 2 Power before the attack.

## 6. Not verified

I did not walk an opponent who attacks both of your battlefields in one turn (the wall reaches one),
removal cast at Vex inside the same Showdown after she arrives, a second copy of Thwonk! in hand, or
2v2.

## Leads

- The entry's step 5 cites 319.6 for the Cleanup that designates Vex. 319.6 is *"After any number of
  Game Objects enter or leave the Board"*; Vex does neither. The move's own Cleanup trigger is 319.8,
  *"After a Move is completed"*.
- The entry's terminatesIn (*"two attackers blanked and a 6-Might Tank inserted"*) does not state the
  ceiling: past the two stuns, any attacking Might beyond 6 reaches the garrison, so a fifth attacker
  answers the line for no card.
- The second stun's trigger moves nothing (355.4.a: a Move destination must be other than the current
  Location). The entry's step 4 reads as one move per cast, which is right; worth saying why.
- Parking Vex at base rather than at a battlefield is free: the move is an effect move (420.2.a) and
  leaves no battlefield empty under 323.6.
