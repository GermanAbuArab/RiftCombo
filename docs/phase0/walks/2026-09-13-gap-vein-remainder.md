# The remaining citation-gap vein — dispositions for all 38 (#187, rc-gap, 2026-09-13)

`node scripts/claude-md-gap.mjs` at `minCitations = 10` prints **43** rows against commit `32fa959`.
Five of those (`383.4.d`, `431.2`, `464.2`, `356.4.c`, `465`) were already disposed by the manager
and still print because no bullet was applied for them. **My population is the other 38, and every
one is disposed below.**

NON-VACUITY, reproduced by `.scratch-gap/all43.mjs` and `.scratch-gap/family.mjs`:
2,381 headings parsed; catalogue blob 6,926,218 bytes; `CLAUDE.md` 511,387 bytes; 38 targets, each
read verbatim out of `data/Riftbound-Core-Rules-2026-07-16.txt` with the form-feed-safe anchor.

Disposition: **26 real gaps** (12 strong, 14 small completions), **1 correctly absent**, plus
**one methodological finding** — the tool's `CLAUDE.md` side suppresses gaps the same way its
catalogue side used to inflate them, and five rows are hidden by it today.

---

## 0. THE INSTRUMENT IS STILL HALF BROKEN, AND ITS BLIND SPOT GROWS WITH THE CATALOGUE

`1727a80` fixed the **catalogue** side of `cnt()`. The **`CLAUDE.md`** side uses the identical regex
and has the identical collision, in the suppressing direction: a bare three-digit rule number also
matches a plain QUANTITY in prose, and the gap tool drops any rule whose `CLAUDE.md` count is
non-zero. `.scratch-gap/suppress.mjs` reads every hit for the 55 bare heads cited 10+ by the
catalogue and non-zero in the file. **Five rows are suppressed by hits that are not citations:**

| rule | catalogue | the "citations" in CLAUDE.md |
|---|---:|---|
| `100` | 24 | *"its 100 partners"*, `argv[2] = "100 299"`, *"Deployments Created per Day: 100"* |
| `153` | 29 | *"issue numbers count as rules and `153`"*, *"run 153/61/23 here"* |
| `300` | 27 | *"#187/300-499 lane"* x3, *"158 rows in 300-499"*, *"Riot's example is 300 of 250"* |
| `348` | 14 | *"against 348's 381 and 345's 73"* — a count of its own sub-rules |
| `762` | 21 | *"exactly one entry in 762"* — the catalogue SIZE |

Four collision sources, three of them new: a prose quantity, a **source line number**
(`src/cards.ts:124` reads as rule 124), a **lane label** (`300-499`), and — the one that will keep
biting — **the catalogue's own entry count**. `755`, `762` and `766` all sit within a few of 766
entries, and `762`'s catalogue count of 21 is *also* fake for the same reason (*"TWO entries out of
762"*, *"exactly ONE entry in 762"*). **Two bugs cancelled and the row never printed.**

**The prediction worth acting on: as the catalogue grows past 800 entries, rules 767 through 829
will be suppressed one at a time as the entry count passes each of them** — and that band is the
keyword block this project leans on hardest. The fix is not a better regex, it is to require a
citation-shaped context, or simply to print the hits for manual reading as `suppress.mjs` does.

Of the five, `100` / `153` / `300` are **section headings** (*"Game Concepts"*, *"Spells"*,
*"Playing the Game"*) — correctly absent, pure structure, and their catalogue counts are fake too.
`762` is real prose (*"When instructed to name a card, a player must name a card that is legal in
the Format being played"*) and governs exactly one card — `VEN-132 Fallen Feline`, *"name a spell.
While I'm at a battlefield, opponents can't play spells with that name"* (`UNL-138 The List` names a
TAG, so 762 does not reach it) — **so you may not name a banned spell**; a cute one-liner whose
10+ bar is not honestly met. `348` is dealt with in §3.

---

## 1. REAL GAPS — STRONG (12)

### 725.1 — the paragraph that makes the whole Svellsongur family legal. Catalogue 12, file 0.
> *"If an Attached card has a Passive or Replacement ability that applies during the process of
> Attaching or a Triggered ability that triggers off of Attaching, that text exists and can be
> processed as it Attaches."*

