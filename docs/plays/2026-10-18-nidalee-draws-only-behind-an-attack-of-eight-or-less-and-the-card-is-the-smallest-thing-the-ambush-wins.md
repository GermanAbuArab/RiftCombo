# Play — Nidalee draws only behind an attack of eight or less, and the card is the smallest thing the ambush wins

Issue #401 (a slice of #200), 2026-10-18. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `nidalee-towering-combatant-ambush-draw`**, the Body ENGINE in which `UNL-114 Nidalee, Cat
Form` (E3 + 1 Body Power, M4) is played with [Ambush] into a combat beside `UNL-099 Towering Combatant`
(E4, M3, [Shield 2], [Tank]) and draws a card when her side wins it. The entry is right about the rule
it is named for: 466.3.a makes a win mean being the only player with units left, so a defence the
attackers survive is No Result and draws nothing. It is right that [Shield] makes the Combatant a 5
exactly when it defends. It is wrong that the Combatant *"forces every point onto itself"*: [Tank]
demands lethal damage first, and 465.2.c.4 stops the assignment there, so the Combatant soaks exactly
5 and the rest goes to Nidalee. She survives an attack of 8 or less, and the two of them die to 9.
That gives the line a closed form the entry does not state. Against an attack of 8 or less with no
tricks, the defence's 9 always clears the attackers, so Nidalee survives exactly when she draws. Walked
as a game, going first, against a Fury/Chaos Draven deck whose own legend draws when it wins a combat,
they attacked the Combatant with 7 on their T3. The ambush killed both attackers and drew a card: **4
to 3** after their T4. Played face-up on your own T3, the same Nidalee deters the same attack and
draws nothing: **3 to 3**. Without her they take the battlefield and draw: **3 to 4**. The card is
the smallest part of what the ambush wins, and it is the most fragile. The attacker gets Focus back
after Nidalee resolves (347.1.b), and the cheapest cards that break the line cost one rune and no
Power. `OGN-169 Gust` returns the Combatant before the attack, while it is still a printed 3. `OGN-004
Cleave` in the combat makes the attack 10.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-18 at `88f0ffe`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 17 of them with no play**, as
the issue measured. The two picks are unchanged: this entry is rank 84, the first in the list. The
other entry of this slice is rank 85, `gentlemens-duel-onslaught-challenge-ceiling`, played in
[Onslaught and the Duel beat an ambushed Vilemaw only together, and the second spell is what Crumbling Sands counters](2026-10-18-onslaught-and-the-duel-beat-an-ambushed-vilemaw-only-together-and-the-second-spell-is-what-crumbling-sands-counters.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGS-023 Might of Demacia - Starter` (Body/Order, tag Garen) |
| **Chosen Champion** | `OGS-007 Garen, Rugged` (Body, E6 + 1 Body Power, M5) |
| **The payoff** | `UNL-114 Nidalee, Cat Form` (Body, E3 + 1 Body Power, M4) |
| **The wall** | `UNL-099 Towering Combatant` (Body, E4, M3) |
| **The other bodies** | `OGN-210 Daring Poro` (Order, E2, M2) and `UNL-154 Crimson Pigeons` (Order, E3, M3) |

The entry admits any of seventeen legends with Body in their pair. Might of Demacia is the one for
this walk because its text plays no part (*"When you conquer, if you have 4+ units at that
battlefield, draw 2."*: no conquer here has more than one unit of yours at the battlefield), so the
only draws in the line are Nidalee's. Its tag is Garen, 103.2.a.2: *"Must be a champion unit with a
champion tag that matches the tag on your Champion Legend."* Garen, Rugged is tagged Elite, Garen and
Demacia, is not a Signature card (`signature` in `data/cards.json`), and starts in the Champion Zone,
103.2.a.1: *"This will be placed in the Champion Zone at the start of the game."*

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* None is a Signature card, and none is in `data/legality.src.json` or marked
[BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Nidalee, Cat Form: *"[Ambush] (You may play me as a [Reaction] to a battlefield where you have
  units.) When I win a combat, draw 1. (I win if I remain after combat.)"*
- Towering Combatant: *"[Shield 2] (+2 :rb_might: while I'm a defender.) [Tank] (I must be assigned
  combat damage first.)"*
