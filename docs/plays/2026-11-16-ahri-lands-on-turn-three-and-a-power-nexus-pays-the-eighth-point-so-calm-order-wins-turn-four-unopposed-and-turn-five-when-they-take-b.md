# Play — Ahri lands on turn three and a Power Nexus pays the eighth point, so Calm/Order wins turn four unopposed, and turn five when they take B

Issue #553 (a slice of #200), 2026-11-16. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against,
[the coverage table](2026-10-27-identity-coverage-by-legend-pair.md) for why this pair, and
[Yasuo fires on turn four off the Hold curve](2026-10-31-yasuo-fires-on-turn-four-off-the-hold-curve-so-chaos-order-wins-turn-five-unopposed-and-their-free-turn-three-attack-makes-it-six.md)
for the slice before, whose opponent's deck and draws this walk reuses.

**Subject: `ahri-alluring-power-nexus-hold-curve-turn-four`**, a new CHAIN synthesized for this slice.
Calm/Order is the next legend pair of the identity-first pass. Its Hold baseline is T5, because Calm
prints `VEN-043 Steel Paws`, one of the pool's two units at Energy 1. Its catalogue holds twelve
finishers: nine ALT_WINs (five pay by T4, all on The Grand Plaza) and three BURSTs (T6, T6, T8 on the
clock), and no CHAIN. The issue asks for a BURST or a CHAIN shape. No BURST in the pair reaches 8 by T4
(§6). One CHAIN does: **put `OGN-066 Ahri, Alluring` on a held battlefield on T3, and make that
battlefield `SFD-214 Power Nexus`.** The Calm Hold curve stands at 4 after T3. The T4 Beginning Phase
Holds both battlefields (6), fires Ahri's hold trigger (7) and the Nexus's (8, paid with the four
runes left on the board after Ahri), all before the Channel Phase. The turn clock prices it at **T4
against the T5 baseline**. Walked as a game, going first, against the Calm/Order Radiant Dawn deck of
the slice before, **it wins on T5**. Their T3 attack, nine Might into the weaker battlefield, takes B,
and T4 comes to 7. If they attack A instead, a hidden `OGN-057 Block` kills all three attackers and the
line wins on T4. On the board where they take B, the free Hold curve with the same cards keeps one
battlefield and wins on T7. The cheapest break is `OGN-043 Charm` (Calm, E1 + 1 Power, in their own
identity): it moves Ahri off A on their T3, and her T4 point is gone. The Nexus is in play in one game
in three, and the whole line in 0.47% of simulated deals (§8).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `VEN-147 Eye of Twilight` (Calm/Order, tag Shen); its ability is never used |
| **Chosen Champion** | `VEN-138 Shen, Leader of the Kinkou Order` (Order, E6 + 2 Power, M7), never played |
| **Battlefield** | `SFD-214 Power Nexus` (colourless), battlefield A, your own |
| **The payoff** | `OGN-066 Ahri, Alluring` (Calm unit, E5 + 1 Power, M4) on T3, onto A |
| **The bodies** | two `VEN-043 Steel Paws` (Calm, E1, M0) on T1 |
| **The walk adds** | two `SFD-159 Trusty Ramhound` (Order, E2, M2) on T2, one `OGN-057 Block` (Calm spell) hidden at A on T3, one `OGN-052 Stalwart Poro` (Calm, E2, M2) on T4 |

The line pays one Calm Power by T3 (Ahri's) and four Power of any domain on T4 (the Nexus's). Each
Power comes from a rune on the board, recycled: **one Calm rune among the six runes on the board by
T3, and four runes still on the board at the T4 Beginning Phase.** T3 has six runes. Ahri takes five
of them for Energy and one of those five, recycled, for her Power, so five stay on the board. The walk
hides Block for a sixth rune's recycle, which leaves exactly four. From the opponent the line needs
both battlefields to be yours at the T4 Beginning Phase and Ahri at A when it starts.

Eye of Twilight is Calm/Order and its tag is Shen, so Shen, Leader of the Kinkou Order can be the
Chosen Champion, 103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your
Champion Legend."* Every card in the line is mono-Calm, mono-Order or colourless, so the deck admits
it, 103.1.b.3: *"If a card has a single Domain, then that card is permitted in the Domain Identity
that corresponds to the same Domain."* Three copies is the cap, 103.2.b: *"Your Main Deck can include
up to 3 copies of the same named card."* None of the cards on either side is a Signature card
(`signature` is false for every printing of the line's and the walk's base codes in
`data/cards.json`), and none of those base codes is in any of the 21 rows of `data/legality.json`.

