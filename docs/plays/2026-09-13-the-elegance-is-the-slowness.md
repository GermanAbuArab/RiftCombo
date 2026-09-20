# Play — the elegance is the slowness, and the clock is right by the wrong road

Issue #200, 2026-09-13. Constructed, Duel (485). Rules version 2026-07-16, opened in
`data/Riftbound-Core-Rules-2026-07-16.txt`; card text verbatim from `data/corpus_flat.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) first for what a baseline is.

**Subject: `shen-sentinel-time-warp-chain`.** With the turn clock's engine-output pricing landed,
**four of eighty finishers pay later than the CONTESTED curve** — the board a finisher is actually
for — and three of those four are one closure, the nineteen-card `gemdragon-henge-vi-blind-fury`
board. **This is the fourth, and the only other one.** It is also, card for card, one of the tidiest
things in the catalogue.

---

## 1. What it does

Three cards. `VEN-138 Shen, Leader of the Kinkou Order` (Order, E6 + 2 Power) and `UNL-087 Blue
Sentinel` (Mind, E4 + 1 Power) stand at one battlefield you control **with nothing else there**, plus
two copies of `OGN-122 Time Warp` (Mind, E10 + 4 Power).

Each Beginning Phase you Hold: 1 point from the Score (469.2, capped once per battlefield per turn by
470), and Shen's trigger — *"if there is exactly one other unit you control here"* — doubled by the
Sentinel into two ability Gains. **Three points a turn.** A Time Warp on each of the first two turns
means the opponent never acts, and the third Hold crosses eight.

## 2. Why it is elegant, and the entry proves this part itself

The Time Warps look like twenty Energy and eight Power of extra cost. They are not. The entry's own
step 1 says so — *"No third card is needed — the rune economy pays for the Time Warps by itself"* —
and the ledger holds:

- The Sentinel's own hold effect is doubled too, banking **2 rainbow**.
- **316.2** makes the Main Phase tasks outstanding *"in the specified order"*, **316.3** empties the
  Rune Pool first, and **316.4** delivers start-of-Main-Phase effects after it — so that rainbow
  survives the sweep that would otherwise eat it.
- Twelve runes tap for **12 Energy** (164.2.a, whose cost is the exhaust), and two of those
  **already-exhausted** runes recycle for **2 Power** (164.2.b, whose cost is the recycle and carries
  no exhaust).

**E12 + 4 Power against a Time Warp at E10 + 4 Power**, with two Energy to spare. The extra turns are
free. That is a genuinely good piece of design and it is why the entry needs no discount package.

## 3. So why does it land on turn ten

**Because self-funding needs twelve runes, and twelve runes is turn eight.**

161.2.a fixes the Rune Deck at exactly twelve. 315.3.b channels two a turn. And 161.2.b sends every
rune spent on Power **to the Rune Deck**, taking it off the board. The deployment is Shen at two Power
and the Sentinel at one — **three runes gone** — so the board count is `min(12, 2T − 3)`:

| turn | runes on board |
|---|---:|
| T3 | 4 — Shen lands, two Power paid |
| T4 | 5 — the Sentinel lands, one Power paid |
| T5 | 7 |
| T6 | 9 |
| T7 | 11 |
| **T8** | **12** |

So the first Hold that can also cast a Time Warp is **T8**. Then T8 for three points, T9 for six, T10
for nine, and 194.2 wins it in the cleanup. **Turn ten**, against a mind/order unopposed baseline of
T6 and a contested curve of T9.

**The design that makes the Time Warps free is the design that makes the line slow.** Shen's two
Order Power and the Sentinel's one are what buy the doubling, and those same three Power are three
runes that have to be channelled back before the engine can pay for itself.

## 4. The instrument agrees and its reasoning does not

`npm run adversarial -- --turns` puts this row at **T10** as well. It gets there by summing both Time
Warps into the deployment — E30 and 11 Power across four cards — which is precisely the reading the
entry's own step 1 refutes.

**Right answer, wrong road.** The clock cannot see the twelve-rune floor, and it happens to charge a
cost that takes about the same number of turns. Nothing distinguishes the two except a hand walk.

That is not a defect to fix, and the reason is worth stating because it argues for a decision this
project already made. `CLAUDE.md` records that treating spells as cast-on-the-finishing-turn rather
than deployed was **tried and rejected**, because it sends Time-Warp chains to Infinity. This row adds
a second, independent argument: that change would make this row **faster**, and therefore **wrong**,
because it would remove the wrong reason while leaving the real constraint — the rune floor —
unmodelled. A number that is right for the wrong reason gets worse when you fix only the reason.

## 5. Breaks to

- **`OGN-123 Unchecked Power`**, and the entry names it itself: Mind, 7 Energy + 2 Power, *"Exhaust
  all friendly units, then deal 12 to ALL units at battlefields."* Shen is Might 7 and the Sentinel
  Might 4 with `[Shield 2]`; twelve kills both, and the line is two bodies wide with no spare.
- **One extra body at that battlefield.** Shen reads *"exactly one other unit you control here"*, and
  383.2.a.1 makes that count part of the Trigger Condition, so it is checked as the trigger is placed.
  An opponent's token landing there, or a second Sentinel of your own, takes three points a turn to
  one.
- **The turns themselves.** The garrison is safe for exactly as long as the opponent has no turn, which
  is what the Time Warps buy — so an answer has to be found in a Reaction window or not at all.

## 6. Verdict

**Nothing here is badly built. It is slow because of an interaction between two things that are each
correct**: the Sentinel doubles the Hold, and Power costs runes. The first is what makes the Time
Warps free; the second is what delays them to turn eight.

Whether that matters depends on the board, as always. Against the **unopposed** curve it is four turns
late and irrelevant, because a player holding both battlefields has already won. Against the
**contested** curve it is one turn late — and one turn late is a real verdict rather than a
condemnation, since the contested curve's eighth point on T9 is a *baseline* and not a *plan*.

**The constructive lead, not yet catalogued.** This is a mind/order line, and mind/order is
the one identity that prints an infinite-Energy engine. Measured: the union of this entry's cards with
`lux-infinite-energy` is two domains and therefore legal under 103.1.b, this entry declares
`needs: []`, no twin exists on its card set, and sixteen entries already declare
`needs: infinite-energy`. The loop-financed twin this project uses elsewhere — identical cards,
`needs` on one row so the matcher can route a loop into the window, both rows cross-referencing — is
legal here and absent.

**And the objection belongs with the lead — but it is smaller than I first wrote it, and the
correction is the useful half.** A Lux shell has to empty a 39-card Main Deck, and
[the setup nobody prices](2026-09-13-the-setup-nobody-prices.md) shows there are two routes to that.
I attached the **draw** route's price — roughly twenty-four slots of net-positive draw — as the reason
four more cards might not fit. **That is the wrong route to quote here.** The cheapest emptier is
`VEN-165 Shadow Temple`, a **battlefield**, and 103.4 keeps battlefields out of the Main Deck's forty
entirely, so on the Temple route the emptying costs **no deck slots at all**. This line needs no
particular battlefield, so unlike `grand-plaza-loop-time-warp` it can simply bring the Temple — and
room is not the problem.

**What a walker should check instead is the interaction the Temple creates**, which is sharper and
which I am not going to settle from outside `data/combos.json`: the Temple's burn carries no *"may"*,
so once the deck is empty every Hold is a `[Burn 3]` into an empty deck, which 431.1.b turns into a
Burn Out — and 431.2.c hands an opponent a point each time. A three-Hold chain would be giving away
three points while taking nine, and 194.2 asks for *"more points than any other player"*. That is an
arithmetic question about one board, which is exactly what a walk is for.
