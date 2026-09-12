# Uncited Core Rules sub-rules, 500–899

Issue #191. Session `rc-walk-fc`, 2026-09-07. Rules version 2026-07-16. Successor slice to #173,
which closed the Fury/Chaos lane and the ten orphan dual-domain Signature spells.

Card text verbatim from `data/corpus_flat.txt` (grep). Every rule number opened in
`data/Riftbound-Core-Rules-2026-07-16.txt` and **pasted, not typed** — and, after a defect found in
my own #173 work, **pasted untruncated**: an elision is marked with an ellipsis, because a sentence
closed with a period reads as complete and the tail of a clause is where this project keeps finding
its answers.

## 1. The vein, and the probe — built independently

`rc-walk-blocks` measured that 207 of the Core Rules' 385 top-level numbers are cited by nothing, and
published a sharper probe one level down: collect every `NNN.x.y.` sub-rule heading, drop the ones
already cited anywhere in `data/combos.json` or `data/synergies.json`, and keep the ones whose
following lines contain `Example:` — because a worked example is Riot saying the case is real, and it
usually names a card by name.

**The probe here was written from scratch rather than reused**, on the manager's instruction, so that
a disagreement between two independent probes would itself be a finding. `.scratch/probe-500-899.ts`.

| measure | 500–899 |
|---|---|
| sub-rule headings (`NNN.x…`, two or more components) | 408 |
| of those, **uncited** anywhere in `combos.json` or `synergies.json` | **172** |
| of those, carrying a **worked example** within 14 lines | **39** |
| by block | 600s: 5 · 700s: 22 · 800s: 12 |

No disagreement with `rc-walk-blocks` can be reported yet, because the two ranges are disjoint by
design (they keep 100–499). What can be said is the method matched: a substring test for the exact
paragraph token against both data files, which is deliberately generous — it counts a paragraph as
cited even when it appears only inside a prose note, so **172 is a floor on the uncited population,
not a ceiling**.

## 2. The 39 rows, so the vein is inherited fully mapped

| 
| --- the rows ---
| 652.1	L5855	652.1. Banish all permanents, runes, and facedown cards they currently control and all permanents, runes,
| 652.2	L5858	652.2. Remove the Battlefield they contributed to the game if it is in use.
| 652.2.a	L5860	652.2.a. If it was in use, Replace it with a token battlefield with no abilities.
| 652.2.b	L5862	652.2.b. Any units or hidden cards there do not move and are otherwise unaffected by this process.
| 652.2.c	L5865	652.2.c. If the removed battlefield was applying any continuous effects, those continuous effects
| 714.2	L5966	714.2. If, for any reason, Bonus Damage would be a negative number, then no Bonus Damage is applied to
| 715.3	L5980	715.3. If the Deal action Splits damage, then the Bonus Damage applies to the amount of Damage that
| 715.4.a	L5997	715.4.a. If Damage is replaced or reduced by any means, the replacing or reducing action will
| 719.2	L6045	719.2. This card ceases being a Top-Most Card when there are no longer any cards Attached to it.
| 719.3	L6047	719.3. A Top-Most Card and all cards Attached to it are at the same location.
| 719.3.a	L6049	719.3.a. When the Top-Most Card changes locations, all Attached cards change locations with it.
| 719.4	L6051	719.4. The Exhausted and Ready state of the Top-Most card does not affect nor change the status of the
| 719.4.a	L6054	719.4.a. This is true of all statuses aside from location, Attached, and Top-Most.
| 721.1	L6072	721.1. Text marked this way is not applied at all while in this state.
| 722.2	L6082	722.2. Game Effects that parse or interpret text to determine target eligibility may still parse Inactive text
| 725.3	L6102	725.3. If an Attached card has an Equip ability, the Weaponmaster keyword can reference that Equip
| 725.4	L6105	725.4. If a Dependent Ability is a Triggered Ability whose condition occurs at the same time as the
| 727.1	L6111	727.1. A Dependent Keyword is comprised of both a Condition that it is short for, and an ability of some
| 727.1.a	L6117	727.1.a. A Dependent Keyword will always be functionally short for a Condition.
| 727.1.a.1	L6119	727.1.a.1. This Condition may also have a determined Duration, Time, or Limitation as part
| 727.1.b	L6130	727.1.b. The Dependent Ability associated with the Dependent Keyword is Inactive on the card
| 727.1.b.1	L6133	727.1.b.1. The Dependent Ability is present on the card for the sake of reference or
| 727.1.b.2	L6137	727.1.b.2. The Dependent Ability is Active exactly as written while the Condition is true
| 727.1.b.3	L6141	727.1.b.3. If an ability has multiple Dependent Keywords, all of them must have their
| 761.1	L6360	761.1. 1. Stating the exact name of the card.
| 761.2	L6363	761.2. 2. Identifying a combination of traits and characteristics that can identify that card uniquely.
| 806.3	L6502	806.3. Action does not alter the function of any instruction of the corresponding card or effect it is on. It is
| 808.1.c.1	L6572	808.1.c.1. [Effect] is the rules text of the Deathknell effect.
| 809.1.b	L6607	809.1.b. It is formatted as "Deflect [X]".
| 809.1.b.1	L6609	809.1.b.1. The X is referenced in the functional text of the ability.
| 809.1.b.2	L6611	809.1.b.2. The X is referred to as the Deflect Value.
| 809.1.b.3	L6613	809.1.b.3. If X is omitted, it is presumed to be 1.
| 811.2	L6714	811.2. Abilities and instructions of hidden cards other than the choices listed above function as normal.
| 812.1.a	L6739	812.1.a. It is formatted as "[Legion][>] [Text]".
| 812.1.b.2	L6746	812.1.b.2. The [Text] is the Dependent Ability.
| 814.1.b.2	L6817	814.1.b.2. The X is referred to as the Shield Value.
| 814.1.d.1	L6826	814.1.d.1. Shield remains in effect as long as the Unit maintains the Defender designation.
| 822.1.d	L7087	822.1.d. Ambush can also appear as a verb on a card. In such a case, the verb is taken to mean “play

The three walked in batch 1 are **715.3**, **725.3 / 722.1 / 722.2** and **719.5 / 723 / 724**. The
rows a successor should open first, with why:

- **727.1.b.3** — *"If an ability has multiple Dependent Keywords, ALL of them must have their
  Condition met in order for the ability to be active."* The pool prints exactly two abilities with
  chained dependent keywords, both `[Empowered][>][>>][Deathknell][>]`: `VEN-078 Baccai Witherclaw`
  and `VEN-128 Noxian Emissary`. Both are in `empowered-deathknell-blade-ruined-king`, so a new entry
  needs a different partner — but the RULE is uncited and it is the paragraph that whole family
  stands on.
- **822.1.d** — *"Ambush can also appear as a verb on a card. In such a case, the verb is taken to
  mean 'play with the permissions of the Ambush keyword.'"* Riot's worked example is
  `UNL-120 Rengar, Trophy Hunter` by name (in one entry). This is the rule behind every card that
  widens or narrows [Ambush], including `UNL-166 Stalking Wolf`, which the catalogue currently
  explains from card text alone.
- **719.4 / 719.4.a** — the Exhausted, Ready **and every other** status of a Top-Most Card is
  independent of its attachments, with worked examples for Stunned and Empowered. Measured while
  looking for a user: **no Equipment in the pool has `[Empowered]` in its Effect Text**, so the
  Empowered half has no card today; the Stunned half may have one.
- **761.1 / 761.2** — how a card is *named* by an effect: the exact name, or *"a combination of
  traits and characteristics that can identify that card uniquely."*
- **652.1 / 652.2.x** — a player leaving the game, including *"Replace it with a token battlefield
  with no abilities."* Multiplayer only, and `matchDeck` reads one list, so this is a note rather than
  an entry until the two-deck matcher of #118 exists.

## 3. Batch 1 — three entries

### 3.1 `volibear-furious-annie-fiery-split-more-targets` — OGN-041 + OGS-001

**715.3 is Riot writing this exact pair down, and it says something 715.1 and 715.2 do not**: *"If the
Deal action Splits damage, then the Bonus Damage applies to the amount of Damage that will be Split.
**This can alter the number of targets eligible to be chosen.**"* The worked example is Volibear,
Furious with Annie, Fiery: 6 damage split among up to **6** units rather than the usual 5. A +1 static
on a Split is +1 damage **and +1 body**.

That makes three distinct shapes in the family and the catalogue now has one entry for each:
715.1 single target, 715.2 each target of a multi-target Deal (`icathian-rain-...`, at the pool's
maximum of six Deal actions), 715.3 the Split.

**715.4 is the floor**: *"If no damage was Dealt, then Bonus Damage will not apply."* Bonus Damage
never CREATES a Deal action — Riot's example is a Teemo, Strategist reveal that finds no [Hidden]
cards, so an attached Rabadon's Deathcrown's 3 Bonus Damage has nothing to attach to.

And the entry names its own mirror: Volibear's trigger does **not** specify a unit as the damage
source, so 417.6.b.3 does not exclude it and Annie reaches it — the opposite of
`last-breath-beast-below-unforgiven-unit-damage-ready`, where it does and she does not. Each entry
points at the other.

### 3.2 `riven-shattered-svellsongur-weaponmaster-pull` — VEN-041 + SFD-059

**725.3 is the paragraph this project has been deriving from reminder text for days**: *"If an
Attached card has an Equip ability, the Weaponmaster keyword can reference that Equip ability and any
abilities that passively modify that Equip ability."* Without it there would be nothing left to
reference — 718.2 makes an attached card's printed Rules Text Inactive and 721.2 says Inactive
abilities *"cannot be activated"*. So the keyword's printed tail, *"even if it's already attached"*,
has a rule behind it, and so does the fact that a cost-modifier on that [Equip] still applies.

722.1 is the companion, also uncited: *"Cards with Inactive text still have keywords for the sake of
Game Effects that want to reference or see if a card has a keyword."*

**The limit is stated**: [Weaponmaster] equips *"to me"*, so it relocates a carrier-dependent
Equipment only onto **itself**. `SFD-208 Forge of the Fluft` remains the pool's only free attach that
places one on a **chosen** carrier. Two different tools, and the catalogue should not conflate them.
And the discount is priced honestly: Svellsongur's [Equip] is 1 Energy **and** a Calm rune, so *"one
rainbow less"* leaves the Energy.

### 3.3 `spinning-axe-factory-recall-inactive-temporary` — SFD-186 + SFD-135

**Riot names the card to explain the rule.** 722.2: *"…Example: Spinning Axe is a gear with
[Temporary]. While it's attached and its rules text is inactive, its [Temporary] ability doesn't
trigger. However, a spell that reads 'Destroy a gear with [Temporary]' could still choose and destroy
Spinning Axe."* Silenced while attached, still visible to anything that reads text.

**719.5 is the clock restarting**: *"When a Top-Most Card changes zones from a board zone to a
non-board zone, all Attached cards Detach from it, remaining in their current zones."* The carrier
dies, the Axe detaches, its printed text goes Active, and 816.1.b is live. [Quick-Draw] (819.1.d) is
why the answer is cheap — no [Equip] cost is ever determined, so a replay re-attaches it free.

And 723 with 724 is the inversion worth stating beside 718.2: *"Rules Text is never Inactive by
default"*, *"Effect Text is Inactive unless the card with the Effect Text is Attached."* Unattached,
printed text on and Effect Text off; attached, exactly the reverse.

**A defect in this entry's own first draft, recorded rather than quietly fixed.** It carried a DOMAIN
legend line — the five Fury/Chaos names. `SFD-186 Spinning Axe` is a **Signature** card tagged Draven,
so 103.2.d.2 narrows the field to `SFD-185 Glorious Executioner` alone. The replicated second check of
`test/legend-lines.test.ts`, run against the staging file **before** reporting, caught it. Worth
running on every draft that touches an Equipment: a Signature Equipment reads like an ordinary one.

## 4. Refusals from batch 1

- **`719.4` / `719.4.a`'s Empowered half.** Refused for want of a card: swept the corpus for an
  Equipment with `[Empowered]` in its Effect Text and there is **none**, so "an attached gear's
  Empowered state is independent of its carrier's" has no user today. The Stunned half is still open.
- **`652.1` / `652.2.a` (a player leaving the game; the battlefield is replaced with a token
  battlefield with no abilities).** Refused as unrepresentable: it is a multiplayer rule, and
  `matchDeck` reads one list — the same wall #118 recorded for team combos.
- **A second Bonus Damage source read as a multiplier on a Split.** Refused by 714: instances are
  *"summed and applied once"*, so Annie plus `OGN-032 Ravenborn Tome` is 7 damage over up to 7 bodies,
  not 6 twice.
- **[Weaponmaster] used to place a carrier-dependent Equipment on a body other than itself.** Refused
  by the keyword's own wording (*"to me"*), which 725.3 does not widen — it only makes the Inactive
  [Equip] referenceable.

## 5. Batch 2 — five entries (session rc-walk-fc, successor; 2026-09-07)

Staged to `/tmp/rc-walks/rc-walk-fam1.json` after the manager confirmed batch 1 merged at `39d3c25`.
`validateCombos` clean, `legendcheck-fc.ts` PASS, `audit-fc.ts` clean over 2,173 rule references.

### 5.1 `noxian-emissary-matriarch-of-war-chained-dependent-keywords` — VEN-128 + VEN-153

**727.1.b.3** was the row the batch-1 handoff pointed at and it is the paragraph the whole
`[Empowered][>][>>][Deathknell][>]` family stands on: *"If an ability has multiple Dependent Keywords,
all of them must have their Condition met in order for the ability to be active."* Riot's worked
example is a unit reading `[Level 11][>>][Legion][>] When you conquer, gain 1 point` — 11 XP **and**
another card finalized that turn. 727.1.b keeps the text on the card until then, and 727.1.b.1 says it
is present *"for the sake of reference or evaluation"*.

**The counted set was wrong in the batch-1 document and is corrected here.** A grep for the chain
marker `[>>]` over `data/corpus_flat.txt` returns **three** rows, not two (measured 2026-09-07):

| row | chain | governed by |
|---|---|---|
| `VEN-078 Baccai Witherclaw` | `[Empowered][>][>>][Deathknell][>]` | 727.1.b.3 |
| `VEN-128 Noxian Emissary` | `[Empowered][>][>>][Deathknell][>]` | 727.1.b.3 |
| `UNL-049 Honeyfruit` | `[Level 6][>] [>>][Reaction][>] :rb_exhaust:: [Add] …` | **727.1.c.3**, not 727.1.b.3 |

Only the first two chain two **Dependent** keywords. **813.1: *"Reaction is a Permissive keyword."***
So Honeyfruit hangs a Permissive keyword off a Dependent one and 727.1.b.3's *"all of them"* never
engages; the paragraph that governs it is 727.1.c.3 — *"Activated Abilities that become Active from
Dependent Keywords can be activated at their associated timing after that ability has been granted"*.

The partner is the legend, because the Emissary's Empower payment is a free ride for
`VEN-153 Matriarch of War` (*"When you empower something else, empower me"*), whose own payoff opens
*"Disempower me"* and so re-arms her for the next one. 415.3.a caps her at one activation a turn
whatever you empower.

### 5.2 `rengar-trophy-hunter-poppy-ambush-verb-attack` — UNL-120 + UNL-178

**822.1.d** — *"Ambush can also appear as a verb on a card. In such a case, the verb is taken to mean
'play with the permissions of the Ambush keyword.'"* — was cited by nothing even though its worked
example quotes `UNL-120 Rengar, Trophy Hunter` **by name**.

**The reading this entry adds: the verb widens the DESTINATION and never the SPEED.** 822.1.b is two
clauses joined by *"and"* — *"I may be played to a battlefield where you control Units"* and *"I have
[Reaction] as long as I'm being played to a battlefield where you control Units."* Rengar's own text
lifts the first at an enemy-only battlefield; the **second carries its own condition**, unmet there.
So his signature play is a **Main Phase** play. `UNL-166 Stalking Wolf` loses the Reaction half for the
same reason, which this project had explained from card text alone — the rule generalises it.

Counted set: fourteen cards print `[Ambush]`, **exactly two use it as a verb** — UNL-120 and UNL-166.
822.1.d's *second* worked example (a card restricting opponents' Ambush) has **no card in the pool**.

Rengar is the pool's third card that attacks without moving (190.3.a.1 + 464.2.c.1), beside
`SFD-093 Dauntless Vanguard` and `OGN-161 Deadbloom Predator`, and the only one that reaches a
battlefield where you control nothing. Once he is there, 822.1.b's ordinary condition is satisfied and
the whole Ambush package can follow at Reaction speed — Poppy's `[Tank]` (815.1.b, 815.1.c.2) then
makes Rengar an invalid damage assignment until she has taken lethal five.

### 5.3 `the-list-mel-defiant-soul-named-tag-banish-gate` — UNL-138 + VEN-110

**763 / 763.1 were uncited, and the closed list is exactly the pool.** Measured 2026-09-07 against
`data/cards.json`: **763.1 names 127 tags and the pool prints 127, and the two sets are identical in
both directions.** So the rule never binds `UNL-138 The List`; only foresight does, because 752.2
freezes an *"as you play this"* choice. Transcription caveat for the next reader: the rules text wraps
the line mid-name and the extracted text reads `Miss, Fortune`; read as two tags it produces a false
mismatch.

**Naming a tag is not naming a card, and that is why it reaches tokens.** 762.2 forbids naming a
token's NAME; 763 asks only that the tag exist *"on cards or tokens"*, and 187.3 / 187.4 / 187.7 hand
Sand Soldier, Mech and Bird tokens their tags by rule.

**761.1 / 761.2 / 762 / 762.1 — the card-naming half of the same block — have no user in the pool.**
A grep for `name a card|name a unit|guess|name a tag` over `data/corpus_flat.txt` returns exactly one
row, and it names a tag. Recorded so nobody spends a walk hunting the card.

### 5.4 `allay-petricite-monument-deflect-value-sums` — UNL-041 + SFD-104

