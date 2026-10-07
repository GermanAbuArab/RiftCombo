# Play — Time Warp comes a turn early, and a one-rune counter takes it

Issue #307 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `promising-future-time-warp-queue`**, the Mind ENGINE in which `OGN-115 Promising Future`
digs five cards deep and plays `OGN-122 Time Warp` from among them without its ten Energy, so the extra
turn costs five Energy and five Mind Power. The entry is right about the discount and right that Riot
worked this exact pair at 738. Walked as a game, the discount moves the extra turn from T5 to T4 for
one more rune off the board, and in the walk that turn is worth one point, a card and a Main Phase.
Two things go wrong. Every Promising Future hands the opponent their best card of five first, for
nothing. And Time Warp is always the second spell of your turn, so a one-rune counter that wants
exactly that takes it after all five runes are gone. The entry also has the queue backwards: if both
players banish a Time Warp, the opponent's extra turn comes first.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `b39a3a3`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 65 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 34 (a hit on *first*), first in the list. The other entry of this slice is rank 35,
played in [the fourth body walks home](2026-10-07-the-fourth-body-walks-home.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Mind legend (103.1.b); here `VEN-151 Soul's Reflection` (Mind/Chaos), idle in the walk, whose Signature card is the reply in §5 |
| **Runes** | nine Mind and three Chaos, so any eight on the board hold at least five Mind |
| **Then** | eight runes: T4 going first |
| **Cast** | `OGN-115 Promising Future` (Mind, E5 + 1 Power), with `OGN-122 Time Warp` (Mind, E10 + 4 Power) in the top five |

The card text the play turns on:

- Promising Future: *"Each player looks at the top 5 cards of their Main Deck, banishes one of them, then
  recycles the rest. Starting with the next player, each player plays those cards, ignoring Energy costs.
  (They must still pay Power costs.)"*
- Time Warp: *"Take a turn after this one. Banish this."*
- Crumbling Sands (theirs, Calm, E1 + 1 Power): *"[Reaction] (Play any time, even before spells and
  abilities resolve.) Counter a spell if an opponent has played another spell this turn."*

The rune deck is yours to build. 103.3.a.1: *"Cards in the Rune Deck must be of the Domain Identity of
your Champion Legend."* Nothing asks for an even split, and this line wants Mind.

## 2. Your order: five Mind runes, each exhausted and then recycled

A rune pays both halves of a cost. 164.2.a exhausts it for one Energy, and 164.2.b recycles it for one
Power of its own Domain: *"Recycle this: [Reaction] — Add [C]."* Recycling asks nothing about
readiness, so the same rune can do both. And it leaves, 161.2.b: *"When a Rune is Recycled it is
returned to the Rune Deck, not the Main Deck."*

So the line costs five runes, all of them Mind. Promising Future is five Energy and one Mind Power.
Time Warp, played through it, keeps only its four Mind Power: Promising Future says *"ignoring Energy
costs"*, and 356.1.b.2 sets only the named cost to zero. Five Mind runes exhausted pay the five Energy.
The same five, recycled, pay the five Power. Eight runes go to three.

Cast from hand, Time Warp is ten Energy and four Mind Power: ten runes exhausted, four recycled, T5 at
the earliest going first. Through Promising Future it is T4 every time with this rune deck, because only
three runes are Chaos. It can even be T3 when five of the first six runes are Mind: 462 of the 924
possible six-rune draws, or 50%. So the discount is a turn, and it costs one more rune off the board,
five against four. An Energy discount on Promising Future would save nothing: the five Power use up
five runes anyway, and each of them can be exhausted for Energy before it is recycled.

The dig decides whether it happens at all. Going first, T4 has seen 4 + 4 cards of 39 (Tournament Rules
601.1.b makes the Main Deck exactly 40, and 103.2.a.1 sets the Chosen Champion aside). Promising Future
is among them 50.8% of the time. With all three Time Warps in the other 31 cards, one is in the top five
42.2% of the time; with one already in hand, 30.1%. A Time Warp in your hand does not help, because
Promising Future plays only the banished card.

The extra turn is a whole turn, 735: *"These effects create a temporary Additional Turn owned by that
player that is inserted into the turn queue after the current turn."* Its Awaken readies every rune you
still have, 315.1.b: *"The Turn Player readies all Game Objects they control that are able to be
readied."* Then you Hold, channel two and draw one, as on any turn. Without a Time Warp of theirs, the
queue reads `[> you > you* > them >]`.

