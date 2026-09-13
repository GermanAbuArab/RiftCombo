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

## 3. The null, and the proof the instrument can see

**33 of the 80 finisher rows carry a linked `[Equip]` cost. The constraint moves ZERO of them.**
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

Under it, **six rows move by exactly one turn** and the unopposed headline goes from 45 to 47 of 80:

| entry | legal | strict |
|---|---:|---:|
| `reveler-svellsongur-jhin-infinite-power` | T8 | T9 |
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
3. **A hand table is an instrument too, and it can be suboptimal without being illegal.** The way to
   read a disagreement between a hand walk and an allocator is not to assume the allocator is missing
   a rule. Write the second algorithm.
4. **The representation can already contain the constraint.** The expensive-sounding change was four
   lines because two costs that must be ordered were already two counted types.
