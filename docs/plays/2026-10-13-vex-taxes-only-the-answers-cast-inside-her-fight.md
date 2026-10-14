# Play — Vex taxes only the answers cast inside her fight

Issue #332 (a slice of #200), 2026-10-13. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `vex-cheerless-void-seeker-combat-discount`**, the Chaos/Fury ENGINE in which
`SFD-146 Vex, Cheerless` takes one Energy and one Power off every friendly spell while she is in
combat, adds the same to every enemy spell, and `OGN-024 Void Seeker` is the [Action] that uses the
window. The entry is right about the arithmetic: Void Seeker drops from E3 + 1 Fury to E2, and the
floor of one Energy never binds it. Walked as a game, the window is narrower than the entry's steps
make it. Played to a battlefield you control she can only defend, so she goes to base and attacks a
turn later.
Combat damage comes only after the Showdown closes, so killing her in combat does not switch the
discount off while spells are still being cast. And the tax reaches only an [Action] or [Reaction]
cast inside her fight. Their main-phase removal is never taxed. In the walk the tax turned their
facedown Hidden Blade from free into one Energy and one Power, and they had both.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-13 at `ec2b4ef`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 45 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 58 (a hit on *in that same window*), second in the list. The other entry of this slice
is rank 57, `UNL-218 Valley of Idols` under the two *"While I'm buffed"* statics, played in
[the Valley's buff is the legend's, until two bodies land in a turn](2026-10-13-the-valleys-buff-is-the-legends-until-two-bodies-land.md). The same legend's two
readied runes pay a different off-turn spell in
[the Repeat counters only into two or three spare Energy](2026-10-13-the-repeat-counters-only-into-two-or-three-spare.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Fury/Chaos legend (103.1.b); here `OGS-017 Dark Child - Starter`, whose two readied runes are exactly the discounted Void Seeker |
| **The engine** | `SFD-146 Vex, Cheerless` (Chaos, E5 + 1 Power, M5), in combat |
| **The payoff** | `OGN-024 Void Seeker` (Fury, E3 + 1 Power, [Action]) |
| **A fight** | a battlefield where combat is ongoing and Vex holds a combat designation |

Vex is mono-Chaos and Void Seeker mono-Fury, so 103.1.b admits both under a Fury/Chaos legend.
Neither card is in `data/legality.src.json`.

The card text the play turns on:

- Vex, Cheerless: *"While I'm in combat, friendly spells cost :rb_energy_1::rb_rune_rainbow: less to
  a minimum of :rb_energy_1:, and enemy spells cost :rb_energy_1::rb_rune_rainbow: more."*
- Void Seeker: *"[Action] (Play on your turn or in showdowns.) Deal 4 to a unit at a battlefield.
  Draw 1."*
- Dark Child - Starter: *"At the end of your turn, ready up to 2 runes."* Its Chosen Champion has to
  carry the Annie tag (103.2.a.2); it is idle in the walk.

## 2. When she is in combat, and what one rune is worth

740.2.c: *"A unit is in combat if it is occupying a battlefield where combat is ongoing and has a
combat designation."* The designation arrives as combat opens, 464.2.c.3: *"Units at the Contested
Battlefield controlled by the Attacker or Defender gain the Attacker or Defender designation now, as
appropriate."* So she is in combat on your attack and on theirs, and in both only during the combat.
A combat is a Showdown State, 343.1: *"The turn is said to be in a Showdown State if a Showdown or
Combat is in progress."* And 343.1.a: *"Cards of all Categories, by default, cannot be played during
a Showdown State."* [Action] and [Reaction] are the permissions past that. 155 is the entry's way of
saying it for her partners, and it holds for the tax as well: a spell without [Action] or [Reaction]
is never cast while she is in combat, so it is never taxed.

The two halves of each cost are not paid the same way. 164.2.a: *"[E]: [Reaction] — Add [1]."*
164.2.b: *"Recycle this: [Reaction] — Add [C]."* Energy needs a ready rune; Power needs any rune,
exhausted or not, and costs it off the board, 161.2.b: *"When a Rune is Recycled it is returned to
the Rune Deck, not the Main Deck."* Undiscounted, Void Seeker is three ready runes and one Fury
recycled. Under Vex it is two ready runes and nothing recycled. 356.4.e: *"If a discount applies a
minimum cost, that minimum applies only to that discount."* and 356.6: *"Energy and Power costs
can't be reduced below 0."* The floor is one Energy and Void Seeker stops at two, so it never binds.
The tax is the same in reverse: one more ready rune and one more recycled, and only the Energy half
can be refused for lack of runes.

## 3. Where Vex stands

The entry's step 1 plays her *"at a battlefield that will be fought over"*. A battlefield you
control is a dead end for her. 144.4.a: *"Units may move from their Base to a Battlefield."* 144.4.b:
*"Units may move from a Battlefield to their Base."* She has no [Ganking], so from A she cannot reach
B; she can only defend A, and only if they attack it. She also stands at a battlefield on their turn,
where any *"at a battlefield"* removal reaches her untaxed in their Main Phase.

Played to base she enters exhausted (143.4: *"Units enter the Board exhausted."*) and attacks B on
the next turn. Nothing that reads *"at a battlefield"* reaches her in base. The first time such a
spell can be cast at her is inside her own combat, where she taxes it.

## 4. Their order: B, bodies, and a Hidden Blade

Mind/Order under `OGS-021 Lady of Luminosity - Starter`, whose *"When you play a spell that costs
:rb_energy_5: or more, draw 1."* is idle in the walk. They take B, build it, and hold one answer:
`OGN-213 Hidden Blade` (Order, E2 + 1 Power): *"[Hidden] (Hide now for :rb_rune_rainbow: to react
with later for :rb_energy_0:.) [Action] (Play on your turn or in showdowns.) Kill a unit at a
battlefield. Its controller draws 2."* Hidden at B, it is played later *"ignoring its base cost"*
(811.1.b), and 356.1.b.3: *"Further additional costs and/or cost increases applied in subsequent
steps may raise the card's Total Cost above zero."* Vex's tax is one of those. From facedown it may
only choose a target at B (811.1.d.2), and B is where Vex attacks.

