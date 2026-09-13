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

CLAUDE.md cites 359.3.f.2 five times for *"'here' is read at execution"*. 359.3.f.3 is the opposite
case and nobody has it: information drawn from the **trigger condition** is locked when the trigger
is placed. **Riot's worked example is a pool card, printed word for word** — `UNL-082 Lillia, Fae
Fawn`, *"When I move from a location, play a 3 Might Sprite unit token … there"*: the location is
noted as the trigger goes on the chain, so moving her to a non-board zone in response does not
change where the Sprite lands.

### 811.3 — a Hidden card may simply be PLAYED, and that bounds a refusal. Catalogue 13, file 0.
> *"Instead of being hidden, a card with Hidden may be played for its cost as normal, at its normal
> timing with no restrictions on targeting."*

CLAUDE.md's [Hidden] apparatus is 811.1.b, 811.1.c.1, 811.1.d.2 and 811.6, and it states flatly that
***"No [Hidden] removal can play the attacker-side role of the #118 family"*** … ***"Fox-Fire,
Hidden Blade and Sprite Call are defender-side only"*** That refusal is scoped to the FREE route. 811.3 is the
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
> 356.1.b.1: *"If a card allows a player to play a card 'ignoring its cost,' its base Energy cost
> and base Power cost are set to zero."*
> 356.1.b.2: *"If a card instructs a player to play a card 'ignoring its Energy cost' or 'ignoring
> its Power cost,' only the appropriate cost is set to zero, and the remaining cost still applies."*

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
  *"the partner set of every 'empower' anchor is the DISEMPOWERERS"*, a *"When I become [Empowered]"* unit firing once per copy per game — **is a claim about the EVENT and has only the STATE paragraph
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

- **422.4** (11, 0) — *"a player must Discard as many cards as possible from their hand. If instructed to discard more cards than they have in their hand, further discard instructions are ignored"*, worked example
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
  Delayed Ability is not generated and any instructions related to it are ignored."* Riot's first example is `OGN-289 Targon's Peak`, catalogued in
  `sprite-queen-targon-peak-conquer-cycle`: **conquer it during the Ending Phase and the ready-2-runes
  never happens.** Second example `SFD-109 Akshan, Mischievous` — leave the board in response to your own play
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
  CLAUDE.md says *"312.2.a's Main-Phase priority and 335.1's Showdown priority are two separate
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

---

# SECOND SLICE — the 8-and-9 citation band (36 rows), same day

The 10+ band is exhausted, so I took the next one rather than stop. `.scratch-gap/band.mjs 8 9`
prints **36 rows** (13 at 9 citations, 23 at 8) not carried by `CLAUDE.md`. Band sizes for planning:
43 at 10+, 56 at 9+, 79 at 8+, 104 at 7+, 147 at 6+, 190 at 5+.

**Yield stays high: 22 real gaps, 8 correctly absent, 6 folded into a bullet above.** Precision has
not fallen off the way the orphan-neighbour probe's did, because this join is exact.

## 2A. REAL — the seven I would apply from this band

- **446.3.c** (8) — *"Moving does not use the Chain, nor is it able to be Reacted to."* CLAUDE.md
  runs a large movement and evacuation apparatus and reasons about response windows constantly
  (323.10, 323.13, *"Only a Triggered Ability reaches that window"*, *"after a plain move the very next Cleanup stages the Combat (323.9) and opens it (323.13) with no gap"*). **This is the sentence under all of it** and the
  file does not have it: the move itself is unrespondable, so the only window is whatever trigger
  the move fires.

- **308.1.a** (8) — *"Only cards and abilities with the Action or Reaction keywords can be played or
  activated in a Showdown State."* The file derives this again and again from 358.4, 806.1.c.1,
  813.1.c.1 and the 331.1.a / 343.1.a pair. **One sentence covers it**, and it is the paragraph the
  #187 batch-25 correction (the withdrawn lock-out remedy) was reasoning around.

