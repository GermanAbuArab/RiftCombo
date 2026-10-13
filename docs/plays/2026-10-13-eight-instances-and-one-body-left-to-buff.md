# Play — eight instances, and one body left to buff

Issue #329 (a slice of #200), 2026-10-13. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `svellsongur-ivern-nurturer-optional-draw`**, the Calm ENGINE that puts three
`SFD-059 Svellsongur` on `UNL-051 Ivern, Nurturer` for eight instances of his Hold trigger: every
Hold looks at 24 cards, draws as many units as you like and places up to eight buffs. The entry is
right that the trigger survives being multiplied, because every clause in it is optional. Walked as
a game, the eight instances arrive at the start of T6, and by then the board holds one unbuffed body
and the runes pay for three of the units drawn. A buff cannot reach a unit drawn by the same Hold,
and a buffed unit cannot take a second one, so each Hold can buff only the bodies played since the
last one. Four instances already cover that. The third Svellsongur costs the three bodies that would
have used the buffs.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-13 at `34bd651`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 47 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 54 (a hit on *first*), first in the list. The other entry of this slice is rank 56,
`OGS-017 Dark Child`'s [Repeat] tax, played in
[the Repeat counters only into two or three spare Energy](2026-10-13-the-repeat-counters-only-into-two-or-three-spare.md).
Svellsongur's doubling on a scoring carrier is walked in
[each Svellsongur is worth exactly what the board is missing](2026-10-05-each-svellsongur-is-worth-the-deficit.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Calm in its pair (103.1.b); here `SFD-189 Fire Below the Mountain` (Calm/Mind), whose rainbow pays one gear Power a turn |
| **The payoff** | `UNL-051 Ivern, Nurturer` (Calm, E5 + 1 Power, M4), at a battlefield you control |
| **The multiplier** | 3x `SFD-059 Svellsongur` (Calm gear, E3 + 1 Power, M+0, [Equip] 1 Energy + 1 Calm Power) |
| **The fuel** | Bird, Cat, Dog and Poro units: 21 of the 40 cards here, nearly all 2-drops |
| **Bodies** | one unbuffed friendly unit for every buff you want, **on the board when the Hold resolves** |

The card text the play turns on:

- Ivern, Nurturer: *"When you play me or when I hold, look at the top 3 cards of your Main Deck. You
  may reveal a unit from among them and draw it. Recycle the rest. Then if you revealed a Bird, Cat,
  Dog, or Poro, do this: [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have
  one.)"*
- Svellsongur: *"[Equip] :rb_energy_1::rb_rune_calm: (:rb_energy_1::rb_rune_calm:: Attach this to a
  unit you control.) As this is attached to a unit, copy that unit's text to this Equipment's effect
  text for as long as this is attached to it."*
- Fire Below the Mountain: *":rb_exhaust:: [Reaction] — [Add] :rb_rune_rainbow:. Use only to play
  gear or use gear abilities."* The rainbow pays a Calm cost, 135.2.e.5.b: *"When Added to a player’s
  Rune Pool, [A] can be spent to pay a Power cost of any Domain."* Its Chosen Champion has to carry
  the Ornn tag (103.2.a.2); `SFD-058 Ornn, Blacksmith` is idle in the walk.

## 2. What eight instances are, priced both ways

The entry's arithmetic stands on R6 = A (Svellsongur copies the carrier's **current** text) and
434.1.c: *"The Top-Most card has all Effect Text of all cards Attached to it appended to its Rules
Text."* The first gear copies one sentence, the second copies the two that Ivern then carries, and
the third copies four: **2^v instances for v gears**, eight with three. Each gear doubles the count,
so losing any one of them halves it.

Whether eight identical appended sentences are eight abilities or one is OQ-SVELL-CAP, which no
paragraph of the Core Rules settles. As recorded it is about a capped trigger, and Ivern's carries
no *"each turn"*, so the catalogue's per-instance count is the reading this play walks. Read the
other way, the gears add nothing and Ivern looks at three cards a Hold whatever v is. Everything
below is per instance.

