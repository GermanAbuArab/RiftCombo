# Riftbound rules primer — loop/combo relevant subset

Distilled from Riot's official Core Rules, version 2026-07-16.
Every line below is verbatim rules text; the *italic* notes are combo-detection annotations.


## Golden & Silver Rules

*Card text supersedes rules. 'Can't' beats 'can'. Do as much as you can, ignore impossible instructions.*

- **000.** Golden and Silver Rules
- **001.** Golden Rule
- **002.** Card text supersedes rules text. Whenever a card fundamentally contradicts the rules, the card's indication is what is true.
- **050.** Silver Rule
- **051.** Card text uses different terminology than rules. Card text should be interpreted according to these rules, not as though it were text within these rules.
- **052.** Card, when written in card effects, is shorthand for "Main Deck card." Runes, legends, and battlefields are not considered cards when executing the abilities and effects of game objects. They are considered cards for the purposes of these rules.
- **053.** Cards refer to themselves in the first person.
  - **053.1.** * Units and legends say "I," "me," etc.
  - **053.2.** * Gear and spells say "this."
  - **053.3.** * Battlefields say "here."
  - **053.4.** * Cards may refer to themselves by their name for clarity. This is shorthand for the above terms.
- **054.** “Can’t beats Can”
  - **054.1.** Cards that forbid actions or effects, as a broad method of determination, supersede cards that allow or permit that same action or effect.
  - **054.2.** If a card specifies that an action can “only” be performed under certain circumstances, it cannot be performed under any other circumstances.
- **055.** When executing card text, do as much as you can, ignoring impossible instructions.
  - **055.1.** If all of a card’s instructions are impossible, it is still played and resolved, but nothing happens.
- **056.** Cards a player owns may never be placed into a non-Board zone belonging to another player.
  - **056.1.** Non-Board zones corresponding to a player include Main Deck, Rune Deck, Trash, Hand, Chosen Champion zone, and Banishment.
  - **056.2.** If a card would enter such a zone, it goes to its owner’s corresponding zone instead.

## Deck construction & Domain Identity

*Domain Identity is the color-identity analogue: card.domains MUST BE A SUBSET of legend.domains.*

- **103.** To play Riftbound, a player must have a Main Deck, a Rune Deck, a Champion Legend, and a number of Battlefields determined by the Mode of Play. These are collectively referred to as a player’s deck.
  - **103.1.** 1 Champion Legend
  - **103.2.** A Main Deck of at least 40 cards: A Chosen Champion Unit, as well as Units, Gear, and Spells
  - **103.3.** Rune Deck
  - **103.4.** Battlefields

## Zone changes reset object identity

*CRITICAL FOR LOOPS: an object changing zones becomes a NEW object, resetting 'once each turn' state.*

- **124.** A Game Object that changes zones to or from a Non-Board Zone becomes a new object for the purposes of tracking that object.
  - **124.1.** Whenever a Game Object changes zones to or from a Non-Board Zone, all Temporary Modifications of all kinds cease to be tracked on it in all capacities. Examples: Damage is cleared. Counters are removed. Granted Keywords are no longer granted. Statuses are cleared.
  - **124.2.** A Game Object can have any of the following statuses (non-exhaustive): Attached, Attacking, Buffed, Banished, Controlled, Defending, Empowered, Equipped, Exhausted, Facedown, Readied, Replaced, Revealed, Stunned, and any applied Layer alternations.

## Costs

*Energy cost = numeral. Power cost = domain symbols. Might is a body stat, NOT a cost.*

- **131.** Cost
  - **131.1.** Main Deck cards have a Cost, listed in the upper left corner of the front face of the card. See rule 165. Rune Pools for more information.
  - **131.2.** Energy Cost
  - **131.3.** Power cost
- **132.** Name
  - **132.1.** Each card has a name that identifies it uniquely.
  - **132.2.** This is usually located in the middle of the card.
  - **132.3.** Cards that are printed in different languages but represent the same card are considered to have the same name for the purposes of deckbuilding and gameplay. Example: Chemtech Enforcer in English and its counterpart in Chinese are considered the same card, despite the Name element on the card reading differently.
  - **132.4.** Some cards have both a short name and a subtitle. For all purposes, including rules and deckbuilding, such a card’s name is “[Short Name], [Subtitle]”. Example: Kai’Sa, Evolutionary and Kai’Sa, Survivor both have the short name Kai’Sa, but they have different names. You can include 3 of each in your deck under normal deckbuilding rules. If one of them is your Chosen Champion, the other is not.
- **133.** Category
  - **133.1.** A card can have one or more Categories and Sub-Categories based on the properties of its front and back sides.
  - **133.2.** These Categories and Sub-Categories dictate the behaviors of the card during play.
  - **133.3.** Spells and other effects can refer to categories, sub-categories, supertypes, card types, tags, and other characteristics inclusively or exclusively. Example: A "non-unit card" is any card that is not a unit. Example: A "unit" is any game object that is a unit, regardless of any other categories it belongs to.
  - **133.4.** Main Deck Cards begin the game in the Main Deck or (in the case of a Chosen Champion) the Champion Zone.
  - **133.5.** Rune Deck Cards begin the game in the Rune Deck.
  - **133.6.** Other Cards are not part of either the Main or Rune Decks and begin the game in a zone determined by their type.
  - **133.7.** Supertypes are Categories that may apply to game objects of multiple types. They are listed before a card’s type.
  - **133.8.** Tags are Categories that may apply to game objects of multiple types. They are listed after a card’s type.
- **134.** Domain
  - **134.1.** Most cards belong to one or more of six Domains, identified by one or more symbols in the lower right corner.
  - **134.2.** Each Domain has an associated color, a unique symbol, and a shorthand used to represent that symbol in written text.
- **135.** Rules Text
  - **135.1.** All cards have a section that describes how they affect the game. This section is known as the Rules Text of the card.
  - **135.2.** This section may contain:
  - **135.3.** Rules text can be blank.
  - **135.4.** A card’s printed Rules Text is Inactive while that card is Attached to another card. See rule 716. Attachment for more information. See rule 720. Inactive for more information.
- **136.** Effect Text
  - **136.1.** Some cards have a separate section of text below the Rules Text. This is referred to as the Effect Text.
  - **136.2.** Effect Text can contain additional Abilities.
- **137.** Might Bonus
  - **137.1.** Some cards have a Might Bonus in their lower right corner, expressed as an operator plus an integer.
  - **137.2.** A card’s Might Bonus can be +0.
  - **137.3.** A card’s Might Bonus modulates the Might of the card to which the card that has the Might Bonus is Attached. See rule 716. Attachment for more information.

## Units

*Units ENTER EXHAUSTED. This is why 'ready' effects are the key loop primitive.*

- **140.** Units
- **141.** Unit is:
  - **141.1.** A Game Object
  - **141.2.** A Card Type
- **142.** Damage is a marked value that is applied to Units.
  - **142.1.** Damage is not a Game Object.
  - **142.2.** Damage is a value tracked per-Unit.
  - **142.3.** Damage is marked on Units by players.
  - **142.4.** Damage tracks how close a Unit is to being Killed. See rule 428. Kill for more information.
  - **142.5.** Damage can be Healed. See rule 418. Heal for more information.
- **143.** Units have multiple Intrinsic Properties unique to them:
  - **143.1.** Tag: A Unit has zero or more Tags representing one or more champions, regions, factions, or species it belongs to.
  - **143.2.** Might: The combat statistic of a Unit. Used to determine a Unit's contribution to Combat, as well as when it is Killed by damaging effects.
  - **143.3.** Units can have damage marked on them.
  - **143.4.** Units enter the Board exhausted.
- **144.** Units have the Inherent Ability to perform a Standard Move.
  - **144.1.** This action is limited in when it can be performed.
  - **144.2.** Exhausting the Unit is the Cost for this action.
  - **144.3.** Players may perform multiple Units' standard move simultaneously. This is treated as one game action performed on multiple Units.
  - **144.4.** The Destinations where Units can Move to with their Standard Move are restricted:
- **145.** Units may have Activated Abilities.
  - **145.1.** Activated Abilities are Game Effects that are written as Costs followed by a ":", and then succeeded by an effect. See rule 376. Activated Abilities for more information.
  - **145.2.** The Activated Ability of Units may be executed at any time during the controlling player's Main Phase during an Open State, and not during a Showdown.
- **146.** Units have a Location.
  - **146.1.** A Unit’s Location is the Base or Battlefield it currently occupies. See rule 197. Locations for more information.

## Gear

*Gear ENTER READY, and can only be played to Base unless stated.*

- **147.** Gear
- **148.** Gear are:
  - **148.1.** A Game Object
  - **148.2.** A Card Type
- **149.** Gear have several Intrinsic Properties unique to them.
  - **149.1.** Gear enter play Ready.
  - **149.2.** Gear can only be played to a player's Base unless an effect specifies otherwise.
  - **149.3.** If an unattached non-Unit Gear is at a Battlefield for any reason during a cleanup, then it is recalled to its controller's Base as a corrective action. See rule 454. Recalls for more information. See rule 318. Cleanups for more information.
- **150.** Gear can have the Equipment tag.
  - **150.1.** These Gear are referred to as Equipment.
  - **150.2.** Equipment have effect text and a Might bonus. See rule 136. Effect Text for more information on effect text. See rule 137. Might Bonus for more information on Might bonuses.
  - **150.3.** Equipment can have the Equip or Quick-Draw keywords. See rule 818. Equip for more information on the Equip keyword. See rule 819. Quick-Draw for more information on the Quick-Draw keyword.
  - **150.4.** Equipment are still Gear and have the same intrinsic properties and rules that Gear do.
  - **150.5.** Equipment and whether a Gear has the Equipment tag is a characteristic of the Gear may be checked or referenced by other Game Effects.
- **151.** Gear may have Activated Abilities.
  - **151.1.** Activated Abilities are Game Effects that are written as Costs followed by a ":", and then succeeded by an effect. See rule 376. Activated Abilities for more information.
  - **151.2.** The Activated Ability of Gear may be executed at any time during the controlling player's Main Phase during an Open State, and not during a Showdown.
- **152.** Gear have a Location.
  - **152.1.** A Gear’s Location is the Base or Battlefield it currently occupies. See rule 197. Locations for more information.
  - **152.2.** Non-Unit Gear cannot normally become located at a Battlefield unless by some special means. Example: Gear are played to Base unless an effect specifies otherwise. A gear played from Facedown, which is specified to be played to the Battlefield it was played from, will enter at that Battlefield. Gear can also become located at a Battlefield if they are attached to a unit who becomes located at a Battlefield. A Gear that is a Unit can move to a Battlefield. See rule 811. Hidden for more information. See rule 716. Attachment for more information.

## Spells

- **153.** Spells
- **154.** Spell is a card type.
- **155.** A spell can be played during an Open State outside of Showdowns on its controller's turn.
- **156.** A spell is controlled by the player who played it.
- **157.** A spell creates a game effect according to its instructions and is then placed in the Trash of the player who owns it.
- **158.** When a spell is successfully played, a player executes the rules text of the spell. This is called Resolving the spell.
  - **158.1.** Spells have their rules text executed from top to bottom when they are Resolved.
  - **158.2.** If a later part of a spell applies a Replacement Effect that alters earlier parts of the spell, apply those replacement effects as appropriate. Example: A spell says "Choose a unit. Kill it the next time it takes damage this turn." and "[Legion] — Kill it now instead. (Get the effect if you've played another card this turn.)" If the Legion condition is satisfied, the unit is killed immediately and the instruction to kill it the next time it takes damage is ignored, even if the unit remains on the board somehow. See rule 367. Replacement Effects for more information.
  - **158.3.** While a spell or ability on the chain is Resolving, no other spells or abilities can be finalized on the chain or resolved, including triggered abilities or game effects that would occur as a result of the execution of the spell.
- **159.** Certain Keywords on spells are not executable rules text, but instead intrinsic properties of the spell.
  - **159.1.** These determine inherent properties and behaviors of the spell before being played or while on the chain.
  - **159.2.** These keywords are:

## Runes, resources, Rune Pool

*Runes -> Energy (generic) or Power (domain-typed). RUNE POOL EMPTIES at start of Main Phase and end of turn => all resource loops are TURN-SCOPED.*

- **160.** Runes
- **161.** Rune is a Card Type.
  - **161.1.** A Rune is not a Main Deck card.
    - **161.1.a.** This means, despite remaining on the Board until Recycled or otherwise removed from the board, it is not a Permanent.
  - **161.2.** Runes are kept in the Rune Deck.
    - **161.2.a.** Exactly 12 Rune cards chosen during Deck Construction. See rule 103.3. Rune Deck for more information.
    - **161.2.b.** When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck. See rule 416. Recycle for more information.
- **162.** Runes produce the resources needed to pay costs.
- **163.** Runes produce Energy and Power.
  - **163.1.** Energy is used to pay numeric Energy costs.
    - **163.1.a.** Energy has no Domain.
    - **163.1.b.** Energy has no type.
  - **163.2.** Power is used to pay Domain-associated Power Costs.
    - **163.2.a.** Power has a Domain.
      - **163.2.a.1.** Power's Domain usually corresponds to the Domain of the Rune that produced it.
    - **163.2.b.** Some Power is Universal and can be used to pay for costs of any Domain.
- **164.** Basic Runes
  - **164.1.** There are six Basic Runes, each with a Domain corresponding to its name: Fury Rune Calm Rune Mind Rune Body Rune Chaos Rune Order Rune
  - **164.2.** A Basic Rune always has the following two Abilities:
    - **164.2.a.** [E]: [Reaction] — Add [1].
    - **164.2.b.** Recycle this: [Reaction] — Add [C].
      - **164.2.b.1.** The Power added this way corresponds to the Domain of the Rune that is being Recycled.
- **165.** Rune Pools
- **166.** The Rune Pool is a conceptual collection of a player's available Energy and Power available to pay Costs.
  - **166.1.** When a card adds Energy or Power, it is added to the controlling player's Rune Pool.
  - **166.2.** Players must add Energy and Power to their Rune Pool in order to be able to spend it to play cards or pay for Abilities with costs.
  - **166.3.** Energy and Power do not have a physical marker or tracker, although players may wish to use a physical tracker if they are retaining unspent Energy and Power over the course of their turn.
- **167.** Every player's Rune Pool empties at the start of each player's Main Phase and the end of each player's turn.
  - **167.1.** Any unspent Energy or Power are lost.
- **168.** All Abilities that include the action "Add" are abilities that are adding Energy or Power to the Rune Pool. See rule 429. Add for more information.

## Battlefields & Legends

*Legends sit in the Legend Zone permanently and dictate Domain Identity.*

- **169.** Battlefields
- **170.** Battlefields are Game Objects.
  - **170.1.** Battlefields are Owned by a player.
  - **170.2.** Battlefields are not shuffled into Decks at the start of a game.
  - **170.3.** Battlefields cannot be Killed during the course of regular play.
  - **170.4.** Battlefields cannot be Moved.
  - **170.5.** Battlefields are Locations.
  - **170.6.** Any number of Units can be present at a Battlefield.
  - **170.7.** Battlefields can be targeted by spells or game effects.
  - **170.8.** Battlefields can have Passive Abilities. See rule 363. Passive Abilities for more information.
  - **170.9.** Battlefields can have Triggered Abilities. See rule 382. Triggered Abilities for more information.
  - **170.10.** Battlefields can have Activated Abilities. See rule 376. Activated Abilities for more information.
  - **170.11.** Battlefields can be referenced in different states in card text:
- **171.** Battlefields are not Permanents.
- **172.** The number of Battlefields on the Board is determined by the Mode of Play.
- **173.** Legends
- **174.** Legends are Game Objects.
  - **174.1.** Legends are Owned by a player.
  - **174.2.** Legends are not shuffled into Decks at the start of a game.
  - **174.3.** Legends cannot be Killed during the course of regular play.
  - **174.4.** Legends cannot be Moved.
  - **174.5.** Legends can be targeted by spells or game effects.
  - **174.6.** Legends can have Passive Abilities. See rule 363. Passive Abilities for more information.
  - **174.7.** Legends can have Triggered Abilities. See rule 382. Triggered Abilities for more information.
  - **174.8.** Legends can have Activated Abilities. See rule 376. Activated Abilities for more information.
- **175.** Legends are not Permanents.
- **176.** Legends may have one or more Domains.
  - **176.1.** The Champion Legend determines the Domain Identity of cards its owner can include. See rule 101. Deck Construction for more information.
- **177.** Multiple Types
- **178.** Game Objects can have multiple types.
  - **178.1.** A Game Object that is more than one type has the properties of all of their types, except where they are mutually exclusive.
  - **178.2.** A Game Object that is more than one type maintains all of the permissions of all types.
  - **178.3.** A Game Object that is more than one type can be affected by Game Effects that modify or interact with any of its types. Example: A unit that is also a gear can be affected by spells and abilities like the Ruination or Thermo Beam that say “Kill all units,” or “Kill all gear.” A unit that is also a gear can be targeted by spells and abilities like Vengeance or Rocket Barrage that say “Kill a unit,” or “Kill a gear.”

