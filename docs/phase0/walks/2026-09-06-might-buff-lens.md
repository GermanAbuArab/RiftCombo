# Hand walks — the buff and Might lens (issue #97)

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16
**Result: 5 walked, 5 HOLD — 1 as written, 4 only after a rewrite. 0 refuted.**
**No INFINITE, no BURST, no CHAIN, no ALT_WIN. The hunt's structural claim (S7) survives.**

All five are ENGINE, so the bar is *"the mechanism produces what the entry says"*, not *"reaches 8"*.
Four of the five had an arithmetic or a uniqueness error in the issue and the walk fixes each one
below, with the number that fixes it.

Plus the three refinements the issue asked for, applied to three verified entries — and a fourth the
walk found by itself, because **the issue's candidate 3 is half-catalogued already** and nobody
noticed.

---

## Step 2 done first, in bulk: every citation opened

Every rule number the issue cites and every one the five entries cite was pulled by exact number out
of `data/Riftbound-Core-Rules-2026-07-16.txt` and read there. **All of them say what the issue says
they say.** The issue's rule work is clean; its arithmetic is not.

| cited | verbatim | verdict |
|---|---|---|
| **143.2.b** | *"If a unit's Might is ever less than 0, it is treated as 0 when referenced by spells and abilities, and when summing Might to be assigned as damage in the Combat Damage Step."* | holds |
| **143.2.b.1** | *"Although the unit's Might is treated as 0, it is not 0. Effects that calculate Might increases and decreases use the actual value of the unit's Might."* | holds |
| **142.4.b** | *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit's Might."* Its own second example: *"A unit has 0 [M]. In order to have lethal damage marked on it, it must have at least 1 damage marked on it."* | holds |
| **477.3.b** | *"…it is limited at the time of its application, and is 'remembered' at that limited level for the duration of its effect. This process is called 'snapshotting.'"* Example: *"'-4 [M] to a min of 1 this turn' choosing a unit with 2 [M] … will generate -1 [M]."* | holds — **and it is what refutes the issue's own Thousand-Tailed Watcher arithmetic, see candidate 3** |
| **477.3.c** | *"Players cannot increase a numeric attribute by a negative amount … they increase it by 0 instead."* Worked example is Last Stand + Eclipse. | holds |
| **477.3.e.1.a** / **477.3.e.2.a** | *"Positive values, or increases, to Might are applied first."* / *"Negative values, or decreases, to Might are applied last."* | holds |
| **820.1.b** / **820.1.c.3** | *"…a second time."* / *"Each Repeat Cost can be paid only a single time."* | holds |
| **820.2.a** | *"Choices made for the additional execution do not have to be the same as the choices made for the initial execution."* | holds |
| **702.2.a** / **702.2.b** / **702.3** / **702.3.a** / **703** / **705** | *"To Buff a Unit, a player chooses a Unit and then places a buff on it."* / *"Spending a Buff removes a single Buff counter from a Unit."* / *"There can only be one Buff on a Unit at a time."* / *"…it is not placed instead."* / *"Each Buff individually contributes +1 Might to a Unit."* / *"If a Unit leaves play, remove all Buffs from it."* | holds |
| **709** | *"A Unit 'becomes Mighty' at the moment its Might changes from being less than 5 to being 5 or greater."* | holds |
| **710** | *"Units on the board are evaluated according to their current Might."* | holds |
| **465.2.c** / **465.2.c.3** / **465.2.c.4** | *"…each player assigns an amount of damage equal to their summed Might among the other's Units."* / *"Units must have lethal damage assigned to them in full before damage is assigned to a different Unit."* / *"Units cannot have more damage assigned to them than the minimum required to constitute lethal damage unless no further units remain to have damage assigned to them."* | holds — see the note on the `unless` clause under candidate 4 |
| **155** | *"A spell can be played during an Open State outside of Showdowns on its controller's turn."* | holds |
| **323.6 / 323.8 / 323.9 / 323.10 / 323.12 / 348.2.a / 348.2.a.1 / 471.1** | the evacuation-Conquer chain, identical to `charm-evacuate-conquer` | holds |
| **811.1.b** / **811.1.d.2** | *"…you may pay [A] to hide this facedown at a battlefield **you control**…"* / *"…those targets must be chosen from among options at that battlefield, unless the ability explicitly restricts targeting in a way that makes this impossible."* | holds |
| **485.4.a / 485.5 / 486.5 / 487.5 / 103.4.c / TR 402.1** | one of three battlefields, randomly in Duel and Skirmish, no two of a name | holds |

### Six blocks the catalogue had never cited, and they carry the whole lens

`grep -o` over `data/combos.json` **before** this walk:

- **`143.2.b` — 0 hits. `143.2.b.1` — 0 hits.** The rule that makes a negative Might read as **0** is
  what breaks the four-body ceiling of `ahri-foxfire-might-threshold`. It is the single most
  load-bearing paragraph in this issue and no entry had ever named it.
- **`355.10.d` — 0 hits.** *"It is programmatically selected based on its characteristics rather than
  chosen by the spell or ability's controller."* This is why `UNL-107 Stare Down` does not target the
  enemy units it moves — and therefore why **[Deflect] never taxes it**, while it does tax
  `VEN-154 Public Execution`. That contrast is the sharpest thing in the lens and the issue does not
  have it.
- **`355.11` / `355.11.a` — 0 hits.** *"Some cards identify a group of Targets with Targeting
  Requirements that must be met by the group as a whole."* This is the rule Fox-Fire runs on.
- **`809.1.c` / `809.1.c.1` / `809.1.d` — 0 hits.** Deflect is *"Spells and abilities an opponent
  controls that **target** [me/this] cost an amount of Power equal to [Deflect Value] more"*, and
  809.1.c.1 lets that Power be **any Domain**. Deflect keys on *choosing*, not on being affected.
