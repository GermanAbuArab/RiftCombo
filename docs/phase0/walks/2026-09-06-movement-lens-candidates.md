# Hand walks — the movement lens (issue #58)

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16
**Result: 8 entries HOLD (7 candidates of #58 + Bard, Mercurial, unblocked by the retirement of R31).
0 refuted. 3 of the 8 required a correction to the candidate's own arithmetic or sequencing.**

All eight are **ENGINE**, so the bar is *"the mechanism produces what the entry says"*, not *"reaches 8"*.
None of them was pushed to a higher class: the two that touch a win condition (candidate 5 and Bard) do
so by feeding an existing ALT_WIN entry, and that is written as a cross-reference, not as a class.

---

## Step 2 done first, in bulk: every citation opened

The 2026-09-04 citation audit found three entries citing a rule that said the opposite of the claim, so
before walking anything, every rule number these eight entries cite was pulled out of
`data/Riftbound-Core-Rules-2026-07-16.txt` and read. **63 distinct citations, all 63 say what the entry
says they say.** The two that needed the most care, because the issue paraphrased them, are recorded
here:

| what #58 wrote | what the rule actually says |
|---|---|
| "**447.2** — la única lista de destinos inválidos para *Moves of all kinds*" | 447.2 is *"The Destination is where the Permanent is going to."* The list is in **447.2.a** (multiplayer combats) and **447.2.b** (a teammate's battlefield). The conclusion is unchanged; the paragraph number is one level too shallow and the entries cite the sub-rules. |
| "**190.4.c** … pierde Control en el cleanup siguiente" | 190.4.c ends *"**unless there is a Combat or Showdown ongoing there**"*, a clause #58 dropped. It does not change R4 (which dies to 470 anyway) but it is load-bearing for candidate 6, so the entries cite the whole sentence. |

Ban check, same pass: all **24 distinct cards** named across the eight entries and their alternative
tables were grepped for the `[BANNED` marker in `data/corpus_flat.txt`. **None is banned or restricted
in any format.** The two banned cards of this lens — `OGN-168 Fight or Flight` and
`OGN-285 Reaver's Row` — appear only in #58's refutation table and in no entry.

Card text: every line below was grepped verbatim out of `data/corpus_flat.txt`. All 24 matched #58's
transcription character for character.

---

## The rule #58 never cited, and it decides half the lens

> **323.10** — *"7a. If Units of two opposing players are no longer present at a Battlefield that has a
> Combat Staged before it has opened, the Combat will cease being Staged."*

#58 built its whole S3 on two paths — evacuate **before** entering (no Combat is ever staged, 323.9) or
evacuate **inside** an open Combat (the damage step is cancelled, 465.1). 323.10 is the third path, and
it is the one candidate 6 actually uses: a Combat that is already **Staged** un-stages itself if the
garrison leaves before it opens.

**And that path is only reachable by a Triggered Ability, which is exactly why the ordering of
candidate 1 cannot be reversed.** The reason is the state machine:

- **310.1** *"Neutral Open: There is no Showdown or Combat in progress and no Chain exists."* ·
  **310.2** *"Neutral Closed: There is no Showdown or Combat in progress and a Chain exists."*
- **323.13** *"10. **If the current state is a Neutral Open State** and one or more Combats are Staged at
  Battlefields, the Turn Player chooses one of those Battlefields. Combat begins there."*
- **453** *"When a Move action is complete, perform a Cleanup."* · **319.3** a Cleanup is also
  outstanding *"After a Pending Item is added to the Chain"* · **320** *"While a Cleanup is occurring,
  Chain Items cannot be Finalized or Resolved."*

So: you move a unit into a garrisoned battlefield and the very next Cleanup marks the Combat (323.9)
**and opens it** (323.13), because the state is Neutral Open. There is no window in between. A spell
with neither [Action] nor [Reaction] can never be played there — **155**: *"A spell can be played
during an Open State **outside of Showdowns** on its controller's turn"* — and `OGN-043 Charm` is such
a spell. **Candidate 1 must evacuate first and enter second; the reverse order is illegal, not merely
worse.** #58 wrote the correct order but did not say why the other one is closed.

A Triggered Ability escapes this because the trigger is itself a Chain item: while it sits there the
state is **Neutral Closed** (310.2), 323.13 does not fire, and when it resolves and empties the
garrison, the next Cleanup reaches 323.10 and un-stages the Combat. That is candidate 6, and it is the
only line in this issue that gets a Conquer out of a battlefield that was garrisoned when it was
entered, without a Combat ever opening.

---

## The three rules that carry the "conquer without damage" family

Opened and read, in the order the game applies them:

| rule | verbatim | what it does here |
|---|---|---|
| **464.2.e** / **464.2.e.1** | *"4. Add items to the Combat Chain if establishing Attacker and Defender has caused Triggered Abilities to become Pending."* / *"The Attacking player, who has Focus, places Triggered Abilities on the Chain first, followed by all non-Defender players in Turn Order, followed by the Defending Player."* | The attack trigger of candidates 2 and 3 resolves **inside Step 1**, before Step 2 exists. And since the Defender's triggers go on **last** and **340.1** resolves *"The newest Finalized Chain Item"* first, a defender's `When I defend` (candidate 4) resolves **before** the attacker's `When I attack`. |
| **465.1** | *"If both Attacking and Defending units remain at this battlefield, the following Tasks become Outstanding, in the specified order:"* | With the garrison gone, the Combat Damage Step has no tasks at all. **465.3**: *"Skip the FEPR process and cancel any outstanding tasks. Proceed to the Resolution Step."* |
| **466.3.a** / **466.5** / **466.5.d** | *"A Player has won a combat if they received either the attacker or defender designation and are the only Player that has units remaining at this battlefield during this step."* / *"If no Showdown or Combat is staged at this location, the player with Units remaining here Establishes Control if they didn't already control this Battlefield."* / *"Establishing Control results in a Conquer if that player has not yet scored this Battlefield this turn."* | The Conquer. **471.1**: *"The player Gains up to one Point, depending on their current score."* |

And the corollary #58 asked for, verbatim: **466.1.a.2** — *"Insert '3d. Recall Attackers present at the
Battlefield if Defenders are still present.'"* Emptying the **attackers** (candidate 4) therefore buys
only *not taking damage*; the survivors were going home anyway. It is written into that entry.

**Trap 1 is respected in all eight.** Nothing here declares an attack on an empty battlefield.
Candidates 1 and 6 conquer with **no Combat at all** (323.9 never marks one, or 323.10 un-marks it), so
no Attacker designation is ever handed out (464.2.c.3) and no `When I attack` is claimed. Candidates 2
and 3 attack a battlefield that **has** a garrison at the moment Combat opens, which is precisely what
383.4.e / 807.1.d / 461 require.

---

## R31 is retired, and the evidence is Riot's own errata

#58 filed `open battlefield` as a reading to be ruled (its R-A, the project's R31): the term is printed
on five cards — `OGN-174 Sai Scout`, `OGN-176 Sneaky Deckhand`, `OGN-193 Miss Fortune, Buccaneer`,
`SFD-079 Bard, Mercurial`, `VEN-115 Ocean Drake` — and a grep of both rules files returns no
definition. The reading never needed a vote. **`data/errata.json`, Spiritforged errata of 2026-01-14
(`https://playriftbound.com/en-us/news/rules-and-releases/riftbound-spiritforged-errata`), rewrites
Yone, Blademaster's `"When I conquer an open battlefield,"` as `"When I conquer a battlefield that was
uncontrolled,"`.** Riot itself translated the word: **open = without a Controller**, reading A, not
"without units".

**Scope, and it rides in the Bard entry rather than being hidden here.** Yone's is a **conquer** text;
the five surviving cards are **play** and **move** texts, and Riot has not reworded them. So the errata
is direct evidence of what Riot means by the word, not a rewrite of the five cards. The project rule
that produced this — *before filing a reading over an undefined printed term, grep `data/errata.json`
and the four set FAQs* — is what found it.

Two consequences, both used below:

- **190.1** *"Control is established over Battlefields through the course of play"* → at the start of a
  game **both** battlefields of a Duel are open. That is the window Bard needs.
- **323.6** *"Players lose control of any controlled Battlefields without their Units occupying them if
  the turn is in an Open State and there is no Showdown or Combat ongoing there"* → emptying an
  opponent's garrison makes their battlefield open again, which is what candidates 1, 3 and 6 produce.
  `OGN-193 Miss Fortune, Buccaneer` (*"Friendly units may be played to open battlefields"*) is the card
  that turns that state into a play permission, and 355.2.b is the rule that lets it
  (*"Some Game Effects may grant players permission to play Units to locations that are not normally
  Valid"*).

---

# 1. `charm-evacuate-conquer` — HOLDS, with the ordering made mandatory

`OGN-043 | Charm | Spell | Calm | E1 P1 | Move an enemy unit.`

**Who picks the destination.** **355.4**: *"For Spells and Abilities that Move one or more Units, choose
a valid Location as the Move Destination for each Move that will be performed."* Charm names no
destination, so its controller chooses. Their own base is the clean choice; **323.7** (*"Recall all …
Permanents and Runes in Bases other than their controller's"*) is why moving it to **your** base
achieves nothing.

**The walk.** Opponent controls B with exactly one unit.

1. Main Phase, Neutral Open State (310.1). Play Charm — 155 permits it only here. The unit goes to their base.
2. Cleanup: **323.6** strips their Control of B, because it now has none of their units, the turn is in an Open State and nothing is ongoing there. B is uncontrolled — "open" under the retired R31.
3. Standard-Move one of your ready units from your base into B: **144.4.a** allows base→battlefield, **144.2 / 420.3.a** charge its own exhaust.
4. **450** / **190.3.a.1** → you apply Contested.
5. Cleanup: **323.8** stages a Showdown. **323.9** stages **no** Combat — it requires *"Units present controlled by opposing players"* and there are none. **323.12** opens the Showdown.
6. **345** gives you Focus; **348** closes it when everyone passes; **348.2.a** gives you Control; **348.2.a.1** *"This results in a Conquer"*; **471.1** the point.

**The ordering is not a preference.** Entering first and Charming second is illegal: after your move,
the Cleanup marks the Combat (323.9) and 323.13 opens it in the same Cleanup, because the state is
Neutral Open — and once a Showdown is in progress, 155 bars Charm (it carries neither [Action] nor
[Reaction]). This is the correction the walk adds to #58's candidate.

**Arithmetic against its own declared quantities.** One Charm moves **one** unit, so the line closes
against a garrison of exactly **1**. **1 Energy + 1 Calm Power**, plus a Standard Move you already had.
Against 2+ defenders Charm empties nothing and entering stages a real Combat.

**The alternatives, priced, and the domain warning.** All five are uncatalogued and unbanned, and
**103.1.b.1** means they are not interchangeable inside one deck — each is listed with its domain:

| card | domain | cost | how many it removes |
|---|---|---|---|
| `OGN-043 Charm` | Calm | E1 + 1 P | 1 |
| `UNL-124 Isolate` | Chaos | E2 | 1 (+1 card if one enemy is left alone) |
| `UNL-038 Skyward Strike` | Calm | E2 + 1 P | 1 |
| `SFD-129 Temptation` | Chaos | E2 (+E2 [Repeat]) | 2 — **820.1.c.3** *"Each Repeat Cost can be paid only a single time"* |
| `UNL-107 Stare Down` | Body | E2 | **all** enemies at one battlefield under a chosen friendly unit's Might, +1 XP |
| `UNL-054 Tricksy Tentacles` | Calm | E4 + 1 P | **all** of one controller's, up to 8 total Might |

`UNL-107 Stare Down` is the one that scales, and it is the Body twin of this entry rather than a
version of it.

**Traps.** No attack anywhere (the whole point). No Awaken Energy held across a phase (167). No
[Repeat] except in the alternatives table, where 820.1.c.3 is quoted. No [Temporary]. No recall used as
a move (456). Charm's Power is paid the ordinary way; nothing here recycles a rune for it (161.2.b).

**Verdict: HOLDS → verified, ENGINE.**

---

# 2. `sinister-poro-attack-evacuate` — HOLDS as written

`UNL-137 | Sinister Poro | Unit | Chaos | E2 P1 M1 | When I attack, you may pay :rb_energy_1: to move an enemy unit here to its base. [Tags: Poro, Shadow Isles]`

**The timing closes inside Step 1.** The Poro moves in, **323.9** stages the Combat (opposing units are
present, so trap 1 is satisfied), **323.13** opens it, **464.2.c.1** makes you the Attacker and
**464.2.c.3** hands the Poro the designation — which is exactly what **383.4.e** requires
(*"Attack Triggers … trigger when a Unit or Player gains the Attacker designation for the first time
during a combat"*). **464.2.e** puts the trigger on the Combat Chain. It resolves, the defender goes
home, and only then does the game reach **465.1**, whose condition now fails: no damage, in either
direction. **466.3.a** wins it, **466.5** / **466.5.d** convert it to a Conquer. **466.1.a.2** does not
recall the Poro, because it fires only *"if Defenders are still present"*.

**Arithmetic against its own declared quantities.** One trigger per attack, one unit per trigger. A
garrison of *k* needs *k* Poros attacking together — **144.3** (*"Players may perform multiple Units'
standard move simultaneously. This is treated as one game action performed on multiple Units"*) with
**144.3.a** forcing the shared destination, which is what you want. **103.2.b** caps it at 3 copies.

```
garrison 1  ->  1 Poro,  1 Energy of triggers  ->  Conquer, no damage
garrison 2  ->  2 Poros, 2 Energy of triggers  ->  Conquer, no damage
garrison 3  ->  3 Poros, 3 Energy of triggers  ->  Conquer, no damage
garrison 4  ->  impossible: 103.2.b caps the deck at 3
```

Per Poro: **2 Energy + 1 Chaos Power** once, **1 Energy per defender evacuated**.

**What refutes it, and it belongs in the entry.** The trigger sits on the Combat Chain, so the defender
gets Focus windows (**347**: *"the player with Focus may … Play a Card or Activated Ability that is
legally timed"*) to add a body or kill a 1 Might unit. If a single defender survives, 465.1 is met and
the Poro dies to any damage. And **UNL-163 Mageseeker Investigator** (Order, E4 M4) is the printed
answer: *"Opponents must pay :rb_rune_rainbow: for each unit beyond the first to move multiple units to
my battlefield at the same time"* — it taxes exactly the 144.3 simultaneous move this entry needs.

**Verdict: HOLDS → verified, ENGINE.** No correction.

---

# 3. `corrupted-dragon-mass-evacuate` — HOLDS as written

`VEN-091 | Corrupted Dragon | Unit | Body | E10 P2 M10 | If your score is not within 3 points of the Victory Score, I enter ready. When I attack, you may move any number of enemy units here each with 5 :rb_might: or less to their base. [Tags: Dragon, Shadow Isles]`

**The condition, resolved against the rule.** **485.3** *"Victory Score: 8"*. *"Not within 3 points of
8"* is a score of **4 or less**, and at 0–4 the Dragon enters ready — **143.4** (*"Units enter the Board
exhausted"*) with **143.4.a** allowing exactly this kind of alteration — so it can pay for its own
Standard Move (144.2) the turn it lands. At 5+ it enters exhausted and does nothing that turn, which is
the turn you most want it. Both halves are in the entry.

**The trigger.** Same skeleton as candidate 2 and the same rules: 323.9 → 323.13 → 464.2.c.1/c.3 →
464.2.e → 465.1 fails → 466.3.a → 466.5.d. **The difference is that there is no cap on the count and no
Energy in the cost**: *"any number of enemy units here each with 5 Might or less"*. `here` is read on
execution (**359.3.f.2**), so it is the Dragon's battlefield at the moment the trigger resolves.

**Arithmetic against its own declared quantities.** One card, **10 Energy + 2 Body Power**, once.
Repeatable every turn the Awakening readies it (**315.1.b**: *"The Turn Player readies all Game Objects
they control that are able to be readied"*). It clears a garrison of any size whose bodies are each
5 Might or less, and the two honest limits are printed on the card: a single defender of 6+ stays
(465.1 is met, the Dragon takes damage — it survives most of it at 10 Might, but the entry does not
pretend otherwise), and the ready clause switches itself off at 5 points.

**What it buys over simply winning the fight**, since a 10 Might body beats most garrisons anyway: no
damage is dealt, so the opponent's units do not die and none of their death triggers fire; and it beats
a garrison whose **total** Might exceeds 10, which a damage fight does not.

**Verdict: HOLDS → verified, ENGINE.** No correction.

---

# 4. `janna-overzealous-empty-the-attack` — HOLDS, with its own limit written in

`SFD-053 | Janna, Savior | Unit | Calm | E3 P1 M3 | [Reaction] (Play any time, even before spells and abilities resolve, including to a battlefield you control.) When you play me, heal your units here, then move up to one enemy unit from here to its base. [Tags: Janna, Zaun]`
`SFD-128 | Overzealous Fan | Unit | Chaos | E2 M2 | When I defend, you may kill me to move an attacking unit to its base. [Tags: Noxus]`

**The defender's trigger resolves first, and that is a rule, not a hope.** **383.4.f**: *"Defend Triggers
are Triggered Abilities that trigger when a Unit or Player gains the Defender designation for the first
time during a combat."* **464.2.e.1** puts the Defending player's triggers on the Chain **last**, and
**340.1** resolves *"The newest Finalized Chain Item"* first. So the Fan's evacuation happens before the
attacker's own `When I attack` triggers resolve — and by **359.3.f.2** those then read `here` on an
attacker that is no longer there.

**Janna's speed.** **813.1** *"Reaction is a Permissive keyword"* and **813.1.b** *"Reaction grants the
corresponding card or effect all abilities and permissions of Action"*, with **806.1.b** giving
*"permission to be played or activated during Showdowns, even when it is not the Controlling player's
turn"*. **355.2.a** already makes a battlefield you control a valid location, which is what her
reminder text restates.

**Then 465.1 fails and nobody takes damage.** **466.3.b** *"A Player has lost a combat if they received
either the attacker or defender designation and are the only Player that does not have any units
remaining"* → the attacker loses; **466.3.a** → you win. No Conquer, because you already controlled the
battlefield.

**The limit, stated in the entry rather than buried.** **466.1.a.2** inserts *"3d. Recall Attackers
present at the Battlefield if Defenders are still present"* into the Combat Cleanup, so surviving
attackers go home regardless. **The evacuation buys exactly one thing: taking no damage.** It removes
nothing the cleanup was not already going to send back. And against 2+ attackers, removing one leaves
465.1 satisfied and the damage step happens anyway.

**Arithmetic against its own declared quantities.** One evacuation per card. Janna: **3 Energy + 1 Calm
Power** for a 3 Might body that stays. The Fan: **2 Energy**, and it **dies** to do it. With the maximum
3 + 3 the ceiling is 6 evacuations across a game, one per attacker per combat.

**What "win a combat" means for a *unit*, since 466.3.a only defines it for a player.** Riot supplies
the reading in its own reminder text on the identical wording: `UNL-114 Nidalee, Cat Form` prints
*"(I win if I remain after combat.)"* and `SFD-185 Glorious Executioner` prints *"(You win if only your
units remain after combat.)"*. With 465.1 failing, your bodies remain and the attacker does not, so both
the unit-level and the player-level reading pay. No reading needed filing.

**The payoff, and the domain check that decides which one.** `UNL-201 Voidreaver` (*"When you win a
combat, gain 1 XP"*) is the clean reading of 466.3.a — but it is a **Legend**, Body/Chaos, and this
entry is Calm + Chaos, so **it cannot be the payoff and the legend of this deck at the same time**
(103.1.b.1). The payoff that fits is `SFD-123 Corrupt Enforcer` (Chaos, E3 P1 M4, *"When I win a combat,
draw 1"*), and the legend is one of the three Calm/Chaos: **OGN-259 Unforgiven**, **SFD-195 Blade
Dancer**, **UNL-193 Gloomist**. #58 listed Voidreaver without noticing it is a legend; that is the
walk's correction.

**Verdict: HOLDS → verified, ENGINE**, with 466.1.a.2 and the Voidreaver correction written in.

---

# 5. `signpost-corina-two-battlefields` — HOLDS after a REWRITE

`UNL-045 | Forgotten Signpost | Gear | Calm | E2 | [Action][>] Exhaust a unit you control, :rb_exhaust:: Move a different unit you control to the location of the unit you exhausted to pay for this ability.`
`SFD-179 | Corina Veraza | Unit | Order | E7 P1 M6 | [Accelerate] … When I move to a battlefield, play three 1 :rb_might: Recruit unit tokens here. [Tags: Zaun]`

**The mechanism is real and it is the cleanest statement of #58's S4.** **420.2** *"Moving is a Limited
Action"* / **420.2.a** *"Players may only move Game Objects when instructed to do so by Game Effects or
costs"*; **420.3** *"The Standard Move inherent to Units is a Discretionary Action"* / **420.3.a**
*"The Cost is Exhausting one or more Units"*; **144.4** *"The Destinations where Units can Move to
**with their Standard Move** are restricted"*; **810.1.c.3** *"[Ganking] does not give additional
abilities or activations of Movement, only new options for the Standard Move"*. The exhaust and the
base↔battlefield restriction both live on the Standard Move alone, so the Signpost moves an **exhausted**
unit **battlefield to battlefield** for **0 Energy and 0 Power**. **447.2.a** and **447.2.b** are the
only invalid destinations for *"Moves of all kinds"* and neither applies in a Duel.
Its `[Action]` matters: **151.2** would otherwise confine a gear ability to the Main Phase *"and not
during a Showdown"*; **806.1.d** confirms `[Action][>]` is the ability form of the keyword and
**806.1.c.2** its plain-language equivalent.

## The correction: #58's headline number is wrong, and rc-walk48 had already caught it

#58 wrote *"Corina + Svellsongur + Signpost = 2 movimientos × 6 = 12 Recruits"* concentrated on The
Grand Plaza. **It does not concentrate.** Corina plays her tokens `here`, and **359.3.f.2** reads `here`
**on execution**, so each landing drops its batch at whatever battlefield she landed on. Two landings
are two different battlefields and the Plaza receives only the last one. This is already written into
`corina-svellsongur-plaza`'s notable (issue #48) and the entry authored here repeats it rather than
contradicting it.

## What actually survives, and it needs one prerequisite #58 did not state

Corina's tokens are **played**, so **355.2.a** applies: *"By default, Valid locations include the
controller's Base or a Battlefield the controller controls."* Both landings must therefore be on
battlefields **you already control** — and **485.4** fixes *"Battlefield Count: 2"* in a Duel, so this
line asks you to control **both**. That is a real cost and it is now the first notable of the entry.

**The walk, with the quantities declared** (1 Corina, 1 Signpost, 1 ready friendly unit Y at C):

1. Play the Signpost on an earlier turn: 2 Energy. **149.1** *"Gear enter play Ready."*
2. Play Corina, 7 Energy + 1 Power, paying [Accelerate] (**805.1.a**: *"you may pay [1][C] as an additional cost. If you do, I enter ready"*) for 1 Energy + 1 Order Power.
3. Standard Move base→B (144.4.a; cost is her own exhaust, 144.2). Trigger → **3 Recruits at B**.
4. Activate the Signpost: exhaust Y at C, exhaust the Signpost. Move Corina — exhausted, and it does not matter — to C. Trigger → **3 Recruits at C**.

```
Corina landings on a battlefield this turn = 2   (Standard Move + Signpost)
Recruits per landing                       = 3
Recruits total                             = 6   (3 at B, 3 at C — NOT 6 in one place)
finishing-turn cost                        = 8 Energy + 2 Power   (Signpost's 2 Energy paid earlier)
```

Corina leaves B, but the three Recruits she left there keep it garrisoned, so **323.6** does not strip
your Control of it. That is the honest payoff of the entry: **two battlefields garrisoned in one turn,
and both of them Hold in your next Beginning Phase** (315.2.b.2: *"The Turn Player Holds all
Battlefields they Control"*).

**The variant that is cheaper and is worth as much.** Skip [Accelerate] entirely: Corina enters
exhausted at your base and the Signpost moves her (exhausted) to B for her first and only landing.
−1 Energy and −1 Order Power, at the price of a ready friendly unit already standing at B.

**What limits it.** The destination is not free — it is wherever the unit you exhausted stands, and
*"a different unit you control"* forbids Corina paying her own cost. The Signpost exhausts itself, so it
is **one** activation per turn cycle unless something readies it; the five cards that ready gear are
`VEN-149`, `VEN-150`, `SFD-221`, `OGN-162` and `VEN-068` (issue #56). **820.1.c.3** is not involved —
there is no [Repeat] here — and this is not a loop.

**Verdict: HOLDS after a rewrite → verified, ENGINE.** The rewrite: the "12 at the Plaza" claim is
dropped, the both-battlefields prerequisite (355.2.a + 485.4) is added.

---

# 6. `faefolk-challenger-forced-attacker` — HOLDS, and the walk found the better half

`UNL-112 | Irresistible Faefolk | Unit | Body | E2 M1 | When I move to a battlefield, you may move an enemy unit to that battlefield. [Tags: Fae, Ionia]`
`UNL-105 | Imposing Challenger | Unit | Body | E5 M5 | When I move, you may move an enemy unit here with less Might than me to a different battlefield. [Tags: Ionia]`

**The half #58 wrote: the opponent becomes the Attacker on your turn.** **190.3.a** *"Contested is a
temporary status applied to the battlefield when a Unit controlled by a Player who does not currently
Control that Battlefield Moves or otherwise becomes present there"*, **190.3.a.1** *"…if that
battlefield is not already Contested and that **Unit's controller** does not already control that
battlefield"*, and **450** *"…not controlled by the controller of the Unit or Units that moved"*. All
three key on the **unit's** controller, not on who caused the move. **464.2.c.1** then makes the
opponent the Attacker and you the Defender, at a battlefield you chose, with a garrison you built, and
**323.13** lets you, the Turn Player, pick when it opens. `SFD-128 Overzealous Fan` from candidate 4 is
a `When I defend` trigger, so this is how you fire it on your own turn.

**The half the walk adds, and it is worth more.** Drag their **last** unit off the battlefield they
control and **323.6** takes the battlefield from them at that same Cleanup: *"Players lose control of
any controlled Battlefields without their Units occupying them if the turn is in an Open State and
there is no Showdown or Combat ongoing there."* Their battlefield becomes **open** in the R31 sense, and
a second ready body of yours walks in and Conquers it in the same Main Phase.

**The Imposing Challenger is the same idea with the Combat un-staged, and this is where 323.10 earns
its place.** Standard-Move him into a battlefield the opponent controls whose garrison is one unit of
4 Might or less (*"less Might than me"*, he is M5):

1. The move completes. **453** / **319.3**: a Cleanup. The trigger is a Pending Chain item, so the state is **Neutral Closed** (310.2) and **323.13 does not fire**. Tasks 6 and 7 stage a Showdown and a Combat at B.
2. The trigger resolves: the enemy unit is pushed *"to a different battlefield"* — and **485.4** *"Battlefield Count: 2"* makes that a single legal destination in a Duel, so the effect is deterministic.
3. Next Cleanup: **323.6** strips their Control of B (a Combat is *staged* there, not *ongoing*). **323.10** un-stages the Combat. **323.11** leaves Contested in place because you still have units there, and **323.8.a** keeps the Showdown staged. **323.12** opens it. **348** → **348.2.a** → **348.2.a.1** → **Conquer, with no Combat and no damage.**

**The drawback, and it is symmetric, so it is in the entry.** The pushed unit lands at the other
battlefield and **190.3.a.1** makes *them* apply Contested there. If you hold it with a garrison you get
a Combat on your own terms and **466.1.a.2** sends the survivor home; if it is empty or uncontrolled,
they open a Showdown and Conquer it. Playing the Challenger without having done the Might arithmetic
first trades one battlefield for another.

**Arithmetic against its own declared quantities.** One enemy unit per trigger, one trigger per move,
one move per readying — **144.2** plus **415.3.a** (*"A player Readies all non-spell Game Objects they
Control during the Awakening Phase on their turn"*). Faefolk: **2 Energy** for one drag per turn.
Challenger: **5 Energy** for one push per turn, filtered at Might 4 or less. Neither has [Accelerate],
so **143.4** costs each of them a turn before it can move.

**Verdict: HOLDS → verified, ENGINE**, with the 323.6 / 323.10 Conquer route added.

---

# 7. `lillia-smoke-mirrors-sprite-relay` — HOLDS after a correction to the count's distribution

`UNL-082 | Lillia, Fae Fawn | Unit | Mind | E3 M3 | [Accelerate] … When I move from a location, play a 3 :rb_might: Sprite unit token with [Temporary] there. … [Tags: Fae, Lillia, Ionia]`
`UNL-083 | Smoke and Mirrors | Spell | Mind | E2 | [Hidden] … [Action] … Choose a unit you control and another unit you control at a different location. If at least one of them has [Temporary], move each to the other's location. Draw 1.`

**Every swap is a Move and therefore fires her.** **446.1** *"A Permanent changing its position from any
space on the Board to another space on the Board is a Move, unless it is caused by a corrective Recall
or an Attached Permanent changing locations"*; **420.1**; and **456** / **456.1** exclude only recalls
(*"Recalls are not Moves… They do not cause Triggered Abilities to trigger that are triggered by Move
actions"*). `there` is the origin, read on execution (**359.3.f.2**), and **355.2.a** makes it legal
only because the origin is your base or a battlefield you control.

## The correction: 4 Sprites is right, "12 Might at the battlefield" is not

Tracked position by position, with 1 Lillia and the maximum 3 copies (**103.2.b**):

```
after her Standard Move base->B :  base {S1}            B {Lillia}
S&M #1  (Lillia@B <-> S1@base)  :  base {Lillia}        B {S1, S2}
S&M #2  (Lillia@base <-> S1@B)  :  base {S1, S3}        B {S2, Lillia}
S&M #3  (Lillia@B <-> S1@base)  :  base {S3, Lillia}    B {S1, S2, S4}
```

**4 Sprites, 12 Might — but split.** Every swap moves Lillia the other way, so after an odd number of
swaps she is back at the base and **at most 3 Sprites (9 Might) stand at the battlefield**. Stop at two
swaps and it is Lillia plus one Sprite there (6 Might) with two Sprites at the base. #58 reported the
total without the distribution; the entry states both.

**The costs, honestly.** 3 Energy + 1 Energy and 1 Mind Power for [Accelerate], then 2 Energy per copy:
**10 Energy + 1 Power**, cards −1 net (three spent, three drawn). The `[Hidden]` discount is real but
restricted, and the entry says so instead of quoting the reminder text: **811.1.b** hides *"at a
battlefield you control"* for `[A]` and gives `[Reaction]` and a 0-Energy play *"beginning on the next
turn"*, but **811.1.d** warns that *"Some choices made while playing a card from Hidden are restricted
to the battlefield where it was hidden"* — and Smoke and Mirrors is defined by choosing two units **at
different locations**, so one of its two choices is necessarily off that battlefield. The entry prices
the copies at their base cost.

**Trap 4 bites in full and is declared.** **816.1** *"Temporary is a Triggered Ability keyword"* and
**816.1.b** *"At the start of this permanent's controller's Beginning Phase, before scoring, kill
this"*. The Sprites **never Hold**, so they never count for `OGN-293 The Grand Plaza`, whose condition
**383.2.a.1** measures at the Scoring Step (**315.2.b.2**). They are one turn cycle of combat bodies,
which is exactly what the entry claims and nothing more.

**The legend that belongs with it, found in the walk.** `UNL-189 Bashful Bloom` (Legend, Calm/Mind,
Lillia's own): *"4 Energy, exhaust: Play a ready 3 Might Sprite unit token with [Temporary]. This
ability costs 1 Energy less for each friendly unit with [Temporary]."* With four Sprites out it costs
**0**, and its Sprite enters **ready** — the only ready body in the line. It also starts the relay
without spending Lillia's Standard Move: play its Sprite at a battlefield you control, and Lillia at
the base is already *"at a different location"*. Domains close: Lillia and Smoke and Mirrors are Mind,
the legend is Calm/Mind (103.1.b.1).

**Verdict: HOLDS after a correction → verified, ENGINE.**

---

# 8. `bard-mercurial-mass-relocation` — HOLDS, unblocked by the retirement of R31

`SFD-079 | Bard, Mercurial | Unit | Mind | E4 P1 M4 | You may exhaust your legend as an additional cost to play me. When you play me, if you paid the additional cost, move any number of your units to an open battlefield. [Tags: Bard]`

#58 filed this as its refutation R3, blocked on `open battlefield`. With R31 retired against Riot's own
Yone errata — **open = uncontrolled** — it walks.

**What it does that nothing else in the pool does.** *"Move **any number** of **your units**"*, in one
effect, for **4 Energy + 1 Mind Power + your legend's exhaust**. It is an effect move
(420.2 / 420.2.a), so by 144.4 and 420.3.a it takes **exhausted** units and goes **base → battlefield**
or **battlefield → battlefield** with no [Ganking] (810.1.c.3) and no exhaust cost. Issue #48 measured
that 18 of the 49 token makers leave their tokens *"at your base"* and that points are scored at
battlefields; `SFD-177 Azir, Sovereign` is the only bulk mover of **tokens**, and it needs an enemy
garrison to attack. **Bard is the only bulk mover of units of any kind, and it needs the opposite: an
empty, uncontrolled battlefield.** The two do not compete, they cover different boards.

**The destination is the constraint, and it is exactly the window a Duel opens with.** **190.1**
*"Control is established over Battlefields through the course of play"* — both battlefields start
uncontrolled, so the one you provided is open until somebody takes it. **323.6** re-opens one whenever
its garrison leaves. And once you control a battlefield it is no longer a legal destination for this
trigger, which is what stops it being a general-purpose shuttle.

**The move Conquers by itself.** **450** → your units apply Contested to an uncontested battlefield you
do not control. **323.8** stages a Showdown; **323.9** stages no Combat, because an uncontrolled
battlefield normally has nobody on it. **323.12** → **348** → **348.2.a** → **348.2.a.1** Conquer, and
**471.1** the point — in the same turn the bodies arrive.

**Arithmetic against its own declared quantities.** One card, one activation, **4 Energy + 1 Mind
Power**, and **no cap on the number of units moved**. Bard himself is already on the board when
*"When you play me"* resolves, so he is one of the bodies. Against `OGN-293 The Grand Plaza`, whose bar
is 7 (**383.2.a.1** measures it at the Hold, **315.2.b.2**), Bard plus six banked tokens is exactly the
bar, and every extra token banked at the base is margin — which is the shape `azir-sovereign-token-gather`
has for the other kind of board.

**What it costs beyond its printed cost.** The legend exhaust is real: **414.1.b** *"A Game Object that
is already Exhausted cannot be Exhausted again"*, so a legend that has already used an exhaust ability
this turn cannot pay, and Bard's trigger checks *"if you paid the additional cost"*. **107.4.c** is why
the legend can be exhausted at all (*"The Champion Legend here is a Game Object"*).

**The scope caveat, written into the entry and not hidden in this document.** Riot's errata reworded a
**conquer** text (Yone's *"When I conquer an open battlefield"* → *"a battlefield that was
uncontrolled"*). Bard's is a **move** text and Riot has not reworded it. The errata is direct evidence
of what the word means, not a rewrite of this card.

**Verdict: HOLDS → verified, ENGINE.**

---

## Scoreboard

| # | id | verdict | class |
|---|---|---|---|
| 1 | `charm-evacuate-conquer` | HOLDS, ordering made mandatory | ENGINE |
| 2 | `sinister-poro-attack-evacuate` | HOLDS as written | ENGINE |
| 3 | `corrupted-dragon-mass-evacuate` | HOLDS as written | ENGINE |
| 4 | `janna-overzealous-empty-the-attack` | HOLDS, Voidreaver corrected to Corrupt Enforcer | ENGINE |
| 5 | `signpost-corina-two-battlefields` | HOLDS after a REWRITE (3+3, not 12; both battlefields) | ENGINE |
| 6 | `faefolk-challenger-forced-attacker` | HOLDS, 323.6/323.10 Conquer route added | ENGINE |
| 7 | `lillia-smoke-mirrors-sprite-relay` | HOLDS after a correction (at most 3 Sprites in one place) | ENGINE |
| 8 | `bard-mercurial-mass-relocation` | HOLDS — R31 retired by Riot's own errata | ENGINE |

**8 verified, 0 refuted, 0 promoted to a higher class.** None of the eight is INFINITE: every one of
them moves a unit **once per readying** (144.2 + 415.3.a) or spends a card to do it, and 810.1.c.3
closes the only family that looked like it gave a second movement for free.

## What #58's own refutations look like after the walk

R1 (Ganking), R2 (Maduli), R4 (vacate-and-retake, killed by 470), R5 (Hwei), R6 (Back Alley Bar) and R7
(Fae Porter, dominated by the Signpost) all stand. **R3 (Bard) is overturned** — not by a new argument
but by the errata that retired R31. R4 gains a footnote: 190.4.c ends *"unless there is a Combat or
Showdown ongoing there"*, a clause #58 dropped, which does not save the line because 470 (*"A player may
only Score, from either method, once per Battlefield per turn"*) kills it either way.
