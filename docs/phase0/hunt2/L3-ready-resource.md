# Hunt 2 — Lens L3: ready effects and resource generation

Agent L3, 2026-09-02. Scope: anything that readies, refunds or generates Energy/Power/runes/cards; anything that lets a permanent act twice; Rune-Deck recycle loops; legends with resource abilities crossed with readiers.

## Progress log

- (file created before any reading)

## Inventory: ready effects

## Inventory: resource producers

## Inventory: act-twice / once-per-turn resets

## Candidates

## Target (a): net-positive engine outside Mind+Order

## Target (b): Ornn Calm+Mind gear deck

## Data anomalies

## Summary
- Read SHARED_BRIEF.md, REFUTE_SPEC.md, rules-primer grep (167, 414/415, 430, 805). Corpus slices via Bash overflowed the tool output limit; switching to 125-line Read slices.

### Interim notes after corpus lines 1-500 (OGN, OGS, SFD-001..179)
Calibration: Forge of the Future OGN-212, Ekko OGN-110 ("[Deathknell] — Recycle me to ready your runes"), Stealthy Pursuer OGN-177, Eye of the Herald SFD-153 ("[Effect] When I move, play a 1 Might Recruit unit token here"), Renata Industrialist SFD-171 ("Your tokens enter ready") all located; Lux pieces UNL-165/173 expected in slice 3+. Both loops read as the REFUTE_SPEC worked examples describe.

Ready effects (units/gear/runes/legend) seen so far: OGN-011 Magma Wurm (others enter ready) · OGN-021 Sun Disc · OGN-027 Darius Trifarian (2nd card: ready me) · OGN-059 Eclipse Herald (stun: ready me) · OGN-091 Pit Crew (play a gear: ready me) · OGN-110 Ekko (deathknell: ready runes) · OGN-129 Confront · OGN-132 First Mate (ready another unit) · OGN-146 Wallop (spend buff = free; ready a unit) · OGN-147 Wildclaw Shaman · OGN-152 Mistfall (on buff, Body Power + exhaust: ready it) · OGN-153 Overt Operation · OGN-157 Udyr (spend buff: ready me, modal) · OGN-162 Miss Fortune Captain (first move each turn: ready something else) · OGN-173 Ride the Wind (move + ready) · OGN-202 Jinx Rebel (discard: ready me) · OGN-243 Darius Executioner · OGN-260 Last Breath · OGN-269 The Boss (conquer: ready legend) · OGN-289 Targon's Peak (conquer: ready 2 runes at end of turn) · OGS-017 Dark Child Starter (end of turn: ready 2 runes) · SFD-004 Bushwhack · SFD-039 Royal Entourage (ready or exhaust a legend) · SFD-047 Simian Ancestor (buff: ready me) · SFD-049 Aphelios Exalted (attach Equipment: modal, Ready 2 runes / Channel 1 exhausted / Buff, each mode once per turn) · SFD-062 Bubble Bot (ready a Mech) · SFD-072 Dropboarder · SFD-113 Lucian Merciless (first conquer: ready me) · SFD-154 Guards! (Order Power: ready token).

Resource producers: Seals OGN-040/081/120/163/204/245 (E0 P1; exhaust: Add 1 domain Power) · OGN-098 Energy Conduit (E3; exhaust: +1 Energy) · OGN-113 Malzahar Fanatic (kill friendly unit/gear + exhaust: +2 rainbow) · OGN-247 Daughter of the Void (legend; exhaust: rainbow, spells only) · OGN-253 Hand of Noxus (legend; exhaust, Legion: +1 Energy) · OGN-265 Herald of the Arcane (legend; 1E exhaust: Recruit) · OGS-014 Lux Crownguard (exhaust: +2 Energy, spells only) · SFD-083 Hextech Anomaly / SFD-117 Ancient Henge (1:1 converters) · SFD-175 Undertitan ("As I'm revealed from your deck, Add 2 Energy") · Gold makers: SFD-004, SFD-063 Chemtech Cask, SFD-069, SFD-070, SFD-074, SFD-081, SFD-086 World Atlas, SFD-101 Fae Dragon (spend a buff: Gold), SFD-121, SFD-130 Treasure Hunter (when I move: Gold), SFD-134, SFD-152, SFD-155, SFD-162, SFD-174 · Channel: OGN-047, OGN-071, OGN-075, OGN-104 Retreat, OGN-134, OGN-137, OGN-138, OGN-155, OGN-186, OGN-216, OGN-230 Albus Ferros (spend buffs: channel each), OGN-249 legend, OGN-288, SFD-049, SFD-118 · Rune recycle: OGN-200 Twisted Fate, OGN-287 Sigil of the Storm · Cost reducers: OGN-084, OGN-140, SFD-012, SFD-146, SFD-141, SFD-149 Ezreal Prodigy ("Optional additional costs you pay cost 1E or 1 rainbow less" — makes Accelerate cost only the Power or only the Energy).

Act-twice / resets: OGN-111 Heimerdinger Inventor (has all exhaust abilities of friendly legends, units, gear) · OGN-236 Karthus (Deathknells trigger twice) · SFD-078 Temporal Portal (Repeat = cost) · OGN-286 Reckoner's Arena · SFD-030 Skyfall · SFD-059 Svellsongur (copies unit text).

Reveal effects (for Undertitan): OGN-121 Teemo Strategist, SFD-170 Rek'Sai Swarm Queen (attack: reveal 2, play one, recycle rest), OGN-160 Dazzling Aurora, SFD-041 Apprentice Smith (when I move: reveal top; gear → draw, else recycle), SFD-018 Void Hatchling.
