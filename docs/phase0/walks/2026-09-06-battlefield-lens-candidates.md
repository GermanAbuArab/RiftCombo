# Hand walks — the battlefield lens (issue #102)

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16
**Result: 2 entries HOLD (both rewritten from the candidate), 1 candidate REFUTED as a combo,
1 refutation of #102 CONFIRMED.** Both surviving entries are **ENGINE**; neither was pushed to a
higher class and neither turned out to be INFINITE.

| #102 candidate | verdict | entry |
|---|---|---|
| 1. `amateur-recital-empty-garrison-denial` | **HOLDS, rewritten** — the issue never says *when* Control changes hands, and its "any battlefield" framing hides that the denial half nets the opponent zero points | `amateur-recital-free-evacuation` |
| 2. `altar-unity-pridestalker-freeplay` | **HOLDS, rewritten with a different partner** — Pridestalker is real but is the weakest of the four payoffs that can collect the trigger; the free **body** is the product, not the +1 Might | `altar-unity-industrialist-recruit-faucet` |
| 3. `startipped-peak-rune-ramp` | **REFUTED as a combo.** Its arithmetic is wrong (one turn, not two — and for the payoff it names, **zero** turns), and the shape already shipped as a synergy rule on 2026-09-06 (#105) | — |
| 4. `navori-fighting-pit-buff-cap` | **CONFIRMED refuted**, 702.3 / 702.3.a read and quoted | — |

---

## Step 2 first, in bulk: every citation opened

The 2026-09-04 citation audit found three entries citing a rule that said the opposite of the claim, so
every rule number these entries cite was pulled out of `data/Riftbound-Core-Rules-2026-07-16.txt` and
read before anything was authored. **47 distinct citations.** Three of #102's paraphrases did not
survive contact with the text:

| what #102 wrote | what the rule actually says |
|---|---|
| "**466.5.b / 466.5.d** (o 348.2.a / 348.2.a.1, según la vía): cuando tu propia unidad camina ahí después … establecer Control ahí *Results in a Conquer*" | The two are **not** alternative routes to the same event. 466.5 is a step of **the Combat Resolution Step** — *"1. If no Showdown or Combat is staged at this location, the player with Units remaining here Establishes Control"* — and this line never opens a Combat, so 466.5 is never reached. The route is 348.2.a → 348.2.a.1 **only**, through a Showdown that 323.8 staged and 323.12 opened. The entry cites the Showdown chain and does not cite 466.5. |
| "**315.2.b.2**: el Hold corre una vez por Beginning Phase" | 315.2.b.2 is *"1. The Turn Player Holds all Battlefields they Control."* The **once-per-turn cap is 470** (*"A player may only Score, from either method, once per Battlefield per turn"*) and the Hold's own definition is **469.2**. 315.2.b.2 is where it happens, not why it is capped. Both entries cite all three. |
| "12 runas … 6 turnos a 2/turno y sólo 4 turnos a 3/turno … DOS turnos antes" | The Peak is not online on turn 1 — a battlefield you bring starts uncontrolled (190.1) and has to be conquered. Worked below: **one** turn, and for the only payoff #102 names, **none**. |

Ban check, same pass: all **19 distinct cards** named across the four candidates, their payoff tables
and their alternative tables were grepped for the `[BANNED` marker in `data/corpus_flat.txt`.
**None is banned or restricted in any format.** The one banned card that matters to this lens appears
only as evidence and in no entry: `OGN-168 Fight or Flight`, quoted below.

Card text: every line below was grepped verbatim out of `data/corpus_flat.txt`. All 19 matched #102's
transcription character for character.

---

## The turn structure this whole lens turns on, quoted

```
315.1.    Awaken Phase
315.1.b.  1. The Turn Player readies all Game Objects they control that are able to be readied.
315.2.    Beginning Phase
315.2.a.  Beginning Step
315.2.b.  Scoring Step
315.2.b.2. 1. The Turn Player Holds all Battlefields they Control.
315.3.    Channel Phase
315.3.b.  1. The Turn Player channels 2 runes from their Rune Deck.
315.4.    Draw Phase
316.      Main Phase
316.3.    1. Each player's Rune Pool empties. Any unspent Energy and Power are lost.
```

Three consequences that decide three of the four candidates:

1. **The Hold runs before the Channel Phase.** So a Hold trigger with an optional Energy cost cannot
   be paid out of runes you have not channelled yet, and **167** (*"Every player's Rune Pool empties at
   the start of each player's Main Phase and the end of each player's turn"*) means the pool is empty
   coming into the Beginning Phase. This is exactly why #102 refuses Blood Rose, and it is right.
2. **The state during the Beginning Phase, with the chain empty, is Neutral Open.** **310.1**:
   *"Neutral Open: There is no Showdown or Combat in progress and no Chain exists."* It is not the
   Main Phase, so **312.2.a** gives nobody Priority — but the *state* is what **323.6** asks about, and
   323.6 asks for an Open State, not for Priority. This is the load-bearing step of candidate 1 and
   #102 never states it.
3. **A rune channelled at the Hold stays exhausted for that whole turn**, because Awaken (315.1) has
   already happened. This is what kills candidate 3's arithmetic.

---

## Candidate 1 — `UNL-207 Amateur Recital`

**Verbatim** (`data/corpus_flat.txt:756`):

> `UNL-207 | Amateur Recital | Battlefield | Colorless | - | When you hold here, you may move a unit at a battlefield to its base.`

### 1a. "a unit" really is unqualified — and the pool proves it twice

#102 argues from the pool's own convention (Star Spring says *"another unit **you control**"*, Irresistible
Faefolk says *"an **enemy** unit"*). Both quotes check out:

> `UNL-215 | Star Spring | ... | The first time a player plays a non-token unit here each turn, they may move another unit they control here to its base.`
> `UNL-112 | Irresistible Faefolk | ... | When I move to a battlefield, you may move an enemy unit to that battlefield.`

The walk adds a third and much harder piece of evidence, which #102 does not have: **the pool contains
a spell with Amateur Recital's sentence, word for word, and Riot banned it.**

> `OGN-168 | Fight or Flight | Spell | Chaos | E2 | [BANNED constructed:banned, 2v2:banned] [Hidden] ... [Action] ... Move a unit from a battlefield to its base.`

Fight or Flight is a *removal/denial* spell — that is what it is banned for — and it says "a unit" with
no owner qualifier, the same as Amateur Recital. The reading that "a unit" reaches enemy units is not
an inference from silence; it is the reading under which the pool's only other printing of the sentence
makes sense at all.

### 1b. The order of events, which is what #102 was asked for

The question was: *when is Control of the emptied battlefield established, who has to be standing there,
and does the Conquer score the same turn?* Rule by rule:

1. **Your Beginning Phase, Scoring Step (315.2.b.2).** You Hold Amateur Recital. **469.2** *"Hold: A
   player maintains Control of a Battlefield they did not yet Score this turn during their Beginning
   Phase"*; **471.1** *"The player Gains up to one Point"*. **Point #1.**
2. The Recital's Hold trigger goes on the chain (**383.3.c**: *"Triggered Abilities can be put on the
   Chain during Closed States or Open States on any player's turn"*). While it sits there the state is
   Neutral Closed (**310.2**), and **312.2.c / 312.2.d** hand out Priority, so **813.1.c.1**
   (*"This can be played during Closed States on any player's turn"*) gives the opponent a genuine
   [Reaction] window here. This is the same window #62 found for `[Temporary]`.
3. It resolves: **the opponent's single defender is moved to its base.** This is a Move by effect —
   **449** *"Spells, Abilities, or other effects may cause a Move to occur"* — and **not** a Recall:
   **455** *"A Recall is when a Permanent is relocated from anywhere to its Base **without it being a
   Move**."* The card says *move*, so 456.1 does not apply and "when I move" abilities on the evacuated
   unit do fire. **420.3.a** puts the exhaust cost on the *Standard* Move only, so the unit goes home
   for free and un-exhausted.
4. **453** *"When a Move action is complete, perform a Cleanup"* — held until the chain item finishes
   (**321**, **321.1**). The chain is then empty, no Combat, no Showdown: Neutral Open (310.1). So
   **323.6** fires: *"4. Players lose control of any controlled Battlefields without their Units
   occupying them if the turn is in an Open State and there is no Showdown or Combat ongoing there."*
   **The opponent loses Control. Nobody gains it.** The battlefield is now unoccupied and uncontrolled,
   which is exactly **170.11.c** *"Battlefields can be 'open.' This means they are unoccupied and
   uncontrolled."*
5. **You still need a body, and it has to walk in during your Main Phase.** Emptying the battlefield
   gives you nothing by itself. A ready unit at your base Standard-Moves in — **144.4.a** *"Units may
   move from their Base to a Battlefield"*, cost **420.3.a** *"The Cost is Exhausting one or more
   Units"*. **450** / **190.3.a.1** apply Contested.
6. The next Cleanup: **323.8** stages a Showdown; **323.9** stages **no** Combat, because it requires
   *"Units present controlled by opposing players"* and there are none; **323.12** opens the Showdown
   (Neutral Open State, Main Phase). **345** gives you Focus; **348** closes it when everyone passes.
7. **348.2.a** *"If only one player's Units remain at the Battlefield, and if that player does not
   already Control the Battlefield, that player establishes Control"* → **348.2.a.1** *"This results in
   a Conquer if that player has not yet scored that Battlefield this turn."* You have not. **469.1**
   makes a Conquer a Score, **471.1** gives the point. **Point #2, same turn.**

**So: Control changes hands twice, in two different phases. Nobody gains control at the Hold — the
opponent merely loses it. You must spend a ready body and its Standard Move in your Main Phase, and the
Conquer does score that same turn.** 470 is respected: two different battlefields, one Score each.

### 1c. The arithmetic, with the quantities the entry declares

**2 points per turn**, from a board of exactly one Amateur Recital you control and exactly one enemy
unit garrisoning the other battlefield. Cost per turn: **0 Energy, 0 Power, 0 cards** for the
evacuation, and one ready body plus its exhaust for the walk-in. A Duel has two battlefields (485.4),
so 2 is the ceiling of any turn and this line reaches it without ever dealing or taking combat damage.

### 1d. Four corrections to #102's own framing

- **"Vacía la guarnición de CUALQUIER battlefield … y eso conquista sin combate."** It moves **one**
  unit. Against a garrison of two or more, 323.6 does not fire at all and the line does nothing. This is
  the same ceiling `charm-evacuate-conquer` declares and #102 does not.
- **The denial half nets the opponent zero points, taken alone.** If you empty their battlefield and do
  *not* walk in, they lose their Hold (469.2, they no longer control it at their Beginning Phase) but
  they walk back in on their own turn and **348.2.a.1 gives them a Conquer** — a Score either way. The
  value is not the denial; it is that **you** take the free Conquer first, in the window between.
- **You have to control the Recital, and it is your own battlefield.** 190.1 *"Control is established
  over Battlefields through the course of play"* — you start with no Control of it, and 190.6.d's second
  sentence (*"If the battlefield has no Controller, 'you' refers to no one, and all such instructions
  are ignored"*) means the trigger does not exist until you take it. So the line needs **two** bodies:
  one holding the Recital, one to walk into theirs.
- **[Deflect] taxes it, and the tax is payable.** The moved unit is *chosen by the ability's
  controller*, so 355.10 makes it a target (355.10.d's programmatic-selection exemption does **not**
  apply — contrast `renekton-stare-down-evacuate`, whose victims are selected by a Might criterion).
  **809.1.c** / **809.1.d** therefore price it, at 1 Power per Deflect Value in any domain
  (809.1.c.1). The Rune Pool is empty in the Beginning Phase (167), but **164.2.b** (*"Recycle this:
  [Reaction] — Add [C]"*) carries no exhaust and **429.3** lets a Reaction Add be made *"at any time that
  spells or abilities require resources be paid"*, in the Closed State the trigger itself opened — the
  same mechanism `power-nexus-sentinel` uses to pay in the Beginning Phase. So a [Deflect] garrison
  costs rune recycles, not the line. The entry is written under this, the **stricter** reading; the
  looser one (809.1.c prices an additional cost *"to play"*, and a Triggered Ability is never played)
  would make it free, and nothing in the entry depends on which is right, so no reading is filed.

### 1e. Why it is a separate entry from `charm-evacuate-conquer`

Same destination, different machine, and the difference is not cosmetic:

| | `charm-evacuate-conquer` | `amateur-recital-free-evacuation` |
|---|---|---|
| cost | 1 Energy + 1 Calm Power, from hand | 0, forever |
| copies | 3 (103.2.b) | 1 battlefield, permanent |
| ordering | **must** evacuate before entering, or 323.9 + 323.13 stage *and open* the Combat in one Cleanup, and 155 then bars the spell | the turn structure does it: the Hold is in the Beginning Phase, the walk-in in the Main Phase |
| domain | Calm | any legend (Colorless) |
| when | any Main Phase | once per turn, at the Hold, and only if you control the Recital |

The Recital cannot be aimed at will and cannot be drawn — that is what it pays for being free.

---

## Candidate 2 — `OGN-275 Altar to Unity`

**Verbatim** (`data/corpus_flat.txt:281`):

> `OGN-275 | Altar to Unity | Battlefield | Colorless | - | When you hold here, play a 1 :rb_might: Recruit unit token in your base.`

### 2a. The trigger really is a "play a unit" event

**350.2** *"Tokens are not cards, but can still be Played."* **185.2.a** *"Tokens can be played by their
owner if their card type is played, following all the applicable steps for playing a card."* So the
Recruit fires every "when you play a unit" trigger and **no** "played a card" trigger — the positive and
negative halves of the #98 lens, both live in one card.

### 2b. The exhaustive payoff table, which #102 does not have

Every trigger in the pool that fires on **another** unit being played (`grep -i "when you play a
unit\|when you play another\|when a friendly unit is played\|whenever you play\|when you play your\|when
you play a token"`), against the Beginning-Phase Hold:

| card | text | fires at the Hold? |
|---|---|---|
| `UNL-183 Pridestalker` (Legend, Fury/Body) | "When you play a unit, give a unit +1 Might this turn." | **yes**, free |
| `VEN-121 Reluctant Leader` (Unit, Order, E4 P1 M3) | "When you play another unit, give me +2 Might this turn." | **yes**, free, and twice the size |
| `UNL-058 Lillia, Protector of Dreams` (Unit, Calm, E5 M4) | "When you play a token unit, give me +1 Might this turn." | **yes**, free |
| `OGN-139 Cithria of Cloudfield` (Unit, Body, E2 M1) | "When you play another unit, buff me." | **once**, then never: **702.3** *"There can only be one Buff on a Unit at a time"*, **702.3.a** *"If a Buff is added … on a Unit that already has a Buff, it is not placed instead."* Same rule that refutes candidate 4. |
| `UNL-109 Blood Rose` (Gear, Body, E1) | "When you play a unit, you may pay 1 Energy to gain 1 XP." | **no** — 315.3 has not run and 167 emptied the pool. #102's reasoning here is correct and is the reason it rejected Blood Rose. |
| `UNL-011 Fresh Beans` (Gear, Fury, E2) | "When you play a unit **during a showdown**…" | **no** — the Beginning Phase is not a Showdown |
| `VEN-145 Curator of the Sands` (Legend, Calm/Mind) | "…with Energy cost 7 or more" | **no** — a token has no printed cost, and 206 reads the printed one |
| `SFD-166 Rally the Troops` (Spell, Order, E2) | "When a friendly unit is played **this turn**…" | **no** — 155 confines it to your Main Phase, and "this turn" is gone by the next Beginning Phase |
| `OGN-027 Darius, Trifarian` | "When you play your second **card** in a turn…" | **no** — **185** *"Tokens are not cards."* |
| `VEN-044 Astral Heron` | "When you play your first **card** each turn…" | **no** — same, 185 |

### 2c. Why the entry is not the one #102 wrote

#102 picked Pridestalker, the **smallest** of the three that fire, and framed the value as the trigger.
Two things move the entry:

- **Reluctant Leader is strictly bigger** in the same slot (+2 vs +1, free, no cost clause) and is
  **Order**, which matters for the next point.
- **The product is the body, not the Might.** The Recruit is a real 1-Might unit at your base, every
  turn, for zero cards — and #48 already established that the bottleneck of every token line in this
  game is *walking a token from the base to a battlefield*. **143.4** *"Units enter the Board
  exhausted"* means the Recruit is next turn's body… **unless `SFD-171 Renata Glasc, Industrialist`**
  (`Unit | Order | E4 P1 M4 | Your tokens enter ready.`) is on the board, which R25 = A already ruled
  beats a printed entry state, and beats the 143.4 default a fortiori. Then the Recruit is born **ready
  in the Beginning Phase** and can Standard-Move to a battlefield (144.4.a, cost 420.3.a) in the same
  Main Phase.

Renata is Order; Pridestalker is a **Fury/Body legend**, so **103.1.b.1 / 103.1.b.2** keep them out of
each other's decks. The two halves of #102's own candidate cannot be combined — you pick the shell. The
Order shell gets a free ready body every turn *and* the bigger payoff (Reluctant Leader); the
Pridestalker shell gets +1 Might and a body that arrives a turn late. The entry is the Order shell, and
this paragraph is why.

### 2d. What it is not

It is not a second `guards-industrialist-ready-soldiers`: that one is 3 copies of a spell, capped by
103.2.b, and this one is a battlefield that never runs out. It is not `zed-clone-eye-recruits` either —
`SFD-153 Eye of the Herald` makes its Recruit *"here"* (a battlefield) and needs a move to fire; this
one makes it at the base and needs nothing. And it scores nothing on its own: no point, no [Temporary],
no loop. **ENGINE, and only ENGINE.**

---

## Candidate 3 — `OGN-288 Startipped Peak` — REFUTED as a combo

**Verbatim:**

> `OGN-288 | Startipped Peak | Battlefield | Colorless | - | When you hold here, you may channel 1 rune exhausted.`
> `VEN-032 | Frostcoat Mother | Unit | Calm | E3 M3 | [Empower] :rb_energy_12:. This ability costs :rb_energy_1: less for each rune you control. …`
> `VEN-050 | Grumpy Rockbear | Unit | Mind | E4 M4 | [Empower] :rb_energy_12:. This ability costs :rb_energy_1: less for each rune you control. …`

The mechanism is real and every rule #102 cites checks out (**430.1**, **430.2** — whose worked example
*is* the phrase *"Channel 1 rune exhausted"* — **430.2.a**, **430.3**, **161.2.a** *"Exactly 12 Rune
cards"*, **315.3.b**, **315.3.b.1**). **The ledger is what refutes it.**

### 3a. The Peak is not online until turn 3

190.1: a battlefield you bring starts uncontrolled. To Hold it you must first Conquer it, and 143.4
means the unit you play on turn 1 enters exhausted and cannot move until Awaken on turn 2. So: turn 1
play a body, turn 2 walk it in and Conquer, turn 3 is the **first** Beginning Phase that Holds the Peak.

### 3b. Turns to 12 runes

Let *N* be the turn number, on the play. Baseline **R = 2N** (315.3.b). With the Peak from turn 3,
**R = 2N + (N − 2) = 3N − 2**, capped at 12 by 161.2.a.

| turn | without | with |
|---|---|---|
| 3 | 6 | 7 |
| 4 | 8 | 10 |
| 5 | 10 | **12** |
| 6 | **12** | 12 |

**One turn earlier, not two.** #102's "6 vs 4" divides 12 by 3 and forgets that the Peak is not held
until turn 3.

### 3c. For the payoff it names, the answer is *zero* turns — and this is the refutation

The Empower's discount is **1 Energy per rune you control**, and a rune is worth **1 Energy**. So an
extra rune moves the cost and the budget by the same amount. Worse: the Peak channels its rune
**exhausted**, and Awaken (315.1) has already run for that turn, so on the turn it lands it contributes
its discount and **no Energy**.

- Without the Peak, at *R* runes: Energy = *R*, cost = 12 − *R*. Affordable when *R* ≥ 12 − *R*, i.e.
  **R ≥ 6** → **turn 3** (R = 6).
- With the Peak, at *R* runes: Energy = *R* − 1 (this turn's Peak rune is exhausted), cost = 12 − *R*.
  Affordable when *R* − 1 ≥ 12 − *R*, i.e. **R ≥ 7** → turn 3 again (R = 3·3 − 2 = 7).

**Same turn, in every branch.** The Peak's real product is +1 Energy of headroom per rune it
front-loads — which is what any rune is worth. It is a generic 50% mana ramp, not a combo with a
payoff, and it costs you the Conquer of the battlefield and the 1-in-3 random selection (485.5).

### 3d. And the shape already shipped, in the right file

`data/synergies.json` already carries a rule with this exact id, `startipped-peak-rune-ramp`, added the
same day by #105 with the same anchor (OGN-288) and the same two matches. A *pattern* — verified rule,
text-matched instances — is what the synergy layer is for; putting it in `combos.json` would put an
unwalked pairing in the file whose whole value is that every row was walked. **Refuted as a combo
entry, correctly filed as a synergy.**

> **Handed back to the orchestrator, because `data/synergies.json` is not this session's file:** that
> synergy rule's `why` says *"12 runes take 6 turns at 2/turn and only 4 at 3/turn, two turns sooner"*
> and *"the free Empower itself lands two turns early"*. Both numbers are wrong by §3b and §3c above.
> The rule itself (the Peak channels a third rune; two cards in the pool read a rune count) stands; only
> the arithmetic in its `why` needs the correction.

---

## Candidate 4 — `OGN-283 Navori Fighting Pit` — refutation CONFIRMED

**Verbatim:**

> `OGN-283 | Navori Fighting Pit | Battlefield | Colorless | - | When you hold here, buff a unit here. (If it doesn't have a buff, it gets a +1 :rb_might: buff.)`

**702** *"Buffs are counters placed on Units."* **703** *"Each Buff individually contributes +1 Might to
a Unit."* **702.3** *"There can only be one Buff on a Unit at a time."* **702.3.a** *"If a Buff is
added, or instructed to be added, on a Unit that already has a Buff, it is not placed instead."*

The card's own reminder text is a restatement of 702.3.a. Held on the same unit turn after turn it
plants at +1 Might forever. Same mechanism as the Cithria case already in `CLAUDE.md` (#89).
**#102 is right and this is not an entry.**

The walk adds the distinction that makes the *other* half of this lens work: **Navori says "buff",
which is the counter of 702; Pridestalker, Reluctant Leader and Lillia say "+N Might this turn", which
is a plain duration-limited modifier and is not a Buff.** 702.3 caps the first family and does not
touch the second. #102 asserts this in one clause without citing 702/703; it is correct, and it is why
candidate 2 survives while candidate 4 does not.

---

## Two negatives from #102, re-checked

- **No sibling of Reckoner's Arena.** `grep "| Battlefield |" data/corpus_flat.txt` gives exactly **66**
  lines; grepping those for `-i activate` returns two, and only one is the mechanism: OGN-286
  *"When you hold here, activate the conquer effects of units here."* The other, VEN-161 Piltovan Forge,
  discounts *activated abilities* and re-activates nothing. **Confirmed: OGN-286 is unique in the pool.**
- **No battlefield carries [Reaction].** `-i reaction` over the same 66 lines returns exactly **one**,
  and it is the opposite of the claim's counterexample: `VEN-160 Mystic Vortex` — *"During showdowns
  here, cards with [Reaction] cost 1 more to play"* — **taxes** the keyword, it does not carry it. So no
  battlefield has it. **Confirmed**, and it extends #100's "nothing protects your own Hold" to this card
  type: the only thing that reaches a Hold is a [Reaction] played in the Closed State the trigger opens
  (312.2.c/d + 813.1.c.1), and a battlefield is never played at all, let alone as a Reaction.

---

## Trap check, one by one, against both surviving entries

1. **Entering an empty battlefield is not an attack.** `amateur-recital-free-evacuation` never stages a
   Combat (323.9 needs units of opposing players), so no Attacker designation is ever handed out
   (383.4.e, 461, 807.1.d) and the entry claims no `[Assault]` or "when I attack" trigger.
2. **Energy added in Awaken or the Beginning Phase is lost at 316.3 / 167.** Neither entry banks any.
   It is the reason candidate 2 rejects Blood Rose, and the reason a [Deflect] tax on candidate 1 has to
   be made at Reaction speed inside the trigger's own Closed State (429.3, 164.2.b) rather than held.
3. **[Repeat] gives no re-exhaust window (429.3, R21) and 820.1.c.3 caps it at one.** Neither entry uses
   [Repeat].
4. **[Temporary] tokens die before Scoring (816.1.b).** The Recruit token is not [Temporary]; nothing in
   either entry is.
5. **A recycled rune goes to the Rune Deck (161.2.b).** Cited only in the candidate-3 refutation, as the
   reason the Peak's 12 cannot be refilled.
6. **A token never reaches the trash (185, 186.1, 416.1).** Neither entry recycles a token or feeds a
   Recycle cost with one.
7. **A heal/exhaust/recall shield erases a Deathknell (808.1.d.1); a Recall goes to the base and
   switches off "While I'm at a battlefield" (455).** Amateur Recital's move is explicitly **not** a
   Recall (455 requires *"without it being a Move"*), so this trap does not fire — but the evacuated
   unit *does* end up at its base, so any "While I'm at a battlefield" text it carries goes off, which is
   part of the denial and is written into the entry.
8. **A battlefield you bring starts uncontrolled (190.1, 190.6.d).** Both entries say so in their first
   notable, and candidate 3's refutation turns on it.
9. **Only 1 of your 3 battlefields is used, chosen at random in Duel and Skirmish (485.4.a, 485.5,
   487.5, 486.5), and 103.4.c + Tournament Rules 402.1 forbid a second copy by name.** Both entries carry
   the project's standard first notable.

**No new rules reading is filed by this walk.** Every step has a rule, and the one place a reading could
have been opened (does [Deflect] price a Triggered Ability?) is written under the reading that costs the
entry *more*, so the entry stands either way.
