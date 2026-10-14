# Play — Rell feeds only from base, and the legend does the arithmetic

Issue #345 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `rell-magnetic-purifier-assault-stack`**, the Fury ENGINE in which `SFD-024 Rell,
Magnetic` plays an Equipment from hand for free each time she attacks and attaches it to herself,
and the `SFD-183 Purifier` legend adds [Assault] for every Equipment on her. The entry is right about
the free play and right that 807.2 sums the Assault. Walked as a game, Rell attacked once in five
turns. Once she has conquered a battlefield she is parked there: a Standard Move from a battlefield
goes only to base (144.4.b). After her conquest there was nothing of theirs to attack, and when they
took a battlefield back they did it by attacking her, at Might 4 on defence. Her one free Dirk
outlived her: it went to your base, and a Ganking unit carried it, with a second Dirk, to Might 10
for E1 and 2 Fury Power.
The Assault 9 the entry promises needs all three Dirks drawn, which is **2.41%** by your turn 8.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `f342824`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 41 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 61 (a hit on *before*), first in the list. The other entry of this slice is rank 62,
`UNL-111 Determined Sentry` anchoring a hidden `OGN-135 Pakaa Cub`, played in
[the Cub is hidden last, and one Energy still answers it](2026-10-14-the-cub-is-hidden-last-and-one-energy-still-answers-it.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-183 Purifier` (Fury/Body), as the entry requires |
| **The engine** | `SFD-024 Rell, Magnetic` (Fury, E4, M4, [Tank]) |
| **The payoff** | `SFD-009 Serrated Dirk` (Fury gear, E1, M+0, Equipment), three in the deck |
| **The carrier after Rell** | `SFD-096 Laurent Bladekeeper` (Body, E3, M3, Ganking) |

Rell and the Dirk are mono-Fury and the Bladekeeper is mono-Body, so 103.1.b admits all three under
the Purifier. None of them is in `data/legality.src.json`.

The card text the play turns on:

- Rell, Magnetic: *"[Tank] (I must be assigned combat damage first.) When I attack, you may play an
  Equipment with Energy cost no more than :rb_energy_2:, ignoring its cost. If you do, then do this:
  Attach it to me."*
- Purifier: *"Your Equipment each give [Assault]. (+1 :rb_might: while equipped unit is an
  attacker.)"* Its Chosen Champion has to carry the Lucian tag (103.2.a.2); it is idle in the walk.
