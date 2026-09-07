# Walk — uncatalogued feeders of the 36 finishers

**Issue #161. 2026-09-06. Rules version 2026-07-16.**

The mirror of #155's engine-side pass. The catalogue holds **36 finishers** — 18 ALT_WIN, 12 BURST,
4 CHAIN, plus the two Grand Plaza wins written on the evening of 2026-09-06. For each, this walk
asks which **uncatalogued in-domain feeder changes the ledger**: a different engine, a cheaper
enabler, a different body count, a different legend pair.

A feeder that only makes the same line stronger with the same arithmetic is a `notable` on the
existing entry, reported and not written. A feeder whose cards or numbers differ is a new entry.

Entries are staged to `/tmp/rc-walks/rc-walk153b.json` per the parallel-walk protocol; this session
does not edit `data/combos.json`.

---

## 1. The Grand Plaza family — `heimerdinger-armory-plaza` (ENTRY)

Eighteen of the thirty-six finishers are Grand Plaza wins, so the family was swept first for what
actually determines the ledger: **how many bodies land AT the Plaza per Energy, and whether they
have to walk.**

The bar is `OGN-293 | The Grand Plaza | When you hold here, if you have 7+ units here, you win the
game.` Two sweeps over the pool, both by base code:

- token-makers whose text says **`here`** — 14 base codes;
- token-makers with **no destination clause at all** — 21 base codes, and these are just as good,
  because 355.2.a's default is *"the controller's Base or a Battlefield the controller controls"*.

The best rate in the pool is `SFD-168 Vanguard Armory` (Order, E7 P1): *"exhaust: Play three 1 Might
Recruit unit tokens. (You may play them to different locations.)"* — three bodies per activation,
repeatable, and gear is not covered by 143.4 (*"**Units** enter the Board exhausted"*), so it fires
the turn it lands.

**The feeder is `OGN-111 Heimerdinger, Inventor` copying it.** *"I have all exhaust abilities of all
friendly legends, units, and gear"* — he pays his own exhaust for the copy, so one Armory produces
six Recruits a turn instead of three.

| line | cards | cost | bodies at the Plaza |
|---|---|---|---|
| `plaza-armory-miss-fortune` | 2 Armories + Miss Fortune | **19 Energy + 3 Power** | 10 |
| `heimerdinger-armory-plaza` | 1 Armory + Heimerdinger | **10 Energy + 2 Power** | 10 |

Two further points the entry records:

- **It is the ALT_WIN half of a catalogued ENGINE.** `heimerdinger-vanguard-armory-recruits` walks
  exactly these two cards and its own `terminatesIn` already says *"it wins through a Grand Plaza
  hold at 7+ units, not on its own"*. This is that sentence made explicit.
- **The DAG composition over-charges, which is why it is written out.** `ready-recruits-grand-plaza`
  carries `needs: ["token-body-engine"]` and would compose them automatically — but it also carries
  `SFD-171 Renata Glasc, Industrialist`, because a token minted at your base enters exhausted
  (143.4) and cannot pay 144.2's move cost the same turn. The Armory needs neither: its own reminder
  text places the Recruits at different locations and 355.2.a already admits a battlefield you
  control. No walk, no Industrialist.

**R30 is not engaged.** That ruling was about Heimerdinger copying an ability that carries its own
*"Use my abilities only while I'm at a battlefield"* clause. The Armory prints no such sentence.

### 1a. Refusals in the Plaza family

**REFUSED — `SFD-154 Guards!` hidden at the Plaza, played in the Beginning-Phase window.** The idea:
open the window with a [Temporary] permanent (816.1.b puts a Chain Item up, 312.2.c hands out
priority, 813.1.c.1 admits a [Reaction] card), then play three hidden Guards! for E0 each and add
three Sand Soldiers after the opponent's last chance to remove anything. It works, and it is
**strictly worse than `keeper-of-masks-flurry-plaza-window`**, which already occupies that slot:
Guards! is one body per copy, so four bodies still have to survive the opponent's turn, where the
Keeper line puts **all seven** into the window (Keeper + 2 Reflections + 4 Birds) and exposes
nothing at all.

**REFUSED — `OGN-275 Altar to Unity` beside the Plaza.** *"When you hold here, play a 1 Might Recruit
unit token in your base."* A free Recruit a turn, and it can never share a board with the Plaza:
485.4.a puts only one of your three battlefields into the game, so two of your own battlefields
never coexist. Same paragraph kills every "battlefield + battlefield" Plaza idea.

