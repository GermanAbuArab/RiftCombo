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
