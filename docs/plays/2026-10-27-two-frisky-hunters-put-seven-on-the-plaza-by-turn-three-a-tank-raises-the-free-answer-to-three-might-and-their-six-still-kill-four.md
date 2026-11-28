# Play — Two Frisky Hunters put seven on the Plaza by turn three, a Tank raises the free answer to three Might, and their six still kill four

Issue #496 (a slice of #200), 2026-10-27. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against,
[the coverage table](2026-10-27-identity-coverage-by-legend-pair.md) for why this pair, and
[the Up from the Deep play](2026-10-27-up-from-the-deep-puts-seven-on-the-plaza-by-turn-three-and-the-two-bodies-they-already-had-kill-five-of-them.md),
the slice-1 line this one is compared with throughout.

**Subject: `frisky-hunter-grand-plaza`**, a new ALT_WIN synthesized for this slice. Body/Calm is the
least-covered legend pair the identity-first pass has not worked yet: four finishers in the catalogue
and none clocked by T4. The line: two Energy-1 bodies take `OGN-293 The Grand Plaza` on T2, and
`UNL-033 Frisky Hunter` (Calm unit, E4) is played onto it on T2 and again on T3, each with the 1-Might
Bird its play trigger puts "here". A third body on T3 makes **seven units at the Plaza after twelve
Energy and no Power**, and the Hold at the start of T4 wins. The turn clock prices it at **T4 against
the Body/Calm Hold baseline of T5**. There is no spell in it, so the spell tax that cost the Up from the
Deep line a turn does nothing here. Walked as a game, going first, against the same Calm/Order Radiant
Dawn deck and the same draws as the Up from the Deep play, **it does not win on T4**. The seventh unit
is `UNL-036 Mutated Mouser`, whose [Tank] and [Shield 2] make killing one of the seven cost 3 Might
instead of 1. Their two T2 bodies attack with 6, and that is enough to kill the Mouser and three
more. **3 to 3 after their T4**, the same score the slice-1 line reached. The cheapest answer is still
free, from 3 Might ready in their base. The cheapest spell is still one Energy: `OGN-133 Flurry of
Blades` (Body) kills five of the seven.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-257 Blind Monk` (Calm/Body, tag Lee Sin) |
| **Chosen Champion** | `OGN-151 Lee Sin, Centered` (Body, E6, M6), never played |
| **Battlefield** | `OGN-293 The Grand Plaza` (colourless), and it has to be the one of your three that is in play |
| **The engine** | `UNL-033 Frisky Hunter` (Calm unit, E4, M3), two copies by T3 |
| **The bodies** | `UNL-111 Determined Sentry` (Body, E1, M1) and `VEN-043 Steel Paws` (Calm, E1, M0) on T1; `UNL-036 Mutated Mouser` (Calm, E2, M1) on T3 |

Every card in the line costs Energy only, so the line runs on any rune split. From the opponent it
needs **nothing of theirs ready in their base on their T3 with 3 Might or more** (§4, §5), and no
one-Energy removal spell.

Blind Monk is Calm/Body and its tag is Lee Sin, so Lee Sin, Centered can be the Chosen Champion,
103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your Champion
Legend."* Every card in the line is mono-Body, mono-Calm or colourless, so the deck admits it,
103.1.b.3: *"If a card has a single Domain, then that card is permitted in the Domain Identity that
corresponds to the same Domain."* Three copies is the cap, 103.2.b: *"Your Main Deck can include up to
3 copies of the same named card."* The walk's list runs three of each of the five cards above, fifteen
of its 39. None of the cards on either side is a Signature card (`signature` in `data/cards.json`),
and none is in `data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

**Why these two bodies.** They are the only units at Energy 1 or less in Body or in Calm, and each
domain has one: Determined Sentry is Body and Steel Paws is Calm. Body/Calm is therefore the one pair
whose deck can run six Energy-1 bodies, and the line needs two of them on T1. The clock prices a
generic Calm body at E1 for the same reason.

