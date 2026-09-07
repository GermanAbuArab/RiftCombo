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

---

## 10. Green Father / the Brush — the deferral is RESOLVED from the rules text, and no R-number is needed

§11 of the #153 walk deferred `green-father-brush-four-tags` because *"what 438 Replace does to
Control, nor what a battlefield token is for 190.x purposes"* was open. **It is not open. Rule 438
answers it, and the Core Rules use Green Father as their own worked example.**

`UNL-195 | Green Father | Legend | Calm/Order | When you conquer or hold, you may exhaust me to
replace that battlefield with a Brush battlefield token.`
`UNL-T03 | Brush | Battlefield | Colorless | Bird, Cat, Dog, Poro, and Ivern units here have +1
Might. When you score here, you may replace this with the battlefield it replaced.`

**438.1** — *"Replacing is the act of Creating a token in the place of another card or token without
playing it while **inheriting all effects or statuses of the game object it replaced**."*

**438.1.a** — *"The replacing token is treated as the same Game Object as the card or token it
replaced for the purposes of Game Effects that target or reference that game object."* Its worked
example, verbatim:

> Example: A player with **Green Father** as their legend conquers Navori Fighting Pit. They choose
> to place the Green Father conquer effect on the chain after the Navori Fighting Pit conquer effect.
> When the Green Father trigger resolves, Navori Fighting Pit is replaced with Brush. Although the
> Navori Fighting Pit has been replaced, the "here" in its triggered ability still can have its
> information referenced, because **the Brush inherited all statuses and conditions**.

