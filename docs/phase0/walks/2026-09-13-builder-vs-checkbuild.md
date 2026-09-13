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
