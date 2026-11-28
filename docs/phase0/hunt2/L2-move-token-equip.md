# Hunt v2 — Lens L2: movement, tokens, Equipment effects

Agent: L2 PROPOSE. Corpus `corpus_flat.txt` (935 cards) and `rules-primer.md` read in full; `REFUTE_SPEC.md` worked examples and `hunt.md` read. All quotes below are copied from the corpus.

Primer gap flagged up front: the primer contains 144.1–144.4 headers but NOT the sub-bullets 144.1.c ("no Standard Move during Showdown/Combat"), 144.4.a/b (base→battlefield, battlefield→base), nor rules 445 (Movement) or 454 (Recalls). I rely on them as stated in the task and REFUTE_SPEC §B, and mark every step that depends on them.

---

## 0. Calibration

### 0.1 Lux infinite energy — I can see why it closes
- OGN-212 Forge of the Future (Order, E2): `When you play this, play a 1 :rb_might: Recruit unit token at your base. Kill this: Recycle up to 4 cards from trashes.`
- OGN-110 Ekko, Recurrent (Mind, E5 P1 M5): `[Deathknell] — Recycle me to ready your runes.` — 5 Might = Mighty (708), so he is legal Sacrifice fodder.
- UNL-165 Shadow's Call (Order, E2): `Choose a friendly unit without [Temporary]. Give it [Temporary]. Draw 2.`
- UNL-173 Sacrifice (Order, E1, Reaction): `As an additional cost to play this, kill a friendly [Mighty] unit. Draw 2 and channel 1 rune exhausted.`
- With the Main Deck EMPTY, "bottom of deck" (416.1) = next draw. Forge's kill recycles Forge+SC+Sac (3 cards); Ekko's Deathknell recycles Ekko (4). SC draws 2 + Sac draws 2 = exactly 4 → hand is refilled with the same 4 cards, no Burn Out (431). Ekko's Deathknell readies all 11 runes on the board (+11 Energy available) against 10 Energy spent (5 Ekko + 2 SC + 1 Sac + 2 Forge); the 1 Mind Power for Ekko comes from `Recycle this: Add` on an already-exhausted rune (164.2.b — no exhaust in that cost), and Sacrifice channels that rune back. Net +1 Energy, +1 Recruit per pass. Closes.

### 0.2 Infinite Recruits — I can see why it closed (and why the fix was banning the mover)
- OGN-177 Stealthy Pursuer (Chaos, E4 P1 M4) `[BANNED …] When a friendly unit moves from my location, I may be moved with it.`
- SFD-153 Eye of the Herald (Order, E1 M+0) `[Equip] :rb_rune_order: … [Effect] When I move, play a 1 :rb_might: Recruit unit token here.`
- SFD-171 Renata Glasc, Industrialist (Order, E4 P1 M4) `Your tokens enter ready.`
- Eye on Pursuer. A ready Recruit Standard-Moves base→controlled battlefield (exhausting itself, 144.2). Pursuer "may be moved with it": an effect move, not a Standard Move → Pursuer never exhausts. Pursuer moved → Eye's `When I move` → Recruit `here` (Pursuer's new location) → enters READY (Renata) → it Standard-Moves battlefield→base → Pursuer follows → Recruit at base … Each iteration costs nothing and yields +1 Recruit. The loop is fuelled by the tokens it makes; the only free piece was the follower. Closes; Chaos+Order legend (Heart of the Tempest VEN-155).

The structural lesson for this lens: an infinite move loop needs (a) a unit that is moved WITHOUT exhausting, in BOTH directions, repeatably, and (b) a "when I move" payoff that refuels (a). Every candidate below is tested against that.

---

## 1. Lens index (card codes)

### 1.1 Equipment with `[Effect]` text (31 true Equipment + 1 anomaly)
| code | name | dom | Might bonus | Effect (granted to bearer) |
|---|---|---|---|---|
| SFD-009 | Serrated Dirk | Fury | +0 | `[Assault 2]` |
| SFD-016 | Recurve Bow | Fury | +0 | `When I attack or defend, deal 2 to an enemy unit here.` |
| SFD-030 | Skyfall of Areion | Fury | +2 | `My hold effects are also conquer effects, and vice versa.` |
| SFD-033 | Doran's Shield | Calm | +1 | `[Tank]` |
| SFD-042 | Brutalizer | Calm | +1 | `If this was attached to me this turn, I have an additional +2 :rb_might:.` |
| SFD-051 | Guardian Angel | Calm | +1 | `If I would die, kill Guardian Angel instead. Heal me, exhaust me, and recall me.` |
| SFD-064 | Cloth Armor | Mind | +0 | `[Shield 2]` |
| SFD-073 | Experimental Hexplate | Mind | +1 | `I am a Mech.` |
| SFD-086 | World Atlas | Mind | +2 | `When I hold, play two Gold gear tokens exhausted.` |
| SFD-090 | The Zero Drive | Mind | +2 | `[Deathknell] — Banish me.` (+ own text: `3E+Mind, Banish this: Play all units banished with this`) |
| SFD-102 | Hexdrinker | Body | +1 | `[Deflect]` |
| SFD-108 | Warmog's Armor | Body | +1 | `When I conquer, buff me.` |
| SFD-115 | Trinity Force | Body | +2 | `When I hold, score 1 point.` |
| SFD-118 | Boneshiver | Body | +2 | `When I conquer, channel 1 rune exhausted.` |
| SFD-124 | Doran's Ring | Chaos | +1 | `When I conquer, discard 1, then draw 1.` |
| SFD-133 | Boots of Swiftness | Chaos | +2 | `[Ganking]` |
| SFD-134 | Cull | Chaos | +1 | `When I conquer, play a Gold gear token exhausted.` |
| SFD-150 | Last Rites | Chaos | +2 | `When I conquer or hold, you may play a unit from your trash. (You still pay its costs.)` (Equip: Chaos + recycle 2 from trash) |
| SFD-153 | Eye of the Herald | Order | +0 | `When I move, play a 1 :rb_might: Recruit unit token here.` |
| SFD-172 | Sacred Shears | Order | +1 | `[Deathknell] — Draw 1.` |
| SFD-190 | Forgefire Cape | Calm/Mind | +3 | `When I attack or defend, deal 2 to all enemy units here.` [Unique] |
| SFD-191 | Rabadon's Deathcrown | Calm/Mind | +3 | `Your spells and abilities deal 3 Bonus Damage` [Unique] |
| SFD-192 | Shurelya's Requiem | Calm/Mind | +2 | own: `When you play this, ready your units.` Effect: `Your units here have [Ganking].` [Unique] |
| UNL-019 | Blighted Battleaxe | Fury | +4 | `At the end of your turn, if I didn't conquer this turn, unattach this and deal 4 to me.` |
| UNL-039 | Soul Sword | Calm | +1 | `[Level 3] I have an additional +1` |
| UNL-096 | Hunter's Machete | Body | +2 | `[Hunt]` |
| UNL-188 | Hextech Gauntlets | Fury/Order | +3 | `When I conquer, if you assigned 3 or more excess damage, draw 1.` |
| VEN-011 | Pendulum Blade | Fury | +1 | `When I move to a battlefield, give me +2 :rb_might: this turn.` |
| VEN-027 | Hand Hammer | Calm | +1 | `I have +2 :rb_might: while I'm at a battlefield with exactly one other unit you control.` |
| VEN-073 | Jagged Cutlass | Body | +2 | `I can't be moved by enemy spells and abilities.` |
| VEN-137 | Shady Spectacles | Order | +0 | own: `As this is attached to a unit, choose another friendly unit. The equipped unit becomes a copy of that unit for as long as this is attached to it.` Effect: `(I am a copy of the chosen unit.)` |
| VEN-103 | Shadows of the Past | Chaos | — | SPELL with stray `[Effect] 1` — data anomaly, not Equipment |