- **`477.3.c` — 0 hits.** The doubling refutation, with Eclipse in the rules' own example.
- **`359.3.e.7` — 0 hits.** *"If all of an instruction's Targets become Invalid or Unavailable by the
  time the spell begins resolving, that instruction will not execute."* This is the **second** half
  of the Public Execution refutation; the issue only had the first half (355.8, validity at
  finalization).

### Ban check, same pass

All **33 distinct cards** named across the five candidates, the three refinements and every legend
list in this walk were grepped for the `[BANNED` marker in `data/corpus_flat.txt`. **None is banned
or restricted in any format.** The pool has 12 banned rows; the only near-miss is
`OGS-019 Wuju Bladesman - Starter`, `restricted` in 2v2 — it is a Calm/Body legend, so it is
deliberately **left out** of the legend list in refinement 2.

---

## The one measurement the issue got exactly right, re-run

**Only two cards in the pool pump Might through an Activated Ability with no `:rb_exhaust:` in the
cost.** Command: `grep -nE ":: ?(Give|Double)" data/corpus_flat.txt | grep -i might` → 10 rows, and
eight of them print `:rb_exhaust::` (OGN-090 Orb of Regret, SFD-052 Heart of Dark Ice, UNL-001 Arena
Kingpin, UNL-138 The List, UNL-161 Divining Shells, VEN-077 Tools of Empire, VEN-151 Soul's
Reflection, VEN-155 Heart of the Tempest). The two that do not:

- **`VEN-092 Renekton, Brute`** — `:rb_energy_1:: Give me +1 :rb_might: this turn.` — 1 Energy per
  point of Might, linear, uncapped.
- **`UNL-030 Vi, Hotheaded`** — `:rb_energy_2::rb_rune_fury:: Double my Might this turn.` — 2 Energy
  + 1 Fury Power per doubling, exponential.

**378** is why either can be used more than once in a turn: *"The controlling player chooses when and
whether to activate an Activated Ability."* No paragraph in 377–380 caps activations, and neither
card prints a `use only once` clause. The timing is the Main Phase Neutral Open State (312.2.a),
because neither carries [Action] or [Reaction] — 806.1.c.2 and 813.1.c.2 are the keywords that would
have granted the extra windows.

And a second sweep, `grep -niE "double" | grep -i might` → **five** doublers in the pool
(OGN-069 Last Stand, SFD-068 Gearhead, SFD-110 Fiora Peerless, UNL-030 Vi, VEN-142 Dominus). Vi is
the only one that is a repeatable Activated Ability. Both uniqueness claims hold.

---

## Candidate 1 — `renekton-public-execution-gate` · HOLD, rewritten

### The card text, verbatim

```
VEN-092 | Renekton, Brute | Unit | Body | E5 M4 | :rb_energy_1:: Give me +1 :rb_might: this turn.
  When my Might becomes 10 or more, empower me. (I become Empowered if I'm not already.)
  [Empowered][>] I have [Deflect] and [Ganking]. [Tags: Shurima, Renekton]
VEN-154 | Public Execution | Spell | Body/Order | E2 P1 | Choose a friendly unit. Kill an enemy unit
  with less Might than it. [Flow] :rb_energy_5::rb_rune_rainbow::rb_rune_rainbow: (You may play this
  from your trash for its Flow cost. Then banish it.) [Tags: Ambessa]
```

### CORRECTION 1 — "the only removal that reaches the base" is FALSE

The issue's S8 table says `VEN-154` has *"sin cláusula 'at a battlefield': llega a la base"* and the
candidate calls it *"la única remoción que llega a la base"*. The first half is right; the second is
wrong. `grep -niE "kill (an? )?(enemy |friendly )?unit"` over the corpus returns **three more** kills
with no location clause:

| card | domain | cost | gate | reaches the base |
|---|---|---|---|---|
| `OGN-229 Vengeance` | Order | E4 P2 | **none at all** | yes |
| `OGN-234 Harnessed Dragon` | Order | E8 P2, M6 body | none (enemy) | yes |
| `SFD-158 Sandshifter` | Order | E5 P2, M6 body | 3 Might or less | yes |
| `VEN-154 Public Execution` | Body/Order | **E2 P1** | less Might than a friendly unit | yes |

And the ones that are confined to a battlefield, for contrast: `OGN-213 Hidden Blade`,
`OGS-012 Blast of Power`, `SFD-162 Blood Money`, `SFD-164 Drag Under`, `UNL-159 Soul Harvest`,
`UNL-186 Death from Below`, and `VEN-136 Ambessa, Respected and Feared` — whose text the issue's own
table paraphrases without the word that matters: *"When I attack, kill an enemy unit **here** with
less Might than me."*

