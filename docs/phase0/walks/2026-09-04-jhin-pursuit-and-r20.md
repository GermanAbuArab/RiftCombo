# Hand walk — `jhin-relentless-pursuit-wallop`, and R20 retired

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **HOLDS.**

## R20 is settled by rules text

R20 asked: does walking **unopposed** into an enemy battlefield open a Non-Combat Showdown before control
and the Conquer land (giving a window to play Actions inside), or is 466.5 — the combat path — the only
route, with no window? The Core Rules give the non-combat path its own numbers:

- **344.2** — *"If Control of a Battlefield is Contested, **there aren't units controlled by different
  players there**, and the turn is in a Neutral Open State, **a Showdown is opened during the next
  Cleanup**."* That is the unopposed entry, exactly.
- **348.2 / 348.2.a** — *"If it is a **Non-Combat Showdown**, do the following: If only one player's Units
  remain at the Battlefield, and if that player does not already Control the Battlefield, that player
  **establishes Control**."*
- **348.2.a.1** — *"**This results in a Conquer** if that player has not yet scored that Battlefield this
  turn."*

So control and the Conquer land at the **close** of a Non-Combat Showdown, on a path parallel to 466.5's
combat path — and the showdown really is a window: **345** gives Focus to the player who applied Contested,
and **347.1** lets the player with Focus *"Play a Card or Activated Ability that is legally timed"*.
Retired like R9, R27 and R29.

## The six moves

**UNL-022 Jhin** (M4, `[Ganking]`): "When I move, [Add] 1 Energy + 1 rainbow."
**SFD-184 Relentless Pursuit** (Fury/Body, E2 P1, `[Action]`): "Move a friendly unit. You may attach up to
one Equipment with the same controller to it. This turn, that unit has **'When I conquer, you may move me
to my base.'**"
**SFD-108 Warmog's Armor** (Body, E1, `[Equip] Body`): `[Effect]` "When I conquer, **buff me**."
**OGN-146 Wallop** (Body, E2, `[Action]`): "you may spend a buff as an additional cost. If you do, ignore
this spell's cost. **Ready a unit.**"

| # | move | how |
|---|---|---|
| 1 | base → battlefield 1 | Relentless Pursuit (2E+1P), attaching Warmog's free. Showdown opens (344.2); at its close Jhin conquers (348.2.a.1) for **+1 point** |
| 2 | battlefield 1 → base | the Conquer fires Warmog's (**+1 buff**) and Pursuit's granted clause. **Effect moves, so he is still ready** (144.2) |
| 3 | base → battlefield 2 | Standard Move; **exhausts him**, opens the second showdown |
| 4 | battlefield 2 → base | inside that showdown, Wallop spends the Warmog's buff (free) to ready him; at the close he conquers for **+1 point**, Warmog's re-buffs because the first was spent (702.3), and the clause bounces him home ready |
| 5 | base → battlefield 1 | already scored, so 470 blocks a second Conquer — and **383.4.c.2.a requires the player to gain 1 Victory Point**, so no Warmog's buff and no bounce either |
| 6 | battlefield 1 → base | the second Wallop, played in that showdown, spends the second buff to ready him; Standard Move home |

**Six moves: +6 Energy and +6 rainbow gross, net +4 Energy and +5 Power** after Relentless Pursuit's
2E+1P (both Wallops are free), **plus 2 points**.

## What the rules pin down that the entry only asserted

- **383.4.c.2.a** — a Conquer Effect fires for a Unit *"present at a Battlefield when a player gains
  control of it **and gains 1 Victory Point** from Conquering."* That "and gains 1 Victory Point" is what
  makes move 5 barren, and it is the reason the engine stops at six moves rather than cycling forever.
- **136.2.d** makes Warmog's `[Effect]` "me" the Top-Most Card, so the buff lands on Jhin.
- **144.2** — exhausting is the **cost** of a Standard Move — is why moves 2 and 4 leave him ready and only
  3, 5 and 6 need a ready Jhin, which the two Wallops supply.
- **144.1.c** forbids a Standard Move during a showdown, so move 6 waits for the one move 5 opened.
- **Both battlefields must be enemy-controlled and empty**: empty is what makes 344.2 apply instead of a
  Combat, and enemy-controlled is what makes the entry a Conquer rather than a walk-in on your own ground.
  This is also why the earlier Twilight Reveler write-up failed — the same emptiness that makes the
  conquers free rules out the Combat an Attack Trigger needs (383.4.e, 461).
