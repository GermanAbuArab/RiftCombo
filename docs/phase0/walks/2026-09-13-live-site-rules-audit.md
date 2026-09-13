# Does what the site tells a player match what the rules say — part one, and the handoff

Lane `rc-kw`, 2026-09-13. Audit of the strings promoted to production in `df5de99`.
**Partly complete.** Two of the manager's three questions are answered and verified; the third is not
started and is the first thing a successor should take.

---

## 0. Method, and one limitation that shaped everything

**The app sits behind Google sign-in** (`<body data-auth>`), so an unauthenticated fetch reaches the
entrance page and never the Construction checklist. The playwright MCP failed to connect for the
manager. So rather than fight for a rendered page, I audited **the strings themselves at the deployed
sha**, which is sound because the bundle is built deterministically from the committed tree — and it
is a *better* instrument for this question, because every claim can be diffed against the rules file
exhaustively rather than eyeballed.

**The step that made it valid, and it nearly went wrong.** `src/builder.ts` and `web/builder.ts`
**differ between `origin/master` (`df5de99`, live) and my working tree** — rc-builder has pushed since
the promotion. Auditing the working tree would have audited code that is not deployed. I extracted the
live files with `git show df5de99:<path>` into `.scratch-kw/live/` and confirmed **`src/build.ts` is
byte-identical between live and HEAD** (`git diff --quiet origin/master HEAD -- src/build.ts`), which
is what makes the checklist rows below exercisable locally and still true of production.

**No live fetch was made.** CLAUDE.md records that repeated curls of `riftcombo.app` from this machine
tripped Vercel's automatic mitigation, and nothing here needed one.

---

## 1. The Construction checklist rows that shipped today — VERIFIED

Rendered with real decks through the deployed `checkBuild`. Every row's sentence checked against the
paragraph it cites.

**825.3.a and 825.3.b are presented as INDEPENDENT caps, and the failing string says so outright.**
Two Forgefire Capes, only two Signature cards so 103.2.d cannot bind:

```
  PASS  103.2.b            No name appears more than three times.
  FAIL  825.3.a · 825.3.b  2× Forgefire Cape — a Unique card is capped at one per deck (825.3.a),
                           and being a Signature card does not lift it (825.3.b).
  PASS  103.2.d            2 Signature cards, all tagged Ornn.
```

Three *different* Unique names, one each — the case where both caps are satisfied at once:

```
  PASS  825.3.a · 825.3.b  Forgefire Cape, Rabadon's Deathcrown, Shurelya's Requiem are Unique and each appears once.
  PASS  103.2.d            3 Signature cards, all tagged Ornn.
```

**Neither row implies the other relieves it**, which is the thing 825.3.b exists to prevent, and the
failing sentence names the relieving claim and denies it in the same breath. Correct.

**103.2.d.1 and 103.2.d.2 are different refusals and the checklist names which.** A fourth Signature
card fails with *"4 Signature cards (103.2.d.1 caps the deck at 3, regardless of name)"* and then
lists them — `.d.1`, the count, with Riot's own qualifier `regardless of name` carried across. The
off-tag refusal is a separate string citing `.d.2`. Correct.

**A row I checked because it looked wrong and is not.** `103.2 · Tournament Rules 601.1.b` renders
*"2 cards — a Main Deck is **at least** 40 (103.2)"*, while the Tournament Rules paragraph it also
cites says **exactly** 40. Reading `sizeRule` at the deployed sha, this is deliberate and right: three
branches, `n === 40` passes, `n < 40` cites the **Core Rules floor** (you have not broken the equality,
you are not finished), and `n > 40` cites *"a competition Main Deck is exactly 40 (Tournament Rules
601.1.b)"* — **labelled `Tournament Rules` at the site**, per the standing rule about the 52 numbers
that exist in both books. The row says which rule a list actually broke rather than printing one
number for both.

---

## 2. The banned / restricted tier — VERIFIED against the user's decision

The decision of 2026-09-13: **banned is marked and not blocked** in the editor because the format
toggle makes "banned" a property of the question asked, while **restricted is a CAP and must stay
addable**. `data/legality.json` has exactly **one** restricted row — `OGS-019 Wuju Bladesman - Starter`,
**2v2 only** (measured: 21 legality rows, 1 restricted).

