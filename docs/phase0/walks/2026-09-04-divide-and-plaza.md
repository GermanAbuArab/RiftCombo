# Hand walks — the two entries left mid-analysis

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16
**Verdicts:** both **HOLD** → verified. `grand-plaza-loop-time-warp` failed on the first pass and was
rescued by a resequencing the user pointed out; the reading it would otherwise have needed (R29) is
retired unused.

Both entries were REFUTE survivors carrying no open reading, which is why they were queued. One of
them turned out to carry one nobody had noticed, hidden inside a *verified* entry it depends on.

---

## 1. `jhin-emperors-divide-hidden` — eight moves for +8E +8P — **HOLDS**

**UNL-022 Jhin, Murderous Artist** (Unit, Fury, E4 P1 M4): `[Deflect]` · `[Ganking]` ·
**"When I move, [Add] 1 Energy + 1 rainbow."**
**SFD-043 Emperor's Divide** (Spell, Calm, E2): `[Hidden]` · `[Action]` ·
**"Move any number of friendly units at a battlefield to their base."**
**VEN-020 Twilight Reveler** (Unit, Fury, E3 M3): **"When I attack, ready another friendly unit."**
**VEN-139 Rogue Assassin** (Legend, Fury/Calm): `[Empower] 3 Energy + 1 rainbow` ·
`[Action][>]` exhaust: **"If it's your turn, move a friendly unit in a showdown to base and if I'm
[Empowered], ready it."**

The rainbow symbol is **Power of any Domain** (135.2.e.5), so a Jhin move really is +1 Energy +1 Power.

### The eight moves

| # | Action | Moves | Running |
|---|---|---|---|
| 1 | Jhins A, B, C Standard Move base → X (a battlefield you already control) | 3 | +3E +3P |
| 2 | Two Revelers Standard Move base → Y, initiate, both attack: ready A and B | 0 | +3E +3P |
| 3 | Play the hidden Divide for free: A, B, C move X → base | 3 | +6E +6P |
| 4 | A and B Standard Move base → X | 2 | **+8E +8P** |
| 5 | Empowered Rogue Assassin: move A → base, ready it | 1 | +9E +9P |
| 6 | Showdown closes (B holds X); A Standard Moves base → X | 1 | **+10E +10P** |

### Every citation the entry made, checked

- **190.3.a.1** — a unit applies Contested only if its controller *does not already control* that
  battlefield. Step 1 therefore opens nothing at X. ✔
- **461 / 383.4.e / 464.2.c** — a Combat needs units from two opposing players; Attack Triggers fire on
  gaining the **Attacker** designation. ✔
- **811.1.b** — Hide for `[A]` at a battlefield you control *that has no facedown card already*, and
  from the next turn the card gains `[Reaction]` and may be played **ignoring its base cost**. Divide's
  cost is a bare E2 with no additional cost, so "free" is exact here. ✔
- **811.1.d.2** — a hidden spell's targets must be at the battlefield it was hidden at. Divide chooses
  battlefield X, where the Jhins are. ✔
- **485.4 / 485.5** — Duel uses exactly 2 battlefields (each player brings three, one is chosen). So a
  second Divide (811.1.b: one facedown per battlefield) and an attackable enemy battlefield cannot
  coexist in Duel. ✔
- **323.6 / 323.7** — at the Cleanup after Divide empties X you lose control of X, and any *other*
  hidden card there is trashed. ✔

### Four citations the entry needed and did not have

- **144.2** — *exhausting the unit is the **cost** of the Standard Move.* This is the load-bearing fact
  of the whole line: the Divide's move is an **effect**, not a Standard Move, so it pays no exhaust cost
  and A and B come back to base **still ready**. Without this, step 4 does not exist and the line is six
  moves, not eight.
- **464.2.c.3** — *"Units at the Contested Battlefield controlled by the Attacker gain the Attacker
  designation now."* Both Revelers gain it from the **one** combat, so one attack run yields two
  triggers. 383.4.e.2.a caps it at one check per unit per combat, which is why it is two and not more.
- **144.1.c** — a Standard Move **cannot be performed during a Showdown or Combat**. This is why step 6
  has to wait for the showdown at X to close, exactly as the entry's prose said without saying why.
- **167** — the Rune Pool empties at the **start of each Main Phase** and at the **end of the turn**.
  Every point of this +10/+10 is added during the Main Phase, so all of it is spendable that turn. (The
  standing trap about Energy evaporating applies to Awaken/Beginning Phase adds, not to this.)

### The showdown in steps 5–6 is real

After the Divide, X has no units of mine, so at the next Cleanup I lose control (190.4.c, 323.6). A and
B walking back in therefore **do** apply Contested (190.3.a.1), 323.8 marks a Showdown as Staged, and
316.8.b.1 makes it a **Non-Combat Showdown** — a stand-alone Phase, no opponent needed. That is the
showdown Rogue Assassin's "a friendly unit in a showdown" requires. B stays, so control is re-established
at the end of it (190.4).

### Empower is paid once, not per turn

441.1.a/441.2 make Empowered a **binary state on a board object**, and 827.1.c.1 reads Empower as
"[Cost]: Empower this. Play only if not Empowered." Nothing expires it. So the 3 Energy + 1 Power is a
one-time upgrade that can be bought on any earlier turn, and the +2E +2P of steps 5–6 is free on the
turn the engine runs. Had it been a per-turn cost the "upgrade" would have been −1E +1P net, i.e. worse.

**Correction applied:** the Legend was named only in `prerequisites` while the headline `+10/+10` claim
depends on it. It is now in `uses` with `role: "legend"`, matching the six other entries that do this.

---

## 2. `grand-plaza-loop-time-warp` — **FAILS as written**