## Tokens

*Recruit token = 1 Might domainless unit token.*

- **179.** Tokens
- **180.** Tokens are Game Objects created by spells and abilities during play.
- **181.** Tokens can be represented by anything. Printed tokens are included in Riftbound booster packs, but they are not required to play a token.
- **182.** A token's controller is the controller of the spell or ability that created it, unless the token's type innately determines control or that spell or ability specifies that a different player is the token's controller.
- **183.** A token's owner is the player who controlled the effect that created it.
- **184.** The effect that creates a token may specify the conditions or circumstances under which it enters the board. These stipulations may alter the usual steps for playing a card if the token is played.
  - **184.1.** The effect may state that the token enters ready or exhausted, if that state is contrary to the default for the token's type.
  - **184.2.** The effect may restrict the location to which the token may be played.
  - **184.3.** The effect may grant temporary abilities or modifications to the token.
- **185.** Tokens are not cards.
  - **185.1.** “Token” is an intrinsic category of Game Objects, in the same way “card” is.
  - **185.2.** Tokens have some properties in common with cards.
  - **185.3.** Tokens differ from cards in some ways.
- **186.** Tokens are Created on the board or the Chain and cannot exist elsewhere.
  - **186.1.** If a token is put into any Non-Board Zone besides the chain, it ceases to exist immediately after moving to its new zone.
- **187.** The spell or ability that Creates a token specifies some of its characteristics. It may have other characteristics, as listed below.
  - **187.1.** A 1 [M] Recruit token is a domainless unit token with 1 Might and the Recruit tag.
  - **187.2.** A 3 [M] Sprite token with Temporary is a domainless unit token with 3 Might, the Fae tag, and the Temporary keyword. See rule 816. Temporary for more information.
  - **187.3.** A 2 [M] Sand Soldier token is a domainless unit token with 2 Might and the Shurima tag.
  - **187.4.** A 3 [M] Mech token is a domainless unit token with 3 Might and the Mech tag.
  - **187.5.** A Gold gear token is a domainless gear token with “[Reaction][>] Kill this, [E]: [Add] [A].”
  - **187.6.** A 0 [M] Reflection token is a domainless unit token with 0 Might.
  - **187.7.** A 1 [M] Bird token is a domainless unit token with 1 Might, the Bird tag, and the Deflect keyword. See rule 809. Deflect for more information.
  - **187.8.** A Brush battlefield token is a domainless battlefield token with “Bird, Cat, Dog, Poro, and Ivern units here have +1 [M]” and “When you score here, you may replace this with the battlefield it replaced.”
  - **187.9.** The Baron Pit battlefield token is a domainless battlefield token with “Units can move here from anywhere.”
  - **187.10.** A 1 [M] Tentacle token is a domainless unit token with 1 Might and the Bilgewater tag.
  - **187.11.** A 0 [M] Shadow Clone token is a domainless unit token with 0 Might and “When I attack, you may banish a unit from your trash. If you do, give me [Assault 4] this turn.” See rule 807. Assault for more information.
- **188.** Control
- **189.** Control is the concept of a player having influence of a Game Object and applies differently to different card types.
- **190.** Battlefields
  - **190.1.** Control is established over Battlefields through the course of play.
  - **190.2.** Control is a binary state for Battlefields and an Identifier for players.
  - **190.3.** Control can be Contested through the course of play.
  - **190.4.** Control is established by having Units at a Battlefield at the end of a Showdown or Combat after applying the contested status.
  - **190.5.** Control is a constant state.
  - **190.6.** Control of a Battlefield determines Control of its Abilities.
- **191.** Everything Else
  - **191.1.** When a player Plays, Hides, or Creates a Card or other Game Object, they are established as that Game Object's Controller.
  - **191.2.** For Spells, they are the Spell's Controller.
  - **191.3.** For Permanents and Runes, when they Enter the Board, that player is assigned as that Game Object's Controller.
  - **191.4.** For Abilities, they are the Ability’s Controller.
- **192.** When a game effect or rules text refers to the Controller of a specific object, it can be referring to either context interchangeably.
  - **192.1.** The method of assignment of control is different, but the status of Control is the same across all Game Objects.

## WINNING

*8 points to win. Points from: Hold, Conquer, ABILITIES that grant points, and opponent Burn Out.*

- **193.** Winning
- **194.** Players win Riftbound games primarily through gaining points.
  - **194.1.** Players can gain points a number of ways:
    - **194.1.a.** Holding a Battlefield. See rule 467. Scoring for more information.
    - **194.1.b.** Conquering a Battlefield. See rule 467. Scoring for more information.
    - **194.1.c.** Spells, Triggered Abilities and Activated Abilities that instruct them to gain one or more points.
    - **194.1.d.** When an opponent Burns Out and picks that player to gain 1 point. See rule 431. Burn Out for more information.
  - **194.2.** A player wins the game if, in a cleanup, they have points greater than or equal to the Victory Score and more points than any other player. See rule 318. Cleanups for more information.
    - **194.2.a.** If more than one player has points greater than or equal to the Victory Score, whichever player has more points wins.
    - **194.2.b.** If those players have the same number of points, play continues until one player has more points in a cleanup.
  - **194.3.** The Victory Score is 8 points by default.
    - **194.3.a.** Some game modes or card effects may alter the Victory Score. See rule 481. Modes of Play for more information.
  - **194.4.** Players cannot have less than 0 points.
    - **194.4.a.** If a player would lose 1 or more points while they have 0 points, nothing occurs.
    - **194.4.b.** Any effects that trigger on a player losing points do not trigger.
- **195.** A player also wins the game if an effect instructs them to do so, or if they are the only player remaining in the game.
  - **195.1.** If an effect instructs a player to lose the game, that player is immediately removed from the game. See rule 649. Conceding for more information about being removed from the game.
- **196.** When a player wins the game, the game ends.

## Turn structure & timing states

*Four states: Neutral/Showdown x Open/Closed. Determines when a loop's pieces can legally be activated.*

- **301.** The Turn
- **302.** Play continues cyclically until one player wins.
- **303.** The phases of a turn are rigid, but the actions taken during those steps can be done in any order, unless otherwise specified.
  - **303.1.** Game Actions of any nature are performed one at a time and are executed completely.
  - **303.2.** Game Actions cannot be performed simultaneously for any reason.
- **304.** The Turn Player is the player taking the current turn.
- **305.** When there are no items on the Chain and the Turn Player cannot or chooses not to perform any Discretionary Actions, the current phase or step of the turn ends and the next phase, step, or turn begins.
- **306.** The Turn Player changes when the current Turn Player reaches the End of all of the Phases of their Turn.
- **307.** States of the Turn
- **308.** At any given time, the turn is in either a Neutral State or a Showdown State.
  - **308.1.** If a Showdown or Combat is in progress, the turn is in a Showdown State.
  - **308.2.** If no Showdown or Combat is in progress, the turn is in a Neutral State.
- **309.** At any given time, the turn is in either an Open State or a Closed State.
  - **309.1.** If a Chain exists, the turn is in a Closed State.
  - **309.2.** If no Chain exists, the turn is in an Open State.
- **310.** These descriptions can be combined, such that the turn is always in one of these four states:
  - **310.1.** Neutral Open: There is no Showdown or Combat in progress and no Chain exists.
  - **310.2.** Neutral Closed: There is no Showdown or Combat in progress and a Chain exists.
  - **310.3.** Showdown Open: A Showdown or Combat is in progress and no Chain exists.
  - **310.4.** Showdown Closed: A Showdown or Combat is in progress and a Chain exists.
- **311.** Priority and Focus
- **312.** At any given time, up to one player has Priority.
  - **312.1.** Priority is the singular exclusive right to take Discretionary Actions. See rule 410.1. Discretionary Actions for more information.
  - **312.2.** A player receives Priority at the following times:
  - **312.3.** When a player is granted Priority, it is either created if no player has it or taken from the player with Priority.
- **313.** At any given time, up to one player has Focus.
  - **313.1.** Focus is the permission to take appropriately timed Discretionary Actions when the turn is in a Showdown Open State. See rule 307. States of the Turn for more information.
  - **313.2.** A player who gains Focus also gains Priority.
  - **313.3.** A player who passes Priority retains Focus.
  - **313.4.** A player may not make discretionary actions with Focus unless they also possess Priority.
  - **313.5.** If the turn is in a Neutral State, no player has Focus.
- **314.** Phases of the Turn
- **315.** Start of Turn
  - **315.1.** Awaken Phase
  - **315.2.** Beginning Phase
  - **315.3.** Channel Phase
  - **315.4.** Draw Phase
- **316.** Main Phase
  - **316.1.** When all steps of the Start of Turn have been completed, the Main Phase begins.
  - **316.2.** The following Tasks become Outstanding in the specified order:
  - **316.3.** 1. Each player's Rune Pool empties. Any unspent Energy and Power are lost. See rule 165. Rune Pools for more information.
  - **316.4.** 2. At the start of Main Phase game effects take place.
  - **316.5.** The Main Phase has no defined structure.
  - **316.6.** As a result of a player taking Discretionary Actions, one or more structured phases may occur.
  - **316.7.** Combat
  - **316.8.** Showdowns
  - **316.9.** When a player has no more Discretionary Actions they wish to execute, they must indicate they are ending their turn.
- **317.** Ending Phase
  - **317.1.** Ending Step
  - **317.2.** Expiration Step
  - **317.3.** The next player with their Turn queued becomes the Turn Player.
- **318.** Cleanups
- **319.** A Cleanup will be made an Outstanding Task at the following times:
  - **319.1.** After the game transitions to or from an Open or Closed state
  - **319.2.** After the game transitions between Phases, unless specified otherwise
  - **319.3.** After a Pending Item is added to the Chain
  - **319.4.** After a Pending Item becomes a Finalized Item on the Chain
  - **319.5.** After a Chain Item is removed from the Chain for any reason
  - **319.6.** After any number of Game Objects enter or leave the Board
  - **319.7.** After the status of any number of Game Objects changes for any reason
  - **319.8.** After a Move is completed
- **320.** While a Cleanup is occurring, Chain Items cannot be Finalized or Resolved.
  - **320.1.** New Pending Items can be added, but Finalized Items cannot be executed and Priority and Focus are not passed or awarded.

## Windows of opportunity, the Chain

- **326.** Players can act during the following Windows of Opportunity that occur during the course of regular play:
  - **326.1.** During a Chain
  - **326.2.** During a Showdown
- **327.** Chains
- **328.** The Chain is a Non-Board Zone that temporarily exists whenever a card is played or an ability is activated.
  - **328.1.** Cards, abilities, and tokens are placed here as part of the process of being played. See rule 349. The Process of Play for more information. See rule 360. Abilities for more information on Abilities.
- **329.** Cards, tokens, and abilities added to the chain are added as Pending Chain Items that become Finalized Chain Items.
  - **329.1.** Pending Items are on the Chain.
  - **329.2.** Chain Items are Pending until the “Check Legality” step of playing a card. See rule 349. Playing Cards for more information.
  - **329.3.** When a Pending Chain Item is no longer Pending it is finalized and becomes a Finalized Chain Item.
- **330.** The Chain exists as long as a Chain Item is on it.
  - **330.1.** Only one Chain can exist at a time.
  - **330.2.** If a card or token would begin to be played while a Chain already exists, it is placed on the existing Chain.
- **331.** The State of the Turn is partially determined by whether or not the Chain currently exists.
  - **331.1.** The turn is said to be in a Closed State if a Chain exists.
  - **331.2.** The turn is said to be in an Open State if no Chain exists.
- **332.** Handling Tasks and Resolving Chain Items
- **333.** A Task is one or more steps or processes that one or more Players must perform before continuing with any other actions.
  - **333.1.** Tasks include, but are not limited to: Cleanups, the actions performed during the Start of Turn Process, throughout Combat in its various steps, and the actions performed during the End of Turn Process. See rule 318. Cleanups for more information on Cleanups See rule 315. Start of Turn for more information on the Start of Turn process See rule 459. Combat for more information on the steps of Combat See rule 317. Ending Phase for more information.
- **334.** Whenever a Player takes one or more actions that incur Tasks they should refer to the process of HOT FEPR: Handle Outstanding Tasks; then Finalize, Execute, Pass, Resolve.
  - **334.1.** In the course of Handling Outstanding Tasks, Chain Items may be added to the Chain. They will remain there until the Tasks are complete.
  - **334.2.** When all Outstanding Tasks are completed, all pending Chain Items will subsequently be processed by the FEPR process.
- **335.** If there are no Outstanding Tasks, no pending Chain Items, no ongoing Showdown or Combat, and it is the Main Phase, the Turn Player receives priority. If there are no Outstanding Tasks, no pending Chain Items, no ongoing Showdown, and it is any other phase of the turn, proceed to the next substep, step, phase, or turn.
  - **335.1.** If there are no Outstanding Tasks, no pending Chain Items, and there is an ongoing Showdown, the player with Focus receives priority.
- **336.** When there are no outstanding Tasks and there are pending Chain Items on the Chain, players should refer to the FEPR process to proceed.
  - **336.1.** In the sequence of resolving FEPR more Chain Items may become Pending Chain Items. These will be processed by the same FEPR process that produced them.
- **337.** Step 1: Finalize
  - **337.1.** If there is at least one Chain Item Pending, the controller of the oldest Pending Chain Item must complete the steps of Playing that Pending Item until it is a Finalized Item or leaves the Chain. See rule 349. Playing Cards for more information on finalizing chain items.
  - **337.2.** If, after finalizing the Chain Item, that item is a Unit, Gear, or an ability that Adds resources, it resolves immediately—Move to Step 4: Resolve. See rule 349. Playing Cards for more information.
  - **337.3.** If, after finalizing the Chain Item, there are still Pending Chain Items, return to step 1. Finalize.
  - **337.4.** If, after finalizing the Chain Item, there are no more items on the chain to be Finalized, the controller of the next item on the chain gains Priority. Move to step 2: Execute.
- **338.** Step 2: Execute
  - **338.1.** The player with Priority may do any the following:
- **339.** Step 3: Pass
  - **339.1.** If all players have passed Priority in sequence without adding any items to the Chain, proceed to Step 4: Resolve.
  - **339.2.** Otherwise, the player with Priority passes Priority to the next Player in Turn Order. Return to Step 2: Execute.
- **340.** Step 4: Resolve
  - **340.1.** The newest Finalized Chain Item resolves. Execute its game effects in their entirety. See rule 349. Playing Cards for more information on resolving spells. See rule 398. Playing or Activating Abilities for more information on resolving abilities.
  - **340.2.** If the Chain is empty, play proceeds in an Open State.
  - **340.3.** If the Chain is not empty and there are one or more Pending Items, return to Step 1: Finalize.
  - **340.4.** If the Chain is not empty and there are no Pending Items, the controller of the newest item on the chain gains Priority. Return to Step 2: Execute.

## Showdowns

- **341.** Showdowns
- **342.** A Showdown is a Window of Opportunity in which Players have an Open State in which they may play Spells in an alternating fashion.
  - **342.1.** Each spell played this way creates a Chain as normal.
- **343.** The State of the turn is partially determined by whether or not a Showdown or Combat is in progress.
  - **343.1.** The turn is said to be in a Showdown State if a Showdown or Combat is in progress.
  - **343.2.** The turn is said to be in a Neutral State if no Showdown or Combat is in progress.
- **344.** A Showdown begins when Control of a Battlefield is Contested during a Cleanup and the turn is in a Neutral Open State.
  - **344.1.** If Control of a Battlefield is Contested between two players, then a Showdown will be opened as the first step of Combat. If a Showdown is already ongoing at that Battlefield, it will become a Combat Showdown and a Combat will initiate there. See rule 459. Combat for more information.
  - **344.2.** If Control of a Battlefield is Contested, there aren’t units controlled by different players there, and the turn is in a Neutral Open State, a Showdown is opened during the next Cleanup. See rule 318. Cleanups for more information.
- **345.** As a Showdown begins, the player who applied Contested status to the Battlefield gains Focus.
- **346.** When the last item on the chain resolves and the turn returns to an Open State during a Showdown, Focus passes, and the next Player gains both Focus and Priority.
  - **346.1.** Focus will not pass in this way if the chain opened as a result of a triggered ability being added to the chain, nor if it opened as a result of an Add ability being added to the chain. Example: the Combat Chain opens as a result of triggered abilities being added to the chain, so when the last item on the Combat Chain resolves and the turn returns to an Open State, Focus will not pass.
- **347.** During a Showdown, the player with Focus may do one of the following:
  - **347.1.** Play a Card or Activated Ability that is legally timed.
  - **347.2.** Pass.
