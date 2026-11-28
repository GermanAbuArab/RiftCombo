# Play — The second Bonds is the +1 Jae lives on, and Falling Star kills him the turn before

Issue #373 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `jae-medarda-repeat-double-choose`**, the Order/Chaos ENGINE in which `SFD-151 Bonds of
Strength` with its [Repeat] paid chooses `SFD-142 Jae Medarda` in both executions, so one card draws
two. The entry is right about the two draws, and they resolve before anything else on the chain. In a
game the draws were the half that did not decide anything. The +1 Mights did. On T4 Jae walked into a
6 at B, and the two +1s made him a 7: he killed both defenders, took 6 and lived, and Conquered. That is
**4 to 2**. With the [Repeat] not paid, he is a 6 against 6: all three die, B is left empty, and it is
3 to 2 with one card drawn and no Jae. The cheapest answer comes a turn earlier. Going first, Jae lands
on T3 with one rune left, and on their T3 `OGN-029 Falling Star` deals 3 and 3 to him in your base for
two runes, before he draws once. Over Fury/Mind it is the cheapest single card that kills a 5 in a
base. The only other one at six runes or less is `OGN-105 Singularity`, at all six of theirs, and it
takes a second unit with him.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `eacc689`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 25 of them with no play**. The
queue is the one the issue measured. This entry is rank 77, second in the list. The other entry of this
slice is rank 76, `frozen-fortress-soul-shepherd-asymmetric-sweep`, played in
[The Fortress killed nothing: their Recruits stayed off it until Darius stood there](2026-10-14-the-fortress-killed-nothing-their-recruits-stayed-off-it-until-darius-stood-there.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `VEN-155 Heart of the Tempest` (Order/Chaos, tags Yordle, Kennen) |
| **Chosen Champion** | `VEN-113 Kennen, Storm of Shuriken` (Chaos, E3 + 1 Power, M4) |
| **The pair** | `SFD-142 Jae Medarda` (Chaos, E5 + 2 Power, M5), `SFD-151 Bonds of Strength` (Order spell, E2, [Reaction], [Repeat] E2) |
| **The bodies** | `OGN-210 Daring Poro` (Order, E2, M2), `OGN-175 Shipyard Skulker` (Chaos, E3, M3) |

Heart of the Tempest is the only Order/Chaos legend: of the 94 legend base codes in `data/cards.json`,
only `VEN-155` and its reprint `VEN-197` carry both domains. Its Chosen Champion must share its
champion tag, 103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your
Champion Legend."* Both Kennen units do; Storm of Shuriken is the one here. It starts in the Champion
Zone, 103.2.a.1: *"This will be placed in the Champion Zone at the start of the game."* It stays there
for the whole walk, so the legend is never Empowered (§7).

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* None is a Signature card (`signature` in `data/cards.json`), and none is in
`data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Jae Medarda: *"When you choose me with a spell, draw 1."*
- Bonds of Strength: *"[Reaction] (Play any time, even before spells and abilities resolve.) [Repeat]
  :rb_energy_2: (You may pay the additional cost to repeat this spell's effect.) Give two friendly units
  each +1 :rb_might: this turn."*
- Daring Poro: *"[Assault] (+1 :rb_might: while I'm an attacker.)"* Shipyard Skulker: no text.

## 2. What one Bonds with its [Repeat] buys

**Both executions choose when you cast it.** 820.2: *"When a spell or ability’s effect is performed an
additional time with Repeat, choices must be made at the usual time during the Make Relevant Choices
step of Playing a Card."* The second set may repeat the first, 820.2.a: *"Choices made for the
additional execution do not have to be the same as the choices made for the initial execution."* So
Jae is chosen in each, with another friendly unit beside him each time.

**Each choice is a target, and each target is a draw.** 355.7: *"When a card Chooses one or more
specific Game Objects to affect, it is Targeted unless indicated otherwise by the rules in this
section."* 383.4.b.3: *"Although these abilities say “choose” in their Condition, they trigger
specifically when an appropriate Game Object is Targeted."* The rules count one spell choosing one
object more than once elsewhere, 809.1.c: *"Spells and abilities an opponent controls that target
[me/this] cost an amount of Power equal to [Deflect Value] more to play as an additional cost for each
time they choose [me/this]."* The walk reads Jae's trigger the same way: twice. No paragraph says so in
those words (§7, Leads).

**The draws come before anything else.** 383.4.b.2: *"These Triggered Abilities are put on the Chain
as Pending Items after a spell or ability that targets an appropriate Game Object is Finalized."* They
sit above Bonds, and 340.1 resolves the top: *"The newest Finalized Chain Item resolves."* A response
goes above them and resolves first, but nothing in this walk removes the triggers.

**The +1s are the part that fights.** 143.2.a: *"If a Unit ever has nonzero damage marked on it
equalling or exceeding its Might, it is Killed."* Jae is a 5. Against a 6 he dies. As a 6 he still
dies, and as a 7 he lives. That is the whole difference the [Repeat] makes in §4.

**The price, and when it can be held up.** Bonds and its [Repeat] are 4 Energy: four runes, no Power.
Jae is E5 + 2 Chaos Power: five runes exhausted, two Chaos among them recycled, 164.2.b: *"Recycle
this: [Reaction] — Add [C]."* 164.2.b.1: *"The Power added this way corresponds to the Domain of the
Rune that is being Recycled."* A recycled rune leaves the board, 416.1.b: *"Runes are Recycled to the
Rune Deck."* Going first you channel 2 a turn, 315.3.b: *"1. The Turn Player channels 2 runes from
their Rune Deck."* So you have 2, 4, 6 and 8 runes channelled on T1 to T4. Jae on T3 leaves one rune
ready and four on the board. To land Jae with four runes ready for Bonds in the same turn you need nine
on the board, which going first is T5 at the earliest.

## 3. Their deck: Fury/Mind, Daughter of the Void

`OGN-247 Daughter of the Void` (Fury/Mind): *":rb_exhaust:: [Reaction] — [Add] :rb_rune_rainbow:. Use
only to play spells. (Abilities that add resources can't be reacted to.)"* Its Chosen Champion is
`OGN-112 Kai'Sa, Evolutionary` (Mind, E6 + 1 Power, M6): *"[Ganking] (I can move from battlefield to
battlefield.) When I conquer, you may play a spell from your trash with Energy cost less than your
points without paying its Energy cost. Then recycle it. (You must still pay its Power cost.)"* They play
`OGN-010 Legion Rearguard` (Fury, E2, M2, [Accelerate]), `VEN-057 Covert Informant` (Mind, E3 + 1
Power, M4; its [Empower] is never used) and `OGN-103 Ravenbloom Student` (Mind, E2, M2: *"When you play
a spell, give me +1 :rb_might: this turn."*). §5 names their answers. Their hand holding none of them is
the walk's assumption.

## 4. The turns, going first

Order/Chaos against Fury/Mind. Your battlefield is G; theirs is B. Your opening four are Daring Poro,
Shipyard Skulker, Jae Medarda and Bonds of Strength. Your draws are a second Daring Poro (T1), a second
Jae (T2), a second Skulker (T3) and a third Daring Poro (T4). Jae's two draws on T4 are a second Bonds
and a third Skulker.

```
turn    runes   your turn                                                 points
T1      2       Daring Poro (E2) to base.                                 0
their T1        Legion Rearguard (E2) to base. Three runes, one left.
T2      4       The Poro walks to G, Conquer: +1. Shipyard Skulker (E3)   1
                to G. One rune left.
their T2        The Rearguard walks to B, Conquer. Covert Informant
                (E3 + 1 Mind Power) to B, Ravenbloom Student (E2) to
                base. Five runes, none left, one recycled: four on
                the board.
T3      6       Hold G: +1. Jae Medarda (E5 + 2 Chaos Power) to base.     2
                Five runes exhausted, two recycled: four on the
                board, one ready.
their T3        Hold B. Kai'Sa, Evolutionary from the Champion Zone
                (E6 + 1 Mind Power) to base. Six runes, none left, one
                recycled: five on the board.
T4      6       Hold G: +1. Jae walks to B: 5 against the Rearguard's 2   4
                and the Informant's 4. Bonds of Strength (E2) with its
                Repeat (E2): Jae and the Poro, twice. Jae draws 2 and
                is a 7. His 7 kill both; their 6 do not kill him.
                Conquer B. Second Daring Poro (E2) to B. None left.
their T4        Kai'Sa walks to G: 6 against the Poro's 2 and the
                Skulker's 3. Both die. Conquer G. A second Covert
                Informant (E3 + 1 Mind Power) to G. Seven runes, four
                left, one recycled.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T4 it
is **4 to 2**; after their T4, **4 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro; 5, then 4 after T2; 5 after the T3
draw, 4 after Jae; 5 after the T4 draw, 4 after Bonds, 6 after Jae's two draws, 5 after the second
Poro (the second Jae, the second and third Skulker, the third Poro and the second Bonds). Your runes on
the board: 2, 4, 4 after T3, 6 on T4.

**Your T2, why the Skulker goes to G.** A unit is played to your base or to a battlefield you control,
355.2.a: *"By default, Valid locations include the controller’s Base or a Battlefield the controller
controls."* At G it makes a 5 with the Poro. Their only ready unit on their T2 is the Rearguard, a 2,
their Chosen Champion costs six runes, and nothing in the hand this walk deals them enters ready. So
nothing of theirs can take G that turn.

**Their T2.** B is empty, so the Rearguard takes it with no combat, 316.8.b.1: *"Showdowns that occur
as a result of a player moving to an empty Battlefield are a stand-alone Phase and do not create a
Combat."* The Informant goes straight to B, which they now control (355.2.a), and B is a 6. From their
side that is enough. The only unit of yours that can reach B is one in your base, 144.4.a: *"Units may
move from their Base to a Battlefield."* From G a unit moves only home, 144.4.b: *"Units may move from a
Battlefield to their Base."* Neither the Poro nor the Skulker has [Ganking].

**Your T3.** Jae enters exhausted, 143.4: *"Units enter the Board exhausted."* You have one rune ready
for their T3 and nothing in hand that costs one.

**Their T3, why Kai'Sa goes to base.** They Hold B, 315.2.b.2: *"1. The Turn Player Holds all
Battlefields they Control."* Kai'Sa comes from the Champion Zone, 419.1.a: *"By default, a player can
only Play cards from their hand or their Chosen Champion zone."* From base she reaches either
battlefield on their T4 (144.4.a). They do not see Bonds. From their side B is a 6 against a 5, the one
unit of yours that can reach it. Played to B instead, Kai'Sa makes B a 12 and Jae never attacks it.
That is the better line for them, and it is priced below.

**Your T4, the order on the chain.** Your runes are ready again, 315.1.b: *"1. The Turn Player readies
all Game Objects they control that are able to be readied."* Jae walks from base to B and exhausts,
144.2: *"Exhausting the Unit is the Cost for this action."* B has defenders, so this is a combat, and you
have Focus, 464.2.c.1.a: *"If a showdown opens as part of combat, this player gains Focus as the
showdown begins."* You cast Bonds and pay the [Repeat]. Execution one chooses Jae and the Poro at G;
execution two chooses Jae and the Poro again. "Two friendly units" has to be two different units, so
Jae always needs a partner. The Poro is not in the combat, and it does not need to be. The two
triggers resolve first: Jae draws 2. Then Bonds resolves, and Jae is a 7. They have no rune ready and
pass.

Combat follows, 465.1: *"If both Attacking and Defending units remain at this battlefield, the
following Tasks become Outstanding, in the specified order:"* Jae assigns his 7 in order, 465.2.c.3:
*"Units must have lethal damage assigned to them in full before damage is assigned to a different
Unit."* That is 2 to the Rearguard, then 4 to the Informant, and the last 1 also goes on the Informant.
Both die. Their 6 are less than his 7, and he lives. You won, 466.3.a: *"A Player has won a combat if
they received either the attacker or defender designation and are the only Player that has units
remaining at this battlefield during this step."* You Conquer B, 469.1: *"Conquer: A player gains
Control of a Battlefield they did not yet Score this turn."* The second Poro goes to B, which you now
control. With it B is a 7 on their turn. His damage heals in the combat cleanup, 466.1.a.1: *"Insert
“3c. Heal all Units.”"*

**What the [Repeat] bought.** Four lines from the same hand and the same six runes:

- *The walk*: 4 to 2. Jae alive at B, two cards drawn, both defenders dead.
- *Bonds with no [Repeat]* (two runes): Jae draws 1 and is a 6. His 6 kill both defenders, and their 6
  kill him. Nobody remains, 466.5.b: *"If there are no Units remaining here controlled by any player, the
  Battlefield becomes Uncontrolled."* No Conquer: **3 to 2**, one card, no Jae. Of the other four runes,
  two go on the second Poro.
- *No Bonds*: Jae is a 5 against 6. He dies, his 5 kill the Rearguard and leave 3 damage on the
  Informant, and they keep B: 3 to 2, no card.
- *No attack*: Hold G, 3 to 2, Jae in base, and Bonds held for their turn. It can be cast there only in
  answer to something, 312.2.c: *"When the turn is in a Closed State, all pending chain items finish
  being finalized, and they control the next item on the Chain."* Any card they play opens a chain.

So the second execution is worth one point, two dead defenders and Jae himself. The second card it
draws is the least of what it bought. The four Mights spread over "two friendly units" each time look
like a tax. Two of them went on the Poro at G and did nothing. The two that went on Jae made the line.

**Their T4.** They control nothing, so they Hold nothing. Kai'Sa walks into G: her 6 kill the Poro (2)
and the Skulker (3), and your 5 do not kill her. Conquer G: **4 to 3**. Her trigger finds no spell in
their trash. Attacking B instead, Kai'Sa and the Student are an 8 against 7. They kill Jae and the Poro,
but your 7 kill Kai'Sa, and the Student takes B: 4 to 3 again, without their Chosen Champion. If you
hold the two runes with the second Bonds and play no Poro, it is still 4 to 3. They attack G with
both. Bonds makes the Poro and the Skulker a 3 and a 4 (or Jae and the Skulker, for a card), their 8
still kill both, and your 7 kill Kai'Sa.

**If Kai'Sa had gone to B.** B is a 12, and Jae stays home on T4. Hold G: 3 to 2. You hold four runes
for Bonds and play the second Poro to G, which makes G a 7. On their T4 they Hold B, 3 to 3. Kai'Sa can
gank from B to G (144.4.c.1: *"Units with Ganking may use their Standard Move to Move from Battlefield
to Battlefield."*), but she is a 6 against 7. With the Student walking in from base beside her, as one
move (144.3: *"Players may perform multiple Units' standard move simultaneously. This is treated as one
game action performed on multiple Units."*), it is 8 against 7. Then Bonds with its [Repeat] on Jae and
the Skulker makes G a 9: both of theirs die, and you keep G. Unattacked, Bonds is cast in answer to the
first card they play: two cards, and the four Mights land on bodies that are not fighting. **3 to 3**,
with Jae alive. That is the line where the engine is only a draw engine.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Going first you
have seen **7** cards by T3 and **8** by T4. With three of each (103.2.b: *"Your Main Deck can include
up to 3 copies of the same named card."*), a Jae among the 7 and a Bonds among the 8 is **21.71%**,
counted by enumerating the six copies' positions. Both among the 7 is **19.23%**; both among the 8,
**24.20%**. That counts only those two cards, not the second body Bonds needs.

## 5. Breaks to

**The predicate.** The walk's result is 4 to 2 after your T4, with Jae alive and two cards drawn. A
break is a card that stops your T4 Conquer of B, or kills Jae before it. Their scope is the Fury/Mind
deck of a Kai'Sa legend. It plays only Fury, Mind and Fury/Mind cards (103.1.b.1), and its Signature
cards must carry the Kai'Sa tag, 103.2.d.2: *"All of the Signature cards must have the Champion tag
that corresponds to the Champion Legend of the deck."* Counted on `data/cards.json`, folded by name and
type (no legends, battlefields, runes or tokens): 69 cards in those domains print [Action],
[Reaction], [Hidden] or [Ambush]. One is another champion's Signature card (`SFD-182 Danger Zone`,
Rumble), which leaves **68**. None is banned. By the runes they cost (the larger of the Energy and the
Power), 14 cost one rune and 22 cost two. The legend's rainbow pays one Power of a spell, so on these
cards the Energy is what limits them.

**Their T3, two runes: Jae dies in your base before he draws.** You have one rune ready and nothing in
the walk's hand to cast with it. Over the whole identity, four Order, Chaos or Order/Chaos cards that
can be played on their turn cost one rune (not banned, with [Reaction], [Hidden] or [Ambush]): `OGN-169
Gust`, which reaches only a unit at a battlefield; `OGN-204 Seal of Discord` and `OGN-245 Seal of Unity`,
gear; and `UNL-173 Sacrifice`: *"As an additional cost to play this, kill a friendly [Mighty] unit. (A
unit is Mighty while it has 5+ :rb_might:.) Draw 2 and channel 1 rune exhausted."* None keeps Jae
alive. Sacrifice turns him into two cards before Falling Star lands. At two runes, `VEN-126 Ki Barrier`
(*"Prevent the next 7 damage that would be dealt to it this turn."*) saves him, and choosing him draws
a card. On their own turn any card is playable, so this window is swept over every Fury/Mind
card, not only the 68. The predicate is: one card, six runes or less, that kills a 5-Might unit in its
controller's base. A location clause (*"at a battlefield"*, *"here"*) rules a card out, and so does a
Might reduction alone, since 143.2.a kills on damage. **Two cards do it**:

- `OGN-029 Falling Star` (Fury, E2 + 2 Power): *"Deal 3 to a unit. Deal 3 to a unit."* That is two
  runes exhausted, the legend's rainbow and one Fury recycled. It is the cheapest.
- `OGN-105 Singularity` (Mind, E6 + 2 Power): *"Deal 6 to each of up to two units."* That is all six of
  their runes exhausted, the legend's rainbow and one Mind recycled. It kills Jae and one of your units
  at G, the Skulker or the Poro, so it does more than Falling Star. It is not cheaper.

The rest fall short:

- `OGN-248 Icathian Rain` (their Kai'Sa Signature card, 12 damage) costs seven runes, and they have six.
- `OGN-033 Shakedown` deals 6 *"unless its controller has you draw 2"*. You choose, and you let them
  draw.
- `SFD-077 Rocket Barrage` deals 4 to a unit in a base, `UNL-073 Deadly Flourish` 3, and `UNL-182
  Curtain Call` 3 in its base mode. None kills a 5. Rocket Barrage's [Repeat] makes it eight runes.
- `UNL-020 Dancing Grenade` deals 2: *"Deal 2 to a unit. Its controller may play this spell again for
  :rb_rune_rainbow:."* "Its controller" is the controller of the unit it hit, the same pronoun as
  355.10's example: *"e.g., “Kill a unit. Its controller draws 2” targets the unit, but not its
  controller."* That is how `gemdragon-henge-vi-blind-fury` reads the card too (*"'Its CONTROLLER' is
  you, which is what makes replaying it off your own bodies legal"*). Aimed at Jae, the replay is yours,
  and you decline it. The Mel play of #370 counted the replay as the caster's.
- `UNL-023 Katarina, Reckless`, `UNL-026 Xerath, Freed`, `VEN-017 Morgana, Vindictive` and `UNL-067
  Ruined Rex` all need something else first: a card from face down, a battlefield and a ready Xerath,
  damage already marked, or a death.

Two cards do it from three runes up:

- Three runes: `OGN-093 Smoke Screen` (*"Give a unit -4 :rb_might: this turn, to a minimum of 1
  :rb_might:."*) makes Jae a 1, and `SFD-080 Bellows Breath` (*"Deal 1 to up to three units at the
  same location."*) kills him. A base is a location, and the card has no battlefield clause. That is
  E3, three runes exhausted, and two Power: the legend's rainbow for one spell and a recycled Mind for
  the other. It is the only pair at three runes, and no pair does it at two. The Fury/Mind cards at two
  runes or less that deal damage outside a battlefield are Bellows Breath (1, or 2 with its [Repeat] at
  two runes), Dancing Grenade (2) and Falling Star; Shakedown's 6 is yours to refuse. The ones that cut
  Might are Stupefy and `OGN-090 Orb of Regret` (-1), Mesmerize, Frigid Touch and Blastcone Fae (-2) and
  Smoke Screen (-4); `VEN-061 Decree of Insight`'s -5 reaches only a Body unit, and Jae is Chaos. Only
  Smoke Screen brings Jae within reach of a one-rune damage card.
- Four runes: `OGN-093 Smoke Screen` (-4) and Dancing Grenade's 2.
- Five runes: `UNL-063 Eclipse` (-4) and the Grenade. Or Rocket Barrage with `OGN-095 Stupefy` (-1) or
  `VEN-052 Mesmerize` (-2). Or Deadly Flourish or Curtain Call with Mesmerize.
- Six runes: Rocket Barrage, Deadly Flourish or Curtain Call with `SFD-066 Frigid Touch`, Smoke Screen
  or `OGN-097 Blastcone Fae`. Or the Grenade with Rocket Barrage, Deadly Flourish, Curtain Call or a
  Frigid Touch with its [Repeat].

Each of them, Falling Star included, costs Kai'Sa: she needs all six of their runes. With Jae dead your
T4 is the Hold of G, **3 to 2**, and nothing reaches B. Kept for their T4, Falling Star meets Jae with
four runes up if you hold them: Bonds with its [Repeat] makes him a 7, and 3 + 3 do not kill a 7.

**Your T4, a card hidden at B: the T4 Conquer for one recycled rune, even beside Kai'Sa.** They control
B, which is what hiding needs, 811.1.b: *"While this card is in your hand or in your Champion Zone on
your turn during an Open State, you may pay [A] to hide this facedown at a battlefield you control that
doesn't already have a facedown card hidden there for as long as you control that battlefield.
Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base cost."* [A]
is a Power, paid by recycling a rune (164.2.b), and recycling needs no ready rune. So they can cast
Kai'Sa with all six and still hide a card, ending on four runes. Played from facedown it costs nothing
and has [Reaction], 811.6: *"A card that is Hidden gains Reaction while facedown or played from
facedown, and may be played any time a card with Reaction may be played as a result."* A unit they put
there joins the fight, 811.1.d.1: *"A hidden permanent must be played to that battlefield."* And
464.2.c.3.a: *"If a Unit controlled by the Attacker or Defender becomes present at this Battlefield
after this moment, it will gain the Attacker or Defender designation during the Cleanup phase following
the action that caused it to become present, as appropriate for its controller."* The predicate is the
same, narrowed to the 13 of the 68 with [Hidden]. **Nine break it alone**, against your 7 and their 6:

- `UNL-013 Lotus Trap` doubles the damage to Jae: 12. `SFD-017 Sudden Storm` deals 4 to an attacking
  unit and `SFD-070 Wages of Pain` deals 3: 10 and 9.
- `UNL-003 Mischievous Marai` deals 2 to Jae and adds a 2. `OGN-097 Blastcone Fae` makes him a 5 and
  adds a 2. `OGN-121 Teemo, Strategist` and `UNL-028 Pyke, Dockside Butcher` each add 2, so 8 hit him.
  `UNL-081 Keeper of Masks` adds three 1s, and `OGN-094 Sprite Call` a 3 (its token is played, and
  355.2.a lets it enter at B), so 9 hit him. Each time he dies, and his 7 leave one of theirs alive.

The other four do not. `OGN-083 Consult the Past` draws, `SFD-004 Bushwhack` readies units that are
not coming, and `UNL-083 Smoke and Mirrors` needs a [Temporary] unit. `VEN-066 Temporal Breach`
banishes Jae and has you play him again at B, a new object without the +2. But a card played from
anywhere other than your hand empowers Heart of the Tempest, by its own text: *"When you play a card
from anywhere other than your hand, empower me. [Action][>] Disempower me, :rb_exhaust:: Give a unit
[Assault 2] this turn."* An [Action] ability can be used in a showdown, 806.1.c.2: *"On Activated
Abilities: "This can be activated during showdowns on any player's turn.""* Jae attacks as a 7 again and
Conquers. In each of the nine, Jae's two draws still resolve: the triggers were on the chain before the
answer was.

**Your T4, from hand: one rune kept on their T3 instead of Kai'Sa.** If they skip their champion, they
can leave runes up. While Bonds and Jae's triggers are on the chain, only a [Reaction] card is played,
309.1.a: *"Only cards and abilities with the Reaction keyword can be played or activated in a Closed
State."* An [Action] card waits for the open state after the chain resolves, 346: *"When the last item
on the chain resolves and the turn returns to an Open State during a Showdown, Focus passes, and the
next Player gains both Focus and Priority."* **Six of the fourteen one-rune cards break it:**

- `OGN-095 Stupefy` (*"Give a unit -1 :rb_might: this turn, to a minimum of 1 :rb_might:. Draw 1."*):
  Jae is a 6 against 6. All three die, and B is left empty. They draw a card.
- `VEN-052 Mesmerize`, mode two: Jae is a 5. He dies, and the Informant lives with 3 damage.
- `SFD-064 Cloth Armor` (*"[Quick-Draw] (This has [Reaction]. When you play it, attach it to a unit you
  control.)"*, [Shield 2]) makes the Informant a 6: 8 against 7.
- `OGN-009 Hextech Ray` (3), `UNL-014 Monster Harpoon` (2) and `SFD-080 Bellows Breath` (1), all
  [Action]: the damage plus their 6 reach 7. Jae dies, and his 7 still kill both, so B is left empty.

The other eight do not. `OGN-004 Cleave`, `SFD-003 Blood Rush` and `UNL-010 Vault Breaker` give
[Assault], which counts only for an attacker. `VEN-015 Decree of Rage` needs a Calm unit and `VEN-061
Decree of Insight` a Body unit, and Jae is Chaos. `OGN-104 Retreat` returns one of their own: the other
is alone against a 7. `OGN-040 Seal of Rage` and `OGN-120 Seal of Insight` are gear with their
[Reaction] on an ability they would already need on the board.

**Two runes kept: eleven of the twenty-two more.**

- `SFD-066 Frigid Touch` (-2) and `OGN-093 Smoke Screen` (-4, to 1) shrink Jae. Each time he dies and
  one of theirs lives.
- `OGN-108 Convergent Mutation` makes the Rearguard a 4, `SFD-001 Against the Odds` gives the Informant
  +2 for the one enemy unit there, and `SFD-022 Long Sword` (Quick-Draw, +2) does the same. Each time
  it is 8 against 7.
- `UNL-002 Inferna` comes in with [Ambush] as a 1: 7 against 7, and all four die.
- `OGS-003 Incinerate` (2), `UNL-007 Smite` (3), `VEN-010 Consuming Curse` (2 or more) and `UNL-013
  Lotus Trap` all damage Jae, and he dies. So does `OGN-008 Get Excited!`, as long as they have another
  card to discard.

The other eleven do not. `OGN-033 Shakedown` lets you choose: they draw 2, and the Conquer stands.
`SFD-011 Angle Shot` needs an Equipment, `UNL-061 Downstage Dramatics` draws, `UNL-085 Sumpworks Map`
draws them a card when you score, and `UNL-083 Smoke and Mirrors` needs a [Temporary] unit. `SFD-004
Bushwhack`, `VEN-066 Temporal Breach`, `OGN-097 Blastcone Fae`, `OGN-121 Teemo`, `UNL-003 Mischievous
Marai` and `UNL-081 Keeper of Masks` have no [Action] or [Reaction] from hand. 308.1.a: *"Only cards and
abilities with the Action or Reaction keywords can be played or activated in a Showdown State."*

**The cheapest answer.** To the engine, Falling Star on their T3, two runes: Jae dies before he draws,
and it is the cheapest Fury/Mind card that does that. `OGN-105 Singularity` does it too, for all six of
their runes, and kills a second unit. To the T4 result, a
hidden card at B: one rune recycled on their T3 and nothing on your T4. It sits beside Kai'Sa, and nine
of the thirteen hideable cards stop the Conquer. If they spend no rune elsewhere, six one-rune cards
held up do the same. `OGN-095 Stupefy` is the plainest of them, the card the sibling entry
`jae-medarda-choose-draw` uses to feed Jae, here aimed at him by the other side.

**How likely an answer is.** Out of their own **39**, by their T3 they have seen **7** cards: four
opening and a draw on each of their three turns. One answer in three copies is among them in
**45.73%**; two (six cards), **72.23%**; three (nine cards), **86.76%**. Falling Star alone is the
first figure. These count only the cards named, not how many of them a deck runs.

## 6. Verdict

**Right about the two draws; wrong about which half pays.** One Bonds with its [Repeat] chooses Jae
twice, and both draws resolve before the spell, as the entry says. In the walk the draws decided
nothing. The two +1s on Jae did: a 5 against a 6 became a 7 that killed both defenders and lived, and
the Conquer is the one point the engine scored. Without the [Repeat] it is 6 against 6, B empty, and
no Jae. The entry's moment of your choosing is mostly theirs. Going first, Jae lands with one rune
spare, and the turn after, Falling Star kills him in your base for two runes. No Order/Chaos card at
one rune keeps him alive (Sacrifice turns him into two cards), and Ki Barrier needs two. Bonds itself
holds him against Falling Star only from the turn you can leave four runes up beside him.

## 7. Not verified

I did not deal the channel order. The walk assumes six Order and six Chaos runes, Heart of the
Tempest's two domains, in the twelve of Tournament Rules 402.1. Jae on T3 needs two Chaos among your
first six runes. It fails in **37 of 924 deals, 4.00%**. Nothing else of yours costs Power.

Their walk assumes six Fury and six Mind. The Informant on their T2 needs a Mind among five runes. It
fails in **6 of 792 deals, 0.76%**. Kai'Sa on their T3 needs a second Mind among seven: **6 of 792,
0.76%**. One or the other fails in **12 of 924 orderings, 1.30%**. The second Informant on their T4
needs a third Mind among nine, which every deal has. Falling Star on their T3 needs one Fury on their
board beside the legend's rainbow, and every deal has one, since six Mind cannot fill seven runes.
Singularity on their T3, and the Smoke Screen and Bellows Breath pair, each need a Mind recycled beside
the rainbow, so a second Mind among seven after the T2 recycle: each fails in **6 of 792 deals,
0.76%**, as Kai'Sa does. Long
Sword is gear, so the legend's rainbow does not pay it, and its Fury comes off a recycled Fury rune:
every deal of seven has one. Hiding costs [A], any rune.

Two readings carry the walk. First, that choosing Jae in both executions fires his trigger twice.
820.2, 383.4.b.3 and 809.1.c point that way, but no paragraph says it in so many words. Read once, the
T4 is the same 4 to 2 with one card drawn. Second, that Dancing Grenade's replay belongs to the
controller of the unit it hit (§5).

Kennen is never played. From the Champion Zone he would empower the legend, whose [Assault 2] makes Jae
a 7 attacking B without Bonds. He costs E3 + 1 Chaos: on T2 he replaces the Skulker, and the rune he
recycles leaves exactly five on the board for Jae on T3. That line is not walked. Neither are: past
their T4, going second, the mulligan, `SFD-034 Feral Strength`'s Calm/Chaos version of the line, or 2v2.
Their hand holding no answer is the walk's assumption, and §5 prices it. The probabilities count only
the cards named.

## Leads

- The notable *"EXACTLY TWO CARDS IN HIS PARTNER LIST CAN DO IT"* is one short on its own scope.
  `npm run synergies` prints `jae-medarda-chosen-by-spell` with 34 partners. Three of them are [Repeat]
  spells that choose a friendly unit: `SFD-151 Bonds of Strength`, `SFD-034 Feral Strength`, and `SFD-114
  Marching Orders` (Body), which the catalogue's own `jae-medarda-marching-orders-repeat-two-draws` uses
  for exactly this. Inside Order/Chaos, Bonds is the only one. The corpus has five Order, Chaos or
  Order/Chaos [Repeat] spells, and the other four cannot choose Jae: `SFD-122 Called Shot` (banned, no
  choice), `SFD-129 Temptation` and `UNL-134 Existential Dread` (an enemy unit), and `SFD-136 Hard
  Bargain` (a spell). From outside that list, `UNL-146 Syndra, Transcendent` (Chaos unit) grants one:
  *"While I'm in a showdown, your spells have [Repeat] :rb_energy_2::rb_rune_chaos:. (You may pay the additional cost to repeat the
  spell's effect.)"*
- The Stupefy comparison crosses identities. `OGN-095 Stupefy` is Mind, and an Order/Chaos deck cannot
  run it. The two-draws-per-copy card inside the identity is `VEN-116 Dragon Form` ([Flow] :rb_energy_3:),
  as `jae-medarda-dragon-form-flow-double-draw` has it. That is E3 and E3 over two casts, against Bonds'
  E2 + E2 in one.
- *"203.3 makes it uncastable"*: 203.3 is about Costs (*"If the game action associated with a Cost is
  impossible for any reason such that a player cannot perform it, then they cannot pay the Cost and
  they will not execute the linked Effect."*). The choice rule is 355.8: *"In order to put a spell or
  ability on the chain, valid choices must be made for all targets."* That "two friendly units" means
  two different units is the plain reading. No paragraph says it.
- *"Depends on no unruled reading"* does not hold. `docs/rules-notes/rules-findings.md` (the #187
  bullet) records that a [Repeat] spell is *"ONE play and TWO choice-sets and any payoff distinguishing
  them has no paragraph"*. A trigger on being chosen is such a payoff. 820.2 and 809.1.c support two
  draws, which the walk uses (§7).
- The notable *"(a) Jae has to be on the board and alive: he is M5 with no protection"* names no
  card. The cheapest answer is `OGN-029 Falling Star` (Fury, E2 + 2 Power) in your base on the turn
  after he lands; `OGN-105 Singularity` does the same for six runes. Going first you cannot leave
  four runes up beside a freshly played Jae before T5 (§2). With four up, Bonds with its [Repeat] makes
  him a 7, and Falling Star's 6 do not kill him.
- Step 1's *"nothing in this line asks him to move"* and step 5's *"a moment you chose"* leave out
  where the line paid. In the walk Jae moved, and the +2 on him was the difference between 7 and 6
  against a 6: one point, two dead defenders and his own life. With the [Repeat] not paid, B is left
  empty and Jae dies.
