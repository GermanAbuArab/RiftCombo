# Play — the board that cannot be improved, and the three turns of mana you cannot spend on it

Issue #200, 2026-09-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline, and
[one body carries four points](2026-09-14-one-body-carries-four-points.md) for the companion case
where a turn table refuted its own entry.

**Subject: `shen-disciple-hand-hammer-exactly-two`**, calm/order, from the seven-card Vendetta cycle
that all reads one board shape — a battlefield where you control **exactly two** units.

**Every other line in this catalogue scales by adding copies. This one cannot.** A third friendly body
switches off every clause in the cycle at once, so 103.2.b's three copies are unusable and what you
stack is clauses on a fixed board. **A turn table is the only way to show what that costs**, and what
it costs is three turns of mana you are not allowed to spend where it would help.

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Calm/Order name — the pool prints four: `OGN-261 Radiant Dawn`, `SFD-197 Emperor of the Sands`, `UNL-195 Green Father`, `VEN-147 Eye of Twilight` |
| **The pair** | `VEN-138 Shen, Leader of the Kinkou Order` (Order, E6 + 2 Power, M7, [Shield]) · `VEN-117 Disciple of Shen` (Order, E2, M1, [Hidden]) |
| **The third clause** | `VEN-027 Hand Hammer` (Calm gear, E2, M+1, [Equip] one Calm rune) |
| **Board it wants** | one battlefield, held, with exactly those two bodies standing on it |

## 2. The baseline, checked properly this time

The identity's do-nothing Hold curve is **T5**. `VEN-043 Steel Paws` is **Calm**, Energy 1, and is not
[Unique], not Signature and not in `data/legality.json` — so **103.2.b's three copies mean two of them
cost 2 Energy and land on turn 1's two runes.** Two bodies, two Conquers on T2, eight by T5.

**The curve needs two BODIES, not two CARDS**, and copies of one card satisfy it. I got that wrong in
the companion play and it cost that play its headline; it is checked here before anything is claimed.

Hold **one** battlefield instead of two and the same curve pays 1 a turn and arrives on **T9**. Those
are the two numbers this line is measured against.

## 3. The turns, going first — 485.7 gives the extra rune to the player going second

Against an opponent who takes and garrisons the other battlefield. `R` = runes after that turn's
Channel Phase; a rune pays 1 Energy by exhausting (164.2.a) and can also be recycled for 1 Power of
its domain (164.2.b, whose cost is the recycle), the recycled rune leaving for the Rune Deck (161.2.b)
and returning at 2 a turn (315.3.b). **Idle Energy is written down.**

```
       R    spend                                          idle    score
T1     2    Disciple of Shen (E2)                           E0       0
T2     4    move to battlefield A -> Conquer                E0      +1 = 1
            Hand Hammer (E2), enters ready at base
T3     6    HOLD A: Score +1                                E0      +1 = 2
            Shen (E6 + 2 Order Power)          (R -> 4)
T4     6    HOLD A: Score +1                                E6      +1 = 3
            move Shen to A  -> the board is now COMPLETE
            [Equip] Hand Hammer to Shen (1 Calm) (R -> 5)
T5     7    HOLD A: Score +1, Shen +1                       E7      +2 = 5
T6     9    HOLD A: Score +1, Shen +1                       E9      +2 = 7
T7    11    HOLD A: Score +1, Shen +1                       E11     +2 = 9   WIN
```

**T7. Two turns slower than doing nothing unopposed, two turns faster than the contested curve** — and
from T4 the deck idles six, seven, nine and eleven Energy while its rate never moves.

## 4. The board is complete on T4 and cannot be improved after it

This is the sentence an entry cannot say. From T4 the battlefield is finished: Shen and the Disciple,
and every clause in the cycle reading *"exactly one other unit you control"* is satisfied. **Any third
body you play there switches off all three at once** — Shen's point, the Hand Hammer's +2, and the
Disciple's own [Shield 3].

So the idle Energy is real and it is not laziness. 355.2.a lets you play a unit to *"the controller's
Base or a battlefield the controller controls"*, so the mana CAN buy bodies — **just never at A.** On
the turn you draw your third body, the correct play is to hold it or send it somewhere else, and that
is a genuinely unusual instruction to give a deck with nine spare Energy.

