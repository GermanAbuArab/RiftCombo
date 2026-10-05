# Play — each Svellsongur is worth exactly what the board is missing

Issue #248 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `nasus-svellsongur-conquer-burst`**, the mono-Calm BURST that puts three
`SFD-059 Svellsongur` on an Empowered `VEN-046 Nasus, Ascended` and scores nine points on one
Conquer. The turn clock reads it at **T6 against a T5 baseline**. Walked as the entry is written,
from zero points, it is **T7**: the clock cannot see Nasus's own [Empower] cost or the three
[Equip] costs. Walked as a game, with a free curve holding one battlefield beside it, it is **T6**
again, with one gear fewer — because every Svellsongur doubles the payoff, and the number of
doublings the line needs is set by the score it swings from, not by the entry.

**Why this line.** `scripts/sequence-pick.mjs` measures a queue: entries whose `steps` carry
forced-ordering language and whose `terminatesIn` is a bare quantity with no ordering word. Re-run
on 2026-10-05 at 771 entries it reads 262 with the language and **102 in the queue**, the same
numbers as slice 5. From here the pick is by global rank, skipping entries that already have a
play. This entry is rank 1 (three hits, *before* and *first*). Rank 2 is played in
[the Lab is paid before anything resolves](2026-10-05-the-lab-is-paid-before-anything-resolves.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Calm legend; both cards are mono-Calm and neither is a Signature card |
| **The payoff** | `VEN-046 Nasus, Ascended` (Calm, E8 + 1 Power, M8, [Deflect 2], [Empower] 8 Energy) |
| **The multiplier** | 3x `SFD-059 Svellsongur` (Calm gear, E3 + 1 Power, [Equip] 1 Energy + 1 Calm rune) in the entry; §4 plays two |
| **The free curve** | 2x `VEN-043 Steel Paws` (Calm, E1, M0) — not in the entry; §4 is built on it |
| **The counter** | `OGN-064 Wind Wall` (Calm, E3 + 2 Power, [Reaction]) — not in the entry; §6 |
| **Board it wants** | the contested one: you hold battlefield A, the opponent garrisons battlefield B |

Domain identity from `data/cards.json`: all five names are mono-Calm. None appears in
`data/legality.json`. Steel Paws carries no [Unique], so 103.2.b's three copies apply.

The card text the play turns on:

- Nasus, Ascended: *"[Empowered][>] When I conquer, you score 1 point."*
- Svellsongur: *"As this is attached to a unit, copy that unit's text to this Equipment's effect
  text for as long as this is attached to it."* The entry derives the composition from 434.1.c,
  477.2.c, 476.1, 479.1 and 480.3: v gears on one carrier are 2^v instances of his trigger.

**The open question, priced both ways.** OQ-SVELL-CAP, as recorded, is about a capped trigger:
383.3.e.1 reads *"Such a Triggered Ability will only be performed the specified number of times
each turn."* Nasus's trigger carries no *"the first time … each turn"*, so 383.3.e.1 never reaches
it, and the catalogue's settled arithmetic (`svellsongur-copy-hold`) gives 2^v instances. The
Draven play ([the fight it does not need to avoid](2026-09-25-the-fight-it-does-not-need-to-avoid.md))
priced the stricter reading, that eight identical appended sentences are ONE ability, for every
sentence including the uncapped one. So the two plays agree, every total here is given both ways:
**per instance** a Conquer pays 1 + 2^v; **per ability** it pays 2 whatever v is.

## 2. The turns as the entry is written, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of your Main Phase. A rune pays 1 Energy by exhausting
(164.2.a) and 1 Power by recycling (164.2.b, whose cost is the recycle, so an exhausted rune still
pays); the recycled rune goes to the Rune Deck (161.2.b), two come back each Channel Phase
(315.3.b), capped at twelve (161.2.a). The schedule below is the earliest a brute-force search over
every purchase order finds, with the two Steel Paws bought on T1 and nothing else spent on the side.

```
       R   your Main Phase                                    spent     idle
T1     2   2x Steel Paws                                       E2        E0
T2     4   (nothing in the line is affordable)                           E4
T3     6   (Nasus is E8)                                                 E6
T4     8   Nasus, Ascended                       (R -> 7)      E8+1P     E0
T5     9   Empower Nasus                                       E8        E1
T6    11   3x Svellsongur                        (R -> 8)      E9+3P     E2
T7    10   3x [Equip] on Nasus                   (R -> 7)      E3+3P     E7
           Nasus walks to B; Conquer: 1 + 8 instances = 9
```

That is **T7**, not the clock's T6. The 28 Energy and 7 Calm Power in the entry's `terminatesIn`
are right; the clock prices 17 Energy and 4 Power, because Nasus's [Empower] 8 and the three
[Equip]s are activated abilities on cards already in play, not printed costs. Gear bought on the
swing turn itself instead of T6 is the same T7 and uses all twelve runes.

## 3. The order the entry forces

**Empower and all three Equips come before the move, in that Main Phase or earlier — never after.**
Both are Activated Abilities with no keyword (818.1 for [Equip]; Empower is printed as
*"[Empower] :rb_energy_8: (:rb_energy_8:: Empower me. Use only if not Empowered.)"*). Once Nasus
moves, the next Cleanup opens a Showdown at B — a Combat if a garrison stands there, 344.2's
Showdown if it does not — and 308.1.a closes it to both: *"Only cards and abilities with the Action
or Reaction keywords can be played or activated in a Showdown State."*

The two reorders cost different amounts, and the cheaper-looking one is the disaster:

- **Equip after the move** and the three gears copy nothing. The Conquer pays **1 + 1 = 2**.
- **Empower after the move** and every one of the eight copies reads *"[Empowered][>]"* on a carrier
  that is not Empowered. The Conquer pays **1**: the Score alone, eight gears' worth of text
  inactive. Per ability it is the same 1.

The schedule in §2 empowers on T5 rather than T7 for exactly this reason: it costs nothing (Nasus
sits at base, and 441.1.b makes the state permanent) and it moves the 8 Energy off the turn where
the Equips, the move and §6's counter all want it.

## 4. The gear count is the deficit

The entry swings from zero, so it needs 1 + 2^v ≥ 8, i.e. v = 3. **On the contested board the deck
does not swing from zero.** Two Steel Paws cost 2 Energy on T1, one walks into empty A on T2 and
Conquers it, and it Holds A every turn after (315.2.b.2). By the start of the T6 swing the deck has
**5** points, so the Conquer has to pay 3, and **one Svellsongur is enough**: 1 + 2 = 3.

The same brute-force search, with v as a variable:

| gears | earliest swing | Conquer pays (per instance / per ability) | score after the swing |
|---|---|---|---|
| 0 | T5 | 2 / 2 | 4 + 2 = 6 |
| 1 | T6 | 3 / 2 | 5 + 3 = **8** / 7 |
| 2 | T6 | 5 / 2 | 5 + 5 = **10** / 7 |
| 3 | T7 | 9 / 2 | 6 + 9 = **15** / 8 |

**Two gears is the build**, not one: it lands on the same T6, and its spare doubling is exactly the
insurance §6 prices — one gear answered still leaves 5 + 3 = 8. The third gear costs a whole turn
and buys points the game no longer needs. So the T6 turn reads:

```
       R   your Main Phase                                    spent     idle   score
T6    11   2x Svellsongur, 2x [Equip] on Nasus   (R -> 7)      E8+4P     E3     5 (Hold A)
           Nasus walks to B; Wind Wall held open (E3+2P)
           Conquer: 1 + 4 instances                                          +5 = 10  WIN
```

Wind Wall's 3 Energy is the idle 3, and its 2 Calm Power fit: 11 runes pay 11 Energy and up to 11
Power in one turn if every rune is exhausted before any is recycled.

**Per ability** the swing pays 2 whatever the gear, the score is 7 after T6, and the next Hold
makes it 8 on **T7** — the gear did nothing and the free curve won. That is the conclusion that
survives both readings: this deck reaches eight by T7 either way, and by T6 under the catalogue's.

**Priced against the clocks**: Calm's unopposed curve is **T5** (Steel Paws is the cheapest unit in
the pool), the contested curve is **T9**. T6 is one turn slower than the board where nothing was
needed and three faster than the board it is for. The entry as written, from zero, is T7.

