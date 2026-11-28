# Hand walk — `garen-fiora-malzahar-facebreaker-recruits`, the standalone Recruit loop

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **HOLDS as INFINITE.**

The only INFINITE in the catalogue that needs **no** Lux loop underneath it (`needs: []`). It was posted
as a joke and defended seriously, and it closes.

## The cards

**OGS-013 Garen, Commander** (Order, E6 P1 M5): "**Other** friendly units have +1 Might **here**."
**SFD-153 Eye of the Herald** ×2 on Garen: `[Effect]` "When I move, play a 1 Might Recruit unit token here."
**SFD-180 Fiora, Worthy**: "When a unit you control becomes `[Mighty]`, you may pay 1 Order to ready it."
**OGN-113 Malzahar, Fanatic** (M3): "Kill a friendly unit or gear, exhaust: `[Action]` — Add 2 rainbow."
**OGN-095 Stupefy** (E1, `[Reaction]`): "Give a unit −1 Might **this turn**, to a minimum of 1. Draw 1."
**OGN-220 Facebreaker** (E2, `[Hidden][Action]`): "Stun a friendly unit and an enemy unit at the same
battlefield. (They don't deal combat damage this turn.)"
**OGN-294 Trifarian War Camp**: "Units here have +1 Might. (This includes attackers.)"
**SFD-151 Bonds of Strength** (Order, E2, `[Reaction]`): "Give two friendly units each +1 Might this turn."

## One pass

| step | what happens | Power | Recruits |
|---|---|---|---|
| setup | Stupefy Garen: M5 → **4** for the turn. Bonds of Strength puts Malzahar at **4**. | | |
| 1 | Garen Standard-Moves to the War Camp. Its +1 takes him 4 → **5**: a crossing, so **709** fires. Fiora readies him. Both Eyes trigger on the move, so **two Recruits** enter *here*. | −1 | +2 |
| 2 | Malzahar (`[Action]`, legal in the showdown) kills one Recruit and exhausts. | **+2** | −1 |
| 3 | Combat Cleanup: **466.1.a.2** — *"Recall Attackers present at the Battlefield **if Defenders are still present**"* — sends Garen and the surviving Recruit home. Facebreaker's stun is what keeps the defender alive to trigger this. | | |
| 4 | At base, Garen's aura lifts Malzahar 4 → **5**. Another crossing, another Fiora ready. | −1 | |
| | **net** | **0** | **+1** |

Garen comes home **ready**, because **458** is flat: *"Recalls do not affect the state of the Permanent
being recalled … Damage and statuses of a permanent will all remain unaffected by a Recall."* So he can
move again next pass, and the pass repeats unbounded.

## What makes each pass a fresh crossing

**709** requires Might to change *from below 5 to 5 or greater*, so the engine needs both units to fall
back under 5 every pass. They do, and for different reasons:

- **Garen** is Stupefied to 4 for the turn and only reaches 5 **at** the War Camp, so leaving it drops him.
- **Malzahar** sits at 4 and only reaches 5 while Garen is at **base** with him — Garen's aura says
  "**here**", so it toggles off the moment Garen attacks.

That toggling is the engine, and it is exactly the objection the original poster was answering.

## Details the entry gets right and the walk confirms

- **Priming.** Fiora's ready in step 1 is paid *before* Malzahar's Add in step 2, so the War Camp build
  needs **1 Power** of priming. Correct as written.
- **The defender must survive, and must already control the battlefield.** 466.1.a.2 only recalls
  attackers *if defenders remain*, which is why Facebreaker stuns both sides; and **466.5/466.5.d** —
  *"the player with Units remaining here Establishes Control **if they didn't already control this
  Battlefield**"*, and establishing control *"results in a Conquer"* — is why the prerequisite insists the
  battlefield is already theirs. Otherwise every pass hands them a point.
- **Bonds of Strength, not Rally the Troops.** Bonds gives "+1 Might this turn" to units already on the
  board; Rally only buffs units played after it, which would force Malzahar to be replayed and enter
  exhausted (143.4). The entry says so.
- **Darius, Executioner is an alternative to the War Camp, not an addition.** With Darius supplying the
  aura, both units cross on the way home and no priming is needed — but then the Malzahar buff has to go,
  or he sits at 5 with Garen away and never re-crosses.
- **Nothing here is Energy-positive.** The loop makes bodies, not resources, and the entry's
  `terminatesIn` says exactly that. The finish is a wide board, Azir's token moves, or a Grand Plaza hold.

**Depends on no unruled reading.** Its R13 note is the one settled today on
`fiora-vault-breaker-jhin`: 807.1.d.1, 466.7.a and 709 together make each crossing a fresh
"becomes Mighty".
