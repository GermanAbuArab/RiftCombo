# The catalogue owns a second garrison sweeper, says so in its own words, and warns about it nowhere

**Lane rc-plaza, 2026-09-14. Refs #200, #220.** Follow-on from
`2026-09-14-plaza-garrison-plus-one.md`, which found `UNL-072 Crescent Strike` while sweeping answers
to a Grand Plaza garrison. This measures how far that reaches past the Plaza.

**RESULT: 100 entries in the catalogue stand on a garrison a 1-damage sweep kills. 56 of them name
`OGN-133 Flurry of Blades`. ZERO name `UNL-072 Crescent Strike` — and the catalogue already holds an
entry whose own step 4 says Crescent Strike *"clears a garrison of 1 Might tokens simultaneously"*.**

This is the Thermo Beam shape, which CLAUDE.md already records once: *"the catalogue owned the gun for
months and had never pointed it at its own finishers."* It is the second instance, and this time the
reason is mechanical and nameable.

---

## 1. The card, and why the shipped sweep cannot see it

`UNL-072 Crescent Strike` — **mind, E3 + 1 Power, [Action], NOT Signature**:

> *"Choose a battlefield and an enemy unit there. Deal 4 to that unit and 1 to each other enemy unit
> there."*

Against seven Might-1 Recruits or Birds it clears **all seven**. Against Might-2 bodies it kills
**exactly one**. Functionally it is `OGN-133 Flurry of Blades` scoped to one battlefield, plus a
4-damage single-target kill, for two more Energy and a Power — and unlike Flurry it is **Mind**.

`sweepMassAnswers()` in `scripts/adversarial-check.mjs` requires

```
/(to all (enemy )?units at (a )?battlefields?|kill all units)/i
```

and the card says *"each other enemy unit there"*. **It is not a bad regex; it is a predicate written
from one card's wording.** Measured directly: a wider predicate
`/(each|all) other (enemy )?units? (there|here)/i` returns **2** cards the shipped one misses, of which
`OGN-200 Twisted Fate` is **correctly** excluded (attack-gated, exactly as `OGN-148 Anivia` and
`OGN-159 Warwick` are) and `UNL-072` is a genuine miss. One real hit, one correct exclusion — the
narrow shape a good widening has.

---

## 2. The blast radius

> **PREDICATE**: rc-emit's `garrisonFloor()` copied verbatim from `scripts/adversarial-check.mjs`,
> with its own `--selftest-garrison` answer for `flurry-of-feathers-grand-plaza-win` (floor 1, tokens
> `[Bird]`) reproduced before use. Floor ≤ 1 = a body 1 damage kills under 143.2.a.

| | count |
|---|---|
| entries with a knowable garrison floor of 0 or 1 | **100** of 767 |
| …naming `OGN-133 Flurry of Blades` | **56** |
| …naming `UNL-072 Crescent Strike` | **0** |

By class, the 100: **ENGINE 68 · ALT_WIN 17 · INFINITE 7 · BURST 5 · CHAIN 3.** The ENGINE share is
the same unaudited half of the catalogue CLAUDE.md already names three separate measurements of.

---

## 3. The catalogue said it first, in an entry, and nothing carried it across

`crescent-strike-frostcoat-cub-sweep-threshold` (ENGINE, `UNL-072` ×3 + `SFD-067` ×3) — step 4,
verbatim from `data/combos.json`:

> *"It takes 4 — lethal on anything now at 4 Might or less (143.2.a) — and every OTHER enemy unit
> there takes 1, which clears a garrison of 1 Might tokens simultaneously."*

**That sentence is the finding.** It was authored, it is correct, and it is the only place in 767
entries where the card appears. The 100 entries that stand on exactly the garrison it describes were
warned by an automated sweep whose predicate cannot match the card, and no human pass joined the two.

**The general form is worth more than the card: a hand-authored entry can hold a fact that an
automated sweep over the same catalogue is structurally unable to find, and nothing in this project
reads entries back into its instruments.** The one instrument that does — `scripts/claude-md-gap.mjs`
— joins CITATIONS, not card names.

---

## 4. What it changes and what it does not

- **It does not change any verdict.** Every one of the 100 is already exposed to a 1-damage sweep and
  56 say so. What changes is that the exposure spans **two domains**, so a line cannot treat the cheap
  sweep as a Body matchup and plan around it.
- **The repair that matters is the domain sentence, not the card name.** The emitted warning currently
  names a Body card at E1; the honest version names Body at E1 **and** Mind at E3 + 1 Power.
- **It strengthens rather than weakens the garrison-wide +1**, because a single +1 answers both: at
  Might 2, Flurry kills nothing and Crescent Strike kills exactly one of seven.

---

## 5. Two instrument errors of my own, both self-caught

- **A "Mind-legal subset" line in my first probe was meaningless and was cut.** I computed which of the
  100 entries could legally run Mind — which answers nothing, because **the threat comes from the
  OPPONENT, whose identity is not constrained by mine.** 103.1.b binds a deck, not a matchup. The
  number it produced (68 of 100) was real arithmetic answering a question nobody asked.
- **"Named in 0 of 23" and "named nowhere" are different claims.** `UNL-191 Wuju Master` is named in
  **73** entries catalogue-wide — it is well known here — and in **0 of the 23 Grand Plaza rows**. The
  scoped claim is the true one and is the one staged. `alpha-strike-wuju-master-garrison-clear` even
  pairs it with a garrison clear, which is the Signature `UNL-192 Alpha Strike` under its own legend.

## 6. Recommendation

One predicate widening in `sweepMassAnswers()` — owned by rc-emit, not touched here — propagates the
correction to every entry the sweep covers, which is strictly better than 100 hand-written copies of
one sentence that would then go stale independently.