**The claim that survives, and it is still the entry's point:** `VEN-154` is the **cheapest** removal
in the pool that reaches the base (2 Energy + 1 Power against Vengeance's 4 + 2), and the **only one
whose threshold scales with your own board** instead of being a printed number.

### CORRECTION 2 — the Might is read TWICE, not once

The issue cites 355.7 / 355.8 and stops. That is the finalization check:

- **355.7** — *"When a card Chooses one or more specific Game Objects to affect, it is Targeted."*
  Both the friendly unit and the enemy unit are Choices, so both are targets.
- **355.9.b** — *"It meets all targeting restrictions,"* with the rules' own example being
  *"'unit with Might 4 or greater'"*. *"an enemy unit with less Might than it"* is a targeting
  restriction of exactly that shape.
- **355.8** — *"In order to put a spell or ability on the chain, valid choices must be made for all
  targets."* So **the pump must be paid before the spell goes on the chain.**

But there is a second check the issue does not have:

- **359.3.e.7** — *"If all of an instruction's Targets become Invalid or Unavailable by the time the
  spell begins resolving, that instruction will not execute."*
- **359.3.e.9** — *"The process for a card's choice becoming Invalid or Unavailable is referred to as
  mistargeting."*

So a `-Might` on Renekton played **in response** still kills the spell, and 477.3.e.2.a
(*"decreases … applied last"*) means it wins that race whatever the order of play. The entry says so.

### CORRECTION 3 — the Empowered state is PERMANENT, and the issue treats it as a turn effect

*"When my Might becomes 10 or more, empower me"* prints no duration. **441.2**: *"'Empowered' is a
state for Game Objects on the board that other game effects and abilities can reference."* Nothing
expires it but 442.1 (*"Disempowering is the act of removing the Empowered status"*). So the **six**
Energy that first walks Renekton from 4 to 10 is a one-time purchase of **[Deflect] and [Ganking] for
the rest of his time on the board** — the `+1 Might` is *"this turn"*, the Empowered state is not.
That is not in the issue and it is the best thing about the card. It also feeds back into the entry's
own refutation: once Empowered he has [Deflect], so the opponent's Eclipse costs 1 rainbow more
(809.1.c, and 809.1.c.1 lets them pay it in any Domain).

### Arithmetic, with the quantities the entry declares (1 Renekton, 3 Public Execution)

Renekton enters at M4. To be a legal yardstick against an enemy of Might **M** he must reach **M+1**,
i.e. **M−3 activations = M−3 Energy**.

| enemy body | pump | spell | total |
|---|---|---|---|
| M5 (`SFD-101 Fae Dragon` is M7; a typical mid body) | 2 Energy | E2 P1 | **4 Energy + 1 Power** |
| M6 | 3 Energy | E2 P1 | **5 Energy + 1 Power** |
| M10 (`VEN-091 Corrupted Dragon`, `OGN-142 Mountain Drake`, `OGN-158 Volibear, Imposing`, `UNL-118 Elder Dragon`) | 7 Energy | E2 P1 | **9 Energy + 1 Power** |
| M12 (`UNL-059 Master Yi, Unstoppable`, `UNL-147 Baron Nashor` — the two largest printed bodies in the pool) | 9 Energy | E2 P1 | **11 Energy + 1 Power** |

At M10 the pump has already crossed the Empower threshold on the way, so that row buys the permanent
[Deflect]/[Ganking] for free.

`[Flow]` (**829.1.b**, *"You may play this from your trash for its flow cost. Then banish it."*)
replays it for E5 + 2 rainbow, and **829.1.b.2** is the fine print the entry states: *"Playing a
spell for its Flow cost does not change the timing at which it can be played"* — Public Execution has
neither [Action] nor [Reaction], so from the trash it is still a Main Phase card (155).

**Domain.** Renekton is Body, Public Execution is Body/Order, so the legend must be Body/Order.
`grep` over the legend rows returns **five**, not the issue's two: `OGN-269 The Boss`,
`OGS-023 Might of Demacia - Starter`, `SFD-205 Grand Duelist`, `UNL-203 Keeper of the Hammer`,
`VEN-153 Matriarch of War`.

**Verdict: HOLD as ENGINE.** It kills one body per casting for 2 Energy + 1 Power plus the pump. It
scores nothing — S7 holds.

---

## Candidate 2 — `renekton-stare-down-evacuate` · HOLD, rewritten

### The card text, verbatim

```
UNL-107 | Stare Down | Spell | Body | E2 | Choose a friendly unit and a battlefield. Move all enemy
  units at that battlefield with less Might than the chosen unit to their base. Gain 1 XP.
```

### CORRECTION 1 — the yardstick does not have to go anywhere, so the package is 5 Energy, not 8

The issue prices the line at *"8 Energy por el paquete completo"* because it walks Renekton to 10 to
buy [Ganking] so *"él mismo es el cuerpo que entra battlefield-a-battlefield"*. **He does not have to
be the body that enters.** Stare Down reads *"Choose a friendly unit **and** a battlefield"* — two
separate choices, with no clause tying the unit to the battlefield. Renekton can stand at your base,
**exhausted**, and still set the threshold; his ability carries no exhaust, so being exhausted costs
nothing. The body that walks in is any ready friendly unit, base → battlefield, by **144.4.a**
(*"Units may move from their Base to a Battlefield"*) with **144.2 / 420.3.a** making its own exhaust
the whole cost. **810.1.c.3** is why [Ganking] adds nothing here: *"It does not give additional
abilities or activations of Movement, only new options for the Standard Move."*

Against a garrison of M6 + M5, Renekton needs 7: **3 Energy** of pump, **2 Energy** for the spell,
**0 Power**, and a Standard Move you already had. **5 Energy for the whole board.**

### CORRECTION 2 — the enemy units are NOT targets, so [Deflect] never taxes this

This is the walk's own addition and it is the sharpest line in the lens.
**355.10.d** — *"It is programmatically selected based on its characteristics rather than chosen by
the spell or ability's controller,"* with the worked example *"'Kill all units at a battlefield'
targets a battlefield, but does not target any units."* Stare Down's *"all enemy units at that
battlefield with less Might than the chosen unit"* is exactly that shape. So:

- **Deflect does not apply.** 809.1.c: *"Spells and abilities an opponent controls that **target**
  [me/this] cost an amount of Power equal to [Deflect Value] more,"* and 809.1.d: *"…imposes a
  Mandatory Additional Cost on Spells and Abilities that **choose** the Game Object."* Stare Down
  neither targets nor chooses them. A garrison of Deflect bodies is evacuated for free.
- **Public Execution is the opposite case** and pays the tax, because it *does* choose its enemy.

That is why candidate 1 and candidate 2 are two entries and not two versions of one.

### The Conquer, and why the order is mandatory

Identical to the verified `charm-evacuate-conquer`, whose own notable already names Stare Down as
*"the one that scales and it is the Body twin of this entry, not a version of it."*

1. Main Phase, Neutral Open State. **155**: Stare Down carries neither [Action] nor [Reaction], so it
   can only be played here — **before** the entering move, never after.
2. It resolves; the garrison walks home. This is a **Move**, not a Recall (455 is not involved), so
   the departure is visible to 323.6.
3. Cleanup: **323.6** — *"Players lose control of any controlled Battlefields without their Units
   occupying them if the turn is in an Open State and there is no Showdown or Combat ongoing there."*
   The battlefield is now uncontrolled, which is *open* in the sense of **170.11.c** only if it is
   also unoccupied — which it is.
4. Standard-Move a ready friendly unit in (144.4.a, 144.2, 420.3.a). 450 / 190.3.a.1 apply Contested.
5. Cleanup: **323.8** stages a Showdown; **323.9** stages **no** Combat, because it requires *"Units
   present controlled by opposing players"*. **323.12** opens the Showdown.
6. **348.2.a** establishes Control, **348.2.a.1** — *"This results in a Conquer"* — and **471.1**
   gives the point.

If you enter first instead, the very next Cleanup opens the Combat at 323.13 and 155 then bars the
spell outright. The order is not a preference.

### What refutes it, kept in full

(a) **477.3.e.2.a** puts decreases last, so an Eclipse on Renekton shrinks the set — and here it
shrinks it at **execution**, since the set is computed then (355.10.d), not at finalization.
(b) **347.1** lets the opponent play cards in the open Showdown; a body returned there makes it
Contested by two players again. (c) Stare Down **moves to their base**, it does not banish: the same
bodies come back next turn. (d) The 1 XP is real and free, but nothing in this entry spends XP.

**Domain.** Both cards are mono-Body: **any legend with Body** runs the line. The issue did not say
so and it is the cheapest domain requirement in the lens.

**Verdict: HOLD as ENGINE.** One Conquer per casting, for 5 Energy against a two-body garrison, with
no damage dealt or taken and no Attacker designation ever handed out.

---

## Candidate 3 — `foxfire-unfloored-reduction-sweep` · HOLD, rewritten twice

### THE ISSUE MISSED THAT HALF OF THIS IS ALREADY CATALOGUED

`OGN-256 Fox-Fire` and `OGN-255 Nine-Tailed Fox` are both in **`ahri-foxfire-might-threshold`**,
verified on 2026-09-06 out of issue #89. The issue's S8 table marks Fox-Fire `--` (uncatalogued).
That is wrong, and it matters, because the existing entry ends on a ceiling:

> *"The honest ceiling is the floor: 'to a minimum of 1 [M]' on both cards means FOUR units at 1 Might
> sum to exactly 4, and that is the largest sweep this line can ever make."*

That sentence is **true and correctly scoped** — *this line*, whose two reducers (`OGN-119 Ahri,
Inquisitive` and the legend) both print a floor. What this walk adds is the family that has **no**
floor, and it breaks the ceiling by a rule no entry of the catalogue had ever cited.

### The card text, verbatim

```
OGN-256 | Fox-Fire | Spell | Calm/Mind | E3 | [Hidden] [Action] Kill any number of units at a
  battlefield with total Might 4 or less. [Tags: Ahri]
SFD-066 | Frigid Touch | Spell | Mind | E2 | [Reaction] [Repeat] :rb_energy_2: Give a unit
  -2 :rb_might: this turn.
OGN-116 | Thousand-Tailed Watcher | Unit | Mind | E7 P1 M7 | [Accelerate] … When you play me, give
  enemy units -3 :rb_might: this turn, to a minimum of 1 :rb_might:. [Tags: Ionia]
UNL-066 | Moonlight Affliction | Spell | Mind | E7 | [Reaction] Give a unit -10 :rb_might: this turn.
OGN-255 | Nine-Tailed Fox | Legend | Calm/Mind | - | When an enemy unit attacks a battlefield you
  control, give it -1 :rb_might: this turn, to a minimum of 1 :rb_might:. [Tags: Ahri]
```

### The rule that breaks the four-body ceiling

**143.2.b** — *"If a unit's Might is ever less than 0, **it is treated as 0** when referenced by
spells and abilities."* Fox-Fire's *"total Might 4 or less"* is a spell referencing Might. A body
driven below zero therefore contributes **nothing** to the sum, where a floored body always
contributes at least 1. **Zero hits for `143.2.b` in `data/combos.json` before this walk.**

**355.11 / 355.11.a** are how the sum is read: *"Some cards identify a group of Targets with Targeting
Requirements that must be met by the group as a whole … such cards can choose any group of valid
targets that collectively fulfill the targeting restriction."* And **710**: *"Units on the board are
evaluated according to their current Might."*

**142.4.b** is the boundary the entry must respect: a 0-Might body *"must have at least 1 damage
marked on it"* to have lethal damage — but Fox-Fire **kills**, it does not deal damage, so this never
arises. Stated in the entry so a reader does not reach for it.

### CORRECTION 1 — the Watcher does NOT flatten "four bodies of any size"

The issue writes: *"Cuatro cuerpos de cualquier tamaño: −3 con piso 1 a cada uno (477.3.b snapshotea
el piso por cuerpo) = 1+1+1+1 = 4 ≤ 4."* **This is backwards.** 477.3.b's own worked example is
unambiguous: *"'-4 [M] to a min of 1 this turn' choosing a unit with 2 [M] … will generate -1 [M]."*
The floor limits **the size of the reduction**, not the resulting Might. So `-3 to a minimum of 1`
maps a body of Might **M** to **max(1, M−3)** — a 10-Might body lands on **7**, not on 1.

