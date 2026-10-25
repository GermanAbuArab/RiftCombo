# Play — the Blade and the Mixologist land on the same turn, the three come out of a trash their attack filled, and one rune on a Karthus makes it two

Issue #458 (a slice of #200), 2026-10-24. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `karthus-glasc-mixologist-double-reanimate`**, the Order ENGINE that kills `SFD-165 Glasc
Mixologist` (Order, E5 + 1 Order Power, M5) as the cost of `SFD-178 Blade of the Ruined King`'s
[Equip] (Order gear, E3 + 1 Order Power, M+4) beside two `OGN-236 Karthus, Eternal` (Order, E3 + 1
Order Power, M3). His Deathknell runs three times, and each run plays a unit of cost E3 or less and 1
Power or less out of your trash for free. The entry is right about the count, the cost-kill and where
the bodies go. Walked as a game, going first, with a Hand of Noxus Order deck in your seat, against the
Fury/Chaos Draven deck of
[the En Garde play](2026-10-23-en-garde-wants-a-lone-body-they-attack-the-hammer-a-pair-they-leave-alone-and-both-end-where-a-plain-two-drop-does.md),
in the same seat and with the same deal as
[the Tryndamere play](2026-10-24-tryndamere-scores-two-on-turn-five-the-nine-needs-a-garrison-under-four-might-and-eight-might-at-the-battlefield-is-the-free-answer.md).
**The main line:** the two Karthus go down on T2 and T3 and stay in base, and the Blade and the
Mixologist both wait in hand for T5. Their T4 attack takes A and puts three of your units in your
trash. On your T5 the Blade, the Mixologist and the [Equip] cost eight Energy and three Order Power,
and the three units come back to your base. The Captain, now a 7 with the Blade, retakes A alone:
**4 to 4** after your T5, **4 to 5** after their T5. **The control** puts the Blade down a turn early.
That buys the Captain's two Recruits and a second Gloryseeker, but the Blade sits at your base through
their T4, where `OGN-179 Acceptable Losses` (Chaos, E1) kills it and T5 returns nothing. **The cheapest
answer to the main line is one rune:** `VEN-107 Decree of Discord` (Chaos, E1 + 1 Chaos Power) returns
one Karthus to your hand on their T4, and the three bodies are two. **There is no free answer**: the
only fuel in the walk is what their own attack kills.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-24 at `3fadb16`, reads
773 entries, 262 with forced-ordering language, **93 in the queue and 3 of them with no play**, as the
issue measured. The two picks are unchanged: this entry is rank 91, the first in the list. The other
entry of this slice is rank 92, `rell-magnetic-recurve-bow-per-attack`.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-253 Hand of Noxus` (Fury/Order, tag Darius) |
| **Chosen Champion** | `OGN-243 Darius, Executioner` (Order, E6 + 1 Order Power, M6), never played in the walk |
| **The multiplier** | `OGN-236 Karthus, Eternal` (Order, E3 + 1 Order Power, M3), two on the board |
| **The payoff** | `SFD-165 Glasc Mixologist` (Order, E5 + 1 Order Power, M5) |
| **The outlet** | `SFD-178 Blade of the Ruined King` (Order gear, E3 + 1 Order Power, M+4) |
| **The fuel** | `OGN-217 Trifarian Gloryseeker` (Order, E2, M2), `OGN-210 Daring Poro` (Order, E2, M2), `OGN-211 Faithful Manufactor` (Order, E3, M2) |
| **The carrier** | `OGN-218 Vanguard Captain` (Order, E3 + 1 Order Power, M3) |

The entry admits any legend with Order in its pair. Hand of Noxus is the one for this walk because its
Energy pays for the second card of every turn from T2 on. No legend in the pool carries the Karthus
tag, so Karthus cannot be the Chosen Champion. The legend's tag is Darius, so Darius, Executioner can
be, 103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your Champion
Legend."*

