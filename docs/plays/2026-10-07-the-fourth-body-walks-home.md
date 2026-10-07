# Play — the fourth body walks home

Issue #307 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `repulse-heedless-resurrection-shrink-target-count`**, the Body/Chaos ENGINE in which an
enemy trigger chooses three of your units, two `UNL-142 Heedless Resurrection` kill two of them as their
cost and play them back from the trash, and `UNL-106 Repulse` then counters the trigger, because it now
chooses only one friendly unit. The entry is right about the rule, and the case is Riot's own: the
example at 359.3.e.9.a is `OGN-041 Volibear, Furious`. Walked as a game, the line wins the combat it is
built for, but only for a garrison of exactly three. The attacker picks how many units the trigger
chooses, so a fourth body at the battlefield breaks the line for free, and on the turn Volibear arrives
the right play is to walk one home. A fifth body would have won the fight without any spell. What
breaks the line is a one-rune counter on Repulse after both Heedless Resurrections are paid.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `b39a3a3`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 65 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 35 (a hit on *first*), second in the list. The other entry of this slice is rank 34,
played in
[Time Warp comes a turn early, and a one-rune counter takes it](2026-10-07-time-warp-comes-a-turn-early-and-a-one-rune-counter-takes-it.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | a Body/Chaos legend (103.1.b); here `OGN-267 Bounty Hunter`, idle in the walk |
| **First** | three bodies at your battlefield A, and no fourth |
| **Held open** | five runes through their turn, two Chaos and one Body among them (5 Energy and 3 Power) |
| **Then** | two `UNL-142 Heedless Resurrection` (Chaos, E2 + 1 Power) and `UNL-106 Repulse` (Body, E1 + 1 Power) |

The card text the play turns on:

- Heedless Resurrection: *"[Reaction] (Play any time, even before spells and abilities resolve.) As an
  additional cost to play this, kill a friendly unit. Play a unit from your trash that costs no more
  Energy and no more Power than the killed unit, ignoring its cost."*
- Repulse: *"[Reaction] (Play any time, even before spells and abilities resolve.) Choose a friendly
  unit at a battlefield. Counter an enemy spell or ability that chooses it and no other friendly unit."*
- Volibear, Furious (theirs, Fury, E10 + 2 Power, M9): *"[Deflect 2] (Opponents must pay
  :rb_rune_rainbow::rb_rune_rainbow: to choose me with a spell or ability.) When I attack, deal 5 damage
  split among any number of enemy units here."*
- Relentless Storm (their legend, Fury/Body): *"When you play a [Mighty] unit, you may exhaust me to
  channel 1 rune exhausted. (A unit is Mighty while it has 5+ :rb_might:.)"*

## 2. Your order: kill two, then counter

The rule is 359.3.e.9.a: *"If another spell or ability attempts to reference the number of game
objects, players, or zones that a Finalized Chain Item targets, it will include any mistargeted
choices, but not any targets that have changed to a non-board zone."* Riot works it with these cards. A
move does not shrink the count: *"In reaction, the defending player plays Flash moving two of the three
units back. That player cannot then target the attack trigger with Repulse"*. A kill does: *"If the
defending player instead played Heedless Resurrection twice, killing the two units, Repulse can legally
target the attack trigger, because two of the targets have changed to a non-board zone."*

The kill is the cost, so it happens while Heedless Resurrection is being played. 356.2.a.1: *"Some
Additional Costs specified by Passive Abilities on the card being played or another card are Mandatory,
and must be paid to complete playing the card."* The killed unit is in your trash before the spell
resolves. When it resolves, the killed unit itself always meets *"costs no more Energy and no more
Power than the killed unit"*, so each Heedless Resurrection can play its own victim back.
It is a new object, 359.3.e.4: *"If a target changes Zones to or from a Non-Board Zone and then returns
to its original zone, it is no longer a legal target, because it's not treated as the same object."*
It enters exhausted (143.4), and it can enter at A, because 355.2.a reads *"By default, Valid locations
include the controller’s Base or a Battlefield the controller controls."* A is still yours while you
defend it. If combat is going on there, the returned unit joins it, 464.2.c.3.a: *"If a Unit controlled
by the Attacker or Defender becomes present at this Battlefield after this moment, it will gain the
Attacker or Defender designation during the Cleanup phase following the action that caused it to become
present, as appropriate for its controller."*

So two Heedless Resurrections leave the trigger choosing one friendly unit, and Repulse on that unit is
legal. The bodies are all still yours. The line costs five runes exhausted and three recycled, two
Chaos and one Body, and the five have to be ready on the opponent's turn.

