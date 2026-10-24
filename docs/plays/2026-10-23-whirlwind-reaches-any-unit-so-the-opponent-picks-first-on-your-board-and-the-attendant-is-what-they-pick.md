# Play — Whirlwind reaches any unit, so the opponent picks first on your board, and the Attendant is what they pick

Issue #416 (a slice of #200), 2026-10-23. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `whirlwind-cemetery-attendant-choose-last`**, the Chaos ENGINE in which `OGN-187 Whirlwind`
(E3 + 1 Chaos Power) lets each player return a unit to its owner's hand, the opponent first, and
`OGN-165 Cemetery Attendant` (E3 + 1 Chaos Power, M3) is the unit you return so that its play trigger
fetches another unit from your trash. The entry is right that you choose last and that nobody pays
[Deflect]. It is wrong about whose unit each player may choose. Whirlwind says *"a unit"*, and a unit
is any unit on the board, so the opponent, choosing first, may return one of yours. Walked as a game,
going first, under `SFD-185 Glorious Executioner` against the Calm/Order Leona deck that pairs `SFD-157
Royal Guard` with `VEN-119 Keeper of Law`, the Attendant came down on T3 and brought back the Legion
Rearguard their Daring Poro had killed. Whirlwind on T4 was answered on your own board. With your
trash empty, the opponent's best first pick is the Attendant itself, since replaying it costs a
recycled rune for an empty fetch. You chose last and returned their Sand Soldier, which as a token
ceases to exist. Score after their T4: **3 to 3**. The same hand with Whirlwind kept in hand, and with
`OGN-016 Dangerous Duo` in the Attendant's place, also ends **3 to 3**. Each engine card cost one rune
for good and moved no point. If their Keeper goes to base instead of the battlefield, it ends **4 to
3** with or without Whirlwind. Cast on T3, as soon as it can be, Whirlwind costs the T3 Conquer and
leaves the Keeper's discount intact: **1 to 2** after their T3. The cheapest answer is `OGN-045 Defy`,
one ready rune and one Calm Power: it counters Whirlwind. Nothing in their 254 cards counters the
Attendant's trigger.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-23 at `3d68575`, reads
773 entries, 262 with forced-ordering language, **99 in the queue and 11 of them with no play**. The
issue measured 100 and 11 at `3d32c74`. The queue lost one entry, and the two picks are unchanged and
one rank higher. The pick is by global rank, skipping entries that already have a play: this entry is
rank 90, the second in the list. The other entry of this slice is rank 89,
`iterative-design-production-surge-mech`. Both decks are the ones walked in
[the Guard's pair has to walk out of base, and one answer is not enough to stop the Keeper's discount](2026-10-18-the-guards-pair-has-to-walk-out-of-base-and-one-answer-is-not-enough-to-stop-the-keepers-discount.md),
with the seats swapped: here the Draven deck goes first and carries the engine.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-185 Glorious Executioner` (Fury/Chaos, tag Draven) |
| **Chosen Champion** | `OGN-028 Draven, Showboat` (Fury, E5 + 1 Fury Power, M3), never played in the walk |
| **The engine** | `OGN-187 Whirlwind` (Chaos spell, E3 + 1 Chaos Power) and `OGN-165 Cemetery Attendant` (Chaos, E3 + 1 Chaos Power, M3), one copy each as the entry declares |
| **The other bodies** | `OGN-010 Legion Rearguard` (Fury, E2, M2), `OGN-018 Noxus Saboteur` (Fury, E3, M3), `OGN-012 Noxus Hopeful` (Fury, E4, M4), `OGN-013 Pouty Poro` (Fury, E2, M2) |

The entry admits any legend with Chaos in its pair. Glorious Executioner is the one for this walk
because its text is a draw that fires on a won combat and nothing else: *"When you win a combat, draw 1.
(You win if only your units remain after combat.)"* It fires once. Its tag is Draven, so Draven,
Showboat can be the Chosen Champion, 103.2.a.2: *"Must be a champion unit with a champion tag that
matches the tag on your Champion Legend."*

Both engine cards are mono-Chaos, so a Fury/Chaos deck admits them, 103.1.b.3: *"If a card has a single
Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain."* Three
copies of each is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the same named
card."* The walk uses one of each, as the entry declares, and §4 prices three. None of the cards in
this play is a Signature card (`signature` in `data/cards.json`), and none is in
`data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Whirlwind: *"Starting with the next player, each player may return a unit to its owner's hand."*
- Cemetery Attendant: *"When you play me, return a unit from your trash to your hand."*
- Noxus Hopeful: *"[Legion] — I cost :rb_energy_2: less. (Get the effect if you've played another card
  this turn.)"*

