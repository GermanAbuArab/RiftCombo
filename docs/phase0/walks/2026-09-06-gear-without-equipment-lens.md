# Hand walk — the gear-that-is-not-Equipment lens (issue #107)

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16
**Result: 1 candidate walked, 1 HOLD after a rewrite of its arithmetic, 0 refuted.
Plus 1 SECOND entry the walk found on the same never-catalogued card.**
**Both ENGINE. No INFINITE, no BURST, no CHAIN, no ALT_WIN.**

The lens is `grep -n "| Gear |" data/corpus_flat.txt | grep -v "Tags:.*Equipment"` — re-run here:
**107 `Gear` lines, 67 without the `Equipment` tag.** The issue's count reproduces exactly.

`UNL-174 Shard of Undoing` really had **zero** occurrences in `data/combos.json` and `data/synergies.json`
before this walk (`grep -c 'UNL-174'` → 0 and 0; `grep -ci 'Shard of Undoing'` → 0 and 0), so the
whole card is new ground.

---

## Step 1 — card text, verbatim from `data/corpus_flat.txt`

```
627:UNL-078 | Sprite Fountain | Gear | Mind | E2 P1 | [Temporary] (Kill this at the start of its
      controller's Beginning Phase, before scoring.) When you play this, play a ready 3 :rb_might:
      Sprite unit token with [Temporary] to your base. [Deathknell][>] Repeat this gear's play
      effect. (When this dies, get the effect.)

723:UNL-174 | Shard of Undoing | Gear | Order | E6 | The first time a friendly unit dies during
      your Beginning Phase each turn, each opponent must kill one of their units.
```

The four Mind/Order legends, also verbatim (`grep "| Legend |" | grep -i mind | grep -i order`):

```
271:OGN-265 | Herald of the Arcane | Legend | Mind/Order | ... [Tags: Viktor]
325:OGS-021 | Lady of Luminosity - Starter | Legend | Mind/Order | ... [Tags: Lux]
528:SFD-201 | Chem-Baroness | Legend | Mind/Order | ... [Tags: Renata Glasc]
748:UNL-199 | Deceiver | Legend | Mind/Order | - | When you conquer or hold, you may discard 1 and
      exhaust me to play a ready Reflection unit token there. Then do this: It becomes a copy of
      another unit there. Give it [Temporary]. [Tags: LeBlanc]
```

**Ban check (step 3).** `data/legality.src.json` names exactly eleven cards across both formats —
Aspirant's Climb, Called Shot, Draven Vanquisher, Fight or Flight, Obelisk of Power, Reaver's Row,
Scrapheap, Stealthy Pursuer, The Arena's Greatest, The Dreaming Tree, Wuju Bladesman - Starter.
Neither gear, neither the Sprite token, and none of the four legends is on it.

---

## Step 2 done first, in bulk: every citation opened by exact number

