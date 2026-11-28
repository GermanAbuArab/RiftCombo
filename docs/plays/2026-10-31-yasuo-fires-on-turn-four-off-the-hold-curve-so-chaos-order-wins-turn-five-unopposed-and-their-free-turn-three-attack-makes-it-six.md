# Play — Yasuo fires on turn four off the Hold curve, so Chaos/Order wins turn five unopposed, and their free turn-three attack makes it six

Issue #537 (a slice of #200), 2026-10-31. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against,
[the coverage table](2026-10-27-identity-coverage-by-legend-pair.md) for why this pair,
[the Chaos/Fury Yasuo shuttle](2026-09-12-chaos-fury-yasuo-shuttle.md) for the same two cards in
another identity, and [Chaos/Order, the identity with one answer](2026-09-12-chaos-order-the-one-answer.md)
for the Ivern line this pair was last walked with. The Galio walk of the slice before,
[Galio is a six-Might Tank](2026-10-31-galio-is-a-six-might-tank-for-three-energy-and-a-vanguard-captain-makes-three-so-eight-hold-the-plaza-and-their-six-kill-nothing.md),
supplies the opponent's deck and draws.

**Subject: `yasuo-ride-the-wind-hold-curve-turn-five`**, a new CHAIN synthesized for this slice.
Chaos/Order is the next legend pair of the identity-first pass. Its Hold baseline is T6, because
neither domain prints a unit at Energy 1. Its catalogue holds ten finishers, none clocked by T4, and
the issue asks for a BURST or a CHAIN shape. No shape in the pair reaches 8 by T4 (§6), so the
question becomes whether one pays on T5. One does: `OGN-205 Yasuo, Windrider` played on T3 and moved
three times on T4 with one `OGN-173 Ride the Wind`, on top of the Hold curve. The Chaos/Fury shuttle
play had the same two cards and a T6 verdict, because it played its Yasuos one a turn and fired all
three on T6. **Fire the first Yasuo the turn after he lands, and every turn after that.** He adds one
point on T4 and one on T5 to a curve that already sits at five on T4, so unopposed the line has 8 on
T5. The turn clock prices it at **T5 against the T6 baseline**. Walked as a game, going first, against
the Calm/Order Radiant Dawn deck of the Galio walk, **it wins on T6**. Their free T3 attack takes the
second battlefield back, and Yasuo has used all the T3 mana. On that same contested board the free
Hold curve wins on T8, so the line saves two turns there and one turn unopposed. The cheapest break is
in their own identity: `OGN-213 Hidden Blade`, hidden the turn before for one Power, kills Yasuo for
no Energy as soon as his first move puts him at a battlefield. The walked hand held none.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `VEN-155 Heart of the Tempest` (Order/Chaos, tags Yordle, Kennen); its ability is never used |
| **Chosen Champion** | `VEN-113 Kennen, Storm of Shuriken` (Chaos, E3 + 1 Power, M4), never played |
| **Battlefield** | any. The walk uses `OGN-281 Hallowed Tomb` (colourless), whose trigger does nothing here |
| **The engine** | `OGN-205 Yasuo, Windrider` (Chaos unit, E5 + 1 Power, M4) on T3, to base |
| **The move** | `OGN-173 Ride the Wind` (Chaos spell, E2 + 1 Power) on T4, a second one on T5 |
| **The bodies** | two Energy-2 units by T2: the walk plays `SFD-159 Trusty Ramhound` (Order, M2) on T1 and T2 and `OGN-210 Daring Poro` (Order, M2) on T2 |

The line pays two Chaos Power by T4 (Yasuo's and one Ride the Wind's), and a third on T5 for the second
Ride the Wind. Each Power comes from a rune that has already paid its Energy, recycled: **one Chaos rune
among the six runes on the board by T3, and a second Chaos rune among the seven by T4.** From the
opponent the line needs one battlefield that is yours on T4 and T5, with Yasuo alive when each of those
turns starts: at your base on T4, and at A on T5, where the T4 shuttle leaves him.

Heart of the Tempest is Order/Chaos and its tag is Kennen, so Kennen, Storm of Shuriken can be the
Chosen Champion, 103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your
Champion Legend."* Every card in the line is mono-Chaos, mono-Order or colourless, so the deck admits
it, 103.1.b.3: *"If a card has a single Domain, then that card is permitted in the Domain Identity
that corresponds to the same Domain."* Three copies is the cap, 103.2.b: *"Your Main Deck can include
up to 3 copies of the same named card."* The walk's list runs three each of Yasuo, Ride the Wind,
Trusty Ramhound, Daring Poro and `OGN-171 Mystic Poro`, fifteen of its 39. None of the cards on either
side is a Signature card (`signature` is false for all nine of the line's base codes in
`data/cards.json`), and none of those nine base codes is in any of the 21 rows of `data/legality.json`.

**Why these cards.** Yasuo is the only card in Chaos or Order whose point does not come from a Score,
a combat or a Hold (§6 lists what else was checked). Heart of the Tempest is the pair's only legend
(one Order/Chaos legend line in `data/corpus_flat.txt`), and it gives [Assault 2], not a move. So the
moves come from cards. The Standard Move exhausts Yasuo, so of three moves in a turn one has to ready
him, and Ride the Wind is the only card in the pair that moves a friendly unit of any Might and
readies it. A grep of the Chaos and Order cards for "move" finds other friendly moves, but none of
them readies: `OGN-184 The Syren` (gear, E2: *":rb_energy_1:, :rb_exhaust:: Move a friendly unit at a
battlefield to its base."*), `OGS-011 Flash` (E2: *"[Reaction] (Play any time, even before spells and
abilities resolve.) Move up to 2 friendly units to base."*) and `VEN-105 Twilight Step` (a unit with 3
Might or less, which Yasuo is not). A Syren-and-Flash route for a Yasuo that starts the turn at A is a
lead below.

## 2. What the line does, and why each step is legal

The cards:

- `OGN-205 Yasuo, Windrider` (Chaos, E5 P1, M4): *"[Ganking] (I can move from battlefield to
  battlefield.) The third time I move in a turn, you score 1 point."*
