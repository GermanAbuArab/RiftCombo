# Play — the entry the clock condemned hardest, and the board it was never measured on

Issue #200, lane rc-synth2, 2026-09-13. Constructed, Duel (485). Rules version 2026-07-16. Card text
verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read [the unopposed clock](2026-09-12-the-unopposed-clock.md)
first — this play is about what that document's baseline is and is not for.

**Subject: `svellsongur-copy-hold`** — a BURST, T6, and a member of the worst-scoring population in
the whole catalogue on the day's headline numbers. It is:

- in **BURST**, the class where **21 of 23** rows pay later than the do-nothing Hold curve;
- in the `--stalled` pass's **HOLD** bucket, labelled *"DIES WITH THE CURVE … the stall that makes
  this line necessary is the same stall that switches it off"*;
- one of the **23 entries that are both**, which is the sharpest negative any instrument in this
  project produces.

Those three counts read 20, the same bucket, and 8 when this play was first written, and all three
are re-measured here on 2026-09-13 at catalogue 766: pricing `[Equip]` took BURST from 20 to 21, and
the `--stalled` precedence fix moved seventeen battlefield-payoff rows into the HOLD bucket, so the
intersection is 46 and 45 overlapping in 23 rather than in 8. **Re-derive them; do not quote them.**
Nothing in the argument below turns on any of the three.

**And every one of those verdicts is measured against a board this line was never for.** On the board
it *is* for it wins three turns early. This play is the correction, and it is a correction to
instruments I wrote or changed myself today.

---

## 1. What it does, in one Hold

| | |
|---|---|
| **Legend** | Calm/Mind — four names: `OGN-255 Nine-Tailed Fox`, `SFD-189 Fire Below the Mountain`, `UNL-189 Bashful Bloom`, `VEN-145 Curator of the Sands` |
| **Cards** | `OGN-066 Ahri, Alluring` (Calm, E5 + 1 Power, M4) · `UNL-087 Blue Sentinel` (Mind, E4 + 1 Power, M4) · `SFD-059 Svellsongur` ×3 (Calm, E3 + 1 Power, **[Equip] E1 + 1 Calm**) |
| **Board it needs** | **one battlefield you control**, with both bodies on it |

`OGN-066 Ahri, Alluring` is four words long — *"When I hold, you score 1 point."* `SFD-059
Svellsongur` copies its carrier's text, and the copies **compose rather than add**: 434.1.c gives the
Top-Most Card all the Effect Text of all attached cards, so the second Svellsongur copies what the
first already appended. Three of them make **2³ = 8 instances** of Ahri's sentence on one body.
`UNL-087 Blue Sentinel` then reads *"Your hold effects for holding here trigger an additional time"*
— K = 1, so 8 × (1 + 1) = **16**, plus the Hold's own Score, is **17 points in one Beginning Phase at
one battlefield**.

Nothing in that needs a second battlefield, an enemy garrison, a combat, or a turn after it.

## 2. The verdict the instruments give, and why it is the wrong board

`npm run adversarial -- --turns` puts it at **T6 against a T5 baseline** — slower than doing nothing.
That baseline is the **unopposed** Hold curve: both battlefields yours, 315.2.b.2 Holding both, 2
points a turn, 8 by turn 5. Calm reaches it on 5 because `VEN-043 Steel Paws` costs one Energy.

**But a player holding both battlefields unopposed does not need a finisher, and this project already
knew that** — the unopposed-clock play says it outright: *"Unopposed, the Hold curve has already
won."* Measuring a finisher against that board asks **"is this redundant when I was winning
anyway?"**, and the answer is yes for almost everything, which is why the number is 41 of 80.

The board a finisher is for is a **contested** one. There are **three** board states and both
instruments model two:

| you control | the free curve pays | is a finisher wanted? |
|---|---|---|
| **both battlefields** | 2 a turn → **8 on T5/T6** | no — you have already won |
| **one battlefield** | 1 a turn → Conquer on T2 and seven Holds → **8 on T9** | **yes, and this is the normal game** |
| **none** | nothing | a Hold-gated line is off; only ATTACK and CONQUER shapes live |