The card text the play turns on:

- The Grand Plaza: *"When you hold here, if you have 7+ units here, you win the game."*
- Frisky Hunter: *"When you play me, play a 1 :rb_might: Bird unit token with [Deflect] here.
  (Opponents must pay :rb_rune_rainbow: to choose it with a spell or ability.)"*
- Mutated Mouser: *"[Shield 2] (+2 :rb_might: while I'm a defender.) [Tank] (I must be assigned combat
  damage first.)"*
- Steel Paws: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or ability.)
  [Empower] :rb_energy_7: (:rb_energy_7:: Empower me. Use only if not Empowered.) [Empowered][>] I have
  +7 :rb_might:."* The [Empower] costs more than the line ever has spare and plays no part.
- Determined Sentry: *"I can't move to base."* It only ever moves from base to the Plaza.
- Blind Monk: *":rb_energy_1:, :rb_exhaust:: Buff a friendly unit. (If it doesn't have a buff, it gets a
  +1 :rb_might: buff.)"* Used once, on T4, with a spare rune.

## 2. What the line does, and why each step is legal

**The Plaza has to be yours first.** A battlefield's "you" is its controller, 190.6.d: *"“You” in a
battlefield’s abilities refers to the battlefield’s Controller, as does the implied “you” in
instructions that don’t specify a player like “draw 1.” If the battlefield has no Controller, “you”
refers to no one, and all such instructions are ignored."* A unit enters exhausted, 143.4: *"Units
enter the Board exhausted."*, so the two bodies played on T1 are the first that can move, and they
move from base, 144.4.a: *"Units may move from their Base to a Battlefield."* The Plaza is empty, so no
combat, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are a
stand-alone Phase and do not create a Combat."* It is a Conquer, 348.2.a.1: *"This results in a
Conquer if that player has not yet scored that Battlefield this turn."*

**The Hunters are played straight onto it, and so are their Birds.** 355.2.a: *"By default, Valid
locations include the controller’s Base or a Battlefield the controller controls."* The Bird's location
is the Hunter's, by 359.3.f.1: *"Some information used by abilities is referenced from the source of
those abilities, or from one or more targets of a spell or ability. This can usually be recognized by
the presence of words like “here,” “my,” or “its.”"* and 359.3.f.2: *"Information referenced in an
instruction in this way will be checked on execution of the instruction."* The token is played under
the same steps as a card, 185.2.a: *"Tokens can be played by their owner if their card type is played,
following all the applicable steps for playing a card plus any restrictions or modifications from the
effect that created the token."* It is defined by rule, 187.7: *"A 1 [M] Bird token is a domainless
unit token with 1 Might, the Bird tag, and the Deflect keyword."* No unit has to walk anywhere after
T2.

**No card in the line is a spell.** The Hunter is a unit and its Bird comes from its own play trigger.
That is the whole difference from the Up from the Deep line on the opponent's side of the table: a spell
tax raises nothing here, and there is nothing to counter.

**The win is counted at the Hold.** The Hold is the first thing in your Beginning Phase, 315.2.b.2:
*"The Turn Player Holds all Battlefields they Control."* and 469.2: *"Hold: A player maintains
Control of a Battlefield they did not yet Score this turn during their Beginning Phase."* The seven are
part of the trigger condition, 383.2.a.1: *"Any additional conditional statement immediately after the
Condition must be true in order for the Condition to be fulfilled. Such a conditional statement is part
of the Trigger Condition and not the Effect."* So they must be at the Plaza when the Hold happens.
Once the ability resolves the game is over, 195: *"A player also wins the game if an effect instructs
them to do so, or if they are the only player remaining in the game."*

