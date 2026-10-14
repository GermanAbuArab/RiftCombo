# Play — Darius is an eight only where they attack, and his ready pays on your turn

Issue #358 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `darius-trifarian-thrill`**, the Fury/Body ENGINE in which `UNL-184 Thrill of the Hunt`,
played on the opponent's turn, is your first card and the unit it replays is your second, so
`OGN-027 Darius, Trifarian` readies and takes +2 Might, and `UNL-183 Pridestalker` adds +1: an 8 in the
middle of their turn. Walked as a game, the trick paid where the opponent attacked Darius. On their T4
four bodies walked into his battlefield, and the 8 plus the replayed body killed all four. Darius's +2
was the margin between that battlefield going uncontrolled and the opponent conquering it. The ready
paid nothing on their turn. It paid on yours, on T4, where two cheap units (not Thrill) readied
Darius after he walked home, and he walked again as a 9. The entry is right about the count and
the 8. It is wrong that the ready makes him available on their turn, and it never says the 8 lives at
one battlefield. The cheapest break is the attack on the other battlefield: no card, no rune.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `1f72233`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 33 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 70 (a hit on *first*), first in the list. The other entry of this slice is rank 71,
`OGN-148 Anivia, Primal` with `SFD-059 Svellsongur`, played in
[The second burn buys Anivia's life, not a kill, and Level 11 only hides her for a turn](2026-10-14-the-second-burn-buys-anivias-life-and-level-11-only-hides-her.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-183 Pridestalker` (Fury/Body) |
| **The payoff** | `OGN-027 Darius, Trifarian` (Fury, E5 + 1 Power, M5) |
| **The engine** | `UNL-184 Thrill of the Hunt` (Fury/Body, E2 + 1 Power, [Reaction]) |
| **The bodies** | `OGN-010 Legion Rearguard` (Fury, E2, M2), `OGN-013 Pouty Poro` (Fury, E2, M2), `VEN-074 Legion Marauder` (Body, E2, M2) |

Thrill of the Hunt is Signature (`data/cards.json`), tagged Rengar. 103.2.d.2: *"All of the
Signature cards must have the Champion tag that corresponds to the Champion Legend of the deck."*
Pridestalker carries the Rengar tag, and its Chosen Champion here is `SFD-025 Rengar, Pouncing`
(Fury). 103.2.d.1 caps the deck at three Signature cards, so three Thrill of the Hunt is the most it
runs. None of these cards is in `data/legality.src.json`.

The card text the play turns on:

- Darius, Trifarian: *"When you play your second card in a turn, give me +2 :rb_might: this turn
  and ready me."*
- Thrill of the Hunt: *"[Reaction] (Play any time, even before spells and abilities resolve.)
  Banish a friendly unit, then its owner plays it to any battlefield, ignoring its cost."*
- Pridestalker: *"When you play a unit, give a unit +1 :rb_might: this turn."* It gives the +1 to a
  unit you choose, not to Darius by default. The 8 needs it on him.
- Pouty Poro: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or
  ability.)"* That is why the Poro is the body the walk banishes.

## 2. When the trick can be played, and what it changes

**On their turn you act only in windows they open.** 310.1.a: *"By default, cards can be played and
abilities activated only when a player has priority on their turn in a Neutral Open state."* Thrill's
keyword is the exception, 813.1.c.1: *"This can be played during Closed States on any player's
turn."* A Closed State exists while their spell or ability is on the chain, and you get priority when
they pass, 312.2.d: *"When the turn is in a Closed State, they are the next Player in Turn Order, and
the player with Priority passes."* In their combat it is a Showdown, 308.1.a: *"Only cards and
abilities with the Action or Reaction keywords can be played or activated in a Showdown State."* The
attacker holds Focus first, and when they pass, 347.2.b: *"Otherwise, Focus passes to the next Player
in Turn Order."* If they open no chain and no combat, there is no window.

**The window never gives you the last word.** Once your chain closes, 347.1.b: *"When that Chain
closes, Focus passes to the next Player in Turn Order."* That is them. If you play it on the Combat
Chain their attack trigger opened, they keep Focus anyway, 346.1: *"Focus will not pass in this way if
the chain opened as a result of a triggered ability being added to the chain, nor if it opened as a
result of an Add ability being added to the chain."* Either way they answer after the trick.

