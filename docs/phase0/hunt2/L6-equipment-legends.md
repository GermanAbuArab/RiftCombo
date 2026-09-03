# L6 — Equipment × Legend cross-reference

Status: COMPLETE — 2026-09-03. Lens: Equipment effect text × Legend domain pairs.

## Sections
- 1. Method & sources
- 2. Equipment inventory (full effect text)
- 3. Legend × domains gap map
- 4. Candidates
- 5. Refuted / near-misses
- 6. Anomalies

---
## 1. Method & sources

- Corpus: `data/corpus_flat.txt` (935 cards, Riot gallery API 2026-09-02, errata applied).
- Equipment is **not** a distinct `type` in this corpus. Equipment = `type == "Gear"` carrying
  `[Tags: ..., Equipment]`. **40 rows** match (`type==Gear` AND text contains `[Equip]` or `[Effect]`);
  the corpus has 107 Gear rows total, so 67 Gear are non-Equipment (Seals, Golds, artifacts, etc.).
- 49 Legend rows. Every Legend has exactly two domains (103.1.b). All 15 unordered domain pairs
  from {Fury, Calm, Mind, Body, Chaos, Order} are represented — see §3.
- Calibration (per SHARED_BRIEF step 1): both verified infinites are visible in this corpus.
  - Lux loop: `OGN-212 Forge of the Future`, `OGN-110 Ekko, Recurrent`, `UNL-165 Shadow's Call`,
    `UNL-173 Sacrifice` — closes only with an **empty Main Deck** because Recycle is bottom-of-deck
    (416.5) and bottom == top when the deck is empty.
  - Recruit loop: `SFD-153 Eye of the Herald` — `[Effect] When I move, play a 1 :rb_might: Recruit
    unit token here.` — the *effect* field is what carries the loop. This is exactly the field the
    earlier corpus dropped, which is why this lens exists.

---

## 2. Equipment inventory (all 40, with the granted `[Effect]` text)

Grouped by what the granted effect keys off, because that is what makes loops.

### 2.1 Equipment that triggers on MOVE (the Eye-of-the-Herald class)
| code | name | dom | cost | granted effect |
|---|---|---|---|---|
| SFD-153 | Eye of the Herald | Order | E1 M+0 | `When I move, play a 1 :rb_might: Recruit unit token here.` |
| VEN-011 | Pendulum Blade | Fury | E3 M+1 | `When I move to a battlefield, give me +2 :rb_might: this turn.` |

### 2.2 Equipment that triggers on CONQUER / HOLD
| code | name | dom | cost | granted effect |
|---|---|---|---|---|
| SFD-115 | Trinity Force | Body | E4 M+2 | `When I hold, score 1 point.` |
| SFD-086 | World Atlas | Mind | E3 M+2 | `When I hold, play two Gold gear tokens exhausted.` |
| SFD-118 | Boneshiver | Body | E3 M+2 | `When I conquer, channel 1 rune exhausted.` |
| SFD-134 | Cull | Chaos | E1 M+1 | `When I conquer, play a Gold gear token exhausted.` |
| SFD-124 | Doran's Ring | Chaos | E1 M+1 | `When I conquer, discard 1, then draw 1.` |
| SFD-108 | Warmog's Armor | Body | E1 M+1 | `When I conquer, buff me.` |
| SFD-150 | Last Rites | Chaos | E3 M+2 | `When I conquer or hold, you may play a unit from your trash.` (Equip cost: `:rb_rune_chaos:, Recycle 2 cards from your trash`) |
| UNL-096 | Hunter's Machete | Body | E3 M+2 | `[Hunt]` (`When I conquer or hold, gain 1 XP.`) |
| UNL-188 | Hextech Gauntlets | Fury/Order | E3 M+3 | `When I conquer, if you assigned 3 or more excess damage, draw 1.` |
| SFD-030 | Skyfall of Areion | Fury | E3 M+2 | **`My hold effects are also conquer effects, and vice versa.`** |

`SFD-030` is the multiplier of this group: it turns any *hold* trigger into a *conquer* trigger too.

### 2.3 Equipment that triggers on DEATH
| code | name | dom | cost | granted effect |
|---|---|---|---|---|
| SFD-172 | Sacred Shears | Order | E2 P1 M+1 | `[Deathknell] — Draw 1.` |
| SFD-090 | The Zero Drive | Mind | E3 M+2 | `[Deathknell] — Banish me.` + own ability `:rb_energy_3::rb_rune_mind:, Banish this: Play all units banished with this, ignoring their costs. (Use only if unattached.)` |
| SFD-051 | Guardian Angel | Calm | E2 M+1 | `If I would die, kill Guardian Angel instead. Heal me, exhaust me, and recall me.` |
| UNL-019 | Blighted Battleaxe | Fury | E4 M+4 | `At the end of your turn, if I didn't conquer this turn, unattach this and deal 4 to me.` |