## 5. The turns, going first

Fury/Chaos against Mind/Order. Your rune deck is six Fury and six Chaos; theirs six Mind and six
Order. Your opening four are Legion Rearguard, Shipyard Skulker, Vex and Void Seeker; the draws
are bodies for later turns. Theirs hold Daring Poro, Pit Crew, Vanguard Sergeant and Hidden Blade.

```
turn    runes   your turn                                                 points
T1      2       Legion Rearguard (E2) to base. End: Dark Child readies    0
                both runes.
their T1        Daring Poro (E2) to base, on the 485.7 extra rune.
T2      4       Rearguard walks to A, Conquer: +1. Shipyard Skulker       1
                (E3) to base. One rune left.
their T2        Daring Poro walks to B, Conquer. Pit Crew (E3) to B.
                Two runes spare.
T3      6       Hold A: +1. Vex (E5 + 1 Chaos) to base: five exhausted,   2
                one Chaos recycled. Five runes, one ready. Skulker stays
                in base. End: Dark Child readies two: three ready.
their T3        Hold B. Vanguard Sergeant (E4) to B. Hidden Blade hidden
                at B for its rainbow: an exhausted rune recycled. Six
                runes, three ready. Nothing of theirs can reach A.
T4      7       Hold A: +1. Vex and Skulker move base to B together:      3
                combat, you attack and have Focus. Void Seeker on the
                Sergeant for E2 under Vex, nothing recycled: it dies,
                draw 1. Their Hidden Blade from facedown on Vex: base
                cost ignored, tax E1 + a rainbow, one ready rune
                exhausted and one recycled. Vex dies; you draw 2. Both
                pass. Skulker (3) against Pit Crew and Daring Poro (5):
                Skulker kills Pit Crew and dies. They keep B. Main
                Phase: five ready runes, two more bodies to A. End:
                Dark Child readies two.
their T4        Hold B. Seven runes: a second Sergeant (E4) and Daring
                Poro (E2) to B. One spare.
```

Their points: 1 on T2, 2 on T3, 3 on T4. After their T4 it is 3 to 3, the contested curve of one
Hold a turn on each side: the engine scores nothing, as the entry says.