## 5. The fight at B

On the contested board B is garrisoned, so the move stages a Combat (323.9), not 344.2's bloodless
Showdown. 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal to
their summed Might among the other's Units."* Nasus is Might 8 and the Svellsongur add +0:

| garrison's summed Might | result |
|---|---|
| 1 to 7 | his 8 kills every defender, theirs does not kill him; you are the only player with units (466.3.a), 466.5.d makes it a Conquer, the triggers fire |
| 8 or more | Nasus dies; 719.5 — *"When a Top-Most Card changes zones from a board zone to a non-board zone, all Attached cards Detach from it, remaining in their current zones."* — and there is no Conquer at all |

So the line does not need its removal package against a small garrison, and it does need one
against a garrison of 8. [Deflect 2] copied eight times sums to 16 (809.2), which keeps every
targeted answer off Nasus once the gears are on; it does nothing for him in a damage step.

## 6. Breaks to

**A garrison of summed Might 8 at B** breaks it for no card at all — the opponent simply has to
already be standing there. Nothing in the five-card list moves a body off a battlefield.

The cheapest CARD is **`OGN-022 Thermo Beam`** — Fury, E5 + 2 Power, *"[Action] (Play on your turn
or in showdowns.) Kill all gear."* Cast in the Showdown the move opens, it takes both Svellsongur:
the Conquer pays 1 + 1 = 2 and the deck stops at **7**, one short, with the turn spent. It costs
5 Energy and 2 Fury Power and nothing else; 718.5.b — *"Attached cards still can be chosen or
targeted by game effects while Attached"* — is not even needed, since it chooses nothing.

