# What the visual editor enforces, and what only the checklist catches

Issue #208's sibling question, lane `rc-kw`, 2026-09-13.

825 Unique turned out to be a rule `checkBuild` scores and the editor lets a player build past. The
question that follows is whether it was **the only one or the first one**, and the manager asked for
the census before any change — because the answer might be that the editor is deliberately permissive
and the checklist is the contract.

**It is neither, and that is the finding.** The editor enforces most rules, but it does so in **three
different ways**, and two rules fall into a fourth category that is not a policy at all: neither
blocked nor marked. `825.3.a` was the first, not the only one.

Probe: `.scratch-kw/census.dom.test.ts` (gitignored), which mounts the real `web/builder.ts` under
happy-dom and reads what a player would read. Nothing in `src/` or `web/` was edited in this pass.

---

## 1. The census

Enforcement is split across two layers and they do not agree, so both are measured:

- **MODEL** — `src/builder.ts` (`capOf`, `addCard`, `setChampion`). Every consumer of the module gets this.
- **UI** — `web/builder.ts`, which computes `off` (Domain Identity) and `noSignatureChampion` and
  writes them into `aria-disabled`; the click handler at `web/builder.ts:725` reads that attribute and
  returns. **A rule enforced only here is enforced for a clicking player and for nobody else.**

| `checkBuild` row | model | UI | how |
|---|---|---|---|
| 103.1 One Champion Legend | enforced | — | `capOf` max 1; `addCard` replaces |
| 103.1.b Domain Identity | **allows** | **blocks** | dimmed + `aria-disabled` + reason string |
| 103.2.a.2 Chosen Champion | **allows** | **blocks** | pool zone filtered to the tag; `rowHtml` gates `eligible` on it too |
| 103.2 Main Deck of 40 | n/a | n/a | a deck is built *up* to 40; no cap can apply |
| 103.2.b Up to 3 of a name | enforced | enforced | `capOf`, with the `ANY_NUMBER` exemption |
| **825.3.a One of each Unique name** | **allows 3** | **allows** | **nothing** |
| **103.2.d Up to 3 Signature cards** | **allows 4** | **allows** | **nothing** |
| 103.3.a 12 runes | enforced | enforced | `capOf` rune total |
| 103.3.a.1 runes in identity | **allows** | **blocks** | same `off` path as 103.1.b |
| 103.4.a · 103.4.c battlefields | enforced | enforced | `capOf`: 1 per name, 3 total |
| **103.2.e Legal in this format** | **allows** | **allows** | marked with a `banned` / `restricted` badge, never blocked |
| TR 601.1.c.1 sideboard ≤ 10 | enforced | enforced | `sideboardCapOf` |
| TR 601.1.c.2 sideboard contents | enforced | enforced | `sideboardCapOf` + pool zone filter |
| TR 601.1.c.3 · 403.3 combined copies | enforced | enforced | `mainCopiesOfName` over both bags |

### Transcript

Model layer, calling the builder API directly:

```
NON-VACUITY: card index has 926 printings; checkBuild emits 10 rows on an empty deck
  103.1.b identity       model:ALLOWS
  103.2.d signature<=3   model:ALLOWS 4
  825.3.a unique         model:ALLOWS 3
  103.2.a.2 champion     model:ALLOWS off-tag
  103.3.a.1 rune id      model:ALLOWS Fury Rune
  103.2.e legality       model:ALLOWS banned
  103.2 size 40          model:n/a (a deck is built UP to 40; no cap can apply)
```

UI layer. Legend is `SFD-189 Fire Below the Mountain` (calm/mind); every subject is **inside** that
identity or domainless, so nothing below is masked by the identity block:

```
  825.3.a  Unique, already 1 copy              blocked=false  reason=""
  103.2.d  a FOURTH Signature (calm/mind)      blocked=false  reason=""
  103.2.e  BANNED, colourless battlefield      blocked=false  reason=""
  103.1.b  off-domain control subject          blocked=true   reason="Outside calm + mind — Domain Identity (103.1.b)."
  deck-column plus on the Unique card          blocked=false
```

