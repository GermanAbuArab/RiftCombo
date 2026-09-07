# The uncatalogued Fury / Body / Chaos cards

Issue #173. Session `rc-walk-fam1`, 2026-09-07. Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt` (grep). Every rule number was opened in
`data/Riftbound-Core-Rules-2026-07-16.txt` and is quoted where it carries weight.

## 0. The population

Measured against the catalogue at 440 entries: **415 deckable cards that are neither battlefield nor
legend sit in no entry's `uses[]`**. This walk takes the slice whose domains are a subset of
**{Fury, Body, Chaos}** — 212 cards, of which 6 are basic Runes and 4 are banned in every format,
leaving **202 to walk**. The battlefields, the legends and everything in Calm / Mind / Order belong to
`rc-walk-uncat`.

| domains | cards | | type | cards |
|---|---|---|---|---|
| Fury | 72 | | unit | 126 |
| Body | 72 | | spell | 58 |
| Chaos | 64 | | gear | 22 |
| Body/Chaos | 2 | | rune | 6 |
| Chaos/Fury | 2 | | | |

**Excluded up front.** Banned in every format (`data/legality.json`): `OGN-168` Fight or Flight,
`OGN-182` Scrapheap, `SFD-020` Draven, Vanquisher, `SFD-122` Called Shot. Basic Runes — `OGN-007`,
`OGN-126`, `OGN-166`, `VEN-R01`, `VEN-R04`, `VEN-R05` — because 164.2 gives every Basic Rune the same
two abilities and there is no per-card mechanism to walk.

Method: one entry per **mechanism** with its best partner; refusals recorded with the paragraph that
kills them; wide families written up as synergy-rule **leads** rather than as many near-identical
entries. The census is re-run each batch, because three other walks are landing entries.

## 1. Batch 1 — Fury, five entries

### 1.1 `minotaur-reckoner-rengar-unseen-frozen-board` — SFD-014 + UNL-024 (both in zero entries)

**`SFD-014 Minotaur Reckoner` is the only global "Units can't move to base" in the pool** (swept:
`move to base` returns two rows, this and `UNL-111 Determined Sentry`, which restricts only itself).

144.4 makes the Standard Move base↔battlefield only, and 810.1.c.3 gates battlefield→battlefield
behind [Ganking] — so with the Reckoner out, a unit at a battlefield without [Ganking] can **never
move again**. It is a permanent freeze, symmetric, and `UNL-024 Rengar, Unseen` (who prints [Ganking],
[Accelerate], [Assault 2] and [Deflect]) is the body it does not bind.

**A correction made during the walk.** The first draft said an *effect* move to base still worked. It
does not: 420.1 defines Moving generally, 420.2.b makes the Standard Move merely one thing that "may
**also** cause Movement", 449 has spells and abilities cause Moves, and 054.1 makes a card that
forbids beat a card that permits. So `OGS-011 Flash` and `OGN-191 Maddened Marauder` are switched off
too — which is what kills the whole evacuation family, since 323.6 needs the garrison to *leave*.

The one route that survives is **455**: "A Recall is when a Permanent is relocated from anywhere to
its Base **without it being a Move**." So 466.1.a.2's post-combat recall of failed attackers still
happens. Read those two together before assuming the Reckoner strands your own attacks.

### 1.2 `raging-firebrand-thermo-beam-free-gear-wipe` — OGN-031 + OGN-022 (both in zero entries)

The Firebrand's "the next spell you play this turn costs 5 Energy less" takes Thermo Beam from E5 to
**E0** (356.6 floors it at zero) and leaves its 2 Fury Power. "Kill all gear" is programmatic under
355.10.d — "*\"Kill all units at a battlefield\" targets a battlefield, but does not target any
units*" — so [Deflect] never charges and no "can't be chosen" clause protects a gear from it.

**The anti-synergy is in the same domain and is easy to build by accident.** A discount reduces what
you *spend* (166.2, 203.1, 356.4.b), so the very card that makes the Beam free switches off
`UNL-004 Prepared Neophyte` ("if you've spent 4 or more to play a spell this turn") and
`SFD-143 Sivir, Mercenary` ("if you've spent at least two rainbow this turn"). 206 does not rescue
them: that governs a *costs* check, which reads the printed cost. Two different tests.

