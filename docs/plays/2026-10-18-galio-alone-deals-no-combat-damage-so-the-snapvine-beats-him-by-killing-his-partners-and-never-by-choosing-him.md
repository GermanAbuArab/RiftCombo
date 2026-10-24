# Play — Galio alone deals no combat damage, so the Snapvine beats him by killing his partners and never by choosing him

Issue #397 (a slice of #200), 2026-10-18. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `carnivorous-snapvine-rampage-tank-bypass`**, the Body ENGINE in which `OGN-149 Carnivorous
Snapvine` lands and trades damage with an enemy unit at a battlefield, and `VEN-083 Rampage` pumps a
friendly body by 2 and does the same again. The entry is right about the rule it stands on: the damage
is dealt by the two units, not by the card (417.6.b.3), so it is never assigned in a combat damage step
and a [Tank] orders none of it. It is also right that this matters against `UNL-171 Galio,
Indefatigable`, the Order Tank whose Might is a toll, but not in the way it says. Galio's *"I don't
deal combat damage."* is about combat damage, so in an exchange he deals his full 6: the Snapvine's 6
against Galio's 6 kills both, and choosing him costs a third Power for his [Deflect]. Walked as a game,
going first, against a Calm/Order Shen deck that put Galio at its battlefield on T2, the Snapvine went
the other way. On T3 it killed `OGN-054 Sunlit Guardian` beside him. On T4 a paid Rampage killed `VEN-118
Horns of the Dragon`, the Tank they had added, and the Snapvine walked into Galio alone, who dealt it
nothing and died: **4 to 2** after their T4. That score is not the Snapvine's on T3: the same hand
holding the Snapvine and Rampage for T4 reaches **4 to 2** too, with Rampage on Lucian, Merciless and
the Snapvine trading with Horns. What the T3 Snapvine buys is a 6-Might body that survives and a card
kept. Choosing Galio on T3 trades the Snapvine, five runes with three recycled, for Galio, three runes
with one recycled. The cheapest break costs them one rune on their T2 and none on your T4: a card
hidden at B, such as `OGN-057 Block`, which makes Galio a 9 as a defender, so the Snapvine's 8 does
not kill him. Without a hidden card, it takes two ready runes on your T4: `OGN-058 Discipline` (Calm,
E2, no Power) on the Rampage's target makes the exchange 8 against 8, and both bodies die.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-18 at `1c031c2`, reads 773
entries, 262 with forced-ordering language, **100 in the queue and 19 of them with no play**, as the
issue measured. The two picks are unchanged: this entry is rank 82, the first in the list. The other
entry of this slice is rank 83, `jaull-fish-garen-rugged-mighty-discount`, played in
[Two Mighty bodies buy a ready Jaull-Fish on T4, and the three Body runes it recycles are the part no discount touches](2026-10-18-two-mighty-bodies-buy-a-ready-jaull-fish-on-t4-and-the-three-body-runes-it-recycles-are-the-part-no-discount-touches.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-183 Purifier` (Fury/Body, tag Lucian) |
| **Chosen Champion** | `SFD-113 Lucian, Merciless` (Body, E3, M3) |
| **The removal body** | `OGN-149 Carnivorous Snapvine` (Body, E5 + 2 Body Power, M6) |
| **The repeat** | `VEN-083 Rampage` (Body spell, E3, optional 1 Body Power) |