**The count is theirs to choose, and that is the play's own finding.** 355.14.b: *"The Targets are
chosen when the spell or ability is finalized on the chain."* 355.14.c: *"A number of Targets can only
be chosen up to, and not exceeding, the initial amount of damage available when the spell is played."*
Five damage is up to five targets, so Volibear chooses every body you have at A, up to five. Each
Heedless Resurrection takes one body out of the count, and Repulse needs the count at one, so two in hand
cover a garrison of three and no more. A fourth body at A makes Repulse illegal, and the attacker pays
nothing for that.

## 3. Their order: Volibear on T5, attacking on T6

Fury/Body ramp with `OGN-249 Relentless Storm`, Volibear's own legend, holding B. Going second they
have eleven runes on their T5. Volibear costs ten exhausted and two Fury recycled. He is Mighty, so the
legend channels one rune back: ten on the board. He enters exhausted, so he attacks on their T6, from
their base, because 144.4.a reads *"Units may move from their Base to a Battlefield."*

When combat opens at A, the attack trigger goes on the chain and chooses its targets then. The damage
is split later, 355.14.e: *"The choice of how much damage is divided across the split is not decided
until the resolution of the spell or ability."* That cuts both ways. Kill two of three targets and the
trigger still resolves, 359.3.e.8: *"If an instruction has more than one Target and fewer than all of
the Targets become Invalid or Unavailable by the time the spell begins resolving, the instruction will
execute, with only the Targets available and valid being operated on."* The last target then takes all
five.

The fight they expect: your three defenders, Shipyard Skulker 3, Ember Monk 4 and another Skulker 3, are
ten against Volibear's nine. The trigger's five kills the Monk and puts one on a Skulker, and six cannot
kill a 9-Might unit. Then he assigns his nine with lethal in full first, 465.2.c.3: *"Units must have
lethal damage assigned to them in full before damage is assigned to a different Unit."* Two kill the
damaged Skulker, three kill the other, and he conquers A.

## 4. The turns, going first

Body/Chaos against Fury/Body. Your rune deck is six Body and six Chaos.

```
turn    runes   your turn                                                 points
T1      2       Veteran Poro (E2) to base                                 0
their T1        Pouty Poro to base, with the 485.7 extra rune.
T2      4       Poro walks to A, Conquer: +1. Shipyard Skulker (E3) to A. 1
their T2        Pouty Poro walks to B, Conquer. Sentinel Adept (E3) to B.
T3      6       Hold A: +1. Ember Monk (E4) to A.                         2
their T3        Hold B. Bilgewater Bully (E6) to B.
T4      8       Hold A: +1. A second Skulker (E3) to A. Four bodies,      3
                twelve Might. Five runes idle.
their T4        Hold B. Combat Chef (E5) to B. B defends at sixteen.
T5      10      Hold A: +1. The hand is two Heedless Resurrection, a      4
                Repulse and nothing else castable: ten runes idle.
their T5        Hold B. Volibear (E10 + 2 Fury Power) to base: ten runes
                exhausted, two Fury recycled. Relentless Storm channels
                one rune exhausted. Ten runes.
T6      12      Hold A: +1. The Poro walks home (144.4.b): three bodies    5
                at A, ten Might. Twelve runes idle; five are the line.
their T6        Hold B. Volibear walks to A. Combat; his trigger chooses
                all three. Heedless Resurrection: Skulker 1 dies as the
                cost and comes back to A. Again for Skulker 2. Repulse
                on the Monk: the trigger is countered. Ten against
                nine: Volibear dies, two of the three die, and A stays
                yours.
T7      11      Hold A: +1.                                               6
```

Their points: 1 on T2, then one Hold a turn, 5 on T6. The opponent was never idle. They took B, built
it to sixteen, and spent their T5 on a 9-Might threat.

The walk home on T6 is 144.4.b: *"Units may move from a Battlefield to their Base."* With the Poro at A,
Volibear chooses all four. Two Heedless Resurrections leave two chosen, so Repulse is illegal, and the
trigger's five lands on those two. The best pair to leave is the two Skulkers, which five cannot both
kill: one dies, and the Poro, the Monk and the damaged Skulker are nine against nine. Volibear dies,
his nine kill all three, and A is left empty, so you lose it at the next cleanup (323.6). Leave any
other pair and it is seven or eight against nine, and he conquers. Without the Poro, A has ten Might on
three bodies, and the line can shrink three.

The combat after Repulse: the Monk, which was never killed, and the two returned Skulkers, defenders
from the next cleanup. 465.2.b: *"Sum the Might of all Defending Units."* That is ten against nine.
Volibear dies. His nine can kill only two of the three, the Monk and a Skulker or both Skulkers, as he
chooses. 466.3.a: *"A Player has won a combat if they
received either the attacker or defender designation and are the only Player that has units remaining
at this battlefield during this step."* The line cost three cards and three runes off the board (twelve
to nine), and it killed a ten-Energy unit and kept A.

