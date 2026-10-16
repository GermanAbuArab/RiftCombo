# Play — Annie's +1 kills the 5-Might body that 2 + 2 cannot, and that is a battlefield

Issue #380 (a slice of #200), 2026-10-16. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `annie-fiery-piercing-light-bonus-per-instance`**, the Fury ENGINE in which `OGS-001 Annie,
Fiery` raises every Deal action of your spells by 1, and `SFD-023 Piercing Light` with its [Repeat]
paid performs four of them: twelve damage for 4 Energy and 2 Fury Power. The entry is right about the
rules. 715.2 pays the Bonus Damage per Deal action, and the four Deals of 3 are real. Walked as a game,
going first, against a Body/Order Garen deck, the line did its job on T4. It killed their Chosen
Champion `OGS-013 Garen, Commander` and the two 3-drops his aura had made 4s, and your Shipyard Skulker
took the battlefield they had held for two turns. That is **4 to 2** after your T4 and **4 to 3** after
theirs. The same spell without Annie kills two 4s and leaves Garen standing. Their better T3 is
`OGS-016 Vanguard Attendant` into your battlefield instead of Garen. Then the spell kills the Attendant
(5 Might, 3 + 3) and two 3-drops, and you take both battlefields: **4 to 3** after your T4.
Without Annie the Attendant lives. Casting the spell on T3, before Annie, takes their battlefield a turn
earlier, but the Attendant takes yours back: **4 to 3** after their T4 again, with their Attendant
still holding your battlefield and Garen still in their Champion Zone. The entry's order is not slower;
it kills more. The cheapest answer costs them one ready rune and no Power: `OGN-133 Flurry of Blades`,
in the Skulker's combat, and B ends empty instead of yours. For one Body Power more, `OGN-145
Unyielding Spirit` prevents all twelve.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-16 at `f5a0427`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 23 of them with no play**,
as the issue measured. The two picks are unchanged: this entry is rank 78, the first in the list. The
other entry of this slice is rank 79, `shepherds-heirloom-xp-equip`, played in
[The Heirloom took B from a three and kept Jinx off it, then went home when its carrier died](2026-10-16-the-heirloom-took-b-from-a-three-and-kept-jinx-off-it-then-went-home-when-its-carrier-died.md). The rule that both executions are chosen when you cast
the spell is walked on Rocket Barrage in
[both executions are chosen when you cast it](2026-10-05-both-executions-are-chosen-at-casting.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGS-017 Dark Child - Starter` (Fury/Chaos, tag Annie) |
| **Chosen Champion** | `OGS-001 Annie, Fiery` (Fury, E5 + 1 Fury Power, M4) |
| **The spell** | `SFD-023 Piercing Light` (Fury, E2 + 1 Fury Power; [Repeat] 2 Energy + 1 Fury Power) |
| **The body** | `OGN-175 Shipyard Skulker` (Chaos, E3, M3), to walk into the battlefield the spell clears |

The entry admits any of sixteen legends with Fury in their pair. Dark Child is the one for this walk,
because it is the only one of the sixteen tagged Annie, so Annie, Fiery can be its Chosen Champion.
103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your Champion
Legend."* She is a unit,
tagged Annie and Noxus, and not a Signature card (`signature` in `data/cards.json`). So she starts in
the Champion Zone, 103.2.a.1: *"This will be placed in the Champion Zone at the start of the game."*
And she is playable from there on any turn, 419.1.a: *"By default, a player can only Play cards from
their hand or their Chosen Champion zone."* Under this legend Annie is never a draw. Dark Child's own
text plays no part in the line: *"At the end of your turn, ready up to 2 runes."*

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* None is a Signature card, and none is in `data/legality.src.json` or marked
[BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Annie, Fiery: *"Your spells and abilities deal 1 Bonus Damage. (Each instance of damage the spell
  deals is increased by 1.)"*
