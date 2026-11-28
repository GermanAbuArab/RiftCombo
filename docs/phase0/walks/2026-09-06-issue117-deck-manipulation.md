# Issue #117 — the deck-manipulation lens, hand-walked

Date: 2026-09-06. Rules version: `data/Riftbound-Core-Rules-2026-07-16.txt`.
Card text: `data/corpus_flat.txt`, verbatim, grepped. Nothing here comes from memory, a mirror
or the web.

Issue #117 left three ENGINE candidates plus a variant. Verdicts:

| # | Candidate | Verdict |
|---|-----------|---------|
| 1 | `forecaster-rumble-mech-vision-scry` | **VERIFIED**, ENGINE. Issue's open reading closed by 383.2.c / 383.2.c.1 — no new numbered reading needed. |
| 1b | Ferrous Forerunner variant | **VERIFIED as a `notable`**, not a second entry. The legend the issue left for the walk is `SFD-181 Mechanized Menace`. |
| 2 | `baited-hook-scuttle-crab-free-reanimator` | **REFUTED.** Its own fetch ceiling is Might 1 (a seven-card pool, all E1–E3), it is not repeatable, and the Deathknell it harvests does not need the Hook. Recorded as a `notable` on the existing `baited-hook-sprite-queen-free-unit`. |
| 3 | `diana-lunari-showdown-scry` | **VERIFIED**, ENGINE, with **two of the issue's reasons corrected**. |

---

## 0. What the issue got right, checked line by line

Every rule the issue quoted was opened and reads as quoted:

- **436.1** — "Predicting a card is the act of **looking** at a single card from the top of the Main
  Deck and choosing whether or not to Recycle it."
- **436.1.a** — "When more than one card is Predicted, the Predicting player looks at that many cards
  and Recycles any number of them before putting the rest back on top of their Main Deck in any order."
- **436.4.a** — "The Player will not perform a Burn Out as a result of Predicting with too few cards
  in their deck."
- **817.1.b** — "It is functionally short for \"When this is played, predict.\""
- **817.1.c** — "The trigger is the permanent entering the Board."
- **817.2** — "Multiple instances of Vision trigger separately."
- **817.2.a** — "The player may choose to recycle or not recycle for each instance of Vision separately."
- **424.1** — "Revealing is the act of presenting a card to all players from a zone that one or more
  players do not have access to the information of."
- **424.1.a.2** — "Cards remain in the zone they are being Revealed from."
- **431.1.c** — "If an instruction directs a player to look at or reveal cards in excess to the number
  of cards in a player's Main Deck, that player looks at or Reveals as many as possible, but does not
  Burn Out, then proceeds with the rest of the instruction."

So **finding 1 of the issue stands**: Predict and Vision are defined with "look at", 424.1 defines
Reveal as a separate public presentation, and neither keyword can ever feed `SFD-175 Undertitan`'s
`As I'm revealed from your deck`. A grep of the whole corpus for `revealed` returns five cards
(`OGN-018`, `OGN-121`, `SFD-175`, `UNL-051`, `UNL-169`) and Undertitan is the only
reveal-**from-your-deck** payoff in the pool — confirmed, not assumed.

Findings 3, 4 and 5 stand as written. Finding 2 is closed below.

---

## 1. Candidate 1 — Forecaster × Rumble, Scrapper. VERIFIED, ENGINE.

### Card text, verbatim

```
SFD-065 | Forecaster | Unit | Mind | E2 M2 | Your Mechs have [Vision]. (When you play us, look at the
        top card of your Main Deck. You may recycle it.) [Tags: Mech, Yordle, Bandle City]
SFD-089 | Rumble, Scrapper | Unit | Mind | E5 P1 M4 | Your Mechs have +1 :rb_might: (including me).
        When I hold, play a 3 :rb_might: Mech unit token to your base.
        [Tags: Mech, Yordle, Rumble, Bandle City]
```

### The issue's open reading is closed by 383.2.c, and no new reading is needed

The issue filed as its "what refutes it" the question of whether a keyword granted by *another*
permanent's static ability is on the token early enough for 817.1.c's trigger. It is, and the rule
that says so is the general one for every enters-the-board trigger:

> **383.2.c.** The Condition of a Trigger is evaluated after a potentially inciting event has been
> processed.
>
> **383.2.c.1.** If a Game Object has a Triggered Ability that is active in a specific zone, it is
> evaluated and subsequently triggered if it enters that zone at the same time that its Trigger's
> condition is met.
> *Example: Immortal Phoenix says "When you kill a unit with a spell, you may pay [1][C] to play me
> from your trash." This ability triggers if Immortal Phoenix is in your trash immediately after you
> kill a unit with a spell, even if the unit you killed with a spell was that Immortal Phoenix.*

