# Play — A hidden Marai is the seventh unit for no Energy, so a Tank fits by turn three, and their six still take it to six

Issue #524 (a slice of #200), 2026-10-27. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against,
[the coverage table](2026-10-27-identity-coverage-by-legend-pair.md) for why this pair, and the three
earlier Plaza plays of the identity-first pass,
[Up from the Deep](2026-10-27-up-from-the-deep-puts-seven-on-the-plaza-by-turn-three-and-the-two-bodies-they-already-had-kill-five-of-them.md),
[the Frisky Hunters](2026-10-27-two-frisky-hunters-put-seven-on-the-plaza-by-turn-three-a-tank-raises-the-free-answer-to-three-might-and-their-six-still-kill-four.md)
and [the Towering Combatant](2026-10-27-a-towering-combatant-makes-one-plaza-kill-cost-six-their-six-kill-only-it-and-the-turn-four-rebuild-wins-the-turn-five-hold.md),
which this one is compared with throughout.

**Subject: `towering-combatant-hidden-marai-grand-plaza`**, a new ALT_WIN synthesized for this
slice. Body/Fury is the least-covered legend pair the identity-first pass has not worked yet: seven
finishers in the catalogue and none clocked by T4. The slice-3 line put a [Tank] among seven units by
T3 because Up from the Deep makes two units from one card. Body/Fury has no card like that at Energy 4
or less, and going first you have seen seven cards by T3, so **all seven have to be units, and seven
units with the Tank cost 13 Energy against the 12 runes of T1 to T3.** Fury's answer is
`UNL-003 Mischievous Marai`: hidden at `OGN-293 The Grand Plaza` for one Power, which a rune that has
already paid its Energy can still give by being recycled, it is played from there later for no Energy.
**Seven units at the Plaza for 11 Energy and 1 Power, and killing one of them costs 6 Might.** The turn
clock prices it at **T4 against the Body/Fury Hold baseline of T5**. Walked as a game, going first,
against the same Calm/Order Radiant Dawn deck and the same draws as the three earlier Plaza plays, **it
does not win on T4**: their two T2 bodies attack with exactly 6, Marai's 2 damage kills neither of them,
the Combatant dies and nothing else does, and six are left. Unlike slice 3 there is nothing left in hand
to rebuild with, and **it does not win by T5 either**. The cheapest spell is one Energy:
`OGN-133 Flurry of Blades` (Body) kills the three Sentries.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-249 Relentless Storm` (Fury/Body, tag Volibear) |
| **Chosen Champion** | `OGN-041 Volibear, Furious` (Fury, E10 + 2 Power, M10), never played |
| **Battlefield** | `OGN-293 The Grand Plaza` (colourless), and it has to be the one of your three that is in play |
| **The Tank** | `UNL-099 Towering Combatant` (Body unit, E4, M3) on T2 |
| **The free unit** | `UNL-003 Mischievous Marai` (Fury unit, E2, M2), hidden at the Plaza on T2 for one Power |
| **The bodies** | `UNL-111 Determined Sentry` (Body, E1, M1): two on T1, the third on T3; `OGN-136 Pit Rookie` (Body, E2, M2) and `OGN-013 Pouty Poro` (Fury, E2, M2) on T3 |

Every card in the line costs Energy only, except the hide, which costs one Power of any domain, so the
line runs on any rune split. From the opponent it needs **5 Might or less ready in their base on their
T3**, or 6 or 7 with one attacker of 2 Might or less (§5), and no one-Energy removal spell.

Relentless Storm is Fury/Body and its tag is Volibear, so Volibear, Furious can be the Chosen Champion,
103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your Champion
Legend."* Every card in the line is mono-Body, mono-Fury or colourless, so the deck admits it,
103.1.b.3: *"If a card has a single Domain, then that card is permitted in the Domain Identity that
corresponds to the same Domain."* Three copies is the cap, 103.2.b: *"Your Main Deck can include up to
3 copies of the same named card."* The walk's list runs three of each of the five cards above, fifteen
of its 39. None of the cards on either side is a Signature card (`signature` in `data/cards.json`),
and none is in `data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