Every card in the list is mono-Order, 103.1.b.3: *"If a card has a single Domain, then that card is
permitted in the Domain Identity that corresponds to the same Domain."* Three copies is the cap,
103.2.b: *"Your Main Deck can include up to 3 copies of the same named card."* The list runs three of
each card named here. None of the cards in this play, on either side, is a Signature card (`signature`
in `data/cards.json`), and none is in `data/legality.src.json` or marked [BANNED] in
`data/corpus_flat.txt`. The rune deck is twelve Order runes, 103.3.a.1: *"Cards in the Rune Deck must
be of the Domain Identity of your Champion Legend."* Every Power in the walk is Order.

The card text the play turns on:

- Karthus, Eternal: *"Your [Deathknell] effects trigger an additional time."*
- Glasc Mixologist: *"[Deathknell] — You may play a unit with cost no more than :rb_energy_3: and no
  more than :rb_rune_rainbow: from your trash, ignoring its cost. (When I die, get the effect.)"*
- Blade of the Ruined King: *"[Equip] — :rb_rune_order:, Kill a friendly unit (Pay the cost: Attach
  this to a unit you control.)"*
- Hand of Noxus: *":rb_exhaust:: [Reaction], [Legion] — [Add] :rb_energy_1:. (Abilities that add
  resources can't be reacted to. Get the effect if you've played a card this turn.)"*
- Trifarian Gloryseeker: *"[Legion] — When you play me, buff me. (If I don't have a buff, I get a +1
  :rb_might: buff. Get the effect if you've played another card this turn.)"*
