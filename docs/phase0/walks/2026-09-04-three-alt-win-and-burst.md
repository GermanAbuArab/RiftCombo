# Hand walks — `gutter-palace`, `grand-plaza-recruit-vanguard`, `blue-sentinel-trinity-force-hold`

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16

Three short walks done together because they share the same timing skeleton. All three **hold**; one
needed a quantity correction of the same kind found in `ahri-blue-sentinel-hold`.

## The shared skeleton: what happens at the start of your turn

Read from 315.2–315.4, and it settles the timing question in all three lines:

| Order | Phase / Step | What fires |
|---|---|---|
| 1 | **315.2.a Beginning Step** — "At the start of Beginning Phase game effects take place." | `gutter-palace`'s win check |
| 2 | **315.2.b Scoring Step** — "The Turn Player Holds all Battlefields they Control." | every Hold trigger: Grand Plaza, Trinity Force |
| 3 | 315.3 Channel Phase — channel 2 runes | — |
| 4 | **315.4 Draw Phase — "The Turn Player draws 1."** | — |

**The draw is two phases after the checks.** That is the fact `gutter-palace` lives on: its count is
taken against the hand you passed the turn with, not that hand plus a card.

---

## 1. `gutter-palace` — ALT_WIN, one card. **HOLDS.**

**UNL-088 Gutter Palace** (Gear, Mind, E4): "At the start of your Beginning Phase, if you have exactly
4 cards in hand and exactly 4 units at battlefields, you win the game. Discard 1, exhaust: Play a 1
Might Bird unit token with [Deflect]."

- **195**: "A player also wins the game if an effect instructs them to do so." ✓
- The tuning ability moves both counters at once, in the same direction the check needs: **hand −1,
  units +1**. That is what makes a single card able to land on 4/4.
- The Bird can reach a battlefield. **355.2** — "For Units, choose a valid Location where that Unit
  will enter upon being Played" — and **355.2.a**: "By default, Valid locations include the
  controller's Base or a Battlefield the controller [controls]." The instruction names no location, so
  the ordinary choice applies and a battlefield you control is valid. Had the default been Base-only
  the card would tune only the hand and the entry's step 1 would be wrong; it is not.
- Gear enters ready (143.4 makes *Units* enter exhausted and says nothing about Gear), so the ability
  is available the turn Gutter Palace lands. It exhausts, so **one adjustment per turn**.
- Timing: set 4/4 during your turn, pass, and the check fires in the Beginning Step before the Draw
  Phase adds a card.

**Correction to the entry's Temporary note.** It asserted that Temporary units "die before the check
(816.1.b) and do not count". 816.1.b is "At the start of this permanent's controller's Beginning Phase,
**before scoring**, kill this" — before *scoring*, which is step 315.2.b, while Gutter Palace's check is
step 315.2.a. Both trigger at the same instant and both are yours, so **383.3.d** puts the order in your
hands: "If more than one Triggered Ability is Triggered simultaneously, then the player that controls
the Abilities selects the order to place them on the Chain." Whether a Temporary body can therefore be
counted is a live question, not the settled no the entry claimed. Reworded to say so.

**What ends it:** the opponent gets a whole turn at your 4/4. Killing one unit at a battlefield breaks
it. `[Deflect]` on the Bird (opponents pay a rainbow to choose it) is the only protection in the card.
Time Warp (OGN-122) removes the exposure entirely by giving you the next Beginning Phase with no
opponent turn in between — remember Time Warp itself leaves the hand, so count it.

---

## 2. `grand-plaza-recruit-vanguard` — ALT_WIN, two cards. **HOLDS.**

**OGN-293 The Grand Plaza** (Battlefield, Colorless): "When you hold here, if you have 7+ units here,
you win the game."
**OGS-015 Recruit the Vanguard** (Spell, Order, E6): "Play four 1 Might Recruit unit tokens. (They can
be played to your base **or to battlefields you control**.)"

- Two Vanguards make **eight** Recruits, and the reminder text explicitly permits a battlefield you
  control as the destination, so all eight can land on the Plaza. Seven is the bar, so one may die.
