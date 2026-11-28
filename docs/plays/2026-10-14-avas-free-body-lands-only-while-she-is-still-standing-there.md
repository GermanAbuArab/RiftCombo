# Play — Ava's free body lands only while she is still standing there

Issue #343 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `ava-achiever-mischievous-marai-attacking-reinforcement`**, the Fury/Mind ENGINE in which
`OGN-107 Ava Achiever` attacks, pays one Mind Power, and puts `UNL-003 Mischievous Marai` from hand
into the battlefield she is attacking, ignoring its cost, where its own trigger deals 2 to an enemy
unit. The entry is right on every step it walks: the Marai lands at the attacked battlefield, its 2
damage kills a 2-Might defender before combat damage, and it joins the attack. Walked as a game, it
won the battlefield. The finding is the one step the entry does not walk: the trigger can be
answered. "Here" is read when the trigger resolves (359.3.f.2), and between the attack and that
moment the defender may play a [Reaction]. A facedown card at the battlefield is one, and from
facedown `OGN-213 Hidden Blade` kills Ava there before the Marai can land. From a Mind/Order hand,
nothing can.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `cdb647e`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 43 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 60 (a hit on *before*), second in the list. The other entry of this slice is rank 59,
`UNL-132 Angler Beast` emptying a battlefield, played in
[the Angler Beast opens the battlefield for a body already in base](2026-10-14-the-angler-beast-opens-the-battlefield-for-a-body-already-in-base.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | a Fury/Mind legend (103.1.b); here `OGN-247 Daughter of the Void` |
| **The engine** | `OGN-107 Ava Achiever` (Mind, E5, M4), attacking |
| **The payload** | `UNL-003 Mischievous Marai` (Fury, E2, M2, [Hidden]), in hand |
| **The cost** | one Mind Power, a Mind rune recycled, paid as the trigger resolves |
| **Their board** | a battlefield with a defender of 2 Might or less, for the 2 damage to kill |

Ava is mono-Mind and the Marai mono-Fury. The entry names three Fury/Mind legends, and
`data/corpus_flat.txt` has exactly those three (`OGN-247`, `SFD-181`, `UNL-181`). Neither card is
in `data/legality.src.json`.

The card text the play turns on:

- Ava Achiever: *"When I attack, you may pay :rb_rune_mind: to play a card with [Hidden] from your
  hand, ignoring its cost. If it's a unit, play it here."*
- Mischievous Marai: *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for
  :rb_energy_0:.) When you play me to a battlefield, deal 2 to an enemy unit here."*
- Daughter of the Void: *":rb_exhaust:: [Reaction] — [Add] :rb_rune_rainbow:. Use only to play
  spells."* It is idle in the walk; its Chosen Champion carries the Kai'Sa tag (103.2.a.2).

## 2. The window between the attack and "here"

Ava's trigger is pending once she has the Attacker designation (464.2.c.3) and goes on the chain at
464.2.e.1: *"The Attacking player, who has Focus, places Triggered Abilities on the Chain first,
followed by all non-Defender players in Turn Order, followed by the Defending Player."* Then 464.2.f:
*"The State Closes if a Combat Chain was created."* Into a closed state only a [Reaction] may be
played. 358.4: *"Example: If the state is Closed and the card wasn’t the one that Closed the state,
ensure that it has [Reaction]."*

When the trigger resolves, "here" is read then and not before, 359.3.f.2: *"Information referenced
in an instruction in this way will be checked on execution of the instruction."* The rule's own
example is this exact window: *"In reaction to the Yasuo, Remorseful attack trigger, their opponent
plays Fight or Flight from hidden targeting Yasuo, moving him back to base. When the attack trigger
resolves, “here” is no longer the battlefield where combat is ongoing and the attack trigger
mistargets."*

The Mind Power is not paid up front either. 205: *"Example: A card effect reads, “When I attack, you
may pay [4][C]. If you do, kill a unit here.” Paying [4][C] in this way is not a cost of the ability,
base or otherwise, but a game action being performed by a player."* You decide whether to pay as the
trigger resolves, after any response, so an answered trigger costs you no rune.

