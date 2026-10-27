# Keeper of Masks' Reflections: what Might do the copies have? (#515, 2026-10-27)

Entry walked: `keeper-of-masks-flurry-plaza-window` (ALT_WIN, `verified`). Raised by #503's implementer: the
entry's notable prices the two Reflections at 0 Might, but they "become copies of" `UNL-081 Keeper of Masks`,
which has 1 Might, so the "four of seven survive" arithmetic might be off.

## Card text (verbatim, `data/corpus_flat.txt`)

- `UNL-081 Keeper of Masks` (Mind, E2 M1): *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) [Temporary] (Kill me at the start of my controller's Beginning Phase, before scoring.) When you play me, play two Reflection unit tokens here. Then do this: They become copies of me."*
- `UNL-T06 Reflection` (Colorless, M0): *"(I become a copy of something when played. I don't get that card's play effects.)"*
- `UNL-077 Soul Shepherd` (Mind, E5 M3): *"Your token units have +1 :rb_might:."*
- `OGN-133 Flurry of Blades` (Body, E1): *"[Reaction] (Play any time, even before spells and abilities resolve.) Deal 1 to all units at battlefields."*

## Rules (verbatim, Core Rules 2026-07-16, untruncated)

187.6: *"A 0 [M] Reflection token is a domainless unit token with 0 Might."*

477.1.b: *"Copy effects are applied in this layer."*

477.1.b.1: *"When one Game Object becomes a copy of another, all copyable traits replace or are added to those of the original Game Object as specified by the Game Effect directing the Copy. This is applied in this layer."*

477.1.b.1.a, the whole list:

> Copyable traits are:
> Name
> Super Type
> Type
> Tags
> Cost
> Domain
> Rules Text

477.1.b.1.b: *"Copy effects will copy the copyable traits of a Game Object. By default, those are the printed traits of the Game Object. When a Game Object becomes a copy of something, its copyable traits are updated to the new traits it has received."*

477.1.a.1, the separate line that puts Might in the same layer without making it copyable: *"Assignment of Might is dealt with in this layer."*

185.1.a: *"Token Game Objects cannot lose their token nature by any means."*

143.2.a: *"If a Unit ever has nonzero damage marked on it equalling or exceeding its Might, it is Killed."*

## The walk

1. Keeper of Masks is played out of Hidden. Its play trigger plays two Reflection tokens. Each starts as 187.6
   says: a unit token with 0 Might.
2. "Then do this: They become copies of me." 477.1.b.1 replaces the copyable traits, and 477.1.b.1.a lists
   them: Name, Super Type, Type, Tags, Cost, Domain, Rules Text. **Might is not on the list.** Each Reflection
   is now named Keeper of Masks, is Mind, costs E2 (185.3.a.2's own example: the copy appends the cost), carries
   [Hidden] and [Temporary] as rules text, and keeps the 0 Might its token definition gave it.
3. 185.1.a: a copy of a CARD is still a TOKEN, so `UNL-077 Soul Shepherd` ("Your token units") lifts both
   Reflections. It does not lift the Keeper itself, which is a card.

| Body | Token? | Might, bare | Might under Soul Shepherd | Survives Flurry of Blades (1 damage, 143.2.a) under the Shepherd? |
|---|---|---|---|---|
| Keeper of Masks | no (card) | 1 | 1 | no |
| Reflection 1 | yes (185.1.a) | **0** (187.6; Might not copyable, 477.1.b.1.a) | 1 | no |
| Reflection 2 | yes (185.1.a) | **0** (same) | 1 | no |
| Bird x4 (187.7) | yes | 1 | 2 | yes, all four |

## Survivor count, before and after

- **Before this walk:** four of seven survive under the Shepherd (the four Birds). The Reflections' 0 Might was
  cited to 187.6 only, with no paragraph saying why the copy does not change it.
- **After this walk:** four of seven, unchanged. The 0 Might now stands on 477.1.b.1.a: Might is not a copyable
  trait. The issue's premise (copies at the Keeper's 1 Might) is the reading the rules exclude.
- **The verdict does not turn on this reading.** Had the copies taken Might 1, the Shepherd would put them at
  Might 2 and SIX of seven would survive. Six is still under the bar of seven, so the line still loses to one
  Energy, and the repair the entry names (a second `UNL-044 Flurry of Feathers`, eight Birds at Might 2) clears
  the bar under either reading.
- **Kill price (#503's rule, the lethal damage of the cheapest unit, no [Tank] in the seven):** a Reflection,
  1 damage. 143.2.a needs NONZERO damage, so a 0-Might body still costs 1. Under the Shepherd the cheapest bodies
  (Keeper and both Reflections) are Might 1, still 1 damage. The entry's N - 6 = 1 stands.

## Result

No correction to the entry's arithmetic or status. `keeper-of-masks-flurry-plaza-window` stays `verified`; a
dated notable records the walk and the paragraph (477.1.b.1.a) the 0-Might price was missing.
