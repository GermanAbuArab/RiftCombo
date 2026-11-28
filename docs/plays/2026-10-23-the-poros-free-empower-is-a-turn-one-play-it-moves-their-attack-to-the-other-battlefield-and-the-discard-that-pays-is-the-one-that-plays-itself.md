# Play — The Poro's free Empower is a turn-one play, it moves their attack to the other battlefield, and the discard that pays is the one that plays itself

Issue #429 (a slice of #200), 2026-10-23. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `punching-poro-morbid-return-free-empower`**, the Fury/Chaos ENGINE in which `VEN-007
Punching Poro` (Fury, E2, M2) pays its [Empower] by discarding a card, which makes it a 3 for good, and
`OGN-170 Morbid Return` (Chaos spell, E2, [Action]) returns the discarded unit from the trash. The
entry is right about the cost: the Poro is one of five [Empower] costs in the pool that pay no Energy
and no Power, and an Empowered Poro stays Empowered. Walked as a game, going first, under `SFD-185
Glorious Executioner` against the Calm/Order Leona deck, the free Empower came on T1, the turn the Poro
itself spends both runes. Their T2 `OGN-210 Daring Poro`, a 3 on the attack, would only have traded
with the 3 at A. It took the empty B instead. Morbid Return then brought the discarded `OGN-012 Noxus
Hopeful` back on T3 and turned on the Hopeful's [Legion], so the Return cost no Energy that turn. Score
after their T4: **3 to 3**. The same hand with the Empower never paid also ends **3 to 3**: their Poro
takes A instead of B, and the Return is still in hand, with the dead Punching Poro to fetch. The pair
moved no point. The discard that does is `OGN-006 Flame Chompers`, which plays itself from the trash for
one Fury Power: the same T1 puts two 3s on the board, and it is **6 to 1** after their T4. The cheapest
answer to the Poro is one rune on their T2: `OGN-046 En Garde` makes the Daring Poro a 5 at A.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-23 at `bdfc1f2`, reads
773 entries, 262 with forced-ordering language, **97 in the queue and 9 of them with no play**. The
issue measured 9 of 99 at `0526f2c`. The queue lost two entries and the number with no play did not
move, so the two picks are unchanged and two ranks higher. The pick is by global rank, skipping entries
that already have a play: this entry is rank 89, the first in the list. The other entry of this slice
is rank 90, `en-garde-hand-hammer-alone-versus-pair`. Both decks are the ones walked in
[Whirlwind reaches any unit, so the opponent picks first on your board](2026-10-23-whirlwind-reaches-any-unit-so-the-opponent-picks-first-on-your-board-and-the-attendant-is-what-they-pick.md),
with the same seats, battlefields and opponent's draws, so the two plays can be read side by side.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-185 Glorious Executioner` (Fury/Chaos, tag Draven) |
| **Chosen Champion** | `OGN-028 Draven, Showboat` (Fury, E5 + 1 Fury Power, M3), never played in the walk |
| **The engine** | `VEN-007 Punching Poro` (Fury, E2, M2) and `OGN-170 Morbid Return` (Chaos spell, E2), one copy each as the entry declares |
| **The other bodies** | `OGN-018 Noxus Saboteur` (Fury, E3, M3), `OGN-012 Noxus Hopeful` (Fury, E4, M4), `OGN-010 Legion Rearguard` (Fury, E2, M2), `OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-016 Dangerous Duo` (Fury, E3, M3), `OGN-171 Mystic Poro` (Chaos, E2, M2) |

The entry admits any of the five Fury/Chaos legends. Glorious Executioner is the one for this walk
because its text fires on a won combat and nothing else: *"When you win a combat, draw 1. (You win if
only your units remain after combat.)"* It never fires here: you win no combat. Its
tag is Draven, so Draven, Showboat can be the Chosen Champion, 103.2.a.2: *"Must be a champion unit with
a champion tag that matches the tag on your Champion Legend."*

