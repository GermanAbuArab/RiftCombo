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

**Cross-reference, added after the merge:** `herald-heimerdinger-armory-plaza` (staged the same
night by rc-walk-payoff) is the same three cards plus `OGN-265 Herald of the Arcane`, whose
`E1, exhaust: Play a 1 Might Recruit unit token` Heimerdinger also copies — a fourth and fifth body
a turn for one Energy each. That entry is the wider board; this one is the three-card floor, and
the tempo differs because the legend's Recruits arrive one at a time while the Armory's arrive
three at a time. Both are kept.

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

## 3. Shen, Leader × Blue Sentinel — WITHDRAWN as a duplicate; the finding stands

`VEN-138 | Shen, Leader of the Kinkou Order | Unit | Order | E6 P2 M7 | [Shield] When I hold, if
there is exactly one other unit you control here, you score 1 point.`

The obvious move is a second and third Blue Sentinel. **It cannot be done, and the reason is the
Sentinel itself.** Shen's condition is *"exactly one OTHER unit you control here"*, 383.2.a.1 makes
that part of the Trigger Condition rather than the Effect, and a second Sentinel makes two others —
so his ability never reaches the Chain and the line scores nothing at all. Shen is the one hold
payoff in the pool whose multiplier occupies the only companion slot he allows.

Ceiling: `1 + 1 × (1 + 1)` = **3 points a turn**, plus 2 rainbow Power, forever, and it never grows.

**The entry was WITHDRAWN before merge.** `shen-kinkou-sentinel-hold` (`UNL-087` + `VEN-138`) had
already been merged from rc-walk-instances two hours earlier — the same two cards. Three separate
walks reached this line the same night, which is evidence for the line and an indictment of my
process: **check the current `data/combos.json` by CARD SET before writing, not by anchor.** The
check is one command and it is now the first step of every candidate:

```
node /tmp/rc-walks/cardset.mjs <CODE> <CODE> ...
```

The two findings in this section are not duplicated by that entry and are kept here: the self-cap
(a second Sentinel takes the line to zero) and the Domain Identity refusal below.

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

---

## 6. `swain-double-conquer` -> `swain-shurelya-double-conquer` (ENTRY) — the CHAIN without the loop

`swain-double-conquer` is the most expensive finisher in the catalogue. It carries
`needs: ["infinite-energy","infinite-power"]` and prices itself at *"about 40 Energy and 10 Power"*,
because `VEN-065 Swain, Visionary` has no [Ganking] — so 144.4.c rules out A → B as one Standard
Move and each Swain must walk **A → base → B**, two moves and therefore two readies each, six in
all, bought out of five `VEN-068 Jayce, Brilliant Inventor` plays at one ready apiece.

**One card replaces all six.**

`SFD-192 | Shurelya's Requiem | Gear | Calm/Mind | E4 P2 M+2 | [Unique] [Equip] 1 rainbow. When you
play this, **ready your units**. [Effect] **Your units here have [Ganking]**.`

Both halves are load-bearing and they do different jobs:

- the play trigger is a **mass** ready — all three Swains stand up at once, where Jayce readies one
  unit per play;
- the Effect makes the second leg unnecessary at all. 144.4.c.1: *"Units with Ganking may use their
  Standard Move to Move from Battlefield to Battlefield."* Two moves become one.

Finishing turn, priced against the entry's own quantities: Cloth Armor E1 + Decree of Insight E1 +
Watchful Sentry E2 + Shurelya's E4 + 2 Power + 1 rainbow to [Equip] = **8 Energy and 3 Power.** An
ordinary twelve-rune turn, for a line that previously could not be attempted outside an
infinite-energy engine.

**The gear order is forced, and it looks wrong until it is walked.** Swain's condition needs a
non-token gear played *this turn* and it is re-checked on each Conquer, so a gear must be down before
the FIRST one — but Shurelya's own ready is worthless before it, because the Swains are already ready
at Awaken (315.1.b). Playing Shurelya's early wastes the ready and leaves nothing to stand the Swains
back up at A. Hence a separate, throwaway E1 gear.

