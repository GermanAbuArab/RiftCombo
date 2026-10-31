# Play — Galio is a six-Might Tank for three Energy and a Vanguard Captain makes three, so eight hold the Plaza and their six kill nothing

Issue #529 (a slice of #200), 2026-10-31. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against,
[the coverage table](2026-10-27-identity-coverage-by-legend-pair.md) for why this pair, and the four
earlier Plaza plays of the identity-first pass,
[Up from the Deep](2026-10-27-up-from-the-deep-puts-seven-on-the-plaza-by-turn-three-and-the-two-bodies-they-already-had-kill-five-of-them.md),
[the Frisky Hunters](2026-10-27-two-frisky-hunters-put-seven-on-the-plaza-by-turn-three-a-tank-raises-the-free-answer-to-three-might-and-their-six-still-kill-four.md),
[the Towering Combatant](2026-10-27-a-towering-combatant-makes-one-plaza-kill-cost-six-their-six-kill-only-it-and-the-turn-four-rebuild-wins-the-turn-five-hold.md)
and [the hidden Marai](2026-10-27-a-hidden-marai-is-the-seventh-unit-for-no-energy-so-a-tank-fits-by-turn-three-and-their-six-still-take-it-to-six.md),
which this one is compared with throughout. Galio's own text was walked once before, in
[Galio alone deals no combat damage](2026-10-18-galio-alone-deals-no-combat-damage-so-the-snapvine-beats-him-by-killing-his-partners-and-never-by-choosing-him.md).