**Why these cards.** Determined Sentry is the one unit at Energy 1 or less in Body or in Fury. Towering
Combatant is the cheapest [Tank] in either domain: the others are `SFD-024 Rell, Magnetic` (Fury, E4,
4 Might as a defender, no [Shield]), `OGN-137 Stormclaw Ursine` (Body, E7) and `OGN-158 Volibear,
Imposing` (Body, E12). Pit Rookie is an Energy-2 body that also buffs, and the buff goes on the
Combatant. Mischievous Marai is the one card in either domain at Energy 2 or less with [Hidden] that is
a unit. Pouty Poro is any Energy-2 body; its [Deflect] makes it one Power dearer to bounce.

The card text the play turns on:

- The Grand Plaza: *"When you hold here, if you have 7+ units here, you win the game."*
- Towering Combatant: *"[Shield 2] (+2 :rb_might: while I'm a defender.) [Tank] (I must be assigned
  combat damage first.)"*
- Mischievous Marai: *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for
  :rb_energy_0:.) When you play me to a battlefield, deal 2 to an enemy unit here."*
- Pit Rookie: *"When you play me, buff another friendly unit. (If it doesn't have a buff, it gets a +1
  :rb_might: buff.)"*
- Pouty Poro: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or
  ability.)"*
- Determined Sentry: *"I can't move to base."* It only ever moves from base to the Plaza.
- Relentless Storm: *"When you play a [Mighty] unit, you may exhaust me to channel 1 rune exhausted. (A
  unit is Mighty while it has 5+ :rb_might:.)"* Nothing in the line is Mighty when played, so it never
  fires.

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
controller’s Base or a Battlefield the controller controls."*

**Seven cards, seven units, no slack.** Going first you have seen five cards by T1, six by T2 and seven
by T3. No Body or Fury card at Energy 4 or less puts two units on the board: the multi-unit cards of the
pair are `VEN-023 Zed, From the Shadows` (E4 + 1 Fury Power, and its Shadow Clone costs a discarded
card, so it is two units for two cards), `SFD-021 Ferrous Forerunner` (E6, and its Mechs come when it
dies), and `SFD-019 Assembly Rig` and `VEN-087 Hextech Disc` (E4 gear whose Mechs go to base). So all
seven cards have to be units on the Plaza, and seven units with the Combatant among them cost at least
4 + 1 + 1 + 1 + 2 + 2 + 2 = **13 Energy**. T1 to T3 give 2 + 4 + 6 = 12.

**The hide turns the thirteenth Energy into one Power.** [Hidden] is a cost in Power, 811.1.b: *"It is
functionally short for "While this card is in your hand or in your Champion Zone on your turn during an
Open State, you may pay [A] to hide this facedown at a battlefield you control that doesn't already
have a facedown card hidden there for as long as you control that battlefield. Beginning on the next
turn, this gains [Reaction] and you may play this, ignoring its base cost.""* [A] is Power of any
domain, 135.2.e.5.a: *"When required as a cost, [A] can be paid by Power of any Domain."* A rune makes
Energy by exhausting and Power by being recycled, and the two are separate abilities, 164.2.a:
*"[E]: [Reaction] — Add [1]."* and 164.2.b: *"Recycle this: [Reaction] — Add [C]."* The recycle has no
exhaust in its cost, so **a rune already exhausted for Energy can still be recycled for Power**. The
price is the rune itself, 161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck, not the
Main Deck."*, so you have one rune fewer from then on. Marai must later be played where it was hidden,
811.1.d.1: *"A hidden permanent must be played to that battlefield."*, which is the Plaza.

