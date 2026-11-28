# Hand walk — issue #116, the champion-progression lens (Level / XP / Flow / Champion Zone)

**Date:** 2026-09-06 · **Rules:** Core Rules 2026-07-16 · **Card text:** `data/corpus_flat.txt`, verbatim

Both candidates of #116 were walked. **Both stand as ENGINE and enter the catalogue as `verified`.**
Nothing changed class. Four corrections to the issue are recorded in §6.

---

## 1. The card text this walk stands on

Grepped out of `data/corpus_flat.txt` (lines 668, 692, 750, 752, 666, 651, 658, 665, 287):

```
UNL-201 | Voidreaver | Legend | Body/Chaos | - | When you win a combat, gain 1 XP.
  Spend 1 XP, :rb_exhaust:: [Buff] a unit.
  Spend 2 XP, :rb_exhaust:: Move an exhausted friendly unit from a battlefield to its base. [Tags: Kha'Zix]

UNL-119 | Kha'Zix, Evolving Hunter | Unit | Body | E5 P1 M5 | [Hunt] (When I conquer or hold, gain 1 XP.)
  When I attack, you may spend 3 XP to deal damage equal to my Might to an enemy unit here.
  [Tags: Kha'Zix, The Void]

UNL-143 | Kha'Zix, Mutating Horror | Unit | Chaos | E4 P1 M4 | [Ambush] (You may play me as a [Reaction]
  to a battlefield where you have units.) When I attack or defend, if an enemy unit is alone here,
  give me +2 :rb_might: this turn and gain 2 XP. [Tags: Kha'Zix, The Void]

UNL-203 | Keeper of the Hammer | Legend | Body/Order | - | When you hold, gain 1 XP.
  Spend 3 XP, :rb_exhaust:: Draw 1. [Tags: Poppy]

UNL-117 | Arachnoid Horror | Unit | Body | E6 P1 M6 | [Hunt 2] (When I conquer or hold, gain 2 XP.)
  I can be played to an occupied battlefield if an enemy unit is alone there. Friendly units can be
  played to an occupied battlefield if an enemy unit is alone there. [Tags: Shadow Isles, Spider]

UNL-102 | Crowd Favorite | Unit | Body | E3 M3 | [Hunt] (...) Spend 2 XP: [Buff] me.
  (Give me a +1 :rb_might: buff if I don't have one.) [Tags: Noxus]

UNL-109 | Blood Rose | Gear | Body | E1 | When you play a unit, you may pay :rb_energy_1: to gain 1 XP.
  Spend 3 XP, :rb_exhaust:: Ready a unit.

UNL-116 | Poppy, Paragon | Unit | Body | E5 M5 | [Deflect] (...) When you play me, if an opponent's score
  is within 3 points of the Victory Score, ready me and gain 3 XP. [Tags: Yordle, Demacia, Poppy]

OGN-281 | Hallowed Tomb | Battlefield | Colorless | - | When you hold here, you may return your Chosen
  Champion from your trash to your Champion Zone if it is empty.
```

Ban check: none of `UNL-201`, `UNL-119`, `UNL-143`, `UNL-203`, `UNL-117`, `UNL-094`, `UNL-151`,
`UNL-091`, `UNL-098`, `UNL-116`, `OGN-281` carries a `[BANNED` marker in its corpus row.

---

## 2. The four structural facts of #116, with the rule text opened

### 2.1 The Champion Zone is a Non-Board Zone (108.3)

`107. The Board` lists Bases (107.1), the Battlefield Zone (107.2), Facedown Zones (107.3) and the
Legend Zone (107.4). The Legend Zone gets two carve-outs that the project already leans on:

> **107.4.b.** *"This is not a location."*
> **107.4.c.** *"The Champion Legend here is a Game Object."*

`108. Non-Board Zones` lists the Chain (108.1), Trashes (108.2), **Champion Zones (108.3)**, Main Deck
Zones (108.4), Rune Deck Zones (108.5), Banishments (108.6) and the Hand (108.7). The Champion Zone
gets **no** Game-Object carve-out. It is off the board by rule number, and 705.1 confirms it from the
other side:

> **705.1.** *"Champions do not retain Buffs in the Champion Zone, even if they return there somehow."*

A buff is a counter placed on a Unit (702) and 705 removes all buffs from a unit that leaves play; the
rules felt the need to say the Champion Zone is such a place. #116's F2 stands.

