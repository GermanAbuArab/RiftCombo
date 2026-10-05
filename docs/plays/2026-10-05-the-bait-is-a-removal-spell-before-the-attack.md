# Play — the bait is a removal spell before the attack, and the answer is a counter during it

Issue #258 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `resonating-strike-sunlit-guardian-hidden-reinforcement`**, the mono-Calm ENGINE that
hides `VEN-034 Resonating Strike` at a battlefield you hold and, when the opponent attacks it, moves
`OGN-054 Sunlit Guardian` in from somewhere else as a 6-Might [Tank]. The entry prices the arrival
correctly. Walked as a game, the line survives the answer that broke the Poppy play — removal on the
garrison in the opponent's Main Phase — because the hidden card is itself a [Reaction] and can be
flipped in response. What breaks it is cheaper and narrower: a counterspell, at the one moment the
facedown card stops being a secret.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `d0cb346`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 83 of them with no play** —
the same numbers the issue measured, so the queue did not move. The pick is by global rank, skipping
entries that already have a play: this entry is rank 15 (two hits on *before*), first in the list.
The other entry of this slice is rank 17, played in
[the Golds are a bank with no teller](2026-10-05-the-golds-are-a-bank-with-no-teller.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Calm in its pair (103.1.b) |
| **The garrison** | one body standing at the battlefield you want to defend; here `OGN-052 Stalwart Poro` (Calm, E2, M2) |
| **The reinforcement** | `OGN-054 Sunlit Guardian` (Calm, E3, M3) standing at a **different** location, normally your base |
| **The trap** | `VEN-034 Resonating Strike` (Calm, E2 + 1 Power), hidden at that battlefield on an earlier turn |

The card text the play turns on:

- Resonating Strike: *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for
  :rb_energy_0:.) [Reaction] (Play any time, even before spells and abilities resolve.) Choose a
  battlefield you control and a unit you control at a different location. Move that unit to that
  battlefield and give it +2 :rb_might: this turn."*
- Sunlit Guardian: *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I must be assigned
  combat damage first.)"*

## 2. What the trap costs, and what keeps it armed

The hide is the only payment. 811.1.b: *"It is functionally short for "While this card is in your
hand or in your Champion Zone on your turn during an Open State, you may pay [A] to hide this
facedown at a battlefield you control that doesn't already have a facedown card hidden there for as
long as you control that battlefield. Beginning on the next turn, this gains [Reaction] and you may
play this, ignoring its base cost."*

Two clauses of that sentence decide the whole play. *Beginning on the next turn* means a card hidden
on your turn is live on the opponent's very next turn. *For as long as you control that battlefield*
means the garrison is load-bearing: 323.6 — *"4. Players lose control of any controlled Battlefields
without their Units occupying them if the turn is in an Open State and there is no Showdown or Combat
ongoing there."* — and 107.3.d — *"If a player loses Control of a Battlefield, any cards in the
Facedown Zone associated with that Battlefield are removed during the next Cleanup."* So the Poro
never attacks; it stands there to keep the trap on the table.

## 3. The turns, going first

Mono-Calm. The opponent is building on the other battlefield and holding cheap removal.

```
turn   runes   your turn                                                  held for their turn
T1     2       Stalwart Poro to base                                      -
T2     4       Poro walks to A, Conquer (344.2 Showdown, no defender).    1 ready rune, and
               Sunlit Guardian to base: exhaust 3 runes for E3.          the trap (costs 0)
               Hide Resonating Strike at A: recycle one of those three
               exhausted runes for the [A] (164.2.b). 3 runes remain.
T3     5       Hold A: +1. Free to develop; the trap still costs nothing   the trap
```

- **The trap is live from the opponent's T2.** It was hidden in your T2 Main Phase, after the
  Conquer made A yours, and *"beginning on the next turn"* is their turn.
