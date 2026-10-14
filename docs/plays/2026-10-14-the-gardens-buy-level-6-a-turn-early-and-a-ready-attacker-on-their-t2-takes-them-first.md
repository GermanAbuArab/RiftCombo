# Play — The Gardens buy Level 6 a turn early, and a ready attacker on their T2 takes them first

Issue #354 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `gardens-becoming-wuju-xp-faucet`**, the Calm/Body ENGINE in which `UNL-213 Gardens of
Becoming` gives every unit standing there an exhaust for 1 XP, `UNL-191 Wuju Master` turns 6 XP into
+1 Might for all your units and 11 XP into units that enter ready, and `UNL-109 Blood Rose` adds 1 XP
for 1 Energy per unit played. Walked as a game, the faucet paid exactly where it mattered. On your T3
the Gardens' 2 XP made Level 6 live, your four bodies became a 15 the opponent could not attack, and
without those 2 XP they were a 9 that their T3 board takes. Level 11 arrived on T4 and bought one
more XP, not the attack. The entry overstates two things. The faucet does not start a turn late for
every body: from the second one on, you play it straight to the Gardens. And the [Hunt] units a
Calm/Body deck stands there pay as much XP as the Gardens do. The cheapest break needs no card beyond
the walk's own. On their T2, while every body is still a 2, Pridestalker's two triggers make the
ready Rearguard a 4, and it empties the Gardens.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `e879748`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 35 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 69 (a hit on *first*), second in the list. The other entry of this slice is rank 68,
`OGN-231 Commander Ledros` paid for with Bird tokens, played in
[The Poro dies where he has to stand, and the Dredgers alone cast Ledros a turn sooner](2026-10-14-the-poro-dies-where-he-must-stand-and-the-dredgers-alone-cast-ledros-a-turn-sooner.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-191 Wuju Master` (Calm/Body) |
| **The battlefield** | `UNL-213 Gardens of Becoming` (colourless), as one of your three |
| **The gear** | `UNL-109 Blood Rose` (Body, E1) |
| **The bodies** | `UNL-094 Gemhand Hunter` (Body, E2, M2), `UNL-040 Wuju Apprentice` (Calm, E2, M2), `UNL-097 Kinkou Initiate` (Body, E3, M3), `UNL-102 Crowd Favorite` (Body, E3, M3) |

None of these cards is Signature (`data/cards.json`), and none is in `data/legality.src.json`.
`UNL-191 Wuju Master` is not `OGS-019 Wuju Bladesman - Starter`, the legend restricted in 2v2. Its
Chosen Champion carries the Master Yi tag (103.2.a.2), here `UNL-113 Master Yi, Tempered` (Body).

The card text the play turns on:

- Gardens of Becoming: *"Units here have ":rb_exhaust:: Gain 1 XP.""*
- Wuju Master: *"[Level 6][>] Your units have +1 :rb_might:. (While you have 6+ XP, get the effect.)
  [Level 11][>] Your units enter ready."*
- Blood Rose: *"When you play a unit, you may pay :rb_energy_1: to gain 1 XP. Spend 3 XP,
  :rb_exhaust:: Ready a unit."* The walk never uses the second ability, because spending XP lowers
  the level.
- Gemhand Hunter: *"[Hunt] (When I conquer or hold, gain 1 XP.) [Level 6][>] I have +1 :rb_might:."*
- Wuju Apprentice: *"[Hunt] (When I conquer or hold, gain 1 XP.) [Level 6][>] When you play me, draw
  1."*
- Kinkou Initiate: *"When you play me, draw 1 if your other units have total Might 5 or more."*
- Crowd Favorite: *"[Hunt] (When I conquer or hold, gain 1 XP.) Spend 2 XP: [Buff] me."* The walk
  never spends XP.

## 2. How the XP arrives, and when it counts

**A level is a balance, read continuously.** 824.1.b.1: *"It is functionally short for “While you
have [N] or more XP, this card gains ‘[Text]’.”"* 824.1.d: *"The Dependent Ability will be Inactive
as soon as the controlling player has less than [N] XP."* 730.2: *"To Spend XP, reduce the value of
XP marked on the Player spending it."* Nothing in the walk spends, so nothing walks a level back.