## 2. Who chooses, what they may choose, and what it costs

**The opponent chooses first.** Whirlwind has neither [Action] nor [Reaction], so it is played on your
own turn, 155: *"A spell can be played during an Open State outside of Showdowns on its controller's
turn."* You are the Turn Player when it resolves. No paragraph defines "the next player" for the order
of an effect's choices; 115.1.c defines the order of turns: *"The Turn Order generates a looping queue
of turns, starting with the First Player and repeating until the game ends."* Reading "the next
player" as the next one in that order is the natural reading, not a derivation. On it, in a Duel the
next player after you is the opponent, so they choose first and you choose second, knowing what they
did. *"May"* lets either of you decline.

**"A unit" is any unit, yours or theirs.** The card does not say *"a unit they control"* or *"a friendly
unit"*, and *"to its owner's hand"* only has work to do if the unit can be someone else's. The rules
attach no controller to a unit a spell specifies, 141.1.a.3, listed under 141.1.a, *"While on the
Board:"*: *"Units can be chosen, affected, or manipulated by spells, affects, or game actions that
specify Units."* Where that unit is comes from 355.9.a.1: *"“Unit,” “gear,” and “rune” refer to
objects on the Board unless specified otherwise."* That paragraph sits in the targeting block (355.9),
and Whirlwind does not target (below) [2026-10-24: 355.12 was weighed and R34 was ruled A by the owner (issue #11, https://github.com/GermanAbuArab/RiftCombo/issues/11#issuecomment-6377957070): Whirlwind does not target and 355.10.e governs. 355.12: *"If a spell specifies that a player may perform a Game Action on some number of Game Objects, then all choices are considered targeted and chosen independently of the decision to perform the Game Action."*], so it fixes the zone and nothing more. Compare the rules' own
example of a symmetric choice, which does restrict it, 355.10.e: *"e.g., “Each player kills a unit they
control” does not target. Each player, including the one who played the spell, chooses a unit to kill
as the spell or ability resolves."* Whirlwind has no *"they control"*. So each player may return any
unit on the board to its owner's hand: the opponent's first choice is usually a unit of **yours**, and
yours is usually one of **theirs**. The pool's own one-sided bounces spell out whose unit, as `SFD-132
Beast Below` does: *"return another friendly unit and an enemy unit to their owners' hands."*

**Nothing is targeted, so nobody pays [Deflect].** [2026-10-24: 355.12 was weighed and R34 was ruled A by the owner (issue #11, https://github.com/GermanAbuArab/RiftCombo/issues/11#issuecomment-6377957070): Whirlwind does not target and 355.10.e governs. 355.12: *"If a spell specifies that a player may perform a Game Action on some number of Game Objects, then all choices are considered targeted and chosen independently of the decision to perform the Game Action."*] 355.10.e: *"It is part of a set of objects chosen
in whole or in part by other players."* The returned units are such a set. [Deflect] taxes only a
target, 809.1.c: *"It is functionally short for "Spells and abilities an opponent controls that target
[me/this] cost an amount of Power equal to [Deflect Value] more to play as an additional cost for each
time they choose [me/this].""* That matters more than the entry says, because you may choose an enemy
[Deflect] unit with Whirlwind and pay nothing for it.

**A token returned to hand is gone.** 186.1: *"If a token is put into any Non-Board Zone besides the
chain, it ceases to exist immediately after moving to its new zone."* A hand is a non-board zone. A
returned token is a kill, and the opponent's first choice cannot protect it.

**The Attendant's trigger does target.** 355.10.a counts a unit in a trash as a target, because a trash
is a public zone, and its own example is the Attendant's sentence word for word. It needs a unit of
yours in your trash when it resolves. With none there, it does nothing.

**Leaving a battlefield.** A unit returned from a battlefield you control can cost you the battlefield,
190.4.c: *"If a player has no Units at a Battlefield and the turn is in an Open state, they lose
Control of that Battlefield in the following cleanup unless there is a Combat or Showdown ongoing
there."* Taking it back the same turn scores nothing if you already scored it, 470: *"A player may
only Score, from either method, once per Battlefield per turn."*

**The cost of one cycle.** Whirlwind, then the Attendant played again, is E3 + 1 Chaos Power twice: six
Energy and two Power. Power is paid by recycling a rune, 164.2.b: *"Recycle this: [Reaction] — Add
[C]."* A rune exhausted for Energy can be recycled for the Power, so each card costs three runes and one
of them leaves the board. A cycle is two runes gone for good, and it returns one card from the trash.
Counting your cards in hand and on the board: Whirlwind spent, the Attendant from the board to your
hand, and the fetched unit into your hand. That is one card down before the fetch and even after it.

**The runes, going first.** You have 2, 4, 6 and 8 runes channelled on T1 to T4, less one recycled on
T3: 7 on T4. A unit enters exhausted, 143.4: *"Units enter the Board exhausted."* Units move from base
to a battlefield and back, never between battlefields, 144.4.b: *"Units may move from a Battlefield to
their Base."*

## 3. Their deck: Calm/Order Leona

The deck of the Guard play linked above. `OGN-261 Radiant Dawn` (Calm/Order): *"When you stun one or
more enemy units, buff a friendly unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff.)"*;
nothing in the walk stuns. Its Chosen Champion is `OGN-238
Leona, Determined` (Order, E4 + 1 Order Power, M4), never played. The engine is Royal Guard (Order, E4,
M2): *"When you play me, play a 2 :rb_might: Sand Soldier unit token here."* Then Keeper of Law (Order,
E5 + 1 Order Power, M5): *"I cost :rb_energy_2::rb_rune_order: less if you control a battlefield with
exactly two units there."* The Keeper's cost is read while he is on the chain: 354, *"1. Move the card from its current zone to
the Chain."*, comes before 356, *"3. Determine Total Cost."*, and 328 says *"The Chain is a Non-Board
Zone that temporarily exists whenever a card is played or an ability is activated."*
Their other bodies are `OGN-210 Daring Poro` (Order, E2, M2, [Assault]), `OGN-054 Sunlit Guardian`
(Calm, E3, M3, [Shield], [Tank]), `SFD-159 Trusty Ramhound` (Order, E2, M2), `OGN-218 Vanguard Captain`
(Order, E3 + 1 Order Power, M3, [Legion] two 1-Might Recruits) and `OGN-044 Clockwork Keeper` (Calm,
E2, M2). Going second, they channel an extra rune on T1, 485.7: *"First Turn Process: The player going
second channels an extra Rune from their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Fury/Chaos against Calm/Order. Your battlefield is A, `SFD-210 Hall of Legends` (*"When you conquer
here, you may pay :rb_energy_1: to ready your legend."*, and your legend has no exhaust ability); theirs
is B, `OGN-282 Monastery of Hirana` (*"When you conquer here, you may spend a buff to draw 1."*, and
nobody has a buff). Your opening four are Legion Rearguard, Noxus Saboteur, Cemetery Attendant and
Whirlwind. Your draws are Pouty Poro (T1), Dangerous Duo (T2), Noxus Hopeful (T3), `OGN-171 Mystic
Poro` (the legend's draw on T3) and `OGN-006 Flame Chompers` (T4). Their opening four are Daring Poro,
Royal Guard, Keeper of Law and Sunlit Guardian. Their draws are Clockwork Keeper (T1), Trusty Ramhound
(T2), `OGN-216 Soaring Scout` (T3) and Vanguard Captain (T4).

```
turn      runes   your turn                                                 points
T1        2       Legion Rearguard (E2) to base. None left.                 0
their T1  3       Daring Poro (E2) to base. One left.
T2        4       The Rearguard walks to A, Conquer: +1. Noxus Saboteur     1
                  (E3) to base. One left.
their T2  5       Daring Poro attacks A: 3 against the Rearguard's 2. The
                  Rearguard dies, Conquer. Royal Guard (E4) to base; its
                  Sand Soldier is in base too. One left.
T3        6       The Saboteur attacks A: 3 against the Poro's 2. The Poro  2
                  dies, Conquer: +1, and the legend draws 1. Cemetery
                  Attendant (E3 + 1 Chaos Power) to base: the Rearguard
                  comes back to your hand. Noxus Hopeful (E2 with Legion)
                  to base. Six runes, one recycled; one left.
their T3  7       The Guard and the Soldier walk to B, empty, Conquer.
                  Keeper of Law (E3, no Power) to B. Sunlit Guardian (E3)
                  to B. One left.
T4        7       Hold A: +1. Whirlwind (E3 + 1 Chaos Power): they return   3
                  the Attendant, you return the Sand Soldier, which
                  ceases to exist. Rearguard (E2) and Pouty Poro (E2) to
                  A. Seven runes, one recycled; none left.
their T4  9       Hold B. Trusty Ramhound (E2), Vanguard Captain (E3 + 1
                  Order Power) and Clockwork Keeper (E2) to B. Nine
                  runes, one recycled; two left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T3 it
is **2 to 1**; after their T3, **2 to 2**; after your T4, **3 to 2**; after their T4, **3 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after the Rearguard; 5, then 4 after the Saboteur; 5
after the T3 draw, 6 after the legend's draw, 5 after the Attendant, 6 with the Rearguard back, 5 after
the Hopeful; 6 after the T4 draw, 5 after Whirlwind, 6 with the Attendant back, 4 after the Rearguard
and the Poro (Dangerous Duo, Mystic Poro, Flame Chompers, Cemetery Attendant). Theirs: 5 after the T1
draw, 4 after the Poro; 5, then 4 after the Guard; 5 after the T3 draw, 3 after the Keeper and the
Guardian; 4 after the T4 draw, 1 after the three bodies (Soaring Scout).

**Their T2: the attack that fills your trash.** The Poro attacks as 3, 2 and its [Assault], and the
damage is summed and assigned, 465.2.c: *"Starting with the Attacker, each player assigns an amount of
damage equal to their summed Might among the other's Units."* Its 3 are lethal on the Rearguard,
142.4.b: *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s Might."*
The Rearguard's 2 are not lethal on the Poro, which is still a 3 when the combat cleanup kills: the
cleanup is the first step of the resolution, 466.1.a.1: *"Insert “3c. Heal all Units.”"*, and the
designation is removed only at the end, 466.7.a: *"Remove Attacker and Defender Designation from all
Units and Players."* [Assault] lasts that long, 807.1.d.1: *"Assault remains in effect as long as the
Unit maintains the Attacker designation."* Only their unit is left at A, 466.5.d: *"Establishing
Control results in a Conquer if that player has not yet scored this Battlefield this turn."* Taking
empty B instead would also score, but it would leave you A to Hold on T3. The Guard goes to base, as in
the Guard play: played to A it would make three there, not the two the Keeper wants.

**Your T3: the fetch, and a body that is cheaper for it.** The Poro defends as 2, since [Assault] counts
only on the attack, and the Saboteur's 3 kill it and take A back. Only your units remain, so the legend
draws. The Attendant then brings back the Rearguard, which is in your trash only because they attacked.
Playing the Attendant also turns on the Hopeful's [Legion]: *"if you've played another card this
turn"*. So the Hopeful costs two, and six runes put a 3 and a 4 in base with one rune left.

**Their T3: the pair walks, and the Keeper goes where he is discounted.** The Guard and the Soldier walk
into empty B together, a non-combat showdown and a Conquer. B then has exactly two units, so the Keeper
costs three and no Power. He can be played to B, which they control, 355.2.a: *"By default, Valid
locations include the controller’s Base or a Battlefield the controller controls."* His cost is
already paid when he arrives there. The Guardian follows him to B. B defends as 2 + 2 + 5 + 3 + 1
(Shield) = **13**, and your 7 in base do not attack it.

**Your T4: Whirlwind, answered on your board.** You Hold A, 469.2: *"Hold: A player maintains Control of
a Battlefield they did not yet Score this turn during their Beginning Phase."* Whirlwind resolves, and
the opponent chooses first among the Saboteur at A and the Attendant and the Hopeful in base:

- **The Attendant**, their best. Your trash is empty, so replaying it is three runes and a recycled one
  for a 3-Might body and a fetch of nothing.
- The Hopeful costs you two with [Legion] to replay, and the Saboteur three.
- Returning the Saboteur from A empties A, and you lose it in the cleanup (190.4.c). The Hopeful walks
  back in on the same turn, scoring nothing (470), and you Hold A next turn as before.

You choose second. **The Sand Soldier**, which ceases to exist (186.1). It is the one object on their
side that their first choice could not have saved, and it is half the card that made the Keeper cheap.
B is now 11. The four runes left put the Rearguard and Pouty Poro on A. **3 to 2.**

**Their T4.** Nothing of theirs can reach A: everything they have is at B, and from a battlefield a
unit goes only to base (144.4.b). They Hold B and play three bodies there. **3 to 3.**

**Returning the Keeper instead.** You choose him, and he goes to their hand. On their T4 B holds the
Guard, the Soldier and the Guardian, three, so the Keeper would cost full price. They walk the Guardian
home, which makes B exactly two again, and the Keeper comes back for three runes and no Power. A body
that only has to be cheap is cheap again after one move. **3 to 3**, and the Soldier is still there.

**The control: Whirlwind kept in hand.** The same hand on T4 plays Pouty Poro, Dangerous Duo (its
[Legion] +2 has nothing to do) and the Rearguard to A for seven runes, with none recycled. B is 13,
nothing attacks, and nothing of theirs can reach A. **3 to 3.** The difference from the main line is
on the board, not on the scoreboard. They keep the Soldier; you have one more body at A, one more rune,
and Whirlwind still in hand instead of the Attendant.

**The control: Dangerous Duo in the Attendant's place.** On T3 the Duo (E3) and then the Hopeful (E2
with [Legion]) are the same 3 and 4 in base for five runes, none recycled, and the Rearguard stays in
the trash. On T4 you have **8** runes, not 7. You Hold A, and Whirlwind takes four of them, one
recycled. The opponent's first pick is now the Duo in base or the Saboteur at A, each E3 to replay;
the Hopeful replays for two under its own [Legion], since Whirlwind is a card played this turn. Say
they take the Duo. You return the Sand Soldier as before, and the four runes left put Pouty Poro and
Mystic Poro (E2 each) on A instead of the Rearguard and Pouty Poro. Nothing of theirs can reach A
(144.4.b), they Hold B and play the same three bodies there: **3 to 3**, with seven runes on the board
against the main line's six. The Attendant bought back one card for one rune.

**Their other T3: the Keeper to base.** If the Keeper goes to base, B is 2 + 2 + 3 + 1 = **8**, and on
your T4 your base holds the Attendant's 3 and the Hopeful's 4.

- **Without Whirlwind**, Pouty Poro, then the Duo with its +2 on the Hopeful, then the Rearguard: 3 + 6
  = **9** against 8. You assign 4 to the [Tank] Guardian first, then 2 and 2, and everything of theirs
  dies. Their 8 kill one of your two, and the other is left. Conquer and a draw: **4 to 2**. On their
  T4 the Keeper, ready in base, takes B back from your lone survivor: **4 to 3**.
- **With Whirlwind**, the Duo after it for three runes. They choose first, and every choice loses B. If
  they return the Attendant, you return the Guardian, and the Hopeful, at 4 + 2 = 6, kills the Guard
  and the Soldier and survives their 4. If they return the Hopeful, the Attendant at 5 does the same. If
  they return nothing or the Saboteur, both of yours attack. Conquer and a draw: **4 to 2**. Their best
  pick leaves you one attacker, and the Keeper takes B back from it on their T4: **4 to 3**.

Where the Keeper stands decides 3 to 3 or 4 to 3. Whirlwind decides neither.

**The early Whirlwind: T3.** Cast on T3, before the Keeper exists, with the Saboteur ready in base and
their pair in base. They choose first and return the Saboteur, your only attacker, so A stays theirs.
You return the Sand Soldier, which breaks the pair. Then three runes are left, enough for the
Attendant. On their T3 they Hold A, and the Guard walks to A beside the Poro. A battlefield they control
then has exactly two, and the Keeper costs three anyway. If you return the Poro instead, A is empty, and
their pair walks into either battlefield as two. **1 to 2** after their T3. Whirlwind first costs the
Conquer the Saboteur was ready for, and it cannot stop a discount that any two bodies make.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 7 cards by T3 and 8 by T4, not counting the legend's
draw. With one copy of each, as declared: the Attendant among the first 7 is **17.95%**, Whirlwind
among the first 8 **20.51%**, both on time **3.31%**. With three of each, the 103.2.b cap: **45.73%**,
**50.82%** and **21.71%**. And the Attendant's fetch needs a unit of yours dead by T3, which in this
walk the opponent supplied.

## 5. Breaks to

**What the engine did, and the predicate.** On your T3 the Attendant returned the Rearguard to your
hand; on your T4 Whirlwind removed the Sand Soldier for good. The predicate is: cast or played by them,
on your T3 or T4, or prepared on their T2 or T3, does it stop the fetch or stop Whirlwind?

**The scope.** A Calm/Order deck plays only Calm, Order and Calm/Order cards (103.1.b), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* The predicate is: a card in
`data/cards.json` whose domains are all Calm or Order (tokens carry no domain), not a legend,
battlefield or rune, and not a Signature card with another champion's tag. Folded by name, that is
**254** cards. Of the four Signature cards in those domains, three carry another tag and are out
(`SFD-198 Arise!`, `UNL-196 Daisy!`, `VEN-148 Shadow Dash`); Leona's own `OGN-262 Zenith Blade` is in.

**What can be played on your turn.** Both engine cards resolve from the chain, and while a chain exists
the turn is closed, 309.1: *"If a Chain exists, the turn is in a Closed State."* Only [Reaction] plays
there, 309.1.a: *"Only cards and abilities with the Reaction keyword can be played or activated in a
Closed State."* **45** of the 254 have [Reaction], [Hidden] or [Ambush] in their text (the regex
`\[(Reaction|Hidden|Ambush)\]`, case-insensitive, on the whole text with reminder text left in). The
walk leaves them **one ready rune** on your T3 (five, less the Guard's four) and one on your T4 (seven,
less the Keeper's three and the Guardian's three). Any rune can be recycled for Power. Nine of the 45
cost one Energy or less.

