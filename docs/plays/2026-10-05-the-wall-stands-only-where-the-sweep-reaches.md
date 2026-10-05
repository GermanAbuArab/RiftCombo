# Play — the wall stands only where the sweep reaches, so the Shepherd stays home

Issue #246 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `soul-shepherd-illaoi-tentacle-wall`**, the mind/chaos ENGINE that puts
`UNL-077 Soul Shepherd`'s *"Your token units have +1 :rb_might:."* under a Tentacle factory —
`VEN-109 Illaoi, Prophet of the Great Kraken` and `VEN-100 Up from the Deep` — so every 1-Might
Tentacle is a 2-Might body and the pool's one-Energy sweeper, `OGN-133 Flurry of Blades`, does
nothing to them. Nothing in it scores, so neither turn clock reads it. Walked as a game the +1 is
real, but the entry protects the Tentacles in the one place they were never exposed, says the order
of play does not matter when one moment of it does, and never names the card that answers a 2-Might
swarm.

**Why this line.** `scripts/sequence-pick.mjs` re-run on 2026-10-05 at 771 entries reads 262 with
forced-ordering language and **102 in the queue**, unchanged. `--pair mind/chaos` returns **3**, all
tied at one hit; this entry is second in the script's own order (one hit on *before*, six steps).
The first is played in [the drag empties their battlefield](2026-10-05-the-drag-empties-their-battlefield.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any of the four mind/chaos legend names; nothing here is Signature, so none is forced |
| **The static** | `UNL-077 Soul Shepherd` (Mind, E5, M3) |
| **The factory** | `VEN-109 Illaoi, Prophet of the Great Kraken` (Chaos, E6, M4); 3x `VEN-100 Up from the Deep` (Chaos, E3, [Flow] 3 Energy) |
| **A first body** | `OGN-171 Mystic Poro` (Chaos, E2, M2) — not in the entry; §2 is built on it |
| **Board it wants** | the contested one: you hold battlefield A, the opponent holds B with one body of Might 3 |

Domain identity from `data/cards.json`: the Shepherd is Mind, the other three Chaos, union
`{chaos, mind}` under 103.1.b. None appears in `data/legality.json`. Not one card in the line has a
Power cost, which is why the curve below never shrinks.

The card text the play turns on:

- Up from the Deep: *"Play two 1 :rb_might: Tentacle unit tokens from Bilgewater."* No location.
- Illaoi: *"When you play me or when I score, play a :rb_energy_1: :rb_might: Tentacle unit token
  from Bilgewater. I have +1 :rb_might: for each token unit you control."*
- Flurry of Blades: *"Deal 1 to all units at battlefields."*
- `OGN-127 Cannon Barrage` (Body, E2 + 1 Power, [Reaction]): *"Deal 2 to all enemy units in
  combat."*

## 2. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of your Main Phase; nothing here pays Power, so R is simply two
a turn (315.3.b).

```
       R   your Main Phase                                         spent    you
T1     2   Mystic Poro                                             E2        0
T2     4   Poro walks to empty A -> Conquer; Up from the Deep:      E3        1
           two Tentacles AT BASE
  their T2: one Might-3 body walks into B and Conquers it
T3     6   Hold A. Soul Shepherd, at base; both Tentacles attack B  E5        3
           together -> Conquer
T4     8   Hold A, Hold B. Illaoi at base (+1 Tentacle)            E6        5
T5    10   Hold A, Hold B. Up from the Deep #2 (+2 Tentacles)      E3        7
T6         Hold A, Hold B                                                    9
```

Idle Energy: one on T2, one on T3, two on T4, seven on T5.

**The clock this is measured against is the contested one.** Mind/chaos prints no unit at Energy 1
or less, so its unopposed curve reaches eight on **T6**; holding one battlefield alone reaches eight
on **T9**. This line takes B back on T3 and reaches eight on **T6** — level with the board where
nothing was needed, three turns ahead of the board it is for — **and the T3 Conquer is the
Shepherd's doing.** Two 1-Might Tentacles sum to 2 against a Might-3 defender and the attack fails;
under the static they sum to 4, 465.2.c assigns *"their summed Might"*, and one Tentacle walks out
alive. The static is not only a shield; it is what lets two tokens take a battlefield at all.

Illaoi is not on the critical path. She arrives after the battlefields are won, as a body at base
that grows with the swarm.

## 3. The order the static forces

**The Tentacles are never exposed at your base.** The entry's step 4 says they *"wait at your base
through the opponent's turn, which is when a sweeper comes"*, and builds the Shepherd's value on that
turn. But Flurry of Blades reads *"Deal 1 to all units at battlefields"*, and a base is not one of
them. A Tentacle at base is safe from the 1-damage sweep with or without the Shepherd. **The wall
only matters at a battlefield**, so the Shepherd is needed on the turn the Tentacles walk, not on the
turn they are made.

**And they can be made where the wall matters.** Up from the Deep names no location, so 355.2.a —
*"By default, Valid locations include the controller’s Base or a Battlefield the controller
controls."* — lets them land straight at A. That is the move once the Shepherd is down: two bodies
reinforcing a battlefield you hold, as 2-Might bodies, with no walk and no exhaust to pay. Before
the Shepherd is down it is the one placement that hands Flurry a target.

**The order matters at exactly one kind of moment.** The entry says *"her grant is a static that
reads tokens as they enter, so she may come before or after them"*, and on your own turn that is
nearly true: 312.2.a gives priority in a Neutral Open State only to the turn player, and the
Shepherd has no trigger, so 337.2 resolves her with no window at all. But every chain you open is a
window — 312.2.c hands out priority in a Closed State. Illaoi's play trigger opens one. Up from the
Deep opens one. An attack opens a combat. **If any of those opens while 1-Might Tentacles stand at a
battlefield, Flurry answers it for one Energy.** So the Shepherd goes down before the first chain
that finds a Tentacle at a battlefield, which in §2 is the T3 attack.

**The Shepherd herself stays at base.** She is Might 3, and `OGN-169 Gust` returns *"a unit at a
battlefield with 3 :rb_might: or less"*. At a battlefield she is a one-Energy [Reaction] away from
leaving, and the static goes with her, mid-combat, before damage. At base Gust cannot reach her.

## 4. Breaks to

**`OGN-127 Cannon Barrage`** — Body, E2 + 1 Power, [Reaction]: *"Deal 2 to all enemy units in
combat."* Cast during the T3 attack on B, it deals 2 to both Tentacles; 2 is their Might under the
static, and 143.2.a kills each. The defender is not an enemy unit to its caster and takes nothing;
B stays theirs.

That is the honest size of the Shepherd: **she moves the cheapest answer to the swarm from one
Energy (Flurry) to two Energy and a Body Power (Cannon Barrage)**, and she makes the opponent hold
the right card instead of any card. She does not remove the answer. 740.2.c also scopes it: *"A unit
is in combat if it is occupying a battlefield where combat is ongoing and has a combat
designation"*, so a Tentacle garrison at A that is not fighting is out of its reach, and only the
attackers are exposed.

If the Shepherd walks to a battlefield, Gust (E1) on her mid-combat takes the whole swarm back to
1 Might at once, since her grant is continuous and not a counter, and the swarm is back inside
Flurry's range.

## 5. Verdict

**The engine is real, and the entry prices it on the wrong turn.** The Tentacles are safe at base
without help; the +1 earns its slot the turn they walk, when it both keeps them alive and doubles the
Might they bring into a fight.

**Priced as a game it ties the free curve and beats the contested one by three turns**, eight on T6,
with a Conquer on T3 that two bare Tentacles could not make.

**The answer is a two-Energy Body [Reaction] the entry does not name**, and the defence against it
is choosing which Tentacles fight: the ones that stay home are out of its reach.

## 6. Not verified

I assumed perfect draws (the Poro on T1, Up from the Deep by T2, the Shepherd by T3) and that the
runes arrive in the domains the costs want (108.5.d keeps the Rune Deck's order secret). I assumed
the opponent's garrison at B is one body of Might 3. I did not walk Illaoi's *"when I score"*
clause, since a unit does not score by itself and the play does not lean on it, nor the 2-damage
sweepers outside Body (`OGS-018 Tibbers` deals 3 to all units at battlefields and is Fury/Chaos).

## Leads

- The entry's step 4 says the Tentacles wait at base through the opponent's turn *"which is when a
  sweeper comes"*. Flurry reads *"at battlefields"*, so the base is outside it; the Shepherd's value
  is on the turn the Tentacles walk.
- Up from the Deep names no location, so 355.2.a lets the Tentacles land at a battlefield you
  control; the entry's steps put them at base only.
- *"She may come before or after them"* is true in a Neutral Open State on your turn (312.2.a,
  337.2) and false across any chain you open (312.2.c) while 1-Might Tentacles stand at a
  battlefield.
- The entry names Flurry and no answer to a 2-Might swarm. `OGN-127 Cannon Barrage` (E2 + 1 Body
  Power, [Reaction]) kills every attacking Tentacle under the static; the entry's *"WHAT REFUTES IT"*
  says *"squarely inside a 2-damage one"* without naming the card.
- The Shepherd should never walk: Gust (E1) reaches her at a battlefield and not at base.