**Combat, and what the Mouser changes.** 465.2.c: *"Starting with the Attacker, each player assigns an
amount of damage equal to their summed Might among the other's Units."* 465.2.c.3: *"Units must have
lethal damage assigned to them in full before damage is assigned to a different Unit."* 142.4.b:
*"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s Might."* So a
1-Might unit dies to 1 damage, and Steel Paws at 0 Might dies to 1 as well, because lethal damage is a
non-zero amount. [Tank] puts an order on that, 815.1.b: *"It is functionally short for "I must be
assigned lethal damage before any other unit with the same controller as me that does not have [Tank]
during the Combat Damage step."* [Shield] sets what lethal is for the Mouser, 814.1.c: *"It is
functionally short for "While I am a defender, I have +X [M].""*, so as a defender it is 3 Might and
needs 3 damage. **An attack that kills one of the seven therefore costs 3 Might, not 1**: the first
lethal damage has to go to the Mouser. An attack with 2 Might or less kills nothing. The Shield is
combat-only, 814.1.d.1: *"Shield remains in effect as long as the Unit maintains the Defender
designation."*, so outside combat the Mouser is a 1-Might unit. The combat result: 466.3.a: *"A Player
has won a combat if they received either the attacker or defender designation and are the only Player
that has units remaining at this battlefield during this step."*

Units move from base to a battlefield and back, never between battlefields, 144.4.b: *"Units may move
from a Battlefield to their Base."* So a unit of theirs at their own battlefield cannot reach the Plaza
on the same turn.

## 3. Their deck: Calm/Order Radiant Dawn

The same deck, in the same seat, with the same draws as in the Up from the Deep play, so the two walks
can be read side by side. `OGN-261 Radiant Dawn` (Calm/Order): *"When you stun one or more enemy units,
buff a friendly unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff.)"* Nothing in the walk
stuns. Its Chosen Champion is `OGN-238 Leona, Determined`, never played. The cards it plays:

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

`VEN-045 Helm of Suppression` stays in their hand, and here it has nothing to tax. Going second, they
channel an extra rune on T1, 485.7: *"First Turn Process: The player going second channels an extra
Rune from their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Body/Calm against Calm/Order. Your battlefield is A, The Grand Plaza; theirs is B, `OGN-282 Monastery
of Hirana` (*"When you conquer here, you may spend a buff to draw 1."*, and nobody has a buff when it
matters). Your opening four are Determined Sentry, Steel Paws, Frisky Hunter and Mutated Mouser. Your
draws are Frisky Hunter (T1), Determined Sentry (T2), Steel Paws (T3) and Frisky Hunter (T4). Their
opening four are Daring Poro, Trusty Ramhound, Soaring Scout and Helm of Suppression. Their draws are
Sunlit Guardian (T1), Stalwart Poro (T2), Royal Guard (T3) and Vanguard Captain (T4).

```
turn      runes   play                                                      points
T1        2       Determined Sentry (E1) and Steel Paws (E1) to base.       0
                  None left.
their T1  3       Daring Poro (E2) to base. One left.                       0
T2        4       Sentry and Paws walk to A, empty, Conquer: +1. Frisky     1
                  Hunter (E4) to A, its Bird to A. Four at A. None left.
their T2  5       Daring Poro walks to B, empty, Conquer. Trusty            1
                  Ramhound (E2) and Sunlit Guardian (E3) to base. None
                  left.
T3        6       Hold A: +1, four at A. Frisky Hunter (E4) to A, its       2
                  Bird to A. Mutated Mouser (E2) to A. Seven at A, 12
                  Might as defenders. None left.
their T3  7       Hold B. Royal Guard (E4, Sand Soldier to base) and        2
                  Stalwart Poro (E2) to base. One left. The Ramhound
                  and the Guardian (3 + 3 = 6) attack A. The Mouser,
                  Steel Paws, Determined Sentry and one Bird die; both
                  of theirs die. You win the combat. Three at A.
T4        8       Hold A: +1, three at A, no win. Frisky Hunter (E4)        3
                  and its Bird, Determined Sentry (E1) and Steel Paws
                  (E1) to A. Blind Monk (E1) buffs the Sentry. Seven at
                  A, 13 Might as defenders. One left.
their T4  9       Hold B. Soaring Scout (E2), then Vanguard Captain (E3     3
                  + 1 Order Power), [Legion] on, two Recruits to base.
                  Royal Guard, the Sand Soldier and Stalwart Poro
                  (2 + 2 + 2 = 6) attack A. Steel Paws, both Birds and
                  the Sentry die; all three of theirs die. You win the
                  combat. Three at A.
```

