# Play — Mel's first banish takes their battlefield, and the Sanctions only thin a board that cannot reach yours

Issue #370 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `mel-defiant-soul-sanction-banish-cycle`**, the Calm/Chaos ENGINE in which
`VEN-110 Mel, Defiant Soul` banishes an enemy unit of 3 Might or less each time she becomes
[Empowered], her own [Empower] costs a discarded spell, and each `VEN-035 Sanction` in mode two
disempowers her now and Empowers her again at end of turn. The entry counts four permanent banishes a
game. Walked as a game, going first, Mel lands on T3 and her own [Empower] banishes at once. That first
banish was the one that scored. It took the 3 out of their 7 at B, your 5 attacked their 4, their whole
garrison died, and you conquered B: **3 to 1** after your T3, where without it they hold B and it is 2
to 2 after their T3. The Sanctions did not score. On your T4 the end-of-turn banish had no target,
because their two new bodies were at base. On T5 two Sanctions banished two of their five bodies at G,
taking G from 15 Might to 10. But those five could not reach B and your four could not reach G (144.4.b),
so it is **5 to 2** after your T5 with or without them. Walking Mel into the empty G on T4 would have
been a point more than keeping her home for the Sanctions. The cheapest break of the turn that scored
costs them their T2 Diplomat: with two of those five runes kept, 16 cards stop the T3 Conquer, and
`UNL-106 Repulse` and `OGN-009 Hextech Ray` do it for one rune. In the walk they spent all five, so
nothing could.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `072409a`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 27 of them with no play** (90
plays, 85 distinct subjects, 73 of them in the queue). That is one fewer in the queue than the issue's
101 at `2cdd536`; the two picks are unchanged and each moved up one rank. The pick is by global rank,
skipping entries that already have a play: this entry is rank 74 (a hit on *first*), first in the list.
The other entry of this slice is rank 75, `mask-mother-ruthless-strike-doubled-payment`, played in
[The Mother's +2 kept the attacker alive, and one rune answers the Strike eight ways](2026-10-14-the-mothers-plus-two-kept-the-attacker-alive-and-one-rune-answers-the-strike-eight-ways.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-193 Gloomist` (Calm/Chaos) |
| **The pair** | `VEN-110 Mel, Defiant Soul` (Chaos, E5, M4), `VEN-035 Sanction` (Calm, E3 + 1 Power) |
| **The fodder** | `OGN-183 Stacked Deck` (Chaos, E1), the spell her [Empower] discards |
| **The bodies** | `OGN-052 Stalwart Poro` (Calm, E2, M2), `OGN-175 Shipyard Skulker` (Chaos, E3, M3), `OGN-171 Mystic Poro` (Chaos, E2, M2) |

The entry names no legend, only the pair. This play takes Gloomist, because her draw on every Hold
pays for the cards Mel's [Empower] eats: *"When you or an ally hold, you may exhaust me to draw 1."*
103.1.b.1: *"Cards included in your deck must abide by your Domain Identity."* Its Chosen Champion is
`UNL-150 Vex, Apathetic` (Chaos, E4, M4). 103.2.a.2: *"Must be a champion unit with a champion tag
that matches the tag on your Champion Legend."* No card of either deck is a Signature card
(`data/cards.json`), and none is in `data/legality.src.json` or marked [BANNED] in
`data/corpus_flat.txt`.

The card text the play turns on:

- Mel, Defiant Soul: *"[Empower] — Discard a spell (Pay the cost: Empower me. Use only if not
  Empowered.) When I become [Empowered], banish an enemy unit at a battlefield with 3 :rb_might: or
  less."*
- Sanction: *"[Reaction] (Play any time, even before spells and abilities resolve.) Choose one — •
  Empower a unit. Disempower it at end of turn. • Disempower a unit that's [Empowered]. Empower it at
  end of turn."*

## 2. The price, and when each banish can happen

**Mel is T3, Mel and a Sanction are T4.** You channel two runes a turn, 315.3.b: *"1. The Turn Player
channels 2 runes from their Rune Deck."* Going first gets no extra rune; going second does, 485.7:
*"First Turn Process: The player going second channels an extra Rune from their Rune Deck during their
first Channel Phase of the game."* So going first you have 2, 4, 6, 8 and 10 runes on T1 to T5. Mel's E5
is T3. Her [Empower] costs no rune at all, so the first banish is on the turn she lands. Sanction is
three runes: two exhausted for Energy and a Calm one exhausted and then recycled for the Power, 164.2.b:
*"Recycle this: [Reaction] — Add [C]."* That Power has to be Calm, 164.2.b.1: *"The Power added this
way corresponds to the Domain of the Rune that is being Recycled."* Mel and one Sanction are eight
runes, T4. The walk does not do that: on T4 her banish had no target (§4).