- Piercing Light: *"[Repeat] :rb_energy_2::rb_rune_fury: (You may pay the additional cost to repeat
  this spell's effect.) Deal 2 to a unit at a battlefield, then deal 2 to up to one other unit."*

## 2. What twelve damage is, and when it lands

**Four Deal actions, each raised by 1.** The bonus is paid per target, 715.2: *"If the Deal action has
multiple targets, the amount of Damage dealt to each target is increased by Bonus Damage individually
and separately."* Riot's example under that paragraph is this card's partner: *"A player plays
Singularity while they also control Annie, Fiery, a unit that says “Your spells and abilities deal 1
Bonus Damage.” Singularity deals 1 Bonus Damage to both of its targets, dealing 7 to each."* The
[Repeat] doubles the instructions, 820.1.b: *"Repeat is an optional cost that a player may pay to
execute the effect of their spells and abilities a second time."* So it is 3, 3, 3 and 3.

**All four targets are chosen when you cast it.** 820.2: *"When a spell or ability’s effect is
performed an additional time with Repeat, choices must be made at the usual time during the Make
Relevant Choices step of Playing a Card."* That step is 355.5: *"If a card requires you to
specifically choose one or more Game Objects, that choice is made now."* The second execution may
pick the same units or others, 820.2.a: *"Choices made for the additional execution do not have to be
the same as the choices made for the initial execution."* But it is picked before the first one
resolves, not after seeing it.

**Nothing dies until the spell has finished.** 321: *"Similarly, while Chain Items are Resolving, a
Cleanup cannot occur."* Death is a cleanup event, 142.4.a: *"Lethal Damage is the amount of marked
Damage that will cause a unit to die in a cleanup."* So one unit can take the first Deal of both
executions, 6 in all, and no Deal is wasted on a body the first execution already killed.

**A static from a unit that dies goes away, and the next cleanup reads the smaller Might.** 142.4.b:
*"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s Might."* Its
example is a Might that drops with damage already marked: *"When it resolves, the unit’s Might becomes
3, and it will have lethal damage marked on it."* A unit leaving the board starts another cleanup,
319.6: *"After any number of Game Objects enter or leave the Board"*. And 322: *"If an event occurs
during a Cleanup that qualifies for a Cleanup, another Cleanup will occur immediately after the first
completes, repeating until a Cleanup occurs with no new change in the game’s state."* §4 turns on this.

**The reach.** The first Deal of each execution needs *"a unit at a battlefield"*. The second has no
location clause, so it reaches a unit in a base. Without Annie the four Deals of 2 kill two bodies of
Might 4 (2 + 2 each) or four of Might 2. With her, two of Might 6 or four of Might 3. What Annie adds is
the third and fourth Might-3 body, or a 5- or 6-Might body killed by the first Deal of both
executions.

**It is cast only on your own turn.** Piercing Light has no [Action] and no [Reaction]. A player can
act at will in their own Main Phase, 312.2.a: *"When the turn is in a Neutral Open State during their
Main Phase."*

**The runes, going first.** You have 2, 4, 6 and 8 runes on T1 to T4. Power is paid by recycling a
rune, 164.2.b: *"Recycle this: [Reaction] — Add [C]."* A rune you exhausted for Energy can be recycled
for the Power, so Annie is five runes with one of them recycled, and Piercing Light with its [Repeat] is
four runes with two Fury ones recycled. Both in one turn is nine runes, so T5 is the first turn going
first. Before that it is Annie on T3 and the spell on T4, or the spell on T3 and Annie on T4.

## 3. Their deck: Body/Order Garen

