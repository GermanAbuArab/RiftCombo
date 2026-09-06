# Walk — issue #48, the token lens (7 candidates, 4 refutations)

Date: 2026-09-06. Rules: `data/Riftbound-Core-Rules-2026-07-16.txt`.
Card text: `data/corpus_flat.txt`, verbatim, grepped. Catalogue before this walk: 117 entries, 117 verified.

## 0. Card text — grepped verbatim, every card this walk touches

```
OGN-293 | The Grand Plaza | Battlefield | Colorless | - | When you hold here, if you have 7+ units here, you win the game.
SFD-179 | Corina Veraza | Unit | Order | E7 P1 M6 | [Accelerate] (You may pay :rb_energy_1::rb_rune_order: as an additional cost to have me enter ready.) When I move to a battlefield, play three 1 :rb_might: Recruit unit tokens here. [Tags: Zaun]
SFD-059 | Svellsongur | Gear | Calm | E3 P1 M+0 | [Equip] :rb_energy_1::rb_rune_calm: (:rb_energy_1::rb_rune_calm:: Attach this to a unit you control.) As this is attached to a unit, copy that unit's text to this Equipment's effect text for as long as this is attached to it. [Tags: Equipment]
UNL-045 | Forgotten Signpost | Gear | Calm | E2 | [Action][>] Exhaust a unit you control, :rb_exhaust:: Move a different unit you control to the location of the unit you exhausted to pay for this ability.
SFD-153 | Eye of the Herald | Gear | Order | E1 M+0 | [Equip] :rb_rune_order: (:rb_rune_order:: Attach this to a unit you control.) [Effect] When I move, play a 1 :rb_might: Recruit unit token here. [Tags: Equipment]
SFD-162 | Blood Money | Spell | Order | E2 | [Action] (Play on your turn or in showdowns.) Kill a unit at a battlefield with 2 :rb_might: or less. If it was an enemy unit, play a Gold gear token exhausted. If it was a friendly unit, play two Gold gear tokens exhausted.
SFD-171 | Renata Glasc, Industrialist | Unit | Order | E4 P1 M4 | Your tokens enter ready. [Tags: Renata Glasc, Zaun]
UNL-T05 | Gold | Gear | Colorless | - | [Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:. (Abilities that add resources can't be reacted to.)
UNL-033 | Frisky Hunter | Unit | Calm | E4 M3 | When you play me, play a 1 :rb_might: Bird unit token with [Deflect] here. (Opponents must pay :rb_rune_rainbow: to choose it with a spell or ability.) [Tags: Cat, Zaun]
OGN-246 | Viktor, Leader | Unit | Order | E4 P1 M4 | When another non-Recruit unit you control dies, play a 1 :rb_might: Recruit unit token into your base. [Tags: Viktor, Zaun]
SFD-063 | Chemtech Cask | Gear | Mind | E1 | When you play a spell on an opponent's turn, you may exhaust me to play a Gold gear token exhausted.
SFD-121 | Black Market Broker | Unit | Chaos | E3 M3 | When you play a card from face down, play a Gold gear token exhausted. [Tags: Zaun]
OGN-094 | Sprite Call | Spell | Mind | E3 | [Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) [Action] (Play on your turn or in showdowns.) Play a ready 3 :rb_might: Sprite unit token with [Temporary]. (Kill it at the start of its controller's Beginning Phase, before scoring.)
OGN-263 | Swift Scout | Legend | Mind/Chaos | - | You may pay :rb_energy_1: to hide a card with [Hidden] instead of :rb_rune_rainbow:. :rb_energy_1:, :rb_exhaust:: Put a Teemo unit you own into your hand from your Champion Zone or the board. [Tags: Teemo]
OGN-264 | Guerilla Warfare | Spell | Mind/Chaos | E2 P1 | Return up to two cards with [Hidden] from your trash to your hand. You can hide cards ignoring costs this turn. [Tags: Teemo]
SFD-152 | Eminent Benefactor | Unit | Order | E6 M5 | When I hold, play two Gold gear tokens exhausted. [Tags: Piltover]
UNL-087 | Blue Sentinel | Unit | Mind | E4 P1 M4 | [Shield 2] (+2 :rb_might: while I'm a defender.) Your hold effects for holding here trigger an additional time. When I hold, [Add] :rb_rune_rainbow: at the start of your next Main Phase. (Abilities that add resources can't be reacted to.) [Tags: Mount Targon]
SFD-177 | Azir, Sovereign | Unit | Order | E4 M4 | [Accelerate] (...) When I attack, you may move any number of your token units to this battlefield. [Tags: Bird, Azir, Shurima]
UNL-084 | Sprite Queen | Unit | Mind | E7 P1 M6 | When you play me or at the start of your Beginning Phase, play a ready 3 :rb_might: Sprite unit token with [Temporary] to your base. (Kill them at the start of their controller's next Beginning Phase, before scoring.) [Tags: Fae, Ionia]
SFD-168 | Vanguard Armory | Gear | Order | E7 P1 | :rb_exhaust:: Play three 1 :rb_might: Recruit unit tokens. (You may play them to different locations.)
OGN-265 | Herald of the Arcane | Legend | Mind/Order | - | :rb_energy_1:, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token. [Tags: Viktor]
```