- Daring Poro: *"[Assault] (+1 :rb_might: while I'm an attacker.)"*
- Crimson Pigeons: *"I have +2 :rb_might: while I'm attacking with another unit."*
- Garen, Rugged: *"[Assault 2], [Shield 2] (+2 :rb_might: while I'm an attacker or defender.)"*

## 2. What the Combatant soaks, when Nidalee arrives, and who acts last

**[Ambush] is a place and a speed.** 822.1.b: *"It is functionally short for "I may be played to a
battlefield where you control Units" and “I have [Reaction] as long as I’m being played to a
battlefield where you control Units.”"* [Reaction] carries [Action]'s permissions, 813.1.b:
*"Reaction grants the corresponding card or effect all abilities and permissions of Action."*, and
806.1.b is the one that reaches a combat on their turn: *"Action grants the corresponding card or
effect permission to be played or activated during Showdowns, even when it is not the Controlling
player's turn."* The battlefield is still yours while they attack it, 190.4.b: *"While a Combat or
Showdown is ongoing at a Battlefield, Control of that Battlefield cannot change until instructed by
steps of the Combat or Showdown."* So 813.3.a's default is met as well: *"Playing Units with Reaction
still has the inherent restrictions of playing Units without Reaction. It can only be played to the
controlling player's base or a battlefield they control."* What [Ambush] cannot do is reach an empty
battlefield, 822.3: *"If there are no units at the location chosen before Finalization completes for
any reason, then it is no longer a valid location by Ambush’s reasoning and cannot be played there"*.

**She arrives as a defender.** 464.2.c.3.a: *"If a Unit controlled by the Attacker or Defender becomes
present at this Battlefield after this moment, it will gain the Attacker or Defender designation
during the Cleanup phase following the action that caused it to become present, as appropriate for
its controller."* The entry reaches the same place through 323.2.a.

**The attacker acts first and last.** The attacker has Focus as the combat opens, 464.2.c.1.a: *"If a
showdown opens as part of combat, this player gains Focus as the showdown begins."* Focus comes to you
when they pass, 347.2.b: *"Otherwise, Focus passes to the next Player in Turn Order."* That is when you
can play Nidalee, 312.2.b: *"When the turn is in a Showdown State and they gain Focus."* And once she
resolves it goes back to them, 347.1.b: *"When that Chain closes, Focus passes to the next Player in
Turn Order."* The showdown ends only when everyone passes in a row, 347.2.a: *"If all Players have
passed once in sequence, the Showdown ends."* So the ambush is never the last card in the combat: they
see Nidalee on the board before they decide whether to spend anything.

**[Shield] is a 5 only while it defends.** 814.1.c: *"It is functionally short for "While I am a
defender, I have +X [M].""* 814.1.d.1: *"Shield remains in effect as long as the Unit maintains the
Defender designation."* In their Main Phase, before they move, the Combatant is a printed 3. The entry
is right about the combat and silent about the turn before it, which is where §5 finds the cheapest
answer.

**[Tank] takes lethal, not everything.** 815.1.b: *"It is functionally short for "I must be assigned
lethal damage before any other unit with the same controller as me that does not have [Tank] during
the Combat Damage step.""* 815.1.c.2: *"If more than one unit with Tank is present with the same
controller in Combat, damage may be assigned to any of them. Units without Tank are invalid
assignments until all units with Tank have lethal damage assigned to them."* Then 465.2.c.4 stops the
assignment at lethal: *"Units cannot have more damage assigned to them than the minimum required to
constitute lethal damage unless no further units remain to have damage assigned to them."* Lethal is
the Combatant's current Might, 142.4.b: *"Lethal Damage for a Unit is a non-zero amount greater than
or equal to that Unit’s Might."* So an attack of *T* puts 5 on the Combatant and *T* − 5 on Nidalee.

