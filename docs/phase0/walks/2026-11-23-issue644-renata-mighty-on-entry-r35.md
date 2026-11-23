# Renata, Mastermind under R35: is she Mighty on entry or after it? (#644, 2026-11-23)

Entry walked: `renata-mastermind-points` (INFINITE, `verified`, `rulesVersion` and `walkedVersion` 2026-07-16).
Raised by PR #643 (#539), which filed R35 and noted that two phrases of this entry lean on it: the
`SFD-166` `uses` note, "Renata (4 Might) enters at 5 and becomes Mighty", and step 4, "(a new object — rule
124 — so she becomes Mighty again on re-entry)". Only those steps are re-walked here (steps 1, 2 and 4, and the
`uses` note). Steps 3 and 5, the engine and the notables are not.

## The reading walked against: R35 reading c, a project reading

R35 was settled on 2026-11-16 by a five-agent panel, 3 of 5 for reading c. Record:
https://github.com/GermanAbuArab/RiftCombo/issues/11#issuecomment-6928291464. **It is a project reading, not an
official ruling.** The record says no official ruling exists, and it applies only until official text, an
official ruling or printed card text says otherwise. The reading, as the record states it:

> c) No: entering is never "becoming", at any Might. 709 needs one unit's Might to move from below 5 to 5+;
> under 124 the entering unit is a new object with no earlier value, so the condition cannot be met on entry,
> whether the unit is printed at 5+ or is printed below 5 and lifted to 5+ by a static effect as it lands. Only
> a later Might change on a unit already on the board triggers.

The record names this entry:

> #644 is unblocked: re-walk `renata-mastermind-points` with "enters at 5" and "becomes Mighty again on
> re-entry" read as NOT triggering on the entry itself; a buff from under 5 to 5+ on a unit already on the
> board still triggers.

So the question for this walk is when Rally's buff happens: as Renata lands, or after
she is on the board.

## Card text (verbatim, `data/corpus_flat.txt`)

- `SFD-088 Renata Glasc, Mastermind` (Mind, E5 M4): *":rb_energy_1::rb_rune_mind:: Draw 1. :rb_energy_4::rb_rune_mind::rb_rune_mind::rb_rune_mind::rb_rune_mind:, :rb_exhaust:: Score 1 point. Use my abilities only while I'm at a battlefield."*
- `SFD-166 Rally the Troops` (Order spell, E2): *"[Action] (Play on your turn or in showdowns.) When a friendly unit is played this turn, buff it. (If it doesn't have a buff, it gets a +1 :rb_might: buff.) Draw 1."*
- `SFD-180 Fiora, Worthy` (Order, E3 M3): *"When a unit you control becomes [Mighty], you may pay :rb_rune_order: to ready it. (A unit is Mighty while it has 5+ :rb_might:.)"*
- `OGN-104 Retreat` (Mind spell, E1): *"[Reaction] (Play any time, even before spells and abilities resolve.) Return a friendly unit to its owner's hand. Its owner channels 1 rune exhausted."*
- `OGN-294 Trifarian War Camp` (Battlefield): *"Units here have +1 :rb_might:. (This includes attackers.)"*

Renata is printed at Might 4. None of the entry's four cards has a static that raises her Might. Rally is the
only one that raises it, and it does so with a buff.

## Rules (verbatim, Core Rules 2026-07-16, untruncated)

Playing a unit, and when it counts as played:

- 350.1: *"A card is Played when it has finished this process in its entirety."*
- 359.2: *"A Permanent leaves the Chain and becomes a Game Object."*
- 359.2.c: *"If it is a Unit, it enters the Board exhausted at the Location that was chosen."*
- 143.4: *"Units enter the Board exhausted."*

When a trigger is checked and where it goes:

- 383.2.c: *"The Condition of a Trigger is evaluated after a potentially inciting event has been processed."*
- 383.3: *"When a Condition is met, a Triggered Ability behaves like an Activated Ability and is placed on the Chain."*
- 383.4.a.4: *"Abilities that trigger when another object is played are not considered Play Effects."*
- 383.4.a.2, the timing of a Play Effect, given here only to show that even a unit's own play trigger goes on
  the Chain after the unit is on the board: *"These Triggered Abilities are put on the Chain as Pending Items after the Permanent these effects correspond to is finalized and enters the board."*

