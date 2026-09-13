# Ordering in the turn clock — modelled exactly, and it moves nothing

Issue #200, lane rc-synth3, 2026-09-13. Rules version 2026-07-16, opened in
`data/Riftbound-Core-Rules-2026-07-16.txt`; card text from `data/corpus_flat.txt`.
Instrument: `scripts/adversarial-check.mjs`, commits `cc02bd7` and `55c2624`.

The handoff named this as the last known gap in the clock and deliberately did not take it:

> `deployTurn` asks only whether every cost is *payable* by turn N, so it will pay a Svellsongur's
> `[Equip]` before the Svellsongur is on the board. It is a bigger change than the cost parser was:
> the state would have to carry which cards are on the board, not just which costs are paid.

It did not have to. **The gap is real as a rule, the change is four lines, it is exact, and it moves
none of the 80 rows.** This document is mostly about why that null is a result and not a shrug.

---

## 1. The constraint, and the three paragraphs it stands on

`[Equip]` is not merely a second cost. **818.1**: *"Equip is an Activated Ability keyword."*
**818.1.c.2**: *"Equip is functionally short for '[Cost]: Attach this gear to a unit you control.'"*
And **380**, four words with no subject in Riot's own text: *"Can primarily be activated while on the
Board."* So an `[Equip]` cannot be paid before the gear has been played.

**380 is cited once in `data/combos.json` and never in `CLAUDE.md`** — measured with the
hyphen-and-hash-excluding form this project settled on, `(?<![-#0-9.])380(?![0-9a-z.])`, against a
7.0 MB catalogue blob and a 562 KB `CLAUDE.md`. It is the paragraph that makes the whole constraint
exist and it was doing nothing.

**The same turn stays legal, and that is the half that decides everything below.** **359.2.d**: *"If
it is a Non-Unit Gear, it enters the Board Ready at the player's Base."* The gear is a Game Object on
the board the moment it resolves, so 380 is satisfied that turn; and no `[Equip]` cost in this pool
contains an exhaust (`CLAUDE.md` records the measurement: zero exhaust symbols across the 40
Equipment). Playing a gear and attaching it in the same Main Phase is ordinary.

## 2. Why it needed no new state

The handoff expected the state to have to carry which cards are on the board. It does not, because
of an accident of the representation that was already there.

Since #205 the allocator's state is a vector of counts **per distinct cost TYPE**, packed into one
integer. A gear's play cost and its `[Equip]` cost are already two different types — different
Energy, different Power. So *"equips paid ≤ plays paid"* is **a pure function of a state the search
already carries**, and enforcing it is a cap inside the enumeration rather than a new dimension:

- `costsOfSet` tags the play cost `link: "<base>#play"` and the equip `link: "<base>#equip"`,
  `after: "<base>#play"`.
- `typesOf` keys a type on `(e, p, unit, link)` and emits each root immediately before its dependants,
  sorted by a descriptor of the whole chain.
- `walk` caps a dependant's count at its root's count **in the state being built**, so the same turn
  is allowed and an earlier one is not.

Two details that are load-bearing rather than tidy. **`link` is in the type key** so a gear's play
cost cannot merge with an unrelated card of the same price — merging would make the constraint read
*"this equip follows SOME card of that price"*, which is looser and would leave the number a lower
bound for the wrong reason. And the **canonical order** exists twice over: the recursion reads a
dependant's root out of a slot it has already filled, which needs `dep < index`; and the memo is
keyed on the signature, which must be identical for two structurally identical cost sets from
different base codes, or every gear line would miss the memo (`link` is built out of a base code).

Runtime went **down**, not up: `--turns` is 0.18s against the 0.34s the handoff recorded, because the
prune shrinks the search. The exact allocator still covers 79 of 80 rows.

**Every count in this document was re-measured after the ignition change landed later the same day**
(§9), which moved the unopposed headline from 45 to 38 and the linked population from 33 to 31. The
six rows the strict probe moves are the same six; only the totals around them moved. That is the
second time in one session that a number here went stale within the hour, which is the whole reason
this project writes the predicate beside the number.

## 3. The null, and the proof the instrument can see

