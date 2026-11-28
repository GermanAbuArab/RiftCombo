# Issue #141 — Teemo, Strategist's five-card reveal, hand-walked

Date: 2026-09-06. Rules version: `data/Riftbound-Core-Rules-2026-07-16.txt`.
Card text: `data/corpus_flat.txt`, verbatim, grepped. Nothing here comes from memory, a mirror
or the web.

Issue #141 left three ENGINE candidates around `OGN-121 Teemo, Strategist`. Verdicts:

| # | Candidate | Verdict |
|---|-----------|---------|
| 1 | `teemo-strategist-swift-scout-hidden-flood` | **VERIFIED**, ENGINE — with the issue's arithmetic corrected and the card the issue missed (`UNL-141 Evelynn, Entrancing`) put in `uses`: it is what turns Teemo from a card the opponent can decline into an on-demand trigger. |
| 2 | `teemo-strategist-rabadons-deathcrown-bonus-kill` | **VERIFIED**, ENGINE — but the issue's shell was **illegal as written**. `SFD-191 Rabadon's Deathcrown` is a **Signature** card tagged `Ornn` (103.2.d.2), so the deck is forced onto the pool's one Ornn legend, `SFD-189 Fire Below the Mountain`. It happens to be Calm/Mind, so the identity survives; the legend does not, because the issue never named one. |
| 3 | `teemo-strategist-undertitan-mind-order-reveal` | **VERIFIED**, ENGINE — and it does **not** duplicate `diana-lunari-showdown-scry`'s ledger, for a reason neither the issue nor #117 gave: Teemo's recycle is **mandatory**, so an Undertitan is never drawn and pays again on every trip. |

Nothing here scores a point. All three are ENGINE, as the issue said.

---

## 0. The card, verbatim

```
OGN-121 | Teemo, Strategist | Unit | Mind | E2 P1 M2 | [Hidden] (Hide now for :rb_rune_rainbow: to
        react with later for :rb_energy_0:.) When I defend, choose an enemy unit here and reveal the
        top 5 cards of your Main Deck. Deal 1 to that unit for each card with [Hidden] revealed this
        way, then recycle the revealed cards. [Tags: Yordle, Teemo, Bandle City]