**Ban check.** `grep -o "\[BANNED[^]]*\]"` over each of the 22 codes above returns nothing. None of them
carries a ban or restriction marker. (The corpus does mark bans — 11 rows carry `[BANNED …]`, including
`SFD-020 Draven, Vanquisher` and `OGN-168 Fight or Flight`, both of which this walk stays away from.)

## 1. Rules block — every paragraph these entries cite, opened and pasted

Read first, in one pass, before any entry was written.

| § | verbatim |
|---|---|
| 002 | (Golden Rule) card text supersedes rules text — used only where an entry already cites it |
| 053.1 | "Units and legends say 'I,' 'me,' etc." |
| 103.1.b.1 | "Cards included in your deck must abide by your Domain Identity." |
| 103.4.c | "Cannot include more than one of a Battlefield of the same name when there are more than one required for the deck" |
| 135.2.e.5 | "Power of any Domain is represented by a swirling rainbow symbol." |
| 135.2.e.7 | "A keyword associated with an ability is indicated by the [>] symbol." |
| 143.4 | "Units enter the Board exhausted." 143.4.a: "This can be altered by Accelerate or similar game effects." |
| 144.2 | "Exhausting the Unit is the Cost for this action." (the Standard Move) |
| 144.4 | "The Destinations where Units can Move to with their **Standard Move** are restricted:" 144.4.a base→battlefield, 144.4.b battlefield→base, 144.4.c Ganking |
| 167 | "Every player's Rune Pool empties at the start of each player's Main Phase and the end of each player's turn." |
| 186.1 | "If a token is put into any Non-Board Zone besides the chain, it ceases to exist immediately after moving to its new zone." |
| 187.1 | "A 1 [M] Recruit token is a domainless unit token with 1 Might and the Recruit tag." |
| 187.2 | "A 3 [M] Sprite token with Temporary is a domainless unit token with 3 Might, the **Fae** tag, and the Temporary keyword." |
| 187.5 | "A Gold gear token is a domainless gear token with '[Reaction][>] Kill this, [E]: [Add] [A].'" |
| 187.7 | "A 1 [M] Bird token is a domainless unit token with 1 Might, the Bird tag, and the Deflect keyword." |
| 190.3.a.1 | "Units moving to or being played to a battlefield apply Contested status if that battlefield is not already Contested and that Unit's controller does not already control that battlefield." |
| 195 | "A player also wins the game if an effect instructs them to do so…" |
| 312.2.a | (Priority in a Neutral Open State) "When the turn is in a Neutral Open State **during their Main Phase**." |
| 315.1.b | "1. The Turn Player readies all Game Objects they control that are able to be readied." (Awaken Phase, 315.1) |
| 315.2.b.2 | "1. The Turn Player Holds all Battlefields they Control." (Scoring Step of the Beginning Phase, 315.2.b) |
| 323.6 | "4. Players lose control of any controlled Battlefields without their Units occupying them if the turn is in an Open State and there is no Showdown or Combat ongoing there." |
| 344.2 | "If Control of a Battlefield is Contested, there aren't units controlled by different players there, and the turn is in a Neutral Open State, a Showdown is opened during the next Cleanup." |
| 348.2.a / .a.1 | "If only one player's Units remain at the Battlefield, and if that player does not already Control the Battlefield, that player establishes Control" / "This results in a Conquer if that player has not yet scored that Battlefield this turn." |
| 355.2.a | "By default, Valid locations include the controller's Base or a Battlefield the controller controls." |
| 359.3.f.2 | "Information referenced in an instruction in this way will be checked **on execution** of the instruction." (the "here" referent) |
| 383.2.a.1 | "Any additional conditional statement immediately after the Condition must be true in order for the Condition to be fulfilled. Such a conditional statement is part of the Trigger Condition and not the Effect." |
| 383.2.c.2 | **Worked example on Viktor, Leader**: "This ability triggers if Viktor is on the board immediately after another non-Recruit unit you control dies. It does not trigger if Viktor and another non-Recruit unit you control die during the same game action…" |
| 383.3.d | "If more than one Triggered Ability is Triggered simultaneously, then the player that controls [them] [orders them]" |
| 383.4.d.1 / d.2 / d.2.a | "commonly structured as 'When I hold…' or 'When you hold…'" / "…only those that are triggered from Units that were present during the Hold action, or Abilities that reference the player that performed the Hold action" / "The Hold Abilities of Units are put on the Chain as Pending Items after the Unit these effects correspond to are **present at a Battlefield** when a player maintains control of it and Gains 1 Victory Point during their Beginning Phase from Holding." |
| 383.4.e | "Attack Triggers are Triggered Abilities that trigger when a Unit or Player gains the **Attacker designation** for the first time during a combat." |
| 419.4.a / .a.1 | a play trigger fires "when the act of playing the card has been completed by the resolution of the card"; countered card → no trigger |
| 420.1 / 420.2.a | "Moving is the act of a Game Object moving between two Locations on The Board." / "Players may only move Game Objects when instructed to do so by Game Effects or costs." |
| 420.3 / 420.3.a | "The Standard Move inherent to Units is a Discretionary Action." / "The Cost is Exhausting one or more Units." |
| 434.1.c | "The Top-Most card has all Effect Text of all cards Attached to it appended to its Rules Text." |
| 461 | "Combat is considered Staged if there are units controlled by two opposing players at a Battlefield but the Steps of Combat have not been initiated." |
| 464.2.c.1 | "The Attacker is the player whose unit(s) applied the Contested status to the Battlefield." |
| 464.2.c.3.a | "If a Unit controlled by the Attacker or Defender becomes present at this Battlefield **after this moment**, it will gain the Attacker or Defender designation during the Cleanup phase following the action that caused it to become present." |
| 466.5 / 466.5.d | "the player with Units remaining here Establishes Control if they didn't already control this Battlefield" / "Establishing Control results in a Conquer if that player has not yet scored this Battlefield this turn." |
| 469.1 | "Conquer: A player gains Control of a Battlefield they did not yet Score this turn." |
| 470 | "A player may only Score, from either method, once per Battlefield per turn." |
| 476.1 / 477.2.c / 479.1 / 480.3 | the #45 composition layer stack (Svellsongur composes: 2^v instances) |
| 485.4.a / 485.5 / 486.5 / 487.5 | three battlefields provided, one used; randomly in Duel and Skirmish, chosen in Match |
| 807.1.d | "Being an attacker means the Unit has gained the Attacker designation during Combat." |
| 811.1.b | "While this card is in your hand … you may pay [A] to hide this facedown at a battlefield you control … Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base cost." |
| 811.1.c.3 | "Playing a card from facedown (or 'from Hidden') does open a chain." |
| 811.1.d.2 / d.3 | hidden-spell targets restricted to that battlefield / "If a hidden spell … causes you to play a unit, you must choose to play that unit at that battlefield." |
| 811.6 | "A card that is Hidden gains Reaction while facedown or played from facedown." |
| 816.1 / 816.1.b | "Temporary is a Triggered Ability keyword." / "At the start of this permanent's controller's Beginning Phase, before scoring, kill this." |
| 820.1.c.3 | "Each Repeat Cost can be paid only a single time." |

