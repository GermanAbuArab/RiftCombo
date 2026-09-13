# The body-precondition class, finished — and the rule that makes half of it mechanical (rc-gap2, 2026-09-13)

My predecessor left 44 of predicate C's 50 rows unread and ranked finishing them first. **All 50 are
now disposed**, and reading them produced something better than the list: **[Ambush] is a
rules-grounded version of the same predicate**, and it needs no prose at all.

Companion documents: `2026-09-13-uses-requirement-gap.md` (predicates A–F and the class itself),
`2026-09-13-rc-gap-handoff.md`. Probes are in `.scratch-gap/` (gitignored, on disk):
`pre2.mjs` (predicate C), `c-read.mjs` (full context per row), `dump.mjs` / `dumpb.mjs` (entry prose),
`verify-c.mjs` (the second measurement).

---

## 1. THE FINDING: 822.1.b IS CITED 108 TIMES AND 822.3 — THE PARAGRAPH THAT ENFORCES IT — THREE

**822.1.b**, pasted: *"It is functionally short for "I may be played to a battlefield where you control
Units" and "I have [Reaction] as long as I'm being played to a battlefield where you control Units.""*

**822.3**, pasted, and cited by three of 766 entries: *"If there are no units at the location chosen
before Finalization completes for any reason, then it is no longer a valid location by Ambush's
reasoning and cannot be played there"*, with **822.3.a** (cited zero): *"Other effects and permissions
may still enable this Unit to be able to be played to the selected location, but Ambush's permission
will not be valid."*

So **an [Ambush] play requires a friendly body already standing at the target battlefield, and the
Ambusher can never be that body** — 822.1.c makes the keyword add a location *option* during the Make
Relevant Choices step, i.e. while the unit is still a Chain Item and not yet on the board. That is a
body requirement stated by a RULE rather than by an author, which is exactly the property the handoff
ranks above every prose predicate.

**Three things follow that no entry in this catalogue states.**

**(a) Riot's reminder text prints only half the keyword.** Every [Ambush] printing reads
*"(You may play me as a [Reaction] to a battlefield where you have units.)"* — the Reaction half. The
LOCATION-permission half of 822.1.b is not on the card, and both halves carry the same condition.
Measured over `data/cards.json`: **23 [Ambush] printings, 14 distinct name+type.**

**(b) "for any reason" makes it an ANSWER, and nobody has priced it.** The condition is checked at
finalization, not when the location is chosen, so **an opponent who kills your last body at that
battlefield in response invalidates the Ambush**. `vilemaw-counter-strike-ambush-undo-is-free` is the
one entry that works the window out (through 354.4 and 813.4.b, and it is excellent), and it reaches
that conclusion from 813.4 without citing 822.3.

**(c) The requirement is HARD or SOFT, and the discriminator is a rule.** If the arrival must happen
on the opponent's turn, 822.1.b's second half is the only Reaction grant available and no alternative
exists. If the line plays on its own turn, 355.2.a plus 144.4.a give a slower route — play to base,
walk in — so the pre-standing body is tempo rather than a gate. **State which, or the repair
over-constrains.**

### The Ambush sweep

Predicate: an entry whose `uses` contains a printing carrying `[Ambush]`, supplying **zero other
on-board units** (a `uses` row of type `unit` whose zone is not HAND/TRASH/DECK/CHAMPION/LEGEND) and
no token-maker, and declaring no `needs`.

**766 entries; 21 use at least one [Ambush] card; 13 supply zero other bodies.** Of those 13:
**8 exposed, 1 already repaired (`apothecary-pridestalker-buff`), 4 refused with the reason** —
`voidreaver-khazix-xp-removal` and `ravenbloom-diana-fizz-spell-stack` offer the normal play as an
explicit alternative (*"to your base or, with [Ambush]…"*), `solari-shrine-vi-peacekeeper-attack-draw`
never uses the keyword and Standard-Moves instead, and `rengar-trophy-hunter-poppy-ambush-verb-attack`
stands on 822.1.d's override, which Riot works as its own example: *"Rengar, Trophy Hunter reads in
part "I can [Ambush] to a battlefield where there are enemy units, even if you don't have units
there.""*

