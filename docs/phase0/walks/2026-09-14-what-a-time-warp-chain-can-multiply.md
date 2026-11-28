# What a Time Warp chain can multiply, and why the catalogue already obeys a rule it never states

Issue #200, lane rc-synth4, 2026-09-14. Constructed, Duel (485). Rules version 2026-07-16, opened in
`data/Riftbound-Core-Rules-2026-07-16.txt`; card text verbatim from `data/corpus_flat.txt`.
Catalogue at 767 entries.

Reached while working the **mind/chaos** cell — 11 available finishers and **one** that spans, the
lowest span rate of any pair with four or more available, while being the richest point-card pair in
the game (five Mind sources, two Chaos, two colourless). The question *"which settled mechanism can
this pair reach that it has not"* pointed straight at `OGN-122 Time Warp`, because a Time Warp is
the only multiplier in the pool that acts on a **per-turn** point rather than on a conquer or hold
**effect**. Both of its obvious pairings are uncatalogued: `scripts/have.mjs` reports no entry using
either card set or any subset of one, for Time Warp with Yasuo and for Time Warp with Draven.

One of the two is refused by a rule. The other is not, and the rule that separates them turns out to
govern the whole CHAIN class.

---

## 1. The rule

`OGN-122 Time Warp` (Mind, E10 + 4 Power) reads *"Take a turn after this one. Banish this."* On that
extra turn the opponent has not acted, so **the board is exactly as you left it**. Whether a point
source pays again therefore depends on what its gate reads, and the Core Rules split the gates in
two.

**HOLD REPEATS.** 469.2: *"Hold: A player maintains Control of a Battlefield they did not yet Score
this turn during their Beginning Phase."* The verb is **maintains**, and *"this turn"* resets with
the turn, so 315.2.b.2 — *"The Turn Player Holds all Battlefields they Control"* — pays again on
every extra turn, for free, with nothing bought and nothing moved.

**CONQUER STARVES.** 469.1: *"Conquer: A player gains Control of a Battlefield they did not yet
Score this turn."* The verb is **gains**, and 348.2.a supplies the condition: *"If only one player's
Units remain at the Battlefield, and **if that player does not already Control the Battlefield**,
that player establishes Control over the Battlefield."* On the extra turn you already control what
you took, so there is nothing to gain.

**COMBAT STARVES, and harder.** 323.9 marks a Combat Staged only *"at each Battlefield that Contested
was applied to that have Units present controlled by opposing players"*. The opponent never took a
turn, so they never replayed a body: after you have cleared their garrisons there is no combat to be
had anywhere on the board, and no amount of your own mana fixes it.

**NOT-OPPONENT-GATED REPEATS.** A point whose condition reads only your own actions or your own board
is unaffected by the opponent's absence.

So: **to be multiplied by a Time Warp, a point source must be gated on something the opponent cannot
withhold and that you do not consume by scoring it.** Hold qualifies; so does an ability that reads
your own board. Conquer and combat do not.

### The conquer escape, stated because it is real and because it is expensive

Conquer's starvation is not absolute. 323.6 strips Control *"of any controlled Battlefields without
their Units occupying them if the turn is in an Open State and there is no Showdown or Combat ongoing
there"* — so you may walk a garrison off, lose the battlefield at that Cleanup, walk back in, and
Conquer it again on the same extra turn. It costs **two Standard Moves per body per turn** (144.4.b
then 144.4.a) with a ready in between, and 144.2 charges each one an exhaust. `OGN-035 Vayne, Hunter`
is the pool's card for doing it cheaply — *"When I conquer, you may pay 1 Energy to return me to my
owner's hand"* — and this catalogue already records it reaching the two-Conquer ceiling on one unit
card. **No Time Warp entry in the catalogue pays that price**, which is consistent with it being
expensive rather than with it being illegal.

## 2. The catalogue obeys this and has never said so

Eleven entries use `OGN-122`. Classifying each by the gate of whatever point card it carries:

| entry | point card | gate |
|---|---|---|
| `gutter-palace-keeper-time-warp` | `UNL-088 Gutter Palace` | own hand + own units |
| `bottled-constellation-time-warp` | `VEN-067 Bottled Constellation` | start of your Main Phase |
| `renata-time-warp-ekko-refresh` | `SFD-088 Renata Glasc, Mastermind` | your activated ability |
| `grand-plaza-loop-time-warp` | `OGN-293 The Grand Plaza` | **hold** |
| `power-nexus-atlas-sentinel-time-warp` | `SFD-214 Power Nexus` | **hold** |
| `power-nexus-benefactor-sentinel-time-warp` | `SFD-214 Power Nexus` | **hold** |
| `sentinel-trinity-time-warp-chain` | `SFD-115 Trinity Force` | **hold** |
| `shen-sentinel-time-warp-chain` | `VEN-138 Shen` | **hold** |
| `time-warp-hold-burst` | — | hold, by its own name |
| `applied-researchers-time-warp-discount` | — | ENGINE, no point card |
| `promising-future-time-warp-queue` | — | ENGINE, no point card |

**Eleven of eleven consistent, zero violations.** Every one of the eight that carries a point card
carries a HOLD-gated or a not-opponent-gated one, and not a single Time Warp entry in 767 stands on a
conquer or a combat. That is a prediction derived from 469.1, 469.2, 348.2.a and 323.9 and then
checked against the whole catalogue, not a pattern read off it afterwards.

`CLAUDE.md` carries the combat half of this, from the #193 close-out: *"A TIME WARP CHAIN STARVES ANY
CONQUER ENGINE WHOSE PAYOFF NEEDS COMBAT"*, with the standing question *"does this payoff need an
enemy garrison?"* The general form is one clause wider on each side — **conquer starves on its own,
with no combat needed to explain it, and hold is the positive half that says which sources are
multipliable at all** — and it turns a refusal test into a design rule for the class this project
records as the only finisher class with room.

## 3. What it does to mind/chaos, which is why it was opened

Chaos prints exactly two point cards and the rule separates them:

- **`SFD-148 Draven, Audacious`** — *"The first time I win a combat each turn, you score 1 point."*
  **Refused.** A Duel has two battlefields (485.4); three Draven clear one on turn N for four points
  (three abilities under 466.3.c plus the Conquer) and the other on turn N+1 for four more, which is
  eight — but that second turn does not need a Time Warp, it needs the Dravens to walk from one
  battlefield to the other, and Draven has no [Ganking] so 144.4 makes that base-and-back over two
  turns. Split them across both battlefields on one turn instead and it is **five**, after which the
  board holds no enemy unit and every further extra turn is worth zero. The card is worth running; a
  Time Warp is not what makes it work.
- **`OGN-205 Yasuo, Windrider`** — *"The third time I move in a turn, you score 1 point."* **Not
  refused.** Its gate is your own movement, the count resets with the turn, and 315.1.b readies him at
  the extra turn's Awakening. **Yasuo is the only point card outside Mind whose gate a Time Warp can
  multiply.**

Swept over all sixteen point-gaining cards and folded by domain, the Time-Warp-compatible set is:
calm `OGN-066 Ahri`; body `SFD-115 Trinity Force`; order `VEN-138 Shen` and `UNL-177 Ivern`;
colourless `OGN-293 The Grand Plaza` and `SFD-214 Power Nexus`; chaos **`OGN-205 Yasuo`**; and the
Mind four. **Fury's only point card is `OGN-034 Tryndamere, Barbarian`, which is combat-gated — so
fury is the one domain that can contribute no point at all to a Time Warp chain**, whatever legend it
is paired with.

## 4. Why I am not staging a Yasuo × Time Warp entry, with the arithmetic

The rule licenses it and the mana refuses it. Each Yasuo gets **one** free Standard Move a turn
(144.2 charges its exhaust, 315.1.b gives it back at the next Awakening) and needs **two more** for
the third-move trigger. Three Yasuo over a three-turn chain is **eighteen bought moves**, against a
pool whose cheapest repeatable buyer, `OGN-173 Ride the Wind` (Chaos, E2 + 1 Power), is a spell
capped at three copies by 103.2.b. Scale it down to one Yasuo over three turns and it is three points
for six bought moves, against two Time Warps at E10 + 4 Power each — and a deck holding both
battlefields for those three turns was already being paid two a turn by 315.2.b.2 and did not need
the package. **The line is legal, arithmetically bounded, and worse than the free curve it would be
riding on.** That is a refusal with a number rather than a shrug, and it is the same shape as the
fury/chaos refusals in the companion walk.