Equipment with NO effect (9): SFD-022 Long Sword, SFD-056 Sterak's Gage, SFD-059 Svellsongur (copies bearer text — see hunt A-06), SFD-095 Doran's Blade, SFD-139 Edge of Night, SFD-161 B.F. Sword, SFD-178 Blade of the Ruined King, SFD-186 Spinning Axe, UNL-158 Shepherd's Heirloom. Total Equipment tag = 40.

Rules load-bearing for Equipment: 718.2 (attached card's printed Rules Text is INACTIVE), 718.3/434.1.c (Effect Text appended to bearer), 725.3 + 821.1.c (Weaponmaster is the carve-out that re-activates an attached card's Equip), 434.1.f (attaching to a new bearer detaches), 719.5 (bearer leaves board → detach), 435.4.a (detached gear at a battlefield is recalled at cleanup). Consequence used repeatedly below: **an Equipment's own `[Equip]` ability cannot be activated while it is attached** (it is Inactive, 721.2); re-equipping needs Weaponmaster, a detach effect, or the bearer leaving the board. This also worsens hunt B-22 (Jax) — see §4.

### 1.2 "When I move" / move-triggered payoffs (on the mover itself)
UNL-022 Jhin, Murderous Artist (Fury, Ganking) `When I move, [Add] :rb_energy_1::rb_rune_rainbow:.` · SFD-130 Treasure Hunter (Chaos) `When I move, play a Gold gear token exhausted.` · SFD-153 Eye of the Herald (Order, Equipment) · UNL-082 Lillia, Fae Fawn (Mind) `When I move from a location, play a 3 :rb_might: Sprite unit token with [Temporary] there.` · OGN-222 Noxian Drummer (Order) `When I move to a battlefield, play a 1 :rb_might: Recruit unit token here.` · SFD-179 Corina Veraza (Order, Accelerate) `When I move to a battlefield, play three 1 :rb_might: Recruit unit tokens here.` · SFD-048 Stellacorn Herder (Calm) `When I move, draw 1.` · UNL-080 Hwei (Mind) `When I move, draw 1, then discard 1 … Gear — Ready up to 2 runes.` · OGN-185 Traveling Merchant · SFD-041 Apprentice Smith · VEN-033 Pakaa Protector · VEN-016 Eclipse Dragon · VEN-057 Covert Informant (Empowered) · VEN-021 Akali, Deadly Weapon · VEN-095 Shadow Order Disciple · VEN-002 Blade Twirler (first move each turn) · UNL-115 Nilah (XP) · UNL-127 Mister Root (XP) · VEN-111 Minah Swiftfoot · UNL-179 Rift Herald · SFD-112 Kato the Arm · SFD-038 Ribbon Dancer · SFD-137 Harpoon Squad · VEN-038 Akali, Silent · VEN-011 Pendulum Blade · SFD-123 Corrupt Enforcer · UNL-105 Imposing Challenger · UNL-112 Irresistible Faefolk · OGN-162 Miss Fortune, Captain `The first time I move each turn, you may ready something else that's exhausted.` · OGN-205 Yasuo, Windrider `The third time I move in a turn, you score 1 point.` · OGN-189 Kayn.

