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

---

# Batch 5 — Passive Abilities outside the board, and 206's third worked example

Batch 4's two entries were merged (catalogue at 641). Staging pruned to this batch.

| id | block opened | class |
|---|---|---|
| `mirror-image-reflection-atakhan-printed-cost` | **206's third worked example** (printed *or copied* cost) | ENGINE |
| `void-drone-sarcophagus-zone-discount` | **363–366 Passive Abilities** (+ 393–397) | ENGINE |

`validateCombos` over the merged copy: **0 errors, 643 entries.** `test/legend-lines.test.ts` re-run over
these two: 6 legend base codes checked, **0 defects.** No duplicate id, no duplicate card set.

## 17. 206 says "printed **or copied**", and Riot works Atakhan + a Reflection to show it

The project cites 206 in dozens of places for one half of it — a cost gate reads the printed cost. The
**other word in the same sentence has never been used**: *"Effects that need to determine a card's cost
for any purpose always use its printed **or copied** cost."* And 206's **third** worked example is a
buildable line:

> Atakhan is a unit that reads in part "You may kill a friendly unit as an additional cost to play me.
> If you do, I cost [1] less for each Energy it costs and [Y] less for each Power it costs." If a player
> plays Atakhan and chooses to kill a Reflection token that is currently a copy of Noxus Hopeful,
> Atakhan will cost [4] less.

