# Play — the faucet is also the landing pad, so the second Protector is the protection

Issue #256 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `poppy-hunt-xp-discount`**, the mono-Order ENGINE in which `UNL-162 Enthralling
Protector`'s [Hunt] banks XP on every Score and `UNL-178 Poppy, Defender of the Meek` turns three of
it into three Energy off a 5-Might [Tank] played at Reaction speed. The entry prices the exchange
rate correctly. Walked as a game, the card that mints the XP is also the only thing that lets Poppy
arrive at Reaction speed at all, so the opponent's cheapest answer is not to Poppy but to the
Protector, before they attack — and a second Protector is worth more as a second landing pad than as
a second faucet.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `2374ce6`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 85 of them with no play**.
The pick is by global rank, skipping entries that already have a play: this entry is rank 13 (two
hits on *before*), first in the list. The other entry of this slice is rank 14, played in
[both executions are chosen when you cast it](2026-10-05-both-executions-are-chosen-at-casting.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Order in its pair (103.1.b) |
| **The faucet** | `UNL-162 Enthralling Protector` (Order, E2, M2), standing at a battlefield you control |
| **The payoff** | `UNL-178 Poppy, Defender of the Meek` (Order, E6 + 1 Power, M5), in hand |
| **Banked** | 3 XP before the opponent attacks, and E3 + 1 Order Power left ready on their turn |

The card text the play turns on:

- Enthralling Protector: *"[Hunt] (When I conquer or hold, gain 1 XP.) Spend 2 XP: [Buff] me. (Give
  me a +1 :rb_might: buff if I don't have one.)"*
- Poppy: *"You may spend 3 XP as an additional cost to play me. If you do, I cost :rb_energy_3: less.
  [Ambush] (You may play me as a [Reaction] to a battlefield where you have units.) [Tank] (I must be
  assigned combat damage first.)"*

## 2. Where Poppy is allowed to land

[Ambush] is two permissions bundled together — 822.1.b: *"It is functionally short for "I may be
played to a battlefield where you control Units" and “I have [Reaction] as long as I’m being played
to a battlefield where you control Units.”"* Off the opponent's turn she is a Reaction card **only**
where you already have a body. And the body has to still be there when she finishes being played —
822.3: *"If there are no units at the location chosen before Finalization completes for any reason,
then it is no longer a valid location by Ambush’s reasoning and cannot be played there"*.

In this two-card line the only body that can be there is the Protector. So the same card is the XP
faucet **and** the landing pad, and losing it before the attack loses both.

The XP side is per unit. 823.1.c.1: *"Hunt is functionally short for: “When I Conquer or Hold, my
controller gains X XP.”"* Two Protectors at one battlefield each gain 1 on every Hold — 315.2.b.2:
*"1. The Turn Player Holds all Battlefields they Control."* — and XP spent is simply gone, 730.2:
*"To Spend XP, reduce the value of XP marked on the Player spending it."*

## 3. The turns, going first

Mono-Order, a curve of 2-Energy bodies. The opponent is building a board on the other battlefield and
holding cheap removal. Mana for a Reaction on their turn has to be **left** on yours — 415.3.a:
*"A player Readies all non-spell Game Objects they Control during the Awakening Phase on their
turn."*

```
turn   runes   your turn                                               XP    held for their turn
T1     2       Protector #1                                            0     -
T2     4       Protector #2; walk #1 to battlefield A, Conquer         1     2 runes
               (Hunt fires once)
