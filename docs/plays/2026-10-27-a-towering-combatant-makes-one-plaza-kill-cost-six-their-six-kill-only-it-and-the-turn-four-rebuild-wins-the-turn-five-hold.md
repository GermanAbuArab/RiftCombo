# Play — A Towering Combatant makes one Plaza kill cost six, their six kill only it, and the turn-four rebuild wins the turn-five Hold

Issue #512 (a slice of #200), 2026-10-27. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against,
[the coverage table](2026-10-27-identity-coverage-by-legend-pair.md) for why this pair, and the two
earlier Plaza plays of the identity-first pass,
[Up from the Deep](2026-10-27-up-from-the-deep-puts-seven-on-the-plaza-by-turn-three-and-the-two-bodies-they-already-had-kill-five-of-them.md)
and [the Frisky Hunters](2026-10-27-two-frisky-hunters-put-seven-on-the-plaza-by-turn-three-a-tank-raises-the-free-answer-to-three-might-and-their-six-still-kill-four.md),
which this one is compared with throughout.

**Subject: `towering-combatant-up-from-the-deep-grand-plaza`**, a new ALT_WIN synthesized for this
slice. Body/Chaos is the least-covered legend pair the identity-first pass has not worked yet: five
finishers in the catalogue and none clocked by T4. The line takes one card from each domain's best
Plaza piece. Body gives the Energy-1 bodies that take `OGN-293 The Grand Plaza` on T2 and
`UNL-099 Towering Combatant`, a [Tank] that is 5 Might as a defender, played onto the Plaza on T2.
Chaos gives `VEN-100 Up from the Deep`, two Tentacles for three Energy, on T3, with a third body and
`OGN-136 Pit Rookie`, whose buff makes the Combatant 6. **Seven units at the Plaza after twelve Energy
and no Power, and killing one of them costs 6 Might**, where it cost 1 on the slice-1 line and 3 on
the slice-2 line. The turn clock prices it at **T4 against the Body/Chaos Hold baseline of T5**.
Walked as a game, going first, against the same Calm/Order Radiant Dawn deck and the same draws as the
two earlier Plaza plays, **it does not win on T4**: their two T2 bodies attack with exactly 6, kill the
Combatant and nothing else, and six are left. But one unit is all they kill, and the T4 rebuild (the
[Flow] casting and a second Combatant) puts nine on the Plaza behind a new 6-Might Tank. Their 6 Might
can again kill only the Tank, and **the T5 Hold wins the game, 3 to 3 on points**. T5 is the
baseline's own turn. The cheapest spell is still one Energy: `OGN-133 Flurry of Blades` (Body) kills
five of the seven.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-201 Voidreaver` (Body/Chaos, tag Kha'Zix) |
| **Chosen Champion** | `UNL-119 Kha'Zix, Evolving Hunter` (Body, E5 + 1 Power, M5), never played |
| **Battlefield** | `OGN-293 The Grand Plaza` (colourless), and it has to be the one of your three that is in play |
| **The Tank** | `UNL-099 Towering Combatant` (Body unit, E4, M3) on T2, and a second one by T4 for the walk's T5 win |
| **The engine** | `VEN-100 Up from the Deep` (Chaos spell, E3, [Flow] E3) on T3 |
| **The bodies** | `UNL-111 Determined Sentry` (Body, E1, M1): two on T1, the third on T3; `OGN-136 Pit Rookie` (Body, E2, M2) on T3 |

Every card in the line costs Energy only, so the line runs on any rune split. From the opponent it
needs **5 Might or less ready in their base on their T3** (§4, §5), and no one-Energy removal spell.

