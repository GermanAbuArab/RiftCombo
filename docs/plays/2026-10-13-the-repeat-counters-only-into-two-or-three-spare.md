# Play — the Repeat counters only into two or three spare Energy

Issue #329 (a slice of #200), 2026-10-13. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `dark-child-hard-bargain-repeat-tax`**, the Chaos ENGINE in which `OGS-017 Dark Child -
Starter` readies two runes at the end of your turn and `SFD-136 Hard Bargain` spends them on the
opponent's turn, with its [Repeat] paid out of two more runes you chose not to spend. The entry is
right that the legend pays the base cost and nothing more, and right to call the card a tax and not a
counterspell. Walked as a game, the Repeat has a narrow and readable job: against one spell it turns
the tax into a counter only when the opponent has exactly two or three Energy left, and both
executions are fixed when you cast it, so you choose it with their ready runes in view. An opponent
who casts the spell first, with four ready, pays and loses nothing but tempo.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-13 at `34bd651`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 47 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 56 (a hit on *first*), second in the list. The other entry of this slice is rank 54,
`UNL-051 Ivern, Nurturer` under three Svellsongur, played in
[eight instances, and one body left to buff](2026-10-13-eight-instances-and-one-body-left-to-buff.md).
The rule behind both executions being chosen at casting is walked on Rocket Barrage in
[both executions are chosen when you cast it](2026-10-05-both-executions-are-chosen-at-casting.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGS-017 Dark Child - Starter` (Fury/Chaos); it is the engine, not a slot |
| **The counter** | `SFD-136 Hard Bargain` (Chaos, E2, [Repeat] 2 Energy), three copies by 103.2.b |
| **Off-turn Energy** | two runes the legend readies, plus two you leave ready for the [Repeat] |
| **The opponent** | a deck that casts spells on its own turn; Hard Bargain names *"a spell"* and nothing else |

Hard Bargain is mono-Chaos, so 103.1.b.3 admits it under a Fury/Chaos legend. Neither card appears in
`data/legality.json`.

The card text the play turns on:

