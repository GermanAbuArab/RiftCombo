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

---

## 6. Addendum, same day: the second real shortfall is one WORD, and the disposition splits per rule

Reading the remaining fifteen 100%-miss rules, fourteen are the sanctioned second meaning. The
fifteenth, `fiora-buff-ready`, is the highest absolute miss count in the file (4 of 10) and opening it
found a second genuine shortfall — **in the predicate SIX other rules share.**

### One word

The shared buff predicate is `[Bb]uff (a|all|another|me|up to|your)`. `SFD-166 Rally the Troops`
(order, E2, [Action]) reads *"When a friendly unit is played this turn, buff it."* **"buff it" is not
in the alternation**, so seven rules that hunt buff sources cannot see a card that buffs.

> **PREDICATE, and it is exactly one card wide**: swept over text+effect of every deckable card folded
> by name+type, the widened alternation adds **`SFD-166` and nothing else**. Verified per rule with the
> project's own `partnersOf()`: **strictly additive on all seven, nothing lost.**

### A regression caught only by printing what a change LOSES

My first attempt swapped the shared predicate into every rule. `fiora-buff-ready` does not use the
shared predicate — it carries a **third alternation arm** for `[Gg]ive … +N :rb_might:` grants, which
is how it reaches 98 partners — and the swap took it **98 → 34, losing 64 cards.** It was caught
because the harness prints `LOST` beside `ADDED`. The shipped edit is instead **minimal and rule by
rule: add one member to that rule's own alternation**, which leaves every other arm untouched and
takes Fiora 98 → 99.

> **A widening is not safe because it is a widening. State what it LOSES, every time.**

### `buff as` matched `buff a`, and the humans had already caught it

The same missing word boundary means `[Bb]uff (a|…)` matches **"spend a buff **as** an additional
cost"** — `OGN-146 Wallop` and `OGN-207 Call to Glory`, the two cards that SPEND a buff, which
CLAUDE.md records as the exact opposite of placing one. **This is not a defect**: both are listed in
`partner.excludes` on all six rules where they would be wrong, and absent from `wallop-buff-spend`,
which is anchored on Wallop and wants them. **A human read the match list and wrote the reason down,
which is the project's stated discipline doing exactly its job.** Reported here as a confirmation, not
a finding.

### The disposition splits, and one rule gets a refusal instead of a partner

Six rules gain `SFD-166` as a legitimate partner. **`blade-dancer-buff-is-choosing` does not**, and
the reason is a paragraph pair:

`SFD-195 Blade Dancer` reads *"When you choose a friendly unit…"*, and **383.4.b.3**: *"Although these
abilities say 'choose' in their Condition, they trigger specifically"* when an appropriate Game Object
is Targeted. Rally buffs **the unit that was played** — so **355.10.d** applies (*"It is
programmatically selected based on its characteristics rather than chosen by the spell or"* ability),
and **355.10.d.1** settles it: *"This exception applies solely to objects for which no choice is ever
possible."* No choice is ever possible here. 702.2.a's *"a player chooses a Unit"* is the buff
ACTION's internal description, and 383.4.b.3 exists to stop that word being read across — the same
correction CLAUDE.md already records for `OGN-223 Peak Guardian` and `OGN-153 Overt Operation`.

So that rule's predicate is widened for consistency **and** gains an `excludes` entry carrying the
refusal, which is where a reader will find it. **Eight fixes staged in
`.scratch-plaza/synergy-fixes.json`**, every old fingerprint reproduced before the new one was
computed, all 19 quoted passages proved verbatim against the rulebooks and the corpus.
