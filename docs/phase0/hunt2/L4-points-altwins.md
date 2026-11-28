# L4 — Points, multipliers and alternate wins (PROPOSE pass, hunt v2)

Agent lens: every text containing "score", "point", "win the game", "Victory Score", "Burn",
"take a turn", "trigger an additional time", "hold effects", "conquer effects", across units,
spells, gear (Equipment [Effect] text included), battlefields and legends.
Sources: `data/corpus_flat.txt` (935 cards, read in full), `docs/phase0/rules-primer.md` (read in
full), `REFUTE_SPEC.md`, `hunt.md`. No web. Card text below is copied from the corpus.

---

## 0. Calibration — both verified infinites are visible in this corpus

**Lux infinite energy (Mind+Order, empty deck).** Forge of the Future OGN-212 (Order): `When you
play this, play a 1 Might Recruit unit token at your base. Kill this: Recycle up to 4 cards from
trashes.` Ekko, Recurrent OGN-110 (Mind, E5 P1 M5): `[Deathknell] — Recycle me to ready your
runes.` Shadow's Call UNL-165 (Order, E2): `Choose a friendly unit without [Temporary]. Give it
[Temporary]. Draw 2.` Sacrifice UNL-173 (Order, E1, Reaction): `As an additional cost to play
this, kill a friendly [Mighty] unit. Draw 2 and channel 1 rune exhausted.`
Why it closes: with the Main Deck EMPTY, Forge's kill recycles Forge+Shadow's Call+Sacrifice
(deck = 3, bottom == top, 416.1). Ekko (5 Might = Mighty, 708) is played for 5E + 1 Mind Power;
the Power comes from `Recycle this: Add [Power]` on a rune (164.2.b) which has no exhaust in its
cost, so an already-exhausted rune pays it. Exhaust the 11 other runes for 11E first. Shadow's Call
on Ekko, respond with Sacrifice killing Ekko: Deathknell recycles Ekko (deck = 4) and readies all
11 runes; Sacrifice draws 2 and channels the recycled rune back exhausted; Shadow's Call draws 2
(target gone, "do as much as you can", 055). Hand is again Forge/SC/Sac/Ekko; deck is 0. Costs per
pass 2+5+2+1 = 10E + 1P against 11E of readied runes: **+1E and +1 Recruit per pass, unbounded.**
Power comes from recycling further runes and channeling them back (Sacrifice, Retreat OGN-104), so
Power is available but roughly 4-5 Energy-equivalents per point of Power. I rank costs below in
(E, P) and flag Power-heavy outlets.

**Infinite Recruits (Chaos+Order, banned).** Stealthy Pursuer OGN-177: `When a friendly unit moves
from my location, I may be moved with it.` Eye of the Herald SFD-153 [Effect]: `When I move, play a
1 Might Recruit unit token here.` Renata Glasc, Industrialist SFD-171 (Order): `Your tokens enter
ready.` Eye on Pursuer. A ready Recruit Standard-Moves base -> battlefield (144.4, exhausting
itself); Pursuer "may be moved with it" (not a Standard Move, no exhaust); the Eye's granted
trigger plays a Recruit `here`, which enters ready under Industrialist; that Recruit moves back to
base, Pursuer follows, another ready Recruit. Closes. I can see both; proceeding.

---

## 1. Lens index (every card code my sweep returned)

**Point-granting texts ("score N point(s)" / "gain 1 point"):**
OGN-034 Tryndamere, Barbarian (Fury, conquer after attack, 5+ excess dmg) · OGN-066 Ahri, Alluring
(Calm, hold) · OGN-205 Yasuo, Windrider (Chaos, third move in a turn) · OGN-290 The Arena's Greatest
(bf, BANNED) · SFD-088 Renata Glasc, Mastermind (Mind, activated) · SFD-115 Trinity Force (Body
Equipment, [Effect] hold) · SFD-148 Draven, Audacious (Chaos, first combat win each turn; gives the
OPPONENT a point when he dies in combat) · SFD-214 Power Nexus (bf, hold, pay 4 Power) · UNL-177
Ivern, Friend to All (Order, conquer or hold, 4 tags) · VEN-046 Nasus, Ascended (Calm, Empowered,
conquer) · VEN-065 Swain, Visionary (Mind, conquer, played unit+gear+spell this turn) · VEN-067
Bottled Constellation (Mind gear, start of Main Phase, kill 3) · VEN-138 Shen, Leader of the Kinkou
Order (Order, hold, exactly one other unit) · rule 194.1.d opponent Burn Out.
**Point-referencing, not sources:** OGN-028 Draven Showboat · OGN-047 Find Your Center · OGN-079
Leona Zealot · OGN-112 Kai'Sa Evolutionary · SFD-055 Needlessly Large Yordle · SFD-060 Tianna
Crownguard (`opponents can't score points`) · SFD-201 Chem-Baroness · SFD-209 Forgotten Monument ·
UNL-085 Sumpworks Map · UNL-116 Poppy Paragon · UNL-195 Green Father / UNL-T03 Brush · VEN-053
Otterpus (replaces a first/second-turn scoring point with a draw) · VEN-091 Corrupted Dragon ·
VEN-109 Illaoi (`when I score`) · OGN-276 Aspirant's Climb (BANNED, +1 Victory Score).
**"win the game":** OGN-293 The Grand Plaza · UNL-088 Gutter Palace. (My grep returned no other
"win the game"/"lose the game" text; absence of finds only.)
**"take a turn":** OGN-122 Time Warp (Mind, E10 P4, `Take a turn after this one. Banish this.`).
**"trigger an additional time":** OGN-236 Karthus, Eternal (Deathknell) · UNL-029 Red Brambleback
(conquer effects here) · UNL-087 Blue Sentinel (hold effects here).
**"hold effects"/"conquer effects":** OGN-286 Reckoner's Arena (`When you hold here, activate the
conquer effects of units here.`) · SFD-030 Skyfall of Areion ([Effect] `My hold effects are also
conquer effects, and vice versa.`) · keyword Hunt (823.1.b, both).
**Copy effects:** SFD-059 Svellsongur · VEN-137 Shady Spectacles · UNL-081 Keeper of Masks ·
UNL-086 Zilean · UNL-199 Deceiver · UNL-200 Mirror Image · UNL-T06 Reflection.
**Burn:** VEN-002 Blade Twirler (`choose a player. They [Burn 1]`, first move each turn) · VEN-022
Endless Riches (self) · VEN-095 Shadow Order Disciple (self) · VEN-108 Forgotten Relic (self) ·
VEN-113 Kennen, Storm of Shuriken (self) · VEN-114 Kharox (`choose an opponent. They [Burn 3]` on
becoming Empowered) · VEN-144 Death Mark (self) · VEN-165 Shadow Temple (self, hold).
**Forced opponent draw/discard:** OGN-213 Hidden Blade (`Kill a unit at a battlefield. Its
controller draws 2.`) · SFD-005 Detonate (`Kill a gear. Its controller draws 2.`) · OGN-201 Invert
Timelines (`Each player discards their hand, then draws 4.`) · VEN-111 Minah Swiftfoot (`Each player
draws 1` mode, when I move to a battlefield) · UNL-135 Insightful Investigator (`they discard that
card and draw 1`) · OGN-033 Shakedown (you draw) · OGN-071 Party Favors (opponent chooses) ·
OGN-192 Mindsplitter / UNL-121 Bewitching Spirit (discard only) · OGN-025 Blind Fury (takes 1 card
off their deck, banishes then plays it).
**Ready engines legal in Mind+Order that reset on zone change (used for Renata):** SFD-062 Bubble
Bot (`When you play me, ready another friendly Mech.`) · SFD-073 Experimental Hexplate ([Effect]
`I am a Mech.`) · VEN-068 Jayce, Brilliant Inventor (`When you play me or the first time you play a
non-token gear each turn, you may ready something besides me that's exhausted.`) · flickers/bounces
OGN-104 Retreat, VEN-052 Mesmerize, OGN-102 Portal Rescue, VEN-066 Temporal Breach · relocation
SFD-079 Bard, Mercurial · UNL-083 Smoke and Mirrors.

