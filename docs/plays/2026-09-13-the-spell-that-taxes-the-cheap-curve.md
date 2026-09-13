# Play — the spell that taxes the cheap curve, and why its threshold is exactly where it is

Issue #200, lane rc-synth2, 2026-09-13. Constructed, Duel (485). Rules version 2026-07-16. Card text
verbatim from `data/corpus_flat.txt`; rules pasted from `data/Riftbound-Core-Rules-2026-07-16.txt`.
Read [the unopposed clock](2026-09-12-the-unopposed-clock.md) first — the whole play is measured
against the curve it establishes.

**Subject: `death-from-below-recurring-kill`**, and this is the **first play about an ENGINE** rather
than a finisher. That class is 686 of the catalogue's 766 entries and until today none of it had a
turn on it at all.

**The question an engine play has to ask is different, and narrower.** A finisher is measured by the
turn it wins. An engine never wins, so the only honest question is **what it does with the turns
between coming online and the game ending** — and the game ends, unopposed, on turn 5 or 6.

---

## 1. The card, and a threshold that is not an accident

> **`UNL-186 Death from Below`** — Spell, Fury/Chaos, E4 + 1 Power — *"Kill a unit at a battlefield.
> Then, if it had 3 Might or less, do this: You may play this from your trash for [rainbow]."*

`387.1` recognises *"Do this:"* as a **Reflexive Trigger** and `388.1` adds it to the chain as its own
Pending Item, while `359.3.d` has already put the spell in the trash — so the replay is legal and the
card is where it needs to be. **After the first cast it is one kill per rainbow Power, for as long as
the bodies stay small.**

Everything turns on *"3 Might or less"*, so that is the thing to measure rather than to assume.
Swept over every deckable unit in `cards.json`, folded by name and type — **466 units, of which 192
(41%) are Might 3 or less.** Cut by Energy cost instead, which is the axis the opening actually runs
on:

| printed Energy | units at Might ≤ 3 | share |
|---|---|---:|
| **E1** | 2 of 2 | **100%** |
| **E2** | 64 of 65 | **98%** |
| **E3** | 96 of 109 | **88%** |
| E4 | 25 of 99 | 25% |
| E5 | 5 of 80 | 6% |
| **E6** | 0 of 60 | **0%** |

**The chain condition is not a Might threshold, it is a COST threshold wearing one.** Ninety-eight per
cent of the two-drops and none of the six-drops. And the do-nothing Hold curve is built out of exactly
the left-hand column: the pool prints **two** deckable units at Energy 1 or less and everything else
starts at Energy 2, which is why that curve conquers on turn 2 at all.

**So the bodies that stop the chain are the bodies that cannot be on the board when the race is
decided.** A four-drop is a turn-4 play at the earliest on a 2-runes-a-turn curve, and by then the
free curve has been scoring for two turns.

## 2. The identity is forced, and by one word on the card

`UNL-186` is a **Signature card** (`signature: true` in `cards.json`, tagged `Pyke`), and
**103.2.d.2** reads *"All of the Signature cards must have the Champion tag that corresponds to the
Champion Legend of the deck."* Of the five Fury/Chaos legend names in the pool — Loose Cannon, Dark
Child, Glorious Executioner, Bloodharbor Ripper, Master of Shadows — **exactly one carries the Pyke
tag: `UNL-185 Bloodharbor Ripper`.** The entry already says so; I checked it rather than assuming,
because a Signature card in `uses[]` makes that a one-legend field and this project has been caught by
it before.

## 3. The mana, which is the real rate limit

The first cast is E4 + 1 Power. Every replay after it is **1 rainbow Power and nothing else**, and
`135.2.e.5.a` makes a rainbow cost payable by Power of any domain.

- **164.2.b** — *"Recycle this: [Reaction] — Add [C]"* — its cost is the **recycle**, not an exhaust,
  so a rune already tapped for Energy still pays.
- **161.2.b** — a recycled rune goes back to the **Rune Deck**, so every kill after the first takes a
  rune off the board.
- **315.3.b** — you channel **2 a turn**, capped at 12 by 161.2.a.

**So the engine has two speeds and they are different numbers.** A **burst** is up to `R` kills in one
turn, emptying the board of runes. A **sustained** rate is **two kills a turn, forever**, which is
exactly what 315.3.b refills. Two is also the number of battlefields in a Duel (485.4).

## 4. What it does with the turns, against the curve it is trying to break

