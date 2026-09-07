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

---

## 8. Batch 2 — five entries, and one keyword answered in two opposite directions

Batch 1 merged (catalogue 573 at the time of writing). Batch 2 clears ten more names.

| id | class | cards | the names it clears |
|---|---|---|---|
| `crackshot-corsair-warwick-attack-order` | ENGINE | OGN-159, OGN-130 | Crackshot Corsair |
| `nidalee-towering-combatant-ambush-draw` | ENGINE | UNL-114, UNL-099 | Nidalee Cat Form, Towering Combatant |
| `deadbloom-predator-primal-strength-attacker` | ENGINE | OGN-161, OGN-154 | Deadbloom Predator, Primal Strength |
| `guttural-roar-tools-of-empire-brutal-hunter` | ENGINE | VEN-070, VEN-077, VEN-072 | Brutal Hunter, Tools of Empire, Guttural Roar |
| `concentrate-grim-resolve-level-ladder` | ENGINE | UNL-091, UNL-095 | Concentrate, Grim Resolve |

## 9. Two attack triggers on one event, ordered — and the reading the catalogue was one word short of

`OGN-159 Warwick, Hunter` (*"When I attack, kill all damaged enemy units here"*) and `OGN-130
Crackshot Corsair` (*"When I attack, deal 1 to an enemy unit here"*) fire on the **same** event —
464.2.c.3, the Attacker designation. Two paragraphs make that a line rather than a race:

> **383.3.d.** *"If more than one Triggered Ability is Triggered simultaneously, then the player that
> controls the Abilities selects the order to place them on the Chain."*
> **340.1.** *"The newest Finalized Chain Item resolves."*

Place Warwick **first** and the Corsair **second**: the Corsair is newest, resolves first, marks the
damage, and Warwick's kill then sees it. That is legal because Warwick's *"all damaged enemy units
here"* is information in an **instruction**, not an extra condition on his trigger:

> **359.3.f.2.** *"Information referenced in an instruction in this way will be checked on execution
> of the instruction."* — its worked examples are Yasuo, Remorseful's attack trigger, whose *"here"*
> mistargets if he is moved home in response and whose damage reads *"his current Might of 5"*.

(383.2.a.1 governs the other case — an extra *condition* on an attack trigger, checked when the
trigger is placed. Warwick has none.)

**A phrasing to tighten, reported and not silently changed.** The catalogued sibling
`warwick-hunter-iron-ballista-damage-marks-death` says in its fifth step that Warwick's trigger *"is
placed at the Attacker designation (464.2.c.3) and reads the board then."* The placement is right;
the reading is loose, because 359.3.f.2 checks the instruction on **execution**. That entry's line
works either way — its Iron Ballista mark is applied in the Main Phase, before either — so this is
not a wrong verdict, but the sentence would refuse the present entry if taken literally, and the
manager owns `data/combos.json`.

The clock is why doing it inside one combat is worth a card: **466.1.a.1** inserts *"3c. Heal all
Units."* into the combat cleanup, so a mark made beforehand is spent every turn. And 144.3 brings
the whole pack in one declaration, so three Corsairs mark three bodies and Warwick kills all three.

## 10. `466.3.a` is stricter than the reminder text on the card

`UNL-114 Nidalee, Cat Form` prints *"When I win a combat, draw 1. (I win if I remain after
combat.)"* The rule is narrower:

> **466.3.a.** *"A Player has won a combat if they received either the attacker or defender
> designation and are **the only Player** that has units remaining at this battlefield during this
> step."*
> **466.3.d.** *"There is 'No Result' if units were recalled during step 3d of the Combat Cleanup,
> if **both** Players have units present during this task, or if neither player has units present."*

With **466.1.a.2** recalling surviving Attackers when Defenders remain, a defence in which the
attackers live is **No Result** — so Nidalee draws only when your side wipes theirs, not merely when
she survives. `UNL-095 Grim Resolve` (*"When it wins a combat this turn, gain 2 XP"*) is governed by
the same paragraph, and both entries in this batch say so.

