# Play — one body carries four points a turn, and one Energy takes it back

Issue #200, lane rc-synth4, 2026-09-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `trinity-tryndamere-both-phases-chain`**, which I wrote earlier today and which the turn
clock reads at **T7 against a T5 baseline**. Walked turn by turn it wins on **T5** — and the reason
is not that the clock is wrong about arithmetic. It is that the clock prices a CARD SET and this line
wins with half of its cards still in hand.

The entry says its two halves cover the middle board. **They do not. The middle board is where one
half suffices, and the halves only genuinely differ on a board the entry never names.** That is the
finding, and it is a correction to my own entry.

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Body/Fury name — the pool prints four: `OGN-249 Relentless Storm`, `SFD-183 Purifier`, `UNL-183 Pridestalker`, `VEN-141 Butcher of the Sands` |
| **The Hold half** | 3x `SFD-115 Trinity Force` (Body gear, E4, M+2, [Equip] one Body rune) on ONE carrier |
| **The carrier** | `UNL-111 Determined Sentry` (Body, E1, M1) for speed, or a Might-2 Body body for survival — §5 is about that choice |
| **The attack half** | `OGN-034 Tryndamere, Barbarian` (Fury, E7 + 2 Power, M8) · 2x `UNL-029 Red Brambleback` (Fury, E4 + 1 Power, M4, [Accelerate]) |
| **Board it wants** | you control one battlefield; what the opponent does with the other is §6 |

Domain identity computed from `data/cards.json` rather than from the names: Trinity Force and the
Sentry are mono-Body, Tryndamere and the Bramblebacks mono-Fury. Union `{body, fury}` under 103.1.b.
None is Signature and none appears in `data/legality.json`.

## 2. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board after that turn's Channel Phase. A rune pays 1 Energy (164.2.a, cost is its
exhaust) and can ALSO be recycled for 1 Power of its domain (164.2.b, cost is the recycle) — but the
recycled rune leaves for the Rune Deck (161.2.b) and comes back at 2 a turn (315.3.b), capped at 12
(161.2.a). **Dead Energy is written down rather than hidden.**

```
       R   spend                                        idle   score
T1     2   Determined Sentry (E1)                        E1      0
T2     4   move to battlefield A -> Conquer              E0     +1 = 1
           Trinity #1 (E4) + [Equip] 1 Body  (R -> 3)
T3     5   HOLD A: Score +1, one Trinity +1              E1     +2 = 3
           Trinity #2 (E4) + [Equip] 1 Body  (R -> 4)
T4     6   HOLD A: Score +1, two Trinity +2              E2     +3 = 6
           Trinity #3 (E4) + [Equip] 1 Body  (R -> 5)
T5     7   HOLD A: Score +1, three Trinity +3            E3    +4 = 10   WIN
```

**Turn 5, and Tryndamere never left your hand.** He and the two Bramblebacks are E15 and 4 Power
against a board that has seven runes on T5; the attack half is not castable before the Hold half has
already won.

**T1 is a dead turn and T3, T4 and T5 idle Energy.** That is not a flaw to hide — it is where §7's
constructive half comes from.

## 3. Why three gear on one body is three points and not one

434.1.c: *"The Top-Most card has all Effect Text of all cards Attached to it appended to its Rules
Text."* Trinity Force's Effect Text is *"When I hold, score 1 point"*, and 053.2 with 136.2.d make
that `I` the carrier. Three attached copies append the sentence three times, so one carrier holding
one battlefield fires it three times.

The Hold itself is the fourth point: 315.2.b.2 Holds every battlefield you control, 469.2 and 471.1
gain the Score, and 471.2.b — *"Hold abilities trigger at a Battlefield that was Held"* — fires the
appended text. Three of the four are 194.1.c ability Gains, which 470's once-per-battlefield cap never
sees (R2 = A).

**Four points a turn, from one body, forever.**

## 4. Why the clock says T7, and both reasons are the clock rather than the line

**It prices a card set, not a win.** `deployTurn` asks when every cost in the entry is payable. This
line reaches eight with three of its six cards uncast, so T7 is the turn the whole board is affordable
and has nothing to do with the turn it wins. An entry has one `terminatesIn` and cannot say that.

**And its baseline is one turn too fast for this identity.** `scripts/adversarial-check.mjs:677` reads
`baselineTurn = domains.some(d => CHEAP_BODY_DOMAINS.has(d)) ? 5 : 6` with
`CHEAP_BODY_DOMAINS = {body, calm}`, and its own comment gives the reason: the pool prints exactly two
units at Energy 1 or less, so an identity reaching one of them *"plays two bodies on turn 1, conquers
both battlefields on turn 2 and holds to 8 on turn 5."*

