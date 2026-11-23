# Radiance synergy reads (#664), 2026-11-23

Radiance (RAD, 219 printings) took the pool from 1189 printings to 1408, and it changed the match list
of **183 of the 222 rules** in `data/synergies.json`: 179 live rules and the 4 retired ones
(`ekko-deathknell-runes`, `nocturne-horrifying-deck-top-look`, `rhasa-trash-counter`,
`zhonyas-hourglass-cost-still-paid`). Each of the 183 lists only grew. **1008 instances were added, 0
were removed, and every added card is a RAD base.** Every one of the 1008 was read before its stamp
moved, and the stamps were not re-stamped in bulk. This file is that read, one table per rule.

## How the lists were read

1. **Drift.** `partnersOf` runs on master's `cards.json` and `legality.json` and on this branch's, and the
   two lists are diffed per rule, the 4 retired rules included. Both indexes read 2026-11-23. The date
   does not change a list: `partnersOf` reads the rule's excludes and not the ban list. Measured: 183
   rules drifted (986 instances on the live rules, 22 on the retired ones), 1008 added, 0 removed.
2. **Packets.** The 1008 rows went out in 11 packets to read agents. Each agent got the rule's anchor,
   predicate, `why`, `basis.rules` and current excludes, and each new card's full text. Each row came
   back with a verdict (`fits`, `false-positive` or `unsure`), the fragment the predicate caught, and a
   reason.
3. **Fragment check.** Every quoted fragment was checked against the card's `text` + `effect`,
   whitespace-normalised. Of the 1008 rows, 162 sit on field-only rules (types or tags), which have no
   text to quote. 5 fragments are not verbatim on their own printing. Those 5 are the showcase prints
   `RAD-SP1`, `RAD-SP3` and `RAD-SP4`, which print `[Disarm]` without its reminder text. Each of the 5
   is verbatim on its sibling print (`RAD-038`, `RAD-109`, `RAD-063`), and the row says so.
4. **Re-read.** The implementer re-read every row a packet did not call a fit (115 `false-positive`, 4
   `unsure`) against the card text and Core Rules 2026-10-09, with the rule's existing excludes as
   precedent. So did the one row a re-read showed to be the same shape as an excluded card
   (`irelia-fervent-buff-is-choosing` `RAD-154`, the `SFD-166` line).
5. **Outcome.** 98 rows became an `excludes` entry `{card, why}` across 59 rules; each `why` is the
   one quoted in the row. 22 rows stay as fits and carry a note on the limit the reader has to apply.
   The other 888 are fits as the packet read them; the implementer did not re-walk those rows.

| Packet verdict | Final | Rows |
|---|---|---|
| fits | fits | 888 |
| false-positive | excluded | 96 |
| false-positive | fits, with a limit | 19 |
| unsure | fits, with a limit | 3 |
| unsure | excluded | 1 |
| fits | excluded | 1 |

## Two list policies these reads apply, and did not invent

- **A pair the two cards' domains cannot share stays in the list.** The deck-time Domain Identity
  check (103.1.b) decides whether the anchor and the partner can sit in one deck, as it does for every
  pair in these lists, and `blade-dancer-buff-is-choosing`'s own `why` concedes it. `RAD-146` The Ball
  on the two Ganking rules is the case in point.
- **Where a rule's `why` already concedes a limit, a card past that limit stays as a fit with a note.**
  The limit is a cost cap on `rell-magnetic-free-equip-attach` and on `undying-loyalty`. Excluding it
  there would make the list disagree with the rule's own text.

## The stamp

`reviewed` is 2026-11-23 on all 183 rules, `reviewedCount` is the new list length, and `reviewedSet`
is its fingerprint. Checked per rule: new count = old count + added - excluded, with 0 removed. Result:
183 rules, 1008 added, 98 excluded, 0 mismatches. `npx vitest run test/synergies.test.ts`: 44 passed.

## Same shape, older card, left alone

Some older cards have the shape of an excluded RAD row and still sit in the same list without an
exclude. That defect predates this ingest, so those cards are not touched here and go to a new issue.

How the table was built: `partnersOf` was run on this branch for each rule. A card is listed when its
code is named in an excluded row's packet reason and the card is still in that rule's list. Cards
named as a contrast were dropped: `SFD-104` on `allay-eager-admirer-granted-deflect-sums`, and
`UNL-086` on `gemcraft-seer-vision-generalization` and `grand-plaza-unit-tokens`. Every remaining
card's text was read against its RAD row.

| Rule | Older cards still listed | Same shape as | Shape |
|---|---|---|---|
| `jayce-readies-exhaust-abilities` | `UNL-018`, `UNL-073`, `UNL-145` | `RAD-052`, `RAD-100`, `RAD-101` | the only exhaust ability is in the quoted Gold token reminder |
| `jayce-readies-exhaust-abilities` | `OGN-186`, `UNL-136`, `UNL-161` | `RAD-012` | the exhaust ability kills its own source, so a ready finds nothing |
| `heimerdinger-inventor-exhaust-copy` | `UNL-018`, `UNL-145` | `RAD-052`, `RAD-105` | the quoted Gold token reminder |
| `heimerdinger-inventor-exhaust-copy` | `OGN-186` | `RAD-012` | the exhaust ability kills its own source |
| `renata-industrialist-tokens` | `OGN-094`, `OGN-106`, `UNL-048`, `UNL-069`, `UNL-078`, `UNL-084`, `UNL-189`, `UNL-199`, `UNL-200` | `RAD-009` | the card already plays its token ready |
| `magma-wurm-mass-ready` | `OGN-094`, `OGN-106`, `UNL-069` | `RAD-009` | the card already plays its token ready |
| `sandswept-tomb-choose-friendly-spells` | `OGS-020`, `SFD-114`, `UNL-107`, `UNL-165`, `UNL-175`, `VEN-040`, `VEN-083` | `RAD-102` | no Power in the cost (`power` null on all eight), so the one-rainbow discount floors at 0 (356.4.c.2) |
| `weaponmaster-equip-discount` | `UNL-158` | `RAD-123` | an `[Equip]` cost with no rune component (821.1.c.3); `UNL-158` pays XP |
| `cull-the-weak-friendly-death-outlet` | `UNL-078` | `RAD-062` | the Deathknell is on a gear, and Cull the Weak kills units |
| `portal-rescue-replays-a-body` | `OGN-212`, `UNL-078` | `RAD-116` | a gear, never the friendly unit Portal Rescue banishes |
| `matriarch-of-war-empower-relay`, `soul-reflection-empower-relay`, `risen-altar-empower-discount` | `VEN-139`, `VEN-149` | `RAD-139` | a legend: beside a legend anchor (103.2), or not the unit the Altar discounts |
| `simian-ancestor-buff-ready` | `OGN-056`, `OGN-164` | `RAD-043` | "buff me" buffs itself and never the anchor (355.10.d) |
| `jae-medarda-chosen-by-spell` | `OGN-153` | `RAD-154` | "buff all friendly units" chooses no unit |

Not judged here: `OGN-160` on `undertitan-reveal-fuel` (the packet says it "may share the defect")
and the gear `[Empower]` members of `risen-altar-empower-discount`.

## The lists

### `blue-sentinel-hold`

Anchor `UNL-087` Blue Sentinel. Matched 46 -> 54 (+8, -0); 3 excluded; stamp 46 -> 51.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-067` Clocktower Guardian | fits | When you play me or when I hold, [Predict 3]. | Predict 3 on each hold: the second trigger looks at three more cards and re-sorts, a real second use, not a no-op. |
| `RAD-160` Cosmic Vista | fits | When you hold here, if your Rune Deck is empty, you score 1 point. | 'When you hold here' is a hold effect for holding here, which is the anchor's own phrase; the Rune-Deck-empty condition is not changed by the first trigger, so the second trigger scores another point. |
| `RAD-156` Demacian Standard | excluded | When you hold here, you may return this to its owner's hand. | Its only hold effect is "you may return this to its owner's hand", the OGN-067 shape: the second trigger finds it in hand. |
| `RAD-136` Dockside Lock-Up | excluded | When you hold here, kill this to play the banished card, ignoring its cost. (Tokens aren't cards.) | "kill this to play the banished card" is a Cost linked to an Effect: the first trigger kills it, and 203.3 leaves the second unable to pay, so it plays nothing (the OGN-110 line on karthus-deathknell-double). |
| `RAD-SP3` Evelynn, In Control | fits | When I hold, if you control a facedown card here, score 1 point. | The 'facedown card here' condition is untouched by the first trigger, so each of the two triggers scores 1 point. |
| `RAD-094` Explosimian | fits | When I hold, play three Bomb gear tokens to a single battlefield. (They have [Deploy]. When each dies, deal 2 to an enemy there and kill your other Bombs there.) | Each hold trigger plays three Bomb gear tokens to a single battlefield, so the doubled hold plays six; the Bombs' kill-your-other-Bombs clause is their own and is not a drawback the doubling repeats. |
| `RAD-086` K'Sante, Courageous | fits | When I hold, channel 1 rune. | Channels 1 rune per hold trigger, so a doubled hold channels 2. |
| `RAD-106` The Good Stuff | excluded | When you hold here, return this to its owner's hand. | "When you hold here, return this to its owner's hand", the OGN-067 shape: the second trigger finds it already in hand and does nothing. |

### `red-brambleback-conquer`

Anchor `UNL-029` Red Brambleback. Matched 57 -> 63 (+6, -0); 1 excluded; stamp 57 -> 62.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | A Deploy gear at Brambleback's battlefield: its conquer-here effect fires twice, each an optional 1-energy payment for another Recruit; nothing is consumed by the first. |
| `RAD-162` Firelights' Hideout | excluded | When you conquer here, the next unit you play this turn has [Accelerate]. | Both firings give [Accelerate] to the same next unit, and 805.4 makes a second instance redundant. |
| `RAD-091` Jarvan IV, Martial Paragon | fits | When I conquer, if there is a friendly gear with [Deploy] here, channel 1 rune exhausted. | Real conquer trigger; the gear condition is not spent by the first firing, so two runes are channeled. |
| `RAD-073` Pillaged Armory | fits | When you play this or when you conquer here, [Buff] a friendly unit. | A Deploy gear whose conquer-here effect fires twice; the buff target is chosen ("a friendly unit"), so the second instance can buff a different unit, unlike the fixed-self OGN-164 exclude (702.3 cap). |
| `RAD-166` Ruined Monastery | fits | When you conquer here, you may discard 1 and channel 1 rune exhausted. | Battlefield conquer effect fires twice; the discard-to-channel is optional ("you may"), so the second instance is a choice, not the mandatory doubled cost of excluded OGN-287. |
| `RAD-076` Sneaky Zeebles | fits | When I conquer, [Add] :rb_rune_rainbow:. | Real conquer trigger; two Adds of rainbow Power, both usable the rest of that turn. |

### `skyfall-hold-conquer-bridge`

Anchor `SFD-030` Skyfall of Areion. Matched 29 -> 35 (+6, -0); 2 excluded; stamp 29 -> 33.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-067` Clocktower Guardian | fits | When you play me or when I hold, [Predict 3]. | 'When you play me or when I hold, [Predict 3]' has no condition, so Skyfall fires it on conquer too (same shape as SFD-058 Ornn, Blacksmith, already in the list). |
| `RAD-SP3` Evelynn, In Control | excluded | When I hold, if you control a facedown card here, score 1 point. | Read as a conquer effect, "if you control a facedown card here" cannot be met: a facedown card needs control of the battlefield (107.3.c), and a conquer gains a control you did not have (471.1), the SFD-116 line. |
| `RAD-094` Explosimian | fits | When I hold, play three Bomb gear tokens to a single battlefield. | 'When I hold, play three Bomb gear tokens to a single battlefield' has no condition, so Skyfall pays it on conquer as well. |
| `RAD-091` Jarvan IV, Martial Paragon | fits | When I conquer, if there is a friendly gear with [Deploy] here, channel 1 rune exhausted. | Conquer effect whose condition (a friendly [Deploy] gear here) can also be true at a battlefield you hold, so Skyfall pays the channel on hold too. |
| `RAD-086` K'Sante, Courageous | fits | When I hold, channel 1 rune. | 'When I hold, channel 1 rune' has no condition, so Skyfall pays it on conquer too. |
| `RAD-076` Sneaky Zeebles | excluded | When I conquer, [Add] :rb_rune_rainbow:. | Read as a hold effect its [Add] fires in the Beginning Phase, and 167 empties the Rune Pool at the start of the Main Phase, so the Power is lost unless a Reaction spends it first. |

### `reckoners-arena-conquer-on-hold`

