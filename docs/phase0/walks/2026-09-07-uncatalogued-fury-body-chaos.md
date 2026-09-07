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
