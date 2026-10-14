# Play — Fortified Position holds the battlefield, and one Flurry before the attack takes it

Issue #350 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `fortified-position-mutated-mouser-shield-lasts-the-combat`**, the Calm ENGINE in which
`OGN-279 Fortified Position` grants [Shield 2] for a combat, and `UNL-036 Mutated Mouser`, a 1-Might
body with printed [Shield 2] and [Tank], defends as a 5 when the grant goes on it. Walked as a game,
the wall held. On their T3 two attackers with 5 Might between them hit two Mousers. The grant was the
difference between keeping the battlefield and an empty one: with it they lost both attackers and
you kept a Mouser and the battlefield. The entry's own answer clause gets the timing wrong.
`OGN-133 Flurry of Blades` cannot kill a Mouser "in response to the very trigger this engine exists
to fire". By then the Mouser is a defender and a 3. It kills them in the opponent's Main Phase,
before the attack, when every Mouser is a 1. Cast there, one Energy takes both Mousers and the
battlefield.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `3ff0f0b`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 37 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 66 (a hit on *before*), second in the list. The other entry of this slice is rank 65,
`SFD-007 Gem Jammer` and `OGS-011 Flash` moving units both ways, played in
[Flash keeps the bodies, and both battlefields go with them](2026-10-14-flash-keeps-the-bodies-and-both-battlefields-go-with-them.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Calm among its two domains (103.1.b.1); here `OGN-261 Radiant Dawn` (Calm/Order) |
| **The battlefield** | `OGN-279 Fortified Position` (colourless), as one of your three |
| **The bodies** | `UNL-036 Mutated Mouser` (Calm, E2, M1) |

Neither card is Signature (`data/cards.json`), and neither is in `data/legality.src.json`.

The card text the play turns on:

- Fortified Position: *"When you defend here, choose a unit. It gains [Shield 2] this combat. (+2
  :rb_might: while it's a defender.)"*
- Mutated Mouser: *"[Shield 2] (+2 :rb_might: while I'm a defender.) [Tank] (I must be assigned
  combat damage first.)"*
- Radiant Dawn: *"When you stun one or more enemy units, buff a friendly unit."* You stun nothing in
  the walk, so it is idle. Its Chosen Champion carries the Leona tag (103.2.a.2).

## 2. When a Mouser is a 5, a 3 and a 1

**Shield counts only while the Mouser is a defender.** 814.1.c: *"While I am a defender, I have +X [M]."* 814.1.d: *"Being a defender means the Unit has gained the
Defender designation during Combat."* Out of combat a Mouser is a 1. Every Mouser is a 3 as a defender,
the printed Shield 2 on its Might 1.

**The battlefield's grant is a Defend Trigger, so it comes after the designation.** 383.4.f.2:
*"These Triggered Abilities are put on the Chain as Pending Items after the Unit these effects
correspond to gains the Defender designation during Combat."* By the time the grant is on the chain
the Mousers are already 3s. When it resolves, 814.2 sums the two: *"If a Unit has Shield, or has
been granted Shield, and is granted Shield by an additional source, the Shield Value of all granted
Shield keywords is summed."* The chosen Mouser is Shield 4, a 5. The grant lasts the combat, and
814.1.d.1 keeps it as long as the designation: *"Shield remains in effect as long as the Unit
maintains the Defender designation."*

**Only the controller gets the grant.** 190.6.d: *"“You” in a battlefield’s abilities refers to the
battlefield’s Controller"*. You have to control Fortified Position when they attack it.

**[Tank] decides where their damage goes.** 815.1.b: *"I must be assigned lethal damage before any
other unit with the same controller as me that does not have [Tank] during the Combat Damage
step."* With two Mousers, 815.1.c.2: *"If more than one unit with Tank is present with the same
controller in Combat, damage may be assigned to any of them."*

## 3. Their order: Body/Chaos, bodies and an attack trigger

