# Tagging the untagged ENGINEs — issue #157

Lane `rc-produces`, 2026-09-09. Scope: every entry in `data/combos.json` carrying no `produces`.

## 1. The measurement, and how the issue's own number moved

Measured 2026-09-09 against `data/combos.json` at 714 entries: **102 entries carry no `produces`,
and every one of them is class ENGINE.** Re-measured before reporting, one merge later at 715
entries: still exactly 102, so the entry another lane added arrived tagged. The count of entries is
the perishable half of this walk and the rule under each tag is the durable half; every count here
is as of 2026-09-09. The issue title says 60 of 245; it was written on a smaller
catalogue and the count has grown with it. Nothing else in the file is untagged — no INFINITE, no
BURST, no CHAIN, no ALT_WIN.

Vocabulary in use on the same date, produced / consumed:

| feature | producers | consumers |
|---|---|---|
| `resource-engine` | 172 | 1 |
| `repeatable-removal` | 137 | 0 |
| `card-advantage-engine` | 123 | 0 |
| `token-body-engine` | 58 | 6 |
| `conquer-engine` | 55 | 10 |
| `ability-points` | 49 | 0 |
| `win-the-game` | 27 | 0 |
| `burst-points` | 27 | 0 |
| `strip-opponent-hand` | 8 | 0 |
| `infinite-energy` | 7 | 16 |
| `temporary-body-engine` | 7 | 0 |
| `infinite-power` | 5 | 11 |
| `opponent-deck-pressure` | 3 | 0 |
| `infinite-recycle` | 1 | 2 |

## 2. Three structural facts measured before classifying anything

**(a) `needs` is a hard gate; `produces` is not.** `generateVariants` (`src/combos.ts:84-86`):
`if (options.length === 0 || depth >= maxDepth) return []` — an entry whose `needs` names a value
nothing produces emits **zero variants** and disappears from the deck panel entirely. Measured over
the 714: **no orphan `needs` exists today.** The reverse — a `produces` nothing consumes — holds for
**8 of the 14 values**, including the three biggest, and `data/features.json` says in its own notes
that this is by design: *"A feature with no consumer is NOT a defect when the feature IS the payoff:
points, wins and removal are outputs of the graph, never inputs to it."* So step 4 of this lane's
brief returns: **one real finding (the 8 output-only values, all legitimate), no defect.**

**(b) An entry that both `needs` X and `produces` X satisfies its own need with no feeder.** In
`expand()`, `partials` starts as `[self]` with `self.produces = new Set(combo.produces)`, and the
loop over `combo.needs` short-circuits on `if (p.produces.has(need)) { next.push(p); continue; }`.
Reproduced on a two-entry fixture: entry A needing and producing `token-body-engine` emits the single
variant `A`, and the feeder B is never merged in. **Measured over the catalogue: 0 entries have that
overlap today**, and four of the 102 carry a `needs` that a careless tag would collide with —
`karma-lux-recycle-buff-army` and `sett-kingpin-karma-army-might-wall` (both need
`token-body-engine`), `royal-entourage-grandmaster-warmogs-two-conquers` and
`adaptatron-treasure-hoard-conquer-buff-faucet` (both need `conquer-engine`). Neither of the first
two may be tagged `token-body-engine`, however plainly they make bodies: each genuinely requires an
external loop, and the tag would publish it as a complete line without one.

**(c) `produces` is read by the UI, not only by the composer.** `web/main.ts:900` renders the
drawer's **Payoff** pills from `produces` filtered to STANDALONE features, `web/main.ts:425` and
`:731` name a route's outcome from it, and `web/graph.ts:100` / `:238` build the diagram's outcome
nodes and `kind: "result"` edges the same way. **An untagged ENGINE therefore has no Payoff section
in the drawer and no outcome edge in the diagram** — which is a larger user-visible cost than the
lost composition, and it is the same cost for all 102 whether or not anything ever `needs` the value.

`validateCombos` (`src/combos.ts:18-20`) errors on any `produces` id absent from
`data/features.json`, so **no new value can be staged before the registry entry exists**.

## 3. Classification against the existing vocabulary first

**12 of the 102 fit the existing vocabulary outright** (staged as batch 1,
`/tmp/rc-walks/rc-produces.json`):