- Dark Child - Starter (Fury/Chaos legend): *"At the end of your turn, ready up to 2 runes."*
- Hard Bargain (Chaos, E2): *"[Reaction] (Play any time, even before spells and abilities resolve.)
  [Repeat] :rb_energy_2: (You may pay the additional cost to repeat this spell's effect.) Counter a
  spell unless its controller pays :rb_energy_2:."*

## 2. What the legend hands you, and when

**Two Energy on their turn, never on yours.** The trigger fires in your Ending Step, 317.1.a: *"At
the end of the turn Game Effects take place."* What it readies is runes, not Energy, so the pool
emptying later in the same phase takes nothing from it; 167: *"Every player's Rune Pool empties at the
start of each player's Main Phase and the end of each player's turn."* The runes are still ready when
their turn starts, and each pays one Energy at Reaction speed, 164.2.a: *"[E]: [Reaction] — Add [1]."*
On your own next turn the gift is gone, because your Awakening readies everything anyway, 415.3.a:
*"A player Readies all non-spell Game Objects they Control during the Awakening Phase on their
turn."*

**Off-turn Energy is what you left ready plus what she readies.** She readies "up to 2", and a rune
you never exhausted has nothing to gain from it. So the count on their turn is the runes you did not
spend, plus two if you exhausted at least two. Tap out and you hold two, which is Hard Bargain. Leave
two ready and you hold four, which is Hard Bargain with its Repeat. The Power side of a rune does not
enter into it: 164.2.b, *"Recycle this: [Reaction] — Add [C]."*, costs the recycle and no exhaust, so
an exhausted rune already pays Power on any turn, and Hard Bargain asks for none.

## 3. What the tax can be paid with

**Energy, and only Energy.** 163.1: *"Energy is used to pay numeric Energy costs."* The tax is printed
`:rb_energy_2:`. So an exhausted rune cannot pay it, because all it can still add is Power (164.2.b),
and neither can a Gold token, whose ability is *"[Reaction][>] Kill this, :rb_exhaust:: [Add]
:rb_rune_rainbow:."* What pays it is their ready runes, any Energy still in their pool, and Energy
added at Reaction speed, which 429.3 allows mid-resolution: *"Activated abilities that Add resources
and have the Reaction tag can be activated at any time that spells or abilities require resources be
paid."* Their spare is on the table: count their ready runes.

## 4. What the Repeat buys against one spell

**Both executions are chosen when you cast it.** 820.2: *"When a spell or ability’s effect is
performed an additional time with Repeat, choices must be made at the usual time during the Make
Relevant Choices step of Playing a Card."* With one enemy spell on the chain both executions choose
it; Hard Bargain cannot choose itself, 355.9.c: *"It is not the spell or ability itself."*

**The second execution only matters if they paid the first.** If they do not pay, the spell is gone,
425.1.a: *"A card or ability that is Countered does nothing and is cleared from the chain."* The
second execution then has no legal target, 359.3.e.5: *"If any of the spell's targets are no longer
legal, those game objects, players, or zones are unaffected by the spell as it resolves. Any
instructions related to an illegal target can’t be followed."* Your Repeat's two Energy are spent for
nothing.

So, against one spell, with S the Energy they can still find:

| their spare S | Hard Bargain, base (2 of yours) | with the Repeat (4 of yours) |
|---|---|---|
| 0 or 1 | counters it | counters it; the Repeat is wasted |
| 2 or 3 | they pay 2, it resolves | **counters it**, after they paid 2 into the first |
| 4 or more | they pay 2, it resolves | they pay 4, it resolves |

The Repeat changes the result in one row: two or three spare. Because 820.1.c.1 makes the Repeat
*"an Additional Cost to be paid during the steps of playing the spell or ability"*, you decide it while
casting, and their spare is countable then. Pay it into S = 2 or 3, and only to tax 4 when the four
Energy are worth more to them than to you.

**Against two spells**, 820.2.a lets each execution choose a different one (*"Choices made for the
additional execution do not have to be the same as the choices made for the initial execution."*).
That needs two of their spells on the chain at once. In their Main Phase a spell opens a Closed
State and the priority comes back to them first, 312.2.c, and to you only when they pass, 312.2.d:
*"When the turn is in a Closed State, they are the next Player in Turn Order, and the player with
Priority passes."* So the two-spell case is them answering their own spell with a [Reaction] before
passing. On their own turn, with nothing of yours on the chain, they have no reason to.

## 5. Their order: bodies to B, and a removal spell when it matters

Mind/Order, going second. They build battlefield B with bodies, which Hard Bargain never touches:
337.2, *"If, after finalizing the Chain Item, that item is a Unit, Gear, or an ability that Adds
resources, it resolves immediately—Move to Step 4: Resolve."* Their removal is `VEN-059 Shock Blast`
(Mind, E3 + 1 Power): *"[Action] (Play on your turn or in showdowns.) This costs :rb_energy_2: less
if you control something that's [Empowered]. Deal 4 to a unit at a battlefield."* They control
nothing Empowered, so it costs E3 + 1.

## 6. The turns, going first

Fury/Chaos against Mind/Order. Your opening four are Mystic Poro, Shipyard Skulker, Hard Bargain and
Sneaky Deckhand. The draws are Traveling Merchant on T1 and Pouty Poro on T2. Nothing you cast costs
Power. Units go to A by 355.2.a once you control it: *"By default, Valid locations include the
controller’s Base or a Battlefield the controller controls."*

```
turn    runes   your turn                                                 points
T1      2       Mystic Poro (E2) to base. All spent. End: Dark Child      0
                readies both. Two ready for their turn.
their T1        Lecturing Yordle (E3) to base, on the 485.7 extra rune.
                All three spent. No spell: your two ready runes idle.
T2      4       Poro walks to A, Conquer: +1. Shipyard Skulker (E3) to    1
                A. One left ready. End: Dark Child readies two of the
                three exhausted. Three ready.
their T2        Yordle walks to B, Conquer. Trusty Ramhound (E2) and
                Faithful Manufactor (E3) to B, with its Recruit token.
                All five spent. No spell.
T3      6       Hold A: +1. Traveling Merchant (E2) and Pouty Poro (E2)   2
                to A. Two held ready. End: Dark Child readies two of
                the four exhausted. Four ready.
their T3        Hold B. Seven runes. Shock Blast (E3 + 1 Mind) on the
                Skulker at A, cast first: three exhausted, one of them
                recycled for the Mind. Six runes, four ready. You
                answer with Hard Bargain and its Repeat, both
                executions on Shock Blast: your four ready exhausted.
                First execution: they pay 2. Second: they pay 2. Shock
                Blast resolves, the Skulker dies. They have nothing
                ready and play nothing else.
```

Their points: 1 on T2, 2 on T3. After their T3 it is 2 to 2.

**What the Repeat bought here is two of their Energy.** They cast the spell first, with four ready,
and paid both taxes. Without the Repeat, had you spent your last two runes on T3 instead, they pay 2
and still have two ready for a 2-drop at B. With it, their seven-rune turn is one removal spell and a
Hold. Your price was the card and the two runes you held on T3: the legend's two were free, since
415.3.a readies them on your T4 whether you use them or not.

**What it did not buy is the Skulker.** It dies either way against this order. The counter happens
only against the other order: a 2-drop first, then Shock Blast with two ready.
That is S = 2, the middle row of §4: they pay the first 2, cannot pay the second, and Shock Blast goes
to the trash, 425.1.a.1: *"Cards that are cleared from the chain in this way are placed in the
trash."* Nothing comes back to them, 425.1.c: *"Countering does not refund any costs paid to play a
card, activate an ability, or trigger an ability."* Three resources, the card, two Energy of tax, and
the Skulker lives. With four of your runes showing, the order is theirs to choose.

**The same arithmetic on T2.** You held three, so the Repeat was not payable. Had they cast a spell
last on their T2, tapped out, the base cost alone counters it. Cast first, out of five runes, Shock
Blast leaves them two ready; they pay the tax with those and lose the 2-drop instead.

**How often this happens.** Hard Bargain has to be in the first seven cards by their T3: with three
copies, **44.8%** of games without a mulligan; with one, **17.5%**.

## 7. Breaks to

**The line breaks to casting the spell first with four ready**, which costs no card: the tax is then
four Energy of their development, paid while Hard Bargain resolves. At seven runes that is
everything the spell left them, as in §6.

**The cheapest card that breaks it is `OGN-045 Defy`** (Calm, E1 + 1 Power: two resources) in a Calm
deck: *"Counter a spell that costs no more than :rb_energy_4: and no more than :rb_rune_rainbow:."*
Hard Bargain is in range with its Repeat paid, because 206 reads the printed cost: *"Effects that need
to determine a card’s cost for any purpose always use its printed or copied cost, even if that cost is
increased, decreased, or ignored as the card is played."* And 425.1.c.1 says of the refund: *"This
includes additional costs."* Two resources for your card and four Energy. The Mind/Order deck of §6 has
no counter: of the pool's eleven, none is Mind, Order or Mind/Order.

**In Mind, `SFD-083 Hextech Anomaly`** (Mind gear, E3 + 1 Power): *":rb_exhaust:: [Reaction] — Pay
any amount of :rb_rune_rainbow: to [Add] that much Energy."* Once a turn it turns exhausted runes
into tax money, since 164.2.b recycles an exhausted rune for Power and the gear converts that Power
to Energy, so a tapped-out opponent can pay. The price is one rune off their board for each Energy,
161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."* Two runes keep
the spell against the base cost, four against the Repeat.

**Removal printed on a body is out of reach.** `SFD-158 Sandshifter` (Order, E5 + 2 Power, M6):
*"When you play me, kill an enemy unit with 3 :rb_might: or less."* The unit resolves at once (337.2)
and its play trigger is an ability, while Hard Bargain says *"Counter a spell"*. Seven resources for
the Skulker and a Might-6 body, which no copy in your hand can touch.

## 8. Verdict

**Right about the arithmetic, and the Repeat is a decision, not a doubling.** The legend gives two
Energy on their turn and nothing on yours (317.1.a, 415.3.a), which is the base cost exactly. The
Repeat needs two runes of your own held through your turn. Against one spell its second execution
does something only if they paid the first (359.3.e.5), so it turns the tax into a counter in one
case: their spare is two or three. Everything it needs to know is countable when you cast it,
because the tax is Energy only (163.1) and an exhausted rune pays no Energy, and both executions are
chosen then (820.2). An opponent who casts first, with four ready, loses tempo and keeps the spell.
Against one who develops first and casts last, it is a counter.

## 9. Not verified

**Rune dealing.** Nothing you cast in §6 costs Power, so the order your runes arrive in cannot fail
the walk: 0%. Their Shock Blast on their T3 needs one Mind among the seven runes they have channelled,
with nothing recycled before it; a deck of six Mind and six Order cannot deal seven without a Mind, so
it fails in 0 deals. Their T1 and T2 bodies cost no Power.

I did not walk a spell they cast on your turn, in a Showdown your own move opens, where the legend
has readied nothing and Hard Bargain competes with your development; their [Reaction]s answering
their own spell to put two on the chain; Energy-adding cards on their side (`OGN-098 Energy Conduit`
adds one at Reaction speed, which moves S = 3 to 4); the mulligan; or 2v2.

## Leads

- The entry's `easy` prerequisite reads *"Two runes left unexhausted going into the end of your turn —
  the legend readies 'up to 2', so the ceiling is what she gives, not what you saved."* The two add:
  what you hold on their turn is the runes you left ready plus up to two she readies, so two held
  runes are what make the [Repeat] payable at all (four Energy), which its own step 1 says.
- The entry says the Repeat *"doubles the tax"* against one spell. Against one spell the second
  execution acts only if the first was paid (425.1.a, 359.3.e.5), so it is a counter into two or three
  spare Energy, a wasted 2 Energy into zero or one, and a 4-Energy tax into four or more; and 820.2 fixes
  both choices at casting, when that spare is countable.
- The entry's two-spell reading (*"Against two spells on the chain, it is two soft counters from one
  card"*) needs two of their spells on the chain at once. On their turn, 312.2.c and 312.2.d give you
  priority only after they pass, so that is them answering their own spell first.
- The tax is Energy only (163.1). Exhausted runes (164.2.b) and Gold tokens add Power and cannot pay
  it; `SFD-083 Hextech Anomaly` converts Power to Energy and can.
