# Issue #85 — the three loose ends #62 cited and never walked

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16 · **Corpus:** `data/corpus_flat.txt`
(Riot gallery, 2026-09-04, errata applied)

#62 closed with three things written down and not walked. This is the walk. Every card text below was
grepped verbatim out of `data/corpus_flat.txt`; every rule number was opened in
`data/Riftbound-Core-Rules-2026-07-16.txt` and is quoted here as it reads there.

**Result: 2 entries `verified`, 2 refutations, 0 rewrites.** No entry changed class or quantity.

---

## 0. Ban check

`grep '\[BANNED' ` on each printing used below: **VEN-150, OGN-113, VEN-149, UNL-078, VEN-055, OGN-122,
UNL-199, UNL-200, UNL-081, UNL-T06, SFD-088, OGN-212, UNL-165, UNL-173, OGN-110, OGN-104, OGN-087** —
all clean in both formats.

## 0.1 The rules block, opened first

| rule | what it actually says |
|---|---|
| **055** | "When executing card text, do as much as you can, ignoring impossible instructions." |
| **055.1** | "If all of a card's instructions are impossible, it is still played and resolved, but nothing happens." |
| **135.2.e.5** | "Power of any Domain is represented by a swirling rainbow symbol. Its shorthand is [A]." |
| **135.2.e.6** | "Power of a domain corresponding to a card's own Domain is not represented by a symbol… Its shorthand is [C]." |
| **164.2.a / 164.2.b** | a Basic Rune always has "[E]: [Reaction] — Add [1]." and "Recycle this: [Reaction] — Add [C]." |
| **167** | "Every player's Rune Pool empties at the start of each player's Main Phase and the end of each player's turn." |
| **185 / 185.1.a** | "Tokens are not cards." / "Token Game Objects cannot lose their token nature by any means." |
| **186.1** | a token put into any Non-Board Zone besides the chain "ceases to exist immediately after". |
| **316.3** | "1. Each player's Rune Pool empties. Any unspent Energy and Power are lost." (end of turn) |
| **356.4.b** | "Discounts may say that cards 'cost [amount] less' or that one or more of their costs are 'reduced by [amount]'." |
| **356.4.c / c.1** | component discounts are applied when that component is added, and may be applied in any order. |
| **356.4.e** | **"If a discount applies a minimum cost, that minimum applies only to that discount."** Worked example: Eager Apprentice + Sky Splitter, where ordering the two discounts differently gives 0 or 1 Energy. |
| **356.6** | "Energy and Power costs can't be reduced below 0." |
| **359.3.f.2** | referents like "here" / "its" are "checked on execution of the instruction". Worked example: a Yasuo moved home in response makes his own attack trigger mistarget. |
| **359.3.f.2.a** | "When a referent checks information on execution … and that target isn't legal, that referent will return 'null' and **all instructions related to it** will be ignored." |
| **359.3.f.3** | information referenced *from the trigger condition* is checked when the condition is fulfilled (Lillia example). |
| **366.2** | "Passive Abilities can alter the costs of cards as they are played." |
| **375** | Replacement inheritance. Its third worked example is the only place the rules print **"Then do this:"** — *"A spell reads 'play a ready 3 [M] Mech token. Then do this: Give it Temporary.'"* — and the substituted Recruit token "enters ready **and is given Temporary**". |
| **315.1.b** | Awaken, step 1: "The Turn Player readies all Game Objects they control that are able to be readied." |
| **377.1** | "Activated Abilities are recognized by the presence of a ':' in the text of the card, preceded by a cost and succeeded by an effect." |
| **702.3** | "There can only be one Buff on a Unit at a time." |
| **415.1** | "Readying is an action that marks a non-spell Game Object on the board as available for action." |
| **428.1.a.1** | "Active Kill is when the action is taken when instructed by a game effect **or as a cost** for a card or ability." |
| **429.2** | "Triggered and activated abilities that Add resources resolve as soon as they are finalized." |
| **431.1.a** | drawing in excess of the Main Deck burns out. |
| **477.1.b.1.a** | copyable traits are Name, Super Type, Type, Tags, Cost, Domain, Rules Text. **Might is not on the list.** |
| **808.1.a / 808.1.d.2** | Deathknell "is present on **Permanents**"; the trigger is added to the chain as a Pending Item "before the **card** with an ability that triggers on its own death is moved to the trash due to a Kill instruction". |
| **818.1 / 818.1.a** | "Equip is an Activated Ability keyword." / "Equip is present on Gear with the tag Equipment." |
| **827.1.c.1** | "Empower is functionally short for '[Cost]: Empower this. Play only if not Empowered.'" |
| **103.1.b.1 / 103.2.b** | deck cards abide by the legend's Domain Identity; up to 3 copies of a named card. |

