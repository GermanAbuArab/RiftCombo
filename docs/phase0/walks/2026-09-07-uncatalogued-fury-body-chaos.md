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

## 3. Census correction, re-measured on name+type

`rc-walk-fam2` found that coverage keyed on **base code** over-states the uncatalogued population by
~15% in its lane, because 104 of the pool's 935 names carry two or more base codes and
`CardIndex.equivalents` (`src/cards.ts:124`) already resolves a base to every printing sharing its
normalised name and type — so a *reprint of a catalogued card* is already covered by `matchDeck`.

Re-measured here with `.scratch/uncat-fbc.ts`, at 479 entries:

| measure | Fury / Body / Chaos |
|---|---|
| slice population (non-battlefield, non-legend) | 392 |
| uncatalogued, naive base-code count | 158 |
| uncatalogued, after `equivalents()` | **158** |
| uncatalogued, one row per name+type | **158** |
| of which basic runes / banned | 3 / 4 |
| **walkable** | **151** |

**The correction makes no difference in this lane, and the diagnostics say why**: "in naive but not
after `equivalents()`: none", and "uncatalogued name+type rows with 2+ base codes: none". The 104
multi-base names are concentrated in runes, Seals, promos and legends — three of the six basic runes
in this slice are already covered *through* `equivalents()`, which is the mechanism working — and the
Fury / Body / Chaos spell-unit-gear population has essentially no reprints. fam2's ~15% is real and
lane-specific; it is not a general discount to apply to every census.

## 4. Batch 3 — Chaos, five entries

### 4.1 `syndra-transcendent-existential-dread-three-executions` — UNL-146 + UNL-134 (Syndra in zero entries)

**820.1.c.2 + 820.1.c.3: two instances of [Repeat] are THREE executions.** "*If a spell or ability has
more than one instance of Repeat, each Cost may be paid or not paid individually*" and "*Each Repeat
Cost can be paid only a single time*". The project's standing line — "[Repeat] gives exactly one extra
execution" (820.1.b) — is per **instance**, not per spell, and `UNL-146 Syndra, Transcendent` is the
only card in the pool that grants a second one.

**No reading is filed.** 740.2 defines "alone", "one on one" and "in combat" for a unit and says
nothing about being "in a showdown" (343.1 defines a Showdown *state* for the turn). The entry
assumes the *demanding* reading — Syndra at the battlefield where the Showdown is in progress —
because an entry that stands on the narrow reading survives either ruling.

### 4.2 `maduli-the-list-might-gate` — UNL-144 + UNL-138 (both in zero entries)