**Wind Wall counters it**, and only Wind Wall does: `OGN-045 Defy` stops at *"a spell that costs no
more than :rb_energy_4: and no more than :rb_rune_rainbow:"*, and Thermo Beam is E5 + 2. That is
why §4's T6 turn keeps E3 + 2 Calm Power idle rather than spending it.

The single-gear answers only halve the burst, and two gears absorb them:
`SFD-011 Angle Shot` (Fury, E2, [Reaction]) can choose a Steel Paws and a Svellsongur — same
controller, and the Paws' [Deflect] costs one rainbow instead of Nasus's sixteen — and *"Attach that
Equipment to that unit"*, moving one gear off Nasus (434.1.f). Two gears become one: 5 + 3 = 8,
still a win. `SFD-005 Detonate` cannot be cast at all in time, because the gear does not exist until
the swing turn and Detonate carries no [Action].

## 7. Verdict

**The entry is right at nine, and its gear count is a fact about a board with no score on it.**
Each Svellsongur doubles the payoff, so its value is exactly how far the swing has to carry. With a
free curve holding one battlefield the swing carries three, two gears do it with one to spare, and
the line lands on **T6 for ten** instead of T7 for nine — with Wind Wall open against the one card
that answers both gears at once.

**The ordering to remember is the Empower, not the Equips.** Equipping late costs seven points;
empowering late costs eight, and Empowering is the step a player is most likely to leave for the
swing turn because it is the one that feels like setup.

## 8. Not verified

Per ability (OQ-SVELL-CAP read strictly) the gears are dead and the deck wins on T7 off the free
curve; I did not walk that deck without them. I assumed perfect draws, and that the runes arrive in
the domains the costs want (108.5.d keeps the Rune Deck's order secret): the T6 turn recycles six
Calm runes. I did not walk the opponent removing Nasus at base on their T4 or T5, where he carries
only his printed [Deflect 2], nor the one damage that removes a Might-0 Steel Paws from A.

## Leads

- The clock prices this row at T6; walked from zero it is T7. The clock omits Nasus's [Empower] 8
  and the three [Equip] costs — 11 Energy and 3 Power that sit on activated abilities, not on
  printed costs.
- The entry's steps say *"ON THE TURN YOU SWING, and not before: attach"* but never say the Empower
  must precede the move. A notable that 308.1.a bars an Empower in the Showdown, and that a late
  Empower leaves all eight copies inactive for a one-point Conquer, would carry §3.
- `OGN-064 Wind Wall` is the only counter in the identity that reaches `OGN-022 Thermo Beam` (Defy's
  ceiling is E4 and one rainbow). The entry names Thermo Beam as the answer and no counter to it.
- Nasus Might 8 against the garrison: the entry's *"a garrison of summed Might 8 or more kills him"*
  is right; the converse, that any garrison of summed Might 7 or less dies with no removal at all,
  would let a reader leave the removal package out of a small-garrison matchup.
