# Play — the setup nobody prices, and the turn the free curve has already won

Issue #200, lane rc-synth3, 2026-09-13. Constructed, Duel (485). Rules version 2026-07-16, opened in
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`; card
text verbatim from `data/corpus_flat.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) first for what a baseline is.

**Subject: `bottled-constellation-time-warp`** — the row the turn clock moved furthest in a single
day, from **T14 to T5**, and the one that shows what the clock still cannot see.

---

## 1. Why it moved nine turns, and why that part was right

`CLAUDE.md` prices this line as *"60 Energy and 18 Power of deployment, i.e. turn 14"*. The entry's
own first step says otherwise, and has all along:

> **"Turn N: loop; play three Constellations (30E+6P); Time Warp."**

The sixty Energy and the eighteen Power were never a deployment. `lux-infinite-energy` and
`lux-infinite-power` are already running when they are paid, so the loop buys them. The clock was
charging a rune curve for cards the rune curve never pays for; it now prices an engine's own output
and the row reads **T5**. That change is correct and it is in
`scripts/adversarial-check.mjs`.

**And it is the smaller half of the story.** Removing a nine-turn over-charge took away the padding
that had been hiding a constraint underneath it.

## 2. What the clock prices, and what this line actually needs

The clock prices **cards**. `lux-infinite-energy` states two requirements in its own
`prerequisites.notable` that no card cost can reach:

> **"12 runes in play (the deck's whole Rune Deck channeled); at least one Mind rune."**
> **"Main Deck EMPTY — the deck draws itself out first; every card not in the loop must be in hand
> or trash."**

**Twelve runes is turn six at the earliest.** 315.3.b channels two a turn, 161.2.a fixes the Rune
Deck at exactly twelve, and 161.2.b takes a rune off the board for every Power paid — so T6 is the
best case and every Power spent on the way pushes it out.

**Ten of the eighty rows in the clock carry that engine in their closure, and every one of them
prints T5** — `bottled-constellation-time-warp`, `grand-plaza-loop-time-warp`, `jayce-mesmerize-renata`,
`lady-luminosity-loop-comet`, `lux-infinite-energy`, `lux-infinite-power`, `renata-bubble-bot-ready`,
`renata-mastermind-points`, `swain-double-conquer`, `time-warp-hold-burst`. **Read all ten as no
earlier than T6.** That set is exact in a way the floor's *source* is not: it is "the closure contains
`lux-infinite-energy`", and that entry declares both requirements in its own words.

**The empty deck is the one with no number on it**, and the catalogue already knows it is fragile.
`lux-infinite-energy` carries the finding in its own words — *"THE EMPTY MAIN DECK IS A ONE-TURN
STATE THAT DESTROYS ITSELF"* — because 315.4.b.1 makes an empty deck at your Draw Phase an automatic
Burn Out, 431.2.b then *"Recycles their trash into their Main Deck"* randomized, and 431.2.c hands an
opponent a point. Riot works the whole sequence at 431.2.d.

So the window is exactly one Main Phase: **the Main Phase of the turn on which your last card is
drawn.** What no entry and no instrument prices is **how long it takes to get there.**

## 3. Pricing it

Tournament Rules 601.1.b: *"In competitions, a player's Main Deck must be exactly 40 cards."*
103.2.a.1 sets the Chosen Champion aside *"at the start of the game"*, so **39** are in the deck.
Rule 116 draws four. **Thirty-five cards to remove**, and the Draw Phase (315.4.b) removes one a turn.

Only two things take a card out of a Main Deck: drawing it and burning it. Recycling does not —
416.1 puts it on the bottom. So what matters per deck slot is the **net**: a card that draws two nets
one, because one of those draws found the card itself.

Swept over the pool for cards legal in Mind/Order (103.1.b — domains a subset of `mind` + `order`,
colourless included), folded by name, legends excluded: **nine names remove more than one card from
their own Main Deck.**

