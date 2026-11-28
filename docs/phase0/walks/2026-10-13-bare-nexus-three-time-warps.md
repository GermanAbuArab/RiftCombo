# The bare Power Nexus + two Blue Sentinels + three Time Warps line, and R1's rune table (#338)

**Verdict: the line reaches 8, and it is promoted as a `candidate` CHAIN,
`power-nexus-sentinel-three-time-warps`.** Power Nexus, two Blue Sentinels and three Time Warps reach
8 across four consecutive turns of one player from **ten** runes on the board, with no Renata, no Gold
and no Hextech Anomaly. Every Nexus firing is paid by recycling four runes. Ten is the threshold:
nine reaches 7, and twelve still reaches only 8. Refusal R1 (`2026-09-06-engine-payoff-walk.md` §1.1)
prices **one** Warp, where the same cards reach 5. Its conclusion stands for one Warp. Its table put
14 runes on a board that holds 12, which is corrected there with a dated note (§6 below).

Walked 2026-10-13 by impl-riftcombo-338, from the lead that `2026-10-13-b3-renata-time-warp-anomaly.md`
§8 reported. Card text is from `data/corpus_flat.txt` and rules text from
`data/Riftbound-Core-Rules-2026-07-16.txt`, both pasted. The second instrument is
`scripts/b3-ledger-search.mjs`, an exhaustive search over every legal spend in every turn of the
window. Its output is pasted in §4. The hand ledger (§3.2) and the bound (§3.1) were written before
the plan printout was added to that script.

## 1. The cards, pasted

- `SFD-214 Power Nexus`, battlefield, colourless: "When you hold here, you may pay :rb_rune_rainbow::rb_rune_rainbow::rb_rune_rainbow::rb_rune_rainbow: to score 1 point."
- `UNL-087 Blue Sentinel`, Mind unit, E4 P1 M4: "[Shield 2] (+2 :rb_might: while I'm a defender.) Your hold effects for holding here trigger an additional time. When I hold, [Add] :rb_rune_rainbow: at the start of your next Main Phase. (Abilities that add resources can't be reacted to.)"
- `OGN-122 Time Warp`, Mind spell, E10 P4: "Take a turn after this one. Banish this."

None of the three is banned, restricted or Signature: `data/legality.src.json` has no row touching
SFD-214, UNL-087 or OGN-122, and `signature` is `false` on all three in `data/cards.json` (checked
2026-10-13). Blue Sentinel and Time Warp are Mind and Power Nexus is colourless, so any legend with
Mind in its identity runs the line.

## 2. The rules the ledger runs on, pasted

The rules are the ones `2026-10-13-b3-renata-time-warp-anomaly.md` §3 pastes, minus Renata's and
Anomaly's. They are pasted again here so this walk stands on its own.

**The extra turns.** 735: *"Certain Game Effects will instruct a player to “take a turn after this.” These effects create a temporary Additional Turn owned by that player that is inserted into the turn queue after the current turn."*
737: *"When an Additional Turn is inserted into this queue, it does not change the Turn Order of the game. The owner of the Additional Turn just has the next queued turn. After that turn is completed, it will be removed and the queue will proceed with its previously queued turns."*
103.2.b: *"Your Main Deck can include up to 3 copies of the same named card."* Time Warp banishes
itself, so three copies give three Additional Turns at most: four consecutive turns, one Warp cast in
each of the first three.

**Each turn's start.** 315.1.b: *"1. The Turn Player readies all Game Objects they control that are able to be readied."*
469.2: *"Hold: A player maintains Control of a Battlefield they did not yet Score this turn during their Beginning Phase."*
471.1: *"The player Gains up to one Point, depending on their current score."*
471.2.b: *"Hold abilities trigger at a Battlefield that was Held."* With two Sentinels every hold effect
at the Nexus fires 1 + 2 = 3 times, the Sentinels' own Add included: R1 = A on issue #11, backed by
RiftJudge Q10155, which every Sentinel entry cites.

**Runes.** 161.2.a: *"Exactly 12 Rune cards chosen during Deck Construction."*
161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."*
315.3.b: *"1. The Turn Player channels 2 runes from their Rune Deck."*
315.3.b.1: *"If there are fewer than 2 runes in the Rune Deck, they channel as many as possible."*
430.2.a: *"By default, runes are channeled readied."* Each Basic Rune has 164.2.a `[E]: [Reaction] — Add [1].`
and 164.2.b `Recycle this: [Reaction] — Add [C].`, and 164.2.b.1: *"The Power added this way corresponds to the Domain of the Rune that is being Recycled."*