Note on **808.1.d.2 vs 428.1.a.1.b**: `sprite-fountain-malzahar-jayce` cites 428.1.a.1.b for a **gear**
Deathknell firing on a cost-kill, and 428.1.a.1.b's own sentence says *"When a **unit** with a Deathknell…"*.
The conclusion is right but the tighter citation is **808.1.a** ("present on Permanents") plus
**808.1.d.2** ("the **card** with an ability that triggers on its own death"), which covers gear on its face.
Recorded, not changed — the existing entry's claim is not wrong.

---

## 1. `VEN-055 Applied Researchers` against the #21 ledger

```
VEN-055 | Applied Researchers | Unit | Mind | E4 M4 | [Empower] :rb_energy_3: (:rb_energy_3:: Empower me.
  Use only if not Empowered.) [Empowered][>] Your spells cost :rb_energy_1::rb_rune_rainbow: less, to a
  minimum of :rb_energy_1:. [Tags: Shurima]
```

The question #85 asks is narrow and it has a measured answer: **does it move the price of a draw in the
Lux loop?** The ledger to beat is `docs/phase0/walks/2026-09-04-loop-budget-ledger.md`, whose three
exchange rates are (1) one Energy pass = +1 Energy, (2) 1 Power = 9 Energy, (3) one extra cycled card =
1 spare slot + 1 draw, bought from Renata Mastermind at 1 Energy + 1 Mind Power ≈ 10 Energy.

### 1.1 What the card is allowed to touch

It says **"Your spells"**. Of the four things the Energy pass pays for, two are spells and two are not:

| card | type | printed cost | discounted |
|---|---|---|---|
| `UNL-165 Shadow's Call` | **Spell** (Order) | 2 Energy, no Power | **1 Energy** |
| `UNL-173 Sacrifice` | **Spell** (Order) | 1 Energy, no Power | 1 Energy — already at this discount's own minimum |
| `OGN-110 Ekko, Recurrent` | Unit | 5 Energy + 1 Mind | untouched |
| `OGN-212 Forge of the Future` | Gear | 2 Energy | untouched |

The rainbow half is worth nothing on either spell: both have a printed Power cost of 0, and **356.6**
forbids reducing a Power cost below 0.

The Power pass is worse still: its only spell is `OGN-104 Retreat` (Mind, **1 Energy**, no Power), already
at the floor. `OGN-087 Lecturing Yordle` is a Unit and the Forge is Gear. **Zero savings on the Power pass.**

### 1.2 The three rates, re-measured

| rate | before | with one Empowered Applied Researchers |
|---|---|---|
| 1. Energy pass | 10 Energy spent, 11 runes readied + 1 channelled → **+1 Energy** | 9 Energy spent → **+2 Energy** |
| 2. 1 Power | 9 Energy (= 9 energy passes) | **9 Energy**, unchanged (= 4.5 passes) |
| 3. 1 extra cycled card | 1 Energy + 1 Mind Power ≈ 10 Energy | **unchanged** |

Rate 3 is the answer to #85's question, and it is a **no**. `SFD-088 Renata Glasc, Mastermind`'s
`1 Energy + 1 Mind: Draw 1` is an **Activated Ability** — **377.1** makes the ":" the whole recognition
test — and Applied Researchers discounts *spells*. It never sees her.

And the wall itself does not move. The ledger's "0 spare draws" is **431.1.a**: with the Main Deck empty,
the fifth draw of a pass is a Burn Out and a point for the opponent. A discount buys Energy, not cards.
**Applied Researchers cannot widen the loop by one card.**

