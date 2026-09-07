# The orphan and under-walked synergy rules — second pass

Issue #170. Session `rc-walk-rules`, 2026-09-07. Entries staged to `/tmp/rc-walks/rc-walk-rules.json`
under the parallel-walk protocol; this document is the only file the walk commits.

## 0. What this walk is for, and how its targets were measured

`data/synergies.json` holds 144 hand-verified PATTERNS. A rule is a value exchange between an anchor
card and a text predicate over the pool; a combo entry is a walked LINE. The two are different
objects, which is why #153 could give all 55 of its orphan rules a disposition and still produce only
ENGINEs. This pass asks a narrower question: **for a rule whose partner list has never been read
into an entry, is there a partner whose NUMBERS or TRAP differ from every existing entry on that
anchor?** If yes it is an entry; if the arithmetic is the same on a slightly different card it is a
`notable`; if a paragraph kills it, the refusal is recorded here with the paragraph quoted.

Targets were measured, not guessed. For every rule, `partnersOf(rule, cards)` was intersected with
the `uses[]` of every entry that already contains the anchor:

```
=== <rule id>  anchor <code> <name> [domains] partners N uncovered M entriesWithAnchor K
```

`uncovered` counts partners the anchor has never shared an entry with. Two sets are in scope: the 21
rules with an empty `basis.combos` (minus the two `*-friendly-kill` orphans, which belong to the
matrix walks), and the proven rules with a large `uncovered` count. **Every count in this document is
as of 2026-09-07** — parallel walks move them within the hour.

---

## 1. `stare-down-empties-the-garrison` (UNL-107) — 54 partners, 54 uncovered, and the rule's own subject was missing

The rule pairs a bloodless Conquer with a **conquer payoff** (`[Ww]hen (I|you) ... conquer`). The
catalogue held three Stare Down entries — `renekton-stare-down-evacuate`,
`stare-down-buccaneer-open-battlefield-conquer`, `spirit-wheel-stare-down` — and **not one of them has
a conquer payoff in `uses[]`**: they buy the Conquer and stop there. So the rule's whole subject was
uncatalogued, and every one of its 54 partners was uncovered.

### 1.1 The rule the walk leans on that no Stare Down entry had cited: 383.4.c.2.a

> **383.4.c.2.a.** *The Conquer Abilities of Units are put on the Chain as Pending Items after the
> Unit(s) these effects correspond to are present at a Battlefield when a player gains control of it
> and gains 1 Victory Point from Conquering.*

**Presence, not participation.** Nothing there asks which unit walked in, or which unit the spell
chose. Read with 144.3 (*"Players may perform multiple Units' standard move simultaneously. This is
treated as one game action performed on multiple Units"*, 144.3.a: shared destination, 144.3.c:
simultaneous exhausts), a bloodless Conquer is a **mass trigger**. That is what turns Stare Down from
a one-point spell into a payoff engine, and it is the shape behind three of the four entries below.

### 1.2 Stare Down is a DIAL, not a switch

`Move all enemy units at that battlefield with **less Might than the chosen unit** to their base.`
The threshold is a number you choose, so the same spell has two opposite uses:

- **Sweep everything.** Then 323.6 strips the opponent's Control at the Cleanup, the battlefield is
  *unoccupied and uncontrolled* — both halves of 170.11.c — and the walk-in is a Showdown with no
  Combat (323.9 needs *"Units present controlled by opposing players"*), no Attacker designation and
  no damage (465.1).
- **Sweep all but the biggest.** Then exactly one enemy unit is left, which is the condition four
  cards in the pool key on, and the walk-in is a real Combat you have stacked in advance.

Entries `stare-down-yone-blademaster-base-strike` and `stare-down-arachnoid-horror-lone-survivor` are
those two uses. They are not versions of one line.

### 1.3 Entries written

| id | class | card set | what is new |
|---|---|---|---|
| `stare-down-yone-blademaster-base-strike` | ENGINE | UNL-107 ×3, SFD-116 ×1, SFD-118 ×1 | Yone's trigger says *"a battlefield that **was uncontrolled**"*, so the sweep must be TOTAL; Boneshiver's Might Bonus raises the sweep threshold and Yone's damage by the same 2 |
| `stare-down-hunt-pack-xp` | ENGINE | UNL-107 ×3, UNL-100, UNL-117, UNL-113 | 383.4.c.2.a + 144.3: one bloodless Conquer fires the whole pack, 3+2+2 Hunt XP plus the spell's printed 1 |
| `stare-down-arachnoid-horror-lone-survivor` | ENGINE | UNL-107 ×3, UNL-117, UNL-102 ×2 | the partial sweep manufactures *"an enemy unit is alone there"*; the answer is PLAYED in, so it is an Attacker with no move and no exhaust |
| `stare-down-demolitionist-gear-strike` | ENGINE | UNL-107 ×3, VEN-080, SFD-118, UNL-096 | two Might Bonus Equipment raise a M1 body to M5, which is simultaneously the sweep threshold and the Energy ceiling of his gear kill |

