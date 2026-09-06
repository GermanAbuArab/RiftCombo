# Hand walks — the six candidates from the resource-multiplication lens (issue #32)

**Date:** 2026-09-05 · **Rules version:** Core Rules 2026-07-16
**Result: 6 HOLD, of which 3 only after a rewrite. 0 refuted.**

All six are ENGINE, so the bar is *"the mechanism produces what the entry says"*, not *"reaches 8"*.
None was promoted to a higher class; none needed to be.

---

## Step 2 done first, in bulk: every citation opened

Following the 2026-09-04 precedent (the citation audit that found three entries citing a rule which
said the opposite of the claim), **every rule number issue #32 leans on was pulled and read in
`data/Riftbound-Core-Rules-2026-07-16.txt` before any candidate was walked.**

| rule | verbatim (transcribed from the rules file) | verdict |
|---|---|---|
| **356.4.c** | *"Discounts that only apply to a component of the cost will be applied when that component is added to the cost of the spell and before any other discounts."* + the worked example *"Ezreal, Prodigy reads 'optional additional costs you pay cost [1] or [A] less.' When playing a **Frigid Touch** and choosing to pay the additional cost in step 2, as soon as the additional cost is added to the cost of the spell, Ezreal, Prodigy's discount is applied to it."* | **as claimed.** Riot's own worked example is literally Ezreal + a `[Repeat]` spell of this lens |
| **356.4.c.1** | *"Discounts that apply to a given component of a spell's cost may be applied in any order to that component."* | **as claimed.** No cap on how many discounts hit one component |
| **356.4.f** | *"Discounts can reduce additional costs, including to 0."* | as claimed |
| **356.4.f.1** | *"An optional additional cost was 'paid' if the player made the decision to pay it. It doesn't matter how much the player actually paid."* + the Clockwork Keeper example (a `[C]` additional cost reduced to 0 still draws) | as claimed |
| **356.6** | *"Energy and Power costs can't be reduced below 0."* | as claimed — the floor every table below lands exactly on |
| **356.2.b.1** | Non-mandatory additional costs *"use the phrase 'as an additional cost' and the word 'may'"*, declared in step 2 | as claimed |
| **357.1.a** | *"During this step, the card's controller can use activated abilities with the Reaction tag that Add resources to add Energy and Power to pay the card's costs."* | as claimed — this is what pays C5's Power |
| **429.3** | *"Activated abilities that Add resources and have the Reaction tag can be activated at any time that spells or abilities require resources be paid."* | as claimed |
| **820.1** | *"Repeat is an Optional Additional Cost keyword."* | as claimed |
| **820.1.c.2** | *"If a spell or ability has more than one instance of Repeat, each Cost may be paid or not paid individually."* | as claimed — C5 stands on it |
| **820.1.c.3** | *"Each Repeat Cost can be paid only a single time."* | as claimed. Kills the whole "reduce Repeat to 0 and repeat forever" family, as #32 says |
| **820.1.d.1** | *"When the additional cost is paid, the effect of the spell or ability, upon resolution, will be performed an additional time."* Example: Desert's Call resolves *"as though the card says 'Play a 2 [M] Sand Soldier unit token. Play a 2 [M] Sand Soldier unit token.'"* | as claimed — this "X. X" framing is what C6 stands on |
| **820.1.d.2** | *"Any instructions not performed on resolution of the spell or ability are ignored."* | as claimed |
| **820.2** | *"choices must be made at the usual time during the Make Relevant Choices step of Playing a Card."* | as claimed |
| **820.2.a** | *"Choices made for the additional execution do not have to be the same as the choices made for the initial execution."* + the Rocket Barrage example: *"they may choose the same mode or a different one, and if they choose the same mode, may choose the same target or a different one"* | **as claimed, and stronger than #32 quoted it.** The example says outright that the same target may be chosen twice — this is C6's licence, not an inference |
| **820.3** | *"Multiple instances of Repeat can be paid for separately. The spell or ability's instructions will be executed an additional time on resolution for each instance of Repeat that is paid for."* | as claimed |
| **820.3.a** | *"Regardless of the number of times a spell or ability's instructions are executed with this keyword, it is only Played once."* | as claimed |
| **805.1.a** | *"As you play me, you may pay [1][C] as an additional cost. If you do, I enter ready."* | as claimed |
| **805.1.a.1** | *"If the unit has one or more domains, the Power portion of the Accelerate cost can be paid only with a Power that matches one of the domains of the unit."* | as claimed — a restriction on **paying**, not on discounting |
| **805.2** | *"Accelerate is an Optional Additional Cost to be paid as a player plays the unit with the ability."* | as claimed |
| **805.2.a** | *"Accelerate costs cannot be paid while the unit is on the board, only as part of the steps of playing a card."* | as claimed — C4 needs this |
| **805.2.b** | *"Paying the cost generates a delayed Replacement Effect. Even if the unit loses the accelerate keyword during the finalization process, as long as the cost was paid, that unit will still enter ready."* | as claimed |
| **805.4** | *"Multiple instances of Accelerate are redundant."* | as claimed — and it is about **instances of the keyword on one unit**, not about discounts. See the stacking section |
| **805.6 / 805.6.a** | *"It does not enter exhausted and then become ready."* / *"Accelerate will not interact with, or trigger, abilities that are affected by units becoming ready."* | as claimed |
| **143.4** | *"Units enter the Board exhausted."* | as claimed |
| **144.1.a / 144.2** | *"This action can be done any time during a player's Main Phase."* / *"Exhausting the Unit is the Cost for this action."* | as claimed |
| **151.2** | *"The Activated Ability of Gear may be executed at any time during the controlling player's Main Phase during an Open State."* | as claimed |
| **315.1.b** | *"The Turn Player readies all Game Objects they control that are able to be readied."* | as claimed |
| **167** | *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of each player's turn."* | as claimed |
| **383.4.c.1** | *"These are commonly structured as 'When I conquer…' and 'When you conquer…'"* | as claimed |
| **383.4.c.2 / .2.a** | *"encompasses only those that are triggered from Units that were present during the Conquer action"* / put on the Chain *"after the Unit(s) these effects correspond to are present at a Battlefield when a player gains control of it and gains 1 Victory Point from Conquering"* | as claimed — and it forces the survival requirement C3 had not stated |
| **383.4.g.1** | *"If any of the non-conquer parts of the condition are not fulfilled, it will not be placed on the chain."* (Reckoner's Arena example) | as claimed — and #32's reasoning about why the exclusion does **not** apply to a real Conquer is correct |
| **466.5.d** | *"Establishing Control results in a Conquer if that player has not yet scored this Battlefield this turn."* | as claimed |
| **465.2.c.4** | *"Units cannot have more damage assigned to them than the minimum required to constitute lethal damage **unless no further units remain to have damage assigned to them**."* | **as claimed, but with a tail #32 did not quote.** See the excess-damage section |
| **485.4.a** | *"Each player provides three (3) Battlefields, included in their deck during deck building. Only 1 will be used, chosen during setup."* | as claimed |
| **187.5** | *"A Gold gear token is a domainless gear token with '[Reaction][>] Kill this, [E]: [Add] [A].'"* | as claimed |
| **190.1** | *"Control is established over Battlefields through the course of play."* | **the rule #32 never opened.** See below |
| **190.6.d** | *"'You' in a battlefield's abilities refers to the battlefield's Controller … If the battlefield has no Controller, 'you' refers to no one, and all such instructions are ignored."* | ditto |
| **703.3.a.3** (Tournament Rules) | a deck-check infraction is *"More than 3 copies of a main deck card between main deck and sideboard."* | as claimed — 2 or 3 Ezreal is legal |
| **825.3.a** | *"A deck can contain only one card of a given name if the card has Unique."* | Ezreal has no `[Unique]` in the corpus, so the 3-copy limit is the only cap |
| **002** | *"Card text supersedes rules text. Whenever a card fundamentally contradicts the rules, the card's indication is what is true."* | as claimed |

**No citation in #32 says the opposite of what the issue claims it says.** Every one checked out.

### Ban check, same pass

All **23 distinct cards** named across the six candidates were grepped for the `[BANNED` marker in
`data/corpus_flat.txt`. **None is banned or restricted in any format.** (The corpus holds 12 `[BANNED`
rows; none of them is one of ours. `SFD-020 Draven, Vanquisher` is one of them and is a Gold maker,
which is why it does not appear in C3.)

---

## The rule #32 never opened, and it rewrites two candidates

**190.1: *"Control is established over Battlefields through the course of play."***

A battlefield you provide at setup is **Uncontrolled**. `SFD-211 Marai Spire` reads *"**While you
control this battlefield**, friendly [Repeat] costs cost `[1]` less"*, and 190.6.d makes that
conditional real: while the battlefield has no controller, *"'you' refers to no one, and all such
instructions are ignored."*

So the Marai Spire discount is **not** a deckbuilding freebie. It costs a body walked to the Spire
and Control established there (466.5), i.e. the same work as a Conquer. Both **C1** and **C5**
asserted the discount as if it were passive from turn one. Both are rewritten to state it.

This does not weaken either entry — it is a normal thing a Mind/Chaos or Fury/Mind deck does — but
an entry that does not say it is an entry that would mislead somebody building the deck.

**And there is a second condition on top of control: the Spire has to be the battlefield you drew.**
Registered in `CLAUDE.md` on 2026-09-05 while this walk was in progress, and re-verified here against
the rules file: **485.5** (1v1 Duel) reads *"Setup: Each player **randomly** selects one (1) of their
three (3) Battlefields. The other two are removed and will not be used for this game."* **486.5**
(1v1 Match) reads *"Setup: Each player selects one (1) of their three (3) Battlefields"* — no
"randomly", so in Match play you pick it for game 1.

So in a Duel, Marai Spire is a 1-in-3 proposition unless a deck may bring more than one copy of the
same battlefield, which the Core Rules never forbid (103.2 caps copies of a **Main Deck** card, and a
battlefield is not one) but which is the open question of **issue #35**. All three Spire entries
(C1, C5, C6) state this rather than assume it. It is a consistency problem, not a correctness one:
the mechanism is unaffected, the frequency is not.

## The other rule #32 quoted only half of

**465.2.c.4** is quoted in #32 as *"forbids assigning a unit more damage than the minimum needed to
kill it"*. The full rule ends *"**unless no further units remain to have damage assigned to them**."*

Read literally, that tail means a lone defender absorbs every point of attacking Might, so nothing is
ever "excess", and all six cards printing the phrase are dead letter. That is exactly reading B of
**R28**, which the user ruled against on 2026-09-04 (`CLAUDE.md`: *"reading B would make the six
cards dead letter against rule 002"*). So under **R28 = A**, in force for the already-verified
`tryndamere-brambleback-conquer`, excess damage is **attacking Might beyond the sum of the garrison's
lethal minimums**, whether or not the tail of 465.2.c.4 would let it be dumped somewhere.

C3 is walked on that settled reading. **No new reading is filed** — R28 already covers it. Recorded
here because the tail is not written down anywhere in the project and the next person to read
465.2.c.4 will trip on it.

## Do two copies of the same passive discount stack? (C2's one fine leg)

`SFD-149 Ezreal, Prodigy` is not a keyword ability, and the rules' redundancy clauses are all
keyword-specific and object-scoped — grepping "redundant" in the Core Rules returns exactly seven
hits: **805.4** (Accelerate), **810.2** (Ganking), **811.4** (Hidden), **815.2** (Tank), **816.2**
(Temporary), **822.2** (Ambush), **826.5** (Backline). **There is no general rule making two copies of
the same passive redundant.** 356.4.a says discounts *"may be applied by the card being played or by
any other card or effect"*, and 356.4.c.1 contemplates several discounts on one component without
capping them.

805.4 is the near-miss that has to be read carefully: *"Multiple instances of Accelerate are
redundant"* is about a unit carrying the keyword twice — it says nothing about two Ezreals each
discounting the one Accelerate cost. #32 got this right.

**Verdict: two Ezreals give two independent discounts.** C2 holds. If Riot ever rules otherwise, C2
falls and C1 does not, because C1 needs only one copy.

---

# 1. `ezreal-marai-spire-free-repeat` — HOLDS after a REWRITE

**SFD-149** Ezreal, Prodigy (Unit, Chaos, E3 P1 M3): *"When you play me, discard 1, then draw 2.
Optional additional costs you pay cost `:rb_energy_1:` or `:rb_rune_rainbow:` less."*
**SFD-211** Marai Spire (Battlefield, Colorless): *"While you control this battlefield, friendly
[Repeat] costs cost `:rb_energy_1:` less."*
**SFD-080** Bellows Breath (Spell, Mind, E1 P1): *"[Action] [Repeat] `:rb_energy_1::rb_rune_mind:`
… Deal 1 to up to three units at the same location."*

## The discount chain, component by component

356.2 adds the `[Repeat]` additional cost in step 2; 356.4 then applies discounts, and 356.4.c puts
component discounts first. Both Marai Spire (Energy component) and Ezreal (Energy **or** Power
component, the player's pick) are component discounts, so 356.4.c.1 lets them be applied in either
order to whichever component they were pointed at. 356.6 floors each at 0.

Bellows Breath is the interesting one because it is the only spell of the lens whose Repeat cost has
**two** components:

| component | printed | − Marai Spire | − Ezreal ×1 | left |
|---|---|---|---|---|
| Energy | `[1]` | `[0]` | — | **0** |
| Power | `[Mind]` | untouched (Spire discounts Energy only) | −`[A]` | **0** |

Total Repeat cost: **0**. 356.4.f allows the reduction to 0; 356.4.f.1 keeps the cost *"paid"*
because the player made the decision to pay it, so 820.1.d.1 executes the instruction a second time.
Bellows Breath deals 1 to up to three units, twice, for its printed E1 + 1 Power.

**Every E2-Repeat spell in the pool goes to 0 the same way** with Spire + one Ezreal, the Energy
component taking both discounts. Grepped list, verbatim costs from `data/corpus_flat.txt`:

| code | name | domain | `[Repeat]` | with Spire + 1 Ezreal |
|---|---|---|---|---|
| SFD-003 | Blood Rush | Fury | `E1` | 0 *(Spire alone)* |
| SFD-031 | Desert's Call | Calm | `E2` | 0 |
| SFD-034 | Feral Strength | Calm | `E2` | 0 |
| SFD-040 | Thwonk! | Calm | `E2` | 0 |
| SFD-066 | Frigid Touch | Mind | `E2` | 0 |
| SFD-080 | Bellows Breath | Mind | `E1 + Mind` | 0 |
| SFD-129 | Temptation | Chaos | `E2` | 0 |
| SFD-136 | Hard Bargain | Chaos | `E2` | 0 |
| SFD-151 | Bonds of Strength | Order | `E2` | 0 |
| SFD-182 | Danger Zone | Fury/Mind | `E1 + A` | 0 |
| UNL-009 | Upstage Comedy | Fury | `E2` | 0 |
| UNL-032 | Double Trouble | Calm | `E2` | 0 |
| UNL-061 | Downstage Dramatics | Mind | `E2` | 0 |
| UNL-134 | Existential Dread | Chaos | `E2` | 0 |

**That is 14, not 11.** #32 writes *"Los 11 hechizos que quedan gratis en total"* and then lists
fourteen codes. Its own list is right; its count is wrong. Corrected here, and the entry declares 14.

Not reachable, as #32 says, and re-checked: `SFD-114 Marching Orders` (`E3` → `E1` with one Ezreal,
and 0 with two), `SFD-023 Piercing Light` (`E2 + Fury` → `E1` or `Fury`), `SFD-077 Rocket Barrage`
(`E4 + Mind` → `E1 + 0` even with Spire + 3 Ezreal, because one of the three discounts has to be
spent on the Mind Power).

## Domain identity and the legend

Ezreal is Chaos, Bellows Breath is Mind, Marai Spire is Colorless → **Mind/Chaos** (103.1.b). Six of
the fourteen live in that pair: Frigid Touch, Bellows Breath, Downstage Dramatics (Mind), Temptation,
Hard Bargain, Existential Dread (Chaos). Four Mind/Chaos legends exist: `SFD-199 Prodigal Explorer`,
`OGN-263 Swift Scout`, `UNL-197 Scorn of the Moon`, `VEN-151 Soul's Reflection`.

**#32's closing move is dropped, and this is the second half of the rewrite.** The issue closes C1 by
having a doubled Bellows Breath turn on `SFD-199 Prodigal Explorer` — *"Draw 1. Use only if you've
chosen enemy units and/or gear twice this turn with spells or unit abilities."* Whether one spell's
two Repeat executions count as *"twice"* is a genuine open question (820.3.a says the spell *"is only
Played once"*, while 820.2 does make two separate sets of choices), and per `CLAUDE.md` the rule is to
try another legal ordering before filing a reading.

There is one, and it is trivial: **play two different unit-choosing spells that turn.** Frigid Touch
(*"Give a unit -2 Might"*), Temptation (*"Move an **enemy** unit"*), Existential Dread (*"[Stun] an
attacking **enemy** unit"*) and Bellows Breath (*"Deal 1 to up to three units"*) are four of the six
free Mind/Chaos spells, and any two of them in a turn satisfy the legend with nothing to interpret.
So **no reading is filed**, and the entry states the legend rider on the two-spell route only.

## Traps, one by one

Empty enemy battlefield (383.4.e/461): no attack trigger in the line. Awaken Energy (167): every
payment is a Main-Phase spell cost. `[Temporary]` (816.1.b): none. Rune recycled for Power (161.2.b):
none. Units enter exhausted (143.4): no unit is deployed for effect here except Ezreal himself.
Recall is not a move (456): none. Two battlefields (485.4.a): **one**, Marai Spire. `[Repeat]` paid
once (820.1.c.3): respected — 0 buys **one** extra execution, never a loop.

**Verdict: HOLDS, rewritten.** Two additions: the Marai Spire **control** requirement (190.1 /
190.6.d), and a legend rider that does not stand on an unruled reading. One correction: 14 spells, not
11.

---

# 2. `ezreal-double-free-accelerate` — HOLDS

**SFD-149** Ezreal, Prodigy ×2. **UNL-127** Mister Root (Unit, Chaos, E2 M1): *"[Accelerate] (You may
pay `:rb_energy_1::rb_rune_chaos:` as an additional cost to have me enter ready.) When I move to a
battlefield, gain 2 XP."*

## The cost goes to 0

805.1.a prints the Accelerate cost as `[1][C]`; 805.1.a.1 fixes the Power component to the unit's own
domain (Chaos, here). Two Ezreals, one discount each:

| component | printed | − Ezreal #1 | − Ezreal #2 | left |
|---|---|---|---|---|
| Energy | `[1]` | −`[1]` | — | **0** |
| Power | `[Chaos]` | — | −`[A]` | **0** |

805.1.a.1 restricts how the Power is **paid**, not what may discount it, and 356.4.f allows an
additional cost to be reduced to 0 outright. 356.4.f.1 then keeps it *"paid"*, and 805.2.b is
explicit that *"paying the cost generates a delayed Replacement Effect"* — so the unit enters ready.
805.6 confirms it *"does not enter exhausted and then become ready"*.

## What that is worth, concretely

143.4 (*"Units enter the Board exhausted"*) plus 144.2 (*"Exhausting the Unit is the Cost"* for a
Standard Move) is why a fresh unit normally does nothing. With the Accelerate free, Mister Root lands
ready, Standard-Moves to a battlefield the same Main Phase (144.1.a), and his *"When I move to a
battlefield, gain 2 XP"* fires **a turn earlier than it otherwise could**, for E2 and one card.

The other two mono-Chaos Accelerate bodies, verbatim: `SFD-131 Ancient Warmonger` (E5 M4, *"I have
[Assault] equal to the number of enemy units here"*) and `SFD-143 Sivir, Mercenary` (E4 P1 M4,
*"[Ganking]"* conditional on having spent 2 Power). 26 printings carry `[Accelerate]` pool-wide; any
of them inside the legend's pair rides the same discount.

## What this does NOT do

**805.6.a**: *"Accelerate will not interact with, or trigger, abilities that are affected by units
becoming ready."* So nothing built on "when a unit becomes ready" fires. #32 lists this as a negative
result and it is correct; recorded on the entry so nobody re-derives it.

## Traps

Two Ezreals cost E6 P2 and two cards before this does anything, and each one's own *"discard 1, then
draw 2"* is card-neutral-plus but costs a discard. `[Repeat]` once (820.1.c.3): not used here.
`[Temporary]`, recall, rune-recycle, Awaken Energy: none apply. Battlefield count: none used.
Copy limit: 2 of 3 (Tournament Rules 703.3.a.3), and Ezreal has no `[Unique]` (825.3.a).

**Verdict: HOLDS as written.** Its one fine leg — that two copies of the same passive discount stack —
is settled above by the absence of any redundancy rule outside the seven keyword clauses.

---

# 3. `yeti-brambleback-renata-gold` — HOLDS after a REWRITE

**UNL-018** Yeti Brawler (Unit, Fury, E6 M6): *"When I conquer, if you assigned 3 or more excess
damage, play two Gold gear tokens exhausted."*
**UNL-029** Red Brambleback ×2 (Unit, Fury, E4 P1 M4): *"[Accelerate] … Your conquer effects for
conquering here trigger an additional time. When I conquer, [Buff] a friendly unit."*
**SFD-171** Renata Glasc, Industrialist (**Unit**, Order, E4 P1 M4): *"Your tokens enter ready."*
**UNL-T05** Gold: *"[Reaction][>] Kill this, `:rb_exhaust:`: [Add] `:rb_rune_rainbow:`."*

## Arithmetic against the entry's own declared quantities

Yeti's *"When I conquer…"* is a Conquer Effect by 383.4.c.1 (the wording is the category's own
example) and 383.4.c.2 (triggered from a unit present during the Conquer). Each Brambleback adds one
trigger instance — **R1 = A with stacking**, ruled 2026-09-03. With K = 2 Bramblebacks:

- instances of Yeti's effect: **1 + K = 3**
- Gold produced: 3 × 2 = **6**
- Renata makes each enter **ready** (**R25 = A**, ruled 2026-09-04, on this exact text pattern:
  Treasure Hunter's *"play a Gold gear token exhausted"* loses to *"Your tokens enter ready"*)
- each Gold: `Kill this, exhaust: [Add] [A]` → **6 Power of any domain**

With K = 3: 1 + 3 = 4 instances → **8 Gold**. Declared quantity in the entry is K = 2 → 6 Gold, and
the entry's text says 6. **The formula matches the declared quantities.**

## Timing: the Power is spendable

167 empties the Rune Pool *"at the start of each player's Main Phase and the end of each player's
turn."* The Conquer happens inside combat, which is inside the Main Phase — after its start. So the
6 Power survives to the end of that turn and no further. **Spend it the turn it appears.** 187.5 makes
the Gold's ability an **exhaust** cost, which is precisely why Renata is load-bearing rather than
decorative.

## The cap, and why it is a cap

466.5.d: *"Establishing Control results in a Conquer if that player has not yet scored this
Battlefield this turn."* One Conquer per battlefield per turn. This is not repeatable inside a turn.
Combined with 485.4.a (one battlefield each, two on the table), the ceiling is one Conquer per turn.

## Excess damage

Attacking Might is 6 (Yeti) + 2 × 4 (Bramblebacks) = **14**. Under **R28 = A** the excess is the
attacking Might beyond the garrison's lethal minimums, so any garrison summing under 11 Might leaves
the 3 or more the trigger asks for — trivially met. See the 465.2.c.4 tail discussed above; it does
not change the verdict under the ruling in force.

**And #32's Reckoner's Arena check is right.** `CLAUDE.md` registers Yeti as excluded from the
`reckoners-arena` synergy rule by 383.4.g.1 (*"If any of the non-conquer parts of the condition are
not fulfilled, it will not be placed on the chain"*) — because a **Hold** assigns no damage. Here the
trigger is a real Conquer following a real combat, damage was assigned, and the exclusion has nothing
to bite on. Verified by opening 383.4.g.1 rather than trusting the parallel.

## The rewrite: everybody has to survive

383.4.c.2.a is explicit that Conquer Abilities go on the Chain *"after the Unit(s) these effects
correspond to **are present at a Battlefield** when a player gains control of it."* So:

- **Yeti (M6) must survive the combat**, or his effect never triggers at all;
- **both Bramblebacks (M4 each) must still be there** when it triggers, or the multiplier is smaller
  than declared.

#32 did not state this. It is the entry's real fragility: three bodies, two of them M4, must all live
through a combat the deck also needs to win. Added to `prerequisites.notable`.

## The legend, corrected

#32 proposes `OGN-253 Hand of Noxus`. Three Fury/Order legends exist: Hand of Noxus, `SFD-187 Void
Burrower`, and **`UNL-187 Piltover Enforcer`** — *"When you conquer, if you assigned 3 or more excess
damage, you may exhaust me to ready a unit."* The Enforcer shares Yeti's exact condition, so the same
combat that makes the Gold also readies a body. That is the right legend for this line, and the entry
says so instead of Hand of Noxus.

## It is ENGINE, not BURST — confirmed

**8 Power is not 8 points.** Grepped Fury and Order for a sink that converts raw Power into points at
a rate that would clear 8 in that window: none exists. #32 declines to promote the class and that is
correct. Class stays **ENGINE**.

## Traps

Empty enemy battlefield (383.4.e/461): the line **requires** a garrison — both for the combat and for
the excess-damage clause — and the entry says so. Awaken Energy (167): checked above. `[Temporary]`
(816.1.b): Gold is not Temporary. Gold printed exhausted: R25 = A. Rune recycle (161.2.b): not used.
Recall (456): not used. `[Repeat]` (820.1.c.3): not used. Two battlefields (485.4.a): the line uses
the **enemy's** battlefield as its target and none of its own — no conflict.

**Verdict: HOLDS, rewritten.** Additions: the survival requirement from 383.4.c.2.a, the one-Conquer
cap from 466.5.d, the spend-it-this-turn window from 167, and Piltover Enforcer as the legend.

---

# 4. `reksai-sarcophagus-accelerated-recursion` — HOLDS after a REWRITE

**SFD-029** Rek'Sai, Breacher (Unit, Fury, E3 M3): *"[Accelerate] … [Assault] … Friendly units played
from anywhere other than a player's hand have [Accelerate]."*
**UNL-148** Cursed Sarcophagus (Gear, Chaos, E4 P1): *"When you play this, banish all units from your
trash. `:rb_exhaust:`: Play a unit banished with this. (You must pay its costs.)"*

## Why the grant reaches the recursion

Sarcophagus **plays** the unit — its own reminder text says *"You must pay its costs"* — so 805.2.a
is satisfied: the Accelerate cost is paid *"as part of the steps of playing a card."* The unit comes
from banishment, which is *"anywhere other than a player's hand"* literally, so Rek'Sai's grant
attaches. Cost: `[1]` + one Power of that unit's domain, and it enters ready (805.2.b, 805.6).

**#32's card choice is the right one and its reasoning is sound.** `UNL-142 Heedless Resurrection`,
`OGN-198 The Harrowing` and `SFD-165 Glasc Mixologist` all play the unit *"ignoring its cost"*, which
would collide with 356.5.a (*"set the total cost to [0], including any non-standard costs"*) and force
an unruled question about whether an ignored cost can still have an optional additional cost paid on
top. Sarcophagus avoids the question outright. That is the ordering-first discipline `CLAUDE.md` asks
for, applied correctly at authoring time.

## Throughput, honestly

`:rb_exhaust:` is the Sarcophagus's cost, and 315.1.b readies it in your Awaken, so this is **one unit
per turn**, not a loop. 151.2 puts the activation in your Main Phase during an Open State. The unit
arrives ready and can therefore Standard-Move (144.2) or pay an exhaust cost the turn it lands —
which is the whole point, since 143.4 would otherwise make it inert until the next Awaken.

## The rewrite: Ezreal is demoted from the mechanism to a rider

#32 lists `SFD-149 Ezreal, Prodigy ×2` inside the candidate. Ezreal is a **discount**, not part of
the mechanism: without him the line still works at `[1]` + 1 Power per unit, which the issue itself
concedes. Declaring two Ezreals in `uses` would make `planDeck` charge a deck two copies of a card the
engine does not need. The entry is authored as **Rek'Sai + Sarcophagus**, with the Ezreal ×2 upgrade
named in `prerequisites.notable` and cross-referenced to `ezreal-double-free-accelerate`.

## The reading #32 correctly declined to file

Whether Rek'Sai's grant reaches **tokens** (played from outside the game, not from hand) is left
unanswered, and it should be: `SFD-171 Renata Glasc, Industrialist` makes tokens enter ready with no
condition and no cost, so it strictly dominates Rek'Sai in that role and no entry needs the reading.
Confirmed — `SFD-171`'s text is *"Your tokens enter ready"*, full stop.

## Traps

Domains: Rek'Sai Fury, Sarcophagus Chaos → **Fury/Chaos**; five legends cover it (`OGN-251 Loose
Cannon`, `OGS-017 Dark Child - Starter`, `SFD-185 Glorious Executioner`, `UNL-185 Bloodharbor Ripper`,
`VEN-143 Master of Shadows`). Sarcophagus needs units already in the trash when it is played — a real
prerequisite, stated. Rek'Sai must be on the board when the recursion is played, since 365.1 keeps a
permanent's passive active only on the board. `[Repeat]`, `[Temporary]`, recall, rune-recycle, Awaken
Energy, two battlefields: none apply.

**Verdict: HOLDS, rewritten.** Ezreal moved out of `uses`; the once-per-turn cap and the
units-in-trash prerequisite stated.

---

# 5. `daughter-void-marai-curtain-call` — HOLDS after a REWRITE

**UNL-182** Curtain Call (Spell, Fury/Mind, E4): *"[Repeat] — `:rb_energy_1:` / `:rb_rune_rainbow:` /
`:rb_energy_1::rb_rune_rainbow:` … Choose one you haven't already chosen — • Draw 1. • Deal 2 to a
unit at a battlefield. • Deal 3 to a unit at a base. • Give a unit at a battlefield -4
`:rb_might:` this turn."*
**SFD-211** Marai Spire. **OGN-247** Daughter of the Void (Legend, Fury/Mind): *"`:rb_exhaust:`:
[Reaction] — [Add] `:rb_rune_rainbow:`. Use only to play spells."*

## Three instances, and the rule that lets them be separate

820.1.c.2: *"If a spell or ability has more than one instance of Repeat, each Cost may be paid or not
paid individually."* 820.3: the instructions execute *"an additional time on resolution for each
instance of Repeat that is paid for."* Curtain Call is the pool's only card with three printed
instances, so base + 3 = **4 executions**, and the card's own *"you haven't already chosen"* makes
those exactly the four printed modes.

## Arithmetic, with Marai Spire applied per instance

Marai Spire says *"friendly [Repeat] **costs** cost `[1]` less"* — plural, one reduction per Repeat
cost, not one per spell.

| instance | printed | − Marai Spire | to pay |
|---|---|---|---|
| #1 | `E1` | −`E1` | **0** |
| #2 | `[A]` | no Energy component to reduce (356.6) | 1 Power |
| #3 | `E1 + [A]` | −`E1` | 1 Power |

Plus the printed base cost of **E4**. Total: **E4 + 2 Power**, of which one Power comes free from the
legend: 357.1.a lets Reaction Add abilities be used *"to add Energy and Power to pay the card's
costs"*, and 429.3 says the same in the other direction. Daughter of the Void's Add is restricted to
*"play spells"*, which is what this is.

**Real cost: E4 + 1 Power for all four modes.** Without the Spire and without the legend: E4 + E1 +
`[A]` + (E1 + `[A]`) = **E6 + 2 Power**. Saving: **E2 + 1 Power**, exactly as #32 declares.

## The ceiling, and why a fourth instance would be dead

A fifth execution has no mode left to choose, and 820.1.d.2 says *"Any instructions not performed on
resolution of the spell or ability are ignored."* So `SFD-078 Temporal Portal` (*"Give the next spell
you play this turn [Repeat] equal to its cost"*) adds nothing here. `UNL-216 The Academy` could not be
in the deck alongside Marai Spire in any case — **485.4.a**, one battlefield used per player.

## The rewrite

Same as C1: **Marai Spire's discount needs you to control the battlefield** (190.1, 190.6.d). Stated
on the entry. Without control, the line is E6 + 1 Power with the legend, which is still four modes for
one card and still worth having — the entry gives both numbers instead of only the good one.

## Traps

Awaken Energy (167): the legend's exhaust and the Add both happen in the Main Phase, inside the Pay
Costs step (429.3), so nothing is lost. **The re-exhaust trap (429.3 / R21)** is the one that could
have bitten: there is no window to ready and re-exhaust the legend between Repeat executions, so the
legend contributes exactly **one** Power, which is what the table assumes. `[Repeat]` paid once per
instance (820.1.c.3): respected — three instances, three payments, no loop. `[Temporary]`, recall,
rune-recycle, units-enter-exhausted, empty battlefield: none apply. Legend readies in the next Awaken
(315.1.b), so this is once per turn.

**Verdict: HOLDS, rewritten.** Addition: the control requirement, and the un-discounted number
alongside the discounted one.

---

# 6. `existential-dread-repeat-bounce` — HOLDS

**UNL-134** Existential Dread (Spell, Chaos, E1 P1): *"[Action] … [Repeat] `:rb_energy_2:` … [Stun] an
attacking enemy unit. If it's already stunned, return it to its owner's hand instead."*

## The trick, and the rule that licenses it outright

820.2.a's worked example is not a paraphrase of what this needs — it is the thing itself: *"they may
choose the same mode or a different one, and if they choose the same mode, **may choose the same
target** or a different one."* So both executions may name the same attacker.

820.1.d.1 then makes resolution read as though the card said the instruction twice:

1. execution #1 — the unit is not stunned → **it is stunned**;
2. execution #2 — *"If it's already stunned"* is now true → **returned to its owner's hand instead**.

Stun does not remove the Attacker designation (its own reminder text says only *"A stunned unit
doesn't deal combat damage this turn"*), so the target is still legal at resolution. 820.2 puts both
choices in the Make Relevant Choices step of the single play, and 820.3.a confirms the spell is
*"only Played once"* — which matters only in that nothing "when you play a spell" doubles.

The result is **unconditional removal of an attacker**: a bounce, not a stun, so it survives the
attacker being unkillable, and it costs the opponent the replay.

## Cost

Raw: E1 + 1 Power, plus E2 for the Repeat. Under the C1 discount pair (Marai Spire controlled + one
Ezreal) the Repeat goes to **0**, so the whole thing is **E1 + 1 Power**. Both numbers are on the
entry.

`[Action]` (*"Play on your turn or in showdowns"*) is what lets it be used on the opponent's turn,
which is when enemy attackers exist. Mono-Chaos: Existential Dread and Ezreal are Chaos, Marai Spire
is Colorless, so any legend with Chaos in its pair runs it.

## Why it gets its own row rather than a footnote on C1

#32 marks this one thin and asks a human to decide. It gets a row: the same-target trick is a fact
about **Existential Dread** that is not derivable from C1's "your Repeat costs are 0" — C1 tells you
the spell doubles, it does not tell you that doubling converts a conditional stun into an
unconditional bounce. That is the information a catalogue exists to carry.

## Traps

`[Repeat]` once (820.1.c.3): one extra execution, so a **third** stun-to-bounce is impossible.
`[Temporary]`, recall, rune-recycle, Awaken Energy, units-enter-exhausted, empty battlefield, two
battlefields: none apply.

**Verdict: HOLDS as written**, with the raw cost stated next to the discounted one.

---

# Summary

| # | id | verdict | class |
|---|---|---|---|
| C1 | `ezreal-marai-spire-free-repeat` | HOLDS after rewrite (control requirement; 14 not 11; legend rider re-grounded) | ENGINE |
| C2 | `ezreal-double-free-accelerate` | HOLDS as written | ENGINE |
| C3 | `yeti-brambleback-renata-gold` | HOLDS after rewrite (survival requirement; conquer cap; Piltover Enforcer) | ENGINE |
| C4 | `reksai-sarcophagus-accelerated-recursion` | HOLDS after rewrite (Ezreal out of `uses`; once-per-turn cap) | ENGINE |
| C5 | `daughter-void-marai-curtain-call` | HOLDS after rewrite (control requirement; both cost numbers) | ENGINE |
| C6 | `existential-dread-repeat-bounce` | HOLDS as written | ENGINE |

**6 hold, 3 of them rewritten, 0 refuted. No new rules reading filed.** Two rules the project had
never cited did the work: **190.1** (*"Control is established over Battlefields through the course of
play"*) and **190.6.d** (an uncontrolled battlefield's *"you"* refers to no one), which together turn
Marai Spire from a free discount into a battlefield you have to take — and, with **485.5**, one you
first have to draw.

## What the next lens should not re-derive

- **`[Repeat]` can never loop.** 820.1.c.3, *"Each Repeat Cost can be paid only a single time."* A
  Repeat cost discounted to 0 still buys exactly one extra execution. Issue #32 opened on the
  opposite hypothesis and closed it by rule, which is the right way to close one.
- **`[Repeat]` does not double "when you play" triggers.** 820.3.a: the spell *"is only Played once"*
  regardless of how many times its instructions execute.
- **`UNL-216 The Academy` and `SFD-078 Temporal Portal` are not free value.** They grant an *instance*
  of Repeat *"equal to its base cost"* / *"equal to its cost"* — a conversion of Energy into effect,
  not a discount. The lens's only real discount is Marai Spire, and the only card that takes one to 0
  is Ezreal.
- **Nothing hangs off Accelerate readying a unit.** 805.6.a: it *"will not interact with, or trigger,
  abilities that are affected by units becoming ready"*, because 805.6 makes it a replacement, not a
  ready event.