**Two cards from one.** The replay is free, 356.1.b.1: *"If a card allows a player to play a card
"ignoring its cost," its base Energy cost and base Power cost are set to zero."* You play it, since
you own it, and 411.4: *"If an ability triggers when “you” do something, it triggers when a Game
Action that you are responsible for occurs."* So Darius and Pridestalker both trigger on their turn.
When they trigger, 419.4.a: *"Any such triggered abilities trigger when the act of playing the card has
been completed by the resolution of the card."* The unit is played during Thrill's resolution.
Whichever of the two completes second, Darius triggers once. If Thrill is countered, 419.4.a.1: *"If a
game effect prevents the resolution of the card—for example, because the card was countered—abilities
that trigger on playing cards will not trigger."* Nothing is replayed, and nothing triggers.

**The replayed body enters exhausted and still fights.** 359.2.c: *"If it is a Unit, it enters the
Board exhausted at the Location that was chosen."* Thrill's *"to any battlefield"* is a permission,
355.2.b:
*"Some Game Effects may grant players permission to play Units to locations that are not normally
Valid. Such locations become Valid for the purposes of Playing the Unit."* Played into a combat
already open, 464.2.c.3.a: *"If a Unit controlled by the Attacker or Defender becomes present at this
Battlefield after this moment, it will gain the Attacker or Defender designation during the Cleanup
phase following the action that caused it to become present, as appropriate for its controller."*

**On their turn the ready buys nothing.** Defending asks no readiness, 464.2.c.3: *"The attacker and
defender gain the Attacker or Defender designation now, as appropriate. Units at the Contested
Battlefield controlled by the Attacker or Defender gain the Attacker or Defender designation now, as
appropriate."* A move is out of reach on their turn. 410.1.a: *"A Discretionary Action is a Game
Action that may be performed at any time during a player's turn during a Neutral Open State."* In
their Neutral Open State the priority is theirs, 312.2.a: *"When the turn is in a Neutral Open State
during their Main Phase."* In their Showdown or on their chain no unit moves (144.1.b, 144.1.c). Your
Awaken readies him anyway, 315.1.b: *"1. The Turn Player readies all Game Objects they control that
are able to be readied."* Darius has no exhaust ability. On their turn, only the +2 counts, and only
at the battlefield he stands on.

**On your turn the ready is a second move.** A unit at a battlefield walks home, 144.4.b: *"Units may
move from a Battlefield to their Base."* The walk is its exhaust, 144.2: *"Exhausting the Unit is the
Cost for this action."* Readied, he walks out again. Any second card readies him on your turn, not
only Thrill.

## 3. Their deck: Body/Chaos, bodies and an attack trigger

`SFD-203 Battle Mistress` (Body/Chaos): *"When you recycle a rune, you may exhaust me to play a Gold
gear token exhausted. When one or more enemy units die, ready me."* Nothing they play in the walk
costs Power, so they recycle no rune and the legend does nothing. Its Chosen Champion carries the Sivir
tag. They play `UNL-097 Kinkou Initiate` (Body, E3, M3): *"When you play me, draw 1 if your other
units have total Might 5 or more."*, `UNL-092 Demacian Diplomat` (Body, E2, M2): *"When you play me,
gain 1 XP."*, and `OGN-130 Crackshot Corsair` (Body, E3, M3): *"When I attack, deal 1 to an enemy unit
here."* §5 names the Body and Chaos spells that answer the trick.

## 4. The turns, going first

Fury/Body against Body/Chaos. Your battlefield is G; theirs is B. Your opening four are Legion
Rearguard, Pouty Poro, Legion Marauder and Darius. Your T1 draw is a second Legion Rearguard, your T2
draw a second Pouty Poro, your T3 draw Thrill of the Hunt.