The entry admits any of seventeen legends with Body in their pair. Purifier is the one for this walk:
its text plays no part in the line (*"Your Equipment each give [Assault]."*), and nothing here is
Equipment. Its tag is Lucian, so Lucian, Merciless can be the Chosen Champion, 103.2.a.2: *"Must be a
champion unit with a champion tag that matches the tag on your Champion Legend."* He is a unit, tagged
Lucian, and not a Signature card (`signature` in `data/cards.json`). He starts in the Champion Zone,
103.2.a.1: *"This will be placed in the Champion Zone at the start of the game."* And he is played from
there, 419.1.a: *"By default, a player can only Play cards from their hand or their Chosen Champion
zone."* He comes down on T4.

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* None is a Signature card, and none is in `data/legality.src.json` or marked
[BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Carnivorous Snapvine: *"When you play me, choose an enemy unit at a battlefield. We deal damage
  equal to our Mights to each other."*
- Rampage: *"As you play this, you may pay :rb_rune_body: as an additional cost. Choose a friendly unit
  and an enemy unit. If you paid the additional cost, give the friendly unit +2 :rb_might: this turn.
  They deal damage equal to their Mights to each other."*
- Galio, Indefatigable: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or
  ability.) [Tank] (I must be assigned combat damage first.) I don't deal combat damage."*

## 2. Whose damage it is, and what Galio does about it

**The damage is the units'.** 417.6.b.3: *"When a spell or ability specifies a Unit as the source of
the Damage for the Deal action, it is not in addition to the spell or ability that instructed it.
Example: Challenge is a spell that reads “Choose a friendly unit and an enemy unit. They deal damage
equal to their Mights to each other.” The damage that Challenge causes to be dealt is dealt by the
chosen units, not by Challenge."* Rampage prints Challenge's sentence word for word, and the Snapvine
prints it with *"We"*. Combat damage is a different thing, 417.6.c: *"Damage Dealt as a result of being
assigned during Combat has the Units as its source."* An exchange is not assigned during a combat, so
it is not combat damage.

**So a [Tank] orders none of it.** 815.1.b: *"I must be assigned lethal damage before any other unit
with the same controller as me that does not have [Tank] during the Combat Damage step."* The Snapvine
chooses any enemy unit at a battlefield. In this walk that buys less than it sounds: every body at
their battlefield is a Tank, and in a combat 815.1.c.2 already lets you pick among them: *"If more than
one unit with Tank is present with the same controller in Combat, damage may be assigned to any of
them."* What the exchange buys here is a body killed outside a combat.

**And Galio deals his 6.** His *"I don't deal combat damage."* is scoped to combat damage, which 417.6.c
defines, and the exchange is not that. So the Snapvine choosing Galio is 6 against 6, and both die,
143.2.a: *"If a Unit ever has nonzero damage marked on it equalling or exceeding its Might, it is
Killed."*

**Choosing Galio costs a Power.** The Snapvine's text is a play effect, 383.4.a: *"Play Effects are
Triggered Abilities whose Condition includes the Permanent that has the Play Effect being played to
the board."* And a triggered ability is played like an activated one, 383.3: *"When a Condition is met,
a Triggered Ability behaves like an Activated Ability and is placed on the Chain."* So [Deflect] taxes
it, 809.1.c: *"Spells and abilities an opponent controls that target [me/this] cost an amount of Power
equal to [Deflect Value] more to play as an additional cost for each time they choose [me/this]."*
Rampage on Galio pays it too.

**Galio alone is a toll that costs nothing to pay.** In a combat he deals no damage at all. Each player
assigns their summed Might, 465.2.c: *"Starting with the Attacker, each player assigns an amount of
damage equal to their summed Might among the other's Units."* An attacker that reaches 6 kills him and
takes nothing back. With a partner beside him, the partner's Might is the damage that comes back. So
against Galio the line is: kill the partners outside the combat, and attack him alone.

**Damage stays until the end of the turn, on both bodies.** 143.3.b.1 heals it *"At the end of each
player's turn."* The order of the Expiration Step matters for a pumped body. First 317.2.b: *"Insert
“3c. Heal all Units.”"* Then 317.2.c: *"Insert “3d. All ‘this turn’ effects expire simultaneously.”"*
So a Snapvine at 8 with 6 damage marked is healed before it is a 6 again, and lives.

