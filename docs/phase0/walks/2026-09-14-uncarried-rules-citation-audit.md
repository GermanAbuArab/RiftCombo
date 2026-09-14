# The 63 uncarried rule paragraphs — audit, dispositions, and two defects in the instrument that found them

Lane rc-gap3, 2026-09-14, issue #187. Manager rc-manager9.

---

# FOUR THINGS A SUCCESSOR SHOULD ACT ON, each with its measurement AND its control

The 63 dispositions below are spent. **These four are not**, and each is stated so that the next
reader can re-run it rather than trust it.

### 1. THE CITATION COUNTER HAS TWO OPPOSITE FAILURE MODES AND THE SHIPPED SCRIPT STILL HAS THEM

**Use this form and nothing else:**

```
(?<![-#=_0-9.A-Za-z])(?<![A-Za-z]/)HEAD(?![0-9a-z]|\.[0-9a-z])
```

**Measurement.** Five traps, each found by a wrong answer that looked like a discovery: a preceding
hyphen (`OGN-304`), a `#` (issue numbers), a sub-part dot (a parent absorbing its own block), **a
sentence-closing period** (`816.3.` counted ZERO while carried), and **a rule-pair slash**
(`420.1/420.2.a` — `CLAUDE.md` holds 9 rule-pair slashes against 15 URL slashes, and what precedes the
slash separates them exactly).

**Control.** `355.10.d` counts **15** under this form and **14** under the old one — and **14 is the
figure `CLAUDE.md` published about itself**, so any counter that reproduces 14 is reproducing the bug.
Probe `999.9.z` must return 0 in both.

**What to do.** `scripts/claude-md-gap.mjs` was fixed in `1727a80` to the *older* form and therefore
still carries both modes; its published population of 75 is an upper bound on one side and a lower
bound on the other. Anyone re-running it should patch `cnt` first.

### 2. THE "EXCEPTION CARRIED, RULE ABSENT" SHAPE HAS A MIRROR THAT NOBODY HAD NAMED

`CLAUDE.md` names six cases of **the exception carried and the rule not** (`355.7`, `136.2.c`,
`811.6`, `384`, `316.8.b.1`, `355.8`). **The defect runs the other way too: THE GENERAL STATEMENT
CARRIED AND THE EXCEPTION NOT**, and only one direction has ever been searched for.

**Measurement.** The file says *"Predict and Vision are defined with 'look at', never 'reveal', so
neither fires an 'as I'm revealed' payoff"* — **true**, and the pool prints exactly one such payoff.
**`OGN-194 Nocturne, Horrifying` is worded *"look at OR reveal"* and is fed by all 29 cards that look
at the top of your own Main Deck**, none of which either Undertitan rule reaches.

**Control.** The two Undertitan synergy rules match on `reveal`; the Nocturne list matches on `look at
the top`; overlap of the two partner sets, computed through the real `partnersOf`, is what makes the
claim checkable rather than rhetorical.

**What to do.** Sweep `CLAUDE.md` for sentences of the form *"X is defined with A, never B, so no card
does C"* and ask **which card is worded to escape the wording rather than the mechanic.** Same cause as
the six — a file built by promoting findings keeps whichever half surprised somebody.

**AND THERE IS A BETTER WAY TO RUN IT, MEASURED 2026-09-14: SEARCH THE POOL FOR THE CARD, NOT THE FILE
FOR THE CLAIM.** A mirror defect needs a printing worded to satisfy **both halves** of the distinction
a sentence rests on — Nocturne prints *"look at **or** reveal"*. So sweep the corpus for every
`<verb> or <verb>` construction over the game's verbs (`.scratch-gap3/or-pairs.mjs`).

**The whole pool contains FIFTEEN such pairs.** That is the complete population, not a sample, and it
is readable in one screen. **Control:** `look at OR reveal` → `OGN-194`, present.

**TWO OF THE FIFTEEN HAVE ALREADY BEEN REAL DEFECTS IN THIS PROJECT**, found seven weeks apart by two
unrelated routes — `look at OR reveal` (Nocturne, 2026-09-14) and `attack OR defend` (**`OGN-055`,
`OGN-060`, `OGN-119`, `SFD-016`, `SFD-020`, `SFD-082`, `SFD-110`, `SFD-190`, `UNL-056`, `UNL-143`,
`VEN-079` — eleven cards, NAMED rather than counted, for the reason in the closing section),
2026-09-12, and the file shouts it in its own voice: *"AN \"ATTACK OR DEFEND\" TRIGGER IS BOTH KINDS AT
ONCE AND FIRES TWICE PER TURN CYCLE, AND SIX ENTRIES PRICED IT AT HALF RATE"*). Same shape, same mechanism.