**Her own [Empower] is for your Main Phase only.** It is an activated ability, and 145.2:
*"The Activated Ability of Units may be executed at any time during the controlling player's Main Phase
during an Open State, and not during a Showdown."* And 381: *"All Activated Abilities can only be
activated on the Controlling Player's Turn and during an Open State."* It has no exhaust in its cost, so
she can pay it the turn she enters, exhausted (143.4). The banish is a triggered ability, 383.3: *"When a
Condition is met, a Triggered Ability behaves like an Activated Ability and is placed on the Chain."*
The event it reads is 441.2.a: *"When a Game Object becomes Empowered as a result of the Empower game
action, that is an event that can similarly be referenced by game effects and abilities."*

**Once Empowered she stays Empowered, so each further banish needs a disempower first.** 441.1.b: *"An
Empowered Game Object can not be Empowered."* 441.1.c: *"If a Game Object is instructed to be Empowered
when it is already Empowered, nothing additional happens."* Sanction is the disempower. Its two modes
are not the same tool:

- **Mode two** (*"Disempower a unit that's [Empowered]. Empower it at end of turn."*) is the entry's.
  She is disempowered now, and the banish comes at end of turn, 317.1.a: *"At the end of the turn Game
  Effects take place."* While she is disempowered her own [Empower] is legal again, so in your Main
  Phase a discarded spell banishes **now**. The delayed Empower then finds her Empowered and does nothing
  (441.1.c). The walk's T5 uses that to cast two Sanctions in one turn.
- **Mode one** (*"Empower a unit. Disempower it at end of turn."*) Empowers her now. On a Mel that is
  not Empowered, that fires the banish at once, from a [Reaction], on either player's turn and in a
  combat. The trigger can go on the chain then, 383.3.c: *"Triggered Abilities can be put on the Chain
  during Closed States or Open States on any player's turn."* She is disempowered at end of turn, and
  her own [Empower] is ready again next turn. The walk does not use it, because her [Empower] on T3
  leaves her Empowered.

**What "at a battlefield" and "end of turn" cost.** The banish cannot reach a unit at a base. And a
"this turn" bonus still counts when an end-of-turn banish reads "3 or less": 317.1 (the Ending Step)
comes before 317.2.c, the Expiration Step where "this turn" effects expire. If the unit's Might rises
over 3 before the banish resolves, the target is gone. The worked example under 359.3.e.4: *"A unit with
3 or less Might is no longer a legal target if it is no longer a unit or if its Might is greater than
3."*

**Mel stays at base.** The entry's step 1 plays her at a battlefield. Her banish reaches any battlefield
from your base. At base no unit can reach her: units move from a base to a battlefield and back, 144.4.a:
*"Units may move from their Base to a Battlefield."* 144.4.b: *"Units may move from a Battlefield to
their Base."* Spells still can (§5).

## 3. Their deck: Fury/Body, Pridestalker

`UNL-183 Pridestalker` (Fury/Body): *"When you play a unit, give a unit +1 :rb_might: this turn."*
Their Chosen Champion is `SFD-025 Rengar, Pouncing` (Fury, E3 + 1 Power, M3), and they never have three
runes for him on your turn. They play small Body units:

- `UNL-094 Gemhand Hunter` (E2, M2): *"[Hunt] (When I conquer or hold, gain 1 XP.)"*
- `OGN-130 Crackshot Corsair` (E3, M3): *"When I attack, deal 1 to an enemy unit here."* It never
  attacks in this walk.
- `UNL-092 Demacian Diplomat` (E2, M2): *"When you play me, gain 1 XP."*
- `UNL-102 Crowd Favorite` (E3, M3): *"[Hunt] (When I conquer or hold, gain 1 XP.) Spend 2 XP: [Buff]
  me."*
- `UNL-097 Kinkou Initiate` (E3, M3): *"When you play me, draw 1 if your other units have total Might 5
  or more."*
- `OGN-136 Pit Rookie` (E2, M2): *"When you play me, buff another friendly unit."*

None of them has [Ganking], which matters on T4 and T5. 144.4.c.1: *"Units with Ganking may use their
Standard Move to Move from Battlefield to Battlefield."* A buff is a permanent +1, one per unit, 702.3:
*"There can only be one Buff on a Unit at a time."*

## 4. The turns, going first

