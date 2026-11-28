# Play — Flash keeps the bodies, and both battlefields go with them

Issue #350 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `flash-gem-jammer-move-both-ways`**, the Fury/Chaos ENGINE in which `SFD-007 Gem Jammer`
gives a unit [Ganking] for one battlefield-to-battlefield trip on your turn, and `OGS-011 Flash`, a
[Reaction], pulls two units back to base on theirs, out of reach of `OGN-133 Flurry of Blades`.
Walked as a game, both halves worked. On your T3 the Jammer's grant sent a unit from your
battlefield into theirs, and you conquered it while still holding yours. On their T3 Flash took both
your units off the board before the Flurry resolved, and both survived. Two things the entry does
not walk decide the line. The Ganking trip empties the battlefield it leaves, and only a second unit
already standing there when the trip leaves keeps it. And Flash pulled one unit from each battlefield, so it gave
up **both** battlefields, not one. They walked into an empty one and conquered it.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `3ff0f0b`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 37 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 65 (a hit on *before*), first in the list. The other entry of this slice is rank 66,
`OGN-279 Fortified Position` granting [Shield 2] to `UNL-036 Mutated Mouser`, played in
[Fortified Position holds the battlefield, and one Flurry before the attack takes it](2026-10-14-fortified-position-holds-and-one-flurry-before-the-attack-takes-it.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Fury/Chaos legend (103.1.b.2); here `OGN-251 Loose Cannon` |
| **The trip** | `SFD-007 Gem Jammer` (Fury unit, E2, M2) |
| **The retreat** | `OGS-011 Flash` (Chaos spell, E2, [Reaction]) |
| **The bodies** | `OGN-003 Chemtech Enforcer` (Fury, E2, M2) and `SFD-130 Treasure Hunter` (Chaos, E2, M1) |

Neither entry card is Signature (`data/cards.json`), and neither is in `data/legality.src.json`.
Gem Jammer is Fury and Flash is Chaos, so the deck needs both domains.

The card text the play turns on:

- Gem Jammer: *"When you play me, give a unit [Ganking] this turn. (It can move from battlefield to
  battlefield.)"*
- Flash: *"[Reaction] (Play any time, even before spells and abilities resolve.) Move up to 2
  friendly units to base."*
- Chemtech Enforcer: *"[Assault 2] (+2 :rb_might: while I'm an attacker.) When you play me, discard
  1."*
- Treasure Hunter: *"When I move, play a Gold gear token exhausted."*
- Loose Cannon: *"At start of your Beginning Phase, draw 1 if you have one or fewer cards in your
  hand."* Your hand never drops to one in the walk, so it is idle. Its Chosen Champion carries the
  Jinx tag (103.2.a.2).

## 2. What each half can do, and when

**The trip is a Standard Move, on your turn.** 144.4.a: *"Units may move from their Base to a
Battlefield."* 144.4.b: *"Units may move from a Battlefield to their Base."* There is no third
option without the keyword. 144.4.c.1: *"Units with Ganking may use their Standard Move to Move from
Battlefield to Battlefield."* 810.1.c.3 says the grant adds no second move: *"It does not give
additional abilities or activations of Movement, only new options for the Standard Move."* So the
Jammer saves exactly one leg. A unit at your battlefield reaches theirs this turn instead of next.

**The trip empties the battlefield it leaves.** 323.6: *"Players lose control of any controlled
Battlefields without their Units occupying them if the turn is in an Open State and there is no
Showdown or Combat ongoing there."* If the unit that makes the trip was your only unit there, the
battlefield is gone at the next cleanup, and the cleanup comes straight after the move (319.8). A
simultaneous move does not help. 144.3 lets several units move as one action, but 144.3.a: *"When a
Move like this is declared by a player, the units' Destination must be the same."* A unit leaving A
for B and a unit walking from base to A have different destinations, so they are two moves. The
second unit has to walk in **first**, with its own Standard Move. Then the trip leaves, and the
cleanup after it finds a unit of yours still at A. In the other order, the cleanup after the trip
runs 323.6 at A before the second unit arrives.