**The fourth line is the control** and it is why the other three can be trusted: the instrument does
fire, it fires on the right rule, and it names it.

---

## 2. The real finding — the editor has three tiers, and two rules are in none of them

What a cell *marks*, as opposed to what it *blocks*:

```
  BANNED colourless battlefield    banTag=banned   sigTag=-  capBadge=-   -
  Unique, 1 already held           banTag=-        sigTag=S  capBadge=-   -
  fourth Signature card            banTag=-        sigTag=S  capBadge=-   -
  off-domain control               banTag=-        sigTag=-  capBadge=-   dimmed
```

So the editor already has a coherent vocabulary, with three settings:

1. **Filtered out** — the card is never offered. Only 103.2.a.2: the Champion zone draws exactly the
   units carrying the legend's tag (measured: 2 cells, `Ornn, Blacksmith` and `Ornn, Forge God`), and
   `rowHtml`'s `eligible` repeats the test so the deck column cannot be used as a back door.
2. **Marked and blocked** — Domain Identity (dimmed, `aria-disabled`, and the reason on the button)
   and every cap (a `capBadge` reading `3 of 3`, `12 of 12`, `1 of 1`).
3. **Marked, not blocked** — 103.2.e. The cell paints a `banned` or `restricted` badge and takes the
   click anyway.

**`825.3.a` and `103.2.d` are in none of these.** They are not filtered, not blocked, and *not marked* —
the `S` badge says the card *is* a Signature card, never that you already hold three. A player gets no
signal at all until they read the Construction checklist.

That is the shape of the answer to the manager's question. The editor is **not** uniformly permissive:
it blocks Domain Identity, which is exactly as "reportable" a rule as the Signature cap. So
*"the checklist is the contract"* is not the existing policy — tier 2 exists and is the largest tier.
Tier 3 (legality) is a defensible deliberate choice because the badge is right there on the cell.
**Tier 4 is not a choice; it is an omission, and 825.3.a was the first instance of it, not the only one.**

---

## 3. Two structural notes, neither of them a player-facing gap

**Domain Identity lives only in `web/builder.ts`.** `addCard` has no identity gate, so the rule is
enforced by the UI and by nothing else. Every other rule the editor enforces is enforced in the model
(`capOf`), where any consumer gets it. Identity and the Chosen Champion tag are the two exceptions.
Nothing consumes `src/builder.ts` outside `web/` today, so this costs nothing now; it is a note about
where the invariant lives, not a bug.

**The deck column is a second route and it reads only `cap.full`.** `web/builder.ts:472` sets
`aria-disabled` on a row's `+` from the cap alone, so on an imported list:

```
  --- deck-column plus on an IMPORTED off-domain card ---
      row plus on Blazing Scorcher     blocked=false
      row plus on Forgefire Cape       blocked=false
```

A list pasted or imported from Piltover Archive never passes through `capOf`, so it can arrive holding
cards the pool cell would have refused — and the row's `+` will then add more of them. Narrow (the
card is already illegal either way, and the checklist already says so), but it is the same asymmetry:
the pool cell knows about Domain Identity and the deck row does not.

---

## 4. Traps paid for while measuring, because each would have produced a confident wrong census

1. **The pool hides off-domain cards before it dims them.** `openList` preselects the legend's domain
   chips (`web/builder.ts:114`) and that filter is a **`some`** test, while `inIdentity` is an
   **`every`** test — two different predicates over the same idea. A first pass reported `CELL NOT
   DRAWN` for four subjects and would have read as *"the editor does not offer these"*, when the truth
   was *"the default filter is on"*. The probe clicks **All domains** first, which is the button a
   player uses.
2. **`off` is computed before every other reason, so an off-domain subject reports the wrong rule.**
   The first UI pass showed `aria-disabled=true` for the banned card, the fourth Signature card and the
   off-domain rune — and all three were the *identity* block firing, because every one of those
   subjects happened to be outside calm/mind. That is the precedence trap this project already records
   for classifiers, in a new place. Fixed by choosing subjects **inside** the identity (or domainless —
   `inIdentity` calls a domainless card legal under any identity, which is what makes the banned
   colourless battlefields the clean legality subject) **and by printing the `title`**, which is the
   only field that names which rule refused.