**Paying the Nexus in the Beginning Phase.** 204.3.a: *"When Costs within Instructions appear as the first part of the effect in triggered abilities, the cost is taken to be the base cost of the triggered ability. It must be paid to finalize the triggered ability."*
383.3.b.1: *"The cost must be paid in order to finalize the Triggered Ability to the Chain."*
444.2.c: *"Players may activate abilities that Add resources with the Reaction keyword at any time that they are instructed to Pay resources. Those abilities finalize and resolve immediately, ignoring normal restrictions."*
135.2.e.5.a: *"When required as a cost, [A] can be paid by Power of any Domain."* So each firing costs
four rune recycles, of any domain. That is the route `power-nexus-rune-recycle-any-identity` walks.

**The pool, and the Power for Time Warp.** 167: *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of each player's turn."*
316.3: *"1. Each player's Rune Pool empties. Any unspent Energy and Power are lost."*
316.4: *"2. At the start of Main Phase game effects take place."*
135.2.e.5.b: *"When Added to a player’s Rune Pool, [A] can be spent to pay a Power cost of any Domain."*
So the six rainbow the Sentinels queue land after the sweep, and four of them pay each Warp's four
Mind Power. A Warp therefore costs ten runes exhausted for Energy and no recycle. Energy made in the
Beginning Phase would be swept, so the Beginning Phase spends recycles only.

**The points.** 470: *"A player may only Score, from either method, once per Battlefield per turn."*
That caps the Hold at one point a turn. The Nexus points are ability Gains (R2 = A), 194.1.c: *"Spells, Triggered Abilities and Activated Abilities that instruct them to gain one or more points."*
471.1.a.1: *"Notably, points Gained from sources that are not Conquer are not beholden to these restrictions."*
472: *"When a cleanup occurs and a player has accrued Points greater than or equal to the Victory Score for their Mode of Play, and if they have more points than any opponent, they Win the Game."*
194.3: *"The Victory Score is 8 points by default."*

## 3. The ledger, by hand

Notation: `b_t` is the number of runes on the board at turn `t`'s Awaken, and the Rune Deck holds
`12 − b_t`. `n_t` is the number of Nexus firings paid on turn `t`. Every turn is a Hold (+1), and the
six rainbow arrive in every Main Phase.

### 3.1 The bound: ten runes is the threshold

The Beginning Phase comes before the Channel Phase, so turn `t`'s firings are paid from `b_t` alone.
Turn `t`'s Main Phase then has `b_t − 4n_t + c_t` runes, where `c_t ≤ 2` is what the channel brings
back. On each of the three Warp turns that must be at least 10. Nothing else recycles a rune, so that
Main Phase board is next turn's `b_{t+1}`. Summing over the three Warp turns:

`b_4 = b_1 + (c_1 + c_2 + c_3) − 4(n_1 + n_2 + n_3) ≤ b_1 + 6 − 4(n_1 + n_2 + n_3)`

and T4's firings are paid from `b_4`, so `4 n_4 ≤ b_4`. Together:

`4 × (all firings) ≤ b_1 + 6`, so **firings ≤ floor((b_1 + 6) / 4)**.

The window scores four Holds, so 8 needs four firings, which needs `b_1 + 6 ≥ 16`: **ten runes.** From
nine, the bound is three firings and **7**. From twelve, it is `floor(18/4) = 4` and **8, not 9**. The
bound counts runes only, so a Power-to-Energy conversion such as `SFD-083 Hextech Anomaly` cannot
move it. Anomaly lowers a Warp turn's board requirement from 10 to 8, but not the number of runes the
window can recycle. The search agrees (§4, the Anomaly row: ten again).

The same bound with one Warp is R1: only T1 has a channel before the last Beginning Phase, so
firings ≤ `floor((b_1 + 2) / 4) ≤ floor(14/4) = 3`, plus two Holds: **5**. With two Warps it is
`floor((b_1 + 4) / 4) ≤ 4` firings plus three Holds: **7** from a full board. The search prints 7 for
two Warps too (§4, last row). So the third Warp is the one that makes the bare line close.

### 3.2 The ledger from ten runes (two in the Rune Deck)