Anchor `OGN-286` Reckoner's Arena. Matched 27 -> 29 (+2, -0); 1 excluded; stamp 27 -> 28.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-091` Jarvan IV, Martial Paragon | fits | When I conquer, if there is a friendly gear with [Deploy] here, channel 1 rune exhausted. | The non-conquer part of the condition is a standing board state (a friendly Deploy gear at the Arena), so it can be true on a hold and the effect goes on the chain (383.4.g.1); it is not event-bound like the excluded SFD-116 and VEN-065. The channel is a permanent gain, so the Beginning Phase timing costs nothing. |
| `RAD-076` Sneaky Zeebles | excluded | When I conquer, [Add] :rb_rune_rainbow:. (Abilities that add resources can't be reacted to.) | Its [Add] fires on a Beginning Phase hold, and 167 empties the Rune Pool at the start of the Main Phase, so the Power is lost unless a Reaction spends it first. |

### `svellsongur-copy`

Anchor `SFD-059` Svellsongur. Matched 107 -> 128 (+21, -0); 0 excluded; stamp 107 -> 128.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-SP1` Ahri, Confident | fits, with a limit (packet: false-positive) | [Disarm] (When I attack, give an enemy unit here -1 :rb_might: this turn.) | Its only "When I attack" is the reminder of [Disarm]. 831.1.d.1 makes Disarm trigger once, but 831.2 sums the copied instance with the printed one, so the attack takes twice the Might: the doubling the rule is about, by summing rather than a second trigger. (Fragment quoted from the sibling print `RAD-038`: this showcase print carries [Disarm] without its reminder text.) |
| `RAD-SP2` Akali, Brash | fits | The first time I move each turn, [Add] :rb_energy_1::rb_rune_rainbow:. The second time I move each turn, banish the top card of your Main Deck. Until your next Ending Phase, you may play that card. | Both lines are real recurring move triggers ("The Nth time I move each turn" is in the predicate on purpose); with two copies both fire on the qualifying move (two Adds on the first, two banish-and-play on the second); the second copy is not a no-op. |
| `RAD-078` Armored Tusker | fits | When I move, you may deal damage equal to my [Shield] to a unit at a battlefield. | Real "When I move" trigger; the copy deals the damage a second time (to the same or another unit). |
| `RAD-067` Clocktower Guardian | fits | When you play me or when I hold, [Predict 3]. | Real "when I hold" trigger; Predict 3 resolves twice (a second look/reorder). Small payoff, but not a no-op. |
| `RAD-093` Disposal Expert | fits, with a limit (packet: false-positive) | [Disarm 2] (When I attack, give an enemy unit here -2 :rb_might: this turn.) | Its only "When I attack" is the reminder of [Disarm]. 831.1.d.1 makes Disarm trigger once, but 831.2 sums the copied instance with the printed one, so the attack takes twice the Might: the doubling the rule is about, by summing rather than a second trigger. |
| `RAD-SP3` Evelynn, In Control | fits | When I hold, if you control a facedown card here, score 1 point. | Real hold trigger; its condition (a facedown card here) is not consumed by the first resolution, so both copies score (2 points). |
| `RAD-094` Explosimian | fits | When I hold, play three Bomb gear tokens to a single battlefield. | Real hold trigger; the second copy plays another three Bombs. The parenthetical is the tokens' own reminder, not what matches. |
| `RAD-085` Graves, Blasting Through | fits | When I attack or defend, deal damage equal to my Might to all enemy units here. | Real attack trigger; the second copy damages the survivors again, damage is cumulative (not capped). |
| `RAD-091` Jarvan IV, Martial Paragon | fits | When I conquer, if there is a friendly gear with [Deploy] here, channel 1 rune exhausted. | Real conquer trigger; the gear condition is not spent by the first copy, so the second channels another rune. |
| `RAD-133` Jarvan IV, Royal Heir | fits | When I attack, you may move a unit you control to my battlefield. | Real attack trigger; each copy moves a unit (a second, different one), not a no-op. |
| `RAD-086` K'Sante, Courageous | fits | When I hold, channel 1 rune. | Real hold trigger; two channels. |
| `RAD-045` K'Sante, Dauntless | fits | When I attack or defend, double the [Shield] of a unit you control here this turn. | Real trigger; the second copy doubles the Shield again (compounds). |
| `RAD-SP4` Kai'Sa, Rebel | fits, with a limit (packet: false-positive) | [Disarm] (When I attack, give an enemy unit here -1 :rb_might: this turn). | Its only "When I attack" is the reminder of [Disarm]. 831.1.d.1 makes Disarm trigger once, but 831.2 sums the copied instance with the printed one, so the attack takes twice the Might: the doubling the rule is about, by summing rather than a second trigger. (Fragment quoted from the sibling print `RAD-063`: this showcase print carries [Disarm] without its reminder text.) |
| `RAD-110` Lulu, Whimsical | fits | When I move, you may have another unit's base Might become 4 this turn. | Real move trigger; "another unit" is a chosen target, so two copies can set two different units (unlike the fixed-body OGN-164 case). |
| `RAD-137` Mordekaiser, Dominating | fits | When you play me or when I attack, you may discard 1 to kill a unit or gear. | Real attack trigger; each copy is its own optional discard-to-kill, so it is a second kill, not a doubled drawback. |
| `RAD-050` Mysterious Chronomancer | fits, with a limit (packet: false-positive) | [Disarm 2] (When I attack, give an enemy unit here -2 :rb_might: this turn.) | Its only "When I attack" is the reminder of [Disarm]. 831.1.d.1 makes Disarm trigger once, but 831.2 sums the copied instance with the printed one, so the attack takes twice the Might: the doubling the rule is about, by summing rather than a second trigger. |
| `RAD-074` Raving Witness | fits | When I move, reveal the top card of your Main Deck. If it's [Mighty], draw it. Otherwise, recycle it. | Real move trigger; two reveals, each draws or recycles. |
| `RAD-065` Seraphine, Inspiring | fits, with a limit (packet: false-positive) | [Disarm 2] (When I attack, give an enemy unit here -2 :rb_might: this turn.) | Its only "When I attack" is the reminder of [Disarm]. 831.1.d.1 makes Disarm trigger once, but 831.2 sums the copied instance with the printed one, so the attack takes twice the Might: the doubling the rule is about, by summing rather than a second trigger. |
| `RAD-097` Siren of the Shallows | fits, with a limit (packet: false-positive) | [Disarm] (When I attack, give an enemy unit here -1 :rb_might: this turn.) | Its only "When I attack" is the reminder of [Disarm]. 831.1.d.1 makes Disarm trigger once, but 831.2 sums the copied instance with the printed one, so the attack takes twice the Might: the doubling the rule is about, by summing rather than a second trigger. |
| `RAD-076` Sneaky Zeebles | fits | When I conquer, [Add] :rb_rune_rainbow:. | Real conquer trigger; two Adds. |
| `RAD-054` Trinket Peddler | fits, with a limit (packet: false-positive) | [Disarm] (When I attack, give an enemy unit here -1 :rb_might: this turn.) | Its only "When I attack" is the reminder of [Disarm]. 831.1.d.1 makes Disarm trigger once, but 831.2 sums the copied instance with the printed one, so the attack takes twice the Might: the doubling the rule is about, by summing rather than a second trigger. |

### `renata-industrialist-tokens`

Anchor `SFD-171` Renata Glasc, Industrialist. Matched 73 -> 94 (+21, -0); 7 excluded; stamp 73 -> 87.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-001` Amateur Demolitionist | excluded | When you play me, play a Bomb gear token to a battlefield. | A Bomb is a gear token (187.12), and 149.1 already has gear enter play ready, so "Your tokens enter ready" changes nothing for it. |
| `RAD-009` Antagonistic Apparatus | excluded | When you play me, play a ready 3 :rb_might: Mech unit token here. | "play a ready 3 Might Mech unit token": the token already enters ready. |
| `RAD-157` Bandle Scouts' Academy | fits | When you hide a card here, play a Gold gear token exhausted. | Plays a Gold gear token exhausted; Renata's replacement beats the printed 'exhausted' (R25), so the Gold can be killed for Power the turn it is made. |
| `RAD-159` Black Rose Sanctum | fits | For each player, the first time each turn a non-token unit they control dies here, they play a 1 :rb_might: Recruit unit token to their base. | Each player plays their own Recruit token to their base, so Renata's controller's token enters ready; the opponent's token on the same card is not covered, but the controller's half is a genuine instance (same two-sided shape as SFD-081 Card Sharp). |
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | May pay 1 Energy to play a 1 Might Recruit unit token to your base; a unit token enters exhausted by default, ready under Renata. |
| `RAD-152` Encore | fits | • Play two 1 :rb_might: Recruit unit tokens. | The second mode plays two Recruit unit tokens, which enter ready under Renata. |
| `RAD-094` Explosimian | excluded | When I hold, play three Bomb gear tokens to a single battlefield. | A Bomb is a gear token (187.12), and 149.1 already has gear enter play ready, so "Your tokens enter ready" changes nothing for it. |
| `RAD-132` Heimerdinger, Academy Instructor | fits | If you would play a unit token to a location while I'm at a battlefield, you may play a 3 :rb_might: Mech unit token to that same location instead. | Replacement that makes a 3 Might Mech unit token instead of another token; the Mech is a token entering the board, so Renata readies it (same standing as the replacement UNL-086 Zilean, Time Mage, which sits unexcluded in this list). |
| `RAD-141` Hexplosives Expert | excluded | :rb_energy_1::rb_rune_rainbow:, :rb_exhaust:: Play a Bomb gear token to a battlefield. | A Bomb is a gear token (187.12), and 149.1 already has gear enter play ready, so "Your tokens enter ready" changes nothing for it. |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. | Deathknell plays a 1 Might Bird unit token to your base; it enters ready under Renata. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | Plays a 3 Might Mech unit token on play; ready under Renata it can block or move at once. |
| `RAD-007` Rally for War | fits | Play three 1 :rb_might: Recruit unit tokens there. | Plays three 1 Might Recruit unit tokens at an enemy battlefield; ready under Renata they can fight or move at once. |
| `RAD-105` Reckless Innovator | fits | • Play a Gold gear token exhausted. | One mode plays a Gold gear token exhausted, which Renata makes ready (the other mode is a draw). |
| `RAD-052` Resource Extractor | fits | At the end of your turn, if you control this battlefield, play a Gold gear token exhausted. | Plays a Gold gear token exhausted at the end of your turn; Renata makes it ready. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. | Plays two (or four) 1 Might Recruit unit tokens to your base; they enter ready under Renata. |
| `RAD-096` Satchel Charge | excluded | Move a friendly unit, then play a Bomb gear token to a battlefield. | A Bomb is a gear token (187.12), and 149.1 already has gear enter play ready, so "Your tokens enter ready" changes nothing for it. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Plays a Recruit unit token on play and each time she becomes exhausted; each enters ready under Renata. |
| `RAD-100` The Waters' Wage | fits | Play a Gold gear token exhausted. | The base branch plays a Gold gear token exhausted, which Renata makes ready (the 'three ready Gold' branch is already ready, but the base branch is a real instance). |
| `RAD-022` Whirling Twirligig | fits | :rb_exhaust:: Play a Gold gear token exhausted. | Three token makers (Gold exhausted, Recruit, Mech); all enter ready under Renata. |
| `RAD-112` Ziggs, Explosive | excluded | :rb_energy_1:, :rb_exhaust:: Play a Bomb gear token to a battlefield. | A Bomb is a gear token (187.12), and 149.1 already has gear enter play ready, so "Your tokens enter ready" changes nothing for it. |
| `RAD-023` Ziggs, Short-Fused | excluded | When you play me, play a Bomb gear token to a battlefield. | A Bomb is a gear token (187.12), and 149.1 already has gear enter play ready, so "Your tokens enter ready" changes nothing for it. |

### `grand-plaza-unit-tokens`

Anchor `OGN-293` The Grand Plaza. Matched 47 -> 57 (+10, -0); 1 excluded; stamp 47 -> 56.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | Plays a ready 3 Might Mech unit token 'here' on play, a straight token maker. |
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Pay 1 to play a 1 Might Recruit to your base on play or conquer; a base token still has to walk over (lower value per the why) but it is a token maker. |
| `RAD-152` Encore | fits | • Play two 1 :rb_might: Recruit unit tokens. | One of four modes (choose two) is 'Play two 1 Might Recruit unit tokens'; optional but a real token source. |
| `RAD-132` Heimerdinger, Academy Instructor | excluded | If you would play a unit token to a location while I'm at a battlefield, you may play a 3 :rb_might: Mech unit token to that same location instead. | "If you would play a unit token ... you may play a 3 Might Mech unit token to that same location instead" replaces a token rather than adding one, so it never adds a body toward the seven. Zilean, Time Mage plays an additional copy, which is why he is in the list and this is not. |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. (When I die, get the effect. Opponents must pay :rb_rune_rainbow: to choose a [Deflect] unit with a spell or ability.) | Deathknell plays a 1 Might Bird unit token to your base; a real token maker, base placement only. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | On play, plays a 3 Might Mech unit token here. |
| `RAD-007` Rally for War | fits | Choose an occupied enemy battlefield. Play three 1 :rb_might: Recruit unit tokens there. | Plays three 1 Might Recruit tokens directly at an occupied enemy battlefield, the 'plays them at the battlefield' case the why values most. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. If you showed off, play four to your base instead.disa | Plays two (or four with Show Off) 1 Might Recruit tokens to your base; a base token maker. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Plays a 1 Might Recruit to your base on play and each time she becomes exhausted, so a repeatable base token maker. |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly gear, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token. | 'Kill a friendly gear, exhaust: Play a 1 Might Recruit unit token' is a repeatable token maker (the gear-fed mode is net +1 body). |

### `fiora-buff-ready`

Anchor `SFD-180` Fiora, Worthy. Matched 99 -> 116 (+17, -0); 0 excluded; stamp 99 -> 116.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-SP1` Ahri, Confident | fits | When you reduce the Might of an enemy unit here by 1 or more, give me +1 :rb_might: this turn. | Conditional self +1 on a 4-Might body, which is exactly the one-point step that crosses 5 and becomes Mighty (709). |
| `RAD-032` Battle Preparations | fits | Give a unit +2 :rb_might: this turn. | Plain +2 this turn on any unit; a 3-Might body crosses 5. |
| `RAD-131` Demacian Illuminators | fits | When one or more friendly units die, [Buff] a friendly unit. | Buff trigger, a +1 Might source. |
| `RAD-081` Elnuk Herd | fits | When you play me, give a friendly unit +3 :rb_might: this turn, then recycle me if I was played from face down. | Plain +3 this turn on a friendly unit. |
| `RAD-090` Evelynn, Consuming | fits | When you play a card from face down, ready me and give me +1 :rb_might: this turn. | Self +1 Might source. Printed Might is already 5, so it only crosses the line if her Might was lowered; same as the accepted Darius, Trifarian / Jinx, Rebel / Eclipse Herald entries, and the why says the list is Might sources, not a promise. |
| `RAD-040` Heartening Soul | fits | Friendly legends have ":rb_exhaust:: Give a unit +3 :rb_might: this turn." | Matches through a quoted ability granted to your legends, but unlike the Gold-token nested quotes it is a usable exhaust ability the controller activates (and the card readies a legend on play), so it really is a repeatable +3 Might source; no exclude needed. |
| `RAD-070` Hold 'Em | fits | Give a unit +3 :rb_might: this turn. | Plain +3 this turn on any unit. |
| `RAD-035` Invigorating Bloom | fits | When you play this, give a friendly unit +3 :rb_might: this turn. | Plain +3 this turn on a friendly unit. |
| `RAD-027` Iridescent Avian | fits | :rb_exhaust:: [Buff] a unit. If it's already buffed, give it +2 :rb_might: this turn instead. | Repeatable Buff or +2 this turn on any unit; a Might source either way. |
| `RAD-154` Last Caress | fits | When you play it, [Buff] it. | Buffs the next unit you play (+1 Might), a Might source. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. | Buffs a friendly unit, a +1 Might source. |
| `RAD-073` Pillaged Armory | fits | When you play this or when you conquer here, [Buff] a friendly unit. | Buff on play and on conquer, a +1 Might source. |
| `RAD-046` Resplendent Rostrum | fits | When I become exhausted, give a friendly unit +3 :rb_might: this turn. | Fires on every exhaust of the gear (including its own exhaust ability), +3 Might on a friendly unit. |
| `RAD-043` Riven, Broken Blade | fits | • [Buff] me. | First mode buffs himself (4 Might to 5 crosses the line). The other two modes spend the buff, so this is not the Wallop consumer shape: one mode is a real source. |
| `RAD-114` Riven, Deserter | fits | When another friendly unit becomes exhausted, give me +1 :rb_might: this turn. | Self +1 Might source. Printed Might is already 5, so it only crosses if lowered; same precedent as Darius, Trifarian and Jinx, Rebel. |
| `RAD-008` War Scout | fits | When you play me, give a unit +2 :rb_might: this turn. | Plain +2 this turn on any unit. |
| `RAD-112` Ziggs, Explosive | fits | When I defend, you may kill a friendly gear to give me +2 :rb_might: this turn. | Self +2 (4 to 6) crosses 5; the gear kill is an optional cost, not a drawback that blocks the pairing. |

### `fiora-equipment-ready`

Anchor `SFD-180` Fiora, Worthy. Matched 21 -> 22 (+1, -0); 0 excluded; stamp 21 -> 22.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | [Equip] — :rb_rune_rainbow: or exhaust a friendly unit. | Equipment with mightBonus 3, so a 3-Might body crosses 5 on attach. |

### `jayce-readies-exhaust-abilities`

Anchor `VEN-068` Jayce, Brilliant Inventor. Matched 76 -> 96 (+20, -0); 6 excluded; stamp 76 -> 90.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-101` An Offer You Can't Refuse | excluded | (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | No exhaust ability of its own: the only :rb_exhaust:: in its text is inside the quoted reminder of the Gold gear token it plays, and that token's "Kill this" leaves nothing to run a second time. |
| `RAD-113` Angler Wyrm | fits | :rb_exhaust:: Choose an opponent. They must move a unit they control to my battlefield. | A unit exhaust ability with no one-shot cost; a readied Wyrm drags a second enemy unit. |
| `RAD-157` Bandle Scouts' Academy | excluded | (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | No exhaust ability of its own: the only :rb_exhaust:: in its text is inside the quoted reminder of the Gold gear token it plays, and that token's "Kill this" leaves nothing to run a second time. |
| `RAD-139` Boy Who Shattered Time | fits | Disempower me, :rb_exhaust:: Reduce the cost of the next unit you play this turn by :rb_energy_2::rb_rune_rainbow: and give it "Kill me at end of turn." | Two exhaust abilities on one legend: Empower (1 energy, exhaust) sets the state the Disempower ability (exhaust) needs (442, 443), so a ready lets both run in one turn. |
| `RAD-040` Heartening Soul | fits | Friendly legends have ":rb_exhaust:: Give a unit +3 :rb_might: this turn." | The match is a quoted grant to friendly legends (nested-quote form), but unlike the excluded grants the grantee is a permanent Jayce can legally ready and its exhaust cost exhausts that legend, so a second +3 Might is real. Kept as a fit; the exhaust is on the legend, not on this card. |
| `RAD-141` Hexplosives Expert | fits | :rb_energy_1::rb_rune_rainbow:, :rb_exhaust:: Play a Bomb gear token to a battlefield. | Legend ability whose cost exhausts its own source and pays 1 energy plus 1 rainbow each time; a ready buys a second Bomb. |
| `RAD-035` Invigorating Bloom | fits | Exhaust a friendly [Mighty] unit, :rb_exhaust:: Draw 1. | Own-source exhaust draw; the second run also needs a second Mighty unit to exhaust (Jayce himself is 6 Might), which is an extra cost, not a block. |
| `RAD-027` Iridescent Avian | fits | :rb_exhaust:: [Buff] a unit. If it's already buffed, give it +2 :rb_might: this turn instead. | A second activation is not a no-op: the second branch gives +2 Might to an already-buffed unit, so 702.3 does not empty it (unlike the OGN-164 self-buff excludes). |
| `RAD-143` Iron Revenant | fits | [Reaction][>] Banish a unit or gear from your trash, :rb_exhaust:: [Add] :rb_rune_rainbow:. | Unlike SFD-117/SFD-083 this Add is capped at one Power per activation, each paid by a banish, so a second activation yields a second Power. Legend, so Jayce can ready it. |
| `RAD-104` Pitiless Stalker | fits | :rb_exhaust:: [Stun] an enemy unit. | A second activation stuns a second enemy unit. |
| `RAD-147` Pride of Nazumah | fits | :rb_energy_1:, :rb_exhaust:: Give a friendly unit "I have [Assault] equal to my [Shield]" this turn. | Legend exhaust ability whose second run can grant the effect to another unit. |
| `RAD-105` Reckless Innovator | excluded | (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | No exhaust ability of its own: the only :rb_exhaust:: in its text is inside the quoted reminder of the Gold gear token it plays, and that token's "Kill this" leaves nothing to run a second time. |
| `RAD-052` Resource Extractor | excluded | (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | No exhaust ability of its own: the only :rb_exhaust:: in its text is inside the quoted reminder of the Gold gear token it plays, and that token's "Kill this" leaves nothing to run a second time. |
| `RAD-046` Resplendent Rostrum | fits | :rb_exhaust:: Draw 1 and channel 1 rune exhausted. | Own-source exhaust draw plus its When I become exhausted trigger; each readied run fires both. |
| `RAD-012` Runeblade Anvil | excluded | :rb_energy_2::rb_rune_chaos:, :rb_exhaust:: Kill this. | Its only exhaust ability is ":rb_energy_2::rb_rune_chaos:, :rb_exhaust:: Kill this", the OGN-186 shape: it kills its own source, so a ready finds nothing left to use. |
| `RAD-064` Scrutinizing Scope | fits | :rb_energy_1:, :rb_exhaust:: Choose an opponent. They guess a card type. | Repeatable own-source exhaust; a second run reveals a second top card. |
| `RAD-100` The Waters' Wage | excluded | (Gold tokens have "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | No exhaust ability of its own: the only :rb_exhaust:: in its text is inside the quoted reminder of the Gold gear token it plays, and that token's "Kill this" leaves nothing to run a second time. |
| `RAD-115` Transpositionist | fits | :rb_rune_chaos:, :rb_exhaust:: Return a friendly unit to its owner's hand. | Unit exhaust ability that can run again on another unit. |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly gear, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token. | Three real exhaust abilities on a gear; a ready lets a second one run. |
| `RAD-112` Ziggs, Explosive | fits | :rb_energy_1:, :rb_exhaust:: Play a Bomb gear token to a battlefield. | Unit exhaust ability that makes a second Bomb on a ready. |

### `ride-the-wind-move-triggers`

Anchor `OGN-173` Ride the Wind. Matched 31 -> 35 (+4, -0); 0 excluded; stamp 31 -> 35.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-SP2` Akali, Brash | fits | The first time I move each turn, [Add] :rb_energy_1::rb_rune_rainbow:. | A move trigger on the first move each turn (and a second on the second move), fired by Ride the Wind's Move. |
| `RAD-078` Armored Tusker | fits | When I move, you may deal damage equal to my [Shield] to a unit at a battlefield. | Plain When I move trigger. |
| `RAD-110` Lulu, Whimsical | fits | When I move, you may have another unit's base Might become 4 this turn. | Plain When I move trigger. |
| `RAD-074` Raving Witness | fits | When I move, reveal the top card of your Main Deck. If it's [Mighty], draw it. Otherwise, recycle it. | Plain When I move trigger. |

### `relentless-pursuit-move-triggers`

Anchor `SFD-184` Relentless Pursuit. Matched 31 -> 35 (+4, -0); 0 excluded; stamp 31 -> 35.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-SP2` Akali, Brash | fits | The first time I move each turn, [Add] :rb_energy_1::rb_rune_rainbow:. | Relentless Pursuit's Move fires her first-move trigger (and the second-move one if she already moved). |
| `RAD-078` Armored Tusker | fits | When I move, you may deal damage equal to my [Shield] to a unit at a battlefield. | Own 'When I move' trigger fires on the granted Move. |
| `RAD-110` Lulu, Whimsical | fits | When I move, you may have another unit's base Might become 4 this turn. | Own 'When I move' trigger fires on the granted Move. |
| `RAD-074` Raving Witness | fits | When I move, reveal the top card of your Main Deck. If it's [Mighty], draw it. Otherwise, recycle it. | Own 'When I move' trigger fires on the granted Move. |

### `windswept-hillock-move-triggers`

Anchor `OGN-297` Windswept Hillock. Matched 31 -> 35 (+4, -0); 0 excluded; stamp 31 -> 35.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-SP2` Akali, Brash | fits | The first time I move each turn, [Add] :rb_energy_1::rb_rune_rainbow:. | First move adds 1 Energy and 1 rainbow, second move banishes the top card and lets you play it; both fire on Hillock Ganking moves ('The first/second time I move'). |
| `RAD-078` Armored Tusker | fits | When I move, you may deal damage equal to my [Shield] to a unit at a battlefield. | 'When I move, you may deal damage equal to my [Shield]' fires on a Ganking move. |
| `RAD-110` Lulu, Whimsical | fits | When I move, you may have another unit's base Might become 4 this turn. | 'When I move' trigger fires on a Ganking move. |
| `RAD-074` Raving Witness | fits | When I move, reveal the top card of your Main Deck. If it's [Mighty], draw it. Otherwise, recycle it. (A unit is Mighty while it has 5+ :rb_might:.) | 'When I move' trigger fires on a Ganking move. |

### `retreat-replays-a-body`

Anchor `OGN-104` Retreat. Matched 14 -> 19 (+5, -0); 0 excluded; stamp 14 -> 19.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-001` Amateur Demolitionist | fits | When you play me, play a Bomb gear token to a battlefield. | Replaying leaves another permanent (a Bomb gear) behind. |
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | Replaying leaves a ready 3 Might Mech token behind. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | Replaying leaves a 3 Might Mech token behind. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Replay trigger leaves a Recruit token in your base. |
| `RAD-023` Ziggs, Short-Fused | fits | When you play me, play a Bomb gear token to a battlefield. | Replaying leaves another Bomb gear behind. |

### `pack-of-wonders-replays-a-body`

Anchor `OGN-181` Pack of Wonders. Matched 16 -> 22 (+6, -0); 0 excluded; stamp 16 -> 22.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-001` Amateur Demolitionist | fits | When you play me, play a Bomb gear token to a battlefield. | Its play trigger leaves a permanent behind, so bouncing it with the Pack and replaying it repeats the effect. |
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | Its play trigger leaves a permanent behind, so bouncing it with the Pack and replaying it repeats the effect. |
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Its play trigger leaves a permanent behind, so bouncing it with the Pack and replaying it repeats the effect. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | Its play trigger leaves a permanent behind, so bouncing it with the Pack and replaying it repeats the effect. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Its play trigger leaves a permanent behind, so bouncing it with the Pack and replaying it repeats the effect. |
| `RAD-023` Ziggs, Short-Fused | fits | When you play me, play a Bomb gear token to a battlefield. | Its play trigger leaves a permanent behind, so bouncing it with the Pack and replaying it repeats the effect. |

### `aphelios-equipment-attach`

Anchor `SFD-049` Aphelios, Exalted. Matched 39 -> 41 (+2, -0); 0 excluded; stamp 39 -> 41.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | [Equip] — :rb_rune_rainbow: or exhaust a friendly unit. | Equipment with [Equip]; each attach to Aphelios triggers his modal ability. |
| `RAD-123` Protector's Shield | fits | [Quick-Draw] (This has [Reaction]. When you play it, attach it to a unit you control.) | Equipment with [Quick-Draw] and [Equip]; each attach to Aphelios triggers his modal ability. |

### `malzahar-token-fodder`

Anchor `OGN-113` Malzahar, Fanatic. Matched 73 -> 94 (+21, -0); 1 excluded; stamp 73 -> 93.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-001` Amateur Demolitionist | fits | When you play me, play a Bomb gear token to a battlefield. | Plays Bomb gear token(s), friendly gear for Malzahar's kill cost. |
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | Plays a 3 Might Mech unit token when played, a body to kill for Malzahar's cost. |
| `RAD-157` Bandle Scouts' Academy | fits | When you hide a card here, play a Gold gear token exhausted. | Plays Gold gear token(s) exhausted, free friendly gear for Malzahar's kill cost. |
| `RAD-159` Black Rose Sanctum | fits | For each player, the first time each turn a non-token unit they control dies here, they play a 1 :rb_might: Recruit unit token to their base. | Plays a Recruit unit token when a non-token unit dies here; conditional on a death at this battlefield but a real token source, and Malzahar's own kill of a non-token unit there triggers it. |
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | May pay 1 Energy for a Recruit unit token on play and on each conquer here, a repeatable token source. |
| `RAD-152` Encore | fits | Play two 1 :rb_might: Recruit unit tokens. | The second mode plays two Recruit unit tokens; it is a choose-two mode but a real token source. |
| `RAD-094` Explosimian | fits | When I hold, play three Bomb gear tokens to a single battlefield. | Plays Bomb gear token(s), friendly gear for Malzahar's kill cost. |
| `RAD-132` Heimerdinger, Academy Instructor | excluded | If you would play a unit token to a location while I'm at a battlefield, you may play a 3 :rb_might: Mech unit token to that same location instead. | "If you would play a unit token ..., you may play a 3 Might Mech unit token ... instead" replaces a token another card was already making and plays none of its own, so the anchor gains no body (the RAD-132 exclude on grand-plaza-unit-tokens). |
| `RAD-141` Hexplosives Expert | fits | :rb_energy_1::rb_rune_rainbow:, :rb_exhaust:: Play a Bomb gear token to a battlefield. | Plays Bomb gear token(s), friendly gear for Malzahar's kill cost. |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. | Deathknell plays a Bird unit token, so killing Hunting Dog for Malzahar's cost leaves a token behind. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | Plays a 3 Might Mech unit token when played, a body to kill for Malzahar's cost. |
| `RAD-007` Rally for War | fits | Play three 1 :rb_might: Recruit unit tokens there. | Plays three Recruit unit tokens, three bodies for Malzahar's cost. |
| `RAD-105` Reckless Innovator | fits | Play a Gold gear token exhausted. | Plays Gold gear token(s) exhausted, free friendly gear for Malzahar's kill cost. |
| `RAD-052` Resource Extractor | fits | At the end of your turn, if you control this battlefield, play a Gold gear token exhausted. | Plays Gold gear token(s) exhausted, free friendly gear for Malzahar's kill cost. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. | Plays two Recruit unit tokens to your base, four if a 7-Energy card was shown off. |
| `RAD-096` Satchel Charge | fits | Move a friendly unit, then play a Bomb gear token to a battlefield. | Plays Bomb gear token(s), friendly gear for Malzahar's kill cost. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Plays a Recruit unit token on play and again each time it becomes exhausted. |
| `RAD-100` The Waters' Wage | fits | Play a Gold gear token exhausted. | Plays Gold gear token(s) exhausted, free friendly gear for Malzahar's kill cost. |
| `RAD-022` Whirling Twirligig | fits | :rb_exhaust:: Play a Gold gear token exhausted. | Plays Gold gear token(s) exhausted, free friendly gear for Malzahar's kill cost. |
| `RAD-112` Ziggs, Explosive | fits | :rb_energy_1:, :rb_exhaust:: Play a Bomb gear token to a battlefield. | Plays Bomb gear token(s), friendly gear for Malzahar's kill cost. |
| `RAD-023` Ziggs, Short-Fused | fits | When you play me, play a Bomb gear token to a battlefield. | Plays Bomb gear token(s), friendly gear for Malzahar's kill cost. |

### `wallop-buff-spend`

Anchor `OGN-146` Wallop. Matched 34 -> 40 (+6, -0); 0 excluded; stamp 34 -> 40.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-131` Demacian Illuminators | fits | When one or more friendly units die, [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have one.) | Buff source, conditional on a friendly unit dying. |
| `RAD-027` Iridescent Avian | fits | :rb_exhaust:: [Buff] a unit. If it's already buffed, give it +2 :rb_might: this turn instead. (To buff a unit, give it a +1 :rb_might: buff if it doesn't have one.) | Exhaust: [Buff] a unit is a repeatable buff source; the already-buffed branch gives +2 Might instead, but you choose a target that lacks one. |
| `RAD-154` Last Caress | fits | The next unit you play this turn, even from face down, can be played to any battlefield. When you play it, [Buff] it. (Give it a +1 :rb_might: buff if it doesn't have one.) | Buffs the next unit you play this turn, a one-shot buff source for Wallop to spend. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. (Give the friendly unit a +1 :rb_might: buff if it doesn't have one. The enemy unit doesn't deal combat damage this turn.) | Places a buff, which Wallop can spend as its additional cost. |
| `RAD-073` Pillaged Armory | fits | When you play this or when you conquer here, [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have one.) | Places a buff, which Wallop can spend as its additional cost. |
| `RAD-043` Riven, Broken Blade | fits | • [Buff] me. (Give me a +1 :rb_might: buff if I don't have one.) | Mode 1 '[Buff] me' supplies a buff Wallop can spend; the two spend modes are alternatives he need not choose (Sett, Brawler also buffs and spends and is in the list), and none says 'spend a buff as an additional cost'. |

### `time-warp-once-per-turn`

Anchor `OGN-122` Time Warp. Matched 14 -> 18 (+4, -0); 1 excluded; stamp 14 -> 17.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-016` Coalesced Energy | fits, with a limit (packet: unsure) | At the end of your turn, recycle all your runes, then channel 4 runes exhausted. | It fires again at the end of the extra turn and resets the runes again (recycle all, channel 4 exhausted), a loss as often as a gain; the list keeps such triggers (VEN-133 Glowstone, OGN-109 Dr. Mundo). |
| `RAD-145` Lady of Clockwork | excluded | At the start of your Main Phase, you may pay :rb_energy_1: to choose a friendly gear. | The chosen gear stays a unit until you choose another, so a second firing only moves the effect to a different gear and never adds a body. |
| `RAD-111` Mechanical Bandit | fits | At the start of your Beginning Phase, each player reveals the top card of their Main Deck. If you revealed a card with the lowest Energy cost, draw it. | A fresh reveal-and-maybe-draw at the start of the extra turn's Beginning Phase. |
| `RAD-052` Resource Extractor | fits | At the end of your turn, if you control this battlefield, play a Gold gear token exhausted. | A second Gold at the end of the extra turn while you still control the battlefield; the Gold reminder is not what matches. |

### `rumble-scrapper-mech`

Anchor `SFD-089` Rumble, Scrapper. Matched 15 -> 19 (+4, -0); 0 excluded; stamp 15 -> 19.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-009` Antagonistic Apparatus | fits | tags: ["Bandle City","Yordle","Mech"] | Carries the Mech tag, which is all Rumble's 'Your Mechs have +1 Might' reads. |
| `RAD-055` Clanging Sentry | fits | tags: ["Piltover","Mech"] | Carries the Mech tag, which is all Rumble's 'Your Mechs have +1 Might' reads. |
| `RAD-011` Incorrigible Construct | fits | tags: ["Piltover","Mech"] | Carries the Mech tag, which is all Rumble's 'Your Mechs have +1 Might' reads. |
| `RAD-057` Piltovan Guidebot | fits | tags: ["Piltover","Mech"] | Carries the Mech tag, which is all Rumble's 'Your Mechs have +1 Might' reads. |

### `rumble-hotheaded-mech`

Anchor `SFD-026` Rumble, Hotheaded. Matched 15 -> 19 (+4, -0); 0 excluded; stamp 15 -> 19.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-009` Antagonistic Apparatus | fits | tag: Mech | Mech-tagged unit; the tag alone is what Rumble reads. |
| `RAD-055` Clanging Sentry | fits | tag: Mech | Mech-tagged unit. |
| `RAD-011` Incorrigible Construct | fits | tag: Mech | Mech-tagged unit. |
| `RAD-057` Piltovan Guidebot | fits | tag: Mech | Mech-tagged unit. |

### `karthus-deathknell-double`

Anchor `OGN-236` Karthus, Eternal. Matched 23 -> 28 (+5, -0); 1 excluded; stamp 23 -> 27.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-067` Clocktower Guardian | fits | [Deathknell][>] Banish the top card of your Main Deck. You may play it, ignoring its Energy cost. | Deathknell banishes the top card and may play it for free, so Karthus's second trigger banishes and may play another card. |
| `RAD-017` Detonation Amplifier | excluded | Friendly [Deathknell] effects here trigger an additional time. | It names [Deathknell] without carrying one: "Friendly [Deathknell] effects here trigger an additional time" is a second multiplier, so there is no Deathknell on it for Karthus to double. |
| `RAD-062` Gravity Field | fits | [Deathknell][>] Draw 1. (When I die, get the effect.) | Gear with 'Deathknell: Draw 1', which Karthus doubles to draw 2 when it dies (including when an opponent holds here and the Deploy rule kills it). |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. (When I die, get the effect. Opponents must pay :rb_rune_rainbow: to choose a [Deflect] unit with a spell or ability.) | Deathknell plays a Bird token, so Karthus doubles it to two Birds. |
| `RAD-126` Mournful Spirit | fits | [Deathknell][>] You may kill a unit or gear here. (When I die, get the effect.) | Deathknell 'you may kill a unit or gear here' fires twice, so Karthus lets it kill two things. |

### `bandle-tree-hidden`

Anchor `OGN-278` Bandle Tree. Matched 39 -> 45 (+6, -0); 0 excluded; stamp 39 -> 45.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-107` Bedeviling Stranger | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself, so it can be hidden into the extra Facedown slot. |
| `RAD-102` Demon Shade | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself. |
| `RAD-081` Elnuk Herd | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself. |
| `RAD-103` Gutter Guardian | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself. |
| `RAD-095` Momentary Companion | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself. |
| `RAD-100` The Waters' Wage | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself. |

### `trapping-grounds-excess-damage`

Anchor `UNL-217` Trapping Grounds. Matched 41 -> 48 (+7, -0); 0 excluded; stamp 41 -> 48.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-002` Banner of Conquest | fits | Friendly units here have [Assault]. (+1 :rb_might: while they're attackers.) | Standing Assault granter at its battlefield, adding attacking Might that can go unassigned (807.1.c). |
| `RAD-004` Brawl | fits | Give a unit [Assault] this turn equal to its Might. (+1 :rb_might: for each instance of Assault while it's an attacker.) | Grants Assault equal to Might, a large attacking-Might boost that stacks with other Assault (807.2). |
| `RAD-021` Ekko, Revolutionary | fits | [Assault] (+1 :rb_might: while I'm an attacker.) | Printed Assault. |
| `RAD-133` Jarvan IV, Royal Heir | fits | [Assault] (+1 :rb_might: while I'm attacking.) | Printed Assault. |
| `RAD-020` Mordekaiser, Twice Slain | fits | [Assault 3] (+3 :rb_might: while I'm an attacker.) | Printed Assault 3, a big source of excess damage. |
| `RAD-147` Pride of Nazumah | fits | Give a friendly unit "I have [Assault] equal to my [Shield]" this turn. | The quoted Assault lands on your own unit, which the rule's why expressly counts (Zed and Death Mark hand it to a Shadow Clone); the value equals the target's Shield, so it only pays on a unit that has Shield. |
| `RAD-088` Staunch Survivor | fits | [Assault 2], [Shield 2] (+2 :rb_might: while I'm an attacker or defender.) | Printed Assault 2. |

### `shadow-temple-trash-fuel`

Anchor `VEN-165` Shadow Temple. Matched 49 -> 53 (+4, -0); 0 excluded; stamp 49 -> 53.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-010` Forbidden Technique | fits | When you play a card with Energy cost :rb_energy_7: or more, you may play this from your trash for :rb_energy_1::rb_rune_fury::rb_rune_fury:. Then banish this. | Plays itself from your trash for 1+2 fury (after a 7+ Energy card); Burn 3 is a filler that puts it there. |
| `RAD-143` Iron Revenant | fits | [Reaction][>] Banish a unit or gear from your trash, :rb_exhaust:: [Add] :rb_rune_rainbow:. Spend this Power only to play units or gear. (Abilities that add resources can't be reacted to.) | Banishes a unit or gear from your trash as a cost; the temple fills that pile. |
| `RAD-120` Meticulous Restorationist | fits | When you play a card with Energy cost :rb_energy_7: or more, you may play me from your trash for :rb_rune_order:. | Plays itself from your trash for 1 order after a 7+ Energy card; the temple fills that pile. |
| `RAD-135` Remember the Fallen | fits | Play up to 3 units and/or gear from your trash, each with Energy cost no more than :rb_energy_3: and Power cost no more than :rb_rune_rainbow:, ignoring their costs. | Plays up to 3 cheap units/gear from your trash; the temple fills that pile. |

### `ezreal-prodigy-accelerate`

Anchor `SFD-149` Ezreal, Prodigy. Matched 26 -> 32 (+6, -0); 0 excluded; stamp 26 -> 32.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-162` Firelights' Hideout | fits | When you conquer here, the next unit you play this turn has [Accelerate]. (You may pay :rb_energy_1: and a Power of its Domain as an additional cost to have it enter ready.) | A granter, not a carrier, and the only one in this list: 'the next unit you play this turn has [Accelerate]', and its own reminder says you may pay 1 Energy and a Power as an additional cost to have it enter ready, so Accelerate is an optional additional cost (805.2) that Ezreal reduces by 1 Energy or 1 rainbow. |
| `RAD-086` K'Sante, Courageous | fits | [Accelerate] (You may pay :rb_energy_1::rb_rune_body: as an additional cost to have me enter ready.) | Prints [Accelerate], an optional additional cost Ezreal discounts by 1 Energy or 1 rainbow. |
| `RAD-020` Mordekaiser, Twice Slain | fits | [Accelerate] (You may pay :rb_energy_1::rb_rune_fury: as an additional cost to have me enter ready.) | Prints [Accelerate], an optional additional cost Ezreal discounts by 1 Energy or 1 rainbow. |
| `RAD-105` Reckless Innovator | fits | [Accelerate] (You may pay :rb_energy_1::rb_rune_chaos: as an additional cost to have me enter ready.) | Prints [Accelerate], an optional additional cost Ezreal discounts by 1 Energy or 1 rainbow. |
| `RAD-058` Riptide Mage | fits | [Accelerate] (You may pay :rb_energy_1::rb_rune_mind: as an additional cost to have me enter ready.) | Prints [Accelerate], an optional additional cost Ezreal discounts by 1 Energy or 1 rainbow. |
| `RAD-008` War Scout | fits | [Accelerate] (You may pay :rb_energy_1::rb_rune_fury: as an additional cost to have me enter ready.) | Prints [Accelerate], an optional additional cost Ezreal discounts by 1 Energy or 1 rainbow. |

### `dark-child-off-turn-reactions`

Anchor `OGS-017` Dark Child - Starter. Matched 62 -> 73 (+11, -0); 2 excluded; stamp 62 -> 71.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-101` An Offer You Can't Refuse | excluded | (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Its only [Reaction] is inside the quoted text of the Gold token it makes, the UNL-073 line: the spell itself is [Action] speed. |
| `RAD-032` Battle Preparations | fits | [Reaction] (Play any time, even before spells and abilities resolve.) | Own [Reaction] spell with an energy cost that Dark Child's readied runes can pay on the opponent's turn. |
| `RAD-025` Consult the Heavens | fits | [Reaction] (Play any time, even before spells and abilities resolve.) | Own [Reaction] spell with an energy cost. |
| `RAD-117` For Demacia! | fits | [Reaction] (Play any time, even before spells and abilities resolve.) | Own [Reaction] spell with an energy cost. |
| `RAD-048` High Note | fits | [Reaction] (Play any time, even before spells and abilities resolve.) | Own [Reaction] spell with an energy cost. |
| `RAD-034` Hunker Down | fits | [Reaction] (Play any time, even before spells and abilities resolve.) | Own [Reaction] spell with an energy cost. |
| `RAD-041` Hush | fits | [Reaction] (Play any time, even before spells and abilities resolve.) | Own [Reaction] spell with an energy cost. |
| `RAD-154` Last Caress | fits | [Reaction] (Play any time, even before spells and abilities resolve.) | Own [Reaction] spell with an energy cost. |
| `RAD-029` Life from Stone | fits | [Reaction] (Play any time, even before spells and abilities resolve.) | Own [Reaction] spell with an energy cost; the exhaust-a-unit additional cost does not change its speed. |
| `RAD-098` Siren's Song | fits | [Reaction] (Play any time, even before spells and abilities resolve.) | Own [Reaction] spell with an energy cost. |
| `RAD-100` The Waters' Wage | excluded | (Gold tokens have "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Its only [Reaction] is inside the quoted text of the Gold tokens it makes, the UNL-073 line: the spell itself is not Reaction speed. |

### `azir-sovereign-token-relay`

Anchor `SFD-177` Azir, Sovereign. Matched 17 -> 21 (+4, -0); 0 excluded; stamp 17 -> 21.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Plays a unit token to your base, where it is stranded for Azir's attack-trigger relay; the token cannot be placed on a battlefield by this effect. |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. | Plays a unit token to your base, where it is stranded for Azir's attack-trigger relay; the token cannot be placed on a battlefield by this effect. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. If you showed off, play four to your base instead.disa | Plays a unit token to your base, where it is stranded for Azir's attack-trigger relay; the token cannot be placed on a battlefield by this effect. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Plays a unit token to your base, where it is stranded for Azir's attack-trigger relay; the token cannot be placed on a battlefield by this effect. |

### `forgotten-signpost-carries-exhausted`

Anchor `UNL-045` Forgotten Signpost. Matched 17 -> 21 (+4, -0); 0 excluded; stamp 17 -> 21.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Plays a Recruit token to your base (enters exhausted, 143.4), which Signpost can then relay to a battlefield; the Energy payment is optional and does not change that. |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. (When I die, get the effect. Opponents must pay :rb_rune_rainbow: to choose a [Deflect] unit with a spell or ability.) | Plays a Bird unit token to your base on death (same text as listed UNL-153 Carrion Dredger); the token is the exhausted body Signpost relays. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. | Spell that puts two (four with Show Off) Recruit tokens in your base; the rule's regex passes on 'unit token' plus 'your base'. The card text in cards.json ends with a stray 'disa' after 'instead.' (a data glitch, not a match issue). |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Showcase printing carries the full text itself; makes a Recruit token to your base on play and on each exhaust, which Signpost can relay. |

### `blood-money-small-token-fodder`

Anchor `SFD-162` Blood Money. Matched 30 -> 38 (+8, -0); 0 excluded; stamp 30 -> 38.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-159` Black Rose Sanctum | fits | For each player, the first time each turn a non-token unit they control dies here, they play a 1 :rb_might: Recruit unit token to their base. | A 1-Might Recruit for you when your non-token unit dies at this battlefield (the opponent gets one too, which does not matter here). Tokens go to base, which is the rule's own stated caution (a body has to reach a battlefield first), not an exclusion. |
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Optional-cost maker of a 1-Might friendly Recruit. Tokens go to base, which is the rule's own stated caution (a body has to reach a battlefield first), not an exclusion. |
| `RAD-152` Encore | fits | • Play two 1 :rb_might: Recruit unit tokens. | Modal spell whose token mode makes two 1-Might Recruits, no destination named, so they can go to a battlefield you control. |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. | Friendly 1-Might Bird (played by you, unlike the excluded UNL-130 Walking Roost); its Deflect only taxes opponents, so Blood Money does not pay it. Tokens go to base, which is the rule's own stated caution (a body has to reach a battlefield first), not an exclusion. |
| `RAD-007` Rally for War | fits | Play three 1 :rb_might: Recruit unit tokens there. | Three 1-Might Recruits played onto an occupied enemy battlefield: already where Blood Money needs them, the best fit in the list. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. | Two or four 1-Might Recruits. Tokens go to base, which is the rule's own stated caution (a body has to reach a battlefield first), not an exclusion. cards.json text ends with a stray disa (data anomaly). |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Repeatable 1-Might Recruit maker. Tokens go to base, which is the rule's own stated caution (a body has to reach a battlefield first), not an exclusion. |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly gear, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token. | Repeatable 1-Might Recruit maker (the cost is a gear you kill, a price not a block). |

### `defender-of-tomorrow-readies-gear`

Anchor `VEN-149` Defender of Tomorrow. Matched 32 -> 38 (+6, -0); 2 excluded; stamp 32 -> 36.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-035` Invigorating Bloom | fits | Exhaust a friendly [Mighty] unit, :rb_exhaust:: Draw 1. | Real gear exhaust ability; a second use after Defender readies it needs a second Mighty unit to exhaust, an extra cost and not a block. |
| `RAD-052` Resource Extractor | excluded | (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | No exhaust ability of its own: the only :rb_exhaust:: in its text is inside the quoted reminder of the Gold gear token it plays, and that token's "Kill this" leaves nothing to run a second time. |
| `RAD-046` Resplendent Rostrum | fits | :rb_exhaust:: Draw 1 and channel 1 rune exhausted. | Own exhaust ability with no self-kill; readying it repeats the draw/channel, and every exhaust also fires its +3 Might trigger. |
| `RAD-012` Runeblade Anvil | excluded | :rb_energy_2::rb_rune_chaos:, :rb_exhaust:: Kill this. | Its only exhaust ability is ":rb_energy_2::rb_rune_chaos:, :rb_exhaust:: Kill this", the OGN-186 shape: it kills its own source, so a ready finds nothing left to use. |
| `RAD-064` Scrutinizing Scope | fits | :rb_energy_1:, :rb_exhaust:: Choose an opponent. | Own exhaust ability with no self-kill; readying it gives a second guess/draw. |
| `RAD-022` Whirling Twirligig | fits | :rb_exhaust:: Play a Gold gear token exhausted. | Own exhaust ability; the gear stays, so a second activation makes a second Gold token. |

### `veiled-temple-readies-gear`

Anchor `SFD-221` Veiled Temple. Matched 34 -> 40 (+6, -0); 2 excluded; stamp 34 -> 38.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-035` Invigorating Bloom | fits | Exhaust a friendly [Mighty] unit, :rb_exhaust:: Draw 1. (A unit is Mighty while it has 5+ :rb_might:.) | Gear with 'Exhaust a friendly [Mighty] unit, exhaust: Draw 1'; readying it allows a second Draw 1. |
| `RAD-052` Resource Extractor | excluded | At the end of your turn, if you control this battlefield, play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | No exhaust ability of its own: the only :rb_exhaust:: in its text is inside the quoted reminder of the Gold gear token it plays, and that token's "Kill this" leaves nothing to run a second time. |
| `RAD-046` Resplendent Rostrum | fits | :rb_exhaust:: Draw 1 and channel 1 rune exhausted. | Gear with 'exhaust: Draw 1 and channel 1 rune exhausted'; readying it gives a second activation, and its 'When I become exhausted' trigger fires again. |
| `RAD-012` Runeblade Anvil | excluded | :rb_energy_2::rb_rune_chaos:, :rb_exhaust:: Kill this. | Its only exhaust ability is ":rb_energy_2::rb_rune_chaos:, :rb_exhaust:: Kill this", the OGN-186 shape: it kills its own source, so a ready finds nothing left to use. |
| `RAD-064` Scrutinizing Scope | fits | :rb_energy_1:, :rb_exhaust:: Choose an opponent. They guess a card type. Reveal the top card of your Main Deck. If it has that type, recycle it. Otherwise, draw it. (Unit, gear, and spell are types.) | Gear with '1, exhaust: Choose an opponent, they guess a card type...'; readying gives a second look at the top card. |
| `RAD-022` Whirling Twirligig | fits | :rb_exhaust:: Play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Gear with exhaust abilities of its own (Gold token, Recruit, Mech token); readying it gives a second activation. |

### `royal-entourage-readies-your-legend`

Anchor `SFD-039` Royal Entourage. Matched 24 -> 28 (+4, -0); 0 excluded; stamp 24 -> 28.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | fits | Disempower me, :rb_exhaust:: Reduce the cost of the next unit you play this turn by :rb_energy_2::rb_rune_rainbow: and give it "Kill me at end of turn." | Legend with exhaust in the cost of both Empower and Disempower, so a ready allows a second use (still funded by the Empower cost or Disempower). |
| `RAD-141` Hexplosives Expert | fits | :rb_energy_1::rb_rune_rainbow:, :rb_exhaust:: Play a Bomb gear token to a battlefield. | Legend ability costs 1 Energy + rainbow + exhaust to play a Bomb; a ready gives a second Bomb. |
| `RAD-143` Iron Revenant | fits | [Reaction][>] Banish a unit or gear from your trash, :rb_exhaust:: [Add] :rb_rune_rainbow:. | Legend ability exhausts (and banishes a unit or gear from trash) to add rainbow Power for units or gear; a ready gives a second Add. |
| `RAD-147` Pride of Nazumah | fits | :rb_energy_1:, :rb_exhaust:: Give a friendly unit "I have [Assault] equal to my [Shield]" this turn. | Legend ability costs 1 Energy + exhaust to give a friendly unit Assault equal to its Shield; a ready gives a second use. |

### `hall-of-legends-readies-your-legend`

Anchor `SFD-210` Hall of Legends. Matched 24 -> 28 (+4, -0); 0 excluded; stamp 24 -> 28.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | fits | Disempower me, :rb_exhaust:: Reduce the cost of the next unit you play this turn by :rb_energy_2::rb_rune_rainbow: and give it "Kill me at end of turn." | Legend with an exhaust ability (the Disempower one), so the Hall's ready gives a second activation; it still has to fund the 1 Energy Empower or Disempower side. |
| `RAD-141` Hexplosives Expert | fits | :rb_energy_1::rb_rune_rainbow:, :rb_exhaust:: Play a Bomb gear token to a battlefield. | Legend whose exhaust ability plays a Bomb gear token, so a second activation on the conquer turn is a second Bomb for 1 Energy and 1 rainbow. |
| `RAD-143` Iron Revenant | fits | [Reaction][>] Banish a unit or gear from your trash, :rb_exhaust:: [Add] :rb_rune_rainbow:. | Legend whose exhaust ability adds a rainbow Power (banishing a unit or gear from your trash), so a second activation gives a second Power for another trash card. |
| `RAD-147` Pride of Nazumah | fits | :rb_energy_1:, :rb_exhaust:: Give a friendly unit "I have [Assault] equal to my [Shield]" this turn. | Legend whose exhaust ability gives a unit Assault equal to its Shield, so a second activation stacks or retargets it. |

### `miss-fortune-readies-your-legend`

Anchor `OGN-162` Miss Fortune, Captain. Matched 24 -> 28 (+4, -0); 0 excluded; stamp 24 -> 28.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | fits | Disempower me, :rb_exhaust:: Reduce the cost of the next unit you play this turn by :rb_energy_2::rb_rune_rainbow: and give it "Kill me at end of turn." | Exhaust-cost legend ability; both the Empower and the Disempower activations exhaust it, so the free ready funds the second one (the Disempower-on-top-of-exhaust shape the why already prices in). |
| `RAD-141` Hexplosives Expert | fits | :rb_energy_1::rb_rune_rainbow:, :rb_exhaust:: Play a Bomb gear token to a battlefield. | Plain exhaust-cost legend ability; a free ready gives a second Bomb for another 1 Energy plus rainbow. |
| `RAD-143` Iron Revenant | fits | [Reaction][>] Banish a unit or gear from your trash, :rb_exhaust:: [Add] :rb_rune_rainbow:. | Exhaust-cost legend ability; a ready allows a second activation, funded by another trash banish. |
| `RAD-147` Pride of Nazumah | fits | :rb_energy_1:, :rb_exhaust:: Give a friendly unit "I have [Assault] equal to my [Shield]" this turn. | Exhaust-cost legend ability; a free ready allows a second activation for another 1 Energy. |

### `stare-down-empties-the-garrison`

Anchor `UNL-107` Stare Down. Matched 54 -> 60 (+6, -0); 0 excluded; stamp 54 -> 60.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Gear with Deploy can sit at any battlefield (830.1.b.1); 'when you conquer here' is a conquer effect of the player (383.4.c.2.b), so Stare Down's walk-in conquer pays the optional Recruit. No damage condition. |
| `RAD-162` Firelights' Hideout | fits | When you conquer here, the next unit you play this turn has [Accelerate]. | Battlefield conquer effect: the next unit you play this turn has [Accelerate]; no damage or attack condition, pays on a no-damage conquer (small payoff). |
| `RAD-091` Jarvan IV, Martial Paragon | fits | When I conquer, if there is a friendly gear with [Deploy] here, channel 1 rune exhausted. | Unit conquer effect (channel 1 rune exhausted) with an extra condition, a friendly Deploy gear here; that is satisfiable because Deploy gear can be played to any battlefield (830.1.b.1), so not the unmeetable-condition shape. |
| `RAD-073` Pillaged Armory | fits | When you play this or when you conquer here, [Buff] a friendly unit. | Gear with Deploy: 'when you conquer here, [Buff] a friendly unit' is a player conquer effect (383.4.c.2.b) that pays on the walk-in conquer; no damage condition. |
| `RAD-166` Ruined Monastery | fits | When you conquer here, you may discard 1 and channel 1 rune exhausted. | Battlefield conquer effect 'you may discard 1 and channel 1 rune exhausted' is optional (a loot-style swap, like Zaun Warrens), not a forced cost like the OGN-287 exclude. |
| `RAD-076` Sneaky Zeebles | fits | When I conquer, [Add] :rb_rune_rainbow:. | Unit conquer effect [Add] a rainbow Power; no damage or attack condition, so it pays on the no-combat conquer. |

### `blast-cone-enemy-move`

Anchor `UNL-133` Blast Cone. Matched 19 -> 21 (+2, -0); 0 excluded; stamp 19 -> 21.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-044` Hunting Blind | fits | When you play this, you may move an enemy unit to this battlefield. | 'You may move an enemy unit to this battlefield' fires Blast Cone's stun trigger. |
| `RAD-098` Siren's Song | fits | Move an enemy unit that moved this turn. | 'Move an enemy unit that moved this turn' is a Reaction move of an enemy unit, so Blast Cone stuns it. |

### `radiant-dawn-stun-buff`

Anchor `OGN-261` Radiant Dawn. Matched 21 -> 25 (+4, -0); 0 excluded; stamp 21 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-028` Ki Burst | fits | [Stun] a unit. (It doesn't deal combat damage this turn.) | '[Stun] a unit' can target an enemy; the additional cost (exhaust a friendly unit) does not stop it stunning an enemy. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. (Give the friendly unit a +1 :rb_might: buff if it doesn't have one. The enemy unit doesn't deal combat damage this turn.) | Stuns an enemy unit (and buffs a friendly one itself, so Radiant Dawn's buff is a second payoff). |
| `RAD-104` Pitiless Stalker | fits | :rb_exhaust:: [Stun] an enemy unit. (It doesn't deal combat damage this turn.) | Exhaust: [Stun] an enemy unit, a repeatable source. |
| `RAD-043` Riven, Broken Blade | fits | • Spend my buff to [Stun] an enemy unit. (It doesn't deal combat damage this turn.) | 'Spend my buff to [Stun] an enemy unit' stuns an enemy and Radiant Dawn then re-buffs, refunding the spent buff. |

### `twilight-reveler-ganking-second-move`

Anchor `VEN-020` Twilight Reveler. Matched 37 -> 43 (+6, -0); 0 excluded; stamp 37 -> 43.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | [Ganking] (I can move from battlefield to battlefield.) | The match is in the card's effect field (the packet's text shows only the Equip line): an Equipment that gives its unit [Ganking], same as listed SFD-133 Boots of Swiftness, so the equipped body can take the Reveler's ready and move battlefield to battlefield. Aside: it is Calm+Chaos and the Reveler is Fury, so no legend holds both; the runtime Domain Identity filter already hides that, no exclude needed. |
| `RAD-102` Demon Shade | fits | Give it [Ganking] this turn if there are no open battlefields. | A mode that grants [Ganking] this turn (like listed SFD-007 Gem Jammer and the conditional OGN-019 Raging Soul); the condition (no open battlefield) is an ordinary mid-game state and is not touched by the Reveler's ready. [Hidden] lets it be played as a reaction. |
| `RAD-061` Ekko, Ingenious | fits | [Ganking] (I can move from battlefield to battlefield.) | Printed [Ganking] body: a Reveler ready buys it the second Standard Move. |
| `RAD-087` Portable Portal | fits | Friendly units here have [Ganking]. (They can move from battlefield to battlefield.) | Grants [Ganking] to friendly units here, the same 'here only' caveat the why already names for OGN-297 Windswept Hillock (pays for the move out, not the trip back); its own "ready a unit here" is a second ready on top. |
| `RAD-097` Siren of the Shallows | fits | [Ganking] (I can move from battlefield to battlefield.) | Printed [Ganking] body; the Disarm line is irrelevant here. |
| `RAD-146` The Ball | fits, with a limit (packet: false-positive) | [Ganking] (While this is a unit, it can move from battlefield to battlefield.) | [Ganking] works only while it is a unit, and the one card that makes a gear a unit is Lady of Clockwork (RAD-145), a Calm/Mind legend. Kept: the deck-time Domain Identity check (103.1.b) decides whether the anchor can share that deck, as for every pair in these lists. |

### `on-the-hunt-ganking-second-move`

Anchor `SFD-204` On the Hunt. Matched 37 -> 43 (+6, -0); 0 excluded; stamp 37 -> 43.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | [Ganking] (I can move from battlefield to battlefield.) | Equipment whose effect half gives the carrier [Ganking], like SFD-133 Boots of Swiftness in the list; a readied carrier gets a second battlefield-to-battlefield move. |
| `RAD-102` Demon Shade | fits | • Give it [Ganking] this turn if there are no open battlefields. | The second mode gives a friendly unit [Ganking] this turn (like SFD-007 Gem Jammer and UNL-010 Vault Breaker in the list), conditional on there being no open battlefields, which is a condition that can hold. |
| `RAD-061` Ekko, Ingenious | fits | [Ganking] (I can move from battlefield to battlefield.) | Printed [Ganking] unit. |
| `RAD-087` Portable Portal | fits | Friendly units here have [Ganking]. | 'Friendly units here have [Ganking]' (the OGN-297 Windswept Hillock shape), and it readies a unit itself. |
| `RAD-097` Siren of the Shallows | fits | [Ganking] (I can move from battlefield to battlefield.) | Printed [Ganking] unit. |
| `RAD-146` The Ball | fits, with a limit (packet: false-positive) | [Ganking] (While this is a unit, it can move from battlefield to battlefield.) | [Ganking] works only while it is a unit, and the one card that makes a gear a unit is Lady of Clockwork (RAD-145), a Calm/Mind legend. Kept: the deck-time Domain Identity check (103.1.b) decides whether the anchor can share that deck, as for every pair in these lists. |

### `acceleration-gate-ganking-second-move`

Anchor `VEN-150` Acceleration Gate. Matched 37 -> 43 (+6, -0); 0 excluded; stamp 37 -> 43.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | [Ganking] (I can move from battlefield to battlefield.) | Equipment whose attached unit has [Ganking], so a readied bearer can make another battlefield-to-battlefield move. |
| `RAD-102` Demon Shade | fits | Give it [Ganking] this turn if there are no open battlefields. | Grants [Ganking] to a friendly unit, but only if there are no open battlefields; that holds late in the Gate turn once battlefields are taken, so it still fits, conditionally. |
| `RAD-061` Ekko, Ingenious | fits | [Ganking] (I can move from battlefield to battlefield.) | Has or grants [Ganking], so each unit Acceleration Gate readies can make another battlefield-to-battlefield move. |
| `RAD-087` Portable Portal | fits | Friendly units here have [Ganking]. | Friendly units here have [Ganking], a standing grant that every unit readied at this battlefield uses. |
| `RAD-097` Siren of the Shallows | fits | [Ganking] (I can move from battlefield to battlefield.) | Has or grants [Ganking], so each unit Acceleration Gate readies can make another battlefield-to-battlefield move. |
| `RAD-146` The Ball | fits, with a limit (packet: unsure) | [Ganking] (While this is a unit, it can move from battlefield to battlefield.) | [Ganking] works only while it is a unit, and the one card that makes a gear a unit is Lady of Clockwork (RAD-145), a Calm/Mind legend. Kept: the deck-time Domain Identity check (103.1.b) decides whether the anchor can share that deck, as for every pair in these lists. |

### `ancient-henge-energy-surplus`

Anchor `SFD-117` Ancient Henge. Matched 11 -> 12 (+1, -0); 0 excluded; stamp 11 -> 12.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-SP2` Akali, Brash | fits | The first time I move each turn, [Add] :rb_energy_1::rb_rune_rainbow:. | '[Add] 1 energy and 1 rainbow' on the first move each turn is an Energy source to convert with the Henge. |

### `hextech-anomaly-power-surplus`

Anchor `SFD-083` Hextech Anomaly. Matched 16 -> 26 (+10, -0); 2 excluded; stamp 16 -> 24.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-SP2` Akali, Brash | fits | The first time I move each turn, [Add] :rb_energy_1::rb_rune_rainbow:. | Adds rainbow Power in its own text (same shape as Jhin, Murderous Artist), which the Anomaly converts to Energy. |
| `RAD-101` An Offer You Can't Refuse | excluded (packet: unsure) | (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | The Gold goes to the killed gear's controller, so it reaches your pool only when you kill your own gear; the card is removal, and an opponent's Gold is the line UNL-130 is excluded on elsewhere. |
| `RAD-157` Bandle Scouts' Academy | fits | (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Gold-token maker (when you hide a card here); the why keeps those because the Power lands in your pool. |
| `RAD-103` Gutter Guardian | fits | When you play me, if you showed off, [Add] :rb_rune_rainbow:. | Adds rainbow Power in its own text when you show off a Hidden card. |
| `RAD-143` Iron Revenant | excluded | [Reaction][>] Banish a unit or gear from your trash, :rb_exhaust:: [Add] :rb_rune_rainbow:. Spend this Power only to play units or gear. | "Spend this Power only to play units or gear": the Anomaly is a gear's activated ability, not a play, the OGN-247 line this rule already excludes. |
| `RAD-105` Reckless Innovator | fits | (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Gold-token maker; kept by the why for the same reason as Pyke, Returned and Yeti Brawler. |
| `RAD-052` Resource Extractor | fits | (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Gold-token maker at end of turn (if you control the battlefield); kept by the why, the token arrives exhausted and pays next turn. |
| `RAD-076` Sneaky Zeebles | fits | When I conquer, [Add] :rb_rune_rainbow:. | Adds rainbow Power in its own text. |
| `RAD-100` The Waters' Wage | fits | (Gold tokens have "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Gold-token maker; played from face down on your turn it makes three READY tokens, the strongest Gold source in the list. |
| `RAD-022` Whirling Twirligig | fits | :rb_exhaust:: Play a Gold gear token exhausted. | Repeatable Gold-token maker; kept by the why for the same reason as the other token makers. |

### `blade-dancer-buff-is-choosing`

Anchor `SFD-195` Blade Dancer. Matched 32 -> 38 (+6, -0); 2 excluded; stamp 32 -> 36.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-131` Demacian Illuminators | fits | When one or more friendly units die, [Buff] a friendly unit. | Chooses a friendly unit to buff (702.2.a), which is what fires Blade Dancer. |
| `RAD-027` Iridescent Avian | fits | :rb_exhaust:: [Buff] a unit. | Chooses a unit (can be a friendly one) and buffs it; it can even pick itself, so Blade Dancer readies the Avian for a second activation. |
| `RAD-154` Last Caress | excluded | When you play it, [Buff] it. | "When you play it, [Buff] it" buffs the unit just played, the SFD-166 line: 355.10.d makes it programmatically selected rather than chosen, so Blade Dancer never fires. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. | Chooses a friendly unit to buff. |
| `RAD-073` Pillaged Armory | fits | When you play this or when you conquer here, [Buff] a friendly unit. | Chooses a friendly unit to buff. |
| `RAD-043` Riven, Broken Blade | excluded | • [Buff] me. | "[Buff] me" buffs Riven herself, the SFD-098 line: 355.10.d takes an object no choice is ever possible for out of the choosing, and her other two modes spend the buff and choose no friendly unit. |

### `irelia-fervent-buff-is-choosing`

Anchor `SFD-057` Irelia, Fervent. Matched 21 -> 27 (+6, -0); 2 excluded; stamp 21 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-131` Demacian Illuminators | fits | When one or more friendly units die, [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have one.) | Buffs a unit it can choose (702.2.a: to Buff a Unit, a player chooses a Unit), so it can pick Irelia and fire her choose trigger. |
| `RAD-027` Iridescent Avian | fits | :rb_exhaust:: [Buff] a unit. If it's already buffed, give it +2 :rb_might: this turn instead. (To buff a unit, give it a +1 :rb_might: buff if it doesn't have one.) | '[Buff] a unit' chooses any unit, Irelia included; the already-buffed branch still chooses her. |
| `RAD-154` Last Caress | excluded (packet: fits) | The next unit you play this turn, even from face down, can be played to any battlefield. When you play it, [Buff] it. (Give it a +1 :rb_might: buff if it doesn't have one.) | "When you play it, [Buff] it" buffs the unit just played, which 355.10.d makes programmatically selected rather than chosen (the SFD-166 exclude on blade-dancer-buff-is-choosing), so it never chooses Irelia; this predicate leaves "buff it" out for that reason and matched only the bracketed [Buff]. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. (Give the friendly unit a +1 :rb_might: buff if it doesn't have one. The enemy unit doesn't deal combat damage this turn.) | Buffs a unit it can choose (702.2.a: to Buff a Unit, a player chooses a Unit), so it can pick Irelia and fire her choose trigger. |
| `RAD-073` Pillaged Armory | fits | When you play this or when you conquer here, [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have one.) | Buffs a unit it can choose (702.2.a: to Buff a Unit, a player chooses a Unit), so it can pick Irelia and fire her choose trigger. |
| `RAD-043` Riven, Broken Blade | excluded | • [Buff] me. (Give me a +1 :rb_might: buff if I don't have one.) | "[Buff] me" is Riven's only buff, so it can only ever choose herself and never reaches Irelia, the same shape as UNL-102. |

### `jae-medarda-chosen-by-spell`

Anchor `SFD-142` Jae Medarda. Matched 34 -> 40 (+6, -0); 1 excluded; stamp 34 -> 39.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-032` Battle Preparations | fits | Give a unit +2 :rb_might: this turn. | Spell that chooses a unit (355.7), so it can pick Jae; the Show Off picks a gear only. |
| `RAD-102` Demon Shade | fits | Choose a friendly unit, then choose one — | Explicit 'Choose a friendly unit' spell, so Jae can be chosen. |
| `RAD-152` Encore | fits | Give up to two units each +1 :rb_might: this turn. | Mode 3 chooses up to two units, so Jae can be chosen; Choose two lets you take that mode. |
| `RAD-070` Hold 'Em | fits | Give a unit +3 :rb_might: this turn. | Spell that chooses a unit, so it can pick Jae. |
| `RAD-154` Last Caress | excluded | When you play it, [Buff] it. (Give it a +1 :rb_might: buff if it doesn't have one.) | "When you play it, [Buff] it" is a delayed trigger on the next unit you play. 355.5.b keeps the choices of "Delayed or Reflexive Triggers generated by the item" out of the spell's own choosing, and "it" is picked by criteria (355.5.a), so the spell never chooses Jae. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. | Chooses a friendly unit to buff, so Jae can be chosen. |

### `renekton-brute-relative-might-gate`

Anchor `VEN-092` Renekton, Brute. Matched 2 -> 3 (+1, -0); 0 excluded; stamp 2 -> 3.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-115` Transpositionist | fits | :rb_rune_chaos:, :rb_exhaust:: Return a friendly unit to its owner's hand. You may play a unit with less Might than that unit had, ignoring its cost. | The threshold is the Might of the friendly unit YOU choose to return ('less Might than that unit had'), not Transpositionist's own Might, so returning a Renekton pumped at 1 Energy per point lifts the gate: the family this rule buys, not the five own-Might excludes. |

### `moonlight-affliction-might-gate`

Anchor `UNL-066` Moonlight Affliction. Matched 16 -> 17 (+1, -0); 0 excluded; stamp 16 -> 17.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-124` Burn Away | fits | Banish a unit with 3 :rb_might: or less or a gear. | Fixed Might gate of 3 or less, which Moonlight Affliction's -10 collapses on a unit (143.2.b). |

### `pit-crew-gear-ready`

Anchor `OGN-091` Pit Crew. Matched 106 -> 132 (+26, -0); 0 excluded; stamp 106 -> 132.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-002` Banner of Conquest | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Banner of Conquest is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-150` Blade of the Exile | fits | [Equip] — :rb_rune_rainbow: or exhaust a friendly unit. (Pay the cost: Attach this to a unit you control.) | Type-based rule: Blade of the Exile is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-024` Blossoming Dreamroot | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Blossoming Dreamroot is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-108` Bushwhack Trap | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Bushwhack Trap is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-116` Concert Poster | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Concert Poster is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-156` Demacian Standard | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Demacian Standard is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-017` Detonation Amplifier | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Detonation Amplifier is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-136` Dockside Lock-Up | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Dockside Lock-Up is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-039` Ephemeral Ward | fits | Your units have +2 :rb_might:. | Type-based rule: Ephemeral Ward is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-062` Gravity Field | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Gravity Field is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-044` Hunting Blind | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Hunting Blind is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-035` Invigorating Bloom | fits | When you play this, give a friendly unit +3 :rb_might: this turn. | Type-based rule: Invigorating Bloom is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-111` Mechanical Bandit | fits | At the start of your Beginning Phase, each player reveals the top card of their Main Deck. If you revealed a card with the lowest Energy cost, draw it. Recycle the rest. | Type-based rule: Mechanical Bandit is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-071` Nazuman Ntofo | fits | Equip :rb_energy_1: (:rb_energy_1:: Attach this to a unit you control.) | Type-based rule: Nazuman Ntofo is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-073` Pillaged Armory | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Pillaged Armory is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-087` Portable Portal | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Portable Portal is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-123` Protector's Shield | fits | [Quick-Draw] (This has [Reaction]. When you play it, attach it to a unit you control.) | Type-based rule: Protector's Shield is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-052` Resource Extractor | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: Resource Extractor is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-046` Resplendent Rostrum | fits | :rb_exhaust:: Draw 1 and channel 1 rune exhausted. | Type-based rule: Resplendent Rostrum is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-012` Runeblade Anvil | fits | When you play this or when this leaves the board, banish the top card of your Main Deck. Until your next Ending Phase, you may play that card. (You still pay its costs.) | Type-based rule: Runeblade Anvil is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-064` Scrutinizing Scope | fits | :rb_energy_1:, :rb_exhaust:: Choose an opponent. They guess a card type. Reveal the top card of your Main Deck. If it has that type, recycle it. Otherwise, draw it. (Unit, gear, and spell are types.) | Type-based rule: Scrutinizing Scope is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-146` The Ball | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: The Ball is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-106` The Good Stuff | fits | [Deploy] (Play this only to a battlefield. When an opponent holds here, kill this.) | Type-based rule: The Good Stuff is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-089` Titanic Shrine | fits | When you play a unit with Might greater than each other unit on the board, exhaust me to draw 1. | Type-based rule: Titanic Shrine is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-022` Whirling Twirligig | fits | :rb_exhaust:: Play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Type-based rule: Whirling Twirligig is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |
| `RAD-069` Zero Point Inflection | fits | When you play a card, draw 2. | Type-based rule: Zero Point Inflection is a gear, so playing it fires Pit Crew's "When you play a gear, ready me"; every gear qualifies. |

### `shurelyas-requiem-ganking-second-move`

Anchor `SFD-192` Shurelya's Requiem. Matched 36 -> 42 (+6, -0); 0 excluded; stamp 36 -> 42.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | [Ganking] (I can move from battlefield to battlefield.) | Equipment whose effect gives the carrier [Ganking], the same shape as SFD-133 Boots of Swiftness already in this list. |
| `RAD-102` Demon Shade | fits | • Give it [Ganking] this turn if there are no open battlefields. (It can move from battlefield to battlefield.) | Gives a friendly unit [Ganking] this turn when there are no open battlefields (170.11.c: open = unoccupied and uncontrolled), a reachable condition; OGN-019 Raging Soul and VEN-006 Oasis Raider are conditional Ganking sources already in this list, and the other mode is a plain move. |
| `RAD-061` Ekko, Ingenious | fits | [Ganking] (I can move from battlefield to battlefield.) | Prints [Ganking] on a unit, so Requiem's ready lets it move a second time. |
| `RAD-087` Portable Portal | fits | Friendly units here have [Ganking]. (They can move from battlefield to battlefield.) | Gives friendly units here [Ganking] and can ready a unit on play, like OGN-297 Windswept Hillock (Units here have [Ganking]) already in this list plus a ready. |
| `RAD-097` Siren of the Shallows | fits | [Ganking] (I can move from battlefield to battlefield.) | Prints [Ganking] on a unit, so Requiem's ready lets it move a second time. |
| `RAD-146` The Ball | fits, with a limit (packet: unsure) | [Ganking] (While this is a unit, it can move from battlefield to battlefield.) | [Ganking] works only while it is a unit, and the one card that makes a gear a unit is Lady of Clockwork (RAD-145), a Calm/Mind legend. Kept: the deck-time Domain Identity check (103.1.b) decides whether the anchor can share that deck, as for every pair in these lists. |

### `yordle-explorer-power-two`

Anchor `SFD-100` Yordle Explorer. Matched 82 -> 95 (+13, -0); 0 excluded; stamp 82 -> 95.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-079` Avalanche | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-080` Bloodscent Swarm | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-067` Clocktower Guardian | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-016` Coalesced Energy | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-136` Dockside Lock-Up | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-018` Drakehound Packmaster | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-039` Ephemeral Ward | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-044` Hunting Blind | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-041` Hush | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-137` Mordekaiser, Dominating | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-082` Primordial Roar | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-135` Remember the Fallen | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |
| `RAD-069` Zero Point Inflection | fits | power: 2 (printed Power cost) | Non-text predicate: printed Power cost is 2, and 206 reads only the printed cost, so any discount or free play still draws; a real card (not a token), so the trigger fires. |

### `lady-of-luminosity-expensive-spells`

Anchor `OGS-021` Lady of Luminosity - Starter. Matched 37 -> 42 (+5, -0); 0 excluded; stamp 37 -> 42.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-079` Avalanche | fits | Deal 3 to all units in bases. | Spell with printed Energy 5; 206 reads the printed cost. |
| `RAD-134` Raucous Anthem | fits | Ready your units and give them +3 :rb_might: this turn. | Spell with printed Energy 7. |
| `RAD-135` Remember the Fallen | fits | Play up to 3 units and/or gear from your trash, each with Energy cost no more than :rb_energy_3: and Power cost no more than :rb_rune_rainbow:, ignoring their costs. | Spell with printed Energy 8. |
| `RAD-127` Rousing Display | fits | [Show Off] a card with Energy cost :rb_energy_7: or more. | Spell with printed Energy 5. |
| `RAD-059` Supernova | fits | Deal 10 to a unit. Draw 2. | Spell with printed Energy 9. |

### `get-excited-expensive-discard`

Anchor `OGN-008` Get Excited!. Matched 67 -> 85 (+18, -0); 0 excluded; stamp 67 -> 85.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-113` Angler Wyrm | fits | printed Energy 8 (floor minEnergy 7; text predicate matches any text) | Printed Energy 8 clears the 7 floor, so discarding it to Get Excited! deals 8 damage (206 reads the printed cost). |
| `RAD-080` Bloodscent Swarm | fits | printed Energy 8 (floor minEnergy 7; text predicate matches any text) | Printed Energy 8 clears the 7 floor; 206 reads the printed cost even though its real cost drops 2 per battlefield conquered, so the discard still deals 8. |
| `RAD-067` Clocktower Guardian | fits | printed Energy 8 (floor minEnergy 7; text predicate matches any text) | Printed Energy 8 clears the 7 floor, so discarding it to Get Excited! deals 8 damage (206 reads the printed cost). |
| `RAD-018` Drakehound Packmaster | fits | printed Energy 9 (floor minEnergy 7; text predicate matches any text) | Printed Energy 9 clears the 7 floor, so discarding it to Get Excited! deals 9 damage (206 reads the printed cost). |
| `RAD-125` Dune Devourer | fits | printed Energy 7 (floor minEnergy 7; text predicate matches any text) | Printed Energy 7 clears the 7 floor; 206 reads the printed cost, not the 2-less kill option, so the discard deals 7. |
| `RAD-040` Heartening Soul | fits | printed Energy 7 (floor minEnergy 7; text predicate matches any text) | Printed Energy 7 clears the 7 floor, so discarding it to Get Excited! deals 7 damage (206 reads the printed cost). |
| `RAD-133` Jarvan IV, Royal Heir | fits | printed Energy 7 (floor minEnergy 7; text predicate matches any text) | Printed Energy 7 clears the 7 floor, so discarding it to Get Excited! deals 7 damage (206 reads the printed cost). |
| `RAD-137` Mordekaiser, Dominating | fits | printed Energy 9 (floor minEnergy 7; text predicate matches any text) | Printed Energy 9 clears the 7 floor, so discarding it to Get Excited! deals 9 damage (206 reads the printed cost). |
| `RAD-020` Mordekaiser, Twice Slain | fits | printed Energy 7 (floor minEnergy 7; text predicate matches any text) | Printed Energy 7 clears the 7 floor, so discarding it to Get Excited! deals 7 damage (206 reads the printed cost). |
| `RAD-122` Party Crasher | fits | printed Energy 9 (floor minEnergy 7; text predicate matches any text) | Printed Energy 9 clears the 7 floor; 206 reads the printed cost even though its real cost shrinks with exhausted units, so the discard still deals 9. |
| `RAD-134` Raucous Anthem | fits | printed Energy 7 (floor minEnergy 7; text predicate matches any text) | Printed Energy 7 clears the 7 floor, so discarding it to Get Excited! deals 7 damage (206 reads the printed cost). |
| `RAD-135` Remember the Fallen | fits | printed Energy 8 (floor minEnergy 7; text predicate matches any text) | Printed Energy 8 clears the 7 floor, so discarding it to Get Excited! deals 8 damage (206 reads the printed cost). |
| `RAD-046` Resplendent Rostrum | fits | printed Energy 8 (floor minEnergy 7; text predicate matches any text) | Printed Energy 8 clears the 7 floor, so discarding it to Get Excited! deals 8 damage (206 reads the printed cost). |
| `RAD-092` Seraphic Wyvern | fits | printed Energy 7 (floor minEnergy 7; text predicate matches any text) | Printed Energy 7 clears the 7 floor, so discarding it to Get Excited! deals 7 damage (206 reads the printed cost). |
| `RAD-059` Supernova | fits | printed Energy 9 (floor minEnergy 7; text predicate matches any text) | Printed Energy 9 clears the 7 floor, so discarding it to Get Excited! deals 9 damage (206 reads the printed cost). |
| `RAD-060` The Empyrean | fits | printed Energy 8 (floor minEnergy 7; text predicate matches any text) | Printed Energy 8 clears the 7 floor, so discarding it to Get Excited! deals 8 damage (206 reads the printed cost). |
| `RAD-077` Wrath of the Freljord | fits | printed Energy 9 (floor minEnergy 7; text predicate matches any text) | Printed Energy 9 clears the 7 floor, so discarding it to Get Excited! deals 9 damage (206 reads the printed cost). |
| `RAD-069` Zero Point Inflection | fits | printed Energy 9 (floor minEnergy 7; text predicate matches any text) | Printed Energy 9 clears the 7 floor, so discarding it to Get Excited! deals 9 damage (206 reads the printed cost). |

### `herald-of-scales-dragon-discount`

Anchor `OGN-140` Herald of Scales. Matched 19 -> 22 (+3, -0); 0 excluded; stamp 19 -> 22.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-113` Angler Wyrm | fits | tags: ["Bilgewater","Dragon"] | Tagged Dragon, which is all Herald of Scales' 'Your Dragons' Energy costs are reduced by 2' reads (it prints 7 or 8 Energy, so the discount lands in full). |
| `RAD-092` Seraphic Wyvern | fits | tags: ["Mount Targon","Dragon"] | Tagged Dragon, which is all Herald of Scales' 'Your Dragons' Energy costs are reduced by 2' reads (it prints 7 or 8 Energy, so the discount lands in full). |
| `RAD-060` The Empyrean | fits | tags: ["Ionia","Dragon"] | Tagged Dragon, which is all Herald of Scales' 'Your Dragons' Energy costs are reduced by 2' reads (it prints 7 or 8 Energy, so the discount lands in full). |

### `gentle-gemdragon-dragon-ready`

Anchor `UNL-104` Gentle Gemdragon. Matched 18 -> 21 (+3, -0); 0 excluded; stamp 18 -> 21.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-113` Angler Wyrm | fits | tag: Dragon | Dragon-tagged unit; the tag alone is what Gemdragon reads (133.8). |
| `RAD-092` Seraphic Wyvern | fits | tag: Dragon | Dragon-tagged unit. |
| `RAD-060` The Empyrean | fits | tag: Dragon | Dragon-tagged unit. |

### `direwing-dragon-ready`

Anchor `SFD-094` Direwing. Matched 18 -> 21 (+3, -0); 0 excluded; stamp 18 -> 21.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-113` Angler Wyrm | fits | tag: Dragon | Dragon-tagged unit: the 'another Dragon' that makes Direwing enter ready. |
| `RAD-092` Seraphic Wyvern | fits | tag: Dragon | Dragon-tagged unit: the 'another Dragon' that makes Direwing enter ready. |
| `RAD-060` The Empyrean | fits | tag: Dragon | Dragon-tagged unit: the 'another Dragon' that makes Direwing enter ready. |

### `friendship-four-tags`

Anchor `UNL-046` Friendship. Matched 51 -> 57 (+6, -0); 0 excluded; stamp 51 -> 57.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-119` Hunting Dog | fits | tag: Dog | Tagged Dog (card tags: Demacia, Dog); the tag alone is what Friendship reads (133.8). |
| `RAD-027` Iridescent Avian | fits | tag: Bird | Tagged Bird (card tags: Ixtal, Bird). |
| `RAD-104` Pitiless Stalker | fits | tag: Cat | Tagged Cat (card tags: Shadow Isles, Cat). |
| `RAD-075` Skystrike Squadron | fits | tag: Bird | Tagged Bird (card tags: Demacia, Elite, Bird). |
| `RAD-036` Storm Raptor | fits | tag: Bird | Tagged Bird (card tags: Freljord, Bird). |
| `RAD-053` Strigian Oracle | fits | tag: Bird | Tagged Bird (card tags: Freljord, Bird). |

### `stalking-wolf-four-tags`

Anchor `UNL-166` Stalking Wolf. Matched 50 -> 56 (+6, -0); 0 excluded; stamp 50 -> 56.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-119` Hunting Dog | fits | tag: Dog | Dog-tagged unit: kill fodder for the additional cost (its Deathknell Bird token is a bonus). |
| `RAD-027` Iridescent Avian | fits | tag: Bird | Bird-tagged unit: kill fodder for the additional cost. |
| `RAD-104` Pitiless Stalker | fits | tag: Cat | Cat-tagged unit: kill fodder for the additional cost. |
| `RAD-075` Skystrike Squadron | fits | tag: Bird | Bird-tagged unit: kill fodder for the additional cost. |
| `RAD-036` Storm Raptor | fits | tag: Bird | Bird-tagged unit: kill fodder for the additional cost. |
| `RAD-053` Strigian Oracle | fits | tag: Bird | Bird-tagged unit: kill fodder for the additional cost. |

### `starhound-four-tags`

Anchor `UNL-167` Starhound. Matched 50 -> 56 (+6, -0); 0 excluded; stamp 50 -> 56.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-119` Hunting Dog | fits | tags: Demacia, Dog | Non-text predicate: the card carries one of the Bird, Cat, Dog or Poro tags and is a real card (not a token), so Starhound can return it from the trash. |
| `RAD-027` Iridescent Avian | fits | tags: Ixtal, Bird | Non-text predicate: the card carries one of the Bird, Cat, Dog or Poro tags and is a real card (not a token), so Starhound can return it from the trash. |
| `RAD-104` Pitiless Stalker | fits | tags: Shadow Isles, Cat | Non-text predicate: the card carries one of the Bird, Cat, Dog or Poro tags and is a real card (not a token), so Starhound can return it from the trash. |
| `RAD-075` Skystrike Squadron | fits | tags: Demacia, Elite, Bird | Non-text predicate: the card carries one of the Bird, Cat, Dog or Poro tags and is a real card (not a token), so Starhound can return it from the trash. |
| `RAD-036` Storm Raptor | fits | tags: Freljord, Bird | Non-text predicate: the card carries one of the Bird, Cat, Dog or Poro tags and is a real card (not a token), so Starhound can return it from the trash. |
| `RAD-053` Strigian Oracle | fits | tags: Freljord, Bird | Non-text predicate: the card carries one of the Bird, Cat, Dog or Poro tags and is a real card (not a token), so Starhound can return it from the trash. |

### `undying-loyalty-four-tags`

Anchor `UNL-168` Undying Loyalty. Matched 51 -> 57 (+6, -0); 0 excluded; stamp 51 -> 57.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-119` Hunting Dog | fits, with a limit (packet: false-positive) | tag: Dog | Over the cap ("no more than 2 Energy and no more than 1 rainbow"), so it cannot be the unit played; the rule's why keeps the whole tag list and leaves that cap to the reader. |
| `RAD-027` Iridescent Avian | fits, with a limit (packet: false-positive) | tag: Bird | Over the cap ("no more than 2 Energy and no more than 1 rainbow"), so it cannot be the unit played; the rule's why keeps the whole tag list and leaves that cap to the reader. |
| `RAD-104` Pitiless Stalker | fits, with a limit (packet: false-positive) | tag: Cat | Over the cap ("no more than 2 Energy and no more than 1 rainbow"), so it cannot be the unit played; the rule's why keeps the whole tag list and leaves that cap to the reader. |
| `RAD-075` Skystrike Squadron | fits, with a limit (packet: false-positive) | tag: Bird | Over the cap ("no more than 2 Energy and no more than 1 rainbow"), so it cannot be the unit played; the rule's why keeps the whole tag list and leaves that cap to the reader. |
| `RAD-036` Storm Raptor | fits, with a limit (packet: false-positive) | tag: Bird | Over the cap ("no more than 2 Energy and no more than 1 rainbow"), so it cannot be the unit played; the rule's why keeps the whole tag list and leaves that cap to the reader. |
| `RAD-053` Strigian Oracle | fits | tag: Bird | Bird unit at 2 Energy and no Power, inside both caps: it can be played from the trash free and earns the 2-Energy discount. |

### `ivern-friend-to-all-four-tags`

Anchor `UNL-177` Ivern, Friend to All. Matched 51 -> 57 (+6, -0); 0 excluded; stamp 51 -> 57.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-119` Hunting Dog | fits | tags: Demacia, Dog | Unit carrying the Dog tag, one of the tags Ivern needs from the board. |
| `RAD-027` Iridescent Avian | fits | tags: Ixtal, Bird | Unit carrying the Bird tag, one of the tags Ivern needs from the board. |
| `RAD-104` Pitiless Stalker | fits | tags: Shadow Isles, Cat | Unit carrying the Cat tag, one of the tags Ivern needs from the board. |
| `RAD-075` Skystrike Squadron | fits | tags: Demacia, Elite, Bird | Unit carrying the Bird tag, one of the tags Ivern needs from the board. |
| `RAD-036` Storm Raptor | fits | tags: Freljord, Bird | Unit carrying the Bird tag, one of the tags Ivern needs from the board. |
| `RAD-053` Strigian Oracle | fits | tags: Freljord, Bird | Unit carrying the Bird tag, one of the tags Ivern needs from the board. |

### `daisy-four-tags`

Anchor `UNL-196` Daisy!. Matched 51 -> 57 (+6, -0); 0 excluded; stamp 51 -> 57.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-119` Hunting Dog | fits | tags: Dog | Printed tag Dog (matched on the tags field, not on text) counts toward Daisy's Bird, Cat, Dog and Poro discount and her four-tag Stun trigger. |
| `RAD-027` Iridescent Avian | fits | tags: Bird | Printed tag Bird (matched on the tags field, not on text) counts toward Daisy's Bird, Cat, Dog and Poro discount and her four-tag Stun trigger. |
| `RAD-104` Pitiless Stalker | fits | tags: Cat | Printed tag Cat (matched on the tags field, not on text) counts toward Daisy's Bird, Cat, Dog and Poro discount and her four-tag Stun trigger. |
| `RAD-075` Skystrike Squadron | fits | tags: Bird | Printed tag Bird (matched on the tags field, not on text) counts toward Daisy's Bird, Cat, Dog and Poro discount and her four-tag Stun trigger. |
| `RAD-036` Storm Raptor | fits | tags: Bird | Printed tag Bird (matched on the tags field, not on text) counts toward Daisy's Bird, Cat, Dog and Poro discount and her four-tag Stun trigger. |
| `RAD-053` Strigian Oracle | fits | tags: Bird | Printed tag Bird (matched on the tags field, not on text) counts toward Daisy's Bird, Cat, Dog and Poro discount and her four-tag Stun trigger. |

### `green-father-brush-four-tags`

Anchor `UNL-195` Green Father. Matched 54 -> 60 (+6, -0); 0 excluded; stamp 54 -> 60.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-119` Hunting Dog | fits | tag: Dog | Unit with the Dog tag, which Brush gives +1 Might (tag-only match, no text fragment). |
| `RAD-027` Iridescent Avian | fits | tag: Bird | Unit with the Bird tag (tag-only match, no text fragment). |
| `RAD-104` Pitiless Stalker | fits | tag: Cat | Unit with the Cat tag (tag-only match, no text fragment). |
| `RAD-075` Skystrike Squadron | fits | tag: Bird | Unit with the Bird tag (tag-only match, no text fragment). |
| `RAD-036` Storm Raptor | fits | tag: Bird | Unit with the Bird tag (tag-only match, no text fragment). |
| `RAD-053` Strigian Oracle | fits | tag: Bird | Unit with the Bird tag (tag-only match, no text fragment). |

### `grim-resolve-combat-win-removal-family`

Anchor `UNL-095` Grim Resolve. Matched 28 -> 30 (+2, -0); 0 excluded; stamp 28 -> 30.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-056` Improvised Projectile | fits | Choose a friendly gear. Deal damage equal to its Energy cost to a unit at a battlefield. | [Action] damage spell at a battlefield that can be lethal for the other side's lone body, like the existing damage spells; it needs a friendly gear to read. |
| `RAD-013` Lost to the Sands | fits | • Deal 4 to a unit at a battlefield. | [Action] spell whose first mode is lethal damage at a battlefield (the Kill a gear mode is irrelevant). |

### `pyke-returned-enemy-kill-removal-family`

Anchor `UNL-145` Pyke, Returned. Matched 23 -> 25 (+2, -0); 0 excluded; stamp 23 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-056` Improvised Projectile | fits | Choose a friendly gear. Deal damage equal to its Energy cost to a unit at a battlefield. | Damage-based [Action] removal on a unit at a battlefield, so it can put an enemy unit in the Trash (428.1) like the listed damage spells; the damage scales with the chosen gear's Energy cost, which is a cost not a risk of replacement. |
| `RAD-013` Lost to the Sands | fits | Deal 4 to a unit at a battlefield. | One of two modes is a plain 4-damage [Action] removal on a unit at a battlefield, a real kill that triggers Pyke; the other mode (Kill a gear) is irrelevant but does not hurt the match. |

### `portal-rescue-replays-a-body`

Anchor `OGN-102` Portal Rescue. Matched 16 -> 22 (+6, -0); 1 excluded; stamp 16 -> 21.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-001` Amateur Demolitionist | fits | When you play me, play a Bomb gear token to a battlefield. (It has [Deploy]. When it dies, deal 2 to an enemy there and kill your other Bombs there.) | 'When you play me, play a Bomb gear token to a battlefield' leaves a permanent behind on each replay, like Trove Golem. |
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | Play trigger makes a 3 Might Mech token, so the replay makes a second one. |
| `RAD-116` Concert Poster | excluded | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | a gear: Portal Rescue banishes "a friendly unit", so it never replays this play effect. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | Play trigger makes a 3 Might Mech token each replay. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Play trigger makes a 1 Might Recruit each replay. |
| `RAD-023` Ziggs, Short-Fused | fits | When you play me, play a Bomb gear token to a battlefield. (It has [Deploy]. When it dies, deal 2 to an enemy there and kill your other Bombs there.) | Play trigger makes a Bomb gear token each replay (and Ziggs is a unit Portal Rescue can take). |

### `teemo-strategist-lures-the-attacker`

Anchor `OGN-121` Teemo, Strategist. Matched 13 -> 15 (+2, -0); 0 excluded; stamp 13 -> 15.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-044` Hunting Blind | fits | When you play this, you may move an enemy unit to this battlefield. | Deploy gear that moves an enemy unit to this battlefield on play (same shape as OGN-067 Blitzcrank, Impassive, in the list) and gives friendly units here Shield 2 for the defence it forces. |
| `RAD-098` Siren's Song | fits | Move an enemy unit that moved this turn. | 'Move an enemy unit' with no named destination (like OGN-043 Charm), so the controller may pick Teemo's battlefield; caveat: the target must already have moved this turn, so it works mostly as a Reaction to their move. |

### `dark-child-off-turn-reaction-units`

Anchor `OGS-017` Dark Child - Starter. Matched 17 -> 18 (+1, -0); 0 excluded; stamp 17 -> 18.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-090` Evelynn, Consuming | fits | [Ambush] (You may play me as a [Reaction] to a battlefield where you have units.) | [Ambush] plays it as a [Reaction] to a battlefield where you have units; the rule list already carries other [Ambush] units (UNL-002 Inferna is the basis combo). |

### `magma-wurm-mass-ready`

Anchor `OGN-011` Magma Wurm. Matched 50 -> 61 (+11, -0); 2 excluded; stamp 50 -> 59.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-009` Antagonistic Apparatus | excluded | When you play me, play a ready 3 :rb_might: Mech unit token here. | "I enter ready" and "play a ready 3 Might Mech unit token": both bodies already enter ready, so the Wurm adds nothing. |
| `RAD-159` Black Rose Sanctum | fits | For each player, the first time each turn a non-token unit they control dies here, they play a 1 :rb_might: Recruit unit token to their base. | Battlefield that plays a 1 Might Recruit to each player's base on the first non-token death here per turn; your tokens enter ready under Wurm. Repeatable per turn, conditional on non-token deaths. |
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Gear that plays a 1 Might Recruit token to your base for 1 on play or conquer; the token enters ready under Wurm. |
| `RAD-152` Encore | fits | • Play two 1 :rb_might: Recruit unit tokens. | One of four modes of a choose-two spell is 'Play two 1 Might Recruit unit tokens'; a real generator mode, optional per cast. |
| `RAD-132` Heimerdinger, Academy Instructor | excluded | If you would play a unit token to a location while I'm at a battlefield, you may play a 3 :rb_might: Mech unit token to that same location instead. | "If you would play a unit token ..., you may play a 3 Might Mech unit token ... instead" replaces a token another card was already making and plays none of its own, so the anchor gains no body (the RAD-132 exclude on grand-plaza-unit-tokens). |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. (When I die, get the effect. Opponents must pay :rb_rune_rainbow: to choose a [Deflect] unit with a spell or ability.) | Deathknell plays a 1 Might Bird token to your base; the token enters ready under Wurm (only when Hunting Dog dies). |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | Plays a 3 Might Mech unit token here on play; the token enters ready under Wurm. |
| `RAD-007` Rally for War | fits, with a limit (packet: false-positive) | Choose an occupied enemy battlefield. Play three 1 :rb_might: Recruit unit tokens there. | The three Recruits are played to an occupied enemy battlefield and attack on entry (190.3.a.1, 466.2.c.3) whether ready or not, so the Wurm buys only a move after that combat. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. If you showed off, play four to your base instead.disa | Plays two (or, if you showed off, four) 1 Might Recruit tokens to your base; the batch enters ready under Wurm. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Plays a 1 Might Recruit to your base on play and each time it becomes exhausted; repeatable generator, tokens enter ready under Wurm. |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly gear, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token. | Gear with 'Kill a friendly gear, exhaust: Play a 1 Might Recruit unit token' and a Mech-token twin (the Gold sentence is not the match); repeatable generator, tokens enter ready under Wurm. |

### `weaponmaster-equip-discount`

Anchor `SFD-008` Sentinel Adept. Matched 39 -> 41 (+2, -0); 1 excluded; stamp 39 -> 40.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | [Equip] — :rb_rune_rainbow: or exhaust a friendly unit. | [Equip] costs a rainbow rune or exhausting a unit, so Weaponmaster's rune-less discount takes the rune cost off. |
| `RAD-123` Protector's Shield | excluded | [Equip] :rb_energy_1: (:rb_energy_1:: Attach this to a unit you control.) | Its [Equip] costs 1 Energy and no rune, and 821.1.c.3 says such a cost "can still be paid, but will not be reduced". |

### `rell-magnetic-free-equip-attach`

Anchor `SFD-024` Rell, Magnetic. Matched 39 -> 41 (+2, -0); 0 excluded; stamp 39 -> 41.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits, with a limit (packet: false-positive) | [Equip] — :rb_rune_rainbow: or exhaust a friendly unit. | Energy cost 3 is over Rell's "no more than 2"; the rule's why lists every [Equip] gear and leaves that bar to the reader. |
| `RAD-123` Protector's Shield | fits | [Equip] :rb_energy_1: (:rb_energy_1:: Attach this to a unit you control.) | Energy cost 2 clears Rell's bar. Its [Quick-Draw] attach and Rell's own attach both end on a unit you control, as with the existing Long Sword, Cloth Armor and Spinning Axe. |

### `dauntless-vanguard-occupied-battlefield-assault`

Anchor `SFD-093` Dauntless Vanguard. Matched 41 -> 48 (+7, -0); 0 excluded; stamp 41 -> 48.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-002` Banner of Conquest | fits | Friendly units here have [Assault]. | Grants [Assault] to every friendly unit at its battlefield, including the Vanguard played in as the attacker. |
| `RAD-004` Brawl | fits | Give a unit [Assault] this turn equal to its Might. | Assault giver; an attacker Vanguard (4 Might) gets Assault 4. |
| `RAD-021` Ekko, Revolutionary | fits | [Assault] (+1 :rb_might: while I'm an attacker.) | Printed [Assault] carrier; same family as the 40 earlier self-[Assault] units the rule already lists. |
| `RAD-133` Jarvan IV, Royal Heir | fits | [Assault] (+1 :rb_might: while I'm attacking.) | Printed [Assault] carrier; same family as the earlier self-[Assault] units. |
| `RAD-020` Mordekaiser, Twice Slain | fits | [Assault 3] (+3 :rb_might: while I'm an attacker.) | Printed [Assault 3] carrier; same family as Sharkling and Vayne, Hunter. |
| `RAD-147` Pride of Nazumah | fits | Give a friendly unit "I have [Assault] equal to my [Shield]" this turn. | Matches inside a quoted ability, but the quote is the grant itself (the legend's own activated effect), so it really gives Assault to a friendly Shield unit; it is 0 on a Shield-less Vanguard, a conditional source like Ancient Warmonger. |
| `RAD-088` Staunch Survivor | fits | [Assault 2], [Shield 2] (+2 :rb_might: while I'm an attacker or defender.) | Printed [Assault 2] carrier. |

### `soul-shepherd-token-buff`

Anchor `UNL-077` Soul Shepherd. Matched 50 -> 61 (+11, -0); 0 excluded; stamp 50 -> 61.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | Plays a 3 Might Mech unit token on play; Soul Shepherd makes it 4. |
| `RAD-159` Black Rose Sanctum | fits | For each player, the first time each turn a non-token unit they control dies here, they play a 1 :rb_might: Recruit unit token to their base. | Each player gets a Recruit token the first time each turn a non-token unit they control dies here, and Soul Shepherd buffs yours; the opponent gets one too, but your own half is a real token feed. |
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Pays 1 to play a Recruit token on play and on each conquer here; Soul Shepherd buffs it. |
| `RAD-152` Encore | fits | • Play two 1 :rb_might: Recruit unit tokens. | One of the four modes plays two Recruit tokens, which Soul Shepherd buffs; a modal spell still carries the pattern. |
| `RAD-132` Heimerdinger, Academy Instructor | fits | If you would play a unit token to a location while I'm at a battlefield, you may play a 3 :rb_might: Mech unit token to that same location instead. | Plays no token on its own: it swaps another source's unit-token play for a 3 Might Mech token, so it needs a generator, but the swapped-in Mech token is a token Soul Shepherd buffs and UNL-086 Zilean (also a token-play modifier) is the precedent kept in this list. |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. (When I die, get the effect. Opponents must pay :rb_rune_rainbow: to choose a [Deflect] unit with a spell or ability.) | Deathknell plays a 1 Might Bird token, which Soul Shepherd buffs. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | Plays a 3 Might Mech unit token on play; Soul Shepherd makes it 4. |
| `RAD-007` Rally for War | fits | Choose an occupied enemy battlefield. Play three 1 :rb_might: Recruit unit tokens there. | Plays three Recruit tokens at an occupied enemy battlefield; each is a token unit Soul Shepherd buffs. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. If you showed off, play four to your base instead.disa | Plays two Recruit tokens (four if it showed off) to your base, all buffed by Soul Shepherd. Data note: the card text ends in a stray 'disa' after 'instead.', not addressed in gallery-fixes. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Plays a Recruit token on play and each time it becomes exhausted, so it keeps feeding Soul Shepherd. |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly gear, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token. | Its second ability (kill a friendly gear, exhaust) plays a 1 Might Recruit unit token and its third plays a 3 Might Mech token; the Gold gear token on the first line is not a unit token, but the other two lines carry the pattern. |

### `gemcraft-seer-vision-generalization`

Anchor `OGN-100` Gemcraft Seer. Matched 50 -> 61 (+11, -0); 1 excluded; stamp 50 -> 60.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | Plain friendly unit-token maker on play. |
| `RAD-159` Black Rose Sanctum | fits | For each player, the first time each turn a non-token unit they control dies here, they play a 1 :rb_might: Recruit unit token to their base. | Battlefield token maker like Altar to Unity: your non-token unit dying here gives you a Recruit that lands with Vision. It is symmetrical, and only your own token gets Vision (Seer says friendly). |
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Optional-cost token maker, still a supply of friendly tokens. |
| `RAD-152` Encore | fits | • Play two 1 :rb_might: Recruit unit tokens. | Modal spell with a token mode you can choose; two Recruits. |
| `RAD-132` Heimerdinger, Academy Instructor | excluded | If you would play a unit token to a location while I'm at a battlefield, you may play a 3 :rb_might: Mech unit token to that same location instead. | "If you would play a unit token ..., you may play a 3 Might Mech unit token ... instead" replaces a token another card was already making and plays none of its own, so the anchor gains no body (the RAD-132 exclude on grand-plaza-unit-tokens). |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. | Conditional token maker (when it dies), friendly Bird lands at your base. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | Plain friendly unit-token maker on play. |
| `RAD-007` Rally for War | fits | Play three 1 :rb_might: Recruit unit tokens there. | Three friendly Recruits, played to an enemy-occupied battlefield. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. | Two or four friendly Recruits. cards.json text ends with a stray disa after the last sentence (data anomaly, not part of the match). |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Repeatable friendly Recruit maker. |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly gear, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token. | Repeatable token maker; the cost kills a friendly gear or unit, which is a price not a block. |

### `heimerdinger-inventor-exhaust-copy`

Anchor `OGN-111` Heimerdinger, Inventor. Matched 73 -> 90 (+17, -0); 3 excluded; stamp 73 -> 87.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-113` Angler Wyrm | fits | :rb_exhaust:: Choose an opponent. They must move a unit they control to my battlefield. | Unit with its own colon-syntax exhaust ability; 377.1 makes it Heimerdinger's. 'My battlefield' re-reads on him (R30), so he must stand at a battlefield to use it. |
| `RAD-139` Boy Who Shattered Time | fits | Disempower me, :rb_exhaust:: Reduce the cost of the next unit you play this turn by :rb_energy_2::rb_rune_rainbow: and give it "Kill me at end of turn." | Legend whose 'Disempower me, exhaust:' line (and the Empower keyword, 827.1.c.1) is an exhaust ability Heimerdinger copies. R30 re-reads 'me' as him, so the Disempower half needs him Empowered first (203.3, 443.1.a.1), which the copied Empower line supplies. |
| `RAD-040` Heartening Soul | fits | Friendly legends have ":rb_exhaust:: Give a unit +3 :rb_might: this turn." | Grants every friendly legend a colon exhaust ability, and Heimerdinger copies the exhaust abilities of friendly legends (479.3 layer-3 'have', dependency per 478.1.a). The quote is a grant to a source he reads from, not a stranded trigger, but it only pays while a legend is on the board. |
| `RAD-141` Hexplosives Expert | fits | :rb_energy_1::rb_rune_rainbow:, :rb_exhaust:: Play a Bomb gear token to a battlefield. (It has [Deploy]. When it dies, deal 2 to an enemy there and kill your other Bombs there.) | Legend with '1 chaos, exhaust: Play a Bomb gear token to a battlefield'; copies as his own activation. |
| `RAD-035` Invigorating Bloom | fits | Exhaust a friendly [Mighty] unit, :rb_exhaust:: Draw 1. (A unit is Mighty while it has 5+ :rb_might:.) | Gear with 'Exhaust a friendly [Mighty] unit, exhaust: Draw 1'; the extra cost (a Mighty unit to exhaust) is still payable by him. |
| `RAD-027` Iridescent Avian | fits | :rb_exhaust:: [Buff] a unit. If it's already buffed, give it +2 :rb_might: this turn instead. (To buff a unit, give it a +1 :rb_might: buff if it doesn't have one.) | Unit with 'exhaust: [Buff] a unit' of its own; copies cleanly. |
| `RAD-143` Iron Revenant | fits | [Reaction][>] Banish a unit or gear from your trash, :rb_exhaust:: [Add] :rb_rune_rainbow:. Spend this Power only to play units or gear. (Abilities that add resources can't be reacted to.) | Legend with a colon exhaust ability (banish a unit or gear from your trash: Add rainbow, spendable only on units or gear); copies as his own. |
| `RAD-104` Pitiless Stalker | fits | :rb_exhaust:: [Stun] an enemy unit. (It doesn't deal combat damage this turn.) | Unit with 'exhaust: [Stun] an enemy unit' of its own; copies cleanly. |
| `RAD-147` Pride of Nazumah | fits | :rb_energy_1:, :rb_exhaust:: Give a friendly unit "I have [Assault] equal to my [Shield]" this turn. (+1 :rb_might: for each instance of Assault while it's an attacker.) | Legend with '1, exhaust: give a friendly unit a Shield-scaled Assault grant'; copies cleanly (the 'I' inside the quote belongs to the unit that receives it). |
| `RAD-105` Reckless Innovator | excluded | • Play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | No exhaust ability of its own: the only :rb_exhaust:: in its text is inside the quoted reminder of the Gold gear token it plays, and that token's "Kill this" leaves nothing to run a second time. |
| `RAD-052` Resource Extractor | excluded | At the end of your turn, if you control this battlefield, play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | No exhaust ability of its own: the only :rb_exhaust:: in its text is inside the quoted reminder of the Gold gear token it plays, and that token's "Kill this" leaves nothing to run a second time. |
| `RAD-046` Resplendent Rostrum | fits | :rb_exhaust:: Draw 1 and channel 1 rune exhausted. | Gear with 'exhaust: Draw 1 and channel 1 rune exhausted'; copies as his own. |
| `RAD-012` Runeblade Anvil | excluded | :rb_energy_2::rb_rune_chaos:, :rb_exhaust:: Kill this. | Its only exhaust ability is ":rb_energy_2::rb_rune_chaos:, :rb_exhaust:: Kill this", the OGN-186 shape: it kills its own source, so a ready finds nothing left to use. |
| `RAD-064` Scrutinizing Scope | fits | :rb_energy_1:, :rb_exhaust:: Choose an opponent. They guess a card type. Reveal the top card of your Main Deck. If it has that type, recycle it. Otherwise, draw it. (Unit, gear, and spell are types.) | Gear with '1, exhaust: Choose an opponent, they guess a card type...'; copies as his own. |
| `RAD-115` Transpositionist | fits | :rb_rune_chaos:, :rb_exhaust:: Return a friendly unit to its owner's hand. You may play a unit with less Might than that unit had, ignoring its cost. | Unit with '1 chaos, exhaust: Return a friendly unit to hand, then play a lesser-Might unit free'; copies as his own. |
| `RAD-022` Whirling Twirligig | fits | :rb_exhaust:: Play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Gear with three colon abilities of its own (Gold, Recruit, Mech token makers); all copy. |
| `RAD-112` Ziggs, Explosive | fits | :rb_energy_1:, :rb_exhaust:: Play a Bomb gear token to a battlefield. (It has [Deploy]. When it dies, deal 2 to an enemy there and kill your other Bombs there.) | Unit with '1, exhaust: Play a Bomb gear token to a battlefield'; copies as his own. |

### `blade-of-ruined-king-deathknell-ondemand`

Anchor `SFD-178` Blade of the Ruined King. Matched 22 -> 25 (+3, -0); 0 excluded; stamp 22 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-067` Clocktower Guardian | fits | [Deathknell][>] Banish the top card of your Main Deck. You may play it, ignoring its Energy cost. | Printed [Deathknell] unit: killed as the Blade's Equip cost, it banishes the top card and may play it free; 808.1.a/808.1.d.2 chain it before the Equip resolves. |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. | Printed [Deathknell] unit (plays a 1 Might Bird token to your base on death), a normal member. |
| `RAD-126` Mournful Spirit | fits | [Deathknell][>] You may kill a unit or gear here. | Printed [Deathknell] unit whose death effect is an optional kill of a unit or gear at its location; a real payoff (location-dependent). |

### `heedless-resurrection-deathknell-ondemand`

Anchor `UNL-142` Heedless Resurrection. Matched 22 -> 25 (+3, -0); 0 excluded; stamp 22 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-067` Clocktower Guardian | fits | [Deathknell][>] Banish the top card of your Main Deck. You may play it, ignoring its Energy cost. | Unit with its own Deathknell, which fires when Heedless Resurrection's additional cost kills it (808.1.a, 808.1.d.2). Mind-domain, so Domain Identity hides it under a Chaos legend at match time. |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. (When I die, get the effect. Opponents must pay :rb_rune_rainbow: to choose a [Deflect] unit with a spell or ability.) | Unit with its own Deathknell, which fires when the additional cost kills it. Order-domain, so Domain Identity hides it under a Chaos legend at match time. |
| `RAD-126` Mournful Spirit | fits | [Deathknell][>] You may kill a unit or gear here. (When I die, get the effect.) | Unit with its own Deathknell, which fires when the additional cost kills it. Order-domain, so Domain Identity hides it under a Chaos legend at match time. |

### `unforgiven-move-triggers`

Anchor `OGN-259` Unforgiven. Matched 31 -> 35 (+4, -0); 0 excluded; stamp 31 -> 35.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-SP2` Akali, Brash | fits | The first time I move each turn, [Add] :rb_energy_1::rb_rune_rainbow:. | A first-move trigger the legend's move fires; the move to or from base is still a Move (420.1). |
| `RAD-078` Armored Tusker | fits | When I move, you may deal damage equal to my [Shield] to a unit at a battlefield. | Plain When I move trigger, fired by the legend's move. |
| `RAD-110` Lulu, Whimsical | fits | When I move, you may have another unit's base Might become 4 this turn. | Plain When I move trigger, fired by the legend's move. |
| `RAD-074` Raving Witness | fits | When I move, reveal the top card of your Main Deck. If it's [Mighty], draw it. Otherwise, recycle it. | Plain When I move trigger, fired by the legend's move. |

### `kadregrin-mighty-payoff`

Anchor `OGN-038` Kadregrin the Infernal. Matched 9 -> 11 (+2, -0); 0 excluded; stamp 9 -> 11.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-035` Invigorating Bloom | fits | Exhaust a friendly [Mighty] unit, :rb_exhaust:: Draw 1. (A unit is Mighty while it has 5+ :rb_might:.) | Its 'Exhaust a friendly [Mighty] unit' cost is gated on the same 5-Might line and its +3 Might on play pushes bodies past it; Kadregrin is a 9 Might body for that cost. |
| `RAD-074` Raving Witness | fits | When I move, reveal the top card of your Main Deck. If it's [Mighty], draw it. Otherwise, recycle it. (A unit is Mighty while it has 5+ :rb_might:.) | Reads the same [Mighty] line off the revealed card (711: non-board units use printed Might) so Kadregrin's printed 9 is Mighty fuel for it; weaker than a board-count payoff but within the list's stated 'triggers and thresholds' breadth. |

### `undertitan-reveal-fuel`

Anchor `SFD-175` Undertitan. Matched 10 -> 14 (+4, -0); 2 excluded; stamp 10 -> 12.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-018` Drakehound Packmaster | excluded | When you play me, reveal the top card of each opponent's Main Deck. Choose one and banish it, then play it, ignoring its cost. Recycle the rest. | "reveal the top card of each opponent's Main Deck", the OGN-025 line: Undertitan is never in that deck. |
| `RAD-111` Mechanical Bandit | excluded | At the start of your Beginning Phase, each player reveals the top card of their Main Deck. If you revealed a card with the lowest Energy cost, draw it. Recycle the rest. | It reveals at the start of your Beginning Phase, and 167 empties the Rune Pool at the start of the Main Phase, so Undertitan's 2 Energy is lost unless a Reaction spends it first. |
| `RAD-074` Raving Witness | fits | When I move, reveal the top card of your Main Deck. If it's [Mighty], draw it. Otherwise, recycle it. (A unit is Mighty while it has 5+ :rb_might:.) | 'When I move, reveal the top card of your Main Deck' fires from your own deck while the pool is live (same shape as SFD-041 Apprentice Smith in this list), and Undertitan's printed Might 5 is Mighty under 711, so Witness draws it. |
| `RAD-064` Scrutinizing Scope | fits | :rb_energy_1:, :rb_exhaust:: Choose an opponent. They guess a card type. Reveal the top card of your Main Deck. If it has that type, recycle it. Otherwise, draw it. (Unit, gear, and spell are types.) | Activated in your Main Phase, it reveals the top card of your own Main Deck, so an Undertitan revealed there pays 2 Energy back toward the 1 Energy ability. |

### `black-market-broker-hidden-family`

Anchor `SFD-121` Black Market Broker. Matched 39 -> 45 (+6, -0); 0 excluded; stamp 39 -> 45.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-107` Bedeviling Stranger | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden], so playing it from face down triggers the Broker (811.1.c.3). |
| `RAD-102` Demon Shade | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden]. |
| `RAD-081` Elnuk Herd | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden]; its recycle-if-played-from-face-down comes after the Broker's trigger. |
| `RAD-103` Gutter Guardian | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden]. |
| `RAD-095` Momentary Companion | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden]. |
| `RAD-100` The Waters' Wage | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden]; it also makes Gold tokens itself. |

### `flame-chompers-discard-family`

Anchor `OGN-006` Flame Chompers. Matched 24 -> 29 (+5, -0); 0 excluded; stamp 24 -> 29.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-153` Agony's Embrace | fits | Once each turn, when you play a card from face down, draw 1. Then, if it's not your turn, discard 1. | 'Then, if it's not your turn, discard 1' discards from your hand, but only on the opponent's turn after a face-down play; a conditional source. |
| `RAD-021` Ekko, Revolutionary | fits | [Action][>] Discard 1, :rb_energy_1::rb_rune_fury:: Banish me, then play me to your base, ignoring my cost. | 'Discard 1, 1 fury: Banish me, then play me to your base' pays a discard as a cost, repeatable; discard of your own hand. |
| `RAD-137` Mordekaiser, Dominating | fits | When you play me or when I attack, you may discard 1 to kill a unit or gear. | 'You may discard 1 to kill a unit or gear' on play and attack; a repeatable optional discard of your own hand. |
| `RAD-166` Ruined Monastery | fits | When you conquer here, you may discard 1 and channel 1 rune exhausted. | 'When you conquer here, you may discard 1 and channel 1 rune exhausted' is an optional discard of your own hand. |
| `RAD-106` The Good Stuff | fits | When you play this, discard 1, then draw 3. | 'When you play this, discard 1, then draw 3' discards on play (a mandatory discard of your own hand). |

### `leona-zealot-stun-might-collapse`

Anchor `OGN-079` Leona, Zealot. Matched 21 -> 25 (+4, -0); 0 excluded; stamp 21 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-028` Ki Burst | fits | [Stun] a unit. | Stun source that can target an enemy unit at Leona's battlefield. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. | Stun source on an enemy unit. |
| `RAD-104` Pitiless Stalker | fits | :rb_exhaust:: [Stun] an enemy unit. | Repeatable stun source. |
| `RAD-043` Riven, Broken Blade | fits | • Spend my buff to [Stun] an enemy unit. | Stun is one of three modes, chosen when he becomes exhausted; a real source, not a watcher of someone else's stun. |

### `solari-chief-stun-into-kill`

Anchor `OGN-225` Solari Chief. Matched 21 -> 25 (+4, -0); 0 excluded; stamp 21 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-028` Ki Burst | fits | [Stun] a unit. (It doesn't deal combat damage this turn.) | '[Stun] a unit' (any unit, plus an exhaust-a-friendly cost); a second stun source that turns Chief's play into a kill. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. (Give the friendly unit a +1 :rb_might: buff if it doesn't have one. The enemy unit doesn't deal combat damage this turn.) | '[Stun] an enemy unit' alongside a buff; a second stun source. |
| `RAD-104` Pitiless Stalker | fits | :rb_exhaust:: [Stun] an enemy unit. (It doesn't deal combat damage this turn.) | 'exhaust: [Stun] an enemy unit' is a repeatable stun source. |
| `RAD-043` Riven, Broken Blade | fits | • Spend my buff to [Stun] an enemy unit. (It doesn't deal combat damage this turn.) | 'Spend my buff to [Stun] an enemy unit' is a stun source (needs the buff from its other mode). |

### `ava-achiever-hidden-discount`

Anchor `OGN-107` Ava Achiever. Matched 36 -> 42 (+6, -0); 0 excluded; stamp 36 -> 42.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-107` Bedeviling Stranger | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Prints [Hidden]; its play trigger (choose a battlefield, return an enemy unit if 4+ units are there) has no from-face-down gate, so Ava's play from hand keeps the full effect. |
| `RAD-102` Demon Shade | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Prints [Hidden] and has no from-face-down gate, so Ava's from-hand play keeps both modes. |
| `RAD-081` Elnuk Herd | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | The only face-down clause is a recycle drawback ('if I was played from face down'), so playing it from hand via Ava keeps the +3 Might and skips the recycle. |
| `RAD-103` Gutter Guardian | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Show Off is decided while the chain item is being finalized (832.1.c.2), which Ava's play still goes through, so the Add 1 rainbow payoff stays reachable whenever another [Hidden] card is in hand or on the board to show off. |
| `RAD-095` Momentary Companion | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Temporary is given only 'if it's not your turn' and Ava's trigger is 'When I attack', which happens on your turn, so Ava plays a 4 Might body with no Temporary: a strict upgrade over hiding it. |
| `RAD-100` The Waters' Wage | fits, with a limit (packet: false-positive) | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Ava plays it from hand, so the three ready Golds (from face down, on your turn) never come; it still makes one exhausted Gold for 1 Mind Power, the flat price the rule gives every [Hidden] card. |

### `show-of-strength-mighty-payoff`

Anchor `SFD-106` Show of Strength. Matched 9 -> 11 (+2, -0); 1 excluded; stamp 9 -> 10.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-035` Invigorating Bloom | fits | Exhaust a friendly [Mighty] unit, :rb_exhaust:: Draw 1. | Both halves of the why: needs a Mighty unit present (like Sacrifice, Sunken Temple) and its play effect gives +3 Might to a friendly unit, pushing a body over 5. |
| `RAD-074` Raving Witness | excluded | If it's [Mighty], draw it. | It tests whether a revealed Main Deck card is [Mighty] (by printed Might, 711) and makes no unit Mighty; Show of Strength counts Mighty units on the board, and as a spell it is never the card the reveal draws. |

### `pridestalker-mighty-enabler`

Anchor `UNL-183` Pridestalker. Matched 10 -> 12 (+2, -0); 1 excluded; stamp 10 -> 11.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-035` Invigorating Bloom | fits | Exhaust a friendly [Mighty] unit, :rb_exhaust:: Draw 1. (A unit is Mighty while it has 5+ :rb_might:.) | 'Exhaust a friendly [Mighty] unit, exhaust: Draw 1' pays off a body pushed to 5 Might by Pridestalker's buff. |
| `RAD-074` Raving Witness | excluded | When I move, reveal the top card of your Main Deck. If it's [Mighty], draw it. Otherwise, recycle it. (A unit is Mighty while it has 5+ :rb_might:.) | It tests whether a revealed Main Deck card is [Mighty], by printed Might (711); Pridestalker's +1 Might reaches only units on the board and never moves that test. |

### `curator-of-the-sands-printed-cost`

Anchor `VEN-145` Curator of the Sands. Matched 54 -> 69 (+15, -0); 0 excluded; stamp 54 -> 69.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-113` Angler Wyrm | fits | energy: 8 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-080` Bloodscent Swarm | fits | energy: 8 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-067` Clocktower Guardian | fits | energy: 8 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-018` Drakehound Packmaster | fits | energy: 9 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-125` Dune Devourer | fits | energy: 7 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-040` Heartening Soul | fits | energy: 7 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-133` Jarvan IV, Royal Heir | fits | energy: 7 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-137` Mordekaiser, Dominating | fits | energy: 9 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-020` Mordekaiser, Twice Slain | fits | energy: 7 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-122` Party Crasher | fits | energy: 9 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-046` Resplendent Rostrum | fits | energy: 8 (printed Energy cost), type: gear | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-092` Seraphic Wyvern | fits | energy: 7 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-060` The Empyrean | fits | energy: 8 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-077` Wrath of the Freljord | fits | energy: 9 (printed Energy cost), type: unit | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |
| `RAD-069` Zero Point Inflection | fits | energy: 9 (printed Energy cost), type: gear | Non-text predicate: printed Energy cost is 7 or more on a unit or gear, and 206 reads only the printed cost, so any discount or free play still fires Curator. |

### `jax-unrelenting-attach-draw`

Anchor `SFD-119` Jax, Unrelenting. Matched 39 -> 41 (+2, -0); 0 excluded; stamp 39 -> 41.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | [Equip] — :rb_rune_rainbow: or exhaust a friendly unit. (Pay the cost: Attach this to a unit you control.) | Prints [Equip], so each attach to Jax can draw a card for 1 Energy. |
| `RAD-123` Protector's Shield | fits | [Equip] :rb_energy_1: (:rb_energy_1:: Attach this to a unit you control.) | Prints [Equip] and [Quick-Draw]; both attach to Jax and draw. (The Quick-Draw no-op that excludes it on the Jax, Unmatched rule does not apply here, this rule needs only the attach.) |

### `lee-sin-ascetic-unlimited-buffs`

Anchor `OGN-078` Lee Sin, Ascetic. Matched 3 -> 4 (+1, -0); 1 excluded; stamp 3 -> 3.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-027` Iridescent Avian | excluded | :rb_exhaust:: [Buff] a unit. If it's already buffed, give it +2 :rb_might: this turn instead. | "If it's already buffed, give it +2 Might this turn instead": on a Lee Sin who holds a buff it gives the temporary +2, never a second buff, so nothing stacks. |

### `bewitching-spirit-bounce-replay`

Anchor `UNL-121` Bewitching Spirit. Matched 7 -> 12 (+5, -0); 2 excluded; stamp 7 -> 10.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-061` Ekko, Ingenious | fits | As an additional cost to play me, return a friendly unit to its owner's hand. | Additional cost returns a friendly unit to hand, which can be Bewitching Spirit for another discard. |
| `RAD-051` Parallel Convergence | fits | As an additional cost to play this, return a friendly unit to its owner's hand. | Additional cost returns a friendly unit to hand, so Spirit can be rebought for another discard. |
| `RAD-075` Skystrike Squadron | excluded | You may return a friendly gear to its owner's hand as an additional cost to play me. If you do, I cost :rb_energy_2: less. | "return a friendly gear to its owner's hand" only ever moves gear; Bewitching Spirit is a unit, so this can never bounce him for a replay, as with SFD-044. |
| `RAD-066` Spirit of the Forge | excluded | You may return a friendly gear to its owner's hand as an additional cost to play me. | "return a friendly gear to its owner's hand" only ever moves gear; Bewitching Spirit is a unit, so this can never bounce him for a replay, as with SFD-044. |
| `RAD-115` Transpositionist | fits | :rb_rune_chaos:, :rb_exhaust:: Return a friendly unit to its owner's hand. You may play a unit with less Might than that unit had, ignoring its cost. | Repeatable ability: returns a friendly unit to hand (and may play a lower-Might unit free), so Spirit can be bounced and replayed each turn. |

### `chem-baroness-gold-ramp`

Anchor `SFD-201` Chem-Baroness. Matched 20 -> 25 (+5, -0); 0 excluded; stamp 20 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-157` Bandle Scouts' Academy | fits | When you hide a card here, play a Gold gear token exhausted. | A battlefield that makes a Gold gear token exhausted on a hide trigger: one more Gold producer, additive ramp with Chem-Baroness's own hold trigger (rule's types list includes battlefield). |
| `RAD-105` Reckless Innovator | fits | Play a Gold gear token exhausted. | Gold producer on one of two modes of its exhaust trigger; the mode is a free choice, so the producer role is real. Chaos-domain, so Domain Identity hides it under Chem-Baroness at match time, not a rule-level defect. |
| `RAD-052` Resource Extractor | fits | At the end of your turn, if you control this battlefield, play a Gold gear token exhausted. | Gear that makes one exhausted Gold each end of turn while its battlefield is controlled; a plain additional producer. |
| `RAD-100` The Waters' Wage | fits | Play a Gold gear token exhausted. | Spell that makes a Gold exhausted (three ready ones when played from face down on your turn); a plain additional producer. Chaos-domain, so filtered by Domain Identity at runtime. |
| `RAD-022` Whirling Twirligig | fits | Play a Gold gear token exhausted. | Gear whose exhaust ability makes an exhausted Gold each turn; a plain additional producer. Fury-domain, so filtered by Domain Identity at runtime. |

### `time-warp-hold-effects`

Anchor `OGN-122` Time Warp. Matched 47 -> 55 (+8, -0); 2 excluded; stamp 47 -> 53.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-067` Clocktower Guardian | fits | When you play me or when I hold, [Predict 3]. | Real hold trigger on a unit that stays on the board; Predict 3 fires again in the extra Beginning Phase and is not consumed. |
| `RAD-160` Cosmic Vista | fits, with a limit (packet: false-positive) | When you hold here, if your Rune Deck is empty, you score 1 point. | The extra turn's hold scores again only if the Rune Deck is still empty, and paying Time Warp's 4 Power with basic runes recycles them into it (164.2.b, 161.2.b), so it works only when that Power comes from elsewhere (a Seal, Gold). |
| `RAD-156` Demacian Standard | excluded | When you hold here, you may return this to its owner's hand. | Its only hold effect returns it to hand, the OGN-067 shape this rule excludes: the extra turn's hold has nothing to return. |
| `RAD-136` Dockside Lock-Up | excluded | When you hold here, kill this to play the banished card, ignoring its cost. | The first hold kills it to play the banished card, so the extra turn's hold finds it gone and plays nothing (203.3). |
| `RAD-SP3` Evelynn, In Control | fits | When I hold, if you control a facedown card here, score 1 point. | Her condition (a facedown card here) is not spent by the first firing, so the extra Beginning Phase scores another point (469.2 resets per turn). |
| `RAD-094` Explosimian | fits | When I hold, play three Bomb gear tokens to a single battlefield. | Real hold trigger; the second firing plays three more Bombs (the parenthetical is only the tokens' reminder). |
| `RAD-086` K'Sante, Courageous | fits | When I hold, channel 1 rune. | Real hold trigger; channels another rune in the extra Beginning Phase. |
| `RAD-106` The Good Stuff | fits | When you hold here, return this to its owner's hand. | Returns itself, like excluded OGN-067, but on this rule the firings sit on different turns and Deploy (830.1.b) lets you replay it straight to a battlefield in between: replaying gives "discard 1, then draw 3" again, and only the second return makes the extra-turn replay possible. A rebuy that the extra Beginning Phase does extend; depends on replaying it before the extra turn. |

### `bloodharbor-ripper-etb-replay`

Anchor `UNL-185` Bloodharbor Ripper. Matched 14 -> 19 (+5, -0); 0 excluded; stamp 14 -> 19.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-001` Amateur Demolitionist | fits | When you play me, play a Bomb gear token to a battlefield. | On-play effect plays a Bomb gear token each time it is replayed, a real body left on the board (unlike the excluded VEN-068, which puts nothing on the board). |
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | On-play effect plays a ready 3 Might Mech unit token here, repeated on each replay. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | On-play effect plays a 3 Might Mech unit token here, repeated on each replay. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | On-play effect plays a Recruit unit token to your base, repeated on each replay. |
| `RAD-023` Ziggs, Short-Fused | fits | When you play me, play a Bomb gear token to a battlefield. | On-play effect plays a Bomb gear token each time it is replayed. |

### `tryndamere-excess-damage-might-reduction`

Anchor `OGN-034` Tryndamere, Barbarian. Matched 22 -> 33 (+11, -0); 0 excluded; stamp 22 -> 33.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-SP1` Ahri, Confident | fits | [Disarm] (When I attack, give an enemy unit here -1 :rb_might: this turn.) | Matches through the Disarm reminder, but here that is the keyword's real function (831.1.d: "functionally short for 'When I attack, give an enemy unit here -X [M] this turn'"), the same effect as the already-listed OGN-119 Ahri, Inquisitive; a Disarm unit attacking with Tryndamere shrinks the defender in that combat, so the bill drops and the excess rises (465.2.c.4, 143.2.a). Match is via the RAD-038 print (the showcase print drops the reminder). Her own +1 Might on a reduction adds attacker Might on top. (Fragment quoted from the sibling print `RAD-038`: this showcase print carries [Disarm] without its reminder text.) |
| `RAD-055` Clanging Sentry | fits | Your Mechs have [Disarm]. (When each of us attacks, give an enemy unit there -1 :rb_might: this turn.) | Static grant, not a quote: Sentry is itself a Mech (tags Piltover, Mech), so it gives itself Disarm 1 (831.2 sums) and shrinks the defender whenever it or another Mech attacks alongside Tryndamere. |
| `RAD-093` Disposal Expert | fits | [Disarm 2] (When I attack, give an enemy unit here -2 :rb_might: this turn.) | Matches through the Disarm reminder, but here that is the keyword's real function (831.1.d: "functionally short for 'When I attack, give an enemy unit here -X [M] this turn'"), the same effect as the already-listed OGN-119 Ahri, Inquisitive; a Disarm unit attacking with Tryndamere shrinks the defender in that combat, so the bill drops and the excess rises (465.2.c.4, 143.2.a). |
| `RAD-SP3` Evelynn, In Control | fits | [Disarm] (When I attack, give an enemy unit here -1 :rb_might: this turn.) | Matches through the Disarm reminder, but here that is the keyword's real function (831.1.d: "functionally short for 'When I attack, give an enemy unit here -X [M] this turn'"), the same effect as the already-listed OGN-119 Ahri, Inquisitive; a Disarm unit attacking with Tryndamere shrinks the defender in that combat, so the bill drops and the excess rises (465.2.c.4, 143.2.a). Match is via the RAD-109 print (the showcase print drops the reminder). (Fragment quoted from the sibling print `RAD-109`: this showcase print carries [Disarm] without its reminder text.) |
| `RAD-SP4` Kai'Sa, Rebel | fits | [Disarm] (When I attack, give an enemy unit here -1 :rb_might: this turn). | Matches through the Disarm reminder, but here that is the keyword's real function (831.1.d: "functionally short for 'When I attack, give an enemy unit here -X [M] this turn'"), the same effect as the already-listed OGN-119 Ahri, Inquisitive; a Disarm unit attacking with Tryndamere shrinks the defender in that combat, so the bill drops and the excess rises (465.2.c.4, 143.2.a). Match is via the RAD-063 print (the showcase print drops the reminder). (Fragment quoted from the sibling print `RAD-063`: this showcase print carries [Disarm] without its reminder text.) |
| `RAD-050` Mysterious Chronomancer | fits | [Disarm 2] (When I attack, give an enemy unit here -2 :rb_might: this turn.) | Matches through the Disarm reminder, but here that is the keyword's real function (831.1.d: "functionally short for 'When I attack, give an enemy unit here -X [M] this turn'"), the same effect as the already-listed OGN-119 Ahri, Inquisitive; a Disarm unit attacking with Tryndamere shrinks the defender in that combat, so the bill drops and the excess rises (465.2.c.4, 143.2.a). |
| `RAD-144` Realm of Death | fits | Give an enemy unit -2 :rb_might: this turn and a friendly unit +2 :rb_might: this turn. | Same shape as the listed Defiant Dance (+2 friendly / -2 enemy, no floor): cast on your turn before the attack, the -2 lasts the turn and lowers the defender's bill. The follow-on damage between the two units can only lower it further (or kill the defender outright, leaving no excess to count). |
| `RAD-058` Riptide Mage | fits | When you play me, give an enemy unit -3 :rb_might: this turn. | Play-effect shrink on your turn, the same shape as listed OGN-116 Thousand-Tailed Watcher and SFD-067 Frostcoat Cub; Accelerate lets it enter ready. -3 on the defender lowers the bill by 3. |
| `RAD-065` Seraphine, Inspiring | fits | [Disarm 2] (When I attack, give an enemy unit here -2 :rb_might: this turn.) | Matches through the Disarm reminder, but here that is the keyword's real function (831.1.d: "functionally short for 'When I attack, give an enemy unit here -X [M] this turn'"), the same effect as the already-listed OGN-119 Ahri, Inquisitive; a Disarm unit attacking with Tryndamere shrinks the defender in that combat, so the bill drops and the excess rises (465.2.c.4, 143.2.a). |
| `RAD-097` Siren of the Shallows | fits | [Disarm] (When I attack, give an enemy unit here -1 :rb_might: this turn.) | Matches through the Disarm reminder, but here that is the keyword's real function (831.1.d: "functionally short for 'When I attack, give an enemy unit here -X [M] this turn'"), the same effect as the already-listed OGN-119 Ahri, Inquisitive; a Disarm unit attacking with Tryndamere shrinks the defender in that combat, so the bill drops and the excess rises (465.2.c.4, 143.2.a). |
| `RAD-054` Trinket Peddler | fits | [Disarm] (When I attack, give an enemy unit here -1 :rb_might: this turn.) | Matches through the Disarm reminder, but here that is the keyword's real function (831.1.d: "functionally short for 'When I attack, give an enemy unit here -X [M] this turn'"), the same effect as the already-listed OGN-119 Ahri, Inquisitive; a Disarm unit attacking with Tryndamere shrinks the defender in that combat, so the bill drops and the excess rises (465.2.c.4, 143.2.a). |

### `sky-splitter-might-discount`

Anchor `OGN-014` Sky Splitter. Matched 10 -> 11 (+1, -0); 0 excluded; stamp 10 -> 11.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-118` Herald of the Emperor | fits | When you play me, choose a friendly unit. Its base Might becomes 5 this turn. | 'Its base Might becomes 5 this turn' lifts the highest Might for the discount, same wording as VEN-116 Dragon Form already on this list. |

### `master-of-shadows-banish-empower`

Anchor `VEN-143` Master of Shadows. Matched 31 -> 36 (+5, -0); 2 excluded; stamp 31 -> 34.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-124` Burn Away | excluded | Banish a unit with 3 :rb_might: or less or a gear. | Burn Away banishes a unit or gear and returns nothing, so it empowers him only by destroying one of your own cards; the list's members banish to replay or banish themselves. |
| `RAD-136` Dockside Lock-Up | fits | When you play this, banish a unit here. | Play trigger banishes a unit here and the hold trigger replays it, a banish-and-replay like Portal Rescue (aimed at your own unit it is a blink). |
| `RAD-021` Ekko, Revolutionary | fits | [Action][>] Discard 1, :rb_energy_1::rb_rune_fury:: Banish me, then play me to your base, ignoring my cost. | Banishes itself ('Banish me, then play me to your base'), a self-banish of a card you own. |
| `RAD-010` Forbidden Technique | fits | Then banish this. | Its own 'Then banish this' after the trash replay is a self-banish, the same trigger a [Flow] spell gives. |
| `RAD-143` Iron Revenant | excluded | [Reaction][>] Banish a unit or gear from your trash, :rb_exhaust:: [Add] :rb_rune_rainbow:. | Iron Revenant is a legend and so is Master of Shadows: a deck has one Champion Legend (103.2), and a legend an effect adds is not one (107.4.d.1), so the two never share a board. |

### `undertitan-reveal-payoff`

Anchor `SFD-175` Undertitan. Matched 8 -> 10 (+2, -0); 0 excluded; stamp 8 -> 10.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-074` Raving Witness | fits | When I move, reveal the top card of your Main Deck. | Reveals your own Main Deck top card, which fires Undertitan's 'As I'm revealed' Add. |
| `RAD-064` Scrutinizing Scope | fits | Reveal the top card of your Main Deck. | Reveals your own Main Deck top card on each activation. |

### `karma-channeler-recycle-main`

Anchor `OGN-235` Karma, Channeler. Matched 46 -> 60 (+14, -0); 2 excluded; stamp 46 -> 58.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-016` Coalesced Energy | excluded | At the end of your turn, recycle all your runes, then channel 4 runes exhausted. | "recycle all your runes" sends runes to the RUNE Deck (417.1.b in the 2026-10-09 rules), never the Main Deck Karma's trigger names, as with OGN-200. |
| `RAD-033` Command: Attack | fits | Look at the top 5 cards of your Main Deck. You may reveal a gear from among them and draw it. Recycle the rest. | Second mode recycles the unchosen Main Deck cards to your own Main Deck, which fires Karma (417.1.a); first mode does not, but the mode is chosen at play. |
| `RAD-025` Consult the Heavens | fits | [Predict]. (Look at the top card of your Main Deck. You may recycle it.) | Matches only through the Predict reminder, but 437.1 defines Predict as look and choose whether to Recycle, so it is a real optional Main Deck recycle; same as the [Vision] cards (817.1.b) already in the list unexcluded. |
| `RAD-018` Drakehound Packmaster | excluded | Recycle the rest. | "reveal the top card of each opponent's Main Deck ... Recycle the rest" recycles the opponents' own reveals to their own decks (417.1.c in the 2026-10-09 rules), never Karma's controller's, as with OGN-025. |
| `RAD-081` Elnuk Herd | fits | When you play me, give a friendly unit +3 :rb_might: this turn, then recycle me if I was played from face down. | Recycles itself to its owner's Main Deck when played from face down, a real recycle to your Main Deck that fires Karma; the condition is reachable because Elnuk carries [Hidden]. |
| `RAD-152` Encore | fits | Look at the top 2 cards of your Main Deck, draw 1 and recycle the other. | Mode 4 recycles one card to your own Main Deck; Choose two lets you take it. |
| `RAD-111` Mechanical Bandit | fits | At the start of your Beginning Phase, each player reveals the top card of their Main Deck. If you revealed a card with the lowest Energy cost, draw it. Recycle the rest. | When your revealed card is not the lowest it is part of 'the rest' and is recycled to your own Main Deck (417.1.c) and fires Karma; when it is the lowest only the opponent's card recycles (to their deck), so it fires on one branch only, but that branch is reachable. |
| `RAD-050` Mysterious Chronomancer | fits | When you play me, [Predict 2]. (Look at the top 2 cards of your Main Deck. Recycle any of them and put the rest back in any order.) | Predict 2 recycles any of the top 2 cards to your own Main Deck (437.1.a); keyword reminder is the real mechanic, same as [Vision]. |
| `RAD-165` Rakelstake | fits | For each player, the first time they play a unit or gear here each turn, they [Predict]. (They look at the top card of their Main Deck. They may recycle it.) | Each player, including Karma's controller, Predicts when first playing a unit or gear at the battlefield, an optional recycle to their own Main Deck; the text says 'they', not 'you', so 190.6.d does not blank it on an uncontrolled battlefield. |
| `RAD-074` Raving Witness | fits | If it's [Mighty], draw it. Otherwise, recycle it. | The Otherwise branch recycles your revealed top card to your own Main Deck; reachable whenever it is not Mighty. |
| `RAD-064` Scrutinizing Scope | fits | If it has that type, recycle it. Otherwise, draw it. | Recycles your own revealed top card when the opponent guesses its type, a real Main Deck recycle. |
| `RAD-053` Strigian Oracle | fits | When I become exhausted, [Predict]. (Look at the top card of your Main Deck. You may recycle it.) | Predict on exhaust gives an optional recycle to your Main Deck each time (437.1); same keyword-reminder precedent as [Vision]. |
| `RAD-060` The Empyrean | fits | When you play me, if you showed off a card, [Predict] equal to its Power cost, then draw 2. (Look at that many cards from your Main Deck. Recycle any of them and put the rest back in any order.) | Predicts X cards and recycles any of them to your own Main Deck (437.1.a); needs a showed-off card with Power cost 1 or more, which is reachable. |
| `RAD-129` Trifarian Captain | fits | When you play me, look at the top 4 cards of your Main Deck. You may reveal from among them a unit or gear with Energy cost no more than :rb_energy_3: and with Power cost no more than :rb_rune_rainbow: and draw it. Recycle the rest. | The unchosen cards of your own top 4 are recycled to your own Main Deck, firing Karma. |

### `back-alley-bar-any-mover`

Anchor `OGN-277` Back-Alley Bar. Matched 46 -> 55 (+9, -0); 1 excluded; stamp 46 -> 54.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-113` Angler Wyrm | fits | :rb_exhaust:: Choose an opponent. They must move a unit they control to my battlefield. | Enemy-mover: the opponent moves one of its units to the Wyrm's battlefield (not open, the Wyrm is there), and a unit moved off the Bar gets +1 Might. Anti-synergy (hands THEM the buff) but the why explicitly keeps enemy-movers; the opponent picks the unit. |
| `RAD-084` Cataclysm | fits | Move a friendly unit to an occupied enemy battlefield. | Moves a friendly unit to an OCCUPIED enemy battlefield, so the +1 Might from the Bar lands in a real combat; not the open-battlefield shape. |
| `RAD-102` Demon Shade | excluded | • Move it to an open battlefield. | "Move it to an open battlefield" is its only move, so the buff lands on a body with no fight in front of it (170.11.c), the same reason as Bard, Mercurial (SFD-079). |
| `RAD-155` Exemplar of Demacia | fits | When you play a gear with [Deploy], you may exhaust me and pay :rb_rune_rainbow: to move a friendly unit to that battlefield. | Moves a friendly unit to the battlefield where a Deploy gear was just played; 830.1.b.1 lets Deploy gear go to enemy-occupied battlefields, so the destination need not be open and the +1 Might can matter. |
| `RAD-044` Hunting Blind | fits | When you play this, you may move an enemy unit to this battlefield. | Enemy-mover: moves an enemy unit to this battlefield, which hands THEM the Bar's +1 if it comes off the Bar; the why keeps enemy-movers as an anti-synergy worth remembering. Destination is a Deploy gear's battlefield, not necessarily open. |
| `RAD-133` Jarvan IV, Royal Heir | fits | When I attack, you may move a unit you control to my battlefield. | On attack, moves a friendly unit to the attacked (enemy-occupied) battlefield, so the +1 Might from the Bar is spent in the very combat. |
| `RAD-096` Satchel Charge | fits | Move a friendly unit, then play a Bomb gear token to a battlefield. | Moves a friendly unit with no destination restriction (the Bomb token is placed separately), so a unit moved off the Bar gets +1 Might. |
| `RAD-098` Siren's Song | fits | Move an enemy unit that moved this turn. | Enemy-mover (a unit that moved this turn, which can be one standing on the Bar): anti-synergy handing THEM +1 Might, kept by the why's enemy-mover reading. |
| `RAD-031` Stoic Ferryman | fits | When you play me to a battlefield, you may move another unit you control here to your base. | Moves another friendly unit from the battlefield it was played to, to the base. A move to base is already a member shape (Fight or Flight, The Syren, Maddened Marauder, and the title says 'nowhere useful'); the only exclude is the open-battlefield one, so this stays. |

### `lillia-protector-token-unit-tank`

Anchor `UNL-058` Lillia, Protector of Dreams. Matched 48 -> 59 (+11, -0); 1 excluded; stamp 48 -> 58.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | Plays a token unit under its own controller's control, which triggers Lillia's +1 Might and gives the token Tank. |
| `RAD-159` Black Rose Sanctum | fits | For each player, the first time each turn a non-token unit they control dies here, they play a 1 :rb_might: Recruit unit token to their base. | Each player plays their OWN Recruit when their own non-token unit dies there, so Lillia's controller does play a token unit (unlike the excluded UNL-130 Walking Roost, where the opponent plays it); only once per turn per player. |
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Plays a token unit under its own controller's control, which triggers Lillia's +1 Might and gives the token Tank. |
| `RAD-152` Encore | fits | • Play two 1 :rb_might: Recruit unit tokens. | Plays a token unit under its own controller's control, which triggers Lillia's +1 Might and gives the token Tank. |
| `RAD-132` Heimerdinger, Academy Instructor | excluded | If you would play a unit token to a location while I'm at a battlefield, you may play a 3 :rb_might: Mech unit token to that same location instead. | "If you would play a unit token ..., you may play a 3 Might Mech unit token ... instead" replaces a token another card was already making and plays none of its own, so the anchor gains no body (the RAD-132 exclude on grand-plaza-unit-tokens). |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. | Plays a token unit under its own controller's control, which triggers Lillia's +1 Might and gives the token Tank. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | Plays a token unit under its own controller's control, which triggers Lillia's +1 Might and gives the token Tank. |
| `RAD-007` Rally for War | fits | Play three 1 :rb_might: Recruit unit tokens there. | Plays a token unit under its own controller's control, which triggers Lillia's +1 Might and gives the token Tank. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. | Plays a token unit under its own controller's control, which triggers Lillia's +1 Might and gives the token Tank. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Plays a token unit under its own controller's control, which triggers Lillia's +1 Might and gives the token Tank. |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly gear, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token. | Plays a token unit under its own controller's control, which triggers Lillia's +1 Might and gives the token Tank. |

### `viktor-leader-friendly-kill`

Anchor `OGN-246` Viktor, Leader. Matched 14 -> 20 (+6, -0); 1 excluded; stamp 14 -> 19.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | fits | Reduce the cost of the next unit you play this turn by :rb_energy_2::rb_rune_rainbow: and give it "Kill me at end of turn." | Quoted grant, but it is the legend's own effect and it really kills a friendly non-Recruit unit (the one you just played) at end of turn, which is the Active Kill Viktor wants. |
| `RAD-017` Detonation Amplifier | fits | When you play this, you may kill another friendly unit or gear to draw 1. | Optional active kill of a friendly unit (you pick which, so a non-Recruit). |
| `RAD-125` Dune Devourer | fits | You may kill a friendly unit as an additional cost to play me. | Optional additional-cost kill of a friendly unit, same as Atakhan. |
| `RAD-142` Hexplosive Minefield | excluded | Kill any number of friendly Bomb tokens. | "Kill any number of friendly Bomb tokens" kills gear: 187.12 makes a Bomb "a domainless gear token", so no friendly unit dies. |
| `RAD-020` Mordekaiser, Twice Slain | fits | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | Kills a friendly unit of your choice each turn as the price of saving himself. |
| `RAD-014` Shimmering Swimmer | fits | You may kill a friendly unit or gear as an additional cost to play me. | Optional additional-cost kill of a friendly unit, same as Atakhan. |

### `wraith-of-echoes-friendly-kill`

Anchor `OGN-118` Wraith of Echoes. Matched 14 -> 20 (+6, -0); 1 excluded; stamp 14 -> 19.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | fits | Disempower me, :rb_exhaust:: Reduce the cost of the next unit you play this turn by :rb_energy_2::rb_rune_rainbow: and give it "Kill me at end of turn." | Gives the next unit you play 'Kill me at end of turn', a real kill of a friendly unit (a delayed one that needs a unit played after the Disempower); it draws a card unless another unit died first. |
| `RAD-017` Detonation Amplifier | fits | When you play this, you may kill another friendly unit or gear to draw 1. | 'You may kill another friendly unit or gear to draw 1' on play; the unit option is a friendly kill and Wraith adds a second card (first death each turn). |
| `RAD-125` Dune Devourer | fits | You may kill a friendly unit as an additional cost to play me. If you do, I cost :rb_energy_2: less. | 'You may kill a friendly unit as an additional cost to play me' is a friendly kill at will. |
| `RAD-142` Hexplosive Minefield | excluded | Kill any number of friendly Bomb tokens. At end of turn, play that many Bomb tokens to a single battlefield. | "Kill any number of friendly Bomb tokens" kills gear: 187.12 makes a Bomb "a domainless gear token", so no friendly unit dies. |
| `RAD-020` Mordekaiser, Twice Slain | fits | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | Marginal fit: 'if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me' kills ANOTHER friendly unit each turn (it, not Mordekaiser, dies), so Wraith draws once. |
| `RAD-014` Shimmering Swimmer | fits | You may kill a friendly unit or gear as an additional cost to play me. | 'You may kill a friendly unit or gear as an additional cost to play me' is a friendly kill at will (unit option). |

### `vanguard-helm-friendly-kill`

Anchor `OGN-228` Vanguard Helm. Matched 14 -> 20 (+6, -0); 1 excluded; stamp 14 -> 19.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | fits | Disempower me, :rb_exhaust:: Reduce the cost of the next unit you play this turn by :rb_energy_2::rb_rune_rainbow: and give it "Kill me at end of turn." | The match is a quote granted to the NEXT unit ('Kill me at end of turn'), which looks like the nested-quote shape, but the result is a guaranteed end-of-turn kill of a friendly unit you control, which is exactly what the Helm reads (the Shard of Undoing rule likewise accepts grants of a scheduled friendly death). The recipient needs a buff from elsewhere like every member. |
| `RAD-017` Detonation Amplifier | fits | When you play this, you may kill another friendly unit or gear to draw 1. | Optional kill of another friendly unit or gear to draw 1; the unit option is a real friendly kill (the 'friendly gear' textExcludes does not trip because the phrase reads 'friendly unit or gear'). |
| `RAD-125` Dune Devourer | fits | You may kill a friendly unit as an additional cost to play me. If you do, I cost :rb_energy_2: less. | Optional additional-cost kill of a friendly unit (same shape as Atakhan and Commander Ledros). |
| `RAD-142` Hexplosive Minefield | excluded | Kill any number of friendly Bomb tokens. At end of turn, play that many Bomb tokens to a single battlefield. | "Kill any number of friendly Bomb tokens" kills gear: 187.12 makes a Bomb "a domainless gear token", so no friendly unit dies and the Helm never triggers. |
| `RAD-020` Mordekaiser, Twice Slain | fits | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | 'You may kill a friendly unit' (a real friendly kill, possibly a buffed one) to save itself from dying. The cost is another unit, same as the pay-a-permanent replacements already in the sibling rules; the condition (this unit would die) is meetable. |
| `RAD-014` Shimmering Swimmer | fits | You may kill a friendly unit or gear as an additional cost to play me. | Optional additional-cost kill of a friendly unit or gear; the unit option is a real friendly kill. |

### `altar-of-memories-friendly-kill`

Anchor `SFD-169` Altar of Memories. Matched 14 -> 20 (+6, -0); 1 excluded; stamp 14 -> 19.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | fits | Reduce the cost of the next unit you play this turn by :rb_energy_2::rb_rune_rainbow: and give it "Kill me at end of turn." | The match sits inside a quote granted to the next unit you play, but the grantee is always your own unit and the clause is a kill, so a friendly unit does die at end of turn and Altar pays; unlike the Zed / Relentless Pursuit nested quotes, the quoted effect is the thing the pairing needs. |
| `RAD-017` Detonation Amplifier | fits | When you play this, you may kill another friendly unit or gear to draw 1. | Optional kill of another friendly unit on play (a unit is a legal pick, so "friendly gear" in textExcludes does not apply); a one-shot outlet like the other listed play-time kill costs. |
| `RAD-125` Dune Devourer | fits | You may kill a friendly unit as an additional cost to play me. | Optional additional-cost kill of a friendly unit, same family as listed OGN-231 Commander Ledros and UNL-170 Atakhan. |
| `RAD-142` Hexplosive Minefield | excluded | Kill any number of friendly Bomb tokens. | "Kill any number of friendly Bomb tokens" kills gear: 187.12 makes a Bomb "a domainless gear token", so no friendly unit dies. |
| `RAD-020` Mordekaiser, Twice Slain | fits | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | A real friendly-unit kill as the cost of his replacement, so a friendly unit dies and Altar pays; it is reactive (only when he would die) rather than on demand, like listed SFD-128 Overzealous Fan. |
| `RAD-014` Shimmering Swimmer | fits | You may kill a friendly unit or gear as an additional cost to play me. | Optional additional-cost kill that may be a unit; same family as Dune Devourer / Atakhan. |

### `spectral-centaur-friendly-kill`

Anchor `UNL-068` Spectral Centaur. Matched 14 -> 20 (+6, -0); 2 excluded; stamp 14 -> 18.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | excluded | Disempower me, :rb_exhaust:: Reduce the cost of the next unit you play this turn by :rb_energy_2::rb_rune_rainbow: and give it "Kill me at end of turn." | The kill it grants is "Kill me at end of turn", so the death lands at the end of the turn, when the Centaur's "+2 Might this turn" has nothing left to do. |
| `RAD-017` Detonation Amplifier | fits | When you play this, you may kill another friendly unit or gear to draw 1. | May kill another friendly unit or gear on play to draw 1; choosing a unit is an active friendly kill (like OGN-113 Malzahar's 'unit or gear'). |
| `RAD-125` Dune Devourer | fits | You may kill a friendly unit as an additional cost to play me. | Kills a friendly unit as an additional cost to play it, like OGN-208 Cruel Patron. |
| `RAD-142` Hexplosive Minefield | excluded | Kill any number of friendly Bomb tokens. | "Kill any number of friendly Bomb tokens" kills gear: 187.12 makes a Bomb "a domainless gear token", so no friendly unit dies. |
| `RAD-020` Mordekaiser, Twice Slain | fits | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | Replacement ability: 'you may kill a friendly unit to heal me, exhaust me, and recall me instead' is an active friendly-unit kill, once each turn. |
| `RAD-014` Shimmering Swimmer | fits | You may kill a friendly unit or gear as an additional cost to play me. | May kill a friendly unit or gear as an additional cost to play it; choosing a unit is an active friendly kill. |

### `shard-of-undoing-temporary-death`

Anchor `UNL-174` Shard of Undoing. Matched 14 -> 15 (+1, -0); 0 excluded; stamp 14 -> 15.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-095` Momentary Companion | fits | When you play me, if it's not your turn, give me [Temporary]. | Gives itself [Temporary] when played on the opponent's turn (from face down), so it is killed at the start of its controller's Beginning Phase before scoring, which is the Shard's window (315.1 and 816.1.b); the condition is meetable through [Hidden]. |

### `jinx-rebel-discard-family`

Anchor `OGN-202` Jinx, Rebel. Matched 24 -> 29 (+5, -0); 0 excluded; stamp 24 -> 29.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-153` Agony's Embrace | fits | Then, if it's not your turn, discard 1. | Causes a discard of your own, only off-turn; Jinx readies and grows on the opponent's turn, which is when a ready matters most. The condition is on the turn, not on Jinx, so it is met. |
| `RAD-021` Ekko, Revolutionary | fits | [Action][>] Discard 1, :rb_energy_1::rb_rune_fury:: Banish me, then play me to your base, ignoring my cost. | A discard paid as a cost is still a discard event (the rule's own Square Up note, 820.1.c.1). |
| `RAD-137` Mordekaiser, Dominating | fits | When you play me or when I attack, you may discard 1 to kill a unit or gear. | Repeatable optional discard on play and on attack. |
| `RAD-166` Ruined Monastery | fits | When you conquer here, you may discard 1 and channel 1 rune exhausted. | Optional discard on a conquer; the discard is the event Jinx watches. |
| `RAD-106` The Good Stuff | fits | When you play this, discard 1, then draw 3. | Mandatory discard on play, a plain discard event. |

### `mask-mother-choice-discard-buff`

Anchor `VEN-094` Mask Mother. Matched 24 -> 29 (+5, -0); 0 excluded; stamp 24 -> 29.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-153` Agony's Embrace | fits | Once each turn, when you play a card from face down, draw 1. Then, if it's not your turn, discard 1. | You choose the discard; the off-turn condition is met whenever a Hidden card is played on the opponent's turn. |
| `RAD-021` Ekko, Revolutionary | fits | [Action][>] Discard 1, :rb_energy_1::rb_rune_fury:: Banish me, then play me to your base, ignoring my cost. | Discard 1 as an activation cost, chosen by you, so Mask Mother can be the discarded card. |
| `RAD-137` Mordekaiser, Dominating | fits | When you play me or when I attack, you may discard 1 to kill a unit or gear. | You choose the card to discard. |
| `RAD-166` Ruined Monastery | fits | When you conquer here, you may discard 1 and channel 1 rune exhausted. | You choose the card to discard; conquering there establishes control, so 'you' is not blanked. |
| `RAD-106` The Good Stuff | fits | When you play this, discard 1, then draw 3. | You choose the card to discard. |

### `vex-mocking-stun-relocate`

Anchor `UNL-055` Vex, Mocking. Matched 21 -> 25 (+4, -0); 0 excluded; stamp 21 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-028` Ki Burst | fits | [Stun] a unit. | Actively stuns a unit (can be an enemy at a battlefield); the extra cost (exhaust a friendly unit) does not change that it causes the stun. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. | Actively stuns an enemy unit (plus a buff on a friendly one). |
| `RAD-104` Pitiless Stalker | fits | :rb_exhaust:: [Stun] an enemy unit. | Repeatable exhaust ability that stuns an enemy unit; a real stun source. |
| `RAD-043` Riven, Broken Blade | fits | • Spend my buff to [Stun] an enemy unit. | Mode 2 stuns an enemy unit (spending her buff); modal and conditional on a buff but it is a real stun she causes. |

### `eclipse-herald-stun-ready`

Anchor `OGN-059` Eclipse Herald. Matched 21 -> 25 (+4, -0); 0 excluded; stamp 21 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-028` Ki Burst | fits | [Stun] a unit. (It doesn't deal combat damage this turn.) | Spell that stuns a unit it chooses, so aimed at an enemy it fires Eclipse Herald's 'when you stun an enemy unit'; its exhaust-a-friendly additional cost can even be paid with a unit the Herald then readies. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. | Stuns an enemy unit outright, the exact event the Herald's trigger reads. |
| `RAD-104` Pitiless Stalker | fits | [Stun] an enemy unit. | Repeatable exhaust ability that stuns an enemy unit: a plain stun source. |
| `RAD-043` Riven, Broken Blade | fits | Spend my buff to [Stun] an enemy unit. | One of three modes, but a real stun on an enemy unit when chosen (once per turn, needs a buff to spend); it is a causer, not a watcher. |

### `solari-shrine-stun-kill-draw`

Anchor `OGN-072` Solari Shrine. Matched 21 -> 25 (+4, -0); 0 excluded; stamp 21 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-028` Ki Burst | fits | [Stun] a unit. | '[Stun] a unit' (choose an enemy) is a stun source, at an additional cost of exhausting a friendly unit. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. | Buffs a friendly unit and stuns an enemy unit. |
| `RAD-104` Pitiless Stalker | fits | :rb_exhaust:: [Stun] an enemy unit. | 'Exhaust: [Stun] an enemy unit' is a repeatable stun source. |
| `RAD-043` Riven, Broken Blade | fits | • Spend my buff to [Stun] an enemy unit. | The second mode spends the buff to stun an enemy unit (needs a buff first). |

### `katarina-reckless-hidden-package`

Anchor `UNL-023` Katarina, Reckless. Matched 39 -> 45 (+6, -0); 0 excluded; stamp 39 -> 45.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-107` Bedeviling Stranger | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself, so hiding it readies Katarina and playing it from face down deals 2. |
| `RAD-102` Demon Shade | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself, so hiding it readies Katarina and playing it from face down deals 2. |
| `RAD-081` Elnuk Herd | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself, so hiding it readies Katarina and playing it from face down deals 2. |
| `RAD-103` Gutter Guardian | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself, so hiding it readies Katarina and playing it from face down deals 2. |
| `RAD-095` Momentary Companion | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself, so hiding it readies Katarina and playing it from face down deals 2. |
| `RAD-100` The Waters' Wage | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries [Hidden] itself, so hiding it readies Katarina and playing it from face down deals 2. |

### `ember-monk-hidden-play-might`

Anchor `OGN-167` Ember Monk. Matched 39 -> 45 (+6, -0); 0 excluded; stamp 39 -> 45.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-107` Bedeviling Stranger | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries the real [Hidden] keyword, so playing it from face down opens the chain Ember Monk watches (811.1.c.3). |
| `RAD-102` Demon Shade | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries the real [Hidden] keyword, so playing it from face down opens the chain Ember Monk watches (811.1.c.3). |
| `RAD-081` Elnuk Herd | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries the real [Hidden] keyword, so playing it from face down opens the chain Ember Monk watches (811.1.c.3). |
| `RAD-103` Gutter Guardian | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries the real [Hidden] keyword, so playing it from face down opens the chain Ember Monk watches (811.1.c.3). |
| `RAD-095` Momentary Companion | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries the real [Hidden] keyword, so playing it from face down opens the chain Ember Monk watches (811.1.c.3). Its [Temporary] on an off-turn play is its own drawback, not a doubled one for the Monk. |
| `RAD-100` The Waters' Wage | fits | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) | Carries the real [Hidden] keyword, so playing it from face down opens the chain Ember Monk watches (811.1.c.3). |

### `spirit-wheel-choose-friendly-draw`

Anchor `SFD-144` Spirit Wheel. Matched 16 -> 18 (+2, -0); 0 excluded; stamp 16 -> 18.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-102` Demon Shade | fits | Choose a friendly unit, then choose one — | 'Choose a friendly unit, then choose one' chooses a friendly unit outright. |
| `RAD-118` Herald of the Emperor | fits | When you play me, choose a friendly unit. Its base Might becomes 5 this turn. | On play, 'choose a friendly unit' (the rule's list already holds non-spell cards of this wording, e.g. Unlicensed Armory). |

### `soul-reflection-empower-relay`

Anchor `VEN-151` Soul's Reflection. Matched 38 -> 39 (+1, -0); 1 excluded; stamp 38 -> 38.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | excluded | [Empower] — :rb_energy_1:, :rb_exhaust: (Use only if not Empowered.) | a legend: 103.2 gives a deck one Champion Legend, which here is Soul's Reflection, and the only way a second legend reaches the Legend Zone (107.4.d.1) is Neeko, Blending In (RAD-167), which the pool leaves out (#695). Its Fury/Mind domains are outside her Mind/Chaos identity as well. |

### `matriarch-of-war-empower-relay`

Anchor `VEN-153` Matriarch of War. Matched 38 -> 39 (+1, -0); 1 excluded; stamp 38 -> 38.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | excluded | [Empower] — :rb_energy_1:, :rb_exhaust: (Use only if not Empowered.) | a legend: 103.2 gives a deck one Champion Legend, which here is Matriarch of War, and the only way a second legend reaches the Legend Zone (107.4.d.1) is Neeko, Blending In (RAD-167), which the pool leaves out (#695). Its Fury/Mind domains are outside her Body/Order identity as well. |

### `rippers-bay-bounce-channel`

Anchor `UNL-214` Ripper's Bay. Matched 13 -> 22 (+9, -0); 5 excluded; stamp 13 -> 17.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-130` Battlefield Armorer | excluded | When a friendly gear at a battlefield dies, you may pay :rb_energy_1: to return it to its owner's hand. | "return it to its owner's hand" returns a friendly GEAR that died, never a unit, so Ripper's Bay's "a unit here" never sees it, as with SFD-044. |
| `RAD-107` Bedeviling Stranger | fits | If there are 4 or more units there, you may return an enemy unit there to its owner's hand. | Returns a unit at a chosen battlefield (the Bay can be chosen) and the owner channels, matching the rule's 'friendly or enemy'; needs 4 or more units there, which is reachable. |
| `RAD-156` Demacian Standard | excluded | When you hold here, you may return this to its owner's hand. | "you may return this to its owner's hand" returns this gear itself, never a unit, so Ripper's Bay's "a unit here" never sees it. |
| `RAD-061` Ekko, Ingenious | fits | As an additional cost to play me, return a friendly unit to its owner's hand. | Cost returns a friendly unit, which can stand at the Bay; unlike SFD-044 (gear) it moves a unit. |
| `RAD-051` Parallel Convergence | fits | As an additional cost to play this, return a friendly unit to its owner's hand. | Additional cost returns a friendly unit, which can be the one standing at the Bay. |
| `RAD-075` Skystrike Squadron | excluded | You may return a friendly gear to its owner's hand as an additional cost to play me. | "return a friendly gear to its owner's hand" as an additional cost moves gear, never a unit, so Ripper's Bay's "a unit here" never sees it, as with SFD-044. |
| `RAD-066` Spirit of the Forge | excluded | You may return a friendly gear to its owner's hand as an additional cost to play me. | "return a friendly gear to its owner's hand" as an additional cost moves gear, never a unit, so Ripper's Bay's "a unit here" never sees it, as with SFD-044. |
| `RAD-106` The Good Stuff | excluded | When you hold here, return this to its owner's hand. | "return this to its owner's hand" returns this gear itself, never a unit, so Ripper's Bay's "a unit here" never sees it. |
| `RAD-115` Transpositionist | fits | Return a friendly unit to its owner's hand. | Repeatable exhaust ability returning a friendly unit, which can be at the Bay; a direct Retreat-like partner. |

### `pirates-haven-any-friendly-ready`

Anchor `OGN-143` Pirate's Haven. Matched 30 -> 38 (+8, -0); 0 excluded; stamp 30 -> 38.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-090` Evelynn, Consuming | fits | When you play a card from face down, ready me and give me +1 :rb_might: this turn. | A unit that readies itself on a trigger fires 'when you ready a friendly unit' like Darius; the condition is playing a card from face down, not a ready restriction. |
| `RAD-010` Forbidden Technique | fits | Ready a unit. | 'Ready a unit' is an external ready source that can target a friendly unit. |
| `RAD-034` Hunker Down | fits | Ready a friendly unit. | Readies a friendly unit at Reaction speed. |
| `RAD-087` Portable Portal | fits | When you play this, you may pay :rb_rune_body: to ready a unit here. | May pay a Body rune to ready a unit here (a friendly one). |
| `RAD-134` Raucous Anthem | fits | Ready your units and give them +3 :rb_might: this turn. | Mass ready of your units: one Pirate's Haven trigger per unit readied. |
| `RAD-043` Riven, Broken Blade | fits | • Spend my buff to ready me. | 'Spend my buff to ready me' is a self-ready of a unit (needs a buff from the first mode). |
| `RAD-114` Riven, Deserter | fits | Exhaust a friendly unit: Ready a unit. | 'Ready a unit' once each turn for the cost of exhausting a friendly unit. |
| `RAD-030` Sanctum Conservator | fits | When you play a card with Energy cost :rb_energy_7: or more, ready me. | Readies itself (a unit) when you play a 7+ Energy card: a self-ready, like Darius. |

### `jayce-hammer-second-ready`

Anchor `VEN-088` Jayce, Hammer in Hand. Matched 15 -> 20 (+5, -0); 0 excluded; stamp 15 -> 20.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-010` Forbidden Technique | fits | Ready a unit. | 'Ready a unit.' targets any unit, Jayce included. |
| `RAD-034` Hunker Down | fits | Ready a friendly unit. It can't move this turn. Draw 1. | Readies a friendly unit at Reaction speed; 'can't move this turn' removes Ganking as a useful pick but Deflect 2 (and Assault 2 in an ongoing combat) remain, so he still gets a second choice. |
| `RAD-087` Portable Portal | fits | When you play this, you may pay :rb_rune_body: to ready a unit here. | 'Ready a unit here' works if Jayce is at that battlefield; a location condition the list cannot show, not an impossibility. |
| `RAD-134` Raucous Anthem | fits | Ready your units and give them +3 :rb_might: this turn. | Readies all your units, Jayce included. |
| `RAD-114` Riven, Deserter | fits | Exhaust a friendly unit: Ready a unit. Use this ability only once each turn. | Repeatable once per turn 'Ready a unit' (cost: exhaust a friendly unit, which can be Jayce himself). |

### `fretful-feline-second-ready`

Anchor `VEN-071` Fretful Feline. Matched 15 -> 20 (+5, -0); 0 excluded; stamp 15 -> 20.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-010` Forbidden Technique | fits | Ready a unit. | Plain 'Ready a unit' spell that can target Fretful Feline for a second +2 Might. |
| `RAD-034` Hunker Down | fits | Ready a friendly unit. It can't move this turn. Draw 1. | Reaction 'Ready a friendly unit' targets her for a second +2 Might (it also stops that unit moving this turn and draws a card). |
| `RAD-087` Portable Portal | fits | When you play this, you may pay :rb_rune_body: to ready a unit here. | 'Pay a Body rune to ready a unit here' on play, usable once on Feline when she stands at that battlefield. |
| `RAD-134` Raucous Anthem | fits | Ready your units and give them +3 :rb_might: this turn. | Readies all your units, so Feline becomes ready a second time and takes +2 plus the spell's +3. |
| `RAD-114` Riven, Deserter | fits | Exhaust a friendly unit: Ready a unit. Use this ability only once each turn. | 'Exhaust a friendly unit: Ready a unit' (once each turn) is a repeatable ready that can target Feline after she has been exhausted. |

### `mistfall-buff-ready`

Anchor `OGN-152` Mistfall. Matched 35 -> 41 (+6, -0); 0 excluded; stamp 35 -> 41.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-131` Demacian Illuminators | fits | When one or more friendly units die, [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have one.) | Buffs a friendly unit, which fires Mistfall's 'When you buff a friendly unit' ready trigger. |
| `RAD-027` Iridescent Avian | fits | :rb_exhaust:: [Buff] a unit. If it's already buffed, give it +2 :rb_might: this turn instead. (To buff a unit, give it a +1 :rb_might: buff if it doesn't have one.) | Buffs a friendly unit, which fires Mistfall's 'When you buff a friendly unit' ready trigger. |
| `RAD-154` Last Caress | fits | The next unit you play this turn, even from face down, can be played to any battlefield. When you play it, [Buff] it. (Give it a +1 :rb_might: buff if it doesn't have one.) | Buffs the unit you just played, a friendly unit, so Mistfall fires. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. (Give the friendly unit a +1 :rb_might: buff if it doesn't have one. The enemy unit doesn't deal combat damage this turn.) | Buffs a friendly unit, which fires Mistfall's 'When you buff a friendly unit' ready trigger. |
| `RAD-073` Pillaged Armory | fits | When you play this or when you conquer here, [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have one.) | Buffs a friendly unit, which fires Mistfall's 'When you buff a friendly unit' ready trigger. |
| `RAD-043` Riven, Broken Blade | fits | • [Buff] me. (Give me a +1 :rb_might: buff if I don't have one.) | '[Buff] me' buffs a friendly unit, which fires Mistfall; self-buffers are valid on this rule (unlike the Irelia rule) because Mistfall watches any friendly buff. |

### `simian-ancestor-buff-ready`

Anchor `SFD-047` Simian Ancestor. Matched 35 -> 41 (+6, -0); 1 excluded; stamp 35 -> 40.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-131` Demacian Illuminators | fits | When one or more friendly units die, [Buff] a friendly unit. | Chooses a friendly unit to buff, so it can buff Simian Ancestor and ready him. |
| `RAD-027` Iridescent Avian | fits | [Buff] a unit. If it's already buffed, give it +2 :rb_might: this turn instead. | Repeatable exhaust ability that buffs a chosen unit; a buffless Simian gets the buff and readies. |
| `RAD-154` Last Caress | fits | When you play it, [Buff] it. (Give it a +1 :rb_might: buff if it doesn't have one.) | If Simian is the next unit played, he enters and is buffed, firing 'When you buff me, ready me'; no choice is needed on this rule (unlike Jae). |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. | Buffs a chosen friendly unit, so it can buff Simian. |
| `RAD-073` Pillaged Armory | fits | When you play this or when you conquer here, [Buff] a friendly unit. | Buffs a chosen friendly unit on play and on each conquer there. |
| `RAD-043` Riven, Broken Blade | excluded | [Buff] me. | "[Buff] me" is Riven's only buff, so it only ever buffs herself and never Simian Ancestor. |

### `prize-of-progress-gear-activation`

Anchor `SFD-075` Prize of Progress. Matched 39 -> 45 (+6, -0); 1 excluded; stamp 39 -> 44.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-035` Invigorating Bloom | fits | Exhaust a friendly [Mighty] unit, :rb_exhaust:: Draw 1. (A unit is Mighty while it has 5+ :rb_might:.) | Has its own activated ability ('Exhaust a friendly [Mighty] unit, exhaust: Draw 1'), so each use gives Prize of Progress +1 Might. |
| `RAD-052` Resource Extractor | excluded | At the end of your turn, if you control this battlefield, play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | No activated ability of its own: the only :rb_exhaust: is in the quoted reminder of the Gold gear token it plays, and the rule's list is gear that carry their own exhaust cost. |
| `RAD-046` Resplendent Rostrum | fits | :rb_exhaust:: Draw 1 and channel 1 rune exhausted. | Activated ability ':rb_exhaust:: Draw 1 and channel 1 rune exhausted' is repeatable each turn and pays Prize of Progress +1 Might. |
| `RAD-012` Runeblade Anvil | fits | :rb_energy_2::rb_rune_chaos:, :rb_exhaust:: Kill this. | Has an activated ability (':rb_energy_2::rb_rune_chaos:, :rb_exhaust:: Kill this'); the +1 Might rides on the activation resolving (377.2.a), and OGN-186 Treasure Trove, the same 'rune, exhaust: Kill this' shape, is already in this list. |
| `RAD-064` Scrutinizing Scope | fits | :rb_energy_1:, :rb_exhaust:: Choose an opponent. They guess a card type. Reveal the top card of your Main Deck. If it has that type, recycle it. Otherwise, draw it. (Unit, gear, and spell are types.) | Activated ability '1, exhaust: ... Reveal the top card' triggers Prize of Progress on resolution. |
| `RAD-022` Whirling Twirligig | fits | :rb_exhaust:: Play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Carries three activated abilities with exhaust costs, so one turn can pay Prize of Progress repeatedly through it. |

### `vicious-snapjaws-friendly-kill`

Anchor `UNL-129` Vicious Snapjaws. Matched 14 -> 20 (+6, -0); 1 excluded; stamp 14 -> 19.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | fits | Reduce the cost of the next unit you play this turn by :rb_energy_2::rb_rune_rainbow: and give it "Kill me at end of turn." | Quoted grant, but it is the legend's own effect and it really kills a friendly unit at end of turn, which is another friendly unit dying for Snapjaws. |
| `RAD-017` Detonation Amplifier | fits | When you play this, you may kill another friendly unit or gear to draw 1. | Optional active kill of a friendly unit. |
| `RAD-125` Dune Devourer | fits | You may kill a friendly unit as an additional cost to play me. | Optional additional-cost kill of a friendly unit. |
| `RAD-142` Hexplosive Minefield | excluded | Kill any number of friendly Bomb tokens. | "Kill any number of friendly Bomb tokens" kills gear: 187.12 makes a Bomb "a domainless gear token", so no friendly unit dies. |
| `RAD-020` Mordekaiser, Twice Slain | fits | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | Kills a friendly unit of your choice as a cost, feeding Snapjaws 1 XP. |
| `RAD-014` Shimmering Swimmer | fits | You may kill a friendly unit or gear as an additional cost to play me. | Optional additional-cost kill of a friendly unit. |

### `sprite-queen-conquer-battlefield-cycle`

Anchor `UNL-084` Sprite Queen. Matched 14 -> 18 (+4, -0); 0 excluded; stamp 14 -> 18.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | A Deploy gear (not a battlefield) whose 'when you play this or when you conquer here' trigger pays again on each reconquest of the battlefield where it sits; it dies if an opponent holds there. |
| `RAD-162` Firelights' Hideout | fits | When you conquer here, the next unit you play this turn has [Accelerate]. | Battlefield: on each conquer here the next unit you play gets [Accelerate]. |
| `RAD-073` Pillaged Armory | fits | When you play this or when you conquer here, [Buff] a friendly unit. | A Deploy gear (not a battlefield) whose 'when you play this or when you conquer here' trigger buffs a friendly unit again on each reconquest; it dies if an opponent holds there. |
| `RAD-166` Ruined Monastery | fits | When you conquer here, you may discard 1 and channel 1 rune exhausted. | Battlefield: on each conquer here you may discard 1 and channel 1 rune exhausted. |

### `vanguard-helm-buff-supply`

Anchor `OGN-228` Vanguard Helm. Matched 33 -> 39 (+6, -0); 0 excluded; stamp 33 -> 39.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-131` Demacian Illuminators | fits | When one or more friendly units die, [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have one.) | 'When one or more friendly units die, [Buff] a friendly unit' is a repeatable buff source fed by deaths, which the Helm's own trigger also feeds. |
| `RAD-027` Iridescent Avian | fits | :rb_exhaust:: [Buff] a unit. If it's already buffed, give it +2 :rb_might: this turn instead. (To buff a unit, give it a +1 :rb_might: buff if it doesn't have one.) | 'exhaust: [Buff] a unit' is a repeatable buff source (a +2 this-turn fallback if already buffed). |
| `RAD-154` Last Caress | fits | The next unit you play this turn, even from face down, can be played to any battlefield. When you play it, [Buff] it. (Give it a +1 :rb_might: buff if it doesn't have one.) | Buffs the next unit you play ('When you play it, [Buff] it'): a one-shot buff source. |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. (Give the friendly unit a +1 :rb_might: buff if it doesn't have one. The enemy unit doesn't deal combat damage this turn.) | '[Buff] a friendly unit and [Stun] an enemy unit' is a one-shot buff source. |
| `RAD-073` Pillaged Armory | fits | When you play this or when you conquer here, [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have one.) | 'When you play this or when you conquer here, [Buff] a friendly unit' is a buff source, repeatable on conquers. |
| `RAD-043` Riven, Broken Blade | fits | • [Buff] me. (Give me a +1 :rb_might: buff if I don't have one.) | '[Buff] me' (mode of its become-exhausted trigger) is a buff source; the other modes spend the buff. |

### `monastery-hirana-buff-supply`

Anchor `OGN-282` Monastery of Hirana. Matched 32 -> 38 (+6, -0); 0 excluded; stamp 32 -> 38.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-131` Demacian Illuminators | fits | When one or more friendly units die, [Buff] a friendly unit. | Active buff source: buffs a friendly unit whenever friendly units die. |
| `RAD-027` Iridescent Avian | fits | :rb_exhaust:: [Buff] a unit. If it's already buffed, give it +2 :rb_might: this turn instead. | Active buff source: exhaust to [Buff] a unit (and +2 Might if already buffed). |
| `RAD-154` Last Caress | fits | The next unit you play this turn, even from face down, can be played to any battlefield. When you play it, [Buff] it. | Real buff source: the next unit played this turn is [Buff]ed when played (a delayed trigger of the spell itself, not a quote on another card). |
| `RAD-121` One-Two Punch | fits | [Buff] a friendly unit and [Stun] an enemy unit. | Active buff source: [Buff] a friendly unit. |
| `RAD-073` Pillaged Armory | fits | When you play this or when you conquer here, [Buff] a friendly unit. | Active buff source on play and on conquer here ([Buff] a friendly unit); a Deploy gear at the Monastery's own battlefield would also feed the same conquer. |
| `RAD-043` Riven, Broken Blade | fits | • [Buff] me. | Mode 1 is a real buff source ([Buff] me); modes 2 and 3 spend the buff, but one source mode is enough and she can keep the buff by choosing mode 1 first. |

### `irelia-fervent-choose-cost`

Anchor `SFD-057` Irelia, Fervent. Matched 4 -> 5 (+1, -0); 0 excluded; stamp 4 -> 5.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-161` Durand Memorial | fits | When you defend here, choose a unit you control here. Give it [Tank] this combat. | A mandatory choose-a-unit-you-control effect on your own defense, which can name Irelia and fire her 'When you choose or ready me' (355.7); no opponent is choosing her, so Deflect is not charged (809.1.c). It only works while she is at that battlefield and defending, as the rule's scoping already allows. |

### `blade-dancer-choose-relocate`

Anchor `SFD-195` Blade Dancer. Matched 3 -> 4 (+1, -0); 0 excluded; stamp 3 -> 4.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-161` Durand Memorial | fits | When you defend here, choose a unit you control here. | The defend trigger chooses a unit you control here, which is a 'choose a friendly unit' event for Blade Dancer to ready it. |

### `dragon-roost-dragon-tag`

Anchor `VEN-157` Dragon Roost. Matched 19 -> 22 (+3, -0); 0 excluded; stamp 19 -> 22.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-113` Angler Wyrm | fits | tags: Bilgewater, Dragon | Dragon-tagged unit, which the battlefield lets you play straight to it. |
| `RAD-092` Seraphic Wyvern | fits | tags: Mount Targon, Dragon | Dragon-tagged unit, which the battlefield lets you play straight to it. |
| `RAD-060` The Empyrean | fits | tags: Ionia, Dragon | Dragon-tagged unit, which the battlefield lets you play straight to it. |

### `risen-altar-empower-discount`

Anchor `VEN-163` Risen Altar. Matched 33 -> 34 (+1, -0); 1 excluded; stamp 33 -> 33.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-139` Boy Who Shattered Time | excluded | [Empower] — :rb_energy_1:, :rb_exhaust: (Use only if not Empowered.) | A legend: the Altar discounts "[Empower] costs of your units here", and Boy Who Shattered Time is not a unit. |

### `relentless-storm-ambush-mighty`

Anchor `OGN-249` Relentless Storm. Matched 7 -> 8 (+1, -0); 0 excluded; stamp 7 -> 8.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-090` Evelynn, Consuming | fits | [Ambush] (You may play me as a [Reaction] to a battlefield where you have units.) | Might 5 (cards.json), so it is Mighty on arrival and pays the Storm when played off-turn through [Ambush]; none of the seven Might-under-5 excludes apply. |

### `sandswept-tomb-choose-friendly-spells`

Anchor `VEN-164` Sandswept Tomb. Matched 14 -> 15 (+1, -0); 1 excluded; stamp 14 -> 14.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-102` Demon Shade | excluded | Choose a friendly unit, then choose one — | Demon Shade prints no Power, and 356.4.c.2 and 356.6 keep a discount from taking a cost component below 0, so the Tomb takes nothing off. |

### `frozen-fortress-token-toughness`

Anchor `UNL-212` Frozen Fortress. Matched 6 -> 7 (+1, -0); 0 excluded; stamp 6 -> 7.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-039` Ephemeral Ward | fits | Your units have +2 :rb_might:. | Static +2 on your units lifts a 1-Might body out of the sweep band, as Rage Amplifier does; weaker than the other five only because "When you play a unit, kill this" ends it at your next unit play (it still covers the opponent's sweep and your next Beginning Phase if you play it last). |

### `captain-farron-granted-assault-sums`

Anchor `OGN-015` Captain Farron. Matched 40 -> 47 (+7, -0); 0 excluded; stamp 40 -> 47.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-002` Banner of Conquest | fits | Friendly units here have [Assault]. (+1 :rb_might: while they're attackers.) | 'Friendly units here have [Assault]' is a second granted Assault instance at the same battlefield; 807.2 sums it with Farron's. |
| `RAD-004` Brawl | fits | Give a unit [Assault] this turn equal to its Might. (+1 :rb_might: for each instance of Assault while it's an attacker.) | Grants Assault equal to the unit's Might this turn; a granted instance that sums with Farron's under 807.2. |
| `RAD-021` Ekko, Revolutionary | fits | [Assault] (+1 :rb_might: while I'm an attacker.) | Printed [Assault]; Farron's grant adds a second instance and 807.2 sums them (Assault 2). |
| `RAD-133` Jarvan IV, Royal Heir | fits | [Assault] (+1 :rb_might: while I'm attacking.) | Printed [Assault]; Farron's grant adds a second instance and 807.2 sums them (Assault 2). |
| `RAD-020` Mordekaiser, Twice Slain | fits | [Assault 3] (+3 :rb_might: while I'm an attacker.) | Printed [Assault 3]; Farron's granted instance sums with it to 4 (807.2). |
| `RAD-147` Pride of Nazumah | fits | :rb_energy_1:, :rb_exhaust:: Give a friendly unit "I have [Assault] equal to my [Shield]" this turn. (+1 :rb_might: for each instance of Assault while it's an attacker.) | Grants a friendly unit 'I have [Assault] equal to my [Shield]', a granted instance that sums with Farron's under 807.2; its size depends on the receiver's Shield. |
| `RAD-088` Staunch Survivor | fits | [Assault 2], [Shield 2] (+2 :rb_might: while I'm an attacker or defender.) | Printed [Assault 2]; Farron's granted instance sums with it to 3 (807.2). |

### `taric-protector-granted-shield-sums`

Anchor `OGN-074` Taric, Protector. Matched 26 -> 40 (+14, -0); 1 excluded; stamp 26 -> 39.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-078` Armored Tusker | fits | [Shield 3] (+3 :rb_might: while I'm a defender.) | Printed Shield 3; Taric's granted Shield sums on top (814.2). |
| `RAD-025` Consult the Heavens | fits | Give a unit [Shield 2] this turn. (+2 :rb_might: while it's a defender.) | A second Shield granter, like Block (OGN-057): the granted Shield 2 sums with Taric's grant (814.2) on a unit at his battlefield. |
| `RAD-117` For Demacia! | fits | Choose a battlefield. Give friendly units there [Shield 2] this turn. (+2 :rb_might: while they're defenders.) | Mass Shield granter; sums with Taric's grant on every friendly unit at his battlefield (814.2). |
| `RAD-044` Hunting Blind | fits | Friendly units here have [Shield 2]. (+2 :rb_might: while they're defenders.) | Standing Shield granter at its own battlefield, like Fortified Position and Black Flame Altar; compounds with Taric's grant when both sit at the same battlefield. |
| `RAD-086` K'Sante, Courageous | fits | [Shield 2] (+2 :rb_might: while I'm a defender.) | Printed Shield 2; Taric's grant sums on top (814.2). |
| `RAD-045` K'Sante, Dauntless | fits | [Shield] (+1 :rb_might: while I'm a defender.) | Printed Shield; Taric's grant sums on top, and his own 'double the [Shield]' reads the summed value. |
| `RAD-071` Nazuman Ntofo | fits | [Shield 2] (+2 :rb_might: while I'm a defender.) | Matches through the effect field: an Equipment whose Shield 2 is granted to the attached unit, like Cloth Armor (SFD-064); sums with Taric's grant (814.2). The fragment is in effect, the text is only 'Equip :rb_energy_1:'. |
| `RAD-148` Ntofo Strikes | fits | Give a friendly unit [Shield 2] this turn, then deal damage equal to its [Shield] to an enemy unit. | Shield granter whose damage reads the summed Shield value, so Taric's grant raises it (814.2, 814.3). |
| `RAD-042` Orianna, Exquisite | fits | [Shield] (+1 :rb_might: while I'm a defender.) | Printed Shield; Taric's grant sums on top (814.2). |
| `RAD-147` Pride of Nazumah | excluded | Give a friendly unit "I have [Assault] equal to my [Shield]" this turn. | [Shield] appears only inside the quoted "I have [Assault] equal to my [Shield]" that Pride of Nazumah gives another unit: it prints and grants no Shield of its own, the nested-quote shape. |
| `RAD-083` Stalwart Goatherd | fits | [Shield 2] (+2 :rb_might: while I'm a defender.) | Printed Shield 2; Taric's grant sums on top (814.2). |
| `RAD-088` Staunch Survivor | fits | [Assault 2], [Shield 2] (+2 :rb_might: while I'm an attacker or defender.) | Printed Shield 2 (with Assault 2); Taric's grant sums on top (814.2). |
| `RAD-031` Stoic Ferryman | fits | [Shield 3] (+3 :rb_might: while I'm a defender.) | Printed Shield 3; Taric's grant sums on top (814.2). |
| `RAD-077` Wrath of the Freljord | fits | [Shield 3] (+3 :rb_might: while I'm a defender.) | Printed Shield 3; Taric's grant sums on top (814.2). |

### `unyielding-spirit-unit-damage-family`

Anchor `OGN-145` Unyielding Spirit. Matched 10 -> 11 (+1, -0); 0 excluded; stamp 10 -> 11.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-144` Realm of Death | fits | Give an enemy unit -2 :rb_might: this turn and a friendly unit +2 :rb_might: this turn. They deal damage equal to their Mights to each other. | 'They deal damage equal to their Mights to each other' is unit damage (417.6.b.3), so Unyielding Spirit's fog does not stop it. |

### `gearhead-doubles-might-bonus`

Anchor `SFD-068` Gearhead. Matched 34 -> 36 (+2, -0); 0 excluded; stamp 34 -> 36.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | tag: Equipment | Equipment with a printed Might Bonus of +3 (mightBonus 3 in cards.json), so Gearhead gives +6 while it is attached (137.3). The rule is tag/number based and the card text has no Might-Bonus wording; Calm/Chaos domains are filtered by Domain Identity at runtime. |
| `RAD-123` Protector's Shield | fits | tag: Equipment | Equipment with a printed Might Bonus of +1 (mightBonus 1 in cards.json), doubled to +2 on Gearhead (137.3); the rule is tag/number based. Order-domain, so filtered by Domain Identity under a Mind legend at runtime. |

### `kinkou-temple-tank-wall-doubling`

Anchor `VEN-159` Kinkou Temple. Matched 25 -> 30 (+5, -0); 0 excluded; stamp 25 -> 30.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-078` Armored Tusker | fits | [Tank] (I must be assigned combat damage first.) | Printed [Tank] body. |
| `RAD-133` Jarvan IV, Royal Heir | fits | [Tank] (I must be assigned combat damage first.) | Printed [Tank] body. |
| `RAD-122` Party Crasher | fits | [Tank] (I must be assigned combat damage first.) | Printed [Tank] body. |
| `RAD-123` Protector's Shield | fits | [Tank] (I must be assigned combat damage first.) | The [Tank] sits in its effect line: the attached unit gets Tank. Same as Doran's Shield (SFD-033), already in the list, and the rule reads granted Tank too. |
| `RAD-128` Steadfast Outrider | fits | [Tank] (I must be assigned combat damage first.) | Printed [Tank] body. |

### `eye-of-twilight-tank-on-a-shield-body`

Anchor `VEN-147` Eye of Twilight. Matched 22 -> 30 (+8, -0); 1 excluded; stamp 22 -> 29.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-078` Armored Tusker | excluded | [Shield 3] (+3 :rb_might: while I'm a defender.) | It prints [Tank], and 815.2 makes a second instance redundant, so the legend's grant buys nothing on it. |
| `RAD-086` K'Sante, Courageous | fits | [Shield 2] (+2 :rb_might: while I'm a defender.) | Prints [Shield] on a unit, so the legend's granted Tank is backed by a Might that rises while it defends. |
| `RAD-045` K'Sante, Dauntless | fits | [Shield] (+1 :rb_might: while I'm a defender.) | Prints [Shield] on a unit, so the legend's granted Tank is backed by a Might that rises while it defends. |
| `RAD-042` Orianna, Exquisite | fits | [Shield] (+1 :rb_might: while I'm a defender.) | Prints [Shield] on a unit, so the legend's granted Tank is backed by a Might that rises while it defends. |
| `RAD-083` Stalwart Goatherd | fits | [Shield 2] (+2 :rb_might: while I'm a defender.) | Prints [Shield] on a unit, so the legend's granted Tank is backed by a Might that rises while it defends. |
| `RAD-088` Staunch Survivor | fits | [Assault 2], [Shield 2] (+2 :rb_might: while I'm an attacker or defender.) | Prints [Shield] on a unit, so the legend's granted Tank is backed by a Might that rises while it defends. |
| `RAD-031` Stoic Ferryman | fits | [Shield 3] (+3 :rb_might: while I'm a defender.) | Prints [Shield] on a unit, so the legend's granted Tank is backed by a Might that rises while it defends. |
| `RAD-077` Wrath of the Freljord | fits | [Shield 3] (+3 :rb_might: while I'm a defender.) | Prints [Shield] on a unit, so the legend's granted Tank is backed by a Might that rises while it defends. |

### `counter-strike-protects-while-at-battlefield`

Anchor `SFD-194` Counter Strike. Matched 14 -> 16 (+2, -0); 0 excluded; stamp 14 -> 16.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-132` Heimerdinger, Academy Instructor | fits | If you would play a unit token to a location while I'm at a battlefield, you may play a 3 :rb_might: Mech unit token to that same location instead. | His token replacement applies only while he is at a battlefield, so a damage prevention that keeps him there keeps it switched on. |
| `RAD-068` Orianna, Mechanical Marvel | fits | Once each turn, while I'm at a battlefield, you may pay :rb_energy_1::rb_rune_rainbow: less to play a gear. | Her once-each-turn gear discount works only while she is at a battlefield; prevention keeps her there. |

### `heedless-resurrection-accelerated-return`

Anchor `UNL-142` Heedless Resurrection. Matched 26 -> 31 (+5, -0); 0 excluded; stamp 26 -> 31.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-086` K'Sante, Courageous | fits | [Accelerate] (You may pay :rb_energy_1::rb_rune_body: as an additional cost to have me enter ready.) | Printed [Accelerate] unit: reanimating it, the 1+body-Power Accelerate is a separate optional cost that readies it (356.1.b.3). |
| `RAD-020` Mordekaiser, Twice Slain | fits | [Accelerate] (You may pay :rb_energy_1::rb_rune_fury: as an additional cost to have me enter ready.) | Printed [Accelerate] unit: a reanimated copy can pay 1+fury to enter ready (356.1.b.3). |
| `RAD-105` Reckless Innovator | fits | [Accelerate] (You may pay :rb_energy_1::rb_rune_chaos: as an additional cost to have me enter ready.) | Printed [Accelerate] unit (the match is the keyword line, not the Gold quote): the reanimated body can pay 1+chaos to enter ready. |
| `RAD-058` Riptide Mage | fits | [Accelerate] (You may pay :rb_energy_1::rb_rune_mind: as an additional cost to have me enter ready.) | Printed [Accelerate] unit: a reanimated copy can pay 1+mind to enter ready, and its play trigger still fires. |
| `RAD-008` War Scout | fits | [Accelerate] (You may pay :rb_energy_1::rb_rune_fury: as an additional cost to have me enter ready.) | Printed [Accelerate] unit: a reanimated copy can pay 1+fury to enter ready, and its play trigger still fires. |

### `allay-eager-admirer-granted-deflect-sums`

Anchor `UNL-041` Allay, Eager Admirer. Matched 42 -> 48 (+6, -0); 1 excluded; stamp 42 -> 47.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-113` Angler Wyrm | fits | [Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or ability.) | Prints [Deflect] on a unit body, the same as listed Pouty Poro, Navori Scout and Galio; at Allay's battlefield it takes her granted Deflect on top (809.2 sums). |
| `RAD-125` Dune Devourer | fits | [Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or ability.) | Prints [Deflect] on a unit body; stacks with Allay's grant at her battlefield (809.2). |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. (When I die, get the effect. Opponents must pay :rb_rune_rainbow: to choose a [Deflect] unit with a spell or ability.) | Matches only through the Bird token it makes, so this is the token-maker shape, not the nested-quote one: the token prints its own [Deflect] and can be moved to Allay's battlefield to stack. Identical text to listed UNL-153 Carrion Dredger (and UNL-033 Frisky Hunter), so keep it for consistency. |
| `RAD-075` Skystrike Squadron | fits | [Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or ability.) | Prints [Deflect] on a unit body; stacks with Allay's grant at her battlefield (809.2). |
| `RAD-036` Storm Raptor | fits | [Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or ability.) | Prints [Deflect] on a unit body; stacks with Allay's grant at her battlefield (809.2). |
| `RAD-037` Watchful Curator | excluded | Your gear have [Deflect]. (Opponents must pay :rb_rune_rainbow: to choose each with a spell or ability.) | "Your gear have [Deflect]" gives the keyword to gear, and Allay's grant reaches only "your other units here", so no permanent carries both instances for 809.2 to sum. |

### `hidden-blade-would-die-shield`

Anchor `OGN-213` Hidden Blade. Matched 8 -> 9 (+1, -0); 0 excluded; stamp 8 -> 9.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-020` Mordekaiser, Twice Slain | fits | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | Real would-die replacement that keeps the body (heal, exhaust, recall), so Hidden Blade's draw 2 still lands. It costs another friendly unit, like the pay-a-permanent savers already in the list (Zhonya's Hourglass kills a gear); marginal but not the UNL-007 banish shape. |

### `mageseeker-warden-base-reaching-removal`

Anchor `OGN-070` Mageseeker Warden. Matched 9 -> 12 (+3, -0); 0 excluded; stamp 9 -> 12.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-152` Encore | fits | Deal 2 to a unit. | The first mode 'Deal 2 to a unit' names no location, so it reaches a unit in the enemy base. |
| `RAD-014` Shimmering Swimmer | fits | When you play me, if you paid the additional cost, deal 2 to a unit. | 'Deal 2 to a unit' names no location, so it reaches a unit in the enemy base; it needs the additional cost paid first. |
| `RAD-059` Supernova | fits | Deal 10 to a unit. | 'Deal 10 to a unit' names no location, so it reaches a unit in the enemy base (and draws 2). |

### `drag-under-empties-the-garrison`

Anchor `SFD-164` Drag Under. Matched 5 -> 6 (+1, -0); 0 excluded; stamp 5 -> 6.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-024` Blossoming Dreamroot | fits | When you win a combat here, draw 1. | Pays on a combat win at its own battlefield; Drag Under killing the last defender inside that showdown turns the combat into a win (466.3.a). |

### `ravenborn-tome-bonus-damage-per-action`

Anchor `OGN-032` Ravenborn Tome. Matched 4 -> 5 (+1, -0); 1 excluded; stamp 4 -> 4.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-006` Scorched Earth | excluded | Deal 5 damage split among units at a single battlefield. | "Deal 5 damage split among units at a single battlefield" is one Deal action, and 715.3 applies Bonus Damage to the amount split, so the Tome collects once, like Final Spark. The why leaves split cases to Annie. |

### `breakneck-mech-ganking`

Anchor `SFD-071` Breakneck Mech. Matched 15 -> 19 (+4, -0); 0 excluded; stamp 15 -> 19.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | Carries the Mech tag (tags: Bandle City, Yordle, Mech) and makes Mech tokens. |
| `RAD-055` Clanging Sentry | fits | Your Mechs have [Disarm]. | Matches on the Mech tag (tags: Piltover, Mech); it is a Mech itself. |
| `RAD-011` Incorrigible Construct | fits | [Show Off] a Mech. | Matches on the Mech tag (tags: Piltover, Mech); it is a Mech itself. |
| `RAD-057` Piltovan Guidebot | fits | Mech | Matches only on the Mech tag (tags: Piltover, Mech); the card text has no Mech word, and the rule is tag-only by design. |

### `patched-porobot-gold-gear-count`

Anchor `VEN-058` Patched Porobot. Matched 23 -> 28 (+5, -0); 0 excluded; stamp 23 -> 28.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-157` Bandle Scouts' Academy | fits | When you hide a card here, play a Gold gear token exhausted. | Battlefield makes a Gold gear token (a gear, 187.5 and 185.2.d) whenever you hide a card here; conditional but meetable (like Black Market Broker). |
| `RAD-105` Reckless Innovator | fits | • Play a Gold gear token exhausted. | One of two modes plays a Gold gear token exhausted whenever it becomes exhausted; a real producer. |
| `RAD-052` Resource Extractor | fits | At the end of your turn, if you control this battlefield, play a Gold gear token exhausted. | Plays a Gold gear token at end of turn if you control this battlefield; condition is meetable, and the Extractor is itself a gear that counts too. |
| `RAD-100` The Waters' Wage | fits | Play a Gold gear token exhausted. If it's your turn and you played this from face down, play three ready Gold gear tokens instead. | Plays one Gold gear token (three ready if played from face down on your turn); a real producer. |
| `RAD-022` Whirling Twirligig | fits | :rb_exhaust:: Play a Gold gear token exhausted. | Exhaust to play a Gold gear token exhausted; a real producer, and the Twirligig is itself a gear. |

### `cull-the-weak-friendly-death-outlet`

Anchor `OGN-209` Cull the Weak. Matched 33 -> 38 (+5, -0); 1 excluded; stamp 33 -> 37.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-067` Clocktower Guardian | fits | [Deathknell][>] Banish the top card of your Main Deck. You may play it, ignoring its Energy cost. | Unit with its own Deathknell: Cull the Weak's kill (355.10.e, untargeted) fires it, and it is a body you can spare. |
| `RAD-017` Detonation Amplifier | fits | Friendly [Deathknell] effects here trigger an additional time. | A Deathknell multiplier (808.2 separate instances) rather than a body, the same role as listed OGN-236 Karthus, Eternal ('Your [Deathknell] effects trigger an additional time'), so it doubles the payoff of the unit Cull kills at that battlefield; it needs a Deathknell unit alongside, as Karthus does. |
| `RAD-062` Gravity Field | excluded | [Deathknell][>] Draw 1. (When I die, get the effect.) | Its [Deathknell] is on a gear, and Cull the Weak has each player kill one of their units, so it can never die to it. |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. (When I die, get the effect. Opponents must pay :rb_rune_rainbow: to choose a [Deflect] unit with a spell or ability.) | Unit with its own Deathknell; Cull the Weak kills it and the Bird token replaces it, so it is a spendable body with a payoff. |
| `RAD-126` Mournful Spirit | fits | [Deathknell][>] You may kill a unit or gear here. (When I die, get the effect.) | Unit with its own Deathknell; Cull the Weak's kill fires it, and the 'may' kill is an extra removal rider. |

### `purifier-equipment-assault-sums`

Anchor `SFD-183` Purifier. Matched 40 -> 43 (+3, -0); 0 excluded; stamp 40 -> 43.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | tags: ["Equipment","Riven"] | Tagged Equipment, so Purifier's 'Your Equipment each give [Assault]' adds one Assault instance for it, summed under 807.2. |
| `RAD-071` Nazuman Ntofo | fits | tags: ["Equipment"] | Tagged Equipment, so Purifier makes it give [Assault] to the unit it is attached to, on top of the Shield 2 it grants. |
| `RAD-123` Protector's Shield | fits | tags: ["Equipment"] | Tagged Equipment, so Purifier's 'Your Equipment each give [Assault]' adds one Assault instance for it, summed under 807.2. |

### `warwick-hunter-damage-marker`

Anchor `OGN-159` Warwick, Hunter. Matched 14 -> 16 (+2, -0); 0 excluded; stamp 14 -> 16.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-003` Bilgewater Tracker | fits | When you play me, deal 1 to each of up to 2 units. | 'Deal 1 to each of up to 2 units' on play marks damage the same Main Phase, up to two enemies for the sweep. |
| `RAD-014` Shimmering Swimmer | fits | When you play me, if you paid the additional cost, deal 2 to a unit. | 'Deal 2 to a unit' on play, if the additional cost was paid, marks damage the same Main Phase for the sweep. |

### `immortal-phoenix-spell-kill`

Anchor `OGN-037` Immortal Phoenix. Matched 33 -> 39 (+6, -0); 1 excluded; stamp 33 -> 38.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-079` Avalanche | fits | Deal 3 to all units in bases. | 'Deal 3 to all units in bases' can kill units from a spell, and the Cleanup kill is attributed to the spell (429.5.c, which the rule's why cites as 428.5.c). |
| `RAD-152` Encore | fits | • Deal 2 to a unit. | Modal damage spell: the 'Deal 2 to a unit' mode can kill, attributed to the spell by 429.5.c. |
| `RAD-013` Lost to the Sands | fits | • Deal 4 to a unit at a battlefield. | Modal damage spell: the 'Deal 4 to a unit at a battlefield' mode can kill, attributed to the spell by 429.5.c. |
| `RAD-051` Parallel Convergence | fits | Deal 5 to a unit at a battlefield. | 'Deal 5 to a unit at a battlefield' from a spell can kill, attributed to the spell by 429.5.c. |
| `RAD-096` Satchel Charge | excluded | (It has [Deploy]. When it dies, deal 2 to an enemy there and kill your other Bombs there.) | Its only "deal 2 to" is in the reminder of the Bomb gear token it plays; Satchel Charge deals no damage and kills nothing. |
| `RAD-059` Supernova | fits | Deal 10 to a unit. | 'Deal 10 to a unit' from a spell kills almost anything, attributed to the spell by 429.5.c. |

### `atakhan-expensive-sacrifice`

Anchor `UNL-170` Atakhan. Matched 28 -> 36 (+8, -0); 0 excluded; stamp 28 -> 36.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-113` Angler Wyrm | fits | [Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or ability.) | Unit with printed Energy 8; Atakhan reads the printed cost (206), so it is valid fuel for the discount (text-independent filter, minEnergy 8). |
| `RAD-080` Bloodscent Swarm | fits | I cost :rb_energy_2: less for each battlefield you've conquered this turn. | Unit with printed Energy 8; Atakhan reads the printed cost (206), so it is valid fuel for the discount (text-independent filter, minEnergy 8). |
| `RAD-067` Clocktower Guardian | fits | When you play me or when I hold, [Predict 3]. | Unit with printed Energy 8; Atakhan reads the printed cost (206), so it is valid fuel for the discount (text-independent filter, minEnergy 8). |
| `RAD-018` Drakehound Packmaster | fits | When you play me, reveal the top card of each opponent's Main Deck. Choose one and banish it, then play it, ignoring its cost. Recycle the rest. | Unit with printed Energy 9; Atakhan reads the printed cost (206), so it is valid fuel for the discount (text-independent filter, minEnergy 8). |
| `RAD-137` Mordekaiser, Dominating | fits | When you play me or when I attack, you may discard 1 to kill a unit or gear. | Unit with printed Energy 9; Atakhan reads the printed cost (206), so it is valid fuel for the discount (text-independent filter, minEnergy 8). |
| `RAD-122` Party Crasher | fits | I cost :rb_energy_1: less for each exhausted unit you control. | Unit with printed Energy 9; Atakhan reads the printed cost (206), so it is valid fuel for the discount (text-independent filter, minEnergy 8). |
| `RAD-060` The Empyrean | fits | [Show Off] a card. (As you play me, you may reveal a card from hand or pick another friendly one.) | Unit with printed Energy 8; Atakhan reads the printed cost (206), so it is valid fuel for the discount (text-independent filter, minEnergy 8). |
| `RAD-077` Wrath of the Freljord | fits | I enter ready. | Unit with printed Energy 9; Atakhan reads the printed cost (206), so it is valid fuel for the discount (text-independent filter, minEnergy 8). |

### `temporal-breach-replays-in-place`

Anchor `VEN-066` Temporal Breach. Matched 11 -> 14 (+3, -0); 0 excluded; stamp 11 -> 14.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | Play effect puts a Mech token "here"; a replay in place keeps the location. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | Play effect puts a Mech token "here"; a replay in place keeps the location. |
| `RAD-031` Stoic Ferryman | fits | When you play me to a battlefield, you may move another unit you control here to your base. | "Here" play trigger that a replay to the same battlefield re-fires; conditional on standing at a battlefield, which Breach's same-location replay preserves. |

### `caitlyn-patrolling-tank-screen`

Anchor `OGN-068` Caitlyn, Patrolling. Matched 25 -> 31 (+6, -0); 0 excluded; stamp 25 -> 31.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-078` Armored Tusker | fits | [Tank] (I must be assigned combat damage first.) | Native [Tank] body with [Shield 3], the screen Caitlyn wants (and a native Tank is fine here, unlike under Eye of Twilight). |
| `RAD-161` Durand Memorial | fits | Give it [Tank] this combat. | Grants [Tank] to a friendly unit here on defense, which makes any defender at that battlefield Caitlyn's screen. |
| `RAD-133` Jarvan IV, Royal Heir | fits | [Tank] (I must be assigned combat damage first.) | Is or grants a [Tank] body, which keeps Caitlyn at the back while she pings. |
| `RAD-122` Party Crasher | fits | [Tank] (I must be assigned combat damage first.) | Is or grants a [Tank] body, which keeps Caitlyn at the back while she pings. |
| `RAD-123` Protector's Shield | fits | [Tank] (I must be assigned combat damage first.) | Equipment whose effect gives the attached unit [Tank], a screen that can be put on any body. |
| `RAD-128` Steadfast Outrider | fits | [Tank] (I must be assigned combat damage first.) | Is or grants a [Tank] body, which keeps Caitlyn at the back while she pings. |

### `factory-recall-equipment-rehost`

Anchor `SFD-135` Factory Recall. Matched 40 -> 43 (+3, -0); 0 excluded; stamp 40 -> 43.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | tag: Equipment | Equipment (its [Equip] is printed rules text, inactive while attached): Factory Recall rehosts it for 1. |
| `RAD-071` Nazuman Ntofo | fits | tag: Equipment | Equipment (Equip 1): Factory Recall returns it to hand to re-equip a new carrier. |
| `RAD-123` Protector's Shield | fits | tag: Equipment | Equipment with [Quick-Draw]: replayed from hand it attaches free on play (819.1.d), the cleanest rehost. |

### `bard-mercurial-carries-conquer-payoffs`

Anchor `SFD-079` Bard, Mercurial. Matched 29 -> 31 (+2, -0); 0 excluded; stamp 29 -> 31.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-091` Jarvan IV, Martial Paragon | fits | When I conquer, if there is a friendly gear with [Deploy] here, channel 1 rune exhausted. | Conditional, but the condition can be met on a bloodless conquer: Deploy gear may be played to any battlefield including open ones (830.1.b.1), an open one is only unit-free (170.11.a, 170.11.c), and this unit gives your Deploy gear [Action] so one can be played during the showdown. Unlike the excess-damage excludes it is not unreachable; it needs setup. |
| `RAD-076` Sneaky Zeebles | fits | When I conquer, [Add] :rb_rune_rainbow:. | Unconditional conquer payoff; pays when Bard drops the pack on an open battlefield. |

### `last-stand-doubles-a-shield-body`

Anchor `OGN-069` Last Stand. Matched 22 -> 30 (+8, -0); 0 excluded; stamp 22 -> 30.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-078` Armored Tusker | fits | [Shield 3] (+3 :rb_might: while I'm a defender.) | A unit carrying its own [Shield] threshold, so Last Stand doubles the current Might including the Shield half while it defends. |
| `RAD-086` K'Sante, Courageous | fits | [Shield 2] (+2 :rb_might: while I'm a defender.) | A unit carrying its own [Shield] threshold, so Last Stand doubles the current Might including the Shield half while it defends. |
| `RAD-045` K'Sante, Dauntless | fits | [Shield] (+1 :rb_might: while I'm a defender.) | Prints [Shield] (+1 Might while defending), the piece Last Stand's doubling includes; its attack-or-defend trigger that doubles another unit's Shield is extra, not required. |
| `RAD-042` Orianna, Exquisite | fits | [Shield] (+1 :rb_might: while I'm a defender.) | Carries its own [Shield] (value 1); the doubled Might mostly buys survivability since it deals no combat damage without a friendly gear here, but the payoff is small, not absent. |
| `RAD-083` Stalwart Goatherd | fits | [Shield 2] (+2 :rb_might: while I'm a defender.) | A unit carrying its own [Shield] threshold, so Last Stand doubles the current Might including the Shield half while it defends. |
| `RAD-088` Staunch Survivor | fits | [Assault 2], [Shield 2] (+2 :rb_might: while I'm an attacker or defender.) | A unit carrying its own [Shield] threshold, so Last Stand doubles the current Might including the Shield half while it defends. |
| `RAD-031` Stoic Ferryman | fits | [Shield 3] (+3 :rb_might: while I'm a defender.) | A unit carrying its own [Shield] threshold, so Last Stand doubles the current Might including the Shield half while it defends. |
| `RAD-077` Wrath of the Freljord | fits | [Shield 3] (+3 :rb_might: while I'm a defender.) | A unit carrying its own [Shield] threshold, so Last Stand doubles the current Might including the Shield half while it defends. |

### `dune-surfer-one-way-tank-ignore`

Anchor `VEN-004` Dune Surfer. Matched 25 -> 31 (+6, -0); 0 excluded; stamp 25 -> 31.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-078` Armored Tusker | fits | [Tank] (I must be assigned combat damage first.) | Prints [Tank]: a friendly wall that keeps its toll against the opponent while Dune Surfer ignores theirs. |
| `RAD-161` Durand Memorial | fits | Give it [Tank] this combat. | Grants [Tank] to a friendly defender here (like the existing Block and Eye of Twilight), so it is a one-way wall on your side of the same fight. The reminder text also contains assigned combat damage first. |
| `RAD-133` Jarvan IV, Royal Heir | fits | [Tank] (I must be assigned combat damage first.) | Prints [Tank]: a friendly wall that stays up while Dune Surfer ignores theirs. |
| `RAD-122` Party Crasher | fits | [Tank] (I must be assigned combat damage first.) | Prints [Tank]: a friendly wall that stays up while Dune Surfer ignores theirs. |
| `RAD-123` Protector's Shield | fits | [Tank] (I must be assigned combat damage first.) | The match is the gear's effect text, not its printed text (the packet omits the effect field): the equipped unit has [Tank], same as the existing Doran's Shield SFD-033. |
| `RAD-128` Steadfast Outrider | fits | [Tank] (I must be assigned combat damage first.) | Prints [Tank]: a friendly wall that stays up while Dune Surfer ignores theirs. |

### `soraka-wanderer-replacement-fork`

Anchor `SFD-173` Soraka, Wanderer. Matched 7 -> 8 (+1, -0); 1 excluded; stamp 7 -> 7.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-020` Mordekaiser, Twice Slain | excluded | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | His replacement saves only himself, and at printed Might (5 against her 4) her "less Might than me" never covers him, so no event carries both replacements to fork between (373.2). |

### `volibear-split-bonus-damage-target-count`

Anchor `OGN-041` Volibear, Furious. Matched 3 -> 4 (+1, -0); 1 excluded; stamp 3 -> 3.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-023` Ziggs, Short-Fused | excluded | Abilities of friendly gear deal 1 Bonus Damage. | "Abilities of friendly gear deal 1 Bonus Damage" reaches gear abilities only, and Volibear's split is a unit's triggered ability, the OGN-032 line. |

### `commander-ledros-token-fodder`

Anchor `OGN-231` Commander Ledros. Matched 48 -> 59 (+11, -0); 1 excluded; stamp 48 -> 58.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-009` Antagonistic Apparatus | fits | When you play me, play a ready 3 :rb_might: Mech unit token here. | Plays a 3 Might Mech unit token when played, a body for Ledros' cost reduction. |
| `RAD-159` Black Rose Sanctum | fits | For each player, the first time each turn a non-token unit they control dies here, they play a 1 :rb_might: Recruit unit token to their base. | Plays a Recruit unit token when a non-token unit dies here; conditional on a death at this battlefield but a real unit-token source. |
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Plays a unit token that Ledros can kill for his per-body cost reduction (185.2.d: a token is a unit). |
| `RAD-152` Encore | fits | Play two 1 :rb_might: Recruit unit tokens. | The second mode plays two Recruit unit tokens; a choose-two mode but a real source. |
| `RAD-132` Heimerdinger, Academy Instructor | excluded | If you would play a unit token to a location while I'm at a battlefield, you may play a 3 :rb_might: Mech unit token to that same location instead. | "If you would play a unit token ..., you may play a 3 Might Mech unit token ... instead" replaces a token another card was already making and plays none of its own, so the anchor gains no body (the RAD-132 exclude on grand-plaza-unit-tokens). |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. | Deathknell plays a Bird unit token, so killing Hunting Dog for Ledros' cost leaves a body behind. |
| `RAD-049` Industrious Mechsmith | fits | When you play me, play a 3 :rb_might: Mech unit token here. | Plays a 3 Might Mech unit token when played, a body for Ledros' cost reduction. |
| `RAD-007` Rally for War | fits | Play three 1 :rb_might: Recruit unit tokens there. | Plays three Recruit unit tokens, three bodies for Ledros' cost reduction. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. | Plays two Recruit unit tokens to your base, four if a 7-Energy card was shown off. |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Plays a unit token that Ledros can kill for his per-body cost reduction (185.2.d: a token is a unit). |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly gear, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token. | Plays a unit token that Ledros can kill for his per-body cost reduction (185.2.d: a token is a unit). |

### `treasure-hoard-temporary-garrison-cycle`

Anchor `SFD-220` Treasure Hoard. Matched 15 -> 16 (+1, -0); 0 excluded; stamp 15 -> 16.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-095` Momentary Companion | fits, with a limit (packet: false-positive) | When you play me, if it's not your turn, give me [Temporary]. | It gets [Temporary] only when played off-turn from face down, at a battlefield you control (107.3.c), so another of your units has held it; it is the lone body the rule needs only once that unit has left or died. |

### `eye-of-the-herald-effect-mover`

Anchor `SFD-153` Eye of the Herald. Matched 14 -> 19 (+5, -0); 0 excluded; stamp 14 -> 19.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-084` Cataclysm | fits | Move a friendly unit to an occupied enemy battlefield. | 'Move a friendly unit to an occupied enemy battlefield' is an effect move of the carrier, a second Move that fires Eye's Recruit. |
| `RAD-155` Exemplar of Demacia | fits | When you play a gear with [Deploy], you may exhaust me and pay :rb_rune_rainbow: to move a friendly unit to that battlefield. | The legend may pay to move a friendly unit to the battlefield of a Deploy gear: an effect move of the carrier. |
| `RAD-133` Jarvan IV, Royal Heir | fits | When I attack, you may move a unit you control to my battlefield. | When it attacks it may move a unit you control to its battlefield: an effect move of the carrier. |
| `RAD-096` Satchel Charge | fits | Move a friendly unit, then play a Bomb gear token to a battlefield. | 'Move a friendly unit' is an effect move of the carrier (the Bomb token is incidental). |
| `RAD-031` Stoic Ferryman | fits | When you play me to a battlefield, you may move another unit you control here to your base. | May move another friendly unit here to your base: still a Move, so Eye mints its Recruit (the same base-destination shape as SFD-043 Emperor's Divide and OGS-011 Flash, already in the list). |

### `iascylla-schedules-the-defend-half`

Anchor `UNL-050` Iascylla. Matched 8 -> 10 (+2, -0); 0 excluded; stamp 8 -> 10.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-085` Graves, Blasting Through | fits | When I attack or defend, deal damage equal to my Might to all enemy units here. | 'When I attack or defend' fires on the defend half when Iascylla drags an enemy in, damaging all enemy units here; no alone-gate, and the 'no combat damage' clause is a separate downside. |
| `RAD-045` K'Sante, Dauntless | fits | When I attack or defend, double the [Shield] of a unit you control here this turn. | 'When I attack or defend' fires on the defend half and doubles the Shield of a unit you control here, which has no alone-gate and helps the defenders Iascylla sets up. |

### `jax-unmatched-quick-draw-everywhere`

Anchor `SFD-054` Jax, Unmatched. Matched 36 -> 39 (+3, -0); 1 excluded; stamp 36 -> 38.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-150` Blade of the Exile | fits | tags: Equipment, Riven (text prints no [Quick-Draw]) | Non-text predicate: Equipment tag, and it prints no [Quick-Draw], so Jax's grant is new and removes the 'rainbow or exhaust a friendly unit' Equip cost. |
| `RAD-071` Nazuman Ntofo | fits | tags: Equipment (text prints no [Quick-Draw]) | Non-text predicate: Equipment tag, no printed [Quick-Draw], so Jax's grant is new (it prints 'Equip' without brackets in the stored text). |
| `RAD-123` Protector's Shield | excluded | tags: Equipment; text: [Quick-Draw] (This has [Reaction]. When you play it, attach it to a unit you control.) | Protector's Shield already prints [Quick-Draw], and 819.2 says "Multiple instances of Quick-Draw do not trigger separately and have no effect beyond the first." Jax's grant is worth nothing on it, as on Long Sword (SFD-022). |

### `power-nexus-reaction-power-at-finalization`

Anchor `SFD-214` Power Nexus. Matched 12 -> 18 (+6, -0); 1 excluded; stamp 12 -> 17.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-101` An Offer You Can't Refuse | fits | Kill a gear. Its controller plays a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Gold maker, but the Gold goes to the killed gear's controller (kill your own gear to get it) and it enters exhausted, so slow like the other Gold makers; the rule's why accepts that class. |
| `RAD-143` Iron Revenant | excluded | [Reaction][>] Banish a unit or gear from your trash, :rb_exhaust:: [Add] :rb_rune_rainbow:. Spend this Power only to play units or gear. (Abilities that add resources can't be reacted to.) | Iron Revenant's Add reads "Spend this Power only to play units or gear". The Power Nexus's point is a Triggered Ability of a battlefield, not a play, so this rainbow can never pay it, as with OGN-247. |
| `RAD-105` Reckless Innovator | fits | • Play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Optional mode on becoming exhausted plays a Gold token; same documented Gold-maker class (slow, genuine). |
| `RAD-052` Resource Extractor | fits | At the end of your turn, if you control this battlefield, play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Plays a Gold gear token carrying [Reaction] Add rainbow, a Power source usable at finalization; same documented Gold-token-maker class as UNL-018, UNL-073, UNL-145, UNL-185 (genuine but slow per the rule's why). |
| `RAD-100` The Waters' Wage | fits | Play a Gold gear token exhausted. If it's your turn and you played this from face down, play three ready Gold gear tokens instead. (Gold tokens have "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Plays Gold; from face down on your turn it plays three READY Gold, which can pay the Nexus the same turn cycle. Same documented Gold-maker class. |
| `RAD-022` Whirling Twirligig | fits | :rb_exhaust:: Play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Plays a Gold gear token carrying [Reaction] Add rainbow, a Power source usable at finalization; same documented Gold-token-maker class as UNL-018, UNL-073, UNL-145, UNL-185 (genuine but slow per the rule's why). |

### `sun-disc-enters-ready-exhaust-abilities`

Anchor `OGN-021` Sun Disc. Matched 10 -> 17 (+7, -0); 2 excluded; stamp 10 -> 15.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-113` Angler Wyrm | fits | :rb_exhaust:: Choose an opponent. They must move a unit they control to my battlefield. | Printed exhaust cost on a unit, so entering ready makes it usable the turn it lands. |
| `RAD-040` Heartening Soul | excluded | Friendly legends have ":rb_exhaust:: Give a unit +3 :rb_might: this turn." | No exhaust ability of its own: the quoted one is granted to friendly legends, and the Sun Disc grant is on the unit you play. |
| `RAD-027` Iridescent Avian | fits | :rb_exhaust:: [Buff] a unit. If it's already buffed, give it +2 :rb_might: this turn instead. | Printed exhaust cost on a unit; usable the turn it lands. |
| `RAD-104` Pitiless Stalker | fits | :rb_exhaust:: [Stun] an enemy unit. | Printed exhaust cost on a unit; usable the turn it lands. |
| `RAD-105` Reckless Innovator | excluded | (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | No exhaust-cost ability of its own: the only :rb_exhaust:: is in the quoted Gold token reminder (the UNL-018 line), and it already has [Accelerate]. |
| `RAD-115` Transpositionist | fits | :rb_rune_chaos:, :rb_exhaust:: Return a friendly unit to its owner's hand. | Printed exhaust cost on a unit; usable the turn it lands. |
| `RAD-112` Ziggs, Explosive | fits | :rb_energy_1:, :rb_exhaust:: Play a Bomb gear token to a battlefield. | Printed exhaust cost on a unit; usable the turn it lands. |

### `the-academy-granted-repeat-modal-spell`

Anchor `UNL-216` The Academy. Matched 6 -> 9 (+3, -0); 0 excluded; stamp 6 -> 9.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-033` Command: Attack | fits | Choose one — | Genuinely modal spell, so the repeat can pick the other mode (820.2.a). |
| `RAD-102` Demon Shade | fits | Choose a friendly unit, then choose one — | Genuinely modal; the two modes are complementary (first moves to the open battlefield, second grants Ganking once none is open), so a repeat can take the other mode and a new unit. |
| `RAD-013` Lost to the Sands | fits | Choose one — | Genuinely modal (deal 4 / kill a gear), so the repeat can pick the other mode. |

### `highlander-kill-cost-shield`

Anchor `UNL-175` Tactical Retreat. Matched 8 -> 13 (+5, -0); 0 excluded; stamp 8 -> 13.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-017` Detonation Amplifier | fits | When you play this, you may kill another friendly unit or gear to draw 1. | 'Kill another friendly unit or gear to draw 1' is a cost-within-an-instruction (204.3), so the kill is still paid if Tactical Retreat replaces the death and the draw still happens. |
| `RAD-125` Dune Devourer | fits | You may kill a friendly unit as an additional cost to play me. | Additional cost to play: kill a friendly unit for 2 Energy less; a cost, so 357.2.a keeps it paid under Tactical Retreat. |
| `RAD-020` Mordekaiser, Twice Slain | fits | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | 'Kill a friendly unit to heal me, exhaust me, and recall me instead' is a cost-within-an-instruction (204.3), so the kill is still paid if Tactical Retreat replaces that unit's death while Mordekaiser is saved. |
| `RAD-014` Shimmering Swimmer | fits | You may kill a friendly unit or gear as an additional cost to play me. | Optional additional cost 'kill a friendly unit or gear' to play, and the deal-2 trigger keys on having paid it, not on the kill happening, so a replaced death still counts. |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly unit, :rb_exhaust:: Play a 3 :rb_might: Mech unit token. | The kill sits before the colon ('Kill a friendly unit, exhaust: Play a 3 Might Mech unit token'), so it is a cost that Tactical Retreat's replacement leaves paid. |

### `ki-barrier-tank-raises-the-toll`

Anchor `VEN-126` Ki Barrier. Matched 21 -> 25 (+4, -0); 0 excluded; stamp 21 -> 25.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-078` Armored Tusker | fits | [Tank] (I must be assigned combat damage first.) | A unit with the real [Tank] keyword, so a Ki Barrier on it makes the Prevent Value count first at assignment. |
| `RAD-133` Jarvan IV, Royal Heir | fits | [Tank] (I must be assigned combat damage first.) | A unit with the real [Tank] keyword, so a Ki Barrier on it makes the Prevent Value count first at assignment. |
| `RAD-122` Party Crasher | fits | [Tank] (I must be assigned combat damage first.) | A unit with the real [Tank] keyword, so a Ki Barrier on it makes the Prevent Value count first at assignment. |
| `RAD-128` Steadfast Outrider | fits | [Tank] (I must be assigned combat damage first.) | A unit with the real [Tank] keyword, so a Ki Barrier on it makes the Prevent Value count first at assignment. |

### `flurry-of-blades-one-sided-sweep`

Anchor `OGN-133` Flurry of Blades. Matched 6 -> 7 (+1, -0); 0 excluded; stamp 6 -> 7.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-039` Ephemeral Ward | fits | Your units have +2 :rb_might:. | Static, board-wide +2 (no "here"), so tokens survive the 1-damage sweep. Its "When you play a unit, kill this" does not trigger on Flurry of Blades, which is a spell, so the grant is still up when the Reaction resolves; it only restricts playing units while the Ward is out. |

### `angler-beast-one-sided-bounce`

Anchor `UNL-132` Angler Beast. Matched 6 -> 7 (+1, -0); 0 excluded; stamp 6 -> 7.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-039` Ephemeral Ward | fits | Your units have +2 :rb_might:. | 'Your units have +2 Might' lifts your Recruits and Birds to 3 Might, out of the bounce band. Its 'When you play a unit, kill this' is no obstacle: both triggers are yours and 383.3.d lets you order them so the bounce (newest) resolves first (340.1), then the Ward dies. |

### `rage-amplifier-lifts-the-damage-band`

Anchor `VEN-018` Rage Amplifier. Matched 21 -> 29 (+8, -0); 0 excluded; stamp 21 -> 29.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-159` Black Rose Sanctum | fits | For each player, the first time each turn a non-token unit they control dies here, they play a 1 :rb_might: Recruit unit token to their base. | Battlefield plays a 1 Might Recruit token to a player's base the first time each turn one of their non-token units dies here; the token is yours when it is your unit, so the Amplifier lifts it. Symmetric (the opponent gets one too, unlifted), and battlefield members already exist (Altar to Unity, Trapping Grounds). |
| `RAD-116` Concert Poster | fits | When you play this or when you conquer here, you may pay :rb_energy_1: to play a 1 :rb_might: Recruit unit token to your base. | Optional 1 Energy for a 1 Might Recruit to your base on play or conquer here; token is yours, so the Amplifier lifts it. |
| `RAD-152` Encore | fits | • Play two 1 :rb_might: Recruit unit tokens. | One of four modes (choose two) is 'Play two 1 Might Recruit unit tokens', both yours; modal cards are already in the list (Flurry of Feathers). |
| `RAD-119` Hunting Dog | fits | [Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your base. | Deathknell plays a 1 Might Bird token to your base; yours, so the Amplifier lifts it (same as Carrion Dredger). |
| `RAD-007` Rally for War | fits | Choose an occupied enemy battlefield. Play three 1 :rb_might: Recruit unit tokens there. | Plays three 1 Might Recruit tokens at an enemy-occupied battlefield; the tokens are yours, so the Amplifier lifts all three. |
| `RAD-127` Rousing Display | fits | Play two 1 :rb_might: Recruit unit tokens to your base. If you showed off, play four to your base instead.disa | Plays two (four if shown off) 1 Might Recruit tokens to your base; yours, so the Amplifier lifts them. (The trailing 'disa' in the stored text is a data typo, not text.) |
| `RAD-SP5` Seraphine, Not Alone | fits | When you play me or when I become exhausted, play a 1 :rb_might: Recruit unit token to your base. | Plays a 1 Might Recruit to your base on play and whenever it becomes exhausted; the tokens are yours. |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly gear, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token. | Kill a friendly gear, exhaust: play a 1 Might Recruit token (yours); the gear cost is a real consumable (the Gold token it makes), not the Amplifier itself, so the line works. |

### `bullet-time-pays-on-resolution`

Anchor `OGN-268` Bullet Time. Matched 6 -> 16 (+10, -0); 6 excluded; stamp 6 -> 10.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-SP2` Akali, Brash | fits | The first time I move each turn, [Add] :rb_energy_1::rb_rune_rainbow:. | 'The first time I move each turn, [Add] 1 energy and 1 rainbow' puts rainbow in the pool on your own turn, ready to pay Bullet Time's 'any amount'. |
| `RAD-101` An Offer You Can't Refuse | excluded | Kill a gear. Its controller plays a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Its only [Add] is inside the quoted reminder of a Gold gear token it plays exhausted, the UNL-018 line this rule already excludes: it adds nothing itself, and the token cannot pay the turn it arrives. The Gold also goes to the killed gear's controller. |
| `RAD-157` Bandle Scouts' Academy | excluded | When you hide a card here, play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Its only [Add] is inside the quoted reminder of a Gold gear token it plays exhausted, the UNL-018 line this rule already excludes: it adds nothing itself, and the token cannot pay the turn it arrives. |
| `RAD-103` Gutter Guardian | fits | When you play me, if you showed off, [Add] :rb_rune_rainbow:. | 'When you play me, if you showed off, [Add] rainbow' adds rainbow on resolution of its trigger, so it pre-loads Bullet Time; conditional on showing off a [Hidden] card. |
| `RAD-143` Iron Revenant | excluded | [Reaction][>] Banish a unit or gear from your trash, :rb_exhaust:: [Add] :rb_rune_rainbow:. Spend this Power only to play units or gear. (Abilities that add resources can't be reacted to.) | "Spend this Power only to play units or gear": Bullet Time is a spell, so this rainbow can never pay it, the SFD-189 line this rule already excludes. |
| `RAD-105` Reckless Innovator | excluded | • Play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Its only [Add] is inside the quoted reminder of a Gold gear token it plays exhausted, the UNL-018 line this rule already excludes: it adds nothing itself, and the token cannot pay the turn it arrives. |
| `RAD-052` Resource Extractor | excluded | At the end of your turn, if you control this battlefield, play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Its only [Add] is inside the quoted reminder of a Gold gear token it plays exhausted, the UNL-018 line this rule already excludes: it adds nothing itself, and the token cannot pay the turn it arrives. |
| `RAD-076` Sneaky Zeebles | fits | When I conquer, [Add] :rb_rune_rainbow:. (Abilities that add resources can't be reacted to.) | 'When I conquer, [Add] rainbow' adds rainbow in a showdown, where Bullet Time ([Action]) is playable. |
| `RAD-100` The Waters' Wage | fits | Play a Gold gear token exhausted. If it's your turn and you played this from face down, play three ready Gold gear tokens instead. (Gold tokens have "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Played from face down on your turn it plays three READY Gold tokens, each 'Kill this, exhaust: [Add] rainbow', so real rainbow this turn. This breaks the rule's why sentence 'every Gold-producing card prints its token exhausted', which is now false and needs rewording. |
| `RAD-022` Whirling Twirligig | excluded | :rb_exhaust:: Play a Gold gear token exhausted. (It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") | Its only [Add] is inside the quoted reminder of a Gold gear token it plays exhausted, the UNL-018 line this rule already excludes: it adds nothing itself, and the token cannot pay the turn it arrives. |

### `kogmaw-caustic-sacrifice-outlet`

Anchor `OGN-190` Kog'Maw, Caustic. Matched 10 -> 14 (+4, -0); 1 excluded; stamp 10 -> 13.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-125` Dune Devourer | fits | You may kill a friendly unit as an additional cost to play me. | Additional-cost kill outlet, the same one-shot shape as Cruel Patron and Atakhan already in the list. |
| `RAD-020` Mordekaiser, Twice Slain | excluded | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | Its kill is offered only inside a replacement, once a turn, when Mordekaiser himself would die, so it never fires Kog'Maw's wipe on demand, which is what the rule says an outlet adds. |
| `RAD-014` Shimmering Swimmer | fits | You may kill a friendly unit or gear as an additional cost to play me. | Additional-cost kill outlet that can name Kog'Maw, fires him once. |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly unit, :rb_exhaust:: Play a 3 :rb_might: Mech unit token. | Repeatable free-timing sacrifice outlet (exhaust only, no Energy), like Malzahar, Fanatic. |

### `factory-recall-reready-gear`

Anchor `SFD-135` Factory Recall. Matched 29 -> 32 (+3, -0); 0 excluded; stamp 29 -> 32.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-035` Invigorating Bloom | fits | Exhaust a friendly [Mighty] unit, :rb_exhaust:: Draw 1. (A unit is Mighty while it has 5+ :rb_might:.) | A gear with an exhaust ability, so Factory Recall plus replay (149.1 enters it ready) buys a second activation the same turn. |
| `RAD-046` Resplendent Rostrum | fits | :rb_exhaust:: Draw 1 and channel 1 rune exhausted. | A gear with an exhaust ability, so Factory Recall plus replay (149.1 enters it ready) buys a second activation the same turn. |
| `RAD-064` Scrutinizing Scope | fits | :rb_energy_1:, :rb_exhaust:: Choose an opponent. They guess a card type. Reveal the top card of your Main Deck. If it has that type, recycle it. Otherwise, draw it. (Unit, gear, and spell are types.) | A gear with an exhaust ability, so Factory Recall plus replay (149.1 enters it ready) buys a second activation the same turn. |

### `ekko-deathknell-runes`

Anchor `OGN-110` Ekko, Recurrent, retired since 2026-09-18. Matched 10 -> 14 (+4, -0); 0 excluded; stamp 10 -> 14.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-125` Dune Devourer | fits | You may kill a friendly unit as an additional cost to play me. If you do, I cost :rb_energy_2: less. | Optional on-demand sacrifice at play time that can pick Ekko; same as Atakhan and Commander Ledros on the list. |
| `RAD-020` Mordekaiser, Twice Slain | fits | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | Can pick Ekko as the sacrificed unit, so his Deathknell readies runes. Caveat: it is reactive (once each turn, only when Mordekaiser would die), not strictly 'on demand' like the other outlets; treated as a legitimate outlet, flag if the rule is meant to be at-will only. |
| `RAD-014` Shimmering Swimmer | fits | You may kill a friendly unit or gear as an additional cost to play me. | Optional on-demand sacrifice at play time that can pick Ekko (a unit). |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly unit, :rb_exhaust:: Play a 3 :rb_might: Mech unit token. | Repeatable on-demand sacrifice outlet (exhaust cost, no other condition) that can pick Ekko. |

### `rhasa-trash-counter`

Anchor `OGN-195` Rhasa the Sunderer, retired since 2026-11-23. Matched 29 -> 35 (+6, -0); 0 excluded; stamp 29 -> 35.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-153` Agony's Embrace | fits | Once each turn, when you play a card from face down, draw 1. Then, if it's not your turn, discard 1. | The discard is conditional on playing a facedown card on the opponent's turn, which is reachable: 811.1.b gives a hidden card [Reaction] from the next turn and 359.3 has a player play Tideturner from facedown in reaction. A draw-then-discard that nets one trash card per opponent turn, and the count persists into your turn. |
| `RAD-124` Burn Away | fits | Banish a unit with 3 :rb_might: or less or a gear. [Burn 2]. (Put the top 2 cards of your Main Deck into your trash.) | Unconditional [Burn 2] on a spell, own text and not reminder-only; same as Death Mark and Kennen. Puts 2 cards in your trash. |
| `RAD-021` Ekko, Revolutionary | fits | [Action][>] Discard 1, :rb_energy_1::rb_rune_fury:: Banish me, then play me to your base, ignoring my cost. | Repeatable discard as an activation cost (same as Gutter Palace and Unlicensed Armory); Ekko is banished and replayed, not trashed, so the net is +1 card in your trash per use, unlike the OGN-252 exclude. |
| `RAD-137` Mordekaiser, Dominating | fits | When you play me or when I attack, you may discard 1 to kill a unit or gear. | Optional discard as the cost of its own trigger, on play and on every attack; same as Deceiver and Brazen Buccaneer. |
| `RAD-166` Ruined Monastery | fits | When you conquer here, you may discard 1 and channel 1 rune exhausted. | Battlefield discard on conquer; same shape as Zaun Warrens and Minefield (battlefield caveat applies, not a false positive). |
| `RAD-106` The Good Stuff | fits | When you play this, discard 1, then draw 3. | Discard then draw, the 'free fuel' shape the why names (Lunar Boon, Traveling Merchant); the card comes back so the trash fills at no card cost. |

### `zhonyas-hourglass-cost-still-paid`

Anchor `OGN-077` Zhonya's Hourglass, retired since 2026-11-23. Matched 8 -> 13 (+5, -0); 0 excluded; stamp 8 -> 13.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-017` Detonation Amplifier | fits | When you play this, you may kill another friendly unit or gear to draw 1. | '[do X] to [do Y]' is a Cost within an Instruction (204.3; as the first part of a triggered ability's effect it is the base cost, 204.1.c, example Overzealous Fan), so 203.2 'The Cost is still considered paid even if the associated game action is replaced' lets the Hourglass save the unit and you still draw 1. Not the Baited Hook or Deathgrip shape, because the payoff (draw 1) does not reference the killed unit. |
| `RAD-125` Dune Devourer | fits | You may kill a friendly unit as an additional cost to play me. If you do, I cost :rb_energy_2: less. | Explicit additional cost (204.2, 357.2.a), word for word the Atakhan shape already on the list; the discount applies while the Hourglass keeps the body. |
| `RAD-020` Mordekaiser, Twice Slain | fits | Once each turn, if I would die, you may kill a friendly unit to heal me, exhaust me, and recall me instead. | 'kill a friendly unit to [do Y]' is a Cost within an Instruction inside a replacement effect (368.1 makes replacement effects passive abilities; 204.3, 203.2), so with the Hourglass the sacrificed unit is saved and Mordekaiser is still healed and recalled, for one Hourglass instead of a body (the player must apply Twice Slain's replacement before the Hourglass's on Mordekaiser's own death). Payoff does not reference the killed unit. |
| `RAD-014` Shimmering Swimmer | fits | You may kill a friendly unit or gear as an additional cost to play me. | Explicit additional cost, offers 'unit' so the Hourglass can save the body; the 'if you paid the additional cost' rider checks the cost, which 203.2 counts as paid, and does not reference the killed unit. |
| `RAD-022` Whirling Twirligig | fits | Kill a friendly unit, :rb_exhaust:: Play a 3 :rb_might: Mech unit token. | Kill is written before the colon, so it is the base cost (204.1.b); same shape as Malzahar, Fanatic. With the Hourglass the unit is saved and you still get the 3 Might Mech. |

### `nocturne-horrifying-deck-top-look`

Anchor `OGN-194` Nocturne, Horrifying, retired since 2026-11-23. Matched 29 -> 36 (+7, -0); 0 excluded; stamp 29 -> 36.

| Card | Read | Fragment that matches | Why |
|---|---|---|---|
| `RAD-033` Command: Attack | fits | Look at the top 5 cards of your Main Deck. You may reveal a gear from among them and draw it. Recycle the rest. | A real look at the top of the Main Deck in a mode you can choose; same shape as Reinforce, Stacked Deck and Wild Claw, which are already on the list. |
| `RAD-025` Consult the Heavens | fits | [Predict]. (Look at the top card of your Main Deck. You may recycle it.) | Predict is a look (436.1) and its reminder text is the card's own keyword, not a quoted ability for another card; same as Abandon and Eclipse on the list. |
| `RAD-152` Encore | fits | Look at the top 2 cards of your Main Deck, draw 1 and recycle the other. | Modal 'Choose two' spell, but the look is one of four modes you may select, so it fires Nocturne when chosen; same effect as Called Shot. |
| `RAD-050` Mysterious Chronomancer | fits | When you play me, [Predict 2]. (Look at the top 2 cards of your Main Deck. Recycle any of them and put the rest back in any order.) | Predict 2 on its own play trigger is a look at the top two cards; same as Apprentice Mage and Dramatic Visionary. |
| `RAD-165` Rakelstake | fits | For each player, the first time they play a unit or gear here each turn, they [Predict]. (They look at the top card of their Main Deck. They may recycle it.) | Battlefield that makes the player who plays a unit or gear there Predict their own deck; same shape as Forgotten Library. The standing one-of-three battlefield caveat applies but is not a false positive. |
| `RAD-053` Strigian Oracle | fits | When I become exhausted, [Predict]. (Look at the top card of your Main Deck. You may recycle it.) | Own Predict trigger, repeatable each time it exhausts; a plain look at the top card. |
| `RAD-129` Trifarian Captain | fits | When you play me, look at the top 4 cards of your Main Deck. You may reveal from among them a unit or gear with Energy cost no more than :rb_energy_3: and with Power cost no more than :rb_rune_rainbow: and draw it. Recycle the rest. | Unconditional look at the top 4 on its own play trigger; same shape as Fate Weaver and Ornn, Blacksmith. |