**NOTABLE, not an entry — `UNL-078 Sprite Fountain` as a cheaper alarm clock for
`keeper-of-masks-flurry-plaza-window`.** That entry buys the [Temporary] permanent that opens the
window from `UNL-189 Bashful Bloom` at E4 **every turn**. The Sprite Fountain (Mind, E2 P1) is itself
[Temporary] and its `[Deathknell] — Repeat this gear's play effect` mints a fresh [Temporary] Sprite
as it dies, so one card at E2 + 1 Power is a **self-renewing** alarm clock. Same seven bodies, same
arithmetic, cheaper clock — a `notable`, and it stays in the same Calm/Mind identity.

**NOTABLE, not an entry — `UNL-077 Soul Shepherd` on the Recruit Plaza lines.** *"Your token units
have +1 Might."* It adds no bodies, so the count is unchanged; what it changes is the survival bill,
because 143.2.a needs damage equal to Might and 465.2.c.3 forces lethal in full one body at a time.
Seven 1-Might Recruits cost 7 to clear; at 2 Might they cost 14. It is Mind, so it narrows an
all-Order Recruit line to Mind/Order — report it against `vanguard-captain-manufactor-plaza` and
`grand-plaza-recruit-vanguard` and let the manager decide whether the identity change is worth an
entry of its own.

---

## 2. The Blue Sentinel BURSTs — the multiplier sweep, and `lucian-weaponmaster-trinity-sentinel-hold` (ENTRY)

**First, a negative result that bounds the whole family.** A sweep of all 935 base codes for
`trigger an additional time` returns **exactly three cards**:

```
OGN-236 Karthus, Eternal   — your [Deathknell] effects
UNL-029 Red Brambleback    — your conquer effects for conquering here
UNL-087 Blue Sentinel      — your hold effects for holding here
```

All three are already catalogued. **There is no fourth multiplier in the pool**, so no Sentinel BURST
can be scaled by adding a different doubler — only by more Sentinels (capped at 3 by 103.2.b) or a
denser payoff.

Sweeping the hold-scoring payoffs by cost per point: `SFD-115 Trinity Force` (E4, [Equip] one Body
rune) is the cheapest, ahead of `OGN-066 Ahri, Alluring` (E5 + 1 Power), `UNL-177 Ivern` (E6, needs
all four tags) and `VEN-138 Shen` (E6 + 2 Power, and capped — see §3).

**So the feeder is the one thing that removes Trinity Force's remaining cost: [Weaponmaster].**
818.1 makes [Equip] an Activated Ability with a cost, `SFD-113 Lucian, Merciless` attaches *"one of
your Equipment to me for 1 rainbow less"*, and Trinity Force's [Equip] cost is **exactly one rune**.
One minus one is nothing. Three Lucians carry the three Trinity Forces and
`blue-sentinel-trinity-force-hold`'s three [Equip] payments disappear.

Priced honestly in both directions, because this is a trade:

| | Energy | Power | bodies at the battlefield |
|---|---|---|---|
| `blue-sentinel-trinity-force-hold` | 20 | 5 | 2 |
| `lucian-weaponmaster-trinity-sentinel-hold` | 29 | 2 | 8 |

Against the catalogue's standing rate of ~9 Energy per Power (#21) the new line is cheaper; against a
real game's free floor of 2 Power a turn (#44) the old one is easier to assemble. What is not a
matter of opinion is the body count, and the sibling's own notes end on *"lose one Sentinel and K
drops to 1, taking the total to 7"* — two units carrying a ten-point burst. Here the garrison is
eight, each Lucian at M5 with the Trinity Force's Might Bonus (718.4), and 465.2.c.3 prices clearing
it at 22 damage.

Points unchanged: `1 + T × (1 + K)` = `1 + 3 × 3` = **10**, one Score (470-capped) and nine ability
Gains (194.1.c, R2 = A).

### 2a. A possible understatement in `blue-sentinel-trinity-force-hold`, for the manager

Its `notable` reads *"T=3, K=2 gives 10 for 20 Energy"*. Twenty Energy is the Energy alone: the two
Sentinels also cost 2 Mind Power and the three [Equip] activations cost 3 Body Power, so the board is
**20 Energy + 5 Power**. The steps do say *"Equip it for 1 Body Power"*, so this is an incomplete
figure rather than a wrong one — but CLAUDE.md's standing warning is exactly this shape (*"Always
count the [Equip] costs and the Power: two published '18 Energy' figures had counted neither"*).
Reported, not edited; that entry belongs to whoever owns it.

---

## 3. `shen-leader-blue-sentinel-hold` (ENTRY) — the payoff the Sentinel cannot scale

