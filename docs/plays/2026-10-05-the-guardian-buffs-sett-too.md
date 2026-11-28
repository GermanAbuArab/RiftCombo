# Play — the Guardian buffs Sett too, so the wall is twelve and it is still one card from nothing

Issue #260 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `sett-kingpin-peak-guardian-mass-buff`**, the mono-Order ENGINE in which `OGN-223 Peak
Guardian` buffs a whole garrison at once and `OGN-240 Sett, Kingpin` reads every buffed body beside
him as Might on a [Tank]. Walked as a game, the order is everything: the bodies and Sett must stand
at the battlefield before the Guardian lands, because his buff is a one-shot and arrives once. And
the wall the entry prices at Might 11 is Might 12, because the Guardian buffs Sett himself.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `0e77706`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 81 of them with no play** —
the same numbers as when this slice was opened, so the pick did not move. The pick is by global
rank, skipping entries that already have a play: this entry is rank 18 (hits on *first* and
*before*), first in the list. The other entry of this slice is rank 19, played in
[LeBlanc is the whole army](2026-10-05-leblanc-is-the-whole-army.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Order in its pair (103.1.b) |
| **First** | a battlefield you control, with unbuffed bodies on it |
| **Then** | `OGN-240 Sett, Kingpin` (Order, E4 + 1 Power, M5) at that battlefield |
| **Last** | `OGN-223 Peak Guardian` (Order, E6 + 1 Power, M5), played to the same battlefield |

The card text the play turns on:

- Sett, Kingpin: *"[Tank] (I must be assigned combat damage first.) I get +1 :rb_might: for each
  buffed friendly unit at my battlefield."*
- Peak Guardian: *"When you play me, buff me. Then, if I am at a battlefield, buff all other friendly
  units there."*

## 2. Why the Guardian goes last

The Guardian's buff is an ETB: it happens once, when he is played, and reaches only what is already
standing there. A body that arrives after him is unbuffed for good — nothing in the line buffs it —
and 702.3 means a second mass buff could not help the bodies that are already buffed: *"There can
only be one Buff on a Unit at a time."*

The bodies do not have to walk. 355.2.a lets you play a unit straight to a battlefield you hold:
*"By default, Valid locations include the controller’s Base or a Battlefield the controller
controls."* So from the turn after you take the battlefield, every 2-drop can land there directly,
and 143.4's *"Units enter the Board exhausted."* costs nothing, because a body that stays put never
needs its exhaust.

A body that buffs itself is not wasted. `OGN-217 Trifarian Gloryseeker` buffs itself under [Legion];
the Guardian's buff then bounces off it — 702.3.a, *"If a Buff is added, or instructed to be added, on
a Unit that already has a Buff, it is not placed instead."* — but Sett counts *buffed* bodies, not
bodies the Guardian buffed, so it counts anyway.

## 3. The turns, going first

Mono-Order. The opponent spends the early turns on the other battlefield and attacks this one when it
can.

```
turn   runes   your turn                                                 at battlefield A
T1     2       Trusty Ramhound (E2) at base                              —
T2     4       Ramhound walks to A and conquers (144.4.a).               Ramhound
               Daring Poro + Honest Broker at base.
T3     6       Hold A (1 point). Poro and Broker walk to A.              Ramhound, Poro, Broker,
               Sett to A: exhaust 4, recycle one for the Order Power     Sett, Gloryseeker
               (164.2.b). Gloryseeker (E2) to A; [Legion] buffs it.
               5 runes remain.
T4     7       Hold A (1 point). Peak Guardian to A: exhaust 6,          the same five + Guardian,
               recycle one for the Power. 6 runes remain.                all six buffed
```

On T4 the Guardian buffs himself, then Ramhound, Poro, Broker and Sett; Gloryseeker already carries
one. Six buffed friendly units stand at Sett's battlefield, so his ability gives +6. And he carries a
buff of his own — 703: *"Each Buff individually contributes +1 Might to a Unit."* Sett is
**5 + 1 + 6 = 12**.

## 4. What the wall does

[Tank] makes Sett the first body anything attacking A has to kill — 815.1.b: *"I must be assigned
lethal damage before any other unit with the same controller as me that does not have [Tank] during
the Combat Damage step."* And 465.2.c.3 makes it lethal in full: *"Units must have lethal damage
assigned to them in full before damage is assigned to a different Unit."* An attack whose summed
Might is under 12 kills nothing at A. The bodies behind him are 3 Might each once buffed, so
`OGN-133 Flurry of Blades` (*"Deal 1 to all units at battlefields."*) kills none of them either.

The wall shrinks as it loses bodies — 705: *"If a Unit leaves play, remove all Buffs from it."* — and
the Guardian cannot re-buff. Sett at 12 is the high-water mark of the game.

## 5. Breaks to

**The wall breaks to `OGN-213 Hidden Blade`** (Order, E2 + 1 Power, *"[Action] (Play on your turn or
in showdowns.) Kill a unit at a battlefield. Its controller draws 2."*). A kill instruction does not
read Might, so Sett at 12 dies exactly as Sett at 5 would. The opponent pays E2 + 1 and a card, you
draw two, and the five bodies behind him are an ordinary garrison of 3-Might units again. It has to be
cast from hand for its cost: hidden, it could only target at the battlefield it was hidden at, and
that is one the opponent controls, never A.

**Before T4 it breaks to a contest.** Between T2 and T4, A is held by 2-Might bodies and Sett; an
opponent who takes A back on their T3 puts the Guardian's battlefield out of reach, because 355.2.a
lets you play him only to a battlefield you control. The ordering that makes the wall is also the two
turns it is exposed.

**Bigger removal is wasted on it.** `UNL-180 The Ruination` (E9 + 3, *"Kill all units."*) answers it
too, but at four times the price of the Blade and from a deck that has to be ten runes deep.

## 6. Verdict

**The line is three turns of ordinary bodies and one card that turns them into a twelve-Might
[Tank].** It holds A from T3, a point a turn, which is the contested Hold curve and nothing faster;
what the Guardian buys is that A stops being attackable by anything smaller than twelve. It scores
nothing of its own, and it breaks to `OGN-213 Hidden Blade` for E2 + 1 Order.

## 7. Not verified

I did not walk a two-domain shell, the sibling Karma line, or 2v2.

## Leads

- The entry's arithmetic counts Sett's ability and forgets his own buff counter. The Guardian buffs
  him too (its notable says so: *"himself, Sett and the four"*), and 703 adds +1 for it, so the
  declared board is Might 12, not 11.
- The entry names Sett's weakness (705, the wall shrinks) but no card that answers him; a kill
  instruction ignores the whole wall, and the cheapest one is `OGN-213 Hidden Blade` at E2 + 1.
- A self-buffing body such as `OGN-217 Trifarian Gloryseeker` still counts for Sett although 702.3.a
  refuses the Guardian's buff on it; the entry's sentence *"the ceiling is how many UNBUFFED bodies
  stand there"* undercounts any garrison that buffs itself.
