# Play — what the idle mana buys: denial is a wash, removal is a turn

Issue #200, lane rc-synth, 2026-09-12. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`.

The companion to [Chaos/Order, the identity with one answer](2026-09-12-chaos-order-the-one-answer.md),
which ended on a loose end: the deck **idles four Energy on turn 2 and two to four on turns 4 and 5**,
every card in it is a payoff, and Chaos is the denial domain. So: **can the idle mana be spent on
something that costs the opponent a Hold, and does that change the result?**

The answer is yes, but only one of the two obvious ways works, and the rule that separates them is one
sentence.

---

## First, the race that play left imprecise

That play said the line "roughly ties". That is true on average and **it hides the only thing that
matters**, which is *which* opponent. Going first, my turn 6 comes before their turn 6.

**A generic opponent** — cheapest body Energy 2, so one body on T1:

| their turn | what happens | their total |
|---|---|---|
| T1 | play a body | 0 |
| T2 | move it in → Conquer BF1; play a second body | 1 |
| T3 | Beginning: Hold BF1. Main: move the second in → Conquer BF2 | 3 |
| T4 | Hold both | 5 |
| T5 | Hold both | 7 |
| T6 | Hold both → **8** | 9 |

Their T6 is **after** my T6. **I win.**

**A Body or Calm opponent** is a full turn faster, and the reason is a two-card fact this project already
measured: the pool prints exactly **two** deckable units at Energy 1 or less — `UNL-111 Determined
Sentry` (Body, M1) and `VEN-043 Steel Paws` (Calm, M0) — so only those two identities deploy **two**
bodies on turn 1:

| their turn | what happens | their total |
|---|---|---|
| T1 | play **two** Energy-1 bodies | 0 |
| T2 | move both in → **Conquer both** | 2 |
| T3 | Hold both | 4 |
| T4 | Hold both | 6 |
| T5 | Hold both → **8** | 8 |

Their T5 is **before** my T6. **They win.**

**So the matchup that decides this deck is Body or Calm, and it is lost by exactly one turn.** That is
the precise version of "roughly a tie", and it is what the idle mana has to buy.

---

## The two ways to spend it, and the sentence that separates them

Both candidates cost 2 Energy and no Power — the exact shape of the idle slot.

| | card | text |
|---|---|---|
| **MOVE** | `UNL-124 Isolate` (Chaos, E2) | *"Move an enemy unit from a battlefield to its base. Then, if there's an enemy unit alone at that battlefield, draw 1."* |
| **KILL** | `SFD-162 Blood Money` (Order, E2) | *"[Action] (Play on your turn or in showdowns.) Kill a unit at a battlefield with 2 :rb_might: or less. If it was an enemy unit, play a Gold gear token exhausted."* |

Both strip Control the same way. **323.6**: *"Players lose control of any controlled Battlefields without
their Units occupying them if the turn is in an Open State and there is no Showdown or Combat ongoing
there."* Cast on my Main Phase against a one-body garrison, either empties the battlefield and the next
Cleanup takes their Control — so their Beginning Phase Holds one battlefield fewer (315.2.b.2 Holds
*"all Battlefields they Control"*).

**And then they are not the same at all, because of 469.1**:

> **469.1.** Conquer: A player gains Control of a Battlefield they did not yet Score this turn.

### MOVE is a wash — the body walks back in and the Conquer pays exactly what the Hold would have

Isolate sends the body to **their base**, not out of the game, and the move is by effect, so 420.3.a's
exhaust — which sits on the Standard Move alone — is never charged. **The body is at their base, ready.**

| their T4, after an Isolate on my T4 | points |
|---|---|
| Beginning: Hold BF2 only (BF1 was stripped) | +1 |
| Main: Standard-Move the same body back to BF1. They have not Scored it this turn, so 469.1 gives them a **Conquer** | +1 |
| **total for the turn** | **2 — unchanged** |

**Two Energy bought nothing.** This is the project's own recorded lesson arriving from a new direction:
the #102 walk wrote *"denial alone costs the opponent nothing — they Conquer on re-entry"* about
`UNL-207 Amateur Recital`, and it is true of every mover in the pool for the same reason. **A Hold and a
Conquer are both worth exactly one point (194.1.a, 194.1.b), so pushing a body off a battlefield only
exchanges one for the other.**

### KILL buys the turn, because a corpse needs replacing and 143.4 costs a turn

Blood Money's Might gate of 2 covers both fast bodies exactly — Determined Sentry is Might 1, Steel Paws
is Might 0.

| their turn, after a Blood Money on my T4 | points |
|---|---|
| **T4** Beginning: Hold BF2 only | +1 → 5 |
| **T4** Main: play a replacement body. **143.4 has it enter exhausted**, so it cannot move this turn | +0 |
| **T5** Beginning: Hold BF2 only | +1 → 6 |
| **T5** Main: 315.1.b readied it; move it to BF1 → Conquer | +1 → 7 |
| **T6** Beginning: Hold both | +2 → **9**, on their T6 |

Their turn 6 is **after** my turn 6. **I win, and the margin is one card and two Energy.**

**And the two Energy is exactly what the deck has.** On T4 the line spends E6 on the second Ivern out of
8 runes; the spare is 2, and Blood Money is 2 with no Power. It does not compete with the Ride the Winds
either, which are cast on T6.

---

## Needs

Everything from the first play, **plus 3× `SFD-162 Blood Money`** (Order, E2 — legal in the identity, no
Power, and it hands you a Gold gear token when it kills an enemy). Total **E32 + 3 Chaos Power**, 10
cards of 40.

## Breaks to

- **A garrison of two or more.** Both cards answer one body; against two at a battlefield, Control is
  not stripped (323.6 needs the battlefield *unoccupied*) and the Hold pays in full. `SFD-129 Temptation`
  (Chaos, E2, **[Repeat] E2**, *"Move an enemy unit to a location where there's a unit with the same
  controller"*) is the two-body answer and is still a MOVE, so it is still a wash by 469.1 — the honest
  answer to a two-body garrison is a second kill, not a cleverer move.
- **A body above Might 2.** Blood Money's gate stops there. `UNL-159 Soul Harvest` (Order, E2 + 1 Power)
  reaches Might 3 and `OGN-213 Hidden Blade` (Order, E2 + 1 Power, [Action]) is unconditional — both cost
  Power, which the T4 slot does not have spare once an Ivern is paid for.
- **Anything that kills the Daring Poro**, unchanged from the first play: the four-tag clause is checked
  on resolution (383.2.a.1's Loose Cannon shape), so one removal spell still takes the finish from eight
  points to two.

---

## Verdict

**The idle mana is worth exactly one turn, and only if it is spent on removal.** That is enough, because
one turn is the entire margin in the only matchup the deck loses.

The general form is worth more than the deck: **on a board where both players are scoring off
battlefields, moving an enemy body is not tempo — it is a swap of a Hold for a Conquer at the same
price.** 469.1 is what makes it a swap, and it applies to every one of the pool's movers. Removal is
tempo because 143.4 makes the replacement cost a turn, and that is the difference between the two
Energy-2 spells this deck could have run.

**What this did not change**: the line still does not interact with the opponent's *plan*, only with one
body of it, and against a two-body garrison the whole argument above needs a second copy. It moves the
deck from losing one matchup by a turn to winning it by half a turn, which is the honest size of the
result.