**The retreat is a [Reaction], on any turn.** 813.1.c.1: *"This can be played during Closed States
on any player's turn."* Flurry of Blades is also a [Reaction] and chooses nothing, *"Deal 1 to all
units at battlefields"* (355.10.d). When they cast it, Flash goes on the chain above it. 340.1:
*"The newest Finalized Chain Item resolves."* Your units are in base before the Flurry resolves, and
a base is not a battlefield. The rulebook walks this exact card at 359.3.e.5: *"In reaction, that
unit's controller plays Flash, moving the unit to their base."*

**A move made by a spell is still a move.** 449: *"Spells, Abilities, or other effects may cause a
Move to occur."* Treasure Hunter's *"When I move"* fires on Flash's move as it does on its own walk.

## 3. Their order: Fury/Body, bodies and one sweeper

`OGN-249 Relentless Storm` (Fury/Body): *"When you play a [Mighty] unit, you may exhaust me to
channel 1 rune exhausted."* Nothing they play is Mighty, so it is idle. Its Chosen Champion carries
the Volibear tag. They play `UNL-092 Demacian Diplomat` (Body, E2, M2, *"When you play me, gain 1
XP."*), `UNL-097 Kinkou Initiate` (Body, E3, M3, *"When you play me, draw 1 if your other units have
total Might 5 or more."*) and `OGN-130 Crackshot Corsair` (Body, E3, M3). Their hand holds
`OGN-133 Flurry of Blades` (Body, E1): *"[Reaction] (Play any time, even before spells and abilities
resolve.) Deal 1 to all units at battlefields."*

## 4. The turns, going first

Fury/Chaos against Fury/Body. Your opening four are Chemtech Enforcer, Treasure Hunter, Gem Jammer
and Flash. Every card either side plays in the walk costs Energy only, so neither rune deck's split
matters to it. A is your battlefield and B is theirs.