| cited | verbatim from `data/Riftbound-Core-Rules-2026-07-16.txt` | verdict |
|---|---|---|
| **816.1** | *"Temporary is a Triggered Ability keyword."* | holds |
| **816.1.b** | *"It is functionally short for 'At the start of this permanent's controller's Beginning Phase, before scoring, kill this.'"* | holds |
| **816.1.c** | *"The Trigger Condition is the controller of the permanent's Beginning Phase starting."* | holds — this is the whole entry |
| **187.2** | *"A 3 [M] Sprite token with Temporary is a domainless unit token with 3 Might, the Fae tag, and the Temporary keyword."* | holds |
| **185.2.d** | *"Tokens have a type. They follow all rules for their type unless otherwise specified. Example: A token unit is a unit…"* | holds — the Sprite is a unit that can die |
| **370.3** (worked example) | *"The first unit dies simultaneously with a 1 [M] Recruit token."* | holds — the rules' own prose has tokens **dying** |
| **186.1** | *"If a token is put into any Non-Board Zone besides the chain, it ceases to exist immediately after moving to its new zone."* | holds — *after* moving, so the Kill of 428.1 completes first |
| **428.1** | *"Killing is the action of a Permanent going to the trash from the board."* | holds |
| **808.1.a** | *"It is present on Permanents."* | holds — a **gear** may carry a Deathknell |
| **808.1.d.2** | *"The trigger will be added to the chain as a Pending Item before **the card with an ability that triggers on its own death** is moved to the trash due to a Kill instruction or a Cleanup."* | holds — this, **not** 428.1.a.1.b, is the paragraph for a gear (428.1.a.1.b says *"a unit"*) |
| **808.1.d.3** | *"Before the card is moved to the Trash, note its location, its attributes, and any other details related to the effect of its triggered ability to process the trigger after it has been Finalized."* | holds — **0 prior hits in `combos.json`** |
| **808.1.d.1** | *"If the Permanent with the effect is not sent to the Trash… the triggered ability will be removed from the chain."* | holds, and does not bite: nothing replaces the Fountain's death |
| **383.1** | lists *"the phrase 'the [Nth] time' followed by a game action or event"* as a trigger identifier | holds |
| **383.1.b** | *"If an ability triggers 'the [Nth] time' something happens and that trigger condition is met multiple times simultaneously, the ability's controller picks one of those instances… The ability triggers only once."* Worked example: **Wraith of Echoes, *"The first time another friendly unit dies each turn, draw 1."*** | holds — near-verbatim the Shard's wording |
| **383.3.e.1** | *"Such a Triggered Ability will only be performed the specified number of times each turn. If its trigger condition would be fulfilled and it has already been performed that many times, it does not trigger."* | holds — **0 prior hits in `combos.json`**, and it is what caps the whole entry |
| **383.2.c.1** | *"…it is evaluated and subsequently triggered if it enters that zone **at the same time** that its Trigger's condition is met."* | holds — the reason a Sprite born mid-window survives |
| **383.2.c.2** | *"A Game Object will not be able to successfully evaluate its Trigger Condition… if it leaves the zone that its Trigger is active from at the same time that its Trigger is satisfied."* (Viktor, Leader example) | holds, and does **not** bite the Shard: the Shard has no [Temporary] and never leaves |
| **383.3.d** | *"If more than one Triggered Ability is Triggered simultaneously, then the player that controls the Abilities selects the order to place them on the Chain."* | holds — but see the correction: it is **not** load-bearing here |
| **340.1** | *"The newest Finalized Chain Item resolves. Execute its game effects in their entirety."* | holds — the two Temporary kills resolve **sequentially**, not simultaneously |
| **340.3** | *"If the Chain is not empty and there are one or more Pending Items, return to Step 1: Finalize."* | holds |
| **315.1.b** | *"The Turn Player readies all Game Objects they control that are able to be readied."* | holds — Awaken precedes the Beginning Phase |
| **315.2.a.1** | *"At the start of Beginning Phase game effects take place."* | holds |
| **315.2.b.2** | *"1. The Turn Player Holds all Battlefields they Control."* | holds — the Scoring Step is **after** the Beginning Step |
| **315.4.b** | *"1. The Turn Player draws 1."* | holds |
| **355.10.e** | *"It is part of a set of objects chosen in whole or in part by other players. e.g., **'Each player kills a unit they control' does not target.** Each player, including the one who played the spell, chooses a unit to kill as the spell or ability resolves."* | holds — **0 prior hits in `combos.json`** |
| **355.10.f** | *"It is identified in an instruction that a player 'must' complete. e.g., 'You must recycle one of your runes' doesn't target anything. You choose from among your runes as the spell or ability resolves."* | holds — **0 prior hits in `combos.json`** |
| **809.1.c** / **809.1.d** | *"Spells and abilities an opponent controls that **target** [me/this] cost… more"* / *"It is an effect that imposes a Mandatory Additional Cost on Spells and Abilities that **choose** the Game Object that has this ability."* | holds — so [Deflect] never taxes the Shard |
| **055** | *"When executing card text, do as much as you can, ignoring impossible instructions."* | holds |
| **103.1.b.4** | *"If a card has more than one Domain, then that card is permitted only in a Domain Identity that contains all of the indicated Domains on that card."* | holds — but see below, neither gear is multi-domain |
| **103.1.b.3** | *"If a card has a single Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain."* | holds — this is the right paragraph, not 103.1.b.4 |
| **103.2.b** | 3 copies of a Main Deck card | holds |
| **355.2.a** | *"By default, Valid locations include the controller's Base or a Battlefield the controller controls."* | holds |

### Four blocks the catalogue had never cited

`grep -o` over `data/combos.json` **before** this walk:

- **`355.10.e` — 0 hits. `355.10.f` — 0 hits.** Between them they say that *"each opponent **must** kill
  one of their units"* **does not target anything**: the set is chosen by another player (355.10.e)
  and the instruction says *"must"* (355.10.f). The rules' own worked example at 355.10.e is
  *"Each player kills a unit they control"*, which is the Shard's sentence with the subject changed.
  Two consequences the entry stands on: **[Deflect] never taxes it** (809.1.c/d charge only for
  *targeting* / *choosing*, and the chooser here is the opponent), and **the opponent picks which of
  their own units dies** — so the removal is forced, but never a removal you aim.