The Nexus is one of your three battlefields. Only one of them is used, 485.5: *"Setup: Each player
randomly selects one (1) of their three (3) Battlefields. The other two are removed and will not be
used for this game. The selected Battlefields are placed simultaneously in the Battlefield Zone."* So
the line runs in at most one game in three.

**Why these cards.** Steel Paws is the only Calm unit at Energy 1, and two of them on T1 are what make
the Calm baseline T5 rather than T6. Ahri is the cheapest unit in Calm or Order that scores on a Hold.
Shen costs one Energy and one Power more and needs exactly one other unit with him (§6). The Nexus is
the only point source in the pool that costs no card slot beyond the battlefield, and it is payable in
every identity.

## 2. What the line does, and why each step is legal

**The Hold curve.** Steel Paws: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a
spell or ability.) [Empower] :rb_energy_7: (:rb_energy_7:: Empower me. Use only if not Empowered.)
[Empowered][>] I have +7 :rb_might:."* Both are played to base on T1 for the two runes. They enter
exhausted, 143.4: *"Units enter the Board exhausted."* T2's Awaken readies them, 315.1.b: *"1. The
Turn Player readies all Game Objects they control that are able to be readied."* Each walks onto an
empty battlefield. 190.3.a.1: *"Units moving to or being played to a battlefield apply Contested
status if that battlefield is not already Contested and that Unit’s controller does not already
control that battlefield."* 344.2: *"If Control of a Battlefield is Contested, there aren’t units
controlled by different players there, and the turn is in a Neutral Open State, a Showdown is opened
during the next Cleanup."* 348.2.a.1: *"This results in a Conquer if that player has not yet scored
that Battlefield this turn."* Two Conquers: 2. On T3 and T4 the Beginning Phase Holds both, 315.2.b.2:
*"1. The Turn Player Holds all Battlefields they Control."* That is 4 after T3 and 6 at the T4
Beginning Phase. The [unopposed clock](2026-09-12-the-unopposed-clock.md) derives the same curve with
`UNL-111 Determined Sentry`.

**Ahri.** *"When I hold, you score 1 point."* She is played on T3 straight onto A, 355.2.a: *"By
default, Valid locations include the controller’s Base or a Battlefield the controller controls."*
She must be at A, not at base, because her trigger belongs to a unit present at the held battlefield,
383.4.d: *"Hold Effects are Triggered Abilities whose Condition includes a Unit being present at a
Battlefield during the Beginning phase when a player scores Victory Points from Holding."* and
383.4.d.2.a: *"The Hold Abilities of Units are put on the Chain as Pending Items after the Unit these
effects correspond to are present at a Battlefield when a player maintains control of it and Gains 1
Victory Point during their Beginning Phase from Holding."* Her point is a gain by a triggered ability,
194.1.c: *"Spells, Triggered Abilities and Activated Abilities that instruct them to gain one or more
points."* It is not a second Score of A (R2 = A on #11), so 470 does not cap it: *"A player may only
Score, from either method, once per Battlefield per turn."* Her Power is a rune already exhausted for
Energy, recycled. 164.2.b: *"Recycle this: [Reaction] — Add [C]."* 164.2.b.1: *"The Power added this
way corresponds to the Domain of the Rune that is being Recycled."* So that rune has to be a Calm one.

**The Power Nexus.** *"When you hold here, you may pay
:rb_rune_rainbow::rb_rune_rainbow::rb_rune_rainbow::rb_rune_rainbow: to score 1 point."* The four
Power are a base cost of the trigger, 383.3.b: *"If a Triggered Ability contains a cost within
instructions at the beginning of the effect or immediately following the “you may” or “they may” that
appears as the first part of the effect, that cost is treated as the base cost of the Triggered
Ability."* Runes pay it at the moment of payment, with no priority window, 444.2.c: *"Players may
activate abilities that Add resources with the Reaction keyword at any time that they are instructed
to Pay resources. Those abilities finalize and resolve immediately, ignoring normal restrictions."*
Each recycled rune Adds Power of its own domain, and a rainbow cost takes any, 135.2.e.5.a: *"When
required as a cost, [A] can be paid by Power of any Domain."* This is the finding of
`docs/rules-notes/rules-findings.md` that a "you may pay X to Y" trigger is payable out of runes in
every identity.

