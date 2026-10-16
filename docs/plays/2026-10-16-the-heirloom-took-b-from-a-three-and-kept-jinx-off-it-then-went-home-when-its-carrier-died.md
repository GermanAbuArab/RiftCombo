# Play — The Heirloom took B from a three and kept Jinx off it, then went home when its carrier died

Issue #380 (a slice of #200), 2026-10-16. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `shepherds-heirloom-xp-equip`**, the Order ENGINE in which `UNL-158 Shepherd's Heirloom`
(E2, M+2) pays its own [Equip] with the XP its play trigger gives, and `UNL-162 Enthralling Protector`'s
[Hunt] is the XP faucet behind it. The entry is right about the arithmetic: the first attach costs no
Energy, no Power and, net, no XP. In a game, one Heirloom on a 2-Might Protector made a 4. On your T2
the 4 took their battlefield from `SFD-006 Eager Drakehound`, a 3, and cost them the Hold. On their T3
it kept `OGN-030 Jinx, Demolitionist`'s Assault off that battlefield. It did not stop their T4. They
could bring 13 Might, stopping a Conquer on both battlefields would need 26, and the most you could
stand was 24. They
took the Protector's battlefield, and the Heirloom went back to your base for a 1-XP re-equip. **5 to 3** after their T4. The cheapest answer is one rune
on the turn they first face it: nine cards in their colours. Five of them need no Power, among them
`OGN-004 Cleave`, a one-Energy Assault 3 that the Heirloom cannot answer inside the combat.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-16 at `f5a0427`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 23 of them with no play**, as
the issue measured. The two picks are unchanged: this entry is rank 79, the second in the list. The
other entry of this slice is rank 78, `annie-fiery-piercing-light-bonus-per-instance`, played in
[Annie's +1 kills the 5-Might body that 2 + 2 cannot, and that is a battlefield](2026-10-16-annies-plus-one-kills-the-five-might-body-that-two-plus-two-cannot-and-that-is-a-battlefield.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-203 Keeper of the Hammer` (Body/Order, tag Poppy) |
| **Chosen Champion** | `UNL-178 Poppy, Defender of the Meek` (Order, E6 + 1 Power, M5) |
| **The pair** | `UNL-158 Shepherd's Heirloom` (Order gear, E2, M+2), `UNL-162 Enthralling Protector` (Order, E2, M2) |
| **The bodies** | `UNL-092 Demacian Diplomat` (Body, E2, M2), `UNL-102 Crowd Favorite` (Body, E3, M3) |

The entry admits any legend with Order in its pair. Keeper of the Hammer is the one for this walk,
because it is the Order legend built on XP, the deck that runs a [Hunt] faucet anyway: *"When you hold,
gain 1 XP. Spend 3 XP, :rb_exhaust:: Draw 1."* Its Chosen Champion spends XP too: *"You may spend 3 XP
as an additional cost to play me. If you do, I cost :rb_energy_3: less. [Ambush] (You may play me as a
[Reaction] to a battlefield where you have units.) [Tank] (I must be assigned combat damage first.)"*
It starts in the Champion Zone, 103.2.a.1: *"This will be placed in the Champion Zone at the start of
the game."*

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* None is a Signature card (`signature` in `data/cards.json`), and none is in
`data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Shepherd's Heirloom: *"When you play this, gain 1 XP. [Equip] — Spend 1 XP (Pay the cost: Attach
  this to a unit you control.)"*
- Enthralling Protector: *"[Hunt] (When I conquer or hold, gain 1 XP.) Spend 2 XP: [Buff] me. (Give me
  a +1 :rb_might: buff if I don't have one.)"*
- Demacian Diplomat: *"When you play me, gain 1 XP."*
- Crowd Favorite: *"[Hunt] (When I conquer or hold, gain 1 XP.) Spend 2 XP: [Buff] me."*

## 2. What the Heirloom does, and when

**The first attach is free and XP-neutral.** 730.1: *"To Gain XP, increase the value of XP marked on
the Player gaining it."* 730.2: *"To Spend XP, reduce the value of XP marked on the Player spending
it."* The play trigger gives 1, and the [Equip] spends 1. 818.1.c.2: *"Equip is functionally short for
“[Cost]: Attach this gear to a unit you control.”"* The carrier gets the +2, 434.1.d: *"The Top-Most
Card has its Might modulated by the Might Bonus of all cards Attached to it."* No location clause
limits the target, and 434.4 moves the gear to the carrier: *"When a card Attaches to a card, its
location becomes the same as the new Top-Most Card."* So a gear played in base can go onto a unit at a
battlefield.

**The +2 is fixed before any combat.** [Equip] is an activated ability, and 381 reads: *"All Activated
Abilities can only be activated on the Controlling Player's Turn and during an Open State."* A combat
is a Showdown State, 308.1: *"If a Showdown or Combat is in progress, the turn is in a Showdown
State."* 308.1.a: *"Only cards and abilities with the Action or Reaction keywords can be played or
activated in a Showdown State."* The Heirloom's [Equip] has neither keyword. So you can never attach it
during a combat, and never during the opponent's turn. Whatever +2 a unit carries when combat starts is
all it gets, and every [Action] the opponent plays in that combat sees it.

**An attached Heirloom cannot move by its own [Equip].** 718.2: *"While in this state, the card’s
printed Rules Text is Inactive."* The [Equip] is printed Rules Text, and 721.2: *"Inactive Abilities
do not trigger, do not apply, and cannot be activated."* Once it is on a unit, it stays there until it
detaches.

**It outlives its carrier.** 719.5: *"When a Top-Most Card changes zones from a board zone to a
non-board zone, all Attached cards Detach from it, remaining in their current zones."* 435.4.b puts it
where the carrier was: *"If the Attached card was Detached because the Top-Most Card changed zones from
a board zone to a non-board zone, then the location that the Attached Card will Detach to is the last
location the Top-Most Card was at before changing from a board zone to a non-board zone."* Then 457.1:
*"When an un-attached non-Unit Gear is created or played at a battlefield, or is at a battlefield for
any other reason, it is Recalled to its controller's base during the next Cleanup."* Its example is
this exact case: *"An Equipment is attached to a unit at a battlefield, so the Equipment is present at
that battlefield. If the unit dies, the Equipment will be recalled during the next cleanup."* Back in
base and unattached, its [Equip] works again. This re-equip is the first one that costs XP net,
because there is no play trigger to refund it. It is also the only thing the [Hunt] faucet ever pays
for on the Heirloom's behalf.

**The faucet.** 823.1.b: *"Hunt is both a Conquer and a Hold effect."* 823.1.c.1: *"Hunt is
functionally short for: “When I Conquer or Hold, my controller gains X XP.”"* A Hold is per
battlefield, 469.2: *"Hold: A player maintains Control of a Battlefield they did not yet Score this turn
during their Beginning Phase."* And 470: *"A player may only Score, from either method, once per
Battlefield per turn."* So Keeper of the Hammer's *"When you hold"* fires once for each battlefield you
hold. The walk's XP works even if it fired only once a turn.

## 3. Their deck: Fury/Chaos, the Draven curve

`SFD-185 Glorious Executioner` (Fury/Chaos): *"When you win a combat, draw 1. (You win if only your
units remain after combat.)"* Its Chosen Champion is `SFD-148 Draven, Audacious` (Chaos, E6 + 1 Power,
M6), which the walk never reaches. The curve: `SFD-006 Eager Drakehound` (Fury, E3 + 1 Power, M3): *"I
enter ready."* `OGN-010 Legion Rearguard` (Fury, E2, M2). `OGN-175 Shipyard Skulker` (Chaos, E3, M3, no
text). `OGN-030 Jinx, Demolitionist` (Fury, E3 + 1 Power, M4): *"[Accelerate] (You may pay
:rb_energy_1::rb_rune_fury: as an additional cost to have me enter ready.) [Assault 2] (+2 :rb_might:
while I'm an attacker.) When you play me, discard 2."* Going second they channel an extra rune on T1,
485.7: *"The player going second channels an extra Rune from their Rune Deck during their first Channel
Phase of the game."* §5 names their answers.

## 4. The turns, going first

Body/Order against Fury/Chaos. Your battlefield is A, `OGN-278 Bandle Tree` (*"You may hide an
additional card here."*); theirs is B, `OGN-293 The Grand Plaza` (*"When you hold here, if you have 7+
units here, you win the game."*). Nothing in the walk uses either. Your opening four are Enthralling
Protector, Shepherd's Heirloom, Demacian Diplomat and `SFD-159 Trusty Ramhound`. Your draws are Crowd
Favorite (T1), `UNL-156 Loyal Poro` (T2), `UNL-097 Kinkou Initiate` (T3) and a second Demacian
Diplomat (T4). Their opening four are Eager Drakehound, Legion Rearguard, Shipyard Skulker and Jinx,
Demolitionist. Their draws are a second Eager Drakehound (T1), `SFD-126 Loyal Pup` (T2), `OGN-171
Mystic Poro` (T3) and `OGN-016 Dangerous Duo` (T4).

```
turn    runes   your turn                                                 points
T1      2       Enthralling Protector (E2) to base.                       0
their T1  3     Eager Drakehound (E3 + 1 Fury Power), ready, walks to
                B: Conquer. Three runes, one recycled.
T2      4       Shepherd's Heirloom (E2): +1 XP. Equip the Protector in   1
                base (1 XP): M4. It walks to B: 4 against the
                Drakehound's 3, which dies. Conquer: +1; Hunt: +1 XP.
                Demacian Diplomat (E2) to base: +1 XP. None left. XP 2.
their T2  4     Nothing to Hold. Second Drakehound (E3 + 1 Fury Power),
                ready, walks to A: Conquer. Four runes, one recycled.
T3      6       Start: Hold B: +1. Keeper +1 XP, Hunt +1 XP: 4.           3
                The Diplomat walks to A. Poppy (3 XP, E3 + 1 Order
                Power) by Ambush to A: 2 + 5 against 3. The Drakehound
                dies. Conquer: +1. XP 1. Crowd Favorite (E3) to B. Six
                runes, one recycled; none left.
their T3  5     Nothing to Hold. Shipyard Skulker (E3), Legion Rearguard
                (E2) to base. Five runes, none recycled.
T4      7       Start: Hold A and B: +2. Keeper +2 XP, two Hunts +2: 5.   5
                Keeper (3 XP): draw. Loyal Poro (E3), Ramhound (E2) and
                the second Diplomat (E2, +1 XP) to A. None left. XP 3.
their T4  7     Nothing to Hold. Jinx (E3 + 1 Fury Power, Accelerate E1
                + 1 Fury Power), ready, discards 2. Jinx, the Skulker
                and the Rearguard attack B: 11 against 7. Conquer: +1,
                draw 1. The Heirloom is recalled to your base. Loyal Pup
                (E3) to B. Seven runes, two recycled.
```

Their points: 1 after their T1, 2 after their T2, 2 after their T3, 3 after their T4. After your T4 it
is **5 to 2**; after their T4, **5 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after the Protector; 5, then 3 after the Heirloom and
the Diplomat; 4 after the T3 draw, 3 after Crowd Favorite (Ramhound, Loyal Poro, Kinkou Initiate). Poppy
comes from the Champion Zone, not the hand, 419.1.a: *"By default, a player can only Play cards from
their hand or their Chosen Champion zone."* On T4, 4 after the draw, 5 after Keeper's draw (`OGN-210
Daring Poro`), 2 after the three plays (Kinkou Initiate, Daring Poro). Theirs: 5 after the T1 draw, 4
after the Drakehound; 5, then 4 on T2; 5, then 3 on T3 (Jinx, Loyal Pup, Mystic Poro); 4 after the T4
draw, 1 after Jinx and its two discards (Mystic Poro, Dangerous Duo), 0 after Loyal Pup, 1 after the
legend's draw.

Your XP, which is public, 729.2: *"The amount of XP a Player has is Public Information."* 0, then 2
after T2 (+1 Heirloom, −1 [Equip], +1 Hunt, +1 Diplomat). 4 at the start of T3, 1 after Poppy. 5 at the
start of T4 (two Keeper Holds, the Protector's Hunt and Crowd Favorite's Hunt), 2 after Keeper's draw,
3 after the second Diplomat.

**Your T2: the 4 that a 2 is not.** The Protector entered on T1 exhausted, 143.4: *"Units enter the
Board exhausted."* It readied in your Awakening Phase, 415.3.a: *"A player Readies all non-spell Game
Objects they Control during the Awakening Phase on their turn."* The Heirloom goes on it in base,
before the move, because 381 forbids the [Equip] once combat starts (§2). Then the walk, 144.4.a:
*"Units may move from their Base to a Battlefield."* The Drakehound defends as a 3. 465.2.c: *"Starting with the Attacker, each
player assigns an amount of damage equal to their summed Might among the other's Units."* Your 4 is
lethal on it and its 3 is not lethal on a 4, 143.2.a: *"If a Unit ever has nonzero damage marked on it
equalling or exceeding its Might, it is Killed."* B is yours, 469.1: *"Conquer: A player gains Control
of a Battlefield they did not yet Score this turn."* The Hunt fires on the Conquer. Their legend draws
nothing; they did not win.

Without the Heirloom the Protector is a 2 and cannot walk into a 3. It takes the empty A instead, for
the same point and the same Hunt. Then the Drakehound Holds B at the start of their T2, 315.2.b.2:
*"1. The Turn Player Holds all Battlefields they Control."* So the Heirloom moved one point, their T2
Hold, and killed a card. The Diplomat goes to base, not B: only a unit in base can walk to A on T3, and
a unit at B cannot, 144.4.b: *"Units may move from a Battlefield to their Base."*

**Their T2: they go round it.** The second Drakehound enters ready. Into B it is 3 against 4 and dies.
A is empty, so it takes A instead, with no combat, 316.8.b.1: *"Showdowns that occur as a result of a
player moving to an empty Battlefield are a stand-alone Phase and do not create a Combat."* Their four
runes: three for the E3, one of those recycled for the Fury Power, 164.2.b: *"Recycle this: [Reaction]
— Add [C]."* One Energy is left, and nothing in their hand costs one.

**Your T3: A comes back by Poppy, not by the Heirloom.** The only Heirloom is on the Protector at B, and
§2 says it cannot move while it is attached. The Diplomat is a 2 and the Drakehound a 3. So the
Diplomat walks to A, and Poppy comes in during that combat. Ambush lets her be played there, 822.1.b:
*"I have [Reaction] as long as I’m being played to a battlefield where you control Units."* She joins
as an attacker, 464.2.c.3.a: *"If a Unit controlled by the Attacker or Defender becomes present at this
Battlefield after this moment, it will gain the Attacker or Defender designation during the Cleanup
phase following the action that caused it to become present, as appropriate for its controller."*
Her additional cost spends 3 of your 4 XP, and she costs E3 plus an Order Power. Their 3 must go on her
first ([Tank]) and is not lethal on a 5. Your 7 kill the Drakehound, and you Conquer A. Crowd Favorite
goes to B, which you control, 355.2.a: *"By default, Valid locations include the controller’s Base or a
Battlefield the controller controls."* That leaves A at 2 + 5 = 7 and B at 4 + 3 = 7.

**Their T3: the Heirloom keeps Jinx off B.** Their five runes buy Jinx with Accelerate (E4 and two
Fury Power), which enters ready and attacks as a 6. Into B, their 6 kill the Protector (4) and put 2
on Crowd Favorite (3), which lives, and your 7 kill Jinx. Into A, their 6 go first on Poppy ([Tank], 5)
and 1 on the Diplomat, which lives, and your 7 kill Jinx. Either way they lose Jinx for one of yours.
So they develop instead, and Skulker and Rearguard enter exhausted (143.4). Take the 2 off the
Protector and B is 2 + 3 = 5. Their 6 kill both, your 5 do not kill a 6, they Conquer B and draw. That
is a point for them on T3 and your Hold of B gone on T4. So the Heirloom moved a second point here, and
a third by keeping your T4 Hold.

**Your T4: one battlefield has to go, and B is the cheap one.** Their ready attackers on T4 are the
Skulker (3) and the Rearguard (2), plus Jinx if they Accelerate her (6). That is 11, or 13 if they
spend their last three runes on Dangerous Duo: *"[Legion] — When you play me, give a unit +2 :rb_might:
this turn."* They fail to Conquer a battlefield in two ways. Either your units there kill every
attacker, or one of yours survives, because then the attackers are recalled, 466.1.a.2: *"Insert “3d.
Recall Attackers present at the Battlefield if Defenders are still present.”"* Against 13 the first
needs 13 Might there (8 + 3 + 2 lethal), and then everything dies and nobody holds it. The second needs
14, more than their 13 damage can kill. Poppy's [Tank] only orders where their damage goes; it does
not change either total. So stopping both Conquests takes at least 13 on each, 26 in all. You have 14
standing.
Seven runes buy at most 8 more (Ramhound, Loyal Poro and a Diplomat). Two buffs from 4 XP add 2 more.
That is 24. So one battlefield goes whatever you do. B holds the Protector and Crowd Favorite, five
Energy of bodies, and the Heirloom, which survives the loss (§2). A holds Poppy. So everything goes to
A: 2 + 5 + 3 + 3 + 2 = 15 (Ramhound is a 3 there: *"While you have another unit here, I have +1
:rb_might:."*). No XP goes on buffs for B. Keeper's draw spends 3, and the second Diplomat gives 1
back.

**Their T4: B falls, and the Heirloom goes home.** Jinx is ready, and they discard Mystic Poro and
Dangerous Duo to her, keeping Loyal Pup. Jinx (6), the Skulker (3) and the Rearguard (2) attack B, 11
against 7. Their 11 kill both of yours. Your 7 kill Jinx, and 1 marks the Skulker, which lives. They
Conquer B and draw. Duo was not needed. The Protector goes to the trash, the Heirloom detaches at B
(719.5, 435.4.b), and the next Cleanup recalls it to your base (457.1). Loyal Pup goes to B. At the
start of your T5 you have the Heirloom in base and 3 XP. The faucet pays its first bill then: 1 XP puts
the +2 back on any unit you control.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Going first you
have seen **5** cards by T1 (four opening, one draw) and **6** by T2. With three copies of each
(103.2.b), an Enthralling Protector among the 5 is **34.52%**. A Shepherd's Heirloom among the 6 is
**40.30%**. Both, the Protector by T1 and an Heirloom by T2, is **12.41%**. A second Heirloom among
the **7** seen by T3 is **7.74%**, and all three is **0.38%**, which is why the walk uses one.

## 5. Breaks to

**What the engine did in the walk, and the predicate.** On your T2 the Heirloom turned a 2 into a 4.
The 4 took B from a 3, and that cost them their T2 Hold and a card. The first turn they face the 4 is
their T2: four runes and the second Drakehound in hand, and the Drakehound takes three of them. The
predicate is: with the one rune left, does a single card get them B on their T2? Without the Heirloom
they need no card; the Drakehound's 3 beats the 2 by itself.

**The scope.** A Fury/Chaos deck plays only Fury, Chaos and Fury/Chaos cards (103.1.b.1), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* Glorious Executioner's tag is
Draven. The predicate is: a card in those domains in `data/cards.json` (not a legend, battlefield, rune
or token), not banned in constructed, and not a Signature card with another champion's tag. Folded by
name, that is **247** cards. Five are banned (`OGN-168 Fight or Flight`, `OGN-177 Stealthy Pursuer`,
`OGN-182 Scrapheap`, `SFD-020 Draven, Vanquisher`, `SFD-122 Called Shot`). Four Signature cards carry
another tag (`OGN-252 Super Mega Death Rocket!` Jinx, `OGS-018 Tibbers` Annie, `UNL-186 Death from
Below` Pyke, `VEN-144 Death Mark` Zed). The Draven Signature, `SFD-186 Spinning Axe`, is among the 247.
By the runes they cost (the larger of the Energy and the Power, the Power recycled off the same runes),
**20** cost one rune, **60** two, **58** three, and **109** four or more, at printed cost.

**One rune, their T2: nine of the twenty break it.** Each is played around the Drakehound's attack on
B, 3 against the Protector's 4:

- **Bigger than 4 while attacking.** [Assault] counts only on an attacker, so these work on their turn
  and never on yours. `OGN-004 Cleave` (E1): *"Give a unit [Assault 3] this turn."*, a 6. `SFD-003
  Blood Rush` (E1, [Repeat] unpaid) and `UNL-010 Vault Breaker` (E1 + 1 Fury Power): [Assault 2], a 5.
  `SFD-009 Serrated Dirk` (E1 gear, [Equip] one Fury Power): *"[Assault 2]"*, a 5. The 4 does not kill
  any of them, and each kills the 4.
- **The +2 taken away.** `SFD-135 Factory Recall` (E1, [Action]): *"Return a gear to its owner's
  hand."* `OGN-179 Acceptable Losses` (E1, [Action]): *"Each player kills one of their gear."* You have
  one gear, and they have none, so it costs them nothing else. `SFD-005 Detonate` (E1 + 1 Fury Power):
  *"Kill a gear. Its controller draws 2."* `UNL-138 The List` (E1 gear): *"As you play this, name a
  tag. … :rb_exhaust:: Give a unit with the named tag -2 :rb_might: this turn."* Name Fae. Gear can
  act at once, 149.1: *"Gear enter play Ready."* Each leaves a 2 against a 3. Factory Recall and
  Acceptable Losses are [Action]s, so they work inside the combat, where §2 says your [Equip] cannot
  answer.
- **The body taken away.** `VEN-107 Decree of Discord` (E1 + 1 Chaos Power): *"Return any number of
  enemy Order (:rb_rune_order:) units with total Might 5 or less to their owners' hands."* The Protector
  is Order and a 4. B is then empty and you lose it in the Cleanup, 323.6: *"4. Players lose control of
  any controlled Battlefields without their Units occupying them if the turn is in an Open State and
  there is no Showdown or Combat ongoing there."* The Drakehound walks in for a Conquer (316.8.b.1).

Four more trade instead: both units die, nobody holds B, and your T3 Hold is gone. `OGN-009 Hextech Ray`
(3) and `UNL-014 Monster Harpoon` (2, since they control no facedown card) leave the 4 with too little
left for the Drakehound's 3. `SFD-124 Doran's Ring` and `SFD-134 Cull` (M+1) make the Drakehound a 4,
which the 4 kills. The other seven do nothing here. `OGN-040 Seal of Rage` and `OGN-204 Seal of
Discord` only add Power. `OGN-183 Stacked Deck` and `UNL-136 Scryer's Bloom` touch no unit. `UNL-134
Existential Dread` stuns an *attacking* enemy unit, and the Protector is defending. `VEN-015 Decree of
Rage` reaches only a Calm unit. `OGN-169 Gust` (*"Return a unit at a battlefield with 3 :rb_might: or
less to its owner's hand."*) misses the 4. Gust is the clearest case of what the +2 buys: it bounces
the bare 2.

**The cheapest is one rune, and five of the nine use no Power:** Cleave, Blood Rush, Factory Recall,
Acceptable Losses and The List. They differ in what they cost you. Cleave and Blood Rush are one-shot,
and the Heirloom stays. Factory Recall sends it to your hand; replaying it costs E2 and gives the 1 XP
back. Acceptable Losses kills it while it is your only gear. The List is permanent, and naming Demacia
would reach Poppy, both Diplomats and the Ramhound too.

*A card hidden at B on their T1.* This is the only window on your T2, because on their T1 the
Drakehound used all three runes. They control B after the Conquer, which is what hiding needs, 811.1.b:
*"While this card is in your hand or in your Champion Zone on your turn during an Open State, you may
pay [A] to hide this facedown at a battlefield you control that doesn't already have a facedown card
hidden there for as long as you control that battlefield. Beginning on the next turn, this gains
[Reaction] and you may play this, ignoring its base cost."* The [A] is Power, paid by recycling a rune
(164.2.b). That costs them a rune for good, but their T2 Drakehound still fits in the three that are
left. Played from facedown it has Reaction, 811.6: *"A card that is Hidden gains Reaction while
facedown or played from facedown, and may be played any time a card with Reaction may be played as a
result."* A unit must go to B, 811.1.d.1: *"A hidden permanent must be played to that battlefield."*
There it defends (464.2.c.3.a). Fifteen of the 247 have [Hidden]. `SFD-138 Windsinger` prints it
without brackets; `OGN-018 Noxus Saboteur` and `OGN-167 Ember Monk` only name it. **Ten break your
T2:**

- Any unit of 2 Might or more that joins the Drakehound. Your 4 kills the 3 and can only mark the
  other: `OGN-197 Teemo, Scout` (a 4 that turn), `OGN-199 Tideturner`, `UNL-003 Mischievous Marai`
  (which also deals 2 to the Protector), `UNL-028 Pyke, Dockside Butcher`, `UNL-141 Evelynn,
  Entrancing` ([Backline], so the Drakehound takes your damage first), `UNL-145 Pyke, Returned` and
  `VEN-099 Tornado Warrior`.
- `SFD-017 Sudden Storm`: *"Deal 2 to a unit at a battlefield. If it's attacking, deal 4 to it
  instead."*
- `SFD-145 Switcheroo`: *"Swap the Might of two units at the same battlefield this turn."* A 3 against
  a 4.
- `SFD-139 Edge of Night` (M+2): *"When you play this from face down, attach it to a unit you control
  (here)."* A Drakehound of 5.

Three trade (everything dies, nobody holds B): Windsinger (a 1, and its bounce is gated at 3 Might),
`VEN-097 Spiderling` (a 1 alone) and `UNL-013 Lotus Trap` (doubling the Drakehound's 3 onto the
Protector). Two do nothing: `SFD-004 Bushwhack`, and `UNL-139 Bone Skewer`, which plays one of *your*
units for free.

**Answers to the Heirloom itself.** Killing the carrier does not answer it. The gear comes back to base
(457.1) and goes onto the next unit for 1 XP, as at the end of the walk. Of the 247, nine have text
that kills, banishes, returns, detaches or gives [Temporary] to a gear the opponent controls. One rune:
Acceptable Losses, Detonate and Factory Recall. Two: `VEN-003 Brittle Steel` (*"Kill a gear."*) and
`SFD-011 Angle Shot` (*"Choose a unit and an Equipment with the same controller. Attach that Equipment
to that unit or detach that Equipment from that unit. Draw 1."*), a [Reaction] that takes the +2 off
in the middle of your own attack, and the gear comes home in the next Cleanup (457.1). Three:
`VEN-102 Ravenbloom Prefect` (*"When an opponent plays a gear, you may banish me to banish it."*), the
one that meets it before it is ever attached. Four or more: `OGN-180 Fading Memories`, `OGN-022 Thermo
Beam` (*"Kill all gear."*) and `SFD-147 Downwell`.

## 6. Verdict

**The arithmetic is right, and it is a strong E2.** One Heirloom made a 2-Might faucet a 4. It beat
every 3-Might body their curve put in front of it. It cost them their T2 Hold, and it kept Jinx's
Assault off B on their T3. Counted turn by turn, each time against the same board with the 2 taken
off, that is three points: their T2 Hold, their T3 Conquer, and your T4 Hold of B. It did not stop their T4, because stopping a
Conquer on both battlefields against 13 attacking Might takes 26, and you could stand 24. When the carrier died, the
Heirloom went home. The faucet's XP had gone into Poppy's discount and Keeper's draw; the Heirloom had
asked it for nothing until then. **5 to 3** after their T4. The cheapest answer is one rune on their
T2: nine of their 247 cards, five with no Power. The cleanest is Cleave, because [Equip] has no
[Action] and can never answer inside a combat (381, 308.1.a).

## 7. Not verified

I did not deal the channel order. The walk assumes six Body and six Order runes for you, Keeper of the
Hammer's two domains, in the twelve of Tournament Rules 402.1. Poppy's Order Power on T3 needs an Order
among the six runes channelled by then: it fails in **1 of 924 deals, 0.11%**. Nothing else of yours
needs Power.

Their walk assumes six Fury and six Chaos. The T1 Drakehound's Fury Power needs a Fury among three: it
fails in **84 of 924 deals, 9.09%**. The T2 Drakehound needs a second Fury among five, since one was
recycled on T1: **112 of 924, 12.12%**. Either fails in **147 of 924, 15.91%**. Jinx on T4 needs two
more, so four Fury among the nine channelled by then: **84 of 924, 9.09%**. Any of the three fails in
**193 of 924, 20.89%**. In the one-rune window of §5: Vault Breaker, Detonate and Serrated Dirk's [Equip]
need a third Fury among five, and fail together with the Drakehounds' in **462 of 924, 50.00%**.
Decree of Discord needs a Chaos beside the two Fury: **154 of 924, 16.67%**. Cleave, Blood Rush,
Factory Recall, Acceptable Losses and The List need no Power. Hiding takes any rune.

**How likely an answer is.** Out of their own **39**, by their T2 they have seen **6** cards: four
opening and a draw on each of their two turns. One of the nine, run three times, is among them in
**40.30%**. Two of them (six cards), **66.05%**; three (nine cards), **81.80%**. These count only the
cards named, not how many of them a deck runs.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2, the re-equip on your T5 and what it lands on, and a second or third Heirloom (§4 prices
how rarely they come together). The probabilities count only the cards named.

## Leads

- The notable *"in a deck with no [Level] clauses the XP has no other use and the attach is genuinely
  free"*. Swept 2026-10-16 over `data/cards.json`, folded by name: eleven cards print *"spend N XP"*
  outside a [Level] clause. Besides the Heirloom, nine can share a deck with it. The Body/Chaos legend
  `UNL-201 Voidreaver` is the one that cannot. The nine include the entry's own Enthralling Protector
  (*"Spend 2 XP: [Buff] me."*), Keeper of the Hammer (3 XP for a card) and Poppy, Defender of the Meek
  (3 XP for E3). The first attach is still XP-neutral. What is not free is every attach after it.
- `netPerIteration`'s *"with the XP the card spends supplied by the card itself"* is true once. When
  the carrier dies, the Heirloom detaches (719.5) and comes home (457.1, whose example is this case).
  Re-attaching costs 1 XP with no play trigger. That is the only place the [Hunt] faucet ever pays for
  the Heirloom. In the walk the faucet's XP went to Poppy and Keeper's draw first.
- The entry never says when the [Equip] can be paid. 381 with 308.1.a means never in a showdown and
  never on the opponent's turn. So the +2 is set before combat. A one-Energy [Action] in their combat,
  `SFD-135 Factory Recall` or `OGN-004 Cleave`, cannot be met by moving or re-attaching it. An attached
  Heirloom's own [Equip] is Inactive anyway (718.2, 721.2).
- No answer is named. Against the 4-Might carrier on the opponent's first turn facing it, nine one-rune
  cards in Fury/Chaos take the battlefield back (§5). Of 247 cards in that identity, nine remove or
  detach the gear itself, three of them at one rune.