- **348.** If all players pass Focus without playing a spell or activating an ability, then the Showdown Closes.
  - **348.1.** If it is a Combat Showdown, proceed with the remaining steps of Combat to resolve the phase. See rule 463. The Steps of Combat for more information.
  - **348.2.** If it is a Non-Combat Showdown, do the following:
- **349.** Playing Cards
- **350.** Playing a card is the act of a player utilizing their cards.
  - **350.1.** A card is Played when it has finished this process in its entirety.
  - **350.2.** Tokens are not cards, but can still be Played. See rule 179. Tokens for more information.
- **351.** Cards have different behaviors when played.
  - **351.1.** Permanents become Game Objects when Played.
  - **351.2.** Spells create game effects that are executed, then the card is placed in the trash when Played.

## Replacement effects & per-turn limiters

*'Once each turn' / 'N times each turn' replacement effects are the DESIGNED LOOP BREAKERS. Check every candidate against these.*

- **367.** Replacement Effects
- **368.** An ability that alters the application of another game effect or game rule.
  - **368.1.** Passive Abilities can be Replacement Effects.
- **369.** Replacement Effects intercede during the execution of a Game Effect and alter its execution.
  - **369.1.** A Replacement Effect can usually be identified by the presence of the terms “as,” “would,” or "instead." Example: Zhonya's Hourglass reads "The next time a friendly unit would die, kill this instead. Heal that unit, exhaust it, and recall it." This is a replacement effect that alters the execution of any Game Effect that would kill a friendly unit. Example: Undertitan is a unit that reads in part “As I’m revealed from your deck, [Add] [2].” This is a replacement effect that alters the execution of any Game Effect that reveals Undertitan from your deck.
  - **369.2.** Some Game Actions are themselves Replacement Effects. Example: Burning Out is a replacement effect.​ Example: Preventing Damage is a replacement effect.
  - **369.3.** Replacement Effects that apply to a unit as it enters the Board can be identified by describing how the unit enters, or by describing a game action that occurs “as” a unit enters. Example: Master Yi, Honed reads “I enter ready.” This applies a replacement effect to the way that units normally enter. The event of him entering exhausted is replaced by one where he enters ready. Example: Baron Nashor reads “As you play me, add the Baron Pit battlefield token to the board if it's not there already. If you do, I enter there.” The last sentence of his ability is a replacement effect that replaces the event of him entering at his original play location with him entering at the Baron Pit if it was created.
- **370.** A Replacement Effect can alter the typical flow of play, including other cards' executions.
  - **370.1.** Replacement Effects apply to any event or instruction that qualifies for their application. A Replacement Effect will specify the circumstances by which an event or instruction will qualify to be replaced.
    - **370.1.a.** An event is the singular moment that results from a Game Action being performed or from a Game Object changing state. Example: The moment that results from a unit being killed is an event that can be referenced by game effects, or even skipped entirely. Example: The moment that results from a unit becoming Mighty is an event that can be referenced by game effects, or even skipped entirely.
      - **370.1.a.1.** Modifying or replacing an event is the same as modifying or replacing that Game Action or change in state that generated that event. Example: Zhonya’s Hourglass reads in part “If a friendly unit would die, kill this instead. Heal that unit, exhaust it, and recall it.” A unit’s death being replaced by Zhonya’s Hourglass is the same as the kill action that caused that death not occurring. Example: A card reads in part “The next time an enemy unit would become Mighty this turn, banish it instead. Its controller plays a 3 [M] Mech unit token to its location.” A unit becoming Mighty being replaced by this effect means the unit never became Mighty—no effects that trigger on units becoming Mighty will trigger.
      - **370.1.a.2.** An event can occur simultaneously with other events only when those events are all the result of the same Game Action or change in state occurring. Example: A spell reads in part “Kill up to two units at battlefields.” When that spell resolves, the units targeted are killed simultaneously because their deaths result from the same game action. Example: A spell reads in part “Kill a friendly unit. If you do, kill an enemy unit with no more Might than it.” When that spell resolves, the units are not killed simultaneously. There are two kill game actions being performed in the instructions of the spell. The friendly unit is killed first, followed by the enemy unit.
    - **370.1.b.** When a Replacement Effect applies, it replaces the qualifying event with one or more Game Actions or events, or the qualifying instruction with another instruction.
      - **370.1.b.1.** In the case of Replacement Effects that describe a game action to occur “as” an event occurs, the described event is replaced by that same event plus the game action being performed. Example: Undertitan is a unit that reads in part “As I’m revealed from your deck, [Add] [2].” The event of Undertitan being revealed from your deck is replaced by Undertitan being revealed from your deck and adding [2] Energy to your Rune Pool.
    - **370.1.c.** Replacement Effects are applied before any qualifying event has actually occurred.
  - **370.2.** A Replacement Effect can only be applied once to an event, or to any Game Actions or events that replace that event. Example: A player plays a spell that reads “gear you control become 1 [M] gear units this turn.” They control two copies of Zhonya’s Hourglass when the spell resolves. If one of those copies is killed, both of their Replacement Effects will be applied. Whichever is applied first, that Replacement Effect can’t be applied again. When it is applied, it kills its source, which creates an event the other can apply its Replacement Effect to. Once they’ve both applied their Replacement Effect to the original death event and the event that replaced it, they cannot go any further. At that point, whichever Zhonya’s Hourglass applied its Replacement Effect last will die.
  - **370.3.** If a Game Object has a Replacement Effect that is active in a specific zone, it is evaluated and subsequently applied if it enters that zone before an event occurs that it could replace. Example: A unit that reads “if a unit you control would die, you may banish me from your trash instead. If you do, heal that unit, exhaust it and recall it.” The first unit dies simultaneously with a 1 [M] Recruit token. It does not enter the trash before the Recruit dies, so it will not be able to replace its death.
  - **370.4.** A Game Object can apply its Replacement Effects to any qualifying events that occur simultaneously with it leaving the zone that its Replacement Effect is active in. Example: Soraka, Wanderer has a Replacement Effect that reads, “If another unit you control here would die, if it has less Might than me, instead heal it, exhaust it, and recall it.” Soraka’s replacement can be applied to any qualifying event that occurs simultaneously with her leaving the board, including to units that die simultaneously with her.
- **371.** Some Replacement Effects will begin with “once each turn,” or “N times each turn.”
  - **371.1.** These Replacement Effects may only be applied to the specified number of events each turn. Once they have been applied to that many events, they cannot be applied to a later event in the same turn.
  - **371.2.** If the Replacement Effect says a player “may” apply the Replacement Effect, the player has the choice of whether or not to apply it.
    - **371.2.a.** When an event the Replacement Effect could apply to occurs, the player who controls the Replacement Effect may choose to apply it to the event.
    - **371.2.b.** If they do not, it has not been applied this turn. Example: Zilean, Time mage reads “Once each turn, if you would play a token unit while I'm at a battlefield, you may play that token and an additional copy of it instead.” When his controller plays a token, they can choose not to apply the replacement effect to that event. If they do, they can choose to apply it to a later event of a token being played.
- **372.** If more than one Replacement Effect applies to the same event being executed, then the controller of the object being acted on determines the order the Replacement Effects will apply.
  - **372.1.** If it is a player being acted on, that player decides the order the Replacement Effects will apply.
  - **372.2.** If the affected object is an Uncontrolled Battlefield then the Current Turn Player decides the order the Replacement Effects will apply.
- **373.** If more than one event occurs simultaneously that Replacement Effects could apply to, each event is treated separately and individually for the purposes of Replacement Effects, and Replacement Effects with the same controller are applied in the order of their controller’s choosing. Example: Two units controlled by the same player die in the same cleanup. That player also controls Zhonya’s Hourglass. They must decide which event to apply Zhonya’s Hourglass to first.
  - **373.1.** Although these events are simultaneous, the applied Replacement Effects are ordered. If multiple applied Replacement Effects with different controllers would execute simultaneously, they execute in turn order.
    - **373.1.a.** When executing Replacement Effects, the Game Actions that comprise their instructions are performed before any simultaneous unmodified events. Example: Two units die simultaneously. One of those units has their death replaced by being healed, exhausted, and recalled. The healing, exhausting, and recalling of that unit will be performed before the other dies.
  - **373.2.** When applying Replacement Effects to events that occur simultaneously, each Replacement Effect may only be applied in one sequence, to any number of events that are qualified to be replaced. Example: Soraka, Wanderer reads “If another unit you control here would die, if it has less Might than me, instead heal it, exhaust it, and recall it.” Soraka dies simultaneously with two 1 [M] Recruit tokens at the same battlefield and two 1 [M] Recruit tokens in base. Soraka has a Guardian Angel attached to her when she dies, which appends “If I would die, kill Guardian Angel instead. Heal me, exhaust me, and recall me” to Soraka’s rules text. There are several possible ways to order the Replacement Effects being applied to the various events: If Soraka’s Replacement Effect is applied first, it saves the Recruits at the same battlefield as her but not the Recruits in base. If the Replacement Effect appended by Guardian Angel then saves Soraka, she cannot apply her Replacement Effect to the Recruits in base as her Replacement Effect has already been applied to an event simultaneous with it dying. If the Replacement Effect appended by Guardian Angel is applied first, it saves Soraka and recalls her - then when Soraka’s Replacement Effect is applied, it can only save the Recruits in base.
    - **373.2.a.** A sequence of Replacement Effects is an uninterrupted series of applications to a set of simultaneous events.
      - **373.2.a.1.** A Replacement Effect that replaces an event or Game Action that is part of another Replacement Effect will not interrupt the sequence of the replaced Replacement Effect’s application.
- **374.** A Replacement Effect’s controller is the player that controls the source of the Replacement Effect.
- **375.** If an event that a Replacement Effect applies to would be modified by the Game Effect that generated that event, or the results of that event would be modified by a Game Action from a linked ability that references the replaced event, the Replacement Effect will inherit those modifications. Example: Treasure Hunter reads “When I move, play a Gold gear token exhausted.” A Replacement Effect that says “if you would play a token gear, play that token and an additional copy instead” is applied to the event of the Gold gear token being played. The additional copy will also be exhausted, as it inherits the “exhausted” modification. Example: Another Replacement Effect says “if you would play a token, draw 1 instead.” The modification from Treasure Hunter’s ability cannot apply, so we ignore it. Example: A spell reads “play a ready 3 [M] Mech token. Then do this: Give it Temporary.” A Replacement Effect that says “if you would play a unit token, play that token and a 1 [M] Recruit token instead” is applied to the event of the Mech token being made. The Recruit token enters ready and is given Temporary.
- **376.** Activated Abilities
- **377.** Activated Abilities are repeatable effects with a cost. They follow a process of going onto the chain and resolving, similar to Playing a Card. See rule 349. Playing Cards for more information.
  - **377.1.** Activated Abilities are recognized by the presence of a ":" in the text of the card, preceded by a cost and succeeded by an effect. Example: "[2]: Draw 1" is an activated ability. The cost is 2 energy. The effect is to draw 1 card.
  - **377.2.** Card text will refer to activating Activated Abilities with the word “use” or “play.”
    - **377.2.a.** If “using” or “playing” an Activated Ability is part of a trigger condition, that condition is fulfilled when the Activated Ability resolves.
    - **377.2.b.** If an Activated Ability has a condition on “using” or “playing” it, that condition must be true in order to activate the ability in question. Example: Ultrasoft Poro reads “[E]: Play two 1 [M] Bird unit tokens with [Deflect]. Use this ability only while I'm at a battlefield.” In order to activate the ability, Ultrasoft Poro must be located at a battlefield.
  - **377.3.** Activated Abilities use the chain.
    - **377.3.a.** Declare activation of the Ability.
      - **377.3.a.1.** The ability goes on the chain but has no card to represent it, so players need to take note that it is now a Closed State.
    - **377.3.b.** Proceed with executing the Chain.
      - **377.3.b.1.** Follow the steps of “Playing or Activating Abilities” in rule 398. This ability will become a Pending Chain Item.
      - **377.3.b.2.** Opponents have an opportunity to respond, as appropriate, as if a card was played onto the chain.
      - **377.3.b.3.** If no further action is taken, execute the Activated Ability.

## Activated & triggered abilities

*Activated abilities: controller's turn + Open State ONLY, unless they carry Action or Reaction.*

- **378.** The controlling player chooses when and whether to activate an Activated Ability.
- **379.** Activated abilities are present on Game Objects and some Spells.
- **380.** Can primarily be activated while on the Board.
- **381.** All Activated Abilities can only be activated on the Controlling Player's Turn and during an Open State.
- **382.** Triggered Abilities
- **383.** Triggered Abilities are repeatable effects that happen when a Condition is met.
  - **383.1.** Triggered Abilities can usually be recognized by the word "when" followed by a game action or event; the word "at" followed by a point in time during the turn sequence; or the phrase “the [Nth] time” followed by a game action or event. Examples: "When you conquer here, you may spend a buff to draw 1." "At the end of your turn, ready 2 runes." “The first time I move each turn, you may ready something else that's exhausted.”
  - **383.2.** Triggered Abilities have a Condition and an Effect.
  - **383.3.** When a Condition is met, a Triggered Ability behaves like an Activated Ability and is placed on the Chain.
  - **383.4.** Some Conditions are commonly used and structured in a way that explicitly defines their use and other properties of the Effect that is associated with it.
- **384.** Presence on Permanents
  - **384.1.** Typically active while on the Board.
  - **384.2.** Triggered Abilities of Permanents are only able to have their Conditions evaluated while on the Board.
- **385.** Presence on Cards outside of the Board
  - **385.1.** Triggered Abilities on cards outside of the Board rely on the Information Level of the zone they are in.
  - **385.2.** Triggered Abilities outside of the Board will self-describe their context. Example: The triggered ability "When you conquer, you may discard 1 to return this from your trash to your hand." triggers while the card it's on is in the trash, and not anywhere else.
- **386.** Reflexive Triggers
- **387.** Reflexive Triggers are a type of Triggered Ability that create one or more Chain Items when their condition is met.
  - **387.1.** Reflexive Triggers can be recognized by the phrase “Do this:” or “Do one of the following:”.
  - **387.2.** Reflexive Triggers will be preceded by their conditions, if any. If no condition is present in the ability then the Reflexive Trigger will always be added to the Chain.
  - **387.3.** If present, the Condition of a Reflexive Trigger will follow the same format as a Triggered Ability.
- **388.** Reflexive Triggers use the Chain.
  - **388.1.** A new ability is created and added to the chain as a Pending Item. See rule 398. Playing or Activating Abilities for more information.
  - **388.2.** If a Reflexive Trigger creates more than one Pending Item it creates them all in order, but does not go beyond the first step of adding them to the Chain. See rule 398. Playing or Activating Abilities for more information.
- **389.** Delayed Abilities
- **390.** Delayed Abilities are a type of Ability that specifies a window of applicability during which they are active.
  - **390.1.** Delayed Abilities can be any other type of Ability, and contain all of the properties of that type in addition to the properties of Delayed Abilities.
  - **390.2.** Delayed Triggers are Triggered Abilities that can be recognized by describing a specific time of the turn, or by structuring a Triggered Ability with a specific frame of time as a restriction.
  - **390.3.** Delayed Replacements are Replacement Effects that can be recognized by specifying the effect they are replacing at a specific time, or “the [Nth] time” in the description of the effect as it resolves.
  - **390.4.** Delayed Passive Abilities are Passive Abilities that are applicable only during a specified window of time. The time that the Delayed Passive Ability applies will be recognized in the effect that initiates it.
  - **390.5.** Delayed Linked Abilities are Linked Abilities that are generated by another Ability and reference that Ability or Game Objects it affects instead of a window of time.
- **391.** Delayed Abilities will resolve or be active just like the ability they augment, but only during the specified time in the effect that created the Delayed Ability. Example: Ravenborn Tome reads “The next spell you play this turn deals 1 Bonus Damage.” This is a Delayed Passive Ability that passively adds 1 Bonus Damage to just the next spell played. The next spell is a specific time, and the 1 Bonus Damage is a passive ability. Example: Noxian Guillotine reads “Choose a unit. Kill it the next time it takes damage this turn.” When the chosen unit takes damage is the specified time, and killing it is the condition for a Delayed Triggered Ability.
- **392.** Delayed Abilities are not associated with Units or Gear; they are created by other Abilities or Spells. As such they are executed when their condition and/or specified time occurs regardless of whether the source of the Delayed Ability is still on the board or not.
- **393.** Linked Abilities
- **394.** Linked Abilities are a set of Abilities with one or more of the component Abilities referencing the other Abilities in the set.
  - **394.1.** Component Abilities can reference other Abilities in the set by means of referencing those Abilities directly or by referencing Game Objects affected by or mentioned in another Ability in the set.