### 2.2 The zone refills only once, and only by Hallowed Tomb (108.3.c)

> **108.3.c.** *"The Chosen Champion cannot be returned to this zone by normal means."*
> **108.3.c.1.** *"If a Chosen Champion is instructed to be returned to this zone, it can only do so if there is not a card already in this zone."*
> **108.3.d.** *"The Chosen Champion can be played from here as normal, following the rules of Playing a Card."*

`OGN-281 Hallowed Tomb` is the only card in the pool that exercises 108.3.c.1, and it is Colorless, so
it is legal under any legend. 108.3.d is the half #116 did not price: **the Chosen Champion is a card
the deck never has to draw.** That is load-bearing for candidate 1 (§4) and it is a gain, not a
limit — the engine's cheap half is available from turn one.

### 2.3 XP has exactly one decrease, and it is your own spend (730.2)

> **729.** *"XP is a resource that is accrued, spent, or otherwise modified by Players through the course of play."*
> **730.1.** *"To Gain XP, increase the value of XP marked on the Player gaining it."*
> **730.2.** *"To Spend XP, reduce the value of XP marked on the Player spending it."*
> **731.** *"XP is not a Game Object."* **731.1.** *"XP cannot be targeted, readied, or exhausted."*
> **733.** *"There is no limit to an amount of XP a player can accrue."*

Two things follow that #116 did not separate. 731/731.1 mean **no opponent can interact with your XP
at all** — it is not a Game Object, so nothing targets it, and the pool prints no drain (#116's
zero-hit grep). But 730.2 means **you** walk it down every time you use a `Spend N XP` ability, and
that is not a ratchet. See §3.

### 2.4 Flow banishes, and nothing comes back (829.1.b, 108.6.c)

> **829.1.b.** *"It is functionally short for 'You may play this from your trash for its flow cost. Then banish it.'"*
> **829.1.b.1.** *"Banishing the spell in this way is a delayed replacement effect. If the spell would leave the chain after becoming a finalized chain item, and leaving the chain wasn't instructed by its own execution, banish it instead."*
> **108.6.c.** *"Represents cards that have been removed from play in a more difficult-to-recover way, **or a temporary space to hold cards while effects are being processed**."*

