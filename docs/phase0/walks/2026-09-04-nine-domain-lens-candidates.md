# Hand walks — the nine candidates from the domain lens (issue #29)

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16
**Result: 9 HOLD, of which 3 only after a rewrite. 0 refuted.**

All nine are ENGINE, so the bar is *"the mechanism produces what the entry says"*, not *"reaches 8"*.

## Step 2 done first, in bulk: every citation opened

The 2026-09-04 citation audit found three entries citing a rule that said the opposite of the claim,
so before walking anything I pulled **every rule number these nine entries cite** and read each one
in the rules file. **46 distinct citations. All 46 say what the entry says they say.** No repeat of
the `dazzling-aurora-elder-dragon` / 431.1.c failure.

Ban check, same pass: all **23 distinct cards** across the nine were grepped for the `[BANNED …]`
marker in `data/corpus_flat.txt`. **None is banned or restricted in any format.**

## Three rules nobody in the project had cited, and they did the work

| rule | verbatim | what it decided |
|---|---|---|
| **381** | *"All Activated Abilities can only be activated on the Controlling Player's Turn and during an Open State."* | Legitimises the Yasuo sequence: the legend's ability, the gear's ability (151.2) and the Standard Move (144.1.a) all live in the same Main Phase |
| **315.1.b** | *"The Turn Player readies **all** Game Objects they control that are able to be readied."* | Confirms the "readies in your Awaken" claim in four entries — legend, gear and Gold tokens alike |
| **811.1.d.1** | *"A hidden permanent **must** be played to that battlefield."* + 811.1.b *"**Beginning on the next turn**, this gains [Reaction]"* | Rewrote `tornado-warrior-matriarch-recursion`: the enabler is not a free empower |

---

# 1. `yasuo-syren-unforgiven-point` — HOLDS as written

**OGN-205** Yasuo, Windrider (Unit, Chaos, **E5 P1 M4**): *"[Ganking] … **The third time I move in a
turn, you score 1 point.**"*
**OGN-259** Unforgiven (Legend, Calm/Chaos): *"`:rb_energy_2:`, `:rb_exhaust:`: Move a friendly unit
to or from its base."*
**OGN-184** The Syren (Gear, Chaos, E2): *"`:rb_energy_1:`, `:rb_exhaust:`: Move a friendly unit at a
battlefield to its base."*

**The three moves are legal in one Main Phase.** This was the one real gap: the entry asserted a
sequence without showing the timing closes.

- **381** — *"All Activated Abilities can only be activated on the Controlling Player's Turn and
  during an Open State."* Covers Unforgiven (a legend ability: 174.8 says legends can have them).
- **151.2** — *"The Activated Ability of Gear may be executed at any time during the controlling
  player's Main Phase during an Open State."* Covers The Syren.
- **144.1.a** — the Standard Move *"can be done any time during a player's Main Phase."*

**Each of the three is a Move.** 446.1: *"A Permanent changing its position from any space on the
Board to another space on the Board is a Move, unless it is caused by a corrective Recall or an
Attached Permanent changing locations to or with its Top-Most Card."* None of the three is a
corrective recall, so 456 (*"Recalls are not Moves"*) never engages. All three move **Yasuo**, and
his trigger reads *"the third time **I** move"*.

**Yasuo stays ready for the Standard Move.** 144.2 makes exhausting the unit the cost of the
*Standard Move specifically*; nothing makes an effect-driven move exhaust anybody. So after moves 1
and 2 he is still ready to pay for move 3.

**Arithmetic against the entry's own declared quantities** (1 Yasuo, 1 Unforgiven, 1 Syren):

| step | source | Energy | move # |
|---|---|---|---|
| 1 | Unforgiven — base → battlefield ("from its base") | 2 | 1 |
| 2 | The Syren — battlefield → base | 1 | 2 |
| 3 | Standard Move — base → battlefield (144.4.a) | 0 | 3 → **1 point** |

**3 Energy, zero cards, exactly one point.** As declared.

And the 3 Energy is genuinely cheap: 164.2.a makes Energy the **exhaust** ability of a rune, not the
recycle one, so three runes are tapped and all three come back in the next Awaken (315.1.b). No
board is spent.

**"Exactly one point" is right, and the wording matters.** *"The third time I move in a turn"*, not
*"every third time"*. A fourth, fifth and sixth move give nothing. The entry does not overclaim.