- Serrated Dirk: *"[Equip] :rb_rune_fury: (:rb_rune_fury:: Attach this to a unit you control.)
  [Effect] [Assault 2] (+2 :rb_might: while I'm an attacker.)"*

## 2. What the free play is, and where the Dirk lands

The trigger is an Attack Trigger. 383.4.e: *"Attack Triggers are Triggered Abilities that trigger
when a Unit or Player gains the Attacker designation for the first time during a combat."* "Ignoring
its cost" waives more than the Energy. 356.1.b.1: *"If a card allows a player to play a card
"ignoring its cost," its base Energy cost and base Power cost are set to zero."* The Dirk has no Power
cost, so this matters only for the Leads.

A gear is played to base (149.2: *"Gear can only be played to a player's Base unless an effect
specifies otherwise."*). The attach then moves it, 434.4: *"When a card Attaches to a card, its
location becomes the same as the new Top-Most Card."* So it is at the attacked battlefield in time
for the damage step. Each Dirk gives Rell [Assault 2] from its Effect Text and [Assault] from the
Purifier, and 807.2 sums them: *"If a Unit has Assault or has been granted Assault and is granted
Assault by an additional source, the Assault Value of all granted Assault keywords is summed."* One
Dirk is +3 while she attacks, two are +6.

**The Assault outlasts the kill check.** 807.1.d.1: *"Assault remains in effect as long as the Unit
maintains the Attacker designation."* The designation goes at the very end, 466.7.a: *"Remove
Attacker and Defender Designation from all Units and Players."* The combat cleanup that kills and
heals comes first: 466.1.a.1 *"Insert “3c. Heal all Units.”"* So an attacker holds its full Might
until its damage is gone. Damage between her printed Might and her attacking Might does not kill her.

## 3. Where Rell can attack from

144.4.a: *"Units may move from their Base to a Battlefield."* 144.4.b: *"Units may move from a
Battlefield to their Base."* The only way from one battlefield to the other is 144.4.c, Ganking,
and Rell has none. The move exhausts her (144.2: *"Exhausting the Unit is the Cost for this
action."*). So her trigger needs three things on the same turn: Rell ready, Rell in base, and a
battlefield the opponent holds. After a conquest she stands at that battlefield. Her next attack is
two turns away at best, one turn to walk home and one to walk out, unless a card gives her Ganking.

## 4. Their order: Calm/Order, Shield bodies

`OGN-261 Radiant Dawn` (Calm/Order): *"When you stun one or more enemy units, buff a friendly
unit."* Idle in the walk, since they stun nothing; its Chosen Champion carries the Leona tag. They
play `OGN-052 Stalwart Poro` (Calm, E2, M2, *"[Shield] (+1 :rb_might: while I'm a defender.)"*),
`OGN-054 Sunlit Guardian` (Calm, E3, M3, [Shield] and [Tank]), `OGN-044 Clockwork Keeper` (Calm,
E2, M2; they do not pay its Calm), `OGN-219 Vanguard Sergeant` (Order, E4, M4, no text) and
`SFD-037 Navori Scout` (Calm, E4, M4, [Deflect]). Nothing in their hand stuns, kills or counters.

## 5. The turns, going first

Fury/Body against Calm/Order. Your rune deck is six Fury and six Body. Your opening four are Legion
Rearguard, Rell, Serrated Dirk and Crackshot Corsair; you draw Pouty Poro (T1), Pit Rookie (T2), the
second Serrated Dirk (T3), Laurent Bladekeeper (T4) and a second Crackshot Corsair (T5). `OGN-130
Crackshot Corsair` is Body, E3, M3; `OGN-136 Pit Rookie` is Body, E2, M2, *"When you play me, buff
another friendly unit."* Legion Rearguard and Pouty Poro are Fury E2 M2.

```
turn    runes   your turn                                                 points
T1      2       Legion Rearguard (E2) to base.                            0
their T1        Stalwart Poro (E2) to base, on the 485.7 extra rune.
T2      4       Rearguard walks to A, Conquer: +1. Rell (E4) to base.     1
their T2        Stalwart Poro walks to B, Conquer. Sunlit Guardian (E3)
                and Clockwork Keeper (E2) to base. Five runes, none
                ready.
T3      6       Hold A: +1. Rell walks base to B and attacks. Trigger:    3
                Serrated Dirk from hand, free, attached: Rell 4 + 2 + 1
                = 7. Stalwart Poro defends at 2 + 1 = 3. You put 7 on
                it, it puts 3 on Rell: Poro dies, Rell lives. Conquer
                B: +1. Crackshot Corsair (E3) to A, Pouty Poro (E2) to
                B. One rune left.
their T3        Nothing to Hold. Vanguard Sergeant (E4) to base; three
                runes left and nothing in hand that costs three.
T4      8       Hold A and B: +2. Nothing of theirs to attack: Rell       5
                stays at B, the second Dirk stays in hand. Laurent
                Bladekeeper (E3) to A, Pit Rookie (E2) to A, buffing
                the Bladekeeper to 4. Three runes left.
their T4        Guardian, Keeper and Sergeant (3 + 2 + 4 = 9) attack B:
                Rell 4 and Pouty Poro 2. Rell dies, Poro dies; your 6
                kill Guardian and Keeper. Conquer B. Navori Scout (E4)
                to B.
T5      10      Hold A: +1. The first Dirk is in your base: [Equip] it    7
                to the Bladekeeper (1 Fury). The second Dirk (E1) to
                base, [Equip] it too (1 Fury). Bladekeeper 4 + 3 + 3 =
                10 moves A to B with Ganking and attacks Sergeant and
                Scout, 8. Both die; it takes 8 and lives. Conquer B:
                +1. Second Corsair (E3) to A. Eight runes after the
                two recycles.
```

Their points: 1 after their T2, 1 after their T3, 2 after their T4. After your T5 it is **7 to 2**,
with A and B both yours, so a Hold of both on T6 is 9.

**Rell's T3 attack.** 190.3.a.1: *"Units moving to or being played to a battlefield apply Contested
status if that battlefield is not already Contested and that Unit’s controller does not already
control that battlefield."* 464.2.c.3 gives her the Attacker designation and the trigger goes on the
chain at 464.2.e.1. They had no ready rune: their T2 spent all five. The Poro is their only unit
there, so 465.2.c.4 lets all 7 go onto it. Its 3 is not lethal on a Might-7 attacker and is healed
before her Assault ends (§2).

**Why she was idle on T4.** You held both battlefields. A Standard Move from B goes only to your base
(144.4.b), and there was no battlefield of theirs to walk to anyway. The second Dirk could have gone
on her by [Equip] for E1 and 1 Fury, but Assault is offence only. 807.1.c: *"It is functionally short
for "While I am an attacker, I have +X [M].""* On defence she was Might 4 with or without it.

**Why their T4 went at her.** B was Rell 4 and Pouty Poro 2. A was Rearguard 2, Corsair 3,
Bladekeeper 4 and Rookie 2. Rell's own [Tank] makes her the first lethal assignment, 815.1.b:
*"I must be assigned lethal damage before any other unit with the same controller as me that does
not have [Tank] during the Combat Damage step."* Their Guardian has [Tank] too, so by the same
rule your 6 had to kill it first, and then took the Keeper.

**The Dirk outlived her.** 719.5: *"When a Top-Most Card changes zones from a board zone to a
non-board zone, all Attached cards Detach from it, remaining in their current zones."* 435.4.b sends
it to *"the last location the Top-Most Card was at before changing from a board zone to a non-board
zone"*, which is B, and 323.7 recalls it: *"Recall all Unattached non-Unit Gear and non-Unit Runes at
Battlefields"*. It went to your base, still yours. Its [Equip] works again: 435.1.c, *"The card being
Detached has its Effect Text become Inactive and its Rules Text cease being Inactive."*

**What T5 shows.** The Purifier gives [Assault] to whatever carries the Equipment, not to Rell. Two
Dirks by [Equip] on a Ganking body cost E1 and 2 Fury Power, and made a 10-Might attacker that could
reach B from A. Rell's free play saved exactly one E1 and one Fury Power, on T3, when you had a rune
to spare.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 601.1.b less
the Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **6**
cards by T2 (four opening, two draws) and **7** by T3. Rell by T2 and a Dirk by T3, at the entry's one
Rell and three Dirks, is **6.34%**; with three Rell, **16.89%**. The entry's Assault 9 needs all three
Dirks: by T5 (**9** seen) that is **0.92%**, by T8 (**12** seen) **2.41%**.

## 6. Breaks to

**On defence, nothing has to be spent: attack her.** Assault does not apply on defence (807.1.c), so
a Rell with three Dirks defends at Might 4, and [Tank] makes her the first body their damage must
kill (815.1.b). Their T4 did that with three bodies already on the board.

**On her attack, the cheapest break is one Energy, and it kills her.** The scope: the 38 spells in
`data/corpus_flat.txt` whose domains are Calm, Order or Calm/Order, whose text carries [Action] or
[Reaction], and that say kill, deal, stun, return, banish, move, counter or Might, read by hand.
Five cost one Energy and no Power. The one that reaches her is `VEN-040 Decree of Focus` (Calm, E1):
*"[Reaction] (Play any time, even before spells and abilities resolve.) Choose a friendly unit
that's in combat with an enemy Fury (:rb_rune_fury:) unit or that's being chosen by an enemy Fury
spell. Give it +4 :rb_might: this turn."* Rell is Fury. Of the other four, `OGN-046 En Garde` makes
a lone Stalwart Poro 3 + 2 = 5, `UNL-031 Combat Experience` 3 + 1 = 4 (3 + 3 = 6 at [Level 6]), and
`UNL-046 Friendship` 3 + 1 = 4, one Poro tag among their units. None reaches 7. `UNL-173 Sacrifice`
kills a friendly unit of theirs and touches nothing of yours.

Walked on T3: had they kept one rune up on their T2 (holding the Clockwork Keeper for later),
Decree of Focus on the defending Stalwart Poro makes it 2 + 1 + 4 = 7 against Rell's 7. Each side's
damage is lethal at the combat cleanup's kill step, which runs before her Assault ends (§2). Both
die, and 466.5.b leaves B uncontrolled: *"If there are no Units remaining here controlled by any
player, the Battlefield becomes Uncontrolled."* You lose the Conquer and Rell, and her Dirk goes to
your base (§5). For one rune they trade a 2-drop for your 4-drop.

**The stuns cost two Energy and only stop her.** `SFD-040 Thwonk!` (Calm, E2, [Action]: *"Stun an
attacking unit. (It doesn't deal combat damage this turn.)"*) and `OGN-220 Facebreaker` (Order, E2,
which stuns *"a friendly unit and an enemy unit at the same battlefield"*, so it needs a body of
theirs there). Hidden a turn earlier, Facebreaker costs nothing to play (811.1.b). `OGN-050 Rune
Prison` is E2 + 1 Power, `UNL-042 Back Off` E3, `OGN-262 Zenith Blade` E3 + 2 Power. Walked on T3
with two runes kept up (no Clockwork Keeper): Thwonk on Rell after her trigger leaves her at 7
Might dealing no damage. Radiant Dawn then buffs the Stalwart Poro. Its 4 on Rell is not lethal, and
466.1.a.2 recalls her: *"Recall Attackers present at the Battlefield if Defenders are still
present."* She goes home with the Dirk still on her, and B stays theirs.

## 7. Verdict

**Right about the free play and the sum, wrong about the ceiling.** 356.1.b.1 makes the play free
and 807.2 sums the Assault, and the stack survives its own fights because the Assault lasts until
466.7.a. But Rell's trigger needs her to walk out of base into a battlefield they hold. After one
conquest she is parked (144.4), and the hand is not the binding limit. In the walk she attacked once
and fed herself one Dirk. She died on defence at Might 4, and the arithmetic went on without her,
because the Purifier counts Equipment on any body. On her attack, one Energy of Decree of Focus on
a lone defender kills her; on defence she needs no answer at all.

## 8. Not verified

**Timing of the free play.** 358.4: *"Check that the card has the appropriate permissions to be
played at this timing."* Its example: *"If the state is Closed and the card wasn’t the one that
Closed the state, ensure that it has [Reaction]."* Rell's trigger resolves on a chain, so a Dirk with
no [Reaction] would fail that check if it applies to a play an effect instructs. I read it as not
applying. My support is 354.3 (*"If another Card Effect or ability is currently resolving, continue
resolving it before proceeding with any further steps of this process."*) and Riot's 738 example of
two Time Warps played *"during the resolution of"* Promising Future. Neither says so outright. If it
does apply, only an Equipment with [Reaction] qualifies: `SFD-022 Long Sword`, whose [Quick-Draw]
reads *"This has [Reaction]."* The Ava play of slice 31 makes the same assumption.

**Runes.** I did not deal the channel order. The walk's only Power is T5's two Fury for the two
[Equip]s. By T5 you have channelled ten of your twelve runes and recycled none, so with six Fury
the ten hold at least four and it never fails; with four Fury, still at least two, **0 of 66
deals**. Rell, the Dirk played by her trigger and every other card in the walk cost Energy only.
Their side spends no Power: Decree of Focus, Thwonk and Facebreaker are Energy only, and a hidden
Facebreaker's rainbow is any rune.

The probabilities in §5 count only cards in hand at the turn named. I did not walk the mulligan,
their T5, 2v2, a response to the trigger itself, or what *"Attach it to me"* does if Rell is gone
when it executes.

## Leads

- The entry's last notable reads *"a turn with two attacks at two battlefields feeds her twice"*.
  383.4.e checks once *"for the first time during a combat"*, the Standard Move exhausts her (144.2),
  and from a battlefield she can move only to base (144.4.b). One Rell attacks at most once a turn
  unless something readies her and gives her Ganking. After a conquest her next attack is two turns
  away. The binding limit is how often she starts a turn in base while they hold a battlefield, not
  the hand.
- The fourth notable says the line *"is at its best on the third or fourth attack"*. All three Dirks
  in hand is **2.41%** by T8 (12 of 39 seen). In the walk the game was 7 to 2 after her first and only
  attack.
- The fifth notable says the Dirk *"is chosen for the largest printed Assault Value at the lowest
  Energy"*. Under Rell, 356.1.b.1 sets Energy and Power to zero, so cost is no criterion. The
  Equipment at E2 or less legal under the Purifier (Fury, Body or Fury/Body: Serrated Dirk, Recurve
  Bow, Long Sword, Doran's Blade, Hexdrinker, Warmog's Armor) include `SFD-095 Doran's Blade` (Body,
  E2, M+2, no other text). With the Purifier it is +3 on attack, like the Dirk, and +2 on defence
  (718.4), where the Dirk is +0. Three Dirks and three Blades make six to draw: three of six by T8 is
  **25.73%**.
- No notable says that she is Might 4 on defence whatever she carries. Her [Tank] makes her the
  first lethal assignment there too, which is how she died in the walk.
- No notable says what happens to the stack when she dies. 719.5, 435.4.b and 323.7 put every Dirk
  in your base, and 435.1.c makes [Equip] usable again. The stack is not lost, it costs E0 + 1 Fury
  per Dirk to move.
- The seventh notable cites *"807.1's reminder is '+1 Might while equipped unit is an attacker'"*.
  That is the Purifier's own reminder text. 807.1.c reads *"While I am an attacker, I have +X [M]."*
