# Play — Tryndamere scores two on turn five, the nine needs a garrison under four Might, and eight Might at the battlefield is the free answer

Issue #449 (a slice of #200), 2026-10-24. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `tryndamere-brambleback-conquer`**, the Fury BURST that moves `OGN-034 Tryndamere,
Barbarian` (Fury, E7 + 2 Fury Power, M8, *"When I conquer after an attack, if you assigned 5 or more
excess damage to enemy units, you score 1 point."*) into an enemy garrison beside `UNL-029 Red
Brambleback` (Fury, E4 + 1 Fury Power, M4, *"Your conquer effects for conquering here trigger an
additional time."*), and counts **1 + T x (1 + K)**: nine points from two Tryndameres and three
Bramblebacks in one Conquer. Walked as a game, going first, under `OGN-249 Relentless Storm` against
the Fury/Chaos Draven deck of
[the En Garde play](2026-10-23-en-garde-wants-a-lone-body-they-attack-the-hammer-a-pair-they-leave-alone-and-both-end-where-a-plain-two-drop-does.md),
in the same seats. **The main line:** one Tryndamere on T4 and two Bramblebacks, the second
Accelerated, attack A on T5 into a garrison of three 2-Might bodies. The garrison's 6 damage kill a
Brambleback before the Conquer, so Tryndamere fires twice, not three times: **3 points in one Conquer,
6 to 4** after your T5 and **6 to 5** after their T5. The same deal with `UNL-108 Wily Newtfish` in the
Brambleback slots ends **5 to 5**. **The nine is not on this board.** The five bodies first attack
together on T7 at the earliest, and they score nine only into a garrison of 1 to 3 total Might: a
garrison of 4 kills a Brambleback first, and one of 8 kills a Tryndamere. **The cheapest answer is
free:** their fourth body at A instead of B makes A 8 Might, Tryndamere dies in the combat, and the
game is **4 to 5** after their T5. The one-rune card answers are `OGN-009 Hextech Ray`,
`UNL-014 Monster Harpoon` and `UNL-134 Existential Dread`.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-24 at `e010ecb`, reads
773 entries, 262 with forced-ordering language, **95 in the queue and 5 of them with no play**, as the
issue measured. The two picks are unchanged: this entry is rank 92, the second in the list. The other
entry of this slice is rank 91, `darius-executioner-vanguard-captain-legion-clause-boundary`.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-249 Relentless Storm` (Fury/Body, tag Volibear) |
| **Chosen Champion** | `OGN-041 Volibear, Furious` (Fury, E10 + 2 Fury Power, M9), never played in the walk |
| **The payoff** | `OGN-034 Tryndamere, Barbarian` (Fury, E7 + 2 Fury Power, M8), three copies |
| **The multiplier** | `UNL-029 Red Brambleback` (Fury, E4 + 1 Fury Power, M4), three copies |
| **The control** | `UNL-108 Wily Newtfish` (Body, E4, M4) in the Brambleback slots |
| **The bodies** | `SFD-018 Void Hatchling` (Fury, E2, M2), `SFD-010 Void Drone` (Fury, E3, M3) |

The entry admits any legend with Fury. Relentless Storm is the one for this walk because Tryndamere
turns it on: *"When you play a [Mighty] unit, you may exhaust me to channel 1 rune exhausted. (A unit
is Mighty while it has 5+ :rb_might:.)"* Its tag is Volibear, so Volibear, Furious can be the Chosen
Champion, 103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your
Champion Legend."* No legend in the pool carries the Tryndamere tag, so Tryndamere cannot be one.

Every card in the list has a single domain inside Fury/Body, 103.1.b.3: *"If a card has a single
Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain."*
Three copies is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the same named
card."* The list runs three Tryndameres where the entry declares two. None of the cards in this play
is a Signature card (`signature` in `data/cards.json`), and none is in `data/legality.src.json` or
marked [BANNED] in `data/corpus_flat.txt`. The rune deck is twelve Fury runes, 103.3.a.1: *"Cards in
the Rune Deck must be of the Domain Identity of your Champion Legend."* Every Power in the walk is
Fury.