| entry | produces | why |
|---|---|---|
| `nocturne-stacked-deck-cheat` | `card-advantage-engine` | `OGN-183 Stacked Deck`: *"Look at the top 3 cards of your Main Deck. Put 1 into your hand and recycle the rest"* — a card into hand, which is the feature's own wording |
| `apprentice-mage-sanction-empower-reset` | `card-advantage-engine` | two `[Predict 2]`s per Sanction; deck sculpting, on the precedent of `candlelit-sanctum-known-next-draw` |
| `otterpus-ol-poro-early-game-concession` | `card-advantage-engine` | every early Conquer or Hold converted to a card |
| `heedless-resurrection-legion-rearguard-accelerated-return` | `card-advantage-engine` | return from the trash, named in the feature's description |
| `battering-ram-undying-legion-cards-played` | `card-advantage-engine`, `resource-engine` | trash recursion plus a Might-5 body for 1 Energy |
| `ornns-forge-jax-free-equipment` | `resource-engine` | one E1 Equipment played and attached for zero Energy per turn; `attach-engine` was merged into `resource-engine` in 2026-09-06 |
| `jaull-fish-garen-rugged-mighty-discount` | `resource-engine` | 2 Energy off per Mighty body |
| `legion-quartermaster-cloth-armor-bounce-value` | `resource-engine` | the mandatory additional cost refunded for 1 Energy |
| `pickpocket-seal-of-focus-cheap-gear-kill` | `repeatable-removal`, `resource-engine` | one cheap enemy gear removed and one Gold gained |
| `possession-action-defender-flip` | `repeatable-removal` | `OGN-203 Possession`: *"Take control of it and recall it"* — the body leaves their board for good |
| `viktor-leader-safety-inspector-symmetric-kill` | `repeatable-removal` | `UNL-164 Safety Inspector`: *"each player must kill one of their units"*, one-sided under Viktor |
| `frozen-fortress-soul-shepherd-asymmetric-sweep` | `repeatable-removal` | `UNL-212 Frozen Fortress`: *"deal 1 to each unit here"* twice a round, one-sided under Soul Shepherd |

**Two of those twelve were nearly mis-tagged, and the reason is worth keeping.**
`viktor-leader-safety-inspector-symmetric-kill` makes a Recruit and
`stalking-wolf-bird-ambush` consumes one, and neither is `token-body-engine`: that value composes
into `ready-recruits-grand-plaza`, which needs seven bodies standing at the Hold, and three Recruits
across a whole game is not that. The payoff-lens walk of 2026-09-06 §V states the hazard in its own
terms — *"a feeder that cannot reach a Hold would publish a false ALT_WIN"* — and it applies to
`token-body-engine` and `conquer-engine`, the only two of the fourteen with real consumer counts.
`SFD-128 Overzealous Fan` was the third near-miss: it reads *"you may kill me to **move** an
attacking unit to its base"*, which removes nothing from the board and so is not
`repeatable-removal`.

## 4. The residue: 90 of the 102 fit nothing in the current vocabulary

Assigned by hand from each entry's own `netPerIteration` and `terminatesIn`, then counted by script;
all 102 are accounted for with no entry unassigned and none double-counted against an existing tag.

| proposed value | entries | what it denotes |
|---|---|---|
| `combat-might` | 34 | Might bought onto your own bodies — 702 buffs, granted `[Assault]` (807.2), Empower purchases, doublers, `+N this turn` modifiers. The payoff is winning combats and feeding a "becomes Mighty" (709) or excess-damage (R28) reader |
| `board-protection` | 22 | your key permanent survives what would remove it — would-die replacements, `[Tank]` tolls (815.1.c.2), granted `[Shield]` (814.2), Prevent (437.4), untargetability, granted `[Deflect]` (809.2) |
| `tempo-denial` | 22 | the opponent does less on their own turn — counters, play locks, spell taxes, stuns, movement locks, a frozen score, rune denial |
| `unit-delivery` | 13 | a body reaches a battlefield it could not otherwise reach, or reaches one a turn early — `[Ambush]`, effect moves (449 + 420.3.a), granted `[Ganking]`, plays into an opened combat |
| `xp-engine` | 5 | repeatable XP for a `[Level N]` rung (824.1.d), which no card in the pool converts to points |