```
turn    runes   your turn                                                 points
T1      2       Chemtech Enforcer (E2) to base; discard the card drawn    0
                this turn.
their T1        Demacian Diplomat (E2) to base, 1 XP. Three runes, one
                left.
T2      4       Chemtech Enforcer walks to A, Conquer: +1. Treasure       1
                Hunter (E2) to base. Two runes left.
their T2        Diplomat walks to B, Conquer. Kinkou Initiate (E3) to
                base; their other units total 2, no draw. Five runes,
                two left.
T3      6       Hold A: +1. Treasure Hunter walks base to A (Gold         3
                token). Gem Jammer (E2) to base: Ganking on the
                Enforcer at A. Then the Enforcer walks A to B. At B, 4
                against the Diplomat's 2. Conquer B: +1. Four runes
                left.
their T3        Flurry of Blades (E1). In response, Flash (E2): the
                Enforcer and Treasure Hunter to base (Gold token). The
                Flurry hits no one. Cleanup: A and B both uncontrolled.
                Kinkou Initiate walks to A, Conquer. Crackshot Corsair
                (E3) to base. Seven runes, three left.
T4      8       Treasure Hunter walks to B, Conquer: +1 (Gold token).     5
                The Enforcer and Gem Jammer walk to A: 4 + 2 against
                Kinkou's 3. Conquer A: +1.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3. After your T4 it is **5 to 2**.

**Why they did not attack A on their T2.** The Diplomat's 2 against the Enforcer's 2 on defence kill
each other, and 466.5.b leaves the battlefield uncontrolled: *"If there are no Units remaining here
controlled by any player, the Battlefield becomes Uncontrolled."* That is no point for a body. B was
empty and worth a Conquer. A Flurry on their T2 kills nothing: the Enforcer and the Diplomat are both
2.

**Your T3, the trip.** The Enforcer has been at A since T2 and readied in your Awaken (315.1.b), so
the Jammer's grant goes on it. Without the grant its only move is back to base (144.4.b), and B is a
turn away. Treasure Hunter, in base since T2, walks to A first, with its own Standard Move, and its
trigger makes a Gold token. Only then does the Enforcer leave, so the cleanup after the trip finds
Treasure Hunter at A and A is still yours (§2). At B the Enforcer is an
attacker: 807.1.c, *"While I am an attacker, I have +X [M]."* 465.2.c: *"Starting with the
Attacker, each player assigns an amount of damage equal to their summed Might among the other's
Units."* Its 4 kill the 2-Might Diplomat. The Diplomat's 2 on a 4 are not lethal (142.4.b), and the
Combat Cleanup heals it (466.1.a.1). You conquer B and still control A.

They had two ready runes and the Flurry through your T3. Cast then, it kills Treasure Hunter at A
and does not change the fight at B. §5 walks it.

**Their T3, the retreat.** Before they attack anything they cast Flurry of Blades in their Main
Phase. Treasure Hunter is a 1 at A and dies to it. The Enforcer is a 2 at B and takes 1, and Kinkou
Initiate's 3 would kill it when it defends B. You cast Flash in response and choose both. Flash
resolves first (340.1): both go to base, and Treasure Hunter's trigger makes a second Gold token.
The Flurry resolves with no unit of either player at a battlefield, since all of theirs are in base.
The chain empties, and the cleanup in the Open State that follows applies 323.6 to both battlefields:
you lose A and B. Kinkou Initiate walks into A unopposed. 466.5.d: *"Establishing Control results in
a Conquer if that player has not yet scored this Battlefield this turn."*

**What Flash bought.** Without it the same turn costs you both bodies. The Flurry kills Treasure
Hunter, and A is lost all the same, because nothing of yours is left there. Kinkou Initiate attacks
B: 3 against the Enforcer's 2 with 1 already marked, so the Enforcer dies, and their 3-Might body
takes 2 and lives. They conquer B. It is **3 to 2** either way. With Flash you start T4 with
Treasure Hunter, the Enforcer and Gem Jammer in base, and two Gold tokens. Without it you start with
Gem Jammer alone, take one battlefield on T4, and it is 4 to 2 instead of 5 to 2.

**The ground was the price, and it was both battlefields.** "Up to 2" let Flash take one unit from
each battlefield, and each was your last unit there. One Flash emptied two battlefields, and they
conquered one of them unopposed.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 601.1.b less
the Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **5**
cards by T1, **6** by T2 and **7** by T3 (four opening, one draw a turn), and still 7 on their T3.
The walk's line, at three copies of each, needs an Enforcer by T1, a Treasure Hunter by T2, and a
Gem Jammer and a Flash by T3: **1.50%**. A Gem Jammer and a Flash both by T3 alone is **19.23%**. An
Enforcer on T1 alone is **34.52%**. Their Flurry, three copies in a 39-card pile, is in hand by their
T3 (7 cards seen) in **45.73%**.

## 5. Breaks to

**The cheapest break is a second `OGN-133 Flurry of Blades`, E1, cast in response to Flash.** The
chain resolves newest first (340.1). The second Flurry resolves before Flash: Treasure Hunter dies,
and the Enforcer takes 1. Flash then moves the Enforcer alone. 359.3.e.8: *"the instruction will
execute, with only the Targets available and valid being operated on."* The first Flurry hits no one.
You lose Treasure Hunter, which is what Flash was cast to save, and both battlefields as before.
Kinkou Initiate still conquers A. It costs them one more Energy and a second copy: two or more of
three Flurries in the first 7 cards of 39 is **7.74%**.

**The scope of that verdict.** A Fury/Body deck can play only Fury, Body and Fury/Body cards
(103.1.b.1). Of the cards in `data/corpus_flat.txt` that counter a spell or an ability, the only one in those
domains is `UNL-106 Repulse` (Body, E1 + 1 Power): *"Choose a friendly unit at a battlefield. Counter
an enemy spell or ability that chooses it and no other friendly unit."* Flash chooses only your
units, never one of theirs, so Repulse cannot reach it. Two cards in those domains say *can't move*.
`UNL-111 Determined Sentry` (Body, E1, M1) reads *"I can't move to base."* and binds only itself.
`SFD-014 Minotaur Reckoner` (Fury, E5, M5) reads *"Units can't move to base."*, and 054.1 makes the
prohibition win: *"Cards that forbid actions or effects, as a broad method of determination,
supersede cards that allow or permit that same action or effect."* With the Reckoner on the board,
Flash's move is ignored (359.3.e.6) and the Flurry kills Treasure Hunter. But a unit goes to the
chain when it is played (354), and Flash can be cast in response to the Reckoner itself, before it
resolves. So the Reckoner breaks the line only if it is already on the board, for E5, before Flash
is needed. The last way to break it is to kill Treasure Hunter at [Reaction] speed in response to
Flash. In those domains that is `OGN-033 Shakedown` (Fury, E2 + 1 Power, [Reaction]): *"Choose an
enemy unit. Deal 6 to it unless its controller has you draw 2."* It costs more than a Flurry, and you
can let them draw 2 instead. The [Hidden] `SFD-017 Sudden Storm` and `UNL-003 Mischievous Marai` and
the [Ambush] `UNL-021 Grim Apothecary` and `VEN-017 Morgana, Vindictive` are not available at that
moment. They hold no battlefield and have no unit at one when the Flurry is cast. Anything they had
hidden at B was trashed by 323.7 when you conquered it on T3. That leaves the second Flurry as the
cheapest break in those domains.

**Cast on your turn, the same Flurry costs you the same.** On your T3 they have two ready runes. Cast
in the combat at B, the Flurry kills Treasure Hunter at A, or Flash takes it to base. Either way A is
empty, and 323.6 takes it at the first cleanup in an Open State with no Showdown or Combat
there. At B the Enforcer is a
4 with 1 marked, and the Diplomat's 2 make 3, so it survives, and the Diplomat dies to 4 on a 2 with
1 marked. You still conquer B. It is the same trade as on their turn: Treasure Hunter or Flash, and A.

**`OGN-127 Cannon Barrage`** (Body, E2 + 1 Body Power, [Reaction]) reads *"Deal 2 to all enemy units
in combat."* Your units are in combat only at B on your T3, where the Enforcer is a 4. It is not an
answer to Flash.

## 6. Verdict

**Right about both halves, short about the cost of the retreat, and silent about what the trip
leaves behind.** The Jammer's grant turned a two-turn trip into one and was worth a Conquer, but
only because a second unit walked into the battlefield the first one left before the trip, not with it. Flash
answered Flurry of Blades exactly as the entry says and kept two bodies. Pulling one unit from each
of two battlefields cost both battlefields, and the opponent conquered one of them for free. The
score was the same with or without Flash. The bodies were the whole gain.

## 7. Not verified

No card in the walk costs Power, so it rests on no rune-dealing assumption for either side, at any
split. Of the breaks, Cannon Barrage needs one Body among the five runes they have on your T3; with
six Body in their twelve the five hold none in **6 of 792 deals, 0.76%**. The Reckoner and a second
Flurry are Energy only.

I put Flurry of Blades in their hand, and a second copy in §5's break, and did not price either
beyond the draw figures. I did not walk the T1 discard beyond "the card drawn this turn", Loose
Cannon's draw in a turn where your hand falls to one, the mulligan, or 2v2. The probabilities in §4
count only cards in hand at the turn named.

## Leads

- Step 2 walks the Ganking trip but not the battlefield it leaves. If the unit making the trip is
  your last unit there, 323.6 takes that battlefield at the cleanup after the move. Keeping it needs
  another unit already there when the trip leaves. A simultaneous move cannot do it, because 144.3.a
  requires one destination.
- The fourth notable says Flash "trades a battlefield for two bodies". With one unit at each of two
  battlefields, one Flash empties both, and the opponent conquers one of them unopposed on the same
  turn.
- A move made by Flash is still a move (449), so *"When I move"* triggers fire on the retreat.
  `SFD-130 Treasure Hunter` makes a Gold token each time. No notable mentions it.
- The third notable says `SFD-014 Minotaur Reckoner` switches Flash off "completely". That holds only
  once the Reckoner is on the board. A unit goes to the chain when it is played (354), and Flash can
  be cast in response to it.
- No notable names what breaks Flash. In Fury/Body, the opponent the entry's sweeper comes from, no
  counter can choose it (`UNL-106 Repulse` protects only their own unit). The cheapest break is a
  second Flurry of Blades in response, which resolves first (340.1) and kills the 1-Might body before
  Flash moves it.