The card text the play turns on:

- Tryndamere, Barbarian: *"When I conquer after an attack, if you assigned 5 or more excess damage to
  enemy units, you score 1 point."*
- Red Brambleback: *"[Accelerate] (You may pay :rb_energy_1::rb_rune_fury: as an additional cost to
  have me enter ready.) Your conquer effects for conquering here trigger an additional time. When I
  conquer, [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have one.)"*
- Void Hatchling: *"If you would reveal cards from a deck, look at the top card first. You may recycle
  it. Then reveal those cards."* Nothing in the walk reveals.
- Void Drone: *"I cost :rb_energy_2: less to play from anywhere other than your hand."* Every Drone is
  played from hand.
- Wily Newtfish: *"If you've gained XP this turn, I have +1 :rb_might: and [Ganking]."* Nothing in the
  walk gains XP.

## 2. What the count needs, and what the runes cost

**Tryndamere needs a combat.** His *"after an attack"* asks for the Attacker designation, and a combat
gives it out, 464.2.c.3: *"The attacker and defender gain the Attacker or Defender designation now, as
appropriate. Units at the Contested Battlefield controlled by the Attacker or Defender gain the
Attacker or Defender designation now, as appropriate."* A walk into an empty battlefield makes no
combat, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are a
stand-alone Phase and do not create a Combat."* So an empty battlefield scores the Conquer's one point
and nothing else. The entry's step 1 says so.

**Excess damage is the attacking Might nobody could assign.** That is R28 = A on issue #11, and it
stands on 465.2.c.4: *"Units cannot have more damage assigned to them than the minimum required to
constitute lethal damage unless no further units remain to have damage assigned to them."* Against a
garrison with no damage marked, the excess is the attackers' summed Might less the garrison's summed
Might.

**A Brambleback counts only if it is there when you take control.** 383.4.c.2.a: *"The Conquer
Abilities of Units are put on the Chain as Pending Items after the Unit(s) these effects correspond to
are present at a Battlefield when a player gains control of it and gains 1 Victory Point from
Conquering."* The extra instance comes from the Brambleback's own passive, and a dead one has none,
365.1: *"Passive Abilities of Permanents are typically only active while on the Board."* The same goes
for a dead Tryndamere: he is not present, so his clause never triggers. With them present, each
Brambleback adds one instance of each conquer effect (R1 = A with stacking). 471.2.c, *"These will only
trigger when the Battlefield is Scored; I.E. These cannot be triggered more than once per turn for a
player."*, caps how often the battlefield triggers, not how many instances one trigger produces
(`docs/rules-notes/rules-findings.md`, the R1 bullet).

**The defender chooses which attacker dies.** 465.2.c: *"Starting with the Attacker, each player
assigns an amount of damage equal to their summed Might among the other's Units."* And 465.2.c.3:
*"Units must have lethal damage assigned to them in full before damage is assigned to a different
Unit."* So a garrison of summed Might 4 kills one Brambleback, and one of 8 kills one Tryndamere.

**The points are not Scores.** His *"you score 1 point"* is a Gain by an ability, 194.1.c: *"Spells,
Triggered Abilities and Activated Abilities that instruct them to gain one or more points."* That is
R2 = A, so 470 (*"A player may only Score, from either method, once per Battlefield per turn."*) does
not cap them, and the Final Point rule does not bind them, 471.1.a.1: *"Notably, points Gained from
sources that are not Conquer are not beholden to these restrictions."* The walk never reaches 7.

**The count, then.** One attack by T Tryndameres and K Bramblebacks into a garrison of summed Might D
scores 1 for the Conquer plus, for each Tryndamere still alive, 1 plus one per Brambleback still alive,
when the excess is 5 or more. With the defender choosing the deaths that cost you most, counted from
465.2.c.3 and the paragraphs above:

```
T=2, K=3 (the entry's nine), attackers 28 Might
D       0    1-3   4-7   8-11   12-15   16-23   24-27
points  1    9     7     5      3       1       1

T=1, K=2 (this walk's T5 board), attackers 16 Might
D       0    1-3   4-7   8-15
points  1    4     3     1
```