---

## 2. Part (a) — point outlets under infinite Energy AND Power (Lux loop, Mind+Order)

### Ranking table (one turn, from 0 points, Duel/Match = 2 battlefields, 485.4/486.4)

| # | Outlet | Domain | Cost per ability point | Per-turn cap | Reaches 8 in one turn? | Legend |
|---|---|---|---|---|---|---|
| 1 | Renata Glasc, Mastermind SFD-088 | Mind | 4E + 4 Mind P + one ready (~4E via L4-01 engine) = ~8E+4P | none (activated, exhaust) | **YES, unbounded** | Mind+Order (Herald of the Arcane OGN-265, Lady of Luminosity OGS-021, Chem-Baroness SFD-201, Deceiver UNL-199) |
| 2 | Swain, Visionary VEN-065 / Ivern, Friend to All UNL-177 (conquer) | Mind / Order | ~7 resources per body, 2 points per body (both bfs) + relocation | 2 conquers per turn (470) | **YES with 3 bodies: (3+1)x2 = 8** | Mind+Order |
| 3 | Power Nexus SFD-214 + Blue Sentinel UNL-087 xK | colorless + Mind | 4 Power per point | (1+K) per hold, 1 hold/turn | No alone (K=3: 4+1=5); YES across Time Warp turns (15) | Mind+Order |
| 4 | Bottled Constellation VEN-067 x3 | Mind | 10E+2P once + 3 fodder per point (fodder = loop Recruits, free) | 1 per copy per Main Phase start | Not in one turn; **YES over 3 uninterrupted Time Warp turns (9)** | Mind+Order |
| 5 | Ivern / Shen Leader (hold) | Order | 6E / 6E+2P body | (1+K) per hold; Shen capped at 2+1 | Ivern + 3 Sentinel: 4+1 = 5/hold; needs Time Warp | Mind+Order |
| 6 | Shen, Leader VEN-138 | Order | — | hard cap 2 (+1 hold) per turn | No | Mind+Order |
| 7 | Yasuo, Windrider OGN-205 | **Chaos** | ~9E+2P per point (Ride the Wind + bounce + replay) | none (zone reset, 124) | would, but needs a Chaos legend — no infinite engine assumed there | Mind+Chaos / Order+Chaos |
| 8 | Trinity Force SFD-115 | **Body** | 4E + 1 Body P per equipment, per hold | hold-gated | No alone; see Part (b) | Mind+Body |
| 9 | Ahri, Alluring OGN-066 | **Calm** | 5E+1P per hold trigger | hold-gated | see hunt A-01 | Calm+Mind |
| 10 | Nasus, Ascended VEN-046 | **Calm** | 8E+1P + Empower 8E | conquer-gated | No | Calm+Fury for Brambleback |
| 11 | Tryndamere OGN-034 | **Fury** | 7E+2P | conquer-gated, excess dmg | see hunt A-02 | Fury+X |
| 12 | Draven, Audacious SFD-148 | **Chaos** | 6E+1P | first combat win each turn (resets on zone change) but needs an enemy defender per combat | No | — |
| 13 | Karthus OGN-236 | Order | — | doubles Deathknells; **no Deathknell in the corpus grants points** (sweep) | not a point outlet | — |