Calm/Chaos against Fury/Body. Your battlefield is G; theirs is B. Your opening four are Stalwart Poro,
Shipyard Skulker, Mel and Stacked Deck. Your draws are Sanction (T1), a second Stalwart Poro (T2), a
second Skulker and Mystic Poro (the Gloomist and the draw on T3), a second Sanction and a second Stacked
Deck (T4), and two cards the walk does not use (T5).

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base.                               0
their T1        Gemhand Hunter (E2) to base. Three runes, one left.
T2      4       The Poro walks to G, Conquer: +1. Shipyard Skulker (E3)   1
                to G. One rune left.
their T2        The Hunter walks to B, Conquer (1 XP). Crackshot
                Corsair (E3) and Demacian Diplomat (E2, 1 XP) straight
                to B: 2 + 3 + 2, a 7. Five runes, none left.
T3      6       Hold G: +1, the Gloomist draws. Mel (E5) to base. Her     3
                [Empower] discards Stacked Deck: the Corsair is
                banished. The Poro and the Skulker walk to B: 5
                against 4. Both of theirs die and so does the Skulker.
                Conquer: +1. G is left empty. One rune left.
their T3        No unit on the board, no battlefield. A second Corsair
                (E3) and Crowd Favorite (E3) to base. Seven runes, one
                left.
T4      8       Hold B: +1, the Gloomist draws. A second Stalwart Poro    4
                (E2), a second Skulker (E3) and Mystic Poro (E2) to B.
                Mel stays at base. One rune left.
their T4        The Corsair and the Favorite walk to G, Conquer (1 XP).
                2 XP buff the Favorite. Kinkou Initiate (E3, draws 1),
                Pit Rookie (E2, buffs the Corsair) and a second
                Diplomat (E2, 1 XP) to G: 4 + 4 + 3 + 2 + 2, a 15.
                Nine runes, two left.
T5      10      Hold B: +1, the Gloomist draws. Sanction (E3 + 1 Calm     5
                Power), mode two, on Mel. Her [Empower] discards the
                second Stacked Deck: the Initiate is banished. The
                second Sanction, mode two, on Mel. Vex, Apathetic (E4)
                to base. Ten runes exhausted, two recycled. At end of
                turn she is Empowered again: the Diplomat is banished.
