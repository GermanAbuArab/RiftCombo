# Play — the Blade draws what it costs, unless the save is a body that stays

Issue #250 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `hidden-blade-tactical-retreat-linked-instruction-draw`**, the mono-Order ENGINE that
aims `OGN-213 Hidden Blade` at your own unit, saves it with `UNL-175 Tactical Retreat`, and draws 2
anyway because the draw does not reference the kill. The rule it stands on is right and Riot works
it on this card. Walked as a game, the line as written is card-neutral: two cards go in and two
come out. It turns into card advantage only when the save is a permanent that is still there for
the next Blade.

**Why this line.** `scripts/sequence-pick.mjs` re-run on 2026-10-05 at `2aec21b` reads 771 entries,
262 with forced-ordering language and **102 in the queue**. The pick is by global rank, skipping
entries that already have a play. This entry is rank 7 (two hits on *first*); ranks 4 to 6 are
played in [the order is free until it is everything](2026-09-14-the-order-is-free-until-it-is-everything.md),
[the ambush is the save](2026-09-25-the-ambush-is-the-save.md) and
[the fight it does not need to avoid](2026-09-25-the-fight-it-does-not-need-to-avoid.md). The other entry of
this slice is played in [Last Rites pays on the Hold](2026-10-05-last-rites-pays-on-the-hold.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any name with Order in its pair — the entry lists nine |
| **The engine** | `OGN-213 Hidden Blade` (Order spell, E2 + 1 Power, or 0 from face down) |
| **The save, as written** | `UNL-175 Tactical Retreat` (Order spell, E2) |
| **The save, walked here** | `SFD-173 Soraka, Wanderer` (Order, E4 + 1 Power, M4) — not in the entry |
| **Bodies** | `SFD-159 Trusty Ramhound` (Order, E2, M2) and `OGN-210 Daring Poro` (Order, E2, M2) |
| **Board it wants** | any: it scores nothing and needs one battlefield you control |

Domain identity from `data/cards.json`: all five cards are Order, so any Order legend admits them
under 103.1.b. None is a Signature card and none appears in `data/legality.json`.

The card text the play turns on:

- Hidden Blade: *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.)
  [Action] (Play on your turn or in showdowns.) Kill a unit at a battlefield. Its controller draws
  2."*
