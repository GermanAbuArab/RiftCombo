# Play — Repulse pays for itself, and the next spell kills Jae

Issue #321 (a slice of #200), 2026-10-13. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `jae-medarda-repulse-counter-that-pays-for-itself`**, the Body/Chaos ENGINE in which
`UNL-106 Repulse` chooses `SFD-142 Jae Medarda` to counter an enemy removal spell aimed at him, and
Jae's *"When you choose me with a spell, draw 1"* replaces the Repulse. The entry is right about the
rules: Repulse is your spell choosing Jae, so his trigger fires, goes on the chain above Repulse and
resolves first. The enemy spell choosing him draws nothing, because it is not you choosing him. Walked
as a game, Jae comes down on T3 at your battlefield, their `OGN-229 Vengeance` on their T3 is countered
for one Energy and one rune off your board, and you are a card up. On their T4 a `OGN-085 Falling
Comet` kills him, and there is no second Repulse. The clause that lets Repulse protect him, *"at a
battlefield"*, is the clause that put him in reach of the Comet. Holding the counter costs one ready
rune, not the two the entry asks for.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-13 at `b10d9a2`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 51 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 50 (a hit on *first*), first in the list. The other entry of this slice is rank 51,
played in
[the save draws its card, and the runes held for it cost the battlefield](2026-10-13-the-save-draws-its-card-and-the-runes-held-for-it-cost-the-battlefield.md).
Jae's line with `SFD-114 Marching Orders` is played in
[Jae draws before anything fights](2026-10-05-jae-draws-before-anything-fights.md), and Repulse with
two `UNL-142 Heedless Resurrection` in [the fourth body walks home](2026-10-07-the-fourth-body-walks-home.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | Body/Chaos (103.1.b); here `OGN-267 Bounty Hunter`, idle in the walk |
| **The payoff** | `SFD-142 Jae Medarda` (Chaos, E5 + 2 Power, M5), at a battlefield you control |
| **The counter** | `UNL-106 Repulse` (Body, E1 + 1 Power), in hand, with one rune ready on their turn and a Body rune on your board |
| **What it answers** | an enemy spell or ability that chooses Jae and no other unit of yours |

The card text the play turns on:

- Jae Medarda (Chaos, E5 + 2 Power, M5): *"When you choose me with a spell, draw 1."*
- Repulse (Body, E1 + 1 Power): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Choose a friendly unit at a battlefield. Counter an enemy spell or ability that chooses it
  and no other friendly unit."*
- Vengeance (theirs, Order, E4 + 2 Power): *"Kill a unit."*
- Falling Comet (theirs, Mind, E5): *"[Action] (Play on your turn or in showdowns.) Deal 6 to a unit at
  a battlefield."*

## 2. Your order: Jae on T3, at A, with one rune held

**Jae is a T3 card, and Repulse fits beside him.** On T3's six runes, Jae's five Energy are five runes
exhausted, 164.2.a: *"[E]: [Reaction] — Add [1]."* His two Chaos Power are two of those five recycled,
164.2.b: *"Recycle this: [Reaction] — Add [C]."* The cost of 164.2.b is the recycle, not an exhaust, so
a tapped rune pays it. That leaves four runes on the board and one of them ready, and the recycled two
go to the bottom of the rune deck, 161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck,
not the Main Deck."*

**One ready rune pays for Repulse.** Its Energy is that rune exhausted; its Body Power is any Body rune
on your board recycled, ready or tapped, the ready one included. The rune stays ready through their
turn, because 415.3.a readies only in your own Awakening: *"A player Readies all non-spell Game Objects
they Control during the Awakening Phase on their turn."* The Energy cannot be banked instead, 167:
*"Every player's Rune Pool empties at the start of each player's Main Phase and the end of each
player's turn."* So the price of holding the counter is one rune left unspent on your turn, and the
price of casting it is that rune and one more off the board.

**Jae goes to A.** Repulse chooses *"a friendly unit at a battlefield"*, so a Jae at your base cannot
be protected at all. He is played to a battlefield you control, 355.2.a: *"By default, Valid locations
include the controller’s Base or a Battlefield the controller controls."*

**The order inside the counter.** Their Vengeance is on the chain, which is a Closed State, and 813.1.c.1
admits Repulse there: *"This can be played during Closed States on any player's turn."*
Repulse chooses Jae, and 355.7 makes that a target: *"When a card Chooses one or more specific Game
Objects to affect, it is Targeted unless indicated otherwise by the rules in this section."* Jae's
clause is a Targeting Effect, 383.4.b.3: *"Although these abilities say “choose” in their Condition,
they trigger specifically when an appropriate Game Object is Targeted."* And 383.4.b.2 puts it above
Repulse: *"These Triggered Abilities are put on the Chain as Pending Items after a spell or ability
that targets an appropriate Game Object is Finalized."* Then 340.1: *"The newest Finalized Chain Item
resolves."* You draw, Repulse resolves, and Vengeance is gone, 425.1.a: *"A card or ability that is
Countered does nothing and is cleared from the chain."* Their runes stay spent, 425.1.c: *"Countering
does not refund any costs paid to play a card, activate an ability, or trigger an ability."*

**Vengeance itself draws you nothing.** Jae's condition is *"When you choose me"*, and the player
choosing him with Vengeance is them. The card comes only from your own spell choosing him.

## 3. Their order: B, bodies, and a removal spell a turn

Mind/Order under `OGN-265 Herald of the Arcane`, whose *":rb_energy_1:, :rb_exhaust:: Play a 1
:rb_might: Recruit unit token."* soaks up a spare rune. They take B on their T2 and build it, which
leaves both sides holding one battlefield: neither A's bodies nor B's can walk to the other
battlefield, since 144.4.a moves a unit only out of base, *"Units may move from their Base to a
Battlefield."* So the answer to a Jae standing at A is a removal spell, one a turn: Vengeance on T3 (no
[Action], so it is played on their own turn), Falling Comet on T4. Every rune they have is spent on
their own turn.