**A printed "I can't be readied" only costs a unit what its EXHAUST would have bought.** Maduli's move
is an Activated ability whose cost is one Chaos Power and no exhaust (144.2 and 420.3.a put the
exhaust on the *Standard* Move), and combat does not read exhaustion at all (#61). So a permanently
exhausted 6-Might body moves battlefield to battlefield at will and arrives as the Attacker
(190.3.a.1, 464.2.c.1).

His gate is the enemy garrison's **total** Might, which is why a −2 is worth more than a +2:
477.3.e.2.a applies increases first and decreases **last**, so The List's reduction always wins the
race. And winning the gate is winning the combat, since 465.2.b/465.2.c read the same inequality.

### 4.3 `downwell-crescent-guardian-reset-and-redeploy` — SFD-147 + UNL-122 (both in zero entries)

An empty board is a **free Conquer**, and the two paragraphs are different ones: 323.9 stages a Combat
only where opposing units are present, so after Downwell nothing opens; **344.2** covers it instead and
348.2.a.1 says outright "This results in a Conquer". 323.6 / 190.4.c are what make the battlefields
unoccupied *and* uncontrolled — 170.11.c's both conditions.

**Twelve runes pay for the turn exactly.** 161.2.a caps the Rune Deck at "Exactly 12 Rune cards":
exhaust all twelve for the 12 Energy the two cards cost (164.2.a), then recycle three of the *already
exhausted* ones for the 3 Power (164.2.b carries no exhaust). The line is affordable on the turn the
twelfth rune lands and not before.

### 4.4 `the-harrowing-soulgorger-double-reanimation` — OGN-198 + OGN-196 (both in zero entries)

356.1.b.2 makes "ignoring its Energy cost" zero **only** the Energy, which both cards print as a
parenthesis. The pairing exists because Soulgorger's own play trigger is a second copy of the spell:
one Harrowing is two bodies out of the trash, each paying only its Power. 355.2.a is why reanimation
has no walk problem, and 185 / 186.1 are why no token is ever a legal choice.

The entry refuses its own premise for every other target: The Harrowing aimed at anything but
Soulgorger returns roughly what it cost.

### 4.5 `bullet-time-seals-scaling-sweep` — OGN-268 + OGN-204 + OGN-163 (both Seals in zero entries)

**204.3.b names Bullet Time**, and 740.4.a.1 spells out the consequence: "*For spells, costs within
instructions are paid on RESOLUTION of the spell*". So the Power is committed *after* the opponent has
responded — nothing else in the pool lets you size a sweeper that late. 355.10.d makes the units
non-targets, so [Deflect] never charges.

**The Signature check was run before the legend line was written and caught it**: Bullet Time is
tagged Miss Fortune, and the pool has exactly one Miss Fortune legend, `OGN-267 / OGN-309 Bounty
Hunter`. The field is one legend, not the three Body/Chaos names a domain-shaped answer would give.

The Seals are the size of the sweep: 0 Energy and 1 Power to play, 1 Power a turn thereafter
(415.3.a), and 135.2.e.5.b lets domain Power pay a rainbow cost. Being uncapped per activation, it is
dead under every multiplier — the same shape as Ancient Henge and Hextech Anomaly.

### 4.6 Refusals and leads from batch 3

- **Any multiplier, copier or [Repeat] grant on `OGN-268 Bullet Time`** — refused: "Pay any amount"
  already does the whole job in one execution, so a second buys nothing. Power is the only scaling.
- **`SFD-133 Boots of Swiftness` on Maduli** — refused by half: its Might Bonus (434.1.d) does raise
  his gate, but its granted [Ganking] is dead letter on a unit that can never be readied to pay
  144.2's exhaust. A partner that is half dead is a worse partner than one that is wholly live.
- **`VEN-109 Illaoi` + `VEN-100 Up from the Deep`** — dropped from this batch, not refused:
  `rc-walk-rules` merged it while batch 3 was being written, as the twins
  `magma-wurm-illaoi-ready-tentacles` and `soul-shepherd-illaoi-tentacle-wall`. Recorded here because
  the re-census caught it and the collision is the reason to re-census every batch.
- **Lead (not walked):** Syndra's grant is a static over EVERY spell you play in that window, so every
  printed-[Repeat] spell in the pool is a partner — `SFD-136 Hard Bargain` becomes a counter that
  taxes six. One anchor, one predicate: a synergy rule, not five entries.

## 5. Batch 4 — six entries across Body, Body/Fury and Fury

### 5.1 `warwick-hunter-iron-ballista-damage-marks-death` — OGN-159 + OGN-017 (both in zero entries)

**"Kill all DAMAGED enemy units" reads a marker, not a threshold.** 143.2.a is death *by damage* — marked
damage equalling or exceeding Might. Warwick's sweep is a kill *by effect*, so two points off a
3-Energy gear kill a 10-Might body as dead as a 2-Might one. Any pinger in the pool becomes universal
removal beside him.

The clock is **466.1.a.1**, "Insert '3c. Heal all Units.'": every combat cleanup wipes the marks, so the
ping and the attack must be the same Main Phase, in that order — and 383.2.a.1 with 464.2.c.3 means the
mark has to be on the board *when Warwick is designated*, not in response to it.

`OGN-017 Iron Ballista` is Riot's own worked example at 417.6.b.2.a ("*This damage is dealt both by a
gear and by an ability*"), which also places it on the spell-and-ability side of the 417.6.b.3 line — a
blanket Prevent stops it, and a Bonus Damage static raises it.

### 5.2 `clash-of-giants-spoils-of-war-free-removal` — UNL-110 + OGN-144 (both in zero entries)

A wording comparison across the 417.6.b.3 family: `OGN-128 Challenge`, `VEN-083 Rampage` and
`SFD-114 Marching Orders` all say "a friendly unit **and** an enemy unit"; `UNL-110 Clash of Giants`
says "**two units**". So it can point two enemy bodies at each other and risk nothing of yours — the
only member of the family that can. The trade is mutual, so it only kills both when each Might reaches
the other's, and 466.1.a.1 heals the survivor.

`OGN-144 Spoils of War` is written for the corpse: 2 Energy + 1 Power instead of 4 + 1, draw two. And
the discount is a discount — 166.2, 203.1, 356.4.b — so any "if you spent N" clause reads the smaller
number.

### 5.3 `petricite-monument-ruin-runner-tax-versus-prohibition` — SFD-104 + SFD-105 (both in zero entries)

**[Deflect] is a tax; "can't be chosen" is a prohibition.** 809.1.c charges an extra Power per choice
(809.1.c.1: any domain), so a player with the Power simply pays. 054.1 makes `SFD-105 Ruin Runner`'s
clause absolute — no amount of Power buys through it. The catalogue treats the two interchangeably in
several notables and they are different kinds of thing.

**Neither stops a programmatic effect** (355.10.d), which is where both decks die: Thermo Beam, Cannon
Barrage, Bullet Time and Cataclysmic Duel go through both.

`SFD-104 Petricite Monument`'s [Temporary] is a *window*, not a drawback: 816.1.b kills it at the start
of your next Beginning Phase, so a Monument played in your Main Phase covers the whole of the
opponent's turn and dies before your own Scoring Step.

### 5.4 `catalyst-of-aeons-stormclaw-refill-or-cantrip` — OGN-138 + OGN-137 (both in zero entries)

**An exhausted rune is Power now and Energy next turn, and the halves are different rules.** 164.2.a's
Energy ability costs the rune's exhaust, so nothing until 415.3.a; 164.2.b's recycle costs no exhaust,
so one Power of its domain immediately, at Reaction speed. That is the real payoff of every "channel N
exhausted" card in the pool.

And **430.3** — "*If there aren't sufficient runes in the Rune Deck, channel as many as possible*" — is
the rule behind Catalyst of Aeons' printed late-game mode: it does not fizzle, it channels what it can,
and its own second sentence pays a card when it could not channel two.

### 5.5 `vayne-hunter-sun-disc-two-conquers` — OGN-035 + OGN-021 (both in zero entries)

**The point is banked before she leaves.** 469.1 and 471.1 Gain the point at the Score; 323.6 then takes
the battlefield back when she bounces to hand, and does not unbank it. The line trades ground for score
and puts the body out of reach in one motion.

The Sun Disc is the second "enters ready" — 812.1.c's [Legion] is satisfied by Vayne herself, since she
is cast first — so she is replayed ready and conquers the *other* battlefield. 470 with 485.4 makes two
the hard ceiling, and this reaches it with one unit card.

Stated because a reader assumes it the other way round: **471.1.a.1 exempts NON-Conquer points from the
Final Point restriction**, so a Conquer engine is precisely the kind that can stall at seven.

### 5.6 `baccai-sandspinner-forsaken-baccai-rune-count` — VEN-001 + VEN-005 (both in zero entries)

Two printings of one idea, one gameable and one not. "*if you control 4 or fewer runes*" is checked
when the [Empower] cost is determined, in your Main Phase (827.1.c.3), so you may act first. "*if you
control fewer runes than an opponent AT THE START OF YOUR BEGINNING PHASE*" is read at 315.2.a, before
315.3.b's Channel Phase, and nothing can game it.

**The discount is a rebate, not a plan, and the entry prices it:** reaching four runes costs eight
runes off the board (164.2.b needs no exhaust, so spent runes still recycle; 161.2.b sends them to the
Rune Deck, and 315.3.b returns only two a turn) in exchange for three Energy. Worth taking on a turn you
were converting runes to Power anyway — and that same turn switches the Forsaken Baccai's clause on for
the four turns it takes to refill.

### 5.7 Refusals and leads from batch 4

- **Pricing `OGN-138 Catalyst of Aeons` or `OGN-137 Stormclaw Ursine` as mana rocks** — refused: a Seal
  pays every turn for one exhaust, a channelled rune pays once and leaves the board when recycled.
- **[Deflect] or "can't be chosen" as an answer to a sweeper** — refused by 355.10.d: the units are not
  chosen, so neither clause is consulted.
- **A ping applied on the opponent's turn as setup for Warwick** — refused by 466.1.a.1: the combat
  cleanup heals it before your attack.
- **Lead (not walked):** the [Assault] package — `OGN-015 Captain Farron` ("Other friendly units here
  have [Assault]"), `OGN-004 Cleave`, `SFD-003 Blood Rush`, `VEN-009 Baccai Reaper`, `VEN-012 Perfect
  Execution`, `SFD-131 Ancient Warmonger` ([Assault] equal to the number of enemy units here),
  `VEN-076 Repair Specialist` ([Assault] equal to your gear) — all on 807.2's summing of granted
  [Assault]. One synergy rule.
- **Lead (not walked):** the XP package in Body — `UNL-092 Demacian Diplomat`, `UNL-094 Gemhand
  Hunter`, `UNL-095 Grim Resolve`, `UNL-098 Targonian Visionary`, `UNL-091 Concentrate`,
  `UNL-108 Wily Newtfish`, `UNL-115 Nilah` — bounded by 824.1.d (a Level ability goes Inactive as soon
  as you drop below its threshold) and 730.2 (spending XP is your own reduction), so it is an ENGINE
  ceiling and a synergy rule rather than a set of entries.

## 6. Batch 5 — six more, across Body, Fury, Chaos, Body/Chaos and Chaos/Fury

### 6.1 `akshan-mischievous-hexdrinker-stolen-gear` — SFD-109 + SFD-102 (both in zero entries)

[Weaponmaster] equips "to me", so it only ever pays for **carrier-independent** Equipment, and
`SFD-102 Hexdrinker`'s single-rune [Equip] is discounted to nothing. Two rules keep the steal honest:
191.1 makes it a *control* change that ends when Akshan does, and **056 with 056.2** keeps the card in
its owner's zones — destroy the stolen gear and it goes to **their** trash. The stolen Equipment
attaches with no [Equip] cost paid, because "attach it to me" is effect text and 818.1 governs
activations.

### 6.2 `monster-harpoon-bushwhack-facedown-enabler` — UNL-014 + SFD-004 (both in zero entries)

**The [Hidden] family in this catalogue is written around the hide EVENT and the face-down PLAY; this
is the one card that reads the resulting STATE.** "If you *control* a facedown card" plus 811.1.b's
"for as long as you control that battlefield" means one rainbow, paid once, doubles every Harpoon for
the rest of the game — and *cashing* the hidden card is what switches it off. `SFD-004 Bushwhack` is
the right card to leave down because its own effect is a one-shot tempo burst you were holding anyway.

Because the clause is the Harpoon's own text and not a hidden card's play effect, 811.1.d.2 does not
confine the target.

### 6.3 `vex-cheerless-void-seeker-combat-discount` — SFD-146 + OGN-024 (both in zero entries)

**155 is the selection rule for every partner a "while I'm in combat, spells cost less" card can
have**: "*A spell can be played during an Open State outside of Showdowns on its controller's turn*",
so only [Action] and [Reaction] spells can exist in the window Vex creates. Her discount is two
resources and 356.4.e keeps its floor local; 356.6 is why the rainbow half is simply wasted on a spell
with no Power cost. The mirror half taxes their answer by the same two.

She is also a liability: being "in combat" (740.2.c) means being a legal damage assignment, and
465.2.c.3 lets the opponent spend lethal on her first to switch the discount off mid-combat.

### 6.4 `mindsplitter-insightful-investigator-hand-attack` — OGN-192 + UNL-135 (both in zero entries)

Three printed words apart and two different effects: "they discard that card" is card advantage,
"they discard that card **and draw 1**" is a swap. The Investigator's price is **XP**, and 730.2 takes
it out of the same pool 824.1.d reads — so it can switch off a [Level N] ability you already had
online. The reveal is free either way (424.1, 424.1.a), which is the half worth building around.

And 056.2 means the stripped card lands in **their** trash, where their own recursion reads it.

### 6.5 `loyal-pup-jagged-cutlass-free-defensive-relay` — SFD-126 + VEN-073 (both in zero entries)

The same relocation as the Vex, Mocking relay **with no enabler at all**: "when you defend at a
battlefield" is supplied by the opponent attacking, 420.3.a charges nothing for an effect move, and
464.2.c.3.a with 319.8 and 323.2.a put him in that damage step. `VEN-073 Jagged Cutlass` answers the
counterplay exactly — "I can't be moved by **enemy** spells and abilities" is a prohibition (054.1)
against the whole enemy-mover family, and the word *enemy* is why it never interferes with the Pup's
own relay.

### 6.6 `angler-beast-ocean-drake-open-and-take` — UNL-132 + VEN-115 (both in zero entries)

"Open" is two conditions (170.11.a/b/c) and emptying a garrison only supplies one directly: the
battlefield becomes unoccupied at once and uncontrolled at the **next Cleanup** (323.6, 190.4.c).
Then 355.2.b lets the Drake be played there, 323.9 stages no Combat, and 344.2 with 348.2.a.1 gives a
**Conquer with no damage step**.

**The finding, and it generalises:** a "play me to an open battlefield" card can never use its own
play trigger to make the battlefield open, because **355.2 fixes the play location during the play
steps**, before any trigger resolves. That is the general form of the project's "an evacuator is never
a walker" rule.

### 6.7 Refusals and leads from batch 5

- **`VEN-115 Ocean Drake`'s bounce as its own enabler** — refused, see 6.6. 355.2 fixes the location
  first.
- **Any spell without [Action] or [Reaction] as a `SFD-146 Vex, Cheerless` partner** — refused by 155.
  Her discount exists only inside a combat and a plain spell cannot be cast there at all; this silently
  removes most of the partner list she appears to have.
- **`UNL-135 Insightful Investigator` as a way to run an opponent out of cards** — refused on the
  card's own text: they draw 1, so the hand size is unchanged. It is a swap.
- **A second hidden card as a `UNL-014 Monster Harpoon` enabler** — refused: the clause asks whether
  you control *a* facedown card, so the second one is worth its own effect and not a point of damage.
- **Lead (not walked):** the bounce family in Chaos is wide and mostly uncatalogued —
  `OGN-187 Whirlwind` and `SFD-132 Beast Below` (both symmetric), `OGN-188 Zaunite Bouncer`,
  `VEN-105 Twilight Step`, `VEN-107 Decree of Discord`, `SFD-138 Windsinger`. 355.10.e is the rule
  that separates them: a bounce each player chooses for themselves targets nothing and [Deflect] never
  charges, while one you choose does.
- **Lead (not walked):** `OGN-174 Sai Scout` prints the same "play me to an open battlefield"
  permission as the Ocean Drake for two Energy less and no Power, and `OGN-161 Deadbloom Predator`
  prints the opposite one ("You may play me to an occupied ENEMY battlefield"). 355.2.b plus the
  170.11 vocabulary is one synergy rule covering all of them.

---

# Continued by session `rc-walk-fc`, 2026-09-07 — the lane narrowed to Fury / Chaos

`rc-walk-fam1` was archived at 61% of its context. This half of the document continues the same
issue (#173) with the slice narrowed by the manager: **Body was split off to `rc-walk-order`**, so
what follows is cards whose domains are a subset of **{Fury, Chaos}**, plus the **ten dual-domain
Signature spells that fell between the three lanes**. Method, sources and standard of proof are
unchanged: card text verbatim from `data/corpus_flat.txt` by grep, every rule number opened in
`data/Riftbound-Core-Rules-2026-07-16.txt` and pasted, arithmetic checked against each entry's own
`uses`.

## 7. The census, and a correction to §3 that changes how every future census must be written

| measure | Fury / Chaos, at 564 entries |
|---|---|
| slice population, non-battlefield / non-legend / non-rune, **by base code** | 273 |
| uncatalogued **by base code** | 76 |
| uncatalogued **by name+type** | 72 |
| gap | **5.3%** |
| banned in constructed | 4 — OGN-168, OGN-182, SFD-020, SFD-122 |
| **walkable** | **68** |

The four multi-base names in the uncatalogued set, written out so the next reader refutes this in one
grep instead of inheriting it: `Pouty Poro [OGN-013, UNL-220]`, `Draven, Showboat [OGN-028, VEN-172]`,
`Seal of Rage [OGN-040, SFD-222]`, `Mystic Poro [OGN-171, UNL-224]`.

**§3 of this document reports a zero gap for Fury/Body/Chaos and concludes the name+type correction
"makes no difference in this lane". That is wrong, and the cause is worth more than the number.**
`.scratch/uncat-fbc.ts` builds its population from `poolOf(cards)`, and `poolOf`
(`src/builder.ts:136`) is `[...basesByName(cards).values()].map((bases) => cards.get(bases[0]!)!)` —
it **already collapses by name**. So both columns of that census were the name+type figure, its
"naive base-code count" was never a base-code count, and its diagnostic line
("uncatalogued name+type rows with 2+ base codes: none") was true of a population that had been
deduped before it was measured. The general rule: **a census that wants to compare base codes with
name+type must count over `data/cards.json` deduped by `base`, never over `poolOf`.**
`.scratch/uncat-fc2.ts` does it that way; `.scratch/uncat-fbc.ts` is left in place unmodified, since
it belongs to an archived session's walk.

Six lanes have now measured this gap and it runs from **0% to 19.2%** — it is a per-lane
measurement, and 15% is not a discount anybody may carry into a new lane.

## 8. The partition, written down

The ten dual-domain Signature spells that belong to no lane are taken here. Every uncatalogued
dual-domain spell in the pool is Signature — sixteen of sixteen — so for all of them
`prerequisites.easy` is a **one-legend field** under 103.2.d.2, and 103.2.d.1 caps the deck at three
Signature cards in total.

| card | domains | tag | forced legend |
|---|---|---|---|
| OGN-248 Icathian Rain | Fury/Mind | Kai'Sa | Daughter of the Void (OGN-247 / OGN-299) |
| SFD-182 Danger Zone | Fury/Mind | Rumble | Mechanized Menace |
| OGN-260 Last Breath | Calm/Chaos | Yasuo | Unforgiven |
| OGN-266 Siphon Power | Mind/Order | Viktor | Herald of the Arcane |
| OGS-022 Final Spark | Mind/Order | Lux | Lady of Luminosity - Starter |
| SFD-200 Arcane Shift | Mind/Chaos | Ezreal | Prodigal Explorer |
| VEN-152 Rebuttal | Mind/Chaos | Mel | Soul's Reflection |
| VEN-140 Shuriken Flip | Fury/Calm | Akali | Rogue Assassin |
| VEN-148 Shadow Dash | Calm/Order | Shen | Eye of Twilight |
| VEN-156 Lightning Rush | Order/Chaos | Kennen | Heart of the Tempest |

**Five, not four, contain Body** and belong to `rc-walk-order`: OGN-258 Dragon's Rage, OGS-020
Highlander, OGS-024 Decisive Strike, UNL-202 Void Assault, UNL-204 Keeper's Verdict. And **one is in
no lane at all and is not in the ten**: `VEN-146 Siphoning Strike` (Calm/Mind, tag Nasus, forced
legend Curator of the Sands), flagged to the manager rather than taken, since Calm and Mind are
unstaffed.

## 9. Batch 6 — five entries

### 9.1 `icathian-rain-annie-ravenborn-six-deal-actions` — OGN-248 + OGS-001 + OGN-032

**The Bonus Damage family's ceiling, and the card that sets it.** 715: *"Bonus Damage applies to the
total damage Dealt by one instance of the action."* `OGN-248 Icathian Rain` prints the sentence
*"Deal 2 to a unit."* **six separate times**, so a +1 static is paid six times. The entry is written
to be robust to the other reading — if the six sentences were one Deal action with six targets,
715.2 gives the same six (*"the amount of Damage dealt to each target is increased by Bonus Damage
individually and separately"*, whose worked example names Annie by name).

**714 is the ceiling nobody expects**: *"If more than one instance of Bonus Damage is applied or
granted to a Deal action, all instances are summed and applied once."* Annie plus `OGN-032 Ravenborn
Tome` is **+2 per Deal action** — 6 × 4 = 24 — and not 2 × 18. A second static adds; it never doubles.

**And it has no location clause, so it reaches a base.** Swept over the corpus: exactly six cards
print damage to *"a unit"* with neither *"at a battlefield"* nor *"here"* — `OGN-029 Falling Star`,
`OGN-248 Icathian Rain`, `OGN-252 Super Mega Death Rocket!`, `OGS-022 Final Spark`,
`UNL-020 Dancing Grenade`, `UNL-026 Xerath, Freed`. The Rain is the only one of the six with more
than two Deal actions, which is exactly what makes it the family's maximum; Falling Star's two are
already catalogued as `ravenborn-tome-falling-star-two-deal-actions`, and this entry is a different
number, not a restatement.

### 9.2 `lucian-gunslinger-farron-blood-rush-assault-as-damage` — SFD-028 + OGN-015 + SFD-003

**807.3 had never been cited by this catalogue** (0 hits in `data/combos.json`): *"Assault, and
whether or not a unit has Assault, is a characteristic of the Unit and may be checked or referenced
by other Game Effects."* That is the paragraph under `SFD-028 Lucian, Gunslinger`'s *"When I attack,
deal damage equal to my [Assault] to an enemy unit here"*, and it is what turns the granted-[Assault]
package from a **Might** package into a **removal** package.

Arithmetic with the entry's own quantities: 807.1.b.3 (*"If X is omitted, it is presumed to be 1"*)
gives Lucian 1 and Captain Farron's grant another 1; 807.2 sums them; Blood Rush is [Assault 2] and
820.1.b buys exactly one extra execution, so its [Repeat] is a second [Assault 2]. **1 + 1 + 2 + 2 =
6** — Lucian attacks at Might 8 and deals 6. The floor that repeats is Farron alone: [Assault] 2
forever, 2 damage on every attack, no further cards.

359.3.f.2 is why the pump can be bought late — the value is read *on execution*, and its worked
example is the identically shaped Yasuo, Remorseful trigger resolving on *"his current Might of 5"*.
Blood Rush carries [Action], so 806.1.b puts it inside the opened combat. The entry's steps use the
Main Phase anyway, because that ordering needs no argument.

**This is one entry, not the family.** OGN-004 Cleave, SFD-003 Blood Rush, VEN-009 Baccai Reaper,
VEN-012 Perfect Execution, SFD-131 Ancient Warmonger, VEN-076 Repair Specialist and OGN-015 Captain
Farron are one predicate on 807.2 and belong to `rc-walk-rules2` as a synergy rule.

### 9.3 `bone-skewer-pairofant-stunned-attacker-execution` — UNL-139 + UNL-008 + SFD-001

**190.3.a.1 reads *"moving to OR BEING PLAYED TO"***, and 464.2.c.1 makes the Attacker *"the player
whose unit(s) applied the Contested status"* — so a card that makes the **opponent** play a unit at
**your** battlefield makes **them** the attacker on **your** turn. `UNL-139 Bone Skewer` is the only
card in the pool that does it out of their hand, for free, with the body arriving [Stun]ned.

The two stun paragraphs cut in opposite directions and both matter: 423.1.b (*"A Stunned Unit does not
contribute its might to damage in the combat damage step"*) makes their assignment under 465.2.c
**zero**, so nothing of yours is scratched; 423.1.c (*"A Stunned Unit must still have damage applied
to it equal to, or greater than, its full might value to be killed"*) means the stun is **not a
discount**. Towering Pairofant at Might 6 plus Against the Odds' +2 for the one enemy unit there
assigns 8: this executes anything in their hand **up to Might 8**, and nothing above it.

It is a **defensive** payoff and the entry says so: 466.5 establishes Control only *"for a player if
they didn't already control this Battlefield"*, and 811.1.b hides the card at a battlefield you
already control, so there is no Conquer. What it buys is their best card, out of hand and into the
trash, for 0 Energy. The risk, stated: 191.1 / 191.2 make **them** the player who plays it, so the
pulled card's own play trigger fires for them — choose a big vanilla body over a small one with text.

811.1.d.2 is what aims the spell: hidden, *"Choose a battlefield"* can only be the one you hid at.
The hand choice escapes the same clause under its own tail (*"unless the ability explicitly restricts
targeting in a way that makes this impossible"*, worked example Tideturner), because no card in a
hand is at any battlefield.

### 9.4 `harpoon-squad-pendulum-blade-boots-double-move-rider` — SFD-137 + VEN-011 + SFD-133

**One [Ganking] move is both a departure and an arrival.** 144.4.c.1: *"Units with Ganking may use
their Standard Move to Move from Battlefield to Battlefield."* A base-to-battlefield move is only an
arrival and pays the Blade alone; a battlefield-to-base move is only a departure and pays the Squad
alone. Only the Ganking move is both, and it pays **+4 for one exhaust**. That is the reason the
Boots are in the line rather than a cheaper body — bought for the permission, since 810.2 says
*"Multiple instances of Ganking are redundant"*.

136.2.d decides whose Might rises: *"Effect Text may refer to 'this' or to the name of the Attached
game object… Doing so refers to the Attached game object and not the Top-Most Card."* The Blade says
**"I"** and **"me"**, not "this", so both are the carrier. Standing Might is 4 + 1 + 2 = 7 (434.1.d),
attacking Might 11. Neither rider is a Buff counter, so 702.3's cap and 703's fixed +1 are silent.

It repeats **exactly once a turn, forever**: 144.2 and 420.3.a put the exhaust on the Standard Move,
415.3.a hands it back every Awakening. And the cost of leaving is real — 323.6 strips your Control of
the battlefield he departs if he was its sole garrison.

**A refusal was re-scoped rather than inherited.** `SFD-133 Boots of Swiftness` was refused in §5.7 of
this document as a `UNL-144 Maduli` partner, correctly: a unit that can never be readied cannot pay
144.2's exhaust, so granted [Ganking] is dead letter on it. That refusal is scoped to Maduli's own
printed drawback and says nothing about a carrier that readies normally — the #59 Garbage Grabber
lesson, applied inside the same walk document.

### 9.5 `acceptable-losses-ravenbloom-prefect-gearless-gear-hate` — OGN-179 + VEN-102

**055 is the whole card**: *"When executing card text, do as much as you can, ignoring impossible
instructions."* A player who controls no gear ignores *"kill one of their gear"*, and 055.1 resolves
the spell anyway. So in a list that runs **zero** gear, the pool's only symmetric gear wipe is a
**one-sided** gear kill for 1 Energy at [Action] speed. Nothing in the card does this; the deck does.

**And a Gold token would arm the half you dodged.** 185.2.d: *"Tokens have a type. They follow all
rules for their type unless otherwise specified."* A Gold gear token is gear for this instruction, so
`UNL-145 Pyke, Returned` — Chaos, mints a Gold on an enemy death — is **anti-synergic** with the
entry. The positive half of the token rules, biting the player who normally benefits from it.

355.10.e is why nothing is targeted (its printed example is this exact shape), so 809.1.c's [Deflect]
tax never charges and `SFD-105 Ruin Runner`'s absolute *"can't be chosen by enemy spells and
abilities"* never engages — at the price that the **opponent** picks which of their gear dies.

`VEN-102 Ravenbloom Prefect` covers what the spell cannot. 383.3.b makes *"you may banish me to
banish it"* the trigger's **base cost**, and 383.3.b.1 requires it *"in order to finalize the
Triggered Ability to the Chain"*, so the Prefect is already gone when the trigger goes on. Under
**R26 = B** it fires as the gear resolves, so it answers **persistent** gear (Equipment, Seals) and
not gear whose value was its arrival — the entry does not depend on which way R26 falls, since the
gear is banished either way.

**A measurement lesson from this entry.** The project's earlier gear-removal inventory was built with
a regex on the singular verb, and `grep -inE "kill (a|all|one)[^.]*gear"` **misses Acceptable Losses
entirely**, because the card prints *"Each player **kills** one of their gear."* Swept correctly
(`kills? [^.]*gear`), the pool's symmetric-kill rows are exactly two: `OGN-179 Acceptable Losses` and
`OGN-209 Cull the Weak`.

## 10. Refusals from batch 6, each with the paragraph that kills it

- **`OGN-191 Maddened Marauder` + `OGN-174 Sai Scout` — evacuate with a play trigger, then play a body
  to the opened battlefield.** Refused as a **duplicate mechanism at twice the price**. The chain is
  sound (323.6 strips Control at the next Cleanup → 170.11.c makes the battlefield *open* →
  355.2.b permits the play → 190.3.a.1 Contested → 344.2 opens a Showdown → 348.2.a.1 *"This results
  in a Conquer"*), but it is card-for-card `isolate-deckhand-open-conquer` (UNL-124 Isolate + OGN-176
  Sneaky Deckhand) for **11 Energy instead of 5**, and the catalogue already holds
  `stare-down-buccaneer-open-battlefield-conquer` on the same shape. Same mechanism, same arithmetic,
  worse numbers: a notable, not an entry. Recorded so the next session does not re-derive it.
- **`UNL-130 Walking Roost` as a way to manufacture enemy bodies for `SFD-131 Ancient Warmonger`
  ([Assault] equal to the number of enemy units here) or `SFD-001 Against the Odds` (+2 per enemy unit
  there).** Refused by **355.2.a**: the Roost says *"They play a 1 Might Bird unit token"* and names
  no destination, so the token goes to *the controller's Base or a battlefield the controller
  controls* — **their** choice, and they will put it at their base. You cannot buy an enemy body at a
  battlefield you have picked.
- **`UNL-145 Pyke, Returned`'s Gold token as fodder for `OGN-179 Acceptable Losses`.** Refused by
  185.2.d + 055: running the fodder is strictly worse than running none, because 055 already makes
  your half of the instruction impossible when you own no gear. The "free sacrifice" instinct inverts
  here.
- **A second Bonus Damage source as a multiplier on Icathian Rain.** Refused by **714** — instances
  are *"summed and applied once"* per Deal action. `OGN-032 Ravenborn Tome` beside Annie is +2 per
  action, not ×2. (Recorded again because §1.6 refused it for Piercing Light and the arithmetic is
  the one readers keep re-deriving.)
- **A second [Ganking] grant on the Harpoon Squad.** Refused by **810.2** (*"Multiple instances of
  Ganking are redundant"*) and 810.1.c.3 (*"It does not give additional abilities or activations of
  Movement, only new options for the Standard Move"*).

## 11. Batch 7 — five entries, three of them on the orphan Signature spells

### 11.1 `shuriken-flip-akali-deadly-weapon-move-ping` — VEN-140 + VEN-021 (both in zero entries)

A Signature spell whose **second clause exists to fire the champion's own trigger**. 449: *"Spells,
Abilities, or other effects may cause a Move to occur"*, and 420.2.b makes the Standard Move merely
one thing that *"may **also** cause Movement"* — so *"then move a friendly unit"* is a Move for every
purpose, including `VEN-021 Akali, Deadly Weapon`'s *"When I move"*. One card is 2 damage from the
spell plus 1 from her, or 2 while she is [Empowered]: **four damage for 1 Energy + 1 Power**.

The move is free in both senses that matter: 420.3.a puts the exhaust on the Standard Move alone, so
an already-exhausted Akali moves; and 144.4's base-to-battlefield restriction is written for the
Standard Move, so the effect move goes battlefield to battlefield with no [Ganking]. Her clause reads
*"a unit at a battlefield I moved **to or from**"*, so the two halves can land at two different
battlefields — this is split removal, not a 4-point shot.

The Empower is bought once and kept (441.1.b, 441.2), and [Flow] is **six plays a game, not an
engine** (829.1.b + 103.2.b + 108.6.c).

### 11.2 `consuming-curse-annie-self-scaling-bonus` — VEN-010 + OGS-001 (the Curse in zero entries)

**The un-controversial cousin of R15.** `UNL-020 Dancing Grenade` counts *"each time this spell has
dealt damage this turn"* — a history that had to be ruled. `VEN-010 Consuming Curse` counts *"each
card with this name in your **trash**"*: a zone, read on resolution, nothing to track. Same escalating
burn, ambiguity removed.

714 sums the card's own scaling with Annie's static, and 103.2.b caps the deck at three **by name** —
which is the same quantity the card reads. Cast in order: 2, 3, 4 = **nine**; under Annie 3, 4, 5 =
**twelve**.

**And the trap is that milling the copies loses you damage.** Putting two Curses in the trash without
casting them makes the survivor a 4 (5 under Annie) — better per *card*, worse in *total* than the
9 (12) from casting all three. The instinct to load the trash first is wrong on this card.

### 11.3 `vicious-snapjaws-scorchclaw-xp-faucet-no-sink` — UNL-129 + UNL-016 (both in zero entries)

**Domain Identity is a PAIR, and that is the whole reason this pairing exists.** Swept over the corpus
for `[Level`: mono-Chaos prints no [Level] card at all, and `UNL-016 Scorchclaw` is the **only** one in
Fury. So under any of the five Fury/Chaos legends, `UNL-129 Vicious Snapjaws` — the pool's only
death-to-XP faucet — has exactly one outlet, and this is it.

This narrows a line CLAUDE.md carries: *"Chaos prints no [Level] static at all, so UNL-129 Vicious
Snapjaws … has no outlet in identity."* The first half is right; the conclusion is scoped to
**mono**-Chaos, and 103.1.b makes an identity two domains. Reported to the manager rather than edited
here, per the project rule.

The mechanics: 824.1.d (*"The Dependent Ability will be Inactive as soon as the controlling player has
less than [N] XP"*) with 730.2 (*"To Spend XP, reduce the value of XP marked on the Player spending
it"*) mean a [Level] rung is **a threshold you hold, not a price you pay** — so the correct build runs
a faucet and **nothing that spends**. `UNL-126 Megatusk` (Chaos, *"Spend 3 XP"*) is therefore the
anti-synergy sitting in the same domain, and it is the obvious thing to do with a growing pile.

Rate: 823.1.c.1 makes [Hunt 2] *"When I Conquer or Hold, my controller gains 2 XP"*, 315.2.b.2 Holds
every battlefield you control and 485.4 gives a Duel two — up to 4 XP a turn from Scorchclaw alone.
The payoff is honestly small: *"enter ready"* is a play-time property, not a ready (415.1), so the
rung is +1 Might plus one free arrival per further copy.

### 11.4 `draven-showboat-arena-kingpin-score-scaling-body` — OGN-028 + UNL-001 (both in zero entries)

**Swept, with the members named**: exactly three cards in the pool read your point total —
`OGN-028 Draven, Showboat` (*"My Might is increased by your points"*), `OGN-112 Kai'Sa, Evolutionary`
(points as a cost ceiling) and `SFD-055 Needlessly Large Yordle` (points *scored from holding this
turn*). Draven is the only one whose **body size** is your score.

194.1 lists three separate kinds of point — Hold, Conquer, and *"Spells, Triggered Abilities and
Activated Abilities that instruct them to gain one or more points"* — and Draven reads the total, so
R2 = A's card-text points grow him exactly as a Conquer does, while 469 and 470 never see them.

`UNL-001 Arena Kingpin`'s *"+3 :rb_might: this turn"* places no counter, so 702.3 (*"There can only be
one Buff on a Unit at a time"*) and 703 (a Buff is exactly +1) are both silent and **three Kingpins
stack for +9**. 143.4.a's *"I enter ready"* makes the first pump available the turn he lands, and
415.3.a refunds the exhaust every Awakening.

**The weakness is the opposite of what a reader assumes and the entry leads with it**: Draven is
*smallest* when you are behind. He widens a lead; he never closes a gap.

### 11.5 `rebuttal-mel-souls-reflection-offset-empower` — VEN-152 + VEN-110 + VEN-151

**The obvious line does not work, and 381 is why.** Empowering `VEN-110 Mel, Defiant Soul` fires two
triggers at once — her banish and the legend's *"When you empower something else, empower me"* — and
383.3.d lets you order them so the legend is Empowered before the banish resolves. But the legend's
answer (*"Disempower me, exhaust: Give a unit at a battlefield -2 Might this turn"*) is an **Activated
Ability**, and 381 reads: *"All Activated Abilities can only be activated on the Controlling Player's
Turn and **during an Open State**."* While Mel's banish sits on the Chain the state is Neutral Closed
(310.2), so 340.4's priority window buys nothing — the ability carries neither [Action] nor [Reaction].

**A different legal ordering was tried first, as the project requires before filing any reading, and
it still fails — so no reading is filed.** The honest shape is an engine **offset by one event**:
Empower something else on an earlier turn so the legend is Empowered, spend its -2 in your own Open
State, then Empower Mel and let her banish take a body that was 5 Might. Ceiling 3 → 5.

Two more from the same entry. 206 keeps Rebuttal's *"costs no more than 4"* window fixed on the
**printed** cost, so no discount sneaks a big spell in and none of the pool's three cost-increases
(`VEN-045 Helm of Suppression`, `VEN-160 Mystic Vortex`, `UNL-219 Vaults of Helia`) pushes one out —
the mirror of the catalogue's existing note that a spell tax never widens your own counter's window.
And 056 / 056.2 send a **stolen** spell to its OWNER's trash: the rainbow buys the effect, not the card.

## 12. Refusals from batch 7

- **`UNL-126 Megatusk` as the XP outlet for `UNL-129 Vicious Snapjaws`.** Refused by **824.1.d**: the
  rung of the only [Level] card in the identity goes Inactive the moment you drop below 3 XP, and
  730.2 makes spending your own reduction. A faucet plus a sink is worth less than a faucet alone here.
- **Loading the trash with `VEN-010 Consuming Curse` before casting one.** Refused by arithmetic:
  three casts total 9 (12 under Annie), a mill-two-cast-one line totals 4 (5). Better per card, worse
  per game.
- **`SFD-133 Boots of Swiftness` or any other [Ganking] source added to `shuriken-flip-akali-deadly-weapon-move-ping`.**
  Refused as redundant: 449's effect move is not restricted by 144.4 at all, so the Flip already moves
  Akali battlefield to battlefield, and 810.2 makes a second Ganking instance worth nothing regardless.
- **Buying the legend's -2 Might inside the empower event that needs it.** Refused by 381 + 310.2, in
  full, in §11.5. This is the reason the entry is written as an offset engine rather than a two-card
  combo.

## 13. Batch 8 — the orphan Signature spells, five entries

All five are Signature cards, so all five `prerequisites.easy` lines are **one legend name**. The
partition note in §8 records the invariant that makes this safe, verified independently here and by
`rc-walk-order`: **each of the nine spells forces exactly one legend name, and that legend's two
domains are exactly the spell's two.** They are matched pairs, which removes the whole class of
legend-list arithmetic error `test/legend-lines.test.ts` exists to catch.

### 13.1 `arcane-shift-zaunite-bouncer-two-choices-one-card` — SFD-200 + OGN-188 + SFD-199

**One card pays a two-card condition.** `SFD-199 Prodigal Explorer` asks that you have *"chosen enemy
units and/or gear twice this turn"*; the catalogue's existing `prodigal-explorer-two-choices-draw`
spends two separate cards on it. `SFD-200 Arcane Shift` supplies both in printed order — the replayed
`OGN-188 Zaunite Bouncer`'s ETB chooses a unit at a battlefield, and the spell's own *"Deal 3 to an
enemy unit at a battlefield"* chooses another.

**The blink is free but it costs you your position.** *"Ignoring its cost"* is wider than 356.1.b.2's
Energy-only carve-out, so nothing is paid — but 355.2.a still sends the body to *"the controller's
Base or a Battlefield the controller controls"* and 143.4 makes it enter exhausted. A unit blinked out
of a **contested** battlefield does not come back to it.

### 13.2 `lightning-rush-heart-of-the-tempest-flow-fires-its-own-legend` — VEN-156 + VEN-155

**A Signature spell built to fire its own legend.** 829.1.b makes [Flow] short for *"You may play this
from your **trash** for its flow cost"*, and `VEN-155 Heart of the Tempest` reads *"When you play a
card from anywhere other than your hand, empower me"*. The spell's own first half fills the trash it
will be replayed from.

It is the pool's only Burn-Out-safe trash filler and 431.1.c is why: *"…that player looks at or
Reveals as many as possible, but **does not Burn Out**, then proceeds with the rest of the
instruction"*, with 431.1.c.1 extending the protection to the zone change that follows.

**The honest cap is one [Assault 2] a turn.** The legend's payoff costs its own exhaust, so 415.3.a
returns it only at your Awakening: six Flow plays across three copies still buy one pump a turn.
441.1.b is why *"Disempower me"* is in the cost at all — it is what makes the cycle repeatable.
The identity's whole Flow pool is seven cards and they all empower it: `VEN-098 Stargazer`,
`VEN-100 Up from the Deep`, `VEN-105 Twilight Step`, `VEN-113 Kennen, Storm of Shuriken`,
`VEN-116 Dragon Form`, `VEN-127 Lacerate`, and Lightning Rush itself.

### 13.3 `shadow-dash-eye-of-twilight-dragged-attacker-tank` — VEN-148 + VEN-147

**A fourth route to a mechanism the catalogue already has three of, and the entry says how it
differs.** 450 is the clean citation — *"The Destination becomes Contested if it is an Uncontested
Battlefield not controlled by the controller of the Unit or Units that moved"* — so 464.2.c.1 makes
**them** the Attacker on **your** turn. `UNL-050 Iascylla` does it free and repeating; `OGN-043 Charm`
does it in Calm/Mind; `UNL-139 Bone Skewer` (§9.3, this walk) pulls the body out of their **hand** in
Fury/Chaos. Shadow Dash is the only one that picks a body already on their board **and** pumps your
garrison with the same card, and the only one in Calm/Order.

815.1.c.2 is the payoff — *"Units without Tank are invalid assignments until all units with Tank have
lethal damage assigned to them"* — and the legend's [Action] means the grant is bought **after** the
attackers are declared (806.1.b).

**"Exactly two" is a condition, not a minimum**: a third body switches the +1/+1 off. And the dragged
unit **goes home, not to you** — 466.1.a.2 recalls surviving attackers and 455 sends a Recall to its
Base. This is tempo, never theft.

### 13.4 `final-spark-lady-luminosity-eight-to-a-base` — OGS-022 + OGS-021

**Two sweeps, both with their members named.** Every single-target Deal instruction in the corpus
prints 2, 3, 4, 5, 6 or **8**, and the 8 is `OGS-022 Final Spark` alone. And six cards print damage to
*"a unit"* with **neither** *"at a battlefield"* **nor** *"here"* — `OGN-029 Falling Star`,
`OGN-248 Icathian Rain`, `OGN-252 Super Mega Death Rocket!`, `OGS-022 Final Spark`,
`UNL-020 Dancing Grenade`, `UNL-026 Xerath, Freed`.

**That second sweep reshapes a claim the project carries.** The catalogue records that exactly three
cards NAME a unit *"in a base"* as a target, which is why `OGN-070 Mageseeker Warden` manufactures a
zone the format's removal cannot see. Naming is not the only route: an unrestricted *"a unit"* reaches
a base as surely as a clause that says so, so that zone is answerable by **nine** cards, not three.

206 keeps the legend's draw attached to the **printed** cost, so every discount in the deck lowers
what you pay and leaves the threshold satisfied — the exact opposite of the *"if you SPENT N or more"*
family (166.2, 203.1, 356.4.b), which a discount silently disarms.

### 13.5 `siphon-power-herald-recruit-sweeper-insurance` — OGN-266 + OGN-265

**The problem is Might per body, not number of bodies.** `OGN-133 Flurry of Blades` (Body, 1 Energy,
[Reaction], *"Deal 1 to all units at battlefields"*) kills every 1-Might token simultaneously for any
number of them (143.2.a), so a Recruit faucet is not made safe by running faster. The project records
`UNL-077 Soul Shepherd` as *the* fix; `OGN-266 Siphon Power` is a **second** one in the same identity,
and the difference is the point: the Shepherd is a permanent static over every token you own, Siphon
Power is one turn at one battlefield bought at [Reaction] speed **in response to the sweeper already
on the Chain** (813.1.c.1). Reported to the manager as a narrowing — Soul Shepherd is the only
*permanent* fix.

477.3.b is why the -1 half is small and honest: the floor is **snapshotted**, and its own worked
example is this shape (*"-4 [M] to a min of 1"* on a 2-Might body generates -1). 477.3.e.2.a then
applies decreases last, so the two halves of the card never race each other.

## 14. Refusals from batch 8

- **Treating `VEN-148 Shadow Dash` as a steal.** Refused by **466.1.a.2** (*"Insert '3d. Recall
  Attackers present at the Battlefield if Defenders are still present.'"*) with 455: a surviving
  dragged unit is recalled to **its own** Base. The card buys a fight, not a body.
- **A third friendly body at the Shadow Dash battlefield.** Refused by the card's own text: *"if you
  have **exactly** two units there"*. A bigger garrison is strictly worse for the bonus.
- **`SFD-200 Arcane Shift` blinking a unit that is holding a contested battlefield.** Refused by
  355.2.a + 143.4: it returns to your base or a battlefield you control, exhausted, and 323.6 then
  strips whatever it was holding. The blink is for an ETB you want, never for a body you need standing.
- **Reading `OGN-266 Siphon Power`'s -1 as removal.** Refused by 143.2.a (a kill by damage needs
  marked damage; a Might reduction marks none) and 477.3.b (the floor is snapshotted, so it is worth
  0 against a body already at 1).
- **Scaling `VEN-155 Heart of the Tempest`'s payoff with more [Flow] plays.** Refused by 415.3.a: the
  ability costs the legend's own exhaust, so six empowers a game still buy one [Assault 2] a turn.

## 15. Batch 9 — five entries, closing the orphan Signature spells

### 15.1 `last-breath-beast-below-unforgiven-unit-damage-ready` — OGN-260 + SFD-132 + OGN-259

**One sentence decides two things at once.** 417.6.b.3: *"When a spell or ability specifies a Unit as
the source of the Damage for the Deal action, it is not in addition to the spell or ability that
instructed it."* So `OGN-260 Last Breath` is **unit** damage: `OGN-145 Unyielding Spirit`, the pool's
only blanket *"prevent all spell and ability damage this turn"*, leaves it working — **and** a Bonus
Damage static worded *"your spells and abilities deal 1 Bonus Damage"* does **not** raise it. Immune
to the fog, unimprovable by the pump, both from the same paragraph.

**The ready comes first**, which is the tempo of the card: 415.1 makes it a real ready, so the correct
sequence is attack, *then* Last Breath — a body that has already spent its exhaust gets it back and
fires for its Might. 359.3.f.2 reads that Might on execution, so a pump added in the window counts and
359.3.f.2.a nulls the whole instruction if the body leaves.

`SFD-132 Beast Below` at Might 8 is the largest body mono-Chaos prints, so eight is the ceiling here —
against its own non-optional ETB, which returns *another* friendly unit to hand. A bounce to hand is
not a Recall (455 goes to the BASE), so that body leaves the board entirely.

### 15.2 `dune-surfer-armed-assailant-ignore-tank` — VEN-004 + SFD-002 (both in zero entries)

**764–766 is the general paragraph for every "you ignore X" card, and 766's second worked example is
this exact sentence with Backline in it.** 766: *"Any abilities ignored in this way are treated as
**inactive** for the purposes of the game action or procedure. Example: A unit reads 'You ignore
Backline while assigning combat damage here.' … any instances of Backline on enemy units is treated as
inactive."* Inactive is stronger than a bypass: 465.2.c.6's requirement (*"A player must obey all
requirements and restrictions on damage assignment if able"*) has nothing left to obey.

**And the entry refuses the obvious reading of its own card.** A [Tank] does not make you overkill —
465.2.c.4 caps every assignment at minimum lethal either way. What 815.1.c.2 costs you is **order**:
your Might goes into the wall first and the real threats survive on what is left. So Dune Surfer
changes *which* bodies die, not *how much* damage there is, and he is **not** an excess-damage enabler
(R28 = A: excess is attacking Might never assigned, and the garrison's total lethal requirement is
unchanged).

465.2.c.8 is the edge case worth knowing: a body carrying both Tank and Backline cannot satisfy both,
so the assigning player picks one requirement — Riot's example is Caitlyn, Patrolling given Tank.

### 15.3 `pyke-returned-shakedown-off-turn-gold` — UNL-145 + OGN-033 (both in zero entries)

**A hidden unit is a [Reaction] body.** The tail of 811.1.b hands every face-down card [Reaction] from
the following turn, so Pyke enters **mid-combat on the opponent's turn for 0 Energy**, already at the
battlefield he was hidden at (811.1.d.1), with 319.6 + 323.2.a giving him the Defender designation in
that damage step.

**[Backline] is the mirror of [Tank] and the rules name both in one example** — 465.2.c.6 again, this
time for the ordering it imposes: Tank first, plain bodies next, Backline last. A 3-Might Pyke behind
any other body is the last thing the attacker may legally kill, which is what a permanent whose
trigger needs him alive at a battlefield wants.

His trigger is *"once each turn"*, not once on yours, and `OGN-033 Shakedown` is a [Reaction] — so the
pair mints up to **two** Golds a round trip. But 187.5 prints the Gold with its own exhaust in the
cost and Pyke plays it **exhausted**, so it is next turn's Power; `SFD-171 Renata Glasc, Industrialist`
is the card that fixes that and 103.1.b.3 keeps her out of a Fury/Chaos list.

This entry is deliberately **anti-synergic** with §9.5's `acceptable-losses-...`, and both say so:
185.2.d makes the Gold legal fodder for a symmetric gear kill.

### 15.4 `irelia-graceful-perfect-execution-power-discount` — SFD-141 + VEN-012 (both in zero entries)

**"1 Energy or 1 rainbow less" is a choice, and the project's own exchange rate decides it.** A Power
is priced near nine Energy inside a loop and is scarcer at every stage of a normal game (315.3.b
returns two runes a turn; 164.2.b spends one permanently, 161.2.b). Against Perfect Execution's 3
Energy + 1 Fury Power, taking the Power gives 3 + 0 and taking the Energy gives 2 + 1 — the first is
strictly better, and it is the choice a reader skips because both look like "minus one".

And **no card in the pool prints a rainbow Power cost**, so the rainbow half always comes off a printed
domain Power: it is never dead letter and never saves you a rainbow you meant to pay.

The anti-synergy is printed in the same domain: a discount reduces what you **spend** (166.2, 203.1,
356.4.b), and `SFD-143 Sivir, Mercenary` reads exactly that. 206 does not rescue her — that governs a
**costs** check. This list wants the first family and not the second.

### 15.5 `danger-zone-dangerous-duo-mech-reaction-pump` — SFD-182 + OGN-016 + SFD-181

**The legend's grant is defenders-only and the spell's is not**, which is the whole shape of the pair.
814.1.c: [Shield] is *"While I am a **defender**, I have +X [M]"*. So Mechanized Menace adds nothing to
an attack; on defence the two stack and a 3-Might Mech token fights at 6, while on offence it is 5.

187.4 is why nothing needs extra text: *"A 3 [M] Mech token is a domainless unit token with 3 Might and
the Mech tag"* — the tag is granted **by rule**.

The comparison that decides when to play it: Danger Zone with [Repeat] paid is +2 on **every** Mech at
[Reaction] speed; Dangerous Duo's [Legion] rider is +2 on **one** unit and rides free on a body. Below
three Mechs the rider is the better rate; at three or more the spell is. `UNL-146 Syndra,
Transcendent` — the only card that grants a second [Repeat] instance (820.1.c.2, 820.1.c.3) — is
mono-Mind and legal here, and is recorded as a **lead**, not folded in, because it would make this a
four-card line.

## 16. Refusals from batch 9

- **`VEN-004 Dune Surfer` priced as an excess-damage enabler.** Refused by 465.2.c.4 with R28 = A, in
  full, in §15.2. A wall changes the order of assignment, not the total lethal requirement.
- **A Bonus Damage static aimed at `OGN-260 Last Breath`.** Refused by 417.6.b.3: the damage is dealt
  by the unit, and every Bonus Damage source in the pool reads *"your spells and abilities"*.
- **`SFD-143 Sivir, Mercenary` in an Irelia list.** Refused by 166.2 / 203.1 / 356.4.b: every rebate
  Irelia gives lowers what you SPENT, which is the number Sivir's clause reads. The same shape as
  §1.2's Raging Firebrand refusal, repeated because these two share a domain and a deck slot.
- **`UNL-145 Pyke, Returned` in the `acceptable-losses-ravenbloom-prefect-gearless-gear-hate` list.**
  Refused by 185.2.d: his Gold is gear, so it arms the symmetric half that entry exists to dodge. Both
  entries cross-reference each other.
- **Claiming Irelia's rebate reaches a [Flow] cost.** Not refused — **not claimed**. The entry does not
  need it, so it prices the Flow replay at full value rather than assert an unruled reading.

## 17. Batch 10 — five entries from the Fury / Chaos remainder

### 17.1 `prepared-neophyte-disintegrate-spent-threshold` — UNL-004 + OGN-005 (both in zero entries)

**The opponent's [Deflect] pays for this card.** 809.1.c prices Deflect as *"an amount of Power … more
to play as an ADDITIONAL COST for each time they choose"*, and 166.2 / 203.1 / 356.4.b make *spent*
mean what actually left the Rune Pool — so aiming Disintegrate at a protected body costs a Power
**and** pushes you further past `UNL-004 Prepared Neophyte`'s threshold. The card played to protect
their unit is the card that makes your 1-Might body a 5.

**And a [Repeat] cost is spent too** (820.1.c.1), which is the cheap way over the line: a 1-Energy
spell with a 3-Energy [Repeat] crosses *"spent 4 or more"* where a 6-Energy spell discounted to 3
fails. That is the constructive half of the *costs* (206, printed) versus *spent* (166.2, actual)
split — §1.6 of this walk recorded the destructive half, that a discount switches the family off.

It is a **passive**, so 477.3.b's snapshotting (written for non-passive arithmetic) does not apply and
the +4 switches on and off with the condition rather than being fixed when the spell was cast.

### 17.2 `fading-memories-maddened-marauder-hold-denial` — OGN-180 + OGN-191 (both in zero entries)

**This is the mirror of the lock problem the catalogue records.** The denial lens found that nothing
protects YOUR Hold, because every lock says *"this turn"* and is Main-Phase only — 316, after 315.2's
Scoring Step. 816.1.b is the reverse: *"At the start of this permanent's controller's Beginning Phase,
**before scoring**, kill this."* A card played in your Main Phase lands inside **their** Beginning
Phase, ahead of 315.2.b.2's Hold. It is the only shape in the pool that reaches that window from
outside.

**And it takes the battlefield, not just the point**: with the garrison dead at 315.2.a, 319.6 and
323.6 strip their Control in the Neutral Open State that follows, before the Hold is asked for. Same
mechanism as the catalogue's [Temporary]-garrison conquer cycles, pointed the other way.

Six cards grant [Temporary], swept and named: `OGN-069 Last Stand` (Calm), `OGN-180 Fading Memories`
(Chaos), `UNL-070 Turn to Dust` (Mind), `UNL-165 Shadow's Call` (Order), `UNL-199 Deceiver` and
`UNL-200 Mirror Image` (both Mind/Order). Fading Memories is the only one in Chaos and the only one
that also reaches a **gear**.

**The Marauder returns here, and the earlier refusal is re-scoped rather than reversed.** §10 refused
him paired with Sai Scout as an `isolate-deckhand-open-conquer` duplicate; that refusal was scoped to
the **Conquer** use. The denial use — nobody walks in, the point is simply that the opponent lost one
— is a different job on a different clock, and a list wants both clocks because the opponent can only
play around one at a time.

### 17.3 `doran-ring-master-bingwen-weaponmaster-conquer-loot` — SFD-124 + SFD-127 (both in zero entries)

**The keyword says "to me", which is the whole selection rule for it.** [Weaponmaster] attaches to the
Weaponmaster body, so it can only ever free gear whose text does not depend on the carrier. Doran's
Ring qualifies exactly — *"When I conquer, discard 1, then draw 1"* pays whichever body conquers — and
its [Equip] is a single Chaos rune against a discount of *"one rainbow less"*, so the attach is free.

818.1 makes the attach an Activated Ability rather than a play, so no *"when you play a gear"* trigger
sees it — `VEN-102 Ravenbloom Prefect` (§9.5's other half) is blank against it. And once attached,
718.2 with 721.2 makes the printed [Equip] Inactive forever; the keyword's own *"even if it's already
attached"* is a permission to take the Equipment off **another** unit, not a second activation.

### 17.4 `smite-gust-monk-banish-not-trash` — UNL-007 + VEN-101 (both in zero entries)

**808.1.d.1 names the recall case and covers this one in the same sentence**: *"If the Permanent with
the effect is not sent to the Trash, for example because its 'killed' event was replaced with a
recall, the triggered ability will be removed from the chain."* Smite's *"banish it instead"* is that
replacement — the [Deathknell] never resolves, and the card is not there afterwards for [Flow]
(829.1.b needs it in the trash), for a reanimator, or for any *"from your trash"* clause.

**And the clause is wider than the three damage**: *"if it would die THIS TURN"* covers any death of
that unit for the rest of the turn, so aiming it at a body you intend to kill in combat wastes none
of the 3.

**Banishing is the only permanent answer, because recycling is not one.** 431.2.b: a Burn Out
*"Recycles their trash into their Main Deck"* — a trash emptied by damage comes straight back the
first time somebody over-draws, while 108.6.c keeps a banished card out for good.

Swept for completeness so the entry cannot be read as claiming protection it lacks: exactly **two**
cards print *"can't be countered"* — `VEN-015 Decree of Rage` (Fury) and `VEN-069 Mel, Newly Awakened`
(Mind) — and Smite is neither.

### 17.5 `seal-of-rage-baccai-reaper-finalization-power` — OGN-040 + VEN-009 (both in zero entries)

**204.3.a makes the Reaper's Fury a FINALIZATION cost** — *"When Costs within Instructions appear as
the first part of the effect in triggered abilities, the cost is taken to be the base cost of the
triggered ability. It must be paid to finalize the triggered ability."* **And 312.2.c leaves no window
to go and get it**: *"When the turn is in a Closed State, all pending chain items finish being
finalized"* — nobody receives priority between the trigger being placed and being finalized. A player
who plans to tap for it in response has misread the card.

Which is what a **0-Energy** Power source is for: the Seal costs a deck slot and one Power once and
returns one every turn (415.3.a), never competing with the turn's Energy. Its [Reaction] is the half
that matters elsewhere — 381 confines Activated Abilities to your own turn in an Open State *unless*
the ability carries [Action] or [Reaction], and 813.1.c.2 spells the exception out.

The printed reminder *"(Abilities that add resources can't be reacted to.)"* is 429.2 with 429.2.a:
Add abilities *"resolve as soon as they are finalized"* and *"Priority and Focus will not pass"*.

## 18. Refusals from batch 10

- **Any discount in a `UNL-004 Prepared Neophyte` list.** Refused by 166.2 / 203.1 / 356.4.b: a
  discount lowers what you SPENT, which is the number the card reads. `OGN-031 Raging Firebrand` is
  the extreme case — it takes Disintegrate to 0 Energy and switches the Neophyte off entirely.
- **Reading `VEN-009 Baccai Reaper`'s Fury as payable on resolution.** Refused by 204.3.a + 312.2.c,
  in full, in §17.5. This is the family of triggers the catalogue records as priced wrong when read as
  pay-on-resolution, and the Reaper is a clean instance of it.
- **A carrier-DEPENDENT Equipment under `SFD-127 Master Bingwen`'s [Weaponmaster].** Refused by the
  keyword's own wording: it equips *"to me"*, so any Equipment whose text reads the carrier can only
  ever end up on the Weaponmaster.
- **Treating `UNL-007 Smite` as protection against being answered.** Refused by the sweep: two cards
  in the pool say *"can't be countered"* and it is neither. Its protection is against what happens
  after the kill.
- **`OGN-165 Cemetery Attendant` or `OGN-170 Morbid Return` as a cost cheat behind a self-discard.**
  Refused on the cards' own text: both return a unit to your **hand**, so the body still has to be
  paid for in full. The cost-cheating reanimators in this domain are `OGN-196 Soulgorger` and
  `OGN-198 The Harrowing`, already catalogued together by §4.4 of this walk.

## 19. Batch 11 — five more from the Fury / Chaos remainder

### 19.1 `whirlwind-cemetery-attendant-choose-last` — OGN-187 + OGN-165 (both in zero entries)

**The turn-order clause is the card.** *"STARTING WITH THE NEXT PLAYER, each player may return a unit
to its owner's hand"* — in a Duel the opponent chooses first and you choose second, and *"may"* lets
you decline. A symmetric effect where you move last is not symmetric.

355.10.e means nobody pays for it (no targets, so no [Deflect] tax and no "can't be chosen"), at the
price that you cannot pick THEIR body. And a bounce to hand is not a Recall (455 goes to the **base**),
so the body leaves the board entirely and 323.6 strips Control of any battlefield it was the last unit
at — which is the second half of choosing last: decline when your own garrison is load-bearing.

### 19.2 `ancient-warmonger-inviolus-vox-scaling-attacker` — SFD-131 + UNL-027 (both in zero entries)

807.1.b.1 — *"The X is referenced in the functional text of the ability"* — is what makes an [Assault]
whose value is **a count of the enemy garrison** legal: `SFD-131 Ancient Warmonger` is a 4-Might body
against an empty battlefield and a 7-Might one against three defenders. He is priced against a stacked
wall, which inverts the usual reading of an attacker.

`UNL-027 Inviolus Vox` pays a Conquer **forward into the next combat** (461.1 leaves the order of
combats to the Turn Player), and 470 with 485.4 caps the turn at two Conquers however large the bodies
get — the entry says so rather than implying a finisher.

**805.1.a.1 is the practical trap and it is a first citation here**: *"If the unit has one or more
domains, the Power portion of the Accelerate cost can be paid ONLY with a Power that matches one of the
domains of the unit."* The Warmonger's [Accelerate] needs a **Chaos** Power specifically.

### 19.3 `punching-poro-morbid-return-free-empower` — VEN-007 + OGN-170 (both in zero entries)

**Five [Empower] costs in the pool pay neither Energy nor Power, swept and named**: `VEN-007 Punching
Poro` (Discard 1), `VEN-110 Mel, Defiant Soul` (Discard a spell), `VEN-054 Questionable Tome` and
`VEN-087 Hextech Disc` (an exhaust each), `VEN-124 Escaped Grayback` (kill a friendly unit, free on a
token by 185.2.d). The Poro is the cheapest body of the five.

`OGN-170 Morbid Return` makes the discard **a loan rather than a loss** — 2 Energy at [Action] speed
to bring the unit back to hand. 441.1.b / 441.1.c / 441.2 keep it honest: once per body, permanent,
not an engine. The payoff is +1 Might; what is worth cataloguing is the **cost**.

### 19.4 `sharkling-legion-rearguard-accelerate-domain-power` — UNL-006 + OGN-010 (both in zero entries)

**Riot's own worked example at 356.1.b.3 is `OGN-010 Legion Rearguard`**, and it says an [Accelerate]
survives a free play: *"They ignore Legion Rearguard's Base Cost of 2 Energy, but the optional
additional cost of 1 Energy and 1 Fury Power is added to its Total Cost and must be paid."* That is
why an [Accelerate] body is a better reanimation target than a vanilla one.

805.1.a.1 with 805.1.a.2 locks the Power to one of the unit's own domains, rainbow only for a
domainless unit — so two Fury bodies accelerated in one turn cost **two Fury Power**.

`UNL-006 Sharkling` is a body with two sizes and the entry names both: Might 5 while attacking
(807.1.c on its printed [Assault 4]) and Might **1** at every other moment, which 143.2.a and a
1-Energy `OGN-133 Flurry of Blades` both punish.

### 19.5 `right-of-conquest-sai-scout-ally-clause-draw` — UNL-015 + OGN-174 (both in zero entries)

**Exactly four cards in the pool name an ally, swept and named**: `SFD-201 Chem-Baroness` (Mind/Order),
`SFD-217 Seat of Power` (colourless battlefield), `UNL-015 Right of Conquest` (Fury), `UNL-193
Gloomist` (Calm/Chaos). No card uses "teammate" or "partner". This **confirms** the catalogue's
standing count of four rather than correcting it.

So the card's ceiling moves by format: 1 to 3 in a Duel (485.4), up to 5 in 2v2 (489) — the rare card
that is better in the format with the higher Victory Score.

`OGN-174 Sai Scout` is the cheapest second battlefield because 355.2.b makes the play location valid
and nothing is moved: 143.4's exhaustion costs nothing, 144.2 is never paid, and 344.2 with 348.2.a.1
gives a Conquer with no damage. **But "open" is two conditions** (170.11.a/b/c) and the entry will not
blur them: an evacuated battlefield is unoccupied at once and uncontrolled only at the next Cleanup
(323.6), so evacuation and Scout are two steps, never one.

## 20. Refusals from batch 11

- **Using `OGN-187 Whirlwind` to remove an enemy body.** Refused by 355.10.e: each player chooses their
  own, so it is never removal. Its value is the ordering and the re-buy, and the entry claims nothing
  else.
- **Paying `SFD-131 Ancient Warmonger`'s [Accelerate] with a spare Fury Power in a Fury-heavy list.**
  Refused by 805.1.a.1: the Power must match one of the unit's own domains, and the Warmonger is Chaos.
- **A second [Empower] on `VEN-007 Punching Poro`.** Refused by 441.1.b and 441.1.c: an Empowered
  object cannot be Empowered and *"nothing additional happens"*. Three copies are three purchases, not
  a repeatable engine.
- **`UNL-006 Sharkling` as board presence.** Refused on its own stat line: Might 1 outside an attack,
  so one point of damage kills it and the whole [Assault 4] never happens. It is a tempo card.
- **Playing `OGN-174 Sai Scout` to a battlefield you merely evacuated this action.** Refused by
  170.11.c with 323.6: unoccupied is not open until Control has also lapsed, which takes a Cleanup.

## 21. Batch 12 — five more, and the lane is down to single figures

### 21.1 `sivir-mercenary-decree-of-rage-two-rainbow` — SFD-143 + VEN-015 (both in zero entries)

**Two rainbow spent is two CARDS, not one big one.** 166.2 / 203.1 / 356.4.b make *"if you've SPENT at
least two rainbow this turn"* a measurement of what left the Rune Pool, so two one-Power cards satisfy
it and one two-Power card discounted to one does not. Sivir's own play is the first half; `VEN-015
Decree of Rage` at 1 Energy + 1 Fury Power is the cheapest second half in the identity — and it is one
of **exactly two** cards in the pool that print *"can't be countered"* (the other is `VEN-069 Mel,
Newly Awakened`), so the enabler cannot be denied.

Her [Accelerate] is domain-locked by 805.1.a.1, and that is the cheapest route of all on the turn she
lands: the Chaos Power it demands also counts toward her own threshold.

### 21.2 `twilight-step-shadow-order-disciple-move-burn` — VEN-105 + VEN-095 (both in zero entries)

**A Might gate read at execution that the payoff's own trigger climbs out of.** 359.3.f.2 checks
*"Move a unit with 3 Might or less"* on execution: the Disciple is 2, his Burn puts him at 3 (still
inside), and a second Burn puts him at 4 and closes the gate for the turn. **The engine's stop is
printed on the payoff, not on the spell** — two uses a turn.

The move is an effect move (449 with 420.2.b), so 420.3.a's exhaust is never paid and 144.4's
geography does not apply. And *"a unit"* is bare, so it reaches an **enemy** at 3 Might or less — the
`OGN-168 Fight or Flight` precedent again — which makes it an evacuation tool as well as a mover.

The Burn is a real mill (431.1.b, not the protected 431.1.c), and 431.2.b is the perverse relief: a
Burn Out shuffles everything you milled back into the deck.

### 21.3 `factory-recall-brittle-steel-gear-both-ways` — SFD-135 + VEN-003 (both in zero entries)

**718.2 scopes the Inactive state to WHILE ATTACHED, which is the door the catalogue's #170 correction
leaves open.** An attached Equipment can never pay its own [Equip] again (718.2 + 721.2), and the
recorded relocations are attach EFFECTS — but `SFD-135 Factory Recall` returns the gear to **hand**,
where it is no longer attached, its printed Rules Text is Active again, and replaying it lets you pay
the [Equip] for a new carrier. One Energy, at [Action] speed. On a [Quick-Draw] Equipment it costs
nothing at all (819.1.d determines no [Equip] cost); `SFD-186 Spinning Axe` is the in-identity case.

Both halves CHOOSE, so both pay the [Deflect] tax (809.1.c) and both stop dead against an absolute
*"can't be chosen"* (054.1) — unlike `OGN-022 Thermo Beam` and `OGN-179 Acceptable Losses`, which
355.10.d and 355.10.e keep off it. A Fury/Chaos list holds both kinds and should know which is in hand.

### 21.4 `firestorm-walking-roost-deflect-is-a-tax` — OGS-002 + UNL-130 (both in zero entries)

**A programmatic sweep never consults [Deflect].** 355.10.d exempts an object *"programmatically
selected based on its characteristics rather than chosen"*, with *"Kill all units at a battlefield"* as
its own example — so Firestorm's *"all enemy units at a battlefield"* kills a Deflect body without
paying a rainbow.

Which is why `UNL-130 Walking Roost`'s drawback is **cheap in this list and expensive in others**: the
1-Might Bird it hands the opponent carries [Deflect] by rule (187.7), so a choosing removal suite pays
a Power to answer it and a sweeper deletes it for nothing. The drawback is not a fixed cost — your own
removal suite sets it.

The §10 refusal stands and is restated: **you do not get to place the Bird**. 355.2.a leaves it at
their base or a battlefield they control, so no line may count on it arriving where you want.

### 21.5 `shadows-of-the-past-evershade-stalker-stock-the-trash` — VEN-103 + UNL-123 (both in zero entries)

**The plural is a trap, not a reach.** *"Return up to 2 units from TRASHES to THEIR OWNERS' hands"* —
056 with 056.2 sends anything of theirs to **their** hand, so picking out of the opponent's trash is a
gift. The value has to be stocked by you, which is what `UNL-123 Evershade Stalker`'s mandatory
*"discard 1, then draw 1"* is for. It returns to **hand**, so nothing is cost-cheated.

**And the card carries a registered DATA anomaly**: the corpus renders a dangling *"[Effect] 1"*
because Riot's gallery ships this spell with the Equipment-only `effect` field holding the single
character `1`. It is recorded in `docs/data-anomalies.md`, it must never enter `data/errata.json`, and
the entry claims nothing from it.

## 22. Refusals from batch 12

- **Discounting anything in a `SFD-143 Sivir, Mercenary` list.** Refused by 166.2 / 203.1 / 356.4.b —
  the third time this walk has recorded it, because the Fury/Chaos pool prints both the discounts
  (`OGN-031 Raging Firebrand`, `SFD-141 Irelia, Graceful`) and the payoffs (`UNL-004 Prepared
  Neophyte`, Sivir) and they cannot share a list.
- **A third Burn on `VEN-095 Shadow Order Disciple` in one turn.** Refused by 359.3.f.2 with the
  spell's own gate: at Might 4 he is outside *"3 Might or less"* and no further Twilight Step can move
  him that turn.
- **Choosing an opponent's unit with `VEN-103 Shadows of the Past`.** Refused by 056 / 056.2: it goes
  to their hand. The plural in "trashes" is flavour, not reach.
- **Counting on the `UNL-130 Walking Roost` Bird arriving at a battlefield you chose.** Refused by
  355.2.a, as in §10 — restated here because the entry uses the Roost for a different reason.
- **`SFD-135 Factory Recall` or `VEN-003 Brittle Steel` against a protected gear.** Refused by 809.1.c
  and 054.1: both CHOOSE, so both pay the tax and both stop against an absolute prohibition. The
  programmatic answers in this identity are Thermo Beam and Acceptable Losses.

## 23. Batch 13 — four entries, and the Fury / Chaos lane CLOSES

### 23.1 `kinkou-lifeblade-shadow-fiend-empower-package` — VEN-093 + VEN-014 (both in zero entries)

**A package, not an engine, and the entry says so.** 441.1.b, 441.1.c and 441.2 make each body's
[Empower] a one-time purchase of a permanent state. What makes the two worth running together is that
the **currencies differ**: the Lifeblade asks 2 Energy and no Power at all, the Fiend asks 2 Energy and
a Fury Power — so one of them is payable on a turn where the Power is committed elsewhere.

The Lifeblade buys **[Ganking]**, which is the keyword this whole lane keeps needing: 144.4 confines
the Standard Move to base-to-battlefield and 144.4.c.1 is the only way out. The Fiend's [Assault 3] is
offence only (807.1.c), so it is Might 5 attacking and **2** at every other moment.

And 441.1 is worth restating: an ability that *Empowers* something performs the act directly and never
determines the target's printed cost — so any future Empower-granting card in the identity makes both
of these free.

### 23.2 `incinerate-blast-corps-cadet-optional-cost-ping` — SFD-013 + OGS-003 (both in zero entries)

`SFD-013 Blast Corps Cadet` is written in 356.1.b.3's shape — an optional additional cost with the
payoff gated on having paid it — so it **survives a free play**, exactly as the rule's own worked
example (Legion Rearguard) does. And the gate is on the **payment**, not the cost: declining is legal
and simply yields a vanilla 2-Might body, which is why 055 does not rescue it.

The difference between the two halves is the **window**: Incinerate is an [Action] (806.1.b) and
answers a body after blocks; the Cadet's ping only happens on your own turn, as you play a card, but
it comes attached to a permanent. Both **choose**, so both pay 809.1.c's tax and both stop against an
absolute *"can't be chosen"* (054.1) — unlike Firestorm and Thermo Beam, which 355.10.d exempts.

### 23.3 `decree-of-discord-megatusk-evacuate-and-gank` — VEN-107 + UNL-126 (both in zero entries)

**A mass-choose spell pays the [Deflect] tax once PER UNIT**, and that arithmetic is not usually run.
809.1.c charges *"for each time they choose"*, and *"return ANY NUMBER of enemy Order units"* chooses
each separately — so a garrison of three Deflect bodies costs three extra Power on top of a 1-Energy
spell. A programmatic sweeper pays none of it however many it hits (355.10.d). This is the one shape
where a one-Energy spell becomes unaffordable.

The budget is a **sum**, not a per-body ceiling: five 1-Might tokens is legal, two 3-Might bodies is
not. And Megatusk is the second half because 144.4 would otherwise make a battlefield-to-battlefield
trip take two turns — 144.4.c.1 collapses it, for the whole garrison at once, on the turn the ground
opens. The taking is bloodless: 323.9 stages nothing, 344.2 opens a Showdown, 348.2.a.1 makes it a
Conquer.

**And Megatusk's cost is a SPEND**, so 730.2 with 824.1.d puts it in direct conflict with §11.3's
`vicious-snapjaws-scorchclaw-xp-faucet-no-sink` — `UNL-016 Scorchclaw` is the only [Level] card in
Fury or Chaos and one activation switches its rung off. **Both entries now state the conflict from
their own side, and a list picks one.**

### 23.4 `flash-gem-jammer-move-both-ways` — OGS-011 + SFD-007 (both in zero entries)

**381 and 813.1.c.1 split movement into your turn and theirs.** Gem Jammer's grant is a play trigger
and Megatusk's is an Activated Ability locked to your own Open State by 381; Flash carries [Reaction]
and works in any Closed State on any player's turn. Outward movement is a your-turn thing; **retreat
is not**.

**A base is the one place an "all units at battlefields" effect cannot reach**, which makes Flash a
third answer to `OGN-133 Flurry of Blades` — distinct from raising Might permanently (`UNL-077 Soul
Shepherd`) or for a turn (`OGN-266 Siphon Power`), and the only one that works against a sweeper you
cannot out-size.

**But it is a Move, not a Recall**, and 456.3 is the sentence that separates them: a Recall *"cannot be
prevented by actions and Game Effects that restrict or block Movement"*. Flash has no such protection,
so §1.1's `minotaur-reckoner-rengar-unseen-frozen-board` switches it off entirely — the first and the
last entry written for this issue, now cross-referenced in both directions.

## 24. Refusals from batch 13, and the two cards that close the lane by rule

- **`OGN-175 Shipyard Skulker`** (Chaos, E3 M3) prints *"(no text)"*. A vanilla body cannot anchor an
  entry: there is no mechanism to walk, no rule to cite, and nothing a partner can interact with beyond
  its Might. Refused by inspection, and recorded so no successor re-opens it.
- **`OGN-171 Mystic Poro`** (Chaos, E2 M2, [Vision]) carries one keyword and nothing else, and that
  keyword is already catalogued on a card that does more with it (`OGN-174 Sai Scout`, §19.5).
  817.2.b is why a second copy is not a second look either: *"If the player does not recycle the top
  card and nothing else happens in between the triggers resolving, each instance of Vision will see the
  same card."* So multiples are one look with N re-rolls, not N cards deep — and 416.1 sends a recycled
  card to the BOTTOM. Refused as strictly covered.
- **Spending XP on `UNL-126 Megatusk` in a `UNL-016 Scorchclaw` list.** Refused by 730.2 + 824.1.d, in
  both directions, in §23.3 and §11.3.
- **A second [Ganking] grant on the same unit in the same turn.** Refused by 810.2 (*"Multiple
  instances of Ganking are redundant"*) — three Gem Jammers enable three different units, not one unit
  three times.
- **`OGS-011 Flash` beside `SFD-014 Minotaur Reckoner`.** Refused by 054.1 with 420.1 / 449: Flash is a
  Move and the Reckoner forbids moving to base. 456.3 protects a Recall and Flash is not one.

## 25. Lane closed — the census, opened and closed

| measure | at the start of this half (564 entries) | at close |
|---|---|---|
| uncatalogued **by base code** | 76 | **2** |
| uncatalogued **by name+type** | 72 | **2** |
| banned in constructed | 4 | 4 |
| **walkable** | **68** | **0** |

The two remaining base codes are `OGN-171 Mystic Poro` and `OGN-175 Shipyard Skulker`, both refused by
rule in §24 above, so **the Fury / Chaos slice of issue #173 is closed**: 39 entries and 39 refusals
across batches 6–13, plus the ten orphan dual-domain Signature spells, which closed at §15.

Note for whoever re-measures: `Mystic Poro` is the last multi-base name in the slice
(`OGN-171` / `UNL-224`), so a base-code census will keep reading 2 where a name+type census reads 1
walkable-shaped row plus its reprint. Count over `data/cards.json` deduped by `base`, never over
`poolOf` — see §7.