```
RESTRICTED ONLY — OGS-019 as the legend
  [constructed] 103.2.e PASS    :: No banned or restricted card in this list.
  [2v2        ] 103.2.e UNKNOWN :: Wuju Bladesman - Starter is restricted in this format.
                                   A restriction is a cap, not a ban — read Riot's notice for what it limits.
BANNED ONLY — OGN-177 Stealthy Pursuer
  [constructed] 103.2.e FAIL    :: Stealthy Pursuer is banned in this format.
  [2v2        ] 103.2.e FAIL    :: Stealthy Pursuer is banned in this format.
```

**Three things are right and each is separately load-bearing.** Restricted returns **`unknown`, not
`fail`**, and `checkBuild` computes `legal` as `rules.every(r => r.status !== "fail")` — so a
restricted card **does not make a list illegal**, which is the whole of the decision. The
format-scoping works: the 2v2-only row is silent in Constructed. And the sentence a player reads
states the distinction in words rather than leaving it to a colour.

---

## 3. NOT DONE — the notables applied today, as they read on the page

The manager's third question. **Not started.** Four Plaza entries, seven Ivern, two Gutter Palace,
`keeper-of-masks`, `lillia`. The question is whether a rules claim reads wrong *on the page* —
truncated, contradicted by a neighbouring notable, or citing a paragraph the sentence does not
support. Several of those notables are mine.

---

## 4. HANDOFF

### Files
I hold **nothing contended**. `data/synergies.json` was handed back and is with **rc-gap**, along with
`data/combos.json`. `CLAUDE.md` is the manager's. `src/*` and `web/*` belong to rc-builder and
rc-schema — **report UI defects, do not patch them.** Mine are this document and `.scratch-kw/`.

### The specific next step
Take §3. The cheapest correct instrument is the one used here: the notables are strings in
`data/combos.json`, so they can be audited **without the browser** by reading them at the deployed sha
(`git show df5de99:data/combos.json`) and checking each quoted passage against
`data/Riftbound-Core-Rules-2026-07-16.txt`. **`test/source-quotes.test.ts` already proves quotes are
verbatim**, so the open question is the other three: *truncated*, *contradicted by a neighbour*, and
*citing a paragraph the sentence does not support*. Only the second needs entry-level reading.

### What did NOT work, so it is not retried
- **A rendered-page audit.** The site is behind sign-in; an unauthenticated fetch gets the entrance.
  The playwright MCP failed to connect for the manager; I did not need it and did not test mine.
- **Auditing the working tree.** `src/builder.ts` and `web/builder.ts` are ahead of production. Always
  `git show <deployed-sha>:<path>`; only `src/build.ts` happened to be identical.

### Numbers measured today, each with its predicate
- **20** cards remove more than one body in one action — predicate: any plural/collective reference to
  units, 59 of 936 corpus lines, all 59 read by hand. A static **+1** escapes **3** of the 20; **+3**
  escapes 6; **7** escape no Might at all.
- **Three** of the 20 carry no location clause and reach the BASE — `UNL-132`, `UNL-180`, `SFD-147`.
- **6** cards print a static non-"this turn" +N Might grant to a set of friendly units — reproduces
  CLAUDE.md's corrected list exactly.
- **275 of 766** entries stand on a Might ≤2 body or name a Might-1 token; **190** name no threat,
  **60** name only `OGN-133`; Angler Beast is named by **2**, both ENGINEs, **zero finishers**.
- **18** entries park a Might ≤2 body at zone BASE — **BURST 5, CHAIN 4, ENGINE 9** — and **zero** name
  any of the three base-reaching threats.
- Catalogue at handoff: **766 combos + 220 synergy rules = 986**.

### The thing worth carrying more than any number
**Six times today a predicate overstated and reading corrected it**, and the deciding datum was never
in the predicate: the garrison's Might, whether the body ever *stands*, whether a condition is present
or past tense, and — the sharpest — **`zone: BASE` is not one fact**. For seven Ivern rows it is a
parking spot; for seven ENGINEs it is the *origin of a shuttle*, and that datum lives in the entry's
`steps`, not in the `uses` row I filtered on.