**Focus decides who spends inside the window first.** You moved in, so you are the Attacker, and
464.2.d: *"3. The Attacker gains Focus."* Void Seeker resolves before they act, and 347.1.b: *"When
that Chain closes, Focus passes to the next Player in Turn Order."* Their Hidden Blade comes next,
taxed.

**Why they paid.** Had they passed, 465.2.c.3 would still let them kill her: *"Units must have lethal
damage assigned to them in full before damage is assigned to a different Unit."* Five defending
Might put five on Vex, and your eight kill Pit Crew and Daring Poro: you keep Skulker and conquer B.
The Blade kills her before damage, and their five then beat Skulker's three: they keep B. One Energy
and one Power bought the battlefield.

**Killing her in combat does not end the discount mid-combat.** 465.2: *"1. When the Showdown
closes, Attackers and Defenders resolve Combat Damage at the Battlefield that was attacked, using
their current Might."* The spells of a combat are cast before its damage. Lethal on Vex ends her for
the next combat, not this one. To switch the discount off while spells are still being cast they
need a spell, and that spell is taxed.

**What the tax cost them is one ready rune and one rune off the board.** Without Vex the facedown
Blade is free: the rainbow to hide it was paid on their T3. Under the tax it took one of their three
ready runes and recycled a second. They held three because a 4-drop on seven runes left three over.
Had they spent down to zero ready runes, the Energy half could not be paid (164.2.a needs a ready
rune) and the Blade would have stayed facedown. That is the whole of what the tax can refuse: a
spell when they have fewer ready runes than its taxed Energy. Its Power half is always payable while
they have a rune on the board.

**What the six resources would have bought.** The same six runes on T3 are two Shipyard Skulkers
(E3 each), nothing recycled. On T4 three Skulkers attack B: nine Might. Void Seeker at full price,
E3 + 1 Fury, kills the Sergeant. The facedown Blade, now free, kills a Skulker and you draw 2. Six
attacking Might against five: they put three on one Skulker and two on another, your six kill Pit
Crew and Daring Poro, and a Skulker survives. You conquer B: **4 to 2 after your T4 instead of 3 to
2**. On this board Vex's discount and tax cost them two resources and saved you two, and her body
did less than two 3-drops.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 601.1.b less
the Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **7**
cards by T3 (four opening, three draws) and **8** by T4. With the entry's one Vex and one Void
Seeker, Vex by T3 is **17.95%** and both, Vex by T3 and Seeker by T4, **3.31%**. With three of each,
**45.73%** and **21.71%**. Going second, they have seen **7** cards by their T3: with three Hidden
Blade among their 39, they hold one in **45.73%** of games, and one of three Blades or three
`VEN-131 Decree of Unity` in **72.23%**.

## 6. On their turn: the window Dark Child opens

If Vex survives at a battlefield and they attack her there, she is a Defender in combat on their
turn. Void Seeker is playable there: 806.1.c.1: *"This can be played during showdowns on any
player's turn."* Spend every rune on your turn and Dark Child still readies two, which is exactly
the discounted E2. At full price the Seeker needs three ready runes, so the legend alone does not
pay it. This is where the legend and Vex meet.

They do not have to give you that window. They can kill her in their Main Phase, before any combat,
where 312.2.a gives them priority: *"When the turn is in a Neutral Open State during their Main
Phase."* No combat is in progress then, so she is not in combat and nothing they cast is taxed.

## 7. Breaks to

**In their colours, the line breaks to `VEN-131 Decree of Unity`** (Order, E2 + 1 Power): *"Kill an
enemy Chaos (:rb_rune_chaos:) unit or gear."* It names no location, so it kills her in base, and it
has no [Action], so it is cast only in their Main Phase, where she is never in combat. Three
resources against her six, and no card for you. Mind/Order's other three-resource answer is Hidden
Blade, which needs her at a battlefield: in their Main Phase it is untaxed and draws you 2, and
inside her combat it is taxed as walked.

