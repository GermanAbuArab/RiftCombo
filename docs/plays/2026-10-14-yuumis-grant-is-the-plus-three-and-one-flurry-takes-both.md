# Play — Yuumi's grant is the +3, and one Flurry takes both

Issue #347 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `yuumi-affectionate-poro-designated-tank`**, the Calm ENGINE in which `UNL-056 Yuumi,
Magical Cat` gives a third body +3 Might and [Tank] when she attacks or defends, so that the
opponent's combat damage cannot reach `VEN-024 Affectionate Poro`, which draws a card when a combat
it was in ends and it has taken no damage that turn. Walked as a game, the engine held. On your T4
Yuumi, a Sunlit Guardian and the Poro attacked a battlefield held by two bodies summing 5. The grant
made the Guardian a 6, all 5 went on it, nothing of yours died, and the Poro drew. Without Yuumi the
same attack loses the Guardian and the card. Two things the entry does not walk decide the line. The
third body in the walk is a printed [Tank], which the entry's sixth notable says wants the grant
"elsewhere or not at all"; on this board elsewhere is the Poro, and the +3 on the Guardian is the
whole effect. And the answer the entry names, `OGN-133 Flurry of Blades`, does more than it says:
cast in response to Yuumi's trigger, it kills her before the grant resolves, the grant then has no
"here" to read, and the attack that should have drawn a card loses all three bodies.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `8896448`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 39 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 64 (a hit on *first*), second in the list. The other entry of this slice is rank 63,
`VEN-038 Akali, Silent` covered by Twilight Shroud, played in
[Akali's Shroud goes on before she moves, and on their turn she is a plain 4](2026-10-14-akalis-shroud-goes-on-before-she-moves.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Calm among its two domains (103.1.b); here `OGN-257 Blind Monk` (Calm/Body) |
| **The engine** | `UNL-056 Yuumi, Magical Cat` (Calm, E3 + 1 Calm Power, M1) |
| **The payoff** | `VEN-024 Affectionate Poro` (Calm, E3, M3) |
| **The third body** | here `OGN-054 Sunlit Guardian` (Calm, E3, M3, [Shield], [Tank]) |

All three are mono-Calm, so 103.1.b admits them under any of the Calm legends. None is in
`data/legality.src.json`.

The card text the play turns on:

- Yuumi, Magical Cat: *"When I attack or defend, give one of your other units here +3 :rb_might: and
  [Tank] this turn. (It must be assigned combat damage first.)"*
- Affectionate Poro: *"When a combat that I was in ends, if I haven't been dealt damage this turn,
  draw 1."*
- Sunlit Guardian: *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I must be assigned combat
  damage first.)"*
- Blind Monk: *":rb_energy_1:, :rb_exhaust:: Buff a friendly unit. (If it doesn't have a buff, it
  gets a +1 :rb_might: buff.)"* Used once, on T2. Its Chosen Champion has to carry the Lee Sin tag
  (103.2.a.2).

## 2. What the grant decides

815.1.b, the keyword: *"I must be assigned lethal damage before any other unit with the same
controller as me that does not have [Tank] during the Combat Damage step."* And 815.1.c.2: *"Units
without Tank are invalid assignments until all units with Tank have lethal damage assigned to them."*
So an opponent whose summed Might is no more than the Tank's lethal puts all of it on the Tank, and
the Poro is dealt nothing. With one point more, the excess goes on another unit, and they choose which
one. 465.2.c.3 makes them finish one unit before starting the next, but 465.2.c.4 lets the last unit
take whatever is left: *"Units cannot have more damage assigned to them than the minimum required to
constitute lethal damage unless no further units remain to have damage assigned to them."* One point
on the Poro is enough to switch it off.

**The Poro draws while their Might is at most the Tank's Might.** At exactly that number the Tank
dies and the Poro still draws.

**The [Tank] half is redundant on a printed Tank, and that does not make the grant redundant.** 815.2:
*"Multiple instances of Tank are redundant."* The Guardian already has the keyword, so the grant adds
only +3. But +3 is the threshold: on attack it moves from 3 to 6, and on defence from 4 to 7
([Shield]). The other choice is worse. Yuumi's clause says "one of your other units here", so with
Yuumi, the Guardian and the Poro at B, the only other unit is the Poro itself. Given [Tank], the Poro
becomes a legal first assignment, by 815.1.c.2's first sentence: *"If more than one unit with Tank is
present with the same controller in Combat, damage may be assigned to any of them."*

**On attack the three must leave from base together.** 144.3: *"Players may perform multiple Units'
standard move simultaneously. This is treated as one game action performed on multiple Units."* A
Standard Move goes from base to a battlefield or back (144.4.a, 144.4.b), never from battlefield to
battlefield. So the Poro and the third body have to be in base at the start of the turn, not holding
something.

## 3. Their order: Fury/Body, bodies from base

`OGN-249 Relentless Storm` (Fury/Body): *"When you play a [Mighty] unit, you may exhaust me to channel
1 rune exhausted."* Idle in the walk: none of their units has 5 Might. Its Chosen Champion carries the
Volibear tag. They play `SFD-006 Eager Drakehound` (Fury, E3 + 1 Power, M3, *"I enter ready."*),
`OGN-013 Pouty Poro` and `OGN-010 Legion Rearguard` (both Fury, E2, M2) and `OGN-016 Dangerous Duo`
(Fury, E3, M3). The Duo's [Legion] needs another card played that turn, and it gets none. In the walk
their hand holds no removal. §5 puts a Flurry of Blades in it.

## 4. The turns, going first

Calm/Body against Fury/Body. Your rune deck is six Calm and six Body; theirs six Fury and six Body.
Your opening four are Stalwart Poro, Affectionate Poro, Yuumi and Sunlit Guardian; the draws are for
later turns. `OGN-052 Stalwart Poro` is Calm, E2, M2 with [Shield].

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base.                               0
their T1        Eager Drakehound (E3 + 1 Fury) on the 485.7 extra rune:
                three exhausted, one recycled. It enters ready, walks to
                B, Conquer. Two runes, none ready.
T2      4       Stalwart Poro walks to A, Conquer: +1. Affectionate Poro  1
                (E3) to base. Blind Monk (E1) buffs the Stalwart Poro,
                Might 3. No runes left.
their T2        Hold B. Pouty Poro (E2) and Legion Rearguard (E2) to
                base. Four runes, all spent.
T3      6       Hold A: +1. Yuumi (E3 + 1 Calm): three exhausted, one     2
                of them recycled. Sunlit Guardian (E3) to base. Five
                runes, none left.
their T3        Hold B. Pouty Poro walks to B. Dangerous Duo (E3) to
                base. Six runes, three left.
T4      7       Hold A: +1. Yuumi, the Guardian and the Poro walk from    4
                base to B together: 1 + 3 + 3. Yuumi's trigger gives the
                Guardian +3, Might 6. 10 against 5 (Drakehound 3, Pouty
                Poro 2). Their 5 all go on the Guardian, short of 6;
                your 10 kill both. Conquer B: +1. The Poro draws 1.
their T4        Legion Rearguard and Dangerous Duo (2 + 3) attack A: the
                Stalwart Poro, 3 + 1. It dies; its 4 kill the Duo and
                mark 1 on the Rearguard. Conquer A.
```