### 1.3 Effects that MOVE a friendly unit (effect moves = no exhaust on the moved unit)
Repeatable, non-exhaust, no once-per-turn:
- SFD-082 Ezreal, Dashing (Mind) `:rb_rune_mind:: [Action] — Move me to your base.` (self only, one direction)
- VEN-112 Zed, Without a Sound (Chaos) `When I conquer, play a 0 :rb_might: Shadow Clone unit token to your base. [Action] :rb_energy_1::rb_rune_chaos:: Move me and a Shadow Clone you control to each other's locations.` (TWO units, both directions — the only such effect in the pool that I found)
- SFD-125 Fae Porter (Chaos) `When I move to a battlefield, you may pay :rb_rune_chaos: to move a unit you control to the same battlefield.` (trigger; Porter's own move is a Standard Move)
- UNL-144 Maduli the Gatekeeper (Chaos) `I can't be readied. :rb_rune_chaos:: Move me to an occupied enemy battlefield if my Might is greater than the total Might of enemy units there.` (self, enemy battlefields only)
- SFD-177 Azir, Sovereign (Order) `When I attack, you may move any number of your token units to this battlefield.`
Gated: SFD-050 Azir, Ascendant (`Use only once per turn`), UNL-045 Forgotten Signpost (gear exhaust + exhaust a unit), OGN-184 The Syren (exhaust), OGN-259 Unforgiven / VEN-139 Rogue Assassin / UNL-201 Voidreaver (legend exhaust), OGN-199 Tideturner (play trigger), SFD-079 Bard (play + legend exhaust), SFD-126 Loyal Pup (`When you defend`), UNL-055 Vex, Mocking (on stun), UNL-050 Iascylla (hold). Spells: OGN-173 Ride the Wind, VEN-034 Resonating Strike, SFD-184 Relentless Pursuit, OGN-270 Showstopper, OGN-250 Stormbringer, OGN-262 Zenith Blade, SFD-043 Emperor's Divide, OGS-011 Flash, UNL-083 Smoke and Mirrors, UNL-101 Call to Battle, UNL-202 Void Assault, VEN-140 Shuriken Flip (Flow), VEN-105 Twilight Step (Flow), OGN-168 Fight or Flight (BANNED). Recalls (Zhonya's, Guardian Angel, Soraka, Symbol of the Solari, Tactical Retreat, Highlander, Unlicensed Armory) print `This isn't a move` and do not trigger anything above.

### 1.4 Ganking sources
Native: OGN-036 Vi, OGN-112 Kai'Sa Evo, OGN-162 Miss Fortune, OGN-189 Kayn, OGN-194 Nocturne, OGN-205 Yasuo, OGN-231 Ledros, OGS-009 Yi Honed, SFD-096 Laurent Bladekeeper, UNL-005 Revna, UNL-022 Jhin, UNL-024 Rengar Unseen, UNL-028 Pyke, UNL-115 Nilah, UNL-170 Atakhan. Conditional: OGN-019, OGN-125, OGN-157 Udyr, OGN-232 Fiora Vict., SFD-143 Sivir, UNL-075, UNL-108, UNL-113, UNL-126 Megatusk, VEN-006, VEN-070, VEN-088, VEN-092, VEN-093, VEN-134. Granted: SFD-133 Boots of Swiftness (Equipment), SFD-192 Shurelya's Requiem (Effect: `Your units here have [Ganking]`), OGN-297 Windswept Hillock (battlefield), OGN-267 Bounty Hunter (legend exhaust), SFD-007 Gem Jammer (play), UNL-010 Vault Breaker (spell), SFD-071 Breakneck Mech (Mechs). Ganking only widens Standard-Move destinations (810.1.c) — it never removes the exhaust cost (144.2), so it is never a loop piece by itself.

### 1.5 Token makers by token type
- Recruit (1 M): OGN-117 Viktor Innovator, OGN-211 Faithful Manufactor (`here`), OGN-212 Forge (base), OGN-218 Vanguard Captain (`here`, Legion), OGN-222 Noxian Drummer, OGN-239 Machine Evangel (Deathknell, base), OGN-246 Viktor Leader, OGN-265 Herald of the Arcane (legend, 1E exhaust), OGN-275 Altar to Unity, OGS-015 Recruit the Vanguard, SFD-153 Eye of the Herald, SFD-168 Vanguard Armory (exhaust: 3), SFD-179 Corina (3), VEN-128 Noxian Emissary (Empowered Deathknell: 2).
- Gold (gear: `[Reaction] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:`): SFD-004 Bushwhack, SFD-020 Draven Vanquisher (BANNED), SFD-063 Chemtech Cask, SFD-069 Plundering Poro (conquer), SFD-070 Wages of Pain, SFD-074 Pickpocket, SFD-081 Card Sharp, SFD-086 World Atlas (hold, 2), SFD-101 Fae Dragon (spend a buff), SFD-121 Black Market Broker, SFD-130 Treasure Hunter (move), SFD-134 Cull (conquer), SFD-152 Eminent Benefactor (hold, 2), SFD-155 Honest Broker (Deathknell), SFD-162 Blood Money (2 if friendly), SFD-174 Trove Golem (4), SFD-201 Chem-Baroness (hold, legend exhaust), SFD-203 Battle Mistress (rune recycle, legend exhaust), SFD-220 Treasure Hoard, UNL-018 Yeti Brawler, UNL-073 Deadly Flourish, UNL-145 Pyke Returned (once each turn), UNL-185 Bloodharbor Ripper (legend). ALL print `exhausted`.
- Sprite (3 M, Temporary, mostly already `ready`): OGN-094, OGN-106, UNL-048, UNL-069, UNL-078, UNL-084, UNL-189 Bashful Bloom; UNL-082 Lillia Fae Fawn (not printed ready).
- Sand Soldier (2 M): SFD-031 Desert's Call (Repeat), SFD-154 Guards!, SFD-157 Royal Guard, SFD-198 Arise!, SFD-207 Emperor's Dais, SFD-247 Emperor of the Sands (legend, 1E exhaust, `Sand Soldiers you play have [Weaponmaster]`).
- Mech (3 M): SFD-019 Assembly Rig, SFD-076 Production Surge, SFD-089 Rumble Scrapper (hold), VEN-051 Iterative Design, VEN-087 Hextech Disc.
- Bird (1 M Deflect): UNL-033, UNL-044, UNL-088 Gutter Palace, UNL-130, UNL-153, UNL-160 Ultrasoft Poro (exhaust: 2), UNL-217.
- Reflection (copy; `I don't get that card's play effects`): UNL-081, UNL-199 Deceiver (legend, `ready … there`), UNL-200 Mirror Image (`ready … to your base`, Temporary).
- Shadow Clone (0 M): VEN-023, VEN-112 Zed, VEN-144 Death Mark. Tentacle: VEN-100, VEN-109.
- Token-doubling/buffing: UNL-086 Zilean (`Once each turn`), UNL-077 Soul Shepherd (+1), UNL-058 Lillia Protector (+1 this turn, Tank).
- Entry-state overrides: SFD-171 Renata Industrialist `Your tokens enter ready.`; OGN-011 Magma Wurm `Other friendly units enter ready.`; OGN-129 Confront; SFD-004 Bushwhack; UNL-191 Wuju Master Level 11; SFD-029 Rek'Sai Breacher (Accelerate for units played from elsewhere).