The scope of *"cheapest"*: a sweep of the 1,042 base codes in `data/cards.json` for text that kills a
unit, deals 5 or more, or deals damage equal to something returns 91 cards, read by hand. None at
two resources or less kills an enemy Might-5 unit without a condition (`SFD-162 Blood Money` stops
at Might 2, `VEN-154 Public Execution` needs a friendly unit with more Might). At three there are
four: Decree of Unity and Hidden Blade in Order, `VEN-008 Ruthless Strike` in Fury (E3 and a
discard, at a battlefield), and `OGN-033 Shakedown` in Fury, which deals 6 *"unless its controller
has you draw 2"*, so you choose.

**The cheapest break costs no card at all: don't fight where she is.** She discounts only in
combat, and she has no [Ganking], so she can attack only the battlefield you do not hold. An
opponent who leaves B lightly held and takes the points elsewhere gives her nothing to fight.

## 8. Verdict

**Right about the numbers, narrower about the window.** Void Seeker under Vex is E2 and nothing
recycled, and the floor never binds it (356.4.e, 356.6). The play adds three things the entry does
not state. She has to start in base to attack, because from a battlefield you control she cannot
move to the other one (144.4). Combat damage comes after the Showdown closes (465.2), so lethal on
her ends nothing in that combat. And the tax reaches only an [Action] or [Reaction] cast inside her
fight: their Main Phase removal is untaxed, and in Mind/Order Decree of Unity kills her anywhere for
three resources. The tax refuses a spell only when they have fewer ready runes than its taxed Energy.
In the walk it turned a free facedown Blade into one Energy and one Power, and they had both.

## 9. Not verified

I did not deal the channel order. Vex on T3 needs one Chaos among your first six runes: with six
Chaos in the twelve it fails in **1 of 924 deals, 0.11%**; with four, **28 of 924, 3.03%**. Void
Seeker under Vex needs no Power, so its domain never fails; at full price it needs a Fury rune on the
board to recycle. Their facedown Blade needs no Order at all: the rainbow to hide it and the tax's
rainbow are any domain. Decree of Unity needs one Order among their first seven runes, which six
Order always meets (0 of 792 deals); with three Order it fails in **36 of 792, 4.55%**. Their three
ready runes on your T4 are a play choice, not a deal. Whether a card is a champion unit is not in the
card data, so I did not price `OGS-014 Lux, Crownguard` as their Chosen Champion: its
*":rb_exhaust:: [Reaction] — [Add] :rb_energy_2:. Use only to play spells."* would pay the tax's
Energy half, the only half that can refuse a spell. I did not walk a second Void Seeker in the same
combat, the mulligan, or 2v2. The probabilities in §5 count only cards in hand at the turn named.

## Leads

- The entry's step 1 reads *"Play Vex, Cheerless (5 Energy + 1 Chaos Power) at a battlefield that
  will be fought over"*. Played to a battlefield you control, she cannot attack the other one
  (144.4.a, 144.4.b, no [Ganking]), and on their turn she stands where Hidden Blade reaches her
  untaxed. Played to base she enters exhausted (143.4) and attacks the next turn.
- The entry's fourth notable says *"465.2.c.3 lets the opponent spend lethal on her first to switch
  the discount off mid-combat"*. Combat damage is dealt only when the Showdown closes (465.2), after
  every spell of that combat. To switch the discount off while spells are being cast they must kill
  her with a spell, and that spell pays the tax.
- The entry's first notable calls Void Seeker *"the biggest Energy-plus-Power one available to a
  Chaos/Fury legend"*. Of the 40 Fury and Chaos [Action] or [Reaction] spells in `data/cards.json`,
  four cost more in total: `OGN-025 Blind Fury` (E4 + 2), `OGN-022 Thermo Beam` (E5 + 2),
  `OGN-014 Sky Splitter` (E8 + 1) and `OGN-203 Possession` (E8 + 3). Size does not matter here: 14
  of the 40 cost at least E2 + 1 Power and take the full two resources off.
- The entry's third notable prices the tax as *"a cost increase applied inside the Showdown their
  attack opened"*. 343.1.a filters the tax as 155 filters her partners: it reaches only their
  [Action] and [Reaction] spells. Their Main Phase removal is untaxed, and `VEN-131 Decree of Unity`
  (Order, E2 + 1 Power) kills her anywhere, base included. Of the tax's two halves only the Energy
  needs a ready rune (164.2.a); the Power half is paid by recycling any rune (164.2.b).
