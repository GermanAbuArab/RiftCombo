# Play — the order is free until it is everything, and a package that scores nothing

Issue #200, 2026-09-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline.

**Subject: `crackshot-corsair-warwick-attack-order`**, mono-Body, chosen by measurement rather than
taste: of 771 entries, 262 carry forced-ordering language in their steps and **102 of those have a
`terminatesIn` that is a bare quantity with no ordering word in it.** This one is at the top of that
list and its own id names the thing its `terminatesIn` cannot say.

**It scores nothing.** `terminatesIn` reads *"one kill per Corsair per attack, three of each by
103.2.b … nothing here scores"*, which is true and is not a verdict. **The question a play can ask is
what a package that scores nothing is worth in turns**, and the answer turns out to depend entirely
on how big the opponent's bodies are — which is the one thing neither the entry nor the clock can see.

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend whose identity contains Body; both cards are mono-Body |
| **The pack** | `OGN-159 Warwick, Hunter` (E6 + 1 Power, M5, *"I enter ready. When I attack, kill all damaged enemy units here."*) · 3x `OGN-130 Crackshot Corsair` (E3, M3, *"When I attack, deal 1 to an enemy unit here."*) |
| **The curve** | `UNL-111 Determined Sentry` (E1, M1) — the identity's own cheap body, and the do-nothing curve's engine |
| **Board it wants** | an enemy garrison, and the bigger its bodies the better |

**E15 and 1 Power for zero points.** That is the whole reason this needs a turn table.

## 2. The baseline, checked the way the last two taught me to

Body reaches `UNL-111 Determined Sentry` at Energy 1, and **103.2.b allows three copies**, so two of
them cost 2 Energy and land on turn 1's two runes — **two bodies, not two cards.** Both conquer on T2
and the Hold curve reaches eight on **T5** unopposed. Hold one battlefield instead of two and the same
curve pays 1 a turn and arrives on **T9**.

`UNL-111` is not [Unique], not Signature and not in `data/legality.json`; I checked before relying on
the three-copy path, because reading *"two bodies"* as *"two cards"* is what cost the first play in
this series its headline.

## 3. The turns, going first, against an opponent who takes your second battlefield

`R` = runes after that turn's Channel Phase. A rune pays 1 Energy by exhausting (164.2.a) and can also
be recycled for 1 Power (164.2.b, cost is the recycle), the recycled rune leaving for the Rune Deck
(161.2.b) and returning at 2 a turn (315.3.b).

```
        R   you                                              idle    score
T1      2   Determined Sentry x2 (E2)                         E0       0
T2      4   Sentry #1 -> A, Sentry #2 -> B, two Conquers      E1      +2 = 2
            Crackshot Corsair #1 (E3)
     their turn: a body walks into B, kills the Might-1 Sentry
                 in combat and Conquers. B is theirs.
T3      6   HOLD A                                            E0      +1 = 3
            Warwick (E6 + 1 Power)   (R -> 5)  — ENTERS READY
            Warwick + Corsair #1 -> B.  Corsair marks 1.
            Warwick kills every damaged enemy unit there.
            No defender remains, so 465.1 never opens the
            damage step. 466.3.a wins it, 466.5.d Conquers.    —      +1 = 4
T4      7   HOLD A and B                                      E7      +2 = 6
T5      9   HOLD A and B                                      E9      +2 = 8   WIN
```

**T5 — a tie with the unopposed curve, on a board where the opponent was actively taking a battlefield
away.** That is what the package is for: it does not raise the rate, **it defends the rate.** Against
the contested curve you would otherwise be on, T9, it is four turns.

**T2 idles one Energy and T4 and T5 idle seven and nine**, which is the shape of every Body curve —
the deck's points come from bodies that cost two Energy and its mana outruns them from T4.

## 4. The ordering, and the board on which it is free

Both triggers fire on one event: 464.2.c.3 designates the attackers, and 383.3.d gives the controller
the placement — *"If more than one Triggered Ability is Triggered simultaneously, then the player that
controls the Abilities selects the order to place them on the Chain."* 340.1 then resolves **the
newest** finalized item first.

**So Warwick goes on the Chain FIRST in order to resolve LAST**, and 359.3.f.2 — *"Information
referenced in an instruction in this way will be checked on execution of the instruction"* — is what
lets his *"all damaged enemy units"* read marks that did not exist when the trigger was placed.

**Now the half a turn table shows and a rule citation does not.** Put Warwick on the Chain LAST, so he
resolves first, and he kills nothing; the Corsair then marks 1 and the combat proceeds to its damage
step.

- **Against a small garrison this costs you nothing.** Warwick and one Corsair are summed Might 8
  (465.2.a), and a Might-2 or Might-3 defender dies to combat damage whichever order you chose. On the
  board in §3, the ordering is free.
- **Against a body bigger than your board it is the entire line.** 465.2.c.4 forbids assigning a unit
  more damage than the minimum needed to kill it, so eight summed Might cannot kill a Might-10
  defender at all — it survives, 466.1.a.2 recalls your attackers because a defender remains, and the
  attack achieves nothing. **Order it correctly and one point of Corsair damage makes that same
  Might-10 body a legal target for a kill that never reads Might.**

**The ordering is free until it is everything, and which board you are on decides which.** An entry has
one `terminatesIn` and it says *"one kill per Corsair per attack"* — a rate, correct, and silent about
the only question that matters.

## 5. A turn the entry does not spend

`OGN-159` prints **"I enter ready"**, and the entry's own first step reads *"Have Warwick, Hunter …
on the board or in hand"* without using it. 143.4 enters units exhausted and 143.4.a allows that to be
altered; a ready Warwick can pay 144.2's exhaust for a Standard Move **the turn he is played**.

That is why T3 above both deploys him and attacks with him. It is worth a full turn on a five-turn
clock, and it is the difference between the table above and the same table with everything after T3
pushed back one.

## 6. Breaks to

- **A garrison wider than your Corsairs.** Each Corsair marks exactly one enemy unit, so the pack kills
  N bodies for N Corsairs and 103.2.b caps that at three. A fourth defender survives, and a survivor is
  fatal rather than merely disappointing: 466.3.a gives the combat only to the player who is *"the
  only Player that has units remaining"*, so 466.1.a.2 recalls your whole pack and you Conquer nothing.
  **Width beats this package where size does not.**
- **An empty battlefield.** 323.9 stages a Combat only where opposing units are present and 807.1.d
  makes the Attacker designation a thing you gain *during Combat*, so neither trigger fires on a
  bloodless walk-in. The package is dead on exactly the board where you are winning anyway.
- **Removal on Warwick before the attack.** He is Might 5 with no protection, and every Corsair in the
  pack is a Might-3 body that does nothing on its own.

## 7. Verdict

**It defends a rate rather than raising one, and that is worth saying plainly because every other
package in this catalogue is measured in points.** The Body curve already wins on T5 if nobody
contests it; the entire value of fifteen Energy and a Power is that **T5 still happens when somebody
does.**

And its ordering — the thing its id is named after — **is worth nothing on the board in §3 and worth
the whole line one Might higher.** The entry is right about the rule and cannot say that, because a
rate is not a board.

## 8. Not verified

I did not walk what the opponent does if they garrison B with THREE bodies rather than one. §6 names
width as the failure and gives the rule, but the arithmetic of whether a Body deck can profitably hold
three Corsairs and Warwick in hand until a three-body garrison appears is a deckbuilding question I
did not price. Read §6's first bullet as the shape of the failure, not as a frequency.
