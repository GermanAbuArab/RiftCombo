# Play — Up from the Deep puts seven on the Plaza by turn three, and the two bodies they already had kill five of them

Issue #491 (a slice of #200), 2026-10-27. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against,
and [the coverage table](2026-10-27-identity-coverage-by-legend-pair.md) for why this pair.

**Subject: `up-from-the-deep-flow-grand-plaza`**, a new Chaos/Fury ALT_WIN synthesized for this slice.
Chaos/Fury is the legend pair with the fewest finishers in the catalogue (two) and none that pays by
T4. The line: three Energy-2 bodies take `OGN-293 The Grand Plaza` and stand on it by the end of T2,
then on T3 `VEN-100 Up from the Deep` (Chaos spell, E3) and its own [Flow] replay (E3) put four 1-Might
Tentacles straight onto the Plaza. That is **seven units at the Plaza after twelve Energy and no Power**,
and the Hold at the start of T4 wins the game. The catalogue's turn clock prices it at **T4 against the
Chaos/Fury Hold baseline of T6**. Walked as a game, going first, against the Calm/Order Radiant Dawn deck
of [the Helm play](2026-10-26-the-helm-costs-your-turn-four-their-two-spells-cost-two-runes-more-and-acceptable-losses-kills-it-for-two.md),
**it does not win on T4**. On their T3 the two bodies they played on their T2 walk into the Plaza with
6 Might and kill five of the seven, because four of the seven are 1-Might Tentacles. Both of theirs
die and the Plaza stays yours, but the count is 2. The T4 rebuild to seven meets the same answer on
their T4, from the bodies they played on their T3. **3 to 3 after their T4.** The cheapest answer
costs nothing: any ready body in their base on their T3. The cheapest spell is one Energy:
`OGN-133 Flurry of Blades` (Body) kills all four Tentacles at once, and `OGN-169 Gust` (Chaos)
removes one, which is enough.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-185 Glorious Executioner` (Fury/Chaos, tag Draven) |
| **Chosen Champion** | `OGN-028 Draven, Showboat` (Fury, E5 + 1 Fury Power, M3), never played |
| **Battlefield** | `OGN-293 The Grand Plaza` (colourless), and it has to be the one of your three that is in play |
| **The swarm** | `VEN-100 Up from the Deep` (Chaos spell, E3, [Flow] E3) |
| **The bodies** | `OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-010 Legion Rearguard` (Fury, E2, M2), `OGN-171 Mystic Poro` (Chaos, E2, M2), `SFD-018 Void Hatchling` (Fury, E2, M2) |

Every card in the line costs Energy only, so the line runs on any rune split.

Glorious Executioner is Fury/Chaos and its tag is Draven, so Draven, Showboat can be the Chosen
Champion, 103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your
Champion Legend."* Every card in the line is mono-Fury, mono-Chaos or colourless, so the deck admits
it, 103.1.b.3: *"If a card has a single Domain, then that card is permitted in the Domain Identity
that corresponds to the same Domain."* Three copies is the cap, 103.2.b: *"Your Main Deck can include
up to 3 copies of the same named card."* The walk's list runs three Up from the Deep and three of each
of the four bodies, twelve bodies at E2. None of the cards on either side is a Signature card
(`signature` in `data/cards.json`), and none is in `data/legality.src.json` or marked [BANNED] in
`data/corpus_flat.txt`.

The card text the play turns on:

- The Grand Plaza: *"When you hold here, if you have 7+ units here, you win the game."*
- Up from the Deep: *"Play two 1 :rb_might: Tentacle unit tokens from Bilgewater. [Flow] :rb_energy_3:
  (You may play this from your trash for its Flow cost. Then banish it.)"*
- Glorious Executioner: *"When you win a combat, draw 1. (You win if only your units remain after
  combat.)"*
- Pouty Poro: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or
  ability.)"*
- Mystic Poro: *"[Vision] (When you play me, look at the top card of your Main Deck. You may recycle
  it.)"*
- Legion Rearguard's [Accelerate] and Void Hatchling's text play no part.

## 2. What the line does, and why each step is legal

**The Plaza has to be yours first.** A battlefield's "you" is its controller, 190.6.d: *"“You” in a
battlefield’s abilities refers to the battlefield’s Controller, as does the implied “you” in
instructions that don’t specify a player like “draw 1.” If the battlefield has no Controller, “you”
refers to no one, and all such instructions are ignored."* Both battlefields start uncontrolled, so a
body walks in on T2. A unit enters exhausted, 143.4: *"Units enter the Board exhausted."*, so the body
played on T1 is the first that can move, and it moves from base, 144.4.a: *"Units may move from their
Base to a Battlefield."* The Plaza is empty, so no combat, 316.8.b.1: *"Showdowns that occur as a
result of a player moving to an empty Battlefield are a stand-alone Phase and do not create a
Combat."* It is a Conquer, 348.2.a.1: *"This results in a Conquer if that player has not yet scored
that Battlefield this turn."*

**Units and Tentacles are then played straight onto it.** 355.2.a: *"By default, Valid locations
include the controller’s Base or a Battlefield the controller controls."* Up from the Deep names no
location, and a token is played under the same steps, 185.2.a: *"Tokens can be played by their owner
if their card type is played, following all the applicable steps for playing a card plus any
restrictions or modifications from the effect that created the token."* An effect could narrow that,
184.2: *"The effect may restrict the location to which the token may be played."*, and this one does
not. The token is defined by rule, 187.10: *"A 1 [M] Tentacle token is a domainless unit token with 1
Might and the Bilgewater tag."* No unit has to walk anywhere after T2.

**One copy of Up from the Deep is two castings in one turn.** Cast from hand it resolves and goes to
the trash, 351.2: *"Spells create game effects that are executed, then the card is placed in the trash
when Played."* From there [Flow] lets it be cast again, 829.1.b: *"It is
functionally short for “You may play this from your trash for its flow cost. Then banish it.”"* Nothing
in 829 waits a turn, and 829.1.b.2 keeps its timing: *"Playing a spell for its Flow cost does not change
the timing at which it can be played, nor any permissions for the spell aside from the zone from which
it can be played."* The second casting is banished, so each copy gives four Tentacles in a game and no
more.

**The win is counted at the Hold.** The Hold is the first thing in your Beginning Phase, 315.2.b.2:
*"The Turn Player Holds all Battlefields they Control."* and 469.2: *"Hold: A player maintains
Control of a Battlefield they did not yet Score this turn during their Beginning Phase."* The seven are
part of the trigger condition, 383.2.a.1: *"Any additional conditional statement immediately after the
Condition must be true in order for the Condition to be fulfilled. Such a conditional statement is part
of the Trigger Condition and not the Effect."* So they must be at the Plaza when the Hold happens, and
nothing played afterwards counts. Once the ability resolves the game is over, 195: *"A player also wins
the game if an effect instructs them to do so, or if they are the only player remaining in the
game."* No points are needed.

**Combat, which is where the line is lost.** 465.2.c: *"Starting with the Attacker, each player assigns
an amount of damage equal to their summed Might among the other's Units."* 465.2.c.3: *"Units must have
lethal damage assigned to them in full before damage is assigned to a different Unit."* 142.4.b:
*"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s Might."* So an
attacker with 6 Might kills six Might of defenders in whatever order it likes, and four of the seven
cost one damage each. [Tank] is the exception, 815.1.b: *"It is functionally short for "I must be
assigned lethal damage before any other unit with the same controller as me that does not have [Tank]
during the Combat Damage step."*, and nothing on your side has it. A Tentacle that dies is gone,
186.1: *"If a token is put into any Non-Board Zone besides the chain, it ceases to exist immediately
after moving to its new zone."* The combat result: 466.3.a: *"A Player has won a combat if they
received either the attacker or defender designation and are the only Player that has units remaining
at this battlefield during this step."*

Units move from base to a battlefield and back, never between battlefields, 144.4.b: *"Units may move
from a Battlefield to their Base."* So a unit of theirs standing at their own battlefield cannot reach
the Plaza on the same turn. That is the one thing in the walk that could keep the seven alive.

## 3. Their deck: Calm/Order Radiant Dawn

The deck of the Helm play, in the other seat. `OGN-261 Radiant Dawn` (Calm/Order): *"When you stun one
or more enemy units, buff a friendly unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff.)"*
Nothing in the walk stuns. Its Chosen Champion is `OGN-238 Leona, Determined`, never played. The cards
it plays:

- `OGN-210 Daring Poro` (Order, E2, M2): *"[Assault] (+1 :rb_might: while I'm an attacker.)"*
- `SFD-159 Trusty Ramhound` (Order, E2, M2): *"While you have another unit here, I have +1
  :rb_might:."*
- `OGN-054 Sunlit Guardian` (Calm, E3, M3): *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I
  must be assigned combat damage first.)"*
- `OGN-052 Stalwart Poro` (Calm, E2, M2): *"[Shield] (+1 :rb_might: while I'm a defender.)"*
- `SFD-157 Royal Guard` (Order, E4, M2): *"When you play me, play a 2 :rb_might: Sand Soldier unit
  token here."*
- `OGN-216 Soaring Scout` (Order, E2, M1) and `OGN-218 Vanguard Captain` (Order, E3 + 1 Order Power,
  M3): *"[Legion] — When you play me, play two 1 :rb_might: Recruit unit tokens here. (Get the effect
  if you've played another card this turn.)"*

`VEN-045 Helm of Suppression` stays in their hand. Going second, they channel an extra rune on T1,
485.7: *"First Turn Process: The player going second channels an extra Rune from their Rune Deck during
their first Channel Phase of the game."*

## 4. The turns, going first

Chaos/Fury against Calm/Order. Your battlefield is A, The Grand Plaza; theirs is B, `OGN-282 Monastery
of Hirana` (*"When you conquer here, you may spend a buff to draw 1."*, and nobody has a buff). Your
opening four are Pouty Poro, Legion Rearguard, Mystic Poro and Up from the Deep. Your draws are Pouty
Poro (T1), Void Hatchling (T2), Up from the Deep (T3), Mystic Poro (T4), and the legend's two draws are
Legion Rearguard and Void Hatchling. Their opening four are Daring Poro, Trusty Ramhound, Soaring Scout
and Helm of Suppression. Their draws are Sunlit Guardian (T1), Stalwart Poro (T2), Royal Guard (T3) and
Vanguard Captain (T4).

```
turn      runes   play                                                      points
T1        2       Pouty Poro (E2) to base. None left.                       0
their T1  3       Daring Poro (E2) to base. One left.                       0
T2        4       Pouty Poro walks to A, empty, Conquer: +1. Legion         1
                  Rearguard (E2) and Mystic Poro (E2) to A. Three at A.
                  None left.
