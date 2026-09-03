# L6 — Equipment × Legend cross-reference

Status: IN PROGRESS (appending as I read)

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