## 3. Where Ivern stands

His trigger reads *"when I hold"*, so he has to be at a battlefield you control when 315.2.b.2 runs:
*"1. The Turn Player Holds all Battlefields they Control."* He does not have to walk there. 355.2.a:
*"By default, Valid locations include the controller’s Base or a Battlefield the controller
controls."* Played to A on T3, he holds at the start of T4. Played to base, he enters exhausted
(143.4: *"Units enter the Board exhausted."*), walks on T4 after the Hold has already happened, and
first holds on T5. Walking costs one Hold.

The gear is the other way round. 148.1.a.1: *"Gear can only be played to a player's Base unless an
effect specifies otherwise."* Svellsongur goes to base, and its [Equip] reaches Ivern at A. Its Might
Bonus is +0, so the gears leave him at 4 and a buff is the only thing that moves him.

## 4. Their order: B, bodies, and a removal spell a turn

Fury/Chaos under `SFD-185 Glorious Executioner`, whose *"When you win a combat, draw 1"* is idle in a
game with no combat. They take B on their T2 and build it, and while their bodies hold B they answer
A with spells. A unit at B cannot reach A in one move: a Standard Move goes from base to a
battlefield or back (144.4.a, 144.4.b). Their removal is `OGN-024 Void Seeker` (Fury, E3 + 1 Power):
*"[Action] (Play on your turn or in showdowns.) Deal 4 to a unit at a battlefield. Draw 1."* Four
damage kills every body here except Ivern after a buff.

## 5. The turns, going first

Calm/Mind against Fury/Chaos. Your rune deck is eight Calm and four Mind; nothing in the list pays
Mind Power. Your opening four are Stalwart Poro, Mutated Mouser, Lonely Poro and Ivern. The draws are
Svellsongur on T1, Steel Paws on T2, and Svellsongur on T3 and T4.

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base.                               0
their T1        Shipyard Skulker (E3) to base, on the 485.7 extra rune.
T2      4       Poro walks to A, Conquer: +1. Mutated Mouser and Lonely   1
                Poro (E2 each) to A. All four spent.
their T2        Skulker walks to B, Conquer. Mystic Poro (E2) and a
                second Skulker (E3) to B. All five spent.
T3      6       Hold A: +1. Ivern (E5 + 1 Calm) played to A: five         2
                exhausted, one of them a Calm recycled. Five runes, one
                ready. His play trigger: a Poro among the top three,
                revealed and drawn, the other two recycled. Buff Ivern:
                M5. Steel Paws (E1) to A on the last rune.
their T3        Hold B. Void Seeker on Stalwart Poro at A: it dies, they
                draw 1. Traveling Merchant (E2) to B. Six runes, two
                ready.
T4      7       Hold A: +1. Ivern's Hold, one instance: a unit drawn,     3
                buff Lonely Poro (M3). Svellsongur (E3, its Calm Power
                from the legend's rainbow) and its [Equip] on Ivern (E1
                + a Calm recycled): two instances. A second Svellsongur
                (E3 + a Calm recycled) to base. All seven exhausted, two
                recycled: five runes.
their T4        Hold B. Void Seeker on Lonely Poro: it dies, they draw 1.
                A third Skulker (E3) and a second Mystic Poro (E2) to B.
                All eight spent, one Fury recycled.
T5      7       Hold A: +1. Two instances: two units drawn, buffs on      4
                Mouser (M2) and Steel Paws (M1). [Equip] the second
                Svellsongur (E1 + the rainbow): four instances. The
                third (E3 + a Calm recycled) and its [Equip] (E1 + a
                Calm recycled): eight. A Lonely Poro (E2) to A on the
                last two runes. All seven exhausted, two recycled: five
                runes.
