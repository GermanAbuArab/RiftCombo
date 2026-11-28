# Hand walk — `jhin-fiora-facebreaker-recall`

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **Verdict: HOLDS — unbounded**

Per pass: **+1 Energy, ±0 Power, +1 Recruit in base, Jhin exhaust→ready (net ±0).** No step consumes a
finite resource, so the loop is unbounded within the turn.

Every rule below was read from `data/Riftbound-Core-Rules-2026-07-16.txt` and every card text from
`data/corpus_flat.txt` during this walk. Nothing here is carried over from an agent report.

---

## Cards, as printed

| Code | Card | Text that matters |
|---|---|---|
| UNL-022 | Jhin, Murderous Artist (Unit, Fury, E4 P1 **M4**) | `[Deflect]` · `[Ganking]` · **"When I move, [Add] 1 Energy + 1 rainbow."** (Adds can't be reacted to) |
| SFD-180 | Fiora, Worthy (Unit, Order, E3 M3) | **"When a unit you control becomes [Mighty], you may pay [Order] to ready it."** (Mighty = 5+ Might) |
| OGN-220 | Facebreaker (Spell, Order, E2) | `[Hidden]` `[Action]` **"Stun a friendly unit and an enemy unit at the same battlefield."** (They don't deal combat damage this turn) |
| SFD-009 | Serrated Dirk (Gear, Fury, E1) | `[Equip][Fury]` · **`[Assault 2]` (+2 Might while I'm an attacker)** |
| SFD-153 | Eye of the Herald (Gear, Order, E1) | `[Equip][Order]` · **"When I move, play a 1 Might Recruit unit token here."** |

Jhin carries both Gear. Fiora sits in base and never moves.

## Board state required before the first pass

1. Jhin **ready in base**, holding Serrated Dirk and Eye of the Herald.
2. Fiora on the board (base is fine — her ability has no location clause, unlike Renata Mastermind's
   "only while I'm at a battlefield").
3. Facebreaker in hand or hidden.
4. A target battlefield the **opponent already controls**, with **at least one defending unit**.
5. Total Might of enemy units there that Facebreaker does **not** stun must be **< 6** (Jhin's attacking Might).

Preconditions 4 and 5 are load-bearing; both are derived in "Why the preconditions" below.

---

## One pass, step by step

### 1. Standard Move, base → enemy battlefield
- **Cost: exhaust Jhin** (144.2 "Exhausting the Unit is the Cost for this action"). This is the only
  cost the loop pays in board state, and step 3 refunds it.
- Legal now: Main Phase (144.1.a), not in a Showdown or Combat (144.1.c), base→battlefield (144.4.a).
- Triggers on the move:
  - Jhin: **+1 Energy +1 rainbow**. Rainbow = "Power of any Domain" (**135.2.e.5**), so it can pay an
    Order cost.
  - Eye of the Herald: **a 1 Might Recruit token appears at that battlefield**.

### 2. Combat opens; Assault turns on; Fiora readies Jhin
- Jhin's arrival applies Contested. **461**: a Combat is Staged whenever units of two opposing players
  are at a battlefield. The battlefield has a defender, so combat stages every pass. *(This is the
  authoring trap about empty battlefields — precondition 4 dodges it: there is always a garrison.)*
- **464.2.c** step 2 assigns the Attacker/Defender designations inside the Combat Showdown Step;
  **464.2.c.1** makes me the Attacker (my unit applied Contested).
- **807.1.d.1**: "Assault remains in effect as long as the Unit maintains the Attacker designation."
  Jhin: 4 → **6 Might**.
- **709**: a unit "becomes Mighty" the moment its Might crosses from <5 to ≥5. 4→6 crosses. Fiora
  triggers.
- Pay **1 Order Power** — the rainbow Jhin just added — and **ready Jhin**. Triggers may go on the
  Chain during a Closed or Open State (**383.3.c**), so this is legal mid-combat.

**Net so far this pass: +1 Energy, ±0 Power, Jhin ready again.**

### 3. Facebreaker — first pass only
- Played in the Showdown (`[Action]`: on your turn or in showdowns). Stuns **Jhin** and **one enemy unit**.
- **423.1.b**: a stunned unit contributes no Might to combat damage.
- **423.1.a.2**: the stun is cleared only in **step 3d of the end-of-turn cleanup** — so it survives every
  later pass. One Facebreaker covers the whole loop.
- **423.1** is a binary status, **not** an exhaust. Jhin can still move while stunned. This is the single
  most load-bearing fact in the loop.
- **423.1.a.1** forbids re-stunning an already-stunned unit — never needed, and never attempted.

### 4. Combat Damage Step
- **465.2.a/b** sum Might of attackers and defenders. Ready/exhausted is irrelevant to this sum; only
  Stun removes a contribution (423.1.b).
- Attackers: Jhin **0** (stunned) + Recruit **1** = **1 damage assigned**.
- Defenders: only the un-stunned ones contribute — capped below 6 by precondition 5.
- **465.2.c.3**: the opponent must assign lethal in full to one unit before spreading. With <6 they can
  kill the 1-Might Recruit, or put non-lethal damage on Jhin, but they **cannot kill Jhin**
  (**423.1.c**: a stunned unit still needs damage ≥ its full Might to die — 6 while attacking).

### 5. Combat Cleanup — the recall
- **466.1.a.1** inserts "3c. **Heal all Units**" → the 1 damage on the defender and any non-lethal damage
  on Jhin vanish. Nothing accumulates across passes.
- **466.1.a.2** inserts "3d. **Recall Attackers present at the Battlefield if Defenders are still present**."
  The defender survived, so **Jhin and the Recruit are recalled to base**.
- **456**: "Recalls are not Moves." **456.1**: they do not trigger Move-triggered abilities. So the trip
  home gives **no** second Energy and **no** second Recruit. This is why the loop is +1 Energy per pass,
  not +2, and why it is **not** infinite Power.
- **458 / 458.1**: recalls do not affect state — Jhin arrives in base **ready** (Fiora readied him) and
  **still stunned**.

### 6. Combat result — nothing is scored
- **466.3.d**: "There is 'No Result' if units were recalled during step 3d of the Combat Cleanup." That is
  exactly our case.
- **466.3.d.1** re-stages a Showdown and Combat only "if both players have units remaining." After the
  recall all my units are in base, so **no re-stage** — the loop returns cleanly to the Main Phase.
- **466.5**: the player with units remaining "Establishes Control **if they didn't already control this
  Battlefield**." Precondition 4 means they already do → no Establishing Control at all, so **466.5.d**
  never fires and **the opponent scores nothing**.
- **466.7.a** removes the Attacker/Defender designations → Assault switches off (807.1.d.1) → Jhin drops
  back to **4 Might**, below 5.

### 7. Repeat
Back in the Main Phase, Jhin is in base, **ready**, at **4 Might**, still stunned. Step 1 is legal again.
The next pass re-crosses 5 → Fiora triggers fresh (709's second example only blocks a unit that was
*already* Mighty, and 466.7.a guarantees Jhin was not).

**No per-turn cap on combats or showdowns exists in the rules** — grepped; nothing limits how many times
a battlefield can be contested in a turn.

---

## Tally per pass

| Resource | Δ |
|---|---|
| Energy | **+1** |
| Power | +1 rainbow from Jhin, −1 Order to Fiora = **±0** |
| Recruit tokens in base | **+1** (0 if the opponent spends damage killing it) |
| Jhin's ready state | exhaust (144.2) → ready (Fiora) = **±0** |
| Cards from hand | **0** after the first pass |
| Damage carried over | **0** (466.1.a.1 heals every pass) |

Nothing decrements. The loop is **unbounded** and terminates only when the player chooses to stop.

## Why the preconditions

- **"Opponent already controls the battlefield"** — without it, the recall leaves only the opponent's
  units there, they Establish Control (466.5) and, not having scored it this turn, that Establishing
  Control **is a Conquer** (466.5.d). You would be handing them a free point every pass. With the
  battlefield already theirs, 466.5's own "if they didn't already control this Battlefield" clause
  makes the whole branch inert.
- **"Un-stunned enemy Might < 6"** — Facebreaker stuns exactly one enemy. Anything else there assigns
  real damage, and 465.2.c.3 lets the opponent aim it at Jhin. At 6+ they kill him (423.1.c) and the
  loop ends.
- **"At least one defender"** — with an empty battlefield there is no Combat at all (461), so no
  Attacker designation, no Assault, no Mighty crossing, no Fiora, and no recall. Jhin would just take
  the battlefield.

## What ends the loop

1. **The opponent kills Fiora.** Jhin has `[Deflect]` (opponents pay a rainbow to choose him with a
   spell or ability); Fiora has nothing. Each pass opens a Showdown where the opponent holds priority.
   This is an interaction risk, not a rules break — but it means the loop is not protected.
2. **End of turn.** The Rune Pool empties, so the Energy must be spent the same turn. The Recruits stay.
3. **The opponent's un-stunned Might crosses 6** (a pump, a new body moved in during their own turn).

## Payoff

Infinite Energy this turn plus an unbounded pile of Recruits in base. Cash out with Azir, Sovereign
(when he attacks, move any number of your tokens to that battlefield), Scrutinizing Sergeant, or a
Grand Plaza hold next turn with 7+ bodies.

## Three-card floor

Jhin + Fiora + Facebreaker at Trifarian War Camp (OGN-294, +1 Might to units there) is infinite Energy
with **no Equipment at all** — but only in **Match**, where you pick which of your three battlefields is
used (486.5); in **Duel** it is random (485.5). In that build Fiora's trigger and Jhin's Add come off the
same move, so order the Chain so the Add resolves first.

## Readings this walk does NOT depend on

R13 was listed as an open reading ("does the Might crossing refresh each pass"). **It does not need a
ruling here**: 807.1.d.1 ties Assault to the Attacker designation, 466.7.a removes that designation when
combat ends, and 709 defines the crossing. That is three pieces of rules text, not an interpretation.
The walk cites no unruled reading anywhere else.

## Links
- Combo entry: `data/combos.json` → `jhin-fiora-facebreaker-recall`
- REFUTE pass 2: `docs/phase0/hunt2/REFUTE-2026-09-03b.md` (verdict SURVIVES, tally confirmed here)
- Community sources: the three r/riftboundtcg threads listed on the entry
