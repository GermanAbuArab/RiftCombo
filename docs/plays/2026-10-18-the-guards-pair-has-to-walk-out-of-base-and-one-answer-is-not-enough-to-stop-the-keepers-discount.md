# Play — The Guard's pair has to walk out of base, and one answer is not enough to stop the Keeper's discount

Issue #393 (a slice of #200), 2026-10-18. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `keeper-of-law-royal-guard-exact-two`**, the Order ENGINE in which `SFD-157 Royal Guard`
arrives as two bodies and `VEN-119 Keeper of Law` costs E3 and no Power, instead of E5 + 1 Order Power,
while you control a battlefield with exactly two units there. The entry is right about the discount
and about when it is read: the Keeper is on the chain when its cost is determined, so the count is the
board's, not his. Its first step cannot be done. A battlefield you control always has a unit of yours
on it (190.4.c), so the Guard played there makes three, never two. The pair is made in base and has to
walk. Walked as a game, going first, against a Fury/Chaos Draven deck, the pair walked into the
battlefield they had left empty on T3, the Keeper came down for three runes, and the three runes it
saved put `OGN-054 Sunlit Guardian` beside the pair. Their two bodies could not take that battlefield
back: **2 to 2** after their T3, **3 to 3** after their T4. The same six runes spent without the
Keeper, on the Guardian and `SFD-159 Trusty Ramhound`, hold that battlefield too and score the same.
So the discount does not buy the battlefield; it buys the Keeper's 5-Might body on T3 on top of
holding it. The line that insists on the Keeper at full price, five runes with one of them recycled,
leaves the pair alone: they take the battlefield on their T3, and it is **3 to 4** after their T4. The
cheapest card that touches the line by Energy, and the only one-rune card among them that needs no
Power, is `OGN-169 Gust`: it returns the Sand Soldier in the showdown, and the Guardian played to the
same battlefield first puts the count back at two for the same six runes. What stops the discount is a card that removes both bodies.
`OGN-029 Falling Star` does it on their T2, in your base, for two runes and two Fury Power. The pair
is not the only way to two, either: two 2-drops at your battlefield get the same T3 without the Guard.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-18 at `89c173a`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 21 of them with no play**, as
the issue measured. The two picks are unchanged: this entry is rank 81, the second in the list. The
other entry of this slice is rank 80, `mindsplitter-insightful-investigator-hand-attack`, played in
[Two XP on T2 kept Kha'Zix alive and moved no point, and T2 is the last turn their answers are all in hand](2026-10-18-two-xp-on-t2-kept-khazix-alive-and-moved-no-point-and-t2-is-the-last-turn-their-answers-are-all-in-hand.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-261 Radiant Dawn` (Calm/Order, tag Leona) |
| **Chosen Champion** | `OGN-238 Leona, Determined` (Order, E4 + 1 Order Power, M4) |
| **The pair** | `SFD-157 Royal Guard` (Order, E4, M2, and a 2-Might Sand Soldier token) |
| **The payoff** | `VEN-119 Keeper of Law` (Order, E5 + 1 Order Power, M5) |
| **The body the discount buys** | `OGN-054 Sunlit Guardian` (Calm, E3, M3) |

The entry admits any of seventeen legends with Order in their pair. Radiant Dawn is the one for this
walk: its text plays no part in the line (*"When you stun one or more enemy units, buff a friendly
unit."*), and nothing here stuns. Its tag is Leona, so Leona, Determined can be the Chosen Champion,
103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your Champion
Legend."* She is a unit, tagged Leona and Mount Targon, and not a Signature card (`signature` in
`data/cards.json`). She starts in the Champion Zone, 103.2.a.1: *"This will be placed in the Champion
Zone at the start of the game."* And she is played from there, 419.1.a: *"By default, a player can
only Play cards from their hand or their Chosen Champion zone."* She comes down on T4.

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* None is a Signature card, and none is in `data/legality.src.json` or marked
[BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Royal Guard: *"When you play me, play a 2 :rb_might: Sand Soldier unit token here."*
- Keeper of Law: *"I cost :rb_energy_2::rb_rune_order: less if you control a battlefield with exactly
  two units there."*
- Sunlit Guardian: *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I must be assigned combat
  damage first.)"*

## 2. What exactly two is, and when it is read

**The discount is read with the Keeper already on the chain.** Playing a card starts by moving it,
354: *"1. Move the card from its current zone to the Chain."* The cost comes two steps later, 356:
*"3. Determine Total Cost."* And the Keeper's text is a discount of the kind 356.4.b names:
*"Discounts may say that cards "cost [amount] less" or that one or more of their costs are "reduced by
[amount].""* So while the cost is read the Keeper is on the chain, not at any battlefield. He can be
played to the battlefield that pays for him; it holds three only once he resolves. Nothing lets the
opponent act in between: 354.1, *"This Closes the State."*, and only the Keeper's controller adds
resources while paying, 357.1.a: *"During this step, the card's controller can use activated
abilities with the Reaction tag that Add resources to add Energy and Power to pay the card's costs."*

**The Sand Soldier counts.** 185.2.b: *"Token units have a Might."* And 185.2.d: *"Tokens have a
type. They follow all rules for their type unless otherwise specified."* Its example: *"A token unit
is a unit. It enters exhausted, can take the standard move action"*.

**A battlefield you control is never empty of your units.** 190.4.a: *"If a player controls Units at
a Battlefield, outside of Combat, they maintain Control of that Battlefield for as long as they have
Units at that Battlefield."* And 190.4.c: *"If a player has no Units at a Battlefield and the turn is
in an Open state, they lose Control of that Battlefield in the following cleanup unless there is a
Combat or Showdown ongoing there."* A unit is played to base or to a battlefield you control,
355.2.a: *"By default, Valid locations include the controller’s Base or a Battlefield the controller
controls."* So the Guard played to a battlefield you control lands beside at least one unit of yours,
and that is three. The entry's first step, *"to a battlefield you control that has no other units of
yours on it"*, describes a battlefield that does not exist outside a closed state.

**So the pair is made in base and walks.** The Guard's *"here"* is read when the trigger executes,
359.3.f.2: *"Information referenced in an instruction in this way will be checked on execution of the
instruction."* Played to base, both bodies are in base. Both entered exhausted, 143.4: *"Units enter
the Board exhausted."* On the next turn they move as one action, 144.3: *"Players may perform
multiple Units' standard move simultaneously. This is treated as one game action performed on
multiple Units."* That needs one destination, 144.3.a: *"When a Move like this is declared by a
player, the units' Destination must be the same."* And 144.4.a: *"Units may move from their Base to a
Battlefield."*

**Into an empty battlefield it is a showdown, and the opponent gets a turn in it.** 316.8.b.1:
*"Showdowns that occur as a result of a player moving to an empty Battlefield are a stand-alone Phase
and do not create a Combat."* You take Focus first, 345: *"As a Showdown begins, the player who
applied Contested status to the Battlefield gains Focus."* When you pass, it goes to them, 347.2.b:
*"Otherwise, Focus passes to the next Player in Turn Order."* And [Action] plays there, 806.1.b:
*"Action grants the corresponding card or effect permission to be played or activated during
Showdowns, even when it is not the Controlling player's turn."* If only your units remain, 348.2.a:
*"If only one player’s Units remain at the Battlefield, and if that player does not already Control
the Battlefield, that player establishes Control over the Battlefield."* That is a point, 348.2.a.1:
*"This results in a Conquer if that player has not yet scored that Battlefield this turn."*

**Joining a battlefield you already hold opens no showdown.** 190.3.a.1: *"Units moving to or being
played to a battlefield apply Contested status if that battlefield is not already Contested and that
Unit’s controller does not already control that battlefield."* So one body moved or played to a
battlefield where you have exactly one makes two, and the opponent has no window to answer it. §4
uses this twice.

**Exactly two is a ceiling.** The Guardian, played after the Keeper to the same battlefield, makes
three; played before, it switches the discount off. The walk plays the Keeper first.

**The runes, going first.** You have 2, 4, 6 and 8 runes on T1 to T4. Power is paid by recycling a
rune, 164.2.b: *"Recycle this: [Reaction] — Add [C]."* A rune exhausted for Energy can be recycled for
the Power, and it leaves the board for good. At full price the Keeper is five runes, one of them
recycled. Discounted he is three, and none leaves.

## 3. Their deck: Fury/Chaos Draven

`SFD-185 Glorious Executioner` (Fury/Chaos): *"When you win a combat, draw 1. (You win if only your
units remain after combat.)"* It fires once in the walk. Its Chosen Champion is `OGN-028 Draven,
Showboat` (Fury, E5 + 1 Fury Power, M3): *"My Might is increased by your points."* Their bodies are
`OGN-018 Noxus Saboteur` (Fury, E3, M3; *"Your opponents' [Hidden] cards can't be revealed here."*,
and you hide nothing), `OGN-010 Legion Rearguard` (Fury, E2, M2), `OGN-016 Dangerous Duo` (Fury, E3,
M3; *"[Legion] — When you play me, give a unit +2 :rb_might: this turn."*, which expires before it
matters) and `OGN-013 Pouty Poro` (Fury, E2, M2). Going second, they channel an extra rune on T1,
485.7: *"The player going second channels an extra Rune from their Rune Deck during their first
Channel Phase of the game."* §5 names their answers.

## 4. The turns, going first

Calm/Order against Fury/Chaos. Your battlefield is A, `OGN-282 Monastery of Hirana` (*"When you
conquer here, you may spend a buff to draw 1."*, and nobody has a buff); theirs is B, `SFD-210 Hall
of Legends` (*"When you conquer here, you may pay :rb_energy_1: to ready your legend."*, and neither
legend has an exhaust ability to use). Your opening four are `OGN-210 Daring Poro`, Royal Guard,
Keeper of Law and Sunlit Guardian. Your draws are `OGN-044 Clockwork Keeper` (T1), `SFD-159 Trusty
Ramhound` (T2), `OGN-216 Soaring Scout` (T3) and `OGN-218 Vanguard Captain` (T4). Their opening four
are Noxus Saboteur, Legion Rearguard, Dangerous Duo and Pouty Poro. Their draws are `OGN-171 Mystic
Poro` (T1), `OGN-165 Cemetery Attendant` (T2), `OGN-006 Flame Chompers` (the legend's draw on T2) and
`OGN-012 Noxus Hopeful` (T3).

```
turn    runes   your turn                                                 points
T1      2       Daring Poro (E2) to base. None left.                      0
their T1  3     Noxus Saboteur (E3) to base. None left.
T2      4       Poro walks to A, Conquer: +1. Royal Guard (E4) to base;   1
                its Sand Soldier is in base too. None left.