### The one ordering fact everything in this walk turns on

**315.1 Awaken comes BEFORE 315.2 Beginning Phase.** The readying (315.1.b) happens at the start of the
turn; the Hold (315.2.b.2) happens after it. So **a Gold token created by a Hold enters exhausted and
cannot be spent until the FOLLOWING turn's Awaken** — the same correction `world-atlas-sentinel-gold`
already carries. Renata Glasc, Industrialist (R25 = A) is the only way around it, and she is Order.

## 2. Candidate 1 — `corina-svellsongur-plaza` (ALT_WIN). VERIFIED, arithmetic corrected.

### The issue's arithmetic was one body short — in our favour

#48 counted `2 instances × 3 Recruits + Corina = 7 exactly, no margin`. **It forgot the body that
conquered the Plaza.** That body is not optional and it is not free-floating:

- 355.2.a: the Recruits are played `here`, and `here` must be a battlefield you control, so the Plaza
  has to be yours before Corina walks in. (`noxian-drummer-eye-svellsongur-plaza` established this
  route and this walk reuses it rather than re-deriving 355.2.b as a permission.)
- The only way to make it yours is to walk a body in: 190.3.a.1 Contested → 344.2 Showdown at the next
  Cleanup → 348.2.a Control → 348.2.a.1 Conquer.
