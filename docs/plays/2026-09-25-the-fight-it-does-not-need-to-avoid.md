# Play — the fight it does not need to avoid, and the one order that turns nine points into one

Issue #231 (a slice of #200), 2026-09-25. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `draven-svellsongur-bloodless-combat-burst`**, the calm/chaos BURST that scores nine
points off one combat by putting three `SFD-059 Svellsongur` on `SFD-148 Draven, Audacious`. The turn
clock reads it at **T7 against a T5 baseline**, and walked turn by turn it is **T7**: the clock is
right about the turn. What it cannot say is which of the line's four cards is doing the work, and
the answer is not the one the entry's name suggests.

**Why this line and not another.** `scripts/sequence-pick.mjs` measures a queue of lines whose
interesting property is a SEQUENCE: an entry whose `steps` carry forced-ordering language (*before*,
*never after*, *in response*, *first* and five more words, listed in the script) and whose
`terminatesIn` is a bare quantity with no ordering word, so the entry has nowhere to say what the
order costs. At 771 entries, 262 carry the language and **102 are the queue**. Restricted to the
eight legend pairs with no play yet, the queue holds exactly two finishers, and this is one of them
(the other is the fury/mind INFINITE played in
[the payoff finishes before the loop starts](2026-09-25-the-payoff-finishes-before-the-loop-starts.md)).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Calm/Chaos name — the pool prints three: Unforgiven (`OGN-259`), Blade Dancer (`SFD-195`), Gloomist (`UNL-193`) |
| **The payoff** | `SFD-148 Draven, Audacious` (Chaos, E6 + 1 Power, M6, [Deflect]) |
| **The multiplier** | 3x `SFD-059 Svellsongur` (Calm gear, E3 + 1 Power, [Equip] 1 Energy + 1 Calm rune) |
| **The wall** | `UNL-057 Alpha Wildclaw` (Calm, E6 + 2 Power, M7, [Tank]) |
| **The removal** | `VEN-106 Wind and Ghosts` (Chaos, E3 + 1 Power, [Action]) |
| **The free curve** | 2x `VEN-043 Steel Paws` (Calm, E1, M0) — not in the entry; §6 is why it belongs in the deck |
| **Board it wants** | the opponent garrisoning a battlefield. On an empty board 323.9 stages no Combat and the line scores nothing |

Domain identity computed from `data/cards.json`: Draven and Wind and Ghosts are mono-Chaos, the rest
mono-Calm, union `{calm, chaos}` under 103.1.b. None of the six is a Signature card and none appears
in `data/legality.json`. Steel Paws carries no [Unique], so 103.2.b's three copies apply.

The card text the play turns on:

- Draven: *"The first time I win a combat each turn, you score 1 point. When I die in combat, choose
  an opponent. They score 1 point."*
- Svellsongur: *"As this is attached to a unit, copy that unit's text to this Equipment's effect text
  for as long as this is attached to it."* Three on one carrier compose to eight instances of both of
  Draven's sentences, which the entry derives from 434.1.c and R6 = A.
- Alpha Wildclaw: *"[Tank] (I must be assigned combat damage first.) Your units here with less Might
  than me can't be chosen by enemy spells and abilities."*
- Wind and Ghosts: an [Action] spell that chooses a unit at a battlefield, banishes it if it has 3
  Might or less, and otherwise returns it to its owner's hand.

## 2. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of the Main Phase. A rune pays 1 Energy (164.2.a, the cost is
its exhaust) and can also be recycled for 1 Power of its domain (164.2.b, the cost is the recycle, so
an exhausted rune still pays); the recycled rune goes to the Rune Deck (161.2.b) and comes back at two
a turn (315.3.b), capped at twelve (161.2.a). **Dead Energy is written down, not hidden.** The board is
the contested one: you hold battlefield A, the opponent garrisons battlefield B.

```
       R   spend                                              idle   score
T1     2   2x Steel Paws (E1 each)                             E0      0
T2     4   one Paws moves to A -> Conquer                      E4     +1 = 1
T3     6   (nothing that costs Power yet — see below)          E6     +1 = 2   (Hold A)
T4     8   Draven (E6 + 1 Chaos)                (R -> 7)       E2     +1 = 3
T5     9   Alpha Wildclaw (E6 + 2 Calm)         (R -> 7)       E3     +1 = 4
T6     9   3x Svellsongur (E9 + 3 Calm)         (R -> 6)       E0     +1 = 5
T7     8   3x [Equip] on Draven (E3 + 3 Calm)                  E2     +1 = 6   (Hold A)
           Draven + Wildclaw move to B as one action (144.3)
           Wind and Ghosts in the Showdown (E3 + 1 Chaos)
           combat won: 8 instances of Draven's point           +8 = 14
           466.5.d Conquer of B                                +1 = 15  WIN
```