What kind of ability Rally leaves behind:

- 390.2: *"Delayed Triggers are Triggered Abilities that can be recognized by describing a specific time of the turn, or by structuring a Triggered Ability with a specific frame of time as a restriction."*
- 391: *"Delayed Abilities will resolve or be active just like the ability they augment, but only during the specified time in the effect that created the Delayed Ability. Example: Ravenborn Tome reads “The next spell you play this turn deals 1 Bonus Damage.” This is a Delayed Passive Ability that passively adds 1 Bonus Damage to just the next spell played. The next spell is a specific time, and the 1 Bonus Damage is a passive ability. Example: Noxian Guillotine reads “Choose a unit. Kill it the next time it takes damage this turn.” When the chosen unit takes damage is the specified time, and killing it is the condition for a Delayed Triggered Ability."*

Buffs:

- 426.1.b: *"To Buff a unit, place a Buff Counter on it if it does not have one already"* (Riot prints no closing period.)
- 426.1.b.1: *"If the unit already has a Buff Counter on it, it does not get another one."*
- 703: *"Each Buff individually contributes +1 Might to a Unit."*
- 705: *"If a Unit leaves play, remove all Buffs from it."*

Mighty:

- 708: *"A Unit “is Mighty” as long as its Might is 5 or greater."*
- 709: *"A Unit “becomes Mighty” at the moment its Might changes from being less than 5 to being 5 or greater. Example: A Unit with Might 4 that gets +1 [M] becomes Mighty. Example: A Unit with Might 5 that gets +1 [M] does not become Mighty, because it was already Mighty."*
- 710: *"Units on the board are evaluated according to their current Might. Example: A unit with a base Might of 3 is targeted by a spell that reads “A unit gets +3 [M] this turn.” As that spell resolves, its Might changes from 3 to 6, and it becomes Mighty. When that effect expires at the end of the turn, it will no longer be Mighty."*
- 711: *"Units in Non-Board Zones are evaluated according to their printed Might. Example: A unit in the trash is Mighty if its printed Might is 5 or greater. It doesn't matter if there were effects raising or lowering its might while it was on the board."*

The new object on a zone change:

- 124: *"A Game Object that changes zones to or from a Non-Board Zone becomes a new object for the purposes of tracking that object."*
- 124.1: *"Whenever a Game Object changes zones to or from a Non-Board Zone, all Temporary Modifications of all kinds cease to be tracked on it in all capacities. Examples: Damage is cleared. Counters are removed. Granted Keywords are no longer granted. Statuses are cleared."*

## The walk