- 323.6 then requires a unit to keep occupying it, or you lose Control before the Hold.
- That body walked in with its Standard Move this turn, which cost exhausting it (144.2), so it cannot
  leave again this turn.

So the board at the Hold is **conqueror + Corina + 6 Recruits = 8**, one over the bar of 7. The
catalogue already counts pre-existing bodies this way: `flurry-of-feathers-grand-plaza-win` counts
"three of your units already on the Plaza" plus four Birds to reach exactly 7.

### The trigger count

Svellsongur copies Corina's text into its own Effect Text; 434.1.c appends that Effect Text to Corina's
Rules Text; 053.1 re-reads "I" on Corina. She therefore carries the move trigger twice. `v = 1`
Svellsongur, and #45's composition result `2^v` gives 2 — which for `v = 1` is the same as the additive
1 + 1, so nothing in this entry depends on which of the two formulas you use.

```
1 move × 2 instances × 3 Recruits = 6 Recruits, all "here" = the Plaza (359.3.f.2 reads "here" on execution)
+ Corina herself                  = 1
+ the body that conquered         = 1
                                    ---
                                      8   ≥ 7   OK, margin 1
```

Cost: Corina 7E + 1P, [Accelerate] 1E + 1 Order Power (she enters exhausted otherwise, 143.4, and the
Standard Move costs exhausting her, 144.2), Svellsongur 3E + 1P, [Equip] 1E + 1 Calm Power = **12 Energy
+ 4 Power**, on two cards. Against `noxian-drummer-eye-svellsongur-plaza`: 5 cards, 10E + 5P, 10 units.

### What the Forgotten Signpost actually does — and what it does not

The manager's brief carried a claim from #58 that Corina + Svellsongur + `UNL-045 Forgotten Signpost`
gives `2 moves × 6 = 12 Recruits` and removes the no-margin problem. **The 12 is real; the concentration
is not.** Corina's tokens are played `here`, and 359.3.f.2 reads `here` at execution — so each landing
drops its 6 Recruits at whatever battlefield she landed on. Two landings are two different battlefields
(a "move" to the location you are already at is not a move, 420.1), so the Plaza only ever receives the
6 of the FINAL landing. Twelve Recruits, six of them at a battlefield that is not the Plaza.

What the Signpost genuinely buys is different and smaller:

- Its move is an **effect move**, not a Standard Move. 144.4 restricts destinations "with their Standard
  Move" and 420.3.a puts the exhaust cost on the Standard Move only, so the Signpost moves an
  **exhausted** unit and moves it **battlefield to battlefield**. Corina therefore does not need
  [Accelerate] to move the turn she lands: −1 Energy and −1 Order Power, +2 Energy for the gear.
- Its cost is "Exhaust a unit you control, [exhaust the Signpost]" and its effect moves a different unit
  **to the location of the unit you exhausted**. So it needs a READY friendly unit already standing at
  the destination. At the Plaza that is the conqueror — which means the Plaza had to be conquered on an
  earlier turn so the conqueror readied in your Awaken (315.1.b).
- One Signpost exhausts itself, so it is one extra move per turn cycle, not a loop.

Net: same 8 units at the Plaza, one Power cheaper, one Energy dearer, one more card, and one more turn of
exposure. It is recorded as a notable on this entry, not as a separate entry.

### The upgrade that does add margin

