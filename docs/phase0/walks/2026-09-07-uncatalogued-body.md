# Walk — the uncatalogued Body cards

Issue [#186](https://github.com/GermanAbuArab/RiftCombo/issues/186). Session `rc-walk-order`,
successor slice to [#180](https://github.com/GermanAbuArab/RiftCombo/issues/180), which closed the
mono-Order lane (139/139 base codes catalogued, staged or refused by rule). Rules version
2026-07-16; card text verbatim from `data/corpus_flat.txt`, every paragraph opened in
`data/Riftbound-Core-Rules-2026-07-16.txt`. Entries staged at `/tmp/rc-walks/rc-walk-uncat.json`.

## 0. The slice and the census

Partition agreed with rc-manager3 on 2026-09-07: **rc-walk-fam1 keeps Fury and Chaos (#173),
rc-walk-fam2 keeps Calm/Mind (#174), this walk takes mono-BODY.** A card mixing Body with Fury or
Chaos stays with fam1; Body with Calm, Mind or Order stays with fam2. Scope is cards whose domains
are a subset of `{body}`.

Measured by **NAME+TYPE** through `CardIndex.equivalents` at catalogue 564
(`/tmp/rc-walks/body-cen.ts`):

```
mono-Body deckable base codes: 137
uncatalogued by BASE CODE: 38 | by NAME+TYPE: 36 | gap: 5.3%
by type: unit 26, spell 9, rune 2, gear 1        banned/restricted: none
multi-base names: Body Rune (OGN-126 / VEN-R04), Gangplank, Naval (VEN-086 / VEN-181)
```

> **The base-code-vs-name+type gap is lane-specific, and this is the sixth lane to measure it**:
> 19.2% pool-wide, 15.7% Order, 15% Calm/Mind, **5.3% Body**, 0% Fury/Body/Chaos as a block,
> 0% battlefields. Six numbers, one method, no two the same — it is measured per lane, never
> assumed.

## 1. Batch 1 — five entries

| id | class | cards | the names it clears |
|---|---|---|---|
| `udyr-wildman-pit-rookie-modes` | ENGINE | OGN-157, OGN-136 | Udyr, Wildman |
| `wily-newtfish-gemhand-hunter-xp-turn` | ENGINE | UNL-108, UNL-094 | Wily Newtfish, Gemhand Hunter |
| `carnivorous-snapvine-rampage-tank-bypass` | ENGINE | OGN-149, VEN-083 | Carnivorous Snapvine, Rampage |
| `gangplank-ambessa-empowered-removal-split` | ENGINE | VEN-086, VEN-084 | Gangplank Naval, Ambessa The Wolf |
| `jaull-fish-garen-rugged-mighty-discount` | ENGINE | SFD-103, OGS-007 | Jaull-Fish, Garen Rugged |

## 2. 417.6.b.3 is the paragraph that makes the mutual-damage family unlike every other removal

Seven cards in the pool print *"deal damage equal to their Mights to each other"*, and six of the
seven are Body:

| card | domain | cost | shape |
|---|---|---|---|
| `OGN-128 Challenge` | Body | E2 P1 | [Action], friendly + enemy |
| `OGN-149 Carnivorous Snapvine` | Body | E5 P2 M6 | a body, on its play trigger |
| `OGN-258 Dragon's Rage` | Calm/Body | E4 P1 | **moves** the enemy unit first |
| `OGS-008 Gentlemen's Duel` | Body | E6 P1 | [Action], +3 Might first |
| `SFD-114 Marching Orders` | Body | E3 | [Action], with [Repeat] 3 Energy |
| `UNL-110 Clash of Giants` | Body | E6 P2 | *"Choose **two units**"* — no friendly-or-enemy restriction |
| `VEN-083 Rampage` | Body | E3 | optional Body rune for +2 Might first |

The rule, whose **worked example is Challenge itself**:

> **417.6.b.3.** *"When a spell or ability specifies a Unit as the source of the Damage for the Deal
> action, it is not in addition to the spell or ability that instructed it. **Example:** Challenge is
> a spell that reads 'Choose a friendly unit and an enemy unit. They deal damage equal to their
> Mights to each other.' The damage that Challenge causes to be dealt is dealt by the chosen units,
> not by Challenge."*

Two consequences that are not on any of the seven cards:

1. **It walks past a `[Tank]` wall.** 815.1.b is scoped by its own words — *"I must be assigned
   lethal damage before any other unit … **during the Combat Damage step**"* — and 815.1.c.2 the
   same. This damage is never assigned in a combat damage step, so a Tank orders nothing. That is
   the direct answer to `galio-back-to-back-divining-shells-toll` (#180), which builds a toll no
   attacker can pay: the toll exists only inside the damage step, and this family never enters it.
2. **It walks past a spell-damage fog**, since the source is the units.

And the cost of the family, cited here **for the first time in this catalogue** (0 prior hits):

> **417.6.b.4.** *"The controller of the source of a Deal action is responsible for that Deal action
> unless the player performing the Deal action is otherwise specified. **Example:** If a player plays
> Challenge targeting a friendly unit and an enemy unit, the controller of the enemy unit is
> responsible for the damage dealt by their unit. Any effects that trigger 'when you deal damage'
> that that player controls will trigger."*

So half of every exchange fires the **opponent's** "when you deal damage" triggers.

Finally, 465.2.c.4's minimum-lethal cap is a combat-assignment rule and does not apply — an 8 Might
body dealing 8 to a 3 simply wastes 5, and 417.6.c scopes excess damage to combat, so **no
excess-damage payoff in the pool reads a point of it**. This family is removal, never a feeder.

The one card in the same domain that blanks it is in this batch: `VEN-084 Ambessa, The Wolf`, while
Empowered, *"can't be dealt damage unless I'm in combat"*, and **054.1** makes a forbid beat a
permit.

## 3. The only XP clause in the pool that reads a turn instead of a threshold

`grep -in "gained.*XP" data/corpus_flat.txt | grep -i "this turn"` returns **one row**:
`UNL-108 Wily Newtfish`, *"If you've gained XP this turn, I have +1 :rb_might: and [Ganking]."*

Every other XP payoff is a `[Level N]` Dependent Ability, and **824.1.d** governs those: *"The
Dependent Ability will be Inactive as soon as the controlling player has less than [N] XP."* With
**730.2** (*"To Spend XP, reduce the value of XP marked on the Player spending it"*), that makes the
whole `[Level N]` family anti-synergic with every XP sink — a fact #180 built
`bandle-soldier-enthralling-protector-xp-floor` around. The Newtfish is **not in that family**: it
reads whether XP was *gained* this turn, so spending afterwards changes nothing and one XP is worth
as much as twenty.

`UNL-094 Gemhand Hunter` carries **both** clauses on one card — `[Hunt]` (a gain) and `[Level 6]`
(a threshold) — so in a spending list the Hunter keeps paying the Newtfish every turn while its own
`[Level 6]` goes dark. One card, two behaviours, separated by 824.1.d alone.

The timing is free because of the phase order: **823.1.c.1** (*"Hunt is functionally short for
'When I Conquer or Hold, my controller gains X XP'"*) fires at **315.2.b.2**, and 315.2 precedes 316
— so on any turn you hold a battlefield the XP is banked **before** your Main Phase begins.

## 4. A buff is the cost, so 702.3 sets the rate

`OGN-157 Udyr, Wildman` reads *"Spend my buff: Choose one you've not chosen this turn — • Deal 2 to
a unit at a battlefield. • Stun a unit at a battlefield. • Ready me. • Give me [Ganking] this turn."*

**702.2.b** (*"Spending a Buff removes a single Buff counter from a Unit"*), **702.2.b.1** (none can
be spent from an unbuffed unit) and **702.3 / 702.3.a** (one buff per unit; a second *"is not placed
instead"*) together mean he can never be stocked up: **the number of modes you get in a turn is the
number of times you can place a buff on him**, one at a time, each after the previous was spent.

Which makes a **mass buffer the wrong partner** — `SFD-101 Fae Dragon` (up to four) and `OGN-141
Kinkou Monk` (up to two) each give Udyr exactly one. The right one is a cheap single placement
repeated: `OGN-136 Pit Rookie` at 2 Energy, three copies by 103.2.b, plus `OGN-124 Arena Bar` for a
fourth (onto an *exhausted* friendly unit, so after he has moved). Four is also the printed ceiling.

**381** is the wall the card does not mention: *"All Activated Abilities can only be activated on the
Controlling Player's Turn and during an Open State."* *"Spend my buff:"* is a colon, so 377.1 makes
it an Activated Ability, and Udyr carries neither `[Action]` nor `[Reaction]` — the Deal 2 and the
Stun can never answer an attack.

The two modes worth pairing are **"Ready me"** and **"Give me [Ganking] this turn"**: a ready is
worth exactly one extra Standard Move (144.2) and normally nothing else, but **144.4.c.1** lets a
Ganking unit's Standard Move go battlefield to battlefield, which the first move could not, and
**810.1.c.3** is why Ganking alone is worth nothing (*"It does not give additional abilities or
activations of Movement, only new options for the Standard Move"*).

## 5. Four of the pool's eight removal shapes, answered by two bodies — and four not

Soft removal here comes in eight shapes: kill by effect, damage, stun, −Might, bounce to hand,
banish, a forced move, a return to the Main Deck.

- `VEN-086 Gangplank, Naval` — `[Empowered]` *"If a spell or ability that **chooses** me would stun
  me, give me −:rb_might:, or return me to hand, give me +3 :rb_might: this turn instead."* Three
  shapes, and each attempt **pays you**. Its `[Empower]` cost is two Body Power and **no Energy**.
  Gated on *choosing*, so **355.10.d**'s programmatically-selected objects go straight through — the
  same gap that makes `[Deflect]` useless against a sweeper.
- `VEN-084 Ambessa, The Wolf` — `[Empowered]` *"I have +3 :rb_might: and can't be dealt damage
  unless I'm in combat."* **054.1** makes that absolute, not a shield with a value.

**441.2** makes both purchases permanent and **441.1.b** makes them one-time. The four shapes
neither of them answers — kill by effect, banish, move, return to deck — are stated in the entry
first, because a partial anti-removal package read as a full one is how an entry ends up promising
that a body will survive.

## 6. `[Shield]` is exactly the kind of Might a Mighty-counting discount cannot see

`SFD-103 Jaull-Fish` — *"I cost :rb_energy_2: less for each of your [Mighty] units"* — reads a
**state** (the card's own reminder: *"A unit is Mighty while it has 5+ :rb_might:"*), while **709**
defines only the event (*"A Unit 'becomes Mighty' at the moment its Might changes from being less
than 5 to being 5 or greater"*). The cost is determined as the card is played (203.1, 356.4.b), on
your own turn.

So **814.1.c** (`[Shield]` is *"+X :rb_might: while I am a defender"*) and **807.1.c** (`[Assault]`
is *"While I am an attacker, I have +X [M]"*), both conditional on a designation that only exists
inside a combat (807.1.d, 464.2.c.3), contribute **nothing**: `UNL-099 Towering Combatant` (printed
Might 3, `[Shield 2]`, `[Tank]`) reads as a 3. `OGS-007 Garen, Rugged` works because his **printed**
Might is 5 — his own `[Assault 2]` and `[Shield 2]` are irrelevant to the count.

**356.6** (*"Energy and Power costs can't be reduced below 0"*) floors the Energy at four Mighty
bodies and never touches the 2 Power, and the honest reading of the whole card is that the discount
is a **rebate on a board the deck already wants**, not a reason to buy three 6-Energy Garens. What
it buys is `[Accelerate]` becoming affordable: **805.1.a** (*"As you play me, you may pay [1][C] as
an additional cost. If [you do], I enter ready"*) with 805.1.a.1, against 143.4 and 144.2, is a
6 Might body that reaches a battlefield on the turn it lands.

## 7. Facts for CLAUDE.md from Body batch 1 (the manager writes them, not this session)

1. **417.6.b.3's worked example is Challenge itself, and the family it defines walks past a
   `[Tank]`** — 815.1.b and 815.1.c.2 are scoped to *"the Combat Damage step"*, which mutual damage
   never enters. Seven cards print it, six of them Body, and `UNL-110 Clash of Giants` is the only
   one with no friendly-or-enemy restriction (it can point two of the opponent's bodies at each
   other). 465.2.c.4's minimum-lethal cap does not apply either, and 417.6.c keeps every point of it
   out of the excess-damage family.
2. **417.6.b.4** (first cite): the controller of the source of a Deal action is responsible for it,
   *"Example: … the controller of the enemy unit is responsible for the damage dealt by their unit.
   Any effects that trigger 'when you deal damage' that that player controls will trigger."* Half of
   every mutual-damage exchange fires the **opponent's** triggers.
3. **`UNL-108 Wily Newtfish` is the only card in the pool whose XP clause reads a TURN rather than a
   threshold** (swept, 1 hit) — so it is the one XP payoff a list that SPENDS XP can run, the exact
   complement of the `[Level N]` family that 824.1.d + 730.2 switch off. `UNL-094 Gemhand Hunter`
   carries one clause of each kind and they behave differently in the same deck.
4. **A "spend my buff" cost makes 702.3 the rate limiter**, so a mass buffer is the WRONG partner
   for `OGN-157 Udyr, Wildman` (it gives him exactly one buff however many bodies it names) and a
   cheap repeated single placement is the right one. 381 confines all four of his modes to your own
   Main Phase; "Ready me" only pays when it is followed by "Give me [Ganking]", because 144.4.c.1 is
   what makes the second move reach a different battlefield.
5. **`[Shield]` and `[Assault]` Might is invisible to any effect counting Might outside a combat** —
   814.1.c and 807.1.c are conditional on a designation 464.2.c.3 hands out inside a Combat, so a
   `[Shield 2]` body of printed Might 3 counts as a 3 for `SFD-103 Jaull-Fish`'s Mighty discount and
   for anything else priced on Might in the Main Phase.
6. **`VEN-086 Gangplank, Naval`'s `[Empower]` cost is two Body Power and no Energy at all**, and his
   replacement covers three removal shapes (stun, −Might, bounce) while **355.10.d** lets every
   programmatically-selected effect through; `VEN-084 Ambessa, The Wolf` covers non-combat damage
   absolutely by **054.1**. Four of the pool's eight removal shapes remain unanswered by both.
