# Play — Last Rites pays on the Hold, so Minefield is the setup and not the engine

Issue #250 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `minefield-last-rites-mill-reanimate`**, the chaos ENGINE in which `SFD-212 Minefield`
mills two cards on a Conquer and `SFD-150 Last Rites` plays a unit back out of the trash on the same
Conquer, with the two triggers ordered so the mill lands first. Nothing in it scores, so neither
turn clock reads it. Walked as a game, the ordering the entry is named for never comes up on the
turn the line is built, and the rate the entry gives is too low: Last Rites fires on every Hold,
not only on a Conquer.

**Why this line.** `scripts/sequence-pick.mjs` re-run on 2026-10-05 at `2aec21b` reads 771 entries,
262 with forced-ordering language and **102 in the queue**, the same numbers as slice 6. The pick
is by global rank, skipping entries that already have a play. Ranks 1 and 2 are played in
[each Svellsongur is worth the deficit](2026-10-05-each-svellsongur-is-worth-the-deficit.md) and
[the Lab is paid before anything resolves](2026-10-05-the-lab-is-paid-before-anything-resolves.md).
This entry is rank 3 (three hits on *first*).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any name with Chaos in its pair — the entry lists sixteen |
| **The payoff** | `SFD-150 Last Rites` (Chaos gear, E3, M+2) |
| **The battlefield** | `SFD-212 Minefield` (colourless), one of your three |
| **A carrier** | `VEN-095 Shadow Order Disciple` (Chaos, E2, M2) — not in the entry; §2 is built on it |
| **Board it wants** | the contested one: Minefield is the battlefield drawn for you, the opponent holds B |

Domain identity from `data/cards.json`: Last Rites and the Disciple are Chaos, Minefield is
colourless, so any Chaos legend admits all three under 103.1.b. None is a Signature card and none
appears in `data/legality.json`. 485.5 draws one of your three battlefields at random, so Minefield
is on the table one game in three.

The card text the play turns on:

- Last Rites: *"[Equip] — :rb_rune_chaos:, Recycle 2 cards from your trash (Pay the cost: Attach
  this to a unit you control.) [Effect] When I conquer or hold, you may play a unit from your trash.
  (You still pay its costs.)"*
- Minefield: *"When you conquer here, put the top 2 cards of your Main Deck into your trash."*
- Shadow Order Disciple: *"When I move, you may [Burn 1] to give me +1 :rb_might: this turn. (To
  Burn 1, put the top card of your Main Deck into your trash.)"*

## 2. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of your Main Phase. A rune pays 1 Energy by exhausting
(164.2.a) and 1 Power by recycling (164.2.b); the recycled rune goes to the Rune Deck (161.2.b) and
two come back each Channel Phase (315.3.b).

```
       R   your Main Phase                                    spent    trash   you
T1     2   Shadow Order Disciple                               E2        0      0
T2     4   Disciple walks to the empty Minefield, Burn 1                  1
           -> Conquer; Minefield mills 2                                  3      1
           Last Rites (E3); Equip on the Disciple:
           1 Chaos rune + recycle 2 from the trash     (R -> 3) E3+1P    1
  their T2: one body walks into B and Conquers it
T3     5   Beginning Phase: Hold Minefield -> Last Rites:
           play a unit from the trash, paying its costs                         2
T4..   ..  the same Beginning Phase every turn, while the trash holds a unit    +1 a turn
```