3. **`aria-disabled` is doing double duty as state.** It is not `disabled`, so the button is clickable;
   the handler reads the attribute back and returns. That works, but it means the enforcement lives in
   a rendered string, so a change to the cell template can switch a rule off with no test failing —
   which is #138's own lesson about this file.
4. The pool paginates at 48 and the search box is debounced 150 ms, so a subject is reached by driving
   the search and waiting. A probe that does not wait reads the previous page.

---

## 5. Filed

| Issue | What |
|---|---|
| #210 | 825.3.a — the plus button lets a Unique card reach two copies (filed before this census, from #208) |
| #211 | 103.2.d — the editor lets a fourth Signature card in, with no block and no mark |
| #212 | The deck-column `+` bypasses Domain Identity on an imported list |
| #213 | 103.2.e — banned cards are marked but not blocked: confirm that this is the intended tier |

Per the brief, **nothing was fixed in this pass.** #213 is a decision rather than a defect and is
labelled as one; the other three are the same omission at three sizes.

---

## 6. THE DECISION, and what shipped against it — lane `rc-builder`, 2026-09-13

The user answered #213 and the three issues around it in one contract, and it is stated by the axis
rather than rule by rule: **the tier a rule belongs to is decided by INVARIANT versus FORMAT.**

> **BLOCK at the button, both the pool cell AND the deck-row plus, with the reason on the button:**
> 103.1.b Domain Identity — no format exempts it; 103.2.b copy cap; 825.3.a Unique; 103.2.d Signature.
>
> **MARK but take the click, badge on the cell:** 103.2.e banned — because the format toggle makes
> "banned" a property of the QUESTION being asked rather than of the card, so a player may legitimately
> build a casual or pre-ban list — and 103.2.e restricted, which is not even a question: it is a CAP,
> not an illegal card, and `data/legality.json` has exactly one restricted row (`OGS-019 Wuju Bladesman
> - Starter`, 2v2 only). Blocking it would be WRONG.
>
> **The Construction checklist keeps reporting EVERYTHING regardless of tier. It is the authority; the
> button block is a convenience that must never disagree with it.**

So tier 4 is abolished and tier 3 is confirmed as deliberate. The census's own framing survives intact:
tier 3 was *"defensible and may well be deliberate"*, and it is; tier 4 was *"not a choice, it is an
omission"*, and it was.

### What shipped

`825.3.a` and `103.1.b` both moved into `src/builder.ts`, where every other rule the editor enforces
already lived. That is the structural half of #212 rather than the narrow one, and it is what makes the
contract's *"both buttons"* clause true by construction instead of by two copies of one test agreeing:
`capOf` now answers **"may this card be here at all"** rather than only *"how many copies"*, and the
deck row, the pool cell and `addCard` all read it. `web/builder.ts` no longer tests Domain Identity at
all — it dims on `cap.offIdentity`, which is the same decision that refuses the click.

`103.2.e` is unchanged and now carries a docblock at its own site in `cellHtml` naming the tier and the
reason, because #208 was found by asking why one rule was unenforced and *"it is this tier on purpose"*
would have closed it in a minute.

### Three things the census did not see, found while fixing it

**1. The Legend zone was a FALSE REFUSAL, and it is now gone.** The census probed the pool's main,
champion and battlefield zones and the deck column; nobody probed the Legend zone. Measured: with
`SFD-189 Fire Below the Mountain` (calm + mind) already named, the cell for `OGN-251 Loose Cannon`
(fury + chaos) was dimmed and its button refused, reading *"Outside calm + mind — Domain Identity
(103.1.b)."* — so **switching legends meant removing one first.** 103.1.b.2 says the identity *"is
dictated by the domains of your Champion Legend"*, i.e. a legend DEFINES the identity rather than
sitting inside it, and 103.1.b.1's *"Cards included in your deck"* is about the rest of the list;
`addCard`'s own docblock has said *"A legend REPLACES the one already named — refusing that click helps
nobody"* since #101. The gate in `capOf` sits after the legend branch for exactly this reason.