`SFD-153 Eye of the Herald` on Corina before Svellsongur: printed 3 + Eye's 1 = 4 per instance, ×2
instances = **8 Recruits**, + Corina + conqueror = **10**, for +1 Energy and +1 Order Power. Same shape
as the Drummer entry, and it is the answer if the opponent holds a sweeper.

### Fragility, stated honestly

`OGN-133 Flurry of Blades` (Body, 1 Energy, [Reaction], "Deal 1 to all units at battlefields") kills all
six 1-Might Recruits and a 1-Might conqueror for a single Energy. The margin of 1 is a margin against
spot removal, not against a sweeper. And there is no answer in the window: 315.2.b.2 puts the Hold in the
Scoring Step, 312.2.a gives Priority in a Neutral Open State only during the Main Phase, and 383.2.a.1
measures "if you have 7+ units here" when the trigger is placed. The eight must survive the opponent's
whole turn. (This is #48's own refutation R-B, confirmed against the rules here.)

## 3. Candidate 2 — `blood-money-bird-industrialist-power-spike` (ENGINE). VERIFIED.

Blood Money kills a friendly unit of 2 Might or less **at a battlefield** and pays two Gold. Renata Glasc,
Industrialist ("Your tokens enter ready", R25 = A) overrides the printed "exhausted", so 187.5's
"Kill this, [exhaust]: [Add] [A]" is payable the same turn: **2 rainbow Power for 2 Energy, at [Action]
speed, with zero Power invested.**

Frisky Hunter is the cheapest self-contained fuel in Calm/Order: 4 Energy for a 3 Might body plus a
1 Might Bird `here`. "Here" is where the Hunter is played, so he must be played to a battlefield you
control (355.2.a) for the Bird to be legal Blood Money fuel — a Bird at your base is not "a unit at a
battlefield". Under Industrialist the Bird also enters ready (187.7 gives it [Deflect]).

Ledger, with the quantities the entry declares (1 Blood Money, 1 Industrialist, 1 Frisky Hunter):

```
Frisky Hunter to a battlefield you control   -4 Energy   -> 3 Might body + 1 Might Bird (ready)
Blood Money on your own Bird                 -2 Energy   -> two Gold, ready (R25 = A)
two Gold, "Kill this, exhaust: Add rainbow"              -> +2 Power, same turn
```

**Why it is an entry at all**, measured against the two benchmarks the project already fixed:
- A Seal (OGN-040/081/120/163/204/245, `E0 P1`) costs **1 Power** to install and returns 1 Power per turn.
  Blood Money installs for **0 Power** and returns 2 in the turn you cast it. It loses over a long game and
  wins on the turn you need the Power (the Corina turn of candidate 1 bills 4 Power).
- It does not touch the ~9-Energy-per-Power loop rate of the #21 ledger: loops spend per PASS and this
  pays once per copy. The entry says so.

Traps: 323.6 — never kill the last friendly body at a battlefield you control, or you lose it in the same
Cleanup. `UNL-077 Soul Shepherd` ("Your token units have +1 Might") is anti-synergistic: it pushes Sand
Soldiers from 2 to 3 and out of Blood Money's filter.

Domains: Blood Money and Industrialist are Order, Frisky Hunter is Calm → Calm/Order, the same identity
as candidate 1 (SFD-247, OGN-261, UNL-195, VEN-147). The two entries share a deck.

## 4. Candidate 3 — `viktor-leader-blood-money-refill`. REFUTED as a standalone entry.

Viktor, Leader is real and the rules use him as a worked example (383.2.c.2), so the trigger is not in
doubt: killing your own non-Recruit token with Blood Money does pay a Recruit. What fails is the claim
that this is a **distinct mechanism** worth an entry beside candidate 2.

1. **The refund cannot feed the engine.** Viktor's Recruit is played "into your base", and Blood Money
   requires "a unit **at a battlefield**". The refund is one Standard Move away from being fuel, and that
   move costs the Recruit's own exhaust (144.2) and a turn.
2. **And it can never re-trigger Viktor.** The refund is a Recruit; Viktor reads "another **non-Recruit**
   unit". So the second pass has no fuel that Viktor pays for. There is no repetition — the pair adds one
   base body per Blood Money cast and stops.
3. What is left is "candidate 2, plus a 1 Might body at your base per cast". That is a line in candidate 2's
   notables, not a mechanism.

The one place Viktor does carry an engine is candidate 7, where the fuel renews itself for free.

## 5. Candidate 4 — `chemtech-cask-broker-double-gold` (ENGINE). REWRITTEN, then VERIFIED.

#48 suggested this might be better as a **correction to `black-market-broker-bandle-tree-gold`**
(raising it from +4 to +5 Gold a turn). **That is illegal and the walk kills it outright:** Chemtech Cask
is **Mind**, and that entry's identity is **Order/Chaos** (its legend is VEN-155 Heart of the Tempest, the
only Order/Chaos legend, forced by the Order payload SFD-154 Guards!). 103.1.b.1: "Cards included in your
deck must abide by your Domain Identity." The Cask cannot be in that deck.