```
turn    runes   your turn                                                 points
T1      2       Legion Rearguard (E2) to base.                            0
their T1        Kinkou Initiate (E3) to base. Three runes, none left.
T2      4       The Rearguard walks to G, Conquer: +1. Pouty Poro (E2)    1
                straight to G. Legion Marauder (E2) to base. No runes
                left.
their T2        Kinkou walks to B, Conquer. Crackshot Corsair (E3) and
                Demacian Diplomat (E2, 1 XP) to base. Five runes, none
                left.
T3      6       Hold G: +1. Darius to G: E5 + 1 Fury Power, five runes    2
                exhausted, one of them recycled. One rune ready, five on
                the board.
their T3        Hold B. A second Kinkou Initiate (E3) to base, and it
                draws. A second Diplomat (E2, 1 XP) to base. Seven
                runes, two left. No attack on G.
T4      7       Hold G: +1. Darius walks from G to base. The second       4
                Rearguard (E2) and the second Poro (E2) to base: the
                Poro is your second card, Darius readies and is +2, and
                Pridestalker gives him +1 for each unit, a 9. Darius and
                the Marauder walk to B: 11 against 3. The Marauder and
                Kinkou die. Conquer: +1. Three runes ready, seven on
                the board.
their T4        Corsair, Kinkou and both Diplomats walk to B: 10 against
                Darius 5. Corsair's 1 on Darius. They pass; Thrill of
                the Hunt (E2 + 1 Power, two runes exhausted, one of them
                recycled): banish the Poro in base, play it to B.
                Darius 8, the Poro 2. Their 10 kill both, your 10 kill
                all four. B is uncontrolled. Then a second Corsair (E3)
                and a third Kinkou (E3) to base. Nine runes, three left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 2 after their T4. After their
T4 it is **4 to 2**.

**Your T3, why Darius goes to G.** G holds the Rearguard and the Poro, 2 + 2. Their ready attackers on
their T3 are the Corsair and the Diplomat in base, 3 + 2 and the Corsair's 1, which take a G of 4.
With Darius it is 9, and they do not attack. Kinkou on B cannot help them: only [Ganking] moves a
unit from battlefield to battlefield (144.4.c).

**Your T4, where the ready pays.** Darius walks from G to base, exhausted (144.2). The second
Rearguard is your first card and the second Poro your second: Darius readies and takes +2, and
Pridestalker's two triggers give him +1 each, 5 + 2 + 1 + 1 = **9**. He and the Marauder walk to B in
one move (144.3). Their 3 kill the Marauder, your 11 kill Kinkou, and B is yours: 466.5.d,
*"Establishing Control results in a Conquer if that player has not yet scored this Battlefield this
turn."* No Thrill was needed for any of this, and it stays in hand with three runes up.

**Their T4, the combat at B.** Four ready bodies, 3 + 3 + 2 + 2 = 10, walk in against Darius, a 5
again, since his bonuses lasted your turn. Corsair's trigger chooses an enemy unit here, and Darius is
the only one: 1 on him. They pass, you get Focus (347.2.b), and you play Thrill of the Hunt, your first
card this turn. It banishes the Poro from your base, which their spells that reach *"a unit at a
battlefield"* cannot touch, and you play it to B. The Poro is your second card: Darius is +2 and
ready, and Pridestalker's +1 goes on him, an **8**. The Poro joins as a defender at the cleanup.
They pass, you pass, and the damage step, 465.2.c: *"Starting with the Attacker, each player assigns
an amount of damage equal to their summed Might among the other's Units."* Darius has 1 marked, so 7
is lethal (142.4.b), and 465.2.c.3: *"Units must have lethal damage assigned to them in full before
damage is assigned to a different Unit."* Their 10: 7 on Darius, 2 on the Poro, and both die. Your
10: 3 + 3 + 2 + 2, all four. 466.5.b: *"If there are no Units remaining here controlled by any
player, the Battlefield becomes Uncontrolled."*

**What the trick bought.** Without Thrill, Darius alone takes their 10 and dies, and his 5 kill
Kinkou and one Diplomat. The Corsair and the other Diplomat conquer B: **4 to 3**. With Thrill and
without Darius's +2 (Darius 6, the Poro 2), their 10 kill both (5 + 2), and your 8 kill 8 of their
10: a Diplomat is left and conquers B, again **4 to 3**. Darius's +2 is the difference between B
taken and B uncontrolled: one point and one body. He dies in every version. The ready did nothing,
and 315.1.b would have readied him on your T5.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **7** cards by
T3 and **8** by T4 (four opening, one draw a turn). With three Darius and three Thrill of the Hunt
(103.2.b, and the Signature cap), a Darius among the first 7 is **45.73%**, a Thrill among the first
8 is **50.82%**, and both is **21.71%**. That counts only those two cards. The walk also needs a
2-drop on T1 and three more by T4.

## 5. Breaks to

**The cheapest break is the attack on G: no card, no rune.** On their T4, the same four bodies walk to
G instead. The Corsair's 1 goes on the Rearguard, since choosing the Poro would cost them a rainbow
Power. Thrill can bring the second Poro to G, a 3 with Pridestalker's +1: defenders 2 (1 marked),
2 and 3. Their 10 kill all three (1 + 2 + 3), and your 7 kill the Corsair, Kinkou and nothing more: two
Diplomats conquer G, **4 to 3**. Without Thrill it is the same score. Darius's +2 lands at B, where
nobody is fighting. The price is that Darius lives and Holds B on your T5. Thrill could bring Darius
himself to G instead; whether he then triggers off his own play is the knot the entry declines (§7).

**Five cards answer the trick, at two runes.** They get priority while Thrill is on the chain
(312.2.d) and Focus back once your chain closes (347.1.b), and they have nine runes:

- `UNL-131 Abandon` (Chaos, E2): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Counter a spell. Return it to its owner's hand instead of putting it in their trash.
  [Predict]. (Look at the top card of your Main Deck. You may recycle it.)"* Played on Thrill, it
  stops the replay and both triggers (419.4.a.1). That is the no-Thrill line: they conquer B, 4 to
  3, and Thrill goes back to your hand. `SFD-136 Hard Bargain` (Chaos, E2) does the same here,
  because you have one rune left and cannot pay its E2. Thrill then goes to your trash.
- `VEN-072 Guttural Roar` (Body, E2): *"[Action] (Play on your turn or in showdowns.) Give a unit +2
  :rb_might: this turn. If it's [Empowered], give it +4 :rb_might: this turn instead."* Their 12
  still kill Darius and the Poro (9). Your 10 leave 2 Might of theirs standing, and it conquers B.
  `UNL-095 Grim Resolve` (Body, E2, +3) does it with 1 more to spare.
- `OGN-169 Gust` (Chaos, E1): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."* The Poro
  at B is a 2, but [Deflect] makes it E1 + 1 rainbow Power, two runes. Darius alone, an 8 with 1
  marked, dies to their 10, and your 8 leave a Diplomat to conquer B.

If they run three of one of these cards, one is among the 9 cards they have seen by their T4 (four
opening, four draws and Kinkou's) in **55.58%**; with six, **81.80%**; with twelve (three each of
four), **97.79%**. Each is 9 of 39.

**The scope of the cheap-card verdict.** A Body/Chaos deck plays only Body, Chaos and Body/Chaos cards
(103.1.b.1). In `data/corpus_flat.txt` the spells in those domains with [Action] or [Reaction], the
only spells they can play in their own Showdown (308.1.a), are 38. None breaks the trick for one rune:

- One rune: `SFD-122 Called Shot` (E0 + 1 Power) and `OGN-168 Fight or Flight` are banned in
  Constructed; `OGN-268 Bullet Time` is a Miss Fortune Signature card, which a Sivir legend cannot
  run (103.2.d.2). `OGN-133 Flurry of Blades` deals 1 to all units at battlefields, theirs too: their
  10 still kill only Darius and the Poro, and your 10 now need only 6 to kill all four. `OGN-179
  Acceptable Losses`, `OGN-183 Stacked Deck` and `SFD-135 Factory Recall` touch no unit. Gust is two
  runes against the Poro.
- At two runes, the five above break it. The rest of the two-rune spells, among them `UNL-134
  Existential Dread` (which stuns an *attacking* enemy unit, and yours defend), do not.
- Units that can enter the fight: [Ambush] in those domains is `UNL-114 Nidalee, Cat Form` (E3 + 1),
  `UNL-143 Kha'Zix, Mutating Horror` (E4 + 1), `UNL-149 Diana, No Longer Human` (E4 + 1) and
  `UNL-120 Rengar, Trophy Hunter` (E5 + 1). Four runes at least.