**The runes, going first.** You have 2, 4, 6 and 8 runes on T1 to T4, less any you recycle. Power is
paid by recycling a rune, 164.2.b: *"Recycle this: [Reaction] — Add [C]."* A rune exhausted for Energy
can be recycled for the Power, and it leaves the board for good.
[2026-10-24, #452: not for good. A recycled rune goes to the bottom of the Rune Deck (416.1, 416.1.b) and is
channelled again when the deck reaches it (430.1). Going first, each rune recycled is a rune short on every
turn through T6 at the least, until the Rune Deck runs dry (161.2.a, 315.3.b). The walk ends after their T4,
so the count stands for every turn it covers. The wording above is kept as history.]
The Snapvine is five runes, two of
them recycled Body runes. A paid Rampage is three, one of them a recycled Body rune.

## 3. Their deck: Calm/Order Shen

`VEN-147 Eye of Twilight` (Calm/Order): *"[Action][>] :rb_exhaust:: Give a friendly unit [Tank] this
turn. (It must be assigned combat damage first.)"* Every body at their battlefield in the walk is a
Tank already, so it is never used. Its Chosen Champion is `OGN-241 Shen, Kinkou` (Order, E3 + 1 Order Power, M3):
*"[Reaction] (Play any time, even before spells and abilities resolve, including to a battlefield you
control.) [Shield 2] (+2 :rb_might: while I'm a defender.) [Tank] (I must be assigned combat damage
first.)"* Their bodies are Galio, Indefatigable (Order, E3 + 1 Order Power, M6), `OGN-054 Sunlit
Guardian` (Calm, E3, M3; *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I must be assigned
combat damage first.)"*), `VEN-118 Horns of the Dragon` (Order, E6, M6, [Tank]), `UNL-036 Mutated
Mouser` (Calm, E2, M1, [Shield 2], [Tank]) and `VEN-123 Soulspinner` (Order, E3, M3, [Ambush]). Going
second, they channel an extra rune on T1, 485.7: *"The player going second channels an extra Rune from
their Rune Deck during their first Channel Phase of the game."* §5 names their answers.

## 4. The turns, going first

Fury/Body against Calm/Order. Your battlefield is A, `OGN-282 Monastery of Hirana` (*"When you conquer
here, you may spend a buff to draw 1."*, and nobody has a buff); theirs is B, `SFD-221 Veiled Temple`
(*"When you conquer here, you may ready a friendly gear. If it's an Equipment, you may detach it."*,
and nobody has a gear). Your opening four are `SFD-099 Veteran Poro` (E2, M2), `SFD-098 Sea Monkey`
(E2, M2, its extra Energy not paid), Carnivorous Snapvine and Rampage. Your draws are `UNL-092 Demacian
Diplomat` (T1; E2, M2), `SFD-096 Laurent Bladekeeper` (T2; E3, M3), `UNL-097 Kinkou Initiate` (T3) and
`OGN-135 Pakaa Cub` (T4). Their opening four are Galio, Sunlit Guardian, Horns of the Dragon and
`OGN-206 Back to Back`. Their draws are Mutated Mouser (T1), `OGN-046 En Garde` (T2), Soulspinner (T3)
and `VEN-117 Disciple of Shen` (T4).

```
turn    runes   your turn                                                 points
T1      2       Veteran Poro (E2) to base. None left.                     0
their T1  3     Galio (E3 + 1 Order Power) to base. One rune
                recycled; none left.
T2      4       Poro walks to A, empty, Conquer: +1. Sea Monkey (E2)      1
                and Demacian Diplomat (E2) to A. None left.
their T2  4     Galio walks to B, empty, Conquer. Sunlit Guardian (E3)
                to B. One rune left.
T3      6       Hold A: +1. Carnivorous Snapvine (E5 + 2 Body Power)      2
                to base; it and the Guardian deal 6 and 3 to each
                other, and the Guardian dies. One rune left.
their T3  6     Hold B. Horns of the Dragon (E6) to B. None left.
T4      6       Hold A: +1. Rampage (E3 + 1 Body Power) on the            4
                Snapvine and Horns: 8 and 6, and Horns dies. The
                Snapvine walks into B, Galio alone, Conquer: +1.
                Lucian, Merciless (E3) to base. None left.