`SFD-059 Svellsongur` prints ***"As this is attached to a unit, copy that unit's text…"*** — a passive
that applies during the process of Attaching. 718.2 makes an attached card's printed Rules Text
Inactive, so without 725.1 the copy clause would be switched off before it could ever apply.
**`SFD-059` appears 58 times in `combos.json` and CLAUDE.md carries a large Svellsongur apparatus
(2^v composition, 434.1.c, 477.2.c, 479.1, 480.3, 476.1, R6 = A) with the existence chain missing.**
`VEN-137 Shady Spectacles` is a second card of the same shape (*"As this is attached to a unit,
choose another friendly unit. The equipped unit becomes a copy…"*) and is in no bullet.

*Method note: my first probe swept `when (you )?attach` and returned "zero Equipment with an
attach-triggered ability" — the cards say **"As this is attached"**. The singular-verb/wording trap
again; only reading the catalogue's own citations caught it.*

### 355.8 — the rule whose EXCEPTION this file already carries three times. Catalogue 11, file 0.
> *"In order to put a spell or ability on the chain, valid choices must be made for all targets."*

This is the paragraph under CLAUDE.md's hardest-won lesson — *"filler must be unconditionally
castable, and a targeting spell never is"*, the `VEN-061 Decree of Insight` case that evaporated six
Swain points — **and that bullet cites no rule at all.** 355.13 (*"any number"* / *"up to"*, including
zero) is its exception and is carried **three times**. Sixth instance of *the exception is carried
and the rule is not*, after 355.7, 136.2.c, 811.6, 384 and 316.8.b.1.

### 187.1 — the Recruit, the one token in the census this file does not carry. Catalogue 13, file 0.
> *"A 1 [M] Recruit token is a domainless unit token with 1 Might and the Recruit tag."*

CLAUDE.md carries 187.2 Sprite, 187.3 Sand Soldier, 187.4 Mech, 187.5 Gold, 187.7 Bird, 187.8 Brush
and 187.9 Baron Pit — **every sibling except the most-used token in the catalogue.** It is the source
of the Might-1 figure the whole `OGN-133 Flurry of Blades` family turns on. And the **tag half is
load-bearing exactly as 187.4's Mech tag is**: `OGN-246 Viktor, Leader` reads *"When another
**non-Recruit** unit you control dies, play a 1 Might Recruit unit token into your base"* — so
187.1 giving the token the Recruit tag BY RULE is why **Viktor can never be fed by his own output.**

### 359.3.f.3 — the other half of the "here is read at execution" split. Catalogue 13, file 0.
> *"Some information used by triggered abilities is referenced from the trigger condition of the
> ability. This information is checked when the trigger condition is fulfilled."*

CLAUDE.md cites 359.3.f.2 five times for *"'here' is read at EXECUTION"*. 359.3.f.3 is the opposite
case and nobody has it: information drawn from the **trigger condition** is locked when the trigger
is placed. **Riot's worked example is a pool card, printed word for word** — `UNL-082 Lillia, Fae
Fawn`, *"When I move from a location, play a 3 Might Sprite unit token … there"*: the location is
noted as the trigger goes on the chain, so moving her to a non-board zone in response does not
change where the Sprite lands.

### 811.3 — a Hidden card may simply be PLAYED, and that bounds a refusal. Catalogue 13, file 0.
> *"Instead of being hidden, a card with Hidden may be played for its cost as normal, at its normal
> timing with no restrictions on targeting."*

CLAUDE.md's [Hidden] apparatus is 811.1.b, 811.1.c.1, 811.1.d.2 and 811.6, and it states flatly that
***"No [Hidden] removal can play the attacker-side role of the #118 family … Fox-Fire, Hidden Blade
and Sprite Call are defender-side only."*** That refusal is scoped to the FREE route. 811.3 is the
paid route, and it has **no restrictions on targeting** at all — so the same three cards are
offence-capable for full cost. **43 printings carry [Hidden]**; the file reaches this fact once, from
the card side (`OGN-107 Ava Achiever` plays from hand), and never as the rule.

### 383.2.c.2 — the negative mirror of the clause this file carries positively. Catalogue 12, file 0.
> *"A Game Object will not be able to successfully evaluate its Trigger Condition, however, if it
> leaves the zone that its Trigger is active from at the same time that its Trigger is satisfied."*

CLAUDE.md carries 383.2.c and 383.2.c.1 — an object **entering** a zone at the same time as the event
DOES trigger. 383.2.c.2 is the leaving case and it does NOT. **Riot's worked example is again
`OGN-246 Viktor, Leader`**: he does not trigger if he and another unit die in the same Cleanup.
That is the whole board-wipe / `OGN-133` interaction for every death-watcher in the catalogue, and
the file's simultaneity model (370.1.a.2, 303.1/303.2) has no statement of it.

### 359.3.e.12 — the answer to Baited Hook, named by Riot. Catalogue 10, file 0.
> *"If the spell checks information about a target that is no longer legal … that check returns
> 'null' and all calculations based on it are ignored."*

**Both worked examples are catalogued cards.** `OGN-242 Baited Hook` — bounce the friendly unit in
response and its Might is null, so the controller looks at five cards and **can choose none of them**.
`SFD-107 Strike Down` answered by `SFD-011 Angle Shot` detaching the Equipment — the rule uses
exactly the Reaction-speed detach the #200 batch-1 correction added. CLAUDE.md's Baited Hook bullet
(#191 batch 23) is about 705/711 and the trash; **this is the other failure mode and the adversarial
pass never named it.**

### 149.1 — three words replacing an argument from absence. Catalogue 11, file 0.
> *"Gear enter play Ready."*

CLAUDE.md says *"gear enters ready since 143.4 exhausts only units"* and reaches the same place via
359.2.d. 149.1 states it positively and directly, and it is load-bearing across the Ancient Henge
re-play line, *"no Equipment in this pool is ever exhausted"* and the Gold-token analysis.

### 158.2 — a later clause that rewrites an earlier one, Riot quoting a pool card. Catalogue 11, file 0.
> *"If a later part of a spell applies a Replacement Effect that alters earlier parts of the spell,
> apply those replacement effects as appropriate."*

Riot's example is `OGN-254 Noxian Guillotine` verbatim — *"Choose a unit. Kill it the next time it
takes damage this turn. [Legion] — Kill it now instead."* — ending ***"the instruction to kill it the
next time it takes damage is ignored, even if the unit remains on the board somehow."*** So the
delayed kill is GONE, not merely superseded: a Legion Guillotine that fails to kill leaves nothing
behind. CLAUDE.md already names Noxian Guillotine, as one of 391's worked examples, in a different
argument; the parent 158 is cited zero times by the catalogue and zero by the file.

### 471.2.c — a paragraph that reads as refuting the Blue Sentinel family. Catalogue 10, file 0.
> 471.2.b: *"Hold abilities trigger at a Battlefield that was Held."*
> 471.2.c: *"These will only trigger when the Battlefield is Scored; I.E. These cannot be triggered
> more than once per turn for a player."*

CLAUDE.md sources the once-per-turn cap entirely to 470, which caps **Scoring**. 471.2.c caps the
**trigger**, and read alone it refuses `UNL-087 Blue Sentinel` — *"Your hold effects for holding here
trigger an additional time"* — and with it a large share of the 23 BURSTs. It does not, because rule
002 makes card text beat rules text and R1 = A was ruled with stacking. **Carry it as a trap-note or
the next session refuses the Sentinel family on a paragraph it has just discovered.**

### 356.1.b.2 (+ .b.1 + 356.1.a) — the cost-replacement trio whose exception is carried. Catalogue 11 / 10 / 10, file 0.
> 356.1.a: *"If an ability or instruction allows you to play a card 'for [Cost]', replace the card's
> Base Costs with [Cost]."*
> 356.1.b.1: *"'ignoring its cost' → its base Energy cost and base Power cost are set to zero."*
> 356.1.b.2: *"'ignoring its Energy cost' or 'ignoring its Power cost' → **only the appropriate cost
> is set to zero, and the remaining cost still applies**."*

CLAUDE.md carries only 356.1.b.3, the optional-additional-cost exception, three times. Measured over
`data/corpus_flat.txt`: **15 cards print *"ignoring its cost"*, FIVE print *"ignoring its Energy
cost"*, none print *"ignoring its Power cost"*.** The five are `OGN-196 Soulgorger`, `OGN-198 The
Harrowing`, `SFD-084 Jayce, Man of Progress`, `SFD-140 Fizz, Trickster`, `UNL-179 Rift Herald` — and
**all five print Riot's own reminder *"(You must still pay its Power cost.)"***, i.e. the rule is
printed on every card it governs. 356.1.a is what prices **[Flow]** (17 printings): *"play this from your trash
for its Flow cost"* **replaces both base costs**, which is why `VEN-105 Twilight Step` (base E2 + 1
Power) pays E4 + a Chaos rune on the replay and no base Power at all.

---

## 2. REAL GAPS — SMALLER, BUT EACH COMPLETES SOMETHING THE FILE HALF-CARRIES (14)

- **441.2.a** (12, 0) — *"When a Game Object becomes Empowered as a result of the Empower game
  action, that is an **event** that can similarly be referenced by game effects and abilities."*
  CLAUDE.md cites 441.2 five times for Empowered as a permanent **state**. The whole #159 finding —
  *"the partner set of every empower anchor is the DISEMPOWERERS"*, a *"when I become [Empowered]"*
  unit firing once per copy per game — **is a claim about the EVENT and has only the STATE paragraph
  under it.** Identical shape to 708-against-709, which #207 disposed yesterday.

- **383.3.a.3** (12, 0) — *"If 'you may' or 'they may' appears in any later part of the Effect of a
  triggered ability, it is decided on resolution … **The ability is always finalized to the chain.**"*
  Worked example `Ornn, Blacksmith`. CLAUDE.md carries only the LEADING case (383.3.e.2.a, *"a blind
  commitment"*). **Where the "you may" sits decides blind-at-finalization against informed-at-
  resolution** — the same word-order test as 383.2.a.1, which this file already leans on.

- **801.3.a.3** (12, 0), with **801.3.a.2** (10, 0) as its pointer — *"If an effect that grants a
  Keyword does not specify a duration, the duration is as long as that Game Object remains on the
  Board or in its current Non-Board Zone."* **So a granted keyword is permanent while the body stays
  put and is STRIPPED by a bounce** — which reaches every grant in the file (`UNL-215 Yuumi` granting
  Tank, `SFD-183 Purifier`, `VEN-147 Eye of Twilight` granting Tank at Action speed after the
  attackers are designated, `SFD-054 Jax`). Nobody has stated the bounce half.

- **826.4.b** (12, 0) — *"Units with Backline are invalid assignments until all units without
  Backline have lethal damage assigned to them."* **The keyword-side mirror of 815.1.c.2**, which
  this file cites constantly for Tank. CLAUDE.md derives Backline's ordering from 465.2.c.6's worked
  *example*; this is the rule, and it adds the multi-Backline case (the attacker picks among them).

- **422.4** (11, 0) — *"a player must Discard as many cards as possible … If instructed to discard
  more cards than they have, further discard instructions are ignored"*, worked example
  `Undercover Agent`: with one card you discard one **and still draw 2**. This is the cost/effect
  split the file loves, in the discard lens (#95): **a discard as an EFFECT degrades gracefully,
  while a discard as a COST fails outright** under 422.3 / 203.3, both carried.

- **355.11.b** (12, 0) — if a GROUP of targets stops collectively meeting the restriction at
  resolution, the controller **chooses a legal subset** rather than fizzling. Riot's example is
  `OGN-256 Fox-Fire` across four Recruit tokens with a Reaction pump. So pumping in response
  **shrinks** a *"total Might N or less"* removal, it does not blank it — and the tail is sharper
  still: you may not add units that were never chosen, but you **may** still affect chosen units that
  left, as long as they are all at one battlefield.

- **359.3.e.16** (10, 0) — *"If a Delayed Ability's duration has ended before it was generated, the
  Delayed Ability is not generated."* Riot's first example is `OGN-289 Targon's Peak`, catalogued in
  `sprite-queen-targon-peak-conquer-cycle`: **conquer it during the Ending Phase and the ready-2-runes
  never happens.** Second example `Akshan, Mischievous` — leave the board in response to your own play
  effect and you never gain control of the gear *"even for a moment."*

- **359.3.e.9.a** (11, 0) — counting the targets of a Finalized Chain Item **includes mistargeted
  choices and excludes targets that went to a non-board zone.** That is the operating manual for
  `UNL-106 Repulse`, one of only two cards in the pool that can answer an ETB trigger: against a
  three-target attack trigger, **moving two units away does not make Repulse legal and killing them
  does.** Riot works it with Volibear, Flash and Heedless Resurrection.

- **428.5.c.1** (10, 0) — *"The player responsible for the deal action is responsible for the kill
  action."* CLAUDE.md carries 428.5.c (attribution to the spell) four times and 417.6.b.4 (the
  controller of an enemy unit is responsible for the damage **their** unit deals, triggers and all).
  This is the missing third step: in the Challenge / mutual-damage family, **the opponent is
  responsible for the KILLS on their half too**, so a *"when you kill a unit"* payoff pays them.