Outlets that need a Legend outside Mind+Order: Trinity Force (Body), Ahri (Calm), Yasuo (Chaos),
Nasus (Calm), Tryndamere (Fury), Draven Audacious (Chaos), Red Brambleback (Fury), Skyfall of
Areion (Fury), Svellsongur (Calm). Battlefields (Power Nexus, Reckoner's Arena, Grand Plaza) are
colorless and legal with any Legend.

### L4-01 — Renata Glasc, Mastermind fed by a zone-reset ready engine
- **Cards:** SFD-088 Renata Glasc, Mastermind (Mind, E5 M4): `:rb_energy_1::rb_rune_mind:: Draw 1.
  :rb_energy_4::rb_rune_mind::rb_rune_mind::rb_rune_mind::rb_rune_mind:, :rb_exhaust:: Score 1
  point. Use my abilities only while I'm at a battlefield.` · SFD-062 Bubble Bot (Mind, E3 M3):
  `When you play me, ready another friendly Mech.` · SFD-073 Experimental Hexplate (Mind, E1,
  Equip :rb_rune_mind:): `[Effect] I am a Mech.` · flicker: VEN-066 Temporal Breach (Mind, E2 P1,
  Hidden): `Banish a unit, then its owner plays it to the same location, ignoring its cost.` or
  OGN-102 Portal Rescue (Mind, E3 P1): `Banish a friendly unit, then play it to base, ignoring its
  cost.` or bounce OGN-104 Retreat (Mind, E1, Reaction) / VEN-052 Mesmerize (Mind, E1 P1) then
  replay Bot for 3E. Alternative engine: VEN-068 Jayce, Brilliant Inventor (Mind, E6 P1): `When
  you play me or the first time you play a non-token gear each turn, you may ready something
  besides me that's exhausted.`
- **Class:** INFINITE (given the Lux loop supplying resources; the point ability itself is
  unbounded within a turn).
- **Preconditions:** Lux loop running (empty deck, Forge, Ekko, SC, Sac, 12 runes); Renata at a
  battlefield you control (units may be played to a battlefield you control, 806.3/813.3.a);
  Hexplate attached to Renata; Bubble Bot on board; one flicker/bounce spell.
- **Steps (per point):** 1. Pay 4E + 4 Mind P, exhaust Renata: Score 1 point (activated ability,
  your turn, Open State, 381/145.2). 2. Flicker Bubble Bot (Temporal Breach 2E+1P) or bounce
  (Retreat 1E) and replay (3E). Bot is a new object (124), `When you play me` fires: ready Renata
  (she is a Mech via Hexplate, 718.3). 3. The spent spell sits in the trash; Forge's `Recycle up to
  4 cards from trashes` has one spare slot per loop pass (Forge+SC+Sac use three), so one flicker
  spell recurs per pass, and the pass draws it back (empty deck). 4. Repeat. Cost ≈ 8E + 4P (+1P
  for Breach) per point; 8 points ≈ 64-72E + 32-40 Mind P. Jayce variant: bounce+replay Jayce
  (1E + 6E+1P) gives one ready on play and a second when Forge is replayed that pass (new object,
  so "first time each turn" resets) = ~3.5E+0.5P per ready.
- **Legend:** Mind+Order — Herald of the Arcane OGN-265 (its `1E, exhaust: Play a 1 Might Recruit`
  is extra fodder) or Lady of Luminosity OGS-021.
- **Rules:** 124 (zone change = new object), 143.4, 145.2, 381, 414.4, 415.1.b, 718.3, 806.3.
- **Attack:** Power is the binding resource — the loop nets +1E per pass natively; Power costs a
  rune recycle plus a channel-back (Retreat/Sacrifice), i.e. several passes per Power. This is a
  scale question, not a legality question: the pass count is unbounded. Heimerdinger OGN-111 (`I
  have all exhaust abilities of all friendly legends, units, and gear`) with a second Hexplate is a
  second outlet body (halves the readies) — UNRESOLVED whether Renata's `Use my abilities only while
  I'm at a battlefield` rides along with the copied ability.
- **Confidence:** high on mechanics (this is the kill REFUTE_SPEC names); medium on realistic
  pass count.

### L4-02 — Swain, Visionary / Ivern conquering both Duel battlefields in one turn
- **Cards:** VEN-065 Swain, Visionary (Mind, E6 P1 M6): `When I conquer, if you've played a
  non-token unit, a non-token gear, and a spell this turn, you score 1 point.` · UNL-177 Ivern,
  Friend to All (Order, E6 M6): `As you play me, choose Bird, Cat, Dog, or Poro. I gain that tag.
  When I conquer or hold, score 1 point if your units have all of the following tags among them —
  Bird, Cat, Dog, and Poro.` · relocation SFD-079 Bard, Mercurial (Mind, E4 P1): `You may exhaust
  your legend as an additional cost to play me. When you play me, if you paid the additional cost,
  move any number of your units to an open battlefield.` · SFD-171 Renata Glasc, Industrialist
  (Order): `Your tokens enter ready.` (turns the loop's Recruits into an arbitrarily large ready
  attacking force).
- **Class:** BURST (two scoring events, same turn).
- **Preconditions:** loop running (satisfies Swain's unit+gear+spell clause: Forge is a non-token
  gear, Ekko a non-token unit, Shadow's Call a spell); you did not Hold either battlefield this turn
  (469.1 — a battlefield you already scored this turn cannot be conquered); 3 Swains (or 2 Swain +
  2 Ivern with the four tags among your units) deployed the PREVIOUS turn so they are ready at base
  (143.4: fresh units enter exhausted and cannot Standard-Move).
- **Steps:** 1. Standard-Move the 3 Swains (plus as many ready Recruits as needed) base -> bf A.
  Contest, showdown/combat, win, Establish Control -> Conquer (466.5.d): +1 (scoring) + 3 (one per
  Swain). 2. Swains are exhausted at A; play Bard exhausting the legend: move all three to bf B (an
  "open" battlefield — this is a spell/ability Move, not a Standard Move, so readiness is
  irrelevant). 3. Establish control at B -> Conquer: +1 + 3. **Total 8 from 0.** 4. Alternatives to
  Bard: Retreat each Swain (1E), replay to base (6E+1P), ready via L4-01's Bubble Bot engine
  (Hexplate on each Swain), Standard-Move to B; ~14 resources per Swain.
- **Arithmetic for fewer bodies:** N point-units conquering both battlefields give 2(N+1). N=3 ->
  8 from 0; N=2 -> 6 (from 2); N=1 -> 4.
- **Legend:** Mind+Order (any of the four).
- **Rules:** 143.4, 144.4, 420, 466.5.d, 469.1, 470, 471.1.a.1 (ability points ignore the Final
  Point restriction; the second Conquer's own point is fine at 7 because you scored every
  battlefield this turn, 471.1.b.1).
- **Attack:** "open battlefield" is not defined in the primer excerpt; corpus usage (Sneaky
  Deckhand OGN-176 `play me to an open battlefield`, Yone SFD-116 `When I conquer an open
  battlefield`) implies a battlefield with no units, so B must be empty of enemy units for the Bard
  route — UNRESOLVED: exact definition of "open". The Retreat/replay/ready route has no such
  dependency. Swain's clause is checked on resolution; all three card types are played every loop
  pass. Ivern's four tags are all available in Mind+Order (Poro: UNL-160 Ultrasoft Poro, UNL-156
  Loyal Poro, SFD-069, VEN-058; Bird: UNL-154 Crimson Pigeons, VEN-122, Bird tokens from UNL-160 /
  UNL-153 / UNL-088; Cat: VEN-132 Fallen Feline; Dog: VEN-125 Hungry Wolf, UNL-167 Starhound,
  UNL-166, SFD-067, VEN-063).
- **Confidence:** medium.

### L4-03 — Bottled Constellation x3 + Time Warp x3, fodder from the loop
- **Cards:** VEN-067 Bottled Constellation (Mind, E10 P2): `At the start of your Main Phase, you
  may kill 3 other friendly units and/or gear to score 1 point.` · OGN-122 Time Warp (Mind, E10
  P4): `Take a turn after this one. Banish this.` · Forge of the Future's Recruit per pass.
- **Class:** BURST across an uninterrupted sequence of your own turns (opponent never acts).
- **Preconditions:** loop running; 3 Constellations in play BEFORE the Main Phase that should
  trigger them; ≥9 fodder permanents on board at each Main Phase start (Recruits accumulate across
  passes; Gold tokens count as gear); Main Deck left NON-EMPTY at end of each turn (kill Forge once
  more and recycle without drawing) so the extra turn's Draw Phase does not Burn Out and hand the
  opponent a point (431.2.c).
- **Steps:** Turn N: loop; play 3 Constellations (30E+6P); Time Warp #1 (10E+4P). Turn N+1 (extra):
  Rune Pool empties (316.3), then start-of-Main-Phase effects (316.4): three Constellations, kill 9
  Recruits, **+3**. Loop again (Awaken readied everything, 415.3.a); Time Warp #2. Turn N+2: +3;
  Time Warp #3. Turn N+3: +3. **9 ≥ 8.** Deck limit 3 on Time Warp (banished, 427) caps this at
  three extra Main Phase starts.
- **Legend:** Mind+Order.
- **Rules:** 316.3-316.4, 431.2, 735-738 (additional turns queue), 427.
- **Attack:** hunt B-09 called this "one window per turn" — true, but Time Warp buys three more
  windows and the loop makes fodder free; the real limiter is deck limit 3 on Time Warp. The Draw
  Phase Burn Out trap above is the thing that actually goes wrong at the table.
- **Confidence:** medium.

### L4-04 — Power Nexus multiplied by Blue Sentinel (and Time Warp)
- **Cards:** SFD-214 Power Nexus (bf): `When you hold here, you may pay
  :rb_rune_rainbow::rb_rune_rainbow::rb_rune_rainbow::rb_rune_rainbow: to score 1 point.` ·
  UNL-087 Blue Sentinel (Mind, E4 P1 M4): `[Shield 2] Your hold effects for holding here trigger
  an additional time. When I hold, [Add] :rb_rune_rainbow: at the start of your next Main Phase.`
- **Class:** ENGINE (BURST only with Time Warp).
- **Mechanism:** control of a battlefield gives control of its abilities (190.6), so the Nexus's
  hold trigger is "your hold effect for holding here" and each Sentinel there adds one instance.
  K Sentinels -> 1+K instances, each `may pay 4 Power` -> 1+K points per Hold plus the Hold's own
  point (470). K=3: 5 per Beginning Phase, 12 Power. With Time Warp x3: 15 over three turns.
- **Legend:** Mind+Order (Nexus is colorless). Also fine with Mind+Body / Calm+Mind.
- **Rules:** 190.6, 469.2, 470, 471.2.b, 471.2.c tension resolved by 002 as in hunt A-01.
- **Attack:** hunt B-08 refuted the Nexus on the once-per-turn Hold gate but missed the multiplier
  and infinite Power. Still hold-gated per turn; format-dependent (your bf is 1 of 3 in Duel,
  chosen in Match). Rune Pool empties at start of Main Phase (316.3) — the Nexus trigger resolves in
  the Beginning Phase, so Power must be produced then (rune recycles are Reaction-speed Adds,
  429.3; legal).
- **Confidence:** medium.

### L4-05 — Ivern + Blue Sentinel xK (+ Reckoner's Arena double-dip), Mind+Order hold burst
- **Cards:** UNL-177 Ivern (quoted above) · UNL-087 Blue Sentinel · OGN-286 Reckoner's Arena:
  `When you hold here, activate the conquer effects of units here.`
- **Class:** BURST.
- **Arithmetic:** N Iverns, K Sentinels at a held battlefield: N(1+K) + 1. At Reckoner's Arena the
  Arena's own hold ability is also yours (190.6) and fires (1+K) times; each firing activates
  Ivern's conquer effect (his ability is "conquer or hold") -> Ivern total 2N(1+K). N=1,K=2 at the
  Arena: 6+1 = 7 (from 1). N=1,K=3: 8+1 = 9 from 0 with 4 bodies + tag units. Without the Arena
  N=2,K=2: 6+1 = 7; N=3,K=3: 12+1 = 13.
- **Preconditions:** hold through a Beginning Phase with the stack in place; Bird/Cat/Dog/Poro
  among your units (Ivern supplies one tag; three cheap taggers elsewhere, e.g. Ultrasoft Poro +
  its Bird token + Fallen Feline).
- **Legend:** Mind+Order.
- **Rules:** 190.6, 469.2, 470, 471.2.b, 002.
- **Attack:** the Arena double-dip assumes "activate the conquer effects" of an ability that is
  both conquer and hold executes it again (I think yes: the Arena instructs an activation, the
  hold trigger is separate). UNRESOLVED: whether Blue Sentinel multiplies the Arena's own trigger
  (I read "your hold effects" as including controlled-battlefield abilities). Same 471.2.c tension
  as A-01. Body count (Ivern + Sentinels + taggers) is the weakness; L4-07 needs two.
- **Confidence:** medium (low for the Arena double-dip).

### L4-06 — Shen, Leader of the Kinkou Order: hard-capped
- **Card:** VEN-138 (Order, E6 P2 M7): `When I hold, if there is exactly one other unit you control
  here, you score 1 point.` With exactly one Blue Sentinel as the other unit: 2 + 1 hold = 3 per
  turn. Any second multiplier body breaks "exactly one other". Svellsongur (Calm) copies on Shen
  would add instances (Calm+Order) but each still requires exactly one other unit: Shen + 3
  Svellsongur + 1 other = 4+1 = 5/turn. Not 8 in one event.
- **Class:** ENGINE. **Confidence:** high that the cap holds.

---

## 3. Part (b) — multiplier stacks WITHOUT infinite resources

Shared load-bearing assumption for every line here: Blue Sentinel / Red Brambleback add trigger
instances despite 471.2.c ("These cannot be triggered more than once per turn for a player") —
card text supersedes (002); hunt A-01/A-02 rest on the same reading. Second shared fact: an
Equipment's [Effect] text is appended to the equipped unit's rules text (718.3/434.1.c), so
`When I hold, score 1 point` on Trinity Force is that unit's own hold effect.

### Summary table (one scoring event)

| ID | Line | Legend pair | Points in the event | Bodies | Total cost (E / P) | From score |
|---|---|---|---|---|---|---|
| L4-08 | Red Brambleback x2, one carrying Trinity Force x3 + Skyfall of Areion, attack | Fury+Body | 1 + 3x(1+2) = **10** on the Conquer; then 1 + 3 = 4 on the following Hold | **2** | 8E+2P (Bramblebacks) + 12E (TF) + 3E (Skyfall) + 3 Body P + 1E+1 Fury P (equips) = **24E + 6P** | 0 |
| L4-08 (min) | Red Brambleback x1 + Trinity Force x3 + Skyfall | Fury+Body | 1 + 3x2 = **7** per Conquer, 4 per Hold | **1** | 20E + 5P | 1 |
| L4-07 | Blue Sentinel x2, each with Trinity Force, Hold | Mind+Body | 1 + 2x(1+2) = **7** | **2** | 8E+2P + 8E + 2 Body P = **16E + 4P** | 1 |
| L4-07 (max) | Blue Sentinel x3 each with TF | Mind+Body | 1 + 3x4 = **13** | 3 | 24E + 6P | 0 |
| L4-07 (alt) | Blue Sentinel x2 + TF x3 (third on any unit) | Mind+Body | 1 + 3x3 = **10** | 3 | 20E + 5P | 0 |
| L4-09 | Ahri + Svellsongur, Blue Sentinel + Svellsongur x2, Hold | Calm+Mind | 1 + 2x(1+3) = **9** | 2 | 5E+1P + 4E+1P + 9E+3P + 3E+3 Calm P = **21E + 8P** | 0 (rules-uncertain) |
| L4-05 | Ivern + Blue Sentinel x2 at Reckoner's Arena, Hold | Mind+Order | 1 + 2x3 = **7** | 3 + taggers | 6E + 8E+2P = 14E+2P + taggers | 1 (bf-dependent) |
| hunt A-01 | Ahri x2 + Blue Sentinel x3 | Calm+Mind | 1 + 2x4 = 9 | 5 | 22E+5P | 0 |
| hunt A-02 | Tryndamere + Brambleback x2 | Fury | 1 + 3 = 4 | 3 | 15E+4P | — (needs 4+) |
| L4-08b | One unit with TF x3 + Skyfall at Reckoner's Arena, Hold | Fury+Body | 1 + 3 (hold) + 3 (Arena activates the same three, now conquer effects) = **7** | 1 | 20E+5P | 1 (bf-dependent; Brambleback does not multiply Arena activations — UNRESOLVED) |

Karthus (Deathknell x2) is not a point multiplier: my sweep found no Deathknell that grants
points. Shady Spectacles is a body-count extender (below), not a multiplier of its own.

### L4-07 — Blue Sentinel carrying Trinity Force (Mind+Body)
- **Cards:** UNL-087 Blue Sentinel (quoted in L4-04) · SFD-115 Trinity Force (Body, E4 M+2):
  `[Equip] :rb_rune_body: (:rb_rune_body:: Attach this to a unit you control.) [Effect] When I
  hold, score 1 point.`
- **Class:** BURST.
- **Preconditions:** control one battlefield through your Beginning Phase with 2 Blue Sentinels
  there, each equipped with a Trinity Force. Units enter exhausted — irrelevant for Holding.
- **Steps:** 1. Turn A: play Sentinel #1 to the battlefield you control (or base, then move next
  turn); play TF, Equip it (1 Body P). 2. Turn B: Sentinel #2 + TF #2 likewise. 3. Beginning Phase
  of turn C: Hold (469.2) -> +1 (470). Each Sentinel's granted `When I hold, score 1 point` is a
  hold effect for holding here; two Sentinels present -> each fires 1+2 = 3 times -> **+6**. Total
  7. Third Sentinel+TF -> 13.