their T5        Hold G: +1.
```

Their points: 0 after their T1, 1 after their T2, 1 after their T3, 2 after their T4, 3 after their T5.
After your T3 it is **3 to 1**, after their T4 **4 to 2**, and after your T5 **5 to 2** (5 to 3 once
their T5 Hold scores).

**Why bodies go straight to a battlefield.** A unit is played to your base or to
a battlefield you control, 355.2.a: *"By default, Valid locations include the controller’s Base or a
Battlefield the controller controls."* That is why their Corsair and Diplomat go straight to B on their
T2, after the Hunter's Conquer, and why yours go to B on T4.

**Your T3, the banish.** Mel enters exhausted (143.4) and pays her [Empower] at once with Stacked Deck.
They hold no ready rune (all five went on their T2) and nothing facedown, so they pass. The trigger
chooses the Corsair (a 3 at B) and banishes it, 108.6.b: *"This space is where cards are placed when
they are banished by a spell or effect."* B is now the Hunter and the Diplomat, a 4. The Poro and the
Skulker walk there as one move, 144.3: *"Players may perform multiple Units' standard move
simultaneously."* Your 5 kill 2 + 2. Their 4 go to the Skulker first, 465.2.c.3: *"Units must have lethal
damage assigned to them in full before damage is assigned to a different Unit."* That is 3 on the
Skulker and 1 on the Poro. (Killing the Poro first and putting 2 on the Skulker leaves the Skulker
instead; B is yours either way.) 466.5.d: *"Establishing Control results in a Conquer if that player has
not yet scored this Battlefield this turn."* G is empty now, and 323.6: *"4. Players lose control of any
controlled Battlefields without their Units occupying them if the turn is in an Open State and there is
no Showdown or Combat ongoing there."*

Without the banish B is a 7 against your 5, and you do not attack. You Hold G for 2 to 1, and on their
T3 they Hold B: 2 to 2, with their three bodies still at B. So the first banish was worth the Conquer and
their whole garrison, a two-point swing by their T3. It cost five runes and a card. `OGN-169 Gust`
(Chaos, E1, *"Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."*) would have
done the same on T3 for one rune. The difference is that the bounced Corsair comes back for three runes
on their T3, and the banished one does not.

**Their T3, why nothing comes back to a battlefield.** Their three units at B died or were banished, and
they control no battlefield. Their new bodies go to base (355.2.a), and they cannot hide a card either,
107.3.c: *"Cards can only be placed in or occupy the Facedown Zone if the controller of the card also
controls the associated Battlefield."* (Three cards in their deck take B from your lone Poro instead,
§5.)

**Your T4, why there is no Sanction.** Their two bodies are at base, and Mel's banish reaches only *"an
enemy unit at a battlefield"*. A mode-two Sanction now would Empower her at end of turn with no legal
target, 359.3.e.7: *"If all of an instruction's Targets become Invalid or Unavailable by the time the
spell begins resolving, that instruction will not execute."* Holding three runes for one on their T4
costs a body at B. That body matters: with Sanction held and only two of your three bodies played, B
defends at 3 + 3 + 3 = 9 (the Poros' [Shield] counts on defence). Their Corsair and Favorite, pumped from
base, attack it at 11: 3 + 3, the Favorite's XP buff, Pit Rookie's buff on the Corsair, and three
Pridestalker +1s. They kill all three of yours and keep one of theirs, so B is theirs. With all three
bodies played, B defends at 11 and the same attack trades everything. So the walk spends seven runes on
bodies.

**Your T4, the line the walk did not take.** Mel is ready at base, and G is empty. She can walk into G
for a Conquer: **5 to 1**. On their T4 the Corsair and the Favorite take G back. The Corsair's attack
trigger puts 1 on her, and their 6 kill her. That is 5 to 2 after their T4, against 4 to 2 here, and the
engine is gone. So **the point-maximising T4 spent Mel as a body, not as an engine.** The walk keeps her
home to measure the Sanctions.

**Their T4, why G and not B.** B defends at 11, and their best attack from base is the 11 above: an even
trade that leaves B uncontrolled and gives them no point. G is empty, so they walk in, 190.3.a.1: *"Units
moving to or being played to a battlefield apply Contested status if that battlefield is not already
Contested and that Unit’s controller does not already control that battlefield."* No unit of yours is
there, so there is no combat and they Conquer. The Favorite's [Hunt] makes 3 XP, two of them buff it,
and their next three units go straight to G. The Initiate draws: the Corsair's 3 and the Favorite's 4
are 7. Pit Rookie's buff goes to the Corsair, since the Favorite already has one (702.3). Their three
Pridestalker +1s expire at end of turn.

**Your T5, two Sanctions in one turn.** Sanction one, mode two, disempowers Mel. Her [Empower] is legal
again, because the only bar on it was being Empowered. She discards the second Stacked Deck, and the
trigger banishes the Initiate in your Main Phase. Sanction two, mode two, disempowers her again: the
mode needs her Empowered, and the discard made her so. At end of turn the first delayed Empower finds her
disempowered, so she is Empowered and the trigger banishes the Diplomat (a 2). The second finds her
Empowered and does nothing (441.1.c). Both Sanctions recycled a Calm rune, so you hold eight runes, not
ten, after T5.

**What the two T5 banishes bought: no point.** G falls from 15 to 10 (Corsair 4, Favorite 4, Rookie 2).
Your four at B cannot walk to G, and their five at G cannot walk to B. From a battlefield a unit goes
only to its base (144.4.b), and nobody here has [Ganking]. So you Hold B and they Hold G, and the
banishes count only toward a later attack into G from your base. With Vex just played and Mel, that
attack is a T6 question: 8 against their 10 plus whatever they add. The walk stops there.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **7** cards by
your T3 draw, and **8** with the Gloomist's draw from the Hold of G. With three of each (103.2.b), a Mel
among the first 7 is **45.73%**, and among the first 8 **50.82%**. By your T5 you have seen **12** cards
(four opening, five draws, three Gloomist draws). A Mel among the first 8 and two Sanctions among the
first 12 is **10.18%**. That counts only those cards; the walk also needs a spell to discard on T3 and
another on T5, and a two-drop on T1.

## 5. Breaks to

**The predicate is the walk's result: the T3 Conquer of B, which made it 3 to 1, and the two T5
banishes, which made G a 10.** The first is the one that scores. Undo it and it is 2 to 2 after their
T3. Undo the second and G stays a 15, which changes no point through their T5.

**In the walk, nothing breaks the T3 Conquer.** They spent all five runes on their T2, hid nothing (they
had no battlefield on T1, and no rune on T2), and their runes do not ready until their own turn, 315.1.b:
*"1. The Turn Player readies all Game Objects they control that are able to be readied."* A hidden card
plays only from the turn after it is hidden, 811.1.b: *"Beginning on the next turn, this gains
[Reaction] and you may play this, ignoring its base cost."*

**The cheapest break costs them the Diplomat.** If they play the Corsair and keep two of their five T2
runes, B is the Hunter and the Corsair, 2 + 3, a 5. The banish still takes the Corsair, and your 5 still
attack their 2. Or they spend one of the two to hide a card at B, and keep one ready. On your T3 your
spell or ability is on the chain, and they may answer only with [Reaction], 309.1.a: *"Only cards and
abilities with the Reaction keyword can be played or activated in a Closed State."* A facedown card
counts, 811.6: *"A card that is Hidden gains Reaction while facedown or played from facedown, and may be
played any time a card with Reaction may be played as a result."* In your combat [Action] is legal too,
308.1.a: *"Only cards and abilities with the Action or Reaction keywords can be played or activated in a
Showdown State."* A unit they play on your turn still triggers Pridestalker's +1. Priced as single cards,
**16 break the Conquer**:

- **One rune, from hand.**
  - `UNL-106 Repulse` (Body, E1 + 1 Power): *"Choose a friendly unit at a battlefield. Counter an enemy
    spell or ability that chooses it and no other friendly unit."* The banish chooses the Corsair alone,
    so it is countered. Then your 5 meet their 5. You do not attack, or you do and all four die and B
    is left uncontrolled, 466.5.b: *"If there are no Units remaining here controlled by any player, the Battlefield becomes
    Uncontrolled."* No Conquer either way.
  - `OGN-009 Hextech Ray` (Fury, E1 + 1 Power, 3 damage) kills the attacking Skulker. Your Poro and their
    Hunter trade, and B is left uncontrolled.
- **Two runes, from hand.**
  - `UNL-184 Thrill of the Hunt` (Fury/Body, E2 + 1 Power): *"Banish a friendly unit, then its owner
    plays it to any battlefield, ignoring its cost."* In response to the banish, the Corsair leaves the
    board and comes back as a new object. The banish's target is gone, 359.3.e.2: *"A target is illegal
    as the spell resolves if it no longer meets the targeting requirements of the spell, or if it has
    changed Zones to or from a Non-Board Zone."* Pridestalker makes it a 4, and B is a 6 against your 5.
    It is a Rengar Signature card, legal for a Pridestalker deck under 103.2.d.2.
  - `SFD-022 Long Sword` (Fury, E2 + 1 Power, *"[Quick-Draw] (This has [Reaction]. When you play it,
    attach it to a unit you control.)"*, +2) on the Corsair in response makes it a 5, over 3
    (359.3.e.4). B is a 7.
  - `SFD-001 Against the Odds` (Fury, E2) gives the Hunter +2 for each of your two attackers: a 6 your 5
    cannot kill, while its 6 kill both of yours.
  - `OGN-127 Cannon Barrage` (Body, E2 + 1 Power, *"Deal 2 to all enemy units in combat."*) kills the
    Poro and leaves 2 on the Skulker. The Skulker and the Hunter then kill each other.
  - `SFD-097 Punch First` (Body, E1 + 2 Power, +5) makes the Hunter a 7.
  - `UNL-095 Grim Resolve` (Body, E2, +3) makes it a 5: your 5 kill it and its 5 kill both of yours.
  - `UNL-007 Smite` (Fury, E2 + 1 Power, 3 damage) and `OGN-008 Get Excited!` (Fury, E2 + 1 Power,
    with a card of cost 3 or more to discard) kill the Skulker, as Hextech Ray does.
  - `SFD-111 Here to Help` (Body, E2 + 1 Power) plays a three-drop from hand to B for nothing. With
    Pridestalker's +1 that is a 4, and B is a 6.
- **One rune on their T2, hidden at B, played for nothing on your T3.** A hidden unit lands at B,
  811.1.d.1: *"A hidden permanent must be played to that battlefield."* It joins the combat (464.2.c.3.a)
  with Pridestalker's +1.
  - `OGN-135 Pakaa Cub` and `OGN-018 Noxus Saboteur` (M3, a 4) make B a 6.
  - `UNL-028 Pyke, Dockside Butcher` (M2, a 3) makes it a 5: all four die.
  - `UNL-003 Mischievous Marai` (M2): *"When you play me to a battlefield, deal 2 to an enemy unit
    here."* The 2 kill your Poro, and their 5 beat your Skulker.
  - `SFD-017 Sudden Storm`: *"Deal 2 to a unit at a battlefield. If it's attacking, deal 4 to it
    instead."* It kills the Skulker.
  - Here to Help, hidden, does the same as from hand.

The one two-card case I checked: `UNL-014 Monster Harpoon` (one rune) deals 4 *"If you control a
facedown card"*, so beside a card hidden at B it kills the Skulker too. Alone it deals 2 and does not.

**The scope of the 16.** A Fury/Body deck plays only Fury, Body and Fury/Body cards (103.1.b.1). In
`data/cards.json`, folded by name and type with reprints and legends left out, **61** of them print
[Reaction] (on the card, on an ability or by [Ambush] or [Quick-Draw]), [Hidden], or [Action]. Two are
out under 103.2.d.2, *"All of the Signature cards must have the Champion tag that corresponds to the
Champion Legend of the deck."*: `SFD-184 Relentless Pursuit` (Lucian) and `VEN-142 Dominus` (Renekton).
Draven, Vanquisher, the one banned Fury/Body card, has none of the three keywords. That leaves **59**:

- **16 break it**, the list above.
- **17 cost more than the two runes**: `OGN-005 Disintegrate`, `OGN-014 Sky Splitter`,
  `OGN-022 Thermo Beam`, `OGN-024 Void Seeker`, `OGN-025 Blind Fury`, `OGN-144 Spoils of War` (it is two
  less only once an enemy unit has died), `OGN-153 Overt Operation`, `OGN-154 Primal Strength`,
  `OGS-008 Gentlemen's Duel`, `SFD-025 Rengar, Pouncing`, `SFD-114 Marching Orders`,
  `UNL-012 Lord Broadmane`, `UNL-021 Grim Apothecary`, `UNL-114 Nidalee, Cat Form`,
  `UNL-120 Rengar, Trophy Hunter`, `VEN-008 Ruthless Strike` and `VEN-017 Morgana, Vindictive`. Sudden
  Storm from hand is three runes too; hidden it is in the 16.