- **824.1.b.1** (11, 0) — *"[Level N] is functionally short for 'While you have [N] or more XP, this
  card **gains** "[Text]"'."* The long form is why 824.1.d (115 catalogue citations) switches the
  rung off the moment XP drops, and why *"a [Level] rung is a THRESHOLD YOU HOLD and not a price you
  pay"* is true — it is a **conditional grant**, which also ties it to 801.3.a.3 above.

- **819.2** (10, 0) — *"Multiple instances of Quick-Draw do not trigger separately and have no effect
  beyond the first."* It has a live case: `SFD-054 Jax, Unmatched` grants *"Your Equipment everywhere
  have [Quick-Draw]"*, and **4 of the pool's 40 Equipment already print it** (`SFD-022 Long Sword`,
  `SFD-056 Sterak's Gage`, `SFD-064 Cloth Armor`, `SFD-186 Spinning Axe`), so Jax's grant is dead on
  those four. An excludes fact for the synergy layer. **816.2** (11, 0), *"Multiple instances of
  Temporary are redundant"*, is the same clause for the six Temporary granters the file already
  names; both join the redundancy family with the carried 815.2 and 810.2.

- **735** (12, 0) — *"These effects create a temporary Additional Turn owned by that player that is
  **inserted into the turn queue after the current turn**."* CLAUDE.md has the four-consecutive-turns
  ceiling and the last-created-is-taken-first ordering from **738's example**; 735 is the rule that
  generates both, and the whole CHAIN class stands on it. Catalogue citations are genuine and
  load-bearing (*"735 inserts it 'after the current turn', so the queue is the same"*, *"735 and 737
  mean the opponent never acts once the first Time Warp resolves"*).

- **434.1.b.1** (13, 0) — *"The order of the Attached cards has no bearing on the application of
  effects."* Worth carrying precisely **because** CLAUDE.md says *"480.3 falls back to timestamp order
  (attach order)"*: a reader can take that to mean re-stacking the pile changes outcomes. It does
  not — 480.3 orders by **timestamp**, 434.1.b.1 says the **physical stack** is cosmetic. The two are
  about different orderings and only one of them is in the file.

- **355.4** (12, 0), with **449.1** (11, 0) — *"For Spells and Abilities that Move one or more Units,
  choose a valid Location as the Move Destination **for each Move** that will be performed."*
  CLAUDE.md carries 144.3 / 144.3.a: multiple **Standard** Moves are one action to a **shared**
  destination. **An effect move is the opposite and nobody has said so.** Measured over the pool's ten
  multi-unit effect movers, two prove it from both sides: `UNL-054 Tricksy Tentacles` has to print
  *"to a **single** location"* to take the freedom away, and `UNL-083 Smoke and Mirrors` uses it —
  *"move each to the other's location"*, two destinations in one effect. 449.1 (*"The source of the
  Move will provide details on any restrictions on legality for Destination"*) is the one sentence
  under the carried conclusion that a move by effect escapes 144.4 entirely.

- **312.2.b** (11, 0) — *"When the turn is in a Showdown State and they gain Focus."* The third member
  of 312.2's list of priority grants, beside 312.2.a (6 citations in the file) and 312.2.c (12).
  CLAUDE.md says *"312.2.a's Main-Phase priority and 335.1's Showdown priority are TWO separate
  grants"* — **reaching two blocks away for a paragraph sitting in the same list.**

- **464.2.d** (10, 0) — *"3. The Attacker gains Focus."* CLAUDE.md derives this from 345 plus
  464.2.c.1 and remarks *"no entry had ever said so"*; 464.2.d says it in the combat sequence itself
  and fixes **when** — step 3, after the designations.

- **359.2.b** (11, 0) — *"Execute all rules text on the card, from top to bottom."* The clause-order
  rule for a resolving permanent, beside the carried 359.2 and 359.2.d. *I did not measure a
  population of multi-clause permanents where the order changes an outcome; carry it as the ordering
  rule, not as a finding.*

- **820.1.d.2** (10, 0) — *"Any instructions not performed on resolution of the spell or ability are
  ignored."* 055.1 for [Repeat]: with 820.2.a allowing different targets, **a Repeat whose second
  execution has no legal target still happens and simply does nothing** — the additional cost is not
  refunded and the spell is not invalidated.

- **814.1.d.1** (10, 0) — *"Shield remains in effect as long as the Unit maintains the Defender
  designation."* The exact twin of **807.1.d.1**, which #207 carried yesterday for Assault. Half a
  pair was taken; this is the other half. **809.1.b.3** (10, 0) — *"If X is omitted, it is presumed to
  be 1"* — completes the third trio member beside the carried 807.1.b.3 (bare Assault = 1) and
  814.1.b.3 (bare Shield = 1), which matters to the 47 Deflect printings the file prices.

---

## 3. CORRECTLY ABSENT — MEASURED (1, plus 348 and the section headings from §0)

### 107.3.c — the facedown ENTRY condition, redundant three times over in this pool. Catalogue 12.
> *"Cards can only be placed in or occupy the Facedown Zone if the controller of the card also
> controls the associated Battlefield."*

Measured: `data/corpus_flat.txt` has **9 lines mentioning facedown / face down, and every one is
[Hidden]** — `OGN-101 Mushroom Pouch` and `UNL-014 Monster Harpoon` read a facedown card,
`OGN-181 Pack of Wonders` returns one, `SFD-121 Black Market Broker` and `UNL-023 Katarina` watch the
play, `UNL-053 Scuttle Crab` is a reveal. **There is no non-Hidden route into a Facedown Zone**, and
811.1.b — which the file carries — already states the control requirement for the only route that
exists (*"hide this facedown at a battlefield you control"*). CLAUDE.md then carries **three**
paragraphs for the exit half (811.1.b's tenure clause, 107.3.d, 466.5.c). Nothing in the pool reads
107.3.c independently.

### 348 (suppressed, catalogue 14) — a carried sibling already says it.
> *"If all players pass Focus without playing a spell or activating an ability, then the Showdown
> Closes."*

Real prose with real catalogue citations (*"345 gives you Focus, 348 closes it, 348.2.a establishes
Control"*). But 347.2.a — *"If all Players have passed once in sequence, the Showdown ends"* — says
the same thing and **is what CLAUDE.md already cites** for that event in the #187 batch-25
correction. Worth one clause only as a **precision note**: the catalogue writes `348` for the close
and the file writes `347.2.a`, and a reader chasing one will not find the other.

---

## 4. WHAT THE VEIN LOOKS LIKE NOW

Of 38: **26 real gaps, 1 correctly absent, 5 suppressed rows exposed (3 of them section headings),
and 348 dispositioned as a sibling duplicate.** The distribution is the same one #207 found and is
worth stating as a property rather than a coincidence — **almost every gap here is one half of a
pair whose other half the file already carries**: 359.3.f.2/.f.3, 383.2.c.1/.c.2, 383.3.e.2.a/383.3.a.3,
441.2/441.2.a, 355.13/355.8, 815.1.c.2/826.4.b, 807.1.d.1/814.1.d.1, 807.1.b.3+814.1.b.3/809.1.b.3,
144.3.a/355.4, 356.1.b.3/356.1.b.1+.b.2, 470/471.2.c, 480.3/434.1.b.1, 738/735, 187.2-.9/187.1.
**A file built by promoting findings will always carry the half that was surprising and drop the half
that was assumed**, which is exactly what this tool is for — and it is why the suppression bug in §0
matters more than the ranking it distorts.

Four of the strong rows are the project's cheapest vein arriving again: **the Core Rules name a pool
card** — `UNL-082 Lillia, Fae Fawn` (359.3.f.3), `OGN-246 Viktor, Leader` (383.2.c.2),
`OGN-242 Baited Hook` + `SFD-107 Strike Down` (359.3.e.12), `OGN-254 Noxian Guillotine` (158.2),
`OGN-289 Targon's Peak` (359.3.e.16), `OGN-256 Fox-Fire` (355.11.b).

Probes: `.scratch-gap/all43.mjs`, `.scratch-gap/extract.mjs`, `.scratch-gap/family.mjs`,
`.scratch-gap/suppress.mjs` (gitignored, on disk).