- **395.** In order for a set of Abilities to be Linked, they must be present in the printed Effect or Rules Text of the same Game Object, or be granted by the same source to another Game Object. Example: The Zero Drive is an Equipment gear whose rules text reads in part “[3][B], Banish this: Play all units banished with this, ignoring their costs.” The Zero Drive’s effect text reads “[Deathnkell][>] Banish me.” The granted deathknell ability is linked with the Zero Drive’s activated ability.
- **396.** Linked Abilities can contain component Abilities of any type.
- **397.** A component Linked Ability that references a Game Object affected by another Ability in the set may only interact with Game Objects affected by the Abilities it is Linked with. Example: The Zero Drive is an Equipment gear whose rules text reads in part “[3][B], Banish this: Play all units banished with this, ignoring their costs.” Any units banished by effects other than component Linked Abilities in the same set as the activated ability cannot be played when resolving the activated ability.
- **398.** Playing or Activating Abilities
- **399.** Playing or activating Abilities follows the same steps of playing cards.

## Draw & Burn Out

*DANGER: drawing from an empty deck causes Burn Out, which gives an OPPONENT a point. Infinite draw is a LIABILITY.*

- **413.** Draw
  - **413.1.** Drawing a card takes a single card from a zone and adds it to the player's Hand.
    - **413.1.a.** Unless specified otherwise, drawing takes cards from the top of the Main Deck.
  - **413.2.** This is a Limited Action.
    - **413.2.a.** Each player draws 1 during the Draw Phase on their turn.
    - **413.2.b.** The player may draw cards when instructed to do so by other game effects.
  - **413.3.** This action, when instructed, is formatted as "Draw X."
  - **413.4.** If a player attempts to draw more cards than are available in their Main Deck, they do the following:
    - **413.4.a.** Draw as many as possible.
    - **413.4.b.** Perform a Burn Out. See rule 431. Burn Out for more information.
    - **413.4.c.** Draw the remaining cards needed to complete the Draw action.

## Exhaust / Ready

*An already-Ready object cannot be Readied again. Ready is what resets an exhaust-cost engine.*

- **414.** Exhaust
  - **414.1.** Exhausting is an action that marks a non-spell Game Object on the board as "spent."
    - **414.1.a.** To mark it, rotate the card 90 degrees opposite of Readying, so that the orientation of the card is lengthwise in front of you.
    - **414.1.b.** A Game Object that is already Exhausted cannot be Exhausted again.
    - **414.1.c.** If a Game Object is instructed to be Exhausted while it is already Exhausted, nothing additional happens.
  - **414.2.** "Exhausted" is a state for Game Objects on the board that other game effects and rules can reference.
  - **414.3.** This is a Limited Action.
    - **414.3.a.** Most Exhaust actions will be costs for Activated Abilities or Discretionary Actions. Example: A unit's Standard Move exhausts the unit as a cost.
  - **414.4.** When Exhausting is listed as a Cost, then the Action must be able to be completed for the cost to be paid. Example: A spell says "As an additional cost to play this, you may exhaust a friendly unit." An exhausted friendly unit may not be exhausted again as the additional cost for the spell, and the additional cost has not been paid.
  - **414.5.** In abilities, the Exhaust symbol represents the cost "Exhaust this" or "Exhaust me." It resembles a card turning sideways.
- **415.** Ready
  - **415.1.** Readying is an action that marks a non-spell Game Object on the board as available for action.
    - **415.1.a.** To mark it, rotate the card 90 degrees opposite of Exhausting, so that it is vertically oriented in front of you.
    - **415.1.b.** A Unit that is already Ready cannot be Readied again.
    - **415.1.c.** If a Unit is instructed to be Readied while it is already Ready, nothing additional happens.
  - **415.2.** "Ready" is a state for Game Objects on the board that other game effects and rules can reference.
  - **415.3.** This is a Limited Action.
    - **415.3.a.** A player Readies all non-spell Game Objects they Control during the Awakening Phase on their turn.
    - **415.3.b.** Players may also Ready Game Objects on the board when effects or spells instruct them to do so.

## Recycle

*Recycle goes to the BOTTOM of the Main Deck (or Rune Deck), not to hand.*

- **416.** Recycle
  - **416.1.** Recycling cards is the action in which a player takes one or more cards from a specific zone and then puts it on the bottom of the corresponding deck.
  - **416.2.** This is a Limited Action.
  - **416.3.** When Recycling is listed as a Cost, the action must be able to be completed for the cost to be paid. Example: Vi, Destructive has the ability "Recycle 1 from your trash: Give me +1 [M] this turn." Each time a player activates the ability, they must recycle 1 card from their trash to pay its cost. If they have no cards in their trash, they can't activate the ability, because they can't pay its cost.
  - **416.4.** When Recycling is part of an effect, a player must Recycle as many cards as possible from the specified zone or zones.
  - **416.5.** If 2 or more cards are Recycled to the Main Deck simultaneously, they are placed on the bottom of that deck in a random order. Example: Garbage Grabber has the ability "Recycle 3 from your trash, [1], [E]: Draw " To pay the cost of activating this ability, its controller chooses 3 cards from their trash and places them on the bottom of their Main Deck in a random order.
  - **416.6.** This action, when instructed, is sometimes formatted as "Recycle X from [Zone]." That means to take X cards of the instructed player's choice from the relevant zone and recycle them. Such an instruction does not target the recycled cards. Example: Dr. Mundo, Expert has the ability "At the start of your Beginning Phase, recycle 3 from your trash." As that ability resolves, its controller recycles 3 cards from their trash. If there are fewer than 3 cards in that player's trash, they recycle as many as they can.

## Damage, Heal, Play, Move

- **417.** Deal
  - **417.1.** Spells, Units, Abilities, and other game effects may Deal Damage to units.
  - **417.2.** Only Damage can be Dealt.
  - **417.3.** Dealing Damage is a Limited Action.
  - **417.4.** Dealing can have the intrinsic property of Bonus Damage.
  - **417.5.** Bonus Damage is a property granted to the action of Dealing and alters the amount of Damage distributed by this action. See rule 712. Bonus Damage for more information.
  - **417.6.** Deal actions can originate from one or more sources.
  - **417.7.** Deal actions can distribute Damage as part of combat actions or non-combat actions.
- **418.** Heal
  - **418.1.** Damage being cleared from Units is Healing.
  - **418.2.** More than one Unit can be Healed at the same time.
  - **418.3.** Healing is a Limited Action.
- **419.** Play
  - **419.1.** A player Plays cards by placing them on the chain and queuing them to be finalized. See rule 349. Playing Cards for more information on playing cards. See rule 337. Finalize for more information on finalizing cards.
  - **419.2.** This is a Discretionary Action.
  - **419.3.** Game effects may result in cards being played as part of their resolution.
  - **419.4.** Some Abilities trigger when cards are played or otherwise check whether cards have been played.
- **420.** Move
  - **420.1.** Moving is the act of a Game Object moving between two Locations on The Board. See rule 445. Movement for more information on movement.
  - **420.2.** Moving is a Limited Action.
  - **420.3.** The Standard Move inherent to Units is a Discretionary Action.
- **421.** Hide
  - **421.1.** Hiding a card is the act of placing a card facedown at a Battlefield you control.
  - **421.2.** Hiding is a Discretionary Action.
  - **421.3.** Cards that are facedown at Battlefields have their gameplay properties and permissions defined by the effect that put them there. Example: Cards that players Hide with the Hidden keyword can be Played for [0] on any subsequent turn as a property of the Hidden keyword.
  - **421.4.** If a facedown card would change zones or if the game ends, its owner reveals it to all players. See rule 128. Privacy for more information.

## Discard, Counter, Kill, Banish

- **422.** Discard
  - **422.1.** Discarding a card is moving it from a player's hand directly into their trash without activating or executing its normal rules text.
  - **422.2.** Discarding is a Limited Action.
  - **422.3.** When Discarding is listed as a Cost, then the Action must be able to be completed for the cost to be paid. Example: A card has the ability "Discard 2: Deal 2 damage to a unit at a battlefield." To activate the ability, the card's controller must have at least 2 cards in hand and must be able to discard them.
  - **422.4.** When Discarding is part of an effect, then a player must Discard as many cards as possible from their hand. If instructed to discard more cards than they have in their hand, further discard instructions are ignored. Example: Undercover Agent has the ability "[Deathknell][>] Discard 2, then draw 2. (When I die, get the effect.)" If Undercover Agent's controller has 2 or more cards in hand, they must discard 2. If they have 1 card in hand, they discard 1, and the rest of the discard instruction is ignored. If they have no cards in hand, the entire discard instruction is ignored. Regardless of how many cards they discard, they then draw 2.
  - **422.5.** This action is formatted as "Discard X."
- **423.** Stun
  - **423.1.** Stunning is the act of selecting one or more Units on the Board and rendering them Stunned.
  - **423.2.** Stunning is a Limited Action.
- **424.** Reveal
  - **424.1.** Revealing is the act of presenting a card to all players from a zone that one or more players do not have access to the information of.
  - **424.2.** Revealing is a Limited Action.
  - **424.3.** This action is formatted as "Reveal cards from [zone]." or “Reveal [Zone].” Example: "Reveal 2 cards from the top of your Main Deck" would be executed by taking the two cards from the top of your Main Deck, and then presenting them to all players to clearly read and understand at the table. Then, when all players have had a chance to understand the revealed information, return them to the top of the Main Deck in the same order.
  - **424.4.** Game Effects can manipulate or modify the cards Revealed while they are Revealed
- **425.** Counter
  - **425.1.** Countering is the act of negating the execution, activation, or otherwise playing of a card or ability by a player.
  - **425.2.** Countering is a Limited Action.
  - **425.3.** This action is formatted as "Counter [a card or ability on the chain]."
- **426.** Buff
  - **426.1.** Buffing is the action of placing a Buff counter on a Unit. See rule 701. Buffs for more information.
  - **426.2.** Buffing is a Limited Action.
  - **426.3.** This action is formatted as "Buff [one or more units]." e.g., "Buff a unit." e.g., "Buff a friendly unit." e.g., "Buff two friendly units at the same battlefield."
- **427.** Banish
  - **427.1.** Banishing is the action of placing a card from any other zone into Banishment. See 108.6. Banishment for more information.
  - **427.2.** When a card is Banished it is placed directly into the Banishment zone from its origin.
  - **427.3.** Cards and effects can refer to cards that were banished by the same object.
  - **427.4.** Banishing is a Limited Action.
  - **427.5.** This action is formatted as "Banish [one or more permanents or cards]." e.g., "Banish a card from your hand." e.g., "Banish 2 cards from your trash." e.g., "Look at the top 2 cards of your Main Deck. Draw one of them and banish the other."
- **428.** Kill
  - **428.1.** Killing is the action of a Permanent going to the trash from the board.
  - **428.2.** When a permanent is killed it is placed directly in the trash from its place of origin.
  - **428.3.** Killing is a Limited Action.
  - **428.4.** Killing can also be the result of resolving a Cleanup.
  - **428.5.** Killing can be attributed to one or more Game Objects.
  - **428.6.** This action is formatted as "Kill [one or more permanents]." e.g., "Kill an enemy unit." e.g., "Kill this, [2]: Draw 1." e.g., "Kill all gear."

## Adding resources

*Reaction-tagged Add abilities can be activated ANY time resources are needed - including mid-cost-payment. This is what enables 'floating power'.*

- **429.** Add
  - **429.1.** Adding is the action of putting resources into a player's Rune Pool.
  - **429.2.** Triggered and activated abilities that Add resources resolve as soon as they are finalized.
    - **429.2.a.** Priority and Focus will not pass from Add abilities being finalized or resolving, and will resolve before any other outstanding items on the chain are finalized.
    - **429.2.b.** Spells that Add resources will linger on the chain as normal when they are finalized.
  - **429.3.** Activated abilities that Add resources and have the Reaction tag can be activated at any time that spells or abilities require resources be paid. Example: A player can add Energy and Power through any means before initiating the process of playing a spell. After initiating that process, in the Pay Costs step, they may activate Add Reactions to add Energy or Power to pay costs. Example: A player moves two units to a battlefield where their opponent controls a Mageseeker Investigator. Although they have no window of priority, they may activate Add Reactions to pay for the applied cost from Mageseeker Investigator, and those abilities finalize and resolve immediately.
    - **429.3.a.** When an Add ability is activated in this way, it immediately finalizes and resolves, even during the resolution of spells and abilities.
  - **429.4.** Adding is a Limited Action.
    - **429.4.a.** Players may only Add resources when Game Effects direct them to do so.
  - **429.5.** This action is formatted as "Add [one or more resources]." e.g., "Add [2]." means "Add 2 Energy." e.g., "[E]: Add [Y]." means "Add 1 Power of the Order domain." e.g., "Add [1][G]." means "Add 1 Energy and 1 Power of the Calm domain."
- **430.** Channel
  - **430.1.** Channeling is the action of taking one or more Runes from the top of a player's Rune Deck and putting them on the board.
  - **430.2.** The Game Effect that instructs a player to channel 1 or more runes may specify the conditions or circumstances under which those runes enter the board. Example: A spell reads "Channel 1 rune exhausted." As that spell resolves, its controller puts the top rune of their rune deck onto the board and that rune enters the board exhausted rather than ready.
    - **430.2.a.** By default, runes are channeled readied.
  - **430.3.** If there aren’t sufficient runes in the Rune Deck, channel as many as possible.
  - **430.4.** Channeling is a Limited Action.
    - **430.4.a.** A player Channels two Runes during the Channel Phase on their turn.
    - **430.4.b.** Players may also Channel runes when Game Effects direct them to do so.
  - **430.5.** This action is formatted as "Channel X rune(s)," optionally followed by conditions or stipulations. e.g., "Channel 1 rune." e.g., "When you play me, channel 1 rune exhausted." e.g., "Channel 2 runes exhausted. If you couldn't channel 2 runes this way, draw 1."

## BURN OUT

*Burn out: recycle trash into deck, and an OPPONENT GAINS A POINT. Repeated burn out loses you the game.*

- **431.** Burn Out
  - **431.1.** Burning Out is an action a player must perform if they attempt to move one or more cards from their Main Deck to any other zone in excess of the number of cards remaining in their Main Deck:
    - **431.1.a.** If a player must Draw cards in excess to the number of cards in their Main Deck, they will Draw as many as possible, perform this action, then Draw the remaining amount instructed.
    - **431.1.b.** If a player must put one or more cards from their Main Deck in any other zone, such as the Trash, in excess of the number of cards in their deck they will do so as much as possible, perform this action, and then complete the remaining number required by the instruction.
    - **431.1.c.** If an instruction directs a player to look at or reveal cards in excess to the number of cards in a player’s Main Deck, that player looks at or Reveals as many as possible, but does not Burn Out, then proceeds with the rest of the instruction.
      - **431.1.c.1.** If there are insufficient cards among the looked at or revealed cards to perform subsequent actions to the revealed or looked at cards, any further instructions are ignored. This does not cause a Burn Out, even if those instructions would cause those cards to change zones. Reminder: Cards are considered in the zone of origin while being looked at or revealed, in this case the Main Deck.
  - **431.2.** To Burn Out, a player does the following in sequence:
    - **431.2.a.** Performs as much of the prescribed action as possible.
    - **431.2.b.** Recycles their trash into their Main Deck. Reminder: When multiple cards are Recycled to the Main Deck at the same time, those cards must be randomized
    - **431.2.c.** Chooses an opponent to gain 1 point.
    - **431.2.d.** Completes the remainder of the action that caused them to burn out. Example: A player attempts to draw 1 during their Draw Phase while their Main Deck is empty. That player instead recycles their trash into their Main Deck, randomizing it as normal, then chooses an opponent to gain 1 point, and then draws 1.
  - **431.3.** A player's Main Deck may remain empty as they Burn Out, usually because their trash is also empty. When they attempt to perform the original action again, it will cause another Burn Out.
    - **431.3.a.** Unless some effect intervenes, this will result in them burning out repeatedly, giving 1 point to an opponent each time, until an opponent passes the Victory Score and wins the game.
    - **431.3.b.** Points gained after the first Burn Out being processed in sequence cannot be replaced or prevented by any means.
    - **431.3.c.** Points gained after the first Burn Out being processed in sequence that cause a player to reach or surpass the Victory Score for their game mode will cause that player to win the game if they also have more points than any opponent. Example: If a player has no cards in their deck or their trash and they go to draw 1, they will begin to burn out repeatedly. After the first burn out is processed, any subsequent burnout that brings a player to a number of points greater than the Victory Score and more than any opponent will cause them to win the game.
      - **431.3.c.1.** The player wins immediately, without needing to wait for a cleanup to occur.
  - **431.4.** Burning Out is a Limited Action.
    - **431.4.a.** Players may only burn out when Game Effects direct them to do so.
  - **431.5.** Burning Out is a Replacement Effect. See rule 367. Replacement Effects for more information.
