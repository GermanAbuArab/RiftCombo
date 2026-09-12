# The CLAUDE.md citation gap — rules the catalogue leans on that the file does not carry

Lane rc-walk-mid, 2026-09-12. The vein was found by rc-synth and re-derived by the manager; this
document is the disposition of the top twenty, and it opens with a correction to the instrument
because the ranking it produced is not the ranking.

## 1. THE SCRIPT'S PREDICATE HAS BOTH OF THE TRAPS THIS PROJECT HAS ALREADY PAID FOR

`scripts/claude-md-gap.mjs` counts with `(?<![0-9.])HEAD(?![0-9])`. Two consequences, both measured:

**(a) The lookbehind does not exclude a HYPHEN, so a bare three-digit heading matches card codes.**
This is the trap recorded from #187 batch 18 (`UNL-184` counted as rule 184), and it is worse for
three-digit headings because every set has collector numbers in that range.

| heading | script | hyphen excluded | bare (children excluded) |
|---|---|---|---|
| `304` | **35** | **0** | **0** |
| `309` | 32 | 3 | 0 |

`304` — *"The Turn Player is the player taking the current turn"* — was the **second row of the
report** and the catalogue does not cite it once. Every hit is `OGN-304`, `SFD-304` and friends.

**(b) The lookahead `(?![0-9])` admits a following dot, so a parent's count is its whole BLOCK.**
That is a legitimate question to ask, but it is not the question the report's wording implies:

| heading | block | bare |
|---|---|---|
| `801` | 26 | **0** |
| `801.3` | 26 | **0** |
| `826` | 26 | 1 |
| `355.11` | 20 | 3 |
| `424.1.a` | 33 | 3 |

So `801 A Keyword is…` is not an uncarried rule the catalogue leans on; the catalogue cites its
children and never it. Re-ranked with `(?<![-0-9.])HEAD(?![0-9a-z.])`, the population at 10+ is
**84, not 109**, and the top of the list changes: `428.1.a.1` at **41** was nowhere in the printed
report and is the single most-cited rule the file does not carry.

**None of this touches the manager's three exemplars, which is worth saying plainly**: `355.7` is
33 bare, `136.2.c` 37 bare, `811.6` 28 bare. The finding is sound; the ordering was not.

## 2. THE TWENTY, WITH A VERDICT EACH

**A — belongs in CLAUDE.md as a rule (4).** Written up in §3 and added to the file in one bullet.

| rule | bare | why it is a rule and not scaffolding |
|---|---|---|
| `428.1.a.1` | 41 | the Active/Passive kill split, and the file names `428.1.a.1.b` TWICE only to say *do not cite it* |
| `805.1.a.1` | 29 | Accelerate's Power must match one of the unit's own domains — a deckbuilding constraint on a keyword the file discusses at length |
| `811.1.c.3` | 22 | the facedown flip OPENS A CHAIN, so the [Hidden] package is respondable |
| `424.1.a.2` | 22 | a reveal moves nothing, which is what makes 431.1.c's no-Burn-Out work |

**B — the content is already in the file under a different citation (12).** These are citation
upgrades, not new rules, and the standing shape from #187 batch 18 holds for most of them: *the file
carries the EXCEPTION and not the rule.*

| rule | bare | already in CLAUDE.md as |
|---|---|---|
| `441.1.a` "Empowered is a binary state" | 31 | 441.1.b (cannot be re-Empowered) and 441.2 (permanent state) — the file has both consequences and not the definition |
| `144.3.c` exhaust costs paid simultaneously | 25 | 144.3 "one game action performed on multiple Units" + 144.3.a |
| `818.1.c.2` Equip is short for "[Cost]: Attach this gear to a unit you control" | 23 | 818.1 "Equip is an Activated Ability", cited 12 times |
| `446.1` a Permanent changing position is a Move | 22 | 420.1 "Moving is the act of a Game Object moving between two Locations" + 455/456 for the recall carve-out |
| `431.2.c` the burnt-out player chooses an opponent to gain 1 | 20 | 194.1.d, quoted in full |
| `820.1.d.1` the effect is performed an additional time | 20 | 820.1.b "exactly one extra execution" |
| `316.8.b.1` Non-Combat Showdowns are a stand-alone Phase | 19 | 344.2 and the 451/452 note |
| `419.4.a` a play trigger fires on RESOLUTION | 19 | 419.4.a.1 and the 419.4.b split, both quoted |
| `718.4` the Might Bonus modulates the carrier's Might | 19 | 137.3 / 137.3.a |
| `464.2.e` step 4 of Combat, triggers become Pending | 18 | 464.2.e.1, quoted |
| `144.1.c` no Standard Move during a Showdown or Combat | 16 | 144.1.b (no Standard Move in a Closed State) |
| `419.3.a` "This treats Play as a Limited Action" | 16 | derived across 312.1.b.1, 410.1.a and 410.2 — **the best single upgrade here**, because the file reaches it by argument and this paragraph says it outright |