their T2  5       Daring Poro walks to B, empty, Conquer. Trusty            1
                  Ramhound (E2) and Sunlit Guardian (E3) to base. None
                  left.
T3        6       Hold A: +1, three at A. Up from the Deep (E3): two        2
                  Tentacles to A. Its [Flow] (E3) from the trash: two
                  more. Seven at A, 10 Might. None left.
their T3  7       Hold B. Royal Guard (E4, Sand Soldier to base) and        2
                  Stalwart Poro (E2) to base. One left. The Ramhound
                  and the Guardian (3 + 3 = 6) attack A. Four Tentacles
                  and Pouty Poro die; both of theirs die. You win the
                  combat and draw 1. Two at A.
T4        8       Hold A: +1, two at A, no win. Up from the Deep (E3)       3
                  and its [Flow] (E3): four Tentacles to A. Pouty Poro
                  (E2) to A. Seven at A, 10 Might. None left.
their T4  9       Hold B. Soaring Scout (E2), then Vanguard Captain (E3     3
                  + 1 Order Power), [Legion] on, two Recruits to base.
                  Royal Guard, the Sand Soldier and Stalwart Poro
                  (2 + 2 + 2 = 6) attack A. Four Tentacles and Pouty
                  Poro die; all three of theirs die. You win the combat
                  and draw 1. Two at A.