**Traps, one by one.** Empty enemy battlefield (383.4.e/461): no attack trigger anywhere in the
line, so it cannot bite. Awaken Energy (167): all three payments are Main Phase. [Temporary]
(816.1.b): none. Rune recycled for Power (161.2.b): none — this line pays Energy only. Units enter
exhausted (143.4): stated, and it is why the engine starts the turn after Yasuo lands. Recall is not
a move (456): checked above.

**R2 (ruled A) is load-bearing and correctly applied.** 194.1.c lists *"Spells, Triggered Abilities
and Activated Abilities that instruct them to gain one or more points"* as a way to gain points
distinct from the 469 Score, so 470's *"only Score … once per Battlefield per turn"* does not touch
Yasuo's point, and it stacks on that battlefield's own Hold.

**Verdict: HOLDS. → verified.** One addition to the entry: the timing chain (381 + 151.2 + 144.1.a),
which it asserted without support.

---

# 2. `battle-mistress-gold-refund` — HOLDS after a REWRITE

The par `body+chaos` deserved the extra care and it paid: **the entry overstated its own key rule.**

**SFD-203** Battle Mistress (Legend, Body/Chaos): *"When you recycle a rune, you may exhaust me to
play a Gold gear token exhausted. When one or more enemy units die, ready me."*
**OGN-200** Twisted Fate, Gambler (Unit, Chaos, E4 M4): *"When I attack, reveal the top rune of your
rune deck, then recycle it. …"*
**SFD-204** On the Hunt (Spell, Body/Chaos, E1 P2): *"Ready your units."*

## What the entry got wrong

It said: *"164.2.b makes the second printed ability of every Basic Rune 'Recycle this: [Reaction] —
Add [C]', so recycling a rune **IS** how Power is produced: **every** Power cost you pay offers
Battle Mistress her trigger."*

The rule is quoted correctly — 164.2.b really is *"Recycle this: [Reaction] — Add [C]"* — but
**"every" is false**. A sweep of all 935 cards for `[Add]` returns **12 printings that add Power
without recycling a rune**:

- the six **Seals** (OGN-040, OGN-081, OGN-120, OGN-163, **OGN-204 Seal of Discord — Chaos**,
  OGN-245), each `E0 P1` gear with *"`:rb_exhaust:`: [Reaction] — [Add] 1 Power"*
- **UNL-T05 Gold** itself, **UNL-049 Honeyfruit**, **OGN-113 Malzahar**, and two legends
  (OGN-247, SFD-189) whose Power is use-restricted

This is not academic. **Seal of Discord is Chaos**, so it is legal in the very deck this entry
describes, and every Power it makes is a Power that does **not** trigger Battle Mistress. The
correct claim is that a rune recycle is the **default** way to make Power, not the only one.

## What survives, and it is the load-bearing half

**Twisted Fate is board-neutral and that part is exactly right.** 416.1: *"Recycling cards is the
action in which a player takes one or more cards from a specific zone and then puts it on the bottom
of the corresponding deck"*, and 416.1.b: *"Runes are Recycled to the Rune Deck."* The rune Twisted
Fate recycles came **off the top of the Rune Deck** and goes to its bottom — it never touched the
board. A broad re-grep of the corpus for rune recycling confirms the shortlist:

| card | what it recycles | cost to you |
|---|---|---|
| **OGN-200** Twisted Fate | top of the **Rune Deck** | **nothing** |
| OGN-287 Sigil of the Storm | *"you **must** recycle one of your runes"* | a board rune, permanently, and not optional |
| OGN-244 Divine Judgment | everything past 2 runes | catastrophic |

(OGN-235 Karma, Channeler triggers on recycling *cards to the Main Deck* and its own reminder says
*"Runes aren't cards"*, so it is not a fourth.)

**The refund arithmetic holds and the entry states it honestly.** Pay 1 Power → a board rune goes to
the Rune Deck for good (161.2.b, 416.1.b). That rune was worth 1 Energy **every turn** through
164.2.a. The Gold is worth 1 Power **once** (187.5). So Battle Mistress makes paying Power *cheaper*
and never *free* — which is exactly what the entry's `terminatesIn` says.

## A second correction the walk found

The entry's step 3 said On the Hunt *"readies your board for a second combat"*. True, but it must not
be read as re-arming the legend: **175** — *"Legends are not Permanents"* — and a Legend is its own
card type (133.5), not a Unit. *"Ready your units"* does **not** touch Battle Mistress. Only her own
*"when one or more enemy units die, ready me"* does.

**Traps.** Empty enemy battlefield (383.4.e, 461): bites, and the entry already states it — Twisted
Fate needs the Attacker designation, and 383.4.e.2.a checks it *"only once per combat"*, so it is one
free recycle per combat, not per move. Rune recycled for Power (161.2.b): the whole point of the
entry, declared not hidden. [Temporary]: the Gold is not (187.5). Awaken Energy (167): the Gold is
killed in the Main Phase; it readies in the Awaken by 315.1.b.

