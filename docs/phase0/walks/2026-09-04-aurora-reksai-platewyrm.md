# Hand walks — Aurora, Rek'Sai and the Platewyrm Eggs

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **All three HOLD**, one after a
citation fix.

Two of these entries made opposite claims about the same rule. Only one can be right, and the rule text
settles it flatly — which is why the citation audit is worth running on every walk.

---

## 1. `dazzling-aurora-elder-dragon` — **HOLDS**, with a wrong citation removed

**OGN-160 Dazzling Aurora** (Gear, Body, E9 P2): "At the end of your turn, reveal cards from the top of
your Main Deck **until you reveal a unit** and banish it. Play it, ignoring its cost, and recycle the rest."
**UNL-118 Elder Dragon** (Body, E12 P4 M10): "**Any amount of your damage is enough to kill enemy units.**
When you play me, choose up to one enemy unit at **each location**. Deal 1 to them."

- **The timing works.** 317.1 is the **Ending Step**, *"At the end of the turn Game Effects take place"*,
  and the Rune Pool only empties two steps later at 317.2.d, in the Expiration Step. So Aurora resolves
  with resources still payable.
- **"Each location" is at most three in a 1v1.** 198.1 — *"Locations include the Battlefields and the
  Bases"* — and 485.4 gives a Duel two battlefields, so enemy units can stand at two battlefields plus the
  enemy base. One kill per location, never a sweep. The entry already carries this correction.

**The bug: the entry claimed the reveal can Burn Out and cited 431.1.c for it.** 431.1.c says the
opposite — *"that player looks at or Reveals as many as possible, **but does not Burn Out**, then proceeds
with the rest of the instruction"* — and 431.1.c.1 closes the door completely: *"If there are insufficient
cards among the looked at or revealed cards to perform subsequent actions … any further instructions are
ignored. **This does not cause a Burn Out, even if those instructions would cause those cards to change
zones.**"* So a deck with no units left reveals itself, banishes nothing, and costs no point. The
supposed price of thinning the deck to raise the Dragon hit rate does not exist. Removed.

**Second over-restriction removed:** the entry said Deflect's rainbow was payable *"only if a rune was left
ready"*. 164.2.b makes a rune's Power ability **"Recycle this: [Reaction] — Add [C]"**, with no exhaust in
its cost, so any rune still on the board pays it, ready or not.

---

## 2. `reksai-undertitan-reveal` — **HOLDS**

**SFD-170 Rek'Sai, Swarm Queen** (Order, M5): "When I attack, you may reveal the top 2 cards of your Main
Deck. You may banish one, then play it. … Recycle the rest."
**SFD-175 Undertitan** (Order, E6 P1 M5): "**As I'm revealed from your deck, [Add] 2 Energy.**"

- This entry had 431.1.c **right**, and it is the reason the engine is playable at all: you may reveal
  past the end of a two-card deck without penalty. Only *drawing* past the end costs a point.
- **R22 does not move the number.** Whether "Recycle the rest" still fires when nothing was banished
  decides only whether the two Undertitans go to the bottom of a two-card deck or stay on top — the same
  two cards are revealed next attack either way. The engine is +4E per reveal under both readings.
- **The decay the entry states is right.** The Draw Phase strips one card a turn, so three copies buy one
  clean turn at +4E per reveal, then +2E, then nothing — and the turn after that the Draw Phase itself is
  a real Burn Out (431.1.a, 431.2).
- Rek'Sai is already Mighty at 5, so Fiora, Worthy never triggers for her — 709 needs a crossing from
  under 5.

---

## 3. `platewyrm-egg-defender-gate` — **HOLDS**

**VEN-075 Platewyrm Egg** (Gear, Body, E3): "**This enters exhausted.** `[Empower]` 1 Energy, exhaust. ·
`[Reaction][>]` exhaust: Add 1 Energy. **If this is `[Empowered]`, Add 2 Energy instead.**"
**VEN-149 Defender of Tomorrow** (Legend, Mind/Body): "`[Empowered][>]` 1 Energy, exhaust: **Ready 2 gear**."
**VEN-150 Acceleration Gate** (Spell, Mind/Body, E3 P1): "Ready up to 4 units, gear, and/or runes."

- **167 is the trap the entry already documents** and it holds: the Rune Pool empties at the start of the
  Main Phase, so nothing may be banked during Awaken. Three Empowered Eggs are +6E **in the Main Phase**.
- **The Repeat trap is real.** 820.1.d — Repeat *"execute[s] the instructions of this chain item one
  additional time **during resolution**"* — and 820.1.c.3 caps it at one payment. Both executions sit
  inside one resolution, so there is no cost-payment window to re-exhaust the Eggs between them (429.3).
  That is R21's conservative reading, and it is the one the entry uses: the claimed output never touches
  the Portal, so **R21 cannot make this entry overclaim** — the other reading would only make it stronger.
- **164.2.a/b explains why the Gate's rune readies are worth so little**: a rune gives Energy by
  **exhausting** and Power only by **recycling**, and a recycled rune leaves the board and cannot be
  readied back. The bare Gate at +4E −1P really does beat the Portal version at +5E −3P.
- **416.5 backs the refuted Garbage Grabber variant**, with Garbage Grabber as the rule's own example:
  *"If 2 or more cards are Recycled to the Main Deck simultaneously, they are placed on the bottom of that
  deck in a **random order**."*