**When Marai can be played.** From the turn after the hide it has [Reaction] (811.1.b). On your own
turn that is any time you could play a card. On their turn a [Reaction] needs a chain or a showdown,
because in a Neutral Open State only they act, 316.5.b: *"This is denoted as a Neutral Open State, and
only the Turn Player has the ability to play spells or activate abilities."* and 309.1.a: *"Only cards
and abilities with the Reaction keyword can be played or activated in a Closed State."* Their attack on
the Plaza opens a showdown there, and Focus comes to you, 345: *"As a Showdown begins, the player who
applied Contested status to the Battlefield gains Focus."* and 347.2.b: *"Otherwise, Focus passes to
the next Player in Turn Order."* With Focus, 347.1: *"Play a Card or Activated Ability that is legally
timed."* A unit that arrives then joins the defence, 464.2.c.3.a: *"If a Unit controlled by the Attacker
or Defender becomes present at this Battlefield after this moment, it will gain the Attacker or Defender
designation during the Cleanup phase following the action that caused it to become present, as
appropriate for its controller."* Marai's damage is pinned to the Plaza, 811.1.d.2: *"If a hidden spell
or a play effect of a hidden permanent chooses any targets, those targets must be chosen from among
options at that battlefield, unless the ability explicitly restricts targeting in a way that makes this
impossible."*

**The facedown card goes if the Plaza does.** 811.1.b hides it *"for as long as you control that
battlefield"*, and a lost combat takes it, 466.5.c: *"Remove all Hidden cards from this Battlefield that
do not share a controller with the Battlefield."*

**The buff.** 702.2.a: *"To Buff a Unit, a player chooses a Unit and then places a buff on it. That
Unit is Buffed for as long as the buff remains on it."* 703: *"Each Buff individually contributes +1
Might to a Unit."* Only one fits, 702.3: *"There can only be one Buff on a Unit at a time."*

**The win is counted at the Hold.** The Hold is the first thing in your Beginning Phase, 315.2.b.2:
*"The Turn Player Holds all Battlefields they Control."* and 469.2: *"Hold: A player maintains
Control of a Battlefield they did not yet Score this turn during their Beginning Phase."* The seven are
part of the trigger condition, 383.2.a.1: *"Any additional conditional statement immediately after the
Condition must be true in order for the Condition to be fulfilled. Such a conditional statement is part
of the Trigger Condition and not the Effect."* So they must be at the Plaza when the Hold happens, and a
card still facedown then is not a unit there. Once the ability resolves the game is over, 195: *"A
player also wins the game if an effect instructs them to do so, or if they are the only player
remaining in the game."*

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
therefore costs 6 Might.** The Shield is combat-only, 814.1.d.1: *"Shield remains in effect as long as
the Unit maintains the Defender designation."*, so outside combat the buffed Combatant is a 4-Might
unit. The combat result: 466.3.a: *"A Player has won a combat if they received either the attacker or
defender designation and are the only Player that has units remaining at this battlefield during this
step."*

Units move from base to a battlefield and back, never between battlefields, 144.4.b: *"Units may move
from a Battlefield to their Base."* So a unit of theirs at their own battlefield cannot reach the Plaza
on the same turn.

## 3. Their deck: Calm/Order Radiant Dawn

The same deck, in the same seat, with the same draws as in the three earlier Plaza plays, so the four
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

`VEN-045 Helm of Suppression` stays in their hand; §5 says why it does nothing here. Going second, they
channel an extra rune on T1, 485.7: *"First Turn Process: The player going second channels an extra
Rune from their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Body/Fury against Calm/Order. Your battlefield is A, The Grand Plaza; theirs is B, `OGN-282 Monastery
of Hirana` (*"When you conquer here, you may spend a buff to draw 1."*, and nobody spends one). Your
opening four are Determined Sentry, Determined Sentry, Towering Combatant and Mischievous Marai. Your
draws are Pit Rookie (T1), Determined Sentry (T2), Pouty Poro (T3) and Towering Combatant (T4).
Their opening four are Daring Poro, Trusty Ramhound, Soaring Scout and Helm of Suppression. Their draws
are Sunlit Guardian (T1), Stalwart Poro (T2), Royal Guard (T3) and Vanguard Captain (T4).