their T5        Hold B. Void Seeker on Mouser: it dies, they draw 1. A
                second Traveling Merchant and a third Mystic Poro (E2
                each) to B. Two runes spare.
T6      7       Hold A: +1. Eight instances: 24 cards looked at, up to    5
                eight units drawn. One unbuffed body on the board, the
                Lonely Poro played on T5: one buff. Main Phase: three
                2-drops on seven runes.
```

Their points: 1 on T2, 2 on T3, 3 on T4, 4 on T5. After your T6 it is 5 to 4, the contested curve
of one Hold a turn on each side: the engine scores nothing, as the entry says.

**What the eight instances bought on T6 is one buff and three plays.** Steel Paws and Ivern are
buffed, the buffed Mouser and Lonely Poro are dead, and the only unbuffed body is the Poro from T5.
At most one of the eight buffs lands; the rest find only buffed bodies, 702.3.a: *"If a Buff is
added, or instructed to be added, on a Unit that already has a Buff, it is not placed instead."* The units drawn wait in hand: three
from T3 to T5, up to eight more on T6, and seven runes to play them.

**A buff never reaches a unit the same Hold drew.** The Hold happens in the Beginning Phase, and no
unit is played there. 310.1.a: *"By default, cards can be played and abilities activated only when a
player has priority on their turn in a Neutral Open state."* While the instances are on the chain the
turn is in a Closed State, and once the chain is empty the open-state priority is a Main Phase one,
312.2.a: *"When the turn is in a Neutral Open State during their Main Phase."* And 702.3 allows one
buff on a unit at a time, so a body takes one and is done. Together that caps every Hold's buffs at the unbuffed bodies played
since the last Hold, minus whatever the opponent killed. On this board that is one or two a turn.

**What the third Svellsongur cost is three bodies.** Its E3 + 1 and E1 + 1 on T5 are six runes, two
of them recycled. Stop at two gears and the T5 Main Phase is the second [Equip] on the rainbow and
three 2-drops on the six runes left, with nothing recycled. Their Void Seeker kills one of the three,
and on T6 four instances meet two unbuffed bodies: **two buffs where eight instances placed one**,
four units drawn, nine runes instead of seven, and two more bodies on A. The third Svellsongur stays
in hand, ready to replace a gear they send back (§6).

**How often this happens.** The gears are the bottleneck: Ivern's look finds units and Svellsongur is
a gear. All three among your first nine cards, which this schedule needs, is **0.85%** of games
without a mulligan. With the entry's one Ivern also among the first seven it is **0.11%**, and
**0.29%** with three Ivern. The two-gear line, one Svellsongur by T4 and two by T5, is **12.2%** on the
gears alone, **1.77%** with one Ivern and **4.67%** with three. The play trigger finds a tag among
the top three about nine times in ten here (17 of the 33 cards left after T3).

## 6. Breaks to

**The line breaks to `VEN-008 Ruthless Strike`** (Fury, E3, no Power): *"[Action] (Play on your turn
or in showdowns.) As an additional cost to play this, you may discard 1. Deal 3 to a unit at a
battlefield. If you paid the additional cost, deal 5 to it instead."* Ivern stands at a battlefield
by construction, a buff takes him to 5 and no further, and Svellsongur adds +0. Three Energy and a
card, on their T3, and the gears never have a carrier. Unbuffed, he dies to less:
`VEN-015 Decree of Rage` (Fury, E1 + 1 Power): *"[Action] (Play on your turn or in showdowns.) This
can't be countered. Deal 4 to an enemy Calm (:rb_rune_calm:) unit."* It reaches him in your base as
well, and it is why the play trigger's first buff goes on Ivern.

**Killing him does not take the gears.** 719.5: *"When a Top-Most Card changes zones from a board
zone to a non-board zone, all Attached cards Detach from it, remaining in their current zones."* Then
457.1: *"When an un-attached non-Unit Gear is created or played at a battlefield, or is at a
battlefield for any other reason, it is Recalled to its controller's base during the next Cleanup."*
The rule's own example is this case. The Svellsongurs sit in your base, and what the removal
destroyed is Ivern and the [Equip] costs. Rebuilding is a second Ivern (E5 + 1) and E1 + 1 Calm for
each re-attach, and with the entry's one Ivern there is no second.

**Each gear breaks to `SFD-135 Factory Recall`** (Chaos, E1): *"[Action] (Play on your turn or in
showdowns.) Return a gear to its owner's hand."* One Energy, at Action speed, halves the instances,
and replaying the gear costs you E3 + 1 and its [Equip] E1 + 1, of which the rainbow pays one Power.
`SFD-005 Detonate` (*"Kill a gear. Its controller draws 2."*) takes a gear for good for two
resources and pays you two cards.

## 7. Verdict

**Right about the trigger, and the ceiling is the board, not the copy limit.** Every clause in
Ivern's trigger is optional, so eight instances never Burn Out and never force a draw. The play adds
three things the entry does not state. The buffs can land only on bodies already on the board when
the Hold resolves (310.1.a, 312.2.a), each takes one (702.3.a), and so a Hold buffs at most the
bodies played since the last one: one or two a turn against an opponent removing them. The draws are
capped by the runes, about three plays a turn here, and two gears already draw four. The third gear's
six runes buy instances with nothing to do, and spent on bodies instead they leave four instances
with **two buffs where eight placed one**. And Ivern is the piece that breaks: Might 5 at most, at a
battlefield by construction, and `VEN-008 Ruthless Strike` kills him for three Energy and a card.

## 8. Not verified

I did not deal the channel order. The Calm Power the schedule recycles is one by T3, three by T4 and
five by T5, among the first six, eight and ten runes; with eight Calm in the twelve it never fails
(0 of 495 deals), and with an even six and six it fails in **210 of 924 deals, 22.7%**. The two-gear
line needs one, three and three, and fails in 28 of 924 deals with six Calm, 3.0%, never with eight.
Their Void Seeker needs one, two and three Fury among their first seven, nine and eleven runes, which
six Fury always meets. Whether eight identical appended triggers are eight abilities is OQ-SVELL-CAP,
open; per ability the gears do nothing. Whether a card is a champion unit is not in the card data, so
I did not price `UNL-195 Green Father` with Ivern as its Chosen Champion (103.2.a.2, 419.1.a), which
would put him in every game at the cost of the rainbow. I did not walk `SFD-058 Ornn, Blacksmith` or
`SFD-041 Apprentice Smith` digging for the gears, Ivern's Hold seeing recycled cards again once the
deck is shorter than the looks, the mulligan, or 2v2.

## Leads

- The entry's step 1 reads *"Play Ivern, Nurturer (E5 + 1 Calm Power) and walk him to a battlefield
  you control"*. 355.2.a plays him there directly, and the walk costs a Hold: played to base he
  enters exhausted (143.4) and first holds a turn later.
- The entry's fourth notable reads *"Eight instances therefore place up to EIGHT buffs, one each on
  eight different unbuffed bodies"*. Those bodies have to be on the board when the Hold resolves: no
  unit is played in the Beginning Phase (310.1.a, 312.2.a), so the units the Hold draws cannot take
  its buffs, and 702.3.a leaves a buffed body unable to take another. Each Hold buffs at most the
  bodies played since the last; on the walked board, one on T6.
- The entry's cost notable totals *"17 Energy and 6 Calm Power"*. The 17 Energy includes Ivern's
  E5; the Calm Power leaves out his 1. With it, the line is E17 + 7 Calm Power.
- The entry's refutation (b) says *"a removal spell on him erases the whole investment at once"*.
  The gears survive (719.5, then 457.1 recalls them to base); what goes is Ivern and the three
  [Equip] costs. The cheapest card for it is `VEN-008 Ruthless Strike` (E3 and a discard), since a
  buff takes him only to Might 5.
