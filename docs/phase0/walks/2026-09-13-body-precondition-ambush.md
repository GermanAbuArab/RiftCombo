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

**REPAIRED THE SAME AFTERNOON, by rc-schema, in commit `6370a8b` — so read this section as history, not
as a live defect.** The fix added BOTH the ninth member and, more importantly, a RUNTIME check in
`validateCombos` (`src/combos.ts:20`), with the right diagnosis in its own commit message: *"the union
is compile-time only, and no `Ingredient` is ever WRITTEN in TypeScript — they are authored in
`data/combos.json` and arrive through an unchecked cast in `src/load.ts`, so the type was never applied
to the values it describes."* **My own sentence above — that `validateCombos` never looks at `zone` —
was true when I wrote it and is false now, because of this report.** Stated rather than quietly edited,
because a claim about tooling is dated the moment it is made on a tree six sessions are writing to.

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

---

## 7. THE GENERALISATION: THREE KEYWORDS, THREE RULES-LEVEL BODY PRECONDITIONS

Ambush is not special. Three keywords in this pool gate on a body, each in one sentence of the Core
Rules, and none of them consults prose — so none can be defeated by how an author phrased a step.

| keyword | rule | what it needs |
|---|---|---|
| Ambush | **822.1.b** *"I may be played to a battlefield where you control Units"*, enforced at finalization by **822.3** | a friendly unit **at the target battlefield**, never the Ambusher itself |
| Hidden | **811.1.b** *"hide this facedown at a battlefield you control that doesn't already have a facedown card hidden there **for as long as you control that battlefield**"* | a body holding a battlefield, and it must **stay** |
| Equip | **818.1.c.2** *"Equip is functionally short for "[Cost]: Attach this gear to a unit you control.""* | a unit you control, anywhere |

**Measured over 766 entries** (1,042 printings indexed; 23 Ambush, 52 Hidden, 39 Equip-carrying gear):

- **Equip — 130 entries use one, 12 supply zero units and zero token-makers, and ALL TWELVE ALREADY
  CARRY `anyBodies`.** That population is finished.
- **Hidden — 72 entries use one, 4 supply zero units, 3 already repaired**, and the fourth is
  `monster-harpoon-bushwhack-facedown-enabler` (ENGINE, `uses` is two SPELLS and nothing else). Its
  step 1 cites 811.1.b itself, and it is the **strongest form of the class**: step 2 reads *"Leave it
  there. You now permanently 'control a facedown card'"*, so the body is not a one-turn cost but a
  permanent garrison — 323.6 strips Control the moment your last body leaves and 107.3.d then removes
  the facedown card at the next Cleanup.
- **Ambush — see the false clean below.**

**Reporting the two clean results is the point, not a courtesy.** A check that comes back clean over a
NAMED population is the one worth pinning, and Equip at 12 of 12 says the repair programme has already
covered an axis nobody had named as an axis.

### The false clean, and why one of the three needs a different predicate

Run with the strict predicate *zero units of any zone in `uses`*, **Ambush returns 0** — and that is
wrong rather than reassuring. **The Ambusher is itself a unit in `uses`**, so the strict predicate
counts the very card whose play is being gated. 822.1.c makes the keyword add a location option
*during the Make Relevant Choices step*, while the unit is still a Chain Item and not on the board, and
822.3 then checks the location *"before Finalization completes"* — so it can never be its own
precondition. **The correct Ambush predicate is ZERO OTHER ON-BOARD UNITS**, which returns 13 of 21.

**One instrument, three keywords, and one of them needs a different predicate from the other two —
and the wrong one returns a confident EMPTY that reads as a pass.**

---

## 8. THE 144.4.c.1 SWEEP, COMPLETE OVER ALL 65 APPLIED REPAIRS

144.4.a: *"Units may move from their Base to a Battlefield."* 144.4.b: *"Units may move from a
Battlefield to their Base."* 144.4.c.1: *"Units with Ganking may use their Standard Move to Move from
Battlefield to Battlefield."* **So a body holding battlefield A cannot, in the same turn, be the body
that walks into battlefield B.**

Swept across all 65 `anyBodies` rows, and every note read rather than regex-classified. **Exactly one
new defect**: `svellsongur-faefolk-mass-evacuation` at count 1, needing 2 — its step 2
standard-moves the Faefolk *"to a battlefield you control"* (the entry says so in its own words,
noting no Contested applies *"because you already control it"*), so a body must hold that battlefield,
and step 5 walks *"a second friendly unit"* into the **different** battlefield the Faefolk evacuated.

**Two refused with the reason, so nobody re-files them.** `conscription-signpost-empty-garrison`'s
second body is only for step 6, which the entry itself labels *"reinforcement, not the conquer"*.
`spirit-wheel-stare-down` is refused from the card: `UNL-107` reads *"Choose a friendly unit and a
battlefield"* — no co-location — so one body at base can be both the chosen unit and the walker.

### The instrument ate its own result, and that is the reusable half

My first predicate excluded any entry mentioning Ganking. **That silently excluded the two entries the
manager had just REPAIRED, because the repair note explains the Ganking rule.** Measured: all three
prose mentions of Ganking across the 65 grant it via **no card at all**. **The correct exclusion is a
card in `uses` whose text carries the keyword, never the word appearing in prose** — otherwise a
detector goes blind to exactly the rows that prove it was right.

Same family as this morning's trap A, and as the emitted-notable cases this project already records:
**the string was in the right file and in the wrong sentence.**

---

## 9. THE OTHER THREE KEYWORD GATES, AND FIVE STRUCTURAL CHECKS — ALL MEASURED EMPTY

Having swept the three keywords whose gate is a BODY, the continuation is the keywords whose gate is
something else a `uses` list can fail to supply. All three verbatim:

- **821.1.c Weaponmaster** — *"When you play me, you may choose a Card you control with the Equipment
  tag."* Gate: an **Equipment you control**, which need never be attached.
- **829.1.b Flow** — *"You may play this from your trash for its flow cost. Then banish it."* Gate:
  the spell **in your trash**.
- **812.1.b.1 Legion** — *"If you have played another card this turn, this card gains [Text]."* Gate:
  a **second card played**.

**All three are clean, and two of my three first numbers were my own instrument** — the third
consecutive instance today of the rule this project already records, that a new checker's first
number is too big because it encodes the rule and not an exception the domain sanctions.

- **Weaponmaster — 19 entries use one; 1 names no Equipment-tagged card, and it is NOT a defect.**
  `dune-surfer-armed-assailant-ignore-tank` runs `SFD-002 Armed Assailant` for his **[Accelerate]**
  (step 2 pays the rider so he enters ready) and his Might (step 5 sums 9), and never uses the
  Weaponmaster clause at all. **A card carrying a keyword the line does not use is not a gap.**
- **Flow — my predicate said 20 of 21 and the honest figure is ZERO.** I flagged every entry
  declaring the Flow spell at a zone other than TRASH. **That is the sanctioned normal case**: a Flow
  spell starts in hand, is cast for its printed cost, and *reaches the trash by being cast* —
  `magma-wurm-illaoi-ready-tentacles` plays `VEN-100` from hand at step 3 and replays it *"out of
  your trash for its [Flow] cost"* at step 5. The zone HAND is correct on every one of the twenty.