**Verdict: HOLDS after rewrite. → verified**, with the "every Power cost" claim narrowed, the twelve
non-rune Power sources named, and the legend/unit distinction added.

---

# 3. `tornado-warrior-matriarch-recursion` — HOLDS after a REWRITE that triples the stated price

**VEN-104** Tail-Cloaked Matriarch (Unit, Chaos): *"[Empower] `:rb_energy_2::rb_rune_chaos:` … **When
I become [Empowered]**, you may choose a unit in your trash with Energy cost no more than
`:rb_energy_3:` and Power cost no more than `:rb_rune_rainbow:`. Play it to your base, ignoring its
cost."*
**VEN-099** Tornado Warrior (Unit, Chaos, E3 M3): *"[Hidden] … **When you play me from face down,
you may empower something here. Disempower it at end of turn.**"*

## The mechanism is real

- **441.3.a** — *"Players may only Empower Game Objects when directed to by Game Effects."* Tornado
  Warrior is such an effect, so the empower is legal without paying the Matriarch's own cost.
- **441.2.a** — *"When a Game Object becomes Empowered as a result of the Empower game action, that
  is an event that can similarly be referenced by game effects and abilities."* Her trigger reads
  *"When I become [Empowered]"*, which is that event, **not** "when you pay my Empower cost".
- **827.1.c.1** — Empower is short for *"[Cost]: Empower this. **Play only if not Empowered**."* So
  her own ability is single-use; the outside empower is what makes it repeatable.
- **441.1.b** — *"An Empowered Game Object can not be Empowered."* This is why Tornado Warrior's own
  *"Disempower it at end of turn"* is load-bearing: it clears the lock for the next cycle.

## What the entry hid, and it is not small

The entry said the cycle *"costs a card per cycle"*. **[Hidden] costs more than a card.**

- **811.1.b** — *"While this card is in your hand or in your Champion Zone on your turn during an
  Open State, you may **pay [A]** to hide this facedown **at a battlefield you control** that doesn't
  already have a facedown card hidden there … **Beginning on the next turn**, this gains [Reaction]
  and you may play this, ignoring its base cost."*
- **811.1.d.1** — *"A hidden permanent **must** be played to that battlefield."*

Three costs the entry never named:

1. **1 Power to hide** — and 164.2.b means that Power normally recycles a rune off your board, for
   good. So the "free" empower costs a **permanent rune** per cycle.
2. **A full turn of delay.** Hidden this turn, playable *beginning on the next turn*.
3. **A battlefield you control, with no other facedown card on it**, and the Matriarch must be
   standing **there** — 811.1.d.1 pins where Tornado Warrior lands, and her *"here"* has to match.

## The cheaper ordering, tried before filing anything

Project rule: try another legal ordering before treating a cost as fixed. Two alternatives, both
checked against the corpus:

- **VEN-035 Sanction** (Calm, E3 P1, Reaction — *"Empower a unit. Disempower it at end of turn."*):
  same self-cleanup, no hide tax, no delay — but a card **and** 1 Power, so the rune still goes. And
  it moves the line to calm+chaos, where `kharox-sanction-burn` already runs this exact trick.