**Subject: `galio-vanguard-captain-grand-plaza`**, a new ALT_WIN synthesized for this slice.
Body/Order is the least-covered legend pair the identity-first pass has not worked yet: seven
finishers in the catalogue and none clocked by T4. The two Body slices before it hit the same wall from
two sides: a [Tank] among seven units, and seven units from the seven cards seen by T3. Order answers
both at once. `UNL-171 Galio, Indefatigable` is a 6-Might [Tank] for three Energy and one Order Power,
and `OGN-218 Vanguard Captain` is **three units for one card** once another card has been played that
turn. Both Powers come from runes that have already paid their Energy, recycled. **Eight units at
`OGN-293 The Grand Plaza` by the end of T3 for 11 Energy and 2 Order Power, and with Pit Rookie's buff
on Galio, killing two of them costs 8 Might.** The turn clock prices it at **T4 against the Body/Order
Hold baseline of T5**. Walked as a game, going first, against the same Calm/Order Radiant Dawn deck and
the same draws as the four earlier Plaza plays, **it wins on T4**. Their two T2 bodies attack with
exactly 6, and all of it has to go to Galio, who has 7. Nothing of yours dies, both of theirs do, and
the T4 Hold sees eight. It is the first identity-first Plaza walk to win on T4. The cheapest break is in
their own identity: `OGN-043 Charm` (Calm, E1 + 1 Calm, and one Power more for Galio's [Deflect]) moves
Galio off the Plaza, and then 1 Might of attack is enough. The walked hand held no Charm.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-269 The Boss` (Body/Order, tag Sett) |
| **Chosen Champion** | `OGN-240 Sett, Kingpin` (Order, E4 + 1 Power, M5), never played |
| **Battlefield** | `OGN-293 The Grand Plaza` (colourless), and it has to be the one of your three that is in play |
| **The Tank** | `UNL-171 Galio, Indefatigable` (Order unit, E3 + 1 Order Power, M6) on T2 |
| **Three for one** | `OGN-218 Vanguard Captain` (Order unit, E3 + 1 Order Power, M3) on T3, after another card |
| **The bodies** | `UNL-111 Determined Sentry` (Body, E1, M1): two on T1, the third on T2; `OGN-136 Pit Rookie` (Body, E2, M2) on T3, before the Captain |

The line pays two Order Power, so **two Order runes among the six you channel by T3, one of them among
the first four** (§8). From the opponent it needs **less than 8 Might of attack on their T3**, counted
against the board below (§5), and no one-Energy sweeper.

The Boss is Body/Order and its tag is Sett, so Sett, Kingpin can be the Chosen Champion, 103.2.a.2:
*"Must be a champion unit with a champion tag that matches the tag on your Champion Legend."* Every
card in the line is mono-Body, mono-Order or colourless, so the deck admits it, 103.1.b.3: *"If a card
has a single Domain, then that card is permitted in the Domain Identity that corresponds to the same
Domain."* Three copies is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the same
named card."* The walk's list runs three each of Determined Sentry, Galio, Vanguard Captain and Pit
Rookie, twelve of its 39. None of the cards on either side is a Signature card (`signature` in
`data/cards.json`), and none is in `data/legality.src.json` or marked [BANNED] in
`data/corpus_flat.txt`.

**Why these cards.** Determined Sentry is the one unit at Energy 1 or less in Body or in Order. The
[Tank] units at Energy 4 or less in the pair are Galio (E3 + 1 Power, 6 as a defender), `OGN-241
Shen, Kinkou` (E3 + 1 Power, 3 with [Shield 2], so 5), `UNL-099 Towering Combatant` (E4, 5 as a
defender), `SFD-176 Xin Zhao, Vigilant` (E3 + 1 Power, M4) and `OGN-240 Sett, Kingpin` (E4 + 1 Power,
M5): Galio is the largest and among the cheapest. The units at Energy 4 or less that put a token on the
board when they are played are Vanguard Captain (two Recruits), `OGN-211 Faithful Manufactor` (E3, one
Recruit) and `SFD-157 Royal Guard` (E4, one Sand Soldier); the Captain is the only one that is three
units for one card. Pit Rookie is an Energy-2 body that is also the card the Captain's [Legion] needs,
and its buff goes on Galio.

The card text the play turns on:

- The Grand Plaza: *"When you hold here, if you have 7+ units here, you win the game."*
- Galio, Indefatigable: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or
  ability.) [Tank] (I must be assigned combat damage first.) I don't deal combat damage."*
- Vanguard Captain: *"[Legion] — When you play me, play two 1 :rb_might: Recruit unit tokens here.
  (Get the effect if you've played another card this turn.)"*
- Pit Rookie: *"When you play me, buff another friendly unit. (If it doesn't have a buff, it gets a +1
  :rb_might: buff.)"*
- Determined Sentry: *"I can't move to base."* It only ever moves from base to the Plaza.
- The Boss: *"If a buffed unit you control would die, you may pay :rb_rune_rainbow:, exhaust me, and
  spend its buff to heal it, exhaust it, and recall it instead. (Send it to base. This isn't a move.)
  When you conquer, ready me."* It is a "may", and nothing of yours dies in the walk, so it never fires.

## 2. What the line does, and why each step is legal

**The Plaza has to be yours first.** A battlefield's "you" is its controller, 190.6.d: *"“You” in a
battlefield’s abilities refers to the battlefield’s Controller, as does the implied “you” in
instructions that don’t specify a player like “draw 1.” If the battlefield has no Controller, “you”
refers to no one, and all such instructions are ignored."* A unit enters exhausted, 143.4: *"Units
enter the Board exhausted."*, so the two Sentries played on T1 are the first that can move, and they
move from base, 144.4.a: *"Units may move from their Base to a Battlefield."* The Plaza is empty, so no
combat, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are a
stand-alone Phase and do not create a Combat."* It is a Conquer, 348.2.a.1: *"This results in a
Conquer if that player has not yet scored that Battlefield this turn."*

**Everything after T1 is played straight onto it.** 355.2.a: *"By default, Valid locations include the
controller’s Base or a Battlefield the controller controls."* The Captain's Recruits come *"here"*,
which is where the Captain is played.

**Both Powers are runes that have already paid their Energy.** A rune makes Energy by exhausting and
Power by being recycled, and the two are separate abilities, 164.2.a: *"[E]: [Reaction] — Add [1]."*
and 164.2.b: *"Recycle this: [Reaction] — Add [C]."* The recycle has no exhaust in its cost, so **a
rune already exhausted for Energy can still be recycled for Power**, and the Power is that rune's
domain, 164.2.b.1: *"The Power added this way corresponds to the Domain of the Rune that is being
Recycled."* So each of Galio and the Captain needs an Order rune to recycle. The price is the rune
itself, 161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."*, so you
have one rune fewer from then on.

**Three units for one card.** [Legion] turns on with any other card played that turn, 812.1.c: *"As
long as a card different than the one with the Legion ability has been Finalized by you on the same
turn then the Dependent Ability is Active on the card with Legion."* One card is enough for every
instance, 812.2: *"All instances of Legion on cards a player controls are satisfied by that player
playing a single card."* On T3 that card is Pit Rookie, played first.

**The buff.** 702.2.a: *"To Buff a Unit, a player chooses a Unit and then places a buff on it. That
Unit is Buffed for as long as the buff remains on it."* 703: *"Each Buff individually contributes +1
Might to a Unit."* Only one fits, 702.3: *"There can only be one Buff on a Unit at a time."* It goes on
Galio, 6 to 7.

**The win is counted at the Hold.** The Hold is the first thing in your Beginning Phase, 315.2.b.2:
*"The Turn Player Holds all Battlefields they Control."* and 469.2: *"Hold: A player maintains
Control of a Battlefield they did not yet Score this turn during their Beginning Phase."* The seven are
part of the trigger condition, 383.2.a.1: *"Any additional conditional statement immediately after the
Condition must be true in order for the Condition to be fulfilled. Such a conditional statement is part
of the Trigger Condition and not the Effect."* So they must be at the Plaza when the Hold happens. Once
the ability resolves the game is over, 195: *"A player also wins the game if an effect instructs them
to do so, or if they are the only player remaining in the game."*

**Combat, and what Galio changes.** 465.2.c: *"Starting with the Attacker, each player assigns an
amount of damage equal to their summed Might among the other's Units."* 465.2.c.3: *"Units must have
lethal damage assigned to them in full before damage is assigned to a different Unit."* 142.4.b:
*"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s Might."* [Tank]
puts an order on that, 815.1.b: *"It is functionally short for "I must be assigned lethal damage before
any other unit with the same controller as me that does not have [Tank] during the Combat Damage
step."*, and 815.1.c.2 closes the gap: *"If more than one unit with Tank is present with the same
controller in Combat, damage may be assigned to any of them. Units without Tank are invalid assignments
until all units with Tank have lethal damage assigned to them."* Galio has no [Shield], so his lethal is
his Might: 6, and 7 with the buff. **An attack that kills one of the eight therefore costs 7 Might, and
one that kills two costs 7 + 1 = 8.** The combat result: 466.3.a: *"A Player has won a combat if they
received either the attacker or defender designation and are the only Player that has units remaining
at this battlefield during this step."*

**Galio deals no combat damage.** His *"I don't deal combat damage."* takes his 7 out of your side of
465.2.c, and only that: combat damage is the units', 417.6.c: *"Damage Dealt as a result of being
assigned during Combat has the Units as its source."* The other seven units bring 10, which the walk
needs to be enough, and it is (§4).

Units move from base to a battlefield and back, never between battlefields, 144.4.b: *"Units may move
from a Battlefield to their Base."* So a unit of theirs at their own battlefield cannot reach the Plaza
on the same turn.

## 3. Their deck: Calm/Order Radiant Dawn

The same deck, in the same seat, with the same draws as in the four earlier Plaza plays, so the five
walks can be read side by side. `OGN-261 Radiant Dawn` (Calm/Order): *"When you stun one or more enemy
units, buff a friendly unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff.)"* Nothing in
the walk stuns. Its Chosen Champion is `OGN-238 Leona, Determined`, never played. The cards it plays:

- `OGN-210 Daring Poro` (Order, E2, M2): *"[Assault] (+1 :rb_might: while I'm an attacker.)"*
- `SFD-159 Trusty Ramhound` (Order, E2, M2): *"While you have another unit here, I have +1
  :rb_might:."*
- `OGN-054 Sunlit Guardian` (Calm, E3, M3): *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I
  must be assigned combat damage first.)"*
- `OGN-052 Stalwart Poro` (Calm, E2, M2): *"[Shield] (+1 :rb_might: while I'm a defender.)"*
- `SFD-157 Royal Guard` (Order, E4, M2): *"When you play me, play a 2 :rb_might: Sand Soldier unit
  token here."*

`OGN-216 Soaring Scout` and `VEN-045 Helm of Suppression` stay in their hand, and their Vanguard
Captain, the T4 draw of the earlier walks, is never drawn, since the game ends before their T4; §5 says why the Helm does nothing here. Going second, they
channel an extra rune on T1, 485.7: *"First Turn Process: The player going second channels an extra
Rune from their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Body/Order against Calm/Order. Your battlefield is A, The Grand Plaza; theirs is B, `OGN-282 Monastery
of Hirana` (*"When you conquer here, you may spend a buff to draw 1."*, and nobody spends one). Your
opening four are Determined Sentry, Determined Sentry, Galio, Indefatigable and Vanguard Captain. Your
draws are Pit Rookie (T1), Determined Sentry (T2) and a second Galio (T3, never played).
Their opening four are Daring Poro, Trusty Ramhound, Soaring Scout and Helm of Suppression. Their draws
are Sunlit Guardian (T1), Stalwart Poro (T2) and Royal Guard (T3).

```
turn      runes   play                                                      points
T1        2       Determined Sentry (E1) twice, to base. None left.         0
their T1  3       Daring Poro (E2) to base. One left.                       0
T2        4       The two Sentries walk to A, empty, Conquer: +1.           1
                  Galio (E3) to A, an exhausted Order rune recycled
                  for his Order Power. Determined Sentry (E1) to A.
                  Four at A; one kill costs 6 Might. Three runes stay.
their T2  5       Daring Poro walks to B, empty, Conquer. Trusty            1
                  Ramhound (E2) and Sunlit Guardian (E3) to base. None
                  left.
T3        5       Hold A: +1, four at A. Pit Rookie (E2, its buff on        2
                  Galio) to A, then Vanguard Captain (E3, a second
                  exhausted Order rune recycled), [Legion] on, two
                  Recruits at A. Eight at A; two kills cost 8 Might.
                  None left; four runes stay.
their T3  7       Hold B. Royal Guard (E4, Sand Soldier to base) and        2
                  Stalwart Poro (E2) to base. One left. The Ramhound
                  and the Guardian (3 + 3 = 6) attack A. All 6 go to
                  Galio, 7: nothing of yours dies; both of theirs do.
                  Eight at A.
T4        —       Hold A: eight at A. The Grand Plaza: you win the game.    3
```

After your T2 it is **1 to 0**; after their T2, **1 to 1**; after your T3, **2 to 1**; after their T3,
**2 to 2**. Your T4 Hold scores the Plaza and its trigger ends the game.

Runes at the end of each turn: yours 2, 3, 4, the two recycled ones never coming back. Theirs 3, 5, 7.

Your hand, card by card: 5 after the T1 draw, 3 after the two Sentries (Galio, Vanguard Captain, Pit
Rookie); 4 after the T2 draw, 2 after Galio and the Sentry (Vanguard Captain, Pit Rookie); 3 after the
T3 draw, 1 after the Rookie and the Captain (the second Galio). Six of the seven cards you saw by T3 are
on the Plaza. Theirs: 5 after the T1 draw, 4 after Daring Poro; 5 after the T2 draw, 3 after the
Ramhound and the Guardian (Scout, Helm, Stalwart Poro); 4 after the T3 draw, 2 after Royal Guard and
Stalwart Poro (Scout, Helm).

**Your T2: one rune is the Power.** The four runes are exhausted for four Energy (164.2.a): Galio's three
and the third Sentry's one. One of them, an Order rune, is then recycled for Galio's Order Power
(164.2.b, 164.2.b.1): no Energy is spent on it. A defends at Sentry 1, Sentry 1, Sentry 1, Galio 6.
Their only ready body on their T2 is Daring Poro, 3 as an attacker; all 3 would go to Galio (815.1.c.2)
and kill nothing, and your three Sentries would kill it. They take B instead.

**Your T3: five runes, eight units.** Three runes stayed and two are channelled: five Energy for the
Rookie (E2, buffing Galio to 7) and the Captain (E3). A second Order rune, exhausted for that Energy, is
recycled for the Captain's Order Power. The Rookie was played first, so the Captain's [Legion] is on
(812.1.c) and two Recruits are played at A. Eight units: three Sentries, Galio, the Rookie, the Captain
and two Recruits. The second Galio stays in hand; there is no Energy left for it.

**Their T3: exactly 6, and it all goes to Galio.** Royal Guard and Stalwart Poro go to base first, for
six of their seven runes. Then the Ramhound and the Guardian attack A. The Ramhound has another unit of
theirs at A, so it is 3; the Guardian's [Shield] works only on defence, so it is 3. They assign 6
(465.2.c), and all 6 must go to Galio until he has lethal damage (815.1.c.2): his lethal is 7 (142.4.b),
so every point of it lands on him and none reaches a unit without [Tank]. Galio survives with 6 damage.
Your 1 + 1 + 1 + 2 + 3 + 1 + 1 = 10 (Galio deals none) must go to the Guardian first (815.1.b), 3, then
3 to the Ramhound, and both die. Only your units remain at A, so you win the combat (466.3.a), and A
stays yours with **eight** units on it.

**Your T4: the Hold wins.** 383.2.a.1 counts at the Hold: eight units at the Plaza, so its trigger
resolves and you win the game (195). That is where the four earlier Plaza walks parted from the clock:
slices 1, 2 and 4 had six or fewer at their T4 Hold, and slice 3 won at T5.

**What made the difference.** The four earlier lines put seven on the Plaza, so the first kill already
cost the game, and their kill prices were 1, 3, 6 and 6. This one puts eight, so it takes two kills,
and the first of them has to get through a 7-Might Tank. Their 6 is short of 7 by one, which the Rookie's
buff paid. Without the buff Galio is 6, the 6 kills him and nothing else, and seven are left: **it
still wins**, because the eighth unit is the slack. Their 6 would have to be 8 to stop it, or the Tank
would have to leave first: a `OGN-043 Charm` in their T3 hand, cast on Galio before the attack (§5),
leaves seven with no [Tank], and the same 6 then kills the three Sentries and both Recruits. Two left,
and no win.

## 5. Breaks to

**The predicate:** on their turn before your Hold, does it leave you with six or fewer units at the
Plaza? The answer has to land before the Hold: 383.2.a.1 fixes the count when the Hold happens.

**The free answer: attack with 8 Might or more from base,** the kill price of the eight at the end of
your T3: lethal on Galio (7, with the buff), then the cheapest unit (1). At the end of your T2 the board
is four and one kill costs 6, Galio himself; an attack on their T2 that kills Galio leaves the three
Sentries, and your T3 then makes seven (the Rookie, the Captain and two Recruits), with no Tank, so one
kill costs 1. The walked opponent had 6 ready on their T3 and 3 on their T2, and killed nothing with
either.

**The cheapest spells,** pool-wide, constructed-legal, priced against the target. Galio has [Deflect],
so a spell that chooses him costs one Power more, 809.1.c: *"It is functionally short for "Spells and
abilities an opponent controls that target [me/this] cost an amount of Power equal to [Deflect Value]
more to play as an additional cost for each time they choose [me/this].""* and 809.1.c.1: *"The Power
used to pay this cost may always be of any Domain."* Taking two of the eight needs a card that removes
two, two cards, or one card that removes the Tank and an attack for the second: with Galio gone, the
seven left have no [Tank], so one kill costs 1 Might (465.2.c.3).

| card | cost | against the eight |
|---|---|---|
| `OGN-043 Charm` (Calm spell) on Galio, then an attack | E1 + 1 Calm + 1 Power ([Deflect]), and 1 Might | *"Move an enemy unit."* Cast in their own Main Phase before the attack (it has no [Action]), it moves Galio off the Plaza, and one 1-Might kill leaves six. The walked 6 kills the three Sentries and both Recruits: two left. **The cheapest break, and it is in the walked opponent's identity**: it fits their T3's seven runes beside Royal Guard. |
| `VEN-148 Shadow Dash` (Calm/Order spell) on Galio, then an attack | E2 + 1 Power + 1 Power ([Deflect]), and 1 Might | *"Move an enemy unit to a battlefield where you have units."* Galio goes to B, where they have Daring Poro (144.4 restricts only a Standard Move), and the same attack follows. Two left. Also in their identity. |
| `OGN-133 Flurry of Blades` (Body spell) | E1 | *"[Reaction] (Play any time, even before spells and abilities resolve.) Deal 1 to all units at battlefields."* It targets nothing. The three Sentries and both Recruits die; Galio (7), the Rookie (2) and the Captain (3) live. Three left. |
| `OGN-268 Bullet Time` (Body/Chaos spell) | E1 + X Power | *"[Action] (Play on your turn or in showdowns.) Pay any amount of :rb_rune_rainbow: to deal that much damage to all enemy units at a battlefield."* For X = 1 the five 1-Might units die. Three left. |
| `OGN-127 Cannon Barrage` (Body spell) | E2 + 1 Body | *"[Reaction] (Play any time, even before spells and abilities resolve.) Deal 2 to all enemy units in combat."* Inside their attack: the Sentries, the Recruits and the Rookie die. Two left. |
| `UNL-107 Stare Down` (Body spell) | E2 | *"Choose a friendly unit and a battlefield. Move all enemy units at that battlefield with less Might than the chosen unit to their base. Gain 1 XP."* With a 3-Might unit of theirs chosen, everything but Galio and the Captain goes to base, the Sentries too: they cannot move to base, so 447.2.c turns their move into a Recall (*"If an action would require a Move that would cause a Unit to become present in a Location where it cannot move for any reason, such as a Battlefield with two players that are not the controller of the Unit performing this Move action are in a Combat or such a Combat is Staged, it instead Recalls."*). Two left. |
| `UNL-192 Alpha Strike` (Calm/Body spell) | E3 + 1 Power | *"[Action] (Play on your turn or in showdowns.) Choose a friendly unit. It deals damage equal to its Might split among enemy units at battlefields. Then for each unit this kills, do this: Gain 1 XP."* With a 3-Might unit, three 1-Might units die. Five left. |
| two single-target spells, no attack | E2 and up | `OGN-169 Gust` (Chaos, E1: *"Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."*), `SFD-162 Blood Money` (Order, E2: *"Kill a unit at a battlefield with 2 :rb_might: or less."*) or Charm, twice. Gust and Blood Money cannot choose Galio (6, 7 buffed), so with them alone it takes two cards. |

The predicate searched: spells at Energy 3 or less in `data/corpus_flat.txt` whose text contains "all
units", "each unit", "two units", "units here", "enemy units at" or "all enemy units". It returns the
five rows above plus `SFD-145 Switcheroo` (Chaos, swaps the Might of two units) and `VEN-148 Shadow Dash`
(Calm/Order, *"Move an enemy unit to a battlefield where you have units."*, one unit). **No Calm or Order
card in that search removes two of the eight with one card.** The walked opponent's identity still has a
one-card break, because removing one unit is enough when that unit is the Tank: Charm or Shadow Dash on
Galio, then any attack of 1 Might, or 8 Might with no spell. The sweeper absence is inside that
predicate, not a pool-wide one: a unit or gear whose ability removes two was not searched.

**No spell tax reaches it.** The slice-1 and slice-3 Plaza lines moved to T5 against
`VEN-045 Helm of Suppression` on their T2: *"Opponents' spells cost :rb_energy_1: more."* This line casts
no spell. The Helm changes nothing.

**The battlefield cannot be answered.** 170.3: *"Battlefields cannot be Killed during the course of
regular play."* What can be answered is the count.

## 6. Against the free Hold curve

| | pays |
|---|---|
| This line, `npm run adversarial -- --turns` | **T4** |
| Body/Order Hold baseline, same command | **T5** |
| This line in the walk above | **T4**: eight at the T4 Hold, and the game ends there |

The clock prices the line at T4: Galio (E3 + 1 Power), the Rookie (E2), the Captain (E3 + 1 Power) and
three bodies at E1 each (`UNL-111 Determined Sentry`, the cheapest Body/Order body it lists), eleven
Energy, which T1 and T2 (six runes) cannot pay and T3 can, so the set completes on T3 and the Hold waits
for T4. The hand count agrees on the parts and the turn: three Sentries is the cap (103.2.b) and exactly
what the line runs, and both Powers are runes that have already paid their Energy (164.2.b). By the end
of T2 the most at the Plaza is four, so T4 is the lower bound. The line uses no readying effect, no
readying rune (#513), no refused rune readier (#523, merged in PR 531 and modelled by the clock now), no
[Accelerate] (#517), no [Hidden], no legend [Add] and no fourth copy of a body (#528), no Weaponmaster
(#530) and no Dragon (#532), so none of the clock's open gaps moves it.

On the clock's board the line is one turn faster than the Hold curve. By the issue's rule it beats the
baseline, and it enters `data/combos.json` as `status: candidate`.

The walk is the other half, and here it agrees with the clock: against the opponent that took the four
earlier Plaza lines to T5 or later, this one wins on the clock's turn.

## 7. Verdict

**One turn faster than the Hold curve on the clock, and in the walk it wins on that turn.** Order has
what the Body/Fury slice lacked, a card that is three units, and a Tank whose Might is the price of the
first kill with no [Shield] to lose outside combat. Eight units take two kills to stop, and the first
is 7 Might. A deck that answers with bodies needs 8 ready on its T3, or one Energy-1 Body sweeper. The
cheapest answer is cheaper than either, and the walked Calm/Order identity has it: a Charm on Galio
(E1 + 2 Power, one of them Calm) before the attack, after which 1 Might is enough (§5). The walk won
because that hand held no Charm. It is a rare draw: eight
with Galio by the end of T3 in about one game in 8,600, seven with Galio in about one in 230 (§8).

## 8. Not verified

**Runes.** The line pays two Order Power, each by recycling an Order rune that has already paid its
Energy (164.2.b.1): one among the four runes channelled by T2, and a second among the six by T3. No Body
Power is paid. With six Order and six Body runes in the twelve of Tournament Rules 402.1 the deal fails
in **5.63%** of games; with eight Order and four Body in **0.20%**; with twelve Order never. Their side
is the same as in the earlier Plaza plays: the walk ends before they need an Order Power.

**How often the eight are castable by T3.** The draw pile is **39** cards, the 40 of Tournament Rules
402.1 less the Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register
a Main Deck of exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3
battlefields each with a unique name."* Going first you have seen 5 cards by T1, 6 by T2 and 7 by T3.
With the walk's three each of Determined Sentry, Galio, Vanguard Captain and Pit Rookie, computed
exactly over ordered draws and every way to spend 2, 4 and 5 or 6 Energy on T1 to T3 (each Power a
recycled rune, which leaves one rune fewer on later turns; [Legion] on only after another card that
turn; a unit played before the Plaza is yours goes to base and walks on a later turn), runes and
mulligan ignored:

| units at the Plaza by the end of T3 | walked list | with six more Energy-2 bodies |
|---|---|---|
| 7 or more, in any form | 1.5631% | 7.5163% |
| 7 or more with Galio (one kill costs 6, or 7 buffed) | 0.4405% | 3.1209% |
| 8 or more with Galio (two kills cost 7 or more) | **0.0116%** | 0.0862% |
| 8 or more with Galio buffed (the walked board, two kills cost 8) | 0.0030% | 0.0030% |

The eight-unit board needs the Captain and the Rookie together on T3 with a Sentry pair on T1, which is
why it is rarer than the seven-unit lines of the earlier slices.

**The Plaza has to be in play.** 485.5: *"Setup: Each player randomly selects one (1) of their three
(3) Battlefields. The other two are removed and will not be used for this game."* One in three. With
the 0.0116% that is about **0.0039%** of games in which the eight are on the board with Galio by the end
of T3, before the opponent does anything; with seven and Galio, about 0.15%.

Not walked: going second (three runes on T1); the mulligan; 2v2 and Match (486.5 lets you choose the
battlefield); an opponent that runs any of the §5 spells, or 8 Might ready on its T3; and the other
Body/Order legends (Leads).

## Leads

- **Grand Duelist may pay a rune back for Galio.** `SFD-205 Grand Duelist` (Body/Order, tag Fiora):
  *"When one of your units becomes [Mighty], you may exhaust me to channel 1 rune exhausted. (A unit is
  Mighty while it has 5+ :rb_might:.)"* Galio enters at 6. Whether a unit played at 5 or more "becomes"
  Mighty is the question, 709: *"A Unit "becomes Mighty" at the moment its Might changes from being
  less than 5 to being 5 or greater."* A card in hand has no Might on the board, so it is not settled
  here. If it does, the channelled rune replaces the one Galio's Power recycled.
- **A Tank played inside their attack.** `OGN-241 Shen, Kinkou` (Order, E3 + 1 Power): *"[Reaction]
  (Play any time, even before spells and abilities resolve, including to a battlefield you control.)
  [Shield 2] (+2 :rb_might: while I'm a defender.) [Tank] (I must be assigned combat damage first.)"*
  Played in their showdown, it is a second Tank they had not counted. It costs a third Power.
- **Sett, Kingpin is a Tank that grows with buffs**: *"[Tank] (I must be assigned combat damage first.)
  I get +1 :rb_might: for each buffed friendly unit at my battlefield."* At E4 + 1 Power it is a T4
  card here, after the Hold that wins.
- **The Faithful Manufactor shape.** The catalogued vanguard-captain-manufactor-plaza is mono-Order:
  two Vanguard Captains and a Faithful Manufactor make eight units in one Main Phase, with no Tank, so
  two kills cost 1 + 1 = 2. It clocks T4 too. This line spends the second Captain and the Manufactor on
  Galio and three Sentries, and the price of two kills goes from 2 to 8. The two are the only Body/Order
  ALT_WINs that pay by T4.
- **The stop rule's pair search is ALT_WIN only so far.** No BURST or CHAIN was searched for Body/Order,
  so its clocked count stays 0.