The Condition is evaluated **after** the token has entered the Board, so Forecaster's continuous
grant is already applying to it when the evaluation happens, and 383.2.c.1 is explicit that a
Triggered Ability active in a zone triggers on the very event of entering that zone. **817.3** —
"Vision, and whether or not a permanent has Vision, is a characteristic of the permanent" — is what
lets a grant put it there in the first place.

Two supports:

- **187.4** — "A 3 [M] Mech token is a domainless unit token with 3 Might and the **Mech tag**." So
  the token is one of "Your Mechs" by tag, not by guess.
- Riot's own reminder text says **"us"**, not "them": `(When you play us, look at the top card of your
  Main Deck. You may recycle it.)` The plural first person is the card admitting that Forecaster's
  grant includes Forecaster — so Forecaster's own arrival predicts too, by the same 383.2.c.

**No R-number filed.** The question the issue left open is answered by rules text.

### What it actually produces, per turn

- **469.2** — "Hold: A player maintains Control of a Battlefield they did not yet Score this turn
  during their Beginning Phase." **315.2.b.2** — "1. The Turn Player Holds all Battlefields they
  Control." **383.4.d / 383.4.d.1** make `When I hold` a Hold Effect, and **383.4.d.2.a** requires the
  unit to be *present at that battlefield*. So Rumble must be standing on a battlefield you control
  and have not already scored this turn (**470**).
- One Hold with Rumble present → one 3-Might Mech token, born **at your base** and **exhausted**
  (143.4), which Rumble's own static lifts to 4 Might.
- The token entering fires Vision → **Predict 1**: look at the top card, recycle it or leave it.
- **436.4.a** and **431.1.c** mean this never Burns Out, even with an empty Main Deck.
- **416.1.a / 416.5** send a recycled card to the **bottom**, so this is a filter, never a tutor and
  never a thinning.

Net: for zero additional Energy or Power, every Hold buys a 4-Might body **and** a free look at the
top of your deck, for as long as Rumble stands there. That is the entry.

### The walk's own additions

1. **`OGN-100 Gemcraft Seer` stacks a second instance, and the issue listed it as untouched without
   building with it.**
   ```
   OGN-100 | Gemcraft Seer | Unit | Mind | E3 P1 M3 | [Vision] (When you play me, look at the top card
           of your Main Deck. You may recycle it.) Other friendly units have [Vision]. [Tags: Mount Targon]
   ```
   Mono-Mind like the other two. A Mech token then carries Forecaster's grant **and** Gemcraft Seer's,
   and **817.2** ("Multiple instances of Vision trigger separately") makes that two Predicts.
   **817.2.b is the trap and is stated in the entry**: "If the player does not recycle the top card and
   nothing else happens in between the triggers resolving, each instance of Vision will see the same
   card." The second instance is worth something only if you recycled on the first.
2. **The Fury/Mind legend the issue left for the walk is `SFD-181 Mechanized Menace`** —
   `Legend | Fury/Mind | Your Mechs have [Shield]. [Tags: Rumble]`. A grep of every legend line for
   Fury/Mind returns exactly three (`OGN-247 Daughter of the Void`, `SFD-181`, `UNL-181 Virtuoso`);
   SFD-181 is the one whose own text is about Mechs. That is the shell for candidate 1b.
3. **Candidate 1b is a `notable`, not a second entry.** `SFD-021 Ferrous Forerunner`
   (`Fury | E6 P1 M6 | [Deathknell] — Play two 3 :rb_might: Mech unit tokens to your base.`) mints two
   tokens in one event, so two separate Vision triggers (817.2) — but once per copy that dies, not
   per turn. It is a burst of the same product on a narrower legend, so it rides in `notable`.
4. **Karma is a rider, and it is capped exactly where #106 said.** `OGN-235 Karma, Channeler` (Order)
   is the pool's only general "when you recycle" payoff. Under a Mind/Order legend she buffs on each
   Vision recycle, but **702.3 / 702.3.a** cap a unit at one Buff, and the Hold mints exactly one new
   unbuffed body per turn — so two Vision instances give **one** buff, not two. Third card and a
   legend constraint: `notable`, never `uses`.

### Class

ENGINE. No repeat step inside a turn (the faucet is one Hold), nothing here scores, and the tokens are
born at the base — #48's walk-to-the-battlefield bottleneck is unchanged by anything in this lens.

### Ban check

`data/legality.json`: none of SFD-065, SFD-089, SFD-021, SFD-181, OGN-100, OGN-235 appears in any
entry, in either format.

---

## 2. Candidate 2 — Baited Hook × Scuttle Crab. REFUTED.

`rc-walk115` landed `baited-hook-sprite-queen-free-unit` (commit 55e24f3) on the same gear. Read
first, as instructed. Its `notable` already contains the answer in general form: the issue's proposed
"cheap 0/1-Might token … caps the fetch at Might 2 and is close to worthless."

Scuttle Crab is the extreme case of that.

```
UNL-053 | Scuttle Crab | Unit | Calm | E2 M0 | (Units with 0 :rb_might: can conquer and hold.)
        When you play me, draw 1. [Deathknell][>] Choose an opponent. They reveal their hand.
        You can look at their facedown cards this turn. Gain 1 XP. [Tags: Bilgewater]