After your T2 it is **1 to 0**; after their T2, **1 to 1**; after your T3, **2 to 1**; after their T3,
**2 to 2**; after your T4, **3 to 2**; after their T4, **3 to 3**.

Runes at the end of each turn: yours 2, 4, 6, 8, exhausted every turn except one on T4, none recycled.
Theirs 3, 5, 7, and 8 after their T4: the Captain's Order Power recycles one of the nine.

Your hand, card by card: 5 after the T1 draw, 3 after the Sentry and the Paws (Frisky Hunter, Mutated
Mouser, Frisky Hunter); 4 after the T2 draw, 3 after the Hunter (Mouser, Hunter, Determined Sentry); 4
after the T3 draw, 2 after the Hunter and the Mouser (Determined Sentry, Steel Paws); 3 after the T4
draw, 0 after the Hunter, the Sentry and the Paws. Blind Monk draws nothing, so unlike the slice-1
legend it gives no card back when you win a combat. Theirs: 5 after the T1 draw, 4 after Daring Poro;
5 after the T2 draw, 3 after the Ramhound and the Guardian (Scout, Helm, Stalwart Poro); 4 after the
T3 draw, 2 after Royal Guard and Stalwart Poro (Scout, Helm); 3 after the T4 draw, 1 after the Scout
and the Captain (Helm).

**Your T2: four on the Plaza.** A defends at Sentry 1, Paws 0, Hunter 3, Bird 1: 5 Might. Their only
ready body on their T2 is Daring Poro, 3 as an attacker. Attacking A with it kills three of the four
(Paws, Sentry and the Bird each take 1) and the Poro dies to the 5 that comes back. That is a real
option for them and it would hold the Plaza to two units on your T3 Hold. They take B instead, for
the point, because the bodies they play this turn are ready on their T3 and do the same job one turn
later at no loss of tempo.

