# Hand walks — the two Renata Industrialist engines, and R9 retired

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **Both HOLD.**

Both entries were waiting on R25, ruled A. Walking them turned up that **R9 needs no ruling either** —
both halves of it are settled by rules text.

## R9 is settled, not open

R9 was listed on #11 as *"'When I move' triggers on movements by effect (420.1); 'here' is the location
after the movement."* Both halves are in the book:

- **Effect moves are Moves.** 420.1 — *"Moving is the act of a Game Object moving between two Locations
  on The Board."* 420.2.a — *"Players may only move Game Objects **when instructed to do so by Game
  Effects or costs**."* 420.2.b then adds the Standard Move as a further source. So the effect move is the
  *primary* case, not an edge case. And 456/456.1 carve out the one exception explicitly: *"Recalls are
  not Moves. **They do not cause Triggered Abilities to trigger that are triggered by Move actions.**"* A
  carve-out for recalls only makes sense if ordinary effect moves do trigger them.
- **"here" is read at resolution.** 359.3.f.1 — *"Some information used by abilities is referenced from
  the source of those abilities … recognized by the presence of words like **'here,' 'my,'** or 'its'."*
  359.3.f.2 — *"Information referenced in an instruction in this way will be **checked on execution of the
  instruction**."* Its own example is Yasuo, Remorseful: an opponent moves him back to base in reaction to
  his attack trigger, and *"when the attack trigger resolves, 'here' is no longer the battlefield where
  combat is ongoing and the attack trigger mistargets."*

So "When I move … here" resolves to the unit's location **after** the move, because that is where the
source is when the instruction executes. Retired like R29 — no entry needs a ruling for it.

---

## 1. `treasure-hunter-industrialist-gold` — four Gold and four Recruits a turn — **HOLDS**

**SFD-130 Treasure Hunter** (Unit, Chaos, E2 M1): **"When I move, play a Gold gear token exhausted."**
**SFD-171 Renata Glasc, Industrialist** (Unit, Order): "Your tokens enter ready."
**OGN-173 Ride the Wind** (Spell, Chaos, E2 P1, `[Action]`): "Move a friendly unit **and ready it**."
**OGN-184 The Syren** (Gear, Chaos, E2): "1 Energy, exhaust: Move a friendly unit at a battlefield to its base."
**SFD-153 Eye of the Herald** (Gear, Order, E1, `[Equip] Order`): `[Effect]` **"When I move, play a 1 Might Recruit unit token here."**

Four moves in a turn, and the Hunter has no `[Ganking]`, so each Standard Move is base↔battlefield only
(144.4.a/b):

| move | how | cost | exhausts him? |
|---|---|---|---|
| 1 | Standard Move base → battlefield | free | yes (144.2) |
| 2 | Ride the Wind: move **and ready** | 2E + 1 Chaos | no |
| 3 | Standard Move base → battlefield | free | yes |
| 4 | The Syren: move to base | 1E + Syren's exhaust | no |

**Four Gold for 3 Energy + 1 Chaos Power.** Under **R25 = A** each Gold enters ready, and 187.5 spells the
token out as *"[Reaction][>] **Kill this, [E]**: [Add] [A]"* — an exhaust cost, so "enters ready" is
exactly what makes it spendable the same turn. Net **+3 Power, −3 Energy**, plus four bodies.

The Eye rider works for the reason above: 136.2.d makes the Effect Text's "I" the Top-Most Card (the
Hunter), and 359.3.f.2 makes "here" his post-move location. Renata makes the Recruits enter ready too, so
they can move the turn they appear.

**Constraint the entry already states and that checks out:** he enters exhausted (143.4), so the turn he
lands he produces nothing. **Domain:** Chaos + Order, and **VEN-155 Heart of the Tempest is the only
Order/Chaos legend in the pool** — confirmed by scanning every Legend row in the corpus.

---

## 2. `fae-dragon-wallop-industrialist` — a free Wallop is +2 Energy and a Gold — **HOLDS**

**SFD-101 Fae Dragon** (Unit, Body, E7 P1 M7): "When you play me, buff up to four friendly units.
**When you spend a buff, play a Gold gear token exhausted.**"
**OGN-146 Wallop** (Spell, Body, E2, `[Action]`): "As you play this, you may **spend a buff as an
additional cost. If you do, ignore this spell's cost.** Ready a unit."
**OGS-014 Lux, Crownguard** (Unit, Order, E4 M2): "exhaust: `[Reaction]` — Add 2 Energy. **Use only to
play spells.**"

Per Wallop, for zero Energy: spend a buff → Fae Dragon plays a Gold, ready under **R25 = A**, worth 1
rainbow → ready an exhausted Lux → Lux exhausts again for 2 spell-only Energy. **+2 spell Energy and +1
Power per free Wallop.**

- The cost-spend does trigger the Dragon: 702.2.b is flat — *"Spending a Buff removes a single Buff
  counter from a Unit"* — with no exemption for spends made as a cost.
- Three real bounds, all in the entry: three Wallops per deck (103.2.b), four buffs per Fae Dragon play,
  and **702.3** *"There can only be one Buff on a Unit at a time"* — so a unit cannot be double-buffed to
  fuel two Wallops.
- Overt Operation (OGN-153, 5E+2P) refuels every buff at once, but at that price it is a net loss as a
  Gold converter, which is what the entry says.

The Energy is Lux's and **spell-locked**, so this engine pays for more spells, not for units — the entry
is right to class itself ENGINE and claim no kill.