**What the mana should buy**, and it follows from the exactness rather than from taste:

- **the second battlefield.** A spare body at B is another Hold, +1 a turn, and it is the only way this
  deck's rate ever increases. It is also the only use of the idle Energy that changes the turn count.
- **a replacement body IN HAND.** The failure below is losing one of the two, and the repair is a body
  you can play immediately to restore the count — which 355.2.a permits directly at A.
- **not a bigger garrison at A.** Ever.

## 5. Both walls are one card away, and they are opposite walls

**Too many** switches it off: a third friendly body at A.

**Too few** switches it off just as hard. The Disciple is printed **Might 1**, and 143.2.a kills on
*"nonzero damage marked on it equalling or exceeding its Might"* — so `OGN-133 Flurry of Blades`
(Body, E1, [Reaction], *"Deal 1 to all units at battlefields"*) removes it for one Energy at Reaction
speed on either player's turn. Shen is then alone at A, his clause finds no other unit, and **the rate
drops from 2 a turn back to 1 — which is the do-nothing curve.** One Energy undoes three cards.

And the Disciple's own [Shield 3] does not save it: 814.1.c makes [Shield] short for *"While I am a
defender, I have +X [M]"*, and 814.1.d makes a defender a unit that *"has gained the Defender
designation during Combat"*. Outside a combat it is Might 1 and nothing else.

**The window is exactly two and both edges are a single card.** That is the price of stacking clauses
instead of copies, and no entry field can carry it.

## 6. The trap inside the cycle

`VEN-129 Sacred Protector` (Order, E4 + 1 Power, M6) reads *"I don't deal combat damage unless I'm at
a battlefield with exactly one other unit you control."* It is in the cycle and it must not be in this
deck's battlefield: **its exactness is a penalty it escapes, not a bonus it earns**, so adding it as a
third body at A switches off Shen, the Hammer and the Disciple in order to switch itself on.

`VEN-119 Keeper of Law` is the softer version — its reward is a cost reduction paid once as you play
it, so it is a discount on joining the shape rather than a reason to hold it.

**Read the SIGN of an exactness before adding the card.** Five of the seven are paid for holding the
shape; two are paid for escaping it.

## 7. What the instruments cannot see, and here it is everything

**Neither of this project's two clocks prices this line at all.** `scripts/adversarial-check.mjs:194`
sets `FINISHER = new Set(["INFINITE","BURST","CHAIN","ALT_WIN"])` and line 1182 skips everything else,
so the turn clock and the `--stalled` classifier are both blind to it — **and to 688 of the
catalogue's entries**, which is the ENGINE class.

`--engines` exists and reports **a histogram rather than a row**: 688 engines, median T5, mean T4.74,
with 154 of them deployable only after the do-nothing curve has already won in their identity. **There
is no number for this entry to check a hand walk against**, which is why §3 is a hand walk and why the
format exists.

And what a deployment clock would say is the wrong thing anyway: **this line's deployment finishes on
T4 and it wins on T7.** The three turns in between are the shape of the deck, not a gap in it.

## 8. Verdict

**It is at its best on the one board where the free curve is slowest, which is the right shape**, and
it is two turns worse than doing nothing on the board where doing nothing was already enough. Two
points a turn from two bodies at one battlefield, against a curve that needs both battlefields to pay
the same rate.

**But its ceiling is fixed on turn four and it has no second gear.** Everything this catalogue
normally does to raise a rate — a second copy, a multiplier, a bigger garrison — is forbidden here by
the very clause that pays. `sacred-protector-disciple-of-shen-pair` says of the cycle's defensive half
that *"nothing here scores"*; the honest verdict on the scoring half is that **something here scores,
exactly twice a turn, forever, and nothing you draw afterwards can make it three.**

## 9. Not verified

I did not walk the opponent's turn in detail. §5 prices the cheapest answer and names it, but I have
not checked whether a calm/order deck can profitably hold up a [Reaction] answer to `OGN-133` through
its own turn, which is what would decide how often the wall at "too few" is actually reached. Read §5
as the cost of the removal LANDING, not as a claim about how likely it is.