**Whirlwind: one card breaks it.**

- **`OGN-045 Defy`** (Calm, E1 + 1 Calm Power): *"[Reaction] (Play any time, even before spells and
  abilities resolve.) Counter a spell that costs no more than :rb_energy_4: and no more than
  :rb_rune_rainbow:."* Whirlwind costs three and one. The ready rune pays the Energy and a Calm rune is
  recycled for the Power. The Soldier stays, the Attendant stays on your board, and your four runes are
  spent. **One ready rune and one Calm Power, and it costs them a rune for good.** The score is still 3
  to 3.

The other eight do not. `VEN-039 Crumbling Sands` counters a spell only *"if an opponent has played
another spell this turn"*, and Whirlwind is your first spell. `OGN-046 En Garde`, `UNL-031 Combat
Experience`, `UNL-046 Friendship` and `VEN-040 Decree of Focus` give Might, and nothing here is a
combat. `UNL-173 Sacrifice` needs a friendly Mighty unit, and the Keeper is a 5 at B, but killing him
does not keep the Soldier. `OGN-081 Seal of Focus` and `OGN-245 Seal of Unity` are gear abilities, and
neither gear is on the board. The pool's other three counters are out of reach of one ready rune:
`SFD-045 Not So Fast` (E2), `OGN-064 Wind Wall` (E3), `UNL-044 Flurry of Feathers` (E4).

*A card hidden at B on their T3.* They control B once the pair takes it, and hiding costs one Power
from a recycled rune, 811.1.b: *"While this card is in your hand or in your Champion Zone on your turn
during an Open State, you may pay [A] to hide this facedown at a battlefield you control that doesn't
already have a facedown card hidden there for as long as you control that battlefield. Beginning on the
next turn, this gains [Reaction] and you may play this, ignoring its base cost."* Their one rune left on
T3 pays for it, and then they have none ready for Defy. **11** of the 254 carry [Hidden], and none
counters a spell. `OGN-077 Zhonya's Hourglass` replaces a death, and a token returned to hand does not
die; it ceases to exist (186.1). `SFD-043 Emperor's Divide` moves their units at B to base, where the
Soldier can still be chosen. The other nine add, stun, kill or move a unit, which does not stop a
return to hand. Not one of the eleven stops Whirlwind.