## 6. Verdict

**Right about the count and the 8; wrong about the ready; silent about where the 8 stands.** Thrill
of the Hunt is two cards on their turn, and Darius with Pridestalker is 5 + 2 + 1. On their T4 that
8 and the replayed Poro turned their attack on B from a Conquer into four dead bodies and an
uncontrolled battlefield. Darius's +2 was exactly the margin, and he died anyway. The ready bought
nothing on their turn, because a defender needs no readiness and nobody moves on another player's
turn. It paid on yours, on T4, where two 2-drops readied Darius after he walked home, and he walked
again as a 9 to take B. Thrill was not needed for that. The 8 counts only at Darius's battlefield.
Attacking the other one costs no card, and a two-rune answer after the trick reverses the one they
attack.

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Body runes, Pridestalker's two
domains, in the twelve of Tournament Rules 402.1. Darius on T3 needs one Fury among the six runes
channelled by then: it fails in **1 of 924 deals, 0.11%**. Thrill's Power is one rune of its domain;
`data/cards.json` gives *fury* and *body* and a Power of 1, not which. With one Fury recycled for
Darius, the eight runes channelled by T4 hold a Fury and a Body to spare in **all 495 deals** (0
fail either way), and you choose which three to keep. Their walk costs Energy only. Gust's tax is a
rainbow Power, any domain.

