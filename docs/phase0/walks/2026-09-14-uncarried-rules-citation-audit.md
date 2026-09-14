# The 63 uncarried rule paragraphs — audit, dispositions, and two defects in the instrument that found them

Lane rc-gap3, 2026-09-14, issue #187. Manager rc-manager9.

## What this was

`CLAUDE.md` is built by promoting FINDINGS, so it keeps the half of a rule that surprised somebody and
drops the half that was assumed. The project has named that shape at least six times — `355.7` against
its exceptions `355.10.d/e/f`, `136.2.c` against `136.2.d`, `811.6` derived from the tail of `811.1.b`,
`384` against `385.1`/`385.2`, `316.8.b.1`, `355.8` against `355.13`. This audit went looking for the
rest of it systematically rather than one bullet at a time.

**The history matters, because it is the shape of the task.** On 2026-09-13 lane rc-gap drafted 48
bullets covering 61 citation gaps and handed them to a manager. They were applied UNEVENLY: the
substance of many landed **reworded into existing bullets**, which is why a prose sweep cannot find
them — rc-manager9 tried three times and over-counted at 39, then 30, then 30, each time because an
applied bullet gets INTEGRATED rather than pasted. Two of those spot-checks were false positives
caught only by reading.

The predicate that holds keys on **rule numbers**, which are exact. That produced 34 bullets naming
**63 distinct uncarried rule tokens**, handed over in `.scratch-mgr9/uncarried-rules.json`.

## The instrument was wrong in BOTH directions, and each was found with a different tool

The project's "only safe form" is `(?<![-#0-9.])HEAD(?![0-9a-z.])`. It has two failure modes.

**(a) FALSE POSITIVE on any bare three-digit rule.** The lookbehind excludes a preceding hyphen, `#`,
digit and dot — and **not** a preceding `/`, `=` or letter. Measured over `data/combos.json`, reading
every hit rather than counting them:

| token | v1 count | real | what the hits were |
|---|---|---|---|
| `115` | 6 | **0** | `github.com/.../issues/115`, and the walk filename `2026-09-06-issue115-...` |
| `370` | 1 | **0** | a YouTube timestamp, `watch?v=m4ivKG_9UYA&t=370` |
| `800` | 1 | **0** | a YouTube **video id**, `watch?v=HPopPjfG800&t=603` |
| `733` | 7 | **6** | one `&t=733`; the other six real |

Third member of a family this file already records twice (`\b184\b` matching `UNL-184`; `#171` putting
four phantom rules in a top-fifteen).

**(b) FALSE NEGATIVE on any citation that ENDS A SENTENCE — the dangerous direction, because it
reports a CARRIED rule as uncarried.** The lookahead `(?![0-9a-z.])` rejects the sentence-closing
period. `CLAUDE.md` line 215 read *"The reading stands on 477.1.b.1.a + **816.3.**"* and `816.3`
counted **zero**. Blast radius on a known positive: `355.10.d` counts **14** under the old form and
**15** under the fix — and **14 is the figure the file published about itself**, so its own self-audit
number was one low for the same reason. Corrected in `CLAUDE.md` the same day.

The form that survives all four traps — hyphen, hash, sub-part dot, sentence-closing period:

```
(?<![-#/=_0-9.A-Za-z])HEAD(?![0-9a-z]|\.[0-9a-z])
```

The lookahead must reject a following dot **only when that dot begins a sub-part**: that keeps `383.2`
from absorbing `383.2.a.1` while letting `816.3.` close a sentence.

**How (b) was caught is the durable half.** Not by a better regex — by a **second, independent
instrument disagreeing with the first**. The forward tokenizer from `test/rule-refs.test.ts`
(`/\b\d{3}\.(?:\d+[a-z]?|[a-z])(?:\.(?:\d+[a-z]?|[a-z]))*\b/g`) walks the text and collects a SET of
892 distinct references; the needle search asks one question 63 times. They disagreed on exactly one
token, and that token was a real defect. **An absence proved with one instrument is not proved.**