- **432.** Double
  - **432.1.** Doubling is the act of increasing a numeric attribute by an amount equal to that attribute’s current value.
    - **432.1.a.** This creates an effect that modulates that attribute by that specific amount for the duration specified by the Game Effect that instructed the player to perform this action. Example: A unit with 3 base Might and Shield 2 is in combat as a Defender. Since Shield applies, its current Might is 5. A player chooses it as the target for Last Stand, a spell that reads in part “Double a friendly unit's Might this turn.” Its current Might is 5, so it gets +5 Might this turn, for a current Might of 10. After combat, Shield no longer applies, but the +5 Might from Last Stand does, so the unit’s Might is 8.
  - **432.2.** Doubling is a Limited Action.
    - **432.2.a.** Players may only Double when Game Effects direct them to do so.
- **433.** Swap
  - **433.1.** Swapping is the act of increasing one numeric value and decreasing another numeric value on some number of Game Objects such that their values are reversed.
    - **433.1.a.** Swapping creates two different effects that apply to each attribute. One that Increases one value and one that Decreases the other. These effects last for the duration specified by the effect that instructed the Swap.
    - **433.1.b.** To accomplish this, determine the difference between these values and then apply an Increase for that amount to the lower value of the two attributes, and a Decrease of that amount to the higher value of the two attributes.
    - **433.1.c.** If both attributes are the same numeric value, Swapping has no effect.
  - **433.2.** Swapping is a Limited Action.
    - **433.2.a.** Players may only swap when Game Effects direct them to do so.
- **434.** Attach
  - **434.1.** Attaching is the act of linking two cards on the board together to combine their effects in some way. This causes one or more cards to become Attached and at least one card to become a Top-Most Card. See rule 716. Attachment for more information.
    - **434.1.a.** Attaching affects two cards at once.
      - **434.1.a.1.** One card will be designated as the one being Attached, and thus become Attached. The other will become the Top-Most Card.
    - **434.1.b.** This is represented by physically laying the Top-Most card on top of the other or others such that all Effect Texts and Might Bonuses are showing, but nothing else from the card or cards Attached.
      - **434.1.b.1.** In the situation where there is more than one card attached to the Top-Most card, they should be stacked in such a way that all Effect Text boxes and Might Bonuses are readable. The order of the Attached cards has no bearing on the application of effects.
    - **434.1.c.** The Top-Most card has all Effect Text of all cards Attached to it appended to its Rules Text.
    - **434.1.d.** The Top-Most Card has its Might modulated by the Might Bonus of all cards Attached to it.
    - **434.1.e.** Attaching one or more cards will cause those cards’ printed Rules Text to become Inactive for as long as they remain Attached. See rule 716. Attachment for more information.
    - **434.1.f.** Attaching a card to a new Top-Most Card will cause it to Detach from the card to which it is currently Attached.
    - **434.1.g.** Attaching a card to its current Top-Most Card will not have any effect.
    - **434.1.h.** If a Game Effect instructs a player to Attach a card to its current Top-Most Card, nothing additional happens.
  - **434.2.** Attaching is a Limited Action.
    - **434.2.a.** Players may only Attach cards when directed to by Game Effects.
  - **434.3.** Attaching cards does not inherently choose or specify a target. However, Game Effects that Attach cards may do so.
  - **434.4.** When a card Attaches to a card, its location becomes the same as the new Top-Most Card.
    - **434.4.a.** This is not a Move.
  - **434.5.** Attaching a card to another card does not modify either card’s state except in making those cards Attached and the Top-Most Card, and causing the Attached card to change locations. Example: An exhausted equipment being attached to a unit does not ready the equipment.
- **435.** Detach
  - **435.1.** Detaching is the act of unlinking two cards that are currently linked through the act of Attaching. This causes one to cease being Attached, and potentially causes the other to cease being a Top-Most card.
    - **435.1.a.** Detaching affects only cards that are currently Attached to another card.
      - **435.1.a.1.** Game effects that instruct a player to Detach a card that is currently not Attached to anything will do nothing.
    - **435.1.b.** When one or more cards become Detached, they cease to be in the Attached state.
      - **435.1.b.1.** To represent this, these cards should no longer be placed under the card they were previously placed under as Top-Most Card.
      - **435.1.b.2.** If the Top-Most Card no longer has any cards Attached to it after this, it is no longer a Top-Most Card.
    - **435.1.c.** The card being Detached has its Effect Text become Inactive and its Rules Text cease being Inactive.
    - **435.1.d.** The Top-Most Card ceases to have the Effect Text of the card being Detached appended to its Rules Text.
    - **435.1.e.** The Top-Most Card ceases to have its Might modulated by the Might Bonus of the card being Detached.
  - **435.2.** Detaching is a Limited Action.
    - **435.2.a.** Players may only Detach cards when directed to by Game Effects.
  - **435.3.** Detaching cards does not inherently choose, or specify a target. However, Game Effects that Detach cards may.
  - **435.4.** When a card Detaches from a Top-Most Card, its location is the same as the Top-Most Card from which it Detached.
    - **435.4.a.** If the Detached card was a Gear and this causes it to become present at a Battlefield, it will be Recalled during the next Cleanup. See rule 318. Cleanups for more information.
    - **435.4.b.** If the Attached card was Detached because the Top-Most Card changed zones from a board zone to a non-board zone, then the location that the Attached Card will Detach to is the last location the Top-Most Card was at before changing from a board zone to a non-board zone.

## Scoring: Conquer & Hold

*HARD CAP: a player may Score only ONCE PER BATTLEFIELD PER TURN. Ability-granted points are NOT bound by this.*

- **465.** Step 2: The Combat Damage Step
  - **465.1.** If both Attacking and Defending units remain at this battlefield, the following Tasks become Outstanding, in the specified order:
  - **465.2.** 1. When the Showdown closes, Attackers and Defenders resolve Combat Damage at the Battlefield that was attacked, using their current Might.
    - **465.2.a.** Sum the Might of all Attacking Units.
    - **465.2.b.** Sum the Might of all Defending Units.
    - **465.2.c.** Starting with the Attacker, each player assigns an amount of damage equal to their summed Might among the other's Units.
      - **465.2.c.1.** Assigning Damage is not Dealing Damage. 465.2.c.1.a.                                    When all Damage is assigned, it will be Dealt simultaneously. These actions are not synonymous.
      - **465.2.c.2.** Abilities or effects may influence the order in which damage is assigned. Reminder: Lethal Damage is non-zero damage equaling or exceeding the Might of a Unit.
      - **465.2.c.3.** Units must have lethal damage assigned to them in full before damage is assigned to a different Unit. Example: If a player has 5 damage to distribute among four 3 Might units, they may not choose to assign 2 damage to one of the units and 1 damage to each of the remaining 3. They must assign at least 3 damage to one, and the remaining 2 to another.
      - **465.2.c.4.** Units cannot have more damage assigned to them than the minimum required to constitute lethal damage unless no further units remain to have damage assigned to them. Example: If a player has 5 damage to distribute among four 3 Might units and those units each have 1 damage already marked on them, that player may not assign more than 2 damage to any of those units. 465.2.c.4.a.              If the damage assigned to a Unit is modified to or replaced by an amount of damage larger than the initial value, the assigning player must choose the minimum applied value such that the unit would take lethal damage. Example: A unit with 3 [M] is being assigned damage in the combat damage step. There are other units without damage assigned to them with the same controller. The unit has a delayed replacement effect applied to it that reads “Double all damage that would be dealt to it this turn.” When assigning damage, the assigning player can only choose to assign 1 or 2 damage to this unit—when doing so, the assigned damage is doubled to 2 or 4 damage respectively. The minimum applied value such that the unit would take lethal damage in this way is 4 damage.
      - **465.2.c.5.** When assigning damage in this way, replacement effects that would apply to the resulting damage are considered to apply to the assignment instead. Example: A unit with 2 [M] is being assigned damage in the combat damage step. The unit has “prevent the first 3 damage I would take each combat.” The unit would need to be assigned 5 damage in order to have lethal damage assigned to it. Example: The attacking player is assigning their 3 [M] worth of damage to two defending units with 2 [M] each. One of the units has a delayed replacement effect applied to it that reads “Double all damage that would be dealt to it this turn.” The attacking player assigns two damage to the other defending unit, then when assigning damage to the unit with the delayed replacement effect they assign 2 damage to it; 1 damage that doubles to 2 damage as it is assigned to the unit. When that damage is dealt, it doesn’t get doubled again—the doubling is considered to have already happened during damage assignment. Example: The attacking player is assigning their 3 [M] worth of damage to a 2 [M] unit. That unit has a prevent value of two being applied to it, as well as the effect of Lotus Trap, doubling the damage dealt to them. Both of these replacement effects apply to the assignment of damage, in the order of the controller of the 2 [M] unit’s choice. If they choose to order the replacement effects so that the prevent value is applied first, the unit will prevent 2 of the assigned damage, then the last 1 point of damage will be doubled to 2. The unit will have 4 damage assigned to it. When damage is dealt, the unit will take 2 damage. If they choose the other order, the unit will have 6 damage assigned to it, 2 of which will be prevented. When damage is dealt, the unit will take 4 damage.
      - **465.2.c.6.** A player must obey all requirements and restrictions on damage assignment if able. Example: A player is assigning damage to the following units: a unit with Tank ("I must be assigned combat damage first."); a unit with Backline ("I must be assigned combat damage last."); and another unit without any abilities. That player must assign combat damage first to the unit with Tank, then to the unit with no abilities, then to the unit with Backline.
      - **465.2.c.7.** If multiple Units have abilities or effects that require a player to assign them damage with the same priority, that player may assign damage to those units in any order. Example: A player is assigning damage to the following units: two units with Tank ("I must be assigned combat damage first.") and one unit with no abilities. That player chooses one of the units with Tank and assigns combat damage to it. Then they must assign any remaining damage first to the other unit with Tank, then to the unit with no abilities.
      - **465.2.c.8.** If a Unit has one or more Abilities or effects applying to it that demand it be assigned damage in a specific way that is exclusionary, then the assigning player chooses only one of those abilities to apply when assigning damage. Example: Caitlyn, Patrolling with the Backline ability ("I must be assigned combat damage last.") has been given the Tank ability ("I must be assigned combat damage first."). A player is assigning damage to this Caitlyn with Tank and two units with no abilities. That player can’t fulfill both of Caitlyn’s damage requirements, so they may choose to assign damage to Caitlyn first, fulfilling the Tank requirement, or last, fulfilling the Backline requirement. They can’t choose to apply damage to Caitlyn in between the other two units, because that wouldn’t fulfill either requirement.
      - **465.2.c.9.** If there is more than one unit in which this situation applies to, each unit is dealt with individually. The assigning player chooses which ability or effect applies, and then resolves the assignment. If this creates a situation where now more than one unit must be assigned with the same priority, those units may be assigned damage in any order as normal within that priority. Example: Two copies of Caitlyn, Patrolling with the Backline ability ("I must be assigned combat damage last.") have been given the Tank ability ("I must be assigned combat damage first."). A player assigning damage to these two Caitlyns and one unit with no abilities could choose to fulfill both Caitlyns’ Tank requirements by assigning them both damage before the other unit.
      - **465.2.c.10.** If a unit cannot be dealt damage, then no amount of damage can be considered lethal. Such a unit is exempt from any considerations of mandatory assignment. Example: Kayn, Unleashed says “If I have moved twice this turn, I don't take damage.” While Kayn can’t take damage, it is ignored for the purposes of assigning lethal damage in combat. Example: Counter Strike says “Choose a unit. The next time that unit would be dealt damage this turn, prevent it.” The unit in question has a replacement effect applied to it, but it still can be dealt damage. Thus, it is not exempt from considerations of mandatory assignment.
    - **465.2.d.** Deal Damage to each unit equal to the amount assigned to it.
  - **465.3.** 2. Skip the FEPR process and cancel any outstanding tasks. Proceed to the Resolution Step.
- **466.** Step 3: The Resolution Step
  - **466.1.** 1. Perform a Combat Cleanup.
    - **466.1.a.** Invoke a Combat Special Cleanup.
      - **466.1.a.1.** Insert “3c. Heal all Units.”
      - **466.1.a.2.** Insert “3d. Recall Attackers present at the Battlefield if Defenders are still present.” See rule 454. Recalls for more information.
  - **466.2.** The following Task becomes Outstanding: Reminder: Resolve any items on the chain from dealing combat damage and the Combat Cleanup and associated FEPR before performing this step.
  - **466.3.** 1. Determine Combat Result
    - **466.3.a.** A Player has won a combat if they received either the attacker or defender designation and are the only Player that has units remaining at this battlefield during this step.
    - **466.3.b.** A Player has lost a combat if they received either the attacker or defender designation and are the only Player that does not have any units remaining at this battlefield during this step.
    - **466.3.c.** Units at this battlefield inherit the same combat result as their controllers
    - **466.3.d.** There is “No Result” if units were recalled during step 3d of the Combat Cleanup, if both Players have units present during this task, or if neither player has units present during this task.
      - **466.3.d.1.** If “No Result” was reached, and both players have units remaining, stage a Showdown and a Combat at this battlefield.
  - **466.4.** The following Task becomes Outstanding: Reminder: Resolve any items on the chain from determining combat result and associated FEPR before performing this step.
  - **466.5.** 1. If no Showdown or Combat is staged at this location, the player with Units remaining here Establishes Control if they didn’t already control this Battlefield.
    - **466.5.a.** Clear the Contested Status.
    - **466.5.b.** If there are no Units remaining here controlled by any player, the Battlefield becomes Uncontrolled.
    - **466.5.c.** Remove all Hidden cards from this Battlefield that do not share a controller with the Battlefield.
    - **466.5.d.** Establishing Control results in a Conquer if that player has not yet scored this Battlefield this turn. See rule 188. Control for more information on Control. See rule 469.1. for more information on Conquering.
    - **466.5.e.** This does not have to be the player that applied Contested to the Battlefield.
  - **466.6.** The following Task becomes Outstanding: Reminder: Resolve any items on the chain from establishing control and associated FEPR before performing this step.
  - **466.7.** 1. Combat ends.
    - **466.7.a.** Remove Attacker and Defender Designation from all Units and Players.
    - **466.7.b.** At the end of Combat or Combat ends effects take place.
    - **466.7.c.** All “this combat” effects expire simultaneously.
- **467.** Scoring
- **468.** Scoring is the act of a Player gaining a point through the process of seizing or maintaining control over Battlefields.
  - **468.1.** Every instance of Scoring is also an instance of Gaining points
- **469.** A player Scores in one of two ways:
  - **469.1.** Conquer: A player gains Control of a Battlefield they did not yet Score this turn.
    - **469.1.a.** In Modes of Play with teammates, Battlefields under the Control of a teammate during the scoring step of the Beginning Phase of a player’s turn are also disqualified from being Scored through Conquer by any means by that player’s team.
    - **469.1.b.** A player will gain control of a Battlefield after establishing Control.
  - **469.2.** Hold: A player maintains Control of a Battlefield they did not yet Score this turn during their Beginning Phase.
- **470.** A player may only Score, from either method, once per Battlefield per turn.
- **471.** When a player Scores, two things occur:
  - **471.1.** The player Gains up to one Point, depending on their current score.
    - **471.1.a.** The Final Point has additional restrictions.
      - **471.1.a.1.** Notably, points Gained from sources that are not Conquer are not beholden to these restrictions.
    - **471.1.b.** When a player tries to Gain a Point through a Conquer, and their current Point Total is 1 point from the Victory Score of the Mode of Play or higher, the following occurs:
      - **471.1.b.1.** If the player has Scored every Battlefield this turn, that player Gains the Final Point. If the player has not Scored every Battlefield this turn, that player draws a card instead.
  - **471.2.** Trigger Score abilities at the Battlefield that Scored.
    - **471.2.a.** Conquer abilities trigger at a Battlefield that was Conquered.
    - **471.2.b.** Hold abilities trigger at a Battlefield that was Held.
    - **471.2.c.** These will only trigger when the Battlefield is Scored; I.E. These cannot be triggered more than once per turn for a player.
- **472.** When a cleanup occurs and a player has accrued Points greater than or equal to the Victory Score for their Mode of Play, and if they have more points than any opponent, they Win the Game.
- **473.** Layers
- **474.** Layers are the mechanism in which Game Effects alter the Traits, Intrinsic Abilities, or other properties of Game Objects.
- **475.** Layers are an organizational structure.
  - **475.1.** Layers only serve to structure the application and order that Game Effects apply to Game Objects to maintain consistency.

## Modes of play

*1v1 Duel: 8 points. You bring 3 battlefields, only 1 is used, chosen RANDOMLY in Duel.*

- **484.** Sanctioned Modes
- **485.** 1v1 (Duel)
  - **485.1.** 2 Players
  - **485.2.** 1v1 1 opponent each No teams
  - **485.3.** Victory Score: 8
  - **485.4.** Battlefield Count: 2
  - **485.5.** Setup: Each player randomly selects one (1) of their three (3) Battlefields. The other two are removed and will not be used for this game. The selected Battlefields are placed simultaneously in the Battlefield Zone.
  - **485.6.** Format: Best of 1. The first player to reach the Victory Score in Points wins the Match.
  - **485.7.** First Turn Process: The player going second channels an extra Rune from their Rune Deck during their first Channel Phase of the game.