**Three faucets feed the same balance.** The Gardens' exhaust pays 1 per body per turn. Blood Rose
pays 1 per unit played, for 1 Energy. And [Hunt], 823.1.c.1: *"Hunt is functionally short for: “When
I Conquer or Hold, my controller gains X XP.”"* Every Hunt unit standing on the Gardens when you Hold
it pays 1 more. The entry names the first two and not the third.

**The exhaust is the price, once per turn.** A unit enters exhausted, 143.4: *"Units enter the Board
exhausted."* Walking costs the same exhaust, 144.2: *"Exhausting the Unit is the Cost for this
action."* So a body pays XP on the turn after it arrives, readied by the Awaken (315.1.b), and an
activated ability is yours to use only on your turn, 381: *"All Activated Abilities can only be
activated on the Controlling Player's Turn and during an Open State."* Who gains the XP is written
out in the entry under both readings of 190.6.d, and both give it to you here, because you control
both the Gardens and the bodies.

**Only the first body has to walk.** Once you control the Gardens, 355.2.a: *"By default, Valid
locations include the controller’s Base or a Battlefield the controller controls."* A unit played
straight there enters exhausted and pays the next turn. Played to base and walked over, it pays a
turn later.

**An exhausted body still defends.** 464.2.c.3: *"Units at the Contested Battlefield controlled by
the Attacker or Defender gain the Attacker or Defender designation now, as appropriate."* No
readiness is asked, so a body that paid for XP is still a full defender.

**Level 11 replaces 143.4.** 143.4.a: *"This can be altered by Accelerate or similar game effects."*
From 11 XP on, a unit you play to the Gardens is ready the moment it lands, and can exhaust for XP or
walk.

## 3. Their deck: Fury/Body, cheap bodies and Assault

`UNL-183 Pridestalker` (Fury/Body): *"When you play a unit, give a unit +1 :rb_might: this turn."*
Its Chosen Champion carries the Rengar tag, here `SFD-025 Rengar, Pouncing` (Fury). They play
`OGN-010 Legion Rearguard` (Fury, E2, M2, [Accelerate]), `OGN-003 Chemtech Enforcer` (Fury, E2, M2):
*"[Assault 2] (+2 :rb_might: while I'm an attacker.) When you play me, discard 1."*, `OGN-130
Crackshot Corsair` (Body, E3, M3): *"When I attack, deal 1 to an enemy unit here."*, `UNL-097 Kinkou
Initiate` and `OGN-136 Pit Rookie` (Body, E2, M2): *"When you play me, buff another friendly unit."*
Pridestalker's +1 from each unit they play lasts the turn and matters only when they attack.

## 4. The turns, going first

Calm/Body against Fury/Body. Your battlefield, Gardens of Becoming, is G; theirs is B. Your opening
four are Gemhand Hunter, Wuju Apprentice, Blood Rose and Kinkou Initiate. Your T1 draw is a second
Gemhand Hunter and your T2 draw is Crowd Favorite. Every card either side plays in the walk costs
Energy only, so neither rune deck's split matters to it.