Six entries carry two of the new names: `radiant-dawn-stun-buff-free-glory`,
`sett-kingpin-karma-army-might-wall`, `irelia-fervent-forgotten-signpost-choose`,
`whiteflame-last-stand-zhonyas-double-might`, `deadbloom-predator-primal-strength-attacker`,
`the-boss-showstopper-redeploy`. Two more earn an existing tag alongside a new one:
`altar-of-memories-overzealous-fan-off-turn-filter` (+ `card-advantage-engine`) and
`monch-skyward-strike-stun-discount` (+ `resource-engine`).

### Does each new name earn its place?

`data/features.json` sets two tests and a ceiling: *"Keep this list under ~20 entries"*, **one name
per thing**, and *"keep two names when a consumer could tell them apart"*. Five new values take the
registry from 14 to **19** — under the ceiling, with almost no headroom left, which is itself a cost
worth naming.

- **`unit-delivery` is the only one of the five that is a genuine graph INPUT.** `token-body-engine`
  makes bodies at the base (355.2.a), and the bottleneck of every token line is the walk to the
  battlefield, not the token count; a Plaza or Hold entry could honestly declare `needs:
  unit-delivery` where today it declares nothing.
- **`xp-engine` is the second**: a `[Level N]` payoff needs a faucet and 824.1.d drops the rung the
  instant the balance falls, so a consumer is straightforward to write.
- **`combat-might`, `board-protection` and `tempo-denial` are output-only**, and the registry's own
  note admits that shape. `combat-might` has a plausible consumer in the excess-damage family
  (`OGN-034 Tryndamere` is paid for attacking Might never assigned, R28 = A). For the other two the
  honest position is that they are payoffs shown to the user, not inputs: CLAUDE.md already records
  that *"Brynhir's lockout window is its own entry, not a `uses[]` of the loop it protects: adding it
  would force the matcher to require it"* — and a `needs: tempo-denial` on a BURST would force
  exactly the same requirement, so these two should be tagged and **never consumed**.

Nothing in the residue produces repeatable Conquers, so none of the 90 is a `conquer-engine`.

## 5. Open, for the manager

The 90 are not staged: `validateCombos` rejects an unknown feature id, so the five registry entries
in `data/features.json` have to land first, and the naming is the manager's call.

## 6. Self-audit of the one value proposed as a graph INPUT, and a correction to §4

§4 called `unit-delivery` *"the only one of the five that is a genuine graph INPUT"*. All thirteen
members were then re-read against `data/corpus_flat.txt` rather than against their own prose. Every
one is genuine delivery — a body reaching a battlefield it could not otherwise reach, or reaching one
a turn early — but **the capacity claim behind the INPUT recommendation does not survive the check,
and it is corrected here.**

Measured, one line of card text each: `UNL-045 Forgotten Signpost` moves *"a different unit you
control"* — one body. `SFD-125 Fae Porter` moves himself plus *"a unit you control"* — two.
`VEN-034 Resonating Strike` chooses *"a unit you control at a different location"* — one.
`SFD-111 Here to Help` plays *"a unit from hand"* — one. `UNL-166 Stalking Wolf`, `OGN-161 Deadbloom
Predator`, `OGN-135 Pakaa Cub`, `VEN-157 Dragon Roost` each deliver themselves — one.
`UNL-202 Void Assault` moves one friendly and one enemy. **The maximum any of the thirteen delivers
is two bodies, and only `SFD-192 Shurelya's Requiem` acts on a garrison at all, by granting
`[Ganking]` to *"your units here"* rather than by moving anything.**

The consumer that motivated the recommendation is `ready-recruits-grand-plaza`, which is class
**ALT_WIN** and produces `win-the-game`, and it needs **seven** bodies standing at the Hold. A naive
`needs: unit-delivery` on it would be satisfied by a one-body-per-turn mover and would **publish a
false win** — the exact failure the payoff-lens walk of 2026-09-06 §V split `temporary-body-engine`
out to prevent (*"a feeder that cannot reach a Hold would publish a false ALT_WIN"*), and the worst
of the possible failure modes because the composed class is the one the player reads.

Two further facts already in CLAUDE.md close the gap the other way: 144.3 moves a whole swarm to a
shared destination as **one** game action, and 315.1.b readies yesterday's swarm for free, so the
base-to-battlefield walk a Plaza needs is not what any of these thirteen cards sells. What they sell
is the **same-turn** arrival that 143.4 otherwise forbids, and the battlefield-to-battlefield
consolidation that 144.4 charges `[Ganking]` for.

