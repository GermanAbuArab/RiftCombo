# The engine-only rule set, top twenty — read and disposed

**rc-manager6, 2026-09-12.** Input: `/tmp/rc-walks/other96-top20.json` from rc-synth (#200 batch 24,
§31.3 of `2026-09-12-synthesised-lines.md`). Question asked: *for each of the twenty, is it engine-only
for a structural reason, or is it untapped FINISHER material?*

**Answer: structural, and there is one narrow lead that fails on arithmetic. Nothing in the twenty is
finisher material.** The route to that answer had to go through a defect in the input first.

Verification: `npm test` 525 passed (exit 0, no `failed`, summary line present — the three-check gate),
`npm run typecheck` clean, `npm run build:web` clean.

---

## 1. The handed-over top twenty has seven rules that do not exist, and four more inflated past 80%

`other96-generator.mjs` counts with `(?<![0-9.])HEAD(?![0-9])`. That is character-for-character the
counter CLAUDE.md records as broken in the #187 CLAUDE.md-gap slice, committed **today** as `c8df075`:
the lookbehind does not exclude a **hyphen**, so `304` matches `OGN-304`; the lookahead admits a
following **dot**, so a parent's figure is its whole **block**.

Re-counted with the prescribed `(?<![-0-9.])HEAD(?![0-9a-z.])`, plus a `#` exclusion this project has
also already paid for (`#171` — CLAUDE.md records 58 hits all being the issue number):

| handed-over rule | OLD eng | CORRECTED eng | verdict |
|---|---:|---:|---|
| 477.3 | 133 | **2** | inflated 98% |
| 465.2.b | 114 | 114 | stands |
| **417** | 108 | **0** | pure artifact |
| **417.6** | 94 | **0** | pure artifact |
| **340** | 93 | **0** | pure artifact |
| 340.1 | 90 | 86 | stands |
| 385 | 88 | **11** | inflated 88% |
| 820.2 | 86 | **14** | inflated 84% |
| 185.2.d | 84 | 83 | stands |
| 814.1.c | 83 | 78 | stands |
| **424** | 82 | **0** | pure artifact |
| 464.2.c.3.a | 79 | 75 | stands |
| 429.2 | 77 | 46 | inflated 40% |
| 820.1.b | 77 | 74 | stands |
| 203.3 | 75 | 75 | stands |
| 323.2 | 73 | **1** | inflated 99% |
| **417.6.b** | 73 | **0** | pure artifact |
| 820.2.a | 72 | 63 | stands |
| **356.1** | 71 | **0** | pure artifact |
| **740** | 71 | **0** | pure artifact |

**Seven of the twenty are cited bare ZERO times by any ENGINE.** Every apparent hit was a
sub-paragraph of the block (`417.6.b.3`, `340.1`, `424.1`, `740.2.a`) or a collector number. Four more
lose most of their weight. **The twenty contain at most nine distinct real subjects.**

The population is **41, not 96** (42 before dropping `153`, whose 29 surviving hits are all the string
`issues/153` inside source URLs — sampled and read, per the standing rule).

### 1.1 The brief's own reassurance is the same artifact, and it does not change the conclusion

rc-manager5's brief said *"many of the top 20 ARE well covered in CLAUDE.md — 340 is cited there 20
times, 417 eighteen, 477.3 fifteen, 385 fourteen, 740 fourteen"*. Recounted: **340 → 1, 417 → 1,
477.3 → 2, 385 → 3, 740 → 1**, and `424`, `356.1`, `417.6`, `417.6.b` → **0**.

Both halves of the ratio were inflated by the same instrument, so **the brief's point stands in shape** —
these are not the CLAUDE.md-gap set, and the two must not be conflated. What changes is that the
"well covered" reassurance was never measured either. I found no place where the two sets have actually
been conflated in committed work; §31.1 and §31.3 keep them properly distinct.

### 1.2 The correction changes the SHAPE, not only the size