---

## 2. Candidates (run 2, 2026-09-03)

Run 2 note: run 1 died after building §1 (watchdog). This section is appended incrementally; the reading log below records corpus coverage so a third run can resume.

### 2.0 Reading log
- Corpus slice 1 (lines 1–250, OGN-001…OGN-250) — in progress.
- Slice 1 (lines 1–250, OGN-001…OGN-251) read. Lens hits already in §1; new rule facts pulled: **185 Tokens are not cards** (350.2: but they can be Played), **702.3 one Buff per unit**, **709 becomes-Mighty is a crossing**.
- Slice 2 (lines 251–500, OGN-252…SFD-179) read. New for the lens: SFD-177 Azir, Sovereign `When I attack, you may move any number of your token units to this battlefield` (effect move of tokens, once per attack); OGN-259 Unforgiven `2E, exhaust: Move a friendly unit to or from its base` (legend, 1/turn); SFD-125 Fae Porter; SFD-050 Azir, Ascendant (once per turn).
- Slice 3 (lines 501–750, SFD-180…UNL-208) read. New: UNL-083 Smoke and Mirrors (Temporary-gated swap spell), UNL-186 Death from Below (self-recurring kill for 1 rainbow, no Flow), UNL-009 Upstage Comedy / SFD-204 On the Hunt / UNL-160 Ultrasoft Poro, SFD-193 Grandmaster at Arms + SFD-208 Forge of the Fluft (re-equip, 1/turn), SFD-221 Veiled Temple (detach on conquer).
- Slice 4 (lines 751–941, UNL-209…VEN-SP2) read. New: VEN-112 Zed, Without a Sound (see L2-01), VEN-137 Shady Spectacles, VEN-027 Hand Hammer, VEN-022 Endless Riches, VEN-144 Death Mark, VEN-155 Heart of the Tempest (the ONLY Order/Chaos legend in the pool — grep `| Legend | Order/Chaos |`).
- Grep checks: `moved with` matches only OGN-177 Stealthy Pursuer; `move me and` / `each other's location` match only VEN-112 Zed (plus damage-exchange spells). Rules pulled: 372 (controller orders conflicting replacement effects), 369.3 ("enters ready/exhausted" text IS a replacement effect), 430.4.a (channel 2 runes per turn), 469.2 (Hold = maintain control during your Beginning Phase), 820.1.c.3 (each Repeat cost once).

### 2.1 Rift Mana "Infinite Combo" deck (Herald of the Arcane) — VERDICT: no loop closes without Stealthy Pursuer

Cards as listed, quoted from the corpus:
- OGN-265 Herald of the Arcane (Legend, Mind/Order): `:rb_energy_1:, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token.`
- SFD-153 Eye of the Herald (Gear, Order, E1 M+0): `[Equip] :rb_rune_order: (…Attach this to a unit you control.) [Effect] When I move, play a 1 :rb_might: Recruit unit token here.`
- SFD-171 Renata Glasc, Industrialist (Order, E4 P1 M4): `Your tokens enter ready.`
- SFD-180 Fiora, Worthy (Order, E3 M3): `When a unit you control becomes [Mighty], you may pay :rb_rune_order: to ready it.`
- SFD-166 Rally the Troops (Order, E2, Action): `When a friendly unit is played this turn, buff it. (If it doesn't have a buff, it gets a +1 :rb_might: buff.) Draw 1.`
- OGN-087 Lecturing Yordle (Mind, E3 M2): `[Tank] … When you play me, draw 1.`
- OGN-117 Viktor, Innovator (Mind, E4 P1 M3): `When you play a card on an opponent's turn, play a 1 :rb_might: Recruit unit token in your base.`
- OGN-113 Malzahar, Fanatic (Mind, E4 M3): `Kill a friendly unit or gear, :rb_exhaust:: [Action] — [Add] :rb_rune_rainbow::rb_rune_rainbow:.`

Test against the lens criteria: (a) a unit moved WITHOUT exhausting, in both directions, repeatably; (b) a "when I move" payoff that refuels (a). The list has (b) — Eye of the Herald — and has NO (a). Every unit in the list moves only by Standard Move, whose cost is exhausting the unit (144.2); nothing in the list moves a unit by effect. I walked the four ways the list could try to close and each fails at a specific step:

**Attempt A — Eye-bearing Recruit ping-pong (the banned loop minus the follower).**
1. Renata on board. Herald: pay 1E, exhaust legend → Recruit R1, enters ready (Renata). Equip Eye to R1 (1 Order Power).
2. R1 Standard-Moves base → a battlefield you control (144.4.a). Cost: exhaust R1 (144.2). Eye triggers → Recruit R2 `here`, enters ready.
3. R2 Standard-Moves battlefield → base (exhausts R2). R2 wears no Eye → no trigger. R1 is exhausted and cannot move again this turn.
4. To continue, the Eye must go to R2. While attached, the Eye's own `[Equip]` text is INACTIVE (718.2, 434.1.e); the carve-outs are Weaponmaster (725.3/821.1.c), a detach effect (Angle Shot, Strike Down, Veiled Temple) or Grandmaster at Arms / Forge of the Fluft — none of which is in the list. **Fails at step 4.** Yield: exactly one extra Recruit per Eye per turn.
   (Stealthy Pursuer supplied (a): `When a friendly unit moves from my location, I may be moved with it` — an effect move, so the Eye-bearer never exhausted. Grep shows it is the only "moved with" text in the pool.)

