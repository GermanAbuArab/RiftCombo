# Play — the Tank goes in first, or the drag hands them your battlefield

Issue #242 (a slice of #200), 2026-10-04. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `void-assault-voidreaver-both-attacker-directions`**, the body/chaos ENGINE that uses
`UNL-202 Void Assault` to drag an enemy body onto a battlefield you hold, so the opponent becomes the
Attacker on your own turn and fights into `UNL-099 Towering Combatant`. Nothing in it scores, so
neither turn clock reads it. Walked as a game, two copies of the spell cast in one Main Phase take
back a battlefield the opponent conquered the turn before, and the line reaches eight on **T5**
against an opponent who took a battlefield off it on their T2. But the two casts have a forced
order, and the spell's own wording is the reason: the friendly half moves first, and if the body
it moves was your last one on that battlefield, the enemy half delivers your battlefield to them.

**Why this line.** `scripts/sequence-pick.mjs` measures a queue: entries whose `steps` carry
forced-ordering language and whose `terminatesIn` is a bare quantity with no ordering word. Re-run
on 2026-10-04 at 771 entries it reads 262 with the language and **102 in the queue**, the same
numbers as at slice 3, so nothing moved. `--pair body/chaos` returns **4**, and this entry is the
highest-ranked of them (two hits on *before*, six steps); the other pair taken in this slice is
calm/fury, played in [the defender is the fuel](2026-10-04-the-defender-is-the-fuel.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-201 Voidreaver` (Body/Chaos). Void Assault is a Signature card tagged Kha'Zix, and 103.2.d.2 makes this the only legend name that can run it |
| **The drag** | 3x `UNL-202 Void Assault` (Body/Chaos, E2 + 1 Power) |
| **The wall** | 2x `UNL-099 Towering Combatant` (Body, E4, M3, [Shield 2], [Tank]) |
| **The free curve** | 2x `UNL-111 Determined Sentry` (Body, E1, M1) — not in the entry; §2 is built on it |
| **Board it wants** | the contested one: you hold battlefield A, the opponent holds B with two bodies of Might 4 or less |

Domain identity from `data/cards.json`: Void Assault is Body/Chaos, the Combatant and the Sentry are
Body, union `{body, chaos}` under 103.1.b. Void Assault is the only Signature card; none of the three
appears in `data/legality.json`.

The card text the play turns on:

- Void Assault: *"Move a friendly unit, then move an enemy unit. (If they both move to a battlefield
  you don't control, you're the attacker.)"* No [Action] and no [Reaction]: your Main Phase only.
- Towering Combatant: *"[Shield 2] (+2 :rb_might: while I'm a defender.) [Tank] (I must be assigned
  combat damage first.)"*
- Voidreaver: *"When you win a combat, gain 1 XP. Spend 1 XP, :rb_exhaust:: [Buff] a unit. Spend 2
  XP, :rb_exhaust:: Move an exhausted friendly unit from a battlefield to its base."* The entry never
  mentions the legend's own text; §3 shows it pays.
- Determined Sentry: *"I can't move to base."*

## 2. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of your Main Phase. A rune pays 1 Energy by exhausting
(164.2.a) and 1 Power by recycling (164.2.b, whose cost is the recycle, so an exhausted rune still
pays); the recycled rune goes to the Rune Deck (161.2.b) and two come back each Channel Phase
(315.3.b). The opponent here plays no Energy-1 unit, which is every identity without Body or Calm.

```
       R   your Main Phase                                         spent    you    them
T1     2   2x Determined Sentry                                    E2        0      0
T2     4   Sentries walk, one to A, one to B -> two Conquers;      E4        2      0
           Towering Combatant to base
  their T2: their T1 body attacks B, kills the Sentry, Conquers B and a second body is played there
T3     6   Hold A. Void Assault #1, then Void Assault #2 (§3):     E4+2P     4      1
           two combats won at A, B taken back by Conquer
T4     6   Hold A, Hold B. Combatant #2 played straight to B;      E4        6      1
           1 XP: buff the Sentry at B
T5     8   Hold A, Hold B                                          —         8
```

T4 opens on six rather than eight because T3 recycled two runes for the two Power. The T2 split is
the ordinary body opening, not part of the entry: both battlefields start uncontrolled (190.1) and
nobody can walk into either before your T2, because units enter exhausted (143.4).

**The clock this beats is the contested one.** Body/chaos reaches eight on **T5** unopposed, because
the Sentry is Energy 1 and two copies are two bodies on turn 1; holding one battlefield alone pays
one a turn and reaches eight on **T9**. Against an opponent who took B on their T2, this line still
lands on T5. What it buys is not points — Void Assault scores nothing — but the second battlefield
back on the very next turn, with two of the opponent's bodies gone.

**Their T3 is the turn that makes T4 safe.** Both their B bodies died at A, B is yours, and anything
they play on their T3 enters exhausted at their base (143.4; they control no battlefield to play to,
355.2.a). They cannot attack until their T4, which is why the second Combatant goes straight to B
on your T4 rather than to your base.

## 3. The order the spell forces

On T3 there are two casts, and each one's friendly half resolves before its enemy half. The two
orders are not equivalent.

**Void Assault #1: the Combatant from base to A, then their first body from B to A.** Your
Combatant arrives at a battlefield you already control and contests nothing. Their body arrives at
a battlefield its controller does not control, and 190.3.a.1 applies: *"Units moving to or being
played to a battlefield apply Contested status if that battlefield is not already Contested and that
Unit’s controller does not already control that battlefield."* So by 464.2.c.1 they are the
Attacker, on your turn: *"The Attacker is the player whose unit(s) applied the Contested status to
the Battlefield."* Both halves are effect moves under 449, so 420.3.a's exhaust never applies and
the Combatant arrives ready or not — it does not matter on defence.

The fight: the Combatant is Might 5 as a defender and the Sentry 1, so six damage goes into their
body; their damage must go into the Tank first, by 815.1.c.2: *"Units without Tank are invalid
assignments until all units with Tank have lethal damage assigned to them."* A body of Might 4 or
less dies and leaves the Combatant standing. You are then the only player with units there, which
is a win under 466.3.a, and Voidreaver's *"When you win a combat, gain 1 XP"* fires.

**Void Assault #2: the Sentry from A to B, then their second body from B to A.** The Sentry is
contested at B; their last body leaves B; after the spell resolves B holds only your Sentry, and
344.2 opens a Showdown with no combat: *"If Control of a Battlefield is Contested, there aren’t
units controlled by different players there, and the turn is in a Neutral Open State, a Showdown is
opened during the next Cleanup."* You have not scored B this turn (you Held only A), so the Conquer
is a point under 469.1. Their second body fights the Combatant alone at A: five damage, a second
win, a second XP. 466.1.a.1 healed the Combatant between the two combats.

**Cast them the other way round and the second card loses A.** If #2 goes first, the Sentry is
still A's only body when the friendly half moves it to B. Then the enemy half drags their body to
A, which now holds none of your units. After the spell resolves the turn is open again, and 323.6
takes A from you: *"Players lose control of any controlled Battlefields without their Units
occupying them if the turn is in an Open State and there is no Showdown or Combat ongoing there."*
Their body is the only one at A, so 344.2 opens a Showdown and they Conquer it. You have traded A
for B and paid two Energy and a Power for the privilege. **The Tank goes in first.**

The same rule protects the right order against a response. 323.6 needs an Open State, and while a
Void Assault is still on the chain the state is Closed. So `OGN-133 Flurry of Blades` cast in
response to #1 kills the Sentry at A but cannot take A from you before #1 resolves and the Combatant
lands there.

The entry's own steps say *"Move your own Towering Combatant in alongside if it is not already
there"*. If it IS already there, the friendly half cannot move it to A at all, because 355.4.a
requires a destination *"other than the Units’ current Location"*, and 355.8 requires a valid
choice for every target before the spell can be played. The friendly half always moves somebody
somewhere; the play has to decide who, and that is where the order comes from.

## 4. Breaks to

**`OGN-133 Flurry of Blades`** — Body, E1, [Reaction]: *"Deal 1 to all units at battlefields."*
Cast in response to Void Assault #2, it kills the Sentry before the spell resolves. The friendly
half has no legal target and is skipped, and 359.3.e.5 lets the rest happen anyway: *"Any
instructions related to an illegal target can’t be followed."* Their body is still dragged to A and
still dies to the Combatant, but nobody of yours reaches B: B goes uncontrolled instead of yours, and
the T3 Conquer is gone with the Sentry. One Energy costs you a point and a body.

`OGN-169 Gust` (Chaos, E1, [Reaction], returns a unit at a battlefield with 3 Might or less to hand)
does the same to the Sentry. Against the Combatant, the answer is any removal that reaches a Might-3
body at a battlefield before it defends; at Might 3 it is inside every one of the ten printed
Might-3 gates.

The XP the two wins bank is the repair for T4: Voidreaver's *"Spend 1 XP, :rb_exhaust:: [Buff] a
unit"* puts the Sentry at B on Might 2, and Flurry no longer kills it.

## 5. Verdict

**The entry's sentence that one spell chooses which side of the combat you are on is right, and it
undersells the line by stopping at one copy.** Two casts in one Main Phase are a removal pair that
also re-takes a battlefield, and the legend the Signature card forces is paid for every win.

**What the line needs is an order the spell's wording imposes.** The friendly half resolves first,
so the body it moves must not be the last one guarding a battlefield the enemy half is about to
fill. Put the Tank on A before the Sentry leaves it.

**Priced as a game, it holds the unopposed pace against an opponent who broke it.** Eight on T5,
the same turn body/chaos reaches with nobody in the way, after losing B on their T2.

## 6. Not verified

I assumed the opponent's two bodies at B are Might 4 or less, which is what lets the Combatant
survive the first fight; a Might-5 body still dies to six damage but kills the Combatant, and then
#2 must keep the Sentry home. I assumed perfect draws for the three key cards by T3, as the turn
clock does, and that the runes arrive in the domains the costs want (108.5.d keeps the Rune Deck's
order secret). I did not walk the opponent's T4 attack into B.

## Leads

- The entry's steps never order two copies. A notable that the Tank must reach the battlefield
  before the friendly half of a second cast moves its last other body away, or 323.6 hands the
  battlefield to the dragged body, would carry §3.
- The entry does not mention Voidreaver's *"When you win a combat, gain 1 XP"*. Every defensive drag
  that kills the dragged body is a combat won (466.3.a), so the line feeds its own legend.
- Step 4 reads as if the friendly half is optional. 355.4.a and 355.8 make it mandatory and forbid
  moving a unit to where it already is.
