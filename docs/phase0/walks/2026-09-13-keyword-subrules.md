# The keyword blocks 801–829, one level down — the uncited sub-paragraphs

Issue #191, lane `rc-kw`, 2026-09-13.

#191's Example-filtered vein is spent. This slice is the **orphan-neighbour probe** over the keyword
glossary instead: every `NNN.x.y` heading in 801–829 that `data/combos.json` and `data/synergies.json`
cite **zero** times, ranked by how heavily its parent or its best sibling is cited. The manager's
brief said to expect a low yield, because most of the range is already heavily mined, and to say so
plainly if that is what the measurement showed.

**It is mostly what the measurement showed — and the residue is not what anyone expected.** The
uncited headings are overwhelmingly *format boilerplate* ("It is present on Units", "It is formatted
as `Assault [X]`", "The X is referred to as the Assault Value"), correctly absent under #204's test.
But four things came out of the bottom of the list that are not boilerplate, and one of them is a
**defect in shipped code with a Riot paragraph written for it**.

---

## 1. Method, and the numbers behind it

`.scratch-kw/` (gitignored) holds the probes. Every number below carries its predicate.

**Heading extraction.** `grep "^NNN\."` cannot be used: 120 form feeds hide headings from a bare `^`
anchor, and headings carry a trailing period. Anchored `^[\s\f]*` instead, and cross-checked against
the independent extractor already in `scripts/claude-md-gap.mjs`:

```
NON-VACUITY: headings 801-829, my extractor: 320; claude-md-gap extractor: 320
             disagreements: onlyMine=0 []  onlyGap=0 []
```

**Citation counting** reuses `claude-md-gap.mjs`'s counter verbatim, lookbehind and all
(`(?<![-#0-9.])HEAD(?![0-9a-z.])`) — the hyphen exclusion stops `OGN-304` counting as rule 304, the
`#` stops issue numbers counting, and the trailing-dot exclusion stops a parent absorbing its block.

```
catalogue blob 6,926,218 bytes; CLAUDE.md 511,387 bytes
total citations of 801-829 headings by the catalogue: 4,886
headings with citations: 218;  uncited: 102
```

So the range is genuinely well mined: **218 of 320 headings are cited, for 4,886 citations.** The
102 uncited ones are the subject of this document.

---

## 2. FINDING — `825` Unique is a real deck-construction rule and `checkBuild` does not implement it

The whole `825` block is uncited except `825.3.a` (10) and `825.3.b` (1). Two sentences matter and
both are verbatim from `data/Riftbound-Core-Rules-2026-07-16.txt`:

> **825.3.a.** A deck can contain only one card of a given name if the card has Unique

> **825.3.b.** If a card is a Signature card and is also Unique, then that deck can contain any
> combination of three Signature cards, but still only one of each named Unique card.

**Riot wrote 825.3.b for exactly the deck `checkBuild` lets through.** The pool prints `[Unique]` on
three cards, and all three are Ornn Signature Equipment (measured over `data/cards.json`, 1,189
printings, 3 hits):

| Base | Name | Signature | Tags | Domains |
|---|---|---|---|---|
| SFD-190 | Forgefire Cape | true | Ornn, Equipment | calm, mind |
| SFD-191 | Rabadon's Deathcrown | true | Ornn, Equipment | calm, mind |
| SFD-192 | Shurelya's Requiem | true | Ornn, Equipment | calm, mind |

The Ornn legend is `SFD-189` / `SFD-244 Fire Below the Mountain` (calm/mind), so three copies of one
Cape satisfy **103.2.b** (3 of a name), **103.2.d.1** (3 Signature total, "regardless of name"),
**103.2.d.2** (all carry the legend's champion tag) and **103.1.b**. Every implemented row passes and
825.3.a is violated.

**This is demonstrated, not inferred.** A complete 40-card list was run through `checkBuild`:

```
  PASS    103.1                              One Champion Legend — Fire Below the Mountain · calm + mind
  PASS    103.1.b                            Domain Identity — Every card sits inside calm + mind.
  PASS    103.2.a.2                          Chosen Champion — Ornn, Blacksmith carries the Ornn tag …
  PASS    103.2 · Tournament Rules 601.1.b   Main Deck of 40 — 40 cards, Chosen Champion included
  PASS    103.2.b                            Up to 3 of a name — No name appears more than three times.
  PASS    103.2.d                            Up to 3 Signature cards — 3 Signature cards, all tagged Ornn.
  PASS    103.3.a · 103.3.a.1                12 runes in the identity — 12 runes, all inside the legend's domains.
  PASS    103.4.a · 103.4.c                  3 battlefields, unique names — 3 battlefields, all named differently.
  PASS    103.2.e                            Legal in this format — No banned or restricted card in this list.
  ==> checkBuild says legal: true
  ==> copies of SFD-190 Forgefire Cape in the Main Deck: 3
  ==> any row citing 825: false
```

**`legal: true` on an illegal deck.** Confirmed by grep as well: the strings `825` and `Unique` (the
keyword) appear nowhere in `src/`, `test/` or `web/`, and `COPY_CAP = 3` lives only in
`src/build.ts:86` — `src/builder.ts` applies no independent cap, so the deckbuilder does not catch it
either. A player can assemble this list in the visual editor and the Construction checklist will tell
them it is legal.

**The fix is small and needs no payload change.** It is the same shape as the existing Spiderling
exemption — `ANY_NUMBER = /can have any number of cards named/i` tested against `card.text` — only
inverted: a `/\[Unique\]/` test capping at 1 instead of 3. `text` is already in
`scripts/web-card-fields.mjs`, so nothing new reaches the browser. 825.3.b says the Signature cap and
the Unique cap are independent, so it is a **new row**, not a change to `copiesRule`. The sideboard
twin (`sideboardCopiesRule`, `src/build.ts:402`) has the same hole.

This is the #187 batch 19 shape again — that batch found `checkBuild` citing CR 403.3 where Tournament
Rules 403.3 was meant, and its standing lesson was *a rendered string is a site*. So is a missing row.

**Catalogue side: clean.** 766 entries scanned, 5 `uses` rows name a Unique card, **none at
`quantity > 1`**. CLAUDE.md already carries 825.3.a for Shurelya's Requiem. Only the code is behind.

---

## 3. FINDING — `806.4` / `.a` / `.b` are word-for-word `813.4` / `.a` / `.b`, and the Action half is cited zero

Proven by normalising the keyword name and comparing strings, not by eye:

```
806.4   vs 813.4  : identical after swapping the keyword name?  YES — word for word
806.4.a vs 813.4.a: identical after swapping the keyword name?  YES — word for word
806.4.b vs 813.4.b: identical after swapping the keyword name?  YES — word for word
806.3   vs 813.3  : no   (806.3 carries the Example inline; Reaction splits it out as 813.3.a)
```

| | Action | Reaction |
|---|---:|---:|
| the conditional grant | **806.4 — 0** | 813.4 — 4 |
| condition met only on the chain | **806.4.a — 0** | 813.4.a — 3 |
| undone at step 5 if it is not | **806.4.b — 0** | 813.4.b — 9 |

The machinery, in Riot's words:

> **813.4 / 806.4.** Some passive abilities may grant a card or ability [Reaction | Action] under
> certain conditions. The card or ability does not have the … keyword unless and until those
> circumstances are true.
>
> **.a.** Those conditions might only be fulfilled while the card or ability is on the chain. In such
> a case, it can still be played or activated at the appropriate timing as long as doing so could
> fulfill the conditions.
>
> **.b.** If the chain item does not fulfill the conditions by the time step 5: check legality has
> been reached, the actions taken while playing it are undone and it is returned to the zone it was
> played from if it is a card.

`.a` is the interesting half and the catalogue already leans on it for Reaction: **you may play on the
bet that the condition will be true by the legality check**, and `.b` is the refund if it is not —
which is 358.5's undo reached from the keyword side (CLAUDE.md: *"a failed legality check costs
nothing and a countered play costs everything"*).

**Why the Action half is empty, and it is structural rather than accidental.** Swept over all 936
corpus cards with the reminder-text parentheses stripped (the gloss on every keyword would otherwise
swamp the result): **zero cards grant `[Action]` or `[Reaction]` to another object at all.** The
conditional grants in the pool are the two that come from *keywords*, and both grant **Reaction**:

- **822.1.b** (cited 110) — Ambush is short for *"I may be played to a battlefield where you control
  Units"* **and** *"I have [Reaction] as long as I'm being played to a battlefield where you control
  Units."*
- **811.6** (cited 28) — *"A card that is Hidden gains Reaction while facedown or played from
  facedown…"*

And **813.1.b** (cited 49) is why no third case will ever appear: *"Reaction grants the corresponding
card or effect all abilities and permissions of Action."* Granting bare Action is strictly weaker than
granting Reaction, so nothing does it.

**Disposition: no entry site. 806.4 is dead letter in this pool and should stay at zero.** Its value
is as a refusal boundary — a future line claiming a conditional Action grant is refused on its face —
and it has one live consequence, below.

**The live consequence — an amendment candidate, not a new entry.** `806.5.a/.b/.c` and `813.5.a/.b/.c`
make *"has Action"* and *"has Reaction"* **separately** referenceable characteristics. The pool's one
card that reads either is `VEN-160 Mystic Vortex` — *"During showdowns here, cards with [Reaction]
cost :rb_rune_rainbow: more to play."* The entry
**`mystic-vortex-overt-operation-taxes-the-answer`** already covers this ground well: it cites 813.5,
811.6, 813.1.b and 358.4, and its `uses` note on `OGN-153` says *"It carries [Action] and NOT
[Reaction], which is exactly why the Vortex never sees it."*

What it does **not** say is the Ambush half. By 822.1.b an `[Ambush]` unit **has [Reaction] while it is
being played** to a battlefield where you control units — so **an Ambush unit played into a showdown at
the Vortex pays the tax**, on the same clause that makes a Hidden card pay it. Checked: no entry in the
catalogue cites 822.1.b alongside `VEN-160` (766 entries scanned; 4 name the Vortex, none mentions
Ambush). Suggested as one added `notable` on that entry, citing **822.1.b**; I have not edited it.

One caveat I am flagging rather than resolving: the Vortex's *"here"* could be read as scoping the
showdown's location or the played card's destination. The Ambush claim holds on **either** reading when
the showdown is at the Vortex, which is the case worth stating; a wider claim needs a walk.

---

## 4. FINDING — "X is a referenceable characteristic" is a **30-member family** and CLAUDE.md carries three

The single most reusable thing in this range. Swept for the exact phrase *"may be checked or
referenced by other Game Effects"* across the whole rules file (2,581 paragraphs split out):
**30 members.** One for **every keyword in the glossary**, plus `150.5` for the **Equipment tag**.

| cited by the catalogue (13) | cited zero (17) |
|---|---|
| 807.3 Assault (6) · 808.3 Deathknell (2) · 809.3 Deflect (5) · 811.5 Hidden (5) · 812.3 Legion (3) · 813.5.a/.b/.c Reaction (3/8/4) · 814.3 Shield (3) · 815.3 Tank (8) · 816.3 Temporary (9) · 817.3 Vision (2) · 819.3 Quick-Draw (3) · 820.4 Repeat (5) · 829.2 Flow (3) | **150.5 Equipment tag · 805.5 Accelerate · 806.5.a/.b/.c Action · 810.3 Ganking · 818.5 Equip · 821.3 Weaponmaster · 822.4 Ambush · 823.3 Hunt · 824.2 Level · 825.5 Unique · 826.6 Backline · 827.4 Empower · 828.2 Empowered** |

CLAUDE.md carries exactly three (807.3, 810.3, 815.3) and states the consequence once, for Assault.
**The durable statement is the family, not any member:** *"can a card read whether X has keyword K?"*
is answered **yes, by a dedicated paragraph, for every keyword in the game** — so it never needs
arguing, and `150.5` extends it to the Equipment **tag**, which pairs with the `133.8.a` line CLAUDE.md
added on 2026-09-13 (*tags have no innate rules meaning but may be referenced*).

This is the *"grep the rules for the PHRASE and see how many members its family has"* move that
CLAUDE.md names as reusable after the `"is not a subset of"` sweep. It paid again.

**Which members the pool actually exercises — and why the count is a FLOOR.** At least **eight**
keywords have a card that reads them: Hidden (4 cards), Temporary (5), Tank (2, incl. `VEN-004 Dune
Surfer`'s ignore), Deflect (2, both ignores), Flow (1, `VEN-098 Stargazer`), Reaction (1, `VEN-160`),
Assault (1, `SFD-028 Lucian, Gunslinger` — *"deal damage equal to my [Assault]"*), Repeat (1,
`SFD-211 Marai Spire` — *"friendly [Repeat] costs cost 1 Energy less"*).

It is a floor and not a count, for a reason worth carrying: **a card can read a keyword through the
STATE the keyword creates rather than by naming the keyword**, and no text predicate over the keyword
name can see that. `818.5` Equip is the worked case — no card says *"with [Equip]"*, yet
`azir-ascendant-steraks-gage-equipped-state-survives-inactive` is built entirely on `818.5.a`
(*"Whether or not a Gear has Equip may be referenced even if the Rules Text of the Gear is Inactive"*)
because four cards read the **Equipped** state that 818.3.c defines by it. `[Empowered]` is the same
shape: six cards read the Empowered **status** (441.2 / 442.1) — `VEN-035 Sanction`, `VEN-037`,
`VEN-059`, `VEN-072`, `VEN-127`, `VEN-130` — and none reads the 828 **dependent keyword**, so `828.2`
is genuinely unread while the concept is everywhere. Same family as CLAUDE.md's own warning that an
Equipment granting `[Hunt]` through its Effect half is invisible to a text-level sweep.

**Disposition: `818.5.a` is NOT a debt — one entry makes its argument and is named for it. The 17
zero-cited members are correctly absent individually; the FAMILY belongs in CLAUDE.md.**

---

## 5. FINDING — nothing in this pool removes a keyword (`801.3.b`, measured empty)

`801.3.b`, `801.3.b.1` and `801.3.b.2` are cited zero by the catalogue and zero by CLAUDE.md:

> **801.3.b.** Other effects may remove Keywords.
> **.b.1.** The effect that removed the Keyword will specify the duration it is removed.
> **.b.2.** If an effect that removes a Keyword does not specify a duration, the duration is as long
> as that Game Object remains on the Board or in its current Non-Board Zone.

Swept over all 936 cards for `lose | loses | remove | removes` followed by a bracketed keyword:
**zero hits.** The one `lose` in the pool is `SFD-202 Hostile Takeover`'s *"Lose control of that unit"*,
which is Control, not a keyword.

**So the pool's only way to neutralise a keyword is to IGNORE it**, which 764–767 make *scoped and
one-way* — CLAUDE.md already carries this from `VEN-004 Dune Surfer` (767: an ignored ability is
Inactive **only** for the named procedure and **only** for the named players, so the same board keeps
walling your opponent). `801.3.b` is the paragraph that would have made a real removal possible, and it
has no card. **A refusal boundary: any future line claiming to strip a keyword is refused on its face.**

---

## 6. Citation upgrades — small, real, and none of them new lines

- **`810.1.c.2` — "It does not have an activation cost."** Cited zero, beside `810.1.c.3`'s 115.
  CLAUDE.md derives *"a move by effect goes battlefield to battlefield with no [Ganking] and moves
  exhausted units"* from 420.3.a alone (the exhaust sits on the Standard Move). 810.1.c.2 is the other
  half from the keyword side: **Ganking itself is free.** `810.1.c.1` (*"does not restrict or remove
  options"*) is its companion.
- **`827.1.c.2` — "Empower costs may include both resource costs and non-resource costs."** Cited zero.
  This is the authorisation under a measurement CLAUDE.md already carries: the five `[Empower]` costs
  that pay neither Energy nor Power (`VEN-110 Mel` discards a spell, `VEN-054` and `VEN-087` exhaust,
  `VEN-007` discards 1, `VEN-124` kills a friendly unit). `829.1.c.2` is the identical sentence for Flow.
- **`806.1.a` / `813.1.a` — the keyword may sit on a Rune Ability.** Both cited zero. CLAUDE.md's
  444.2.c finding leans on *"164.2 gives every Basic Rune TWO abilities and BOTH carry [Reaction]"*;
  813.1.a is the paragraph saying a Rune Ability may carry it at all. A one-word note, not a finding.
  (`813.3` names *"the Card, Rune, or Effect"* where `806.3` says *"the corresponding card or effect"* —
  a phrasing difference only; both `.1.a` paragraphs list Rune Abilities, so nothing turns on it.)

---

## 7. Read and returned empty — recorded so nobody reads them twice

- **`829.1.c.3`** — *"If a spell has multiple instances of the Flow keyword with different costs, its
  controller may choose which cost to apply."* Swept: **17 Flow printings, none with two instances.**
  Dead letter.
- **`827.1.c.4`** (*"Empower abilities may include text that alters the timing"*) and **`818.1.c.5`**
  (*"Equip abilities may include text that alters the timing or targeting"*). Swept: **zero** Equip
  clause carries `[Action]`/`[Reaction]`, and the two Empower candidates (`VEN-075 Platewyrm Egg`,
  `VEN-139 Rogue Assassin`) are false positives — the keyword there introduces the *next* ability
  across a `[>]` marker, not the Empower. The nearest real thing is `[Quick-Draw]`, which is its own
  keyword (819.1.c, *"allows cards to be played and Attached using Reaction timing"*), not 818.1.c.5 text.
- **`811.6.a`** — *"The property is granted to the card in its facedown state, and is not publicly
  known."* Sits beside `811.6`'s 28 citations. An information-level note only, and a slightly odd one,
  since 811.6 gives Reaction to *every* facedown card and the property is therefore inferable; what is
  private is the card's identity (107.3.f, already carried). No entry site.
- **`821.1.d`** — multiple Weaponmaster instances choosing the **same** target resolve separately.
  CLAUDE.md already carries `821.1.c.7` for the *different*-target case. A one-line completion at most.
- **`822.3.a`**, **`826.1`/`.2`/`.6`**, **`828.1.a`/`.b`**, **`824.1.a`/`.b`**, **`801.1`/`.2`/`.2.a`**
  and the long tail: **format boilerplate and scope statements.** "It is present on Units", "It is
  formatted as `Shield [X]`", "The X is referred to as the Shield Value", "The color of the highlight
  has no effect on gameplay". Correctly absent under #204 — no entry makes an argument they authorise,
  and their operative children are cited (`815.1.b` 54, `810.1.c.3` 115, `824.1.d` 102, `826.5` 5).

**That tail is the honest headline of the slice: of 102 uncited headings, roughly 85 are boilerplate.**
The brief predicted a low yield and the prediction was right.

---

## 8. Method notes — my own instrument failed three times, all caught by a second instrument

Recorded because each is the shape this project keeps paying for.

1. **`Action` is a substring of `Reaction`.** A first sweep for cards mentioning `[Action]` returned
   the identical row set as the `[Reaction]` sweep, which is what exposed it. Fixed with `(?<!Re)`.
2. **A card-level exclusion applied to a multi-clause card.** The token-minting filter (*"play a …
   token with [K]"*, which is 184.3 granting a keyword at creation, not reading one) was applied to the
   whole card, so `UNL-189 Bashful Bloom` lost its genuine read (*"costs 1 less for each friendly unit
   with [Temporary]"*) to its own mint clause. Exclusions belong per **match**, not per card.
3. **The reader census was short twice, and the citation record caught it.** It reported *"6 of 25
   keywords have a card reader"*. Cross-checking against which family members the catalogue cites
   surfaced `807.3 Assault` at 6 citations with no reader — which was wrong: `SFD-028 Lucian,
   Gunslinger` reads it as *"damage equal to my [Assault]"*, a **numeric** read my selector-verb
   predicate could not see. `SFD-211 Marai Spire` and the Equipped-state case followed. **I was one
   step from reporting a correction to a CLAUDE.md sentence that is sound.** The cross-check found my
   instrument, not their work — which is the argument for running two.

The reader census in §4 is therefore stated as a **floor with its predicate named**, not as a count.

---

## 9. Handoff

**The 801–829 vein is worked out at the sub-paragraph level.** 218 of 320 headings cited, 4,886
citations, and the uncited residue is ~85 boilerplate lines plus the items disposed of above. Nobody
should re-run the orphan-neighbour probe on this range.

Still open for whoever wants it:

- **`806.5`, `813.5`, `815.3` and the other 27 family members** are one CLAUDE.md bullet, not 30 —
  the manager owns that file.
- **The `825` Unique row in `checkBuild`** is the only actionable code item, and it wants its own issue.
- The **Mystic Vortex × `822.1.b`** notable on `mystic-vortex-overt-operation-taxes-the-answer`.
- **`150.5`** (the Equipment *tag* as a referenceable characteristic) sits outside this range and is
  cited zero; it belongs with the `133.8` tag work rather than here.