Both engine cards are mono-domain, so a Fury/Chaos deck admits them, 103.1.b.3: *"If a card has a single
Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain."* Three
copies of each is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the same named
card."* The walk uses one of each, as the entry declares, and §4 prices three. None of the cards in
this play is a Signature card (`signature` in `data/cards.json`), and none is in
`data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Punching Poro: *"[Empower] — Discard 1 (Pay the cost: Empower me. Use only if not Empowered.)
  [Empowered][>] I have +1 :rb_might:."*
- Morbid Return: *"[Action] (Play on your turn or in showdowns.) Return a unit from your trash to your
  hand."*
- Noxus Hopeful: *"[Legion] — I cost :rb_energy_2: less. (Get the effect if you've played another card
  this turn.)"*
- Flame Chompers (§4, the other discard): *"When you discard me, you may pay :rb_rune_fury: to play
  me."*

## 2. What the Empower costs, when it can be paid, and what it keeps

**It is an activated ability, so it is your turn and an open state.** 827.1: *"Empower is an Activated
Ability keyword."* 381: *"All Activated Abilities can only be activated on the Controlling Player's
Turn and during an Open State."* The shorthand is 827.1.c.1: *"Empower is functionally short for
“[Cost]: Empower this. Play only if not Empowered.”"* Its cost here is a card and nothing else, 827.1.c.2:
*"Empower costs may include both resource costs and non-resource costs."* The cost carries no exhaust,
so the Poro can pay it the turn it lands, although it enters exhausted, 143.4: *"Units enter the Board
exhausted."* On T1, going first, you have two runes and the Poro costs both. That is the turn the entry
means by *"a turn when every Energy is committed"*.

**The discard is a cost you can always see coming.** 422.3: *"When Discarding is listed as a Cost, then
the Action must be able to be completed for the cost to be paid."* You choose the card, 422.1.a: *"The
player who is performing the action chooses which cards to send to their Trash, and may use Private
Information to do so."*

**It is bought once and kept.** 441.1.b: *"An Empowered Game Object can not be Empowered."* 441.2:
*"“Empowered” is a state for Game Objects on the board that other game effects and abilities can
reference."* A Poro that leaves the board leaves the state behind, 124: *"A Game Object that changes zones to or
from a Non-Board Zone becomes a new object for the purposes of tracking that object."* A Poro returned
to hand and replayed can pay again.

**Nothing in the Empower is a target; Morbid Return is.** The Poro is not, 827.1.b.1: *"The source game
object is not a target of the Empower ability."* The discarded card is not, 355.10.c: *"It is included
only as part of a cost, trigger condition, or replacement effect."* Morbid Return's own sentence is the
rules' example of a target, 355.10.a: *"e.g., “Return a unit from your trash to your hand” targets a unit
card in your trash, because your trash is Public."* That is why a counterspell reaches the Return and
nothing reaches the Empower (§5).

**The Return needs a unit in your trash, and any unit will do.** It does not care how the unit got
there. A unit of yours that dies in combat is as good a target as the one the Poro discarded.

**Moving and taking a battlefield.** Units move from base to a battlefield and back, never between
battlefields, 144.4.a: *"Units may move from their Base to a Battlefield."* 144.4.b: *"Units may move
from a Battlefield to their Base."* 144.4.c.1 is the one exception: *"Units with Ganking may use their Standard Move to Move from Battlefield to
Battlefield."*, and no unit in this walk has [Ganking]. A unit is played to base or to a battlefield its controller
controls, 355.2.a: *"By default, Valid locations include the controller’s Base or a Battlefield the
controller controls."* Taking a battlefield scores, 469.1: *"Conquer: A player gains Control of a
Battlefield they did not yet Score this turn."* Keeping it scores at the start of the turn, 469.2:
*"Hold: A player maintains Control of a Battlefield they did not yet Score this turn during their
Beginning Phase."* An emptied battlefield is lost, 190.4.c: *"If a player has no Units at a Battlefield
and the turn is in an Open state, they lose Control of that Battlefield in the following cleanup unless
there is a Combat or Showdown ongoing there."*

**The runes, going first.** You have 2, 4, 6 and 8 runes channelled on T1 to T4. Nothing in your main
line costs Power, so none is recycled. Going second, they channel an extra rune on T1, 485.7: *"First
Turn Process: The player going second channels an extra Rune from their Rune Deck during their first
Channel Phase of the game."*

## 3. Their deck: Calm/Order Leona

The deck of the Whirlwind play linked above, and of the Guard play before it. `OGN-261 Radiant Dawn`
(Calm/Order): *"When you stun one or more enemy units, buff a friendly unit. (If it doesn't have a
buff, it gets a +1 :rb_might: buff.)"*; nothing in the walk stuns. Its Chosen Champion is `OGN-238
Leona, Determined`, never played. The engine is `SFD-157 Royal Guard` (Order, E4, M2): *"When you play
me, play a 2 :rb_might: Sand Soldier unit token here."* Then `VEN-119 Keeper of Law` (Order, E5 + 1
Order Power, M5): *"I cost :rb_energy_2::rb_rune_order: less if you control a battlefield with exactly
two units there."* The rest are Daring Poro (Order, E2, M2): *"[Assault] (+1 :rb_might: while I'm an
attacker.)"*, `OGN-054 Sunlit Guardian` (Calm, E3, M3, [Shield], [Tank]), `SFD-159 Trusty Ramhound`
(Order, E2, M2), `OGN-218 Vanguard Captain` (Order, E3 + 1 Order Power, M3, [Legion] two 1-Might
Recruits), `OGN-044 Clockwork Keeper` (Calm, E2, M2) and `OGN-216 Soaring Scout` (Order, E2, M1).

## 4. The turns, going first

Fury/Chaos against Calm/Order. Your battlefield is A, `SFD-210 Hall of Legends` (*"When you conquer
here, you may pay :rb_energy_1: to ready your legend."*, and your legend has no exhaust ability); theirs
is B, `OGN-282 Monastery of Hirana` (*"When you conquer here, you may spend a buff to draw 1."*, and
nobody has a buff). Your opening four are Punching Poro, Noxus Saboteur, Morbid Return and Legion
Rearguard. Your draws are Noxus Hopeful (T1), Pouty Poro (T2), Dangerous Duo (T3) and Mystic Poro (T4).
Their opening four are Daring Poro, Royal Guard, Keeper of Law and Sunlit Guardian. Their draws are
Clockwork Keeper (T1), Trusty Ramhound (T2), Soaring Scout (T3) and Vanguard Captain (T4), as in the
Whirlwind play.

```
turn      runes   your turn                                                 points
T1        2       Punching Poro (E2) to base. Empower: discard Noxus        0
                  Hopeful. The Poro is a 3. None left.
