# Hand walk — 2v2 (§489) and the Combat-Showdown `[Action]` window (issues #118, #119)

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16

**Result: 1 new ENGINE entry (`possession-action-defender-flip`), with TWO corrections to the
candidate it came from. 1 refutation (#118 C3, the ally-draw pair). 4 entries amended with a
`notable` and no change to class, quantities or steps. 1 citation fixed (#140).**

Card text below was grepped verbatim out of `data/corpus_flat.txt`. Every rule number was opened in
`data/Riftbound-Core-Rules-2026-07-16.txt` and is quoted where it carries weight.

---

## 1. #118 C1 — `OGN-203 Possession` inside an opened Combat

> `OGN-203 | Possession | Spell | Chaos | E8 P3 | [Action] (Play on your turn or in showdowns.)
> Choose an enemy unit at a battlefield. Take control of it and recall it. (Send it to your base.
> This isn't a move.)`

### 1.1 The permission chain, opened

- **155** — *"A spell can be played during an Open State outside of Showdowns on its controller's
  turn."* Both halves fail on the opponent's turn inside a Showdown.
- **312.2.a** — Priority *"When the turn is in a Neutral Open State during their Main Phase."* Yours,
  not theirs.
- **806.1.b** — *"Action grants the corresponding card or effect permission to be played or activated
  during Showdowns, even when it is not the Controlling player's turn."*
  **806.1.c.1** — *"On Cards: 'This can be played during showdowns on any player's turn.'"*
  **806.2** — the permission *"is inclusive of all other timings and options available."*
- **464.2.d** — *"3. The Attacker gains Focus."* → **347.2.b** — *"Otherwise, Focus passes to the next
  Player in Turn Order."* → **312.2.b** — Priority *"When the turn is in a Showdown State and they gain
  Focus."* → **347.1** — *"Play a Card or Activated Ability that is legally timed."*
- **464.2.f.1** — *"Otherwise the Combat Showdown continues, with the State Open as normal."*
  **464.2.g** — *"Players proceed with any play on the Chain as normal."*

So the Defender really does get a window inside the Attacker's own combat, before damage. #118's
Finding D is correct and this is genuinely wider than #58's pre-open window.

### 1.2 How this route differs from #58's pre-open route

**323.10** — *"7a. If Units of two opposing players are no longer present at a Battlefield that has a
Combat Staged **before it has opened**, the Combat will cease being Staged."* That clause is why
`charm-evacuate-conquer` must cast the evacuation **before** the entering move (after a plain move the
very next Cleanup opens the Combat at 323.13 with no gap, and 155 then bars the spell), and why
`faefolk-challenger-forced-attacker` needs a Triggered Ability to reach the gap at all.

Here the Combat has **already opened** (464.2). 323.10 cannot apply, and **461** — *"Combat is
considered Staged if there are units controlled by two opposing players at a Battlefield but the Steps
of Combat have not been initiated"* — means it is no longer even Staged. The spell is cast **after**
the move, on the **other player's** turn. Nothing about the ordering rule of #58 is contradicted: that
rule is about a window that closes, this is about a permission keyword that opens a different one.

### 1.3 No damage — and CORRECTION 1 to #118

> **465.1** — *"If both Attacking and Defending units remain at this battlefield, the following Tasks
> become Outstanding, in the specified order:"*
> **465.2** — *"1. When the Showdown closes, Attackers and Defenders resolve Combat Damage…"*
> **465.3** — *"2. Skip the FEPR process and cancel any outstanding tasks. Proceed to the Resolution
> Step."*

#118 wrote *"they don't, so **465.3 applies instead**"*. It does not apply at all: **465.3 is the
second of the two Tasks inside 465.1's own gated list**, not an else-branch. When the gate fails,
neither Task becomes Outstanding and the game simply reaches Step 3. The outcome — no damage in either
direction — is unchanged, so the candidate's conclusion survives its own citation error.

Then:
- **466.1.a.2** — *"Insert '3d. Recall Attackers present at the Battlefield if Defenders are still
  present.'"* No Attackers are present, so nothing is recalled.
- **466.3.d** — *"There is 'No Result' if units were recalled during step 3d…"* Never reached.
- **466.3.a** — *"A Player has won a combat if they received either the attacker or defender
  designation and are the only Player that has units remaining at this battlefield during this step."*
  The Defender wins.

### 1.4 It does **not** Conquer — CORRECTION 2 to #118

> **466.5** — *"1. If no Showdown or Combat is staged at this location, the player with Units remaining
> here Establishes Control **if they didn't already control this Battlefield**."*
> **466.5.d** — *"**Establishing Control** results in a Conquer if that player has not yet scored this
> Battlefield this turn."*

The Conquer hangs on *Establishing* Control, and the condition on Establishing is *not already
controlling it*. **464.2.c.2** — *"The Defender is the player who did not apply the Contested
status"* — and **323.11.a** — *"If as a result of the removal of Contested status there are Units
located at an uncontested Battlefield that their controller does not control, their controller applies
Contested status to that Battlefield"* — together mean a player with units at a battlefield they do not
control becomes the **Attacker**, not the Defender. So a Defender always already controls the
battlefield, and 466.5 does nothing for them.

#118's C1 claims *"the Defender takes zero damage, permanently steals the attacking unit into their own
base, wins the Combat, **and Conquers the Battlefield**."* The last clause is wrong. What the line
actually buys is the negative — no damage, garrison intact, Control kept — and the point arrives one
turn later from **315.2.b.2** (*"The Turn Player Holds all Battlefields they Control"*) and
**469.2** (*"Hold: A player maintains Control of a Battlefield they did not yet Score this turn during
their Beginning Phase"*).

### 1.5 The attacker-side half is a duplicate and was dropped

Played by the turn player on their own attack, the same spell empties the **defending** side and 466.5
*does* then Establish Control with a Conquer. But that is card for card the rule chain of
**`sinister-poro-attack-evacuate`** (464.2.e → 465.1 fails → 466.3.a → 466.5.d), already `verified`,
which does it with `UNL-137 Sinister Poro` for **1 Energy and no spell at all**. Nothing was added
there; the new entry is the defender-side half only.

### 1.6 The mana, which #118 never priced

**167** — *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of
each player's turn."* You start the opponent's Main Phase with an empty pool, so E8 + 3 Chaos Power
must be built **inside their Showdown**. Both rune abilities carry the keyword: **164.2.a**
*"[E]: [Reaction] — Add [1]"* and **164.2.b** *"Recycle this: [Reaction] — Add [C]"*, and **813.1.b**
*"Reaction grants the corresponding card or effect all abilities and permissions of Action."*

164.2.b has **no exhaust in its cost**, so the same rune pays twice: **eight ready runes** give the 8
Energy, and three of those eight, if Chaos, then recycle for the 3 Power (**161.2.b**: the recycled
rune goes to the Rune Deck, not the Main Deck). The real price is therefore *eight runes left
unexhausted through your own turn* — i.e. you spent nothing on your own turn — and **315.1.b** readies
the rest only at your next Awakening.

### 1.7 The alternates (#118's OGS-012 / VEN-106 / OGN-172): same mechanism, `notable`, not new entries

| code | name | domain | cost | effect | ready runes needed |
|---|---|---|---|---|---|
| `OGN-172` | Rebuke | Chaos | E2 P2 | *"Return a unit at a battlefield to its owner's hand."* | 2 (both Chaos) |
| `VEN-106` | Wind and Ghosts | Chaos | E3 P1 | banish at 3 Might or less, otherwise bounce to hand | 3 (one Chaos) |
| `OGS-012` | Blast of Power | Order | E6 P1 | *"Kill a unit at a battlefield."* | 6 (one Order) |
| `OGN-203` | Possession | Chaos | E8 P3 | take control **and** recall | 8 (three Chaos) |

All four are the same window and the same rule chain, so they are one entry with a priced `notable`,
not four rows. Rebuke is the cheapest complete line. `OGS-012` is a different deck: **103.1.b.1** binds
it to an Order legend. Possession heads the entry because of the half no other member has — **191.1 /
191.3** make you the Controller and **455 / 456** send it to *your* base, which the card's own reminder
prints: *"Send it to your base. This isn't a move."* Ban check: none of the four carries a `[BANNED`
marker in `data/corpus_flat.txt`.

### 1.8 The 18-card family for `data/synergies.json` — recorded, NOT written

This session does not own `data/synergies.json`. For whoever does: the shape is an **`[Action]` spell
that removes a unit at a battlefield**, and #118 measured 18 members among the 55 uncatalogued
`[Action]` cards — `OGN-005 OGN-009 OGN-024 OGN-172 OGN-203 OGN-260 OGS-003 OGS-012 SFD-017 UNL-007
UNL-014 UNL-204 VEN-008 VEN-010 VEN-015 VEN-106`, plus the mutual-damage spells `OGN-128 SFD-114
OGS-008`. The `basis.rules` a predicate can stand on: **806.1.b** (the permission), **464.2.f.1 /
464.2.g** (the window is Open), **465.1** (no damage once one side is empty), **466.3.a** (the win) and
**466.5 / 466.5.d** (Control and the Conquer, attacker side only — see §1.4). Two members are already
banned in both formats and must be excluded like `stealthy-pursuer-move-triggers` was: `OGN-168 Fight
or Flight` and `SFD-122 Called Shot`.

### 1.9 One point checked and dismissed without filing a reading

**323.8** — *"6. Mark a Showdown as Staged at each Battlefield that Contested was applied to"* — carries
no state condition, so read literally a Cleanup during an ongoing Combat would re-mark a *staged*
Showdown there, and 466.5's *"If no Showdown or Combat is staged at this location"* would never be
satisfied. That reading makes **466.5 and 466.5.d dead letter for every combat in the game** (the
rule-002 argument used to settle R28), **461** already says an initiated Combat is not Staged, and
**466.5.a** clears the Contested status that **323.8.a** keys on. The catalogue already stands on this
at `charm-evacuate-conquer` and `sinister-poro-attack-evacuate`. No reading filed — per the project
rule, a legal ordering and an existing settled reading beat a new question for the user.

---

## 2. #118 Finding E — the "or an ally" half of `SFD-201` and `UNL-193`

> `SFD-201 | Chem-Baroness | Legend | Mind/Order | When you or an ally hold, you may exhaust me to play
> a Gold gear token exhausted. …`
> `UNL-193 | Gloomist | Legend | Calm/Chaos | When you or an ally hold, you may exhaust me to draw 1.`

**2v2 is §489, not §486** — #118 Finding A is right, and the section was opened:

- **489.1** *"4 Players"* · **489.2** *"2v2 — 2 opponents each, 1 teammate"*
- **489.3** *"Victory Score: 11"*, against **194.3** *"The Victory Score is 8 points by default"* and
  **194.3.a** *"Some game modes or card effects may alter the Victory Score."*
- **489.5.c.1** — turn order alternates teams.
- **489.8.c** — *"Control is not shared."* **489.8.d** — *"Points are shared by a team."*
- **489.8.h / 489.8.i** — teammates may not share a Champion Legend or Battlefields.
- **489.8.a** — *"Players may play spells or activate abilities during their Teammate's Turn. In order
  to do so, their Teammate will invite them to play a spell or activate an ability using their own
  Priority."*

### CORRECTION 3 to #118: the ally clause does **not** double the trigger

#118 Finding E says the clause *"fires once on the controller's own Beginning Phase and again on the
ally's, **doubling the frequency** per team round-trip."* It does not. The trigger's cost is *"you may
**exhaust me**"*, and **315.1.b** — *"1. The Turn Player readies all Game Objects they control that are
able to be readied"* — readies your legend only in **your** Awakening. Nothing readies it in between.
So across a full team round-trip you get **exactly one** activation, whichever Hold you spend it on.

What the clause actually buys, measured:
1. **A choice of window.** Decline your own Hold in your Beginning Phase and take the ally's later in
   the round, e.g. to have the Gold or the card at a moment that matters.
2. **Insurance.** **469.2** defines Hold on a battlefield *you control*; with no battlefield of your own
   you never Hold, and the ally clause is the only thing that keeps the legend live that round.

Both are real and both are small. Added as a `notable` to the three entries that already own these
legends — `renata-time-warp-ekko-refresh` (SFD-201), `vex-apathetic-gloomist-play-tax` and
`conscription-signpost-empty-garrison` (UNL-193) — with no change to class, quantities or steps
(`test/matcher.test.ts` pins quantities). In the Duel (**485**) those entries are written for, the
clause is dead text.

Two companions from the same section, recorded on the entries: **489.8.b** — *"Battlefields controlled
during the Beginning Phase of a player's turn by that player's teammate are disqualified from being
scored by that Team, that turn"* — and its mirror **469.1.a**.

---

## 3. #118 C3 — the ally-draw pair: **REFUTED**, no entry

> `SFD-217 | Seat of Power | Battlefield | Colorless | When you conquer here, draw 1 for each other
> battlefield you or allies control..`
> `UNL-015 | Right of Conquest | Spell | Fury | E3 P1 | Draw 1, then draw 1 for each battlefield you or
> allies control.`

The numbers, from the rules rather than from the issue:

- **489.4** *"Battlefield Count: 3"* — so in 2v2, "you or allies control" tops out at **3** and
  Seat of Power's "each **other**" at **2**.
- **485.4** *"Battlefield Count: 2"* in the Duel — so Right of Conquest is at most **draw 3** for
  E3 + 1 Fury Power, and Seat of Power at most **draw 1** per Conquer.

Refuted on four independent grounds, any one of which is enough:

1. **No repeat.** `UNL-015` is a one-shot spell; **103.2.b** caps it at 3 copies and nothing recurs it.
   `SFD-217` repeats only once per turn per battlefield (**470** — *"A player may only Score, from
   either method, once per Battlefield per turn"*).
2. **No conversion.** Nothing in the catalogue turns raw cards into points; the draw lens (#59) already
   established that inside a loop shell an unmatched draw is **431.1.a**, a *point for the opponent*,
   not a gain.
3. **Its own ceiling is its own win condition.** Controlling both battlefields in a Duel, or all three
   in 2v2, is the board state that was already winning; the card pays most when you need it least.
4. **The 2v2 half is unrepresentable.** `matchDeck(deck, …)` takes one `Deck` and **489.8** gives
   teammates two independent decks with two independent Domain Identities (**103.1.b** is per deck).
   The site cannot see the ally's board, so "allies control" can never be computed — #118 Finding C,
   which stands as written and is an architectural fork, not a data gap.

`SFD-217` is additionally not plannable: **485.5** and **489.5.a** both say *"randomly selects"*, so a
battlefield-dependent line is never certain to be on the board.

Recorded as a lead, not an entry: paired with a repeatable no-damage Conquer
(`charm-evacuate-conquer`, `sinister-poro-attack-evacuate`, `conscription-signpost-empty-garrison`),
`SFD-217` is one extra card per Conquer in a Duel. That is a synergy shape, not a combo.

---

## 4. #119 finding 6 — `UNL-141 Evelynn, Entrancing` amends `faefolk-challenger-forced-attacker`

> `UNL-141 | Evelynn, Entrancing | Unit | Chaos | E2 M2 | [Hidden] … [Backline] … When you play me from
> face down on your turn, you may move an enemy unit at a different location to my battlefield.`

The mechanism is `UNL-112 Irresistible Faefolk`'s, which the entry already verifies: drag an enemy body
onto a battlefield you control, **190.3.a.1** makes *that unit's controller* apply Contested, and
**464.2.c.1** makes them the Attacker on **your** turn.

What the walk had to check, because it is a `[Hidden]` play effect and not a move trigger:

- **811.1.d.2** — targets of a hidden play effect *"must be chosen from among options at that
  battlefield, **unless the ability explicitly restricts targeting in a way that makes this
  impossible**."* Evelynn says *"at a **different** location"*, which is exactly the Tideturner worked
  example printed under that rule (*"its target may be chosen freely from among the available
  options"*). Confirmed: the enemy unit is chosen freely.
- **811.1.b** — she hides *"at a battlefield you control"* for one rainbow Power and, *"beginning on the
  next turn"*, is played *"ignoring its base cost"*; **811.1.d.1** — *"A hidden permanent must be played
  to that battlefield."*
- Therefore **Evelynn herself never applies Contested**: 190.3.a.1 requires *"that Unit's controller does
  not already control that battlefield"*, and 811.1.b already required that you do. Only the dragged
  enemy contests. This is the same clean split the Faefolk line has.
- **826.3** — *"[Backline] … I must be assigned lethal damage after any other unit with the same
  controller as me that does not have [Backline] during the Combat Damage step"* — so she survives the
  combat she forces while a cheaper body absorbs it.

Three differences from the Faefolk, all recorded in the `notable`: no Standard Move is needed, so
**144.2**'s exhaust and the **143.4 / 315.1.b** turn of delay before that move are skipped (the hide
still costs a turn, and the drag is *"on your turn"* only); `[Backline]`; and she is **mono-Chaos**
against the entry's mono-Body pair, so **103.1.b.1** makes her a different deck, not a swap.

She is **not** added to `uses`: per the project rule, `uses` is what the matcher and `planDeck` price,
and adding a sixth card would force the matcher to require her. Ban check: `UNL-141` carries no
`[BANNED` marker.

---

## 5. #140 — one unapplied citation fix

`kharox-sanction-burn`'s `terminatesIn` still credited **431.2.c** for the trash recycle that its own
`prerequisites.notable` had already corrected. **431.2** is a sequence, opened in full:

> **431.2.a** *"Performs as much of the prescribed action as possible."*
> **431.2.b** *"Recycles their trash into their Main Deck."*
> **431.2.c** *"Chooses an opponent to gain 1 point."*
> **431.2.d** *"Completes the remainder of the action that caused them to burn out."*

The recycle is **431.2.b**. Citation only; the substance (milling is not a kill) stands, and neither
class nor quantity moved.

---

## Summary

| # | item | verdict |
|---|---|---|
| 1 | `OGN-203 Possession`, defender side | **new ENGINE `possession-action-defender-flip`, verified** — with 2 corrections to #118 (no Conquer; 465.3 is not an else-branch) |
| 1b | `OGN-172` / `VEN-106` / `OGS-012` | alternatives in `notable`, priced; not new entries |
| 1c | attacker-side use of the same spell | **dropped as a duplicate** of `sinister-poro-attack-evacuate` |
| 1d | 18-card `[Action]`-removal family | recorded here for the synergies owner; **not written** |
| 2 | "or an ally hold" on `SFD-201` / `UNL-193` | `notable` on 3 entries — with a 3rd correction to #118: it does **not** double the trigger |
| 3 | `SFD-217` / `UNL-015` ally draw | **refuted**, 4 independent grounds |
| 4 | `UNL-141 Evelynn, Entrancing` | `notable` on `faefolk-challenger-forced-attacker` — **closes #119** |
| 5 | `kharox-sanction-burn` 431.2.c → 431.2.b | fixed — **closes #140** |

**Nothing changed class or quantity.** Catalogue: 239 entries, all `verified`.
