# Hand walks — the three CHAIN finishers

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **All three HOLD.**

Issue #20 asked what to do with three entries that reach 8+ points but not in one scoring event. The
answer was a new class. **CHAIN = reaches 8 across several scoring events, without the opponent taking a
turn in between.** BURST keeps its strict meaning (one event), ENGINE would have been false because these
win, and ALT_WIN is reserved for a card that literally says you win.

The common check for all three: **471.1.b's Final Point restriction only reaches Conquer Gains**, and
471.1.a.1 exempts everything else — so none of these is stopped at 7.

---

## 1. `time-warp-hold-burst` — clear, take both, then three uninterrupted Beginning Phases — **HOLDS**

**OGN-122 Time Warp** ×3 · **UNL-180 The Ruination** (E9 P3, "Kill all units") ·
**UNL-069 Sprite Burst** (E5, "two **ready** 3 Might Sprites with `[Temporary]`") ·
**OGN-216 Soaring Scout** ×2 (Order, E2 M1)

| turn | event | points |
|---|---|---|
| N | The Ruination clears both battlefields; the two ready Sprites walk in and Establish Control — **two Conquers** (470 allows one Score per battlefield per turn) | **+2** |
| N | Soaring Scouts play **straight to the battlefields you control** (355.2.a) as the bodies that will still be there tomorrow | |
| extra 1 | the Sprites are `[Temporary]` and die at the start of the Beginning Phase **before scoring** (816.1.b) — the Scouts hold both | **+2** |
| extra 2 | Hold both | **+2** |
| extra 3 | Hold both | **+2** |

**8 from zero, and the opponent never takes a turn.** The Scouts are the whole reason the entry lists
them: 190.4.a keeps control while you have *any* unit there, and the Sprites will not be there.

- **Time Warp can never be recycled**: 427.1/427.2 place a banished card in Banishment, so all three copies
  must already be in hand. Renata's exhaust-free `Draw 1` can pull the whole deck first.
- **The Burn Out caveat is real for extra turns 1 and 2 but not the last one.** The Hold is the Scoring
  Step (315.2.b) and the Draw Phase is 315.4, two steps later — but the win itself only lands at the next
  Cleanup (472), so the earlier extra turns really do reach their Draw Phase. Leave a card in the deck.
- **Cost:** 3 Time Warps at 4 Mind Power each plus The Ruination's 3, so the infinite-Power line is not
  optional.

---

## 2. `bottled-constellation-time-warp` — three Main Phase starts, nine points — **HOLDS**

**VEN-067 Bottled Constellation** ×3 (Gear, Mind, E10 P2): "**At the start of your Main Phase**, you may
kill 3 other friendly units and/or gear to score 1 point." · **OGN-122 Time Warp** ×3

Turn N loops, plays the three Constellations (30E + 6P) and casts Time Warp. They cannot fire that turn —
their trigger is the Main Phase start, which is already past. Each of the three extra turns then opens
with three triggers: **kill 9 fodder, +3 points**, three times over. **Nine points, no opponent turn.**

**The fodder only exists because of today's Shadow's Call fix.** The Constellations fire at the *start of
the Main Phase*, so the bodies have to have been made on the previous turn and survived that turn's
Beginning Phase. Under the old reading of `lux-infinite-energy` — Shadow's Call pointed at a Recruit —
every pass marked a body `[Temporary]`, and 816.1.b would have killed them all before the Constellations
could eat them. Pointing Shadow's Call at Ekko instead leaves the Recruits clean, and this entry is
downstream of that.

The Burn Out caveat bites harder here than above, because the Constellation trigger is at the **Main Phase
start**, well after the Draw Phase (315.4) — every extra turn draws. 431.2.c is the right citation: Burn
Out hands an opponent a point.

---

## 3. `swain-double-conquer` — two Conquers in one turn — **HOLDS**, with the move route settled

**VEN-065 Swain, Visionary** ×3 (Mind, E6 P1 **M6**): `[Vision]` · "When I conquer, if you've played a
non-token unit, a non-token gear, and a spell this turn, **you score 1 point**."
**VEN-068 Jayce, Brilliant Inventor** · **OGN-104 Retreat**

`2 × (N + 1)` with N = 3 Swains: **4 at each battlefield, 8 in the turn.** The Score itself is 1 and each
Swain adds 1 (R2 = A makes those ability Gains, so 470 does not cap them and 471.1.a.1 exempts them from
the Final Point rule). The loop feeds Swain's clause every pass on its own — Ekko is the non-token unit,
Forge the non-token gear, Shadow's Call the spell.

**The open point in step 3 is settled, and against the entry.** 144.4 lists the Standard Move's
destinations as base → battlefield, battlefield → base, and battlefield → battlefield **only with
`[Ganking]`** (144.4.c). **Swain, Visionary has no Ganking.** So A → B is *not* a legal single move: each
Swain goes A → base → B, which is **two** Standard Moves and therefore **two readies each — six, not
three.** And the entry's fallback of Retreating each Swain and replaying it at base is dead for the same
reason the first version of this entry died: 143.4, units enter the board exhausted.

Six readies are affordable but they change the price. Jayce's "when you play me" fires on every play,
while "the first time you play a non-token gear each turn" fires **once in the turn** however many Jayce
objects appear — the loop plays Forge every pass, so that clause is spent almost immediately. Readies =
(Jayce plays) + 1, so **five Jayce plays**, each costing 6E + 1P plus a Retreat (1E) and the Retreat's
redraw (1E + 1 Mind). That is roughly **40 Energy and 10 Power**, so `needs` gains `infinite-power`.
