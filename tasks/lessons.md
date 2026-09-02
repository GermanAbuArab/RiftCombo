# Lessons

## 2026-08-30 — Don't convert a comprehension problem into a combinatorics problem

**What happened.** R6 established that Riftbound's entire card pool with rules text is ~43k tokens — it fits in one context window. I then designed a pipeline that ignored that: extract primitives → brute-force resource-flow subset search → LLM verify. It produced 19,750 candidates, found **zero** real combos, and clustered 23 around a combo I already knew was broken.

**Why it failed.** Every resource in the model dangled (`RUNE_READY` 10 producers / 0 consumers) because I modeled production and consumption but never the *conversions* that close a loop. And structurally: real combos are 4–5 cards (3×10¹⁰ subsets) with game-state preconditions a static model can't express.

**What worked instead.** The extraction agents — doing mechanical data transformation, never asked about combos — spontaneously surfaced 7 combo findings, all 7 verified correct, including subtle refutations. Comprehension beat arithmetic.

**Rule:** when the whole problem domain fits in a context window, read it. Reach for search when it doesn't.

## 2026-08-30 — Derive the filter from the domain, not from the analogy

**What happened.** I built a "combo primitive" filter to prune 935 cards to 316, porting MTG's primitive list (mana, untap, recursion, tokens). Tested against the validation set, it missed **9 of 20** cards — including `Renata Glasc, Mastermind` (`⟳: Score 1 point`), the actual win condition of the archetype, and `Time Warp`.

**Why.** Riftbound's payoffs are points, extra turns, draw, equip, move, might-buffs. None of those are MTG primitives. The filter would have made the pipeline structurally incapable of finding the combos it was being validated against.

**Rule:** a premature optimization that silently removes the right answer is worse than no optimization. Prune on derived structure, never on a borrowed category list — and check filter *recall against known-good cases* before trusting it.

## 2026-08-30 — Verify pessimistic subagent verdicts before acting on them

**What happened.** A research agent reported that Riot has a Riftbound-specific policy banning third-party card assets — a finding that invalidates a planned dependency. Per the research-discipline rule I fetched `developer.riotgames.com/docs/riftbound` myself and confirmed every quote verbatim.

**Also:** a hunt agent claimed the corpus file's domain column was lossy. Verified — and it was worse than reported: my `"".join(x[0] for x in domains)` collapsed **Calm, Chaos AND Colorless** all to `"C"`. The agent worked around corrupted data I handed it and reported the bug.

**Rule:** pessimistic verdicts are load-bearing — confirm at the source. And when a subagent says your data is wrong, check: it probably is.

## 2026-08-30 — Trailing newlines silently destroy JSONL merges

Eight agents wrote `chunk*.jsonl`; four omitted a trailing newline. Per-file counts summed to **805**, but `cat` yielded **802** — three records fused at chunk boundaries. Fused lines are invalid JSON and a lenient loader (`except JSONDecodeError: pass`) drops them **silently**.

**Rule:** normalize trailing newlines before merging, and verify `sum(per-file) == count(merged)`. Never let a parse-error handler swallow records without counting them.