So Control — a status of the battlefield under 190.x — carries across, and 190.6.a (*"While a
Battlefield is Controlled, its Controller controls its Abilities"*) then makes the Brush's own text
yours. 190.6.d's blanking clause never fires, because the Brush is not uncontrolled.

The swap back is equally explicit:

- **438.5 / 438.5.a** — the replaced battlefield goes to Banishment and *"is considered to have been
  Replaced and not Banished"*, so 108.6.c's "nothing returns from Banishment" does not bite;
- **438.7** — *"Tokens that have been Created through a Replace action can be instructed to be
  'Swapped back.' This may also appear as 'replace [the token] with the [Game Object] it replaced.'"*
  — which is the Brush's own second sentence, word for word;
- **438.7.b** — *"the token stops existing and the original card is returned to the space that the
  token just occupied, **inheriting all current effects and statuses**"*, so Control carries back too.

**This is CLAUDE.md's own standing lesson landing again:** before filing a reading over a printed
term, grep the rules. `grep '^438\.'` returns Green Father by name. R31 was retired the same way when
`170.11.c` turned out to define "open".

### 10a. Why it is a NOTABLE and not an entry

`UNL-T03` is a **token**. It can never appear in a decklist, so it can never be a `uses[]` row —
0 of the 302 catalogued entries name a token code, and the synergy layer filters them out for the
same reason. The Brush is a *consequence* of a legend ability, not a card in a line, and its natural
home is `daisy-green-father-four-tag-attacker`, the entry that deferred it. Two things to record
there:

- **What it buys:** a static `+1 Might` for Bird / Cat / Dog / Poro / Ivern units at that battlefield.
  It is a continuous modifier, not a 702 buff, so 702.3's one-per-unit cap never applies and it
  stacks with a real buff. It raises the wall's bill under 143.2.a and 465.2.c.3, and it is the only
  Might bonus in the pool that reaches Daisy (tagged Ivern) as well as the four tags.
- **What it costs, and this is the honest half:** the replaced battlefield's own text, and the
  legend's exhaust each turn. Nothing in the pool converts Might into points except `OGN-034`'s
  excess-damage threshold, which is Fury and cannot share a legend with Green Father. So the Brush
  yields an ENGINE ceiling — a wall, never a finisher.

### 10b. The uncatalogued use nobody has stated: Green Father is a DENIAL tool

Green Father replaces *"that battlefield"* — the one you just conquered or held, which in a Duel can
be **the opponent's**. 438.5 puts their battlefield in Banishment and 438.1 hands you a Brush in its
place. If they later retake the location they get the Brush's `+1 Might` for tags they probably do
not run, **not their own battlefield's ability**, and only the Brush's controller may swap it back
(438.7, and the Brush's text keys on *"when you score here"*).

That is a permanent, one-sided strip of an opponent's battlefield text for one legend exhaust, and it
is available on any turn you conquer or hold theirs. It is not a point and it is not a finisher, so
it belongs in `notable`, but no entry in the catalogue says it.

---

## 11. The CHAIN sweep the manager asked for — no new entry, and why

Every ENGINE whose `terminatesIn` mentions Time Warp, a second Conquer or an Additional Turn was
opened:

| entry | ceiling | verdict |
|---|---|---|
| `fiora-vault-breaker-jhin` | **2 points a turn** (two conquers) | six points short of a CHAIN; the moves generate Energy and Power, not points |
| `jhin-relentless-pursuit-wallop` | **2 points a turn** (two conquers, six moves) | same ceiling; the fourth, fifth and sixth moves pay resources only, because 470 refuses a second Score at an already-scored battlefield |
| `power-nexus-sentinel` | 1 + K a turn | already has two CHAIN children from rc-walk-payoff |
| `applied-researchers-time-warp-discount` | nothing scores | already the feeder for three CHAINs |
| `renata-time-warp-ekko-refresh` | — | reclass already REJECTED on 323.6 / 190.4.c; not reopened |

**The two Jhin engines are the interesting negative.** Both reach exactly two conquers a turn, and
neither can reach a third, because 470 (*"A player may only Score, from either method, once per
Battlefield per turn"*) means the third and later moves in the same turn score nothing — a Duel has
only two battlefields (485.4). **Two is the hard ceiling on conquers per turn in a Duel**, so any
conquer-based CHAIN must get to 8 from two scoring events, which is exactly what
`swain-shurelya-double-conquer` does with three payoff bodies (1 + 3 twice).

### 11a. A phase-order fact for the fodder family

`bottled-constellation-time-warp` is fed by killing three friendly bodies at the **start of your Main
Phase**. A token engine looks like the obvious fodder, and the [Temporary] ones cannot do it:
816.1.b kills every [Temporary] permanent *"at the start of this permanent's controller's Beginning
Phase"*, which is **315.2 — before 316**. So a [Temporary] body minted on turn N is already dead when
turn N+1's Main Phase starts. **[Temporary] fodder must be created and consumed inside the same Main
Phase**, which is why `UNL-081 Keeper of Masks` (played from [Hidden] for E0, three bodies at once)
is the only clean feed and why a Sprite engine is not.

This is the third finding in this walk from the same source — the order 315.1 Awaken → 315.2
Beginning → 316 Main. The other two: a delayed Add scheduled for the start of the Main Phase survives
316.3 (§4), and a conquer effect bridged onto a Hold loses any "played this turn" condition (§7).

### 11b. A note for anyone building a CHAIN that kills its own bodies

Per the manager's rejection of the `renata-time-warp-ekko-refresh` reclass: **323.6 and 190.4.c hand
a battlefield back at the Cleanup the moment your last unit there dies or leaves.** Any chain that
kills a body mid-turn has to name who else is standing at that body's battlefield. In
`bottled-constellation-time-warp` the fodder must not be the garrison holding the battlefield whose
Hold is supplying the other point.

---

## 12. The ALT_WINs outside the Plaza family — the class is exhaustively three cards

**The sweep first, because it bounds the class.** Over all 935 base codes, exactly **three** cards
in the pool touch winning the game:

```
OGN-293  The Grand Plaza    battlefield  "When you hold here, if you have 7+ units here, you win the game."
UNL-088  Gutter Palace      gear   Mind  "At the start of your Beginning Phase, if you have exactly 4 cards
                                          in hand and exactly 4 units at battlefields, you win the game."
OGN-276  Aspirant's Climb   battlefield  "Increase the points needed to win the game by 1."   [BANNED both formats]
```

So "the ALT_WINs outside the Plaza family" is the Gutter Palace family, and it is two entries:
`gutter-palace` (one card) and `gutter-palace-keeper-time-warp` (six).

### 12a. REFUSED — Aspirant's Climb as a one-sided lockout

The idea is good and I want it on record because it will occur to the next reader. 195 (*"A player
also wins the game if an effect instructs them to do so"*) is a **different clause** from 194.2's
*"points greater than or equal to the Victory Score"*. Aspirant's Climb raises the Victory Score;
it does not touch 195. So an ALT_WIN deck is unaffected by it while every opponent's BURST and CHAIN
needs one more point — and a Gutter Palace deck can afford to bring it, because the Palace is a GEAR
and counts *"units at battlefields"* rather than battlefields you control, so it never competes for
the one battlefield slot 485.4.a allows.

**It is banned in both formats.** `data/cards.json` carries
`[BANNED constructed:banned, 2v2:banned]` on OGN-276, and CLAUDE.md's own rule is that an anchor
banned in every format fails validation. Dead — but the 195-versus-194.2 distinction it rests on is
real and is the reason the whole ALT_WIN class is robust in a way the point classes are not.

### 12b. `gutter-palace-reaction-dials` (ENTRY) — both counters moved on the opponent's turn

`gutter-palace` is one card and its weakness is stated in its own steps: *"Pass at 4/4."* The
Palace's adjust ability is an Activated Ability with **no [Reaction]**, so between the end of your
Main Phase and the check at 315.2.a you cannot touch either counter, and a single removal spell takes
you to three units and fails the check.

Mono-Mind supplies a complete set of Reaction-speed dials, and the unit-count one had never been
used in the catalogue at all:

| card | hand Δ | units-at-battlefields Δ | speed |
|---|---|---|---|
| `OGN-104 Retreat` (E1) | −1 on the play, +1 on the return = **0** | **−1** | [Reaction] |
| `UNL-071 Chakram Dancer` (E3) | **−1** | **+1** | [Ambush] = [Reaction] (822.1.b) |
| `SFD-087 Premonition` (E2 + 3P) | −1 on the play, +3 on the draw = **+2** | 0 | [Reaction] |
| Gutter Palace's own ability | −1 | +1 | **Main Phase only** |

`UNL-071 Chakram Dancer` appears in **no** catalogued entry, and it is the load-bearing card: nothing
else in mono-Mind adds a unit at a battlefield at Reaction speed.

**The finding that makes it work: the removal opens the window the correction needs.** 316.5.b gives
you nothing in the opponent's Neutral Open State — *"only the Turn Player has the ability to play
spells or activate abilities"* — but 813.1.c.1 admits a [Reaction] card *"during Closed States on any
player's turn"*, and 312.2.c hands out priority in a Closed State, which is precisely what their spell
creates when it goes on the Chain. So the answer must be played **in response**, and the count is
done **forward**: they aim removal at one of your four, you go to five with Chakram Dancer, their
spell resolves and you are back at four.

Two supporting facts the entry states rather than assumes. Runes must be **banked through your own
turn** — 167 empties the Rune Pool, not the runes, and 164.2.a / 164.2.b are both [Reaction], so
Premonition's 3 Power is three banked runes recycled (161.2.b sends them to the Rune Deck). And the
Draw Step is **315.4, after the check at 315.2.a**, which is what makes a fixed hand size holdable
at all.

---

## 13. The BURSTs — the class is saturated, and here is the sweep that bounds it

Fifteen BURSTs, and every one already exceeds the Victory Score with its declared quantities (I
re-derived each formula: 10, 9, 10, 10, 17, 10, 10, 9, 9, 9, 9, 9, 10, 11). **More points is worth
nothing to this class.** The only levers are cost, robustness and turn count.

Three of those were already closed in earlier sections: §2 found the [Equip]-cost lever, §4 the
turn-count one, and the multiplier sweep found that **exactly three "trigger an additional time"
cards exist and all are catalogued**. This section closes the last one.

### 13a. Every hold-scoring payoff is already under a multiplier

Six cards in the pool score on a Hold or a Conquer, and each is catalogued with at least one
multiplier: `OGN-066 Ahri` (Sentinel, Svellsongur, Skyfall+Brambleback), `SFD-115 Trinity Force`
(Sentinel, Brambleback, Svellsongur, Weaponmaster), `UNL-177 Ivern` (Sentinel, Arena, Svellsongur),
`VEN-138 Shen` (Sentinel, Svellsongur — and self-capped, §3), `VEN-046 Nasus` (Arena, Brambleback),
`SFD-214 Power Nexus` (Sentinel, and two Time Warp CHAINs). There is no seventh payoff to find.

### 13b. The complete [Equip]-cost table, which bounds the [Weaponmaster] feeder for good

[Weaponmaster] reduces an [Equip] activation by one rainbow, so it pays **all** of a one-rune cost
and only part of a two-component one. Sweeping every Equipment in the pool:

- **one rune → free under [Weaponmaster]:** Serrated Dirk, Recurve Bow, Long Sword, Doran's Shield,
  Brutalizer, Guardian Angel, Sterak's Gage, Cloth Armor, Experimental Hexplate, **World Atlas**,
  Doran's Blade, **Hexdrinker**, Warmog's Armor, **Trinity Force**, Doran's Ring, Boots of Swiftness,
  Cull, Edge of Night, Eye of the Herald, B.F. Sword, Sacred Shears, Spinning Axe, Forgefire Cape,
  Rabadon's Deathcrown, **Shurelya's Requiem**, Soul Sword, **Hunter's Machete**, Pendulum Blade,
  Hand Hammer;
- **Energy + a rune, so only partly discounted:** Skyfall of Areion, **Svellsongur**, The Zero Drive,
  Boneshiver, Blighted Battleaxe, Hextech Gauntlets.

**And the rule that decides whether the free attach is worth a card slot: [Weaponmaster] equips
"to ME", so it only pays for CARRIER-INDEPENDENT Equipment.**

- `SFD-115 Trinity Force` — *"When I hold, score 1 point"* — works on any body, so the free attach is
  pure profit. That is why §2's entry exists.
- `SFD-059 Svellsongur` — *"copy that unit's text"* — must sit on the payoff unit itself, and
  [Weaponmaster] can only put it on the Weaponmaster body. **It can never free a Svellsongur attach
  on a copy line**, which is why `svellsongur-copy-hold`, `ivern-svellsongur-four-tags-hold` and
  `shen-kinkou-svellsongur-hold` keep paying their Calm Power.
- `SFD-030 Skyfall of Areion` — *"**My** hold effects are also conquer effects"* — same problem, and
  the same reason `skyfall-ahri-conquer` cannot use it while `lucian-skyfinity-double-conquer` can
  (there Lucian carries both the Skyfall and the Trinity Force, so the bridged text is his own).

Only four carrier-independent Equipment have a hold or conquer effect at all — Trinity Force
(points), `SFD-086 World Atlas` (Golds), `SFD-150 Last Rites` (reanimation), `UNL-096 Hunter's
Machete` (XP) — and only Trinity Force scores.

### 13c. CORRECTION to my own §2 entry: Veteran Poro is the cheaper carrier

`lucian-weaponmaster-trinity-sentinel-hold` uses three `SFD-113 Lucian, Merciless` at E3 as the
Weaponmaster carriers. **`SFD-099` / `UNL-223 Veteran Poro` is Body, E2, M2, plain [Weaponmaster] —
the cheapest [Weaponmaster] body in the pool, and it appears in no catalogued entry.** Three of them
are E6 against Lucian's E9, in the same Mind/Body identity, for the same three free attaches.

The trade, stated honestly rather than as a strict improvement: each carrier is M2 + 2 from the
Trinity Force's Might Bonus (718.4) = M4, against Lucian's M5, so the garrison's clearing bill under
465.2.c.3 drops from 22 to 19. Lucian's *"The first time I conquer each turn, ready me"* is dead
weight in a Hold line. **Recommendation: swap the carrier to Veteran Poro and note Lucian as the
+1-Might-per-body alternative.** **Written out in full** as `veteran-poro-weaponmaster-trinity-sentinel-hold` to
`/tmp/rc-walks/rc-walk153b-replace.json`, because a card swap in `uses[]` alone would leave an
entry whose id, name, steps and notes all still said Lucian. Re-running the walk on Veteran Poro's
numbers also caught **two errors of my own** in the original: it claimed *eight bodies* (there are
five — Trinity Force is gear, never a body) and priced the board's destruction at 22 damage, when in
fact **any single loss** takes `T × (1 + K)` from 9 to 6 and the total from 10 to 7. What the spread
genuinely buys is that no one removal takes a Trinity Force and a Sentinel together, which is exactly
what happens to the sibling when the Sentinel carrying two of them dies (total 3). The version that
survives a loss is K = 3, and the replacement says so.

### 13d. Two robustness notes, and two leads for the engine-side walk

**NOTABLE — `SFD-102 Hexdrinker` on a Blue Sentinel.** Body, E2, one-rune [Equip], *"[Effect]
[Deflect]"*, and in **no** catalogued entry. Every Sentinel BURST names the same single point of
failure in its own notes — lose a Sentinel and K drops — and 809.1.c makes an opponent pay a rainbow
to choose a [Deflect] unit with a spell or ability. It is carrier-independent, so a Weaponmaster body
can attach it free. Applies to the Mind/Body lines (`blue-sentinel-trinity-force-hold`,
`lucian-weaponmaster-trinity-sentinel-hold`, `sentinel-trinity-time-warp-chain`).

**NOTABLE — `VEN-041` / `VEN-171 Riven, Shattered`** (Calm, E3 P1 M3) is in no entry and is the only
[Weaponmaster] body that pays for the Equipment it accumulates: *"When I attack, choose an enemy unit
here. Deal 2 to it for each Equipment attached to me."* Her first attach is free by her own keyword.
Calm, so she is the Weaponmaster for Calm/Mind and Calm/Order — including
`swain-shurelya-double-conquer`, where she would attach Shurelya's Requiem (one rainbow) for nothing.

**LEAD for the engine-side walk, not mine:** `SFD-150 Last Rites` + `UNL-087 Blue Sentinel` is an
uncatalogued pair. Last Rites is *"When I conquer or hold, you may play a unit from your trash"* —
carrier-independent and a hold effect, so the Sentinel runs it 1 + K times: two or more free bodies
out of the trash every Beginning Phase, in Mind/Chaos. `last-rites-stack-arena-reanimator` uses the
Arena instead; nothing pairs it with the Sentinel.

### 13e. Verdict

**No new BURST entry.** The payoffs are exhausted (13a), the multipliers are exhausted (§2's sweep),
the [Equip] lever is taken and now bounded (13b), and every remaining idea is either a near-duplicate
of a merged entry or a robustness note. The class is closed; the room is in CHAINs, as §9 said.

---

## 14. The CHAIN sweep — every N-points-per-turn ENGINE crossed with the Additional-Turn sources

**First, the bound: Time Warp is the ONLY Additional-Turn source in the pool.** Swept over all 935
base codes for *"take a turn"* / *"additional turn"* / *"extra turn"*, the result is one row:

```
OGN-122  Time Warp  spell  Mind  E10 P4  "Take a turn after this one. Banish this."
```

So **every chain of this shape must admit Mind (103.1.b)**, and any ENGINE whose identity excludes
Mind cannot become one no matter how many points a turn it makes. That single fact does most of the
refusing below.

Second, a correction to the framing: `2N ≥ 8` is not the test. Time Warp is capped at three copies
(103.2.b) and banishes itself rather than recycling, so up to **four** consecutive Beginning Phases
are available — `N ≥ 3` suffices, at `3N ≥ 8` across three of them. That is what makes the Shen line
below work at N = 3.

Every ENGINE whose `terminatesIn` or `netPerIteration` states points per turn, with the three in
range:

| entry | N | identity | verdict |
|---|---|---|---|
| `lucian-skyfinity-double-conquer` | **4** | Fury/Body | **REFUSED on 103.1.b** — see below |
| `heimerdinger-renata-remote-score` | 2–3 | Mind/Body | **REFUSED on the ledger** — see below |
| `shen-kinkou-sentinel-hold` | 3 | Mind/Order | **WRITTEN** as `shen-sentinel-time-warp-chain` |

### 14a. REFUSED — `lucian-skyfinity-double-conquer`, and it is the painful one

Its own `terminatesIn` reads: *"four points a turn — eight across two turns, **with the opponent's
turn in between, which is why it is not a CHAIN**."* That sentence is an invitation: remove the
opponent's turn and it is a CHAIN at exactly 8, with no other change and no extra bodies.

It cannot be done. The line is `SFD-113 Lucian` (Body) + `SFD-030 Skyfall` (Fury) + `SFD-115 Trinity
Force` (Body) + `SFD-184 Relentless Pursuit` (Fury/Body), i.e. **Fury/Body**, and 103.1.b admits only
the legend's two domains. Time Warp is Mind and is the pool's only extra-turn card. **The single best
CHAIN candidate in the catalogue by arithmetic is killed by Domain Identity alone**, and nothing in
the pool can rescue it.

### 14b. REFUSED — `heimerdinger-renata-remote-score`, on the ledger rather than the domain

Mind/Body, so it *does* admit Time Warp. It fails on what a point costs: its own `netPerIteration`
is *"1 point per activation, at 4 Energy + 4 Mind Power, plus 3 Energy + 1 Power for each
Acceleration Gate that buys the next one."* Three points in a turn is therefore about **18 Energy and
14 Power**, before Time Warp's own 10 + 4. A twelve-rune board produces at most 12 Energy and a free
floor of 2 Power a turn (#44). Not payable once, let alone on each of three consecutive turns.

### 14c. WRITTEN — `shen-sentinel-time-warp-chain`

`shen-kinkou-sentinel-hold` is 3 points a turn in Mind/Order, and its own notes name the weakness:
the garrison *"is two units and cannot be three"*, because `VEN-138 Shen`'s condition is *"exactly one
other unit you control here"* and 383.2.a.1 makes that part of the Trigger Condition. One token
landing there, or one removal spell, takes the line to zero.

**Inside a Time Warp chain that weakness costs nothing, and that is the whole entry.** The opponent
never takes a turn, so they cannot move a body onto your battlefield and cannot remove one. The
fragility that makes it a mediocre engine is irrelevant to the chain.

3 + 3 + 3 = 9 across three uninterrupted Beginning Phases, crossing 8 on the third. The Blue Sentinel
pays for both Time Warps by the 316.2 task order (§4): its delayed Add is a hold effect, so it runs
twice and banks 2 rainbow, and 316.4 delivers that **after** 316.3 empties the pool. Two Applied
Researchers put Time Warp at E8 + 2 Power; the 2 Power is exactly what was banked.

Against `sentinel-trinity-time-warp-chain`, the same shape in Mind/Body: that one needs a Trinity
Force and a 1-Body [Equip] and lives under `VEN-149 Defender of Tomorrow`, the pool's **only**
Mind/Body legend. This one needs no [Equip] at all and runs under any of four Mind/Order legends.
Both are kept; the difference is the identity, which is the deckbuilding fact that matters.

K cannot be raised here — a second Sentinel is a second "other unit" and switches Shen off — so this
is the one Sentinel line in the catalogue that is deliberately built at K = 1.

---

## 15. `last-rites-sentinel-trash-holds` (ENTRY) — and a correction to the lead that produced it

The lead was *"1+K free bodies from the trash per Beginning Phase"*. **Last Rites does not give free
bodies.** Its own reminder text:

`SFD-150 | Last Rites | Gear | Chaos | E3 M+2 | [Equip] — 1 Chaos, Recycle 2 cards from your trash.
[Effect] When I conquer or hold, you may play a unit from your trash. **(You still pay its costs.)**`

What `UNL-087 Blue Sentinel` doubles is the **permission**, not the price: 1 + K plays out of the
trash per Hold, each at the unit's full Energy and Power. The gain is card advantage, not tempo, and
the entry says so in its first `notable`.

Three things the walk pinned down:

- **Where the resources come from.** 167 empties your Rune Pool at the end of your own turn, so at
  the Scoring Step it is empty. 315.1.b readied your runes in the Awaken Phase and 164.2.a is a
  [Reaction], so you tap them inside the Closed State the Hold trigger opens (312.2.c). 316.3 has not
  run yet, so this spends the turn's Energy early rather than conjuring any.
- **Where the body lands.** 355.2.a's default includes *"a Battlefield the controller controls"*, so
  a unit played from the trash goes straight to the battlefield you are holding — reanimation has
  none of the token bottleneck #48 measured.
- **The [Equip] cost is self-limiting and [Weaponmaster] cannot fix it.** *"1 Chaos, Recycle 2 cards
  from your trash"* — 416.6 lets you choose which two, but they leave the trash you are about to
  reanimate from. And it is a rune **and an action**, not a single rune, so §13b's "one rainbow less"
  removes only the Chaos.

It pairs with the Sentinel where `last-rites-stack-arena-reanimator` pairs it with the Reckoner's
Arena — the Arena reaches the same doubling from the conquer side, in a different identity. This one
needs no battlefield of yours, so 485.5's 1-in-3 draw never applies.

---

## 16. The CAUSE / TRIGGER matrix — the user's method, and what the pool actually offers

The user's brief: *"I think we are missing a lot of SMALL combos."* The method he chose is a matrix over
the whole pool — classify every card by the events its text **causes** and the events it **triggers
on**, pair A-causes-X with B-triggers-on-X, filter, and rank by how rare the event is.

Scripts live in `.scratch/` (gitignored): `matrix.ts`, `buckets.mjs`, `bucketD.mjs`, `top30b.mjs`.

### 16a. How the vocabulary was built

Not from memory. `harvest.mjs` pulled **every** trigger clause in the corpus — 142 distinct, of which
**127 are cross-card** (i.e. not "when you play me") — and the 24 events were written from that list.
Sizes:

```
matrix            1028 deckable BASE codes x 24 events
coverage folded   4082 anchor-partner pairs from partnersOf(), plus every pair already in an entry uses[]
candidates        1620 after 103.1.b (domain union <= 2), coverage, and alt-printing collapse
refused by rule     98  (A 4, B 0, C 7, D 87)
remainder         1522, in 47 distinct TRIGGER-card groups
```

### 16b. The four REFUSED-BY-RULE buckets, marked rather than dropped

| bucket | rule | pairs |
|---|---|---|
| A | hold payoff + Main-Phase resource engine — 315 puts the Hold before 316 and 167 empties the pool, so the engine's output never reaches the Hold | 4 |
| B | excess-damage card + removal that empties the defending side — 465.1 assigns no damage, R28 = A gives zero excess | **0** |
| C | [Hidden] card on the attacking side — 811.1.b hides at a battlefield you control, 811.1.d.2 pins the targets there | 7 |
| D | banned in every format | 87 |

**Bucket B is empty and that is a result, not a miss:** the six excess-damage cards were checked
against every defender-emptying removal in the pool and each pair was already covered or blocked by
103.1.b first. The rule stays recorded as a standing refusal.

### 16c. Three classification bugs found and fixed, all worth knowing for the next matrix

1. **`/kill (a|an|…)/` matches "kill ALl gear."** `OGN-022 Thermo Beam` was showing up as a cause of
   friendly deaths. Word boundaries and an explicit noun fixed it.
2. **`/\[hidden\]/` matches cards that merely MENTION Hidden.** `OGN-018 Noxus Saboteur` — a denial
   card that stops opponents revealing — was showing as a way to play from face down. The cause now
   requires the reminder text `(hide now for`.
3. **The ban marker is not in `cards.json`.** It is applied to `data/corpus_flat.txt`, and the
   authoritative source is `data/legality.json`, whose entries carry **`bases` as an array**. Reading
   a scalar `e.base` silently matched nothing and reported bucket D as 0 when it is 87.

Bugs 1 and 2 were ~100 candidates of pure noise. Bug 3 put **two banned cards in the top 30 I had
already sent** — `OGN-292 The Dreaming Tree` and `OGN-177 Stealthy Pursuer` — which is why the ranked
list was reissued.

### 16d. `SFD-138 Windsinger` prints "Hidden" without brackets — a registered-anomaly candidate

The matrix reported Broker + Windsinger as **uncovered** even though the synergy rule
`black-market-broker-hidden-family` exists with `SFD-121` as its anchor. The reason is in the corpus:

```
SFD-138 | Windsinger | Unit | Chaos | E2 M1 | Hidden (Hide now for :rb_rune_rainbow: ...)
```

**No brackets on `Hidden`.** It is the only unit in the pool printed that way, so every
`\[Hidden\]` predicate in `data/synergies.json` misses it. This is CLAUDE.md's own standing rule —
*"A keyword lens opens with `grep -i <word>`, never with `[Keyword]`"* — hitting live in the synergy
layer. It belongs in `docs/data-anomalies.md`, **not** normalised into `data/errata.json`, per the
project's rule that the errata overlay's find-string failure is the only mechanism keeping the text
honest.

### 16e. Three refusals at the head of the ranked list

**REFUSED — `SFD-203 Battle Mistress` + `OGN-287 Sigil of the Storm` (rarity 5, the rarest event in
the pool).** The Sigil reads *"When you conquer here, you **must** recycle one of your runes"* and the
Mistress turns each rune recycle into a Gold. It generates nothing. The forced recycle pays **no
Power**, because 164.2.b is the RUNE's own ability — *"Recycle this: [Reaction] — Add [C]"* — whose
COST is the recycle; an instruction to recycle is not that ability. So the Mistress converts a
mandatory drawback into a Gold rather than creating value, and CLAUDE.md already names Sigil of the
Storm as a *"doubled drawback"* in its synergies section. The matrix rediscovered a known trap, which
is a good sign for the matrix and a refusal for the pair.

**REFUSED — the rest of the Battle Mistress rows.** `battle-mistress-gold-refund` already catalogues
the mechanism (*"one Gold per rune recycle while she is ready, so about one per turn and two or three
in a turn with enemy deaths"*). The matrix surfaced her repeatedly because the PARTNERS differ; the
engine does not.

**REFUSED — `SFD-121 Black Market Broker` + `SFD-138 Windsinger`.** Covered in substance by
`black-market-broker-hidden-family` and by four catalogued entries; the pair is "uncovered" only
because of the missing brackets in §16d. Recorded as a synergy LEAD instead: the rule's partner list
is one card short.

### 16f. Three entries written

- **`vex-radiant-dawn-stun-redeploy`** (Calm/Order). Neither card causes the stun — they are two
  TRIGGERS on one event, and the entry says so. What one stun buys: a buff, and a **free relocation
  of a 5-Might [Tank]**, because Vex's move is an effect move and so pays neither 144.2's exhaust nor
  144.4.c's [Ganking] restriction. Capped at one stun per enemy body per turn by 423.1.a.1.
- **`rippers-bay-retreat-double-channel`** (Mind). The finding is that **this battlefield works while
  uncontrolled**: 190.6.d blanks only the word *"you"*, and Ripper's Bay says *"that player"*. The
  catalogue has cited 190.6.d many times to show that a battlefield you bring starts switched off;
  this is the first entry to note the scope of that blanking. Two runes for two Energy off one
  Retreat, and it pays the opponent too.
- **`jinx-rebel-discard-event-ready`** (Fury/Chaos). A counting fact that inverts the naive read:
  *"When you discard one or more cards"* fires once per discard **EVENT**, so three cards that
  discard one each beat one card that discards three. Same shape as 383.1.b's collapse of simultaneous
  instances, reached from the other direction.
