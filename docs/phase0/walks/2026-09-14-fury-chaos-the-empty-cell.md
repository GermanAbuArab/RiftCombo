# Fury/Chaos is the one legend pair with no spanning finisher, and the pool made it that way

Issue #200, lane rc-synth4, 2026-09-14. Constructed, Duel (485). Rules version 2026-07-16, opened in
`data/Riftbound-Core-Rules-2026-07-16.txt`; card text verbatim from `data/corpus_flat.txt`.
Catalogue at 766 entries. Every number below carries its predicate; the rules do not rot and the
counts do.

The brief was to re-derive the spanning axis rather than inherit it, then ask **which settled
mechanism this pair can reach that it has not.** The axis re-derives. The pair's answer is a
refusal, and the refusal has three independent mechanisms behind it, each of which is a fact about
the printed pool rather than about anybody's authoring.

---

## 1. The axis, re-derived

Counting a legend pair's finishers by what is AVAILABLE — every card's domains inside the pair —
flatters, because an entry can be available to a pair while using only one half of it. Counted three
ways instead:

- **AVAILABLE** — every `uses` card's domains are a subset of the pair.
- **SPANS BOTH** — the entry actually uses a card of each domain.
- and then whatever survives a stall.

Non-vacuity, printed by `.scratch-synth4/spanning.mjs` before any count: 1,189 printings folded to
1,042 bases, 766 entries, 1,898 `uses` rows, **0 unresolved against `cards.json`**, 15 pairs.
Finisher classes are INFINITE, BURST, CHAIN and ALT_WIN.

| pair | legend names | AVAILABLE | SPANS BOTH |
|---|---:|---:|---:|
| **fury/chaos** | 5 | **2** | **0** |
| calm/body | 4 | 4 | 1 |
| mind/chaos | 4 | 11 | 1 |
| body/chaos | 3 | 4 | 2 |
| calm/chaos | 3 | 5 | 2 |
| body/order | 5 | 7 | 2 |
| fury/mind | 3 | 13 | 3 |
| mind/body | 1 | 13 | 3 |
| fury/body | 4 | 6 | 4 |
| fury/order | 3 | 9 | 4 |
| chaos/order | 1 | 9 | 4 |
| calm/order | 4 | 11 | 5 |
| fury/calm | 1 | 10 | 7 |
| calm/mind | 4 | 19 | 8 |
| mind/order | 4 | 29 | 16 |

`CLAUDE.md` records chaos/fury and chaos/mind as the two empty cells, measured at 763. **mind/chaos
has since been filled** (`gutter-palace-keeper-time-warp`). Fury/chaos is now the only zero, and its
two available finishers are `tryndamere-brambleback-conquer` (mono-**fury**) and
`spiderling-swarm-grand-plaza` (mono-**chaos**) — the pair owns one finisher from each half and
nothing that uses both.

## 2. What the pair can pay with, swept before asking what it can do

Predicate `score [0-9a-z]+ point|gains? [0-9a-z]+ point|win the game` over `corpus_flat.txt` returns
**17 rows**; one of them, `OGN-276 Aspirant's Climb`, *raises* the Victory Score rather than gaining
a point, and is banned in both formats. Filtered by 103.1.b to a Fury/Chaos legend, the budget is
**three cards plus two colourless**:

| card | domain | gate |
|---|---|---|
| `OGN-034 Tryndamere, Barbarian` (E7 P2 M8) | fury | *"When I conquer **after an attack**, if you assigned 5 or more excess damage…"* |
| `OGN-205 Yasuo, Windrider` (E5 P1 M4) | chaos | *"The third time I move in a turn…"* |
| `SFD-148 Draven, Audacious` (E6 P1 M6) | chaos | *"The first time I **win a combat** each turn…"* |
| `OGN-293 The Grand Plaza` | colourless | hold with 7+ units here |
| `SFD-214 Power Nexus` | colourless | hold, then pay 4 rainbow |

That is a wider budget than body/order (one card, refused at five points) and than body/calm. The
cell is not empty for want of points.

## 3. Mechanism 1 — the multiplier and the points are in different TRIGGER FAMILIES

Fury owns two of the catalogue's settled multipliers and both act on the same family:

- `UNL-029 Red Brambleback` (fury) — *"Your conquer effects for conquering here trigger an
  additional time."*