### 2.4 Equipment that COPIES text (the two most dangerous cards in the pool)
| code | name | dom | cost | text |
|---|---|---|---|---|
| SFD-059 | Svellsongur | Calm | E3 P1 M+0 | `As this is attached to a unit, copy that unit's text to this Equipment's effect text for as long as this is attached to it.` |
| VEN-137 | Shady Spectacles | Order | E4 M+0 | `As this is attached to a unit, choose another friendly unit. The equipped unit becomes a copy of that unit for as long as this is attached to it.` |

`SFD-059` grants the equipped unit a **second copy of its own rules text** (the effect field is
appended to the unit's rules text, 718.3). Every "When I …" trigger on that unit fires twice.

### 2.5 Movement / positioning grants
| code | name | dom | cost | granted effect |
|---|---|---|---|---|
| SFD-133 | Boots of Swiftness | Chaos | E3 M+2 | `[Ganking]` |
| SFD-192 | Shurelya's Requiem | Calm/Mind | E4 P2 M+2 | own: `When you play this, ready your units.` / effect: `Your units here have [Ganking].` `[Unique]` |
| VEN-073 | Jagged Cutlass | Body | E3 M+2 | `I can't be moved by enemy spells and abilities.` |

### 2.6 Combat-stat / damage Equipment (no loop surface)
SFD-009 Serrated Dirk (`[Assault 2]`), SFD-016 Recurve Bow (`When I attack or defend, deal 2 to an
enemy unit here.`), SFD-022 Long Sword (Quick-Draw, vanilla +2), SFD-033 Doran's Shield (`[Tank]`),
SFD-042 Brutalizer (`If this was attached to me this turn, I have an additional +2 :rb_might:.`),
SFD-056 Sterak's Gage (Quick-Draw, vanilla +3), SFD-064 Cloth Armor (`[Shield 2]`),
SFD-073 Experimental Hexplate (`I am a Mech.`), SFD-095 Doran's Blade (vanilla +2),
SFD-102 Hexdrinker (`[Deflect]`), SFD-161 B.F. Sword (vanilla +3), SFD-178 Blade of the Ruined King
(equip cost kills a friendly unit; vanilla +4), SFD-139 Edge of Night ([Hidden], vanilla +2),
SFD-186 Spinning Axe (Fury/Chaos, [Temporary] while unattached), SFD-190 Forgefire Cape
(`When I attack or defend, deal 2 to all enemy units here.`), SFD-191 Rabadon's Deathcrown
(`Your spells and abilities deal 3 Bonus Damage`), UNL-039 Soul Sword (`[Level 3][>] +1`),
UNL-158 Shepherd's Heirloom (`When you play this, gain 1 XP.`; equip cost `Spend 1 XP`),
VEN-027 Hand Hammer (conditional +2).

### 2.7 Equipment-facing Legends (the enablers)
- **SFD-193 Grandmaster at Arms (Jax, Calm/Body)** — `:rb_energy_1:, :rb_exhaust:: Attach a detached
  Equipment you control to a unit you control.` **and** `:rb_exhaust:: Attach an attached Equipment
  you control to a unit you control.` Two abilities, one exhaust each → **one re-attach per turn**
  unless Jax is readied.
- **SFD-247 Emperor of the Sands (Azir, Calm/Order)** — `Sand Soldiers you play have [Weaponmaster]`
  + `:rb_energy_1:, :rb_exhaust:: Play a 2 :rb_might: Sand Soldier unit token to your base. Use only
  if you've played an Equipment this turn.`
- **SFD-183 Purifier (Lucian, Fury/Body)** — `Your Equipment each give [Assault].` (stat only)
- **SFD-189 Fire Below the Mountain (Ornn, Calm/Mind)** — `:rb_exhaust:: [Reaction] — [Add]
  :rb_rune_rainbow:. Use only to play gear or use gear abilities.`
- **VEN-149 Defender of Tomorrow (Jayce, Mind/Body)** — `:rb_energy_1:, :rb_exhaust:: Ready a gear.`
  / `[Empowered][>] :rb_energy_1:, :rb_exhaust:: Ready 2 gear.`
- **SFD-085 Ornn, Forge God** (unit, Mind) — `[Weaponmaster] (When you play me, you may [Equip] one
  of your Equipment to me for :rb_rune_rainbow: less, **even if it's already attached**.)`

---

## 3. Legend × domains gap map (all 49 Legends, all 15 domain pairs)

Every pair from {Fury, Calm, Mind, Body, Chaos, Order} is represented, so no pair is
*legend*-less. What varies wildly is what each pair can actually assemble.

Per-domain material tally (mono-domain cards only, mechanically tagged from the corpus):

| domain | TOKEN | READY | RAMP | RECUR | MOVE trig | MOVER | POINT abil | trigger-DOUBLER |
|---|---|---|---|---|---|---|---|---|
| Fury  | 6 | 9 | 3 | 9 | 4 | 0 | 1 | **UNL-029 Red Brambleback** (conquer) |
| Calm  | 5 | 7 | 7 | 2 | 5 | 5 | 2 | — |
| Mind  | **23** | 12 | 6 | 7 | 3 | 0 | 4 | **UNL-087 Blue Sentinel** (hold) |
| Body  | 2 | **14** | 9 | 1 | 4 | 2 | 1 | — |
| Chaos | 9 | 2 | 3 | **14** | 8 | 6 | 2 | — |
| Order | **21** | 2 | 7 | 6 | 4 | 0 | 2 | **OGN-236 Karthus, Eternal** (Deathknell) |

The three "trigger an additional time" cards are the spine of this section. Each one is a
**point multiplier** the moment it is paired with a domain that has a `score 1 point` *ability*:

- Hold-point abilities: `OGN-066 Ahri, Alluring` (Calm) `When I hold, you score 1 point.`;
  `SFD-115 Trinity Force` (Body Equipment) `When I hold, score 1 point.`;
  `VEN-138 Shen, Leader of the Kinkou Order` (Order) conditional; `SFD-214 Power Nexus` (colourless BF).
- The hold↔conquer bridge is a single card: `SFD-030 Skyfall of Areion` (Fury Equipment),
  `My hold effects are also conquer effects, and vice versa.`

### The table

| # | pair | Legends | what the pair actually has | candidate |
|---|---|---|---|---|
| 1 | **Fury/Calm** | VEN-139 Rogue Assassin (Akali) — **only one** | Calm point-on-hold (Ahri) + Fury conquer-doubler (Brambleback) + the Fury hold↔conquer bridge (Skyfall) + the Calm text-copier (Svellsongur) | **C1 — best in report** |
| 2 | **Calm/Mind** | OGN-255 Nine-Tailed Fox (Ahri) · SFD-189 Fire Below the Mountain (Ornn) · UNL-189 Bashful Bloom (Lillia) · VEN-145 Curator of the Sands (Nasus) | Ahri point-on-hold + Mind hold-doubler (Blue Sentinel) + Svellsongur + `OGN-122 Time Warp` extra turn + the whole gear shell | **C2, C3, C4** |
| 3 | **Mind/Body** | VEN-149 Defender of Tomorrow (Jayce) — **only one** | Trinity Force (Body Equipment point-on-hold) + Blue Sentinel (Mind hold-doubler); Jayce readies gear. Nothing else: Body has 1 RECUR and 2 TOKEN | **C5** |
| 4 | **Fury/Body** | OGN-249 Relentless Storm (Volibear) · SFD-183 Purifier (Lucian) · UNL-183 Pridestalker (Rengar) · VEN-141 Butcher of the Sands (Renekton) | Trinity Force + Skyfall + Red Brambleback all legal together: the only pair that gets the point-ability, the bridge AND the doubler | **C6** |
| 5 | **Fury/Order** | OGN-253 Hand of Noxus (Darius) · SFD-243 Void Burrower (Rek'Sai) · UNL-187 Piltover Enforcer (Vi) | Order TOKEN 21 + Karthus Deathknell-doubler + `SFD-153 Eye of the Herald` + `UNL-188 Hextech Gauntlets` (its conquer clause is the literal text of the Vi legend's trigger) | **C7** |
| 6 | **Mind/Order** | OGN-265 Herald of the Arcane (Viktor) · OGS-021 Lady of Luminosity (Lux) · SFD-201 Chem-Baroness (Renata) · UNL-199 Deceiver (LeBlanc) | Verified Lux infinite energy; Renata Mastermind as the kill. 44 token cards between the two domains | already has 4 combos — **deliberately not extended** |
| 7 | **Calm/Order** | OGN-261 Radiant Dawn (Leona) · SFD-247 Emperor of the Sands (Azir) · UNL-195 Green Father (Ivern) · VEN-147 Eye of Twilight (Shen) | Azir is the pool's only *repeatable* Equipment-payoff Legend (`Sand Soldiers you play have [Weaponmaster]` + token-per-turn gated on "played an Equipment this turn"); Ahri + Eye of the Herald both legal | **C8** |
| 8 | **Calm/Body** | OGN-257 Blind Monk (Lee Sin) · OGS-019 Wuju Bladesman (Master Yi, 2v2-restricted) · SFD-193 Grandmaster at Arms (Jax) · UNL-191 Wuju Master (Master Yi) | The two Equipment-manipulation Legends: Jax re-attaches twice a turn; UNL-191 `[Level 11][>] Your units enter ready.` is the pool's only non-Order units-enter-ready. Body READY 14 + Calm buff/Aphelios | **C9** |
| 9 | **Body/Order** | OGN-269 The Boss (Sett) · OGS-023 Might of Demacia (Garen) · SFD-205 Grand Duelist (Fiora) · UNL-203 Keeper of the Hammer (Poppy) | Trinity Force + Order tokens + Fiora (`becomes [Mighty]` → channel) + Sett (`When you conquer, ready me`) | no equipment candidate; Trinity Force here has no doubler |
| 10 | **Body/Chaos** | OGN-267 Bounty Hunter (Miss Fortune) · SFD-203 Battle Mistress (Sivir) · UNL-201 Voidreaver (Kha'Zix) | Chaos RECUR 14 + `SFD-204 On the Hunt` (`Ready your units.` for E1 P2!) + Body READY 14. Movement-rich, point-poor | `SFD-204` is the cheapest mass-ready in the pool — flagged, no closed line |
| 11 | **Mind/Chaos** | OGN-263 Swift Scout (Teemo) · SFD-199 Prodigal Explorer (Ezreal) · UNL-197 Scorn of the Moon (Diana) · VEN-151 Soul's Reflection (Mel) | Hidden/[Flow] recursion + Mind tokens. No Equipment payoff, no point ability except Renata Mastermind (Mind) | **none — genuine gap** |
| 12 | **Fury/Mind** | OGN-247 Daughter of the Void (Kai'Sa) · SFD-181 Mechanized Menace (Rumble) · UNL-181 Virtuoso (Jhin) | Mech tribal (`SFD-073 Experimental Hexplate` — `[Effect] I am a Mech.` — turns any body into a Mech for Rumble/Bubble Bot). Blue Sentinel legal but no Fury/Mind hold-point ability | **none — Hexplate is the only Equipment hook; no point payoff** |
| 13 | **Fury/Chaos** | OGN-251 Loose Cannon (Jinx) · OGS-017 Dark Child (Annie) · SFD-185 Glorious Executioner (Draven) · UNL-185 Bloodharbor Ripper (Pyke) · VEN-143 Master of Shadows (Zed) | Deepest trash-recursion pair (23 RECUR cards) + Pyke's Gold-token-per-bounce. `SFD-186 Spinning Axe` is the only dual-domain Equipment here and is vanilla | **none — no point ability in either domain except Draven's once-per-turn** |
| 14 | **Calm/Chaos** | OGN-259 Unforgiven (Yasuo) · SFD-195 Blade Dancer (Irelia) · UNL-193 Gloomist (Vex) | Yasuo legend `E2, exhaust: Move a friendly unit to or from its base`; `OGN-205 Yasuo, Windrider` — `The third time I move in a turn, you score 1 point`; Irelia legend readies on conquer | **C10 (low)** |
| 15 | **Order/Chaos** | VEN-155 Heart of the Tempest (Kennen) — **only one** | The banned Recruit infinite's exact pair. Post-ban: `SFD-153 Eye of the Herald` + `SFD-171 Renata Glasc, Industrialist` (`Your tokens enter ready.`) survive; the free-ride piece `OGN-177 Stealthy Pursuer` does not | **C11 — flagged as the ban's residue** |

**Pairs with no candidate at all after this pass: 11 (Mind/Chaos), 12 (Fury/Mind), 13 (Fury/Chaos),
9 (Body/Order), 10 (Body/Chaos).** Those five rows are the finding: they have volume (Chaos has the
most recursion in the game) but no *point ability* and no trigger-doubler to attach one to.

---

## 4. Candidates

All quoted text is copied verbatim from `data/corpus_flat.txt`. Rule numbers from
`docs/phase0/rules-primer.md`.

Shared arithmetic note used by C1/C2/C5/C6: **470** caps *Scoring* (Conquer or Hold) at once per
battlefield per turn, and **471.2.c** caps each hold/conquer-triggered ability at one firing per
Score. **471.1.a.1** exempts non-Conquer point gains from the Final-Point restriction of 471.1.b,
so an ability point can be the 8th point without having scored every battlefield. The three
"trigger an additional time" cards are explicit overrides of 471.2.c — the same wording class in all
three, so they stand or fall together.

---

### C1 — "Skyfall Ahri" · Fury/Calm · class **BURST** · confidence **medium-high**

The pair with only one Legend in the whole pool, and it turns out to hold the pool's single
hold→conquer bridge together with a point-on-hold body.

Cards
- `OGN-066 Ahri, Alluring` (Calm, E5 P1 M4) — `When I hold, you score 1 point.`
- `SFD-030 Skyfall of Areion` (Fury Equipment, E3 M+2, `[Equip] :rb_energy_1::rb_rune_fury:`) —
  `[Effect] My hold effects are also conquer effects, and vice versa.`
- `UNL-029 Red Brambleback` (Fury, E4 P1 M4) — `Your conquer effects for conquering here trigger an
  additional time.`
- optional `SFD-059 Svellsongur` (Calm Equipment) — `copy that unit's text to this Equipment's
  effect text for as long as this is attached to it.`

Legend: **VEN-139 Rogue Assassin (Akali), Fury/Calm** — the only Legend that covers this pair.

Preconditions: Ahri wearing Skyfall (two Equipment on one body is legal, 434.1.b.1); Red Brambleback
at the battlefield you are about to conquer; you have not scored that battlefield this turn.

Steps and arithmetic (one conquer, one Brambleback, no Svellsongur)
1. Ahri's Rules Text is now `When I hold, you score 1 point.` + `My hold effects are also conquer
   effects, and vice versa.` (718.3, 434.1.c).
2. Win the showdown; you Establish Control (466.5) → **Conquer** (469.1). Base score: **+1** (470).
3. `471.2.a` triggers conquer abilities. Ahri's hold-point is now also a conquer effect → **+1**.
4. Brambleback: that conquer effect triggers an additional time → **+1**.
5. Total from one conquer: **3 points**. At your next Beginning Phase you also **Hold** it
   (469.2, new turn so 470 has reset): base +1, plus Ahri's native hold trigger +1 (Brambleback does
   not double *hold* effects) = **2 more**.

Scaling, all still legal in Fury/Calm:
| build | points from one conquer |
|---|---|
| 1 Ahri + Skyfall + 1 Brambleback | 1 + 2 = **3** |
| 1 Ahri + Skyfall + **Svellsongur** + 1 Brambleback | 1 + 2 + 2 = **5** |
| 1 Ahri + Skyfall + Svellsongur + **2 Brambleback** | 1 + 3 + 3 = **7** |
| 2 Ahri each with Skyfall + 2 Brambleback | 1 + 3 + 3 = **7** |
| 3 Ahri each with Skyfall + 2 Brambleback | 1 + 3 + 3 + 3 = **10** — wins from 0 in one conquer |

Max copies: 3 of each name (132.4); none of these four is `[Unique]`.

My own attack, and why it survives
- *"Ability points are capped by 470."* No: 470 caps **Scoring**, defined at 469 as Conquer or Hold.
  Ahri's `you score 1 point` fires from 471.2 as a triggered ability once per Score — the cap applies
  once, indirectly, which is exactly what the refute spec §9 describes, and Brambleback is the
  explicit override.
- *"You cannot reach the 8th point off a Conquer without scoring every battlefield (471.1.b)."*
  Duel has **2** battlefields (485.4). But 471.1.a.1 exempts non-Conquer sources, and Ahri's points
  are ability points, so only the *base* conquer point is at risk of converting into a draw.
- **UNRESOLVED (Svellsongur only):** does Svellsongur copy Ahri's **printed** rules text, or her
  current Rules Text *including* the appended effect texts (434.1.c)? The latter reading is
  self-referential and would also copy Skyfall's clause. Every line above is computed on the
  conservative printed-text reading. Exact question to settle: *"When Svellsongur copies 'that
  unit's text', is that the unit's printed Rules Text or its current Rules Text including appended
  Effect Text from other attachments?"*

---

### C2 — "Ahri Choir" · **Calm/Mind** · class **BURST** · confidence **medium-high**

The priority pair. Same engine as C1 but built on the *hold* doubler instead of the conquer one,
because Calm/Mind cannot legally play `SFD-030 Skyfall of Areion` (Fury).

Cards
- `OGN-066 Ahri, Alluring` (Calm) ×3 — `When I hold, you score 1 point.`
- `UNL-087 Blue Sentinel` (Mind, E4 P1 M4) — `[Shield 2] … Your hold effects for holding here
  trigger an additional time. When I hold, [Add] :rb_rune_rainbow: at the start of your next Main
  Phase.`
- optional `SFD-059 Svellsongur` (Calm Equipment) on one Ahri.
- optional `OGN-122 Time Warp` (Mind, E10 P4) — `Take a turn after this one. Banish this.`

Legend: **OGN-255 Nine-Tailed Fox (Ahri), Calm/Mind** — or **SFD-189 Fire Below the Mountain
(Ornn)** / **VEN-145 Curator of the Sands (Nasus)** if you want the gear shell (see C4).

Preconditions: you control a battlefield at the start of your Beginning Phase and have not scored it
this turn; Blue Sentinel and the Ahris are all at that battlefield (Blue Sentinel's doubler is
scoped `for holding **here**`).

Arithmetic (start of your Beginning Phase, 469.2)
1. Hold → base **+1**.
2. Each `When I hold, you score 1 point` fires (471.2.b), and Blue Sentinel fires it an additional
   time → **+2 per instance**.
3. 3 Ahri = 6. + Svellsongur's copy on one Ahri = +2. **Total 1 + 8 = 9 points in one Beginning
   Phase.** Without Svellsongur: **7**.
4. `SFD-214 Power Nexus` (Colorless battlefield — legal in any deck) — `When you hold here, you may
   pay :rb_rune_rainbow: ×4 to score 1 point.` — also doubled by Blue Sentinel: **+2 for 8 Power**.
5. `OGN-122 Time Warp` gives a second turn, hence a second Beginning Phase, hence a second Hold on
   the same battlefield (470 resets per turn) → the whole payout again.

Attack: Blue Sentinel dies to removal before your Beginning Phase and the burst collapses to 3+1.
`[Shield 2]` and Calm's protection suite (`SFD-051 Guardian Angel` on Blue Sentinel; `VEN-031
Twilight Shroud` — `It can't be chosen by enemy spells and abilities this turn`) are the answer.
Same UNRESOLVED on Svellsongur as C1; the 7-point version does not depend on it.

---

### C3 — "Svellsongur doubles a hold engine" · **Calm/Mind** · class **ENGINE** · confidence **high**

Svellsongur is a generic ×2 on any *unit* whose text is a triggered ability, and Blue Sentinel is a
second ×2 on the hold subset. Stacked, one unit's hold trigger fires **four times**.

| unit | printed text | with Svellsongur + Blue Sentinel |
|---|---|---|
| `SFD-058 Ornn, Blacksmith` (Calm) | `When you play me or when I hold, look at the top 4 cards of your Main Deck. You may reveal a gear from among them and draw it. Then recycle the rest.` | look at **16**, draw up to **4** gear per hold |
| `SFD-035 Guardian of the Passage` (Calm) | `When I hold, you may return a unit or gear from your trash to your hand.` | **4** returns from trash per hold |
| `SFD-086 World Atlas` (Mind **Equipment**, so no Svellsongur needed) | `[Effect] When I hold, play two Gold gear tokens exhausted.` | **4** Gold per hold per copy; 3 copies on 3 bodies = **12 Gold** |

Gold gear token = `a domainless gear token with "[Reaction][>] Kill this, [E]: [Add] [A]."` (187.5) —
**domainless**, so Gold ramp is available to every Legend in the pool regardless of its two domains.
They enter exhausted, so they are next-turn Power, not same-turn Power.

`terminates_in`: none (engine only) on its own. Bolt it to C2's Ahri or to `SFD-214 Power Nexus`
(12 Gold → 8 Power → 2 points through a Blue-Sentinel-doubled Power Nexus) and it converts.

---

### C4 — Concrete fix for the 41-card Ornn gear deck (`SFD-189`, Calm/Mind)

That deck currently matches zero combos because it contains **no point ability and no
trigger-doubler** — it is all card selection and rune fixing. Its own best interactions:

- `SFD-059 Svellsongur` on `UNL-080 Hwei, Brooding Painter` → `When I move, draw 1, then discard 1.
  … Gear — Ready up to 2 runes.` fires **twice per move**: draw 2 / discard 2 / up to **4 readied
  runes** if both discards are gear. Movers already in the list: `UNL-045 Forgotten Signpost`
  (`[Action][>] Exhaust a unit you control, :rb_exhaust:: Move a different unit you control to the
  location of the unit you exhausted` — the moved unit is **not** exhausted), `VEN-034 Resonating
  Strike`, `SFD-043 Emperor's Divide` (mass move to base), and `SFD-192 Shurelya's Requiem`'s
  `[Effect] Your units here have [Ganking].`
- `SFD-192 Shurelya's Requiem` — `When you play this, ready your units.` is a **one-shot mass ready**
  on the turn it is played (it is the gear's own Rules Text, not its Effect Text, so re-attaching it
  with `SFD-085 Ornn, Forge God`'s `[Weaponmaster]` does **not** re-trigger it: Weaponmaster
  *attaches*, it does not *play*).
- `VEN-068 Jayce, Brilliant Inventor` — `the first time you play a non-token gear each turn, you may
  ready something besides me that's exhausted` → re-ready the Ornn Legend for a second gear-only
  rainbow, or a Seal.

Minimum additions to make it win rather than durdle (all Calm/Mind legal, all already in this pool):
`OGN-066 Ahri, Alluring` ×3, `UNL-087 Blue Sentinel` ×3, `SFD-086 World Atlas` ×3 (it is gear, so
the Ornn Legend's rainbow pays for it), and `SFD-214 Power Nexus` as one of the three battlefields.
`OGN-122 Time Warp` (already 3-of) is then a genuine second Beginning Phase, not just a durdle turn.

---

### C5 — "Trinity Sentinel" · **Mind/Body** · class **BURST** · confidence **medium**

Mind/Body has exactly **one** Legend (`VEN-149 Defender of Tomorrow`, Jayce) and, before this pass,
no line at all. It is the only pair besides Fury/Body that can play a point-on-hold **Equipment**.

- `SFD-115 Trinity Force` (Body Equipment, E4 M+2, `[Equip] :rb_rune_body:`) — `[Effect] When I hold,
  score 1 point.`
- `UNL-087 Blue Sentinel` (Mind) — hold doubler.
- Legend `VEN-149 Defender of Tomorrow` — `:rb_energy_1:, :rb_exhaust:: Ready a gear.` /
  `[Empowered][>] :rb_energy_1:, :rb_exhaust:: Ready 2 gear.`

Three Trinity Forces on three different units all holding at Blue Sentinel's battlefield:
base hold **+1**, then 3 × 2 = **+6** → **7 points in one Beginning Phase**. `SFD-214 Power Nexus`
doubled adds **+2** → 9. Equipment does not need to be ready to trigger (719.4), so the Jayce
Legend's ready is for the Seals, not the Forces.

Attack: three separate bodies each surviving to your Beginning Phase at one battlefield is a real
requirement; `SFD-033 Doran's Shield` (`[Tank]`) and `SFD-064 Cloth Armor` (`[Shield 2]`) stack onto
the same bodies (434.1.b.1).

---

### C6 — "Trinity + Skyfall + Brambleback" · **Fury/Body** · class **BURST** · confidence **medium**

The only pair that can play the point ability, the hold↔conquer bridge **and** a doubler.

- `SFD-115 Trinity Force` (Body) — `When I hold, score 1 point.`
- `SFD-030 Skyfall of Areion` (Fury) — `My hold effects are also conquer effects, and vice versa.`
- `UNL-029 Red Brambleback` (Fury) — conquer doubler.
- Legend: `SFD-183 Purifier` (Lucian) — `Your Equipment each give [Assault].` — two Equipment on the
  body is +2 attacking Might, which is how you win the showdown that produces the conquer.

Per conquer at Brambleback's battlefield, one carrier: base **+1**, Trinity-as-conquer-effect **+1**,
Brambleback **+1** = **3**. Three carriers (6 Equipment total, legal) = **7**. Two Bramblebacks
→ each Trinity fires 3× → three carriers = **10**.

---

### C7 — "Gauntlet Vi" · **Fury/Order** · class **ENGINE** · confidence **medium**

`UNL-188 Hextech Gauntlets` (Fury/Order Equipment, E3 M+3) — `[Equip] :rb_energy_3::rb_rune_rainbow:.
This ability's Energy cost is reduced by the Might of the unit you choose.` `[Effect] When I conquer,
if you assigned 3 or more excess damage, draw 1.` Its trigger condition is the **verbatim** condition
of the Fury/Order Legend `UNL-187 Piltover Enforcer` — `When you conquer, if you assigned 3 or more
excess damage, you may exhaust me to ready a unit.` On a 3+ Might body the equip is free
(E3 − Might). One conquer = draw 1 + ready a unit. `terminates_in`: none (engine only).

---

### C8 — "Azir Weaponmaster loop-ish" · **Calm/Order** · class **ENGINE** · confidence **medium**

`SFD-247 Emperor of the Sands` (Azir) — `Sand Soldiers you play have [Weaponmaster]. (When they're
played, you may [Equip] one of your Equipment to them for :rb_rune_rainbow: less.)` +
`:rb_energy_1:, :rb_exhaust:: Play a 2 :rb_might: Sand Soldier unit token to your base. Use only if
you've played an Equipment this turn.` — with `SFD-049 Aphelios, Exalted` (Calm) — `When you attach
an Equipment to me, choose one that hasn't been chosen this turn — Ready 2 runes. / Channel 1 rune
exhausted. / Buff a friendly unit.`

Each attach to Aphelios banks a mode. Hard-capped at **3 triggers per turn** by
"that hasn't been chosen this turn" (refute spec §27) → max **2 readied runes + 1 channeled rune +
1 buff per turn**. Not infinite, and the Rune Deck is 12 (161.2.a). `SFD-153 Eye of the Herald`
(Order) is also legal here. `terminates_in`: none (engine only).

---

### C9 — "Jax re-equip" · **Calm/Body** · class **ENGINE** · confidence **low-medium**

`SFD-193 Grandmaster at Arms` (Jax) is the pool's only Legend with **two** attach abilities:
`:rb_energy_1:, :rb_exhaust:: Attach a detached Equipment you control to a unit you control.` and
`:rb_exhaust:: Attach an attached Equipment you control to a unit you control.` Both cost the same
exhaust, so it is **one attach per turn** unless the Legend is readied. `SFD-039 Royal Entourage`
(Calm) — `When you play me, ready or exhaust a legend` — is the only in-pair re-ready found.
`SFD-208 Forge of the Fluft` (Colorless battlefield) — `While you control this battlefield, friendly
legends have ":rb_exhaust:: Attach an Equipment you control to a unit you control."` — is the same
exhaust again, so it does not stack into a second attach. Pair-mate: `UNL-191 Wuju Master`
`[Level 11][>] Your units enter ready.` — the only units-enter-ready outside Order
(`SFD-171 Renata Glasc, Industrialist`) and Fury (`OGN-011 Magma Wurm`). Reachable via
`UNL-096 Hunter's Machete` `[Effect] [Hunt]` and `UNL-016 Scorchclaw` `[Hunt 2]`.

---

### C10 — "Third Move Yasuo" · **Calm/Chaos** · class **BURST (weak)** · confidence **low**

`OGN-205 Yasuo, Windrider` (Chaos) — `[Ganking] … The third time I move in a turn, you score 1
point.` — with `OGN-259 Unforgiven` (Yasuo Legend) `:rb_energy_2:, :rb_exhaust:: Move a friendly unit
to or from its base.`, `OGN-173 Ride the Wind` (Chaos) `Move a friendly unit and ready it.`,
`OGN-184 The Syren` (Chaos gear) `:rb_energy_1:, :rb_exhaust:: Move a friendly unit at a battlefield
to your base.` The text is **the third time**, not *every third time* — one point per turn per Yasuo.
Listed for completeness; it does not multiply.

---

### C11 — Order/Chaos after the Stealthy Pursuer ban · **UNRESOLVED**

`OGN-177 Stealthy Pursuer` is `[BANNED constructed:banned, 2v2:banned]`, so the verified Recruit
infinite is dead in constructed. The other two pieces survive and are still Order:
`SFD-153 Eye of the Herald` (`[Effect] When I move, play a 1 :rb_might: Recruit unit token here.`)
and `SFD-171 Renata Glasc, Industrialist` (`Your tokens enter ready.`). The missing piece is a
**free ride** — a move that does not exhaust the mover. Closest in-pool substitutes found:
`SFD-179 Corina Veraza` (Order) `When I move to a battlefield, play three 1 :rb_might: Recruit unit
tokens here.` and `SFD-177 Azir, Sovereign` (Order) `When I attack, you may move any number of your
token units to this battlefield.` Neither is free-and-repeatable, so this is **not** a closed loop.
Exact question that would settle it: *"is there any card that moves a friendly unit without
exhausting it and without a per-turn limiter, at a cost of zero?"* — `OGN-173 Ride the Wind`
(Chaos, E2 P1) comes closest but costs a card each time.

---

## 5. Refuted / near-misses inside this lens

- **`UNL-078 Sprite Fountain` as a token loop — REFUTED.** `[Temporary]` on the gear plus
  `[Deathknell][>] Repeat this gear's play effect.` yields exactly **two** ready 3-Might Sprites
  (one on play, one when the gear dies at your Beginning Phase). The gear is then in the trash; there
  is no second Deathknell. Not a loop.
- **`SFD-090 The Zero Drive` mass-reanimation — capped by Linked Abilities.** Rules 395 and 397:
  its activated ability may only play units banished by the **linked** `[Deathknell] — Banish me.`
  Units banished by anything else are not playable with it.
- **`SFD-051 Guardian Angel` — one save, then it is in the trash.** The replacement (`If I would die,
  kill Guardian Angel instead. Heal me, exhaust me, and recall me.`) also **exhausts** the saved unit
  — see the worked example at primer 373.2, which uses this exact card.
- **`SFD-059 Svellsongur` on a unit with an `:rb_exhaust:` activated ability — no gain.** The copy
  duplicates the ability, but both copies cost the *unit's* exhaust and 719.4 keeps the Equipment's
  own ready state separate from the unit's. One exhaust, one activation.
- **`VEN-137 Shady Spectacles` — no loop found.** `The equipped unit becomes a copy of that unit for
  as long as this is attached` produces a second body's worth of text but no repeatable resource; and
  it is Order, so it cannot pair with the Calm copier.
- **`SFD-192 Shurelya's Requiem` re-triggering via `[Weaponmaster]` — REFUTED.** `When you play this,
  ready your units.` sits in the gear's **Rules Text**, and Weaponmaster (`SFD-085 Ornn, Forge God`)
  *attaches*, it does not *play*. Worse, 718.2 makes an Attached card's printed Rules Text
  **Inactive**, so once Shurelya's is attached that clause is off entirely.
- **`SFD-208 Forge of the Fluft` + `SFD-193 Jax` for two attaches — REFUTED.** Both abilities are
  `:rb_exhaust:` on the same Legend object; one exhaust, one use.
- **Gold-token ramp is not free Power on the turn it arrives.** 187.5: Golds are played
  **exhausted** by every card that makes them, and the ability is `Kill this, [E]: [Add] [A]` — the
  exhaust is part of the cost.

## 6. Anomalies in the data

1. **Non-numeric card codes.** 14 rows break the `SET-NNN` shape: `UNL-T01`…`UNL-T08` (token
   cards), `VEN-R01`…`VEN-R06` (rune cards) and **`VEN-SP2 Sona, Harmonious`**, which is a normal
   playable Calm unit (`At the end of your turn, if I'm at a battlefield, ready up to 4 friendly
   runes.`) sitting on a promo-shaped code. Worth checking that the base-code matcher accepts
   `VEN-SP2` — a `[A-Z]+-\d+` regex silently drops a real card.
2. **`VEN-073 Jagged Cutlass`** — its equip clause reads `Equip :rb_rune_body:` with **no square
   brackets**, unlike all 39 other Equipment which read `[Equip] …`. Likely a gallery-text typo;
   any code that keys off the literal `[Equip]` token will misclassify this card.
3. **`VEN-103 Shadows of the Past`** — the row ends `[Effect] 1`, which is not effect text and is not
   a Might bonus. The card is a Chaos spell, so it should have no `[Effect]` field at all. Truncation
   or a mis-mapped column.
4. **`SFD-186 Spinning Axe`** carries `[Temporary]` as *gear* rules text; per 722.2 that text is
   Inactive while attached but still parseable for targeting. A naive "is Temporary" flag on the card
   will be wrong half the time.
5. **`OGS-019 Wuju Bladesman - Starter`** and the other `OGS-0xx` Legends carry a `" - Starter"`
   suffix inside the printed name. If names are ever used for decklist parsing (they are, per
   `CLAUDE.md`), `Wuju Bladesman` will not match `Wuju Bladesman - Starter`.
6. **Type field**: Equipment is not its own `type`; it is `Gear` + `[Tags: …, Equipment]`. Any
   consumer filtering on `type == "Equipment"` gets zero rows.