**31 of the 80 finisher rows carry a linked `[Equip]` cost. The constraint moves ZERO of them.**
(Predicate: a row whose `costsOfSet` output contains an item with an `after`; printed by `--turns` as
its own non-vacuity line so it cannot go quietly vacuous.)

A null from a new constraint is worth nothing until the instrument is shown able to **see** the thing
it says is absent. That is what `--selftest` is for: eight synthetic cost sets whose answers are
derived by hand from the rune curve, two of them ordered.

| case | expected | why |
|---|---|---|
| E12 gear + a free-floating E2 | **T6** | the E2 goes on T1 out of mana the E12 cannot use |
| E12 gear + **its own** E2 equip | **T7** | the equip cannot precede the gear, and T6 is exactly 12 runes |
| E4 gear + its E2 equip | **T3** | 6 runes on T3, and 359.2.d puts the gear on the board that turn |

The first two differ **only** in whether the E2 is linked, and the allocator returns 6 and 7. Proved
out of band as well: removing the cap fails exactly those two cases and fails the test that wraps
them. It is pinned in `test/turn-clock.test.ts` — pinning a clean state costs nothing now and can
only ever be paid for once.

**One of my eight expectations was wrong and the instrument was right.** I hand-derived *three*
`E1+1P` cards as T3, one a turn. It is T2: 164.2.a costs the rune's **exhaust** and 164.2.b costs its
**recycle**, so two runes pay two Energy *and* two Power on T1 and take two of the three cards.

## 4. The null is by a hair, and it rests on one paragraph

`--strict-ordering` forbids the same turn as well. It is **wrong as rules** — 359.2.d — and exists
only as a sensitivity probe, because a null that nobody has stress-tested is indistinguishable from a
constraint that was never wired up.

Under it, **six rows move by exactly one turn** and the unopposed headline goes from 38 to 41 of 80:

| entry | legal | strict |
|---|---:|---:|
| `reveler-svellsongur-jhin-infinite-power` | T5 | T6 |
| `shen-kinkou-svellsongur-hold` | T6 | T7 |
| `svellsongur-copy-hold` | T6 | T7 |
| `swain-shurelya-double-conquer` | T6 | T7 |
| `swain-svellsongur-conquer-burst` | T5 | T6 |
| `trinity-skyfall-arena-second-battlefield-chain` | T5 | T6 |

So the catalogue's gear lines do not have slack — they sit **exactly on the boundary**, and 359.2.d is
worth a turn on six of the eighty. That is a far more useful sentence than *"ordering does nothing"*,
and only the probe produces it.

## 5. What is still not modelled, with its size

An `[Equip]` also needs a **carrier**: 818.1.c.2, *"a unit you control"*. That unit need not be named
in `uses`, because any unit in the deck carries a generic Equipment, so requiring one from the card
set over-constrains — the repair this project has already learned not to make.

Probed anyway, in `.scratch-gap/probe-carrier.mjs`, by forbidding an equip until a unit of the same
card set is paid. **It moves no row.** The only row it touches at all is `arise-sand-soldiers-plaza`,
which it sends to Infinity — and that entry is the **one** finisher in the catalogue with an
Equipment and no unit in `uses`, and it **already declares `anyBodies: {count: 1}`**. The probe's
single failure is the catalogue telling it the answer.

So the carrier is **inert on all 79 rows where it is expressible** and unmodellable on the 80th
without inventing a decklist. Bounded, not open, and a probe rather than shipped code.

## 6. The play this refutes, and how the wrong diagnosis survived

`docs/plays/2026-09-13-the-entry-the-clock-condemned-hardest.md` hand-walked `svellsongur-copy-hold`
to **T7** against the clock's T6 and concluded *"It is ORDERING."* With ordering modelled the clock
still says T6, so the diagnosis is withdrawn.

Checked by a **second algorithm**, written from the rules rather than from the allocator: a
breadth-first enumeration over sets of paid costs, enumerating every affordable subset each turn and
applying the ordering gate to the resulting set. It agrees — all costs payable by T5, so the Hold
fires at the start of T6 — with and without the opening body the play's table adds, and it prints the
witness:

| turn | runes | spend |
|---|---:|---|
| T1 | 2 | Steel Paws E1 |
| T2 | 4 | Blue Sentinel E4 + 1P |
| T3 | 5 | Ahri E5 + 1P |
| T4 | 6 | Svellsongur ×2, E6 + 2P |
| T5 | 6 | Svellsongur #3 **and all three attaches**, E6 + 4P |

**What cost the table a turn was the table.** It spent one card a turn and left Energy idle on three
of six turns. The specific belief underneath it was that a gear played this turn cannot be attached
this turn — and the old table is *exactly* what `--strict-ordering` produces. It was the optimum of a
game one paragraph stricter than the real one, which is why it looked right: it was internally
consistent, just not with 359.2.d.

Three of that play's numbers were also stale and are re-measured in place: BURST 20 → **21** of 23,
and *"the 8 entries that are both"* is **23**, because the `--stalled` precedence fix moved seventeen
battlefield-payoff rows into the HOLD bucket after the play was written (46 ∩ 45 = 23). The document
also contradicted itself, claiming three turns early in one section and two in another.

## 7. A stated optimism that had no paragraph

The clock has always declared that it ignores which **domain** a rune is when paying Power. Nothing
said why that is an assumption rather than a choice. It is a **draw** assumption: **114** — *"Each
player shuffles their Main and Rune Decks, separately"* — **108.5.d** — *"The order of runes in the
Rune Deck is Secret Information during the course of play"* — and **430.1**, which channels *"from the
top of a player's Rune Deck"*. **108.5.d is cited by nothing else in this project**; the two hits on
`114` in the catalogue and in `CLAUDE.md` are both quantities (*"114 gear in all"*, a type histogram),
not citations. Now in the script header beside the optimism it explains.

## 8. What a reader should take

1. **A null from a new constraint is not a result until the instrument is shown to see the thing.**
   Three of my predecessor's four nulls were instrument failures. This one is not, and the difference
   is `--selftest` plus a deliberately wrong sensitivity probe, not confidence.
2. **Measure how close a null is to flipping.** *"It moves nothing"* and *"it moves nothing, and one
   paragraph stricter it moves six"* are different facts, and only the second says where the
   catalogue actually sits.
3. **A disagreement between two bounds is a question about what the difference is MADE OF, not a
   number to publish.** I sent a five-row residual to the manager and then found the whole gap was
   the readiness turn, with the completion turn identical under both arms. Instrument the
   disagreement before reporting its size.
4. **A hand table is an instrument too, and it can be suboptimal without being illegal.** The way to
   read a disagreement between a hand walk and an allocator is not to assume the allocator is missing
   a rule. Write the second algorithm.
5. **The representation can already contain the constraint.** The expensive-sounding change was four
   lines because two costs that must be ordered were already two counted types.

---

## 9. The other gap in the same header, closed the same day: an engine's own output

The header carried a second known defect beside ordering, and it points the opposite way.
`deployTurn` priced **every** card in a closure against the rune curve, which is right for a BURST
and wrong for an Energy engine: once a loop is assembled, what it buys afterwards costs no Energy.
`gemdragon-henge-vi-blind-fury` says so in its own `terminatesIn` — *"it wins by **buying**
dragonstorm-brambleback-trinity-conquer (30 Energy, 10 points in one Conquer)"* — and the clock was
charging those 30 Energy to runes.

**The model, read from `produces` and never from prose.** Cards belonging to a closure entry that
produces `infinite-energy` are the ENGINE and pay rune prices. Every other card in the merged set is
POST-IGNITION: it pays no Energy, pays no Power if some engine also produces `infinite-power`, and is
**gated** behind the engine being complete. The engine finishing *this* turn counts, which is exactly
what the hand walk of `jhin-fiora-facebreaker-recall` does — it assembles the loop and spends its
Energy in the same Main Phase.

**Eleven rows move, every one of them earlier.** `bottled-constellation-time-warp` T14 → T5,
`time-warp-hold-burst` T12 → T5, `dragonstorm-brambleback-trinity-conquer` T16 → T12,
`threshold-reveler-infinite-energy` T8 → T4, `jhin-fiora-facebreaker-recall` **T5 → T4**. The
headline goes 45 → **38** unopposed and 6 → **4** contested, and INFINITE goes 3 of 14 → **1 of 14**.