- **811.2** (8) — *"Abilities and instructions of hidden cards other than the choices listed above
  function as normal"*, worked with `OGN-053 Stand United` — **another pool card Riot names** — where
  the first half must choose at the hidden battlefield and **the second half reaches the whole board.** This is the POSITIVE statement of the
  file's own *"811.1.d binds the HIDDEN CARD and never the watcher"* and of the Tideturner escape —
  both of which it currently derives card by card. Pairs with **811.1.d.3** (9), the third member of
  a trio whose first two the file cites heavily: *"If a hidden spell or a play effect of a hidden
  permanent causes you to play a unit, you must choose to play that unit at that battlefield"* —
  which is exactly what `OGN-107 Ava Achiever` is doing when she says *"If it's a unit, play it
  here."*

- **816.3** (9) — *"Temporary, and whether or not a permanent has Temporary, is a characteristic of
  the permanent and may be checked or referenced by other Game Effects."* **Measured: ELEVEN cards
  read it** — `OGN-094 Sprite Call`, `OGN-106 Sprite Mother`, `UNL-048 Trevor Snoozebottom`,
  `UNL-069 Sprite Burst`, `UNL-076 Petal Pixie`, `UNL-078 Sprite Fountain`, `UNL-082 Lillia, Fae
  Fawn`, `UNL-083 Smoke and Mirrors`, `UNL-084 Sprite Queen`, `UNL-189 Bashful Bloom`,
  `UNL-208 Black Flame Altar`. `UNL-189` prices itself off the count (*"costs 1 Energy less for each
  friendly unit with [Temporary]"*). Joins the characteristic family with the carried 807.3 —
  and **813.5.b** (8) is the third member (*"Whether or not a Spell has Reaction is a characteristic
  … may be checked"*), with exactly one live case, `VEN-160 Mystic Vortex`, whose own reminder
  *"(Hidden cards have [Reaction].)"* corroborates the carried 811.6 from the card side.

- **429.3.a** (9) — *"When an Add ability is activated in this way, it immediately finalizes and
  resolves, **even during the resolution of spells and abilities**."* The companion to 444.2.c, the
  paragraph behind #200 batch 4's reopening. 444.2.c says the instruction to pay is a window;
  **429.3.a says the Add resolves mid-resolution**, which is wider and is what makes the whole
  "check whether the runes are simply still on the board" class work.

- **373** (9) — *"If more than one event occurs simultaneously that Replacement Effects could apply
  to, each event is treated separately and individually … and Replacement Effects with the same
  controller are applied in the order of their controller's choosing."* Worked example: two of your
  units die in one Cleanup under `Zhonya's Hourglass` and **you choose which death to save.** The
  file carries 373.1 (turn order) and 373.2 (one replacement covers one sequence — the Soraka fork);
  373 is the ordering half and completes that picture.

- **437.3** (9) — *"reduce the Prevent Value being tracked on the Unit … by the prevented amount."*
  **Prevent is a depleting POOL, not a standing shield** — a Prevent 3 eats three damage in total,
  not three per instance. The file carries 437.4, 437.5 and 437.6.a and never the depletion.
  **715.4.a** (8) is its companion and names a card the file already carries: reduction counts the
  Bonus Damage in the total, worked with `OGN-296 Void Gate`, so Prevent 3 against a 3-damage spell
  at the Gate still lets **1** through.

## 2B. REAL — moderate (10 more, each one line)

**135.2.b.3** (8): an *"as you play me"* additional-cost instruction **is not executed again by
[Repeat]**, because the Repeat execution happens at resolution, after that instruction has already
run — an excludes fact over the 17 as-an-additional-cost cards the file lists. ·
**356.2.a.1** (9): the **discriminator** between mandatory and optional additional costs — mandatory
ones *"use the phrase 'as an additional cost' and don't include the word 'may.'"*; the file's
#187 batch-22 bullet classifies 17 cards and cites 356.2.b only. ·
**359.3.e.5** (8): an illegal target is unaffected **and the rest of the spell still happens** — the
rule under "a cantrip removal still cantrips", with three worked examples, one naming
`OGN-213 Hidden Blade` and `OGN-199 Tideturner` together. ·
**359.3.e.11** (8): *"Instructions that can be partially followed are followed as much as possible
and ignored otherwise"* — **this is the GENERAL form of 422.4 in §2 above, and 422.4 should be
applied as its discard instance rather than on its own.** ·
**820.3.a** (9): *"Regardless of the number of times a spell or ability's instructions are executed with this
keyword, it is only Played once"* — so [Repeat] never feeds [Legion], *"cards played this turn"*
or any play-watcher twice. ·
**829.1.b.2** (9): a Flow replay *"does not change the timing at which it can be played, nor any
permissions … aside from the zone"* — a non-Reaction Flow spell is still Main-Phase only. Pairs
with the 356.1.a Flow finding above. ·
**424.1.a.1** (8): *"Other cards, **including the card being revealed**, can reference the act of
being Revealed"* — the permission under the whole `SFD-175 Undertitan` *"as you look at or reveal
me"* family the file has a bullet on. ·
**812.1.b.1** (8): [Legion] long form, *"If you have played another card this turn, this card gains [Text]."* — a conditional GRANT, the same shape as 824.1.b.1 for [Level] above. ·
**377.2.a** (9): a trigger condition using the words *"using"* or *"playing"* an Activated Ability is fulfilled **when the ability resolves**. Measured: exactly ONE card, `SFD-075 Prize of Progress`, which the file already names. ·
**805.2.a** (8): *"Accelerate costs cannot be paid while the unit is on the board, only as part of
the steps of playing a card"* — closes the obvious question against the carried 805.1.a.1 / 805.6.

Smaller still, worth folding rather than their own bullets: **312.2.d** (8) folds into the 312.2.b
bullet above to complete that list of four priority grants; **814.1.d** (8) folds into 814.1.d.1;
**378** (9) and **813.4.b** (9) and **822.1.c** (9) and **424.3.a.1** (8) and **811.5.a** (8) and
**489.5.c.1** (8) are mechanism or seating detail under parents the file already carries.

## 2C. CORRECTLY ABSENT — MEASURED (8)

- **141** (*"Unit is:"*), **489.1** (*"4 Players"*), **192** (controller context interchangeable) and
  **383.4.a.1** (*"commonly structured as 'When you play me…'"*, which is 053.1 / 053.2 restated and
  carried) — headings, parameters and wording notes with no card reading them.
- **383.3.a.2** (8) — *"If the controller … chooses not to perform that Triggered Ability during
  finalization, it is removed from the chain and considered to have not triggered."* **The file
  already carries this at 383.3.e.2**, explicitly, including the once-per-turn consequence and the
  measurement that none of the pool's four *"once each turn"* cards has the shape. Sibling duplicate.
- **472** (8) — the win check at a Cleanup. #207 carried **323.1** yesterday as Task 1 of every
  Cleanup, with 194.2's two-part test; 472 is the same statement from the Scoring section.
- **441.1.c.1** (8) — *"Some effects may grant a Game Object permission to be Empowered multiple
  times. Such an effect ignores this restriction."* **Measured: ZERO cards in the pool do**, so it is
  a dead slot today. It is nonetheless the **exact twin of 426.1.b.2**, which the file carries as the
  rules' own licensed slot for Lee Sin's multi-buff exception — so the honest note is about Riot's
  PATTERN (the restriction blocks 441.1.b/c and the rules keep an exception slot beside it), not
  about a line anyone can build.
- **818.4** (8) — *"Multiple instances of Equip are equivalent to multiple Activated Abilities and can each be
activated separately by paying the corresponding costs."* **Measured: 50
  `[Equip]` occurrences in the corpus and ZERO cards carrying two.** Dead letter, like 434.5's
  exhausted-Equipment example the file already records as dead letter.

## 2D. WHAT THE NEXT LANE SHOULD KNOW

The 7-citation band adds 25 more rows and 6-and-5 add 86 between them. **The pair-halves pattern from
§4 holds in this band too** (811.1.d.1/.d.2 against .d.3, 807.3 against 816.3 and 813.5.b, 437.4
against 437.3, 373.1/373.2 against 373, 444.2.c against 429.3.a), which is the reason the join keeps
paying at a lower citation count than an orphan-neighbour probe would: **the tool is not ranking
importance, it is finding asymmetry, and asymmetry does not thin out with frequency.**

---

# THIRD SLICE — the 7-citation band (25 rows), same day

`.scratch-gap/band.mjs 7 7`. **13 real gaps, 4 of them worth a bullet of their own; 8 correctly
absent; 4 folds into bullets above.** The band is where step headings start to appear in volume
(`356` *"3. Determine Total Cost."*, `357` *"4. Pay the card's costs."*, `464` *"Step 1: The Combat
Showdown Step"*, `191` *"Everything Else"*, `141`-style stubs, `103.3.a` *"12 Rune Cards"*,
`419.4` and `827.1` as parents of children the file already carries) — **that is the signal the vein
is thinning, not the citation count.**

## 3A. THE FOUR WORTH A BULLET

- **356.4.f.1** (7) — *"An optional additional cost was 'paid' if the player made the decision to pay
  it. **It doesn't matter how much the player actually paid**."* Riot's example pays an optional
  `[C]` reduced to 0 and **still draws.** This is the **exact inverse** of a finding the file already
  carries: *"an Empower discounted to 0 does NOT fire a cost-threshold trigger"* (827.1.c.3). So the
  pool answers *"discounted to zero"* **two opposite ways in two families** — an optional additional
  cost still counts as PAID, an Empower no longer counts as COSTING. Riot's example card `OGN-044 Clockwork Keeper` is in the pool, and this reaches every *"if you
  paid the additional cost"* card, `SFD-109 Akshan, Mischievous` among them.

- **383.4.c.2.c** (7) — *"If the act of gaining one point from Conquering is negated or replaced in
  any way, **the Conquer Effect will still trigger**."* The file records `VEN-053 Otterpus` as denial and *"REPLACES an early score with a draw, which prevents a gain rather than causing a
  loss"* — and never says what that does to the PAYOFFS. It does nothing: every conquer trigger in
  the line still fires. A protection for the whole 15-strong CONQUER bucket against point denial.

- **822.1.d** (7) — *"Ambush can also appear as a **verb** on a card. In such a case, the verb is taken to mean 'play with the permissions of the Ambush keyword.'"* **Riot's worked example is
  `UNL-120 Rengar, Trophy Hunter`**, whom the file names twice — as *"the one genuine threat because
  his own text lifts the restriction"* and as the only card that reinforces a battlefield you are
  attacking. 822.1.d is the mechanism by which his text does that, and the second example shows the
  verb can be **restricted** as well as expanded. The file carries 822.1.b and 822.1.c-adjacent
  reasoning and not this.

- **417.6.b.2.a** (7) — *"When an Ability is the source of Damage for a Deal action, it is **in
  addition to** the Spell or Unit that created that Ability"*, worked with `OGN-017 Iron Ballista`, in the pool: *"This
  damage is dealt both by a gear and by an ability."* **The exact counterpart of 417.6.b.3**, which
  the file leans on hard for the Challenge family (damage dealt by the UNITS, *not* in addition).
  One gear activation therefore satisfies a gear-damage watcher AND an ability-damage watcher.

## 3B. REAL, FOLDING INTO BULLETS ALREADY PROPOSED (5)

- **144.3.b** (7) — *"When a Move like this is declared by a player, the **Origins do not need to be
  the same**."* The last member of the 144.3 quartet: 144.3 one action, 144.3.a shared destination,
  144.3.c simultaneous exhaust costs (carried by #207), and this. **Destination shared, origins
  free** — so a garrison at two different battlefields walks home as one action.
- **355.4.a** (7) — *"A valid Location for a Move Effect is one other than the Units' current
  Location where they are allowed to be present."* Folds into the 355.4 bullet: a move effect can never be a no-op on its own target.
- **829.1.c.1** (7) — the Flow cost *"is an alternate cost that replaces the base cost of the spell
  **to be paid during finalization**."* Folds into the 356.1.a Flow bullet and supplies the WHEN.
- **805.4** (7) — *"Multiple instances of Accelerate are redundant."* Folds into the redundancy
  bullet and **completes it to five printed members**: 815.2 Tank and 810.2 Ganking (carried),
  816.2 Temporary and 819.2 Quick-Draw (slice 1), 805.4 Accelerate. Worth stating as a family — the
  rules say it five separate times, so a second grant of ANY of them is a dead card.
- **359.3.e.7** (7) — if ALL of an instruction's targets go invalid, **that instruction** does not
  execute. Folds with 359.3.e.5 / .e.11 / .e.12 into one bullet on the resolution-failure ladder:
  **.e.5** other instructions still run · **.e.7** the affected instruction does not · **.e.11**
  partially-followable instructions run as far as they can · **.e.12** a check on a gone object
  returns null.

## 3C. REAL, SMALLER (4)

**733** (7): *"There is no limit to an amount of XP a player can accrue."* The file says XP sinks are
a bounded step function and an XP faucet is never an engine — 733 makes that precise: **the bound is
entirely on the SPEND side, the accrual is uncapped.** ·
**727.1.c.2** (7): *"Passive Abilities begin applying at the same time the Dependent Keyword becomes
true"* — the passive half of the [Level] gate whose activated half (727.1.c.3.a) the file carries. ·
**821.1.c.2** (7): the [Weaponmaster] Equip cost is determined *"as though that Equip ability was
being activated choosing the unit with the Weaponmaster ability, as modulated by any abilities that
alter Equip costs"* — the pricing paragraph under the file's measured claim that 29 one-rune
Equipment are free under the keyword. ·
**151.2** (7): a **gear's** activated ability is Main-Phase-Open-State only *"and not during a
Showdown"* — 381 stated for the card type whose apparatus in this file is largest.

Two narrower but real: **191.3** (7, a permanent's controller is assigned as it ENTERS the board,
completing 191.1 / 191.2 which the file carries for theft) and **435.4.b** (7, an Equipment whose
carrier leaves the board detaches **to the carrier's last location**, not straight to base — 457.1
then recalls it at the next Cleanup, so there is an instant where it is at the battlefield).

## 3D. CORRECTLY ABSENT — MEASURED (8)

`356` and `357` (numbered STEPS of the play process, whose children the file carries), `464`
(*"Step 1: The Combat Showdown Step"*), `191` (*"Everything Else"*), `141` (*"Unit is:"*),
`103.3.a` (*"12 Rune Cards"*, a parameter already carried through 161.2.a's *"exactly 12"*),
`422.5` (*"This action is formatted as 'Discard X.'"*), and two PARENTS whose operative children are
already in the file — `419.4` (*"Some Abilities trigger when cards are played"*, against the carried
419.4.a / 419.4.b) and `827.1` (*"Empower is an Activated Ability keyword"*, against the carried
827.1.b.1 / .c.1 / .c.3). **`827.1` is the one of the eight I would reconsider**: being an *Activated*
Ability puts Empower under 381, i.e. your turn and an Open State only, and the file states that
consequence for no keyword. `465.2.c.2` is a third parent (*"Abilities or effects may influence the
order in which damage is assigned"*) under the .c.3-.c.10 block the file carries in full.

## 3E. THE VEIN, AND WHERE I WOULD STOP

Across three slices in one day — **99 rows read, 61 real gaps, 17 measured non-gaps, the rest folds
and one live tool bug.** The yield per row falls only slightly from the 10+ band to the 7 band
(26/38, 22/36, 13/25) but **the composition changes**: step headings, section stubs and block parents
go from none to eight of twenty-five. That, not the citation count, is the signal. **I would work
the 6 band and stop there**, and I would expect the 5 band to be mostly parents and parameters.

---

# FOURTH SLICE — the 6-citation band, and the vein is called

43 rows. I checked my own §3E composition claim rather than assert it, sampling 13 of the 43.
**It holds, and harder than I said**: `000` *"Golden and Silver Rules"*, `103.4` *"Battlefields"*,
`179` *"Tokens"* are section headings; `115` is setup (*"Determine Turn Order using any fair random
method"*); `809.1.b` (*"It is formatted as 'Deflect [X]'"*) and `812.1.b` (where a Legion clause
starts and ends) are format notes; `730.1` (*"To Gain XP, increase the value of XP marked on the
Player"*) is the definitional mirror of the carried 730.2; and `356.1.b`, `308.1`, `431.3` and
`359.3.e.14` are **parents of children I have already proposed in slices 1–3**. That is **eight of
thirteen sampled with no independent content**, against zero in the 10+ band.

**I am stopping the vein here** rather than grinding 43 rows for a handful. Two things come out of
the band and I would not want them lost:

- **356.4.f** (6) — *"Discounts can reduce additional costs, **including to 0**."* This is the setup
  for 356.4.f.1 in §3A and **strengthens it**: the discount genuinely reaches the additional cost
  and zeroes it, and the payoff fires anyway because the player *decided* to pay. Apply the two
  together as one bullet.

- **369.2** (6) — ***"Some Game Actions are themselves Replacement Effects. Example: Burning Out is a
  replacement effect. Example: Preventing Damage is a replacement effect."*** Cited zero times in
  `CLAUDE.md`. **This is a LEAD, not a finding, and I am deliberately not deriving it** — it puts
  Burn Out and Prevent under the whole 370–373 machinery the file already carries for Zhonya's
  Hourglass and Soraka (370.2's once-per-event cap, 373's controller ordering, 373.2's one-sequence
  limit), and the loop ledger has never asked what that means. It was already flagged as the next
  row in rc-walk-mid's 2026-09-09 handoff (*"a Burn Out cannot be responded to"*, whose consequence the loop ledger had never asked about) and is still open. Two honest observations to hand on with it: 431.3
  makes each re-attempt a **fresh event**, so 370.2 does not obviously cap the 431.3.a cascade; and
  the file currently describes Prevent as *"a different mechanism from the would-die replacements of
  #119"*, which is true of the timing and slightly loose as a classification, since 369.2 says both
  are replacements. **Somebody should walk this properly; I did not.**

A third, parked rather than proposed: **469.1.a** (6) disqualifies a teammate's controlled
battlefields from being Conquered by your team in 2v2 — real content, but 2v2 is blocked on the
representation decision (`matchDeck` reads one list, 489.2 puts two decks on a team).

## FINAL TALLY

| band | rows | real | correctly absent | folds |
|---|---:|---:|---:|---:|
| 10+ | 38 | 26 | 1 | — |
| 9 and 8 | 36 | 22 | 8 | 6 |
| 7 | 25 | 13 | 8 | 4 |
| 6 | 43 | sampled 13 of 43; 8 of 13 have no independent content | | |

**99 rows fully disposed, 61 real gaps, 17 measured non-gaps, one live tool bug (§0), two of my own
base-code slips caught by a pre-commit grep over every card name cited** (`OGN-289` written as
`OGN-288`; `SFD-109` written as `SFD-200`). Both were typed rather than measured, which is the
defect class this project pays for most often, and **one cheap grep over the card names in a draft
catches it** — worth making a standing pre-commit step for any lane that names cards.

---

# FIFTH SLICE — walking 369.2, the lead I refused to derive in §4

I filed 369.2 as a lead and said somebody should walk it. Nobody else was going to, and it had been
open in rc-walk-mid's handoff since **2026-09-09** (*"a Burn Out cannot be responded to"*, a row whose
consequence the loop ledger had never asked about), so I walked it. **Four results, one of them a non-finding.**

**369.2** (catalogue 6, `CLAUDE.md` 0): *"Some Game Actions are themselves Replacement Effects.
Example: Burning Out is a replacement effect.​ Example: Preventing Damage is a replacement effect."*

## 5A. PREVENT IS A REPLACEMENT, SAID TWICE, AND THIS FILE HAS NEITHER SENTENCE

**437.2** (uncited) says it inside the Prevent block itself: *"When damage is Prevented, it is
replaced with an event where it deals that much damage reduced by the Prevent Value tracked on the
Unit specifically."* So `CLAUDE.md`'s *"a different mechanism from the heal/exhaust/recall shield of
808.1.d.1"* is **right about the timing and imprecise about the kind — both are Replacement
Effects, and they differ in WHICH EVENT they replace**: 437.2 replaces the **damage** event with a
smaller one, Zhonya's Hourglass replaces the **death** event. **That is the real reason 437.4
generates no kill event** — not that Prevent is a different species of shield, but that the damage
that would have caused the death was never dealt. Read with **437.3** (§2, the depleting Prevent
Value) the family is complete: replace the damage event, reduce the tracked value, repeat on the
next event until it is spent.

## 5B. 370.2 DOES NOT CAP THE BURN-OUT CASCADE, AND I CHECKED RATHER THAN ASSUMED

The obvious worry, and the reason this needed walking: **370.2** reads *"A Replacement Effect can
only be applied once to an event, or to any Game Actions or events that replace that event"* — which
read carelessly would cap the 431.3.a death spiral at one Burn Out. **It does not, on three
independent grounds, all verbatim:**

1. **431.3**: *"When they attempt to perform the original action **again**, it will cause another
   Burn Out."* The re-attempt is a NEW qualifying event, not a replacement of the old one.
2. **431.1.a** sequences it explicitly: *"they will Draw as many as possible, perform this action,
   **then Draw the remaining amount instructed**"* — and that remaining draw again exceeds an empty
   deck, qualifying afresh under 431.1.
3. **431.3.b** — *"Points gained after the first Burn Out being processed **in sequence** cannot be
   replaced or prevented by any means"* — is written on the assumption that a sequence exists, and
   is itself phrased in replacement vocabulary (it exists to stop OTHER replacements reaching the
   point gain), which is corroboration that the whole apparatus is the 369–373 one.

**So the loop ledger is unaffected and 431.3.a stands as written.** The §4 observation is now
confirmed rather than open. Riot's 370.2 example (two `Zhonya's Hourglass` on one death) is about a
chain of events each replacing the last **within one execution**, which a re-attempted draw is not.

## 5C. NEITHER CAN BE RESPONDED TO — THE QUESTION rc-walk-mid LEFT OPEN

**369**: *"Replacement Effects intercede during the execution of a Game Effect and alter its
execution."* Nothing in 369–373 creates a Chain Item, and the replacement happens **inside** an
execution that is already under way, so no priority window opens between the original event and the
replaced one. **A Burn Out cannot be answered, and neither can a Prevent.** Stated with its limit:
the rules do not say this for replacements in the words 446.3.c uses for Moving (*"Moving does not
use the Chain, nor is it able to be Reacted to"*) — **it follows from 369 placing the effect inside
an execution plus the absence of any chain item, and I am recording the derivation rather than
claiming a paragraph that says it outright.**

## 5D. 372 IS AN ORDERING RULE THIS FILE DOES NOT HAVE, AND IT IS NOT 373

**372** (uncited): *"If more than one Replacement Effect applies to the same event being executed,
then the controller of the object being acted on determines the order the Replacement Effects will
apply."* That is a **different question from 373**, which §3 proposes: **372 is ONE event with
several replacements, ordered by the controller of the OBJECT** — so on an enemy unit, **they**
order your replacements — while **373 is SEVERAL simultaneous events, with each controller ordering
their own.** The two are one paragraph apart and answer opposite questions; carrying 373 without 372
would leave the more common case out.

## 5E. THE NON-FINDING, REPORTED AS ONE

**371 / 371.1** (*"Some Replacement Effects will begin with 'once each turn,' or 'N times each
turn.'"* … *"These Replacement Effects may only be applied to the specified number of events each
turn"*). Measured over
`corpus_flat.txt` for a per-turn limiter co-occurring with a replacement word (`as` / `would` /
`instead`): **exactly ONE card**, `UNL-086 Zilean, Time Mage` — *"Once each turn, if you **would**
play a token unit while I'm at a battlefield, you may play that token and an additional copy of it
**instead**."* It is catalogued as `leblanc-zilean-reflection-doubling`, and **that entry already
cites 371.1 and already states the once-per-turn cap in its own words.** No defect; the work was more
careful than the check. What the entry does NOT have is the **replacement framing** — it cites no
paragraph of 369–373 beyond 371.1 — so the two consequences of Zilean's doubling being a
Replacement Effect are unstated there: **the opponent cannot respond to the doubling** (§5C, no chain
item) and **372 decides its order** against any other replacement on the same token play. That is a
citation upgrade for an entry lane, not something I can apply from here.