`SFD-203 Battle Mistress` (Body/Chaos): *"When you recycle a rune, you may exhaust me to play a Gold
gear token exhausted. When one or more enemy units die, ready me."* Nothing they play costs Power, so
they recycle no rune, and readying the legend does nothing in the walk. Its Chosen Champion carries
the Sivir tag. They play `UNL-097 Kinkou Initiate` (Body, E3, M3), `UNL-092 Demacian Diplomat`
(Body, E2, M2) and `OGN-130 Crackshot Corsair` (Body, E3, M3): *"When I attack, deal 1 to an enemy
unit here."* That trigger chooses, so it targets (355.10).

## 4. The turns, going first

Calm/Order against Body/Chaos. Your battlefield, Fortified Position, is FP; theirs is B. Your
opening four are two Mutated Mousers and two cards for later turns. `SFD-038 Ribbon Dancer` is Calm,
E3, M3. Every card either side plays in the walk costs Energy only, so neither rune deck's split
matters to it.

```
turn    runes   your turn                                                 points
T1      2       Mutated Mouser (E2) to base.                              0
their T1        Kinkou Initiate (E3) to base. Three runes, none left.
T2      4       The Mouser walks to FP, Conquer: +1. A second Mouser      1
                (E2) to base. Two runes left.
their T2        Kinkou Initiate walks to B, Conquer. Crackshot Corsair
                (E3) and Demacian Diplomat (E2, 1 XP) to base. Five
                runes, none left.
T3      6       Hold FP: +1. The second Mouser walks to FP. Ribbon        2
                Dancer (E3) to base. Three runes left.
their T3        Hold B. Corsair and Diplomat walk from base to FP: 3 + 2
                against two Mousers. Corsair's trigger: 1 on the first
                Mouser. FP's grant: the second Mouser is a 5. Their 5
                kill one Mouser; your 8 kill both attackers. FP stays
                yours. Seven runes, all ready.
T4      8       Hold FP: +1.                                              3
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3. After your T4 it is **3 to 2**.

**Why they did not attack FP on their T2.** Kinkou Initiate's 3 against one Mouser: the Mouser is a
3 on its printed Shield and a 5 with the grant. Their 3 on a 5 are not lethal, and its 5 kill
Kinkou. B was empty and worth a Conquer.

**Their T3, the combat.** Both walk in from base in one move (144.3), and the cleanup after the move
stages the combat (323.9). When it opens, 464.2.c.3 gives the two Mousers the Defender designation,
and each is a 3. Two triggers are pending: Corsair's attack trigger and Fortified Position's defend
trigger. 464.2.e.1: *"The Attacking player, who has Focus, places Triggered Abilities on the Chain
first, followed by all non-Defender players in Turn Order, followed by the Defending Player."* The
Corsair's 1 is aimed at the first Mouser before you place the grant, and 340.1 resolves the newest
item first: *"The newest Finalized Chain Item resolves."* The grant goes on the second Mouser and
resolves first. Then the Corsair's 1 lands on the first Mouser.

The damage step, 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal
to their summed Might among the other's Units."* They have 3 + 2 = 5. The first Mouser is a 3 with 1
marked and needs 2 more. The second is a 5. Both have [Tank], so 815.1.c.2 lets them pick. Either
they put 2 on the first and 3 on the second, and the first dies, or they put 5 on the second, which
dies, and the first lives with 1 marked. One Mouser dies either way. You have 3 + 5 = 8, and 3 on
the Corsair plus 2 on the Diplomat kill both. Your surviving Mouser keeps Fortified Position, and the
Combat Cleanup heals it (466.1.a.1). Had you put the grant on the first Mouser instead, it would be
a 5 with 1 marked, needing 4. Their 5 kill either Mouser but never both.

**What the grant bought.** Without it both Mousers are 3s, one with 1 marked: their 5 are 2 + 3 and
kill both. Your 6 still kill both attackers. Nobody is left, and 466.5.b: *"If there are no Units
remaining here controlled by any player, the Battlefield becomes Uncontrolled."* You lose the Hold on
T4: 2 to 2 instead of 3 to 2, and you have no Mouser left. The grant's +2 is exactly that margin.

**How often this happens.** Fortified Position has to be the battlefield the game uses. 485.5:
*"Each player randomly selects one (1) of their three (3) Battlefields."* Tournament Rules 402.1
makes the three unique names, so that is **1 in 3**. The draw pile is **39** cards, the 40 of
Tournament Rules 601.1.b less the Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going
first you have seen **5** cards by T1 and **6** by T2 (four opening, one draw a turn). At three
Mousers, one by T1 and two by T2 is **5.64%**. Times the battlefield, the walk's line is **1.88%** of
games. One Mouser by T1 alone is **34.52%**.

## 5. Breaks to

**The cheapest break is `OGN-133 Flurry of Blades` (Body, E1), cast in their Main Phase before the
attack.** *"Deal 1 to all units at battlefields."* Out of combat every Mouser is a 1 (814.1.c), so 1
is lethal (142.4.b). 370.1.a.2 kills both at once: *"An event can occur simultaneously with other
events only when those events are all the result of the same Game Action or change in state
occurring."* Fortified Position is empty, and the next cleanup in the Open State takes it (323.6).
Walked on their T3: Hold B, 2. Flurry: both Mousers die, and Kinkou Initiate at B takes 1 and lives.
Corsair and the Diplomat walk into Fortified Position unopposed: Conquer, 3. You have no Hold on T4,
and it is **2 to 3** after their T3, for one Energy. With three copies in a 39-card pile, it is in
their hand by their T2 (6 cards seen) in **40.30%** and by their T3 (7 seen) in **45.73%**. On their
T2 it kills the one Mouser at FP the same way, and Kinkou Initiate walks into FP instead of B.

**Inside the combat the Flurry kills nothing by itself.** The moment the grant is on the chain (383.4.f.2), every
Mouser is a defender and a 3, so 1 damage does not kill one. Cast in response to the grant, the Flurry
puts 1 on each Mouser and 1 on each attacker. In the walk's combat that makes the first Mouser need 1
more, the second 4 if the grant is on it, and the Corsair and Diplomat need 2 and 1. Their 5 then kill
both Mousers (1 + 4), and your 8 still kill both attackers. Nobody is left, and Fortified Position is
uncontrolled (466.5.b). Cast in the combat, the Flurry still costs you both Mousers and the
battlefield, but both attackers die with them. Cast before it, they keep both attackers and conquer.

**The scope of that verdict.** A Body/Chaos deck plays only Body, Chaos and Body/Chaos cards
(103.1.b.1). The cards in those domains in `data/corpus_flat.txt` whose text reaches *all units*,
*all enemy units*, *each unit*, *all other units* or *all friendly units* are ten. Flurry of Blades is the cheapest that
removes two Mousers from Fortified Position:

- `OGN-268 Bullet Time` (Body/Chaos, E1 plus any Power) is Signature with the Miss Fortune tag, so
  103.2.d.2 keeps it out of a Battle Mistress deck.
- `UNL-107 Stare Down` (Body, E2) moves every enemy unit at a battlefield with less Might than a
  chosen friendly unit to base. Kinkou Initiate's 3 against two 1s empties Fortified Position the
  same way, without killing either Mouser.
- `OGN-127 Cannon Barrage` (Body, E2 + 1 Power) deals 2 to enemy units in combat, where every Mouser
  is a 3.
- `OGN-148 Anivia, Primal` (E7 + 2), `UNL-132 Angler Beast` (E5 + 1), `SFD-147 Downwell` (E8 + 2)
  and `OGN-190 Kog'Maw, Caustic` (on its death) all cost more.
