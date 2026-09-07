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