`OGS-023 Might of Demacia - Starter` (Body/Order): *"When you conquer, if you have 4+ units at that
battlefield, draw 2."* It never fires in the walk. Its Chosen Champion is Garen, Commander (Order, E6 +
1 Order Power, M5): *"Other friendly units have +1 :rb_might: here."* Their bodies are `UNL-097
Kinkou Initiate` (Body, E3, M3; *"When you play me, draw 1 if your other units have total Might 5 or
more."*), `VEN-076 Repair Specialist` (Body, E3, M3; *"I have [Assault] equal to the number of gear you
control."*, and they have no gear), `SFD-159 Trusty Ramhound` (Order, E2, M2; *"While you have another
unit here, I have +1 :rb_might:."*) and `OGS-016 Vanguard Attendant` (Order, E6 + 1 Order Power, M5;
*"I enter ready."*). Going second, they channel an extra rune on T1, 485.7: *"The player going second
channels an extra Rune from their Rune Deck during their first Channel Phase of the game."* §5 names
their answers.

## 4. The turns, going first

Fury/Chaos against Body/Order. Your battlefield is A, `OGN-278 Bandle Tree` (*"You may hide an
additional card here."*); theirs is B, `SFD-221 Veiled Temple` (*"When you conquer here, you may ready
a friendly gear. If it's an Equipment, you may detach it."*). Nothing in the walk uses either. Your
opening four are `OGN-013 Pouty Poro`, two Shipyard Skulkers and Piercing Light. Your draws are
`OGN-185 Traveling Merchant` (T1), `OGN-171 Mystic Poro` (T2), `OGN-010 Legion Rearguard` (T3) and
`OGN-003 Chemtech Enforcer` (T4). Their opening four are Kinkou Initiate, Repair Specialist, Trusty
Ramhound and Vanguard Attendant. Their draws are `OGN-210 Daring Poro` (T1), `OGN-136 Pit Rookie` (T2),
`UNL-102 Crowd Favorite` (T3) and `OGN-216 Soaring Scout` (T4).

```
turn    runes   your turn                                                 points
T1      2       Pouty Poro (E2) to base. None left.                       0
their T1  3     Kinkou Initiate (E3) to base. None left.
T2      4       Poro walks to A, Conquer: +1. Shipyard Skulker (E3) to    1
                base. One left.
their T2  5     The Initiate walks to B, Conquer. Repair Specialist (E3)
                and Trusty Ramhound (E2) to B. None left.
T3      6       Hold A: +1. Annie, Fiery (E5 + 1 Fury Power) from the     2
                Champion Zone to base. Six runes, one recycled; one
                left.
their T3  7     Hold B. Garen, Commander (E6 + 1 Order Power) from the
                Champion Zone to B: the Initiate, the Specialist and
                the Ramhound are 4s. Seven runes, one recycled; one
                left.
T4      7       Hold A: +1. Piercing Light with its Repeat (E4 + 2 Fury   4
                Power): Garen, Initiate; Garen, Specialist; 3 each.
                Garen dies, then the two 3-drops. The Skulker walks to
                B: 3 against the Ramhound's 2, Conquer: +1. Shipyard
                Skulker (E3) to B. Seven runes, two recycled; none
                left.
their T4  8     Nothing to Hold. Vanguard Attendant (E6 + 1 Order Power)
                to base, ready; it walks to A: 5 against the Poro's 2,
                Conquer. Daring Poro (E2) to base. Eight runes, one
                recycled; none left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T4 it
is **4 to 2**; after their T4, **4 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro; 5, then 4 after the Skulker; 5 after
the T3 draw, still 5 after Annie, who comes from the Champion Zone; 6 after the T4 draw, 5 after
Piercing Light, 4 after the second Skulker (Traveling Merchant, Mystic Poro, Legion Rearguard,
Chemtech Enforcer). Theirs: 5 after the T1 draw, 4 after the Initiate; 5, then 3 after T2 (Vanguard
Attendant, Daring Poro, Pit Rookie); 4 after the T3 draw, still 4 after Garen; 5 after the T4 draw, 3
after the Attendant and the Poro (Pit Rookie, Crowd Favorite, Soaring Scout).

**Your T2.** The Poro takes A, which is empty, 316.8.b.1: *"Showdowns that occur as a result of a
player moving to an empty Battlefield are a stand-alone Phase and do not create a Combat."* The Skulker
goes to base, not A. From base it can walk to B on a later turn, 144.4.a: *"Units may move from their
Base to a Battlefield."* From A it could not. Moving from A takes it to base only, 144.4.b: *"Units may
move from a Battlefield to their Base."*

**Their T2: they build at B.** The Initiate takes B, which is empty. The Specialist and the Ramhound go
to B, which they now control, 355.2.a: *"By default, Valid locations include the controller’s Base or a
Battlefield the controller controls."* There the Ramhound is a 3, and B is 3 + 3 + 3 = 9 against your
Skulker's 3, so their Hold on T3 is safe. Played to base instead, the pair could walk into A on their
T3, 6 against your Poro's 2. But then your Skulker walks into the lone Initiate on your T3, 3 against
3, and both die, so they lose B. That is one point for them on their T3 either way. The walk takes B.

**Your T3: Annie, kept home.** Her text has no location clause, so she works from base. In base she is
also out of reach of the removal that says *"at a battlefield"*; §5 counts what reaches her there. Six
runes pay her: five exhausted, and a Fury one of them recycled for the Power. One rune is left, and
nothing in your hand costs one. The Skulker stays in base: walking it into 9 is a loss.

**Their T3: Garen makes their three bodies 4s.** They Hold B, 469.2: *"Hold: A player maintains
Control of a Battlefield they did not yet Score this turn during their Beginning Phase."* Garen goes to
B, which they control (355.2.a). B is now Garen 5, the Initiate 4, the Specialist 4 and the Ramhound 4
(2, +1 for company, +1 for Garen): 17. Their units at B cannot reach A, and Garen enters exhausted,
143.4: *"Units enter the Board exhausted."* One rune is left, and their cheapest card in hand costs
two.

**Your T4: the twelve damage.** Your runes are 5 + 2 channelled = 7, all ready, 315.1.b: *"1. The Turn
Player readies all Game Objects they control that are able to be readied."* You Hold A. Piercing Light
and its [Repeat] are four runes, two Fury ones recycled for the two Power. The four choices, all made at
casting (820.2): first execution, Garen at B and then the Initiate; second execution, Garen and then the
Specialist. Annie makes each Deal 3. When the spell finishes, Garen has 6 marked, and the Initiate and
the Specialist have 3 each.

The first cleanup kills Garen: 6 is lethal on 5 (142.4.b). The 3-drops are still 4s at that moment,
because Garen is still on the board while it reads them. His death starts another cleanup (319.6, 322).
In that one his *"here"* is gone, the Initiate and the Specialist are 3s with 3 marked, and both die.
The Ramhound is now alone at B, a 2 with no damage.

The Skulker, ready in base, walks into B. 465.2.c: *"Starting with the Attacker, each player assigns an
amount of damage equal to their summed Might among the other's Units."* Your 3 kill the Ramhound; its 2
do not kill the Skulker. Only your unit remains at B, so you establish control, and that is a Conquer,
466.5.d: *"Establishing Control results in a Conquer if that player has not yet scored this Battlefield
this turn."* The second
Skulker (E3) goes to B, now yours, with your last three runes.

**Their T4.** There is nothing to Hold. The Attendant enters ready and walks into A, where the Poro is
alone: 5 against 2. They take A. Into B it would face your two Skulkers, 6 Might.

**What Annie added.** Without her, the same four Deals are 2 each. Garen is a 5 and takes at most 4;
every other body there is a 4 while he lives. The best the spell does is 2 + 2 on two of the 4s. Garen
and a 4 stay at B, 9 Might against your 3, and they Hold B on their T4. Annie's +1 was the difference
between a battlefield and none, and it took their 6-Energy Champion with it.

**Their better T3: the Attendant into A.** Garen to B is not their best turn. Their seven runes pay
for Vanguard Attendant instead (E6 + 1 Order Power), which enters ready and walks into A, where the
Poro is alone: 5 against 2. They take A and Hold B: **3 after their T3**, one more than the walk. B is
the Initiate, the Specialist and the Ramhound, all 3s. On your T4 there is no A to Hold. Piercing
Light's four choices are the Initiate and then the Attendant at A, and the Specialist and then the
Attendant again. The Attendant takes 6 and dies; the two 3-drops take 3 and die. A is empty, and B is
the Ramhound alone, a 2. The Skulker walks into A, empty, for a Conquer. Annie, ready in base since T3,
walks into B: 4 against 2, a Conquer. The second Skulker (E3) goes to A. That is **4 to 3** after your
T4, and their board is empty, with Garen still in their Champion Zone. Nothing in their hand can score
on their T4 (Garen and every unit they hold enter exhausted), so it is still **4 to 3** after it.
Without Annie the Attendant takes 4 of 5 and lives. The best is then 2 + 2 on the Initiate and on the
Specialist, and the Skulker beats the lone Ramhound at B, while A stays theirs: **3 to 3**. Annie's +1
is again a battlefield, and again by killing a 5-Might body. The price is Annie standing at B on their
T4, in reach of every removal that says *"at a battlefield"*.

**Spell first, Annie second.** Cast on your T3 instead, before either 5-Might body exists, the spell is
four runes of the six, two Fury recycled. The Deals are 2 each: 2 + 2 on the Initiate and 2 + 2 on the
Specialist, and both die. The Ramhound is left alone, a 2, and the Skulker, ready in base since its T2
play, takes B: **3 to 1** after your T3. Your last two runes put `OGN-010 Legion Rearguard` (E2, M2) at
B, now yours (355.2.a). Their best T3 is the Attendant into A again: 5 against the Poro's 2, a Conquer,
**3 to 2**. Into B it meets the Skulker and the Rearguard, 5 against 5, and everything there dies for
no point. Garen to their base scores nothing. On your T4 you Hold B, and nothing of yours reaches A:
your units at B cannot move there (144.4.b), and Annie, who comes down now (six runes on the board,
eight channelled and two recycled), enters exhausted. **4 to 2** after your T4. On their T4 they Hold A
with the Attendant: **4 to 3**. So all three lines stand at 4 to 3 after their T4. What differs is the
board. Annie first, Garen or the Attendant is dead and their side is empty. Spell first, the Attendant
holds A, Garen is still to come, and Annie has not yet met a spell.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Annie is in every
game under Dark Child. Going first, you have seen **8** cards by T4 (four opening, one draw a turn from
T1). With three copies (103.2.b: *"Your Main Deck can include up to 3 copies of the same named
card."*), a Piercing Light among them is **50.82%**; by T3, with **7** seen, **45.73%**. Under any of
the other fifteen Fury legends Annie is a draw too: three copies among the 7 seen by T3 is **45.73%**.

## 5. Breaks to

**What the engine did, and the predicate.** On your T4 it killed Garen and two 3-drops at B, and the
Skulker took B. The predicate is: cast or played on your T4, or prepared before it, does it stop your
Conquer of B? It can do that two ways: by saving the bodies, or by winning the Skulker's combat.

**The scope.** A Body/Order deck plays only Body, Order and Body/Order cards (103.1.b.1), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* Might of Demacia's tag is Garen. The
predicate is: a card in those domains in `data/cards.json` (not a legend, battlefield, rune or token),
not a Signature card with another champion's tag. Folded by name, that is **255** cards. Of the five
Signature cards in those domains, four carry another tag and are out (`OGN-270 Showstopper`, `SFD-206
Riposte`, `UNL-204 Keeper's Verdict`, `VEN-154 Public Execution`); Garen's own `OGS-024 Decisive
Strike` is in. None of the 255 is banned.

**Two windows, two keyword sets.** While Piercing Light is on the chain the turn is closed, 309.1:
*"If a Chain exists, the turn is in a Closed State."* Only [Reaction] plays there, 813.1.c.1: *"This
can be played during Closed States on any player's turn."* **34** of the 255 have [Reaction], [Hidden]
or [Ambush] in their text. The Skulker's walk into B opens a combat showdown, where [Action] plays as
well, 806.1.b: *"Action grants the corresponding card or effect permission to be played or activated
during Showdowns, even when it is not the Controlling player's turn."* With [Action] added it is
**55**.

**The walk leaves them one ready rune.** On your T4 they have six runes, one of them ready, and any of
the six can be recycled for Power whether it is ready or not. So from hand they can pay one Energy and
some Power. Of the 55, seven cost one Energy or less. **Three break the line:**

- **`OGN-133 Flurry of Blades`** (Body, E1): *"[Reaction] (Play any time, even before spells and
  abilities resolve.) Deal 1 to all units at battlefields."* Cast in the Skulker's combat, before
  damage, it puts 1 on the Skulker, 1 on the Ramhound and 1 on your Poro at A, which lives. Your 3
  still kill the Ramhound, and its 2 are now lethal on the Skulker. Both die, and B becomes nobody's,
  466.5.b: *"If there are no Units remaining here controlled by any player, the Battlefield becomes
  Uncontrolled."* No Conquer. **One ready rune and no Power: the cheapest answer.** It costs them B as
  well.
