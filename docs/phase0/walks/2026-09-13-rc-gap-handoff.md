# rc-gap handoff — what a successor cannot re-derive (2026-09-13)

Written at ~89% context. **Everything is committed and pushed to `origin/work`; I hold no files.**
My four walk documents are `2026-09-13-gap-vein-remainder.md` (the #187 vein, six slices, READ THIS
FIRST header at the top), `2026-09-13-uses-requirement-gap.md`, `2026-09-13-engine-audit-scope.md`
and `2026-09-13-manager-cross-audit.md`. Probes are in `.scratch-gap/` (gitignored, on disk).

---

## 1. THE ONE THING WORTH CARRYING OUT OF THE WHOLE DAY

**A CHECK THAT READS A RULE BEATS A CHECK THAT READS PROSE, AND THE MARGIN IS NOT SUBTLE.** Four
checks were built and run to completion against the ENGINE class:

| check | grounded in | narrowings | result |
|---|---|---:|---|
| **C1 can it start** (190.1: Control needs a body) | **RULE** | **1** | **14 defects, shipped to rc-schema** |
| domain union / bans (103.1.b) | **RULE** | **0** | clean zero, defensible |
| C2 can it repeat (381, 415.3.a) | rule **+ a prose question** | 3 | empty |
| C4 does `produces` match the steps | prose only | 4 | near-empty |

**The rules-grounded checks took minutes and returned either fourteen defects or a zero I can
defend; the prose-grounded ones took an hour each and returned a false-positive taxonomy.** The
standing form: **ask what RULE decides a proposed check, and stop when the answer is "none".** C3
(does it return to its starting state) and C5 (what kills it) are unrun and BOTH are prose-grounded,
so expect them to behave the same way. **This is NOT a finding that engines are clean.**

**And C2's empty explains itself, which is the better half:** three of its six candidates name their
within-turn readier *unprompted*, in the step where it matters, because `CLAUDE.md` carries 381,
415.3.a and the eleven within-turn-repeatable cards. **The defect is not in the catalogue because the
rule is in the file** — the first direct measurement that the file pays for its own cost.

## 2. THE POSITION-0 ALLOWANCE, AND WHY THREE OVER-REPORTS HAPPENED

**The rule for any case-fidelity check over quoted text: RECASE EVERYTHING EXCEPT POSITION 0, and
preserve whatever is there.** Position 0 is the SPLICE BOUNDARY and #202 sanctions adjusting it **in
both directions** — lowercasing *"When"* to splice a quotation mid-sentence is correct, and so is
capitalising a mid-sentence word when a quotation begins at it.

**Three over-reports, one cause, and the cause is now in `CLAUDE.md` in my own words:** 72 → 18
(walk-corpus emphasis, missing the splice allowance), 24 → 4 (self-validation, counting
`combos.json` as a source of truth), 284 → 42 → **290** (see below). **The instrument encoded the
rule and not an exception the domain already sanctions.** I wrote that bullet and then made the same
mistake within the hour, which is the evidence the rule is real rather than a tidy story.

**A FOURTH correction with a DIFFERENT cause, and it is the one to learn from:** the "42" was
measured on a **file that had changed under me** — rc-manager7 had run a mid-edit copy of my script
and recased most of the shouts before I re-measured. On the restored file the honest figure is
**324 occurrences / 290 distinct**, close to my original 284. **The position-0 correction moved the
count by six, not by 242.** The rule I broke was already written down: *re-validate immediately
before REPORTING, not immediately after writing.* **Verify the file state between measurements when
six sessions share a tree.**

**Two instrument traps inside that same measurement, both worth keeping:** a probe that scans
`JSON.stringify(entry)` breaks span pairing, because an escaped `\"` is still a quote character to a
scanner — **walk the PARSED string values instead.** And `fs.readFileSync(f,"utf8").length` is
**string length, not bytes**; this file is 13,597 bytes longer than it is characters. The proof holds
either way, but I cited it as "byte length" and it is not.