- **486.** 1v1 (Match)
  - **486.1.** 2 Players
  - **486.2.** 1v1 1 opponent each No teams
  - **486.3.** Victory Score: 8
  - **486.4.** Battlefield Count: 2
  - **486.5.** Setup: Each player selects one (1) of their three (3) Battlefields. The other two are set aside and will not be used for this round of play. The selected Battlefields are placed simultaneously in the Battlefield Zone. After this game, if a player won, the Battlefields that were used are to be removed and not selected again for this Match. One of the remaining Battlefields that were set aside must be chosen instead.
  - **486.6.** Format: Best of 3. The first player to reach the Victory Score in Points wins the game. The winner of that game earns One Game Win. Players then reset the game state, remove the Battlefields in play from the game, choose new Battlefields from those set aside, and play again. The first player to earn Two Game Wins wins the match.
  - **486.7.** First Turn Process: The player going second channels an extra Rune from their Rune Deck during their first Channel Phase of the game.
- **487.** FFA3 (Skirmish)
  - **487.1.** 3 Players
  - **487.2.** FFA 2 opponents each No teams
  - **487.3.** Victory Score: 8
  - **487.4.** Battlefield Count: 3
  - **487.5.** Setup: Each player randomly selects one (1) of their three (3) Battlefields. The other two are discarded and will not be used for this game. The selected Battlefields are placed simultaneously between the three Players before play and will be used for this game.
  - **487.6.** Format: Best of 1. The first player to reach the Victory Score in Points wins the Match.
  - **487.7.** First Turn Process: The player going first does not draw a card during their first Draw Phase of the game. The player going last channels an extra Rune from their Rune Deck during their first Channel Phase of the game.
- **488.** FFA4 (War)
  - **488.1.** 4 Players
  - **488.2.** FFA 3 opponents each No teams
  - **488.3.** Victory Score: 8
  - **488.4.** Battlefield Count: 3
  - **488.5.** Setup: Each player who is not going first randomly selects one (1) of their three (3) Battlefields. The other two are removed and will not be used for this game. The selected Battlefields are placed simultaneously between the players before play and will be used for this game.
  - **488.6.** Format: Best of 1. The first player to reach the Victory Score in Points wins the Match.
  - **488.7.** First Turn Process: The player going first does not draw a card during their first Draw Phase of the game. The player going last channels an extra Rune from their Rune Deck during their first Channel Phase of the game.
- **489.** 2v2 (Magma Chamber)
  - **489.1.** 4 Players
  - **489.2.** 2v2 2 opponents each 1 teammate
  - **489.3.** Victory Score: 11
  - **489.4.** Battlefield Count: 3
  - **489.5.** Setup:
  - **489.6.** Format: Best of 1. The first team to reach the Victory Score in Points wins the Match.
  - **489.7.** First Turn Process: The player going first does not draw a card during their first Draw Phase of the game. The player going last channels an extra Rune from their Rune Deck during their first Channel Phase of the game.
  - **489.8.** Unique Rules

## Buffs & Mighty

*Mighty = Might >= 5. 'BECOMES Mighty' is a THRESHOLD-CROSSING trigger: it re-arms whenever Might dips below 5 and back.*

- **700.** Additional Rules
- **701.** Buffs
- **702.** Buffs are counters placed on Units.
  - **702.1.** Buffs can be tracked with a buff reminder card from a Riftbound booster pack or with any spare object in your surroundings.
  - **702.2.** Buffs can be added or spent.
    - **702.2.a.** To Buff a Unit, a player chooses a Unit and then places a buff on it. That Unit is Buffed for as long as the buff remains on it.
    - **702.2.b.** Spending a Buff removes a single Buff counter from a Unit.
      - **702.2.b.1.** A buff cannot be spent from a Unit that does not have a buff.
      - **702.2.b.2.** A player can only spend buffs on units they control.
  - **702.3.** There can only be one Buff on a Unit at a time.
    - **702.3.a.** If a Buff is added, or instructed to be added, on a Unit that already has a Buff, it is not placed instead.
- **703.** Each Buff individually contributes +1 Might to a Unit.
- **704.** Buffs are Game Objects and may be referenced, counted, or affected by other effects as specified.
  - **704.1.** Buffs are counters, and thus are not targeted by spells and abilities. See rule 741. Counters for more information.
- **705.** If a Unit leaves play, remove all Buffs from it.
  - **705.1.** Champions do not retain Buffs in the Champion Zone, even if they return there somehow.
- **706.** Mighty
- **707.** Mighty is a description that applies to some units. Other game effects can check whether a unit is Mighty.
- **708.** A Unit "is Mighty" as long as its Might is 5 or greater.
- **709.** A Unit "becomes Mighty" at the moment its Might changes from being less than 5 to being 5 or greater. Example: A Unit with Might 4 that gets +1 [M] becomes Mighty. Example: A Unit with Might 5 that gets +1 [M] does not become Mighty, because it was already Mighty.
- **710.** Units on the board are evaluated according to their current Might. Example: A unit with a base Might of 3 is targeted by a spell that reads "A unit gets +3 [M] this turn." As that spell resolves, its Might changes from 3 to 6, and it becomes Mighty. When that effect expires at the end of the turn, it will no longer be Mighty.
- **711.** Units in Non-Board Zones are evaluated according to their printed Might. Example: A unit in the trash is Mighty if its printed Might is 5 or greater. It doesn't matter if there were effects raising or lowering its might while it was on the board.
- **712.** Bonus Damage
- **713.** Bonus Damage is an intrinsic property that can be granted to Deal actions that influence the amount of Damage that the action is distributing.
- **714.** If more than one instance of Bonus Damage is applied or granted to a Deal action, all instances are summed and applied once.
  - **714.1.** Bonus Damage can only be a positive value, and can only increase the amount of Damage being distributed.
  - **714.2.** If, for any reason, Bonus Damage would be a negative number, then no Bonus Damage is applied to the action.
- **715.** Bonus Damage applies to the total damage Dealt by one instance of the action.
  - **715.1.** If the Deal action has a single target, the amount of Damage to that target will be increased by the Bonus Damage granted to it.
  - **715.2.** If the Deal action has multiple targets, the amount of Damage dealt to each target is increased by Bonus Damage individually and separately. Example: Singularity is a spell that says “Deal 6 to each of up to two units.” A player plays Singularity while they also control Annie, Fiery, a unit that says “Your spells and abilities deal 1 Bonus Damage.” Singularity deals 1 Bonus Damage to both of its targets, dealing 7 to each.
  - **715.3.** If the Deal action Splits damage, then the Bonus Damage applies to the amount of Damage that will be Split. This can alter the number of targets eligible to be chosen. Example: Volibear, Furious is a unit that says in part “When I attack, deal 5 damage split among any number of enemy units here.” A player attacks with Volibear, Furious while they also control Annie, Fiery, a unit that says “Your spells and abilities deal 1 Bonus Damage.” Volibear, Furious now deals 6 damage split among any number of enemy units at its location, and can choose to split that damage among up to 6 units rather than the usual 5.
  - **715.4.** If no damage was Dealt, then Bonus Damage will not apply. Example: Teemo, Strategist is a unit that reads in part “When I defend, choose an enemy unit here and reveal the top 5 cards of your Main Deck. Deal 1 to that unit for each card with Hidden revealed this way, then recycle the revealed cards.” He has Rabadon’s Deathcrown attached to him. An enemy unit moves to the battlefield where Teemo is located and a combat opens there. Teemo’s controller reveals the top 5 cards of their Main Deck and reveals no cards with Hidden. Although the ability has 3 Bonus Damage from Rabadon’s Deathcrown, no deal action is performed for the Bonus Damage to apply to.
    - **715.4.a.** If Damage is replaced or reduced by any means, the replacing or reducing action will include the Bonus Damage in the total damage when determining how much damage is to be dealt. Example: A unit has prevent 3 applied to them. The unit is located at the Void Gate battlefield. An opponent targets the unit with Hextech Ray. Hextech Ray deals 4 damage to the unit, including the Bonus Damage from Void Gate, which the prevent effect will prevent 3 of. The unit takes 1 damage.

## Attachments

- **716.** Attachment
- **717.** Attaching is a limited action that causes cards to become linked to each other to combine their effects in some way. This causes one card to become Attached and the other to become A Top-Most Card. See rule 434. Attach for more information.
- **718.** Attached is the state of a card being linked to another card in this way.
  - **718.1.** A card remains in this state until Detached.
  - **718.2.** While in this state, the card’s printed Rules Text is Inactive. See rule 720. Inactive for more information.
  - **718.3.** While in this state, Abilities in the card’s Effect Text are appended to the Rules Text of the Top-Most Card.
  - **718.4.** While in this state, the card’s Might Bonus modulates the Top-Most Card’s Might by the value listed.
  - **718.5.** Attached cards still have all properties of being a card on the board while in this state.
- **719.** A Top-Most Card is a card that has one or more cards linked to it through the process of Attaching.
  - **719.1.** The Effect Text of all cards Attached to this card are appended to the Rules Text of this card for as long as they remain Attached.
  - **719.2.** This card ceases being a Top-Most Card when there are no longer any cards Attached to it.
  - **719.3.** A Top-Most Card and all cards Attached to it are at the same location.
  - **719.4.** The Exhausted and Ready state of the Top-Most card does not affect nor change the status of the Attached cards and vice versa.
  - **719.5.** When a Top-Most Card changes zones from a board zone to a non-board zone, all Attached cards Detach from it, remaining in their current zones.
- **720.** Inactive
- **721.** Card text can occasionally be assigned to be ignored, disregarded, or otherwise rendered as not applicable during the course of play. This state is referred to as Inactive.
  - **721.1.** Text marked this way is not applied at all while in this state.
  - **721.2.** Inactive Abilities do not trigger, do not apply, and cannot be activated. Inactive instructions are not processed.
- **722.** Inactive text is still present on cards.
  - **722.1.** Cards with Inactive text still have keywords for the sake of Game Effects that want to reference or see if a card has a keyword.
  - **722.2.** Game Effects that parse or interpret text to determine target eligibility may still parse Inactive text for the sake of eligibility. Example: Spinning Axe is a gear with [Temporary]. While it’s attached and its rules text is inactive, its [Temporary] ability doesn’t trigger. However, a spell that reads “Destroy a gear with [Temporary]” could still choose and destroy Spinning Axe.
- **723.** Rules Text is never Inactive by default.
- **724.** Effect Text is Inactive unless the card with the Effect Text is Attached.
- **725.** Inactive text can partially cease to be Inactive under specific circumstances and exceptions.
  - **725.1.** If an Attached card has a Passive or Replacement ability that applies during the process of Attaching or a Triggered ability that triggers off of Attaching, that text exists and can be processed as it Attaches.
  - **725.2.** If an Attached card has a Passive or Replacement ability that applies during the process of Detaching or a Triggered ability that triggers off of Detaching, that text exists and can be processed as it Detaches.
  - **725.3.** If an Attached card has an Equip ability, the Weaponmaster keyword can reference that Equip ability and any abilities that passively modify that Equip ability.
  - **725.4.** If a Dependent Ability is a Triggered Ability whose condition occurs at the same time as the Dependent Keyword’s condition being fulfilled, that text exists and can be processed as it is fulfilled.
- **726.** Dependent Keywords
- **727.** Keywords can be Dependent Keywords
  - **727.1.** A Dependent Keyword is comprised of both a Condition that it is short for, and an ability of some format immediately after the Keyword itself. Example: Noxus Hopeful has “[Legion][>] I cost [2] less.” [Legion] is short for the condition “if you have played another card this turn, this card gains [Text],” while “I cost [2] less” is the dependent ability.

## XP

*NO LIMIT on accrued XP. Feeds Level N abilities.*

- **728.** XP
- **729.** XP is a resource that is accrued, spent, or otherwise modified by Players through the course of play.
  - **729.1.** The amount of XP that a player has should be marked clearly.
  - **729.2.** The amount of XP a Player has is Public Information.
- **730.** XP can be Gained and Spent.
  - **730.1.** To Gain XP, increase the value of XP marked on the Player gaining it.
  - **730.2.** To Spend XP, reduce the value of XP marked on the Player spending it.
- **731.** XP is not a Game Object.
  - **731.1.** XP cannot be targeted, readied, or exhausted.
- **732.** XP is not shared between Allies in Game Modes with Teammates.
- **733.** There is no limit to an amount of XP a player can accrue.

## Additional turns

- **734.** Additional Turns
- **735.** Certain Game Effects will instruct a player to “take a turn after this.” These effects create a temporary Additional Turn owned by that player that is inserted into the turn queue after the current turn.
- **736.** Turn order is established when the game begins as a repeating set of players. This populates a looping queue of turns that each player will take, starting with the first turn taken by the First Player, and repeating indefinitely.
- **737.** When an Additional Turn is inserted into this queue, it does not change the Turn Order of the game. The owner of the Additional Turn just has the next queued turn. After that turn is completed, it will be removed and the queue will proceed with its previously queued turns.
- **738.** If multiple Additional Turns are queued, they are added to the queue in the order the Game Effects that generated them occurred. Example: The First Player plays, through some means, two Time Warps during their turn. The Time Warps create two Additional Turns for their controller and insert them into the turn queue after the current turn. If the turn queue is represented as [> A > B > C > D >], then these Additional Turns will appear as [> A > A* > A* > B > C > D >]. After the last Additional Turn is played, the queue returns to its previously queued turns. The “*” denotes that a turn is an Additional Turn. Example: The First Player plays Promising Future during their turn, during the resolution of which the Second and Fourth Player choose, banish, and play one Time Warp each. The Fourth Player’s Time Warp resolves first, inserting an Additional Turn for them in the queue as such: [> A > D* > B > C > D >]. The Second Player’s Time Warp resolves afterwards, inserting that turn: [> A > B* > D* > B > C > D >]. When the First Player passes the turn, the Second Player will take their turn, followed by the Fourth Player, after which the queue returns to its previously queued turns.
- **739.** Special Terms
- **740.** Card text and this rules document use certain terms in specific ways that are different from their common usage.
  - **740.1.** Some card text refers to Game Objects in particular ways:
  - **740.2.** Some card text refers to Units in particular ways:
  - **740.3.** Some card text refers to specific terminology:
  - **740.4.** Some terms in this document are used in particular ways:

## Counters

- **741.** Counters
- **742.** Counters are Game Objects generated by and given to other Game Objects on the board during play.
- **743.** Counters serve to track semi-permanent effects on Game Objects.
- **744.** Counters can have game effects themselves, or serve as the prerequisite for game effects.
- **745.** Counters can be spent by game effects.
  - **745.1.** In order to do so, that player must remove that many counters of the specified type from the specified Game Objects.
  - **745.2.** In order to spend a Counter, the spending player must control the Game Object the Counter is placed on.
- **746.** Some effects may move a Counter between two Game Objects. The Counter is either on the first Game Object or the second. There is no state for a Counter being between either object.
- **747.** Counters that leave a Game Object without being placed on another game object cease to exist.
- **748.** Game Objects that change zones to a non-board zone lose all of their Counters. See rule 124. for more information on temporary modifications.
- **749.** Counters do not have a controller.
- **750.** Making New Choices

## KEYWORDS

*The building blocks. Note especially: Repeat (pay again to re-execute), Flow (cast from trash then BANISH - self-limiting), Legion (storm-like), Accelerate (enter ready), Empower/Level (threshold-dependent).*

- **800.** Keywords
- **801.** A Keyword is a specific term that appears on Cards that acts as a shorthand for a specific game effect, or ability of any variety.
  - **801.1.** A Keyword can be an ability.
  - **801.2.** Keywords can be identified by having a colored highlight behind them.
    - **801.2.a.** The color of the highlight has no effect on gameplay.
  - **801.3.** Keywords can be referenced or specified by other Game Effects.
    - **801.3.a.** Other effects may grant Keywords.
      - **801.3.a.1.** The definition and rules of the specific Keyword will determine the behavior if a Keyword is granted while it is already present.
      - **801.3.a.2.** The effect that granted the Keyword will specify the duration for which it is granted.
      - **801.3.a.3.** If an effect that grants a Keyword does not specify a duration, the duration is as long as that Game Object remains on the Board or in its current Non-Board Zone.
    - **801.3.b.** Other effects may remove Keywords.
      - **801.3.b.1.** The effect that removed the Keyword will specify the duration it is removed.
      - **801.3.b.2.** If an effect that removes a Keyword does not specify a duration, the duration is as long as that Game Object remains on the Board or in its current Non-Board Zone.