Their points: 1 after their T1, 2 after their T2, 3 after their T3, 4 after their T4. After their T4
it is **4 to 4**, and you are a card up.

**Why they did not attack A on their T3.** The buffed Stalwart Poro defends at 4 ([Shield]). Pouty
Poro and the Rearguard sum 4: both die to its 4, and it dies to theirs, which leaves A uncontrolled
and trades two bodies for one.

**Your T4, the grant.** The move ends in a cleanup that stages and then opens the combat (323.9,
460). Your three units take the Attacker designation (464.2.c.3), which is when Yuumi attacks, and
her trigger goes on the Combat Chain (464.2.e). It chooses the Guardian. Nothing answers it, and the
Guardian is 6 with [Tank] twice over. 465.2.c sums the Might: 1 + 6 + 3 = 10 against 3 + 2 = 5.
They assign first to the Guardian, by 815.1.b, and 5 never reaches its lethal of 6, so nothing else
of yours can be assigned anything (815.1.c.2). Your 10 kill both. Both their units are gone, so
nothing is recalled (466.1.a.2), and you establish Control: Conquer. The combat ends (466.7), and the
Poro, dealt nothing this turn, draws 1.

**What Yuumi bought.** Without her, the Guardian and the Poro attack at 3 + 3 = 6 against 5. The
Guardian's printed [Tank] takes lethal first, 3 of the 5, and the other 2 go on the Poro, the only
unit left. The Guardian dies and the Poro draws nothing. B is conquered either way. Yuumi's grant was
worth the card and the Guardian.