**Two of the three entries that cite 822.3 are among the exposed.** Citing the rule is not the same as
pricing it.

---

## 2. PREDICATE C, FINISHED: 50 ROWS, ALL DISPOSED

Reproduced exactly at 766 entries / 4,283 step strings / 50 rows. Dispositions:

| | rows |
|---|---:|
| already repaired by the manager (`anyBodies` present) | 8 |
| **newly exposed** | **17** |
| withdrawn on the second measurement | 1 |
| sanctioned or false positive, each with a reason | 24 |

Plus **3 more exposed entries the Ambush sweep found that predicate C never flagged** —
`vi-peacekeeper-ambush-stun`, `gutter-palace-reaction-dials`, `keepers-verdict-poppy-deck-bounce` —
for **20 new exposures in total**.

### Four false-positive classes, named so the next sweep starts from them

These are **new** classes, beside the four predicate A already recorded.

1. **`a battlefield you control`.** The commonest match by far, and it is a battlefield precondition
   rather than a body one (`blue-sentinel-trinity-force-hold`, `blood-money-bird-industrialist-power-spike`,
   `sentinel-trinity-time-warp-chain`, `faefolk-challenger-forced-attacker`). The probe already
   excluded *"you control the battlefield"*; this is the other word order.
2. **A rules paragraph quoted in the steps.** *"465.1's damage tasks require both Attacking and
   Defending units"*, *"740.3.a's tie"*, *"822.1.b's normal condition ('where you control Units')"* —
   `blast-of-power-action-removal-bloodless-conquer`, `symbol-of-solari-tie-evacuation`,
   `poro-herder-stalking-wolf-poro-fodder`, `rengar-trophy-hunter-poppy-ambush-verb-attack`.
3. **The domain name `Body`.** `profiteer-hextech-disc-empower-relay` matched on
   *"have paid E5 + 1 **Body** Power"*. Six domains, one of which is a word this predicate hunts.
4. **A NEGATIVE requirement.** `keeper-of-law-royal-guard-exact-two` asks for a battlefield *"that has
   **no** other units of yours on it"* — the opposite of a gap, and a predicate reading only for the
   noun cannot tell the two apart.

---

## 3. THE TWENTY, RANKED, WITH EACH REQUIREMENT IN THE ENTRY'S OWN WORDS

Every one is an **ENGINE** except the two marked ALT_WIN. **Bold inside the quoted entry sentences below is mine, not the
author's** — those are quotations of this catalogue's own prose, not of a rulebook or a card. `onBoard` is units in `uses` standing
somewhere on the board; `tok` is unit tokens the `uses` cards play.

### Tier 1 — the line cannot be played at all (203.3 / 822.3 / 461)

| entry | onBoard | the entry's own sentence |
|---|---:|---|
| `heedless-resurrection-legion-rearguard-accelerated-return` | 0 | *"another friendly unit of at least equal printed cost on the board"* — and S3 says outright *"**203.3 is why an empty board makes the spell uncastable**"* |
| `cruel-patron-zhonyas-cost-paid-without-the-death` | 0 | *"With the Hourglass on the board and **at least one friendly unit standing**, play Cruel Patron"* |
| `wraith-of-echoes-cruel-patron-sacrifice-body` | 1 | *"**Keep a spent body on the board**"*, *"killing that body (203.3: the cost must be payable)"* — the one on-board unit is the Wraith, and killing him ends the engine |
| `spectral-centaur-deathgrip-reaction-spike` | 1 | *"with **at least one other friendly unit** beside him"*, then *"Kill your other unit"* — the one on-board unit is the Centaur |
| `vilemaw-counter-strike-ambush-undo-is-free` | 0 | *"Have at least one unit at the battlefield you expect to be attacked; **822.1.b needs it and Vilemaw does not count himself** at the moment the location is chosen"* |
| `vi-peacekeeper-ambush-stun` | 0 | *"Open a combat yourself at the enemy battlefield **with cheap bodies** — 461 needs units of two opposing players there"* — required twice over, by 461 and by 822.1.b |
| `dark-child-inferna-off-turn-ambush` | 0 | *"when they attack a battlefield **where you have units**"*, then *"play Inferna as an [Ambush] to that battlefield"* — HARD: the arrival is on the opponent's turn, so no non-Ambush route exists |

