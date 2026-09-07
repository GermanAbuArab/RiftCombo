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

## 2. Batch 2 — Body, six entries

Two rules do most of the work in this domain, and both are rules the catalogue had never cited.

**417.6.b.3 — "*When a spell or ability specifies a Unit as the source of the Damage for the Deal
action, it is not in addition to the spell or ability that instructed it*", with Challenge as its
worked example.** Body's removal suite is almost entirely of that shape ("they deal damage equal to
their Mights to each other"), so it is **unit damage, not spell damage** — which decides 2.3 and 2.4
outright.

**740.2.a — "*A unit is alone when there are no other friendly units at the same location*."** #119
had recorded that Fiora's Double needs one-on-one combat (740.2.b); 740.2.a is the half that was
never spelled out, and it is the one that makes a *reset* rather than a bigger garrison the way to
switch her on.

### 2.1 `cataclysmic-duel-fiora-peerless-permanent-one-on-one` — VEN-090 + SFD-110 (both in zero entries)

"One on one" needs BOTH sides reduced to a single body at that location, so `VEN-090 Cataclysmic
Duel` ("Each player chooses a unit they control. Kill the rest") is the natural enabler: it sets that
state for the whole board, permanently, and Fiora fights at double Might until somebody rebuilds.

355.10.e makes the wipe target nothing — its worked example is literally this wording — so [Deflect]
never charges and no "can't be chosen" clause survives it. **The entry's own risk is stated up
front:** the opponent picks their survivor, so the duel is against their best body, and 465.2.c.3
forbids splitting. It scales through 434.1.d, since a Might Bonus is added *before* the doubling.

### 2.2 `call-to-battle-volibear-forced-move-draw` — UNL-101 + OGN-158 (both in zero entries)

Forcing the opponent to move makes **them** the Attacker on **your** turn (190.3.a keys Contested on
the moved unit's controller; 464.2.c.1 reads that, not who caused the move). And because *they*
choose which body walks in, 355.10.e makes it a non-target: [Deflect] is free and "can't be moved by
enemy spells and abilities" clauses do not bite.

Volibear's parenthesis is load-bearing twice: "a battlefield **other than mine**" forces a two-
battlefield board, and "(Bases are not battlefield.)" means a retreat pays him nothing.

### 2.3 `unyielding-spirit-challenge-unit-damage` — OGN-145 + OGN-128 (both in zero entries)

**A symmetric fog that is not symmetric.** `OGN-145 Unyielding Spirit` prevents "all spell and ability
damage this turn" — and 437.4 makes that total, "*not considered to have been dealt to it at all*", so
no kill event exists — while Challenge's damage is dealt by the **units** (417.6.b.3) and resolves
normally. Combat is untouched for the same reason (417.6.b.1).

That is a deckbuilding rule rather than a combo: build the removal suite out of the 417.6.b.3 family —
`OGN-128 Challenge`, `OGS-008 Gentlemen's Duel`, `VEN-083 Rampage`, `UNL-110 Clash of Giants`,
`SFD-114 Marching Orders`, `OGN-149 Carnivorous Snapvine`, `SFD-107 Strike Down` — and the fog costs
you nothing.

### 2.4 `strike-down-blighted-battleaxe-detach-before-it-bites` — SFD-107 + UNL-019 (both in zero entries)

434.1.c appends an attachment's Effect Text to the **carrier**, so the Battleaxe's "unattach this and
deal 4 to **me**" is 4 damage to your own body at the end of any turn it did not conquer. Strike
Down's closing clause — "Then detach an Equipment from it" — removes the Battleaxe *before* that
trigger can exist. One card's drawback line is the answer to the other's.

The shot is the carrier's full Might including the +4 (434.1.d), it is one-way (417.6.b.3: the enemy
does not deal back, unlike Challenge), and re-arming is 818.1's [Equip] for 1 Energy + 1 Fury Power,
which 381 confines to your own Main Phase.

### 2.5 `pit-rookie-lee-sin-centered-buffed-garrison` — OGN-136 + OGN-151 (both in zero entries)

702.3 caps a unit at one buff, so **the bottleneck is bodies, not buffers**: three Pit Rookies arm
three different units and a fourth buffer is dead. Lee Sin's +2 is a continuous modifier, not a
counter, so it stacks on top of the +1 and 702.3 never touches it — but anything that **spends** the
counter (702.2.b — `OGN-147 Wildclaw Shaman`, `OGN-157 Udyr, Wildman`, both Body, both one card away)
switches his bonus off with it. Carry buffs or spend them; never both.

### 2.6 `dragonsoul-sage-cannon-barrage-off-turn-sweep` — UNL-093 + OGN-127 (both in zero entries)

**The hidden cost six of this session's entries all pay, and the Body answer to it.** 167 empties every
Rune Pool and 415.3.a readies your runes only in your own Awakening, so every off-turn [Reaction] play
is funded by runes deliberately left unexhausted — Energy you did not spend. The Sage moves that onto a
2-Energy body (813.1.c.2). And the Power half is free even off a spent rune, because **164.2.b carries
no exhaust in its cost**: two Sages plus one rune recycle pay Cannon Barrage's full 2 Energy + 1 Body
Power with nothing held ready.

"All enemy units in combat" targets nothing (355.10.d) and 740.2.c scopes it, so it is a clean token
sweeper — and the entry says plainly that 2 damage clears 1- and 2-Might bodies and merely marks
anything bigger.

### 2.7 Refusals and leads from batch 2

- **`OGN-147 Wildclaw Shaman` and `OGN-157 Udyr, Wildman` beside Lee Sin, Centered** — refused by
  702.2.b: both pay by *spending* the buff counter, and Lee Sin's +2 reads the counter. Same shape as
  #153's Wizened Elder / Bilgewater Bully finding.
- **`SFD-105 Ruin Runner` ("I can't be chosen by enemy spells and abilities") as protection from
  Cataclysmic Duel** — refused by 355.10.e: nothing is chosen by the *enemy*; each player chooses
  their own survivor, and the rest die programmatically.
- **A second buffer aimed at an already-buffed body** — refused by 702.3.a: the second counter is
  simply not placed.
- **Lead (not walked):** the whole 417.6.b.3 "they deal damage equal to their Mights" family is a
  synergy rule waiting to be written — seven cards, one predicate, and the rule that they are unit
  damage decides their interaction with every Prevent effect in the pool.
- **Lead (not walked):** `VEN-075 Platewyrm Egg` is the Body **gear** version of the Dragonsoul Sage
  ("[Reaction][>] exhaust: [Add] 1 Energy", doubled while [Empowered]). Off-turn Energy sources are a
  rule, not an entry: `OGN-098 Energy Conduit`, `OGS-014 Lux, Crownguard`, `UNL-049 Honeyfruit`,
  `UNL-197 Scorn of the Moon`, `VEN-141 Butcher of the Sands` and these two are the whole set, and
  only the Sage and the Egg are unrestricted in Body.
