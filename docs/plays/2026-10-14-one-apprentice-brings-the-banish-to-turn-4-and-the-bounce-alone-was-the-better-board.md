# Play — One Apprentice brings the banish to turn 4, and the bounce alone was the better board

Issue #366 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `moonlight-affliction-wind-and-ghosts-banish`**, the Mind/Chaos ENGINE in which
`UNL-066 Moonlight Affliction` gives a unit -10 Might and `VEN-106 Wind and Ghosts` then banishes it
instead of bouncing it. The entry prices one use at 10 Energy and 1 Chaos Power. Walked as a game, the
printed price is ten runes, which going first is T5 at the earliest. One `OGN-084 Eager Apprentice` at a
battlefield takes one Energy off each spell, and that brings it to T4. On T4 the pair banished their
`SFD-021 Ferrous Forerunner` before its [Deathknell] could fire, and your attack took their battlefield:
**4 to 2** after their T4. Killing it instead with the Affliction alone left them two Mech tokens that
retook the battlefield: 4 to 3. Bouncing it with Wind and Ghosts alone also ended **4 to 2**, cost six
Energy less, and put six more Might of yours on the board. What the Affliction bought over the bounce
is cards, not points: their Forerunner gone for good, and one card drawn by the legend. The cheapest
break is one rune, and twelve cards do it. `UNL-173 Sacrifice`, in response to the Affliction, kills
the Forerunner while it is still Mighty and turns the banish into the Deathknell it was meant to deny.
Any of nine cards hidden at B the turn before plays for nothing into your attack and keeps B: 3 to 2.
So do `OGN-009 Hextech Ray` and `UNL-014 Monster Harpoon`, from hand in the combat. The pair spends all
eight runes, so you can answer none of them.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `7717c97`, reads
773 entries, 262 with forced-ordering language, **101 in the queue and 29 of them with no play**. That
is one fewer in the queue than the issue's 102; the two picks are unchanged. The pick is by global rank,
skipping entries that already have a play: this entry is rank 73 (a hit on *before*), first in the list.
The other entry of this slice is rank 74, `jinx-rebel-discard-event-ready`, played in
[The ready only pays when Jinx is spent, and in a Duel switching battlefields costs a card](2026-10-14-the-ready-only-pays-when-jinx-is-spent-and-in-a-duel-switching-battlefields-costs-a-card.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-199 Prodigal Explorer` (Mind/Chaos) |
| **The pair** | `UNL-066 Moonlight Affliction` (Mind, E7), `VEN-106 Wind and Ghosts` (Chaos, E3 + 1 Power) |
| **The discount** | `OGN-084 Eager Apprentice` (Mind, E3, M3) |
| **The bodies** | `OGN-171 Mystic Poro` (Chaos, E2, M2), `OGN-175 Shipyard Skulker` (Chaos, E3, M3) |

The entry names four Mind/Chaos legends. This play takes Prodigal Explorer, because the pair chooses
the same enemy unit twice and the Explorer pays for exactly that. 103.1.b.1: *"Cards included in your
deck must abide by your Domain Identity."* Its Chosen Champion is `SFD-082 Ezreal, Dashing` (Mind).
103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your Champion
Legend."* He is not played in this walk: he costs Power (§2). No card of either deck is a Signature
card (`data/cards.json`), and none is in `data/legality.src.json` or marked [BANNED] in
`data/corpus_flat.txt`.

The card text the play turns on:

- Moonlight Affliction: *"[Reaction] (Play any time, even before spells and abilities resolve.) Give a
  unit -10 :rb_might: this turn."*
- Wind and Ghosts: *"[Action] (Play on your turn or in showdowns.) Choose a unit at a battlefield. If
  it has 3 :rb_might: or less, banish it. Otherwise, return it to its owner's hand."*
- Eager Apprentice: *"While I'm at a battlefield, the Energy costs for spells you play is reduced by
  :rb_energy_1:, to a minimum of :rb_energy_1:."*
- Prodigal Explorer: *":rb_exhaust:: [Reaction] — Draw 1. Use only if you've chosen enemy units and/or
  gear twice this turn with spells or unit abilities."*

## 2. The price, and when it can be paid

**Ten Energy is ten runes.** You channel two a turn, 315.3.b: *"1. The Turn Player channels 2 runes
from their Rune Deck."* Going first gets no extra rune; going second does, 485.7: *"First Turn
Process: The player going second channels an extra Rune from their Rune Deck during their first
Channel Phase of the game."* So going first you have 2, 4, 6, 8 and 10 runes on T1 to T5. The Chaos
Power costs no extra rune: one of the ten is recycled after it is exhausted for Energy, 164.2.b:
*"Recycle this: [Reaction] — Add [C]."* But a recycled rune leaves the board, 161.2.b: *"When a Rune
is Recycled it is returned to the Rune Deck, not the Main Deck."* Every Power paid before the turn of
the banish is one rune fewer on that turn. **At the printed price the pair needs T5, going first, and
no Power paid on T1 to T4.** That is why Ezreal, Dashing (E4 + 1 Power) waits in this walk.

**One Apprentice makes it eight.** Its reduction is a discount, 356.4.b: *"Discounts may say that
cards "cost [amount] less" or that one or more of their costs are "reduced by [amount].""* It applies
to each spell you play while it stands at a battlefield: the Affliction costs E6 and Wind and Ghosts E2
+ 1 Power, eight runes, which is T4. Two Apprentices are two discounts, and the floor of each is its
own, 356.4.e: *"If a discount applies a minimum cost, that minimum applies only to that discount."*
That makes E5 and E1 + 1 Power, six Energy. But the second Apprentice cannot land before T3 (T1 has two
runes, and T2's four pay for one), and on T3 it and the pair are E3 + E6, nine Energy from six runes.
So two Apprentices do not reach T3 either, and T4 is the walk's turn, with one.

**The scope of "one".** Of the 259 Mind, Chaos and Mind/Chaos cards in `data/corpus_flat.txt` (four
legends and two runes included), 15 print a cost that is *"less"* or *"reduced by"*. Three can lower
these two spells: Eager Apprentice;
`VEN-055 Applied Researchers` once [Empowered] (*"Your spells cost :rb_energy_1::rb_rune_rainbow: less,
to a minimum of :rb_energy_1:."*: E6 and E2 with no Power, for E4 + E3 to set up); and `SFD-146 Vex,
Cheerless`, only while she is in combat. The other twelve do not: `OGN-112 Kai'Sa, Evolutionary`
plays a spell from the trash, `SFD-141 Irelia, Graceful` discounts spells that choose her,
`SFD-149 Ezreal, Prodigy` discounts optional additional costs, `VEN-098 Stargazer` discounts [Flow]
from the trash, `SFD-076 Production Surge` and `VEN-059 Shock Blast` discount themselves, and
`OGN-195 Rhasa the Sunderer`, `VEN-050 Grumpy Rockbear`, `VEN-064 Plaza Guardian` and
`VEN-096 Shadowblade Lurker` discount themselves or their own ability. `SFD-085 Ornn, Forge God` and
`SFD-127 Master Bingwen` ([Weaponmaster]) equip *"for :rb_rune_rainbow: less"*.

**The order is the entry's, and it matters for the break.** Moonlight Affliction is cast first and
resolves. While it is on the chain they may answer only with [Reaction], 309.1.a: *"Only cards and
abilities with the Reaction keyword can be played or activated in a Closed State."* Below zero the
unit is read as 0, 143.2.b: *"If a unit's Might is ever less than 0, it is treated as 0 when
referenced by spells and abilities, and when summing Might to be assigned as damage in the Combat
Damage Step."* So Wind and Ghosts reads "3 or less" and banishes. A banished card does not reach the
trash, so a [Deathknell] does not fire, 808.1.d: *"The Trigger for this and similar effects that
trigger on their source’s death is the Permanent being Killed and sent to the Trash."* And the
Explorer's "twice" is met: each spell chooses the unit when it is played, 355.5: *"If a card requires
you to specifically choose one or more Game Objects, that choice is made now."* The worked example
under 355.5.a calls *"Stun a unit at a battlefield"* a choice, and "Give a unit -10" has the same
shape.

## 3. Their deck: Fury/Order, Piltover Enforcer

`UNL-187 Piltover Enforcer` (Fury/Order): *"When you conquer, if you assigned 3 or more excess damage,
you may exhaust me to ready a unit."* It never triggers in this walk. Its Chosen Champion is
`OGN-036 Vi, Destructive`. They play `VEN-004 Dune Surfer` (Fury, E3, M3), `OGN-010 Legion Rearguard`
(Fury, E2, M2) and the body worth answering, Ferrous Forerunner (Fury, E6 + 1 Power, M6):
*"[Deathknell] — Play two 3 :rb_might: Mech unit tokens to your base. (When I die, get the effect.)"*
Killed, it leaves six Might behind. That is the one case the banish is built for. §5 names their
answers.

## 4. The turns, going first

Mind/Chaos against Fury/Order. Your battlefield is G; theirs is B. Your opening four are Mystic Poro,
Eager Apprentice, Moonlight Affliction and Wind and Ghosts. Your draws are a Shipyard Skulker on T1, a
second Mystic Poro on T2, and a Shipyard Skulker on each of T3 and T4.

```
turn    runes   your turn                                                 points
T1      2       Mystic Poro (E2) to base.                                 0
their T1        Dune Surfer (E3) to base. Three runes, none left.
T2      4       The Poro walks to G, Conquer: +1. Eager Apprentice (E3)   1
                to G. One rune left.
their T2        The Surfer walks to B, Conquer. Two Legion Rearguards
                (E2 each) straight to B. Five runes, one left.
T3      6       Hold G: +1. Shipyard Skulker (E3) and the second Mystic   2
                Poro (E2) to G. One rune left. No attack: your two
                ready bodies are a 5 against their 7.
their T3        Hold B. Ferrous Forerunner (E6 + 1 Fury Power)
                straight to B: 3 + 2 + 2 + 6, a 13. Seven runes, six
                exhausted and one of those recycled. One rune left.
T4      8       Hold G: +1. Moonlight Affliction (E6) on the              4
                Forerunner, then Wind and Ghosts (E2 + 1 Chaos Power):
                banished. Eight runes exhausted, one recycled. The
                Explorer draws 1. The Apprentice, the Skulker and the
                first Poro walk to B: 3 + 3 + 2, an 8 against 7. All
                three of theirs die; one of yours lives. Conquer: +1.
                Seven runes on the board.
their T4        No battlefield to hold. Vi, Destructive (E2 + 1 Fury),
                a second Dune Surfer (E3) and a third Legion Rearguard
                (E2) to base. Eight runes, one left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 2 after their T4. After your T4 it
is **4 to 2**, and after their T4 it is still 4 to 2.

**Your T2, why the Apprentice goes to G.** Its discount asks for a battlefield, and G is yours once the
Poro conquers it, 355.2.a: *"By default, Valid locations include the controller’s Base or a
Battlefield the controller controls."* It never has to move: on T4 it is still at G when both spells
are played.

**Their T3, what the Forerunner did.** It made B a 13 that your 10 cannot attack. Their units at B
cannot walk to G; from a battlefield they go only home, 144.4.b: *"Units may move from a Battlefield to
their Base."*

**Your T4, the banish.** The Affliction resolves first: the Forerunner's Might is 6 - 10, read as 0.
Wind and Ghosts finds 3 or less and banishes it. They hold one ready rune, have nothing hidden at B,
and pass every time, here and in the combat (that is the walk's assumption; §5 prices it). Then the
three walk as one move, 144.3: *"Players may perform multiple Units' standard move simultaneously."*
Your 8 kill Surfer 3, Rearguard 2 and Rearguard 2. 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal to their summed
Might among the other's Units."* Their 7 can kill two of yours but not three: the Apprentice and the
Skulker (3 + 3, with 1 left on the Poro), or the Poro and a Skulker (2 + 3, with 2 on the Apprentice).
Which one lives is their choice. You establish control, 466.5.d: *"Establishing Control results in a
Conquer if that player has not yet scored this Battlefield this turn."*

**Their T4, why nothing comes back.** The Forerunner is in their banishment, not their trash,
and its Deathknell never triggered (808.1.d). They control no battlefield, so their three new bodies go
to base, and they enter exhausted, 143.4: *"Units enter the Board exhausted."*

**What the pair bought, against each half alone.** Same hand, same board, same T4:

- **The Affliction alone (E6), killing it in your attack.** At -4 the Forerunner adds nothing to their
  sum (143.2.b), and any damage kills it. 143.2.a: *"If a Unit ever has nonzero damage marked on it
  equalling or exceeding its Might, it is Killed."* Your 8 go 1 on the Forerunner and 3 + 2 + 2: all
  four die, one of yours lives, Conquer, 4 to 2. But it died, so their two 3-Might Mechs go to their
  base. Wind and Ghosts stays in hand: the Skulkers cost 3, so the two spare Energy buy nothing else.
  (Spent on the Surfer before the attack, it leaves two of yours alive, a 5. The Mechs' 6 beat that
  too.) On their T4 the Mechs are ready,
  315.1.b: *"1. The Turn Player readies all Game Objects they control that are able to be readied."*
  They walk to B: 6 against your 2 or 3. B is theirs: **4 to 3**.
- **Wind and Ghosts alone (E2 + 1 Power), bouncing it.** At 6 Might it goes to their hand, not to the
  banishment. The same attack takes B: 4 to 2. Six Energy are left, and both Skulkers go straight to B
  after the Conquer (355.2.a): B is your survivor plus 3 + 3. On their T4 their eight runes buy the
  Forerunner again (E6 + 1 Power, to base, exhausted) or the walk's three bodies, not both. **4 to 2**,
  the same score as the pair.

So the banish beat the kill by a point, because the Forerunner's Deathknell is six Might. Against the
bounce it changed no point. It traded six Might of yours on B for two cards: their Forerunner, gone
from the game, and your Explorer's draw.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **6** cards by
T2 and **8** by T4 (four opening, one draw a turn). With three of each (103.2.b), an Apprentice among
the first 6 is **40.30%**; an Affliction among the first 8 is **50.82%**, and so is a Wind and Ghosts;
both spells among the first 8 is **24.20%**; and the walk's three (an Apprentice by T2, both spells by
T4) is **8.33%**. At the printed price on T5 you have seen **9** cards, and both spells among them is
**29.35%**. That counts only those cards; the walk also needs a two-drop on T1.

## 5. Breaks to

**The predicate is the walk's T4 result: the banish, and the Conquer of B that follows it.** Undo the
banish and their Deathknell retakes B on their T4. Undo the Conquer and B stays theirs: **3 to 2**
after your T4 instead of 4 to 2. **Twelve cards do one or the other for one rune.**

- `UNL-173 Sacrifice` is played from hand in response to the Affliction.
- Nine are hidden at B for one rune on their own turn (the walk left them a spare on T2 and on T3) and
  played for nothing into your attack.
- `OGN-009 Hextech Ray` and `UNL-014 Monster Harpoon` are [Action] spells, played from hand in your
  combat with the one rune the walk left them.

**Against the banish, one rune: Sacrifice.** Sacrifice (Order, E1): *"[Reaction] (Play any time, even
before spells and abilities resolve.) As an additional cost to play this, kill a friendly [Mighty]
unit. (A unit is Mighty while it has 5+ :rb_might:.) Draw 2 and channel 1 rune exhausted."* While the
Affliction is on the chain the Forerunner is still a 6, 708: *"A Unit "is Mighty" as long as its Might
is 5 or greater."* They kill it as the cost, with the one rune they kept. Their Deathknell fires
(808.1.d), and the Affliction resolves on nothing, 359.3.e.2: *"A target is illegal as the spell
resolves if it no longer meets the targeting requirements of the spell, or if it has changed Zones to
or from a Non-Board Zone."* Your T4 then goes like this:

- You still hold Wind and Ghosts and two Energy. It banishes the Surfer (a 3).
- Your 8 attack the two Rearguards (4). Both die. Their best use of 4 kills one of your 3s, so a 5
  holds B, and it is 4 to 2. (Killing the Poro instead leaves a 6, which ties the Mechs and leaves B
  empty.)
- On their T4 they have nine runes (six, the one Sacrifice channelled, and two). The Mechs walk to B,
  6 against 5. Your 5 kill one Mech; their 6 kill both of yours.

**4 to 3**, with a Mech on B and two extra cards in their hand. Sacrifice has to come before the
Affliction resolves: at -4 the Forerunner is not Mighty, and nothing else of theirs at B is. That is
also why the Affliction goes first, alone. If it is answered, you lose six Energy and keep Wind and
Ghosts. `SFD-163 Deathgrip` (Order, E2, *"Kill a friendly unit."*) does the same at any time, for two
runes. In the combat it does not help them: killing a Rearguard to give the Surfer +2 leaves their 7
against your 8.

**Against the Conquer, one rune spent the turn before: a card hidden at B.** They control B from their
T2, so they may hide there (107.3.c), one card at most, 107.3.b: *"Each Facedown Zone has a maximum
occupancy of one card."* On your T4 it plays for nothing, 811.1.b: *"Beginning on the next turn, this
gains [Reaction] and you may play this, ignoring its base cost."* You have Focus first in your combat
and nothing to spend: all eight runes went on the pair. They play it when you pass. A hidden unit lands
in the combat, 811.1.d.1: *"A hidden permanent must be played to that battlefield."* A hidden spell's
target must be at B (811.1.d.2), and the attackers are. A unit that arrives joins the fight, 464.2.c.3.a:
*"If a Unit controlled by the Attacker or Defender becomes present at this Battlefield after this
moment, it will gain the Attacker or Defender designation during the Cleanup phase following the action
that caused it to become present, as appropriate for its controller."* Your 3 + 3 + 2 meet their
3 + 2 + 2, and each of these nine stops the Conquer:

- `OGN-213 Hidden Blade` (Order): *"Kill a unit at a battlefield. Its controller draws 2."* It kills a
  3 of yours (you draw 2). Your 5 kill two of theirs, their 7 kill both of yours, and B stays theirs. It
  breaks the banish too, played on the Forerunner in response to the Affliction.
- `SFD-017 Sudden Storm` (Fury): *"Deal 2 to a unit at a battlefield. If it's attacking, deal 4 to it
  instead."* 4 kills an attacking 3, and the same 5 against 7 follows. After the Affliction it also
  kills the Forerunner (143.2.a), in response to Wind and Ghosts.
- `UNL-003 Mischievous Marai` (Fury, M2): *"When you play me to a battlefield, deal 2 to an enemy unit
  here."* The 2 kills your Poro: your 6 against their 9.
- `UNL-028 Pyke, Dockside Butcher` (Fury, M2), `VEN-135 Kennen, Keeper of Balance` (Order, M2) and
  `SFD-154 Guards!` (Order) each add a 2. Guards! makes *"a 2 :rb_might: Sand Soldier unit token"*,
  and from facedown it lands at B, 811.1.d.3: *"If a hidden spell or a play effect of a hidden
  permanent causes you to play a unit, you must choose to play that unit at that battlefield."* Their 9
  kill all three of yours, and your 8 leave one of theirs. Kennen's stun needs two Energy, which they
  do not have; the body is enough.
- `VEN-117 Disciple of Shen` (Order, M1). Its [Shield 3] needs *"exactly one other unit you control"*
  at B, and there are three. 8 against 8: everything dies, and B goes uncontrolled, 466.5.b: *"If there
  are no Units remaining here controlled by any player, the Battlefield becomes Uncontrolled."*
- `OGN-220 Facebreaker` (Order): *"Stun a friendly unit and an enemy unit at the same battlefield."*
  423.1.b: *"A Stunned Unit does not contribute its might to damage in the combat damage step."* They
  stun a Rearguard and one of your 3s, so it is 5 against 5. Your 5 kill two of theirs and their 5 kill
  two of yours. Both keep a unit, so yours are recalled, 466.1.a.2: *"Insert “3d. Recall Attackers
  present at the Battlefield if Defenders are still present.”"*
- `UNL-013 Lotus Trap` (Fury): *"Choose a unit. Double all damage that would be dealt to it this
  turn."* On a Skulker, 2 assigned is lethal, 465.2.c.4.a: *"If the damage assigned to a Unit is
  modified to or replaced by an amount of damage larger than the initial value, the assigning player
  must choose the minimum applied value such that the unit would take lethal damage."* Their 7 go
  2 + 3 + 2, and all three of yours die. Your 8 kill all three of theirs, and B goes uncontrolled.

Two of the nine (Disciple, Lotus Trap) leave B uncontrolled and nothing for them to hold on their T4,
so it stays 3 to 2. The other seven leave them B, and they Hold it: 3 to 3.

**From hand, two combat breaks cost one rune.** A combat is a showdown, and [Action] is legal there,
308.1.a: *"Only cards and abilities with the Action or Reaction keywords can be played or activated in
a Showdown State."* `OGN-009 Hextech Ray` (Fury, E1 + 1 Power): *"[Action] (Play on your turn or in
showdowns.) Deal 3 to a unit at a battlefield."* It kills a 3 of yours: 5 against 7, and B stays
theirs. `UNL-014 Monster Harpoon` (Fury, E1 + 1 Power) deals 2, which kills your Poro: 6 against 7,
and their 7 kill both your 3s. Each is one rune, exhausted for the Energy and recycled for the Fury.

**The rest from hand cost two runes or more.** The walk left them one. Among the [Reaction] cards, at
two:
`SFD-001 Against the Odds` (+2 for each of your three units there, a 13 against 8),
`SFD-022 Long Sword` (+2, a 9), `SFD-151 Bonds of Strength` (+1 on two, a 9), `UNL-002 Inferna`
([Ambush], M1: 8 against 8, all die) and `VEN-126 Ki Barrier`. Ki Barrier prevents 7 on the Surfer,
so your 8 cannot kill it as well as both Rearguards; their 7 kill two of yours, and the one left
is recalled. Lotus Trap from hand is also two. At three: `OGN-206 Back to Back` (11), `OGN-207 Call to Glory` (10), and
four bodies that land in the combat. `OGN-241 Shen, Kinkou` is a 5 with [Shield 2] (12);
`SFD-025 Rengar, Pouncing`, `VEN-123 Soulspinner` and `UNL-021 Grim Apothecary` are 3s (10).
Apothecary can return the Forerunner to hand before the banish instead. At five or six:
`UNL-012 Lord Broadmane`, `UNL-176 Vi, Peacekeeper`, `VEN-017 Morgana, Vindictive` and
`UNL-178 Poppy, Defender of the Meek` (each a 5: 12). Poppy costs three less with 3 XP, and they have
none.

Among the [Action] spells, fifteen more break the combat from hand:

- At two runes, five kill your Poro or a 3: `OGS-003 Incinerate`, `VEN-010 Consuming Curse`,
  `SFD-162 Blood Money`, `UNL-007 Smite` and `OGN-008 Get Excited!` (with a card of cost 2 or more to
  discard).
- At three, three more: `OGN-024 Void Seeker` and `VEN-008 Ruthless Strike` kill a 3, and
  `UNL-155 Heroic Charge` stuns one (5 against 8).
- At four, one: `OGN-005 Disintegrate` kills a 3.
- At five, three: `SFD-164 Drag Under` and `OGN-014 Sky Splitter` kill a unit. Sky Splitter's E8 is
  less the Surfer's 3. `OGN-221 Imperial Decree` kills every unit that takes damage, so their 7 reach
  all three of yours.
- At six, three: `OGS-012 Blast of Power` kills a unit, `OGN-233 Grand Strategem` gives +5 to each of
  theirs, and `OGS-015 Recruit the Vanguard` puts four 1s at B.

**No pump saves the Forerunner from the banish.** At -4 it needs +8 to be a 4. The cheapest +8 from the
pumps above is two Call to Glory and a Long Sword: eight runes. The same pumps break the combat for two
or three.

**The scope of that verdict.** A Fury/Order deck plays only Fury, Order and Fury/Order cards
(103.1.b.1): **262** in `data/corpus_flat.txt`, counting three legends and two runes. On your turn,
with your spell on the chain, they can play only [Reaction] (309.1.a). In your combat, [Action] is
legal too (308.1.a). A card hidden at B gains Reaction, 811.6: *"A card that is Hidden gains Reaction
while facedown or played from facedown, and may be played any time a card with Reaction may be played
as a result."*

The scope is every one of those cards that meets five conditions:

- It is not banned.
- It is not a legend.
- It is legal in this deck's Signature slots, 103.2.d.2: *"All of the Signature cards must have the
  Champion tag that corresponds to the Champion Legend of the deck."* Their legend is a Vi.
- It prints [Reaction] somewhere in its text: on the card, on an ability, or, for Yeti Brawler, on its
  token.
- Or, instead of [Reaction], it has [Hidden], or prints [Action].

Counted by name, that is **61**:

- 27 print [Reaction] (26 once Hand of Noxus is out).
- 9 more have [Hidden].
- 27 print [Action] and neither of the other two (26 once Noxian Guillotine is out).

Two are out:

- `OGN-253 Hand of Noxus` is a legend, and this deck's legend is Piltover Enforcer.
- `OGN-254 Noxian Guillotine` is a Signature card tagged Darius (`data/cards.json`), so 103.2.d.2
  bars it from a Vi deck.

Draven, Vanquisher, the one banned card of the 262, has none of the three keywords.

A count by base code in `data/cards.json` finds 65, with legends already left out and Noxian Guillotine
still in. That is 62 here before the Guillotine. The difference is three reprints and two cards:

- **Three reprints, one name each.** `SFD-222 Seal of Rage`, `SFD-238 Seal of Unity` and
  `VEN-SP6 Lux, Crownguard` are reprints of names already counted, and the corpus folds them.
- **`OGN-018 Noxus Saboteur`, out.** It prints [Hidden] only in a rule about your cards and has no
  Hidden itself.
- **`UNL-161 Divining Shells`, in.** It is a gear, and its [Action] is an ability, which this count
  keeps.

The predicate is: played on your T4, does it stop the banish or your Conquer of B? **43 do:**

- Sacrifice and Deathgrip, against the banish only.
- The nine hidden cards.
- Hextech Ray and Monster Harpoon at one rune.
- Of the [Reaction] cards from hand: five at two runes, six at three, and four at five or six.
- The fifteen [Action] spells above.

One is not walked: `OGN-025 Blind Fury` (E4 + 2 Power, four runes) plays the top card of your deck for
them, so it depends on that card. The other seventeen do not break it:

- `OGN-033 Shakedown` deals 6 *"unless its controller has you draw 2"*. You choose the draw, and the
  combat is unchanged.
- `UNL-175 Tactical Retreat` turns one of their deaths into a recall. The rest die, and B is yours.
- `SFD-011 Angle Shot` needs an Equipment, and there is none.
- `UNL-166 Stalking Wolf` needs a Bird, Cat, Dog or Poro of theirs to kill, and they have none.
- `UNL-018 Yeti Brawler` prints [Reaction] only on its Gold token.
- `OGS-014 Lux, Crownguard`, `OGN-040 Seal of Rage` and `OGN-245 Seal of Unity` carry [Reaction] on an
  ability, not on the card. None is on the board.
- The hidden `SFD-004 Bushwhack` readies units that enter and makes an exhausted Gold token. Nothing
  enters your combat.
- `OGN-004 Cleave`, `SFD-003 Blood Rush` and `UNL-010 Vault Breaker` give [Assault], which counts only
  *"while it's an attacker"*, and theirs defend.
- `VEN-015 Decree of Rage` hits only a Calm unit, and yours are Mind and Chaos.
- `OGN-224 Salvage`, `SFD-166 Rally the Troops`, `OGN-022 Thermo Beam` and the gear
  `UNL-161 Divining Shells` touch no unit in the combat. The Shells' ability needs the gear on the
  board, and it is not.

Wind and Ghosts alone could not have dodged this. The Conquer breaks hit any attack into B, and
Sacrifice answers the bounce the same way, since the Forerunner is still a Mighty 6.

**How often.** If they run three of one of the twelve one-rune breaks, one is among the **7** cards they
have seen by your T4 (four opening, three draws; the same 7 by their T3, when they would hide it) in
**45.73%**. With two of the twelve (six cards) it is **72.23%**, and with three (nine cards) **86.76%**.
Each is 7 of 39.

## 6. Verdict

**Right about the reading; it leaves out the discount that decides when it can be cast, and the one rune
that undoes the turn.** The -10 opens Wind and Ghosts' banish on the Forerunner as the entry says
(143.2.b), and the banish keeps its [Deathknell] from firing (808.1.d). At the printed ten Energy that
is a T5 play going first, and only if nothing paid Power before it. One Eager Apprentice at a
battlefield makes it eight, which is T4. On T4 the banish beat the kill by a point, because a killed
Forerunner left six Might that retook B. It did not beat the bounce. Wind and Ghosts alone ended on the
same 4 to 2, for six Energy less, and with six more Might of yours on the board. What the Affliction
buys over the bounce is cards, not points. And the whole turn costs eight runes and goes away for one.
Sacrifice, played while the Forerunner is still Mighty, turns the banish back into the Deathknell. Any
of nine cards hidden at B the turn before keeps B through your attack, and so do Hextech Ray and
Monster Harpoon from hand. Since the pair spends every rune you have, you can answer none of them.

## 7. Not verified

I did not deal the channel order. The walk assumes six Mind and six Chaos runes, Prodigal Explorer's
two domains, in the twelve of Tournament Rules 402.1. Every card you play before T4 costs Energy only.
Wind and Ghosts' Chaos Power needs one Chaos rune among the eight channelled by T4. With six Mind, that
holds in **all 924 deals** (0 fail). Their Forerunner needs one Fury rune among their seven by their T3,
and Vi one among the eight left on their T4. Their deck has six Order, so both hold in **all 924 deals**.

Ten of the twelve one-rune breaks need no domain. Sacrifice costs Energy only, and hiding costs one
rune of any domain (811.1.b). So each holds in **all 924 deals**, given the spare rune the walk leaves
them on T2 and T3. Hextech Ray and Monster Harpoon need their one ready rune to be Fury. After the
Forerunner's Fury is recycled, their six runes on the board hold none when their first seven had
exactly one: that is **7 of 924 deals, 0.76%**. Pyke's optional Fury, Kennen's two Energy, and the
breaks from hand at two runes or more all need runes the walk does not leave them, so I give no rates
for them.

I did not walk these:

- A line that reaches the pair before T4. The obvious ingredients are untested: `OGN-104 Retreat`
  (*"Its owner channels 1 rune exhausted."*), `OGN-098 Energy Conduit`, and Scorn of the Moon's
  showdown Energy.
- The Explorer's draw in the Sacrifice branch.
- Holding the attack when a facedown card sits at B. B stays theirs then too: 3 to 2.
- A Might bonus on the target (the entry's own +4 case), going second, the mulligan, or 2v2.

Their hand holding no answer, and nothing hidden at B, is the walk's assumption; §5 prices it. The
probabilities in §4 and §5 count only the cards named.

## Leads

- The entry prices one use at *"10 Energy and 1 Chaos Power"* and never names a discount. One
  `OGN-084 Eager Apprentice` at a battlefield makes it E8 + 1 Power, which is T4 going first instead of
  T5. Two make it E6 + 1 Power (356.4.b, 356.4.e). Of the 15 Mind/Chaos cards that print a cost that is
  "less" or "reduced by", three reach these spells: the Apprentice, `VEN-055 Applied Researchers`
  (Empowered) and `SFD-146 Vex, Cheerless` (in combat only).
- The printed price assumes no Power paid on the turns before. A recycled rune leaves the board
  (161.2.b), so each Power paid on T1 to T4 pushes the printed pair from T5 to T6.
- The notable *"BANISH IS THE ONLY PERMANENT ANSWER"* names no scope. In Mind/Chaos,
  `OGN-203 Possession` (E8 + 3 Power, one card) takes control of the unit for good, which is also
  permanent and keeps the body.
- No notable compares the pair to its own second half. In the walk, Wind and Ghosts alone matched the
  pair's score for six Energy less. The banish's edge over the bounce is the card, and over a kill it is
  the [Deathknell] it skips.
- No step or notable names an answer. Played while the target is still Mighty, `UNL-173 Sacrifice` (one
  rune, Order) kills it in response to the Affliction (708) and fires the Deathknell anyway. After the
  Affliction resolves, any damage kills the target (143.2.a), so a hidden `SFD-017 Sudden Storm` does
  the same in response to Wind and Ghosts. The pair spends every rune of the turn it is cast, so
  whatever follows it is unprotected: in the walk, a card hidden at B the turn before kept B through
  the attack.
  - Of the 61 Fury/Order cards a Piltover Enforcer deck can play on your T4, 43 break it.
  - Twelve of them do it for one rune: Sacrifice, nine hidden cards, `OGN-009 Hextech Ray` and
    `UNL-014 Monster Harpoon`.
  - The Affliction resolving first means an answer to it costs you only the Affliction.
