# Rules veins, final slice (#229, 2026-09-25)

Closes #187 (citation gaps) and #191 (uncited worked examples). Measured on master `6fc22c4`, worktree
`issue-229`. Every quotation below is pasted from `data/Riftbound-Core-Rules-2026-07-16.txt` with its
line breaks folded to single spaces.

## The two probes

**Vein A** is `node scripts/claude-md-gap.mjs`: rules cited 10+ times by `data/combos.json` +
`data/synergies.json` and zero times in `CLAUDE.md`. The issue measured **10** with the older counter.

**Vein B** is the new `node scripts/uncited-examples.mjs`: every Core Rules sub-rule heading whose own
block carries `Example:` and which is cited by nothing in the catalogue, `CLAUDE.md` or the walk
documents. The issue measured **8**.

### Two population changes, both explained

1. **Vein A: 10 → 9 when the counter moved to the five-trap form.** `cnt` now uses
   `(?<![-#=_0-9.A-Za-z])(?<![A-Za-z]/)HEAD(?![0-9a-z]|\.[0-9a-z])`, as `CLAUDE.md` prescribes. The
   row that fell out is `315.4.b.1`, whose catalogue count went 10 → 9. The lost hit is
   `315.4.b/315.4.b.1` in one entry: a rule PAIR written with a slash where the first member ends in a
   sub-rule LETTER, so `(?<![A-Za-z]/)` (meant for `issues/115`) rejects it. **That is a sixth member of
   the counting-trap family and a false negative**: `CLAUDE.md` measured nine rule-pair slashes of the
   form digit-slash-rule and never met letter-slash-rule. The prescribed form is kept, as #229 requires;
   the cost today is one hit on one rule, and `315.4.b.1` is disposed below anyway. The form that would
   survive both is `(?<![A-Za-z]{2}/)`, since a URL path segment ends in two letters (`issues/`) and a
   sub-rule ends in one after a dot (`.b/`) — recorded, not shipped.