T3     6       Hold A (#1 there): +1; walk #2 to A                      2     6 runes = full-price
                                                                               Poppy, E6 + 1 Order
T4     8       Hold A (#1 and #2 there): +2                             4     4 runes = Poppy at
               spend 4 on your turn (another body)                            E3 + 1 Order after
                                                                              spending 3 XP
```

- **T3 is the honest comparison.** With six runes held, Poppy is already castable at Reaction speed
  at full price: exhaust six for E6, recycle one already-exhausted Order rune for the Power
  (164.2.b, *"Recycle this: [Reaction] — Add [C]."*). The XP does not make her possible; it makes
  her **three Energy cheaper on the turn you would rather spend four on your own board**.
- **The discount lands T4 at the earliest on one battlefield.** It lands T3 only if battlefield B is
  also open on T3, so that #2 walks there and Conquers for its own +1 — against an opponent holding
  B, that walk is an attack into their garrison and does not happen.
- **Do not spend the Protector's own 2 XP first.** "Spend 2 XP: [Buff] me" leaves 2 of 4 on T4 and
  Poppy needs 3; after T5's Hold (+2) you are back at 4. The buff is one turn of Poppy delayed.

## 4. Breaks to

**Kill the garrison in their Main Phase, then attack.** If the opponent removes every unit you have at
A **before** they move in, there is no battlefield where you control units and Poppy has no Reaction
window at all (822.1.b, 822.3); their walk-in then meets nobody. On a one-Protector board the
cheapest kill is `OGS-003 Incinerate` — Fury, E2, *"[Action] (Play on your turn or in showdowns.)
Deal 2 to a unit at a battlefield."* — or `SFD-162 Blood Money` in Order, E2, *"Kill a unit at a
battlefield with 2 :rb_might: or less."* The faucet stops with it; the XP already banked stays
(730.2 removes XP only when you spend it).

**This is why the second Protector is the protection.** With both at A, one removal leaves a body
standing and Poppy still has her landing pad; the opponent needs two cards, or one that hits both.
Buffing a lone Protector to Might 3 instead lifts it out of Incinerate and Blood Money but not out of
`OGN-009 Hextech Ray` (Fury, E1 + 1 Power, *"Deal 3 to a unit at a battlefield."*) or `UNL-159 Soul
Harvest` (Order, E2 + 1 Power, *"Kill a unit at a battlefield with 3 :rb_might: or less."*), and it
costs the 2 XP Poppy wanted.

**Once she lands there is no counter.** She is a unit, and 337.2 resolves a unit the moment it is
finalized: *"If, after finalizing the Chain Item, that item is a Unit, Gear, or an ability that Adds
resources, it resolves immediately—Move to Step 4: Resolve."* The answer to a 5-Might Tank is a
full-price kill on a later turn, `OGN-229 Vengeance` (Order, E4 + 2 Power, *"Kill a unit."*).

**Or they do not attack A.** Then Poppy waits in hand, and the held runes bought nothing that turn.
She can still be played on your own turn to A or your base, but then the [Reaction] half of [Ambush]
was never used.

## 5. Verdict

**The rate is right and the risk is in the other card.** Three Scores buy three Energy off Poppy, but
the Protector that mints them is also the only legal landing pad for her Reaction-speed arrival, so
the opponent answers the line for E2 by killing a 2-Might body in their own Main Phase before they
attack. Play the second Protector to the **same** battlefield: it doubles the faucet (+2 per Hold) and,
more importantly, makes the landing pad survive one removal spell.

**It scores nothing:** a 5-Might [Tank] at Reaction speed for E3 + 1 Order Power from T4, against
E6 + 1 the turn before. It breaks to `OGS-003 Incinerate` or `SFD-162 Blood Money` for E2 on a lone
Protector, and needs two such cards once both Protectors stand at the same battlefield.

## 6. Not verified

I did not walk the line with `UNL-151 Bandle Soldier` in the list (the entry already names the
824.1.d anti-synergy), a combat in which the opponent attacks with more than one unit, or 2v2.

## Leads

- The entry never times the faucet. One Protector on one battlefield reaches 3 XP at the T4 Hold
  (Conquer T2, Holds T3 and T4); the discount is not available before that, and on T3 six held runes
  already pay Poppy at full price.
- Step 3 reads *"When an opponent attacks a battlefield where you have units"*, which assumes the
  units are still there. The opponent can remove the garrison first in their Main Phase and attack an
  empty battlefield, leaving no Ambush location (822.1.b, 822.3).
- The entry's `uses` lists three Protectors but its prose prices only the XP. A second Protector at
  the same battlefield is the line's protection against that removal, which no notable states.