| net | cost | card | how |
|---:|---|---|---|
| **+3** | **E0** | **`VEN-165 Shadow Temple`** | *"When you hold here, [Burn 3]"* |
| +3 | E6+1P | `OGN-114 Progress Day` | draw 4 |
| +2 | E2+3P | `SFD-087 Premonition` | draw 3 |
| +1 | E1 | `UNL-173 Sacrifice` | draw 2 |
| +1 | E2 | `SFD-167 Unsung Hero` | draw 2 |
| +1 | E2 | `UNL-165 Shadow's Call` | draw 2 |
| +1 | E3+1P | `UNL-172 LeBlanc, Fragmented` | draw 2 |
| +1 | E4 | `OGN-083 Consult the Past` | draw 2 |
| +1 | E7 | `VEN-056 Clairvoyance` | draw 2 |

One of the nine costs nothing and repeats. `VEN-165 Shadow Temple` is colourless, so any identity may
bring it, and its burn carries no *"may"* — it is a fuse, which is also why overshooting it is a Burn
Out under 431.1.b.

**The timetable with the Temple, going first (485.7 gives the extra rune to the player going second,
so this is the slower seat).** A body played on T1 enters exhausted (143.4), moves in on T2 and
Conquers — 190.3.a.1 applies Contested, 344.2 opens the Showdown at the next Cleanup, 348.2.a
establishes Control. From T3 the Temple Holds every turn.

| end of turn | cards left in the Main Deck |
|---|---:|
| T1 | 34 |
| T2 | 33 |
| T3 | 29 |
| T5 | 21 |
| T8 | 9 |
| T10 | 1 |

Four a turn from T3 — three burned, one drawn. **Turn ten or eleven on the Temple alone**, and adding
a dozen net draws from the table above pulls it to roughly **turn seven or eight**, which is also
when twelve runes and the loop's pieces can plausibly be in place.

## 4. The sting, and it is one line rather than ten

`485.4.a` has each player provide **three** battlefields and `485.5` selects them at random, so
**exactly one of your three is on the table.** The Temple therefore competes with any battlefield the
line itself needs.

Nine of the ten rows in this family name no battlefield, so they can simply run it. **One cannot:**
`grand-plaza-loop-time-warp` needs `OGN-293 The Grand Plaza` on the board *and* an empty Main Deck,
and the cheapest emptier in its identity is a battlefield it can never have at the same time. That
line's deck has to empty itself out of the Energy-priced half of the table instead — E1 to E7 a card,
paid on the same turns it is trying to reach twelve runes.

**The deck that empties itself cannot be the deck that wins**, for that entry and only that entry.

## 5. Verdict

Everything about the combo is intact. The loop works, the arithmetic in the entry is right, and the
clock's T5 is the right answer to the question the clock asks. The question it asks is *"when are
these cards affordable"*, and this line's binding constraint is not affordability.

**Priced as a game rather than as a combo, it is a turn seven-to-ten line, and the way it gets there
is the thing to sit with.** The cheapest route to an empty deck is holding a battlefield every turn
from T3 — and holding a battlefield every turn from T3 **is** the contested Hold curve this project
measures everything against, the one that pays a point a turn and reaches eight on T9. So the setup
the loop requires is itself the plan the loop was supposed to improve on.

That is the unopposed-clock argument arriving from a direction it was never pointed at. It was
derived there from what a finisher is worth against a free curve; here it falls out of a deck
literally having to spend the same turns doing the same thing to become legal at all.

**What I am not claiming.** Not that the entry is wrong — it is not, and its own notable already
records that the empty deck destroys itself. Not that seven-to-ten is exact: it is a hand timetable
over one shell, and a Mind/Order list built specifically to empty fast would beat it. And not that
the clock should model any of this — a deck's emptying rate is a property of the **list**, not of the
**line**, which is precisely why the instrument that prices lines cannot see it, and why this is a
play rather than a patch.