**Why they did not attack B on their T4.** Your garrison there defends at 1 + (3 + 1 + 3) + 3 = 11,
with Yuumi's trigger firing again on defence. Their base holds the Rearguard and the Duo, 5, which
would all go on a Guardian whose lethal is 7. Nothing of yours dies, both of theirs do, and the Poro
draws again. They took A instead.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 601.1.b less
the Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **6**
cards by T2 (four opening, one draw a turn) and **7** by T3. The engine pair as walked, a Poro by T2
and a Yuumi by T3, is **16.89%** at the entry's three of each, and **2.43%** with one of each. With a
Sunlit Guardian by T3 as well, at three copies, it is **6.36%**.

## 5. Breaks to

**The cheapest break is `OGN-133 Flurry of Blades`, one Energy, at Reaction speed**, the card the
entry names. *"[Reaction] (Play any time, even before spells and abilities resolve.) Deal 1 to all
units at battlefields."* The scope: the 35 spells in `data/corpus_flat.txt` whose domains are Fury,
Body or Fury/Body, whose text carries [Action] or [Reaction], and that say kill, deal, stun, return,
banish, move, counter or Might, read by hand. Three cost one Energy and no Power: Flurry, `OGN-004
Cleave` and `SFD-003 Blood Rush`. Cleave and Blood Rush give [Assault], which counts only while a
unit is an attacker, and on your T4 their units are defending. Flurry is the only one of the three
that touches your units. The next sweep in the set is `OGN-127 Cannon Barrage` (Body, E2 + 1 Power).

Walked on your T4, with a Flurry in hand and three ready runes. Yuumi's trigger is on the Combat
Chain, choosing the Guardian. They respond with Flurry (813.1.c.1), and it resolves first. One
damage on every unit at a battlefield: Yuumi, the Guardian and the Poro at B, the Drakehound and Pouty
Poro there too, and the Stalwart Poro at A. The cleanup kills Yuumi, 1 on a 1 (143.2.a). The Poro
has been dealt damage this turn: no card, whatever happens next.

**Then the grant mistargets.** 359.3.f.2: *"Information referenced in an instruction in this way will
be checked on execution of the instruction."* 359.3.f.1 names "here" as such a reference, read from
the source. And 359.3.e.12 on a unit that has left the board: *"A unit that is no longer on the board
has no location"*. With Yuumi in the trash there is no "here" for the Guardian to be at. The example
under 359.3.f.2 is the same shape: Yasuo's attack trigger mistargets when he is moved back to base in
response. The Guardian stays a 3.

So the combat is 3 + 3 = 6 against 3 + 2 = 5, with 1 already marked on every unit. Their 5: the
Guardian takes lethal first, 2 more; the Poro next, 2 more; the last 1 has no further unit to go to,
so it stays on one of them (465.2.c.4). Both die. Your 6: the Drakehound needs 2 more and Pouty Poro
1; both die. Nobody is left at B, so it becomes uncontrolled (466.5.b) and there is no Conquer. After
your T4 it is **3 to 3**, and you have lost Yuumi, the Guardian and the Poro, nine Energy and one
Power of units, to one Energy. The line without Flurry was 4 to 3 and a card.

**What answers the Flurry.** `OGN-045 Defy` (Calm, E1 + 1 Power, [Reaction]): *"Counter a spell that
costs no more than :rb_energy_4: and no more than :rb_rune_rainbow:."* Flurry qualifies. On T4 you
have seven ready runes; one Calm among them pays both halves (164.2.a, 164.2.b). `UNL-106 Repulse`
(Body) does not: it counters only a spell that chooses your unit, and Flurry chooses nothing
(355.10.d).

