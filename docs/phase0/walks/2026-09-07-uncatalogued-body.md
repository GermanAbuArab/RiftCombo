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