```

Three independent refutations, any one of which is enough:

1. **The fetch ceiling is Might 1, and the pool at that ceiling is seven cards.** The Hook fetches
   "a unit … that has Might up to 1 more than the killed unit"; the Crab is Might 0. Computed over
   every unit base in `data/cards.json`, there are 30 unit bases at Might ≤ 1 in the whole game, and
   in Calm ∪ Order (the identity this line forces) exactly seven are cards you could draw:
   `OGN-216 Soaring Scout` (E2), `UNL-036 Mutated Mouser` (E2), `UNL-053 Scuttle Crab` itself (E2),
   `UNL-056 Yuumi, Magical Cat` (E3 P1), `UNL-153 Carrion Dredger` (E2), `VEN-043 Steel Paws` (E1),
   `VEN-117 Disciple of Shen` (E2). The activation costs **1 Energy + 1 Order Power + exhaust** — the
   Hook's real cost, which #115 already had to correct the issue on. You are paying more than the
   ceiling is worth. Against the same gear, the verified entry buys up to `OGN-226 Spectral Matron`
   (E4 P2 M4).
2. **It is not an engine, because the fuel is a card.** The verified entry's fuel is Sprite Queen's
   [Temporary] Sprite, replayed **every Beginning Phase** (816.1.b / 816.1.c) and already condemned,
   so feeding it costs zero and the line runs every turn forever. Scuttle Crab is a card: **103.2.b**
   caps it at 3 copies, each dies once. Three activations a game is a card, not an engine, and the
   class the issue asked for (ENGINE) is not reachable.
3. **The Deathknell does not need the Hook.** The value the issue actually points at — hand reveal +
   seeing facedown cards + 1 XP — fires from **any** death (808.1.c). Spending 1 Energy + 1 Order Power
   + the Hook's once-per-turn exhaust to kill a 0-Might body on your own schedule is a tempo choice,
   not an interaction between the two cards. There is no second card doing work here.

For completeness: no legal reordering rescues it. Killing `UNL-153 Carrion Dredger` (Order, M1) instead
lifts the ceiling only to Might 2, and its Deathknell Bird token is Might 1 (187.7) — feeding *that*
back to the Hook returns to a Might-2 ceiling. The domain shell is real (Calm/Order legends exist) but
buys nothing the Mind/Order shell does not do better.

**Verdict: refuted, filed as a `notable` on `baited-hook-sprite-queen-free-unit` so the next reader
finds the answer where they will look for it.** No new entry.

---

## 3. Candidate 3 — Diana, Lunari × Undertitan. VERIFIED, ENGINE — two of the issue's reasons corrected.

```
UNL-079 | Diana, Lunari | Unit | Mind | E3 M3 | When a showdown begins here, you may pay
        :rb_energy_1: to [Predict], then reveal the top card of your Main Deck. If it's a spell,
        draw it. (To Predict, look at the top card of your Main Deck. You may recycle it.)
        [Tags: Diana, Mount Targon]
SFD-175 | Undertitan | Unit | Order | E6 P1 M5 | When you play me, give your other units +2
        :rb_might: this turn. As I'm revealed from your deck, [Add] :rb_energy_2:. [Tags: The Void]