I did not walk Thrill replaying a unit to *their* battlefield. 190.3.a.1: *"Units moving to or being
played to a battlefield apply Contested status if that battlefield is not already Contested and that
Unit’s controller does not already control that battlefield."* 464.2.c.1: *"The Attacker is the
player whose unit(s) applied the Contested status to the Battlefield."* Read together, that is an
attack on their turn. Nor did I walk Thrill replaying Darius himself, which is the knot the entry
declines: whether his trigger sees his own play as the second card. 419.4.a settles when a play
trigger fires, not whether the card that was just played is already watching. I did not walk going
second, the mulligan, Rengar, Pouncing, or 2v2. Their hand holding none of §5's answers is the walk's
assumption; §5 prices it. The probabilities in §4 and §5 count only the cards named.

## Leads

- The notable "THE MIGHT IS 'THIS TURN'" says that on the opponent's turn *"the ready is what makes
  the body available at all"*. It is not. 464.2.c.3 designates every unit at the battlefield, ready
  or not. No move is legal on their turn (410.1.a), and 315.1.b readies Darius at your Awaken. On
  their turn the ready buys nothing; on yours it is a second move.
- Step 5 and `netPerIteration` ("one 8 Might ready Darius on the opponent's turn") name no location.
  The 8 counts only in a combat at Darius's battlefield. The cheapest answer is attacking the other
  battlefield, with no card. The trick also needs a window they open: a chain of theirs (813.1.c.1,
  312.2.d) or their Showdown (308.1.a, 347.2.b).
- The source's *"swing in for eight"* cannot happen on their turn (410.1.a). On your turn Darius's
  half needs no Thrill: any second card readies him and gives the +2. In the walk two 2-drops and
  Pridestalker's two triggers made a 9 that walked twice on T4.
- No notable names the answer after the trick. Focus goes back to them when your chain closes
  (347.1.b), and in their Body/Chaos colours five cards undo it for two runes: `UNL-131 Abandon`,
  `SFD-136 Hard Bargain` when you hold fewer than two runes more, `VEN-072 Guttural Roar`, `UNL-095
  Grim Resolve`, and `OGN-169 Gust` against a [Deflect] body.
  Banish a unit from base, which *"a unit at a battlefield"* spells cannot reach.
- The second notable's 8 assumes Pridestalker's +1 goes on Darius. The legend reads *"give a unit"*;
  it is a choice, and the replayed body is the other candidate.