**T7, and the brute-force search agrees**: over every way to buy the five permanents across turns
under the rune model above, with the burst turn paying E6 + 4 Power, the earliest burst is T7 with
Alpha Wildclaw and **T6 without him**. Wildclaw costs the line exactly one turn; §5 is about whether
that turn is worth buying.

**T3 idles six Energy on purpose.** Every Power paid before T4 takes a rune off the board and delays
the T6 purchase. The schedule buys nothing with Power until Draven, and it deploys the three
Svellsongur on T6 so they stand through ONE opponent turn rather than five. An earlier draft of this
table bought them on T2, T3 and T6 and reached the same T7 with the gear exposed for five opponent
turns; the late version is strictly better.

## 3. The order the entry forces, and what each reorder costs

The entry's steps carry two ordering claims in one sentence each. Walked, they are the whole line.

**The three Equips must come before the move, on the burst turn.** [Equip] is an Activated Ability
(818.1), and once Draven moves the next Cleanup stages the Combat (323.9) and opens it into a
Showdown. 308.1.a: *"Only cards and abilities with the Action or Reaction keywords can be played or
activated in a Showdown State."* [Equip] carries neither. **Equip after the move and the line is
worth one instance of Draven's trigger: 1 + 1 = two points on T7, not nine.**

Equipping on an EARLIER turn is legal and costs less than the entry's notable suggests on this
schedule. The entry warns against eight copies of *"When I die in combat…"* standing through an
opponent turn, which is a real risk for a Draven parked at a battlefield. Here he waits at your base,
where no combat happens, so the early attach only spends Equip Energy on a turn that has less of it
to spare. Attached or not, the three Svellsongur are gear on the board and every gear answer in §7
reaches them.

**Wind and Ghosts must come after the move, inside the Showdown.** It is an [Action] spell, so it is
also legal in your own Main Phase before you move — and that is the trap. Cast first, it banishes the
lone defender, and at the next Cleanup 323.6 applies: *"Players lose control of any controlled
Battlefields without their Units occupying them if the turn is in an Open State and there is no
Showdown or Combat ongoing there."* Battlefield B is now empty and uncontrolled. Draven walks in, and
344.2 governs instead of 323.9: *"If Control of a Battlefield is Contested, there aren’t units
controlled by different players there, and the turn is in a Neutral Open State, a Showdown is opened
during the next Cleanup."* A Showdown, no Combat. **Draven wins no combat, eight instances of his
trigger never fire, and the turn scores the Conquer alone: one point instead of nine.** Same cards,
same Energy, one spell cast one action early.

## 4. The fight is not the danger, and the spell is not the engine

The entry is named for a combat *nobody fights*, and its removal spell is described as what stops
the damage step ever opening. **Walk the damage step instead of avoiding it and the removal turns
out to matter only against a large garrison.**

465.2.c.3 forces damage to be assigned lethal to one unit in full before the next, and 815.1.c.2 says
of your side: *"Units without Tank are invalid assignments until all units with Tank have lethal
damage assigned to them."* So a garrison of summed Might D assigns its first seven to Wildclaw and
only the rest to Draven, who has six Might. **Draven dies only if D is 13 or more.** Your side
assigns 13 (Draven's 6 and Wildclaw's 7), which kills any garrison of summed Might 13 or less, and
465.2.c.4 lets the excess land on the last unit.

| garrison's summed Might | without Wind and Ghosts | with it |
|---|---|---|
| 0 (empty) | no Combat, 1 point (§3) | no Combat, 1 point |
| 1 to 12 | **garrison dies, Draven lives, you win the combat: 9 points** | 9 points |
| 13 | both sides die; 466.3.d is No Result, and eight instances of *"They score 1 point"* hand the opponent eight | removes one body; you are back in the row above |
| 14 or more | Draven dies, you do not win: the opponent scores eight | removes one body; if the rest is 12 or less, 9 points |

466.3.a is the test in the middle row: *"A Player has won a combat if they received either the
attacker or defender designation and are the only Player that has units remaining at this battlefield
during this step."* A garrison that dies in the damage step leaves you the only player with units.

**So the line's engine is Draven, the multiplier and the Tank. Wind and Ghosts is insurance against
exactly one board — a garrison of 13 or more — and against combat tricks cast in the Showdown.** That
is worth three Energy and a Chaos rune, but it is not what makes the line score, and a reader who
thinks it is will hold the spell back for the wrong reason.