### Tier 2 — the declared payoff does not happen

| entry | onBoard | the entry's own sentence |
|---|---:|---|
| `mask-mother-brazen-buccaneer-cost-discount` | 0 | *"**Have a friendly unit already on the board** — it will be the only legal target for the +2"*; `CLAUDE.md` already records that the Buccaneer himself cannot receive it |
| `mask-mother-ruthless-strike-doubled-payment` | 0 | *"**Have a friendly unit in play** to receive the +2 Might"* |
| `heroic-charge-solari-chief-stun-kill` | 0 | *"**Have a friendly unit at the battlefield holding the body you want gone**"* — and 355.2.a forbids playing one there, so it had to walk |
| `legion-quartermaster-cloth-armor-bounce-value` | 0 | *"**Have Cloth Armor attached to a unit**"* — a gear needs a carrier and `uses` has no on-board body |
| `morgana-apothecary-hextech-ray-doubling-ladder` | 0 | *"to a battlefield **where you control units**"*, twice; and `UNL-021 Grim Apothecary`'s own trigger reads *"return a friendly unit at a battlefield"*, so the body is needed even if both Ambushes are declined |
| `shen-kinkou-soulspinner-flash-defence` | 0 | `produces: board-protection`, and S5 protects *"**every other unit you control in this combat**"* — there are none |
| `keepers-verdict-poppy-deck-bounce` | 0 | *"Follow with Poppy via [Ambush] to occupy the space"* — Poppy carries plain [Ambush] and needs your units there |
| `undertitan-pakaa-signpost-move-reveal` | 1 | *"exhaust **any other unit you control** and exhaust the Signpost"* — `UNL-045` reads *"Move a different unit you control to the location of the unit you exhausted"* (**different** is the word that bites), so Pakaa cannot be both. Second instance of the Signpost shape after `irelia-fervent-forgotten-signpost-choose` |
| `gutter-palace-keeper-time-warp` **[ALT_WIN]** | 1 | *"it plus two Reflection copies join **the unit already there**. Four units at battlefields"* — the one on-board unit is declared `zone: "BOARD"`, which is a distinct enum member from `BATTLEFIELD`; and 811.1.b hides only *"at a battlefield you control"*, so a body is needed for the Hidden play too |
| `gutter-palace-reaction-dials` **[ALT_WIN]** | 0 | the Palace needs four units at battlefields; the three Chakram Dancers are the Reaction-speed **corrections**, and the first of them is itself an [Ambush] needing a body there |

### Tier 3 — real but softer; the reading is stated, not hidden

| entry | onBoard | why it is softer |
|---|---:|---|
| `vilemaw-grove-double-draw` | 1 | S1 is *"Hold or take the Grove of the God-Willow **with any body**"* and S2 Ambushes Vilemaw in — but Vilemaw alone could play to base and walk in over two turns (144.4.a), so the body buys a turn rather than the line |
| `tryndamere-call-to-glory-trapping-grounds` | 2 (+1 tok) | *"with **two other friendly units** there: three buffs"*. `OGN-223` buffs itself then all others, so three buffs need Peak Guardian plus two others; `uses` supplies one. The point and the Bird survive at two buffs — only the declared M17 needs the third, and the Bird arrives after the Conquer so it cannot pre-stand |
| `sett-kingpin-peak-guardian-mass-buff` | 2 | *"Assemble a garrison"*, and `terminatesIn` says *"six is M11 **on the declared board**"* — the board is not declared in `uses`. The [Tank] works at any size, so six is arguably an illustration; **the phrase "the declared board" is what makes it a claim.** Weakest of the twenty |

### Withdrawn on the second measurement