- **VEN-082 Profiteer** (Body, **E4, no Power**, M4 — *"When you play me, you may **disempower
  something you control** to empower a legend, unit, or gear."*): no Power at all, so **no rune is
  spent**, and no delay. **But my own L7 note called it an "empowerer" and it is not — it is a
  TRANSFER.** It needs something already Empowered to take the status off, so it cannot start the
  first cycle by itself. Correcting that here rather than leaving it in the notes.

None of the three is free. Tornado Warrior stays as the mono-Chaos route, with its real price
written down.

**Traps.** [Temporary] (816.1.b): none. Units enter exhausted (143.4): the revived unit lands *"to
your base"* exhausted and the entry says so; Tornado Warrior likewise. Rune recycled for Power
(161.2.b): **now stated** — the hide cost is exactly this. Empty enemy battlefield: no attack
trigger. Awaken Energy (167): nothing paid at Awaken.

**Verdict: HOLDS after rewrite. → verified**, with the hide cost, the one-turn delay, the
battlefield requirement, and the Profiteer correction all written into the entry.

---

# 4. `kennen-stargazer-arena-flow` — HOLDS as written

**VEN-113** Kennen, Storm of Shuriken (Unit, Chaos, E3 P1 M4): *"When you play me, [Burn 2]. **When I
conquer, give a spell in your trash [Flow] equal to its cost this turn.**"*
**VEN-098** Stargazer (Unit, Chaos, E5 M4): *"Spells with [Flow] you play from your trash cost
`:rb_energy_2:` less, to a minimum of `:rb_energy_1:`."*
**OGN-286** Reckoner's Arena (Battlefield, **Colorless**): *"When you hold here, activate the conquer
effects of units here."*

**The hold-into-conquer conversion is not an interpretation — the rulebook worked this exact
example.** 383.4.g.1: *"To do so, that player checks the condition of all of the specified effects,
as if they had fulfilled the named part of the condition. **Example: Reckoner's Arena reads 'When you
hold here, activate the conquer effects of units here.' For each unit at the battlefield, you will
…**"*. The entry stands on the rulebook's own worked example, which is the strongest footing
available.

**Kennen survives the 383.4.g.1 filter where two other cards do not.** The filter is that the
non-conquer half of the condition must be satisfiable. Kennen's trigger has **no non-conquer half** —
it needs only a spell in the trash. That is why the `reckoners-arena-conquer-on-hold` pattern
excludes SFD-116 Yone (*"a battlefield that was uncontrolled"* is false while you hold) and VEN-065
Swain (needs cards played this turn, and a hold resolves before you have played any), and does not
exclude Kennen.

**Stargazer's discount does reach a GRANTED Flow.** 829.2: *"Flow, and whether or not a spell has
Flow, **is a characteristic of the Spell** and may be checked or referenced by other Game Effects."*
Kennen gives the spell [Flow]; Stargazer's condition is *"spells with [Flow] you play from your
trash"*. The condition is met.

**Arithmetic re-run against the corpus, with the entry's own numbers:**

| spell | printed cost | Flow granted by Kennen ("equal to its cost") | after Stargazer (−2 Energy, min 1) |
|---|---|---|---|
| OGN-198 The Harrowing | E6 P2 | E6 P2 | **E4 P2** |
| SFD-147 Downwell | E8 P2 | E8 P2 | **E6 P2** |
| VEN-103 Shadows of the Past | E3 P1 | E3 P1 | **E1 P1** — the floor, not E1 by subtraction |
| UNL-140 Conscription | E5 P2 | E5 P2 | **E3 P2** |

All four as the entry declares. The Power column is untouched, which the entry also says: Stargazer
discounts **Energy only**.

**Why it is correctly NOT labelled INFINITE.** 829.1.b.1: *"Banishing the spell in this way is a
delayed replacement effect. If the spell would leave the chain after becoming a finalized chain item,
and leaving the chain wasn't instructed by its own execution, **banish it instead**."* Each copy can
be *played* by Flow exactly once. Note the precise bound: a spell that is granted Flow and **not
played** is not banished, so Kennen can grant it again next turn — the fuel is "copies not yet
flowed", and 103.2.b caps that at 3 per name.

**Timing closes.** 829.1.b.2: *"Playing a spell for its Flow cost does not change the timing at which
it can be played."* The Flow is granted in your Beginning Phase and lasts *"this turn"*; the spell is
played in the Main Phase, as any spell would be.

**Traps.** Attacker designation (383.4.e, 461): **not needed** — the trigger arrives through Hold,
which is the whole point of the line. [Temporary] (816.1.b): none. Awaken Energy (167): the trigger
lands in the Beginning Phase but every payment is Main Phase. Rune recycled (161.2.b): the Power
costs above are real rune recycles and the entry does not pretend otherwise. Units enter exhausted
(143.4): Kennen must already be at the Arena from an earlier turn to be holding it.

**Verdict: HOLDS. → verified.** Nothing to change.

---

# 5. `draven-glorious-executioner-point` — HOLDS as written

**SFD-148** Draven, Audacious (Unit, Chaos, E6 P1 M6): *"[Deflect] … **The first time I win a combat
each turn, you score 1 point.** When I die in combat, choose an opponent. **They score 1 point.**"*
**SFD-185** Glorious Executioner (Legend, Fury/Chaos): *"**When you win a combat, draw 1.** (You win
if only your units remain after combat.)"*

**The two clauses compose and the subjects line up.** Draven's is *"the first time **I** win a
combat"*; the legend's is *"when **you** win a combat"*. Draven winning is you winning, so one combat
fires both. The legend carries **no** "first time" clause, so three wins in a turn draw three cards
while still scoring one point — which is what the entry says.