**Last Rites cannot be on the board for its first Conquer.** Its [Equip] asks for two cards in the
trash, and on T2 the trash holds one until Minefield mills. 203.3: *"If the game action associated
with a Cost is impossible for any reason such that a player cannot perform it, then they cannot pay
the Cost and they will not execute the linked Effect."* So the T2 Conquer pays for the Equip; it
cannot also feed a reanimation. Keep a unit when you choose which two to recycle (416.6: *"take X
cards of the instructed player's choice"*).

**On the board it scores what the Disciple scores**: one Hold a turn, eight on **T9**, the contested
curve exactly. What the engine adds is a body a turn, not a point.

## 3. The rate is a Hold, not a Conquer

The entry says *"one reanimation per Conquer"* and declares `needs: conquer-engine`, with the
argument that a conquer battlefield *"taken and kept fires exactly once in the game"*. That is true
of Minefield and false of Last Rites. Its [Effect] reads *"When I conquer or hold"* — **or hold**, in my own
voice — and 434.1.c makes that text the carrier's: *"The Top-Most card has all Effect
Text of all cards Attached to it appended to its Rules Text."* The Disciple standing at Minefield
holds it every turn (315.2.b.2: *"1. The Turn Player Holds all Battlefields they Control."*), and
383.4.d makes that a Hold Effect: *"Hold Effects are Triggered Abilities whose Condition includes a
Unit being present at a Battlefield during the Beginning phase when a player scores Victory Points
from Holding."*

So Last Rites reanimates once every Beginning Phase with no conquer engine at all. The catalogue
already knows this in `last-rites-sentinel-trash-holds`, which doubles exactly that Hold.

Two consequences:

- **The cost is paid in the Beginning Phase.** 315.1.b readies your runes first (*"1. The Turn
  Player readies all Game Objects they control that are able to be readied."*), so the unit is paid
  from runes that would otherwise be Main Phase Energy. A cheap body is the honest target, as the
  entry says. Play it to Minefield (355.2.a: *"the controller’s Base or a Battlefield the controller
  controls"*) and it is a second holder.
- **Minefield is the trash filler, and only once.** With one Conquer the mill happens once, so the
  Burn Out ceiling the entry calls *"NOT OPTIONAL"* never arrives in this game. The currency after
  T2 is whatever else reaches the trash: the Disciple's Burn 1 each time it moves, spells you cast,
  your units that die.

The ordering the entry is named for — Last Rites placed first, Minefield second, so 340.1 resolves
the mill first — is correct, and it applies only to a SECOND Conquer at Minefield. That needs the
opponent to take Minefield from you and you to take it back.

## 4. What the reanimation buys

One unit a turn, at full price, from a trash that refills slowly. Against a deck that trades bodies
with you every turn the trash stays stocked and the engine is real card advantage. Against a deck
that does not fight, the trash runs dry after the first one or two plays and the engine stops until
something dies. Price it as a refund on trades, not as a card a turn.

## 5. Breaks to

**`SFD-011 Angle Shot`** — Fury, E2, [Reaction]: *"Choose a unit and an Equipment with the same
controller. Attach that Equipment to that unit or detach that Equipment from that unit. Draw 1."*
Cast on the opponent's own turn, choosing your Disciple and your Last Rites. Detached, Last Rites'
[Effect] stops applying (724: *"Effect Text is Inactive unless the card with the Effect Text is
Attached."*), and at the next Cleanup the unattached gear at Minefield goes home (457.1: *"When an
un-attached non-Unit Gear is created or played at a battlefield, or is at a battlefield for any
other reason, it is Recalled to its controller's base during the next Cleanup."*).

The re-Equip is the real price: one Chaos rune **and two cards from the trash**. On T3 the trash
holds one, so by 203.3 the Equip cannot be paid at all, and no reanimation happens until two more
cards have arrived. Two Energy, a card for them, and your engine off for a turn or more.

The obvious answers are worse for them. `SFD-005 Detonate` (Fury, E1 + 1 Power, *"Kill a gear. Its
controller draws 2."*) costs the same two runes and hands you two cards. `OGN-169 Gust` cannot
reach the carrier: the Disciple is Might 4 with Last Rites on, and Gust stops at 3.

**The defence is to keep two cards in the trash.** Then a detach costs you one Chaos rune and the
two cards you recycle, and the Equip goes back on in your own Main Phase (381). Do not recycle the
trash down to one to fund a reanimation if an Angle Shot is possible.

## 6. Verdict

**The engine is better than the entry says and the ordering it is named for is a footnote.** Last
Rites fires on every Hold, so the line reanimates one unit each Beginning Phase from T3 with no
conquer engine. Minefield's job is to put two cards in the trash on T2 so the Equip can be paid, and
it does that once.

**Priced as a game it is the contested curve, T9**, plus one cheap body a turn while the trash holds
a unit. **It breaks to a two-Energy detach on the opponent's turn**, which also makes the re-Equip
unpayable whenever the trash holds fewer than two cards.

## 7. Not verified

I assumed Minefield is the battlefield drawn for you (one in three in a Duel, 485.5), perfect draws,
a unit among the milled cards, and runes in the domains the costs want (108.5.d). I did not walk the
opponent contesting Minefield with a body of Might 5 or more against the Might 4 Disciple, nor a
second Conquer at Minefield, which is where the entry's ordering finally matters.

## Leads

- Last Rites reads *"When I conquer or hold"*, so the entry's `needs: conquer-engine`, its
  `netPerIteration` (*"per Conquer at Minefield"*) and its `terminatesIn` (*"one reanimation per
  Conquer"*) understate the rate: it is one reanimation per Hold, every Beginning Phase, with 434.1.c
  appending the [Effect] to the carrier and 383.4.d making it a Hold Effect.
- The entry's headline ordering (Last Rites placed first, Minefield second) never applies to the
  first Conquer: the Equip asks for two cards in the trash, which on that turn only Minefield's own
  mill can supply (203.3). It applies to a re-Conquer.
- The Burn Out notable (*"BURN OUT IS THE CEILING AND IT IS NOT OPTIONAL"*) prices two cards a turn;
  with Minefield conquered once, the mill is two cards a game.
- `SFD-011 Angle Shot` on the opponent's turn detaches Last Rites for two Energy and makes the
  re-Equip unpayable while the trash holds fewer than two cards. Neither the entry nor its notables
  names a gear answer.
- `VEN-095 Shadow Order Disciple` is a natural carrier: its Burn 1 on every move feeds the trash the
  Equip and the reanimation both spend.