- **Its price is one rune, once.** The recycled rune goes back to the Rune Deck (161.2.b, *"When a
  Rune is Recycled it is returned to the Rune Deck, not the Main Deck."*), so the board is a rune
  short on T3 — that is the whole cost of the line, against a printed E2 + 1 Power.
- **The Guardian has to stand somewhere else on purpose.** The spell chooses *"a unit you control at
  a different location"*, so the reinforcement is a body at your base doing nothing until the attack
  comes. It is also out of reach of every removal that says *"at a battlefield"*.

**Their T2, the attack.** They move two bodies into A for a summed Might of 4 against the Poro's 2 + 1
([Shield]). In the combat you flip the Strike for nothing; it moves the Guardian in and gives it +2.
323.2.a gives it the Defender designation before damage — *"If there are Units present at the
Battlefield the Combat is taking place at, but do not have a designation, they gain the same
designation as their Controller now"* — so it defends at 3 + 2 + 1 = 6, and 815.1.c.2 sends all four
damage to it first: *"Units without Tank are invalid assignments until all units with Tank have lethal
damage assigned to them."* Nothing of yours dies; your 9 kills both attackers.

## 4. Breaks to

**Not the bait.** The answer that broke [the Poppy play](2026-10-05-the-faucet-is-also-the-landing-pad.md)
was removal on the garrison in the opponent's Main Phase, before the attack. Here it does not work.
`OGS-003 Incinerate` (Fury, E2, *"Deal 2 to a unit at a battlefield."*) on the Poro puts a spell on
the chain, which is a Closed State, and the flipped Strike is a [Reaction] — 813.1.c.1: *"This can be
played during Closed States on any player's turn."* You respond: the Guardian arrives at A while you
still control it, the Poro dies, the Guardian stays, and 323.6 never takes A away. What the bait does
buy is information: the trap is spent in their Main Phase, they see a 5-Might [Tank] before choosing
where to attack, and they simply attack elsewhere. You traded a 2-drop and the trap for their E2 and
kept the battlefield with a bigger body — a fair trade, not a broken line.

**A counter, at the flip.** Playing from facedown is a chain like any other — 811.1.c.3: *"Playing a
card from facedown (or "from Hidden") does open a chain."* — and the Strike is a spell with a printed
cost of E2 + 1, which is what `OGN-045 Defy` (Calm, E1 + 1 Power, *"Counter a spell that costs no more
than :rb_energy_4: and no more than :rb_rune_rainbow:."*) reads: 206, *"Effects that need to determine
a card’s cost for any purpose always use its printed or copied cost, even if that cost is increased,
decreased, or ignored as the card is played."* Countered in the combat, the Guardian never moves, the
Poro faces the attack alone and dies, and nothing comes back — 425.1.c: *"Countering does not refund
any costs paid to play a card, activate an ability, or trigger an ability."* **Breaks to `OGN-045
Defy` for E1 + 1 Calm Power**, against your rune, your card, your garrison and the battlefield.

A deck without Calm has `UNL-131 Abandon` (Chaos, E2, *"Counter a spell. Return it to its owner's
hand instead of putting it in their trash."*) and `SFD-136 Hard Bargain` (Chaos, E2, *"Counter a
spell unless its controller pays :rb_energy_2:."*). Abandon gives the Strike back to your hand, so it
can be hidden again for one more rune. Hard Bargain is paid with exactly the rune the T2 table leaves
ready — **if** you left two; with one, it counters.

**Or a big enough attack.** The Tank wall is a toll, not a shield: lethal on the Guardian costs 6, so
an attack of summed Might 6 kills it and 9 kills both. The opponent cannot field that on T2; by T4 it
can, and the wall is then just a body.

## 5. Verdict

**The line is good, and better than its entry says.** The obvious answer — kill the garrison first —
is answered by the same card it targets, because a hidden card is a [Reaction] card from the next
turn. The real price is one rune, once, and the real risk is one counterspell in the window the flip
itself opens. Against a Calm opponent with E1 + 1 up, hold the trap back until they have tapped out
in their own Main Phase; against Chaos, leave two runes ready so Hard Bargain can be paid.

**It scores nothing:** it turns one attack on A into a lost combat for the attacker on T2, at a cost
of one rune.

## 6. Not verified

I did not walk an attacker with [Assault], an attack on both battlefields at once (the Guardian can
only go to one), or 2v2.

## Leads

- The entry never names a counterspell. 811.1.c.3 makes the flip a chain, and `OGN-045 Defy` reads
  the Strike's printed E2 + 1 (206), so it is counterable for E1 + 1 Calm Power — the line's cheapest
  answer, and it is not in the notables.
- The entry does not say the garrison must stay. 811.1.b keeps the facedown card only *"for as long as
  you control that battlefield"*, and 323.6 with 107.3.d removes it if the garrison walks off; the body
  holding the battlefield cannot be used to attack.
- Pre-attack removal on the garrison is answered by flipping in response (813.1.c.1); worth a notable,
  because it is the answer that breaks the Ambush-based lines built on the same idea.
