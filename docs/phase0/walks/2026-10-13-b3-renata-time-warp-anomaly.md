# Refusal B3 reopened: Power Nexus + Blue Sentinel + Renata, Mastermind across three Time Warps (#335)

**Verdict: B3 REOPENS, and it is promoted as a `candidate` CHAIN,
`power-nexus-sentinel-renata-time-warp-chain`.** The line reaches 8 across four consecutive turns of one
player from **eight** runes on the board without `SFD-083 Hextech Anomaly`, and from **six** with it.
The refusal was wrong twice. Its first reason (a halved rune ceiling) was corrected on 2026-09-12. Its
second reason was "short by exactly 2 Energy", and patching that shortfall with Anomaly is
**necessary inside the refusal's own model and still not enough: that model tops out at 7**. The line
closes for a reason the refusal never priced: **use Renata once, on the last turn, and pay the Power
Nexus with the runes the chain no longer needs.**

Two findings fall outside this issue and go to the orchestrator as their own issues (§8): the bare
Nexus + Sentinels + **three** Time Warps line reaches 8 with no Renata at all, and refusal R1's table
puts 14 runes on a board that holds 12.

Walked 2026-10-13 by impl-riftcombo-335. Card text is from `data/corpus_flat.txt`, rules text from
`data/Riftbound-Core-Rules-2026-07-16.txt`, both pasted. The second instrument is
`scripts/b3-ledger-search.mjs`, an exhaustive search over every legal spend on every turn of the
window. Its output is pasted in §5.

## 1. What was refused, and why

