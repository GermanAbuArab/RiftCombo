# A synergy rule diffed against the entries it was extracted from: 222 rules, 19 suspicious, 1 real

**Lane rc-plaza, 2026-09-14. Refs #200, #220.** Third application of the same instrument: a predicate
over `cards.json` and a hand-authored description of the same pool are two independent things, and
diffing them finds the wording the predicate's author had not met. Here the predicates are the 222
`partner.textMatches` in `data/synergies.json`, and the independent description is each rule's own
`basis.combos` — **the entries the rule was extracted from.**

**RESULT: one genuine shortfall, in `time-warp-once-per-turn`, and its own basis entry is the proof.**
Staged in `.scratch-plaza/synergy-fixes.json`; `data/synergies.json` is the manager's.

---

## 1. The check and its built-in ground truth

A rule's `basis.combos` names entries it came from. If the entry **runs the anchor** and the rule's
own partner predicate matches **no other card in that entry**, either the rule was extracted from a
mechanism demonstrated with different cards — the second legitimate meaning
`test/synergy-basis.test.ts` names in its own docblock — or **the predicate is short of the card that
motivated it.**

> **PROBE**: `blue-sentinel-hold`'s predicate matches `SFD-115 Trinity Force` — a known partner.
> 222 rules; 10 carry no `basis.combos`; 19 are tag-only with no text predicate.

| cell over (rule, basis entry) pairs | count |
|---|---|
| anchor present, predicate matches | 386 |
| **anchor present, predicate MISSES** | **58** |
| anchor absent, predicate matches | 21 |
| anchor absent, predicate misses | 16 |

58 across 43 rules; **19 rules miss on 100% of their own sources**, which is the shape worth reading.

---

## 2. Four read, three sanctioned, one real

- `eye-of-the-herald-effect-mover` (2/2) — partner is *"Move a friendly unit"*; the basis entries pair
  the Eye with **self**-movers, which the predicate rightly excludes. Second meaning.
- `blade-dancer-buff-is-choosing` (1/1) — partner is a **buff**; the basis entry
  `blade-dancer-caitlyn-choose-ready` demonstrates the **choose** half, which is what the rule
  generalises from under 702.2.a. Second meaning.
- `ancient-henge-energy-surplus` (2/2) — partner is an `[Add]` Energy card; the basis entries feed the
  Henge from **loops**, not from a printed `[Add]`. Second meaning.
- **`time-warp-once-per-turn` (4/5) — REAL.**

---

## 3. The one real shortfall, and why it is exactly one card wide

The rule's predicate is `[Aa]t the (start of (your|my) Beginning Phase|end of your turn)` and its own
`why` reads *"The extra turn brings a whole Beginning Phase and a whole end of turn with it, so
anything keyed to those fires again."*

**An Additional Turn is a whole turn, so it brings a whole MAIN PHASE too.** 735: *"Certain Game
Effects will instruct a player to 'take a turn after this.' These effects create a temporary
Additional Turn owned by that player that is inserted into the turn queue after the current turn."*
316 is the Main Phase, and it arrives with 315 and 317.

**The proof is the rule's own basis entry.** `bottled-constellation-time-warp` is one of its five, and
it exists **because** Time Warp runs `VEN-067 Bottled Constellation` — *"At the start of your Main
Phase, you may kill 3 other friendly units and/or gear to score 1 point"* — a second time. **The rule
that generalises Time Warp cannot see the card its own source entry is built on.**

> **The widening cannot over-reach.** Swept over text+effect of every deckable card folded by
> name+type: **exactly ONE card in the pool prints *"at the start of your Main Phase"***, and it is
> `VEN-067`. There is nothing else for the wider predicate to catch. Verified with the project's own
> `partnersOf()`: **13 → 14, strictly additive, nothing lost.**

### The re-stamp, and a fingerprint I nearly got wrong

`src/synergies.ts` runs a review ratchet: a predicate change moves the match list, and `reviewedCount`
and `reviewedSet` must be re-stamped by a human who has read the new list. Staged: `reviewed`
2026-09-14, `reviewedCount` **14**, `reviewedSet` **`64d47399`**, and all fourteen are read in full in
the staging file.

**My first fingerprint was wrong and the check that caught it is the one worth keeping.** I
reimplemented the name+type fold by hand and got `8020912a`, because my fold picked
`VEN-SP2 Sona, Harmonious` where `partnersOf` picks `OGN-073`. It was caught because the harness
**asserts the OLD fingerprint reproduces the value already in the file before computing the new one** —
it printed `MISMATCH` and refused. Re-run through `loadCardIndex()` + `partnersOf()` + `fingerprintOf()`
the old value reproduces exactly (`9a937eba`), which is what makes the new one trustworthy.

**A fingerprint you cannot reproduce backwards is not a fingerprint. Recompute the OLD value first
and refuse to continue if it does not match.**

---

## 4. What is NOT claimed

The other **54** anchor-present misses are **not** claimed as defects. Four were read, three were the
documented second meaning, and **a count of unread rows is not a finding** — the same refusal this
lane already made about 96 unshipped notables. The rows are in `.scratch-plaza/syn-group.mjs`, ranked
by miss rate, for whoever reads them next; the 19 at 100% are where to start.

## 5. Third confirmation of one shape

Three instruments, three independent descriptions of one pool, three diffs, three results: the mass
answer set was one wording short, the gear answer set was one FAMILY short, the garrison protection
set was clean — and now one synergy predicate is one PHASE short. **In every case the thing the
predicate could not see was already written down somewhere else in this repository by a human.**