**The dependency on the opponent is real and correctly disclosed.** 461: *"Combat is considered
Staged if there are units controlled by **two opposing players** at a Battlefield …"*. Against a board
that never garrisons there is no combat to win and this engine produces nothing. That is stated in
`prerequisites.notable` rather than buried.

**R2 (ruled A) applied correctly**: 194.1.c covers *"Spells, Triggered Abilities and Activated
Abilities that instruct them to gain one or more points"*, so 470's once-per-battlefield cap does not
consume the battlefield's own Hold.

**The drawback is registered, which is what CLAUDE.md asks for.** *"When I die in combat … They score
1 point"* is the doubled-drawback shape, and it is in `prerequisites.notable`, not hidden in a note.

**Traps.** Empty enemy battlefield (383.4.e, 461): bites, and is disclosed. [Temporary], rune
recycling, Awaken Energy: none apply. Units enter exhausted (143.4): Draven must have landed on an
earlier turn to be in a combat.

**Verdict: HOLDS. → verified.** Nothing to change.

---

# 6. `pack-of-wonders-fizz-spell-recursion` — HOLDS after a REWRITE

**OGN-181** Pack of Wonders (Gear, Chaos, E2): *"`:rb_exhaust:`: Return **another** friendly gear,
unit, or facedown card to its owner's hand."*
**SFD-140** Fizz, Trickster (Unit, Chaos, E3 P1 M3): *"When you play me, you may play a spell from
your trash with Energy cost no more than `:rb_energy_3:`, ignoring its Energy cost. **Then recycle
it.** (You must still pay its Power cost.)"*

**The cycle and its price check out.** 3 Energy + 1 Power per cycle — a fresh play of Fizz — for one
free spell of Energy cost 3 or less, its Power still paid. *"Another"* stops the Pack bouncing
itself. Fizz re-enters exhausted (143.4) and the line never needs him to move.

**The recycle-vs-banish distinction is right and is the entry's best point.** 416.1: recycling *"puts
it on the bottom of the corresponding deck"*, and 416.1.a sends Main Deck cards to the Main Deck. So
Fizz's spell comes back later, unlike a Flow spell, which 829.1.b.1 banishes. Two entries in this
batch replay spells out of the trash and they terminate differently; both say so.

## What the entry got wrong

It claimed *"NOTHING IN CHAOS READIES A GEAR"* and used that to cap the line at one cycle per Pack
per turn. The Chaos half is true — a sweep of all 211 Chaos cards finds readies aimed only at units
(OGN-173, OGN-260, SFD-204, OGN-202, SFD-195) or runes (OGS-017). **But the deck is not only Chaos.**
The entry's own `prerequisites.easy` says *"Legend domains cover Chaos"*, which leaves a second
domain free, and a pool-wide sweep for gear readies turns up:

- **SFD-221 Veiled Temple** — Battlefield, **Colorless**: *"When you conquer here, you may ready a
  friendly gear. If it's an Equipment, you may detach it."* Colorless means it fits **any** Domain
  Identity, including a mono-Chaos one. A conquer there is a **second Fizz cycle in the same turn**.
- VEN-150 Acceleration Gate (Mind/Body, *"Ready up to 4 units, gear, and/or runes"*), VEN-068 Jayce
  (Mind), VEN-145 Curator of the Sands (Calm/Mind), SFD-192 Shurelya's Requiem (Calm/Mind) — all
  outside Chaos, all reachable through the second domain.

So the cap is not "one per Pack per turn" as a fact of the pool; it is one per Pack per turn **absent
a gear ready**, and the cheapest one is colorless and available to this very deck. This also softens
the structural claim in the L7 document's N1 — the Chaos half stands, the pool-wide half does not.

**Traps.** [Temporary]: none. Units enter exhausted (143.4): stated. Attacker designation: none
needed. Awaken Energy (167): Main Phase. Rune recycled for Power (161.2.b): the 1 Power per Fizz is a
real rune, and adding Veiled Temple means winning a conquer, which is not free either.

**Verdict: HOLDS after rewrite. → verified**, with the gear-ready claim scoped to Chaos and Veiled
Temple named as the colorless way to break the once-per-turn cap.

---

# 7. `lee-sin-buff-bank` — HOLDS as written, with a number the entry never stated