their T1  3       Daring Poro (E2) to base. One left.
T2        4       The Punching Poro walks to A, Conquer: +1. Noxus          1
                  Saboteur (E3) to base. One left.
their T2  5       Daring Poro walks to B, empty, Conquer. Royal Guard
                  (E4) to B; its Sand Soldier is at B too. One left.
T3        6       Hold A: +1. Morbid Return (E2): the Hopeful comes back.   2
                  Noxus Hopeful (E2 with Legion) and Pouty Poro (E2) to
                  A. None left.
their T3  7       Hold B. Daring Poro walks B to base. Keeper of Law (E3,
                  no Power) to B. Sunlit Guardian (E3) to B. One left.
T4        8       Hold A: +1. Legion Rearguard (E2), Dangerous Duo (E3)     3
                  and Mystic Poro (E2) to A. One left.
their T4  9       Hold B. Trusty Ramhound (E2), Vanguard Captain (E3 + 1
                  Order Power) and Clockwork Keeper (E2) to B. Nine
                  runes, one recycled; two left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T2 it
is **1 to 0**; after their T2, **1 to 1**; after your T3, **2 to 1**; after their T3, **2 to 2**; after
your T4, **3 to 2**; after their T4, **3 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro, 3 after the discard; 4 after the T2
draw, 3 after the Saboteur; 4 after the T3 draw, 3 after the Return, 4 with the Hopeful back, 2 after
the Hopeful and Pouty Poro; 3 after the T4 draw, 0 after the three bodies. Theirs: 5 after the T1 draw,
4 after the Poro; 5, then 4 after the Guard; 5 after the T3 draw, 3 after the Keeper and the Guardian;
4 after the T4 draw, 1 after the three bodies (Soaring Scout).

**Your T1: why the Hopeful.** It is the card in hand you can least use soon: E4, or E2 only on a turn
when another card has been played first. The Return is the card that brings it back, and being a card
played that turn, it is also what makes the Hopeful cost two.

