# Play — Seal of Rage and Upstage Comedy bring Tryndamere's nine to turn six, the turn the free Hold curve wins, and one Hextech Ray holds it to three

Issue #491 (a slice of #200), 2026-10-27. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against,
and [the Tryndamere play](2026-10-24-tryndamere-scores-two-on-turn-five-the-nine-needs-a-garrison-under-four-might-and-eight-might-at-the-battlefield-is-the-free-answer.md)
for the count this one reuses.

**A negative result.** Chaos/Fury is the legend pair with the fewest finishers in the catalogue, and
none of them pays by turn 4 (the coverage table,
[identity coverage by legend pair](2026-10-27-identity-coverage-by-legend-pair.md)). This play asks for
the fastest BURST a Chaos/Fury deck can build. The pair's only point
multiplier is `UNL-029 Red Brambleback`, and the only conquer effect in the pair that scores is
`OGN-034 Tryndamere, Barbarian`, so the answer is the nine of `tryndamere-brambleback-conquer`: two
Tryndameres and three Bramblebacks, **1 + T x (1 + K)** in one Conquer. That entry's earliest attack is
T7 going first. Two cards the entry does not name, `OGN-040 Seal of Rage` and `UNL-009 Upstage
Comedy`, bring it to **T6** (the Seal is the one that matters), and no set of buys brings it to T5. **T6 is the turn the free Hold curve
wins in Chaos/Fury**, so the line does not beat it, and it does not enter the catalogue.

