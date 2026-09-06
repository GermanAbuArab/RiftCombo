# Hand walks — the five candidates of the stun lens (issue #61)

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16
**Result: 5 HOLD, all five only after a rewrite. 0 refuted. 0 INFINITE.**

All five are ENGINE, so the bar is *"the mechanism produces what the entry says"*, not *"reaches 8"*.
#61's own S3 (423.1.a.1 + 423.1.a.2) and S4 (no card pays points for a stun) are confirmed below and
neither is re-derived: **no candidate of this lens can be INFINITE, BURST, CHAIN or ALT_WIN.**

## Step 2 first, in bulk: every citation opened

**58 distinct rule numbers** were read in `data/Riftbound-Core-Rules-2026-07-16.txt` before anything
was written. Fifty-four say what the issue says they say. **Four do not**, and they are the reason all
five entries needed a rewrite — they are listed in the next section.

**Ban check, same pass.** All **20 distinct cards** touched by the five candidates were grepped against
the `[BANNED` marker in `data/corpus_flat.txt`. The pool carries exactly 11 marked printings
(OGN-168, OGN-177, OGN-182, OGN-276, OGN-284, OGN-285, OGN-290, OGN-292, OGS-019, SFD-020, SFD-122).
**None of the twenty is among them.**

**The catalogue moved while #61 sat in the queue.** It was written against 117 entries; it is now 198,
and two of its five payoff cards were catalogued in the meantime by the #89 walk:
`leona-zealot-stun-might-collapse` (OGN-079 + OGN-262) and `vex-star-crossed-rebound-stun` (UNL-150).
Candidates 3 and 4 therefore had to be re-scoped to a mechanism the existing entries do not carry, and
both declare the overlap. Neither is a duplicate: see §3 and §4.

---

## Four rules that changed the walk

### A. **308.1 + 308.1.a + 310.3 + 464** — an `[Action]` card DOES reach the opponent's combat

#61's S8 says: *"nueve `[Action]`, cero `[Reaction]`. La velocidad de Reaction entra por `[Hidden]` … o
por `[Ambush]`. Cualquier línea que declare 'stuneo en el turno del rival' tiene que nombrar cuál de
esos dos usa."* **That is wrong, and the rules say so in four places.**

> **308.1** — *"If a Showdown **or Combat** is in progress, the turn is in a **Showdown State**."*
> **308.1.a** — *"Only cards and abilities with the **Action** or Reaction keywords can be played or activated in a Showdown State."*
> **310.3** — *"Showdown Open: A Showdown **or Combat** is in progress and no Chain exists."*
> **806.1.b** — *"Action grants the corresponding card or effect permission to be played or activated during Showdowns, **even when it is not the Controlling player's turn**."*

And the combat structure names the window outright: **464** is titled *"Step 1: The Combat Showdown
Step"*, and **464.2** — *"When Combat opens, it either opens with a Combat Showdown, or the current
Showdown becomes a Combat Showdown."* Focus is handed out inside it (**464.2.d** *"The Attacker gains
Focus"*) and passes on a pass (**347.2.b**), so the defender gets Priority (**312.2.b**) in a state
where `[Action]` is legal.

What `[Hidden]` actually buys is therefore **0 Energy**, not speed. Only a *Closed* State — a chain in
existence — is `[Reaction]`-only (**309.1.a**). This is the first time 308.1 / 308.1.a / 310.3 have
been cited in this project: `grep -o '308\.1' data/combos.json` returned nothing and `CLAUDE.md` has no
hit either.

### B. **477.3.b** — Leona, Zealot's `-8` is a passive ability, so it does **not** snapshot

> **477.3.b** — *"When an arithmetic effect **from a source that is not a passive ability** has a limitation that applies, it is limited at the time of its application, and is 'remembered' at that limited level for the duration of its effect. This process is called 'snapshotting.'"*
> its **second worked example**: *"A unit reads 'Units you control here have their Might increased to 5 [M].' **This is a passive ability, so it will not snapshot.**"*

`OGN-079`'s *"Stunned enemy units here have -8 [M], to a minimum of 1 [M]"* is that exact shape. So the
floor is evaluated live, on every body, as it becomes stunned and as it stops being stunned. Without
this rule the `to a minimum of 1` clause could have been read as locked at the first application.