The opponent playing the fastest legal opening: two Energy-2 bodies down by turn 2, both walked in,
Conquering both battlefields, then 315.2.b.2 Holds both for 2 points a turn.

| turn | R | what happens | their score |
|---|---:|---|---:|
| **T1** | 2 | nothing; the spell is E4 | 0 |
| **T2** | 4 | nothing. They conquer both battlefields on their turn 2 | 2 |
| **T3** | 6 | **Death from Below** (E4 + 1 Power, R→5). Kill one holder — it is Might ≤3, so 387.1 fires and the replay is in the trash. Pay 1 rainbow (R→4): **kill the second**. Both battlefields are now empty of their units, so **323.6** strips Control at the next Cleanup. | 2 |
| **their T3** | | Beginning Phase: they Hold **nothing**. They replay bodies, which **143.4** enters exhausted, so nothing walks in this turn | 2 |
| **T4** | 6 | their new bodies are at base and not *"at a battlefield"* — nothing to kill, and nothing is being Held either | 2 |
| **their T4** | | they walk both in and Conquer again | 4 |
| **T5** | 8 | replay from the trash twice, 2 rainbow (R→6): both die again | 4 |

**They score 2 points in five turns instead of 8**, and the whole cost after turn 3 is **two Power a
turn** — exactly what the Channel Phase hands back. The engine does not win; it turns a five-turn
clock into no clock at all, for one card and a rune a kill.

**And that is what an engine play can say that a finisher play cannot.** The catalogue records this
line as producing `repeatable-removal` and nothing else, which is true and tells you nothing about
whether it is worth a slot. Priced against the curve it is answering, one card denies the entire
free-win line of the format at a rate the rune curve pays for.

## 5. Breaks to

- **[Deflect], and the rules make this one explicit.** `355.10.b`'s own worked example is this exact
  sentence: *"'Kill a unit at a battlefield' targets a unit, but not a battlefield, because the units
  are targets and 'at a battlefield' is a restriction."* It **targets**, so `809.1.c` charges *"an
  amount of Power equal to [Deflect Value] more … for each time they choose"*. **47 printings carry
  Deflect**, and `187.7` gives it to a Bird token by rule — so a garrison of Birds doubles the price
  of every kill, and the sustained rate falls from two a turn to one. This is the one keyword that
  beats the engine on its own axis rather than around it.
- **A four-drop.** Killing a Might-4 body still kills it, but `387.1`'s condition fails and the spell
  **stays in the trash with no replay** — the chain ends and the next kill is a fresh E4 + 1 Power.
  Per §1 that costs the opponent two turns of curve to set up, which is the trade the play is about.
- **Bodies kept at base.** The spell reads *"a unit **at a battlefield**"*. A body at base is
  untouchable — but a body at base is also not Holding anything, which is the point.
- **`SFD-105 Ruin Runner`-style *"can't be chosen"***, which `054.1` makes absolute where Deflect is
  only a price.
- **Your own clock.** Fury/Chaos prints no Energy-1 body, so **your** Hold curve is turn 6, and this
  line does nothing to shorten it. You are buying time, not points, and something else has to spend
  the time.

## 6. Verdict

**As a finisher it does not exist; as an answer it is the best rate in the catalogue for the cost.**
One card, one rune a kill, and the rune comes back at two a turn — against the exact body sizes the
format's fastest opening is obliged to use.

The general form is worth more than the line, and it is the same trade every play this lane has
written has landed on, arriving this time from the removal side rather than the finisher side:

> **The cheap bodies that make an opening fast are the cheap bodies that removal is priced to kill,
> and the bodies that are immune cost four Energy or more — which is to say they are not an opening
> at all.** The pool prints that trade into a single threshold on a single card: 98% of the two-drops
> and 0% of the six-drops.

Every earlier play here found that a **finisher** buys its speed with small bodies and pays for it in
fragility. This is the same sentence read from the other end of the table: the reason small bodies are
fragile is that the pool prices its removal exactly there.

## 7. For the manager

Nothing to apply and no defect found. The entry is correct, its Signature legend line is correct and
was rebuilt by `test/legend-lines.test.ts`, and `UNL-186` and `OGN-037` are clean in
`data/legality.json`. The two numbers above that are worth having somewhere durable are the
Energy-to-Might table in §1 and the two-speeds distinction in §3, and both are reproducible from the
commands in the walk document.