- The Recruits carry no Temporary, so 816.1.b never touches them and they survive to the Scoring Step.
- The win resolves through the Hold in **315.2.b**, and **195** does the rest.
- Cost is 12 Energy for the pair, which is why the entry notes it takes the whole Rune Deck in one turn.
- The Plaza must already be yours before the Vanguards resolve, because that is the permission the
  reminder text grants. The entry already says this.

**Worth adding: the card is symmetric.** "When **you** hold here" reads for whoever holds it, so an
opponent parking seven units on the Plaza wins the same way. A Plaza you cannot hold is a liability,
not a dead card.

**What ends it:** losing control of the Plaza, or being cut below seven units during the opponent's
turn.

---

## 3. `blue-sentinel-trinity-force-hold` — BURST. **HOLDS, after the same off-by-one fix.**

**UNL-087 Blue Sentinel** (Unit, Mind, E4 P1 M4): `[Shield 2]` · "Your hold effects for holding here
trigger an additional time."
**SFD-115 Trinity Force** (Gear, Body, E4, **M+2**): `[Equip] [Body]` · **"[Effect] When I hold, score
1 point."**

### Why the Gear's line becomes the unit's line

This is the same Effect Text chain as Svellsongur, but **native rather than copied**, so it does not
need 725.1 at all:

- **136.2.b** — "Effect Text is inactive unless the card with the Effect Text is Attached to another
  card." It is attached.
- **136.2.c / 718.3** — "The abilities in the Effect Text section of a card are appended to the Rules
  Text of the card to which the card with the Effect Text is Attached."
- **136.2.d** — in Effect Text, "this" and the gear's own name mean the gear, but **"I" and "me" mean
  the Top-Most Card**. The rules' own examples say so: Guardian Angel ("If **I** would die, kill
  **Guardian Angel** instead") and Brutalizer ("If **this** was attached to **me** this turn").

So the unit carrying a Trinity Force has "When I hold, score 1 point", and it is a Hold Ability of a
**Unit** under **383.4.d.2.a**. **R2 = A** makes that an ability Gain (194.1.c) outside 470's cap, and
**R1 = A** makes each Blue Sentinel add one instance to it. Nothing here is unruled — the entry's own
"that reading is arguable" note referred to the 471.2.c question the user ruled on 2026-09-03.

### The arithmetic, and the same bug

**Points per Hold = 1 + T × (1 + K)**, T = Trinity Forces on units present, K = Blue Sentinels present.

The entry asked for **T=2, K=2**, which its own printed formula gives as **7** — one short of the 8 that
BURST claims, exactly as in `ahri-blue-sentinel-hold`.

**Trinity Force is not `[Unique]`** (compare Forgefire Cape, which prints the keyword), and 434.1.b.1
contemplates "more than one card attached to the Top-Most card", so T is not tied to the number of
bodies. With K=2 Sentinels you may stack all three Trinity Forces across them.

| Board | T, K | Points | Cost |
|---|---|---|---|
| 2 Sentinel + 3 Trinity Force | 3, 2 | **10** | 20 Energy |
| 3 Sentinel + 2 Trinity Force | 2, 3 | 9 | 20 Energy |
| 2 Sentinel + 2 Trinity Force (as authored) | 2, 2 | **7** | 16 Energy |

Corrected to **3 Trinity Forces + 2 Blue Sentinels**: 10 points for 20 Energy across **two bodies**.
That beats the corrected Ahri line (10 points, 23 Energy, five bodies) on both counts, and the two
bodies defend at 4 + 2 (Shield 2) + 2 per Trinity Force attached.

**What ends it:** the same single point of failure as the Ahri line — losing one Sentinel drops K to 1
and the total to 7. Two bodies are easier to protect but also easier to answer.

## Links
- Entries: `data/combos.json` → the three ids above
- Rulings R1 and R2: issue #11 · the Effect Text chain also written up on #11 (R6 narrowing)
- Sibling walks: `2026-09-04-jhin-fiora-facebreaker-recall.md`, `2026-09-04-ahri-blue-sentinel-hold.md`