their T4  8     Nothing to hold. Shen, Kinkou (E3 + 1 Order Power),
                Soulspinner (E3) and Mutated Mouser (E2) to base.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 2 after their T4. After your T3 it
is **2 to 1**; after their T3, **2 to 2**; after your T4, **4 to 2**; after their T4, **4 to 2**.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro; 5, then 3 after the Monkey and the
Diplomat; 4 after the T3 draw, 3 after the Snapvine; 4 after the T4 draw, 3 after Rampage, still 3
after Lucian, who comes from the Champion Zone (Laurent Bladekeeper, Kinkou Initiate, Pakaa Cub).
Theirs: 5 after the T1 draw, 4 after Galio; 5, then 4 after the Guardian; 5, then 4 after Horns; 5
after the T4 draw, still 5 after Shen, 3 after Soulspinner and the Mouser (Back to Back, En Garde,
Disciple of Shen).

**Your T2: A is yours, and it is out of their reach.** The Poro takes A, which is empty: a non-combat
showdown, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are a
stand-alone Phase and do not create a Combat."* Their three runes went on Galio, so they pass, and it
is a Conquer. The Monkey and the Diplomat go to A, which you now control, 355.2.a: *"By default, Valid
locations include the controller’s Base or a Battlefield the controller controls."* A is 6.

**Their T2: Galio takes B.** Their runes are 2 + 2 channelled = 4; one went for Galio's Power for good.
[2026-10-24, #452: not for good. A recycled rune goes to the bottom of the Rune Deck (416.1, 416.1.b) and is
channelled again when the deck reaches it (430.1). Going second, with 485.7's extra rune, each rune they
recycle is a rune short on every turn through their T5 at the least, until their Rune Deck runs dry
(161.2.a, 315.3.b). The walk ends after their T4, so the count stands for every turn it covers. The wording
above is kept as history.]
Galio attacking A would deal nothing and die to its 6, so he walks into B, empty, and they take it: a point.
The Guardian goes to B with three of the four runes. B is Galio 6 and the Guardian, 4 while defending,
and they have one rune ready.

**Your T3: the Snapvine kills the Guardian.** Your runes are 4 + 2 channelled = 6, all ready, 315.1.b:
*"1. The Turn Player readies all Game Objects they control that are able to be readied."* You Hold A.
The Snapvine is five runes, two Body runes recycled, and goes to base, because your units at A can
never reach B, 144.4.b: *"Units may move from a Battlefield to their Base."* Its play effect chooses
the Guardian at B. Their one ready rune buys En Garde, which gives the Guardian +1 and not the second
+1, since Galio is there: 4 against the Snapvine's 6, and it still dies. Without it, the Snapvine takes
3; with it, 4. Either heals at the end of your turn. B is Galio alone.

**Their T3: they make B 12.** They Hold B: **2 to 2**. Nothing of theirs can reach A: their only unit
is at B, and they have none in base. Horns of the Dragon goes to B with all six runes, a second 6 and a
second Tank beside Galio.

**Your T4: Horns dies outside the combat, and Galio dies in it.** Your runes are 6, less the two
recycled on T3, plus 2: six. You Hold A. Rampage, paid, chooses the Snapvine, in base, and Horns at B:
Rampage names no location. The Snapvine is 8 for the turn; it deals 8 to Horns, which dies, and takes 6. Then the Snapvine, ready since your Awakening (315.1.b), walks into B, 144.4.a: *"Units may move
from their Base to a Battlefield."* That costs it nothing but the exhaust, 144.2: *"Exhausting the
Unit is the Cost for this action."* They control B, so it is a combat, with Galio alone. Galio deals no
combat damage. The Snapvine's 8 kill him and the excess is wasted, 465.2.c.4: *"Units cannot have more
damage assigned to them than the minimum required to constitute lethal damage unless no further units
remain to have damage assigned to them."* Only your unit remains, 466.5: *"1. If no Showdown or Combat
is staged at this location, the player with Units remaining here Establishes Control if they didn’t
already control this Battlefield."* And 466.5.d: *"Establishing Control results in a Conquer if that
player has not yet scored this Battlefield this turn."* **4 to 2.** Your last three runes put Lucian
in base. At the end of the turn the Snapvine is healed of its 6 before the +2 expires (317.2.b, 317.2.c).