**OGN-293 The Grand Plaza** (Battlefield): "When you hold here, if you have 7+ units here, you win the game."
**OGN-212 Forge of the Future** (Gear, Order, E2): "When you play this, play a 1 Might Recruit unit token at your base."
**SFD-171 Renata Glasc, Industrialist** (Unit, Order, E4 P1 M4): "Your tokens enter ready."
**OGN-122 Time Warp** (Spell, Mind, E10 P4): "Take a turn after this one. Banish this."

The frame is sound and every part the entry argued about checks out:

- **195** — "A player also wins the game if an effect instructs them to do so." ✔
- **143.4 / 143.4.a** — units enter the board exhausted, *"This can be altered by … similar game
  effects."* Renata's "Your tokens enter ready" is such an effect, which is R25 = A, ruled. ✔
- **315** — the phase order is Awaken → **Beginning Phase (Beginning Step, then Scoring Step)** →
  Channel → **Draw** → Main. The Hold is 315.2.b.2, and it happens *before* the Draw Phase.
- **469.2 / 470** — establishing control on turn N is a **Conquer**; the Hold is on turn N+1, so the
  once-per-battlefield-per-turn cap never binds. Time Warp is needed precisely because the Grand Plaza
  says *hold*, not *conquer*, and without the extra turn the opponent gets a whole turn to clear it. ✔
- **144.3** — several units may Standard Move as **one** action to the same destination, so all seven
  Recruits enter the Plaza together instead of trickling in and staging a showdown after the first.
- **186.1** — a token ceases to exist only on entering a non-board zone, so Recruits survive to the
  next turn. ✔

**The REFUTE note's one stated worry was itself wrong.** It said to "leave a card in the deck for the
extra Draw Phase". Unnecessary: the Hold is the Scoring Step of the Beginning Phase (315.2.b.2) and the
Draw Phase is 315.4, two steps later. The game has already ended at 196 before a Burn Out can occur.

### What actually kills it

Step 1 is *"Loop until seven or more Recruits exist."* The loop is `lux-infinite-energy`, and one of the
four cards it plays every single pass is:

> **UNL-165 Shadow's Call** (Spell, Order, E2): "**Choose a friendly unit without [Temporary]. Give it
> [Temporary].** Draw 2."

and **816.1.b** spells [Temporary] out as *"At the start of this permanent's controller's Beginning
Phase, **before scoring**, kill this."*

Before scoring is exactly when the Grand Plaza is checked. So:

- Each pass **creates** one non-Temporary Recruit (Forge's play trigger) and **consumes** one
  non-Temporary friendly unit (Shadow's Call must choose one, and "without [Temporary]" means it can
  never re-use a marked one).
- The count of units that will still be alive at the Scoring Step is therefore **constant across the
  loop**, no matter how many passes are run. Infinite passes give infinite *bodies for this turn* and
  zero net *bodies for the Hold*.

`lux-infinite-energy` is not wrong — it produces infinite Energy either way — but its step 3 says
"Play Shadow's Call on **any** friendly unit", and that word hides a per-pass tax that this entry's
payoff cannot pay. Its `produces: "infinite-recruits"` is true only within the turn.

### The fix: resolve Shadow's Call *before* playing Sacrifice

My first answer was to point Shadow's Call at **Ekko** and let it resolve with a dead target, on the
argument that the mistarget kills only the instruction that named the unit and "Draw 2" survives
(359.3.e.7, 758.1, 359.3.e.11). That works, but it is needlessly clever and makes the catalogue stand on
an unruled reading. **The user pointed out the obvious better line:** target Ekko, let Shadow's Call
**resolve normally**, and play Sacrifice *afterwards*.

| | stacked (Sacrifice in response) | sequenced (user's line) |
|---|---|---|
| Shadow's Call | resolves with a dead target — **needs a mistarget reading** | resolves normally: Ekko gains [Temporary], draw 2 |
| Sacrifice | played in response | played after, kills Ekko as its additional cost |
| the [Temporary] mark | never lands | lands on Ekko and **dies with him** |
| draws per pass | 4 | 4, identical |
| Recruits marked | 0, only if the reading goes one way | **0, unconditionally** |

Legal on three counts: **813.1.b** — *"Reaction grants the corresponding card or effect all abilities and
permissions of Action"* — so Sacrifice can be played in a plain Main Phase Open State with an empty
chain, not only in response to something. Ekko is a legal choice when Shadow's Call is played and still
alive when it resolves, so 355.8 is satisfied twice over. And [Temporary] only ever triggers at the start
of a Beginning Phase (816.1.b), so marking Ekko costs nothing during the turn he dies in.

The deck bookkeeping is unchanged. Sacrifice is in hand from the start of the pass, so it never depends on
Shadow's Call's draws; and exhausting the runes for floating Energy still happens before Ekko's Deathknell
readies them:

| step | deck | note |
|---|---|---|
| Kill Forge, recycle Forge + Shadow's Call + Sacrifice | 3 | |
| Shadow's Call resolves, draw 2 | 1 | |
| Sacrifice's cost kills Ekko → Deathknell recycles Ekko | 2 | 11 runes readied |
| Sacrifice resolves, draw 2 | 0 | hand: Forge, Shadow's Call, Sacrifice, Ekko |

Four recycles, four draws, same as the stacked version. `lux-infinite-energy`'s step 3 now names Ekko and
the ordering explicitly, and `grand-plaza-loop-time-warp` is promoted: each pass is +1 clean Recruit,
unbounded, so seven is trivial.

**R29 is retired.** It was a real question about instruction-level mistargeting, but no entry in the
catalogue stands on it any more, so it does not need a ruling.