## 3. Their order: their card first, and it is free

*"Starting with the next player"* means the opponent plays first. Nothing resolves yet. Each card is
played during Promising Future's resolution, and 354.3 says what happens to a play that starts then:
*"If another Card Effect or ability is currently resolving, continue resolving it before proceeding
with any further steps of this process."* When Promising Future is done, both cards are finalized in the
order they were played, 337.1.b: *"Chain Items are Finalized in the order they were appended to the
Chain."*

Their card goes first, and a unit does not wait. 337.2: *"If, after finalizing the Chain Item, that item
is a Unit, Gear, or an ability that Adds resources, it resolves immediately"*. Here their best card of
five is `OGN-125 Bilgewater Bully` (Body, E6, M6, no Power cost), so it costs them nothing. They put it
at B, which they control, 355.2.a: *"By default, Valid locations include the controller’s Base or a
Battlefield the controller controls."* It enters exhausted, but it defends.

Your Time Warp is finalized second, and the opponent gets priority over it before it resolves. That is
the window for Crumbling Sands. Promising Future was played this turn, so Time Warp is always *"another
spell"* (§5).

**If they banish a Time Warp too.** Only a Mind opponent can, and then 738 decides the queue. Its
example is this pair, in a four-player game where the Second and Fourth Player each banish a Time Warp.
The Second Player plays first. Played later, *"The Fourth Player’s Time Warp resolves first"*, because
340.1 resolves the newest item: *"The newest Finalized Chain Item resolves."* Then *"The Second Player’s
Time Warp resolves afterwards"*. Each Additional Turn goes in right after the current turn (735), so the
one that resolves last comes first: *"When the First Player passes the turn, the Second Player will take
their turn, followed by the Fourth Player, after which the queue returns to its previously queued
turns."* In a Duel you play last, so your Time Warp resolves first and theirs goes in ahead of it:
`[> you > them* > you* > them >]`. Turns still alternate, and both players simply get one more.

## 4. The turns, going first

Mind/Chaos against Calm/Body (`SFD-193 Grandmaster at Arms`, idle with no Equipment on the board).

```
turn    runes   your turn                                                 points
T1      2       Ravenbloom Student (E2) to base                           0
their T1        Stalwart Poro to base, with the 485.7 extra rune.
T2      4       Student walks to A, Conquer: +1. Pit Crew (E3) to A.      1
their T2        Stalwart Poro walks to B, Conquer. Sunlit Guardian (E3)
                to B.
T3      6       Hold A: +1. Shipyard Skulker (E3) and Lecturing Yordle    2
                (E3, draw 1) to A. A defends at ten.
their T3        Hold B. Playful Phantom (E5) to B. Two runes left open.
T4      8       Hold A: +1. Promising Future (E5 + 1 Mind Power). They    3
                banish Bilgewater Bully from their five and play it to
                B for nothing. You banish Time Warp from yours and play
                it for 4 Mind Power. Five Mind runes exhausted and
                recycled: three left. A second Skulker (E3) to A. Time
                Warp resolves: [> you > you* > them >].
T4*     5       Awaken readies the three runes; channel 2; draw 1.        4
                Hold A: +1. Mel, Newly Awakened (E4 + 1 Mind Power)
                from the Champion Zone to A: draw 1. Four runes.
their T4        Hold B. A defends at seventeen. Nothing of theirs can
                reach it: their units stand at B.
T5      6       Hold A: +1.                                               5
```

Their points: 1 on T2, 2 on T3, 3 on T4. Without the line, T4 ends at 3 points with eight runes and T5
at 4 with ten. With it, T5 ends at 5 points with six runes. The hand is the same size: Promising Future
was spent, the extra turn drew one, and Time Warp came off the deck, not out of your hand. The runes are
four short: the line recycled five, the extra turn channelled two back, and Mel's Power recycled one
more. They got a 6-Might body out of their deck for free: B now defends at eighteen (Poro 2 and Guardian
3, each +1 from [Shield], the Phantom's 5, the Bully's 6), so you will not take it. With one
battlefield each, the extra Hold is the whole score of an extra turn.

Their units cannot reach A on their T4. 144.4.a: *"Units may move from their Base to a Battlefield."*
B to A needs [Ganking] (144.4.c.1), and the Bully has it only *"While I'm buffed"*.

## 5. Breaks to