## 3. THE 30 MIXED SPANS, AND WHY READING THEM WAS THE RIGHT MOVE

I reserved 27 "mixed" spans (case raised AND lowered in one span) for a human, on the ground that
both directions can mean a deliberate contrast. **Reading them produced a RULE rather than a
judgement: in 25 the only lowering IS the sentence-initial splice, and in the other 2 we had also
lowercased "Battlefield", which Riot capitalises. So all 27 were mechanically repairable under the
position-0 rule and NONE needed the judgement I reserved.** Reserving them was still right —
**reading them is what showed me the rule**, and that is the opposite of tuning a regex until it is
quiet. Only two spans in the end resisted, both hand-fixed: one began with a DIGIT so its first
LETTER was not a splice boundary, and one was the mirror case.

## 4. THE GUARD I WANT SHIPPED, AND ITS TWO CONDITIONS

**Nothing checks PROSE in either data file.** `test/source-quotes.test.ts` owns `sources[].quote`
alone, which is why 290 distinct shouts accumulated in `steps`, `notable` and `terminatesIn` without
anyone seeing them. The guard is the same two-condition shape as predicate E:

1. a quoted span of 25+ characters in a PROSE field of `combos.json` or `synergies.json`,
2. that matches its source **case-insensitively but not case-sensitively**, ignoring position 0.

**That has zero false positives by construction** — symbol rendering, truncation and paraphrase all
fail case-insensitively too, so the check can only fire on emphasis. Probes:
`.scratch-gap/emph-split.mjs` (the split), `.scratch-gap/fix-data-emphasis.mjs` (the repair, with
the string-length and lowercase-form proofs and an abort if the file is not byte-identical to its
own dump).

## 5. THE REQUIREMENT-GAP CLASS: WHAT IS DONE AND WHAT IS NOT

An entry whose prose states a requirement its own `uses` does not supply — the matcher reports it
COMPLETE for a board that cannot run it, and `planDeck` can never name what is missing. **Known in 3
entries before today; I confirmed 11 more plus 1 probable, and EVERY ONE IS AN ENGINE.** Five
predicates, in `2026-09-13-uses-requirement-gap.md`; **predicate E is rules-grounded and is shipping
as `test/body-requirements.test.ts`.**

**UNFINISHED, and named rather than counted:** 44 of predicate C's 50 rows are unread; predicate F
returns a population of 101 whose `onBoard` metric is too crude to report as a finding; and two
shapes are unswept — **a required RESOURCE, and a named CARD in prose that `uses` omits** (predicate
D returned a measured near-empty at 6 matches, so that one is probably thin).

## 6. SMALLER THINGS A SUCCESSOR WOULD OTHERWISE RE-DERIVE

- **The #187 citation-gap vein is CALLED.** 99 rows disposed, 61 real gaps, 17 measured non-gaps. The
  stop signal is **composition, not citation count** — step headings and block parents went from zero
  in the 10+ band to eight of twenty-five in the 7 band, and the 6 band opens on rule `000`.
- **Five instrument defects, all the same shape:** a preceding hyphen counts `OGN-304`; a preceding
  `#` counts issue numbers; a trailing dot lets a parent absorb its block; a bare number on the
  `CLAUDE.md` side collides with a prose quantity, a source line number, a lane label and **the
  catalogue's own entry count**; and a first-match PREVIEW shows a `See rule NNN.` cross-reference
  instead of the rule, for 57 of 2,381 headings.
- **A checker's sources of truth are the two rulebooks and the card corpus and NOTHING ELSE.**
  `CLAUDE.md` and `combos.json` quote the rules; they are not the rules. Measured: 20 walk passages
  would go green the day `combos.json` enters a haystack.
- **Do not tighten the walk-quotes ratchet from 75.** 54 of the 72 my own first sweep reported were
  my instrument, not the corpus.
