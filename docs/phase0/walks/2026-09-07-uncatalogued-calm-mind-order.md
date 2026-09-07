# The uncatalogued Calm / Mind / Order cards

Issue [#174](https://github.com/GermanAbuArab/RiftCombo/issues/174). Session `rc-walk-fam2`, 2026-09-07.

## 0. The census, and a correction that applies to all four lanes

**Coverage has to be keyed on name + type, not on base code.** CLAUDE.md's own measurement is that *104 of
the pool's 935 names carry two or more base codes*, and `CardIndex.equivalents()` (`src/cards.ts:124`)
resolves a base code to every printing sharing its normalised name and type. A reprint of a catalogued card
is therefore **not** an uncatalogued card, and walking it would produce an entry the matcher already covers.

A base-code census of this lane returned 182 rows. A name-keyed one returns **154** — twenty-eight of them
were reprints (`SFD-224` Aphelios, Exalted is `SFD-049`; `SFD-226` Seal of Focus is `OGN-081`; `SFD-225`
Irelia, Fervent is `SFD-057`; `VEN-170` Shen, Scourge of Shadows is `VEN-042`, already walked in
`shen-duo-mutual-hold`). That is a ~15 % over-count, and the same correction applies to the Fury/Body/Chaos
lane and the battlefield/legend lane.

`.scratch/uncat-cmo.mjs` does it this way and carries the reason in a comment. Re-run at the start of every
batch; the catalogue moves under the lane while the lane is being walked.

| domains | uncatalogued by name (catalogue at 450) |
|---|---|
| calm | 65 |
| order | 45 |
| mind | 39 |
| calm/mind | 2 |
| mind/order | 2 |
| calm/order | 1 |
| **total** | **154** |

Method as in the matrix walks: one entry per MECHANISM with its best partner; a wide family recorded below as
a **synergy-rule lead** with its predicate rather than as a dozen near-identical rows; card text verbatim from
`data/corpus_flat.txt`; every rules paragraph opened and quoted where load-bearing; `data/legality.json`
checked before a card is walked; every refusal carrying the paragraph that kills it.

---

## 1. Batch 1 — five entries, and three of them are cards the Core Rules use as their own examples

| id | cards | the rule it turns on |
|---|---|---|
| `sacred-protector-disciple-of-shen-pair` | VEN-129 + VEN-117 | *"exactly one other unit you control here"* is symmetric: each is the other's one other unit |
| `whiteflame-last-stand-zhonyas-double-might` | OGN-082 + OGN-069 + OGN-077 | **477.3.c**'s worked example IS Last Stand, and **808.1.d.1**'s IS a Zhonya's Hourglass save |
| `taric-block-stalwart-poro-shield-stack` | OGN-074 + OGN-052 ×3 + OGN-057 ×3 | **814.2**'s worked example IS Stalwart Poro under Block |
| `eclipse-soul-harvest-unfloored-gate` | UNL-063 ×3 + UNL-159 ×3 | 143.2.b, and the floored/unfloored distinction corrected |
| `kayle-justified-aurok-general-triple-empower` | VEN-134 + VEN-130 | **441.1.c.1**, whose only user in the pool is Kayle |

Eleven cards, every one of them in no entry before this batch.

### 1.1 441.1.c.1 has exactly one user, and its printed marker is an OMISSION

**441.1.b** *"An Empowered Game Object can not be Empowered."* · **441.1.c** *"If a Game Object is instructed
to be Empowered when it is already Empowered, nothing additional happens."* · **441.1.c.1** *"Some effects may
grant a Game Object permission to be Empowered multiple times. Such an effect ignores this restriction."*

Swept over the whole corpus with `grep -inE "empowered (up to|more than|any number|multiple)|can be \[?empowered\]? "`
→ **one row**: `VEN-134 Kayle, Justified`, *"I can be [Empowered] up to three times."*

The marker on the card is invisible to a keyword grep: Kayle's reminder text reads `(:rb_energy_3:: Empower
me.)` and **omits the "Use only if not Empowered" clause that every other [Empower] card in the pool prints**.
A sweep for the permission has to look for the sentence, not for the absence.

Companion sweep, `grep -inE "units that are \[?Empowered|your \[?empowered"` → **one row**:
`VEN-130 Aurok General`, the only card whose payoff reads a board of Empowered units.

**441.3** makes Empowering a Limited Action, and **410.2.a** defines that as *"a game action that a spell,
ability, or circumstance of the turn's progression causes the player to perform. A player cannot perform these
actions at-will"* — an instruction requirement, **not** a per-turn cap. All three of Kayle's Empowers fit in
one Main Phase.

### 1.2 A correction the walk made to its own first reading: the Might floor does not change the kill gate

The project's standing note is that the nine Origins reductions carry *"to a minimum of 1"* and the fourteen
from SFD/UNL/VEN do not. True — but the consequence is narrower than it looks. A floored reduction sends M to
`max(1, M − 4)`; an unfloored one to `M − 4`. **For a "3 Might or less" gate the two are identical at every
M ≥ 5**, because `max(1, M−4) = M−4` there. `OGN-093 Smoke Screen`'s floored −4 opens exactly the same
seven-Might window `UNL-063 Eclipse` does.

Where the floor actually bites:

- **In a combat sum.** 465.2.c sums each side's Might; a floored −4 leaves a 4-Might body contributing 1,
  Eclipse leaves it contributing 0 — **143.2.b**, *"If a unit's Might is ever less than 0, it is treated as 0
  when referenced by spells and abilities, and when summing Might to be assigned as damage."*
- **In later arithmetic.** **143.2.b.1**, *"Although the unit's Might is treated as 0, it is not 0. Effects
  that calculate Might increases and decreases use the actual value"* — a body Eclipsed to −1 needs five Might
  of pumping to reach 4, and this is exactly why 477.3.c's worked example has Eclipse blank a Last Stand.

Stated on the row so the next session does not re-derive the wrong distinction.

### 1.3 The asymmetric timing that decides the removal pair

**813.1.b** — *"Reaction grants the corresponding card or effect all abilities and permissions of Action."* —
so Eclipse reaches a Showdown on either turn. `UNL-159 Soul Harvest` carries neither keyword, and **155** says
*"A spell can be played during an Open State outside of Showdowns on its controller's turn."* So the pair
executes in **your own Main Phase**, Eclipse first, kill second, inside the turn the −4 lasts (317.2.c). You
cannot open the gate inside the opponent's attack and finish it there.

### 1.4 Two more numbers worth keeping

- **477.3.e.1.a** (*"Positive values, or increases, to Might are applied first"*) with **480.3** (timestamp
  order inside a layer) makes the ORDER of two pumps worth eight Might on the Whiteflame line: its own +8
  first, then Last Stand doubling the current 16 → 32. Last Stand first would be 24. 477.3.c is explicit that
  the doubling is an *"increase … by its current amount"*.
- **814.1.b.3** (*"If X is omitted, it is presumed to be 1"*) with **814.2**: a Stalwart Poro beside Taric is
  Shield 2 and defends at 4 for two Energy; add Block and 814.2 sums all three instances to Shield 5, i.e. 7
  on defence. **814.1.c** is why none of it exists on offence.

---

## 2. Synergy-rule leads from this batch (predicates, not entries)

Recorded here rather than written as a dozen near-identical rows. Each carries the predicate a rule would use
and the false positives a reader has to exclude.

1. **The "exactly one other unit" family.** Predicate: `/exactly one other unit you control/` plus
   `/exactly two units/`. Members: `VEN-138` Shen, Leader of the Kinkou Order (scores), `VEN-042` Shen,
   Scourge of Shadows (draws), `VEN-129` Sacred Protector (deals combat damage), `VEN-117` Disciple of Shen
   (Shield 3), `VEN-119` Keeper of Law (a 2 Energy + 1 Order Power discount), `VEN-027` Hand Hammer (Calm
   Equipment, +2 Might). Six cards, one condition, and the Disciple is the only member that PAYS ITSELF for
   satisfying it — which makes it the correct second body for all five others. **False positive to exclude:**
   a token counts (185.2.d), so any token faucet in the deck breaks every member at once.
2. **The Might-gate family.** Predicate: `/with [0-9]+ :rb_might: or less/` on a kill/banish/bounce/steal
   clause, anchored to the reductions. The Calm/Mind/Order half: `UNL-159` Soul Harvest and `VEN-127` Lacerate
   (gate 3, spells), `SFD-158` Sandshifter (gate 3, on a body), against `UNL-063` Eclipse, `OGN-093` Smoke
   Screen, `OGN-097` Blastcone Fae, `OGN-090` Orb of Regret (repeatable, once a turn, floored),
   `SFD-067` Frostcoat Cub and `UNL-065` Icevale Archer. **False positive to exclude:** a reduction whose
   floor is *"to a minimum of 1"* is NOT weaker for the gate (see §1.2) — a rule that separates them on that
   basis would be wrong.
3. **The granted-[Shield] family (814.2).** Anchors: `OGN-074` Taric, Protector (board-wide grant) and
   `OGN-057` Block (Shield 3 + Tank, [Hidden], [Action]). Partners: every unit with a printed `[Shield]` —
   `OGN-052` Stalwart Poro, `OGN-054` Sunlit Guardian, `OGS-005` Zephyr Sage, `UNL-036` Mutated Mouser
   (Shield 2), `OGN-241` Shen, Kinkou (Shield 2), `VEN-117` Disciple of Shen (conditional Shield 3),
   `SFD-055` Needlessly Large Yordle (Shield 5). **False positive to exclude:** `UNL-041` Allay, Eager Admirer
   grants [Deflect], not [Shield] — it sums with nothing and changes no Might.
4. **The "alone" family.** `OGN-055` Wielder of Water (*"While I'm attacking or defending alone, I have
   +2 :rb_might:"*), `OGN-060` Mask of Foresight (*"When a friendly unit attacks or defends alone, give it
   +1 :rb_might: this turn"*), `UNL-221` Lonely Poro (*"[Deathknell] If I died alone, draw 1"*). **False
   positive to exclude:** `UNL-156` Loyal Poro is the INVERSE — *"If I didn't die alone, draw 1"* — and is
   anti-synergic with the other three; and "alone" is an own-side measurement (the project's #116 finding,
   from Lonely Poro's own reminder text), so an enemy garrison does not break it.

---

## 3. Batch 1 validation

`validateCombos` over the merged copy: **0 errors / 471 entries**. The two `test/legend-lines.test.ts` checks
replicated over the staged entries: 4 legend base codes checked, clean. No duplicate id and no duplicate
sorted `uses[]` card set.