**Corrected recommendation: tag `unit-delivery` as OUTPUT-ONLY like the other three, and do not
write a consumer for it yet.** If one is ever written, the value has to be split by capacity first —
bulk delivery against single-body delivery — on the same reasoning and by the same precedent as the
token-body / temporary-body split. `xp-engine` is unaffected and remains a clean input: a `[Level N]`
rung reads a balance, not a quantity of bodies.

The same hazard in weaker form applies to `combat-might` if it is ever consumed by the excess-damage
family: `OGN-034 Tryndamere` pays on *five or more* excess damage, and a +1 buff (703 fixes a Buff at
exactly +1) is not that. Output-only until someone measures the threshold per producer.

## 7. A measurement that failed, and why it is recorded rather than deleted

All five names were approved and landed in `data/features.json` (registry 14 → 19), with
`unit-delivery` output-only per §6 and `xp-engine` as the one HELPER.

Before staging the 90, every entry's `uses[]` card text was swept from `data/corpus_flat.txt` for
protection, Might and movement markers, to find tags the first pass had missed. **It flagged 51 of
90, which is not a credible answer**, and the reason is the bracketed-keyword trap this project
already records in another form (*"`/\[hidden\]/` matches cards that merely MENTION Hidden"*): a body
that *carries* `[Deflect]`, `[Tank]` or `[Shield]` is not an entry that *produces* protection, and
`[Shield]`'s own reminder text reads *"+N Might"*, so every defensive body flagged as offence.

The clean counter-example is `taric-block-stalwart-poro-shield-stack`, which the sweep flagged for
`combat-might` while the entry's own `terminatesIn` ends *"none of it applies on offence
(814.1.c)"*. **The card text cannot decide the tag; the entry's own `terminatesIn` can** — it is the
authored statement of what the line produces, and it is what the first pass was built from.

The sweep was kept as a candidate list only, and four additions were made from it, each read off the
card's own sentence rather than the regex:

- `shady-spectacles-baron-copy` **+ `board-protection`** — `VEN-137` makes the equipped unit *"become
  a copy of that unit"*, and `UNL-147 Baron Nashor` reads *"I can't be chosen by enemy spells and
  abilities"* as well as *"Other friendly units have +2 Might"*. A copy carries every sentence; this
  is the Svellsongur lesson (*"read every sentence of the copied card"*) landing on the tagger.
- `jayce-hammer-wallop-showdown-keyword` **+ `board-protection`** — `VEN-088`'s three modes are
  `[Assault 2]` / `[Deflect 2]` / `[Ganking]`, and the entry's own headline is that `[Deflect 2]` is
  the mode that has to be chosen early.
- `kayle-justified-aurok-general-triple-empower` **+ `board-protection`** — `VEN-134`: *"While I'm
  [Empowered] three times, I have [Deflect 3] and [Ganking]"*, and 441.2 makes it permanent.
- `sacred-protector-disciple-of-shen-pair` **+ `board-protection`** — `VEN-117 Disciple of Shen`:
  *"I have [Shield 3] while I'm at a battlefield with exactly one other unit you control."*

### One entry that is ANTI-composable, recorded before anything can consume it

