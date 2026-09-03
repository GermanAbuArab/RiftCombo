# Hunt 2 — Lens L1: state-dependent loops

Agent L1, 2026-09-03. Lens: loops that only close because of a game STATE (empty deck, rune
states, zone/turn resets, count thresholds, banishment). Corpus read in 4 slices
(`data/corpus_flat.txt` lines 5-941, every card); rules cited from `docs/phase0/rules-primer.md`.
Evidence format per SHARED_BRIEF / REFUTE_SPEC. Nothing here is a structural claim; "not found"
means not found in this read.

## 0. Calibration (both verified infinites located and re-walked)

**Lux infinite energy.** OGN-212 Forge of the Future (Order, E2) `Kill this: Recycle up to 4 cards
from trashes.` · OGN-110 Ekko, Recurrent (Mind, E5 P1 M5) `[Deathknell] — Recycle me to ready your
runes.` · UNL-165 Shadow's Call (Order, E2) `Give it [Temporary]. Draw 2.` · UNL-173 Sacrifice
(Order, E1, Reaction) `kill a friendly [Mighty] unit. Draw 2 and channel 1 rune exhausted.`
Closes because with an EMPTY Main Deck the 4 cards recycled per pass (Forge, Shadow's Call,
Sacrifice via Forge; Ekko via his own Deathknell, 416.1) are exactly the 4 cards drawn per pass
(Sacrifice 2 + Shadow's Call 2), and Ekko's Deathknell readies 12 runes (up to +12 Energy) against
~10 Energy + 1 Power spent. Ekko is 5 Might = Mighty (708), so Sacrifice can kill him. Legend
Mind/Order: OGS-021 Lady of Luminosity, OGN-265 Herald of the Arcane, SFD-201 Chem-Baroness,
UNL-199 Deceiver. Two observations I use below: (a) Forge recycles "up to 4" and the loop only
needs 3 of those slots, so **one extra trash card rides along per pass**; (b) SFD-088 Renata
Glasc, Mastermind `1E + 1 Mind P: Draw 1` has no exhaust, so once resources are infinite the number
of draws per pass is arbitrary — every non-banishing card in the deck is infinitely recastable.

**Infinite Recruits.** OGN-177 Stealthy Pursuer `When a friendly unit moves from my location, I
may be moved with it.` (BANNED) · SFD-153 Eye of the Herald [Effect] `When I move, play a 1 Might
Recruit unit token here.` · SFD-171 Renata Glasc, Industrialist `Your tokens enter ready.`
Closes because Pursuer's ride-along is not a Standard Move (no exhaust), each ride-along is a
"move" for the Eye, the Recruit enters ready and can itself Standard-Move, which Pursuer follows.

## 1. Time Warp (OGN-122) — the concrete target

Card: `OGN-122 | Time Warp | Spell | Mind | E10 P4 | Take a turn after this one. Banish this.`

### 1.1 Is there any way to recur it? Everything in the corpus that touches Banishment:

| code | text that matters | returns Time Warp? |
|---|---|---|
| SFD-090 The Zero Drive | `Banish this: Play all units banished with this` | no — units, and only ones banished *with this* |
| UNL-148 Cursed Sarcophagus | `banish all units from your trash. exhaust: Play a unit banished with this` | no — units only |
| UNL-181 Virtuoso (Legend Fury/Mind) | `When you play a spell, if you spent 4E or more, you may banish it. Then, if there are four spells banished with me, put each in its trash, channel 4 runes, and draw 1.` | no — only spells banished *with me*; Time Warp banishes itself by its own execution. Rule 427.3: "Cards and effects can refer to cards that were banished by the same object" — the "with" gates are object-scoped. Even if Virtuoso's trigger banished it, the Time Warp would leave the chain before resolving (trigger resolves above the spell, 383.3) and no turn would be gained; and the return is to TRASH, from which only Kai'Sa Evolutionary (E cost < points ≤ 7), Fizz (E ≤ 3) or Annie Stubborn (Chaos) could re-cast, none reaching E10 in Fury/Mind. |
| UNL-169 Ashe, Focused | banish a card from an opponent's hand, `When they hold, return it to their hand` | no — opponent's card |
| OGN-025 / OGN-062 / OGN-242 / VEN-089 / SFD-243 | "banish then play it" from top of deck | temporary banish, units/gear only |
| OGN-102, SFD-200, UNL-184, VEN-066 | flicker: banish a unit, play it | units only |
| VEN-022 Endless Riches | trash-bound cards are banished instead | makes it worse |

Spell-copy effects: none found. SFD-059 Svellsongur copies a *unit's* text onto Equipment;
UNL-T06 Reflection / UNL-200 Mirror Image / UNL-199 Deceiver / VEN-137 Shady Spectacles copy
*units*; UNL-086 Zilean doubles *token units*. OGN-080 Mystic Reversal and VEN-152 Rebuttal take
control of a spell (an opponent's Time Warp — still one physical card). UNL-131 Abandon counters
a spell and returns it to hand (a countered Time Warp gives no turn).

**Repeat multipliers (the only genuine multipliers):**
- SFD-078 Temporal Portal (Mind gear, E3): `rainbow P, exhaust: Give the next spell you play this turn [Repeat] equal to its cost.`
- UNL-216 The Academy (battlefield): `When you hold here, give your next spell this turn [Repeat] equal to its base cost.`
- 820.1.c.3 `Each Repeat Cost can be paid only a single time.` → each Time Warp resolves at most twice (820.1.d.1: the effect "will be performed an additional time"; "Banish this" the second time is moot).
- UNL-146 Syndra's Repeat applies "while I'm in a showdown" and Time Warp is not Action/Reaction, so it cannot be played in a showdown.

Rule 738's own example ("The First Player plays, through some means, two Time Warps during
their turn … [> A > A* > A* > B …]") is built on multiple *copies*, not recursion.

### 1.2 Verdict: BOUNDED. Ceiling = 3 copies × 2 resolutions = 6 extra turns.

- Max three copies of a name (REFUTE_SPEC §22; 132.3 treats language variants as the same name).
- Plain: 3 casts = 3 extra turns for 30 Energy + 12 Mind Power in total. Doubled: needs Temporal Portal readied 3 times (three Portals, or VEN-149 Defender of Tomorrow `1E, exhaust: Ready a gear`, VEN-068 Jayce Brilliant Inventor, SFD-221 Veiled Temple `When you conquer here, you may ready a friendly gear`, VEN-150 Acceleration Gate) or one held Academy re-held on each extra turn: 6 extra turns for 60 Energy + 24 Mind Power.
- Native affordability check (no Lux loop): 12 runes ready at Awaken (415.3.a). Time Warp = exhaust 10 runes for Energy, then recycle 4 of the exhausted runes for 4 Mind Power (164.2.b, no exhaust in the cost). After the first cast 8 runes remain on board, Channel Phase adds 2 (430.4.a) → 10 on the extra turn: a second plain Time Warp is castable (exhaust 10, recycle 4 → 6 left, +2 → 8), a third is not without extra Energy (OGS-014 Lux Crownguard `exhaust: Add 2E for spells`, OGN-098 Energy Conduit, etc.). So three consecutive plain Time Warps need at least +2 Energy of help; six doubled ones need the Lux engine.

### 1.3 What the extra turns are worth (Duel)

- Scoring is capped once per battlefield per turn (470); Duel has 2 battlefields (485.4) → at most **2 battlefield points per turn**, and only if both are held at the Beginning Phase (or conquered that turn).
- Ability points are not capped (470 covers Scoring only; 194.1.c is separate): per extra turn add VEN-067 Bottled Constellation (`At the start of your Main Phase, you may kill 3 other friendly units and/or gear to score 1 point`, once per turn per copy, Mind), SFD-214 Power Nexus (`When you hold here, you may pay 4 rainbow P to score 1 point`, ×2 with UNL-087 Blue Sentinel `Your hold effects for holding here trigger an additional time`), VEN-138 Shen Leader, SFD-115 Trinity Force, OGN-066 Ahri Alluring.
- Costs hidden in every extra turn with an EMPTY deck: Draw Phase draws 1 (413.2.a) → Burn Out → recycle trash, **opponent gains 1 point** (431.2.b-c); OGS-021 Lady of Luminosity draws 1 on any ≥5E spell, i.e. on Time Warp itself. A Lux-loop deck must leave ≥1 card in the Main Deck before each of those draws (it can: stop a pass after Forge's recycle, before the draws).

**So:** TCGplayer is right in shape — three plain Time Warps are three extra turns, worth up to
6 hold points in Duel (2 per turn), which with the current turn's 2 is a kill from 0 only if you
hold both battlefields every turn. riftbound.gg's "cast Time Warp for ever" is wrong as stated:
nothing returns a self-banished spell, and under the Lux loop the infinite part is Renata
Mastermind's `4E + 4 Mind P, exhaust: Score 1 point`, not Time Warp; Time Warp there is at best a
6-extra-turn Burst that is strictly dominated by scoring 8 with Renata in the same turn.
Class if catalogued: **BURST (bounded extra-turn chain)**, confidence **high** on the bound,
**medium** on the exact turn count (Repeat-on-Time-Warp reading of 820.1.d.1).

## 2. Candidates

### C1 · `time-warp-repeat-chain` — BURST (bounded), confidence medium
- cards: OGN-122 Time Warp (quoted above); SFD-078 Temporal Portal `rainbow P, exhaust: Give the next spell you play this turn [Repeat] equal to its cost.` or UNL-216 The Academy `When you hold here, give your next spell this turn [Repeat] equal to its base cost.`; payoff = held battlefields (2/turn in Duel) + optional VEN-067 Bottled Constellation / SFD-214 Power Nexus.
- preconditions: 3 Time Warps in hand over the sequence; 3 Portals or a gear-readier or a held Academy; ≥1 card in Main Deck before each Draw Phase; both battlefields held (for 2/turn).
- steps: 1. Portal (1P, exhaust) → 2. Time Warp with Repeat paid (20E + 8 Mind P) → 2 extra turns queued (735, 738). 3. On extra turn 1: Beginning Phase hold-scores (≤2), Awaken readied runes (415.3.a), Channel +2 runes; ready Portal (Defender of Tomorrow 1E / Veiled Temple / second Portal); repeat with Time Warp #2. 4. Same on the next turn with #3. Total: 6 extra turns → up to 12 hold points + ability points; 7 turns' worth of Constellation triggers.
- arithmetic: 60E + 24P over 4 of the 7 turns; native runes give 12E+~4P per turn, so this needs the Lux engine or ≥4 Lux Crownguard/Energy Conduit activations per turn — i.e. it is a Lux-loop finisher, and there Renata is faster.
- legend: any Mind pair (Mind/Order Lady of Luminosity for the Lux engine).
- rules: 735-738, 820.1.c.3, 820.1.d.1, 470, 485.4, 413.2.a, 431.2, 415.3.a, 430.4.a.
- attack: "Banish this" + no recursion caps it at 3 physical casts (427.3) — survives only as a bounded chain; Academy version depends on the random Duel battlefield (485.5).

### C2 · `leblanc-temporary-plaza` — ALT_WIN, confidence medium
Zone-reset state: [Temporary] triggers suppressed at one battlefield.
- cards: UNL-090 LeBlanc, Everywhere at Once (Mind, E4 M4) `[Backline] Your [Temporary] effects at my battlefield don't trigger.` · UNL-081 Keeper of Masks (Mind, E2 M1) `[Hidden] [Temporary] When you play me, play two Reflection unit tokens here. They become copies of me.` (UNL-T06 Reflection `I become a copy of something when played. I don't get that card's play effects.`) · OGN-293 The Grand Plaza `When you hold here, if you have 7+ units here, you win the game.` Optional fatter bodies: OGN-094 Sprite Call / UNL-069 Sprite Burst `Play two ready 3 Might Sprite unit tokens with [Temporary]`, OGN-106 Sprite Mother, UNL-189 Bashful Bloom legend `4E, exhaust: Play a ready 3 Might Sprite token with [Temporary]. This ability costs 1E less for each friendly unit with [Temporary].`, UNL-086 Zilean `Once each turn, if you would play a token unit while I'm at a battlefield, you may play that token and an additional copy`.
- preconditions: you control The Grand Plaza (Duel: 1 of 3 battlefields is random, 485.5); LeBlanc at the Plaza; units can be played to a battlefield you control (OGS-015 reminder text: "They can be played to your base or to battlefields you control").
- steps: 1. Turn N: conquer the Plaza, play LeBlanc there (4E; enters exhausted, 143.4 — irrelevant, she only needs to be present). 2. Same turn or turn N+1: play Keeper of Masks ×3 to the Plaza (6E, or 0E each from [Hidden] hidden earlier for 1P) → each brings two Reflection copies "here": 9 units + LeBlanc = 10 (Zilean at the Plaza: +1). 3. Opponent's turn: they must break the board (any 1 damage kills a 1-Might copy; Sprites are 3 Might). 4. Your Beginning Phase: Temporary's "At the start of this permanent's controller's Beginning Phase, before scoring, kill this" (816.1.b) is a trigger and does not trigger at LeBlanc's battlefield; then Hold scoring → Plaza trigger → 7+ units → win (195).
- class: ALT_WIN (assemble-and-win). Legend: any Mind pair; UNL-189 Bashful Bloom (Calm/Mind) adds a free Sprite per turn once 4 Temporary units exist.
- rules: 816.1.b-c, 816.3 (copies carry Temporary as a characteristic), 195, 470.
- attack: overlaps the shape of catalogued `grand-plaza-recruit-vanguard`; what is new is that the cheapest bodies in Mind (Keeper: 3 units for 2E) are Temporary and normally never survive to a hold. Weak to any attack on the Plaza or LeBlanc removal (all Temporaries die at the next Beginning Phase). Survives as an ALT_WIN with the usual one-turn exposure.

### C3 · `constellation-recruit-turns` — ENGINE (bounded points/turn), confidence medium
Count threshold: exactly 3 fodder per point, once per Main Phase.
- cards: VEN-067 Bottled Constellation (Mind gear, E10 P2) `At the start of your Main Phase, you may kill 3 other friendly units and/or gear to score 1 point.` · fodder: OGN-212 Forge (1 Recruit per pass of the Lux loop, plus Forge itself is gear and dies anyway), OGN-239 Machine Evangel `[Deathknell] — Play three 1 Might Recruit unit tokens into your base`, OGN-246 Viktor, Leader `When another non-Recruit unit you control dies, play a 1 Might Recruit`, SFD-168 Vanguard Armory, OGN-265 Herald of the Arcane `1E, exhaust: Play a 1 Might Recruit`.
- per turn: k Constellations × 1 point for 3k fodder, at the start of the Main Phase (one Main Phase per turn; each Time Warp extra turn is another). Under the Lux loop fodder is unlimited (+1 Recruit per pass). Ability points are not capped by 470.
- arithmetic without Lux: Machine Evangel (5E+1P) killed as one of the 3 → 3 Recruits for next turn; ~1 point/turn per Constellation after a 10E+2P setup. Slow; not a combo on its own.
- legend: Mind/X. rules: 194.1.c, 470 (not applicable to ability points), 315 (one Main Phase per turn).
- attack: bounded per turn (once per Main Phase per copy); Turn to Dust / Thermo Beam kill it. Survives as ENGINE; becomes a 3-points-per-turn payoff for the Time Warp chain (C1) or a redundant finisher next to Renata.

### C4 · `jayce-mesmerize-renata` — refinement of catalogued `renata-mastermind-points` (INFINITE kill under Lux), confidence medium
- cards: VEN-068 Jayce, Brilliant Inventor (Mind, E6 P1 M6) `When you play me or the first time you play a non-token gear each turn, you may ready something besides me that's exhausted.` · VEN-052 Mesmerize (Mind, E1 P1, Reaction) `Choose one — Return a friendly unit to its owner's hand. / Give an enemy unit -2 Might this turn.` · SFD-088 Renata Glasc, Mastermind `4E + 4 Mind P, exhaust: Score 1 point. Use my abilities only while I'm at a battlefield.`
- loop (all Mind, no Fiora/Mighty crossing needed): Renata at a battlefield, exhausted after scoring → Mesmerize Jayce to hand (1E+1P) → replay Jayce (6E+1P) → "ready something besides me" → Renata ready → 4E+4P: score 1. Net per point: 11E + 6 Mind P, one Mesmerize to the trash (rides Forge's spare recycle slot; drawn back with Renata's 1E+1P draw). Zone change makes Jayce a new object (124) so "When you play me" fires every time.
- attack: Jayce enters exhausted (143.4) — irrelevant, his trigger is on play. Nothing per-turn on Jayce's play trigger. Survives; strictly a second route to the same catalogued kill. Also readies a Temporal Portal once per turn via the "first non-token gear" clause.

### C5 · `power-nexus-sentinel-turns` — ENGINE, confidence low-medium
- cards: SFD-214 Power Nexus `When you hold here, you may pay 4 rainbow P to score 1 point.` · UNL-087 Blue Sentinel `Your hold effects for holding here trigger an additional time. When I hold, [Add] rainbow P at the start of your next Main Phase.`
- per hold: 1 (hold Scoring) + 2 (Nexus twice, 8 Power) = 3 points per turn from one battlefield; per extra turn with C1. Probably a sibling of catalogued `ahri-blue-sentinel-hold`; listed because it is a battlefield-held STATE that scales with extra turns. Format: Duel random battlefield (485.5).
- attack: 470 caps the Scoring part only; the two Nexus triggers are ability points. Power (8/turn) is the binding cost natively (recycle 8 runes → deck refills 2/turn), fine under Lux. Survives as ENGINE.

### C6 · `swain-brambleback-conquer` — BURST-ish, confidence low
Count/state threshold: "played a non-token unit, a non-token gear, and a spell this turn".
- cards: VEN-065 Swain, Visionary (Mind, E6 P1 M6) `When I conquer, if you've played a non-token unit, a non-token gear, and a spell this turn, you score 1 point.` · UNL-029 Red Brambleback (Fury) `Your conquer effects for conquering here trigger an additional time.` Legend Fury/Mind (OGN-247, SFD-181, UNL-181).
- per conquer: 1 Scoring + 2 Swain = 3; two battlefields in Duel → 6 in one turn if both are conquered with Swain (Ganking from OGN-297 Windswept Hillock or SFD-133 Boots of Swiftness) — realistic reach 8 from 2. Threshold is cheap (any unit + Gold token does NOT count: "non-token gear"; a 0-1E gear + any spell).
- attack: probably adjacent to catalogued `tryndamere-brambleback` / `brambleback-trinity-skyfall-conquer`; needs Swain to move BF→BF and win both combats. Survives as BURST only with the Ganking piece; low confidence it is new.

### Notes — lines examined and NOT proposed (so REFUTE does not redo them)
- **Yasuo, Windrider** (OGN-205 `The third time I move in a turn, you score 1 point`): "the third time" is a once-per-object-per-turn trigger (383.1); bounce+replay resets it but each point then costs Rebuke/Retreat + 5E+1P + two move effects ≈ 11E+5P and Chaos is outside the Lux engine. Not a combo.
- **Vayne, Hunter** (OGN-035 conquer → 1E to hand, re-enters ready if the opponent controls a battlefield): capped by 470 at 2 conquers per turn in Duel. Not a combo.
- **Death from Below + Immortal Phoenix** (UNL-186 `you may play this from your trash for rainbow P` if the killed unit had ≤3 Might; OGN-037 `When you kill a unit with a spell, you may pay 1E + Fury P to play me from your trash`): a legal 1E+2P-per-cycle kill/re-play loop in Fury/Chaos, but no Deathknell or trigger in Fury/Chaos returns ≥1E+2P and no points come out. ENGINE with net-negative cost → not proposed.
- **Undertitan reveal engine** (SFD-175 `As I'm revealed from your deck, [Add] 2 Energy`, deck = only Undertitan, recycled after every reveal): +2E per reveal, deterministic with a 1-card deck, but every reveal source is once-per-event (Rek'Sai Swarm Queen attack, Void Burrower conquer, Teemo Strategist defend, Diana showdown, Apprentice Smith / Pakaa Protector move). Piece, not a loop.
- **Karthus, Eternal + Ekko** (OGN-236 `Your [Deathknell] effects trigger an additional time`): the second instance cannot pay "Recycle me" (Ekko is already in the deck; 416.3 cost must be completable) — no second rune-ready. Not an upgrade.
- **Tianna Crownguard vs Burn Out** (SFD-060 `While I'm at a battlefield, opponents can't score points`): 431.3.b protects only "points gained after the first Burn Out being processed in sequence", so the first point of each Burn Out looks preventable — that would make Burn Out a free "recycle your trash into your deck" for a Calm deck. UNRESOLVED: whether card-text "score points" covers 194.1.d "gain 1 point" from Burn Out. No Calm net-positive resource loop found to exploit it anyway.
- **Aspiring Engineer / Guardian of the Passage / Last Rites** trash-return of Forge or Ekko: Ekko recycles himself to the DECK (not trash) so trash-return cards never see him; Forge can be returned but the loop then needs a second draw engine. Redundant under the Lux loop, negative without it.
- **Dancing Grenade** (UNL-020 `Its controller may play this spell again for rainbow P`): infinite spell-plays for 1P each while targeting your own unit — no "when you play a spell" payoff in the pool converts to points; damage is not a win condition.
- **Hwei, Brooding Painter** move loops: each move draws 1 (Burn Out with an empty deck) and only the Gear branch readies runes; no free repeatable move in Mind.

## 3. hunt.md B-xx re-examination
I did not read hunt.md (task instruction). Its known-wrong premises that my lens corrects: (1) an empty deck turns Recycle into a tutor — used in §0 and C4; (2) Equipment effect text — SFD-078/VEN-068/SFD-221 gear readying makes Temporal Portal reusable (C1); (3) infinite resources make ability-point cards (Renata, Constellation, Power Nexus) the real kills and make Time Warp redundant rather than infinite.

## 4. Data anomalies (corpus_flat.txt)
- VEN-103 Shadows of the Past ends with a stray `[Effect] 1` — an Equipment-style effect field on a Spell; looks like a mis-joined column.
- Icon substitution errors: UNL-160 Ultrasoft Poro `two :rb_energy_1: :rb_might: Bird unit tokens` and VEN-109 Illaoi `play a :rb_energy_1: :rb_might: Tentacle` — the "1" of "1 Might" was rendered as an Energy icon.
- Missing keyword brackets: SFD-096 Laurent Bladekeeper `Ganking (...)`, SFD-138 Windsinger `Hidden (...)`, VEN-073 Jagged Cutlass `Equip :rb_rune_body:` — same keywords are bracketed everywhere else; a bracket-based parser will miss these.
- Modal separators lost: OGN-157 Udyr, OGN-200 Twisted Fate, SFD-049 Aphelios, UNL-080 Hwei, UNL-182 Curtain Call, VEN-052, VEN-111 (`—Deal 2...Stun...Ready me.Give me` run together).
- OGN-235 Karma, Channeler carries `[Tags: Vi, Ionia]` (should presumably be Karma).
- SFD-217 Seat of Power has a double period; UNL-T04 Buff and UNL-T08 XP Tracker have an empty type column; VEN-R01..R06 runes are `[NO TEXT]`.
- Code gaps (not read as errors, but worth confirming against the gallery): OGN-007, 042, 073, 089, 126, 166, 214; SFD-187, 197, 222-242; UNL-T07.
- SHARED_BRIEF says 935 cards / ~47k tokens; the file header agrees (935 distinct, 1189 printings).

## 5. Summary
- Time Warp: **bounded** — no card returns a self-banished spell; ceiling 3 copies × 2 (Repeat via Temporal Portal / The Academy, 820.1.c.3) = 6 extra turns; 2 hold points per turn max in Duel (470, 485.4); each extra turn with an empty deck costs a Burn Out point (413.2.a, 431.2.c). Under the Lux loop it is redundant with Renata.
- Candidates: INFINITE 0 new (C4 is a refinement of a catalogued kill); BURST 2 (C1, C6); ALT_WIN 1 (C2); ENGINE 2 (C3, C5).

## Appendix — progress log (raw, written during the run)

- file created; reading SHARED_BRIEF.md next










- brief + REFUTE_SPEC read; now grepping banish/Time Warp, then corpus slice 1 (lines 1-250)
- grep sweep for banish/copy/extra-turn done; primer 419/427/734-738 read. Preliminary Time Warp notes:
  - Cards that return things from Banishment: SFD-090 The Zero Drive (units banished WITH it), UNL-148 Cursed Sarcophagus (units banished WITH it), UNL-181 Virtuoso (spells banished WITH it -> trash after 4). Nothing in the grep returns a card banished by its OWN text. Rule 427.3: "Cards and effects can refer to cards that were banished by the same object" = the "banished with" gates are object-scoped.
  - Spell-copy effects found: none (Svellsongur/Reflection/Shady Spectacles/Zilean copy UNITS or unit text only).
  - Rule 738 example literally shows two Time Warps queueing two additional turns (bounded by copies).
- slice 1 (corpus lines 5-250, OGN-001..OGN-251) read. Lens index from slice 1:
  empty-deck/recycle: OGN-036 Vi Destructive (Recycle 1 from trash: +1 Might, no exhaust), OGN-099 Garbage Grabber, OGN-109 Dr. Mundo (recycle 3 at Beginning Phase), OGN-112 Kai'Sa Evolutionary (spell from trash, E cost < points, then recycle), OGN-121 Teemo Strategist, OGN-160 Dazzling Aurora (end of turn reveal-until-unit, play free), OGN-183 Stacked Deck, OGN-244 Divine Judgment (recycles RUNES too).
  rune states: OGN-113 Malzahar (kill+exhaust: 2 rainbow), OGN-134 Mobilize / OGN-138 Catalyst (draw if rune deck empty), OGN-186 Treasure Trove (leaves board: draw 1 + channel 1), OGN-200 TF Gambler (reveal+recycle top rune), OGN-230 Albus Ferros (buffs -> channel), OGN-104 Retreat (bounce + channel 1), OGN-216 Soaring Scout / OGN-075 Tasty Faefolk deathknell channel.
  zone reset / flicker: OGN-102 Portal Rescue (banish then play to base), OGN-035 Vayne Hunter (conquer -> 1E return to hand; enters ready if opp controls a BF), OGN-067 Blitzcrank (hold -> return to hand), OGN-181 Pack of Wonders (exhaust: bounce own gear/unit), OGN-023 Unlicensed Armory, OGN-077 Zhonya's.
  count thresholds: OGN-205 Yasuo Windrider (3rd move in a turn: score 1), OGN-027 Darius (2nd card), OGN-157 Udyr modal, OGN-236 Karthus (Deathknell x2), OGN-246 Viktor Leader, OGN-239 Machine Evangel.
  banish: OGN-122 Time Warp, OGN-102, OGN-062, OGN-025, OGN-242 (all banish-then-play, temporary).
- slice 2 (corpus lines 251-500, OGN-252..SFD-179) read. Lens index from slice 2:
  extra-turn multiplier: SFD-078 Temporal Portal (rainbow P, exhaust: next spell this turn gets [Repeat] equal to its cost) -> Time Warp x2 per copy; Repeat cost payable once (820.1.c.3).
  empty-deck/recycle/deck-top: SFD-169 Altar of Memories (unit dies: exhaust, draw 1, put a card from hand on TOP or bottom), SFD-175 Undertitan (as I'm revealed from deck: Add 2 Energy), SFD-018 Void Hatchling, SFD-041 Apprentice Smith, SFD-058 Ornn Blacksmith, SFD-170 Rek'Sai Swarm Queen (attack: reveal 2, play one, recycle), SFD-140 Fizz (spell from trash E<=3 then recycle), SFD-150 Last Rites (equip cost recycles 2 from trash; conquer/hold: play unit from trash), SFD-019 Assembly Rig, SFD-026 Rumble Hotheaded, SFD-061 Aspiring Engineer (gear from trash to hand), OGS-010 Annie Stubborn (spell from trash to hand), OGN-252 SMDR (conquer: discard 1 to return from trash).
  rune states: OGS-017 Dark Child (end of turn ready 2 runes), OGN-289 Targon's Peak (conquer: ready 2 runes at end of turn), OGN-287 Sigil of the Storm (conquer: recycle a rune), OGN-288 Startipped Peak (hold: channel 1), SFD-049 Aphelios (attach: ready 2 runes / channel 1, each mode once per turn), SFD-118 Boneshiver, OGS-014 Lux Crownguard (exhaust: 2E for spells), SFD-083/SFD-117 converters, OGN-265 Herald of the Arcane (1E exhaust: Recruit), SFD-039 Royal Entourage (ready a legend).
  zone/turn resets: SFD-060 Tianna Crownguard (while at a BF, opponents can't score points -> makes the FIRST Burn Out point preventable, 431.3.b only protects points after the first), SFD-104 Petricite Monument [Temporary], SFD-051 Guardian Angel, SFD-173 Soraka, OGS-020 Highlander, OGN-259 Unforgiven legend (2E exhaust: move to/from base), SFD-082 Ezreal Dashing (Mind P: move me to base), SFD-050 Azir Ascendant.
  count thresholds: SFD-027 Dunebreaker (<=2 in hand enters ready), SFD-176 Xin Zhao, SFD-072 Dropboarder, OGS-004 Yi Meditative (8+ runes), SFD-055 Needlessly Large Yordle (cost -2E-1P per hold point this turn), SFD-113 Lucian Merciless (first conquer each turn readies), SFD-148 Draven Audacious (first combat win each turn: 1 point), OGN-293 Grand Plaza.
  move->tokens: SFD-179 Corina Veraza (move to BF: 3 Recruits), OGN-222 Noxian Drummer, SFD-153 Eye of the Herald, SFD-130 Treasure Hunter, UNL-086 Zilean (once each turn).
  banish-related: SFD-090 Zero Drive (units only), OGS-021 Lady of Luminosity (spell >=5E: draw 1 -> forced draw, Burn Out risk with empty deck).
- slice 3 (corpus lines 501-750, SFD-180..UNL-208) read. Lens index from slice 3:
  Temporary suppression (zone-reset state): UNL-090 LeBlanc, Everywhere at Once ("Your [Temporary] effects at my battlefield don't trigger") + Temporary token makers UNL-081 Keeper of Masks (play: two Reflection copies here, all Temporary), OGN-094 Sprite Call, UNL-069 Sprite Burst, OGN-106 Sprite Mother, UNL-078 Sprite Fountain, UNL-084 Sprite Queen, UNL-082 Lillia Fae Fawn, UNL-189 Bashful Bloom legend (cost -1E per Temporary unit), UNL-086 Zilean (token doubled once per turn), UNL-048 Trevor. Kill: OGN-293 Grand Plaza (hold with 7+ units: win).
  hold-scored points: SFD-214 Power Nexus (hold: pay 4 rainbow P: score 1) x UNL-087 Blue Sentinel (hold effects here trigger an additional time). Gear ready: SFD-221 Veiled Temple (conquer: ready a friendly gear). Legend ready: SFD-210 Hall of Legends.
  extra-turn / spell recursion: UNL-181 Virtuoso full text confirms "banished with me" only, and returns to TRASH after four. UNL-131 Abandon (counter + return to hand). UNL-146 Syndra (Repeat in showdowns only; Time Warp is not Action/Reaction).
  banish/flicker: SFD-200 Arcane Shift, UNL-184 Thrill of the Hunt (flicker to ANY battlefield), UNL-169 Ashe Focused (only card that returns from Banishment: opponent's card on their hold).
  repeat-from-trash kills: UNL-186 Death from Below (<=3 Might: replay from trash for 1 rainbow P) + OGN-037 Immortal Phoenix (1E+1P from trash when a spell kills) = 1E+2P per kill/play cycle, no resource return found in Fury/Chaos.
  empty-deck hazards: SFD-212 Minefield (conquer: Burn 2 -> 431.1.b Burn Out), OGS-021 Lux legend forced draw, UNL-080 Hwei (move: draw 1 then discard; gear -> ready 2 runes), UNL-085 Sumpworks Map (opponent scores: draw 1).
  ready-units: SFD-192 Shurelya's (play: ready your units), SFD-204 On the Hunt, UNL-009 Upstage Comedy (Repeat), UNL-109 Blood Rose, SFD-180 Fiora Worthy.
  Lux loop calibration: OGN-212 Forge (Order), OGN-110 Ekko (Mind), UNL-165 Shadow's Call (Order E2), UNL-173 Sacrifice (Order E1 Reaction, kill Mighty: draw 2 + channel 1). Legend Mind/Order = OGS-021 / OGN-265 / SFD-201 / UNL-199. Closes as in REFUTE_SPEC A; Forge's 4th recycle slot is spare each pass -> one extra trash card can ride along per pass; SFD-088 Renata Mastermind "1E+1 Mind P: Draw 1" (no exhaust) makes the draw count arbitrary once resources are infinite.
- slice 4 (corpus lines 751-941, UNL-209..VEN-SP2) read. Lens index from slice 4:
  extra-turn multiplier #2: UNL-216 The Academy (hold: next spell this turn gets [Repeat] = base cost). Gear readiers: VEN-149 Defender of Tomorrow legend (1E exhaust: ready a gear), VEN-068 Jayce Brilliant Inventor (play me / first non-token gear each turn: ready something exhausted), VEN-150 Acceleration Gate.
  per-turn ability points (multiply with extra turns): VEN-067 Bottled Constellation (start of Main Phase: kill 3 other friendly units/gear: score 1), VEN-065 Swain Visionary (conquer + played unit+gear+spell this turn: score 1), VEN-046 Nasus Ascended (Empowered: conquer: score 1), VEN-138 Shen Leader (hold with exactly one other unit: score 1).
  empty-deck hazards: VEN-108 Forgotten Relic (Beginning Phase Burn 1), VEN-165 Shadow Temple (hold: Burn 3), VEN-002 Blade Twirler (first move: a player Burns 1), VEN-022 Endless Riches (skip Draw Phase; trash-bound cards banished).
  rune states: VEN-SP2 Sona (end of turn at BF: ready 4 runes), VEN-145 Curator legend, VEN-075 Platewyrm Egg, VEN-142 Dominus (unit gains "2 rainbow P: Ready me"), UNL-214 Ripper's Bay.
  banish: VEN-066 Temporal Breach (flicker same location), VEN-101 Gust Monk, VEN-110 Mel, VEN-106 Wind and Ghosts. VEN-103 Shadows of the Past (2 units from trashes to hand).
- all 4 slices done. Writing candidates next.