**The other thirteen are clean and each has a reason**: five are *"conquer or hold"*, which `823.1.b`
already covers here explicitly; four are printed MODES (*"draw 1 or buff me"*, *"ready or exhaust a
legend"*, *"draw 1 or channel 1 rune"*, *"play me or another Dragon"*); three are regex artifacts
spanning a clause boundary; and `OGN-182 Scrapheap` is banned in both formats.

**Two limits, stated so nobody over-reads it:** it catches only a card that escapes by printing *"A or
B"*, never one that escapes by a SYNONYM; and it is exhaustive over the CURRENT pool, so **re-run it
when a set is printed** — a new `<verb> or <verb>` card is a new candidate by construction.

**The prose sweep still works and is the slower half**: a distribution-first cross-tab of seven
contrast forms over `CLAUDE.md` gives 38 candidate sentences, the known positive is caught by three of
the seven, and reading them confirmed three claims outright — the `[Hidden]` watchers (all three are
worded *"from face down"* or *"from [Hidden]"* and none catches a from-HAND play), the token-recycle
claim (no card recycles a token, and `186.1` means none is ever in the trash to be chosen anyway), and
Lee Sin's continuous modifier (every counting card in the pool counts *"buffed"*, never a Might
modifier). **Confirming a sentence is a result.**


### 3. A STAGED ARTIFACT IS A QUEUE, NOT A RECORD — AND IT BITES BOTH ENDS OF A HANDOVER

**Measurement.** After 21 items were applied and pushed, **re-running the same list would have
re-applied 17 of them**: 8 of 12 splices are EXTENSIONS whose `new` CONTAINS `old`, so the needle
still occurs exactly once and a uniqueness gate passes it; and **all 9 appends still match their
anchors**, because an anchor is an existing bullet you insert *before* and inserting does not consume
it. Only true REPLACEMENTS are idempotent, and by accident.

**Control.** The gate that catches it tests whether each item's **full `new`** already occurs in the
target. Validated in both directions: **0 false positives on the un-applied batch, 21 of 21 true
positives on the known-applied archive.** A first version tested a 120-character PREFIX and fired on
every extension splice, because for an extension the prefix IS the old text.

**What to do.** An applier should **retire its own queue on success**; `.scratch-gap3/retire.mjs` and
`scripts/apply-staged.mjs` both now do. This was hit **three times in one session in three different
files** and a validator caught it every time rather than the author — which is what makes it a class.

### 4. A SYNERGY PARTNER IS EITHER THE ANCHOR'S *TARGET* OR ITS *CAUSE*, AND NO PREDICATE CAN TELL

- **TARGET shape** — the anchor acts **ON** the partner (*"Give a friendly unit [Tank]"*) → the
  partner **must be a unit**, and a `types` filter is mandatory.
