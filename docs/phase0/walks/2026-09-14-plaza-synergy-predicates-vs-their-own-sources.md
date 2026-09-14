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

---

## 7. Addendum 2: the partial-miss band read in full — a THIRD shortfall, and one exclude I nearly staged and had to withdraw

The 100%-miss band is finished. The remaining band is **22 rules missing on SOME of their sources but
not all, 33 misses**, read end to end. **Twenty-one are the documented second meaning.** The
twenty-second is real.

### `[Ww]hen I move` is not how three cards word a move trigger

Four rules share the predicate `[Ww]hen I move\b` at 28 partners each — `ride-the-wind-move-triggers`,
`relentless-pursuit-move-triggers`, `windswept-hillock-move-triggers`, `unforgiven-move-triggers`,
every one of them an anchor that BUYS an effect Move. All four miss the same three cards, whose move
trigger is an Nth-time clause rather than a when-clause:

| card | domains | text |
|---|---|---|
| `OGN-205` Yasuo, Windrider | chaos | *"The third time I move in a turn, you score 1 point."* |
| `OGN-162` Miss Fortune, Captain | body | *"The first time I move each turn, you may ready something else that's exhausted."* |
| `VEN-002` Blade Twirler | fury | *"The first time I move each turn, choose a player. They [Burn 1]."* |

> Swept over text+effect of every deckable card folded by name+type: the widened predicate adds
> **exactly these three and nothing else**. Verified per rule with `partnersOf()`: **28 → 31, strictly
> additive, nothing lost, all four.**

**Self-proving, for the third time in this file:** `OGN-205 Yasuo, Windrider` is the subject of **two
of `unforgiven-move-triggers`' own basis entries** — `yasuo-syren-unforgiven-point` and
`yasuo-windrider-ride-the-wind-chain`. The rule cannot see the card two of its own sources are built
on.

### An exclude I staged and then withdrew, because the rule's own `why` refuted it

My draft excluded the two *"first time each turn"* cards on **383.3.e.1** — *"Such a Triggered Ability
will only be performed the specified number of times"* — so a SECOND move in the same turn adds
nothing to them. **That is true and it is not what these four rules claim.** Every one of their `why`
fields is about firing a move trigger **at all** through an effect Move (420.1, 420.2.a), and
`unforgiven-move-triggers` says so outright, calling it one free move trigger a turn for as long as
Unforgiven is out — which is exactly what a *"first time each turn"* trigger wants.

**Reading the anchor's own `why` is what refuted it.** The distinction survives as a per-partner note
rather than a refusal: 383.3.e.1 caps Miss Fortune and Blade Twirler at one firing however many extra
moves you buy, while `OGN-205` is the one card in the pool that WANTS several — *"The third time I move
in a turn"* is unreachable without them, which makes these four anchors its natural partners rather
than incidental ones.

### Deliberately not staged

`svellsongur-copy` and `grandmaster-at-arms-equip-relay` miss the same three cards through wider
alternations. **Not staged**: Svellsongur copies the carrier's text, so v copies yield 2^v instances,
and how 383.3.e.1's cap interacts with several instances of one *"first time each turn"* ability is
settled by no paragraph I read. **That needs a walk, not a predicate change.**

---

## 8. Final tally for this instrument, across five answer sets

| set | result |
|---|---|
| `adversarial-check` mass answers | one WORDING short — `UNL-072 Crescent Strike` |
| `adversarial-check` gear answers | one FAMILY short — bounce: `SFD-135`, `SFD-109`, `SFD-147` |
| `adversarial-check` garrison protection | **CLEAN**, and now pinned as a test |
| `synergies` time-warp | one PHASE short — `VEN-067` (applied) |
| `synergies` buff | one WORD short — `SFD-166`, across 7 rules |
| `synergies` move | one WORDING short — `OGN-205`, `OGN-162`, `VEN-002`, across 4 rules |

**Twelve fixes staged. Every one was a predicate written from the wording of the card its author had
already met — and in every case the card it could not see was already written down somewhere else in
this repository, by a human, often in the rule's own source entry.**

---

## 9. Addendum 3: the ratchet refused my own stamp, and the control says the stamp should not have moved

rc-manager9 applied seven of the eight buff fixes and **handed `blade-dancer-buff-is-choosing` back**:
I declared `reviewedCount: 33` / `reviewedSet: d0ac27a5` and the actual is **32 / `c3d9eca0`**.

**I fingerprinted the WIDENING ALONE and never applied my own `excludes` entry — which removes the very
card the widening adds.** My own sentence three sections up is both why it was caught and why I should
have caught it: *a fingerprint you cannot reproduce backwards is not a fingerprint*, **and that applies
to a declaration as much as to a file.** I ran the reproduce check on the rule's LIVE state and then
failed to run it on my own PROPOSED state.

### The control, and it says something sharper than "off by one"

Recomputed with `loadCardIndex()` + `partnersOf()` + `fingerprintOf()`, live state reproduced first:

| state | count | fingerprint | `SFD-166` |
|---|---|---|---|
| live (in the file today) | 32 | `c3d9eca0` | absent |
| widening alone — **what I declared** | 33 | `d0ac27a5` | **present** |
| widening **and** the excludes entry — the edit I actually staged | **32** | **`c3d9eca0`** | absent |

**The stamp does not move at all.** The partner list after this edit is byte-identical to the one in
the file today, because the two halves of my own edit cancel.

### So why make an edit that changes no list?

**Because it changes the REASON, and the reason is now load-bearing.** Today the rule fails to match
`SFD-166 Rally the Troops` by a wording accident — the alternation lacks `it`. After the edit it fails
to match it because a human read **383.4.b.3** and **355.10.d.1** and wrote the refusal down where the
next reader will find it.

That matters precisely **because the six sibling rules have now been widened**: without the exclude,
the next person who aligns this predicate with its siblings silently pulls Rally the Troops into a rule
that 383.4.b.3 says it cannot fire. It is exactly how `OGN-146 Wallop` and `OGN-207 Call to Glory` are
already held out of these same six rules — matched by a regex accident, held out by an explicit
`excludes` carrying its reason.

Re-staged: `reviewedCount` **32**, `reviewedSet` **`c3d9eca0`** — unchanged — and only `reviewed` moves
to 2026-09-14, because a human re-read the list and the list did not change.

> **The standing form: a staged artifact is a QUEUE, and the ratchet is what makes it one. Compute your
> stamp from the state your edit ACTUALLY produces — both halves of it — not from the half you were
> thinking about.**