The middle row is T9 **in every identity**, because one body on turn 1 costs two Energy and two runes
pay for it — the Energy-1 units that make the unopposed curve T5 are not needed to move one body.
471.1.a.1 is why the eighth point lands unconditionally: the Final Point restriction at 471.1.b.1 is
scoped to a **Conquer**, and these are Holds.

**Against that curve this line is T6 against T9 — three turns early.** Measured over the whole
catalogue the re-baselining moves the class from **21 of 23 slower to 1 of 23**, and the whole table
from 45 of 80 to **6 of 80** (2026-09-13, catalogue 766). Both numbers are true; they answer
different questions, and the script now prints both.

## 3. The turns, on the board it is for

Calm/Mind, going first (485.7 gives the extra rune to the player going second). `R` = runes after the
Channel Phase. The opponent has taken the other battlefield and garrisoned it; you hold yours.

| turn | R | what happens |
|---|---:|---|
| **T1** | 2 | `VEN-043 Steel Paws` (Calm, E1) to base. One Energy idle. |
| **T2** | 4 | Move it in — 190.3.a.1 Contested, 344.2 opens a Showdown at the next Cleanup, 348.2.a Control, 348.2.a.1 **Conquer**, +1. You now control the battlefield, so `UNL-087 Blue Sentinel` (E4 + 1 Power) is played straight to it. Board → 3. |
| **T3** | 5 | Beginning: Hold, +1 (2). `OGN-066 Ahri, Alluring` (E5 + 1 Power) to the battlefield. Board → 4. |
| **T4** | 6 | Hold, +1 (3). `SFD-059 Svellsongur` #1 and #2 (E6 + 2 Power). Board → 4. |
| **T5** | 6 | Hold, +1 (4). Svellsongur #3 **and all three attaches in the same Main Phase** — E3 + 1 Power for the gear, then `[Equip] E1 + 1 Calm` three times, so E6 + 4 Power in all. Board → 2. Ahri carries 8 instances. |
| **T6** | 4 | Beginning Phase: **Hold. 1 Score + 16 Gains = 17.** You were on 4. **Win.** |

**Turn 6 — and the two earlier versions of this table both said T7, for two different wrong reasons.
That is worth the space, because the second wrong reason became a line in `CLAUDE.md` and a brief.**

The first version said the clock's T6 "does not include" the Equip costs. It did not: `costsOfSet`
read a card's printed Energy and Power while 818.1 makes `[Equip]` a **separate Activated Ability with
its own cost**. That was fixed and priced, and the clock still said T6, so the missing turn was never
the money.

The second version said **it is ORDERING** — that `deployTurn` would happily pay a Svellsongur's
`[Equip]` before the Svellsongur. The premise is true and the conclusion is false. Ordering is now
modelled exactly (`--selftest` proves the allocator can see a turn where a hand-derived case owes
one), and **it moves none of the 80 rows, including this one.** 33 of the 80 carry a linked `[Equip]`
cost and not one of them is constrained by it.

**What actually cost this table a turn was the table.** It spent one card a turn and left Energy idle
on every one of them — E5 of 5 on T3 wastes nothing, but E4 of 5, E5 of 6 and E6 of 7 each leave one
behind, and T6 spent E3 of 7. Packed against the same rune curve it fits a turn earlier. Verified
twice and by two different algorithms: the shipped allocator's exact search, and an independent
breadth-first enumeration written from the rules rather than from the allocator, which prints exactly
the schedule above.

**The specific belief that cost the turn is that a gear played this turn cannot be attached this
turn.** 359.2.d refutes it — *"If it is a Non-Unit Gear, it enters the Board Ready at the player's
Base"* — so the gear is a Game Object on the board the moment it resolves, 380 is satisfied, and no
`[Equip]` cost in this pool contains an exhaust. Run the clock with `--strict-ordering`, which forbids
the same turn and is therefore **wrong as rules**, and this row reads **T7**: the old table was the
optimum of a game one paragraph stricter than the real one. Six rows move under that probe and the
unopposed headline goes from 45 to 47 of 80, so the whole gear half of the catalogue sits exactly on
that boundary.

