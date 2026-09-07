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

**`OGS-023 Might of Demacia - Starter` and `OGN-269 The Boss` — NOT REFUSED, but not entries.** Both
are legends (*"When you conquer, if you have 4+ units at that battlefield, draw 2"*; *"When you
conquer, ready me"*) and 383.4.c.2.b covers them: *"The Conquer Abilities of anything that references
the player Conquering is put on the Chain as a Pending Item…"*. They pay this line exactly as
described. But **no entry in the catalogue puts a legend in `uses[]`** (measured: 0 legend rows over
all 362 entries) — a legend belongs in `prerequisites.easy` — and an entry whose only new content is
its legend line would have a `uses[]` of Stare Down and nothing else, which is not a card set the
matcher or `planDeck` can price. Recorded here as a **deckbuilding lead**: under a Body/Order legend,
the four-body walk-in of 144.3 that `stare-down-hunt-pack-xp` already performs draws 2 as well.

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

## 3. Back-links for `data/synergies.json` (`rule id -> entry id`)

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
```