```
turn    runes   your turn                                                 XP   points
T1      2       Gemhand Hunter (E2) to base.                              0    0
their T1        Legion Rearguard (E2) to base. Three runes, one left.
T2      4       Gemhand walks to G, Conquer: +1, its Hunt +1 XP. Blood    2    1
                Rose (E1). Wuju Apprentice (E2) straight to G, Blood
                Rose's E1: +1 XP. No runes left.
their T2        Rearguard walks to B, Conquer. Chemtech Enforcer (E2,
                discard 1) and Crackshot Corsair (E3) to base. Five
                runes, none left.
T3      6       Hold G: +1, two Hunts +2 XP. Gemhand and Apprentice       7    2
                exhaust at G: +2 XP, Level 6 is live. Kinkou Initiate
                (E3) to G, Blood Rose's E1 +1 XP, and Kinkou draws. The
                second Gemhand Hunter (E2) to G. No runes left.
their T3        Hold B. Kinkou Initiate (E3) and Pit Rookie (E2) to B,
                the Rookie buffing the Corsair. Seven runes, two left.
                No attack on G.
T4      8       Hold G: +1, three Hunts +3 XP (10). Apprentice exhausts:  13   4
                +1, Level 11 is live. Crowd Favorite (E3) to G, enters
                ready, Blood Rose's E1 +1 XP. The second Gemhand exhausts:
                +1. Gemhand, Kinkou and Crowd Favorite walk to B: 12
                against 7. B falls, Conquer: +1.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3. After your T4 it is **4 to 2**.
Your XP is 13 before the combat at B, and 14 or 15 after it, depending on whether the attacker they
kill is one of your two with Hunt.

**Why they did not attack G on their T2.** They could have, with the same cards. Pridestalker reads
*"When you play a unit, give a unit +1 :rb_might: this turn."* Chemtech Enforcer and Crackshot
Corsair, played before the move, make the ready Rearguard a 4. It walks from base to G: 4 against
Gemhand 2 and Apprentice 2. Their 4 kill both, your 4 kill it, and nobody is left. 466.5.b: *"If
there are no Units remaining here controlled by any player, the Battlefield becomes Uncontrolled."*
That costs them the Rearguard and B's Conquer: 1 to 0 after their T2 instead of 1 to 1. They took the
point and kept the body. §5 walks the attack, because it is the cheapest break.

**Your T3, where the faucet pays.** At the start of the turn you have 2 XP. The Hold and the two Hunts
make 4, and exhausting Gemhand and Apprentice at G makes 6. Level 6 is live before you play anything,
so every body is +1 and Gemhand Hunter's own Level 6 adds 1 more: Gemhand 4, Apprentice 3. Kinkou
Initiate sees 7 Might among your other units and draws, and is a 4 itself. The second Gemhand is a 4.
Four bodies at G, 4 + 3 + 4 + 4 = **15**.

**Why they did not attack G on their T3.** Rearguard stands at B, and only [Ganking] moves a unit from
battlefield to battlefield (144.4.c), so their attackers are the two in base: the Enforcer (4 as an
attacker) and the Corsair (4 with the Rookie's buff), so 8. Each of their two plays adds +1 this turn
through Pridestalker, so 10, and the Corsair's trigger adds 1 damage. That is 11 against bodies whose
lethal damage (142.4.b) sums to 15: they kill at most three, and your 15 kill both attackers. They
held B instead.

**What the Gardens bought.** Take the Gardens' 2 XP off your T3 and you have 5: 1 from the T2 Hunt,
1 from Blood Rose on T2, 2 from the T3 Hunts, 1 from Blood Rose on Kinkou. Level 6 is one short.
Gemhand and Apprentice are 2s, Kinkou a 3 who draws nothing (4 among the others), the second Gemhand
a 2: **9**. Their 10 and the Corsair's 1 kill all four, your 9 cannot kill both attackers (10 between
them), and the one left conquers G (466.5). The Gardens' 2 XP on T3 are the margin between keeping G and
losing it with every body on it.

**What Level 11 bought.** On T4 Crowd Favorite enters ready (143.4.a) and walks to B. Without Level
11 it enters exhausted, and the second Gemhand walks instead of paying XP. The attack is 12 either
way: Level 11 was worth one XP on T4. The attack is 12 against 7 because of Level 6, not 11. At B
their 7 kill one of your 4s, your 12 kill Rearguard (2), Kinkou (3) and the Rookie (2), and B is
yours: 466.5.d, *"Establishing Control results in a Conquer if that player has not yet scored this
Battlefield this turn."*

**How often this happens.** Gardens of Becoming has to be the battlefield the game uses. 485.5:
*"Each player randomly selects one (1) of their three (3) Battlefields."* Tournament Rules 402.1
makes the three unique names, so that is **1 in 3**. The draw pile is **39** cards, the 40 of
Tournament Rules 402.1 less the Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going
first you have seen **5** cards by T1 and **6** by T2 (four opening, one draw a turn). With six Hunt
2-drops (three Gemhand Hunter, three Wuju Apprentice) and three Blood Rose, two Hunt 2-drops and a
Blood Rose among the first 6 cards (which puts one of the two among the first 5) is **7.11%**. Times
the battlefield, the walk's first two turns are **2.37%** of games. One Hunt 2-drop by T1 alone is
**58.78%**.

## 5. Breaks to

**The cheapest break is the walk's own T2, pointed at G.** On their T2 your G holds Gemhand and
Apprentice, two 2s, and you have 2 XP. The Rearguard played on their T1 is ready, and the Enforcer
and the Corsair, played first, make it a 4 through Pridestalker. It walks to G and trades for both
bodies, and 466.5.b leaves G uncontrolled. It costs no card and no rune beyond the walk's five. The
price is the Rearguard and B's Conquer, 1 to 0 after their T2. You have no body on the board, and
355.2.a sends every unit you play on T3 to your base. The faucet is off until a body walks back, and
that walk is its exhaust (144.2), so the first XP from the Gardens comes on your T4.

**A second ready attacker conquers G instead of emptying it.** Rearguard was played on their T1
and is ready. They play a second `OGN-010 Legion Rearguard` with its Accelerate, 805.1.a: *"As you
play me, you may pay [1][C] as an additional cost. If you do, I enter ready."* That is E2 + E1 + 1
Fury Power, three runes, one of them exhausted for the Energy and recycled for the Power (164.2.a,
164.2.b). Pridestalker gives the first Rearguard +1. Both walk from base to G in one move (144.3):
3 + 2 = 5 against 2 + 2. Their 5 kill both bodies. Your 4 kill one Rearguard and not both, which
needs 5. The survivor conquers G: 1 to 1 after their T2, with two runes left over. You have no body
on the board, G is theirs, and 355.2.a sends every unit you play on T3 to your base, so the faucet is
off until you take G back. A `UNL-006 Sharkling` played with its Accelerate (E4 + 1 Fury Power, M1,
+4 while attacking) does the same with one Rearguard. The walk's T1 Rearguard is one of six copies,
three Legion Rearguard and three Sharkling. Given it, one of the other five is among the other five
cards they have seen by their T2 (38 left) in **52.72%**. Not given it, at least one of the six is in
6 of 39 cards in **66.05%**; three Sharkling alone, **40.30%**.

**The walk's own hand saves G, at the price of the T3 wall.** Played on T2 with the four runes that
went to Blood Rose, the Apprentice and the Rose's XP, the Apprentice and the second Gemhand make three
2s at G against their 5: they kill two, your 6 kill both Rearguards, and G stays yours with one body.
You are at 1 XP, with one Hunt body and one exhaust on T3, so Level 6 is not live on T3. `UNL-031 Combat
Experience` (Calm, E1, [Reaction]), held instead of the Rose's XP, makes one defender a 3: their 5
still kill both, your 5 kill both Rearguards, nobody is left, and 466.5.b leaves G uncontrolled.
Against the single 4 of the first break, the same three 2s lose two and kill it, and G stays yours.

**After Level 6 the same attack costs them a board.** On their T3 your G is the 15 of §4. A ready
Sharkling (E4 + 1 Fury Power, 5 as an attacker) and one more E3 play beside the walk's Enforcer and
Corsair, the two in base, make 4 + 3 + 5 + 2 = 14 and the Corsair's 1: exactly the 15 that kills all
four bodies. Your 15 kill all three attackers (14 between them). Nobody is left, and 466.5.b leaves G
uncontrolled. They spend their whole T3 and three attackers to empty it. With three Sharkling it is in
their hand by their T3 (7 of 39 cards seen) in **45.73%**.

**The scope of the cheap-card verdict.** A Fury/Body deck plays only Fury, Body and Fury/Body cards
(103.1.b.1). The cards in those domains in `data/corpus_flat.txt` whose text reaches *all units*,
*all enemy units*, *all damaged enemy units* or *enemy units here* are ten. Read with Pridestalker's
+1, one of them removes both 2-Might bodies from the Gardens on their T2 for fewer runes than the
Rearguard's three. None does it with no card, as the first break does:

- `OGN-133 Flurry of Blades` (Body, E1) deals 1, and every body is a 2 or more.
- `OGN-127 Cannon Barrage` (Body, E2 + 1 Power) deals 2 only to units in combat, so it needs the
  attack it would help.
- `UNL-107 Stare Down` (Body, E2): *"Choose a friendly unit and a battlefield. Move all enemy units at
  that battlefield with less Might than the chosen unit to their base."* Play the Enforcer first and
  the Rearguard is a 3. Stare Down, choosing the Rearguard and G, sends Gemhand and Apprentice to
  base. 323.6 strips G at the next cleanup, and the Rearguard walks in and conquers it. With the
  Enforcer that is four of their five runes, and Stare Down's own share is two. You keep both bodies,
  in base, and the faucet is off as in the first break.
- `OGN-041 Volibear, Furious`, `OGN-148 Anivia, Primal`, `OGN-159 Warwick, Hunter`, `OGN-250
  Stormbringer`, `OGS-002 Firestorm`, `VEN-019 Renekton, Rage Fueled` and `VEN-091 Corrupted Dragon`
  all cost E6 or more.

## 6. Verdict

**Right about the rate and about only summing; wrong that the faucet starts late for every body, and
silent about Hunt.** The Gardens paid 2 XP on T3 and that was the whole difference: Level 6 on T3
made four bodies a 15 their board could not attack, where without it they were a 9 that their board
takes. Level 11 arrived on T4 and bought one XP. Hunt paid 6 of the 13 XP by T4, the Gardens 4, and
Blood Rose 3. The faucet's weak turn is the opponent's T2, before Level 6, when two 2s stand on the
Gardens. Pridestalker's triggers from the walk's own T2 plays make the Rearguard a 4 that empties it
for no extra card, at the price of a body and a point. A second ready attacker conquers it outright
for three runes.

## 7. Not verified

No card in the walk costs Power, so it rests on no rune-dealing assumption for either side, at any
split. The break's Accelerate needs one Fury among the five runes they have on their T2. With six
Fury in the twelve the five hold none in **6 of 792 deals, 0.76%**. The Sharkling on their T3 needs
one Fury among seven: with six in twelve that always holds. The cheapest break, the Rearguard made a
4 on their T2, and the Stare Down line cost Energy only, so they add no rune assumption.

I did not walk the T3
attack on B that Gemhand and Apprentice give up by exhausting for XP, Gardens of Becoming as their
battlefield instead of yours (their units at G gain the same exhaust), Combat Experience at Level 6
(+3), the mulligan, or 2v2. The probabilities in §4 and §5 count only cards in hand at the turn
named.

## Leads

- The notable "THE FAUCET STARTS A TURN LATE, EVERY TIME" and the first step ("walk bodies there")
  hold only for the body that takes the Gardens. Once you control it, 355.2.a lets a unit be played
  straight there. It enters exhausted (143.4) and pays the next turn, a turn earlier than a body
  played to base and walked over.
- No notable mentions [Hunt]. Calm/Body's cheap bodies carry it (`UNL-094 Gemhand Hunter`, `UNL-040
  Wuju Apprentice`, `UNL-102 Crowd Favorite`), and each one standing on the Gardens pays 1 more XP on
  every Hold (823.1.c.1). In the walk Hunt paid 6 of the 13 XP by T4, more than the Gardens' 4.
- "With four bodies that is 11 XP in three turns": the walk's first turn with four bodies on the
  Gardens is T4, and two of them walked to B instead of paying. Level 6 on T3, not 11 XP, is what the
  Gardens bought.
- No notable names the window before Level 6. On their T2 the bodies are 2s. Against a Pridestalker
  legend, the two units a deck plays on its T2 make a ready T1 unit a 4, which empties the Gardens with
  no extra card (466.5.b). A second unit that enters ready (`OGN-010 Legion Rearguard` or `UNL-006
  Sharkling` with Accelerate) conquers it for three or four runes.