D = 0 is the empty battlefield: no combat, one point. From 24 the excess is under 5. At 12 to 15 the
defender kills three Bramblebacks rather than a Tryndamere and a Brambleback, because that costs you
one point more.

**Units move from base, never between battlefields.** 144.4.a: *"Units may move from their Base to a
Battlefield."* 144.4.b: *"Units may move from a Battlefield to their Base."* A move costs the unit,
144.2: *"Exhausting the Unit is the Cost for this action."* Several units go as one action, 144.3:
*"Players may perform multiple Units' standard move simultaneously. This is treated as one game action
performed on multiple Units."* So every attacker has to be ready in your base on the turn of the
attack. A unit enters exhausted, 143.4: *"Units enter the Board exhausted."*, unless it is
Accelerated, 805.1.a: *"Accelerate is functionally short for “As you play me, you may pay [1][C] as an
additional cost. If you do, I enter ready.”"* No card in the walk has [Ganking].

**The runes.** A rune adds Energy by exhausting, 164.2.a: *"[E]: [Reaction] — Add [1]."* It adds Power
by leaving, 164.2.b: *"Recycle this: [Reaction] — Add [C]."*, to the bottom of the rune deck, 416.1:
*"Recycling cards is the action in which a player takes one or more cards from a specific zone and then
puts it on the bottom of the corresponding deck."* So every Power is a rune off your board. Your runes
ready only on your turn, 415.3.a: *"A player Readies all non-spell Game Objects they Control during the
Awakening Phase on their turn."* Going first you channel two a turn. Tryndamere costs seven runes, two
of them recycled, and a Brambleback four, one recycled; Accelerated, five, two recycled.

**The earliest turns, counted.** A search over every way to buy the bodies (two runes channelled a
turn, Power recycled, Relentless Storm's rune on the turn you play a Tryndamere, a Brambleback played
on the turn of the attack Accelerated) gives, going first:

```
board          earliest attack   one set of buys that gets there
T=1, K=2       T5                Brambleback T3, Tryndamere T4, one Accelerated T5
T=2, K=3       T7                Tryndamere T5, Tryndamere and a Brambleback T6, two Accelerated T7
T=2, K=3       T7                without Relentless Storm: two Bramblebacks T4, Tryndamere T5 and
                                 T6, one Accelerated T7
```

A Brambleback bought plain on the attack turn enters exhausted and cannot attack, so the search
counts it only on an earlier turn. It spends no other card; bodies that cost no Power fit beside it on
T1 to T3. Relentless Storm's rune does not bring the nine forward.

## 3. Their deck: Fury/Chaos Draven