- `SFD-030 Skyfall of Areion` (fury) — *"My hold effects are also conquer effects, and vice versa."*

Both read **conquer effects and hold effects**. Chaos's two point cards trigger on a **move** and on
a **combat win**, and 383.4.c.3 / 383.4.d.3 are the paragraphs that name what a Conquer Effect and a
Hold Effect are — neither clause is one. So no Fury multiplier can reach a Chaos point, ever.

The catalogue shows this without having stated it. `UNL-029` is in **13 entries**, and folded by the
partner point card they run, it has been paired with a point source in **calm** (`VEN-046 Nasus`),
**mind** (`VEN-065 Swain`), **order** (`UNL-177 Ivern`) and **body** (`SFD-115 Trinity Force`) —
**every domain except chaos.** The one fury/chaos Brambleback entry that exists, `cull-brambleback-gold`,
multiplies `SFD-134 Cull`, whose conquer effect makes a Gold token and scores nothing.

## 4. Mechanism 2 — every card that spans the pair by itself is catalogued as an ENGINE

The pool prints **ten Fury/Chaos dual-domain printings** (seven distinct names plus legend reprints),
measured over `cards.json`: `OGN-251 / OGN-301 Loose Cannon`, `OGN-252 Super Mega Death Rocket!`,
`OGS-017 Dark Child`, `OGS-018 Tibbers`, `SFD-185 / SFD-242 Glorious Executioner`,
`SFD-186 Spinning Axe`, `UNL-185 / UNL-228 Bloodharbor Ripper`, `UNL-186 Death from Below`,
`VEN-143 / VEN-191 Master of Shadows`, `VEN-144 Death Mark`.

**Every one of the ten that is catalogued at all is catalogued only in ENGINE entries. Zero appear
in any finisher of any class.** Four printings are in no entry at all, and all four are alt-art or
reprint rows of a name that is (`OGN-301`, `SFD-242`, `UNL-228`, `VEN-191`).

## 5. Mechanism 3 — Fury's point and Chaos's point cannot share one attack, and the opponent is the one who decides

This is the sharpest of the three, because it is the combination anyone would try first: attack an
enemy garrison with Tryndamere and Draven together, win, and collect both.

- Tryndamere's gate needs a **real damage step**. R28 = A makes excess damage attacking Might that
  was never assigned, and 465.2.c.4 is what leaves any: *"Units cannot have more damage assigned to
  them than the minimum required to constitute lethal damage unless no further units remain to have
  damage assigned to them."* A bloodless win assigns nothing, so excess is zero — `CLAUDE.md` already
  records that the removal-conquer family and the excess family are mutually exclusive in principle.
- A real damage step means the defender assigns too. **465.2.c**: *"Starting with the Attacker, each
  player assigns an amount of damage equal to their summed Might among the other's Units."* **The
  opponent chooses which of your bodies takes it**, and 465.2.c.3 forces lethal onto one unit in full
  before moving to the next.
- Draven's gate needs him **alive at the end of it**. **466.3.c**: *"Units at this battlefield
  inherit the same combat result as their controllers"*, and 466.3 is step 1 of the Combat Cleanup,
  after 465.2.c.1.a has dealt all damage simultaneously. A Draven killed in the damage step is not at
  the battlefield to inherit the win.
- And his death clause pays the other way: *"When I die in combat, choose an opponent. They score 1
  point."*

So the very thing Tryndamere's clause requires — a garrison large enough to be worth assigning
damage into — is the thing that hands the opponent a free choice of which Draven to remove from the
count, at a profit. **The two point cards of this identity are gated on opposite outcomes of the same
damage step.**

## 6. Refusals, with the arithmetic

**Draven does not improve the Brambleback BURST.** `tryndamere-brambleback-conquer` is
`1 + T × (1 + K)` with T Tryndamere and K Bramblebacks; at T=2, K=3 it is **9 points for E26 + 7
Power**. Substituting Draven in: T=2, K=2, D=1 gives `1 + 2×3 + 1` = **8 points for E28 + 7 Power**,
and T=1, K=3, D=3 gives **8 for E37 + 8 Power**. Every substitution is more Energy for fewer points,
because the Brambleback multiplies Tryndamere by four and cannot see Draven at all (§3).

