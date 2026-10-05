# Play — Jae draws before anything fights, and he fights the second time even if the first one killed him

Issue #262 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `jae-medarda-marching-orders-repeat-two-draws`**, the Body/Chaos ENGINE in which
`SFD-114 Marching Orders` with its [Repeat] chooses `SFD-142 Jae Medarda` twice, so one card draws
two and trades with two enemy bodies from your base. The entry is right about the two draws and right
that *"anywhere"* lets Jae fight from home. Walked as a game, the order inside the one resolution is
the whole line: both choices are made when you cast it, both draws resolve before either trade, and
Jae is not removed between the two executions however much damage the first one marks on him.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `1e5a8c3`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 79 of them with no play**. The
pick is by global rank, skipping entries that already have a play: this entry is rank 20 (hits on
*first* and *before*), first in the list. The other entry of this slice is rank 21, played in
[the tax is paid and the prohibition is walked around](2026-10-05-the-tax-is-paid-and-the-prohibition-is-walked-around.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | Body/Chaos: Bounty Hunter (`OGN-267`), Battle Mistress (`SFD-203`) or Voidreaver (`UNL-201`) |
| **First** | `SFD-142 Jae Medarda` (Chaos, E5 + 2 Power, M5) on the board, at your base is fine |
| **Then** | `SFD-114 Marching Orders` (Body, E3, [Repeat] E3), six Energy in all |
| **And** | at least one enemy unit at a battlefield |

The card text the play turns on:

- Jae Medarda: *"When you choose me with a spell, draw 1."*
- Marching Orders: *"[Action] (Play on your turn or in showdowns.) [Repeat] :rb_energy_3: (You may
  pay the additional cost to repeat this spell's effect.) Choose a friendly unit anywhere and an enemy
  unit at a battlefield. They deal damage equal to their Mights to each other."*

## 2. The order inside the one resolution

Three rules fix the sequence, and none of them is in the entry's steps.

1. **Both executions are chosen at casting.** 820.2: *"When a spell or ability’s effect is performed
   an additional time with Repeat, choices must be made at the usual time during the Make Relevant
   Choices step of Playing a Card."* So the second enemy is picked before the first trade happens; the
   second choice cannot react to the first. Choosing Jae both times is legal — 820.2.a: *"Choices made
   for the additional execution do not have to be the same as the choices made for the initial
   execution."*
2. **The draws resolve first.** Jae's clause is a Targeting Effect, and 383.4.b.2 places it *"on the
   Chain as Pending Items after a spell or ability that targets an appropriate Game Object is
   Finalized."* It sits above the spell, and 340.1 resolves the top: *"The newest Finalized Chain Item
   resolves."* Both cards are in your hand before a point of damage is dealt.
3. **Jae fights twice even if the first trade is lethal.** Damage kills in a Cleanup — 323.5: *"All
   Units that have LethalDamage marked on themare killed and placed in their owners' Trash."* — and
   321: *"Similarly, while Chain Items are Resolving, a Cleanup cannot occur."* So a Jae carrying five
   damage after the first execution is still on the board, still a legal target, and still deals his
   5 in the second. The entry's *"143.2.a kills Jae once the total marked damage reaches 5"* is true,
   but it decides whether Jae is alive **after** the spell, not whether the second trade happens.

That turns the entry's warning into a choice: pick two enemies whose Mights sum to 4 or less and Jae
survives both trades; pick bigger ones and he still kills both (anything up to Might 5), then dies in
the Cleanup. Either way the damage heals at the end of the turn if he lives — 143.3.b.1: *"At the end
of each player's turn."*

## 3. The turns, going first

Body/Chaos. The opponent holds the other battlefield, B, with small bodies, and contests A.

```
turn   runes   your turn                                                  at A
T1     2       Determined Sentry x2 (E1 each) at base                     —
T2     4       A Sentry walks to A, Conquer. 4 Energy of bodies at base.  Sentry
T3     6       Hold A: +1. Bodies walk to A.                              Sentry, bodies
               Jae at base: exhaust 5 runes for E5, recycle two of
               them (both Chaos) for the 2 Power (164.2.b). 4 remain.
T4     6       Hold A: +1. Marching Orders + Repeat: exhaust all six      same
               for E6. Choose Jae twice; choose two enemy bodies at B
               of Might 2 each. Draw, draw; Jae deals 5 to each, takes 4,
               survives. Both enemy bodies die.
```

The Power comes from runes already tapped for Energy, because 164.2.b's cost is the recycle and not
an exhaust: *"Recycle this: [Reaction] — Add [C]."* — and the recycled runes leave the board, 161.2.b:
*"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."* That is why T4 has six
runes and not eight, and six is exactly the Energy the spell and its Repeat ask for.

Jae never moves. He sits at the base, so every removal that says *"at a battlefield"* misses him, and
the trades happen outside combat, so no Attacker, no Defender and no damage step is involved.

## 4. Breaks to

**The draws cannot be stopped by countering the spell.** The two Targeting Effects are their own Chain
Items, placed when the spell is finalized. `OGN-045 Defy` (Calm, E1 + 1 Power, *"Counter a spell that
costs no more than :rb_energy_4: and no more than :rb_rune_rainbow:."*) reads Marching Orders' printed
E3 and counters it — the trades are gone and the six Energy are gone, 425.1.c: *"Countering does not
refund any costs paid to play a card, activate an ability, or trigger an ability."* — but the draws
above it still resolve. Defy turns the line into six Energy for two cards.

**A response on their own body costs them less.** `OGN-169 Gust` (Chaos, E1, [Reaction], *"Return a
unit at a battlefield with 3 :rb_might: or less to its owner's hand."*) on one of the chosen enemies
makes it an illegal target, and 359.3.e.5 then voids that trade: *"If any of the spell's targets are
no longer legal, those game objects, players, or zones are unaffected by the spell as it resolves. Any
instructions related to an illegal target can’t be followed."* One trade lost for E1; you still draw
two.

**The line breaks to `OGN-229 Vengeance`** (Order, E4 + 2 Power, *"Kill a unit."*) on Jae in the
opponent's T3 Main Phase, before you can cast Marching Orders. It names no location, so it reaches the
base. You lose E5 + 2 and the payoff card; Marching Orders is then a 3-Energy removal spell for one
trade with whatever friendly unit you choose.

## 5. Verdict

**One card and six Energy for two cards and two dead enemy bodies, from the base, on T4.** The order
is forced — both choices at casting, both draws before both trades, and the second trade fires even
if the first one was lethal to Jae — and every part of it favours you: a counter costs you the trades
but not the cards, and the only clean answer is a kill on Jae before you cast. It scores nothing; the
points are the contested Hold curve.

## 6. Not verified

I did not walk the [Action] use on the opponent's turn, a shell that plays Jae and the spell in one
turn, or 2v2. That choosing Jae twice fires *"When you choose me with a spell"* twice is the entry's
reading — 383.4.b.3 makes the trigger fire when he *"is Targeted"*, and 820.2.a's own example lets one
spell choose the same target twice — and I did not find a rule that settles it in so many words.

## Leads

- The entry's last step, *"Check the arithmetic before the second choice: 143.2.a kills Jae once the
  total marked damage reaches 5"*, reads as if the second execution could be lost. It cannot: 321
  holds the Cleanup until the spell has resolved, so Jae deals his 5 both times. The arithmetic decides
  only whether he survives.
- The entry does not say the draws resolve before the damage (383.4.b.2 + 340.1), nor that a counter on
  the spell leaves them standing. Both make the line safer than its notables suggest.
- The entry's steps name no answer. The cheapest clean one is `OGN-229 Vengeance` on Jae in the base
  (E4 + 2 Order); `OGN-045 Defy` (E1 + 1 Calm) only costs you the trades.
