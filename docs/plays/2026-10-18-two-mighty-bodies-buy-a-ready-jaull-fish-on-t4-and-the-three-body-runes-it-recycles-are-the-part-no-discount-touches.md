# Play — Two Mighty bodies buy a ready Jaull-Fish on T4, and the three Body runes it recycles are the part no discount touches

Issue #397 (a slice of #200), 2026-10-18. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `jaull-fish-garen-rugged-mighty-discount`**, the Body ENGINE in which `SFD-103 Jaull-Fish`
(E7 + 2 Body Power, M6) costs 2 Energy less for each Mighty unit you control, with `OGS-007 Garen,
Rugged` as the printed-5 body that turns the discount on. The entry is right about its trap: [Shield]
and [Assault] only count inside a combat, so a body that is a 5 only while defending counts as what it
prints when the cost is read. It is right that 356.6 floors the Energy and never touches the Power.
It misses two things. The discount also reaches [Accelerate]'s Energy, because additional costs are
added before discounts are applied (356.2, 356.4, 356.4.f), so four Mighty bodies make a ready
Jaull-Fish cost 0 Energy, not 1. And Garen is not the cheapest certain Mighty body: nineteen mono-Body
units with printed Might 5 or more cost less than his E6 + 1 Body Power. Walked as a game, going first,
against a Fury/Chaos Jinx deck that stacked its own battlefield, `UNL-171 Galio, Indefatigable` and
`VEN-088 Jayce, Hammer in Hand` made two Mighty bodies, the Jaull-Fish came down ready on T4 for 4
Energy and 3 Body Power, and it walked into their battlefield beside Jayce and the Ramhound: **4 to 2**
after their T4. Without it, the same turn spent on Garen holds and attacks nothing: **3 to 3**. At full
price it cannot be played on T4 at all. The bill comes in runes: three Body runes recycled on T4, so
the line ends T4 with three runes on the board against the control's five, and **30.30%** of rune
orders cannot pay it on T4. The cheapest card that breaks the turn is not an answer to the discount.
It is `OGN-169 Gust`, one rune and no Power, played in the combat on the Ramhound, which leaves the
attack two short.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-18 at `1c031c2`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 19 of them with no play**, as
the issue measured. The two picks are unchanged: this entry is rank 83, the second in the list. The
other entry of this slice is rank 82, `carnivorous-snapvine-rampage-tank-bypass`, played in
[Galio alone deals no combat damage, so the Snapvine beats him by killing his partners and never by choosing him](2026-10-18-galio-alone-deals-no-combat-damage-so-the-snapvine-beats-him-by-killing-his-partners-and-never-by-choosing-him.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGS-023 Might of Demacia - Starter` (Body/Order, tag Garen) |
| **Chosen Champion** | `OGS-007 Garen, Rugged` (Body, E6 + 1 Body Power, M5) |
| **The payoff** | `SFD-103 Jaull-Fish` (Body, E7 + 2 Body Power, M6) |
| **The Mighty bodies** | `UNL-171 Galio, Indefatigable` (Order, E3 + 1 Order Power, M6) and `VEN-088 Jayce, Hammer in Hand` (Body, E4 + 1 Body Power, M5) |
| **The third attacker** | `SFD-159 Trusty Ramhound` (Order, E2, M2) |

The entry admits any of seventeen legends with Body in their pair. Might of Demacia is the one for
this walk because its tag is Garen, so the entry's own body can be the Chosen Champion, 103.2.a.2:
*"Must be a champion unit with a champion tag that matches the tag on your Champion Legend."* Garen,
Rugged is tagged Elite, Garen and Demacia, and is not a Signature card (`signature` in
`data/cards.json`). He starts in the Champion Zone, 103.2.a.1: *"This will be placed in the Champion
Zone at the start of the game."* The legend's text plays no part in the line (*"When you conquer, if
you have 4+ units at that battlefield, draw 2."*): no conquer here has more than one unit of yours at
the battlefield.

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* None is a Signature card, and none is in `data/legality.src.json` or marked
[BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Jaull-Fish: *"[Accelerate] (You may pay :rb_energy_1::rb_rune_body: as an additional cost to have me
  enter ready.) I cost :rb_energy_2: less for each of your [Mighty] units. (A unit is Mighty while it
  has 5+ :rb_might:.)"*
- Garen, Rugged: *"[Assault 2], [Shield 2] (+2 :rb_might: while I'm an attacker or defender.)"*
- Galio, Indefatigable: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or
  ability.) [Tank] (I must be assigned combat damage first.) I don't deal combat damage."*
- Jayce, Hammer in Hand: *"When I become ready, choose one to give me this turn — • [Assault 2] (+2
  :rb_might: while I'm an attacker.) • [Deflect 2] (Opponents must pay
  :rb_rune_rainbow::rb_rune_rainbow: to choose me with a spell or ability.) • [Ganking] (I can move
  from battlefield to battlefield.)"*
- Trusty Ramhound: *"While you have another unit here, I have +1 :rb_might:."*

## 2. What the discount counts, when, and what it can reach

**Mighty is a state, read from current Might on the board.** 708: *"A Unit "is Mighty" as long as its
Might is 5 or greater."* 710: *"Units on the board are evaluated according to their current Might."*
The entry cites 709, which is the event, *"A Unit "becomes Mighty" at the moment its Might changes
from being less than 5 to being 5 or greater."*; the Jaull-Fish reads the state.

**[Shield] and [Assault] are not current Might outside a combat.** 814.1.c: *"It is functionally short
for "While I am a defender, I have +X [M].""* 807.1.c: *"It is functionally short for "While I am an
attacker, I have +X [M].""* Both designations come from a combat, 814.1.d: *"Being a defender means
the Unit has gained the Defender designation during Combat."* The Jaull-Fish is played in your own
Main Phase, where nobody is an attacker or a defender. So `UNL-099 Towering Combatant` (Body, E4, M3,
*"[Shield 2] (+2 :rb_might: while I'm a defender.)"*) counts as a 3, and Garen counts as his printed 5. The entry is right about this.

**The count is read with the Jaull-Fish already on the chain, and nothing lets them act between.**
Playing a card starts by moving it, 354: *"1. Move the card from its current zone to the Chain."*
354.1: *"This Closes the State."* The cost comes two steps later, 356: *"3. Determine Total Cost."*
In a Closed State only Reactions can be played, 309.1.a: *"Only cards and abilities with the Reaction
keyword can be played or activated in a Closed State."* And they do not get priority until you pass
it, 312.2.d: *"When the turn is in a Closed State, they are the next Player in Turn Order, and the
player with Priority passes."* By then the cost is paid. So the board that counts is the board you
start the chain with.

**Play it first, or you open the window yourself.** Your Main Phase is yours alone, 316.5.b: *"This is
denoted as a Neutral Open State, and only the Turn Player has the ability to play spells or activate
abilities."* Every card you play before the Jaull-Fish starts a chain, and a Reaction can answer on it,
813.1.c.1: *"On Cards: "This can be played during Closed States on any player's turn.""* The entry's
second step, pumping a body with `VEN-077 Tools of Empire` before the Jaull-Fish, is an activated
ability, and 377 puts that on the chain too: *"Activated Abilities are repeatable effects with a cost.
They follow a process of going onto the chain and resolving, similar to Playing a Card."* That pump is
a window for them, opened before the count. In this walk the only window on your T4 before the count
is Jayce's own trigger, 383.3: *"When a Condition is met, a Triggered Ability behaves like an Activated
Ability and is placed on the Chain."*

**The discount reaches [Accelerate].** The total cost is built in order: 356.2, *"Apply additional
costs in any order."*, then 356.4, *"Apply discounts."* [Accelerate] is an additional cost, 805.1.a:
*"Accelerate is functionally short for "As you play me, you may pay [1][C] as an additional cost. If
you do, I enter ready.""* A discount on the whole cost comes after, 356.4.d: *"Discounts that apply to
the total cost of a spell and not any one component of the cost must be applied after any discount
that applies only to a component of the cost."* And it may eat the additional cost, 356.4.f:
*"Discounts can reduce additional costs, including to 0."* So the Jaull-Fish with [Accelerate] is 8
Energy and 3 Body Power before the discount, and each Mighty body takes 2 off the 8. The floor is
356.6: *"Energy and Power costs can't be reduced below 0."* The Power is untouched: the discount names
only Energy, and 805.1.a.1 fixes the third Power's domain, *"If the unit has one or more domains, the
Power portion of the Accelerate cost can be paid only with a Power that matches one of the domains of
the unit."*

| Mighty bodies | Jaull-Fish | Jaull-Fish with [Accelerate] |
|---|---|---|
| 0 | E7 + 2 Body | E8 + 3 Body |
| 1 | E5 + 2 Body | E6 + 3 Body |
| 2 | E3 + 2 Body | E4 + 3 Body |
| 3 | E1 + 2 Body | E2 + 3 Body |
| 4 | E0 + 2 Body (2 Energy of discount wasted) | E0 + 3 Body |

**Every Power is a rune off the board.** A rune adds Energy by exhausting, 164.2.a: *"[E]: [Reaction]
— Add [1]."*, and Power only by leaving, 164.2.b: *"Recycle this: [Reaction] — Add [C]."* A rune
exhausted for Energy can still be recycled for Power, so a cost of E4 + 3 Power is four runes, three of
them recycled. They go to the bottom of the rune deck, 416.1: *"Recycling cards is the action in which
a player takes one or more cards from a specific zone and then puts it on the bottom of the
corresponding deck."* Going first, you channel your twelfth rune on T6, so a rune recycled on T4 does
not come back before T7. The ready Jaull-Fish costs three Body runes at every Mighty count.

**The runes, going first.** You have 2, 4, 6 and 8 runes channelled by T1 to T4, less what you have
recycled.

## 3. Their deck: Fury/Chaos Jinx

`OGN-251 Loose Cannon` (Fury/Chaos): *"At start of your Beginning Phase, draw 1 if you have one or
fewer cards in your hand."* It fires once in the walk, on their T4. Its Chosen Champion is `OGN-030
Jinx, Demolitionist` (Fury, E3 + 1 Fury Power, M4): *"[Accelerate] (You may pay
:rb_energy_1::rb_rune_fury: as an additional cost to have me enter ready.) [Assault 2] (+2 :rb_might:
while I'm an attacker.) When you play me, discard 2."* She is played from the Champion Zone, 419.1.a:
*"By default, a player can only Play cards from their hand or their Chosen Champion zone."* Their
bodies are `OGN-018 Noxus Saboteur` (Fury, E3, M3; *"Your opponents' [Hidden] cards can't be revealed
here."*, and you hide nothing), `OGN-013 Pouty Poro` (Fury, E2, M2, [Deflect]), `OGN-016 Dangerous
Duo` (Fury, E3, M3; its [Legion] +2 expires at the end of their turn) and `OGN-010 Legion Rearguard`
(Fury, E2, M2). Going second, they channel an extra rune on T1, 485.7: *"The player going second
channels an extra Rune from their Rune Deck during their first Channel Phase of the game."* §5 names
their answers.

## 4. The turns, going first

Body/Order against Fury/Chaos. Your battlefield is A, `OGN-282 Monastery of Hirana` (*"When you conquer
here, you may spend a buff to draw 1."*, and nobody has a buff); theirs is B, `SFD-210 Hall of Legends`
(*"When you conquer here, you may pay :rb_energy_1: to ready your legend."*, and neither legend has an
exhaust ability to use). Your opening four are Trusty Ramhound, Galio, Jayce and the Jaull-Fish. Your
draws are `OGN-210 Daring Poro` (T1), `OGN-216 Soaring Scout` (T2), `SFD-167 Unsung Hero` (T3) and
`SFD-099 Veteran Poro` (T4). Their opening four are Noxus Saboteur, Pouty Poro, Dangerous Duo and
Legion Rearguard. Their draws are `OGN-171 Mystic Poro` (T1), `OGN-003 Chemtech Enforcer` (T2),
`OGN-202 Jinx, Rebel` (T3), and on T4 `OGN-018 Noxus Saboteur` (the legend's draw) and `OGN-016
Dangerous Duo`.

```
turn      runes  your turn                                               points
T1        2      Trusty Ramhound (E2) to base. None left.                0
their T1  3      Noxus Saboteur (E3) to base. None left.
T2        4      Ramhound walks to A, empty, Conquer: +1. Galio (E3 +    1
                 1 Order Power) to A, one Order recycled. One left.
their T2  5      Saboteur walks to B, empty, Conquer. Jinx (E3 + 1
                 Fury Power) from the Champion Zone to B, discards 2;
                 Pouty Poro (E2) to B. One recycled; none left.
T3        5      Hold A: +1. Ramhound walks home. Jayce (E4 + 1 Body     2
                 Power) to base, one Body recycled. One left.
their T3  6      Hold B. Dangerous Duo (E3) and Legion Rearguard (E2)
                 to B. One left.
T4        6      Hold A: +1. Jaull-Fish first, with Accelerate: E4 +     4
                 3 Body Power, three Body recycled. Jaull-Fish, Jayce
                 and Ramhound walk to B: Conquer, +1. Daring Poro (E2)
                 to B. None left.
their T4  8      Jinx, Rebel (E5 + 1 Chaos Power) and a second
                 Saboteur (E3) to base. One recycled; none left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 2 after their T4. After your T3 it
is **2 to 1**; after their T3, **2 to 2**; after your T4, **4 to 2**; after their T4, **4 to 2**.

Runes on your board at the end of each turn: 2, 3, 4, 3. On theirs: 3, 4, 6, 7.

Your hand, card by card: 5 after the T1 draw, 4 after the Ramhound; 5, then 4 after Galio; 5, then 4
after Jayce; 5 after the T4 draw, 3 after the Jaull-Fish and the Daring Poro (Soaring Scout, Unsung
Hero, Veteran Poro). Garen stays in the Champion Zone. Theirs: 5 after the T1 draw, 4 after the
Saboteur; 5 after the T2 draw, 3 after Jinx's discard (Mystic Poro and Chemtech Enforcer), 2 after the
Pouty Poro; 3 after the T3 draw, 1 after the Duo and the Rearguard (Jinx, Rebel); on T4 the legend
draws, since they hold one card, 2, then 3 after the draw, 1 after Jinx, Rebel and the Saboteur
(Dangerous Duo).

**Your T2: the Mighty count starts at A.** The Ramhound takes A, which is empty: a non-combat
showdown, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield
are a stand-alone Phase and do not create a Combat."* With no rune ready they pass, and 348.2.a.1
makes it a point: *"This results in a Conquer if that player has not yet scored that Battlefield this
turn."* Galio goes to A, which you now control, 355.2.a: *"By default, Valid locations include the
controller’s Base or a Battlefield the controller controls."* That opens no showdown, 190.3.a.1:
*"Units moving to or being played to a battlefield apply Contested status if that battlefield is not
already Contested and that Unit’s controller does not already control that battlefield."*

**Their T2: they take B, and stack it.** The Saboteur walks into B. They have Focus, 345: *"As a
Showdown begins, the player who applied Contested status to the Battlefield gains Focus."* You have
one rune ready and nothing in hand to play with it; B is theirs. Jinx comes from the Champion Zone to
B and they discard the two cards they drew. Attacking A instead would be pointless: their 3 would go
into Galio first, a [Tank] with 6 Might, and the Ramhound's 3 would kill the Saboteur.

**Your T3: the Ramhound walks home.** You Hold A, 469.2: *"Hold: A player maintains Control of a
Battlefield they did not yet Score this turn during their Beginning Phase."* The Ramhound leaves A for
base, 144.4.b: *"Units may move from a Battlefield to their Base."* A keeps Galio, so you keep A. The
Ramhound walks because a unit at A cannot move to B: without [Ganking] the moves are 144.4.b and
144.4.a, *"Units may move from their Base to a Battlefield."* Jayce goes to base. Two Mighty bodies now: Galio at A, 6, and Jayce in base, 5.

**Their T3: B is 14.** They Hold B. Their units cannot reach A, which they could only attack from
their base, and their base is empty. So they add the Duo and the Rearguard to B: Saboteur 3, Jinx 4,
Pouty Poro 2, Duo 3, Rearguard 2. One rune stays ready.

**Your T4.** All your objects ready, 315.1.b: *"1. The Turn Player readies all Game Objects they control
that are able to be readied."* Jayce becomes ready, his trigger goes on the chain, and you choose
[Assault 2]. They get priority with one ready rune and pass. You Hold A: 3. You channel to 6 runes.

The Jaull-Fish is the first thing in your Main Phase: two Mighty bodies, E4 + 3 Body Power with
[Accelerate]. Four runes exhausted, three Body recycled, two still ready. It enters ready, 143.4.a:
*"This can be altered by Accelerate or similar game effects."* The Jaull-Fish, Jayce and the Ramhound
walk from base into B as one move, 144.3: *"Players may perform multiple Units' standard move
simultaneously. This is treated as one game action performed on multiple Units."* That is a combat,
and you have Focus first, 464.2.c.1.a: *"If a showdown opens as part of combat, this player gains Focus
as the showdown begins."* You pass; they have one rune and no card to use it on.

Damage, 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal to their
summed Might among the other's Units."* Yours is Jayce 7 while attacking, the Jaull-Fish 6 and the
Ramhound 3 with company: 16. Theirs is 14. 465.2.c.3: *"Units must have lethal damage assigned to them
in full before damage is assigned to a different Unit."* Your 16 kill all five of theirs, 3 + 4 + 2 +
3 + 2, with 2 over. Their 14 kill Jayce and the Jaull-Fish, 7 + 6, and put 1 on the Ramhound. Only the
Ramhound remains, 466.5.d: *"Establishing Control results in a Conquer if that player has not yet
scored this Battlefield this turn."* That is 4. The last two runes play Daring Poro to B, which you now
control, so the Ramhound has company again. Damage heals at the end of the turn, 317.2.b: *"Insert “3c.
Heal all Units.”"*

**Their T4.** Their board is empty. They hold one card, so Loose Cannon draws, and they play Jinx, Rebel
and a second Saboteur to base. Units enter exhausted, 143.4: *"Units enter the Board exhausted."* B is
not reachable this turn. **4 to 2.** You end T4 with three runes on the board; they end with seven.

**Without the Jaull-Fish on T4: Garen instead.** Same draws, same six runes. Garen comes from the
Champion Zone to base for six runes, one Body recycled. Jayce 7 and the Ramhound 3 are 10 against B's
14, so nothing attacks. They Hold B: **3 to 3** after their T4, with five runes on your board and the
Jaull-Fish still in hand. On T5 there are three Mighty bodies and seven runes, and the Jaull-Fish with
[Accelerate] is E2 + 3 Body Power. That is a turn later, against a B that has had another turn.

**Insisting on full price.** Without the discount the Jaull-Fish is E7 + 2 Body Power, seven runes, or
E8 + 3 Body Power ready. On T4 you have six. It cannot be played on T4 at all.

**Without [Accelerate].** With two Mighty bodies the Jaull-Fish is E3 + 2 Body Power, three runes, and
it enters exhausted. Jayce 7 and the Ramhound 3 attack alone, 10 against 14, and that is no attack.
[Accelerate] costs one more Energy, which the discount mostly absorbs, and one more Body rune, which
it cannot.

**The other ordering: Daring Poro first.** Played before the Jaull-Fish, the Poro opens a chain, and
on it any Reaction they can afford is live (309.1.a, 813.1.c.1). With one ready rune that is nothing
that removes a 5, but with three it is `UNL-128 Star-Crossed`, §5. Played second, it opens nothing
that matters: the count is already paid.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Going first, you
have seen **6** cards by T2, **7** by T3 and **8** by T4. With three copies of each (103.2.b: *"Your
Main Deck can include up to 3 copies of the same named card."*), a Galio among the first 6 is
**40.30%**, a Jayce among the first 7 **45.73%**, a Jaull-Fish among the first 8 **50.82%**, and all
three **7.35%**.

## 5. Breaks to

**What the engine did, and the predicate.** On your T4 two Mighty bodies made a ready Jaull-Fish six
runes' worth of affordable, and it was the second body in the attack that took B. The predicate is:
played on their T3, or on your T4 before combat damage, does it leave your T4 attack short of B's 14,
or the Jaull-Fish unplayable on T4?

**The scope.** A Fury/Chaos deck plays only Fury, Chaos and Fury/Chaos cards (103.1.b.1), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* Loose Cannon's tag is Jinx. The
predicate is: a card in those domains in `data/cards.json` (not a legend, battlefield, rune or token),
not a Signature card with another champion's tag. Folded by name, that is **252** cards. Of the five
Signature cards in those domains, four carry another tag and are out (`OGS-018 Tibbers`, `SFD-186
Spinning Axe`, `UNL-186 Death from Below`, `VEN-144 Death Mark`); Jinx's own `OGN-252 Super Mega
Death Rocket!` is in. Five of the 252 are banned in constructed (`OGN-168 Fight or Flight`, `OGN-177
Stealthy Pursuer`, `OGN-182 Scrapheap`, `SFD-020 Draven, Vanquisher`, `SFD-122 Called Shot`), which
leaves **247**.

**Taking a Mighty body does not stop the Jaull-Fish; it prices it.** With one Mighty body left it is E6
+ 3 Body Power ready: all six of your T4 runes, three recycled. It is still played, still ready. What
an answer can take is the attack. So the body that matters is the one that attacks.

**Window 1: their T3, against your two Mighty bodies.** Their own Main Phase, six runes. Swept over the
247 for *kill*, *deal*, *return*, *banish*, *control* or a Might penalty together with *unit*: **63**
cards, each read; a second sweep of the other 184 for *hand*, *temporary*, *recall*, *recycle* or a
Might clause added `OGN-008 Get Excited!` and nothing else that removes a unit. A Might penalty *"this
turn"* played on their turn expires before yours. What is left splits by where it reaches.

- **Into your base, where Jayce is: three cards.** `OGN-252 Super Mega Death Rocket!` (Fury/Chaos, E4 +
  1 Power; *"Deal 5 to a unit. When you conquer, you may discard 1 to return this from your trash to
  your hand."*) kills him outright: four runes, one recycled. `OGN-187 Whirlwind` (Chaos, E3 + 1 Chaos
  Power; *"Starting with the next player, each player may return a unit to its owner's hand."*) and
  `UNL-128 Star-Crossed` (Chaos, E3 + 1 Chaos Power; *"[Reaction] (Play any time, even before spells
  and abilities resolve.) Return a friendly unit and an enemy unit to their owners' hands."*) return
  him, three runes, one recycled, and each sends a unit of theirs home too. With Jayce gone, the attack
  is the Jaull-Fish 6 and the Ramhound 3, and the Jaull-Fish costs all six runes. After the Rocket and
  the Rearguard, B is 11, and 9 do not take it. After Star-Crossed they choose their own unit, the Pouty
  Poro, and play the Duo with their last three runes: B is 10, and their 10 kill both attackers while
  your 9 leave one of theirs standing. Whirlwind does not break it: you return
  first, and you return Jinx. B is then 5, the Duo makes it 8, and your 9 kill all three, 3 + 2 + 3,
  while their 8 kill the Jaull-Fish and leave the Ramhound. **The cheapest that breaks the attack is
  Star-Crossed, three runes and one Chaos Power, and it costs them most of their T3.**
- **Only at a battlefield, where Galio is.** `OGN-172 Rebuke` (Chaos, E2 + 2 Chaos Power), `VEN-106
  Wind and Ghosts` (Chaos, E3 + 1 Chaos Power), `OGN-188 Zaunite Bouncer` (Chaos, E4 + 2 Chaos Power),
  `OGN-180 Fading Memories` (Chaos, E4 + 1 Chaos Power, killed at the start of your Beginning Phase)
  and `OGN-008 Get Excited!` (Fury, E2 + 1 Fury Power, discarding a card of 6 Energy or more). Each
  pays one more Power to choose him, 809.1.c: *"It is functionally short for "Spells and abilities an
  opponent controls that target [me/this] cost an amount of Power equal to [Deflect Value] more to
  play as an additional cost for each time they choose [me/this].""* And each one misses: Galio deals
  no combat damage and is not in the attack. The Jaull-Fish then costs E6 + 3 Body Power, the Daring
  Poro waits, and B falls the same way.
- `OGN-033 Shakedown` (*"Choose an enemy unit. Deal 6 to it unless its controller has you draw 2."*)
  leaves the choice with you: they draw two, Jayce stays.

`VEN-008 Ruthless Strike` and `OGN-014 Sky Splitter` deal 5 only at a battlefield, where the Mighty body
is Galio's 6. `OGN-029 Falling Star` deals 3 and 3; whether both may choose Jayce is not ruled here, and
it is not counted.

**Window 2: Jayce's trigger on your T4.** Before your Beginning Phase his trigger is on the chain and
they may answer with a Reaction (309.1.a). **23** of the 247 carry [Reaction] in their text. With one
ready rune none of them removes a 5. With three, Star-Crossed returns Jayce there, before the count:
the Jaull-Fish is E6 + 3 Body Power and the attack is 9 against B. Keeping three runes up through their
T3 leaves them three to spend, so B gets the Duo and not the Rearguard, 12, and Star-Crossed takes one
of their own back to hand as well, 10 at most. Nine still do not take it.

**Window 3: the combat on your T4. The cheapest card that touches the line is here.** After you pass
Focus they play [Action] and [Reaction] cards with the runes they kept, 806.1.b: *"Action grants the
corresponding card or effect permission to be played or activated during Showdowns, even when it is
not the Controlling player's turn."* **51** of the 247 carry [Action] or [Reaction]. The attack wins by 2. Anything that takes the Ramhound out of the combat takes 3 off your side: 13 against 14, your 13
cannot kill all five of theirs, and their 14 kill Jayce and the Jaull-Fish. B stays theirs, and you have
spent three Body runes for nothing.

- **`OGN-169 Gust`** (Chaos, E1; *"[Reaction] (Play any time, even before spells and abilities resolve.)
  Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."*) returns the Ramhound.
  **One rune, no Power, and it is the one rune they kept in the walk.**
- `OGN-009 Hextech Ray` (Fury, E1 + 1 Fury Power; *"Deal 3 to a unit at a battlefield."*) kills it: the
  same one rune, recycled.
- Every deal-3-or-more card at a battlefield above that costs more.

The Rocket in your base on their T3 is the clean answer, and the Gust is the cheap one. Neither answers the
discount. The Jaull-Fish is played in every line here; what they deny is the turn it was bought for.

## 6. Verdict

**Right about [Shield], [Assault] and the floor; wrong about what Garen is, and silent on [Accelerate]
and on the runes.** The count is read on the chain (354, 356) from current Might on the board (708,
710), so a body that is a 5 only in combat counts its printed number, and 356.6 floors the Energy and
leaves the Power. But the discount is applied after [Accelerate] is added (356.2, 356.4, 356.4.f), so
four Mighty bodies make the ready Jaull-Fish E0 + 3 Body Power, and nineteen mono-Body units that
print 5 or more cost less than Garen's E6 + 1 Body Power.
Walked going first against a Jinx deck that stacked its battlefield to 14, Galio and Jayce made two,
the Jaull-Fish came down ready on T4 for four runes, and with Jayce and the Ramhound it took B: **4 to
2** after their T4. Spending the same turn on Garen is **3 to 3**; at full price the Jaull-Fish is not
a T4 card at all. The price the discount cannot touch is three recycled Body runes: the line ends T4
with three runes on the board against the control's five, and 30.30% of rune orders cannot pay it on
T4. The attack wins by two, so the cheapest card that breaks the turn is Gust on the Ramhound, one
rune, in the combat.

## 7. Not verified

I did not deal the channel order. The walk assumes six Body and six Order runes for you, Might of
Demacia's two domains, in the twelve of Tournament Rules 402.1. Galio on T2 needs an Order among your
first four: it fails in **28 of 924, 3.03%**. Jayce on T3 and the ready Jaull-Fish on T4 need four
Body among your first eight, since four Body leave the board: with Galio's Order as well, the line
fails in **280 of 924, 30.30%**. The Jaull-Fish without [Accelerate] needs three Body among eight, and
with Galio's Order fails in **56 of 924, 6.06%**, but then it does not attack. The Garen control needs
a Body among six for Jayce and a second among eight for Garen: with Galio's Order, **29 of 924,
3.14%**.

Their walk assumes six Fury and six Chaos. Jinx on T2 needs a Fury among their first five: it fails in
**7 of 924, 0.76%**. Star-Crossed on their T3 needs a Chaos among seven: **0 of 924**.
Rebuke on Galio needs two, with its [Deflect] Power of any domain: **7 of 924, 0.76%**. Hextech Ray on your T4 needs a second Fury among seven, the
first having gone to Jinx: **7 of 924, 0.76%**. The Rocket's Power is Fury or Chaos, and Gust takes any
rune.

**How likely an answer is.** Out of their own **39**, by your T4 they have seen **7** cards: four
opening and a draw on each of their three turns; the legend does not draw before their T4. A Gust, run
three times, is among them in **45.73%**; a Rocket or a Star-Crossed, the two base-reaching answers
that break the attack (six cards), **72.23%**. Those are before the deal. The walk fixes their opening
four as non-answers, which leaves three draws from the other **35**: three Gusts among them is
**24.22%**, the six **44.17%**. These count only the cards named, not how many of them a deck runs.

Whether the Jaull-Fish counts itself is not ruled here. On the chain it is in a non-board zone, 328:
*"The Chain is a Non-Board Zone that temporarily exists whenever a card is played or an ability is
activated."* And there it is Mighty by its printed 6, 711: *"Units in Non-Board Zones are evaluated
according to their printed Might."* Its text counts *"each of your [Mighty] units"*. 355.9.a.1 says
*"“Unit,” “gear,” and “rune” refer to objects on the Board unless specified otherwise."*, but it is a
paragraph about targets, and the count targets nothing. The walk reads the board only, which is the
dearer reading. Counted, the ready Jaull-Fish would be E2 + 3 Body Power on T4, and the walk's turn is
unchanged but for two more runes ready.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2, a rune split other than six and six, their other assignment in the T4 combat (5 on
Jayce, which he survives as an attacker and not after: 143.2.a, *"If a Unit ever has nonzero damage
marked on it equalling or exceeding its Might, it is Killed."*), `UNL-013 Lotus Trap` hidden at B in
that combat, `UNL-139 Bone Skewer` (it makes you play a unit from your hand to a battlefield, ignoring
its costs), `OGN-150 Kraken Hunter` in place of Jayce, and the board after their T4.

## Leads

- The notable *"Four Mighty bodies make him 0 Energy + 2 Power, and a fifth is wasted"* and the ledger
  *"a Jaull-Fish played for 1 Energy + 2 Power plus 1 Energy + 1 Body Power"*: [Accelerate] is an
  additional cost added in 356.2, before the discount in 356.4, and 356.4.f lets a discount reduce it
  to 0. Ready, the Jaull-Fish is E8 + 3 Body Power less 2 per Mighty body: three make it E2 + 3 Body
  (the entry's sum, by a different route), four make it E0 + 3 Body, not E1 + 3 Body. Without
  [Accelerate], the fourth body is worth 1 Energy, not 2.
- The notable *"read Garen as the cheapest way to be certain of it (printed 5, no condition, no pump
  needed)"*: nineteen mono-Body units with printed Might 5 or more cost less than Garen's E6 + 1 Body
  Power, by Energy or by Power. Cheapest are `OGN-150 Kraken Hunter` (E3 + 2 Body Power, M5) and
  `VEN-088 Jayce, Hammer in Hand` (E4 + 1 Body Power, M5); six cost E5 and no Power (`OGN-131 Dune
  Drake`, `SFD-092 Combat Chef`, `UNL-100 Voracious Gromp`, `UNL-105 Imposing Challenger`, `UNL-116
  Poppy, Paragon`, `VEN-079 Dame the Despoiler`). With Order in the legend's pair, `UNL-171 Galio,
  Indefatigable` is E3 + 1 Order Power and prints 6.
- *"WHAT 'MIGHTY' IS"* cites 709, the moment a unit becomes Mighty. The state the discount reads is 708,
  *"A Unit "is Mighty" as long as its Might is 5 or greater."*, evaluated by 710 on current Might.
- *"203.1 and 356.4.b price a card as it is played"*: 203.1 says how a cost is paid, not when. The
  timing is 354 and 356, with the Jaull-Fish on the chain, and 309.1.a with 312.2.d is why the board
  you start the chain with is the board that counts.
- Step 2, the Empowered `VEN-077 Tools of Empire` pump before the Jaull-Fish: its exhaust is an
  activated ability that goes on the chain (377), so it gives the opponent a Reaction window (309.1.a,
  813.1.c.1) before the count is read. Played first in the Main Phase, the Jaull-Fish gives them none
  (316.5.b).
- The entry does not say whether the Jaull-Fish counts itself. On the chain it is in a non-board zone
  (328) and Mighty by its printed 6 (711). Not ruled here.
- Every ready Jaull-Fish recycles three Body runes (164.2.b, 805.1.a.1) at every Mighty count, and
  the entry's ledger prices only Energy. On T4 going first, with six Body and six Order runes, that
  fails in 30.30% of rune orders.
- No answer is named. A removal on one Mighty body raises the Jaull-Fish by 2 Energy and does not stop
  it. `OGN-252 Super Mega Death Rocket!` kills a printed 5 anywhere and `UNL-128 Star-Crossed` returns
  one, and either breaks the walked T4 attack; the 6s survive the Rocket. `OGN-169 Gust`, one rune, takes
  the attack's third body in the combat.