**`OGN-173 Ride the Wind` buys no turn the instrument can see.** It is the one thing Chaos supplies
that Fury cannot supply itself: 449 with 449.1 makes an effect move carry only its own restrictions,
420.3.a puts the exhaust on the **Standard** Move alone, and 464.2.c.3 designates an Attacking Unit
with no readiness filter — so it moves an **exhausted** Tryndamere into an attack the turn he is
played, and battlefield-to-battlefield with no [Ganking]. Measured rather than argued: a probe entry
identical to `tryndamere-brambleback-conquer` plus one `OGN-173`, priced in a throwaway worktree,
reads **T7 against the same T7** — because #205's narrowing already drops the readiness `+1` for a
payoff that fires in the Main Phase, so there was never a turn there to save. The saving is real in a
game where Tryndamere is drawn late, and that is a property of the LIST rather than of the line,
which is exactly what `CLAUDE.md` says the clock should not model. `.scratch/have.mjs OGN-034 OGN-173`
returns nothing, so it is uncatalogued — and it should stay that way.

**The Plaza route is already served and the Fury protection adds nothing to it.**
`spiderling-swarm-grand-plaza` is mono-chaos, and `VEN-097 Spiderling` prints *"I have +1 :rb_might:
for each other unit you control here with my name"* — seven of them are **Might 7 each**, so
`OGN-133 Flurry of Blades` does not touch the line and `VEN-018 Rage Amplifier` (fury, the identity's
board-wide +1) buys nothing. The entry states this itself.

**`SFD-214 Power Nexus` is available to the pair after all, and a shipped play says it is not.**
`docs/plays/2026-09-12-chaos-fury-yasuo-shuttle.md` lists it as needing *"4 rainbow Power banked
before the Hold trigger finalizes (383.3.b.1), which in this pool means `UNL-087 Blue Sentinel`'s Add
— and that is **Mind**"*, and concludes the card is *"illegal in the identity"*. **444.2.c** refutes
it: *"Players may activate abilities that Add resources with the Reaction keyword at any time that
they are instructed to Pay resources. Those abilities finalize and resolve immediately, ignoring
normal restrictions"*, and **164.2** gives every Basic Rune two abilities that both carry [Reaction],
the second of which costs the **recycle** rather than an exhaust. The four rainbow comes out of runes
in any identity. This is `CLAUDE.md`'s #200 batch-4 finding landing on a document written the day
before it; the play predates it. **The play's thesis survives** — Power Nexus is Hold-gated, so an
opponent switches it off by taking the battlefield, which is the property the play was really about —
**but the row's stated reason is wrong and is a correction the manager owns.**

## 7. What the pair CAN reach, and it is a lever rather than a finisher

The one settled mechanism fury/chaos can reach and has not is **excess-damage manipulation from the
defender's side**, which the catalogue holds only in fury/mind.

`tryndamere-thousand-tailed-watcher-shrink` uses `OGN-116 Thousand-Tailed Watcher` — **Mind**, E7 + 1
Mind Power — to give every enemy unit −3 Might. Under a Fury/Chaos legend that card is illegal by
103.1.b. The Chaos member of the same family is not a shrink but a **removal**:

`UNL-124 Isolate` (chaos, **E2, no Power**) — *"Move an enemy unit from a battlefield to its base.
Then, if there's an enemy unit alone at that battlefield, draw 1."*

Three things make it worth an entry rather than a note:

1. **Removing beats killing, for this threshold and only this one.** A killed defender still eats its
   whole Might out of your assignment under 465.2.c.4; a moved one eats nothing, because 465.2.b sums
   *"the Might of all Defending Units"* and it is no longer one. Every excess lever catalogued until
   now either shrank the defender or enlarged the attacker; this one deletes a term from the sum.
2. **The lever has a floor, and the floor bites twice.** 465.1: *"If both Attacking and Defending
   units remain at this battlefield, the following Tasks become Outstanding"* — empty the garrison and
   no damage is ever assigned, so excess is zero. Independently, 323.6 strips their Control the instant
   their last body leaves, after which 344.2 opens a **Showdown** rather than a Combat and 323.9 stages
   no Combat at all — so Tryndamere never gains the Attacker designation and his *"after an attack"*
   has nothing to read. **Leave exactly one defender, and its Might must be 3 or less.**
3. **The card replaces itself precisely when it is played correctly.** 740.2.a: *"A unit is alone when
   there are no other friendly units at the same location"* — friendly to the remaining defender. The
   floor requires exactly one defender left standing, which is the board the rider asks for. The draw
   is guaranteed by the constraint the line already obeys.