- **Legion — 12 entries use one, ZERO have a single-card `uses` list.** Expected, and worth stating:
  812.2 makes *"All instances of Legion on cards a player controls … satisfied by that player playing
  a single card"* with 812.1.c needing it merely FINALIZED, so a Legion gate is met by almost any
  line's own second card.

### Five structural checks over `uses`, and the one that proves the others are live

Every check grounded in a rule, none reading prose, over **1,898 `uses` rows of which 1,898 resolve
against `cards.json`**:

| rule | check | result |
|---|---|---:|
| 103.2.b | more than 3 copies of one NAME | **0** |
| 103.2.a.1 | more than one Chosen Champion | **0** |
| 103 / 107.4 | more than one legend | **0** |
| 103.2.d.1 | more than 3 Signature cards | **0** |
| 485.4.a | more than 3 distinct battlefields | **0** |

**Five zeros in a row is exactly the shape that should be distrusted, so the distributions were
measured rather than the verdicts trusted**: max copies of one name runs 1→329, 2→48, **3→387**, 6→1,
7→1; Signature copies run 0→694, 1→38, 2→4, **3→30**. **387 entries sit exactly AT the copy cap and
30 exactly at the Signature cap**, so both checks are demonstrably live rather than vacuous.

**And the copies check FIRED — on two entries, at 6 and at 7, both `Spiderling`.** `VEN-097` prints
*"Your deck can have any number of cards named Spiderling"*, and rule 002 makes card text beat rules
text. **So the single exception hard-coded in that check is the one the pool itself prints, and the
zero is now PROVEN rather than assumed** — which is the only kind of zero worth reporting.

---

## 10. ZONE VALIDITY: THE ENUM IS CHECKED, THE SEMANTICS ARE NOT

`validateCombos` now checks a `zone` against the nine-member `ZONES` list. **What nothing checks is
whether that zone is legal for the card's TYPE**, and the rules decide it: **359.2** makes a permanent
leave the chain and become a Game Object (a spell does not), **359.2.d** enters a non-unit gear READY
at base, **143.4** enters units exhausted, **718.1** keeps an attached card attached until Detached,
and **811.1.b** is the ONLY route by which a card sits face-down at a battlefield.

**The whole cross-tab was measured before anything was guessed** — 1,898 `uses` rows, **25 distinct
type-zone combinations**, every combination of six or fewer occurrences read individually. Most of the
rare cells are correct and are named here so nobody re-files them: `unit @ CHAMPION` ×3 is the Chosen
Champion (103.2.a.3); `spell @ TRASH` ×3 is [Flow] and `OGN-252 Super Mega Death Rocket!`, which is
385.2's own worked example; `spell/gear/unit @ DECK` is reveal-and-predict material such as
`SFD-175 Undertitan`; the `(none)` cells are an optional field left unset.

### The one testable cell, and the one hit in it

**A spell may sit at a battlefield only if it is [Hidden].** Of the **7** rows declaring
`spell @ BATTLEFIELD`, **6 carry [Hidden]** and one does not:
**`sprite-mother-burst-leblanc-plaza` declares `UNL-069 Sprite Burst` at `zone: "BATTLEFIELD"`**, and
Sprite Burst is a plain Mind spell with no [Hidden] at all. Its own step 4 says what actually happens —
*"Cast Sprite Burst (5 Energy) and put both Sprites at the Plaza under 355.2.a"* — so the SPELL is cast
from hand and the TOKENS go to the Plaza. **The row should read HAND.** It changes no behaviour today,
but it is wrong, and `scripts/adversarial-check.mjs:523` already reads `u.zone` as a board
discriminator, so the field is load-bearing somewhere.

### An inconsistency worth more than the defect

**An Equipment in play is declared FOUR different ways across the catalogue**: `BOARD` 54,
`BATTLEFIELD` 52, `ATTACHED` 24, `BASE` 6. Only 24 of those ~136 rows distinguish the state that
718.x makes materially different — an ATTACHED card has its printed Rules Text Inactive (718.2), its
Effect Text appended to the carrier (718.3), its [Equip] unusable (721.2), and is still a legal target
(718.5.b). **So the `zone` field does not currently tell you whether an Equipment is attached**, and
any checker built on it — mine included — gets a different answer depending on which convention the
author happened to use. That is a convention question for the schema owner, not a defect list.

**And the caution that makes this axis dangerous to automate**: `ATTACHED` is an ON-BOARD zone, so a
checker that files it with `TRASH` and `DECK` by the sound of the name is wrong; and `BOARD` and
`BATTLEFIELD` are distinct members that entries genuinely use differently — `gutter-palace-keeper-time-warp`
declares its unit at `BOARD` where the Palace needs units AT BATTLEFIELDS, which is precisely the gap
§3 reports.

---

## 11. THE TAG VOCABULARY: PRINCIPLED, WITH ONE LEAD

rc-gap proved the needs/produces DAG domain-sound and every declared `needs` supplied. Unasked: is the
**tag vocabulary** coherent? Measured — **766 entries, 765 declaring `produces`, 33 declaring `needs`,
19 distinct produces tags, 6 distinct needs tags.**

**Thirteen of the nineteen produces tags are consumed by nothing, and that is correct rather than
broken**: `win-the-game`, `burst-points`, `ability-points`, `repeatable-removal`,
`card-advantage-engine`, `board-protection`, `tempo-denial` and the rest are **terminal outputs** — a
deck wants them; no other combo eats them. The vocabulary really does split into FUEL and TERMINAL.

**Two rows are worth a second look and one of them is a lead.**

### `resource-engine`: 180 producers, ONE consumer

The catalogue's most-produced tag has a single `needs` edge, `heimerdinger-renata-remote-score`. Not a
defect — most of the 180 mean *"this makes Energy or cards"*, which is a description rather than a
socket. **But it is the exact shape `CLAUDE.md` already records for `conquer-engine`**, which 32
entries produced and nothing consumed until one entry declared the need and connected the DAG. Whether
more finishers should declare `needs: resource-engine` is a design question for the schema owner.

### `temporary-body-engine`: 9 producers, ZERO consumers — and the disjointness is real

**No entry produces both `temporary-body-engine` and `token-body-engine`** (measured: 0 of 766), and
the rules say why. 816.1.b kills every `[Temporary]` permanent *at the start of its controller's
Beginning Phase, before scoring*, and the phase order is 315.1 Awaken → 315.2 Beginning → 316 Main —
so a Temporary body minted on turn N is **dead before turn N+1's Main Phase**. It can never feed the
Hold-based consumers `token-body-engine`'s six edges serve, which need seven bodies to survive the
opponent's whole turn. **The two tags are disjoint by rule, not by accident.**