**Their T2: the 3 at A turns their Poro around.** Attacking, the Daring Poro is a 3, and the Punching
Poro defends as a 3. The damage is summed and assigned, 465.2.c: *"Starting with the Attacker, each
player assigns an amount of damage equal to their summed Might among the other's Units."* Each 3 is
lethal on the other, 142.4.b: *"Lethal Damage for a Unit is a non-zero amount greater than or equal to
that Unit’s Might."* Both die, A empties, and nobody takes it. Walking into the empty B instead scores
for them, keeps their Poro, and leaves your Punching Poro alone at A. They walk to B. The Guard goes to
B with it: B is then 2 + 2 + 2 = **6**, more than the Saboteur's 3, and one body can walk home on T3 to
leave exactly the two the Keeper wants. With the Guard in base instead, B is the Poro's 2 and the
Saboteur takes it on T3.

**Your T3: the Return, for no Energy.** The Saboteur cannot attack the 6 at B, and the Punching Poro
cannot reach B from A (144.4.b). The Return brings back the Hopeful, and the Hopeful's [Legion] reads
*"if you've played another card this turn"*: the Return is that card. Return and Hopeful cost four
runes, which is the Hopeful's own price. Pouty Poro takes the last two. Everything goes to A, which you
control (355.2.a).

**Their T3 and their T4.** The Daring Poro walks home, B has exactly the Guard and the Soldier, and the
Keeper costs three and no Power. The Guardian follows him. B defends as 2 + 2 + 5 + 3 + 1 (Shield) =
**13**. Nothing of theirs can reach A: their units at B can only go to base (144.4.b), and what they
play enters exhausted (143.4). Your 16 at A are never attacked, and your Saboteur's 3 never attack B.
Each side Holds its battlefield every turn.

**The control: the Empower never paid.** The same hand keeps the Hopeful, and the Poro is a 2.

- **Their T2.** The Daring Poro attacks A, 3 against 2. Your Poro dies. Its 2 are not lethal on a 3,
  and the Daring Poro is still a 3 when the combat cleanup kills: the designation comes off only at the
  end, 466.7.a: *"Remove Attacker and Defender Designation from all Units and Players."*, and [Assault]
  lasts that long, 807.1.d.1: *"Assault remains in effect as long as the Unit maintains the Attacker
  designation."* Conquer A. The Guard goes to A, which they now control: 2 + 2 + 2 = **6**. **1 to 1.**
- **Your T3.** The Saboteur walks into the empty B: Conquer, **2 to 1**. Pouty Poro, then the Hopeful
  for two with [Legion], then the Rearguard: B is 3 + 2 + 4 + 2 = **11**. The Return stays in hand.
- **Their T3.** They Hold A, the Daring Poro walks home, and the Keeper and the Guardian come down at A
  for six runes: **2 to 2**.
- **Your T4.** Hold B, **3 to 2**. The Return brings back the dead Punching Poro, which comes down
  again, and so does the Duo. **3 to 3** after their T4.

The scoreboard is the same, turn by turn. The battlefields are swapped: in the main line you keep A
and they take B, in the control they take A and you take B. Counting cards in hand and on the board,
both lines have seven after your T4: the main line's seven are all on the board, the control's are six
on the board and Mystic Poro in hand. The main line's Punching Poro is a 3, the control's a 2. The
Empower bought one point of Might on a body that never fought.

**The control: the Empower on T2.** Paid after the Poro walks to A on T2, it is the same 3 when their
Poro could first attack it. T1 is free in a way T2 is not: on T2 the discard is a card you could have
played with the runes you had.

