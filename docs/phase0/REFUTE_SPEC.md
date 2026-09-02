# REFUTE spec (RiftCombo, v2 — 2026-09-02)

PROPOSE agents read the whole card pool and over-generate by design. Your job is to kill every
candidate that does not actually work — and **only** those.

**Default to REFUTED.** A candidate survives only if you can write out a concrete, legal,
repeatable play sequence with every cost paid. "Probably works" = REFUTED. Burden of proof is on
the combo.

Two calibration failures define this spec:

1. **Too generous (2026-08-30).** The project lead derived a "Malzahar / Fiora / Garen infinite
   runes" loop from card text. Malzahar has 3 Might, Garen's anthem gives +1 → 4, Mighty needs 5+,
   so Fiora never triggers. If you would have passed that combo you are too generous.
2. **Too strict (2026-09-02).** The first hunt refuted Ekko, Recurrent as a loop piece because
   *Recycle* puts him on the **bottom** of the deck, "out of reach of his own loop" — and then
   concluded that **no infinite combo exists in Riftbound**. The Lux deck built on exactly that
   Ekko loop had finished 19th of 640 at a Regional Open two months earlier: with an **empty
   deck**, bottom is top. If you would have refuted the Lux loop you are too strict.

## Worked examples — what "closes" looks like

### A. Lux infinite energy (legal; INFINITE; verified against a tournament write-up)