| turn | Beginning Phase | channel | Main Phase | board after | points |
|---|---|---|---|---|---|
| T1 | Hold +1. Nexus ×3 declined. | 10 → 12 (deck 0) | Exhaust 10 of 12 for Energy. Time Warp = 10 Energy + 4 of the 6 rainbow. | 12 | 1 |
| T2 | Hold +1. Recycle 4 to pay one Nexus firing: +1. Board 8, deck 4. | 8 → 10 (deck 2) | Exhaust all 10. Time Warp again. | 10 | 3 |
| T3 | Hold +1. Nexus declined. | 10 → 12 (deck 0) | Exhaust 10 of 12. Time Warp, the last copy. | 12 | 4 |
| T4 | Hold +1. Recycle all 12 to pay three Nexus firings: +3. Board 0, deck 12. | 0 → 2 | Nothing to cast. | 2 | **8** |

Each Nexus firing is paid as it finalizes (204.3.a, 383.3.b.1) by recycling four runes at the
instruction to pay (444.2.c). Every rune is ready at that moment (315.1.b), though 164.2.b does not
need it to be. The eighth point is T4's third Nexus firing, an ability Gain: 471.1.a.1 keeps it clear
of the Final Point clause, and 472 ends the game at the next cleanup.

**The order of the firings is not free.** The Nexus must be paid on turns where the Rune Deck would
otherwise be empty, so that the channel brings two runes back instead of nothing (315.3.b.1). Paying
T3 instead of T2 wastes T2's channel: T2 channels nothing from an empty deck, and the line ends at 7.
The bound allows at most one firing on each Warp turn (`4n_t ≤ b_t + 2 − 10 ≤ 4`), so there are
eight placements across T1–T3. Enumerated from ten runes, only one reaches 8: a single firing on T2,
then three on T4. That is the plan above, and the one the search prints. From twelve runes three
placements reach 8: T2 alone, T1 alone, and T1 with T3.

For example, a twelve-rune start reaches 8 by T1 paying one firing (12 → 8, channel to 10, Warp), T2
none (10 → 12), T3 one (12 → 8 → 10) and T4 two. That is 4 + 4 = 8 again, which is the bound.

### 3.3 What the bare line is not

It is not a version of `power-nexus-atlas-sentinel-time-warp`. That entry needs one Warp, because two
World Atlases mint twelve Gold a Hold and pay all three firings every turn without touching a rune.
This one needs three Warps and pays only four firings in four turns, all with runes. It is not a
version of `power-nexus-sentinel-renata-time-warp-chain` either. That entry's Renata adds a fifth
paid point source on the last turn, which lowers the threshold to eight runes. Seen from this line,
Renata is worth two runes of threshold, and Anomaly two more on top of her, because her point is paid
in Energy and Mind Power rather than out of the firing budget.

## 4. The second instrument: `node scripts/b3-ledger-search.mjs`

The search was written for #335 (`2026-10-13-b3-renata-time-warp-anomaly.md` §5). For #338 it gained
three things: it prints the plan for the bare three-Warp line, and it has two more bare rows, one
with two Warps and one under R1 = B. Its model is unchanged, and it still reproduces refusal R1's hand result of 5 before printing anything
else, exiting if it cannot. Output, 2026-10-13:

```
non-vacuity: R1 control best 5, hand walk says 5
control: R1, Nexus + Sentinels + ONE Time Warp
  points by starting board 0..12: 1 1 1 1 2 2 2 2 4 4 5 5 5
  smallest board reaching 8: none
B3 as refused: Nexus + Sentinels + Renata + 3 Time Warp
  points by starting board 0..12: 1 1 2 2 2 2 3 3 8 8 8 8 9
  smallest board reaching 8: 8
    T1 {"board":8,"nexus":0,"channelled":2,"mainBoard":10,"timeWarps":1,"renata":0,"anomaly":0,"recycled":0,"points":1}
    T2 {"board":10,"nexus":0,"channelled":2,"mainBoard":12,"timeWarps":1,"renata":0,"anomaly":0,"recycled":0,"points":1}
    T3 {"board":12,"nexus":1,"channelled":2,"mainBoard":10,"timeWarps":1,"renata":0,"anomaly":0,"recycled":0,"points":2}
    T4 {"board":10,"nexus":2,"channelled":2,"mainBoard":4,"timeWarps":0,"renata":1,"anomaly":0,"recycled":0,"points":4}
B3 + Hextech Anomaly
  points by starting board 0..12: 2 2 3 4 6 7 8 8 8 8 9 9 9
  smallest board reaching 8: 6
    T1 {"board":6,"nexus":0,"channelled":2,"mainBoard":8,"timeWarps":1,"renata":0,"anomaly":2,"recycled":0,"points":1}
    T2 {"board":8,"nexus":0,"channelled":2,"mainBoard":10,"timeWarps":1,"renata":0,"anomaly":0,"recycled":0,"points":1}
    T3 {"board":10,"nexus":0,"channelled":2,"mainBoard":12,"timeWarps":1,"renata":0,"anomaly":0,"recycled":0,"points":1}
    T4 {"board":12,"nexus":3,"channelled":2,"mainBoard":2,"timeWarps":0,"renata":1,"anomaly":2,"recycled":0,"points":5}
B3 + Anomaly, Nexus never paid (the refusal's model)
  points by starting board 0..12: 2 2 3 4 5 6 6 7 7 7 7 7 7
  smallest board reaching 8: none
B3, two Time Warps
  points by starting board 0..12: 1 1 2 2 2 2 3 3 6 6 7 7 7
  smallest board reaching 8: none
B3 + Anomaly, two Time Warps
  points by starting board 0..12: 2 2 3 4 5 6 6 6 7 7 7 7 8
  smallest board reaching 8: 12
B3 if the Sentinels did NOT stack (R1 = B): 1 firing, 2 rainbow
  points by starting board 0..12: 1 1 2 2 2 2 3 3 6 6 6 6 7
  smallest board reaching 8: none
B3 + Anomaly if the Sentinels did NOT stack (R1 = B)
  points by starting board 0..12: 1 2 2 2 2 3 3 4 6 6 6 6 7
  smallest board reaching 8: none
no Renata: Nexus + Sentinels + 3 Time Warp
  points by starting board 0..12: 1 1 1 1 2 2 2 2 7 7 8 8 8
  smallest board reaching 8: 10
    T1 {"board":10,"nexus":0,"channelled":2,"mainBoard":12,"timeWarps":1,"renata":0,"anomaly":0,"recycled":0,"points":1}
    T2 {"board":12,"nexus":1,"channelled":2,"mainBoard":10,"timeWarps":1,"renata":0,"anomaly":0,"recycled":0,"points":2}
    T3 {"board":10,"nexus":0,"channelled":2,"mainBoard":12,"timeWarps":1,"renata":0,"anomaly":0,"recycled":0,"points":1}
    T4 {"board":12,"nexus":3,"channelled":2,"mainBoard":2,"timeWarps":0,"renata":0,"anomaly":0,"recycled":0,"points":4}
no Renata: Nexus + Sentinels + Anomaly + 3 Time Warp
  points by starting board 0..12: 1 1 2 3 5 6 7 7 7 7 8 8 8
  smallest board reaching 8: 10
no Renata: Nexus + Sentinels + 2 Time Warp
  points by starting board 0..12: 1 1 1 1 2 2 2 2 6 6 6 6 7
  smallest board reaching 8: none
no Renata, 3 Time Warp, if the Sentinels did NOT stack (R1 = B)
  points by starting board 0..12: 1 1 1 1 2 2 2 2 5 5 5 5 6
  smallest board reaching 8: none
```

The plan printed under "no Renata: Nexus + Sentinels + 3 Time Warp" is the §3.2 table, turn for turn.
The row's thresholds match §3.1's bound at every board: 7 from eight and nine runes, 8 from ten to
twelve, and never 9. The two-Warp row tops out at 7, as the bound says. Under R1 = B the Nexus
fires once a Hold and the Sentinels add two rainbow, so every Warp also costs two recycles for its
Power. Four firings and three Warps would then need `16 + 6 = 22` recycles against the bound's
`b_1 + 6 ≤ 18`, and the last row confirms it: **6** at best. **The entry stands on R1 = A**, as every
Nexus-Sentinel entry does.

## 5. When it fires

The clock's conventions apply: perfect draws and a passive opponent. Runes on the board at turn `t`'s
Awaken are `2(t − 1)` on the play. On the draw, 485.7 adds one: *"First Turn Process: The player going second channels an extra Rune from their Rune Deck during their first Channel Phase of the game."*
Every recycle spent on a Power cost before the window subtracts one more. The Sentinel's one Mind
Power has no source but a recycle until a Sentinel has Held.

- **On the play:** T2 Sentinel to base (E4, recycle 1). T3 move it onto the Nexus to take control
  (190.3.a.1, 190.4, as `2026-10-13-b3-renata-time-warp-anomaly.md` §6 walks it). T4 Hold with one
  Sentinel; its two rainbow pay the second Sentinel's Power, played straight onto the Nexus (355.2.a).
  One recycle in all, so the window needs `2(t − 1) − 1 ≥ 10`: **T7.**