- **Why it beats A-01:** the multiplier bodies are the point sources, so N and K are the same
  units; 2 bodies instead of 5. Blue Sentinel defends at 4 +2 (Shield 2) +2 (TF Might bonus) = 8.
- **Legend:** Mind+Body — **Defender of Tomorrow VEN-149** (the only Mind/Body legend in the
  corpus). Its `1E, exhaust: Ready a gear` is irrelevant here.
- **Rules:** 434.1.c/718.3 (effect text appended), 469.2, 470, 471.2.b, 471.1.a.1, 002 vs 471.2.c.
- **Attack:** the opponent gets a full turn to kill a 4-Might body or contest the battlefield;
  TF's Might bonus and Shield help. Detaching (Angle Shot SFD-011 is Fury; Veiled Temple SFD-221
  lets the CONTROLLER detach) is not a common enemy line. Survives on paper.
- **Confidence:** high on the arithmetic, medium overall (rests on the A-01 reading of 471.2.c).

### L4-08 — Red Brambleback + Trinity Force x3 + Skyfall of Areion (Fury+Body)
- **Cards:** UNL-029 Red Brambleback (Fury, E4 P1 M4): `[Accelerate] Your conquer effects for
  conquering here trigger an additional time. When I conquer, [Buff] a friendly unit.` · SFD-115
  Trinity Force (above) · SFD-030 Skyfall of Areion (Fury, E3 M+2): `[Equip]
  :rb_energy_1::rb_rune_fury: [Effect] My hold effects are also conquer effects, and vice versa.`