**Which of their cards fit the window.** A facedown card does. 811.1.b: *"Beginning on the next
turn, this gains [Reaction] and you may play this, ignoring its base cost."* From facedown its
targets are chosen at that battlefield (811.1.d.2), and Ava is standing there. A Hidden Blade in
their hand is only an [Action], so it waits until the chain has resolved and the Marai has landed.

## 3. Their order: B, a facedown card, and a Blade in hand

Mind/Order under `OGS-021 Lady of Luminosity - Starter`, whose *"When you play a spell that costs
:rb_energy_5: or more, draw 1."* is idle in the walk. They take B with `OGN-210 Daring Poro` (Order,
E2, M2) and `OGN-091 Pit Crew` (Mind, E3, M3), and hide `OGN-094 Sprite Call` at B: *"[Hidden] (Hide
now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) [Action] (Play on your turn or in
showdowns.) Play a ready 3 :rb_might: Sprite unit token with [Temporary]."* They draw Hidden Blade on
their T3 and cannot hide it: B already holds a facedown card (811.1.b, *"that doesn't already have a
facedown card hidden there"*), and A is not theirs.

## 4. The turns, going first

Fury/Mind against Mind/Order. Your rune deck is six Fury and six Mind; theirs six Mind and six
Order. Your opening four are Legion Rearguard, `OGN-006 Flame Chompers` (Fury, E3, M3; its discard
text is idle), Ava and the Marai; you draw `OGN-024 Void Seeker` (Fury, E3 + 1 Power, [Action]: *"Deal
4 to a unit at a battlefield. Draw 1."*) by T4, and the other draws are bodies for later turns. Theirs
hold Daring Poro, Pit Crew, Sprite Call and Vanguard Sergeant.

```
turn    runes   your turn                                                 points
T1      2       Legion Rearguard (E2) to base.                            0
their T1        Daring Poro (E2) to base, on the 485.7 extra rune.
T2      4       Rearguard walks to A, Conquer: +1. Flame Chompers (E3)    1
                to base. One rune left.
their T2        Poro walks to B, Conquer. Pit Crew (E3) to B. Sprite
                Call hidden at B for its rainbow: an exhausted rune
                recycled. Four runes, two ready.
T3      6       Hold A: +1. Ava (E5) to base. One rune left.              2
their T3        Hold B. Draw Hidden Blade; it stays in hand. Vanguard
                Sergeant (E4) to base. Six runes, two ready.
T4      8       Hold A: +1. Ava and Chompers move base to B together:     4
                combat, you attack and have Focus. Ava's trigger on the
                chain; their Blade in hand cannot answer it (358.4).
                It resolves: a ready Mind rune recycled, the Marai from
                hand to B, base cost ignored. Its trigger: 2 to Poro.
                Cleanup: Poro dies (323.5), the Marai is an Attacker
                (323.2.a). Focus stays yours (346.1): Void Seeker (E3 +
                1 Fury) on Pit Crew, it dies, draw 1. Their Hidden Blade
                from hand on Ava (E2 + 1 Order): she dies, you draw 2.
                You pass; Sprite Call from facedown, free: a ready
                3-Might Sprite at B. Both pass. Chompers and the Marai
                (5) against the Sprite (3): your 5 kill it, their 3
                kill Chompers. The Marai remains: Conquer B, +1. Six
                runes, four ready: a 3-drop from the draws to base.
their T4        Seven runes. The Sergeant walks to A: 4 against the
                Rearguard's 2. Conquer A.
```

Their points: 1 after their T2, 2 after their T3, 3 after their T4. After their T4 it is **4 to 3**.

**Why your Seeker came before their Blade.** 346.1: *"Focus will not pass in this way if the chain
opened as a result of a triggered ability being added to the chain, nor if it opened as a result of
an Add ability being added to the chain."* The combat chain opened on Ava's trigger, so when it had
resolved you still had Focus, and you spent first. 347.1.b: *"When that Chain closes, Focus passes
to the next Player in Turn Order."* Then they cast the Blade.

**Their choices did not change the result.** Had they played Sprite Call into Ava's trigger rather
than later, the Marai's 2 still took Poro, and the Seeker had a second Might-3 target. Had they
killed Chompers rather than Ava, Ava and the Marai (6) would have met the Sprite (3), and Ava would
have survived at B. Killing Ava was their best use of the Blade, and B fell either way.

**The Marai joined the fight because it arrived after the designations.** 464.2.c.3.a: *"If a Unit
controlled by the Attacker or Defender becomes present at this Battlefield after this moment, it will
gain the Attacker or Defender designation during the Cleanup phase following the action that caused
it to become present, as appropriate for its controller."* So did their Sprite, on their side.

**What the same resources would have bought.** Without Ava, the five Energy of T3 are the Marai (E2)
and a 3-drop from the draws (E3), both to base. A Marai played to base deals nothing: its trigger
reads *"When you play me to a battlefield"*. On T4 Chompers, the 3-drop and the Marai attack B, 8
Might against Poro and Pit Crew's 5. The Seeker kills Pit Crew, the Blade kills a 3-drop and Sprite
Call adds 3: 5 against 5. Your 5 kill Poro and the Sprite, their 5 kill your last 3-drop and the
Marai, and nobody remains: 466.5.b, *"If there are no Units remaining here controlled by any player, the
Battlefield becomes Uncontrolled."* **3 to 2 after your T4 and no one holds B, against 4 to 2 with B
yours.** The engine's whole margin in the walk was the 2 damage on Poro and the Marai's 2 Might, for
one Mind rune.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 601.1.b less
the Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **7**
cards by T3 (four opening, three draws) and **8** by T4. With the entry's one Ava, Ava by T3 is
**17.95%**; with the entry's three Marai as well, Ava by T3 and a Marai by T4 is **8.39%**. With three
Ava, **45.73%** and **21.71%**. Going second, they have seen **7** cards by their T3: with three Hidden
Blade among their 39, they hold one in **45.73%** of games.

## 5. Breaks to

**The engine breaks to a facedown `OGN-213 Hidden Blade` at the battlefield she attacks.** Had they
hidden the Blade at B instead of Sprite Call, it would be a [Reaction] on your T4 (811.1.b). They
cast it into Ava's trigger, free (the rainbow was paid when it was hidden), and kill her; you draw 2.
When the trigger resolves, "here" is no longer the battlefield where combat is ongoing (the
359.3.f.2 example), so the Marai is not played into B. By 205 you decline the Mind payment and keep
the rune. The engine is gone for no resources at the time. On this board the attack survives it:
Chompers and the Seeker still take B from Poro and Pit Crew, because the Blade was spent on Ava and
there is no Sprite Call. The free body and its 2 damage never happen.

The scope of *"only"*, in the Mind/Order identity:

- **From hand, nothing removes Ava in the window.** The window admits only [Reaction] (358.4). The
  Mind, Order and Mind/Order cards in `data/corpus_flat.txt` with [Reaction] in their text and no
  [Hidden] are **34**, read by hand. None kills, moves or returns an enemy unit. `OGN-104 Retreat` and
  `VEN-052 Mesmerize` return a *friendly* unit, and the shrinks leave her standing.
  `UNL-063 Eclipse` (E3, -4 with no floor) takes her to 0 Might, which kills nothing. 142.4.b:
  *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s Might."* The
  [Reaction] that matters from hand is a body: `OGN-241 Shen, Kinkou` (Order, E3 + 1 Power, Might 3
  with [Shield 2]) can join B as a 5-Might defender.
- **From facedown, Hidden Blade is the only one that kills her.** The Mind, Order and Mind/Order
  [Hidden] cards other than Ava are **14**. `SFD-070 Wages of Pain` deals 3 to a Might-4 Ava;
  `OGN-220 Facebreaker` stuns her, which leaves her at B, so the trigger still lands the Marai.
  `SFD-202 Hostile Takeover` takes control of her. 359.3.f.4's example says a controller change
  leaves an attack trigger working, so the Marai still lands. `VEN-066 Temporal Breach` banishes her
  and plays her again *"to the same location"*; I did not resolve whether "here" survives that (§7).

**The cheapest partial answer is one Energy from hand: `OGN-104 Retreat`** (Mind, E1, [Reaction]):
*"Return a friendly unit to its owner's hand. Its owner channels 1 rune exhausted."* Cast in reply to
the Marai's trigger, it saves Poro, which they replay later, and the 2 damage has no target. They
even gain a rune. The Marai still lands and still attacks. Among the same 34, `VEN-052 Mesmerize`
(E1 + 1 Power) does the same for two resources, and `OGN-207 Call to Glory` (E3, or free by spending
a buff) makes Poro Might 5 for the turn, so the 2 damage does not kill it.

## 6. Verdict

**Right on every step it walks, silent on the one that breaks it.** The Marai lands at the attacked
battlefield (355.2.b, 359.3.f.2), its 2 damage kills a 2-Might defender before combat damage (323.5),
and it joins the attack (464.2.c.3.a). In the walk that was the margin that took B, for one Mind
rune. What the entry does not walk is the window between the attack and "here": a facedown card at
that battlefield is a [Reaction] there (811.1.b), and from facedown Hidden Blade kills Ava before the
trigger resolves, for nothing at the time. From a Mind/Order hand no [Reaction] removes her. The Mind
Power is paid only as the trigger resolves (205), so an answered trigger costs you no rune.

## 7. Not verified

I did not deal the channel order. Ava's payment needs one Mind on the board on T4: you have channelled
eight runes and recycled none, so with six Mind in the twelve it never fails (0 of 495 deals); with
four, **1 of 495, 0.20%**. Void Seeker's Power is Fury: with six Fury it never fails among eight. Their
Blade from hand needs one Order among their seven channelled runes, keeping it when they recycle for
the hide: with six Order it never fails (0 of 792); with three, **36 of 792, 4.55%**. Sprite Call
from facedown and the hide's rainbow need no domain.

I did not resolve what Ava's *"If it's a unit, play it here"* does when she is dead as it executes.
359.3.f.2.a covers a referent *"related to a target"*, and "here" is her location, not a target; I
rely on the 359.3.f.2 example, a mover rather than a kill, and did not find a paragraph that says
which. With the Mind payment declined (205) the question does not arise in the walk. I did not walk
Temporal Breach or Hostile Takeover into the trigger, a Daughter of the Void rainbow paying a spell's
Power, the mulligan, or 2v2. The probabilities in §4 count only cards in hand at the turn named.

## Leads

- The entry's first notable calls Ava *"the SECOND route into the battlefield you are attacking"*,
  after `SFD-025 Rengar, Pouncing`. [Ambush] is a third, as a keyword. 822.1.b: *"It is functionally
  short for "I may be played to a battlefield where you control Units" and “I have [Reaction] as long
  as I’m being played to a battlefield where you control Units.”"* Once Ava is attacking B you control
  a unit there. `data/corpus_flat.txt` prints [Ambush] on **14** units, five of them Fury or Mind:
  `UNL-002 Inferna`, `UNL-012 Lord Broadmane`, `UNL-021 Grim Apothecary`, `UNL-071 Chakram Dancer` and
  `VEN-017 Morgana, Vindictive`. They pay their full cost, so Ava's route is still the free one.
- No notable says the trigger can be answered. A facedown card at the defended battlefield gains
  [Reaction] (811.1.b), and from facedown Hidden Blade kills Ava before "here" is read (359.3.f.2).
  From a Mind/Order hand, of 34 [Reaction] cards, none removes her (358.4, 142.4.b).
- Step 3 reads *"Pay one Mind Power and play Mischievous Marai from hand"* as if it were paid when she
  attacks. 205 makes the payment a game action performed as the trigger resolves, after any response,
  so an answered trigger costs no rune.
- Not in the entry, and it decided the walk: 346.1 keeps Focus with the attacker after a combat chain
  opened by a trigger, so you act first in the open Showdown after the Marai has landed.