### C. **142.4.b** — the lethal threshold is the *current* Might, with the worked example to prove it

> **142.4.b** — *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit's Might. Example: A unit has 5 [M] and 3 damage marked on it. Frigid Touch is played targeting that unit. When it resolves, the unit's Might becomes 3, and it will have lethal damage marked on it."*
> **465.2.c.2** — *"Reminder: Lethal Damage is non-zero damage equaling or exceeding the Might of a Unit."*

Together with **710** (*"Units on the board are evaluated according to their current Might"*) this is
what `leona-zealot-stun-might-collapse` already stands on. §3 below adds the half that entry does not
carry: what 465.2.c.3 and 465.2.c.4 then do with a battlefield full of 1-Might bodies.

### D. **346.1** — Focus does **not** pass when the chain opened from a trigger

> **346.1** — *"Focus will not pass in this way if the chain opened as a result of a **triggered ability** being added to the chain, nor if it opened as a result of an Add ability being added to the chain."*

This is the timing proof candidate 1 asserted and never gave. Radiant Dawn's buff arrives as a
Triggered Ability; when its chain empties, Focus stays with you, so you play Call to Glory with the
buff already on the board. Without 346.1 the sequence would hand Focus to the opponent between the
buff and the spell that spends it.

---

## Confirmed from #61, verbatim, and not re-derived