**Why the four runes are there.** The Beginning Phase comes before the Channel Phase (315.2 before
315.3), so the T4 Nexus is paid from the runes T3 left on the board, not from T4's two. T3 has six.
Ahri exhausts five and recycles one: five stay. The walk hides Block at A for one more recycle: four
stay. 315.1.b readies them at the T4 Awaken, though a recycle needs no ready rune anyway. All four are
recycled into the Nexus, and the board has none until 315.3.b: *"1. The Turn Player channels 2 runes
from their Rune Deck."* A recycled rune goes to the bottom of the Rune Deck, 161.2.b: *"When a Rune is
Recycled it is returned to the Rune Deck, not the Main Deck."*

**Why the eighth point counts.** The Final Point restriction applies only to a Conquer, 471.1.a.1:
*"Notably, points Gained from sources that are not Conquer are not beholden to these restrictions."*
The Holds and both triggers are not Conquers. You win at the next cleanup, 472: *"When a cleanup
occurs and a player has accrued Points greater than or equal to the Victory Score for their Mode of
Play, and if they have more points than any opponent, they Win the Game."*

**The arithmetic, unopposed:** 2 (T2 Conquers) + 2 (T3 Holds) + 2 (T4 Holds) + 1 (Ahri) + 1 (Nexus)
= 8 at the T4 Beginning Phase. Without the Nexus it is 7 on T4 and the T5 Hold wins, which is the
baseline. **The Nexus is what makes the line a turn faster, and it is in play in one game in three.**

## 3. Their deck: Calm/Order Radiant Dawn

The same deck, in the same seat, with the same draws as in the Yasuo walk of the slice before (and the
Galio and Plaza walks before it). `OGN-261 Radiant Dawn` (Calm/Order): *"When you stun one or more
enemy units, buff a friendly unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff.)"* Nothing
in the walk stuns. Its Chosen Champion is `OGN-238 Leona, Determined`, never played. The cards it
plays:

- `OGN-210 Daring Poro` (Order, E2, M2): *"[Assault] (+1 :rb_might: while I'm an attacker.)"*
- `SFD-159 Trusty Ramhound` (Order, E2, M2): *"While you have another unit here, I have +1
  :rb_might:."*
- `OGN-054 Sunlit Guardian` (Calm, E3, M3): *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I
  must be assigned combat damage first.)"*
- `OGN-052 Stalwart Poro` (Calm, E2, M2): *"[Shield] (+1 :rb_might: while I'm a defender.)"*
- `SFD-157 Royal Guard` (Order, E4, M2): *"When you play me, play a 2 :rb_might: Sand Soldier unit
  token here."*
- `OGN-216 Soaring Scout` (Order, E2, M1): *"[Deathknell] — Channel 1 rune exhausted. (When I die, get
  the effect.)"*