- **`383.3.e.1` — 0 hits.** *"Such a Triggered Ability will only be performed the specified number of
  times each turn."* This is the paragraph that caps the whole engine at **one forced kill per turn**
  no matter how many bodies die, and it is what the issue's arithmetic did not price.
- **`808.1.d.3` — 0 hits.** *"Before the card is moved to the Trash, note its location, its attributes,
  and any other details…"* — the reason the Fountain's Deathknell can still repeat *"this gear's play
  effect"* after the gear is in the trash.

### One citation the walk corrected on an existing verified entry

`sprite-fountain-malzahar-jayce` cites **428.1.a.1.b** for the Fountain's Deathknell firing. That
paragraph opens *"When **a unit** with a Deathknell…"* — the Fountain is **gear**. CLAUDE.md already
records the right pair (**808.1.a** *"It is present on Permanents"* + **808.1.d.2** *"the card with an
ability that triggers on its own death"*) from the #85 walk, and it had never been applied here. The
entry's mechanism, class and quantities are untouched; only the rule number moved.

---

## Candidate 1 — `sprite-fountain-shard-undoing-beginning-removal` · **HOLD, arithmetic rewritten**

### The mechanism, step by step

Awaken (315.1.b) runs first, then the Beginning Phase opens (315.2.a.1). On the turn **after** you
play the Fountain, **both** [Temporary] abilities have the same Trigger Condition — *"the controller
of the permanent's Beginning Phase starting"* (816.1.c) — so both go on the chain and you order them
(383.3.d). They then resolve **one at a time** (340.1), so the two kills are **sequential, never
simultaneous**.

1. The Sprite's Temporary resolves: *"kill this"* (816.1.b). The Sprite is a unit (185.2.d, 187.2), it
   goes to the trash (428.1) and only then ceases to exist (186.1). **A friendly unit has died during
   your Beginning Phase** → the Shard triggers (383.1). It resolves as a newer chain item (340.1,
   340.3): each opponent must kill one of their units. **Forced removal #1.**
2. The Fountain's Temporary resolves: *"kill this"*. It is a permanent with a Deathknell (808.1.a),
   so 808.1.d.2 puts the Deathknell on the chain as a Pending Item **before** the gear reaches the
   trash, and 808.1.d.3 preserves what it needs to execute. Nothing replaces the death, so 808.1.d.1
   does not remove it.
3. The Deathknell repeats the play effect: a **second** ready 3 Might Sprite with [Temporary] at your
   base.
4. **That second Sprite does not die this turn.** 383.2.c.1 triggers an ability only if its object
   *"enters that zone **at the same time** that its Trigger's condition is met"*, and the Trigger
   Condition of Temporary is the **start** of the Beginning Phase (816.1.c), which has already
   happened. This is the same window `gutter-palace` runs on (issue #62, recorded in CLAUDE.md).
5. Next turn the second Sprite's Temporary fires, it dies, the Shard's *"first time … each turn"*
   counter has reset → **forced removal #2**. The Fountain is in the trash; there is no third Sprite.

### The correction: the ceiling is one kill **per turn**, so the copies must be staggered

The issue wrote *"2 disparos de remoción forzada por copia de Fountain … con 3 copias, hasta 6 turnos"*.
The ceiling of 6 is right; the **reason** is not stated, and the play that reaches it is not the
obvious one.

**383.3.e.1** caps the Shard at one performance per turn. So:

| how the three Fountains are played | Sprite deaths | Shard triggers |
|---|---|---|
| all three on turn **T** | 3 on T+1, 3 on T+2 | **2** — 383.3.e.1 discards four of the six deaths |
| on **T, T+1, T+2** | T+1(1), T+2(2), T+3(2), T+4(1) | **4** |
| on **T, T+2, T+4** | one death in each of T+1…T+6 | **6** |

Each Fountain supplies exactly two consecutive turns of Beginning-Phase deaths (T+1 and T+2), so the
only line that reaches six is a **two-turn cadence**. That is the honest reading of "hasta 6": it is
not a quantity you hold, it is a schedule you have to play to.

Cost of the full line: **6 Energy** (Shard) + **3 × (2 Energy + 1 Mind Power)** = 12 Energy and 3 Mind
Power, spread over five turns, for six forced kills the opponent chooses.

### Domain

Sprite Fountain is **mono-Mind**, Shard of Undoing is **mono-Order** — so the paragraph is
**103.1.b.3** (single domain), not 103.1.b.4, which the issue cited. The deck still needs a legend
whose two domains cover both, and the pool has exactly four (list above), none banned.

### The five authoring traps

1. *Entering an empty enemy battlefield is not an attack.* No combat anywhere in this line.
2. *Energy added in Awaken or the Beginning Phase is lost at the Main Phase start (167).* Nothing
   here adds Energy; the engine spends none at trigger time.
3. *A Repeat gives no window to re-exhaust between executions (429.3, R21).* The Fountain's *"Repeat
   this gear's play effect"* is prose, not the [Repeat] keyword of 820 — there is no Repeat Cost.
   820.1.c.3 is not in play.
4. *Temporary tokens die before Scoring, so they never Hold and never see a Main Phase start
   (816.1.b).* **This entry is built on that trap rather than tripping over it**: the death is the
   product. It is also why it does not contradict `sprite-fountain-malzahar-jayce`, whose REFUTE note
   killed both of that entry's sinks with exactly this sentence.
5. *Recycling a rune for Power sends it to the Rune Deck (161.2.b).* No rune recycling here.

### What it is not

- **Not INFINITE.** No step repeats within a turn; the fuel is three cards deep and 383.3.e.1 caps
  the payoff at once per turn. There is no "repeat" step and there must not be one.
- **Not BURST/CHAIN/ALT_WIN.** Nothing in the line scores a point or says you win.
- **Not aimed removal.** 355.10.e/f: the opponent chooses, so they will kill their cheapest body — a
  Recruit or a Bird token is a unit (185.2.d). Against a wide board this is near-worthless; against a
  board of two premium units it is the difference. The entry says so.
- **A whiff still burns the turn.** If the opponent controls no units, 055 ignores the instruction,
  but 383.3.e.1 counts the performance. Irrelevant in practice — an opponent with zero units has
  nothing to lose either way.

**Verdict: HOLD as ENGINE, `produces: repeatable-removal`, with the schedule written into
`terminatesIn` and 383.3.e.1 named in `notable`.**

---

## The walk's own finding — `shard-undoing-deceiver-reflection-removal` · **new entry, unbounded**

The Fountain is a **two-turn** supply of Beginning-Phase deaths. The Shard wants **one** such death
per turn, forever. The pool already contains a card that provides exactly that, and it is one of the
four legends candidate 1 already has to choose from.

`UNL-199 Deceiver`: *"When you conquer or hold, you may discard 1 and exhaust me to play a ready
Reflection unit token there. Then do this: It becomes a copy of another unit there. **Give it
[Temporary].**"*

The Reflection is born in the **Scoring Step** (315.2.b.2) or later in the Main Phase, i.e. **after**
the Beginning Phase started — so 383.2.c.1 spares it that turn, exactly as it spares the Fountain's
second Sprite. Next turn its Temporary kills it in the Beginning Step (816.1.b, 315.2.a.1), **before**
the Scoring Step where the next Reflection is made. One friendly unit death in your Beginning Phase,
every turn, for as long as you hold or conquer. The legend exhausts and readies in Awaken (315.1.b),
so it is once per turn — which is precisely the Shard's own cap.

This is not a new reading: `leblanc-zilean-reflection-doubling` **already says in its own step 2**
that unprotected Reflections *"die at your Beginning Phase (816.1.b)"*. That entry spends
`UNL-090 LeBlanc, Everywhere at Once` to **prevent** that death (R10 = A). This entry is the mirror
image — it wants the death — so **the two lines cannot share a battlefield**, and the new entry says
so.

Cost per turn: **discard 1** (the whole of your 315.4.b draw) + the legend's exhaust + you must hold
or conquer. Board cost: **6 Energy once**. That is cheaper than candidate 1 and it never runs out.

**Verdict: new ENGINE entry, `produces: repeatable-removal`, legend-locked to UNL-199.**

---

## Candidate 2 of the issue — `OGN-098 Energy Conduit`

Not walked; the issue itself discarded it after crossing it against the five gear-readers of #56, and
its own arithmetic (+1 Energy per turn, only while `VEN-149 Defender of Tomorrow` is Empowered and two
Conduits are on the board) is below the bar. Recorded here so nobody re-opens it.

## The lens is now closed

Of the 16 gear with zero mentions anywhere, `UNL-174` was the only one with a mechanism the catalogue
did not already hold in another shell. The other fifteen fall in the issue's table: six domain-fixing
Seals-analogues, one 1:1 Energy⇄Power mirror of `SFD-117`, the static Empower gear, the two
heal/exhaust/recall shields already under 808.1.d.1 / 455, the buff-transfer gear closed by 702.3,
the once-a-turn draws closed by the loop-budget ledger, and the base-side token makers closed by #48's
walk-to-the-battlefield bottleneck.