Cards that were in **zero** entries before this walk and now carry one: `SFD-116` Yone Blademaster,
`UNL-113` Master Yi Tempered, `UNL-102` Crowd Favorite, `VEN-080` Noxian Demolitionist,
`UNL-096` Hunter's Machete.

### 1.4 The `kill a gear` population, measured

`grep -i "kill a gear" data/corpus_flat.txt` returns **eight** cards as of 2026-09-07. Five kill at
spell or play speed with no conquer involved (`SFD-005` Detonate, `VEN-003` Brittle Steel, `SFD-032`
Disarming Rake, `SFD-160` Zaun Punk, `SFD-077` Rocket Barrage), one has a fixed 1-Energy cap on a play
trigger (`SFD-074` Pickpocket), and **exactly two are conquer effects**: `OGN-056` Adaptatron (Calm,
E4 M3, no Might threshold, but its rider is a buff that 702.3 places only once) and `VEN-080` Noxian
Demolitionist. The Demolitionist earns the entry rather than Adaptatron because he is mono-Body — the
cheapest identity in the lens — and because the two cards that scale him are the two that widen the
sweep.

### 1.5 Refusals in this rule's list

**`OGN-164 Sett, Brawler` as the conquer payoff — REFUSED, 702.3.** *"When I'm played and when I
conquer, buff me. (If I don't have a buff, I get a +1 Might buff.) Spend my buff: Give me +4 Might
this turn."* 702.3: *"There can only be one Buff on a Unit at a time"*, and 702.3.a: *"If a Buff is
added, or instructed to be added, on a Unit that already has a Buff, it is not placed instead."* The
play trigger has already given him his one buff, so the conquer trigger is a **no-op** unless the
buff was spent first — and spending it is a Main Phase activation that costs the +4 this turn. The
line that survives is not a Stare Down line at all: it is the ordinary Sett tempo curve, already
catalogued at `sett-first-mate-windswept-hillock`. This is the same shape as the two `excludes` the
#160 walk recorded on `blue-sentinel-hold` and `red-brambleback-conquer`.

**`SFD-108 Warmog's Armor` as the repeating payoff — REFUSED for the same paragraph.** *"[Effect] When
I conquer, buff me."* One buff, then nothing, whatever the conquer count. It stays in the catalogue
where it already is (`jhin-relentless-pursuit-wallop`, `jax-grandmaster-warmogs-buff`) and it is
`SFD-118 Boneshiver` — *"channel 1 rune exhausted"*, no counter, no cap — that repeats. The contrast
is why Boneshiver and not Warmog's is in two of the four entries above.

**`OGS-023 Might of Demacia - Starter` and `OGN-269 The Boss` — NOT REFUSED, deferred to a later batch.**
Both are legends (*"When you conquer, if you have 4+ units at that battlefield, draw 2"*; *"When you
conquer, ready me"*) and 383.4.c.2.b covers them: *"The Conquer Abilities of anything that references
the player Conquering is put on the Chain as a Pending Item…"*. They pay this line exactly as
described.

> **CORRECTION, made the same day by the walk that wrote it.** The first version of this paragraph
> said a legend cannot be an entry's payoff *"because no entry in the catalogue puts a legend in
> `uses[]` (measured: 0 legend rows over all 362 entries)"*. **That measurement was wrong** and the
> reason is worth keeping: `Card.type` is a string ARRAY (`["legend"]`), and the probe compared it
> with `=== "legend"`, which is false for every card in the pool. Re-run correctly, the catalogue has
> **73 legend rows across 48 distinct legends**, with `role: "legend"` and `zone: "LEGEND"` — and
> `master-of-shadows-banish-rummage`, an entry this same walk read an hour later, is one of them. The
> lesson is the project's own: a claim of the form *"nothing in the catalogue does X"* is a
> measurement, and a measurement written against the wrong field silently returns zero. Both legends
> are therefore live entry material and are carried to a later batch, not refused.

---

## 2. `on-the-hunt-ganking-second-move` (SFD-204) — 37 partners, 37 uncovered

The rule's own `why` says the thing worth building on: *"the SECOND move comes from the READY … and
[Ganking] only supplies the destination"* (810.1.c.3 — *"It does not give additional abilities or
activations of Movement, only new options for the Standard Move"*). The walk takes that one step
further: **a ready that names no unit multiplies by COPIES.** `Ready your units` is one of exactly two
sentences of its kind in the pool (`grep -i "ready your units"` returns `SFD-192` and `SFD-204`), it
names no target, and so one casting pays every body on the board at once.

### 2.1 `on-the-hunt-yasuo-triple-third-move` (ENGINE, SFD-204 ×2 + OGN-205 ×3)

`OGN-205 Yasuo, Windrider` — *"The third time I move in a turn, you score 1 point."* Three copies,
two castings, **three points a turn for 2 Energy and 4 Power**.

Two facts the entry stands on that the catalogue had not stated together:

1. **The point is not a Score.** 194.1 lists the ways to gain points, and 194.1.a (Holding),
   194.1.b (Conquering) and **194.1.c** (*"Spells, Triggered Abilities and Activated Abilities that
   instruct them to gain one or more points"*) are three separate items. 469 defines Scoring as
   Conquer or Hold only, and 470 (*"A player may only Score, from either method, once per Battlefield
   per turn"*) caps those two. **So the two-Conquers-a-turn ceiling that bounds every conquer line in
   the catalogue (470 with 485.4) does not bound this one**, and 471.1.a.1 says the same for the last
   point: *"points Gained from sources that are not Conquer are not beholden to these restrictions."*
2. **The route never contests a battlefield, which is what keeps the three Standard Moves legal back
   to back.** 190.3.a.1 applies Contested only *"if that battlefield is not already Contested and that
   Unit's controller does not already control that battlefield"*. Move into a battlefield you ALREADY
   control and nothing is staged — which matters because 144.1.b forbids the Standard Move *"during a
   Closed State"* and 144.1.c *"during a Showdown or Combat"*. A route that opened a Showdown would
   strand moves two and three. Moves to your own base are never Contested: 450 speaks only of a
   Battlefield Destination.

The two catalogued Yasuo lines both buy his moves with **per-unit effect movers** under an Unforgiven
(Calm/Chaos) legend, so their cost per point is flat. This one buys them with a **mass ready** under a
Battle Mistress (Body/Chaos) legend, so the cost per point falls with each copy. Different identity,
different arithmetic, different card set.

**Legend line, computed and not typed.** `SFD-204` is a Signature card (`data/signature.src.json`)
with champion tag `Sivir`, so 103.2.d.2 makes this a one-legend field: the only legends in
`cards.json` carrying that tag are `SFD-203` and `SFD-250` **Battle Mistress** (Body/Chaos). Two of
the three Signature slots 103.2.d.1 allows are spent by the two castings.

**A third casting buys no fourth point** — 383.1.b governs *"the [Nth] time"* triggers and Yasuo's
reads *"The third time"*; moves four and five pay nothing. The third copy is defence, never points.

---


## 3. `master-of-shadows-banish-empower` (VEN-143) — 31 partners, 29 uncovered, and a uniqueness claim that its own card set refutes

The catalogue's one Master of Shadows entry, `master-of-shadows-banish-rummage`, says in its **name**
that *"Kennen is the only renewable banish in his own domains"*. It is not.

`grep -i "Shadow Clone" data/corpus_flat.txt` returns three cards, all inside Fury/Chaos:

| code | domain | how the clone arrives |
|---|---|---|
| `VEN-144` Death Mark | Fury/Chaos | on the spell resolving — **and this entry already runs three copies of it** |
| `VEN-023` Zed, From the Shadows | Fury | on play, if you paid the discard as an additional cost |
| `VEN-112` Zed, Without a Sound | Chaos | on every conquer, to your base |

Every one of them prints the same token text: *"When I attack, you may banish a unit from your trash.
If you do, give me [Assault 4] this turn."* That is a banish of a card you own **every combat**, with
no conquer required and no card spent — strictly more renewable than Kennen, whose banish-enabler is a
conquer trigger. So the claim is refuted by the entry's own three Death Marks. Reported to the
manager; the fix belongs to whoever owns `data/combos.json`.

### 3.1 The more useful half: a repeatable source is worth **one** activation a turn

Master of Shadows's payoff is *"[Action][>] Disempower me, exhaust: Discard 1, then draw 1."* The
**exhaust is in the cost**, and 315.1.b readies him only in your own Awakening, so:

- banish once → 441.1 empowers him → disempower + exhaust → loot;
- banish twice → the second empower lands (441.1.b bars empowering an *already* Empowered object, and
  the loot has just disempowered him) but buys nothing, because the exhaust is spent.

**So the value of a renewable banish is not more loots, it is a loot on EVERY turn** instead of only
the turns you hold a banisher. This is the same shape the #160 walk found on the doubled
`you may exhaust me to…` Hold triggers, reached from the other side: a multiplier on the TRIGGER side
is worth nothing when the payoff's cost is an exhaust.

Entry: **`zed-shadow-clone-renewable-banish-loot`** (ENGINE; VEN-143 legend + VEN-112 + VEN-023 ×3).
`VEN-112` and `VEN-023` were both in zero entries.

---

## 4. `tryndamere-excess-damage-might-reduction` (OGN-034) — 22 partners, 22 uncovered

The rule states the gap and the catalogue confirms it: every excess-damage entry pulls the
**attacker** lever (buffs in `tryndamere-call-to-glory-trapping-grounds`, a Might Bonus in
`tryndamere-hextech-gauntlets-enforcer`, [Assault] in `trapping-grounds-excess-damage`). Nothing pulls
the **defender** lever, which 465.2.c.4 makes exactly as good:

> **465.2.c.4.** *Units cannot have more damage assigned to them than the minimum required to
> constitute lethal damage unless no further units remain to have damage assigned to them.*

A buff is +1 (703). One `OGN-116 Thousand-Tailed Watcher` is −3 on **every** enemy unit.

### 4.1 The four-point swing, with the quantities declared

M8 Tryndamere into a garrison of M4 + M3: assign 4 and 3, excess **1**, threshold 5, **miss**.
Play the Watcher first — 477.3.b snapshots each floored reduction at application, so both bodies sit
at 1 — assign 1 and 1, excess **6**, **hit**. One card, four points of margin. And 465.2.c reads
current Might for both sides, so the garrison swings back for 2 instead of 7.

### 4.2 The split into two entries

| entry | payoff | identity | reducer |
|---|---|---|---|
| `tryndamere-thousand-tailed-watcher-shrink` | a fixed **point** (194.1.c) | Fury/Mind — three legend names, six base codes | `OGN-116`, floored at 1, hits the whole garrison |
| `sivir-ambitious-frigid-touch-excess` | *"deal that much"* — the **margin is the payout** | Mind/Body — **one** legend name (VEN-149 / VEN-194 Defender of Tomorrow) | `SFD-066` Frigid Touch, **unfloored**, one body |

`SFD-120 Sivir, Ambitious` was in zero entries. The two are separate because the payoff is a
different currency and the domains land at opposite ends of the census — three legend names against
one. `SFD-066` with its [Repeat] paid is −4 with **no floor**: 143.2.b treats the result as 0 while
143.2.b.1 insists *"Although the unit's Might is treated as 0, it is not 0"*, and 143.2.a still needs
nonzero damage, so the bill is 1 either way — the unfloored reducer simply never wastes its second
execution on a body already near the floor. It is also a [Reaction], so it is bought **after** seeing
the garrison, inside the Combat's Closed State (813.1.c.1, 312.2.c), where the Watcher must be
committed in the Main Phase.

---

## 5. `undertitan-reveal-payoff` (SFD-175) and `forgotten-signpost-carries-exhausted` (UNL-045) — closed together

`SFD-175 Undertitan` already had four entries. What none of them has is a reveal that **keeps** it:
Rek'Sai's and Teemo's both end in *"recycle the revealed cards"*, Diana's is a Predict, and Void Rush
banishes-and-plays. `VEN-033 Pakaa Protector` — *"When I move, reveal the top card of your Main Deck.
If it's a unit, **draw it**. Otherwise, put it in your trash and give me +2 Might this turn"* — is the
only mover-reveal in the rule's list whose unit branch draws, and an Undertitan is a unit. The 2
Energy (424.1: revealing is public presentation; the Undertitan's trigger names no source) and the
5-Might body arrive on the same event.

**And the engine has no blank face**, which is the honest reason it is an entry rather than a lottery:
a unit is card advantage, anything else is a filtered mill plus +2 Might. The jackpot rate is stated
in the entry rather than hidden — three copies in a 39-card deck (103.2 counts the Chosen Champion
inside the 40, 103.2.a.1 sets it aside) is about one reveal in thirteen.

`UNL-045 Forgotten Signpost` supplies the **second** reveal of the turn, and closes the second orphan
rule: its cost is exhausting *another* unit plus its own exhaust, so it fires once a turn, and
420.3.a puts the exhaust of a move on the **Standard Move only**, so the body it moves is not spent.
Two moves, two reveals, and 431.1.c means the reveal half can never Burn Out.

Entry: **`undertitan-pakaa-signpost-move-reveal`** (ENGINE, Calm/Order). `VEN-033` was in zero
entries.

---

## 6. `ravenbloom-student-spell-replay` (OGN-103) — 18 partners, and the anchor was in **no** entry at all

`grep -i "when you play a spell" data/corpus_flat.txt` returns **eight** cards as of 2026-09-07.
Five gate on a cost or spend threshold (`OGS-006` and `OGS-021` on *"costs 5 or more"*; `UNL-005`,
`UNL-181`, `UNL-211` on *"if you spent 4 or more"*), one gates on the opponent's turn (`SFD-063`),
and **exactly two are unconditional**: `OGN-103 Ravenbloom Student` (+1 Might) and `UNL-149 Diana, No
Longer Human` (+2 Might). Both were in zero entries. They share Mind/Chaos, so they stack.

**Why they stack at all** is the fact worth carrying: *"give me +N Might this turn"* is a plain
continuous modifier applied in 477.3.e.1's increase step, **not** a 702 Buff counter, so 702.3's
one-per-unit cap and 703's fixed +1 are both silent and there is no ceiling of any kind. Four spell
events on an ordinary turn take M2 → M6 and M3 → M11.

The rule's own claim — a replay from the trash is a second *play* off a card already spent — is
carried by `SFD-140 Fizz, Trickster` (*"play a spell from your trash … ignoring its Energy cost"*)
and by the 17 [Flow] cards, where 829.1.b is *"functionally short for 'You may play this from your
trash for its flow cost. Then banish it'"* and 829.1.b.1's delayed replacement banish caps each copy
at exactly **two** events per game.

The entry says its own shortfall out loud: **nothing in Mind/Chaos converts Might into points.** The
excess-damage family is Fury and Body (`OGN-034`, `SFD-120`, `UNL-187`, `UNL-188`, `UNL-217`), and
reaching it would need a third domain (103.1.b). So the product is a combat won, and the class is
ENGINE.

Entry: **`ravenbloom-diana-fizz-spell-stack`**.

---

## 7. Back-links for `data/synergies.json` (`rule id -> entry id`)

This walk does not edit `data/synergies.json`. The pairs below are for the synergies session.

```
stare-down-empties-the-garrison       -> stare-down-yone-blademaster-base-strike,
                                         stare-down-hunt-pack-xp,
                                         stare-down-arachnoid-horror-lone-survivor,
                                         stare-down-demolitionist-gear-strike
dauntless-vanguard-occupied-battlefield-assault
                                      -> stare-down-arachnoid-horror-lone-survivor
                                         (the mechanism, not an anchor-partner pair: 190.3.a.1 +
                                          464.2.c.1 make a PLAYED unit the Attacker, which is the
                                          rule's whole subject; Arachnoid Horror grants the
                                          permission under 355.2.b instead of printing it on itself)
on-the-hunt-ganking-second-move       -> on-the-hunt-yasuo-triple-third-move
master-of-shadows-banish-empower      -> zed-shadow-clone-renewable-banish-loot
tryndamere-excess-damage-might-reduction
                                      -> tryndamere-thousand-tailed-watcher-shrink,
                                         sivir-ambitious-frigid-touch-excess
undertitan-reveal-payoff              -> undertitan-pakaa-signpost-move-reveal
forgotten-signpost-carries-exhausted  -> undertitan-pakaa-signpost-move-reveal
ravenbloom-student-spell-replay       -> ravenbloom-diana-fizz-spell-stack
```

## 8. Reported to the manager, not fixed here

- `master-of-shadows-banish-rummage` carries a **false uniqueness claim in its own name** — see §3.
  Three cards print the Shadow Clone token and its attack-triggered banish; one of them is the entry's
  own `VEN-144 Death Mark ×3`.