their T2  5     Saboteur walks to A: 3 against the Poro's 2, Conquer;
                the legend draws 1. Legion Rearguard (E2) and
                Dangerous Duo (E3) to base. None left.
T3      6       Guard and Soldier walk to B, empty, Conquer: +1. B has    2
                exactly two. Keeper of Law (E3, no Power) to base.
                Sunlit Guardian (E3) to B. None left.
their T3  7     Hold A. Draven, Showboat (E5 + 1 Fury Power) from the
                Champion Zone to A; Pouty Poro (E2) to A; Rearguard
                and Duo walk to A. Seven runes, one recycled; none
                left.
T4      8       Hold B: +1. Keeper walks to B. Leona, Determined (E4 +    3
                1 Order Power) to B; Clockwork Keeper (E2) and Trusty
                Ramhound (E2) to B. Eight runes, one recycled; none
                left.
their T4  8     Hold A.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T3 it
is **2 to 1**; after their T3, **2 to 2**; after your T4, **3 to 2**; after their T4, **3 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro; 5, then 4 after the Guard; 5 after the
T3 draw, 3 after the Keeper and the Guardian; 4 after the T4 draw, still 4 after Leona, who comes from
the Champion Zone, 2 after the Clockwork Keeper and the Ramhound (Soaring Scout, Vanguard Captain).
Theirs: 5 after the T1 draw, 4 after the Saboteur; 5 after the T2 draw, 6 after the legend's draw, 4
after the Rearguard and the Duo; 5 after the T3 draw, still 5 after Draven, 4 after the Pouty Poro
(Mystic Poro, Cemetery Attendant, Flame Chompers, Noxus Hopeful).