809.1.b / .b.2 / **.b.3** (*"If X is omitted, it is presumed to be 1."*) with **809.2** (*"…the Deflect
Value of all granted Deflect keywords is summed"*): two bare grants are **Deflect 2** on the garrison,
and 809.1.c charges that **per choice**, in any Domain (809.1.c.1), as a Mandatory Additional Cost
(809.1.d).

**The granter census, with its members and its one printed opt-out** (measured 2026-09-07 over
`data/corpus_flat.txt`): four cards grant `[Deflect]` to units other than themselves by a static —
`OGN-063 Spirit's Refuge`, `SFD-071 Breakneck Mech`, `SFD-104 Petricite Monument`, `UNL-041 Allay,
Eager Admirer`. Two more grant it by a different mechanism: `SFD-102 Hexdrinker` through attached
`[Effect]` text, and `UNL-044 Flurry of Feathers` by minting Birds that carry it under 187.7. And
**Spirit's Refuge alone prints a clause opting out of the summing** — *"Friendly buffed units have
[Deflect] **if they didn't already**"* — so it can be a first source and never a second.

The Monument's `[Temporary]` is a feature: 816.1.b kills it at **your** 315.2.a, so it taxes the whole
of the opponent's turn and is gone before 315.2.b.2 asks what you hold.

### 5.5 `bushwhack-ferrous-forerunner-mechs-enter-ready` — SFD-004 + SFD-021

**811.2** — *"Abilities and instructions of hidden cards other than the choices listed above function
as normal."* — was uncited, and **its worked example is `OGN-053 Stand United` by name**. Bushwhack has
the same shape with no confined part at all: it chooses nothing (811.1.d.2 silent), it is a spell
(811.1.d.1 silent), and the only thing it plays is a **gear** token, which 811.1.d.3 does not reach
because that clause says *"unit"*. So *"Friendly units enter ready this turn"* reaches your base.

811.6 is what makes it fast: *"A card that is Hidden gains Reaction while facedown or played from
facedown…"* — a card printing **no** timing keyword becomes a 0-Energy Reaction. 811.3 keeps the
ordinary 2 Energy + 1 Power line open.

It is also the **widest** alteration of 143.4 in the pool for the turn it covers: `SFD-171 Renata
Glasc, Industrialist` reaches only tokens and `OGN-011 Magma Wurm` only *other* friendly units, while
this reaches everything you play that turn — the Forerunner's own base-born Mechs included, which is
the walk-to-the-battlefield bottleneck answered for one turn.

## 6. Findings that belong to OTHER entries, not to a new one

- **`peak-guardian-stand-united-hidden-garrison-pump` should cite 811.2.** It reasons the hidden-card
  split out of 811.1.d.2 by argument (*"the amplifier sentence chooses nothing and names no
  location"*) — and **811.2 states it outright, with Stand United as its worked example, by name**.
  A citation upgrade, deliberately not a second entry on the same card set.
- **`audit-quotes-fc.ts` flags 7 of 340 quoted passages across the #173 set as not verbatim.** Six are
  parenthetical paraphrases the auditor catches by quote shape. One looks substantive and is left for
  a successor: `dune-surfer-armed-assailant-ignore-tank` quotes 766 correctly but appends an
  **Example** — 766 carries exactly one example in the rules file, and it is about **Deflect**, not
  Backline. Check before re-quoting.

## 7. Refusals from batch 2, each with the scope of the refusal

| refused | the paragraph that refuses it | scope |
|---|---|---|
| **761.1 / 761.2 / 762 / 762.1** (naming a CARD) | no card — the pool's only naming effect (`UNL-138 The List`) names a **tag**, so 763 applies and 761/762 never do | want of a card; reopen if a set prints a "name a card" effect |
| **725.4** (a Dependent Ability that is a Triggered Ability whose condition coincides with the keyword's) | no card — all five `[Legion] — When you play me…` rows (`OGN-016`, `OGN-020`, `OGN-217`, `OGN-218`, `OGN-243`) need **another** card played first, so the keyword's condition is necessarily met strictly *before* the trigger | want of a card; `727.1.c.1.a` is its twin and dies the same way, since no `[Level N][>]` conquer/hold trigger exists |
| **714.2** (negative Bonus Damage) | no card — all seven Bonus Damage sources (`OGN-032`, `OGN-296`, `OGS-001`, `SFD-191`, `UNL-020`, `VEN-010`, and Void Gate's location-worded row) are positive | want of a card |
| **719.4 / 719.4.a**, Stunned half | no card — 423 defines Stunned on **Units** and an attached card is gear, so a Top-Most Card's stun has no attached-card status to be independent *of* | both halves now refused: batch 1 refused the Empowered half for want of an Equipment with `[Empowered]` in its Effect Text |
| **822.1.d's second worked example** (a card restricting opponents' Ambush) | no card — fourteen `[Ambush]` rows, two verb uses, both **widening** | the restricting half only; the widening half is entry 5.2 |
| **811.1.d.3 as a headline** | already cited in six places | as a headline rule; it is used as supporting text in 5.5 |

## 8. Batch 3 — five entries (2026-09-09, after the pause)

Staged to `/tmp/rc-walks/rc-walk-fam1.json`, which was **replaced** (batch 2 merged at `ec3a2e7`).
`validateCombos` clean · legend-lines PASS, including **one Signature-forced check** · 208 rule
references all exist · **48 quoted passages all verbatim**.

### 8.1 `darius-executioner-vanguard-captain-legion-clause-boundary` — OGN-243 + OGN-218

**812.1.b draws a line through the card**: *"Starting from the Keyword to the end of the clause, the
entire statement is the Legion Ability."* Darius prints two sentences; the Legion Ability ends at the
first period, so **"Other friendly units have +1 Might here" is unconditional**.

Ten Legion cards in the pool (`OGN-012`, `OGN-016`, `OGN-020`, `OGN-021`, `OGN-217`, `OGN-218`,
`OGN-243`, `OGN-253`, `OGN-254`, `UNL-025`). **Exactly two carry rules text outside the clause**:
Darius (after) and `OGN-254 Noxian Guillotine` (before).

**A correction to a load-bearing note in `CLAUDE.md`.** It says `UNL-077 Soul Shepherd` is *"the only
PERMANENT fix"* for 1-Might tokens and that this narrows a swarm shell to Mind. Swept 2026-09-09 for a
static, non-*"this turn"* `+N Might` on friendly units, the pool has **seven**: `OGN-151` (Body, +2,
buffed units at my battlefield), `OGN-243` (Order, +1, here), `OGS-013 Garen, Commander` (Order, +1,
here — the identical sentence), `UNL-077` (Mind, +1, *token* units, board-wide), `UNL-147 Baron Nashor`
(Chaos, +2, board-wide), `UNL-191 Wuju Master` (Calm/Body legend, +1 at [Level 6]), `VEN-018 Rage
Amplifier` (Fury gear, +1, +2 while Empowered). Soul Shepherd is the only **board-wide token-scoped**
one. **An Order swarm has two of its own, and Fury — which `CLAUDE.md` says cannot fix its tokens
because Soul Shepherd is Mind — has `VEN-018`.**

The first sweep of that set *missed Darius*, because it filtered out lines containing `this turn` — and
his `this turn` is inside the **Legion reminder**, not the aura. The clause boundary the rule draws is
the boundary the grep needed.

`OGN-253 Hand of Noxus` is the only Legion card whose reminder says *"a card"* rather than *"another
card"*. That is **correct, not errata**: 812.1.c wants a card *"different than the one with the Legion
ability"*, and a legend is never played.

### 8.2 `fortified-position-mutated-mouser-shield-lasts-the-combat` — UNL-036 + OGN-279

**814.1.d.1** (*"Shield remains in effect as long as the Unit maintains the Defender designation"*) is
why `OGN-279 Fortified Position`'s *"this combat"* is exactly the right duration. The phrase
*"this combat"* appears on **two** cards in the pool — OGN-279 and `SFD-110 Fiora, Peerless`, whose
clause doubles Might and grants no keyword.

814.2's worked example settles that a **printed** Shield joins the sum (Stalwart Poro's bare 1 + Block's
3 = 4), so the Mouser is Shield 4 and defends as a 5 — a 2-Energy body that 815.1.b and 815.1.c.2 force
the attacker to spend five on **first**. 814.1.c keeps it a 1 for every Main-Phase count.

### 8.3 `guerilla-warfare-ava-achiever-hidden-outside-facedown` — OGN-264 + OGN-107

**811.5.a** — *"This is independent of the state of being facedown."* — is the only reason the pool's
four `[Hidden]`-readers work, because **none of them reads a face-down card**: `OGN-107 Ava Achiever`
reads HAND, `OGN-121 Teemo, Strategist` reads the top five of the MAIN DECK, `OGN-263 Swift Scout`
reads HAND, `OGN-264 Guerilla Warfare` reads the TRASH.

`OGN-264` is **Signature**, tagged Teemo, so 103.2.d.2 collapses the legend field to **one name**,
`OGN-263 Swift Scout`. The legend-lines check confirmed it — the Signature-Equipment trap from batch 1,
in its spell form.

### 8.4 `mosstomper-gustwalker-level-passive-lands-on-the-hold` — UNL-047 + UNL-075

**727.1.c.2**: *"Passive Abilities begin applying at the same time the Dependent Keyword becomes true."*
Two `[Hunt 2]` bodies at one held battlefield pay 4 XP inside 315.2.b.2's Scoring Step, crossing both
`[Level 3]` rungs **at that instant** — and Mosstomper's `[Deflect]` is therefore live for the Closed
State the Hold trigger opens (312.2.c + 813.1.c.1), i.e. between the opponent's decision and their
payment.

**And the trigger twin is dead letter**, which is why the passive branch is the one to walk:
727.1.c.1.a (*"If a Triggered Ability becomes active at the same time as its trigger condition would be
fulfilled, it triggers"*) has no card — the pool prints exactly one `[Level N]` **Triggered** Ability,
`UNL-040 Wuju Apprentice`'s *"[Level 6][>] When you play me, draw 1"*, and playing a card grants no XP.

### 8.5 `void-gate-ki-barrier-prevent-counts-bonus-damage` — OGN-296 + VEN-126

**715.4.a** reverses the obvious reading, and **its worked example names `OGN-296 Void Gate`**:
*"If Damage is replaced or reduced by any means, the replacing or reducing action will include the Bonus
Damage in the total damage when determining how much damage is to be dealt."* Bonus Damage is counted
**before** the Prevent eats it, so at the Gate a Prevent is worth one less **per Deal action**.

The four Prevent cards, named: `OGN-145 Unyielding Spirit` (all, this turn), `SFD-194 Counter Strike`
(the next instance), `VEN-025 Esteemed Hierophant` (all, while you control 7+ runes), `VEN-126 Ki
Barrier` (**7**, the largest bounded value). Seven covers every single-target Deal in the pool at the
Gate except `OGS-022 Final Spark`, whose 8 becomes 9 (measured: single-target Deals print 1, 2, 3, 4, 5,
6 and 8, the 8 exactly once).

**The combat half is untouched**, which is the reason to run them together: the Gate says *"Spells and
abilities"* and 417.6.c makes combat damage come from the units, so 437.5.a stands at full — a Might-3
body under Ki Barrier needs **ten** damage assigned.

## 9. Refusals from batch 3

| refused | the paragraph or sweep that refuses it | scope |
|---|---|---|
| **714.2** (negative Bonus Damage) | no card — all **seven** sources are positive: `OGN-032`, `OGN-296`, `OGS-001`, `SFD-191`, `UNL-020`, `VEN-010`, and the Gate's location-worded row that an earlier *"all six say **your** spells"* sweep could not see | want of a card |
| **727.1.c.1.a** (a trigger that becomes active as its condition is met) | no card — the pool's only `[Level N]` **triggered** ability is `UNL-040`, and playing a card grants no XP | want of a card; **727.1.c.2**, the passive branch, is entry 8.4 |
| **806.3 / 806.4 / 806.4.a / 806.4.b** ([Action] is only permission; conditionally granted Action) | no card — swept 2026-09-09: **zero units in the pool print `[Action]`**, and **zero cards grant `[Action]`** to anything | want of a card. NOTE the near miss: 813.1.b gives Reaction *"all abilities and permissions of Action"* and 822.1.b grants Reaction to an `[Ambush]` unit being played, so 806.3's worked example is reached indirectly — and 822.1.b then explicitly widens the placement 806.3 says the permission alone cannot |
| **719.2 / 719.3 / 719.3.a** (a Top-Most Card and its attachments share a location and move together) | no card — swept for an effect reading gear *"here"* or *"at a battlefield"*: **zero rows**, so nothing in the pool can tell where an attached gear is | want of a card; reopen if a set prints a location-scoped gear count |

## 10. A grep trap, measured — and it is a hand-grep trap, not a script bug

`grep -c "^487\.5\." data/Riftbound-Core-Rules-2026-07-16.txt` returns **0** for a paragraph that
exists. The rules file carries **form-feed page breaks**, and **112 rule headings sit immediately after
one** — invisible to any pattern anchored with a bare `^`. **15 are in 500–899 and 97 in 100–499**
(`rc-walk-blocks`' range), and they include `718`, a paragraph this project leans on constantly.

The committed scripts are **fine**: `probe-500-899.ts` and `audit-fc.ts` both anchor with `^\s*`, and
`\s` matches `\f`. What is not fine is a one-off `grep "^NNN\."` at the terminal, which this project
runs constantly. Use `grep -E "^[[:space:]]*NNN\."`.

This was found by an ad-hoc audit of my own that had the bare-`^` bug, and which therefore reported two
real paragraphs (`812.1.b`, `487.5`) as nonexistent. Same shape as the 766 correction the manager
handed back this morning: **an absence needs the same grep as a find.**

## 11. Batch 4 — four entries (2026-09-09, successor session, manager rc-manager5)

Staged to `/tmp/rc-walks/rc-walk-fam1.json`, which was **emptied first** (batch 3 merged and verified
present in `data/combos.json`). Checks run before reporting: `validateCombos` clean · `legendcheck-fc`
PASS over 49 legend base codes · `audit-fc` 2,513 rule references, all existing · a **new**
`quotecheck-fc2.ts`, 79 passages, all verbatim · `node .scratch/have.mjs` on all four card sets
before any of them was written, all four "no entry uses that card set or a subset of it".

### 11.0 The range is smaller than the lane's name and the example-filtered vein is spent

**The Core Rules stop at 829, not 899.** Re-running `probe-500-899.ts` against the catalogue at 715
entries: 408 sub-rule headings, **137 uncited** (down from 172, because the catalogue grew), and only
**15** carry a worked example — of which twelve were already refused with paragraphs in §4, §7 and §9.
So the *Example*-filtered probe this lane was built on is finished. The successor probe,
`.scratch/probe-fc-wide.ts`, drops the example filter and prints all 137 with their text; the rows
with real play content are the **keyword blocks 801–829**, which is where all four of this batch came
from and where the remaining material is.

### 11.1 `azir-ascendant-steraks-gage-equipped-state-survives-inactive` — SFD-050 + SFD-056

**818.5.a is load-bearing and nothing had cited it.** 818.3.c defines Equipped as *"a Top-Most card
having a card with Equip that is Attached to it"*, while 718.2 says of that attached card *"While in
this state, the card's printed Rules Text is Inactive"* and 721.2 says *"Inactive Abilities do not
trigger, do not apply, and cannot be activated."* 818.1.a puts [Equip] in exactly that printed Rules
Text. Read together those three make Equipped self-cancelling — attaching the gear destroys the
[Equip] the state is defined by — and **818.5.a is the only sentence that resolves it**: *"Whether or
not a Gear has Equip may be referenced even if the Rules Text of the Gear is Inactive."*

**The pool reads the STATE and never the EVENT.** 818.2 / 818.2.a make an Equipped *event* that
*"other Game Effects and Triggered Abilities can reference"*. Measured 2026-09-09 over
`data/corpus_flat.txt`, the word *equipped* appears on exactly four cards and all four read the state:
`SFD-050 Azir, Ascendant`, `SFD-107 Strike Down`, `SFD-183 Purifier` (reminder text) and
`VEN-137 Shady Spectacles`. No card says *"when you equip"*. So the question a [Weaponmaster] attach
would raise against 821.1.c.6 (*"The Equip ability is not activated this way"*) never has to be
answered — and because 818.3.a makes the state *"synchronous with that of the Attached state of the
Equipment"*, every attach route reaches it equally.

### 11.2 `enthusiastic-promoter-trevor-backline-single-body-cap` — UNL-043 + UNL-048

**826.4.b is the uncited mirror of 815.1.c.2 and it inverts the second sentence.** This project quotes
the Tank half constantly; the Backline half reads *"If more than one unit with Backline is present
with the same controller in Combat, damage may be assigned to any of them. Units with Backline are
invalid assignments until all units without Backline have lethal damage assigned to them."* So a
second **[Tank]** body makes the toll booth bigger for everyone else, while a second **[Backline]**
body simply hands the attacker a choice between the two: **[Tank] scales with copies, [Backline] does
not.** 826.5 closes the other door (*"Multiple Instances of Backline are redundant"*).

Limit on 826.4.b's own reach, measured: `grep -ci backline` over the corpus returns **4**
(`UNL-043`, `UNL-090`, `UNL-141`, `UNL-145`) while **six** cards carry the effect — `OGN-068 Caitlyn,
Patrolling` and `SFD-173 Soraka, Wanderer` print the sentence with no keyword, so a Caitlyn beside a
Promoter is governed by 465.2.c.6 and 465.2.c.8 instead. Different paragraph, same verdict: run one.

### 11.3 `black-flame-altar-sprite-call-temporary-shield` — UNL-208 + OGN-094

**801.3.a.3 decides how long a granted keyword lasts when the card says nothing**: *"If an effect that
grants a Keyword does not specify a duration, the duration is as long as that Game Object remains on
the Board or in its current Non-Board Zone."* Uncited before this entry, with 801.3.a.2. The Altar
(**in zero entries**) grants [Shield] to [Temporary] bodies, and the fit is exact: 814.1.c pays only
*"While I am a defender"*, and 816.1.b means a [Temporary] body's whole life is the opponent's turn.

**A counted set in `CLAUDE.md` is smaller than the pool.** The standing note names **six** battlefields
as live with no Controller because their text never says *"you"*. Measured 2026-09-09 with a
field-aware sweep of `data/corpus_flat.txt`, **26 of the 66** contain neither *you* nor *your*; four are
banned in both formats (`OGN-276`, `OGN-284`, `OGN-290`, `OGN-292`), leaving **22 playable**:
`OGN-277`, `OGN-294`, `OGN-295`, `OGN-296`, `OGN-297`, `SFD-209`, `SFD-216`, `UNL-205`, `UNL-206`,
`UNL-208`, `UNL-210`, `UNL-212`, `UNL-213`, `UNL-214`, `UNL-215`, `UNL-218`, `VEN-157`, `VEN-158`,
`VEN-159`, `VEN-160`, `VEN-164`, `VEN-166`. **That is the literal-word count and it is not by itself
the count of live battlefields**, because 190.6.d also reaches *"the implied 'you' in instructions that
don't specify a player like 'draw 1.'"* — exactly one row, `OGN-277 Back-Alley Bar` (*"When a unit
moves from here, give it +1 Might this turn"*), states an instruction with no named actor and needs
that second check before anyone leans on it. The other twenty-one either name a player or are pure
statics and prohibitions with no instruction at all.

### 11.4 `jax-unmatched-last-rites-quickdraw-deletes-nonresource-equip` — SFD-054 + SFD-150

**The two "free attach" keywords are not the same tool.** 821.1.c makes [Weaponmaster] *"Pay the cost
of its Equip ability, reduced by [A], to attach it to this unit."* — it activates the ability and
**discounts** the cost. 819.1.d makes [Quick-Draw] short for *"[Reaction]"* and *"When you play this,
attach it to a Unit you control."* — no Equip ability is activated, so **no Equip cost is ever
determined**. The difference is invisible until an Equip cost has a **non-resource half**, and exactly
one does: `SFD-150 Last Rites` (*"[Equip] — :rb_rune_chaos:, Recycle 2 cards from your trash"*), which
this project already records as un-freeable by [Weaponmaster]. A granted [Quick-Draw] frees both
halves — and the recycle is the half worth more, since paying it feeds the trash the Equipment's own
[Effect] wants to spend.

**819.2 is the printed cap**: *"Multiple instances of Quick-Draw do not trigger separately and have no
effect beyond the first."* Measured 2026-09-09: **40 Equipment printings, four print the keyword** —
`SFD-022 Long Sword`, `SFD-056 Sterak's Gage`, `SFD-064 Cloth Armor`, `SFD-186 Spinning Axe` — so
Jax's grant is worth zero on those four and the list must be built from the other thirty-six.

## 12. Refusals from batch 4, each with the sweep that refuses it

| refused | the sweep or paragraph | scope |
|---|---|---|
| **823.2** (granted [Hunt] values sum, the fourth summing keyword beside 807.2 / 809.2 / 814.2) | no card — swept `(gains?\|have\|has\|gives?\|granted?) …\[?Hunt` over `data/corpus_flat.txt`: **zero rows grant Hunt**, and no card prints two `[Hunt` instances either (13 rows carry the keyword, all one instance) | want of a card; reopen the moment a set prints a Hunt granter. The **summing family is four paragraphs and three usable keywords** — that is the correction to "809.2 completes the summing family" |
| **821.1.d** (multiple [Weaponmaster] instances choosing the same target each resolve separately) | no card — no unit prints two instances, and the pool's only text-duplicator, `SFD-059 Svellsongur`, attaches **after** the play, while 821.1.c's trigger is *"When you play me"* and **821.2** says *"Weaponmaster has no function while on the board"* | want of a card, and closed by rule rather than by census: 821.2 kills every route |
| **827.3** (multiple [Empower] instances are multiple activated abilities) | no card — swept for two `[Empower]` instances on one row: **zero** | want of a card |
| **829.1.c.3** (a spell with several [Flow] instances at different costs, controller chooses) | no card — swept for two `[Flow` instances on one row over the 17 Flow rows: **zero** | want of a card |
| **818.2 / 818.2.a** (the Equipped **event**) | no card — the four cards using the word *equipped* all read the **state** (§11.1) | want of a card; the state half is entry 11.1 |
| **725.2** (an attached card whose Passive/Replacement/Triggered text applies during **Detaching**) | no card — four cards touch detaching (`SFD-011 Angle Shot`, `SFD-107 Strike Down`, `SFD-193 Grandmaster at Arms`, `SFD-221 Veiled Temple`) and every one of them is the card **causing** the detach, not an Equipment with text that triggers off being detached | want of a card |
| **826.6 / 819.3 / 821.3 / 823.3 / 818.5 (the "referenceable characteristic" tails)** | no card reads [Backline], [Quick-Draw], [Weaponmaster], [Hunt] or [Equip] as a characteristic. The tails that DO have readers are 815.3 (`VEN-159 Kinkou Temple`, *"Units here with [Tank] have +1 Might"*), 813.5.b (`VEN-160 Mystic Vortex`), 816.3 (`UNL-076 Petal Pixie`, `UNL-208`, `UNL-165`) and 829.2 (`VEN-098 Stargazer`) | want of a card for five of the nine tails; **815.3 and 813.5.b are still uncited and both have a card** — the two best remaining rows in this range |

## 13. Handoff — what the next session in this lane should open first

1. **815.3** (*"Tank … is a characteristic of the Unit and may be checked or referenced"*) with
   `VEN-159 Kinkou Temple`, and **813.5.b** (*"Whether or not a Spell has Reaction is a characteristic
   of that Spell"*) with `VEN-160 Mystic Vortex`. Both uncited, both with a printed reader, both
   currently in one entry each — so a **new card set** is needed, not a citation upgrade.
2. **813.4 / 813.4.a / 813.4.b** — conditionally granted **Reaction**, with the undo at
   *"step 5: check legality"*. §9 refused the **Action** twin for want of a card (zero units print
   [Action], zero cards grant it); the Reaction twin **has** a user, because 822.1.b grants Reaction
   *"as long as I'm being played to a battlefield where you control Units"* — a condition true only
   while the card is being played. Before writing it, settle whether any window exists between 354 and
   358 in which the condition can fail: 354.3 and 354.4 (finish what is resolving / finish outstanding
   Tasks) are the only candidates, and no priority is granted mid-play. **Do not file a reading; find
   the ordering, per the standing rule.**
3. **740.4.a.2.a** (*"Costs within instructions that appear in any later part of the trigger effect are
   paid on resolution"*) — the constructive twin of the 383.3.b / 204.3.a trap this project cites
   everywhere. Its twin 740.4.a.2 is cited; this one is not. Candidate reader found while sweeping:
   `UNL-135 Insightful Investigator`.
4. **827.1.b.1** (*"The source game object is not a target of the Empower ability"*) — so an [Empower]
   never fires a *"when you choose me"* payoff (`SFD-195 Blade Dancer`, `SFD-142 Jae Medarda`) where a
   [Buff] does, 702.2.a being a choice. An `excludes` shape rather than an entry unless a positive line
   turns up.
5. The 650s (a player conceding / being removed) remain refused as **multiplayer-only and
   unrepresentable** — `matchDeck` reads one list, the #118 wall.

**Instrument note earned this batch.** `audit-quotes-fc.ts` only checks passages that sit inside
single quotes *within* a `quote` field, which means a source whose `quote` is the bare rules text —
the normal shape — is checked by **nothing**. `.scratch/quotecheck-fc2.ts` (new; `.scratch/` is gitignored
per `.gitignore:14`, so the script is local to the working tree and is reproduced in outline here:
normalise curly quotes and whitespace, split each `quote` on the ellipsis, and require every part to
appear in the rules file or the corpus) checks the whole field against the rules file and the corpus,
splitting on the ellipsis that joins paragraphs, and skips possessive apostrophes when scanning
notables. Its first run flagged **two real defects in this batch's own drafts**: an elision written
*inside* the quote marks, and a paraphrase (*"a Chaos rune"*) sitting inside quote marks where the card
prints `:rb_rune_chaos:`. Both were repaired before staging. It also produced 32 false positives on
its first version by treating possessive apostrophes as quote marks — **the instrument was wrong
before the entries were**, which is the standing lesson from the other direction.

**And `noclobber` bit again**, exactly as `CLAUDE.md` records: a `cat >` onto an existing
`.scratch/*.ts` failed with *"file exists"* and the **old** script ran and printed a stale result. Use
`set +o noclobber` and `rm -f` in the *same* Bash invocation — shell options do not persist between
tool calls.

## 14. Stand-down handoff, 2026-09-09 (project paused until Saturday)

**Lane:** `rc-walk-fc`, **issue #191**, uncited Core Rules sub-rules. **The range is 500–829, not
500–899** — the rules file stops at 829.

**Census, opened and closed at.** Opened the day with the predecessor's figures (172 uncited in the
range, 39 carrying a worked example, 13 walked across batches 1–3). Re-ran
`.scratch/probe-500-899.ts` against the catalogue at **715 entries**: 408 sub-rule headings,
**137 uncited**, **15** with a worked example — twelve of which were already refused with paragraphs
in §4, §7 and §9. Closed at **722 entries** after the manager merged batch 4 (four of the seven in
that merge are mine). **The Example-filtered probe is finished**; `.scratch/probe-fc-wide.ts` (new,
local — `.scratch/` is gitignored) drops the filter and prints all 137 with their text, and the
material that is left is in the **keyword blocks 801–829**.

**Staging file:** `/tmp/rc-walks/rc-walk-fam1.json`. It holds the four batch-4 entries and **all four
are already merged into `data/combos.json`** (verified by id, and verified to carry the two quote
repairs made after staging). Nothing of mine is unmerged. `/tmp/rc-walks/fc-ids.json` now lists 43
ids so `audit-fc.ts` and the quote checkers cover this lane's whole output.

**Refusals, all of them, with scope.** §4 (batch 1): 719.4/719.4.a Empowered half; 652.x; a second
Bonus Damage source as a multiplier on a Split; [Weaponmaster] onto a body other than itself. §7
(batch 2): 761.1/761.2/762/762.1; 725.4; 714.2; 719.4/719.4.a Stunned half; 822.1.d's second worked
example; 811.1.d.3 as a headline. §9 (batch 3): 714.2 again with the seventh source named;
727.1.c.1.a; 806.3/806.4/806.4.a/806.4.b; 719.2/719.3/719.3.a. §12 (batch 4): 823.2; 821.1.d; 827.3;
829.1.c.3; 818.2/818.2.a; 725.2; and five of the nine referenceable-characteristic tails. **Every one
is "want of a card" except 821.1.d, which is closed by rule (821.2).**

### 14.1 The exact next two rows, scoped but deliberately NOT written

Both were researched today and **dropped unstaged** rather than half-walked. Everything needed to
write them is here; neither has been drafted, so nothing is half-verified.

**(a) 815.3 with `VEN-159 Kinkou Temple` + `UNL-056 Yuumi, Magical Cat`.** 815.3 — *"Tank, and whether
or not a unit has Tank, is a characteristic of the Unit and may be checked or referenced by other Game
Effects."* — is uncited and the Temple (*"Units here with [Tank] have +1 Might"*) is its only reader.
`node .scratch/have.mjs VEN-159 UNL-056` returns **clean**. Yuumi is *"When I attack or defend, give
one of your other units here +3 Might and [Tank] this turn"* — a **granted** Tank, which is the point:
815.3 is what lets the Temple see a keyword that arrived by grant, and Yuumi's grant **names a
duration**, so 801.3.a.2 governs it and 317.2.c (*"Insert '3d. All "this turn" effects expire
simultaneously.'"*) ends it — the exact contrast with `black-flame-altar-sprite-call-temporary-shield`,
where the grant names none and 801.3.a.3 makes it permanent. State the pair together. 815.2
(*"Multiple instances of Tank are redundant"*) is the cap: never aim Yuumi at a printed Tank body.
Existing Temple entry to avoid duplicating: `kinkou-temple-lillia-bird-tank-wall` (VEN-159, UNL-058,
UNL-044).

**(b) 813.5.b with `VEN-160 Mystic Vortex` + an `[Action]` card.** 813.5.b — *"Whether or not a Spell
has Reaction is a characteristic of that Spell and may be checked or referenced by other Game
Effects."* — is uncited and the Vortex (*"During showdowns here, cards with [Reaction] cost rainbow
more to play"*) is its only reader. **The thesis, and it is the reason this row is worth a walk:
the Vortex taxes the ANSWER and never the opening play.** 813.1.b makes the containment one-way —
*"Reaction grants the corresponding card or effect all abilities and permissions of Action"* — so an
[Action] card does **not** have Reaction and 813.5.b reads false on it. **358.4 is the mechanism and
prints both halves as worked examples**: *"If the state is Showdown Closed and the card was the one
that Closed the state, ensure that it has [Action] or [Reaction]."* against *"If the state is Closed
and the card wasn't the one that Closed the state, ensure that it has [Reaction]."* Whoever acts first
needs only [Action]; whoever responds needs [Reaction] and pays. 345 (*"As a Showdown begins, the
player who applied Contested status to the Battlefield gains Focus"*) with 464.2.c.1 says who that is.
811.6 is the Vortex's own parenthetical and the reason a [Hidden] play IS taxed.
**Measured 2026-09-09: 77 cards print [Action] without [Hidden], and exactly ONE of them is in no
entry — `SFD-122 Called Shot`, which `data/legality.json` lists as banned in both formats.** So any
partner will already be catalogued; `have.mjs` was run on six candidates and `VEN-160` pairs cleanly
with `OGN-129`, `OGN-153`, `OGN-146`, `OGN-113`, `OGN-102` and `OGN-050`, while **`VEN-160 + OGS-012`
returns CONTAINS** against `blast-of-power-bloodless-conquer` — do not use Blast of Power. The
candidate I would have written is `OGN-153 Overt Operation` (Body, E5 P2, [Action], mass ready + mass
buff, a real combat trick since 465.2.c reads current Might). Existing Vortex entry to avoid
duplicating: `mystic-vortex-helm-suppression-tax` (VEN-160, VEN-045). One caution found and not
resolved: `OGN-113 Malzahar, Fanatic`'s [Action] sits on an **ability**, not on the card, and the
Vortex taxes *cards* — so an [Action] or [Reaction] **ability** is never taxed at all. That is a
second, separate finding and it needs its own sentence if Malzahar is used.

**(c) After those**, in order: 813.4/813.4.a/813.4.b (conditionally granted Reaction and the undo at
*"step 5: check legality"* — see §13.2 for the ordering question that must be settled first, and it is
an ordering question, not an R-number); 740.4.a.2.a; 827.1.b.1.

**Standing cautions for whoever resumes.** `grep -E "^[[:space:]]*NNN\."` on the rules file, never a
bare `^`. `set +o noclobber` and `rm -f` in the **same** Bash invocation before rewriting a
`.scratch` script. Run `node .scratch/have.mjs <bases>` the moment the card set is known, not after
the entry is written. And re-validate immediately before **reporting**, not after writing — the tree
moves under you.

---

# Batch 18 (2026-09-12) — lane inherited by `rc-walk-blocks`; the two rows §14.1 scoped, written

`rc-walk-blocks` was redirected off 100–299 onto this lane by rc-manager5 on 2026-09-12, on the grounds
that 100–299 is definition-heavy and **nobody owned 500–829**. This batch is exactly the two rows §14.1
scoped and deliberately left unwritten. Everything §14.1 established was reproduced before it was used;
nothing was taken on trust.

| id | sub-rules opened | class |
|---|---|---|
| `kinkou-temple-yuumi-granted-tank-whiteflame-wall` | **815.3**, 801.3.a.2 / 801.3.a.3, 815.1.b / 815.1.c.2, 317.2.c | ENGINE |
| `mystic-vortex-overt-operation-taxes-the-answer` | **813.5 / .5.a / .5.b / .5.c**, **358.4**, 813.1.b, 345, 811.6, 135.2.e.7.b | ENGINE |

Catalogue was at **731** on arrival. `validateCombos` over the merged set: **734 entries, 0 errors.**
Legend-line check: **0 defects.** Rule references: **107, all present** as headings. Quotes: **13, all
verbatim.** Legality for all four cards checked against `data/legality.json` on 2026-09-12 — none banned,
none restricted.

## 15. 815.3 — the Kinkou Temple reads a keyword that ARRIVED BY GRANT

§14.1(a) was right in every particular. The pairing `node .scratch/have.mjs VEN-159 UNL-056` is clean, and
the entry adds `OGN-082 Whiteflame Protector` as the third card — because **Yuumi's clause is "give one of
your OTHER units here"**, which `383.2.a.1` makes part of the Trigger Condition, so the companion is a
`uses[]` row at quantity 1 and not a sentence in a notable.

> **815.3.** Tank, and whether or not a unit has Tank, is a characteristic of the Unit and may be checked
> or referenced by other Game Effects.

**815.3 is cited by nothing in this project; its neighbour 815.2 is cited 25 times.** The catalogue has
had the Tank *cap* since the beginning and has never had the Tank *reader*.

The sum, with every number a continuous modifier or a static rather than a `702` counter, so `702.3`
never touches any of it: Whiteflame enters at **8**, its own ETB names itself for +8 → **16**, Yuumi's
attack-or-defend trigger adds +3 and `[Tank]` → **19**, and `815.3` then lets the Temple see the granted
keyword → **20**. And 20 is not a bigger body, it is a blocked combat: `815.1.b` + `815.1.c.2` make every
non-Tank body of yours an invalid assignment until it has lethal, and `465.2.c.4` forbids over-assigning
it, so **an attack summing under 20 kills nothing of yours there** — not the Tank, and not Yuumi at
Might 1 beside it.

**The duration half, which §14.1 identified and which is the reusable part.** `801.3.a.2` — *"The effect
that granted the Keyword will specify the duration for which it is granted."* — governs Yuumi, whose
grant says "this turn", so `317.2.c` (*"Insert “3d. All ‘this turn’ effects expire simultaneously.”"*)
tears the wall down every turn. `801.3.a.3` is one line below and gives the opposite answer when the grant
names no duration, which is `black-flame-altar-sprite-call-temporary-shield`. **Read the grant's own
wording before pricing any granted keyword.**

Two things the entry states that a reader would otherwise get wrong. `815.2` means Yuumi must **not** be
aimed at a printed-Tank body — `UNL-057 Alpha Wildclaw`, or the tokens under `UNL-058 Lillia` — because the
keyword half is redundant there and the marginal value drops from 4 Might to 3; that is why this is a
different board from `kinkou-temple-lillia-bird-tank-wall` rather than an upgrade to it. And the upgrade
path is a second Tank **body**, not a second source of Tank, on `815.1.c.2`'s first sentence.

## 16. 813.5.b + 358.4 — the Mystic Vortex taxes the ANSWER and never the opening play

§14.1(b)'s thesis holds and `358.4` is stronger support than expected, because it prints **both halves as
worked examples on consecutive lines**:

> **358.4.** Check that the card has the appropriate permissions to be played at this timing.
> *Example: If the state is Showdown Closed and the card was the one that Closed the state, ensure that it
> has [Action] or [Reaction].*
> *Example: If the state is Closed and the card wasn’t the one that Closed the state, ensure that it has
> [Reaction].*

So the player who acts **first** into a showdown needs only `[Action]`; the player who **responds** needs
`[Reaction]`. The Vortex taxes `[Reaction]`, therefore only the second. `813.1.b` is why an `[Action]` card
is not quietly a `[Reaction]` card — *"Reaction grants the corresponding card or effect all abilities and
permissions of Action"*, a containment that runs one way — so `813.5.b` reads **false** on `OGN-153 Overt
Operation` and there is nothing to charge. `345` with `464.2.c.1` says the first player is the Attacker.

**813.5, 813.5.a, 813.5.b, 813.5.c and 358.4 are all cited by nothing in this project** (measured
2026-09-12). `358.5` is the undo if the check fails.

**§14.1's open caution is now resolved, and by rule rather than by reading.** It asked for "its own
sentence" on `OGN-113 Malzahar, Fanatic`, whose `[Action]` sits on an ability rather than on the card.
The answer is that the rules keep the three cases apart **on purpose**: `813.5.a` for a Game Object,
`813.5.b` for a Spell, `813.5.c` for an Ability. The Vortex says *"cards with [Reaction]"*, so an
`[Action]` or `[Reaction]` **ability** is never taxed — not Malzahar, and not any of the eleven
`[Reaction][>]` mana abilities in the pool. The notation rule underneath it is **135.2.e.7.b** (*"Whatever
instruction or ability comes after the [>] is modified by the keyword that comes before the [>]"*), which
is in the 100–299 lane, is also uncited, and is carried here because this is where it is load-bearing.

Honest accounting of what Overt Operation buys inside the showdown: the ready half is nearly worthless
(`144.1.b` forbids the Standard Move outside your Main Phase, and combat does not read exhaustion), so the
5 Energy and 2 Power buy the second sentence — a board-wide buff, `703` fixing it at +1 Might each, landing
after the attackers are declared, with `465.2.c` reading current Might at assignment. The spend-then-rebuff
wording is what makes it work on an already-buffed board: `702.2.b` removes the counter to pay for the
ready and `702.3.a` then allows a fresh one.

The cost of running the Vortex is printed on it: it names no player, so it charges **you** whenever you
are the one answering, and its parenthetical *"(Hidden cards have [Reaction].)"* is `811.6` made explicit —
making it the one card in the pool that makes a `[Hidden]` play cost anything against `811.1.b`'s
*"ignoring its base cost"*. **A list running the Vortex and a Hidden package is taxing itself.**

## 17. An instrument artifact that will bite any rule-reference audit in this fleet

A rule-reference probe over `data/combos.json` that uses the natural pattern
`/\b(\d{3}(?:\.[0-9a-z]+)+)\b/` matches **`899.md` and `499.md`** out of `sources[].title` — the filenames
of this walk document and of `2026-09-09-uncited-rules-300-499.md`. Measured over the whole catalogue on
2026-09-12, those two are the **only** filename-shaped false matches, and they are reported as *missing
rule headings*, which reads exactly like a citation defect. `.scratch/audit-fc.ts`'s `REF` has the same
shape and the same exposure. The fix is one `.replace(/[0-9]{4}-[0-9]{2}-[0-9]{2}[^ ",]*/g, " ")` before
the match. Recorded because two lanes now cite walk documents whose names end in a three-digit number, and
because this is the fourth entry in this project's ledger of *an instrument failure that looks like a
finding* — the others being the form-feed `grep` anchor, rule 766's second worked example, and
`Card.type` being an array.

## 18. Handoff — state of this lane after batch 18

- §14.1(a) and §14.1(b) are **done**. §14.1(c)'s order stands and is untouched: **813.4 / 813.4.a /
  813.4.b** (conditionally granted Reaction and the undo at *"step 5: check legality"* — and §13.2's
  ordering question must be settled from 354.3 / 354.4 **before** anything is written; it is an ordering
  question, not an R-number), then **740.4.a.2.a**, then **827.1.b.1**.
- **740.4.a.2.a's candidate reader has been spent in another lane.** §13.3 named `UNL-135 Insightful
  Investigator` for it; batch 17 of the 100–299 lane walked that card on **204.3.b**, whose *"later parts
  of triggered abilities"* clause is the same mechanic stated in the 200s, and Riot's worked example for
  `204.3.b` names the card. The entry is `blood-rose-insightful-investigator-cost-at-resolution`. So
  `740.4.a.2.a` is now a **citation upgrade to that entry**, not a new row — and whoever writes it should
  say which of the two paragraphs is the primary source rather than citing both flatly.
- The Example-filtered probe for this range remains **spent** (§14). `.scratch/probe-fc-wide.ts` is still
  on disk on this machine and prints all 137 uncited rows with their text; the keyword blocks **801–829**
  are where this batch's material came from and are not exhausted.

---

# Batch 19 (2026-09-12) — §14.1(c)'s first row, and a probe for the 815.3 SHAPE

One entry, plus the sweep rc-manager5 asked for after batch 18: **paragraphs cited zero times whose
NEIGHBOURS are heavily cited.** Catalogue was at **735** on arrival.

| id | sub-rules opened | class |
|---|---|---|
| `vilemaw-counter-strike-ambush-undo-is-free` | **813.4 / .4.a / .4.b**, **354.1 / .3 / .4**, **333.1**, 319.1, 320, 417.1.a | ENGINE |

`validateCombos`: **736 entries, 0 errors.** Legend-line check: **0 defects.** Rule references: **62, all
present.** Quotes: **7, all verbatim** — after a repair, §21. Legality for both cards checked against
`data/legality.json` on 2026-09-12.

## 19. 813.4 — the ORDERING QUESTION, settled from the text

§13.2 required this be settled before anything was written, and it is an ordering question, not an
R-number. **The answer is yes, a window exists, and there are exactly two of them.**

Between step 1 (`354`, move the card to the Chain) and step 5 (`358`, check legality) the only two places
anything else happens are:

> **354.3.** If another Card Effect or ability is currently resolving, continue resolving it before
> proceeding with any further steps of this process.
> **354.4.** If there are Tasks outstanding or currently being handled, finish those Tasks before
> continuing this process.

**Neither is a priority window** — nobody receives priority in either — which is exactly why it is easy to
conclude none exists. What makes `354.4` bite is **333.1**, which is uncited and says outright:

> Tasks include, but are not limited to: Cleanups, the actions performed during the Start of Turn Process,
> **throughout Combat in its various steps**, and the actions performed during the End of Turn Process.

**A Combat is a Task.** And `354.1` ("This Closes the State") with `319.1` (a Cleanup becomes an
Outstanding Task "After the game transitions to or from an Open or Closed state") means your own play can
put a Cleanup in front of itself, while `320` keeps the Pending card from resolving through it: *"While a
Cleanup is occurring, Chain Items cannot be Finalized or Resolved."*

So an `[Ambush]` played as a Reaction into a live combat genuinely can find, at step 5, that your garrison
at that battlefield died in the interposed Task — and `822.1.b`'s conditional Reaction grant is therefore
false. `813.4`, `813.4.a` and `813.4.b` are cited **zero** times; `822.1.b` is cited **61** times.

**And the consequence is favourable, which is the entry.** `813.4.b`: *"If the chain item does not fulfill
the conditions by the time step 5: check legality has been reached, the actions taken while playing it are
undone and it is returned to the zone it was played from if it is a card."* The actions taken while playing
it include the **costs**. So an Ambush combat trick is **free to attempt**: the downside of a failed
gamble is an undo, not a dead card. Every other Reaction play in the pool is spent whether or not it lands.

The partner is forced by a second uncited pairing of paragraphs. The obvious way to keep your garrison
alive through that Task is a would-die save — and every heal-exhaust-recall save is `455`, *"relocated
from anywhere to its Base"*, which **takes your last body off the battlefield and breaks the Ambush
condition**. `OGN-077 Zhonya's Hourglass` defeats this line by rescuing you. `SFD-194 Counter Strike`'s
Prevent does not (`437.4`, no relocation and no kill event), which is why it is a `uses[]` row and not a
notable. It is a Signature card tagged Jax, so `103.2.d.2` forces **Grandmaster at Arms** — the only legend
NAME carrying that tag, measured over `cards.json`, and Calm/Body, which covers Vilemaw's mono-Calm.

## 20. The "cited-zero, heavily-cited neighbour" probe — 43 rows in 500–829

`.scratch-rules/orphan.mjs <lo> <hi>` (untracked; ~25 lines). For every heading in range that the
catalogue cites **zero** times, it takes the citation count of its parent and of every sibling and keeps
the row when the best of those is ≥ 15. The tokenizer is lifted from `test/rule-refs.test.ts` (§21).

**43 rows in 500–829.** Most of the top of the list is keyword boilerplate — *"It is present on Units"*,
*"X is formatted as …"* — which is why a raw count is not the answer. The rows with real content, read:

| row | neighbour-max | what it is, and the disposition |
|---|---|---|
| **810.3** | 23 | *"Ganking, and whether or not a unit has Ganking, is a characteristic of the Unit and may be checked or referenced by other Game Effects."* — the exact `815.3` shape. **REFUSED, scoped to the pool:** swept `with/has/have [Ganking]` over the corpus and all three hits (`OGN-125 Bilgewater Bully`, `OGN-297 Windswept Hillock`, `SFD-192 Shurelya's Requiem`) **GRANT** the keyword; none reads it. Live the moment a card prints "units here with [Ganking]" |
| **718.5.e / .f / .g** | 32 | *"Attached cards may have different Controllers from their Top-Most card."* · *"Changes in Control of the Top-Most card do not impact Control of Attached cards and vice versa."* · *"An Attached card still appends the abilities in its Effect Text to the Rules Text of the Top-Most card and modulates the Top-Most Card's Might by its Might Bonus."* **A real, uncited mechanic — see §22 for the lead, deliberately not written** |
| **813.1.d** | 55 | *"Reaction is formatted as “[Reaction]” on cards, or “[Reaction][>]” on abilities."* — the keyword-level corroboration of the `135.2.e.7.b` notation finding carried in batch 18. Uncited. A citation upgrade to `mystic-vortex-overt-operation-taxes-the-answer` |
| **719.3 / 719.3.a** | 37 | *"A Top-Most Card and all cards Attached to it are at the same location."* — this is the paragraph behind the third route in `152.2`'s worked example (a gear reaching a battlefield on a carrier), which batch 17 measured empty from the card side |
| **818.5** | 129 | the `815.3` shape for **Equip**. `818.5.a` was walked by this lane in an earlier batch; `818.5` itself is uncited |
| **827.1.c.4 / 818.1.c.5** | 27 / 24 | *"[Empower / Equip] abilities may include text that alters the **timing**"* — the timing twins of the cost-altering clauses this project cites constantly (`827.1.c.3`, `818.1.c.4`). Not yet swept for a reader |
| **721.1** | 47 | *"Text marked this way is not applied at all while in this state."* — the general half of `721.2`, which this catalogue leans on for every attachment argument |

**The shape is worth keeping as a standing probe.** It is cheap, it is mechanical, and it found `810.3`
(empty, with its scope) and `718.5.e/f` (real) in one pass. Run it per range before hunting.

## 21. Instrument note — I rediscovered a solved problem, and that is the finding

My batch-18 rule-reference audit reported `899.md` and `499.md` as missing rule headings; I diagnosed it
as a novel artifact and patched it with a date-prefix strip. **It is already solved in
`test/rule-refs.test.ts`**, whose header comment records it, and whose fix is better: a sub-part of a real
paragraph number is a run of digits with an optional single trailing letter, or a single letter — verified
there against all 2,381 distinct headings, none of which has a multi-letter sub-part, so `.md` cannot
tokenize. That comment also records that an **exclusion list was rejected on purpose**, because it hides
the whole class while the tokenizer drops exactly the artifact; my patch was the rejected design.
`.scratch-rules/audit17.mjs` now carries the committed tokenizer verbatim with a pointer.

The lesson is not the regex. **The fix lived in a test nobody reads while writing a probe**, so the fleet
rediscovered it. Before writing an ad-hoc probe over `combos.json`, grep `test/` for one that already does
the job. This is the fourth entry in the project's ledger of *an instrument failure that looks like a
finding*, and the first that was a rediscovery rather than a new one.

Second, smaller: the quote checker caught a **real defect in this batch's own draft**. `437.4` reads
*"Damage dealt to a Unit that has **that all of that** damage Prevented…"* — Riot's own doubled wording —
and I had typed the grammatical version from memory. Pasted and repaired before staging. A `quote` field
is pasted or it is wrong; this is the second time on this lane that the checker has caught the walker
rather than the catalogue.

## 22. Lead found and deliberately NOT written — 718.5.e / 718.5.f, theft and Equipment

Researched to the point where it could be written, and dropped unstaged rather than half-walked, because
the interaction is keyed on the **opponent's** board and an entry's `uses[]` is your own deck. Everything
needed is here.

- **718.5.e**: *"Attached cards may have different Controllers from their Top-Most card."*
- **718.5.f**: *"Changes in Control of the Top-Most card do not impact Control of Attached cards and vice
  versa."*
- **718.5.g**: the Effect Text is still appended and the Might Bonus still modulates, regardless.

So **stealing an equipped body gives you the Effect Text and the Might Bonus while the opponent keeps the
card**, and — the sharper half — **your own Equipment survives the theft of its carrier**: you still
control the gear, on a body you no longer control. The unit-theft cards, swept over the corpus
2026-09-12: `OGN-203 Possession` (Chaos, E8 P3, [Action]), `SFD-202 Hostile Takeover` (Mind/Order,
[Hidden]), `UNL-140 Conscription` (Chaos, E5 P2). `OGN-080 Mystic Reversal` and `VEN-152 Rebuttal` steal
**spells**, not units, and `VEN-133 Glowstone` is a gear.

The constructive line to check first: `718.2` makes an attached Equipment's own `[Equip]` Inactive, so you
cannot Equip it away from a stolen carrier — but **`SFD-208 Forge of the Fluft`** gives legends
*"exhaust: Attach an Equipment you control to a unit you control"*, and `718.5.f` says you still control
it. With `434.1.f` and `434.4` that is a free relocation off the thief's new body onto one of yours,
recovering the Might Bonus and stripping them, for one legend exhaust. Settle whether the Forge's "an
Equipment you control" is satisfied while the gear is attached to a unit you do not control — `718.5.e`
and `718.5.f` say yes in terms, and `718.5.b` should be read before it is relied on.

## 23. Handoff — state of this lane after batch 19

- §14.1(a), §14.1(b) and the first row of §14.1(c) are **done**. Remaining in §14.1(c): **740.4.a.2.a**,
  now demoted to a citation upgrade on `blood-rose-insightful-investigator-cost-at-resolution` (204.3.b is
  **primary** — it states the mechanic in the 200s and its worked example names the card; 740.4.a.2.a is
  the glossary restatement, per rc-manager5), then **827.1.b.1**.
- **New material is §20's table and §22's lead**, in that order. `.scratch-rules/orphan.mjs` is on disk on
  this machine and is twenty-five lines; §20 gives the recipe.
- The Example-filtered probe for this range remains spent (§14); the keyword blocks **801–829** are where
  batches 18 and 19 both found their material and are still not exhausted.

---

# Batch 20 (2026-09-12) — the keyword blocks read with the boilerplate filtered out; no entry, four real results

`.scratch-rules/kw.mjs <lo> <hi>` is `orphan.mjs`'s sibling: every uncited heading in range with the
keyword-block boilerplate dropped (*"It is present on Units"*, *"X is formatted as …"*, *"X is a Passive
Ability keyword"*, *"The X is referenced in …"*). **97 rows in 801–829.** Read down; four carry real
content and none of the four yields a card set this pool can fill, so **this batch stages nothing** and
records them instead. `vilemaw-counter-strike-ambush-undo-is-free` from batch 19 is still the only entry
in `/tmp/rc-walks/rc-walk-rules.json`.

## 24. 805.6 and 805.6.a — the RULE behind a claim this project derived

> **805.6.** Accelerate generates a delayed replacement effect that replaces a unit entering the board
> exhausted with it entering ready. **It does not enter exhausted and then become ready.**
> **805.6.a.** Accelerate will not interact with, or trigger, abilities that are affected by units becoming
> ready.

`CLAUDE.md` carries this conclusion and derives it from `143.4` plus `415.1`: *"'enters ready' is not a
ready … the 48 'enters ready' cards can never give an exhaust back."* **805.6 says it outright, names the
mechanism (a delayed replacement effect), and 805.6.a states the consequence by itself** — and both are
cited zero times. It is also the general form of the mechanism `R25` was ruled on in 2026-09-04
(`SFD-171 Renata Glasc, Industrialist`'s *"Your tokens enter ready"* beating a token printed exhausted),
which was decided through `369.3` / `370.1.c`; `805.6` is the same replacement, printed as a keyword rule.

**The two `excludes` it names, both measured over `data/corpus_flat.txt` on 2026-09-12:**

- The pool has exactly **three** "become ready / when you ready" payoffs, all mono-Body, and all three sit
  in one entry: `OGN-143 Pirate's Haven`, `VEN-071 Fretful Feline`, `VEN-088 Jayce, Hammer in Hand`
  (`awaken-ready-body-triple-trigger`). **`[Accelerate]` feeds none of them**, by `805.6.a` in terms. That
  entry is safe because `315.1.b`'s Awaken is a real ready — but any future line that reaches for
  Accelerate to fire one of the three is refuted on its face.
- The pool has exactly **two** cards whose target clause names an **exhausted** friendly unit —
  `OGN-124 Arena Bar` (*"Buff an exhausted friendly unit"*) and `UNL-201 Voidreaver` (*"Spend 2 XP,
  exhaust: Move an exhausted friendly unit from a battlefield to its base"*). An Accelerated body **is
  never exhausted at any point on the turn it arrives** (`805.6`: not exhausted-then-ready), so neither can
  choose it until it has spent its own Standard Move exhaust under `144.2`.

Checked and refused as a line: Voidreaver's move is *"from a battlefield to its **base**"*, so it is a
retreat and not the battlefield-to-battlefield second hop the `#58` movement finding would want, and
`UNL-127 Mister Root` (`[Accelerate]`, *"When I move to a battlefield, gain 2 XP"*) plus Voidreaver is
XP-neutral per turn — 2 gained, 2 spent — with the body sent home. Refused on arithmetic.

## 25. 813.2 and 813.3 / 813.3.a — better citations for two claims this catalogue already makes

- **813.2** (uncited): *"The corresponding card or effect with this keyword is not restricted to Closed
  States or Showdowns. This permission is inclusive of all other timings and options available to the
  ability as written, Action's permissions, or by default."* This project's standing sentence — *"813.1.b
  gives Reaction every permission of Action, so a Reaction spell never has to be a response"* — is derived
  from `813.1.b`. `813.2` says it directly and is the better citation; `813.1.b` is about what Reaction
  *grants*, `813.2` is about what it does not *restrict*.
- **813.3 / 813.3.a** (uncited) and their `[Action]` twin **806.3** (uncited, and it carries the worked
  example): *"Reaction does not alter the function of any instruction of the Card, Rune, or Effect it is
  on. It is only Permission."* … *"Playing Units with Reaction still has the inherent restrictions of
  playing Units without Reaction. It can only be played to the controlling player's base or a battlefield
  they control."* That is `355.2.a`'s confinement restated from the keyword side, and it is the paragraph
  that makes `822.1.b`'s **first** half do real work: `[Ambush]` has to grant the location permission
  separately, because the `[Reaction]` half grants none.

## 26. 806.4 / 806.4.a / 806.4.b and 806.5.a–c — the [Action] twins, refused with their scope

`813.4.x` became batch 19's entry; its `[Action]` twin `806.4.x` (word-for-word the same three paragraphs
with "Action" substituted) stays refused, and §9 of this document already gave the reason — **zero units
print `[Action]` and zero cards grant it conditionally**. Likewise `806.5.a`, `806.5.b` and `806.5.c` are
the `[Action]` twins of the `813.5` trio that batch 18 used: they are uncited and have **no reader**,
because `VEN-160 Mystic Vortex` reads `[Reaction]` and nothing in the pool reads `[Action]`. Both refusals
are scoped to **the current pool** and both become live the moment a card prints a conditional `[Action]`
grant or a card that reads the keyword.

## 27. A note on the two probes, for whoever inherits them

`orphan.mjs` (cited-zero with a heavily-cited neighbour) and `kw.mjs` (uncited minus boilerplate) answer
different questions and disagree usefully. `805.6` does **not** appear in `orphan.mjs`'s output, because
its siblings are boilerplate and none of them clears the 15-citation bar; it appears in `kw.mjs`'s because
it is not boilerplate. `718.5.e/f` is the reverse case. **Run both.** Neither is a substitute for reading
the block, which is how `805.6.a` — a one-line sub-rule with no Example and no card name — was found.

---

# Batch 21 (2026-09-12) — §14.1(c)'s last row, and it was not an `excludes` after all

| id | sub-rules opened | class |
|---|---|---|
| `sanction-spirit-wheel-blade-dancer-empower-is-a-choice` | **827.1.b / 827.1.b.1**, **813.2**, 441.1.b, 441.2, 809.1.c | ENGINE |

`validateCombos`: **737 entries, 0 errors.** Legend-line: **0 defects.** References: **32, all present.**
Quotes: **6, all verbatim** — after a repair (§29). Legality checked 2026-09-12; none of the three cards
appears in `data/legality.json`.

## 28. 827.1.b.1 divides the Empower family in two, and the positive line does exist

§13.4 filed this as *"an `excludes` shape rather than an entry unless a positive line turns up."* One did.

> **827.1.b.1.** The source game object is not a target of the Empower ability.

So a card paying its **own** printed `[Empower]` cost chooses nothing and targets nothing: it fires no
*"when you choose"* payoff, and it pays no `[Deflect]` (`809.1.c` prices that *"for each time they choose
[me/this]"*). `827.1.b` and `827.1.b.1` are cited **zero** times, while `441.1.b` is cited **109** times and
`441.2` **154** — the third instance this lane has met of the `815.2/815.3` shape, and the most lopsided.

**The census, measured over `data/cards.json` on 2026-09-12 and named.** **45** base codes carry their own
`[Empower]` keyword and **not one** can fire a choose-payoff by empowering itself. **8** rows empower
something else — `VEN-035 Sanction`, `VEN-062 Hextech Formula`, `VEN-082 Profiteer`, `VEN-099 Tornado
Warrior`, and the two legends `VEN-151 Soul's Reflection` and `VEN-153 Matriarch of War` with their
reprints — and **two of those eight are not empowerers on inspection**: both legends read *"When you
empower something else, empower me"*, so they watch the event and then empower themselves, which chooses
nothing by the same rule. Hextech Formula empowers *"another gear"*, which no *"friendly unit"* clause can
see. **Exactly three cards in the pool make an Empower a choice on a unit: Sanction, Profiteer and Tornado
Warrior** — and Sanction alone is a spell, alone is `[Reaction]`, and alone is repeatable three times.

The payoffs are the two cards whose trigger reads **any** choose: `SFD-144 Spirit Wheel` and
`SFD-195 Blade Dancer`. `SFD-142 Jae Medarda` says *"when you choose me **with a spell**"*, so he is a
narrower third and not a fourth copy. Blade Dancer is in `uses[]` as a **payoff that happens to be the
legend**, and — measured — the only Calm/Chaos legend name in the pool, so the identity and the second
payoff are the same card and the line has no legend choice at all.

Two things worth carrying beyond this entry. **813.2** (found in batch 20, used here) is why the spell is
played in your own Main Phase: a `[Reaction]` card is *"not restricted to Closed States or Showdowns"*, and
Blade Dancer's ready is only worth a second Standard Move there (`144.1.b`). And **Sanction's "disempower
at end of turn" is the point, not a drawback**: `441.2` makes Empowered permanent and `441.1.b` forbids a
second Empower, so an ordinary Empower fires a choose-payoff **once per body ever**, while Sanction gives
the state back and can choose the same body again next turn, forever.

## 29. The quote checker caught the walker for the third time on this lane

`809.1.c` reads *"It is functionally short for “Spells and abilities an opponent controls that target
[me/this] cost an amount of Power equal to [Deflect Value] more to play as an additional cost for each time
they choose [me/this].”"* — I had written the smoothed version starting *"Opponents must pay…"*, which is
the **reminder text printed on the cards**, not the rule. That is a new failure mode worth naming beside
the `437.4` one: **the corpus's reminder text and the Core Rules' wording of the same keyword are
different strings**, and a `quote` attributed to the rules file must come from the rules file.

## 30. HANDOFF — state of this lane, 2026-09-12, batches 18–21

- **Done:** §14.1(a) `815.3` · §14.1(b) `813.5.b`/`358.4` · §14.1(c) `813.4.x` (batch 19) and
  `827.1.b.1` (this batch). **All of §14 and §14.1 is now closed.**
- **`740.4.a.2.a` is a citation upgrade, not a row** — `204.3.b` is primary (it states the mechanic in the
  200s and its worked example names the card), `740.4.a.2.a` is the glossary restatement. It belongs on
  `blood-rose-insightful-investigator-cost-at-resolution`.
- **Open, in the order I would take them:**
  1. **§22's `718.5.e` / `718.5.f` lead** — theft and Equipment, researched and deliberately unstaged.
     Read `718.5.b` before relying on the Forge of the Fluft recovery.
  2. The rest of `kw.mjs`'s 97 non-boilerplate rows in 801–829 that §24–§26 did not reach.
  3. `.scratch-rules/survey.mjs` — the two probes merged, `lo hi [n]`. **Echo the parsed range**: a first
     run passed `"100 299"` as one shell word, `Number()` gave `NaN`, every comparison went false, and both
     ranges printed the same rows. It looked like a finding.
- **Three scripts on this machine, all untracked:** `.scratch-rules/orphan.mjs` (cited-zero with a
  heavily-cited neighbour), `.scratch-rules/kw.mjs` (uncited minus keyword boilerplate),
  `.scratch-rules/survey.mjs` (both, ranked). `audit17.mjs` carries the tokenizer from
  `test/rule-refs.test.ts` — **do not re-patch it**, §21.
- **A correction owed to a shipped entry of mine, reported to the manager and not applied here:**
  `mystic-vortex-overt-operation-taxes-the-answer` cites `464.2.c.1` for the Focus claim. The precise
  paragraph is `464.2.c.1.a`, and `464.2.c.1.b` is the caveat — *"If a showdown was already ongoing when
  the combat opens, the player who has Focus maintains their Focus"* — which with `323.14` (a Non-Combat
  Showdown escalating into a Combat Showdown) means the Vortex's tax **inverts** when the opponent opened
  that earlier Showdown. Narrow, but the entry currently reads as if attacking always buys the asymmetry.

---

# Batch 22 (2026-09-12) — §22's lead, written: an Equipment's Controller does not follow its carrier

| id | sub-rules opened | class |
|---|---|---|
| `conscription-forge-of-the-fluft-equipment-outlives-the-theft` | **718.5.b / .5.e / .5.f / .5.g**, **719.3 / 719.5**, **457.1**, 718.2, 434.1.f | ENGINE |

`validateCombos`: **738 entries, 0 errors.** Legend-line: **0 defects.** References: **93, all present.**
Quotes: **11, all verbatim.**

## 31. 718.5.e and 718.5.f, and the sentence the catalogue could not state

> **718.5.e.** Attached cards may have different Controllers from their Top-Most card.
> **718.5.f.** Changes in Control of the Top-Most card do not impact Control of Attached cards and vice
> versa.
> **718.5.g.** An Attached card still appends the abilities in its Effect Text to the Rules Text of the
> Top-Most card and modulates the Top-Most Card's Might by its Might Bonus.

All three cited **zero** times, while `718.2` is cited across the catalogue: **this project has had the
Inactive half of attachment everywhere and has never had the Control half.**

`718.5.b` — *"Attached cards still can be chosen or targeted by game effects while Attached"* — was read
first, as §22 required, and it is what makes the recovery legal.

**The offensive half.** Steal an equipped body and you get the body; `718.5.f` leaves the Equipment's
Control with the opponent; `718.5.g` still appends its Effect Text and modulates its Might on the unit you
now control. You receive the whole benefit of a card you do not own, and they retain a card they cannot
use — `718.2` makes its printed `[Equip]` Inactive while attached, so only an ATTACH effect can move it.
`718.5.c` and `719.3.a` carry it along, so after Conscription's recall **their card is at your base, on
your unit, controlled by them.** The loan ends where `457.1` says, and Riot's worked example is this exact
case: the gear is recalled *"to **its controller's** base"* — theirs, not yours — once `719.5` detaches it.

**The defensive half is the same rule backwards**, and is why `SFD-208 Forge of the Fluft` is a `uses[]`
row rather than a notable. If they steal *your* equipped body, `718.5.f` leaves the Equipment under your
Control, `718.5.b` lets the Forge choose it, and `434.1.f` detaches it from their new body as it attaches
to yours. One legend exhaust, no Energy, no Power. The Forge and not the `[Equip]` cost, because `718.2`
and `721.2` make that cost Inactive — the one-way door recorded on 2026-09-07.

**`have.mjs` decided the theft card.** `OGN-203 Possession` is the obvious pick and
`node .scratch/have.mjs OGN-203 SFD-208` returns **CONTAINS `possession-action-defender-flip`**, a
single-card entry — so that set would be a strict superset needing a declaration. `UNL-140 Conscription`
is clean, is the same domain, and carries its own honest price: `824.1.d` with `730.2` means the 5 XP that
lifts its Might restriction switches off every `[Level N]` rung, so it is a **sink** line.

## 32. HANDOFF — rc-walk-blocks, 500–829, after batches 18–22

**Staged and unmerged in `/tmp/rc-walks/rc-walk-rules.json`:** `sanction-spirit-wheel-blade-dancer-empower-is-a-choice`
(batch 21) and `conscription-forge-of-the-fluft-equipment-outlives-the-theft` (batch 22). Both validated.

**Everything §14 and §14.1 scoped is closed.** §22's lead is now this entry. What is left in this range:

1. The remainder of `kw.mjs`'s **97 non-boilerplate rows in 801–829** that §24–§26 did not reach.
2. `719.4` (*"The Exhausted and Ready state of the Top-Most card does not affect nor change the status of
   the Attached cards and vice versa"*) and `719.5.a` (the controller of a departing Top-Most Card chooses
   the **detach order**) — both surfaced by `orphan.mjs` at neighbour-count 37, both uncited, neither read.
3. `818.5` — the `815.3` shape for **Equip**, uncited (`818.5.a` was walked by this lane earlier).
4. `827.1.c.4` and `818.1.c.5` — *"…may include text that alters the **timing**"* — the timing twins of
   the cost-altering clauses this project cites constantly. Not yet swept for a reader.

**Scripts, all untracked, all on this machine:** `.scratch-rules/orphan.mjs`, `.scratch-rules/kw.mjs`,
`.scratch-rules/survey.mjs` (both filters, ranked, `lo hi [n]` — **echo the parsed range**, §30),
`.scratch-rules/audit17.mjs` (references + quotes; carries the tokenizer from `test/rule-refs.test.ts` —
do not re-patch, §21), `.scratch-rules/val16.ts`, `.scratch-rules/legend16.ts`.

**The three standing traps this lane has paid for, in the order they bit:** write the legality sentence
**without** `OGS-019`'s base code (§67 of the other document); paste every `quote` from the **rules file**,
not from memory and not from the card's reminder text (§29 — `809.1.c`'s rules wording and its printed
reminder are different strings, and `437.4` is ungrammatical on purpose); and run `have.mjs` the moment
the card set is known, because it is what caught the Possession superset above.

## 33. Read after batch 22, not walked — three leads and one empty, all with their measurements

**EMPTY, with the measurement: `827.1.c.4` and `818.1.c.5` have no reader.** Both say a `[Empower]` /
`[Equip]` ability *"may include text that alters the timing"*. Measured over `data/cards.json` on
2026-09-12 by isolating each keyword clause up to the close of its own reminder parenthesis: **39
`[Empower]` clauses and 39 `[Equip]` clauses, and ZERO of either alters timing.** Scoped to the current
pool.

A first pass reported two hits — `VEN-075 Platewyrm Egg` and `VEN-139 Rogue Assassin` — and both were
false positives of exactly the kind batch 18 found the rule for: their `[Reaction][>]` and `[Action][>]`
belong to a **different ability on the same card**, because `135.2.e.7.b` scopes a permissive keyword to
whatever follows the arrow. **Grep the CLAUSE, not the card**, on any future keyword sweep. The same sweep
produced the one reminder-text outlier now registered in `docs/data-anomalies.md` (`VEN-134` / `VEN-185`
Kayle, Justified), settled by `135.2.d.3`.

**Lead 1 — `719.4` / `719.4.a` with `SFD-221 Veiled Temple`.** *"The Exhausted and Ready state of the
Top-Most card does not affect nor change the status of the Attached cards and vice versa"*, and `719.4.a`
gives the exception list — *"all statuses aside from location, Attached, and Top-Most"* — with a stunned
carrier as its worked example. Both uncited. The reading to check: the Temple's *"you may ready a friendly
gear. If it's an Equipment, you may detach it"* has its two clauses **in that order for a reason** —
readying an *attached* Equipment is worth nothing while `718.2` and `721.2` keep its printed text Inactive,
and `719.4` is what lets the ready **survive** the detach that the same sentence offers. Existing entry to
avoid duplicating: the Veiled Temple is already catalogued, and `CLAUDE.md` records that it pays per
change of hands rather than per turn.

**Lead 2 — `SFD-193 Grandmaster at Arms` is the paid twin of `SFD-208 Forge of the Fluft`**, and batch 22
should be read beside it: *"1 Energy, exhaust: Attach a **detached** Equipment you control to a unit you
control. exhaust: Attach an **attached** Equipment…"* — two separate abilities split on exactly the state
`718.1` defines. It is a Calm/Body legend, so it cannot appear in batch 22's mono-Chaos shell, but it is
the card to build the same 718.5.f recovery around in Calm/Body.

**Lead 3 — `719.5.a`, uncited:** *"The player that controls the Top-Most Card that changed zones decides
the order these cards Detach in, and thus the order of any relevant effects that occur due to the Detach
occurring."* It has teeth only where a detach generates ordered effects, and the pool's whole population
for that is **three** Equipment whose Effect Text mentions a death (`SFD-051 Guardian Angel`,
`SFD-090 The Zero Drive`, `SFD-172 Sacred Shears`, measured 2026-09-12). Note the composition with batch
22: if you steal an equipped body and it later dies, **you** control the departing Top-Most Card, so the
detach order is yours even though the Equipment is not.

## 34. Batch 23 — 829.1.c.3 and 711, two blocks refused with their measurements, and a correction to a shipped entry

Lane: rc-walk-blocks, range 500–829, issue #191. Opened at catalogue 743 (the two entries §32 left
staged had been merged at `6b1a300`); another lane merged one while this batch was being written, so
the merge base was 744 and `val16` reads 746 with these two.

### 34.1 `829.1.c.3` — a granted Flow does not overwrite a printed one

> **829.1.c.3.** If a spell has multiple instances of the Flow keyword with different costs, its
> controller may choose which cost to apply as they play it.

> **829.1.c.1.** The cost is an alternate cost that replaces the base cost of the spell to be paid
> during finalization.

Both read in full from the rules file. `829.1.c.1` had three citations and none of them for what it
decides here; `829.1.c.3` had none.

The natural reading of `VEN-113 Kennen, Storm of Shuriken` (*"When I conquer, give a spell in your trash
[Flow] equal to its cost this turn"*) is that his grant REPLACES whatever Flow the spell prints.
`829.1.c.3` says the instances coexist and the controller chooses, which makes Kennen the pool's only
way to put a second price tag on a card already in the trash.

**Measured over `data/corpus_flat.txt` on 2026-09-12 — fifteen spells print `[Flow]`, named:** `VEN-003`
Brittle Steel, `VEN-012` Perfect Execution, `VEN-031` Twilight Shroud, `VEN-049` Dredge Up, `VEN-051`
Iterative Design, `VEN-081` Onslaught, `VEN-100` Up from the Deep, `VEN-105` Twilight Step, `VEN-116`
Dragon Form, `VEN-127` Lacerate, `VEN-140` Shuriken Flip, `VEN-144` Death Mark, `VEN-148` Shadow Dash,
`VEN-154` Public Execution, `VEN-156` Lightning Rush. **Nine are strictly dearer than the spell's own
base cost** (VEN-003, VEN-031, VEN-105, VEN-127, VEN-140, VEN-148, VEN-154, VEN-156, and VEN-144 in
Power), five are equal (VEN-012, VEN-049, VEN-081, VEN-100, VEN-116) and one is cheaper in Energy while
adding a rune (VEN-051). So for nine of fifteen, Kennen's instance is the CHEAP one — the printed Flow
cost in this pool is a tax, not a discount.

`VEN-113` is the pool's only Flow GRANTER and `VEN-098 Stargazer` its only Flow READER (`829.2`), both
swept the same day; both are mono-Chaos.

**Entry: `kennen-twilight-step-forgotten-library-flow-choice`** (ENGINE, mono-Chaos + a colorless
battlefield). `UNL-211 Forgotten Library` reads what you SPENT, and `829.1.c.1` makes the chosen Flow
cost the amount that leaves the Rune Pool — so the printed 4 Energy fires its `[Predict]` and Kennen's
granted 2 does not. **`VEN-098 Stargazer` is anti-synergic with that half**, which
`kennen-stargazer-arena-flow` does not say: its discount is not optional, it applies to whichever
instance you chose, and it takes the printed 4 to 2 and the granted 2 to the printed floor of 1 — both
under the Library's threshold. The two Kennen entries in this catalogue want opposite second cards.

### 34.2 `711` — the non-board half of a split whose board half the catalogue already owned

> **710.** Units on the board are evaluated according to their current Might.

> **711.** Units in Non-Board Zones are evaluated according to their printed Might.
> *Example: A unit in the trash is Mighty if its printed Might is 5 or greater. It doesn't matter if
> there were effects raising or lowering its might while it was on the board.*

> **705.** If a Unit leaves play, remove all Buffs from it.

`OGN-242 Baited Hook` kills a friendly unit and *only then* executes *"a unit … that has Might up to 1
more than the killed unit"*. By the time that comparison runs the corpse is in the trash, so **the
ceiling is PRINTED Might + 1, always**, and `705` says the same thing a second time from the buff side
with no scope argument needed about the `706 Mighty` heading the two paragraphs sit under.

**Entry: `baited-hook-galio-printed-might-fetch`** (ENGINE, mono-Order). The constructive half is the
inversion: because the number is printed, **shrinking the victim is worth zero too**, so a Galio the
opponent has spent a card dropping to 1 Might still cashes at 6 and still fetches a Might 7 body.
Measured over `data/cards.json` on 2026-09-12: the pool prints exactly **four units of Might ≥ 6 at
Energy ≤ 4 and all four are mono-Order** — `OGN-208` Cruel Patron, `UNL-166` Stalking Wolf, `UNL-171`
Galio Indefatigable, `VEN-129` Sacred Protector — and Galio is both the cheapest and the only one whose
combat value is purely defensive (*"I don't deal combat damage"*), so he is the body that costs least to
spend. A ceiling of 7 reaches `UNL-170` Atakhan (E10 + 3 Power), `UNL-179` Rift Herald (E8 + 1 Power) and
`VEN-138` Shen, Leader of the Kinkou Order (E6 + 2 Power), and **not** `OGN-231` Commander Ledros (M8) or
`SFD-174` Trove Golem (M9), so the ladder does not run away.

### 34.3 CORRECTION to a shipped entry, and to CLAUDE.md

**`vanguard-helm-baited-hook-buff-ladder` is wrong in its headline.** Its name and its first notable say
the Hook's ceiling climbs by TWO a turn because *"a body of printed Might X carrying a buff dies at X+1
and the ceiling is X+2"*. That is false on `705` (the buff is removed the moment the unit leaves play)
and false again on `711` (the corpse is read at printed Might). **The ladder climbs by exactly one, and
`OGN-228 Vanguard Helm` contributes nothing to it** — its remaining value in that pairing is the +1 Might
on the living body, which is real and much smaller. The entry needs its name, two steps and three
notables rewritten; `data/combos.json` is the manager's, so this is reported rather than applied.

**The same sentence is in `CLAUDE.md`**, in the `#159`/Vanguard Helm bullet: *"a buffed corpse raises the
ceiling by TWO and the Helm re-buffs the fetched body"*. Same two rules refute it.

Blast radius checked and it is narrow: `baited-hook-sprite-queen-free-unit` reads a 3-Might Sprite token's
printed Might and is correct either way, and the other three Vanguard Helm entries
(`navori-fighting-pit-vanguard-helm-free-buffed-corpse`, `vanguard-helm-kinkou-monk-buff-conservation`,
`trifarian-gloryseeker-vanguard-helm-legion-buff`) turn on feeding the Helm's *trigger*, which `808.1.d.3`
supports, not on a Might ceiling.

**Two citation upgrades, not defects.** `unsung-hero-sacrifice-double-draw` stands entirely on *"If I
**was** [Mighty]"* being read off the board state of a unit that is now in the trash, and it cites
`808.1.d` but never **`808.1.d.3`** — *"Before the card is moved to the Trash, note its location, its
attributes, and any other details related to the effect of its triggered ability to process the trigger
after it has been Finalized."* Without that paragraph `711` answers the other way and the Deathknell
draws nothing; `SFD-167 Unsung Hero` is the only card in the pool that reads `[Mighty]` on a body that
has left the board (swept: ten `Mighty` cards, the other nine all read the board). And
`rumble-forerunner-mech-recursion` / `rumble-scrapper-hotheaded-mech-stack` both price *"Reduce its
Energy cost by the Might of the unit you recycled"*, where the recycled unit is in the Main Deck when
that instruction executes — `711`, and neither entry cites it.

### 34.4 REFUSED — `719.4` and `719.4.a`, empty in the current pool

> **719.4.** The Exhausted and Ready state of the Top-Most card does not affect nor change the status of
> the Attached cards and vice versa.
>
> **719.4.a.** This is true of all statuses aside from location, Attached, and Top-Most.
> *Example: If the top-most card becomes stunned, it does not affect the state of any attached cards.*
> *Example: If an attached card becomes empowered, it does not affect the state of its top-most card.*

§33's lead 1 was that `SFD-221 Veiled Temple` (*"When you conquer here, you may ready a friendly gear. If
it's an Equipment, you may detach it"*) has its two clauses in that order because `719.4` lets the ready
survive the detach. **The reading is written out plausibly and it is worth nothing, on a one-line sweep:**
of the 40 Equipment names in the pool, **ZERO have an ability in their printed Rules Text whose cost is
their own exhaust** (measured over `data/cards.json` on 2026-09-12 by splitting each card's text at its
`[Effect]` marker and grepping the Rules-Text half for `rb_exhaust`). Every Equipment's Rules Text is its
`[Equip]` clause and nothing else, so readying one can never buy an activation — the Temple's ready is
for NON-Equipment gear, and its detach clause is a separate mode.

The `719.4.a` Empower example is empty the same way: **zero Equipment mention Empower or Empowered** in
text or effect. The stun example has no reader either, since a gear cannot be stunned.

**Scope: the current pool.** `719.4` goes live the moment a set prints an Equipment carrying a
self-exhaust ability, and that is the single condition to re-check.

### 34.5 REFUSED — `821.1.d`, with `821.1.c.1` and `821.1.c.4`, empty in the current pool

> **821.1.d.** If you choose the same target with multiple instances of Weaponmaster, each will resolve
> separately.

**No unit in this pool can carry two instances of `[Weaponmaster]`.** Swept over `data/corpus_flat.txt`
on 2026-09-12: twelve printings carry the keyword — `SFD-002` Armed Assailant, `SFD-008` Sentinel Adept,
`SFD-085` Ornn Forge God, `SFD-092` Combat Chef, `SFD-099` Veteran Poro, `SFD-109` Akshan Mischievous,
`SFD-113` Lucian Merciless, `SFD-116` Yone Blademaster, `SFD-119` Jax Unrelenting, `SFD-127` Master
Bingwen, `VEN-041` Riven Shattered, and `SFD-247` Emperor of the Sands — **each with exactly one
instance**, and the last is a legend that GRANTS it rather than carrying it (*"Sand Soldiers you play
have [Weaponmaster]"*) to a token that prints none. It is the only grant in the pool.

**`821.2` closes every board-side route to a second instance:** *"Weaponmaster has no function while on
the board."* `[Weaponmaster]` is a Play Effect (`821.1.c`, *"When you play me…"*), so a `SFD-059
Svellsongur` copy of a Weaponmaster body's text, or a `VEN-137 Shady Spectacles` copy, arrives after the
play and does nothing. `821.1.c.7` (different targets) and `821.1.d` (the same target) are therefore both
dead letter here.

`821.1.c.1` (*"Weaponmaster can choose an Equipment whether it has an Equip ability or not"*) and
`821.1.c.4` (*"If the chosen card doesn't have an Equip cost, it can't be paid"*) are dead letter for a
second, independent reason: **all 40 Equipment names in the pool have an Equip cost.** The one apparent
exception is an instrument artifact already registered — `VEN-073 Jagged Cutlass` prints `Equip` with no
brackets (`docs/data-anomalies.md` line 22), so a `\[Equip\]` sweep loses it.

**Scope: the current pool**, and the trigger to re-check is a set printing either a second Weaponmaster
grant or an Equipment with no Equip cost.

### 34.6 Instrument note — `.scratch-rules/kw.mjs` reports a BARE top-level rule as uncited

`kw.mjs` listed `703`, `705`, `707`, `708` and `710` among its uncited rows for 500–829. **Three of those
are cited**: a bare-three-digit probe over `data/combos.json` (regex `(?<![\d.])(\d{3})(?![\d.])`) returns
**113 hits for 703, 25 for 705 and 32 for 710**, against **0 for 704, 707 and 711**. `lee-sin-buff-bank`
quotes `705` verbatim; `renekton-dominus-double-conquer` and `convergent-mutation-might-transfer` use
`710` for current Might. The probe evidently indexes sub-rule references (`NNN.x`) only, so a top-level
rule cited bare reads as uncited.

**This bit inside this batch, not after it.** A first draft of `baited-hook-galio-printed-might-fetch`
claimed all three of 705/710/711 were uncited, on `kw.mjs`'s word; the claim was typed rather than
measured, and it was corrected before the batch was reported. The corrected sentence is the better one
anyway — the catalogue owned the board half of the split and never the trash half, which is the `815.2`
against `815.3` shape this lane hunts. **One of the 32 `710` hits is itself a false positive**, a YouTube
`&t=710` timestamp in a source url, which is why the probe prints context rather than a count.

Standing form, now paid for twice on this lane: **do not inherit a probe's citation index — re-derive a
"this is uncited" claim against `data/combos.json` with a second regex before it reaches an entry.**

### 34.7 Leads read and left, with their state

- **§32 next step 3 (`719.5.a`) and step 4 (`818.5`) are already done** and the handoff is stale on both:
  `719.5.a` is cited by five entries (`zero-drive-riptide-rex-banish-recursion`,
  `blade-ruined-king-detach-recovery`, `turn-to-dust-attached-gear`,
  `pickpocket-seal-of-focus-cheap-gear-kill`, `disarming-rake-unconditional-gear-answer`), and `818.5` / `818.5.a` by
  `azir-ascendant-steraks-gage-equipped-state-survives-inactive`. Both were merged after §32 was written.
- **§33 lead 2 (`SFD-193 Grandmaster at Arms` as the Calm/Body twin of batch 22) is untouched** and still
  looks right.
- **The detach population of the whole pool is FOUR cards**, measured 2026-09-12: `SFD-011` Angle Shot
  (the only one at `[Reaction]` speed, and it cantrips), `SFD-107` Strike Down, `SFD-193` Grandmaster at
  Arms, `SFD-221` Veiled Temple. **`SFD-011` is in no entry and is worth one**: this project's
  gear-removal inventory was built from a `kill … gear` predicate and found 16 printings of which ZERO
  carry `[Reaction]`, concluding that no answer reaches the Hold window — but Angle Shot ANSWERS an
  equipped body without killing anything, at Reaction speed, for 2 Energy, and a kill-predicate could
  never see it. Twelve BURST and CHAIN entries stand on attached Equipment.
- **`725.1`, `725.2` and `725.4` are uncited and were not read.** `725.2` is the exception that makes an
  attached card's detach-triggered text Active while the rest of its Rules Text is Inactive — the
  complement to the `718.2` / `721.2` pair this catalogue leans on constantly.
- **`811.6.a`, `721.1`, `704`, `704.1`, `707` and `719.2` are uncited and were read and set aside** as
  having no reader worth an entry on their own; `707` and `719.2` are definitional, `704.1` (buffs are
  counters and are not targeted) has nothing in the pool aiming at a buff.

## 35. Batch 24 — the 725 / 727.1.c exception blocks, four citation upgrades, and a correction to §34.7

No new entries. The block was read end to end and the material in it is citation upgrades and
measured empties, which is the honest result and is recorded here rather than forced into a line.

### 35.0 CORRECTION TO §34.7, WRITTEN BY ME IN THE PREVIOUS BATCH

§34.7 says *"`SFD-011` is in no entry and is worth one"*. **That is false. `SFD-011 Angle Shot` is in
`jax-angle-shot-attach-draw`** (with `SFD-119 Jax, Unrelenting` and `SFD-009 Serrated Dirk`), and it was
false when I wrote it: I never ran `have.mjs` on the card, and the sentence went into batch 23's report
to the manager before it was measured. **It is the same defect this lane's own §34.6 was written about,
committed in the same batch that diagnosed it** — a probe-shaped claim that read as a finding.

**What survives the correction is narrower and still real.** `jax-angle-shot-attach-draw` uses Angle
Shot on YOUR OWN gear, cycling one Equipment off and back onto Jax for card draw. The enemy-facing use
is untouched by any entry: the spell reads *"Choose a unit and an Equipment with the same controller.
Attach that Equipment to that unit or detach that Equipment from that unit. Draw 1"* — **the shared
controller need not be you**, so at `[Reaction]` speed it detaches an OPPONENT's Equipment, which stops
the Might Bonus (`137.3.a`) and takes the appended Effect Text off the carrier (`718.3`, `719.1`) inside
an already-opened combat, before `465.2.c` reads Might.

That matters because this project's gear-removal inventory was built from a `kill … gear` predicate,
found 16 printings of which **zero** carry `[Reaction]`, and concluded that no answer reaches the Hold
window or a combat. Angle Shot answers an equipped body **without killing anything**, and a
kill-predicate can never see it. Twelve BURST and CHAIN entries stand on attached Equipment. Stated
correctly, the lead is *"the pool's Reaction answer to an equipped body is already in the catalogue, used
for something else"*, which is a weaker claim than the one I shipped and is the true one.

### 35.1 `725.1` — the paragraph that makes an "As this is attached" Equipment work at all

> **725.1.** If an Attached card has a Passive or Replacement ability that applies during the process of
> Attaching or a Triggered ability that triggers off of Attaching, that text exists and can be processed
> as it Attaches.

`718.2` makes an attached card's printed Rules Text Inactive and `721.2` stops an Inactive ability
applying — so an Equipment whose copy text sits in its RULES text would simply never fire. `725.1` is the
carve-out.

**The population is exactly TWO cards**, measured over `data/cards.json` on 2026-09-12 by splitting each
Equipment's text at its `[Effect]` marker and reading the Rules-Text half: `SFD-059 Svellsongur` (*"As
this is attached to a unit, copy that unit's text to this Equipment's effect text for as long as this is
attached to it"*) and `VEN-137 Shady Spectacles` (*"As this is attached to a unit, choose another friendly
unit. The equipped unit becomes a copy of that unit for as long as this is attached to it"*).

**CITATION UPGRADE.** `725.1` is cited by five entries and all five are Svellsongur ones
(`svellsongur-copy-hold`, `svellsongur-ornn-hold`, `guardian-passage-svellsongur` and two more).
**`shady-spectacles-baron-copy` does not cite it**, and it is the paragraph its whole line stands on —
the entry is careful and correct about which traits are copied (`477.1.b.1.a`) and silent about why the
copy instruction is Active at all.

### 35.2 `725.4` and `727.1.c.1.a` — why a `[Legion]` play trigger fires

> **725.4.** If a Dependent Ability is a Triggered Ability whose condition occurs at the same time as the
> Dependent Keyword's condition being fulfilled, that text exists and can be processed as it is fulfilled.

> **727.1.c.1.a.** If a Triggered Ability becomes active at the same time as its trigger condition would
> be fulfilled, it triggers.

`812.1.b.1` makes `[Legion]` short for *"If you have played another card this turn, this card gains
[Text]"* — so a card printed `[Legion] — When you play me, X` GAINS that trigger at the very instant the
trigger's own condition (being played) occurs. Without these two paragraphs, `721.2` (*"Inactive
Abilities do not trigger"*) says it missed. They are the reason the whole family works.

**Five cards in the pool are `[Legion]` play triggers**, measured 2026-09-12: `OGN-016` Dangerous Duo,
`OGN-020` Scrapyard Champion, `OGN-217` Trifarian Gloryseeker, `OGN-218` Vanguard Captain, `OGN-243`
Darius Executioner. `UNL-040 Wuju Apprentice` is a sixth of the same SHAPE under a different keyword —
`[Level 6][>] When you play me, draw 1` — where the XP threshold is likewise read at the instant of the
play.

**CITATION UPGRADE, and `725.4` is uncited anywhere.** `727.1.c.1.a` is cited by exactly one entry,
`mosstomper-gustwalker-level-passive-lands-on-the-hold`, which is about a Level PASSIVE. The two entries
that actually stand on the mechanism —
`darius-executioner-vanguard-captain-legion-clause-boundary` (which cites `812.1.b`, `812.1.b.1`,
`812.1.c`, `812.2` and `727.1`) and `mosstomper-wuju-apprentice-xp-calm-ladder` — cite neither.

### 35.3 `727.1.c.3.a` — a REFINEMENT to a standing rule in CLAUDE.md, and its population is one card

> **727.1.c.3.a.** If the condition for the Dependent Keyword causes the Activated Ability to become
> Inactive after it has been added to the chain as a Pending Item, that chain item will not be affected
> and will proceed with being played as normal.

`CLAUDE.md` records, correctly and in several places, that *"paying XP switches your Level abilities
off"* (`824.1.d` with `730.2`), and treats that as why a `[Level]` deck wants a faucet and no sink.
**`727.1.c.3.a` scopes it: the rule is true of passives and of abilities not yet activated, and FALSE of
an activated ability already on the chain.** Once a Level-gated activated ability is a Pending Item,
dropping below the threshold does not touch it.

**The population is exactly ONE card and the fact is still dead letter here.** Swept over
`data/corpus_flat.txt` on 2026-09-12, the only Level-gated ACTIVATED ability in the pool is `UNL-049
Honeyfruit` (*"[Level 6][>] [>>][Reaction][>] exhaust: [Add] 1 Energy + 1 rainbow"*); every other `[Level
N][>]` clause is a passive, a cost reduction or a trigger. And `444.2.c` closes even that one — an
`[Add]` ability with Reaction *"finalize and resolve immediately, ignoring normal restrictions"*, so it
never sits on the chain long enough for an XP spend to be made in response.

**Scope: the current pool.** The refinement to the CLAUDE.md sentence is worth carrying anyway, because
it is the rule and not the count, and the next set that prints a second Level-gated activated ability
makes it live.

### 35.4 REFUSED — `725.2`, empty for triggered abilities, confirmed with two instruments

> **725.2.** If an Attached card has a Passive or Replacement ability that applies during the process of
> Detaching or a Triggered ability that triggers off of Detaching, that text exists and can be processed
> as it Detaches.

**Zero cards in the pool trigger on detaching.** Confirmed two ways on 2026-09-12: `grep -icE "when[^|]
{0,40}detach"` over `data/corpus_flat.txt` returns **0**, and a sweep of `text` + `effect` over
`data/cards.json` folded by name returns **four** cards that mention detaching at all, none of them a
trigger — `SFD-011` Angle Shot, `SFD-107` Strike Down, `SFD-193` Grandmaster at Arms, `SFD-221` Veiled
Temple, which is the same four the §34.7 detach census names.

The Passive half is not a live case either: the two `725.1` cards say *"for as long as this is attached
to it"*, so their own printed duration ends the effect and nothing needs to be processed *during* the
detach. **Scope: the current pool**, and the trigger to re-check is a set printing a "when this detaches"
Equipment.

### 35.5 State of the 500–829 range after this batch

The `716`–`727` attachment-and-Inactive neighbourhood is now read end to end. What remains uncited in it
is definitional (`717`, `719.2`, `720`, `721.1`, `722`, `723`, `724`, `726`, `727`) or measured empty
above. `704`, `704.1` and `707` are uncited and were read and set aside — nothing in the pool aims a
spell at a buff, and `707` is the one-line definition `708` and `709` do the work for.

**Still unread in range and carrying material:** `.scratch-rules/kw.mjs`'s remaining non-boilerplate rows
in `801`–`829` that §24–§26 and §34 did not reach — but **read §34.6 first**: that probe reports a bare
top-level rule as uncited, so treat its `NNN`-only rows as unverified and re-derive each with a
bare-three-digit regex over `data/combos.json` before spending a walk on it.

## 36. Batch 25 — the `801` keyword framework read whole, the last granted-keyword READ in the pool, and the "is a referenceable characteristic" family swept in one pass

Lane: rc-walk-blocks, range 500–829, issue #191, session respawned 2026-09-12. Opened at catalogue
**749**; another lane merged two entries (`8b3ec16`) while this batch was being written, so `val16`
reads **752** with mine. 468 tests green, typecheck clean.

| id | sub-rules opened | class |
|---|---|---|
| `marai-spire-syndra-granted-repeat-discount` | **820.4**, 820.2, 820.3, 820.3.a, 801.3.a | ENGINE |

`val16`: **752 entries, 0 errors.** `audit17`: **73 rule references, 0 not found as a heading.**
Legend-line: **0 defects.** Quotes: **29 passages checked against an EXPLICIT list, 0 misses** (§36.7).

### 36.1 `820.4` — the Spire reads a `[Repeat]` that Syndra GRANTED, and it was the last such cell

> **820.4.** Repeat, and whether or not a spell or ability has Repeat, is a characteristic of the spell
> or ability and may be checked or referenced by other Game Effects.

Cited **zero** times, against 75 for `820.1.b`, 62 for `820.1.c.3` and 61 for `820.2.a` — the Repeat
block is one of the most heavily worked in this catalogue and nobody had touched the paragraph that
makes the keyword *readable*.

`SFD-211 Marai Spire` (*"While you control this battlefield, friendly [Repeat] costs cost 1 Energy
less"*) is such a reference, and `UNL-146 Syndra, Transcendent` (*"While I'm in a showdown, your spells
have [Repeat] 2 Energy + Chaos rune"*) is the pool's only card that GRANTS one. **Nothing in `820` or in
`801.3.a` distinguishes a granted instance from a printed one** — `801.3.a` is the bare permission
(*"Other effects may grant Keywords"*) and `801.3.a.2` / `801.3.a.3` govern only the grant's DURATION —
so the Spire discounts Syndra's instance, and `820.3` (each instance paid separately) makes each one
separately a friendly Repeat cost.

This is the **same shape as `815.3`** (the Kinkou Temple paying for a `[Tank]` that arrived by grant,
§15) and **`813.5.b`** (the Mystic Vortex taxing a `[Reaction]`, §16), both walked on this lane. §36.4
shows it is the **third and last** member of that family in the current pool.

The demonstration spell is `OGN-172 Rebuke` (Chaos, E2 P2, `[Action]`, *"Return a unit at a battlefield
to its owner's hand"*), which prints **no** `[Repeat]` of its own — so every instance it executes came
from Syndra and was priced by the Spire. Two bounces empty a garrison of two, `465.1` never makes the
damage tasks Outstanding, `466.3.a` gives the combat and `466.5.d` the Conquer. The delta over
`draven-rebuke-bloodless-combat` (same spell, garrison of one) is exact and the entry says so.

**The honest limit is `820.2`**, which the entry states as its own headline constraint: *"choices must be
made at the usual time during the Make Relevant Choices step of Playing a Card"* — both victims are named
as you play the spell, so you cannot bounce one, watch the board and aim the second, and a defender that
arrives afterwards (`464.2.c.3.a`) can never be a target. A garrison of three beats the line outright.

`UNL-134 Existential Dread` was deliberately **not** added: with its printed `[Repeat]` the Spire
discounts both instances for three executions, but that card set is a strict superset of
`syndra-transcendent-existential-dread-three-executions`, so it is a cross-reference in a notable.

### 36.2 REFUSED — `801.3.b`, `801.3.b.1`, `801.3.b.2`: **no card in this pool removes a keyword**

> **801.3.b.** Other effects may remove Keywords.
> **801.3.b.1.** The effect that removed the Keyword will specify the duration it is removed.
> **801.3.b.2.** If an effect that removes a Keyword does not specify a duration, the duration is as long
> as that Game Object remains on the Board or in its current Non-Board Zone.

All three uncited. **Measured two ways on 2026-09-12 and both return zero.** (a) A sweep of `text` +
`effect` over `data/cards.json`, folded by name, for `lose|lost|remove|without` within 60 characters of
`keyword|ability|abilities|[`, and separately for those verbs within 40 characters of any of the 21
keyword names: **0 rows**. (b) `grep -icE "\blose" data/corpus_flat.txt` returns **1**, and it is
`SFD-202 Hostile Takeover`'s *"Lose control of that unit"* — control, not a keyword; `grep -inE
"\bremove" data/corpus_flat.txt` returns **0 rows of any kind**.

What the pool has instead is the **`764`–`767` IGNORE** family, which is a different mechanism and
already catalogued: `VEN-004 Dune Surfer`, `VEN-061 Decree of Insight`, `VEN-158 Heisho, Shell of the
World`. `766` makes an ignored ability *"treated as INACTIVE for the purposes of the game action or
procedure"* and `767` scopes it to that procedure and to the instructed players only — so an ignore is a
**key**, one-way and scoped, where `801.3.b` would be a **dispel**, symmetric and durational. The two
must not be conflated; this project has the first and has never had the second.

**Scope: the current pool.** The condition to re-check is a set printing a card that removes a keyword.

### 36.3 REFUSED — `818.1.c.5`, completing §33's measurement on the half it did not take

§33 measured the **timing** half (*"39 `[Equip]` clauses and ZERO alters timing"*). The paragraph says
*"timing **or targeting**"*, and the targeting half was never measured. Measured 2026-09-12 by printing
every Equipment's `[Equip]` clause up to the close of its own reminder parenthesis (**40 Equipment
names**, listed in full by `.scratch-rules/kwread.mjs`'s sibling one-liner): **36 are the bare
`[Equip] <one rune>` or `[Equip] <1 Energy + one rune>` form with no extra text at all**, and four carry
anything at all — one of them is `UNL-188 Hextech Gauntlets` (§36.4, cost-altering), and the other three
are `SFD-150 Last Rites` (*"— Chaos rune, Recycle 2 cards from your trash"*), `SFD-178
Blade of the Ruined King` (*"— Order rune, Kill a friendly unit"*) and `UNL-158 Shepherd's Heirloom`
(*"— Spend 1 XP"*), and **all three are non-resource COSTS (`818.1.c.3`), not timing and not targeting.**
So `818.1.c.5` is dead letter on **both** halves.

### 36.4 `818.1.c.4` has **exactly one** reader, and two entries stand on it without citing it

> **818.1.c.4.** Equip abilities may also include text that alters the Equip cost. Such text is taken
> into account when determining a card's Equip cost when paying for the ability.

Uncited. The one reader in the pool is `UNL-188 Hextech Gauntlets` — *"[Equip] 3 Energy + rainbow. This
ability's Energy cost is reduced by the Might of the unit you choose."* — the single Equipment out of 40
whose clause carries cost-altering text.

**CITATION UPGRADE.** `CLAUDE.md` records the Gauntlets fact (`356.6` floors the Energy at 0 on any body
of 3+ Might, so it attaches for one rainbow) and so do both entries that use the card,
`gauntlets-enforcer-conquer` and `tryndamere-hextech-gauntlets-enforcer` — but `356.6` is only the
**floor**. `818.1.c.4` is the paragraph that makes the reduction apply to the Equip cost **at all**;
without it the sentence is prose on a card and `818.1.c.2`'s *"[Cost]: Attach this gear to a unit you
control"* is the whole ability. It is the `[Equip]` twin of `827.1.c.3`, which this project cites
constantly for Empower.

### 36.5 The **"is a referenceable characteristic"** family, swept whole — 25 paragraphs, **8 with a reader, 17 dead letter**

Every keyword in the glossary closes with a paragraph saying the keyword *"is a characteristic … and may
be checked or referenced by other Game Effects"*. This lane has been finding them **one at a time** with
`orphan.mjs` (`815.3` in §15, `813.5.b` in §16, `818.5` earlier). Swept as a family on 2026-09-12 —
26 keywords against `data/cards.json` folded by name+type, every mention printed and classified by hand
as the card's **own printed keyword**, a **grant**, or a **read** — the whole table is:

**WITH A READER (8), members named:**

| ¶ | keyword | reader(s) in the pool | catalogued? |
|---|---|---|---|
| `808.3` | Deathknell | `OGN-236 Karthus, Eternal` (*"Your [Deathknell] effects trigger an additional time"*) | yes |
| `809.3` | Deflect | `VEN-061 Decree of Insight`, `VEN-158 Heisho, Shell of the World` (both *"ignore [Deflect]"*) | yes |
| `811.5`/`811.6` | Hidden | `OGN-107 Ava Achiever`, `OGN-263 Swift Scout`, `OGN-264 Guerilla Warfare` | yes |
| `813.5.b` | Reaction | `VEN-160 Mystic Vortex` | yes (§16) |
| `815.3` | Tank | `VEN-159 Kinkou Temple`, `VEN-004 Dune Surfer` | yes (§15) |
| `816.3` | Temporary | `UNL-076 Petal Pixie`, `UNL-083 Smoke and Mirrors`, `UNL-165 Shadow's Call`, `UNL-208 Black Flame Altar`, `UNL-090 LeBlanc, Everywhere at Once` | yes, all five |
| `820.4` | Repeat | `SFD-211 Marai Spire` | **§36.1, this batch** |
| `829.2` | Flow | `VEN-098 Stargazer` | yes |

**DEAD LETTER IN THIS POOL (17), with what the pool has instead:**
`805.5` Accelerate (26 printings, one granter `SFD-029 Rek'Sai, Breacher`, **zero readers**) ·
`806.5`/`.a`/`.b`/`.c` Action (**91 printings, zero readers**) · `807.3` Assault (grants only:
`OGN-015`, `SFD-026`, `SFD-131`, `VEN-076`, `VEN-014`, `VEN-136`, `OGN-019`) · `810.3` Ganking (already
refused with this scope in §34) · `812.3` Legion (10 printings, zero readers) · `814.3` Shield (grants
only: `OGN-074`, `SFD-181`, `UNL-208`, `VEN-117`) · `817.3` Vision (grants only: `OGN-100`, `SFD-065`) ·
`818.5` Equip (has a citation but no card reads it; `SFD-054 Jax, Unmatched`'s *"your Equipment"* reads
the **tag**, not the ability) · `819.3` Quick-Draw (`SFD-054` grants it; zero readers) · `821.3`
Weaponmaster (`SFD-197 Emperor of the Sands` grants it; zero readers — consistent with §34.5) · `822.4`
Ambush (14 printings, zero readers) · `823.3` Hunt (zero **readers**; on granters see §36.10, which
**corrects** the count `CLAUDE.md` carries) · `824.2` Level · `825.5` Unique (3 printings) · `826.6`
Backline (4 printings + 2 prose) · `827.4` Empower · `828.2` Empowered — and the last is the one worth a
sentence, because `VEN-130 Aurok General` (*"Your units that are [Empowered] have +2 Might"*) **looks**
like its reader and is not: it reads the Empowered **status** (`441.2`), not the presence of an
`[Empowered]` **Ability**, which is what `828.2` is about.

**The use of the table is that it closes the search.** `815.3` and `813.5.b` were each worth a walk;
`820.4` was the third and last cell, and there is now no more of that shape to find in 500–829 without a
new set.

### 36.6 `801.3.a.1` is the head of the second-instance family, and 19 paragraphs instantiate it

> **801.3.a.1.** The definition and rules of the specific Keyword will determine the behavior if a
> Keyword is granted while it is already present.

Uncited. Every keyword in the glossary answers it, and the answers fall in three classes — swept over
`801`–`829` on 2026-09-12:

- **REDUNDANT (8):** `805.4` Accelerate · `810.2` Ganking · `811.4` Hidden · `815.2` Tank · `816.2`
  Temporary · `819.2` Quick-Draw · `822.2` Ambush · `826.5` Backline.
- **SUMMED (4):** `807.2` Assault · `809.2` Deflect · `814.2` Shield · `823.2` Hunt.
- **SEPARATE (7):** `817.2` Vision · `818.4` Equip · `820.3` Repeat · `821.1.c.7` / `821.1.d`
  Weaponmaster · `827.3` Empower · `829.1.c.3` Flow (choose which cost).

All nineteen are cited in this catalogue — several heavily (`807.2` 68, `814.2` 42, `815.2` 29) — and the
**head is cited by nothing**. **CITATION UPGRADE**, and it is the paragraph to reach for the moment a
line grants a keyword to a body that already has it: the class decides the answer, and `801.3.a.1` is
what sends you to the class. It is also the rule under the `SFD-059 Svellsongur` family's arithmetic —
36 entries use that card, and the class of the keyword it copies (redundant / summed / separate) is what
decides whether the 2^v composition is worth anything on that keyword.

### 36.7 `822.3` is explained by a carve-out printed on a card, and the instrument note for the quote checker

> **822.3.** If there are no units at the location chosen before Finalization completes for any reason,
> then it is no longer a valid location by Ambush's reasoning and cannot be played there
>
> **822.3.a.** Other effects and permissions may still enable this Unit to be able to be played to the
> selected location, but Ambush's permission will not be valid

`822.3` has two citations and `822.3.a` none. **The evidence that `822.3` bites is printed on a card.**
`UNL-166 Stalking Wolf` reads *"As an additional cost to play me, kill a Bird, Cat, Dog, or Poro you
control. You may [Ambush] me to its battlefield, **even if you don't have other units there**"* — and
that last clause exists **because** paying the cost can empty the very battlefield the Ambush chose,
which `822.3` would then invalidate. Nobody else can respond inside the window (`354`–`359` are the
steps of playing and no priority is handed out between them), so *"for any reason"* means **your own
cost or your own choice**, and Stalking Wolf is the only card in the pool that can trip it.

`822.3.a` is not the escape it looks like. `822.1.b` is two clauses — *"I may be played to a battlefield
where you control Units"* **and** *"I have [Reaction] as long as I'm being played to a battlefield where
you control Units"* — conditioned on the **same** state, so a permission from elsewhere (`355.2.b`,
controlling the battlefield) rescues only a play you could have made in your **Main Phase** anyway;
`343.1.a` bars an ordinary card from a Showdown State. The two halves are welded and they fail together.
This generalises the reading `rengar-trophy-hunter-poppy-ambush-verb-attack` already carries for the verb
use, to the cost case.

**Instrument note, for whoever runs `audit17.mjs` next.** It splits a `quote` field on `" … "` and this
catalogue's convention is a **compound** quote joined by `' NNN.x: '`, so audit17 reports *every*
compound quote as one unfound fragment — it did so for this batch's single source and it is a false
positive, not a defect. Do **not** re-patch audit17 (§21). The instrument that satisfies the standing
rule is an **explicit list** of the passages claimed (trap 6 of this lane's own handoff): 29 passages,
written out one per line, normalised for curly quotes and whitespace, checked against the Core Rules,
the Tournament Rules and `corpus_flat.txt` — **0 misses**. Keep that list beside the entry.

### 36.8 CORRECTION owed to `CLAUDE.md` — "exactly one card's own text lifts `355.2.a`" is a **predicate**, not a count

`CLAUDE.md`'s #173 bullet reads: *"355.2.a is the general form of why nothing can reinforce the
battlefield you are ATTACKING … and **exactly one card's OWN TEXT lifts it (swept, one row)**:
`SFD-025 Rengar, Pouncing`."*

Swept 2026-09-12 over `data/corpus_flat.txt` for every card whose own text grants itself a play location
(`I can be played` / `You may play me` / `I can [Ambush]` / `may be played to`), the cards whose own text
reaches a battlefield holding **enemy** units are **FIVE**: `OGN-161 Deadbloom Predator` and `SFD-093
Dauntless Vanguard` (*"You may play me to an occupied enemy battlefield"*), `SFD-025 Rengar, Pouncing`
(*"I can be played to a battlefield you're attacking"*), `UNL-117 Arachnoid Horror` (*"I can be played to
an occupied battlefield if an enemy unit is alone there"*) and `UNL-120 Rengar, Trophy Hunter` (*"I can
[Ambush] to a battlefield where there are enemy units"*).

**What survives at the narrow predicate is one, and the reason is worth more than the count.** Arriving
*inside an already-opened combat* needs `[Reaction]`, because `343.1.a` bars an ordinary card from a
Showdown State — and of the five, only `SFD-025` has it. `UNL-120`'s widened destination explicitly does
**not** widen the speed (`rengar-trophy-hunter-poppy-ambush-verb-attack` proves it from `822.1.b`), and
the other three are Main-Phase plays. So the sentence should read *"one card can be played into an
**opened combat**; five can be played to an **enemy-occupied battlefield**"* — which is the "state the
predicate with the number" rule applied to a line this file already carries.

`UNL-117`'s **second** sentence (*"Friendly units can be played to an occupied battlefield if an enemy
unit is alone there"*) is a `355.2.b` grant to the whole board and is a **third** route beside `OGN-107
Ava Achiever`, which `CLAUDE.md` names as the second. It is already catalogued and correctly, in
`stare-down-arachnoid-horror-lone-survivor` — found by running `have.mjs` before writing, which is the
third time on this lane that the tool has stopped a duplicate.

### 36.10 CORRECTION, measured — **an Equipment's `[Effect]` text is a keyword GRANT, and nine of them are**, so `823.2` is not dead letter

`CLAUDE.md` records, from this lane's own #191 batch 4 on 2026-09-09: *"**823.2** sums granted [Hunt] the
same way and **ZERO cards in the pool grant Hunt** (swept 2026-09-09), so it is three usable keywords
over four rules."* **The zero is an artifact of the predicate.** A sweep for cards that *say* they give a
keyword (`give … [Hunt]`, `have [Hunt]`) cannot see the channel that actually does it here.

> **434.1.c.** The Top-Most card has all Effect Text of all cards Attached to it appended to its Rules
> Text.
>
> **718.5.g.** An Attached card still appends the abilities in its Effect Text to the Rules Text of the
> Top-Most card and modulates the Top-Most Card's Might by its Might Bonus.

An Equipment whose `[Effect]` text is a bare keyword therefore puts that keyword on a carrier that prints
none. Swept over `data/cards.json` (Equipment tag, folded by name, `[Effect]` half only) on 2026-09-12,
**nine Equipment do it and here are all nine:**

| card | grants | rule for a second instance |
|---|---|---|
| `SFD-009` Serrated Dirk | `[Assault 2]` | `807.2` **summed** |
| `SFD-033` Doran's Shield | `[Tank]` | `815.2` redundant |
| `SFD-064` Cloth Armor | `[Shield 2]` | `814.2` **summed** |
| `SFD-090` The Zero Drive | `[Deathknell] — Banish me` | `808.2` **separate** |
| `SFD-102` Hexdrinker | `[Deflect]` | `809.2` **summed** |
| `SFD-133` Boots of Swiftness | `[Ganking]` | `810.2` redundant |
| `SFD-172` Sacred Shears | `[Deathknell] — Draw 1` | `808.2` **separate** |
| `SFD-192` Shurelya's Requiem | `[Ganking]` (to your units *here*) | `810.2` redundant |
| `UNL-096` Hunter's Machete | `[Hunt]` | `823.2` **summed** |

So **`UNL-096 Hunter's Machete` is a Hunt granter**, and `823.2` has a live case: `103.2.b` allows three
copies, nothing stops three different Equipment stacking on one carrier (`434.1.f` only detaches an
Equipment from its *current* host when it moves to a new one), and `823.1.c.1` makes each instance
*"When I Conquer or Hold, my controller gains X XP"* with `823.1.b` making it both — so three Machetes on
one body under a Duel's two Holds a turn is Hunt 3 twice, not Hunt 1.

**The precedent for treating appended text as a grant is this project's own**, and it is already
load-bearing: `CLAUDE.md` records that `SFD-059 Svellsongur` *"copies the unit's WHOLE text, keywords
included"*, so three Svellsongur on `VEN-138 Shen` (M7, `[Shield]`) are *"eight instances = Shield 8"* —
which is `814.2` summing keywords that arrived through exactly this channel. `823.2` cannot be dead
letter while `814.2` is priced that way on the same mechanism.

**Two things not claimed here.** Whether `823.2`'s *"granted"* is the precise word for an appended
`[Effect]` is the one soft joint, and it is soft for `807.2`, `809.2` and `814.2` in identical wording —
so the catalogue is already committed to the reading and this note does not open a new one. And the
correction is to the **count and its predicate**, not to `CLAUDE.md`'s conclusion that the summing family
is four paragraphs: it is, and now three of the four have a granter in the pool rather than two.

**Stated for re-use: a "does the pool grant X?" sweep must read the `[Effect]` half of every Equipment,
not only card text.** That is nine cards, and a text-level predicate misses all nine.

### 36.9 HANDOFF — rc-walk-blocks, 500–829, after batch 25

**Staged and unmerged in `/tmp/rc-walks/rc-walk-rules.json`:** `marai-spire-syndra-granted-repeat-discount`.
Validated at 752 entries / 0 errors; 73 references present; 29 quotes verbatim; 0 legend defects.

**The 801–829 keyword range is now read end to end.** §24–§26, §34, §35 and this batch cover it, and
§36.5 plus §36.6 are the two family sweeps that close the remaining rows without walking them one by one.
What is left uncited in 801–829 after this batch is, exhaustively: the 17 dead-letter characteristic
paragraphs of §36.5, the three keyword-removal paragraphs of §36.2, `818.1.c.5` (§36.3), `822.3.a`
(§36.7), and pure definitional headings (`801.1`, `801.2`, `801.2.a`, `802`, `803`, `806.1`/`.1.a`/`.1.c`,
`807.1.a`, `808.1`, `809.1`/`.1.a`/`.1.b.1`, `810.1.a`/`.1.c`/`.1.c.1`/`.1.c.2`, `811.6.a`, `813.1.a`/
`.1.c`, `814.1.a`/`.1.b.1`, `815.1.a`/`.1.c`, `816.1.a`, `817.1.a`, `818.1.c`, `819.1`, `820.1.a`/`.1.c`,
`821.1`, `823.1`/`.1.c.3`, `824.1`/`.1.a`/`.1.b`/`.1.b.2`, `825.1`/`.2`/`.3`/`.4`, `826.1`/`.2`,
`827.1.a`/`.1.c`/`.1.c.2`/`.2.a`, `828.1`/`.1.a`/`.1.b`/`.1.b.2`, `829.1`/`.1.c`/`.1.c.2`).

**Where the next session in this lane should go, in order:**

1. **§33 lead 2 is STILL untouched and still looks right** — `SFD-193 Grandmaster at Arms` as the
   **Calm/Body twin** of batch 22's `conscription-forge-of-the-fluft-equipment-outlives-the-theft`. Its
   two abilities are split on exactly the state `718.1` defines (*"Attach a **detached** Equipment"* /
   *"Attach an **attached** Equipment"*), and `718.5.f` is the recovery. `have.mjs SFD-193` first.
2. **The 500–799 half of the range**, which this lane has only entered through `716`–`727` and the
   `74x`/`76x` glossary. Run `.scratch-rules/survey.mjs 500 799` and **echo the parsed range** (§30) —
   a first run once passed `"100 299"` as one shell word and printed the same rows for two ranges.
3. `827.2.a` (*"This is an event other Game Effects and Triggered Abilities can reference"*) is uncited
   and is the paragraph under the whole *"when you empower something else"* family that `CLAUDE.md`'s
   #159 groups 31–39 describe from `441.1.b` / `441.2` alone. Likely a citation upgrade, not a row.

**Three things to report to the manager rather than apply here** (`data/combos.json` and `CLAUDE.md` are
not this lane's): the `818.1.c.4` citation upgrade of §36.4, on `gauntlets-enforcer-conquer` and
`tryndamere-hextech-gauntlets-enforcer`; the `CLAUDE.md` predicate correction of §36.8 (*"exactly one
card's own text lifts 355.2.a"* is one at the narrow predicate and **five** at the wide one, with the
reason — `343.1.a` — worth more than either number); and the `CLAUDE.md` **count correction** of §36.10,
where *"ZERO cards in the pool grant Hunt"* is an artifact of a text-level predicate that cannot see an
Equipment's `[Effect]` half, and `UNL-096 Hunter's Machete` is the counter-example.

**Scripts, all untracked, all on this machine:** `.scratch-rules/orphan.mjs`, `.scratch-rules/kw.mjs`
(**§34.6: it reports a bare top-level rule as uncited — re-derive with a bare-three-digit regex**),
`.scratch-rules/survey.mjs`, `.scratch-rules/audit17.mjs` (**§36.7: compound quotes are false
positives; do not re-patch**), `.scratch-rules/val16.ts`, `.scratch-rules/legend16.ts`, and new this
batch `.scratch-rules/kwread.mjs` (the keyword-reader sweep behind §36.5).

## 37. Batch 26 — the range's real boundaries, `653`–`715` measured spent, `763.1` checked against the pool, and the `741`–`749` Counters block

No new entry. This batch is three measured empties, one data check that came out clean, and one
**diagnosed-but-unapplied** correction five days old — which is the honest result and is recorded here
rather than forced into a line.

### 37.1 The range label "500–829" is wrong: **the Core Rules jump from 489 to 649**

Measured 2026-09-12. `grep -nE "^[[:space:]]*[56][0-9]{2}\.[[:space:]]" data/Riftbound-Core-Rules-2026-07-16.txt`
returns **exactly four headings — `649` `650` `651` `652`, the Conceding block** — and the heading
immediately below them is `489. 2v2 (Magma Chamber)`. There is **nothing between 490 and 648**.

So this lane's range has always really been **649–829**, which is why its Example-filtered vein was
declared spent so early: the manager's partition (73 rows in 100–299, 163 in 300–499, 31 in 500–829)
looked lopsided and is not — the third slice is a third the size of the others because a third of its
numbers do not exist. The 500s and 600s that this project *does* cite (`601.1.c.1`–`.c.3`, the sideboard
rules `checkBuild` scores) are in the **Tournament Rules**, a separate numbering space running 000–700s
whose content is procedure — Deck Registration, Sideboard, Match, Concessions, Judge Calls — not gameplay.
**Do not look for combo material in Core Rules 490–648; there is none to find.**

`649`–`652` themselves are the removal-of-a-player procedure (banish their permanents, replace their
battlefield with a blank token, counter their spells, pass Focus and Priority on). Uncited, correctly:
nothing in a two-player Duel reaches it, and `652.2.a` — *"If it was in use, Replace it with a token
battlefield with no abilities"* — is the only paragraph with any game content, and it needs a third
player.

### 37.2 `653`–`715` is **SPENT**, and the measurement is the deliverable

Re-derived with a bare-three-digit regex over `combos.json` + `synergies.json` (§34.6: `kw.mjs` cannot
see a top-level rule cited bare, and the `nb 0` column of `survey.mjs` is the same artifact — **every one
of the seventeen rows it listed here was a false positive**). The true citation counts:

`703` **125** · `709` **111** · `702` **73** · `710` **40** · `714` **40** · `705` **35** · `713` **25** ·
`708` **16** · `711` **13** · `715` **11** · `706` 4 · `701` 3 · `704.1` 3 · `705.1` 2.

**Uncited in 653–715, exhaustively: `700`, `702.1`, `704`, `707`, `712`** — and all five are either a
section heading with no content (`700` *"Additional Rules"*, `706`/`712` are just the words *"Mighty"*
and *"Bonus Damage"*, `704` and `707` one-line definitions their sub-rules do the work for) or `702.1`,
which tells you a buff can be tracked *"with a buff reminder card from a Riftbound booster pack or with
any spare object in your surroundings"* — a physical-play note with no game content. §34.7 had already
set `704`, `704.1` and `707` aside; this closes the rest of the block with numbers.

### 37.3 `763.1` prints the canonical tag list, and it matches the pool **127 to 127** — with one artifact that is Riot's

> **763.** When instructed to name a tag, a player cannot choose to name a tag that does not exist on
> cards or tokens in Riftbound.
> **763.1.** The following tags exist in Riftbound: …

Nobody had checked that list against our data. Done 2026-09-12 by `.scratch-rules/tagcheck.mjs`, which
**extracts the list from the rules file between the `763.1` and `764` anchors rather than typing it** (the
apostrophe in *Kai'Sa* breaks a shell-quoted literal, and a typed list is the failure class this lane
keeps paying for):

- `763.1` splits into **128** comma-separated entries; the pool prints **127** distinct tags.
- **In the pool and not in `763.1`: one — `Miss Fortune`.**
- **In `763.1` and not in the pool: two — `Miss` and `Fortune`.**

So the correspondence is **exact**, and the single discrepancy is a **spurious comma in Riot's own rules
text**: `763.1` writes *"Mel, **Miss, Fortune**, Morgana"*. Measured: **8 printings carry `Miss Fortune`
as one tag** (Miss Fortune Captain, Miss Fortune Buccaneer, Bounty Hunter, Bullet Time) and **zero cards
carry a tag `Miss` or a tag `Fortune`.**

**The card that reads the list refutes the typo itself.** `UNL-138 The List` (*"As you play this, name a
tag"*) prints the reminder *"(For example, **Miss Fortune**, Demacia, and Poro are tags.)"* — so rule 002
(card text beats rules text) settles it from the card side, and no reading needs to be filed. This is the
same shape as the `383.1.b` / `OGN-118` discrepancy already registered in this project: **a defect in
Riot's rules text, registered and never put into `data/errata.json`**, whose find-string failure is the
only mechanism keeping our card text honest.

Same run, a free integrity check: the synergy layer uses **eight** `partner.tags` — `Bird`, `Cat`, `Dog`,
`Dragon`, `Equipment`, `Ivern`, `Mech`, `Poro` — and **all eight are printed by real cards**, so
`763`'s "cannot name a tag that does not exist" has nothing to catch there either.

The rest of the naming block is already covered and this batch adds nothing to it: `762` (2), `762.1` (1),
`762.2` (1) and `761.2` (3) are cited, `ashe-fallen-feline-named-lock` carries them and is careful; only
`759`, `760`, `761` and `761.1` are uncited and all four are definitional.

### 37.4 The `741`–`749` Counters block is uncited but for one stray reference, `CLAUDE.md` said so on 2026-09-07, and nobody applied it

`CLAUDE.md` records, from `#187` batch 2: *"**741-749 Counters**, where **745.2** is the general form of
`702.2.b.2` and **748** (*"Game Objects that change zones to a non-board zone lose all of their
Counters"*) is the real rule behind buff recovery — both better citations than the `702.x` this project
currently uses."* Measured again on 2026-09-12: **`741` 0 · `742` 0 · `743` 1 · `744` 0 · `745` 0 ·
`745.1` 0 · `745.2` 0 · `746` 0 · `747` 0 · `748` 0 · `749` 0**, against **`702.2.b.2` 14**. Five days on,
the block is exactly as uncited as when it was diagnosed. **This is the diagnosed-but-unapplied class this
project names repeatedly; it is reported to the manager with the target list rather than left as prose.**

**The upgrade has a large, concrete blast radius.** Eight cards carry the mechanic and **26 entries use
them**: `OGN-146 Wallop` (5) · `OGN-153 Overt Operation` (5) · `OGN-207 Call to Glory` (4) ·
`SFD-101 Fae Dragon` (4) · `OGN-228 Vanguard Helm` (4) · `OGN-282 Monastery of Hirana` (2) ·
`OGN-147 Wildclaw Shaman` (1) · `OGN-269 The Boss` (1).

**What `745.2` actually settles, and it is worth a sentence in each of them.** Five cards print *"spend a
buff"* with **no owner stated** — Wallop, Wildclaw Shaman, Call to Glory, Monastery of Hirana, and Fae
Dragon's *"When you spend a buff"* trigger. `745.2` is the rules-level guarantee that an unqualified
spend can only take a counter off **your own** board: *"In order to spend a Counter, the spending player
must control the Game Object the Counter is placed on."* Nothing on those five cards says it; the rules
do, and that is exactly why none of them has ever had to.

### 37.5 REFUSED with the arithmetic — the one line that could make `745.2` bite, and why it collapses

`745.2` keys on **controlling the object**, `749` says *"Counters do not have a controller"*, and `748`
takes counters only on a change to a **non-board** zone — so a change of **control** is not a zone change
and **a buff survives a theft and becomes the thief's to spend.** That is the exact complement of batch
22's finding for Equipment, and the two belong in one sentence:

> **An Equipment's Control does NOT follow its carrier (`718.5.f`); a buff's spendability DOES
> (`745.2` + `749`).** Steal an equipped body and the opponent keeps a card they cannot use; steal a
> **buffed** body and its buff is yours to spend, because a counter has no controller of its own and the
> gate is on the object. `UNL-140 Conscription` recalls the stolen unit to your base, which is a board
> location, so `748` never fires and the buff rides along.

**And the line that would exploit it does not exist.** Getting a buff onto a body you do **not** control
needs a card that buffs an enemy, and the pool prints exactly two candidates:

- `OGN-283 Navori Fighting Pit` — *"When you **hold** here, buff a unit here"*, unrestricted as to side —
  **and it provably cannot reach an enemy.** `315.2.b.2` Holds only battlefields you Control, and an
  enemy body present at one applies Contested (`190.3.a.1`) and stages a Combat (`323.9`) that resolves
  before your Beginning Phase; `466.1.a.2` sends surviving attackers home. There is no state in which you
  Hold a battlefield with an enemy unit standing on it, so *"a unit here"* is always one of yours.
- `UNL-201 Voidreaver` — *"Spend 1 XP, exhaust: [Buff] a unit"*, genuinely unrestricted, Body/Chaos legend,
  legal beside mono-Chaos Conscription.

**Voidreaver's version collapses on ordering, not on rules.** `703` makes the buff +1 Might, which pushes
a Might-3 target to 4 and breaks Conscription's own gate (*"an enemy unit at a battlefield with 3 Might or
less"*), so you must also pay its 5-XP lift — 6 XP and an exhaust in total, with `824.1.d` and `730.2`
switching off every `[Level N]` rung you were standing on. And the whole construction is pointless:
**steal first and buff afterwards** and you control the body when the counter is placed, for 1 XP and no
lift. So `745.2`'s restriction is never binding in this pool in the direction a line would want.

Where it **is** binding is defensive and is not a line: if the opponent steals **your** buffed unit, the
buff rides to them and you can no longer spend it. **Scope: the current pool**, and the condition to
re-check is a set printing a cheap unrestricted enemy-buffer or a buff that is worth more than the body.

### 37.6 HANDOFF — rc-walk-blocks, 649–829, after batch 26

**Staged and unmerged in `/tmp/rc-walks/rc-walk-rules.json`:** still just
`marai-spire-syndra-granted-repeat-discount` (batch 25). Nothing added this batch.

**State of the real range (649–829), all re-derived with the bare-digit regex, not inherited:**

| slice | state |
|---|---|
| `649`–`652` | Conceding. Uncited and **correctly so** — needs a third player (§37.1). |
| `653`–`715` | **SPENT.** Five uncited rows, all definitional or physical-play notes (§37.2). |
| `716`–`727` | Closed end to end by §34 / §35. |
| `728`–`739` | XP and Additional Turns. `734`–`738` cited (`CLAUDE.md` carries Riot's Time Warp arithmetic); uncited leftovers are `728`, `729.1`, `729.1.a`, `729.2`, `730`, `732`, `739` — marking, public information, teammates. |
| `740` | `740.1.b` (*enemies*), `740.3`, `740.4`, `740.4.a`, `740.4.a.2`, `740.4.a.2.a` uncited; the last is a **citation upgrade only**, `204.3.b` is primary (§30). |
| `741`–`749` | **UNCITED**, save one stray reference to `743`. Citation upgrade across 26 entries (§37.4); the exploit refused (§37.5). |
| `750`–`755` | Cited except `751`, `752`, `753`, `753.2`. `753.2` is the only one with content (*"may not make new choices … if there aren't legal choices"*). |
| `756`–`767` | Untargetability and Ignoring, both cited and both walked. |
| `759`–`763` | Naming. Covered except four definitional rows; `763.1` checked against the pool (§37.3). |
| `801`–`829` | Read end to end by §24–§26, §34, §35, §36. |

**Where the next session should go, in order:**

1. **§33 lead 2 — `SFD-193 Grandmaster at Arms`. Re-scoped by this batch: the free-reattach angle is
   TAKEN** (`jax-grandmaster-warmogs-buff`, `jax-grandmaster-brutalizer-refresh`,
   `royal-entourage-grandmaster-warmogs-two-conquers`, `aphelios-jax-quickdraw-attach`). What is **not**
   taken is the `718.5.f` theft-recovery in Calm/Body, and the reading that his two abilities are split on
   exactly the state `718.1` defines, with the **attached** one FREE and the **detached** one costing
   1 Energy — an inversion that `718.2` / `721.2` explain, because an attached Equipment's own `[Equip]`
   is Inactive and his free ability is the only thing that can move it.
2. `753.2`, and `740.1.b` if a line ever turns on the definition of *enemy*.
3. **The Tournament Rules as a separate vein** (§37.1) — procedure, not combos, but it is where the
   `checkBuild` rules live and it has never been surveyed by this lane.

**New script this batch:** `.scratch-rules/tagcheck.mjs` (§37.3), which extracts `763.1` from the rules
file between anchors and diffs it against `data/cards.json`. Untracked, on this machine. Re-run it after
every set: it is a one-second check that the pool and Riot's own tag list still agree.

## 38. Batch 27 — the range is spent, so the lane crossed into the **Tournament Rules**: `505 Loops` governs this catalogue's entire INFINITE class and had never been read

No new entry. This batch is one substantive finding in a document nobody on this project has surveyed,
two measured empties, and one integrity check that came out clean.

### 38.1 Inherited state, re-derived rather than believed

`§37` handed over a range that is really **649–829** and reported it closed. Re-derived with the
bare-digit regex (`.scratch-rules/cite27.mjs`, which echoes its parsed argv per the standing rule):

- **The `741`–`749` citation debt `§37.4` reported is PAID.** `745.2` now reads **28** citations,
  `749` **28**, `748` **14**, `718.5.f` **23**. The manager's ledger is right and `§37.4` is stale;
  `741`'s 14 hits are the range label *"741-749"* in prose, not citations.
- `753.2` and `740.1.b` — the two rows `§37.6` left — are still uncited, and both are definitional.
  `753.2` (*"A player may not choose to make new choices for a spell or ability if there aren't legal
  choices that they could make in this way"*) adds nothing to `753.1` for this pool: the re-aim clause
  is printed on exactly **two** cards, `OGN-080 Mystic Reversal` and `VEN-152 Rebuttal`, and both are
  already walked (`mystic-reversal-charm-free-reaim` cites `751.1`/`752.1`/`752.2`/`753.1`/`755.1`;
  `rebuttal-mel-souls-reflection-offset-empower`). **Closed with the sweep, not with a verdict.**

### 38.2 INTEGRITY, measured clean — **no citation in this project points into the Core Rules' 490–648 void**

`§37.1` established that the Core Rules jump from 489 to 649. That raises an obvious question nobody
asked: did anything ever get cited *into* the gap? Measured over `combos.json` + `synergies.json`
(`.scratch-rules/dualspace.mjs`, `.scratch-rules/gapctx.mjs`):

- Core Rules headings in 490–648: **0**, confirming `§37.1` independently.
- Apparent citations in that range: `500` (22), `501` (1), `603` (1), `604` (1). **Every one is a false
  positive** — YouTube `&t=500` style source timestamps, plus this walk document's own title string
  *"uncited Core Rules sub-rules 500-899"* quoted in `sources[].title`.
- The only genuine Tournament Rules citation in the data is **`703.3.a.3`**, and it is **labelled as
  such at both use sites** (*"the Tournament Rules allow 3 copies (703.3.a.3)"*).

So the two numbering spaces have never been confused. `test/rule-refs.test.ts` already reads both
documents and says why in its own header comment. **A first pass reported 84 "ambiguous" tokens cited in
both documents; that number is an artifact** — a bare-three-digit regex swallows the numeric tail of card
codes (`OGN-212` → `212`) and `&t=` timestamps. The small structural check (0 headings in the gap; every
gap hit is a URL) is the true one. Same shape as the standing rule: **the count that contradicts a small
structural fact is the artifact, and the contradiction is the finding.**

### 38.3 The Tournament Rules **name 17 pool cards and all 17 are already catalogued** — that vein does not extend

This project's cheapest proven vein is *"grep the rules file for card names"*. Run for the first time
against the Tournament Rules (`.scratch-rules/tourney-names.mjs`, which folds printings by name and
checks each base against `combos.json` rather than typing a list):

> Ahri Alluring · Discipline · Miss Fortune Captain · Obelisk of Power · Overzealous Fan · Possession ·
> Pouty Poro · Ravenbloom Student · Sanction · Scrapheap · Sett Brawler · Stacked Deck · Startipped Peak ·
> Stealthy Pursuer · Traveling Merchant · Tryndamere Barbarian · Void Gate

**Seventeen names, seventeen catalogued, zero leads.** Recorded so nobody runs it twice. The named cards
are illustrations of *procedure* (`506.3.e`'s observable-impact list), not of interactions.

### 38.4 `checkBuild` against Tournament Rules `402`–`403`: **no gap** — `403.3` is already implemented

`403.3` — *"Limits on copies of named cards as defined by competition format apply to the combination of
Main Deck and sideboard"* — is the one paragraph in the deck-registration block with real teeth, because a
list with three copies in the Main Deck and a fourth in the sideboard is illegal and a Main-Deck-only
count would pass it. `src/builder.ts` already scores it (`copiesByName(cards, [deck.main, deck.sideboard])`,
`sideboardCapOf`, both citing `403.3` by number, landed with `#197`). Checked, not assumed; nothing owed.

### 38.5 **`505 Loops` — the tournament rule that governs all 14 INFINITE entries, cited ZERO times**

Measured: `505` **0** citations, `506` **0**, against `416.5`'s **60**. The pool-level mechanic is
well understood here; the procedural rule that consumes it has never been opened.

> **505.2.** Players performing a loop must have each iteration of the loop be identical with no
> conditional actions.
>
> **505.9.** If a sequence of actions is non-deterministic, it may not be shortcut and iterations must be
> performed manually.
>
> **505.6.** If no player chooses to break the loop and there were no maintaining players, the game ends
> in a draw.
>
> **505.11.** Judges are the final arbiter of what constitutes a loop, or if choices are available to
> continue a loop when secret information is involved.
>
> **505.12.** Players who try to opt-out of shortcutting or propose incorrect shortcutting to use up time
> are cheating.

Read against Core Rules **416.5** — *"If 2 or more cards are Recycled to the Main Deck simultaneously,
they are placed on the bottom of that deck in a random order"* (worked example: Garbage Grabber) — this
is a real constraint on a loop that recycles two or more Main Deck cards in one action.

**The additive half, stated narrowly.** This catalogue *already* reasons about `416.5` at the rules
level, and says so in its own words: `lady-luminosity-loop-comet` notes *"Without Lady the pass strands
one card in the deck, and 416.5 randomises cards recycled simultaneously so you cannot even choose which
one"*, and four entries turn on *"Vi recycles ONE at a time, so 416.5 never engages"*. What is new is the
**procedural consequence**: a pass whose intermediate states vary is not *"identical"* under `505.2`, so
`505.9` bars shortcutting it and the iterations must be physically performed — which at an event is a
clock problem, with `505.12` making it cheating to abuse the negotiation.

**The condition, and it is checkable:** a loop may be shortcut iff **every card it recycles to the Main
Deck in a pass is drawn back inside that same pass**, because the deck is empty by construction and the
random order therefore never selects a subset. A loop that recycles *more* than it draws strands a random
card, so its next pass differs and `505.9` engages.

**All 14 INFINITE entries pass, and the two that could fail were checked by hand**, not by regex:

| entry | recycled to Main Deck per pass | drawn per pass | verdict |
|---|---|---|---|
| `lux-infinite-energy` | 3 simultaneous (Forge, Shadow's Call, Sacrifice) + Ekko alone = **4** | 2 + 2 = **4** | balanced — shortcuttable |
| `lady-luminosity-loop-comet` | 4 simultaneous (Forge, Shadow's Call, Sacrifice, Falling Comet) + Ekko alone = **5** | 1 + 2 + 2 = **5** | balanced — shortcuttable |
| `jhin-virtuoso-ekko-malzahar-vi` | its multi-card recycle is **four RUNES**, which `416.5.a` returns *"in the order of their owner's choosing"* | — | deterministic by `416.5.a`, not `416.5` |
| other 11 | no simultaneous multi-card Main Deck recycle | — | `416.5` never engages |

**So the "ZERO spare draws" invariant of the loop ledger (`#21`) is load-bearing a second time, against a
rule the ledger was not written for.** The catalogue maintains it because a fifth draw is `431.1.a` Burn
Out on one side and a stranded random card on the other; it turns out to be the exact condition under
which the loop is *shortcuttable* rather than hand-iterated. Two unrelated constraints, one balance.

**Not applied to the entries.** This is tournament procedure, not rules legality — it changes no class,
no arithmetic and no card set, and this lane does not own `data/combos.json`. Flagged to the manager as a
citation upgrade available to the 14 INFINITEs (`505.2` · `505.9` beside their existing `416.5`), to be
applied once or not at all.

### 38.6 `506.5` — **a forgotten trigger still burns a "first time each turn" slot**

> **506.3.** The accountable player must acknowledge their triggers by the time they would have an
> observable impact on the game. If they do not, they are forgotten.
>
> **506.4.** A triggered ability that was forgotten never goes on the chain.
>
> **506.5.** A triggered ability that was forgotten is still considered to have triggered for the purpose
> of non-optional "First time" or similarly restricted triggers.

This meets a family the catalogue owns from the Core Rules side. `383.3.e.1` (*a "the first time … each
turn" trigger will only be performed the specified number of times each turn*) and `383.1.b` (simultaneous
instances collapse to one) are cited across this project — `OGN-118 Wraith of Echoes` and
`UNL-174 Shard of Undoing` are the worked cases. `506.5` adds the procedural edge: **forget it and you do
not get it back that turn** — the slot is spent by a trigger that never reached the chain. `506.3.d` gives
the one exemption (*"At the start of each player's first Beginning Phase"* triggers have the whole turn),
naming Obelisk of Power and The Arena's Greatest, both of which are banned in every format here.

`506.1.a` is a second, smaller confirmation of something this project derived: accountability for a
battlefield's triggers *"depends on control of the battlefield and is not automatically the player who
brought the battlefield to the game"*, cross-referencing `CR 190.6` — the same referent chain the `R8`
ruling was settled on.

### 38.7 HANDOFF — rc-walk-blocks after batch 27

**Staged:** nothing. `/tmp/rc-walks/rc-walk-rules.json` is `[]` and this batch produced no entry.

**The Core Rules range 649–829 is CLOSED.** `§37.6`'s table stands, with `753.2` and `740.1.b` now closed
by `§38.1` as well. There is no Example-filtered material left in it.

**The Tournament Rules are a live vein and this batch only opened the door.** Surveyed and reported here:
`402`–`403` (no `checkBuild` gap), `505`, `506`, plus the card-name sweep. **Not read:** `501`–`504`
(Communication, Information, Shortcuts, Sequencing — `503 Shortcuts` and `504 Sequencing` are the obvious
next rows, since they govern how a catalogued line is *communicated* and are the other half of `505`),
`507`–`509`, `600`s (Competition Formats, where `601.1.c` already feeds `checkBuild`), and the `700`s
(Penalties — `704.8` cheating, `702.2` missed triggers, both cross-referenced from `505.12` and `506.3.c`).

**Standing caution for whoever takes it:** the two documents share a numbering space. Every Tournament
Rules citation must be written **labelled** — *"Tournament Rules 703.3.a.3"* — exactly as the two existing
sites do, or `test/rule-refs.test.ts`'s either-document existence check will silently accept a paragraph
from the wrong book.

**And the caution above is not hypothetical — it caught me inside this batch.** The quote checker (`.scratch-rules/qcheck27.mjs`, an EXPLICIT list of the 13 passages claimed, per the standing rule against regexing spans out of the JSON) returned **12/13**, and the one failure was `753.2` tested against the Tournament Rules when it is a **Core Rules** paragraph. The quote was right; the *book* was wrong. A checker that verifies a passage against whichever document you happened to name will report a correct citation as fabricated, and — the dangerous direction — an either-document check will report a wrong-book citation as fine. **Say which document every quote comes from, and check it against that one.**

**New scripts this batch**, all in `.scratch-rules/` (gitignored, on this machine): `cite27.mjs` (bare +
sub-rule citation counts, echoes parsed argv), `dualspace.mjs` (cross-document citation ambiguity),
`gapctx.mjs` (context for a citation token), `tourney-names.mjs` (card names in the Tournament Rules).

## 39. Batch 28 — `502`–`504`, and the procedural rules that decide whether `bullet-time-seals-scaling-sweep`'s central claim survives a real table

No new entry. One concrete citation upgrade to a shipped entry, and the information taxonomy that the
loop entries have been assuming without a source. All twelve passages below verified verbatim against
`data/Riftbound-Tournament-Rules-2026-07-16.txt` (`.scratch-rules/qcheck28.mjs`, explicit list, 12/12).

### 39.1 `503.9.c` and `503.9.d` complete the one entry in the pool built on paying at RESOLUTION

`bullet-time-seals-scaling-sweep` rests on `204.3.b` / `740.4.a.1` — a cost *within an instruction* is
paid on resolution — and its step 5 reads *"Let the opponent respond. Only on resolution do you pay …
so choose the amount after seeing what they did."* Its notable goes further: *"Nothing else in the pool
lets you size a sweeper after seeing the answer."* That is right at the rules level and **incomplete at
the table**, because whether you still hold the choice when the spell resolves is governed by three
Tournament Rules paragraphs this project has never cited:

> **503.9.b.** When a player places a spell or ability on the chain, they are assumed to be passing
> priority unless they explicitly announce they intend to retain it.
>
> **503.9.c.** When a player puts a spell or ability on the chain and announces choices for it that are
> normally made upon resolution, they must adhere to those choices unless their opponents react.
>
> **503.9.d.** When a player asks about choices normally made upon resolution, they are assumed to be
> passing priority and allowing the spell or ability to resolve.

Three consequences, and they run in both directions:

1. **Announcing the amount early forfeits the entire advantage.** `503.9.c` binds you to a choice you
   volunteered, *"unless their opponents react"* — so the whole value of `740.4.a.1` is lost by saying
   *"Bullet Time for four"* as it goes on the Chain. The correct play is to announce the spell, the
   battlefield, and **nothing else**. The entry's step 5 should say so.
2. **The opponent asking the question hands you the resolution.** By `503.9.d`, *"how much are you
   paying?"* is itself a pass of priority. So the question a Bullet Time opponent most wants to ask is
   the one that ends their window — and the answer is then given with their response already spent.
3. **You may not infer their pass.** `503.8` — *"When resolving spells or abilities, players can't assume
   their opponents are using shortcuts without asking"* — so the sizing decision waits on an actual pass,
   not on silence.

**Flagged, not applied**: this is a citation upgrade to a verified entry and this lane does not own
`data/combos.json`. It changes no arithmetic and no card set; it makes the entry's own sentence
*operable*.

### 39.2 `504.3` is the guard on the other side, and `504.4` confirms "a recycled rune leaves the board" as a *physical* requirement

> **504.3.** Players can't shortcut out-of-order in a way that gives them information prematurely that
> might affect decisions later in that sequence.
>
> **504.4.** When something is recycled, it must be immediately put on the bottom of the appropriate deck.
>
> **504.4.a.** *Example:* A player may not keep their recycled runes facedown on the board to track Energy.

`504.4` matters to this catalogue out of proportion to its size. Dozens of entries turn on `164.2.b` —
the rune ability whose cost is the **recycle**, not an exhaust — and on `161.2.b` sending that rune to the
Rune Deck rather than the Main Deck, i.e. *off the board*. `504.4.a` is Riot forbidding, by name, the exact
physical shortcut that would blur it. The free-floor arithmetic (`#44`: about 2 Power a turn, `315.3.b`
channelling two back) is therefore not just legally but **procedurally** clean: the rune is gone the
moment it pays.

`503.6` and `503.7` bound the rest (*"Players can't use shortcuts they haven't previously announced"*;
*"Players can't interrupt a shortcut with the intent to do nothing"*), and with `505.12` from `§38.5`
they are why a loop cannot be used as a clock weapon in either direction.

### 39.3 `502` — the information taxonomy the loop ledgers assume

> **502.5.a.** Which public cards have been recycled.
> **502.5.b.** The order of runes in a Rune Deck.
> **502.2.b.** Players are not required to assist opponents in determining derived information.

Both are **derived**, not public and not secret. That is the exact status this project's loop entries have
implicitly relied on and never sourced, and it sits cleanly beside the two recycle-order rules: the *set*
on the bottom of the Main Deck is derivable, its **order is not knowable to anyone** (`416.5`, random),
while a Rune Deck's order **is** knowable to its owner (`416.5.a`, owner's choosing) and is derived
information the opponent may work out unaided but that you need not help them with (`502.2.b`).

So the asymmetry the catalogue exploits in `jhin-virtuoso-ekko-malzahar-vi` — four runes recycled in a
chosen order — is information-legal as well as rules-legal.

### 39.4 HANDOFF — rc-walk-blocks after batch 28

**Staged:** still nothing; `/tmp/rc-walks/rc-walk-rules.json` is `[]`. Two batches in a row have produced
findings rather than entries, which is the honest shape of a procedural document — the Tournament Rules
contain no combos, and this lane should not manufacture one from them.

**Tournament Rules read so far:** `402`–`403` (`§38.4`), `502`, `503`, `504`, `505`, `506`, plus the
card-name sweep (`§38.3`). **Unread, in the order I would take them:** the `700`s **Penalties** —
cross-referenced four times from what is already read (`505.12` → `704.8` cheating, `506.3.c` → `702.2`
missed triggers, `504.4.b` → `703.5` communication violations) and the only block left with teeth; then
`507`–`509`; then the `600`s Competition Formats, where `601.1.c` already feeds `checkBuild` and `600` is
the cross-reference from `403.1` for sideboard size by format.

**Two citation upgrades are now outstanding from this lane and both are flagged, not applied** (the lane
does not own `data/combos.json`): `505.2` · `505.9` for the 14 INFINITEs (`§38.5`), and
`503.9.b` · `503.9.c` · `503.9.d` for `bullet-time-seals-scaling-sweep` (`§39.1`). The second is the
stronger of the two, because it makes a shipped entry's own step actionable rather than merely correct.

## 40. Batch 29 — `601.2.a` is the rules source for `CardIndex.equivalents()`, and it settles the `VEN-SP` question with data

No new entry. One large citation upgrade, one long-standing project claim confirmed **with a source it
never had**, and three integrity checks that came out clean. Nine passages verified verbatim
(`.scratch-rules/qcheck29.mjs`, 9/9).

### 40.1 The paragraph behind the matcher's name-folding, cited nowhere

> **Tournament Rules 601.2.a.** A card may only be included in a deck if it is from a set that is legal in
> that format **or it has the same name as a card from a set that is legal in that format**.

This project folds printings **by name+type** everywhere it counts anything — `CardIndex.equivalents()`
(`src/cards.ts:124`) resolves a base code to every printing sharing its normalised name and type,
`matchDeck` builds `owned` through it, and `CLAUDE.md` records the standing rule that *"any 'cards in no
entry' census must fold printings by name+type first"* and that *"coverage is keyed on NAME+TYPE, not on
base code."* That is done for **correctness of matching**; `601.2.a` is the paragraph that makes it the
**legally correct** thing to do, and it is cited by nothing in `combos.json` or `synergies.json`.

It also explains *why* the fold is the right unit rather than a convenience: legality travels with the
**name**, so two printings of one name are interchangeable in a decklist by rule, which is precisely the
equivalence `equivalents()` implements.

### 40.2 The six `VEN-SP` cards: `CLAUDE.md`'s claim is CONFIRMED, and now it has a rules source

> **601.2.c.** If an existing card is reprinted in a new set, but its collector number is not within the
> normal numbering of that set, it does not affect the card's format legality.
>
> **601.2.c.1.** *Example:* A card with collector number 300/250 is not automatically legal within the
> standard format of that set.

`CLAUDE.md` states that `VEN-SP1`–`SP6` *"are real playable cards (Kai'Sa, Sona, Ahri, Sett, Ezreal,
Lux)"* and warns that a `^[A-Z]{3}-\d{3}$` regex drops them silently. `601.2.c` is the paragraph that
could have made that wrong — an out-of-range collector number confers no legality of its own. Measured
over `data/cards.json`, **every one of the six shares a name with an in-range printing**, so `601.2.a`
carries all six:

| SP printing | name | in-range printings of that name |
|---|---|---|
| `VEN-SP1` | Kai'Sa, Survivor | `OGN-039`, `OGN-039a` |
| `VEN-SP2` | Sona, Harmonious | `OGN-073` |
| `VEN-SP3` | Ahri, Inquisitive | `OGN-119`, `OGN-119a`, `SFD-227`, `SFD-227*` |
| `VEN-SP4` | Sett, Brawler | `OGN-164`, `OGN-164a`, `SFD-232`, `SFD-232*` |
| `VEN-SP5` | Ezreal, Prodigy | `SFD-149`, `SFD-149a` |
| `VEN-SP6` | Lux, Crownguard | `OGS-014` |

**So they are legal BY NAME and not by their own printing** — which is `601.2.c` read forward rather than
as a threat. The condition to re-check is a future `-SP` printing of a name that exists nowhere in range;
there are none today, and the probe is two lines.

Free confirmation from the same run: `data/cards.json` carries **147** printings with a non-empty
`variant`, split **45** `*` and **102** `a` — matching `CLAUDE.md`'s counts exactly, independently
re-derived. Note the schema trap that cost me a run: the alt-art suffix lives in **`variant`** (and in
`code`), **not** in `base`, which is already normalised — a probe written as `/\*$/.test(c.base)` returns
**zero** and reads as a discovery. Same instrument class this lane keeps paying for.

### 40.3 `checkBuild` against the `600`s: **no gap**, and which paragraph is PRIMARY

`checkBuild` cites `103.1.a.1`, `103.1.b.1`, `103.2`, `103.2.b`, `103.3.a`, `103.4.a`, `103.4.c` from the
Core Rules and `402.1`, `403.3`, `601.1.c.1`, `601.1.c.2`, `601.1.c.3` from the Tournament Rules. Checked
row by row against the `600`s:

- **`601.1.b`** (*"In competitions, a player's Main Deck must be exactly 40 cards"*) is a **weaker
  duplicate** of `402.1`, which `checkBuild` already cites and which is **PRIMARY**: it names the 40
  *"(including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique
  name"*, where `601.1.b` gives only the 40. Nothing owed.
- **`601.1.c.4`** adds a condition `403.4.a` does **not** state — the replacement Chosen Champion must be
  one *"that matches their Legend"*, against `403.4.a`'s *"that meets the deckbuilding rules of the
  competition format"*. Already enforced: `src/builder.ts:196` scopes the `champion` pool to units
  carrying `championTagOf(legend)`, so an unmatched champion cannot be selected at all. **`601.1.c.4` is
  the tournament-side statement of a constraint the builder enforces structurally.**
- **`601.1.d`** is an addenda pointer (*"the legal battlefields are different … communicated to players
  via specific event addenda"*) with no content to score.

### 40.4 `601.2.d.2.a` — a narrow, real exception to the ban list, and our data matches Riot's own example

At low OPL a player running **the exact contents** of a preconstructed deck *"are allowed to use the
banned cards in the deck, such as Fight or Flight, Scrapheap and Reaver's Row. If the player makes any
changes or adds a sideboard, they can no longer include the banned cards."*

All three are in our pool and **all three are `banned` in both `constructed` and `2v2` in
`data/legality.json`** — `OGN-168 Fight or Flight`, `OGN-182 Scrapheap`, `OGN-285 Reaver's Row` — so Riot's
worked example and our legality data agree card for card. Checked per the standing rule that every
legality sentence is verified against `data/legality.json` (whose only two statuses are `banned` and
`restricted`).

**This exception must NOT reach `data/legality.json` or the UI.** It is conditioned on OPL *and* on
owning an unmodified preconstructed product, neither of which a decklist expresses; the site's job is to
report format legality, and a list that matches a precon exactly is still an illegal Constructed list
everywhere above low OPL. Recorded here so nobody reads `601.2.d.2` as a bug in our ban data.

### 40.5 HANDOFF — rc-walk-blocks after batch 29

**Staged:** nothing. `/tmp/rc-walks/rc-walk-rules.json` is `[]`.

**Three citation upgrades outstanding from this lane, all flagged and none applied** (the lane does not
own `data/combos.json`), in descending order of worth:

1. **`601.2.a`** as the source for name-folding — belongs in `CLAUDE.md` beside the `equivalents()` rule
   rather than in any single entry, since it justifies a mechanism rather than a line (`§40.1`).
2. **`503.9.b` · `503.9.c` · `503.9.d`** for `bullet-time-seals-scaling-sweep` (`§39.1`).
3. **`505.2` · `505.9`** for the 14 INFINITEs (`§38.5`).

**Tournament Rules read:** `402`–`403`, `502`–`506`, `600`–`602`, plus the card-name sweep. **Unread:**
the `700`s **Penalties** (cross-referenced four times from what is read: `505.12`→`704.8`,
`506.3.c`→`702.2`, `504.4.b`→`703.5`, and `703.3.a.3` is already cited by two entries), `404`–`424`
(match procedure, proxies, shuffling — likely no combo content), `507`–`509`, and `602.3`'s limited
deckbuilding. **My expectation, stated so it can be falsified:** the `700`s are penalties and will yield
**procedure, not entries** — the same shape as batches 27–29. If that holds, the Tournament Rules vein is
worth one more batch and then it is spent, and this lane should be redirected or retired.

## 41. Batch 30 — the `700`s, where **my own prediction was wrong**: `702.3.a` corroborates `R2` from a second Riot document

`§40.5` predicted the `700`s would yield *"procedure, not entries — the same shape as batches 27 to 29"*,
and said so precisely to be falsifiable. **The "no entries" half held; the "procedure only" half did not.**
Two paragraphs in the penalty block carry game content that reaches named entries in this catalogue.
Nine passages verified verbatim (`.scratch-rules/qcheck30.mjs`, 9/9).

### 41.1 `702.3.a` — Riot's tournament policy draws `R2`'s line, and names `R2`'s own card

> **702.3.** *Forgetting to Score a Point [No Penalty]:* A player is entitled to a point from conquering
> or holding a battlefield but fails to track it.
>
> **702.3.a.** This does not apply to points that would be scored from card triggers such as
> **Ahri, Alluring**.
>
> **702.3.b.1.** If the correct score can be determined and no more than a full round cycle has passed,
> increment the appropriate player's score to that total.

`R2` is the reading, ruled `= A` by the user on issue `#11`, that a card-text *"score 1 point"* is a
**194.1.c point Gain by ability** and **not a 469 Score**, so `470`'s once-per-battlefield cap does not
reach it. `CLAUDE.md` records that it was ruled **after a web search found no official Riot ruling** —
all four set FAQs silent. **There is now a Riot document that draws the same line**, in a different book,
and its worked example is `OGN-066 Ahri, Alluring` — the card four `R2` entries are built on
(`ahri-blue-sentinel-hold`, `svellsongur-copy-hold`, `skyfall-ahri-conquer`,
`ahri-trinity-svellsongur-hold`). `R2` is cited in **60** entries, so this is not a marginal reading.

**State the strength of it exactly, because overclaiming here would be worse than saying nothing.**
`702.3.a` corroborates `R2`'s **premise** — that Riot treats a point from conquering or holding and a
point from a card trigger as two *different kinds of thing*, to the extent of giving one a remedy and
the other none. It does **not** adjudicate `R2`'s **conclusion**, which is about whether `470`'s cap
applies; a penalty guideline is not a rules ruling and `002` does not reach it. So this is **evidence for
the premise, from an independent document**, and the ruling stays where the user put it. If Riot ever
rewords the cards from *"score"* to *"gain"* — the condition `CLAUDE.md` already names as confirming
`R2` — this paragraph will have been the early sign.

**The practical half, which is new and applies to play:** a Hold or Conquer point you forget is
**recoverable** within a round cycle (`702.3.b.1`); a card-trigger point you forget is **not**, because
`702.3.a` excludes it from the remedy and `506.3.b` has already forgotten the trigger. So the ability-gain
finishers in this catalogue carry a procedural fragility that Hold and Conquer finishers do not — and
`506.3.e.1` names *"The trigger would change a point total"* as its first example of observable impact,
with Ahri, Alluring again as the card.

### 41.2 `702.15.a.1` — the Awaken remedy gives back the **ready** and withholds the **trigger**

> **702.15.** *Forgetting to Ready During the Awaken Phase [No Penalty]:* A player forgets to ready one or
> more game objects during their Awaken Phase.
>
> **702.15.a.1.** If it is still the turn the erroring player forgot to awaken, ready all game objects
> that should have been readied. **If a game object being readied this way would put a trigger on the
> chain, it is not put on the chain instead.**
>
> **702.15.a.2.** If it is no longer the turn the erroring player forgot to awaken, leave game objects in
> their current state and proceed with play.

This lands on a named entry. `awaken-ready-body-triple-trigger` is built on `315.1.b` readying everything
at Awaken and on the pool's **exactly three** become-ready payoffs — `OGN-143 Pirate's Haven`,
`VEN-071 Fretful Feline`, `VEN-088 Jayce, Hammer in Hand` — which `CLAUDE.md` records as *"a free engine:
the game readies for you and nobody was collecting."* `702.15.a.1` is the one circumstance in which the
engine pays **nothing**: forget the Awaken, fix it later the same turn, and you get every unit back ready
while all three triggers are withheld by name. Miss the turn entirely and `702.15.a.2` leaves the objects
exhausted, so the engine is simply skipped.

It is also a third, procedural member of a distinction this project has built twice from the rules:
*entering ready is not a ready* (`805.6`/`805.6.a` with `415.1`), and now *a remedial ready is not a
trigger-bearing ready*. Three different mechanisms, one payoff family, all of which fail to fire it.

`702.15.b` and `702.4.b` add the anti-abuse clause in both places — *"If forgetting to ready was
advantageous to the erroring player, this penalty is a [Warning] instead"*, and for draws Riot names the
case outright: *"(example: the player is near burning out)"*. **That example is this catalogue's own
loop shell.** Every INFINITE here runs with the Main Deck empty by construction, where `431.1.a` makes an
extra draw a Burn Out; `lady-luminosity-loop-comet` step 4 says in its own words that *"the deck is at 4,
so the mandatory draw is safe."* A loop player who omits a mandatory draw in that state is in exactly the
situation `702.4.b` upgrades to a Warning — so the loop ledgers' draw counts are not merely arithmetic,
they are the thing a judge would check.

### 41.3 The rest of the `700`s, read and returned empty with its scope

`701` (philosophy, penalty definitions, rewinding, investigations), `702.5`–`702.14`, `702.16`–`702.17`,
`703.2`–`703.10` and `704` are **procedure with no game content for this catalogue** — looking at extra
cards, mulligan errors, marked cards, slow play, outside assistance, unsporting conduct. Recorded so the
block is not read a third time.

Two rows worth knowing the existence of without being findings: **`703.3` Decklist Error is a [Game
Loss]**, which is the stake of what `checkBuild` validates and an argument for its strictness; and
`703.3.a.3` — already cited by two entries as *"Tournament Rules 703.3.a.3"* — is the 3-copy rule living
in this block, which is why the labelled-citation discipline of `§38.7` matters.

### 41.4 HANDOFF — rc-walk-blocks after batch 30

**Staged:** nothing, four batches running. `/tmp/rc-walks/rc-walk-rules.json` is `[]`.

**My batch-29 prediction is recorded as falsified.** The correct generalisation is narrower and worth
carrying: **a penalty guideline has no game content except where it specifies a REMEDY**, because a remedy
has to say what the game state becomes — and that is where `702.3.a` and `702.15.a.1` came from. Anyone
mining a procedural document should read the remedies and skip the definitions.

**The Tournament Rules vein is now essentially spent for this lane.** Read: `402`–`403`, `502`–`506`,
`600`–`602`, `700`–`704`, plus the card-name sweep. Unread and expected empty: `404`–`424` (match
procedure, proxies, shuffling, sleeves), `507`–`509`, `602.3`. **Four upgrades are outstanding and none
is applied** (this lane does not own `data/combos.json`), ranked:

1. **`601.2.a`** as the source for name-folding — `CLAUDE.md`, not an entry (`§40.1`).
2. **`702.3.a`** as independent corroboration of `R2`'s premise — issue `#11` and/or `CLAUDE.md`'s `R2`
   paragraph, which currently says no Riot source exists (`§41.1`).
3. **`503.9.b` · `503.9.c` · `503.9.d`** for `bullet-time-seals-scaling-sweep` (`§39.1`).
4. **`505.2` · `505.9`** for the 14 INFINITEs (`§38.5`).

**Recommendation to the manager:** this lane should be redirected rather than kept on thin material. The
Core Rules range `649`–`829` is closed, and the Tournament Rules have given four upgrades and no entries
across four batches — which is the correct yield for a procedural document, and a reason to stop.

## 42. Batch 31 — the two card leads, and **the premise of one of them is refuted by measurement**

Redirected here by `rc-manager5` after the Tournament Rules were declared spent. Both leads come from
`§58` of `docs/phase0/walks/2026-09-09-uncited-rules-300-499.md`. **Neither yields an entry**, and in one
case the reason is that the lead's stated justification is false. Six card passages verified verbatim
against `data/corpus_flat.txt` (`.scratch-rules/qcheck31.mjs`, 6/6); card text is checked against the
corpus and rules text against the rules, never the other way round.

### 42.1 `VEN-131 Decree of Unity` — REFUSED, and the lead's premise does not survive a count

> `VEN-131 | Decree of Unity | Spell | Order | E2 P1 | Kill an enemy Chaos (:rb_rune_chaos:) unit or gear.`

The lead reads: *"Twelve BURST and CHAIN entries stand on attached Equipment; this answers the Chaos ones
for 2 Energy and 1 Order Power."* **Measured over the whole catalogue, that is wrong.**

The pool prints **six** Chaos Equipment — `SFD-124 Doran's Ring`, `SFD-133 Boots of Swiftness`,
`SFD-134 Cull`, `SFD-139 Edge of Night`, `SFD-150 Last Rites`, `SFD-186 Spinning Axe` (the last
Fury/Chaos). Checked against all **61** `BURST` / `CHAIN` / `ALT_WIN` entries: **ZERO of them use any of
the six.** All 25 entries that use a Chaos Equipment are `ENGINE`, fifteen of them on `SFD-150 Last Rites`.

So `VEN-131` is not the card that answers the Chaos Equipment finishers — **it is the one gear-removal
printing in the pool that answers none of them**, because the finisher family and the Chaos Equipment
family do not intersect at all. That is worth more than the lead was: it says the twelve Equipment
finishers are answered by the *other* fifteen printings and never by this one.

**And in both of its own roles it is dominated by a card already catalogued in its own domain:**

| role | `VEN-131` | the incumbent | verdict |
|---|---|---|---|
| kill an enemy **gear** | Order, E2 + 1 Power, no keyword, gated on Chaos | `OGN-224 Salvage` — Order, **E2 + 1 Power**, *"[Action] … You may kill up to one gear. Draw 1."* | Salvage is the same domain at the same cost with `[Action]` (so `806.1.b` reaches an opened Combat), *"up to"* so it is never a dead card, and a cantrip. Already catalogued as `salvage-zaun-punk-gear-kill-reaches-attached-equipment` |
| kill an enemy **unit at a base** | gated on Chaos | `OGN-229 Vengeance` — Order, E4 + 2 Power, *"Kill a unit."*, ungated and no location clause | Already catalogued in the exact line, `mageseeker-warden-vengeance-base-kill`, behind `OGN-070`'s *"While I'm at a battlefield, opponents can only play units to their base"* |

**Scope of the refusal, stated so it can be reopened.** `VEN-131` is genuinely **half the cost of
Vengeance** (E2 + 1 against E4 + 2) and is the pool's **only single-instruction kill that reads
*"unit or gear"*** — which `CLAUDE.md`'s removal census already records as the reason a unit-only
predicate cannot see it. It becomes a real card the moment an opponent is Chaos. But **a domain-gated
answer is a sideboard card, not a combo line**: a `combos.json` entry is matched against *your* decklist
and this one's value is a fact about *theirs*, which is the same reasoning that keeps positions, win rates
and the `601.2.d.2` precon carve-out out of this project. If a future lane wants it, the honest home is a
`notable` on the two incumbent entries naming it as the cheap Chaos-only alternative — not a row.

### 42.2 `SFD-096 Laurent Bladekeeper` — the measurement CONFIRMS the fact and refutes the framing

> `SFD-096 | Laurent Bladekeeper | Unit | Body | E3 M3 | Ganking (I can move from battlefield to battlefield.)`

That is his **entire** card. Re-measured over `data/cards.json`, the Body Ganking population and its cost
curve, which the lead gave without members:

| | |
|---|---|
| **E3, no Power** | `SFD-096 Laurent Bladekeeper` (M3) — **alone** |
| E3 + 1 Power | `UNL-115 Nilah, Joyful Ascetic` (M4, `[Accelerate]`, *"When I move, gain 1 XP"*), `VEN-070 Brutal Hunter` (M4, Ganks only while Empowered) |
| E4+ | `UNL-108`, `UNL-113`, `VEN-088`, `VEN-092`/`VEN-177`, `OGN-162`, `OGN-125`, `OGN-157`, `OGS-009` |

**The lead's "eleven in Body" and my twelve are both right, at different units** — twelve base codes,
eleven names, because `Renekton, Brute` prints twice (`VEN-092`, `VEN-177`). This project's own standing
rule applies to its own leads: *state the unit with the number.*

So the deckbuilding fact is **confirmed**: Laurent is the cheapest Body Ganking body and the only one with
no Power cost and no condition. **But it is not an entry, and the lane that found it said so** — `§58`
classified it a **SYNERGY LEAD**, *"a deckbuilding fact rather than a line … anchor for a rule wanting a
Body battlefield-to-battlefield mover."* That classification survives the measurement and the reframing as
an entry lead does not, for a reason visible on the card: **Laurent has no payoff text at all.** He is an
enabler, and an enabler with no text can only ever be the cheap slot in someone else's line.

The space he would enter is also saturated: **30 Body-legal entries already turn on Ganking**, including
`nilah-targonian-visionary-move-xp-ladder`, which runs the E3 + 1 Power body he undercuts. Swapping Nilah
for Laurent saves exactly **1 Power** and loses *"When I move, gain 1 XP"* and `[Accelerate]` — which is a
**substitution note on an existing entry**, and `CLAUDE.md` is explicit that a lead which would change the
card slot of an existing line *"goes in `notable`, never in `uses`."*

**Disposition: not an entry from this lane.** It is either (a) an anchor for `synergies.json` — which this
lane does not own, and `rc-syn16` has that file open — or (b) a `notable` on the Ganking entries. Routed to
the manager rather than written unilaterally, which is the same call `§58` made.

### 42.3 HANDOFF — rc-walk-blocks after batch 31

**Staged:** nothing, five batches running. `/tmp/rc-walks/rc-walk-rules.json` is `[]`.

**Both routed card leads are now dispositioned and must not be re-walked.** `§58`'s other five
dispositions stand untouched and were not re-examined, per the manager's instruction not to re-refuse them.

**What this lane has produced across batches 27–31:** five citation upgrades (four applied by the manager,
one — `702.3.a` for `R2` — outstanding as of this writing), three measured-empty veins closed with their
scope (Core Rules `649`–`829`, the Tournament Rules card-name sweep, the `700`s definitions), one integrity
check that found nothing wrong (no citation points into the `490`–`648` void), one confirmed-with-a-source
project claim (`VEN-SP1`–`SP6`), and **zero entries**.

**That last number is the honest signal.** This lane has been mining *documents* for four batches while the
catalogue's remaining value is in *card sets*, and the two card leads it was handed both dissolve on
measurement. **My recommendation stands and strengthens: redirect or retire this lane.** The material it
was created for — uncited Core Rules sub-rules in `649`–`829` — is gone, and neither the Tournament Rules
nor `§58`'s leftovers replace it.
