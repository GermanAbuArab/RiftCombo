# Play — the Valley's buff is the legend's, until two bodies land in a turn

Issue #332 (a slice of #200), 2026-10-13. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `valley-of-idols-buffed-statics`**, the Calm/Body ENGINE that plays `OGN-065 Wizened
Elder` and `OGN-125 Bilgewater Bully` to `UNL-218 Valley of Idols` and pays one Energy to buff each
as it lands, so the Elder is Might 6 and the Bully has [Ganking] the turn they are played. The entry
is right about the arithmetic. Walked as a game under `OGN-257 Blind Monk`, one of the legends it
lists, the Valley's buff is the one the legend places for the same Energy on any turn you play one
unit, and it adds a buff only on a turn you play two or more units there: two buffs in four turns
here. The buffs it placed changed which removal spell the opponent used, never whether one could be
used, and the Bully died to `OGN-213 Hidden Blade` before his [Ganking] could move him. And the
Valley is on the table in one Duel in three.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-13 at `ec2b4ef`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 45 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 57 (a hit on *first*), first in the list. The other entry of this slice is rank 58,
`SFD-146 Vex, Cheerless`'s combat discount, played in
[Vex taxes only the answers cast inside her fight](2026-10-13-vex-taxes-only-the-answers-cast-inside-her-fight.md).
The Elder appears as an opposing body in
[the garrison goes home on turn six and four bodies come back](2026-10-07-the-garrison-goes-home-on-turn-six-and-four-bodies-come-back.md),
unbuffed.

---

## 1. Needs

| | |
|---|---|
| **The battlefield** | `UNL-218 Valley of Idols`, selected for the game and **controlled** by you |
| **Legend** | Calm/Body is the only identity (103.1.b); here `OGN-257 Blind Monk`, with `OGN-151 Lee Sin, Centered` as Chosen Champion (103.2.a.2) |
| **The payoffs** | 3x `OGN-065 Wizened Elder` (Calm, E4, M4) and 3x `OGN-125 Bilgewater Bully` (Body, E6, M6) |
| **The bodies** | twelve 2-drops: three each of `OGN-052 Stalwart Poro`, `SFD-036 Lonely Poro`, `UNL-094 Gemhand Hunter` and `VEN-074 Legion Marauder` |
| **The cost** | one Energy per unit played at the Valley, and one unit there at all times |

The card text the play turns on:

- Valley of Idols: *"When a player plays a unit here, they may pay :rb_energy_1: to [Buff] it. (Give
  it a +1 :rb_might: buff if it doesn't have one.)"*
- Wizened Elder: *"While I'm buffed, I have an additional +1 :rb_might:."*
- Bilgewater Bully: *"While I'm buffed, I have [Ganking]. (I can move from battlefield to
  battlefield.)"*
- Blind Monk: *":rb_energy_1:, :rb_exhaust:: Buff a friendly unit. (If it doesn't have a buff, it
  gets a +1 :rb_might: buff.)"*
- Lee Sin, Centered (Body, E6, M6): *"[Accelerate] (You may pay :rb_energy_1::rb_rune_body: as an
  additional cost to have me enter ready.) Other buffed friendly units at my battlefield have +2
  :rb_might:."*

None of the units in this list has a Power cost, and the walk never pays [Accelerate], so the rune
deck's split does not change a single play below.

## 2. What the Valley buys, priced both ways

The entry's arithmetic stands. 703: *"Each Buff individually contributes +1 Might to a Unit."* A
buffed Elder is 4 + 1 + 1 = 6, and a buffed Bully is Might 7 with [Ganking]. 702.3.a: *"If a Buff is
added, or instructed to be added, on a Unit that already has a Buff, it is not placed instead."* So
each body takes one buff, and the Valley's offer is one Energy per new unit.

**Priced against nothing**, under a legend that does not buff (`SFD-193 Grandmaster at Arms`,
`UNL-191 Wuju Master` or `OGS-019 Wuju Bladesman - Starter`), every Valley buff is a buff the
legend would not place that turn.

**Priced against Blind Monk**, the legend places one buff a turn on any friendly unit, at base or at
any battlefield, for the same one Energy. Its ability carries no [Reaction], so it is used on your
own turn, 310.1.a: *"By default, cards can be played and abilities activated only when a player has
priority on their turn in a Neutral Open state."* That is the same turn the Valley buffs on. A unit
played to the Valley and left unbuffed is buffed by the legend in the same Main Phase. On a turn you
play one unit, the Valley's buff and the legend's are the same buff at the same price. On a turn you
play two units, the Valley places the second.

## 3. Where the bodies stand

Nothing can be played to the Valley until you control it. 355.2.a: *"By default, Valid locations
include the controller’s Base or a Battlefield the controller controls."* A unit has to walk there
first, so the Valley's first buff comes on T2.

A unit played there is at a battlefield from the moment it lands, and the opponent has a full turn
before it can move. 143.4: *"Units enter the Board exhausted."* Every removal spell the walked
opponent casts reads *"at a battlefield"*. Played to base, the same unit is out of reach of all of
them until it moves. 144.4.a: *"Units may move from their Base to a Battlefield."* The Bully's [Ganking] adds
the battlefield-to-battlefield leg, 144.4.c.1: *"Units with Ganking may use their Standard Move to
Move from Battlefield to Battlefield."* So the Bully played to the Valley defends it on their turn
and walks to B on yours. Played to base, he also reaches B on your next turn, and never defended the
Valley.

## 4. Their order: B, bodies, and a removal spell a turn

Mind/Order under `OGN-265 Herald of the Arcane`, whose token ability is idle in the walk. They take B
on their T2 and hold it, and they answer each body you put on the Valley with a spell. A unit at B
cannot reach A in one move without [Ganking] (144.4.a, 144.4.b), and they bring none. Their removal:

- `OGN-085 Falling Comet` (Mind, E5): *"[Action] (Play on your turn or in showdowns.) Deal 6 to a unit
  at a battlefield."*
- `OGN-213 Hidden Blade` (Order, E2 + 1 Power): *"[Hidden] (Hide now for :rb_rune_rainbow: to react
  with later for :rb_energy_0:.) [Action] (Play on your turn or in showdowns.) Kill a unit at a
  battlefield. Its controller draws 2."*
- `UNL-072 Crescent Strike` (Mind, E3 + 1 Power): *"[Action] (Play on your turn or in showdowns.)
  Choose a battlefield and an enemy unit there. Deal 4 to that unit and 1 to each other enemy unit
  there."*

The cheap way to cast Hidden Blade does not reach the Valley. 811.1.d.2: *"If a hidden spell or a
play effect of a hidden permanent chooses any targets, those targets must be chosen from among
options at that battlefield, unless the ability explicitly restricts targeting in a way that makes
this impossible."* They can hide it only at a battlefield they control, so from B it can target only
B. Against a unit on the Valley they pay the full E2 + 1.

## 5. The turns, going first

Calm/Body against Mind/Order, A is Valley of Idols and B is theirs. Your opening four are Stalwart
Poro, Lonely Poro, Wizened Elder and Bilgewater Bully; the T5 draw is a second Stalwart Poro.

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base: you do not control A, so the  0
                Valley cannot take it (355.2.a).
their T1        Pit Crew (E3) to base, on the 485.7 extra rune.
T2      4       Poro walks to A, Conquer: +1. Lonely Poro (E2) to A, the  1
                Valley's E1: buffed, M3. Blind Monk (E1) buffs Stalwart
                Poro: M3. All four spent. Valley buffs: 1, of which the
                legend could have placed 0.
their T2        Pit Crew walks to B, Conquer. Lecturing Yordle (E3, draw
                1) and Watchful Sentry (E2) to B. All five spent.
T3      6       Hold A: +1. Wizened Elder (E4) to A, the Valley's E1:     2
                M6. Blind Monk idle: no unbuffed body. One rune idle.
                Valley buffs: 1, the legend's for the same E1.
their T3        Hold B. Falling Comet (E5) on the Elder at A: 6 damage,
                Might 6, killed (143.2.a). A second Watchful Sentry (E2)
                to B. All seven spent.
T4      8       Hold A: +1. Bilgewater Bully (E6) to A, the Valley's E1:  3
                M7, [Ganking]. Blind Monk idle. One rune idle. Valley
                buffs: 1, the legend's for the same E1.
their T4        Hold B. Hidden Blade (E2 + an Order rune recycled) on the
                Bully at A: killed, you draw 2. A second Pit Crew and a
                second Lecturing Yordle (E3 each) to B. Eight of nine
                exhausted, the Order among them recycled: eight runes.
T5      10      Hold A: +1. Lee Sin, Centered (E6) from the Champion      4
                Zone to A, the Valley's E1: M7, and the two Poros are
                M5. Stalwart Poro (E2) to A, the Valley's E1: M5 under
                Lee. All ten spent. Valley buffs: 2, one of them the
                legend's.
their T5        Hold B. A second Hidden Blade (E2 + an Order rune
                recycled) on Lee Sin at A: killed, you draw 2.
```

