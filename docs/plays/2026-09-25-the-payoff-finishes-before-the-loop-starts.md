# Play — the payoff finishes a turn before the loop can start

Issue #231 (a slice of #200), 2026-09-25. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline and
[the setup nobody prices](2026-09-13-the-setup-nobody-prices.md) for the empty-deck arithmetic this
play reuses.

**Subject: `jhin-virtuoso-ekko-malzahar-vi`**, the fury/mind INFINITE that loops Ekko, Malzahar,
Upstage Comedy and Vi under the legend Virtuoso and spends the surplus on
`SFD-088 Renata Glasc, Mastermind`'s points. The turn clock reads it at **T6 against a T6 baseline**.
Walked turn by turn, the loop cannot start before **T7**, and by then the same deck has already won
on **T6** with two of the loop's own cards and no loop at all.

**Why this line.** `scripts/sequence-pick.mjs` measures a queue: entries whose `steps` carry
forced-ordering language and whose `terminatesIn` is a bare quantity with no ordering word. At 771
entries it reads 262 with the language and **102 in the queue**. Restricted to the legend pairs with
no play yet, the queue holds exactly two finishers; this is the fury/mind one, and its `terminatesIn`
is the barest in the catalogue: *"8 points"*. The calm/chaos one is played in
[the fight it does not need to avoid](2026-09-25-the-fight-it-does-not-need-to-avoid.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-181 Virtuoso` (Fury/Mind) — the entry names it; §2's finish works under any Fury/Mind legend |
| **The loop** | `OGN-110 Ekko, Recurrent` · `OGN-113 Malzahar, Fanatic` · `UNL-009 Upstage Comedy` · `OGN-036 Vi, Destructive` · a 4-Energy draw spell (`OGN-083 Consult the Past`, or `UNL-061 Downstage Dramatics` paid with its [Repeat]) · `OGN-114 Progress Day` |
| **The payoff** | `SFD-088 Renata Glasc, Mastermind` (Mind, E5, M4) |
| **The free curve** | one `OGN-013 Pouty Poro` (Fury, E2, M2, [Deflect]) — not in the entry; §2 is built on it |
| **Board** | the contested one: you hold one battlefield, the opponent garrisons the other |

Domain identity from `data/cards.json`: Upstage Comedy, Vi and Pouty Poro are Fury, the rest Mind,
union `{fury, mind}` under 103.1.b. None of these is a Signature card and none appears in
`data/legality.json`. 103.3.a.1 asks only that runes be *"of the Domain Identity of your Champion
Legend"*, so a twelve-Mind Rune Deck is legal, and §2 wants one.

The two cards the finish turns on:

- Renata Glasc, Mastermind: *":rb_energy_1::rb_rune_mind:: Draw 1.
  :rb_energy_4::rb_rune_mind::rb_rune_mind::rb_rune_mind::rb_rune_mind:, :rb_exhaust:: Score 1 point.
  Use my abilities only while I'm at a battlefield."* The second ability is four Energy, four Mind
  Power and her exhaust.
- Upstage Comedy: *"[Repeat] :rb_energy_2: (You may pay the additional cost to repeat this spell's
  effect.) Ready a unit."*

## 2. The finish nobody wrote down, going first

`R` = runes on the board at the start of the Main Phase. A rune pays 1 Energy by exhausting
(164.2.a) and 1 Power by recycling, and 164.2.b's cost is the recycle, not an exhaust — **so one rune
pays one Energy AND one Power in the same turn**, and then leaves for the Rune Deck (161.2.b). That is
why Renata's point, E4 plus four Mind Power, costs exactly four runes.

```
       R   spend                                              idle   score
T1     2   Pouty Poro (E2)                                     E0      0
T2     4   Poro moves to battlefield A -> Conquer              E4     +1 = 1
T3     6   —                                                   E6     +1 = 2   (Hold A)
T4     8   Renata (E5), played straight to A                   E3     +1 = 3
T5    10   Renata scores (4 runes: E4 + 4 Mind)                E0     +1 = 4   (Hold A)
           Upstage Comedy readies her (E2)                            +1 = 5
           Renata scores again (4 runes)          (R -> 2)            +1 = 6
T6     4   Renata scores (4 runes: E4 + 4 Mind)                E0     +1 = 7   (Hold A)
                                                                      +1 = 8   WIN
```

355.2.a is what lets Renata skip the walk: *"By default, Valid locations include the controller’s Base
or a Battlefield the controller controls."* She enters exhausted (143.4) and 315.1.b readies her at
your next Awaken. Her points are card-text Gains under R2 = A, so 470's once-per-battlefield cap is
spent on the Hold and never on her.

**T6, the unopposed baseline for fury/mind, reached on the board where you hold ONE battlefield**,
whose contested baseline is T9. Neither Fury nor Mind prints a unit at Energy 1, so the baseline is
T6 and not T5; this finish ties it with half the free curve.

T5 is exact: three actions spend ten runes, which is every rune T5 has. Hence the twelve-Mind Rune
Deck — eight Mind recycles on T5 and four on T6, and 108.5.d makes the Rune Deck's order secret, so a
split deck would be relying on luck.

## 3. The loop, priced the same way

The loop's own ledger states its two preconditions: *"twelve runes on the board is a hard
precondition"*, and the Main Deck must be empty so that a recycled card is the next draw.

**Twelve runes arrive on T5, one turn earlier than the family's floor, and the legend is the
reason.** Virtuoso reads *"When you play a spell, if you spent :rb_energy_4: or more, you may banish
it. Then, if there are four spells banished with me, put each in its trash, channel 4 runes, and draw
1."* Four 4-Energy spells by T5 do it: Consult the Past on T3, Consult the Past and Downstage Dramatics
(paid with its [Repeat], so four spent) on T4, and Progress Day on T5. T5 opens on ten runes, one is
recycled for Progress Day's Mind cost, and the fourth banish channels the last three that are left
in the Rune Deck. 430.3: *"If there aren’t sufficient runes in the Rune Deck,
channel as many as possible."* A legend that channels nothing waits for T6.

**The empty deck arrives on T7 and not before.** With `VEN-165 Shadow Temple` as the battlefield you
hold (colourless, *"When you hold here, [Burn 3]"*), the deck of 39 less the opening four runs:

| end of turn | removed that turn | left |
|---|---|---:|
| T1 | draw | 34 |
| T2 | draw | 33 |
| T3 | burn 3, draw, Consult the Past 2 | 27 |
| T4 | burn 3, draw, two draw-2 spells | 19 |
| T5 | burn 3, draw, Progress Day 4, Virtuoso 1 | 10 |
| T6 | burn 3, draw, Consult the Past 2 | 4 |
| T7 | burn 3, draw | **0** |

T6 must end at exactly four. 315.4.b.1 makes an empty deck at the Draw Phase a Burn Out, and the
Temple's burn has no *"may"*, so a deck at three when T7's Hold fires burns out: 431.2.b recycles the
trash back in, randomised, and the loop's known bottom is gone. **The loop's first playable Main
Phase is T7.**

**So the INFINITE is T7 at the earliest, and the deck that runs it won on T6** — with Renata and
Upstage Comedy, two of the loop's eight cards, and the battlefield the loop needs Renata to stand on.

## 4. The order the entry forces, and why the finish wants the opposite

The entry's one forced ordering is its fourth step: recycle four exhausted runes for Power *"just
before the fourth banish resolves — a rune's Recycle this: Add Power has no exhaust in its cost —
then let Virtuoso channel them straight back ready."*

Walked with twelve runes on the board and an empty Rune Deck, the reorder is not a lost bonus, it
is a broken pass. **Recycle the four AFTER the channel** and 430.3 finds nothing to channel; the
four sit in the Rune Deck until the next fourth banish, and the four passes between run on eight
runes. The entry's own ledger prices a Draw-2 pass at *"(runes − 11) Energy and +1 Power per pass"*:
eight runes is three Energy LOST per pass, four passes is twelve, against a supercycle whose whole
margin by the same ledger is *"+4 Energy, +4 Power per four passes"*. One recycle in the wrong window
turns the loop net negative until the next channel refills it.

**The same temptation arises every time Renata scores.** Her point wants four Mind Power, and the
nearest Mind Power in the game is a rune. Inside the loop, that recycle is only safe in the window
the entry names; anywhere else it drops the board below eleven and the passes start losing Energy.

**The fair finish in §2 does exactly that, deliberately, twelve times.** It recycles every rune it
exhausts, because it does not need the board to exist next turn: the game is over. The two lines
share a payoff and want opposite rune discipline — the finish burns the board down to pay, the loop
must never touch it outside one window.

## 5. What the loop is for, and the board where it cannot be built

The finish in §2 needs Renata to survive the opponent's T4 and T5 at a battlefield, and needs you to
hold that battlefield from T2. The loop needs a battlefield only on the turn it runs, and its surplus
Energy can buy the walk. **So the loop is the recovery line for a board where the free curve was
broken**, which is the same shape the Trinity Force play found for its attack half.

**And on that board its deck-emptier is switched off.** The Temple reads *"When you hold here"*, and
190.6.d is explicit: *"“You” in a battlefield’s abilities refers to the battlefield’s Controller"*. A
Temple the opponent took burns THEIR deck. Without it, the table in §3 loses fifteen cards of burn
across T3 to T7, and the empty deck lands later than T7 by however many draws the list can buy; the
setup play puts the Temple-less figure for a similar shell at turn ten or eleven.

**The loop is the answer to a broken free curve, and a broken free curve is what delays the loop.**

## 6. Breaks to

**`OGN-213 Hidden Blade`** — Order, E2 + 1 Power, [Action]: *"Kill a unit at a battlefield. Its
controller draws 2."* Cast in the opponent's own Main Phase on T4 or T5, it kills Renata where she
stands, and the finish loses every point it had not yet scored. Of the sixteen spells in the pool
that kill a unit or deal four or more to one, it is one of the two cheapest that reach a Might-4 body at
a battlefield (the predicate is *"kill a unit"*, *"kill an enemy unit"* or *"deal"* four to nine to a
unit, on spells; the other is `VEN-154 Public Execution` at the same price, which needs a friendly
unit bigger than Renata). Its [Hidden] route does not help the opponent here: 811.1.b hides a card only at a
battlefield they control, and Renata stands on yours.

Against the loop turn itself I found nothing cheap that ends it. Its units resolve with no window,
Malzahar's Add ability *"can't be reacted to"* in his own reminder text, and Ekko's [Deathknell]
chooses nothing, so the pool's two ability counters, which both need a friendly unit of theirs to be
chosen, cannot reach it. The windows are the spells: `OGN-045 Defy` (Calm, E1 + 1 Power) counters
Upstage Comedy or Consult the Past, and the countered card goes to the trash, where Vi recycles it
for nothing. A counter costs the loop a pass, not the loop.

## 7. Verdict

**The entry is correct, and it is not how this deck wins.** Priced as a game, the loop's two
preconditions — twelve runes and an empty Main Deck, emptied inside the Main Phase that uses it —
land on T7, and on T6 the same deck has already scored eight: one Conquer, four Holds and three
Renata points bought with Upstage Comedy and ten runes.

**Virtuoso is a better ramp than the loop needed**: the fourth banish reaches twelve runes on T5, a
turn inside the floor every other Renata loop lives with. It is the empty deck, not the runes, that
sets the date.

**The ordering in the entry is real and it is also the one habit the fair finish must use.** Paying
Renata's Mind Power by recycling runes wins the game on T6 and breaks the loop on T7. A player who
learned the deck from the finish will make exactly the move the loop cannot survive.

## 8. Not verified

I did not price the empty deck without the Temple for this list, only cited the setup play's figure
for a similar shell. I did not walk a full loop turn with the fifteen burned cards chosen adversely:
all three copies of Vi burned would leave nothing to recycle from the trash, and the loop would not
start at all. And §6's claim about the loop turn is a claim about the windows I checked, not a sweep
of every card in the pool.

## Leads

- The entry has no field for §2. A notable stating that Renata and Upstage Comedy alone win on T6
  from the contested curve, a turn before the loop's preconditions can both hold, would tell a reader
  which half of the list is the finisher.
- The entry's step 4 names the correct window without naming the cost of missing it. A notable
  stating that the same recycle one window late puts the next four passes on eight runes would carry
  §4.