- **`OGN-145 Unyielding Spirit`** (Body, E1 + 1 Body Power): *"[Reaction] (Play any time, even before
  spells and abilities resolve.) Prevent all spell and ability damage this turn."* Cast in answer to
  Piercing Light, it takes all twelve, Annie's four included, 715.4.a: *"If Damage is replaced or
  reduced by any means, the replacing or reducing action will include the Bonus Damage in the total
  damage when determining how much damage is to be dealt."* Nobody dies, B stays 17 Might, and you have
  spent four runes and a card for nothing. The ready rune pays the Energy and a Body rune among the six
  is recycled for the Power (it can be the same rune, if that one is Body).
- **`SFD-097 Punch First`** (Body, E1 + 2 Body Power): *"[Action] (Play on your turn or in showdowns.)
  Give a unit +5 :rb_might: this turn."* In the Skulker's combat the Ramhound is a 7. The Skulker dies
  and B stays theirs.

The other four do not:

- `UNL-106 Repulse` counters a spell *"that chooses it and no other friendly unit"*. The walk's
  Piercing Light chooses three of their units. Cast on Garen alone, both executions, it would be
  countered for the same price.
- `UNL-173 Sacrifice` kills Garen as its cost (he is Mighty at 5). The two 3-drops are then 3s with 3
  coming, and die. They draw 2 for a Garen who was dying anyway; B still falls.
