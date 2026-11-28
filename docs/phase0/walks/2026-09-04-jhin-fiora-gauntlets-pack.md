# Hand walks — Jhin under Fiora, the Gauntlets, and the Pack treadmill

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **All three HOLD.**

---

## 1. `fiora-vault-breaker-jhin` — two conquers and three free moves — **HOLDS**

**SFD-180 Fiora, Worthy** (Order, E3 M3): **"When a unit you control becomes [Mighty], you may pay 1 Order
to ready it."**
**UNL-010 Vault Breaker** (Spell, Fury, E1 P1, `[Action]`): "Give a unit **[Assault 2]** and [Ganking] this
turn."
**UNL-022 Jhin, Murderous Artist** (Fury, M4, `[Ganking]`): "When I move, [Add] 1 Energy + 1 rainbow."

**R13 is textual, not a reading**, and the three rules that settle it read cleanly in sequence:

- **807.1.d.1** — *"Assault remains in effect **as long as the Unit maintains the Attacker designation**."*
- **466.7.a** — at the end of combat, *"Remove Attacker and Defender Designation from all Units and Players."*
- **709** — *"A Unit 'becomes Mighty' at the moment its Might changes from being less than 5 to being 5 or
  greater,"* with the rules' own example being exactly a Might 4 unit gaining +1.

So Jhin is 6 while he holds the designation and 4 the instant combat ends, and the next combat is a fresh
crossing — a fresh Fiora trigger each time.

| # | action | moves |
|---|---|---|
| — | Vault Breaker on Jhin | −1E −1P |
| 1 | Standard Move to garrisoned battlefield 1 | +1E +1 rainbow, exhausts him |
| | Combat: Attacker → 6 Might → Mighty → Fiora readies for 1 Order. He still **cannot move** while it is open (144.1.c). Combat ends, conquer | **+1 point** |
| 2 | Standard Move (Ganking) to garrisoned battlefield 2 | +1E +1 rainbow |
| | Mighty again, ready again for 1 Order, conquer | **+1 point** |
| 3 | Standard Move home, since Fiora left him ready | +1E +1 rainbow |

**+3E +3 rainbow gross; net +2 Energy and zero Power** after Vault Breaker's 1 Power and two Order for the
readies — plus the two conquers, which are the real payout. Both enemy battlefields must be **garrisoned**:
Assault only applies while the unit is an attacker (807.1.d), the designation exists only inside a Combat
(464.2.c), and a Combat needs units from two opposing players (461). The entry says so. Its R14 note only
*caps* the engine (re-entering a conquered battlefield adds nothing), so it cannot overclaim.

---

## 2. `gauntlets-enforcer-conquer` — the only Fury/Order line — **HOLDS**

**UNL-187 Piltover Enforcer** (Legend, Fury/Order): "When you conquer, if you assigned **3 or more excess
damage**, you may exhaust me to ready a unit."
**UNL-188 Hextech Gauntlets** (Gear, Fury/Order, E3 M+3): **"`[Equip]` 3 Energy + 1 rainbow. This ability's
Energy cost is reduced by the Might of the unit you choose."** · `[Effect]` "When I conquer, if you
assigned 3 or more excess damage, draw 1."

- **R28 = A**, ruled today, is what gives the shared condition a value at all.
- **The Equip is not free**, and the printed text is unambiguous: the reduction is on *"this ability's
  **Energy** cost"*, so a 3+ Might bearer zeroes the Energy and the **rainbow Power is still paid**. The
  earlier note calling it free was wrong; the REFUTE caught it and the entry now records it.
- The `[Effect]` "When I conquer" is the bearer's own trigger by 136.2.d, the same chain as World Atlas and
  Trinity Force.
- **Additive, not multiplicative:** both triggers share one condition and each fires once per Conquer.

---

## 3. `pack-of-wonders-bewitching-discard` — a treadmill until the second Pack — **HOLDS**

**OGN-181 Pack of Wonders** (Gear, Chaos, E2): "**exhaust**: Return **another** friendly gear, unit, or
facedown card to its owner's hand."
**UNL-121 Bewitching Spirit** (Unit, Chaos, E3 M2): "When you play me, choose a player. They discard 1."

- **149.1 — "Gear enter play Ready."** So a Pack played this turn can exhaust immediately, which is what
  makes three Packs worth three cycles in one turn rather than three turns.
- Each Pack readies only in your Awaken (315.1.b), so it is **one bounce per Pack per turn**. Three Packs
  cycle the Spirit three times for 9 Energy in replays, plus 2 Energy per Pack once.
- **"Another"** stops a Pack bouncing itself, so the Spirit is the target. Correct as written.
- **One Pack is a treadmill**: the opponent draws 1 every Draw Phase (315.4.b), so the hand only shrinks
  from two Packs up. The entry leads with this, which is the honest way to list it.