**The other discard: Flame Chompers.** Put it in the Hopeful's place as the T1 draw. Its text is read in
the trash, after the discard, 422.1.b: *"“When I am discarded” abilities or other Triggered Abilities
that trigger on discarding are executed after discarding has occurred."* Its price is the one Fury
Power and nothing else, by 051 (*"Card text uses different terminology than rules. Card text should be
interpreted according to these rules, not as though it were text within these rules."*) and 356.1.a
(*"If an ability or instruction allows you to play a card “for [Cost]”, replace the card’s Base Costs
with [Cost]."*), the reading the verified `flame-chompers-discard-recursion` stands on. The Power is
paid by recycling one of the two runes the Poro exhausted, 164.2.b: *"Recycle this: [Reaction] — Add
[C]."*

```
turn      runes   your turn                                                 points
T1        2       Punching Poro (E2). Empower: discard Flame Chompers; pay  0
                  1 Fury Power, recycled, and the Chompers comes down in
                  base. One rune left on the board.
their T1  3       Daring Poro (E2) to base. One left.
T2        3       The Punching Poro walks to A, Conquer: +1. The Chompers   2
                  walks to B, Conquer: +1. Noxus Saboteur (E3) to base.
their T2  5       Daring Poro attacks B, 3 against 3: both die, and you
                  lose B. Royal Guard (E4) to base. One left.
T3        5       Hold A: +1. The Saboteur walks to B, empty, Conquer: +1.  4
                  Pouty Poro (E2) to B, Dangerous Duo (E3) to A.
their T3  7       Keeper of Law at full price (E5 + 1 Order Power) to
                  base. Clockwork Keeper (E2) to base.
T4        7       Hold A and B: +2. Rearguard (E2) and Mystic Poro (E2) to  6
                  B. Morbid Return (E2): the Chompers comes back. One left.
their T4  8       Guard, Soldier, Keeper and Clockwork Keeper, 11, attack
                  A's 6 and take it.
```

**6 to 1** after their T4, against 3 to 3. Two battlefields on T2 because two 3s were on the board on
T1. The Guard and the Soldier, 4, never have a battlefield to walk into on their T3 (A is 6 and B is 5),
and they never control a battlefield with exactly two units there, so the Keeper costs full price. The
price is a rune: one T1 rune is recycled for good, so you are a rune short every turn after.
[2026-10-24, #452: not for good. A recycled rune goes to the bottom of the Rune Deck (416.1, 416.1.b) and is
channelled again when the deck reaches it (430.1). Going first, with only the Channel Phase's two a turn
(315.3.b), each rune recycled is a rune short on every turn through T6, until the Rune Deck runs dry
(161.2.a); a card that channels more (430.2) brings it back sooner. The walk ends after their T4, so the
count stands for every turn it covers. The wording above is kept as history.]
It needs a
Fury rune among your first two, and the Chompers in hand on T1 (§7). And on T4 the Return has a job:
it brings back the Chompers that died at B, ready to be discarded to the next Poro.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 5 cards by T1, 7 by T3. With one copy of each, as
declared: the Poro among the first 5 is **12.82%**, the Return among the first 7 **17.95%**, both on
time **2.02%**. With three of each, the 103.2.b cap: **34.52%**, **45.73%** and **14.42%**. The
Chompers line needs a Poro and a Chompers both among the first 5: **1.35%** with one of each,
**10.27%** with three of each. A unit to discard on T1 is the walk's assumption: your T1 hand is the
Poro and four other cards.

## 5. Breaks to

**What the engine did, and the predicate.** The Empower made the Punching Poro a 3 on T1, and on their
T2 that 3 turned the Daring Poro's attack into a trade, so they took B instead. The Return brought back
the Hopeful on T3. The predicate is: cast or played by them, on their T2 or on your T3, does it let the
Daring Poro take A, or stop the Return?

**The scope.** A Calm/Order deck plays only Calm, Order and Calm/Order cards (103.1.b), and its
Signature cards must carry its legend's tag. The predicate is: a card in `data/cards.json` whose
domains are all Calm or Order (tokens carry no domain), not a legend, battlefield or rune, and not a
Signature card with another champion's tag. Folded by name, that is **254** cards, the pool of the
Whirlwind play.

**Their T2: one rune.** Five runes, less the Guard's four. The combat at A opens a showdown, and only
[Action] and [Reaction] play there, 308.1.a: *"Only cards and abilities with the Action or Reaction
keywords can be played or activated in a Showdown State."* **62** of the 254 carry [Reaction],
[Action], [Hidden] or [Ambush] (the regex `\[(Reaction|Hidden|Ambush|Action)\]`, case-insensitive, on
the whole text with reminder text left in). **Nine** cost one Energy or less. No hidden card is
possible: hiding needs a battlefield they control, 811.1.b: *"you may pay [A] to hide this facedown at
a battlefield you control"*, and on their T1 they control none. Four of the nine break it, each for
one ready rune and a card:

- **`OGN-046 En Garde`** (Calm, E1): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Give a friendly unit +1 :rb_might: this turn, then an additional +1 :rb_might: this turn if
  it is the only unit you control there."* The Daring Poro is alone at A: a **5**. Your 3 is not
  lethal on it, its 5 kill your Poro, and they Conquer A.
- `UNL-031 Combat Experience` and `UNL-046 Friendship` (the Daring Poro is a Poro): +1, a **4**. Your
  3 is not lethal; its 4 are.
- `VEN-040 Decree of Focus`: *"Choose a friendly unit that's in combat with an enemy Fury
  (:rb_rune_fury:) unit or that's being chosen by an enemy Fury spell. Give it +4 :rb_might: this
  turn."* The Punching Poro is Fury: a **7**.

Any of the four returns the game to the control's board: their Poro alive at A beside the Guard and the
Soldier, yours dead, with the Hopeful in your trash rather than in your hand and their card spent. The
Return then has two units to choose from on T3, and it is **3 to 3** after their T4. The other five do
not: `OGN-045 Defy` and `VEN-039 Crumbling Sands` counter a spell and you cast none on their turn;
`OGN-081 Seal of Focus` and `OGN-245 Seal of Unity` are gear abilities, and neither gear is on the
board; `UNL-173 Sacrifice` needs a friendly Mighty unit.

**Your T3: the Return.** They have one ready rune left from their T2. Of the pool's five counterspells,
one reaches it: **`OGN-045 Defy`** (Calm, E1 + 1 Calm Power): *"Counter a spell that costs no more than
:rb_energy_4: and no more than :rb_rune_rainbow:."* The Return costs two and no Power. The ready rune
pays the Energy and a Calm rune is recycled for the Power: **one ready rune and one Calm Power, and it
costs them a rune for good.**
[2026-10-24, #452: not for good. A recycled rune goes to the bottom of the Rune Deck (416.1, 416.1.b) and is
channelled again when the deck reaches it (430.1). Going second, with 485.7's extra rune and then only the
Channel Phase's two a turn (315.3.b), each rune they recycle is a rune short on every turn through their T5,
until their Rune Deck runs dry (161.2.a); a card that channels more (430.2) brings it back sooner. The walk
ends after their T4, so the count stands for every turn it covers. The wording above is kept as history.]
The Hopeful stays in the trash; Pouty Poro and the Rearguard go to A for
the four runes left, and A is 2 Might smaller. Nothing of theirs attacks A, so the score does not move:
**3 to 3**. `VEN-039 Crumbling Sands` needs another spell of yours that turn, and `SFD-045 Not So Fast`
counters a spell that chooses *"a friendly unit or gear"* of theirs, and the Hopeful in your trash is
yours.

*Before it: empty your trash.* `OGN-212 Forge of the Future` (Order gear, E2): *"When you play this,
play a 1 :rb_might: Recruit unit token at your base. Kill this: Recycle up to 4 cards from trashes."* On
their T1 it costs two of their three runes and takes the Hopeful back into your deck, so the Daring Poro
is a turn late. With the Hopeful gone, the Return has no target on T3, and A gets Pouty Poro and the
Rearguard instead.

**What the census says about the engine.** The Empower cannot be answered: on your T1 they have no rune,
and nothing in it is a target. What it bought can be answered for one rune by four cards, and the Return
by one.

## 6. Verdict

**Right about the cost; the pair moved no point.** The Poro's [Empower] pays no Energy and no Power, the
pool has five such costs, and the Empowered state is permanent (441.1.b, 441.2). Walked against the
Leona deck, the free Empower came on T1, when the Poro had spent both runes. On their T2 the 3 at A made
their Daring Poro's attack a trade, and they took the empty B instead. On T3 Morbid Return brought back
the Hopeful and paid for itself by turning on the Hopeful's [Legion]. **3 to 3** after their T4.
Without the Empower it is **3 to 3** too, with the battlefields swapped and the Return still in hand.
The Return needed no discard: in the control a combat death filled the trash. The discard that moved
points is Flame Chompers, which plays itself for one Fury Power: two 3s on T1, two battlefields on T2,
**6 to 1** after their T4. The cheapest answer to the Poro is En Garde, Combat Experience, Friendship or
Decree of Focus, one ready rune on their T2; to the Return, Defy, one ready rune and one Calm Power.

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Chaos in the twelve of Tournament
Rules 402.1. Nothing in your main line or its control costs Power, so no deal breaks them. The Chompers
line needs a Fury rune among your first two, to recycle for its Power: it fails in **15 of 66,
22.73%**, the deals with two Chaos first.

Their walk assumes six Calm and six Order. The Keeper's discount removes his Order Power, so their T3
needs no particular domain; at full price, in the Chompers line, he needs an Order rune among their
seven: **0 of 792**. Vanguard Captain on their T4 needs an Order rune among nine: **0 of 220**. Defy on
your T3 needs a Calm rune among their five: it fails in **6 of 792, 0.76%**.

**How likely an answer is.** Out of their own **39**, by their T2 they have seen **6** cards: four
opening and a draw on each of their two turns. En Garde, run three times, is among them in **40.30%**,
and so is each of the other three pump spells alone. Defy has to be among the same **6** by your T3:
**40.30%** with three copies. These count only the cards named, not how many of them a deck runs.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2, Draven, Showboat, a second Punching Poro (a new object pays its own Empower), and the
turns after their T4. In the Chompers line their T2 trade at B is one choice of two; with the Daring
Poro kept back instead, you Hold both battlefields on T3. The probabilities count only the cards named.

## Leads

- *"On a turn when every Energy is committed"* (step 2): that turn is the Poro's own. On T1, going
  first, the Poro costs both runes, and the discard is the only cost left. Paid later, the discard is a
  card you could have played with the runes you had.
- *"the only thing actually spent was the Return's 2 Energy"* and *"a tempo-free one, at the cost of a
  card slot"*: off by a card. Morbid Return is a card, so the pair is one card for +1 Might on one body.
  In the walk its 2 Energy came back as the Hopeful's [Legion] discount, so it cost no Energy that turn;
  the card was still gone.
- *"the card it cost returned for 2 Energy"* (`netPerIteration`): the Return does not need the discard.
  Any unit of yours in the trash is a target; in the control the Return fetched the Punching Poro that
  died in combat.
- *"VEN-143 Master of Shadows is himself a discard outlet"*: his discard costs *"Disempower me"*. The
  natural reading is that he has to be Empowered to pay it, 203.3 (*"If the game action associated
  with a Cost is impossible for any reason such that a player cannot perform it, then they cannot pay
  the Cost and they will not execute the linked Effect."*) and 442.1.a (*"Disempowering affects only
  cards that are currently Empowered."*). It is a reading, not a ruling. The paragraph under 442.1.a,
  442.1.a.1, calls the action a no-op rather than impossible: *"Game effects that instruct a player to
  Disempower a card that is not currently Empowered will do nothing."* No paragraph says a Disempower
  COST on a card that is not Empowered cannot be paid, though Discard has one, 422.3: *"When Discarding
  is listed as a Cost, then the Action must be able to be completed for the cost to be paid."*
  Unruled; reported for filing as a reading. If he must be Empowered, he Empowers only *"When you
  banish a card you own"*.
  [2026-10-24: settled by the #436 finding (PR #441): a "Disempower me" cost cannot be paid while the
  card is not Empowered (203.3 with 442.1.a), and 442.1.a.1 is the effect-side no-op only. The finding is
  in `docs/rules-notes/rules-findings.md`
  (https://github.com/GermanAbuArab/RiftCombo/blob/master/docs/rules-notes/rules-findings.md), the #436
  entry. The "Unruled" sentence above is kept as history.]
- Not named: the discard that pays. `OGN-006 Flame Chompers` (*"When you discard me, you may pay
  :rb_rune_fury: to play me."*) turns the Poro's discard into a 3-Might body for one Fury Power. Walked
  in §4, it is **6 to 1** after their T4 against the pair's 3 to 3. And Morbid Return is what puts a
  dead Chompers back in hand to be discarded again.
- Not named: the Empower has no target (827.1.b.1, 355.10.c), but Morbid Return does, and its sentence
  is 355.10.a's own example. `OGN-045 Defy` counters it for one ready rune and one Calm Power.
- Not named: the cheapest answer to the +1. Four E1 Calm reactions undo it in the combat it was bought
  for: `OGN-046 En Garde`, `UNL-031 Combat Experience`, `UNL-046 Friendship` and `VEN-040 Decree of
  Focus`, which keys on an enemy Fury unit, and the Poro is Fury.
- Checked and right: *"exactly five pay neither Energy nor Power"*. Swept over every [Empower] cost
  string in `data/corpus_flat.txt` on 2026-10-23: `VEN-007` (Discard 1), `VEN-110` (Discard a spell),
  `VEN-054` and `VEN-087` (an exhaust each) and `VEN-124` (kill a friendly unit). The other 33 of the
  38 [Empower] costs carry Energy or Power; `VEN-163 Risen Altar`, the 39th line, is a battlefield
  that discounts them.