- **Class:** BURST.
- **Preconditions:** Brambleback B1 equipped with three Trinity Forces and Skyfall (Might 4 + 6 +
  2 = 12); second Brambleback B2 ready (or played this turn with Accelerate, 1E + 1 Fury P); an
  enemy-controlled or uncontrolled battlefield you did not score this turn.
- **Steps:** 1. Standard-Move B1 and B2 base -> that battlefield (144.4; they become attackers).
  2. Combat (or showdown only, if no enemy units are there): 16 attacking Might, win, Establish
  Control -> Conquer -> +1. 3. B1's three granted hold effects `When I hold, score 1 point` are
  "also conquer effects" (Skyfall) and so trigger on conquering here (471.2.a); two Bramblebacks
  here -> each triggers 1+2 = 3 times -> **+9. Total 10 from 0.** 4. Next Beginning Phase, Hold:
  +1 + 3 (Brambleback multiplies conquer effects only) = 4 more.
- **Arithmetic:** T Trinity Forces on Skyfall-equipped units, K Bramblebacks present:
  1 + T(1+K). T=3,K=1: 7 (one body). T=3,K=2: 10. T=2,K=1: 5. T=3,K=3: 13 (three bodies, 28E+8P).
- **Legend:** Fury+Body — Relentless Storm OGN-249, **Purifier SFD-183** (`Your Equipment each give
  [Assault]` -> B1 attacks at 16), Pridestalker UNL-183, Butcher of the Sands VEN-141.