```

After your T2 it is **1 to 0**; after their T2, **1 to 1**; after your T3, **2 to 1**; after their T3,
**2 to 2**; after your T4, **3 to 2**; after their T4, **3 to 3**.

Runes at the end of each turn: yours 2, 4, 6, 8, all exhausted every turn and none recycled. Theirs 3,
5, 7, and 8 after their T4: the Captain's Order Power recycles one of the nine.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro (Rearguard, Mystic Poro, Up from the
Deep, Pouty Poro); 5 after the T2 draw, 3 after the Rearguard and the Mystic Poro (Up from the Deep,
Pouty Poro, Void Hatchling); 4 after the T3 draw, 3 after Up from the Deep (Up from the Deep, Pouty
Poro, Void Hatchling), 4 after the legend's draw on their T3 (Legion Rearguard); 5 after the T4 draw, 3
after Up from the Deep and Pouty Poro (Void Hatchling, Legion Rearguard, Mystic Poro), 4 after the
legend's draw on their T4. The [Flow] casting comes from the trash and costs no card from hand. Theirs:
5 after the T1 draw, 4 after Daring Poro; 5 after the T2 draw, 3 after the Ramhound and the Guardian
(Scout, Helm, Stalwart Poro); 4 after the T3 draw, 2 after Royal Guard and Stalwart Poro (Scout, Helm);
3 after the T4 draw, 1 after the Scout and the Captain (Helm).

**Your T2: the Plaza is taken and held by three.** Mystic Poro's [Vision] shows the top card, which is
the second Up from the Deep, your T3 draw; you keep it. A defends at 2 + 2 + 2 = 6. Their only ready
body on their T2 is Daring Poro, 3 as an attacker, so it takes B instead.

**Their T2: the bodies stay home.** The Ramhound and the Guardian go to base, not to B, and that choice
is the answer. Played to B they could not reach A on their T3 (144.4.a, 144.4.b). In base, they are
ready on their T3 and A is one move away.

**Your T3: seven.** Up from the Deep from hand, two Tentacles to A; it goes to the trash (351.2); [Flow]
from the trash for E3, two more, and the card is banished. Six Energy, six runes, four bodies. A is
Pouty Poro 2, Legion Rearguard 2, Mystic Poro 2 and four Tentacles at 1: seven units, 10 Might.

**Their T3: the answer is free.** Royal Guard and Stalwart Poro go to base first, for six of their seven
runes. Then the Ramhound and the Guardian attack A. The Ramhound has another unit of theirs at A, so
it is 3; the Guardian's [Shield] works only on defence, so it is 3. They assign 6 first (465.2.c), and
four Tentacles at 1 plus one 2-Might body is exactly 6: they choose Pouty Poro. Five of yours die. Your
10 must go to the Guardian first (815.1.b), 3, then 3 to the Ramhound, and both die; the 4 left over
has no unit to go to. Only your units remain at A, so you win the combat (466.3.a), the legend draws 1,
and A stays yours. It has **two** units on it.

**Your T4: the Hold does not win.** 383.2.a.1 counts at the Hold: two units, so the Plaza does
nothing, and the Hold scores 1. The second Up from the Deep and its [Flow], E6, put four Tentacles on
A, and the drawn-back Pouty Poro, E2, makes seven again: 10 Might, every rune spent.

**Their T4: the same answer, from the bodies of their T3.** Royal Guard, its Sand Soldier and Stalwart
Poro were played on their T3, so they are ready now. 2 + 2 + 2 = 6 attacks A, and the same 6 kills the
same five: four Tentacles and Pouty Poro. Your 10 kills all three of theirs. You win the combat, the
legend draws, and A has two units. Before the attack they play the Scout and then the Captain with
[Legion] on, two Recruits to base: 1 + 3 + 1 + 1 = 6 Might ready for their T5. **3 to 3**, with two of
your three Up from the Deep banished and the third still in the deck.

**The game the line wins.** If on their T2 the Ramhound and the Guardian go to B, as Daring Poro did,
nothing of theirs is ready in base on their T3. Their T3 bodies enter exhausted (143.4) and their units
at B cannot reach A (144.4.b only returns them to base). The seven stand, and your T4 Hold wins the game
(195) on **2 to 2**.

## 5. Breaks to

**The predicate:** on their turn before your Hold, does it leave you with six or fewer units at the
Plaza? The answer has to land before the Hold: 383.2.a.1 fixes the count when the Hold happens, so a
unit removed in response to the Plaza's ability does not stop it.

**The free answer: attack with anything ready in base.** Four of the seven are 1-Might Tentacles, so an
attack with 1 Might kills one of them and leaves six. It costs no rune, and the walk's attackers were
bodies they had played on curve anyway. They lose those bodies, because 10 Might defends, and the walk
shows that losing them does not matter: the next turn's curve bodies do the same thing. Against seven
units at 10 Might, an attack has to be worth less than nothing to them for this not to be the answer.

**The cheapest spells,** pool-wide, constructed-legal, priced against the target. A Tentacle has no
[Deflect], so the spell pays its printed cost. Pouty Poro has [Deflect], 809.1.c: *"It is functionally
short for "Spells and abilities an opponent controls that target [me/this] cost an amount of Power
equal to [Deflect Value] more to play as an additional cost for each time they choose [me/this]."*,
with 809.1.b.3: *"If X is omitted, it is presumed to be 1."* and 809.1.c.1: *"The Power used to pay
this cost may always be of any Domain."* Nobody targets the Poro when a Tentacle is there.

| card | cost | against the seven |
|---|---|---|
| `OGN-133 Flurry of Blades` (Body spell) | E1 | *"[Reaction] (Play any time, even before spells and abilities resolve.) Deal 1 to all units at battlefields."* All four Tentacles die: three left. |
| `OGN-169 Gust` (Chaos spell) | E1 | *"[Reaction] (Play any time, even before spells and abilities resolve.) Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."* A returned Tentacle ceases to exist (186.1): six left. |
| `OGN-043 Charm` (Calm spell) | E1 + 1 Calm | *"Move an enemy unit."* A Tentacle moved to your base is not at the Plaza: six left. The cheapest in the walked opponent's identity. |
| `SFD-162 Blood Money` (Order spell) | E2 | *"[Action] (Play on your turn or in showdowns.) Kill a unit at a battlefield with 2 :rb_might: or less. If it was an enemy unit, play a Gold gear token exhausted. If it was a friendly unit, play two Gold gear tokens exhausted."* Six left. |

The walked opponent ran none of these and did not need one.

**The battlefield cannot be answered.** 170.3: *"Battlefields cannot be Killed during the course of
regular play."* What can be answered is the count.

## 6. Against the free Hold curve

| | pays |
|---|---|
| This line, `npm run adversarial -- --turns` | **T3**, too early (below) |
| This line with its three bodies priced, the same model by hand | **T4** |
| Chaos/Fury Hold baseline, same command | **T6** |
| This line in the walk above | not by T4; 3 to 3 after their T4 |

The clock prints T3 for `up-from-the-deep-flow-grand-plaza`, and that is one turn too early. The
entry declares its three bodies as `anyBodies`, the way `flurry-of-feathers-grand-plaza-win` does,
because the Plaza counts any seven units and naming three would invent a decklist. The clock does not
charge `anyBodies`: `grep -c anyBodies scripts/adversarial-check.mjs` is 1, a comment. So it prices
Up from the Deep alone, E3, payable on T2, plus the turn the Hold waits. Priced by hand under the same
model, with the bodies at E2 each: one on T1 (2 runes), two on T2 (4), Up from the Deep and its [Flow]
on T3 (6). The win comes at the **T4** Hold. By the end of T2 the most on the Plaza is three: one
body from T1, and two bodies or one Up from the Deep for the 4 Energy of T2. So T4 is the lower bound.

The clock and the baseline both assume nothing is cast against you and nobody attacks. On that board
the line is two turns faster than the Hold curve: it spends twelve Energy by T3 and wins at the T4
Hold. The Chaos/Fury curve has no Energy-1 body and reaches 8 on T6. By the issue's rule it beats the
baseline, and it enters `data/combos.json` as `status: candidate`.

The walk is the other half. The Hold curve's own bodies would also have been attacked on their T3.
But it needs only its battlefield to be held, and a Plaza seven needs seven bodies to be alive. One
ready enemy body is enough to stop the line and is not enough to take the Plaza. The line's T4 is
real only against an opponent with nothing ready in base on their T3, or one that will not attack.

## 7. Verdict

**Two turns faster than the Hold curve on the clock, and stopped for free in the walk.** Twelve Energy
and no Power put seven units at the Plaza by the end of T3: three Energy-2 bodies on T1 and T2, then
one Up from the Deep cast twice. That beats the Chaos/Fury Hold baseline of T6 by two turns. Against a
deck that plays a body a turn, the bodies they played on the previous turn walk into the Plaza and kill
five of the seven, four Tentacles and one body. Each time, the line loses five units and they lose two
or three bodies they had played anyway. It does not win on T4, and after their T4 it is **3 to 3**,
with two of the three Up from the Deep spent. The cheapest answer is free; the cheapest spell is one
Energy.

## 8. Not verified

**Runes.** The line costs no Power on your side, so every rune pays it: no rune split fails, **0 of
any** deal. Their side needs one Order rune among their first nine for the Captain's Power. The walk
assumes six Calm and six Order in the twelve of Tournament Rules 402.1, so all nine Calm is impossible:
**0 of 220**.

**How often the seven are castable by T3.** The draw pile is **39** cards, the 40 of Tournament Rules
402.1 less the Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register
a Main Deck of exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3
battlefields each with a unique name."* Going first you have seen 5 cards by T1, 6 by T2 and 7 by T3.
The line needs a body in the first 5, and then either two more bodies in the first 6 and an Up from the
Deep in the first 7, or an Up from the Deep in the first 6 and a second in the first 7 (T2: one Up from
the Deep for two Tentacles; T3: its [Flow] and the second copy). With twelve bodies and three Up from
the Deep, computed exactly over ordered draws, that is **13.97%** (8.96% the two-bodies way, 5.95% the
other, overlapping). It is 27.01% with eighteen bodies and 38.79% with twenty-four. Mulligan and Mystic
Poro's [Vision] are ignored.

**The Plaza has to be in play.** 485.5: *"Setup: Each player randomly selects one (1) of their three
(3) Battlefields. The other two are removed and will not be used for this game."* One in three. With
the 13.97% that is **4.66%** of games in which the line can be on the board by the end of T3, before
the opponent does anything.

Not walked: going second (three runes on T1, so the T3 seven has a spare Energy-2 body); the mulligan;
2v2 and Match (486.5 lets you choose the battlefield); an opponent that takes the Plaza first, which
going second it cannot do before your T2; and the turns after their T4.

## Leads

- The Plaza line in Chaos/Fury is the identity's first finisher that pays by T4 on the clock, and the
  walk shows how much the clock leaves out: a swarm that wins at a Hold has to survive the opponent's
  turn with its count intact, and 1-Might tokens make every ready enemy body an answer. The existing
  Plaza entries say the same in Might terms (`vanguard-captain-manufactor-plaza`: *"so five 1-Might
  Recruits plus a 2-Might and two 3-Might units cost 13 damage to clear, not 8"*), but clearing the
  board is not the predicate. Killing one unit of seven is. For a board of exactly seven the price is
  the Might of the cheapest unit, here 1.
- Their T2 decision is where the line is won or lost: bodies to base keep the attack open, bodies to
  their own battlefield close it (144.4.a, 144.4.b). An entry built on a Plaza Hold could say which
  board it needs from the opponent, not only from you.
- The turn clock does not charge `anyBodies`, so every finisher that declares bodies that way is
  priced as if they were free. This row prints T3 where the arithmetic is T4. The same gap may sit
  under `flurry-of-feathers-grand-plaza-win` (anyBodies 3, T3 on the clock) and the other rows with
  the field; not measured here.
- Rules note to stage: 157 (*"A spell creates a game effect according to its instructions and is then
  placed in the Trash of the player who owns it."*) is cited 9 times in `data/combos.json` and nowhere
  in `CLAUDE.md` or `docs/rules-notes/`. One more entry citing it twice takes it to 11, and
  `test/rules-veins.test.ts` (Vein A, ten or more) fails. The new entry cites 351.2 for the same fact.
  Either paragraph places a resolved spell in the trash, which is where [Flow] (829.1.b) casts from.
- `trifarian-war-camp-illaoi-tentacles` says the War Camp and the Plaza cannot share a deck's board
  (485.4.a, 103.4.c). The War Camp's +1 Might is the one colourless fix for 1-Might Tentacles, so the
  Plaza swarm cannot have it.