- `OGN-163 Seal of Strength` and `OGN-245 Seal of Unity` are gear. Their [Reaction] is an ability of
  the gear on the board, and neither is on the board.

*A card hidden at B on their T3.* They control B, which is what hiding needs, 811.1.b: *"While this
card is in your hand or in your Champion Zone on your turn during an Open State, you may pay [A] to
hide this facedown at a battlefield you control that doesn't already have a facedown card hidden there
for as long as you control that battlefield. Beginning on the next turn, this gains [Reaction] and you
may play this, ignoring its base cost."* The [A] is a rune recycled (164.2.b). On their T3 that still
pays for Garen: six runes exhausted, two recycled, one left ready, and one rune fewer for good. Played
from facedown, the card has Reaction, 811.6: *"A card that is Hidden gains Reaction while facedown or
played from facedown, and may be played any time a card with Reaction may be played as a result."* A
unit played from it must go to B, 811.1.d.1: *"A hidden permanent must be played to that
battlefield."* Seven of the 34 have [Hidden]. **All seven stop the Conquer; none saves a body.** The
spell kills the same three, and then the Skulker's walk into B fails:

- `OGN-213 Hidden Blade` kills the Skulker in the showdown. You draw 2.
- `OGN-220 Facebreaker` stuns the Ramhound and the Skulker. Neither deals damage, and the Skulker is
  recalled, 466.1.a.2: *"Insert “3d. Recall Attackers present at the Battlefield if Defenders are still
  present.”"*