```
turn      runes   play                                                      points
T1        2       Determined Sentry (E1) twice, to base. None left.         0
their T1  3       Daring Poro (E2) to base. One left.                       0
T2        4       The two Sentries walk to A, empty, Conquer: +1.           1
                  Towering Combatant (E4) to A. One exhausted rune
                  recycled for 1 Power: Mischievous Marai hidden at A.
                  Three at A and a facedown card; one kill costs 5
                  Might. Three runes stay.
their T2  5       Daring Poro walks to B, empty, Conquer. Trusty            1
                  Ramhound (E2) and Sunlit Guardian (E3) to base. None
                  left.
T3        5       Hold A: +1, three at A. Determined Sentry (E1), Pit       2
                  Rookie (E2, its buff on the Combatant) and Pouty Poro
                  (E2) to A. Six at A and Marai facedown, 13 Might as
                  defenders; one kill costs 6. None left.
their T3  7       Hold B. Royal Guard (E4, Sand Soldier to base) and        2
                  Stalwart Poro (E2) to base. One left. The Ramhound
                  and the Guardian (3 + 3 = 6) attack A. In the
                  showdown Marai is played from Hidden (E0) and deals
                  2 to the Guardian. The Combatant dies, nothing else;
                  both of theirs die. Six at A.
T4        7       Hold A: +1, six at A, no win. Towering Combatant (E4)     3
                  to A, unbuffed: seven, one kill costs 5. Three left,
                  and the hand is empty.
their T4  9       Hold B. Soaring Scout (E2), then Vanguard Captain (E3     3
                  + 1 Order Power), [Legion] on, two Recruits to base.
                  Royal Guard, the Sand Soldier and Stalwart Poro
                  (2 + 2 + 2 = 6) attack A: the Combatant (5) and a
                  Sentry (1) die, and all three of theirs. Five at A.
T5        9       Hold A: +1, five at A, no win.                            4
```

After your T2 it is **1 to 0**; after their T2, **1 to 1**; after your T3, **2 to 1**; after their T3,
**2 to 2**; after your T4, **3 to 2**; after their T4, **3 to 3**; after your T5 Hold, **4 to 3**.

Runes at the end of each turn: yours 2, 3, 5, 7, the one recycled on T2 never coming back. Theirs 3,
5, 7, and 8 after their T4: the Captain's Order Power recycles one of the nine.

Your hand, card by card: 5 after the T1 draw, 3 after the two Sentries (Towering Combatant, Mischievous
Marai, Pit Rookie); 4 after the T2 draw, 2 after the Combatant and the hide (Pit Rookie, Determined
Sentry); 3 after the T3 draw, 0 after the Sentry, the Rookie and the Poro; 1 after the T4 draw, 0 after
the Combatant. Every card you saw by T3 is on the Plaza or facedown on it. Theirs: 5 after the T1 draw,
4 after Daring Poro; 5 after the T2 draw, 3 after the Ramhound and the Guardian (Scout, Helm, Stalwart
Poro); 4 after the T3 draw, 2 after Royal Guard and Stalwart Poro (Scout, Helm); 3 after the T4 draw, 1
after the Scout and the Captain (Helm).

**Your T2: the hide is a rune, not Energy.** The four runes are exhausted for the Combatant's four
Energy (164.2.a). One of them is then recycled for one Power (164.2.b), which pays Marai's [A] (811.1.b,
135.2.e.5.a): no Energy is spent on it. A defends at Sentry 1, Sentry 1, Combatant 5. Their only ready
body on their T2 is Daring Poro, 3 as an attacker; all 3 would go to the Combatant (815.1.c.2) and kill
nothing. They take B instead.

**Your T3: five runes, three units, and Marai is the seventh.** Three runes stayed and two are
channelled: five Energy for the Sentry (E1), the Rookie (E2, buffing the Combatant to 4, 6 as a
defender) and the Poro (E2). Six units at A. Marai could be played now, for no Energy, since this is the
turn after the hide (811.1.b), and the board would be seven before their turn. Kept facedown, it is the
same seventh unit, played inside their attack instead. The walk keeps it.