**The line breaks to `VEN-039 Crumbling Sands`** (Calm, E1 + 1 Power: one rune, exhausted and
recycled), cast on Time Warp. Promising Future is a spell played this turn, so the condition always
holds when Time Warp is on the chain. Promising Future counts as played before it even begins to
resolve, 350.1: *"A card is Played when it has finished this process in its entirety."* Time Warp is
countered after you have paid for it, 425.1.c: *"Countering
does not refund any costs paid to play a card, activate an ability, or trigger an ability."* It does not
come back either. Its own *"Banish this"* is a Delayed Replacement, 390.3.a, short for *"if it would
leave the chain after becoming a finalized chain item, and leaving the chain wasn’t instructed by its
own execution, perform the specified game action instead."* So you have spent two cards and five Mind
runes, and they have a free Bully and have spent one rune. They held two runes open on their T3, so it
costs them nothing they were using.

Crumbling Sands cannot touch Promising Future if it is the first spell of your turn, and the cheaper
counter cannot touch either card. `OGN-045 Defy` reads *"Counter a spell that costs no more than
:rb_energy_4: and no more than :rb_rune_rainbow:."*, and 206 settles which cost it reads: *"Effects
that need to determine a card’s cost for any purpose always use its printed or copied cost, even if that
cost is increased, decreased, or ignored as the card is played."* Time Warp's printed cost is ten, so
Defy cannot counter it even though you paid none of the ten. `OGN-064 Wind Wall` (Calm, E3 + 2 Power)
counters either card for three runes.

The reply is `VEN-152 Rebuttal` (Mind/Chaos, E1 + 1 Power: one rune), the Signature card that this
legend admits (103.2.d.2): *"[Reaction] (Play any time, even before spells and abilities resolve.)
Choose a spell with Energy cost no more than :rb_energy_4:.  You may pay :rb_rune_rainbow:. If you do,
gain control of it and you may make new choices for it. Otherwise, counter it."* Crumbling Sands costs
one, so Rebuttal counters it from the three runes T4 has left after the line. A second Crumbling Sands
from them would counter Rebuttal, since Rebuttal is another spell too. The other reply is already in
the Champion Zone: Mel, empowered for three Energy, says *"Your spells and abilities can't be
countered."* That is seven Energy and one Mind Power on top of the line, so it has to be paid on
earlier turns, in place of the bodies the walk played there.

## 6. Verdict

**A turn early for one more rune, but one rune of theirs takes it.** The rules reading is right. The
Energy goes, the Power stays, and the look-and-recycle never burns you out. The play adds the price.
The line costs five Mind runes recycled, one more than casting Time Warp from hand, and lands on T4
instead of T5. In the walk the extra turn is worth one Hold point, a card and a Main Phase. Every cast
also hands the opponent the best of their top five for nothing, and here that was a 6-Might defender.
And Time Warp always arrives as the second spell of the turn, which is the one condition Crumbling Sands
asks for. Holding one rune back for Rebuttal is the cheapest protection.

## 7. Not verified

I did not walk a Mind opponent who banishes their own Time Warp (§3 reads the queue from 738 without
a board), Promising Future with no Time Warp in the five, or their free card being a spell that chooses
one of your units. I did not walk Mel empowered on T4 or T5, the T3 version, or 2v2.

## Leads

- The entry's queue is backwards. Its step 4 inserts the opponent's Additional Turn *"now"*, before you
  play yours, and its notable concludes that yours is *"inserted last and therefore taken FIRST"*. Both
  cards are only played during Promising Future's resolution (354.3), are finalized in order (337.1.b),
  and the newest resolves first (340.1). Yours is played last, so it resolves first, and theirs is then
  inserted ahead of it: `[> you > them* > you* > them >]`. 738's own example has the Second Player, who
  played first, taking the first extra turn.
- The same claim is repeated in the net per iteration, *"queued ahead of any Additional Turn the same
  card gave the opponent"*. It is queued behind it.
- The entry prices the line as *"5 Energy + 5 Power against 10 Energy + 4 Power"*. In runes that is
  five exhausted and recycled against ten exhausted and four recycled: one more rune off the board, and
  a turn earlier, because it needs five runes on the board instead of ten.
- The entry names no answer. `VEN-039 Crumbling Sands` (one rune) counters Time Warp every time, because
  Promising Future is always the other spell played that turn. `OGN-045 Defy` cannot, because 206 reads
  Time Warp's printed cost.