`scripts/claude-md-gap.mjs` was fixed in `1727a80` (#207) to the v1 form and therefore still carries
both modes; its published population of 75 is an upper bound on one side and a lower bound on the
other.

## Dispositions

All 63 tokens, none left undisposed and none padded.

| disposition | n |
|---|---|
| **APPLY** | 58 |
| **REFUSE** | 4 |
| **ALREADY THERE (partial)** | 1 |

**The four refusals, with their reasons, because a refusal with a reason is a result:**

- **`115`** — catalogue **0**, corrected from 6; every v1 hit an issue URL. Its sibling `116` is
  genuinely cited 9 times, so the block is not invisible; this token is.
- **`370`** — catalogue **0**, corrected from 1. The bare parent of a block whose children the file
  carries heavily: `370.1.a.2` 27 catalogue / 5 here, `370.3` 31 / 3, `370.2` 10 / 2. #207's
  parent-absorbed-by-its-own-children case, already dispositioned there as not a gap.
- **`800`** — catalogue **0**, corrected from 1, and `800.1` is 0 too. Its drafted bullet was about the
  gap TOOL, not the game.
- **`829`** — catalogue **0** and correctly so: `829.1.b` runs **94** catalogue / 3 here and
  `829.1.c.1` 7 / 1. The [Flow] block is carried through its operative children.

**`816.3`** is ALREADY THERE, carried once as a bare citation; its CONTENT is stated for the first time
in the reframed characteristic bullet.

So **the honest population was 59, not 63**, and the correction came entirely from the instrument.

## Three closed families the file carried a proper subset of

Each was found by the move this file already recommends — *when a phrase turns out to be load-bearing,
grep the rules for the PHRASE and see how many members its family has.*

**Keyword redundancy — EIGHT members** (`grep -nE "redundant|do not trigger separately"`): `805.4`
Accelerate, `810.2` Ganking, `811.4` Hidden, `815.2` Tank, `816.2` Temporary, `819.2` Quick-Draw,
`822.2` Ambush, `826.5` Backline. The file carried **two** (815.2, 810.2) while reasoning from the
family in its own words. **The drafted bullet said five.** And the predicate is the whole story: a
catalogue entry independently published **seven**, correctly, because it grepped the word *redundant*
and `819.2` alone is worded *"do not trigger separately and have no effect beyond the first"*. **Seven
by the word, eight by the concept** — this file's state-the-predicate rule arriving from the catalogue.

**"If X is omitted, it is presumed to be 1" — EXACTLY FOUR members**: `807.1.b.3` Assault,
`809.1.b.3` **Deflect**, `814.1.b.3` Shield, `823.1.c.2` **Hunt**. The file carried Assault and Shield.
**The Deflect member was missing where it matters most**: the file discusses the Deflect tax constantly
— 47 printings, `809.1.c` charging *"for each time they choose"* — without ever stating that a bare
`[Deflect]` costs 1 Power per choice.

**"is a characteristic of" — THIRTY members**, one per keyword plus `150.5` Equipment and `198.2`
Location. **This REFRAMED a drafted bullet that treated it as a three-keyword finding.** The honest
statement is universal: *"can a card read this keyword"* is never the question, *"does any card in the
pool read it"* always is — so the useful sweep is over the POOL, never over the rules.

## The single largest correction: the turn has two orthogonal axes and the file carried one

`308` is Neutral-or-Showdown; `309` is Open-or-Closed; `310` names the four combinations. `CLAUDE.md`
cited `310.1` Neutral Open and `310.2` Neutral Closed and **never named `310.3` Showdown Open or
`310.4` Showdown Closed**.

The consequence is not tidying. The file cites **381** eight times — *"All Activated Abilities can only
be activated on the Controlling Player's Turn and during an Open State"* — and reads it as confining an
activated ability to the Main Phase. **It does not: a Showdown Open State IS an Open State**, so 381
alone permits a Showdown activation, and the paragraph that bars it is **`308.1.a`**. The file already
carried the [Action]/[Reaction] escape and sourced it to the KEYWORD rules (`806.1.b`, `813.1.c.2`) —
**the exception carried, the rule not, and here the missing rule is what CREATES the need for the
exception.** `151.2` is the card-type-specific version saying both halves in one sentence, and it is
GEAR-specific, which is exactly the object the file's repeatable-activated-ability findings turn on.

**It was caught auditing a sentence this lane had written one batch earlier** — the batch-1 Empower
bullet said 827.1 puts Empower under 381 and therefore out of a Showdown, which is one paragraph short.
Applied with the correction.

## Riot works its examples with our cards, and the vein is not spent for THIS file

Five of the 58 are paragraphs whose worked example is a pool card the file already argues about:

- **`822.1.d`** — Ambush as a VERB, worked verbatim on **`UNL-120 Rengar, Trophy Hunter`**. The file
  says three separate times that *"his own text lifts the restriction"* and never carried the rule.
- **`715.4.a`** — Prevent includes Bonus Damage in the total, worked on **`OGN-296 Void Gate`**. The
  file carries Void Gate and carries Prevent-as-a-depleting-pool and never that they touch.
- **`359.3.e.16`** — a delayed ability whose duration ended is never generated, worked on **`OGN-288
  Targon's Peak`**, a card this project has refused twice and reopened twice.
- **`355.11.b`** — a group target shrinks to a legal subset, worked on **`OGN-256 Fox-Fire`** killing
  four 1-Might Recruits.
- **`359.3.e.9.a`** — counting a chain item's targets, worked on **`OGN-041 Volibear, Furious`**.

**A fourth candidate was checked and deliberately NOT reported, and the reasoning is the point.**
`OGN-017 Iron Ballista`, `OGN-044 Clockwork Keeper` and `SFD-058 Ornn, Blacksmith` are also
rules-named pool cards absent from `CLAUDE.md` — and **all three are CATALOGUED** (7, 2 and 11 mentions
in `combos.json`). The file's claim that *"the rules-named-card vein is spent, three usable cards
remain"* is about the **CATALOGUE** and stands. Reporting them would have been a false correction.

## A hazard created by applying the work, found only because the file was applied

After the manager applied 21 items and pushed, re-running the same `apply.json` would have **re-applied
17 of them**:

- **8 of 12 splices are EXTENSIONS** whose `new` CONTAINS `old`, so after application the `old` needle
  still occurs **exactly once** and a uniqueness gate passes it.
- **all 9 appends** still match their anchors, because an anchor is an existing bullet you insert
  *before*, and inserting does not consume it.

Only the 4 true REPLACEMENTS are idempotent, and by accident rather than design.

**This is the mirror of the race the manager had already recorded.** That one was *the file changed
between validate and write*; this one is *the file is already correct and the instruction list has not
been retired* — and it produces the defect this project names as its worst, except that the two copies
standing are two copies of the CORRECTION.

The remedy that works today is one line and fails safe: **before applying, assert that each item's
`new` does NOT already occur in the file.** `\.scratch-gap3/dryrun.mjs` carries it — **and its first
version reported three false positives**, because it tested a 120-character PREFIX of `new`, which for
an extension splice IS the old text. The exact test is the FULL `new`. **Validated against a known
positive**: it detects 21 of 21 already-applied items and 0 of the un-applied batch. A gate with no
control cannot tell *"nothing is wrong"* from *"I am not looking"*.

Structurally better: **an applier should truncate its own queue after a successful write.** The list is
a queue; the record is git.

## Method notes worth more than any single disposition

1. **Key on rule NUMBERS, not prose, when auditing whether a finding was applied.** An applied bullet
   is INTEGRATED and reworded; a rule number is not. Three prose sweeps over-counted before this worked.
2. **Prove an unexpected absence with a second, different instrument.** Needle-search and
   forward-tokenize disagreed on exactly one token and it was a real defect.
3. **Print a non-vacuity line before any count.** Every probe here opened by reproducing a figure the
   file publishes about itself (`355.10.d` = 14/15) and by testing a control that must return zero.
4. **Expect the first number to be too big — including your own.** It happened three times in this one
   task: the redundancy family (5 → 8, the other direction for once), the characteristic family (3 →
   30), and the idempotence gate (3 false positives → 0).
5. **Writing the apply-JSON forced the splice-versus-append decision per item**, which is the decision
   prose leaves to the applier. 13 of 21 became splices rather than the 2 originally named, because a
   splice cannot leave the stale half standing.