**The draw alone has a one-rune answer that leaves the grant standing.** `VEN-015 Decree of Rage`
(Fury, E1 + 1 Power, *"This can't be countered. Deal 4 to an enemy Calm (:rb_rune_calm:) unit."*)
and `OGN-009 Hextech Ray` (Fury, E1 + 1 Power, *"Deal 3 to a unit at a battlefield."*) are both
[Action], so neither can answer Yuumi's trigger on the Combat Chain. Cast in the Combat Showdown once
they have Focus, either one kills the Affectionate Poro, Might 3, and there is no card. The Tank half
still works: Yuumi and the Guardian attack at 1 + 6 = 7, their 5 all go on the Guardian, your 7 kill
both, and you conquer B. That is 4 to 3, with the Poro gone and no card. Defy or Repulse counters the
Ray, because it chooses the Poro alone. The Decree cannot be countered, so neither of them answers
it.

**The answer that costs no card** is Might. They need one point more than the Guardian's Might after
the grant, 7 against your attack and 8 against your defence, to put anything on the Poro.

## 6. Verdict

**Right about the mechanism and the answer, wrong about the printed Tank, and short about what the
answer costs you.** Yuumi's grant put all 5 of the opponent's damage on a body that survived it, and
the Poro drew. Without her, the same attack lost the Guardian and the card. A printed Tank does not
make the grant redundant: its +3 is the threshold, and the only other unit to give it to is the Poro
itself. Flurry of Blades in response to the trigger kills Yuumi first, the grant then has no "here",
and the attack that should have drawn a card loses all three of your bodies and leaves B empty.

## 7. Not verified

I did not deal the channel order. Their Drakehound needs one Fury among their first three runes,
which it recycles: with six Fury in the twelve it fails in **20 of 220 deals, 9.09%**. Flurry is
Energy only. Your Yuumi needs one Calm among the six runes you have channelled by T3. With six Calm in
the twelve the six hold none in **1 of 924 deals, 0.11%**; with four, **28 of 924, 3.03%**. Defy in
§5 needs a second Calm among the eight runes channelled by T4; with six Calm it never fails, since
eight runes hold at most six Body. With four Calm, Yuumi's Calm by T3 and Defy's by T4 together fail
in **39 of 495 deals, 7.88%**.

The reading that the grant mistargets rests on 359.3.f.2 and 359.3.e.12; the rulebook's own example
under 359.3.f.2 is a move to base, not a death. If the grant resolved anyway, the Guardian is a 6
with 1 marked, their 5 make it lethal, the Poro lives with 1 marked and still draws nothing, and your
3 + 6 = 9 win B: 4 to 3, with Yuumi and the Guardian gone and no card.

I put Flurry in their hand and Defy in no hand, and priced neither. I did not walk their T4 against
the Flurry line, a second Yuumi trigger on their turn, the mulligan, or 2v2. The probabilities in §4
count only cards in hand at the turn named.

## Leads

- The sixth notable says *"a garrison that already contains a printed Tank wants Yuumi's grant
  elsewhere or not at all"*. 815.2 makes only the keyword redundant; the +3 is what raises the
  threshold, from 3 to 6 on attack and 4 to 7 on defence for a Sunlit Guardian. With Yuumi, the
  printed Tank and the Poro, "elsewhere" is the Poro, which 815.1.c.2 then makes a legal first
  assignment. Grant it to the printed Tank.
- The last notable names Flurry of Blades as the answer to Yuumi's Might 1. Cast in response to her
  trigger, it also denies the grant: the grant reads "here" on execution (359.3.f.2), and a unit off
  the board has no location (359.3.e.12). Walked, that turns a winning attack into three of your
  bodies lost and an empty battlefield.
- No notable says the attack needs all three units in base. A Standard Move goes base to battlefield
  or back (144.4.a, 144.4.b), and 144.3 moves them together, so the Poro and the third body cannot
  hold a battlefield on the turn before.
- The draw threshold is the Tank's Might, not one less: at exactly that number the Tank dies and the
  Poro still draws. The second notable's "an attack summing 5 or less kills nobody at all" is the
  survival threshold, a different number.
