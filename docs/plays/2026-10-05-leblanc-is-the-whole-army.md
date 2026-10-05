# Play — LeBlanc is the whole army, and the army walks one body a turn

Issue #260 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `sprite-queen-leblanc-permanent-army`**, the mono-Mind ENGINE in which `UNL-084 Sprite
Queen` plays a [Temporary] 3-Might Sprite every Beginning Phase and `UNL-090 LeBlanc, Everywhere at
Once` keeps every Sprite that reaches her battlefield alive. The entry is right that it is free and
slow. Walked as a game, the order inside each turn is fixed — the Sprite is born at the base and must
walk to LeBlanc in the same Main Phase — and the whole army hangs on one 4-Might body that a single
two-Energy spell removes.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `0e77706`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 81 of them with no play**. The
pick is by global rank, skipping entries that already have a play: this entry is rank 19 (hits on
*first* and *before*), second in the list. The other entry of this slice is rank 18, played in
[the Guardian buffs Sett too](2026-10-05-the-guardian-buffs-sett-too.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Mind in its pair (103.1.b) |
| **First** | a battlefield you control |
| **Then** | `UNL-090 LeBlanc, Everywhere at Once` (Mind, E4, M4) played to it |
| **And** | `UNL-084 Sprite Queen` (Mind, E7 + 1 Power, M6), anywhere |

The card text the play turns on:

- Sprite Queen: *"When you play me or at the start of your Beginning Phase, play a ready 3 :rb_might:
  Sprite unit token with [Temporary] to your base. (Kill them at the start of their controller's next
  Beginning Phase, before scoring.)"*
- LeBlanc, Everywhere at Once: *"[Backline] (I must be assigned combat damage last.) Your [Temporary]
  effects at my battlefield don't trigger."*

## 2. The order inside each turn

A Sprite is born at the **base**, and LeBlanc's clause covers only **her battlefield**. So every
Sprite has one Main Phase to get there, and the walk is the engine:

1. **Beginning Phase.** The Queen's trigger plays a new Sprite at the base. It survives this
   Beginning Phase, because the [Temporary] trigger's condition has already been met before it
   existed — 816.1.c: *"The Trigger Condition is the controller of the permanent's Beginning Phase
   starting."* Every older Sprite stands at LeBlanc's battlefield and does not trigger at all.
2. **Main Phase.** The new Sprite is printed *ready*, so it can pay the move's cost the turn it
   arrives — 144.2: *"Exhausting the Unit is the Cost for this action."* — and walk from the base,
   144.4.a: *"Units may move from their Base to a Battlefield."*
3. **Next Beginning Phase.** Anything still at the base dies — 816.1.b: *"At the start of this
   permanent's controller's Beginning Phase, before scoring, kill this."*

Skip the walk once and that Sprite is gone. Lose LeBlanc once and all of them are.

## 3. The turns, going first

Mono-Mind. The opponent contests the other battlefield and attacks this one when it can.

```
turn   runes   your turn                                              at battlefield A
T1     2       Watchful Sentry (E2) at base                           —
T2     4       Sentry walks to A and conquers (144.4.a).              Sentry
               Ravenbloom Student + Forecaster at base.
T3     6       Hold A (1 point). Student and Forecaster walk to A.    Sentry, Student, Forecaster,
               LeBlanc to A (E4), a 2-drop to A with the last 2.      LeBlanc, a 2-drop
T4     8       Hold A. Sprite Queen at base: exhaust 7, recycle one   + Sprite 1
               for the Mind Power (164.2.b). Her play trigger gives
               Sprite 1, ready; it walks to A. 7 runes remain.
T5     9       Hold A. Beginning Phase: Sprite 2 at base.             + Sprite 2
               Main Phase: Sprite 2 walks to A.
T6+    +2      one more Sprite a turn, same walk                      + one a turn
```

LeBlanc can be played straight to A because 355.2.a makes a battlefield you control a default play
location: *"By default, Valid locations include the controller’s Base or a Battlefield the
controller controls."* The Queen does not need to be at A; her trigger plays to the base wherever she
stands, so she can sit at home.

By T8 that is five permanent 3-Might Sprites at A for no Energy after T4. The points come from
holding A, one a turn from T3: the contested Hold curve, nothing faster. The Sprites make A expensive
to attack; they score nothing themselves.

## 4. Breaks to

**The army breaks to `OGN-213 Hidden Blade`** (Order, E2 + 1 Power, *"[Action] (Play on your turn or
in showdowns.) Kill a unit at a battlefield. Its controller draws 2."*) aimed at LeBlanc. Every Sprite
at A then dies at your next Beginning Phase in one stroke, because the clause that kept them alive
left with her. The opponent pays E2 + 1 and a card; you draw two and lose the whole army. The Queen
keeps making one Sprite a turn, but none of them survive past the next Beginning Phase until another
LeBlanc arrives.

**Combat does not reach her first.** [Backline] puts her last in line for damage, so an attacker has
to kill every Sprite before a point lands on LeBlanc. That is exactly why the answer is a removal
spell and not an attack — and why `OGN-133 Flurry of Blades` (*"Deal 1 to all units at
battlefields."*) does nothing to the army: the Sprites are 3 Might and LeBlanc is 4. It does kill the
T3 garrison's `OGN-096 Watchful Sentry` (Might 1), whose [Deathknell] draws you a card.

**A bounce is as good as a kill.** `UNL-128 Star-Crossed` (Chaos, E3 + 1 Power, [Reaction], *"Return
a friendly unit and an enemy unit to their owners' hands."*) sends LeBlanc home on their turn; your
Beginning Phase comes before your Main Phase, so the Sprites die before you can replay her.

## 5. Verdict

**Two cards, eleven Energy and one Mind Power, and then a permanent 3-Might body every turn for
free** — as long as LeBlanc is standing. It is a wall that grows by one a turn behind a 4-Might pin,
and the pin costs the opponent E2 + 1 Order with `OGN-213 Hidden Blade`. It scores nothing of its own.

## 6. Not verified

I did not walk a two-domain shell, the Sprite consumers that count [Temporary] bodies, or 2v2.

## Leads

- The entry says losing LeBlanc *"kills every accumulated Sprite at the next Beginning Phase in one
  stroke"*, and names no card that does it. The cheapest is `OGN-213 Hidden Blade` (E2 + 1 Order), and
  `UNL-128 Star-Crossed` (E3 + 1 Chaos, [Reaction]) does the same by bouncing her on their turn.
- The entry's steps play LeBlanc first and the Queen second. The order of the two cards does not
  matter inside one Main Phase; what is forced is the walk — each new Sprite must reach LeBlanc's
  battlefield in the Main Phase of the turn it is born.