**Their T4.** They control no battlefield, so there is nothing to Hold. Their runes are 6 + 2 = 8.
Shen comes from the Champion Zone to base, with Soulspinner and the Mouser: every unit enters exhausted,
143.4: *"Units enter the Board exhausted."* **4 to 2.**

**Without the Snapvine on T3: the control.** Same draws. On T3 the six runes play Lucian and Laurent
Bladekeeper to base. On their T3 Horns goes to B as in the walk: B is Galio, the Guardian and Horns. On
your T4 you have eight runes. Rampage, paid, chooses Lucian and the Guardian: Lucian is a 5 for the
turn, and outside a combat the Guardian's [Shield] adds nothing, so it is 5 against 3. The Guardian
dies and Lucian keeps 3 damage. The Snapvine, five runes with two Body recycled, chooses Horns: 6
against 6, and both die (143.2.a). B is Galio alone. Lucian, a 5 with 3 marked, and the Bladekeeper,
a 3, walk into B: their 8 kill Galio, who deals nothing, and it is a Conquer. They have nothing to
Hold on their T4: **4 to 2**, the walk's score, for the same eight runes and the same three Body
recycled. So the Snapvine on T3 does not buy a point. The walk ends your T4 with the Snapvine and
Lucian on the board and the Bladekeeper still in hand. The control ends it with Lucian and the
Bladekeeper on the board and the Snapvine in the trash. That is a 6-Might body in place of a 3, and
one card more.

**Choosing Galio on T3.** The Snapvine pays a third Power for [Deflect] (809.1.c): five runes
exhausted, three recycled. Galio and the Snapvine deal 6 to each other, and both die (143.2.a). B is
the Guardian alone, and they Hold it on their T3 with Horns beside him. Rampage on T4 has no 6-Might
body to pump. The Snapvine, five runes with three recycled, for Galio, three runes with one
recycled.