- **CAUSE shape** — the partner **TRIGGERS or ANSWERS** the anchor (*"when you ready a friendly
  unit"*) → **any card type is correct**, and a `types` filter would be a defect.

**Measurement.** The blunt check — *anchor acts only on a unit, no `types` filter, a non-unit partner
present* — flags **33 rules and 353 pairings**. Reading them, **3 are real and 30 are correct by
design.** `pirates-haven-any-friendly-ready` alone accounts for 17 correct ones.

**Control, and it is a NEGATIVE one.** A proxy was built to separate the two shapes — *"a partner
predicate matching a bracketed keyword is a body, one matching a verb is a cause"* — and it **mislabels
four rules that match `buff` as a VERB and only look keyword-shaped because the regex opens with
`\[Buff\]`.** **The proxy was recorded and NOT shipped.** A check that needs an unreliable proxy to
be usable is not a check.

**What to do.** Treat it as a human reading, one rule at a time, **not** as a test. The three real ones
(`eye-of-twilight-tank-on-a-shield-body`, `last-stand-doubles-a-shield-body`,
`ki-barrier-tank-raises-the-toll`) were applied as a SET, because it is one judgement in three places.

### The standing law all four obey

**Every number in this document was wrong the first time, always too big, and reading the hits fixed
it every time** — the redundancy family 5 → 8 (the one exception, too SMALL), the characteristic family
3 → 30, the idempotence gate 3 false → 0, the quote verifier 8 false → 0, the types check 33 → 3, the
counter 6 → 0 on `115`. **The instrument encodes the rule and not the exception the domain already
sanctions, and only a person reading the top hits corrects it.**

---

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

---

# Addendum, same day: the fix to the false positive created a false negative

The form published above — `(?<![-#/=_0-9.A-Za-z])HEAD(?![0-9a-z]|\.[0-9a-z])` — **excludes a
preceding slash, and this project writes rule PAIRS with a slash.** `CLAUDE.md` contains *"R9 because
**420.1/420.2.a** make an effect move the primary kind of Move"*, so the corrected predicate reported
`420.2.a` as **uncarried when it is carried**, and dropped 2 of its 35 catalogue hits.

**That is the dangerous direction, introduced by my own fix to the other one.** It was caught by the
project's standing rule and by nothing else: reading the hits rather than trusting the count.

Both slash cases are real and the disambiguator is exact — measured over `CLAUDE.md`:

| form | count | example |
|---|---|---|
| `<digit>/<rule>` — a rule PAIR | 9 | `420.1/420.2.a` |
| `<letter>/<digits>` — a URL | 15 | `issues/115` |

**What precedes the slash** decides it. The form that survives all five traps — hyphen, hash,
sub-part dot, sentence-closing period, rule-pair slash:

```
(?<![-#=_0-9.A-Za-z])(?<![A-Za-z]/)HEAD(?![0-9a-z]|\.[0-9a-z])
```

Two lookbehinds: the first excludes everything that cannot precede a citation; the second excludes a
slash **only when a letter precedes it**.

**Re-validated with controls in both directions.** `355.10.d` = 15 in `CLAUDE.md` (the corrected
self-audit figure), `816.3` = 5, `420.2.a` = 1 — all carried, all seen. And **the four refusals hold
independently of the predicate that produced them**: `115`, `370`, `800`, `829` are catalogue ZERO
under v3 as well.

## What the corrected predicate does to `scripts/claude-md-gap.mjs`

At `minCitations=10`, gaps move **10 → 11**:

- **`383.4.d.2.c` appears** — catalogue 6 under the old count, **10** under the fix, because the
  sub-part-dot correction applies on the CATALOGUE side too. It was **below the threshold and
  therefore invisible to the entire 63-token audit.**
- **`420.2.a` correctly leaves** the gap list once v3 sees that it is carried.
- **`315.4.b.1` leaves** — 10 → 9 catalogue, legitimately below the threshold.
- Bare heads needing manual reading drop **56 → 53**.

## The one rule the audit could not have found

**`383.4.d.2.c`** — *"If the act of gaining one point from Holding is negated or replaced in any way,
the Hold Effect will still trigger."* Catalogue **10**, this file 0.

It is the **Hold twin, printed in the same words**, of the `383.4.c.2.c` dispositioned in batch 2, and
it matters **more** than its Conquer sibling for two reasons this file carries separately and never
joins: `315.2.b.2` Holds EVERY battlefield you control and the Hold is mandatory, so the Hold side is
where most of the catalogue's multiplied payoffs live (Blue Sentinel, Trinity Force, Ahri,
Svellsongur are all Hold effects); and `VEN-053 Otterpus` plus `471.1.b.1` both take the POINT and
neither takes the PAYOFFS. A catalogue entry states it unprompted: *"383.4.d.2.c is a bonus the entry
never claimed: negating or replacing the Hold point does not stop the Ahri triggers."*

With it, both sibling families are complete on both sides — `.c.2.a/.b/.c` for Conquer and
`.d.2.a/.b/.c` for Hold — and `.d.2.c` was the last member of either that was missing.

## Three items returned for the #202 class, and none was a content error

`4.3`, `4.4` and `4.7` were returned by rc-manager9 because their quoted passages were not what the
source says. Diagnosed against the pasted originals, **all three were HOUSE STYLE rewriting the source
on the way past**:

- **em-dashes where the catalogue prints hyphens** (4.3, 4.7);
- **`**bold**` inside the quotation marks** (4.3);
- **case LOWERED inside the marks** — the catalogue shouts *"AND THIS ENTRY HAD ONLY 355.5.b"* and I
  did not (4.4);
- a semicolon turned into a comma and an unmarked elision (4.4);
- **a truncation closed with a period**, so it read as a complete sentence when the source continues
  (4.7) — the exact defect `#202` names.

`CLAUDE.md` already records that a TYPED quote is wrong where the source is ungrammatical, *because
memory repairs a broken sentence on the way past.* **This is the same mechanism with HOUSE STYLE as
the rewriter, and it is worse, because house style is applied deliberately.** A fourth case in the
same batch was caught by the manager and is the one most worth watching: a **paraphrase inside
quotation marks**, attributing to the catalogue a sentence that is nowhere in it — *invisible to a
reference check and to a reader who already agrees with the sentence.*

