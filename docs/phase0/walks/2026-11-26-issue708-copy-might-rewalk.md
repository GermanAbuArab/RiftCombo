# 2026-11-26 — the copy layer and Might on the 2026-10-09 rules: six entries re-walked (#708)

Issue #708. The #654 re-read of the 2026-10-09 copy layer found three entries whose outcome changes and
three that hold on stale wording. Every one of the six was pinned to 2026-07-16 in
`docs/rules-diff/remap-2026-10-09.md` because it cites a 2026-07-16 paragraph of the old layer
(`477.1.a`, `477.1.a.1`, `477.1.b.1.a`) that has no text-identical paragraph on 2026-10-09. The #645 remap
cannot move an entry like that, so each one is walked here whole on the 2026-10-09 text, and the walk
then rewrites the entry with 2026-10-09 numbers and `rulesVersion` / `walkedVersion` `2026-10-09`.

Card text is from `data/cards.json` (Riot's gallery API through `scripts/build-cards.mjs`). The rules
are `data/Riftbound-Core-Rules-2026-10-09.txt`, quoted whole in the appendix, one block per entry and
one line per paragraph the rewritten entry cites. The stacked Svellsongur count is R36 (#706), and this
walk states none.

## What changed in the rules

On 2026-07-16 the copyable traits had no Might, and Might assignment was its own clause in the first layer:

> **477.1.a** This layer deals with effects that grant, remove, or replace inherent traits of Game Objects. Name Super Type Type Tags Controller Cost Domain
>
> **477.1.a.1** Assignment of Might is dealt with in this layer. Example: A spell reads "A unit's Might becomes 4 this turn." The unit's Might is set to 4 in this layer.
>
> **477.1.b.1.a** Copyable traits are: Name Super Type Type Tags Cost Domain Rules Text

R27 on issue #11 (retired 2026-09-04 as settled by that text) read it as "a copy keeps its own Might".
On 2026-10-09 the first layer is copy effects only, and Might and Might Bonus are copyable:

> **479.1.b** When a Copy effect is applied to a Game Object, the traits specified by the Copy Effect replace or are added to the Copyable Traits of the Game Object being Copied as specified by the effect. If no traits are specified by a Copy Effect, all traits of the Game Object are replaced with those of the Copied Game Object. Example: A player triggers Leblanc, Deceiver’s hold effect and plays a Reflection token, making it a copy of Honest Broker. That player then plays Mirror Image, targeting the Reflection token. When the Mirror Image Reflection token is played, it copies all of the copyable traits of the original Reflection token - which are currently those of Honest Broker which it is a copy of. That player will have three units named Honest Broker in play, two of which are token Copies with Temporary.
>
> **479.1.b.1** The copyable traits of a Game Object are all of the printed—or if a copy effect is applied, copied—traits of that Game Object. In the case of a Token, they are the traits the token had when it was Created. Example: The copyable traits include the printed versions of the following traits: Name, Supertype, Type, Tags, Cost, Domain, Rules Text, Effect Text, Might, Might Bonus, Flavor Text, Art
>
> **479.1.c** Copyable traits of a Game Object are distinct from the actual traits of that Game Object, which may be modified by subsequent applied Layer effects.
>
> **479.1.d** Effects for this layer can be identified by the phrase "copy" in the text. Example: Svellsongur is an Equipment that reads in part “As this is attached to a unit, copy that unit's text to this Equipment's effect text for as long as this is attached to it.” This is a copy effect that is applied in this layer.

"Increase its Might to" is an arithmetic effect, and from a spell it snapshots:

> **143.2.a.1** Card text may refer to the latter two of these three forms. When cards or these rules refer to a Unit’s Effective Might, they will do so by simply referring to that unit’s “Might.” Example: A card reads in part “Choose a unit. Its base Might becomes 5 this turn.” This applies an effect in the trait-altering layer. Example: A card reads in part “Choose a unit. Increase its Might to 5 this turn.” This applies an effect in the arithmetic layer.
>
> **479.4.b** When an arithmetic effect from a source that is not a passive ability has a limitation that applies, it is limited at the time of its application, and is “remembered” at that limited level for the duration of its effect. This process is called “snapshotting.” Example: If an effect gives a unit “-4 [M] to a min of 1 this turn” choosing a unit with 2 [M], then the effect will generate -1 [M] this turn. Example: A unit reads “Units you control here have their Might increased to 5 [M].” This is a passive ability, so it will not snapshot. Example: A spell reads “Increase a friendly unit’s Might to 5 [M].” This effect is applied once, with an unlimited duration. Because it isn’t from a passive ability, it will snapshot.

Every copy effect in the six entries ("becomes a copy of that unit", "They become copies of me", "It
becomes a copy of") names no trait, so under 479.1.b every trait is replaced, the Might included. A token
stays a token: 185.1.a, *"Token Game Objects cannot lose their token nature by any means."*, is the same
text in both editions.

## 1. `shady-spectacles-baron-copy` — CHANGES (class ENGINE and status verified stand; the name changes)

Cards:
- `VEN-137` Shady Spectacles: *"As this is attached to a unit, choose another friendly unit. The equipped unit becomes a copy of that unit for as long as this is attached to it."* Might Bonus 0.
- `UNL-147` Baron Nashor, Might 12: *"I can't be chosen by enemy spells and abilities. Other friendly units have +2 :rb_might:."*

Walk:
1. Baron Nashor is on the board, and Shady Spectacles is attached to a Recruit token with its [Equip] (1 Energy + 1 Order Power).
2. The copy names no trait, so the Recruit takes all of Baron's copyable traits (479.1.b), Might 12 among them (479.1.b.1). On 2026-07-16 it kept the Recruit's 1.
3. The original Baron's "Other friendly units have +2" lifts the copy to 14 in the arithmetic layer (479.4). The copy carries the same text, so the original Baron goes to 14 as well. The Spectacles add +0.
4. The copy is not played, so Baron's "As you play me" is not copied into an event. The entry already said so, and the walk does not change it.

Finding: **changes**. The line is worth two 14-Might untargetable bodies, not one 14-Might Baron plus a 3-Might copy. The class (ENGINE) and the status stand. The name "copies Baron Nashor onto a token — the text, not the Might" is false on 2026-10-09 and becomes "— the text and the Might"; the id does not change. The note's contrast of "a Layer 1 Copy against Svellsongur's Layer 2 append" is gone: 479.1.d puts Svellsongur's sentence in this same layer. What stacked Svellsongur counts to is a question for #706.

## 2. `leblanc-temporary-plaza` — CHANGES (ALT_WIN stands; Soul Shepherd becomes an answer)

Cards:
- `UNL-081` Keeper of Masks, Might 1: *"When you play me, play two Reflection unit tokens here. Then do this: They become copies of me."*
- `UNL-T06` Reflection, Might 0, token.
- `UNL-090` LeBlanc, Everywhere at Once, Might 4: *"Your [Temporary] effects at my battlefield don't trigger."*
- `OGN-133` Flurry of Blades: *"Deal 1 to all units at battlefields."*
- `UNL-077` Soul Shepherd, Might 3: *"Your token units have +1 :rb_might:."*
- `UNL-147` Baron Nashor: *"Other friendly units have +2 :rb_might:."*

Walk:
1. Three Keepers make six Reflections. Each Reflection copies the Keeper whole, Might 1 included (479.1.b, 479.1.b.1), and stays a token (185.1.a). The board is LeBlanc 4, three Keepers at 1 and six Reflections at 1: ten bodies against a bar of seven. That part does not change.
2. Flurry of Blades with no answer: 1 damage kills every 1-Might body (142.4.b, 143.2.b). Nine of the ten die and LeBlanc stands alone, the same result as on 2026-07-16.
3. Flurry of Blades with Soul Shepherd: the Shepherd lifts the six Reflections, which are tokens, to 2, and does not lift the Keepers, which are cards. One damage kills the three Keepers and none of the Reflections. LeBlanc and six Reflections make **seven, the bar exactly**, or eight if the Shepherd was played to the Plaza. On 2026-07-16 the Reflections went from 0 to 1 and still died, which is why the entry called the Shepherd inert. **That conclusion flips.**
4. With Baron Nashor the Keepers are 3 and the Reflections 3, and Flurry kills nothing. That is unchanged.
5. Kill price: the cheapest four bodies are still 1-Might ones, 1 damage each, so 4 damage. "Nine others: 9 damage then her 4" stands.

Finding: **changes**. The ALT_WIN class, the quantities and the count of ten stand, but the notable that called Soul Shepherd "perfectly LEGAL and simply inert" is false on 2026-10-09. The rewrite says the Shepherd answers Flurry exactly at the bar, and that a second point of damage on any Reflection still breaks the count.

## 3. `convergent-mutation-might-transfer` — CHANGES (ENGINE stands)

Cards:
- `OGN-108` Convergent Mutation: *"[Reaction] Choose a friendly unit. This turn, increase its Might to the Might of another friendly unit."*
- `OGN-109` Dr. Mundo, Expert, Might 6: *"My Might is increased by the number of cards in your trash. At the start of your Beginning Phase, recycle 3 from your trash."*
- `OGN-167` Ember Monk, Might 4: *"When you play a card from [Hidden], give me +2 :rb_might: this turn."*

Walk:
1. "Increase its Might to" is the arithmetic layer, by 143.2.a.1's second example. It is no longer the assignment of Might that 2026-07-16 placed in the first layer. A negative difference is an increase of 0 (479.4.c), so the effect never lowers a larger target.
2. The source is a spell, not a passive ability, so the amount is fixed when the effect applies (479.4.b, whose third example is this phrase).
3. Mundo with 10 cards in the trash is 16. The Mutation resolves and the target goes to 16. Then the spell reaches the trash (351.2 on 2026-10-09: *"then the card is placed in the trash after resolving"*; 2026-07-16 read *"when Played"*), and Mundo is 17. The target stays at 16 and does not follow Mundo afterwards.

Finding: **changes**. The entry read the effect as a set-to that copies whatever Mundo reaches, and said R27 did not apply. On 2026-10-09 it is a snapshotted arithmetic increase, and Mundo ends the turn one ahead of the target. ENGINE stands, since the line still turns Mundo's size into a second large body for the turn.

## 4. `leblanc-zilean-reflection-doubling` — HOLDS (the numbers change)

Cards:
- `UNL-086` Zilean, Time Mage, Might 5: *"Once each turn, if you would play a token unit while I'm at a battlefield, you may play that token and an additional copy of it instead."*
- `UNL-199` Deceiver: *"...play a ready Reflection unit token there. Then do this: It becomes a copy of another unit there. Give it [Temporary]."*
- `UNL-200` Mirror Image: *"Choose a unit. Play a ready Reflection unit token to your base. Then do this: It becomes a copy of that unit. Give it [Temporary]."*
- `OGN-243` Darius, Executioner, Might 6: *"Other friendly units have +1 :rb_might: here."*

Walk:
1. A clone of Zilean takes all of his traits, Might 5 included (479.1.b, 479.1.b.1).
2. A Mirror Image aimed at a clone copies the traits the clone copied: 479.1.b.1 reads "printed—or if a copy effect is applied, copied—traits", and 479.1.b's own example walks this chain on Leblanc, Deceiver and Mirror Image.
3. The doubling needs only the text and so does not change. The Darius turn copies are at Darius's Might 6, the same as before.

Finding: **holds**. On 2026-07-16 the clones stood at 0 Might (R27); on 2026-10-09 they are 5. Nothing in the line depended on 0, so the class and the count stand, and only the Might sentences are rewritten.

## 5. `keeper-of-masks-flurry-of-blades-centaur-simultaneous-fodder` — HOLDS

Cards: `UNL-081` Keeper of Masks (above), `OGN-133` Flurry of Blades (above).

Walk:
1. Keeper of Masks is Might 1, and his two Reflections copy that Might 1 (479.1.b.1). On 2026-07-16 they were 0.
2. Flurry of Blades: 143.2.b kills on nonzero damage equal to or above Might, so 1 ≥ 1 for all three bodies. They still die together, and the Centaur still goes from 5 to 11.

Finding: **holds**. Only the Might of the copies (0 becomes 1) and the cited paragraphs change.

## 6. `overt-operation-fiora-victorious-rebuff-recross` — HOLDS

Cards: `OGN-232` Fiora, Victorious, Might 4: *"While I'm [Mighty], I have [Deflect], [Ganking], and [Shield]. (I'm Mighty while I have 5+ :rb_might:.)"*

Walk:
1. Ability-altering effects (479.3) still come before arithmetic (479.4).
2. 478.3 (the recursion) and 478.4 (the two Fiora examples) are word for word the same as 2026-07-16's 476.2 and 476.3.
3. The entry cited the old copy layer only in its notes, as "the 477.x layer list". That becomes 479.x.

Finding: **holds**. Numbers only; no outcome changes.

## Not moved: `spiderling-swarm-grand-plaza`

Notable 3 of this 2026-07-16 entry says `leblanc-temporary-plaza`'s Reflections "sit at 0 Might (R27)".
That is true of the 2026-07-16 rules, which the entry is pinned to, but false of the rewritten entry it
points at. It gets a dated correction in words, with no 2026-10-09 paragraph numbers, and stays pinned.

## Status and class changes

None. `shady-spectacles-baron-copy` changes its `name`; no id changes.

## Appendix — the 2026-10-09 paragraphs each rewritten entry cites, pasted whole

Generated from each entry's citations against `data/Riftbound-Core-Rules-2026-10-09.txt`. Section
headings with no text of their own (119, 127, 300, 473, 743, 766) are left out, and so is the block
wildcard `479.x`.

### `shady-spectacles-baron-copy` (17 paragraphs)

> **479.1** 1. Copy Effects
>
> **479.1.b** When a Copy effect is applied to a Game Object, the traits specified by the Copy Effect replace or are added to the Copyable Traits of the Game Object being Copied as specified by the effect. If no traits are specified by a Copy Effect, all traits of the Game Object are replaced with those of the Copied Game Object. Example: A player triggers Leblanc, Deceiver’s hold effect and plays a Reflection token, making it a copy of Honest Broker. That player then plays Mirror Image, targeting the Reflection token. When the Mirror Image Reflection token is played, it copies all of the copyable traits of the original Reflection token - which are currently those of Honest Broker which it is a copy of. That player will have three units named Honest Broker in play, two of which are token Copies with Temporary.
>
> **479.1.b.1** The copyable traits of a Game Object are all of the printed—or if a copy effect is applied, copied—traits of that Game Object. In the case of a Token, they are the traits the token had when it was Created. Example: The copyable traits include the printed versions of the following traits: Name, Supertype, Type, Tags, Cost, Domain, Rules Text, Effect Text, Might, Might Bonus, Flavor Text, Art
>
> **479.1.d** Effects for this layer can be identified by the phrase "copy" in the text. Example: Svellsongur is an Equipment that reads in part “As this is attached to a unit, copy that unit's text to this Equipment's effect text for as long as this is attached to it.” This is a copy effect that is applied in this layer.
>
> **479.4** 4. Arithmetic Effects
>
> **485** A Mode of Play must define several variables for the game.
>
> **485.1** Number of Players: How many people are playing the game.
>
> **485.4** Battlefield Count: Determines how many Battlefields are in play, contributed by players, during play.
>
> **485.4.b** This may involve utilizing less Battlefields than there are players.
>
> **485.6** Format: Conditions to win or additional rules added over play.
>
> **485.8** Unique Rules
>
> **487.4** Battlefield Count: 2
>
> **487.4.a** Each player provides three (3) Battlefields, included in their deck during deck building. Only 1 will be used, chosen during setup.
>
> **491.3** Victory Score: 11
>
> **718.2** While in this state, the card’s printed Rules Text is Inactive. See rule 720. Inactive for more information.
>
> **721.2** Inactive Abilities do not trigger, do not apply, and cannot be activated. Inactive instructions are not processed.
>
> **725.1** If an Attached card has a Passive or Replacement ability that applies during the process of Attaching or a Triggered ability that triggers off of Attaching, that text exists and can be processed as it Attaches.

### `leblanc-temporary-plaza` (35 paragraphs)

> **103.5.c** Cannot include more than one of a Battlefield of the same name when there are more than one required for the deck.
>
> **142.4.b** Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s Might. Example: A unit has 5 [M] and 3 damage marked on it. Frigid Touch is played targeting that unit. When it resolves, the unit’s Might becomes 3, and it will have lethal damage marked on it. Example: A unit has 0 [M]. In order to have lethal damage marked on it, it must have at least 1 damage marked on it.
>
> **143.2.b** If a Unit ever has nonzero damage marked on it equalling or exceeding its Might, it is Killed.
>
> **143.4** Units enter the Board exhausted.
>
> **144.2** Exhausting the Unit is the Cost for this action.
>
> **144.4.a** Units may move from their Base to a Battlefield.
>
> **144.4.b** Units may move from a Battlefield to their Base.
>
> **144.4.c.1** Units with Ganking may use their Standard Move to Move from Battlefield to Battlefield. See rule 810. Ganking for more information.
>
> **170.3** Battlefields cannot be Killed during the course of regular play.
>
> **170.4** Battlefields cannot be Moved.
>
> **184.2** The effect may restrict the location to which the token may be played.
>
> **185.1.a** Token Game Objects cannot lose their token nature by any means.
>
> **185.2.e** Tokens inherit the recycle destination of their type. Example: Token runes will be recycled to the Rune Deck. Token units, gear, and spells will be recycled to the Main Deck. Token battlefields and legends can’t be recycled.
>
> **187.6** A 0 [M] Reflection token is a domainless unit token with 0 Might.
>
> **187.9** The Baron Pit battlefield token is a domainless battlefield token with “Units can move here from anywhere.”
>
> **195** A player also wins the game if an effect instructs them to do so, or if they are the only player remaining in the game.
>
> **315.2.b.2** 1. The Turn Player Holds all Battlefields they Control. See rule 469. Scoring for more information.
>
> **323.6.a** Remove all Hidden cards from all Battlefields that are not controlled by the same player and place them in their owner's Trash.
>
> **355.2.a** By default, Valid locations include the controller’s Base or a Battlefield the controller controls.
>
> **355.2.b** Some Game Effects may grant players permission to play Units to locations that are not normally Valid. Such locations become Valid for the purposes of Playing the Unit.
>
> **383** Triggered Abilities are repeatable effects that happen when a Condition is met.
>
> **383.2.a.1** Any additional conditional statement immediately after the Condition must be true in order for the Condition to be fulfilled. Such a conditional statement is part of the Trigger Condition and not the Effect. Example: Sona, Harmonious reads “At the end of your turn, if I'm at a battlefield, ready up to 4 friendly runes.” Her Trigger Ability’s Condition will be fulfilled in the Ending Step, but the Triggered Ability will only be placed on the chain if she is located at a battlefield when the Condition is fulfilled. If she is removed in reaction to the triggered ability, it will still resolve. Example: Loose Cannon reads “At the start of your Beginning Phase, draw 1 if you have one or fewer cards in your hand.” The “if you have one or fewer cards in your hand” conditional statement is not immediately after the trigger condition, so it is part of the effect and not the condition.
>
> **467.2.c.6** A player must obey all requirements and restrictions on damage assignment if able. Example: A player is assigning damage to the following units: a unit with Tank ("I must be assigned combat damage first."); a unit with Backline ("I must be assigned combat damage last."); and another unit without any abilities. That player must assign combat damage first to the unit with Tank, then to the unit with no abilities, then to the unit with Backline.
>
> **468.5.c** Remove all Hidden cards from this Battlefield that do not share a controller with the Battlefield.
>
> **479.1.b** When a Copy effect is applied to a Game Object, the traits specified by the Copy Effect replace or are added to the Copyable Traits of the Game Object being Copied as specified by the effect. If no traits are specified by a Copy Effect, all traits of the Game Object are replaced with those of the Copied Game Object. Example: A player triggers Leblanc, Deceiver’s hold effect and plays a Reflection token, making it a copy of Honest Broker. That player then plays Mirror Image, targeting the Reflection token. When the Mirror Image Reflection token is played, it copies all of the copyable traits of the original Reflection token - which are currently those of Honest Broker which it is a copy of. That player will have three units named Honest Broker in play, two of which are token Copies with Temporary.
>
> **479.1.b.1** The copyable traits of a Game Object are all of the printed—or if a copy effect is applied, copied—traits of that Game Object. In the case of a Token, they are the traits the token had when it was Created. Example: The copyable traits include the printed versions of the following traits: Name, Supertype, Type, Tags, Cost, Domain, Rules Text, Effect Text, Might, Might Bonus, Flavor Text, Art
>
> **487.4.a** Each player provides three (3) Battlefields, included in their deck during deck building. Only 1 will be used, chosen during setup.
>
> **487.5** Setup: Each player randomly selects one (1) of their three (3) Battlefields. The other two are removed and will not be used for this game. The selected Battlefields are placed simultaneously in the Battlefield Zone.
>
> **488.5** Setup: Each player selects one (1) of their three (3) Battlefields. The other two are set aside and will not be used for this round of play. The selected Battlefields are placed simultaneously in the Battlefield Zone. After this game, if a player won, the Battlefields that were used are to be removed and not selected again for this Match. One of the remaining Battlefields that were set aside must be chosen instead.
>
> **811.1.b** It is functionally short for "While this card is in your hand or in your Champion Zone on your turn during an Open State, you may pay [A] to hide this facedown at a battlefield you control that doesn't already have a facedown card hidden there for as long as you control that battlefield. Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base cost."
>
> **813.1.c.1** On Cards: "This can be played during Closed States on any player's turn."
>
> **816.1** Temporary is a Triggered Ability keyword.
>
> **816.1.b** It is functionally short for "At the start of this permanent's controller's Beginning Phase, before scoring, kill this."
>
> **822.1.b** It is functionally short for "I may be played to a battlefield where you control Units" and “I have [Reaction] as long as I’m being played to a battlefield where you control Units.”
>
> **826** Backline

### `convergent-mutation-might-transfer` (7 paragraphs)

> **143.2.a.1** Card text may refer to the latter two of these three forms. When cards or these rules refer to a Unit’s Effective Might, they will do so by simply referring to that unit’s “Might.” Example: A card reads in part “Choose a unit. Its base Might becomes 5 this turn.” This applies an effect in the trait-altering layer. Example: A card reads in part “Choose a unit. Increase its Might to 5 this turn.” This applies an effect in the arithmetic layer.
>
> **351.2** Spells create game effects that are executed, then the card is placed in the trash after resolving.
>
> **479.4** 4. Arithmetic Effects
>
> **479.4.b** When an arithmetic effect from a source that is not a passive ability has a limitation that applies, it is limited at the time of its application, and is “remembered” at that limited level for the duration of its effect. This process is called “snapshotting.” Example: If an effect gives a unit “-4 [M] to a min of 1 this turn” choosing a unit with 2 [M], then the effect will generate -1 [M] this turn. Example: A unit reads “Units you control here have their Might increased to 5 [M].” This is a passive ability, so it will not snapshot. Example: A spell reads “Increase a friendly unit’s Might to 5 [M].” This effect is applied once, with an unlimited duration. Because it isn’t from a passive ability, it will snapshot.
>
> **479.4.c** Players cannot increase a numeric attribute by a negative amount. If an effect would instruct a player to do so, they increase it by 0 instead. Example: A player plays Last Stand, which reads “Double a friendly unit's Might this turn. Give it Temporary.” The player declares a 2 [M] unit as the target during finalization. In reaction to Last Stand, an opponent plays Eclipse targeting the 2 [M] unit. When Last Stand resolves, the unit is -2 [M]. Last Stand instructs its controller to increase the unit’s Might by its current amount, -2, when the double action is performed. This is not possible, so the unit’s Might is increased by 0 instead.
>
> **710** Units on the board are evaluated according to their current Might. Example: A unit with a base Might of 3 is targeted by a spell that reads "A unit gets +3 [M] this turn." As that spell resolves, its Might changes from 3 to 6, and it becomes Mighty. When that effect expires at the end of the turn, it will no longer be Mighty.
>
> **813.1.c.1** On Cards: "This can be played during Closed States on any player's turn."

### `leblanc-zilean-reflection-doubling` (5 paragraphs)

> **315.1.b** 1. The Turn Player readies all Game Objects they control that are able to be readied. See rule 416. Ready for more information.
>
> **371.1** These Replacement Effects may only be applied to the specified number of events each turn. Once they have been applied to that many events, they cannot be applied to a later event in the same turn.
>
> **479.1.b** When a Copy effect is applied to a Game Object, the traits specified by the Copy Effect replace or are added to the Copyable Traits of the Game Object being Copied as specified by the effect. If no traits are specified by a Copy Effect, all traits of the Game Object are replaced with those of the Copied Game Object. Example: A player triggers Leblanc, Deceiver’s hold effect and plays a Reflection token, making it a copy of Honest Broker. That player then plays Mirror Image, targeting the Reflection token. When the Mirror Image Reflection token is played, it copies all of the copyable traits of the original Reflection token - which are currently those of Honest Broker which it is a copy of. That player will have three units named Honest Broker in play, two of which are token Copies with Temporary.
>
> **479.1.b.1** The copyable traits of a Game Object are all of the printed—or if a copy effect is applied, copied—traits of that Game Object. In the case of a Token, they are the traits the token had when it was Created. Example: The copyable traits include the printed versions of the following traits: Name, Supertype, Type, Tags, Cost, Domain, Rules Text, Effect Text, Might, Might Bonus, Flavor Text, Art
>
> **816.1.b** It is functionally short for "At the start of this permanent's controller's Beginning Phase, before scoring, kill this."

### `keeper-of-masks-flurry-of-blades-centaur-simultaneous-fodder` (23 paragraphs)

> **103.2.b.1** Cards included in your deck must abide by your Domain Identity.
>
> **103.3.b** Your Main Deck can include up to 3 copies of the same named card.
>
> **143.2.b** If a Unit ever has nonzero damage marked on it equalling or exceeding its Might, it is Killed.
>
> **143.3.b** Damage is Healed from Units at two specific times:
>
> **317.2.c** Insert “3d. All ‘this turn’ effects expire simultaneously.”
>
> **370.1.a.2** An event can occur simultaneously with other events only when those events are all the result of the same Game Action or change in state occurring. Example: A spell reads in part “Kill up to two units at battlefields.” When that spell resolves, the units targeted are killed simultaneously because their deaths result from the same game action. Example: A spell reads in part “Kill a friendly unit. If you do, kill an enemy unit with no more Might than it.” When that spell resolves, the units are not killed simultaneously. There are two kill game actions being performed in the instructions of the spell. The friendly unit is killed first, followed by the enemy unit.
>
> **383.1.b** If an ability triggers “the [Nth] time” something happens and that trigger condition is met multiple times simultaneously, the ability’s controller picks one of those instances to serve as the trigger condition. The ability triggers only once, due to the chosen condition. Example: Wraith of Echoes reads “The first time another friendly unit dies each turn, draw 1.” That ability hasn’t triggered yet this turn. Two other friendly units die simultaneously (say, due to combat damage). The Wraith’s controller chooses one of those deaths to trigger Wraith’s ability.
>
> **383.3.d** If more than one Triggered Ability is Triggered simultaneously, then the player that controls the Abilities selects the order to place them on the Chain.
>
> **383.4.a** Play Effects are Triggered Abilities whose Condition includes the Permanent that has the Play Effect being played to the board.
>
> **383.4.a.4** Abilities that trigger when another object is played are not considered Play Effects.
>
> **418.1.a** Assigning Damage during the Combat Damage Step is not Dealing Damage, but will cause Damage to be Dealt when assignment is complete.
>
> **418.3.a** Assigning Damage causes Damage to be dealt outside of being directed to Deal Damage. See rule 461. Combat for more information.
>
> **463.1** If more than one Battlefield has Units controlled by opposing players at it at the same time, the Turn Player decides which Combat to resolve first.
>
> **467.2.c** Starting with the Attacker, each player assigns an amount of damage equal to their summed Might among the other's Units.
>
> **467.2.c.1** Assigning Damage is not Dealing Damage.
>
> **467.2.c.1.a** When all Damage is assigned, it will be Dealt simultaneously. These actions are not synonymous.
>
> **479.1.b** When a Copy effect is applied to a Game Object, the traits specified by the Copy Effect replace or are added to the Copyable Traits of the Game Object being Copied as specified by the effect. If no traits are specified by a Copy Effect, all traits of the Game Object are replaced with those of the Copied Game Object. Example: A player triggers Leblanc, Deceiver’s hold effect and plays a Reflection token, making it a copy of Honest Broker. That player then plays Mirror Image, targeting the Reflection token. When the Mirror Image Reflection token is played, it copies all of the copyable traits of the original Reflection token - which are currently those of Honest Broker which it is a copy of. That player will have three units named Honest Broker in play, two of which are token Copies with Temporary.
>
> **479.1.b.1** The copyable traits of a Game Object are all of the printed—or if a copy effect is applied, copied—traits of that Game Object. In the case of a Token, they are the traits the token had when it was Created. Example: The copyable traits include the printed versions of the following traits: Name, Supertype, Type, Tags, Cost, Domain, Rules Text, Effect Text, Might, Might Bonus, Flavor Text, Art
>
> **487.4** Battlefield Count: 2
>
> **811.1.b** It is functionally short for "While this card is in your hand or in your Champion Zone on your turn during an Open State, you may pay [A] to hide this facedown at a battlefield you control that doesn't already have a facedown card hidden there for as long as you control that battlefield. Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base cost."
>
> **811.1.d.1** A hidden permanent must be played to that battlefield.
>
> **813.1.c.1** On Cards: "This can be played during Closed States on any player's turn."
>
> **816.1.b** It is functionally short for "At the start of this permanent's controller's Beginning Phase, before scoring, kill this."

### `overt-operation-fiora-victorious-rebuff-recross` (22 paragraphs)

> **103.2.b.2** Your deck’s Domain Identity is dictated by the domains of your Champion Legend. In the default card frame, these domains appear as symbols in the legend’s upper left corner.
>
> **103.3.b** Your Main Deck can include up to 3 copies of the same named card.
>
> **103.3.d.2** All of the Signature cards must have the Champion tag that corresponds to the Champion Legend of the deck.
>
> **144.4.c.1** Units with Ganking may use their Standard Move to Move from Battlefield to Battlefield. See rule 810. Ganking for more information.
>
> **164.2.a** [Reaction][>] [E]: Add [1].
>
> **164.2.b** [Reaction][>] Recycle this: Add [C].
>
> **315.1.b** 1. The Turn Player readies all Game Objects they control that are able to be readied. See rule 416. Ready for more information.
>
> **315.2** Beginning Phase
>
> **316** Main Phase
>
> **416.1** Readying is an action that marks a non-spell Game Object on the board as available for action.
>
> **416.3.a** A player Readies all non-spell Game Objects they Control during the Awakening Phase on their turn.
>
> **431.3** If there aren’t sufficient runes in the Rune Deck, channel as many as possible.
>
> **478.2** Layers are applied in sequence. Each effect in them is applied as soon as able, and only a single time across all sequences.
>
> **478.3** When a sequence of applications completes, recur the process, and evaluate each layer again applying any effects that may now be applicable.
>
> **478.4** The removal or disqualification of an effect is separate from the application of the effect, but still can only be applied once. Example: Fiora, Victorious has printed Might 4 and says “While I'm Mighty, I have Deflect, Ganking, and Shield.” If a player places a buff on Fiora, her Might is increased in the Arithmetic layer, after the layer for Ability-Altering Effects. The Ability-Altering Effect layer is then re-checked and the abilities Deflect, Ganking, and Shield applied. Since each effect has been applied once and there are no other effects to apply, Fiora’s characteristics are finalized as 5 Might with Deflect, Ganking, and Shield. While a buffed Fiora, Victorious is in combat as a defender, an additional +1 Might will be applied in the Arithmetic layer, giving her 6 Might and the 3 keywords. Example: A buffed Fiora, Victorious is in combat as a defender when her buff is removed. Reevaluating the layers in sequence, she no longer gains Deflect, Ganking, and Shield during the Ability-Altering Effect layer, so when the Arithmetic layer is evaluated, neither the buff (which is gone) nor Shield (which she no longer has) apply. She goes directly from 6 Might with three keywords to 4 Might with no keywords.
>
> **479.3** 3. Ability-Altering Effects
>
> **479.4** 4. Arithmetic Effects
>
> **702.2.b** Spending a Buff removes a single Buff counter from a Unit.
>
> **702.3.a** If a Buff is added, or instructed to be added, on a Unit that already has a Buff, it is not placed instead.
>
> **709** A Unit "becomes Mighty" at the moment its Might changes from being less than 5 to being 5 or greater. Example: A Unit with Might 4 that gets +1 [M] becomes Mighty. Example: A Unit with Might 5 that gets +1 [M] does not become Mighty, because it was already Mighty.
>
> **806.1.b** Action grants the corresponding card or effect permission to be played or activated during Showdowns, even when it is not the Controlling player's turn.
>
> **810.1.c.3** It does not give additional abilities or activations of Movement, only new options for the Standard Move.