**2. The button is STRICTER than the checklist on one rule, and that is now a known gap rather than an
accident.** `identityRule` (`src/build.ts`) reads `deck.main` and `deck.battlefields` and **not the
sideboard**, while the pool cell has refused an off-identity sideboard card since #101 — so the editor
and the checklist disagree there, in the safe direction. The refusal was KEPT and the rules were read
rather than guessed: Tournament Rules 403.4 exchanges a sideboard card *"1 for 1 with Main Deck cards"*
and 403.4.b says a player *"may not change their Runes, Legend, or Battlefields at any point after deck
registration"*, so the identity a sideboard card would be swapped into is fixed for the whole match and
an off-identity one can never legally be played. That makes it a gap in the CHECKLIST, and widening
`identityRule` is a rules judgement that deserves its own issue rather than a quiet edit inside a UI fix.

**3. The precedence between 825.3.a and 103.2.d.1 had to be decided, and Ornn is why.** Measured over all
51 Signature names in the pool: **Ornn is the only champion with three, and all three are Unique**
(`SFD-190`, `SFD-191`, `SFD-192`); Master Yi is the only other with two and neither is Unique; the
remaining 45 champions have one each. So the canonical Ornn list — one of each — refuses a second
`Forgefire Cape` under BOTH rules at once, and answering *"3 of 3 Signature cards (103.2.d.1)"* there
would name a rule the player cannot fix by dropping one: 825.3.b keeps the two caps independent, *"any
combination of three Signature cards, but still only one of each named Unique card"*. `capOf` therefore
reports, in order, 103.1.b → 103.2.d.2 → 825.3.a → 103.2.d.1 → 103.2.b, which is *"which rule would
still refuse this click once the others were relieved"*.

A consequence worth stating because it moved two tests: **once 825.3.a caps a Unique name at one, the
only shell in the pool where a player can still see 103.2.d.1 refuse an ON-TAG card is Master Yi** —
three `Highlander` (not Unique) and then `Alpha Strike`. Both the model and the DOM fixtures for that
rule were moved off Ornn onto Master Yi, using the `UNL-191 Wuju Master` printing rather than `OGS-019`,
which carries the same champion tag and is the pool's one restricted row.

### Measurements, with their predicates

| | |
|---|---|
| printings examined | **1189** |
| `/\[Unique\]/i` over `text` **or** `effect` | **3 printings, 3 distinct names** — `SFD-190 Forgefire Cape`, `SFD-191 Rabadon's Deathcrown`, `SFD-192 Shurelya's Requiem`; the shipped predicate reads `text` alone and returns the same three |
| cards printing BOTH `[Unique]` and Spiderling's *"can have any number of cards named"* | **0** — the two card-text caps are DISJOINT in this pool, so their precedence is **untested rather than decided**, and `test/builder.test.ts` pins the disjointness as a tripwire |
| Signature names, folded by the one champion tag they carry | **51 names across 48 champion tags**: Ornn 3 (all Unique), Master Yi 2 (neither), 45 champions with 1 |
| cards the identity gate refuses vs allows, swept over the whole pool under a calm + mind legend | both **> 100**, and `capOf` agrees with the checklist's identity rows on **every** non-legend card the pool offers (`test/builder.test.ts`) |

### A trap the census recorded and a probe walked into anyway

Trap #1 — *"the pool hides off-domain cards before it dims them"* — cost the first probe of this lane
four rows too, which read `CELL NOT DRAWN` for every off-domain subject. `openList` preselects the
legend's domain chips and that filter is a `some` test while `inIdentity` is an `every` test. The fix is
the same as the census's: click **All domains** first, which is the button a player uses. It is now a
named helper in `test/dom/builder.dom.test.ts` with the reason attached, so the next person to write a
DOM probe there inherits it instead of re-finding it.


---

## 7. The tier audit — is any OTHER rule in the wrong tier? — `rc-builder`, 2026-09-13

