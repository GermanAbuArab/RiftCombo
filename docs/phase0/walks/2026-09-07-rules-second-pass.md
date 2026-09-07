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


## 7. `shurelyas-requiem-ganking-second-move` (SFD-192) — 36 partners, 36 uncovered

The Requiem is **[Unique]** (825.3.a: *"A deck can contain only one card of a given name if the card
has Unique"*) and its mass ready is on the **play**, not on the [Equip] (818.1 makes Equip an
Activated Ability), so *"When you play this, ready your units"* fires **once per game**. Every
existing line therefore prices it as one explosive turn.

`UNL-075 Gustwalker` (Mind, E3 + 1 Power, M3, in zero entries) inverts that:

> `[Hunt 2]` (When I conquer or hold, gain 2 XP.) `[Level 3][>]` I have +1 Might and `[Ganking]`.

A double-Conquer turn under the Requiem pays **4 XP**, which crosses `[Level 3]` — so the borrowed
keyword is replaced by his own, permanently, for every later turn in which you do not spend XP
(824.1.d, 730.2). **The one-shot buys a permanent.** Entry:
`shurelya-gustwalker-hunt-bootstrap`.

The other Calm/Mind partners and why they are not this entry: `OGN-112` Kai'Sa, Evolutionary is
already carried by `kaisa-evolutionary-arena-spell` (which DOUBLES her conquer trigger instead of
buying a second Conquer); `SFD-071` Breakneck Mech grants [Ganking] to your Mechs as a static, so the
Requiem's grant is redundant on it; `OGN-297` Windswept Hillock is a battlefield, and 485.5 selects
battlefields at random.

---

## 8. `chem-baroness-gold-ramp` (SFD-201) — 20 partners, 20 uncovered

The rule already names the clause that matters — *"While your score is within 3 points of the Victory
Score, your Gold [Add] an additional 1 Energy"* — and the walk adds the two things that make it a
line rather than a note.

1. **The clause reads the token when it is KILLED, not when it is made.** 187.5 prints the Gold in
   full: *"A Gold gear token is a domainless gear token with '[Reaction][>] Kill this, [exhaust]:
   [Add] [rainbow]'."* Nothing forces you to cash it. A Gold made on turn three and still standing at
   five points pays **1 rainbow Power AND 1 Energy**. So the correct play under this legend is to
   **hoard** — the opposite of every other ramp engine in the catalogue.
2. **The threshold moves between formats.** 194.3 sets the Victory Score at 8, so the clause switches
   on at **5**; 489.3 sets it at 11 in 2v2, so there it switches on at **8**. No other Gold entry has
   to say this, because no other Gold source is score-gated.

Entry: `chem-baroness-gold-banked-across-the-threshold` (legend + `SFD-086` World Atlas + `SFD-174`
Trove Golem). Its own stated cost is the one the hoard creates: a Gold standing on the board is a
gear, and the pool has eight cards that kill gear.

---

## 9. `green-father-brush-four-tags` (UNL-195) — the DEFERRAL is closed, and not by a vote

#153 deferred this rule rather than guess, on the ground that 438 Replace against 190.x Control was
unruled. **It is ruled, and the rules use this legend as their own worked example:**

> **438.1.** *Replacing is the act of Creating a token in the place of another card or token without
> playing it while inheriting all effects or statuses of the game object it replaced.*
>
> **438.1.a.** … *Example: A player with Green Father as their legend conquers Navori Fighting Pit.*
> … *because the Brush inherited all statuses and conditions.*

Control is a status, so it carries; 190.6.a gives the Brush's abilities to its Controller and
190.6.d's blanking of *"you"* never fires. 438.5 / 438.5.a put the replaced battlefield in Banishment
but keep it *"Replaced and not Banished"*, so 438.7.b can swap it back and 108.6.c does not bite.
187.8 prints the Brush token in full. **No R-number was needed.**

### 9.1 What the +1 is worth, and the extension that does NOT work