## 4. The turns, going first

Body/Chaos against Mind/Order. Your rune deck is six Body and six Chaos. Your opening four are Veteran
Poro, Shipyard Skulker, Jae Medarda and Repulse. The draws are Determined Sentry, Ember Monk and
Mystic Poro, and Jae's draw on their T3 is a second Shipyard Skulker.

```
turn    runes   your turn                                                 points
T1      2       Veteran Poro (E2) to base.                                0
their T1        Faithful Manufactor (E3) to base, its Recruit token with
                it, on the 485.7 extra rune. All three spent.
T2      4       Poro walks to A, Conquer: +1. Shipyard Skulker (E3) and   1
                Determined Sentry (E1) to A. All four spent.
their T2        Manufactor and Recruit walk to B, Conquer. Daring Poro
                (E2) and a second Manufactor (E3) to B, its Recruit
                there. B is eight Might. All five spent.
T3      6       Hold A: +1. Jae (E5 + 2 Chaos) to A: five tapped, two     2
                tapped Chaos recycled. Four runes, one ready. A is
                eleven Might.
their T3        Hold B. Vengeance (E4 + 2 Order) on Jae: four tapped,
                two tapped Order recycled. You play Repulse: the ready
                rune exhausted, a tapped Body recycled. Jae draws 1,
                Vengeance is countered. Herald (E1): a Recruit to base.
                Watchful Sentry (E2) to B. All seven spent.
T4      5       Hold A: +1. Ember Monk (E4) to A. One ready, and no       3
                Repulse to hold it for.
their T4        Hold B. Falling Comet (E5) on Jae: six damage, and he
                dies in the Cleanup. Daring Poro (E2) to B. All seven
                spent.
```

Their points: 1 on T2, 2 on T3, 3 on T4. After their T4 it is 3 to 3.

Your rune count is the line's own cost made visible: six on T3, four after Jae, three after Repulse,
and five on T4 where eight would have stood without the three Power. 315.3.b channels two a turn,
*"1. The Turn Player channels 2 runes from their Rune Deck."*, and nothing gives back the recycled ones
sooner.

**What the line bought.** Without Repulse, Vengeance kills Jae on their T3, and on their T4 the Comet
kills the Ember Monk at A instead. A holds either way: it is eleven, then fifteen, against bodies that
cannot reach it, and the score is 3 to 3 either way. With Repulse, they spent Vengeance and six of their
seven T3 resources on nothing, and you drew a card for it: one Energy and one rune turned their card
into yours. It is card advantage and not a point, which is what the entry claims: *"nothing here
scores"*.

**What it did not buy is Jae.** One Repulse stops one spell. The Comet on their T4 was out of its reach
for a plainer reason: there was no second copy in hand.

**The battlefield clause cuts both ways.** At your base, Jae is out of reach of the Comet, which reads
*"at a battlefield"*, and in reach of Vengeance, which names no location and which Repulse cannot
answer there. At A, Repulse answers Vengeance and the Comet reaches him. Against a hand of both, he dies
on their T3 or T4 wherever he stands; standing at A is what turns one of the two into a dead card.