Two of the "well covered" rows invert into the exception-carried-rule-absent shape this project already
records three times. **`477.3` is cited 2 times bare and its child `477.3.b` 49 times; `740` is 0 bare
and its children carry it.** §31.3's own aside — *"rules finishers express through a different
sub-paragraph (`477.3` against `477.3.b`)"* — was right, and the parent row was an artifact all along.

---

## 2. The corrected top twenty, and where each one is actually expressed

Predicate for every number below: rule heading matched with `(?<![-#0-9.])HEAD(?![0-9a-z.])` against
`JSON.stringify()` of the 686 ENGINE entries and the 80 finisher entries separately. Non-vacuity:
engine blob 5,053,867 B, finisher blob 884,197 B, 2,381 headings parsed, probe `470` = 253/94,
probe `143.4` = 503/57, probe `355.2.a` = 195/67.

| # | rule (verbatim subject) | eng | nearest sibling, eng/**fin** |
|---|---|---:|---|
| 1 | **465.2.b** *"Sum the Might of all Defending Units."* | 114 | — none |
| 2 | 340.1 newest Finalized Chain Item resolves | 86 | 383.3.d 62/**7** |
| 3 | 185.2.d *"Tokens have a type."* | 83 | 185 149/**14**, 186.1 136/**10** |
| 4 | **814.1.c** *"While I am a defender, I have +X [M]."* | 78 | 814.2 29/**6** |
| 5 | 203.3 an impossible cost cannot be paid | 75 | 356.6 108/**1** |
| 6 | 464.2.c.3.a a unit arriving AFTER the designation | 75 | 464.2.c.3 257/**7** |
| 7 | 820.1.b Repeat is an optional cost | 74 | 820.1.c.3 61/**2** — the CAP |
| 8 | **323.2.a** assign/remove the Defender designation | 67 | 323.6 247/**24**, 323.9 200/**23** |
| 9 | 423.1.a.1 *"A Stunned Unit can not be Stunned again."* | 65 | 423.1.b 116/**23**, 423.1.c 87/**18** |
| 10 | 820.2.a Repeat choices may differ | 63 | 820.1.c.3 61/**2** — the CAP |
| 11 | 807.2 granted Assault sums | 59 | 807.1.d 143/**24** |
| 12 | 434.1.d Might Bonus of attached cards | 58 | 434.1.c 112/**42**, 718.3 22/**17** |
| 13 | 465.2 the Combat Damage step | 54 | 465.2.c 290/**28** |
| 14 | 820.1.c.1 the Repeat cost is an Additional Cost | 52 | 820.1.c.3 61/**2** — the CAP |
| 15 | 417.6.b.3 a Unit as the source of Deal damage | 51 | — none |
| 16 | 477.3.b a floored reduction is snapshotted | 49 | — none |
| 17 | **815.1.b** *"I must be assigned lethal damage before any other unit"* | 48 | 815.1.c.2 128/**4**, 465.2.c.4 124/**8** |
| 18 | 429.2 Add abilities resolve on finalization | 46 | 444.2.c 25/**4** |
| 19 | 204.3.a a cost at the head of a trigger is its base cost | 45 | 383.3.b.1 71/**5** |
| 20 | 385.2 off-board triggers self-describe | 45 | 385.1 32/0 — none |

**Twelve of the twenty are not gaps at all.** The family is finisher-cited; the finisher reaches for a
different paragraph in the same block. `434.1.d` is the sharpest case — its siblings run 42 and 17
finisher citations, because every Equipment BURST in the catalogue is built on that block.

---

## 3. The one real pattern: the finisher-zero rows are the DEFENDING side

I expected "engines repeat, finishers fire once". That is part of it, but the dominant axis is
different and it measures cleanly.

**The obvious hypothesis is refuted first.** Finishers do not avoid combat — they engage it *more*
than engines do: 26 of 80 finishers (32.5%) cite some `465.2.x`, against 190 of 686 engines (27.7%).

The split is inside the block. Five matched attacker/defender paragraph pairs:

| attacker-side | eng/**fin** | defender-side | eng/**fin** |
|---|---|---|---|
| 465.2.a sum **Attacking** Might | 1/**3** | 465.2.b sum **Defending** Might | 114/**0** |
| 807.1.d being an **Attacker** | 143/**24** | 814.1.c while I am a **Defender** | 78/**0** |
| 465.2.c.4 cap at min lethal (assigner) | 124/**8** | 815.1.b Tank: assign lethal to me first | 48/**0** |
| 464.2.c.1 who is the **Attacker** | 176/**2** | 464.2.c.2 who is the **Defender** | 38/**0** |
| 383.4.e **Attack** Triggers | 150/**22** | 383.4.f **Defend** Triggers | 36/**0** |
| **total** | **594/59** | **total** | **314/0** |

Widened past hand-picked pairs — every heading cited ≥10× by engines whose own rule **body** names one
side and not the other:

- **DEFENDER-only rules: n=4, engine 204, finisher 0 — 4 of 4 are finisher-zero**
  (`383.4.f`, `383.4.f.2.a`, `464.2.c.2`, `465.2.b`)
- ATTACKER-only rules: n=7, engine 804, finisher **77** — only 2 of 7 are finisher-zero

**Not one finisher in the catalogue cites a defender-only rule.** Three finishers mention "defend" at
all, and reading the context, all three are attacker-side lines that *empty the defending side*:
`draven-svellsongur-bloodless-combat-burst`, `ivern-arena-draven-chaos-order-chain`,
`draven-yasuo-battle-mistress-contested-chain`. The word never names their own side.

---

## 4. Why the defending side cannot score — and the one card that almost breaks it

Points come from 194.1: Hold, Conquer, or card text. Read against the pool:

**466.5** — *"If no Showdown or Combat is staged at this location, the player with Units remaining here
Establishes Control **if they didn't already control this Battlefield**."* **466.5.d** — establishing
Control is a Conquer. With **464.2.c.2** (*"The Defender is the player who did not apply the Contested
status"*), the defender already controls the battlefield, so nothing is established and no Conquer
happens. CLAUDE.md already carries this from #118. A successful defence **preserves** a Hold; it never
creates a point. Preservation is engine work.

**The exception, and it is real.** `SFD-148 Draven, Audacious` (Chaos, E6 P1 M6, `[Deflect]`) prints
*"The first time I win a combat each turn, you score 1 point."* A defender **can** win a combat:
**466.3.a** grants the win to *"either the attacker or defender designation"*. The trap is
**466.3.d** — *"There is 'No Result' if units were recalled during step 3d"* — with **466.1.a.2**
recalling attackers whenever defenders remain. **So a defence that merely survives is No Result; only a
defence that annihilates every attacker wins**, which is exactly the arithmetic `465.2.b` governs.

**It fails on the count, not on the rules.** Swept for `wins? a combat|won a combat`: **7 printings pay
off on winning a combat and exactly ONE gains a point** (`SFD-148`; `SFD-020 Draven, Vanquisher` is
banned in both formats and pays a Gold token, not a point). 103.2.b caps three copies by name, and the
trigger is *"the first time … each turn"*, so the **defender-side ceiling is 3 points per opponent
turn** — and only on a turn the opponent chooses to attack into it, having already seen the board.

**3 < 8.** That is an ENGINE by arithmetic, and `draven-glorious-executioner-point` is already exactly
that entry. Worse for the finisher case: CLAUDE.md's own batch-5 rule is that a finisher earns its slot
where the Hold curve has **stalled** — and an opponent who has stalled you is ahead and has no reason
to attack into a Draven. A defender-side finisher hands the opponent the choice of whether it ever
fires, which is strictly weaker than the "dead on an empty board, alive on a contested one" credential
that makes a finisher worth a slot.

### 4.1 The structural statement, measured over the point cards themselves

Predicate: card text matching `score N point|scores N point|gains N point|win the game` over
`corpus_flat.txt` → **17 printings, and two of them are false positives my own predicate caught and I
had to read to see**. `OGN-276 Aspirant's Climb` matched on *"win the game"* and reads *"Increase the
points needed to win the game by 1"* — it raises the threshold and gains nothing; `VEN-053 Otterpus`
replaces an early score with a draw, i.e. **denies** a gain. **The genuine gain-or-win set is 15.**
CLAUDE.md's batch-12 figure is SIXTEEN folded by name, and the two differ by exactly one card: it counts
Otterpus inside its Mind column and does not count OGN-276. Neither difference touches anything below —
both cards are banned or denial, and neither reads defending Might.

| what the point clause reads | cards |
|---|---|
| HOLD | 5 — OGN-066, OGN-293, SFD-115, SFD-214, VEN-138 |
| CONQUER | 4 — OGN-034, UNL-177, VEN-046, VEN-065 |
| COMBAT WIN | **1** — SFD-148 |
| MOVE | 1 — OGN-205 |
| other card text | 4 — SFD-088, UNL-088, VEN-067, and OGN-290 (banned in both formats) |
| *not point gains at all* | OGN-276 (raises the threshold, banned), VEN-053 (denies a gain) |

**Zero of the 15 read defending Might, carry `[Repeat]`, or work from a non-board zone.** Two apparent
hits are reminder text and were opened and read: Shen VEN-138's *"defender"* is his `[Shield]`
reminder, and Swain VEN-065's *"Main Deck"* is his `[Vision]` reminder. Neither is in a point clause.

That single table disposes of four separate rows at once — the defender rules, the Repeat rules, the
damage-source rules and the off-board-trigger rules all govern things **no point card in this pool
reads**.

---

## 5. Dispositions

**A — not a gap; the finisher cites a sibling in the same family (12).** `340.1`, `185.2.d`, `203.3`,
`464.2.c.3.a`, `323.2.a`, `423.1.a.1`, `807.2`, `434.1.d`, `465.2`, `815.1.b`, `429.2`, `204.3.a`.
One is worth acting on as a citation upgrade rather than a lead: **CLAUDE.md already says `204.3.a` is
"the cleaner source" for what the catalogue cites as `383.3.b`**, and the catalogue still cites
383.3.b.1 five times in finishers and 204.3.a zero — a diagnosed-but-unapplied correction, not a
discovery.

**B — structural, defending side (4).** `465.2.b`, `814.1.c`, plus `464.2.c.2` and `383.4.f` from the
rest of the 41. Disposed by §4: one point card, capped at 3/turn, opponent-gated.

**C — inside a lens CLAUDE.md already records as scoring nothing, which the generator's LENS filter
missed (4).** `477.3.b` and `477.3.e.2.a` are the **Might/arithmetic** lens (*"nothing converts Might
size into points except OGN-034's excess threshold of 5"*) — the filter has `^70[234]` so it excluded
`703` at 113/0 and let `477.3.b` through, which is the same lens either side of an inconsistent regex.
`423.1.a.1` is the **stun** lens (*"no card pays points for a stun, so the lens yields no
BURST/CHAIN/ALT_WIN"*) — there is no stun regex in the filter at all. **§31.2's "22 rules bucketed"
should be 26, and the residue 96 should be ~70 before the counting fix and 41 after it.**

**D — genuinely absent family, structurally (4).** The `820` Repeat block (`820.1.b`, `820.2.a`,
`820.1.c.1`): the **only** Repeat paragraph any finisher cites is `820.1.c.3` at 2 — *the cap*.
Finishers cite Repeat to **refuse** it and engines cite it to **use** it, which is the cleanest
engine/finisher signature in the set. `417.6.b.3` at 51/0, with `417.6.b.4` 12/0 and `417.6.c` 20/0 beside it (and `437.4` 33/0, which the filter did exclude as the Prevent lens):
damage source and prevention, and no point card reads a damage amount. `385.1`/`385.2`/`366.1`: all 17
point cards are on-board permanents or battlefields, so an off-board trigger can never carry one.

---

## 6. Standing notes

**A handed-over dataset is a claim and gets a finding's verification.** The brief was explicit and
careful — it named the conflation risk, it said regenerate rather than trust, it quoted rc-synth's own
refusal to over-claim — and the numbers underneath it were still wrong, because the generator carried a
trap that this repo had committed a correction for **hours earlier, in `c8df075`**. The fix exists in
`CLAUDE.md` and in `scripts/claude-md-gap.mjs`'s walk document; a one-off probe written in `/tmp` does
not inherit it. **When a probe reimplements a measurement that already has a committed instrument,
diff it against that instrument before reading its output.**

**And the counting trap now has a third member, so state it as three.** CLAUDE.md records the hyphen
(`OGN-304`) and the trailing dot (`801` as its whole block). The third is `#`: an issue number. The
corrected lookbehind `(?<![-0-9.])` **admits** `#153`, and re-ranked it put four issue numbers —
`153`, `173`, `171`, `180` — into the top fifteen at 131, 111, 58 and 45 "citations", every one of them
zero. `(?<![-#0-9.])` is the form that survives all three. This is the fourth independent instance of
CLAUDE.md's own rule biting: **the lookbehind alone was not enough either; what works is sampling the
hits and reading them**, which is how all four were caught here.

**"Does the family score?" disposes of a rule faster than reading the rule does.** Every row in this
set was settled by one of two measurements — *which sibling does a finisher cite?* and *do any of the
pool's 15 point cards read this?* — neither of which requires understanding the mechanic. The rule text
was opened for all twenty anyway, verbatim, and it changed no verdict. That is worth knowing before the
next lane budgets time per rule.

**The negative result is the deliverable.** rc-synth refused to call the residue finisher material three
times and was right to. The residue is 41 rules, not 96; of the honest top twenty, twelve are not gaps,
four are the defending side, four are lens rules the filter missed, and four are structurally absent
families. **No finisher lead survives.** The one candidate that reached arithmetic — a defending Draven
— is already in the catalogue as the ENGINE its own ceiling makes it.

---

## 7. Follow-up, same session: the instrument was hiding an instance of the shape it exists to find

After reporting §1–§6 I checked whether the **committed** instrument carried the same defect as the
throwaway generator. It did — `scripts/claude-md-gap.mjs` line 11 was the fully broken form, while
CLAUDE.md §30.4 and walk §30.4 both tell lanes to run it and call the output *"cheap, exact, and
ranked"*. The #187 walk document had **diagnosed it the same day and never patched it**.

### 7.1 The failure mode nobody had seen is a FALSE NEGATIVE

The inflation is documented. The suppression is not, and it is invisible by construction: the script
skips a rule when CLAUDE.md is believed to carry it, and the dot-admitting lookahead made
**CLAUDE.md carrying `419.4.a.1` read as carrying `419.4.a`**. The real gap was dropped before
printing. **Sixteen gaps were suppressed this way** — 13 by a child, 3 by the hyphen trap:

`316.8.b.1` (19×), `419.4.a` (19×), `464.2.e` (18×), `430.2` (16×), `377` (15×), `144.4.c` (14×),
`161` (14×), `355.5` (13×), `383.4.d` (13×), `431.2` (13×), `464.2` (12×), `356.4.c` (11×), `465`
(10×), plus `116`, `749`, `051` via the hyphen.

**A parent is always hidden by its own child.** So the tool built to detect *"the exception is
carried, the rule is not"* was structurally blind to precisely that shape. Fixed in `1727a80`;
population at 10+ goes **97 → 75**, and the three exclusions are commented at the call site.

### 7.2 The top row it was hiding is itself an instance of the shape

I claimed §7.1's sixteen were "a fresh vein". Rather than leave that unchecked, I opened the top one.

**316.8.b.1**, verbatim: *"Showdowns that occur as a result of a player moving to an empty Battlefield
are a stand-alone Phase and do not create a Combat."*

| | catalogue | CLAUDE.md | entries |
|---|---:|---:|---:|
| `316.8.b.1.a` — the **exception** (an arriving enemy converts it to a Combat Showdown) | 53 | **1** | 47 |
| **`316.8.b.1` — the rule it is an exception to** | 19 | **0** | 9 |

**Fourth independent instance of the batch-23 shape**, after `355.7`, `136.2.c`, `811.6` and the
300–499 lane's `384`. And it is the sharpest, because CLAUDE.md reaches the same conclusion the long
way: the bloodless-conquer verdict is assembled there from `344.2` (8 mentions) + `323.9` (12) +
`807.1.d` (5) + `461` (3) — *"an attack trigger lives ONLY on the 323.9 path"* — while **316.8.b.1
says it outright in one sentence**. That is the `811.6`-against-`811.1.b` pattern exactly: the file
derives what a standalone paragraph states.

### 7.3 Standing note

**A fix that lives only in prose is not a fix.** The defect was diagnosed in a walk document while
the instrument stayed broken and a *third* document kept recommending it as exact. When a walk
diagnoses an instrument, patch the instrument in the same commit — otherwise the next lane inherits
the defect **with a recommendation attached**, which is worse than inheriting it bare.

**And the word *"exact"* is what stopped anyone re-checking it.** rc-synth called the join *"one line,
exact"* and was right about the join and wrong about the implementation. A claim of exactness earns a
test, not trust: the fix here took one line and the check that would have caught it was reading ten
of the printed hits, which is this project's own standing rule.

Filed as **#207** for the three consequences I was not the owner of: the sixteen unread gaps, the
CLAUDE.md numbers that are now measurably wrong (§31.2's *"22 bucketed / 96 residue"* should be
**26 / 41**), and the `204.3.a`-over-`383.3.b` citation upgrade that CLAUDE.md already prescribes and
`combos.json` still has at 0 in finishers against 5.

---

## 8. The suppressed vein, read: five for five the same shape, and one of them settles an R-number

Continuing through the sixteen gaps §7.1 surfaced. **All five read so far are parent-absent /
child-carried**, which is not a coincidence — the suppression mechanism *selects* for that shape, so
the hidden set is enriched in exactly the finding the instrument existed to produce.

| rule | catalogue | CLAUDE.md | the child that hid it, which CLAUDE.md does carry |
|---|---:|---:|---|
| `419.4.a` | 16 | **0** | `419.4.a.1` (2) — the countered-card exception |
| `464.2.e` | 18 | **0** | `464.2.e.1` (3) — the placement order |
| `430.2` | 16 | **0** | `430.2.a` (1) — the ready/exhausted default |
| `377` | 15 | **0** | `377.1` (n) — recognised by the `:` |
| `144.4.c` | 14 | **0** | `144.4.c.1` (n) — Ganking widens the Standard Move |

### 8.1 419.4.a settles R26, which was ruled on an internal conflict

**419.4.a**, verbatim: *"Any such triggered abilities trigger when the act of playing the card has been
completed by **the resolution of the card**."*

R26 asks whether a *"When you play a spell"* trigger resolves before or after the spell. It was
**ruled B on 2026-09-04** — the trigger waits for the spell to resolve — and the ruling records itself
as *"un conflicto interno del reglamento, no una ambigüedad de lectura"*, decided against the literal
chain read (playing completes at Finalize 337.1, the trigger goes on at 383.3.c, 340.1 resolves
newest-first, so Virtuoso would banish his own spell) **on the strength of a worked example** at
`359.3.e.10`. Its stated reopen condition is *"si Riot reordena la cadena o reformula el ejemplo"*.

**419.4.a is not an example. It is the normative paragraph, and it states B outright.** The
conclusion does not change; its footing does. Rewording the *example* can no longer reopen R26 —
only rewording 419.4.a could. That is the same move this project already made for R9, R20, R27, R29
and R31: **an R-number retired by finding the rule instead of asking.**

Measured, and it is the actionable half: **five entries stand on R26 and not one of them cites
419.4.a** — `virtuoso-banish-channel` (the entry R26 was opened for), `death-from-below-recurring-kill`,
`darius-trifarian-thrill`, `katarina-lotus-trap-sudden-storm-board-cap`,
`acceptable-losses-ravenbloom-prefect-gearless-gear-hate`. They lean on a voted reading where a rule
exists. Proposed on issue #11 rather than applied here; `combos.json` is single-owner.

**And 419.4.a is the positive half of a split CLAUDE.md already carries negatively.** The file states
*"a non-triggered check needs only finalization, a trigger needs resolution"* and sources it to
`419.4.b` against `419.4.a.1` — the two *negative* cases, a countered card counting for Legion and not
for a play-trigger. `419.4.a` says the positive directly. Same shape as `811.6` against `811.1.b` and
`316.8.b.1` against `316.8.b.1.a`: **the file derives what a standalone paragraph states.**

### 8.2 The other four, disposed

`464.2.e` — *"Add items to the Combat Chain if establishing Attacker and Defender has caused Triggered
Abilities to become Pending."* The parent of the ordering rule CLAUDE.md uses to conclude the
Defender's triggers resolve first. Citation upgrade, no new mechanic.

`430.2` — *"The Game Effect that instructs a player to channel 1 or more runes **may specify the
conditions or circumstances** under which those runes enter the board"*, with Riot's worked example
being *"Channel 1 rune exhausted."* CLAUDE.md carries `430.2.a` as *"the default the card text
overrides"*; `430.2` is the **permission** that makes the override legal, and the whole
Startipped-Peak / Papertree family turns on it.

`377` — *"Activated Abilities are **repeatable** effects with a cost."* Worth a line beside the
once-per-turn census: the rules call them repeatable, and this pool makes eleven of them actually so,
because an exhaust in the cost is what removes the repeatability the definition asserts.

`144.4.c` — *"Ganking is a unique ability that affects a Unit's Standard Move."* Parent of `144.4.c.1`.
Reinforces `810.1.c.3`: Ganking modifies the Standard Move and grants no separate movement.

### 8.3 Standing note

**A suppressed set is not a random sample.** These sixteen were hidden *because* a child was carried,
so the set is enriched in parent-absent/child-carried cases by construction — five for five so far.
That makes the remaining eleven worth reading rather than sampling, and it means the true size of the
"exception carried, rule absent" family is larger than the four instances found by reading, because
the instrument was deleting new ones from its own report.

---

## 9. The vein is read out: sixteen for sixteen, and the last one is this project's own house rule

All sixteen suppressed gaps are now opened. **Every one is parent-absent / child-carried or a
foundational paragraph the file reaches by derivation** — the suppression selected for it.

### 9.1 051 is the rules-text authority for the discipline this project enforces most often

**051**, verbatim: *"Card text uses different terminology than rules. Card text should be interpreted
according to these rules, **not as though it were text within these rules**."*

Catalogue **12**, CLAUDE.md **0**, 7 entries. This project enforces exactly that as a house style and
has paid for it repeatedly — the `383.1.b` / `OGN-118` mismatch registered rather than erratized, the
note that *"466.3.a is stricter than every 'when I win a combat' reminder in the pool"*, the `763.1`
spurious comma settled from the card side, `342` treated as summary prose against the operative
permissions, and the standing rule that reminder text is never quoted as rules text. **051 is the
paragraph that mandates all of it**, and it was never cited here.

### 9.2 052 dissolves an apparent contradiction between rule 161 and a printed card

`161` (catalogue 14, CLAUDE.md 0) opens *"Rune is a Card Type."* `OGN-235 Karma, Channeler` prints
*"(Runes aren't cards.)"* — verified verbatim in `corpus_flat.txt`, so CLAUDE.md's quote is right.
Read together they look like rule 002 territory, card text beating rules text.

They are not in conflict, and **052** says so in its own last sentence: *"Card, when written in card
effects, is shorthand for 'Main Deck card.' Runes, legends, and battlefields are not considered cards
when executing the abilities and effects of game objects. **They are considered cards for the purposes
of these rules.**"*

**A Rune IS a card for the rules and is NOT a card for card effects. Two scopes, both true.** So
Karma's parenthetical is not a simplification — it is restating 052 — and 161's *"Rune is a Card
Type"* is what makes `164.2.b`'s *"Recycle this"* legal at all, since 416.1 defines Recycling over
cards. CLAUDE.md's synergy-predicate note is correct as written (it pairs the parenthetical with
161.2.b); what it lacks is the paragraph that reconciles the two, which is the one a future session
would otherwise re-derive.

### 9.3 355.5.a is the play-steps half of the distinction this catalogue cites 145 times

**355.5.a**: *"This does not include cards that affect one or more Game Objects based on criteria."*
Riot's two worked examples: *"Stun a unit at a battlefield" is a Choice* and **"Kill all gear" is not
a Choice**.

This is the same programmatic-versus-chosen line as `355.10.d` (catalogue 145, in 53 entries) but at
the **play-steps** level rather than the targeting level: 355.10.d decides whether something is
*targeted*, 355.5 decides whether a choice is *made while playing the card*. Catalogue 5, CLAUDE.md 0.

Concrete and actionable: **`raging-firebrand-thermo-beam-free-gear-wipe` cites `355.10.d` and not
`355.5.a`** — and `OGN-022 Thermo Beam` kills all gear, which is *Riot's own worked example for the
paragraph*. Citation upgrade, not a new verdict; not applied, `combos.json` is single-owner.

### 9.4 The remainder, disposed

`383.4.d` (7/0) — the **definition** of Hold Effect (*"Triggered Abilities whose Condition includes a
Unit being present at a Battlefield during the Beginning phase when a player scores Victory Points
from Holding"*), with 383.4.d.2's two halves: units present, **or** abilities referencing the player.
CLAUDE.md carries `.2.a` and `.2.b`. `SFD-030 Skyfall of Areion` prints *"My hold effects are also
conquer effects"*, so the card is reading this defined term.

`431.2` (parent of the Burn Out sequence), `464.2` (how Combat opens), `465` (the Combat Damage Step),
`356.4.c` (component discounts apply before other discounts — parent of the `356.4.c.1` ordering
CLAUDE.md carries, with Ezreal Prodigy as Riot's example), `464.2.e`, `430.2`, `377`, `144.4.c` — all
parents of children the file carries. Citation upgrades, no new mechanics.

`116` (*"Players each draw 4"*) and `749` (*"Counters do not have a controller"*) are correctly absent:
setup and a scaffolding statement with no card reading them.

### 9.5 What the vein was worth

Sixteen rules, read end to end: **one settles an open R-number** (`419.4.a` / R26, proposed on #11),
**one is this project's own most-enforced discipline** (`051`), **one dissolves an apparent card-vs-rules
contradiction** (`052` with `161`), **one is a named citation upgrade on a live entry** (`355.5.a` on
the Thermo Beam wipe), and **twelve are parent-of-a-carried-child**. Nothing here changes a verdict;
several things stop a future session re-deriving one.

**And none of it was reachable while the instrument was broken**, because every one of these was
deleted from its own report by the child that CLAUDE.md did carry.