- `OGN-173 Ride the Wind` (Chaos, E2 P1): *"[Action] (Play on your turn or in showdowns.) Move a
  friendly unit and ready it."*

**The shuttle,** with Yasuo starting the turn at your base and ending it at battlefield A, which you
control:

```
move 1   Standard Move, base -> A                     144.4.a; its cost is Yasuo's exhaust, 144.2
move 2   Ride the Wind (E2 + 1 Chaos Power), A -> base  449: an effect move; the ready refunds the exhaust
move 3   Standard Move, base -> A                     144.4.a again; the third move scores 1
```

The T4 shuttle's third move is base -> A, so it leaves Yasuo at A. **The mirror,** with Yasuo starting
the turn at A, is what T5 runs:

```
move 1   Standard Move, A -> base                     144.4.b; its cost is Yasuo's exhaust, 144.2
move 2   Ride the Wind (E2 + 1 Chaos Power), base -> A  449: an effect move; the ready refunds the exhaust
move 3   Standard Move, A -> base                     144.4.b again; the third move scores 1
```

It ends at base (or at B, if move 3 is a [Ganking] Standard Move, 144.4.c.1), never at A.

- 144.4.a: *"Units may move from their Base to a Battlefield."* 144.4.b: *"Units may move from a
  Battlefield to their Base."* 144.2: *"Exhausting the Unit is the Cost for this action."*
- 449: *"Spells, Abilities, or other effects may cause a Move to occur."* 449.1: *"The source of the
  Move will provide details on any restrictions on legality for Destination."* Ride the Wind names no
  destination restriction.
- 415.1: *"Readying is an action that marks a non-spell Game Object on the board as available for
  action."*
- Moving into a battlefield you already control applies no Contested, 190.3.a.1: *"Units moving to or
  being played to a battlefield apply Contested status if that battlefield is not already Contested
  and that Unit’s controller does not already control that battlefield."* Without Contested no Showdown
  is staged (323.8: *"6. Mark a Showdown as Staged at each Battlefield that Contested was applied
  to."*), so 144.1.c, *"This action cannot be performed during a Showdown or Combat."*, never stops
  move 3.
- A stays yours while Yasuo is at base, because your garrison never leaves it. 323.6: *"4. Players lose
  control of any controlled Battlefields without their Units occupying them if the turn is in an Open
  State and there is no Showdown or Combat ongoing there."*
- **The point is not a Score.** The card says "you score 1 point", but the rules list it as the third
  way to gain a point, 194.1.c: *"Spells, Triggered Abilities and Activated Abilities that instruct them
  to gain one or more points."* This is reading R2 (answer A), the reading the Chaos/Fury play uses. So
  470, *"A player may only Score, from either method, once per Battlefield per turn."*, does not apply
  to it, and Holding A the same turn is not a second Score of A. The Final Point's restriction is about
  Conquer only, 471.1.a.1: *"Notably, points Gained from sources that are not Conquer are not beholden
  to these restrictions."* So Yasuo can take you from 7 to 8.
- Yasuo enters exhausted, 143.4: *"Units enter the Board exhausted."* A Yasuo played on T3 can first
  move on T4. That one turn is the whole difference from the Chaos/Fury play, which played its third
  Yasuo on T5 and fired on T6.
- A rune pays twice, 164.2.a: *"[E]: [Reaction] — Add [1]."* and 164.2.b: *"Recycle this: [Reaction] —
  Add [C]."* 164.2.b.1: *"The Power added this way corresponds to the Domain of the Rune that is being
  Recycled."* So a Chaos rune that is already exhausted for Energy can still be recycled for the Chaos
  Power. The recycled rune leaves the board, which is why the runes column below drops by one after
  each Power.

**The baseline it has to beat.** With no unit at Energy 1 in either domain, the Hold curve of the pair
is: one body on T1, conquer A on T2 (1), hold A and conquer B on T3 (3), hold both on T4 (5), on T5
(7) and on T6 (9). **T6.** The line puts Yasuo's two points on T4 and T5, so it reaches 6 on T4 and 8
on T5 without anything else changing. Yasuo's 6 Energy fits on T3, which has 6 runes and has paid only
for the move to B.

## 3. Their deck: Calm/Order Radiant Dawn

The same deck, in the same seat, with the same draws as in the Galio walk and the four Plaza walks
before it. `OGN-261 Radiant Dawn` (Calm/Order): *"When you stun one or more enemy units, buff a friendly
unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff.)"* Nothing in the walk stuns. Its
Chosen Champion is `OGN-238 Leona, Determined`, never played. The cards it plays:

- `OGN-210 Daring Poro` (Order, E2, M2): *"[Assault] (+1 :rb_might: while I'm an attacker.)"*
- `SFD-159 Trusty Ramhound` (Order, E2, M2): *"While you have another unit here, I have +1
  :rb_might:."*
- `OGN-054 Sunlit Guardian` (Calm, E3, M3): *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I
  must be assigned combat damage first.)"*
- `OGN-052 Stalwart Poro` (Calm, E2, M2): *"[Shield] (+1 :rb_might: while I'm a defender.)"*
- `SFD-157 Royal Guard` (Order, E4, M2): *"When you play me, play a 2 :rb_might: Sand Soldier unit
  token here."*
- `OGN-216 Soaring Scout` (Order, E2, M1): *"[Deathknell] — Channel 1 rune exhausted. (When I die, get
  the effect.)"*