### 1.3 `annie-fiery-piercing-light-bonus-per-instance` — OGS-001 + SFD-023 (both in zero entries)

**Riot names Annie in the rule.** 715.2: "*If the Deal action has multiple targets, the amount of
Damage dealt to each target is increased by Bonus Damage individually and separately. Example:
Singularity … while they also control Annie, Fiery … dealing 7 to each.*"

So the payoff of a Bonus Damage source is the **number of Deal actions**, not their size. Piercing
Light with its [Repeat] paid is four Deal actions of 2, each raised to 3: **twelve damage for 4 Energy
and 2 Fury Power**. And 714 is the ceiling nobody expects — "*If more than one instance of Bonus
Damage is applied or granted to a Deal action, all instances are summed and applied once*" — so a
second source makes it +2 per action, not +1 twice.

It never touches combat: 713 scopes Bonus Damage to Deal actions and **417.6.b.3** sources combat
damage to the units, with Challenge as its worked example. That is #119's disjointness, now with the
constructive half attached.

### 1.4 `endless-riches-blade-twirler-trash-as-hand` — VEN-022 + VEN-002 (both in zero entries)

Endless Riches replaces your hand with your trash and stops you rebuilding one (Skip your Draw Phase,
315.4). Its last sentence — "*If a card would go to your trash from anywhere other than your Main
Deck, banish it instead*" — **exempts the Main Deck by name**, which is precisely why a self-mill is
the engine's only renewable input, and why `VEN-002 Blade Twirler` ("The first time I move each turn,
choose a player. They [Burn 1]") pointed at *yourself* is a free card every turn off a move you were
making anyway.

The clock is the deck: 431.1.b plus **431.2.b** turn an over-burn into a Burn Out that recycles the
trash — your hand — back into the Main Deck, and hands the opponent a point (194.1.d). The same
banish clause erases every [Deathknell] (808.1.d's condition), [Flow] (829.1.b needs the card in the
trash) and every 422.1 discard trigger, so the list has to be built with none of those.

### 1.5 `fresh-beans-rengar-pouncing-attacking-reinforcement` — UNL-011 + SFD-025 (both in zero entries)

355.2.a limits a play to "the controller's Base or a battlefield the controller controls", which is
why nothing reinforces the battlefield you are attacking — the same clause behind refuse-bucket C.
**`SFD-025 Rengar, Pouncing` is the pool's one exception** ("I can be played to a battlefield you're
attacking"; swept over the corpus). 464.2.c.3.a with 319.6 and 323.2.a put him in the same damage
step, at 5 Might with [Assault 2] (807.1.c), *after* blocks are committed.

Fresh Beans pays for him and works off-turn for §-1's reason: its exhaust hangs off a **trigger**
(383.3.c), not an Activated ability (381). Its cap is its own exhaust — one draw a turn.

### 1.6 Refusals and leads from batch 1

- **`UNL-004 Prepared Neophyte` and `SFD-143 Sivir, Mercenary` beside any discount** — refused, see
  1.2. A "spent" threshold and a discount are the same resource read twice.
- **A second Bonus Damage source as a multiplier** — refused by 714: instances sum and apply once per
  Deal action. `OGN-032 Ravenborn Tome` beside Annie is +2 per action, not ×2.
- **Endless Riches beside any [Deathknell], [Flow] or discard payoff** — refused by its own last
  sentence, which banishes anything that would reach the trash from outside the Main Deck.
- **Lead (not walked):** `OGN-017 Iron Ballista` is Riot's worked example at 417.6.b.2.a for damage
  dealt "both by a gear and by an ability", so Annie's "spells **and abilities**" raises it to 3 a
  turn. A repeatable pinger under a Bonus Damage static is a synergy rule, not one entry.
- **Lead (not walked):** the Fury [Assault] package — `OGN-015 Captain Farron` ("Other friendly units
  here have [Assault]"), `OGN-004 Cleave`, `SFD-003 Blood Rush`, `VEN-012 Perfect Execution`,
  `VEN-009 Baccai Reaper` — all key on 807.2's summing of granted [Assault]. One synergy rule, not
  five entries.