B3 is `power-nexus-sentinel-renata-mastermind` × `OGN-122 Time Warp` (mono-Mind). It was refused
in `docs/phase0/walks/2026-09-07-orphan-remainder.md` §7 on the arithmetic of firing Time Warp and
Renata **on every turn**: 10 Energy + 4 Power for the Warp and 4 Energy + 4 Power for Renata, which is
14 Energy and 8 Power a turn. The 2026-09-12 correction at the foot of that file, repeated as row B3 of
`docs/phase0/walks/2026-09-12-synthesised-lines.md` §14, fixed the rune ceiling: a board of twelve
runes yields twelve Energy **and** twelve Power, because 164.2.b's cost is a recycle rather than an
exhaust. It then concluded that the line fails on Energy alone, by exactly 2, with 10 Power to spare.
`VEN-141 Butcher of the Sands` could not supply that Energy, and it was then believed to be the pool's
only Power-to-Energy conversion. #330 and #334 withdrew that uniqueness claim: `SFD-083 Hextech
Anomaly` is a second.

## 2. The cards, pasted

- `SFD-214 Power Nexus`, battlefield, colourless: "When you hold here, you may pay :rb_rune_rainbow::rb_rune_rainbow::rb_rune_rainbow::rb_rune_rainbow: to score 1 point."
- `UNL-087 Blue Sentinel`, Mind unit, E4 P1 M4: "[Shield 2] (+2 :rb_might: while I'm a defender.) Your hold effects for holding here trigger an additional time. When I hold, [Add] :rb_rune_rainbow: at the start of your next Main Phase. (Abilities that add resources can't be reacted to.)"
- `SFD-088 Renata Glasc, Mastermind`, Mind unit, E5 M4: ":rb_energy_1::rb_rune_mind:: Draw 1. :rb_energy_4::rb_rune_mind::rb_rune_mind::rb_rune_mind::rb_rune_mind:, :rb_exhaust:: Score 1 point. Use my abilities only while I'm at a battlefield."
- `OGN-122 Time Warp`, Mind spell, E10 P4: "Take a turn after this one. Banish this."
- `SFD-083 Hextech Anomaly`, Mind gear, E3 P1: ":rb_exhaust:: [Reaction] — Pay any amount of :rb_rune_rainbow: to [Add] that much Energy. (Abilities that add resources can't be reacted to.)"

None of the five is banned, restricted or Signature (`data/legality.json`, `data/signature.src.json`
and `cards.json`'s `signature` field, checked 2026-10-13). All four Mind cards fit any legend with Mind
in its identity, and Power Nexus is colourless. Under 103.3.a.1, *"Cards in the Rune Deck must be of the Domain Identity of your Champion Legend."*, so twelve Mind runes are legal, and every recycle below pays Mind Power.

## 3. The rules the ledger runs on, pasted

**The extra turns.** 735: *"Certain Game Effects will instruct a player to “take a turn after this.” These effects create a temporary Additional Turn owned by that player that is inserted into the turn queue after the current turn."*
And 737: *"When an Additional Turn is inserted into this queue, it does not change the Turn Order of the game. The owner of the Additional Turn just has the next queued turn. After that turn is completed, it will be removed and the queue will proceed with its previously queued turns."*
So three Warps, one cast in each of the first three turns, give four consecutive turns with no
opponent turn among them. 103.2.b: *"Your Main Deck can include up to 3 copies of the same named card."* Time Warp banishes itself, so three is the most a game has.

**Each turn's start.** 315.1.b: *"1. The Turn Player readies all Game Objects they control that are able to be readied."*
That readies the runes, Renata and Anomaly. 469.2: *"Hold: A player maintains Control of a Battlefield they did not yet Score this turn during their Beginning Phase."*
471.1: *"The player Gains up to one Point, depending on their current score."* And
471.2.b: *"Hold abilities trigger at a Battlefield that was Held."* With two Sentinels, every hold
effect at the Nexus fires 1 + 2 = 3 times, the Sentinels' own Add included. That is R1 = A on issue
#11, backed by RiftJudge Q10155, which every Sentinel entry cites. The line depends on it (§5).

**Runes.** 315.3.b: *"1. The Turn Player channels 2 runes from their Rune Deck."* If the deck is
short, 315.3.b.1: *"If there are fewer than 2 runes in the Rune Deck, they channel as many as possible."*
430.2.a: *"By default, runes are channeled readied."* 161.2.a: *"Exactly 12 Rune cards chosen during Deck Construction."*
161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."* Each Basic
Rune has two abilities, 164.2.a `[E]: [Reaction] — Add [1].` and 164.2.b `Recycle this: [Reaction] — Add [C].`,
and 164.2.b.1: *"The Power added this way corresponds to the Domain of the Rune that is being Recycled."*
The recycle's cost is not an exhaust, so a rune exhausted for Energy can still be recycled for Power.
Recycling removes it from the board until a Channel Phase brings it back.

**The pool.** 167: *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of each player's turn."*
So Energy made in the Beginning Phase is wasted, and the Beginning Phase spends recycles only. The
Sentinels' rainbow survives because 316.3 runs before 316.4. 316.3: *"1. Each player's Rune Pool empties. Any unspent Energy and Power are lost."*
316.4: *"2. At the start of Main Phase game effects take place."*

**Paying Power.** 135.2.e.5.b: *"When Added to a player’s Rune Pool, [A] can be spent to pay a Power cost of any Domain."*
So the Sentinels' rainbow pays Time Warp's and Renata's Mind Power.
135.2.e.5.a: *"When required as a cost, [A] can be paid by Power of any Domain."* and
163.2.b: *"Some Power is Universal and can be used to pay for costs of any Domain."* Together they let
either kind of Power pay Anomaly's rainbow cost. In this ledger, Power is one pool.

**Paying the Nexus in the Beginning Phase.** The Nexus's "you may pay" is the trigger's base cost.
204.3.a: *"When Costs within Instructions appear as the first part of the effect in triggered abilities, the cost is taken to be the base cost of the triggered ability. It must be paid to finalize the triggered ability."*
383.3.b.1: *"The cost must be paid in order to finalize the Triggered Ability to the Chain."* The
runes can pay it at that moment because of 444.2.c: *"Players may activate abilities that Add resources with the Reaction keyword at any time that they are instructed to Pay resources. Those abilities finalize and resolve immediately, ignoring normal restrictions."*
Both rune abilities carry [Reaction], so each firing costs four recycles. The same route is already
walked in `power-nexus-rune-recycle-any-identity`.

**Anomaly.** 149.1 says gear enter play Ready, and 315.1.b readies it each turn, so it converts once
a turn, and any amount at once.

**The eighth point.** 194.1.c: *"Spells, Triggered Abilities and Activated Abilities that instruct them to gain one or more points."*
471.1.a.1: *"Notably, points Gained from sources that are not Conquer are not beholden to these restrictions."*
472: *"When a cleanup occurs and a player has accrued Points greater than or equal to the Victory Score for their Mode of Play, and if they have more points than any opponent, they Win the Game."*
Renata's condition, 377.2.b: *"If an Activated Ability has a condition on “using” or “playing” it, that condition must be true in order to activate the ability in question."*
She stands on the Nexus throughout. Her point and the Nexus's points are ability Gains (R2 = A), so
470's once-per-battlefield cap touches only the Hold. 470: *"A player may only Score, from either method, once per Battlefield per turn."*

## 4. The ledger, by hand

Notation: `b` is the number of runes on the board at Awaken, and the Rune Deck holds `12 - b`. Every
turn of the window is a Hold (+1). The two Sentinels queue six rainbow, which arrive after 316.3.

### 4.1 Without Anomaly, from eight runes (four in the Rune Deck)

| turn | Beginning Phase | channel | Main Phase | board after | points |
|---|---|---|---|---|---|
| T1 | Hold +1. Nexus ×3 declined. | 8 → 10 (deck 2) | Exhaust 10 for Energy. Time Warp = 10 Energy + 4 of the 6 rainbow. | 10 | 1 |
| T2 | Hold +1. | 10 → 12 (deck 0) | Exhaust 10 of 12. Time Warp again. | 12 | 2 |
| T3 | Hold +1. Recycle 4 to pay one Nexus firing: +1. Board 8, deck 4. | 8 → 10 (deck 2) | Exhaust 10. Time Warp, the last copy. | 10 | 4 |
| T4 | Hold +1. Recycle 8 to pay two Nexus firings: +2. Board 2, deck 10. | 2 → 4 (deck 8) | Exhaust 4 for Energy. Pay Renata's 4 Mind Power from the rainbow, exhaust her: **+1**. | 4 | **8** |

T4 adds 4 points: the Hold, two Nexus firings and Renata. A twelve-rune start reaches **9**: T1 pays
one firing with 4 recycles and still has 10 runes for the Warp after the channel.

### 4.2 With Anomaly, from six runes (six in the Rune Deck)

| turn | Beginning Phase | channel | Main Phase | board after | points |
|---|---|---|---|---|---|
| T1 | Hold +1. | 6 → 8 (deck 4) | 8 Energy from runes. **Anomaly: pay 2 rainbow, Add 2 Energy.** Time Warp = 10 Energy + the last 4 rainbow. | 8 | 1 |
| T2 | Hold +1. | 8 → 10 (deck 2) | Time Warp. | 10 | 2 |
| T3 | Hold +1. | 10 → 12 (deck 0) | Time Warp. | 12 | 3 |
| T4 | Hold +1. Recycle all 12 to pay three Nexus firings: +3. Board 0, deck 12. | 0 → 2 (deck 10) | 2 Energy from runes. **Anomaly: 2 rainbow → 2 Energy.** Renata = 4 Energy + the last 4 rainbow: **+1**. | 2 | **8** |

T4 adds 5 points: the Hold, three Nexus firings and Renata. **Anomaly supplies exactly the 2 Energy
the refusal named, on T1 and again on T4.** On T1 it is what lets the chain start two runes earlier.

### 4.3 Why the refusal's model fails even with Anomaly

The refusal fires Time Warp and Renata on every turn and never pays the Nexus. That costs 22 resource
units a turn: 14 Energy and 8 Power. A board of `b` runes provides `b` Energy plus `k ≤ b` recycles,
and the Sentinels add 6. So every such turn needs `b + k ≥ 16`, and each recycle leaves the board
until a Channel Phase refills it at two a turn. From twelve runes: T1 needs `k ≥ 4`, which leaves 8,
and the channel makes 10. T2 needs `k ≥ 6`, which leaves 4, and the channel makes 6. T3 then has at
most `6 + 6 = 12 < 16`. **At most two turns can fund both, so the 2 Energy Anomaly supplies does not
rescue the model. The board runs out first.** The search agrees: with the Nexus never paid, the best
any board reaches is **7**.

## 5. The second instrument: `node scripts/b3-ledger-search.mjs`

The search enumerates, for each turn, the number of Nexus firings paid (four recycles each), how many
Time Warps to cast, whether to fire Renata, and how much Anomaly converts. For each choice it takes
the fewest recycles that pay for it. Fewer recycles can only help, because more runes on the board
never hurts. It carries the board and the Rune Deck from turn to turn and stops when no Additional
Turn is queued. Before printing anything else, it reproduces refusal R1's hand result
(`docs/phase0/walks/2026-09-06-engine-payoff-walk.md` §1.1: Nexus + Sentinels + **one** Time Warp
reaches 5) and exits if it cannot. A search that sees nothing cannot report a clean result. Output,
2026-10-13:

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
no Renata: Nexus + Sentinels + Anomaly + 3 Time Warp
  points by starting board 0..12: 1 1 2 3 5 6 7 7 7 7 8 8 8
  smallest board reaching 8: 10
```