`.scratch-gap3/verify-quotes.mjs` checks every 40+ character quoted passage in an apply-list against
both rulebooks, `combos.json`, `synergies.json`, the corpus and `CLAUDE.md`. **It is honestly 2 of 3**:
injecting each original defect one at a time it catches the truncation and the lowered case and
**misses the em-dash**, because it adopts the normalisation from `scripts/check-walk-quotes.mjs`,
which folds en/em-dashes to a hyphen at line 40. The manager's own checker caught the em-dash, so the
two disagree — **which means the shipped walk-quote guard cannot see an em-dash substituted into a
Riot quotation.** Recorded, not fixed; that script is not this lane's.

Its FIRST version reported **8 not-verbatim on batches 1-3 and all 8 were false** — nested
quotations, because it invented its own normalisation instead of using the project's. **Fourth
over-count on my own instrument in one task**, after the redundancy family, the idempotence gate and
the slash regression. Sampling the hits fixed it every time.

---

# Part two: harvesting the findings into `data/synergies.json`

Several of the 63 are not only facts about the rules — they are **anchor + partner value exchanges**,
which is what a synergy rule is. Four leads were worked. **One became a rule, one became an amendment
to an existing rule, and three were refused with their counts.** That yield is reported as-is; the
fleet has a standing instruction not to pad toward the user's 1,000.

## The rule — `nocturne-horrifying-deck-top-look`, anchor `OGN-194`, 29 partners

`OGN-194 Nocturne, Horrifying` is in **zero** synergy rules today and is the sharper of the pool's two
deck-top payoffs. He prints *"As you look at or reveal me from the top of your deck, you may banish
me. If you do, you may play me for [rainbow]."*

**The word LOOK is the whole rule**, and both halves were verified at source: **436.1**, *"Predicting
a card is the act of looking at a single card from the top of the Main Deck"*, and **817.1.b**, *"It
is functionally short for 'When this is played, predict.'"* So the entire Predict and Vision pool is a
**LOOK** and never a **REVEAL**, and **Nocturne is the only card in the pool that watches both
verbs.** `052` makes *"your deck"* the Main Deck; `424.1.a.1` is what lets a card in a deck reference
its own presentation at all.

**It is not a duplicate of the two existing Undertitan rules**, which were read in full first.
`SFD-175 Undertitan` is worded *"As I'm revealed from your deck"*; `undertitan-reveal-fuel` and
`undertitan-reveal-payoff` both match on *"reveal"*, and **none of these 29 partners is reached by
either.** Different anchor, different verb, near-disjoint lists.

**Discipline, all of it run:** the whole match list was printed and read card by card — 30 raw, 29
after one exclude, well inside the 150 cap; **103.1.b over every pairing gives 0 of 29 exceeding two
domains**, so it is not the domain-dead failure `#221` found, and Nocturne being mono-Chaos is exactly
what makes it wide; and one `excludes` entry carries its reason, the second of the four
false-positive shapes — **`SFD-018 Void Hatchling`**, a rider on somebody else's reveal, where **any
reveal that triggers it has already triggered Nocturne**.

## The correction it forces, and it is the MIRROR of the shape this audit was built to find

`CLAUDE.md` says: *"Predict (436.1) and Vision (817.1.b) are defined with 'look at', never 'reveal'
(424.1 is public presentation), so neither fires an 'as I'm revealed' payoff."*

**Every word is true.** The pool prints exactly one *"as I'm revealed"* payoff and Predict/Vision do
not fire it. **But a reader takes it to mean Predict and Vision feed no deck-top payoff in this pool,
and that is false** — they feed Nocturne, whose clause reads *"look at or reveal"*.

**The six cases this file names — `355.7`, `136.2.c`, `811.6`, `384`, `316.8.b.1`, `355.8` — are all
THE EXCEPTION IS CARRIED AND THE RULE IS NOT. This one runs the other way: THE GENERAL STATEMENT IS
CARRIED AND THE EXCEPTION IS NOT.** Same cause — a file built by promoting findings keeps whichever
half surprised somebody — and it is worth knowing that the defect has two directions, because only one
of them has ever been looked for.

## The amendment, where measuring it reversed the claim

`prize-of-progress-gear-activation` owes **`377.2.a`**: *"If 'using' or 'playing' an Activated Ability
is part of a trigger condition, that condition is fulfilled when the Activated Ability resolves."*