**Your T2: the pair is made in base.** The Poro takes A, which is empty: a non-combat showdown
(316.8.b.1), and with no runes up they pass, so it is a Conquer (348.2.a.1). The Guard goes to base,
and so does its Sand Soldier (359.3.f.2). Played to A instead, it would make three there.

**Their T2: they take A, and leave B empty.** The Saboteur walks into A. 465.2.c: *"Starting with the
Attacker, each player assigns an amount of damage equal to their summed Might among the other's
Units."* Their 3 kill the Poro; its 2 do not kill the Saboteur. Only their unit remains, so they win
the combat and their legend draws, and they establish control, 466.5.d: *"Establishing Control results
in a Conquer if that player has not yet scored this Battlefield this turn."* The Rearguard and the Duo
go to base: from A they could never reach B, 144.4.b: *"Units may move from a Battlefield to their
Base."* The Saboteur's 2 damage goes at the end of the turn, 317.2.b: *"Insert “3c. Heal all
Units.”"*

**Your T3: the pair walks in, and the Keeper costs three.** Your runes are 4 + 2 channelled = 6, all
ready, 315.1.b: *"1. The Turn Player readies all Game Objects they control that are able to be
readied."* There is nothing to Hold. The Guard and the Soldier, ready in base, walk into B as one
move. You take Focus and pass; they have no rune ready and pass; B is yours, a Conquer. B now has
exactly two units, both yours. The Keeper of Law costs E3 and no Power, and goes to base, so the pair
stays at two. Your last three runes play Sunlit Guardian to B, which you now control (355.2.a). B is
the Guard 2, the Soldier 2 and the Guardian, 4 while defending: 8.

