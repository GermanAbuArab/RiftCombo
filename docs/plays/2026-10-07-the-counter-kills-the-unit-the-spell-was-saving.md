# Play — the counter kills the unit the spell was saving

Issue #299 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `heedless-resurrection-removal-blank`**, the mono-Chaos ENGINE in which the opponent aims
removal at your unit, you answer with `UNL-142 Heedless Resurrection`, kill the unit as the spell's
cost and play the same unit straight back from the trash. The entry is right that the removal then
does nothing. Walked as a game, the price is paid before the spell resolves, and that is the whole
weakness: the unit is already in the trash when the opponent gets to respond, so a one-Energy counter
leaves you a card further behind than if you had let the removal resolve.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `cfe8539`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 73 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 26 (hits on *in response* and *first*), first in the list. The other entry of this slice
is rank 27, played in
[the Vortex taxes whoever answers, and Focus changes hands](2026-10-07-the-vortex-taxes-whoever-answers-and-focus-changes-hands.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Chaos in its pair (103.1.b) |
| **First** | a real unit on the board worth saving: `OGN-167 Ember Monk` (Chaos, E4, M4) |
| **Held open** | 2 Energy and 1 Chaos Power through the opponent's turn |
| **Then** | `UNL-142 Heedless Resurrection` (Chaos, E2 + 1 Power), in response to their removal |

The card text the play turns on:

- Heedless Resurrection: *"[Reaction] (Play any time, even before spells and abilities resolve.) As an
  additional cost to play this, kill a friendly unit. Play a unit from your trash that costs no more
  Energy and no more Power than the killed unit, ignoring its cost."*
- Ember Monk: *"When you play a card from [Hidden], give me +2 :rb_might: this turn."* The text is
  idle here; the Monk is chosen for its four Might and its cost of E4 with no Power, which the
  ceiling *"no more Energy and no more Power"* admits for itself.

## 2. Your order: the kill is the cost, so it happens first

The kill is not optional. 356.2.a.1: *"Some Additional Costs specified by Passive Abilities on the card
being played or another card are Mandatory, and must be paid to complete playing the card. They use
the phrase "as an additional cost" and don't include the word "may.""* And it is not a target, so
nothing the opponent controls can tax or redirect it — 355.10.c: *"“As an additional cost to play me,
kill a friendly unit” doesn’t target anything."*

So the Monk is in the trash before Heedless Resurrection is even on the chain, and when the spell
resolves the Monk is the obvious choice for *"a unit from your trash"*: its own costs meet its own
ceiling exactly. It comes back exhausted — 143.4: *"Units enter the Board exhausted."* — and it can
come back where it stood, because 355.2.a: *"By default, Valid locations include the controller’s
Base or a Battlefield the controller controls."* The Mystic Poro beside it keeps that battlefield
yours throughout.

The opponent's removal then misses. The Monk that returned is a new object — 359.3.e.4: *"If a target
changes Zones to or from a Non-Board Zone and then returns to its original zone, it is no longer a
legal target, because it's not treated as the same object."* — and 359.3.e.5 says what is left of the
spell: *"If any of the spell's targets are no longer legal, those game objects, players, or zones are
unaffected by the spell as it resolves. Any instructions related to an illegal target can’t be
followed."* The rules' own worked example there is the removal in this play, `OGN-024 Void Seeker`,
and its *"Draw 1"* still happens for its caster.

## 3. Their order: answer the answer

Heedless Resurrection is a [Reaction] spell cast into a chain, and a chain is exactly where counters
live — 309.1.a: *"Only cards and abilities with the Reaction keyword can be played or activated in a
Closed State."* The opponent who cast the removal gets to respond to your response, and by then the
Monk is gone. A counter takes the spell and keeps the cost — 425.1.c: *"Countering does not refund any
costs paid to play a card, activate an ability, or trigger an ability."* — and 425.1.c.1 closes the
gap you would hope for: *"This includes additional costs."*

## 4. The turns, going first

Mono-Chaos against Fury/Calm. The opponent holds the other battlefield.

```
turn    runes   your turn                                                 at battlefield A
T1      2       Mystic Poro (E2) at base
T2      4       Poro walks to A, Conquer: +1. Ember Monk (E4) at base.    Poro
T3      6       Hold A: +1. Monk walks to A. Shipyard Skulker (E3) at     Poro, Monk
                base. 3 runes left open.
their T3        Void Seeker on the Monk (E3 + 1 Power). In response:
                Heedless Resurrection (E2 + 1 Chaos Power): the Monk
                dies as the cost and comes back to A, exhausted. Void
                Seeker resolves on nothing; they draw 1.                  Poro, Monk
T4      7       Hold A: +1. 3 points.
```

The Power comes from a rune, so it takes one off the board — 164.2.b: *"Recycle this: [Reaction] —
Add [C]."* — and 161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck, not the Main
Deck."* That is why T4 has seven runes and not eight. The line cost you three runes held through
their turn on T3, which is three runes you did not spend on a fourth body.

## 5. Breaks to

**The line breaks to `OGN-045 Defy`** (Calm, E1 + 1 Power, *"[Reaction] (Play any time, even before
spells and abilities resolve.) Counter a spell that costs no more than :rb_energy_4: and no more than
:rb_rune_rainbow:."*), cast in response to Heedless Resurrection. The spell costs E2 and one Power, so
Defy reaches it. Heedless Resurrection is countered, the Monk stays in the trash, and Void Seeker still
fizzles, because its target is gone. Count the cards. If you had let Void Seeker resolve you would be
down the Monk and they would be down nothing, having drawn one for the card they spent. After Defy you
are down the Monk **and** Heedless Resurrection, and they are down one card. Their T3 spends Void Seeker
and Defy, E4 + 2 Power: six runes, which is everything they have by then.

**Inside Chaos, `SFD-136 Hard Bargain`** (E2, *"Counter a spell unless its controller pays
:rb_energy_2:."*) does the same unless you held five runes open instead of three, and **`UNL-131
Abandon`** (E2) counters it and returns Heedless Resurrection to your hand, with the Monk still dead.

**Waiting is also an answer, and it costs nothing.** The line works only while 2 Energy and 1 Chaos
Power sit untapped through the opponent's turn. Removal cast on the turn you spent them meets no
response at all.

## 6. Verdict

**One removal spell blanked for 2 Energy and 1 Power, unless the opponent holds one Energy and one
Power more.** The ordering is forced on you twice: the kill is a mandatory cost, so it comes first, and
the spell is a [Reaction], so it lands in the one window where the opponent can still answer it. When
they do, the counter keeps your unit in the trash. Nothing here scores; the points are the Hold curve
from the Poro.

## 7. Not verified

I did not walk `VEN-152 Rebuttal` (Mind/Chaos, a Signature card), which can take control of a spell
instead of countering it: what Heedless Resurrection's *"your trash"* means once the opponent controls
it is a reading I have not settled. I did not walk a unit with [Deathknell] as the sacrifice, 2v2, or
removal that chooses nothing.

## Leads

- The entry argues the removal misses from 359.3.e.5, which says what happens to an illegal target. The
  reason the returned unit IS an illegal target is 359.3.e.4: it left for a Non-Board Zone and came
  back, so it is a new object.
- The entry names no answer to the line. `OGN-045 Defy` (E1 + 1 Power) counters Heedless Resurrection
  after its cost is paid (425.1.c, 425.1.c.1), leaving the controller a card worse off than not
  responding.
- The entry's *"In response"* step implies 2 Energy and 1 Chaos Power held untapped through the
  opponent's turn. That is the line's real cost on the curve, and the entry does not state it.