- Tactical Retreat: *"[Reaction] (Play any time, even before spells and abilities resolve.) Choose a
  friendly unit. The next time it would die this turn, heal it, exhaust it, and recall it instead.
  (Send it to base. This isn't a move.)"*
- Soraka, Wanderer: *"I must be assigned combat damage last. If another unit you control here would
  die, if it has less Might than me, instead heal it, exhaust it, and recall it. (Send it to base.
  This isn't a move.)"*
- Trusty Ramhound: *"While you have another unit here, I have +1 :rb_might:."*

## 2. The rule, and why it holds

359.3.e.14.b: *"If the Game Action performed in an earlier linked instruction is replaced, this
will not affect the later linked instruction, unless the later linked instruction directly
references the Game Action being performed."* Riot's example is this card: *"The later linked
instruction doesn’t reference an action directly, so it will execute even if the kill action of the
earlier linked action is replaced by some other event."* Both saves are replacements — each says
*"would die … instead"*, which 369.1 names as the mark of one — so the kill is replaced and *"Its
controller draws 2"* still resolves, for you.

Two placement rules the line has to obey. The hidden Blade's target must stand where it was hidden
(811.1.d.2: *"If a hidden spell or a play effect of a hidden permanent chooses any targets, those
targets must be chosen from among options at that battlefield"*), and hiding needs a battlefield
you control (811.1.b: *"you may pay [A] to hide this facedown at a battlefield you control that
doesn't already have a facedown card hidden there"*). So the Blade, the body and the save all live
at one battlefield of yours.

## 3. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of your Main Phase. A rune pays 1 Energy by exhausting
(164.2.a) and 1 Power by recycling (164.2.b); the recycled rune goes to the Rune Deck (161.2.b) and
two come back each Channel Phase (315.3.b).

```
       R   your Main Phase                                     spent    cards   you
T1     2   Trusty Ramhound                                      E2        -1     0
T2     4   Ramhound walks to the empty battlefield A -> Conquer
           Daring Poro to A; hide Hidden Blade at A   (R -> 3)  E2+1P     -2     1
  their T2: one body walks into B and Conquers it
T3     5   Hold A.
   as written: Tactical Retreat on Ramhound, then the Blade
           from face down on Ramhound -> replaced, draw 2       E2        -1+2   2
   walked:     Soraka to A, then the Blade from face down
           on Ramhound (Might 3, less than her 4) -> draw 2     E4+1P     -1+2   2
T4..   ..  re-hide the Blade's next copy, play it the turn after
```

**As written, the line is card-neutral.** Tactical Retreat is a card and Hidden Blade is a card;
the two draws replace them. What you bought for 2 Energy, one earlier rainbow and Ramhound's
position is two cards deeper into the deck. The entry's notable says *"Two Energy for two cards and
a unit you keep"*; the two cards are the two you spent.

**With Soraka it is a card a Blade.** Soraka's replacement is a static on a permanent, not a
one-shot, so each Blade costs one card and returns two, and she is still there for the next one.
One facedown per battlefield and the hide-then-play-next-turn rhythm of 811.1.b make it at most one
Blade a turn per battlefield you control, and 103.2.b makes it three a game: **plus three cards over
the game for three rainbows**, and Soraka is a Might 4 body holding A the whole time.

**On the board it scores what the bodies score**: one Hold a turn, eight on **T9**, the contested
curve. The recall sends Ramhound home exhausted (455, 458.1), so keep a second body at A or 323.6
takes the battlefield at the next Cleanup: *"Players lose control of any controlled Battlefields
without their Units occupying them if the turn is in an Open State and there is no Showdown or
Combat ongoing there."* The Poro, or Soraka, is that body.

## 4. The half that is card advantage as written

The entry's notable says it already: *"Saving into their Hidden Blade is a two-card profit."* That
is the strong form. Their Blade is a card, your Tactical Retreat is a card, and you draw 2, so you
come out one card up and they come out one down. With Soraka standing beside the target it is two
up, because nothing of yours was spent. Their hidden Blade targets at the battlefield it was hidden
at, which is theirs, so this happens when your bodies are on their battlefield.

## 5. Breaks to

**`OGN-169 Gust`** — Chaos, E1, [Reaction]: *"Return a unit at a battlefield with 3 :rb_might: or
less to its owner's hand."* Cast in response to the Blade, at the Blade's target. Playing a card
from face down opens a chain (811.1.c.3: *"Playing a card from facedown (or "from Hidden") does open
a chain."*), so the window is there. The target leaves the board and the Blade mistargets.
359.3.e.14.a: *"If the earlier linked instruction is ignored for any reason, the later linked
instruction will also be ignored."* Riot's example under it is this exact case: *"the unit’s
controller will not draw 2."* You lose the Blade, the save if it was Tactical Retreat, and
Ramhound's tempo; they spend one Energy.

**And the Soraka version cannot dodge it.** Soraka saves only a unit with *"less Might than me"*,
which on a Might 4 Soraka is Might 3 or less, which is exactly Gust's range. The written version can
dodge it by aiming at a body of Might 4 or more, because Tactical Retreat has no Might limit — but
that version is the card-neutral one. **The line that makes cards is the line one Energy breaks.**

What a Gust does not reach: Soraka herself (Might 4). The defence is to bait it first, or to run the
loop only when the opponent has no Chaos or has tapped out on their own turn.

## 6. Verdict

**The rule is right and the engine as written is a filter, not card advantage.** Tactical Retreat
and Hidden Blade go in, two cards come out, and the unit goes home exhausted. Swap the one-shot save
for `SFD-173 Soraka, Wanderer` and every Blade is one card in, two out, three times a game, with a
Might 4 body holding the battlefield.

**It scores nothing; priced as a game it is the contested curve, T9.** It breaks to `OGN-169 Gust`
in response to the Blade for one Energy, and the Soraka version is always in Gust's range by
construction.

## 7. Not verified

I assumed perfect draws, one battlefield of yours to hide at, and runes in the domains the costs
want (108.5.d). I did not walk removal on Soraka herself, a pump that lifts her above Might 4 so she
can save a Might 4 target out of Gust's range, nor the opponent contesting A while Ramhound is at
base.

## Leads

- The entry's notable *"Two Energy for two cards and a unit you keep"* and its `produces:
  card-advantage-engine` count the two draws and not the two cards spent: with Tactical Retreat the
  self-aimed line is card-neutral.
- `SFD-173 Soraka, Wanderer` is a repeatable save in the same domain (*"If another unit you control
  here would die, if it has less Might than me, instead heal it, exhaust it, and recall it"*): with
  her beside the target each Hidden Blade is +1 card. No entry pairs her with Hidden Blade; the
  entry's notable names only Zhonya's Hourglass and Guardian Angel, both one-shots and both Calm.
- `OGN-169 Gust` in response to the Blade mistargets it (359.3.e.14.a) for one Energy. Soraka's
  *"less Might than me"* puts every Soraka-saved target at Might 3 or less, inside Gust's range.
- The recall sends the target home; if it was your last body at that battlefield, 323.6 takes the
  battlefield and 107.3.d removes any other facedown card you had there.