| claim | rule, opened |
|---|---|
| no stun engine can be INFINITE | **423.1.a.1** *"A Stunned Unit can not be Stunned again."* — its own worked example is Eclipse Herald — and **423.1.a.2** *"Stunned Units lose the Stunned status during step 3d of the end of turn cleanup."* |
| a stunned body deals nothing | **423.1.b** *"A Stunned Unit does not contribute its might to damage in the combat damage step."* |
| but is **no easier to kill** by itself | **423.1.c** *"A Stunned Unit must still have damage applied to it equal to, or greater than, its full might value to be killed."* (the #89 correction to #61's own wording, already in `CLAUDE.md`) |
| Hidden caps at one card per **controlled** battlefield, from the next turn | **811.1.b**, verbatim as #61 quotes it |
| and its targets are confined to that battlefield | **811.1.d.2**, and **811.1.d.2.a** *"Each target is treated separately and individually"* |
| a hidden card is trashed when the battlefield is lost | **323.7** *"Remove all Hidden cards from all Battlefields that are not controlled by the same player and place them in their owner's Trash."* · **466.5.c** |
| `[Repeat]` is exactly one extra execution | **820.1.b**, **820.1.c.3**, and **820.2.a** lets it pick a different target |
| stun is a Choice | **355.5.a**, whose worked example is literally *"Stun a unit at a battlefield"* |
| no card stuns more than one enemy per resolution | grepped: none of the 29 stun lines contains `all` / `any number of` / `each` |

**A fifth structural fact #61 did not state, and every entry here needs it:** a rune's Energy is a
`[Reaction]` — **164.2.a** *"`[E]`: [Reaction] — Add [1]"*, with **429.2** resolving the Add at once — so
Energy **is** payable on the opponent's turn. It comes out of the runes you did **not** spend on your
own turn (**167** empties the pool at each Main Phase start, **415.3.a** readies them only in your own
Awakening Phase). That is the true price of every defensive stun below, and it is not zero.

---

# 1. `radiant-dawn-stun-buff-free-glory` — HOLDS after a REWRITE

*(#61 filed it as `radiant-dawn-hidden-stun-free-reactions`; the id changed with the mechanism.)*

```
OGN-261 | Radiant Dawn | Legend | Calm/Order | - | When you stun one or more enemy units, buff a
  friendly unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff.) [Tags: Leona]
OGN-207 | Call to Glory | Spell | Order | E3 | [Reaction] (Play any time, even before spells and
  abilities resolve.) As you play this, you may spend a buff as an additional cost. If you do, ignore
  this spell's cost. Give a unit +3 :rb_might: this turn.
OGN-220 | Facebreaker | Spell | Order | E2 | [Hidden] … [Action] … Stun a friendly unit and an enemy
  unit at the same battlefield. (They don't deal combat damage this turn.)
UNL-042 | Back Off | Spell | Calm | E3 | [Hidden] … [Action] … [Stun] a unit. … If you played this
  from your hand, draw 1.
```

**What holds.** The conversion is real and it is the entry's whole claim: **one enemy stun buys one
free Call to Glory.** Radiant Dawn triggers once per stun resolution (*"one or more enemy units"*), the
buff is the additional cost, and *"ignore this spell's cost"* covers all of E3 — Call to Glory has no
Power in its cost, so nothing is left to pay. **702.2.b.2** (*"A player can only spend buffs on units
they control"*) is satisfied because Radiant Dawn buffs *a friendly unit*.

**The timing closes, by 346.1** (§D). Radiant Dawn's trigger opens a chain; when it empties, Focus does
not pass; you still hold Priority in a Showdown Open state and Call to Glory — `[Reaction]`, so also
everything `[Action]` grants (**813.1.b**) — is legal.

**The rewrite, three corrections.**

1. **`[Hidden]` is not what buys the opponent's turn.** By §A the `[Action]` stuns (Rune Prison,
   Zenith Blade, Heroic Charge) already reach the opponent's Combat Showdown. Hidden buys **0 Energy**.
   The entry now says that instead of #61's S8.
2. **The "2 per turn" ceiling is really 1.** **811.1.b** needs *"a battlefield **you control** that
   doesn't already have a facedown card hidden there"*, and **485.4** is *"Battlefield Count: 2"* in a
   Duel. Two hidden cards therefore means controlling **both** battlefields, i.e. the opponent controls
   none. On any board where this line matters the ceiling is **one** hidden card; the rest of the
   stuns are paid for in Energy.
3. **One buff per unit, and it is a hard stop.** **702.3** — *"There can only be one Buff on a Unit at
   a time"* — with **702.3.a** (*"it is not placed instead"*) and **426.1.b.1**. So the buff has to be
   spent before the next stun, or aimed at a second body. With exactly one friendly unit on the board
   the engine is strictly alternating.

**Arithmetic with the quantities it declares.** One hidden Facebreaker (0 Energy) + one Rune Prison
(2 Energy + 1 Power, `[Action]`, legal in their Combat Showdown by §A) = 2 enemy stuns = 2 buffs =
**2 free Call to Glory = +6 Might**, plus 2 enemy attackers contributing 0 (423.1.b). Cost: 1 `[A]` the
previous turn, 2 Energy and 1 Power out of runes left ready. Facebreaker also stuns a **friendly** body
at that battlefield — 423.1.b bites it too, and the entry counts it.

**Traps.** Empty-battlefield attack: no attack trigger in the line. Awaken Energy (167): every payment
is made in the window it is needed. `[Repeat]`: none. `[Temporary]`: none. Token: none. Recall: none.
Gold: none. Battlefield of its own: none, but the Hidden half needs one you control and 323.7 trashes
the card if you lose it. Depends on no unruled reading.

**Verdict: HOLDS after the rewrite. → verified.**

---

# 2. `solari-chief-facebreaker-shrine-kill` — HOLDS after a REWRITE

```
OGN-225 | Solari Chief | Unit | Order | E5 P1 M4 | When you play me, choose an enemy unit. If it is
  stunned, kill it. Otherwise, stun it. (It doesn't deal combat damage this turn.) [Tags: Mount Targon]
OGN-072 | Solari Shrine | Gear | Calm | E3 | When you kill a stunned enemy unit, you may exhaust this
  to draw 1.
OGN-220 | Facebreaker  (above)
OGN-261 | Radiant Dawn (above)
```

**#61's headline claim is false and the walk had to replace it.** It says Solari Chief is *"la única
remoción del pool **sin tope de Might** que cuesta menos que su target"*. A `grep -inE '\bkill\b'` over
the whole corpus returns **at least five** other Might-capless kills, four of them in Order, in Radiant
Dawn's own identity:

| card | cost | text |
|---|---|---|
| `OGN-229 Vengeance` | Order **E4 P2** | *"Kill a unit."* — no cap, no condition, no setup |
| `OGN-213 Hidden Blade` | Order **E2 P1**, **0 from Hidden** | *"Kill a unit at a battlefield. Its controller draws 2."* |
| `OGS-012 Blast of Power` | Order E6 P1 | *"Kill a unit at a battlefield."* |
| `SFD-164 Drag Under` | Order E5 P1, *"costs `:rb_energy_2:` less to play from anywhere other than your hand"* | *"Kill a unit at a battlefield."* |
| `UNL-186 Death from Below` | Fury/Chaos E4 P1 | *"Kill a unit at a battlefield."* |

Vengeance is cheaper in Energy than Solari Chief and needs no stun at all. So the entry cannot stand on
uniqueness.

**What it stands on instead, and it is real.** Solari Chief is the only one of the six that **arrives as
a body** — E5 P1 for removal *plus* a 4-Might unit — and the only one that is **self-priming**: the
first copy takes the *"Otherwise, stun it"* branch, the second takes *"If it is stunned, kill it"*.
**103.2.b** allows three copies, so the package needs no stun spell at all; the Facebreaker is the
version that primes for **0 Energy**.

**And the removal is not damage, which is the point 423.1.c makes elsewhere.** *"Kill it"* is a Kill
Instruction — **428.1.a.1**, *"Active Kill is when the action is taken when instructed by a game
effect"*, with **428.2** putting the permanent *"directly in the trash from its place of origin"*. Might
never enters, so 423.1.c's *"damage applied … equal to … its full might value"* is bypassed entirely and
a 10-Might body dies to it. That is the honest version of #61's claim.

**Second correction: the buff comes from the stun half, never the kill half.** Radiant Dawn reads *"When
you stun one or more enemy units"*. On the branch where Solari Chief kills, nothing is stunned, so
nothing is buffed. The buff in this line is Facebreaker's.

**Third: Facebreaker from Hidden is confined by 811.1.d.2** to the battlefield it was hidden at, and it
stuns a friendly body there as well. Solari Chief, played from hand, has no such restriction — *"choose
an enemy unit"* names no location — so the kill reaches any battlefield.

**Arithmetic with the quantities it declares.** 1 `[A]` the previous turn (hide Facebreaker) + **E5 + 1
Power** (Solari Chief) removes **any** enemy unit whatever its Might, and leaves behind: a 4-Might body,
1 card drawn (Solari Shrine, *"you may exhaust this"* → **one per turn**; **415.3.a** readies it in your
Awakening Phase) and 1 buff from Facebreaker's stun. The Shrine's own condition is met — Solari Chief
kills a unit that **is** stunned at the moment it dies. The buff is spent on Call to Glory (entry 1) or
on `OGN-282 Monastery of Hirana` (colourless, *"When you conquer here, you may spend a buff to draw 1"*).

**Traps.** No attack designation is claimed. No `[Repeat]`, `[Temporary]`, token, recall or Gold. The
Shrine is gear, so **143.4** (units enter exhausted) does not touch it. Depends on no unruled reading.

**Verdict: HOLDS after the rewrite. → verified.**

---

# 3. `leona-zealot-stun-lethal-spread` — HOLDS after a REWRITE, and it is not a duplicate

```
OGN-079 | Leona, Zealot | Unit | Calm | E6 P1 M6 | If an opponent's score is within 3 points of the
  Victory Score, I enter ready. Stunned enemy units here have -8 :rb_might:, to a minimum of
  1 :rb_might:. [Tags: Leona, Mount Targon]
SFD-040 | Thwonk! | Spell | Calm | E2 | [Action] … [Repeat] :rb_energy_2: … Stun an attacking unit.
OGN-050 | Rune Prison | Spell | Calm | E2 P1 | [Action] … Stun a unit.
OGN-220 | Facebreaker (above)
```

**The overlap, declared.** `leona-zealot-stun-might-collapse` (#89, verified) already carries OGN-079
with OGN-051, OGN-262 and OGN-238, and its `netPerIteration` is *"one enemy unit at Leona's battlefield
reduced to 1 Might"* — **one** body, one stun at a time. It cites 423.1.c, 710 and 465.2.c and stops
there. **This entry is the other half: what 465.2.c.3 and 465.2.c.4 do once several bodies are at 1.**
Neither rule appears in that entry, and the two card sets share only Leona herself.

**The mechanism, and the two rules that are the entry.**

> **465.2.c.3** — *"Units must have lethal damage assigned to them in full before damage is assigned to a different Unit."*
> **465.2.c.4** — *"Units cannot have more damage assigned to them than the minimum required to constitute lethal damage unless no further units remain to have damage assigned to them."*

A stunned enemy standing with Leona, Zealot is at **1 Might** — live, because her text is a passive
ability and **477.3.b** exempts passive abilities from snapshotting (§B) — so by **142.4.b** and **710**
its lethal damage is **1**. 465.2.c.4 then *forbids* assigning it more than 1, and 465.2.c.3 forces the
remainder onto the next body. **A force of summed Might M kills M stunned enemies**, and by 423.1.b none
of them deals damage back.

**The rewrite: this is a DEFENSIVE line, and #61 wrote it as an attack.**

- **The Hidden half only exists on defence.** 811.1.b hides *"at a battlefield **you control**"*. If you
  are attacking their battlefield you never controlled it, so no Facebreaker was ever hidden there. On
  defence the battlefield is yours, Leona stands on it, and the enemy attackers are *"here"*.
- **`Thwonk!` is a defensive card and it works, which #61 doubted.** *"Stun an attacking unit"* needs the
  Attacker designation, which **807.1.d** grants only *"during Combat"*. §A is why it is reachable:
  464.2.c.3 assigns the designations at task 2 of the Combat Showdown Step, **before** 464.2.d hands out
  Focus, so by the time anybody may act there are attacking units to choose. And on **your** turn the
  attackers are *yours*, so the card only ever points the right way on defence.
- `[Repeat]` `:rb_energy_2:` gives **exactly one** extra execution (820.1.b, 820.1.c.3) and 820.2.a lets
  it name a second target. Two stuns from one card, once — not an engine.

**Arithmetic with the quantities it declares.** Leona, Zealot (E6 P1 M6) at your battlefield, the
opponent attacks with four bodies. One hidden Facebreaker (0 Energy, stuns one of theirs and one of
yours), Rune Prison (2 Energy + 1 Power), Thwonk! with its Repeat (2 + 2 Energy, two targets) = **4 of
the 4 attackers stunned**. Each is at 1 Might; each contributes 0 to their damage (423.1.b); your
defenders' summed Might (465.2.b) needs **4 damage total** to kill all four, and Leona alone is a 6.
Total price: 1 `[A]` the previous turn, **7 Energy and 1 Power** out of runes you left ready
(164.2.a, §"a fifth structural fact"). A 10-Might attacker floors at **2**, not 1 — the minimum is 1,
and 10 − 8 = 2 — so count it as 2.

**And the two-turn tempo is real.** 143.4 makes Leona enter exhausted, so she cannot Standard Move
(144.2) the turn she lands, unless *"an opponent's score is within 3 points of the Victory Score"*, the
one board state where she enters ready. Her floor is worth nothing at your base: her text says *"here"*.

**Traps.** No attack designation is claimed for her (she defends). No `[Temporary]`, token, recall or
Gold. 477.3.e.2.a puts decreases last, so an enemy pump cannot outrun the −8. Depends on no unruled
reading.

**Verdict: HOLDS after the rewrite. → verified.**

---

# 4. `vex-apathetic-gloomist-play-tax` — HOLDS after a REWRITE

```
UNL-150 | Vex, Apathetic | Unit | Chaos | E4 M4 | [Deflect] … When an opponent plays a unit while I'm
  at a battlefield, [Stun] it. They can't move it this turn. …
OGN-059 | Eclipse Herald | Unit | Calm | E7 P1 M7 | When you stun an enemy unit, ready me and give me
  +1 :rb_might: this turn. [Tags: Bird, Mount Targon]
UNL-055 | Vex, Mocking | Unit | Calm | E5 P1 M5 | [Shield] … [Tank] … When you [Stun] an enemy unit at
  a battlefield, you may move me to that battlefield. [Tags: Yordle, Vex, Shadow Isles]
UNL-193 | Gloomist | Legend | Calm/Chaos | - | When you or an ally hold, you may exhaust me to
  draw 1. [Tags: Vex]
```

**The overlap, declared.** `vex-star-crossed-rebound-stun` (#89, verified) carries UNL-150 with UNL-128
and UNL-143 and is mono-Chaos: it *manufactures* the replay that Vex taxes. This entry does not
manufacture anything — it is the **payoff side** of the same trigger, and its other three cards appear
in no entry at all.

**The trigger is genuinely free and genuinely repeatable, and it is the only one of its kind.** Reading
all 22 stun producers of #61's table A: the spells are one-shot, `UNL-133 Blast Cone` and `UNL-194
Shadow` carry an exhaust, `VEN-135 Kennen` costs `:rb_energy_2:` and has two windows, `OGN-051`,
`OGN-225`, `UNL-052` and `VEN-120` are play triggers, and `OGN-200`, `OGN-238`, `UNL-176`, `UNL-196` are
attack triggers. **`UNL-150` is the only one with no cost, no per-turn cap and no attack requirement.**
And its location clause is on **Vex**, not on the unit played, so one Vex taxes every unit the opponent
plays anywhere.

**The rewrite, two corrections, and #61's own R2 is why.**

1. **Eclipse Herald's `ready me` is dead on the turn it fires, and the entry now says so.** Vex's
   trigger fires on the **opponent's** turn. A ready there buys nothing: the Standard Move needs
   Priority (**312.2.a**, only in *their* Main Phase, i.e. yours), it *"cannot be performed during a
   Showdown or Combat"* (**144.1.c**), and **415.3.a** readies him in your own Awakening Phase anyway.
   What is live is the other half — **`+1 [M] this turn`** — and it is live on exactly the turn that
   matters, because **465.2.b** sums Defending Might in the damage step of the attack he is standing in.
   N units played ⇒ Eclipse Herald defends at **7 + N**. The Might does **not** carry to the next turn.
2. **Vex, Mocking's move is opponent-dependent, and moving can hurt.** Her trigger needs *"an enemy unit
   **at a battlefield**"*, and **355.2.a** makes the default play destination *"the controller's Base or
   a Battlefield the controller controls"* — a unit played to their base gives her nothing. Worse, if it
   was played to a battlefield **they** control and you take the move, **190.3.a** applies Contested to
   the battlefield keyed on *your* unit's controller, so **464.2.c.1** makes **you the Attacker on their
   turn** — and `[Shield]`'s *"+1 while I'm a defender"* (**814.1.d**) switches off. The entry states
   this as a cost, not a bonus.

**Arithmetic with the quantities it declares.** Vex, Apathetic must be **at a battlefield** (E4; 143.4
means the turn after she lands). Per unit the opponent plays: 1 stun, **0 Energy, 0 cards, no cap**.
With Eclipse Herald also at that battlefield, three units played gives him **+3 Might for that turn** and
three bodies that cannot fight (423.1.b) — one of which also cannot walk (*"They can't move it this
turn"*). Gloomist (Calm/Chaos, tag Vex) is the only legend covering both Vex plus Eclipse Herald;
**103.1.b** would break on any other pair.

**Traps.** No `[Repeat]`, `[Temporary]`, token, recall or Gold; nothing here is INFINITE, since each stun
consumes a *different* enemy body (423.1.a.1) and the state clears at cleanup 3d (423.1.a.2). `[Deflect]`
is a tax on being chosen, not protection. Depends on no unruled reading.

**Verdict: HOLDS after the rewrite. → verified.**

---

# 5. `conscription-signpost-empty-garrison` — HOLDS after a REWRITE

```
UNL-140 | Conscription | Spell | Chaos | E5 P2 | You may spend 5 XP as an additional cost to play this.
  Choose an enemy unit at a battlefield with 3 :rb_might: or less. If you paid the additional cost,
  choose any enemy unit at a battlefield instead. Take control of it, exhaust it, and recall it.
UNL-045 | Forgotten Signpost | Gear | Calm | E2 | [Action][>] Exhaust a unit you control,
  :rb_exhaust:: Move a different unit you control to the location of the unit you exhausted to pay
  for this ability.
UNL-193 | Gloomist | Legend | Calm/Chaos (or OGN-259 Unforgiven, SFD-195 Blade Dancer)
```

**The rewrite: #61's Signpost step does not do what it says.** The issue writes *"`UNL-045` … mueve un
cuerpo exhausto de la base a un battlefield por 0 Energy y 0 Power"*, as the way to walk the stolen body
into the battlefield Conscription just emptied. Read the card to its end: its cost is *"**Exhaust a unit
you control**"* and it moves a different unit *"**to the location of the unit you exhausted**"*. So the
destination is wherever a body you already control is standing. **You must already have a unit at that
battlefield** — and if you already have one at the battlefield you just emptied, you have already
conquered it and the stolen body adds nothing to the conquer. The Signpost is **reinforcement**, not the
enabler, and the entry says that now.

**What holds, and every step of it is in the rules.**

- **The stolen body lands in *your* base.** *"Take control of it, exhaust it, and recall it"*, executed
  in that order (**158.1**, *"Spells have their rules text executed from top to bottom"*): control
  changes first, and **107.1.c** — *"Permanents and Runes controlled by a player reside in **that
  player's** Base"* — is what makes **455**'s *"relocated from anywhere to **its Base**"* mean yours.
  **458** (*"Recalls do not affect the state of the Permanent"*) is why the *"exhaust it"* is a separate,
  printed instruction and not a side effect of the recall — the `CLAUDE.md` recall trap is respected.
- **Emptying the garrison conquers with no damage and no Attacker.** **323.6** strips their Control *"if
  the turn is in an Open State and there is no Showdown or Combat ongoing there"* the moment their last
  body leaves; then your unit walks in, **190.3.a** applies Contested, **344.2** opens a Showdown
  (*"there aren't units controlled by different players there"*), **348.2.a** establishes Control and
  **348.2.a.1** — *"This results in a Conquer if that player has not yet scored that Battlefield this
  turn."* No `When I attack` trigger is claimed anywhere, so the `CLAUDE.md` empty-battlefield trap
  (807.1.d, 383.4.e, 461) is respected: this is a Conquer without an Attacker.
- **Timing.** Conscription has neither `[Action]` nor `[Reaction]`, so **155** confines it to your own
  Main Phase Open State. That is the phase you want it in.

**Arithmetic with the quantities it declares.** Small mode **E5 + 2 Power**, one enemy of **3 Might or
less**. Large mode **E5 + 2 Power + 5 XP**, any enemy at a battlefield. Either way it is a **two-body
swing** on one card — their garrison shrinks by one and yours grows by one — and emptying a garrison of
N defenders costs **N Conscriptions**, not one; **103.2.b** caps that at three copies. The Signpost is
E2 once and 0 per activation afterwards, but each activation costs **the exhaust of a third body** at the
destination, so the line is three units, not two.

**Traps.** Token: none, and 185/186.1 never arise — a stolen unit is a card. Recall: it is the one in
455 and the entry cites it. `[Repeat]`, `[Temporary]`, Gold: none. Battlefield of its own: none. Domain:
Chaos + Calm needs a **Calm/Chaos** legend — `OGN-259 Unforgiven`, `SFD-195 Blade Dancer` or
`UNL-193 Gloomist` — by 103.1.b. Depends on no unruled reading.

**Verdict: HOLDS after the rewrite. → verified.**

---

## What #61 got wrong, in one list

1. **S8** — `[Action]` **does** reach the opponent's combat (308.1, 308.1.a, 310.3, 464, 806.1.b).
   `[Hidden]` buys 0 Energy, not speed.
2. **Candidate 2's headline** — Solari Chief is not the only Might-capless removal; there are at least
   five others and four are in Order.
3. **Candidate 3's board** — the Hidden half only exists on **defence** (811.1.b needs a battlefield you
   control), and `Thwonk!` is a defensive card for the same reason.
4. **Candidate 4's Eclipse Herald** — the `ready me` half is dead on the opponent's turn; only the
   `+1 [M] this turn` is live, and it is live exactly when it matters.
5. **Candidate 5's Signpost** — it moves a unit *to where you already have one*, so it cannot be what
   walks the stolen body into the battlefield you just emptied.

## What was NOT re-derived

S1 (no card exhausts an enemy unit), S2 (an exhausted defender fights at full Might), S3, S4, S5, S6 and
S7 of #61 were checked against the rules they name and all hold; they are recorded in `CLAUDE.md` and are
not repeated in the entries. No new rules reading was filed: every question this walk raised was answered
by a rule that already exists.
