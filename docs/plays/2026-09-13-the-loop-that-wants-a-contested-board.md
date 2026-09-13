# Play — the loop that WANTS a contested board, and what its seven bodies cost

Issue #200, lane rc-synth2, 2026-09-13. Constructed, Duel (485). Rules version 2026-07-16. Card text
verbatim from `data/corpus_flat.txt`; rules pasted from `data/Riftbound-Core-Rules-2026-07-16.txt`.
Read [the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline and
[the catalogue's fastest win](2026-09-13-the-fastest-win-needs-an-empty-deck.md) for why this subject
was chosen over the faster-looking one.

**Subject: `jhin-fiora-facebreaker-recall`**, an INFINITE the turn clock reads at **T5 against a T6
baseline**. The companion play found that five of the nine rows beating their baseline carry an
unpriced empty-Main-Deck cost. This is one of the **three that do not**: a combat-recall loop that
spends zero cards a pass, so its number is honest to begin with.

Walked by hand it lands on **T4**, one turn earlier than the clock says, and the reason is a blind
spot in the clock rather than an error in the entry.

---

## 1. Why this one is the shape a finisher should have

`npm run adversarial -- --stalled` classifies every finisher by the board it needs. This line is in
the **ATTACK** bucket, and that bucket's label is the only one that reads as a credential:

> "ALIVE WHERE THE CURVE STALLS. The printed text needs the Attacker designation, which 807.1.d and
> 323.9 make impossible without an enemy garrison. Dead on an empty board, alive on a contested one."

Every pass of this loop is a combat, and 466.1.a.2 recalls the attackers **because defenders remain**.
So the opponent's garrison is not an obstacle to the line — it is the line's fuel. That is the exact
inverse of the Renata engine in the companion play, whose payoff needs a battlefield you already
control and therefore dies with the curve it exists to rescue.

## 2. Needs

| | |
|---|---|
| **Legend** | any Fury/Order name — the pool prints **three**: `OGN-253 Hand of Noxus`, `SFD-187 Void Burrower`, `UNL-187 Piltover Enforcer` |
| **The loop** | `UNL-022 Jhin, Murderous Artist` (Fury, E4 + 1 Power, M4) · `SFD-180 Fiora, Worthy` (Order, E3, M3) · `SFD-009 Serrated Dirk` (Fury, E1, **[Equip] 1 Fury**) · `SFD-153 Eye of the Herald` (Order, E1, **[Equip] 1 Order**) · `OGN-220 Facebreaker` (Order, E2, first pass only) |
| **The payoff** | `OGN-293 The Grand Plaza` (Colorless battlefield) · `SFD-171 Renata Glasc, Industrialist` (Order, E4 + 1 Power) |
| **The protection, and it is not in any entry** | `VEN-018 Rage Amplifier` (Fury, E4 + 1 Power) |
| **Board it needs** | an enemy battlefield garrisoned by a unit of 2+ Might, and your own battlefield uncontrolled |

Domain identity: Jhin and the Dirk and the Amplifier are mono-Fury, Fiora and Facebreaker and the Eye
and Renata are mono-Order, the Plaza is Colorless. Union `{fury, order}` under 103.1.b. None is
Signature and `data/legality.json` names none of them.

## 3. The loop, and what one pass actually costs

```
Jhin Standard-Moves base -> the enemy battlefield        144.4.a, cost = his own exhaust (144.2)
  his own trigger:  "When I move, [Add] 1 Energy + 1 rainbow"          +1 Energy, +1 rainbow
  the Eye's effect: "When I move, play a 1 Might Recruit unit token here"   +1 Recruit
  464.2.c.3 designates him Attacker; the Dirk's [Assault 2] makes him Might 6
  709 "becomes Mighty" fires -> Fiora: pay 1 Order Power to ready him       -1 Power
Combat cleanup: 466.1.a.1 heals, 466.1.a.2 recalls the attackers because defenders remain,
  466.3.d is No Result. 458 leaves Jhin as he was, i.e. READY.
Repeat. 144.1.a allows the Standard Move any time in your Main Phase.
```

**Per pass: +1 Energy, +1 Recruit, and Power breaks exactly even** — Jhin's rainbow pays Fiora's Order
cost, because 135.2.e.5.a makes `[A]` payable for a Power cost of any Domain. So the loop is an Energy
faucet and **not** a Power faucet, which decides everything below: every Power in this deck comes off
the rune curve, and every Power spent takes a rune off the board (161.2.b).

`OGN-220 Facebreaker` is first-pass-only housekeeping: *"Stun a friendly unit and an enemy unit at the
same battlefield"*, so neither Jhin nor the defender deals combat damage, and 466.1.a.1 heals the
Recruit's 1 damage at every cleanup anyway.

## 4. The turns, going first (485.7 gives the extra rune to the player going second)

`R` = runes on the board after that turn's Channel Phase.

| turn | R | what happens |
|---|---:|---|
| **T1** | 2 | `SFD-009 Serrated Dirk` (E1) and `SFD-153 Eye of the Herald` (E1). Both are gear, so 359.2.d enters them **ready** at base — no readiness turn is owed, which is why two cards fit on turn 1. |
| **T2** | 4 | `UNL-022 Jhin` for E4 + 1 Fury Power: tap all four runes, then recycle one already-exhausted Fury rune (164.2.b's cost is the recycle, not an exhaust). Board drops to **3**. Jhin enters exhausted (143.4). |
| **T3** | 5 | 315.1.b readies Jhin. `SFD-180 Fiora, Worthy` (E3). **[Equip] both gear onto Jhin — 1 Fury and 1 Order Power, board down to 3.** Fiora entered exhausted and it does not matter: her clause is a Triggered Ability with a Power cost and no exhaust. **Start the loop** with the 2 Energy left, and from the first pass it funds itself. Run it: Facebreaker (E2) on the first pass, then N passes for N Energy and N Recruits. Those Recruits enter **exhausted** and are recalled to base. Once the loop has paid for it, `SFD-171 Renata Glasc, Industrialist` (E4 + 1 Power, board 2) — *"Your tokens enter ready"* — and every Recruit made **after** her walks the same turn. Run seven more passes, then Standard-Move all seven to the Plaza as **one action** (144.3, 144.4.a, shared destination), paying each body's own exhaust (144.2). 190.3.a.1 applies Contested, 344.2 opens a Showdown at the next Cleanup, 348.2.a establishes Control and 348.2.a.1 makes it a **Conquer**. **+1 point.** Then `VEN-018 Rage Amplifier` (E4 + 1 Power, board 1) — *"Your units have +1 Might"* — and the Recruits are Might 2. |
| **their turn** | | the whole window, priced in §6 |
| **T4** | 7 | Beginning Phase: 315.2.b.2 Holds every battlefield you control. `OGN-293 The Grand Plaza`: *"When you hold here, if you have 7+ units here, you win the game."* 383.2.a.1 measures the count as the trigger is placed, and 195 wins the game. |

**Turn 4.** The do-nothing Hold curve in fury/order is turn 6, and this beats it by two.

## 5. Why the clock says T5, and it is the clock that is wrong

Two blind spots, and the first is the interesting one.

**An INFINITE pays for its own remaining deployment, and `deployTurn` cannot know that.** The clock
prices every card in a closure against the rune curve — 2 runes a turn, 12 maximum — which is exactly
right for a BURST or a CHAIN, where every Energy comes from a rune. It is wrong for an Energy engine:
from the moment this loop is live, Energy stops being scarce, and Renata (E4) and the Rage Amplifier
(E4) are free. The rune curve still binds their **Power**, one each, and that is the only thing the
later turns are really buying. So for the INFINITE class specifically the clock is an **over**-estimate,
in the opposite direction to the under-estimate the companion play found in the same script. Both
corrections live in the same class and they push opposite ways — which is why the honest thing is to
walk a line rather than sort the table.

**The clock never prices an `[Equip]` cost.** `costsOfSet` reads a card's printed `energy` and `power`,
and 818.1 makes Equip a **separate Activated Ability** with its own cost. This line pays two of them —
1 Fury for the Dirk, 1 Order for the Eye — and the clock sees neither. That is the error this project
already records as a standing trap (*"Always count the [Equip] costs and the Power: two published '18
Energy' figures had counted neither"*) arriving inside our own instrument. Here it happens not to move
the answer, because the binding constraint on T3 is Power on the board rather than Energy; on a line
with three or four Equipment it would.

**And one thing the entry has right that is worth stating:** `SFD-171 Renata Glasc, Industrialist`
buys a **turn**, not a capability. Recruits made without her are recalled to base exhausted and are
readied for free by 315.1.b at your next Awaken, so a line with a spare turn does not need her at all —
it just wins on T5 instead of T4. She is four Energy and a rune for exactly one turn of compression,
and that is only worth it because the Energy is free by the time you cast her.

## 5b. The control case: the other Fury/Order Recruit engine, which the clock scores identically

`twilight-reveler-eye-facebreaker-recruits` is the same identity, the same payoff and the same
`[payoff: + ready-recruits-grand-plaza]` fold, and the clock reads it at **T5 vs T6** — the same row
as this one. It is also **cheaper and simpler**: E9 and no Power over four copies of three names
(`VEN-020 Twilight Reveler` ×2, `SFD-153 Eye of the Herald`, `OGN-220 Facebreaker`) against E11 + 1
Power over five names here. Its pass costs literally nothing: Reveler A moves in, the Eye makes a
Recruit, 383.4.e fires *"When I attack, ready another friendly unit"* on Reveler B, the combat cleanup
recalls A, and B goes next — so a Recruit arrives on every pass the Eye-carrying Reveler makes.

**And it cannot do what §4 does, for one reason: it produces `token-body-engine` and nothing else.**
This line produces `infinite-energy` as well, and that is the whole difference.

```
T1  R=2   Eye of the Herald (E1)
T2  R=4   Reveler A (E3); [Equip] the Eye to A, 1 Order Power -> board 3
T3  R=5   Reveler B (E3); Facebreaker (E2). Loop all turn: Recruits pile up at base EXHAUSTED
T4  R=7   Awaken readies them. Rage Amplifier (E4 + 1 Power) -> board 6. Walk seven in -> Conquer
          Renata (E4) does NOT fit beside it: E4 + E4 = 8 against 7 runes
T5        Beginning Phase: Hold -> 7+ units here -> win
```

**Turn 5, and T5 is its floor** — pulling the Conquer back to T3 would need Renata on T3 so the
Recruits enter ready, and Reveler B at E3 plus Renata at E4 is seven Energy against five runes.

So two entries the clock cannot separate are a turn apart, and the separator is whether the loop
makes Energy. **A body engine has to buy its own insurance off the rune curve; an Energy engine buys
it out of the loop.** That is the §5 finding stated from the other side, and it is also why these two
are not one line written twice: Jhin costs two more Energy, one more Power and two more card names,
and what he buys with them is the turn.

---

## 6. Breaks to — the opponent's one turn, priced

The seven bodies have to survive from your T3 Conquer to your T4 Beginning Phase. That is the whole
exposure, and it is where this line is actually decided.

- **`OGN-133 Flurry of Blades` — Body, E1, [Reaction], *"Deal 1 to all units at battlefields."*** One
  Energy answers seven Might-1 Recruits, because 143.2.a kills on marked damage at or above Might and
  370.1.a.2 makes them die simultaneously. **This is why §4 spends E4 + 1 Power on the Rage Amplifier
  before passing the turn**, and it is the single most important line of the play.
- **The recorded fix is Mind and is ILLEGAL here.** `ready-recruits-grand-plaza` names
  `UNL-077 Soul Shepherd` (*"Your token units have +1 Might"*) and correctly says he *"narrows an
  all-Order line to Mind/Order"*. It does not say what a **Fury/Order** engine does, and Mind plus
  Fury plus Order is three domains, which 103.1.b forbids outright. Swept for a static, non-"this
  turn" `+N Might` grant to your units with domains inside `{fury, order}` or colourless, folded by
  name and type, the identity's own answers are **three and a half**:
  - **`VEN-018 Rage Amplifier`** — Fury, **gear**, E4 + 1 Power: *"Your units have +1 Might. If I'm
    [Empowered], they have +2 Might instead."* No location clause, no body slot, and 359.2.d enters it
    ready at base. **This is the one**, and it is already in the catalogue on two other Plaza entries
    (`desert-call-vi-sand-soldier-plaza`, `ferrous-forerunner-karthus-mech-plaza`) — nobody had
    connected it to the two Fury/Order Recruit engines.
  - `OGS-013 Garen, Commander` and `OGN-243 Darius, Executioner` — Order, E6 + 1 Power, M5 and M6:
    *"Other friendly units have +1 Might **here**."* The **here** is load-bearing and a first draft of
    this play missed it — they must stand at the Plaza themselves, which costs a body slot and also
    fills one of the seven.
  - `OGN-294 Trifarian War Camp` and `UNL-T03 Brush` are battlefields and are therefore **mutually
    exclusive with the Plaza**: 485.4.a has each player provide three battlefields of which only one is
    used, and 103.4.c forbids duplicate names.
- **Above Might 2 the answers get expensive, and 22 of the 23 Plaza entries name none of them.** Swept
  with `/deal \d+ to (all|each) units?|kill all units/i` over text and effect, folded by name+type,
  the pool prints **seven** mass answers and only four reach a Might-2 body at a battlefield you
  control: `OGS-018 Tibbers` (Fury/Chaos, E8 + 2 Power, deal 3 on play), `OGN-190 Kog'Maw, Caustic`
  (Chaos, E3 + 1 Power, deal 4 — but its Deathknell is scoped to *"my battlefield"*, so it has to be
  walked into the Plaza first, which contests it), `OGN-123 Unchecked Power` (Mind, E7 + 2 Power, deal
  12) and `UNL-180 The Ruination` (Order, E9 + 3 Power, kill all units). `UNL-212 Frozen Fortress` is a
  battlefield and only reaches units at itself. **Nineteen of the 23 Plaza entries name `OGN-133` and
  exactly one names anything larger** — the family has been measured against a single one-Energy card.
- **`VEN-133 Glowstone` is the cheapest hard answer in the pool and it misses by a phase.** Order, E2:
  *"Disempower this, exhaust: Choose a player. They gain control of this and recall it… At the end of
  your turn, kill this and deal 5 to all units you control."* Five damage kills a Might-2 or Might-4
  Recruit board outright, and 381 makes them hand it over on **their** turn — so it fires at the end of
  **your** next turn, and 315.2.b.2 has already won the game in that turn's Beginning Phase. Against
  this line it is a turn too slow; against a Plaza line that needs a second turn it is lethal for two
  Energy, and it is in no entry.
- **Contesting the Plaza instead of sweeping it.** They move a body in; 190.3.a.1 applies Contested and
  323.9 stages a Combat. Seven Might-2 Recruits are 14 summed Might (465.2.c) and 466.5 leaves Control
  with the player who already had it, so this is the worst of their options unless they can win the
  combat outright.
- **Killing Fiora, which the entry already names.** She has no protection where Jhin has [Deflect], and
  every pass opens a Showdown in which the opponent holds priority. Killing her does not undo the
  Recruits already at the Plaza — it stops the engine, not the payoff.
- **No enemy garrison at all.** 323.9 stages no Combat, so Jhin walks into an empty battlefield, takes
  it by 344.2 with no Attacker designation, and the loop never starts. That is the credential from §1
  read from the other side, and it is the one board on which this deck has no plan.

---

## 7. Verdict, in three cases

| board | what happens |
|---|---|
| **Unopposed — they take neither battlefield** | **The loop does not run.** No enemy garrison, no Combat, no Attacker designation, no recall. You conquer two battlefields with bodies and win on the free Hold curve at turn 6, and the seven cards of the package did nothing. |
| **One battlefield each, garrisoned — the ordinary game** | **Turn 4**, against a free curve that pays you 1 a turn and reaches 8 around turn 9. The Conquer on T3 is worth a point on its own and the Plaza does the rest. **This is the board the line is built for and it is two turns faster than doing nothing.** |
| **They take both and garrison both** | Still alive, and this is the case that separates it from every Hold line in the catalogue. The loop only needs an enemy garrison, which they have just given you; what it loses is the **Plaza**, because you need a battlefield you control to walk the Recruits to. So the engine runs and the payoff does not — and the entry's own step 4 names the alternative, `SFD-177 Azir, Sovereign`, whose *"when I attack, move any number of your token units to this battlefield"* puts the swarm on a battlefield you are attacking instead. Not walked here. |

**The finisher earns its slot in the middle case and the middle case is the normal one.** That is more
than the companion play's Renata engine could say, and the difference is one property: this line's
payoff is gated on a battlefield you control, but its **engine** is gated on a battlefield they
control, so a stall feeds it rather than starving it.

---

## 8. What this play is asking the manager for

Neither is made here; `data/combos.json` is single-owner.

1. **`ready-recruits-grand-plaza` should name a Fury-legal protection.** Its Soul Shepherd note is
   correct and correctly scoped to an all-Order line, and the two Fury/Order engines that feed this row
   (`jhin-fiora-facebreaker-recall`, `twilight-reveler-eye-facebreaker-recruits`) cannot run him at
   all. `VEN-018 Rage Amplifier` is the answer, it is already in the catalogue twice, and the
   composition is legal.
2. **The Plaza family is measured against one Energy.** Nineteen of 23 entries name `OGN-133 Flurry of
   Blades` and one names anything larger. The four that reach a Might-2 board are named in §6 with
   their costs, and `VEN-133 Glowstone` at E2 is a fifth answer of a different kind that nothing in the
   catalogue mentions — cheap, total, and beaten only by a payoff that fires in the Beginning Phase.