The first draft read that as a caveat — *a countered activation pays nothing*. **Measured, it is a
CREDENTIAL.** Swept 2026-09-14: **11 counter printings; 9 say *"a spell"*; exactly two say *"spell or
ability"*** (`SFD-045 Not So Fast`, `UNL-106 Repulse`); **none names a unit.** Both of those two are
confined to an ability that **CHOOSES a friendly unit or gear**, and run against that rule's own **39
partners exactly ONE qualifies** (`UNL-045 Forgotten Signpost`). **So 38 of 39 gear activations there
are un-counterable by anything the pool prints** — a fact about the rule's robustness that nobody had
stated, in place of a warning that is false 38 times in 39.

**Two predicate errors on the way, both caught by a second look.** A first counter sweep used
`Counter a ` and returned **seven**, contradicting the file's published **eleven** — the file was
right and the sweep was one ARTICLE short, since both ability-counters print *"Counter **an** enemy
spell or ability"*; widening to `Counter (a|that|it|target)` returns exactly 11. And that same narrow
sweep caught `UNL-044 Flurry of Feathers` on its `[Reaction]` REMINDER text — the false positive
`CLAUDE.md` names by card, arriving on schedule.

## Three refusals, each with its count

- **`822.1.d`, Ambush as a VERB — REFUSED. The pool prints TWO**: `UNL-120 Rengar, Trophy Hunter` and
  `UNL-166 Stalking Wolf`, and `CLAUDE.md` already carries Stalking Wolf's clause in full. A synergy
  rule needs a partner PREDICATE over the pool; this is a reading of two cards' own text with nothing
  to pair them with. Right as a citation, not a rule.
- **`355.11.b`, a group target shrinking to a legal subset — REFUSED. The pool prints ONE**
  total-Might-gated group removal, `OGN-256 Fox-Fire` — and the "partner" in Riot's example is the
  **opponent's** Reaction pump, which is not an in-deck exchange.
