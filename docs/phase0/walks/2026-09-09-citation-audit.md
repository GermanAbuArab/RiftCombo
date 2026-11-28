# Citation audit — the 234 sources that carried a url and no `accessed` date

**Session** rc-citations, 2026-09-09. **Issue** #137. **Staging file** `/tmp/rc-walks/rc-citations.json`
(225 patches). This session does **not** own `data/combos.json`; the manager applies.

`accessed` is defined in `src/types.ts:91-92` as *"Date somebody on this project opened the url and read
the quote there."* Without it a `url` is a link somebody pasted, and CLAUDE.md is explicit that a URL
you did not read is not a citation. That is what this audit closes.

---

## 1. The measurement, which is not the one the issue title states

Issue #137 says "20 across 12". Measured over `data/combos.json` at 714 entries on 2026-09-09:

| | count |
|---|---|
| sources carrying a `url` | 372 |
| of those, **missing `accessed`** | **234, across 222 entries** |

The number grew with the catalogue, which is expected. What is **not** what the issue implies is the
SHAPE of it. Grouped by host:

| host | rows | what it is |
|---|---|---|
| `github.com` | **224** | this repo's OWN issues, 32 distinct (#11 … #168). `kind: "agent"` ×220, `manual-walk` ×4 |
| `old.reddit.com` | **9** | the real external debt |
| `riftbound.gg` | **1** | one deck page |

So this was never 234 unread external pages. It is 224 internal provenance links, which are readable
in one `gh issue view` each, plus **ten** external rows — which is the "10 unreachable citations"
already recorded in #137 (9 Reddit + 1 riftbound.gg). The debt was real but the framing overstated it
by an order of magnitude, and the 224 turned out to be checkable rather than merely assertable.

## 2. Result

| | rows |
|---|---|
| **opened and verified → patch staged** | **225** |
| still undated (Reddit, closed to this machine) | 9 |

All 225 verified against the source itself, each with a verbatim `quote` and a `note` recording what
was checked. `.scratch/rc-citations/validate.mjs` re-run immediately before reporting: 225 patches,
225 targets OK, 0 problems, 0 duplicate keys.

## 3. Two probes that lied, both caught, both in the same shape

CLAUDE.md's standing rule is that an absence is a measurement and a measurement made with the wrong
anchor is not one. This walk hit that twice, and both are worth recording because the wrong answer
looked like a finding.

**(a) `gh issue view --json body` omits the comments.** Issue #11 is 2,234 b of body and **61,321 b of
comments across 32** — a 28× under-read, and every ruling this catalogue stands on (R1, R2, R6, R25,
R28, R33) is in the COMMENTS, not the body. A first containment pass on body only reported 57 rows as
having no trace of their entry. Re-fetched with `--json body,comments` (720,659 b across the 32
issues), that fell to 38. **Always fetch `body,comments`.**

**(b) A base-code probe misses an issue that writes card NAMES.** The remaining rows were then tested
for the entry's `uses[].card` codes. Issue #89 records its candidates in prose — *"Ahri, Inquisitive +
Nine-Tailed Fox + Fox-Fire — 104 listas"* — so `ahri-foxfire-might-threshold` scored 0/3 on codes and
is in fact fully recorded. Re-run name-aware, 26 more rows resolved. **Probe on names AND codes.**

After both corrections only **2** issue rows were left genuinely unaccounted for (§5.2).

## 4. Method

For each row: fetch the issue with `gh issue view <n> --json number,title,state,createdAt,body,comments`,
then locate the passage that records the entry (by entry id, by card name, or by base code) and use
that passage verbatim as the `quote`, with an ellipsis where it is cut. Scripts in
`.scratch/rc-citations/` (gitignored): `extract.mjs`, `section.mjs`, `batch-*.mjs`, `validate.mjs`.

Three source shapes came out of it, and they are **not** interchangeable:

1. **Candidate-list issues** (#32, #34, #36, #40, #46, #47, #48, #56, #58, #59, #61, #62, #89, #95,
   #97, #100, #102, #106, #107, #111, #115, #116, #117, #118, #141, #146, #150) carry a section per
   candidate, usually headed with the entry id — `## C4 — \`reksai-sarcophagus-accelerated-recursion\` ·
   ENGINE · Fury/Chaos`. Strong evidence; the quote is that section.
2. **The rulings issue** (#11). The claim is a verdict, not a card, so a card probe is meaningless.
   All eight rows verified against the user's own comment text: R2 = A, R6 = A, R25 = A, R28 = A.
3. **Work orders** (#153, #161, #168, and the #146 pair in §5.2). These COMMISSION a walk and name
   their own deliverable; they do not and never will contain the entry's cards. For those the check is
   the deliverable — e.g. all 14 #161 rows are recorded in
   `docs/phase0/walks/2026-09-06-finisher-feeders.md` (64,334 b), which #161's own Deliverable section
   names. A containment check against a work order is a false negative by construction.

## 5. Findings

### 5.1 The one non-Reddit external source opens, through the API

`jhin-virtuoso-ekko-malzahar-vi` source [2] is `riftbound.gg/decks/the-jhinpendium-infinite-ekko-combo-primer/`,
whose `/decks/` pages sit behind a Cloudflare challenge. It reads fine through dotgg:

```
https://api.dotgg.gg/cgfw/getdeck?game=riftbound&slug=the-jhinpendium-infinite-ekko-combo-primer
```

**`game=riftbound` is REQUIRED** — without it the API answers `Hacker! Go home (1)!` with HTTP 200,
which is easy to misread as a dead endpoint. New fact, not previously in CLAUDE.md.

VERIFIED, not merely opened: **all eight** of the entry's `uses[]` cards are in the registered list,
checked with the project's own `CardIndex.resolveCode` / `equivalents` rather than by eye — the legend
`UNL-181 Virtuoso` is present as its second printing **`UNL-226`**, and `UNL-009-P` / `OGN-083-P` /
`SFD-088A` are the promo and alt-art spellings of the riftbound.gg dialect CLAUDE.md records from #90.
Author `Enhame` matches the Reddit author `Enhame_` and the Google Doc primer already cited at index 1,
and the deck's own description links that same Google Doc. Posted 2026-07-10, 323 views, Standard.

### 5.2 Two sources that opened and do NOT say what the entry claims

`amateur-recital-free-evacuation` [3] and `voidreaver-khazix-xp-removal` [3] both cite issue **#146**.
That issue was read end to end (12,957 b, zero comments) and contains **no mention of either entry or
any of its cards** — `Amateur`, `Recital`, `UNL-207`, `Voidreaver`, `UNL-201`, `Kha'Zix`, `UNL-143`,
`UNL-119` all return 0. It is scoped to chaos-first UNITS, and `UNL-207 Amateur Recital` is a
battlefield.

It is **not** a fabricated citation, and the entries are not damaged:

- Each entry's PRIMARY provenance is a different issue and is intact — #102 candidate 1 for the
  Recital, #116 candidate C1 for Voidreaver, both cited separately with their own walk docs.
- The #146 row travels as a PAIR with `docs/phase0/walks/2026-09-06-chaos-units-lens.md` at [4], and
  that walk (27,755 b) does discuss both: it confirms the Recital (*"`amateur-recital-free-evacuation`
  — YES, and this entry alone already cited 170.11.c correctly"*) and folds the refuted
  `snapjaws-xp-mill` into Voidreaver as a notable (*"§1.5 Where it does belong: a notable on
  `voidreaver-khazix-xp-removal`"*).

So the source row stands for the WALK, and only the issue half is wrong. Staged with `accessed` and
the discrepancy recorded in the patch note rather than deleted. **Manager's call**: the cleaner fix is
to retitle that source after the walk instead of the issue.

### 5.3 A verbatim quote citing two paragraph numbers that do not exist

`jhin-fiora-facebreaker-recall` source [5] is the one Reddit row that WAS read (2026-09-04, before
Reddit closed) and it carries the OP's in-thread correction verbatim:

> I was thinking the Jhin moving back to base is a move. But 444.1.a.2 - specifies that its a recall
> (during combat cleanups) - not a move, and Rule 432 says that recalls are not "moves" and do not
> trigger move abilities.

Checked against `data/Riftbound-Core-Rules-2026-07-16.txt`: **444 is "Pay"** (*"Paying a resource is
the act of removing that resource from your Rune Pool"*) and has no `.1.a.2`; **432 is "Doubling"**.
The commenter is right on the substance and wrong on both numbers — almost certainly an older
numbering. The correct paragraphs are the ones the entry's own reasoning already cites, **456**
(*"Recalls are not Moves."*) and **456.1** (*"They do not cause Triggered Abilities to trigger that are
triggered by Move actions."*), with **455** defining the Recall itself.

The quote must stay verbatim. But nothing in the entry says so, so the next reader who looks up
444.1.a.2 will find "Pay" and conclude the entry is broken. **Recommend** a one-line note on that
source. This is the only broken rule reference found: over the six Reddit-citing entries, 45 rule
references were checked against the rules file and this was the single failure.

### 5.4 A duplicate source row, one copy read and one not

`jhin-fiora-facebreaker-recall` cites `old.reddit.com/.../1ryj4fw/` **twice** — at [0] with no quote
and no date, and at [5] with `accessed: 2026-09-04` and the quote above. Same thread, read once. I did
**not** date [0] from [5]: what was read on 2026-09-04 was the OP's correction, and I cannot assert
that whoever read it also read the flowcharts [0]'s title describes. **Manager's call**: merge the two
rows, or drop [0] as redundant.

### 5.5 Clean results worth recording, so nobody re-checks them

- **Issue #97's three refinements were all applied.** #97 proposed refinements to
  `corrupted-dragon-mass-evacuate` (Eclipse / Decree of Insight), `faefolk-challenger-forced-attacker`
  (Heart of Dark Ice) and `blade-dancer-caitlyn-choose-ready` (702.2.a). All three are in the entries
  today. CLAUDE.md's standing "grep for diagnosed-but-unapplied corrections" check passes here.
- **No issue refutes an entry it is cited for.** All 173 extracted passages were scanned for
  refutation language; 14 matched and every one is a false positive — the issue is *answering* a
  refutation, or "DEAD" is a table row about a different card. The two `shen-duo-mutual-hold` and
  `corrupted-dragon-mass-evacuate` hits were read by hand and are a refutation-to-walk note and a
  refinement section respectively, both of which the entries already carry.
- **Every Reddit-citing entry stands without Reddit.** All six carry a hand walk plus at least one
  dated, readable source for the same claim: a Riot FAQ for `leblanc-zilean-reflection-doubling`, two
  YouTube walkthroughs for `gemdragon-henge-vi-blind-fury`, the Rift Mana decklist for
  `garen-fiora-malzahar-facebreaker-recruits`, the author's own Google Doc for
  `jhin-virtuoso-ekko-malzahar-vi`, YouTube + TCGplayer for `pack-of-wonders-bewitching-discard`,
  YouTube for `jhin-fiora-facebreaker-recall`. No `verified` entry depends on an unreadable page.

## 6. Surviving debt — 9 rows, and why they are not dated

Reddit is closed to this machine (CLAUDE.md, 2026-09-06: curl, r.jina.ai, headless Playwright, headed
Chrome with cookies and the redlib/safereddit mirrors all answer 403 or a CAPTCHA). **Not retried this
session, by standing order.** Faking a date is the one thing this audit exists to prevent, so these
keep no `accessed`:

| entry | idx | thread |
|---|---|---|
| `jhin-fiora-facebreaker-recall` | 0, 1, 2 | `1ryj4fw` (dup of [5], read 2026-09-04), `1s2defo`, `1tlk9n3` |
| `garen-fiora-malzahar-facebreaker-recruits` | 0 | `1r7wh0p` |
| `jhin-virtuoso-ekko-malzahar-vi` | 0 | `1uv0brd` |
| `gemdragon-henge-vi-blind-fury` | 0, 1 | `1tefqto`, `1vro7dd` |
| `leblanc-zilean-reflection-doubling` | 0 | `1sv3yjk` |
| `pack-of-wonders-bewitching-discard` | 1 | `1uj028b` |

These rows carry no `quote`, so none of them is holding up a textual claim; they are community-report
provenance, and §5.5 shows every one of the six entries is independently evidenced. #137 should be
narrowed to these 9 and left open until the user pastes the threads.

## 7. One thing to weigh before applying

`web/main.ts:1` imports the whole of `data/combos.json` (5,368,707 b) into `public/app.js`
(5,457,177 b), so anything added here is downloaded by every user. The 225 patches add **~157 KB, 3.0%**
if the quotes land, or **5.5 KB** if only `accessed` is applied and the quotes are dropped.
Recommend applying the quotes: a `url` with a date but no evidence is most of the way back to the
problem this audit closes. Note that `Source` has no `note` field (`src/types.ts:84`), so the patch
notes are manager metadata and never reach the file.

---

## 8. The other half of the file's provenance: the sources with no url

Added after the first report. The audit above covers the 372 sources that carry a `url`; the file
holds **1,675 more that carry none** — `manual-walk` ×774, `riot` ×769, `agent` ×131, `article` ×1.
(The first report to the manager said "138" for this population; that was wrong and is corrected here.
The right figure is 1,675, i.e. 2,047 sources in total across the catalogue.)

These cannot take an `accessed` date, but they are not therefore unauditable: **834 of them name a
`docs/` path in the title**, across **86 distinct paths**, and every path is checkable against disk.
Twenty-one distinct issue numbers are named in those titles as well (#11, #21, #41, #44, #45, #46,
#47, #63, #98, #102, #118, #153, #154, #155, #161, #169, #170, #171, #173, #180, #191).

**Result: 21 of 21 issues exist. 85 of 86 paths exist. One does not.**

### 8.1 A citation pointing at a walk document that has never existed

`charm-nasus-evacuation-conquer` source [1] names
`docs/phase0/walks/2026-09-06-amateur-recital-evacuation.md`. That file is not on disk and
`git log --all` over the path returns nothing — it has never been committed to this repository. It is
the only broken path of the 86.

The claim it carries is real and is not lost. It reads *"issue #102 — evacuating a garrison is not yet
a Conquer; the body has to walk in"*, and the actual issue #102 walk,
`docs/phase0/walks/2026-09-06-battlefield-lens-candidates.md` (26,546 b), states it verbatim at lines
119–122:

> **The opponent loses Control. Nobody gains it.** The battlefield is now unoccupied and uncontrolled,
> which is exactly **170.11.c** *"Battlefields can be 'open.' This means they are unoccupied and
> uncontrolled."*
> 5. **You still need a body, and it has to walk in during your Main Phase.**

with 323.6, 348.2.a and 170.11.c all present — the same paragraphs CLAUDE.md attributes to the #102
walk. That file is also what the sibling entry `amateur-recital-free-evacuation` cites for issue #102,
so this is one mistyped path, written from the topic rather than from disk.

The entry is undamaged: its source [0] names
`docs/phase0/walks/2026-09-06-engine-payoff-walk.md, section 21`, which exists and records the entry.
The repoint is staged separately, in `/tmp/rc-walks/rc-citations-fixes.json` — deliberately NOT in the
`accessed` staging file, because it is a title rewrite and not a date, and mixing the two invites a
mis-apply.

### 8.2 A probe that lied for the third time, caught before it was reported

Checking the 21 issue numbers, a shell loop over an unquoted variable collapsed the whole list into a
single argument, and `gh issue view` reported **all 21 as missing**. That is a spectacular-looking
finding and it is entirely an artifact. Re-run one number per iteration, all 21 exist. Third instance
in one session of the same failure — the instrument, not the repository, was wrong — after the
body-only fetch (§3a) and the base-code probe (§3b). The standing lesson holds and is worth stating in
its strongest form: **a measurement that reports a large, surprising absence should be re-run with a
different instrument before it is written down, let alone reported.**

---

## 9. Every rule reference in the catalogue, swept

The natural end of a citation audit: a `url` is not the only kind of citation this file makes, and a
rule paragraph is the kind it makes most. Swept every `NNN.x[.y…]` token in every string field of
`data/combos.json` and `data/synergies.json` against **both** rules documents in `data/`, with the safe
`^\s*` anchor (JavaScript `\s` matches the form feed that opens 89 headings, per the 2026-09-09
CLAUDE.md note). Script: `.scratch/rc-citations/rulesweep.mjs`.

**903 of 904 distinct rule references resolve.** The seven that do not are, in full:

| token | uses | verdict |
|---|---|---|
| `187.x`, `190.x`, `383.3.a.x`, `477.x` | 5 | **not citations** — the idiomatic "the 190.x block" wildcard this project and CLAUDE.md both write on purpose |
| `899.md` | 13 | **probe artifact** — the tail of a filename, `…probe-500-899.md`, in a source title |
| `444.1.a.2` | 2 | **deliberate and flagged** — §5.3's old-numbering quote plus the new notable that documents it |
| **`485.4a`** | **2** | **the one real defect** |

Two things to take from that. First, the catalogue's rule citations are in very good shape, and
the number is worth recording so nobody re-derives it. Second, **the sweep must read both rules
files**: `703.3.a.3` initially read as broken and is a Tournament Rules paragraph, labelled as such at
both use sites — `data/Riftbound-Tournament-Rules-2026-07-16.txt` is in the repo and a Core-Rules-only
probe reports its references as missing.

### 9.1 `485.4a`, the only unresolvable reference

`plaza-armory-miss-fortune` and `gardens-becoming-wuju-xp-faucet` both list `485.4a` in the run of
paragraphs their notes say were opened and read. There is no `485.4a`; the paragraph is **485.4.a**
(*"Each player provides three (3) Battlefields, included in their deck during deck building. Only …"*),
which is what both entries mean. A missing dot. Staged in `rc-citations-fixes.json`.

### 9.2 A misattribution inside the note written to correct a misattribution

The manager applied §5.3 and added a notable to `jhin-fiora-facebreaker-recall` recording that the
Reddit OP's `444.1.a.2` and `Rule 432` are old numbering. That note is right about the substance and
about the entry, and it ends:

> this entry stands on 456 ("A Recall is when a Permanent is relocated from anywhere to its Base
> without it being a Move") and 456.1

That sentence is **455**. Checked with `grep -E "^[[:space:]]*(455|456)\."`:

```
455.  A Recall is when a Permanent is relocated from anywhere to its Base without it being a Move.
456.  Recalls are not Moves.
456.1.  They do not cause Triggered Abilities to trigger that are triggered by Move actions.
```

The entry's own body cites 456 and 456.1 correctly and does not cite 455 at all, so the fix is to name
all three. Low severity and worth stating anyway: a note written to fix a misattribution acquired one
of its own within the hour, which is this project's standing lesson about typed-rather-than-measured
claims arriving in the one place nobody re-reads. The rule that catches it is cheap and now exists —
`rulesweep.mjs` is a candidate for `test/`, where nothing currently checks a rule reference against the
rules files.

---

## 10. The 774 `riot`-kind sources

The lane rc-manager4 scoped after §9, against a defect class already proven elsewhere: a quote sweep
in another lane found 27 flagged passages in 39 entries, one a paraphrase typed from memory and
sixteen truncated at a comma and closed with a period.

**Population.** 774 sources of kind `riot`: 685 name the Core Rules, 84 name `data/corpus_flat.txt`
card text, 5 name a Riot page (two ban-list posts, the Unleashed Rules FAQ, a Vendetta errata post,
the Spiritforged errata). 417 carry a `quote`; 1,458 quoted passages were extracted from them.

### 10.1 Paragraph existence — clean

**Zero** `riot` sources name a paragraph that does not exist, consistent with §9 and now enforced by
`test/rule-refs.test.ts`.

### 10.2 Verbatim check

| verdict | spans |
|---|---|
| verbatim | **1,328** |
| verbatim, with the elision the author marked | 15 |
| verbatim, with editorial brackets treated as wildcards | 15 |
| **truncated** | **7** |
| not located (see 10.5) | 93 |

Three conventions had to be taught to the checker before its output meant anything, and each one
initially reported as a wall of defects:

- **Editorial brackets.** The catalogue marks an icon or an elided word with square brackets inside a
  quote — *"gain one or more [points]"*, *"+1 [M]"*, *"a player cannot [complete it]"*. Compared
  literally, the whole convention reads as a misquote: 87 spans on the first run.
- **A declared ellipsis is not a truncation.** Stripping a leading or trailing `…` before comparing is
  necessary; forgetting that the author *wrote* it turns every correctly-marked partial quote into a
  false "truncated at a comma" report.
- **An unanchored alternative in the truncation probe.** `/^[,;:]| [a-z]/` — the second branch matches
  anywhere downstream, so it flagged any quote followed within 40 characters by a lower-case word.
  That alone inflated truncations from 7 to 23. Fourth instrument error of the day, same shape.

### 10.3 The seven truncations

One is significant, one moderate, five cosmetic. All staged in `rc-citations-fixes.json`.

**`348.2.a.1`, in `angler-beast-ocean-drake-open-and-take`** — quoted as *"This results in a
Conquer."* The rule reads *"This results in a Conquer **if that player has not yet scored that
Battlefield this turn.**"* The quote cuts before the conditional and closes with a period, turning a
conditional rule into an absolute one — and the dropped condition is precisely what 470 caps, so it
matters exactly where a reader would lean on it. **This truncated form has propagated into CLAUDE.md**,
which writes *"348.2.a.1 says outright 'This results in a Conquer'"*; worth fixing there too.

**`143.2.b`, in `maduli-the-list-might-gate`** — drops *"and when summing Might to be assigned as
damage in the Combat Damage Step"*, i.e. the combat half, from an entry about a Might gate. CLAUDE.md
states the rule correctly with all three contexts; only the quote is short.

Cosmetic: `195` (×2, drops *"or if they are the only player remaining in the game"*), `383.1.b`,
`464.2.c.3.a`, `161.2.a`.

### 10.4 Seven paraphrases presented as verbatim, four of them material

| ref | quoted as | the rule says | |
|---|---|---|---|
| `419.4` | "…completed by **the player**" | "…completed by **the resolution of the card**" | **MATERIAL** |
| `465.2.c.4` | "…the minimum required to **kill them**." | "…required to **constitute lethal damage unless no further units remain to have damage assigned**…" | **MATERIAL** |
| `715.2` | "…increased by **the amount of Bonus Damage**" | "…increased by **Bonus Damage individually and separately**" | **MATERIAL** |
| `206` | "the printed or **base** cost" | "its printed or **copied** cost" | **MATERIAL** |
| `355.10.d` | folds in the list stem, drops "by the spell or ability's controller" | | moderate |
| `431.1.c` | a faithful condensation | | moderate |
| `436.4.a` | "their **Main Deck**" | "their **deck**" | minor |

The four material ones each change something this project reasons with. `419.4` moves the trigger from
the card RESOLVING to the player finishing the play steps — the distinction 419.4.a.1 exists to draw.
`465.2.c.4` drops the `unless` tail that CLAUDE.md already records as *a permission the attacker may
decline*, in an excess-damage entry, i.e. it drops the clause it was cited for. `715.2`'s *"individually
and separately"* IS the content of the paragraph. And `206` says **base** where the rule says
**copied**, in a catalogue that distinguishes printed, base and copied cost on purpose (185.3.a.1 makes
an ordinary token cost 0 for all purposes; 185.3.a.2 appends a real cost through a copy effect).

### 10.5 Rule or example — clean

Of 1,169 spans located in the Core Rules, **56 sit inside an `Example:` block** rather than the rule
text. That is legitimate — this project mines Riot's worked examples deliberately — and the question
is only whether any is *attributed to the paragraph as if it were the rule*. Probed for the
`REF: 'passage'` shape: **exactly one**, and its own source text already says it is an example. **No
example is misattributed as a paragraph** anywhere in the `riot` sources of `combos.json`.

### 10.6 What could not be checked from here

The 93 unlocated spans are, in order: 50 multi-item joins and rule-number-prefixed quotes (a span
carrying two rules or two card rows, or quoting a paragraph together with its number), 23 the same,
11 quotes from **external Riot pages** — the two ban-list posts, the Unleashed Rules FAQ, the Vendetta
and Spiritforged errata — which are not in any file we ship, and 9 extractor artifacts where a span
split on a curly apostrophe inside a word. Of these only the 11 external ones are a real limit, and
they are the honest outcome §6 describes: the Unleashed FAQ quote is the strongest source in the entry
that carries it, and the errata quotes are transcribed in `data/errata.json`, which the build verifies
find-string by find-string. Nothing here is dated on faith.