- Daring Poro: *"[Assault] (+1 :rb_might: while I'm an attacker.)"*
- Faithful Manufactor: *"When you play me, play a 1 :rb_might: Recruit unit token here."*
- Vanguard Captain: *"[Legion] — When you play me, play two 1 :rb_might: Recruit unit tokens here.
  (Get the effect if you've played another card this turn.)"*
- Decree of Discord (theirs, in §5): *"Return any number of enemy Order (:rb_rune_order:) units with
  total Might 5 or less to their owners' hands."*
- Acceptable Losses (theirs, in the control): *"[Action] (Play on your turn or in showdowns.) Each
  player kills one of their gear."*

## 2. Three instances, a kill that is a cost, and when they can reach any of it

**Two Karthus, three instances.** Karthus works from anywhere on the board, base included, 365.1:
*"Passive Abilities of Permanents are typically only active while on the Board."* Two copies giving
three instances is ruling R1 on issue #11, made for the other two multipliers worded the same way
(Blue Sentinel, Red Brambleback): N copies give N + 1 instances. The entry applies it here. The count is taken when the
Mixologist dies, because that is when his trigger goes on the chain, 808.1.d.2: *"The trigger will be
added to the chain as a Pending Item before the card with an ability that triggers on its own death is
moved to the trash due to a Kill instruction or a Cleanup."* A Karthus that leaves the board after
that instant takes no instance with it, and one that arrives after it adds none.

**The kill is a cost, and the Deathknell still fires.** 428.1.a.1: *"Active Kill is when the action is
taken when instructed by a game effect or as a cost for a card or ability."* And 428.1.a.1.b: *"When a
unit with a Deathknell or other ability that triggers on its own death is to be put in the Trash due to
a Kill Instruction, it first has any such ability added to the chain as a Pending Item. Note the unit’s
location, attributes, and other relevant information to process those abilities when finalized before
completing this Kill Instruction."* The three triggers go above the [Equip] itself, 818.1.c.1: *"If
paying costs or making choices for this ability causes triggered abilities to trigger, they will be
placed on the chain above this ability in a Pending state."* So the bodies come back before the Blade
attaches. The [Equip] has no exhaust and no limit per turn, 818.1.c.2: *"Equip is functionally short for
“[Cost]: Attach this gear to a unit you control.”"*, and 377: *"Activated Abilities are repeatable
effects with a cost."* Each use costs one Order Power and one friendly unit. The gear enters ready
and needs no ready state to use, 359.2.d: *"If it is a Non-Unit Gear, it enters the Board Ready at the
player's Base."* The attach goes on a unit you choose, 818.1.b.1: *"Equip’s choice is a Target."*, so
it goes on the Captain, never on the Mixologist you are killing.

**What comes back, and where.** Each instance is a play, 419.3: *"Game effects may result in cards
being played as part of their resolution."* With 419.3.b: *"Treat all steps of Play as normal, except
as noted by the game effect creating this Limited Play Effect."* An instance with nothing eligible does
nothing, 419.3.c: *"If there are no eligible cards to Play when instructed to Play in this manner, then
nothing happens and resolution continues."* The bodies go where any unit can be played, 355.2.a: *"By
default, Valid locations include the controller’s Base or a Battlefield the controller controls."*
They enter exhausted, 143.4: *"Units enter the Board exhausted."* A [Legion] card that comes back has
its Legion on, because the Mixologist was played earlier the same turn, 812.1.c: *"As long as a card
different than the one with the Legion ability has been Finalized by you on the same turn then the
Dependent Ability is Active on the card with Legion."* A Recruit that dies never comes back, 186.1:
*"If a token is put into any Non-Board Zone besides the chain, it ceases to exist immediately after
moving to its new zone."* Karthus is E3 and 1 Power, so a dead Karthus is fuel too. The Mixologist,
at E5, is never his own.

**When they can reach any of it.** A card in your hand is out of their reach. On your turn they get
Priority only on a chain, 312.2.d: *"When the turn is in a Closed State, they are the next Player in
Turn Order, and the player with Priority passes."* In your Main Phase with no chain, only you hold it,
312.2.a: *"When the turn is in a Neutral Open State during their Main Phase."* On a chain they may play
only [Reaction] cards, 309.1.a: *"Only cards and abilities with the Reaction keyword can be played or
activated in a Closed State."* Once the Mixologist leaves the chain, 359.2: *"A Permanent leaves the
Chain and becomes a Game Object."*, you hold Priority again and pay the [Equip] at once. So a Blade
and a Mixologist that arrive on the turn of the kill are never on the board during one of their Main
Phases. The two Karthus are, from T3 on.

**Where a unit can go, and the runes.** Units move from base to a battlefield and back, never between
battlefields, 144.4.a: *"Units may move from their Base to a Battlefield."* 144.4.b: *"Units may move
from a Battlefield to their Base."* A move is paid by exhausting the units, 420.3.a: *"The Cost is
Exhausting one or more Units."* A rune adds Energy by exhausting, 164.2.a: *"[E]: [Reaction] — Add
[1]."*, and Power by leaving the board, 164.2.b: *"Recycle this: [Reaction] — Add [C]."* An exhausted
rune still pays the recycle, and it goes to the bottom of your Rune Deck, 416.1: *"Recycling cards is
the action in which a player takes one or more cards from a specific zone and then puts it on the
bottom of the corresponding deck."* With 416.1.b: *"Runes are Recycled to the Rune Deck."* Energy stays
in the pool through the Main Phase, 167: *"Every player's Rune Pool empties at the start of each
player's Main Phase and the end of each player's turn."* Your board readies only on your turn, 415.3.a:
*"A player Readies all non-spell Game Objects they Control during the Awakening Phase on their turn."*
Going first, you channel two runes each turn.

## 3. Their deck: Fury/Chaos Draven

The deck of the En Garde play linked above, in the same seat and with the same opening four and draws
as the Tryndamere play. `SFD-185 Glorious Executioner` (Fury/Chaos): *"When you win a combat, draw 1.
(You win if only your units remain after combat.)"* Its Chosen Champion is `OGN-028 Draven, Showboat`,
never played. Their bodies are `OGN-018 Noxus Saboteur` (Fury, E3, M3), `OGN-010 Legion Rearguard`
(Fury, E2, M2), `OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-016 Dangerous Duo` (Fury, E3, M3), `OGN-171
Mystic Poro` (Chaos, E2, M2), `OGN-165 Cemetery Attendant` (Chaos, E3 + 1 Chaos Power, M3; *"When you
play me, return a unit from your trash to your hand."*), `OGN-012 Noxus Hopeful` (Fury, E4, M4, E2
with its Legion) and `OGN-006 Flame Chompers` (Fury, E3, M3). Their one spell in the walk is `OGN-009
Hextech Ray` (Fury, E1 + 1 Fury Power): *"[Action] (Play on your turn or in showdowns.) Deal 3 to a unit
at a battlefield."* The Attendant reads their own trash, never yours. Going second, they channel an
extra rune on T1, 485.7: *"First Turn Process: The player going second channels an extra Rune from
their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Order against Fury/Chaos. Your battlefield is A, `OGN-278 Bandle Tree` (*"You may hide an additional
card here."*, and nobody hides); theirs is B, `SFD-210 Hall of Legends` (*"When you conquer here, you
may pay :rb_energy_1: to ready your legend."*, and you never conquer B). Your opening four are
Trifarian Gloryseeker, Karthus, Faithful Manufactor and Glasc Mixologist. Your draws are Daring Poro
(T1), the second Karthus (T2), Blade of the Ruined King (T3), Vanguard Captain (T4) and a second
Trifarian Gloryseeker (T5). Their opening four are Noxus Saboteur, Legion Rearguard, Dangerous Duo and
Pouty Poro. Their draws are Mystic Poro (T1), Cemetery Attendant (T2), Noxus Hopeful (T3), Legion
Rearguard (T4), Flame Chompers (the legend's draw on T4) and Hextech Ray (T5).

The main line keeps both Karthus in base and the Blade and the Mixologist in hand until T5.

```
turn      runes   your turn                                                 points
T1        2       Trifarian Gloryseeker (E2) to base, no other card, no     0
                  buff. None left.
their T1  3       Noxus Saboteur (E3) to base. None left.
T2        4       The Gloryseeker walks to A, empty, Conquer: +1. Karthus   1
                  (E3, one Order recycled) to base. Hand of Noxus: +E1.
                  Daring Poro (E2) to A. None left.
their T2  5       The Saboteur walks to B, empty, Conquer. Legion
                  Rearguard (E2) and Pouty Poro (E2) to base. One left.
T3        5       Hold A: +1. The second Karthus (E3, one Order recycled)   2
                  to base. Hand of Noxus: +E1. Faithful Manufactor (E3)
                  to A: a Recruit at A. None left.
their T3  7       Hold B. Mystic Poro (E2), Dangerous Duo (E3, with
                  Legion) and Noxus Hopeful (E2 with Legion) to base.
                  None left.
T4        6       Hold A: +1. Vanguard Captain (E3, one Order recycled)     3
                  to base, first card of the turn: Legion off, no
                  Recruits. Hand of Noxus: +E1. Four left, nothing to
                  buy.
their T4  9       Hold B. All five in base attack A: A is theirs, and
                  the legend draws. Cemetery Attendant (E3 + 1 Chaos
                  Power) to B: the Hopeful comes back to their hand.
                  Noxus Hopeful (E2 with Legion) and Legion Rearguard
                  (E2) to B. Nine runes, one recycled; two left.
T5        7       Blade of the Ruined King (E3, one Order recycled) to      4
                  base. Hand of Noxus: +E1. Glasc Mixologist (E5, one
                  Order recycled) to base. [Equip] (a third Order
                  recycled), killing the Mixologist: three instances,
                  the Gloryseeker, the Poro and the Manufactor back to
                  base. The Blade goes on the Captain, who attacks A
                  alone: Conquer, +1. Seven runes, three recycled; none
                  left.
their T5  10      Hold B. Flame Chompers (E3) to base. Seven left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 4 after their T4, 5 after their
T5. After their T2 it is **1 to 1**; after your T3, **2 to 1**; after their T3, **2 to 2**; after your
T4, **3 to 2**; after their T4, **3 to 4**; after your T5, **4 to 4**; after their T5, **4 to 5**.

Runes on your board at the end of each turn: 2, 3, 4, 5, 4. On theirs: 3, 5, 7, 8, 10.

Your hand, card by card: 5 after the T1 draw, 4 after the Gloryseeker; 5 after the T2 draw, 3 after
Karthus and the Poro (Karthus, Manufactor, Mixologist); 4 after the T3 draw, 2 after Karthus and the
Manufactor (Mixologist, Blade); 3 after the T4 draw, 2 after the Captain (Mixologist, Blade); 3 after
the T5 draw, 1 after the Blade and the Mixologist (the second Gloryseeker). Theirs: 5 after the T1
draw, 4 after the Saboteur; 5 after the T2 draw, 3 after the Rearguard and the Pouty Poro (Dangerous
Duo, Mystic Poro, Cemetery Attendant); 4 after the T3 draw, 1 after the Mystic Poro, the Duo and the
Hopeful (Cemetery Attendant); 2 after the T4 draw, 3 after the legend's draw, 2 after the Attendant, 3
with the Hopeful back, 1 after the Hopeful and the Rearguard (Flame Chompers); 2 after the T5 draw, 1
after the Chompers (Hextech Ray).

**Your T2 and T3: Karthus stays home.** The Gloryseeker takes A, which is empty: a non-combat
showdown, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are a
stand-alone Phase and do not create a Combat."* It is a Conquer, 348.2.a.1: *"This results in a
Conquer if that player has not yet scored that Battlefield this turn."* Each Karthus costs four of
your runes' worth, three Energy and an Order recycled, and the legend's Energy pays for the second card.
Both go to base and never move. Every damage spell in their walk hand and most of their pool reads
*"at a battlefield"* (§5), and a Karthus at base is out of its range. The Poro and the Manufactor go
to A, which you control. On T3 you Hold A, 469.2: *"Hold: A player maintains Control of a Battlefield
they did not yet Score this turn during their Beginning Phase."* A is 2 + 2 + 2 + 1 = **7**.

**Their T2 and T3: B, and no attack.** On their T2 the Saboteur is a 3, and A is 4: it takes the empty
B instead. On their T3 their ready bodies in base are the Rearguard and the Pouty Poro, 4, and the Duo
played this turn would make them 6, less than A's 7. They play out to base: 2 + 2 + 2 + 3 + 4 = **13**
there.

**Your T4: the Captain alone, and four Energy unspent.** The Blade and the Mixologist together cost
E8 and two Order Power, and the [Equip] a third. T4's six runes and the legend's one cannot pay that.
Either piece played now is on your board through their T4 Main Phase, and the Mixologist cannot die
on this turn anyway, because the trash is still empty (419.3.c). So the Captain goes to base as the
first card of the turn, with his Legion off and no Recruits, and the legend's Energy and three more go
unspent. That is the price of the main line.

**Their T4: the attack that fills your trash.** Their 13 attack A's 7. You assign your 7 to the
Hopeful and the Duo, lethal in full, 465.2.c.3: *"Units must have lethal damage assigned to them in
full before damage is assigned to a different Unit."* Their 13 kill all four of yours. The Gloryseeker,
the Poro and the Manufactor go to your trash; the Recruit ceases to exist (186.1). They Conquer A, and
the legend draws them the Chompers. The Attendant returns the Hopeful from their trash, and the
Hopeful and the Rearguard go to B. A is their Rearguard, Pouty Poro and Mystic Poro: **6**.

**Your T5: the Blade, the Mixologist and the kill.** Seven runes and the legend's one are eight
Energy. The Blade costs three, the Mixologist five, and three exhausted Order runes are recycled for the
three Order Power. They get Priority on the Blade and on the Mixologist while each is on the chain,
with two open runes and Flame Chompers in hand, and nothing they hold is a [Reaction]. The Mixologist
lands, and you pay the [Equip] at once: one Order Power, the Mixologist killed, the Captain the target.
Three instances go on the chain above it. The first plays the Gloryseeker, a 3 now, because the
Mixologist turned its Legion on. The second plays the Poro, and the third the Manufactor, whose Recruit
is born beside it. You control no battlefield, so all three go to your base, exhausted. The Blade
attaches to the Captain: **3 + 4 = 7**. He walked out of the Awakening ready, and he attacks A alone.
A is theirs, so it is a combat, 450: *"The Destination becomes Contested if it is an Uncontested
Battlefield not controlled by the controller of the Unit or Units that moved."* And you are the
Attacker, 464.2.c.1: *"The Attacker is the player whose unit(s) applied the Contested status to the
Battlefield."* Their 6 do not kill a 7. His 7 kill all three 2s. **4 to 4.**

**Their T5.** They Hold B. Nothing of theirs at B can reach A this turn (144.4.b), and Hextech Ray's 3
do not kill the Captain. They play the Chompers and hold the Ray. **4 to 5**, with the two Karthus, the
three returned bodies and a Recruit in your base, the Captain on A, and the second Gloryseeker in hand.

**The control: the Blade on T4.** The same deal. On T4 the Blade (E3, an Order recycled) goes to base
first, the legend adds one, and the Captain (E3, an Order recycled) follows with his Legion on: two
Recruits at base. Six of seven Energy, and four runes left on the board. Their T4 is the same. On T5,
six runes and the legend's one: the Mixologist (E5, an Order recycled), the [Equip] (an Order
recycled), the same three bodies, and the Blade on the Captain. The Captain and both Recruits attack
A, 7 + 1 + 1 = 9 against 6: their 6 kill the two Recruits and mark 4 on the Captain, and A is yours.
The last two Energy buy the second Gloryseeker, a 3 with its Legion on. **4 to 4**, and **4 to 5**
after their T5: the same score, with one more body in your base. The difference is their T4. The Blade
was at your base through their whole Main Phase, and `OGN-179 Acceptable Losses` (Chaos, E1) kills
it there: it is your only gear. Then the Mixologist on T5 has no way to die on your turn, and nothing
comes back. `SFD-135 Factory Recall` (Chaos, E1) returns the Blade to your hand instead, and T5's seven
Energy cannot pay the Blade again and the Mixologist. One rune, either way, against a line that the
main line's order never offers them.

**The Mixologist on T4 instead buys nothing.** He costs the five Energy, and the two left buy nothing
in hand (the Blade and the Captain are E3 each). At your base through their T4 he is an Order unit of
Might 5, which is exactly what Decree of Discord returns for one rune. Killing him there is no answer
at all: his Deathknell fires on whoever's turn he dies.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 9 cards by T5 (four opening, one draw a turn from T1).
With three copies of each, holding two Karthus, a Mixologist and a Blade among them is **2.76%**. At
least one Karthus, a Mixologist and a Blade, two bodies or more, is **14.57%**.

## 5. Breaks to

**What the engine did, and the predicate.** On your T5 the Mixologist died to the [Equip] beside two
Karthus, and three units came back from your trash. The predicate is: played by them before he dies,
in their T4 Main Phase with the nine runes and the board they have, or on your T5 with the two runes
they left open, does it make his death return fewer than three bodies?

**The scope.** A Fury/Chaos deck plays only Fury, Chaos and Fury/Chaos cards (103.1.b), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* As in the En Garde play, that is
**252** cards folded by name (not a legend, battlefield, rune or token, and not a Signature card with
another champion's tag), less the five banned in constructed (`Called Shot`, `Draven, Vanquisher`,
`Fight or Flight`, `Scrapheap`, `Stealthy Pursuer`): **247**, of them **154** units, **62** spells and
**31** gear.

**The candidates.** In the main line three things are in their reach: the two Karthus at your base
from T3 on, your trash after their attack, and, on your T5, the Blade and the Mixologist while each is
on the chain. Of the 247, the regex
`\b(deal|deals|kill|kills|banish|return|returns|recall|counter|stun|trash)\b` (case-insensitive,
reminder text left in) matches **105**. Read one by one, the line breaks in two ways only: a Karthus
leaves the board before the kill, or a card leaves your trash. Most of their damage and bounce reads
*"at a battlefield"*, and a Karthus at base is out of its range.

**The cheapest answer: Decree of Discord, one rune.** In their T4 Main Phase, after the attack,
`VEN-107 Decree of Discord` (Chaos, E1 + 1 Chaos Power) returns one Karthus to your hand. Two Karthus
are 6 Might, over its total of 5, so it takes one. It names no location, so it reaches your base.
On your T5 the Mixologist's Deathknell runs twice, and the Gloryseeker and the Poro come back without
the Manufactor. The Karthus went to your hand, not your trash, so it cannot be one of the two.
**One rune, one Chaos recycled, one card, for one body**, and it fits in the two runes their walk left
unspent. Replaying the Karthus on T5 costs E3 and an Order Power you do not have beside the Blade and
the Mixologist.

**Nothing else at one rune breaks it.** Of the 105, **10** cost E1 or less. Read in full, only Decree
of Discord touches the line. `OGN-179 Acceptable Losses`, `SFD-135 Factory Recall` and `SFD-005
Detonate` need a gear on your board, and in the main line the Blade is in your hand through their T4.
`OGN-169 Gust`, `OGN-009 Hextech Ray` and `UNL-014 Monster Harpoon` need a battlefield. `UNL-134
Existential Dread` needs an attacker, `VEN-015 Decree of Rage` a Calm unit, and `UNL-136 Scryer's
Bloom` is their own gear.

**Nothing at all on your T5 with the two open runes.** Of the 247, **24** carry [Reaction] or
[Ambush], and **14** of them cost E2 or less. Read in full, none of them breaks the line. `SFD-136 Hard Bargain` and `UNL-131 Abandon` counter spells, and the
Blade is a gear and the Mixologist a unit. `OGN-033 Shakedown` (Fury, E2 + 1 Fury Power) on a Karthus
lets you choose: *"Choose an enemy unit. Deal 6 to it unless its controller has you draw 2."* You give
them the two cards and keep the Karthus. Killing the Mixologist in response is impossible: he dies as
the cost.

**Dearer answers on the same board, all in their T4 Main Phase:**
- `OGN-029 Falling Star` (Fury, E2 + 2 Fury Power): *"Deal 3 to a unit. Deal 3 to a unit."* Both
  Karthus die at your base. One instance is left, and your trash now holds five eligible units, both
  Karthus among them, so the one body can be a Karthus. **Two runes, both recycled: one body.**
- Two Decrees of Discord, one Karthus each. **Two runes: one body**, and neither Karthus can come back.
- `VEN-101 Gust Monk` (Chaos, E2, M2) with its extra E1: *"You may pay :rb_energy_1: as an additional
  cost to play me. When you play me, if you paid the additional cost, banish a card from any trash to
  give a unit [Assault 2] this turn. (+2 :rb_might: while it's an attacker.)"* After the attack it
  banishes one of the three from your trash. **Three runes: two bodies**, and a 2 on their board.
- `OGN-187 Whirlwind` (Chaos, E3 + 1 Chaos Power): *"Starting with the next player, each player may
  return a unit to its owner's hand."* You return first, then they return a Karthus. **Three runes: two
  bodies.**
- `UNL-128 Star-Crossed` (Chaos, E3 + 1 Chaos Power, [Reaction]): *"Return a friendly unit and an enemy
  unit to their owners' hands."* A Karthus and one of their own. **Three runes: two bodies.** It is the
  one answer that also works on your T5, while the Blade or the Mixologist is on the chain, if they
  leave three runes open instead of two.

**Answers this board does not give them.**
- The gear answers, `OGN-179 Acceptable Losses` (E1), `SFD-135 Factory Recall` (E1), `SFD-005
  Detonate` (Fury, E1 + 1 Fury Power, and you draw 2) and `VEN-003 Brittle Steel` (Fury, E2 + 1 Fury
  Power). They need the Blade on your board in their Main Phase, which is the control.
- Killing the Mixologist. Wherever and whenever he dies, his Deathknell fires, and on their own turn
  the bodies arrive just the same.
- Every *"at a battlefield"* card on a Karthus. In the walk both stay at base.

**No free answer.** Your trash fills only when your units die, and in the walk only their attack on
A killed any. Not attacking keeps your trash empty, and then the three instances find nothing
(419.3.c). That costs them A's Conquer and the legend's card: **3 to 3** after their T4 instead of 3
to 4, and you Hold A on your T5.

## 6. Verdict

**Right about the count, the cost and the bodies; the order that hides the pieces costs a turn's
Energy, and one rune on a Karthus still takes a body.** Walked going first with a Hand of Noxus Order
deck, the two Karthus went to base on T2 and T3 and never moved. Their T4 attack took A and put three
of your units in your trash. On T5 the Blade, the Mixologist and the [Equip] cost eight Energy and
three Order Power, and the Mixologist's Deathknell ran three times: the Gloryseeker, the Poro and the
Manufactor came back, exhausted, to your base. The Captain took the Blade and retook A alone: **4 to
4** after your T5, **4 to 5** after their T5. Holding both pieces for T5 cost four unspent Energy on T4
and the Captain's two Recruits. The greedier order, the Blade a turn early, ends at the same score
with one more body, and gives them a one-rune answer that leaves nothing to come back. In the main
line their cheapest card is `VEN-107 Decree of Discord`, one rune, which returns a Karthus from your
base and turns three bodies into two. The engine's fuel was their own attack. The full board by T5 is
**2.76%** of deals.

## 7. Not verified

**Your runes.** The walk assumes twelve Order runes (103.3.a.1 allows it), so every Power in it can be
paid: **0 failures**. A list with six Fury and six Order runes needs one Order recycled by T2, two by
T3, three by T4 and six by T5. Recycled runes go to the bottom, so the runes channelled by T5 are the
first ten of the deal. It needs at least one Order among the first four, two among the first six,
three among the first eight and all six among the first ten: it fails in **715 of 924** deals,
**77.38%**.

**Their runes.** Their walk assumes six Fury and six Chaos, as in the En Garde play. The Cemetery
Attendant on their T4 needs a Chaos among their first nine runes: with six Fury it cannot fail, **0 of
220**. Those nine hold at least three of each domain, so after the Attendant's recycle at least two
Chaos and three Fury remain: Decree of Discord, two Decrees, Falling Star and Whirlwind can all be
paid, **0 of 220**. Gust Monk costs no Power.

**How likely an answer is.** The walk fixes both hands. Holding a Decree of Discord among their first
8 cards of 39, three copies, is **50.82%**. That counts only the one card named, not how many of them a
Fury/Chaos list runs.

**The deal and the opponent.** The walk's deal holds the four pieces by T5, which is 2.76% (§4). Their
attack on A on their T4 and their late bodies at B are the walk's choices of opponent, the same choices
as the Tryndamere play. With the Hopeful and the Rearguard at A instead, A is 12 and the Captain's 7
does not attack: the three bodies still come back, and it is 3 to 4 after your T5. Not walked: going
second, the mulligan, 2v2, other legends, the Blade killing your own units as fuel, a returned Vanguard
Captain, the second and third Mixologist, and the turns after their T5.

## Leads

- Step 1, *"Board: two Karthus, Blade of the Ruined King, and Glasc Mixologist"*: the entry does not
  say when the Blade and the Mixologist arrive. Played on the turn of the kill, they are never on the
  board in one of the opponent's Main Phases (312.2.a, 309.1.a, 359.2). Played a turn early, the Blade
  dies to `OGN-179 Acceptable Losses` (one rune) and the Mixologist returns to hand from
  `VEN-107 Decree of Discord` (one rune). Together they cost E8 and two Order Power, and the [Equip] a
  third. With only the Captain on T4, T5 is the first turn with eight Energy.
- Step 1, *"Trash holds units costing at most 3 Energy and 1 Power"*: the entry does not say how the
  trash fills. In the walk only the opponent's attack filled it. The Blade can fill it too, at one
  Order Power and one friendly unit per card. A dead Karthus is eligible (E3, 1 Power).
- The second notable, *"at 5 Energy + 1 Power each"*: each firing also pays the [Equip]'s Order Power,
  so it is 5 Energy and 2 Power per Mixologist, beside the Blade's own E3 and Order Power once.
- Step 2: the Blade is the timing, not the trigger. Any death of the Mixologist fires his Deathknell
  (808.1.d.2), and the opponent killing him gives the same three bodies. What the Blade adds is that
  you choose the turn.
- Step 4, *"All three enter exhausted (143.4)"*: true, and a [Legion] card comes back with its Legion
  on, because the Mixologist is the other card (812.1.c). In the walk the Gloryseeker came back a 3.
- The entry does not say where the Karthus stand. At base, every *"at a battlefield"* card in the
  Fury/Chaos pool misses them, and that is the line's main defence.
- The entry names no answer. The cheapest is `VEN-107 Decree of Discord`, one rune for one Karthus:
  two bodies instead of three. `OGN-029 Falling Star` kills both Karthus for two runes: one body.