The caveat the table hides: [Shield] adds Might to a defender (814.1.c), and a Reaction-speed pump in
the Showdown can lift a small garrison into the 13 row after you have committed. The spell is the
answer to that too, which is the honest reason to keep it in the list.

## 5. What Alpha Wildclaw buys for his turn

He is the difference between T6 and T7. What he buys for it:

- **The 13 in §4.** Without him your side assigns 6, so only a garrison of summed Might 6 or less
  dies, and any garrison of 6 or more kills Draven — eight points to the opponent. With him the
  threshold is 13. On the contested board that is most of the difference between a line and a
  gamble.
- **Draven's safety while he waits.** He stands at your base from T4. Of the sixteen spells in the
  pool whose text says *"kill a unit"*, *"kill an enemy unit"* or *"deal"* four to nine to a unit,
  eleven add *"at a battlefield"* and cannot reach
  a base at all. The other five can, and Wildclaw's second sentence answers the ones that choose:
  Draven has less Might than him, and *"here"* is wherever Wildclaw stands, base included.

**Drop him and the line is a turn faster and depends on the garrison being tiny.** Against a deck
that garrisons with Might 1 and 2 bodies, the T6 line without him is the better build.

## 6. The idle Energy is a second plan, and it changes what the burst has to do

T2 and T3 idle ten Energy between them, and the schedule cannot spend it on the line without paying
Power early. The two Steel Paws spend two of it on T1, and that is not a garnish: on the contested
board they take battlefield A on T2 and Hold it, **so by the start of T7 the deck has six points
before the burst begins.**

That changes the arithmetic of every answer. The entry's burst needs eight from zero; this deck's
burst needs two. §7's cheapest answer halves the payoff to five, and five on top of six is still a
win.

Steel Paws is Might 0, and 142.4.b makes lethal *"a non-zero amount greater than or equal to that
Unit’s Might"*, so one point of damage at a battlefield removes him. Protecting the free curve is a
second problem this play does not solve; §9 names it.

## 7. Breaks to

**`SFD-005 Detonate`** — Fury, E1 + 1 Power, *"Kill a gear. Its controller draws 2."* Cast on the
opponent's own T6 turn, against a Svellsongur standing unattached at your base, it leaves two gear:
two copies compose to four instances, so the burst is **4 + 1 = five points**. It costs the opponent
one Energy and a Fury rune and hands you two cards. On the burst turn itself the same job is done by
`SFD-011 Angle Shot` (Fury, E2, [Reaction]), which detaches one Svellsongur after the Equips — and
718.5.b, *"Attached cards still can be chosen or targeted by game effects while Attached"*, is why
an attached one is still a legal choice.

Against the entry as written (the burst from zero) either card beats it. Against the deck in §6 (the
burst from six) neither does alone; the opponent has to answer the free curve too.

## 8. Verdict

**The entry is correct and it is named for the wrong card.** Nine points off one combat is real. But
the combat does not need to be bloodless: with Alpha Wildclaw soaking the first seven, Draven wins
any fight against a garrison of summed Might 12 or less and never risks the eight points his own
drawback would hand the opponent. The removal spell is insurance for the one board where the fight
itself is the danger.

**The ordering is the line's real content, and it has one failure worth remembering.** Wind and
Ghosts is an [Action] card, so it is castable before the move, and cast there it empties the
battlefield, 323.6 strips its Control, 344.2 opens a Showdown instead of a Combat, and nine points
become one. The cheapest way to lose this line is to play its removal a single action too early.

**Priced as a game it is T7 against a T5 unopposed baseline and T9 contested** — two turns slower than
doing nothing on the board where nothing was needed, two turns faster on the board it is for, and on
that board it has already scored six by the time it swings.

## 9. Not verified

I did not walk the opponent's best line against the two Steel Paws, which a single point of damage
removes from battlefield A. If the free curve is broken, the burst needs eight from zero again and
§7's answers beat it. I also assumed the runes arrive in the domains the costs want: 108.5.d makes the
order of runes in the Rune Deck secret, and the schedule needs eight Calm and two Chaos recycles over
seven turns.

## Leads

- The entry's `terminatesIn` has no field for §3's reorder cost. A notable stating *"cast Wind and
  Ghosts after the move, never before: cast first, 323.6 strips Control and 344.2 opens a Showdown
  with no Combat, and the turn scores one point"* would put it where the matcher's reader sees it.
- The entry's name and first notable present the removal as the engine. §4's table suggests a notable
  saying the Tank alone wins any fight against a garrison of summed Might 12 or less.