**The lead: 816.1.c is the exception, and it points at exactly one consumer.** The Trigger Condition is
*the start* of the Beginning Phase, so a Temporary permanent that ENTERS inside that window never dies
that turn — and the window is reachable, because 816.1.b's trigger opens a Closed State where 312.2.c
gives priority and 813.1.c.1 admits a `[Reaction]` card. A body that survives that way is alive in the
Main Phase, which is where **`VEN-067 Bottled Constellation`** fires: *"At the start of your Main
Phase, you may kill 3 other friendly units and/or gear to score 1 point."* `CLAUDE.md` already names
`UNL-081 Keeper of Masks` as *"the only clean feed for `bottled-constellation-time-warp`"* — and Keeper
of Masks makes Reflections, which are Temporary.

**Four of the nine producers carry a card that reaches the window**:
`petal-pixie-keeper-of-masks-might-wall` (`UNL-081`), `lillia-smoke-mirrors-sprite-relay` (`UNL-083`),
`retreat-sprite-mother-rebuy` (`OGN-104`), `black-flame-altar-sprite-call-temporary-shield`
(`OGN-094`).

**STATED AS A LEAD AND NOT A CONCLUSION, because I measured the CARDS and did not walk the STEPS.**
Those four merely *can* be played at Reaction speed; whether any of them actually mints its bodies
inside the 816.1.c window, rather than in the Main Phase like the other five, is a walk somebody owes.
The `needs` edge is the schema owner's to declare, not mine.

---

## 12. THE LEAD, WALKED — AND IT REFUTES ITSELF, WHICH IS THE RIGHT ANSWER

I proposed §11's socket and then read the four candidates' steps. **All four are refused, and the
refusal is sharper than the lead was.**

**Every one of the four names 816.1.b in its own steps and says its bodies never survive to score:**
`lillia-smoke-mirrors-sprite-relay` — *"816.1.b kills every Sprite at the start of your next Beginning
Phase, before scoring — they defend for one turn cycle and never Hold"*;
`petal-pixie-keeper-of-masks-might-wall` — *"At the start of your next Beginning Phase every
[Temporary] body dies before scoring (816.1.b)"*; `retreat-sprite-mother-rebuy` — *"At the start of
your next Beginning Phase 816.1.b kills all of them before scoring"*;
`black-flame-altar-sprite-call-temporary-shield` — *"At your next Beginning Phase 816.1.b kills the
Sprite at 315.2.a, before scoring"*.

**And none of them mints a body inside the 816.1.c window, which is the whole question.** 816.1.c:
*"The Trigger Condition is the controller of the permanent's Beginning Phase starting."* To survive
into the Main Phase a Temporary body must enter **after that instant, during YOUR OWN Beginning
Phase** — 383.2.a.1 measures the condition when the trigger is placed, so a permanent that was not
there is not killed. The four mint in two other places and neither works:

- **In your Main Phase** (`lillia`, `retreat-sprite-mother`) — dies at your NEXT Beginning Phase,
  which is before that turn's Main Phase. The consumer never sees it.
- **On the OPPONENT'S turn, inside their attack** (`black-flame-altar` step 3, `petal-pixie` step 3's
  Reaction line) — and 816.1.b kills at *"this permanent's controller's Beginning Phase"*, which is
  **yours**, so the body defends through their turn and dies at your next Beginning Phase, again
  before your Main Phase.

**So `temporary-body-engine` has zero consumers and should keep zero.** That is not an oversight in
the vocabulary; it is 816.1.b holding. The socket at `VEN-067 Bottled Constellation` is real in
principle and unreachable in practice, because it fires at 316 and no producer in the catalogue mints
inside the one window that reaches 316.

**The method note is the durable half.** Four cards *carrying* a Reaction-speed keyword measured as
four candidates; four entries *read* measured as zero. **A card that CAN be played at Reaction speed
is not an entry that DOES play it in the one phase that matters** — the same distinction as
`dune-surfer-armed-assailant-ignore-tank`, where a card carrying [Weaponmaster] never uses it. **I
flagged §11 as measuring the cards rather than the steps, and that caveat was the whole difference
between a lead and a wrong DAG edge.**

---

## 13. THE BIGGEST CITATION GAP BY PARENT WEIGHT — AND IT CONFIRMS THE CATALOGUE RATHER THAN BREAKING IT

Ranking every sub-rule cited by **exactly one** entry by how heavily its surrounding block is cited
(766 entries, 2,381 real headings, 1,067 distinct sub-rules cited, **353 of them singletons**; bare
three-digit headings excluded, because `CLAUDE.md` records that a bare `\d{3}` matches a prose
quantity — my own first pass returned "481" and "176" as cited rules), the top row is not close:

**`103.2.b.2`, cited by ONE entry, under a parent `103.2.b` cited by 389.** The 3-copy cap is the most
cited deckbuilding rule in this catalogue and the paragraph immediately under it had been opened once.

It reads: **_"Cards have different names even if they represent the same character."_** with Riot's own
example — *"A deck could include 3 copies of Yasuo, Remorseful and 3 copies of Yasuo, Windrider,
because they have different names."* **So a line capped at 3 by 103.2.b is capped at SIX whenever a
second printing of the same character does the same job.**

**Measured, and it cannot be exploited in this pool.** 278 `uses` rows run a unit at quantity 3;
**47 of them run a character the pool also prints under a different name** (Ahri Alluring/Inquisitive,
Ivern Friend to All/Nurturer, Jhin Murderous Artist/Meticulous Killer, Teemo Strategist/Scout, Yasuo
Windrider/Remorseful, Zed, Vex, Ambessa, Nasus, Kennen, LeBlanc). But the test that decides it is
mechanical and comes back empty: **of 1,189 printings folded into 997 distinct text+type+stat
signatures, exactly ONE signature is shared by two or more different names — the six basic Runes,
which share a `[no text]` placeholder and are governed by 161.2.a rather than by the copy cap.**

**Zero pairs of differently-named printings share rules text.** The second printing of a character is
always a genuinely different card doing a different job — Yasuo, Windrider scores on his third move
while Yasuo, Remorseful deals damage on attack — which is exactly *why* Riot gave them different names.

**So every "three copies by 103.2.b" ceiling in this catalogue is a REAL ceiling, and that is now
measured rather than assumed.** 103.2.b.2 is the rule that could have lifted them and does not.
**A result that confirms 389 entries' reasoning is worth as much as one that overturns it**, and it
cost one join plus one fold.

**Method note, and it is the fourth instance today.** The singleton-citation probe is the
orphan-neighbour probe pointed at ONES instead of ZEROS, and it has the same profile `CLAUDE.md`
records for its parent: **high yield, low precision — read the text, never the rank.** Below
`103.2.b.2` the top twenty is dominated by the 383 trigger block and the 465.2.c damage-assignment
block, both of which #187 has already been working through.

---

## 14. THE STRUCTURAL SURFACE OF `uses` IS SWEPT, AND THE MULTI-HOP FOLD IS DOMAIN-SOUND

Having asked all day what a `uses` list **fails** to supply, the mirror question is what it supplies
**redundantly** — and three more rules-grounded checks close that side:

| rule | check | population | result |
|---|---|---:|---:|
| **825.3.a** *"A deck can contain only one card of a given name if the card has Unique"* | a [Unique] row above quantity 1 | 5 rows | **0** |
| **103.4.c** no two battlefields of one name | a battlefield row above quantity 1 | 119 rows | **0** |
| one legend per deck | a legend row above quantity 1 | 115 rows | **0** |