Voidreaver is Body/Chaos and its tag is Kha'Zix, so Kha'Zix, Evolving Hunter can be the Chosen
Champion, 103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your Champion
Legend."* Every card in the line is mono-Body, mono-Chaos or colourless, so the deck admits it,
103.1.b.3: *"If a card has a single Domain, then that card is permitted in the Domain Identity that
corresponds to the same Domain."* Three copies is the cap, 103.2.b: *"Your Main Deck can include up to
3 copies of the same named card."* The walk's list runs three of each of the four cards above, twelve
of its 39. None of the cards on either side is a Signature card (`signature` in `data/cards.json`),
and none is in `data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

**Why these cards.** Determined Sentry is the one unit at Energy 1 or less in Body or in Chaos, so a
Body/Chaos deck has three Energy-1 bodies where Body/Calm had six. Towering Combatant is the cheapest
[Tank] in either domain: the others are `OGN-191 Maddened Marauder` (Chaos, E5), `OGN-137 Stormclaw
Ursine` (Body, E7) and `OGN-158 Volibear, Imposing` (Body, E12). Pit Rookie is an Energy-2 body that
also buffs, and the buff goes on the Combatant.

The card text the play turns on:

- The Grand Plaza: *"When you hold here, if you have 7+ units here, you win the game."*
- Towering Combatant: *"[Shield 2] (+2 :rb_might: while I'm a defender.) [Tank] (I must be assigned
  combat damage first.)"*
- Up from the Deep: *"Play two 1 :rb_might: Tentacle unit tokens from Bilgewater. [Flow] :rb_energy_3:
  (You may play this from your trash for its Flow cost. Then banish it.)"*
- Pit Rookie: *"When you play me, buff another friendly unit. (If it doesn't have a buff, it gets a +1
  :rb_might: buff.)"*
- Determined Sentry: *"I can't move to base."* It only ever moves from base to the Plaza.
- Voidreaver: *"When you win a combat, gain 1 XP. Spend 1 XP, :rb_exhaust:: [Buff] a unit. Spend 2 XP,
  :rb_exhaust:: Move an exhausted friendly unit from a battlefield to its base."* Its buff is used once,
  on T4.

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
controller’s Base or a Battlefield the controller controls."* Up from the Deep names no location, and a
token is played under the same steps, 185.2.a: *"Tokens can be played by their owner if their card type
is played, following all the applicable steps for playing a card plus any restrictions or modifications
from the effect that created the token."* An effect could narrow that, 184.2: *"The effect may restrict
the location to which the token may be played."*, and this one does not. The token is defined by rule,
187.10: *"A 1 [M] Tentacle token is a domainless unit token with 1 Might and the Bilgewater tag."*

**One copy of Up from the Deep is two castings.** Cast from hand it resolves and goes to the trash,
351.2: *"Spells create game effects that are executed, then the card is placed in the trash when
Played."* From there [Flow] lets it be cast again, 829.1.b: *"It is functionally short for “You may
play this from your trash for its flow cost. Then banish it.”"* The slice-1 line spent both castings on
T3. This line spends one on T3 and keeps the [Flow] for T4, where it is the rebuild.

**The buff.** 702.2.a: *"To Buff a Unit, a player chooses a Unit and then places a buff on it. That
Unit is Buffed for as long as the buff remains on it."* 703: *"Each Buff individually contributes +1
Might to a Unit."* Only one fits, 702.3: *"There can only be one Buff on a Unit at a time."*, so the
Rookie's buff and Voidreaver's never stack on one unit. A unit that leaves play loses it, 705: *"If a
Unit leaves play, remove all Buffs from it."*

**The win is counted at the Hold.** The Hold is the first thing in your Beginning Phase, 315.2.b.2:
*"The Turn Player Holds all Battlefields they Control."* and 469.2: *"Hold: A player maintains
Control of a Battlefield they did not yet Score this turn during their Beginning Phase."* The seven are
part of the trigger condition, 383.2.a.1: *"Any additional conditional statement immediately after the
Condition must be true in order for the Condition to be fulfilled. Such a conditional statement is part
of the Trigger Condition and not the Effect."* So they must be at the Plaza when the Hold happens.
Once the ability resolves the game is over, 195: *"A player also wins the game if an effect instructs
them to do so, or if they are the only player remaining in the game."*

**Combat, and what the Combatant changes.** 465.2.c: *"Starting with the Attacker, each player assigns
an amount of damage equal to their summed Might among the other's Units."* 465.2.c.3: *"Units must have
lethal damage assigned to them in full before damage is assigned to a different Unit."* 142.4.b:
*"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s Might."* [Tank]
puts an order on that, 815.1.b: *"It is functionally short for "I must be assigned lethal damage before
any other unit with the same controller as me that does not have [Tank] during the Combat Damage
step."*, and 815.1.c.2 closes the gap: *"If more than one unit with Tank is present with the same
controller in Combat, damage may be assigned to any of them. Units without Tank are invalid assignments
until all units with Tank have lethal damage assigned to them."* [Shield] sets what lethal is for the
Combatant, 814.1.c: *"It is functionally short for "While I am a defender, I have +X [M].""*, so as a
defender it is 3 + 2 = 5, and 6 with the Rookie's buff. **An attack that kills one of the seven
therefore costs 6 Might.** An attack with 5 Might or less kills nothing: all of it has to go to the
Combatant, and it is not lethal. The Shield is combat-only, 814.1.d.1: *"Shield remains in effect as
long as the Unit maintains the Defender designation."*, so outside combat the buffed Combatant is a
4-Might unit. The combat result: 466.3.a: *"A Player has won a combat if they received either the
attacker or defender designation and are the only Player that has units remaining at this battlefield
during this step."*

Units move from base to a battlefield and back, never between battlefields, 144.4.b: *"Units may move
from a Battlefield to their Base."* So a unit of theirs at their own battlefield cannot reach the Plaza
on the same turn.

## 3. Their deck: Calm/Order Radiant Dawn

The same deck, in the same seat, with the same draws as in the two earlier Plaza plays, so the three
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
- `OGN-216 Soaring Scout` (Order, E2, M1) and `OGN-218 Vanguard Captain` (Order, E3 + 1 Order Power,
  M3): *"[Legion] — When you play me, play two 1 :rb_might: Recruit unit tokens here. (Get the effect
  if you've played another card this turn.)"*

`VEN-045 Helm of Suppression` stays in their hand; §5 walks it. Going second, they channel an extra
rune on T1, 485.7: *"First Turn Process: The player going second channels an extra Rune from their Rune
Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Body/Chaos against Calm/Order. Your battlefield is A, The Grand Plaza; theirs is B, `OGN-282 Monastery
of Hirana` (*"When you conquer here, you may spend a buff to draw 1."*, and nobody spends one). Your
opening four are Determined Sentry, Determined Sentry, Towering Combatant and Up from the Deep. Your
draws are Pit Rookie (T1), Determined Sentry (T2), Up from the Deep (T3) and Towering Combatant (T4).
Their opening four are Daring Poro, Trusty Ramhound, Soaring Scout and Helm of Suppression. Their draws
are Sunlit Guardian (T1), Stalwart Poro (T2), Royal Guard (T3) and Vanguard Captain (T4).

```
turn      runes   play                                                      points
T1        2       Determined Sentry (E1) twice, to base. None left.         0
their T1  3       Daring Poro (E2) to base. One left.                       0
T2        4       The two Sentries walk to A, empty, Conquer: +1.           1
                  Towering Combatant (E4) to A. Three at A; one kill
                  costs 5 Might. None left.