The partner has to do **both** jobs, and one card does: `UNL-099 Towering Combatant`'s `[Tank]`
(815.1.b, 815.1.c.2) forces every point of the attacker's assignment onto itself so Nidalee lives,
while her own Might still counts toward 465.2.c and helps clear the attackers.

**And that is the same keyword this walk already refused, in the opposite direction.** 814.1.c makes
`[Shield]` *"+X :rb_might: while I am a defender"*, so the Towering Combatant is a printed 3 that
reads 5 exactly here — while in `jaull-fish-garen-rugged-mighty-discount` (batch 1) the identical
keyword contributes **nothing**, because that count happens in the Main Phase where no designation
exists. One keyword, two entries, opposite answers; the question is always whether a designation is
in play.

`822.1.b` is also two permissions, not one: *"I may be played to a battlefield where you control
Units"* **and** *"I have [Reaction] as long as I'm being played to a battlefield where you control
Units."* The second is what lets her arrive after the attack is declared, and 319.6 + **323.2.a**
(*"If there are Units present at the Battlefield the Combat is taking place at, but do not have a
designation, they gain the same designation as their Controller now"*) put her in that damage step.

## 11. Attacking without moving, and buying the pump after the count

`OGN-161 Deadbloom Predator` (E8 P2 M8, `[Deflect]`, *"You may play me to an occupied enemy
battlefield"*) is the big-body member of a family the catalogue already holds through `SFD-093
Dauntless Vanguard`. Three paragraphs:

> **355.2.b.** *"Some Game Effects may grant players permission to play Units to locations that are
> not normally Valid. Such locations become Valid for the purposes of Playing the Unit."*
> **190.3.a.1.** *"Units moving to **or being played to** a battlefield apply Contested status…"*
> **464.2.c.1.** *"The Attacker is the player whose unit(s) applied the Contested status…"*

So he attacks on the turn he is played, 144.2's exhaust never arises (it is the Standard Move's cost
and only that), and 143.4's entering exhausted costs nothing. `OGN-154 Primal Strength` (+7,
`[Action]`) is then bought **inside** the combat under 806.1.c.1 with 464.2.f.1 / 464.2.g, after
465.2.c has fixed both sides' summed Might — an 8 becomes a 15 only if a 15 is needed.

The excess damage that produces is stated as a **non-payoff**: 465.2.c.4 caps assignment at minimum
lethal, so the surplus is real (R28 = A) and Body prints nothing that reads it — `OGN-034
Tryndamere` is Fury, `UNL-187 Piltover Enforcer` Fury/Order, and only `UNL-217 Trapping Grounds` is
reachable, at 485.5's random selection. Pricing a +7 as a feeder is the arithmetic error this
project has recorded twice.

## 12. One wording, two referents — `053.2` decides which "Empowered" a card is asking about

Two Body cards print the same template and mean different things:

- `VEN-077 Tools of Empire` (gear) — *"exhaust: Give a unit +2 :rb_might: this turn. If **this** is
  [Empowered], give that unit +4 :rb_might: this turn instead."*
- `VEN-072 Guttural Roar` (spell) — *"Give a unit +2 :rb_might: this turn. If **it's** [Empowered],
  give it +4 :rb_might: this turn instead."*

**053.2** (*"Gear and spells say 'this'"*) settles it: the gear's condition is on **itself**, bought
once for 2 Energy and applying to every target forever; the spell's is on the **target**, so its
doubling has to be bought on the body. A reader who Empowers the gear and expects the spell to
double as well has paid for the wrong object.

`VEN-070 Brutal Hunter` satisfies both sides: Empowered he is a 6 Might body with `[Ganking]`, so
the gear gives him +4 and the spell another +4 — **14 Might** for the turn, off a 3 Energy + 1 Power
body. Unempowered the same two cards give 4 + 2 + 2 = 8. And the gear is free every turn afterwards:
its cost is an exhaust, 415.3.a readies it in the Awakening Phase, and 315.1 places that before both
the Beginning Phase and 316.

## 13. The word "instead" is what stops a `[Level]` ladder stacking

`UNL-091 Concentrate` prints *"[Level 6] This costs :rb_energy_2: less"* and *"[Level 11] This costs
:rb_energy_4: less **instead**"* — so at 11 XP the discount is **4, not 6**: the ladder is 5 Energy,
then 3, then 1 (356.4.b for the discount, 356.6 for the floor). Five more XP for two more Energy is
the honest trade, and a reader who adds the rungs prices the top at 0.

`UNL-095 Grim Resolve` (E2, `[Action]`, +3 Might and *"When it wins a combat this turn, gain 2 XP"*)
is the fastest faucet in the domain — double any `[Hunt]` here — and the pump is what makes the
combat winnable, which 466.3.a then requires outright.

**The XP triangle is now complete across two issues**, and all three entries name each other:

| entry | clause | behaviour under 730.2 (spending) |
|---|---|---|
| `bandle-soldier-enthralling-protector-xp-floor` (#180) | `[Level 3]` threshold | switches OFF (824.1.d) |
| `concentrate-grim-resolve-level-ladder` (#186) | `[Level 6]` / `[Level 11]` thresholds | switches OFF (824.1.d) |
| `wily-newtfish-gemhand-hunter-xp-turn` (#186) | *"gained XP this turn"* | **indifferent** |

## 14. Facts for CLAUDE.md from Body batch 2

1. **Two attack triggers on one body's attack are ordered by their controller** — 383.3.d places
   them, 340.1 resolves newest first — and a *"kill all **damaged**"* instruction is read at
   **execution** (359.3.f.2, worked example Yasuo, Remorseful), not at placement. So a ping trigger
   placed second marks the damage a kill trigger placed first will see, and no Main Phase activation
   is needed. 383.2.a.1 governs only an extra *condition* on the trigger, which Warwick has none of.
2. **`466.3.a` is stricter than every "when I win a combat" reminder in the pool**: winning requires
   being *"the only Player that has units remaining"*, and 466.3.d makes it **No Result** when both
   sides remain or when units were recalled in step 3d — which 466.1.a.2 does to surviving Attackers
   whenever Defenders remain. A defence that merely survives pays nothing.
3. **`[Shield]` Might is decisive inside a combat and invisible outside one** — 814.1.c is
   conditional on the Defender designation, so the same printed-3 body reads 5 for 465.2.c and 3 for
   a Main Phase Mighty count. The two entries that turn on this (`nidalee-towering-combatant-ambush-draw`,
   `jaull-fish-garen-rugged-mighty-discount`) name each other.
4. **`053.2` decides which object an "if [Empowered]" clause is asking about**: a gear or spell's
   *"this"* is itself, so `VEN-077 Tools of Empire` doubles on ITS OWN Empowered state (bought once,
   applies to every target) while `VEN-072 Guttural Roar` doubles on the TARGET's. Same wording,
   opposite objects.
5. **A second `[Level]` rung that says "instead" replaces the first rather than adding to it** —
   `UNL-091 Concentrate` is 5 → 3 → 1 Energy, never 5 → 3 → 0.
6. **`OGN-161 Deadbloom Predator` is the second card in the pool that attacks without moving**
   (with `SFD-093 Dauntless Vanguard`, and `VEN-157 Dragon Roost` granting it to Dragons):
   355.2.b + 190.3.a.1 + 464.2.c.1, so 144.2's exhaust and 143.4 both cost nothing.

---

## 15. Batch 3 — five entries, and the keyword whose reminder text hides two paragraphs

Batch 2 merged (catalogue 578 at the time of writing). Batch 3 clears seven more names.

| id | class | cards | the names it clears |
|---|---|---|---|
| `combat-chef-hexdrinker-weaponmaster-deflect` | ENGINE | SFD-092, SFD-102 | Combat Chef |
| `mobilize-grumpy-rockbear-rune-count` | ENGINE | OGN-134, VEN-050 | Mobilize |
| `gentlemens-duel-onslaught-challenge-ceiling` | ENGINE | OGS-008, VEN-081 | Gentlemen's Duel, Onslaught |
| `nilah-targonian-visionary-move-xp-ladder` | ENGINE | UNL-115, UNL-098 | Nilah Joyful Ascetic, Targonian Visionary |
| `disposal-order-trash-denial` | ENGINE | UNL-103 | Disposal Order |

## 16. `[Weaponmaster]` — the reminder text is three words and the rule is nine clauses

`SFD-092 Combat Chef` prints *"[Weaponmaster] (When you play me, you may [Equip] one of your
Equipment to me for :rb_rune_rainbow: less, even if it's already attached.)"* Rule 821 says
considerably more, and **four of its clauses are cited here for the first time in this catalogue**
(0 prior hits each for 821.1.c, 821.1.c.1, 821.1.c.2, 821.1.c.3):

> **821.1.c.** *"Weaponmaster is functionally short for: 'When you play me, you may choose a Card you
> control with the Equipment tag. **Necessary portions of its Rules Text are no longer Inactive if
> they are currently Inactive.** Pay the cost of its Equip ability, reduced by [A], to attach it to
> this unit.'"*

That middle sentence is the mechanism behind *"even if it's already attached"*: 434.1.e and 718.2
make an attached card's printed Rules Text **Inactive**, which would otherwise hide the very `[Equip]`
ability the keyword has to price.

And the clause that takes value **away**, which no entry in the catalogue had:

> **821.1.c.6.** *"The Equip ability **is not activated** this way, and the unit with the Weaponmaster
> ability **is not chosen**."*

So a Weaponmaster attach fires **no** *"when you use an activated ability of a gear"* payoff and
**no** *"when you choose me"* payoff on the carrier — where a normal `[Equip]` would, since
**818.1.b.1** makes its choice a Target. Anyone pricing Weaponmaster as a free activation of the
gear's ability is pricing something the rules explicitly deny.

Three more bounds: **821.1.c.2** determines the cost *"as though that Equip ability was being
activated choosing the unit with the Weaponmaster ability"*; **821.1.c.3** — *"If the chosen card's
Equip cost does not contain [A], it can still be paid, but will not be reduced"* — so an Energy-only
Equip gains nothing; **821.1.c.4** — *"If the chosen card doesn't have an Equip cost, it can't be
paid"* — immediately narrows 821.1.c.1's *"whether it has an Equip ability or not"*, and 821.1.c.5
leaves such a card attached to whatever it was on. **821.1.c.7**: multiple instances trigger
separately and may choose different targets.

## 17. An exhausted rune is Power now, Energy next turn, and a rune you control the whole time

`OGN-134 Mobilize` (*"Channel 1 rune exhausted. If you can't, draw 1."*) is the only channel card in
the pool that writes its own failure case. Its value turns on three things this project has recorded
separately and never together:

- **164.2** gives a Basic Rune two abilities and only **164.2.a** costs its own exhaust; **164.2.b**'s
  cost is the **recycle**, so a rune channelled exhausted still pays 1 Power of its domain at
  `[Reaction]` speed the moment it lands. **415.3.a** is where its *Energy* shows up — your own
  Awakening Phase. **430.2.a** is the default the card overrides (*"runes are channeled readied"*).
- A *"for each rune you **control**"* payoff does not care that it is exhausted. That is the same
  reasoning the sibling walk on issue #170 used to **reopen** `OGN-288 Startipped Peak` after two
  sessions had refused it on mana grounds — and `VEN-050 Grumpy Rockbear` is the payoff in both
  cases.
- A channel payoff is a **refill, not a ramp**: 161.2.a fixes the Rune Deck at *"Exactly 12 Rune
  cards"*, 315.3.b channels two free every Channel Phase, 430.3 channels *"as many as possible"*, and
  161.2.b returns a recycled rune to the Rune Deck. Once twelve are out, *"If you can't, draw 1"* is
  what stops the card being a blank.

**The legend line is a one-name field.** Mobilize is mono-Body and Grumpy Rockbear mono-Mind, so
103.1.b.2 needs a legend covering both — and the census prints exactly **one** Body/Mind name,
`VEN-149 / VEN-194 Defender of Tomorrow`. That is the failure class `test/legend-lines.test.ts`
exists for, and the entry says so.

## 18. The mutual-damage family's ceiling, and the timing split that pays for it

`OGS-008 Gentlemen's Duel` is the only member of the family that **pumps and then fights with the
same card**, in that order: *"Give a friendly unit +3 :rb_might: this turn. **Then** choose an enemy
unit."* Every other member fights at printed Might unless a separate card was spent first.

`VEN-081 Onslaught` is the biggest pump in the domain (+6) and the only one playable twice —
**829.1.b**: *"You may play this from your trash for its flow cost. Then banish it"*, with 829.1.b.1
making that banish a delayed replacement and 108.6.c keeping a banished card out. Three copies are
**six plays a game and no more**.

The trap is the timing split. Gentlemen's Duel is `[Action]` (806.1.c.1) and can be held until a
combat has opened; Onslaught carries **no keyword at all**, so **155** — *"A spell can be played
during an Open State outside of Showdowns on its controller's turn"* — confines it to your own Main
Phase. **The biggest number in the domain has to be committed before the garrison is known.**

Arithmetic: a Might-6 body carrying +6 and +3 fights at **15**, above every printed Might in the
pool, and takes back only the target's Might. There is no minimum-lethal cap here (465.2.c.4 is a
combat-assignment rule), and 417.6.c keeps every point of it out of the excess-damage family.

## 19. The one XP faucet that needs neither a battlefield nor a won combat

`UNL-115 Nilah, Joyful Ascetic`'s corpus row has **three** clauses, and a truncated read loses the
third: `[Accelerate]`, `[Ganking]`, and **"When I move, gain 1 XP."** Every other faucet in the pool
is paid by a battlefield (`[Hunt]` is 823.1.c.1, *"When I Conquer or Hold"*) or by a combat won
outright under 466.3.a. Nilah is paid for **moving**, in your own Main Phase, on a board where you
hold nothing and win nothing — which is the position a `[Level]` deck is in while it is still
climbing.

`[Ganking]` is what keeps her moving (144.4.c.1) and **810.1.c.3** is what caps the faucet exactly:
*"It does not give additional abilities or activations of Movement, only new options for the Standard
Move"* — one XP per turn per Nilah, however many destinations exist. `[Accelerate]` (805.1.a) buys
the first one on the turn she lands.

**This walk now holds all three shapes of XP clause**, and every entry names the others:

| shape | entry | behaviour under 730.2 |
|---|---|---|
| *"gained XP this turn"* (event) | `wily-newtfish-gemhand-hunter-xp-turn` | indifferent |
| `[Level 6]` / `[Level 11]` (threshold) | `concentrate-grim-resolve-level-ladder` | switches OFF (824.1.d) |
| `[Level 11]` (threshold) | `nilah-targonian-visionary-move-xp-ladder` | switches OFF (824.1.d) |

## 20. `416.1.c` cuts both ways, and the second mode is the reason to run the card

`UNL-103 Disposal Order` — *"Choose one — • Choose up to 3 cards from opponents' trashes. Their
owners recycle them. • Draw 1."*

> **416.1.c.** *"Each player Recycles cards to their own Main Deck and Rune Deck, regardless of which
> player is instructed to perform the Recycle action."*

So the first mode is **one-sided in your favour** — the cards go back into *their* deck, bottom-first
by 416.1 and 416.1.a — and, read the other way, **it fires none of your own "when you recycle"
triggers**, which is exactly why the sibling walk on issue #169 struck it off `OGN-235 Karma,
Channeler`'s partner list.

The property worth a slot is the modality: *"Choose one — … — Draw 1"* means **there is no board
state in which this spell cannot be played**. That is the exact property the cross-audit on issue
#166 found missing in a spell picked as filler for a *"you've played a spell this turn"* condition,
where a targeting spell had no legal target and six points evaporated. **Filler must be
unconditionally castable, and in Body this is the card that is.**

## 21. Facts for CLAUDE.md from Body batch 3

1. **`[Weaponmaster]` is nine clauses, and two of them change how it is priced.** 821.1.c: *"Necessary
   portions of its Rules Text are no longer Inactive if they are currently Inactive"* — that is the
   mechanism behind *"even if it's already attached"*, against 434.1.e / 718.2. And **821.1.c.6**:
   *"The Equip ability is not activated this way, and the unit with the Weaponmaster ability is not
   chosen"* — so it fires **no** gear-ability payoff and **no** *"when you choose me"* payoff, where
   a normal `[Equip]` does (818.1.b.1 makes its choice a Target). 821.1.c.3: an Equip cost with no
   `[A]` is paid unreduced. 821.1.c.4/c.5: a card with no Equip cost cannot be moved at all.
   821.1.c.7: multiple instances trigger separately and may choose different targets.
2. **A rune channelled EXHAUSTED is 1 Power immediately (164.2.b, whose cost is the recycle and not
   an exhaust), 1 Energy from your next Awakening (415.3.a), and a "rune you control" the whole
   time** — which is why a *"for each rune you control"* payoff is paid in full the same turn.
   430.2.a is the default the card overrides.
3. **`155` is what confines a keyword-less pump to the Main Phase.** `VEN-081 Onslaught` is the
   biggest pump in Body (+6, and six plays a game with `[Flow]`, 829.1.b + 108.6.c) and carries no
   `[Action]`, so it must be committed before the garrison is known — the opposite of the `[Action]`
   half of the same package.
4. **`UNL-115 Nilah, Joyful Ascetic` is the only XP faucet in the pool paid by MOVING** (*"When I
   move, gain 1 XP"*, a third clause a truncated corpus read loses), so it works with no battlefield
   held and no combat won; 810.1.c.3 caps it at one XP per turn per copy, because `[Ganking]` adds
   destinations and never moves.
5. **`416.1.c` cuts both ways**: a *"recycle cards from opponents' trashes"* effect sends them to
   THEIR decks (one-sided in your favour) and fires none of YOUR *"when you recycle"* triggers.
6. **`UNL-103 Disposal Order` is Body's unconditionally-castable filler** — a modal spell whose
   second mode is *"Draw 1"*, which is the property #166 found missing when a targeting spell was
   used as filler for a *"played a spell this turn"* condition.

---

## 22. Batch 4 — three entries and four refusals, and the mono-Body slice closes

| id | class | cards | the names it clears |
|---|---|---|---|
| `pakaa-cub-determined-sentry-hidden-anchor` | ENGINE | OGN-135, UNL-111 | Pakaa Cub, Determined Sentry |
| `buhru-captain-kinkou-initiate-modal-cantrips` | ENGINE | SFD-091, UNL-097 | Buhru Captain, Kinkou Initiate |
| `legion-marauder-risen-altar-free-empower` | ENGINE | VEN-074, VEN-163 | Legion Marauder |

## 23. A hide lasts only for as long as you control the battlefield

The reminder text on every `[Hidden]` card is *"(Hide now for :rb_rune_rainbow: to react with later
for :rb_energy_0:.)"* The rule is longer, and the clause that matters is in the middle:

> **811.1.b.** *"While this card is in your hand or in your Champion Zone on your turn during an Open
> State, you may pay [A] to hide this facedown at a battlefield you control that doesn't already have
> a facedown card hidden there **for as long as you control that battlefield**. Beginning on the next
> turn, this gains [Reaction] and you may play this, ignoring its base cost."*

So a hide is a **Control-dependent investment**, and **323.6** is how that Control is lost with no
fight at all: *"Players lose control of any controlled Battlefields without their Units occupying
them if the turn is in an Open State and there is no Showdown or Combat ongoing there."* Walking
your garrison off to attack elsewhere costs the hide, and nothing on the hidden card says so.

`UNL-111 Determined Sentry` (E1 M1, *"I can't move to base"*) is the answer, and its printed drawback
is the mechanism: **144.4** confines the Standard Move to base ↔ battlefield without `[Ganking]`, so
a body that cannot move to base and has no `[Ganking]` **has nowhere to go**. One Energy for a
permanent hide slot. The honest gap is **456.3** (*"A Recall cannot be prevented by actions and Game
Effects that restrict or block Movement"*) — but 466.1.a.2 recalls **Attackers** when Defenders
remain, and 323.7's Cleanup recall is for unattached gear and runes, so neither reaches a defending
Sentry. Removal by kill or banish is the real answer.

And a **vanilla** body is the right thing to hide: 811.1.d.2 confines the targets of a hidden card's
play effects to that battlefield, and 811.1.d makes a hidden spell unplayable if it has no valid
targets there. `OGN-135 Pakaa Cub` has no play effect at all, so it can never be a dead facedown —
1 rainbow Power in total for a 3 Might body that arrives inside the opponent's attack.

## 24. Two disjunctions that line up

`grep -in "\[Empower\]" data/corpus_flat.txt | grep -i " or "` returns fourteen rows. Thirteen match
on reminder text; **exactly one prints a disjunctive cost** — `VEN-074 Legion Marauder`, *"[Empower]
— :rb_energy_1: **or** :rb_rune_body: (Pay either cost)"*. The same grep surfaces the mirror image:
`VEN-163 Risen Altar`, *"[Empower] costs of your units here cost :rb_energy_1: **or**
:rb_rune_rainbow: less"* — the only battlefield in the pool that discounts `[Empower]` costs.

Whichever half you elect, the Altar's matching half cancels it, and 356.6 holds it at zero. The
practical value of the disjunction is bigger than the one Energy: **167** empties every Rune Pool at
the start of each Main Phase, so what you have late in a turn is whichever currency you did not
spend, and a cost that accepts either is payable when a fixed one is not.

**The entry states the standing refusal rather than working around it.** `matriarch-of-war-empower-ready`
already refused this exact card as a motor — *"both are one Empower per copy, six in a whole game,
which is not a motor"* — and 441.1.b is why. Making the payment free changes the **price** of the
events, never their **number**.

## 25. Refusals that close the slice

### 25.1 `OGN-126` / `VEN-R04` Body Rune — one distinct name

164.2 gives every Basic Rune the same two abilities and 161.2.a fixes the Rune Deck at *"Exactly 12
Rune cards"*. Every deck runs runes; there is no pairing to walk. Same refusal as the Order Rune in
issue #180 §18.

### 25.2 `SFD-096 Laurent Bladekeeper` — a vanilla `[Ganking]` body

E3 M3 and nothing but the keyword. **810.1.c.3**: *"It does not give additional abilities or
activations of Movement, only new options for the Standard Move"* — so the card is one destination
option and no card reads it. Both `[Ganking]` slots in the domain are already held by bodies that
are **paid** for the movement (`UNL-115 Nilah, Joyful Ascetic`, 1 XP per move) or that get the
keyword as part of a purchase (`VEN-070 Brutal Hunter`, from its `[Empower]`).

Registered anomaly, not errata: this card prints `Ganking` **without brackets**, which
`docs/data-anomalies.md` line 23 records (API body `<p>Ganking (I can move from battlefield to
battlefield.)</p>`). It stays an anomaly and never enters `data/errata.json`.

### 25.3 `SFD-098 Sea Monkey` — a self-buff that feeds nothing

E2 M2, with an optional 1 Energy to buff itself. **702.3** caps it at one buff and **703** fixes that
at +1 Might, so the card is a 3 Energy 3 Might body. The buff feeds nothing in the domain: the pool's
two *"While I'm buffed"* statics are `OGN-065 Wizened Elder` (Calm) and `OGN-125 Bilgewater Bully`
(Body), and the Bully's clause reads *"While **I'm** buffed"* — it needs a buff on **itself**, which
a card that buffs only itself can never give it. `OGN-228 Vanguard Helm`'s recovery needs a buffed
body to **die**, which is the Order entry `trifarian-gloryseeker-vanguard-helm-legion-buff` (#180)
and does not need this card. Curve slot, not a line.

### 25.4 `UNL-092 Demacian Diplomat` — a one-shot faucet already named in two entries

E2 M2, *"When you play me, gain 1 XP"* — one XP, once, per copy. It is strictly dominated as a
ladder engine by `UNL-115 Nilah, Joyful Ascetic` (1 XP **every turn**, needing no battlefield and no
combat) and by `UNL-094 Gemhand Hunter` (1 XP per Hold), and it is already named as a supplementary
faucet inside `concentrate-grim-resolve-level-ladder` and `nilah-targonian-visionary-move-xp-ladder`.
Refused as an entry; it is a deckbuilding option in two existing ones.

## 26. FINAL LEDGER — the mono-Body slice is closed

```
mono-Body deckable base codes: 137
uncovered by NAME+TYPE: 5 base codes = 4 distinct names
  - and all 4 are refused by rule in §25
(opened at 38 base / 36 names at catalogue 564; closed at 5 / 4)
```

**Walked — 18 entries across 4 batches**, clearing 32 of the 36 names.
**Refused — 4, each with the paragraph quoted.**

The base-code-vs-name+type gap for this lane, measured at the open: **5.3%** (38 → 36), against
19.2% pool-wide, 15.7% Order, 15% Calm/Mind, 0% for Fury/Body/Chaos as a block and 0% for
battlefields. Six lanes, six different numbers.

### A process note worth passing on

Between batch 3 and batch 4 the staging file was **overwritten** rather than appended, which would
have dropped five finished entries the manager had not yet merged. Nothing reached the repo and
nothing was reported, because the **census run immediately before reporting** showed four spells
reappearing as uncovered — a number that can only go down. Two rules follow, and the second is the
one this project already had:

1. A batch script must **append** to the staging file, never rewrite it: the previous batch may not
   have been merged yet, and the staging file is the only copy.
2. **Re-validate immediately before REPORTING, not immediately after writing.** That is what caught
   it.

## 27. Facts for CLAUDE.md from Body batch 4

1. **A `[Hidden]` card's hide lasts only *"for as long as you control that battlefield"*** (811.1.b,
   a clause the reminder text omits), and **323.6** strips Control the moment your last body leaves
   in an Open State with no Combat there — so attacking elsewhere with your whole garrison throws the
   facedown card away. `UNL-111 Determined Sentry` (*"I can't move to base"*, E1 M1) is the pool's
   cheapest permanent answer, because 144.4 leaves a body with no `[Ganking]` and no base access
   nowhere to go; 456.3 is the gap, but 466.1.a.2 recalls Attackers only and 323.7 only unattached
   gear.
2. **A vanilla body is the best thing to hide**: 811.1.d.2 restricts the targets of a hidden card's
   play effects to that battlefield and 811.1.d makes a hidden spell with no valid target there
   unplayable — a card with no play effect is immune to both.
3. **`VEN-074 Legion Marauder` prints the pool's only disjunctive `[Empower]` cost** (*"1 Energy or 1
   Body rune"*) and **`VEN-163 Risen Altar` the only disjunctive `[Empower]` discount** (*"1 Energy or
   1 rainbow less"*); together they cancel term for term (356.6). The value of a disjunctive cost is
   that **167** empties the Rune Pool each Main Phase, so it is payable in whichever currency
   survived the turn.
4. **`SFD-096 Laurent Bladekeeper` prints `Ganking` with no brackets** — a registered anomaly
   (`docs/data-anomalies.md`), never errata.
5. **A card that buffs only itself feeds no buff payoff in the pool**: `OGN-125 Bilgewater Bully`'s
   *"While **I'm** buffed"* needs a buff on itself, and 702.3 caps every body at one buff.
6. **Process**: a staging script must APPEND, because the manager may not have merged the previous
   batch; and the census run before reporting is what catches it, since an uncovered count can only
   go down.
