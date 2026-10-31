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
opponent the line needs one battlefield that is yours on T4 and T5, with Yasuo alive at your base when
your turn starts.

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
T5        8       Hold A: +1. The shuttle with the second Ride the Wind,    7
                  E3 under the Helm (a third Chaos rune recycled): +1.
                  Crimson Pigeons walks to A. Four left.
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
back to base and is readied. Move 3, a Standard Move to A. That is the third move: +1. Five runes
remain unexhausted. Mystic Poro goes to A (its [Vision] looks at your top card, and nothing in the walk
depends on what it is), and Crimson Pigeons goes to base. A now holds two Ramhounds (3 + 3), Yasuo (4)
and Mystic Poro (2), so it defends with 12. B holds their Ramhound (3) and Guardian (3 + 1 [Shield] =
4), so it defends with 7, and Yasuo's third move cannot take it (see the alternative route below).
Hand: Ride the Wind.

**Their T4, 5–3.** Nine runes. Hold B. Soaring Scout goes to base, then Vanguard Captain goes to B with
[Legion] on (the Scout was a card played this turn), so two Recruits come with it. Then the Helm. That
is E2 + E3 + E4 = 9 Energy and two Powers, both from runes already exhausted and then recycled. B now
defends with 3 + 4 + 3 + 1 + 1 = 12. Their base holds Royal Guard (2), the Sand Soldier (2), Stalwart
Poro (2) and Soaring Scout (1), seven against your 12 at A, so they do not attack.

**T5, 7.** Eight runes (six plus two). Hold A: 6. Yasuo shuttles again with the second Ride the Wind,
which the Helm makes cost one more Energy: three runes exhausted and a Chaos rune recycled. +1: 7.
Crimson Pigeons walks from base to A. Four runes stay unexhausted, and nothing you hold can take B.

**Their T5, 7–4.** Hold B. Nothing they have reaches the 15 at A (§8 says what this walk does not
check).

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
  and every later point with him. You draw 2. Played as a plain spell, it costs E2 + 1. Clock gap #541
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
  showdowns.) Deal 4 to a unit at a battlefield. Draw 1."*) kills Yasuo at A. These names come from a
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
- `SFD-214 Power Nexus` (colourless): four rainbow Power at a Hold for a point. It is one of your three
  battlefields, and only one is in play, chosen at random (485.5), so one game in three. A T5 shape on
  top of the curve, not walked.
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
  draw on T5, against the 15 at A.
- **The Helm branch past T4.**
- **The rune order.** Two Chaos runes are needed among the first seven, as in §1, and no rune deck was
  dealt.

## Leads

- `yasuo-windrider-ride-the-wind-chain` (verified, Calm/Chaos) reads, as its steps: sit at 5 holding one
  battlefield, conquer it with the legend's move (6), Gank to the other and conquer it (7), Ride the Wind
  back to base for the third move (8). 469.1 and 470 forbid Conquering a battlefield already Scored by
  the Hold that turn, so as written it reaches 7, not 8, unless both battlefields are uncontrolled at the
  start. Its legend `OGN-259` is also not needed for three moves, which the shuttle here makes with one
  card. Reported to the orchestrator as a new issue, not edited here.
- The turn clock places Ride the Wind before the Yasuo it moves (no spell-after-unit sequencing), so a
  one-Ride-the-Wind Yasuo line prints a turn early. Reported to the orchestrator as a new issue.
- `OGN-297 Windswept Hillock` (*"Units here have [Ganking]"*) as battlefield A would let the A garrison
  reach B on T4. Not walked.
- A second Yasuo played on T4 next to the shuttle: E5 + 1 plus Ride the Wind's E2 + 1 is E7 + 2 Power,
  which seven runes pay (all seven exhausted, two of them recycled). With two Ride the Winds on T5 (E4 +
  2 on eight runes, E6 + 2 under the Helm) that is two points on T5 instead of one, which is slack on
  the contested board. Not walked.
- The Syren and Flash: a Yasuo played straight onto A on T3 (355.2.a) starts T4 at A. Then the Syren
  (A to base, E1), a Standard Move (base to A) and Flash (A to base, E2) are three moves with no Power
  and no Ride the Wind. He ends at base, so the next turn needs Ride the Wind again. The Syren costs E2
  to put down first. Not walked, and not priced on the clock.
- The Shen and Power Nexus T5 shapes of §6, not walked.