their T2  5       Daring Poro walks to B, empty, Conquer. Trusty            1
                  Ramhound (E2) and Sunlit Guardian (E3) to base. None
                  left.
T3        6       Hold A: +1, three at A. Up from the Deep (E3), two        2
                  Tentacles to A. Determined Sentry (E1) to A. Pit
                  Rookie (E2) to A, its buff on the Combatant. Seven at
                  A, 13 Might as defenders; one kill costs 6. None left.
their T3  7       Hold B. Royal Guard (E4, Sand Soldier to base) and        2
                  Stalwart Poro (E2) to base. One left. The Ramhound
                  and the Guardian (3 + 3 = 6) attack A. The Combatant
                  dies, nothing else; both of theirs die. You win the
                  combat: Voidreaver, 1 XP. Six at A.
T4        8       Hold A: +1, six at A, no win. Up from the Deep's          3
                  [Flow] (E3) from the trash, two Tentacles to A.
                  Towering Combatant (E4) to A. Voidreaver (1 XP,
                  exhaust) buffs it. Nine at A, 15 Might as defenders;
                  one kill costs 6. One left.
their T4  9       Hold B. Soaring Scout (E2), then Vanguard Captain (E3     3
                  + 1 Order Power), [Legion] on, two Recruits to base.
                  Royal Guard, the Sand Soldier and Stalwart Poro
                  (2 + 2 + 2 = 6) are ready in base and stay there: an
                  attack kills only the Combatant.
