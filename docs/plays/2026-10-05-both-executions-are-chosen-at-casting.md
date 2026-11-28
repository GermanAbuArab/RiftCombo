# Play — both executions are chosen when you cast it, so the second can be eight to one body

Issue #256 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `rocket-barrage-marai-spire-repeat-base-damage`**, the mono-Mind ENGINE in which
`SFD-077 Rocket Barrage` with its [Repeat] buys both of its modes for one card, with `SFD-211 Marai
Spire` taking 1 Energy off the Repeat while you control it. The entry is right that the second
execution may choose differently. Walked as a game, the decisive fact is **when** both choices are
made: at casting, before either resolves, so the second execution cannot react to the first — and
the same target twice is eight damage to one body in a base, which is the use the entry does not
list.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `2374ce6`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 85 of them with no play**.
The pick is by global rank, skipping entries that already have a play: this entry is rank 14 (two
hits on *first*), second in the list. The other entry of this slice is rank 13, played in
[the faucet is also the landing pad](2026-10-05-the-faucet-is-also-the-landing-pad.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Mind in its pair (103.1.b) |
| **The spell** | `SFD-077 Rocket Barrage` (Mind, E4 + 1 Power, [Repeat] E4 + 1 Mind), cast in your Main Phase |
| **A target** | an enemy unit in their base, or a gear |
| **Optional** | `SFD-211 Marai Spire`, controlled: the Repeat costs E3 + 1 Mind |

The card text the play turns on:

- Rocket Barrage: *"[Repeat] :rb_energy_4::rb_rune_mind: (You may pay the additional cost to repeat
  this spell's effect, and may make different choices.) Choose one — • Deal 4 to a unit in a base.
  • Kill a gear."*
- Marai Spire: *"While you control this battlefield, friendly [Repeat] costs cost :rb_energy_1:
  less."*

## 2. When the second execution is chosen

Not when it resolves. 820.2: *"When a spell or ability’s effect is performed an additional time with
Repeat, choices must be made at the usual time during the Make Relevant Choices step of Playing a
Card."* Both modes and both targets are fixed as you cast it, and 820.2.a's own example is this card:
*"they may choose the same mode or a different one, and if they choose the same mode, may choose the
same target or a different one."*

Then both executions happen inside one resolution — 340.1: *"The newest Finalized Chain Item
resolves. Execute its game effects in their entirety."* — and damage only kills in the Cleanup that
follows (323.5). Three consequences:

1. **The same target twice is eight damage.** 4 and 4 are both marked before anything checks for
   lethal, so a Might 5 to 8 body in their base dies to one card. Split, the same card kills two
   bodies of Might 4 or less, or one body and one gear.
2. **The order of the two modes does not matter for lethal.** Killing a gear first and then dealing 4
   to the unit it was on reaches the same Cleanup as the reverse.
3. **A single dodge blanks both executions on that target.** 359.3.e.5: *"If any of the spell's
   targets are no longer legal, those game objects, players, or zones are unaffected by the spell as
   it resolves."* Eight to one body is all-in on that body still being in the base at resolution;
   two targets hedge it.

## 3. The turns, going first

Mono-Mind. The opponent plays a body a turn to their base (143.4, *"Units enter the Board
exhausted."*) and walks it next turn, so on your turn their base holds whatever they played last.

The rows below are **alternatives, not one game**: each assumes no earlier recycle, because every
Power paid sends a rune back to the Rune Deck (161.2.b) and the board loses it.

```
alternative                 runes   your Main Phase                               after
A  single on T2             4       Rocket Barrage, one mode: exhaust 4 for E4,   3 runes; one body of
                                    recycle one exhausted Mind rune for the       Might <= 4 in their
                                    Power (164.2.b)                               base dead
B  double on T4, nothing    8       Rocket Barrage + Repeat: exhaust 8 for E8,    6 runes, 0 Energy
   cast before                      recycle two exhausted Mind runes for 2 Mind   spare; 8 to one
                                    Power                                         body, or two bodies
C  as B, Spire controlled   8       the same at E7 + 2 Mind                       1 Energy spare
D  double on T5, nothing    10      the same at E8 + 2, leaving 2 runes ready     2 Energy spare
   cast before
```

**Carried through from A**, the board is 3 runes after T2, 5 on T3 and **7 on T4**, so E8 + 2 is not
payable on T4: the double comes on T4 only with the Spire controlled (E7 + 2 exactly, 0 spare), or on
T5 with 9 runes and 1 spare.

- **T4 is the earliest double for a deck that skipped the T2 single, and it is the whole turn.**
  Eight runes pay E8 because 164.2.b's cost is the recycle, not an exhaust (*"Recycle this: [Reaction] — Add [C]."*), so the two runes already
  tapped for Energy still pay the two Mind Power. You end at six runes with nothing ready.
- **The Spire is worth exactly 1 Energy**, and only after you have walked a body in and taken it.
- **T5 with nothing cast before is the double that survives a tax**, for the reason in §4.

## 4. Breaks to

**`OGN-045 Defy`** — Calm, E1 + 1 Power: *"Counter a spell that costs no more than :rb_energy_4: and
no more than :rb_rune_rainbow:."* Rocket Barrage is the rules' own worked example of being in range
with its Repeat paid — 206: *"Rocket Barrage is a legal target for Defy even if Rocket Barrage’s
Repeat cost is paid, because Defy only checks the printed or copied cost of its target."* Countered,
nothing resolves and nothing comes back — 425.1.c: *"Countering does not refund any costs paid to
play a card, activate an ability, or trigger an ability."*, and 425.1.c.1: *"This includes additional
costs."* That is E8 + 2 Mind Power and two runes off the board, for E1 + 1.

**Outside Calm, `SFD-136 Hard Bargain`** — Chaos, E2, counters a spell unless its controller pays
2 Energy. The T4 double leaves 0 ready and loses the spell to it; the T5 double leaves 2 and pays.
A deck that also cast the T2 single never reaches 2 spare in time: 0 on T4 with the Spire, 1 on
T5, so it loses the double to Hard Bargain through T5.

**Keep nothing in the base.** 355.2.a lets them play a unit to *"the controller’s Base or a
Battlefield the controller controls"*, so an opponent who holds a battlefield can play there and
leave the "unit in a base" mode with no target; the spell is then two gear kills or nothing.

## 5. Verdict

**The entry is right that one card buys both modes, and leaves out that both are chosen up front.**
Because the two choices are locked at casting and lethal is checked only after both resolve, the
strongest use is not the two different modes but the same body twice: eight damage to something in
their base that four would not kill. The cost of that choice is that one dodge blanks the whole card.

**It scores nothing:** E4 + 1 for one execution from T2, E8 + 2 for two from T4 if nothing was cast
before (E7 + 2 with the Spire, which is also the only T4 double after a T2 single), and it breaks to `OGN-045 Defy` for E1 + 1 Power at any point, or to `SFD-136 Hard Bargain`
for E2 when you cast the double on T4 with nothing left ready.

## 6. Not verified

I did not walk which Reaction-speed moves can pull a unit out of a base in response (the dodge in
§2.3 is stated, not enumerated), the gear mode against an attached Equipment, or 2v2.

## Leads

- The entry lists *"two different base targets"* and *"both modes"* but not the same target twice.
  820.2.a allows it, and with both executions resolving before the Cleanup (340.1, 323.5) it is
  eight damage to one body.
- Step 5 reads as if the second choice follows the first (*"Resolve the second. 820.2.a lets you
  choose the other mode"*). 820.2 makes both choices at the Make Relevant Choices step, so nothing
  learned from the first execution can change the second.
- The ledger does not say the earliest double is T4 (for a deck that skipped the single on T2; after
  it, T4 needs the Spire) and leaves 0 Energy ready, which is what exposes
  it to `SFD-136 Hard Bargain`; on T5 it has 2 spare.