Points: 4 at A (1 Score + 3 ability Gains), 4 at B — 470's cap is per battlefield, so B is untouched
by A. **Eight exactly**, which is also the fragility: lose one Swain in the combat at A and the line
stops at 6 or 7. That is what the catalogued version buys redundancy against with the loop, and both
entries are kept for that reason.

---

## 7. The Skyfall bridge — four payoffs, four different deaths

`SFD-030 | Skyfall of Areion | Gear | Fury | E3 M+2 | [Equip] 1 Energy + 1 Fury. [Effect] My hold
effects are also conquer effects, **and vice versa**.`

The catalogue uses one direction: hold payoffs become conquer effects, multiplied by `UNL-029 Red
Brambleback` (`brambleback-trinity-skyfall-conquer`, `skyfall-ahri-conquer`,
`lucian-skyfinity-double-conquer`, `dragonstorm-brambleback-trinity-conquer`).

**The other direction looks like a free repeatable finisher and it is not.** Bridging a
conquer-scoring payoff into a hold effect would let `UNL-087 Blue Sentinel` multiply it every
Beginning Phase with no attack at all. A sweep of the whole pool returns **five** cards that score on
a Conquer, and every one of them dies, each for a different reason:

| card | why the bridge fails |
|---|---|
| `OGN-034 Tryndamere, Barbarian` | *"When I conquer **after an attack**, if you assigned 5 or more excess damage"* — a Hold has no attack and no damage assignment, so 383.2.a.1 keeps it off the Chain |
| `VEN-046 Nasus, Ascended` | Calm + Skyfall (Fury) + Sentinel (Mind) is **three domains** (103.1.b). `nasus-ascended-sentinel-arena-hold` gets there instead through `OGN-286 Reckoner's Arena`, which is Colorless and dodges the problem — the contrast is the lesson |
| `VEN-065 Swain, Visionary` | domains are fine (Mind + Fury), but his condition is *"if you've played … **this turn**"* and the Scoring Step is **315.2**, which precedes the Main Phase at **316** — on a Hold you have not played anything yet this turn |
| `UNL-177 Ivern, Friend to All` | already reads *"When I conquer **or hold**"*, so the bridge adds nothing; `ivern-sentinel-hold` is the entry |
| `OGN-112 Kai'Sa, Evolutionary` | conquers into a free spell, not a point |

The Swain row is the generalisable one and it is new: **a conquer effect bridged onto a Hold loses
any condition that depends on the Main Phase**, because 315.2 comes before 316. Recorded so nobody
re-derives the family.

### 7a. Trinity Force + Skyfall + Reckoner's Arena — refused on arithmetic, one point short

The Arena reads *"When you hold here, activate the conquer effects of units here"* (383.4.g.1's own
worked example). Skyfall makes each Trinity Force's hold effect a conquer effect too, so on a Hold
each Trinity Force fires **twice**: once natively, once through the Arena. Domains work — Trinity is
Body, Skyfall Fury, the Arena Colorless, so Body/Fury under `VEN-141 Butcher of the Sands`.

`1 + 3 × 2 = 7`. **One short of 8**, and 103.2.b caps Trinity Force at three copies. Adding
`OGN-066 Ahri` would fix it and is Calm — three domains. Adding a Brambleback would need
383.4.g.1's Arena-activated effect to count as *"conquering here"* for `UNL-029`, which is an unruled
reading and is exactly what this project files R-numbers for; the walk declines it, since the line is
one point short even if the reading went the friendly way.

### 7b. Shen, Leader is self-capped on the conquer side too

`VEN-138` + Skyfall + one Brambleback is a legal Fury/Order board (`OGN-253 Hand of Noxus`) and
reaches `1 + 1 × 2 = 3`. A second Brambleback is a second *"other unit you control here"* and
switches Shen off entirely — the same self-cap §3 found with the Blue Sentinel, from the other
direction. No entry: `shen-kinkou-sentinel-hold` and `shen-kinkou-svellsongur-hold` already hold that
ground.

---

## 8. Refusals and notables in the remaining families