T5        —       Hold A: nine at A. The Plaza wins the game (195).         —
```

After your T2 it is **1 to 0**; after their T2, **1 to 1**; after your T3, **2 to 1**; after their T3,
**2 to 2**; after your T4, **3 to 2**; after their T4, **3 to 3**. Your T5 Hold ends the game.

Runes at the end of each turn: yours 2, 4, 6, 8, exhausted every turn except one on T4, none recycled.
Theirs 3, 5, 7, and 8 after their T4: the Captain's Order Power recycles one of the nine.

Your hand, card by card: 5 after the T1 draw, 3 after the two Sentries (Towering Combatant, Up from the
Deep, Pit Rookie); 4 after the T2 draw, 3 after the Combatant (Up from the Deep, Pit Rookie, Determined
Sentry); 4 after the T3 draw, 1 after Up from the Deep, the Sentry and the Rookie (Up from the Deep); 2
after the T4 draw, 1 after the Combatant (Up from the Deep). The [Flow] casting comes from the trash, not
the hand. Theirs: 5 after the T1 draw, 4 after Daring Poro; 5 after the T2 draw, 3 after the Ramhound
and the Guardian (Scout, Helm, Stalwart Poro); 4 after the T3 draw, 2 after Royal Guard and Stalwart
Poro (Scout, Helm); 3 after the T4 draw, 1 after the Scout and the Captain (Helm).

**Your T2: three on the Plaza, and the Tank is one of them.** A defends at Sentry 1, Sentry 1,
Combatant 5. Their only ready body on their T2 is Daring Poro, 3 as an attacker. On the slice-2 board
the same attack killed three of four. Here 815.1.c.2 sends all 3 to the Combatant, 3 is not lethal for
a 5-Might defender, and nothing dies; the 7 that comes back kills the Poro. They take B instead.

**Their T2: the bodies stay home.** The Ramhound and the Guardian go to base, not to B. Played to B they
could not reach A on their T3 (144.4.a, 144.4.b). In base, they are ready on their T3 and A is one move
away. This is the same choice as in the two earlier walks.

**Your T3: seven, behind a 6-Might Tank.** Up from the Deep, E3, two Tentacles at A; it goes to the
trash (351.2). The third Sentry, E1, and Pit Rookie, E2, onto A; the Rookie's play trigger buffs the
Combatant, 4 Might, 6 as a defender. The [Flow] casting instead of the Sentry and the Rookie also makes
seven, two Tentacles for two bodies, but leaves the Combatant at 5 and spends the rebuild. A defends at
1 + 1 + 6 + 1 + 1 + 1 + 2 = 13.

**Their T3: exactly 6.** Royal Guard and Stalwart Poro go to base first, for six of their seven runes.
Then the Ramhound and the Guardian attack A. The Ramhound has another unit of theirs at A, so it is 3;
the Guardian's [Shield] works only on defence, so it is 3. They assign 6 (465.2.c), and all 6 must go to
the Combatant until it has lethal damage (815.1.c.2): 6, its whole lethal amount. Nothing is left for a
second unit. Your 13 must go to the Guardian first (815.1.b), 3, then 3 to the Ramhound, and both die.
Only your units remain at A, so you win the combat (466.3.a), Voidreaver gives 1 XP, and A stays yours
with **six** units on it. On the slice-1 board the same 6 Might killed five; on the slice-2 board, four.

**Your T4: the Hold does not win, and the rebuild does not need a seventh body, it needs a Tank.**
383.2.a.1 counts at the Hold: six units, so the Plaza does nothing, and the Hold scores 1. Up from the
Deep's [Flow], E3, from the trash: two Tentacles, eight. The second Combatant, E4: nine. Voidreaver
spends the XP and exhausts to buff it: 6 as a defender. A defends at 1 + 1 + 1 + 1 + 1 + 1 + 1 + 2 + 6
= 15. To bring nine under seven an attack has to kill three, and the first has to be the Combatant:
6 + 1 + 1 = **8 Might**.

**Their T4: 6 is less than 8.** Royal Guard, its Sand Soldier and Stalwart Poro were played on their
T3, so they are ready now: 2 + 2 + 2 = 6. An attack assigns all 6 to the Combatant (815.1.c.2), kills
it and nothing else, and leaves eight; your 15 kills all three of theirs. Attacking or not, A has eight
or nine units when your T5 begins. Before that they play the Scout and then the Captain with [Legion]
on, two Recruits to base. **3 to 3.**

**Your T5: the Hold wins.** Eight or more at A when the Hold happens (315.2.b.2, 383.2.a.1), and the
Plaza ends the game (195) before any card of theirs played on their T4 can move.

**Without the second Combatant on T4,** the rebuild is the [Flow] and the second Up from the Deep from
hand, E3 + E3: ten units, every one 1 or 2 Might. 6 Might then kills six 1-Might units and leaves
four, and the T5 Hold does not win. The T5 win rests on drawing a second Tank by T4.

**The game it wins on T4.** If what they have ready in base on their T3 is 5 Might or less, the Combatant
takes all of it and nothing dies: for example one or two Energy-2 bodies without an attack bonus. This
walk's Ramhound and Guardian are two bodies that are 3 each when they attack together.
The slice-1 line had no such board above 0 Might, the slice-2 line none above 2.

## 5. Breaks to

**The predicate:** on their turn before your Hold, does it leave you with six or fewer units at the
Plaza? The answer has to land before the Hold: 383.2.a.1 fixes the count when the Hold happens.

**The free answer: attack with 6 Might or more from base,** the kill price of the seven at the end of
your T3. At the end of your T2 it is 5, from three units, so no attack on their T2 can stop the T3 seven
from being built; the most it can do is kill the Combatant with 5, which leaves two Sentries, and your
T3 then makes six at most (Up from the Deep and its [Flow], E6). The walked opponent had 6 ready on
their T3 and killed one unit with it. On their T4 the kill price of three units was 8 and they had 6.

**The cheapest spells,** pool-wide, constructed-legal, priced against the target. None of the seven
has [Deflect], so a spell aimed at one of them pays its printed cost.

| card | cost | against the seven |
|---|---|---|
| `OGN-133 Flurry of Blades` (Body spell) | E1 | *"[Reaction] (Play any time, even before spells and abilities resolve.) Deal 1 to all units at battlefields."* It targets nothing. The three Sentries and the two Tentacles die; the Combatant (4 outside combat, 814.1.d.1) and the Rookie (2) live. Two left. |
| `OGN-169 Gust` (Chaos spell) | E1 | *"[Reaction] (Play any time, even before spells and abilities resolve.) Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."* A Sentry, a Tentacle or the Rookie; a returned Tentacle ceases to exist (186.1). Six left. The buffed Combatant, 4 Might, is not a legal choice. |
| `OGN-043 Charm` (Calm spell) | E1 + 1 Calm | *"Move an enemy unit."* Any of the seven moved to your base is not at the Plaza: six left. The cheapest in the walked opponent's identity. |
| `SFD-162 Blood Money` (Order spell) | E2 | *"[Action] (Play on your turn or in showdowns.) Kill a unit at a battlefield with 2 :rb_might: or less. If it was an enemy unit, play a Gold gear token exhausted. If it was a friendly unit, play two Gold gear tokens exhausted."* A Sentry, a Tentacle or the Rookie. Six left. |

The walked opponent ran none of these and did not need one on T3.

**The pre-emptive answer: Helm of Suppression on their T2.** *"[Empower] :rb_energy_4::rb_rune_calm:
(:rb_energy_4::rb_rune_calm:: Empower this. Use only if not Empowered.) Opponents' spells cost
:rb_energy_1: more. If this is [Empowered], they cost :rb_energy_1::rb_rune_rainbow: more instead."*
A cost increase applies, 356.3: *"Apply cost increases."*, so Up from the Deep is E4 on your T3, and
the [Flow] casting too, 829.1.c.1: *"The cost is an alternate cost that replaces the base cost of the
spell to be paid during finalization."* Six runes then buy Up from the Deep and the Rookie, or it and
the Sentry: six units, and the T4 Hold does not win on the clock's terms either. The line moves to the
T5 Hold, the baseline's own turn. The Helm is their whole T2 going second, so nothing of theirs is ready
in base on their T3; that is the same trade the slice-1 walk found.

**The battlefield cannot be answered.** 170.3: *"Battlefields cannot be Killed during the course of
regular play."* What can be answered is the count.

## 6. Against the free Hold curve

| | pays |
|---|---|
| This line, `npm run adversarial -- --turns` | **T4** |
| Body/Chaos Hold baseline, same command | **T5** |
| This line in the walk above | not by T4; **wins at the T5 Hold**, 3 to 3 |

The clock prices the line at T4: the Combatant (E4), Up from the Deep (E3), the Rookie (E2) and three
bodies at E1 each (Determined Sentry, the cheapest Body body), twelve Energy, which T1 and T2 (six runes)
cannot pay and T3 can, so the set completes on T3 and the Hold waits for T4. The hand count agrees: two
Sentries on T1 (2 runes), the Combatant on T2 (4), Up from the Deep, a Sentry and the Rookie on T3 (6).
By the end of T2 the most at the Plaza is three, so T4 is the lower bound. The line uses no readying
effect, no readying rune and no [Accelerate], so neither of the clock's open gaps (#513, #517) moves it.

On the clock's board the line is one turn faster than the Hold curve. By the issue's rule it beats the
baseline, and it enters `data/combos.json` as `status: candidate`.

The walk is the other half. It did not win on T4, as the two earlier Plaza lines did not. It is the
first of the three to win at all: the Tank turns the opponent's free answer from "kill four or five" into
"kill one", so their attack takes the line from seven to six, and the turn-four rebuild gets it back
above what 6 Might can reach. It wins on T5, the turn the Body/Chaos Hold curve would reach 8.

## 7. Verdict

**One turn faster than the Hold curve on the clock, and in the walk the first identity-first Plaza
line that wins the game, on the baseline's own turn.** Twelve Energy and six cards (three Sentries, a
Combatant, an Up from the Deep and a Rookie) put seven units at the Plaza by the end of T3, behind a
6-Might [Tank]. Body adds the Tank and Chaos the two-for-one, and neither domain alone has both. A deck
that answers with bodies needs 6 Might ready on its T3 to stop the T4 Hold, and on its T4 it needs 8
against the rebuild. It is a rare line: seven with the Tank among them by T3 in about one game in 280
(§8), and the T5 win needs the second Combatant.

## 8. Not verified

**Runes.** The line costs no Power on your side, so every rune pays it: no rune split fails, **0 of
any** deal. Their side needs one Order rune among their first nine for the Captain's Power. The walk
assumes six Calm and six Order in the twelve of Tournament Rules 402.1, so all nine Calm is impossible:
**0 of 220**.

**How often the seven are castable by T3.** The draw pile is **39** cards, the 40 of Tournament Rules
402.1 less the Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register
a Main Deck of exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3
battlefields each with a unique name."* Going first you have seen 5 cards by T1, 6 by T2 and 7 by T3.
With the walk's three Determined Sentry, three Towering Combatant, three Up from the Deep and three Pit
Rookie, computed exactly over ordered draws and every way to spend 2, 4 and 6 Energy on T1 to T3 (a
[Flow] casting may follow its own Up from the Deep on the same turn; a unit played before the Plaza is
yours goes to base and walks on a later turn), seven units at the Plaza with a Combatant among them by
the end of T3 happen in **0.36%** of games, and seven in any form in **5.90%**. With six more Energy-2
bodies in place of other cards the Tank case is 0.37% and the any case 16.30%. Mulligan ignored. The
Tank case is low because the walked order needs both Sentries in the first five, the Combatant in the
first six, and an Up from the Deep in the first seven.

**The Plaza has to be in play.** 485.5: *"Setup: Each player randomly selects one (1) of their three
(3) Battlefields. The other two are removed and will not be used for this game."* One in three. With
the 0.36% that is **0.12%** of games in which the line can be on the board with its Tank by the end of
T3, before the opponent does anything.

**XP.** Voidreaver's buff on T4 is the walk's only use of XP, and it only raises the T4 kill price
from 7 to 8. Without it their 6 Might still kills the Combatant (5) and one 1-Might unit, seven are left,
and the T5 Hold still wins.

Not walked: going second (three runes on T1); the mulligan; 2v2 and Match (486.5 lets you choose the
battlefield); and an opponent that runs any of the §5 spells.

## Leads

- **The kill price of a Plaza board is a sum, and a Tank is the only card that raises its first term.**
  The predicate is "kill N of the units", N being the count above six, and its price is the lethal
  damage of the units an attacker must kill first: the [Tank] if there is one, then the cheapest. Up from
  the Deep's seven cost 1, the Frisky Hunters' 3 and this line's 6. Nine units with a 6-Might Tank cost
  8, which is what won the walk; the same nine without the Tank cost 3.
- **Body/Chaos's two Plaza lines differ in what they do with the [Flow].** The catalogued slice-1 line
  spends both Up from the Deep castings on T3. This one spends one, and the [Flow] in the trash is a
  two-unit rebuild on T4 that the opponent cannot see in hand.
- **Towering Combatant has no Body/Chaos twin at E4 or below.** The next Tanks cost E5 (Maddened
  Marauder, which also moves a unit from a battlefield to its base when played) and E7; a line built on
  the Marauder would be a turn slower.