- `SFD-111 Here to Help` plays a unit from their hand to B for 3 less: Crowd Favorite for nothing. The
  Ramhound is a 3 with company, and 6 beats 3.
- `VEN-117 Disciple of Shen` (M1, *"I have [Shield 3] while I'm at a battlefield with exactly one other
  unit you control."*) defends as a 4 beside a 3.
- `OGN-135 Pakaa Cub` (M3), `SFD-154 Guards!` (a 2-Might Sand Soldier) and `VEN-135 Kennen, Keeper of
  Balance` (M2) each add a body. With the Ramhound a 3 beside it, B is 6, 5 or 5 against your 3.

A unit that joins this way becomes a defender, 464.2.c.3.a: *"If a Unit controlled by the Attacker or
Defender becomes present at this Battlefield after this moment, it will gain the Attacker or Defender
designation during the Cleanup phase following the action that caused it to become present, as
appropriate for its controller."*

**Before your T4: kill Annie in her base.** Swept over the same 255 for a sentence with *kill*, *deal
N to*, *banish* or *return* and then *a unit*, *an enemy unit* or *enemy units*: 20 cards by name,
each read. Five of them reach a unit in a base. `OGN-229 Vengeance` (Order, E4 + 2 Order Power): *"Kill a
unit."* `OGN-234 Harnessed Dragon` is E8 and `UNL-118 Elder Dragon` E12, both past their T3, and the
Elder Dragon deals only 1. `SFD-158 Sandshifter` reaches only Might 3 or less, and Annie is a 4.
`UNL-164 Safety Inspector` makes each player kill one of their own units, and you choose which. So
Vengeance is the one: four runes and a card on their T3, in place of Garen. Then your T4 spell is 2 a
Deal against four 3s at B (Crowd Favorite is the fourth, with their last three runes), it kills two,
and B stays theirs.

## 6. Verdict

**Right about the rules; silent about the clock.** 715.2 pays Annie's +1 on every Deal, the [Repeat]
makes four of them, and twelve damage from one card is real. Walked against a Garen deck, it killed
their Chosen Champion and the two bodies his aura had grown, and it took the battlefield they had held
for two turns: **4 to 3** after their T4. The same spell without Annie kills two 4s and leaves Garen
standing. Their better T3, the Attendant into your battlefield, ends **4 to 3** after your T4: the spell
kills the Attendant with 3 + 3 and you take both battlefields; without Annie the Attendant lives and
A stays theirs. Casting the spell on T3, before Annie, takes B a turn earlier and still stands at 4 to
3 after their T4, with the Attendant holding A. Annie's +1 pays when their bodies are past 2 + 2: a 5-
or 6-Might body hit with both executions, or a third and fourth Might-3 body. Here that was a 5-Might
body every time, and each time it was worth a battlefield.
The cheapest answer is Flurry of Blades, one ready rune, which the walk leaves them: in the Skulker's
combat it kills the Skulker and B ends nobody's. Unyielding Spirit, the same rune and a Body Power,
prevents all twelve.

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Chaos runes for you, Dark Child's
two domains, in the twelve of Tournament Rules 402.1. Annie on T3 needs a Fury among the six channelled:
it fails in **1 of 924 deals, 0.11%**. Piercing Light on T4 needs two more Fury on the board, so three
among the first eight, since the recycled one goes to the bottom of the rune deck: it fails in **28 of
924, 3.03%**, which includes that one. The Poro and the Skulkers need no Power. The T3 order of §4
needs two Fury among six for the spell: it fails in **37 of 924, 4.00%**; with Annie on T4 as well,
three Fury among eight, **52 of 924, 5.63%**.

Their walk assumes six Body and six Order. Garen on T3 needs an Order among seven, and the Attendant on
T4 a second among nine: neither can fail with six Body, **0 of 924**. Unyielding Spirit's Body Power
needs a Body among their six runes on the board at your T4: **0 of 924** as well. Punch First's two
need two Body among the first seven: it fails in **7 of 924, 0.76%**. Flurry of Blades and hiding take
any rune. Vengeance on their T3 needs two Order among seven: **7 of 924, 0.76%**.

**How likely an answer is.** Out of their own **39**, by your T4 they have seen **7** cards: four
opening and a draw on each of their three turns. A hidden card has to be in those seven too, since it
is hidden on their T3. Flurry of Blades, run three times, is among them in **45.73%**. Two answers in
three copies each (six cards), **72.23%**; three (nine cards), **86.76%**. These count only the cards
named, not how many of them a deck runs.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2, the two-ready-rune window (they can have it on your T4 only by skipping Garen, which
changes the board), Dark Child's two readied runes on their turn (nothing in your hand uses them), and
a second Piercing Light. The probabilities count only the cards named.

## Leads

- The notable *"PIERCING LIGHT IS THE DENSEST SUCH SPELL IN THE POOL ONCE ITS [Repeat] IS PAID"*:
  `OGN-248 Icathian Rain` prints *"Deal 2 to a unit."* six times, and the catalogue's own
  `icathian-rain-annie-ravenborn-six-deal-actions` says so. Swept over every card with Fury in its
  domains, counting *"deal N to"* instructions with a paid [Repeat] doubling them: Icathian Rain six,
  Piercing Light four, `UNL-182 Curtain Call` at most two Deal modes, every other card two or fewer. The
  claim holds outside a Kai'Sa deck: Icathian Rain is a Kai'Sa Signature card (Fury/Mind), playable
  only under `OGN-247 Daughter of the Void` (103.2.d.2).
- Step 4, *"Second execution (820.1.b), choosing freely again (820.2.a)"*: 820.2 makes those choices
  when the spell is cast, with the first execution's, not after it resolves. And nothing dies until the
  spell has finished (321, 142.4.a), so both executions can hit the same body: 6 on one unit.
- The notable *"a single Piercing Light under Annie clears two mid-sized bodies or one large one plus a
  token"*: with both executions it clears two bodies of Might 6, or four of Might 3. Without Annie it is
  two of Might 4, or four of Might 2. Annie's part is the third and fourth Might-3 body, or a 5- or
  6-Might pair.
- The prerequisite lists sixteen Fury legends. Only `OGS-017 Dark Child - Starter` is tagged Annie, so
  only under it is Annie the Chosen Champion (103.2.a.2), in the Champion Zone from the start
  (103.2.a.1, 419.1.a). Under the other fifteen she is a draw: three copies among the 7 cards seen by
  T3 going first, out of 39, is 45.73%.
- *"on a turn Annie is already on the board"* and the steps' order, Annie first: going first, the two
  cannot share a turn before T5 (nine runes). On the walked board, Annie first and spell first both
  stand at **4 to 3** after their T4, against their best reply each time. Annie first leaves their board
  empty; spell first leaves their Vanguard Attendant holding your battlefield.
- The second Deal of each execution has no location clause and reaches a unit in a base. The first
  needs *"a unit at a battlefield"*, so with no unit, yours or theirs, at a battlefield the spell cannot
  be cast, 355.8: *"In order to put a spell or ability on the chain, valid choices must be made for all
  targets."*
- No answer is named. `OGN-145 Unyielding Spirit` (Body, E1 + 1 Body Power) prevents all twelve
  (715.4.a). `OGN-133 Flurry of Blades` (Body, E1) and a card hidden at the target battlefield stop the
  Conquer that follows. `OGN-229 Vengeance` kills Annie in her base.