**Their T3: exactly 6, and Marai's 2 kills neither attacker.** Royal Guard and Stalwart Poro go to base
first, for six of their seven runes. Then the Ramhound and the Guardian attack A. The Ramhound has
another unit of theirs at A, so it is 3; the Guardian's [Shield] works only on defence, so it is 3. In
the showdown Focus comes to you (345, 347.2.b), and you play Marai from Hidden for no Energy (811.1.b,
347.1). It goes to A (811.1.d.1), it is a defender from the next Cleanup (464.2.c.3.a), and its trigger
deals 2 to an enemy unit at A (811.1.d.2). Both attackers are 3 Might, so 2 is not lethal for either
(142.4.b). It goes to the Guardian. They assign 6 (465.2.c), and all 6 must go to the Combatant until
it has lethal damage (815.1.c.2): 6, its whole lethal amount. Your 1 + 1 + 1 + 2 + 2 + 2 = 9 must go
to the Guardian first (815.1.b), 3, then 3 to the Ramhound, and both die. Only your units remain at A, so you win the combat (466.3.a), and A stays yours
with **six** units on it: three Sentries, the Rookie, the Poro and Marai. That is the slice-3 result,
six, with Marai standing in for one of the two Tentacles Up from the Deep put there.

**Your T4: the Hold does not win, and there is nothing to rebuild with.** 383.2.a.1 counts at the Hold:
six units, so the Plaza does nothing, and the Hold scores 1. The T4 draw is the second Combatant, E4:
seven units, but unbuffed it is 5 as a defender, so one kill costs 5. The other three runes have nothing
to buy, because every card you had is on the board. The slice-3 line had Up from the Deep's [Flow] in
the trash and Voidreaver's buff for this turn; Relentless Storm has no buff.

**Their T4: 6 kills two.** Royal Guard, its Sand Soldier and Stalwart Poro were played on their T3, so
they are ready now: 2 + 2 + 2 = 6. 5 goes to the Combatant (815.1.c.2) and 1 to a Sentry, which leaves
five. Your 1 + 1 + 2 + 2 + 2 = 8 kills all three of theirs (none has [Tank]; Stalwart Poro's [Shield]
works on defence), so you keep A. **3 to 3.**

**Your T5: five at the Hold.** The Plaza does nothing. The line has not won by the baseline's turn.

**The game it wins on T4.** If what they have ready in base on their T3 is 5 Might or less, the Combatant
takes all of it and nothing dies, and Marai makes seven. If it is 6 or 7 in two or more attackers and one
of them is 2 Might or less, Marai's 2 damage kills that one before damage is assigned, and what is left
is under the Combatant's 6: three Energy-2 bodies without an attack bonus are exactly that case. This
walk's Ramhound and Guardian are two bodies that are 3 each when they attack together, and Marai's 2
reaches neither.

## 5. Breaks to

**The predicate:** on their turn before your Hold, does it leave you with six or fewer units at the
Plaza? The answer has to land before the Hold: 383.2.a.1 fixes the count when the Hold happens.

**The free answer: attack with 6 Might or more from base,** the kill price of the six at the end of your
T3, counted after Marai's 2 damage has taken out their largest attacker of 2 Might or less. With every
attacker at 3 Might or more, that is 6. At the end of your T2 the price is 5, from three units; an attack
on their T2 that kills the Combatant leaves two Sentries and the facedown Marai, and your T3 then makes
six at most (the third Sentry, the Rookie and the Poro, with Marai). The walked opponent had 6 ready on
their T3, both attackers at 3, and killed one unit with it.

**The cheapest spells,** pool-wide, constructed-legal, priced against the target. The Poro has
[Deflect], so a spell that chooses it costs one Power more, 809.1.c: *"It is functionally short for
"Spells and abilities an opponent controls that target [me/this] cost an amount of Power equal to
[Deflect Value] more to play as an additional cost for each time they choose [me/this].""* and
809.1.c.1: *"The Power used to pay this cost may always be of any Domain."* No other unit of the seven
has it.

