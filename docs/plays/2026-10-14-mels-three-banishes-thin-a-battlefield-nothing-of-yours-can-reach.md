# Play — Mel's three banishes thin a battlefield nothing of yours can reach

Issue #370 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `mel-defiant-soul-sanction-banish-cycle`**, the Calm/Chaos ENGINE in which
`VEN-110 Mel, Defiant Soul` banishes an enemy unit of 3 Might or less each time she becomes
[Empowered], her own [Empower] costs a discarded spell, and each `VEN-035 Sanction` in mode two
disempowers her now and Empowers her again at end of turn. The entry counts four permanent banishes a
game. Walked as a game, going first, Mel lands on T3 and banishes three times by the end of your T4:
her own [Empower] on T3, then two Sanctions in mode two on T4, one followed by her [Empower] again (a
banish now) and one left to end of turn. All three came off their battlefield, B, and none scored.
Nothing of yours could reach B: your two units stood at G, Mel entered exhausted, and without
[Ganking] a unit on a battlefield moves only to its base (144.4.b). B went from 11 to 6 by the end of
your T4 and was a 14 after their T4: **3 to 3**, the same score with or without the banishes. The
banishes score only if their bodies stay off B. With their T3 bodies at base, two banishes leave the
Diplomat alone there, Mel walks in herself, and it is **4 to 2** after your T4. That Conquer breaks for
the one rune they have left on their T3: 9 cards do it, 3 from hand and 6 hidden at B.

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
| **The bodies** | `OGN-052 Stalwart Poro` (Calm, E2, M2), `OGN-175 Shipyard Skulker` (Chaos, E3, M3) |

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
first Channel Phase of the game."* So going first you have 2, 4, 6 and 8 runes on T1 to T4. Mel's E5
is T3. Her [Empower] costs no rune at all, so the first banish is on the turn she lands. Sanction is
three runes: two exhausted for Energy and a Calm one exhausted and then recycled for the Power, 164.2.b:
*"Recycle this: [Reaction] — Add [C]."* That Power has to be Calm, 164.2.b.1: *"The Power added this
way corresponds to the Domain of the Rune that is being Recycled."* Mel and one Sanction are eight
runes, T4. The walk plays Mel on T3 and two Sanctions on T4, six of its eight runes.

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
  (441.1.c). The walk's T4 uses that to cast two Sanctions in one turn.
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

None of them has [Ganking], and no unit of yours has it either; that decides this walk. 144.4.c.1:
*"Units with Ganking may use their Standard Move to Move from Battlefield to Battlefield."* A buff is a
permanent +1, one per unit, 702.3: *"There can only be one Buff on a Unit at a time."*

## 4. The turns, going first