187.7: a Bird token is *"a domainless unit token with 1 Might, the Bird tag, and the Deflect
keyword"*. 143.2.a kills on *"nonzero damage marked on it equalling or exceeding its Might"*, so a
1-Might Bird dies to `OGN-133 Flurry of Blades` (Body, E1, *"[Reaction] Deal 1 to all units at
battlefields"*) and a 2-Might Bird does not. **In Calm/Order the Brush is a second answer to the
problem the catalogue records only in Mind** (`UNL-077 Soul Shepherd`, from the #159 Azir refusal).

**But it cannot rescue a Grand Plaza line**, and this is worth stating because it is the obvious next
thought: replacing REMOVES the battlefield whose text the line needs (438.5). A deck that wants
`OGN-293 The Grand Plaza`'s own win text cannot be standing on a Brush instead of it.

### 9.2 The denial half, in no entry

127.1 and 485.4.a mean both players provided battlefields. Replace one the **opponent** brought and
its text is off the board for as long as the Brush stands, because 187.8's swap-back reads *"When you
score **here**"* and 190.6.a makes that *"you"* the Brush's Controller. 438.7.c is the warning in the
other direction: *"If there is nothing in Banishment to swap back to then this object can never swap
back."*

Entry: `green-father-brush-ultrasoft-poro-birds` (legend + `UNL-160` Ultrasoft Poro, whose body and
whose Bird tokens are both tribes the Brush buffs).

---

## 10. `jae-medarda-chosen-by-spell` (SFD-142) — 34 partners, 34 uncovered

The entry exists for a trap, which is the useful half. *"Give **two friendly units** each +1 Might
this turn"* looks like two choosings and two draws off one casting. **It is not** — the two are
distinct Game Objects, so Jae is chosen once per execution however the plural is filled.

The doubling has to come from `[Repeat]`, and reading the rule's own 34-row match list end to end
(2026-09-07) there are **exactly two** [Repeat] spells in it that choose a friendly unit:

| card | domain | shape | legend field it forces |
|---|---|---|---|
| `SFD-151` Bonds of Strength | Order | E2 + [Repeat] 2, two units +1 each | Order/Chaos — **one name**, VEN-155 / VEN-197 Heart of the Tempest |
| `SFD-034` Feral Strength | Calm | E2 + [Repeat] 2, one unit +2 | Calm/Chaos — three names (Unforgiven, Blade Dancer, Gloomist) |

820.1.b gives *"a second time"* and 820.2.a lets the second execution make different choices, so one
copy is **two draws**. Against `jae-medarda-choose-draw`, which runs Stupefy at 1 Energy a card, the
[Repeat] spell loses on price and wins on **deck slots**: three copies are six cards, not three.
Entry: `jae-medarda-repeat-double-choose`. `SFD-151` was in zero entries; Feral Strength is the same
arithmetic in a wider legend field and is recorded as a note inside the entry, not as a second one.

---


## 11. `startipped-peak-rune-ramp` (OGN-288) — a REFUSAL, twice recorded, that its own two partners reverse

`docs/phase0/walks/2026-09-06-orphan-synergy-rules.md` §30 refuses this rule, and #102 refused it
before that. The argument is airtight as far as it goes:

> the Hold fires at 315.2.b.2, **Awaken (315.1) has already finished**, so 315.1.b cannot ready the
> channelled rune; and 164.2.b's Power would land in the Beginning Phase only for 167 to empty the
> pool at the start of the Main Phase. *"The Peak's whole product is one extra rune, available as
> Energy from the following turn."*

**Every word is true and none of it bites on the rule's own two partners**, which the earlier walk
never opened:

| card | domain | the clause |
|---|---|---|
| `VEN-032` Frostcoat Mother | Calm | `[Empower]` 12 Energy. **This ability costs 1 Energy less for each rune you control.** |
| `VEN-050` Grumpy Rockbear | Mind | the same clause, a different Empowered body |

**"Runes you CONTROL" is a count, not a payment.** An exhausted rune on the board is a rune you
control. The Peak's extra rune is worth its full 1 Energy of discount the instant it is channelled,
on the same turn, with nothing readied and nothing spent. The refusal was a verdict about MANA, and
the partners do not want mana.

### 11.1 And the discount is what makes the refill matter

161.2.a fixes the Rune Deck at *"Exactly 12 Rune cards"*, so the count tops out at 12 and 356.6 floors
the cost at 0. 315.3.b channels 2 a turn, so an untouched deck reaches 12 on turn six. What the Peak
really sells is not the one turn of acceleration but the **refill**: 164.2.b recycles a rune for
Power and 161.2.b sends it *"to the Rune Deck, not the Main Deck"*, so **every Power you pay removes a
rune from the board and puts 1 Energy back onto the [Empower] cost.** A deck paying 3 Power a turn is
sliding backwards down its own discount; the Peak's Hold is the only free repeating refill in the
pool.

Entry: `startipped-peak-rune-count-empower`. All three cards were in zero entries.
`prerequisites.notable` carries the battlefield caveat the project requires: 485.5 selects one of the
three at random.

**The lesson, which is the project's own in a new shape: a refusal is scoped to the reason that was
given.** #59's Garbage Grabber verdict fell the same way. Before treating a recorded refusal as
general, check whether the partner list was read at all.

---

## 12. The two `buffed-payoff` rules — one entry and one refusal, on the same two partners

`peak-guardian-buffed-payoff` (anchor `OGN-223`) and `wizened-elder-buffed-payoff` (anchor `OGN-207`
Call to Glory) point at the **same** two cards — `OGN-065` Wizened Elder (*"While I'm buffed, I have
an additional +1 Might"*) and `OGN-125` Bilgewater Bully (*"While I'm buffed, I have [Ganking]"*), the
pool's only two `While I'm buffed` statics. They resolve in opposite directions.

**`peak-guardian-buffed-payoff` → an entry.** Peak Guardian *"buff me. Then, if I am at a battlefield,
buff all other friendly units there"* places a counter and never touches it again. 702.2.a: *"That
Unit is Buffed for as long as the buff remains on it."* Entry:
`peak-guardian-bilgewater-bully-ganking-buff` (Body/Order). It cannot take BOTH statics — Wizened
Elder is Calm and Calm + Body + Order is three domains (103.1.b) — which is exactly what separates it
from the catalogued `blind-monk-wizened-elder-bilgewater-bully`, whose Calm/Body legend takes both
and whose identity this one is illegal in.

**`wizened-elder-buffed-payoff` → REFUSED, on 702.2.b.** Call to Glory reads *"As you play this, you
may spend a buff as an additional cost. If you do, ignore this spell's cost."* Its free mode is a
**spend**, and 702.2.b — *"Spending a Buff removes a single Buff counter from a Unit"* — is precisely
what switches both statics off. The rule's anchor turns its own partners off in the mode that makes
it worth playing; paid at full price it is an ordinary +3 Might spell and no pairing at all. Recorded
rather than built.

(702.3's one-buff cap is stated in the entry **with its one printed exception attached**, per the
project's standing rule: `OGN-078` Lee Sin, Ascetic prints *"I can have any number of buffs"* and
rule 002 makes card text beat rules text. He is Calm, so he is outside this identity.)

---

## 13. `shadow-watcher-temporary-death-window` (UNL-048) — a condition ordinary play cannot meet

`UNL-037` Shadow Watcher (Calm, E4 + 1 Power, M5, in zero entries): *"If a friendly unit died during
your Beginning Phase this turn, I enter ready."*

**Nothing in ordinary play meets that.** 315.1 Awaken and 315.2 Beginning Phase both precede 316's
Main Phase, so no card you cast that turn can cause it, and combat is a Main Phase event. The only
repeatable cause in the pool is a `[Temporary]` body, whose 816.1.b is *"functionally short for 'At
the start of this permanent's controller's Beginning Phase, **before scoring**, kill this'"* — exactly
that window. `UNL-048` Trevor Snoozebottom makes a fresh one on every Hold, so the death is a
**schedule** rather than a coincidence.

What it buys is precisely one thing, and the entry says so: 143.4.a lets 143.4's default be altered,
but *"enters ready"* is not a ready (415.1, and #56's sweep), so the payoff is that a M5 body can pay
144.2's exhaust for a Standard Move **on the turn it is cast** and Conquer an open battlefield the
same Main Phase. Entry: `trevor-shadow-watcher-scheduled-death-ready`, mono-Calm.

---

## 14. `sky-splitter-might-discount` (OGN-014) — no entry; the arithmetic is already catalogued

*"This spell's Energy cost is reduced by the highest Might among units you control."* All ten partners
do the same thing — present a big number — and `sky-splitter-volibear-free-removal` already prices the
family exactly, down to the floor: 356.6 (*"Energy and Power costs can't be reduced below 0"*) takes
the Energy to nothing on any board with a 8+ Might body, and the 1 Fury Power is all that is left to
pay. `OGN-082` Whiteflame Protector (+8 Might this turn), `UNL-027` Inviolus Vox (M8) and `VEN-043`
Steel Paws (M0 with an [Empower] to M7) reach the same zero by different routes. Same arithmetic on a
slightly different card is a note, not an entry.

## 15. `windswept-hillock-move-triggers` (OGN-297) — still narrowed, and no partner changes it

Re-checked against all 28 partners. The #153 narrowing stands on 810.1.c.3 — *"It does not give
additional abilities or activations of Movement, only new options for the Standard Move"* — and none
of the 28 supplies a second move; they are all *"when I move"* payoffs, and 144.2's exhaust still
allows one Standard Move a turn. In a Duel (485.4) the grant is worth exactly one alternative
destination per unit standing there, and 485.5 does not guarantee the Hillock is even on the table.
`sett-first-mate-windswept-hillock` already banks that, off a ready rather than off the Hillock.

---


## 16. The under-walked PROVEN rules — one filter decides all three

All nineteen orphan rules in scope are now dispositioned (sections 1–15). This section turns to the
rules that already had entries but whose partner lists were barely read, and the three walked here
turn out to share **one filter**, which is worth stating once:

> **A readier or a copier is worth a second full activation only where the effect has a HARD CAP per
> use.** The `jayce-readies-exhaust-abilities` rule already encodes it in its own `excludes` —
> `SFD-117` Ancient Henge and `SFD-083` Hextech Anomaly both print *"Pay any amount"*, so a second
> activation is worth exactly zero. This is the project's standing "a multiplier is worth nothing on
> an effect with no per-execution cap" seen from the partner-selection side: it is not a refusal
> criterion, it is the **selection** criterion.

### 16.1 `jayce-readies-exhaust-abilities` (VEN-068) — 76 partners, 74 uncovered

`VEN-068`: *"When you play me or the first time you play a non-token gear each turn, you may ready
something besides me that's exhausted."* Note **"something"**, not "a unit" — it reaches gear.

Partner chosen by the filter: `VEN-060` Sky Cruiser (Mind, in zero entries), *"Discard a gear, 1
Energy, exhaust: **Deal 4** to a unit at a battlefield."* Fixed per use, so the second activation is a
second full 4. **8 damage a turn for 2 Energy.**

Two orderings the entry pins down: 415.1.b (*"A Unit that is already Ready cannot be Readied again"*)
forces **activate → play gear → activate**, and *"the first time you play a non-token gear each
turn"* is an ordinal (383.1.b, 383.3.e.1), so the enabler is chosen on **price**, not power —
`OGN-120` Seal of Insight at 0 Energy plus a Mind rune, which refunds that rune the moment it lands.

Entry: `jayce-sky-cruiser-double-strike`.

### 16.2 `svellsongur-copy` (SFD-059) — 33 entries already, 73 of 102 partners uncovered

Read the high uncovered count as a **warning flag**, per the #161 lesson. The question is not which
partner is unwalked but which one is changed by being multiplied eight times (477.2.c, 476.1, 479.1,
480.3 give 2^v instances).

`UNL-051` Ivern, Nurturer: *"When you play me or when I hold, look at the top 3 cards of your Main
Deck. **You may** reveal a unit from among them and draw it. Recycle the rest. Then if you revealed a
Bird, Cat, Dog, or Poro, do this: [Buff] a friendly unit."* Two clauses survive multiplication where
its Calm neighbours do not:

- **The draw is optional.** 431.1.a burns you out on drawing past the deck; 431.1.c says looking or
  revealing past it *"does not Burn Out"*. Eight instances of *"you may … draw it"* are eight
  declinable draws. Eight of `UNL-060` Vilemaw or `VEN-042` Shen, Scourge of Shadows (*"draw 1"*, no
  may) are a forced Burn Out — the same defect `svellsongur-corrupt-enforcer-trash-fill` documents.
- **The buff names "a friendly unit", not a fixed one.** 702.3.a stops a second counter on the SAME
  body, so eight instances place up to eight buffs on eight DIFFERENT bodies. Every "a multiplier is
  a no-op on a fixed target" case in the project's ledger — Enthusiastic Promoter, Sett Brawler —
  turns on the buffer naming one body.

And *"Recycle the rest"* puts what you did not take on the bottom (416.1.a), so 24 cards looked at
per Hold refills the deck instead of draining it.

**Refused in the same list: `UNL-052` Nami, Headstrong** — *"When I hold, the next time you play a
unit this turn, ready it and [Buff] it."* Eight delayed triggers all watch **one** event; 415.1.c
(*"If a Unit is instructed to be Readied while it is already Ready, nothing additional happens"*) and
702.3.a make seven of the eight do nothing at all. A per-event delayed trigger is the one shape
Svellsongur cannot multiply.

Entry: `svellsongur-ivern-nurturer-optional-draw`, mono-Calm.

### 16.3 `veiled-temple-readies-gear` (SFD-221) — 34 partners, 32 uncovered

**The limit comes first, because this pairing invites the mistake.** 466.5: *"the player with Units
remaining here Establishes Control **if they didn't already control this Battlefield**"*, and 348.2.a
carries the identical clause for a Showdown. So the Temple pays **per change of hands, never per
turn** — holding it is worth nothing.

Same filter, same answer: `SFD-078` Temporal Portal, *"1 rainbow, exhaust: Give **the next spell** you
play this turn [Repeat] equal to its cost"* — exactly one spell per activation. And the doubled spell
pays in two currencies, because 820.1.c.1 makes the [Repeat] cost *"an Additional Cost to be paid
during the steps of playing the spell"*, i.e. **spent**: every *"if you spent N or more"* clause reads
it and every *"costs N or more"* clause ignores it (206's Defy example).

Entry: `veiled-temple-temporal-portal-second-repeat`.

---


## 17. Three more proven rules, and a shape worth naming: **two drawbacks that cancel**

### 17.1 `curator-of-the-sands-printed-cost` (VEN-145) — 54 partners, 53 uncovered

206 makes a cost-threshold trigger read the **printed** cost, so the best partner is the card whose
printed and paid costs are furthest apart. In the legend's own two domains that is `SFD-055`
Needlessly Large Yordle (Calm, in zero entries): printed **E10 + 3 Calm Power**, and *"I cost 2 Energy
+ 1 Calm rune less for each point you scored from holding this turn"* takes it to **E6 + 1 Calm
Power** at the Duel ceiling of two Holds (470 with 485.4). The Curator still reads 10 and still fires.

206.1's *"unless otherwise specified"* does not reach it: the specification that exists is Empower's
(827.1.c.3), and this is an ordinary discount. Same line the project drew in #47 to kill the
"Empower discounted to 0" family — this is the family on the other side of it.

**The rebate is ENERGY, not Power**, and that is worth pinning: 164.2.a makes Energy the rune's
*exhaust* ability, while 164.2.b (recycle for Power) carries no exhaust, so an already-exhausted rune
pays Power anyway. Readying 2 runes is 2 Energy and does nothing to the free Power floor of #44.

Net: **4 Energy and 1 Calm Power for a body that defends at 10** (814.1.b, 814.2 for [Shield 5]) and
that 815.1.c.2 forces the attacker to kill before it may assign damage to anything else of yours.
The same clause makes him **anti-synergic with any 1-Might-token line**, because a sweeper assigns no
damage at all and [Tank] never sees it. Entry: `curator-needlessly-large-yordle-printed-ten`.

### 17.2 `shadow-temple-trash-fuel` (VEN-165) — 49 partners, 49 uncovered

**A shape the catalogue has not named before: two cards whose drawbacks cancel exactly.**

- Alone, `OGN-109` Dr. Mundo, Expert eats his own stat line: *"My Might is increased by the number of
  cards in your trash"* and *"At the start of your Beginning Phase, recycle 3 from your trash"* —
  mandatory, no *may* — so he shrinks by 3 a turn.
- Alone, the Shadow Temple is a fuse: `[Burn 3]` every Hold, and 431.1.b makes burning past the deck a
  Burn Out, which 431.2.b punishes by *"Recycl[ing] their trash into their Main Deck"* — every trash
  payoff in the deck reset in one event. `shadow-temple-sentinel-burn` prices it as *"a four-turn
  fuse"* for exactly this reason.

Together: 3 out of the trash and into the deck, then 3 out of the deck and into the trash, every turn,
**net zero on both zones**. Mundo is the only partner in the rule's whole list that puts cards BACK.

The phase order was checked, not assumed: 315.2.a.1 (*"At the start of Beginning Phase game effects
take place"*) precedes 315.2.b.2's Hold, so the recycle runs **first** and the Burn refills behind it
— the deck is never allowed to run down while a card is waiting to go back in.

Entry: `shadow-temple-dr-mundo-balanced-trash`, mono-Mind.

### 17.3 `dauntless-vanguard-occupied-battlefield-assault` (SFD-093) — the anchor-partner entry

Batch 1 back-linked this rule's **mechanism** (a PLAYED unit takes the Attacker designation:
190.3.a.1 + 464.2.c.1) to `stare-down-arachnoid-horror-lone-survivor`. This is the pairing itself.

`VEN-076` Repair Specialist (Body, E3 M3, in zero entries): *"I have [Assault] equal to the number of
gear you control."* 807.1.b formats the keyword as *"Assault [X]"* with X *"referenced in the
functional text"*, and every other carrier in the pool fills that X with a **constant** — this is the
only one whose value is a quantity you build. 807.2 sums it with any other source.

**And the gear never has to be attached.** The clause counts gear you CONTROL; 818.1 makes [Equip] a
separate Activated Ability with its own cost, which nothing here pays. Three `SFD-108` Warmog's Armor
at 1 Energy each, left sitting unattached, are three points of [Assault]. 323.7's Cleanup recalls
unattached gear at battlefields to the base — it changes where they are, not who controls them.

The limit the entry is written around: the Vanguard's permission is *"You may play **me**"*, so the
partner still walks (144.4.a), and 807.1.d.1 (*"Assault remains in effect as long as the Unit
maintains the Attacker designation"*) means the whole package is worth nothing on defence.

Entry: `dauntless-vanguard-repair-specialist-gear-assault`, mono-Body.

---


## 18. `magma-wurm-mass-ready` (OGN-011) and `soul-shepherd-token-buff` (UNL-077) — one token engine, two anchors, and 103.1.b makes them exclusive

Both rules read the same partner list — cards that play unit tokens — and both were nearly unwalked
(49 of 50 and 49 of 50 uncovered). Walking them together produced the clearest fork in this document.

The engine, in two cards that were both in **zero** entries: `VEN-109` Illaoi, Prophet of the Great
Kraken (Chaos, E6 M4) — *"When you play me or when I score, play a 1 Might Tentacle unit token …
I have +1 Might for each token unit you control"* — and `VEN-100` Up from the Deep (Chaos, E3) —
*"Play two 1 Might Tentacle unit tokens … [Flow] 3 Energy"*, so three copies are **six castings and
twelve Tentacles** before 829.1.b.1's banish closes each one.

A token swarm has exactly two problems, and each anchor solves one:

| problem | rule | anchor | why it works |
|---|---|---|---|
| the bodies **cannot move** the turn they are minted (#48's bottleneck) | `magma-wurm-mass-ready` | `OGN-011` Magma Wurm (Fury) | 143.4 makes units enter exhausted and 143.4.a allows the alteration; *"Other friendly units enter ready"* is it, and 144.3 walks the whole batch in as one game action |
| the bodies **die to one point of damage** | `soul-shepherd-token-buff` | `UNL-077` Soul Shepherd (Mind) | 143.2.a kills on damage *"equalling or exceeding its Might"*, and `OGN-133` Flurry of Blades (Body, E1, *"Deal 1 to all units at battlefields"*) kills every 1-Might token for ANY number of them; a 2 is out of range |

**And you cannot have both.** Soul Shepherd is Mind, Magma Wurm is Fury, and 103.1.b caps a deck at
the legend's two domains — Mind + Chaos + Fury is one too many. The two entries are written as twins
and cross-reference each other: `magma-wurm-illaoi-ready-tentacles` (Fury/Chaos) buys the walk,
`soul-shepherd-illaoi-tentacle-wall` (Mind/Chaos) buys the survival, and each states the cost of the
half it did not take.

Two smaller facts the entries pin down:

- *"Enters ready"* is **not** a ready (415.1 marks an object already on the board), so what Magma Wurm
  buys is precisely that 144.2's exhaust can be paid at all on the turn the body appears — and it is
  worth **nothing** on the opponent's turn, where 144.1.b forbids the Standard Move and combat does
  not read exhaustion (464.2.c.3, 465.2.b).
- Soul Shepherd's +1 is a **continuous modifier, not a 702 Buff counter**, so 702.3's one-per-unit cap
  never applies, it stacks on top of a real buff, and no buff-spender can take it away. It also does
  **not** change Illaoi's own number, which counts BODIES — but 185.1 / 185.2.b make each token a full
  unit with a Might, so the summed Might 465.2.c assigns goes from 14 to 19 on a five-Tentacle board.

Magma Wurm's static reads *"OTHER friendly units"*, so she never readies herself.

---


## 19. Two more proven rules, both of which the entry has to lead with the LIMIT

### 19.1 `dark-child-off-turn-reactions` (OGS-017) — 62 partners, 61 uncovered

415.3.a is the premise: *"A player Readies all non-spell Game Objects they Control during the
Awakening Phase **on their turn**."* A rune exhausted on your own turn is dead for the whole of the
opponent's, and 167 empties the **pool** rather than the runes, so nothing carries over either. Dark
Child's *"At the end of your turn, ready up to 2 runes"* is the only fix in Fury/Chaos.

`dark-child-abandon-guaranteed-counter` already banks the exact-fit case. What this entry adds is the
case where the deck brings **more** than the legend gives: `SFD-136` Hard Bargain (Chaos, E2,
[Reaction], **[Repeat] 2 Energy**, *"Counter a spell unless its controller pays 2 Energy"*, in zero
entries) is the only card in the rule's Fury/Chaos partner list that can spend a third and fourth
point of off-turn Energy. Two executions against one spell mean the controller keeps it only by
paying **four**, on a turn their pool is already committed.

The entry says what a soft counter actually is rather than overstating it: against a rich opponent it
is a **tax**, converting your 2 Energy into their 2 at Reaction speed. And "ready **up to 2**" is a
hard ceiling — every Power you paid on your own turn is a rune 161.2.b already sent back to the Rune
Deck and therefore unreadyable. Entry: `dark-child-hard-bargain-repeat-tax`.

### 19.2 `black-market-broker-hidden-family` (SFD-121) — 39 partners, 36 uncovered

`VEN-097` Spiderling prints *"Your deck can have any number of cards named Spiderling"*, and rule 002
makes card text beat 103.2.b — so the engine's SIZE is a deckbuilding choice. That invites exactly one
wrong assumption, so the entry leads with the clause that kills it:

> **811.1.b.** *…you may pay [rainbow] to hide this facedown at a battlefield you control **that
> doesn't already have a facedown card hidden there** for as long as you control that battlefield.
> Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base cost.*

**One facedown per battlefield at a time.** Any number in the deck is still one hide per controlled
battlefield per turn, played a turn later.

What survives that is a clean piece of cost accounting nobody had written down: hiding costs one
rainbow, playing from Hidden costs **zero** Energy, and the Broker mints a Gold — which 187.5 makes
worth exactly one rainbow. **The hide pays for itself and the body is free.** Five Spiderlings at one
battlefield are M5 each (*"+1 Might for each other unit you control here with my name"*), and at two
they are already out of `OGN-133` Flurry of Blades range (143.2.a) with no Soul Shepherd and no Brush.

The Gold is next turn's Power, not this turn's (187.5's ability costs its own exhaust; 315.1.b), and
the fix — `SFD-171` Renata Glasc, Industrialist — is Order, which a mono-Chaos shell can only reach
under VEN-155 / VEN-197 Heart of the Tempest. The entry is priced without her. Entry:
`black-market-broker-spiderling-hidden-gold`.

---

## 20. Back-links for `data/synergies.json` (`rule id -> entry id`)

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
shurelyas-requiem-ganking-second-move -> shurelya-gustwalker-hunt-bootstrap
chem-baroness-gold-ramp               -> chem-baroness-gold-banked-across-the-threshold
green-father-brush-four-tags          -> green-father-brush-ultrasoft-poro-birds
jae-medarda-chosen-by-spell           -> jae-medarda-repeat-double-choose
startipped-peak-rune-ramp             -> startipped-peak-rune-count-empower
peak-guardian-buffed-payoff           -> peak-guardian-bilgewater-bully-ganking-buff
shadow-watcher-temporary-death-window -> trevor-shadow-watcher-scheduled-death-ready
jayce-readies-exhaust-abilities       -> jayce-sky-cruiser-double-strike
svellsongur-copy                      -> svellsongur-ivern-nurturer-optional-draw
veiled-temple-readies-gear            -> veiled-temple-temporal-portal-second-repeat
curator-of-the-sands-printed-cost     -> curator-needlessly-large-yordle-printed-ten
shadow-temple-trash-fuel              -> shadow-temple-dr-mundo-balanced-trash
dauntless-vanguard-occupied-battlefield-assault
                                      -> dauntless-vanguard-repair-specialist-gear-assault
magma-wurm-mass-ready                 -> magma-wurm-illaoi-ready-tentacles
soul-shepherd-token-buff              -> soul-shepherd-illaoi-tentacle-wall
dark-child-off-turn-reactions         -> dark-child-hard-bargain-repeat-tax
black-market-broker-hidden-family     -> black-market-broker-spiderling-hidden-gold
```

Still with no entry after this pass, by decision:

```
wizened-elder-buffed-payoff    REFUSED  — its anchor (Call to Glory) SPENDS the buff in the mode
                                          worth playing, and 702.2.b removes the counter both its
                                          partners key on. See section 12.
sky-splitter-might-discount    NO ENTRY — all ten partners are the same arithmetic that
                                          sky-splitter-volibear-free-removal already prices. Section 14.
windswept-hillock-move-triggers NARROWED — 810.1.c.3; no partner supplies a second move. Section 15.
```

## 21. Reported to the manager, not fixed here

- `master-of-shadows-banish-rummage` carries a **false uniqueness claim in its own name** — see §3.
  Three cards print the Shadow Clone token and its attack-triggered banish; one of them is the entry's
  own `VEN-144 Death Mark ×3`.

---

## 22. Handoff — what is left of this slice, and the tooling to pick it up

Written at the 60% context handoff, 2026-09-07. **Every count below is as of that date**; parallel
walks move them within the hour, so re-measure before trusting any of them.

### 22.1 Done

- **All 19 orphan rules in scope are dispositioned**: 16 entries (sections 1–15) and 3 refusals with
  the killing paragraph quoted — `wizened-elder-buffed-payoff` on 702.2.b, `sky-splitter-might-discount`
  as arithmetic already priced by `sky-splitter-volibear-free-removal`, `windswept-hillock-move-triggers`
  on 810.1.c.3. One of them, `startipped-peak-rune-ramp`, was a **reversal** of a twice-recorded
  refusal (§11) and one, `green-father-brush-four-tags`, was a **deferral closed by the rules' own
  worked example** (§9).
- **10 proven rules opened** (sections 16–19): `jayce-readies-exhaust-abilities`, `svellsongur-copy`,
  `veiled-temple-readies-gear`, `curator-of-the-sands-printed-cost`, `shadow-temple-trash-fuel`,
  `dauntless-vanguard-occupied-battlefield-assault`, `magma-wurm-mass-ready`,
  `soul-shepherd-token-buff`, `dark-child-off-turn-reactions`, `black-market-broker-hidden-family`.
- **25 entries** staged across eight batches, all ENGINE. **20 cards that were in zero entries now
  carry one.**

### 22.2 Not done, in the order a successor should take them

The measurement that ranks them is `uncovered` — partners the anchor has never shared an entry with:

```
pit-crew-gear-ready            OGN-091  104 uncovered / 1 entry
simian-ancestor-buff-ready     SFD-047   98 / 1
mistfall-buff-ready            OGN-152   97 / 1
vanguard-helm-buff-supply      OGN-228   96 / 2
monastery-hirana-buff-supply   OGN-282   93 / 1
yordle-explorer-power-two      SFD-100   81 / 1
get-excited-expensive-discard  OGN-008   66 / 1
renata-industrialist-tokens    SFD-171   55 / 20
ivern-friend-to-all-four-tags  UNL-177   50 / 3
friendship / starhound / undying-loyalty / daisy / stalking-wolf four-tag rules  ~48 each / 1–2
trapping-grounds-excess-damage UNL-217   41 / 1
prize-of-progress-gear-activation SFD-075 38 / 2
```

**Read the top five as warning flags, not prizes.** Four of them (`simian-ancestor`, `mistfall`,
`vanguard-helm`, `monastery-hirana`) are buff-supply rules whose predicates match ~95 cards each; that
is the same bare-regex artefact #161 found on `UNL-074 Frigid Jewel` (100 "partners") and `SFD-075
Prize of Progress` (62). `pit-crew-gear-ready` at 104 is the same shape on gear. Before spending a
walk on any of them, print the list with `npm run synergies -- <id> -- --match` and read what the
predicate actually caught.

Two families are already saturated and should not be re-opened for finishers: the Ivern four-tag
BURSTs (`ivern-sentinel-hold`, `ivern-arena-sentinel-hold`, `ivern-svellsongur-four-tags-hold`) and
the Get Excited! 10-damage ceiling (`get-excited-flame-chompers-jinx` already prices it at Rhasa's
printed 10, and `UNL-147` Baron Nashor reaches the same 10).

### 22.3 The tooling

The coverage probe this walk used lives in `.scratch-rules/` in the shared tree (untracked, deleted at
handoff). It is three short files and worth rebuilding rather than guessing:

- **coverage** — for each rule, `partnersOf(rule, cards)` intersected with the `uses[]` of every entry
  that already contains the anchor, printed as
  `=== <id> anchor <code> <name> [domains] partners N uncovered M entriesWithAnchor K`.
- **validate** — merge the staging file into a COPY of `data/combos.json`, check for duplicate ids AND
  for a duplicate sorted card set (three walks independently found `UNL-087` + `VEN-138` on separate
  nights), then run `validateCombos(combos, features, cards)`. Note the signature: it takes
  **three** arguments and `features` comes from `loadCombos()`.
- **legend check** — the two checks of `test/legend-lines.test.ts` run against the staging file before
  reporting. It caught a defect in this walk's own batch 4 (a Fury/Order legend typed into a Body/Order
  line) before anything was staged. **Run it every batch.**

One trap in the probe itself, recorded because it produced a false claim in this document that had to
be corrected an hour later: **`Card.type` is a string ARRAY.** A probe written as `c.type === "legend"`
returns false for every card in the pool and reports zero. See the correction box in §1.5.

---

# PART TWO — the successor's slice (rc-walk-rules2), from 2026-09-07

Continues the same document. Issue #170 stays open; commits say `Refs #170`.

## 23. The measurement that reorders the whole remaining list

§22.2 ranked what is left by `uncovered` and warned that the top five are warning flags. They are
worse than that: **four of the top five share ONE predicate, and two thirds of what it matches is
not a buff at all.**

`simian-ancestor-buff-ready`, `mistfall-buff-ready`, `vanguard-helm-buff-supply` and
`monastery-hirana-buff-supply` all carry the same partner regex, copied from `fiora-buff-ready`:

```
\[Buff\]|[Bb]uff (a|all|another|me|up to|your)|[Gg]ive (me|it|a unit|a friendly unit|another friendly unit|your units)[^.]{0,60}\+\d+ :rb_might:
```

The third alternative is the problem. Split against the corpus, the 99 cards it matches are:

| | count |
|---|---|
| real 702 Buff sources (`[Buff]` or `buff a/all/another/me/up to/your`) | **33** |
| `give … +N :rb_might: this turn` and nothing else | **65** |
| not found | 1 |

CLAUDE.md already states the distinction and #102 settled it: *a "buff" is the 702 counter and
702.3 caps it at one per unit, while "+N Might this turn" is a plain modifier that 702.3 never
touches.* `SFD-047 Simian Ancestor` reads **"When you **buff** me, ready me"**, `OGN-152 Mistfall`
reads **"When you **buff** a friendly unit"**, `OGN-228 Vanguard Helm` **"When a **buffed** friendly
unit dies"**, `OGN-282 Monastery of Hirana` **"you may spend a **buff**"** — none of the four fires
off a Might modifier. So `UNL-149 Diana, No Longer Human`, `OGN-103 Ravenbloom Student`,
`VEN-071 Fretful Feline`, `OGN-143 Pirate's Haven`, `UNL-001 Arena Kingpin` and 60 others are false
positives on all four rules simultaneously.

The predicate is CORRECT where it was written — `fiora-buff-ready` keys on 709 becoming [Mighty],
which a "+N Might this turn" does cross. It was copied onto four rules that key on the word *buff*.

**Reported to the manager, not fixed here** (this session owns no `data/synergies.json`). The four
rules want the first two alternatives only; the excludes they already carry (`OGN-146 Wallop`,
`OGN-207 Call to Glory`, and for two of them `OGN-152` / `SFD-047`) stay.

The honest ranking, after that split, is that the buff vein is **33 partners wide, not 99** — and 10
of the 33 were in zero entries when this section was written (2026-09-07): `OGN-053 Stand United`,
`OGN-056 Adaptatron`, `OGN-063 Spirit's Refuge`, `OGN-147 Wildclaw Shaman`,
`OGN-217 Trifarian Gloryseeker`, `OGN-283 Navori Fighting Pit`, `SFD-091 Buhru Captain`,
`SFD-098 Sea Monkey`, `UNL-043 Enthusiastic Promoter`, `UNL-162 Enthralling Protector`.

## 24. `royal-entourage-readies-your-legend` (SFD-039) — an anchor in ZERO entries, and a claim it refutes

`SFD-039 Royal Entourage | Unit | Calm | E3 P1 M4 | When you play me, ready or exhaust a legend.`

The rule has 24 partners (every legend with an exhaust in an ability's cost) and its anchor was in
no entry at all. Three entries came out of it, and the finding that ties them together is a
correction to an entry written the same day.

### 24.1 The correction, and the half of it that does not hold

`eye-of-twilight-zephyr-sage-tank-redirect` (#171, 2026-09-07) states in its own notables:

> ONE GRANT PER TURN AND NO WAY TO DOUBLE IT. 815.2 makes multiple instances of Tank redundant, and
> the cost is the legend's own exhaust, which 315.1.b returns only at your next Awakening — so a
> second combat in the same turn goes ungranted.

The cost half is exactly right and the conclusion is not: **five cards in the pool ready a legend**
(CLAUDE.md's #56 census — SFD-039, SFD-210, OGN-162, VEN-068, and OGN-111 via Heimerdinger's copy),
so the exhaust does come back inside a turn.

But the correction only reaches **your own turn**, and that is the entry's real content. Royal
Entourage is a UNIT with no [Action] and no [Reaction]; 155 bars a spell without them from a
Showdown and **381** — *"All Activated Abilities can only be activated on the Controlling Player's
Turn and during an Open State"* — is the general form. So on the OPPONENT's turn it can never be
played, and 415.3.a had readied the legend at your Awakening anyway. The doubling therefore exists
only where both activations can be spent on one turn, i.e. when YOU attack. `eye-of-twilight-
zephyr-sage-tank-redirect` is a defensive entry, so on its own board its sentence stands.

`royal-entourage-eye-of-twilight-double-tank` is the attacking-side entry: two Zephyr Sages granted
[Tank], and 815.1.c.2 makes every other attacker of yours an invalid assignment until the defender
has put lethal on **both** — 6 + 6 = 12 summed Might, with 465.2.c.4 forbidding overpayment on
either. The Shield is deliberately not counted: 814.1.c reads *"While I am a defender"*, and here
they attack.

### 24.2 415.1.c forces the play order, on every entry in the vein

> 415.1.c. *"If a Unit is instructed to be Readied while it is already Ready, nothing additional
> happens."*

The legend has to be **exhausted first**. Playing Royal Entourage before spending the legend's
ability wastes the card entirely. (Its "ready **or exhaust**" is a genuine choice, so exhausting your
own legend is legal — and pointless here.)

### 24.3 `royal-entourage-grandmaster-warmogs-two-conquers` — the cap was always two

`SFD-193 Grandmaster at Arms` prints a FREE reattach: *":rb_exhaust:: Attach an attached Equipment
you control to a unit you control."* `jax-grandmaster-warmogs-buff` prices it as *"one reattachment
a turn, throttled by how often you conquer"*, leaving the throttle open. It is not open: **469.1**
defines a Conquer at a battlefield *"not yet Scored this turn"*, **470** caps Scoring once per
battlefield per turn and **485.4** puts two battlefields on a Duel table. So a turn holds at most
two Conquers, one Royal Entourage buys exactly the second reattach that a second Conquer can use,
and a **third** activation has nothing left to attend.

Two rules keep the shuttle honest: **434.1.g** (*"Attaching a card to its current Top-Most Card will
not have any effect"*) means the two Conquers must be attended by two different carriers, and
**702.3** is why a stationary Warmog's stops after one buff (702.3.a: a second Buff on a buffed unit
*"is not placed"*).

### 24.4 `royal-entourage-emperor-sands-two-sand-soldiers` — 187.3, and a claim narrowed

`SFD-197 / SFD-247 Emperor of the Sands` was also in zero entries. **187.3**: *"A 2 [M] Sand Soldier
token is a domainless unit token with 2 Might and the Shurima tag."*

The project's token discussion is written around 1-Might Recruits and Birds, and #159 concluded that
*"the binding constraint on every 1-Might Plaza line is Might PER BODY … and the only fix in the pool
is `UNL-077 Soul Shepherd`"* (Mind, which is what forces a Mind/Order shell). That stands as written.
What it does not cover is a faucet that never mints a 1-Might body: a Sand Soldier survives
`OGN-133 Flurry of Blades` (*"Deal 1 to all units at battlefields"*) with no repair at all, and the
Emperor is **Calm/Order**. A repair and a faucet that does not break are different objects.

Two supporting facts the entry states rather than assumes:

- **"you've played an Equipment this turn" is measured per TURN, not per activation**, so one
  Equipment play arms both the base activation and the Royal Entourage one.
- **[Weaponmaster] reaches the token by rule.** *"Sand Soldiers you play have [Weaponmaster]"* is a
  static; 350.2 makes a token something that is played and 185.2.a keeps it from being a card;
  383.2.c.1 has an ability active in a zone apply to an object entering that zone at the same time —
  the same route that puts *"your Mechs have [Vision]"* onto a Mech token (#117). And because
  [Weaponmaster] equips *"to me"*, only a carrier-INDEPENDENT Equipment can ride it:
  `SFD-153 Eye of the Herald`'s *"When I move, play a 1 :rb_might: Recruit unit token here"* works on
  any body, and its [Equip] is exactly one rune, which *"one rainbow less"* takes to 0 under **356.6**
  (*"Energy and Power costs can't be reduced below 0"*).

### 24.5 The rest of the vein is `notable` material, not entries

The other Calm-inclusive legends the rule pairs with all give the same delta — one extra activation —
without a second rule engaging, so they were **not** written as entries (the bar: same arithmetic on
a different card is a note). For the record, with the second activation priced:

| legend | ability | what the second activation is worth |
|---|---|---|
| `OGN-257 Blind Monk` (Calm/Body) | 1 Energy, exhaust: buff a friendly unit | a second 702 Buff counter, which 702.3 forces onto a **different** body |
| `UNL-189 Bashful Bloom` (Calm/Mind) | 4 Energy, exhaust: ready 3 Might Sprite with [Temporary], −1 Energy per friendly [Temporary] | a second Sprite at 3 Energy, because the first is already on the board — but `leblanc-bashful-bloom-trevor-plaza` already ratchets that cost to zero, so the Entourage adds a body, not a discount |
| `SFD-189 Fire Below the Mountain` (Calm/Mind) | exhaust: [Reaction] [Add] rainbow, gear only | one more rainbow for gear; note 103.2.d.2 — `SFD-191 Rabadon's Deathcrown` is Ornn's Signature and forces this legend, never the reverse |
| `VEN-139 Rogue Assassin` (Fury/Calm) | [Action] exhaust: move a friendly unit in a showdown to base, ready it if [Empowered] | a second evacuation inside one showdown |
| `OGN-259 Unforgiven` (Calm/Chaos) | 2 Energy, exhaust: move a friendly unit to or from its base | a second effect move — 420.3.a puts the exhaust cost only on the STANDARD move, so this moves an exhausted body |

### 24.6 A refusal recorded: the "ready or **exhaust**" half is dead letter against an opponent

Royal Entourage's other mode is *exhaust* a legend, and "a legend" carries no friendly qualifier, so
it reaches the opponent's. It buys nothing. **381**: an Activated Ability *"can only be activated on
the Controlling Player's Turn"* — so on your turn the opponent could not have used their legend's
activated ability anyway, and by their Awakening 415.3.a has readied it. The only thing exhausting an
opposing legend could deny is a TRIGGERED ability whose cost is that legend's exhaust (383.3.b makes
such a cost the trigger's base cost, paid to finalize) — a genuinely narrow set, and none of the 24
partners of this rule is in it, because the rule's predicate is built on activated abilities.

## 25. Two buff-family entries that do not need Royal Entourage

Both come out of the 33-card real-buff list of §23, and both anchors were in zero entries.

### 25.1 `peak-guardian-spirits-refuge-mass-deflect` — the Buff counter read as a keyword

`OGN-063 Spirit's Refuge` (Calm gear, E2 P1) prints *"Friendly buffed units have [Deflect] if they
didn't already."* That is a static reading the 702 counter, so `OGN-223 Peak Guardian`'s single mass
buff becomes a standing tax on the whole garrison. **702.3** is why a mass buffer is the right
partner and a repeatable single-target one is not: one counter per body, so the currency is BODIES.

The tax is **per choice, not per spell** — 809.1.c: *"Spells and abilities an opponent controls that
target [me/this] cost an amount of Power equal to [Deflect Value] more to play as an additional cost
**for each time they choose** [me/this]"* — and 809.1.c.1 makes the Power any Domain. 809.1.d makes it
a Mandatory Additional Cost **on playing**, so the keyword has to be in place before the opponent
acts; granting it in response taxes nothing.

The hole is the word *choose*: 355.10.d (programmatic selection), 355.10.e and 355.10.f (the opponent
picks) all bypass it. `UNL-107 Stare Down` walks through; `OGN-234 Public Execution` pays. And combat
damage is **assigned** (465.2.c), never chosen, so [Deflect] is silent in the damage step.

### 25.2 `peak-guardian-stand-united-hidden-garrison-pump` — the pool's only buff AMPLIFIER

`OGN-053 Stand United` (Calm spell, E3, [Hidden], [Action]): *"Buff a friendly unit. Buffs give an
additional +1 :rb_might: to friendly units this turn."* **703** makes a Buff worth +1; this makes each
one worth +2 for the turn.

The reading is kept narrow on purpose. Because **702.3** allows a unit only one Buff at a time,
"buffs give an additional +1" and "each buffed body gets +1" are the same number on every legal board,
so the card can be priced without filing a reading. (`OGN-078 Lee Sin, Ascetic`, who prints *"I can
have any number of buffs"* and is the one exception to 702.3, is the single board where the two
readings would diverge — deliberately left out of the entry.)

Three facts the entry stands on:

- **Only the first sentence is confined.** 811.1.d.2 restricts the targets of a hidden spell's play
  effect to the battlefield it was hidden at, so *"Buff a friendly unit"* must pick there. The
  amplifier sentence chooses nothing and names no location, so it is unconfined — that is where the
  value sits.
- **The cost is paid a turn early and is then zero.** 811.1.b's tail: *"Beginning on the next turn,
  this gains [Reaction] and you may play this, ignoring its base cost"*, with 813.1.c.1 admitting it
  *"during Closed States on any player's turn"* — inside the opponent's attack, after 464.2.c.3 has
  designated the attackers.
- **The cap is the BOARD, not the deck.** 811.1.b hides *"at a battlefield you control that doesn't
  already have a facedown card hidden there"*, and 485.4 puts two battlefields on a Duel table, so at
  most two copies are ever live however many 103.2.b allows. `OGN-278 Bandle Tree` is the pool's only
  lift on that limit.

Anti-synergy stated in the entry: 702.2.b removes a counter when something SPENDS it, so a deck that
also runs Wallop, Call to Glory or Monastery of Hirana is subtracting from Stand United's own count.
A buff deck picks a side — the same fork #153 drew between carrying a buff and spending one.

## 26. Batch 1 — staged

Five entries, all ENGINE, in `/tmp/rc-walks/rc-walk-rules.json`. `validateCombos` clean over 509
entries; both checks of `test/legend-lines.test.ts` run against the staging file, 9 legend codes
checked, clean. Cards that were in **zero** entries before this batch: `SFD-039` Royal Entourage,
`SFD-197`/`SFD-247` Emperor of the Sands, `OGN-063` Spirit's Refuge, `OGN-053` Stand United.

## 27. Batch 2 — the buff vein walked from the 33-card list of §23

Four entries, all ENGINE, and every anchor was in **zero** entries: `OGN-147` Wildclaw Shaman,
`UNL-043` Enthusiastic Promoter, `UNL-162` Enthralling Protector, `OGN-056` Adaptatron.

### 27.1 `wildclaw-shaman-fae-dragon-buff-launder` — a net-zero buff ledger is the product

`OGN-147 Wildclaw Shaman | Unit | Body | E4 M3 | When you play me, you may spend a buff to buff me
and ready me.`

Three things in one sentence, and the interesting one is the third. **143.4**: *"Units enter the
Board exhausted"* — a body played to your base cannot pay 144.2's exhaust for a Standard Move until
315.1.b readies it next Awakening. Wildclaw Shaman readies himself as he lands, so he walks the same
turn. That is an [Accelerate] he does not print, bought with a Buff counter he immediately replaces.

The ledger: **702.2.b** removes one counter, the same sentence places one back on him, so the board
finishes with the same number of counters, one of them relocated. **702.3.a** is why relocation is
worth anything at all — Fae Dragon buffs up to four bodies on entry and can then never buff them
again, so a counter stuck on a body that has stopped caring is dead weight until something moves it.
`SFD-101 Fae Dragon`'s second sentence charges the spend a Gold on the way through, and
`SFD-171 Renata Glasc, Industrialist` is what makes that Gold live Power this turn rather than next
(187.5's ability has an exhaust in its cost; R25 = A).

Distinguished from the two existing Fae Dragon spend entries: `fae-dragon-wallop-industrialist`
spends with a SPELL that readies someone else and returns no counter;
`overt-operation-fae-dragon-industrialist` spends and refills every counter at once.

### 27.2 `enthusiastic-promoter-monastery-hirana-hold-refill` — a phase early is the whole difference

`monastery-hirana-warmogs-conquer-draw` (#171) is built around a difficulty:
**383.3.b** makes *"you may spend a buff to draw 1"* the trigger's BASE COST and **383.3.b.1** has it
*"paid in order to finalize the Triggered Ability to the Chain"*, so a buff produced by another
trigger of the **same Conquer** can never pay it, and Warmog's has to sit out the first Conquer.

`UNL-043 Enthusiastic Promoter` prints *"When I hold, [Buff] all units here"*, and 315.2.b.2 puts the
Hold in the **Beginning Phase** — a whole phase before the Main Phase in which any Conquer happens.
So the counter is already on the board when the Monastery's trigger is finalized, and the line pays
from the FIRST Conquer.

**Generalisation worth carrying:** a resource produced by another trigger of the same event can never
fund a 383.3.b base cost; a resource produced in an **earlier phase** always can. The catalogue has
recorded the negative half three times; this is the positive one.

Two checks the entry states rather than assumes: the Promoter buffs *"all units **here**"*, not "all
friendly units", and that is safe only because 315.2.b.2 Holds a battlefield you CONTROL — a
battlefield with opposing units present is Contested (190.3.a.1 / 323.6), not held, so no enemy body
is there at that instant. And **[Backline]** (*"I must be assigned combat damage last"*) is why a
Might-2 body survives to keep doing it: 465.2.c.3's forced-lethal ordering reaches him last.

### 27.3 `enthralling-protector-call-to-glory-xp-buff-spend` — the bound on an XP sink is 702.3, not the XP

`UNL-162 Enthralling Protector | Unit | Order | E2 M2 | [Hunt] ... Spend 2 XP: [Buff] me.`

The project's standing claim is that every XP sink in the pool is bounded and an XP faucet is never
an engine on its own. True — and for the two Hunt-and-buff bodies (`UNL-162`, `UNL-102 Crowd
Favorite`) the bound is nameable: they only ever buff **themselves**, so **702.3** allows exactly one
counter and 702.3.a refuses the second. The sink is worth 2 XP once, forever, unless something takes
the counter back off.

`OGN-207 Call to Glory` is the free spender: *"As you play this, you may spend a buff as an
additional cost. If you do, ignore this spell's cost."* — the spell becomes genuinely free, not
discounted, and 813.1.c.1 admits it *"during Closed States on any player's turn"*.

The rate is derived, not guessed: **315.2.b.2** Holds EVERY battlefield you control and **485.4** puts
two on a Duel table, so a board holding both banks 2 XP a turn from [Hunt] (823.1.c.1 / 823.1.c.2) —
exactly one buff a turn, exactly one free spell a turn, capped at three by 103.2.b. The unbounded
spender for the same counter is the Monastery, which needs a Conquer; it is named in a notable rather
than added to `uses[]`.

Collateral cost stated in the entry: **824.1.d** makes a `[Level N]` ability *"Inactive as soon as the
controlling player has less than [N] XP"* and **730.2** makes spending XP your own reduction, so every
2 XP spent here switches off any Level threshold the deck was sitting above.

### 27.4 `adaptatron-treasure-hoard-conquer-buff-faucet` — 205 is where a same-event resource DOES work

`OGN-056 Adaptatron | Unit | Calm | E4 M3 | When I conquer, you may kill a gear. If you do, buff me.`

This is the constructive mirror of §27.2. **205** — *"An instruction that requires a player to pay
resources or spend counters or XP that does not also have a linked Effect, is not a Cost"* — carries
the worked example *"When I attack, you may pay [4][C]. If you do, kill a unit here"*, and says the
payment is *"a game action being performed by a player"*, with *"the later instruction check[ing]
whether the game action was performed, not whether a cost was paid"*. So Adaptatron's kill happens at
**resolution**, and the gear only has to exist then.

`SFD-220 Treasure Hoard` fires on the same Conquer and plays a Gold. **383.3.d** lets the controller
choose the order the two triggers go on the Chain and **340.1** resolves the newest first, so placing
Adaptatron's FIRST and the Hoard's SECOND has the Gold on the board before Adaptatron looks for a
gear. Legal ordering, not a reading — the standing project rule about trying a different legal
ordering before filing anything.

Why the fodder is cheap: 187.5's Gold ability has an exhaust in its cost, so a Gold played
**exhausted** could not be cashed until your next Awakening anyway. The line spends a token that was
going to be idle and converts it into a permanent Buff counter now, for 1 Energy.

And the ceiling is stated: Adaptatron only ever buffs himself, so 702.3.a refuses the second counter —
this is one counter per SPEND, not per Conquer.

## 28. Batch 2 refusals — three, each with the paragraph that kills it

**`royal-entourage` + `simian-ancestor-buff-ready` — REFUSED on 702.3.** `SFD-047 Simian Ancestor`
reads *"When you buff me, ready me"*, so the obvious line is to double a buff source with Royal
Entourage and ready him twice. It does not work: **702.3** allows him one Buff at a time and
**702.3.a** says a second *"is not placed"* — no placement, no trigger. The second buff is wasted
unless the first was SPENT in between, at which point the spender is doing the work and the readier
is not. `simian-ancestor-arena-bar-wallop-ready` already walks that shape with the spender in
`uses[]`.

**`peak-guardian` + `vanguard-helm-buff-supply` — REFUSED, and it is ANTI-synergic.** `OGN-228
Vanguard Helm` reads *"When a buffed friendly unit dies, buff **another** friendly unit"*. Under
`OGN-223 Peak Guardian`'s mass buff every body in the garrison already carries a counter, so 702.3.a
does not place the Helm's replacement and the trigger is a no-op for as long as the garrison is
intact. The Helm wants a board where some bodies are buffed and others are not — which is exactly
why `vanguard-helm-kinkou-monk-buff-conservation` pairs it with `OGN-141 Kinkou Monk` (*"buff up to
TWO other friendly units"*) and not with a mass buffer. **A mass buffer and a buff-recovery card are
opposites.**

**A four-tag board needs four DISTINCT bodies — measured, not assumed.** `UNL-046 Friendship` pays
*"+1 :rb_might: this turn for each of the following tags among your units — Bird, Cat, Dog, and
Poro"*, and `UNL-177 Ivern, Friend to All` scores off holding all four. A sweep of `data/cards.json`
for cards carrying two or more of those four tags returns **zero** over the whole pool (61 cards
carry at least one). So there is no two-for-one body and no shortcut: the +4 and the four-tag Hold
both cost four separate cards. Recorded because it is the first thing anyone tries.

## 29. Batch 2 — staged

Four entries in `/tmp/rc-walks/rc-walk-rules.json`. `validateCombos` clean over 531 entries (batch 1
was merged by the manager between the two batches); `test/legend-lines.test.ts` checks run against the
staging file, clean. No duplicate id and no duplicate sorted card set.

## 30. Batch 3 — four rules outside the buff vein

### 30.1 `herald-of-scales-gemdragon-drakehound-net-positive` — a discount and a refund are different objects

**356.4.e** is normally cited to stop two discounts stacking below a floor. Read the other way it says
something constructive: a floor *"applies only to that discount"*, and a **refund is not a discount at
all**, so no floor can reach it.

- `OGN-140 Herald of Scales`: *"Your Dragons' Energy costs are reduced by 2, to a minimum of 1"* — a
  floored discount.
- `UNL-104 Gentle Gemdragon`: *"When you play me or another Dragon, ready up to 2 runes"* — a refund,
  because **164.2.a** gives a rune *"[E]: [Reaction] — Add [1]"*, i.e. 2 Energy back after the cost
  was paid.

On `SFD-006 Eager Drakehound` (Fury, E3 + 1 Fury Power, and in ZERO entries) that is 1 Energy paid
and 2 returned: **the body is Energy-positive**, and the only real cost is the Power. On every Dragon
printed at E4 or more the pair is a flat 4 Energy (Elder Dragon E12 → 8 net; Mountain Drake E9 → 5
net), because the floor never engages above E3. The Gemdragon refunds its own entry too, since its
trigger reads *"when you play **me** or another Dragon"*.

Bounded by **415.1.b** on the rune side — you cannot ready a rune that is already ready — and by
**167**, which empties the Rune Pool at the start of your next Main Phase, so the refunded Energy has
to be spent that turn.

Companion fact: Eager Drakehound is tagged **Dog, Dragon and Noxus**, so an E1 body fills the Dog slot
of the four-tag package (`UNL-046 Friendship`, `UNL-167 Starhound`, `UNL-168 Undying Loyalty`,
`UNL-177 Ivern, Friend to All`) as well as every Dragon rule — and §28 measured that no card in the
pool carries two of Bird/Cat/Dog/Poro, so the slot always costs a card.

### 30.2 `master-yi-unstoppable-gardens-level-ladder` — the pool's only `[Level 16]`

Swept over `data/corpus_flat.txt`: **6 × `[Level 3]`, 9 × `[Level 6]`, 4 × `[Level 11]`, 1 ×
`[Level 16]`**. The one is `UNL-059 Master Yi, Unstoppable` (Calm, E12 P3 M12), and it was in **zero**
entries.

His four rungs are a cost ladder, and the word **"instead"** is load-bearing: the 6 and 11 rungs
*replace* the previous reduction rather than adding to it. A reader who stacks them gets
12 − 2 − 4 − 6 = 0 and is wrong by six Energy. The true ladder is

| XP | cost |
|---|---|
| 0 | E12 + 3 Calm |
| 3 | E10 + 2 Calm |
| 6 | E8 + 1 Calm |
| 11 | **E6 + no Power**, for a Might 12 body |
| 16 | unchanged cost, plus *"I can't be chosen by enemy spells and abilities"* |

`UNL-213 Gardens of Becoming` (*"Units here have ':rb_exhaust:: Gain 1 XP.'"*) is the faucet, and its
price is stated rather than waved: **144.2** charges the Standard Move that same exhaust, so N XP a
turn costs the whole garrison's mobility that turn, and **381** keeps the granted ability to your own
turn in an Open State. It also **arms the opponent** — the text says *"Units here"*, not *"you"*, so
190.6.d never blanks it and an opposing garrison there climbs at the same rate.

And the deck must run **no XP sink at all**: 824.1.d makes the Dependent Ability *"Inactive as soon as
the controlling player has less than [N] XP"* and 730.2 defines spending XP as reducing your own
marked value, so one `Spend 2 XP` cost anywhere can knock a card in hand back a rung mid-turn. This is
the exact opposite deck from §27.3.

Two leads from the same balance, both in zero entries and both Body (which is why the Wuju Master
shell is natural): `UNL-091 Concentrate` falls from E5 to **E1** for *"Draw 2"* at `[Level 11]`, and
`UNL-098 Targonian Visionary` becomes Might 10 at the same threshold.

### 30.3 `gemcraft-seer-flurry-of-feathers-bird-dig` — 817.2.b inverts the obvious reading

> **817.2.b.** *"If the player does not recycle the top card and nothing else happens in between the
> triggers resolving, each instance of Vision will see the same card."*

No entry had cited it. Four Bird tokens entering under `OGN-100 Gemcraft Seer`'s *"Other friendly
units have [Vision]"* are **not** four free peeks at four different cards. 817.2.a lets you choose
separately for each instance, and 817.2.b guarantees that declining shows you the same card again — so
what four Visions actually buy is **a four-deep dig with a stop button**: bury the top card (416.1
sends it to the bottom), look at the next, stop the moment you like it.

That is better than it sounds, because **431.1.c** makes it free of Burn Out — *"looks at or Reveals
as many as possible, but does not Burn Out"*, extended by 431.1.c.1 to the zone change that follows.
A dig that costs no card and cannot burn you out is the one card-selection effect that is safe inside
an empty-deck shell, where every draw is 431.1.a.

The static reaches the tokens by rule: 185.2.b makes a token unit a unit, 383.2.c.1 has an ability
active in a zone apply to an object entering it at the same time, and 817.1.c's trigger is *"the
permanent entering the Board"* rather than "when played" — so no argument about 350.2 is needed.
`UNL-044 Flurry of Feathers` is the only card in the pool that puts four unit tokens down at
[Reaction] speed, which is what makes this an instant-speed dig on either player's turn.

### 30.4 `solari-chief-nami-headstrong-stun-into-kill` — the window is one Main Phase

`OGN-225 Solari Chief`'s kill reads **no Might threshold at all**, which is what separates it from the
22 Might gates in the pool: a stunned body dies at Might 12 exactly as at Might 1. The constraint is
timing.

- **423.1.a.2**: *"Stunned Units lose the Stunned status during step 3d of the end of turn cleanup."*
  So the stun and the Chief must be cast in the **same** Main Phase; a stun applied on turn N is gone
  before your turn N+1, and one applied on the opponent's turn is gone before you ever act.
- **423.1.a.1**: *"A Stunned Unit can not be Stunned again."* So a second stun effect on the same body
  is wasted — one cheap enabler per Chief, no more.
- **423.1.b / 423.1.c** are why the enabler is not removal on its own: the stun only removes the
  body's contribution to combat damage, and killing it by damage still costs its **full current
  Might**.

Both halves are unit plays with no [Action] and no [Reaction], so 381 and 155 keep the whole line in
your own Main Phase — it can never be held up as an answer inside the opponent's combat.
`UNL-052 Nami, Headstrong` is the cheap enabler (one Calm Power on top of a body you wanted anyway),
and her second sentence is the one printed exception to the "a Hold-triggered ready is a no-op" rule:
it arms a DELAYED effect that resolves in the Main Phase (316) rather than inside 315.2.

## 31. Batch 3 refusals — the Pit Crew list is mostly dead, and here is the rule that kills it

`pit-crew-gear-ready` (`OGN-091 Pit Crew`, Mind, *"When you play a gear, ready me"*) is the
highest-`uncovered` rule in the file at 104 partners, and the predicate is `any gear` — a POPULATION,
not a pairing. Reading it end to end, the honest filter is one sentence: **Pit Crew only cares about a
gear played in YOUR Main Phase, after he has already exhausted.** Two named families fall to it:

- **`SFD-086 World Atlas` — REFUSED.** *"When I hold, play two Gold gear tokens exhausted."* The Hold
  fires at 315.2.b.2, and 315.1.b readied Pit Crew a whole phase earlier at 315.1; 415.1.c then says
  *"If a Unit is instructed to be Readied while it is already Ready, nothing additional happens."*
  Both gear plays are worth zero. This is the standing Awaken-order no-op reaching a *"when you play a
  gear"* trigger rather than a buff trigger.
- **`SFD-063 Chemtech Cask` — REFUSED.** *"When you play a spell on an opponent's turn, you may exhaust
  me to play a Gold gear token exhausted."* The ready lands on the OPPONENT's turn, where 144.1.b
  forbids the Standard Move, and 415.3.a readies Pit Crew again at your own Awakening regardless —
  refuse-bucket E, a ready that buys nothing.

What survives is a gear played in your own Main Phase, which includes a **Gold gear token**, since
350.2 makes a token something that is played and 187.5 defines the Gold as a gear token — so a
Main-Phase Gold source (a Conquer trigger such as `SFD-069 Plundering Poro`, or `SFD-220 Treasure
Hoard`) is fuel that 103.2.b does not cap the way it caps three copies of a 1-Energy gear. That is a
`notable` on `pit-crew-eye-herald-recruit-shuttle`, not a second entry: the payoff is the same Eye of
the Herald Recruit, only the fuel changes.

## 32. Batch 3 — staged

Four entries in `/tmp/rc-walks/rc-walk-rules.json`. `validateCombos` clean over 538 entries;
`test/legend-lines.test.ts` checks run against the staging file, 13 legend codes, clean.
Cards in **zero** entries before this batch: `SFD-006` Eager Drakehound, `UNL-059` Master Yi,
Unstoppable.

## 33. Batch 4 — four more rules, and a uniqueness claim narrowed

### 33.1 `ava-achiever-mischievous-marai-attacking-reinforcement` — the second route into refuse-bucket C

`fresh-beans-rengar-pouncing-attacking-reinforcement` (written this week) says `SFD-025 Rengar,
Pouncing` is *"the only card that may be played to a battlefield you are attacking"*. That is true of
a card's **own text** and it is not the whole picture.

**355.2.b**: *"Some Game Effects may grant players permission to play Units to locations that are not
normally Valid. Such locations become Valid for the purposes of Playing the Unit."*

`OGN-107 Ava Achiever` (*"When I attack, you may pay :rb_rune_mind: to play a card with [Hidden] from
your hand, ignoring its cost. **If it's a unit, play it here.**"*) is exactly such an effect, and it
places a **different** card. 359.3.f.2 reads *"here"* at execution, and at that instant she is
standing at the enemy battlefield she moved to. **Rengar walks himself in; Ava throws someone else
in.**

And the body is in that combat — **464.2.c.3.a**: *"If a Unit controlled by the Attacker or Defender
becomes present at this Battlefield after this moment, it will gain the Attacker or Defender
designation during the Cleanup phase following the action that caused it to become present"*, with
323.2.a doing the assignment.

The payload matters less than the route, but `UNL-003 Mischievous Marai` is the clean one: its own
play effect is already written *"deal 2 to an enemy unit **here**"*, so nothing about 811.1.d.2 has to
be argued. Two damage lands before the damage step, so a 2 Might defender is out of 465.2.c's sum
before it is computed.

**811.1.c.1 cuts both ways here.** *"Hide is not a subset of Play."* Ava plays FROM HAND, so (a)
811.1.d.2's confinement never engages, and (b) `UNL-023 Katarina, Reckless`, `OGN-167 Ember Monk` and
`SFD-121 Black Market Broker` — all of which read *"when you play a card from face down"* — never see
it. Do not price an Ava deck as if it also fed that package.

### 33.2 `thousand-tailed-watcher-portal-rescue-double-shrink` — and 356.1.b.3 on a free play

`tryndamere-thousand-tailed-watcher-shrink` prices `OGN-116` at *"one card spent per turn"*.
`OGN-102 Portal Rescue` (Mind, E3 P1, **[Action]**) is *"Banish a friendly unit, then its owner plays
it to their base, ignoring its cost"* — a second board-wide −3 in the same turn, at combat speed.

Priced honestly against **477.3.b**, which caps the REDUCTION and not the result: *"−3, to a minimum
of 1"* sends each body from M to max(1, M − 3), so two applications are 8 → 5 → 2 but only 4 → 1 → 1.
The pair is worth a full 6 **only against bodies of Might 7 or more**.

The fact most readers will miss is **356.1.b.3**, whose worked example says an optional additional
cost survives a free play: *"They ignore Legion Rearguard's Base Cost of 2 Energy, but the optional
additional cost of 1 Energy and 1 Fury Power is added to its Total Cost and must be paid."* So the
re-played Watcher can still buy its own **[Accelerate]** rider and enter ready, which 143.4 would
otherwise forbid. That generalises to every *"ignoring its cost"* effect in the pool.

The cost the pairing hides, and which the entry states: Portal Rescue plays him *"to their base"*, so
if he was standing in the combat he is **removed from it** and his 7 Might leaves your sum.

### 33.3 `rumble-scrapper-hotheaded-mech-stack` — two statics on one token, and the fuel that is not there

`SFD-089 Rumble, Scrapper` (Mind) and `SFD-026 Rumble, Hotheaded` (Fury) had never been walked
together; the census gives exactly one Fury/Mind legend, `OGN-247 Daughter of the Void`.

**187.4** gives the token its tag by rule (*"A 3 [M] Mech token is a domainless unit token with 3
Might and the Mech tag"*), so both statics reach it with no extra text: 3 printed, +1 from the
Scrapper's continuous modifier (which 702.3 never caps, because it is not a Buff counter), +1 from
[Assault] while attacking (807.1.b, and 807.2 sums a second granted instance) = **five attacking
Might per free body**.

**The trap the pairing invites is refuted twice.** Hotheaded's recursion says *"recycle another
friendly unit"* and *"play a Mech from your trash"* — and a Mech TOKEN can do neither: **185**
(*"Tokens are not cards"*) with 416.1 and 416.3 stops it being recycled as a cost, and **186.1**
stops it ever remaining in the trash to be replayed. Both halves need real cards.

The two triggers also sit in different phases — the Scrapper's is a Hold (315.2.b.2) and Hotheaded's
a Conquer (Main Phase) — so they do not compete, and 470 with 485.4 caps the Conquers at two.

### 33.4 `pack-of-wonders-rippers-bay-permanent-channel` — three a game against one a turn forever

`rippers-bay-retreat-double-channel` is honest about its ceiling: `OGN-104 Retreat` is a spell,
*"three casts a game (103.2.b)"*. `OGN-181 Pack of Wonders` (Chaos gear, E2, *":rb_exhaust:: Return
another friendly gear, unit, or facedown card to its owner's hand"*) does the same job for an
**exhaust**, and **415.3.a** — *"A player Readies all non-spell Game Objects they Control during the
Awakening Phase on their turn"* — hands it back every turn. It is also cheaper: the bounce is free,
so the whole transaction is the Bay's 1 Energy.

Stated as a **refill and not a ramp**: 161.2.a fixes the Rune Deck at *"Exactly 12 Rune cards"*, 430.3
channels *"as many as possible"*, and 315.3.b already gives two free a turn — so the extra channel
returns what 164.2.b's Power recycles put back (161.2.b sends a recycled rune to the Rune Deck). What
it buys is a rune you CONTROL, which is the currency §11's Startipped Peak partners are priced in.

Two clauses worth carrying: the rune arrives **exhausted**, so 164.2.a's Energy is unavailable this
turn while 164.2.b's Power is not; and the Bay says *"**that player** may pay 1 Energy"*, never *"you"*
— so 190.6.d cannot blank it (it is live from turn one with no Control) and it pays the **opponent**
for their own bounces too.

Last, a vocabulary check the entry makes explicitly: a bounce to HAND is **not** a Recall. 455 defines
a Recall as relocation *"from anywhere to its Base"*, so nothing here is protected by 456.3 and no
movement-lock claim is made.

## 34. Batch 4 — staged

Four entries in `/tmp/rc-walks/rc-walk-rules.json`. `validateCombos` clean over 542 entries;
`test/legend-lines.test.ts` checks run against the staging file, clean. Two citations were corrected
before staging: 442.1 is **Disempowering**, not Banishment (108.6.b / 108.6.c are the right
paragraphs), and 465.2.c.4's sentence was quoted to its end (*"...unless no further units remain to
have damage assigned to them"*).

## 35. Batch 5 — a DEFECT in a merged entry, and the paragraph that causes it

### 35.1 `[Equip]` is a one-way door: 718.2 + 721.2 + 818.1.a

Three paragraphs, none of which the catalogue had put together:

> **718.2.** *"While in this state [Attached], the card's printed Rules Text is Inactive."*
> **718.3.** *"While in this state, Abilities in the card's Effect Text are appended to the Rules Text
> of the Top-Most Card."*
> **721.2.** *"Inactive Abilities do not trigger, do not apply, and cannot be activated. Inactive
> instructions are not processed."*
> **818.1.a.** *"Equip is present on Gear with the tag Equipment."*

An Equipment card is printed as `[Equip] <cost> (reminder) [Effect] <effect text>`. The `[Effect]`
marker delimits the Effect Text; the `[Equip]` keyword ability sits in the **printed Rules Text**
above it. So once the card is Attached, 718.3 moves only the Effect Text onto the carrier, 718.2
renders the rest Inactive, and 721.2 says an Inactive Ability **cannot be activated**.

**An Equipment that is already attached can never pay its own [Equip] to move to another unit.**
[Equip] is payable once, on the way in, and never again.

The printed carve-out proves the rule rather than contradicting it: **[Weaponmaster]** reads
*"you may [Equip] one of your Equipment to me for one rainbow less, **even if it's already
attached**"*. Riot had to write that clause. The other legal relocations are effects that ATTACH —
`SFD-193 Grandmaster at Arms`, `SFD-208 Forge of the Fluft`, `SFD-024 Rell, Magnetic`,
`SFD-049 Aphelios, Exalted`'s trigger — and 434.1.f detaches from the old carrier as part of the same
action.

### 35.2 The defect this creates, reported and not fixed here

**`prize-of-progress-hexplate-equip-shuttle` does not work.** Its step 4 reads *"Pay the [Equip] cost
again and attach the Hexplate to the other unit"*, and its whole ledger — *"+1 Might on Prize of
Progress per Mind Power spent... the ceiling is your rune count, not your gear count"* — stands on
repeating that payment. By 718.2 with 721.2 the Hexplate's [Equip] is Inactive from the moment of the
first attach, so the second leg is illegal and the engine is worth exactly **one** activation.

Scanned the whole catalogue for the same shape: **that is the only entry that depends on it.** One
smaller slip, in a notable rather than a ledger: `shurelya-requiem-ready-and-ganking` says the Requiem
can be re-attached *"by Ornn's [Weaponmaster] or another [Equip]"* — the second half is wrong for the
same reason; the [Weaponmaster] half, and everything the entry concludes, stands.

(And, checked the other way: `royal-entourage-grandmaster-warmogs-two-conquers`, staged in batch 1 of
this walk, already says the Equipment's [Equip] is *"paid once, on the way in, and never again"* —
which is now sourced rather than incidental.)

### 35.3 `prize-of-progress-gold-tokens-reaction-might` — the replacement

If the repeatable *"activated ability of a gear"* cannot be an [Equip], it has to belong to a gear
that is **never attached**. 187.5 names one: *"A Gold gear token is a domainless gear token with
'[Reaction][>] Kill this, [E]: [Add] [A].'"* — a gear, an activated ability, and one no card in the
pool ever attaches. Every Gold cashed is one +1 Might on Prize of Progress on top of the rainbow it
was always going to give.

It is also the only version that works **on the opponent's turn**: the Gold's ability carries
[Reaction] (813.1.c.2), while no [Equip] carries [Action] or [Reaction] at all, so no attach is ever
payable inside a Showdown. `SFD-086 World Atlas` supplies two Golds per Hold and
`SFD-171 Renata Glasc, Industrialist` makes them enter ready (R25 = A).

One timing trap the entry states: **do not cash a Gold at the Hold.** 167 empties every Rune Pool
*"at the start of each player's Main Phase"*, so Beginning-Phase Power is gone before you can spend
it. Bank the tokens; nothing forces them to be used the turn they appear.

### 35.4 `rell-magnetic-purifier-assault-stack` — the same rule, read forwards

`SFD-024 Rell, Magnetic` never uses [Equip]: her trigger **plays** an Equipment and then attaches it
*by effect*. Every Equipment she picks up is being attached for the first time, which is precisely
why she is the one body in the pool that keeps accumulating them.

`SFD-183 Purifier` says *"Your Equipment **each** give [Assault]"* — per Equipment, not per unit — and
**807.2** sums: *"If a Unit has Assault or has been granted Assault and is granted Assault by an
additional source, the Assault Value of all granted Assault keywords is summed"* (Riot's example:
Petty Officer + Cleave = Assault 4). Three `SFD-009 Serrated Dirk` on Rell are three granted
[Assault 2] from their Effect Text plus three [Assault 1] from the Purifier = **Assault 9**, so she
attacks at Might 13 off three 1-Energy cards she never paid for.

The ceiling is the hand, not the board: she plays the Equipment *"from your hand"*, and 103.2.b caps
each name at three.

## 36. Batch 5 — staged

Two entries in `/tmp/rc-walks/rc-walk-rules.json`. `validateCombos` clean over 544 entries;
`test/legend-lines.test.ts` caught a real defect on the first run — `UNL-181 Jhin, Meticulous` is
**Fury/Mind**, not Mind/Order, and had been typed into a Mind/Order legend list. Rebuilt from the
census (OGN-265 / OGN-308 Herald of the Arcane, OGS-021 Lady of Luminosity - Starter, SFD-201 /
SFD-249 Chem-Baroness, UNL-199 / UNL-235 Deceiver) and re-run clean. That is the #166 failure class
exactly, and the test caught it exactly as designed.

### 36.1 One refusal from the same batch

**`OGS-021 Lady of Luminosity` + a [Hidden] spell — REFUSED, and the reason is 103.2.d.2.** The
attractive line is that 206 reads a card's PRINTED cost while 811.1.b plays a hidden card *"ignoring
its base cost"*, so a free [Hidden] spell printed at E5 or more would still draw off *"When you play
a spell that costs :rb_energy_5: or more, draw 1"*. Swept the pool: of the 23 [Hidden] spells,
**exactly one is printed at E5 or more** — `SFD-202 Hostile Takeover` (Mind/Order, E5 P2) — and it is
a **Signature** card, so 103.2.d.2 forces its champion's legend and it can never sit under Lady of
Luminosity. The mechanism is real and the pool has no card for it.

## 37. Batch 6 — the cheapest vein left, re-measured: cards the Core Rules NAME

CLAUDE.md records the vein (#173/#174: *"the Core Rules' own worked examples name real cards"*).
Re-measured today with the name+type fold, over `data/Riftbound-Core-Rules-2026-07-16.txt` against
`data/cards.json` and `data/combos.json`:

- **129** card names in the pool appear somewhere in the rules text.
- **32** of those are in no entry — of which 6 are Runes, 3 are tokens, and one
  (`OGN-168 Fight or Flight`) is banned in both formats.
- That leaves **22 real, playable, uncatalogued cards the Core Rules point at by name.** The probe is
  `.scratch-rules/rulesnames.mjs`; it folds printings by name+type first, per the #173 lesson.

Four of them became entries this batch.

### 37.1 `here-to-help-mountain-drake-showdown-unit` — how a UNIT reaches a Showdown

A unit is a card with no [Action] and no [Reaction], so **155** bars it from a Showdown and **381**
keeps activated abilities to your own turn in an Open State: bodies cannot normally arrive once a
combat has opened. `SFD-111 Here to Help` (Body, E2 P1, [Hidden], **[Action]**) is the exception —
*"You may play a unit from hand to a battlefield you control, reducing its cost by :rb_energy_3:."*

And **464.2.c.3.a** puts the body in that combat. From face down it is better still: 811.1.b's tail
gives it **[Reaction]** and a cost of zero, so the drop happens on the OPPONENT's turn, and
811.1.d.2's confinement lands it exactly where the card wanted it anyway (*"a battlefield you
control"*).

The cost the entry states rather than hides: **the unit's own price is still paid**, and on the
opponent's turn that means runes held back — 167 empties the POOL, not the runes, and 164.2.a is a
[Reaction] ability, so six ready runes carried through your own turn pay Mountain Drake's discounted
E6 in their Closed State.

### 37.2 `ravenborn-tome-falling-star-two-deal-actions` — Bonus Damage is per DEAL ACTION

**715.2**'s worked example is in this very domain (Singularity under Annie, Fiery, *"dealing 7 to
each"*), and the constructive reading is: the payoff scales with **how many Deal actions or targets a
spell has**, never with how big each one is. `OGN-029 Falling Star` is *"Deal 3 to a unit. Deal 3 to a
unit."* — two instructions, two Deal actions, so `OGN-032 Ravenborn Tome`'s +1 lands twice: 4 and 4
for E2 + 2 Fury Power.

**714** caps a second source: *"all instances are summed and applied once"* — Tome plus Annie is +2
per action (5 and 5), never ×2.

The pool's whole Bonus Damage family is six rows (`OGN-032` Ravenborn Tome, `OGN-296` Void Gate,
`OGS-001` Annie Fiery, `SFD-191` Rabadon's Deathcrown, `UNL-020` Dancing Grenade, `VEN-010` Consuming
Curse), and the Tome was in **zero** entries despite being one of them.

### 37.3 `iascylla-teemo-strategist-forced-defend` — scheduling a defend trigger

`UNL-050 Iascylla` (Calm, E7 P1 M6, zero entries): *"When I hold, at the start of your next Main
Phase, you may move an enemy unit to this battlefield."*

**190.3.a.1** applies Contested to units moving to a battlefield and **464.2.c.1** — *"The Attacker is
the player whose unit(s) applied the Contested status to the Battlefield"* — makes the moved unit's
controller the Attacker. So dragging an enemy body onto a battlefield YOU control makes **them** the
attacker on **your** turn. That is the #58 finding used constructively, and it is the only free,
repeating way in the pool to put a *"When I defend"* trigger on a schedule: against a wall the
opponent simply never attacks.

Two supporting rules: **464.2.e.1** places the Defending player's triggers on the Combat Chain **last**
and 340.1 resolves the newest first, so `OGN-121 Teemo, Strategist`'s reveal-and-burn goes off before
anything the attacker put up; and **431.1.c** keeps five reveals a turn free of Burn Out, which is what
makes the trigger repeatable in a deck run thin.

Two things the entry refuses to claim: a Defender never Conquers (466.5 with 464.2.c.2), so no point;
and the combat actually happens (323.9 stages it, 465.2.c assigns), so a Might floor has to be standing
there.

Note also that Iascylla's Hold **escapes** the standing "a Hold-triggered X is a no-op" rule for the
same reason `UNL-052 Nami, Headstrong` does: it arms a delayed effect that resolves at **316.4**, in
the Main Phase, not inside 315.2.

### 37.4 `battering-ram-undying-legion-cards-played` — the negative half of the token rule

CLAUDE.md lists *"cards played this turn"* as a lens that was never swept. The first thing to know
about it is a refusal: **350.2** makes a token something that is PLAYED and **185.2.a** keeps it from
being a card, so *"each **card** you've played this turn"* (`SFD-012 Battering Ram`) and **[Legion]**
(`UNL-025 Undying Legion`) both count **zero** tokens. A Recruit, Sprite, Gold or Mech engine —
however many bodies it puts down — moves neither counter. This is the negative half of the rule the
catalogue already uses positively (*"when you play a unit"* does see a token).

The arithmetic: Battering Ram is E5 with a floor of E1, so exactly **four** cards played earlier in
the turn reach the floor and a fifth is wasted (356.4.e keeps the floor tied to that discount alone).
[Legion] is the cheap half of the same counter — one card, not four — so the turn's order is
Hextech Ray, then Undying Legion out of the trash, then the rest, then the Ram.

`OGN-009 Hextech Ray` was chosen as the tick deliberately: the #166 lesson is that **filler must be
unconditionally castable and should do work of its own**, and E1 + 1 Fury Power for 3 damage at
[Action] speed is both.

## 38. Batch 6 — staged

Four entries in `/tmp/rc-walks/rc-walk-rules.json`. `validateCombos` clean over 552 entries;
`test/legend-lines.test.ts` clean. Cards in **zero** entries before this batch: `SFD-111` Here to
Help, `OGN-142` Mountain Drake, `OGN-032` Ravenborn Tome, `OGN-029` Falling Star, `UNL-050` Iascylla,
`SFD-012` Battering Ram, `UNL-025` Undying Legion, `OGN-009` Hextech Ray — eight.

Two quotes were corrected against the rules file before staging (143.2.a and 464.2.c.1 had been
paraphrased in `sources[]` rather than quoted).

### 38.1 The 18 rules-named cards still uncatalogued after this batch

`OGN-010` Legion Rearguard (356.1.b.3's worked example), `OGN-058` Discipline, `OGN-097` Blastcone Fae
(811.1.d.2's worked example), `OGN-105` Singularity (715.2's worked example), `OGN-229` Vengeance,
`OGN-283` Navori Fighting Pit, `OGS-006` Lux, Illuminated (206's worked example), `OGS-009` Yi, Honed,
`OGS-011` Flash, `OGS-018` Tibbers (103.2.d.3's worked example, and a Signature card),
`SFD-034` Feral Strength, `SFD-077` Rocket Barrage (206's second worked example),
`SFD-186` Spinning Axe, `SFD-194` Counter Strike. Rebuild the list with
`node .scratch-rules/rulesnames.mjs`.
