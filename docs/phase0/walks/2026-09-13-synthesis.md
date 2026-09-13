# Walk — speed is bought in small bodies, measured across the whole clock

rc-synth2, issue #200, 2026-09-13. Measured at `origin/work` = `e100523`, catalogue 766 entries.
Reproduce with the script at the end; every number below is its output.

---

## Why this was measured

Three run plays shipped today — [the fastest win](../../plays/2026-09-13-the-fastest-win-needs-an-empty-deck.md),
[the loop that wants a contested board](../../plays/2026-09-13-the-loop-that-wants-a-contested-board.md)
and [two dials](../../plays/2026-09-13-two-dials-and-a-hand-you-keep-spending.md) — and all three
reached the same verdict on three unrelated families: **the speed and the fragility are bought with
the same card slots.** Three anecdotes asserting one law is worth one measurement, so this is the
measurement, and it very nearly came out the other way.

## The first attempt was a null, and the null was an artifact

Taking the minimum **printed** Might among the unit rows of each clock entry's `uses[]`:

| band | n | mean min Might | share with a Might ≤ 1 body |
|---|---:|---:|---:|
| faster than baseline | 18 | 3.0 | 11% |
| ties | 17 | 3.0 | 24% |
| slower | 39 | 3.5 | 13% |

Flat. On that evidence the law does not exist and I was ready to report it as refused.

**It is an artifact, and of exactly the population the claim is about.** The bodies these lines win
with are *tokens* — Recruits, Birds, Reflections — and **a token is never a `uses[]` row**, because
it is not a card. So the proxy was blind to every small body in the catalogue.

## Measured properly, the gradient is strong

Token Might is taken from **rule 187**, which prints it, rather than guessed: 187.1 Recruit 1, 187.3
Sand Soldier 2, 187.4 Mech 3, 187.6 Reflection 0, 187.7 Bird 1, 187.10 Tentacle 1, 187.11 Shadow
Clone 0, 187.2 Sprite 3. A token counts only where the entry's own card text **plays** it (439.2.c).

Two refinements, both of which cost the result something and both of which it survives:

- **`uses[]` rows declaring `zone: "BASE"` are excluded.** `OGN-133 Flurry of Blades` reads *"Deal 1
  to all units **at battlefields**"*, so a body the entry parks at base is out of reach. This is the
  refinement that stopped this project shipping a false notable to three entries, and skipping it
  here would have been the same mistake.
- **A token whose text says *"to your base"* or *"at your base"* is excluded** for the same reason.

**73 of the 80 clock rows have a knowable smallest body at a battlefield.**

| band | n | mean min Might | dies to 1 damage |
|---|---:|---:|---:|
| **faster than baseline** | 19 | **1.63** | **68%** |
| ties | 17 | 2.41 | 53% |
| **slower** | 37 | **3.35** | **22%** |

By absolute turn:

| turn | n | mean min Might | dies to 1 damage |
|---|---:|---:|---:|
| T3 | 3 | 0.67 | 100% |
| T4 | 8 | 1.50 | 75% |
| T5 | 13 | 2.38 | 54% |
| T6 | 23 | 3.04 | 30% |
| T7 | 15 | 2.73 | 40% |
| T8+ | 11 | 3.64 | 9% |

Monotone apart from the T6/T7 pair, 3.04 against 2.73 — and that pair is not noise, it is **class
mixing**. The turn bands are not homogeneous: T6 is 9 BURST, 7 ALT_WIN, 4 INFINITE and 3 CHAIN while
T7 is 8 BURST, 5 CHAIN and 2 ALT_WIN. Cut by class instead and the wobble disappears:

| class | n | mean min Might | mean turn |
|---|---:|---:|---:|
| **ALT_WIN** | 24 | **1.58** | **4.92** |
| INFINITE | 12 | 2.67 | 5.83 |
| CHAIN | 15 | 3.13 | 7.67 |
| BURST | 22 | **3.59** | 6.95 |

**That is the cleaner statement of the same thing, and it carries a second result the turn bands hide.**
Sorted by body size the classes are ALT_WIN, INFINITE, CHAIN, BURST; sorted by turn they are ALT_WIN,
INFINITE, BURST, CHAIN. The two orders agree except on the last pair — **BURST has the biggest bodies
in the catalogue at 3.59 and is still a turn faster than CHAIN**.

### The one exception is one card, and separating it makes both orders identical

The mechanism was asserted before it was measured, so it was measured. **`OGN-122 Time Warp` is the
pool's only extra-turn source** (E10 + 4 Power a copy, and 103.2.b caps it at three). Of the CHAIN
rows, **7 of 17 run it and average turn 9.71; the other 10 average 6.50. Of the 23 BURSTs, ZERO run
it.** So the inversion is not a property of the CHAIN class, it is the Time Warp half of it. Split
that out and the two orderings are the same order:

| group | n | mean min Might | mean turn |
|---|---:|---:|---:|
| ALT_WIN | 24 | 1.58 | 4.92 |
| INFINITE | 12 | 2.67 | 5.83 |
| CHAIN **without** Time Warp | 9 | 3.11 | 6.78 |
| BURST | 22 | 3.59 | 6.95 |
| — | | | |
| CHAIN **with** Time Warp | 6 | 3.17 | **9.00** |

Body size 1.58 < 2.67 < 3.11 < 3.59; turn 4.92 < 5.83 < 6.78 < 6.95. **Monotone in both, in the same
order, with no exceptions** — and the six rows that sit off the line are exactly the six that spend
their deployment on turns rather than on bodies, landing two turns later at no extra body size.

So the gradient is a CLASS gradient first and a turn gradient second, the per-turn table above is its
shadow, and the single card that breaks it is the single card in the pool that buys the one thing
bodies cannot.

## The finding, and the mechanism

**The faster a finisher pays, the smaller its smallest body at a battlefield. Sixty-eight per cent of
the rows that beat the do-nothing Hold curve stand on a body that one Energy kills; twenty-two per
cent of the rows slower than it do.**

The mechanism is not a coincidence and it is not about card quality. A line is fast because it wins
with **tokens**, and 187.1, 187.6 and 187.7 print those tokens at 0 or 1 Might. Tokens are cheap
precisely because they are small, so the same property that buys the turn is the property that loses
to `OGN-133 Flurry of Blades` at one Energy. **Speed in this catalogue is bought in small bodies.**

That is the catalogue-wide version of the verdict all three plays reached from one family each, and
it is the arithmetic behind the sentence "the fastest class is the least defended" — the ALT_WIN
class is both the fastest (5 of 26 slower than doing nothing, against BURST's 20 of 23) and the one
whose bodies are tokens.

## What this does NOT say

- **It is not a claim that a line loses.** It says the *smallest* body dies, not that the line needs
  that body. Some do not; that is per-entry reading, not a statistic.
- **It is not a claim about card quality or about the authors.** A token line is fast *because* the
  bodies are cheap; the gradient is the game's, not the catalogue's.
- **The per-turn T6/T7 pair does not fit**, and the class cut explains why rather than smoothing it:
  a turn band mixes classes whose bodies differ by two Might.
- **Seven of the 80 rows have no knowable smallest body** and are outside the measurement.

## Reproduce

```
node scripts/adversarial-check.mjs --turns | grep -E "^  T" > /tmp/clk.txt
```

then, for each row, resolve the id by intersecting the row's tokens with the catalogue's id set — not
by position, because the `[BANNED in constructed]` marker shifts the columns — take the minimum of
(printed Might of each non-`BASE` unit in `uses[]`) and (the rule-187 Might of each token the entry's
cards **play**, excluding those played to a base), and band by `pays` against `base`.