- `OGN-218 Vanguard Captain` (Order, E3 P1, M3): *"[Legion] — When you play me, play two 1 :rb_might:
  Recruit unit tokens here. (Get the effect if you've played another card this turn.)"*
- `VEN-045 Helm of Suppression` (Calm gear, E4 P1): *"[Empower] :rb_energy_4::rb_rune_calm:
  (:rb_energy_4::rb_rune_calm:: Empower this. Use only if not Empowered.) Opponents' spells cost
  :rb_energy_1: more. If this is [Empowered], they cost :rb_energy_1::rb_rune_rainbow: more instead."*

Going second, they channel an extra rune on T1, 485.7: *"First Turn Process: The player going second
channels an extra Rune from their Rune Deck during their first Channel Phase of the game."* Their runes
are 3, 5, 7 and 9 on their T1 to T4.

## 4. The turns, going first

Calm/Order against Calm/Order. Your battlefield is A, the Power Nexus. Theirs is B, `OGN-282 Monastery
of Hirana` (*"When you conquer here, you may spend a buff to draw 1."*, and nobody spends one). Your
opening four are Steel Paws, Steel Paws, Ahri and Trusty Ramhound. Your draws are Trusty Ramhound
(T1), Block (T2), `OGN-054 Sunlit Guardian` (T3) and Stalwart Poro (T4). Your Rune Deck runs seven
Calm and five Order runes. Their opening four are Daring Poro, Trusty Ramhound, Soaring Scout and Helm
of Suppression. Their draws are Sunlit Guardian (T1), Stalwart Poro (T2), Royal Guard (T3) and
Vanguard Captain (T4).

```
turn      runes   play                                                      points
T1        2       Steel Paws (E1) and Steel Paws (E1) to base. None left.   0
their T1  3       Daring Poro (E2) to base. One left.                       0
T2        4       Paws 1 walks to A, empty: Conquer, +1. Paws 2 walks to    2
                  B, empty: Conquer, +1. Trusty Ramhound (E2) onto A,
                  Trusty Ramhound (E2) onto B. None left. A and B each
                  defend with 3 + 0.
their T2  5       Trusty Ramhound (E2) and Sunlit Guardian (E3) to base.    0
                  None left.
T3        6       Hold A and B: +2. Ahri (E5, a Calm rune recycled for      4
                  her Power) onto A. Block hidden at A (a second rune
                  recycled). One Energy left; four runes stay.
their T3  7       Royal Guard (E4, Sand Soldier to base) and Stalwart       1
                  Poro (E2) to base. One left. Daring Poro, Ramhound and
                  Guardian (3 + 3 + 3) attack B: your Ramhound and Paws
                  die, their Guardian dies. Conquer B.
T4        4, 0, 2 Hold A: +1. Ahri: +1. Power Nexus, the four runes         7
                  recycled: +1. Channel 2. Stalwart Poro (E2) onto A.
                  None left. A defends with 4 + 3 + 3 + 0.
their T4  9       Hold B. Soaring Scout (E2), Vanguard Captain (E3,         2
                  [Legion] on, two Recruits at B), Helm of Suppression
                  (E4); two runes recycled for the two Powers. None left.
                  Their six Might at base do not attack ten.
T5        4       Hold A: +1. Ahri: +1. Nine.                               9, win
```

**T1, 0 points.** Two runes, both Steel Paws to base. Hand: Ahri, Ramhound, Ramhound.

**Their T1, 0.** Three runes. Daring Poro to base.

**T2, 2.** Four runes. Both Paws are ready (315.1.b). Paws 1 walks to A, which is empty, and the
Showdown its move opens at the Cleanup ends with nobody contesting, so you conquer A, 469.1:
*"Conquer: A player gains Control of a Battlefield they did not yet Score this turn."* Then Paws 2 walks
to B for the same. The two moves are two actions because their destinations differ (144.3.a), and the
second waits for the first Showdown to end, 144.1.c: *"This action cannot be performed during a
Showdown or Combat."* A Trusty Ramhound is played onto each battlefield (355.2.a). Each has its Paws
"here", so each is M3, and A and B each defend with 3 + 0. Their Daring Poro attacks with 3, so
attacking either costs it for a Ramhound at most and takes nothing. Hand: Ahri, Block.

**Their T2, 0–2.** Five runes. Trusty Ramhound and Sunlit Guardian go to base. A branch where the Poro
attacks is at the end of this section.

**T3, 4.** Six runes. Hold A and B, 469.2: *"Hold: A player maintains Control of a Battlefield they did
not yet Score this turn during their Beginning Phase."* Then Ahri: five runes exhausted for E5, and
one of them, a Calm rune, recycled for her Power. She goes onto A (355.2.a). Then Block, `OGN-057`:
*"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) [Action] (Play on
your turn or in showdowns.) Give a unit [Shield 3] and [Tank] this turn. (+3 :rb_might: while it's a
defender. It must be assigned combat damage first.)"* A second exhausted rune is recycled for the
rainbow, and Block goes facedown at A, 811.1.b: *"While this card is in your hand or in your Champion
Zone on your turn during an Open State, you may pay [A] to hide this facedown at a battlefield you
control that doesn't already have a facedown card hidden there for as long as you control that
battlefield. Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its
base cost."* Four runes stay on the board, one of them unexhausted, and nothing in hand costs one
Energy. A holds Ahri (4), Ramhound (3) and Paws (0), with a facedown card. B holds Ramhound (3) and
Paws (0). Hand: Sunlit Guardian.