**Attempt B — Fiora readies the Eye-bearer.**
Fiora needs a unit to *become* Mighty (709: a crossing from <5 to ≥5; already-Mighty units do not re-trigger). Buffs: one per unit (702.3), +1 each (703), so three Rally the Troops give +1, not +3. Might after a buff: Recruit 1→2, Lecturing Yordle 2→3, Malzahar/Viktor/Fiora 3→4, Renata 4→**5**. Only Renata ever crosses, and she crosses once (nothing in the list lowers her Might to re-arm 709). So Fiora readies Renata one time (pay 1 Order) when she is played with a Rally trigger pending; Renata has no exhaust ability and, wearing the Eye, gets one Standard Move (exhaust) → one Recruit. **Fails: no repeat crossing.** This is the same 3+1=4 ≠ 5 arithmetic as the calibration failure in REFUTE_SPEC.

**Attempt C — Viktor, Innovator on the opponent's turn.**
`When you play a card on an opponent's turn` — Herald's Recruit is a token, and **185. Tokens are not cards** (350.2 says tokens can be played, not that they are cards), so Herald's ability never triggers Viktor. Rally the Troops is an [Action] (`Play on your turn or in showdowns`), so it can be played in a showdown on the opponent's turn: Viktor → 1 Recruit in base (ready via Renata), Rally's delayed trigger buffs it (2 Might), Rally draws 1. Lecturing Yordle has no Reaction/Ambush and cannot be played on the opponent's turn. **Bounded by the three Rally copies: ≤3 Recruits per opponent turn, no loop.**

**Attempt D — Malzahar converts Recruits to Power.**
`Kill a friendly unit or gear, :rb_exhaust:: Add 2 rainbow` costs Malzahar's exhaust; he is 3 Might (4 buffed), never Mighty, so Fiora cannot ready him. **One activation per Malzahar per turn: +2 Power for a Recruit, no loop.**

Ceiling of the list per turn (no loop): Herald 1 + one Eye-bearer move per Eye (≤3) + Viktor per Rally in a showdown (≤3) + Rally buffs. That is a Recruit-swarm deck, not an infinite. The list is exactly the banned Recruit loop's shell (Eye + Renata + Recruit makers) with the mover removed, which is consistent with a pre-ban build whose title outlived the 2026-07-24 ban; I cannot check the site (local files only), so treat that provenance as inference, not fact. Confidence in the verdict: **high** — every step above cites the rule or the printed text that stops it.

### 2.2 Candidates

#### L2-01 `zed-clone-eye-recruits` — ENGINE, terminates in ALT_WIN (The Grand Plaza)  [top candidate]
- Cards:
  - VEN-112 Zed, Without a Sound (Chaos, E5 M5): `When I conquer, play a 0 :rb_might: Shadow Clone unit token to your base. … [Action] :rb_energy_1::rb_rune_chaos:: Move me and a Shadow Clone you control to each other's locations.`
  - SFD-153 Eye of the Herald ×2 (Order, E1 M+0, Equip 1 Order): `[Effect] When I move, play a 1 :rb_might: Recruit unit token here.` — one on Zed, one on the Shadow Clone.
  - SFD-171 Renata Glasc, Industrialist (Order): `Your tokens enter ready.` (optional with two Eyes; required with one — see arithmetic)
  - OGN-293 The Grand Plaza (Battlefield): `When you hold here, if you have 7+ units here, you win the game.`