- **802.** A card can have any number of Keywords.
- **803.** Similar to other rules text, execute any effects of Keywords in the order listed when reading the card from top to bottom of the rules text.
- **804.** Keyword Glossary
- **805.** Accelerate
  - **805.1.** Accelerate is a Unit ability.
    - **805.1.a.** Accelerate is functionally short for "As you play me, you may pay [1][C] as an additional cost. If you do, I enter ready."
      - **805.1.a.1.** If the unit has one or more domains, the Power portion of the Accelerate cost can be paid only with a Power that matches one of the domains of the unit.
      - **805.1.a.2.** If the unit has no domain, the Power portion of the Accelerate cost can be paid with [A] (a Power of any domain).
  - **805.2.** Accelerate is an Optional Additional Cost to be paid as a player plays the unit with the ability.
    - **805.2.a.** Accelerate costs cannot be paid while the unit is on the board, only as part of the steps of playing a card.
    - **805.2.b.** Paying the cost generates a delayed Replacement Effect. Even if the unit loses the accelerate keyword during the finalization process, as long as the cost was paid, that unit will still enter ready.
  - **805.3.** Accelerate has no function while on the board.
  - **805.4.** Multiple instances of Accelerate are redundant.
  - **805.5.** Accelerate, and whether or not a unit has Accelerate, is a characteristic of the Unit and may be checked or referenced by other Game Effects.
  - **805.6.** Accelerate generates a delayed replacement effect that replaces a unit entering the board exhausted with it entering ready. It does not enter exhausted and then become ready.
    - **805.6.a.** Accelerate will not interact with, or trigger, abilities that are affected by units becoming ready.
- **806.** Action
  - **806.1.** Action is a Permissive keyword.
    - **806.1.a.** It is present on Cards, Rune Abilities, Legend Abilities or Permanent Abilities.
    - **806.1.b.** Action grants the corresponding card or effect permission to be played or activated during Showdowns, even when it is not the Controlling player's turn.
    - **806.1.c.** Action is functionally short for the following:
      - **806.1.c.1.** On Cards: "This can be played during showdowns on any player's turn."
      - **806.1.c.2.** On Activated Abilities: "This can be activated during showdowns on any player's turn."
    - **806.1.d.** Action is formatted as “[Action]” on spells, or “[Action][>]” on abilities.
  - **806.2.** The card or effect with this keyword is not restricted to showdowns. This permission is inclusive of all other timings and options available to the ability as written or by default.
  - **806.3.** Action does not alter the function of any instruction of the corresponding card or effect it is on. It is only permission. Example: Playing a Unit with Action still has the inherent restrictions of playing Units without Action. It can only be played to the controlling player's base or a battlefield they control.
  - **806.4.** Some passive abilities may grant a card or ability Action under certain conditions. The card or ability does not have the Action keyword unless and until those circumstances are true.
    - **806.4.a.** Those conditions might only be fulfilled while the card or ability is on the chain. In such a case, it can still be played or activated at the appropriate timing as long as doing so could fulfill the conditions.
    - **806.4.b.** If the chain item does not fulfill the conditions by the time step 5: check legality has been reached, the actions taken while playing it are undone and it is returned to the zone it was played from if it is a card.
  - **806.5.** Action is a referenceable characteristic.
    - **806.5.a.** Whether or not a Game Object has Action is a characteristic of that Game Object and may be checked or referenced by other Game Effects.
    - **806.5.b.** Whether or not a Spell has Action is a characteristic of that Spell and may be checked or referenced by other Game Effects.
    - **806.5.c.** Whether or not an Ability has Action is a characteristic of that Ability and may be checked or referenced by other Game Effects.
- **807.** Assault
  - **807.1.** Assault is a Passive Ability keyword.
    - **807.1.a.** It is present on Units.
    - **807.1.b.** Assault is formatted as "Assault [X]".
      - **807.1.b.1.** The X is referenced in the functional text of the ability.
      - **807.1.b.2.** The X is referred to as the Assault Value.
      - **807.1.b.3.** If X is omitted, it is presumed to be 1.
    - **807.1.c.** It is functionally short for "While I am an attacker, I have +X [M]."
    - **807.1.d.** Being an attacker means the Unit has gained the Attacker designation during Combat. See rule 459. Combat for more information.
      - **807.1.d.1.** Assault remains in effect as long as the Unit maintains the Attacker designation.
  - **807.2.** If a Unit has Assault or has been granted Assault and is granted Assault by an additional source, the Assault Value of all granted Assault keywords is summed. Example: Petty Officer has Assault. It is chosen as the target of Cleave, which says "Give a unit [Assault 3] this turn." After Cleave resolves, Petty Officer has Assault 4 this turn.
  - **807.3.** Assault, and whether or not a unit has Assault, is a characteristic of the Unit and may be checked or referenced by other Game Effects.
- **808.** Deathknell
  - **808.1.** Deathknell is a Triggered Ability keyword.
    - **808.1.a.** It is present on Permanents.
    - **808.1.b.** It is formatted as "[Deathknell][>] [Effect]".
      - **808.1.b.1.** [Effect] is the rules text for the specific instance of Deathknell. This is referred to as the Deathknell effect.
    - **808.1.c.** It is functionally short for "When I die, [Effect]."
      - **808.1.c.1.** [Effect] is the rules text of the Deathknell effect.
    - **808.1.d.** The Trigger for this and similar effects that trigger on their source’s death is the Permanent being Killed and sent to the Trash.
      - **808.1.d.1.** If the Permanent with the effect is not sent to the Trash, for example because its "killed" event was replaced with a recall, the triggered ability will be removed from the chain. Example: Draven, Audacious is killed in combat. Draven reads in part “When I die in combat, choose an opponent. They gain 1 point.” Draven’s controller has a Zhonya’s Hourglass in base. Draven’s death is replaced by him being healed, recalled, and exhausted. Draven’s triggered ability will be removed from the chain.
      - **808.1.d.2.** The trigger will be added to the chain as a Pending Item before the card with an ability that triggers on its own death is moved to the trash due to a Kill instruction or a Cleanup.
      - **808.1.d.3.** Before the card is moved to the Trash, note its location, its attributes, and any other details related to the effect of its triggered ability to process the trigger after it has been Finalized.
  - **808.2.** Each instance of Deathknell a Permanent may have will trigger separately.
    - **808.2.a.** The controller will choose the order to add these Triggers to the chain.
  - **808.3.** Deathknell, and whether or not a permanent has Deathknell, is a characteristic of the permanent and may be checked or referenced by other Game Effects.
- **809.** Deflect
  - **809.1.** Deflect is a Passive Ability keyword.
    - **809.1.a.** It is normally present on Permanents.
    - **809.1.b.** It is formatted as "Deflect [X]".
      - **809.1.b.1.** The X is referenced in the functional text of the ability.
      - **809.1.b.2.** The X is referred to as the Deflect Value.
      - **809.1.b.3.** If X is omitted, it is presumed to be 1.
    - **809.1.c.** It is functionally short for "Spells and abilities an opponent controls that target [me/this] cost an amount of Power equal to [Deflect Value] more to play as an additional cost for each time they choose [me/this]."
      - **809.1.c.1.** The Power used to pay this cost may always be of any Domain. Example: A Fury spell targets an Order unit with Deflect. The Power used to pay the Deflect cost can be any Domain; it does not need to match the Domain of the spell or the target.
    - **809.1.d.** It is an effect that imposes a Mandatory Additional Cost on Spells and Abilities that choose the Game Object that has this ability. See rule 349. Playing Cards for more information.
  - **809.2.** If a Game Object has Deflect, or has been granted Deflect, and is granted Deflect by an additional source, the Deflect Value of all granted Deflect keywords is summed.
  - **809.3.** Deflect, and whether or not a Game Object has Deflect, is a characteristic of the permanent and may be checked or referenced by other Game Effects.
- **810.** Ganking
  - **810.1.** Ganking is a Passive Ability keyword.
    - **810.1.a.** It is present on Units.
    - **810.1.b.** It is functionally short for "I may move to a battlefield from another battlefield with a standard move."
    - **810.1.c.** It is a passive ability that adds permissions to the Unit's Standard Move.
      - **810.1.c.1.** It does not restrict or remove options from the Unit's Standard Move.
      - **810.1.c.2.** It does not have an activation cost.
      - **810.1.c.3.** It does not give additional abilities or activations of Movement, only new options for the Standard Move.
  - **810.2.** Multiple instances of Ganking are redundant.
  - **810.3.** Ganking, and whether or not a unit has Ganking, is a characteristic of the Unit and may be checked or referenced by other Game Effects.
- **811.** Hidden
  - **811.1.** Hidden is a keyword that acts as a prerequisite to perform the Hide Discretionary Action.
    - **811.1.a.** It is present on Spells, Units, and Gear.
    - **811.1.b.** It is functionally short for "While this card is in your hand or in your Champion Zone on your turn during an Open State, you may pay [A] to hide this facedown at a battlefield you control that doesn't already have a facedown card hidden there for as long as you control that battlefield. Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base cost."
    - **811.1.c.** It allows the player to take the Discretionary Action Hide.
      - **811.1.c.1.** Hide is not a subset of Play.
      - **811.1.c.2.** Hiding a card does not open a chain.
      - **811.1.c.3.** Playing a card from facedown (or "from Hidden") does open a chain.
    - **811.1.d.** Some choices made while playing a card from Hidden are restricted to the battlefield where it was hidden. A card cannot be played from Hidden if it is a spell with no valid targets under these restrictions. See rule 355.6. Targeting for more information.
      - **811.1.d.1.** A hidden permanent must be played to that battlefield. 811.1.d.1.a.                                         This includes hidden gear, and overrides the normal restriction that gear have in only being allowed to be played to base.
      - **811.1.d.2.** If a hidden spell or a play effect of a hidden permanent chooses any targets, those targets must be chosen from among options at that battlefield, unless the ability explicitly restricts targeting in a way that makes this impossible. Example: Blastcone Fae is a unit with Hidden and “When you play me, give a unit -2 [M] this turn, to a minimum of 1 [M].” Because this is a play effect, its target must be chosen from among units at the same battlefield if Blastcone Fae was played from Hidden. Example: Tideturner is a unit with Hidden and “When you play me, you may choose a unit you control at another location. Move me to its location and it to my original location.” Because its play effect has a targeting restriction that can never be fulfilled by a unit at its battlefield, its target may be chosen freely from among the available options. 811.1.d.2.a.                                         Each target is treated separately and individually when processing this rule. Example: Smoke and Mirrors is a spell that reads in part “Choose a unit you control and another unit you control at a different location.” If Smoke and Mirrors is played from hidden, the first unit chosen can be chosen at the battlefield Smoke and Mirrors was played from, so it must be. The second unit chosen explicitly restricts targeting in a way that makes this impossible, so it can be chosen from any location.
      - **811.1.d.3.** If a hidden spell or a play effect of a hidden permanent causes you to play a unit, you must choose to play that unit at that battlefield.
  - **811.2.** Abilities and instructions of hidden cards other than the choices listed above function as normal. Example: Stand United is a spell that has Hidden and says “Buff a friendly unit. Buffs give an additional +1 might to friendly units this turn.” If it’s played from Hidden, the first part of its ability must choose a friendly unit at the same battlefield, but the second part of its ability affects all friendly units with buffs, no matter where they are.
  - **811.3.** Instead of being hidden, a card with Hidden may be played for its cost as normal, at its normal timing with no restrictions on targeting.
  - **811.4.** Multiple instances of Hidden are redundant.
  - **811.5.** Hidden, and whether or not a card has Hidden, is a characteristic of the card and may be checked or referenced by other Game Effects.
    - **811.5.a.** This is independent of the state of being facedown.
  - **811.6.** A card that is Hidden gains Reaction while facedown or played from facedown, and may be played any time a card with Reaction may be played as a result.
    - **811.6.a.** The property is granted to the card in its facedown state, and is not publicly known.
- **812.** Legion
  - **812.1.** Legion is a Dependent Keyword.
    - **812.1.a.** It is formatted as "[Legion][>] [Text]".
    - **812.1.b.** Starting from the Keyword to the end of the clause, the entire statement is the Legion Ability.
      - **812.1.b.1.** Legion is functionally short for “If you have played another card this turn, this card gains [Text].”
      - **812.1.b.2.** The [Text] is the Dependent Ability.
    - **812.1.c.** As long as a card different than the one with the Legion ability has been Finalized by you on the same turn then the Dependent Ability is Active on the card with Legion.
  - **812.2.** All instances of Legion on cards a player controls are satisfied by that player playing a single card. Example: One card has three different Legion Abilities. The Legion Text of all three abilities will be active as long as one card has been finalized by the card's controller earlier in the same turn.
  - **812.3.** Legion, and whether or not a card has Legion, is a characteristic of the card and may be checked or referenced by other Game Effects.
- **813.** Reaction
  - **813.1.** Reaction is a Permissive keyword.
    - **813.1.a.** It can be present on Cards, Rune Abilities, Legend Abilities and Permanent Abilities.
    - **813.1.b.** Reaction grants the corresponding card or effect all abilities and permissions of Action.
    - **813.1.c.** Reaction, additionally, is functionally short for the following:
      - **813.1.c.1.** On Cards: "This can be played during Closed States on any player's turn."
      - **813.1.c.2.** On Activated Abilities: "This can be activated during Closed States on any player's turn."
    - **813.1.d.** Reaction is formatted as “[Reaction]” on cards, or “[Reaction][>]” on abilities.
  - **813.2.** The corresponding card or effect with this keyword is not restricted to Closed States or Showdowns. This permission is inclusive of all other timings and options available to the ability as written, Action's permissions, or by default.
  - **813.3.** Reaction does not alter the function of any instruction of the Card, Rune, or Effect it is on. It is only Permission.
    - **813.3.a.** Playing Units with Reaction still has the inherent restrictions of playing Units without Reaction. It can only be played to the controlling player's base or a battlefield they control.
  - **813.4.** Some passive abilities may grant a card or ability Reaction under certain conditions. The card or ability does not have the Reaction keyword unless and until those circumstances are true.
    - **813.4.a.** Those conditions might only be fulfilled while the card or ability is on the chain. In such a case, it can still be played or activated at the appropriate timing as long as doing so could fulfill the conditions.
    - **813.4.b.** If the chain item does not fulfill the conditions by the time step 5: check legality has been reached, the actions taken while playing it are undone and it is returned to the zone it was played from if it is a card.
  - **813.5.** Reaction is a referencable characteristic.
    - **813.5.a.** Whether or not a Game Object has Reaction is a characteristic of that Game Object and may be checked or referenced by other Game Effects.
    - **813.5.b.** Whether or not a Spell has Reaction is a characteristic of that Spell and may be checked or referenced by other Game Effects.
    - **813.5.c.** Whether or not an Ability has Reaction is a characteristic of that Ability and may be checked or referenced by other Game Effects.
- **814.** Shield
  - **814.1.** Shield is a Passive Ability keyword.
    - **814.1.a.** It is present on Units.
    - **814.1.b.** Shield is formatted as "Shield [X]".
      - **814.1.b.1.** The X is referenced in the functional text of the ability.
      - **814.1.b.2.** The X is referred to as the Shield Value.
      - **814.1.b.3.** If X is omitted, it is presumed to be 1.
    - **814.1.c.** It is functionally short for "While I am a defender, I have +X [M]."
    - **814.1.d.** Being a defender means the Unit has gained the Defender designation during Combat. See rule 459. Combat for more information.
      - **814.1.d.1.** Shield remains in effect as long as the Unit maintains the Defender designation.
  - **814.2.** If a Unit has Shield, or has been granted Shield, and is granted Shield by an additional source, the Shield Value of all granted Shield keywords is summed. Example: Stalwart Poro has Shield. It is chosen as the target of Block, which says "Give a unit [Shield 3] and [Tank] this turn." After Block resolves, Stalwart Poro has Shield 4 this turn.
  - **814.3.** Shield, and whether or not a unit has Shield, is a characteristic of the Unit and may be checked or referenced by other Game Effects.
- **815.** Tank
  - **815.1.** Tank is a Passive Ability keyword.
    - **815.1.a.** It is present on Units.
    - **815.1.b.** It is functionally short for "I must be assigned lethal damage before any other unit with the same controller as me that does not have [Tank] during the Combat Damage step."
    - **815.1.c.** It alters how players can elect to assign combat damage during combat.
      - **815.1.c.1.** Players must still assign lethal damage to a unit before moving to the next when assigning their damage.
      - **815.1.c.2.** If more than one unit with Tank is present with the same controller in Combat, damage may be assigned to any of them. Units without Tank are invalid assignments until all units with Tank have lethal damage assigned to them.
  - **815.2.** Multiple instances of Tank are redundant.
  - **815.3.** Tank, and whether or not a unit has Tank, is a characteristic of the Unit and may be checked or referenced by other Game Effects.
