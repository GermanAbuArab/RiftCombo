# Hand walk — issue #115, the scoring-text and free-play lens

Date: 2026-09-06. Core Rules: `data/Riftbound-Core-Rules-2026-07-16.txt` (Last Updated 2026-07-16).
Card text: `data/corpus_flat.txt`, verbatim, grepped. Catalogue at the start of the walk: 232 entries,
all `verified`.

Scope, from the issue: two ENGINE candidates (`OGN-025` Blind Fury + `VEN-113` Kennen;
`OGN-242` Baited Hook), one rider on an existing entry (`SFD-055` Needlessly Large Yordle on
`ahri-trinity-svellsongur-hold`), and two refutations worth recording for future hunts.

Result: **two entries added, both `verified`. The rider is REFUTED as the issue computed it** and
enters `ahri-trinity-svellsongur-hold` as a `notable` recording the correction, with no change to
that entry's `uses`, `class` or quantities.

---

## Block 0 — every rule opened for this walk, quoted

Ownership, control and the pronoun:

- **052.** "Card, when written in card effects, is shorthand for 'Main Deck card.' Runes, legends, and
  battlefields are not considered cards when executing the abilities and effects of game objects."
- **053.** "Cards refer to themselves in the first person." 053.2: "Gear and spells say 'this.'"
- **055.** "When executing card text, do as much as you can, ignoring impossible instructions."
- **056.** "Cards a player owns may never be placed into a non-Board zone belonging to another player."
  056.2: "If a card would enter such a zone, it goes to its owner's corresponding zone instead."
- **127.1.** "For gameplay purposes, a card's Owner is the player who brought it into the game … The
  legal owner of a card doesn't matter during gameplay."
- **190.6.d.** "'You' in a battlefield's abilities refers to the battlefield's Controller, as does the
  implied 'you'." (Cited here only for the *implied "you"* half — see §1.)
- **191.1.** "When a player Plays, Hides, or Creates a Card or other Game Object, they are established
  as that Game Object's Controller."
- **191.2.** "For Spells, they are the Spell's Controller." 191.2.a/b/c: that player chooses targets,
  chooses modes, pays costs.

Deck construction:

- **103.1.b.1.** "Cards included in your deck must abide by your Domain Identity."
- **103.1.b.2.** "Your deck's Domain Identity is dictated by the domains of your Champion Legend."
- **103.1.b.4.** "If a card has more than one Domain, then that card is permitted only in a Domain
  Identity that contains all of the indicated Domains."
- **103.2.b.** "Your Main Deck can include up to 3 copies of the same named card."

Recycle, banish, kill, burn out:

- **416.1.** "Recycling cards is the action in which a player takes one or more cards from a specific
  zone and then puts it on the bottom of the corresponding deck." 416.1.a: "Main Deck cards are
  Recycled to the Main Deck."
- **416.1.c.** "Each player Recycles cards to their own Main Deck and Rune Deck, regardless of which
  player is instructed to perform the Recycle action."
- **416.3.** "When Recycling is listed as a Cost, the action must be able to be completed for the cost
  to be paid."
- **416.5.** "If 2 or more cards are Recycled to the Main Deck simultaneously, they are placed on the
  bottom of that deck in a random order."
- **427.1.** "Banishing is the action of placing a card from any other zone into Banishment."
  427.2.a: "Banish is not a subset of Kill."
- **428.1.** "Killing is the action of a Permanent going to the trash from the board."
- **431.1.c.** "If an instruction directs a player to look at or reveal cards in excess to the number
  of cards in a player's Main Deck, that player looks at or Reveals as many as possible, **but does
  not Burn Out**, then proceeds with the rest of the instruction."
- **431.1.c.1.** "If there are insufficient cards among the looked at or revealed cards to perform
  subsequent actions to the revealed or looked at cards, any further instructions are ignored. **This
  does not cause a Burn Out**, even if those instructions would cause those cards to change zones."
  With its reminder: "Cards are considered in the zone of origin while being looked at or revealed, in
  this case the Main Deck."
- **431.1.a.** "If a player must Draw cards in excess to the number of cards in their Main Deck, they
  will Draw as many as possible, perform this action, then Draw the remaining amount instructed."
- **431.1.b.** the same for putting Main Deck cards in any other zone (the `[Burn N]` family).
- **203.3** was NOT needed: see §2, the cost of Baited Hook contains no Recycle and no Kill.

