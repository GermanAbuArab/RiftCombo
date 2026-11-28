# L5 — Recursion, bounce and replay (PROPOSE pass, hunt v2)

Agent lens: every trash→hand/board return, every bounce/recall, every enter/move trigger worth
re-buying, every play-from-trash permission; then (a) which bounce + trigger pairs become
repeatable engines under the Lux infinite-resource assumption and whether any WIN without
Renata Glasc, Mastermind, (b) which bounce loops are resource-neutral without infinite
resources, (c) Guardian Angel / recall replacements vs Deathknell and kill-as-cost, (d) Death
from Below as a removal engine.

Sources read in full: `data/corpus_flat.txt` (941 lines), `docs/phase0/rules-primer.md`,
`docs/phase0/REFUTE_SPEC.md`, `docs/phase0/hunt.md`. No web. Quotes are copied verbatim from the
corpus (icons abbreviated: `E`=Energy, `P`=Power, `[A]`=any-domain Power).

---

## 0. Calibration

**A. Lux infinite energy — closes.** OGN-212 Forge of the Future `When you play this, play a 1
Might Recruit unit token at your base. Kill this: Recycle up to 4 cards from trashes.` OGN-110
Ekko, Recurrent (E5 P1 M5) `[Deathknell] — Recycle me to ready your runes.` UNL-165 Shadow's Call
(E2) `Choose a friendly unit without [Temporary]. Give it [Temporary]. Draw 2.` UNL-173 Sacrifice
(E1, Reaction) `As an additional cost to play this, kill a friendly [Mighty] unit. Draw 2 and
channel 1 rune exhausted.` Ekko is printed 5 Might → Mighty (708). "Kill this:" on Forge is an
activated ability with a non-exhaust cost, so a ready-or-exhausted Forge can always fire it in an
Open State (381). With the Main Deck EMPTY, Recycle-to-bottom (416.1) == next draw. Per pass:
Forge recycles Forge + Shadow's Call + Sacrifice (3 of its 4 slots), Ekko recycles himself = 4
cards in deck; Sacrifice draws 2 + Shadow's Call draws 2 = 4 draws. Exactly balanced, no Burn Out.
Ekko's Deathknell readies every rune → ~11 Energy back for a ~10 Energy pass. The Power for Ekko
comes from `Recycle this: Add [Power]` on a rune (164.2.b, no exhaust), and Sacrifice channels
that rune back. I can see why it closes. Two notes I rely on later: (i) Forge's **4th recycle
slot is unused** in the base pass; (ii) Shadow's Call needs a fresh `friendly unit without
[Temporary]` each pass — Forge's Recruit is the natural target, so that Recruit dies at the next
Beginning Phase (816.1.b) and cannot count toward a Hold.

**B. Infinite Recruits — closes.** OGN-177 Stealthy Pursuer `When a friendly unit moves from my
location, I may be moved with it.` SFD-153 Eye of the Herald **[Effect]** `When I move, play a 1
Might Recruit unit token here.` SFD-171 Renata Glasc, Industrialist `Your tokens enter ready.`
A ready Recruit Standard-Moves (exhausting itself, 144.2); Pursuer "may be moved with it" — not a
Standard Move, no exhaust cost; the Eye's granted trigger fires on Pursuer's move and plays a
Recruit *here* which enters ready; that Recruit moves, Pursuer follows, repeat. Closes.

---

## 1. Index for this lens (card codes)

**1a. Trash → hand / board (non-Flow).** OGN-037 Immortal Phoenix (spell-kill → pay 1E+Fury,
play me from trash) · OGN-112 Kai'Sa, Evolutionary (conquer → play spell from trash, E cost <
points, then recycle it) · OGN-165 Cemetery Attendant (play → return unit trash→hand) · OGN-170
Morbid Return · OGN-196 Soulgorger (play → play unit from trash ignoring E) · OGN-198 The
Harrowing · OGN-226 Spectral Matron (≤E3 ≤1P from trash ignoring cost) · OGN-252 Super Mega
Death Rocket! (conquer → discard 1 → trash→hand) · OGN-264 Guerilla Warfare (Hidden cards) ·
OGS-010 Annie, Stubborn (spell trash→hand) · SFD-019 Assembly Rig (recycle unit from trash as
cost) · SFD-026 Rumble, Hotheaded (conquer → recycle friendly unit → play Mech from trash) ·
SFD-035 Guardian of the Passage (hold → unit/gear trash→hand) · SFD-061 Aspiring Engineer (play
→ gear trash→hand) · SFD-090 The Zero Drive (banish & replay units) · SFD-140 Fizz, Trickster
(play → play spell ≤E3 from trash ignoring E, then recycle) · SFD-150 Last Rites [Effect]
(conquer/hold → play unit from trash, pay costs) · SFD-165 Glasc Mixologist (Deathknell → ≤E3
≤1P from trash ignoring cost) · UNL-025 Undying Legion (`[Legion] You may play me from your trash
for 3E+Fury` — no banish clause) · UNL-142 Heedless Resurrection (Reaction; kill friendly →
play unit from trash costing ≤ it, ignoring cost) · UNL-148 Cursed Sarcophagus · UNL-167
Starhound (Bird/Cat/Dog/Poro trash→hand) · UNL-168 Undying Loyalty (≤E2 ≤1P from trash ignoring
cost) · UNL-186 Death from Below · VEN-022 Endless Riches · VEN-103 Shadows of the Past (up to
2 units from trashes → hands) · VEN-104 Tail-Cloaked Matriarch (becomes Empowered → ≤E3 ≤1P
from trash to base) · VEN-113 Kennen, Storm of Shuriken (conquer → give trash spell Flow) ·
VEN-114 Kharox (opp Burn 3 → play unit from their trash) · OGN-281 Hallowed Tomb (champion
trash→Champion Zone) · UNL-179 Rift Herald (Deathknell → play unit from HAND ignoring E).
**Flow (play from trash, then banish — two uses max, 829.1.b):** VEN-003, 012, 031, 049, 051,
081, 100, 105, 116, 127, 140, 144, 148, 154, 156; VEN-098 Stargazer discounts them.

**1b. Bounce (to hand) / flicker / recall.** To hand: OGN-035 Vayne, Hunter (self, on
conquer, 1E) · OGN-067 Blitzcrank, Impassive (self, on hold) · OGN-104 Retreat (Mind E1
Reaction, `Its owner channels 1 rune exhausted`) · OGN-169 Gust · OGN-172 Rebuke · OGN-181
Pack of Wonders (Chaos gear, exhaust) · OGN-187 Whirlwind · OGN-188 Zaunite Bouncer · SFD-044
Legion Quartermaster (gear, as cost) · SFD-132 Beast Below · SFD-135 Factory Recall (gear) ·
SFD-138 Windsinger · SFD-147 Downwell · SFD-207 Emperor's Dais (BF; conquer → 1E + return
unit here → 2M Sand Soldier) · UNL-021 Grim Apothecary (Fury, Ambush) · UNL-128 Star-Crossed ·
UNL-131 Abandon (countered spell → hand) · UNL-132 Angler Beast · UNL-134 Existential Dread ·
UNL-185 Bloodharbor Ripper (legend, 1E exhaust; + Gold) · UNL-214 Ripper's Bay (BF; unit here
returned to hand → owner may pay 1E to channel 1 rune exhausted) · VEN-052 Mesmerize (Mind E1
P1 Reaction, mode: return friendly unit) · VEN-106 Wind and Ghosts · VEN-107 Decree of Discord ·
VEN-115 Ocean Drake · OGN-263 Swift Scout (Teemo → hand). **Flicker (banish → replay ignoring
cost, re-fires play triggers, 124):** OGN-102 Portal Rescue (Mind E3 P1, to base) · SFD-200
Arcane Shift (Mind/Chaos, self-banishes) · UNL-184 Thrill of the Hunt (Fury/Body, to any BF) ·
VEN-066 Temporal Breach (Mind E2 P1 Hidden, same location). **Recall (to base, not hand; death
replacement):** OGN-023 Unlicensed Armory · OGN-077 Zhonya's Hourglass · OGS-020 Highlander ·
SFD-051 Guardian Angel [Effect] · SFD-173 Soraka, Wanderer · UNL-175 Tactical Retreat · OGN-269
The Boss · UNL-206 Altar of Blood · OGN-227 Symbol of the Solari · OGN-203 Possession · UNL-140
Conscription · SFD-184 Relentless Pursuit.

**1c. Enter / play triggers worth re-buying (Mind or Order marked *).** Hand/board disruption:
UNL-169 Ashe, Focused* · OGN-192 Mindsplitter · UNL-121 Bewitching Spirit · UNL-135 Insightful
Investigator · OGN-026 Brynhir Thundersong. Removal: OGN-092 Riptide Rex* (deal 6 to enemy at BF)
· OGN-234 Harnessed Dragon* (kill enemy unit) · SFD-158 Sandshifter* (kill enemy ≤3) · OGN-225
Solari Chief* (stun/kill) · OGN-149 Carnivorous Snapvine · OGS-018 Tibbers · OGN-116
Thousand-Tailed Watcher*. Bodies: OGN-211 Faithful Manufactor* (Recruit here) · OGN-218 Vanguard
Captain* (Legion: 2 Recruits here) · SFD-157 Royal Guard* (Sand Soldier here) · OGN-106 Sprite
Mother* (ready Sprite, Temporary) · UNL-078 Sprite Fountain* (gear; Deathknell repeats) · UNL-081
Keeper of Masks* · UNL-033 Frisky Hunter · VEN-109 Illaoi · SFD-174 Trove Golem* (four Gold gear
tokens exhausted) · SFD-081 Card Sharp*. Move-triggers: OGN-222 Noxian Drummer* · SFD-179 Corina
Veraza* (Accelerate; 3 Recruits on move to BF) · UNL-082 Lillia, Fae Fawn*. Death payoffs:
OGN-239 Machine Evangel* (3 Recruits) · SFD-021 Ferrous Forerunner (2 Mechs) · SFD-155 Honest
Broker* (Gold) · OGN-216 Soaring Scout* / UNL-152 Black Rose Dignitary* (channel 1) · OGN-096
Watchful Sentry* (draw 1) · OGN-246 Viktor, Leader* (`When another non-Recruit unit you control
dies, play a 1 Might Recruit unit token into your base`) · OGN-236 Karthus, Eternal* (`Your
[Deathknell] effects trigger an additional time`). Draw/resources: OGN-087 Lecturing Yordle* ·
VEN-048 Cloud Drake* · VEN-069 Mel* · SFD-149 Ezreal, Prodigy · UNL-053 Scuttle Crab · OGN-137
Stormclaw Ursine · OGN-230 Albus Ferros*. Ready: OGN-132 First Mate · SFD-062 Bubble Bot* (Mech)
· VEN-068 Jayce, Brilliant Inventor* (`ready something besides me`) · SFD-039 Royal Entourage ·
OGN-243 Darius, Executioner*. Accelerate (enter ready): OGN-001/010/030/039/075/110/116/150/
151/162, SFD-002/029/068/103/131/143/177/179, UNL-006/024/029/082/115/127, VEN-016/019.

**1d. Other replay-relevant.** OGN-111 Heimerdinger, Inventor (`I have all exhaust abilities of
all friendly legends, units, and gear`) · SFD-088 Renata Glasc, Mastermind (`1E+Mind: Draw 1` —
NO exhaust; `4E+4 Mind, exhaust: Score 1 point`; both only at a battlefield) · OGN-122 Time Warp
(Mind E10 P4, `Take a turn after this one. Banish this.`) · UNL-087 Blue Sentinel (Mind; hold
effects here trigger an additional time) · VEN-138 Shen, Leader of the Kinkou Order (Order; hold
with exactly one other unit → 1 point) · SFD-214 Power Nexus (BF; hold → 4P → 1 point) ·
OGN-293 The Grand Plaza (BF; hold with 7+ units → win) · UNL-088 Gutter Palace (Mind).

---

## 2. The constraint every replay loop inherits: the card-cycling budget

Infinite Energy/Power (assumed per brief) does NOT give infinite *cards*. A bounce spell or a
flicker spell goes to the trash after use (157); to use it again it must come back to hand. In
the Lux deck the only in-loop return path is Forge's `Recycle up to 4 cards from trashes` +
draws, and the base pass is exactly balanced (4 recycled / 4 drawn). Hard accounting:

- Forge's **4th slot is free** every pass (Forge, Shadow's Call, Sacrifice use 3; Ekko recycles
  himself). One extra card can be recycled per pass at no cost.
- Every extra recycled card needs **exactly one extra draw in the same pass**, otherwise the deck
  grows by 1 per pass. Because Forge's 4 land first (random order, 416.5) and Ekko is recycled
  afterwards (bottom), the un-drawn card is **Ekko** → the next pass has no Ekko in hand. Three
  Ekko copies buy three unbalanced passes, then the loop stops.
- Balanced fillers for the 4th slot: a bounce spell whose bounced unit draws 1 on play (Retreat
  + OGN-087 Lecturing Yordle `When you play me, draw 1`; the Yordle stays in hand, only Retreat
  cycles) — self-balancing but yields nothing beyond the channel from Retreat. A *payoff* bounce
  (Retreat → Ashe) is 1 slot / 0 draws and is unbalanced by itself.
- Ways to buy the missing draw: (i) **SFD-088 Renata Glasc, Mastermind's first ability** `1E +
  Mind: Draw 1` has NO exhaust cost — with infinite resources it is unbounded draw while she is
  at a battlefield (the brief's "without Renata" excludes her *score* ability; note whether a
  candidate uses her draw). (ii) **Two Forges in the cycle** (8 slots): Forge A, Forge B,
  Shadow's Call, Sacrifice + OGN-083 Consult the Past (Mind E4, draw 2) + SFD-087 Premonition
  (Mind E2 P3, draw 3) = 6 slots, deck 8 + Ekko = 9, draws 2+2+2+3 = 9 → **two free slots** for
  payoff spells per pass, at +2E, +4E, +2E+3P extra cost. (iii) **Second Ekko + second
  Sacrifice per pass**: both Ekkos self-recycle; Forge recycles Forge, SC, Sac, Sac' (slots full);
  deck 6, draws 2+2+2 = 6, balanced, and the second Deathknell readies all runes again → pass
  nets about +6E instead of +1E (11+11 readied vs 16 spent) and two Ekko deaths for death
  payoffs. No free slot, though.
- Zero-slot payoffs are therefore the most valuable: things the base pass already produces for
  free — **a Recruit at base every pass (Forge)** and **an Ekko death every pass** (Viktor,
  Leader → Recruit; Wraith of Echoes once/turn; Spectral Centaur Might; Karthus doubling).

Power note (not re-derived, brief says assume it): each Power = one rune recycled (164.2.b) and
the rune must be re-channeled to keep the 12 on board — Sacrifice channels 1/pass, Retreat 1 per
cast, Trove Golem's Golds add Power without touching runes (L5-06). The Power subloop competes
for the same 4th slot, so "infinite Power" is slow (≈ +1P per several passes) unless Golds or
Renata's draw are used. Refute pass: please check this slot arithmetic rather than the Energy.

---

## 3. Candidates

### L5-01 · Lux loop → ready Recruits → The Grand Plaza (7+ units) → Hold → WIN  — class ALT_WIN
**Cards.** OGN-212 Forge of the Future `When you play this, play a 1 Might Recruit unit token at
your base.` · SFD-171 Renata Glasc, Industrialist (Order E4 P1) `Your tokens enter ready.` ·
OGN-246 Viktor, Leader (Order E4 P1) `When another non-Recruit unit you control dies, play a 1
Might Recruit unit token into your base.` · OGN-293 The Grand Plaza `When you hold here, if you
have 7+ units here, you win the game.` · optional OGN-122 Time Warp (Mind E10 P4) `Take a turn
after this one. Banish this.` · loop core OGN-110 / UNL-165 / UNL-173.
**Preconditions.** Main Deck empty, 12 runes, Lux loop running (see §0.A). Renata Industrialist
and Viktor, Leader on board (anywhere). The Grand Plaza is the battlefield in play and I control
it (or it is uncontrolled — moving units in with no defender establishes control, 466.5).
**Steps.** 1. Run a base pass. Forge's Recruit enters **ready** (Renata I.); Ekko's death fires
Viktor, Leader → second Recruit into base, also ready. 2. Shadow's Call must target `a friendly
unit without [Temporary]`: give it to Forge's Recruit (it will die at Beginning Phase, 816.1.b);
Viktor's Recruit stays clean. 3. Standard-Move Viktor's ready Recruit base → Grand Plaza
(144.4.a; moving exhausts it, irrelevant for Hold). 4. Repeat ≥7 passes → ≥7 non-Temporary units
at the Plaza. (Variant §2(iii) double-Ekko gives 2 Viktor Recruits per pass.) 5a. Pass the turn;
at my Beginning Phase I Hold the Plaza → win (195, immediate). 5b. Or play Time Warp (10E+4P)
before passing: the next turn is mine (737), the opponent never acts; Temporary units die at the
start of my Beginning Phase before scoring (816.1.b), then the Hold check fires with 7+ units → win.
Leave ≥1 card in the deck before the extra turn's Draw Phase (end the loop after a Forge recycle
without drawing) or the draw Burns Out and hands the opponent a point (431.2.c).
**Per-iteration.** −(base pass) ≈ +1E; +1 Plaza-eligible Recruit (2 with double Ekko). Zero
extra card slots (Viktor and Renata I. sit on the board; Time Warp is a one-shot from hand).
**Domains.** Mind + Order → OGS-021 Lady of Luminosity, OGN-265 Herald of the Arcane, SFD-201
Chem-Baroness, UNL-199 Deceiver. Grand Plaza is domainless.
**Rules relied on.** 143.4 (units enter exhausted; overridden by Renata I. for tokens), 144.4.a,
184.1, 350.2, 466.5, 469.2/470 (one Hold per BF per turn suffices), 195, 816.1.b, 737, 431.
**Best attack.** (a) Battlefield selection: Duel picks 1 of my 3 at random (485.5) → 1/3 unless
duplicate battlefields are legal (UNRESOLVED: may a battlefield set contain 3 copies of one
name?); Match lets me choose (486.5). (b) Without Time Warp the opponent has one turn: a
sweeper (UNL-180 The Ruination, OGS-018 Tibbers, OGN-133 Flurry of Blades, OGN-123 Unchecked
Power) or contesting the Plaza kills it; VEN-132 Fallen Feline ×3 can name three spells. With
Time Warp there is no window. (c) Does Shadow's Call still draw 2 if I instead target Ekko and
he dies to Sacrifice first? Not needed here (Recruit is the target). (d) Rune Pool empties at end
of turn (167) — irrelevant, nothing is spent on the extra turn before the Hold. Survives.
**Confidence.** medium (high on rules, medium on the empty-deck + 12-rune setup being reached).

### L5-02 · Ashe, Focused hand-strip loop (documented) — refined with the cycling budget  — class ENGINE
**Cards.** UNL-169 Ashe, Focused (Order E5 P1 M4) `When you play me, choose an opponent. They
reveal their hand. Choose a card revealed this way and banish it. When they hold, return it to
their hand (even if I'm no longer on the board).` Replay tools in-domain: OGN-104 Retreat (E1)
`Return a friendly unit to its owner's hand. Its owner channels 1 rune exhausted.` · VEN-052
Mesmerize (E1 P1) `Choose one — Return a friendly unit to its owner's hand. …` · OGN-102 Portal
Rescue (E3 P1) `Banish a friendly unit, then play it to base, ignoring its cost.` · VEN-066
Temporal Breach (E2 P1, Hidden) `Banish a unit, then its owner plays it to the same location,
ignoring its cost.`
**Steps per strip.** Retreat Ashe (1E, +1 rune channeled) → replay Ashe (5E+1P) → banish one card
from their hand; or Portal Rescue / Temporal Breach (3E+1P / 2E+1P) → Ashe re-enters ignoring
cost → same trigger (new object, 124). Their banished cards return only `When they hold` — if I
hold both battlefields they never come back.
**Cycling.** Each strip consumes one spell → one Forge slot → one unmatched draw (§2). Fixes:
Renata Mastermind's `1E+Mind: Draw 1` (uses her, not her score), or the 2-Forge configuration
(two strips per pass), or accept 3 unbalanced passes (3 Ekkos) → 3 strips, which already empties
a typical hand.
**Domains.** Mind + Order (same legends as L5-01). **Rules.** 124, 157, 416.5, 419.
**Best attack.** It does not win; an empty opposing hand plus infinite removal (L5-04) plus
Hold/Conquer scoring wins over 2–3 turns, or L5-01/L5-05 win outright. Deflect is irrelevant
(Ashe chooses a player/card, not a unit). Survives as ENGINE. **Confidence.** high (engine),
n/a (no kill).