What it does buy is convergence speed: the same infinite Energy arrives in half the passes. Since the
loop was already unbounded, that changes nothing about what is reachable, which is why this is a walk
result and not an entry about the Lux loop.

### 1.3 Where it *does* move a number: any spell with a Power cost

The rainbow half is worth **9 Energy** every time it lands, because rate 2 says so. Against the four
payoffs the ledger priced:

| payoff | its spells | before | after one Applied Researchers |
|---|---|---|---|
| `renata-bubble-bot-ready` | Retreat only (E1, floor); `SFD-073` is Gear, `SFD-062` is a Unit | ≈ 54 / point | **≈ 54**, no change |
| `ashe-retreat-hand-strip` | Retreat only; `UNL-169 Ashe, Focused` is a Unit | ≈ 25 / card | **≈ 25**, no change |
| `jayce-mesmerize-renata` | `VEN-052 Mesmerize` — **Spell, E1 + 1 Power** → E1 + **0** Power | 12E + 7 Power ≈ 75 / point | 12E + **6** Power ≈ **66 / point** |
| `promising-future-force-deck` | `OGN-115 Promising Future` — **Spell, E5 + 1 Power** → **E4 + 0** Power | 6E + 2 Power ≈ 24 / cast | 5E + **1** Power ≈ **14 / cast** |

`SFD-073 Experimental Hexplate`'s `[Equip] :rb_rune_mind:` is untouched for a second reason on top of
being gear: **818.1** makes Equip an Activated Ability, so attaching is never playing a spell.

### 1.4 Three copies, and why no rules reading is needed

**356.4.e** decides the stack: *"If a discount applies a minimum cost, that minimum applies only to that
discount."* Three Applied Researchers are three separate passive abilities on three separate game
objects, so they are three discounts, each carrying its own 1-Energy minimum:

- **Energy floors at 1 and does not chain.** Copy #1 takes a 2-Energy spell to 1; copy #2 cannot take it
  below *its own* minimum of 1. So the Energy component of any spell bottoms out at 1 however many copies
  are out.
- **The Power halves do chain**, because the printed minimum is stated in Energy and nothing else floors
  Power except **356.6**'s zero.

`OGN-122 Time Warp` (Mind, **10 Energy + 4 Power**; its Power symbol is [C], its own domain — **135.2.e.6** —
and **no card in the pool has a printed [A] Power cost**, verified over all 1,189 printings) therefore goes:

| copies Empowered | Time Warp costs |
|---|---|
| 0 | 10 Energy + 4 Mind |
| 1 | **9 Energy + 3 Mind** |
| 2 | 8 Energy + 2 Mind |
| 3 | **7 Energy + 1 Mind** |

Two things this did **not** need:

- **No reading on whether an [A] discount removes a [C] cost.** It has to: every Power cost printed in
  this pool is [C], zero are [A], so a rainbow discount that only removed rainbow symbols would be dead
  letter across the whole game. That is the rule-002 / R28 argument, and it is decided by the pool, not by
  a vote.
- **No reading on what "to a minimum of [1 Energy]" floors.** Whether it floors the Energy component or the
  total, the answer is the same for every spell in this walk: Time Warp lands at 7 Energy, far above
  either floor; Shadow's Call goes 2 → 1 either way; Sacrifice does not move either way. The ambiguity
  never bites, so it is recorded and not filed.
- **476.1 is the wrong frame** and was not used. Cost determination is **356**, a step of playing a card;
  476/477 are the layer system for game objects on the board. Reaching for 476.1 here is the citation
  error the 2026-09-04 audit found three times.

### 1.5 Verdict

The ledger question is answered **no** — rates 2 and 3 do not move and the draw wall is untouched — and
the walk keeps the by-product: **one entry**, `applied-researchers-time-warp-discount`, ENGINE. It brings
`VEN-055` into the catalogue, where it appeared in **zero** entries before.

---

## 2. The "Jayce infinite": `VEN-150 Acceleration Gate` + `OGN-113 Malzahar, Fanatic`