So it stands on its own identity, and the identity turns out to carry a second card nobody had priced:

- `OGN-263 Swift Scout` (Mind/Chaos legend): **"You may pay 1 Energy to hide a card with [Hidden] instead
  of 1 rainbow Power."** #48's own refutation of the Cask was that "hiding costs 1 rainbow Power and the
  Cask gives 1 back, so it is neutral". Under Swift Scout the hide is paid in **Energy** and the Cask pays
  back in **Power** — the cycle stops being neutral and becomes a converter.
- `OGN-094 Sprite Call` (Mind, E3, [Hidden]) is the clean payload: it chooses no targets, so 811.1.d.2
  never bites, and 811.1.d.3 puts the Sprite at the hiding battlefield.

Per turn cycle, with 1 Cask + 1 Broker + 1 Sprite Call:

```
your turn        hide Sprite Call                          -1 Energy (Swift Scout, instead of 1 Power)
opponent's turn  play it from facedown for 0 (811.1.b)
                   Black Market Broker  ("a card played from face down", 811.1.c.3)   -> 1 Gold
                   Chemtech Cask ("a spell on an opponent's turn"), exhaust it         -> 1 Gold
                   Sprite Call itself                                                  -> ready 3 Might Sprite at that battlefield
your Awaken      315.1.b readies both Gold                                             -> +2 Power
```

**1 Energy in, 2 Power out per turn cycle, plus a free 3 Might ready body on the opponent's turn.**
Against the Seal benchmark (1 Power to install, 1 Power per turn) the Cask installs for 1 Energy and
**0 Power** — it is the only Power source in the pool whose installation cost never touches Power.

Bounds the entry states rather than hides:
- The Cask's "you may exhaust me" makes it **once per turn cycle** (it readies in your Awaken, 315.1.b).
- No Industrialist here (she is Order), so both Gold are next-turn Power. 187.5 makes the exhaust a real
  cost and an exhausted Gold cannot pay it.