**Rampage before the Snapvine.** Rampage needs a friendly body big enough to survive the exchange. On
T3 your largest is a 2; Rampage paid makes it a 4, which kills the Guardian (4 against 3) and takes 3,
and lives. That is three runes for the Guardian instead of five, with Laurent Bladekeeper beside it. On T4
the Snapvine then faces Galio and Horns: it can kill Horns only by trading with it, 6 against 6, and
the Bladekeeper's 3 cannot kill Galio alone. The Snapvine comes first because Rampage's +2 reads the
body it is given; on T4, Rampage on Lucian works, as the control shows, because the Snapvine is
there to take Horns.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Going first, you
have seen **7** cards by T3 and **8** by T4. With three copies of each (103.2.b: *"Your Main Deck can
include up to 3 copies of the same named card."*), a Snapvine among the first 7 is **45.73%**, a
Rampage among the first 8 **50.82%**, and both, the Snapvine by T3 and the Rampage by T4, **21.71%**.

## 5. Breaks to

**What the engine did, and the predicate.** On your T3 the Snapvine killed Galio's partner; on your T4
Rampage killed the next one and the Snapvine conquered B through Galio alone. The predicate is: played
by them in one of the three windows below, does it leave a second body of theirs at B when the Snapvine
attacks, or kill the Snapvine first?

**The scope.** A Calm/Order deck plays only Calm, Order and Calm/Order cards (103.1.b.1), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* Eye of Twilight's tag is Shen. The
predicate is: a card in those domains in `data/cards.json` (not a legend, battlefield, rune or token),
not a Signature card with another champion's tag, not marked banned in constructed. Folded by name,
that is **254** cards. Every window below is in your turn, so only a card with [Reaction], [Hidden] or
[Ambush] in its text can be played there: **45** of the 254, each read.

**Window 1: the Snapvine's play effect, your T3.** In the walk they have one ready rune. The one-rune
cards that touch it are `OGN-046 En Garde` and `UNL-031 Combat Experience` (+1 each, and En Garde's
second +1 only for a unit alone): the Guardian is a 4 and dies to 6. `VEN-040 Decree of Focus` (E1,
+4) reads *"being chosen by an enemy Fury spell"*, and the Snapvine is Body and a unit. **One ready
rune does not touch the line.** Two do: `SFD-045 Not So Fast` (Calm, E2 + 1 Calm Power; *"Counter an
enemy spell or ability that chooses a friendly unit or gear."*) counters the play effect, 425.1.a: *"A
card or ability that is Countered does nothing and is cleared from the chain."* `VEN-126 Ki Barrier`
(Order, E2 + 1 Order Power; *"Choose a unit. Prevent the next 7 damage that would be dealt to it this
turn."*) makes the Guardian take none of the 6, 437.4: *"Damage dealt to a Unit that has that all of
that damage Prevented is not considered to have been dealt to it at all."* Both keep the Guardian at
B. `OGN-058 Discipline` (+2) does not: a 5 dies to 6. `UNL-175 Tactical Retreat` (Order, E2) recalls
the Guardian instead of letting it die, and B is Galio alone just the same. The price is their T2: the
Guardian is three of their four runes, and keeping two up means B is Galio alone on your T3, with
nothing for the Snapvine to choose but him.

**Window 2: Rampage, your T4.** In the walk they have none ready. With two, the cheapest break is a +2
on the target: Discipline (Calm, E2; *"Give a unit +2 :rb_might: this turn. Draw 1."*) or `SFD-034
Feral Strength` (Calm, E2) makes Horns an 8 against the Snapvine's 8. Both deal 8 and both die
(143.2.a), and there is nothing left to attack Galio with: Lucian enters exhausted. **The cheapest
answer: two runes, no Power, and Discipline draws them a card.** Ki Barrier on Horns saves it, and
Horns' 6 is on the Snapvine for the combat. Not So Fast counters Rampage outright, and so do the costlier
counters in the 45. `OGN-206 Back to Back` (Order, E3), the card
in their hand, gives Horns and Galio +2 each: Horns 8 and the Snapvine 8 die together, the same break
for three runes.

**Window 3: the combat at B, your T4.** Galio alone is the point, so a second body breaks it. An
[Ambush] unit plays as a Reaction to a battlefield where they have units: Soulspinner (E3, M3) beside
Galio. The Snapvine's 8 go 6 to Galio, who is the Tank, and 2 to Soulspinner; Soulspinner's 3 on a
Snapvine already carrying 6 is 9, and it dies. Soulspinner remains, and B stays theirs. Shen, Kinkou
does the same from the Champion Zone (E3 + 1 Order Power), a 5 while defending. A +2 on Galio does
not: Back to Back makes him an 8, and the Snapvine's 8 still kill him.

**The hidden card at B.** Four of the 45 carry [Hidden] and break the combat from facedown. After
their T2 they control B, so they can hide there, 811.1.b: *"While this card is in your hand or in your
Champion Zone on your turn during an Open State, you may pay [A] to hide this facedown at a battlefield
you control that doesn't already have a facedown card hidden there for as long as you control that
battlefield. Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base
cost."* The [A] is a recycled rune, and it can be one already exhausted, so the hide needs no ready
rune and costs one rune for good.
[2026-10-24, #452: not for good. A recycled rune goes to the bottom of the Rune Deck (416.1, 416.1.b) and is
channelled again when the deck reaches it (430.1). Going second, with 485.7's extra rune, each rune they
recycle is a rune short on every turn through their T5 at the least, until their Rune Deck runs dry
(161.2.a, 315.3.b). The walk ends after their T4, so the count stands for every turn it covers. The wording
above is kept as history.]
Played from facedown it has Reaction, 811.6: *"A card that is Hidden
gains Reaction while facedown or played from facedown, and may be played any time a card with Reaction
may be played as a result."* It costs nothing on your T4. In the combat at B:

- **`OGN-057 Block`** (Calm): *"Give a unit [Shield 3] and [Tank] this turn."* Galio is a 9 as a
  defender, and the Snapvine's 8 does not kill him.
- **`UNL-042 Back Off`** (Calm): *"[Stun] a unit. (It doesn't deal combat damage this turn.)"* The
  Snapvine deals nothing.
- **`OGN-220 Facebreaker`** (Order): *"Stun a friendly unit and an enemy unit at the same
  battlefield."* Galio and the Snapvine, the same result.
- **`OGN-213 Hidden Blade`** (Order): *"Kill a unit at a battlefield. Its controller draws 2."* The
  Snapvine dies at B, and you draw 2.

The rune they recycle to hide comes off their T3. They have five runes there, not six, so Horns is
out of reach and Shen, Kinkou goes to B from the Champion Zone (E3 + 1 Order Power). On your T4 the
paid Rampage kills Shen (8 against 3), the Snapvine walks into Galio alone, and the hidden card stops
it. B stays theirs: **3 to 2** after your T4 and **3 to 3** after their T4. The other hidden cards in
the 45 do not break it. `SFD-043 Emperor's Divide` and `OGN-077 Zhonya's Hourglass` take Galio out of
B and leave it to you. `OGN-053 Stand United` makes him an 8, which the Snapvine's 8 still kills. The
units, `VEN-117 Disciple of Shen` and `VEN-135 Kennen, Keeper of Balance`, I did not walk.

**So the line needs them at one ready rune or none on your T4, and nothing hidden at B.** In the walk
they kept their spare rune on their T2 for En Garde, which changes nothing, and spent all six on
Horns. A hidden Block, Back Off,
Facebreaker or Hidden Blade is **the cheapest answer: one rune on their T2, which can be an exhausted
one, and none on your T4**. Without one, two runes kept back and Discipline in hand cost you the
Snapvine and the conquer.

## 6. Verdict

**Right about the rule; wrong about how it answers Galio.** The exchange is the units' damage
(417.6.b.3), never assigned in a combat (417.6.c), so a [Tank] orders none of it. But the same reading
means Galio deals his 6 in it: the Snapvine choosing him is a mutual kill, and pays [Deflect]'s Power
on top (383.3, 809.1.c). What answers Galio is the other half of his text. He deals no combat damage, so
alone he is a 6 that costs nothing to kill. Walked going first against a Calm/Order deck that put him
at B on T2, the Snapvine killed the Guardian beside him on T3, a paid Rampage killed Horns on T4, and
the Snapvine took B from Galio alone: **4 to 2** after their T4. Holding the Snapvine and Rampage
for T4 reaches the same **4 to 2**, so the T3 Snapvine buys a surviving 6-Might body and a card, not a
point. Choosing Galio trades five runes, three of them recycled, for three, one of them recycled. The
cheapest cards that touch the line are En Garde and Combat Experience, one rune each, and neither
breaks it. What breaks it most cheaply is a card hidden at B on their T2, for one rune that can
already be exhausted: Block, Back Off, Facebreaker or Hidden Blade stops the Snapvine in the combat
with no rune spent on your T4. Without one, it takes two ready runes on your T4: Discipline on Horns,
no Power, and both 8s die.

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Body runes for you, Purifier's two
domains, in the twelve of Tournament Rules 402.1. The Snapvine on T3 needs two Body runes among the
first six: it fails in **37 of 924, 4.00%**. A paid Rampage on T4 then needs a third Body rune among
the first eight, since the two recycled go to the bottom of the rune deck: both fail together in **52
of 924, 5.63%**. Lucian needs no Power. Choosing Galio's [Deflect] takes any rune.

Their walk assumes six Calm and six Order. Galio on their T1 needs an Order among their first three:
it fails in **84 of 924, 9.09%**. Ki Barrier and Shen need an Order, Not So Fast a Calm, each
among the runes they still hold; Discipline, Feral Strength, Back to Back, En Garde and Soulspinner need
no Power.

**How likely an answer is.** Out of their own **39**, by your T4 they have seen **7** cards: four
opening and a draw on each of their three turns. Discipline, run three times, is among them in
**45.73%**; Discipline or Feral Strength (six cards), **72.23%**. These count only the cards named, not
how many of them a deck runs, and every one of them needs the two runes the walk has them spend.

Their hand holding Back to Back and no runes for it is the walk's assumption; §5 prices it. Not
walked: going second, the mulligan, 2v2, `OGN-045 Defy` (Calm, E1 + 1 Calm Power; *"Counter a spell
that costs no more than :rb_energy_4: and no more than :rb_rune_rainbow:."*), whose reach depends on
whether Rampage's paid Body rune counts in what it *"costs"*, which I did not settle, 417.6.b.4's *"when you deal damage"* triggers (nothing in
either walked deck has one), `UNL-057 Alpha Wildclaw` (Calm, E6 + 2 Calm Power, M7; *"Your units here
with less Might than me can't be chosen by enemy spells and abilities."*), which forbids both the
Snapvine and Rampage at its battlefield and survives the Snapvine's 6, a second Rampage on the same
turn, and the board after their T4.

## Leads

- The notable *"That is the direct answer to galio-back-to-back-divining-shells-toll"*: it is an
  answer, but not by choosing Galio. *"I don't deal combat damage."* does not reach the exchange
  (417.6.b.3, 417.6.c), so the Snapvine against Galio is 6 against 6 and both die (143.2.a), and
  choosing him costs a Power more for [Deflect] (383.3, 383.4.a, 809.1.c). The answer is to kill his
  partners outside the combat and attack him alone, when he deals nothing. Back to Back's +2 makes him
  an 8, and a paid Rampage's 8 still kills him.
- Step 5, *"a second Rampage in the SAME turn finishes anything the first one left alive"*: the
  friendly body keeps its damage too (143.3.b.1). After one paid Rampage against a 6, the Snapvine
  carries 6 on an 8; a second paid Rampage makes it a 10 with 6 marked, and any enemy of Might 4 or
  more kills it in the exchange.
- The steps never say why a pumped Snapvine with 6 or 7 damage survives the end of the turn: 317.2.b
  heals all units before 317.2.c expires the *"this turn"* +2.
- The notable *"SECOND: IT WALKS PAST A SPELL-DAMAGE FOG"*: the pool prints exactly one such fog,
  `OGN-145 Unyielding Spirit` (Body; *"Prevent all spell and ability damage this turn."*), plus `VEN-025
  Esteemed Hierophant` (Calm), which prevents *"all damage that enemy spells and abilities would deal
  to me"*. The two prevention cards that name a unit instead of a source, `VEN-126 Ki Barrier` (Order,
  E2 + 1 Order Power) and `SFD-194 Counter Strike` (Calm/Body, E2 + 1 Power), stop the exchange's
  damage to that unit.
- No Calm/Order answer is named; the only answer the entry names is `VEN-084 Ambessa, The Wolf`, in
  Body. `SFD-045 Not So Fast` (Calm, E2 + 1 Calm Power) counters the play effect and Rampage alike.
  `OGN-058 Discipline` and `SFD-034 Feral Strength` (Calm, E2) on the Rampage's target make a paid
  Rampage against a 6 a mutual kill. An [Ambush] or [Reaction] body played beside Galio in the combat
  keeps the battlefield. Cheapest of all, a card hidden at the battlefield, `OGN-057 Block`, `UNL-042
  Back Off`, `OGN-220 Facebreaker` or `OGN-213 Hidden Blade`, stops the attack for one rune paid on the
  turn before.
- The precondition *"An enemy unit AT A BATTLEFIELD for the Snapvine"*: the Snapvine played to base
  still reaches a battlefield, and has to be played there whenever the target is at the opponent's
  battlefield, because a unit at your own battlefield can only go back to base (144.4.b).