- **26 do not break it, or cannot be played on your turn**:
  - `OGN-004 Cleave`, `SFD-003 Blood Rush` and `UNL-010 Vault Breaker` give [Assault], which counts only
    while attacking, and theirs defend.
  - `OGN-033 Shakedown` deals 6 *"unless its controller has you draw 2"*. You choose the draw.
  - `OGN-128 Challenge`: the Hunter and the Poro kill each other, or the Hunter dies to the Skulker.
    Either way nothing defends B.
  - `OGN-129 Confront`, `OGN-146 Wallop`, `SFD-106 Show of Strength` and `UNL-103 Disposal Order` touch
    no unit in the combat.
  - `OGN-133 Flurry of Blades` puts 1 on everyone at B, and one of yours still lives.
  - `OGN-145 Unyielding Spirit` prevents damage, and a banish is not damage.
  - `OGS-003 Incinerate` and `VEN-010 Consuming Curse` deal 2. On the Poro it dies and the Skulker
    still wins; on the Skulker their 2 finish it, and the Poro lives.
  - `SFD-011 Angle Shot` needs an Equipment, and there is none.
  - `SFD-004 Bushwhack` (hidden) readies units that enter and makes an exhausted Gold token.
  - `UNL-002 Inferna` (M1) and Pridestalker's +1 make B a 4, split 3 + 1 or 2 + 2. Your 5 kill both,
    and one of yours lives.
  - `UNL-013 Lotus Trap`, from hand or hidden, doubles damage to one unit. On the Skulker the Poro
    lives, and on the Poro the Skulker lives.
  - Monster Harpoon alone deals 2.
  - `VEN-015 Decree of Rage` hits only a Calm unit: it kills the Poro, and the Skulker wins.
  - `VEN-072 Guttural Roar` makes the Hunter a 4, and your 5 kill it while one of yours lives.
  - `OGN-040 Seal of Rage`, `OGN-163 Seal of Strength`, `SFD-117 Ancient Henge`,
    `VEN-075 Platewyrm Egg` and `UNL-093 Dragonsoul Sage` carry [Reaction] on an ability, not on the
    card, and none is on the board. `UNL-018 Yeti Brawler` prints [Reaction] only on its Gold token.

