# Walk — the Core Rules blocks this catalogue has never cited

Issue #187. Session `rc-walk-blocks`, 2026-09-07. Rules version 2026-07-16.

## 1. The slice and why it exists

My predecessor (issue #170, §46 of `2026-09-07-rules-second-pass.md`) closed the rules-named-card vein
with three cards left in it and measured the vein that replaces it: **207 of the Core Rules' 385
top-level rule numbers are cited by nothing in `data/combos.json` + `data/synergies.json`.** Most are
structural headings. The mechanics range is not, and every large finding of 2026-09-07 came from
exactly there — 718.2 broke a shipped entry, 817.2.b inverted the [Vision] family, 137.3.a made a
Might Bonus permanent, 356.1.b.3 made a free play still buy its rider, 417.6.b.4 handed half of every
mutual-damage exchange to the opponent.

**The probe, corrected.** The obvious form of it under-reports. A regex of `\b(\d{3})\.\d` misses every
block this project cites by its bare number (455, 443, 451–454, 457, 473–475, 478, 701 are all quoted
without a sub-number somewhere), and a regex of `\b(\d{3})\b` over-reports, because any three-digit
quantity in an entry's prose matches. The honest probe collects `\d{3}\.[0-9a-z.]*` — i.e. only
citations that carry a sub-rule — and that is what the "cited / uncited" verdicts below rest on:

```
grep -o "43[23]\.[0-9a-z.]*\|476\.[0-9a-z.]*" data/combos.json data/synergies.json | sort | uniq -c
```

returns `52 476.1` and `2 476.1` and nothing else — so **432, 433, 476.2 and 476.3 are cited nowhere.**

## 2. Batch 1 — four entries

| id | block opened | class |
|---|---|---|
| `blade-ruined-king-detach-recovery` | **719.5 / 457.1 / 718.1** (454/457 Recalls, 716–722 Attachment) | ENGINE |
| `switcheroo-pouty-poro-tryndamere-excess-swing` | **433 Swap** | ENGINE |
| `overt-operation-fiora-victorious-rebuff-recross` | **476.2 / 476.3** (473–478 Layers) | ENGINE |
| `garen-cleave-dominus-double-assault` | **432 Double** | ENGINE |

Staged to `/tmp/rc-walks/rc-walk-rules.json`. `validateCombos(combos, features, cards)` over the merged
copy: **0 errors, 587 entries.** Both checks of `test/legend-lines.test.ts` re-run over my four entries
alone: 19 legend base codes checked, **0 defects**. No duplicate id and no duplicate sorted `uses[].card`
set against the 583 already merged.

### 2.1 `blade-ruined-king-detach-recovery` — [Equip] is payable once per ATTACHMENT

Three paragraphs, none of them cited by any entry before, compose into a chain:

- **719.5** — *"When a Top-Most Card changes zones from a board zone to a non-board zone, all Attached
  cards Detach from it, remaining in their current zones."* The carrier goes to the trash; the
  Equipment does **not** go with it. It stays on the board, at that battlefield.
- **457.1** — *"When an un-attached non-Unit Gear is created or played at a battlefield, or is at a
  battlefield for any other reason, it is Recalled to its controller's base during the next Cleanup."*
  Its worked example is this exact case by name: *"An Equipment is attached to a unit at a battlefield
  … If the unit dies, the Equipment will be recalled during the next cleanup."*
- **718.1** — *"A card remains in this state until Detached."* So 718.2's suppression of the printed
  Rules Text ends at the Detach, and 721.2 no longer applies: the [Equip] is Active again.

**This refines a line written into `CLAUDE.md` earlier the same day** and is reported to the manager in
§4.1. `SFD-178 Blade of the Ruined King` carries the pool's largest printed Might Bonus (+4) and its
[Equip] cost is *"one Order rune, Kill a friendly unit"*; `SFD-168 Vanguard Armory` mints three Recruit
tokens a turn, which 185.2.d makes legal payment for that kill, so the Blade re-homes for one rune and
one token however often its carrier dies. A 1-Might Recruit carrying it is Might 5 and therefore
[Mighty] (718.4, 477.3.d, 709) — the cheapest Mighty body in Order.

### 2.2 `switcheroo-pouty-poro-tryndamere-excess-swing` — rule 433 and a trap Riot printed

`SFD-145 Switcheroo` was in **zero combo entries** and rule 433 is cited nowhere.

- **433.1.b** — *"determine the difference between these values and then apply an Increase for that
  amount to the lower value of the two attributes, and a Decrease of that amount to the higher value
  of the two attributes."* So a swap is a **2D swing**, D up on you and D down on them, from one card.
- **433.1.c** — *"If both attributes are the same numeric value, Swapping has no effect."* Tryndamere
  is Might 8 and the defenders worth attacking are often Might 8: swapping **him** is a dead card.
  That is why `OGN-013 Pouty Poro` is a `uses[]` row at quantity 1 and not a phrase in a notable.
- **433.1.a** makes it a **snapshot**: the +D and −D are fixed at the instant of the swap and then ride
  as ordinary modifiers for the stated duration, so a later pump on either body does not re-swap.

Arithmetic: Tryndamere 8 + Poro 2 into a Might-8 defender is 2 excess (below his threshold of 5);
after the swap it is 8 + 8 into a Might-2 defender, i.e. **14 excess**. One card is the whole
difference. The free [Hidden] mode is defence-only — 811.1.b hides at *a battlefield you control* and
811.1.d.2 pins the targets there.

**Correction to `CLAUDE.md`:** the #119 line says *"Swap (433) has one real user, Switcheroo, already in
eight entries."* The eight are **synergy-rule instances**, not entries; measured over `data/combos.json`
on 2026-09-07 the count of entries using `SFD-145` was **zero**.

### 2.3 `overt-operation-fiora-victorious-rebuff-recross` — the layers recur, and Riot's example is this card

**476.3 carries two worked examples and both name `OGN-232 Fiora, Victorious`.** The second one is the
load-bearing half:

> A buffed Fiora, Victorious is in combat as a defender when her buff is removed. Reevaluating the
> layers in sequence, she no longer gains Deflect, Ganking, and Shield during the Ability-Altering
> Effect layer, so when the Arithmetic layer is evaluated, neither the buff (which is gone) nor Shield
> (which she no longer has) apply. She goes directly from 6 Might with three keywords to 4 Might with
> no keywords.

And **476.2** is why the keywords ever come on: the buff is arithmetic (477.3) and the keywords are
ability-altering (477.2), so one pass would place the buff after the layer that reads it. *"When a
sequence of applications completes, recur the process, and evaluate each layer again applying any
effects that may now be applicable."*

The consequence for the catalogue: **a buff crosses the Mighty line once per PLACEMENT, not once per
game.** `OGN-153 Overt Operation` spends every buff (readying the body) and then re-places it, in that
order, in one resolution — a genuine second 709 crossing, and the ready lands in the Main Phase (316),
which is the kind that pays. Reported in §4.2 as a refinement to a shipped entry.

### 2.4 `garen-cleave-dominus-double-assault` — Double reads CURRENT Might

**432.1** — *"Doubling is the act of increasing a numeric attribute by an amount equal to that
attribute's current value."* CURRENT. **432.1.a**'s worked example spells out both halves:

> A unit with 3 base Might and Shield 2 is in combat as a Defender. Since Shield applies, its current
> Might is 5. A player chooses it as the target for Last Stand … Its current Might is 5, so it gets +5
> Might this turn, for a current Might of 10. After combat, Shield no longer applies, but the +5 Might
> from Last Stand does, so the unit's Might is 8.

So a doubler is worth **the whole conditional bonus more when played after the designation than
before it**, and the increase **outlives** the designation for the stated duration. `OGS-007 Garen,
Rugged` is the pool's clearest carrier of both conditional keywords ([Assault 2], [Shield 2]);
`OGN-004 Cleave` takes him to Assault 5 (807.2 sums); `VEN-142 Dominus` played in the Main Phase gives
+5 and played inside the opened combat gives **+10**. Same two cards, five more Might, for the order
alone. Garen's [Shield 2] is worth zero here (814.1.c: *"While I am a defender"*), which is the point —
the two halves of his text are mutually exclusive by designation and Cleave buys the half you can use.

`VEN-142 Dominus` is a **Signature card tagged Renekton**, so 103.2.d.2 makes the legend field one
name: `VEN-141 / VEN-190 Butcher of the Sands` (Fury/Body), the pool's only Renekton legend.

## 3. Results — blocks read and found empty

A block with no card behind it is a result, recorded so nobody reads it twice.

### 3.1 443 Skip — one card, and the rules anticipate a card the pool does not print

Read in full. `grep -i skip data/corpus_flat.txt` returns **exactly one row**: `VEN-022 Endless Riches`
(Fury, E5 P1), *"… Skip your Draw Phase …"*. Two findings, neither worth an entry:

- **443.2.a** — *"Anything that triggers on the occurrence of the event or procedure of the turn does
  not trigger."* Measured: `grep -inE "draw phase|draw step"` over the corpus returns **only VEN-022
  itself**, so no card in the pool watches the Draw Phase and the skip costs Endless Riches nothing
  beyond the card it does not draw. It is already carried by `endless-riches-blade-twirler-trash-as-hand`.
- **443.1.a's third worked example** is *"Choose a player. They skip their next point from conquering
  this turn."* — a **replacement effect on POINTS**. The pool prints no such card. That is the cleanest
  confirmation of the #100 denial-lens verdict from the other side: the rules were written expecting
  point denial to exist, and it does not exist yet in this pool.

### 3.2 418 Heal — every damage clear is a Heal, and nothing in the pool watches

**418.1.a** — *"If Damage is cleared for any reason it is considered Healing."* So 143.3.b's two
automatic clears (end of each player's turn, Combat Cleanup) and 466.1.a.1's *"Insert '3c. Heal all
Units.'"* are all Healing events. Measured: `grep -inE "when (you|I|a|another).{0,40}heal|is healed"`
over the corpus returns **one row**, `SFD-053 Janna, Savior`, and that is Janna *performing* a heal,
not watching one. **No card in the pool triggers on healing**, so 418 yields nothing on its own.

One thing it does explain, cheaply. Every save card in the pool says *"heal it, exhaust it, and recall
it"* and the **"heal" is load-bearing**, because **458.1** — *"Unless otherwise stated by the source of
the Recall, Damage and statuses of a permanent will all remain unaffected by a Recall"* — means the
recall alone would send the body home still carrying its marked damage. The word is not decoration.

### 3.3 451 / 452 / 453 — the headings of a split this project derived elsewhere

**451** *"Units may cause a Non-Combat Showdown when they Move."* **452** *"Units may cause Combat when
they Move."* **453** *"When a Move action is complete, perform a Cleanup."* These are one-line headings
whose bodies are cross-references to 341 Showdowns and 459 Combat. They are the **source headings** for
the 344.2-versus-323.9 split the #159 Azir refusal established from the far end, and they add no
mechanic that split does not already carry. 453 is already cited by the catalogue. No entry.

## 4. Report to the manager — CLAUDE.md-grade

### 4.1 `[Equip]` is a one-way door out of the ATTACHMENT, not out of the game

The line added on 2026-09-07 reads: *"So [Equip] is payable ONCE, on the way in, and the only legal
relocations are ATTACH effects."* The first half needs one word changed. **718.1: *"A card remains in
this state until Detached."*** So 718.2 (printed Rules Text Inactive) and 721.2 (Inactive abilities
*"cannot be activated"*) bind an **attached** Equipment only. **719.5** detaches every attached card
when the Top-Most Card leaves the board, *"remaining in their current zones"* — the board — and
**457.1** then recalls the un-attached gear to its controller's base at the next Cleanup, with Riot's
own worked example naming a dying carrier. So an Equipment whose carrier dies **comes home and its
[Equip] is payable again**.

The removal of `prize-of-progress-hexplate-equip-shuttle` still stands on its own ground: that line
wanted repeated activations *within a turn* on a card that stayed attached, which 718.2 does forbid.
What changes is the general claim about Equipment BURSTs — losing the carrier costs one [Equip] cost,
not the card, and that applies to every Equipment in the pool since 719.5 and 457.1 name none.
**719.5.a** is the companion: the controller of the departing Top-Most Card chooses the **order** of the
detaches, *"and thus the order of any relevant effects that occur due to the Detach occurring."*

### 4.2 A buff crosses the Mighty line once per PLACEMENT, not once per game

`grand-duelist-fiora-victorious-off-turn-crossing`'s notable says *"a buffed Might-4 body crosses ONCE,
ever."* True of a buff that stays. **702.2.b** removes the counter and **702.3.a** only blocks a buff on
a unit that already has one, so a spender re-arms the crossing — and **476.3's second worked example**
(quoted in §2.3) is the proof that the body genuinely falls back below the line, keywords and all,
rather than lingering. The correct sentence is *once per placement*, and the pool's buff-spenders are
what re-arm it.

### 4.3 Rule 432: Double reads CURRENT Might, and the increase outlives the condition that raised it

Six cards in the pool double a Might and four already carry entries, and **not one of them cites 432**.
Two consequences worth carrying: a doubler played **after** the Attacker or Defender designation is
worth the entire [Assault] or [Shield] value more than the same card played before it (432.1); and the
resulting modifier persists for its stated duration after the designation lapses (432.1.a, whose
worked example ends *"After combat, Shield no longer applies, but the +5 Might from Last Stand does"*).

### 4.4 Rule 433: a Swap is a 2D swing, a snapshot, and a dead card on equal values

433.1.b makes it +D / −D from the difference; 433.1.a makes those two fixed modifiers for the stated
duration rather than a live mirror; **433.1.c makes it do nothing at all when the two values are
equal** — a printed trap for exactly the case a player reaches for it (an 8-Might attacker against an
8-Might defender). And the #119 line *"Switcheroo, already in eight entries"* is about synergy-rule
instances: as of 2026-09-07 it was in **zero** combo entries.

### 4.5 Two measurement notes for the next session

- **The uncited-blocks probe must require a sub-rule.** `\d{3}\.[0-9a-z.]*` is right; a bare `\d{3}`
  matches quantities in prose and reports 432, 443, 451–455 and 701 as "cited" when they are not.
- **`/tmp/rc-walks/` is shared and `noclobber` is on in this shell.** `cat > /tmp/rc-walks/_b2.json`
  silently failed and a later `node` merge folded **another session's five entries** into my staging
  file. Caught before reporting. Use `set +o noclobber` and a session-prefixed temp name
  (`_rblocks1.json`), and re-read the staging file's id list after every write.

## 5. Rule numbers this walk cited that no entry had cited before

432.1, 432.1.a, 433.1, 433.1.a, 433.1.b, 433.1.c, 443.1, 443.1.a, 443.2.a, 418.1, 418.1.a, 451, 452,
457.1, 476.2, 476.3, 718.1, 718.4, 719.5, 719.5.a.

---

# Batch 2 — the damage-assignment sub-block and the Ignoring Effects block

Batch 1's four entries were merged by the manager (catalogue at 600). Staging pruned to this batch.

| id | block opened | class |
|---|---|---|
| `caitlyn-taric-backline-last-assignment` | **465.2.c.6–c.10** (damage assignment order) | ENGINE |
| `dune-surfer-ignore-tank-one-way` | **764–767 Ignoring Effects** | ENGINE |

`validateCombos` over the merged copy: **0 errors, 602 entries.** `test/legend-lines.test.ts` re-run over
these two: 16 legend base codes checked, **0 defects.** No duplicate id, no duplicate card set.

## 6. The corrected probe, run over the whole file

Requiring a sub-rule (`\d{3}\.[0-9a-z]`) and diffing against every `^\d{3}\. ` heading:
**385 top-level headings, 234 uncited.** Most of the misses below 300 are structural (Setup, Game
Objects, Privacy). The mechanics range is not, and this batch came from two blocks in it.

## 7. `caitlyn-taric-backline-last-assignment` — 465.2.c.6 prints the whole assignment order

The catalogue cites 465.2.c.2 through 465.2.c.5 in **210 places** and **none** of 465.2.c.6 through
465.2.c.10. What is in them:

- **465.2.c.6** — *"A player must obey all requirements and restrictions on damage assignment if
  able"*, with the full order as its worked example: *"That player must assign combat damage first to
  the unit with Tank, then to the unit with no abilities, then to the unit with Backline."*
- **465.2.c.7** — units of equal priority may be assigned in any order.
- **465.2.c.8** — *"If a Unit has one or more Abilities or effects applying to it that demand it be
  assigned damage in a specific way that is exclusionary, then the assigning player chooses only one
  of those abilities to apply."* Its worked example is **Caitlyn, Patrolling given [Tank]**: the
  **attacker** chooses whether to honour Tank or Backline. So `OGN-057 Block` and `SFD-033 Doran's
  Shield` are **anti-synergic** with every Backline body in the pool.
- **465.2.c.10** — *"If a unit cannot be dealt damage, then no amount of damage can be considered
  lethal. Such a unit is exempt from any considerations of mandatory assignment."* A Tank under a
  full Prevent (437.4) stops being a mandatory assignment at all.

**And the pool has FIVE [Backline] cards, not four.** `OGN-068 Caitlyn, Patrolling` prints the
reminder sentence *"I must be assigned combat damage last."* **bracket-less**, where `UNL-043`,
`UNL-090`, `UNL-141` and `UNL-145` print `[Backline]`. A sweep written `grep '\[Backline\]'` returns
four and misses her — the same shape as `SFD-138 Windsinger` printing `Hidden` without brackets. She
is also the card the Core Rules name, twice, at 465.2.c.8 and 465.2.c.9.

[Backline] is the **self-protecting mirror of [Tank]**: 815.1.c.2 makes a Tank pay a toll on behalf of
the rest of the garrison, while Backline makes its own body the last thing that can legally be
assigned damage. That is what makes a repeatable exhaust ability worth putting on one.

## 8. `dune-surfer-ignore-tank-one-way` — 767 makes every "ignore" card one-way and scoped

`VEN-004 Dune Surfer` (*"You ignore [Tank] while assigning combat damage here."*) was in **zero
entries**, and 764–767 is cited by nothing. Riot's worked examples at **766** and **767** are that
exact sentence with `Backline` in place of `Tank`.

- **766** scopes the ignore to the named game action: the keyword is *"treated as inactive for the
  purposes of the game action or procedure."*
- **767** — *"Ignored abilities are only treated as inactive for the specific game action or procedure
  described, and only by the players directed by the ability"* — with *"Any other player assigning
  combat damage at the same location as that unit will not be able to ignore Backline."*

So the Surfer is **a key, not a dispel**: the same board stops walling you and keeps walling them.
That generalises to `VEN-061 Decree of Insight` and `VEN-158 Heisho, Shell of the World`, whose
scoping `CLAUDE.md` currently derives from the cards' own wording rather than from 767.

## 9. Lead not yet built — 386–388 Reflexive Triggers, and it touches eight catalogued cards

**387.1: *"Reflexive Triggers can be recognized by the phrase 'Do this:' or 'Do one of the following:'."***
Eight cards in the pool print *"Then do this:"* — `OGN-258 Dragon's Rage`, `SFD-024 Rell, Magnetic`,
`SFD-154 Guards!`, `SFD-198 Arise!`, `UNL-081 Keeper of Masks`, `UNL-139 Bone Skewer`,
`UNL-199 Deceiver`, `UNL-200 Mirror Image` — and several are heavily catalogued. Rule 386–388 is
cited by nothing.

**388.1: *"A new ability is created and added to the chain as a Pending Item."*** So the second half is
a **separate Chain Item**, not part of the first half's resolution. Following the chain rules from
there: 336.1 puts it through the same FEPR process; **337.1** finalizes it (which is where its targets
and any base cost under 204.3.a are locked in); **337.4** — *"If, after finalizing the Chain Item,
there are no more items on the chain to be Finalized, the controller of the next item on the chain
gains Priority. Move to step 2: Execute"* — and 338.1.a then admits a legally timed [Reaction].

**So there is a full priority window between the two halves of every "Then do this:" card, and both
players get it.** Two consequences worth walking next batch, stated here so they are not lost:

- `UNL-081 Keeper of Masks` / `UNL-199 Deceiver` / `UNL-200 Mirror Image`: the Reflection tokens exist
  on the board, and the source unit is still killable, in a window **before** *"They become copies"*
  resolves. A response that removes the copy source leaves 055 to ignore the instruction.
- `SFD-154 Guards!`: its reflexive half is *"You may pay one Order rune to ready it"*, which 204.3.a /
  383.3.b make a **base cost paid at finalization** of the reflexive item — so the rune must already
  be banked when the window opens, and 415.3.a means runes tapped on your own turn are dead on the
  opponent's, which is exactly when this [Hidden] card is played for 0.

**387.1.a is dead letter in this pool**: *"'Do this' can be followed by 'N times.'"* — no card prints
it (all eight rows are a bare *"Then do this:"*).

## 10. Results — two more blocks read and found empty

### 10.1 478 / 479 Dependency — the worked examples describe a card the pool does not print

478.1 establishes a Dependency when applying one same-layer effect *"alters the outcome when applying
the other"*, and 479.2 then forces the depended-on effect first. Every worked example in 478–479 is
built on a passive reading *"Units you control here have their Might increased to 5 [M]"* — an
**arithmetic** raise-to-a-floor. Measured over the corpus, no card in the pool prints that shape:
`VEN-116 Dragon Form` says *"Its base Might becomes 5 this turn"*, which is **assignment** and lands
in a different layer (477.1.a.1). The pool's other same-layer Might effects are fixed modifiers whose
amounts are baked in when the action is performed — 432.1.a for a Double, 433.1.a for a Swap — so no
dependency arises from them either. **No entry.** Worth re-reading if a future set prints a
"Might increased to N" passive, because 479.2 would then make the floor **anti-synergic** with a pump:
Riot's own numbers are 4 + 1 + 2 = 7 under the naive order and 4 + 2 + 0 = **6** under the forced one.

### 10.2 741–749 Counters — the general home of Buffs, and it changes nothing the catalogue says

702 makes a Buff a counter, so this block governs it. Read in full: **745.2** (*"the spending player
must control the Game Object the Counter is placed on"*) is the general form of 702.2.b.2, which the
project already carries; **748** (*"Game Objects that change zones to a non-board zone lose all of
their Counters"*) is the rule behind `OGN-228 Vanguard Helm` being the pool's only buff-recovery card,
which the project already carries from 702.3; **747** and **749** have no card behind them; and
**746** (moving a counter between two Game Objects) has no card in the pool that does it. **No entry**,
but 745.2 and 748 are the correct citations for two claims currently sourced to 702.x.

---

# Batch 3 — Reflexive Triggers, and Making New Choices

Batch 2's two entries were merged (catalogue at 617). Staging pruned to this batch.

| id | block opened | class |
|---|---|---|
| `dragons-rage-discipline-reflexive-double-kill` | **386–388 Reflexive Triggers** | ENGINE |
| `mystic-reversal-charm-free-reaim` | **750–755 Making New Choices** | ENGINE |

`validateCombos` over the merged copy: **0 errors, 619 entries.** `test/legend-lines.test.ts` re-run over
these two: 7 legend base codes checked, **0 defects.** No duplicate id, no duplicate card set.

## 11. 386–388 — "Then do this:" is two chain items with a priority window between them

**387.1: *"Reflexive Triggers can be recognized by the phrase 'Do this:' or 'Do one of the following:'."***
**388.1: *"A new ability is created and added to the chain as a Pending Item."***

Eight cards in the pool print *"Then do this:"* and rules 386–388 were cited by nothing:

| card | domain | the two halves |
|---|---|---|
| `OGN-258 Dragon's Rage` | Calm/Body (Signature, Lee Sin) | move an enemy unit \| pair it with another and they kill each other |
| `SFD-024 Rell, Magnetic` | Fury | play a free Equipment \| attach it to me |
| `SFD-154 Guards!` | Order | play a Sand Soldier \| pay a rune to ready it |
| `SFD-198 Arise!` | Calm/Order | play N Sand Soldiers \| ready up to two |
| `UNL-081 Keeper of Masks` | Mind | play two Reflections \| they become copies of me |
| `UNL-139 Bone Skewer` | Chaos | they play a unit from hand \| stun it |
| `UNL-199 Deceiver` | Mind/Order | play a Reflection there \| it copies another unit there |
| `UNL-200 Mirror Image` | Mind/Order | play a Reflection to your base \| it copies the chosen unit |

Following the chain rules from 388.1: **336.1** puts the new item through the same FEPR process;
**337.1** finalizes it, which is where its targets and any 204.3.a base cost lock in; and **337.4** —
*"If, after finalizing the Chain Item, there are no more items on the chain to be Finalized, the
controller of the next item on the chain gains Priority. Move to step 2: Execute"* — with **338.1.a**
admitting a legally timed [Reaction] there.

**So both players get a full priority window between the two halves of all eight cards.** The
constructive half is the entry: `OGN-258 Dragon's Rage` (in zero entries) chooses its second victim
when the reflexive item finalizes, i.e. after the move has resolved, and the pump that equalises the
two Mights goes in the window — after the pair is locked in and cannot be un-chosen. `OGN-058
Discipline` says *"a unit"*, not *"a friendly unit"*, so it legally pumps an enemy body.

**387.1.a is dead letter in this pool.** *"'Do this' can be followed by 'N times.' The Reflexive
Trigger will thus be added to the chain N times when its condition is met."* No card prints it — all
eight rows are a bare *"Then do this:"*. There is no reflexive multiplier to hunt for.

Two consequences for cards already in the catalogue, recorded but not walked here:

- The Reflection tokens of `UNL-081`, `UNL-199` and `UNL-200` are on the board, and the **copy source
  is still killable**, in the window before *"becomes a copy"* resolves.
- `SFD-154 Guards!`'s reflexive half is *"You may pay one Order rune to ready it"*, which 204.3.a /
  383.3.b make a **base cost paid at finalization** — so the rune must already be banked when the
  window opens, and 415.3.a means runes tapped on your own turn are dead on the opponent's, which is
  exactly when this [Hidden] card is played for 0.

## 12. 750–755 — a re-aim ignores every cost it incurs, and that is the opposite of the obvious reading

**755: *"Any costs 'to play' the spell or ability that are incurred as a result of new choices made in
this way are ignored."*** 755.1 gives the reason: *"The spell or ability is already played and its
costs paid."* So re-aiming a spell at a **[Deflect]** body costs nothing — 809.1.c prices Deflect as
an additional cost *to play*, charged per choice, and a new choice is not a play.

**753.1 is where a tax and a prohibition separate: *"A player may not make new choices this way that
would be illegal or that would lead to an illegal state, even if there are no other options."*** So
`SFD-105 Ruin Runner`'s *"can't be chosen by enemy spells and abilities"* (absolute under 054.1) still
holds. This is the third independent place the project's Deflect-tax-versus-prohibition split shows up,
and it is the cleanest: **755 erases the tax and leaves the prohibition standing.**

Two more paragraphs worth carrying:

- **752.1** — *"The relevant choices that can be remade for these Game Effects are locations to be
  played to, modes, destinations, and targets."* A closed list, and it includes **modes**.
- **752.2** — *"This does not refer to any choices made 'as you play this' or 'as I am played,' or any
  choices made for Optional Additional Costs."* So a **[Repeat] cost's choices and an [Empower]
  payment can never be remade**, nor any "as you play this" rider.
- **751.1** requires the new choice to be one *"previously not being chosen"* — something must change.
- **754** keeps a Targeting Effect on the new victim firing.

The pool has exactly **two** cards with the clause, swept on the corpus: `OGN-080 Mystic Reversal`
(Calm, E4 P3, unconditional, and in **zero entries**) and `VEN-152 Rebuttal` (Mind/Chaos, Signature,
tagged Mel, which charges a rainbow for the same clause).

## 13. Two more blocks read

### 13.1 194.2 / 472 — reaching the Victory Score is not enough, and the catalogue's shorthand drops the clause

**194.2: *"A player wins the game if, in a cleanup, they have points greater than or equal to the
Victory Score **and more points than any other player**."*** **472** restates it. And **194.2.b**,
cited by nothing: *"If those players have the same number of points, play continues until one player
has more."*

`CLAUDE.md` summarises this as *"194.2 (points ≥ Victory Score)"* and drops the second clause. It is
load-bearing for the finisher classes: **a BURST that takes you from 0 to exactly 8 against an
opponent already on 8 does not win** — play continues. Every BURST and CHAIN in the catalogue is
priced against the Victory Score alone. (195 is untouched by this: an ALT_WIN card instructs you to
win outright and never reads points, which is a second reason that class is the robust one.)

### 13.2 413 Draw and 440 Burn — the Burn Out is a step inside the action, not a failure of it

**413.4**: drawing past the deck is *"Draw as many as possible / Perform a Burn Out / Draw the
remaining cards needed to complete the Draw action."* **440.4**: *"If instructed to burn more cards
than they have in their main deck, they burn that many cards, burn out and then burn the rest."*

Read with 431.2.b, which recycles the whole trash into the Main Deck at a Burn Out, this refines the
project's *"a fifth draw is a point for the opponent"*: the draw **still completes**, out of a deck
refilled from your trash. The cost is exactly one point (194.1.d) plus the trash re-entering the deck
— which is what erases every trash payoff, and is already recorded. No entry; the citations 413.4 and
440.4 are the precise ones for a claim currently sourced to 431 alone.

---

# Batch 4 — Additional Turns, and the Check Legality step

Batch 3's two entries were merged (catalogue at 629). Staging pruned to this batch.

| id | block opened | class |
|---|---|---|
| `promising-future-time-warp-queue` | **734–738 Additional Turns** (+ **390.3.a** Delayed Replacements) | ENGINE |
| `here-to-help-warden-fizzle-still-played` | **358 Check Legality** | ENGINE |

`validateCombos` over the merged copy: **0 errors, 631 entries.** `test/legend-lines.test.ts` re-run over
these two: 11 legend base codes checked, **0 defects.** No duplicate id, no duplicate card set.

## 14. 734–738 — the queue rule behind a CHAIN theory that never cited it

`CLAUDE.md` prices every Additional-Turn CHAIN on "up to FOUR consecutive Beginning Phases" and cites
nothing for it. **738's first worked example is that case, exactly:** *"The First Player plays, through
some means, two Time Warps during their turn … these Additional Turns will appear as
`[> A > A* > A* > B > C > D >]`."* Two in one turn are two consecutive extra turns; three copies
(103.2.b) give four consecutive Beginning Phases. The assertion now has Riot's own arithmetic behind it.

**738's second worked example names `OGN-115 Promising Future` and `OGN-122 Time Warp` together** and
carries the rule that matters: each Additional Turn is inserted **immediately after the current turn**,
so the **last one created is taken first**. Riot works it out — the Fourth Player's Time Warp resolves
first and the queue is `[> A > D* > B > C > D >]`; the Second Player's resolves afterwards and the queue
is `[> A > B* > D* > B > C > D >]`.

In a Duel that inverts the obvious fear about Promising Future. Its *"Starting with the next player"*
has the **opponent** play their banished card first and **you** play yours second — so if you both
banish a Time Warp, **yours is inserted last and therefore taken first**. And **737** confirms nobody
loses a turn: *"it does not change the Turn Order of the game … the queue will proceed with its
previously queued turns."*

The line itself is a discount: Time Warp is E10 + 4 Mind Power, and through Promising Future it is
E5 + 1 Power for the spell plus Time Warp's 4 Power with its Energy ignored — **five Energy cheaper for
one extra Power**. It is not a tutor and the entry says so; and it is symmetric, which the entry prices
rather than hides.

**390.3.a is the companion, and it is the general rule the project has been sourcing to 829.1.b.1
alone**: *"Some Delayed Replacements take the form 'then recycle it,' or 'then banish it,' … short for
'if it would leave the chain after becoming a finalized chain item, and leaving the chain wasn't
instructed by its own execution, perform the specified game action instead.'"* Time Warp's *"Banish
this"* is one; so is [Flow]'s. 389–392 is cited by nothing.

## 15. 358 — a prohibition does not make a card illegal, it makes the instruction fizzle

**358.3.a**: *"If a Game Effect prevents the performance of a game action, that effect doesn't prevent
cards and abilities that instruct a player to perform that game action from being played or finalized.
On resolution, that game action will be skipped as it is an impossible instruction."* And its worked
example names two pool cards: *"A player plays Here to Help when their opponent controls a Mageseeker
Warden at a battlefield. Here to Help is legal to play under these circumstances. On resolution, no
unit will be played."* Rule 358 is cited by nothing.

This refines the #100 Mageseeker Warden theory. The Warden does not brick the card — the card is legal,
it is **finalized**, and only the instruction is skipped (055). **419.4.b** then cashes it: *"Non-triggered
abilities that check cards being played do so by means of referencing whether said cards have been
Finalized"*, and its own worked example is `SFD-012 Battering Ram` counting a **countered** spell.

**The split worth carrying:** a **trigger** needs the card to resolve (419.4.a, and 419.4.a.1 says a
countered card fires no play trigger at all); a **non-triggered check** — [Legion], "cards you've played
this turn", a cost reduction — needs only finalization. Since 811.1.b plays a hidden card *"ignoring its
base cost"*, a fizzled `SFD-111 Here to Help` is a **0-Energy card played this turn** even into the
pool's biggest denial card. And 811.1.c.1 (*"Hide is not a subset of Play"*) means the Warden never
stops the hide either.

## 16. Two more blocks read, one finding each

### 16.1 393–397 Linked Abilities — 397 makes "banished with this" exclusive, and Riot's example is a pool card

**395**: a set of abilities is Linked only if they are *"present in the printed Effect or Rules Text of
the same Game Object, or … granted by the same source."* **397**: *"A component Linked Ability that
references a Game Object affected by another Ability in the set may only interact with Game Objects
affected by the Abilities it is Linked with"*, with the worked example — **`SFD-090 The Zero Drive`**,
named in the rules — *"Any units banished by effects other than component Linked Abilities in the same
set as the activated ability cannot be played when resolving the activated ability."*

So the Zero Drive's *"Play all units banished with this"* **cannot be fed by any other banisher**, and
by 395 each copy is its own Game Object, so **three Zero Drives do not share a pool**. Same for
`UNL-148 Cursed Sarcophagus`, the pool's only other *"banished with this"* card. `SFD-090` is already
walked by `zero-drive-riptide-rex-banish-recursion` (issue #174), which cites 719.5 and 718.2 but not
393–397 — **that entry should carry 395 and 397**; no new entry here, the card set is taken.

### 16.2 324 Special Cleanups — a Combat Cleanup never repeats itself

**324.2**: *"If events during a Special Cleanup require another Cleanup, a normal Cleanup is invoked,
not another iteration of the Special Cleanup."* So the Combat Cleanup's added steps — 466.1.a.1's
*"Insert '3c. Heal all Units.'"* and 466.1.a.2's attacker recall — happen **once** per combat, however
many deaths that cleanup causes. The project's recall-family finding (#62) assumes exactly this and
never had the paragraph. No entry; 324.2 is the citation.