## 5. What a reader should take

1. **A Time Warp multiplies a RATE, and a rate only exists where the gate survives the opponent's
   absence.** 469.2's *"maintains"* against 469.1's *"gains"* is the whole distinction, and it is two
   adjacent paragraphs nobody had read against each other.
2. **The catalogue was already right, eleven times out of eleven, without the rule being written
   down.** That is worth more than a correction would have been: it means the constraint is being felt
   by authors card by card, and stating it saves the next one the derivation.
3. **The design rule for the CHAIN class**, which `CLAUDE.md` records as the only finisher class with
   room: an Additional-Turn CHAIN must admit Mind (Time Warp is the pool's only extra-turn source),
   **and** its point source must be Hold-gated or not-opponent-gated. Those two together are a much
   narrower search than "find a CHAIN".
4. **Fury cannot contribute a point to one at all**, and that is a fact about a domain rather than
   about a card.

## 6. The rule applied: the two empty Mind cells, disposed of

A Time Warp is Mind, so an Additional-Turn CHAIN lives in one of five identities. Folded by the
non-legend cards of the eleven entries: **mind/order 5, mono-mind 4, mind/body 1, mind/chaos 1** —
and **mind/calm and mind/fury have none at all.** Both are refusals, and each for its own reason.

**mind/fury is refused by this walk's own rule.** Fury's only point card is `OGN-034 Tryndamere,
Barbarian` and §3 shows it is combat-gated, so fury can contribute no point to an extra turn. Every
point in such a chain would therefore come from Mind or from colourless — which is exactly the card
set of `power-nexus-atlas-sentinel-time-warp`, already catalogued as mono-Mind. A fury card could
only add a body or a protection, which changes the shell and not the line. **There is no spanning
mind/fury Time Warp chain to find, and the reason is a property of a domain rather than a gap.**

**mind/calm is refused by arithmetic instead.** Calm's point card is `OGN-066 Ahri, Alluring` —
*"When I hold, you score 1 point"* — which IS Hold-gated and therefore Time-Warp-compatible, so the
rule permits it. It is `ahri-blue-sentinel-hold` that refuses it: three Ahri under two
`UNL-087 Blue Sentinel` already fire nine ability instances **in a single Hold**, so the line reaches
eight without an extra turn and a Time Warp at E10 + 4 Power would buy a second helping of a meal
already finished. **A Time Warp is worth nothing to a rate that already clears the Victory Score in
one turn**, which is the boundary of the rule from the other side: it multiplies a rate of three to
seven, and below three it is too slow while at eight or more it is redundant.

## 7. Worth pinning, and it is the manager's path rather than mine

The §2 result is **clean at eleven of eleven and rules-grounded**, which by this project's own
standard is exactly the shape worth pinning while it is free: *no entry using `OGN-122` may carry a
point card whose gate is a Conquer or a combat win.* A violation would not be a matter of taste — its
arithmetic would over-count, because the second and third turns of the chain would be priced as if
they paid and 348.2.a or 323.9 would give them nothing.

The assertion is one sweep: for every entry whose `uses` contains `OGN-122`, no `uses` card may be
`VEN-046`, `VEN-065` (conquer-gated) or `OGN-034`, `SFD-148` (combat-gated), with `UNL-177 Ivern,
Friend to All` **excluded by name and with its reason**, because 823.1.b makes *"when I conquer or
hold"* both kinds of effect and its hold half survives the extra turn. Offered rather than written:
`test/` outside `test/dom/plays.dom.test.ts` is not this lane's path.

## 8. Open

- **`SFD-214 Power Nexus` is Hold-gated, colourless, and payable out of runes in any identity**
  (444.2.c with 164.2, which this lane established in the companion walk). It is therefore a
  Time-Warp-compatible point source available to **every** legend pair, and it appears in six entries.
  Whether any identity without a catalogued Time Warp chain can now build one on it is not walked
  here.
- **`UNL-177 Ivern, Friend to All` reads *"When I conquer or hold"***, so 823.1.b's shape makes it
  both — the only point card that is Time-Warp-compatible through its hold half while also paying on
  a conquer. No Time Warp entry uses it.