The worked number, so a reader can refute it in one line: a garrison of one Might-5 and one Might-3 is
summed Might 8. Tryndamere alone assigns all eight, kills both, wins and Conquers for **one** point
with excess zero. Isolate the Might-5 first and the sum is 3: he assigns three, keeps five, and the
identical attack pays **two**. Two Energy and no Power bought the second point, and the rider drew the
card back.

Staged as `tryndamere-isolate-excess-lever`, **ENGINE** — 470 caps Scoring once per battlefield per
turn and 485.4 puts two on a Duel table, and 103.2.b caps a spell that does not return at three
copies. **It does not fill the finisher cell and is not offered as doing so.**

The sequencing is forced rather than chosen, which is the half most likely to be got wrong at a
table: `UNL-124` carries neither [Action] nor [Reaction], so **155** confines it to *"an Open State
outside of Showdowns on its controller's turn"*, and after Tryndamere moves in there is no such
window — 323.9 stages the Combat at the very next Cleanup and 323.13 opens it. Cast it before the
move or not at all. That is the #58 evacuation sequencing rule arriving on a line that is not an
evacuation.

## 8. Method notes

- **The emphasis guard caught me committing the defect I had repaired that morning.** The staged
  entry wrote `'when I conquer AFTER AN ATTACK'` — shouting inside a quotation of card text, which is
  the #202 class exactly — and `test/prose-emphasis.test.ts` failed it by name on the first full run.
  I had spent the previous hour repairing the identical shape in the plays corpus. **A guard written
  by somebody else, for a different corpus, is worth more than one's own recent memory of the rule.**
- **Validate a staged entry by merging it in a throwaway worktree and running the real suite**, not
  by reading the schema. 672 tests passed with it in; the one that failed was the one I could not have
  predicted.
- **The turn clock answered the only question I could not settle by arithmetic**, and it answered
  "no". A probe entry in a worktree costs two minutes and is the difference between shipping a
  plausible improvement and refusing a measured one.
- **`OGN-116 Thousand-Tailed Watcher` is Mind, not Chaos.** I nearly wrote the opposite from the shape
  of the entry's name; the corpus row settles it and the whole §7 argument turns on it.

## 9. What is open

1. **The manager owns the `2026-09-12-chaos-fury-yasuo-shuttle.md` Power Nexus row** (§6). It is a
   claim change, not a typo, and the play is not this lane's path.
2. **Nobody has asked the spanning question of the ENGINE class.** This lane measured spanning over
   the 80 finishers only. 686 of 766 entries are ENGINEs and the axis has never been pointed at them;
   §4's "all ten dual cards are ENGINEs" is a hint that the answer there is different in kind.
3. **`SFD-129 Temptation` as a second lever** (chaos, E2, [Repeat] E2, so E4 moves two bodies and
   820.2.a lets the second pick a different target) is noted on the staged entry and not walked. Its
   destination clause — *"to a location where there's a unit with the same controller"* — makes it
   conditional on the opponent's board in a way Isolate is not, and pricing that properly is a walk of
   its own.

---

## 10. The axis audited against itself, and the ENGINE class measured for the first time

Written after §1-§9, because the sample in §4 turned up an entry that "spanned" fury/chaos on the
strength of a single card holding both domains. If that card is a **legend**, the entry is a
mono-domain line wearing a two-domain hat: every deck has a legend, it costs no Main Deck slot, and
**all 127 legend printings in `cards.json` have exactly two domains** (measured; none has one or
three). **115 entries name a legend card in `uses`.** So the axis had a structural confound and
nobody had sized it.

Three definitions, run over the whole catalogue at 767 entries on 2026-09-14:

- **A** — the union of every `uses` card's domains contains both. (What §1 used, and what `CLAUDE.md`
  describes.)
- **B** — the union of the **non-legend** `uses` cards contains both.
- **C** — two **distinct** non-legend cards supply the halves, so no single dual card does all the work.

| class | available (pair,entry) cells | A | B | C |
|---|---:|---:|---:|---:|
| FINISHER (n=80) | 152 | **62** | **61** | **61** |
| ENGINE (n=687) | 2,089 | **344** | **293** | **284** |

**For finishers the confound is worth exactly ONE row, and the axis this project has been using
holds.** For engines it is 60 cells, **17%**, which is worth knowing before anybody quotes an engine
spanning count.