**Two bodies on turn 1 needs two Energy-1 units, and the two the pool prints are `UNL-111 Determined
Sentry` (Body) and `VEN-043 Steel Paws` (Calm).** Measured over all fifteen pairs: **only calm/body
can field both.** The other eight identities containing body or calm field ONE, and a second body
costs 2 Energy against two runes on turn 1 — so they conquer one battlefield on T2, the second on T3,
and reach eight on **T6**.

**body/fury is one of the eight.** Its honest unopposed curve is T6, not T5, so this line beats it by
one turn rather than trailing it by two. The instrument is not wrong about any card; it is wrong about
one identity's opening, in the eight places where an identity reaches one cheap body and not two.
Reported to the lane that owns that file.

## 5. The whole Hold half is one body, and that is the play

Four points a turn stand on a single carrier. Kill it and three Trinity Forces fall to the board
(719.5 detaches them when the Top-Most Card leaves, 457.1 recalls them to base at the next Cleanup),
**and 323.6 then strips your Control of the battlefield itself**, because *"players lose control of
any controlled Battlefields without their Units occupying them if the turn is in an Open State and
there is no Showdown or Combat ongoing there."*

**One removal spell takes the Score, the three ability points, and the battlefield.**

`UNL-111 Determined Sentry` is Might 1, so `OGN-133 Flurry of Blades` — Body, E1, [Reaction],
*"Deal 1 to all units at battlefields"* — does it for one Energy, at Reaction speed, on either
player's turn. A Might-2 Body carrier costs one more Energy and a dead turn on T1 and survives that
card; nothing in the identity survives a real removal spell.

And the Equipment is removable where it stands: 718.5.b keeps an attached card *"chosen or targeted by
game effects while Attached"*, and `OGN-022 Thermo Beam` (Fury, E5 + 2 Power, [Action], *"Kill all
gear"*) takes all three at once. **That card is in this line's own identity, so an opponent on a Fury
legend is holding it.**

## 6. Three boards, and the entry names the wrong one

| board | Hold half | attack half | verdict |
|---|---|---|---|
| you hold BOTH | 4 a turn, wins T5 | dead — 323.9 stages no Combat with no enemy garrison | the package did nothing; the free curve was winning anyway |
| you hold ONE, they garrison the other | 4 a turn, wins T5 | +4 in one Main Phase | **the Hold half alone suffices; the attack half buys one turn** |
| **you hold NOTHING** | **ZERO** | **+4, and it is the only thing on the board that pays** | **this is what the attack half is for** |

The entry's notable says the two halves *"cover the middle one"*. Walked, the middle board is where
the Hold half wins on its own — so the halves do not differ there in any way that matters. **They
differ on the third board, which is the board you are on the moment somebody kills your carrier**, and
that is the single most likely thing to happen to this deck.

**So the attack half is not a second scoring axis for the good board. It is the recovery from the bad
one**, and the recovery is worth exactly four points and a battlefield: Tryndamere and two
Bramblebacks Standard-Move in as one action (144.3), 450 applies Contested, 464.2.c.1 makes you the
Attacker, 465.2.a sums 16 Might, and any garrison of summed Might eleven or less leaves the five
excess R28 = A defines. 466.5 and 466.5.d Conquer for a Score, and the Brambleback pair takes
Tryndamere's clause from one instance to three.

**Then the Hold half comes back online at 4 a turn the following Beginning Phase**, because you now
control a battlefield again and a spare body can carry the recalled gear back in.

## 7. What the idle Energy should buy

T1 is dead and T3 to T5 idle one, two and three Energy. The line has nothing to spend it on, and the
thing it most needs is **a second body at the battlefield the carrier is holding**, so that killing
the carrier does not also hand back the battlefield under 323.6. Any Energy-2 Body or Fury body does
it — nineteen of them exist in the identity — and it converts the worst case from *"lose four points
a turn AND the battlefield"* to *"lose four points a turn"*.

That is a deckbuilding note rather than a combo, which is why it belongs in a play and not in `uses`:
the matcher would price a card the line does not need in order to execute.

## 8. Verdict

**The entry is correct and its own reason is the wrong one.** Eight points in one turn across both
phases is real and is not why you run it, because on that board four points a turn had already won.
What the attack half actually buys is a line that still functions after its single point of failure
has been hit — and a Hold engine standing on one body will have it hit.

**Read as a clock row this line is T7 against T5 and looks two turns slow. Read turn by turn it is T5
against an honest T6 and is a turn fast.** Both numbers come from the same script; the difference is
that one of them prices a deck and the other prices a game.

## 9. Not verified

I did not walk the opponent's best line against the third board — whether a deck that has pushed you
off both battlefields can also hold a garrison of summed Might twelve or more, which is the number
that switches Tryndamere's clause off. Read §6's bottom row as the recovery being AVAILABLE, not as
it being guaranteed.