```

---

## 1. What the issue got right, checked line by line

Every rule the issue quoted was opened and reads as quoted.

**715.4** and its example (this is Riot's own worked example, naming this exact card, and it is why
candidate 2 exists at all):

> **715.4.** If no damage was Dealt, then Bonus Damage will not apply.
> *Example: Teemo, Strategist is a unit that reads in part "When I defend, choose an enemy unit here
> and reveal the top 5 cards of your Main Deck. Deal 1 to that unit for each card with Hidden
> revealed this way, then recycle the revealed cards." He has Rabadon's Deathcrown attached to him.
> An enemy unit moves to the battlefield where Teemo is located and a combat opens there. Teemo's
> controller reveals the top 5 cards of their Main Deck and reveals no cards with Hidden. Although
> the ability has 3 Bonus Damage from Rabadon's Deathcrown, no deal action is performed for the
> Bonus Damage to apply to.*

The rest of the Bonus Damage block, which the issue did not quote and which candidate 2 needs:

> **713.** Bonus Damage is an intrinsic property that can be granted to Deal actions that influence
> the amount of Damage that the action is distributing.
> **714.** If more than one instance of Bonus Damage is applied or granted to a Deal action, all
> instances are summed and applied once.
> **715.** Bonus Damage applies to the total damage Dealt by one instance of the action.
> **715.1.** If the Deal action has a single target, the amount of Damage to that target will be
> increased by the Bonus Damage granted to it.
> **715.2.** If the Deal action has multiple targets, the amount of Damage dealt to each target is
> increased by Bonus Damage individually and separately.

714 is what lets `OGN-296 Void Gate` stack with Rabadon's: two instances, summed, applied once.
715.1 is the paragraph Teemo's own ability falls under — it names **one** unit ("choose an enemy
unit here"), so the whole reveal is a single Deal action of *k* damage, and Bonus Damage lands on it
once, not once per revealed card.

**383.4.f**, the once-per-combat rule:

> **383.4.f.** Defend Triggers are Triggered Abilities that trigger when a Unit or Player gains the
> Defender designation for the first time during a combat.
> **383.4.f.2.a.** These triggers will only have their condition checked once per combat, despite a
> Unit being able to gain and lose the Defender designation multiple times in the same combat.

**464.2.c**, who is designated:

> **464.2.c.1.** The Attacker is the player whose unit(s) applied the Contested status to the
> Battlefield.
> **464.2.c.2.** The Defender is the player who did not apply the Contested status to the Battlefield.
> **464.2.c.3.** The attacker and defender gain the Attacker or Defender designation now, as
> appropriate. Units at the Contested Battlefield controlled by the Attacker or Defender gain the
> Attacker or Defender designation now, as appropriate.

**431.1.c** (the reveal never Burns Out) and **416.1** / **416.5** (where the five go) both read as
the issue quoted them:

> **431.1.c.** If an instruction directs a player to look at or reveal cards in excess to the number
> of cards in a player's Main Deck, that player looks at or Reveals as many as possible, but does not
> Burn Out, then proceeds with the rest of the instruction.
> **416.1.** Recycling cards is the action in which a player takes one or more cards from a specific
> zone and then puts it on the bottom of the corresponding deck.
> **416.1.a.** Main Deck cards are Recycled to the Main Deck.
> **416.5.** If 2 or more cards are Recycled to the Main Deck simultaneously, they are placed on the
> bottom of that deck in a random order.

And the **39** figure for the [Hidden] package is confirmed by measurement, not by trust:

```
$ grep -c "Hide now for" data/corpus_flat.txt
39
$ grep -c "\[Hidden\]" data/corpus_flat.txt
43
$ grep "Hide now for" data/corpus_flat.txt | grep -v "\[Hidden\]"
SFD-138 | Windsinger | Unit | Chaos | E2 M1 | Hidden (Hide now for …
```

The bracketed grep returns 43 because four cards *mention* [Hidden] without carrying it
(`OGN-018 Noxus Saboteur`, `OGN-107 Ava Achiever`, `OGN-263 Swift Scout`, `OGN-264 Guerilla Warfare`)
and `SFD-138 Windsinger` carries it un-bracketed. The issue's method — grepping the shared reminder
text — is the right one and its 39 is right.

---

## 2. Four corrections the walk makes to the issue

### 2.1 The Signature supertype, which the issue never checked, is load-bearing on two of its three tables

`data/cards.json` carries `signature` per card (#103). Of the 39 [Hidden] cards, exactly two are
Signature — and they are exactly the two duals the issue counted as free density:

```
OGN-256 Fox-Fire         calm/mind   signature   [Ahri]
SFD-202 Hostile Takeover mind/order  signature   [Renata Glasc]
```

**103.2.d.2**: "All of the Signature cards must have the Champion tag that corresponds to the
Champion Legend of the deck." So:

- **Calm/Mind** is **14** unbanned [Hidden] cards, not 15 — Fox-Fire is legal only under an Ahri
  legend, and candidate 2's legend is forced to be an Ornn one (§2.2).
- **Mind/Order** is **13**, not 14 — unless the legend is `SFD-201 Chem-Baroness`, whose tag *is*
  `Renata Glasc`, in which case Hostile Takeover is legal and the count is 14. The other three
  Mind/Order legends (`OGN-265 Herald of the Arcane` / Viktor, `OGS-021 Lady of Luminosity - Starter`
  / Lux, `UNL-199 Deceiver` / LeBlanc) cannot run it.
- **Mind/Chaos** is **18**, exactly as the issue said — neither dual is in it and none of the 18 is
  Signature.

The rest of the issue's domain table reproduces exactly (`OGN-168 Fight or Flight` excluded as
banned in both formats per `data/legality.json`):

| domain | unbanned [Hidden] |
|---|---|
| Body | 2 |
| Calm | 6 |
| Calm/Mind | 1 (Signature, Ahri) |
| Chaos | 10 |
| Fury | 5 |
| Mind | 8 |
| Mind/Order | 1 (Signature, Renata Glasc) |
| Order | 5 |

### 2.2 Rabadon's Deathcrown is Signature/Ornn, so candidate 2's deck is forced onto one legend

`SFD-191 Rabadon's Deathcrown` is `signature: true`, `[Tags: Ornn, Equipment]`. Grepping every
`| Legend |` line in the corpus for `Ornn` returns exactly one card:

```
SFD-189 | Fire Below the Mountain | Legend | Calm/Mind | - | :rb_exhaust:: [Reaction] — [Add]
        :rb_rune_rainbow:. Use only to play gear or use gear abilities. (Abilities that add
        resources can't be reacted to.) [Tags: Ornn]
```

The issue's "Calm/Mind" is therefore right by accident and its deck is illegal until a legend is
named. The upside is large: the forced legend **pays Rabadon's `[Equip] rainbow` for free**, once
per turn, and it is a `[Reaction]` so it works on the opponent's turn too (813.1.c.2), readying at
the next Awaken (315.1.b).

Two more facts fall out of the same forced shell, both of which the issue did not have:

- The Chosen Champion must be an Ornn champion unit (103.2.a.2). The pool has two, both legal in
  Calm/Mind: `SFD-058 Ornn, Blacksmith` (Calm, E5 P1 M5) and `SFD-085 Ornn, Forge God` (Mind, E6 M4,
  `[Weaponmaster]`). Blacksmith reads "When you play me **or when I hold**, look at the top 4 cards
  of your Main Deck. You may reveal a gear from among them and draw it. Then recycle the rest." That
  is a repeatable **four-card dig** for the one Rabadon's — not a tutor: 416.1.a/416.5 send the rest
  to the bottom and #117's finding stands that nothing in the pool searches the Main Deck for a named
  card. Being the Chosen Champion makes it available from turn one (108.3.d).
- The other two Ornn gear are Signature too — `SFD-190 Forgefire Cape` and `SFD-192 Shurelya's
  Requiem`. All three are `[Unique]`, so one copy each, and 3 is exactly **103.2.d.1**'s ceiling
  ("Regardless of name, a deck may only contain a sum total of 3 Signature cards"). Forgefire Cape's
  Effect Text is a **second defend trigger on the same body**: "When I attack or defend, deal 2 to
  all enemy units here." See §5 for why it is recorded as a `notable` and not folded into `uses`.

### 2.3 The deck is 39 cards when the reveal happens, not 36 — and the honest framing needs no hand-size assumption

The issue used `N ≈ 36`, i.e. 40 minus the opening hand. Two things are wrong with that:

- **103.2** counts the Chosen Champion *inside* the 40 ("A Main Deck of at least 40 cards: A Chosen
  Champion Unit, as well as Units, Gear, and Spells") and **103.2.a.1** removes it before the game
  starts ("This will be placed in the Champion Zone at the start of the game"). So a 40-card list
  shuffles **39**.
- **116** ("Players each draw 4") then removes four more, but conditioning on them is unnecessary
  and is what forces a hand-size assumption. Over the shuffle, the five cards Teemo reveals are a
  uniformly random 5-subset of the 39 that were shuffled, whatever has been drawn in between. So the
  clean, assumption-free statement is:

> With **H** [Hidden] cards among the **39** shuffled, `E[hits] = 5H/39` and
> `P(0 hits) = C(39−H,5)/C(39,5)`.

That framing is also what makes the numbers stable across the game, which the issue's is not — see
§2.4.

Recomputed:

| shell | H (shuffled) | E[hits] | P(0 hits) | issue's figure |
|---|---|---|---|---|
| cand. 1, issue's list, Teemo as Chosen Champion | 20 | **2.56** | 2.02% | 2.9 / 0.8% |
| cand. 1, this entry's list | 23 | **2.95** | 0.76% | — |
| cand. 2, issue's list | 15 | **1.92** | 7.38% | 2.1 / 5.4% |
| cand. 3, issue's list | 12 | **1.54** | 14.02% | 1.7 |

The ceiling is **5** in every case (all five revealed carry [Hidden]) — 8 for candidate 2 with
Rabadon's live, 9 with Void Gate as well (714 sums the two instances).

### 2.4 The density is *not* bounded by capacity, and it does not decay — two reasons the issue missed

The issue wrote that "at 3 copies each that is up to 54 physical copies chasing a 40-card Main Deck
— the ceiling is capacity, not card count." Both halves need correcting.

- **`VEN-097 Spiderling` prints its own exception**: "Your deck can have any number of cards named
  Spiderling." **002** ("Card text supersedes rules text. Whenever a card fundamentally contradicts
  the rules, the card's indication is what is true") makes that beat 103.2.b. So the physical cap on
  [Hidden] density in any Chaos-containing identity is not 54 and is not 3-per-name; it is 39 minus
  whatever the deck needs to actually win. The real bound is the scoring plan, exactly as the issue's
  own "what could refute it" said — but for a different reason than the one it gave.
- **Teemo's recycle is mandatory and puts every revealed card back**, so H/39 does not decay. A deck
  that draws through itself thins its own hit rate; this one does not. It is the same property that
  keeps `reksai-undertitan-reveal` alive on a two-card deck, applied to a full one.

---

## 3. "When I defend" fires once per combat, on their attack — and how to make it fire on yours

### 3.1 The reactive baseline, and why it is a real weakness

383.4.f.2.a caps the trigger at once per combat, and 464.2.c.2 makes you the Defender only when the
*opponent's* unit applied Contested. So the natural rate is *per enemy attack into Teemo's
battlefield*, never per turn of yours — and an opponent who has seen Teemo simply attacks elsewhere.
The issue named this and filed all three as candidates for it. It is real.

### 3.2 The rule that breaks it, and the card that uses it

**190.3.a** keys Contested on the *moved unit's* controller, not on who caused the move:

> **190.3.a.** Contested is a temporary status applied to the battlefield when a Unit controlled by a
> Player who does not currently Control that Battlefield Moves or otherwise becomes present there.
> **190.3.a.1.** Units moving to or being played to a battlefield apply Contested status if that
> battlefield is not already Contested and that Unit's controller does not already control that
> battlefield.
> **450.** The Destination becomes Contested if it is an Uncontested Battlefield not controlled by
> the controller of the Unit or Units that moved.

So dragging an enemy body onto a battlefield **you** control makes **them** the Attacker on **your**
turn (464.2.c.1), and every unit of yours standing there — Teemo included — gains the Defender
designation at 464.2.c.3. This is the same mechanism `faefolk-challenger-forced-attacker` already
stands on; what is new here is that it is a Teemo enabler.

Nothing forbids the move in a Duel. **447.2.a** restricts destinations only "In Modes of Play with
more than two players" and **447.2.b** only "In Modes of Play with teammates"; **485.1** puts the
Duel at 2 players. **355.4** ("For Spells and Abilities that Move one or more Units, choose a valid
Location as the Move Destination") and **355.4.a** ("A valid Location for a Move Effect is one other
than the Units' current Location where they are allowed to be present") are the only gate, and a
battlefield you control passes it.

A full grep of the pool for enemy-move effects (`move an enemy`, `move a unit`, `move any number of`,
`move up to`, `move it to`, `move that unit`) returns 24 cards. Filtered to "moves an enemy body
**to** a battlefield of my choosing", in identity, unbanned and non-Signature:

- **Mind/Chaos** — `UNL-141 Evelynn, Entrancing` (Chaos, E2 M2, and she is herself [Hidden]):
  "When you play me from face down on your turn, you may move an enemy unit at a different location
  to my battlefield." `UNL-198 Moonfall` is Mind/Chaos and does the same thing, but it is
  **Signature, tag Diana**, so it is illegal under Swift Scout (103.2.d.2). `SFD-129 Temptation`
  moves an enemy "to a location where there's a unit with the same controller" — i.e. toward *their*
  own units, never onto mine; it does not do this job.
- **Calm/Mind** — `OGN-043 Charm` (Calm, E1 P1, "Move an enemy unit"), already in the catalogue as
  `charm-evacuate-conquer`. Also `OGN-067 Blitzcrank, Impassive` and `UNL-054 Tricksy Tentacles`.
- **Mind/Order** — **none.** Every enemy-mover in the pool is Calm, Chaos, Body, or a dual containing
  one of those; the only Order-touching ones are `VEN-148 Shadow Dash` (Calm/Order) and
  `SFD-177 Azir, Sovereign` (tokens only, on his own attack). Candidate 3 stays reactive. This is
  the honest reason it is the weakest of the three, and it is a structural reason, not an arithmetic
  one.

### 3.3 Evelynn's targeting clause, read to its end

811.1.d.2 confines a hidden card's targets to its own battlefield "unless the ability explicitly
restricts targeting in a way that makes this impossible", and Riot's second example there is
Tideturner's "a unit you control at **another** location". Evelynn says "an enemy unit at **a
different location**" — the same shape. So her target is chosen freely, which is the whole point:
she reaches across the board and pulls.

### 3.4 The forced-attack sequence, step by step

1. Your Main Phase, Neutral Open State. Teemo stands at battlefield **B**, which you control.
   Evelynn is face down at **B**, hidden on an earlier turn — 811.1.b: "Beginning on the **next
   turn**, this gains [Reaction] and you may play this, ignoring its base cost."
2. Play Evelynn from face down for 0. 811.1.d.1 puts her at **B**. 811.1.c.3: "Playing a card from
   facedown (or 'from Hidden') does open a chain."
3. Her play trigger moves an enemy unit to **B**. 190.3.a.1 + 450: that unit's controller does not
   control **B**, so Contested is applied — *by them*.
4. The chain closes. Cleanup (**319.6** "After any number of Game Objects enter or leave the Board",
   **319.8** "After a Move is completed"): **323.8** stages a Showdown, **323.9** stages a Combat
   ("at each Battlefield that Contested was applied to that have Units present controlled by opposing
   players"), and **323.13** opens it — "If the current state is a Neutral Open State and one or more
   Combats are Staged at Battlefields, the Turn Player chooses one of those Battlefields. Combat
   begins there."
5. **464.2.c.1** — the Attacker is the player whose unit applied Contested: **the opponent**.
   **464.2.c.2** — you are the Defender. **464.2.c.3** — Teemo and Evelynn gain the Defender
   designation now.
6. **383.4.f** fires: Teemo gains Defender for the first time in this combat. **464.2.e** adds it to
   the Combat Chain and **464.2.e.1** puts the Defending player's triggers on **last**, which by
   **340.1** ("The newest Finalized Chain Item resolves") makes them resolve **first**.
7. Reveal 5, deal *k* to the chosen enemy unit, recycle all five (416.1.a, 416.5).
8. **348.1**: when the Combat Showdown closes, combat proceeds. **465.2**: combat damage.

The damage lands **before** the Combat Damage Step, so it can kill the dragged unit outright and take
the battlefield with no damage step at all (465.1 needs both Attacking and Defending units to remain).

### 3.5 The ambush flip, verified step by step

The issue's finding 5 is right, and here is the sequencing it asserted without walking:

1. The opponent attacks battlefield **B** (which you control) with a unit. Combat opens; 464.2.c.3
   designates whatever of yours is already there. Teemo is face down at **B**, so he is not a unit on
   the board yet and is not designated.
2. The Combat Showdown is now running. **347**: "During a Showdown, the player with Focus may do one
   of the following: 347.1 Play a Card or Activated Ability that is legally timed." **464.2.d** gives
   the Attacker Focus first; **347.1.b** / **347.2.b** pass it to you.
3. Teemo's [Hidden] has granted him **[Reaction]** (811.1.b, "Beginning on the next turn"), and
   **813.1.c.1** reads "On Cards: 'This can be played during Closed States on any player's turn.'"
   **813.1.b** gives Reaction every permission of Action, which is what gets him past **155**
   (a spell without those permissions cannot be played in a Showdown) — and **813.3.a** confirms a
   unit with Reaction "can only be played to the controlling player's base or a battlefield they
   control", which **B** is. He is played from face down for 0.
4. He enters the board at **B**. Cleanup (**319.6**). **464.2.c.3.a**: "If a Unit controlled by the
   Attacker or Defender becomes present at this Battlefield after this moment, it will gain the
   Attacker or Defender designation during the Cleanup phase following the action that caused it to
   become present, as appropriate for its controller."
5. That is the **first** time he gains the Defender designation in this combat, so 383.4.f's
   condition is met and the trigger fires. 383.4.f.2.a's "once per combat" is a cap, not a
   requirement that he was there at the opening.
6. It resolves inside the same Combat Showdown, before 465's damage step.

**The one constraint that limits this, and that the issue did not state**: 811.1.b hides a card "at a
battlefield you control **that doesn't already have a facedown card hidden there**". One face-down
card per battlefield. So Teemo and Evelynn (candidate 1) can never both be hidden at the same
battlefield — one of them stands openly. And **323.7** takes the whole plan away if you lose the
battlefield: "Remove all Hidden cards from all Battlefields that are not controlled by the same
player and place them in their owner's Trash."

---

## 4. Candidate 3 against `diana-lunari-showdown-scry` — they are not the same ledger

`SFD-175 Undertitan` reads "As I'm revealed from your deck, [Add] :rb_energy_2:". Teemo's reveal
feeds it: **424.1** is a Reveal, **424.1.a.1** ("Other cards, including the card being revealed, can
reference the act of being Revealed") lets it speak, **385.2** ("Triggered Abilities outside of the
Board will self-describe their context") is why an ability on a card in the Main Deck functions at
all, and **429.2** / **429.2.a** put the Energy in the pool immediately, before the rest of Teemo's
own resolution.

Three differences from Diana, all measured:

- **Diana's copies are spent, Teemo's are not.** Diana leaves the revealed card on top (424.1.a.2),
  and `diana-lunari-showdown-scry` records that **315.4.b** ("1. The Turn Player draws 1") then draws
  it — so each Undertitan is worth one Add per trip to the top. Teemo's "then recycle the revealed
  cards" is **mandatory** and sends it to the bottom (416.1.a), where it can never be drawn by
  accident. Every copy pays again, every cycle, for the whole game.
- **The trigger is different.** Diana's is "when a showdown begins here" (any showdown, including her
  own conquers); Teemo's is a Defend Trigger (383.4.f), so it never fires on your own attack.
- **The removal rides along.** Diana's payoff is a free look plus a card; Teemo's is `E[hits]` damage
  to a chosen enemy unit on the same event.

**What the Energy can buy, and its shelf life.** The reveal happens on the opponent's turn.
**167**: "Every player's Rune Pool empties at the start of each player's Main Phase and the end of
each player's turn" — their Main Phase has already begun, so the Energy survives to the end of
**their** turn and no longer. **312.2.a** grants Priority in a Neutral Open
State only "during **their** Main Phase", so on the opponent's turn you receive it solely through
**312.2.b** (a Showdown, when you gain Focus), **312.2.c** and **312.2.d** (a Closed State) — which
means what the Energy can pay for is exactly a `[Reaction]`: **813.1.c.1** on cards, **813.1.c.2** on
activated abilities. In Mind/Order at 2 Energy or less with no Power cost, the
in-domain list is `OGN-095 Stupefy` (E1), `UNL-173 Sacrifice` (E1), `SFD-066 Frigid Touch` (E2),
`UNL-061 Downstage Dramatics` (E2), `UNL-175 Tactical Retreat` (E2), `SFD-151 Bonds of Strength`
(E2). And in-shell it pays exactly one thing: `VEN-135 Kennen, Keeper of Balance`'s "you may pay
:rb_energy_2: to [Stun] a unit", which **383.3.b** makes the trigger's **base cost** — "a cost …
immediately following the 'you may' … that appears as the first part of the effect, that cost is
treated as the base cost of the Triggered Ability" — and **383.3.b.1** makes it payable only at
finalization. Without a source of Energy on the opponent's turn that trigger is simply declined;
Undertitan is the source, and 2 Energy is exactly the price.

That is the entry's claim, and it is an ENGINE claim: two currencies off one Defend Trigger,
`1.54` expected damage plus `0.77` expected Energy per defend at the declared density.

---

## 5. Forgefire Cape — recorded as a `notable`, deliberately not in `uses`

```
SFD-190 | Forgefire Cape | Gear | Calm/Mind | E4 P2 M+3 | [Unique] … [Equip] :rb_rune_rainbow: …
        [Effect] When I attack or defend, deal 2 to all enemy units here. [Tags: Ornn, Equipment]
```

**136.2.c** / **434.1.c** append an attached card's Effect Text to the Top-Most Card's Rules Text
("The Top-Most card has all Effect Text of all cards Attached to it appended to its Rules Text"), and
**053.1** makes "I" read as that unit. So a Teemo carrying both Ornn gear has two Defend Triggers on
one designation, and Rabadon's "**Your** spells and abilities deal 3 Bonus Damage" — not "this
unit's" — reaches both.

Where it stops short of a claim: **715.2** grants the per-recipient bonus to a Deal action with
"multiple **targets**", and "all enemy units here" is **355.10.d** — "programmatically selected based
on its characteristics rather than chosen … e.g., 'Kill all units at a battlefield' targets a
battlefield, but does not target any units." So the recipients of Forgefire's deal are not targets,
and the rulebook's paragraph for the many-recipient case is written in the vocabulary of targets.
Rather than file a numbered reading for a card that is a `notable` either way, the entry states the
**floor** — 2 to each enemy unit there, on the same trigger, unmodified — and leaves the +3 per unit
as the open half. Nothing in candidate 2 stands on it. Candidate 2's own arithmetic uses only
**715.1**, whose case ("a single target") is exactly what Teemo's "choose an enemy unit here" is.

`CLAUDE.md`'s rule applies as well: a lead that would add a sixth card to a five-card line goes in
`notable`, never in `uses`, because `uses` is what the matcher and `planDeck` price.

---

## 6. Void Gate, as the issue filed it

```
OGN-296 | Void Gate | Battlefield | Colorless | - | Spells and abilities deal 1 Bonus Damage to units
        here. (Each instance of damage the spell deals to a unit here is increased by 1.)
```

714 sums it with Rabadon's, so the candidate 2 ceiling with both is 5 + 3 + 1 = **9**. It is
colourless, so 103.4.b never bites. It stays a `notable` for the reason the issue gave and that this
project has settled repeatedly: **485.5** ("Each player **randomly** selects one (1) of their three
(3) Battlefields") in a Duel, **486.5** ("selects", not randomly) in a Match, and **103.4.c**
("Cannot include more than one of a Battlefield of the same name when there are more than one
required for the deck") forbids stacking copies to make it certain. It is also symmetric — "Spells
and abilities", not "your spells and abilities" — so it arms the opponent's removal at that
battlefield too.

---

## 7. Trap check

- **No Attacker designation is claimed anywhere.** Teemo is the Defender by construction in all
  three, and §3.2's forced attack works precisely by making the *opponent* the Attacker. The
  "entering an empty battlefield is not an attack" trap is respected: the battlefield always has
  units of two players by the time Combat is staged (323.9).
- **No `[Repeat]`, no `[Temporary]`, no token, no recall, no Gold.** `UNL-081 Keeper of Masks` is
  [Temporary] and appears only as density, never as a body an entry counts on.
- **167** is respected in both directions: candidate 3's Energy is explicitly scoped to the rest of
  the opponent's turn, and no entry banks Energy across a Main Phase boundary.
- **431.1.a** is never risked: the reveal is 431.1.c, and nothing here draws.
- **185 / 416.1** — no line recycles a token; Teemo recycles the five cards he revealed, which are
  Main Deck cards by construction.
- **Ban check** against `data/legality.json`: none of `OGN-121`, `OGN-263`, `UNL-141`, `OGN-197`,
  `VEN-097`, `SFD-191`, `SFD-189`, `SFD-058`, `OGN-043`, `SFD-175`, `VEN-135`, `OGN-296` appears as
  banned or restricted in either format. `OGN-168 Fight or Flight` is banned in both and is excluded
  from every count above.
- **809.1.c** / **809.1.d** — Teemo "chooses" an enemy unit, so a `[Deflect]` attacker taxes the
  trigger with Power ("a Mandatory Additional Cost on Spells and Abilities that choose the Game
  Object that has this ability"), and on the opponent's turn that Power has to be banked first
  (**164.2.b**: "Recycle this: [Reaction] — Add [C]", no exhaust). If the [Deflect] body is the only
  enemy unit there, the choice cannot be made cheaply. Recorded on each entry.
- **No new numbered rules reading is filed.** The one place a reading could have been opened
  (Forgefire Cape under 715.2) is handled by scoping the claim instead, per §5.

---

## 8. What went into `data/combos.json`

Three new entries, all `status: "verified"`, all `class: "ENGINE"`, all `produces:
["repeatable-removal"]` (candidate 3 also `"resource-engine"`).

`teemo-strategist-swift-scout-hidden-flood` carries `legends: ["OGN-263"]`;
`teemo-strategist-rabadons-deathcrown-bonus-kill` carries `legends: ["SFD-189"]`, because in both
cases the shell is forced (a Teemo Chosen Champion under a Teemo legend, and a Signature/Ornn gear
under the pool's one Ornn legend). Candidate 3 carries none: it runs under any of the four
Mind/Order legends, with `SFD-201 Chem-Baroness` the only one that also unlocks `SFD-202`.