**And one entry carries the entire confound, in both directions.** The single finisher that spans
only on its legend is `yasuo-windrider-ride-the-wind-chain`: its non-legend cards are
`OGN-205 Yasuo, Windrider` and `OGN-173 Ride the Wind`, **both mono-chaos**, and it reads calm/chaos
only because `OGN-259 Unforgiven` is. Swept for the mirror — finishers excluded from a pair *only*
by a legend row, which would mean the availability count is understating a pair — the answer across
all 15 pairs is **four cells and they are the same entry**, in fury/chaos, mind/chaos, body/chaos and
chaos/order.

**The exclusion is correct, which is why this is an audit result and not a defect.** That legend is
load-bearing: `OGN-259` reads *"2 Energy, exhaust: Move a friendly unit to or from its base"*, which
is one of Yasuo's three moves, free, every turn — and
`docs/plays/2026-09-12-chaos-fury-yasuo-shuttle.md` already walks what a Fury/Chaos deck pays instead
(a card, `OGN-173`, per Yasuo per turn). The play knew; the axis did not; the two agree once the axis
is asked the right question.

### What this does to §1's conclusion: nothing, and that is the point

**fury/chaos is zero under A, B and C alike.** And on the engine side it is not merely non-empty, it
is the **largest** spanning count of any pair under all three definitions — **52 / 45 / 45**, against
`fury/calm`'s 4 / 4 / 4 at the other end.

So the pair with no spanning finisher is **the most cross-explored pair in the catalogue at the
engine level.** Whatever is stopping a fury/chaos finisher, it is not that nobody has combined those
two domains: 45 entries do it, more than for any other pair. That is an independent confirmation of
§3-§5 from a direction none of them used.

### A correction I owe my own first reading

Seeing fury/chaos at the top of the engine column and the bottom of the finisher column, and
`fury/calm` at the opposite corner of both, I read it as an inversion and nearly wrote it down.
**Spearman rho between the two span RATES, over the 14 pairs with at least four available finishers,
is 0.15 — no relationship at all.** Two corners are not a trend, and `mind/order` sits high in both
(38 engines, 16 finishers) which the inversion story cannot accommodate. What survives is the single
cell, not a law about the table.

What *does* explain the engine column is the pool rather than the authors: folded by pair, the
non-legend dual-domain card count predicts the engine span rate monotonically in the means — 1 dual
card gives 4%, 7%, 9%; three give 9-16%; four give 14-23%; five and six give 15-35%. **fury/chaos at
35% is the clear outlier above that line**, which is the same finding as the paragraph above, reached
from the supply side.

### Dating, because the tree moved underneath this

The catalogue went from **766 to 767 entries mid-session** while the manager merged, and the
fury/chaos engine count went 51 → 52 between two runs twenty minutes apart. §1-§9 are measured at
766 and this section at 767; neither is wrong and both are dated. **This is a characterisation, not a
correctness property, so it gets a date and its denominators rather than a test** — pinning "the
confound is worth one row" would fail the day somebody writes a second entry that names a dual legend
and uses one domain, which is a legal thing to write.

---

## 11. "Spans both domains" is not the same question for an ENGINE, and the table in §10 should not be read as a gap-finder

§10 ported the finisher question to the ENGINE class unchanged. That was the wrong move and the
distribution says so. **An ENGINE's claim is a RATE and a finisher's is a QUANTITY**, and the objects
they are made of differ accordingly.

Measured at 767 entries, counting **non-legend** `uses` cards:

| class | spans | n | median cards | distribution |
|---|---|---:|---:|---|
| ENGINE | spans two domains | 293 | **2** | 1:7 **2:198** 3:64 4:21 5:3 |
| ENGINE | mono-domain | 394 | 2 | 0:1 1:51 2:275 3:60 4:7 |
| FINISHER | spans two domains | 61 | **3** | 2:6 **3:28** 4:14 5:8 6:2 7:1 8:1 11:1 |
| FINISHER | mono-domain | 19 | 2 | 1:1 2:9 3:4 4:4 5:1 |

**Sixty-nine per cent of ENGINEs are two-card entries, against nineteen per cent of finishers** (473
of 687 against 15 of 80). And **198 of the 293 spanning ENGINEs — 68% — are exactly two cards.**