#116 quoted only the first half of 108.6.c. Read to the end, the paragraph admits a second, transient
use of Banishment — but 829.1.b.1 makes the Flow banish a *delayed replacement* applied when the spell
leaves the chain, i.e. the terminal one, not the transient one. F4's conclusion is unchanged, and this
project's own rule ("read a clause to its end") is why it is now written down rather than assumed. The
already-catalogued arithmetic stands: 103.2.b allows three copies, so a Flow spell is **six plays a
game** (already in `CLAUDE.md` from the #115 walk), never an engine.

---

## 3. The correction #116 needs: XP is a **balance**, not a ratchet

#116's F1 concludes that a crossed `[Level N]` threshold *"stays Active for the rest of the game by
default"*. That is false as stated, and the catalogue already says so:

> **824.1.b.1.** *"It is functionally short for 'While you have [N] or more XP, this card gains "[Text]".'"*
> **824.1.c.** *"As long as the controlling player has [N] XP, then the Dependent Ability will be Active on the card with Level"*
> **824.1.d.** *"The Dependent Ability will be Inactive as soon as the controlling player has less than [N] XP."*

Read with 730.2, a `Spend N XP` ability **switches your own Level abilities off** the moment the
balance drops under the threshold. `wuju-master-blood-rose-level` (verified 2026-09-04) already
carries this in its `notable` and names the actionable form: an 11–13 XP band in which you simply do
not use the sink. Nothing here is new; it is repeated because both of #116's candidates are XP
*sinks*, and each of them has to declare which Level cards in its own domain pair it walks down.

**#116's conclusion survives on a different argument.** No `[Level]` payoff can be INFINITE or CHAIN,
but not because XP is a ratchet — it is because **nothing in the pool converts XP into points.** A
grep of every XP row against `point|score|win` returns two rows, and both go the other way:
`UNL-116 Poppy, Paragon` *gains* 3 XP off the opponent's score, and `UNL-201 Voidreaver` gains XP off a
combat. XP buys effects, never Victory Points, so the lens yields ENGINE and nothing else — the same
shape the stun lens (#61) and the Might lens (#97) already reported for themselves.

---

## 4. Candidate 1 — VERIFIED as ENGINE: `voidreaver-khazix-xp-removal`

### 4.1 Legality

- Voidreaver is Body/Chaos, so 103.1.b.2 makes that the deck's Domain Identity. `UNL-119` is mono-Body
  and `UNL-143` is mono-Chaos; 103.1.b.3 (*"If a card has a single Domain, then that card is permitted
  in the Domain Identity"*) admits both.
- **Both Kha'Zix printings can sit in the same deck and on the board together.** 103.2.b.2: *"Cards
  have different names even if they represent the same character."* Its own worked example is exactly
  this shape — *"A deck could include 3 copies of Yasuo, Remorseful and 3 copies of Yasuo, Windrider,
  because they have different names."* So 3 + 3, and nothing pairs them off.
- One of them is the Chosen Champion. 103.2.a.2: *"Must be a champion unit with a champion tag that
  matches the tag on your Champion Legend"*, worked example *"Loose Cannon has the tag Jinx.
  Therefore, a player could choose Jinx, Rebel or Jinx, Demolitionist"*. Voidreaver's tag is Kha'Zix
  and both units carry it. By this project's own derivation of a champion tag (a tag `T` is a champion
  tag when a card named `T, <epithet>` exists), Kha'Zix qualifies twice over. Neither card is
  `signature: true` in `data/cards.json`, so 103.2.d.3 does not exclude them.
- The walk puts `UNL-143` (E4, the XP faucet) in the Champion Zone and leaves `UNL-119` (E5 P1, the
  sink) in the Main Deck, because 108.3.d makes the Champion Zone copy playable without a draw and the
  faucet is the half you want on time.

### 4.2 "an enemy unit is alone here" — settled by the pool's own reminder text

Two cards print the reminder for the same word:

- `SFD-036 Lonely Poro`: *"If I died alone, draw 1. (When I die, get the effect. **I'm alone if there are no other friendly units here.**)"*
- `UNL-210 Forbidding Waste`: *"While a unit here is defending alone, it has -2 Might. (**It's alone if there are no other friendly units here.**)"*

"Alone" is measured against the unit's **own side**. So `UNL-143`'s clause means *the opponent has
exactly one unit at this battlefield* — your own garrison is unrestricted. No reading needed; the pool
answers it.

### 4.3 The attack trigger, and when its condition is checked

> **383.4.e.** *"Attack Triggers are Triggered Abilities that trigger when a Unit or Player gains the Attacker designation for the first time during a combat."*
> **383.4.e.2.** *"These Triggered Abilities are put on the Chain as Pending Items after the Unit these effects correspond to gains the Attacker designation during Combat."*
> **383.4.e.2.a.** *"These triggers will only have their condition checked once per combat, despite a Unit being able to gain and lose the Attacker designation multiple times in the same combat."*
> **383.4.e.2.b.** *"If the trigger condition contains other requirements besides attacking and if those requirements are not fulfilled when the unit gains the Attacker designation, it will not trigger in that combat."*

The designation is handed out at 464.2.c.3, and 464.2.e puts the resulting triggers on the Combat
Chain. So `UNL-143`'s lone-enemy clause is measured **at 464.2.c.3 and only there**: the opponent
cannot repair it afterwards, and neither can you. 383.4.e.2.a also kills any "re-attack in the same
combat" idea outright.

The mirror, 383.4.f/383.4.f.2.b, covers the `[Ambush]` half. 822.1.b is *"I may be played to a
battlefield where you control Units"* plus `[Reaction]` while doing so, and 464.2.c.3.a gives a body
that arrives after the designation step its own designation *"during the Cleanup phase following the
action that caused it to become present"* — so an ambushed `UNL-143` does get its Defend Trigger, one
Cleanup late.

### 4.4 The removal is Riot's own worked example, and its Might is read at execution

`UNL-119`'s second sentence — *"When I attack, you may spend 3 XP to deal damage equal to my Might to
an enemy unit here"* — is the wording of `Yasuo, Remorseful`, which the Core Rules use three times as
the worked example of 359.3.f:

> **359.3.f.2.** *"Information referenced in an instruction in this way will be checked on execution of the instruction."*
> Example: *"A player moves Yasuo, Remorseful to an occupied enemy battlefield and initiates combat there. In reaction to the Yasuo, Remorseful attack trigger, their opponent plays Fight or Flight from hidden targeting Yasuo, moving him back to base. When the attack trigger resolves, 'here' is no longer the battlefield where combat is ongoing and the attack trigger mistargets."*
> Example: *"In reaction to a Yasuo, Remorseful attack trigger, an opponent plays Stupefy targeting Yasuo. When Yasuo's attack trigger resolves, it will deal damage equal to his current Might of 5."*
> **359.3.f.4.** *"...'enemy' is in reference to the triggered ability itself, so it will resolve with no issue"* (after a controller change).

Three consequences the entry states rather than assumes: the damage is **current** Might at
resolution, so a Voidreaver Buff raises it and a `-Might` lowers it; the opponent blanks the whole
trigger by moving `UNL-119` home; and a control steal does not.

### 4.5 The Buff is exactly +1 Might, once, and only on an unbuffed body

> **702.2.a.** *"To Buff a Unit, a player chooses a Unit and then places a buff on it."*
> **702.3.** *"There can only be one Buff on a Unit at a time."*
> **702.3.a.** *"If a Buff is added, or instructed to be added, on a Unit that already has a Buff, it is not placed instead."*
> **703.** *"Each Buff individually contributes +1 Might to a Unit."*
> **705.** *"If a Unit leaves play, remove all Buffs from it."*

`UNL-102 Crowd Favorite` prints the reminder in the pool itself — *"Spend 2 XP: [Buff] me. (Give me a
+1 Might buff if I don't have one.)"* — which is 702.3.a quoted on a card. So Voidreaver's 1-XP Buff is
worth +1 permanent Might on a body that has none, and worth nothing on a body that has one. Per the
#106 rule already in `CLAUDE.md`, the product of a repeatable buffer is `min(triggers, new unbuffed
bodies)`; here the trigger side is 1 per turn (§4.6), so the bound is the buffer, not the board.

### 4.6 Voidreaver activates once per turn, and only in the Main Phase

Both of Voidreaver's paid abilities carry `:rb_exhaust:` in the cost, and there is one exhaust state on
one object, so **one of the two per Awaken cycle** — never both. 315.1.b (*"The Turn Player readies all
Game Objects they control that are able to be readied"*) readies him next turn, and 107.4.c makes the
legend such a Game Object.

Neither ability carries `[Reaction]`, and 813.1.c.2 is explicit — Reaction on an Activated Ability is
short for *"This can be activated during Closed States on any player's turn."* Without it, the ability
is Main-Phase only (316.5.b, the Neutral Open State). **So the Buff cannot be used in response to the
attack trigger; it has to be placed in the Main Phase before the unit moves in.** That is the correct
sequencing and it is cheaper anyway.

### 4.7 The combat arithmetic, with the quantities the entry declares

465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal to their summed
Might among the other's Units"*, with 465.2.c.3 forcing lethal onto one unit in full first.

`UNL-143` attacking a lone defender of Might `M`:

| board | attacker sum | result |
|---|---|---|
| `UNL-143` alone, trigger fired | 4 + 2 = **6** | kills `M ≤ 5`, survives (takes `M < 6`) → **win** |
| same, `M = 6` | 6 | both die → 466.3.d **No Result**, no XP from Voidreaver |
| `UNL-143` carrying a Voidreaver Buff | 4 + 2 + 1 = **7** | kills `M ≤ 6`, survives → **win** |

That is what the Buff buys, to the digit: it moves the gate from `M ≤ 5` to `M ≤ 6`. 466.1.a.1 heals
all units in the Combat Cleanup, so the marked damage does not carry.

> **466.3.a.** *"A Player has won a combat if they received either the attacker or defender designation and are the only Player that has units remaining at this battlefield during this step."*

No `once each turn` wording appears on Voidreaver, so 383.3.e.1 imposes no cap; 466.3.a is a
per-battlefield, per-combat event and it covers the **defender** too, so Voidreaver also banks XP on
the opponent's turn. In a Duel the ceiling is the battlefield count: 485.4 *"Battlefield Count: 2"*.

### 4.8 Two combats in one Main Phase — the citation #116 was missing

#116 reached for 429.2 to argue that an earlier combat's XP is banked before a later attack's spend.
It does not need to. The rule is:

> **461.1.** *"If more than one Battlefield has Units controlled by opposing players at it at the same time, the Turn Player decides which Combat to resolve first."*

and, for the one-at-a-time route,

> **316.5.** *"The Main Phase has no defined structure."* **316.5.a.** *"A player may take any number of Discretionary Actions they are able to perform during this phase."* **316.6.** *"As a result of a player taking Discretionary Actions, one or more structured phases may occur."*

So either move both units and pick the order under 461.1, or move one, let the Combat resolve, and
return to the Main Phase to move the other. Both routes bank `UNL-143`'s XP before `UNL-119` gains the
Attacker designation.

### 4.9 The turn, walked

Board: Voidreaver in the Legend Zone; `UNL-143` played earlier (or now, E4 + 1 Chaos Power, from the
Champion Zone under 108.3.d); `UNL-119` in hand (E5 + 1 Body Power). Opponent holds each of the two
battlefields with exactly one unit.

1. **Main Phase.** If Voidreaver is ready and you are at 1+ XP, `Spend 1 XP, exhaust: [Buff] a unit` on
   whichever body will fight — that is his one activation this turn (§4.6).
2. **Standard Move `UNL-143`** base → battlefield A (144.2 exhaust, 144.4 base↔battlefield). Contested
   applies (450), the Combat is staged at the next Cleanup (323.9) and opened (323.13).
3. **464.2.c.3**: `UNL-143` gains the Attacker designation. Its trigger's condition is checked here and
   only here (383.4.e.2.b) — the lone enemy unit must already be alone. It goes on the Combat Chain
   (464.2.e) and resolves: **+2 Might this turn, +2 XP.**
4. **465.2.c**: 6 damage (7 buffed) against the lone defender's Might. On a kill you are the only
   player with units there → **466.3.a win → Voidreaver +1 XP**. Bank: **3 XP**.
5. **466.5** establishes Control, and **466.5.d** — *"Establishing Control results in a Conquer if that player has not yet scored this Battlefield this turn"* — Scores it (469.1, 470).
6. **Back in the Main Phase** (316.6). Standard Move `UNL-119` base → battlefield B.
7. **464.2.c.3**: `UNL-119` gains the Attacker designation; its attack trigger finds the 3 XP already
   banked. Spend it (730.2) and deal **damage equal to its current Might** — 5, or 6 if it is the body
   you buffed in step 1 — to an enemy unit there (359.3.f.2).
8. `UNL-119`'s `[Hunt]` (823.1.c.1: *"When I Conquer or Hold, my controller gains X XP"*, X omitted = 1
   per 823.1.c.2) pays at the Conquer in 466.5, or at the next Hold in 315.2.b.2 — **after** this
   attack's spend, in time for the next one.

**Per-turn ledger:** income 1 XP per combat won (466.3.a, either side of the table), 2 XP per
lone-enemy `UNL-143` attack or defence, 1 XP per `UNL-119` conquer or hold. Outgo 3 XP per `UNL-119`
removal, plus 1 or 2 XP for Voidreaver's single activation. A board that wins one lone-enemy combat a
turn funds one removal every turn and change.

### 4.10 What the entry does **not** claim

- **Not INFINITE and not CHAIN.** §3: nothing converts XP to points, and both the combats and the
  battlefields are bounded (485.4).
- **The removal targets.** *"an enemy unit here"* is chosen, not programmatically selected, so 355.10.d
  does not apply and 809.1.c/809.1.d charge a `[Deflect]` body.
- **Voidreaver's second ability is a Move, not a Recall.** The card says *"Move an exhausted friendly
  unit from a battlefield to its base"*; 455 defines a Recall as a relocation to the Base *"without it
  being a Move"*, so this is not one, and 420.3.a puts the exhaust cost only on the **Standard** Move —
  which is why an already-exhausted unit is a legal subject. Its cost is stated honestly in the entry:
  323.6 strips your Control of that battlefield in the same Cleanup if the unit was your last body
  there.
- **If the Chosen Champion dies it does not come back.** 108.3.c. Only `OGN-281 Hallowed Tomb` (Colorless,
  so legal here) can return it, once, under 108.3.c.1 — and 485.4.a plus 103.4.c mean you bring three
  differently-named battlefields and only one is used.

### 4.11 Trap check

No `[Repeat]`; no `[Temporary]`; no token; no recall used as a move; no Awaken or Beginning-Phase
Energy carried past 167 (every payment here is Main-Phase); the attack needs a garrison, and the entry
attacks an **occupied** battlefield throughout — the "entering an empty battlefield is not an attack"
trap (807.1.d / 383.4.e / 461) is respected; no `would die` shield, so 808.1.d.1 does not arise; no
Gold; no battlefield of its own. Depends on no unruled reading.

---

## 5. Candidate 2 — VERIFIED as ENGINE: `keeper-hammer-hunt-draw`

### 5.1 The income, counted properly

> **315.2.b.2.** *"1. The Turn Player Holds all Battlefields they Control."*
> **469.2.** *"Hold: A player maintains Control of a Battlefield they did not yet Score this turn during their Beginning Phase."*
> **470.** *"A player may only Score, from either method, once per Battlefield per turn."*
> **383.4.d.2.b.** *"The Hold Abilities of anything that references the player Holding is put on the Chain as a Pending Item when the Condition that the player that controls the triggering source has performed a Hold and gained 1 Victory Point."*

Keeper's *"When you hold"* references the **player**, so 383.4.d.2.b puts one trigger on the chain per
Hold performed. A Duel has **485.4 *"Battlefield Count: 2"***, so **the legend's own ceiling is 2 XP a
turn, not 1** — #116's C2 assumed one. Against a 3-XP draw that is a card every other turn from the
legend alone.

One `[Hunt]` unit closes the gap. 823.1.b: *"Hunt is both a Conquer and a Hold effect"*, and
823.1.c.1 is *"When I Conquer or Hold, my controller gains X XP"*. `UNL-117 Arachnoid Horror` is
mono-Body (legal under Body/Order by 103.1.b.3) and carries `[Hunt 2]`:

| board at the Scoring Step | XP that turn | draws |
|---|---|---|
| legend holds 1 battlefield | 1 | one every 3 turns |
| legend holds 2 | 2 | one every other turn |
| legend holds 2, Arachnoid Horror on one | **4** | **1 per turn, +1 banked** |
| legend holds 1 with Arachnoid Horror | 3 | **1 per turn, exactly** |

All of it arrives in the Scoring Step (315.2.b.2), which precedes the Main Phase (316), so the XP is
spendable the same turn it is earned. The legend readies at 315.1.b, so the draw is **once per turn**
regardless of how much XP is banked — the exhaust is the cap, not the balance.

### 5.2 Arachnoid Horror is the right partner because it also defends the Hold

Its second and third sentences are a 355.2.b grant: *"I can be played to an occupied battlefield if an
enemy unit is alone there. Friendly units can be played to an occupied battlefield if an enemy unit is
alone there."*

> **170.11.a.** *"Battlefields can be 'occupied.' This means they have a Unit present."*
> **355.2.a.** *"By default, Valid locations include the controller's Base or a Battlefield the controller controls."*
> **355.2.b.** *"Some Game Effects may grant players permission to play Units to locations that are not normally Valid. Such locations become Valid for the purposes of Playing the Unit."*

So it lets the deck reinforce a battlefield straight from hand whenever the opponent is down to one
body there — which is precisely how a Hold survives to the next Beginning Phase. "Alone" is the same
own-side reading settled in §4.2.

### 5.3 The draw is safe here, and why the loop wall does not apply

> **431.1.a.** *"If a player must Draw cards in excess to the number of cards in their Main Deck, they will [Burn Out]."*

This is **not** inside a Lux-style shell. The *"0 spare draws"* wall recorded in `CLAUDE.md` is a
property of a loop running with the Main Deck **empty**, where the four draws per pass and the four
cards recycled back are balanced on purpose and a fifth draw is 431.1.a — a point for the opponent
(194.1.d). Keeper's engine runs on a full 40+ card deck across a normal game and draws **one extra
card per turn**, capped by its own exhaust. Nothing recycles anything back, so there is no ledger to
balance; the only bound is the deck itself, and a Duel ends at 8 points long before 40 cards run out.
The wall is named here so the entry cannot be misread as importing it.

### 5.4 What the XP buys in domain — and what the draw costs there

Body/Order Level cards, from the full `[Level` sweep of the pool:

| card | domain | threshold |
|---|---|---|
| `UNL-151 Bandle Soldier` | Order | `[Level 3]` — *"I enter ready."* |
| `UNL-094 Gemhand Hunter` | Body | `[Level 6]` — *"I have +1 Might."* (also `[Hunt]`) |
| `UNL-091 Concentrate` | Body | `[Level 6]` / `[Level 11]` — costs 2 / 4 Energy less |
| `UNL-098 Targonian Visionary` | Body | `[Level 11]` — *"I have +4 Might."* |

824.1.d applied (§3): **each draw walks the balance down 3 and can switch these off.** The bands are
mechanically different, and the entry states both:

- `UNL-151`'s *"I enter ready"* and `UNL-091`'s discount are read **once**, at the moment the card is
  played (355 / 356), so the sequencing rule is simply *play first, draw after*.
- `UNL-094`'s and `UNL-098`'s `+Might` are **continuous** — 824.1.d makes them Inactive *"as soon as"*
  the balance drops — so drawing from 6 XP shrinks a Gemhand Hunter mid-board, possibly mid-combat.
  The safe band is 9+ XP for a `[Level 6]` board and 14+ for `[Level 11]`, exactly the shape
  `wuju-master-blood-rose-level` already publishes for Wuju Master's 11–13.

### 5.5 Overlap with the catalogue, declared

`poppy-confront-blood-rose` (verified 2026-09-06, issue #62 §2.6) already names `UNL-203 Keeper of the
Hammer` in its `prerequisites.easy` as the Body/Order legend whose *"When you hold, gain 1 XP"* feeds
the pool Blood Rose spends. That entry spends the XP on **Blood Rose's ready**; this one spends it on
**the legend's own draw**. They are the same faucet with two taps, and at 3 XP each **they compete**:
one Blood Rose activation is one Keeper draw forgone. Both entries now say so.

`UNL-116 Poppy, Paragon` is a Champion unit with the tag Poppy and is therefore a legal Chosen Champion
under Keeper (103.2.a.2); its *"gain 3 XP"* is exactly one draw. It is named in `notable`, not in
`uses`, because the engine does not need it.

### 5.6 Trap check

No attack trigger; no `[Repeat]`; no `[Temporary]` (a `[Temporary]` body dies at 816.1.b before the
Scoring Step and so never Holds — which is why the `[Hunt]` partner here is a printed unit); no token;
no recall; no Gold; the Energy is spent in the Main Phase so 167 does not bite; the battlefield is not
one the entry brings, so 190.6.d does not arise. Depends on no unruled reading.

---

## 6. Corrections to #116

1. **F1's premise is wrong; its conclusion is right for another reason.** XP is not a ratchet — 824.1.d
   plus 730.2 make a `[Level N]` ability Inactive the moment your own spending drops you below `N`.
   This was already registered in `wuju-master-blood-rose-level` on 2026-09-04 and #116 did not cite
   it. The reason no `[Level]` payoff can be INFINITE or CHAIN is that **nothing in the pool converts
   XP to points** (§3).
2. **C2's income was undercounted.** *"Banking 3 Holds' worth of XP (1 each)"* reads the legend as
   1 XP per turn. 315.2.b.2 Holds **all** battlefields you control and 485.4 gives a Duel **two**, so
   the legend's own ceiling is 2 a turn — and with one `[Hunt 2]` partner the engine reaches one draw
   per turn instead of one every third.
3. **C1's sequencing has a rule, and it is not 429.2.** 461.1 lets the Turn Player choose which staged
   Combat resolves first, and 316.5/316.6 allow the one-at-a-time route. 429.2 is about an Add
   resolving before other outstanding chain items and does not reach this.
4. **108.6.c was quoted at half length.** Its second clause — *"or a temporary space to hold cards
   while effects are being processed"* — admits a transient Banishment. F4 survives because 829.1.b.1
   makes the Flow banish a delayed replacement applied as the spell leaves the chain, but the clause
   had to be read to its end to know that.

Two further facts the walk adds and that were not in the issue: **"alone" is an own-side measurement**,
settled by the reminder text on `SFD-036` and `UNL-210` (§4.2); and **`UNL-119`'s removal is Riot's own
worked example under 359.3.f**, wording for wording, which fixes its Might as *current at execution*
and gives the opponent a printed out (§4.4).

No new numbered rules reading was needed. Every question this walk raised was answered by a paragraph
in the Core Rules or by reminder text printed in the pool.