- Legend: VEN-155 Heart of the Tempest (Order/Chaos) — the only Order/Chaos legend in the pool.
- Why it passes the lens test: Zed's ability is an effect move of BOTH units in BOTH directions (base ↔ battlefield) with no exhaust in its cost and no "once each turn" text, so (a) holds; two Eyes give (b) on every swap. It does not refuel its own Energy/Power cost, which is why this is ENGINE and not INFINITE.
- Preconditions: Zed at battlefield X that you control (he conquered it earlier, so his Clone sits at your base); Eye #1 attached to Zed and Eye #2 to the Clone (tokens are units, 187.11; `Attach this to a unit you control`); Renata on board; 12 runes ready with ≥6 Chaos runes in the Rune Deck; Main Phase.
- Loop (one iteration = one activation):
  1. Pay 1 Energy (exhaust a rune, 164.2) + 1 Chaos Power (recycle a Chaos rune, 164.2.b — no exhaust needed; the rune returns to the Rune Deck, 416.1.b).
  2. Resolve: Zed X → base and Clone base → X. Both are Move actions (420.1), not Standard Moves, so 144.2's exhaust cost does not apply; neither unit needs to be ready.
  3. Eye #1 (on Zed) triggers `When I move` → Recruit at base. Eye #2 (on the Clone) triggers → Recruit at X. Both enter ready (Renata).
  4. Activate again: Zed base → X, Clone X → base → Recruit at X (Eye #1) and Recruit at base (Eye #2).
  5. Repeat while runes last.
- Per-iteration arithmetic: −1 Energy (1 rune exhausted), −1 Chaos Power (1 rune recycled), **+2 ready 1-Might Recruits**, one at X and one at base. No card is spent. With 12 runes: 6 activations → 6 runes exhausted + 6 recycled → 12 Recruits (6 at X, 6 at base). After an even number of swaps Zed is back at X. Base Recruits are ready → each Standard-Moves base → X (144.4.a, X is yours) → **X holds Zed + 12 Recruits = 13 units** (≥ 7). With only ONE Eye (on Zed) and Renata: 6 swaps → 3 Recruits at X + 3 at base that walk over → Zed + 6 = 7 exactly. With two Eyes and NO Renata: base Recruits enter exhausted and stay home, but X still gets 6 + Zed = 7. Renata and the second Eye are each individually optional; having both gives slack for removal.
- Kill: at your next Beginning Phase you Hold X (469.2) → Grand Plaza's trigger → win. The 7+ is checked at hold, so the opponent gets one turn to break the board (13 units, 17 Might total, contest by conquering). Recharge: Awakening readies the 6 exhausted runes and the Channel Phase returns 2 of the 6 recycled ones (430.4.a) → ~8 runes next turn → 4 more swaps → +8 Recruits. The engine is unbounded across turns.
- Rules relied on: 420.1, 144.2 (cost applies to Standard Move only), 143.4 vs Renata's replacement (369.3), 187.11 (Shadow Clone is a unit token), 434.1.c/718.3 (Eye's Effect text appended to bearer), 164.2/164.2.b, 416.1.b, 430.4.a, 469.2, 470 (Plaza is a win trigger, not Scoring), 103.1.b (domains ⊆ Order/Chaos).
- Best attack and why it survives: (1) "`When I move` doesn't fire on an effect move" — the primer defines Move as any change of location (420.1) and gives Standard Move as one kind (420.3); Stealthy Pursuer's Riot-confirmed loop relied on exactly this reading. (2) "The Clone can't be equipped" — it is a unit token (187.11); Eye says `a unit you control`. (3) "The Recruit goes to Zed's old location" — `here` in an Effect appended to the bearer is the bearer's current location after the move resolves; the same reading Riot's Pursuer statement used (`Recruit here` at the destination). (4) Timing: [Action] — Main Phase on your turn is legal (381). (5) No Clone without a conquer — that is a precondition, not a refutation; Zed conquers X first (Death Mark and Zed, From the Shadows are Fury and illegal under this legend). (6) Battlefield dependence: Plaza must be the battlefield in play (random in Duel 485.5, chosen in Match 486.5) — flagged, not refuting; without the Plaza the engine still makes ~12 ready bodies a turn for a wide conquer.
- Missing pieces a real deck needs: a way to get the Plaza into play/format choice, protection for the board during the opponent's turn (Renata is the lynchpin for removal), and enough Chaos runes (6+ of 12) or a Gold source (see L2-02) for the Power half of each swap.
- UNRESOLVED: whether Zed's Recruit from a swap that ends at an enemy-occupied battlefield starts combat — irrelevant to the loop as written (both endpoints are yours).
- Class: ENGINE → ALT_WIN. Confidence: **high** that the engine works as written; **medium** on the win (one-turn window for the opponent, format-dependent battlefield).

