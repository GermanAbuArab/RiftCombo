# Walk — the unwalked partners of the 66 proven synergy rules

Issue [#160](https://github.com/GermanAbuArab/RiftCombo/issues/160). Session `rc-walk-instances`, 2026-09-06.
Rules file `data/Riftbound-Core-Rules-2026-07-16.txt`; all card text grepped verbatim from `data/corpus_flat.txt`.

## The material

`data/synergies.json` holds 117 hand-verified patterns. 66 carry a non-empty `basis.combos`, i.e. the
mechanism was extracted from an entry that was already hand-walked, so the pattern is proven to
terminate in a combo for at least one partner. Those 66 rules cover 2,090 reviewed partner slots and
only 180 (anchor, partner) pairs are in `data/combos.json`. This walk prices the remainder.

Scope note: the 51 rules whose `basis.combos` is **empty** belong to `rc-walk153`
(`2026-09-06-orphan-synergy-rules.md`) and are not touched here.

Staging file: `/tmp/rc-walks/rc-walk-instances.json` (staging protocol — this session does not edit
`data/combos.json`).

---

## 1. Entries authored

### 1.1 `heimerdinger-ultrasoft-poro-plaza` — ALT_WIN
Rules mined: `heimerdinger-inventor-exhaust-copy` (75 partners, 4 entries) ∩ `grand-plaza-unit-tokens`
(47 partners, 3 entries). Partner `UNL-160 Ultrasoft Poro` was uncatalogued in both.

`OGN-111 Heimerdinger, Inventor` — *"I have all :rb_exhaust: abilities of all friendly legends, units, and gear."*
`UNL-160 Ultrasoft Poro` — *"[exhaust]: Play two 1 Might Bird unit tokens with [Deflect]. Use this ability only while I'm at a battlefield."*

Two activations a turn = four Birds, played **straight onto the Plaza**: the ability names no
destination, so **355.2.a** — *"By default, Valid locations include the controller's Base or a
Battlefield the controller controls"* — puts them where you like. That is why this line needs neither
`SFD-171 Renata Glasc, Industrialist` nor the walk of #48: nothing ever pays **144.2**'s exhaust.

**R30 = B** is satisfied rather than dodged: **377.2.b** makes *"Use this ability only while I'm at a
battlefield"* a condition of the Activated Ability and **053.1** re-reads *"I"* on the new holder, so
Heimerdinger must stand at a battlefield — and here he stands on the Plaza anyway.

8 Energy + 1 Mind Power, two cards, win on the fourth Hold. Mind/Order (four legends).

### 1.2 `vanguard-captain-manufactor-plaza` — ALT_WIN
Rule mined: `grand-plaza-unit-tokens`. Partners `OGN-218 Vanguard Captain` and `OGN-211 Faithful
Manufactor`, both uncatalogued.

Both print *"here"*, so all eight bodies land at the Plaza in ONE Main Phase for **9 Energy + 2 Order
Power** — against the catalogued `grand-plaza-recruit-vanguard`, whose own REFUTE note records
*"two Vanguards in one turn is 12 Energy, the whole Rune Deck"*.

The ordering is free and load-bearing. **812.1.c**: *"As long as a card different than the one with
the Legion ability has been Finalized by you on the same turn then the Dependent Ability is Active on
the card with Legion."* Play the Manufactor first; **812.2** then satisfies both Captains with that one
card. Play it last and Captain #1 is a bare 3-Might body.

Body quality is the second difference: **465.2.c** sums the attacker's Might and **465.2.c.3** forces
lethal onto one unit at a time, so 5 Recruits + a 2-Might + two 3-Might bodies cost 13 damage to
clear, not 8.

### 1.3 `shen-kinkou-sentinel-hold` — ENGINE
Rule mined: `blue-sentinel-hold` (45 partners; 9 entries in the catalogue carry `UNL-087`).
Partner `VEN-138 Shen, Leader of the Kinkou Order`, uncatalogued.

*"When I hold, if there is exactly one other unit you control here, you score 1 point."*

**This is the only Blue Sentinel line in the catalogue where a SECOND Sentinel is a downgrade.**
**383.2.a.1**: *"Any additional conditional statement immediately after the Condition must be true in
order for the Condition to be fulfilled. Such a conditional statement is part of the Trigger Condition
and not the Effect."* With two Sentinels the battlefield holds three of your units, Shen sees two
others, and the trigger never reaches the Chain: 3 points a turn becomes 1.

3 points per Hold = 1 Score (**469.2** → **471.1**, capped by **470**) + 2 from Shen (R1 = A with
stacking; R2 = A keeps them outside 470 as **194.1.c** Gains).

### 1.4 `cull-brambleback-gold` — ENGINE
Rule mined: `red-brambleback-conquer` (57 partners, 7 entries). Partner `SFD-134 Cull`, uncatalogued.

Three Culls stack on one body — Cull prints no `[Unique]`, and **434.1.b.1** contemplates *"more than
one card attached to the Top-Most card"* and adds that *"the order of the Attached cards has no
bearing on the application of effects"*; **136.2.c** appends each Effect Text to the bearer's Rules
Text and **136.2.d** makes *"I"* the bearer. Three Conquer Effects (**383.4.c.1**) × (1 + 2
Bramblebacks) = **nine Gold**.

Two things the entry states that the headline number hides: the Gold enter exhausted and ready only
at the NEXT Awaken (**315.1.b**) — Renata Glasc, Industrialist would fix it but she is mono-Order and
**103.1.b.1** bars her from a Fury/Chaos deck; and Red Brambleback's own `[Buff]` wastes two of its
three executions under **702.3** / **702.3.a**.

The distinguishing mechanic against the catalogued `yeti-brambleback-renata-gold`: Cull's trigger has
no excess-damage condition, so it pays on a bloodless Showdown Conquer (**344.2** → **348.2.a** →
**348.2.a.1**) with no Attacker designation at all.

### 1.5 `rumble-scrapper-sentinel-mechs` — ENGINE
Rule mined: `blue-sentinel-hold`. Partner `SFD-089 Rumble, Scrapper`, uncatalogued.

Mono-Mind. Three Mech tokens per Hold at **4 Might** each — **187.4** gives the token the Mech tag by
rule (*"A 3 [M] Mech token is a domainless unit token with 3 Might and the Mech tag"*), so Rumble's
static reaches every one of them for free.

**And six rainbow Power a turn**, which nothing in the catalogue had priced: each Sentinel's own
*"When I hold, [Add] rainbow at the start of your next Main Phase"* is itself one of your hold effects
at that battlefield, so 2 Sentinels × 3 executions = 6.

---

## 2. The rule number the catalogue was missing: why Blue Sentinel's Power survives 167

Every Blue Sentinel entry since `world-atlas-sentinel-gold` has treated its rainbow as spendable
without saying why, while CLAUDE.md's own trap list says Energy added in the Beginning Phase is lost
to **167**. The answer is the Main Phase's own task order, and it is explicit:

> **316.2.** The following Tasks become Outstanding in the specified order:
> **316.3.** 1. Each player's Rune Pool empties. Any unspent Energy and Power are lost.
> **316.4.** 2. At the start of Main Phase game effects take place.

The pool empties at 316.3; the Sentinel's delayed `[Add]` is a start-of-Main-Phase game effect and
lands at 316.4, after it. Both entries in this batch cite it.

---

## 3. Refusals

A refusal is worth as much as an entry: it stops the next session re-deriving it.

### 3.1 Every *"you may exhaust me to …"* Hold/Conquer legend is NOT doubled — the second instance cannot pay
Partners refused across `blue-sentinel-hold` and `red-brambleback-conquer`:
`SFD-201 Chem-Baroness`, `UNL-193 Gloomist`, `UNL-199 Deceiver`, `UNL-195`/`UNL-233 Green Father`,
`SFD-187 Void Burrower`, `UNL-187 Piltover Enforcer`.

> **383.3.b.** If a Triggered Ability contains a cost within instructions at the beginning of the
> effect or immediately following the "you may" or "they may" that appears as the first part of the
> effect, that cost is treated as the base cost of the Triggered Ability.
> **383.3.b.1.** The cost must be paid in order to finalize the Triggered Ability to the Chain.

and

> **312.2.c.** [A player receives Priority] when the turn is in a Closed State, **all pending chain
> items finish being finalized**, and they control the next item on the Chain.

Both instances are pending simultaneously and both must be finalized before ANY player gets priority,
so the exhaust would have to be paid twice on one legend in a window where nothing can ready it.
The second instance is simply declined. The multiplier is worth zero on this whole family — which
confirms, with a rule number, the caveat `blue-sentinel-hold`'s own `why` states in prose.

### 3.2 A doubled *"ready X"* is a no-op unless the ready is spent between the two RESOLUTIONS
Partners: `SFD-210 Hall of Legends`, `SFD-195 Blade Dancer`, `UNL-187 Piltover Enforcer`.

Not a flat refusal, and the distinction matters. **340.4**: *"If the Chain is not empty and there are
no Pending Items, the controller of the newest item on the chain gains Priority. Return to Step 2:
Execute."* So there IS a window between resolution #1 and resolution #2 — but there is none between
the two *finalizations* (3.1). Consequence: a doubled ready pays only if you hold an ability that can
exhaust the readied object at Reaction speed inside that window. No entry authored; recorded as a
lead so the next session does not re-open it as either a free double or a dead one.

### 3.3 A doubled `[Buff]` on a fixed target is a no-op
Partners: `UNL-043 Enthusiastic Promoter` (*"When I hold, [Buff] all units here"*) under
`blue-sentinel-hold`, and `OGN-164 Sett, Brawler` (*"When I'm played and when I conquer, buff me"*)
under `red-brambleback-conquer`.

> **702.3.** There can only be one Buff on a Unit at a time.
> **702.3.a.** If a Buff is added, or instructed to be added, on a Unit that already has a Buff, it is
> not placed instead.

The extra executions find every named target already buffed. `OGN-283 Navori Fighting Pit` (*"buff **a**
unit here"*) escapes, because each execution may choose a different unit — as does Red Brambleback's
own *"[Buff] a friendly unit"*, which is why `cull-brambleback-gold` says three executions buff three
bodies and never one body three times.

**Recommendation to the manager (this session does not own `data/synergies.json`):** `UNL-043` and
`OGN-164` are `excludes` candidates of the same shape as the three already recorded on
`blue-sentinel-hold`, i.e. *"a second trigger that is a no-op"*.

### 3.4 The `[Hunt]` half of `blue-sentinel-hold` and `red-brambleback-conquer` yields nothing
Partners refused in bulk: `UNL-016`, `UNL-034`, `UNL-040`, `UNL-047`, `UNL-075`, `UNL-094`, `UNL-096`,
`UNL-100`, `UNL-102`, `UNL-113`, `UNL-117`, `UNL-119`, `UNL-162`, `UNL-203`.

`[Hunt]` is *"When I conquer or hold, gain N XP"* (**823.1.b**), so every one of them is a genuine
partner of both rules and the multiplier really does double the XP. It buys nothing: #116 and #146
already measured that the 11 Spend-N-XP costs and 20 `[Level N]` clauses are a bounded step function
and **nothing in the pool converts XP into points**. Doubling a faucet with no sink is not a combo.

### 3.5 Domain Identity kills the legend partners outside the anchor's domain
`UNL-193 Gloomist` (Calm/Chaos) and `UNL-203 Keeper of the Hammer` (Body/Order) are real hold-effect
partners, but `UNL-087 Blue Sentinel` is Mind and **103.1.b** is a subset test against the legend's two
domains. Dead before the arithmetic starts. Recorded because both read as strong pairs in the
synergy list, which is the list's job — it is a pattern layer, not a legality layer.

### 3.6 `UNL-048 Trevor Snoozebottom` × Blue Sentinel is a LEAD on an existing entry, not a new one
`leblanc-bashful-bloom-trevor-plaza` already runs Trevor + LeBlanc + Bashful Bloom + the Plaza and wins
on the third Hold. A Blue Sentinel doubles Trevor's Sprite output and brings it to the **second** Hold
for 4 more Energy and 1 Mind Power (Mind sits inside Bashful Bloom's Calm/Mind identity). Same
mechanism, same shape, one card faster — so by the standing rule it is recorded here as a `notable`
lead for that entry rather than authored as a separate row.

### 3.7 Leads deliberately not authored because the arithmetic is the same shape at a smaller number
- `SFD-069 Plundering Poro` (Mind, E2 M2, *"When I conquer, play a Gold gear token exhausted"*) and
  `SFD-220 Treasure Hoard` (colourless battlefield, 1 Energy per Gold) under `red-brambleback-conquer`:
  one Gold per trigger against Cull's three, identical mechanism. Leads for `cull-brambleback-gold`.
- `SFD-152 Eminent Benefactor` is already `eminent-benefactor-sentinel-gold`; `OGN-275 Altar to Unity`
  is the same Gold/token shape one step weaker.

---

# Batch 2

## 4. Entries authored

### 4.1 `shen-kinkou-svellsongur-hold` — BURST, 9 points, and the engine defends at 15
Rule mined: `svellsongur-copy` (101 partners, 3 entries in its basis; 14 entries in the catalogue
carry `SFD-059`). Partner `VEN-138 Shen, Leader of the Kinkou Order`, uncatalogued.

Shen's *"if there is exactly one other unit you control here"* counts **units**. Svellsongur is an
Equipment, so three of them stack on him without ever entering that count — which is precisely what
`shen-kinkou-sentinel-hold` (batch 1) cannot do, because a second Blue Sentinel is a body.

2^3 = 8 instances → 8 ability points + the 1-point Score = **9 in one Hold**.

**And the fact this walk found, which no entry in the catalogue had used:**

> **814.2.** If a Unit has Shield, or has been granted Shield, and is granted Shield by an additional
> source, the Shield Value of all granted Shield keywords is **summed**.
> **814.1.b.3.** If X is omitted, it is presumed to be 1.

Svellsongur copies the unit's WHOLE text, `[Shield]` included. Eight instances of Shen's text are
eight `[Shield]`, so he is **Shield 8** and defends at 7 + 8 = **15 Might**. For a BURST that must
survive the opponent's turn, that is the number the entry is really priced on: Ahri, Alluring reaches
the same 9 on the same three gears and defends at 4.

### 4.2 `svellsongur-treasure-hunter-gold` — ENGINE, 16 Gold a turn, from the base
Rule mined: `svellsongur-copy`. Partner `SFD-130 Treasure Hunter` (catalogued with Renata and Ride
the Wind, never with the copier).

Two moves a turn × 8 instances. The Standard Move costs the Hunter's own exhaust (144.2); Unforgiven's
`2 Energy, exhaust: Move a friendly unit to or from its base` costs the LEGEND's exhaust, and 420.3.a
puts the exhaust price only on the Standard Move, so it moves an already-exhausted body. Same
two-move structure as the catalogued `yasuo-stellacorn-svellsongur-draw`, with three gears instead of
one — and with a payoff that has no Burn Out wall (#59: 431.1.a + 194.1.d cap the draw version).

He ends every turn back at his base, so the only exposure is base removal.

### 4.3 `svellsongur-eminent-benefactor-gold` — ENGINE, 16 Gold per Hold, zero recurring cost
Rule mined: `svellsongur-copy`. Partner `SFD-152 Eminent Benefactor` — catalogued under the OTHER
multiplier (`eminent-benefactor-sentinel-gold`, Blue Sentinel, 4 Gold, Mind/Order) and never under
this one (16 Gold, Calm/Order). Neither dominates: the Sentinel is a 4-Might body that also defends
and adds its own rainbow; Svellsongur is `M+0` (137.3) and adds nothing to the board.

### 4.4 `ferrous-forerunner-karthus-mech-plaza` — ALT_WIN
Rule mined: `karthus-deathknell-double` (23 partners, 7 entries carrying `OGN-236`). Partner
`SFD-021 Ferrous Forerunner`, uncatalogued.

**Six is one short of seven, and the entry says so.** 1 Deathknell + 2 Karthus = 3 executions × 2
Mechs = 6 bodies, against the catalogued `karthus-machine-evangel-renata-plaza`'s 9 Recruits. 144.3
makes the shortfall free — *"Players may perform multiple Units' standard move simultaneously. This is
treated as one game action performed on multiple Units"* — so the support bodies walk in with the
Mechs as one action.

What the extra step buys: **187.4** gives the token *"3 Might and the Mech tag"*, so 465.2.c /
465.2.c.3 price the board at 28 damage to clear against the Recruit line's 9.

### 4.5 `bottled-constellation-token-points` — ENGINE, a point a turn with NO battlefield
Rules mined: `renata-industrialist-tokens` / `blue-sentinel-hold` (the faucet side). `VEN-067 Bottled
Constellation` appears in the catalogue only inside `bottled-constellation-time-warp`, which needs
`infinite-energy` AND `infinite-power`; the plain token-fed version had never been written, and #63
had already recorded that `token-body-engine` has many producers and almost no consumers.

Three facts the entry stands on:
- **R2 = A** makes card-text *"score 1 point"* a **194.1.c** Gain, not a 469 Score — so **470**'s
  *"once per Battlefield per turn"* has nothing to attach to. This is the only repeatable point source
  in the catalogue that needs no battlefield, no garrison and no Hold.
- The three kills are the trigger's **base cost** (383.3.b, paid at 383.3.b.1 to finalize), not its
  effect — so the bodies must be present when the trigger goes up, and **203.3** declines it otherwise.
- **Tokens are legal fodder.** 185 bars them from being RECYCLED because 416.1 is defined over cards;
  killing is **428.1** (*"the action of a Permanent going to the trash from the board"*) with
  **428.1.a.1** admitting it *"as a cost for a card or ability"*, and **185.2.d** says outright that a
  token unit is a unit. **186.1** is harmless because nothing here wants it in the trash.

Timing: **316.3** empties every Rune Pool, **then** 316.4 runs the start-of-Main-Phase effects, so the
Constellation fires with an empty pool and needs none.

---

## 5. Refusals, batch 2

### 5.1 `OGN-078 Lee Sin, Ascetic` under `heimerdinger-inventor-exhaust-copy` — the clause does not travel usefully
*"[exhaust]: Buff me. I can have any number of buffs."* **053.1** re-reads *"me"* on whoever now has
the ability, so Heimerdinger buffs **Heimerdinger** — and Heimerdinger does not have *"I can have any
number of buffs"*, which is a separate sentence of Lee Sin's Rules Text and is NOT part of the
`[exhaust]` ability Heimerdinger copies. **702.3** therefore caps the copy at one buff, ever. The
partner is real, the payoff is one +1 Might.

### 5.2 `OGN-186 Treasure Trove` under the same rule — *"this"* does not re-read
*"1 Chaos Power, [exhaust]: Kill this."* **136.2.d** and the 053 family make *"this"* refer to the
attached/owning game object, not to the new holder of the ability, so Heimerdinger's copy kills the
Trove — the same single Trove the Trove's own activation would kill. A doubler that points at a
one-shot is worth nothing.

### 5.3 `VEN-138 Shen` under `blue-sentinel-hold` at K ≥ 2 — recorded on the entry, repeated here
Walked in batch 1. **383.2.a.1** makes *"if there is exactly one other unit you control here"* part of
the Trigger Condition, so a second Blue Sentinel takes the line from 3 points to 1. The catalogue now
carries the two halves as separate rows on purpose: `shen-kinkou-sentinel-hold` (body multiplier,
pinned at K = 1) and `shen-kinkou-svellsongur-hold` (gear multiplier, unconstrained).

### 5.4 `OGN-034 Tryndamere, Barbarian` and `SFD-120 Sivir, Ambitious` under `svellsongur-copy`
Both key on *"if you assigned 5 or more excess damage to enemy units"*. Copying the trigger eight
times does not manufacture the condition: **R28 = A** (ruled 2026-09-04) defines excess damage as
attacking Might that never got assigned, because **465.2.c.4** forbids assigning a unit more damage
than the minimum needed to kill it. The condition is a property of the combat, evaluated once
(383.2.a.1), and every one of the eight copies reads the same board. Eight instances of Tryndamere's
line on a qualifying combat WOULD be eight points — but that is `tryndamere-brambleback-conquer`'s
problem, already walked and already corrected for arithmetic in 2026-09-04; the Svellsongur version
adds a second, independent excess-damage requirement to a line whose own REFUTE note records it
failing the first. Left as a lead, not authored.

### 5.5 `SFD-210 Hall of Legends` / `SFD-195 Blade Dancer` under `red-brambleback-conquer`
See §3.2. The window between the two *resolutions* exists (**340.4**); the window between the two
*finalizations* does not (**312.2.c**). Unchanged by batch 2 — recorded again because both cards
reappear in the `svellsongur-copy` partner list under exactly the same shape.

---

# Batch 3

Method note added after the manager's warning: from batch 3 on, every candidate is checked against the
CURRENT `data/combos.json` **by card set** (`uses[].card` sorted and joined), plus subsets and
supersets, not only by id — several walk sessions are authoring at once and ids do not collide even
when card sets do. Helper: `/tmp/rc-walks/cardset.mjs`.

## 6. Entries authored

### 6.1 `svellsongur-rumble-scrapper-mechs` — ENGINE, eight Mechs a Hold at ELEVEN Might
Rule mined: `svellsongur-copy`. Partner `SFD-089 Rumble, Scrapper`, uncatalogued with the copier.

**The finding no previous Svellsongur entry had raised: the copy carries a STATIC as well as a
trigger.** Rumble's text is two sentences — *"Your Mechs have +1 Might (including me)"* and *"When I
hold, play a 3 Might Mech unit token to your base"* — and Svellsongur copies *"that unit's text"*,
both of them. **476.1** applies each of the eight composed instances exactly once, so the static
stacks to **+8 Might on every Mech you control**. **187.4** gives the token *"3 Might and the Mech
tag"* by rule, so each of the eight new tokens stands at 11 and Rumble himself at 12.

It is a continuous modifier, not a 702 buff, so 702.3's one-per-unit cap never touches it — the same
distinction CLAUDE.md already draws for Lee Sin, Centered and Soul Shepherd.

### 6.2 `svellsongur-yasuo-remorseful-sweep` — ENGINE, 48 damage as eight aimed instructions
Rule mined: `svellsongur-copy`. Partner `OGN-076 Yasuo, Remorseful` — uncatalogued with the copier
even though it is the card Riot uses to *explain* 359.3.f.

Eight instances, **eight independent choices** of *"an enemy unit here"*, 6 damage each. **359.3.f.2**
(*"Information referenced in an instruction in this way will be checked on execution of the
instruction"*) is quoted with Riot's own Yasuo example rather than argued.

**MONO-CALM** — the widest identity of any Svellsongur line in the catalogue (five legend pairs).

The trap is stated in full: an attack trigger needs the Attacker designation (383.4.e), and entering
an **empty** enemy battlefield gives none (807.1.d, 461). And this is a Deal, not combat damage
(713 / 417.6.c), so none of the 48 feeds the excess-damage family — R28 = A defines excess damage as
attacking **Might** that never got assigned, created by 465.2.c.4.

### 6.3 `svellsongur-trevor-leblanc-plaza` — ALT_WIN, win on the second Hold
Rules mined: `svellsongur-copy` × `leblanc-temporary`.

`leblanc-bashful-bloom-trevor-plaza` runs the same Trevor and the same LeBlanc for **one** Sprite a
Hold and wins on the third. Three Svellsongur make it **eight**, so the first Hold puts ten bodies on
the Plaza and the second wins. And **814.2** applies again: eight copies of Trevor's `[Shield]` make
him **Shield 8**, an 11-Might defender guarding the position.

Separate row rather than a rewrite: the catalogued line has Bashful Bloom as the LEGEND, this one
leaves the legend slot open across four Calm/Mind legends and pays 6 Calm Power it does not.

### 6.4 `sprite-mother-burst-leblanc-plaza` — ALT_WIN, mono-Mind, nine 3-Might bodies
Rule mined: `leblanc-temporary` (13 partners, 1 entry). Partners `OGN-106 Sprite Mother` and
`UNL-069 Sprite Burst`, both uncatalogued.

Nine units and **none of them is a 0-Might Reflection**: `leblanc-temporary-plaza` reaches ten in one
turn but six die to a single point of damage (477.1.b.1.a keeps Might off the copyable traits, as its
own notable records). 465.2.c / 465.2.c.3 price this board at 21 damage minimum.

Every body lands where it is needed with no walk: Sprite Mother says *"here"*, Sprite Burst names no
destination and **355.2.a** allows a battlefield you control. So no Renata, and the identity stays
**mono-Mind**.

### 6.5 `sprite-queen-leblanc-permanent-army` — ENGINE, one permanent body a turn for free
Rule mined: `leblanc-temporary`. Partner `UNL-084 Sprite Queen` — four entries in the catalogue, none
with LeBlanc.

The paragraph that makes it work, and the obvious first reading it refutes:

> **816.1.c.** The Trigger Condition is the controller of the permanent's Beginning Phase **starting**.

The Queen's *"at the start of your Beginning Phase"* trigger and every `[Temporary]` trigger fire at
the same instant, so the Sprite she plays **enters after that condition has already been checked** —
its own `[Temporary]` does not trigger that turn at all. 383.3.d would let you order the simultaneous
triggers anyway, but you do not need to. The Sprite is printed **ready**, so 144.2's exhaust is
payable at once and it walks to LeBlanc's battlefield in the same Main Phase, where 816.1.b never
fires on it again.

Stated honestly: one a turn is slow, and it does **not** feed `bottled-constellation-token-points`,
which needs three bodies at each Main Phase start.

---

## 7. Refusals, batch 3

### 7.1 `OGN-275 Altar to Unity` under `blue-sentinel-hold` — same arithmetic, weaker number
*"When you hold here, play a 1 Might Recruit unit token in your base"* × (1 + K) is exactly
`rumble-scrapper-sentinel-mechs` (batch 1) with 1-Might Recruits instead of 4-Might Mechs, and it
costs a battlefield slot: **485.4.a** puts only one of your three into play, so it competes with The
Grand Plaza and with Power Nexus. Lead, not an entry.

### 7.2 `SFD-117 Ancient Henge` and `SFD-083 Hextech Anomaly` under any readier
`defender-of-tomorrow-readies-gear`, `jayce-readies-exhaust-abilities` and
`heimerdinger-inventor-exhaust-copy` all list them, and a second activation is worth **nothing**:
both print *"Pay any amount"* with **no cap per activation** (which is why
`ancient-henge-energy-surplus` and `hextech-anomaly-power-surplus` exist as rules at all). One
activation already converts the entire Rune Pool. Doubling an uncapped converter is a no-op.

### 7.3 `SFD-168 Vanguard Armory` under `jayce-readies-exhaust-abilities` — already occupied
`jayce-progress-vanguard-armory` (SFD-084 + SFD-168) is the catalogued readier-plus-Armory row, and
`heimerdinger-vanguard-armory-recruits`, `herald-heimerdinger-armory-plaza` and
`armory-heimerdinger-bottled-constellation` cover the copier side. Jayce's own version differs only
in needing a non-token gear played each turn to fire at all — strictly a worse clock for the same
three Recruits. Not authored. (Note also that **VEN-149 Defender of Tomorrow**, the pool's dedicated
gear-readier, is Mind/Body and the Armory is Order: **103.1.b** kills that pairing outright.)

### 7.4 `UNL-084 Sprite Queen` WITHOUT LeBlanc is not an engine
Worth recording because the card reads like one. Every Sprite she makes is `[Temporary]` and born at
the base, so **816.1.b** kills it at the next Beginning Phase: the steady state is exactly one Sprite,
not a growing army. The entry above is the LeBlanc version for that reason, and `leblanc-temporary`'s
own rule text states the general form — *"She only covers her own battlefield, so a token made at your
base has to move there first."*

---

# Batch 4

## 8. Entries authored

### 8.1 `ivern-svellsongur-four-tags-hold` — BURST, 11 points
Rules mined: `svellsongur-copy` × `ivern-friend-to-all-four-tags` (51 partners, 2 entries).

Three Ivern each choose a different one of Bird/Cat/Dog/Poro at play time, so only the fourth tag has
to come from elsewhere. **Stack all three Svellsongur on ONE Ivern**: 8 + 1 + 1 = **10 triggers**,
where one gear per body would be 2 + 2 + 2 = 6. That is the same "compound on one multiplicand"
lesson `svellsongur-copy-hold` records, and here it is worth 4 points.

1 (Score) + 10 = **11**. Against the catalogued `ivern-sentinel-hold` — same three Ivern, two Blue
Sentinels, 1 + 3 × 3 = 10 for 26 Energy in a **Mind/Order** shell. This is 11 for 30 + 5 Energy and
6 Calm Power in a **Calm/Order** one. Both kept, as with `ahri-blue-sentinel-hold` beside
`svellsongur-copy-hold`.

All three Ivern must stand at the SAME battlefield: 383.4.d.2.a puts a unit's Hold Ability on the
Chain only for a unit *"present at a Battlefield when a player maintains control of it"*.

### 8.2 `shadow-temple-sentinel-burn` — ENGINE, and it is written around its own fuse
Rules mined: `blue-sentinel-hold` × `shadow-temple-trash-fuel` (49 partners, 5 entries — and
`VEN-165` appears in **no** entry's `uses`, because those five are the consumers, not the faucet).

3 × `[Burn 3]` = **nine cards a turn**, the largest trash faucet available, by R8 = A (a battlefield's
own Hold trigger is one of "your hold effects": 190.6.a, 190.6.d, 383.4.d.2.b) and R1 = A stacking.

And nine a turn against a 39-card deck (103.2 with 103.2.a.1 removing the Chosen Champion) is about
four Holds. Then **431.1.b** makes the excess a Burn Out and **431.2.b** *"Recycles their trash into
their Main Deck"* — erasing everything the engine spent four turns putting there, on top of 194.1.d's
point for the opponent. Filling the trash and emptying the deck are the same action.

### 8.3 `svellsongur-faefolk-mass-evacuation` — ENGINE, a bloodless Conquer
Rule mined: `svellsongur-copy`. Partner `UNL-112 Irresistible Faefolk` (catalogued twice, never with
the copier).

**One drag closes against a garrison of one; eight closes against any real board.** #102 measured that
ceiling on `UNL-207 Amateur Recital`, and `faefolk-challenger-forced-attacker` runs this same Faefolk
for exactly one drag. Eight independent instances empty a battlefield outright, and then:

> **323.6.** Players lose control of any controlled Battlefields without their Units occupying them if
> the turn is in an Open State and there is no Showdown or Combat ongoing there.

with **170.11.c** (*"unoccupied and uncontrolled"* — **both**, the correction #146 had to make to two
verified entries) it is now **open**, so a second body walks in for 190.3.a.1 → 344.2 → 348.2.a →
348.2.a.1, a Conquer with no combat, no damage and no Attacker designation.

### 8.4 `svellsongur-apprentice-smith-gear-dig` — ENGINE, the Burn-Out-safe one
Rule mined: `svellsongur-copy`. Partner `SFD-041 Apprentice Smith`.

> **431.1.c.** If an instruction directs a player to look at or reveal cards in excess to the number
> of cards in a player's Main Deck, that player looks at or Reveals as many as possible, but **does
> not Burn Out**, then proceeds with the rest of the instruction.

Every other Svellsongur draw line in the catalogue is capped by 431.1.a (`yasuo-stellacorn-svellsongur-draw`
and `twilight-reveler-svellsongur-stellacorn-draw` both stop at four cards a turn). The Smith
*reveals*; only the gear it finds is drawn, and a non-gear goes to the **bottom** (416.1.a / 416.5),
so the engine can neither burn you out nor mill you. Mono-Calm.

### 8.5 `svellsongur-traveling-merchant-discard` — ENGINE, deliberately the mirror of 8.4
Rule mined: `svellsongur-copy`. Partner `OGN-185 Traveling Merchant`.

Eight discard-and-draws a move — the largest repeatable discard outlet in the pool, against #95's
finding that none of the lens's 31 outlets was *"free and repeatable within a turn"*. And eight
**draws**: 431.1.a is a hard clock where 431.1.c was none, so a 39-card deck lasts about four moves.
Authored beside 8.4 on purpose, same body count and same price, opposite rule.

---

## 9. Refusals, batch 4

### 9.1 `SFD-177 Azir, Sovereign` under `svellsongur-copy` — doubling an "any number" is a no-op
*"When I attack, you may move **any number** of your token units to this battlefield."* One instance
already moves the whole army; eight move it again. Same shape as §7.2's uncapped converters, and the
third time this walk has met it — **a multiplier is worth nothing on an effect with no per-execution
cap.** Azir stays a one-instance card and `azir-sovereign-token-gather` remains its only entry.

### 9.2 `OGN-140 Herald of Scales` × `UNL-104 Gentle Gemdragon` — a subset of an existing entry
Looked like a clean Dragon ramp pair (a 2-Energy discount on every Dragon, plus two runes readied per
Dragon played). The card-set check caught it: `gemdragon-henge-vi-blind-fury` already contains BOTH,
inside an eleven-card line. A strict subset of a catalogued entry is not a new entry. Recorded because
the id check alone would not have found it — this is the check the manager asked for after
`rc-walk-payoff` collided by card set.

### 9.3 `SFD-027 Dunebreaker` under `svellsongur-copy` — sixteen draws is a loss, not a payoff
*"When I hold, draw 2."* × 8 instances = 16 cards on a single Hold. 431.1.a makes the overdraw a Burn
Out, 194.1.d gives the opponent a point and 431.2.b recycles the trash back. A 39-card deck cannot
absorb one activation, let alone a repeat. The partner is real and the arithmetic kills it.

### 9.4 `SFD-193 Grandmaster at Arms` × `SFD-180 Fiora, Worthy` — Domain Identity
The relay reads perfectly: Grandmaster's *"[exhaust]: Attach an attached Equipment you control to a
unit you control"* moves a Might-Bonus gear to a fresh sub-5 body every turn, which 709 makes *become*
Mighty, which Fiora readies. But Grandmaster at Arms is a **Calm/Body legend** and Fiora is **Order**:
103.1.b is a subset test against the legend's two domains, and there is no legend that is both. The
colourless `SFD-208 Forge of the Fluft` (*"friendly legends have '[exhaust]: Attach an Equipment you
control to a unit you control'"*) is the only way to give an Order legend that ability, and it costs
the battlefield slot (485.4.a).

---

# Batch 5

## 10. Entries authored

### 10.1 `svellsongur-fae-porter-relay` — ENGINE, the Calm/Chaos answer to the exhausted-token walk
Rule mined: `svellsongur-copy`. Partner `SFD-125 Fae Porter`.

#48 measured that *"exactly ONE card in the pool relocates tokens in bulk — `SFD-177 Azir, Sovereign`"*,
and Azir needs an enemy garrison to attack (807.1.d, 383.4.e). Fae Porter needs only a **move**, moves
**any** unit you control rather than only tokens, and eight instances relocate eight of them. It moves
**exhausted** bodies, because 420.3.a puts the exhaust cost only on the Standard Move — which is what
`SFD-171 Renata Glasc, Industrialist` normally solves, and she is mono-Order and illegal here
(103.1.b.1).

**The cap is the Power, not the instances**, and it is in the front of the entry: each instance is
*"you may pay 1 Chaos Power"*, so eight is eight Chaos Power against #44's measured free floor of 2 a
turn.

### 10.2 `svellsongur-ribbon-dancer-fiora-mass-ready` — ENGINE, mass untap
Rules mined: `svellsongur-copy` × `fiora-buff-ready` (98 partners, 4 entries) — the file's two richest
rules meeting on one card, `SFD-038 Ribbon Dancer`.

709's worked example *is* this card's effect: *"A Unit with Might 4 that gets +1 becomes Mighty."*
Eight instances, each choosing its own friendly unit, so up to eight bodies cross the line and Fiora
readies each for 1 Order Power.

Honoured rather than glossed, because `fiora-buff-ready`'s own `why` says it: the ceiling is **how
many 4-Might bodies you control**, not eight. And the +1 is a continuous modifier, not a 702 buff — so
it stacks on one body, and it feeds no "spend a buff" cost.

### 10.3 `moonlight-affliction-wind-and-ghosts-banish` — ENGINE, permanent removal
Rule mined: `moonlight-affliction-might-gate` (16 partners, 2 entries; #97 recorded 22 Might gates in
the pool with 5 catalogued).

`VEN-106 Wind and Ghosts`' two halves are not equivalent — below the gate it **banishes**, above it
merely bounces — and **108.6.c** means nothing in the pool returns a card from Banishment. So the
Affliction converts a tempo card into the only permanent answer in the lens.

Ordering needs no reading: **813.1.b** gives `[Reaction]` every permission of `[Action]`, so the
Affliction is simply resolved first on your own Main Phase.

### 10.4 `moonlight-affliction-tricksy-tentacles-evacuation` — ENGINE, a bloodless Conquer
Rule mined: `moonlight-affliction-might-gate`. Partner `UNL-054 Tricksy Tentacles`.

The gate is a **sum** (*"a total Might of 8 or less"*), so one Affliction is worth the biggest body's
whole Might: 143.2.b makes the negative read as 0 in the total. And **143.2.b.1** is why a second copy
on the *same* body adds nothing to the sum — aim each at a different defender.

Two earlier corrections applied rather than re-derived: #102's (evacuating is not yet a Conquer —
**323.6** only *strips*, nobody gains, so a body of yours still has to walk in) and #146's
(**170.11.c** requires *both* unoccupied and uncontrolled).

### 10.5 `svellsongur-qiyana-victorious-modal` — ENGINE, and the mode is the safety valve
Rule mined: `svellsongur-copy`. Partner `OGN-155 Qiyana, Victorious`.

Third member of a deliberate set with 8.4 and 8.5 — same multiplier, same price, three different
relationships to Burn Out. Qiyana's *"draw 1 **or** channel 1 rune exhausted"* is resolved eight
separate times, so you take exactly as many cards as the deck can spare (431.1.a) and channel the
rest. The channel half is a **refill, not a ramp** (430.1, 430.3, 161.2.b — #153's correction), and
430.2.a's default *"runes are channeled readied"* is overridden by the card.

---

## 11. A claim of my own that was wrong, caught before shipping

The first draft of 10.3 and 10.4 said Moonlight Affliction's `-10` clears the pool **because the pool
tops out at 10 Might** (`VEN-091 Corrupted Dragon`). Measured against `data/cards.json` instead of
asserted: the largest printed unit Might is **12** — `UNL-059 Master Yi, Unstoppable` and
`UNL-147` / `UNL-238 Baron Nashor`.

The conclusion survives (12 − 10 = 2, and a *"3 Might or less"* gate is satisfied by anything up to
13), but the **margin is 2, not 7**, and that changes what beats the line: 137.3 applies a Might Bonus
to the bearer, the largest in the pool is **+4** (`SFD-178 Blade of the Ruined King`), and
**477.3.e.2.a** applies increases before decreases — so a 12-Might body wearing the Blade stands at 16
and one Affliction leaves 6, over the gate. Both entries now say so, and 10.4's ceiling is stated as a
formula (*8 plus the afflicted body's Might*) instead of a number.

Recorded here rather than quietly fixed: the same shape of error — a ceiling asserted from memory
instead of grepped — is what CLAUDE.md records twice under "count base codes, not grep rows".

---

## 12. Refusals, batch 5

### 12.1 `OGN-159 Warwick, Hunter` under `svellsongur-copy` — the third "no per-execution cap" case
*"When I attack, kill all damaged enemy units here."* One instance kills **all** of them; the other
seven find none. Same verdict as `SFD-117 Ancient Henge`, `SFD-083 Hextech Anomaly` and
`SFD-177 Azir, Sovereign`'s *"any number"*, and by now it is a rule of thumb worth stating before any
doubler is priced: **check whether the effect has a per-execution cap at all.**

### 12.2 `UNL-127 Mister Root` under the three move rules — 16 XP buys nothing
*"When I move to a battlefield, gain 2 XP"* × 8 = 16 XP a move. #116 and #146 already measured that
the 11 Spend-N-XP costs and 20 `[Level N]` clauses are a bounded step function topping at `[Level 16]`
and that **nothing in the pool converts XP into points**. An XP faucet is never an engine on its own,
however large.

### 12.3 `OGN-056 Adaptatron` under `svellsongur-copy` — a doubled buff on a fixed target, again
*"When I conquer, you may kill a gear. If you do, buff me."* 702.3 / 702.3.a make every execution after
the first a no-op on the buff half, and the cost half is killing your own gear. Same shape as §3.3.

### 12.4 `OGN-131 Dune Drake` × the excess-damage payoffs — Domain Identity
*"When I attack, give me +2 Might this turn if there is a ready enemy unit here"* × 8 = a 21-Might
attacker, which is enormous excess damage under R28 = A (465.2.c.4 forbids assigning more than the
minimum needed to kill). But the only card in the pool that turns excess damage into a **point** is
`OGN-034 Tryndamere, Barbarian`, which is **Fury**, and Dune Drake is Body with Svellsongur in Calm:
103.1.b is a subset test against the legend's two domains and no legend covers all three. The Body
payoff `SFD-120 Sivir, Ambitious` is legal and deals the excess as damage, which is removal, not
points. Left as a lead on the removal side.
