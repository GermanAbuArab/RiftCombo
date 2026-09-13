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

Monotone apart from the T6/T7 pair, which is 3.04 against 2.73 at n=23 and n=15 and should be read as
noise rather than as a reversal.

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
- **The T6/T7 pair does not fit** and is reported rather than smoothed.
- **Seven of the 80 rows have no knowable smallest body** and are outside the measurement.

## Reproduce

```
node scripts/adversarial-check.mjs --turns | grep -E "^  T" > /tmp/clk.txt
```

then, for each row, resolve the id by intersecting the row's tokens with the catalogue's id set — not
by position, because the `[BANNED in constructed]` marker shifts the columns — take the minimum of
(printed Might of each non-`BASE` unit in `uses[]`) and (the rule-187 Might of each token the entry's
cards **play**, excluding those played to a base), and band by `pays` against `base`.