Their points: 1 on T2, 2 on T3, 3 on T4, 4 on T5. After their T5 it is 4 to 4, the contested curve
of one Hold a turn on each side: the engine scores nothing, as the entry says.

**What the five Valley buffs bought.** Two of them, the Lonely Poro's on T2 and the second Stalwart
Poro's on T5, are buffs Blind Monk could not have placed, because each came on a turn two units
needed one. The other three, on the Elder, the Bully and Lee Sin, are the legend's buff, paid from the
Valley instead of the legend: the same Energy, on the same turn, on the same body.

**What the buffs did to their removal.** Unbuffed, the Elder is Might 4 and dies to Crescent Strike,
four resources. Buffed he is 6, and Falling Comet deals exactly 6, five resources: the buff cost them
one. Unbuffed, the Bully is Might 6 and dies to Falling Comet. Buffed he is 7, out of every damage
spell they cast, and Hidden Blade kills him for three resources and two cards to you. Lee Sin at 7
goes the same way. **The buff changed which spell they cast; it never left them without one**, because
every body it reaches stands at a battlefield, which is where all three of their spells reach.

**The Bully's [Ganking] never moved him.** He landed on T4 exhausted (143.4) and died on their T4,
before T5's Awaken Phase readied him. The turn in between is the price of the Valley: he was buffed
and at a battlefield. Played to base on T4 without the buff, he is out of reach of Hidden Blade,
Falling Comet and Crescent Strike alike, and he walks base to B on T5, the same move the [Ganking] would have
made from A. What [Ganking] adds is the trip back from B to A, or on to a third battlefield, which a
Duel does not have: 485.4, *"Battlefield Count: 2"*.