- **Rules:** 144.4, 465-466 (combat, Establish Control), 466.5.d, 471.2.a, 718.3, 002.
- **Attack:** (i) Does "hold effect" for Skyfall include effects GRANTED by other equipment? They
  are appended to the unit's rules text (718.3) and worded `When I hold`, so yes on the plain
  reading. (ii) The Conquer point itself is subject to the Final Point restriction (471.1.b) but
  the nine ability points are not (471.1.a.1). (iii) B1 must survive combat to be present when
  control is established; 12 Might with Tank-less defenders is realistic. (iv) Requires an
  attackable battlefield each turn — Duel has two. This dominates hunt A-02 (no excess-damage
  clause, fewer bodies).
- **Confidence:** medium-high.

### L4-09 — Svellsongur on Ahri AND on Blue Sentinel (Calm+Mind)
- **Cards:** SFD-059 Svellsongur (Calm, E3 P1 M+0): `[Equip] :rb_energy_1::rb_rune_calm: ... As
  this is attached to a unit, copy that unit's text to this Equipment's effect text for as long as
  this is attached to it.` · OGN-066 Ahri, Alluring (Calm): `When I hold, you score 1 point.` ·
  UNL-087 Blue Sentinel.
- **Class:** BURST. **Mechanism:** hunt A-06 only put Svellsongur on Ahri. Putting it on Blue
  Sentinel duplicates `Your hold effects for holding here trigger an additional time` — each copy
  is a separate passive, so one Sentinel with two Svellsongurs counts as K=3.
- **Arithmetic:** Ahri (1 Svell -> 2 triggers) + Sentinel (2 Svell -> +3): 2 x (1+3) = 8, +1 Hold
  = **9 from 0, two bodies.** Ahri alone + Sentinel (3 Svell): 1 x 5 + 1 = 6.
- **Legend:** Calm+Mind — Nine-Tailed Fox OGN-255 etc.
- **Rules:** 718.2 (attached card's own rules text is Inactive) vs 725.1 (passive that applies
  "as it Attaches" is processed) — the same load-bearing reading as A-06; plus 002/471.2.c.
- **Attack:** if 725.1 does not rescue Svellsongur, nothing here works. Ranked below L4-07/L4-08
  for that reason. Confidence: low-medium.

### L4-10 — Shady Spectacles as extra multiplier bodies (Mind+Order)
- **Card:** VEN-137 Shady Spectacles (Order, E4 M+0): `[Equip] :rb_energy_1::rb_rune_order: ...
  As this is attached to a unit, choose another friendly unit. The equipped unit becomes a copy of
  that unit for as long as this is attached to it. [Effect] (I am a copy of the chosen unit.)`
- **Use:** a Recruit token wearing Shady Spectacles copying Blue Sentinel is a fourth/fifth/sixth
  Sentinel past the 3-copy deck limit (5E+1P each vs 4E+1P for a real Sentinel — only worth it past
  three). A Recruit copying Ivern is a 5E+1P Ivern (no tag chosen, but the tag condition is over
  all your units). Copying Shen breaks Shen's "exactly one other". Copying a unit does not copy its
  equipment, so a Shady copy of a Trinity-Forced Sentinel is a bare Sentinel.
- **Class:** ENGINE (extender). **Confidence:** medium; whether a copy of Blue Sentinel keeps the
  Spectacles' own [Effect] line is immaterial.

### L4-11 — Karthus, Eternal
- `Your [Deathknell] effects trigger an additional time.` No Deathknell in the corpus scores
  points (sweep of "score"/"point" texts above). Relevance to this lens: doubling Machine Evangel
  OGN-239 (`Play three 1 Might Recruit unit tokens`) or Ferrous Forerunner SFD-021 makes 6 / 4
  fodder bodies for Bottled Constellation. ENGINE only.

---

## 4. Part (c) — alternate wins and forced Burn Out