**How often.** By their T2 they have seen **6** cards (four opening, two draws). If they run three of one
of the 16, one is among them in **40.30%**. With two of the 16 (six cards) it is **66.05%**, and with
three (nine cards) **81.80%**. Each is 6 of 39, and each costs them the Diplomat.

**Their T3: three cards take B from your lone Poro, and Mel can banish none of them.** The Poro is
alone at B, healed at the end of your turn, and a 3 with [Shield] when it defends. Three Fury/Body
units print a way to be played onto a battlefield an enemy holds, and they have seven runes:

- `SFD-093 Dauntless Vanguard` (Body, E4 + 1 Power, M4, five runes): *"You may play me to an occupied
  enemy battlefield."*
- `UNL-120 Rengar, Trophy Hunter` (Body, E5 + 1 Power, M6, six runes): *"I can [Ambush] to a battlefield
  where there are enemy units (even if you don't have units there)."*
- `UNL-117 Arachnoid Horror` (Body, E6 + 1 Power, M6, seven runes): *"I can be played to an occupied
  battlefield if an enemy unit is alone there."*

Played there, each applies Contested (190.3.a.1) and is the attacker, 464.2.c.1: *"The Attacker is the
player whose unit(s) applied the Contested status to the Battlefield."* With Pridestalker's +1 each is a
5 or a 7 against the Poro's 3. The Poro dies, and they Conquer: 3 to 2 after their T3. On your T4 Mel
walks into the empty G for 4 to 2. On their T4 they Hold B: **4 to 3**, a point worse than the walk. None
of the three is ever in range: 4, 6 and 6 Might, and an end-of-turn banish on their turn also meets the
+1. The scope is every Fury, Body and Fury/Body card in `data/corpus_flat.txt` whose text lets it be
played to a battlefield that is *"occupied"*, *"where there are enemy units"* or that they are
*"attacking"*. That is five: these three, `OGN-161 Deadbloom Predator` (E8 + 2 Power, ten runes), and
Rengar, Pouncing, whose battlefield must be one they are attacking, and they have no unit to attack
with. The other [Ambush] units (Inferna, Grim Apothecary, Nidalee, Lord Broadmane, Morgana) need a
unit of theirs already there. By their T3 they have seen **7** cards. If they run three of one of the
three, one is among them in **45.73%**; with all nine, **86.76%** (7 of 39).

**The T5 banishes, in three windows.** None changes a point through their T5. The first saves both
bodies at G; each answer in the other two saves one.

- **Their T4 Main Phase: Mel dies at base for two runes, and there is no T5 banish.** They kept two runes.
  `OGN-029 Falling Star` (Fury, E2 + 2 Power, two Fury runes): *"Deal 3 to a unit. Deal 3 to a unit."*
  It has no location, so 3 + 3 kills Mel at base. Challenge (Body, E2 + 1 Power, *"Choose a friendly
  unit and an enemy unit. They deal damage equal to their Mights to each other."*) does it with the
  buffed Corsair: its 4 or more kill Mel's 4. The scope is every Fury, Body and Fury/Body card in
  `data/corpus_flat.txt` that deals damage, kills or banishes without the words *"at a battlefield"*.
  At two runes or less, those two kill a 4 at base. Shakedown leaves you the draw. Decree of Rage needs a
  Calm unit, and Mel is Chaos. `UNL-020 Dancing Grenade` deals 2. `VEN-083 Rampage`,
  `SFD-107 Strike Down`, `UNL-110 Clash of Giants`, Gentlemen's Duel and `VEN-090 Cataclysmic Duel` cost
  three runes or more.
- **Your T5, from hand, two runes ready.** Each banish is a chain item they can answer with [Reaction]
  (309.1.a), the Main Phase one and the end-of-turn one alike. Repulse (one rune) counters either one,
  and Thrill of the Hunt (two) moves either target off the board. Long Sword (two) makes either target a
  4 or a 5. Inferna (two, [Ambush] to G) brings Pridestalker's +1. That saves the Initiate, since 3 + 1 is
  4, but not a 2. Against the Odds needs a unit of yours at G, and none is there. Two Repulses (one Body
  rune each) stop both banishes.
- **Your T5, hidden at G.** On their T4 they controlled G, and one of their two spare runes could hide a
  card there. On your T5 a hidden Pakaa Cub, Noxus Saboteur, Pyke, Mischievous Marai, or Here to Help
  with a unit in hand, lands at G for nothing. Pridestalker's +1 then lifts the Initiate to 4, but not a
  2.

So the Main Phase banish on a 3 has nine answers at two runes or less, and the end-of-turn one on a 2
has three. Whichever banish takes the 3, a +1 saves it; a 2 needs +2.

## 6. Verdict

**Right about the engine; wrong that its banish cannot come at instant speed, and it leaves out where
the banishes score.** Mel's first banish is free in runes and lands the turn she does: T3, going first.
In the walk that one banish decided the score. It took the 3 out of a 7, your 5 attacked their 4, and their
whole garrison died: 3 to 1, where without it they hold B and it is 2 to 2. Gust does that for one rune,
but returns the body to their hand. The Sanctions after it were worth no point. On T4 the end-of-turn banish had no
target, because their units were at base. On T5 two Sanctions banished two of five bodies at G, which
neither side's units could leave for the other's battlefield. And walking Mel into the empty G on T4 was a
point more than keeping her home. The entry says the re-fired banish comes only at end of turn. That is
true of mode two alone on an Empowered Mel. Mode two followed by her own [Empower] banishes now, for a
discarded spell. Mode one on a Mel who is not Empowered banishes at once from a [Reaction], in their
combat too. The break that matters costs them the Diplomat: with two runes kept on their T2, 16 cards
stop the T3 Conquer, the cheapest at one rune.

## 7. Not verified

I did not deal the channel order. The walk assumes six Calm and six Chaos runes, Gloomist's two
domains, in the twelve of Tournament Rules 402.1. Every card before T5 costs Energy only. T5's two
Sanctions need two Calm runes among the ten channelled, and ten of twelve always hold at least four
Calm: **all 66 deals** (0 fail). Their main line costs Energy only.

Their breaks name a Power domain, which the walk does not deal:

- **Their T2 with the Diplomat dropped (five runes, two kept).** Repulse, Cannon Barrage and Here to Help
  need one Body rune among the five, and Hextech Ray, Long Sword, Smite and Get Excited! one Fury. Each
  fails only if all five are the other domain: **6 of 792 deals, 0.76%**. Punch First needs two Body
  among the five, and fails in **96 of 792, 12.12%**. Against the Odds and Grim Resolve cost Energy
  only, and hiding costs one rune of any domain (811.1.b).
- **Thrill of the Hunt** prints *"E2 P1"* in `data/corpus_flat.txt` with no domain on the Power. If
  either domain pays it, it never fails; if only one does, 6 of 792.
- **Their T3 cards** need one Body rune among seven. They have only six Fury, so that holds in **all 792
  deals**.
- **Their T4 and your T5.** They choose which seven of nine runes to exhaust, and any nine of twelve
  hold at least three of each domain. So Falling Star's two Fury, and the one-rune answers, hold in
  **all 220 deals**.

I did not walk these:

- The mode-one line: Mel played and not Empowered, with a Sanction held for their combat. On this curve
  that is T4 at the earliest (Mel's five runes and Sanction's three).
- Mel at a battlefield after T4, beyond the one alternative in §4.
- Your T6 attack into G, their T5 beyond its Hold, and the third Sanction.
- Going second, the mulligan, and 2v2.
- The order of two delayed "at end of turn" effects. The walk's T5 does not depend on it: the first
  Empowers her, and the second does nothing either way.

Their hand holding no answer, and their T3 holding none of the three cards that take B, is the walk's
assumption; §5 prices both. The probabilities in §4 and §5 count only the cards named.

## Leads

- The notable *"THE RE-FIRED BANISH LANDS AT END OF TURN, NOT AT INSTANT SPEED"* and its *"it does NOT
  answer an attacker mid-combat"* hold only for mode two on a Mel who is already Empowered.
  - Mode one on a Mel who is not Empowered Empowers her at once, from a [Reaction], and her trigger can go
    on the chain on either turn (383.3.c). That is an instant banish, in their combat too.
  - After mode two in your Main Phase, her own [Empower] is legal again. A discarded spell banishes now,
    and the delayed Empower then does nothing (441.1.c). The walk's T5 used that to cast two Sanctions
    in one turn.
  - The same sentence is in `docs/rules-notes/rules-findings.md` (the #159 bullet: *"a [Reaction] enabler
    never makes it instant-speed removal"*).
- Step 1 plays Mel *"at a battlefield"*. Her banish reaches a battlefield from your base, and at base no
  unit can reach her (144.4.a, 144.4.b). The notable *"MEL HAS TO SURVIVE AT 4 MIGHT"* names no place.
  At base it is a question of spells: in Fury/Body, at two runes or less, Falling Star and Challenge
  (with a unit of 4 or more) kill her there.
- No step or notable says which turn to cast Sanction on. On your own turn the end-of-turn banish finds
  nothing if their units are at base: in the walk, on T4, it had no target. On their turn, Sanction
  resolves into their Main Phase, 312.2.a: *"When the turn is in a Neutral Open State during their Main
  Phase."* They then get the whole Main Phase to lift units over 3, and a "this turn" bonus such as
  Pridestalker's +1 lasts through the end-of-turn banish (317.1.a comes before 317.2.c).
- The notable *"NOTHING HERE SCORES"* is right about the banish, but the first banish decided this walk.
  On T3 it took a 3 out of a 7 and opened the Conquer of B: 3 to 1 instead of 2 to 2. The Sanction
  banishes on T5 thinned a garrison at G that could not reach B and changed no point. Walking Mel into
  the empty G on T4 was a point more than keeping her home.
- No step or notable names an answer. `UNL-106 Repulse` (Body, one rune) counters the banish, which
  chooses one of their units at a battlefield and no other. Against the T3 Conquer, 16 of the 59
  Fury/Body cards in the §5 scope break it at two runes or less. In the trade the walk priced, each
  costs them the T2 Diplomat.
- *"THE TARGET RESTRICTION IS THE REAL CEILING"*, measured: the three cards that take B from a lone
  Poro on their T3 are Might 4, 6 and 6 (`SFD-093 Dauntless Vanguard`, `UNL-120 Rengar, Trophy Hunter`,
  `UNL-117 Arachnoid Horror`), and none can ever be banished.