**The [Unique] one is weak evidence and I am saying so**: the pool prints only three [Unique] cards
(`Forgefire Cape`, `Rabadon's Deathcrown`, `Shurelya's Requiem`) and the catalogue uses them on five
rows, so a zero over five rows proves little. The battlefield and legend checks, at 119 and 115 rows,
are worth having.

**And the battlefield check found a gap in MY OWN earlier sweep.** §9's structural pass counted
*distinct* battlefield NAMES per entry and never looked at QUANTITY — so an entry declaring one
battlefield at quantity 2 would have passed it. Asking the mirror question is what exposed that; the
answer is still zero, but the check was not there before.

### One level up: the multi-hop fold

Every check in this document so far has been **within one entry**. `generateVariants` flattens entries
through the needs/produces DAG, and `src/types.ts` documents `Variant.domains` as *"Union of
ingredient domains. Length > 2 means no legend can run it"* — which is 103.1.b.2. rc-gap established
domain soundness at **one hop**; this asks it of the real walker.

**766 combos in, 1,638 variants out. 905 of them flatten MORE THAN ONE combo**, and chains run three
deep (733 variants are one combo, 614 are two, 291 are three). **ZERO variants exceed two domains.**

**Non-vacuous, and the distribution is the proof**: domain counts run 0→3, 1→478, **2→1,157** — so
1,157 variants sit exactly AT the cap the check tests, and it is demonstrably live rather than
measuring an empty set. (The three zero-domain variants are colourless card sets, runnable under any
legend; that is correct, not a gap.)

**So the one-hop result generalises to the full fold**: no combination the DAG can assemble produces a
card set no legend could run. That is the last structural question I had about `uses`, and with it the
structural surface — copies, Chosen Champion, legend, Signature, battlefields, zones, roles, the tag
vocabulary, [Unique], and now the multi-hop domain union — is swept.

---

## 15. A CITATION DEBT FOUND BY INVERTING A PREDICATE THAT MEANT SOMETHING ELSE

I hypothesised that an ENGINE citing rules **no other entry cites** would be an entry knowing
something wrong. **The predicate found the opposite and the correction is the finding.** 74 ENGINEs
cite two or more such paragraphs, and the top rows are entries that opened a whole rules BLOCK:
`ki-barrier-shen-kinkou-prevent-pool` owns all **17** paragraphs of the 437 Prevent block,
`gemcraft-seer-nocturne-vision-replacement-deploy` eleven of 410/419,
`vilemaw-counter-strike-ambush-undo-is-free` eight of 813.4/354. **That signal detects rules DEPTH,
not defect risk — those are the best-researched entries in the catalogue.** Fifth time today a first
predicate meant something other than what I intended.

**Inverted, it becomes the 816.1.c shape**: a fact ONE entry established that OTHERS need and do not
cite. Tested against four blocks a single entry owns:

| block | printings matching | entries using one | citing the block | **not citing** |
|---|---:|---:|---:|---:|
| 437 Prevent | 4 | 8 | 8 | **0** |
| 355.14 Split | 3 | 3 | 3 | **0** |
| 142 Lethal | 0 | 0 | 0 | — (my card predicate, not the pool) |
| **424 Reveal** | 36 | 38 | 13 | **25** |

**Narrowed to the entries that actually make the argument**, per #204's rule that an uncited paragraph
is a debt only where an ENTRY makes the case it authorises: of the 38 entries using a reveal card,
**26 argue the Burn-Out protection by citing 431.1.c**, and **SIXTEEN of those cite no 424 paragraph
at all**: `svellsongur-ornn-hold`, `dazzling-aurora-elder-dragon`, `karthus-rift-herald-double-play`,
`aurora-elder-dragon-garbage-grabber`, `ivern-nurturer-hold-tutor`, `blind-fury-kennen-deck-theft`,
`teemo-strategist-swift-scout-hidden-flood`, `teemo-strategist-rabadons-deathcrown-bonus-kill`,
`svellsongur-apprentice-smith-gear-dig`, `svellsongur-teemo-strategist-defend-burst`,
`karma-ornn-hold-recycle-buff`, `karma-double-trouble-repeat-two-buffs`,
`svellsongur-ivern-nurturer-optional-draw`, `iascylla-teemo-strategist-forced-defend`,
`bandle-tree-blastcone-fae-teemo-double-hidden`, `ornn-blacksmith-late-may-resolution`.

**They cite the CONSEQUENCE and not the MECHANISM.** 431.1.c, pasted: *"If an instruction directs a
player to look at or reveal cards in excess to the number of cards in a player's Main Deck, that
player looks at or Reveals as many as possible, but does not Burn Out."* **424.1.a.2** is why:
*"Cards remain in the zone they are being Revealed from,"* with Riot's own example — *"If a card is
being Revealed from the top of a player's Main Deck, it is still the top card of that player's Main
Deck."* Revealing cannot Burn Out **because nothing leaves the deck**, and 424.1.a makes the state
*"temporary and not a zone"*.

**This is a citation upgrade on sixteen entries, not a defect list** — every one of the sixteen reaches
the right answer. It is the same shape `CLAUDE.md` already records for 355.7 against 355.10.d and for
811.6 against the tail of 811.1.b: **the exception or the consequence is carried, and the rule that
produces it is not.**

---

## 16. AN ENGINE-CLASS READING AUDIT — FRAME PRE-REGISTERED BEFORE READING

rc-manager8's discipline, and it is the reading analogue of *measure the distribution first, write the
predicate second*: **fix the sampling frame first, read second**, and say what a null would mean before
finding one. This section is committed **before** I open a single entry.

### Why this class

The ENGINE class is **686 of 766 entries (89.6%)** and has never been audited. Three independent
measurements point at it: `scripts/adversarial-check.mjs` sweeps the 80 finishers and cannot see it;
#203 found a shipped ENGINE with no stated point of failure; and the citation-gap split measured **86
rules cited 10+ times by ENGINEs and absent from `CLAUDE.md`, against ZERO by the finisher classes** —
an asymmetry `CLAUDE.md` itself attributes to *which half has been audited*.

### The frame

**Every 57th ENGINE in file order starting at index 0 — 13 entries, a 1.9% sample.** Nothing in that
rule is correlated with being defective: not age, not lens, not citation count, not card set, not
author. So a rate measured on it generalises to the 686, with the obvious small-sample caveat that 13
entries cannot distinguish a 5% defect rate from a 15% one.

The 13: `svellsongur-ornn-hold`, `seal-power-faucet-bootstrap`, `anivia-svellsongur-double-burn`,
`brynhir-lockout-window`, `power-nexus-atlas-sentinel-gold`, `katarina-reckless-hidden-blade`,
`dragon-roost-mountain-drake-instant-garrison`, `sacred-protector-disciple-of-shen-pair`,
`mageseeker-investigator-mass-move-tax`,
`lucian-gunslinger-farron-blood-rush-assault-as-damage`, `iterative-design-production-surge-mech`,
`papertree-esteemed-hierophant-rune-count`,
`demacian-diplomat-blood-rose-board-independent-xp`.