**A fifth body would have done it for free.** Had T5 drawn `OGN-131 Dune Drake` (Body, E5, M5) and put
it on A, the garrison would be seventeen on five bodies. The trigger can kill at most the Poro and a
Skulker. Twelve Might is left, Volibear dies, and no spell is cast. The line is for a thin board. Here
the board was thin because the hand was three [Reaction] spells, which is also why T4 to T6 idled five,
ten and twelve runes. Two of the three Heedless Resurrections and one of the three Repulses are in hand
by their T6, after the opening four cards and six draws from 39, 8.4% of the time.

## 5. Breaks to

**The line breaks to `OGN-045 Defy`** (Calm, E1 + 1 Power: one rune), cast on Repulse after both
Heedless Resurrections are paid: *"[Reaction] (Play any time, even before spells and abilities
resolve.) Counter a spell that costs no more than :rb_energy_4: and no more than :rb_rune_rainbow:."*
Repulse costs one and one. Both Heedless Resurrections have resolved, so the two Skulkers are back at
A, and Repulse's rune is gone, 425.1.c: *"Countering does not refund any costs paid to play a card,
activate an ability, or trigger an ability."* But the trigger resolves on the Monk alone, with all five
(355.14.e, 359.3.e.8),
and the Monk dies. Six against nine: Volibear survives, kills both Skulkers, and conquers A. You are down
three cards, three units, three runes and A. They spent one rune. Volibear is not a Signature card, so
a Fury/Calm build of this deck (`VEN-139 Rogue Assassin`) can hold Defy beside him.
`VEN-039 Crumbling Sands` does the same for the same rune, because by then you have played
another spell this turn. Defy on a Heedless Resurrection breaks it too: that Skulker stays in the trash,
and the Monk and the other Skulker are seven against nine.

The reply is `UNL-131 Abandon` (Chaos, E2: two runes): *"Counter a spell. Return it to its owner's hand
instead of putting it in their trash."* The line plus Abandon is seven runes, and T6 idled twelve. A
second counter from them, at one rune more, wins the exchange.

**And it breaks for nothing to a fourth body**, as §4 shows. Before Volibear is on the board, nothing
tells you to keep A at three.

## 6. Verdict

**Right when it lands, for a garrison of exactly three, and in hand one game in twelve.** The rules
reading is right. A kill takes a target out of the count, a move does not, and Repulse is legal once two
of three are gone. The play adds two prices. The attacker picks the count, so the line covers one body
more than the Heedless Resurrections in hand. On the turn Volibear arrives that means walking a body
off the battlefield you are defending, while one more body put on it would win the fight with no cards
spent. And the payoff is the last spell played, at one Energy and one Power, which is exactly what the
cheapest counter in the pool counters.

## 7. Not verified

I did not walk `OGN-250 Stormbringer` (Volibear's Signature spell), which chooses one of their units and
a battlefield and none of yours, so Repulse cannot touch it. I did not walk three Heedless Resurrections
against four bodies, a token among the targets (a token costs 0, 185.3.a.1, so its Heedless Resurrection
returns nothing), Riot's Flash version, or 2v2. The walk puts the returned Skulkers at A in the middle of
the combat, on 355.2.a and 464.2.c.3.a; no paragraph says in one sentence that a unit played by a
spell's effect may enter a battlefield during combat. If they had to go to base, the Monk would defend
alone at four against nine, A would fall, and the line would save the two Skulkers but not the
battlefield.

## Leads

- The entry's step 4 says *"Let both resolve"*, and a notable says every kill must resolve before
  Repulse is finalized. The kill is Heedless Resurrection's additional cost (356.2.a.1), paid while it is
  played, so the body leaves the count as soon as the spell is on the chain. What is forced is only that
  both are played before Repulse, whose choice is checked when it is played (358.1). Finalizing does not
  pass priority (337.1.a), so all three can go on the chain in a row.
- The entry's net per iteration, *"two units reanimated"*, describes the two units the costs killed. In
  the walk each Heedless Resurrection plays back its own victim, so the board count does not move. What
  the line buys is that none of the three takes the trigger's damage.
- The entry fixes the count at three (*"chooses three of your units"*). The attacker chooses it, up to
  five for Volibear's five damage (355.14.c), from every body at the battlefield. With two Heedless
  Resurrections in hand the line covers three bodies, and a fourth breaks it at no cost.
- Repulse is not the only finisher. A third Heedless Resurrection on the last target leaves the trigger
  with no valid target, and 359.3.e.7 says the instruction then does not execute. That costs one Energy
  more and needs a third copy in hand.
- The entry names no answer. `OGN-045 Defy` (one rune) counters Repulse after both kills are paid, and
  the trigger's whole five then lands on the one unit left (355.14.e, 359.3.e.8).
