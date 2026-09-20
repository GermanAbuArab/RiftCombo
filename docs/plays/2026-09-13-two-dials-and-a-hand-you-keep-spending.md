# Play — two dials and a hand you keep spending: what "exactly 4 and exactly 4" costs

Issue #200, 2026-09-13. Constructed, Duel (485). Rules version 2026-07-16. Card text
verbatim from `data/corpus_flat.txt`; rules pasted from `data/Riftbound-Core-Rules-2026-07-16.txt`.
Read [the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline.

**Subject: `gutter-palace`**, which the turn clock reads at **T3 against a T6 baseline** — the fastest
row in the catalogue's fastest class, and the only non-Plaza ALT_WIN family in the file. **The family
is three entries, not two** — `gutter-palace` at T3, `gutter-palace-reaction-dials` at T6 and
`gutter-palace-keeper-time-warp` at T7. This play is about the **first two**, because they are the
same card with and without an answer suite and that is the comparison; the Time Warp version is a
different question and is not walked here.

Walked by hand the bare version is **T5**, and the three turns it gains on the clock are three cards
the entry does not list. The pair is the third instance of the shape the other two plays found: a fast
version that spends nothing and a slower one that survives contact.

---

## 1. The card, and why it is unlike every other finisher here

> **`UNL-088 Gutter Palace`** — Gear, Mind, E4 — *"At the start of your Beginning Phase, if you have
> exactly 4 cards in hand and exactly 4 units at battlefields, you win the game. Discard 1,
> [exhaust]: Play a 1 Might Bird unit token with [Deflect]."*

Every other finisher in the catalogue asks you to get **more** of something. This one asks for
**exactly** two numbers, and **one of them is your hand size**, which moves every time you do anything
at all. Playing a card is −1. Drawing is +1. It is the only win condition in the pool that a player
can overshoot.

Three timing facts decide the whole line and none of them is obvious:

- **The check is at 315.2.a, the start of the Beginning Phase — and 315.4 the Draw Phase comes
  AFTER.** So the hand it counts is the hand you **ended your previous turn with**, not the one you
  are about to draw into.
- **The Palace's own dial is an Activated Ability with an exhaust in its cost**, so 381 confines it to
  *"the Controlling Player's Turn and during an Open State"*. You cannot correct with the Palace on
  the opponent's turn, which is exactly when they will move a dial.
- **It is a gear**, so 359.2.d enters it ready at base and it dials on the turn it lands — and 415.3.a
  readies it every Awaken, so it is one activation per turn, forever.

## 2. The bare line, walked

Mono-Mind. The pool prints **eleven** mono-Mind units at Energy 2 or less and none at 1, so the body
curve is the Energy-2 curve and the baseline is T6 (`--turns` agrees). Hand starts at 4 — rule 116,
*"Players each draw 4"* — and 315.4.b adds 1 a turn.

| turn | R | hand | units at battlefields | what happens |
|---|---:|---:|---:|---|
| **T1** | 2 | 4→5→4 | 0 | Draw. Play `SFD-069 Plundering Poro` (E2) to base; 143.4 enters it exhausted. |
| **T2** | 4 | 4→5→3 | 0→2 | Draw. Standard-Move the Poro in (144.4.a): 190.3.a.1 Contested, 344.2 opens a Showdown at the next Cleanup, 348.2.a Control, 348.2.a.1 **Conquer**. Play the Palace (E4) — hand 4. Dial it: **discard 1** (hand 3), exhaust, Bird to the battlefield you now control (355.2.a) — **2 units**. |
| **T3** | 6 | 3→4→2 | 2→4 | Beginning: 3 and 2. No. Draw. Dial again: hand 3, **3 units**. Play a second Energy-2 body **straight to the battlefield** — 355.2.a makes a battlefield you control a valid location, so it needs no move and its 143.4 exhaustion costs nothing. Hand 2, **4 units**. |
| **T4** | 8 | 2→3→4 | 4 | Beginning: 2 and 4. No. Draw to 3. **Do not dial** — the units are already right. `UNL-061 Downstage Dramatics` (E2) with its **[Repeat] E2**: play it (hand 2) and draw twice (hand 4). Exactly +1 net, which is the only number that works. |
| **T5** | — | **4** | **4** | Beginning Phase, 315.2.a: the trigger is placed, 383.2.a.1 finds exactly 4 and exactly 4, and **195** wins the game. |

**Turn 5, not turn 3.** The clock says T3 because the entry's `uses[]` is one row — the Palace — and
the three cards above are nowhere in it: two bodies and a draw spell. It is the same
`shen-kinkou-svellsongur-hold` shape the project already records, arriving in the ALT_WIN class where
the sentence it produces is *"you win the game"*.

### The hand arithmetic, because it is the whole puzzle

| move | hand | units |
|---|---:|---:|
| play any card from hand | −1 | — |
| the Palace's dial | −1 | +1 |
| draw a card | +1 | — |
| a **cantrip** — `OGN-095 Stupefy` (E1, draw 1) | **0** | 0 |
| `UNL-061 Downstage Dramatics` + [Repeat] (E4) | **+1** | 0 |
| `SFD-087 Premonition` (E2 + 3 Power, draw 3) | **+2** | 0 |
| `OGN-083 Consult the Past` played **from Hidden** (E0) | **+2** | 0 |
| `OGN-104 Retreat` (E1, return a friendly unit to hand) | **0** | **−1** |
| `UNL-071 Chakram Dancer` (E3, [Ambush]) | −1 | **+1** |

**A cantrip is a no-op on both dials** — which makes `Stupefy` the only card in the deck you can cast
purely to spend Energy. And `Retreat` is the one card that moves the unit dial without touching the
hand, because the unit it returns lands in the hand the card just left.

## 3. What the opponent does with their turn, and why the bare version loses to it

The bare line passes at 4/4 and hands them a whole turn. **Anything that moves either dial by one
wins**, because the condition is *exactly*:

- **Kill one of the four.** Any removal. 3 units, and the Palace's own dial cannot answer it, because
  381 makes that an Activated Ability on your own turn only.
- **`OGN-133 Flurry of Blades` — Body, E1, [Reaction]** — *"Deal 1 to all units at battlefields."* The
  Bird tokens are Might 1 (187.7), so one Energy takes every Bird off the board at once. Against the
  board in §2 that is two Birds gone: 2 units. [Deflect] is no help, because 355.10.d makes a
  deal-to-all untargeted and 809.1.c charges only for choosing.
- **Make you discard, or give you a card.** Either direction breaks it.

And the trigger's condition is read **when it is placed** (383.2.a.1), so there is no saving it after
the fact: if the board is not exactly 4/4 as your Beginning Phase starts, nothing goes on the Chain at
all and there is nothing to respond to.

## 4. The version that survives it, and what the three extra turns buy

`gutter-palace-reaction-dials` adds `UNL-071 Chakram Dancer` ×3, `OGN-104 Retreat` ×3 and
`SFD-087 Premonition` ×3 — **nine cards, every one of them playable on the opponent's turn**, which is
the only property that matters here. 813.1.c.1 admits a [Reaction] card *"during Closed States on any
player's turn"*, 331.1 makes the turn Closed exactly while a Chain exists, and 822.1.b gives
[Ambush] the same access for a body. So the moment they put anything on the Chain, 312.2.c hands you
priority and every dial is live.

The entry's own step says to **count forward**: answer their removal while it is still on the Chain,
so that when it resolves the board lands back on four rather than being corrected after the fact.

**The dials are exact, and that is the part worth checking rather than assuming:**

- their removal takes a unit → **Chakram Dancer** puts one back (units +1) and costs a card (hand −1)
- that hand −1 → **Downstage Dramatics with [Repeat]** is exactly +1, the only clean +1 in the suite
- a unit too many → **Retreat**, which is the only card that moves units alone
- a hand two short → **Premonition**, or **Consult the Past from Hidden**, which is +2 for no Energy
  because the card left your hand on a previous turn (811.1.b plays it *"ignoring its base cost"*)

**And the Energy is the real constraint, not the cards.** Correcting a single removal costs E3 for the
Dancer plus E4 for Downstage-with-Repeat — **seven Energy on the opponent's turn**, which you can only
have by declining to spend on yours. 167 empties the Rune **Pool** at the start of your Main Phase and
at the end of your turn, not the runes themselves, and 164.2.a and 164.2.b both carry [Reaction], so
the runes are still there to tap in their window (444.2.c). Seven runes held back is turn 4 at the
earliest on a 2-a-turn curve, and you still have to have deployed the Palace, two bodies and the
Dancer first. **T6 is what that costs, and the clock's T6 for this row is honest.**

## 5. Verdict, in three cases

| board | what happens |
|---|---|
| **They do nothing at all** | The bare version wins on **T5** — not the T3 the table says, because the clock is not pricing the two bodies or the draw spell. Even so it beats the T6 baseline by a turn, on four cards. |
| **They have one Energy and any removal** | The bare version **loses to a single card**, and loses completely: `exactly` means a dial moved by one is a dial moved enough, and the Palace cannot answer on their turn. |
| **They have one Energy and you have seven held back** | The dialled version holds at 4/4 through their turn and wins on **T6** — the same turn the do-nothing Hold curve wins in this identity. |

**So the fast version is a turn faster than doing nothing and dies to one Energy, and the version that
survives one Energy is exactly as fast as doing nothing.** That is the same verdict both earlier plays
reached about a different family, and it is the third independent instance: in this catalogue, the
speed and the fragility are bought with the same card slots, and a finisher that spends nothing on
the board is a finisher the board can take away.

The thing that is genuinely unlike the rest of the catalogue is the shape of the vulnerability. Every
other finisher here is broken by **removal** — take a body away and the line shrinks. This one is
broken in **both directions**, including by being handed a card, and it is the only row in the file of
which that is true.