**Their T3, 1–4.** Seven runes. They hold nothing. Royal Guard goes to base with its Sand Soldier, and
so does Stalwart Poro: E4 + E2, one rune left. Then Daring Poro, Trusty Ramhound and Sunlit Guardian
walk from base to B. B is yours, so it is Contested and a combat follows. The Poro attacks with 2 + 1
= 3, the Ramhound has another unit here and attacks with 3, and the Guardian's [Shield] counts only
while it defends, so it attacks with 3: nine. Your Ramhound (3) and Paws (0) deal 3, and the Guardian
must take it first, 815.1.b: *"It is functionally short for "I must be assigned lethal damage before
any other unit with the same controller as me that does not have [Tank] during the Combat Damage
step.""* Lethal for the Guardian is 3, so it dies, 143.2.a: *"If a Unit ever has nonzero damage marked
on it equalling or exceeding its Might, it is Killed."* Their nine kill your Ramhound (3) and your
Paws (any nonzero damage is lethal on M0). They conquer B. Their Poro (2) and Ramhound (3) stay there.

Attacking A instead was the other choice, and the facedown card is why B is the sensible one. That
branch is below: it loses them all three attackers and the game on T4.

**T4, 7.** The Beginning Phase comes before the Channel Phase, so four runes are on the board. Hold A:
5. Ahri is at A: her trigger, 6. The Power Nexus: all four runes recycled for four Power of any
domain, 7. Then 315.3.b channels two. Stalwart Poro (E2) goes onto A. A now defends with Ahri (4),
Ramhound (3, with other units here), Stalwart Poro (2 + 1 [Shield] = 3) and Paws (0): ten. Hand:
Sunlit Guardian. Block is still facedown at A.

Taking the Nexus now rather than keeping four runes for T4 matters. With it, T5 needs only the Hold
of A, whether or not Ahri is still alive. Without it, T4 is 6 and T5 needs both the Hold and Ahri's
trigger.

**Their T4, 2–7.** Nine runes. Hold B. Soaring Scout goes to base, then Vanguard Captain goes to B with
[Legion] on (the Scout was a card played this turn), so two Recruits come with it. Then the Helm. That
is E2 + E3 + E4 = 9 Energy and two Powers, both from runes already exhausted and then recycled. Their
units at B cannot move to A, since none has [Ganking], 144.4.c.1: *"Units with Ganking may use their
Standard Move to Move from Battlefield to Battlefield."* Their base holds Royal Guard (2), the Sand
Soldier (2) and Stalwart Poro (2), all ready, and Soaring Scout, which entered exhausted (143.4). Six
into ten loses, and A's units take 4 + 3 + 3 + 1 = 11 lethal damage between them, so even an
all-in attack leaves A yours. They do not attack.

**T5, 9.** Hold A: **eight points.** Ahri's trigger makes nine. **You win on T5.**

**The A branch.** If their T3 attack goes to A instead, Block is played from facedown for no Energy
inside the combat's Showdown (the Helm is not in play yet). Its target must be a unit at A, 811.1.d.2:
*"If a hidden spell or a play effect of a hidden permanent chooses any targets, those targets must be
chosen from among options at that battlefield, unless the ability explicitly restricts targeting in a
way that makes this impossible."* Block goes on the Ramhound, not on Ahri. On Ahri she would defend
with 7 and take lethal first, and nine damage covers 7. On the Ramhound, it defends with 3 + 3 = 6 and
has [Tank]. Their nine must give it 6 first, which leaves 3: not lethal on Ahri (4), so Ahri lives
whatever they do with the rest. Your 4 + 6 + 0 = 10 damage covers the Guardian (3, Tank, first), the
Poro (3) and their Ramhound (3). All three die. A stays yours, and B was never attacked. T4: Hold A and
B (6), Ahri (7), the Nexus (8). **On that branch the line wins on T4.**

**The Poro branch.** If their Daring Poro attacks on their T2, its 3 meets a Ramhound (3) and a Paws.
The Poro dies. They kill either the Ramhound (all 3) or the Paws (1, and 2 on the Ramhound), and the
battlefield stays yours. Their T3 attack is then Ramhound and Guardian, six, against B's 3 + 0, and B
falls the same way. The walk is unchanged from T4 on.

## 5. Breaks to

Prices are against the target. Ahri has no [Deflect], so choosing her costs nothing extra. Steel Paws
has [Deflect], 809.1.c: *"Spells and abilities an opponent controls that target [me/this] cost an
amount of Power equal to [Deflect Value] more to play as an additional cost for each time they choose
[me/this]."* Its value is 1, 809.1.b.3: *"If X is omitted, it is presumed to be 1."* Any domain pays
it, 809.1.c.1: *"The Power used to pay this cost may always be of any Domain."* Killing a Paws breaks
nothing once a Ramhound stands with it, so that surcharge never matters here.