**[2026-10-13, #338]** The script has since gained the plan for the bare three-Warp line and two more
bare rows. The output above is the #335 run, and the current run is pasted in
`2026-10-13-bare-nexus-three-time-warps.md` §4. Every line above is unchanged in it.

The hand ledgers of §4.1 and §4.2 are the plans the search prints at its thresholds. The two
instruments agree on both lines and on the refusal's model, and neither was derived from the other.
How close is the null to flipping? With two Warps instead of three, the line needs a full twelve-rune
board and Anomaly, and reaches 7 from any board without Anomaly. Under R1 = B, no board reaches 8.
**The entry stands on R1 = A**, as every Nexus-Sentinel entry does, and its notable says so.

## 6. When it fires

The clock's conventions apply: perfect draws and a passive opponent. Runes on the board at turn `t`'s
Awaken are `2(t-1)` on the play. On the draw, 485.7 adds one: *"First Turn Process: The player going second channels an extra Rune from their Rune Deck during their first Channel Phase of the game."*
Every recycle spent on a Power cost subtracts one more. Getting onto the Nexus: a unit moving onto it
contests it. 190.3.a.1: *"Units moving to or being played to a battlefield apply Contested status if that battlefield is not already Contested and that Unit’s controller does not already control that battlefield."*
190.4: *"Control is established by having Units at a Battlefield at the end of a Showdown or Combat after applying the contested status."*
After that, units can be played straight onto it. 355.2.a: *"By default, Valid locations include the controller’s Base or a Battlefield the controller controls."*

- **On the play, with Anomaly:** T2 Sentinel to base (E4, recycle 1). T3 move it onto the Nexus, then
  play the second Sentinel onto it (E4, recycle 1). T4 Hold, then with 6 Energy and six rainbow: play
  Anomaly (E3 + 1 rainbow); it enters ready and turns 2 rainbow into 2 Energy; play Renata onto the
  Nexus (E5). **T5 starts with `2·4 − 2 = 6` runes, so the chain runs on T5.**
- **On the play, without Anomaly:** eight runes are needed. `2(t−1) − r ≥ 8` needs `t ≥ 6`, because
  the first Sentinel's Power has no source but a recycle (`r ≥ 1`). **T6.**
- **On the draw, both:** T2 Sentinel (recycle 1). T3 move it in and play Renata onto the Nexus. At
  T4 the Hold with one Sentinel gives two rainbow, which pay the second Sentinel's and Anomaly's Power.
  T5 starts with eight runes. **T5 either way.**

So Anomaly buys one turn on the play and nothing on the draw. The do-nothing Hold baseline in this
identity is T6. `npm run adversarial -- --turns` prints this entry at **T11**. That clock prices every
card in `uses` against the rune curve, charging all three Time Warps (30 Energy) before the chain, and
it models no Add. So it sees neither the six rainbow a turn nor the fact that each Warp is cast in its
own turn from a board that has refilled. The T11 is a property of the instrument, not of the line. I
have not changed the clock, because pricing Adds and in-chain casts is a change to the instrument and
outside this issue.

[2026-10-13, #339: the clock now runs an Additional Turn inside the clock turn that queued it and pays Power from the rainbow a holder Adds, and it prints this entry at **T6**, the hand number on the play. `test/turn-clock.test.ts` pins it to T5-T6.]

## 7. What it assumes, and what answers it

- Power Nexus is the battlefield in play. 485.5: *"Setup: Each player randomly selects one (1) of their three (3) Battlefields. The other two are removed and will not be used for this game. The selected Battlefields are placed simultaneously in the Battlefield Zone."*
  So it is 1 of your 3. The opponent's turns before the window must leave both Sentinels and Renata
  standing on it.
- All three Time Warps in hand by the turn each is cast. The Additional Turns' own Draw Phases help,
  and the Main Deck must not run out at any of them (315.4.b.1, 431).
- **The opponent has no turn inside the window but can act inside yours.** 359.3.c: *"Other players have an opportunity to play Reactions before the resolution of spells."*
  425.1.c: *"Countering does not refund any costs paid to play a card, activate an ability, or trigger an ability."*
  Each Warp is E10 + 4 Power spent before a counter resolves. `time-warp-hold-burst` names the pool's
  counters that reach it.
- Renata's point is the last point, so removing her before T4's Main Phase costs exactly one point.
  The §4.1 line then ends at 7.

## 8. Disposition

1. **Promoted as `candidate`:** `power-nexus-sentinel-renata-time-warp-chain` in `data/combos.json`.
   Its `uses` are the B3 card set: Power Nexus, two Blue Sentinels, Renata and three Time Warps.
   **Anomaly is NOT in `uses`, because the line reaches 8 without it.** It goes in a notable that says
   what it buys: two runes of threshold, which is one turn on the play. That follows this project's
   rule that a lead which would add a card goes in a notable. `verified` needs a second, independent
   walk.
2. **Both refusal sites carry a dated note** pointing here: the 2026-09-12 correction in
   `2026-09-07-orphan-remainder.md` and row B3 in `2026-09-12-synthesised-lines.md` §14.
3. **For the orchestrator, outside this issue:**
   - The **bare** Nexus + two Sentinels + **three** Time Warps line reaches 8 from ten runes with no
     Renata (§5, last two rows). Refusal R1 and the second notable of
     `power-nexus-atlas-sentinel-time-warp` price only **one** Warp, where it does reach only 5. Seen
     from that line, Renata is worth two runes of threshold, and four with Anomaly. The bare line is
     not catalogued. **[2026-10-13, #338]** It is now: `power-nexus-sentinel-three-time-warps`
     (candidate), walked in `2026-10-13-bare-nexus-three-time-warps.md`. The next item is corrected
     in R1's table, with a dated 161.2.a note.
   - R1's table in `2026-09-06-engine-payoff-walk.md` §1.1 lists "14" runes left for T1's Main Phase.
     A board holds at most 12 (161.2.a). Its conclusion of 5 is right, and the search reproduces it.

## 9. Method notes

- **The refusal named a missing resource, and supplying it was not enough.** Inside the refusal's
  own model, the 2 Energy were necessary and not sufficient. Once Anomaly covered them, the board
  became the binding constraint. A reopening that had only checked "does Anomaly supply 2 Energy?"
  would have promoted a line that reaches 7. **When a refusal says "short by X", re-run the whole
  ledger with X supplied, not only the step that was short.**
- **The line that works spends the expensive payoff once.** Both earlier passes priced Renata every
  turn because her point is the entry's identity. The optimum uses her only for the last point, and
  it spends the rune board on the Nexus at the moment the remaining Warps no longer need it.