**OGN-078** Lee Sin, Ascetic (Unit, Calm, E5 P1 M5): *"[Shield] … `:rb_exhaust:`: Buff me. (I get a
+1 `:rb_might:` buff.) **I can have any number of buffs.**"*
**OGN-152** Mistfall (Gear, Body, E3): *"When you buff a friendly unit, you may pay
`:rb_rune_body:` and exhaust this to ready it."*
**OGN-257** Blind Monk (Legend, Calm/Body): *"`:rb_energy_1:`, `:rb_exhaust:`: Buff a friendly unit.
(If it doesn't have a buff, it gets a +1 `:rb_might:` buff.)"*
**OGN-146** Wallop (Spell, Body, E2): *"As you play this, you may spend a buff as an additional cost.
If you do, ignore this spell's cost. Ready a unit."*

**The uniqueness claim survives an independent sweep.** 702.3: *"There can only be one Buff on a Unit
at a time."* 702.3.a: *"If a Buff is added, or instructed to be added, on a Unit that already has a
Buff, **it is not placed instead**."* And the Buff token itself (UNL-T04) prints *"A unit may have no
more than one buff at a time."* A pool-wide grep for `any number of buff|another buff|additional
buff|more than one buff` returns **OGN-078 and nothing else** — the other two hits are Kraken Hunter
and Albus Ferros *spending* any number, not holding them.

**Lee Sin's permission is the one 426.1.b.2 contemplates**: *"Some effects may grant a Game Object
permission to be Buffed multiple times. **Such an effect ignores this restriction.**"*

**A reading that looked new, and the rules already answered it.** Blind Monk's reminder text reads
*"(If it doesn't have a buff, it gets a +1 Might buff.)"* — which on its face refuses to buff an
already-buffed Lee Sin. Before filing anything I grepped: that reminder is 702.3.a restated, and
426.1.b.2 says an effect with the multiple-buff permission **ignores this restriction**. So Blind
Monk does stack onto Lee Sin. **No numbered reading needed.** This is the fifth time on this project
that grepping the rule beat filing a question.

**Mistfall does not eat the buff.** 702.2.b: *"Spending a Buff removes a single Buff counter from a
Unit."* Mistfall never says *spend*; it says *pay `:rb_rune_body:` and exhaust this*. The counter
stays.

**The number the entry never stated.** With its own declared quantities — 1 Lee Sin, 1 Mistfall,
1 Blind Monk — the ordering that maximises the bank is:

| # | action | cost | buffs on Lee Sin |
|---|---|---|---|
| 1 | Lee Sin exhausts: *Buff me* | — | 1 |
| 2 | Mistfall sees the buff: pay 1 Body Power, exhaust Mistfall, **ready Lee Sin** | 1 Power | 1 |
| 3 | Lee Sin exhausts again: *Buff me* | — | 2 |
| 4 | Blind Monk: 1 Energy, exhaust | 1 Energy | **3** |

**Three buffs per turn for 1 Power and 1 Energy**, with everything readying again in the next Awaken
(315.1.b). Order matters: spending Mistfall on Blind Monk's buff instead would waste it, because Lee
Sin is already ready at that point.

**The "one counter per effect" claim is right for the reason the entry gives.** SFD-101 Fae Dragon's
*"buff up to four friendly units"* chooses four **distinct** units, so Lee Sin takes exactly one
counter from it. The bank grows with the **number of buffing effects**, not the size of each.

**The weakness is stated, and it should never be softened.** 705: *"If a Unit leaves play, remove all
Buffs from it."* The whole bank lives on one 5-Might body whose [Shield] only applies while
defending. And 704.1 — *"Buffs are counters, and thus are not targeted by spells and abilities"* —
cuts in the line's favour, not against it: [Deflect] does not stop a buff.

**Correctly NOT infinite.** The return half of the cycle is not printed: *ready on buff* exists
(Mistfall), *buff on ready* does not. OGN-143 Pirate's Haven gives *"+1 Might this turn"*, and 702
makes a buff a **counter** while 426.2.a only allows buffing *"when Game Effects direct them to do
so"* — a temporary Might modifier places no counter.

**Traps.** No attack trigger, no [Temporary], no Awaken Energy. The only rune recycled is Mistfall's
explicit 1 Body Power, and that is a real permanent cost (161.2.b) that the walk adds to the entry.

**Verdict: HOLDS. → verified**, plus the measured "3 buffs per turn for 1 Power + 1 Energy" and the
426.1.b.2 answer to the Blind Monk reminder.

---

# 8. `kraken-hunter-buff-discount-gold` — HOLDS as written, with a board requirement added

**SFD-101** Fae Dragon (Unit, Body, E7 P1 M7): *"When you play me, buff up to four friendly units.
(Give each a +1 `:rb_might:` buff if it doesn't have one.) **When you spend a buff, play a Gold gear
token exhausted.**"*
**OGN-150** Kraken Hunter (Unit, Body, E3 P2 M5): *"[Accelerate] … [Assault] … **As you play me, you
may spend any number of buffs as an additional cost. Reduce my cost by `:rb_rune_body:` for each buff
you spend.**"*

**Arithmetic against the entry's own declared quantities** (1 Fae Dragon, 1 Kraken Hunter): Kraken
Hunter's printed Power cost is **P2**, so spending **2 buffs** takes it to **zero**, and each spend is
a separate Fae Dragon trigger → **2 Gold**. Exactly as declared.

**The requirement the entry omitted:** you need **two buffed units on the board** to spend two buffs.
702.3 caps a unit at one buff, so *"any number of buffs"* really means *"as many as you have buffed
units"*. Fae Dragon can buff itself, so Fae Dragon plus one other friendly unit is the minimum board.
Added to the entry.

**Why the Power discount is the point.** 164.2.b makes *"Recycle this: [Reaction] — Add [C]"* the
rune's Power ability, and 161.2.b / 416.1.b send that rune to the Rune Deck permanently. Two Power
saved is **two runes that stay on the board**, each making 1 Energy every turn through 164.2.a. This
is the only buff-paid **Power** discount in the pool — every other spend-a-buff payoff trades for a
ready (Wallop), a Gold (Fae Dragon), a rune (Albus Ferros) or Might (Sett).

**The Golds are next-turn Power and the entry says so.** 187.5 prints the Gold as *"[Reaction][>] Kill
this, [E]: [Add] [A]"* — the `[E]` is an exhaust, so an exhausted Gold cannot pay it. 315.1.b readies
it in your next Awaken; 167 and 167.1 are why you must kill it in the **Main Phase** and not earlier.
R25 (ruled A) would make them immediate under SFD-171 Renata, but she is Order and that moves the
line to Body+Order, overlapping the verified `fae-dragon-wallop-industrialist` — stated in the entry.

**No timing sleight of hand.** The Golds arrive from a trigger that resolves *after* Kraken Hunter's
cost is paid, so they cannot help pay for him. The entry never claims they do.

**Traps.** [Temporary]: the Gold is not (187.5). Units enter exhausted (143.4): [Accelerate] is the
printed answer for Kraken Hunter himself and the entry says that without it he cannot Standard Move.
Attacker designation: none needed. Awaken Energy (167): all Main Phase. Rune recycled: the line
*prevents* two recycles, which is its whole value.

**Verdict: HOLDS. → verified**, plus the two-buffed-units board requirement.

---

# 9. `wuju-master-blood-rose-level` — HOLDS after a REWRITE, and the new trap survives the walk

**UNL-191** Wuju Master (Legend, Calm/Body): *"[Level 6][>] Your units have +1 `:rb_might:`. (While
you have 6+ XP, get the effect.) **[Level 11][>] Your units enter ready.**"*
**UNL-109** Blood Rose (Gear, Body, E1): *"When you play a unit, you may pay `:rb_energy_1:` to gain
1 XP. **Spend 3 XP, `:rb_exhaust:`: Ready a unit.**"*

## The new trap is real. All three citations confirmed.

- **824.1.b.1** — `[Level N]` is *"functionally short for 'While you have **[N] or more** XP, this
  card gains [Text]'."*
- **824.1.d** — *"The Dependent Ability will be **Inactive as soon as** the controlling player has
  less than [N] XP."*
- **730.2** — *"To Spend XP, **reduce the value of XP marked on the Player** spending it."*

Together: Level is a **current balance**, not a high-water mark, and spending XP walks it back down.
A deck at exactly 11 XP that uses Blood Rose's *"Spend 3 XP"* falls to 8 and **loses "your units
enter ready" immediately**. Confirmed, and it is the first time this project has written it down.

**But the walk also resolves the tension the entry left open.** Once Level 11 is live, *"your units
enter ready"* already does the job Blood Rose's ready ability exists for — freshly played units no
longer need readying. The sink is one you simply **stop using** in the 11–13 band; it becomes safe
again at 14+. So the two cards do not fight as badly as B4 feared: they fight only if you forget
which half you are running. That belongs in the entry, because "declare the margin" is actionable and
"these cards conflict" is not.

## Why Level 11 is the ceiling of the domain — sweep re-run

143.4: *"Units enter the Board exhausted."* A pool-wide grep for effects that switch it off returns
**seven**, and only one is permanent, free and unkillable:

| card | scope |
|---|---|
| **UNL-191 Wuju Master** | **all your units, permanently — and it is a legend: not drawn, not killed, costs no card** |
| SFD-171 Renata Glasc, Industrialist | your **tokens** only |
| OGN-011 Magma Wurm | other friendly units, but it is an E8 P1 unit that can be killed |
| OGN-129 Confront | *"Units you play **this turn**"* |
| SFD-004 Bushwhack | *"Friendly units enter ready **this turn**"* |
| UNL-016 Scorchclaw, UNL-035 Monch | themselves only |

The entry's claim stands.

## What the entry got wrong

Its `prerequisites.notable` listed the Body XP sinks to watch as *"UNL-102 Crowd Favorite 2 XP,
UNL-119 Kha'Zix 3 XP, **UNL-203 Keeper of the Hammer 3 XP, UNL-201 Voidreaver 1-2 XP**"*. The last
two are **legends** — Body/Order and Body/Chaos. A deck has exactly one legend and this one is Wuju
Master, so neither can ever appear in it. Only the two units are real sinks here. Corrected.

**A ramp the entry missed, and it is the cleanest one.** **OGN-275 Altar to Unity** is a **colorless**
battlefield: *"When you hold here, play a 1 `:rb_might:` Recruit unit token in your base."* 185.2.a —
*"Tokens can be played by their owner if their card type is played"* — makes that Recruit a unit
play, so Blood Rose turns it into **1 XP for 1 Energy, every hold, spending no card**. Better than
UNL-044 Flurry of Feathers (E4 P2 for four Birds, i.e. 4 XP for 4 more Energy and a card).

**The Repeat contra-trap holds.** 820.1.c.3: *"Each Repeat Cost can be paid only a single time."* So
SFD-031 Desert's Call gives **two** Sand Soldiers, not N — it is not a scalable XP bomb, and the entry
says so.

**Traps.** [Hunt] is both Conquer and Hold (823.1.b), so XP can climb without attacking — but a
[Temporary] token dies at the start of its controller's Beginning Phase *before scoring*
(816.1.b) and therefore never Holds, so it can never contribute a [Hunt] XP. Awaken Energy (167):
Blood Rose is paid in the Main Phase. Units enter exhausted (143.4): that is the whole thing this
entry turns off. Attacker designation and rune recycling: not involved.

**Verdict: HOLDS after rewrite. → verified**, with the two impossible legends removed from the sink
list, Altar to Unity added as the cheapest ramp, and the 11–13 band spelled out as the actionable
form of the trap.

---

# Summary

| entry | verdict | what the walk changed |
|---|---|---|
| `yasuo-syren-unforgiven-point` | **HOLDS** | added the timing chain (381 + 151.2 + 144.1.a) it had asserted without support |
| `battle-mistress-gold-refund` | **HOLDS after rewrite** | *"every Power cost"* was false — 12 printings add Power without recycling a rune, one of them Chaos; and *"Ready your units"* does not ready a legend (175) |
| `tornado-warrior-matriarch-recursion` | **HOLDS after rewrite** | [Hidden] costs 1 Power, a full turn of delay and a battlefield you control (811.1.b, 811.1.d.1); Profiteer is a transfer, not a source |
| `kennen-stargazer-arena-flow` | **HOLDS** | nothing — it stands on the rulebook's own worked example at 383.4.g.1 |
| `draven-glorious-executioner-point` | **HOLDS** | nothing |
| `pack-of-wonders-fizz-spell-recursion` | **HOLDS after rewrite** | *"nothing readies a gear"* is true of Chaos, not of the pool: SFD-221 Veiled Temple is colorless |
| `lee-sin-buff-bank` | **HOLDS** | measured the bank (3 buffs/turn for 1 Power + 1 Energy); 426.1.b.2 answers the Blind Monk reminder without a new reading |
| `kraken-hunter-buff-discount-gold` | **HOLDS** | needs two buffed units on the board to spend two buffs |
| `wuju-master-blood-rose-level` | **HOLDS after rewrite** | two of the four listed XP sinks are legends and can never be in this deck; Altar to Unity is the cheapest ramp; the trap's actionable form is the 11–13 band |

**Nine hold, zero refuted, four rewritten.** No new rules reading was filed: the one candidate (does
Blind Monk's reminder block a second buff on Lee Sin?) was answered by 426.1.b.2, and the one cost
that looked like an interpretation (Tornado Warrior's hide) was answered by 811.1.b and 811.1.d.1.

**Two claims of mine from the L7 document are corrected here**, since a walk that only audits other
people's work is not doing its job: *"nothing readies a gear"* was scoped to Chaos and presented as a
pool fact, and *"Profiteer is a free empowerer"* was wrong — it is a transfer and cannot start a cycle.