- **`OGN-043 Charm` (Calm, E1 P1, in their identity):** *"Move an enemy unit."* Played on their T3,
  it moves Ahri off A. The caster chooses the destination (355.4), and your base is a valid one
  (355.4.a). At the T4 Beginning Phase she is not at A, so her trigger does not fire: T4 is 6 with
  the Nexus. She walks back on T4, and the T5 Hold of A makes 7 or 8. **One Energy and one Power for
  the turn the line exists to win.** `UNL-038 Skyward Strike` (E2 P1) does the same.
- **`OGN-213 Hidden Blade` (Order, E2 P1, in their identity):** *"[Hidden] (Hide now for
  :rb_rune_rainbow: to react with later for :rb_energy_0:.) [Action] (Play on your turn or in
  showdowns.) Kill a unit at a battlefield. Its controller draws 2."* It cannot be hidden before
  their T3, because both battlefields are yours (811.1.b: *"at a battlefield you control"*). Played
  from hand on their T3 for E2 + 1 Power, it kills Ahri at A. T4 is then 6 with the Nexus, and you
  draw two.
- **`OGN-229 Vengeance` (Order, E4 P2):** *"Kill a unit."* The same result on their T3 for four Energy
  and two Power.
- **`SFD-060 Tianna Crownguard` (Calm, E7 P2):** *"[Deflect] (Opponents must pay :rb_rune_rainbow: to
  choose me with a spell or ability.) While I'm at a battlefield, opponents can't gain points."* On
  their T3 they have seven runes and, after the attack, control B. Tianna onto B costs all seven and
  two recycles. Your T4 Holds and both triggers gain nothing while she stands there. It is their whole
  turn and it stops every point source in the line at once.
- **Nine Might into A with no hidden card there.** Without Block, A's units take 4 + 3 + 1 = 8 lethal
  damage between them, so their T3 nine wipes A, kills Ahri and takes the Nexus. Block's one recycled
  rune is what makes A the wrong target.
- **Not breaks.** `OGN-045 Defy` counters a spell, and Ahri is a unit; it can counter Block (E1 P1),
  which only matters on the A branch. `SFD-045 Not So Fast` counters a spell or ability "that chooses
  a friendly unit or gear", friendly to its caster, and Block chooses yours. `UNL-159 Soul Harvest` (3
  Might or less) and `SFD-162 Blood Money` (2 Might or less) cannot reach Ahri (M4). The Helm makes
  Block cost E1 from their T4 on, which the walk never needs.

## 6. Against the free Hold curve, and the BURST and CHAIN shapes searched

**The same deal without the line.** Play the free Hold curve with the same cards and the same
opponent: no Ahri on T3, six Energy for defence. The T3 hand is Ahri, Block and Sunlit Guardian. The
best it does is the Guardian onto one battlefield and Block hidden at the other. A: Ramhound 3,
Guardian 3 + 1, Paws: 3 + 4 + 1 = 8 lethal damage between them. B: Ramhound with Block, 6 + 1 = 7.
Their nine take either one. The curve then holds one battlefield from T4: 5, 6, 7 and **8 on T7**,
unless it takes the other back. **The line wins that board on T5, two turns sooner. Unopposed it is
T4 against T5, one turn sooner.** On the board where their nine go to A, the line wins on T4 and the
free curve on T5.

**BURST.** Calm/Order has three BURSTs, all on `SFD-059 Svellsongur` (Calm gear, E3 P1): *"[Equip]
:rb_energy_1::rb_rune_calm: (:rb_energy_1::rb_rune_calm:: Attach this to a unit you control.) As this
is attached to a unit, copy that unit's text to this Equipment's effect text for as long as this is
attached to it."* The clock prices them at `shen-kinkou-svellsongur-hold` T6,
`nasus-svellsongur-conquer-burst` T6 and `ivern-svellsongur-four-tags-hold` T8, against the T5
baseline. **No cheaper BURST exists in the pair.** A BURST reaches 8 in one scoring event, and in Calm
or Order every multiplied point unit runs through Svellsongur. The cheapest point unit is Ahri (E5 +
1). Ahri and an equipped Svellsongur cost E9 + 3 Power before the Beginning Phase that fires them. T3
has six runes, so the earliest is Ahri on T3 and Svellsongur on T4, firing on T5: the baseline turn.
Shen, Leader of the Kinkou Order (E6 + 2, M7) is dearer still.