2. **Vein B: 8 → 6 when the block boundary is any heading.** The issue's probe ended a sub-rule's
   block at the next SUB-rule heading, so a block could swallow the next TOP-level rule and its
   Example. `372.2`'s "Example" is 373's (two units dying with Zhonya's Hourglass) and `478.1.c`'s is
   479's (the Discipline dependency example). The probe here ends a block at the next heading of any
   depth: 1,972 sub-rule headings, **186** with an Example (the issue's 193 includes seven borrowed
   ones), and those two rows vanish. Both are still disposed below, because the issue named them.

## Dispositions (18)

| # | Rule | Vein | Disposition | Reason |
|---|---|---|---|---|
| 1 | 425.1.c.1 | A | **Promoted** | *"This includes additional costs."* Twenty entries stand on it for the counter-window argument (every Time Warp chain, `mystic-reversal-defy-counter-tiers`); `CLAUDE.md` argued it from 425.1.c alone. |
| 2 | 431.2.d | A | **Promoted** | *"Completes the remainder of the action that caused them to burn out."* The step that orders the point BEFORE the draw finishes; ten entries' empty-deck ledgers price it. `CLAUDE.md` sourced it to 413.4 and 440.4. |
| 3 | 431.1 | A | **Promoted** | *"Burning Out is an action a player must perform if they attempt to move one or more cards from their Main Deck to any other zone in excess of the number of cards remaining in their Main Deck:"* The definition 431.1.a/.b/.c hang off; `last-rites-lunar-boon-trash-recursion` prices its mandatory mill on "any other zone". |
| 4 | 383.4.d | A | **Promoted** | *"Hold Effects are Triggered Abilities whose Condition includes a Unit being present at a Battlefield during the Beginning phase when a player scores Victory Points from Holding."* The definition whose children .d.1 to .d.3 were all carried; eleven entries cite it. |
| 5 | 431.2 | A | **Promoted** (as the frame of 431.2.d) | *"To Burn Out, a player does the following in sequence:"* A list header, promoted because its ORDER is the content: recycle, point, then finish the action. Eight entries cite it by the bare number. |
| 6 | 107.3.c | A | **Promoted** | *"Cards can only be placed in or occupy the Facedown Zone if the controller of the card also controls the associated Battlefield."* The occupancy half of the facedown-tenure family; four entries including `warden-saboteur-hidden-lock`. |
| 7 | 464.2 | A | **Promoted** | *"When Combat opens, it either opens with a Combat Showdown, or the current Showdown becomes a Combat Showdown."* The premise under the 464.2.f.1 / 464.2.g [Action] window; five entries. |
| 8 | 356.4.c | A | **Promoted** | *"Discounts that only apply to a component of the cost will be applied when that component is added to the cost of the spell and before any other discounts."* Worked on `SFD-149 Ezreal, Prodigy`; four of the five citing entries run him. |
| 9 | 465 | A | **Promoted** (with 464.2) | The Combat Damage Step heading. Nine entries cite it by the bare number as the step a Showdown removal pre-empts; promoted inside the 464.2 bullet with 465.2's *"1. When the Showdown closes, Attackers and Defenders resolve Combat Damage at the Battlefield that was attacked, using their current Might."* |
| 10 | 315.4.b.1 | A | **Promoted** | *"If there are no cards remaining in their Main Deck to draw, the Turn Player has been Burned Out."* Nine empty-deck entries. Fell to nine citations under the new counter (see above) and is promoted regardless. |
| 11 | 132.4 | B | **Promoted** | *"Some cards have both a short name and a subtitle. For all purposes, including rules and deckbuilding, such a card’s name is “[Short Name], [Subtitle]”."* No entry cites it, but `CLAUDE.md` argues from "name" constantly (103.2.b caps by name, every census folds by name+type, the Yi / Master Yi split); this is what "name" means. |
| 12 | 431.3.c | B | **Promoted** | *"Points gained after the first Burn Out being processed in sequence that cause a player to reach or surpass the Victory Score for their game mode will cause that player to win the game if they also have more points than any opponent."* The rule whose exception 431.3.c.1 `CLAUDE.md` quotes; its tie clause is the 194.2 test and bounds what 431.3.c.1 can mean. |
| 13 | 133.3 | B | **Refused** | *"Spells and other effects can refer to categories, sub-categories, supertypes, card types, tags, and other characteristics inclusively or exclusively."* Its examples ("non-unit card", "a unit regardless of other categories") only bite on a multi-type object, and `CLAUDE.md` records the type histogram: no card in the pool has two types. No entry makes an argument it authorises. |
| 14 | 135.2.b.5.a | B | **Refused** | *"The complement of a game action is made up of the players or Game Objects that perform that game action, that that game action is performed on, the condition under which it is performed, and the duration for its effect to last. Some game actions omit a complement entirely."* Grammar of instructions; no entry's verdict turns on parsing a complement. |
| 15 | 371.2.b | B | **Refused, with a LEAD** | *"If they do not, it has not been applied this turn."* Declining a "may" once-each-turn replacement saves it for a later event. The one card it reaches is `UNL-086 Zilean, Time Mage`, in one entry, `leblanc-zilean-reflection-doubling`, which argues from 371.1 and never declines. LEAD: each Zilean may skip the Mirror Image base batch and double the Deceiver Reflection instead. |
| 16 | 372.2 | B (probe artifact) | **Refused** | *"If the affected object is an Uncontrolled Battlefield then the Current Turn Player decides the order the Replacement Effects will apply."* Its "Example" belongs to 373. The one battlefield replacement in the pool, `UNL-206 Altar of Blood`, acts on a UNIT, so no event ever acts on the battlefield itself. |
| 17 | 477.2.b | B | **Refused** | *"Effects for this layer can be identified by the phrase "become(s)," "give," "lose(s)," "have," "has," "is," or "are" in the text."* A reading aid for Layer 2; `CLAUDE.md` already reasons in Layer 2 through 477.2.c, and no entry's verdict turns on classifying a phrase. |
| 18 | 478.1.c | B (probe artifact) | **Refused** | *"Applying one of the effects alters the outcome when applying the other."* Its "Example" belongs to 479. `CLAUDE.md` records the dependency block as read with no card behind it: no card prints a "Might increased to N" passive. |

## Result

- `node scripts/claude-md-gap.mjs`: population **0**.
- `node scripts/uncited-examples.mjs`: **0**, over 1,972 sub-rule headings, 186 with an Example.
- `test/rules-veins.test.ts` pins both at zero behind non-vacuity floors, so a probe that matches
  nothing cannot pass green. Reopening either vein means a new paragraph was cited 10+ times, or Riot
  printed a new worked example — dispose it here and the test goes green again.
