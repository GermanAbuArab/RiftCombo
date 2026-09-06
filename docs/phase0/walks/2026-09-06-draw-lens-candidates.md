# Walk — issue #59, the draw lens (6 candidates, 0 refutations, 2 rewritten before they were written)

Date: 2026-09-06. Rules: `data/Riftbound-Core-Rules-2026-07-16.txt`.
Card text: `data/corpus_flat.txt`, verbatim, grepped. Catalogue before this walk: **180 entries, 180 verified**.

All six candidates of #59 are **ENGINE**, so the bar is *"the mechanism produces what the entry says"*,
not *"it reaches 8"*. None was promoted and none was demoted. Two of them do not survive **as #59 wrote
them** and are entered corrected, with the correction named:

* candidate 4 (`jax-angle-shot-attach-draw`) was **illegal by Domain Identity** — Jax is Body, Angle Shot
  is Fury and #59's Equipment, `SFD-064` Cloth Armor, is **Mind**. 103.1.b.1 forbids three domains. Fixed
  with `SFD-009` Serrated Dirk (Fury, E1, **M+0**), which also keeps Jax off the Mighty line.
* candidate 6 (`hwei-move-draw-ready-runes`) was filed *conditional* — *"se camina sólo si el que la camine
  encuentra el mover"*. Two movers exist and the cheaper one is **free**: Hwei's own Standard Move.

And one candidate was **undersold** by its own hunt: #59 called `UNL-051` Ivern, Nurturer
*"consistencia, no ventaja de cartas"*. It draws the revealed unit, so it is +1 card in hand and −1 card
in deck, on top of the Draw Phase. It is card advantage — the only free, repeatable, Burn-Out-proof kind
in the pool.

---

## 0. Card text — grepped verbatim, every card this walk touches

```
SFD-142 | Jae Medarda | Unit | Chaos | E5 P2 M5 | When you choose me with a spell, draw 1. [Tags: Noxus]
OGN-095 | Stupefy | Spell | Mind | E1 | [Reaction] (Play any time, even before spells and abilities resolve.) Give a unit -1 :rb_might: this turn, to a minimum of 1 :rb_might:. Draw 1.
SFD-144 | Spirit Wheel | Gear | Chaos | E2 | When you choose a friendly unit, you may pay :rb_energy_1: and exhaust this to draw 1.
SFD-196 | Defiant Dance | Spell | Calm/Chaos | E1 P1 | [Reaction] (...) Give a unit +2 :rb_might: this turn and another unit -2 :rb_might: this turn. [Tags: Irelia]
SFD-195 | Blade Dancer | Legend | Calm/Chaos | - | When you choose a friendly unit, you may exhaust me and pay :rb_rune_rainbow: to ready it. When you conquer, you may pay :rb_energy_1: to ready me. [Tags: Irelia]
UNL-209 | Dusk Rose Lab | Battlefield | Colorless | - | At the start of your Beginning Phase, you may kill a unit you control here to draw 1. (This happens before scoring.)
UNL-172 | LeBlanc, Fragmented | Unit | Order | E3 P1 M3 | [Assault] (+1 :rb_might: while I'm an attacker.) [Deathknell][>] Draw 1. If it's your Beginning Phase, draw 2 instead. (When I die, get the effect.) [Tags: Noxus, LeBlanc]
SFD-167 | Unsung Hero | Unit | Order | E2 M2 | [Deathknell] — If I was [Mighty], draw 2. (When I die, get the effect. I'm Mighty while I have 5+ :rb_might:.) [Tags: Elite, Demacia]
UNL-173 | Sacrifice | Spell | Order | E1 | [Reaction] (...) As an additional cost to play this, kill a friendly [Mighty] unit. (A unit is Mighty while it has 5+ :rb_might:.) Draw 2 and channel 1 rune exhausted.
SFD-161 | B.F. Sword | Gear | Order | E4 M+3 | [Equip] :rb_rune_order: (:rb_rune_order:: Attach this to a unit you control.) [Tags: Equipment]
SFD-119 | Jax, Unrelenting | Unit | Body | E4 P1 M3 | [Weaponmaster] (When you play me, you may [Equip] one of your Equipment to me for :rb_rune_rainbow: less, even if it's already attached.) When you attach an Equipment to me, you may pay :rb_energy_1: to draw 1. [Tags: Jax, Icathia]
SFD-011 | Angle Shot | Spell | Fury | E2 | [Reaction] (...) Choose a unit and an Equipment with the same controller. Attach that Equipment to that unit or detach that Equipment from that unit. Draw 1.
SFD-009 | Serrated Dirk | Gear | Fury | E1 M+0 | [Equip] :rb_rune_fury: (:rb_rune_fury:: Attach this to a unit you control.) [Effect] [Assault 2] (+2 :rb_might: while I'm an attacker.) [Tags: Equipment]
SFD-064 | Cloth Armor | Gear | Mind | E1 M+0 | [Quick-Draw] ... [Equip] :rb_rune_mind: ... [Effect] [Shield 2] [Tags: Equipment]
UNL-051 | Ivern, Nurturer | Unit | Calm | E5 P1 M4 | When you play me or when I hold, look at the top 3 cards of your Main Deck. You may reveal a unit from among them and draw it. Recycle the rest. Then if you revealed a Bird, Cat, Dog, or Poro, do this: [Buff] a friendly unit. [Tags: Ivern, Ionia]
UNL-080 | Hwei, Brooding Painter | Unit | Mind | E5 P1 M5 | When I move, draw 1, then discard 1. Then, do the following based on the discarded card's type: • Spell — Draw 1. • Gear — Ready up to 2 runes. • Unit — Give me +3 :rb_might: this turn. [Tags: Ionia, Hwei]
UNL-083 | Smoke and Mirrors | Spell | Mind | E2 | [Hidden] ... [Action] ... Choose a unit you control and another unit you control at a different location. If at least one of them has [Temporary], move each to the other's location. Draw 1.
UNL-078 | Sprite Fountain | Gear | Mind | E2 P1 | [Temporary] (...) When you play this, play a ready 3 :rb_might: Sprite unit token with [Temporary] to your base. [Deathknell][>] Repeat this gear's play effect.
UNL-082 | Lillia, Fae Fawn | Unit | Mind | E3 M3 | [Accelerate] (...) When I move from a location, play a 3 :rb_might: Sprite unit token with [Temporary] there. [Tags: Fae, Lillia, Ionia]
SFD-079 | Bard, Mercurial | Unit | Mind | E4 P1 M4 | You may exhaust your legend as an additional cost to play me. When you play me, if you paid the additional cost, move any number of your units to an open battlefield. [Tags: Bard]
OGN-110 | Ekko, Recurrent | Unit | Mind | E5 P1 M5 | [Accelerate] (...) [Deathknell] — Recycle me to ready your runes.
```