**C — correctly absent, structural scaffolding the entries cite mechanically (4).** Counted, not
skipped, because the manager asked for the number and because "the file does not carry it" is the
right answer for these.

| rule | bare | why it is correctly absent |
|---|---|---|
| `133.8` / `133.8.a` Tags are categories with no innate rules meaning | 18 / 18 | entries cite it when listing a tag; the operative facts (champion tags, the Mech token's tag by rule at 187.4, the 763.1 census) are all in the file already |
| `157` a spell goes to the trash after resolving | 17 | never in dispute and never load-bearing; no entry turns on it |
| `368.1` Passive Abilities can be Replacement Effects | 16 | a bridging sentence; the file carries the whole 369–373 replacement apparatus it bridges to |
| `422.1.a` the discarding player chooses, and may use private information | 17 | the file states the identical rule for RECYCLING at 416.6; the discard case is the same shape and no entry has needed it stated twice |

## 3. THE FOUR RULES, WITH THEIR TEXT

**428.1 — killing splits in two and the file only ever mentions the split to warn you off it.**
428.1: *"Killing is the action of a Permanent going to the trash from the board."* 428.1.a: *"This
can be Active or Passive."* **428.1.a.1**: *"Active Kill is when the action is taken when instructed
by a game effect or as a cost for a card or ability"*, which 428.1.a.1.a names a **Kill
Instruction**; **428.1.a.2**: *"Passive Kill is when the action is taken as a result of Lethal Damage
or as a consequence for any other state."* This catalogue reasons across that line constantly — a
kill instruction against 143.2.a's death by damage, which resolves in a Cleanup and needs 428.5.c to
be attributed to a spell at all — and derives it card by card. **428.1.a.1.b is the operative
clause**: a body with a Deathknell killed BY INSTRUCTION has that ability put on the chain FIRST,
with *"the unit's location, attributes, and other relevant information"* noted before the kill
completes. Riot's worked example is `SFD-148 Draven, Audacious`, which four entries in this
catalogue stand on.

**805.1.a.1 — Accelerate's Power is not free-floating.** *"If the unit has one or more domains, the
Power portion of the Accelerate cost can be paid only with a Power that matches one of the domains
of the unit"*, with 805.1.a.2 letting a domainless unit pay with any. So in a two-domain deck the
Accelerate rune must be one of the UNIT's own domains and not merely inside the identity — a
constraint on all 26 [Accelerate] units that no ledger in this project states.

**811.1.c.3 — the facedown flip is respondable.** *"Playing a card from facedown (or 'from Hidden')
does open a chain."* The file carries 811.1.c.1 (*"Hide is not a subset of Play"*) five times and
never this one. With 811.1.b's tail granting [Reaction] from the next turn, the flip creates a Chain
Item, so the [Hidden] package is answerable at the moment it is played — which matters because two
cards in the pool counter an ability and nine counter a spell.

**424.1.a / 424.1.a.2 — a reveal moves nothing.** *"Revealed is a temporary state and is not a
zone"*, and *"Cards remain in the zone they are being Revealed from"*, with Riot's example that a
card revealed from the top of the Main Deck *"is still the top card of that player's Main Deck"*.
That is the mechanism under a fact the file already uses hard: 431.1.c's looking and revealing never
Burn Out. They cannot, because nothing leaves the deck.

## 4. Validation

16 passages checked verbatim against `data/Riftbound-Core-Rules-2026-07-16.txt`, zero failures.
Counts re-run with the hyphen-excluding, child-excluding predicate over `data/combos.json` plus
`data/synergies.json`, with a known-present control printed first (`355.10.d`: catalogue 148, file
11) so a silently-matching probe cannot read as a result. One bullet added to CLAUDE.md; twelve
paragraphs disposed as citation upgrades and four as correctly absent, with no bullet added for
either, because this file's value is that every line was earned.