### L4-12 — The Grand Plaza + infinite ready Recruits + Time Warp (ALT_WIN, no opponent window)
- **Cards:** OGN-293 The Grand Plaza (bf): `When you hold here, if you have 7+ units here, you win
  the game.` · OGN-212 Forge of the Future (one Recruit per loop pass) · SFD-171 Renata Glasc,
  Industrialist (Order): `Your tokens enter ready.` · OGN-122 Time Warp (Mind): `Take a turn after
  this one. Banish this.` Non-loop version: OGS-015 Recruit the Vanguard (Order, E6): `Play four 1
  Might Recruit unit tokens. (They can be played to your base or to battlefields you control.)`
- **Class:** ALT_WIN.
- **Steps (loop version):** 1. Loop until ≥7 Recruits exist; with Industrialist they are ready.
  2. Standard-Move them to the Grand Plaza (contest, win the showdown/combat by numbers, Establish
  Control). 3. Time Warp (10E+4P). 4. Your extra turn's Beginning Phase: Hold with 7+ units here ->
  win (195: an effect instructing you to win is immediate). The opponent never receives priority
  between step 2 and the win except inside the showdown.
- **Steps (no loop, two turns):** hunt A-03. Adding Time Warp to A-03 removes the opponent's
  turn: Recruit the Vanguard x2 (12E) + Time Warp (10E+4P) = 26 resources in one turn — over the
  12-rune ceiling; realistic only across two turns (Vanguard turn N, Vanguard + Time Warp turn
  N+1: 16E+4P, still over 12 without Gold/Seals). Flag as resource-bound.
- **Legend:** Mind+Order.
- **Rules:** 195, 469.2, 485.5 / 486.5 (battlefield selection: random in Duel, chosen in Match).
- **Attack:** battlefield dependence (1/3 in Duel). Otherwise the cleanest deterministic finish the
  loop deck has — cheaper than 8 Renata activations if the Plaza is in play.
- **Confidence:** high on rules, format-dependent.

### L4-13 — Gutter Palace + Time Warp (ALT_WIN)
- **Card:** UNL-088 Gutter Palace (Mind, E4): `At the start of your Beginning Phase, if you have
  exactly 4 cards in hand and exactly 4 units at battlefields, you win the game. Discard 1,
  :rb_exhaust:: Play a 1 Might Bird unit token with [Deflect].`
- **Steps:** arrange 4 cards in hand / 4 units at battlefields (the Palace's own ability tunes both
  counters, hunt A-04), then Time Warp -> your next Beginning Phase is immediate -> win. Cost 4E +
  10E+4P = 18 resources; two turns realistically (Palace turn N, Time Warp turn N+1 with hand
  count adjusted for Time Warp leaving the hand). Temporary units die before the check (816.1.b)
  — do not count them.
- **Legend:** any Mind legend. **Rules:** 195, 816.1.b, 735. **Confidence:** medium (resource
  ceiling), high on rules.

### General note — Time Warp is the scoring-event multiplier for every hold-gated line
Every Hold-based burst (L4-04, L4-05, L4-07, L4-09, A-01, A-06) and Bottled Constellation gets one
extra scoring event per Time Warp, and the opponent gets no turn in between. Time Warp is Mind,
so it is legal in Mind+Body (L4-07), Calm+Mind (L4-09), Mind+Order (L4-04/05). Three copies max
(banish, 427). Hunt B-30 refuted it only as a loop; as a 3-event extender it is live.

### L4-14 — Repeatable opponent Burn via Kharox re-Empowerment (ENGINE, no kill)
- **Cards:** VEN-114 Kharox (Chaos, E6 M5): `[Empower] :rb_energy_6::rb_rune_chaos::rb_rune_chaos:
  ... When I become [Empowered], choose an opponent. They [Burn 3]. Then you may do this: Choose a
  unit in their trash and play it, ignoring its cost.` · VEN-035 Sanction (Calm, E3 P1, Reaction):
  `Choose one —Empower a unit. Disempower it at end of turn.Disempower a unit that's [Empowered].
  Empower it at end of turn.` · VEN-099 Tornado Warrior (Chaos, Hidden): `When you play me from
  face down, you may empower something here. Disempower it at end of turn.` · VEN-082 Profiteer
  (Body): `disempower something you control to empower a legend, unit, or gear.`
- **Mechanism:** "When I become Empowered" is a crossing trigger (828.1.d); Sanction mode 2 on an
  Empowered Kharox disempowers him now and re-Empowers him at end of turn -> Burn 3 again; next
  turn repeat. 3 opponent cards per Sanction (3E+1P), 9 per turn with three; Tornado Warrior adds 3
  per hidden play. Hunt B-11 called Kharox one-shot; it is not.
- **Why it is still not a kill:** each Burn Out (431.2) recycles the victim's ENTIRE trash into
  their deck before you get 1 point (431.2.c), so after the first point you must burn deck+trash
  again (~30+ cards) per further point. The repeated-Burn-Out cascade of 431.3 (points until you
  win, 431.3.c) requires deck AND trash both empty. Opponent-trash removal found: VEN-101 Gust
  Monk (`banish a card from any trash`, 1 card), Kharox's own rider (1 unit per trigger, to your
  board), UNL-007 Smite (`If it would die this turn, banish it instead`, board only), UNL-103
  Disposal Order (recycles their trash — the WRONG direction). UNL-204 Keeper's Verdict puts an
  enemy unit on top/bottom of their deck (also anti-mill). Nothing repeatable at scale surfaced.
- **Legend:** Calm+Chaos (Unforgiven OGN-259, Blade Dancer SFD-195, Gloomist UNL-193).
- **Class:** ENGINE (one point when their deck first empties, then a card-quality tax).
- **Confidence:** medium on the re-Empower mechanic; high that it is not a kill.