**What Lee Sin's static added.** On T5 the two Poros, buffed since T2, are Might 5, and so is the
Poro buffed that turn. A buffed Elder standing beside him would be 8, out of Falling Comet's reach as
well. Lee Sin is the reason to buff the 2-drops at all. He is also a Might-7 body at a battlefield,
and Hidden Blade kills him as it killed the Bully.

**How often this happens.** The Valley comes first. 485.5: *"Setup: Each player randomly selects one
(1) of their three (3) Battlefields. The other two are removed and will not be used for this game."*
Bringing it, you play on it in **one Duel in three**. Then the hand: the draw pile is **39** cards, the
40 of Tournament Rules 601.1.b less the Chosen Champion, which 103.2.a.1 places in the Champion Zone.
An Elder among the first **seven** cards seen (the opening four and the T1 to T3 draws) is **45.7%**; a
Bully among the first **eight** (to the T4 draw) is **50.8%**; both, **21.7%**, and **7.2%** of games
once the Valley's one in three is applied. With the walk's curve as well, a 2-drop among the first
five, a second among the first six and a third among the first eleven (the T5 draw, counting the two
cards Hidden Blade handed you on their T4), it is **9.2%** of deals and **3.1%** of games. Exact
enumeration over the 39-card pile with 3 Elder, 3 Bully, 12 2-drops and 21 other cards, no mulligan.

## 6. Breaks to

**The line breaks to `OGN-213 Hidden Blade`** (Order, E2 + 1 Power), the cheapest spell in
`data/cards.json` that kills one unit with no Might cap. Scope: the 233 spells by base code, the five
whose text reads *"Kill a unit"* with no Might limit (Hidden Blade, `UNL-186 Death from Below` E4 + 1,
`OGN-229 Vengeance` E4 + 2, `SFD-164 Drag Under` E5 + 1, `OGS-012 Blast of Power` E6 + 1). Two
others cost as much and are conditional: `OGN-033 Shakedown` lets you take two cards instead, and
`VEN-154 Public Execution` needs a friendly unit with more Might. The Valley's buff is worth nothing
against it, and every body the Valley buffs is at a battlefield by construction. Three resources a
body, and two cards to you each time.

**In Mind without Order it breaks to `OGN-085 Falling Comet`** (E5) for the Elder, whose buffed Might
is exactly the 6 it deals, and for an unbuffed Bully. A buffed Bully is out of reach of every Mind
spell that deals damage to one or two units: the most any of them deals is 6, from Falling Comet and
`OGN-105 Singularity`. `OGN-123 Unchecked Power` (E7 + 2) deals 12 to all units at battlefields,
yours included, and `OGS-022 Final Spark`'s 8 is Mind/Order. Under Lee Sin, Centered a buffed Elder
is 8.