`sacred-protector-disciple-of-shen-pair` runs `VEN-129 Sacred Protector` (*"I don't deal combat
damage unless I'm at a battlefield with **exactly one other unit** you control"*) beside `VEN-117`,
whose `[Shield 3]` carries the identical clause. **A third friendly body switches both off.**
`generateVariants` merges card multisets with `max()` per card and knows nothing about a garrison
size, so if `combat-might` or `board-protection` ever stops being output-only, merging this entry
with any `token-body-engine` or `unit-delivery` route would publish a line its own two cards refuse.
It is harmless today only because all five new values are output-only, and it is one more reason to
keep them that way.

## 8. A name that was NOT added, and the condition under which it should be

`karma-lux-recycle-buff-army` is tagged `combat-might`, and that undersells it. Its honest product is
neither Might nor bodies: `lux-infinite-energy` already makes the Recruits, and what this entry adds
is that **each one arrives at 2 Might instead of 1** — an *upgrade to another engine's output*.
Nothing in the nineteen-name vocabulary says that, and it cannot borrow `token-body-engine`, because
the entry `needs` that value and would then satisfy its own need with no feeder (§2b).

The name was deliberately **not** added. The registry stands at 19 of its own ~20 ceiling, and a
value consumed by nothing and displaying nothing new is the worst kind of addition. Recorded here
instead, with the condition: **if a second and a third entry of this shape turn up, the name has
earned its place; one instance has not.** That is the same bar `temporary-body-engine` cleared in
2026-09-06 — it was split out because two entries were provably false in front of a consumer, not
because one looked untidy.

`sett-kingpin-karma-army-might-wall` is the nearest second candidate and is *not* a third: it reads
the same loop's stock rather than improving it, which is why it is tagged `combat-might` and
`board-protection` on its own terms.

## 9. Two boundary rulings worth keeping, because they look contradictory and are not

Both concern a keyword printed on a card inside an entry, and they go opposite ways.

- `steel-paws-svellsongur-might` did **not** get `board-protection`, although its own net names *"a
  14 Might Deflect body"*. The `[Deflect]` is printed on the finished body incidentally; adding the
  tag for it would be the 51-of-90 sweep's mistake (§7) committed by hand in the same walk that
  rejected it.
- `wily-newtfish-gemhand-hunter-xp-turn` **did** get `unit-delivery`, although `[Ganking]` is
  likewise a keyword on the body. The difference is not the keyword, it is the authority: this
  entry's own `terminatesIn` reads *"a per-turn Might and **movement** bonus"*, so the authored
  statement of the product names movement, and `UNL-108 Wily Newtfish` grants the keyword to itself
  conditionally (*"If you've gained XP this turn, I have +1 Might and [Ganking]"*) rather than
  printing it.

**The discriminator is the entry's own `terminatesIn`, never the presence of the keyword** — which is
§7's finding applied twice in opposite directions, and the reason to state it twice.

## 10. The one entry whose product may be nothing, and the ruling it tests

`simian-ancestor-arena-bar-wallop-ready` is tagged `unit-delivery` at roughly 70% confidence, and it
is the weakest tag in the ninety. Its whole product, in its own words, is *"two readies a turn for
zero Energy and zero Power — a second Standard Move for Simian, plus a free ready from Wallop"*.
There is no second product to fall back on.

`SFD-047 Simian Ancestor` reads, in full, *"When you buff me, ready me"* — it has no exhaust-cost
ability of any kind. So CLAUDE.md's refuse-bucket E applies exactly: *"a 'ready me' trigger is ONE
extra Standard Move and nothing on defence, and nothing at all if the unit has no exhaust-cost
ability"*. The ready buys one extra Standard Move per turn and literally nothing else.

That sits against the ruling made on `kayn-back-alley-bar-double-move`, where the same bucket E
decided the opposite way: there the move is the **mechanism** and the product is the body surviving
the turn, so it was tagged `board-protection`. **The two are not in conflict, and the reason is that
Kayn HAS another product and Simian does not.** For Simian the choice is `unit-delivery` or nothing
at all, and the case for `unit-delivery` is only that one extra Standard Move does literally let a
body reach a battlefield it could not otherwise reach this turn (144.4), which is the value's own
definition. The case against is that bucket E exists precisely to say that this is worth very little.

Tagged rather than left blank, because the value is output-only and the drawer showing *"two readies
a turn for zero"* is a true statement about the line. **If `unit-delivery` is ever made consumable,
this entry is the first that should be re-examined** — a consumer wanting bodies moved would be
satisfied by an entry that moves one body one extra step.

## 11. Closing state

All 102 originally untagged entries are dispositioned: **12 against the existing vocabulary, 90
against the five new values**, staged in five batches and applied by the manager. Counts as of
2026-09-09 and not durable; the durable half is the rule under each tag.

| value | entries tagged by this walk |
|---|---|
| `combat-might` | 34 |
| `board-protection` | 22 |
| `tempo-denial` | 22 |
| `unit-delivery` | 14 |
| `xp-engine` | 5 |
| `card-advantage-engine` (existing) | 6 |
| `resource-engine` (existing) | 6 |
| `repeatable-removal` (existing) | 4 |

Both directions of the composition graph were checked and neither needs work: **no `needs` names a
value nothing produces**, and the eight output-only values are output-only by the registry's own
design. The five new values are all output-only today, so nothing this walk added changes route
composition — what it changes is that ninety entries that showed no payoff in the drawer and no
outcome edge in the diagram now show one.