The honest budget, with Fox-Fire's 4:

| garrison after `OGN-116` | sum | Fox-Fire? |
|---|---|---|
| four bodies of M ≤ 4 | 1+1+1+1 = 4 | **yes** |
| two bodies of M5 | 2+2 = 4 | **yes** |
| one body of M7 | 4 | **yes** |
| one body of M8 | 5 | no |
| four bodies of M10 (the issue's claim) | 7+7+7+7 = 28 | **no** |

E7 P1 for the Watcher plus E3 for Fox-Fire = **10 Energy + 1 Power**, and it clears four small
bodies or one M7 — not "a garrison of four of any size".

### CORRECTION 2 — the Moonlight Affliction row is an arithmetic slip

The issue writes *"un solo cuerpo de M12: −10 → **−2**"*. 12 − 10 = **2**. The rewritten row:

- `UNL-066` has **no floor**, so it maps M to **M−10**, and 143.2.b reads any result below 0 as 0.
- Every printed body of **M ≤ 10** lands at or below 0 and therefore costs Fox-Fire **nothing** — the
  whole 4 budget is still free for other bodies. That covers `VEN-091 Corrupted Dragon`,
  `OGN-142 Mountain Drake`, `OGN-158 Volibear, Imposing` and `UNL-118 Elder Dragon`, all M10.
- The two largest printed bodies in the pool are **M12** (`UNL-059 Master Yi, Unstoppable`,
  `UNL-147 Baron Nashor`); they land on **2**, which still fits inside 4 with room for a second
  1-Might body.
- **143.2.b.1** is the price of the trick: *"it is not 0. Effects that calculate Might increases and
  decreases use the actual value."* Undoing a −10 on an 8-Might body costs the opponent 10 of +Might,
  not 2.

E7 + E3 = **10 Energy**, and it deletes any single body in the game plus change.

### The Frigid Touch row, which is correct as the issue wrote it

`SFD-066` is E2 with `[Repeat] :rb_energy_2:` and **no floor**. **820.1.b** gives *"a second time"*,
**820.1.c.3** caps it there, and **820.2.a** lets the second execution pick a different unit. So
**E4 = −2 on each of two bodies**: a garrison of M3 + M3 becomes 1 + 1 = 2 ≤ 4, and a garrison of
M2 + M2 becomes 0 + 0. Fox-Fire for E3. **7 Energy, garrison gone.** The issue is right here and
820.1.c.3 is why it is not an engine: three bodies need a second Frigid Touch.

### The Conquer afterwards, and the [Hidden] trap

Same chain as candidate 2 (323.6 → 144.4.a → 323.8 / 323.9 → 323.12 → 348.2.a / 348.2.a.1 → 471.1),
but with **one caveat the issue does not draw out**: **811.1.b** says you hide *"at a battlefield
**you control**"*, and **811.1.d.2** confines a hidden spell's targets to that battlefield. Fox-Fire
names no other location, so the escape clause does not apply (the existing entry already says this).
So the 0-Energy [Hidden] Fox-Fire is a **defensive** card — it sweeps *your* battlefield, which is the
Nine-Tailed Fox legend's own scenario — while clearing *their* garrison to walk in costs the full
3 Energy from hand. Two different uses of one card, and only the second one conquers.

Fox-Fire **does** choose its victims (355.11.a), so unlike Stare Down it pays [Deflect] once per body
chosen (809.1.c, *"for each time they choose"*).

Also from the card, not the issue: Fox-Fire says *"units"*, not *"enemy units"*. Your own bodies at
that battlefield count toward the sum and can die, which is why the sweep and the walk-in are two
steps.

**Domain.** Fox-Fire is Calm/Mind; the three reducers are Mind; `OGN-255 Nine-Tailed Fox` is Calm/Mind
and carries the **Ahri** tag Fox-Fire prints. The other Calm/Mind legends are `SFD-189 Fire Below the
Mountain`, `UNL-189 Bashful Bloom` and `VEN-145 Curator of the Sands`.

**Verdict: HOLD as ENGINE,** as the unfloored companion to `ahri-foxfire-might-threshold`, with the
two arithmetic rows rewritten.

---

## Candidate 4 — `vi-hotheaded-excess-threshold` · HOLD, rewritten

### The card text, verbatim

```
UNL-030 | Vi, Hotheaded | Unit | Fury | E4 M3 | [Deflect] :rb_energy_2::rb_rune_fury:: Double my Might
  this turn. [Tags: Vi, Zaun]
OGN-034 | Tryndamere, Barbarian | Unit | Fury | E7 P2 M8 | When I conquer after an attack, if you
  assigned 5 or more excess damage to enemy units, you score 1 point. [Tags: Tryndamere, Freljord]
SFD-120 | Sivir, Ambitious | Unit | Body | E6 P3 M7 | [Deflect 2] … When I conquer after an attack, if
  you assigned 5 or more excess damage to enemy units, you may deal that much to an enemy unit.
SFD-117 | Ancient Henge | Gear | Body | E2 P1 | :rb_exhaust:: [Reaction] — Pay any amount of Energy to
  [Add] that much :rb_rune_rainbow:.
```

### CORRECTION — the issue's arithmetic leaves the payoff out of its own combat

The issue writes: *"Vi entra en M3. Una activación (2 Energy + 1 Fury Power) la lleva a 6. Atacando
una guarnición cuyo mínimo letal sume 1, 465.2.c.4 deja 5 de excess — exactamente el umbral que piden
OGN-034 y SFD-120."* Vi attacking a 1-Might garrison alone does leave 5 excess. **But Vi carries no
excess payoff.** Both payoffs read *"When **I** conquer after an attack"*, so `OGN-034` or `SFD-120`
has to be at that battlefield — and **464.2.c.3** (*"Units at the Contested Battlefield controlled by
the Attacker or Defender gain the Attacker or Defender designation now"*) then makes it an attacker
too, so **465.2.c** (*"each player assigns an amount of damage equal to their **summed** Might"*) puts
its Might into the same sum. Tryndamere alone is M8; against a 1-Might garrison he already leaves
7 excess and Vi's doubling buys nothing.

**Where Vi is actually worth her Energy is the opposite board: a FAT garrison.** Excess is
`summed attacking Might − total lethal the garrison requires`, so the threshold of 5 is a race
between your Might and theirs.

### Arithmetic, with the quantities the entry declares (1 Vi, 1 Tryndamere, both mono-Fury)

| doublings | cost of the doublings | Vi's Might | attacking sum | garrison total that still leaves 5 excess |
|---|---|---|---|---|
| 0 | — | 3 | 11 | ≤ 6 |
| 1 | 2 Energy + 1 Fury Power | 6 | 14 | ≤ 9 |
| 2 | 4 Energy + 2 Fury Power | 12 | 20 | ≤ 15 |
| 3 | 6 Energy + 3 Fury Power | 24 | 32 | ≤ 27 |

**477.3.b** is why the ladder compounds rather than adding: the double *"is applied once … it will
snapshot"*, so it reads Vi's Might at the moment of application — 3 → +3 → 6 → +6 → 12 → +12 → 24.

**And there is a tighter, better number the issue never computes.** Tryndamere is M8, and the
defenders assign their own summed Might back (465.2.c) with **465.2.c.3** forcing lethal onto one
unit in full first. A garrison summing **7** cannot kill him (7 < 8); it can only kill Vi at 6. So:

> **Against a garrison of exactly 7 summed Might, one Vi doubling — 2 Energy and 1 Fury Power — is the
> difference between 4 excess and 7 excess, i.e. between no point and a point, with Tryndamere
> surviving to conquer either way.**

That is the entry's single sharpest claim and it is checked to the digit: 11 − 7 = 4 (no), 14 − 7 = 7
(yes).

**The `unless` clause, stated honestly.** 465.2.c.4 reads in full: *"Units cannot have more damage
assigned to them than the minimum required to constitute lethal damage **unless no further units
remain to have damage assigned to them**."* Against a single defender the tail permits dumping the
whole sum, which would leave no excess at all. It is a **permission**, not an instruction — 465.2.c
says the player *assigns*, and the attacker will stop at minimum lethal precisely so the excess
exists. The catalogue cites 465.2.c.4 in 18 places and the `unless` clause in none of them; this
entry names it and says which way the choice goes. R28 = A is untouched.

**Where the third Power comes from.** The project's measured free floor is **2 Power a turn**
(164.2.b, 161.2.b, 315.3.b / 430.4.a), so the third doubling needs a third rune or
`SFD-117 Ancient Henge` — and the Henge's `[Add]` is `:rb_rune_rainbow:`, which **135.2.e.5** defines
as *"Power of any Domain"*, so it does pay a Fury Power cost. The Henge is Body, so that version
needs a Fury/Body legend: `OGN-249 Relentless Storm`, `SFD-183 Purifier`, `UNL-183 Pridestalker`,
`VEN-141 Butcher of the Sands`. **Without the Henge the line is mono-Fury** and runs under any Fury
legend — the issue asserts Fury/Body unconditionally, which is only true of the Henge version.

### 709, and why only the first doubling can fire a "becomes Mighty" payoff

**709**: *"A Unit 'becomes Mighty' at the moment its Might changes from being less than 5 to being 5
or greater,"* with the worked example *"A Unit with Might 5 that gets +1 [M] does not become Mighty,
because it was already Mighty."* Vi's first doubling (3 → 6) is a `becomes Mighty`; the second and
third are not. `SFD-205 Grand Duelist` is the pool's payoff for that and it is Body/Order, outside
this shell — noted so nobody adds it later.

### What refutes it, kept in full

(a) **477.3.c**, word for word, with `UNL-063 Eclipse` in the rules' own example: a −Might that
resolves **before** the double makes the double add **+0**. Vi's [Deflect] taxes that Eclipse by 1
rainbow (809.1.c, any Domain by 809.1.c.1) and no more. (b) The whole ladder is *"this turn"*.
(c) Both bodies must survive the combat to conquer.

**Verdict: HOLD as ENGINE.** It is a Might ceiling with no cap, and the only bridge from Might to a
point in the whole pool is `OGN-034`'s threshold of 5 — S7 holds. The Brambleback package
(`tryndamere-brambleback-conquer`, BURST at 9) buys the same clause with 28 Might in bodies; this buys
it with 2 Energy and 1 Power.

---

## Candidate 5 — `overt-operation-fae-dragon-industrialist` · HOLD, rewritten

### The card text, verbatim

```
OGN-153 | Overt Operation | Spell | Body | E5 P2 | [Action] For each friendly unit, you may spend its
  buff to ready it. Then buff all friendly units. (Each one that doesn't have a buff gets a
  +1 :rb_might: buff.)
SFD-101 | Fae Dragon | Unit | Body | E7 P1 M7 | When you play me, buff up to four friendly units.
  When you spend a buff, play a Gold gear token exhausted. [Tags: Fae, Dragon, Bandle City]
SFD-171 | Renata Glasc, Industrialist | Unit | Order | E4 P1 M4 | Your tokens enter ready.
```

**187.5** is the Gold: *"A Gold gear token is a domainless gear token with '[Reaction][>] Kill this,
[E]: [Add] [A].'"* — the `[E]` is why R25 = A matters. A Gold that entered exhausted cannot pay its
own cost until the next Awakening; under Renata it is 1 Power of any Domain immediately.

### CORRECTION 1 — Fae Dragon buffs FOUR, so N=5 does not come from one Dragon

The issue's arithmetic declares *"1 Overt Operation, 1 Fae Dragon, N=5 cuerpos buffeados"* and gets
+3 Power. `SFD-101` reads *"buff up to **four** friendly units"*. With one Dragon and nothing else,
the first Overt Operation spends **4**, not 5:

| pass | buffs spent | readies | Golds (ready, R25) | cost | net Power |
|---|---|---|---|---|---|
| Overt Operation #1, after one Fae Dragon | 4 | 4 | 4 | E5 + 2 Power | **+2** |
| Overt Operation #2, after #1 re-buffed everything, N friendly units | N | N | N | E5 + 2 Power | **+(N−2)** |

The issue's +3 is the **second** casting at N = 5, not the first. And **702.3** (*"There can only be
one Buff on a Unit at a time"*) plus **702.3.a** (*"it is not placed instead"*) is why the count is the
number of **bodies**, never the number of buffers.

The fifth buff on the first pass has to come from somewhere, and the pool has candidates inside
Body/Order: `OGN-141 Kinkou Monk` (Body, E4 P1, *"buff up to two other friendly units"*),
`OGN-223 Peak Guardian` (Order, E6 P1, *"buff me. Then, if I am at a battlefield, buff all other
friendly units there"*), `OGN-139 Cithria of Cloudfield` (Body, *"When you play another unit, buff
me"*).

### CORRECTION 2 — Overt Operation is not the pool's only mass buff-spender

The issue calls it *"la única carta del pool que gasta N buffs de un golpe"*.
`grep -niE "spend [a-z0-9 ]*buff"` returns **ten** spenders, and **two** of them take more than one:
`OGN-153 Overt Operation` and **`OGN-230 Albus Ferros`** (Order, E4 M3, *"When you play me, spend any
number of buffs. For each buff spent, channel 1 rune exhausted."*). Both are inside Body/Order and
both trigger the Dragon N times.

**The claim that survives, and it is still the entry's point:** Overt Operation is the only card in
the pool that spends N buffs **and refills them in the same resolution** (*"Then buff all friendly
units"*), which is what makes the next copy as good as the first. Albus Ferros pays in channelled
runes instead of readies and does not refill; the other eight spend exactly one.

### The ordering caveat, inherited and re-checked

`fae-dragon-wallop-industrialist` already records it and it applies here unchanged: the Golds arrive
**after** the spell has been paid, so the 2 Power must be up front and the surplus is only spendable
later in the same Main Phase. **429.2** is what makes the surplus usable at all: *"Triggered and
activated abilities that Add resources resolve as soon as they are finalized,"* and **429.2.a**
*"…will resolve before any other outstanding items on the chain are finalized."*

**702.2.b** (*"Spending a Buff removes a single Buff counter from a Unit"*) prints no exemption for
spends made as a cost, which is the reading `fae-dragon-wallop-industrialist` already stands on: each
per-unit spend is its own spend, so N spends fire the Dragon N times. **355.10.c.1** confirms the
shape — *"'[do X] to [do Y]' … the cost within that instruction is '[do X]'"* — and its own example is
*"you may spend a buff to move a friendly unit"*.

### What refutes it, kept in full

(a) **705**: *"If a Unit leaves play, remove all Buffs from it."* Every body that dies is a coin gone.
(b) **702.3**: one buff per body, so the ceiling is the body count. `OGN-078 Lee Sin, Ascetic`
(*"I can have any number of buffs"*) is the pool's one exception and it is Calm, outside this shell.
(c) The re-buff prints no `may` — *"Then buff all friendly units"* — so you cannot hold a body
buff-less to keep a `becomes Mighty` window open (709).

**Domain.** `OGN-153` and `SFD-101` are Body, `SFD-171` is Order, so 103.1.b.1 forces a Body/Order
legend — the same five listed under candidate 1.

**Verdict: HOLD as ENGINE.** It is a Power and ready engine, not a scoring line.

---

## Refinement 1 — `corrupted-dragon-mass-evacuate`

The entry's own arithmetic says *"a single defender of 6+ stays, 465.1 is met and the Dragon takes
damage."* Any unfloored −Might answers that, and this is the walk's measurement of **which ones**,
because the domain question decides it:

`grep -nE "\-[0-9]+ :rb_might:" | grep -v "minimum of"` — the unfloored reductions are **almost
entirely Mind**: `SFD-066 Frigid Touch` (−2, [Repeat]), `UNL-063 Eclipse` (E3, −4, [Reaction]),
`UNL-066 Moonlight Affliction` (E7, −10), `VEN-061 Decree of Insight` (E1, −5 to an enemy **Body**
unit, and *"Ignore [Deflect] while paying this spell's cost"*), plus `SFD-067 Frostcoat Cub` and
`UNL-065 Icevale Archer`.

**And there is exactly one Mind/Body legend in the entire pool** — `VEN-149 Defender of Tomorrow`
(already recorded in CLAUDE.md). So the Mind answer is a **forced shell**, not a free option, which
the issue's *"ojo con el dominio"* does not convey.

The unforced answer is Chaos: **`UNL-138 The List`** (Chaos gear, E1, *"As you play this, name a tag …
`:rb_exhaust:`: Give a unit with the named tag −2 Might this turn"*), unfloored. −2 takes a M6 or M7
defender to 4 or 5, inside the Dragon's *"5 Might or less"* gate, and Body/Chaos legends are three:
`OGN-267 Bounty Hunter`, `SFD-203 Battle Mistress`, `UNL-201 Voidreaver`. The price is that the tag is
named as the gear is played, so it is a read on the opponent's deck, not a universal answer.

**Nothing about the entry's class, quantities or steps changes.** One notable is added.

## Refinement 2 — `faefolk-challenger-forced-attacker`

`UNL-105 Imposing Challenger` is M5 and its gate is *"an enemy unit here with less Might than me"*, so
the entry says 4 or less. **`SFD-052 Heart of Dark Ice`** (Calm gear, E3 P1, `:rb_exhaust:`: Give a
unit +3 Might this turn) takes him to 8 and the gate to **7**, which is most of the pool.

**And the walk supplies the reason the pump must be pre-paid, which the issue asserts without one.**
The Challenger's ability is a Triggered Ability that fires *when he moves*; its enemy unit is a Choice
with a targeting restriction (355.7, 355.9.b), and **355.8** requires valid choices *"in order to put
a spell or ability on the chain"*. The trigger is placed the instant the move completes, so the +3
must already be on him. It cannot be paid in response either: Heart of Dark Ice carries neither
[Action] nor [Reaction], and 806.1.c.2 / 813.1.c.2 are the keywords that would have let an Activated
Ability be used in a Showdown or a Closed State. **Main Phase, before the Standard Move.**

Domain: the Challenger is Body, the gear is Calm, so a Calm/Body legend — `OGN-257 Blind Monk`,
`SFD-193 Grandmaster at Arms`, `UNL-191 Wuju Master`. `OGS-019 Wuju Bladesman - Starter` is the fourth
and is **left out on purpose**: it carries `[BANNED 2v2:restricted]`.

**Nothing about the entry's class, quantities or steps changes.** One notable is added.

## Refinement 3 — `blade-dancer-caitlyn-choose-ready` · the issue is right on the rule and wrong on the value

The issue says every buff is a choose (**702.2.a**, *"a player **chooses** a Unit and then places a
buff on it"*), so *"cualquier buffeador de la lista de S6 dispara a Blade Dancer sin pagar SFD-052"*.
The rule is right. The conclusion is not useful, and the entry already contains the reason:

> **`SFD-195 Blade Dancer`'s ready costs her own exhaust** — *"When you choose a friendly unit, you may
> **exhaust me** and pay `:rb_rune_rainbow:` to ready it"* — and **415.3.a** gives her one readying a
> turn (*"A player Readies all non-spell Game Objects they Control during the Awakening Phase"*).

So the bottleneck is never the supply of chooses; it is the legend's exhaust. A mass buffer that
chooses five bodies still buys **one** ready. What the entry already prices — a second Heart of Dark
Ice plus her own *"When you conquer, you may pay 1 Energy to ready me"* — is the correct lever, and
`SFD-039 Royal Entourage` is the third, as the entry says.

What the refinement **does** add: inside Calm/Chaos there are cheaper chooses than a second gear, for
turns when the +3 Might is not needed. `OGN-053 Stand United` (Calm spell, E3, [Hidden] [Action],
*"Buff a friendly unit"*), `OGN-063 Spirit's Refuge` (Calm gear, E2 P1, *"When you play this, buff a
friendly unit"*, and it hands out [Deflect]), `OGN-078 Lee Sin, Ascetic` (Calm, `:rb_exhaust:`: Buff
me, *"I can have any number of buffs"* — the pool's one override of 702.3), and
`UNL-043 Enthusiastic Promoter` (Calm, *"When I hold, [Buff] all units here"*).

**Nothing about the entry's class, quantities or steps changes.** One notable is added.

## Refinement 4 — `ahri-foxfire-might-threshold`, found by this walk and not asked for

Its closing ceiling — *"FOUR units at 1 Might sum to exactly 4, and that is the largest sweep this
line can ever make"* — is correctly scoped to *this line*, whose two reducers both print
`to a minimum of 1`. But a reader will carry it away as a fact about Fox-Fire, and it is not: 143.2.b
makes an unfloored reduction worth **0** to the sum, not 1. A cross-reference notable is added
pointing at `foxfire-unfloored-reduction-sweep`, per the project's own rule that a lens verdict is
scoped to its lens.

---

## Check against the five authoring traps

1. **An empty battlefield is not an attack.** Candidates 2 and 3 conquer through a **Showdown**
   (348.2.a.1), never claiming the Attacker designation, so 807.1.d / 383.4.e / 461 cannot bite.
   Candidate 4 attacks a real garrison and 464.2.c.3 hands out the designation properly.
   Candidate 1 declares no combat at all. Candidate 5 declares none either.
2. **Energy added in Awaken or the Beginning Phase is lost at the Main Phase start (167).** Every
   Energy and Power in all five is spent inside the Main Phase it is produced.
3. **A Repeat gives no window between executions (429.3, R21).** Only candidate 3 uses [Repeat], and
   it uses it exactly as 820.1.b / 820.1.c.3 / 820.2.a allow: two executions, different targets, no
   re-exhaust between them.
4. **[Temporary] bodies die before Scoring (816.1.b).** No candidate uses a Temporary body.
5. **Recycling a rune sends it to the Rune Deck (161.2.b); a recall is not a move (456 / 458).** No
   candidate recycles a rune. `UNL-107 Stare Down` **moves** to the base — 455 defines a Recall as
   relocation *"without it being a Move"*, and Stare Down says *"Move"*, so 323.6 reads the departure
   correctly.

Two more the project has added since:

6. **Tokens are not cards (185) and never reach the trash (186.1).** The only token in the lens is
   the Gold of candidate 5, and it is killed by its own cost (187.5) — nothing recycles it.
7. **A battlefield you provide starts uncontrolled (190.1, 190.6.d).** No candidate needs a specific
   battlefield, so 485.4.a / 485.5 / 486.5 / 487.5 / 103.4.c / TR 402.1 never bind any of the five.

## New rules readings filed

**None.** The one place a reading was tempting is the `unless` tail of 465.2.c.4 in candidate 4, and
it is not a reading: 465.2.c makes the assignment something the player *does*, and the tail is a
permission the attacker simply declines. R28 = A is untouched and no entry's class turns on it that
did not already.

## Commands behind the measurements

```
grep -nE ":: ?(Give|Double)" data/corpus_flat.txt | grep -i might        # 10 rows, 8 with exhaust
grep -niE "double" data/corpus_flat.txt | grep -i might                  # 5 doublers
grep -niE "kill (an? )?(enemy |friendly )?unit" data/corpus_flat.txt     # 4 kills reach the base
grep -niE "spend [a-z0-9 ]*buff" data/corpus_flat.txt                    # 10 spenders, 2 take N
grep -nE "\-[0-9]+ :rb_might:" data/corpus_flat.txt | grep -v "minimum of"   # unfloored reductions
grep -nE "\| Legend \|" data/corpus_flat.txt | grep -E "Body/Order|Order/Body"   # 5
grep -o "143\.2\.b" data/combos.json | wc -l                             # 0 before this walk
```