**How often this T3 happens.** Jae and Repulse both have to be in the first seven cards: 4 + 3 of 39
(Tournament Rules 601.1.b makes the Main Deck exactly 40, and 103.2.a.1 sets the Chosen Champion
aside). That is **19.2%** of games with three of each and **2.8%** with the entry's one of each,
without a mulligan. And the opponent has to aim single-target removal at Jae while you hold a rune.

## 5. Breaks to

**The line breaks to `OGN-045 Defy`** (Calm, E1 + 1 Power: one rune), cast on Repulse: *"[Reaction]
(Play any time, even before spells and abilities resolve.) Counter a spell that costs no more than
:rb_energy_4: and no more than :rb_rune_rainbow:."* Repulse costs one and one. The chain is Vengeance,
Repulse, Jae's draw, Defy. Defy resolves and Repulse is countered; Jae's draw is its own chain item and
still resolves; then Vengeance kills Jae. A Calm/Order opponent under `OGN-261 Radiant Dawn` holds both
cards. Their price is two cards and E5 + 3 Power for Jae and Repulse, and you keep the one card you
drew. `SFD-045 Not So Fast` (Calm, E2 + 1 Power) does not do this: it counters *"an enemy spell or
ability that chooses a friendly unit or gear"*, and Repulse chooses your unit, which is not theirs.

**This opponent has no counter.** Every counter in the pool carries a Calm, Chaos or Body domain:
Repulse itself is Body, and the three with two domains are `UNL-190 Lilting Lullaby` (Calm/Mind),
`VEN-152 Rebuttal` (Mind/Chaos) and `SFD-206 Riposte` (Body/Order). None of them is legal in a
Mind/Order deck (103.1.b). Mind/Order's
own answer is the restriction in Repulse's last words. `OGN-105 Singularity` (Mind, E6 + 2 Power):
*"Deal 6 to each of up to two units."* Aimed at Jae and the Skulker, it chooses a second friendly unit,
and Repulse counters nothing. It kills both, so the restriction makes their eight-resource spell a
two-for-one. On their T4's seven runes it is six exhausted and two of them recycled, the same turn the
Comet was cast.

**And it breaks for nothing whenever you tap out.** Every turn Jae stands at A, one rune stays ready on
your turn. A T4 that spends all five runes on bodies is a turn on which Vengeance resolves.

## 6. Verdict

**Right, and it is card advantage, not protection.** Repulse chooses Jae, his draw resolves first, and
the countered spell's whole cost is wasted: one Energy and one rune off your board buy their card and
replace your own. The play adds three prices the entry does not state. The counter needs one rune held
ready on every one of your turns, not two, but its Power is a rune recycled off your board each time it
is cast. It covers one spell per copy in hand, so a Jae who draws two removal spells dies to the second,
here on their T4. And Repulse protects him only at a battlefield, which is where the *"at a
battlefield"* removal reaches him.

## 7. Not verified

I did not deal the channel order. Jae's two Chaos Power and Repulse's Body Power need at least two
Chaos and one Body in your first six runes: that fails in 38 of the 924 deals (six Body, five Body and
one Chaos, or six Chaos), 4.1%. Their Vengeance needs two Order among their first seven runes, six Mind
and six Order: that fails in 6 of the 792 deals, 0.8%. The Falling Comet costs no Power. I did not walk
`VEN-152 Rebuttal` taking control of Repulse, `OGN-213 Hidden Blade` (whose *"Its controller draws 2"*
makes letting it resolve a closer call than countering it), `VEN-069 Mel, Newly Awakened`'s
uncounterable spells, a second Repulse in hand on their T4, a Bounty Hunter [Ganking] attack on B, the
mulligan, or 2v2.

## Leads

- The entry's step 1 asks for *"two runes still ready when you pass the turn"*, its step 3 taps *"two
  ready runes"*, and its notables read 164.2.a and 164.2.b as *"two runes deliberately held ready"*. One
  is enough: 164.2.b's cost is the recycle, so the Body Power comes from any Body rune on the board,
  tapped or ready, including the one exhausted for the Energy.
- The entry's netPerIteration, *"-1 Energy -1 Body Power"*, does not count that the Power is a rune off
  the board (161.2.b), which 315.3.b's two a turn do not give back early: here five runes on T4 instead
  of six.
- The entry places Jae's trigger above Repulse by 355.6, 355.7 and 340.1. The rule that puts it there is
  383.4.b.2, a Targeting Effect *"put on the Chain as Pending Items after a spell or ability that targets
  an appropriate Game Object is Finalized"*.
- The entry's prerequisites state the battlefield requirement as a board condition. It is also a cost:
  at a battlefield Jae is in reach of every removal that reads *"at a battlefield"*, which a Jae at base
  is not.