Calm/Chaos against Fury/Body. Your battlefield is G; theirs is B. Your opening four are Stalwart Poro,
Shipyard Skulker, Mel and Stacked Deck. Your draws are Sanction (T1), a second Stalwart Poro (T2), a
second Skulker and `OGN-171 Mystic Poro` (the T3 draw and the Gloomist's), and a second Sanction and a
second Stacked Deck (the T4 draw and the Gloomist's).

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base.                               0
their T1        Gemhand Hunter (E2) to base. Three runes, one left.
T2      4       The Poro walks to G, Conquer: +1. Shipyard Skulker (E3)   1
                to G. One rune left.
their T2        The Hunter walks to B, Conquer (1 XP). Crackshot
                Corsair (E3) and Demacian Diplomat (E2, 1 XP) straight
                to B: 2 + 3 + 2, a 7. Five runes, none left.
T3      6       Hold G: +1, the Gloomist draws. Mel (E5) to base. Her     2
                [Empower] discards Stacked Deck: the Corsair is
                banished. B is a 4, and nothing of yours can reach it.
                One rune left.
their T3        Hold B: +1 (1 XP). A second Corsair (E3) and Crowd
                Favorite (E3) to B; 2 XP buff the Favorite. B is
                2 + 2 + 3 + 4, an 11. Seven runes, one left.
T4      8       Hold G: +1, the Gloomist draws. Sanction (E3 + 1 Calm     3
                Power), mode two, on Mel. Her [Empower] discards the
                second Stacked Deck: the second Corsair is banished.
                The second Sanction, mode two, on Mel. A second
                Stalwart Poro (E2) to G. Eight runes exhausted, two
                recycled. At end of turn she is Empowered again: the
                Hunter is banished. B is a 6.
their T4        Hold B: +1. Pit Rookie (E2, buffs the Diplomat), Kinkou
                Initiate (E3, draws 1) and a second Diplomat (E2, 1 XP)
                to B: 4 + 3 + 2 + 3 + 2, a 14. Nine runes, two left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T3 it
is **2 to 1**, after your T4 **3 to 2**, and after their T4 **3 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro; 5, then 4 after T2; 6 after the T3
draw and the Gloomist's, 4 after Mel and the discard; 6 after the T4 draws, then 2 after the two
Sanctions, the discard and the second Poro (the second Skulker and Mystic Poro).

**Why bodies go straight to a battlefield.** A unit is played to your base or to
a battlefield you control, 355.2.a: *"By default, Valid locations include the controller’s Base or a
Battlefield the controller controls."* That is why their Corsair and Diplomat go straight to B on their
T2, after the Hunter's Conquer, why their T3 and T4 bodies go there too, and why your second Poro goes
to G on T4.

**Your T2, why the Skulker goes to G.** Beside the Poro it makes G a 6 on defence, 3 + 3 (the Poro's
[Shield] counts on defence). Their T2 cannot attack that: the Hunter is their one ready unit, and two
Pridestalker +1s make it a 4. The price is that the Skulker never reaches B: from G it moves only to
its base (144.4.b). Played to base instead, it could walk to B on T3, but there it is a 3 against the
Hunter and the Diplomat's 4 once the Corsair is banished, and it dies. It would also leave the Poro
alone at G, a 3 that their Hunter kills on their T2 as a 4 for a Conquer, with the Corsair and the
Diplomat played to their base first. On that line the T3 banish takes the Hunter at G, and the Skulker
walks into an empty battlefield for a Conquer: 2 to 1, the point the Hold of G makes here. Going first,
no T3 line gives the first banish a point the Hold would not have made.

**Your T3, the banish.** Mel enters exhausted (143.4) and pays her [Empower] at once with Stacked Deck.
They hold no ready rune (all five went on their T2) and nothing facedown, so they pass. The trigger
chooses the Corsair (a 3 at B) and banishes it, 108.6.b: *"This space is where cards are placed when
they are banished by a spell or effect."* B is now the Hunter and the Diplomat, a 4. Nothing of yours
can attack it. The Poro and the Skulker are at G, and only [Ganking] moves a unit from battlefield to
battlefield (144.4.c.1). Mel cannot move at all, 144.2: *"Exhausting the Unit is the Cost for this
action."* So the banish scores nothing on T3. The 2 to 1 is the Hold of G, and without the banish it
is the same 2 to 1. `OGN-169 Gust` (Chaos, E1, *"Return a unit at a battlefield with 3 :rb_might: or
less to its owner's hand."*) takes the Corsair off B for one rune too. The difference is that a bounced
Corsair comes back for three of their T3 runes, and the banished one does not.

**Their T3, why the bodies go to B.** They Hold B, 315.2.b.2: *"1. The Turn Player Holds all
Battlefields they Control."* Their second Corsair and the Favorite go to B, not to base. At base they
would be out of Mel's reach and could attack G on their T4. At B they are in her reach, but B is the
battlefield she can take: Mel is ready on your T4, and the 4 at B (the Hunter and the Diplomat) is one
banish from a lone 2 that she walks through (§5). At 11, two banishes leave a 6 or a 7. The Favorite's
buff spends 2 of their 3 XP (the Hunter's Conquer, the Diplomat, the Hunter's Hold).

**Your T4, two Sanctions in one turn.** Sanction one, mode two, disempowers Mel. Her [Empower] is legal
again, because the only bar on it was being Empowered. She discards the second Stacked Deck, and the
trigger banishes the second Corsair (a 3) in your Main Phase. Sanction two, mode two, disempowers her
again: the mode needs her Empowered, and the discard made her so. At end of turn the first delayed
Empower finds her disempowered, so she is Empowered and the trigger banishes the Hunter (a 2). The
second finds her Empowered and does nothing (441.1.c). Both Sanctions recycled a Calm rune, so you hold
six runes, not eight, after T4.

**What the T4 banishes bought: no point.** B falls from 11 to 6: the Favorite's 4 and the Diplomat's 2.
Mel is the one unit of yours that could attack it, and she is a 4. Your other three are at G (144.4.b),
the second Poro among them, since it entered there. The walk spends the second Sanction to measure it.
Spent on the second Skulker and Mystic Poro in your base, those five runes would put 5 Might in reach
of B on T5, against the 14 their T4 makes it.

**Their T4, B grows back.** They Hold B: **3 to 3**. Pit Rookie's buff goes to the Diplomat, a 3, since
the Favorite already has one (702.3). The Initiate draws: the Favorite, the Diplomat and the Rookie are
4 + 3 + 2 before Pridestalker. B is 14. They added two bodies on their T3 and three on their T4. Each
banish costs you a Sanction and three runes, and you run three Sanctions (103.2.b). Nothing of theirs
reaches G either: their base is empty, and no unit at B has [Ganking]. `UNL-010 Vault Breaker` (Fury,
E1 + 1 Power, *"Give a unit [Assault 2] and [Ganking] this turn."*) would grant it for a turn. Their
hand in the walk holds none.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **7** cards by
your T3 draw, and **8** with the Gloomist's draw from the Hold of G. With three of each (103.2.b), a Mel
among the first 7 is **45.73%**, and among the first 8 **50.82%**. By your T4 you have seen **10** cards
(four opening, four draws, two Gloomist draws). A Mel among the first 8 and two Sanctions among the
first 10 is **7.02%**. That counts only those cards; the walk also needs a spell to discard on T3 and
another on T4, and a two-drop on T1.

## 5. Breaks to

**The predicate is the walk's result: three banishes off B by the end of your T4, and no point from any
of them.** Undo all three and it is still 3 to 3 after their T4. So two things are priced here: what
stops the banishes, and the line on which they do score, with what stops that.

**Where the banishes score: their T3 bodies at base.** If the second Corsair and the Favorite go to
their base, B on your T4 is the Hunter and the Diplomat, a 4. One Sanction in mode two, then her
[Empower] on the second Stacked Deck, banishes the Hunter. Mel walks to B (144.4.a), 4 against the
Diplomat's 2. She kills it, takes 2 and lives, and you Conquer, 466.5.d: *"Establishing Control results
in a Conquer if that player has not yet scored this Battlefield this turn."* That is **4 to 2** after
your T4, with five runes left. Two banishes open B, and the turn of the first does not matter. With her
[Empower] held from T3, it banishes the Corsair on T4, and one Sanction gives the second, for the same
three runes. On their T4 the pair from base attack with Pit Rookie's buff on the Corsair and three
Pridestalker +1s: 4 + 4 + 3, an 11, and the Corsair's ping. Your sixteen Might of defenders (G's 6,
Mel's 4, and the second Skulker and Poro, 3 each on defence) cannot make both battlefields bigger than
that. They retake one, and it is 4 to 3, a point better for you than the walk. That is why the walk has
them build B.

**The cheapest break of that Conquer is one rune, and they have it.** Seven T3 runes less two three-drops
leave one. The scope: a Fury/Body deck plays only Fury, Body and Fury/Body cards (103.1.b.1). In
`data/cards.json`, folded by name and type with reprints and legends left out, **61** of them print
[Reaction] (on the card, on an ability or by [Ambush] or [Quick-Draw]), [Hidden], or [Action]. Two are
out under 103.2.d.2, *"All of the Signature cards must have the Champion tag that corresponds to the
Champion Legend of the deck."*: `SFD-184 Relentless Pursuit` (Lucian) and `VEN-142 Dominus` (Renekton).
Draven, Vanquisher, the one banned Fury/Body card, has none of the three keywords. That leaves **59**.
Eleven of them cost one rune, and seven can be hidden.

- **One rune, from hand: 3 of the 11.**
  - `UNL-106 Repulse` (Body, E1 + 1 Power): *"Choose a friendly unit at a battlefield. Counter an enemy
    spell or ability that chooses it and no other friendly unit."* The banish chooses the Hunter alone,
    so it is countered. B is a 4 against Mel's 4: her 4 kill both, their 4 kill her, and B is left
    uncontrolled, 466.5.b: *"If there are no Units remaining here controlled by any player, the
    Battlefield becomes Uncontrolled."*
  - `OGN-009 Hextech Ray` (Fury, E1 + 1 Power, [Action]): *"Deal 3 to a unit at a battlefield."* On Mel
    in the combat, the Diplomat's 2 finish her. Her 4 kill the Diplomat, and B is left uncontrolled.
  - `UNL-014 Monster Harpoon` (Fury, E1 + 1 Power, [Action]): *"Deal 2 to a unit at a battlefield. If
    you control a facedown card, deal 4 to it instead."* The 2 and the Diplomat's 2 are Mel's 4.

  The other eight do not. `OGN-004 Cleave`, `SFD-003 Blood Rush` and Vault Breaker give [Assault],
  which counts only while attacking, and theirs defend. `OGN-133 Flurry of Blades` puts 1 on Mel, and
  with the Diplomat's 2 that is 3. `OGN-145 Unyielding Spirit` prevents damage, and a banish is not
  damage. `VEN-015 Decree of Rage` hits only a Calm unit, and Mel is Chaos. `OGN-040 Seal of Rage` and
  `OGN-163 Seal of Strength` carry [Reaction] on an ability, not on the card, and neither is on the
  board.
- **One rune on their T3, hidden at B, played for nothing on your T4: 6 of the 7.** 811.1.b: *"Beginning
  on the next turn, this gains [Reaction] and you may play this, ignoring its base cost."* A hidden unit
  lands at B, 811.1.d.1: *"A hidden permanent must be played to that battlefield."* It joins the combat
  (464.2.c.3.a) with Pridestalker's +1.
  - `OGN-135 Pakaa Cub` (M3, a 4): B is a 6. Her 4 kill the Diplomat and put 2 on the Cub, and their 6
    kill her.
  - `UNL-028 Pyke, Dockside Butcher` (M2, a 3): B is a 5. Mel dies, and Pyke lives with 2 on it.
  - `UNL-003 Mischievous Marai` (M2, a 3): *"When you play me to a battlefield, deal 2 to an enemy unit
    here."* Mel has 2 on her before the combat, B is a 5, and she dies.
  - `SFD-017 Sudden Storm`: *"Deal 2 to a unit at a battlefield. If it's attacking, deal 4 to it
    instead."* It kills Mel.
  - `UNL-013 Lotus Trap`: *"Choose a unit. Double all damage that would be dealt to it this turn."* On
    Mel the Diplomat's 2 are 4. Both die, and B is left uncontrolled.
  - `SFD-111 Here to Help`, with a three-drop in hand (they hold the Initiate), plays it to B for
    nothing. With Pridestalker's +1 it is a 4, and B is a 6.

  The seventh, `SFD-004 Bushwhack`, readies units that enter and makes an exhausted Gold token.

So **9 break it**. By their T3 they have seen **7** cards (four opening, three draws). If they run three
of one of the 9, one is among them in **45.73%**. With two of them (six cards) it is **72.23%**, and with
three (nine cards) **86.76%**. Each is 7 of 39.

**The walk's three banishes, in four windows.** None changes a point through their T4.

- **Your T3: nothing stops the first.** They spent all five runes on their T2, hid nothing (they had no
  battlefield on T1, and no rune on T2), and their runes do not ready until their own turn, 315.1.b:
  *"1. The Turn Player readies all Game Objects they control that are able to be readied."*
- **Their T3 Main Phase: Mel dies at base for two runes, and there is no T4 banish.**
  `OGN-029 Falling Star` (Fury, E2 + 2 Power, two Fury runes): *"Deal 3 to a unit. Deal 3 to a unit."*
  It has no location, so 3 + 3 kill Mel at base. `OGN-128 Challenge` (Body, E2 + 1 Power, *"Choose a
  friendly unit and an enemy unit. They deal damage equal to their Mights to each other."*) does it with
  the buffed Favorite: its 4 kill Mel's 4. `UNL-020 Dancing Grenade` (Fury, E2 + 1 Power): *"Deal 2 to a
  unit. Its controller may play this spell again for :rb_rune_rainbow:. If they do, this deals 1
  additional Bonus Damage for each time this spell has dealt damage this turn."* Two runes pay E2 by
  exhausting both, then the Power by recycling one and the rainbow by recycling the other (164.2.b), so
  the replay needs no third rune. That is 2 + 3 = 5 on Mel. The scope is every Fury, Body and Fury/Body
  card in `data/corpus_flat.txt` that deals damage, kills or banishes without the words *"at a
  battlefield"*. At two runes or less, those three kill a 4 at base. `OGN-033 Shakedown` leaves you the
  draw. Decree of Rage needs a Calm unit. `VEN-083 Rampage`, `SFD-107 Strike Down`,
  `UNL-110 Clash of Giants`, `OGS-008 Gentlemen's Duel` and `VEN-090 Cataclysmic Duel` cost three runes
  or more. Any of the three costs them one of their T3 three-drops.
- **Your T4, one rune ready, from hand.** Each banish is a chain item they can answer with [Reaction],
  309.1.a: *"Only cards and abilities with the Reaction keyword can be played or activated in a Closed
  State."* Repulse counters either one. It is the only one of the eleven one-rune cards that saves a
  target. The other ten deal damage, give [Assault], prevent damage or need a gear on the board, and a
  banish reads only Might and place.
- **Your T4, hidden at B.** Their T3 rune could have hidden a card there instead. A unit that lands
  brings Pridestalker's +1, and that lifts the second Corsair to 4, out of range (359.3.e.4), but not a
  2. Pakaa Cub, Pyke and Marai do that, and so does Here to Help with a unit in hand.

So the Main Phase banish on a 3 has five answers at their one rune, and the end-of-turn one on a 2 has
one, Repulse.

**Their T3: one card takes G, and Mel can never banish it.** G is the Poro and the Skulker, a 3 and a 3
on defence. `UNL-120 Rengar, Trophy Hunter` (Body, E5 + 1 Power, M6, six runes of their seven): *"I can
[Ambush] to a battlefield where there are enemy units (even if you don't have units there)."* Played
there, it applies Contested (190.3.a.1) and is the attacker, 464.2.c.1: *"The Attacker is the player
whose unit(s) applied the Contested status to the Battlefield."* With Pridestalker's +1 it is a 7: both
of yours die, it takes 6 and lives, and they Conquer G. They lead 3 to 2. It also leaves B a 4, so on
your T4 one banish and Mel take B, and it is 3 to 3. The scope is every Fury, Body and Fury/Body card in
`data/corpus_flat.txt` whose text lets it be played to a battlefield that is *"occupied"*, *"where there
are enemy units"* or that they are *"attacking"*. That is five. `SFD-093 Dauntless Vanguard` (M4, a 5
with the +1) dies to G's 6 and kills one of the two. `UNL-117 Arachnoid Horror` needs an enemy unit
alone, and G has two. `OGN-161 Deadbloom Predator` is ten runes. Rengar, Pouncing needs a battlefield
they are attacking, and they have no unit to attack with. The other [Ambush] units (Inferna, Grim
Apothecary, Nidalee, Lord Broadmane, Morgana) need a unit of theirs already there. If they run three
Rengars, one is among their 7 cards in **45.73%**.

## 6. Verdict

**Right that nothing here scores, and wrong that its banish cannot come at instant speed.** Mel's first
banish is free in runes and lands the turn she does: T3, going first. In the walk she banished three
times by the end of your T4, all at B, and none scored. Your units stood at G and could not move to B
without [Ganking]. Their T3 and T4 bodies rebuilt B faster than a Sanction a turn could thin it. The
banishes score only when they open a battlefield for a unit that can still move there. On the line where
their T3 bodies stay at base, two banishes leave a 2 at B, Mel walks in herself, and it is 4 to 2. One
rune breaks that Conquer, nine ways. The entry says the re-fired banish comes only at end of turn. That
is true of mode two alone on an Empowered Mel. Mode two followed by her own [Empower] banishes now, for a
discarded spell. Mode one on a Mel who is not Empowered banishes at once from a [Reaction], in their
combat too.

## 7. Not verified

I did not deal the channel order. The walk assumes six Calm and six Chaos runes, Gloomist's two
domains, in the twelve of Tournament Rules 402.1. Every card before T4 costs Energy only. T4's two
Sanctions need two Calm runes among the eight channelled, and eight of twelve always hold at least two
Calm: **all 495 deals** (0 fail). Their main line costs Energy only.

Their breaks name a Power domain, which the walk does not deal:

- **The one rune they keep on their T3.** They channel seven and spend six on units that cost Energy
  only, so they choose which one stays ready. Repulse needs a Body rune, and Hextech Ray and Monster
  Harpoon a Fury one. Seven of twelve always hold at least one of each, since there are six of each:
  **all 792 deals**. Hiding costs one rune of any domain (811.1.b).
- **Their T3 kill at base.** Falling Star needs two Fury among their seven, and fails only with one:
  **6 of 792 deals, 0.76%**. Challenge needs one Body and Dancing Grenade one Fury: **all 792 deals**.
- **Rengar, Trophy Hunter** needs one Body among their seven: **all 792 deals**.

I did not walk these:

- The mode-one line: Mel played and not Empowered, with a Sanction held for their combat. On this curve
  that is T4 at the earliest (Mel's five runes and Sanction's three).
- Mel at a battlefield, beyond the §5 line on which she walks into B.
- Their T4 on that line beyond its count of Might, your T5 and on, and the third Sanction.
- Going second, the mulligan, and 2v2.
- The order of two delayed "at end of turn" effects. The walk's T4 does not depend on it: the first
  Empowers her, and the second does nothing either way.

Their hand holding no answer, their T3 bodies going to B, and their T3 holding no Rengar, Trophy Hunter
are the walk's assumptions; §5 prices all three. The probabilities in §4 and §5 count only the cards
named.

## Leads

- The notable *"THE RE-FIRED BANISH LANDS AT END OF TURN, NOT AT INSTANT SPEED"* and its *"it does NOT
  answer an attacker mid-combat"* hold only for mode two on a Mel who is already Empowered.
  - Mode one on a Mel who is not Empowered Empowers her at once, from a [Reaction], and her trigger can go
    on the chain on either turn (383.3.c). That is an instant banish, in their combat too.
  - After mode two in your Main Phase, her own [Empower] is legal again. A discarded spell banishes now,
    and the delayed Empower then does nothing (441.1.c). The walk's T4 used that to cast two Sanctions
    in one turn.
  - The same sentence is in `docs/rules-notes/rules-findings.md` (the #159 bullet: *"a [Reaction] enabler
    never makes it instant-speed removal"*).
- Step 1 plays Mel *"at a battlefield"*. Her banish reaches a battlefield from your base, and at base no
  unit can reach her (144.4.a, 144.4.b). The notable *"MEL HAS TO SURVIVE AT 4 MIGHT"* names no place.
  At base it is a question of spells: in Fury/Body, at two runes or less, Falling Star, Challenge (with
  a unit of 4 or more) and Dancing Grenade (played twice) kill her there.
- No step or notable says which turn to cast Sanction on. On your own turn the end-of-turn banish finds
  nothing if their units are at base. On their turn, Sanction resolves into their Main Phase, 312.2.a:
  *"When the turn is in a Neutral Open State during their Main Phase."* They then get the whole Main
  Phase to lift units over 3, and a "this turn" bonus such as Pridestalker's +1 lasts through the
  end-of-turn banish (317.1.a comes before 317.2.c).
- The notable *"NOTHING HERE SCORES"* held in the walk: three banishes and no point. Its *"the points
  come from what the cleared battlefield then allows"* needs a unit that can still move there, and none
  can from another battlefield without [Ganking] (144.4.c.1). In the walk the one unit in your base was
  Mel. On the §5 line where their T3 bodies stay at base, two banishes left a 2 at B, Mel walked in
  herself, and it was 4 to 2.
- No step or notable names an answer. `UNL-106 Repulse` (Body, one rune) counters the banish, which
  chooses one of their units at a battlefield and no other. Against the one Conquer the engine made
  (§5), 9 cards break it at one rune: 3 of the 11 one-rune cards in the 59-card Fury/Body scope, and 6
  of its 7 cards that can be hidden.
- *"THE TARGET RESTRICTION IS THE REAL CEILING"*, measured: of the five cards in §5 that can be played
  onto an occupied battlefield, the one that takes G on their T3, `UNL-120 Rengar, Trophy Hunter`, is a
  6 and can never be banished. And a buff is permanent (702.3): the Favorite's own makes it a 4, out of
  range for good.