`VEN-138 | Shen, Leader of the Kinkou Order | Unit | Order | E6 P2 M7 | [Shield] When I hold, if
there is exactly one other unit you control here, you score 1 point.`

The obvious move is a second and third Blue Sentinel. **It cannot be done, and the reason is the
Sentinel itself.** Shen's condition is *"exactly one OTHER unit you control here"*, 383.2.a.1 makes
that part of the Trigger Condition rather than the Effect, and a second Sentinel makes two others —
so his ability never reaches the Chain and the line scores nothing at all. Shen is the one hold
payoff in the pool whose multiplier occupies the only companion slot he allows.

Ceiling: `1 + 1 × (1 + 1)` = **3 points a turn**, plus 2 rainbow Power, forever, and it never grows.

**REFUTED — adding a Trinity Force to raise T.** Gear is not a unit, so it would not break Shen's
count, and the idea is mechanically sound. It dies on Domain Identity alone: Trinity Force is Body,
Shen is Order, Blue Sentinel is Mind — three domains, and 103.1.b admits only the legend's two.

---

## 4. The Time Warp CHAINs — `sentinel-trinity-time-warp-chain` (ENTRY)

**The finding is a paragraph nobody had cited for this: 316.2's task ORDER.**

```
316.2.  The following Tasks become Outstanding in the specified order:
316.3.  1. Each player's Rune Pool empties. Any unspent Energy and Power are lost.
316.4.  2. At the start of Main Phase game effects take place.
```

CLAUDE.md's standing trap is that *"Energy added in Awaken or the Beginning Phase is lost when the
Rune Pool empties at the Main Phase start (167)"*. That is true of Awaken and of the Beginning Phase
— and **false of an effect scheduled for the start of the Main Phase itself**, because 316.3 runs
first and 316.4 runs after it.

Blue Sentinel's second sentence is exactly such an effect: *"When I hold, [Add] 1 rainbow at the
start of your next Main Phase."* It is a hold effect, so the Sentinel doubles its own Add: **2
rainbow Power, every Main Phase, surviving 316.3.**

Two Empowered `VEN-055 Applied Researchers` put Time Warp at **E8 + 2 Power** (356.4.e keeps each E1
floor local to its own discount; the rainbow half reaches Time Warp's [C] Power symbol, as
`applied-researchers-time-warp-discount` already walked). Two Power is precisely what the Sentinel
just banked. **Time Warp costs 8 Energy out of pocket and no Power at all.**

The chain, checked against the entry's own quantities with T = 1 Trinity Force and K = 1 Sentinel:

| | points this Hold | running total |
|---|---|---|
| turn 1 Scoring Step | 1 Score + 2 Gains = 3 | 3 |
| turn 2 (Time Warp) | 3 | 6 |
| turn 3 (Time Warp) | 3 | **9** |

194.2 wins it in the cleanup. Three scoring events, **no opponent turn between them** — CHAIN, not
BURST. And the failure mode inverts: `blue-sentinel-trinity-force-hold` must survive to a single
Hold with its whole board intact, while this only has to survive to the FIRST of three, because the
opponent never acts again.

2v2 is short: 489.3 sets the Victory Score at 11, so the board needs a third Time Warp there.

**Recorded so it is not added as an improvement: the Ancient Henge is not needed.** `SFD-117` converts
Energy to rainbow 1:1 with no cap and is legal in Mind/Body, so it could pay the 2 Power instead —
but it costs E2 + 1 Power and an exhaust, and the Sentinel's Add is free and already in the line.

**REFUSED — `UNL-216 The Academy` doubling Time Warp.** *"When you hold here, give your next spell
this turn [Repeat] equal to its base cost."* Time Warp's base cost is E10 + 4 Power, so the [Repeat]
is another E10 + 4 Power (820.1.c.1 makes it an Additional Cost paid during the play steps) for one
extra execution (820.1.b) — **two extra turns from one card, for E20 + 8 Power in a single turn.**
A twelve-rune board cannot produce 20 Energy, and the discount does not help: The Academy grants
[Repeat] equal to the **base** cost, which 206 reads as the printed cost, so Applied Researchers
shrink the spell and not the repeat. Dead on arithmetic, not on rules.

---

## 5. Still to walk

The remaining Sentinel BURSTs (`ahri-blue-sentinel-hold`, `ivern-sentinel-hold`,
`ivern-arena-sentinel-hold`, `nasus-ascended-sentinel-arena-hold`, `svellsongur-copy-hold`,
`ahri-trinity-svellsongur-hold`), the conquer BURSTs on `UNL-029 Red Brambleback`, and the two
remaining CHAINs (`swain-double-conquer`, `yasuo-windrider-ride-the-wind-chain`).