- `OGN-153 Overt Operation` and `UNL-148 Cursed Sarcophagus` touch only their own units or trash.

**What answers the Flurry.** `OGN-045 Defy` (Calm, E1 + 1 Power): *"Counter a spell that costs no
more than :rb_energy_4: and no more than :rb_rune_rainbow:."* Flurry of Blades costs E1, and Stare
Down E2, so Defy counters either. On their T3 you have three ready runes from your T3. `SFD-045 Not
So Fast` counters only a spell that chooses a friendly unit, and the Flurry chooses nothing
(355.10.d).

**The entry's Order protection covers their T3, not their T2.** With Order as the second domain, the
entry lists `OGN-243 Darius, Executioner` and `OGS-013 Garen, Commander`: *"Other friendly units have
+1 :rb_might: here."* A Mouser beside either is a 2 out of combat and lives through the Flurry. Each
costs E6 + 1 Power. That is six runes, one of them exhausted for the Energy and recycled for the Power
(164.2.a, 164.2.b), and you have six on your T3. A unit need not be played to base. 355.2.a: *"By
default, Valid locations include the controller’s Base or a Battlefield the controller controls."*
Cast on your T3 straight to Fortified Position, either one stands beside the Mousers before their T3.
Entering exhausted (178.1.a.1) does not switch off a static ability, and the Flurry walked above kills
nothing. It costs your whole T3: the second Mouser still walks in, but Ribbon Dancer is not played and
no Defy is held. It does not cover their T2, when the first Mouser stands alone at Fortified Position,
and the Flurry is in their hand by then in 40.30%.