**The closed form.** Your side is 5 + 4 = **9**, by 465.2.b: *"Sum the Might of all Defending
Units."* Theirs is *T*, by 465.2.a: *"Sum the Might of all Attacking Units."* Undamaged attackers need
exactly their Might in lethal, so your 9 clear every attack of 9 or less (465.2.c.3: *"Units must have
lethal damage assigned to them in full before damage is assigned to a different Unit."*).

| Attack *T* | The Combatant | Nidalee | Their attackers | Result | Draw |
|---|---|---|---|---|---|
| 1 to 4 | survives | untouched | all die | you win | 1 |
| 5 | dies | untouched | all die | you win | 1 |
| 6 to 8 | dies | survives with *T* − 5 | all die | you win | 1 |
| 9 | dies | dies | all die | No Result, A uncontrolled | 0 |
| 10 or more | dies | dies | at least one lives | they win | 0 |

The rows from 9 down are 143.2.a, *"If a Unit ever has nonzero damage marked on it equalling or
exceeding its Might, it is Killed."*, then 466.3.a, *"A Player has won a combat if they received either
the attacker or defender designation and are the only Player that has units remaining at this
battlefield during this step."*, 466.3.c, *"Units at this battlefield inherit the same combat result as
their controllers"*, and 466.3.d, *"There is “No Result” if units were recalled during step 3d of the
Combat Cleanup, if both Players have units present during this task, or if neither player has units
present during this task."* A battlefield nobody holds is 466.5.b: *"If there are no Units remaining
here controlled by any player, the Battlefield becomes Uncontrolled."* So with no tricks on either side,
**Nidalee survives exactly when she draws**, and the entry's condition, *"if that clears the attacking
side"*, is already met whenever she lives. The Combatant dies in every row from 5 up: the card costs a
Combatant whenever the attack is big enough to be worth answering.

**What she adds to the Combatant alone.** Without her the Combatant's 5 wins every attack of 4 or less,
trades with an attack of exactly 5, and loses every attack of 6 or more. Rows 6 to 8 are the ambush's
real work: a combat they win becomes one they lose, two or more units of theirs die, and the card
comes on top.

**The runes, going first.** You have 2, 4, 6 and 8 runes channelled by T1 to T4, less what you have
recycled. A rune adds Energy by exhausting, 164.2.a: *"[E]: [Reaction] — Add [1]."*, and Power only by
leaving, 164.2.b: *"Recycle this: [Reaction] — Add [C]."* Both carry [Reaction], so runes you leave
ready pay on their turn. Nidalee is three runes, one of them a Body rune recycled.

## 3. Their deck: Fury/Chaos Draven

`SFD-185 Glorious Executioner` (Fury/Chaos): *"When you win a combat, draw 1. (You win if only your
units remain after combat.)"* It is the mirror of the subject: the combat that draws them a card is the
same combat the ambush turns into Nidalee's. Its Chosen Champion is `OGN-028 Draven, Showboat` (Fury,
E5 + 1 Fury Power, M3): *"My Might is increased by your points."* He is played from the Champion Zone,
419.1.a: *"By default, a player can only Play cards from their hand or their Chosen Champion zone."*
Their bodies are `OGN-175 Shipyard Skulker` (Chaos, E3, M3, no text), `OGN-018 Noxus Saboteur` (Fury,
E3, M3; *"Your opponents' [Hidden] cards can't be revealed here."*, and you hide nothing), `OGN-003
Chemtech Enforcer` (Fury, E2, M2; *"[Assault 2] (+2 :rb_might: while I'm an attacker.) When you play
me, discard 1."*) and `OGN-013 Pouty Poro` (Fury, E2, M2, [Deflect]). [Assault] is 807.1.c: *"It is
functionally short for "While I am an attacker, I have +X [M].""* Going second, they channel an extra
rune on T1, 485.7: *"First Turn Process: The player going second channels an extra Rune from their
Rune Deck during their first Channel Phase of the game."* §5 names their answers.

## 4. The turns, going first

Body/Order against Fury/Chaos. Your battlefield is A, `OGN-281 Hallowed Tomb` (*"When you hold here,
you may return your Chosen Champion from your trash to your Champion Zone if it is empty."*, and Garen
is never in your trash); theirs is B, `SFD-221 Veiled Temple` (*"When you conquer here, you may ready a
friendly gear. If it's an Equipment, you may detach it."*, and nobody has a gear). Your opening four are
Daring Poro, Towering Combatant, Nidalee and Crimson Pigeons. Your draws are `SFD-099 Veteran Poro`
(T1), `OGN-217 Trifarian Gloryseeker` (T2), `UNL-092 Demacian Diplomat` (T3), `SFD-155 Honest Broker`
(Nidalee's draw on their T3) and `SFD-096 Laurent Bladekeeper` (T4). Their opening four are Shipyard
Skulker, Noxus Saboteur, Chemtech Enforcer and `OGN-171 Mystic Poro`. Their draws are Pouty Poro (T1),
`OGN-010 Legion Rearguard` (T2), `OGN-185 Traveling Merchant` (T3), `OGN-016 Dangerous Duo` (T4), and
on T4 the legend's draw, a second Shipyard Skulker.

```
turn      runes  your turn                                               points
T1        2      Daring Poro (E2) to base. None left.                    0
their T1  3      Shipyard Skulker (E3) to base. None left.
T2        4      Poro walks to A, empty, Conquer: +1. Towering           1
                 Combatant (E4) to A. None left.
their T2  5      Skulker walks to B, empty, Conquer. Noxus Saboteur
                 (E3) and Chemtech Enforcer (E2, discards Mystic Poro)
                 to base. None left.
T3        6      Hold A: +1. Poro walks home. Crimson Pigeons (E3) to    2
                 base. Three left, one of them Body.
their T3  7      Hold B. Saboteur and Enforcer attack A: 7. Nidalee
                 (E3 + 1 Body Power) with Ambush; both attackers die,
                 Nidalee draws. Draven (E5 + 1 Fury Power) and Pouty
                 Poro (E2) to base. None left.
T4        7      Hold A: +1. Poro and Pigeons attack B: 8 against 3,     4
                 Conquer, +1. Garen (E6 + 1 Body Power) from the
                 Champion Zone to B. One left.
their T4  8      Draven (5) and Pouty Poro attack A: 7 against
                 Nidalee's 4, Conquer, the legend draws. Rearguard
                 (E2), Merchant (E2) and Duo (E3) to base. One left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T3 it
is **2 to 1**; after their T3, **2 to 2**; after your T4, **4 to 2**; after their T4, **4 to 3**.

Runes on your board at the end of each turn: 2, 4, 6, 5 after their T3, 6 after your T4. On theirs: 3,
5, 6, 8.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro; 5, then 4 after the Combatant; 5, then 4
after the Pigeons (Nidalee, Veteran Poro, Gloryseeker, Diplomat); 3 after Nidalee and 4 after her draw;
5 after the T4 draw. Garen comes from the Champion Zone and leaves your hand at 5. Theirs: 5 after the
T1 draw, 4 after the Skulker; 5 after the T2 draw, 2 after the Saboteur and the Enforcer's discard
(Pouty Poro, Rearguard); 3 after the T3 draw, 2 after the Pouty Poro (Rearguard, Merchant); 3 after the
T4 draw, 4 after the legend's draw, 1 after the Rearguard, the Merchant and the Duo (the Skulker).

**Your T2: the wall goes up.** The Poro takes A, which is empty: a non-combat showdown, 316.8.b.1:
*"Showdowns that occur as a result of a player moving to an empty Battlefield are a stand-alone Phase
and do not create a Combat."* With no rune ready they pass, and 348.2.a.1 makes it a point: *"This
results in a Conquer if that player has not yet scored that Battlefield this turn."* The Combatant goes
to A, which you now control, 355.2.a: *"By default, Valid locations include the controller’s Base or a
Battlefield the controller controls."* That opens no showdown, 190.3.a.1: *"Units moving to or being
played to a battlefield apply Contested status if that battlefield is not already Contested and that
Unit’s controller does not already control that battlefield."*

**Your T3: the Poro walks home, and three runes stay up.** You Hold A, 469.2: *"Hold: A player maintains
Control of a Battlefield they did not yet Score this turn during their Beginning Phase."* The Poro
leaves A for base, 144.4.b: *"Units may move from a Battlefield to their Base."* It has to: a unit at A
cannot reach B on T4 without [Ganking], and from base it can, 144.4.a: *"Units may move from their Base
to a Battlefield."* A keeps the Combatant, so you keep A. The Pigeons go to base for three of your six
runes, and the other three stay ready, one of them Body. The Combatant stands alone at A: a 5 to
anyone who attacks it.

**Their T3: they attack the 5 with 7.** They Hold B. Their Saboteur and Enforcer are ready in base, and
they move both into A as one move, 144.3: *"Players may perform multiple Units' standard move
simultaneously. This is treated as one game action performed on multiple Units."* That is 3 + 4 with
the Enforcer's [Assault 2], against a Combatant that will be 5. Against the Combatant alone it is a
winning attack: their 7 kill it, its 5 kill one of the two, and the other conquers A and draws them a
card. They have Focus, hold no card that matters, and pass.

You have Focus. Nidalee goes to A with [Ambush], E3 + 1 Body Power: three runes exhausted, the Body one
recycled. Playing a card closes the state, 354: *"1. Move the card from its current zone to the
Chain."*, 354.1: *"This Closes the State."*, and in a Closed State only Reactions can answer, 309.1.a:
*"Only cards and abilities with the Reaction keyword can be played or activated in a Closed State."*
They have none. She resolves, enters exhausted (143.4: *"Units enter the Board exhausted."*) and becomes
a defender in the cleanup (464.2.c.3.a). Combat does not read exhaustion. Focus goes back to them
(347.1.b); they pass, you pass, and the showdown ends (347.2.a). Then 348.1: *"If it is a Combat
Showdown, proceed with the remaining steps of Combat to resolve the phase."*

Damage, 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal to their
summed Might among the other's Units."* Theirs is 7: 5 on the Combatant, first and only to lethal, and
the last 2 on Nidalee. Yours is the Combatant 5 and Nidalee 4: 9, of which the Saboteur takes 3 and the
Enforcer 4, with 2 over. All of it is dealt at once, 465.2.c.1.a: *"When all Damage is assigned, it will
be Dealt simultaneously. These actions are not synonymous."* The Combatant, the Saboteur and the
Enforcer die (143.2.a). Nidalee, with 2 on a 4, does not, and the cleanup heals her, 466.1.a.1:
*"Insert “3c. Heal all Units.”"* No attacker is left to recall. You are the only player with units at A,
so you win the combat (466.3.a), Nidalee inherits it (466.3.c), and she draws: Honest Broker. You
already control A, so there is no Conquer, 466.5: *"1. If no Showdown or Combat is staged at this
location, the player with Units remaining here Establishes Control if they didn’t already control this
Battlefield."* Their legend draws nothing.

After the combat they play Draven, Showboat from the Champion Zone (E5 + 1 Fury Power, one Fury rune
recycled) and Pouty Poro to base. Draven is 3 + their 2 points: 5.

**Your T4: B is one Skulker.** Everything readies, 315.1.b: *"1. The Turn Player readies all Game
Objects they control that are able to be readied."* You Hold A: 3. The Poro, 3 with [Assault], and the
Pigeons, 5 attacking with another unit, walk from base into B: 8 against the Skulker's 3. Its 3 kill
the Poro; your 8 kill it. The Pigeons remain, 466.5.d: *"Establishing Control results in a Conquer if
that player has not yet scored this Battlefield this turn."* That is 4. Garen comes from the Champion
Zone to B for six of your seven runes, a second Body rune recycled. At B he is a 7 whenever he defends.

**Their T4.** They hold nothing: B is yours and A was never theirs. Draven, 5, and Pouty Poro, 2, attack
A, where Nidalee stands alone: 7 against 4. Their 7 kill her; her 4 kill the Pouty Poro and leave 2 on
Draven. Draven remains, they Conquer A, and Glorious Executioner draws. Then the Rearguard, the Merchant
and the Duo to base. **4 to 3.**

**Without Nidalee.** Same draws, same runes, Nidalee not in hand. Their 7 kill the Combatant, and its 5
kill the Enforcer with 1 over onto the Saboteur. The Saboteur remains: they Conquer A, 3, and their
legend draws. On your T4 you have no Hold. The Poro and the Pigeons take one of their two battlefields,
8 against a lone 3: 3. On their T4 they Hold the other: **3 to 4** after their T4. They have one more
card than in the walk, you one fewer, and both of their T2 bodies still live.

**Nidalee face-up on your T3.** Played to A in your own Main Phase, she is the same 4 beside the same
5. Their 7 cannot take a 9 and lose everything into it, so they do not attack. They Hold B and add the
Saboteur and the Enforcer there: B is 3 + 3 + 2 = 8, since [Assault] counts only on attack. On your T4
you Hold A, 3; the Poro and the Pigeons attack B, 8 against 8, and everybody dies, so B is left to no
one (466.5.b). On their T4 Draven walks into the empty B and Conquers it: **3 to 3**, no unit of theirs
died that you did not pay for, and nobody drew. Face-up she guards A. As an ambush she also kills both
attackers and draws.

**The other ordering: ambush in response to the move.** There is nothing to respond to. A move is a game
action, not a chain item, and the first window you get is the combat showdown, after they have Focus
(464.2.c.1.a). Playing Nidalee earlier, on a chain they open in their Main Phase, puts her on the board
before they choose to attack, and that is the face-up line.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Going first, you
have seen **6** cards by T2 and **7** by T3. With three copies of each (103.2.b: *"Your Main Deck can
include up to 3 copies of the same named card."*), a Combatant among the first 6 is **40.30%**, a
Nidalee among the first 7 **45.73%**, and both **16.89%**. Each then also needs the opponent to attack
into it with 8 or less.

## 5. Breaks to

**What the engine did, and the predicate.** On their T3 an attack of 7 met a defence of 9 it did not
know about, every attacker died, and Nidalee drew. The predicate is: played on their T3, before
combat damage, does it leave Nidalee without the card, because she is not at A, or dead, or beside an
attacker who lives?

**The scope.** A Fury/Chaos deck plays only Fury, Chaos and Fury/Chaos cards (103.1.b.1), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* Glorious Executioner's tag is
Draven. The predicate is: a card in those domains in `data/cards.json` (not a legend, battlefield or
rune), not a Signature card with another champion's tag. Folded by name, that is **252** cards. Of the
five Signature cards in those domains, four carry another tag and are out (`OGN-252 Super Mega Death
Rocket!`, `OGS-018 Tibbers`, `UNL-186 Death from Below`, `VEN-144 Death Mark`); Draven's own `SFD-186
Spinning Axe` is in. Five of the 252 are banned in constructed (`OGN-168 Fight or Flight`, `OGN-177
Stealthy Pursuer`, `OGN-182 Scrapheap`, `SFD-020 Draven, Vanquisher`, `SFD-122 Called Shot`), which
leaves **247**. Swept for *deal*, *damage*, *return*, *kill*, *banish*, *recall*, *[Stun]*, a Might
change, *ignore [Tank]* or moving an enemy: **135** cards, each read.

**Window 1: their Main Phase, before the move. One rune, no Power.** Here the Combatant is a printed 3
(814.1.c), and anything that takes it off A takes the line with it. You lose A in the next cleanup,
190.4.c: *"If a player has no Units at a Battlefield and the turn is in an Open state, they lose Control
of that Battlefield in the following cleanup unless there is a Combat or Showdown ongoing there."* Their
move into A then meets no unit of yours, so it is a non-combat showdown (316.8.b.1), and Nidalee has
nowhere to go (822.1.b, 813.3.a). They Conquer A, 3, without a combat.

- **`OGN-169 Gust`** (Chaos, E1; *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."*) returns the
  Combatant. **One rune, no Power.** It cannot do this in the combat, where the Combatant is a 5.
- `OGN-009 Hextech Ray` (Fury, E1 + 1 Fury Power; *"[Action] (Play on your turn or in showdowns.) Deal
  3 to a unit at a battlefield."*) kills it: one rune, recycled.
- `UNL-124 Isolate` (Chaos, E2; *"Move an enemy unit from a battlefield to its base. Then, if there's an
  enemy unit alone at that battlefield, draw 1."*) sends it home, and `SFD-138 Windsinger` (Chaos, E2,
  a unit: *"When you play me, you may return another unit at a battlefield with 3 :rb_might: or less to
  its owner's hand."*) returns it.
- `UNL-007 Smite`, `OGN-029 Falling Star`, `VEN-008 Ruthless Strike`, `VEN-106 Wind and Ghosts`,
  `OGN-024 Void Seeker`, `OGN-005 Disintegrate` and `OGN-172 Rebuke` reach it too, and cost more.

For them this is better than the attack even when you hold no Nidalee: A for one rune, and both their
units alive.

**Window 2: on the chain, in response to Nidalee.** Only Reactions (309.1.a), and the Combatant is a 5
now. Gust has no target: Nidalee is a 4 and on the chain. `UNL-131 Abandon` (*"Counter a spell."*)
does not reach a unit. `SFD-001 Against the Odds` (Fury, E2; *"[Reaction] (Play any time, even before
spells and abilities resolve.) Give a friendly unit at a battlefield +2 :rb_might: this turn for each
enemy unit there."*) sees only the Combatant: +2, an attack of 9, both sides die and nobody draws.

**Window 3: the combat, after Nidalee resolves. One rune, no Power.** Focus is theirs again (347.1.b),
and **52** of the 247 carry [Action] or [Reaction] in their text.

- **`OGN-004 Cleave`** (Fury, E1; *"[Action] (Play on your turn or in showdowns.) Give a unit [Assault 3]
  this turn. (+3 :rb_might: while it's an attacker.)"*) on the Enforcer makes the attack 10, since
  807.2 adds it to the [Assault 2] the Enforcer already has: *"If a Unit has Assault or has been
  granted Assault and is granted Assault by an additional source, the Assault Value of all granted
  Assault keywords is summed."* Their 10
  kill the Combatant and Nidalee; your 9 kill the Enforcer, now a 7, and leave 2 on the Saboteur. **They
  win the combat, Conquer A, and their legend draws, for one rune and no Power.**
- `SFD-003 Blood Rush` (Fury, E1; [Action], *"Give a unit [Assault 2] this turn."*) makes it 9: everybody
  dies, A is left to no one, nobody draws. With its [Repeat] paid, E2, it is 11 and they win.
- `UNL-014 Monster Harpoon` and `OGN-009 Hextech Ray` (each E1 + 1 Fury Power) put 2 or 3 on Nidalee, and
  the 2 the attack leaves her complete her lethal (142.4.b). Your 9 still kill both attackers, nobody
  remains, and A is uncontrolled: one rune, recycled. `OGS-003 Incinerate` (E2) and `VEN-010 Consuming
  Curse` (E2) do the same for two runes.
- Against the Odds now sees two enemy units: +4, an attack of 11, and they win.
- `OGN-033 Shakedown` (*"Choose an enemy unit. Deal 6 to it unless its controller has you draw 2."*)
  leaves the choice with you: they draw two, Nidalee stays.

`UNL-002 Inferna` and the other [Ambush] units of their own are not counted. They control units at A,
which is what 822.1.b asks, but not A, which is what 813.3.a asks, and whether [Ambush]'s added location
(822.1.c) overrides that is not ruled here. `VEN-004 Dune Surfer` (*"You ignore [Tank] while assigning
combat damage here."*) is not an answer but an attacker: in the attack in place of the Saboteur, the
same 7 put 4 on Nidalee first and 3 on the Combatant, and she dies while the Combatant wins.

Gust before the attack and Cleave in it are the cheapest, one rune and no Power each, and Cleave is the
better card for them: it wins A and their draw. The lesson for the player is the order of the windows.
The Combatant is safe from one-rune removal only once it is defending. Nidalee is safe only if the
attacker has no rune left after she lands.

## 6. Verdict

**Right about 466.3.a and about [Shield]; wrong about what [Tank] soaks; silent about who acts last.**
A win is being the only side left (466.3.a, 466.3.d), and the Combatant is a 5 exactly while it defends
(814.1.c). But [Tank] takes lethal and 465.2.c.4 stops it there, so the Combatant soaks 5 and Nidalee
survives only an attack of 8 or less. Then, with no tricks, the defence's 9 always clears the attackers,
so Nidalee survives exactly when she draws. Walked going first against a Draven deck that attacked the
lone Combatant with 7, the ambush killed both attackers, kept A and drew a card: **4 to 3** after their
T4, against **3 to 3** with Nidalee played face-up and **3 to 4** without her. The card is the smallest
of the three things the ambush wins. The other two are their two units and their Conquer. It is
also the most fragile, because the attacker gets Focus back (347.1.b). The cheapest breaks are one
rune with no Power: Gust on the Combatant while it is still a printed 3, before the attack, or Cleave
in the combat, which wins them the battlefield and their own draw.

## 7. Not verified

I did not deal the channel order. The walk assumes six Body and six Order runes for you, Might of
Demacia's two domains, in the twelve of Tournament Rules 402.1. Nidalee on their T3 needs a Body among
your first six, kept ready through your T3: it fails in **1 of 924, 0.11%**. Garen on T4 needs a second
Body among your first eight, the first having been recycled: that adds no failure, so the line fails in
**1 of 924, 0.11%**. Nothing else in the line needs a domain.

Their walk assumes six Fury and six Chaos. Draven on their T3 needs a Fury among their first seven: **0
of 924**. Hextech Ray or Monster Harpoon in the combat needs a Fury among the same seven, **0 of 924**,
and played with Draven after it, a second: **7 of 924, 0.76%**. Gust, Cleave, Blood Rush, Isolate and
Windsinger take any rune.

**How likely an answer is.** Out of their own **39**, by the combat on their T3 they have seen **7**
cards: four opening and a draw on each of their three turns. A Gust or a Cleave, each run three times,
is among them in **72.23%**; the nine one-rune, no-Power cards named here (Gust, Cleave and Blood Rush)
in **86.76%**. Those are before the deal. The walk fixes their opening four as non-answers, which leaves
three draws from the other **35**: a Gust or a Cleave among them is **44.17%**, the nine **60.28%**.
These count only the cards named, not how many of them a deck runs. And the attacker in the walk saw
three of your runes left ready through their turn. Their attacking anyway is the walk's assumption.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2, a rune split other than six and six, Dune Surfer in the attack, [Hidden] cards, your
choice at Shakedown, and the board after their T4.

## Leads

- The notable *"Towering Combatant 4 Energy for a body that soaks 5 (3 printed + [Shield 2]) and forces
  every point onto itself"*, and step 4, *"815.1.c.2 forces the attacker's whole assignment onto the
  Towering Combatant until it has lethal, so Nidalee survives"*: [Tank] demands lethal first (815.1.b),
  and 465.2.c.4 caps the assignment at lethal while another unit remains. The Combatant takes 5, and an
  attack of *T* puts *T* − 5 on Nidalee: she survives 8 or less and dies to 9. Step 4's *"so Nidalee
  survives"* holds only for an attack of 8 or less.
- The closed form the entry does not state: undamaged attackers need their own Might in lethal, so an
  attack of 8 or less always dies to the defence's 9. With no tricks on either side, Nidalee survives
  exactly when she draws, and step 5's *"If any attacker survives"* cannot happen while she lives.
- The Combatant dies in every defence of 5 or more (143.2.a with 814.1.d.1), so each card drawn against
  an attack worth answering costs a Combatant. The entry's arithmetic notable does not say so.
- 464.2.c.3.a is the paragraph that makes a unit arriving mid-combat a defender; the entry reaches it
  through 319.6 and 323.2.a.
- The attacker has Focus again after Nidalee resolves (347.1.b), so the ambush is never the last card in
  the combat. The entry names no answer.
  - In the combat: `OGN-004 Cleave` (E1, no Power) makes a 7 into a 10 and wins the combat for them.
    `SFD-003 Blood Rush` (E1) makes it 9, everybody dies and nobody draws. `UNL-014 Monster Harpoon` or
    `OGN-009 Hextech Ray` on Nidalee kill her for one rune, recycled.
  - Before the attack: the Combatant is a printed 3 in their Main Phase (814.1.c), so `OGN-169 Gust`
    (E1, no Power) returns it, and 822.1.b then has no unit of yours at A to ambush beside.
- [Shield] cuts both ways inside this one entry: the same keyword that makes the Combatant a 5 in the
  combat leaves it a 3 the turn before, where the cheapest answers live. The entry's mirror note on
  `jaull-fish-garen-rugged-mighty-discount` states only the combat half.
- *"WHAT IT IS NOT. Nothing here scores"* is true and undersells it. The walked swing is their Conquer
  of A: **4 to 3** with the ambush, **3 to 4** without Nidalee. Played face-up on your own turn, the
  same Nidalee deters the attack and draws nothing (**3 to 3**).
- In a legend with Order in its pair, `VEN-123 Soulspinner` (Order, E3, M3, [Ambush], no Power) gives
  the same wipe against an attack of 7 or less and no card. What Nidalee adds over it is one point of
  margin and the draw, for a Body Power.