**Their T3: B is out of reach.** They Hold A, 469.2: *"Hold: A player maintains Control of a
Battlefield they did not yet Score this turn during their Beginning Phase."* Their ready units are the
Rearguard and the Duo in base, 5 Might against B's 8, so they do not attack. The Guardian is a Tank,
and their 5 would go into him first. Draven comes from the Champion Zone to A, a 5 at their two points.
The Pouty Poro goes to A, and the Rearguard and the Duo walk to A to guard it: A is 15.

**Your T4.** You Hold B. A is 15 and nothing of yours attacks it. The Keeper, in base since T3, where
he entered exhausted (143.4), is ready now (315.1.b) and walks to B, which you control (no showdown, 190.3.a.1). Leona comes down at B for four runes and a
recycled Order, then the Clockwork Keeper (its Calm Power not paid, so no draw) and the Ramhound go
to B. Their units at A can reach B only by going to their base first (144.4.b), so B is safe on their
T4. They Hold A: **3 to 3**.

**Without the Keeper on T3: the control.** Same draws, same six runes. The pair takes B as in the
walk, and Sunlit Guardian (E3) and Trusty Ramhound (E2, drawn on T2) go to B, one rune left. B is the
Guard 2, the Soldier 2, the Guardian 4 while defending and the Ramhound 3 with company: 11 against the
5 of their Rearguard and Duo, so they do not attack, and it is **2 to 2** after their T3. On your T4
you Hold B and the Keeper comes down at full price; on their T4 they Hold A: **3 to 3**, the walk's
score. B is held either way. What the discount added on T3 is the Keeper himself, a 5-Might body a
turn early, at the cost of the Ramhound waiting a turn.