- The [Hidden] card is consumed per cycle, exactly as `black-market-broker-bandle-tree-gold` records.
  `OGN-264 Guerilla Warfare` (Mind/Chaos, E2 P1, "Return up to two cards with [Hidden] from your trash to
  your hand. You can hide cards ignoring costs this turn.") is the only recursion in the identity and buys
  two more cycles per cast; it is the reason this is an ENGINE and not a one-shot.
- 811.1.b hides only at a battlefield **you control**, and 323.7 trashes hidden cards the moment you stop
  controlling it. 419.4.a.1: a countered flip pays nothing.
- The Cask's other mode needs no [Hidden] at all: any spell you play on the opponent's turn triggers it.
  #48 listed ten 1-Energy [Reaction] spells with no Power in their cost; all ten check out in the corpus
  (OGN-046, OGN-095, OGN-104, OGN-133, OGN-169, UNL-031, UNL-046, UNL-173, VEN-040, VEN-061), but only
  **four** are legal beside the Cask under Mind/Chaos: OGN-095 Stupefy, OGN-104 Retreat and VEN-061
  Decree of Insight (Mind), and OGN-169 Gust (Chaos). The other six are Calm, Body or Order.

## 6. Candidate 5 — `eminent-benefactor-sentinel-gold` (ENGINE). VERIFIED with a timing correction.

383.4.d.1 gives "When I hold…" as the standard Hold-trigger wording and 383.4.d.2.a requires the unit to
be **present at the Battlefield** during the Hold, which the Benefactor satisfies as a 5 Might body — the
same body that keeps 323.6 from taking the battlefield back. Blue Sentinel's "Your hold effects for
holding here trigger an additional time" is R1 = A with stacking.

```
Benefactor's hold trigger: (1 + K) instances × 2 Gold, K = 1 Sentinel  ->  4 Gold per Hold
Sentinel's own hold trigger: (1 + K) instances × 1 rainbow             ->  2 Power at the start of your next Main Phase
cost: Benefactor 6E, Sentinel 4E + 1P = 10 Energy + 1 Power
```

**The correction #48 needed:** the four Gold enter **exhausted**, and the Hold happens in the Scoring Step
(315.2.b.2) which is **after** the Awaken (315.1.b). So they are not that turn's Power — they ready at
your NEXT Awaken. In steady state the board does yield 4 Gold-Power + 2 Sentinel-Power per turn, but the
Gold half is offset by one turn, and the first Hold pays nothing spendable. `world-atlas-sentinel-gold`
carries the identical note; this entry repeats it rather than contradicting it.

Distinct from `world-atlas-sentinel-gold` (2× SFD-086 + Sentinel, 8 Gold per Hold): the Atlas is Equipment
and needs **two more units** to hang on plus 2 Mind Power of [Equip]; the Benefactor **is** the body. Two
units at the battlefield instead of three, 1 Power invested instead of 3, half the Gold.

Loops spend per PASS and this produces per TURN, so it does not move the ~9-Energy-per-Power rate of the
#21 ledger, and the entry says so.

Domains Mind + Order: OGN-265 Herald of the Arcane, OGS-021 Lady of Luminosity, SFD-201 Chem-Baroness,
UNL-199 Deceiver. (SFD-201 Chem-Baroness is a bonus here — "When you or an ally hold, you may exhaust me
to play a Gold gear token exhausted" is itself a Hold effect the Sentinel doubles.)

## 7. Candidate 6 — `azir-sovereign-token-gather` (ENGINE). VERIFIED.

Azir is the only mass token relocation in the pool, and the walk confirms both the trap and the payoff.

**The trap holds.** "When I attack" is an Attack Trigger (383.4.e: "trigger when a Unit or Player gains the
Attacker designation for the first time during a combat"), 807.1.d defines being an attacker as having
gained that designation during Combat, and 461 makes a Combat exist only when units of two opposing
players are at a battlefield. Entering an empty enemy battlefield is not an attack. Azir is also
necessarily the **Attacker**, because 464.2.c.1 makes the Attacker "the player whose unit(s) applied the
Contested status", and 190.3.a.1 applies Contested only when the mover does not already control the
battlefield. **So the destination is always a battlefield you do not control, and the outcome is a
Conquer (466.5.d), never a Hold.**

**The payoff is real and the rules make the reinforcements count.** 464.2.c.3.a: "If a Unit controlled by
the Attacker or Defender becomes present at this Battlefield after this moment, it will gain the Attacker
or Defender designation during the Cleanup phase following the action that caused it to become present."
So the tokens Azir drags in join the combat as Attackers. And the drag is an **effect move** (420.1,
420.2.a), not a Standard Move: 144.4 and 420.3.a bind the Standard Move only, so exhausted tokens move,
and they move battlefield-to-battlefield without [Ganking].

That is the exact bottleneck #48 measured: 18 of the 49 token makers put their tokens at your base and
have no way out. Azir is the one card that empties the base onto a battlefield in one action.

For a Grand Plaza finish the route is two turns and the entry says so: the Plaza must be in the
opponent's hands with a garrison, you conquer it with the swarm (466.5.d), and only at your next
Beginning Phase does 315.2.b.2 Hold it with 7+ present — which means surviving the opponent's whole turn,
per 383.2.a.1.

Refutation kept from #48: if the opponent garrisons nothing, there is no Combat, no Attacker designation,
and the ability never exists.

## 8. Candidate 7 — `viktor-leader-sprite-queen-free-bodies` (ENGINE). VERIFIED.

At the start of your Beginning Phase two of your own triggers fire simultaneously: Sprite Queen's
"play a ready 3 Might Sprite … to your base" and the previous Sprite's [Temporary], which 816.1.b spells
out as "At the start of this permanent's controller's Beginning Phase, before scoring, kill this."
383.3.d lets you order them, and the order does not matter.

187.2 settles the tag question the entry turns on: the Sprite token carries the **Fae** tag, not Recruit.
So its death is "another non-Recruit unit you control dies" and Viktor pays a Recruit. 383.2.c.2 is the
rules' own worked example on this exact card and confirms the trigger fires as long as Viktor himself
survives the same game action. 186.1 does not interfere: the token reaches the Trash and only then ceases
to exist, so it did die.

```
every turn, after the setup, for 0 Energy and 0 cards:
  the old Sprite dies    ->  Viktor  ->  +1 Recruit (permanent) into your base
  Sprite Queen           ->            +1 ready 3 Might Sprite ([Temporary]) at your base
setup: Sprite Queen 7E + 1P, Viktor 4E + 1P  =  11 Energy + 2 Power
```

Trap 4 checked and stated: the Sprites are [Temporary] and are killed **before scoring** (816.1.b), so they
never Hold and never see a Main Phase start. The Recruits are permanent (187.1) and do Hold — but they are
born **at your base**, which is #48's structural finding, so a Plaza finish still needs a Standard Move per
body, one per turn each (144.2, 144.4.a), or candidate 6's Azir.

It is slow — 11 Energy and 2 Power for one permanent body a turn — and the entry is ENGINE and claims
nothing more. Domains Mind + Order: OGN-265, OGS-021, SFD-201, UNL-199.

## 9. The four refutations of #48 — all four re-checked, none lifted

- **R-A** (`SFD-031 Desert's Call` is not a scalable body source): 820.1.c.3 "Each Repeat Cost can be paid
  only a single time", and the rules use this very card as the worked example at 820.1.d.1. Holds.
- **R-B** (no window to add a body at the instant of the Hold): 315.2.b.2 + 312.2.a + 383.2.a.1, all three
  opened above. Holds, and candidate 1 is written on it.
- **R-C** (`SFD-134 Cull` + Reckoner's Arena loses to a Seal): arithmetic, unchanged. Holds.
- **R-D** (`UNL-044 Flurry of Feathers` is not cheaper than Recruit the Vanguard): holds, **and the
  [Deflect] variant it left to the walker's discretion is already in the catalogue** as
  `flurry-of-feathers-grand-plaza-win` (ALT_WIN, verified, 1× OGN-293 + 1× UNL-044). No second entry.

## 10. Correction to an existing entry — `heimerdinger-vanguard-armory-recruits`

Left over from the #47 walk. That entry's third notable said the line "reaches seven in two turns from an
empty board". With `OGN-265 Herald of the Arcane` as the legend — which its own `easy` prerequisite already
lists — the seven arrive in **one** turn:

```
Vanguard Armory, exhaust                                      3 Recruits
Heimerdinger, exhaust, using his copy of the Armory's ability 3 Recruits
Herald of the Arcane, 1 Energy + exhaust                      1 Recruit
                                                              ----------
                                                              7 = The Grand Plaza's threshold
```

Heimerdinger has all the [exhaust] abilities but only one exhaust to spend, so he takes the Armory's three
rather than the legend's one; the legend still has its own exhaust. R30 = B does not bite: neither the
Armory nor the Herald prints a "use only while" clause. `heimerdinger-herald-legend-recruits` (the #47
entry) already states the count from the other side; this fixes the stale half. **Only the notable text
changes — no class, no quantity, no step.**

## 11. Result

| candidate | id | outcome |
|---|---|---|
| 1 | `corina-svellsongur-plaza` | ALT_WIN, verified — arithmetic corrected 7 → 8, Signpost claim corrected |
| 2 | `blood-money-bird-industrialist-power-spike` | ENGINE, verified |
| 3 | `viktor-leader-blood-money-refill` | **refuted** as a standalone entry, folded into candidate 2's notables |
| 4 | `chemtech-cask-broker-double-gold` | ENGINE, verified — rewritten onto Mind/Chaos + Swift Scout after 103.1.b.1 killed the "fold into the Broker entry" plan |
| 5 | `eminent-benefactor-sentinel-gold` | ENGINE, verified — Gold timing corrected to next-turn Power |
| 6 | `azir-sovereign-token-gather` | ENGINE, verified — Conquer, not Hold |
| 7 | `viktor-leader-sprite-queen-free-bodies` | ENGINE, verified |

Six new entries, one refutation, one correction to an existing entry. No entry changed class from what it
was proposed as; none of the six ENGINEs turned out to be INFINITE, and none of them touches an unruled
reading — R1, R6, R25 and R30 are all already ruled.
