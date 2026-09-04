# Hand walks — the two Skyfall conquer bursts

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **Both HOLD.**

`brambleback-trinity-skyfall-conquer` and `skyfall-ahri-conquer` were the two BURSTs the arithmetic
audit cleared as correct-as-declared. This walk checks their mechanism, and closes the one open
question the first of them carried in its notes.

## The bridge card

**SFD-030 Skyfall of Areion** (Gear, Fury, E3, M+2): `[Equip] 1 Energy + Fury` · **"[Effect] My hold
effects are also conquer effects, and vice versa."**

Both lines run on hold-effect cards and cash them in on a Conquer instead, which reaches the points a
turn earlier than waiting for a Beginning Phase and does not require surviving an opponent turn.

## The open question, closed

`brambleback-trinity-skyfall-conquer`'s notes flagged: *"whether Skyfall's 'my hold effects' covers
effects GRANTED by other Equipment."* It does, and the rule that settles it is **136.2.d** — the same
one that settled Svellsongur:

- 136.2.d: Effect Text referring to "this" or the attached card's own name means **the gear**; but "I"
  and "me" mean **the Top-Most Card**. The rules' worked examples are Guardian Angel ("If **I** would
  die, kill **Guardian Angel** instead") and Brutalizer ("If **this** was attached to **me**").
- "**My** hold effects" is the possessive of "me", so Skyfall reads as **the unit's** hold effects.
- Trinity Force's "When I hold, score 1 point" is likewise appended to the unit's Rules Text (136.2.c /
  718.3) with its "I" resolving to the unit.
- So the granted ability *is* one of the unit's hold effects, and Skyfall converts it. The entry's own
  "yes on the plain reading" was right, and it is not merely plain — it is what 136.2.d says.

The other caveat in both entries ("that reading is arguable") is the 471.2.c question, which the user
**ruled as R1 = A on 2026-09-03**. Neither line has anything open left.

---

## 1. `brambleback-trinity-skyfall-conquer` — 10 points on a Conquer

Board: **2 Red Brambleback + 3 Trinity Force + 1 Skyfall of Areion**, all the gear on one Brambleback.

1. Equip the carrier with three Trinity Forces and the Skyfall. Might 4 + 6 + 2 = 12.
2. Standard-Move both Bramblebacks to the target battlefield (144.4.a; the move costs exhausting them,
   144.2). They take the Attacker designation.
3. Win, and Establish Control. **466.5** only grants Establishing Control to a player who "didn't
   already control this Battlefield", and **466.5.d** makes that a Conquer when they have not yet scored
   it this turn. The Conquer pays 1.
4. Skyfall makes each Trinity Force's "When I hold" a conquer effect, and **UNL-029 Red Brambleback**
   ("Your conquer effects for conquering here trigger an additional time") makes each fire 1 + K times.
   T=3, K=2 → **9** on top of the 1. **Total 10.**
5. Conquering from 0 is safe: **471.1.b**'s Final Point restriction only bites within 1 of the Victory
   Score, and **471.1.a.1** exempts non-Conquer Gains regardless.
6. The conquer path is the exact mirror of the hold path — **383.4.c.2.a** puts each present unit's
   conquer ability on the chain once the player gains control and gains a point from Conquering.

**Better than the Tryndamere line on two counts**, as the entry says: no excess-damage clause (so no
dependency on the undefined term filed as R28) and fewer bodies.

---

## 2. `skyfall-ahri-conquer` — the same trick without granted text

Board: **3 Ahri, Alluring + 3 Skyfall of Areion + 2 Red Brambleback**, one Skyfall per Ahri.

Simpler than the first, because here Skyfall converts each Ahri's **own** printed hold effect ("When I
hold, you score 1 point") rather than one granted by another gear — the reading that needed 136.2.d in
the Trinity line is not even required here.

Points = 1 + A × (1 + K) with A=3 Ahri carrying Skyfalls and K=2 Bramblebacks → **10**, as declared.
R2 = A keeps Ahri's card-text point outside 470's cap; R1 = A supplies the multiplier.

Cost is the higher of the two: three Ahri at 5 Energy plus three Skyfalls at 3 (and a Fury Power each to
equip) plus two Bramblebacks at 4. It buys resilience — the points are spread over three bodies instead
of concentrated on one carrier.

## Links
- Entries: `data/combos.json` → both ids
- R1, R2 rulings: issue #11 · the Effect Text chain is written up there as the R6 narrowing
- Sibling walk: `2026-09-04-ahri-blue-sentinel-hold.md` (the hold-side version of the same machinery)