- **816.** Temporary
  - **816.1.** Temporary is a Triggered Ability keyword.
    - **816.1.a.** It is present on Permanents.
    - **816.1.b.** It is functionally short for "At the start of this permanent's controller's Beginning Phase, before scoring, kill this."
    - **816.1.c.** The Trigger Condition is the controller of the permanent's Beginning Phase starting.
  - **816.2.** Multiple instances of Temporary are redundant.
    - **816.2.a.** Regardless of how many instances there are, the ability will only trigger once.
  - **816.3.** Temporary, and whether or not a permanent has Temporary, is a characteristic of the permanent and may be checked or referenced by other Game Effects.
- **817.** Vision
  - **817.1.** Vision is a Triggered Ability keyword.
    - **817.1.a.** It is present on Permanents.
    - **817.1.b.** It is functionally short for "When this is played, predict.”
    - **817.1.c.** The trigger is the permanent entering the Board.
  - **817.2.** Multiple instances of Vision trigger separately.
    - **817.2.a.** The player may choose to recycle or not recycle for each instance of Vision separately.
    - **817.2.b.** If the player does not recycle the top card and nothing else happens in between the triggers resolving, each instance of Vision will see the same card.
  - **817.3.** Vision, and whether or not a permanent has Vision, is a characteristic of the permanent and may be checked or referenced by other Game Effects.
- **818.** Equip
  - **818.1.** Equip is an Activated Ability keyword.
    - **818.1.a.** Equip is present on Gear with the tag Equipment.
    - **818.1.b.** Equip has a cost to activate and Attaches the card with Equip to a chosen Unit when the cost is paid.
      - **818.1.b.1.** Equip’s choice is a Target.
      - **818.1.b.2.** The chosen Unit will become the Top-Most Card for the Attach action.
    - **818.1.c.** Equip is formatted as “Equip [Cost]”
      - **818.1.c.1.** If paying costs or making choices for this ability causes triggered abilities to trigger, they will be placed on the chain above this ability in a Pending state. See rule 376. Activated Abilities for more information.
      - **818.1.c.2.** Equip is functionally short for “[Cost]: Attach this gear to a unit you control.”
      - **818.1.c.3.** Equip costs may include both resource costs and non-resource costs.
      - **818.1.c.4.** Equip abilities may also include text that alters the Equip cost. Such text is taken into account when determining a card’s Equip cost when paying for the ability.
      - **818.1.c.5.** Equip abilities may include text that alters the timing or targeting of the Equip ability.
  - **818.2.** When the Attach action completes from this keyword, the Unit that was chosen is considered to have been Equipped by the Gear with this ability.
    - **818.2.a.** This is an event other Game Effects and Triggered Abilities can reference.
  - **818.3.** Equipped is the state of a Top-Most Card being Attached by one or more cards that are Equipment.
    - **818.3.a.** The state of being Equipped is synchronous with that of the Attached state of the Equipment.
    - **818.3.b.** A Top-Most Card is Equipped as long as one or more of its Attached cards are Equipment.
    - **818.3.c.** The state of being Equipped corresponds to a Top-Most card having a card with Equip that is Attached to it.
  - **818.4.** Multiple instances of Equip are equivalent to multiple Activated Abilities and can each be activated separately by paying the corresponding costs.
  - **818.5.** Equip, and whether or not a Gear has Equip, is a characteristic of the Gear and may be checked or referenced by other Game Effects.
    - **818.5.a.** Whether or not a Gear has Equip may be referenced even if the Rules Text of the Gear is Inactive. See rule 716. Attachment for more information.
- **819.** Quick-Draw
  - **819.1.** Quick-Draw is a Triggered Ability keyword. It is also a Permissive keyword.
    - **819.1.a.** Quick-Draw is present on Gear with Equip abilities.
    - **819.1.b.** Cards with Quick-Draw have Reaction inherently.
    - **819.1.c.** Quick-Draw allows cards to be played and Attached using Reaction timing.
    - **819.1.d.** Quick-Draw is functionally short for “[Reaction]” and “When you play this, attach it to a Unit you control.” See rule 716. Attachment for more information.
  - **819.2.** Multiple instances of Quick-Draw do not trigger separately and have no effect beyond the first.
  - **819.3.** Quick-Draw, and whether or not a gear has Quick-Draw, is a characteristic of the Gear and may be checked or referenced by other Game Effects.
- **820.** Repeat
  - **820.1.** Repeat is an Optional Additional Cost keyword.
    - **820.1.a.** Repeat is present on Spells and Abilities.
    - **820.1.b.** Repeat is an optional cost that a player may pay to execute the effect of their spells and abilities a second time.
    - **820.1.c.** Repeat is formatted as “Repeat [Cost]”
      - **820.1.c.1.** The Cost is an Additional Cost to be paid during the steps of playing the spell or ability.
      - **820.1.c.2.** If a spell or ability has more than one instance of Repeat, each Cost may be paid or not paid individually.
      - **820.1.c.3.** Each Repeat Cost can be paid only a single time.
    - **820.1.d.** Repeat is functionally short for “You may pay [Cost] as an additional cost as you play this. If you do, execute the instructions of this chain item one additional time during resolution.”
      - **820.1.d.1.** When the additional cost is paid, the effect of the spell or ability, upon resolution, will be performed an additional time. Example: Desert’s Call is a spell with [Repeat] [2] and “Play a 2 [M] Sand Soldier unit token.” If its controller pays its Repeat cost as they play it, the card’s instruction to play a Sand Soldier is executed twice, as though the card says “Play a 2 [M] Sand Soldier unit token. Play a 2 [M] Sand Soldier unit token.” Example: A unit reads in part “When I attack or defend, you may deal damage equal to my Might to an enemy unit here,” and “My abilities have [Repeat] — Discard 1.” When its ability triggers, if its controller pays the Repeat cost as they play it, the ability’s instruction to deal damage equal to the unit’s Might is executed twice, as though the ability says “Deal damage equal to my Might to an enemy unit here. Deal damage equal to my Might to an enemy unit here.”
      - **820.1.d.2.** Any instructions not performed on resolution of the spell or ability are ignored.
  - **820.2.** When a spell or ability’s effect is performed an additional time with Repeat, choices must be made at the usual time during the Make Relevant Choices step of Playing a Card. See rule 349. Playing Cards for more information.
    - **820.2.a.** Choices made for the additional execution do not have to be the same as the choices made for the initial execution. Example: Rocket Barrage is a spell with [Repeat] [4][C] and “Choose one — Deal 4 to a unit in a base. [or] Kill a gear.” If Rocket Barrage’s controller pays its Repeat cost as they play it, they may choose the same mode or a different one, and if they choose the same mode, may choose the same target or a different one. If they choose “Kill a gear” twice and choose two different gear, they must specify which gear is the first target and which is the second. As the spell resolves, those two gear will be killed in the chosen order.
  - **820.3.** Multiple instances of Repeat can be paid for separately. The spell or ability’s instructions will be executed an additional time on resolution for each instance of Repeat that is paid for.
    - **820.3.a.** Regardless of the number of times a spell or ability's instructions are executed with this keyword, it is only Played once.
  - **820.4.** Repeat, and whether or not a spell or ability has Repeat, is a characteristic of the spell or ability and may be checked or referenced by other Game Effects.
- **821.** Weaponmaster
  - **821.1.** Weaponmaster is a Triggered Ability keyword.
    - **821.1.a.** Weaponmaster is present on Units.
    - **821.1.b.** Weaponmaster is a Play Effect that chooses an Equipment you control and allows you to pay its Equip cost at a discount, regardless of the usual timing of the Equip ability, to Attach that Equipment to the unit with Weaponmaster.
    - **821.1.c.** Weaponmaster is functionally short for: “When you play me, you may choose a Card you control with the Equipment tag. Necessary portions of its Rules Text are no longer Inactive if they are currently Inactive. Pay the cost of its Equip ability, reduced by [A], to attach it to this unit.” See rule 716. Attachment for more information.
      - **821.1.c.1.** Weaponmaster can choose an Equipment whether it has an Equip ability or not.
      - **821.1.c.2.** The cost of the Equip ability is determined as though that Equip ability was being activated choosing the unit with the Weaponmaster ability, as modulated by any abilities that alter Equip costs.
      - **821.1.c.3.** If the chosen card’s Equip cost does not contain [A], it can still be paid, but will not be reduced.
      - **821.1.c.4.** If the chosen card doesn’t have an Equip cost, it can’t be paid.
      - **821.1.c.5.** If the chosen card’s Equip cost can’t be paid, if it can’t be detached from its current Top-Most card, or if it can’t be attached to the unit with the Weaponmaster ability, it stays in its current location, Attached to anything it was already Attached to.
      - **821.1.c.6.** The Equip ability is not activated this way, and the unit with the Weaponmaster ability is not chosen.
      - **821.1.c.7.** Multiple instances of Weaponmaster trigger separately, and can choose different targets.
    - **821.1.d.** If you choose the same target with multiple instances of Weaponmaster, each will resolve separately.
  - **821.2.** Weaponmaster has no function while on the board.
  - **821.3.** Weaponmaster, and whether or not a unit has Weaponmaster, is a characteristic of the Unit and may be checked or referenced by other Game Effects.
- **822.** Ambush
  - **822.1.** Ambush is a Passive Ability keyword.
    - **822.1.a.** It is normally present on Units.
    - **822.1.b.** It is functionally short for "I may be played to a battlefield where you control Units" and “I have [Reaction] as long as I’m being played to a battlefield where you control Units.”
    - **822.1.c.** It is a passive ability that adds options to locations that are valid for a Unit to be played to during the Make Relevant Choices step of Playing a Card See rule 349. Playing Cards for more information
    - **822.1.d.** Ambush can also appear as a verb on a card. In such a case, the verb is taken to mean “play with the permissions of the Ambush keyword.” Example: Rengar, Trophy Hunter reads in part “I can [Ambush] to a battlefield where there are enemy units, even if you don't have units there.” This ability expands the normal permissions of the Ambush keyword to include battlefields where there are enemy units. Example: A card reads in part “Opponents can only [Ambush] at any time they could play cards with [Action].” This ability introduces a restriction to when opponents can play cards with Ambush.
  - **822.2.** Multiple instances of Ambush are redundant.
  - **822.3.** If there are no units at the location chosen before Finalization completes for any reason, then it is no longer a valid location by Ambush’s reasoning and cannot be played there
    - **822.3.a.** Other effects and permissions may still enable this Unit to be able to be played to the selected location, but Ambush’s permission will not be valid
  - **822.4.** Ambush, and whether or not a unit has Ambush, is a characteristic of the Unit and may be checked or referenced by other Game Effects.
- **823.** Hunt
  - **823.1.** Hunt is a Triggered Ability keyword.
    - **823.1.a.** Hunt is present on Units.
    - **823.1.b.** Hunt is both a Conquer and a Hold effect.
    - **823.1.c.** Hunt is formatted as “Hunt X”
      - **823.1.c.1.** Hunt is functionally short for: “When I Conquer or Hold, my controller gains X XP.” See rule 728. XP for more information
      - **823.1.c.2.** If X is omitted, it is presumed to be 1.
      - **823.1.c.3.** X is referred to as the Hunt Value.
  - **823.2.** If a Unit has Hunt, or has been granted Hunt, and is granted Hunt by an additional source, the Hunt Value of all granted Hunt keywords is summed.
  - **823.3.** Hunt, and whether or not a unit has Hunt, is a characteristic of the Unit and may be checked or referenced by other Game Effects.
- **824.** Level
  - **824.1.** Level is a Dependent Keyword.
    - **824.1.a.** It is formatted as "[Level [N][>] [Text]".
    - **824.1.b.** Starting from the Keyword to the end of the clause, the entire statement is the Level Ability.
      - **824.1.b.1.** It is functionally short for “While you have [N] or more XP, this card gains ‘[Text]’.”
      - **824.1.b.2.** The [Text] here is the Dependent Ability
    - **824.1.c.** As long as the controlling player has [N] XP, then the Dependent Ability will be be Active on the card with Level
      - **824.1.c.1.** If the controller of the card with Level changes, then the Dependent Ability will be rendered Active or Inactive based on the new controller’s XP.
    - **824.1.d.** The Dependent Ability will be Inactive as soon as the controlling player has less than [N] XP.
  - **824.2.** Level, and whether or not a card has Level is a characteristic of the card and may be checked or referenced by other Game Effects.
- **825.** Unique
  - **825.1.** Unique is a Deck Constraint Permission.
  - **825.2.** It is normally present on main deck cards.
  - **825.3.** Unique is not functionally short for any rules text, and instead provides a restriction to players during Deck Construction.
    - **825.3.a.** A deck can contain only one card of a given name if the card has Unique
    - **825.3.b.** If a card is a Signature card and is also Unique, then that deck can contain any combination of three Signature cards, but still only one of each named Unique card.
  - **825.4.** Cards with Unique have no additional effects during gameplay.
  - **825.5.** Unique, and whether or not a Card has Unique, is a characteristic of the Unit and may be checked or referenced by other Game Effects.
- **826.** Backline
  - **826.1.** Backline is a Passive Ability keyword.
  - **826.2.** It is present on Units.
  - **826.3.** It is functionally short for “I must be assigned lethal damage after any other unit with the same controller as me that does not have [Backline] during the Combat Damage step.”
  - **826.4.** It alters how players can elect to assign combat damage during combat.
    - **826.4.a.** Players must still assign lethal damage to a unit before moving to the next when assigning their damage.
    - **826.4.b.** If more than one unit with Backline is present with the same controller in Combat, damage may be assigned to any of them. Units with Backline are invalid assignments until all units without Backline have lethal damage assigned to them.
  - **826.5.** Multiple Instances of Backline are redundant.
  - **826.6.** Backline, and whether or not a unit has Backline, is a characteristic of the Unit and may be checked or referenced by other Game Effects.
- **827.** Empower
  - **827.1.** Empower is an Activated Ability keyword.
    - **827.1.a.** Empower is normally present on permanents and legends.
    - **827.1.b.** Empower has a cost to activate and Empowers the source of the ability when the cost is paid. See rule 441. Empower (Game Action) for more information.
      - **827.1.b.1.** The source game object is not a target of the Empower ability.
    - **827.1.c.** Empower is formatted as “Empower [Cost]”
      - **827.1.c.1.** Empower is functionally short for “[Cost]: Empower this. Play only if not Empowered.”
      - **827.1.c.2.** Empower costs may include both resource costs and non-resource costs.
      - **827.1.c.3.** Empower abilities may also include text that alters the Empower cost. Such text is taken into account when determining a card’s Empower cost for any reason.
      - **827.1.c.4.** Empower abilities may include text that alters the timing of the Empower ability.
  - **827.2.** When the Empower action completes from this keyword, the source permanent or legend becomes Empowered.
    - **827.2.a.** This is an event other Game Effects and Triggered Abilities can reference.
  - **827.3.** Multiple instances of Empower are equivalent to multiple activated abilities and can each be activated separately by paying the corresponding costs.
  - **827.4.** Empower and whether a permanent or legend has Empower are a characteristic of those Game Objects and may be checked or referenced by other Game Effects.
- **828.** Empowered
  - **828.1.** Empowered is a Dependent Keyword.
    - **828.1.a.** It is formatted as “[Empowered][>] [Text].”
    - **828.1.b.** Starting from the keyword to the end of the clause, the entire statement is the Empowered Ability.
      - **828.1.b.1.** It is functionally short for “While I have the Empowered status, this card gains ‘[Text]’.”
      - **828.1.b.2.** The [Text] here is the Dependent Ability.
    - **828.1.c.** As long as the Game Object has the Empowered status, then the Dependent Ability will be active.
    - **828.1.d.** If the Dependent Ability is a Triggered Ability whose condition is “When I become Empowered,” or a permutation thereof, it will be active and trigger when its source becomes Empowered.
  - **828.2.** Empowered and whether or not a card has an Empowered Ability is a characteristic of the card that may be checked or referenced by other Game Effects.
- **829.** Flow
  - **829.1.** Flow is a passive ability keyword.
    - **829.1.a.** Flow is present on Spells.
    - **829.1.b.** It is functionally short for “You may play this from your trash for its flow cost. Then banish it.”
      - **829.1.b.1.** Banishing the spell in this way is a delayed replacement effect. If the spell would leave the chain after becoming a finalized chain item, and leaving the chain wasn’t instructed by its own execution, banish it instead. See rule 367. Replacement Effects for more information. See rule 389. Delayed Abilities for more information.
      - **829.1.b.2.** Playing a spell for its Flow cost does not change the timing at which it can be played, nor any permissions for the spell aside from the zone from which it can be played.
    - **829.1.c.** Flow is formatted as “Flow [Cost]”
      - **829.1.c.1.** The cost is an alternate cost that replaces the base cost of the spell to be paid during finalization.
      - **829.1.c.2.** Flow costs may include both resource costs and non-resource costs.
      - **829.1.c.3.** If a spell has multiple instances of the Flow keyword with different costs, its controller may choose which cost to apply as they play it.
  - **829.2.** Flow, and whether or not a spell has Flow, is a characteristic of the Spell and may be checked or referenced by other Game Effects.