The deck of the En Garde play linked above, in the same seat and with the same opening four.
`SFD-185 Glorious Executioner` (Fury/Chaos): *"When you win a combat, draw 1. (You win if only your
units remain after combat.)"* Its Chosen Champion is `OGN-028 Draven, Showboat`, never played. Their
bodies are `OGN-018 Noxus Saboteur` (Fury, E3, M3), `OGN-010 Legion Rearguard` (Fury, E2, M2),
`OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-016 Dangerous Duo` (Fury, E3, M3; *"[Legion] — When you play
me, give a unit +2 :rb_might: this turn."*), `OGN-171 Mystic Poro` (Chaos, E2, M2), `OGN-165 Cemetery
Attendant` (Chaos, E3 + 1 Chaos Power, M3; *"When you play me, return a unit from your trash to your
hand."*), `OGN-012 Noxus Hopeful` (Fury, E4, M4; *"[Legion] — I cost :rb_energy_2: less."*) and
`OGN-006 Flame Chompers` (Fury, E3, M3). Their one spell in the walk is Hextech Ray (Fury, E1 + 1 Fury
Power). Going second, they channel an extra rune on T1, 485.7: *"First Turn Process: The player going
second channels an extra Rune from their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Fury/Body against Fury/Chaos. Your battlefield is A, `OGN-278 Bandle Tree` (*"You may hide an
additional card here."*, and nobody hides); theirs is B, `SFD-210 Hall of Legends` (*"When you conquer
here, you may pay :rb_energy_1: to ready your legend."*, and you never conquer B). Your opening four
are Void Hatchling, Void Drone, Red Brambleback and Tryndamere. Your draws are Void Hatchling (T1), Red
Brambleback (T2), Void Drone (T3), Tryndamere (T4) and Red Brambleback (T5). Their opening four are
Noxus Saboteur, Legion Rearguard, Dangerous Duo and Pouty Poro. Their draws are Mystic Poro (T1),
Cemetery Attendant (T2), Noxus Hopeful (T3), Legion Rearguard (T4), Flame Chompers (the legend's draw
on T4) and Hextech Ray (T5).

The main line is the Brambleback list.

```
turn      runes   your turn                                                 points
T1        2       Void Hatchling (E2) to base. None left.                   0
their T1  3       Noxus Saboteur (E3) to base. None left.
T2        4       The Hatchling walks to A, empty, Conquer: +1. Void        1
                  Drone (E3) to A. One left.
their T2  5       The Saboteur walks to B, empty, Conquer. Legion
                  Rearguard (E2) and Pouty Poro (E2) to base. One left.
T3        6       Hold A: +1. Red Brambleback (E4 + 1 Fury Power) to       2
                  base. Void Hatchling (E2) to A. Six runes, one
                  recycled; none left.
their T3  7       Hold B. Mystic Poro (E2), Dangerous Duo (E3, with
                  Legion) and Noxus Hopeful (E2 with Legion) to base.
                  None left.
T4        7       Hold A: +1. Tryndamere (E7 + 2 Fury Power) to base;      3
                  Relentless Storm channels a rune exhausted. Seven
                  runes, two recycled; none left.
their T4  9       Hold B. All five in base attack A: A is theirs, and
                  the legend draws. Cemetery Attendant (E3 + 1 Chaos
                  Power) to B: the Hopeful comes back to their hand.
                  Noxus Hopeful (E2 with Legion) and Legion Rearguard
                  (E2) to B. Nine runes, one recycled; two left.
T5        8       Red Brambleback with Accelerate (E5 + 2 Fury Power)       6
                  to base. Tryndamere and both Bramblebacks attack A.
                  Conquer: +1, and Tryndamere fires twice: +2. Void
                  Drone (E3) to A. Eight runes, two recycled; none left.
their T5  10      Hold B. Flame Chompers (E3) to base. Seven left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 4 after their T4, 5 after their
T5. After their T2 it is **1 to 1**; after your T3, **2 to 1**; after their T3, **2 to 2**; after your
T4, **3 to 2**; after their T4, **3 to 4**; after your T5, **6 to 4**; after their T5, **6 to 5**.

Runes on your board at the end of each turn: 2, 4, 5, 6, 6. On theirs: 3, 5, 7, 8, 10.

Your hand, card by card: 5 after the T1 draw, 4 after the Hatchling; 5 after the T2 draw, 4 after the
Drone; 5 after the T3 draw, 3 after the Brambleback and the Hatchling; 4 after the T4 draw, 3 after
Tryndamere (Red Brambleback, Void Drone, Tryndamere); 4 after the T5 draw, 2 after the Brambleback and
the Drone (Tryndamere, Red Brambleback). Theirs: 5 after the T1 draw, 4 after the Saboteur; 5 after the
T2 draw, 3 after the Rearguard and the Pouty Poro (Dangerous Duo, Mystic Poro, Cemetery Attendant); 4
after the T3 draw, 1 after the Mystic Poro, the Duo and the Hopeful (Cemetery Attendant); 2 after the
T4 draw, 3 after the legend's draw, 2 after the Attendant, 3 with the Hopeful back, 1 after the
Hopeful and the Rearguard (Flame Chompers); 2 after the T5 draw, 1 after the Chompers (Hextech Ray).

**Your T2: the Drone guards A, and the Brambleback waits.** The Hatchling takes A, which is empty: a
non-combat showdown (316.8.b.1), and they have no rune ready, so it is a Conquer, 348.2.a.1: *"This
results in a Conquer if that player has not yet scored that Battlefield this turn."* The Drone goes to
A, which you now control, 355.2.a: *"By default, Valid locations include the controller’s Base or a
Battlefield the controller controls."* A Brambleback played now would sit in base for three turns, or
stand at A where it can never join an attack (144.4). And Tryndamere on T4 needs seven runes, so you
can recycle at most one rune before then: one Brambleback by T3, not two.

**Their T2: the empty battlefield.** A is 2 + 3 = 5. The Rearguard and then the Duo would make the
Saboteur a 5, and 5 into 5 kills everything at A on both sides. A would be left with nobody, 466.5.b:
*"If there are no Units remaining here controlled by any player, the Battlefield becomes
Uncontrolled."* That scores nothing; the empty B scores one. They take B and keep the Duo.

**Your T3 and theirs.** You Hold A, 469.2: *"Hold: A player maintains Control of a Battlefield they did
not yet Score this turn during their Beginning Phase."* The first Brambleback goes to base, ready from
your T4 on, and the second Hatchling to A: A is 2 + 3 + 2 = **7**. Their ready bodies in base are the
Rearguard and the Pouty Poro, 4, and a Duo played this turn would make them 6, so they do not attack.
The Mystic Poro's [Vision] shows them the Rearguard on top, and they keep it. The Duo's [Legion] is on,
because the Poro was played first, and its +2 has nothing to do. Their base is 2 + 2 + 2 + 3 + 4 =
**13**.

**Your T4: Tryndamere to base, and A falls.** Tryndamere costs all seven runes, and Relentless Storm
puts an eighth on the board exhausted: six after the two recycled. Their 13 will take A whatever you
do. With the Brambleback at A it is 11, and you lose the Brambleback with it, so it stays in base.
Played to A instead, Tryndamere makes A 15 and they do not attack it, but from A he can never attack
anything (144.4). This walk is about the burst.

**Their T4: A is theirs, and their new bodies go to B.** They Hold B, then all five attack A. Their 13
kill your three, 7 in all. Your 7 go on the Hopeful and the Duo, 4 and 3. The Rearguard, the Pouty
Poro and the Mystic Poro remain, so A is theirs, 466.5.d: *"Establishing Control results in a Conquer
if that player has not yet scored this Battlefield this turn."* The legend draws the Chompers. The
Attendant brings the Hopeful back, and the Hopeful costs two with [Legion]. All three go to B, the
battlefield Tryndamere would have to take from them: B is 3 + 3 + 4 + 2 = **12**, A is 2 + 2 + 2 =
**6**. Two runes stay up, with no instant in their hand.

**Your T5: the attack.** You control no battlefield, so nothing to Hold. The second Brambleback is
Accelerated into your base, ready. Tryndamere, which readied in your Awaken Phase (315.1.b: *"The
Turn Player readies all Game Objects they control that are able to be readied."*), and both
Bramblebacks move to A as one action: 8 + 4 + 4 = **16**. Not B: at 12, the defender kills Tryndamere
(the table in §2). You have Focus first, 464.2.d: *"3. The Attacker gains Focus."* You pass, and they
have nothing to play.

**The damage.** Your 16 assign 2 to each of their three, 6, and 10 can go nowhere: the excess is 10.
Their 6 kill the first Brambleback, 4 in full, and put 2 on the second. Only your units remain, and A
is yours with a Conquer: **+1**. The dead Brambleback adds nothing (365.1). Tryndamere's clause
triggers twice, once and once more for the Brambleback still there: **+2**. The surviving Brambleback's
own *"When I conquer, [Buff] a friendly unit"* also triggers twice: one buff on Tryndamere, a 9, and
one on the Brambleback, a 5. A buff is one per unit, 702.3: *"There can only be one Buff on a Unit at a
time."* The last three runes put the Drone at A: 9 + 5 + 3 = **17**. **6 to 4.**

**Their T5.** They Hold B: **6 to 5**. Their units at B reach A only through their base, a turn
later (144.4), and A is 17. They play the Chompers and hold the Ray. Not walked: your T6, where a
Hold of A is 7, and the turns after.

**The control: Wily Newtfish in the Brambleback slots, same deal.** The Newtfish costs no Power, so on
T3 you keep all six runes, and on T4 you have eight and one left after Tryndamere. Their T4 is the
same: **3 to 4**, A at 6 and B at 12. On T5 the second Newtfish has no Accelerate and enters
exhausted, so Tryndamere attacks A beside one Newtfish: 12 into 6, an excess of 6. Their 6 kill the
Newtfish, and Tryndamere fires once: **+1 +1, 5 to 4**. The Newtfish and the Drone go to A after. They
Hold B: **5 to 5**.

**If they had put their T4 bodies at A instead.** A is 6 + 3 + 4 + 2 = 15, and B is the Saboteur
alone, 3. Tryndamere and both Bramblebacks attack B: an excess of 13, and the Saboteur's 3 kill
nobody. Conquer +1, and Tryndamere fires three times: **7 to 4**. They Hold A on their T5, 7 to 5, and
nothing of theirs reaches B before your T6, where Hold B is the eighth point, and 8 to 5 wins, 194.2:
*"A player wins the game if, in a cleanup, they have points greater than or equal to the Victory Score
and more points than any other player."* So the split they chose in the main line is the better one
for them, and the next section shows the one that is better still.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 4 + n cards on turn n. With three copies of each, a
Brambleback among your first 7 (by T3) is **45.73%**, a Tryndamere among your first 8 (by T4)
**50.82%**, two Bramblebacks among your first 9 (by T5) **12.74%**, and all three together, the main
line's deal, **5.45%**. The T7 nine needs at least two Tryndameres among the first 10 and three
Bramblebacks among the first 11, which is **0.18%** before any turn-by-turn order is asked of them.

## 5. Breaks to

**What the burst did, and the predicate.** On T5 Tryndamere and two Bramblebacks conquered A, and
Tryndamere's clause triggered twice. The predicate is: played by them, does it leave Tryndamere's
clause triggering fewer than twice in that Conquer?

**The scope.** A Fury/Chaos deck plays only Fury, Chaos and Fury/Chaos cards (103.1.b), and its
Signature cards must carry its legend's tag. As in the En Garde play, that is **247** cards folded by
name (not a legend, battlefield, rune or token, and not a Signature card with another champion's tag),
after the five banned in constructed (`Called Shot`, `Draven, Vanquisher`, `Fight or Flight`,
`Scrapheap`, `Stealthy Pursuer`). **62** of them are spells.

**The free answer: eight Might where Tryndamere has to go.** On their T4 the Rearguard goes to A
instead of B: the same card, the same rune. A is 2 + 2 + 2 + 2 = **8** and B is 3 + 3 + 4 = **10**,
and Tryndamere has to attack one of them. At A their 8 go on Tryndamere, lethal in full (465.2.c.3), and
your 16 kill all four. A is yours, **+1**, and Tryndamere is not there to trigger (383.4.c.2.a). The
Bramblebacks trigger only their buffs. **4 to 4**, and **4 to 5** after their T5 Hold of B, against
the main line's 6 to 5. At B it is the same: 8 on Tryndamere, 2 on a Brambleback. Not attacking at all
is 3 to 5. Any garrison of 8 Might answers Tryndamere, and the Draven deck puts 8 Might on a
battlefield by its T4 without trying.

**With the two open runes, one card.** On your T5 they have two ready runes, and Power comes from any
rune, ready or not (164.2.b). The predicate for the candidates: of the 62 spells, a card with [Action]
or [Reaction] (the regex `\[(Action|Reaction)\]`, case-insensitive, reminder text left in) that costs
no more than E2. That is **27** cards, and **12** of them break the line:

- **Two or more damage on Tryndamere**, after which their 6 are lethal on him: `OGN-009 Hextech Ray`
  (E1 + 1 Fury Power, 3), `UNL-014 Monster Harpoon` (E1 + 1 Fury Power, 2, or 4 with a facedown card),
  `OGS-003 Incinerate` (E2, 2), `VEN-010 Consuming Curse` (E2, 2), `UNL-007 Smite` (E2 + 1 Fury Power,
  3) and `OGN-008 Get Excited!` (E2 + 1 Fury Power, the discarded card's Energy cost; their Flame
  Chompers is 3). **1 to the Conquer, and 4 to 4.**
- **`UNL-134 Existential Dread`** (Chaos, E1 + 1 Chaos Power): *"[Stun] an attacking enemy unit."* A
  stunned Tryndamere stays, but 423.1.b: *"A Stunned Unit does not contribute its might to damage in
  the combat damage step."* Your 8 against their 6 is an excess of 2, and his clause asks for 5.
  **One rune.**
- **`UNL-013 Lotus Trap`** (Fury, E2, [Hidden]) on Tryndamere: 4 assigned is 8 dealt, and 465.2.c.4.a
  lets them assign *"the minimum applied value such that the unit would take lethal damage"*.
- **`SFD-001 Against the Odds`** (Fury, E2): *"Give a friendly unit at a battlefield +2 :rb_might: this
  turn for each enemy unit there."* Three of yours are there: +6, a garrison of 12, and an excess of 4.
- **`SFD-145 Switcheroo`** (Chaos, E2 + 2 Chaos Power, [Hidden]): Tryndamere's 8 and a Poro's 2 swap,
  and their 12 kill him.
- **`OGN-172 Rebuke`** (Chaos, E2 + 2 Chaos Power): Tryndamere goes back to your hand.
- **`OGN-173 Ride the Wind`** (Chaos, E2 + 1 Chaos Power): *"Move a friendly unit and ready it."* The
  Saboteur comes from B to A. A spell move has the limits its source states, 449.1: *"The source of the
  Move will provide details on any restrictions on legality for Destination."*, and this one states
  none. It becomes a defender, 464.2.c.3.a: *"If a Unit controlled by the Attacker or Defender becomes
  present at this Battlefield after this moment, it will gain the Attacker or Defender designation
  during the Cleanup phase following the action that caused it to become present, as appropriate for
  its controller."* The garrison is 9, and Tryndamere dies.

The other fifteen do not. `OGN-004 Cleave`, `SFD-003 Blood Rush` and `UNL-010 Vault Breaker` pump an
attacker, and theirs defend. `OGN-169 Gust` returns a unit of 3 Might or less, and yours are 4 and 8.
`OGS-011 Flash` moves two of their defenders to base, which only raises your excess. `OGN-033
Shakedown` deals 6 *"unless its controller has you draw 2"*, and you choose the draw. `VEN-015 Decree
of Rage` hits Calm units only. `SFD-136 Hard Bargain` and `UNL-131 Abandon` counter spells, and you cast
none. `UNL-142 Heedless Resurrection` has nothing in their trash to bring back at E2 or less.
`OGN-170 Morbid Return`, `OGN-179 Acceptable Losses`, `OGN-183 Stacked Deck`, `SFD-011 Angle Shot` and
`SFD-135 Factory Recall` do not touch the combat.

**The cheapest card answers cost one rune and one Power:** Hextech Ray, Monster Harpoon and
Existential Dread. Not counted: units that come in at Reaction speed. Five cost E2 or less (`OGN-197
Teemo, Scout`, `OGN-199 Tideturner`, `UNL-002 Inferna`, `UNL-003 Mischievous Marai`, `UNL-141
Evelynn, Entrancing`), and four of them must be hidden at that battlefield a turn ahead.

**What a Brambleback costs them.** Against the nine, the table in §2 is the whole answer: a garrison of
4 Might takes two points, 8 takes four, 12 takes six. The Bramblebacks are the cheapest bodies in the
attack, so the defender's damage goes to them first.

## 6. Verdict

**Right about the formula; the nine needs a board the opponent does not have to give.** Walked going
first against the Draven deck, one Tryndamere and two Bramblebacks attacked on T5, the earliest turn
that board can attack. A garrison of three 2-Might bodies killed a Brambleback before the Conquer, so
Tryndamere fired twice: **3 points, 6 to 4**, and **6 to 5** after their T5. The same deal with a
plain 4-Might body in the Brambleback slots ends **5 to 5**: the Bramblebacks were worth one point
here. The entry's nine first attacks on T7, with or without Relentless Storm's rune, and it scores nine
only into a garrison of 1 to 3 total Might. Their free answer is to put 8 Might where Tryndamere has to
attack: he dies in the combat, and the game is **4 to 5** after their T5. Holding two runes, they have
12 cards that do it, three of them for one rune and one Power: Hextech Ray, Monster Harpoon and
Existential Dread.

## 7. Not verified

**Your runes.** The walk assumes twelve Fury runes (103.3.a.1 allows it), so every Power in it can be
paid: **0 failures**. A list with Body runes was not dealt.

**Their runes.** Their walk assumes six Fury and six Chaos, as in the En Garde play. The Cemetery
Attendant on their T4 needs a Chaos among their first nine runes: with six Fury it cannot fail, **0 of
220**. On your T5 they have eight runes on the board, their first nine less the recycled Chaos. Their
first nine hold at least three of each domain, so at least two Chaos and three Fury remain: every
breaker in §5, including the two that need two Chaos Power, can be paid, **0 of 220**.

**The deal.** The walk fixes both hands. The main line's own deal, a Brambleback by T3, a Tryndamere by
T4 and a second Brambleback by T5, is 5.45% (§4). Their deciding to attack A on their T4 and to put the
late bodies at B are the walk's choices of opponent; §4 and §5 walk the two other splits.

**The count.** The table in §2 assumes the garrison's summed Might is also its lethal total (no damage
marked, no [Tank], no Shield) and that nothing else changes Might in the combat. Not walked: going
second, the mulligan, 2v2, the turns after their T5, Tryndamere played to A as a wall, and the second
Tryndamere.

## Leads

- The fourth notable, *"STILL A CANDIDATE because of R28"*: the entry's status is `verified`, and its
  own notes say it was hand-walked once R28 was ruled A. That sentence is stale.
- The formula and step 4, *"1 + T x (1 + K) with T=2, K=3 = 9 points"*: it counts every Brambleback and
  every Tryndamere as present at the Conquer. A dead one is not (383.4.c.2.a, 365.1), and the defender
  picks the deaths (465.2.c, 465.2.c.3). The nine needs a garrison of 1 to 3 summed Might: 4 to 7 is
  seven points, 8 to 11 is five, 12 to 15 is three, and 16 or more is the Conquer alone.
- Step 2, *"any garrison under 23 total Might leaves the 5 or more excess"*: that is the excess
  condition, and it is right. The survival condition is much tighter, and the notes carry it only as
  *"Fragility: all five bodies must survive the combat to conquer"*. They do not have to survive to
  conquer; each one that dies costs points.
- The class: the five bodies first attack together on T7 going first: 26 Energy and 7 Power before any
  Accelerate, with every attacker ready in base, and `OGN-249 Relentless Storm`'s extra rune does not move that turn. The T5
  board this walk could build, one Tryndamere and two Bramblebacks, is worth four at most.
- The 316.8.b.1.a notable (the bloodless Conquer, Ride the Wind, Zenith Blade, Relentless Pursuit and
  the Defy remedy) is about a non-combat showdown, which this line never uses: step 1 says an
  uncontested walk-in fires nothing. The answers that matter here are in the combat. The cheapest is
  free: 8 Might at the battlefield Tryndamere has to attack.
- No answer is named. With two runes open: Hextech Ray, Monster Harpoon or Existential Dread for one
  rune and one Power, and nine more at two.
- The same arithmetic appears in
  [one body carries four points](2026-09-14-one-body-carries-four-points.md), where Tryndamere and two
  Bramblebacks take any garrison of eleven or less for four. Against 4 to 7 Might a Brambleback dies
  first, and it is three; against 8 to 11 Tryndamere dies, and it is one.