With the contract in hand the census's question becomes answerable for the whole checklist rather than
for one rule, and it has to be asked in BOTH directions: rules the checklist scores that the button
does not stop, and rules the button stops that the checklist does not score. Probe:
`.scratch-builder/tiers.ts` (gitignored), which drives the real `capOf` / `sideboardCapOf` / `addCard`
/ `setChampion` and then asks `checkBuild` about the deck each click produced.

**NON-VACUITY: 1189 printings, 926 pool cells, and `checkBuild` emits 10 rows on an empty deck.**

| `checkBuild` row | does a click reach the broken state? | tier, and is it right? |
|---|---|---|
| 103.1 One Champion Legend | no — a second legend REPLACES the first | correct |
| 103.1.b Domain Identity | no — `OGN-001 Blazing Scorcher` refused under a calm + mind legend | **fixed this pass** |
| 103.2.a.2 Chosen Champion | **was reachable in the model** — `setChampion` had no tag gate | **fixed this pass** |
| 103.2 · TR 601.1.b Main Deck of 40 | n/a — a deck is built *up* to 40; no cap can apply | correct |
| 103.2.b Up to 3 of a name | no — stops at 3 | correct |
| 825.3.a One of each Unique name | no — `Forgefire Cape` stops at 1 | **fixed this pass** |
| 103.2.d Up to 3 Signature cards | no — the Master Yi board stops at 3 | correct (#211) |
| 103.3.a 12 runes | no — stops at 12 | correct |
| 103.3.a.1 runes in identity | no — a Fury Rune refused under a calm + mind legend | **fixed this pass** |
| 103.4.a · 103.4.c battlefields | no — 3 in all, 1 of a name | correct |
| TR 601.1.c.1 sideboard ≤ 10 | no — stops at 10 | correct |
| TR 601.1.c.2 sideboard contents | no — a rune is refused | correct |
| TR 601.1.c.3 · 403.3 combined copies | no — a fourth copy across both bags is refused | correct |
| 103.2.e Legal in this format | **yes, and deliberately** — `OGN-276 Aspirant's Climb` is added | **tier 3 BY DECISION** |

**So the answer is: nothing is left in the wrong tier.** Every invariant row now blocks at the button,
the one format-dependent row marks and takes the click, and `103.2` has no tier to be in.

### The mirror, which is where the one open item is

```
  sideboard identity: button=REFUSES  checklist 103.1.b=pass  -> DISAGREE
  main-deck control:  button=REFUSES  checklist 103.1.b=fail  -> agree
```

The control line is what makes the first trustworthy: the instrument fires and the checklist does fail
for the same card in the Main Deck. `identityRule` reads `deck.main` and `deck.battlefields` and not
`deck.sideboard`, so the BUTTON IS STRICTER THAN THE CHECKLIST on exactly one rule. The refusal is
right (see §6) and the checklist is short; filed as its own issue rather than fixed inside a UI change.

### 103.2.a.2 — the census's second exception, and a wrong refusal beside it

The census said *"Identity and the Chosen Champion tag are the two exceptions"* to every rule living in
the model. #212 moved the first; this pass moved the second, and 103.2.d.3 went with it, because
`setChampion` never consulted `capOf` at all. `championCapOf` is now the third sibling of `capOf` and
`sideboardCapOf`, and all three champion buttons — the pool's Champion cell, the deck row's *Champion*
link, and `setChampion` itself — read it.

**The player-facing half runs the other way, and it was a wrong REFUSAL rather than a missing one.** A
Champion click DESIGNATES rather than adds: `setChampion` puts a copy in the Main Deck only when the
list holds none. So a full copy cap refuses nothing — and it was refusing. Measured on the live editor:

```
  three Annie, Stubborn in the list, Champion zone
  Annie, Stubborn    blocked=true  badge=3 of 3  title="3 of 3 · a Main Deck takes three of a name (103.2.b)."
```

**Three copies of your own champion candidate is the ordinary build, not a corner**, so anyone who
built the deck the obvious way hit it. After: `blocked=false`, no badge, and the click designates while
leaving all three copies where they were. The cap still binds where the list holds NO copy of that
card, because there the designation really does add one — 103.2.b counts a NAME, so three of one
printing bar a designation of another.

One fact worth knowing before somebody rewrites that test: **the "unit" half of 103.2.a.2 is real and
is currently unreachable as the reported reason.** Measured — 48 main-deck non-unit cards carry a
champion tag and ALL 48 are Signature, so 103.2.d.3 always answers first. The clause stays because it
is the rule, and a test pins why nobody ever sees it.

### Two notes on the instrument

`.scratch-builder/` is gitignored but **`npm test` still collected the DOM probes in it**, because
vitest's include glob is `**/*.test.ts` and does not care about `.gitignore`. One of them then timed out
at 5s under full-suite load — a false red in a tree four lanes share. The probes were renamed out of the
glob once they had been read. A scratch probe that is a `*.test.ts` is everyone's problem, not yours.

And the census's trap #1 cost this lane four rows before it cost anything else: `openList` preselects
the legend's domain chips, so every off-domain subject read `CELL NOT DRAWN` and the first probe would
have reported "the editor does not offer these". Clicking **All domains** first is now a named helper in
`test/dom/builder.dom.test.ts` with the reason attached.


---

## 8. Close-out — `rc-builder`, 2026-09-13

**The two layers now agree on every rule.** §7's mirror left one disagreement, sideboard identity, and
it is closed (**#215**): the checklist gained a fourth sideboard row, `Tournament Rules 403.4.b ·
Sideboard inside the identity`, reported first of the four for the reason `capOf` reports identity
first. It is a Tournament Rules row rather than part of 103.1.b's because at registration a sideboard
card is not in the deck — TR 601.1.b makes the Main Deck exactly 40 and 601.1.c keeps the sideboard
beside it — and what makes an off-identity one illegal is what it is FOR: TR 403.4 swaps it 1 for 1
into the Main Deck and TR 403.4.b freezes the Legend for the match. Both citations are labelled,
because 403.3 and 403.4 exist in both books.

It was measured to be test-neutral for `test/build.test.ts` rather than hoped: the row lives inside
`sideboardRules`, which returns nothing for a deck with no sideboard, so the stable-order pin is
untouched; and every card in both sideboard fixtures is mono-mind or mono-order under a mind + order
legend, so the new row passes and both `legal` assertions stand. Its own row-level cases still belong
in that file and it needs an owner.

Rendered and looked at rather than assumed, since it is a claim about output:

```
  ✗ Sideboard inside the identity  to fix   Outside calm + mind: Blazing Scorcher — a sideboard card
    is swapped into the Main Deck (Tournament Rules 403.4) ...
  ✓ Sideboard of 10 or fewer       ok       Tournament Rules 601.1.c.1
  ✓ Sideboard cards only           ok       Tournament Rules 601.1.c.2
  ✓ Copies across Main Deck and sideboard   Tournament Rules 601.1.c.3 · 403.3
```

### One surface the audit did NOT cover, and what it found there — #216

The editor now refuses an illegal click; the question that follows is **what else prices a card set for
a player.** `planDeck` guards Domain Identity and banned cards and nothing else, and `validateCombos`
bounds an entry's quantity below (`>= 1`) and not above — so nothing stops an entry declaring a card
set that is not a legal deck, and the "What to add" panel would price it.

**Latent, not live, and the zero is not vacuous:** 766 entries, 1898 `uses` rows all carrying an
explicit quantity, and 1638 variants of which 905 flatten more than one entry, 6085 card cells —
**zero** over 103.2.b, 825.3.a or 103.2.d. Nine variants touch a Unique card and 149 touch a Signature
card, so the predicates had something to find. Composition is safe for a reason rather than by luck:
`generateVariants` merges card multisets with `max()` and not `sum()`.

The fix proposed there is proven rather than asserted, and it is this day's principle again — **do not
write a second copy of the caps.** Replay an entry's `uses[]` through `addCard` and assert the builder
took every copy asked for. With no legend named `identityCap` stands down, so a replay checks exactly
the copy caps, which matters because they are ZONE-DEPENDENT: a flat `quantity <= 3` is wrong for a
rune, where twelve is legal, and wrong for a battlefield, where one of a name is the limit.

```
replayed 766 entries and 1898 uses rows through addCard
rows the builder REFUSED to take in full: 0
CONTROL: asked 4x Forge of the Future, builder took 3 -> instrument FIRES
```

### A third instrument note, because it cost two lanes a false red

`.scratch-kw/census.dom.test.ts` — the probe that produced §1 of this document — was still on disk and
still matching `**/*.test.ts`, and it timed out at 5s under full-suite load, turning `npm test` red for
every lane in the shared tree. Renamed out of the glob, contents intact. rc-kw already knew the trap
(`unique-demo.vtest-disabled.ts` beside it is a probe they disabled the same way) and missed one.
**A scratch probe named `*.test.ts` is everyone's problem; `.gitignore` does not reach vitest.**


---

## 9. Is every rule the cell enforces pinned by a CLICK? — `rc-builder`, 2026-09-13

`test/dom/builder.dom.test.ts` exists because enforcement rides on a rendered `aria-disabled` that the
click handler reads back (§4 trap 3, and #138's own lesson): a change to the cell template can switch a
rule off with every `src/` test still green. Three rules joined that string today, so the question is
whether each one is pinned by a CLICK and not only by a source pin — and the day's own a11y
measurement is why the question needs asking, since the one whole-statement source pin in that file
had to be rewritten twice because a CORRECT rewording broke it.

**The answer was no in five places, and all five are closed.**

| rule | before | now |
|---|---|---|
| `103.3.a.1` rune identity | model only, new today | clicked, and asserted to cite 103.3.a.1 and **not** 103.1.b |
| `103.2.a.2` champion tag, via the DECK ROW | source only | clicked — the one champion button a pool filter cannot cover |
| `103.4.c` one battlefield of a name | badge asserted, click not | clicked, both buttons |
| `103.3.a` twelve runes | no DOM test at all | clicked, both buttons |
| `103.2.e` legality, tier 3 | docblock only | clicked, in **both formats** |

**Reading a badge and taking a click are two different claims**, which is what `103.4.c` and `103.3.a`
had confused: a template change could have left the badge painted and the button working.

### Tier 3 is pinned by one card, and it is the only card that could

Measured over all 1189 printings, **exactly ONE card's legality differs between the two formats**:
`OGS-019 Wuju Bladesman - Starter`, restricted in 2v2 and unremarkable in Constructed. So it is the
only subject that can show the badge following `env.format()` at all — and it is simultaneously the
pool's only restricted row, the one the user's decision says must stay addable whatever else changes.
Both halves of tier 3 therefore land on the same cell: no badge in Constructed, the restricted badge
after the flip, and `aria-disabled="false"` with a click that lands in both.

### Coverage, stated honestly

Of the twelve rules the cell can report, **eleven** are named inside a block that clicks and asserts
nothing happened. The twelfth is the bare `103.2` — `championCapOf`'s not-a-Main-Deck-card branch — and
it is **unreachable from the UI**: `filterPool` draws only on-tag units in the Champion zone and a
non-main row has no Champion link. It is pinned in the model instead, with that reason in the test.

**The first coverage probe answered "(none) missing" and was wrong**, because it matched prefixes, so
`103.2.a.2` satisfied the bare `103.2`. Exact matching gives one. That is the fourth instrument error
of this lane in a day — after a probe that read a filter as a refusal, a round-trip check that compared
key order, and a `checkSave(text, name)` call against a `checkSave(name, text)` signature that made the
length check answer `ok` without ever seeing the text. **Every one of them returned a confident wrong
answer rather than an error**, which is the whole argument for sampling the hits and reading them.

### Two mutations, and the counts are the point

Neutering the sideboard identity row turns **exactly two of its eight** cases red — the two that detect
a failure; the other six pin pass, unknown, absence and order and are *supposed* to survive a row that
never fails. Neutering `refreshBuilder` turns **exactly one of twenty-five** red. A mutation that turns
everything red means the suite is measuring something else.