> **CORRECTED 2026-10-27 (#516):** the Poro attack holds the Plaza to **one** unit on your T3 Hold, not
> two. Re-walked: A holds Determined Sentry (1), Steel Paws (0), Frisky Hunter (3) and its Bird (1). The
> Poro attacks with 2 + 1 from [Assault] = 3 (*"[Assault] (+1 :rb_might: while I'm an attacker.)"*) and
> assigns 1 each to Steel Paws, Determined Sentry and the Bird; those three die and the Hunter, which
> took nothing, is the unit left. The 5 Might of your four defenders kills the Poro, you win the combat,
> and one unit, the Hunter, stands at A for the T3 Hold. That Hold scores 1 and does not win. The T3
> rune count is 6: a second Hunter and its Bird (E4) and either the Mouser (E2) or the Sentry and the
> Paws (E1 each) make at most 1 + 2 + 2 = 5 units at A, so the seven of the main line are not reached
> on T3. They give up the Poro and the Conquer on B (one point) for that.

**Their T2: the bodies stay home.** The Ramhound and the Guardian go to base, not to B. Played to B they
could not reach A on their T3 (144.4.a, 144.4.b). In base, they are ready on their T3 and A is one move
away. This is the same choice as in the Up from the Deep walk, and it is the answer again.

**Your T3: seven, and a Tank among them.** The second Hunter, E4, to A with its Bird; then the Mouser,
E2. You also hold Determined Sentry and Steel Paws, and E2 buys both of them instead of the Mouser:
eight units at A, one more than the Plaza needs. The Mouser is the better buy against this board, and
by the predicate in §5: with eight units of which six are 0 or 1 Might, an attack has to kill two and 2
Might does it; with the Mouser as the seventh, it has to kill one and that costs 3 Might, because the
Tank takes the first lethal damage. A defends at 1 + 0 + 3 + 1 + 3 + 1 + 3 = 12.

**Their T3: 6 is more than 3.** Royal Guard and Stalwart Poro go to base first, for six of their seven
runes. Then the Ramhound and the Guardian attack A. The Ramhound has another unit of theirs at A, so it
is 3; the Guardian's [Shield] works only on defence, so it is 3. They assign 6 first (465.2.c): 3 to the
Mouser, which [Tank] makes them do first (815.1.b), then 1 each to Steel Paws, Determined Sentry and a
Bird. Four of yours die. Your 12 must go to the Guardian first (815.1.b), 3, then 3 to the Ramhound,
and both die; the 6 left over has no unit to go to. Only your units remain at A, so you win the combat
(466.3.a), and A stays yours with **three** units on it: two Hunters and a Bird.

**Your T4: the Hold does not win.** 383.2.a.1 counts at the Hold: three units, so the Plaza does
nothing, and the Hold scores 1. The third Hunter, E4, with its Bird; the Sentry and the Paws, E1 each.
Seven again. The eighth rune buys Blind Monk's buff on the Sentry, which makes it 2 Might, and one rune
is left. A defends at 3 + 3 + 1 + 3 + 1 + 2 + 0 = 13. No Tank this time: the Mouser died on their T3
and the other two are still in the deck.

**Their T4: the same answer, from the bodies of their T3.** Royal Guard, its Sand Soldier and Stalwart
Poro were played on their T3, so they are ready now. 2 + 2 + 2 = 6 attacks A. The cheapest four of the
seven cost 1 + 1 + 1 + 2 = 5 (Steel Paws, the two Birds, the buffed Sentry), and the 1 left over cannot
kill a 3-Might Hunter. Four die. Your 13 kills all three of theirs. You win the combat and A has three
units, all Hunters. Before the attack they play the Scout and then the Captain with [Legion] on, two
Recruits to base: 1 + 3 + 1 + 1 = 6 Might ready for their T5. **3 to 3.**

**The game the line wins.** Two boards. If on their T2 the Ramhound and the Guardian go to B, as Daring
Poro did, nothing of theirs is ready in base on their T3 and the seven stand. And if what they have
ready in base on their T3 is 2 Might or less, for example one Energy-2 body, the Mouser takes all of it
and nothing dies: 815.1.b makes the first lethal damage the Mouser's, and 2 is not lethal for a 3-Might
defender. The Up from the Deep line had no such board: one Might killed a Tentacle. Either way your T4
Hold wins the game (195) on **2 to 2**.

## 5. Breaks to

**The predicate:** on their turn before your Hold, does it leave you with six or fewer units at the
Plaza? The answer has to land before the Hold: 383.2.a.1 fixes the count when the Hold happens.

**The free answer: attack with 3 Might or more from base.** With the Mouser as the seventh unit, one
kill costs its 3 lethal damage first. Without it, as on T4 here or with an Energy-1 body as the seventh,
one kill costs 1. The walked opponent had 6 ready on their T3 and on their T4. They lost the attackers
both times, and it did not matter, because the next turn's curve bodies were ready to do it again.

**The cheapest spells,** pool-wide, constructed-legal, priced against the target. Steel Paws and the
two Birds have [Deflect], 809.1.c: *"It is functionally short for "Spells and abilities an opponent
controls that target [me/this] cost an amount of Power equal to [Deflect Value] more to play as an
additional cost for each time they choose [me/this]."*, with 809.1.b.3: *"If X is omitted, it is
presumed to be 1."* and 809.1.c.1: *"The Power used to pay this cost may always be of any Domain."* The
two Hunters, the Mouser and the Sentry have none, so a spell aimed at one of them pays its printed
cost.

| card | cost | against the seven |
|---|---|---|
| `OGN-133 Flurry of Blades` (Body spell) | E1 | *"[Reaction] (Play any time, even before spells and abilities resolve.) Deal 1 to all units at battlefields."* It targets nothing, so [Deflect] does not apply. Outside combat the Mouser is 1 Might (814.1.d.1): Paws, Sentry, the Mouser and both Birds die. Two left. |
| `OGN-169 Gust` (Chaos spell) | E1 | *"[Reaction] (Play any time, even before spells and abilities resolve.) Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."* Aimed at a Hunter, the Mouser or the Sentry. Six left. |
| `OGN-043 Charm` (Calm spell) | E1 + 1 Calm | *"Move an enemy unit."* A Hunter or the Mouser moved to your base is not at the Plaza: six left. The cheapest in the walked opponent's identity. |
| `SFD-162 Blood Money` (Order spell) | E2 | *"[Action] (Play on your turn or in showdowns.) Kill a unit at a battlefield with 2 :rb_might: or less. If it was an enemy unit, play a Gold gear token exhausted. If it was a friendly unit, play two Gold gear tokens exhausted."* The Mouser or the Sentry. Six left. |

The walked opponent ran none of these and did not need one.

**The pre-emptive answer that worked on slice 1 does nothing here.** `VEN-045 Helm of Suppression`:
*"[Empower] :rb_energy_4::rb_rune_calm: (:rb_energy_4::rb_rune_calm:: Empower this. Use only if not
Empowered.) Opponents' spells cost :rb_energy_1: more. If this is [Empowered], they cost
:rb_energy_1::rb_rune_rainbow: more instead."* The line plays no spell, so on their T2 it would cost
them five runes and a turn of bodies and change no cost of yours. The T4 Hold stays where it is.

