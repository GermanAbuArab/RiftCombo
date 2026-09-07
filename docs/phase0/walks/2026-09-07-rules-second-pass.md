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

## 19. Back-links for `data/synergies.json` (`rule id -> entry id`)

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

## 20. Reported to the manager, not fixed here

- `master-of-shadows-banish-rummage` carries a **false uniqueness claim in its own name** — see §3.
  Three cards print the Shadow Clone token and its attack-triggered banish; one of them is the entry's
  own `VEN-144 Death Mark ×3`.