| card | cost | against the seven |
|---|---|---|
| `OGN-133 Flurry of Blades` (Body spell) | E1 | *"[Reaction] (Play any time, even before spells and abilities resolve.) Deal 1 to all units at battlefields."* It targets nothing. The three Sentries die; the Combatant (4 outside combat, 814.1.d.1), the Rookie, the Poro and Marai (2 each) live. Four left. |
| `OGN-169 Gust` (Chaos spell) | E1 | *"[Reaction] (Play any time, even before spells and abilities resolve.) Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."* A Sentry, the Rookie or Marai; the Poro for E1 + 1 Power. Six left. The buffed Combatant, 4 Might, is not a legal choice. |
| `OGN-043 Charm` (Calm spell) | E1 + 1 Calm | *"Move an enemy unit."* Any of the seven but the Poro moved to your base is not at the Plaza: six left. The cheapest in the walked opponent's identity. |
| `SFD-162 Blood Money` (Order spell) | E2 | *"[Action] (Play on your turn or in showdowns.) Kill a unit at a battlefield with 2 :rb_might: or less. If it was an enemy unit, play a Gold gear token exhausted. If it was a friendly unit, play two Gold gear tokens exhausted."* A Sentry, the Rookie or Marai. Six left. |

The walked opponent ran none of these and did not need one on T3.

**No spell tax reaches it.** The slice-1 and slice-3 Plaza lines moved to T5 against
`VEN-045 Helm of Suppression` on their T2: *"Opponents' spells cost :rb_energy_1: more."* This line casts
no spell, and Marai is played *"ignoring its base cost"* (811.1.b). The Helm changes nothing.

**Waiting does not stop it either.** If they play nothing on their T3 and never attack, no chain or
showdown opens and Marai cannot be played on their turn (316.5.b, 309.1.a). That is why it can be
played on your own T3 instead: seven before their turn, with the facedown answer given up.

**The battlefield cannot be answered.** 170.3: *"Battlefields cannot be Killed during the course of
regular play."* What can be answered is the count.

## 6. Against the free Hold curve

| | pays |
|---|---|
| This line, `npm run adversarial -- --turns` | **T4** |
| Body/Fury Hold baseline, same command | **T5** |
| This line in the walk above | not by T4, **and not by T5**: five at the T5 Hold |

The clock prices the line at T4: the Combatant (E4), the Rookie (E2), Marai at its printed E2 and four
bodies at E1 each (Determined Sentry, the cheapest Body body), twelve Energy, which T1 and T2 (six runes)
cannot pay and T3 can, so the set completes on T3 and the Hold waits for T4. The hand count agrees on
the turn and not on the parts: only three Sentries exist (103.2.b), so the fourth body is an Energy-2
Poro, and Marai's hide costs one Power and no Energy. By hand the line is 11 Energy and 1 Power, which
the 12 runes of T1 to T3 pay because the recycled rune has already been exhausted. The clock does not
model [Hidden]; here its two errors cancel. By the end of T2 the most at the Plaza is three, so T4 is
the lower bound. The line uses no readying effect, no readying rune and no [Accelerate], so none of the
clock's open gaps (#513, #517, #523) moves it.

On the clock's board the line is one turn faster than the Hold curve. By the issue's rule it beats the
baseline, and it enters `data/combos.json` as `status: candidate`.

The walk is the other half. Against the same opponent the slice-3 line also lost the T4 Hold to the same
6 Might, and won at T5 with a rebuild in the trash and a legend buff. This line spends every card it has
seen to make seven, so the rebuild is one draw, and it does not win by T5.

## 7. Verdict

**One turn faster than the Hold curve on the clock, and in the walk no faster than the slice-3 line on
T4 and worse after it.** Body/Fury cannot make two units from one cheap card, so seven units by T3 is
the whole of its first seven cards, and the [Tank] does not fit in twelve Energy. Fury fits it with a
hidden Marai, whose one Power comes from a rune that has already paid its Energy. The kill price is 6, as
in slice 3, and a deck that answers with bodies needs 6 Might ready on its T3 with no attacker Marai can
kill. It is the rarest line of the pass: seven with the Tank by T3 in about one game in 12,000 (§8).

## 8. Not verified