- **On the draw:** the same sequence, and `2(t − 1) + 1 − 1 ≥ 10` gives **T6.**

`power-nexus-sentinel-renata-time-warp-chain` runs at T6 on the play and T5 on the draw without
Anomaly, so Renata buys one turn either way. The do-nothing Hold curve in a Mind identity without
Body or Calm is T6 unopposed and T9 contested (`scripts/adversarial-check.mjs`, `baselineTurn` and
`CONTESTED_BASELINE`). So this line is one turn slower than the unopposed curve on the play, level
with it on the draw, and faster than the contested curve either way. The Holds of the waiting turns before the window also score, and are not
counted here, which is the catalogue's convention for a CHAIN.

`npm run adversarial -- --turns` prints this entry at **T11**, the same as the Renata version. As
`2026-10-13-b3-renata-time-warp-anomaly.md` §6 explains, that clock charges all three Warps (30
Energy) to the rune curve before the chain and prices no Add. So the T11 is a property of the
instrument, not of the line, and changing the clock is outside this issue.

[2026-10-13, #339: with Adds and Additional Turns modelled, the clock prints this entry at **T6**, one under this walk's T7. It still prices no Nexus firing, and the T7 is what the sixteen firing recycles cost. `test/turn-clock.test.ts` holds it at or under T7.]

## 6. R1's table: the 14 runes

R1's table (`2026-09-06-engine-payoff-walk.md` §1.1) gives "14" runes for T1's Main Phase when `r₁ = 0`,
and "3 (12 of 14)" for T2. 161.2.a: *"Exactly 12 Rune cards chosen during Deck Construction."* A
board of twelve leaves the Rune Deck empty, so T1's channel adds nothing (315.3.b.1). T1's Main Phase
has 12 runes, and T2 pays three firings with all 12. The total is still 1 + 0 + 1 + 3 = **5**. The
prose above the table states `12 + 2 = 14` as the Power budget. That is right as an upper bound,
because the two channelled runes can only be reached by recycling four first, but no single board
holds 14. The search's R1 control reproduces 5 from ten, eleven and twelve runes. The table is
corrected in place, with a dated note under it.

## 7. What it assumes, and what answers it

- Power Nexus is the battlefield in play. 485.5: *"Setup: Each player randomly selects one (1) of their three (3) Battlefields. The other two are removed and will not be used for this game. The selected Battlefields are placed simultaneously in the Battlefield Zone."*
  So it is 1 of your 3. Both Sentinels must still stand on it when the first turn's Beginning Phase
  Holds it, which means they survived the opponent's turn before.
- All three Time Warps in hand by the turn each is cast. The Additional Turns' own Draw Phases help,
  and the Main Deck must not run out at any of them (315.4.b.1, 431).
- **The opponent takes no turn inside the window but can act inside yours.** 359.3.c: *"Other players have an opportunity to play Reactions before the resolution of spells."*
  425.1.c: *"Countering does not refund any costs paid to play a card, activate an ability, or trigger an ability."*
  Each Warp is E10 + 4 Power spent before a counter resolves. A countered Warp on T1–T3 ends the
  window. `time-warp-hold-burst` names the pool's counters that reach it.
- The line has no slack. Ten runes and four firings are the bound exactly, so losing one rune (a
  Power cost paid by recycle before the window, or one wasted channel) drops it to 7.

## 8. Disposition

1. **Promoted as `candidate`:** `power-nexus-sentinel-three-time-warps` in `data/combos.json`, CHAIN.
   Its `uses` are Power Nexus, two Blue Sentinels and three Time Warps. `verified` needs a second,
   independent walk.
2. **R1's table** in `2026-09-06-engine-payoff-walk.md` §1.1 is corrected, with a dated 161.2.a note.
   The R1 row of that file's refusal table (§9) gains a dated note: R1 holds for one Warp, and three
   Warps close the bare line.
3. **Cross-references, dated:** the second notable of `power-nexus-atlas-sentinel-time-warp` ("the
   Gold is the whole line") is true for one Warp and now says so. The notable of
   `power-nexus-sentinel-renata-time-warp-chain` that called this line uncatalogued now names the entry,
   and so does §8 of the B3 walk.

## 9. Method note

- **A refusal that prices one copy of a repeatable card has refused one copy, not the line.** R1 was
  right for one Time Warp, and the catalogue read it as "the bare version does not work". The bound in
  §3.1 shows why the copy count is the lever: each Warp adds one Hold and one channel of two runes,
  so it adds half a firing of budget. One Warp gives 5, two give 7, and three give 8.