Two assumptions this table inherits from the clock and does not hide. It ignores which **domain** a
rune is when paying Power, and that is a draw assumption rather than a choice: 114 shuffles the Rune
Deck at setup, 108.5.d makes its order Secret Information, and 430.1 channels from the top. And it
assumes the cards are in hand when wanted. Both are the same optimism as "perfect draws", applied to
the other deck.

**T6 against a contested curve of T9 is three turns early**, and you only ever needed one
battlefield. Section 2 said three turns and section 5 said two; three is right.

## 4. Breaks to

- **`OGN-133 Flurry of Blades` does nothing here**, and that is unusual enough to say: Ahri is Might
  4 and the Sentinel is Might 4 with `[Shield 2]`. This line has no small body at all, which is
  exactly why it is slow — see the walk document's gradient.
- **Gear removal, and this is the real answer.** 718.5.b: *"Attached cards still can be chosen or
  targeted by game effects while Attached."* Three Svellsongur on one carrier is 2³ = 8 instances;
  killing **one** takes it to 2² = 4 and halves the burst. Sixteen printings in the pool kill a gear
  and **none carries [Reaction]**, so it must be cast a turn early — which, on this line, is the turn
  the attaches happen.
- **Killing Ahri.** Everything is appended to her Rules Text, so she is the single point of failure,
  and 719.5 detaches all three Svellsongur when she leaves the board. She is Might 4 with no
  protection.
- **Contesting your battlefield.** 469.2 defines the Hold on a battlefield you **control**, so losing
  it turns 17 points into none. This is the real cost of a one-battlefield plan and it is why the
  third board state exists.

## 5. Verdict

**On the unopposed board it is redundant and the clock is right. On the contested board it is three
turns faster than the alternative and the clock's verdict was an artifact of the comparison.** The
same entry, the same number, two opposite readings — and the only thing that changed is which board
the baseline describes.

The general form is the one this play exists for, and it applies to the eight entries the old
comparison condemned hardest:

> **A Hold-gated finisher is not switched off by "a stall" — it is switched off by holding NOTHING,
> and it is at its best holding ONE.** The `--stalled` pass's HOLD label says *"the stall that makes
> this line necessary is the same stall that switches it off"*, which is true of a total stall and
> false of the ordinary contested game. Three board states, and both instruments were modelling two.

## 6. For the manager

1. **`scripts/adversarial-check.mjs` now prints both baselines** (mine, shipped): 41 of 80 against
   the unopposed curve and 6 of 80 against the contested one, per class as well as in the headline.
2. **The `--stalled` HOLD label is too strong** and is not mine to edit. It is correct for a board
   where you control nothing and wrong for the one-battlefield board, which is the common case. A
   third bucket is not needed — one clause in the label is.
3. **`[Equip]` is now priced** (rc-synth2, shipped): parsed from card text, 35 of the 39 gear that
   print one parse to pure Energy and rune symbols — reproducing this file's own independent count of
   29 one-rune plus 6 Energy-and-rune exactly — with the other four named and charged their mana part
   only, `[Quick-Draw]` skipped and `[Weaponmaster]` freeing the cheapest attach. It moved the
   unopposed headline from 41 to 45 of 80.
4. **ORDERING is now modelled too** (rc-synth3, shipped, 2026-09-13) and **it moves nothing**: 33 of
   the 80 rows carry a linked `[Equip]` cost and the constraint constrains none of them. The sentence
   this play used to carry — that ordering is what separates this line's T6 from its T7 — **is
   withdrawn**; the T7 was a suboptimal hand schedule that assumed a gear cannot be attached the turn
   it is played, which 359.2.d refutes. Checked before writing this: `CLAUDE.md` does **not** carry
   the claim, so nothing of the manager's needs editing. It reached the rc-synth2 handoff, which is
   a dated document and is left as written.
5. **The clock's last unmodelled ordering fact is the CARRIER** (818.1.c.2, *"a unit you control"*),
   and it is bounded rather than open: probed in `.scratch-gap/probe-carrier.mjs` it moves no row, and
   the only row it touches is `arise-sand-soldiers-plaza` — the one finisher with an Equipment and no
   unit in `uses`, which already declares `anyBodies`. Inert wherever it is expressible, and
   unmodellable on the last row without inventing a decklist.