**The Valley itself breaks to emptying it.** 323.6: *"Players lose control of any controlled
Battlefields without their Units occupying them if the turn is in an Open State and there is no
Showdown or Combat ongoing there."* With A empty after their turn, nothing is played there on yours
(355.2.a) until a unit walks in from base and conquers, and units played that turn go to base
unbuffed, where only Blind Monk reaches them. The walk kept two Poros on A throughout, so this never
bit.

**Under Blind Monk, playing to base avoids the break.** The legend's E1 buff reaches a unit in your
base, where none of the five *"Kill a unit"* spells above but Vengeance, nor Falling Comet or Crescent
Strike, can target it. Mind's `SFD-077 Rocket Barrage` (E4 + 1) can: *"Deal 4 to a unit in a base."*
It kills an unbuffed Elder there and not a buffed one.

## 7. Verdict

**Right about the statics, and the Valley's buff is a second buff a turn, not a first.** A buffed
Elder is Might 6 and a buffed Bully has [Ganking] on the turn they land, exactly as the entry says.
The play adds three things it does not state. Under Blind Monk, one of its own legends, the Valley's
buff is the legend's on any turn you play one unit and adds a buff only on a turn you play two or
more there: two of five in this walk. Every body it buffs stands at a battlefield through the
opponent's next turn, where `OGN-213 Hidden Blade` kills it for three resources whatever its Might,
so the Bully's [Ganking] arrives a turn before it can be used and died first here. And the Valley is
on the table in one Duel in three, so the line, with its two payoffs in hand by T3 and T4, is 7.2%
of games.

## 8. Not verified

No card in my line costs Power, so I did not deal my channel order; no rune split changes a play
here. Theirs: Hidden Blade needs one Order rune among their first nine on their T4 and a second by
their T5; with six Order in their twelve that never fails (the six non-Order runes cannot fill nine
places), and with three Order in twelve it fails in 1 of 220 deals for the first, 0.45%. I did not
check that `OGN-151 Lee Sin, Centered` is a champion unit: the card data does not carry that flag, so
the Chosen Champion is read from its Lee Sin tag (103.2.a.2) and its name. I did not walk Blind Monk
buffing at base and playing the payoffs there, which the §6 reading says avoids every removal the
walked opponent casts; the opponent attacking A with units from base; the Bully's [Ganking] on a turn
he survives; Match play, where 486.5 lets you choose the Valley (*"After this game, if a player won,
the Battlefields that were used are to be removed and not selected again for this Match."*); the
mulligan; or 2v2. The probabilities in §5 assume the opponent casts Hidden Blade on their T4, as in
the walk, for the third 2-drop's eleven cards.

## Leads

- The entry's last notable says the Valley *"is NOT GUARANTEED TO BE ON THE TABLE"* and gives no
  rate. In Duel, 485.5 selects one of your three battlefields at random, so a deck bringing it plays
  on it in one game in three; in a Match, 486.5 lets you choose it, and removes it after the first
  game somebody wins.
- The entry's fourth notable says a unit played to the Valley *"is already buffed rather than waiting
  for a buffer to find it next turn"*. Under `OGN-257 Blind Monk`, listed in its own `easy`
  prerequisite, the buffer finds it the same turn for the same Energy: the legend's ability is used in
  the same Main Phase (310.1.a). The Valley's edge over it is the second and later units played there
  in one turn.
- The entry's first notable says the other five *"buffed"* rows *"are cards that BUFF or that react to
  a buffed body dying"*. Two of the five do neither: `OGN-151 Lee Sin, Centered` (*"Other buffed
  friendly units at my battlefield have +2 :rb_might:"*) and `OGN-240 Sett, Kingpin` (*"I get +1
  :rb_might: for each buffed friendly unit at my battlefield"*) are statics that read other units'
  buffed state, and `OGN-063 Spirit's Refuge` carries one beside its buff (*"Friendly buffed units
  have [Deflect] if they didn't already."*). The count of two statics that read their own buffed
  state stands.
- Neither the entry's steps nor its notables say that every body the Valley buffs is at a battlefield
  through the opponent's next turn, where `OGN-213 Hidden Blade`, `OGN-085 Falling Comet` and
  `UNL-072 Crescent Strike` reach it and the same body played to base is out of their reach.