## 6. Verdict

**Right about the grant and its duration, wrong about when the cheap answer lands.** On defence, the
grant made one Mouser a 5 for the whole combat. Their two attackers died and you kept the
battlefield, where without the grant nobody would have been left. The entry says the one-Energy sweep
can land in response to the grant. At that point every Mouser is already a 3 and the sweep does not
kill. The window is the opponent's Main Phase before the attack, when a Mouser is a 1, and there one
Flurry of Blades takes both bodies and the battlefield. In Calm, the answer is `OGN-045 Defy`, held
up on their turn.

## 7. Not verified

No card in the walk costs Power, so it rests on no rune-dealing assumption for either side, at any
split. Defy needs one Calm among the six runes you have on your T3. With six Calm in the twelve the
six hold none in **1 of 924 deals, 0.11%**. Darius or Garen, cast on your T3, needs one Order among
the same six runes. With six Order in the twelve that fails in **1 of 924 deals, 0.11%**.

I put Flurry of Blades in their deck at three copies and did not walk Defy in the turn table. I did
not walk Fortified Position as their battlefield instead of yours, a third Mouser, the T4 attack on
B, the mulligan, or 2v2. The probabilities in §4 count only cards in hand at the turn named.

## Leads

- The last notable says Flurry of Blades "can land in response to the very trigger this engine exists
  to fire". Here that trigger is Fortified Position's defend trigger, which 383.4.f.2 puts on the
  chain after the Defender designation. Every Mouser is then a 3 (814.1.c), and 1 damage does not
  kill it, though in the walk's combat it still turns the fight into a mutual wipe (§5). The Flurry kills Mousers out of combat: in the opponent's Main Phase before the attack,
  or on your own turn.
- The same notable lists `OGN-243 Darius, Executioner` and `OGS-013 Garen, Commander` as the Order
  protection. Both cost E6 + 1 Power, six runes, so either can be played straight to Fortified
  Position on your T3 (355.2.a) and covers their T3. Neither covers their T2. A Flurry from a
  three-copy deck is in hand by then in 40.30% of games (6 of 39 cards seen).
- No notable names a counter. In Calm, `OGN-045 Defy` (E1 + 1 Power) counters the Flurry and
  `UNL-107 Stare Down`, which empties Fortified Position by sending every Mouser to base.
- An attacker's own attack trigger is placed on the chain before the grant (464.2.e.1), so you place
  the grant knowing which Mouser it hit. In the walk the Corsair's 1 and the grant on different
  Mousers still cost one Mouser. The grant's +2 was the margin between keeping the battlefield and
  leaving it empty.
