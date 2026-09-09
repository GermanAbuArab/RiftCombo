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
