# Hand walks — the discard and trash lens (issue #95)

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16
**Result: 7 walked, 7 HOLD — 4 as written, 3 only after a rewrite. 0 refuted.**
**No INFINITE. The hunt's structural claim (R1) survives the walk, and the walk found a second,
independent reason for it.**

All seven are ENGINE, so the bar is *"the mechanism produces what the entry says"*, not *"reaches 8"*.

---

## Step 2 done first, in bulk: every citation opened

**Every rule number the issue cites and every one the seven entries cite** was pulled by exact number
out of `data/Riftbound-Core-Rules-2026-07-16.txt` and read there — **over 130 paragraphs**, including
the whole of 203–206 (Costs), 356 (paying a card's cost), 377–378 (Activated Abilities), 431 (Burn Out),
441–442 (Empower / Disempower) and 806 (Action). **All of them say what the entry says they say except
one**, and that one is the issue's own; it is fixed in candidate 4:

| cited | for what | verdict |
|---|---|---|
| **827.1.c.1** | #95 candidate 4: *"hay que chequear que `Disempower me` no se pueda pagar si no está Empowered"* | **WRONG RULE.** 827.1.c.1 is the shorthand of the **[Empower] KEYWORD** (*"[Cost]: Empower this. Play only if not Empowered."*). `VEN-143 Master of Shadows` carries no [Empower] keyword — he carries a Triggered Ability that empowers him and an Activated Ability whose cost is *"Disempower me, :rb_exhaust:"*. The rules that actually gate it are **442.1.a** (*"Disempowering affects only cards that are currently Empowered."*) and **203.3** (*"If the game action associated with a Cost is impossible for any reason such that a player cannot perform it, then they cannot pay the Cost and they will not execute the linked Effect."*). Same verdict, right citation. |

Ban check, same pass: all **20 distinct cards** across the seven were grepped for the `[BANNED`
marker in `data/corpus_flat.txt`. **None is banned or restricted in any format.** The pool has 12
banned rows and one of them is `OGN-182 Scrapheap`, the sixth discard payoff — which is why the lens
has five playable payoffs, not six.

### 203.3 is the general rule the project had never cited

The catalogue quotes **414.4** (exhaust), **416.3** (recycle) and **422.3** (discard) — each of which
says *"the Action must be able to be completed for the cost to be paid"* for one specific action.
**203.3 is the general form**, and it is what settles a cost action the rules never wrote a
paragraph for, such as *"Disempower me"*. Worth having: this lens is full of non-standard costs.

### Two blocks of rules the catalogue had never cited at all

`grep -o '385\.[0-9a-z.]*'` and `'422\.[0-9a-z.]*'` over `data/combos.json` before this walk:
**0 hits** for 385; 422 appeared only as 422.1 (×3), 422.1.a (×4) and 422.1.b (×5), all of them from
the #89 discard entries. `203.3` was also at **0**. **385 is entirely new to the catalogue**, and it is the block that makes the whole trash half of the lens work:

- **385.1** — *"Triggered Abilities on cards outside of the Board rely on the Information Level of the
  zone they are in."*
- **385.2** — *"Triggered Abilities outside of the Board will self-describe their context.
  Example: The triggered ability "When you conquer, you may discard 1 to return this from your trash
  to your hand." triggers while the card it's on is in the trash, and not anywhere else."*
- **108.2.d** — *"Cards in a player's Trash are Public Information."*

385.2's worked example is, word for word, the printed text of **`OGN-252 Super Mega Death Rocket!`**.
That is candidate 3, and it means the card needs no filed reading at all.

---

## R1 survives, and the walk adds a second reason

The hunt's structural claim is that the lens cannot produce an INFINITE because the 31 discard
outlets fall into seven shapes and **none is free and repeatable inside one turn**. Spot-checked
against the rules, all seven gates hold:

| shape | the gate, opened | holds? |
|---|---|---|
| `when you play me` | 103.2.b — *"Your Main Deck can include up to 3 copies of the same named card."* | yes |
| `:rb_exhaust:` in the cost | 414.4 + 315.1.b (*"The Turn Player readies all Game Objects they control that are able to be readied"* — in the **Awaken Phase**, i.e. next turn) | yes |
| movement trigger | 144.2 (the Standard Move's cost is the unit's own exhaust) + 420.3.a; effect-moves cost cards and Power | yes, and it is the loosest of the seven |
| conquer / hold trigger | one per battlefield per turn | yes |
| one-shot spell | 157 — *"A spell creates a game effect according to its instructions and is then placed in the Trash"* | yes |
| `[Empower]` / `[Repeat]` cost | 827.1.c.1 + **820.1.c.3** *"Each Repeat Cost can be paid only a single time."* | yes |
| `[Deathknell]` | one per death; another death costs another reanimator | yes |

**The walk's own addition, which is independent of the seven shapes:** every payoff in the lens
charges **Power**, not Energy — `OGN-006 Flame Chompers` is 1 Fury Power, `VEN-094 Mask Mother` is
1 Energy, `OGN-252`'s recast is 1 Power, `UNL-142 Heedless Resurrection` is 1 Chaos Power. The
project's measured free floor is **2 Power per turn** (164.2.b, 161.2.b, 315.3.b / 430.4.a), and
Power is not a currency any card in this lens produces. So even if a discard outlet were free and
repeatable, the payoffs would still be capped at two or three executions a turn. A loop needs a
payoff that is free per pass; this lens has none.

---

## The price of `OGN-006 Flame Chompers`, settled by the pool and not re-litigated

Candidates 1, 2, 3 and 7 all stand on *"When you discard me, you may pay `:rb_rune_fury:` to play
me."* costing **one Fury Power and nothing else**. That is the reading the catalogue already uses,
in two verified entries (`flame-chompers-discard-recursion` for Chompers, and
`death-from-below-recurring-kill` for `OGN-037 Immortal Phoenix`, which prints the same *"pay X to
play me"* shape). The evidence is inside the pool and I re-checked it rather than inheriting it:

- **The contrast.** `SFD-150 Last Rites` also plays a unit out of the trash and prints
  *"(You still pay its costs.)"*. `OGN-006` and `OGN-037` print no such clause. Riot writes it when
  it means it.
- **051** — *"Card text uses different terminology than rules. Card text should be interpreted
  according to these rules"* — maps *"pay `[R Fury]` to play me"* onto **356.1.a**: *"If an ability or
  instruction allows you to play a card 'for [Cost]', replace the card's Base Costs with [Cost]."*
- **The dead-letter argument (002, the R28 shape).** Under the additive reading, Flame Chompers from
  the trash would cost E3 **plus** 1 Fury Power — strictly worse than playing it from hand for E3 —
  and Immortal Phoenix would cost E1 + Fury **plus** E3 + Power. Both cards' entire identity would be
  dead letter.

**No reading is filed.** There is no alternative ordering to try (the CLAUDE.md rule) because there is
no ordering question here, and the rules do answer it through 051 + 356.1.a.

---

# 1. `get-excited-flame-chompers-jinx` — HOLDS, and it is bigger than the issue wrote it

```
OGN-008 | Get Excited!   | Spell | Fury  | E2 P1 | [Action] (Play on your turn or in showdowns.) Discard 1. Deal its Energy cost as damage to a unit at a battlefield. (Ignore its Power cost.)
OGN-006 | Flame Chompers | Unit  | Fury  | E3 M3 | When you discard me, you may pay :rb_rune_fury: to play me. [Tags: Zaun]
OGN-202 | Jinx, Rebel    | Unit  | Chaos | E5 P1 M5 | When you discard one or more cards, ready me and give me +1 :rb_might: this turn. [Tags: Jinx, Zaun]
OGN-019 | Raging Soul    | Unit  | Fury  | E4 M4 | If you've discarded a card this turn, I have [Assault] and [Ganking].
OGN-251 | Loose Cannon   | Legend| Fury/Chaos | - | At start of your Beginning Phase, draw 1 if you have one or fewer cards in your hand. [Tags: Jinx]
```

**The damage reads the PRINTED cost, and that is the whole card.** **206**: *"Effects that need to
determine a card's cost for any purpose always use its printed or copied cost, even if that cost is
increased, decreased, or ignored as the card is played."* Its worked example is Lux, Illuminated
reading Sky Splitter's printed 8 through a discount.

**So the ceiling of Get Excited! is not 3, it is 10.** In a Fury/Chaos identity the deck can hold
`UNL-147 Baron Nashor` (**Chaos, E10 P3 M12**) and `OGN-195 Rhasa the Sunderer` (**Chaos, E10 P1 M6**).
Discarding either deals **10 damage to a unit at a battlefield for 2 Energy and 1 Power**, and the
parenthetical *"(Ignore its Power cost.)"* says the P3 does not count against you. Ten kills every
unit printed in the pool except the two 12-Might ones (Baron Nashor itself and `UNL-059 Master Yi,
Unstoppable`). Rhasa is the better discard of the two because candidate 6 wants it in the trash
anyway. **The issue did not measure this**; it walked Chompers (3) and Brazen Buccaneer (6).

**The Chompers discard is the one where the card is not lost.** 422.1.a lets you choose it, 422.1.b
executes its trigger *after* the discard has occurred (so the card is already in the trash when it
says "play me"), and 355.2.a puts the body at your base **or a battlefield you control**, exhausted
(143.4).

**What Jinx, Rebel's ready is actually worth, priced.** 415.1 makes Readying *"an action that marks a
non-spell Game Object on the board as available for action"*. She has no [Ganking], so **144.4** gives
her exactly two destinations: **144.4.a** base → battlefield and **144.4.b** battlefield → base, and
**144.2** makes her own exhaust the whole cost. So the **first** ready of a turn is the valuable one:
it lets her leave the base on the turn she landed, which 143.4 otherwise forbids. A second ready the
same turn only sends her home. The entry says this and does not claim more.

**One trigger per discard ACTION, not per card.** **422.5**: *"This action is formatted as 'Discard
X.'"* — so `OGN-030 Jinx, Demolitionist`'s *"discard 2"* is one action and readies Jinx, Rebel once.
This is the issue's own correction and it is right.

**Raging Soul is a continuous conditional, not a trigger.** *"If you've discarded a card this turn"* —
once any discard has happened it stays on for the rest of the turn, whichever discard it was, and it
does not care about chain order.

**Domain.** Fury (Get Excited!, Flame Chompers, Raging Soul) + Chaos (Jinx, Rebel, Baron Nashor,
Rhasa). **103.1.b.1** *"Cards included in your deck must abide by your Domain Identity"* and
**103.1.b.2** *"Your deck's Domain Identity is dictated by the domains of your Champion Legend"*: five
legends are Fury/Chaos — OGN-251 Loose Cannon, OGS-017 Dark Child, SFD-185 Glorious Executioner,
UNL-185 Bloodharbor Ripper, VEN-143 Master of Shadows. Loose Cannon is the one the line wants,
because the line empties the hand on purpose.

**Traps.** No Attacker designation is claimed (807.1.d, 383.4.e), so Raging Soul's [Assault] figure
is not counted into any Might total. No [Repeat], no [Temporary], no token (185 / 186.1 never arise),
no recall, no Gold, no battlefield of its own, no Empower. All costs are Main Phase costs, so 167
does not bite.

**Overlap, declared:** `flame-chompers-discard-recursion` (#89) already pairs Chompers with
`OGN-003` / `OGN-030` / `OGN-252` under the same legend. This entry is a different outlet with a
different payoff — the discard becomes **damage**, and Jinx, Rebel and Raging Soul appear in no entry.

---

# 2. `undercover-agent-heedless-chompers` — HOLDS, with the chain order removed as a claim

```
OGN-178 | Undercover Agent      | Unit  | Chaos | E5 P1 M5 | [Deathknell] — Discard 2, then draw 2. (When I die, get the effect.)
UNL-142 | Heedless Resurrection | Spell | Chaos | E2 P1 | [Reaction] ... As an additional cost to play this, kill a friendly unit. Play a unit from your trash that costs no more Energy and no more Power than the killed unit, ignoring its cost.
OGN-006 | Flame Chompers        | Unit  | Fury  | E3 M3 | When you discard me, you may pay :rb_rune_fury: to play me.
```

**Undercover Agent is 422.4's worked example, and it is in no entry.** **422.4**: *"When Discarding is
part of an effect, then a player must Discard as many cards as possible from their hand. If instructed
to discard more cards than they have in their hand, further discard instructions are ignored. Example:
Undercover Agent has the ability "[Deathknell][>] Discard 2, then draw 2." ... Regardless of how many
they discard, they then draw 2."* The draw is unconditional; the discard is capped by the hand.

**The kill-as-cost chain, opened.** **356.2.a.1** makes it mandatory (*"as an additional cost"*, no
*"may"*). **428.1.a.1** — *"Active Kill is when the action is taken when instructed by a game effect or
as a cost."* **428.1.a.1.b** — *"When a unit with a Deathknell ... is to be put in the Trash due to a
Kill Instruction, it first has any such ability added to the chain as a Pending Item."* And **808.1.d**
— *"The Trigger ... is the Permanent being Killed **and sent to the Trash**."* The Agent **is** sent to
the trash, so **808.1.d.1** (which deletes the Deathknell when the body never gets there) cannot bite.
This is the mirror of `soraka-fiora-loop-shield`, which loses its Deathknell for the opposite reason.

**The entry makes no claim about which of the two resolves first, and it does not need to.**
428.1.a.1.b puts the Deathknell on the chain while Heedless Resurrection's cost is being paid, and
**340.1** resolves *"the newest Finalized Chain Item"* first. I could not settle which of the two
finalizes last from the rules text, so the entry does not assert it: **both orders give the same
result** — the Agent is in the trash from the moment the cost is paid, so Heedless can always find it,
and the Deathknell resolves regardless. If the Deathknell goes first, the two discarded cards are also
in the trash when Heedless looks, which only widens the choice. *(The issue asserted the Deathknell
resolves first; the existing entry `heedless-resurrection-removal-blank` words it as "goes on the
chain first". Neither is load-bearing here and this walk drops the claim rather than inherit it.)*

**The Agent reanimates itself, for the same reason the existing entry found.** The filter is *"costs no
more Energy and no more Power than the killed unit"* and the killed unit **is** the Agent (E5 P1), so
it always qualifies. It comes back as a new object, exhausted (143.4), at your base or a battlefield
you control (355.2.a).

**Arithmetic with the declared quantities.** Per cast: **2 Energy + 1 Chaos Power**, plus **1 Fury
Power per Flame Chompers discarded**. With two Chompers in hand: **two 3-Might bodies, hand size
unchanged** (discard 2 / draw 2), **and the Agent back on the board**. The hard ceiling is **three
Chompers** (103.2.b) and nothing in the line returns one from the trash to hand — 422.1 defines a
discard as moving a card **from a player's hand** into the trash — so it is one full cycle and one
half, not three, exactly as the issue says.

**The Karthus fork, and the rule that splits it.** `OGN-236 Karthus, Eternal` (*"Your [Deathknell]
effects trigger an additional time"*) would make it discard 4 / draw 4. He is **Order**. 103.1.b.1 /
103.1.b.2 forbid him in a Fury/Chaos deck, and a legend has exactly two domains. The build that CAN
hold him is **Order/Chaos under `VEN-155 Heart of the Tempest`** — the pool's only Order/Chaos legend,
and one that pays for this line by itself (*"When you play a card from anywhere other than your hand,
empower me"*, which every reanimation satisfies). It loses Flame Chompers (Fury); the Chaos payoffs
that survive are `VEN-094 Mask Mother` and `OGN-202 Jinx, Rebel`. **Two decks, not one** — the same
Domain Identity trap #48 walked into with Chemtech Cask.

**Overlap, declared:** `heedless-resurrection-removal-blank` already declares 3 copies of UNL-142.
Inside one deck they are alternatives, not a sum.

**Traps.** No Attacker designation. No [Repeat], no [Temporary]. **A token is not fuel here either** —
185 and 186.1 mean a token never reaches the trash and has no printed cost, so killing one reanimates
nothing. No recall, so 808.1.d.1 is not engaged. No battlefield of its own.

---

# 3. `smdr-trash-copies-conquer` — HOLDS

```
OGN-252 | Super Mega Death Rocket! | Spell | Fury/Chaos | E4 P1 | Deal 5 to a unit. When you conquer, you may discard 1 to return this from your trash to your hand. [Tags: Jinx]
```

**385.2's worked example is this card, verbatim**, so nothing here needs a reading: *"The triggered
ability "When you conquer, you may discard 1 to return this from your trash to your hand." triggers
while the card it's on is in the trash, and not anywhere else."* **385.1** is why it works at all
(*"rely on the Information Level of the zone they are in"*) and **108.2.d** supplies it: *"Cards in a
player's Trash are Public Information."*

**Three copies in the trash are three independent triggers on one conquer.** Each trigger sits on its
own card. You control all three, so **383.3.d** lets you order them, and each asks for **its own**
*"you may discard 1"*. Three discards, three Rockets back in hand.

**This is what the `red-brambleback-conquer` synergy exclusion now says**, and it is worth recording
that the correction the issue asked for **had already been applied** in `data/synergies.json` by
commit `6eaa1aa` (#99, 2026-09-06). The `why` reads: *"the extra instance lands on the copy that has
just left the trash and finds it already in your hand. 385.2 does give every copy sitting in the trash
its own trigger — three copies answer one conquer three times, each with its own discard — but that is
three copies working, not Red Brambleback doubling one."* Nothing to change. This walk confirms it.

**The bill is Power, not the trigger.** The returns are free — the discard **is** the cost, and with a
Flame Chompers it is a negative cost (1 Fury Power for a 3-Might body). What is not free is casting
them again: **E4 + 1 Power each**. Against the project's measured free floor of 2 Power per turn, that
is **two recasts a turn**, three if you recycle a third rune and give up its Energy. **Declaring "3
Super Mega Death Rockets per turn" would be false** and the entry does not.

**And Deal 5 is not points.** This is repeatable reach, not a route to 8. ENGINE.

**Overlap, declared:** `flame-chompers-discard-recursion` holds one copy of the Rocket as an enabler
for the Chompers. This entry inverts it — the Rockets are the engine and the multiplicity is the
finding — and raises the copy count to 3 for that reason.

---

# 4. `master-of-shadows-banish-rummage` — HOLDS after a rewrite: the gating rule was the wrong one, and the banish source is not what the issue named

```
VEN-143 | Master of Shadows | Legend | Fury/Chaos | - | When you banish a card you own, empower me. (I become Empowered if I'm not already.) [Action][>] Disempower me, :rb_exhaust:: Discard 1, then draw 1. [Tags: Zed]
VEN-113 | Kennen, Storm of Shuriken | Unit | Chaos | E3 P1 M4 | When you play me, [Burn 2]. When I conquer, give a spell in your trash [Flow] equal to its cost this turn.
VEN-144 | Death Mark | Spell | Fury/Chaos | E2 P1 | [Burn 3]. Play a 0 :rb_might: Shadow Clone unit token. [Flow] :rb_energy_1::rb_rune_rainbow::rb_rune_rainbow:
VEN-098 | Stargazer | Unit | Chaos | E5 M4 | Spells with [Flow] you play from your trash cost :rb_energy_2: less, to a minimum of :rb_energy_1:.
```

**Correction 1 — the gate.** The issue cited **827.1.c.1** for *"Disempower me can't be paid if you are
not Empowered"*. 827.1.c.1 is the shorthand of the **[Empower] keyword** and Master of Shadows does not
have that keyword. The rules that gate it are **442.1.a** (*"Disempowering affects only cards that are
currently Empowered."*) and **203.3** (*"If the game action associated with a Cost is impossible for
any reason such that a player cannot perform it, then they cannot pay the Cost and they will not
execute the linked Effect."*). Verdict unchanged, citation fixed. 203.3 is the general form of the
three the catalogue already quotes: 414.4 (exhaust), 416.3 (recycle), 422.3 (discard).

**Correction 2 — a second banish the same turn is worth nothing.** **441.1.a** *"Empowered is a binary
state."* **441.1.b** *"An Empowered Game Object can not be Empowered."* So the engine is **one
activation per banish**, and the exhaust in the cost caps it at **one per turn** anyway — 315.1.b
readies him in the **Awaken Phase**, i.e. next turn.

**Correction 3 — the renewable banish is Kennen's conquer, not Stargazer.** The issue built the line on
Stargazer + Kennen, but Stargazer is only a discount. The full in-domain inventory of *"banish a card
you own"*, counted from the corpus:

| source | how many | renewable? |
|---|---|---|
| **829.1.b** — *"You may play this from your trash for its flow cost. **Then banish it.**"* — the 13 [Flow] spells | 3 copies each, banished on use | no, each play consumes the card |
| **VEN-113 Kennen, Storm of Shuriken** — *"When I conquer, give a spell in your trash [Flow] equal to its cost this turn"* | one per conquer | **yes** — this is the engine |
| **VEN-101 Gust Monk** — optional additional cost E1, *"banish a card from any trash"* | 3 | no |
| **UNL-148 Cursed Sarcophagus** — *"banish all units from your trash"* | once per copy | no, and 441.1.b makes the bulk banish worth one empower |
| the **Shadow Clone** token (VEN-023 / VEN-112 / VEN-144) — *"When I attack, you may banish a unit from your trash"* | per attack | needs the **Attacker** designation (807.1.d, 383.4.e), so it is not free |

**Per turn, walked:** conquer with Kennen → a spell in your trash gets [Flow] equal to its cost →
play it from the trash (Stargazer takes 2 Energy off, floor 1) → **829.1.b banishes it** → Master of
Shadows is Empowered → `[Action][>]` Disempower + exhaust → **Discard 1, then draw 1**. **806.1.c.2**
lets that happen *"during showdowns on any player's turn"*. Aim the discard (422.1.a) at a Flame
Chompers: 422.1.b, 1 Fury Power, a 3-Might body at your base or a battlefield you control.

**What it does NOT do.** The discard-then-draw is **card-neutral by itself**. The entire value is in
what the discard hits. Without Flame Chompers, Mask Mother, Jinx, Rebel or Raging Soul in the deck,
this legend's ability is a filter, not an engine, and the entry says so.

**Overlap, declared:** `kennen-stargazer-arena-flow` already pairs VEN-113 with VEN-098 under
Reckoner's Arena. This entry uses the same conquer for a different payoff — the **banish**, not the
re-played spell — and puts the legend to work; VEN-143 appeared in **no** entry before this walk.

---

# 5. `last-rites-stack-arena-reanimator` — HOLDS after the arithmetic is cut from 6 to 4, and the Energy is priced where the issue did not price it

```
SFD-150 | Last Rites       | Gear | Chaos | E3 M+2 | [Equip] — :rb_rune_chaos:, Recycle 2 cards from your trash  [Effect] When I conquer or hold, you may play a unit from your trash. (You still pay its costs.) [Tags: Equipment]
OGN-286 | Reckoner's Arena | Battlefield | Colorless | - | When you hold here, activate the conquer effects of units here.
VEN-155 | Heart of the Tempest | Legend | Order/Chaos | - | When you play a card from anywhere other than your hand, empower me. [Action][>] Disempower me, :rb_exhaust:: Give a unit [Assault 2] this turn.
```

**The stacking is real, and the four rules the issue cited all check out.** **818.4** *"Multiple
instances of Equip are equivalent to multiple Activated Abilities and can each be activated separately
by paying the corresponding costs."* **818.3.b** *"A Top-Most Card is Equipped as long as one or more
of its Attached cards are Equipment."* **434.1.b.1** *"In the situation where there is more than one
card attached to the Top-Most card, they should be stacked in such a way that all Effect Text boxes
and Might Bonuses are readable. The order of the Attached cards has no bearing on the application of
effects."* **434.1.c** *"The Top-Most card has all Effect Text of all cards Attached to it appended to
its Rules Text."* So N attached copies give the unit the sentence N times, and N triggers.

**The double-count under the Arena is real too**, and it is the reading `ivern-arena-sentinel-hold`
already uses: **383.4.c.1** *"These are commonly structured as "When I conquer…" and "When you
conquer…""* and **383.4.d.1** *"These are commonly structured as "When I hold…" or "When you hold…""*.
One printed sentence that says *"When I conquer or hold"* is therefore **both** a Conquer Effect and a
Hold Effect. On a Hold at the Arena: the hold half fires N times, and the Arena *"activate[s] the
conquer effects of units here"* N times more. **2N windows.**

**Cut from 6 to 4, and the reason is Energy, not the rules.** The issue declared N = 3 and 6 plays.
The bill it did not compute:

| line | cost |
|---|---|
| play 2× Last Rites | **E6** |
| attach 2× ([Equip] — 1 Chaos Power, Recycle 2 from your trash) | **2 Chaos Power + 4 cards off the trash** |
| the 4 windows on the Hold turn | *"(You still pay its costs.)"* — 4 units at their printed cost |

And the windows land in the **Beginning Phase**. **315.2.b.2** puts the Hold in the Scoring Step;
**167** says *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of
each player's turn."* So **every Energy paid at the Hold is a rune exhausted before the Main Phase and
gone from it** — 315.1.b readied those runes in the Awaken Phase and they do not ready again until the
next one. Four E2–E3 units is E8–E12 taken straight out of the turn that follows. A third attach buys
two more windows for another E3, another Chaos Power and **two more cards off the trash you are trying
to play from** — which is the tension the issue named and did not resolve. **The entry declares 2.**

**The [Equip] cost is a real gate.** **416.1** — recycling takes *"one or more **cards**"* and puts
them on the bottom of the deck. **185** — *"Tokens are not cards."* **186.1** — a token ceases to exist
on entering any Non-Board Zone, so none ever remains in a trash to be chosen. **416.3** — a cost
Recycle must be completable, so with fewer than two cards in the trash the attach is simply illegal.

**The legend pays for itself.** `VEN-155 Heart of the Tempest` is the pool's only Order/Chaos legend:
*"When you play a card from anywhere other than your hand, empower me."* Every unit Last Rites pulls
out of the trash satisfies that. 441.1.b keeps it honest — four plays still buy exactly **one**
[Assault 2], because Empowered is binary.

**The battlefield caveat, in the project's standard form.** The battlefield must be the one in play,
and a deck may not carry two of it (Core Rules **103.4.c**, Tournament Rules **402.1**): random 1 of 3
in Duel (**485.5**) and Skirmish (**487.5**), chosen in Match (**486.5**). And a battlefield you bring
starts **uncontrolled** — **190.1** *"Control is established over Battlefields through the course of
play"* and **190.6.d** *"If the battlefield has no Controller, "you" refers to no one, and all such
instructions are ignored."* Walking a body there is part of the cost.

**The Hold has to be survived.** **383.2.a.1** measures the trigger's condition when it is placed, and
315.2.b.2 puts that at the Scoring Step — so the equipped unit must live through the opponent's whole
turn. The Conquer window has no such wait.

**Overlap, declared:** `last-rites-lunar-boon-trash-recursion` (#89) declares 1 copy and solves the
trash-filling with Lunar Boon. This entry is the stacked version under the Arena and needs that entry's
fill to work.

---

# 6. `rhasa-shadowblade-trash-discount` — HOLDS after a rewrite: the issue's own card list breaks Domain Identity

```
OGN-195 | Rhasa the Sunderer | Unit  | Chaos       | E10 P1 M6 | I cost :rb_energy_1: less for each card in your trash.
VEN-096 | Shadowblade Lurker | Unit  | Chaos       | E5 M5     | I cost :rb_energy_2: less for each card with my name in your trash.
VEN-013 | Shadow Assassin    | Unit  | Fury        | E5 M5     | I enter ready if you have a card with my name in your trash.
VEN-108 | Forgotten Relic    | Gear  | Chaos       | E5        | When you play this or at the start of your Beginning Phase, [Burn 1]. ...
VEN-156 | Lightning Rush     | Spell | Order/Chaos | E1        | Look at the top 3 ... Put the rest into your trash.
```

**THE REWRITE.** The issue's five cards **cannot share a deck**. `VEN-013 Shadow Assassin` is **Fury**
and `VEN-156 Lightning Rush` is **Order/Chaos**. **103.1.b.1** *"Cards included in your deck must abide
by your Domain Identity"* and **103.1.b.2** *"Your deck's Domain Identity is dictated by the domains of
your Champion Legend"* — and a legend has exactly two domains. Fury + Chaos keeps Shadow Assassin and
loses Lightning Rush; Order + Chaos keeps Lightning Rush and loses Shadow Assassin. **This is the same
trap #48 walked into with Chemtech Cask**, and the CLAUDE.md rule that says to check 103.1.b.1 before
folding a card in is what caught it.

**The entry is the Fury/Chaos build**, because that is the identity the rest of this lens lives in
(Get Excited!, Flame Chompers, Super Mega Death Rocket!, Jinx, Rebel, Raging Soul, Master of Shadows).
Lightning Rush is named in the entry as the Order/Chaos alternative, with its rule.

**356.6 verbatim**: *"Energy and Power costs can't be reduced below 0."* So ten cards in the trash put
Rhasa at **E0 + 1 Power for a 6-Might body**, and the Power never goes away.

**Shadowblade Lurker's real ceiling is E1, not E-anything.** Only 3 copies exist (103.2.b). Two in the
trash is the most that can be there with a third left to play: E5 − 4 = **E1 for a 5-Might body**.

**Shadow Assassin's "enters ready" is worth exactly one thing**, and #56 already measured what: it is
not a Ready (415.1 marks an object *already on the board*), but it **is** the exception to 143.4, so
the body can take its Standard Move (144.2, 144.4.a) the turn it lands.

**The refutation the entry has to carry, verbatim.** **431.2.b** — *"Recycles their trash into their
Main Deck."* One Burn Out and **all three discounts reset at once**, plus **431.2.c** *"Chooses an
opponent to gain 1 point."* And Forgotten Relic burns one card **every Beginning Phase whether you want
it or not**, so this deck walks toward that wall on a timer. **431.1.b** is why the Burn counts:
*"If a player must put one or more cards from their Main Deck in any other zone, such as the Trash, in
excess of the number of cards in their deck ..."* — and **431.1.c / 431.1.c.1** are why Lightning Rush
would have been the safe filler: looking and revealing *"does not Burn Out, even if those instructions
would cause those cards to change zones."*

**206 cuts the other way and it is a gift.** A discount never changes the printed cost, so Rhasa is
still an **E10 card** for anything that reads a cost — including `OGN-008 Get Excited!`, which will
deal **10**. Candidate 1 and candidate 6 want the same card in the same pile for opposite reasons.

**`OGN-109 Dr. Mundo, Expert` is not the fourth member and the rules say so twice.** **416.4** *"When
Recycling is part of an effect, a player must Recycle as many cards as possible from the specified
zone"* and **416.6**, whose worked example is Mundo by name: *"At the start of your Beginning Phase,
recycle 3 from your trash." As that ability resolves, its controller recycles 3 cards from their
trash."* Mandatory, every turn, out of the exact pile Rhasa is priced against. And he is **Mind**, so
103.1.b.1 keeps him out regardless.

---

# 7. `minah-ride-the-wind-mutual-discard` — HOLDS after a rewrite: the issue's own mover cannot move its own engine

```
VEN-111 | Minah Swiftfoot   | Unit  | Chaos | E6 P1 M6 | When I move to a battlefield, choose one — • Each player discards 1. • Each player draws 1. [Tags: Ionia]
OGN-173 | Ride the Wind     | Spell | Chaos | E2 P1    | [Action] Move a friendly unit and ready it.
OGN-185 | Traveling Merchant| Unit  | Chaos | E2 M2    | When I move, discard 1, then draw 1. [Tags: Bilgewater]
OGN-006 | Flame Chompers    | Unit  | Fury  | E3 M3    | When you discard me, you may pay :rb_rune_fury: to play me.
OGN-202 | Jinx, Rebel       | Unit  | Chaos | E5 P1 M5 | When you discard one or more cards, ready me and give me +1 :rb_might: this turn.
```

**THE REWRITE.** The issue paired Minah with `VEN-105 Twilight Step`. Twilight Step reads *"Move a
unit with 3 `:rb_might:` or less"* and **Minah is 6 Might**. It cannot move her. The issue noticed this
in one sentence and then built the candidate around the pair anyway. The movers that **can** move her,
from the corpus, all Chaos:

| card | cost | what it does |
|---|---|---|
| the **Standard Move** | the unit's own exhaust (144.2) | base ↔ battlefield only (144.4.a / 144.4.b), once per turn |
| **OGN-173 Ride the Wind** | E2 P1, `[Action]` | *"Move a friendly unit and ready it."* — an effect move, so 144.4 does not restrict it (420.3.a puts the exhaust cost on the **Standard** Move only) |
| **SFD-125 Fae Porter** | E4 M4 + 1 Chaos Power | *"When I move to a battlefield, you may pay `:rb_rune_chaos:` to move a unit you control to the same battlefield."* |
| **OGN-184 The Syren** | E2 gear, E1 + exhaust | battlefield → base only, so it never triggers Minah |

**"When I move to a battlefield" needs the move to END at a battlefield.** A Ride the Wind that sends
her home is a Traveling Merchant trigger and not a Minah one — the Merchant's *"When I move"* has no
destination clause and fires on any move, in either direction.

**The honest count per turn is two, three if you pay for it.** Every mover but the Standard Move costs
**Power**, and the project's measured free floor is 2 Power a turn. Standard Move + one Ride the Wind
is two triggers; a second Ride the Wind is a third rune recycled and its Energy given up.

**422.1.a is what makes it a payoff engine and not a hand strip**: *"The player who is performing the
action chooses which cards to send to their Trash, and may use Private Information to do so."* They
discard their **worst** card. You discard a Flame Chompers and get a 3-Might body for 1 Fury Power
(422.1.b, 355.2.a, 143.4), and Jinx, Rebel readies on the same action (422.5 — one trigger per
*"Discard X"*, not one per player). **422.4** finishes the refutation: against an empty hand the whole
instruction is ignored. The entry claims the **self** half; `ashe-retreat-hand-strip` and
`bloodharbor-bewitching-discard` already own the other one.

**No combat is claimed.** *"When I move to a battlefield"* is not an Attack Trigger — **383.4.e**
*"Attack Triggers are Triggered Abilities that trigger when a Unit or Player gains the Attacker
designation for the first time during a combat"* — so the destination can be a battlefield you already
control and the trigger still fires. Nothing in this entry needs 807.1.d.

**Domain.** Minah, Ride the Wind, Traveling Merchant and Jinx, Rebel are Chaos; Flame Chompers is Fury.
A Fury/Chaos legend covers all five (103.1.b.1).

---

## What this walk leaves for `data/synergies.json` (not mine to write)

1. **`OGN-008 Get Excited!` + expensive in-domain cards** — anchor OGN-008, partner = Fury/Chaos cards
   with a printed Energy cost of 6 or more. The rule stands on **206** (the damage reads the printed
   cost) and the instances are text. Watch the nested-quote false positive the CLAUDE.md lists.
2. **`OGN-202 Jinx, Rebel` + any discard outlet** — anchor OGN-202, partner = the 31 outlets of table A.
   The rule stands on 422.5 (one trigger per *"Discard X"* action) and on 144.4 (what the ready buys).
3. **`OGN-019 Raging Soul` + any discard outlet** — same partner set, different payoff (a continuous
   conditional rather than a trigger), so it is a second rule and not the same one.

The existing `shadow-temple-trash-fuel` (anchor VEN-165) already models the trash as a resource from
the filling side; a *"trash as a counter"* rule anchored on OGN-195 Rhasa would overlap it and should
be decided against it first, as #89 §8 warned.

## Method

- Card text for all 20 cards is verbatim from `data/corpus_flat.txt`, grepped, never from memory.
- All 63 rule numbers were opened in `data/Riftbound-Core-Rules-2026-07-16.txt` with an exact-number
  matcher and pasted from the file. One citation in the issue was wrong (827.1.c.1) and is corrected
  above.
- Ban check: `[BANNED` grepped for each of the 20 cards. None.
- No URL was opened. The only sources are the corpus, the Core Rules, and issues #95, #89, #59, #56,
  #48, #45, #36 of this repo.