### L4-15 — Forced opponent draws (ENGINE, no kill)
OGN-213 Hidden Blade (Order, 2E+1P): `Kill a unit at a battlefield. Its controller draws 2.` ·
SFD-005 Detonate (Fury): `Kill a gear. Its controller draws 2.` · OGN-201 Invert Timelines (Chaos):
`Each player discards their hand, then draws 4.` (symmetric — with YOUR empty loop deck you Burn
Out and hand them a point) · VEN-111 Minah Swiftfoot (Chaos): `Each player draws 1` per move ·
UNL-135 Insightful Investigator (Chaos, 2 XP): `they discard that card and draw 1`. Hidden Blade is
Order and recurs through the Forge slot in the loop deck, but each use needs an enemy unit AT A
BATTLEFIELD to kill — bounded by the opponent's board, and Burn Out refills their deck. Best case:
the point they give up when their deck first hits 0. Also VEN-002 Blade Twirler (Fury): `The first
time I move each turn, choose a player. They [Burn 1].` — resets on zone change (124) but 1 card
per bounce+replay. Class ENGINE. Confidence high that none reaches a kill.

### L4-16 — Yasuo, Windrider zone-reset points (needs a Chaos engine)
OGN-205 (Chaos, E5 P1): `[Ganking] The third time I move in a turn, you score 1 point.` The "third
time" counter is a delayed replacement/trigger that fires once (383.1/390.3); bounce + replay makes
a new object (124) and re-arms it. Per point: Standard Move (exhaust) -> OGN-173 Ride the Wind
(Chaos, 2E+1P, `Move a friendly unit and ready it`) = move #2 -> Standard Move #3 -> bounce (Retreat
1E or Mesmerize) -> replay 5E+1P ≈ 8-9E+2P and two spells to recur. Legal under Mind+Chaos (Swift
Scout OGN-263) — but the only infinite engine assumed is Mind+Order, so Yasuo has no resource
source here. Class: INFINITE only if a Chaos-legal engine exists (not this lens). Confirms B-03 for
the loop deck. Confidence low that it matters.

---

## 5. hunt.md re-examination (entries my lens touches)

- **B-01 Renata** — flips to WORKS given the loop; the missing piece the hunt did not consider is
  a zone-reset play-trigger ready (Bubble Bot + Hexplate, Jayce) rather than a "free ready". L4-01.
- **B-02 Renata + Shurelya's** — Shurelya's Requiem SFD-192 is Calm/Mind in this corpus, illegal
  with Order; moot as the hunt said.
- **B-03 Yasuo** — stands for any deck without a Chaos-legal infinite (L4-16).
- **B-04 Reckoner's Arena + Nasus** — stands (Nasus 16E per body), but the Arena + Ivern + Blue
  Sentinel line (L4-05, Mind+Order) was not considered; Ivern is conquer-or-hold so the Arena
  double-dips him.
- **B-05 Mirror Image / Deceiver copies** — stand (Temporary dies before scoring, 816.1.b).
- **B-08 Power Nexus** — the Hold gate stands, but the hunt missed that a controlled battlefield's
  hold trigger is "your hold effect" (190.6) and is multiplied by Blue Sentinel; with infinite
  Power it is 1+K points per hold (L4-04).
- **B-09 Bottled Constellation** — per-turn cap stands; with loop fodder + Time Warp x3 it is a
  9-point uninterrupted sequence (L4-03).
- **B-10 Draven Audacious** — "first time each turn" does reset on zone change (124), but each
  point needs a won combat, i.e. an enemy defender; stands as no-kill.
- **B-11 Burn Out** — stands as no-kill, with the correction that Kharox is repeatable via Sanction
  / Tornado Warrior (L4-14), and the explicit statement of what a real mill kill would need
  (deck AND trash empty, 431.3).
- **B-30 Time Warp** — self-banish stands; the hunt undervalued three extra turns as a scoring-
  event multiplier for every hold-gated burst and for both alternate wins (L4-03, L4-12, L4-13).
- **A-01 Ahri x Blue Sentinel** — dominated by L4-07 (Sentinels carrying Trinity Force: 2 bodies
  for 7, 3 for 13; Mind+Body instead of Calm+Mind).
- **A-02 Tryndamere x Brambleback** — dominated by L4-08 (Trinity Force + Skyfall on a Brambleback:
  no excess-damage clause, 10 from 0 with two bodies).
- **A-03 / A-04 alternate wins** — refined: Time Warp removes the opponent's disruption turn
  (L4-12, L4-13).
- **A-06 Svellsongur** — extended to Svellsongur on Blue Sentinel (L4-09), same rules uncertainty.

## 6. Data anomalies noticed

1. VEN-103 Shadows of the Past (a Spell) ends with a stray `[Effect] 1` — spells have no effect
   text; looks like a parse artifact.
2. UNL-160 Ultrasoft Poro reads `Play two :rb_energy_1: :rb_might: Bird unit tokens` and VEN-109
   Illaoi `play a :rb_energy_1: :rb_might: Tentacle` — the numeral "1" was tokenised as an Energy
   icon; should be "1 Might".
3. Keyword brackets missing on VEN-073 Jagged Cutlass (`Equip`), SFD-096 Laurent Bladekeeper
   (`Ganking`), SFD-138 Windsinger (`Hidden`).
4. OGN-200 Twisted Fate and other modal cards (OGN-157 Udyr, SFD-049 Aphelios, VEN-111 Minah,
   UNL-080 Hwei) have their modes concatenated without separators.
5. UNL-T04 Buff and UNL-T08 XP Tracker have an empty type column.
6. SFD-217 Seat of Power ends with a double period; OGN-158 `Bases are not battlefield` (sic).
7. Code gaps: OGN-007, 042, 073, 089, 126, 166, 214; SFD-187, 197; UNL-T07 — hunt.md cites Sona,
   Harmonious as OGN-073 but this corpus lists her only as VEN-SP2 (code drift between corpora).
8. hunt.md §0.4 (five-letter domain encoding, Calm/Chaos collision) does not apply to this corpus,
   which prints full domain names — e.g. Shurelya's Requiem is unambiguously Calm/Mind here.
9. SFD-060 Tianna Crownguard `opponents can't score points` — rules distinguish Scoring (Conquer/
   Hold, 468) from Gaining points (ability/Burn Out); which the card blocks is UNRESOLVED and
   matters for any opponent facing L4-01/L4-14.
10. UNL-053 Scuttle Crab parenthetical `(Units with 0 Might can conquer and hold.)` is rules text
    embedded as a reminder — fine, but note Reflection tokens (0 Might) can therefore conquer.