**Ban check.** `grep -o "\[BANNED[^]]*\]"` over each of the 21 codes above returns nothing. The corpus
carries 12 rows with a `[BANNED …]` marker and none of them is here. `SFD-009` Serrated Dirk is already
in `jhin-fiora-facebreaker-recall`, so it is a card the catalogue has used before.

---

## 1. Rules block — every paragraph these entries cite, opened first and in bulk

| § | verbatim |
|---|---|
| 103.1.b.1 | "Cards included in your deck must abide by your Domain Identity." |
| 103.4.c | "Cannot include more than one of a Battlefield of the same name when there are more than one required for the deck" |
| 143.4 | "Units enter the Board exhausted." |
| 144.2 | "Exhausting the Unit is the Cost for this action." (the Standard Move) |
| 164.2.a | "[E]: [Reaction] — Add [1]." (a rune's Energy ability) |
| 164.2.b | "Recycle this: [Reaction] — Add [C]." (a rune's Power ability — no exhaust in the cost) |
| **170.11.c** | **"Battlefields can be 'open.' This means they are unoccupied and uncontrolled."** |
| 190.1 | "Control is established over Battlefields through the course of play." |
| 190.6.d | "'You' in a battlefield's abilities refers to the battlefield's Controller, as does the implied 'you' in instructions that don't specify a player like **'draw 1.'** If the battlefield has no Controller, 'you' refers to no one, and all such instructions are ignored." |
| 194.1.d | "When an opponent Burns Out and picks that player to gain 1 point. See rule 431." |
| 310.1 / 310.2 | "Neutral Open: There is no Showdown or Combat in progress and no Chain exists." / "Neutral Closed: … and a Chain exists." |
| 315.1.b | "1. The Turn Player readies all Game Objects they control that are able to be readied." (Awaken) |
| 315.2.a.1 | "At the start of Beginning Phase game effects take place." (Beginning Step) |
| 315.2.b.2 | "1. The Turn Player Holds all Battlefields they Control." (Scoring Step) |
| 315.4.b | "1. The Turn Player draws 1." (Draw Phase — *after* the Beginning Phase) |
| 319.1 / 319.6 | a Cleanup becomes Outstanding "After the game transitions to or from an Open or Closed state" / "After any number of Game Objects enter or leave the Board" |
| 323.6 | "4. Players lose control of any controlled Battlefields without their Units occupying them **if the turn is in an Open State** and there is no Showdown or Combat ongoing there." |
| 340.1 | "The newest Finalized Chain Item resolves." |
| 354 / **355** / 357 / 358 / 359 | the five steps of playing a card: "1. Move the card from its current zone to the Chain." / "**2. Make relevant choices.**" / "4. Pay the card's costs." / "5. Check legality." / "6. Finish finalizing…" |
| 355.5 | "If a card requires you to specifically choose one or more Game Objects, that choice is made now." |
| 355.5.a | "This does not include cards that affect one or more Game Objects based on criteria. **Example: 'Stun a unit at a battlefield' is a Choice.**" |
| 355.7 | "When a card Chooses one or more specific Game Objects to affect, it is Targeted unless indicated otherwise by the rules in this section." |
| 383.3.c | "Triggered Abilities can be put on the Chain during Closed States or Open States on any player's turn." |
| 383.4.d.2.a | "The Hold Abilities of Units are put on the Chain as Pending Items after the Unit these effects correspond to are present at a Battlefield when a player maintains control of it and Gains 1 Victory Point during their Beginning Phase from Holding." |
| 415.1 | "Readying is an action that marks a non-spell Game Object on the board as available for action." |
| 416.1 / 416.1.a | "Recycling cards is the action in which a player takes one or more cards from a specific zone and then puts it on the bottom of the corresponding deck." / "Main Deck cards are Recycled to the Main Deck." |
| 416.5 | "If 2 or more cards are Recycled to the Main Deck simultaneously, they are placed on the bottom of that deck in a random order." (worked example: Garbage Grabber) |
| 419.4 / 419.4.a / 419.4.a.1 | "Some Abilities trigger **when cards are played** or otherwise check whether cards have been played." / they trigger "when the act of playing the card has been completed by the resolution of the card" / a countered card triggers nothing |
| 420.1 / 420.2.a | "Moving is the act of a Game Object moving between two Locations on The Board." / "Players may only move Game Objects when instructed to do so by Game Effects or costs." |
| 428.1.a.1 | "Active Kill is when the action is taken when instructed by a game effect **or as a cost** for a card or ability." |
| **431.1.a** | "If a player must **Draw** cards in excess to the number of cards in their Main Deck, they will Draw as many as possible, perform this action, then Draw the remaining amount instructed." |
| **431.1.b** | "If a player must **put one or more cards from their Main Deck in any other zone**, such as the Trash, in excess of the number of cards in their deck they will do so as much as possible, perform this action, and then complete the remaining number required by the instruction." |
| **431.1.c** | "If an instruction directs a player to **look at or reveal** cards in excess to the number of cards in a player's Main Deck, that player looks at or Reveals as many as possible, **but does not Burn Out**, then proceeds with the rest of the instruction." |
| **431.1.c.1** | "If there are insufficient cards among the looked at or revealed cards to perform subsequent actions to the revealed or looked at cards, any further instructions are ignored. **This does not cause a Burn Out**, even if those instructions would cause those cards to change zones. Reminder: Cards are considered in the zone of origin while being looked at or revealed, in this case the Main Deck." |
| 431.2.a–d | "Performs as much of the prescribed action as possible." / "Recycles their trash into their Main Deck." / "**Chooses an opponent to gain 1 point.**" / "Completes the remainder of the action…" |
| 434.1.c / .d | "The Top-Most card has all Effect Text of all cards Attached to it appended to its Rules Text." / "…has its Might modulated by the Might Bonus of all cards Attached to it." |
| 434.1.f | "Attaching a card to a new Top-Most Card will cause it to Detach from the card to which it is currently Attached." |
| 434.1.g / .h | "Attaching a card to its current Top-Most Card will not have any effect." / "If a Game Effect instructs a player to Attach a card to its current Top-Most Card, nothing additional happens." |
| 435.1 | "Detaching is the act of unlinking two cards that are currently linked through the act of Attaching." |
| 446.1 | "A Permanent changing its position from any space on the Board to another space on the Board is a Move, unless it is caused by a corrective Recall or an Attached Permanent changing locations to or with its Top-Most Card." |
| 456.1 | (Recalls) "They do not cause Triggered Abilities to trigger that are triggered by Move actions." |
| 709 | "A Unit 'becomes Mighty' at the moment its Might changes from being less than 5 to being 5 or greater." |
| 808.1.c / .d | "It is functionally short for 'When I die, [Effect].'" / "The Trigger … is the Permanent being Killed and sent to the Trash." |
| 811.1.b | "…you may pay [A] to hide this facedown at a battlefield you control … Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base cost." |
| 811.1.d.2 | "…those targets must be chosen from among options at that battlefield, **unless the ability explicitly restricts targeting in a way that makes this impossible.**" |
| 813.1.b | "Reaction grants the corresponding card or effect all abilities and permissions of Action." |
| 816.1.b | "At the start of this permanent's controller's Beginning Phase, before scoring, kill this." |
| 820.1.c.3 | "Each Repeat Cost can be paid only a single time." |
| 485.4.a / 485.5 / 486.5 / 487.5 | three provided, one used; **randomly** in Duel and Skirmish, **chosen** in Match |

### 1.1 — the one term the manager flagged, opened: `170.11.c`

**170.11.c**: *"Battlefields can be 'open.' This means they are **unoccupied and uncontrolled**."*

Two conditions, not one. R31 was retired on 2026-09-06 on the strength of Riot's Spiritforged errata
(*"When I conquer an open battlefield"* → *"When I conquer a battlefield that was uncontrolled"*), and the
retirement recorded only the control half. The Core Rules define the word outright and it also requires the
battlefield to be **unoccupied**.

**No candidate of #59 prints the word**, so none of the six is affected. The one catalogued entry that is,
`bard-mercurial-mass-relocation`, is corrected in this commit — see §8.

---

## 2. `jae-medarda-choose-draw` — ENGINE — Mind/Chaos — **HOLDS**

**The rule that closes it needs no reading.** Stupefy says *"Give a unit -1 Might this turn"*. **355.5**
makes that a choice made while playing the card, and **355.5.a**'s own worked example is the same grammar:
*"'Stun a unit at a battlefield' is a Choice."* Jae reads *"When you choose me with a spell, draw 1."*

**And the choice happens at step 2 of five.** 354 puts the card on the chain, **355** makes the choices,
357 pays the costs, 358 checks legality, 359 finalizes. So Jae's trigger fires **before the spell is even
paid for**. That is why **419.4** does not reach it: 419.4 is scoped by its own first sentence to abilities
that trigger *"when cards are played"*, and 419.4.a puts those at *resolution*. Jae triggers on a **choice**.
A Stupefy that gets countered still leaves you the Jae card. Not filed as a reading: it changes no
arithmetic here, and 419.4's scope is printed in 419.4 itself.

**Arithmetic with the declared quantities** (`SFD-142` ×1, `OGN-095` ×3, `SFD-144` ×1):

| | Energy | cards spent | cards drawn | net cards |
|---|---|---|---|---|
| Stupefy on Jae | −1 | 1 | 2 (Stupefy's + Jae's) | **+1** |
| … with Spirit Wheel ready | −2 | 1 | 3 | **+2** |
| three Stupefies, Spirit Wheel once | −4 | 3 | 7 | **+4** |

Spirit Wheel carries an **exhaust**, so it is once per turn, readied at the next Awaken (315.1.b) — the
same limit #59's own finding 4 records for the thirteen exhaust-gated draws.

**The price to beat.** The loop ledger of #21 prices `SFD-088` Renata Glasc, Mastermind's exhaust-free
`1 Energy + 1 Mind: Draw 1` at **1 Power = 9 Energy**, so ≈10 Energy per extra card. Jae's marginal card
costs **1 Energy**. That is the headline and it is real.

**Why it is ENGINE and not more, re-measured today.** Nothing in Mind/Chaos recycles Stupefy, so the
ceiling is the three copies 103.2.b allows. And it reaches no INFINITE: recomputed against the
**14** INFINITE entries in today's catalogue (not the 12 #59 saw), only `pursuer-herald-recruits` has
Chaos in its domain union, and its anchor `OGN-177 Stealthy Pursuer` carries `[BANNED constructed:banned,
2v2:banned]`.

```
lux-infinite-energy                        mind, order
lux-infinite-power                         mind, order
renata-mastermind-points                   mind, order
pursuer-herald-recruits                    chaos, order   <- BANNED anchor
renata-bubble-bot-ready                    mind
jayce-mesmerize-renata                     mind
jhin-fiora-facebreaker-recall              fury, order
garen-fiora-malzahar-facebreaker-recruits  mind, order
jhin-virtuoso-ekko-malzahar-vi             fury, mind
gemdragon-henge-vi-blind-fury              body, fury
twilight-reveler-eye-facebreaker-recruits  fury, order
lady-luminosity-loop-comet                 mind, order
threshold-reveler-infinite-energy          calm, fury
reveler-svellsongur-jhin-infinite-power    calm, fury
```

**The cost the hunt did not price.** Every Stupefy takes 1 Might off Jae for the turn (to a minimum of 1).
Three of them run him 5 → 2. He stops being Mighty on the first one, which matters in any shell that pays
for `[Mighty]`. Recorded in the entry.

**The Calm/Chaos variant is a different deck and it already has an entry.** `SFD-196` Defiant Dance chooses
**two** units for E1+P1, so two Jae would be two draws — but that is the `SFD-195` Blade Dancer shell, which
is Calm/Chaos, and Jae's own entry is Mind/Chaos. Cross-referenced to `blade-dancer-caitlyn-choose-ready`,
not merged: 103.1.b.1 keeps Mind and Calm apart.

---

## 3. `dusk-rose-lab-leblanc-beginning-draw` — ENGINE — Order — **HOLDS, with the trap traced**

**Timing.** 315.2.a.1 puts the Lab's trigger in the **Beginning Step**; 315.2.b.2 puts the Hold in the
**Scoring Step** after it. Both are inside the Beginning Phase (315.2), so LeBlanc's *"If it's your
Beginning Phase, draw 2 instead"* is live, and the card even prints the reminder *"(This happens before
scoring.)"*. The Draw Phase is later still (315.4.b).

**190.6.d names this exact case**, down to the words: *"the implied 'you' in instructions that don't specify
a player like **'draw 1.'** If the battlefield has no Controller, 'you' refers to no one."* So the Lab does
nothing until you control it.

**Arithmetic** (`UNL-209` ×1, `UNL-172` ×3): 1 (Lab) + 2 (Deathknell) = **3 cards, 0 Energy, 0 Power**, at
the start of each of three Beginning Phases. LeBlanc herself cost E3 + 1 Power on an earlier turn, so the
line is 3 cards for 3 Energy + 1 Power, spread across two turns. After the three copies are gone the Lab
keeps paying **1 card a turn** for any spare body you are willing to feed it.

**The trap #59 named, traced through the Cleanup — and it does not bite where #59 put it.**
Killing your only unit at the Lab does cost you the Hold, but not at the moment you might expect:

1. The Lab's trigger resolves; LeBlanc is killed. **319.6** makes a Cleanup Outstanding.
2. At that Cleanup, LeBlanc's Deathknell is already a Pending Item on the Chain (808.1.d), so the turn is
   **Neutral Closed** (310.2) — and **323.6** is conditioned on *"if the turn is in an **Open** State"*.
   Control is **not** stripped here.
3. The Deathknell resolves (340.1): draw 2. The Chain empties → the turn transitions to Neutral Open
   (310.1) → **319.1** makes another Cleanup Outstanding.
4. *That* Cleanup runs 323.6 with the condition true, and you lose the Lab — still before 315.2.b.2.

So the outcome #59 predicted is right and the mechanism is one Cleanup later than it looks. **A second
body at the Lab is an ingredient, not a nicety**: with it you keep the Lab, the Hold and the point.

**Not a duplicate of `karthus-leblanc-fragmented-temporary-draw`.** Same LeBlanc, different killer: that
entry kills her with `[Temporary]` from Shadow's Call under two Karthus (R1 = A stacking); this one kills
her with a battlefield and needs no second card. They share no card except LeBlanc herself.

**Burn Out is the ceiling, and it arrives early.** The three cards land in the Beginning Phase, *before*
the Draw Phase (315.4.b). 431.1.a then draws what is left and hands the opponent a point (431.2.c,
194.1.d). Same ceiling the Karthus entry already records.

**Battlefield caveat**, in the project's standard form: random 1 of 3 in Duel (485.5) and Skirmish
(487.5), chosen in Match (486.5); 103.4.c and Tournament Rules 402.1 forbid two of the same name.

---

## 4. `unsung-hero-sacrifice-double-draw` — ENGINE — Order — **HOLDS, and its negative half is stronger than #59's**

**The +3 Might #59 asked for has exactly one clean answer in Order, and it is a gear.** A `[Buff]` is
+1 and a unit can hold only one, so no stack of buffs reaches the line. `SFD-161` **B.F. Sword** is Order,
E4, **M+3**, `[Equip]` 1 Order rune. 2 + 3 = 5, and **709** is satisfied on the way up. `SFD-178` Blade of
the Ruined King (M+4) also works but its `[Equip]` costs a friendly unit's life on top.

**The cycle.** Attach the Sword (1 Order Power). Play Sacrifice (1 Energy, `[Reaction]` — 813.1.b gives it
every permission of Action, so no showdown is needed). Its **additional cost** is paid at step 4 of playing
(357) and **428.1.a.1** makes killing-as-a-cost an Active Kill. **808.1.d** fires Unsung Hero's Deathknell,
which goes on the Chain *above* Sacrifice, so **340.1** resolves *"If I was Mighty, draw 2"* first, then
Sacrifice's *"Draw 2 and channel 1 rune exhausted"*.

| per cycle | |
|---|---|
| cards spent | 2 (Unsung Hero, Sacrifice) |
| cards drawn | **4** |
| **net cards** | **+2** |
| Energy | −3 (Unsung Hero E2, Sacrifice E1) |
| Power | −2 Order (the Sword's `[Equip]`, once per Unsung Hero via 434.1.f) |
| runes | **+1**, channelled exhausted — and 164.2.b recycles it for 1 Power with no exhaust in the cost |

So ≈**3 Energy + 1 net Order Power for 2 cards**, against the ledger's ≈10 Energy per card. Three cycles,
one per copy; **434.1.g / 434.1.h** are why the Sword has to be moved (434.1.f) rather than re-attached in
place.

### 4.1 The negative half — it does **not** patch the Lux ledger, and the reason is not the one #59 gave

#59 modelled this as *"the Energy pass's Sacrifice kills Unsung Hero instead"*: 4 Forge slots instead of 3,
5 cards back instead of 4, 6 draws instead of 4, +1 draw over an empty deck. **That model is not available.**
`lux-infinite-energy`'s own steps say what its Sacrifice kills:

> *"Play Sacrifice (1 Energy, Reaction …). **Its additional cost kills Ekko**, and Ekko's [Temporary] dies
> with him…"* — and Ekko's Deathknell (*"Recycle me to ready your runes"*) **is the engine**. `OGN-110`
> Ekko, Recurrent is M5, so he satisfies Sacrifice's `[Mighty]` requirement on his own.

Sacrifice kills **one** unit. Swap the victim and the loop stops readying its eleven runes. So adding
Unsung Hero costs a **second** Sacrifice every pass, and the arithmetic is worse than #59's, not better:

| Energy pass | today | with Unsung Hero + a second Sacrifice |
|---|---|---|
| cards to bring back per pass | 4 (Forge, Shadow's Call, Sacrifice, Ekko) | **6** (+ Sacrifice #2, + Unsung Hero) |
| Forge recycle slots (`Recycle up to 4`) | 3 used, 1 spare | **4 used, 0 spare** — Unsung Hero has **no slot at all** |
| draws per pass | 4 | **8** (+2 from Sacrifice #2, +2 from the Deathknell) |
| draws − cards entering the deck | **0** | **+3** |

With the Main Deck empty — `lux-infinite-energy`'s own first notable is *"Main Deck EMPTY"* — those three
extra draws are **431.1.a** three times, i.e. **431.2.c → 194.1.d**, three points for the opponent per pass.
It is a standalone Order engine and nothing else. #59's conclusion was right; its ledger was not.

---

## 5. `jax-angle-shot-attach-draw` — ENGINE — Fury/Body — **HOLDS after a legality fix**

**#59's version cannot be built.** Jax is **Body**, Angle Shot is **Fury**, and the Equipment it names,
`SFD-064` Cloth Armor, is **Mind**. Three domains, and **103.1.b.1** forbids it; every Legend has exactly
two. Swept the pool's 40 Equipment for a Fury or Body one with **no Might Bonus**: `SFD-009` Serrated Dirk
(Fury, E1, M+0) and `SFD-016` Recurve Bow (Fury, E2, M+0). Serrated Dirk is the cheaper and is entered.
Its M+0 also keeps Jax at 3 Might, which matters in §5.1.

**The rule that shapes the cycle.** **434.1.g**: *"Attaching a card to its current Top-Most Card will not
have any effect."* **434.1.h** says a game effect instructed to do it does nothing either. So the Equipment
has to come off first — by Angle Shot's own *"detach"* mode, or by **434.1.f** (attach it elsewhere).

**Arithmetic** (`SFD-119` ×1, `SFD-011` ×3, `SFD-009` ×1):

| step | Energy | cards spent | cards drawn |
|---|---|---|---|
| Angle Shot A — detach Serrated Dirk from Jax | −2 | 1 | 1 |
| Angle Shot B — attach it back to Jax | −2 | 1 | 1 |
| Jax's trigger on the attach | −1 | 0 | 1 |
| **cycle** | **−5** | **2** | **3** |

**+1 card for 5 Energy and two Angle Shots.** Half the ledger's ≈10 Energy, and what it pays instead is
recycle slots, which #21 measured as the abundant resource (*"~50 spare slots accumulate per point"*).

**The `[Equip]` route looks cheaper and is worse:** Serrated Dirk's own *"1 Fury: Attach this to a unit you
control"* carries no exhaust and no cap, but 434.1.g means one attach elsewhere and one back — **2 Power +
1 Energy ≈ 19 Energy per card** at the ledger's 9:1. Recorded so nobody re-derives it as the cheap line.

Jax's `[Weaponmaster]` is a *play* trigger (*"When you play me…"*), so its discount is once per Jax object
and is not part of the cycle.

### 5.1 The Dragonstorm cross-check the prompt asked for — **the Gemdragon does not want this draw**

`gemdragon-henge-vi-blind-fury` is the only Fury/Body INFINITE, so it is the only place this could compose.
It does not want it, and for a different reason than the Lux loop:

1. **Cards are not scarce there.** Its recursion is `OGN-036` Vi, Destructive — *"Recycle 1 from your trash:
   Give me +1 Might this turn"*, no exhaust, no cap, **one card at a time** (which is exactly why 416.5
   never engages). There is no Forge slot budget to spend.
2. **The binding constraint is an equality, and the loop already prices an extra card at zero Energy.** Its
   own notables: *"When Show of Strength resolves the deck holds exactly 8 cards, so it must draw exactly 8,
   so the Mighty count must be exactly 8"*, and the general law *"R = D − 4 … one more resident buys one
   more draw"*. An extra card per pass costs **one more Mighty resident**, i.e. nothing per pass. Jax's
   card costs **5 Energy and two Angle Shots**, every pass.
3. **A Might Bonus on Jax breaks the ledger.** The same entry already warns that *"a carrier at 4 + 6 + 2 =
   12 Might is a ninth Mighty body and the ledger below wants exactly eight"*. Serrated Dirk's M+0 leaves
   Jax at 3 and therefore harmless — but `[Assault 2]` makes him 5 **while he is an attacker**, so even the
   safe Equipment is only safe off the attack.

So it is the mirror of §4.1: an honest standalone engine, and not a patch for the catalogue's other loop.
Recorded in the entry's notables so nobody proposes the composition again.

The entry does not duplicate `pridestalker-mighty-draw`, the other Fury/Body `card-advantage-engine`: that
one is `UNL-183` + `OGN-012` + `SFD-106` + `OGN-038` and shares no card with this one.

---

## 6. `ivern-nurturer-hold-tutor` — ENGINE — Calm — **HOLDS, and #59 undersold it**

**431.1.c** and **431.1.c.1**, opened above, are the whole point: looking and revealing *"does not Burn
Out"*, and 431.1.c.1's reminder — *"Cards are considered in the zone of origin while being looked at or
revealed, in this case the Main Deck"* — is why drawing the revealed unit can never draw past the deck. With
a **Main Deck of 0** Ivern looks at nothing, draws nothing and costs nothing. Every other repeatable draw in
the pool is 431.1.a waiting to happen.

**#59 called it *"consistencia, no ventaja de cartas"*. It is card advantage.** *"You may reveal a unit from
among them and **draw it**"* moves a card from the Main Deck to your hand: hand +1, deck −1, on top of the
Draw Phase (315.4.b). The other two go to the bottom (416.1, 416.1.a), randomised only against **each
other** (416.5 — *"2 or more cards … simultaneously"*). What is conditional is the hit rate: a Hold that
turns up no unit in the top 3 gives nothing.

**Arithmetic** (`UNL-051` ×3): **+1 card per Hold, 0 Energy, 0 Power, unbounded in turns.** The body costs
E5 + 1 Power once and then has to survive: **383.4.d.2.a** requires the unit *"present at a Battlefield when
a player maintains control of it and Gains 1 Victory Point during their Beginning Phase from Holding"*, and
315.2.b.2 is where that happens. Three Ivern on three held battlefields is three cards a turn.

**It is not the catalogued Ivern.** `ivern-sentinel-hold` and `ivern-arena-sentinel-hold` both use
`UNL-177` Ivern, Friend to All. `UNL-051` appeared in no entry before this walk.

**The rest of the reveal-and-draw family is one-shot, and #59's list is right:** `UNL-064` Fate Weaver and
`SFD-188` Void Rush are play/spell one-shots; `UNL-032` Double Trouble is capped by **820.1.c.3** (*"Each
Repeat Cost can be paid only a single time"*) at two executions; `UNL-179` Rift Herald, `SFD-041` Apprentice
Smith and `VEN-033` Pakaa Protector hang off a move. Ivern is the only one on a **Hold**, which is the only
free repeating event in the game.

**The `[Buff]` rider** fires on a Bird, Cat, Dog or Poro reveal — Ivern's own tags are Ivern/Ionia, so he
does not feed himself; it is a Calm-tribal bonus, not part of the claim.

---

## 7. `hwei-move-draw-ready-runes` — ENGINE — Mind — **HOLDS; the mover exists and the first one is free**

#59 filed this conditional: *"Candidata condicional: se camina sólo si el que la camine encuentra el mover."*
There are two, and #59 missed the free one.

**Mover 1, free, once a turn: his own Standard Move.** **144.2** — *"Exhausting the Unit is the Cost for
this action"* — is the *whole* cost, and **315.1.b** readies him at every Awaken. Base → battlefield or
battlefield → base, forever, for nothing.

**Mover 2, in-turn, mono-Mind: `UNL-083` Smoke and Mirrors.** *"Choose a unit you control and another unit
you control at a different location. If at least one of them has [Temporary], move each to the other's
location. Draw 1."* **446.1** makes a swap a Move (*"A Permanent changing its position from any space on the
Board to another space on the Board is a Move"*) and **456.1** excludes only Recalls, so Hwei's *"When I
move"* fires. The `[Temporary]` body the spell needs is something Mind prints: `UNL-078` Sprite Fountain
(E2 + 1 Power, and its own Deathknell repeats the play effect for a second Sprite), `OGN-094` Sprite Call,
`UNL-084` Sprite Queen, `UNL-082` Lillia. **Everything in the entry is mono-Mind.**

**What a move is worth — it is modal, and all three modes are real:**

| discard | result | value |
|---|---|---|
| a Spell | *"Draw 1"* | draw 1, discard 1, draw 1 = **net +1 card in hand** |
| a Gear | *"Ready up to 2 runes"* | two runes exhaustable again — **+2 Energy** (164.2.a) |
| a Unit | *"+3 Might this turn"* | a 5 → 8 Might body for a combat |

The first move each turn is free, so the floor is **+1 card or +2 Energy a turn for 0 Energy**. Each Smoke
and Mirrors buys one more move for 2 Energy and replaces itself (*"Draw 1"*), so an extra move is +1 net
card for 2 Energy — twice Jae's price, and available in mono-Mind, which Jae is not.

**The ceiling, stated.** One free move a turn plus three Smoke and Mirrors (103.2.b), and nothing in
mono-Mind readies Hwei repeatably: `VEN-150` Acceleration Gate and `OGN-162` Miss Fortune, Captain both
reach him but are Mind/Body and one-shot or once-a-turn. Four moves a turn is the honest maximum.

**The `[Hidden]` discount, and a catalogue inconsistency this walk records rather than resolves.**
811.1.b would let a copy be hidden for 1 rainbow and played later for 0 Energy. **811.1.d.2** normally
confines a hidden card's targets to the battlefield it was hidden at, *"unless the ability explicitly
restricts targeting in a way that makes this impossible"* — and this spell is **defined** by choosing units
at *different* locations, so the exception applies on its face. But the catalogue already answers this two
ways: `lillia-smoke-mirrors-sprite-relay` prices the copies at base cost and cites 811.1.d as a reason to,
while `tideturner-mega-mech-swap` takes the exception explicitly for `OGN-199`. **This entry prices at base
cost**, matching the older entry and erring expensive. Flagged for a future pass; it changes no class.

**Overlap declared.** `lillia-smoke-mirrors-sprite-relay` already owns Smoke and Mirrors as *Lillia's*
mover. Both entries want the same three copies, so they are alternatives in one deck, not additions — and
a swap that pairs Lillia with Hwei is illegal anyway, since neither has `[Temporary]`.

---

## 8. Correction to a catalogued entry — `bard-mercurial-mass-relocation` and 170.11.c

`SFD-079` Bard, Mercurial is the one entry in the catalogue whose card prints *"open battlefield"*. Its
first notable read **"'OPEN BATTLEFIELD' MEANS WITHOUT A CONTROLLER"** — one condition. **170.11.c** gives
the definition outright and it has two: *"Battlefields can be 'open.' This means they are **unoccupied and
uncontrolled**."*

The mechanics of the entry do not change; the reading gets **stronger**, because the entry's Conquer route
already assumed nobody was standing there. What changes is the destination test a player has to apply:

* an uncontrolled battlefield with **enemy** units on it is **not** open, so Bard can never be used to drop
  the board on top of a garrison;
* an uncontrolled battlefield where **you** already have a unit is not open either;
* 190.1 (both battlefields start uncontrolled) and 323.6 (control lapses when the garrison leaves) still
  produce open battlefields — 323.6's own wording, *"without their Units occupying them"*, makes the
  battlefield it re-opens unoccupied by construction.

The four other cards that print the term (`OGN-174`, `OGN-176`, `OGN-193`, `VEN-115`) are in no entry.
The Spiritforged errata on Yone remains a correct source for the control half and stays cited; 170.11.c is
added beside it as the definition. R31's retirement note should say *unoccupied and uncontrolled*.

---

## 9. Trap check — `CLAUDE.md`'s authoring traps, one by one, against all six

| trap | verdict |
|---|---|
| entering an EMPTY enemy battlefield is not an attack (807.1.d, 383.4.e, 461) | no entry claims an attack. Jax's `[Assault 2]` is a Might modifier, not a trigger |
| Energy added in Awaken or the Beginning Phase is lost at the Main Phase start (167) | the Dusk Rose Lab line produces **cards**, not Energy; Hwei's runes are readied in the Main Phase |
| a `[Repeat]` gives no window to re-exhaust a resource permanent (429.3, R21); 820.1.c.3 | no entry uses `[Repeat]`. 820.1.c.3 is cited only to keep `UNL-032` Double Trouble out of §6 |
| `[Temporary]` bodies die before Scoring (816.1.b) and never Hold | Hwei's Sprites are `[Temporary]` and the entry claims **no Hold** from them — they exist to be the other half of a swap |
| Gold tokens enter exhausted unless Renata Industrialist (R25 = A) | no Gold anywhere |
| recycling a rune for Power sends it to the Rune Deck (161.2.b) | only Sacrifice channels, and it channels **into** play, exhausted |
| a recall is not a move (456, 458) | no recall. 456.1 is cited to show a *swap* is not one |
| a heal/exhaust/recall shield erases a Deathknell (808.1.d.1) | LeBlanc and Unsung Hero are **killed** and reach the Trash; nothing shields them |
| a token never reaches the trash (185, 186, 186.1, 416.1) | nothing recycles a token. The Dusk Rose Lab may kill a token, which is a kill, not a recycle |
| a Recall comes from anywhere (455) | n/a |
| 709 is an event, not a state | cited correctly in §4: the Sword takes Unsung Hero from 2 to 5, a crossing |
| BURST must reach 8 with its own quantities | none of the six is BURST |
| battlefield randomness (485.4.a/485.5/486.5/487.5) and 103.4.c / TR 402.1 | declared in `dusk-rose-lab-leblanc-beginning-draw`, the only entry needing a battlefield |
| a battlefield you bring starts uncontrolled (190.1, 190.6.d) | declared in the same entry — the Lab does nothing until you control it |
| Domain Identity, 103.1.b.1 | **this is what caught candidate 4.** Every entry re-checked: Mind/Chaos, Order, Order, Fury/Body, Calm, Mind |

---

## 10. What this walk did **not** file

**No new numbered reading.** The one ambiguity #59 raised — does Jae trigger if the spell that chose him is
countered — is answered by 419.4's own scoping sentence, and it changes no arithmetic. The 811.1.d.2
question in §7 is a **pricing** inconsistency between two existing entries, not a rules question: both
readings are already in the catalogue and the cheaper one is the one this entry declines to take.

**No class change.** Six ENGINEs in, six ENGINEs out. None of them reaches 8, none says you win, none is
unbounded: the two that came closest to a loop (§4, §5) are exactly the two whose negative halves prove
that the catalogue's two open loops do not want them.

**Nothing from #59's refutations was reopened**, with one exception that had already been overturned
before this walk: #59 declared `OGN-099` Garbage Grabber dead on its exhaust, and
`aurora-elder-dragon-garbage-grabber` now uses it **between turns**, where 315.1.b readies it. That is
recorded in `CLAUDE.md` as the "a lens verdict is scoped to its lens" rule and needed nothing here.

---

## 11. What the graph did with all of this

Measured after the change with `generateVariants` over the real catalogue:

```
ENTRIES 186   VARIANTS 224   variants spanning >2 domains: 0
by class: INFINITE 14 · BURST 12 · CHAIN 4 · ALT_WIN 17 · ENGINE 139
```

Five of the six new entries stand alone: Mind/Chaos, Order, Order, Fury/Body and Calm reach no
consumer. The sixth composes once — `heimerdinger-renata-remote-score+hwei-move-draw-ready-runes`
(Body/Mind, two domains) — because Hwei's *"Gear — Ready up to 2 runes"* is exactly what
`resource-engine` describes (*"Energy or Power returned by **moves**, readies, attaches, reveals…"*)
and that entry is the feature's only consumer. It is a bounded feeder, which is what both halves say
they are.

### The two `#64` mislabels, re-pointed

`wuju-master-blood-rose-level` and `tideturner-mega-mech-swap` both carried `token-body-engine` from an
older display name (*"Repeatable ready bodies"*) and **neither creates a token**. §V of
`docs/phase0/walks/2026-09-06-issue63-payoff-lens.md` recorded them and left the decision here, because
*"re-pointing them means deciding what they do produce"*.

Both produce **`conquer-engine`**, and no new name was needed. #64 kept that feature separate on the
explicit ground that *"its two producers ride different riders (a draw-and-ready, a relocation), so its
description was broadened rather than the name split"* — and the broadened description reads *"Conquers
taken over and over, each carrying whatever rider the entry names — a draw, a **ready**, a
**relocation**."* Those are exactly the two riders here:

* **Wuju Master at [Level 11] is the ready.** 143.4 makes units enter exhausted; switching that off is
  what lets a body played this turn spend its own exhaust on a Standard Move (144.2) and take a
  battlefield the turn it lands. Nothing about it is a resource — no Energy or Power comes back — so
  `resource-engine` would be false, and the bodies are printed units, so `token-body-engine` is false.
* **Tideturner is the relocation**, the same shape as `azir-sovereign-token-gather`, whose own
  `terminatesIn` reads *"it relocates bodies and conquers"*. `OGN-088` Mega-Mech is a printed unit card.

Neither re-pointing changes any variant: `conquer-engine` has no consumer (it is a payoff, which #64's
own rule says is not a defect), and Calm/Body and Chaos/Mind reach nothing in Order regardless. The
labels are now simply true instead of harmlessly false.