```

### What is true

- Diana is the only card in the pool that chains a Predict into a **Reveal**. The Predict looks
  (436.1); if the top card is a spell you leave it and the Reveal that follows draws it; if it is not,
  you recycle it to the bottom (416.1.a / 416.5) and the Reveal shows a **fresh** card. So the ability
  is two looks for one Energy, and the second look is informed by the first — which is what separates
  it from the blind reveals of `reksai-undertitan-reveal` and `void-rush-undertitan-accelerate`.
- The reveal is a real Reveal under **424.1**, so it does fire Undertitan's `As I'm revealed from your
  deck`. **385.2** — "Triggered Abilities outside of the Board will self-describe their context" — is
  why an ability on a card sitting in the Main Deck functions there at all; **385.1** ties it to the
  zone's Information Level, which the Reveal is exactly what changes.
- Every combat at Diana's battlefield triggers her too: **461.3** "If a Combat and Showdown are staged
  at the same Battlefield and the turn player initiates the Showdown, it will open as a Combat
  Showdown", and **464** is titled "Step 1: The Combat Showdown Step" with **464.2** "When Combat
  opens, it either opens with a Combat Showdown, or the current Showdown becomes a Combat Showdown."
  So her trigger is live on the **opponent's** turn as well, whenever they attack into her.
- **436.4.a / 431.1.c**: safe with an empty Main Deck, like everything in this lens.

### CORRECTION 1 — the issue's reason for "not once per turn" is wrong; the conclusion survives on a different rule

The issue wrote: *"A showdown can be reopened multiple times per turn at different battlefields …
so this is not capped to one activation per turn."* Diana's trigger says **"here"**. A unit is at one
location, so showdowns at *other* battlefields are irrelevant to her, and on your own turn the count is
capped near one: **190.3.a.1** applies Contested only "if that battlefield is not already Contested and
that Unit's controller does not already control that battlefield", and **348.2.a** hands you Control at
the close, after which further arrivals contest nothing.

What actually makes it more than once per turn cycle is the rule above — 461.3 / 464.2 — i.e. the
opponent's attacks. And **323.14** caps the double-dip in the other direction: "If the current state is
Showdown Open State and Combat is Staged at a Battlefield where there is a Non-Combat Showdown ongoing,
that Showdown **becomes** a Combat Showdown." It becomes one; it does not begin one. A non-combat
showdown that escalates is **one** Diana trigger, not two.

### CORRECTION 2 — the Energy is a base cost paid at finalization, so you must bank it BEFORE you move

This is the finding the issue does not have, and it changes how the card is played.

> **383.3.b.** If a Triggered Ability contains a cost within instructions at the beginning of the
> effect or immediately following the "you may" or "they may" that appears as the first part of the
> effect, that cost is treated as the base cost of the Triggered Ability.
>
> **383.3.b.1.** The cost must be paid in order to finalize the Triggered Ability to the Chain.

Diana reads `you may pay :rb_energy_1: to [Predict]` — the cost is immediately after the "you may"
that opens the effect, so it is the **base cost**, paid at finalization, not on resolution. (383.3.b's
own second worked example, Insightful Investigator's "You may pay 2 XP", is the contrast case: not
first in the effect, therefore paid on resolution.)

Consequences, both real:

- **On your turn, add the Energy before you move.** **453** performs a Cleanup when the Move completes;
  **323.8** stages the Showdown and **323.12** begins it inside that same Cleanup. No player has
  Priority during a Cleanup (**312.2** lists the four times Priority is granted and a Cleanup is none of
  them), so there is no window between the move and the finalization in which to exhaust a rune. The
  Energy has to already be in the pool. **167** — the Rune Pool empties "at the start of each player's
  Main Phase and the end of each player's turn" — means Energy banked earlier in your own Main Phase is
  still there.
- **On the opponent's turn it must be banked in an earlier Closed State.** Your pool is empty at the
  start of their turn (167). **164.2.a** gives every Basic Rune `[E]: [Reaction] — Add [1]`, and
  **813.1.c.2** reads Reaction on an activated ability as "This can be activated during Closed States
  on any player's turn", with **312.2.c / 312.2.d** granting the Priority — so any Closed State earlier
  in their turn is your chance, and 167 does not empty the pool again until their turn ends. If none
  occurred, the "may" is simply declined (383.3.a.2 removes an unperformed trigger from the chain). The
  rune stays exhausted until your own Awaken (**315.1.b**) — that is the real price on their turn.

### CORRECTION 3 — Undertitan on top is worth one Add, not a standing tax

Tempting line: leave Undertitan on top during the Predict, reveal it for `[Add] Energy 2`, and note
that **424.1.a.2** keeps it in the deck — so next showdown reveals it again. It does not survive
**315.4.b**: "1. The Turn Player draws 1", every turn, unconditionally. A card left on top is in your
hand by your next Draw Phase. So each copy of Undertitan is worth at most one Add per trip to the top,
and the entry says so. **429.2** makes the Add resolve as soon as it is finalized, and 167 governs how
long it lives: Added on your own turn it is spendable that Main Phase, Added on theirs it is spendable
only for Reactions before their turn ends.

Priced honestly: the hit is 1-in-deck-size per look, twice per activation, and per **finding 4 of the
issue** nothing in this lens converts that probability into a certainty — 416.1.a / 416.5 recycle to
the **bottom**, and no card in the pool searches the Main Deck for a named card. This entry claims a
free filter plus a free spell draw whenever the top is a spell, with the Undertitan Add as the upside.

### Domain and bans

Diana is mono-Mind, Undertitan mono-Order, so **103.1.b.3** puts both inside any Mind/Order identity.
Grepping every legend line, Mind/Order is exactly four legends: `OGN-265 Herald of the Arcane`,
`OGS-021 Lady of Luminosity - Starter`, `SFD-201 Chem-Baroness`, `UNL-199 Deceiver`. Neither UNL-079
nor SFD-175 appears in `data/legality.json` in either format.

### Overlap, declared

`reksai-undertitan-reveal` (SFD-170 + 3× SFD-175) and `void-rush-undertitan-accelerate` (SFD-188 +
SFD-175 + SFD-029 + SFD-018) already use Undertitan. Both are blind reveals inside a Void shell; this
is an informed reveal inside Mind/Order, on a trigger that fires on the opponent's turn. Different
shells, same payoff card — declared, not hidden.

---

## 4. Leads this walk did not file

- **`OGN-121 Teemo, Strategist`** (Mind, E2 P1 M2): "When I defend, choose an enemy unit here and
  **reveal the top 5 cards of your Main Deck**. Deal 1 to that unit for each card with [Hidden]
  revealed this way, then recycle the revealed cards." A five-card reveal from your own deck — so it is
  a second, much wider door to Undertitan's Add (up to 5 chances at once) *and* a removal payoff scaled
  by the [Hidden] package, which #40 and #100 already mapped (15 hidden units + 2 hidden gear). The
  issue listed OGN-121 among its 25 untouched cards and did not build with it. Not filed here because
  it belongs to the Hidden lens's arithmetic, not this one, and would need its own walk.
- **`VEN-056 Clairvoyance`** and **`UNL-131 Abandon`** — the issue's own "not filed" section is correct
  and was re-checked: neither changes the class or arithmetic of any verified entry.
- **`UNL-211 Forgotten Library`** — #98 priced its Predict at zero output. Nothing in 436 / 817 / 431
  changes that.

## 5. Rules opened for this walk

103.1.b, 103.1.b.1, 103.1.b.2, 103.1.b.3, 103.1.b.4, 143.4, 164.2.a, 167, 187.4, 187.7, 190.3.a,
190.3.a.1, 190.4, 312.2, 312.2.a, 312.2.b, 312.2.c, 312.2.d, 315.1.b, 315.2.b.2, 315.4.b, 318, 319.x,
323.6, 323.8, 323.11, 323.12, 323.13, 323.14, 344, 344.1, 344.2, 345, 347, 348, 348.2.a, 348.2.a.1,
350.2, 355.2.a, 383.1, 383.2.a.1, 383.2.c, 383.2.c.1, 383.2.c.2, 383.3.a, 383.3.a.2, 383.3.b,
383.3.b.1, 383.3.c, 383.3.d, 383.3.e.1, 383.4.c, 383.4.d, 383.4.d.1, 383.4.d.2.a, 385.1, 385.2,
416.1.a, 416.5, 424.1, 424.1.a.2, 429.2, 431.1.a, 431.1.b, 431.1.c, 431.1.c.1, 436.1, 436.1.a, 436.4,
436.4.a, 453, 461.3, 464, 464.1, 464.2, 469.1, 469.2, 470, 702.3, 702.3.a, 808.1.c, 813.1.c.1,
813.1.c.2, 816.1.b, 816.1.c, 817.1.a, 817.1.b, 817.1.c, 817.2, 817.2.a, 817.2.b, 817.3.

**No new numbered reading (R-number) was filed.** The one the issue left open — finding 2, whether a
granted Vision reaches a token as it enters — is answered by 383.2.c / 383.2.c.1, which is rules text,
not interpretation.