**REFUSED — Shurelya's Requiem as the Plaza walk-in enabler.** `ready-recruits-grand-plaza` carries
`SFD-171 Renata Glasc, Industrialist` so that base-born tokens enter ready and can walk in as one
action (144.3). Shurelya's mass ready does the same job in Calm/Mind instead of Order, and the
substitution looks free. It is not: sweeping Calm and Mind for base token engines returns
`OGN-094 Sprite Call`, `OGN-106 Sprite Mother`, `UNL-069 Sprite Burst`, `UNL-078 Sprite Fountain`,
`UNL-081 Keeper of Masks`, `UNL-084 Sprite Queen` — **all [Temporary]**, all killed by 816.1.b before
scoring — plus `SFD-076 Production Surge`, `VEN-051 Iterative Design` and `SFD-089 Rumble, Scrapper`
at roughly one Mech per E4. The ready was never the binding constraint; the token supply is, and the
fast engines are Order.

**NOTABLE — `UNL-045 Forgotten Signpost` as a third mover for `yasuo-syren-unforgiven-point`.** That
entry buys Yasuo's three moves a turn from the legend (E2 + exhaust) and `OGN-184 The Syren`
(E1 + exhaust). The Signpost is Calm, costs **no Energy**, and moves a unit by effect (420.1/420.2.a,
and R9 was retired precisely because ordinary effect moves DO trigger move abilities) — one Energy a
turn cheaper. Its cost exhausts a *different* friendly unit, and 420.1's *"between two Locations"*
means that unit must stand somewhere Yasuo is not. Same three moves, same one point a turn: a
`notable`, not an entry.

**NOTABLE — [Weaponmaster] on `brambleback-trinity-skyfall-conquer`.** Trinity Force's [Equip] is one
Body rune and Skyfall's is 1 Energy + 1 Fury, so a Weaponmaster body attaches either for one rainbow
less — three Trinity Forces and a Skyfall for 3 Body Power and 1 Fury Power saved. Largely occupied
already: `lucian-skyfinity-double-conquer` runs `SFD-113 Lucian, Merciless` with Skyfall and Trinity
Force for exactly this reason. Reported against the Brambleback entry as a cost note.

**NOTABLE — `OGN-153 Overt Operation` + `SFD-101 Fae Dragon` as a mass ready for `swain-double-conquer`.**
*"For each friendly unit, you may spend its buff to ready it. Then buff all friendly units."* Two
castings ready three Swains twice and re-buff the board in between, so only the first needs an
external buffer. Mind/Body, so it is legal beside Swain. It is strictly worse than §6's Shurelya's
line — E17 + 5 Power against E4 + 3 Power, and it still walks A → base → B — but it is the Mind/Body
answer where §6 is the Calm/Mind one.

---

## 9. Standing verdict on the finisher families

Four families have now been swept from the feeder side and **three of them are saturated**:

- **Grand Plaza (18 entries).** The two floors written on 2026-09-06 are near the real floor; the
  only improvement found was §1, and every other idea died on 485.4.a (two of your battlefields never
  coexist), on the [Temporary] deadline, or on being strictly worse than
  `keeper-of-masks-flurry-plaza-window`, which exposes nothing at all.
- **Blue Sentinel BURSTs.** Bounded by a sweep: **exactly three** *"trigger an additional time"* cards
  exist in the pool and all are catalogued. Improvement is only available on cost (§2) or on turn
  count (§4).
- **Red Brambleback conquer BURSTs.** The Skyfall bridge is one-directional in practice (§7), and the
  Arena variant is one point short (§7a).
- **CHAINs — NOT saturated.** Two of the four were improved outright: §4 turns a Sentinel hold board
  into a three-turn chain that pays for its own Time Warps, and §6 removes an infinite-energy
  requirement from `swain-double-conquer` with a single card.

The lesson for the next pass: **check the current `data/combos.json` by CARD SET, not by anchor,
before writing anything.** Three separate walks reached Shen × Blue Sentinel on the same night (§3).

```
node /tmp/rc-walks/cardset.mjs <CODE> <CODE> ...
```