Cards: Forge of the Future OGN-212 (`When you play this, play a 1 Might Recruit at your base. /
Kill this: Recycle up to 4 cards from trashes.`), Ekko, Recurrent OGN-110 (`[Deathknell] —
Recycle me to ready your runes.`), Shadow's Call UNL-165 (`Give a friendly unit [Temporary].
Draw 2.`), Sacrifice UNL-173 (`[Reaction] Additional cost: kill a friendly Mighty unit. Draw 2 and
channel 1 rune exhausted.`). Legend domains ⊇ Mind + Order.

State: Main Deck **empty**; 12 runes in play; Forge in play; one Shadow's Call and one Sacrifice in
the trash; Ekko, a second Shadow's Call and a second Sacrifice in hand.

1. Kill Forge → recycle Forge + Shadow's Call + Sacrifice (deck: 3).
2. Play Ekko: 5 Energy + 1 Mind Power. The Power comes from `Recycle this: Add [Power]` on a rune
   (164.2.b) — **no exhaust in that cost**, so recycle an *exhausted* rune.
3. Play Shadow's Call (2). In response play Sacrifice (1), killing Ekko as its cost. First exhaust
   every still-ready rune for floating Energy.
4. Ekko's Deathknell: recycle Ekko (deck: 4), ready all 11 runes on the board.
5. Resolve: Sacrifice draws 2 and channels the recycled rune back exhausted; Shadow's Call draws 2.
   Hand: Forge, Shadow's Call, Sacrifice, Ekko.
6. Replay Forge (2; makes a Recruit). Back to step 1.

Net per pass: −10 Energy −1 Power, +11 readied runes +1 rune channeled back, **+1 floating Energy,
+1 Recruit token. Unbounded.** Kill: Retreat + Lecturing Yordle convert Energy to Power; Renata
Glasc, Mastermind (`4 Energy + 4 Mind Power, exhaust: Score 1 point`) bounced by Retreat and
readied by Fiora scores 8 in one turn.

### B. Infinite Recruits (Stealthy Pursuer BANNED 2026-07-24 for this; INFINITE; Riot primary)

Cards: Stealthy Pursuer OGN-177 (`When a friendly unit moves from my location, I may be moved with
it.`), Eye of the Herald SFD-153 — Equipment whose **effect** text (granted to the equipped unit)
is `When I move, play a 1 Might Recruit unit token here.`, Renata Glasc, Industrialist SFD-171
(`Your tokens enter ready.`). Chaos + Order.

Equip the Eye to Stealthy Pursuer. A ready Recruit Standard-Moves base → your battlefield
(144.4.a, exhausting itself); Pursuer "may be moved with it" — not a Standard Move, no exhaust;
Pursuer moved → the Eye plays a Recruit *here*, which enters **ready**; that Recruit moves
battlefield → base (144.4.b), Pursuer follows, another ready Recruit appears. Riot: *"the potential
to create infinite Recruits as early as turn three."*

## Output per candidate

```json
{
  "id": "<candidate id>",
  "cards": ["OGN-212", "..."],
  "class": "INFINITE | BURST | ALT_WIN",
  "verdict": "WORKS | REFUTED | UNCERTAIN",
  "preconditions": ["empty Main Deck", "12 runes in play", "..."],
  "loop_steps": ["1. ...", "2. ...", "3. repeat"],
  "net_per_iteration": {"ENERGY": "+1", "RECRUITS": "+1"},
  "terminates_in": "ability points | extra turns | infinite energy | win the game | none (engine only)",
  "legend_domains_required": ["Mind", "Order"],
  "refutation": "<the specific rule or cost that breaks it, with rule number — null if WORKS>",
  "missing_pieces": ["<what a real deck would additionally need>"],
  "confidence": "high | medium | low"
}
```

## REFUTATION CHECKLIST — walk every item, every time

**Cost payability**
1. Is every Energy and Power cost payable *each* iteration? The Rune Pool empties at the start of
   the Main Phase and at end of turn (167) — a float does not survive the turn, but it does
   survive within the turn, including across loop iterations.
2. Does an activated ability cost `exhaust`? Then the permanent must be READY each iteration.
   Units **enter exhausted** (143.4); Gear enters ready (149.1); tokens enter as the creating
   effect says, unless something like Renata Glasc, Industrialist overrides it.
3. Sacrifice/kill **fodder** every iteration — is it actually replaced every iteration?
4. Does a cost need a state the loop does not restore (Mighty, Empowered, Level N)?

**Threshold traps** (the Malzahar class of error)
5. `Mighty` = Might **≥ 5** (708). Use printed Might plus buffs. 3 + 1 = 4 is not Mighty.
6. "**Becomes** Mighty" (709) is a crossing, not a state. Already-Mighty units do not re-trigger.
7. Same for `Empowered` (828) and `Level N` (824).

**Per-turn limiters**
8. "once each turn", "the first time … each turn", "N times each turn" (371), "only while I'm at
   a battlefield", "if you haven't …" — check every participating ability.
9. Conquer/Hold **Scoring** is capped once per battlefield per turn (470). Ability-granted points
   ("score 1 point" on a card) are **not** capped — but if the ability is *attached to* a Hold or
   Conquer trigger, it fires once per Hold/Conquer, so the cap applies indirectly.

**Self-limiting cards**
10. `[Flow]` (829) plays from trash then **banishes**. Two uses, never infinite. Death from Below
    (UNL-186) is *not* Flow and has no banish clause — read the actual text.
11. Does a card banish itself, or banish the thing the loop needs to recur? (Time Warp does.)
12. Can the card actually rebuy *itself*, or only other cards?
13. "to a minimum of 1" floors cap cost-reduction loops. "Each Repeat Cost can be paid only a
    single time" (820.1.c.3) caps Repeat at one extra copy.

**Timing legality**
14. Activated abilities work only on the controller's turn in an Open State (381) unless tagged
    Action or Reaction. A loop mixing speeds may be illegal.
15. Reaction-speed resource abilities CAN be used mid-cost-payment (429.3). Floating Power by
    recycling a rune at any priority is legal. Do not refute this.

**Zone, identity, game state**
16. `Recycle` goes to the **bottom** of the deck (416.5). With a non-empty deck the loop needs a
    draw engine and deck depth; with an **empty deck the recycled card is the next draw.** State
    the deck-size precondition explicitly instead of refuting on "bottom of deck".
17. Zone change makes a **new object** (124) — this RESETS "once each turn" state and "the Nth
    time" counters (383.1), which can *enable* bounce loops. Consider both directions.
18. Drawing from an empty deck is **Burn Out**: your trash recycles into your deck and an
    **opponent gains a point** (431.2). A draw loop must never draw one more than the deck holds.
    Count the draws against the cards recycled in the same pass.
19. **Equipment has two texts.** `text` is the gear's own rules text (`[Equip] …`); `effect` is
    granted to the equipped unit ("I" = that unit) and is appended to its rules text (718.3).
    A "vanilla" Equipment in the corpus almost certainly means you are reading the wrong field.
20. Tokens: can be Played (350.2) and Moved; "play a token *here*" puts it at the trigger's
    location; Renata Glasc, Industrialist makes them enter ready. Reflection tokens explicitly
    skip play effects; `[Temporary]` tokens die at the start of the Beginning Phase, *before*
    scoring (816.1.b).

**Deck legality**
21. **Domain Identity**: each card's domains must be a SUBSET of the Legend's (103.1.b). **Every
    Legend in the pool has exactly two domains**, so any three-domain line is illegal. Name a
    concrete Legend that covers the line in `legend_domains_required`.
22. Max 3 copies of a name; `[Unique]` cards max 1.
23. Battlefield-dependent combos: 3 brought, **1** used — random in Duel (485.5), chosen by the
    player in Match (486.5). Flag the format dependence; do not refute on it.

**Known hard blockers in this pool**
24. Endless Riches VEN-022 — replacement: anything headed to your trash from outside the Main Deck
    is banished instead. Breaks every trash-recursion loop while it is in play.
25. 1:1 converters (Hextech Anomaly SFD-083, Ancient Henge SFD-117) have no net gain.
26. The Rune Deck is exactly 12 (161.2.a) and `channel` stops when it is empty (430.3): ramp is
    capped at 12 runes on the board. Note: recycling a rune puts it *back in the Rune Deck*
    (416.1.b), so a recycle-then-channel pair is legal and restores the rune.
27. Modal cards resolve exactly one mode; "choose one that hasn't been chosen this turn" caps a
    trigger at its number of modes.

## Calibration

- `WORKS` — numbered steps, every cost paid, net non-negative, repeats (or, for BURST/ALT_WIN,
  the single scoring event or win check is reached). State what it terminates in.
- `UNCERTAIN` — mechanically plausible but hinges on a rules reading you cannot confirm from the
  primer, or on ambiguous text. Say exactly what would settle it.
- `REFUTED` — cite the specific cost or rule number. "Malzahar is 3 Might, +1 from Garen = 4,
  Mighty needs 5+ (708), Fiora never triggers" is a refutation. "Seems unlikely" is not.

An engine with no way to convert into points is **not refuted** — `WORKS` with
`terminates_in: "none (engine only)"`. Riftbound caps its natural point sources, so engine-without-
kill is a real category. Conversely a candidate that is merely *strong* (a 4-point Conquer) is not
a combo unless it is multiplicative or repeatable — say so and give it `class: BURST` only if a
single scoring event can reach 8 from a realistic starting score.

**Never emit a structural claim** ("no X exists in the pool") — that is not your job, and the
last one was wrong.