```
VEN-150 | Acceleration Gate | Spell | Mind/Body | E3 P1 | Ready up to 4 units, gear, and/or runes. [Tags: Jayce]
OGN-113 | Malzahar, Fanatic | Unit | Mind | E4 M3 | Kill a friendly unit or gear, :rb_exhaust:: [Action] —
  [Add] :rb_rune_rainbow::rb_rune_rainbow:. (Use on your turn or in showdowns. Abilities that add resources
  can't be reacted to.)
VEN-149 | Defender of Tomorrow | Legend | Mind/Body | - | [Empower] :rb_energy_2::rb_rune_rainbow::rb_rune_rainbow:
  … :rb_energy_1:, :rb_exhaust:: Ready a gear. [Empowered][>] :rb_energy_1:, :rb_exhaust:: Ready 2 gear. [Tags: Jayce]
UNL-078 | Sprite Fountain | Gear | Mind | E2 P1 | [Temporary] … When you play this, play a ready 3 :rb_might:
  Sprite unit token with [Temporary] to your base. [Deathknell][>] Repeat this gear's play effect.
```

### 2.1 What the source actually says

`5__EMKuKkTE` `[12:43]`, transcript pulled with `yt-dlp --skip-download --write-auto-sub` on 2026-09-06:

> "There's also like an infinite combo because of his signature spell. It like untaps up to uh four gears
> or like runes and units. So, like there's some cute infinites you can do, but they all require you to
> like untap with a Malzahar on board, which almost never happens in competitive."

That is the whole claim. It names no fuel, no ledger and no loop — and it is itself dismissive. #62 was
right to file it as a direction, not a combo.

### 2.2 The shell is forced, and that is what kills the infinite

Acceleration Gate is **Mind/Body**, so by **103.1.b.1** it needs a legend holding both domains. Sweeping
all **49 legend rows** in the corpus and counting their domain pairs: **exactly one is Mind/Body —
`VEN-149 Defender of Tomorrow`.** (Body/Order 5, Mind/Order 4, Calm/Body 4, Fury/Body 4, Body/Chaos 3, …
and **Mind/Body 1**.) Everything below is therefore inside Mind + Body, and the two Order/Fury recursion engines the
catalogue normally leans on — `OGN-212 Forge of the Future` (Order) and `OGN-036 Vi, Destructive` (Fury) —
are **illegal here**.

**(a) The Gate does not come back.** Every card in Mind/Body that touches the trash was read:

| card | why it is not a free repeatable recursion |
|---|---|
| `OGN-112` | "When I conquer, you may play a spell from your trash…" — once per conquer, and needs a conquer |
| `VEN-049`, `VEN-051`, `VEN-081` | `[Flow]` — one replay from the trash, then **banish it** |
| `OGN-099 Garbage Grabber` | `Recycle 3 from your trash, :rb_energy_1:, :rb_exhaust:: Draw 1` — an exhaust in the cost, so once per turn (#59's finding, and #62's correction that it lives *between* turns does not help inside one) |
| `SFD-061` | returns a **gear** from the trash, not a spell |
| `OGN-109 Dr. Mundo` | recycles 3 at the start of your Beginning Phase — bottom of deck, once a turn |
| `VEN-089` | reads the top of the **deck**, not the trash |

So the Gate is capped by **103.2.b** at **3 copies, full stop**.

**(b) Malzahar does not come back either.** Every card in Mind/Body that readies something other than
itself was read: `VEN-149` (the legend — exhaust, and it readies **gear**, so it never reaches Malzahar),
`VEN-068 Jayce, Brilliant Inventor` ("the **first time** you play a non-token gear **each turn**"),
`UNL-109` (`Spend 3 XP, :rb_exhaust:`), `OGN-132`/`SFD-062` (one ready per play), `OGN-146`/`OGN-153`
(spells, capped at 3 copies, and 702.3 caps buffs at one per unit). **Nothing readies a unit repeatably
for free inside one turn.**

Both halves fail independently. **The "Jayce infinite" is refuted as INFINITE.**

### 2.3 The ledger #85 asked for, and what it does close as

Since the mechanism is bounded, price it. Malzahar's fuel is any friendly unit **or gear**, and the
cheapest self-multiplying fuel in Mind is Sprite Fountain: one card, three bodies.

**One Fountain round** (all three Malzahars ready):

| step | Energy | Power |
|---|---|---|
| Play `UNL-078 Sprite Fountain` → a ready Sprite at base | −2 | −1 Mind |
| Malzahar #1 kills the **Fountain** as the ability's cost (**428.1.a.1**) and exhausts → `[Add]` 2 rainbow, which resolves at once (**429.2**) | | **+2** |
| the Fountain's Deathknell (**808.1.a**, **808.1.d.2**) repeats its play effect → a second ready Sprite | | |
| Malzahar #2 kills Sprite A → `[Add]` 2 rainbow | | **+2** |
| Malzahar #3 kills Sprite B → `[Add]` 2 rainbow | | **+2** |
| **round** | **−2** | **+5** |

**Each extra round needs a Gate:** `−3 Energy −1 Power`, readying the three exhausted Malzahars
(**415.1**) plus one exhausted rune, and exhausting that rune back for `+1 Energy` (**164.2.a**).
So a Gated round is `−2E +5P −3E −1P +1E` = **−4 Energy, +4 Power**.

**A maximal turn** — 3 Fountains, 2 Gates, 3 Malzahars already on the board:

| | Energy | Power |
|---|---|---|
| round 1, off the Awaken readies (**315.1.b**) | −2 | +5 |
| round 2, Gated | −4 | +4 |
| round 3, Gated | −4 | +4 |
| **turn** | **−10** | **+13** |

Thirteen Power for ten Energy in one turn, against a catalogue whose standing rate is **9 Energy per
Power**. That is worth an entry — as an **ENGINE**, because **316.3** empties the Rune Pool at the end of
the turn and nothing in the line scores. It is `malzahar-gate-sprite-fountain-power`.

### 2.4 The traps that were checked and did not bite

- **185 / 186.1 (#62's own finding) does not apply.** Malzahar **kills**; he does not recycle. Killing a
  token is legal; 186.1 only says the dead Sprite ceases to exist instead of sitting in the trash, which
  this line never wanted.
- **816.1.b does not bite.** The Sprites and the Fountain are `[Temporary]`, but they are all eaten in the
  same Main Phase they are made, long before any Beginning Phase.
- **167 does not bite, 316.3 does.** The Power is Added in the Main Phase, so it survives *that turn* and
  is lost at its end. Nothing carries over — hence ENGINE.
- **The Gate's rune readies are worth little**, exactly as `platewyrm-egg-defender-gate` already records:
  164.2.a gives Energy by exhausting, 164.2.b gives Power only by recycling, and a recycled rune leaves the
  board.
- **This is not `sprite-fountain-malzahar-jayce`.** That entry is Calm/Mind, its third card is
  `VEN-068`, and it *keeps* the Sprites — `produces: temporary-body-engine`, "18 Might of ready bodies".
  This one is Mind/Body, its extra cards are the Gate and the Jayce legend, and it *eats* the Sprites —
  `produces: resource-engine`. Same two-card core, opposite payload. Said out loud in the entry's notes so
  nobody re-merges them.

---

## 3. The permanent Reflection token — **refuted**

```
UNL-199 | Deceiver | Legend | Mind/Order | - | When you conquer or hold, you may discard 1 and exhaust me
  to play a ready Reflection unit token there. Then do this: It becomes a copy of another unit there.
  Give it [Temporary]. [Tags: LeBlanc]
UNL-T06 | Reflection | Unit | Colorless | M0 | (I become a copy of something when played. I don't get that
  card's play effects.)
```

### 3.1 The claim, verbatim

`czSNBWRpC4I` `[6:41]`–`[7:18]`, transcript pulled with yt-dlp on 2026-09-06:

> "There's actually a way of putting a reflection token that doesn't have temporary. … I use Black Rose
> Dignitary and I attack into Star Spring. I successfully attack. I now triggered the deceiver. If my
> opponent, in response to the trigger of the deceiver, will for example bounce my Dignitary to my hand or
> like with a Gust or a Star Cross, then after that happens my token spawns and it has nothing to look at
> and nothing to target, and because of it has nothing to target the instruction from the deceiver cannot
> really resolve, so we don't give it temporary. That's the only scenario where a reflection token will
> not have the temporary ruling."

### 3.2 Why it fails: 055 plus the only worked example of "Then do this:"

Deceiver's resolution is three instructions:

1. play a ready Reflection unit token **there**,
2. it becomes a copy of **another unit there**,
3. **give it [Temporary]**.

With the last other body gone, instruction 2 is impossible. **055** then says exactly what happens:
*"When executing card text, do as much as you can, ignoring impossible instructions."* Instruction 2 is
ignored. Instruction 3 is **not** impossible: its "it" is the Reflection token, which was played by
instruction 1 and is sitting there legally.

**359.3.f.2.a** is the rule that would have to save the claim, and it does not: *"…that referent will
return 'null' and **all instructions related to it** will be ignored."* The null referent is the copied
unit. "Give it [Temporary]" is related to the **token**, not to the copied unit.

And **"Then do this:"** is a referent binder, not a conditional gate. The rules print the phrase exactly
once, in **375**'s third example — *"A spell reads 'play a ready 3 [M] Mech token. Then do this: Give it
Temporary.'"* — where a **substituted** Recruit token, which the effect never named, still "enters ready
**and is given Temporary**". The clause after "Then do this:" attaches to whatever token actually arrived.

**So the token enters with [Temporary] and dies at the start of the next Beginning Phase before scoring
(816.1.b). The claim is refuted.**

### 3.3 And it could not be forced anyway

Two independent reasons, either of which is enough:

- **The opponent executes it.** Nothing in the deck causes the removal. #62 said so and it is right.
- **The self-forced version dies on 359.3.f.2.** The obvious way to force it is `UNL-081 Keeper of Masks`
  — *"When you play me, play two Reflection unit tokens **here**. Then do this: They become copies of me."*
  — killing your own Keeper in response to its own play trigger. But "here" is a **referent checked on
  execution** (359.3.f.2), and its worked example is precisely a source removed in response making its own
  trigger mistarget. With Keeper gone, "here" is null and **no tokens are played at all**. There is nothing
  left to be permanent. (Deceiver's "there" is safe from this, because 359.3.f.3 reads it from the trigger
  condition — but Deceiver is the version the deck cannot force.)
- Even granting the source's reading, Deceiver **exhausts** to make the Reflection and readies only in your
  Awaken (315.1.b), so the ceiling is **one 0-Might body per turn**, contingent on an opponent's removal
  spell. Not a Grand Plaza plan.

**Verdict: not an entry, not a synergy rule, nothing.** A synergy rule is an anchor plus a predicate over
*the pool*; the "partner" here is a card in the opponent's deck.

### 3.4 One contradiction found in the same source, worth recording

Same video, `[7:52]`:

> "Now, the token unit that is the reflection, once it copies successfully a unit, it stops being a token
> and it counts as an actual unit, which is very important…"

That is false under the current rules: **185.1.a** — *"Token Game Objects cannot lose their token nature
by any means."* The speaker flags it himself as *"a ruling that is not going to be in the game anymore
once Vendetta gets released"*, and Vendetta is in this pool, so 185.1.a governs. Recorded because it is the
same family of mistake #62 caught twice (two sources believing Mech tokens were recycle fuel).

His other two claims in the passage **do** hold: bouncing a Reflection to hand kills it (**186.1**), and
"you can copy a copy" (**477.1.b.1.a** makes Rules Text copyable, and R27 — retired 2026-09-04 — leaves the
copy at 0 Might).

---

## 4. What this walk changed

| | |
|---|---|
| entries added, `verified` | **2** — `applied-researchers-time-warp-discount`, `malzahar-gate-sprite-fountain-power` |
| entries rewritten | **0** |
| claims refuted | **2** — the "Jayce infinite" (as INFINITE; it closes as ENGINE), and the permanent Reflection token |
| ENGINE that turned out INFINITE | **none** |
| new numbered readings filed | **none** |

Appendix appended to `docs/phase0/walks/2026-09-04-loop-budget-ledger.md` with §1's re-measurement.