**The fetch: nothing counters it.** The trigger is an ability, and one card in the 254 counters an ability.
`SFD-045 Not So Fast` (*"Counter an enemy spell or ability that chooses a friendly unit or gear."*)
needs the trigger to choose a unit of theirs, and the Rearguard in your trash is yours. Defy counters
only a spell, and the Attendant is a unit. The answer has to come first. **`OGN-212 Forge of the
Future`** (Order gear, E2): *"When you play this, play a 1 :rb_might: Recruit unit token at your base.
Kill this: Recycle up to 4 cards from trashes."* Played on their T2 after the Rearguard dies, and killed
at once, it empties your trash. It costs two of their five runes, so the Royal Guard (E4) does not come
down that turn, and the pair is a turn late.

**What the census says about the engine.** Their pool has five counterspells, and the one that costs a
single rune reaches Whirlwind. The fetch can be stopped only before it happens, by
emptying your trash. Their attack is what filled it.

## 6. Verdict

**Right that you choose last; wrong about what the opponent chooses.** Whirlwind returns *"a unit"*,
with no *"they control"*, and 141.1.a.3 attaches no controller to a unit a spell specifies, so the opponent picks first and picks on your board.
Nothing is targeted (355.10.e), so [Deflect] never charges, and a token returned to hand ceases to
exist (186.1), which is the one thing their first pick cannot protect. Walked against the Leona deck,
the Attendant brought back on T3 the Rearguard their attack had killed. On T4 the opponent's best first
pick was the Attendant itself, because your trash was empty and its replay costs a recycled rune for
nothing. You returned the Sand Soldier for good: **3 to 3** after their T4. Without Whirlwind it is
**3 to 3**, and with a plain 3-drop in the Attendant's place it is **3 to 3** too, a rune richer. With
their Keeper in base it is **4 to 3** with or without Whirlwind. Cast first, on T3, Whirlwind costs the
T3 Conquer and cannot stop the Keeper's discount: **1 to 2**. Each card cost one rune for good;
together they are one card back per two runes recycled for good, and they moved no point here. The
cheapest answer is Defy, one ready rune and one Calm Power, against Whirlwind. Against the fetch,
nothing in their 254 counters it, and only Forge of the Future, played before it, stops it.

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Chaos in the twelve of Tournament
Rules 402.1. The Attendant on T3 needs a Chaos rune among your first six: it fails in **1 of 924,
0.11%**, the deal with all six Fury first. Whirlwind on T4 needs a second Chaos among your first eight,
since the first was recycled: it fails in **0 of 495**. Nothing you play costs Fury Power.