**The battlefield cannot be answered.** 170.3: *"Battlefields cannot be Killed during the course of
regular play."* What can be answered is the count.

## 6. Against the free Hold curve

| | pays |
|---|---|
| This line, `npm run adversarial -- --turns` | **T4** |
| Body/Calm Hold baseline, same command (the row prints `calm`, whose baseline is the same) | **T5** |
| This line in the walk above | not by T4; 3 to 3 after their T4 |

The clock prices the line at T4: two Hunters at E4 and three bodies at E1 each, eleven Energy, which
T1 and T2 (six runes) cannot pay and T3 can, so the set completes on T3 and the Hold waits for T4. The
hand count agrees: two Energy-1 bodies on T1 (2 runes), a Hunter on T2 (4), the second Hunter and a
third body on T3 (6). By the end of T2 the most at the Plaza is four, so T4 is the lower bound. The
clock does not model readying effects yet (#506); this line uses none, so that gap does not move it.

On the clock's board the line is one turn faster than the Hold curve: it spends eleven or twelve Energy
by T3 and wins at the T4 Hold, where the Body/Calm curve, with its Energy-1 bodies, reaches 8 on T5.
By the issue's rule it beats the baseline, and it enters `data/combos.json` as `status: candidate`.

The walk is the other half, as it was on slice 1. The Mouser moves the free answer from 1 Might to 3,
and an opponent who plays a body a turn has 3 ready on their T3 anyway.

## 7. Verdict

**One turn faster than the Hold curve on the clock, with no spell to tax and no Power to pay, and
stopped for free in the walk.** Twelve Energy and five cards (two Energy-1 bodies, two Hunters and a Mouser)
put seven units at the Plaza by the end of T3, and the T4 Hold is one turn ahead of the Body/Calm baseline of T5. A Tank as the
seventh unit is the one thing Body/Calm adds that Chaos/Fury did not have: killing one unit costs 3
Might instead of 1. Against a deck that plays two bodies on its T2 that is not enough: they attack with
6, kill four, and it is **3 to 3** after their T4. It is also a rare line: castable by T3 in about one
game in 180 (§8).

## 8. Not verified

**Runes.** The line costs no Power on your side, so every rune pays it: no rune split fails, **0 of
any** deal. Their side needs one Order rune among their first nine for the Captain's Power. The walk
assumes six Calm and six Order in the twelve of Tournament Rules 402.1, so all nine Calm is impossible:
**0 of 220**.

**How often the seven are castable by T3.** The draw pile is **39** cards, the 40 of Tournament Rules
402.1 less the Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register
a Main Deck of exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3
battlefields each with a unique name."* Going first you have seen 5 cards by T1, 6 by T2 and 7 by T3.
With the walk's six Energy-1 bodies, three Mutated Mouser and three Frisky Hunter, computed exactly over
ordered draws and every way to spend 2, 4 and 6 Energy on T1 to T3 (a body has to be on the board after
T1 for anything to reach the Plaza on T2), seven units at the Plaza by the end of T3 happen in
**0.56%** of games. With three more Energy-2 bodies in place of other cards (six in all) it is 1.09%, and
with nine it is 1.94%; with no Mousers it is 0.19%. Mulligan ignored. It is low because seven units from seven cards
seen needs the Hunters: a deck of bodies alone has to draw seven bodies in its first seven cards, and
the Hunter's two units per card is only one more than a body. The Up from the Deep line made four
units from one card and was castable in 13.97%.

**The Plaza has to be in play.** 485.5: *"Setup: Each player randomly selects one (1) of their three
(3) Battlefields. The other two are removed and will not be used for this game."* One in three. With
the 0.56% that is **0.19%** of games in which the line can be on the board by the end of T3, before the
opponent does anything.

**The Bird when the Hunter leaves first.** 359.3.f.2 checks "here" when the trigger resolves. If the
Hunter is returned or moved in response to its own play trigger, where the Bird is played is not walked
here: no paragraph found says whether "here" then falls back to the Hunter's last location.

Not walked: going second (three runes on T1, so the T3 seven has a spare Energy-1 body); the mulligan;
2v2 and Match (486.5 lets you choose the battlefield); their T2 Daring Poro attack (it holds the Plaza
to one on your T3 Hold [CORRECTED 2026-10-27 (#516): was "two"; see §4] and costs them the Poro and a point); and the turns after their T4.

## Leads

- **A Plaza line can state its kill price.** The predicate is "kill one of seven", and its price is the
  lethal damage of the unit an attacker must kill first: the cheapest unit, or the [Tank] if there is
  one. Up from the Deep's seven cost 1; this one's cost 3 with the Mouser and 1 without. The Plaza
  entries could each say what an attack has to bring.
- **Body/Calm's two Energy-1 bodies are both the reason its Hold baseline is T5 and the reason this line
  is fragile on T2.** A single 3-Might attacker kills three of the T2 four. The walk's opponent did not
  take that trade; an opponent who sees The Grand Plaza on your side may.
- **`SFD-031 Desert's Call` was not walked.** It is Calm, E2, *"[Repeat] :rb_energy_2: (You may pay the
  additional cost to repeat this spell's effect.) Play a 2 :rb_might: Sand Soldier unit token."*: two
  2-Might units for one card and E4, the Hunter's rate, as a spell. That puts it back under the Helm's
  tax and under a counterspell, and it rests on [Repeat]. desert-call-vi-sand-soldier-plaza already uses
  it, in Calm/Fury at T6.
- The flurry-of-feathers-grand-plaza-win entry is the stronger Calm Plaza line in cards: four for the
  seven, against five here, and its Birds land after the opponent's last window. What this line has that
  it does not is no Power and no spell.