### Why it is ON by default, and how the restriction is bounded

It is a **restriction** as well as a discount: a post-ignition card may not be bought before the loop
runs, which can only push a row *later* than the truth. So it needed a bound, not a promise, and the
bound is a **sandwich**:

- `--ignition` gates and discounts → **≥** the truth.
- `--ignition-nogate` discounts without gating, so a card may be bought early at a price lower than it
  would really pay → **≤** the truth.

They **agree on 75 of 80 rows**, which pins the truth exactly there.

### The five they do not agree on are not a residual, and I reported them as one

`jayce-mesmerize-renata`, `lux-infinite-power`, `renata-bubble-bot-ready`,
`renata-mastermind-points`, `swain-double-conquer` read **T5 gated against T4 ungated**, and I sent
that to the manager as a five-row residual of ±1 turn before checking what the difference was made
of. It is not the restriction at all.

Instrumented, **`d.all` is 4 under both arms** — the completion turn is identical — and only `d.unit`
differs, 4 against 3. The whole gap is the readiness `+1` that 143.4 charges a unit landing on the
final turn. The nogate arm dodges it by *"paying"* a **free** post cost on an early turn, and the
real game never offers that: before ignition the unit costs its printed Energy.

Settled independently in `.scratch-gap/probe-readiness-residual.mjs` on the necessary condition — to
avoid the `+1`, every post unit must land before the completion turn, so the **engine and every post
unit** must be paid at printed price by then:

| row | engine | post units | ceiling through T4 |
|---|---:|---:|---:|
| `jayce-mesmerize-renata` | E17 | E11 | **E20** |
| `lux-infinite-power` | E17 | E8 | E20 |
| `renata-bubble-bot-ready` | E17 | E8 | E20 |
| `renata-mastermind-points` | E17 | E8 | E20 |
| `swain-double-conquer` | E17 | E24 | E20 |

The ceiling is itself generous — it assumes no Power is ever spent, and 161.2.b removes a rune that
is. Five of five impossible by a wide margin, so **the gated answer is the true one on every row**
and the lower arm is loose for a known artifact rather than for a modelling gap.

That probe's own first version reported the engine at **E158** where the truth is E17, because it
re-selected the fuel producers itself and swept up every fuel entry in the catalogue whose `produces`
intersected the row's needs. The verdict was unchanged and the number was garbage — which is exactly
why it now reads the closure out of the clock's own printed row.

### The one nesting the model flattens, measured rather than assumed

`lux-infinite-power` is itself an engine that **needs** `infinite-energy`, so its own six Energy
ought to be free once `lux-infinite-energy` ignites; the model charges every fuel producer at rune
prices instead. That can only over-charge, and the question is whether it over-charges by anything
that reaches a printed turn.

`.scratch-gap/probe-stage-flatten.mjs` answers it with an independent breadth-first search: **eight
rows** have a closure containing a fuel producer that itself needs fuel, and for all eight the
flattened engine and the stage-0 engine complete on the **same turn**. The reason is arithmetic
rather than luck — stage 0 alone is E13 + 1 Power and T3's cumulative ceiling is 12, so the whole
closure already lands on T4 and the extra E4 buys nothing.

**The honest denominator is ONE, not eight.** All eight rows share the same closure
(`lux-infinite-energy` + `lux-infinite-power`), which is the only multi-stage fuel chain in the
catalogue — so this is one measurement, not eight confirmations. It **reopens** the moment a closure
exists whose stage-1 engine costs enough to push completion past stage 0's turn, and the probe is the
check to re-run. Until then a per-stage ignition order is code with nothing to do.

**The reason to default it ON is a comparison of errors, not a preference.** Leaving it off keeps a
known **nine-turn** error on `bottled-constellation-time-warp` in preference to a bounded **one-turn**
one on five named rows. `--no-ignition` reproduces the old table byte for byte, and that is asserted
rather than claimed: the two runs were diffed and zero rows differ.