Rally the Troops has resolved earlier this turn (the entry's prerequisite). Its text *"When a friendly unit is
played this turn, buff it."* is a triggered ability bounded to this turn, a Delayed Trigger (390.2), active for
the rest of the turn (391).

1. **Renata is played to a battlefield you control.** She goes through the play process. At 359.2 she leaves
   the Chain and becomes a Game Object, and at 359.2.c she enters the Board exhausted (143.4). She lands at her
   printed Might, 4. Nothing has buffed her yet. Under R35 reading c the landing is not becoming Mighty at any
   Might; here the point does not even arise, because she lands at 4.
2. **Rally's trigger.** Its condition is "a friendly unit is played". By 350.1 she is Played only when the
   process is finished in its entirety, and that process put her on the board at 359.2.c. By 383.2.c the
   condition is evaluated after that event has been processed. So Renata is already on the board when Rally
   triggers. By 383.3 the trigger goes on the Chain. It is not a Play Effect (383.4.a.4: it triggers on another
   object being played), but 383.4.a.2 shows the same order even for a unit's own play trigger: on the Chain
   after the permanent enters the board.
3. **Rally's trigger resolves: buff it.** Renata has no Buff Counter, so one is placed (426.1.b), worth +1 Might
   (703). Her Might changes from 4 to 5 while she is on the board (710: evaluated by current Might). That is the
   change 709 defines, and its first example is this case, 709: *"A Unit with Might 4 that gets +1 [M] becomes Mighty."*
   This is "a later Might change on a unit already on the board", which R35 reading c still counts. **She
   becomes Mighty.**
4. **Fiora, Worthy triggers** (383.2.c, 383.3): *"you may pay :rb_rune_order: to ready it"*. One Order Power
   readies Renata, who entered exhausted. Entry step 2 holds as written.
5. **Score** (entry step 3): unchanged by R35.
6. **Retreat returns Renata to hand.** Hand is a Non-Board Zone, so she is a new object (124). Her buff is gone
   twice over: 705 removes all Buffs from a unit that leaves play, and 124.1 stops tracking counters. In hand
   she is evaluated at her printed 4 (711).
7. **Replayed.** Steps 1 to 4 run again. She lands at 4, with no buff. Rally's Delayed Trigger is still active
   this turn (391) and triggers on this new play. Because she has no Buff Counter, 426.1.b.1 does not stop the
   buff. She goes from 4 to 5 on the board, becomes Mighty (709), and Fiora readies her again.

**What R35 changes in the wording, and what it does not change in the line.** The entry's line never needed
entry to be becoming Mighty. Each pass, Rally's buff moves her from 4 to 5 after she is on the board, and that
counts under every reading R35 considered (a, b and c), because it is 709's own first example. Two phrases said
otherwise and were wrong under reading c:

- *"enters at 5"* (the `SFD-166` note): she enters at 4 and is buffed to 5 on the board.
- *"so she becomes Mighty again on re-entry"* (step 4): re-entry is not what makes her Mighty. Rule 124 matters
  because the new object has no buff (124.1, 705), so Rally can buff her again (426.1.b). The buff after
  re-entry makes her Mighty, not the re-entry.

## Other orderings of the same cards

- **Rally after Renata.** Rally's trigger watches units played *this turn* after Rally resolves. Renata, already
  on the board, gets no buff, stays at 4 and is never Mighty. The entry already orders it right ("Rally the
  Troops resolved this turn" is a prerequisite).
- **A static lift where she lands.** This is the one case where R35 changes the result, and the entry did not
  name it. Played to a battlefield with `OGN-294 Trifarian War Camp`'s *"Units here have +1 :rb_might:."*, she
  lands at 5. Under reading c that landing is not becoming Mighty. Rally's buff then takes her from 5 to 6,
  which 709's second example says is not becoming Mighty either, 709: *"does not become Mighty, because it was
  already Mighty."* Fiora never triggers, Renata stays exhausted (359.2.c), and her exhaust cost can never be
  paid: the line scores 0 there. Under readings a and b she would have triggered on entry. So the line needs a
  battlefield where nothing lifts her Might as she lands. That is a new precondition, written into the entry's
  `prerequisites.easy`.

## The same paragraphs in the 2026-10-09 book

The entry stays pinned to 2026-07-16 (`docs/rules-diff/remap-2026-10-09.md`, line 253), so this walk cites the
07-16 numbers. Measured for the next re-pin, by comparing each paragraph whitespace-collapsed in both files:

- Same number, same text: 124, 124.1, 143.4, 350.1, 359.2, 359.2.c, 383.3, 383.4.a.2, 383.4.a.4, 703, 705, 708, 709, 710, 711.
- Same text, new number: 390.2 is 391.2, 391 is 392, 426.1.b is 427.1.b, 426.1.b.1 is 427.1.b.1.
- Reworded: 383.2.c (`docs/rules-diff/2026-07-16-to-2026-10-09.md`, line 247, similarity 0.67). The 10-09
  text, from `data/Riftbound-Core-Rules-2026-10-09.txt`:

```
383.2.c. The Condition of a Trigger is evaluated after a potentially inciting event has been processed,
unless the event the Condition checks is the source of the triggered ability leaving the board.
```

  The added clause applies only to a condition about the trigger's own source leaving the board. Neither
  trigger here has one: Rally's watches a unit being played and Fiora's watches a unit becoming Mighty. The walk
  holds on the 10-09 text too.

## Result

**`renata-mastermind-points` stays `verified` and INFINITE.** Under R35 reading c, a project reading, her
loop still closes, because every pass makes her Mighty by a buff on the board (709) and never by entry. The
`data/combos.json` diff is prose only, as dated corrections: the `SFD-166` note ("enters at 5"), steps 1 and 4,
the battlefield prerequisite (no static lift where she lands), and a REVISED line in `notes`. `rulesVersion` and
`walkedVersion` stay 2026-07-16: only the R35-dependent steps were walked, all against the 07-16 paragraphs the
entry pins. Status, class, `uses`, `needs`, `produces` and the sources are unchanged.