### What I am reading for

1. **A requirement the `uses` does not supply** — today's class. Expect ~zero: 82 entries were repaired
   today and none of the 13 carries `anyBodies`.
2. **A number stated without a predicate**, or a uniqueness claim (*"the only card that…"*) — the
   defect class #189/#192/#203 found repeatedly, and the one `CLAUDE.md` says is typed rather than
   measured.
3. **A cited rule that does not say what the entry claims** — partly guarded by
   `test/source-quotes.test.ts`, which covers `sources[].quote` only and not the prose.
4. **No stated point of failure** — #203's finding, and the question no instrument asks of this class.

### What I expect, and what a null would mean

**I expect a low rate on (1) and (3) and a non-zero rate on (2) and (4).** (1) has just been swept;
(3) is partly guarded; (2) is unguarded and is the most-repeated defect in this project's history; (4)
is unguarded and is structurally invisible, because the one instrument that asks it sweeps a different
population.

**If the slice comes back clean, that is a result only if I can say why.** The explanation available
in advance — and I am writing it down now so I cannot invent it afterwards — is that **the ENGINEs
were written by the same lanes, under the same `CLAUDE.md`, as the finishers**, so the file's rules
travel with the AUTHOR rather than with the CLASS, and the citation-gap asymmetry would then be a
statement about what got PROMOTED into the file rather than about what the entries know. That is the
same shape as rc-gap's C2 empty, which explained itself because three of six candidates named their
readier unprompted *because the rule is in the file*. **If it comes back clean and I cannot tell that
story from the entries themselves, I will report it as an unexplained null rather than as a pass.**

---

## 17. THE AUDIT, READ: 1 CONFIRMED, 2 CANDIDATES, 10 CLEAN — AND THE NULL EXPLAINS ITSELF

**Denominator: 13 of 686 ENGINEs (1.9%), selected by the rule pre-registered in §16 and committed
before reading.** All thirteen read in full — steps, `terminatesIn`, `netPerIteration` and every
notable.

### CONFIRMED (1): a perishable entry count, which is the class this project names most often

**`brynhir-lockout-window`**, notable 2: *"five of the twelve BURSTs score on a Conquer"*. **The
catalogue holds 23 BURSTs** (INFINITE 14, BURST 23, ALT_WIN 26, CHAIN 17, ENGINE 686). The count is
stale and carries no as-of date. `CLAUDE.md`: *"a count of entries is a perishable claim and a rule is
not… when a note cites how many entries use a card, write it AS OF the walk date, and keep the durable
half, which is always the rule, never the count."* **The durable half here is the MECHANISM** — Brynhir
cannot cover your own Hold (315.2.b.2 precedes 316, and she is a unit without [Reaction]), so what she
escorts is the *Conquer* half of the catalogue, which happens in the Main Phase. That argument is
correct and survives; only the arithmetic in front of it has rotted.

### CANDIDATES (2), both class (4): no stated point of failure

- **`svellsongur-ornn-hold`** — 3 steps, 2 notables, the thinnest entry in the slice. Ornn wears an
  **attached** Svellsongur and must hold a battlefield **through the opponent's turn**, and the entry
  names no threat at all: not the 16 gear-removal printings #200 catalogued, not removal on Ornn, not
  the loss of the battlefield. Every other entry in the slice states one.
- **`katarina-reckless-hidden-blade`** — notable 1 quotes 811.1.b and elides, **with a properly marked
  ellipsis**, the clause *"for as long as you control that battlefield"* — **which is the entry's own
  failure mode.** The line hides on turn one and plays on turn two; if the opponent takes that
  battlefield in between, 107.3.d removes the facedown card at the next Cleanup and the whole cycle is
  gone. The elision is honest by this project's rules; it is the load-bearing half that went missing.

### CLEAN (10) — and the null explains itself, as pre-registered