Playing, entering, resolving:

- **143.4.** "Units enter the Board exhausted." (Gear is not a unit — 359.2.d: "If it is a Non-Unit
  Gear, it enters the Board Ready at the player's Base.")
- **157 / 351.2.** "Spells create game effects that are executed, then the card is placed in the trash
  when Played."
- **355.2.a.** "By default, Valid locations include the controller's Base or a Battlefield the
  controller controls."
- **359.2.c.** "If it is a Unit, it enters the Board exhausted at the Location that was chosen."
- **315.1.b.** "1. The Turn Player readies all Game Objects they control that are able to be readied."
- **315.2.b.2.** "1. The Turn Player Holds all Battlefields they Control."
- **312.2.a.** A player receives Priority "When the turn is in a Neutral Open State during their Main
  Phase."

Tokens:

- **185.** "Tokens are not cards." 185.2.b: "Token units have a Might." 185.2.d: "Tokens have a type.
  They follow all rules for their type unless otherwise specified."
- **187.2.** "A 3 [M] Sprite token with Temporary is a domainless unit token with 3 Might, the Fae
  tag, and the Temporary keyword."
- **816.1.b.** Temporary "is functionally short for 'At the start of this permanent's controller's
  Beginning Phase, before scoring, kill this.'" 816.1.c: "The Trigger Condition is the controller of
  the permanent's Beginning Phase starting."

Flow:

- **829.1.b.** "It is functionally short for 'You may play this from your trash for its flow cost.
  **Then banish it.**'"
- **829.1.b.1.** "Banishing the spell in this way is a delayed replacement effect. If the spell would
  leave the chain after becoming a finalized chain item, and leaving the chain wasn't instructed by
  its own execution, banish it instead."
- **829.1.b.2.** "Playing a spell for its Flow cost does not change the timing at which it can be
  played, nor any permissions for the spell aside from the zone from which it can be played."
- **829.1.c.1.** "The cost is an alternate cost that replaces the base cost of the spell."
- **829.2.** "Flow, and whether or not a spell has Flow, is a characteristic of the Spell and may be
  checked or referenced by other Game Effects."
- **383.4.g.1.** "To do so, that player checks the condition of all of the specified effects, as if
  they had fulfilled the named part of the condition." Its worked example is Reckoner's Arena by name.

Scoring (for the §3 rider):

- **468.** "Scoring is the act of a Player gaining a point through the process of seizing or
  maintaining control over a Battlefield." 468.1: "Every instance of Scoring is also an instance of
  Gaining points."
- **469.** "A player Scores in one of two ways:" 469.1 Conquer, **469.2 Hold** — "A player maintains
  Control of a Battlefield they did not yet Score this turn during their Beginning Phase."
- **470.** "A player may only Score, from either method, once per Battlefield per turn."
- **194.1.** the four ways to gain points: 194.1.a Holding, 194.1.b Conquering, **194.1.c "Spells,
  Triggered Abilities and Activated Abilities that instruct them to gain one or more"**, 194.1.d an
  opponent's Burn Out.
- **383.4.d.2.a.** "The Hold Abilities of Units are put on the Chain as Pending Items after the Unit
  these effects correspond to are present at a Battlefield when a player maintains control of it and
  Gains 1 Victory Point during their Beginning Phase from Holding."
- **485.3.** "Victory Score: 8." **485.4.** "Battlefield Count: 2." 485.4.a: each player provides
  three, only 1 is used. 485.5: "Each player **randomly** selects one (1) of their three (3)."

Ban check against `data/legality.json` (transcribed from Riot's Rules Hub): none of `OGN-025`,
`VEN-113`, `OGN-286`, `OGN-242`, `UNL-084`, `OGN-226`, `UNL-087`, `OGN-246` appears in either
format's list.

---

## §1 — `OGN-025` Blind Fury × `VEN-113` Kennen. VERIFIED as `blind-fury-kennen-deck-theft`, ENGINE

Card text, verbatim:

```
OGN-025 | Blind Fury | Spell | Fury | E4 P2 | [Action] (Play on your turn or in showdowns.) Each
opponent reveals the top card of their Main Deck. Choose one and banish it, then play it, ignoring
its cost. Then recycle the rest.

VEN-113 | Kennen, Storm of Shuriken | Unit | Chaos | E3 P1 M4 | When you play me, [Burn 2]. (Put the
top 2 cards of your Main Deck into your trash.) When I conquer, give a spell in your trash [Flow]
equal to its cost this turn. (You may play it from your trash for its Flow cost. Then banish it.)
[Tags: Yordle, Kennen]
```

### 1.1 The pronoun is settled by rules, not by a parallel printing

The issue read the implicit subject of "then play it" off a contrast with `VEN-114` Kharox, which
spells out "you". That inference is unnecessary and the rules answer it outright. **191.2** makes the
player who played Blind Fury the Spell's Controller; **190.6.d** is the rules' own statement that an
*implied* "you" resolves to a controller; and **191.1** — "When a player Plays … a Card … they are
established as that Game Object's Controller" — makes you the controller of whatever the spell plays.
So: **you** play the opponent's card and **you** control it.

### 1.2 The three ownership rules, none of which this catalogue had cited before

1. **Unchosen cards go home.** 416.1.c: "Each player Recycles cards to their own Main Deck and Rune
   Deck, regardless of which player is instructed to perform the Recycle action." "Then recycle the
   rest" therefore returns each opponent's unchosen revealed card to *their* deck, never to yours.
   In a Duel (485.1: 2 players) exactly one card is revealed, so "the rest" is empty and 416.4's
   "as many as possible" is zero. The clause is live only in 2v2.
2. **The stolen card never joins your resources.** 056: "Cards a player owns may never be placed into
   a non-Board zone belonging to another player", and 056.2 redirects it to the owner's zone. A stolen
   spell resolves and goes to *their* trash (157 / 351.2); a stolen unit you play, control and later
   lose goes to *their* trash. You get one use of it, and no recursion off it.
3. **Domain Identity does not gate it.** 103.1.b.1 restricts "Cards included in your deck". A card in
   the opponent's deck is not in yours, and "ignoring its cost" pays no domain Power, so Blind Fury
   can put a card of any domain onto your board. This is the only line in the catalogue that does so.

### 1.3 Blind Fury never Burns the opponent out

Blind Fury *reveals*; it never draws and never mills. 431.1.c is explicit that looking or revealing in
excess of the deck "does not Burn Out", and 431.1.c.1 extends that to the subsequent zone change of
the revealed cards. Against an empty Main Deck the opponent reveals nothing, the Choose step has no
legal object, and 055 ("ignoring impossible instructions") resolves the spell for nothing. The issue's
§4 conjecture is confirmed; 431.1.a and 431.1.b are the *other* two branches and neither is reached.

### 1.4 The repeat, and its exact ceiling — a correction to the issue

The issue described "an ENGINE that repeats … once per Conquer, paying Blind Fury's own 4 Energy +
2 Power again each time". The repeat is real; the *unbounded* framing is not, and the catalogue
already held the reason. **829.1.b**: a Flow play ends "Then banish it", and **829.1.b.1** makes that
a delayed replacement effect that fires when the spell leaves the chain. So each copy of Blind Fury
can be re-flowed **exactly once**, and then it is in Banishment, out of reach of every recursion in
the pool. With 103.2.b's 3-copy cap the whole engine is:

| route | plays | price each |
|---|---|---|
| from hand | 3 (one per copy) | 4 Energy + 2 Power |
| from the trash on a Kennen conquer | 3 (one per copy) | 4 Energy + 2 Power, or 2 Energy + 2 Power with `VEN-098` Stargazer |

**Six steals per game at the outside, three of them free of a card.** That is the honest ceiling and
the entry says so. Note this is the same finite shape as the catalogued `kennen-stargazer-arena-flow`,
which is also classed ENGINE for exactly this reason — the class is consistent, not generous.

Getting Blind Fury into the trash costs nothing extra: it goes there by itself after any hand cast
(351.2), and Kennen's own play trigger `[Burn 2]` puts the top 2 of your deck there (431.1.b) and may
put it there for free.

### 1.5 Searched for a better repeat; there is none

Every Fury or Chaos line that returns or replays from the trash was read
(`grep -inE "from your trash" data/corpus_flat.txt` filtered to Fury / Chaos / Fury+Chaos):

- `OGS-010` Annie, Stubborn "return a spell from your trash to your hand" — a play trigger, so 3 more
  returns at most, and 4 Energy + 1 Power each.
- `OGN-252` Super Mega Death Rocket! returns **itself** only.
- `VEN-022` Endless Riches grants "You may play cards from your trash" but its own next sentence —
  "If a card would go to your trash from anywhere other than your Main Deck, banish it instead" —
  banishes Blind Fury after the first such play, so it grants one extra play per copy, not a loop.
  (It is also the card CLAUDE.md already records as anti-synergic with its own lens.)
- `OGN-196` Soulgorger, `OGN-198` The Harrowing, `SFD-150` Last Rites, `UNL-142` Heedless
  Resurrection, `UNL-148` Cursed Sarcophagus all replay **units**, not spells.
- `SFD-140` Fizz, Trickster replays a spell with Energy cost **no more than 3** — Blind Fury is 4.

So `VEN-113` Kennen is the pool's only renewable licence to cast Blind Fury a second time, which is
what makes the pair a combo rather than a good card.

### 1.6 Where the conquer comes from

Kennen's trigger is "When I conquer". The minimal line takes it by attacking. `OGN-286` Reckoner's
Arena ("When you hold here, activate the conquer effects of units here") turns a Hold into that
conquer with no attack, by 383.4.g.1 — whose worked example is Reckoner's Arena by name, and Kennen
carries no non-conquer condition, so 383.4.g.1's last sentence does not exclude him. That is the
already-catalogued `kennen-stargazer-arena-flow` board and it is named in the entry's `notable`, not
in its `uses`: a battlefield is one of three and is drawn at random (485.4.a, 485.5), so requiring it
would make the matcher demand a card that may never be on the table.

### 1.7 Overlap, declared

`kennen-stargazer-arena-flow` (ENGINE, verified) already pairs `VEN-113` with `VEN-098` under
`OGN-286` and produces "a discounted spell out of the trash per Hold". The new entry shares only
Kennen, names the spell, and produces something that entry does not: cards out of the **opponent's**
deck. Its `produces` is `opponent-deck-pressure`, not `card-advantage-engine`.

---

## §2 — `OGN-242` Baited Hook. VERIFIED as `baited-hook-sprite-queen-free-unit`, ENGINE

Card text, verbatim — and the issue transcribed the cost wrong:

```
OGN-242 | Baited Hook | Gear | Order | E3 | :rb_energy_1::rb_rune_order:, :rb_exhaust:: Kill a
friendly unit. Look at the top 5 cards of your Main Deck. You may banish a unit from among them that
has Might up to 1 more than the killed unit and play it, ignoring its cost. Then recycle the rest.
```

The activation cost is **1 Energy + 1 Order Power + exhaust**. The issue wrote "[Equip cost not
relevant — Gear, Order] Exhaust:", losing the Energy and the Power. It also asked whether a token can
pay the cost: **the question does not arise.** "Kill a friendly unit" is the first sentence of the
*effect*, after the colon — it is not a cost. So 416.3 ("when Recycling is listed as a Cost…") and
203.3 (an impossible cost cannot be paid) are both inapplicable, and 185 ("Tokens are not cards") never
bites, because nothing here recycles anything from a trash: the Hook **kills** (428.1, a permanent
going to the trash from the board) and killing a token is ordinary — 185.2.d, "Tokens have a type.
They follow all rules for their type." The Recycle in the last sentence is of the four *cards* you
looked at, from your own Main Deck to your own Main Deck (416.1.a, 416.1.c), bottom, random order
(416.5).

If you control no unit, 055 applies and the whole ability does nothing: with no killed unit the Might
threshold "1 more than the killed unit" has no value, so the banish-and-play clause has nothing to
measure against.

### 2.1 The fuel is the problem, and `UNL-084` Sprite Queen solves it for free

The fetch ceiling is the killed unit's Might + 1, so the engine is only as good as the biggest body
you can afford to throw away every turn. Order's own token faucets are small — the full list from the
corpus is Recruits at 1 Might (`OGN-211`, `OGN-212`, `OGN-218`, `OGN-222`, `OGN-239`, `OGN-246`,
`OGS-015`, `SFD-153`, `SFD-168`, `SFD-179`, `VEN-128`), Birds at 1 Might (`UNL-153`, `UNL-160`) and
Sand Soldiers at 2 Might (`SFD-154`, `SFD-157`). A Recruit buys a 2-Might fetch; a Sand Soldier a
3-Might fetch, and only once per copy.

```
UNL-084 | Sprite Queen | Unit | Mind | E7 P1 M6 | When you play me or at the start of your Beginning
Phase, play a ready 3 :rb_might: Sprite unit token with [Temporary] to your base. (Kill them at the
start of their controller's next Beginning Phase, before scoring.) [Tags: Fae, Ionia]
```

187.2 makes that token **3 Might**, and 816.1.b makes it die at the start of your *next* Beginning
Phase — 816.1.c puts the Trigger Condition at the start of the Beginning Phase, which is why the
Sprite born inside that window survives the turn it appears (the reasoning `viktor-leader-sprite-queen-
free-bodies` already stands on). So during your Main Phase you always control exactly one 3-Might
body **that is going to die for nothing anyway**. Feeding it to Baited Hook costs zero: Sprite Queen
replays it next Beginning Phase whether it died on schedule or early. Fetch ceiling: **Might ≤ 4**.

Mind + Order is a legal identity — `OGN-265` Herald of the Arcane, `OGS-021` Lady of Luminosity -
Starter, `SFD-201` Chem-Baroness, `UNL-199` Deceiver (103.1.b.2, 103.1.b.3).

### 2.2 The turn, step by step

1. **Awaken (315.1.b)** readies Baited Hook. Gear enters ready in the first place (143.4 exhausts
   *units*; 359.2.d puts non-unit gear on the board ready), so the Hook works the turn it is played.
2. **Start of the Beginning Phase**: the old Sprite dies (816.1.b) and Sprite Queen plays a fresh
   ready 3-Might Sprite to your base. Both are yours, so 383.3.d lets you order them.
3. **Main Phase (312.2.a)**: pay 1 Energy + 1 Order Power and exhaust the Hook. Kill the Sprite.
4. Look at the top 5 of your Main Deck. Banish a unit among them with Might ≤ 4 and **play it,
   ignoring its cost** — 355.2.a puts it at your base or a battlefield you control, 359.2.c exhausted.
5. Recycle the other four to the bottom of your own deck (416.1.a, 416.1.c, 416.5).

### 2.3 What the free unit is worth, measured

Every unit in Mind ∪ Order with Might ≤ 4, by cost, from `data/cards.json`. The two headline targets:

- **`OGN-226` Spectral Matron** | Unit | Order | **E4 P2 M4** — "When you play me, you may play a unit
  costing no more than 3 Energy and no more than 1 rainbow Power from your trash, ignoring its cost."
  The single most expensive body the Hook can reach in this identity, and her own play trigger is a
  **second** free unit off the same activation once your trash has one.
- **`UNL-087` Blue Sentinel** | Unit | Mind | **E4 P1 M4** — the catalogue's hold-point multiplier,
  fetched free.

Others at the ceiling: `OGN-225` Solari Chief and `OGN-239` Machine Evangel (E5 P1 M4), `UNL-169`
Ashe, Focused (E5 P1 M4), `SFD-089` Rumble, Scrapper (E5 P1 M4), `UNL-164` Safety Inspector (E5 P1 M3).

Per turn, therefore: **1 Energy + 1 Order Power buys a unit worth up to 4 Energy + 2 Power, plus a
5-card dig.** Against the free floor of 2 Power a turn (164.2.b, 161.2.b, 315.3.b / 430.4.a, recorded
in CLAUDE.md) the Power half is affordable every turn.

### 2.4 Honest limits, all stated in the entry

- It is a **5-card dig, not a tutor**: if no unit of the right Might is in the top 5, the "may" is
  declined and you have spent 1 Energy + 1 Order Power and the Sprite for a shuffle. The Sprite was
  free, so the loss is small, but the entry does not claim reliability.
- **Once per turn.** 315.1.b readies the Hook only at Awaken; the pool has 5 cards that ready gear
  (`VEN-149`, `VEN-150`, `SFD-221`, `OGN-162`, `VEN-068`, from #56's walk), so faster needs one of
  them. Not INFINITE: the exhaust is the gate and no pass repeats inside one turn.
- **Setup is slow**: Sprite Queen is 7 Energy + 1 Power and the Hook 3 Energy.
- **It never Burns Out** (431.1.c), even with a deck of fewer than 5 cards.

### 2.5 Riders, and the overlap

`OGN-246` Viktor, Leader ("When another non-Recruit unit you control dies, play a 1 Might Recruit unit
token into your base") pays a permanent Recruit for every Sprite the Hook eats — 187.2 gives the
Sprite the *Fae* tag, so it is a non-Recruit death. That is a third card and goes in `notable`, not in
`uses`, per the rule CLAUDE.md sets.

**Overlap, declared:** `viktor-leader-sprite-queen-free-bodies` (ENGINE, verified) already uses
`UNL-084`. It converts the Sprite's *scheduled* death into a Recruit; this entry spends the same
Sprite *early*, in the Main Phase, for a card out of your own deck. The two do not conflict — with
Viktor on the board you get both off one kill — but they are different products and the entry says so.

---

## §3 — `SFD-055` Needlessly Large Yordle on `ahri-trinity-svellsongur-hold`. REFUTED as computed

```
SFD-055 | Needlessly Large Yordle | Unit | Calm | E10 P3 M5 | [Shield 5] … [Tank] … I cost
:rb_energy_2::rb_rune_calm: less for each point you scored from holding this turn.
```

**The timing half of the issue's §3 holds.** 315.2.b.2 puts the Hold in the Scoring Step of the
Beginning Phase; 383.4.d.2.a puts the Hold Abilities on the chain there; 312.2.a gives a player
Priority only "in a Neutral Open State during their Main Phase", which is strictly later. So by the
time the Yordle can be cast, every point that turn's Hold produced is already banked.

**The magnitude half does not.** The issue computed `10 − 2×9 = −8` by counting all nine points of
`ahri-trinity-svellsongur-hold`. The card says "each point you **scored from holding**", and that
phrase is a defined act:

- **468** — "Scoring is the act of a Player gaining a point through the process of seizing or
  maintaining control over a Battlefield."
- **469** — "A player Scores in one of two ways": 469.1 Conquer and 469.2 **Hold**.
- **470** — "A player may only Score, from either method, **once per Battlefield per turn**."

And the catalogue's own ruling **R2 = A** (issue #11, ruled 2026-09-03) says card-text "score 1 point"
is a point **Gain by ability** under 194.1.c, *not* a 469 Score — that is precisely why 470's
once-per-battlefield cap does not bite the eight Ahri/Trinity Force/Svellsongur instances and why the
entry reaches 9 at all. The same ruling is what excludes those eight from "scored from holding": one
of Ahri's board's nine points is the 469.2 Score; the other eight are 194.1.c Gains.

So against that exact board the Yordle is discounted by **one** point: 10 − 2 = **8 Energy**, and
3 − 1 = **2 Calm Power**. The ceiling in a Duel is two, because 485.4 fixes the Battlefield Count at
2 and 470 allows one Score per battlefield per turn: holding both gives 10 − 4 = **6 Energy + 1 Calm
Power**. `SFD-055` is never free and never near it.

This does not touch `ahri-trinity-svellsongur-hold`'s `uses`, `class` or any quantity — the entry
never claimed the Yordle. It is recorded as a `notable` on that entry so the arithmetic is not
re-derived, which is the same reason the catalogue records refuted riders rather than dropping them.

---

## §4 — the two refutations recorded for future hunts

1. **`OGN-276` Aspirant's Climb and `OGN-290` The Arena's Greatest are dead letter.** Confirmed
   against `data/legality.json` (built from `data/legality.src.json`, transcribed from Riot's Rules
   Hub): both are `banned` in **constructed** and in **2v2**, the only two formats this project
   tracks. There is no legal table for either, so their absence from the catalogue is not a gap.
   The full list of cards in that position is `OGN-177`, `SFD-122`, `SFD-020`, `OGN-168`, `OGN-182`,
   `OGN-290`, `OGN-276`, `OGN-292`, `OGN-284`, `OGN-285` (banned in both), plus `OGS-019`
   (restricted in 2v2 only).
2. **A three-domain Hold-point stack is illegal, so 383.4.d.2.a's stacking has a hard ceiling.**
   383.4.d.2.a does put the Hold Ability of *each* qualifying unit on the chain independently, so
   *different* Hold-point cards at one battlefield stack the way R1 = A established for copies of one
   card. But 103.1.b.2 gives a legend exactly two domains and 103.1.b.4 permits a multi-domain card
   only in an identity containing **all** its domains, so the issue's `VEN-138` Shen (Order) +
   `OGN-066` Ahri (Calm) + `SFD-115` Trinity Force (Body) stack cannot be built.
   `ahri-trinity-svellsongur-hold` remains the cheapest 2-domain reproduction.

---

## Verification

`npm test`, `npm run typecheck` and `npm run build:web` were run after the edits; see the commit.