- **`359.3.e.16`, a delayed ability whose duration has ended — REFUSED, and it is the wrong KIND.**
  Two cards (`UNL-184 Thrill of the Hunt`, Riot's own example, and `OGN-160 Dazzling Aurora`), and the
  interaction is an **ANTI-synergy** — the trigger is NOT generated. The UI presents a rule as *"pairs
  its anchor with"*, so shipping a cancellation as a synergy would tell a player the opposite of the
  truth.

## Two method results that generalise

**A BANNED PARTNER IS NOT EXCLUDED HERE, AND THAT WAS MEASURED RATHER THAN DECIDED.** `SFD-122 Called
Shot` is banned in both formats and sits in the Nocturne list. Before inventing a policy: **20 of 220
live rules contain a banned card in their match list and only 3 exclude one by name** —
`karma-channeler-recycle-main`, `syndra-transcendent-repeat-grant` and `prepared-neophyte-repeat-cost`
all carry Called Shot without excluding it. Legality is format-scoped and handled elsewhere; an
`excludes` entry is for a card the RULE does not reach. A bespoke exclude would have been inconsistent
with nineteen rules.

**AN AMENDMENT MUST BE VALIDATED BY SUBSTITUTION, WITH THE FINGERPRINT HELD CONSTANT.** The amended
rule is substituted for the live one of the same id, the merged file must still validate, and
`fingerprintOf(partnersOf(...))` must be **UNCHANGED** — which is what makes it an amendment rather
than a rewrite, and is checkable rather than asserted. The check also printed `fields changed = why,
basis`, which is the same *"prove what you did NOT touch"* discipline `#204` established for
`combos.json`.

**And the file's own validator earned its keep on this lane**: a staging marker placed inside a rule
object failed with *"unknown field `_amendment`"* and *"duplicate id"*, both correct, which is why new
rules and amendments are staged in two separate files.

## A second rule from the same harvest — `factory-recall-reready-gear`, anchor `SFD-135`, 29 partners

**`149.1` is three words — *"Gear enter play Ready."* — and it is what makes a bounce buy a SECOND
activation in the SAME turn** rather than a second one next turn. Exhaust the gear for its ability,
return it to hand with `SFD-135 Factory Recall` (E1, `[Action]`), replay it, and 149.1 enters it READY
with its ability live again. **Without 149.1 the replay buys nothing**, because `315.1.b` would not
ready it until your next Awaken. The price is 1 Energy plus the gear's own cost, which is why the six
**Seals at Energy cost 0** are the sharpest partners: one Energy for one Power at `[Action]` speed, on
a card the deck already runs as its Power base. `SFD-044 Legion Quartermaster` is the Calm
alternative, paying a body instead of a card.

**It is not the existing `factory-recall-equipment-rehost`, and the two lists are DISJOINT BY
CONSTRUCTION — measured, not argued.** That rule stands on `718.2` (an `[Equip]` is Inactive only
*while* attached) and its 40 partners are the Equipment, which by this project's own measurement carry
**zero exhaust symbols anywhere in their text**. Overlap computed through the real `partnersOf`: **0**.
Two rules on one anchor, two paragraphs, no shared card.

**Two exclusions live in the PREDICATE rather than in `excludes`, because each is a whole class:**

- **`This enters exhausted` — five gear whose own text overrides 149.1 under rule 002**
  (`OGN-017 Iron Ballista`, `UNL-049 Honeyfruit`, `UNL-136 Scryer's Bloom`, `VEN-062 Hextech Formula`,
  `VEN-075 Platewyrm Egg`). The rule's premise fails on them outright.
- **A cost that KILLS the gear** — a one-way door with nothing left to bounce.

**The kill predicate is the part worth carrying, because a blunt version would have been wrong.**
*"Kill this"* appears in **two different roles**: as a **COST** (*"Kill this."*, *"Kill this: Draw
1."*) and inside the **`[Temporary]` REMINDER** (*"Kill this at the start of its controller's
Beginning Phase"*). Matching `Kill this` followed by a **period, colon or comma** catches exactly the
six cost forms and none of the three `[Temporary]` gear — verified in both directions.

**And the control chosen for that check was a bad one, which was itself checked rather than trusted:**
the three `[Temporary]` gear carry **no exhaust ability at all**, so they were never candidates and
the exclude never touched them. The conclusion holds; the control did not prove it. *A control that
cannot fail proves nothing* — the same lesson as a detector with no known positive, from the other
side.

Two named `excludes` rest on this project's own recorded finding: **`SFD-117 Ancient Henge`** and
**`SFD-083 Hextech Anomaly`** both print *"Pay any amount"*, so the first activation already converts
everything and a second is worth **zero** — the no-per-execution-cap trap `CLAUDE.md` names by card,
and both were in the raw list.

## And the queue lesson generalises past `apply.json`

The manager merged the first rule and the amendment while the second was being written, and the
staged file still held both. **The validator caught it as `duplicate id`** — not a human noticing.

**Any staged artifact is a QUEUE and not a record.** It has to be retired against the live file before
it is handed over again, exactly as an apply-list does; the record is git. That is the same hazard
recorded earlier in this document for `apply.json`, arriving in a different file, which is what makes
it a class rather than an incident.

## Three defects in live rules, and a generalisation that FAILED — the failure being the better result

Turning the eight-member redundancy family into a check — *a rule whose ANCHOR grants keyword K and
whose list holds a card that already HAS K is pairing with a no-op* — flagged **six rules**. Reading
them, **five were the probe's fault, not the catalogue's**: the predicate matched a **MENTION** of a
bracketed keyword rather than **POSSESSION** of it, which is the `/\[hidden\]/` trap `CLAUDE.md` names
by name. `UNL-208 Black Flame Altar` *reads* `[Temporary]`, `UNL-048 Trevor Snoozebottom` *makes* a
`[Temporary]` token, `UNL-075 Gustwalker`'s `[Ganking]` is at `[Level 3]`, `UNL-108 Wily Newtfish`'s is
XP-gated, `SFD-007 Gem Jammer` *grants* it.

**The redundancy check therefore yielded almost nothing — and following its one survivor into the
RULE's own predicate is where the real defects were.**

**THREE LIVE RULES PAIR AN ANCHOR WITH PARTNERS THAT CANNOT BE WHAT IT ACTS ON**, each fixed by one
field (`types: ["unit"]`), each with its new `reviewedCount` and `reviewedSet` declared:

| rule | anchor text | non-unit partners dropped | count |
|---|---|---|---|
| `eye-of-twilight-tank-on-a-shield-body` | *"Give a friendly unit [Tank] this turn"* | Black Flame Altar, Block, Cloth Armor, Fortified Position, Mechanized Menace | 27 → 22 |
| `last-stand-doubles-a-shield-body` | *"Double a friendly unit's Might this turn"* | the same five | 27 → 22 |
| `ki-barrier-tank-raises-the-toll` | *"Choose a unit. Prevent the next 7 damage"* | Block, Doran's Shield, Eye of Twilight, Kinkou Temple | 25 → 21 |

Every dropped card **GRANTS** the keyword to somebody else and none has a threshold of its own, which
is the quantity all three rules are about. **`OGN-057 Block` is the sharpest case and is actively
backwards for Eye of Twilight**: it grants `[Tank]` itself, so pairing it with a Tank-granting legend
is `815.2`'s redundancy rather than a synergy. **One judgement call was left IN and flagged rather
than dropped silently** — `UNL-071 Chakram Dancer` is a unit that grants `[Shield]` to its neighbours
and carries none, so it survives a `types` filter with no threshold of its own.

### The generalisation, and why it fails

Widened to *"the anchor acts only on a unit AND no `types` filter AND a non-unit partner"*, the check
flags **33 rules and 353 pairings** — and reading them, **the overwhelming majority are correct by
design.** The distinction that decides it is invisible to any predicate over card text:

- **TARGET shape** — the anchor acts **ON** the partner (*"Give a friendly unit [Tank]"*) → the
  partner must be a unit.
- **CAUSE shape** — the partner **TRIGGERS or ANSWERS** the anchor (*"when you ready a friendly
  unit"*) → any type is right.

`pirates-haven-any-friendly-ready` is the clearest: `OGN-143` triggers **when you ready** a friendly
unit, so a SPELL that readies is exactly the partner and all 17 of its "non-unit partners" are
correct. `hidden-blade-would-die-shield` is the same from the defensive side — a gear shield is the
ANSWER to the anchor and belongs there.

**A proxy built to separate the two is also unreliable, and is recorded rather than shipped**: *"a
partner predicate matching a bracketed keyword is a body, one matching a verb is a cause"* labels 12
of 33 as TARGET, and most of those are cause-shaped — `blade-dancer-buff-is-choosing`,
`mistfall-buff-ready`, `vanguard-helm-buff-supply` and `wallop-buff-spend` all match *"buff"* as a
VERB and only LOOK keyword-shaped because the regex opens with `\[Buff\]`.

**So: three of 33, the other 30 are not debts, and no rate is claimed.** The three are genuinely
special — they are the rare TARGET shape. **This is the same result this document already records for
the ENGINE-class audits: a check grounded in a RULE finds things and needs one narrowing; one that
needs a judgement per row is a human reading, not a test.**

## The queue hazard, hit three times in one session, now automated

`apply.json`, `.scratch-gap3/synergies.json` and `.scratch-gap3/synergies-amendments.json` each held
an item the manager had already merged, and **every time a validator caught it rather than the
author** — as `duplicate id`, or as an amendment reporting *"fields changed = "* with nothing in it.

`.scratch-gap3/retire.mjs` now drops any staged rule whose id is live and any amendment
**byte-identical** to the live rule, and runs before every handover. **A staged artifact is a QUEUE,
not a record; the record is git.** Three occurrences in three different files in one session is what
makes it a class rather than carelessness.

## The last lead, refused — and it repeated the defect it had just been used to find

`UNL-208 Black Flame Altar` is in zero synergy rules and **reads `[Temporary]` as a characteristic**,
which is exactly the `816.3` finding cashing out, so it was the best remaining lead. Built and
measured: **21 partners, 0 domain-illegal — and reading all 21, SIX are wrong.**

The card says *"Units **here** with [Temporary] have [Shield]"*, and the list holds **four GEAR that
carry `[Temporary]` themselves and can never be units** (`SFD-104 Petricite Monument`, `UNL-078 Sprite
Fountain`, `UNL-085 Sumpworks Map`, `SFD-186 Spinning Axe`) — **the same TARGET-shape types trap found
in three live rules an hour earlier, reappearing in the candidate written by the person who found
it.** Plus two mention-only cards: `UNL-076 Petal Pixie` READS `[Temporary]` to size herself and
`UNL-090 LeBlanc, Everywhere at Once` switches the `[Temporary]` trigger OFF.

And the residue needs an argument no predicate settles: `UNL-078` plays its Sprite token **"to your
base"** while the Altar pays units **"here"**, so whether it is a partner at all turns on a walk.

**A rule needing a types narrowing, six excludes and an unwalked location argument is not a rule to
ship on the way out of a vein.** Final ratio for the harvest: **two rules and four refusals from five
leads** — reported as-is, because the standing instruction here is not to pad toward a round number.

## I raised a concern about the shipped quote guard's SCOPE and then measured it away — a WITHDRAWN worry, kept because a withdrawn worry is a result

Writing the section above, I quoted `CLAUDE.md`'s own sentence about `attack OR defend` and **lowered
its case inside the quotation marks** — the #202 defect, for the fourth time in one day, by the person
who had already been returned for it three times.

**`scripts/check-walk-quotes.mjs` reported ZERO flags on this document both before and after the
fix.** That is not a bug and the script documents it at line 14: a passage *"CLAIMS to be rules text"*
when there is **a rule number within the 40 characters immediately before it**, and my defective quote
was preceded by a DATE. It is out of scope by design.

**The consequence is worth stating anyway: a quotation of `CLAUDE.md`'s own prose inside a walk
document is checked by nothing** — and that is precisely where a propagated misquote lives, which is
the masking effect `CLAUDE.md` already records about itself, one level up. This file's own guard note
says the check *"gets weaker exactly as the problem gets worse"*; the scope rule is a second, quieter
instance of the same geometry.

**MEASURED AFTERWARDS, AND MY CONCERN DOES NOT HOLD — recorded because a withdrawn worry is a
result.** Across all 108 walk documents, using the SHIPPED extractor rather than a worse copy:
**1,578 passages are in the guard's scope and 3,055 are outside it**, of which **581 resolve in no
source at all**. Reading those 581, they are **overwhelmingly THE AUTHOR'S OWN PROSE**, because
`*"…"*` in this project's markdown means **both quotation and emphasis** — *"Loop until seven or more
Recruits exist."*, *"Community-documented deck, not a loop"*, *"Opponent already controls the
battlefield"*. **You cannot check a population where one syntax means two things, and the
rule-number-nearby test is exactly what separates the two.** The scope is well chosen.

A hypothesis that the residue was card text with rune symbols spelled out was **REFUTED by
measurement: 1 of 581 rescued by symbol-insensitive matching.** And the single instance of #202's
bracketed-alteration class in the whole out-of-scope population — `execute[s]` for the rulebook's
*"execute the instructions of this chain item one additional time during resolution"* — is a
grammatical inflection marker that changes no meaning, not the *"bracketed gist"* substitution that
class is about. **Benign, and named so nobody re-finds it.**

And the guard's owner had already considered the related point and declined it IN THE CODE, with
reasons: the passage detector deliberately keeps the four-trap lookbehind rather than the five-trap
counter form, because a rule-PAIR slash is a genuine citation *here* and should open the window, and
the sentence-closing period is already allowed by the trailing `[^0-9a-z]*$`. **That is the system
working; the observation was received and correctly refused.**

`.scratch-gap3/selfcheck.mjs` is the stricter pass that caught it: it takes a **120-character** lead
window and checks **against the two rulebooks only**, so a quotation of `CLAUDE.md` fails there and has
to be verified by hand against `CLAUDE.md`. That is deliberate — **the whole point is to stop the file
validating a quotation of itself.** Both remaining flags on this document were checked by hand and are
present in their claimed sources (one in `CLAUDE.md`, one in `combos.json`).

## A TOTAL CAN COLLIDE ACROSS TWO PREDICATES, AND ONLY THE MEMBERS DISAMBIGUATE

On 2026-09-14 two lanes both published **"sixteen point cards"**, both having stated their predicates,
and **the sets were two members apart** — one a regex output holding `OGN-276` and missing `OGN-290`,
the other a printed domain list holding `OGN-290` and excluding `OGN-276`. The collision then caused a
subtraction from the wrong base.

**`CLAUDE.md` carries *state the predicate with the number* and *name the members of any counted set*
as two separate rules. They are ONE rule, and neither half is sufficient**: both lanes obeyed the
first and it did not help.

**Audited against this corpus, and it found one real hit — in something shipped the same day.** The
signature is a counted set given as a TOTAL with no member named nearby. Over this document and
`scripts/or-pairs.mjs`: 24 counted sets, 20 naming a member, **4 bare — and reading them, three are
not counted sets at all** (*"refuted by ONE CARD"*, *"two members apart"*, *"the overlap of the two
partner sets"*).

**The one real hit was `attack OR defend`, asserted as a COUNT of 11 in both the docblock and
`test/or-pairs.test.ts`.** A count goes green for any future predicate that happens to land on 11 with
a different set — the exact failure mode. **Both now name the eleven and the test pins the member
LIST.**

**And the control is honest: no collision was DEMONSTRATED for that claim.** Varying the match window
12 / 18 / 25 / 40 gives 11 / 11 / 10 / 10, and the shorter sets are strict **SUBSETS** — nested, not
different-at-the-same-total. It was pinned anyway, because **pinning a clean state costs nothing and
can only be paid for once.**

**Two exceptions the first predicate forgot, both found by reading the hits** (26 → 2 on this
document, 20 → 4 with the second): a count of OCCURRENCES in a file is not a counted SET and cannot
collide (*"9 rule-pair slashes"*, *"one paragraph short"*); and **a ZERO cannot collide**, because an
empty set is an empty set and naming its members is impossible — which excluded every *"cited by zero
entries"* row in the Tournament Rules survey.