`yuumi-affectionate-poro-designated-tank` asks for *"one other body"* and carries **six** on-board
units (`UNL-056` ×3 and `VEN-024` ×3, both at BATTLEFIELD). A second copy of either fills it. **This
is the one my first pass had wrong**, and the mechanical supply count is what caught it.

### Still outstanding from my predecessor, not yet applied

`irelia-fervent-forgotten-signpost-choose` and `lillia-fae-fawn-signpost-sprite-at-the-origin` (the
latter stated as PROBABLE by its finder, and I am not overturning that reading).

---

## 4. A COUNT DEFECT IN TWO ALREADY-APPLIED REPAIRS, AND THE RULE THAT FINDS IT

Both are evacuation entries that already carry `anyBodies` at **count 1**, and both need **two**:

- **`amateur-recital-free-evacuation`** — S1 *"you control Amateur Recital **with a body on it**"*,
  S5 *"Standard-Move **a ready body from your base** into it"*.
- **`marai-spire-temptation-evacuation`** — S1 *"Control Marai Spire (190.1: walk a body on and take
  it)"*, S5 *"Walk a friendly unit in the same Main Phase"*.

**The body holding the first battlefield cannot be the body that walks into the second**, and the
reason is a rule this file already carries in its own words: 144.4.a and 144.4.b confine the Standard
Move to base↔battlefield, and **144.4.c.1 makes battlefield-to-battlefield a [Ganking] privilege**.
For `amateur-recital` the first body must also STAY, or 323.6 strips the Control the Hold is paid on.

**The standing form: an entry that evacuates one battlefield and walks into another needs TWO bodies,
not one, unless it names a [Ganking] source.** Worth sweeping the other applied repairs for.

---

## 5. A SIDE FINDING: THE `Zone` TYPE IS ONE MEMBER SHORT OF ITS OWN DATA

`src/types.ts:51` declares `Zone = "BOARD" | "BATTLEFIELD" | "BASE" | "HAND" | "TRASH" | "DECK" |
"LEGEND" | "CHAMPION"` — eight members. **`data/combos.json` uses a ninth, `ATTACHED`, on 24 `uses`
rows across 22 entries** (`sentinel-adept-weaponmaster-free-attach`, `swain-shurelya-double-conquer`,
`riven-shattered-svellsongur-weaponmaster-pull` and nineteen more), every one of them an Equipment
attached to a carrier.

**The data is right and the type is short.** Nothing catches it because `src/load.ts:19` reads the
file through an unchecked cast (`read<{ combos: Combo[] }>`) and `validateCombos` never looks at
`zone` — a `grep` for `\.zone` across `src/` and `web/` returns only `web/builder.ts`'s unrelated
`PoolZone` UI filter. This belongs to rc-schema / rc-builder; I hold neither file.

It matters to this class directly: any body-requirement check has to treat `ATTACHED` as an on-board
zone, and a checker written from the type alone would not know it exists.

---

## 6. METHOD NOTES

**The handoff's one sentence held.** The mechanical supply count run *after* the reading withdrew one
of my own proposals and would have withdrawn more had I not read first — and it also caught my own
probe disagreeing with itself, because `verify-c.mjs` labels a row from `onBoard` alone while its
tally uses `onBoard + tokens`. **Do not quote that script's labels; quote its numbers.**

**Re-validating before reporting paid within the hour.** Three rows I had just verified as exposed —
`amateur-recital-free-evacuation`, `marai-spire-temptation-evacuation`,
`shadow-dash-eye-of-twilight-dragged-attacker-tank` — turned out to be **already repaired**, because
the manager applied 37 `anyBodies` entries while my predecessor's document was being written. **A
finding checked against a stale file is a finding about a file that no longer exists.** The same pass
is what turned two of them into the count defect in §4, which is worth more than re-reporting them.

**And the productive move was not finishing the list.** Reading 44 rows disposed 44 rows; noticing
that nine of them said *"[Ambush]"* produced a rules-grounded predicate that found three entries
predicate C could never reach, and a paragraph — 822.3 — this project has cited three times in 766
entries. **The list was the task; the pattern inside it was the result.**