So for two thirds of them, *"this entry spans fury and chaos"* means nothing more than *"one of these
two cards is fury and the other is chaos."* That is a fact about which pair of cards an author
happened to write down. For a finisher, whose median spanning entry is three cards and whose tail
runs to eleven, the same word means a **line recruiting both halves of an identity** — which is what
the axis was built to detect. **Same word, two different questions, and only one of them is about
design.**

A second cut says the same thing from the role side. Asking whether the two domains occupy
**disjoint** roles — a directed exchange, one domain supplying the repeatable part and the other the
payoff — the spanning ENGINEs are **56% disjoint** and the spanning finishers only **44%**. Engines
are *more* often a clean two-role exchange, because most of them are an anchor and a partner and
nothing else. `CLAUDE.md` already records the shape from the other end, in this project's own words
rather than the rulebook's, as a finding of the orphan-synergy walk: *"a synergy rule is an
anchor+partner VALUE EXCHANGE, while every INFINITE / BURST / CHAIN / ALT_WIN stands on a
three-to-five-card LINE — a different object."* This is that sentence measured.

### The consequence, which is a refusal to build something

**Do not port the spanning axis to the ENGINE class as a gap-finder.** Counting spanning engines per
legend pair measures how many cross-domain CARD PAIRS somebody has written, which is a coverage
statistic — and this project already has a purpose-built instrument for exactly that, the synergy
matrix of #161, which folds coverage from every `partnersOf` pair *and* every entry card set and is
keyed on the anchor rather than on an accident of domains. The axis would be a worse duplicate of it,
and `CLAUDE.md` already records the trap that instrument taught: *"a high uncovered-partner count is
a warning flag, not a prize"*, because such a column ranks predicate width rather than opportunity.

**What the ENGINE measurement IS good for is the single use §10 made of it: a CONTROL on a finisher
null.** *"fury/chaos has 45 spanning engines and zero spanning finishers"* is worth saying precisely
because it rules out neglect — and that argument needs **one number for one pair**, not a table of
fifteen. Read §10's engine column that way and nothing else.

### The small cells, read as instructed, and the one defect in them

18 of the 37 role-exchange cells hold two entries or fewer, covering 20 entries; all were printed and
read. Nineteen are legitimate multi-card engines whose rarity is an artifact of keying on a role
*vector*, which has high cardinality by construction — `jhin-relentless-pursuit-wallop`,
`lucian-skyfinity-double-conquer`, `malzahar-gate-sprite-fountain-power` and the rest are ordinary
entries that happen to have a unique role signature.

**The twentieth was a real defect and it sat in a cell of size one.** A shape reading
`engine <-> multiplier` is impossible, because `multiplier` is not a member of `IngredientRole`
(`src/types.ts:62`). Swept: **three `uses` rows carry it** —
`swain-brambleback-conquer-burst` and `swain-bard-brambleback-double-conquer-chain` on `UNL-029`, and
`undercover-agent-karthus-empty-hand-draw` on `OGN-236` — and nothing validates the field, so they
arrived through the unchecked cast `src/load.ts` performs.

This is the **fourth** member of a family `src/types.ts` documents three times in its own docblocks:
`ZONES` became a runtime list because `ATTACHED` was undeclared on 24 rows, `SOURCE_KINDS` because
`video` sat in the catalogue 54 times, `COMBO_KEYS` because a top-level `notable` was inert and
invisible. The rule is written three lines above the field that still lacks it. **And it reaches a
reader**: `web/main.ts:852` renders `u.role` straight into the route card's sub-line.

The catalogue settles the repair without anybody's taste entering it. Role convention across every
entry using the pool's three trigger multipliers: `UNL-029 Red Brambleback` 13 entries, engine 11 /
multiplier 2; `UNL-087 Blue Sentinel` 20 entries, **engine 20 / multiplier 0**; `OGN-236 Karthus,
Eternal` 11 entries, engine 10 / multiplier 1. **Forty-one rows to three, and the most-used of the
three is `engine` in all twenty** — so `multiplier` is a typo three times over rather than a category
the catalogue wanted. Normalise to `engine` and make `IngredientRole` a runtime list like its three
siblings. Reported to the manager, who owns both files.

**The method note is the durable half, and it is the manager's instruction paying on its first
outing: measure the distribution before writing the predicate, and read every small cell.** The
defect was not something a predicate would have been pointed at — it was a cell of size one in a
cross-tab built to answer an entirely different question.