Their walk assumes six Calm and six Order. The Keeper's discount removes his Order Power, so their T3
needs no particular domain. Vanguard Captain on their T4 needs an Order rune among nine: **0 of 220**.
Defy on your T4 needs a Calm among their seven: **0 of 792**.

**How likely an answer is.** Out of their own **39**, by your T4 they have seen **7** cards: four
opening and a draw on each of their three turns. Defy, run three times, is among them in **45.73%**.
Forge of the Future has to be among the **6** they have seen by their T2: **40.30%** with three copies.
These count only the cards named, not how many of them a deck runs.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2 (where the next player in Turn Order may be an ally and every player chooses), Draven,
Showboat, their T2 taking empty B instead of attacking (your trash is then empty on T3, and the
Attendant's trigger has nothing to return), and the turns after their T4. The probabilities count only
the cards named.

## Leads

- The notable *"by the same token you cannot pick THEIR body, which is the price"*, and the step *"The
  opponent chooses first — they may return one of their units to hand, or decline."*: the card
  does not say this. Whirlwind says *"a unit"*, with no *"they control"* or *"friendly"*, unlike
  355.10.e's own example, and *"to its owner's hand"* only has work to do if the unit can be someone
  else's. 141.1.a.3 (*"Units can be chosen, affected, or manipulated by spells, affects, or game
  actions that specify Units."*) attaches no controller; 355.9.a.1 puts the unit on the board, but it
  sits in the targeting block (355.9) and Whirlwind does not target, so it fixes the zone only. Each player may return any unit to its owner's hand, so the
  opponent, choosing first, may return yours, and you may return theirs. The source walk's refusal
  *"Using `OGN-187 Whirlwind` to remove an enemy body"* rests on the same reading. Two published plays
  already read the card as reaching enemy units:
  [two Mighty bodies buy a ready Jaull-Fish on T4](2026-10-18-two-mighty-bodies-buy-a-ready-jaull-fish-on-t4-and-the-three-body-runes-it-recycles-are-the-part-no-discount-touches.md)
  and
  [the Captain's draw is never a card behind his buff](2026-10-18-the-captains-draw-is-never-a-card-behind-his-buff-and-a-two-drop-played-first-is-what-turns-the-initiate-on.md).
- *"with the opponent forced to move first every time"* (`terminatesIn`): moving first is a pick on
  your board. In the walk the opponent's best first pick was the Attendant, because the trash was empty
  and its replay costs a recycled rune for an empty fetch.
- *"a repeatable recursion outlet at 3 Energy + 1 Power a cycle"*: a cycle is Whirlwind and the
  Attendant replayed, E3 + 1 Chaos Power each. That is six Energy and two Power, two runes recycled for
  good, for one card back.
- *"the exchange is card-neutral before the fetch and card-positive after it"*: off by one. Whirlwind
  is a card. Counting hand and board, a cycle is one card down before the fetch and even after it.
- The fetch needs a unit of yours in your trash when the Attendant is played. In the walk there was one
  on T3 only because the opponent attacked, and none on T4.
- `SFD-105 Ruin Runner` (*"I can't be chosen by enemy spells and abilities."*): with Whirlwind able to
  reach an enemy unit, whether your Whirlwind can return an opponent's Ruin Runner is open. 355.9.b's
  example ties *"can't be chosen"* to a target, and Whirlwind does not target. Not filed as a reading.
- No answer is named. `OGN-045 Defy` (E1 + 1 Calm Power) counters Whirlwind, and only removing your
  trash first, as `OGN-212 Forge of the Future` does, stops the fetch. A token returned by Whirlwind
  ceases to exist (186.1), which the entry does not mention and which is the card's one permanent
  removal.