**CHAIN.** The pair had none, and this line is one: several scoring events (two Conquers, four Holds,
two triggers). The T4 ceiling in the pair is the Hold curve's 6 plus one point per hold trigger that
can be on the board by T3. Ahri fits with the Nexus (E5 + 1 + 4 recycles = all six runes, five of them
recycled by T4). Shen also fits: E6 takes all six runes, two of them recycled for the Order Power,
which leaves four for the Nexus. He needs *"exactly one other unit you control here"*, so A carries one
Paws and nothing else, which makes A easier to take. He is M7 with [Shield], harder to kill than Ahri.
It is the same clock and is a lead, not an entry. Two hold triggers by T3 do not fit: Ahri and Shen
together cost E11 + 3. The Grand Plaza (`OGN-293`, 7 units) is the pair's ALT_WIN route and is
already catalogued five times at T4.

## 7. Verdict

Candidate, promoted because it beats the baseline on the clock: **T4 against T5.** Walked once,
going first, against the Radiant Dawn deck, it wins on **T5**. Their T3 nine take B, and the Nexus
point makes T4 7 instead of 8. That ties the baseline turn, as slice 6's walk did. On the board the
walk actually produced, the free Hold curve wins on T7. The line needs two Steel Paws by T1, Ahri by
T3 and the Nexus on the table, and it loses its T4 to a single Charm. It is mono-Calm plus a
colourless battlefield, so it is legal in all five Calm legend pairs. Each of them has a T5 baseline,
so it beats the baseline on the clock in all five.

## 8. Not verified

- **The turn clock prints T4 with or without the Nexus.** Removing `SFD-214` from the entry's `uses`
  leaves `npm run -s adversarial -- --turns` at T4, and so does removing the Steel Paws. The clock
  prices when the cards can be deployed, not whether the points sum to 8, so the T4 rests on §2's
  arithmetic (4 + 2 + 1 + 1), which is a hand count. Without the Nexus the line is T5.
- **None of the open clock gaps touches the entry.** It declares no [Hidden] card (#541: Block is in
  the walk, not in the entry), no effect-only anchor (#548) and no targeted spell (#552). No [Repeat]
  (#187), Quick-Draw (#487) or 709 effect (#539) is in the line. Both T2 Conquers are on battlefields
  not yet scored that turn (#551).
- **How often.** Going first with no mulligan, two Steel Paws among the first 5 cards and Ahri among
  the first 7, with three of each in a 39-card draw pile: 1.40% of 2,000,000 simulated deals
  (`/tmp` script, seed 553, a partial Fisher-Yates over the first seven positions). With the Nexus
  chosen in one game in three (485.5): **0.47%**. The Calm rune for Ahri among the first six runes
  is not in that figure; with seven Calm runes of twelve it misses only when all six are Order, which
  five Order runes cannot do. The walk's other cards (two Ramhounds by T2, Block by T2) are not in it
  either.
- **One opponent, one deal.** The walk plays the slice-6 deck and draws. A deck that holds Charm,
  Hidden Blade or Tianna on its T3 breaks the T4 every time (§5). Their T3 choice between A and B is
  the walk's judgement of a sensible player, not a rule.
- **The Rune Deck after T4.** Recycling six runes by T4 returns them to the bottom of the Rune Deck
  (416.1: *"Recycling cards is the action in which a player takes one or more cards from a specific
  zone and then puts it on the bottom of the corresponding deck."*). The walk needs nothing after T4
  except two runes for Stalwart Poro, so the four-runes-short board after T4 (the #456 note on the
  Nexus) does not matter here. In a longer game it would.

## Leads

- **Shen, Leader of the Kinkou Order on T3, with exactly one Paws at A,** is the same T4 by the same
  arithmetic (§6): E6 + 2 Order Power leaves four runes for the Nexus. He is M7 with [Shield], so
  their T3 nine kill him only by putting eight of the nine on him. Worth a walk against the same deck.
- **The clock does not sum points.** It prints T4 for this entry with the Nexus removed, though the
  hand count is then T5 (§8). A check that sums a CHAIN's point events by turn against 8 would catch
  that class of over-count. Staged here rather than filed, since the clock is out of this slice's
  scope.
