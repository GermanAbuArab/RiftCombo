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
break is one rune: `UNL-173 Sacrifice`, in response to the Affliction, kills the Forerunner while it is
still Mighty and turns the banish into the Deathknell it was meant to deny.

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
legends and two runes included), 13 print a cost that is *"less"* or *"reduced by"*. Three can lower
these two spells: Eager Apprentice;
`VEN-055 Applied Researchers` once [Empowered] (*"Your spells cost :rb_energy_1::rb_rune_rainbow: less,
to a minimum of :rb_energy_1:."*: E6 and E2 with no Power, for E4 + E3 to set up); and `SFD-146 Vex,
Cheerless`, only while she is in combat. The other ten do not: `OGN-112 Kai'Sa, Evolutionary`
plays a spell from the trash, `SFD-141 Irelia, Graceful` discounts spells that choose her,
`SFD-149 Ezreal, Prodigy` discounts optional additional costs, `VEN-098 Stargazer` discounts [Flow]
from the trash, `SFD-076 Production Surge` and `VEN-059 Shock Blast` discount themselves, and
`OGN-195 Rhasa the Sunderer`, `VEN-050 Grumpy Rockbear`, `VEN-064 Plaza Guardian` and
`VEN-096 Shadowblade Lurker` discount themselves or their own ability.

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
Wind and Ghosts finds 3 or less and banishes it. They hold one ready rune and pass both times (that is
the walk's assumption; §5 prices it). Then the three walk as one move, 144.3: *"Players may perform
multiple Units' standard move simultaneously."* Your 8 kill Surfer 3, Rearguard 2 and Rearguard 2.
465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal to their summed
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

**The cheapest break is one rune: `UNL-173 Sacrifice`, in response to the Affliction.** Sacrifice
(Order, E1): *"[Reaction] (Play any time, even before spells and abilities resolve.) As an additional
cost to play this, kill a friendly [Mighty] unit. (A unit is Mighty while it has 5+ :rb_might:.) Draw 2
and channel 1 rune exhausted."* While the Affliction is on the chain the Forerunner is still a 6, 708:
*"A Unit "is Mighty" as long as its Might is 5 or greater."* They kill it as the cost, with the one rune
they kept. Their Deathknell fires (808.1.d), and the Affliction resolves on nothing, 359.3.e.2: *"A
target is illegal as the spell resolves if it no longer meets the targeting requirements of the spell,
or if it has changed Zones to or from a Non-Board Zone."* Your T4 then goes like this:

- You still hold Wind and Ghosts and two Energy. It banishes the Surfer (a 3).
- Your 8 attack the two Rearguards (4). Both die. Their best use of 4 kills one of your 3s, so a 5
  holds B, and it is 4 to 2. (Killing the Poro instead leaves a 6, which ties the Mechs and leaves B
  empty.)
- On their T4 they have nine runes (six, the one Sacrifice channelled, and two). The Mechs walk to B,
  6 against 5. Your 5 kill one Mech; their 6 kill both of yours.

**4 to 3**, with a Mech on B and two extra cards in their hand. Sacrifice has to come before the
Affliction resolves: at -4 the Forerunner is not Mighty, and nothing else of theirs at B is. That is
also why the Affliction goes first, alone. If it is answered, you lose six Energy and keep Wind and
Ghosts.

**The scope of that verdict.** A Fury/Order deck plays only Fury, Order and Fury/Order cards
(103.1.b.1): **262** in `data/corpus_flat.txt`, counting three legends and two runes. One of them is
banned (`SFD-020 Draven, Vanquisher`, not a [Reaction] card). On your turn, with your spell on the chain, they can play only cards with
[Reaction] (309.1.a), or a card hidden at B, which gains it, 811.6: *"A card that is Hidden gains
Reaction while facedown or played from facedown, and may be played any time a card with Reaction may be
played as a result."* That is **36** cards. 27 print [Reaction] somewhere in their text: on the card,
on an ability, or, for Yeti Brawler, on its token. Nine more have [Hidden]. The predicate is: played in
response to either spell on your T4, does it stop the banish? **Five do.**

- `UNL-173 Sacrifice` (E1), as above, and only in response to the Affliction.
- `SFD-163 Deathgrip` (Order, E2): *"Kill a friendly unit."* It works at any time, before or after the
  Affliction. That is two runes, and the walk left them one.
- `UNL-021 Grim Apothecary` (Fury, E3, [Ambush] to B) returns *"a friendly unit at a battlefield"* to
  hand, and Wind and Ghosts has no target. That is three runes, and it is a bounce they chose.
- `OGN-213 Hidden Blade` (Order), hidden at B: *"Kill a unit at a battlefield. Its controller draws
  2."* Played from facedown it costs nothing, 811.1.b: *"Beginning on the next turn, this gains
  [Reaction] and you may play this, ignoring its base cost."* Its target must be at B (811.1.d.2), and
  the Forerunner is. The cost was the one rune to hide it, on their T2 or T3, and the walk left them
  one spare on each.
- `SFD-017 Sudden Storm` (Fury), hidden at B: *"Deal 2 to a unit at a battlefield."* After the
  Affliction resolves, 2 kills a unit at -4 (143.2.a), so it is played in response to Wind and Ghosts.
  It costs the same one rune on an earlier turn.

The other 31 do not:

- **Pumps cannot climb back over 3.** At -4 the Forerunner needs +7. The pumps are
  `OGN-207 Call to Glory` (+3), `OGN-206 Back to Back` (+2), `SFD-151 Bonds of Strength` (+1, or +2
  with [Repeat]) and `SFD-022 Long Sword` (+2). The cheapest +7 is Call to Glory and two Long Swords:
  seven runes, against the one the walk left them. `SFD-001 Against the Odds` counts your units at B,
  and during your main phase there are none.
- **Kill-replacement does not see a banish.** `UNL-175 Tactical Retreat` replaces a death, and a banish
  is not one.
- **They can only target your units, or nothing useful.** `OGN-033 Shakedown` and the hidden
  `UNL-003 Mischievous Marai` choose an enemy unit. `VEN-017 Morgana, Vindictive` deals the damage
  already marked, which is none. `UNL-013 Lotus Trap` doubles damage, and none is dealt.
  `SFD-011 Angle Shot` needs an Equipment, and there is none. `OGN-220 Facebreaker` and
  `VEN-135 Kennen, Keeper of Balance` stun.
- **Bodies that change nothing.** These units arrive and the Forerunner is still banished:
  `OGN-241 Shen, Kinkou`, `SFD-025 Rengar, Pouncing`, `UNL-002 Inferna`, `UNL-012 Lord Broadmane`,
  `UNL-166 Stalking Wolf` (it needs a Bird, Cat, Dog or Poro, and they have none), `UNL-176 Vi,
  Peacekeeper`, `UNL-178 Poppy, Defender of the Meek`, `VEN-123 Soulspinner`, and the hidden
  `UNL-028 Pyke, Dockside Butcher` and `VEN-117 Disciple of Shen`. `UNL-018 Yeti Brawler` is in the
  count only because its Gold token prints [Reaction].
- **Nothing that touches the target.** `OGN-040 Seal of Rage`, `OGN-245 Seal of Unity`,
  `OGN-253 Hand of Noxus` and `OGS-014 Lux, Crownguard` add Energy or Power. The hidden
  `SFD-004 Bushwhack` and `SFD-154 Guards!` ready or make bodies. `VEN-126 Ki Barrier` prevents
  damage.

If they run three Sacrifice, one is among the **7** cards they have seen by your T4 (four opening,
three draws) in **45.73%**. With Sacrifice, Hidden Blade and Sudden Storm (nine cards, each one rune)
it is **86.76%**; with all five (fifteen), **97.75%**. Each is 7 of 39.

**The bounce has the same hole.** Sacrifice in response to Wind and Ghosts alone finds the Forerunner
at 6, Mighty. It is the same one rune, and it gives the same two Mechs.

## 6. Verdict

**Right about the reading; it leaves out the discount that decides when it can be cast, and the answer
that undoes it.** The -10 opens Wind and Ghosts' banish on the Forerunner as the entry says (143.2.b),
and the banish keeps its [Deathknell] from firing (808.1.d). At the printed ten Energy that is a T5 play
going first, and only if nothing paid Power before it. One Eager Apprentice at a battlefield makes it
eight, which is T4. On T4 the banish beat the kill by a point, because a killed Forerunner left six
Might that retook B. It did not beat the bounce. Wind and Ghosts alone ended on the same 4 to 2, for
six Energy less, and with six more Might of yours on the board. What the Affliction buys over the bounce
is cards, not points. And one rune of Sacrifice, played while the Forerunner is still Mighty, turns the
banish back into the Deathknell.

## 7. Not verified

I did not deal the channel order. The walk assumes six Mind and six Chaos runes, Prodigal Explorer's
two domains, in the twelve of Tournament Rules 402.1. Every card you play before T4 costs Energy only.
Wind and Ghosts' Chaos Power needs one Chaos rune among the eight channelled by T4. With six Mind, that
holds in **all 924 deals** (0 fail). Their Forerunner needs one Fury rune among their seven by their T3,
and Vi one among the eight left on their T4. Their deck has six Order, so both hold in **all 924 deals**.
Sacrifice and Deathgrip cost Energy only. Hidden Blade and Sudden Storm are hidden for any one rune
(811.1.b). So every break in §5 holds in every deal that leaves them the runes named.

I did not walk a line that reaches the pair before T4. The obvious ingredients are untested:
`OGN-104 Retreat` (*"Its owner channels 1 rune exhausted."*), `OGN-098 Energy Conduit`, and Scorn of
the Moon's showdown Energy. I did not walk the Explorer's draw in the Sacrifice branch, a Might bonus on
the target (the entry's own +4 case), going second, the mulligan, or 2v2. Their hand holding no answer
is the walk's assumption, and §5 prices it. The probabilities in §4 and §5 count only the cards named.

## Leads

- The entry prices one use at *"10 Energy and 1 Chaos Power"* and never names a discount. One
  `OGN-084 Eager Apprentice` at a battlefield makes it E8 + 1 Power, which is T4 going first instead of
  T5. Two make it E6 + 1 Power (356.4.b, 356.4.e). Of the 13 Mind/Chaos cards that print a cost
  reduction, three reach these spells: the Apprentice, `VEN-055 Applied Researchers` (Empowered) and
  `SFD-146 Vex, Cheerless` (in combat only).
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
  the same in response to Wind and Ghosts. Of the 36 Fury/Order cards they can play on your turn, five
  break it. The Affliction resolving first means an answer costs you only the Affliction.