The other ten are not merely clean, they are **exemplary, and in exactly the ways `CLAUDE.md` asks
for**. They state the predicate WITH the number — `papertree-esteemed-hierophant-rune-count` N3
(*"swept, `grep -in "7 or more runes"`, three rows and no others"*), `seal-power-faucet-bootstrap` N7
(20 cards found, seven qualifying, named), `demacian-diplomat-blood-rose-board-independent-xp` N1
(a sweep with its date). They **name the members** rather than counting them, which is the form
`CLAUDE.md` prescribes for a perishable claim — that entry's N7 names all five sibling Blood Rose
entries. And they state the point of failure outright: `sacred-protector-disciple-of-shen-pair` N6
(*"THREE BODIES BREAK IT, AND SO DOES A TOKEN"*), `demacian-diplomat` N5 (*"2 Might is under
`OGN-133 Flurry of Blades`' sweep… dies to a 1-Energy [Reaction] for its whole board value"*),
`mageseeker-investigator-mass-move-tax` N6, `dragon-roost-mountain-drake-instant-garrison` N3.

**That is the explanation I wrote down in §16 in advance, now confirmed from the entries themselves:
the ENGINEs were written by the same lanes under the same `CLAUDE.md` as the finishers, so the file's
disciplines travel with the AUTHOR rather than with the CLASS.** The citation-gap asymmetry — 86 rules
cited 10+ times by ENGINEs and absent from the file, against zero by the finishers — is therefore a
statement about **what got PROMOTED INTO the file**, not about what the entries know. This is not an
unexplained null.

### And the next slice picks itself, on a measured signal

Both class-(4) findings are thin entries, so I measured whether thinness is a real signal.
**The ENGINE notable-count distribution is extraordinarily tight: 529 of 686 carry 6 or 7 notables
(77%), and only ELEVEN (1.6%) carry two or fewer.** My random slice contained exactly one of those
eleven, and it was one of my two weak findings.

The eleven: `svellsongur-ornn-hold`, `guardian-passage-svellsongur`, `gauntlets-enforcer-conquer`,
`azir-aphelios-attach`, `ashe-retreat-hand-strip`, `promising-future-force-deck`,
`ruination-sprite-burst-clear`, `sprite-fountain-malzahar-jayce`,
`treasure-hunter-industrialist-gold`, `aphelios-jax-quickdraw-attach`,
`pack-of-wonders-bewitching-discard`. All have 2–3 steps.

**That is a deliberately NON-random slice and any rate from it is a statement about those eleven and
not about the 686** — stated per rc-manager8's rule. It is the right next read precisely because it is
biased: the thin tail is where a missing point of failure is most likely, and it is eleven entries
rather than a sample.

---

## 18. THE THIN-TAIL CENSUS, AND A MEASUREMENT THAT MOVED BECAUSE OF MY OWN FINDING

**A census, not a sample: all ELEVEN ENGINEs carrying two or fewer notables, read in full.** Stated
per rc-manager8's rule as a deliberately NON-random slice — any rate here is a statement about those
eleven.

**Result: 3 clear candidates, 1 weak, 6 clean** (plus `svellsongur-ornn-hold` from §17, same shape,
making four of the family).

- **Candidates, all class (4):** `guardian-passage-svellsongur` (2 steps, 1 notable — an attached
  Svellsongur on a body that must Hold through the opponent's turn, no threat named),
  `gauntlets-enforcer-conquer` (whose entire `terminatesIn` is the two words *"engine only"*),
  `azir-aphelios-attach`.
- **Weak:** `ruination-sprite-burst-clear` states its symmetric cost (*"every unit dies, including
  yours"*) and names no answer.
- **Clean, and thin is not the same as careless:** `promising-future-force-deck`'s `terminatesIn`
  states its own failure outright (*"431.2.b refills their deck from trash before any Burn Out point,
  so it cannot deck them"*); `ashe-retreat-hand-strip` N2 bounds the lock (*"a lock until their next
  Hold, not permanent removal"*); `pack-of-wonders-bewitching-discard` step 3 concedes that one Pack
  only breaks even against 315.4.b's draw; `sprite-fountain-malzahar-jayce` N2 states the 816.1.b
  limit precisely. **Four one-notable entries state their point of failure in a `terminatesIn` or a
  step instead.**

### The family result, which is worth more than the four

**All four candidates stand on ATTACHED EQUIPMENT and none names a gear answer** — which is exactly
#200 batch 1's finding for the finisher classes (*"of the 29 BURST and CHAIN entries, TWELVE stand on
attached Equipment and not one named a gear-removal card"*), **reproducing in the ENGINE class.**

#200 batch 19 already measured that population and **deliberately shipped nothing**: *"96 ENGINEs use
Equipment with no gear answer named… no narrower criterion was available, so 96 notables were not
shipped."* **The thin tail is that criterion.** Measured now: **104 ENGINEs stand on an
Equipment-tagged card, 78 name no gear answer, and intersected with the thin tail that is THREE** — a
list short enough to act on, where 78 is not. The argument for the narrowing is not merely that it is
smaller: **an entry with one notable has no room for the caveat, so its absence is an omission rather
than an editorial choice**, whereas a seven-notable entry that omits it may have decided.

**The probe's limit, stated with the number: 3 is a FLOOR.** The answer set is swept from
`cards.json` on a removal predicate that includes *"detach"*, which catches cards this catalogue runs
as its own ENABLERS — `aphelios-jax-quickdraw-attach` reads as having named an answer **only because
it runs `SFD-193 Grandmaster at Arms`**, and `CLAUDE.md` already records `SFD-011 Angle Shot` being
catalogued *"used on your OWN gear for draw"*. **Removal and relocation are not the same set, and my
predicate conflates them.**

### The measurement moved because my own finding was applied to it

**The thin tail was ELEVEN when I fixed the frame and is TEN now.** The entry that left is
`svellsongur-ornn-hold`, which gained a third notable in commit `703f305` — **rc-manager8 applying the
424.1.a.2 upgrade I reported in §15, on which that entry was first in the list of sixteen.** It
therefore fell out of my own `<= 2` filter, and the Equipment intersection read 3 where it should have
read 4.

**I caught it only because I asked why an entry I had flagged by READING was absent from the
intersection that was supposed to confirm it.** That is *re-validate immediately before reporting* in
its sharpest form yet — not the file moving under me, but **the file moving BECAUSE OF ME**. A lane
that reports a finding and then measures the same population later is measuring a population its own
report changed.

### The floor was three and the honest figure is four — I fixed my own probe

I reported 3 as a floor and named the cause as conflating removal with relocation. **Splitting them
was worth doing and was not the bug.** Split: **14 removal names** (Thermo Beam, Salvage, Detonate,
Disarming Rake, Zaun Punk, Rocket Barrage, Brittle Steel, Noxian Demolitionist, Acceptable Losses,
Pickpocket, Adaptatron, Malzahar Fanatic, Jayce Man of Progress, Bottled Constellation) against **7
relocation names** (Angle Shot, Factory Recall, Strike Down, Legion Quartermaster, Grandmaster at
Arms, Veiled Temple, Pack of Wonders).

**The real bug is that an answer card sitting in the entry's OWN `uses` was counting as the entry
having named an answer.** The relocation set is where it lived, because those seven are precisely the
cards this catalogue runs on its **own** gear. Measured: **8 entries** had their only "answer" be one
of their own enablers. Corrected, the population goes **78 → 86** and the thin-tail intersection goes
**3 → 4**, adding `aphelios-jax-quickdraw-attach` — **the entry I had predicted from reading and
could not explain from the probe.**

**Reading found it, the probe hid it, and the reading is what made me go back.** The standing form is
the one this project already has and this is a new instance of it: *a check that counts a card as
evidence must ask whose card it is.*

### And the shipped script had already solved it better than I did

I went looking for my own bug in `scripts/adversarial-check.mjs`, expecting to find it. **It is not
there, and the way it is avoided is better than my fix.** The script filters its detach set on a
property of the CARD: `enemyFacing = !/friendly|you control/i.test(t)`, with the reason in its own
comment — *"a detacher confined to 'friendly' or 'you control' cannot answer an opponent's line at
all"* — taking the population *"from 5 base codes … down to ONE."*

**My v2 fix was entry-relative and therefore weaker.** Asking *"is this answer card in the entry's own
`uses`"* still counts `Grandmaster at Arms` as an answer for every entry that does **not** run it —
and it never is one, for anybody. Measured with the shipped filter: of 4 detach names, exactly **ONE
is enemy-facing (`SFD-011 Angle Shot`)**, and `Strike Down`, `Grandmaster at Arms` and `Veiled Temple`
drop out as friendly-only.

**The wide population moved with every correction and the actionable list did not**, which is the best
evidence the list is right:

| predicate | ENGINEs on Equipment naming no answer | thin-tail intersection |
|---|---:|---:|
| v1 (union, entry-blind) | 78 | 3 |
| v2 (exclude the entry's own `uses`) | 86 | **4** |
| v3 (+ the shipped enemy-facing filter) | **98** | **4** |

**98 of the 104 ENGINEs standing on Equipment name no answer — 94%, which is why #200 was right not to
emit it — and the four in the thin tail are stable under three successive tightenings.**

**The reusable half: when you find a bug in your own check, go and read whether the shipped instrument
that asks the same question has it.** Here it did not, and its filter was the better one; adopting it
cost one line and made my number defensible instead of merely corrected.

---

## 19. THE CLASS, CHECKED AGAINST MY OWN WORK: ONE CLASS, THREE INSTANCES, ONE REAL

rc-manager8's reading was right — *"you may find it is one class with three instances"*. I re-examined
every check I ran today that asks whether an entry **names** or **supplies** something.

**A citation-shaped check is immune by construction.** The 424 sweep asks whether an entry cites a
paragraph, and a rule number in an entry's prose is unambiguously the entry's own reasoning — it
cannot be a card the entry happens to run. Confirmed rather than assumed, **and the other known trap
was tested too**: a BARE three-digit token matches a prose quantity, which would make an entry read as
citing the block and shrink my owed set. Measured: **of the 26 entries arguing 431.1.c, ZERO cite only
a bare `424`** — every one cites a sub-paragraph. My sixteen had no false negatives.

**That sweep now reads owed = 0**, because rc-manager8 applied all sixteen in `703f305`. It is
therefore a check that is clean at a moment when it was not clean this morning, which is exactly when
`CLAUDE.md` says to pin one: *"a check that comes back clean is the one worth PINNING AS A TEST,
because pinning it costs nothing at a clean state and it can only ever be paid for once."*

**A supply-shaped check has a different analogue and it is NOT the enabler bug.** Hidden and Equip ask
whether the entry supplies a body, and a unit in `uses` IS the supplier — so the failure would be **a
supplier that cannot supply**: a unit stranded in TRASH or DECK, which 818.1.c.2's *"a unit you
control"* and 190.1's body-on-the-board cannot be satisfied by. Measured over the entries my original
sweeps counted as supplied — **68 for Hidden, 118 for Equip — the answer is ZERO and ZERO.** The gates
had no false negatives.

**So of the three instances, exactly one was real, and it was the one already sitting in `CLAUDE.md`
under a different name**: the Ambush predicate returning a confident ZERO because it counts the
Ambusher itself, which 822.1.c and 822.3 forbid from being its own precondition. The Equipment
answer-set bug was the same class arriving from the answer side rather than the supply side.

**The general statement, now that all three are in view: a check has to ask not only WHOSE card a
piece of evidence is, but WHETHER THAT CARD CAN PLAY THE ROLE THE CHECK IS COUNTING IT FOR.** An
Ambusher cannot be its own precondition; a friendly-only detacher cannot answer an opponent; a unit in
the trash cannot stand at a battlefield. Three different reasons, one question.

---

## 20. THE CLASS AIMED AT SHIPPED CODE: ONE CITATION DEFECT, AND THE REST IS SOUND

The class asks whether a check counts something that cannot play the role counted. Aimed at `src/`
and `scripts/` rather than at the catalogue, the two candidates are the **legend** (107.4.b puts the
Legend Zone at no location, so a legend can never be the body that establishes Control under 190.1)
and the **battlefield** (485.5 makes it one of three, at random).

**Both are handled correctly in the code, and one comment cites the wrong paragraph for it.**

### `src/bodies.ts` argues from the paragraph that says the opposite

The module is careful and its `isUnit` is type-based, so a legend — whose `type` is `["legend"]` —
can never be counted as a body. But its comment justifies that with **107.4.c**, which reads *"The
Champion Legend here is a Game Object."* **That is the paragraph that makes a legend look MOST like a
body**, not least. The two that actually make it impossible are its neighbours:

- **107.4.b** — *"This is not a location."*
- **107.4.d** — *"The Champion Legend cannot be removed, moved, or displaced from this zone."*

**107.4.d is the sharpest for this purpose**: a body that can never leave its zone can never walk to a
battlefield, so it can never be the body any `anyBodies` requirement wants. The conclusion in the code
is right and doubly safe; the citation under it is one paragraph off, and it is the same class this
document has now found four times — **the consequence is carried and the rule that produces it is
not**, here in its sharpest form, because the cited paragraph argues the other way.

`src/bodies.ts` is rc-schema's; routed rather than edited.

### Everything else is sound, and one scope note

`scripts/adversarial-check.mjs:247` excludes battlefields from the opponent's answer set with the
right reason in its own comment — *"485.5 selects one battlefield at random"* — and 485.5 reads
*"Each player randomly selects one (1) of their three (3) Battlefields."* **Scope note, not a
defect**: 486.5 makes it a free CHOICE in game 1 of a Match (*"Each player selects one…"*, with the
used ones removed for the rest of the match), so in that game a battlefield answer IS reliably
available. The exclusion therefore under-counts the opponent's options — which for a check that hunts
UNANSWERED holes is the conservative direction, so it over-reports rather than hides. `src/plan.ts`
tracks `battlefieldCopies` because a recommendation consumes one of the three slots. `src/deck.ts`
routes legends and battlefields to their own bags, so neither can reach `deck.main`.

**A class that only ever confirms itself is a story** — rc-manager8's phrase. Aimed at code nobody
here wrote for this purpose, it found one citation and confirmed the rest, which is the right shape
for a result.

---

## 21. THE STALE-COUNT CENSUS: MY WEAKEST NUMBER, CONVERTED

§17's random slice read 13 of 686 and found exactly one hard defect — a perishable entry count. I said
at the time that 13 cannot tell a 5% rate from a 15% one. **The cheapest way to tighten that was not
more reading: a count of entries is MACHINE-CHECKABLE against the live catalogue**, so the one class
the sample found can be swept over all 766.

**Swept: 33,883 strings, 45 numeric class-count claims. Live counts INFINITE 14, BURST 23, ALT_WIN 26,
CHAIN 17, ENGINE 686.**

**The first number was too big for the sixth time today**, and the false positives are worth naming
because they are not the usual kind: **ordinary English** (*"one engine"*, *"two engines that stack"*,
*"two chain items"*, *"one burst of six cards"* — the class names are also common nouns) and **dates**
(*"the 2026-09-04 BURST audit"* matches a number-then-class pattern). A class-count predicate over
prose is fighting the vocabulary, not the catalogue.

**Two real defects, and the narrowing that separates them from the sanctioned ones is already the
rule**: a count carrying an **as-of date** or **named members** is fine — `nasus-ascended-sentinel-arena-hold`
says *"the 2026-09-04 audit found four BURSTs had skipped"* (dated), `lullaby-hold-escort` says *"The
two BURSTs that score in a Hold and sit in Calm/Mind are ahri-blue-sentinel-hold and…"* (named), and
six entries say *"fourteen INFINITEs"*, which is still 14. **A bare present-tense count is the defect.**

### `tianna-wildclaw-point-lock` — five against twenty-six

*"the catalogue's five ALT_WIN lines go straight through this wall."* **ALT_WIN is 26.** Present
tense, no date, no members. The surrounding argument is right and load-bearing — 194.2 makes winning
separate from gaining points, so a points lock does not stop rule 195 — and the number in front of it
has rotted by a factor of five.

### `brynhir-lockout-window` now CONTRADICTS ITSELF, and that is worse than being stale

This is the entry §17 flagged, and it has been **partially** corrected since — by another lane, today.
It now contains BOTH:

- *"of the twelve BURSTs, seven score on a Hold and FIVE score on a Conquer"*, and
- *"ELEVEN BURSTs score on a Conquer, re-measured 2026-09-13 from each entry's own `terminatesIn`"*.

**Five and eleven, in one entry, about one thing.** The re-measurement is excellent — dated, sourced
to `terminatesIn` rather than `steps`, with the reason the steps over-report, and with its members
named. **What it did not do is delete the sentence it replaced**, which is precisely the failure
`CLAUDE.md` records: *"the session that supplies the answer is the one that knows the stale text has to
go, and it goes in the same edit."*

**A partial correction is a new defect rather than half a fix**, because a reader now has two numbers
and no way to tell which survived. Both are in `data/combos.json`, which I have handed back —
reported, not edited.

### CORRECTED WITHIN THE HOUR, AND THE CORRECTION IS THE BETTER FINDING

**The two notable occurrences above are NOT a contradiction and I withdraw that.** rc-manager8 read
both notables in full and they are explicitly-flagged quotations of what was replaced — each says in
the same sentence that the old number is superseded and why. **That is a complete correction that
records what it corrected**, which is better practice than a silent one, and my predicate matched the
correction's own account of itself. A new sub-shape of *right file, wrong sentence*: **the predicate
matched a quotation of the very text the edit removed.**

**The consequence for the check is an asymmetry worth coding, not reading**: a number introduced by a
supersession marker — *used to read*, *this replaces*, *re-measured*, *corrected* — is a RECORD and not
a CLAIM. And it may only be automated in one direction, because **missing a real contradiction costs
one defect, while flagging every correct correction as one would tell authors to stop recording what
they replaced** — a practice worth far more than the check. With that exclusion the whole-catalogue
contradiction sweep returns **ZERO** from the notables.

**But the stale claim is alive in a FOURTH prose field that neither the repair nor the re-read
reached.** `brynhir-lockout-window`'s `notes` — 1,316 characters — contains, after a quotation of
issue #100's refusal, the entry's own present-tense rebuttal: *"is right about Holds and wrong about
the census: of the twelve BURSTs, seven score on a Hold and FIVE score on a Conquer."* **No date, no
members, and it is the exact sentence the notable repair replaced.** The marker exclusion does not
excuse it, because it carries no marker.

**The part that generalises is WHICH FIELD IT HID IN. Measured: 750 of 766 entries (97.9%) carry a
`notes` field, and `notes` holds 754,189 characters against `steps`' 605,980 — it is the
second-largest prose field in the catalogue and larger than `steps`.** One lane repaired both
notables; a manager re-read both notables; neither pass reached a field on 98% of entries.
rc-schema's `prose-emphasis` guard *does* walk `notes`, so the tooling knows about it and the repairs
did not.

**The rule is cheaper than any checker: a repair must NAME THE FIELDS IT COVERED**, because *"I fixed
the entry"* and *"I fixed the notables"* look identical in a commit message and differ by three
quarters of a megabyte.

---

## 22. THE REPAIR WAS WIDER THAN THE GUARD, SO 440,000 CHARACTERS ARE CLEAN TODAY AND UNPROTECTED TOMORROW

The `notes` miss is a coverage question rather than a `brynhir` question, so I enumerated **every
string-valued path in `data/combos.json` — 28 of them — with its volume**, and checked each against
what the shipped guards actually walk.

| path | chars | values | walked by |
|---|---:|---:|---|
| `prerequisites.notable[]` | 2,682,540 | 5,340 | prose-emphasis |
| `notes` | 754,754 | 750 | prose-emphasis |
| `steps[]` | 602,463 | 4,283 | prose-emphasis |
| **`uses[].note`** | **440,413** | **1,898** | **nothing** |
| `sources[].quote` | 319,545 | 761 | prose-emphasis, source-quotes |
| `prerequisites.easy[]` | 283,676 | 1,413 | prose-emphasis |
| `terminatesIn` | 113,832 | 766 | prose-emphasis |
| `netPerIteration` | 59,546 | 541 | prose-emphasis |
| **`anyBodies.note`** | **10,710** | **82** | **nothing** |

**`uses[].note` is the fourth-largest prose field in the catalogue and nothing walks it.** Read from
the guard's own source, it walks exactly `steps`, `prerequisites.notable`, `prerequisites.easy`,
`terminatesIn`, `netPerIteration` and `notes` — six named fields, which is why the gap is invisible:
the list looks complete. `anyBodies.note` is the newest field in the schema, created today, and is
also outside it.

### Measured against the same predicate, both are clean — and the clean explains itself

Running the shipped predicate (position-0 allowance, every-occurrence fix) against exactly those two:
**`uses[].note` — 1,721 quoted spans of 25+ characters, of which 1,120 ARE quotations of a source,
and ZERO not verbatim except for case. `anyBodies.note` — 2 spans, 2 quotations, ZERO.** Non-vacuous
by a wide margin: the check had 1,120 real opportunities to fire in the unguarded field alone.

**Why it is clean is the finding.** rc-gap's repair probe walks **every object value**, skipping only
`sources` — so the #202 sweep cleaned all 440,413 characters of `uses[].note` along with everything
else. **THE REPAIR WAS WIDER THAN THE GUARD.** The field is therefore clean today because somebody
fixed it, and unprotected tomorrow because nothing watches it.

**That is the cheapest possible moment to widen the guard**, by the argument this document has already
made twice: a check that comes back clean is worth pinning precisely because pinning costs nothing at
a clean state. Two field names added to one array.

**And the general shape, which is the same one as the `notes` miss one section up:** a guard that
enumerates its fields by name looks complete and silently stops covering the schema the moment the
schema grows — `anyBodies.note` was created today, by a repair I reported, and was outside the guard
the day it was born. **A repair must name the fields it covered; a guard must say how it would learn
about a new one.**

### The same census on `data/synergies.json`: fully covered, and the contrast is the point

**16 string-valued paths, 220 rules, and the guard covers every prose character of it.** The two
free-text fields are `why` (193,245 chars) and `partner.excludes[].why` (43,199) — **both walked.**
Everything else is not prose and does not want a quote check: `basis.combos[]` and
`partner.excludes[].card` are ids, `basis.rules[]` are rule numbers, `partner.textMatches` and
`partner.textExcludes` are **regex patterns**, and `id`, `name`, `status`, `anchor`, `reviewed`,
`reviewedSet`, `partner.types[]`, `partner.tags[]` and `basis.readings[]` are labels and enums.

**So the same guard is complete on one file and 451,000 characters short on the other, and the
difference is the SHAPE OF THE SCHEMA rather than the care of the author.** `synergies.json` has two
prose fields and the guard names two. `combos.json` has eight and the guard names six.

**A name-enumerating guard is safe exactly when the schema is flat and small — and that is not
something the guard can know about itself.** Which is the argument for the inversion offered to
rc-schema: walk every string value and exclude by name, so a new field is covered by default and has
to be opted out deliberately. On `synergies.json` that inversion would change nothing and cost
nothing; on `combos.json` it would have covered `uses[].note` from the day it existed and
`anyBodies.note` from the hour it was created.

### The repo already contains both patterns, and the safe one is shipped

The recommendation is not a preference — **`test/rule-refs.test.ts` already does it the safe way, two
files over.** Its `collect()` walks every string in every node with no field filter at all:

```
const walk = (node, id, path) => {
  if (typeof node === "string") { for (const ref of node.match(REF) ?? []) hits.push(...) }
  else if (Array.isArray(node)) node.forEach((v, i) => walk(v, id, `${path}[${i}]`));
  else if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) walk(v, ...);
};
```

**So rule references in `uses[].note` ARE checked and quoted passages in the same field are not** —
same file, same 440,413 characters, two guards, one of which sees them. `rule-refs` will also cover
any field the schema grows without anyone touching it, which is precisely what `prose-emphasis` cannot
do and what let `anyBodies.note` be born outside its coverage.

**Two patterns for one problem in one repo, and only one fails safe.** That is a stronger argument
than any I could make from first principles, and it is the one to hand the schema owner.
