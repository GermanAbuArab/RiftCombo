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