**Runes.** The line costs no domain Power on your side: the hide is [A], any domain (135.2.e.5.a), so
every rune pays it: no rune split fails, **0 of any** deal. Their side needs one Order rune among their
first nine for the Captain's Power. The walk assumes six Calm and six Order in the twelve of Tournament
Rules 402.1, so all nine Calm is impossible: **0 of 220**.

**How often the seven are castable by T3.** The draw pile is **39** cards, the 40 of Tournament Rules
402.1 less the Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register
a Main Deck of exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3
battlefields each with a unique name."* Going first you have seen 5 cards by T1, 6 by T2 and 7 by T3.
With the walk's three each of Determined Sentry, Towering Combatant, Pit Rookie, Mischievous Marai and
Pouty Poro, computed exactly over ordered draws and every way to spend 2, 4 and 6 Energy on T1 to T3
(the hide on T2 or T3 for a recycled rune, which leaves one Energy fewer on T3 when it is done on T2; a
unit played before the Plaza is yours goes to base and walks on a later turn), seven units at the Plaza
with a Combatant among them by the end of T3 happen in **0.008%** of games, and seven in any form in
**0.013%**. With six more Energy-2 bodies in place of other cards the Tank case is 0.055% and the any
case 0.239%. The count does not ask that the Rookie be played after the Combatant, so the 6-Might Tank
is a little rarer still. Mulligan ignored. The case is rare because all seven cards seen have to be
line units: the walked order needs both Sentries in the first five and the Combatant in the first six.

**The Plaza has to be in play.** 485.5: *"Setup: Each player randomly selects one (1) of their three
(3) Battlefields. The other two are removed and will not be used for this game."* One in three. With
the 0.008% that is about **0.003%** of games in which the line can be on the board with its Tank by the
end of T3, before the opponent does anything.

**Marai's timing.** The walk plays it inside their attack's showdown, where 347.2.b passes Focus to you.
If the attacker plays something first, Focus passes when that chain closes, 347.1.b: *"When that Chain
closes, Focus passes to the next Player in Turn Order."* Either way you get a window before damage. Not
walked: an opponent who answers Marai's own chain item (811.1.c.3: *"Playing a card from facedown (or
"from Hidden") does open a chain."*).

Not walked: going second (three runes on T1); the mulligan; 2v2 and Match (486.5 lets you choose the
battlefield); an opponent that runs any of the §5 spells; and `VEN-141 Butcher of the Sands`, the other
Fury/Body legend that pays Energy (Leads).

## Leads

- **Body/Fury's T4 Plaza is capped by cards, not by runes.** Going first, seven cards seen by T3 and no
  two-unit card at Energy 4 or less in the pair make the first seven cards the whole board. A legend
  that pays Energy does not change that: `VEN-141 Butcher of the Sands` reads *"[Reaction][>]
  :rb_rune_rainbow::rb_rune_rainbow:, :rb_exhaust:: [Add] :rb_energy_2:. Spend this Energy only to play
  units or activated abilities of units."*, which buys an eighth unit on T3 that there is no eighth card
  for. The clock does not price a legend's [Add], so a line built on it would read later there than by
  hand. A draw would lift the cap, and the pair's cheapest unit that draws, `UNL-097 Kinkou Initiate`
  (E3, *"When you play me, draw 1 if your other units have total Might 5 or more."*), fits in place of
  the Poro at exactly twelve Energy and leaves none for the card it draws.
- **A hidden unit is a seventh body at no Energy, and its play trigger is the only Plaza defence here
  that can shrink an attack.** Marai's 2 damage kills an attacker of 2 Might or less before damage is
  assigned, which turns 2 + 2 + 2 into 2 + 2 under the Combatant's 6. The Tank raises the price of the
  first kill; Marai lowers what the attack brings.
- **The clock does not model [Hidden].** It prices Marai at its printed E2, where the hide is one Power
  and the play is free (811.1.b). On this row the error cancels against the fourth body, which the clock
  prices at E1 though only three Energy-1 bodies may be run (103.2.b). A Plaza row with more than one
  hidden unit would read later on the clock than by hand.