#### L2-02 `renata-ready-gold` — ENGINE multiplier (rules reading), medium
- Cards: SFD-171 Renata Glasc, Industrialist `Your tokens enter ready.` + any `play a Gold gear token exhausted` source. Gold (UNL-T05 / 187.5): `[Reaction] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.`
- Claim: with Renata on board, Gold tokens enter READY and are cashable immediately. Argument: `play a Gold gear token exhausted` and `Your tokens enter ready` are both replacement effects on how the token enters (369.3: "Replacement Effects that apply to a unit as it enters the Board can be identified by describing how the unit enters" — the primer's own example is `I enter ready`). When two replacement effects apply to one event, **372: the controller of the object being acted on determines the order** — the token's controller is the Gold's controller (182/191.1) — so I apply "exhausted" first and Renata's "ready" last. If instead the creating effect's `exhausted` is read as the base stipulation (184.1) rather than a replacement, Renata's replacement still turns it into "ready". Both readings end ready.
- Why it matters for this lens: it converts every Gold-on-move / Gold-on-hold source into same-turn Power, and it fixes the phase problem in the catalogued hold lines: the Awaken Phase (315.1, readies everything, 415.3.a) happens BEFORE the Beginning Phase hold scoring (315.2, 469.2), so Gold made by a hold effect is normally dead until next turn.
- Concrete uses (all Order-compatible): SFD-130 Treasure Hunter (Chaos) `When I move, play a Gold gear token exhausted` → +1 rainbow per move; SFD-162 Blood Money (Order, E2) kill your own Recruit → 2 ready Gold = 2 rainbow (a 2E→2P converter that also fuels L2-01's Chaos half); SFD-174 Trove Golem → 4 rainbow on play; SFD-152 Eminent Benefactor / SFD-086 World Atlas → 2 rainbow on hold, usable that turn; SFD-201 Chem-Baroness (Mind/Order legend) hold Gold, and `While your score is within 3 points of the Victory Score, your Gold [Add] an additional :rb_energy_1:` → each ready Gold is 1 rainbow + 1 Energy.
- Not a loop by itself; no card here refunds its own cost. Class ENGINE. Confidence: **medium** — UNRESOLVED: does Riot treat a token-creation stipulation (184.1) as a replacement effect subject to 372, or as a higher-priority definition of the token? A ruling on Renata + Bushwhack/Cull would settle it.

#### L2-03 `corina-effect-moves` — ENGINE → ALT_WIN (Grand Plaza), medium-low
- Cards: SFD-179 Corina Veraza (Order, E7 P1 M6, Accelerate 1E+1 Order): `When I move to a battlefield, play three 1 :rb_might: Recruit unit tokens here.`; movers that do not exhaust her: SFD-050 Azir, Ascendant (Calm, E6 P1 M6) `:rb_rune_calm:: [Action] — Choose a unit you control. Move me to its location and it to my original location. … Use only once per turn.`; UNL-045 Forgotten Signpost (Calm gear, E2) `[Action] Exhaust a unit you control, :rb_exhaust:: Move a different unit you control to the location of the unit you exhausted to pay for this ability.`; VEN-034 Resonating Strike (Calm, E2 P1, Reaction/Hidden) `Choose a battlefield you control and a unit you control at a different location. Move that unit to that battlefield`; SFD-171 Renata (tokens ready); OGN-293 The Grand Plaza.
- Legend: Calm/Order — OGN-261 Radiant Dawn, SFD-247 Emperor of the Sands, UNL-195 Green Father or VEN-147 Eye of Twilight.
- One-turn line (12 runes): play Corina with Accelerate (8E + 2P), she enters ready → Standard Move base → battlefield X you control (exhausts her): +3 Recruits at X (ready). Azir already at battlefield Y: pay 1 Calm → Corina to Y, Azir to X: +3 at Y. Signpost: exhaust a ready Recruit at X + exhaust gear → Corina to X: +3 at X. Total 9 Recruits + Corina for 8E + 3P; ready Recruits at Y walk to X. X holds Corina + 9 = 10 ≥ 7 → Plaza hold next Beginning Phase.
- Limits: Azir `once per turn`, Signpost is a gear exhaust (1/turn unless readied — VEN-149 Defender of Tomorrow is Mind/Body, illegal here), Resonating Strike is a spell. So ≤ 3 Corina moves per turn ≈ 9 Recruits; ENGINE bounded per turn, repeatable across turns. Every move trigger is "to a battlefield", so moves to base (Emperor's Divide, Unforgiven) yield nothing.
- Attack: Corina is 7-cost and dies to any kill spell before the hold; Azir's swap moves *him* off the Plaza. Survives as an engine; the win needs the Plaza format choice (486.5). Confidence: **medium-low**. It is a refinement of the catalogued `grand-plaza-recruit-vanguard` (new Recruit engine), not a new class.

#### L2-04 `jhin-move-mana` — ENGINE (converter), low
- UNL-022 Jhin, Murderous Artist (Fury, E4 P1 M4, Ganking): `When I move, [Add] :rb_energy_1::rb_rune_rainbow:.` Each Standard Move exhausts him (144.2), so the engine is bounded by ready effects: OGN-173 Ride the Wind (Chaos, E2 P1) `Move a friendly unit and ready it` → Jhin moves (+1E +1P), is readied, Standard-Moves (+1E +1P): +2E +2P for 2E + 1P = **+1 Power net per copy**, Jhin ends exhausted. UNL-009 Upstage Comedy (Fury, E2, Repeat E2): two readies for 4E → two moves → +2E +2P: net −2E +2P (a converter). OGN-162 Miss Fortune, Captain (Body) `The first time I move each turn, you may ready something else` → +1 Jhin move per turn.
- Legend: Fury/Chaos for Ride the Wind (OGN-251 Loose Cannon, SFD-185 Glorious Executioner, UNL-185 Bloodharbor Ripper, VEN-143 Master of Shadows). No repeatable free mover exists for Jhin (Zed moves only himself and a Clone; Fae Porter's trigger is on Porter's own Standard Move). Not a loop; listed because it is the only move payoff that pays in Energy AND Power. Confidence: **high** that it is only a converter.

#### L2-05 `azir-sovereign-eye-tokens` — ENGINE, low
- SFD-177 Azir, Sovereign (Order, E4 M4): `When I attack, you may move any number of your token units to this battlefield.` Every token that arrives is effect-moved (no exhaust). Tokens wearing SFD-153 Eye of the Herald each make a Recruit `here`; under SFD-247 Emperor of the Sands (Calm/Order) `Sand Soldiers you play have [Weaponmaster]` the Eye's Equip (1 Order) is paid `for :rb_rune_rainbow: less` = free when the Soldier is played, sidestepping the Inactive-Equip problem (821.1.c). Three Eyes on three Soldiers → +3 Recruits per Azir attack, plus the Soldiers themselves join the attack ready-or-not (a moved unit need not be ready). Once per attack; Azir's attack is a Standard Move (exhaust). Bounded to 1 trigger/turn without a ready effect. Confidence: **high** that it works, **low** that it matters.

### 2.3 Explored and dropped (failing step named)
- **Any Eye-hopping loop**: an attached Equipment's own `[Equip]` is Inactive (718.2, 434.1.e); re-attachment needs Weaponmaster (play-time only, 821.2 "no function while on the board"), SFD-193 Grandmaster at Arms / SFD-208 Forge of the Fluft (legend exhaust, 1/turn), or a detach spell. So an Eye moves bearer at most once per turn.
- **Zed + any non-Eye payoff**: Zed's swap moves only Zed and a Shadow Clone; the only way to put text on them is Equipment. VEN-137 Shady Spectacles on Zed copying Treasure Hunter/Corina/Yasuo/Jhin overwrites Zed's text (`The equipped unit becomes a copy of that unit`) and loses the swap; Spectacles on a Clone copying Zed just makes a second Zed; Spectacles on a Clone copying anything else renames it, so it is no longer `a Shadow Clone you control`. SFD-059 Svellsongur copies its own bearer's text and ends the copy when detached — cannot carry text to Zed. UNL-200 Mirror Image / UNL-199 Deceiver Reflection copies of Zed are Mind/Order → three domains with Chaos (103.1.b).
- **Yasuo, Windrider third-move points**: `The third time I move in a turn, you score 1 point.` With OGN-259 Unforgiven (Calm/Chaos, 2E legend exhaust) + Ride the Wind + one Standard Move = 1 point per turn (383.1 counter); bouncing him (OGN-181 Pack of Wonders, exhaust) and replaying (5E+1P) resets the counter (124) for a second point but costs 9E+2P more: 11E+3P for 2 points exceeds 12 runes. Not BURST-to-8; engine ≤ 2 points/turn. Zed cannot move Yasuo.
- **Fiora, Worthy re-arming via "exactly one other unit" Might swings** (VEN-027 Hand Hammer `+2 while exactly one other unit you control is here`): a 3-Might bearer oscillates 4 ↔ 6 as tokens arrive/leave, re-arming 709 each time, and Fiora readies it for 1 Order. Malzahar as the bearer (kill the token → +2 rainbow, then a new token re-arms him) is Mind + Calm + Order = three domains. A Calm/Order bearer with an exhaust ability worth repeating (OGN-068 Caitlyn, Patrolling `exhaust: deal damage equal to my Might`) only deals damage, which is not a win condition. Dropped: needs a fresh token at the bearer's location per iteration and pays only in damage.
- **UNL-082 Lillia, Fae Fawn + UNL-083 Smoke and Mirrors** (both Mind): each S&M (2E) swaps Lillia with a Temporary Sprite → +1 Sprite (3 M, Temporary) and draw 1. Bounded by three copies; Sprites die at the start of the Beginning Phase before scoring (816.1.b), so they never count for Hold/Plaza. Dropped.
- **SFD-125 Fae Porter chains**: Porter's trigger is on its own Standard Move (exhaust), so ≤1 pulled unit per Porter per turn; pulling Jhin nets +1E per Chaos spent. Dropped as bounded.
- **UNL-055 Vex, Mocking / SFD-126 Loyal Pup + Eye**: effect moves on stun / on defend → 1 Recruit each, bounded by stun spells or by the opponent attacking. Dropped.
- **Recalls** (Zhonya's, Guardian Angel, Soraka, Tactical Retreat, Highlander, Symbol of the Solari, Unlicensed Armory, The Boss, Altar of Blood): all print `This isn't a move` → no Eye/Jhin/Corina triggers. Dropped.
- **Death from Below + Recruits**: `Kill a unit at a battlefield. Then, if it had 3 Might or less, you may play this from your trash for :rb_rune_rainbow:` recurs for 1 rainbow per kill (no Flow banish), but killing your own Recruits pays nothing under an Order/Chaos or Fury/Chaos legend (no death payoff that returns ≥1 Power without an exhaust). Dropped; noted for the kill-lens agents as a repeatable sac outlet that costs 1 Power.

### 2.4 Catalogued combos my lens touches — refinements only
- `recruits-infinite` (banned): confirmed there is no substitute follower — `moved with` matches only OGN-177 in the corpus; the only other free bidirectional mover is Zed's swap (L2-01), which moves Zed and a Clone, not an arbitrary Eye-bearer.
- `world-atlas-sentinel-gold`, `blue-sentinel-trinity-force-hold`: add SFD-171 Renata (Order; Mind/Order legend, e.g. SFD-201 Chem-Baroness) — hold-made Gold enters ready (L2-02) and is cashable in the same turn instead of after the next Awaken Phase (315.1 before 315.2); under Chem-Baroness within 3 points each Gold is 1 rainbow + 1 Energy.
- `grand-plaza-recruit-vanguard`: L2-01 (Chaos/Order) and L2-03 (Calm/Order) are stronger Recruit engines for the 7-unit hold than Vanguard Captain/Recruit the Vanguard; L2-01 reaches 13 bodies in one turn from 12 runes.
- `svellsongur-copy-hold` / `svellsongur-ornn-hold`: the Equip-Inactive rule (718.2) means Svellsongur cannot be re-pointed once attached without Grandmaster at Arms / Forge of the Fluft / a detach — no change to the verdict, but the "move it to a better bearer mid-turn" step, if any version relies on it, is 1/turn.
- hunt B-22 (Jax) — as promised in §1.1: SFD-119 Jax, Unrelenting `When you attach an Equipment to me, you may pay 1E to draw 1` and SFD-049 Aphelios `When you attach an Equipment to me, choose one that hasn't been chosen this turn` cannot be fed by an attached Equipment's own Equip (Inactive, 718.2); the repeatable attachers are SFD-193 Grandmaster at Arms (`exhaust: Attach an attached Equipment you control to a unit you control`, 1/turn) and SFD-208 Forge of the Fluft (legend exhaust, 1/turn). Aphelios' three modes are capped by `hasn't been chosen this turn`. B-22 stays refuted; `azir-aphelios-attach` (catalogued) is the surviving form.

## 3. Data anomalies (corpus_flat.txt)
- VEN-103 Shadows of the Past (Spell) carries a stray `[Effect] 1` — Equipment field leaked into a spell.
- UNL-160 Ultrasoft Poro: `Play two :rb_energy_1: :rb_might: Bird unit tokens` and VEN-109 Illaoi: `play a :rb_energy_1: :rb_might: Tentacle unit token` — the numeral "1" was encoded as the Energy icon; should read `1 :rb_might:`.
- OGN-235 Karma, Channeler is tagged `[Tags: Vi, Ionia]` — wrong champion tag.
- Keyword brackets missing on SFD-096 Laurent Bladekeeper (`Ganking`), SFD-138 Windsinger (`Hidden`), VEN-073 Jagged Cutlass (`Equip`) — any build step that greps `[Ganking]`/`[Hidden]`/`[Equip]` misses these three.
- HTML entities `&quot;` survive in SFD-184, UNL-018, UNL-073, UNL-145, UNL-185, VEN-023, VEN-112, VEN-144, SFD-208, UNL-147, UNL-213 text.
- Modal cards have their modes run together without separators: OGN-157 Udyr, OGN-200 Twisted Fate, UNL-080 Hwei, UNL-182 Curtain Call, SFD-049 Aphelios, VEN-088 Jayce, VEN-111 Minah, UNL-103, UNL-044, VEN-035, VEN-052.
- SFD-217 Seat of Power ends with a double period; UNL-T04 Buff and UNL-T08 XP Tracker have an empty `type` column.
- Primer gaps (from run 1, still true): no 144.1.c / 144.4.a-b sub-bullets, no rule 445 (Movement) or 454 (Recalls) text; every step above that depends on "base ↔ controlled battlefield is a legal Standard Move destination" relies on REFUTE_SPEC §B rather than the primer.