`UNL-T06 Reflection` is printed **Might 0** and R27 = A keeps it there, because Might is not copyable —
but **Cost is** (477.1.b.1.a; 185.3.a.2's example appends *"all copyable traits, including the cost"*).
So a Reflection is fodder worth its original's price, 185.2.d makes it a legal *"kill a friendly unit"*
payment, and 816.1.b was going to kill it at your next Beginning Phase anyway. `UNL-200 Mirror Image`
says *"Choose a unit"* with no controller restriction, so the copied cost may be the **opponent's**
biggest body — 103.1.b constrains your deck, never what you may choose on the table.

The in-domain fallback is `VEN-064 Plaza Guardian`, printed at 10 Energy and 0 Power, whose own
*"I cost 1 less for each gear you control"* 206 ignores. 356.6 then floors Atakhan at 0 Energy.

## 18. 363–366 — a cost-altering passive is live in every zone the card can be played from

**366.2 / 366.2.a**: *"Passive Abilities can alter the costs of cards as they are played. These apply at
all times in any zone from which the card with the ability can be played."* **366.1**'s worked example
names a pool card: *"Undying Legion has a passive ability that reads '[Legion][>] You may play me from
your trash for [3][C].' That passive ability only applies when Undying Legion is in the trash."*
363, 364 and 366 were cited by nothing.

**Members named.** Exactly **two** cards in the pool carry the *"cost less to play from anywhere other
than your hand"* passive, swept on the corpus: `SFD-010 Void Drone` (Fury, E3) and `SFD-164 Drag Under`
(Order, E5). And the discount is worth nothing on the five trash/banishment routes that **ignore the
Energy cost outright** — `OGN-198 The Harrowing`, `OGN-196 Soulgorger`, `UNL-142 Heedless Resurrection`,
`UNL-179 Rift Herald`'s Deathknell and `SFD-090 The Zero Drive`. The one card that makes it pay is
`UNL-148 Cursed Sarcophagus`, which prints *"(You must pay its costs.)"*.

**And 206 refuses the obvious upgrade.** The discount is real for **paying** and invisible to any
**cost gate**: `SFD-140 Fizz, Trickster`'s *"a spell from your trash with Energy cost no more than 3"*
still reads Drag Under's printed 5, and Heedless Resurrection's *"costs no more Energy … than the killed
unit"* still reads Void Drone's printed 3. Recorded as a refusal so nobody re-derives it.

## 19. The Showdown block — 342 and 345 are uncited, and 345 is the one worth carrying

341, 342 and 345 are cited by nothing; 343.1, 346.1, 347.1 and 347.2.b already are (5, 17 and 7 uses).
The unused paragraph with content is **345: *"As a Showdown begins, the player who applied Contested
status to the Battlefield gains Focus."*** — with 464.2.c.1 making that player the **Attacker**, so in
every combat showdown in this catalogue the attacker acts first and the defender's [Action] answer comes
second. No entry in the catalogue states who holds Focus first.

Its companions, for completeness: **342** makes a Showdown a Window of Opportunity where players play
spells *"in an alternating fashion"*; **343.1.a / 343.1.b** are why [Action] and [Reaction] exist at all
(*"Cards of all Categories, by default, cannot be played during a Showdown State"*, and the same for
card abilities); **347.2.a** ends the Showdown when *"all Players have passed once in sequence"*.

## 20. Running tally of this slice

Entries: **10** across five batches, all ENGINE, all merged or staged. Blocks opened that the project had
never cited: 432 Double, 433 Swap, 476.2/476.3 Layers, 719.5 / 718.1 / 718.4 / 457.1 Attachment and
Recalls, 465.2.c.6–c.10 damage assignment, 764–767 Ignoring Effects, 386–388 Reflexive Triggers,
750–755 Making New Choices, 734–738 Additional Turns, 389–392 Delayed Abilities, 358 Check Legality,
393–397 Linked Abilities, 363–366 Passive Abilities, and the *"or copied"* half of 206.

Blocks read and returned empty, with the reason: 443 Skip, 418 Heal, 451/452/453, 478/479 Dependency,
741–749 Counters, 324 Special Cleanups, 413/440 Draw and Burn, and the already-cited half of 341–348.

---

# Batch 6 — Untargetability, and who holds Focus in a Showdown

Batch 5's two entries were merged (catalogue at 648). Staging pruned to this batch.

| id | block opened | class |
|---|---|---|
| `alpha-wildclaw-discipline-mistarget` | **756–758 Untargetability** | ENGINE |
| `drag-under-attacker-focus-first-conquer` | **341–348 Showdowns** (345, 343.1.a/b, 159.2) | ENGINE |

`validateCombos` over the merged copy: **0 errors, 650 entries.** `test/legend-lines.test.ts` re-run over
these two: 19 legend base codes checked, **0 defects.** No duplicate id, no duplicate card set.

## 21. 758.1 — untargetability is checked at RESOLUTION, not at targeting

**758.1**, cited by nothing: *"If a Game Object becomes untargetable for a spell or ability after
becoming its target and before it resolves, the spell or ability will mistarget on resolution. Any
instructions related to that Game Object will be ignored as the spell resolves."*

This is a general fact about **every prohibition in the pool** and it has never been stated here. And
**758.2.a works a pool pair by name**:

> Alpha Wildclaw and Vilemaw are controlled by the same player and located at a battlefield. An
> opponent targets Vilemaw with Rebuke. Before Rebuke resolves, Vilemaw's controller plays Discipline
> targeting Alpha Wildclaw, making Vilemaw no longer a legal target. Rebuke's controller then targets
> Alpha Wildclaw with Star-Crossed. When Star-Crossed resolves, Alpha Wildclaw's passive ability no
> longer applies to Vilemaw, making it a legal target for Rebuke.

All five cards are in the pool: `UNL-057 Alpha Wildclaw`, `UNL-060 Vilemaw`, `OGN-058 Discipline`,
`OGN-172 Rebuke`, `UNL-128 Star-Crossed`.

**Members named.** The pool's untargetability cards, swept for *"can't be chosen by enemy spells"*:
`SFD-105 Ruin Runner`, `UNL-057 Alpha Wildclaw`, `UNL-059 Master Yi, Unstoppable` (at [Level 16]),
`UNL-147 Baron Nashor`, `VEN-031 Twilight Shroud` and `VEN-038 Akali, Silent`. **Alpha Wildclaw is the
only one whose protected SET is defined by a number you can move at [Reaction] speed** — which is why a
2-Energy cantrip can pull a Might 8 body under his umbrella while the removal sits on the Chain.

**758.2's FIRST worked example describes a card the pool does not print** (*"I can't be chosen by enemy
spells or abilities with Energy cost less than my Might"*), so only the second is load-bearing here.

## 22. 345 — the ATTACKER gains Focus, and no entry says so

**345**: *"As a Showdown begins, the player who applied Contested status to the Battlefield gains
Focus."* With **464.2.c.1** making that player the Attacker, the attacker holds the **first window** in
every combat showdown and the defender's [Action] answer comes second. 341, 342 and 345 are cited by
nothing; 343.1, 346.1, 347.1 and 347.2.b already are (3, 5, 17 and 7 uses).

The rest of the order, for completeness: **343.1.a / 343.1.b** are why the keywords exist
(*"Cards of all Categories, by default, cannot be played during a Showdown State"*, and the same for
card abilities); **159.2.a.1** grants [Action] the Showdown window and **159.2.b.1** gives [Reaction]
*"all cases and rules of Action"* — **the cleanest statements in the file** of what this project usually
sources to 806.1.b and 813.1.b; **347.1.b** passes Focus when your chain closes, **347.2.b** when you
decline, and **347.2.a** ends the Showdown once *"all Players have passed once in sequence"*; and
**346.1** keeps Focus with you when the chain opened from a triggered ability or an Add ability, so the
combat's own attack triggers resolving does not cost the attacker that first window.

## 23. 759–763 Naming Cards — zero cards, recorded

**759–763** (naming or guessing a card, type or tag) is cited by nothing, and a corpus sweep for
*name a card*, *names a card*, *guess* and *naming* returns **zero rows**. The block is dead letter in
this pool. No entry, and nothing to look for.

---

# Batch 7 — Tokens, Damage, and a new probe that replaces this slice's

Batch 6's two entries were merged (catalogue at 665). Staging pruned to this batch.

| id | block opened | class |
|---|---|---|
| `card-sharp-renata-industrialist-gold-asymmetry` | **179–184 Tokens** (182, 184.1) | ENGINE |
| `bellows-breath-frigid-touch-shrink-into-damage` | **142 Damage** (142.3.a/b, 142.4.a/b/c) | ENGINE |

`validateCombos` over the merged copy: **0 errors, 667 entries.** `test/legend-lines.test.ts` re-run over
these two: 11 legend base codes checked, **0 defects.** No duplicate id, no duplicate card set.

## 24. THE NEXT PROBE, AND IT IS BETTER THAN THIS SLICE'S

The block-level probe that opened this slice is close to spent — the mechanics range of the rules file
is roughly two thirds mined after seven batches. **The probe that replaces it is one level down**: find
**sub-rules** that are cited by nothing **and carry a worked Example**, because a worked example is
Riot telling you the case is real and usually naming a card.

```
node -e '
const t = combos.json + synergies.json;
const cited = new Set([...t.matchAll(/\b(\d{3}(?:\.[0-9a-z]+)+)/g)].map(m => m[1]));
// for each "NNN.x.y." heading in the rules file, keep it if !cited and the next ~14 lines contain "Example:"
'
```

It returns **307 uncited sub-rules carrying a worked example.** Both entries in this batch came from its
first page, and it immediately surfaced a paragraph that looked like it **refuted a merged entry of
mine** — see §25, which is the reason to trust the probe.

## 25. A self-check that came out the right way, and the fact it produced

The probe surfaced **185.3.a: *"Tokens do not have costs"*** and **185.3.a.1: *"Although tokens do not
have costs, their cost is treated as being 0 for all purposes."*** That reads as a direct refutation of
`mirror-image-reflection-atakhan-printed-cost` (batch 5), which prices Atakhan's discount off a
Reflection's **copied** cost. It is not, and **185.3.a.2** is why:

> Tokens can have costs appended to them via applied Layer effects.
> Example: Deceiver's conquer effect creates a 0 [M] Reflection unit token and applies a copy effect to
> that token. The copy effect will append all copyable traits, **including the cost of the unit to be
> copied**. This appends a cost to the Reflection token.

So the entry stands and is now better sourced — but the **negative half is new and belongs beside it**:
**every ordinary token in the pool has cost 0 for all purposes (185.3.a.1)**, so a Reflection is the
*only* token that is worth anything to Atakhan, to `UNL-142 Heedless Resurrection`'s
*"costs no more Energy … than the killed unit"*, or to any other cost-counting effect. Companion:
**185.3.b / 185.3.b.1** do the same for domains, which is the rule behind the synergy layer's
`domains.length === 0` token filter.

## 26. 182 — an effect may name a DIFFERENT player as a token's controller

**182**, cited by nothing: *"A token's controller is the controller of the spell or ability that created
it, **unless** the token's type innately determines control or that spell or ability specifies that a
different player is the token's controller."* **Members named:** exactly **two** cards in the pool use
that exception, swept on the corpus — `SFD-081 Card Sharp` (a Gold each, which is the point) and
`UNL-130 Walking Roost` (a 1-Might Bird to an opponent, a pure drawback). Both were in **zero entries**.

Card Sharp is symmetric on paper, and the asymmetry is bought elsewhere: `SFD-171 Renata Glasc,
Industrialist` says *"**Your** tokens enter ready"* and `SFD-201 Chem-Baroness` says *"**your** Gold
[Add] an additional 1 Energy"* — and 182 is the reason neither reaches the Gold the opponent took.
**184.1** is the companion: *"The effect may state that the token enters ready or exhausted, if that
state is contrary to the default for the token's type"* — which is the rule R25 = A was ruled over.

## 27. 142.4.b — lethal is a CURRENT-Might measurement, re-checked

**142.4.a**: *"Lethal Damage is the amount of marked Damage that will cause a unit to die in a
cleanup."* **142.4.b**: *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that
Unit's Might"*, with the worked example naming a pool card:

> A unit has 5 [M] and 3 damage marked on it. Frigid Touch is played targeting that unit. When it
> resolves, the unit's Might becomes 3, and it will have lethal damage marked on it.

So **a −Might turns damage already marked into a kill** — the complement of this project's finding that
a kill keyed on the word *"damaged"* reads a marker rather than a threshold. It inverts how removal is
priced: a Might 6 body needs 6 damage, or 2 damage and −4 Might. A floored reducer cannot substitute
(477.3.b caps the reduction, not the result), which is exactly why `SFD-066 Frigid Touch` is the payoff.

142.4.b's **second** example is the 0-Might wall rule at its source: *"A unit has 0 [M]. In order to have
lethal damage marked on it, it must have at least 1 damage marked on it."*

And **142.4.c** with **142.3.a / 142.3.b** is the paragraph for `UNL-118 Elder Dragon` (*"Any amount of
your damage is enough to kill enemy units"*): *"The player responsible for the Deal action that caused
the Damage to be marked is the player who marked that Damage"*, and *"Game Effects may refer to that
player's Damage."* So **"your damage" is scoped to damage YOU marked** — and a mutual-damage exchange,
where 417.6.b.4 makes the opponent responsible for what their own unit dealt, does **not** feed it.
142.1 through 142.4 are cited by nothing.

---

# Batch 8 — the sub-rule probe, run properly; lane narrowed to sub-rules 100–499

Batch 7's two entries were merged (catalogue at 676). **rc-manager4 split the probe on 2026-09-07: this
lane keeps sub-rules 100–499, rc-walk-fc takes 500–899**, and fc is building the probe independently so
that any disagreement between the two is itself a finding. Both entries below are inside 100–499.

| id | sub-rule opened | class |
|---|---|---|
| `immortal-phoenix-falling-star-cleanup-attribution` | **428.5.c / .c.1 / .c.2 / .d** kill attribution | ENGINE |
| `soraka-wanderer-vanguard-armory-simultaneous-save` | **370.3 / 370.4** Replacement Effects | ENGINE |

`validateCombos` over the merged copy: **0 errors, 678 entries.** `test/legend-lines.test.ts`: 18 legend
base codes checked, **0 defects.** No duplicate id, no duplicate card set.

## 28. The probe, with the filter that makes it usable

The raw probe (§24) returns 307 uncited sub-rules carrying a worked Example. Adding one filter —
**keep only the rows whose example text contains a card NAME from `cards.json`** — cuts it to **153**,
and every one of those is Riot pointing at a real card. That list is the working queue.

```
// uncited sub-rules whose worked example names a pool card
cited   = /\b(\d{3}(?:\.[0-9a-z]+)+)/g over combos.json + synergies.json
heading = /^\s*(\d{3}(?:\.[0-9a-z]+)+)\.\s+(\S.*)$/ over the rules file
keep if !cited.has(id) && /Example:/.test(next 16 lines) && some card name appears in them
```

## 29. 428.5.c — a unit that dies in the CLEANUP was killed by the spell that damaged it

Without this, no burn spell in the game would ever satisfy a *"kill a unit with a spell"* clause,
because 143.2.a kills in a cleanup and a damage spell performs no Kill instruction. **428.5.c**:
*"When one or more Units is killed due to a Cleanup, that kill action is attributed to the spell or
ability that resolved immediately prior to that Cleanup that dealt damage to the Unit or Units"*, with
**428.5.c.1** making the dealing player responsible.

**428.5.c.2 is the exclusion:** *"If the Cleanup that caused the units to be killed was the Combat
Cleanup, the sources of the Combat Damage are attributed the kill action"* — combat kills belong to the
**units**, so no spell is involved and a "kill with a spell" payoff stays switched off.

**428.5.d names `OGN-037 Immortal Phoenix`** and composes with batch 3's reflexive-trigger finding: a
spell that splits into separate chain items with *"Do this"* keeps its attribution — *"both the spell
and its ability receive attribution for killing the unit … so Immortal Phoenix's ability will trigger."*

## 30. 370.4 — a replacement still covers what dies *with* its source

**370.4**: *"A Game Object can apply its Replacement Effects to any qualifying events that occur
simultaneously with it leaving the zone that its Replacement Effect is active in"*, and Riot's example
names `SFD-173 Soraka, Wanderer`: her replacement *"can be applied to any qualifying event that occurs
simultaneously with her leaving the board, including to units that die simultaneously with her."*

**So a board wipe does not beat her — it only costs her.** Every friendly unit at her battlefield under
Might 4 is healed, exhausted and recalled out of the sweeper that killed her.

**370.3 is the negative mirror and it is the more useful half**: a replacement that lives *in the trash*
does **not** cover simultaneous deaths, because *"It does not enter the trash before the Recruit dies."*
Same wipe, opposite outcome, and the only difference is which zone the effect is active in.

## 31. A correction to my own batch 2, at the precision it was measured

Batch 2 reported *"the pool has FIVE [Backline] cards, not four."* Soraka makes it **six** — and the
claim needs the distinction that batch 2 did not draw. **Six cards carry the Backline EFFECT**:
`OGN-068 Caitlyn, Patrolling` and `SFD-173 Soraka, Wanderer` print the sentence in prose,
`UNL-043`, `UNL-090`, `UNL-141` and `UNL-145` print the keyword. 465.2.c.6 orders assignment by
*"requirements and restrictions"* and its example quotes the effect, so **all six** are assigned damage
last; but only **four** *have the keyword*, which is what a card reading keywords would see (722.1).
A bracketed grep finds four.

## 32. 759–763 re-checked, and the batch-6 result stands

The probe surfaced `SFD-112 Kato the Arm` under 761.2, which looked like it overturned batch 6's
"Naming is dead letter". It does not: Kato appears only as Riot's **example of how to name a card**
(*"If there is only one unit with Kato in their name, saying 'Kato' is sufficient"*), not as a card that
instructs naming. The corpus sweep still returns zero rows. Two things worth keeping from the re-read:
**762.2** (*"A player cannot choose the name of a token when instructed to name a card"*) and
**763.1**, which prints the **complete list of every tag that exists in Riftbound**.

---

# Batch 9 — Splitting (355.14) and Replacement sequencing (373)

Batch 8's two entries were merged (catalogue at 682). Both entries below are inside the 100–499 lane.

| id | sub-rule opened | class |
|---|---|---|
| `feral-strength-frigid-touch-split-floor` | **355.14.a–i** Splitting | ENGINE |
| `soraka-guardian-angel-replacement-sequence` | **373 / 373.1 / 373.1.a / 373.2** | ENGINE |

`validateCombos` over the merged copy: **0 errors, 684 entries.** `test/legend-lines.test.ts`: 8 legend
base codes checked, **0 defects.** No duplicate id, no duplicate card set.

## 33. 355.14 — the targets are locked early and the arithmetic is settled late

Every sub-rule of 355.14 is uncited, and together they describe a window worth two cards:

- **355.14.b**: targets are chosen at finalization. **355.14.c**: their number is capped by the damage
  available *when the spell is played*.
- **355.14.e**: *"The choice of how much damage is divided across the split is not decided until the
  resolution of the spell or ability."*
- **355.14.f / .g**: every target must receive a positive integer, at least 1.
- **355.14.h**: if the damage has shrunk below the target count, the controller drops targets —
- **355.14.h.1**: *"That player cannot choose to have fewer Targets than they have damage to split when
  choosing which Targets cease being Targets."* **They may not concentrate the remainder.**
- **355.14.i**: costs already paid and effects already triggered by the targeting **stay** paid and
  triggered. Dropping a target is not un-targeting it.

Riot's worked example is the defence, with both answer cards named: *"their opponent plays Feral
Strength targeting one of their recruits, and Frigid Touch targeting the 5 [M] unit … They can only
choose at most 2 of the targets to cease being targets."* `SFD-034 Feral Strength` was in **zero
entries** and is one of the three cards the rules-named-card vein had left.

## 34. 373.2 — a replacement is applied ONCE PER SEQUENCE, and that is the limit 370.4 omits

**373.2**: *"When applying Replacement Effects to events that occur simultaneously, each Replacement
Effect may only be applied in one sequence, to any number of events that are qualified to be
replaced."* And **373** gives the ordering to the controller when both effects are theirs.

Riot's worked example is `SFD-173 Soraka, Wanderer` carrying a `SFD-051 Guardian Angel`, dying beside
two Recruits at her battlefield and two at base — and the two orders save **different halves of the
board**. Guardian-Angel-first keeps Soraka and saves the base; Soraka-first saves the garrison and
spends her effect. **373.1.a** performs the saves before the unsaved bodies finish dying; **373.1**
resolves cross-table replacements by turn order rather than by choice.

## 35. A correction that missed its merge — patch staged, not applied

**`soraka-wanderer-vanguard-armory-simultaneous-save` (batch 8) was merged before this correction
landed.** It stands on 370.4 and does not state 373.2's once-per-sequence limit. The fix is one extra
notable and three citations, and because this lane does not own `data/combos.json` it is staged as an
**idempotent script** the manager can run:

```
node /tmp/rc-walks/rc-walk-rules-patch.mjs
```

It no-ops if the entry already mentions 373.2. The entry's verdict is unchanged — 370.4 is still why a
wipe does not beat her; what was missing is that she gets **one** application, so a second replacement
stacked on her is a **fork between two halves of the board, not a doubling**.

---

# Batch 10 — Linked instructions, and four results

Batch 9's two entries were merged (catalogue at 684) **and the manager applied the batch-8 patch** —
`soraka-wanderer-vanguard-armory-simultaneous-save` now cites 373.2. One entry this batch; the vein
gave one, and the rest of the reading gave results.

| id | sub-rule opened | class |
|---|---|---|
| `hidden-blade-tactical-retreat-linked-instruction-draw` | **359.3.e.13 – .e.14.c** Linked instructions | ENGINE |

`validateCombos`: **0 errors, 685 entries.** `test/legend-lines.test.ts`: 9 legend base codes, **0 defects.**

## 36. 359.3.e.14 — three words decide whether a save switches off the rider

**359.3.e.14.b**: *"If the Game Action performed in an earlier linked instruction is replaced, this will
not affect the later linked instruction, **unless** the later linked instruction directly references the
Game Action being performed."* Riot contrasts two pool cards:

- `OGN-213 Hidden Blade` — *"Kill a unit at a battlefield. Its controller draws 2."* The second sentence
  references the **unit**, not the kill, so it **executes even when the kill was replaced**.
- `SFD-163 Deathgrip` — *"Kill a friendly unit. **If you do**, give +[M] equal to its Might…"* — *"the
  later linked instruction will not execute because 'if you do' directly references the game action."*

**So `X. Then Y.` survives a replacement and `X. If you do, Y.` does not** — a general split across the
whole pool. And **359.3.e.14.a** kills both forms if the first instruction is **ignored** rather than
replaced: a bounce, move or recall in response mistargets the spell and nothing after it happens.

The line is to aim your own Hidden Blade at your own saved body: 2 Energy for 2 cards and the unit kept.

## 37. Results

### 37.1 178.2 / 178.3 multi-type Game Objects — zero cards, measured

The block, and Riot's example (*"A unit that is also a gear can be affected by … 'Kill all units,' or
'Kill all gear'"*), describe a card the pool does not contain. Measured over `data/cards.json`, the type
histogram is `unit 629, spell 233, rune 18, gear 114, legend 127, battlefield 66, "" 2` — **no card has
more than one type**. (`SFD-073 Experimental Hexplate`'s *"I am a Mech"* is a **tag**, not a type.)
Dead letter until a set prints one.

### 37.2 383.3.e.2 — the rule is real, the card population is empty

**383.3.e.2.a**: a *"you may"* at the start of a Triggered Ability's effect is decided **during
finalization**, and **383.3.e.2.b**: *"If they do not, it is removed from the chain"* — Riot's example
being a *"Once each turn, when an enemy unit dies, you may banish it"* ability that is **not spent** by
declining, so it can still fire later that turn. **Measured on the corpus, the pool's four
`Once each turn` cards cannot use it**: `UNL-086 Zilean, Time Mage` (a replacement, *"if you would
play"*), `UNL-145 Pyke, Returned` and `VEN-063 Nasus, Guardian of Knowledge` (both mandatory) and
`VEN-125 Hungry Wolf` (an activated ability). No entry. The **rule** is still worth carrying, because
383.3.e.2.a puts the *decision* in the same window 383.3.b puts the *cost* — finalization, before
anyone can respond.

### 37.3 416.5 / 416.5.a — you can stack the bottom of your Rune Deck and never your Main Deck

**416.5**: two or more cards recycled to the **Main Deck** simultaneously go to the bottom *"in a random
order"*. **416.5.a**: to the **Rune Deck**, *"in the order of their owner's choosing."* An asymmetry
cited by nothing, and it matters once 430.1 is channelling off a nearly-empty Rune Deck with a domain
requirement. No card in the pool recycles two or more runes in one action, so it is a fact without a
line today.

### 37.4 417.1.a and 417.1.e.1 — a refinement to the disjointness statement, and a Prevent that switches a trigger off

**417.1.a**, cited by nothing: *"Assigning Damage during the Combat Damage Step is not Dealing Damage,
**but will cause Damage to be Dealt when assignment is complete**."* The second clause is the part this
project's *"combat damage is not a Deal action"* shorthand loses: combat damage **is** eventually Dealt,
so a *"when I take damage"* payoff **does** fire off combat — what does not attach is **Bonus Damage**,
which 713 grants to Deal **actions** and 417.3.a keeps off the assignment.

**417.1.e.1**: *"Only Valid Damage is Dealt"*, with the example that a unit under a Prevent of 3 hit by
`OGN-009 Hextech Ray` (3) takes nothing and its *"when I take damage"* trigger does **not** fire, while
`OGN-024 Void Seeker` (4) gets 1 through and it does. So a **full** Prevent switches the trigger off and
a **partial** one does not — which is the precise reason 437.4 is a different mechanism from the
heal/exhaust/recall shields. The pool's one card keyed on it is `OGN-221 Imperial Decree`
(*"When any unit takes damage this turn, kill it"*), and 417.1.a means it reaches combat damage too.

---

# Batch 11 — mistargeting counts, and where the "you may" sits

Batch 10's entry was merged (catalogue at 692). Both entries below are inside the 100–499 lane.

| id | sub-rule opened | class |
|---|---|---|
| `repulse-heedless-resurrection-shrink-target-count` | **359.3.e.6 – .e.9.a** mistargeting | ENGINE |
| `ornn-blacksmith-late-may-resolution` | **383.3.a – .a.3** where the "you may" sits | ENGINE |

`validateCombos`: **0 errors, 694 entries.** `test/legend-lines.test.ts`: 13 legend base codes, **0 defects.**

## 38. 359.3.e.9.a — a moved body is still counted, a killed one is not

**359.3.e.9.a**: *"If another spell or ability attempts to reference the number of game objects, players,
or zones that a Finalized Chain Item targets, it will include any **mistargeted** choices, but not any
targets that have **changed to a non-board zone**."*

So a **move** and a **kill** are not interchangeable answers to a multi-target chain item, and Riot works
it with **four pool cards**: `OGN-041 Volibear, Furious`'s attack trigger choosing three of your units,
answered with `OGS-011 Flash` — which fails, because moved units keep being counted — versus two
`UNL-142 Heedless Resurrection`, whose additional cost sends bodies to the **trash**, which does shrink
the count and lets `UNL-106 Repulse` (*"chooses it and no other friendly unit"*) counter the trigger.

The companion pair decides whether it is worth it: **359.3.e.7** — if *all* targets go invalid the
instruction does not execute — against **359.3.e.8**, whose example is `OGN-105 Singularity`: if only
*some* do, *"the instruction will execute, with only the Targets available and valid being operated on."*
Killing two of three does **not** blank the trigger; the counter is what blanks it.

## 39. 383.3.a — a leading "you may" is a blind commitment, a later one is free information

The project already carries the **cost** half of this (383.3.b: a cost right after a leading *"you may"*
is the trigger's base cost, paid at finalization). **The decision half was uncited:**

- **383.3.a**: a *"you may"* **as the first part of the effect** is chosen **during finalization** —
  Riot's example is `OGN-199 Tideturner`.
- **383.3.a.2**: declining means it *"is removed from the chain and **considered to have not
  triggered**"* — stronger than merely leaving the chain, and it is why a once-per-turn is not spent.
- **383.3.a.3**: a *"you may"* **anywhere later** is decided **on resolution**, and *"The ability is
  always finalized to the chain."* Riot's example is `SFD-058 Ornn, Blacksmith`, who looks at four cards
  and **then** chooses whether to draw one.

**So when comparing two triggers that read alike, find the "you may" first.** A leading one is a single
blind commitment covering both the cost and the effect; a later one buys the information first.

## 40. A legend list I typed instead of measuring, caught before staging

The first draft of `repulse-heedless-resurrection-shrink-target-count` named the Body/Chaos legends as
*"OGN-259 / OGN-305 Grinning Fisherman and UNL-201 / UNL-238 Voidreaver"*. **Two of the three names and
three of the four base codes were wrong.** Measured over `data/cards.json` the Body/Chaos legends are
`OGN-267 / OGN-309 Bounty Hunter`, `SFD-203 / SFD-250 Battle Mistress` and `UNL-201 / UNL-236
Voidreaver`. `test/legend-lines.test.ts` would **not** have caught it — it checks that a named legend
*can hold* the entry's domains, and an invented Body/Chaos legend passes that test by construction if
the base code happens to exist. The only thing that catches it is running the census. This is the
project's standing rule meeting its own failure mode: **the entries whose legend list was RUN are right;
the ones TYPED are wrong.**

---

# Batch 12 — delayed abilities that are never generated, and where a trigger reads its information

Batch 11's two entries were merged (catalogue at 697). Both entries below are inside the 100–499 lane.

| id | sub-rule opened | class |
|---|---|---|
| `targons-peak-defy-delayed-ready` | **359.3.e.15 / .e.16** delayed abilities | ENGINE |
| `lillia-fae-fawn-signpost-sprite-at-the-origin` | **359.3.f.3 / .f.3.a / .f.3.b** referents | ENGINE |

`validateCombos`: **0 errors, 699 entries.** `test/legend-lines.test.ts`: 14 legend base codes, **0 defects.**
The Calm/Mind legend list in the second entry was **run** against `cards.json` before staging, not typed —
it matches the census exactly (OGN-255, OGN-303, SFD-189, SFD-244, UNL-189, UNL-230, VEN-145, VEN-192).

## 41. 359.3.e.16 — a delayed ability whose duration has already ended is never generated

*"If a Delayed Ability's duration has ended before it was generated, the Delayed Ability is not
generated and any instructions related to it are ignored."* Both worked examples name pool cards.

**`OGN-289 Targon's Peak`** — *"When you conquer here, ready up to 2 runes at the end of this turn."*
Conquer it **inside the Ending Phase** and the delayed trigger is never created; the payoff silently
does not exist. Conquer it in the Main Phase and it does.

And the constructive half, which is the entry: **415.3.a** readies nothing until your own Awakening, so
a rune tapped on your turn is dead for the whole of the opponent's. A trigger that resolves *"at the end
of this turn"* lands **after** 167 has emptied your Rune Pool and after your Main Phase — so those two
runes are ready when the opponent acts. **It is the pool's one free, Colourless source of off-turn
Energy**, and with 164.2.b's free Power floor it holds up `OGN-045 Defy` with nothing kept back.

**The second example is a general answer worth carrying on its own**: `SFD-109 Akshan, Mischievous`'s
*"You control it until I leave the board"* is a delayed **passive** — *"If Akshan leaves the board in
reaction to his play effect … You will not gain control of the targeted gear even for a moment."*
Removing him in response to his own play trigger **denies** the theft rather than undoing it.

## 42. 359.3.f.3 vs 359.3.f.4 — two sub-rules that pull in opposite directions

- **359.3.f.3**: information referenced from the **trigger condition** is checked **when the condition
  is fulfilled**. Riot's example is `UNL-082 Lillia, Fae Fawn`: her Sprite's location is *"noted … when
  it does so"*, and moving her afterwards *"will not affect where the Sprite token will be played."*
- **359.3.f.4**: information referenced from the **ability itself** — *"enemy"* and *"friendly"* status —
  is checked **on execution**. That is the Yasuo/Hostile Takeover case the project already carries.

**The difference is where the information comes from, not when the ability resolves.** And
**359.3.f.3.b** settles `UNL-050 Iascylla`'s *"this battlefield"*: it is the battlefield she **held**,
read from the trigger condition.

The line: move Lillia **from** a battlefield and the 3-Might Sprite is played **there**, with nothing
having walked — the bottleneck every token line in this catalogue runs into (144.4). `UNL-045 Forgotten
Signpost` moves by **effect**, so 420.3.a's Standard-Move exhaust never applies and she can walk back in
the same Main Phase to fire it a second time.

---

# Batch 13 — Active vs Passive Kill, and the last structural rows

Batch 12's two entries were merged (catalogue at 699). One entry this batch; the remaining filtered rows
in the 100–499 lane turned out to be definitions.

| id | sub-rule opened | class |
|---|---|---|
| `loyal-poro-deathgrip-kill-instruction-snapshot` | **428.1.a – .a.2** Kill, Active and Passive | ENGINE |

`validateCombos`: **0 errors, 700 entries.** `test/legend-lines.test.ts`: 9 legend base codes, **0 defects.**

## 43. 428.1.a.1.b — the snapshot, and the paragraph this project has been sourcing elsewhere

*"When a unit with a Deathknell or other ability that triggers on its own death is to be put in the Trash
due to a Kill Instruction, it first has any such ability added to the chain as a Pending Item. **Note the
unit's location, attributes, and other relevant information** to process those abilities when finalized
before completing this Kill Instruction."* Riot's example is `SFD-148 Draven, Audacious`.

This is the precise rule for what the catalogue currently attributes to 808.1.d.3 — **a Deathknell reads
where the body was and what stood beside it, because that is noted before the body leaves.**

**And 428.1.a splits killing in two, which the catalogue uses constantly and has never stated:**

- **428.1.a.1 Active Kill** — *"when the action is taken when instructed by a game effect **or as a cost**
  for a card or ability."* This is a **Kill Instruction** and it gets the snapshot.
- **428.1.a.2 Passive Kill** — *"as a result of Lethal Damage or as a consequence for any other state."*
  Combat deaths and 143.2.a cleanup deaths are **not** Kill Instructions.

The line follows from the pair: `SFD-163 Deathgrip`'s effect **requires** another friendly unit, and the
snapshot is taken while that unit is still standing, so `UNL-156 Loyal Poro`'s *"If I didn't die alone"*
is satisfied **by construction**. Two cards and +3 Might for 2 Energy at [Reaction] speed. The mirror
card, `SFD-036 Lonely Poro` (*"If I died **alone**"*), is switched **off** by the same board.

## 44. Results — the rest of the lane's filtered rows are definitions

- **410.2.a / 410.2.b Limited Actions** — *"A player cannot perform these actions at-will … only be
  taken when a player is instructed to do so."* The definition behind every "you may only X when
  directed" line the catalogue already cites individually (416.2, 422.2, 437.6, 440.3, 443.3). No card
  content of its own.
- **416.2 / 416.2.a**, **422.2 / 422.2.a** — Recycling and Discarding are Limited Actions and are
  **mandatory** when instructed. The mandatory half is already carried through 416.6; the rest is the
  410.2 definition applied.
- **359.3.e.12.a** — information about a still-legal target is accessible. Structural.
- **431.5 — *"Burning Out is a Replacement Effect."*** Real and uncited, and it means 367–375 govern it:
  if a Burn Out is simultaneous with another replacement their controller orders them (373), and it
  could in principle be replaced. **No card in the pool replaces a Burn Out**, so it is a fact without a
  line — recorded so nobody re-reads the block looking for one.

---

# Batch 14 — no entry, four citation upgrades and one dead letter

Batch 13's entry was staged; this batch produced **no new entry**. Every promising row I read either
lands on a card another lane has already walked, or turns out to be a universal with nothing to build
on. Recording it as a result rather than stretching for a duplicate.

## 45. 204.4 Applied Costs — an uncited COST CATEGORY, and 204.4.c is the teeth

**204.4**: *"Applied Costs: These Costs are applied to one or more Game Actions, and typically take the
form of a passive ability with a Cost within Instructions preceded by 'must.'"* Riot's example is
`UNL-163 Mageseeker Investigator` — *"Opponents must pay [A] for each unit beyond the first to move
multiple units to my battlefield at the same time."*

- **204.4.b**: *"Applied Costs are paid as the Game Action is performed. They do not use the chain and
  cannot be reacted to."*
- **204.4.c**: *"If a player can't pay or chooses not to pay the Applied Cost, they cannot perform the
  associated Game Action."* — so it is a **prohibition when unpaid**, not a toll you may decline and
  still move.

**But 429.3's second worked example narrows it, and it names the same card**: *"A player moves two units
to a battlefield where their opponent controls a Mageseeker Investigator. Although they have no window
of priority, they may activate Add Reactions to pay for the applied cost from Mageseeker Investigator,
and those abilities finalize and resolve immediately."* With 204.4.b.1 saying the same thing.

**So the Investigator stops only an opponent who lacks the Power, never one who lacks a window.** The
catalogue's `mageseeker-investigator-mass-move-tax` is correct and cites neither 204.4 nor 429.3.

## 46. 429.2 — every Add in this pool is uninterruptible, and 429.2.b is dead letter

**429.2**: *"Triggered and activated abilities that Add resources resolve as soon as they are
finalized."* **429.2.a**: *"Priority and Focus will not pass from Add abilities being finalized or
resolving, and will resolve before any other outstanding items on the chain are finalized."*
**429.2.b**: *"Spells that Add resources will linger on the chain as normal when they are finalized."*

**Measured on the corpus: 29 `[Add]` rows, and not one of them is a spell that Adds.** The single spell
row, `UNL-073 Deadly Flourish`, creates a **Gold token** whose own ability Adds. So **429.2.b has no card
behind it**, and the useful universal is its complement: **every Add in the pool is an ability, so every
Add resolves immediately, passes no Priority or Focus, and cannot be reacted to** — which is exactly what
the reminder text on Ancient Henge, the Gold token, Malzahar, Jhin and Lux, Crownguard all print.

That also closes a question left open in batch 5: **ramping inside a Showdown costs you no Focus**, and
429.2.a is the citation to pair with 346.1.

## 47. 369.1 — "As I'm revealed" is a REPLACEMENT EFFECT, not a trigger

**369.1**: *"A Replacement Effect can usually be identified by the presence of the terms 'as,' 'would,'
or 'instead.'"* Its second worked example: *"Undertitan is a unit that reads in part 'As I'm revealed
from your deck, [Add] [2].' This is a replacement effect that alters the execution of any Game Effect
that reveals Undertitan from your deck."*

`SFD-175 Undertitan` is the pool's **only** *"as I'm revealed"* card (swept: one row), and it sits in
**four** entries — `reksai-undertitan-reveal`, `void-rush-undertitan-accelerate`,
`diana-lunari-showdown-scry` and `teemo-strategist-undertitan-mind-order-reveal` — **none of which cites
369.1**. It matters because a replacement does not use the chain: the Add is not a triggered ability that
could be ordered or responded to, it alters the reveal as it happens.

Companion, and already cited here for R25: **369.3** does the same for units entering the board —
`OGS-009 Yi, Honed`'s *"I enter ready"* **replaces** 143.4, and `UNL-147 Baron Nashor`'s *"I enter
there"* replaces the entering location.

## 48. 390.5.c — the zone a Delayed Linked Ability lives in

**390.5.c.1**: if the linked ability moves the affected object to a **non-board zone**, the delayed
ability's zone is **the zone it moved to**. **390.5.c.2**: otherwise it is *"whatever zone the Linked
Ability triggered or was played from, or whatever zone the affected Game Object is located in when it is
affected."* Riot's examples are `OGN-032 Ravenborn Tome` and `OGN-254 Noxian Guillotine`. Structural —
it decides where a delayed effect is *active*, and no line in the catalogue turns on it today, but it is
the rule to reach for if one ever does.

---

# HANDOFF — rc-walk-blocks, paused 2026-09-07, resumes Wednesday 2026-09-09

`/tmp` is not guaranteed to survive a reboot, so this section is the durable copy. The `/tmp` twin is
`/tmp/rc-walks/rc-walk-blocks-handoff.md`.

## H1. Lane, issue, staging

- **Issue #187.** Lane: **uncited Core Rules sub-rules 100–499** (rc-manager4 split the probe on
  2026-09-07; rc-walk-fc has 500–899 and built its probe independently so the two can be diffed).
- **Staging file `/tmp/rc-walks/rc-walk-rules.json` is EMPTY.** All 25 entries are merged. Nothing of
  mine is unlanded, in `/tmp` only, or in context only.
- Walk document: this file. Committed and pushed to `work` through batch 14.

## H2. Numbers, opened and closed at

- Opened at **catalogue 583**, 14 batches later the catalogue stands at **700**; **25 entries** are mine,
  all ENGINE, every one validated (`validateCombos` 0 errors, `test/legend-lines.test.ts` 0 defects).
- **Block-level probe** (my predecessor's): 385 top-level rule numbers, 234 uncited when I started. Its
  mechanics range is now roughly two-thirds mined.
- **Sub-rule probe** (mine, §24 and §28): 307 uncited sub-rules carrying a worked Example; filtered to
  those whose example **names a card from `cards.json`**, 153. Restricted to my 100–499 lane and
  re-measured after batch 13: **101 rows**, of which about a dozen are the structural ones §37, §44 and
  §48 already dispose of.

## H3. Refusals, each WITH THE SCOPE IT WAS MADE IN

A refusal is only as wide as the reason given. These are mine, scoped:

| block | refused because | scope of the refusal |
|---|---|---|
| 443 Skip | one card prints "Skip" (`VEN-022`), and no card triggers on the Draw Phase | scoped to **this pool**; the rules anticipate point-denial (443.1.a's third example) and a future set could print it |
| 418 Heal | no card in the pool *watches* a heal | scoped to **watchers**; 418.1.a still explains why every save card says "heal" (458.1 preserves damage through a Recall) |
| 451/452/453 | one-line headings cross-referencing 341 and 459 | scoped to **new mechanics**; they remain the source headings for the 344.2-vs-323.9 split |
| 478/479 Dependency | no card prints the *"Might increased to N"* passive its examples need | scoped to **the current pool**. If a set prints one, 479.2 makes the floor **anti-synergic** with a pump (Riot's numbers: 7 naive, **6** forced) |
| 741–749 Counters | 746, 747, 749 have no card; 745.2 and 748 duplicate claims already sourced to 702.x | scoped to **new lines**; 745.2 and 748 are still the *better citations* for two existing claims |
| 324 Special Cleanups | 324.2 only confirms what #62 already assumed | scoped to **new lines**; it is the missing citation for that finding |
| 413/440 Draw and Burn | a Burn Out is a step *inside* the action, not a failure of it | scoped to **the mechanism**; it refines "a fifth draw is a point for the opponent" rather than refuting it |
| 759–763 Naming | corpus sweep for name/names/guess/naming returns **zero** rows | scoped to **cards that instruct naming**. Re-checked in batch 8 after the probe surfaced Kato the Arm — he is only Riot's example of *how* to name. 763.1 is still a complete printed tag list |
| 725 Inactive carve-out | every attach/detach trigger in the pool is on a **unit or legend**, none on Equipment | scoped to **Equipment**; 725.3 is still the rule behind [Weaponmaster]'s re-equip |
| 178.2/178.3 multi-type | **zero** cards have more than one type (histogram in §37.1) | scoped to **the current pool** |
| 383.3.e.2 once-per-turn | none of the four `Once each turn` cards has a leading "you may" | scoped to **that shape**; 383.3.a.2's "considered to have not triggered" is still live and general |
| 416.5.a rune ordering | no card recycles 2+ runes in one action | scoped to **simultaneity**; the asymmetry itself (Rune Deck ordered, Main Deck random) stands |
| 429.2.b Add spells | **29 `[Add]` rows, none a spell that Adds** | scoped to **this pool**; its complement is the useful universal — every Add here is uninterruptible |
| 390.5.c | decides a delayed ability's *zone*; no line turns on it | scoped to **today's catalogue** |

## H4. The exact next step

Run the filtered sub-rule probe (§28 has the recipe), restrict to 100–499, and work the rows §46–§48
name as unread. In priority order, with the pool card Riot's example names:

1. **357.2 / 357.2.a** — paying non-standard costs — `OGN-208 Cruel Patron`
2. **370.1.b / 370.1.b.1** — how a Replacement Effect substitutes a game action — `SFD-175 Undertitan`
3. **383.1.a / 383.2 / 383.2.b** — what is Condition and what is Effect — `OGN-118 Wraith of Echoes`,
   `VEN-SP2 Sona, Harmonious`, `OGN-037 Immortal Phoenix`, `OGN-246 Viktor, Leader`
4. **136.2 / 136.2.a / 137.2** — Effect Text, and a Might Bonus of **+0** — `SFD-051 Guardian Angel`,
   `SFD-042 Brutalizer`, `OGN-024 Void Seeker`
5. **135.2.e.6.a–c** — the `[C]` shorthand, including *"A [C] shorthand on a card with no Domain is
   processed as [A] instead"* — `OGS-018 Tibbers`, `SFD-196 Defiant Dance`
6. **355.11.b**, **356.3**, **204.1.b**, **423.1.a** — read but not yet walked

## H5. Corrections owed to other entries — NOT applied, because this lane does not own `data/combos.json`

1. **`mageseeker-investigator-mass-move-tax`** should cite **204.4** (Applied Costs) and **429.3**, whose
   own worked example names that card and shows the cost is payable **with no window of priority** via
   Add Reactions. The entry's verdict stands; it is under-cited.
2. **The four Undertitan entries** — `reksai-undertitan-reveal`, `void-rush-undertitan-accelerate`,
   `diana-lunari-showdown-scry`, `teemo-strategist-undertitan-mind-order-reveal` — should cite **369.1**:
   *"As I'm revealed"* is a **Replacement Effect**, so the Add does not use the chain and cannot be
   responded to.
3. **`zero-drive-riptide-rex-banish-recursion`** (issue #174) should carry **395** and **397**: *"play all
   units banished with this"* reaches only what its **own linked ability** banished, and each copy is its
   own Game Object, so three Zero Drives do not share a pool.

## H6. Two habits that paid, and one that cost

- **Re-validate immediately before REPORTING, not after writing.** The shared tree moves: two of my
  card-count claims went stale inside the hour (§40 and the batch-9 correction).
- **A legend list is RUN against `cards.json` or it is wrong.** Batch 11 caught two of three Body/Chaos
  names typed from memory, and **`test/legend-lines.test.ts` cannot catch that** — it checks that a named
  legend *can hold* the domains, which an invented-but-existing base code passes by construction.
- **The cost:** `/tmp/rc-walks/` is shared and `noclobber` is on in this shell. A silent `cat >` failure
  once folded **another session's five entries** into my staging file. Always `set +o noclobber`, use a
  session-prefixed temp name, and re-read the staging id list after every write.

## H7. The one sentence for Wednesday

**The card populations are spent and the rules file is not — the filtered sub-rule probe is the vein, and
the rows whose worked example names a pool card are Riot telling you the interaction is real.**

---

# Batch 15 (2026-09-09, after the pause) — a cost that is paid without happening, and a word-order test

Resumed on the manager's release. Catalogue at **706 + 180 synergy rules**; staging was empty on resume,
as the handoff said. Both entries are inside the 100–499 lane.

| id | sub-rule opened | class |
|---|---|---|
| `cruel-patron-zhonyas-cost-paid-without-the-death` | **357.2 / .2.a / .3** and **370.1.a.1** | ENGINE |
| `sona-wind-wall-condition-not-effect` | **383.2 / .2.b**, and 383.2.a.1's two worked examples | ENGINE |

`validateCombos`: **0 errors, 708 entries.** `test/legend-lines.test.ts`: 14 legend base codes, **0
defects.** Legality for all four cards checked against `data/legality.json` on 2026-09-09 — none banned,
none restricted.

## 49. 357.2.a — a cost replaced by a Replacement Effect is still considered PAID

*"Costs that are replaced with other events by replacement effects are still considered paid."* Riot's
worked example names two pool cards: `OGN-208 Cruel Patron` (*"As an additional cost to play me, kill a
friendly unit"*) and `OGN-077 Zhonya's Hourglass`. The Hourglass replaces the death; **the cost is paid
and Cruel Patron resolves anyway.**

**And 370.1.a.1 says the kill genuinely did not happen** — *"A unit's death being replaced by Zhonya's
Hourglass is the same as the kill action that caused that death not occurring."* The two paragraphs have
to be carried **together** or the interaction reads as a contradiction. Net: a Might 6 body added for 4
Energy with **no body lost**.

**The general form, and this lane has now met it three times:** a **COST** that is replaced is still
paid (357.2.a); an **EFFECT** that references the replaced game action is **not** performed
(359.3.e.14.b, batch 10); and a **Deathknell** on the saved body is removed (808.1.d.1). Cruel Patron
works precisely because its kill is a cost with no rider attached.

Companion: **357.2** lets non-standard costs be paid in **any order**, and **357.3** forbids paying a
cost that *"will deterministically result in illegal choices or actions later in this process."*

## 50. 383.2.a.1 — the same "if" clause is Condition or Effect depending on where it sits

The catalogue cites 383.2.a.1 for the *"count is part of the Trigger Condition"* half. **Neither of its
two worked examples, nor the word-order test they establish, appears anywhere:**

- `OGN-073 Sona, Harmonious` — *"At the end of your turn, **if I'm at a battlefield**, ready up to 4
  friendly runes."* The clause is **immediately after** the Condition, so it is **Trigger Condition** —
  and Riot spells out the consequence: ***"If she is removed in reaction to the triggered ability, it
  will still resolve."***
- `OGN-251 Loose Cannon` — *"At the start of your Beginning Phase, draw 1 **if you have one or fewer
  cards in your hand**."* Not immediately after, so it is **Effect**, checked on resolution.

**So an "if" clause immediately after the When/At/Nth-time clause is checked when the trigger is PLACED
and survives removal in response; the same clause moved later is checked on RESOLUTION and does not.**

That makes Sona a **removal-proof** engine returning **four** runes at end of turn — twice Targon's Peak
(batch 12), with no Conquer required, every turn. `OGN-064 Wind Wall` rather than `OGN-045 Defy` is the
payoff because **206** makes Defy's *"costs no more than [4]"* read the **printed** cost, so it cannot
touch what a four-Energy answer is being held for.

## 51. Read and not walked — 135.2.e.6.c, a costing fact with no line of its own

**135.2.e.6.c**: *"A [C] shorthand on a card with multiple Domains is processed as any power of that
card's Domains"*, with `SFD-196 Defiant Dance` (Calm/Chaos, cost `[1][C]`, payable with **either**) and
`OGS-018 Tibbers` (Fury/Chaos [Accelerate]). And **135.2.e.6.b**: a `[C]` on a card with **no** Domain is
processed as `[A]`.

**A dual-domain card's Power cost is therefore easier to pay than a mono-domain card of the same printed
cost** — it accepts either half of the identity. That is real deckbuilding arithmetic the catalogue has
never stated, but it enables no specific line, so it is recorded here rather than forced into an entry.
The obvious candidate, `OGN-248 Icathian Rain` (Fury/Mind, E7 **P3**, six Deal actions), is already
walked as `icathian-rain-annie-ravenborn-six-deal-actions`.

---

# Batch 16 (2026-09-09) — the Baron Pit is a third battlefield, and [Legion] is a replacement

Lane narrowed by rc-manager5 mid-batch from 100–499 to **100–299**; rc-walk-mid
(`8ab9f63f-43c4-447b-bb68-6ff67ca292bc`) takes 300–499. Nothing of mine above 299 was staged — §57
below hands over what I had read there so that lane does not pay for it twice.

Catalogue on resume: **715 entries + 197 synergy rules.** Staging file `/tmp/rc-walks/rc-walk-rules.json`
was emptied first (it held batch 15's two entries, both already merged into `data/combos.json` —
checked by id before deleting).

| id | sub-rules opened | class |
|---|---|---|
| `baron-pit-illaoi-third-battlefield-holds` | **187.9, 187.10, 170.2.a, 170.2.b, 170.3, 170.4, 185.2.e**, 485.4, 471.1.b.1 | ENGINE |
| `noxian-guillotine-recurve-bow-delayed-kill` | **158.2, 137.2, 137.3.a**, 812.1.c, 417.1.a | ENGINE |
| `baron-pit-fae-porter-reach-from-anywhere` | **187.9, 144.4, 144.4.a, 144.4.b**, 144.4.c.1, 449, 449.1 | ENGINE |

`validateCombos` over the merged catalogue: **718 entries, 0 errors.** The two `test/legend-lines.test.ts`
checks replicated over my three entries: **34 legend base codes checked, 0 defects.** Every rule id cited
exists as a heading in the Core Rules (anchored `^[[:space:]]*`, so the 89 form-feed headings are visible)
and every `quote` field is verbatim after whitespace and curly-quote normalisation — script
`.scratch-rules/verify16.mjs`. Legality for all six cards and the `UNL-T01` token checked against
`data/legality.json` on 2026-09-09: none banned, none restricted (the file's one restricted row is
`OGS-019 Wuju Bladesman - Starter`, 2v2, which is not in any of these lists). `node .scratch/have.mjs`
was run on all three card sets before writing; all three returned *"no entry uses that card set or a
subset of it"*. None of the three is a loop-financed twin.

## 52. 187.9 — the pool can put a THIRD battlefield on a Duel table, and this project's "two Scores a turn" ceiling is a setup parameter

`485.4` reads **"Battlefield Count: 2"** and `485.5` places one from each player. That number, read with
`470` (*"A player may only Score, from either method, once per Battlefield per turn"*), is where the
standing claim in `CLAUDE.md` — *two Conquers per turn is the hard ceiling in a Duel* — comes from. It is
a **setup** parameter, not a cap.

`UNL-147 Baron Nashor` (Chaos, E10 P3 M12) prints *"As you play me, add the Baron Pit battlefield token to
the board if it's not there already. If you do, I enter there."* The rules define the token themselves —
**187.9**: *"The Baron Pit battlefield token is a domainless battlefield token with “Units can move here
from anywhere.”"* — and `UNL-T01 Baron Pit` is printed in the pool with its own parenthetical, *"(You can't
start the game with a token battlefield.)"*, so the Baron is the only route to it.

**The tension with 170.2 is real and 002 resolves it.** `170.2.a` *"Battlefields are not played during the
course of regular play."* `170.2.b` *"Battlefields are established at the start of a game and remain in
place for the duration of regular play."* Neither is a prohibition on an effect adding one, and `002` —
*"Card text supersedes rules text"* — settles it either way.

**Once there, nothing in the pool removes it**, and that is three separate paragraphs: `170.3`
*"Battlefields cannot be Killed during the course of regular play."*, `170.4` *"Battlefields cannot be
Moved."*, and `185.2.e`'s worked example, which ends *"Token battlefields and legends can’t be recycled."*
`186.1`'s usual token trap never engages because there is no route to a Non-Board Zone.

**He conquers what he creates.** `369.3` makes his last sentence a Replacement Effect on where he enters;
`190.3.a.1` applies Contested to *"units moving to or being played to a battlefield"*; with no opposing
units `344.2` opens a Showdown at the next Cleanup rather than `323.9` staging a Combat; `348.2.a`
establishes Control and `348.2.a.1` reads *"This results in a Conquer **if that player has not yet scored
that Battlefield this turn**."* — which a Battlefield created this turn has not.

**The price, and who pays it.** `471.1.b.1`: *"If the player has Scored every Battlefield this turn, that
player Gains the Final Point. If the player has not Scored every Battlefield this turn, that player draws a
card instead."* EVERY Battlefield — so with the Pit on the table a **Conquer**-based eighth point needs
three. `471.1.a.1` is the escape: *"Notably, points Gained from sources that are not Conquer are not
beholden to these restrictions"*, and `469` makes Hold a Score that is not a Conquer. **A Hold deck adds
the Pit at no cost whatsoever.**

`VEN-109 Illaoi, Prophet of the Great Kraken` is the partner because `323.6` strips Control from any
battlefield without your units on it, so three battlefields need three garrisons; `471.2.b` triggers her
Hold ability at the battlefield that Held, and `187.10` says what she makes — *"A 1 [M] Tentacle token is a
domainless unit token with 1 Might and the Bilgewater tag."* A 1-Might body is the fragile size (`143.2.a`
against `OGN-133 Flurry of Blades`), and the Baron's own fourth sentence, *"Other friendly units have +2
Might"*, is the fix, board-wide and permanent.

## 53. 187.9 again, from the movement side — the one DESTINATION-shaped movement grant in the pool

`144.4` restricts the Standard Move to two shapes: `144.4.a` *"Units may move from their Base to a
Battlefield."* and `144.4.b` *"Units may move from a Battlefield to their Base."* So battlefield → battlefield
is two turns, because `144.2` makes the exhaust the cost and `415.3.a` returns it only at your own Awakening.
The pool's answer is normally `144.4.c.1` — *"Units with Ganking may use their Standard Move to Move from
Battlefield to Battlefield"* — which `810.1.c.3` scopes to *"only new options for the Standard Move"* and which
is granted **per unit**.

The Pit is granted **per destination**: every unit both players control, no keyword, no cost, permanently.
**Measured 2026-09-09**: a sweep of `data/corpus_flat.txt` for `from anywhere` returns seven rows and only
`UNL-T01 Baron Pit` (plus `UNL-147`'s reminder of it) is about **moving** — the other five are about
**playing** a card from a zone other than hand (`SFD-010 Void Drone`, `SFD-029 Rek'Sai, Breacher`,
`SFD-164 Drag Under`, `VEN-022 Endless Riches`, `VEN-155 Heart of the Tempest`).

`190.6.d` cannot blank it: that paragraph blanks a battlefield's instructions through the word **"you"**, and
the Pit's clause says *"Units"*. It is live while uncontrolled and it serves the opponent too — the entry says
so rather than hiding it.

`SFD-125 Fae Porter` is what makes the leg worth double: his own arrival pays `144.2`'s exhaust, and the unit
he brings moves **by effect** (`449`, whose `449.1` leaves destination legality to the source), which
`420.3.a`'s exhaust cost never touches because that cost belongs to the Standard Move alone (`420.2.b`). Two
bodies for one exhaust and one Chaos Power, and the passenger may come straight off your other battlefield.

**The honest limit, stated in the entry:** the Pit does not multiply moves — `144.2` and `415.3.a` still allow
one a turn per body. It makes each move reach twice as far, which is the difference between a *"when I move to
a battlefield"* payoff firing every turn and every other turn.

## 54. 158.2 — [Legion] REPLACES the earlier instruction, and Riot works the card word for word

**158.2**: *"If a later part of a spell applies a Replacement Effect that alters earlier parts of the spell,
apply those replacement effects as appropriate."* Its worked example is `OGN-254 Noxian Guillotine`'s printed
text: *"A spell says “Choose a unit. Kill it the next time it takes damage this turn.” and “[Legion] — Kill it
now instead. (Get the effect if you've played another card this turn.)” If the Legion condition is satisfied,
the unit is killed immediately and the instruction to kill it the next time it takes damage is ignored, **even
if the unit remains on the board somehow**."*

That last clause is the finding. With [Legion] live, a would-die replacement on the target — `SFD-051 Guardian
Angel`, `OGN-077 Zhonya's Hourglass`, any heal/exhaust/recall shield — eats the immediate kill **and the
delayed one is already gone**. The spell has done nothing.

**And [Legion] is not a choice, it is play order.** `812.1.c`: *"As long as a card different than the one with
the Legion ability has been Finalized by you on the same turn then the Dependent Ability is Active on the card
with Legion."* `812.2` makes one card satisfy every instance you control. Nothing lets you decline it — so
Guillotine **first** in the turn keeps the delayed mode, Guillotine second takes the immediate one.

The delayed mode is a **Might-blind kill**: *"the next time it takes damage"* reads an EVENT, so two points off
a two-Energy gear kill a Might 12 body, bypassing `143.2.a` entirely. `417.1.a` — *"Assigning Damage during the
Combat Damage Step is not Dealing Damage, but will cause Damage to be Dealt when assignment is complete"* —
means combat arms it too.

The existing `noxian-guillotine-legion-bloodless-fork` prices the same fork against `OGN-034 Tryndamere`'s
excess damage and cites **neither** 158.2 nor 812.1.c; the two entries share the forced Darius legend and the
`103.2.d.1` Signature budget, and each names the other.

## 55. 137.2 — a Might Bonus can be +0, and six printings use it

**137.2**: *"A card’s Might Bonus can be +0."* **Measured over `data/cards.json` on 2026-09-09**, the
`mightBonus` histogram over printings is `null: 1149, 0: 6, +1: 12, +2: 14, +3: 6, +4: 2`, and the six zeroes
are named: `SFD-009 Serrated Dirk`, `SFD-016 Recurve Bow`, `SFD-059 Svellsongur`, `SFD-064 Cloth Armor`,
`SFD-153 Eye of the Herald`, `VEN-137 Shady Spectacles`.

A +0 Equipment is the attach that changes **no** combat arithmetic: it never crosses a body over 5 and so never
spends `709`'s once-per-body Mighty event, never enlarges what `465.2.c.4` lets an attacker assign, and never
lifts a carrier out of a Might-gated hiding place. `137.3.a` completes it — the bonus *"stops applying as soon
as the card with the Might Bonus is no longer Attached"* — which for +0 makes losing the gear a Might swing of
nothing. **Note for the Svellsongur family:** `SFD-059` is one of the six, so the 2^v copy machine adds zero
Might of its own; every point of survival on those lines comes from the copied text (`814.2`), never from the
gear.

`137.3.b` (*"If the card to which a card with a Might Bonus is Attached has no Might value, the Might Bonus is
ignored"*) is **dead letter in this pool** and recorded as such: `818.1.b` attaches Equipment to a unit, and
every unit and unit token in the pool has a Might.

## 56. Blocks read and returned EMPTY, with the scope of each refusal

| sub-rule | what it says | why it is empty here, and the scope |
|---|---|---|
| **103.1.b.5** | *"Some Game Effects may allow a player to add cards to their deck irrespective of those cards’ Domains. Those cards are considered part of their deck’s Domain Identity, regardless of their Domain."* | Swept `data/corpus_flat.txt` on 2026-09-09 for `to your deck` / `into your deck`: the only hit is `OGN-235 Karma, Channeler`, whose clause is about **recycling** to the Main Deck, not deckbuilding. **No card in this pool grants an off-domain deck slot.** Scoped to the current pool — the rule is written for a card that does not exist yet, and if one is printed it is a Domain Identity exception. |
| **185.3.b.1** | *"Tokens can have domains appended to them via applied Layer effects."* Riot's example is a hypothetical: *"A card reads in part “As you play this, pick a domain. All units and gear are that domain.”"* | Swept for `pick a domain` / `choose a domain` / `are that domain`: **zero rows**. The example is invented, not a pool card. Scoped to the current pool. The companion `185.3.a.2` (costs appended by a copy effect, Deceiver's Reflection) IS real and already cited by this catalogue. |
| **128.6 / 128.6.a** | *"A player cannot be compelled to perform an action on cards whose privacy is secret or private if that action specifies a type or quality of card."* … *"Ignored instructions are deemed impossible."* | Every opponent-facing compulsion in the pool names a **count** or a **specific card**, never a type — `OGN-192 Mindsplitter` (*"Choose a card from it, and they discard that card"*), `OGN-201 Invert Timelines` (*"Each player discards their hand"*), `UNL-121 Bewitching Spirit` (*"They discard 1"*), `UNL-135 Insightful Investigator` (*"they discard that card"*), `VEN-111 Minah Swiftfoot` (*"Each player discards 1"*). `OGN-244 Divine Judgment` dodges it by **one word**: *"2 cards in their hands"*, a count. `UNL-139 Bone Skewer` dodges it because YOU choose the unit and the instruction on them names *that* unit. Scoped to **compulsions that specify a type or quality**; the paragraph is live the moment a card prints *"discard a spell"* or *"play a unit from your hand"* at an opponent. |
| **194.4 / 194.4.a / 194.4.b** | *"Players cannot have less than 0 points."* … *"Any effects that trigger on a player losing points do not trigger."* | Swept for `lose[s] N point` / `loses points`: **zero rows.** No card in the pool takes a point away from anybody, so the whole floor-at-zero block and its trigger carve-out are unreachable. Scoped to the current pool. |
| **137.3.b** | a Might Bonus attached to something with no Might is ignored | `818.1.b` attaches Equipment to a **unit**, and every unit and unit token in the pool has a Might value. Scoped to **Equipment**; if a set prints an attachment that can ride a gear or a legend, re-read it. |

## 57. HANDOVER TO rc-walk-mid (300–499) — read, not walked, so it is not paid for twice

Nothing below was staged. Each row is a paragraph I opened before the lane split, with what I found, so
that lane can go straight to the line rather than re-deriving the reading.

| paragraph | what it says, and the lead |
|---|---|
| **355.11.b** | A group of targets that no longer collectively fulfils its Targeting Requirement at resolution does **not** fizzle — the controller *"can choose a subset of the original targets that fulfills the targeting requirement"*, and *"They can’t choose to affect units at the same battlefield that weren’t initially chosen as targets."* So the set can **shrink and never grow**: over-target at finalization. Riot's example is `OGN-256 Fox-Fire` by name. **Exactly three cards in the pool are group-targets with a collective Might restriction (swept 2026-09-09): `OGN-256 Fox-Fire`, `UNL-054 Tricksy Tentacles`, `VEN-107 Decree of Discord`.** The sharp half: for a **removal** group-target a subset is partial credit, for an **evacuation** group-target a subset is total failure (`323.6` needs the last body gone) — which is an unstated failure mode of `moonlight-affliction-tricksy-tentacles-evacuation` and `decree-of-discord-megatusk-evacuate-and-gank`. Only `foxfire-unfloored-reduction-sweep` cites 355.11, and only `.11` and `.11.a`. |
| **465.2.c.7** | *"If multiple Units have abilities or effects that require a player to assign them damage with the same priority, that player may assign damage to those units in any order."* Two [Tank] bodies: the **attacker** picks which to kill first but must finish **both** before `815.1.c.2` lets anything else be assigned. So a second Tank BODY doubles the toll even though `815.2` makes a second Tank GRANT on one body redundant — a lever this project records as "the Tank's own Might" only. |
| **377.2.a** | *"If “using” or “playing” an Activated Ability is part of a trigger condition, that condition is fulfilled when the Activated Ability **resolves**."* So `SFD-075 Prize of Progress` never sees an ability that is countered — the `419.4.b` finalized-vs-resolved split, reached from the ability side. `377.2.b` is cited 19 times (R30); `377.2.a` zero. |
| **356.3** | *"Apply cost increases."* — and it is step **3**, before `356.4` *"Apply discounts."* So a discount is measured against the **increased** cost and a flat tax is fully refundable, while `356.4.e`'s per-discount floor means a floored discount lets the tax stick. Touches `mystic-vortex-helm-suppression-tax` (`VEN-045`, `VEN-160`, `UNL-219` are the pool's only three cost-increase rows). Cited zero times. |
| **370.1.b / 370.1.b.1** | *"In the case of Replacement Effects that describe a game action to occur “as” an event occurs, the described event is replaced by that same event plus the game action being performed."* Riot's example is `SFD-175 Undertitan`. This is the paragraph behind the citation upgrade my §H5 already owes the four Undertitan entries for `369.1`. |
| **410.2.a / 410.2.b** | *"A Limited Action is a game action that a spell, ability, or circumstance of the turn's progression causes the player to perform. A player cannot perform these actions at-will."* The unifying paragraph behind Recycle (`416.2`), Damage (`417.3`), Discard (`422.2`), Stun (`423.2`), Prevent (`437.6`), Skip (`443.3`) and Burn Out (`431.4`) — seven blocks that each restate it. |
| **369.2** | *"Some Game Actions are themselves Replacement Effects. Example: Burning Out is a replacement effect. Example: Preventing Damage is a replacement effect."* With `431.5` and `437.4`; `370.2` then caps a Replacement Effect at once per event, so a Burn Out cannot be responded to. |
| **423.1.a.1** | already cited 72 times — the stun family is mined, do not spend a walk there. |
| **373.2.a.1, 394.1, 359.3.e.12.a, 417.6.b.2, 422.2, 437.6, 443.3, 444.1/444.2, 475.1, 478.1/479.2** | opened only far enough to see they are structural or already disposed of by §H3; `478/479` in particular is refused **scoped to the current pool** (no card prints the *"Might increased to N"* passive its examples need). |

## 58. Method note earned this batch

`noclobber` bit twice in one session and both times **silently**: a `cat >` over an existing scratch file
failed with no output, and the second time it left a stale `.ts` that produced a confusing TypeError which
read like a code defect rather than a write that never happened. `set +o noclobber` on the same command line,
every time. This is the third entry in this document's ledger of *an instrument failure that looks like a
finding*.

---

# HANDOFF — rc-walk-blocks, stood down 2026-09-09, resumes Saturday

`/tmp` does not survive a reboot and Saturday is three days away, so this section is the durable copy.
Whoever picks this lane up on Saturday is not me and will have none of my context.

## H8. Lane, issue, staging

- **Issue #187.** Lane: **uncited Core Rules sub-rules 100–299.** rc-manager5 narrowed it from 100–499
  on 2026-09-09; **rc-walk-mid (`8ab9f63f-43c4-447b-bb68-6ff67ca292bc`) owns 300–499** and has already
  been handed my reading of that range (§57 above). **Do not open a paragraph above 299.**
- **Staging file `/tmp/rc-walks/rc-walk-rules.json` is EMPTY.** All three batch-16 entries were merged
  into `data/combos.json` (verified by id against the working tree before emptying, catalogue 722), so
  nothing of mine is unlanded, in `/tmp` only, or in context only.
- Walk document: this file, committed and pushed to `work` through this section.

## H9. Numbers, opened and closed at

- Opened this session at **715 entries + 197 synergy rules**; three entries added in batch 16, catalogue
  at **722** when I stood down (rc-walk-fam1 contributed four of the other rows).
- Cumulative for this lane: **28 entries**, all ENGINE, every one validated.
- Probe state: the filtered sub-rule probe restricted to **100–299** and re-run on 2026-09-09 returns
  **92 rows** whose worked Example names a card from `cards.json`; the manager's wider list (worked
  Example **or** a mechanic verb) is **73 rows** and is reproduced in the batch-16 report. Batch 16
  closed thirteen of them and returned five more empty. The script is `.scratch-rules/subprobe.mjs`
  (`node .scratch-rules/subprobe.mjs 100 299`), which is untracked scratch and may not survive — the
  recipe is in §24 and §28 and takes two minutes to rebuild.

## H10. Refusals, each WITH THE SCOPE IT WAS MADE IN

These are batch 16's; §H3 holds the earlier ones and every scope there still stands.

| sub-rule | refused because | scope of the refusal |
|---|---|---|
| **103.1.b.5** (off-domain deck slots) | swept `to your deck` / `into your deck` over the corpus 2026-09-09; the only hit is `OGN-235 Karma, Channeler`, whose clause is about **recycling**, not deckbuilding | scoped to **the current pool**. The rule is written for a card that does not exist yet; if one is printed it is a Domain Identity exception and reopens `103.1.b` arithmetic everywhere |
| **185.3.b.1** (tokens gaining a domain) | swept `pick a domain` / `choose a domain` / `are that domain`: **zero rows**. Riot's example is invented, not a pool card | scoped to **the current pool**. Its sibling `185.3.a.2` (a copy effect appending a cost to a Reflection) IS real and is already cited by this catalogue |
| **128.6 / 128.6.a** (a compulsion on a private zone that names a type may be ignored, and *"Ignored instructions are deemed impossible"*) | every opponent-facing compulsion in the pool names a **count** or a **specific card**, never a type — `OGN-192`, `OGN-201`, `UNL-121`, `UNL-135`, `VEN-111`; `OGN-244 Divine Judgment` dodges it by one word (*"2 cards in their hands"*); `UNL-139 Bone Skewer` dodges it because YOU choose and the instruction on them names *that* unit | scoped to **compulsions that specify a type or quality of card**. Live the moment a card prints *"discard a spell"* or *"play a unit from your hand"* aimed at an opponent — and 128.6.a's *"deemed impossible"* then hooks straight into `055.1` and `359.3.e.14.b` |
| **194.4 / 194.4.a / 194.4.b** (the floor at zero points and its trigger carve-out) | swept `lose[s] N point` / `loses points`: **zero rows**. Nothing in the pool takes a point away from anybody | scoped to **the current pool** |
| **137.3.b** (a Might Bonus on a carrier with no Might is ignored) | `818.1.b` attaches Equipment to a **unit**, and every unit and unit token in the pool has a Might value | scoped to **Equipment**. Re-read if a set prints an attachment that can ride a gear or a legend |
| **429.3 / 164.2.b** — NOT a refusal, a **false lead I chased and killed** | I believed 429.3 (*"Activated abilities that Add resources and have the Reaction tag can be activated at any time that spells or abilities require resources be paid"*) corrected this project's "the Power must be banked" claim about `SFD-214 Power Nexus`. It does not: **429.3 is already cited 43 times and 164.2.b 231 times**, and `power-nexus-sentinel-renata-mastermind` already recycles runes at the instant of finalization. The CLAUDE.md sentence is about a **Gold minted exhausted by the same Hold**, which genuinely cannot pay, and it is correct as written | recorded so nobody re-derives it. My probe flagged `429.2.b` as uncited, not `429.3` — I read the neighbour and mistook it for the hit |

## H11. The exact next row I would have opened

**`UNL-216 The Academy` + `VEN-008 Ruthless Strike`, on 135.2.b.3 and 204.2.a.** It is half-walked and
was **deliberately DROPPED rather than staged**, because a half-verified entry costs more than a missing
one — no pasted quotes, no legend census run against `cards.json`, no `data/legality.json` check. What
is already established and can be trusted:

- **135.2.b.3**: *"Instructions will self-describe when they are to be executed. If there is no timing
  described, they will execute during resolution."* Its worked example: *"An instruction says “as you
  play me, kill a unit as an additional cost.” That instruction will execute as the card is being
  played. If the card is given Repeat and the Repeat cost is paid, this instruction will not execute
  because the Repeat execution does not happen until resolution of the spell, after this instruction
  has executed."*
- **204.2.a** puts an Additional Cost at finalization, which is what makes the two timings differ.
- **The exploitable asymmetry**: granting [Repeat] to a spell with an as-you-play additional cost pays
  that cost **ONCE** and executes the resolution effect **TWICE**, and `820.2.a` lets the second
  execution choose different objects while `820.1.b` caps it at exactly one extra.
- **The family, swept over `data/corpus_flat.txt` on 2026-09-09 — eight spells, all named**:
  `OGN-048 Meditation` (Calm E2, cheapest: exhaust one friendly unit, draw 2 twice),
  `OGN-146 Wallop` (Body E2), `OGN-207 Call to Glory` (Order E3), `UNL-140 Conscription` (Chaos E5 P2:
  spend 5 XP once, steal two units of any Might), `UNL-142 Heedless Resurrection` (Chaos E2 P1: kill one
  friendly unit, reanimate two), `UNL-173 Sacrifice` (Order E1), `VEN-008 Ruthless Strike`
  (Fury E3: discard once, deal 5 twice) and `VEN-083 Rampage` (Body E3).
- **135.2.b.3, 135.2.b.5, 135.2.b.6, 204.1.b, 204.2.a, 204.4.a, 204.4.c, 109.2, 117.1 and 133.6.b.1 are
  all cited ZERO times** (measured over `combos.json` + `synergies.json`, 2026-09-09).
- **`node .scratch/have.mjs` was already run on the candidate pairings**: `UNL-216` with each of
  `VEN-083`, `VEN-008`, `UNL-173`, `OGN-146`, `UNL-140` returns *"no entry uses that card set or a
  subset of it"*. **`UNL-216` + `UNL-142` returns CONTAINS `heedless-resurrection-removal-blank`**, a
  single-card entry — so that pairing would be flagged by the hardened merge and needs declaring, which
  is why Ruthless Strike is the pick.
- Cross-references the entry must carry: `academy-ezreal-gust-double-bounce` (the Academy's [Repeat]
  grant, which cites `820.x` but not `135.2.b.3`) and, if Rampage is ever used instead,
  `carnivorous-snapvine-rampage-tank-bypass`.
- The Academy is a battlefield, so `485.4.a`, `485.5` and `103.4.c` belong in `prerequisites.notable`:
  one of your three is selected **randomly**, and you must **Hold** it (`315.2.b.2`) before it grants
  anything.

## H12. Leads found and not walked, in priority order

1. **152.2** — *"Non-Unit Gear cannot normally become located at a Battlefield unless by some special
   means"*, and Riot's example names all four routes: an effect that specifies otherwise, a
   **[Hidden]** play (which enters at the battlefield it was played from), riding an attached carrier,
   or being a gear that is a unit. The sweep I started and did not finish: **non-Equipment gear whose
   text says "here"** is dead at your base unless one of those four is used. My first grep returned
   nothing, which is a **surprising absence and must be re-run with a different instrument** before it
   is written down — the corpus renders tags as `[Tags: ...]` and my exclusion may have eaten the rows.
2. **191.3.d** — *"That player may make decisions about any game effects created from “When you play me”
   effects of Permanents"*, read with 191.1 and 191.3: a card that makes an **opponent** play a unit
   hands **them** the ETB. `UNL-139 Bone Skewer` should therefore pick the unit with the worst ETB for
   them, not the biggest body. Probably a notable on the existing Bone Skewer entries rather than an
   entry of its own.
3. **465.2.c.7**, **377.2.a**, **356.3**, **370.1.b**, **410.2.a/b**, **369.2** — all above 299 and all
   handed to rc-walk-mid in §57. Do not re-read them.
4. **141.1.b.3** (*"Units can be affected by spells and game effects that target Units in the Trash"*)
   with **141.2.b** (*"The card type is relevant in all zones"*) is tempting and **I deliberately did
   not touch it**: whether a printed *"I can't be chosen"* static functions from the trash is not
   settled by these paragraphs alone, and guessing there is how an unruled reading gets filed. It needs
   `720`/`723` read first, and `723` is above 299.
5. **135.2.e.7.a / 135.2.e.7.b** — the `[>]` notation scopes a keyword to whatever follows it, which is
   how `[Action][>]` on one ability of a unit fails to make the unit itself Action-speed. Marginal, and
   `806.1.c.2` may already cover it.

## H13. One habit that paid and one that cost, this session

- **Paid: running `node .scratch/have.mjs` the moment I knew a card set, not after writing.** It cost
  seconds and it is what caught `UNL-216` + `UNL-142` containing an existing single-card entry.
- **Cost: `noclobber` bit twice, both times SILENTLY.** A `cat >` over an existing scratch file failed
  with no output, and the stale file it left produced a TypeError that read like a code defect rather
  than a write that never happened. `set +o noclobber` on the same command line, every time. Third
  entry in this document's ledger of *an instrument failure that looks like a finding* — the others
  being the form-feed `grep` anchor and rule 766's second worked example.

---

# Batch 17 (2026-09-12) — where a cost SITS decides when it is paid, and the Facedown Zone is priced in Control

Resumed from §H8–H13 after the Saturday pause. Catalogue was at **727 entries + 206 synergy rules** on
resume; the staging file `/tmp/rc-walks/rc-walk-rules.json` was `[]`, exactly as §H8 promised. Lane
unchanged: **uncited Core Rules sub-rules 100–299**, issue #187. Four entries, all ENGINE, all validated.

| id | sub-rules opened | class |
|---|---|---|
| `academy-ruthless-strike-cost-once-effect-twice` | **135.2.b.3**, **204.2 / 204.2.a**, 820.1.d.2 | ENGINE |
| `bone-skewer-vex-opponent-play-scheduler` | **191.1 / 191.3 / 191.3.c / 191.3.d** | ENGINE |
| `blood-rose-insightful-investigator-cost-at-resolution` | **204.1.b / 204.3.a / 204.3.b** | ENGINE |
| `mushroom-pouch-smoke-and-mirrors-facedown-tenure` | **107.3.a–d**, **152.2**, **190.4.b** | ENGINE |

`validateCombos` over the merged set: **731 entries, 0 errors.** Legend-line check: **0 defects** (after a
repair, below). Rule-reference audit: **195 references, 0 missing** as headings in either rules file, with
the form-feed-safe anchor. Quote audit: **22 quoted passages, 0 fragments not found verbatim.** Legality
for all eight cards checked against `data/legality.json` on 2026-09-12 — none banned, none restricted.

## 59. 135.2.b.3 — Riot's own example of the Repeat asymmetry, and it says "if the card is GIVEN Repeat"

The paragraph is short and the example is the whole finding:

> **135.2.b.3.** Instructions will self-describe when they are to be executed. If there is no timing
> described, they will execute during resolution.
>
> *Example: An instruction says “as you play me, kill a unit as an additional cost.” That instruction
> will execute as the card is being played. If the card is given Repeat and the Repeat cost is paid,
> this instruction will not execute because the Repeat execution does not happen until resolution of
> the spell, after this instruction has executed.*

"If the card is **given** Repeat" is Riot describing a grant, and in this pool the only card that grants
[Repeat] to a spell that does not print it is `UNL-216 The Academy`. **135.2.b.3 and 204.2.a are cited by
no entry and no synergy rule** (measured over `combos.json` + `synergies.json`, 2026-09-12).

The general form is `820.1.d.2` — *"Any instructions not performed on resolution of the spell or ability
are ignored."* — and `820.1.d.1`'s model is what removes the ambiguity: it duplicates the text **in
place** (*"as though the card says “Play a 2 [M] Sand Soldier unit token. Play a 2 [M] Sand Soldier unit
token.”"*) rather than replaying the card, so the payment is never re-asked and never un-made.

**The family, swept over `data/corpus_flat.txt` on 2026-09-12 — exactly EIGHT spells carry an as-you-play
additional cost**, and it splits in two:

| card | domain / cost | reads the payment back at resolution? |
|---|---|---|
| `OGN-048 Meditation` | Calm E2 | **yes** — *"If you do, draw 2. Otherwise, draw 1"* → four cards for one exhaust |
| `UNL-140 Conscription` | Chaos E5 P2 | **yes** — *"If you paid the additional cost, choose any enemy unit at a battlefield instead"* → 5 XP once for TWO unrestricted steals, the biggest swing in the family |
| `VEN-008 Ruthless Strike` | Fury E3 | **yes** — *"deal 5 to it instead"* → 10 damage for one discard |
| `VEN-083 Rampage` | Body E3 | **yes** |
| `OGN-146 Wallop` | Body E2 | no — the buff zeroes the COST, not the effect |
| `OGN-207 Call to Glory` | Order E3 | no — same shape |
| `UNL-142 Heedless Resurrection` | Chaos E2 P1 | no — mandatory cost, unconditioned effect (still a gain: kill one body, reanimate two) |
| `UNL-173 Sacrifice` | Order E1 | no — mandatory cost |

Ruthless Strike was picked over Conscription because it needs no XP faucet and constrains the legend by
one domain; `node .scratch/have.mjs UNL-216 UNL-142` reports **CONTAINS `heedless-resurrection-removal-blank`**,
which is why that pairing would need declaring.

The price is stated in the entry and is easy to miss: **820.2** makes both executions' choices at the
*Make Relevant Choices* step of **playing**, so the two targets are locked before anything resolves.

## 60. 204.3.a against 204.3.b — POSITION inside the trigger decides finalization or resolution

This catalogue says repeatedly that a cost written at the start of a Triggered Ability's effect is its
BASE cost, paid at finalization. That is true and `204.3.a` is the cleanest source (worked example:
Overzealous Fan). **What the project has been missing is the other half:**

> **204.3.b.** When Costs within Instructions appear in spells, activated abilities, or in later parts of
> triggered abilities, the cost must be paid to get the effect during resolution of the spell or ability.

`204.3` is cited 32 times; the *"later parts"* clause has never been used, and `204.1.b` and `204.2.a` are
cited zero times. Riot's third worked example for `204.3.b` names a pool card:

> *Example: Insightful Investigator is a unit that reads “When you play me, choose an opponent. They
> reveal their hand. You may pay 2 XP to choose a card from their hand. If you do, they discard that card
> and draw 1.” As the ability resolves, its controller may pay 2 XP as a cost, and chooses a card from
> that player’s hand as the effect.*

**Why it matters beyond the one card.** This document and `CLAUDE.md` record, from three separate rules,
that a resource produced by another trigger of the *same event* can never fund a `383.3.b` / `204.3.a`
base cost — `383.3.b.1` demands payment at finalization and `312.2.c` hands out no priority in between.
`204.3.b` is the shape where it **does** work: three `UNL-109 Blood Rose` (*"When you play a unit, you may
pay 1 Energy to gain 1 XP"*, no exhaust anywhere in the clause) put three triggers on the Chain beside the
Investigator's own; place the Investigator's **first** so `340.1` resolves it **last**, and its 2 XP comes
out of XP that did not exist when the trigger was placed.

The test is word order, exactly as `383.2.a.1`'s is for a condition (§50). Same sentence, different
position, different timing.

## 61. 191.3.d — the body you drag out of their hand is THEIRS as it enters

> **191.1.** When a player Plays, Hides, or Creates a Card or other Game Object, they are established as
> that Game Object's Controller.
> **191.3.** For Permanents and Runes, when they Enter the Board, that player is assigned as that Game
> Object's Controller.
> **191.3.d.** That player may make decisions about any game effects created from "When you play me"
> effects of Permanents.

`191.3.c` and `191.3.d` are cited by nothing. `UNL-139 Bone Skewer` says *"**They** play that unit to that
battlefield"*, so the opponent is its Controller, its enters-the-board trigger fires **for them**, and
**they** choose its targets. The obvious play — take their biggest body — can hand them a free ETB aimed
at you; the right pick is the unit whose ETB is worst for them or absent.

**The constructive half.** Swept 2026-09-12: exactly **two** cards watch an opponent playing something —
`UNL-150 Vex, Apathetic` (a unit) and `VEN-102 Ravenbloom Prefect` (a gear) — and exactly **three** make an
opponent play something: `UNL-139 Bone Skewer` (a unit out of their **hand**), `UNL-130 Walking Roost` (a
Bird **token**, which still fires Vex because `185.2.b` makes a token unit a unit) and `SFD-081 Card Sharp`
(a Gold gear token each). Without one of those three, Vex fires only when the opponent chooses to act.

Two things the entry states that a reader would otherwise get wrong: the **two stuns are redundant**
(`423.1.a.1`, whose worked example is Eclipse Herald and says outright that a second stun fires no
payoff), so the marginal value is Vex's *"They can't move it this turn"*; and the stun expires at step 3d
of **your own** cleanup (`423.1.a.2`), so it only ever matters inside the turn you played Bone Skewer.

**One refusal recorded rather than walked:** `SFD-081 Card Sharp` → `VEN-102 Ravenbloom Prefect` does fire
(a Gold *is* a gear played by an opponent), but the Prefect's cost is *"you may banish me to banish it"* —
a 3-Energy body spent on a token `186.1` would annihilate anyway — and the domains are split. Refused on
arithmetic, not on rule.

## 62. 107.3 — the Facedown Zone is priced in Control, and 190.4.b is the one window that freezes it

The whole of `107.3` was reachable and only half-used: `107.3.c` and `107.3.d` are cited **four** times
each, both times from the *denial* side (`warden-saboteur-hidden-lock`, `warden-tianna-base-lock`), never
as the cost of your own hidden card. `107.3.b.2` is cited zero times.

> **107.3.c.** Cards can only be placed in or **occupy** the Facedown Zone if the controller of the card
> also controls the associated Battlefield.
> **107.3.d.** If a player loses Control of a Battlefield, any cards in the Facedown Zone associated with
> that Battlefield are removed during the next Cleanup.

The word is **occupy**: Control is a continuing requirement, not an entry condition. This project has been
deriving it from the tail of `811.1.b`, which says the same thing for `[Hidden]` alone.

**And `190.4.b`, cited by nothing, is the exception:**

> While a Combat or Showdown is ongoing at a Battlefield, Control of that Battlefield cannot change until
> instructed by steps of the Combat or Showdown.

So a facedown card at the battlefield under attack is safe for the whole fight — your hidden `[Action]`
removal is live inside the very combat that threatens it (`464.2.f.1`, `464.2.g`), and a hidden
`[Reaction]` card is live in every Closed State it opens (`813.1.c.1`). You never lose the card before you
get to use it.

**The anti-synergy, exact and previously unstated:** the evacuation family works by walking your last body
off a battlefield so `323.6` strips your own Control in an Open State — and `107.3.d` throws away any
facedown card there at that same Cleanup. A `[Hidden]` package and an evacuation package want opposite
things from the same battlefield.

## 63. 152.2 — the surprising absence from §H12 lead 1, re-run with a different instrument and CONFIRMED

§H12 flagged this as *"a surprising absence and must be re-run with a different instrument before it is
written down"*. It has been. The first sweep was over the rendered text lines of `data/corpus_flat.txt`;
the second was over `data/cards.json` **fields** (`type`, `tags`, `text`, `effect`), deduped by base.

Both return the same number. Over the pool: **114 gear base codes, 40 Equipment, 74 non-Equipment — and
ZERO non-Equipment gear has the word "here" in its text or effect.** Widened to `battlefield`, four
non-Equipment gear mention one and none reads its **own** location: `OGN-017 Iron Ballista`,
`OGN-101 Mushroom Pouch`, `OGN-184 The Syren`, `UNL-088 Gutter Palace`. So `152.2`'s rule — that non-unit
gear cannot normally reach a battlefield — **costs this pool nothing: a gear's Location is carefully
defined and no card reads it.** Scoped to the current pool; it becomes live the moment a set prints a gear
whose text says "here".

The one exception 152.2's facedown route could ever use is named: **`OGN-077 Zhonya's Hourglass` is the
only non-Equipment gear in the pool carrying `[Hidden]`.** Its text has no location clause either.

## 64. Blocks read and returned EMPTY or DISPOSED, with the scope of each

| sub-rule | what it says | disposition, and its scope |
|---|---|---|
| **107.4.d.1 / 107.4.d.2** | *"Some effects may add a legend card or token to the Legend Zone. These legends are not Champion Legends."* / non-Champion legends may be removed and can exist only in the Legend Zone or Banishment | **ZERO cards** in the pool add a legend to the Legend Zone (swept `cards.json` text+effect for `legend zone` / `legend token` / `a legend to` / `as a legend` / `second legend`, and independently listed every non-legend card whose text contains "legend" — seven rows, all of which *read* a legend: `OGN-111`, `SFD-039`, `SFD-079`, `SFD-208`, `SFD-210`, `SFD-228`, `VEN-082`). Scoped to **the current pool**; the rule is written for a card that does not exist yet, and printing one would open a second legend's abilities |
| **103.2.b.1** | *"This includes your Chosen Champion."* with Riot's Volibear example | **Real, and already implemented.** `normalizeDeck` keeps the Chosen Champion inside `deck.main` (see the comment at `src/deck.ts:236`, which cites 103.2.b.1 by number), so `copiesRule` in `src/build.ts` already counts it against the cap. No entry and no issue owed |
| **135.2.b.4 / .b.5 / .b.5.a** | how to recognise an instruction; a game action plus its complement, worked on Void Seeker and Teemo, Strategist | **Grammar definitions.** Their one downstream use is that `820.1.d.1` duplicates *all* resolution instructions, which §59 already carries. Scoped to **new lines**; the Teemo example remains the cleanest illustration of a four-instruction trigger |
| **131.1–131.3.b, 132.1–132.3, 138.1, 130.1–130.6, 129.3** | card anatomy and privacy | **Structural.** No mechanic a line can turn on |
| **135.2.e.6.b** | *"A [C] shorthand on a card with no Domain is processed as [A] instead."* | The corpus prints **no colourless rune symbol at all** (`grep -o ":rb_[a-z_0-9]*:" | sort | uniq -c` — the rune symbols are exactly fury/calm/mind/body/chaos/order/rainbow), because `135.2.e.6.a` has a printed `[C]` assume the card's own Domain. So a `[C]` on a domainless object can only arise from a **granted** keyword, and no grant in the pool puts a `[C]`-costed keyword on a domainless object. Scoped to **the current pool**. Its sibling `135.2.e.6.c` was read and disposed in §51 |
| **117.1 / 117.2 / 117.3** (the Mulligan) | set aside up to two, **then** draw that many, **finally** Recycle the set-aside cards | Cited zero times and **real**, but it is a consistency fact and not a card set, so it produced no entry. The order is load-bearing: the draw happens **before** the recycle, so a mulliganed card can never be drawn back in the same mulligan, and `416.1` puts it on the **bottom** — of a 39-card Main Deck (`103.2.a.1` removes the Chosen Champion first), i.e. effectively out of the game. Worth carrying wherever this project reasons about opening consistency |
| **190.3.d** | *"At this time Game Effects cannot reference this status."* (Contested) | A hard negative worth knowing: **no card can read Contested.** This catalogue reasons through Contested constantly and always via its consequences (`323.9`, `344.2`, `464.2.c.1`), which is correct — `190.3.d` says a card may never read it directly |

## 65. Citation upgrades owed to existing entries — NOT applied, this lane does not own `data/combos.json`

1. **`cruel-patron-zhonyas-cost-paid-without-the-death`** (my own, batch 15) should also cite **203.2** —
   *"The Cost is still considered paid even if the associated game action is replaced."* It is the
   **general** statement of `357.2.a`, it is cited by nothing, and it is one sentence.
2. **Every entry standing on "you may put any number of your units at one battlefield"** should cite
   **170.6** — *"Any number of Units can be present at a Battlefield."* `CLAUDE.md` derives that from
   `144.4.a.1` + `447.2.a`'s "more than two players" clause; `170.6` states it outright and is uncited.
3. **The ALT_WIN entries** should carry **194.2.a** — *"If more than one player has points greater than or
   equal to the Victory Score, whichever player has more points wins."* `194.2` and `194.2.b` are already
   cited; `194.2.a` is the tiebreak sentence between them and is uncited.
4. **The trash-trigger and theft entries** should carry **191.4.a.1** — *"If an Ability's Source is located
   in a non-Board Zone, the Ability's Controller is the Owner of the Source."* This is the controller-side
   companion to `385.1` / `385.2` and to `056` / `056.2`, and it is uncited.
5. **`mageseeker-investigator-mass-move-tax`** — §H5 item 1 still stands and is still unapplied: it should
   cite **204.4** and **429.3**.

## 66. Two method notes earned this batch

- **`node .scratch/have.mjs X` answers "is my candidate set a SUPERSET of an existing entry", not "which
  entries use card X".** Its message — *"no entry uses that card set or a subset of it"* — is literally
  true and reads like the second question. `have.mjs UNL-216` returned it while `academy-ezreal-gust-double-bounce`
  plainly uses `UNL-216`, which looked for a minute like a broken tool and is not: the entry also uses
  `SFD-149`, which was not in my set. Use it for the dedupe question it was written for, and grep
  `combos.json` for the coverage question.
- **The pool writes one event two ways and a single predicate misses cards.** A sweep of
  `face ?down` over `cards.json` returns nine rows and **does not** include `OGN-167 Ember Monk`, which
  prints *"When you play a card from [Hidden]"* for the same event. The first version of the Mushroom
  Pouch entry's census was one card short because of it, and was corrected before staging. Same shape as
  the `[Hunt` / `\[Hunt\]` trap and the bracket-less `Hidden` on `SFD-138 Windsinger`.

## 67. One repair the tests caught, worth stating because the brief warned about it

All four entries were written with the standing legality sentence *"…data/legality.json's only non-banned
row is **OGS-019** Wuju Bladesman - Starter, restricted in 2v2…"*. `test/legend-lines.test.ts` reads any
legend base code in `prerequisites.easy` as **a legend named for the entry**, so all four failed its domain
check (`OGS-019` is Calm/Body; the entries are Fury, Chaos, Body/Chaos and Mind). The base code was
stripped and the sentence kept in prose. This is the tension `CLAUDE.md` records between two standing rules
— check every legality claim against the file, but never write that row's base code into a legend field —
and it bit four times in one batch, so it is worth checking **before** staging, not after.

---

# HANDOFF — 100–299 is UNOWNED as of 2026-09-12

`rc-walk-blocks` was redirected onto **500–829** by rc-manager5 after batch 17, because that range was
unowned and this one is definition-heavy. **Nobody owns 100–299 now.** This section is what the next
session should not have to rediscover. Batch 18 onward lives in
`docs/phase0/walks/2026-09-07-uncited-subrules-500-899.md`.

## H14. Density, measured rather than asserted

`.scratch-rules/subprobe.mjs 100 299` (Example-filtered, example must name a card from `cards.json`)
returns **31 rows** at catalogue 727. `.scratch-rules/wide17.mjs` (the same probe with the Example filter
replaced by a mechanic-verb filter) returns **164 rows, of which 35 carry an Example**. Both scripts are
untracked scratch on this machine and are ten lines each; the recipes are §24, §28 and §64.

Of the 31 Example-filtered rows, batch 17 disposed of **every one**: four became entries, and the rest are
refused, structural or already implemented, each with its scope in §64. **The Example-filtered probe for
100–299 is therefore SPENT**, exactly as §14 of the other lane reports for 500–829. What is left is the
164-row verb-filtered list, and its density is low: batch 17 had to reach into **107 (Facedown Zones),
152 (gear Location), 190 (Control) and 191 (Controller)** to find mechanics at all, because 103–138 is
card anatomy and 133–139 is grammar.

## H15. The four blocks in 100–299 that still carry mechanics, in priority order

1. **190.3.b.1 and 190.4.b** — partly spent by batch 17 (`190.4.b` is now cited by
   `mushroom-pouch-smoke-and-mirrors-facedown-tenure`). `190.3.b.1` (*"If a player who applied Contested
   status to a Battlefield controls no Units there and there is no ongoing Showdown or Combat at that
   Battlefield, then Contested status is removed in the following Cleanup"*) is **still uncited** and is
   the Contested-status half of the evacuation family that this catalogue builds out of `323.6` and
   `323.10`.
2. **107.3.b.1 / 107.3.b.2** — the Facedown Zone's maximum occupancy can change, and the excess goes to the
   **trash**. `107.3.b.2` is uncited. No card in the pool changes the occupancy, so it is currently empty —
   but `107.3.b.1` is cited twice, so somebody has already reasoned near it.
3. **184.2 and 184.3** — both uncited while `184.1` is cited seven times. `184.2` (*"The effect may restrict
   the location to which the token may be played"*) is the paragraph that **authorises** the "play a token
   here" / "to your base" split which #48's whole walk-to-the-battlefield finding rests on, and this project
   sources all of it to `355.2.a`. `184.3` (*"The effect may grant temporary abilities or modifications to
   the token"*) is the token-creation side of every `[Temporary]` grant, sourced here to `816.1`. Both are
   citation upgrades to heavily-used findings rather than new lines.
4. **199 / 199.1 with 171** — *"A Game Object that comprises a Location is also a Game Object at that
   location. A Battlefield is both a location and also a Game Object at that location."* against
   *"Battlefields are not Permanents."* Both uncited. The split is exact and **measured empty**: `grep` over
   `cards.json` shows **ZERO cards in the pool use the word "permanent"**, and exactly three say
   "something" (`VEN-082 Profiteer`, which types its targets anyway; `VEN-099 Tornado Warrior`, *"empower
   something here"*; `VEN-158 Heisho`, *"choosing something here"*). Tornado Warrior may therefore legally
   Empower the **battlefield** — and it is worth nothing, because **zero battlefields carry `[Empowered][>]`
   or any Empowered-gated text** (32 base codes carry `[Empowered][>]`: 30 units, 2 legends, 0 gear, 0
   battlefields, measured 2026-09-12).

## H16. Read and disposed in batch 17, do not re-open

`103.1.b.5`, `185.3.b.1`, `128.6`, `194.4`, `137.3.b` (§56) · `103.2.b.1`, `107.4.d.1/d.2`, `117.1–117.3`,
`135.2.b.4/.b.5/.b.5.a`, `135.2.e.6.a/b/c`, `131.x`, `132.x`, `138.1`, `130.x`, `129.3`, `190.3.d`, `152.2`
(§63, §64). Each carries its scope where it is recorded; a refusal is only as wide as its reason.

**`135.2.e.7 / .7.a / .7.b` is the one row in 100–299 that batch 17 found, could not turn into an entry
here, and which IS now load-bearing elsewhere.** *"Whatever instruction or ability comes after the [>] is
modified by the keyword that comes before the [>]"* — so a permissive keyword behind an arrow belongs to
that ability alone and never to the card. Measured: **81 uses of `[>]` in the corpus across nine keyword
forms** (30 `[Empowered]`, 11 `[Reaction]`, 11 `[Deathknell]`, 9 `[Level 6]`, 8 `[Action]`, 6 `[Level 3]`,
4 `[Level 11]`, 1 `[Level 16]`, 1 `[Legion]`), so **19 cards carry a permissive keyword behind an arrow and
are NOT themselves playable at that speed.** It is cited, with that measurement, by
`mystic-vortex-overt-operation-taxes-the-answer` in the 500–829 lane. A 100–299 session could still build
an entry on it, but it should check that one first.