Walked as a game, going first, under `UNL-185 Bloodharbor Ripper` against the Fury/Chaos Draven deck
of the Tryndamere play, in the same seats and with the same deal for them. **The main line:** the five
bodies attack their 10-Might garrison at A on T6. Without an answer the Conquer scores 5, and
**8 to 6** wins at that Cleanup. They hold `OGN-009 Hextech Ray` with runes open, and three damage on a
Brambleback lets their 10 kill all three Bramblebacks: Tryndamere fires once each, **3 points, 6 to 6**,
and **6 to 7** after their T6. **The cheapest answer is one rune:** Hextech Ray or `UNL-014 Monster
Harpoon`, each E1 and one Fury Power, exhausted and recycled.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-185 Bloodharbor Ripper` (Fury/Chaos, tag Pyke) |
| **Chosen Champion** | `UNL-028 Pyke, Dockside Butcher` (Fury, E3, M2), never played |
| **The payoff** | `OGN-034 Tryndamere, Barbarian` (Fury, E7 + 2 Fury Power, M8), two copies needed |
| **The multiplier** | `UNL-029 Red Brambleback` (Fury, E4 + 1 Fury Power, M4), three copies needed |
| **The Power** | `OGN-040 Seal of Rage` (Fury gear, E0 + 1 Fury Power) |
| **The readying** | `UNL-009 Upstage Comedy` (Fury spell, E2) |
| **The bodies** | `SFD-018 Void Hatchling` (Fury, E2, M2), `OGN-010 Legion Rearguard` (Fury, E2, M2) |

Bloodharbor Ripper's text plays no part in the walk: *":rb_energy_1:, :rb_exhaust:: Return a friendly
unit at a battlefield to its owner's hand. Play a Gold gear token exhausted. (It has "[Reaction][>] Kill
this, :rb_exhaust:: [Add] :rb_rune_rainbow:.")"* Its tag is Pyke, so Pyke, Dockside Butcher can be the
Chosen Champion, 103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your
Champion Legend."* Every card in the line is mono-Fury, so a Fury/Chaos deck admits it, 103.1.b.3:
*"If a card has a single Domain, then that card is permitted in the Domain Identity that corresponds to
the same Domain."* Three copies is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the
same named card."* The list runs three of each of the four named cards. None of the cards in this play,
on either side, is a Signature card (`signature` in `data/cards.json`), and none is in
`data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`. The rune deck is six Fury and six
Chaos, 103.3.a.1: *"Cards in the Rune Deck must be of the Domain Identity of your Champion Legend."*

The card text the play turns on:

- Tryndamere, Barbarian: *"When I conquer after an attack, if you assigned 5 or more excess damage to
  enemy units, you score 1 point."*
- Red Brambleback: *"[Accelerate] (You may pay :rb_energy_1::rb_rune_fury: as an additional cost to
  have me enter ready.) Your conquer effects for conquering here trigger an additional time. When I
  conquer, [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have one.)"*
- Seal of Rage: *":rb_exhaust:: [Reaction] — [Add] :rb_rune_fury:. (Abilities that add resources can't
  be reacted to.)"*
- Upstage Comedy: *"[Repeat] :rb_energy_2: (You may pay the additional cost to repeat this spell's
  effect.) Ready a unit."* Its [Repeat] is never paid, so the open [Repeat] reading (#187) does not
  bear.
- Void Hatchling: *"If you would reveal cards from a deck, look at the top card first. You may recycle
  it. Then reveal those cards."* Nothing in the walk reveals.
- Legion Rearguard's [Accelerate] is never paid.

**What the line needs from the board and the opponent:**

- **All five in your base and ready on the attack turn.** Units move from base to a battlefield and
  back, never between battlefields (§2), so a body standing at a battlefield can never join the attack.
- **A combat.** Tryndamere's *"after an attack"* needs defenders at the battlefield attacked. An empty
  battlefield scores the Conquer's one point and nothing else.
- **A garrison the count survives.** Nine needs a garrison of 1 to 3 summed Might; 4 to 7 is seven, 8
  to 11 five, 12 to 15 three (the table in §2). The walk enters T6 on 3 points and needs 5.
- **No two damage on one of your attackers before the damage step.** Against a garrison of 10, two
  damage marked on a Brambleback costs two points; one damage costs none (§5).
- **A Seal of Rage on the board by T3**, and a Fury rune among your first four (§8).
- **The deal**: a Seal by T2, a Brambleback by T3, a Tryndamere by T4, all three Bramblebacks by T5,
  the second Tryndamere and an Upstage Comedy by T6 (§4).

## 2. What the count needs, and what the runes cost

**Tryndamere needs a combat.** His *"after an attack"* asks for the Attacker designation, and a combat
gives it out, 464.2.c.3: *"The attacker and defender gain the Attacker or Defender designation now, as
appropriate. Units at the Contested Battlefield controlled by the Attacker or Defender gain the
Attacker or Defender designation now, as appropriate."* A walk into an empty battlefield makes no
combat, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are a
stand-alone Phase and do not create a Combat."*

**Excess damage is the attacking Might nobody could assign.** That is R28 = A on issue #11, standing on
465.2.c.4: *"Units cannot have more damage assigned to them than the minimum required to constitute
lethal damage unless no further units remain to have damage assigned to them."* Against a garrison
with no damage marked, the excess is the attackers' summed Might less the garrison's.

**Only what is present at the Conquer counts.** 383.4.c.2.a: *"The Conquer Abilities of Units are put
on the Chain as Pending Items after the Unit(s) these effects correspond to are present at a
Battlefield when a player gains control of it and gains 1 Victory Point from Conquering."* A dead
Brambleback adds no instance, 365.1: *"Passive Abilities of Permanents are typically only active while
on the Board."* Each Brambleback present adds one instance of each conquer effect (R1 = A with
stacking).

**The defender chooses which attacker dies.** 465.2.c: *"Starting with the Attacker, each player
assigns an amount of damage equal to their summed Might among the other's Units."* And 465.2.c.3:
*"Units must have lethal damage assigned to them in full before damage is assigned to a different
Unit."* A unit dies at its Might, 143.2.a: *"If a Unit ever has nonzero damage marked on it equalling
or exceeding its Might, it is Killed."* Damage already marked counts toward lethal: that is the example
under 465.2.c.4, *"If a player has 5 damage to distribute among four 3 Might units and those units each
have 1 damage already marked on them, that player may not assign more than 2 damage to any of those
units."*

**The points are not Scores.** His *"you score 1 point"* is a Gain by an ability, 194.1.c: *"Spells,
Triggered Abilities and Activated Abilities that instruct them to gain one or more points."* That is
R2 = A, so 470 (*"A player may only Score, from either method, once per Battlefield per turn."*) does
not cap them, and 471.1.a.1: *"Notably, points Gained from sources that are not Conquer are not
beholden to these restrictions."*

**The count**, with the defender choosing the deaths that cost you most, for T=2 and K=3 (28 Might),
re-derived here by trying every set of deaths the garrison can pay for:

```
garrison D      1-3   4-7   8-11   12-15
no spell        9     7     5      3
2+ marked       7     5     3      3      (two or more damage on one Brambleback first)
```

At D = 10, one marked damage changes nothing; two on a Brambleback make it 3, and two on a Tryndamere
make it 4 (the defender then kills him and one Brambleback). The second row is the answer in §5.

**Units move from base, never between battlefields.** 144.4.a: *"Units may move from their Base to a
Battlefield."* 144.4.b: *"Units may move from a Battlefield to their Base."* A move costs the unit,
144.2: *"Exhausting the Unit is the Cost for this action."* Several go as one action, 144.3: *"Players
may perform multiple Units' standard move simultaneously. This is treated as one game action performed
on multiple Units."* A unit enters exhausted, 143.4: *"Units enter the Board exhausted."* Your units
ready only in your own Awakening, 415.3.a: *"A player Readies all non-spell Game Objects they Control
during the Awakening Phase on their turn."* So the second Tryndamere, bought on the attack turn, needs
Upstage Comedy to attack.

**The runes.** A rune adds Energy by exhausting, 164.2.a: *"[E]: [Reaction] — Add [1]."*, and Power by
leaving, 164.2.b: *"Recycle this: [Reaction] — Add [C]."*, and 164.2.b.1: *"The Power added this way
corresponds to the Domain of the Rune that is being Recycled."* A recycled rune goes to the bottom,
416.1: *"Recycling cards is the action in which a player takes one or more cards from a specific zone
and then puts it on the bottom of the corresponding deck."* Seal of Rage is the other Fury source: one
Fury Power once to play it, and one back every turn after, with no rune leaving. A gear enters ready,
359.2.d: *"If it is a Non-Unit Gear, it enters the Board Ready at the player's Base."*, and 415.3.a
readies it each Awakening.

**The earliest attack, counted.** A search over every way to buy the five bodies, going first, two runes
channelled a turn, each Power a rune recycled unless a Seal pays it, and the bodies bought on the attack
turn readied by Accelerate, Upstage Comedy (with or without its [Repeat]) or `SFD-004 Bushwhack`:

```
levers                                            earliest attack
[Accelerate] only (the entry's own cards)         T7
Upstage Comedy and Bushwhack, no Seal             T7
Seal of Rage, [Accelerate] only                   T6   two Seals T1 and T2, Brambleback T3,
                                                       Tryndamere T4 and T5, two Bramblebacks
                                                       Accelerated T6
Seal of Rage and Bushwhack                        T6
Seal of Rage and Upstage Comedy                   T6   Seal T2, Brambleback T3, Tryndamere T4,
                                                       two Bramblebacks T5, Tryndamere and
                                                       Upstage Comedy T6 (this walk)
every lever above, plus Bushwhack hidden a turn   T6
ahead for E0 and `UNL-022 Jhin, Murderous Artist`
```

**The Seal is the lever.** Without it no readying card moves the attack off T7; with it the entry's own
[Accelerate] reaches T6, and one Seal does it beside Upstage Comedy or Bushwhack. The walk takes one
Seal and Upstage Comedy, which leaves T1 and T2 free for bodies.

**Why T5 is out of reach.** Going first you have at most 2t runes on turn t, so at most 2t Energy.
Tryndamere costs E7, so by T5 he can be bought only on T4 (8 runes) or T5 (10), and not twice on T5
(14). One on T4 and one on T5, and the T5 one enters exhausted and must be readied, which costs E2 or,
hidden a turn ahead, E0. That leaves at most 1 Energy on T4 and 3 on T5 for E4 Bramblebacks: none. T3
has 6, one Brambleback; T2 has 4, one; T1 has 2. **Two Bramblebacks by T5 at most, and the nine needs
three**, whatever pays the Power. The pair's one Energy source outside the runes that a search can
place, Jhin, costs E4 himself in the same turns, and the search with him still answers T6.

## 3. Their deck: Fury/Chaos Draven

The deck of the Tryndamere play linked above, in the same seat and with the same opening four and
draws. `SFD-185 Glorious Executioner` (Fury/Chaos): *"When you win a combat, draw 1. (You win if only
your units remain after combat.)"* Its Chosen Champion is `OGN-028 Draven, Showboat`, never played.
Their bodies are `OGN-018 Noxus Saboteur` (Fury, E3, M3), `OGN-010 Legion Rearguard` (Fury, E2, M2),
`OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-016 Dangerous Duo` (Fury, E3, M3), `OGN-171 Mystic Poro`
(Chaos, E2, M2), `OGN-165 Cemetery Attendant` (Chaos, E3 + 1 Chaos Power, M3; *"When you play me,
return a unit from your trash to your hand."*), `OGN-012 Noxus Hopeful` (Fury, E4, M4; *"[Legion] — I
cost :rb_energy_2: less. (Get the effect if you've played another card this turn.)"*) and `OGN-006
Flame Chompers` (Fury, E3, M3). Their one spell is Hextech Ray (Fury, E1 + 1 Fury Power): *"[Action]
(Play on your turn or in showdowns.) Deal 3 to a unit at a battlefield."* Going second, they channel an
extra rune on T1, 485.7: *"First Turn Process: The player going second channels an extra Rune from
their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Fury/Chaos against Fury/Chaos. Your battlefield is A, `OGN-278 Bandle Tree` (*"You may hide an
additional card here."*, and nobody hides); theirs is B, `SFD-210 Hall of Legends` (*"When you conquer
here, you may pay :rb_energy_1: to ready your legend."*, and you never conquer B). Your opening four are
Void Hatchling, Legion Rearguard, Seal of Rage and Red Brambleback. Your draws are Void Hatchling (T1),
Tryndamere (T2), Red Brambleback (T3), Red Brambleback (T4), Tryndamere (T5) and Upstage Comedy (T6).
Their opening four are Noxus Saboteur, Legion Rearguard, Dangerous Duo and Pouty Poro. Their draws are
Mystic Poro (T1), Cemetery Attendant (T2), Noxus Hopeful (T3), Legion Rearguard (T4), Flame Chompers
(the legend's draw on T4), Hextech Ray (T5) and a card that plays no part (T6).

```
turn      runes   your turn                                                 points
T1        2       Void Hatchling (E2) to base. None left.                   0
their T1  3       Noxus Saboteur (E3) to base. None left.
T2        4       The Hatchling walks to A, empty, Conquer: +1. Seal of     1
                  Rage (E0 + 1 Fury Power) to base. Legion Rearguard
                  (E2) and Void Hatchling (E2) to A. Four runes, one
                  recycled; none left.
their T2  5       The Saboteur walks to B, empty, Conquer. Legion
                  Rearguard (E2) and Pouty Poro (E2) to base. One left.
T3        5       Hold A: +1. Red Brambleback (E4 + 1 Fury Power, the       2
                  Seal's) to base. One left.
their T3  7       Hold B. Mystic Poro (E2), Dangerous Duo (E3, with
                  Legion) and Noxus Hopeful (E2 with Legion) to base.
                  None left.
T4        7       Hold A: +1. Tryndamere (E7 + 2 Fury Power, the Seal's     3
                  and one recycled) to base. None left.
their T4  9       Hold B. All five in base attack A: A is theirs, and
                  the legend draws. Cemetery Attendant (E3 + 1 Chaos
                  Power) to B: the Hopeful comes back to their hand.
                  Noxus Hopeful (E2 with Legion) and Legion Rearguard
                  (E2) to B. Nine runes, one recycled; two left.
T5        8       Two Red Bramblebacks (E8 + 2 Fury Power, the Seal's and   3
                  one recycled) to base. None left.
their T5  10      Hold A and B. Flame Chompers (E3) to A. Seven left.
T6        9       Tryndamere (E7 + 2 Fury Power, the Seal's and one         6
                  recycled) to base, and Upstage Comedy (E2) readies
                  him. All five attack A. Hextech Ray on a Brambleback.
                  Conquer: +1, and Tryndamere fires once each: +2.
                  None left.
their T6  11      Hold B.
```

Their points: 1 after their T2, 2 after their T3, 4 after their T4, 6 after their T5, 7 after their
T6. After your T2 it is **1 to 0**; after their T2, **1 to 1**; after your T3, **2 to 1**; after their
T3, **2 to 2**; after your T4, **3 to 2**; after their T4, **3 to 4**; after your T5, **3 to 4**; after
their T5, **3 to 6**; after your T6, **6 to 6**; after their T6, **6 to 7**.

Runes on your board at the end of each turn: 2, 3, 5, 6, 7, 8. On theirs: 3, 5, 7, 8, 10, 9 after the
Ray on your T6, 11 after their T6.

Your hand, card by card: 5 after the T1 draw, 4 after the Hatchling; 5 after the T2 draw, 2 after the
Seal, the Rearguard and the Hatchling (Red Brambleback, Tryndamere); 3 after the T3 draw, 2 after the
Brambleback (Tryndamere, Red Brambleback); 3 after the T4 draw, 2 after Tryndamere (two Red
Bramblebacks); 3 after the T5 draw, 1 after the two Bramblebacks (Tryndamere); 2 after the T6 draw, 0
after Tryndamere and Upstage Comedy. Theirs: 5 after the T1 draw, 4 after the Saboteur; 5 after the T2
draw, 3 after the Rearguard and the Pouty Poro (Dangerous Duo, Mystic Poro, Cemetery Attendant); 4
after the T3 draw, 1 after the Mystic Poro, the Duo and the Hopeful (Cemetery Attendant); 2 after the T4
draw, 3 after the legend's draw, 2 after the Attendant, 3 with the Hopeful back, 1 after the Hopeful and
the Rearguard (Flame Chompers); 2 after the T5 draw, 1 after the Chompers (Hextech Ray); 0 after the Ray
on your T6, 1 after their T6 draw.

**Your T2: the Seal goes down first.** The Hatchling takes A, which is empty: a non-combat showdown
(316.8.b.1), and it is a Conquer, 348.2.a.1: *"This results in a Conquer if that player has not yet
scored that Battlefield this turn."* The Rearguard and the second Hatchling go to A, which you now
control, 355.2.a: *"By default, Valid locations include the controller’s Base or a Battlefield the
controller controls."* All four runes are exhausted for their Energy, and one Fury among them is then
recycled for the Seal: the recycle has no exhaust in its cost (164.2.b). A is 2 + 2 + 2 = **6**. The
Seal costs you one rune for the rest of the game and pays one Fury Power a turn from T3 on.

**Your T3 and theirs.** You Hold A, 469.2: *"Hold: A player maintains Control of a Battlefield they did
not yet Score this turn during their Beginning Phase."* The Brambleback's Power is the Seal's, so no
rune leaves: you go into T4 with 7. The Brambleback goes to base, where it can join the attack (144.4).
Their ready bodies in base are the Rearguard and the Pouty Poro, 4 against A's 6, so they do not
attack. Their base is 2 + 2 + 2 + 3 + 4 = **13**.

**Your T4: Tryndamere to base, and A falls.** Seven runes, seven Energy, one Fury Power from the Seal
and one recycled. A is 6, and their 13 take it whatever you do; the Brambleback and Tryndamere stay in
base, where the attack needs them.

**Their T4.** They Hold B, then all five attack A. Their 13 kill your three, 6 in all. Your 6 go on
the Hopeful, 4 in full, and the Mystic Poro, 2. The Rearguard, the Pouty Poro and the Duo remain, so A
is theirs, 466.5.d: *"Establishing Control results in a Conquer if that player has not yet scored this
Battlefield this turn."* The legend draws the Chompers. The Attendant brings the Hopeful back, and the
Hopeful costs two with [Legion]. All three go to B: B is 3 + 3 + 4 + 2 = **12**, A is 2 + 2 + 3 =
**7**.

**Your T5: two Bramblebacks, and no attack.** You control no battlefield, so nothing to Hold. The two
Bramblebacks cost all eight runes, the Seal's Fury and one recycled. Tryndamere and the first
Brambleback are ready, and they could attack A now: 12 into 7, the Brambleback dies, Tryndamere fires
once, **5 to 4**. But a unit that attacks stands at A afterwards, and from A it can never reach the
attack of T6 (144.4). The line holds them back.

**Their T5.** They Hold A and B: **3 to 6**. The Chompers go to A, which they control: A is **10**, B
is **12**. Seven runes stay up, and the Ray is in hand.

**Your T6: the attack.** Nine runes. Tryndamere costs seven and two Fury Power, the Seal's and one
recycled; Upstage Comedy costs the last two and readies him. All five move to A as one action (144.3):
8 + 8 + 4 + 4 + 4 = **28** against 10. Not B: at 12 the count is 3 with no spell at all (§2). You have
Focus first, 464.2.d: *"3. The Attacker gains Focus."* You pass. They cast Hextech Ray on a Brambleback,
one rune exhausted and one Fury recycled: three damage marked. None of your five has [Deflect], so the
Ray pays its printed cost. You have nothing to answer with.

**The damage.** Their 10 go 1 on the damaged Brambleback, lethal with the 3 already there (465.2.c.4),
4 and 4 on the other two, and the last 1 on a Tryndamere. Your 28 kill all four of theirs, 2 + 2 + 3 +
3 = 10, an excess of 18. Only your units remain, and A is yours with a Conquer: **+1**. No Brambleback
is there, so each Tryndamere fires once: **+2**. **6 to 6.**

**Without the Ray.** Their 10 kill one Tryndamere, 8 in full, and put 2 on a Brambleback, or kill two
Bramblebacks: either way the survivors are worth 1 + 1 x 4 = 1 + 2 x 2 = **5**, and you are on **8 to
6**. You win at that Cleanup, 194.2: *"A player wins the game if, in a cleanup, they have points greater
than or equal to the Victory Score and more points than any other player."*

**Their T6.** They Hold B: **6 to 7**. Their bodies at B reach A only through their base, a turn later
(144.4). Not walked: the turns after.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 4 + n cards on turn n. With three copies of each of the
four named cards, the walk's schedule (a Seal by T2, a Brambleback by T3, a Tryndamere by T4, three
Bramblebacks by T5, two Tryndameres and an Upstage Comedy by T6) is **0.0065%**. The seven cards
anywhere among your first ten is **0.0161%**, and two Tryndameres and three Bramblebacks among the
first ten, with nothing asked of the order, **0.1184%**. Each is an exact count over the 39-card pile.

## 5. Breaks to

**What the burst did, and the predicate.** On T6 the five bodies attacked a garrison of 10 at A. The
predicate is: played by them on your T6 with the seven runes they have up, does it leave the Conquer
worth 4 or less, so that you end your T6 short of 8?

**The free answer is not there in this deal.** Their bodies on the board after their T5 are 22 Might,
A's 7 and B's 3 fixed by their T4 combat and the Saboteur, and 12 to place. To leave every battlefield
you can attack at 3 points or less, both need 12 (§2): 24 Might. They are two short.

**The cheapest card answer: two damage on one attacker, one rune.** At D = 10, two marked damage on a
Brambleback drops the count from 5 to 3, and on a Tryndamere to 4 (§2); either leaves you short of 8.
One marked damage does not. From the
Fury/Chaos census of the Tryndamere play (247 cards, 27 of them [Action] or [Reaction] spells at E2 or
less), the two that do it for one rune are:

- `OGN-009 Hextech Ray` (Fury, E1 + 1 Fury Power): *"[Action] (Play on your turn or in showdowns.) Deal
  3 to a unit at a battlefield."*
- `UNL-014 Monster Harpoon` (Fury, E1 + 1 Fury Power): *"[Action] (Play on your turn or in showdowns.)
  Deal 2 to a unit at a battlefield. If you control a facedown card, deal 4 to it instead."*

Each is one rune exhausted for the Energy and the same rune recycled for the Power. **Priced against the
target as well:** none of Tryndamere, Barbarian and Red Brambleback has [Deflect], so 809.1.c adds
nothing: *"It is functionally short for "Spells and abilities an opponent controls that target [me/this]
cost an amount of Power equal to [Deflect Value] more to play as an additional cost for each time they
choose [me/this].""* Had one of them carried it, 809.1.b.3 (*"If X is omitted, it is presumed to be
1."*) and 809.1.c.1 (*"The Power used to pay this cost may always be of any Domain."*) would make each a
second rune. Two runes and no recycle buy the same with `OGS-003 Incinerate` or `VEN-010 Consuming
Curse` (E2, two damage).

**A stun does not do it.** `UNL-134 Existential Dread` without its [Repeat] stuns one attacker, and
423.1.b: *"A Stunned Unit does not contribute its might to damage in the combat damage step."* Your 20
left still leave an excess of 10 against their 10, and the stunned unit stays present for 383.4.c.2.a.

**The Hold curve is the answer that costs them nothing to play.** Their plain bodies took A on their T4
and Held both on their T5: 6 points to your 3 after their T5. The line spent your T3 to T6 on cards
that score nothing until T6. That is §6.

## 6. Against the free Hold curve

`npm run adversarial -- --turns`, run at `e4653c7` on 2026-10-27, prints the baseline for every
identity: *"pay LATER than the UNOPPOSED Hold curve (both battlefields, 2/turn, T5-T6)"*. Chaos/Fury
has no unit at Energy 1, so its baseline is **T6**, the curve in
[the unopposed clock](2026-09-12-the-unopposed-clock.md): *"Turn 6, not turn 5."* The same run prints
the entry this line extends as `T 7 vs T6 baseline  SLOWER  BURST    fury         tryndamere-brambleback-conquer`.

| | pays |
|---|---|
| The free Hold curve, Chaos/Fury | **T6** |
| `tryndamere-brambleback-conquer` as catalogued | T7 |
| This line, with Seal of Rage and Upstage Comedy | **T6**, no earlier on any purchase (§2) |

**The line pays on the same turn as the free curve, so it does not beat it.** That is a negative
result, and the line does not enter `data/combos.json`. What it buys over the curve is a different
board: the curve needs both battlefields uncontested from T3, and this line wins from 3 points with
the opponent holding both, if the garrison is 11 or less and they hold no two damage. The walk's
opponent had both on T5 and held the Ray.

## 7. Verdict

**A negative result: T6, the free curve's turn, and one rune holds it to three.** The fastest BURST a
Chaos/Fury deck can build is Tryndamere's nine: no other card in the pair multiplies points,
and no other conquer effect in it scores. Seal of Rage and Upstage Comedy move its first attack from T7
to T6; nothing moves it to T5, because three Bramblebacks and two Tryndameres do not fit in the Energy
of the first five turns. Walked going first against the Draven deck, the five bodies attacked a
garrison of 10 on T6 from 3 points behind 6: unanswered that is 5 points and **8 to 6**, a win on T6,
and with Hextech Ray on a Brambleback it is 3, **6 to 6**, and **6 to 7** after their T6. The cheapest
answer is one rune: Hextech Ray or Monster Harpoon.

## 8. Not verified

**Your runes.** The walk assumes six Fury and six Chaos runes. It recycles one Fury on T2 (the Seal),
T4, T5 and T6, and the Seal pays the rest. Dealt over all **924** orders of the twelve, channelling two
a turn from the top and recycling a Fury to the bottom each time one is asked, it fails in **28 of 924
(3.03%)**, all on T2: the four runes on the board are all Chaos, and the Seal cannot be paid. Every
later recycle can always be paid. Twelve Fury runes (103.3.a.1 allows it) fail in **0**.

**Their runes.** Six Fury and six Chaos, as in the Tryndamere play. The Attendant on their T4 needs a
Chaos among their first nine runes, which six Fury cannot fill: **0 of 924**. The Ray on your T6 needs
a Fury among the ten on their board, their first eleven less the recycled Chaos; six Chaos leave at
least five Fury among eleven: **0 of 924**.

**The deal.** The walk fixes both hands. Its own schedule is **0.0065%** (§4); the line also needs
`OGN-040 Seal of Rage` and `UNL-009 Upstage Comedy` in a list that runs three of each. The walk's choices
of opponent are their T4 attack, the late bodies at B, the Chompers at A, and the Ray on a Brambleback
rather than on a Tryndamere (3 against 4, and both leave you short; §2). `data/cards.json` carries no champion supertype: I read
Pyke, Dockside Butcher as a champion unit by his name and his Pyke tag.

**The count.** The table in §2 assumes no [Tank], no Shield, and nothing else changing Might in the
combat. The search in §2 covers the cards it names; an Energy source the pool prints outside them was
not modelled, and the T5 bound in §2 holds for any Power source but not for one that adds Energy. Not
walked: going second, the mulligan, 2v2, the attack on T5 with the first Tryndamere and Brambleback,
and the turns after their T6.

## Leads

- `tryndamere-brambleback-conquer`, the notable *"WHEN THE NINE FIRST ATTACKS, GOING FIRST"*: it says
  the earliest attack is T7 and that Relentless Storm's rune does not move it. With `OGN-040 Seal of
  Rage` (one Fury Power a turn with no rune recycled) and `UNL-009 Upstage Comedy` (E2, readies the
  Tryndamere bought that turn) it is **T6**: Seal T2, Brambleback T3, Tryndamere T4, two Bramblebacks
  T5, Tryndamere and Upstage Comedy T6. T6 is still the Chaos/Fury and Fury Hold baseline, not earlier
  than it.
- The same entry's search paid every Power with a recycled rune and readied the attack turn's bodies
  only through [Accelerate]. Seal of Rage is the lever it did not model, and it alone moves the turn:
  two Seals and the entry's own [Accelerate] reach T6 (Seals T1 and T2, Brambleback T3, Tryndamere T4
  and T5, two Accelerated Bramblebacks T6). Upstage Comedy or `SFD-004 Bushwhack` (*"Friendly units
  enter ready this turn."*) reach it with one Seal; without a Seal neither moves it off T7.
- `scripts/adversarial-check.mjs --turns` prices the entry's own cards only, so its row for
  `tryndamere-brambleback-conquer` reads T7. That is right for the cards declared; the entry could
  declare the Seal and Upstage Comedy as optional enablers and say T6.
- For the coverage question of #200: in Chaos/Fury the only point multiplier is Red Brambleback and the
  only scoring conquer effect is Tryndamere, so the nine of this play, one Conquer from zero points with
  two Tryndameres and three Bramblebacks, cannot be bought before T6 going first (§2). That bound is
  for that board only. It does not reach a finish that banks Hold points first and needs fewer
  copies, which is not a BURST and is not walked here: a body takes A on T2 and A is Held on T3, T4
  and T5 for 4 points; Red Brambleback on T3, Tryndamere on T4 (Seal of Rage, and one rune recycled for
  the second Power, 164.2.b), and a second Brambleback on T5 with [Accelerate]; on T5 Tryndamere and
  both Bramblebacks conquer B, 1 for the Conquer and Tryndamere's trigger 1 + 2 times, 8 on T5. Its
  board: an enemy garrison at B of 1 to 3 Might in all, so the 5 excess is met and no Brambleback
  dies, and nothing of theirs contests A from T2 to T5. A CHAIN was not searched: the pair's other point sources
  are `OGN-205 Yasuo, Windrider` (*"The third time I move in a turn, you score 1 point."*), `SFD-148
  Draven, Audacious` (*"The first time I win a combat each turn, you score 1 point."*) and two Scores a
  turn at most (470), and whether they reach 8 in one turn before T6 is open.