**A third hand-walked reference point now agrees with the clock** and is pinned in
`test/turn-clock.test.ts`: `jhin-fiora-facebreaker-recall` at **T4**, walked in
`docs/plays/2026-09-13-the-loop-that-wants-a-contested-board.md`. The clock said T5 for as long as it
charged the whole closure to runes. That is the strongest argument for the default — the model was
not fitted to the hand walk, it was built from the `produces` tags and then found to agree with it.

### Two exact transformations that made it affordable

Pricing an engine's output splits each base into gated and ungated types, which pushed the largest
closures past the 2e5 state guard — and 2e6 costs **44 seconds** against a budget of a fraction of a
second. Two collapses, both exact and both verified by diffing the default table to zero rows changed:

- **N free costs are one constraint, not N.** Items costing nothing are payable exactly when one of
  them is, so they collapse to a single representative; the only thing that rides along is the
  readiness turn a UNIT owes, carried as a disjunction.
- **An ordering constraint between two free costs never binds**, so it is dropped — which is what lets
  a wholly-free payoff collapse at all.

The first collapse shipped a bug worth recording: it reduced the count of a type that something else
**depended on**, so three free gears carrying three `[Equip]` costs became one root with three
dependants that could never be satisfied, and the row went to **Infinity**. A deadlock from outside
looks exactly like an unsolvable line. Roots are now excluded from the collapse.

---

## 10. The biggest remaining gap is not a cost gap, and pricing the engine is what exposed it

The clock prices **cards**. `lux-infinite-energy` states two requirements in its own
`prerequisites.notable` that no card cost can reach:

> **"Main Deck EMPTY — the deck draws itself out first; every card not in the loop must be in hand
> or trash."**
> **"12 runes in play (the deck's whole Rune Deck channeled); at least one Mind rune."**

**Twelve runes is turn six at the earliest.** 315.3.b channels two a turn, 161.2.a fixes the Rune
Deck at exactly twelve, and 161.2.b takes a rune off the board for every Power paid — so T6 is a
ceiling-hugging best case, not a typical one. The empty deck is worse: it is not reducible to a turn
number at all, because how fast a deck empties is a property of the list rather than of the line.

**Exactly ten of the eighty rows carry that engine in their closure, and all ten print T5** —
`bottled-constellation-time-warp`, `grand-plaza-loop-time-warp`, `jayce-mesmerize-renata`,
`lady-luminosity-loop-comet`, `lux-infinite-energy`, `lux-infinite-power`, `renata-bubble-bot-ready`,
`renata-mastermind-points`, `swain-double-conquer`, `time-warp-hold-burst`. Read them as **no earlier
than T6**, and read the empty-deck requirement as a caveat with no number behind it.

### Why it is documented and not deducted

The requirement lives in **prose**, and a prose predicate for it overstates — which this project
already knows and which I confirmed in both directions before believing my own probe:

- `(\d+) runes (in play|channelled|you control|on the board)` matches **five** notables
  catalogue-wide and only **two** are genuine requirements (`lux-infinite-energy`,
  `renata-time-warp-ekko-refresh`). The other three match inside an arithmetic ledger or inside prose
  *about* the Rune Deck cap.
- An empty-deck predicate matches **44** entries, most of which merely **discuss** Burn Out; the
  Tournament Rules 505 boilerplate asserts an empty deck on all fourteen INFINITEs where rc-synth2
  measured that only **eight** need one.

Deducting a floor from that would be a guess wearing a number. What *is* exact and quotable is the
row set — "the closure contains `lux-infinite-energy`" — because that entry declares both
requirements itself, verbatim and checkable. `.scratch-gap/probe-board-prereqs.mjs` carries the sweep
and both overstatement counts.

### The framing that matters

**The old over-charge padded these rows past their own floor by accident.** Charging a loop's payoff
to the rune curve pushed `bottled-constellation-time-warp` to T14, comfortably past a T6 requirement
nobody had noticed. Pricing the engine's output removed the padding and left the real constraint
visible — which is the opposite of introducing an error, and is the third time today that fixing one
instrument revealed what the other was hiding.

**The general form, and it is the one to carry:** an instrument that is wrong in the *conservative*
direction can conceal a second constraint indefinitely, and the constraint only surfaces when
somebody makes the instrument right. So the review question after a correction is not only *"is the
new number right"* but **"what was the old number's error hiding?"**