---

## 12. The close: the one identity that owns both credential cards is the one identity where they cannot be combined

`npm run adversarial -- --stalled` sorts every finisher by the board it needs, and its **ATTACK**
bucket carries the label this project uses for the shape a finisher should have: *"ALIVE WHERE THE
CURVE STALLS. The printed text needs the Attacker designation, which 807.1.d and 323.9 make
impossible without an enemy garrison. Dead on an empty board, alive on a contested one."*

The bucket holds **eight** rows, and the script flags four of them itself: `gemdragon-henge-vi-blind-fury`,
`reveler-svellsongur-jhin-infinite-power`, `threshold-reveler-infinite-energy` and
`twilight-reveler-eye-facebreaker-recruits` are INFINITEs that **score nothing** — they make fuel, and
the board question belongs to whatever consumes it. `CLAUDE.md` already notes those four are Twilight
Reveler loops; the refinement is that subtracting them leaves the class smaller than the bucket
suggests.

**Four finishers both SCORE and have the shape**, and they stand on exactly **two** printed cards:

| entry | identity | the card that gates it |
|---|---|---|
| `tryndamere-brambleback-conquer` | fury | `OGN-034 Tryndamere` — *"excess damage"* |
| `tryndamere-svellsongur-excess-burst` | calm/fury | `OGN-034 Tryndamere` — *"excess damage"* |
| `draven-svellsongur-bloodless-combat-burst` | calm/chaos | `SFD-148 Draven` — *"win a combat"* |
| `draven-yasuo-battle-mistress-contested-chain` | body/chaos | `SFD-148 Draven` — *"win a combat"* |

**A FIFTH FINISHER STANDS ON A CREDENTIAL CARD AND IS NOT IN THAT BUCKET, WHICH IS THE CLASSIFIER
BEING RIGHT AND MY READING OF IT BEING INCOMPLETE (amended 2026-09-14 by its own author).**
`ivern-arena-draven-chaos-order-chain` runs `SFD-148` and lands in **HOLD**, because `--stalled`
assigns ONE bucket per row and `UNL-177 Ivern`'s hold-or-conquer half wins its precedence — and the
script prints the rider itself: *"payoff is Reckoner's Arena, 'when you hold here' **[+ an attack leg
too - read it]**"*. `CLAUDE.md` records that precedence problem in general terms, that a classifier
assigning one bucket to a mixed object is wrong in whichever direction its precedence leans; this is
that, and the instrument names both legs rather than flattening them. **So the honest count is FIVE
finishers on the two cards, of which four are bucketed ATTACK and the fifth is a genuinely mixed row.
The claim below is unaffected and is the one that matters.**

**And that is the pool rather than the authoring.** Swept over `corpus_flat.txt` for a card that gains
a point and whose gate names an attack or a combat win, the answer is **two rows and they are those
two cards**. Every other point source in the game is gated on a hold, a conquer, or your own board —
things the opponent can deny by declining to present a garrison, or that pay you anyway when they do
not.

`OGN-034` is mono-**fury**. `SFD-148` is mono-**chaos**. So 103.1.b admits exactly one legend pair
that can run both, and the five Fury/Chaos names — Loose Cannon, Dark Child, Glorious Executioner,
Bloodharbor Ripper, Master of Shadows — are the only legends in the game under which the catalogue's
two credential cards may sit in the same deck.

**They cannot be combined, and this walk has already shown why twice over.** §5: their gates are
opposite outcomes of the same damage step — Tryndamere needs a real assignment to leave five excess,
which is exactly the assignment that lets the **opponent choose** (465.2.c) which of your bodies dies,
and 466.3.c gives the combat result only to *"units at this battlefield"*, so a Draven killed there
cannot inherit the win and his own death clause pays them a point instead. §3: Fury's two multipliers
read conquer effects and hold effects, and Draven's clause is neither, so nothing in the identity can
scale him.

So the identity whose every point source is a credential — the property `CLAUDE.md` catalogued as
**chaos/fury's weakness** and which the turn clock later showed is the property that makes a finisher
worth its slot — is the identity that cannot put two of them on one board. **The empty cell is not an
oversight in the catalogue. It is where two cards the pool printed in different domains meet a rule
that keeps them apart, and the pair that owns both is the only pair that ever had to care.**