- `OGN-218 Vanguard Captain` (Order, E3 P1, M3): *"[Legion] — When you play me, play two 1 :rb_might:
  Recruit unit tokens here. (Get the effect if you've played another card this turn.)"*
- `VEN-045 Helm of Suppression` (Calm gear, E4 P1): *"[Empower] :rb_energy_4::rb_rune_calm:
  (:rb_energy_4::rb_rune_calm:: Empower this. Use only if not Empowered.) Opponents' spells cost
  :rb_energy_1: more. If this is [Empowered], they cost :rb_energy_1::rb_rune_rainbow: more instead."*

Going second, they channel an extra rune on T1, 485.7: *"First Turn Process: The player going second
channels an extra Rune from their Rune Deck during their first Channel Phase of the game."* Their runes
are 3, 5, 7 and 9 on their T1 to T4.

## 4. The turns, going first

Chaos/Order against Calm/Order. Your battlefield is A, Hallowed Tomb (*"When you hold here, you may
return your Chosen Champion from your trash to your Champion Zone if it is empty."*; Kennen never leaves
the Champion Zone, so it does nothing). Theirs is B, `OGN-282 Monastery of Hirana` (*"When you conquer
here, you may spend a buff to draw 1."*, and nobody spends one). Your opening four are Trusty
Ramhound, Trusty Ramhound, Daring Poro and Yasuo. Your draws are Ride the Wind (T1), Ride the Wind
(T2), Mystic Poro (T3) and `UNL-154 Crimson Pigeons` (T4). Their opening four are Daring Poro, Trusty
Ramhound, Soaring Scout and Helm of Suppression. Their draws are Sunlit Guardian (T1), Stalwart Poro
(T2), Royal Guard (T3) and Vanguard Captain (T4).

```
turn      runes   play                                                      points
T1        2       Trusty Ramhound (E2) to base. None left.                  0
their T1  3       Daring Poro (E2) to base. One left.                       0
T2        4       Ramhound walks to A, empty, Conquer: +1. Ramhound (E2)    1
                  to A, Daring Poro (E2) to base. None left. Two
                  Ramhounds at A, 3 + 3.
their T2  5       Daring Poro walks to B, empty, Conquer. Trusty            1
                  Ramhound (E2) and Sunlit Guardian (E3) to base. None
                  left.
T3        6       Hold A: +1. Daring Poro (3 attacking) walks to B and      3
                  kills their Poro (2): Conquer B, +1. Yasuo (E5, an
                  exhausted Chaos rune recycled for his Power) to base.
                  One left; five runes stay.
their T3  7       Royal Guard (E4, Sand Soldier to base) and Stalwart       2
                  Poro (E2) to base. One left. Ramhound and Guardian
                  (3 + 3) attack B: your Poro dies, the Guardian takes
                  2 and lives. Conquer B.
T4        7       Hold A: +1. The shuttle with Ride the Wind (E2, a         5
                  second Chaos rune recycled): +1. Mystic Poro (E2) to
                  A, Crimson Pigeons (E3) to base. None left; six runes
                  stay. A holds 3 + 3 + 4 + 2 = 12.
their T4  9       Hold B. Soaring Scout (E2), Vanguard Captain (E3,         3
                  [Legion] on, two Recruits at B), Helm of Suppression
                  (E4); two runes recycled for the two Powers. None
                  left.
T5        8       Hold A: +1. The mirror shuttle from A with the second     7
                  Ride the Wind, E3 under the Helm (a third Chaos rune
                  recycled): +1; Yasuo ends at base. Crimson Pigeons
                  walks to A. Five left; seven runes stay. A holds
                  3 + 3 + 2 + 3 = 11.
their T5  9       Hold B.                                                   4
T6        9       Hold A: +1. Eight.                                        8, win
```

**T1, 0 points.** Two runes, Trusty Ramhound to base. Hand: Ramhound, Daring Poro, Yasuo, Ride the
Wind.

**Their T1, 0.** Three runes. Daring Poro to base.

**T2, 1.** Four runes. Ramhound is ready (315.1.b) and walks to A, which is empty: Conquer, 469.1:
*"Conquer: A player gains Control of a Battlefield they did not yet Score this turn."* The second
Ramhound is played straight onto A, 355.2.a: *"By default, Valid locations include the controller’s
Base or a Battlefield the controller controls."* Daring Poro goes to base. Each Ramhound has the other
"here", so A defends with 3 + 3. Their Daring Poro attacks with 3, so attacking A would cost it
for nothing. Hand: Yasuo, Ride the Wind, Ride the Wind.

**Their T2, 1–1.** Five runes. Daring Poro walks to B, which is empty, and they conquer it. Trusty
Ramhound and Sunlit Guardian go to base. A second branch, where they play the Helm here instead of
Guardian and Ramhound, is at the end of this section.

**T3, 3.** Six runes. Hold A, 469.2: *"Hold: A player maintains Control of a Battlefield they did not
yet Score this turn during their Beginning Phase."* Your Daring Poro walks from base to B. B is theirs,
so it is Contested and a combat follows. Your Poro attacks with 2 + 1 = 3. Their Poro defends with 2.
Yours deals 3 and theirs dies, 143.2.a: *"If a Unit ever has nonzero damage marked on it equalling or
exceeding its Might, it is Killed."* Theirs deals 2 to your 3, which survives, and Combat Cleanup heals
it, 466.1.a.1: *"Insert “3c. Heal all Units.”"* You conquer B. Then Yasuo: five runes exhausted for
E5, and one of them, a Chaos rune, recycled for his Power. One rune stays unexhausted and five stay on
the board. Yasuo goes to base, not to A, so their T3 attack cannot reach him. Hand: Ride the Wind,
Ride the Wind, Mystic Poro.

**Their T3, 3–2.** Seven runes. They hold nothing, since B is now yours. Royal Guard goes to base with
its Sand Soldier, and so does Stalwart Poro. Then Trusty Ramhound and Sunlit Guardian walk from base to
B, where your lone Daring Poro defends with 2. Ramhound has the Guardian "here", so the attack is
3 + 3 = 6. Your Poro takes 6 and dies. Its 2 all go to the Guardian, 815.1.b: *"It is functionally short for "I
must be assigned lethal damage before any other unit with the same controller as me that does not have
[Tank] during the Combat Damage step.""* Lethal for the Guardian is 3, so the Guardian lives. They conquer B. Attacking A instead would have been 6 into 6,
with both sides wiped. B costs them nothing.

**T4, 5.** Seven runes (five plus the two channelled, 315.3.b: *"1. The Turn Player channels 2 runes
from their Rune Deck."*). Hold A. Yasuo is ready at your base. Move 1, a Standard Move to A. Move 2,
Ride the Wind: two runes exhausted, and one of them, a Chaos rune, recycled for the Power. Yasuo goes
back to base and is readied. Move 3, a Standard Move to A. That is the third move: +1, and Yasuo ends the turn at A. Five
runes remain unexhausted. Mystic Poro goes to A (its [Vision] looks at your top card, and nothing in the walk
depends on what it is), and Crimson Pigeons goes to base. A now holds two Ramhounds (3 + 3), Yasuo (4)
and Mystic Poro (2), so it defends with 12. B holds their Ramhound (3) and Guardian (3 + 1 [Shield] =
4), so it defends with 7, and Yasuo's third move cannot take it (see the alternative route below).
Hand: Ride the Wind.

**Their T4, 5–3.** Nine runes. Hold B. Soaring Scout goes to base, then Vanguard Captain goes to B with
[Legion] on (the Scout was a card played this turn), so two Recruits come with it. Then the Helm. That
is E2 + E3 + E4 = 9 Energy and two Powers, both from runes already exhausted and then recycled. B now
defends with 3 + 4 + 3 + 1 + 1 = 12. Their base holds Royal Guard (2), the Sand Soldier (2), Stalwart
Poro (2) and Soaring Scout (1), seven against your 12 at A, so they do not attack.

**T5, 7.** Eight runes (six plus two). Hold A: 6. Yasuo starts the turn at A, where the T4 shuttle
left him, so he runs the mirror of §2: a Standard Move from A to base (144.4.b), the second Ride the
Wind from base to A, which readies him, and a Standard Move from A to base. The Helm makes Ride the Wind
cost one more Energy: three runes exhausted, and one of those three, a Chaos rune, recycled for the
Power. +1: 7. Yasuo ends the turn at base. Crimson Pigeons walks from base to A. Seven runes stay on the
board and five of them are unexhausted, and nothing you hold can take B. A now holds two Ramhounds
(3 + 3), Mystic Poro (2) and Crimson Pigeons (3): 11.

**Their T5, 7–4.** Hold B. With Yasuo at base, A defends with 11. Their movable Might is still only
the 7 at base: Royal Guard (2), the Sand Soldier (2), Stalwart Poro (2, whose [Shield] counts only while
defending) and Soaring Scout (1). Their units at B cannot move to A, since none has [Ganking]
(144.4.c.1), and the units they play on their T5 enter exhausted (143.4). So nothing reaches A (§8 says
what this walk does not check).

**T6, 8.** Hold A: **eight points. You win on T6.**

**The alternative T4 route,** for a board where B holds one weak unit: move 1, a Standard Move from A
to base; move 2, Ride the Wind from base to A, which readies him; move 3, a [Ganking] Standard Move from
A to B, 144.4.c.1: *"Units with Ganking may use their Standard Move to Move from Battlefield to
Battlefield."* The third move scores, and then the combat at B can win it a Conquer as well. The
walked B (7 defending against Yasuo's 4) does not allow it. If that Conquer is the final point, it
counts only if every battlefield was scored that turn, 471.1.b.1: *"If the player has Scored every
Battlefield this turn, that player Gains the Final Point. If the player has not Scored every Battlefield
this turn, that player draws a card instead."*

**The Helm branch.** If they play the Helm on their T2 in place of Ramhound and Guardian, their only
unit is the Daring Poro at B, and your T3 Conquer kills it. Every unit they play on their T3 enters
exhausted (143.4), so nothing of theirs can attack on their T3 and B stays yours. On T4 you hold A and
B (5), and the Helm makes Ride the Wind cost E3 + 1, which seven runes pay: the shuttle makes 6. Even if
they take B on their T4, the T5 Hold of A (7) and the second shuttle (E3 + 1 on eight runes, 8) win.
**On that branch the line wins on T5.** It is not walked turn by turn past T4.

## 5. Breaks to

Every price below is set against the target. Yasuo has no [Deflect], so no spell aimed at him pays a
surcharge, 809.1.c: *"It is functionally short for "Spells and abilities an opponent controls that
target [me/this] cost an amount of Power equal to [Deflect Value] more to play as an additional cost for
each time they choose [me/this].""* (809.1.b.3, *"If X is omitted, it is presumed to be 1."*, and
809.1.c.1, *"The Power used to pay this cost may always be of any Domain."*, never come into it.)

- **`OGN-213 Hidden Blade`** (Order, in their identity; E2 P1): *"[Hidden] (Hide now for
  :rb_rune_rainbow: to react with later for :rb_energy_0:.) [Action] (Play on your turn or in showdowns.)
  Kill a unit at a battlefield. Its controller draws 2."* **The cheapest answer.** One Power on their
  turn hides it, and no Energy on yours plays it after move 1 puts Yasuo at A. Yasuo dies before move 3,
  and every later point with him. You draw 2. Played as a plain spell, it costs E2 + 1. **The window is
  wider than move 1:** the T4 shuttle ends at A, so from the end of your T4 through their T4 Yasuo sits
  at a battlefield, and the plain spell reaches him on their own turn too. The cheapest break stays the
  hidden one. Clock gap #541
  (one facedown card per battlefield, and battlefield control) does not touch this, because the hidden
  card is theirs and not part of the line.
- **`OGN-229 Vengeance`** (Order, E4 P2): *"Kill a unit."* No location clause, so it kills Yasuo at your
  base on their own turn. Six runes on their T3 or T4.
- **`OGN-045 Defy`** (Calm, in their identity; E1 P1): *"[Reaction] (Play any time, even before spells
  and abilities resolve.) Counter a spell that costs no more than :rb_energy_4: and no more than
  :rb_rune_rainbow:."* Ride the Wind costs E2 + 1 Power (E3 + 1 under the Helm), so Defy counters it,
  and moves 2 and 3 never happen: one point for two of their runes. Yasuo stays at A, exhausted, and
  is ready again next turn.
- **`SFD-045 Not So Fast`** (Calm, E2 P1): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Counter an enemy spell or ability that chooses a friendly unit or gear."* "Friendly" here is
  from their side. Ride the Wind chooses your Yasuo, which is not friendly to them, so **it does not
  answer this line.**
- **`VEN-045 Helm of Suppression`** does not break it. Ride the Wind costs E3 + 1, and E3 + 2 Power
  once the Helm is Empowered. Seven runes on T4 and eight on T5 pay either, and the walk pays it on T5.
- **Taking both battlefields.** The Chaos/Fury play already names this answer. With no battlefield of
  your own, Yasuo's first move goes into an enemy garrison, applies Contested and stages a combat, and
  144.1.c then blocks the Standard Moves. The walk's opponent takes B for free on T3. To take A they
  would need more than 12 Might from base on T4, and they have 7.
- **In their identity, answers to the garrison and not to Yasuo:** `UNL-159 Soul Harvest` (Order,
  E2 P1, *"Kill a unit at a battlefield with 3 :rb_might: or less."*) and `SFD-162 Blood Money` (Order,
  E2, 2 Might or less) kill a Ramhound or a Poro at A and never Yasuo (M4). Losing the whole garrison
  loses A (323.6), and A is where he shuttles.
- **Outside their identity,** other decks have cheaper shapes: `VEN-152 Rebuttal` (Mind/Chaos, E1 P1)
  and `UNL-131 Abandon` (Chaos, E2) answer Ride the Wind, `SFD-136 Hard Bargain` (Chaos, E2) is another
  Chaos Reaction, and `OGN-024 Void Seeker` (Fury, E3 P1, *"[Action] (Play on your turn or in
  showdowns.) Deal 4 to a unit at a battlefield. Draw 1."*) kills Yasuo at A, on their own turn as well
  between the end of your T4 and the start of your T5. These names come from a
  regex sweep of the corpus for "kill", "deal 4 or more" and "counter". They were not walked, and the
  sweep is the instrument, not a proof that nothing else exists.

## 6. Against the free Hold curve, and the BURST and CHAIN shapes searched

| board | free Hold curve | this line |
|---|---|---|
| unopposed | T6 (5 on T4, 7 on T5, 9 on T6) | **T5** (6 on T4, 8 on T5) |
| the walk: they take B on T3 and keep it | T8 (A alone from T4: 4, 5, 6, 7, 8) | **T6** (5 on T4, 7 on T5, 8 on T6) |
| the Helm branch: B stays yours | T6 | **T5** (not walked past T4) |

The turn clock (`npm run -s adversarial -- --turns`) prices the entry at **T5 against the Chaos/Order
baseline of T6**. The clock does not order a spell after the unit it moves (a lead, below). With only
one Ride the Wind declared, it puts Ride the Wind on T2 and Yasuo on T3 and prints T4, one turn early.
The entry declares two, which is also what the walk plays by T5, and with two the clock prints T5,
the turn the hand count gives. Neither open clock gap (#541 and #548) moves it, because the line has
no [Hidden] card and no card that #548's regexes read.

**The shapes searched for a BURST or a CHAIN by T4** (all cards from `data/corpus_flat.txt`, filtered
to Chaos, Order or colourless). The T4 ceiling of the pair is the Hold curve's 5, plus Yasuo's 1, plus
`SFD-214 Power Nexus`'s 1, which is 7. **Nothing in the pair reaches 8 by T4.**

- `OGN-205 Yasuo, Windrider`: one point per copy per turn, from the turn after he lands. Two copies by
  T3 cost E10 + 2, which six runes cannot pay, so it is one Yasuo on T4. This line.
- `VEN-138 Shen, Leader of the Kinkou Order` (E6 P2): T3 at the earliest, with nothing else on T3, and
  his point needs a Hold with exactly one other unit. A T5 shape, not walked (a lead).
  [2026-11-23, #554: walked in §9. T5 unopposed, 6 on T4.]
- `SFD-214 Power Nexus` (colourless): four rainbow Power at a Hold for a point. It is one of your three
  battlefields, and only one is in play, chosen at random (485.5), so one game in three. A T5 shape on
  top of the curve, not walked. [2026-11-23, #554: walked in §9. T5 unopposed, 6 on T4.]
- `SFD-148 Draven, Audacious` (Chaos): a point per combat won. The opponent decides whether there is a
  combat, so it is not a curve.
- `UNL-177 Ivern, Friend to All`: the catalogued CHAINs of the pair, T6 and T7 on the clock (the Ivern play).
- `OGN-286 Reckoner's Arena` (colourless) and `OGN-236 Karthus, Eternal` (Deathknell only) pay nothing
  extra on the curve.
- Out-of-identity multipliers were excluded by 103.1.b, and `OGN-276` and `OGN-290` are banned.

## 7. Verdict

**A line that beats the baseline on the clock: T5 against T6.** Walked against an active opponent,
going first, it wins on T6, which ties the unopposed baseline. On the same board the free curve would
win on T8. It enters the catalogue as `status: candidate`, a CHAIN, like the slice-4 entry whose walk
also lost to its clock. The reason it is worth entering anyway: it is the first line of the pair whose
points do not need the opponent to present a board. It adds the cheapest T5 the pair has found. And the
Ivern play's claim that *"Chaos/Order owns no board-independent point source (they are all Mind)"* is
refined. Yasuo is Chaos, and he needs one battlefield that is yours, not a board of theirs.

## 8. Not verified

- **How often.** A 2,000,000-deal simulation (39-card draw pile, 3 Yasuo, 3 Ride the Wind, going first
  with a T1 draw, no mulligan) asked for at least one Energy-2 body among the first 5 cards, two among
  6, a Yasuo among 7 and a Ride the Wind among 8. That happens in **6.76%** of deals with nine
  Energy-2 bodies and **10.43%** with twelve. With a second Ride the Wind among 9 (the walk's T5) it is
  1.29% and 2.06%. The rate is low because the line needs three named cards on curve, and its body
  count is a deck choice that the catalogue's `anyBodies` does not fix. Mulligans would raise both
  numbers; they were not modelled.
- **Their choices.** The walk keeps the Galio walk's deck and draws. It does not play Hidden Blade,
  Vengeance or Defy, which their identity allows. It does not walk a T5 attack on A with whatever they
  draw on T5, against the 11 at A.
- **The Helm branch past T4.**
- **The rune order.** Two Chaos runes are needed among the first seven, as in §1, and no rune deck was
  dealt.

## 9. The four variants of the Leads, priced, and the two that print earlier walked

Issue #554, 2026-11-23. Each variant in the Leads below is priced on the turn clock with its own
quantities, `node scripts/adversarial-check.mjs --price <codes> --bodies 2`, and again with
`--aim OGN-173@OGN-205`, which orders Ride the Wind after the Yasuo it moves (#552). The `--aim` run
prints the same line for every set below that holds a Ride the Wind. `--price` prints `all`, the turn
the last card lands, and `pays`, which is `all` plus one when that last card is a unit. A catalogue
row adds that turn also when the payoff waits for a Beginning Phase Hold, which is why this entry's two
cards print `pays T4` under `--price` and T5 in `--turns`. Every variant here scores at a Hold or after
one, so the "as a row" column is `all` plus one. **The clock counts no points.** It says when the last
card lands, not when the eighth point does, and it prices no activation (the Syren's E1) and no
battlefield (the Hillock, the Nexus and its four rainbow).

| variant | set priced | `--price` | as a row | the clock gap it rests on | outcome |
|---|---|---|---|---|---|
| the entry | `OGN-205:1,OGN-173:2` | all T4, pays T4 | T5 | | |
| 1. Windswept Hillock as A | `OGN-205:1,OGN-173:2,OGN-297:1` | all T4, pays T4 | T5 | a battlefield is priced as a free card, and no move is modelled, so the garrison's [Ganking] is not seen | negative: the same turn |
| 2. a second Yasuo on T4 | `OGN-205:2,OGN-173:3` | all T5, pays T5 | T6 | no points counted: it prices the turn the third Ride the Wind lands | negative: a turn later |
| 3. the Syren and Flash | `OGN-205:1,OGN-184:1,OGS-011:1,OGN-173:1` | all T4, pays T4 | T5 | no activation priced, so the Syren's E1 is free | negative: the same turn |
| 4. Shen | `VEN-138:1` | all T3, pays T4 | T4 | no points counted, so a line whose points come before its last turn prints early | walked below: T5 |
| 4. Power Nexus | `SFD-214:1` | all T2, pays T3 | T3 | the same, and the four rainbow is not priced | walked below: T5 |

Shen and the Nexus priced together with this entry's cards print later, not earlier:
`VEN-138:1,OGN-205:1,OGN-173:2` prints `all T5, pays T5` (T6 as a row), because Shen and Yasuo cost
E11 + 3 between them and six runes on T3 pay one of the two, and `SFD-214:1,OGN-205:1,OGN-173:2`
prints `all T4, pays T4` (T5 as a row), this entry's own turn. So the two shapes that print earlier
are Shen and the Nexus each on the Hold curve with no Yasuo, walked here.

### Shen on the Hold curve

**Needs.** `VEN-138 Shen, Leader of the Kinkou Order` (Order unit, E6 P2, M7): *"[Shield] (+1
:rb_might: while I'm a defender.) When I hold, if there is exactly one other unit you control here, you
score 1 point."* Shen among the first seven cards, as Yasuo is in §8, and two Order runes among the six
on the board by T3 for his two Power, 163.2: *"Power is used to pay Domain-associated Power Costs."*
Two Energy-2 bodies by T2, as in §1. Shen is mono-Order, so the Heart of the Tempest deck admits him
(103.1.b.3); `signature` is false for him in `data/cards.json`, and `VEN-138` is not in any of the 45
rows of `data/legality.json`. No Yasuo and no Ride the Wind.

```
turn   runes   play                                                       points
T1     2       body 1 (E2) to base.                                       0
T2     4       Body 1 walks to empty A, Conquer: +1. Body 2 (E2) to       1
               base.
T3     6       Hold A: +1. Body 2 walks to empty B, Conquer: +1. Shen     3
               (E6, two Order runes recycled for his Power) onto A,
               next to body 1. Four runes stay.
T4     6       Hold A and B: +2. Shen's hold trigger: +1.                 6
T5     8       Hold A and B: +2. Shen: +1.                                9, win
```

**T3.** Shen goes straight onto A, 355.2.a: *"By default, Valid locations include the controller’s
Base or a Battlefield the controller controls."* He enters exhausted, 143.4: *"Units enter the Board
exhausted."* That costs nothing, because his point needs him at A, not ready. A holds body 1 and Shen
and nothing else, since body 2 went to B. That count is part of the trigger's condition, 383.2.a.1:
*"Any additional conditional statement immediately after the Condition must be true in order for the
Condition to be fulfilled. Such a conditional statement is part of the Trigger Condition and not the
Effect."* So no later body may be played onto A: new bodies go to B or to base.

**T4.** The Beginning Phase Holds both battlefields, 315.2.b.2: *"1. The Turn Player Holds all
Battlefields they Control."* Shen's trigger is a Hold Effect, 383.4.d.2.a: *"The Hold Abilities of
Units are put on the Chain as Pending Items after the Unit these effects correspond to are present at a
Battlefield when a player maintains control of it and Gains 1 Victory Point during their Beginning
Phase from Holding."* Its point is a gain by ability (194.1.c), not a second Score of A, so 470 does
not cap it, as in `shen-duo-mutual-hold`: 6. The Main Phase spends nothing, so six runes are free for
bodies to base or to B.

**T5.** Hold A and B (8) and Shen (9). **T5**, with 6 on T4: the same two numbers as this entry
unopposed, for no Energy after T3.

### Power Nexus on the Hold curve

**Needs.** `SFD-214 Power Nexus` (colourless battlefield): *"When you hold here, you may pay
:rb_rune_rainbow::rb_rune_rainbow::rb_rune_rainbow::rb_rune_rainbow: to score 1 point."* It has to be
the battlefield in play, which is one game in three, 485.5: *"Setup: Each player randomly selects one
(1) of their three (3) Battlefields. The other two are removed and will not be used for this game. The
selected Battlefields are placed simultaneously in the Battlefield Zone."* Four runes on the board at
the Beginning Phase of the turn it pays, of any domain, 135.2.e.5.a: *"When required as a cost, [A] can
be paid by Power of any Domain."* Two Energy-2 bodies by T2. `signature` is false for it and `SFD-214`
is not in `data/legality.json`. Nothing else.

```
turn   runes   play                                                       points
T1     2       body 1 (E2) to base.                                       0
T2     4       Body 1 walks to empty A, the Nexus, Conquer: +1. Body 2    1
               (E2) to base.
T3     6       Hold A: +1. Body 2 walks to empty B, Conquer: +1.          3
T4     6, 4    Hold A and B: +2. The Nexus, paid by recycling four of     6
               the six runes: +1. Two stay, and the Channel Phase
               makes four.
T5     6       Hold A and B: +2.                                          8, win
```

**T4.** The four rainbow are the trigger's base cost, 383.3.b: *"If a Triggered Ability contains a
cost within instructions at the beginning of the effect or immediately following the “you may” or
“they may” that appears as the first part of the effect, that cost is treated as the base cost of the
Triggered Ability."* They are paid to put it on the chain, 383.3.b.1: *"The cost must be paid in order
to finalize the Triggered Ability to the Chain."* Four runes are recycled for them, 444.2.c: *"Players
may activate abilities that Add resources with the Reaction keyword at any time that they are
instructed to Pay resources. Those abilities finalize and resolve immediately, ignoring normal
restrictions."*, with each rune's own 164.2.b: *"Recycle this: [Reaction] — Add [C]."* The Hold comes
before the Channel Phase (315.2.b.2, then 315.3.b: *"1. The Turn Player channels 2 runes from their
Rune Deck."*), so the Nexus is paid from the six runes already on the board, and the two channelled
come after. The recycled runes go to the Rune Deck, 416.1.b: *"Runes are Recycled to the Rune Deck."*

The Nexus can pay on T3 instead, from the four runes on the board then: 4 after T3, but then only two
runes are on the board at the T4 Hold, so it cannot pay again, and T4 still ends at 6. Either way it is
**T5**, with 6 on T4, the same two numbers as this entry unopposed.

### Against the free Hold curve

| board | free Hold curve | this entry | Shen | Power Nexus |
|---|---|---|---|---|
| unopposed | T6 (5 on T4) | T5 (6 on T4) | T5 (6 on T4, 9 on T5) | T5 (6 on T4, 8 on T5) |
| the shape of the walk: they take B on their T3 and keep it | T8 | T6 (walked) | T6 (A and Shen: 5, 7, 9) | T6 (A and the Nexus: 5, 7, 8) |

The second row is a hand count on the shape of §4, not a walk. On the board of §4 A holds both
Ramhounds from T2, so one of them would have to leave A for Shen's count to hold, and that is another
game. The Nexus pays at most twice by T5 on that row (on T4 and T5 from six and four runes, or on T3
and T5), so A with the Nexus is 3 after T3, 5 on T4, 7 on T5 and 8 on T6. Nothing here reaches 8 by
T4, and the T4 ceiling stays the 7 of §6. Shen and the Nexus together reach it: 3 after T3, then on T4
Hold A and B (5), Shen (6) and the Nexus paid from the four runes Shen left (7).

### Breaks to

Priced against the target, in the Calm/Order identity of §3. Shen has no [Deflect], so no surcharge.

- **The other unit at A.** `SFD-162 Blood Money` (Order, E2, no Power): *"Kill a unit at a battlefield
  with 2 :rb_might: or less."* reaches a printed Might-2 body; a Ramhound next to Shen is 3 (`SFD-159`:
  *"While you have another unit here, I have +1 :rb_might:."*), and `UNL-159 Soul Harvest` (Order,
  E2 P1, *"Kill a unit at a battlefield with 3 :rb_might: or less."*) reaches that. With Shen alone at
  A the count is zero and the trigger never goes on the chain (383.2.a.1): a point lost for two
  Energy, until a body is played onto A in your Main Phase for the next Hold. **The cheapest break of
  the Shen shape.**
- **Shen himself.** `OGN-213 Hidden Blade` (Order, E2 P1): *"Kill a unit at a battlefield. Its
  controller draws 2."* Shen stands at A from T3, so on their T3 the plain spell kills him before his
  first Hold, and you draw 2. `OGN-229 Vengeance` (Order, E4 P2, *"Kill a unit."*) kills him anywhere.
- **No counter.** The Shen shape casts no spell, so `OGN-045 Defy` and `VEN-045 Helm of Suppression`
  have nothing to work on. A sweep of the Calm, Order and colourless lines of `data/corpus_flat.txt`
  for "counter" and "abilit" finds one card that counters an ability, `SFD-045 Not So Fast`, and it
  needs *"an enemy spell or ability that chooses a friendly unit or gear"*. Neither Shen's trigger nor
  the Nexus's chooses anything (a reading of their text, not a ruling). The other mono-domain hits
  (`OGN-064 Wind Wall`, `UNL-044 Flurry of Feathers`, `VEN-039 Crumbling Sands`) counter spells only,
  and the rest (`SFD-194 Counter Strike`, `SFD-206 Riposte`, `UNL-190 Lilting Lullaby`) are dual-domain
  cards outside Calm/Order.
- **The Nexus is not in play two games in three** (485.5), and nothing kills a battlefield. Taking A
  before your Beginning Phase switches it off, since its point needs your Hold of A. What it costs you
  is four runes each time it pays, so the turn it pays has four fewer for its Main Phase.
- **Taking A.** Shen defends with 8 (M7 and [Shield]) beside the other unit. On the board of §4 their
  movable Might on T3 is 6.

### Where they go in the catalogue

Both shapes beat the T6 baseline unopposed and tie this entry there, and on the shape of the walk they
tie it again at T6. **They are recorded as a dated block in `yasuo-ride-the-wind-hold-curve-turn-five`,
not as entries of their own.** As entries, the clock would print them at T4 and T3, one and two turns
ahead of their hand counts, because it counts no points (#696). The one score model it has, `pointsAtStart`,
is declared per entry, and for a Chaos/Order T6 baseline it reads the curve a point low: 2 at the start
of T4 and 4 at the start of T5, where [the unopposed clock](2026-09-12-the-unopposed-clock.md) gives 3
and 5 (#694). And the Nexus point is already the verified
any-identity ENGINE `power-nexus-rune-recycle-any-identity`.

**Not verified.** How often Shen is in the first seven cards was not simulated. The second row of the
table is not walked turn by turn. No rune deck was dealt for Shen's two Order runes.

## Leads

- `yasuo-windrider-ride-the-wind-chain` (verified, Calm/Chaos) reads, as its steps: sit at 5 holding one
  battlefield, conquer it with the legend's move (6), Gank to the other and conquer it (7), Ride the Wind
  back to base for the third move (8). 469.1 and 470 forbid Conquering a battlefield already Scored by
  the Hold that turn, so as written it reaches 7, not 8, unless both battlefields are uncontrolled at the
  start. Its legend `OGN-259` is also not needed for three moves, which the shuttle here makes with one
  card. Reported to the orchestrator as a new issue, not edited here.
  [2026-11-16, #638: fixed by #551 (PR #637). The steps above are the OLD entry's. The entry now Holds
  one battlefield, Conquers the other and takes Yasuo's ability point, from 5 points at the start of the
  turn. It quotes 469.1, *"Conquer: A player gains Control of a Battlefield they did not yet Score this
  turn."*, and 470, *"A player may only Score, from either method, once per Battlefield per turn."* No
  step of this play Conquers a battlefield it Scored that turn. Every shuttle move goes into A, which is
  already yours, or into base, and the alternative T4 route's Conquer is of B, which is theirs. Where
  the corrected line would land here: on the walked board, T4 ends at 5, so T5 opens at 5 holding A.
  B is theirs and defends with 12 (their T4 in §4), so it is not the empty battlefield the entry's Conquer needs. A move
  into it is a combat (190.3.a.1, 323.9), and 144.1.c then stops the Standard Moves. Hold A (6) and the
  shuttle (7) are exactly the walked T5, and the T6 Hold of A makes 8: **T6**, the walk's own turn. On
  the unopposed board of §2 (3 after T3, then Hold both and the shuttle on T4), T4 opens at 3 and T5 at 6, so the line never opens a turn at 5. The T5
  Hold of A and B makes 8 without it: **T5**, the walk's unopposed turn.]
- The turn clock places Ride the Wind before the Yasuo it moves (no spell-after-unit sequencing), so a
  one-Ride-the-Wind Yasuo line prints a turn early. Reported to the orchestrator as a new issue.
- `OGN-297 Windswept Hillock` (*"Units here have [Ganking]"*) as battlefield A would let the A garrison
  reach B on T4. Not walked.
  [2026-11-23, #554: priced in §9. `--price OGN-205:1,OGN-173:2,OGN-297:1 --bodies 2` prints `all T4,
  last unit T4, unitLast false, pays T4`, this entry's own line, so T5 as a row; the clock prices a
  battlefield as a free card and models no move, and `--aim` changes nothing. Unopposed the hand count
  is this entry's T5 as well (6 on T4, 8 on T5): a garrison that can reach B adds nothing while B is
  already yours. **Negative: it does not print earlier, and it gets no entry.** What it would buy is on
  the contested board, and it cuts both ways: the card says *"Units here"*, not friendly units, so
  their units at A would have [Ganking] too. Not walked.]
- A second Yasuo played on T4 next to the shuttle: E5 + 1 plus Ride the Wind's E2 + 1 is E7 + 2 Power,
  which seven runes pay (all seven exhausted, two of them recycled). With two Ride the Winds on T5 (E4 +
  2 on eight runes, E6 + 2 under the Helm) that is two points on T5 instead of one, which is slack on
  the contested board. Not walked.
  [2026-11-23, #554: priced in §9. `--price OGN-205:2,OGN-173:3 --bodies 2` prints `all T5, last unit
  T5, unitLast false, pays T5`, so T6 as a row, a turn after this entry: the clock counts no points and
  prices the turn the third Ride the Wind lands. `OGN-205:2,OGN-173:2` prints `pays T5` too, and `--aim`
  changes neither. **Negative on the clock, and no entry.** Unopposed it adds nothing, since this entry
  already has 8 on T5. One correction to the line above: the T4 spend of E7 + 2 leaves five runes, so T5
  has seven, not eight. Seven still pay the two Ride the Winds under the Helm (E6 + 2). The hand count on
  the board of §4, with the T3 and T4 draws replaced by the second Yasuo and a third Ride the Wind: A
  defends their T4 with 10 (the two Ramhounds, 3 + 3, and Yasuo, 4) against at most the 7 at their base
  (§4), so they do not attack. T5 is Hold A (6), the first Yasuo's mirror shuttle (7) and the second Yasuo's
  shuttle from base (8): **T5 on that board instead of the walk's T6.** It needs five Chaos runes among
  the ten channelled by T5 (one by T3, three by T4), each recycled once. Not walked turn by turn.]
- The Syren and Flash: a Yasuo played straight onto A on T3 (355.2.a) starts T4 at A. Then the Syren
  (A to base, E1), a Standard Move (base to A) and Flash (A to base, E2) are three moves with no Power
  and no Ride the Wind. He ends at base, so the next turn needs Ride the Wind again. The Syren costs E2
  to put down first. Not walked, and not priced on the clock.
  [2026-11-23, #554: priced in §9. `--price OGN-205:1,OGN-184:1,OGS-011:1,OGN-173:1 --bodies 2` prints
  `all T4, last unit T4, unitLast false, pays T4`, so T5 as a row, this entry's own turn, and without
  Ride the Wind it prints `pays T4` as well. The clock prices no activation, so the Syren's E1 is free
  on it, and `--aim` changes nothing. **Negative: it does not print earlier, and it gets no entry.** By
  hand it is this entry's T5 too: the Syren goes down on T2 beside the second body (four runes), Yasuo
  onto A on T3, and the T4 moves cost E3 and no Power, one Energy more than Ride the Wind and one Power
  less. His T5 point needs Ride the Wind again. And from T3 he stands at A, open to their T3 attack and
  to `OGN-213 Hidden Blade` a turn earlier than in §5.]
- The Shen and Power Nexus T5 shapes of §6, not walked.
  [2026-11-23, #554: walked in §9. On the clock they print earlier than this entry (Shen `pays T4`, the
  Nexus `pays T3`), only because it counts no points (#696). By hand each is T5 unopposed with 6 on T4, and T6
  on the shape of the walked board: this entry's own turns, against the T6 baseline. Recorded as a dated
  block in this entry, not as entries of their own; §9 says why.]