**Insisting on the Keeper at full price.** Same draws. On T3 the Keeper is five runes, one Order
recycled, and one rune is left, which nothing in your hand costs. B is the Guard and the Soldier, 4 Might. On their T3 the
Rearguard and the Duo walk into it, 5 against 4. Their 5 kill both bodies (465.2.c.3: *"Units must
have lethal damage assigned to them in full before damage is assigned to a different Unit."*); your 4
kill the Duo and put 1 on the Rearguard, which remains. They take B and Hold A: **2 to 3**, with
another draw. On your T4 you have five runes on the board and two channelled, seven: the Keeper walks
into B against the Rearguard, a Conquer, and the Guardian and Leona go there for all seven runes,
one recycled. **3 to 3**. On their T4 they Hold A: **3 to 4**. That is the cost of insisting on the
Keeper on T3 without the discount; the control above, which does not, holds B.

**Their other T2: the Saboteur takes B.** Then A keeps your Poro, alone, and B is theirs. On your T3
you Hold A, and one body of the pair walks to A, which you control, so it opens no showdown: A has
exactly two, and the Keeper costs three with no window for them to act. That is **2 to 1** after your
T3 as well, and your T3 gives them no window: only their own T2 does. Taking A on their T2 is their
better turn because it forces the pair through a showdown.

**The other ordering: no Royal Guard at all.** On T2 the Poro takes A, and `SFD-159 Trusty Ramhound`
(E2; *"While you have another unit here, I have +1 :rb_might:."*) goes to A, which is now yours: A
has exactly two on T2. The Clockwork Keeper (E2) goes to base with the last two runes. If their
Saboteur attacks A, it meets 2 + 3 = 5: its 3 kill one of the two and your 5 kill it, and A stays
yours with one body and no point for them, **1 to 0**. On your T3 you Hold A, the Clockwork Keeper
walks to A (no showdown), A is exactly two again, and the Keeper and the Guardian are six runes:
**2 to 0**. If instead the Saboteur takes B, A is still exactly two: **2 to 1** after your T3. That is
the Royal Guard line's T3 or better, and the Guard is still in hand. The Guard is two bodies for one
card; the Keeper needs a count, and three cheap bodies make it as well as the pair does.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Going first, you
have seen **6** cards by T2 and **7** by T3 (four opening, one draw a turn from T1). With three copies
of each (103.2.b: *"Your Main Deck can include up to 3 copies of the same named card."*), a Royal
Guard among the first 6 is **40.30%**, a Keeper of Law among the first 7 **45.73%**, and both
**16.89%**. Two Keepers by T3, the entry's *"Repeat"* step on one pair, is **7.74%**; with a Guard by
T2 as well, **2.48%**.

## 5. Breaks to

**What the engine did, and the predicate.** On your T3 the Keeper cost three runes, and the three
runes put the Guardian at B. The predicate is: played on their T2, or in your T3 before you play the
Keeper, does it leave you no battlefield with exactly two units when you play him?

**The scope.** A Fury/Chaos deck plays only Fury, Chaos and Fury/Chaos cards (103.1.b.1), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* Glorious Executioner's tag is
Draven. The predicate is: a card in those domains in `data/cards.json` (not a legend, battlefield,
rune or token), not a Signature card with another champion's tag. Folded by name, that is **252**
cards. Of the five Signature cards in those domains, four carry another tag and are out (`OGN-252
Super Mega Death Rocket!`, `OGS-018 Tibbers`, `UNL-186 Death from Below`, `VEN-144 Death Mark`);
Draven's own `SFD-186 Spinning Axe` is in. Five of the 252 are banned in constructed (`OGN-168 Fight
or Flight`, `OGN-177 Stealthy Pursuer`, `OGN-182 Scrapheap`, `SFD-020 Draven, Vanquisher`, `SFD-122
Called Shot`), which leaves **247**.

**One body is not enough, because the count repairs.** If one of the pair is gone before you play the
Keeper, B holds one of your units. The Guardian played to B first makes it two (190.3.a.1, no
showdown), and the Keeper then costs three: the same six runes and the same two bodies on T3, with the
Soldier's 2 Might missing. So an answer has to take both bodies, or take one and then the next body
you add, while it is still on the chain: a second answer, with a second rune.

**Window 1: their T2, in your base.** Their own Main Phase, five runes, against two 2-Might bodies in
your base. Swept over the 247 for *kill*, *deal*, *return*, *banish*, *move* or *recall* together with
*unit*, with no [Action], [Reaction], [Hidden] or [Ambush] in the text: **50** cards, each read. Those
that say *"at a battlefield"*, *"here"* or *"from a battlefield"*, that act on their own units, or that
cost more than five runes, cannot reach your base on T2. Eight remain. The [Action] and [Reaction]
cards are legal in their own Main Phase too, and are counted in Window 2 below. Each was read for
this window as well: none removes two units in a base. `UNL-128 Star-Crossed` returns two units, but
one of them must be its caster's own, and `OGN-033 Shakedown` deals to one. **Two remove both
bodies:**

- **`OGN-029 Falling Star`** (Fury, E2 + 2 Fury Power): *"Deal 3 to a unit. Deal 3 to a unit."* The
  Guard and the Soldier both die in your base. Two runes exhausted, both recycled for the Power: three
  stay on their board, ready for the Duo. On your T3 nothing of yours can reach a battlefield (the
  Guardian and the Keeper enter exhausted), and the Keeper is five runes, one of them recycled. **The
  cheapest answer: two runes and two Fury Power, and they play their T3 and every turn after it with
  two runes fewer.**
- **`UNL-132 Angler Beast`** (Chaos, E5 + 1 Chaos Power, M5): *"When you play me, return all units
  with 2 :rb_might: or less to their owners' hands."* The Guard goes back to your hand, and the Soldier
  ceases to exist, 186.1: *"If a token is put into any Non-Board Zone besides the chain, it ceases to
  exist immediately after moving to its new zone."* All five runes, one recycled, and a 5-Might body.

Six take or move one, and the Guardian repairs the count: `UNL-020 Dancing Grenade` (Fury, E2 + 1
Fury Power, *"Deal 2 to a unit."*), `OGN-187 Whirlwind` (Chaos, E3 + 1 Chaos Power, *"Starting with
the next player, each player may return a unit to its owner's hand."*), `VEN-107 Decree of Discord`
(Chaos, E1 + 1 Chaos Power, *"Return any number of enemy Order (:rb_rune_order:) units with total
Might 5 or less to their owners' hands."*), which takes the Guard and leaves the Soldier, `VEN-105
Twilight Step` (Chaos, E2 + 1 Chaos Power, *"Move a unit with 3 :rb_might: or less."*), `UNL-133
Blast Cone` (Chaos gear, E4 + 1 Chaos Power, *"When you play this, you may move an enemy unit."*) and
`SFD-129 Temptation` (Chaos, E2; *"Move an enemy unit to a location where there's a unit with the
same controller."*). Decree of Discord leaves the Soldier because a token has no domain, 185.3.b:
*"Tokens do not have domains."* Temptation with its [Repeat] paid can move both, but only to a place
where you already have a unit: your base, or A while the Poro lives. Moved to A, they make three
there, and on your T3 one of them walks home (144.4.b) and A is two again.

**Window 2: the showdown at B on your T3.** Here only [Action] and [Reaction] play (806.1.b, and
813.1.c.1: *"This can be played during Closed States on any player's turn."*), paid with the runes
they kept ready on their T2. **52** of the 247 have [Action] or [Reaction] in their text. None of them
removes two units at B. One-body answers, by cost: `OGN-169 Gust` (Chaos, E1; *"Return a unit at a
battlefield with 3 :rb_might: or less to its owner's hand."*), `OGN-009 Hextech Ray` (Fury, E1 + 1
Fury Power, deal 3), `UNL-014 Monster Harpoon` (Fury, E1 + 1 Fury Power, deal 2), `OGS-003 Incinerate`
(Fury, E2, deal 2), and the costlier deal-2-or-more and return cards above them. `OGN-173 Ride the
Wind` (Chaos, E2 + 1 Chaos Power; *"Move a friendly unit and ready it."*) moves their Saboteur from A
into B and turns the showdown into a combat, 316.8.b.1.a: *"During the proceedings of a Non-Combat
Showdown, units controlled by a different player may become present at the Battlefield where the
Showdown is ongoing."* Its 3 kill one of the pair, your 4 kill it, and A is left with no unit of
theirs. Each of these takes one body, and the Guardian puts the count back.

**Gust is the cheapest card that touches the line by Energy, and it does not break it.** It is one
rune, as are `OGN-009 Hextech Ray` and `UNL-014 Monster Harpoon` (E1 + 1 Fury Power, the same rune
exhausted and then recycled), but it is the only one of the three that needs no Power. The ready rune
they buy by playing the Duo and not the Rearguard on their T2. In the showdown Gust returns the Sand
Soldier, which ceases to exist (186.1). You still take B with the Guard. Then the Guardian goes to B
(two), and the Keeper costs three. B is 6 while defending instead of 8. On their T3 their ready body
is the Duo, a 3, and the Rearguard, still in hand, can join it: Legion Rearguard, *"[Accelerate] (You
may pay :rb_energy_1::rb_rune_fury: as an additional cost to have me enter ready.)"* That is 3 + 2 = 5
against 6, so B still holds. To stop the Keeper as well they need a second answer in response to the Guardian, on
the chain, while B still holds one: a second ready rune at least, and a second card.

*A card hidden at A.* After their T2 they control A, so they can hide there (811.1.b: *"While this
card is in your hand or in your Champion Zone on your turn during an Open State, you may pay [A] to
hide this facedown at a battlefield you control that doesn't already have a facedown card hidden there
for as long as you control that battlefield. Beginning on the next turn, this gains [Reaction] and you
may play this, ignoring its base cost."*). The [A] is a recycled rune, which can be one already
exhausted, so the hide costs them no tempo on T2 and one rune for good. Played from facedown it has
Reaction, 811.6: *"A card that is Hidden gains Reaction while facedown or played from facedown, and may
be played any time a card with Reaction may be played as a result."* `SFD-017 Sudden Storm` (*"Deal 2
to a unit at a battlefield."*) then kills one of the pair in the showdown for nothing on your T3. It
is one body again, and the Guardian repairs it. A hidden unit must be played to A, where your pair is
not, and `OGN-168 Fight or Flight`, the hidden card that would move one of them home, is banned.

**So the price of stopping the discount is two bodies.** Falling Star in your base on their T2, for
two runes and two Fury Power; Angler Beast, for all five; or two answers, one in the showdown and one
on the Guardian's chain. A single answer costs you the Sand Soldier and not the Keeper.

## 6. Verdict

**Right about the discount; wrong about where the pair can be played.** The Keeper is on the chain when
his cost is read (354, 356), so the count is the board's, and exactly two pays E2 and the Order Power.
But a battlefield you control always holds a unit of yours (190.4.a, 190.4.c), so the Guard played
there makes three. The pair is made in base and walks: into an empty battlefield through a showdown,
or one body at a time into a battlefield where you already have one, with no window at all. Walked
going first against a Draven deck that took your battlefield on T2, the pair walked into theirs on T3
and the Keeper cost three. The saved three runes were Sunlit Guardian at B, and B held: **3 to 3**
after their T4. Without the Keeper on T3, the Guardian and the Ramhound hold B for the same six runes
and the score is the same, so what the discount bought is the Keeper's 5-Might body a turn early, not
B. Insisting on him at full price is **3 to 4**. The cheapest card that touches the line by Energy,
Gust for one ready rune and no Power, takes the Sand Soldier and not the discount, because a body played to the same
battlefield puts the count back at two. What stops it is a card that removes both bodies: Falling
Star on their T2, two runes and two Fury Power, both runes gone for the game. And the Guard is not
needed for the count: two 2-drops at your battlefield reach the same T3.

## 7. Not verified

I did not deal the channel order. The walk assumes six Calm and six Order runes for you, Radiant
Dawn's two domains, in the twelve of Tournament Rules 402.1. The discounted Keeper needs no Power.
Leona on T4 needs an Order among the eight channelled: it cannot fail with six Calm, **0 of 924**. At
full price the Keeper on T3 needs an Order among the first six: it fails in **1 of 924, 0.11%**; Leona
on T4 then needs a second Order among the first eight, since the recycled one goes to the bottom of
the rune deck: **0 of 924**.

Their walk assumes six Fury and six Chaos. Draven on T3 needs a Fury among seven: **0 of 924**.
Falling Star on their T2 needs two Fury among their first five: it fails in **112 of 924, 12.12%**.
Angler Beast, Whirlwind, Decree of Discord and Ride the Wind need a Chaos among five, and Dancing
Grenade, Hextech Ray and Monster Harpoon a Fury among five: each fails in **7 of 924, 0.76%**. Gust,
Incinerate and hiding take any rune.

**How likely an answer is.** Out of their own **39**, by your T3 they have seen **7** cards: four
opening, a draw on each of their two turns, and the legend's draw for the Saboteur's combat. Falling
Star, run three times, is among them in **45.73%**; Falling Star or Angler Beast (six cards),
**72.23%**. Those are before the deal. The walk fixes their opening four as non-answers, which leaves
three draws from the other **35**: three Falling Stars among them is **24.22%**, six cards **44.17%**.
These count only the cards named, not how many of them a deck runs.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2, Dancing Grenade's second clause (its *"Its controller"* reads as the damaged unit's
controller, so its replay would be yours), `UNL-139 Bone Skewer` hidden at A (it makes you play a unit
from your hand to the battlefield it chooses, ignoring its cost, which makes B three and gives you the
unit), `OGN-045 Defy` held up against Gust (E1 + 1 Calm Power: it saves the Soldier and costs the
Guardian's three runes, so it is not better than the repair), and the board after their T4.

## Leads

- Step 1, *"Play Royal Guard (E4) to a battlefield you control that has no other units of yours on
  it"*: no such battlefield exists in an Open State. 190.4.a keeps control only while you have units
  there and 190.4.c ends it in the next cleanup when you have none, so a Guard played to a battlefield
  you control (355.2.a) makes at least three. The pair is made in base (359.3.f.2) and walks: both
  bodies as one move (144.3, 144.3.a) into an empty battlefield, through a showdown (316.8.b.1, 345),
  or one of them into a battlefield where you have exactly one, which opens none (190.3.a.1).
- The notable *"Royal Guard is the only mono-Order card that does that in one play"*: `OGN-211 Faithful
  Manufactor` (Order, E3, M2) prints *"When you play me, play a 1 :rb_might: Recruit unit token
  here."*, a pair a rune cheaper. `OGN-222 Noxian Drummer` (Order, E3, M3) prints *"When I move to a
  battlefield, play a 1 :rb_might: Recruit unit token here."*, which makes the pair at the battlefield
  itself, the place the condition is read.
- The notable *"the condition is not satisfied by playing more units"*: one unit played or moved to a
  battlefield where you have exactly one satisfies it, with no showdown. In the walk that is how a
  single answer is repaired, and two 2-drops at your battlefield reach the Royal Guard line's T3
  without the Guard.
- Step 3 and the notable *"the pair has to be standing at the moment you play the Keeper"*: correct,
  and the Keeper is on the chain at that moment (354, 356), not at the battlefield, so he can be played
  to the battlefield that pays for him. A second Keeper reads three there; played to base, the first
  leaves the pair at two for the next.
- Step 5, *"Repeat at the other battlefield of the Duel with the second Royal Guard"*: one pair serves
  every Keeper played to base, so a second pair is not needed for a second discount. Two Keepers by T3
  going first, out of 39, is **7.74%**.
- The Keeper's text reads *"a battlefield with exactly two units there"*, every player's units, not
  *"units you control"*. Outside a combat or a showdown a battlefield you control holds only yours, and
  the Keeper cannot be played in either, so on the walked boards the difference never shows.
- No answer is named. `OGN-029 Falling Star` (Fury, E2 + 2 Fury Power) and `UNL-132 Angler Beast`
  (Chaos, E5 + 1 Chaos Power) remove both bodies in your base on their turn. `OGN-169 Gust` (Chaos, E1)
  and every other one-body answer cost one body, not the discount.
