# VERIFY + REFUTE spec (RiftCombo Phase 0)

SEARCH is a deterministic resource-flow matcher. It over-generates by design: it knows
arithmetic, not rules. Your job is to kill everything that does not actually work.

**Default to REFUTED.** A candidate survives only if you can write out a concrete,
legal, repeatable play sequence. "Probably works" = REFUTED. Burden of proof is on the combo.

This is the step that exists because the project lead derived a plausible-sounding
"Malzahar/Fiora/Garen infinite runes" loop from card text and was wrong — Malzahar has
3 Might, Garen's buff gives +1 → 4, and Mighty requires 5+, so Fiora's trigger never fires.
That failure is the benchmark. If you would have passed that combo, you are being too generous.

## Output per candidate

```json
{
  "id": "<index from candidates.json>",
  "cards": ["OGN-212/298", ...],
  "verdict": "WORKS | REFUTED | UNCERTAIN",
  "loop_steps": ["1. ...", "2. ...", "3. repeat"],
  "net_per_iteration": {"ENERGY": "+1", "CARD_HAND": "0"},
  "terminates_in": "ability points | extra turns | infinite energy | none (engine only)",
  "refutation": "<the specific rule or cost that breaks it, with rule number — null if WORKS>",
  "missing_pieces": ["<what a real deck would additionally need>"],
  "confidence": "high | medium | low"
}
```

## REFUTATION CHECKLIST — walk every item, every time

**Cost payability**
1. Is every Energy and Power cost actually payable *each* iteration, or does the loop
   assume resources it never regenerates? (Rune Pool empties at start of Main Phase and
   end of turn — rule 167. A resource float does NOT survive the turn.)
2. Does an activated ability cost `exhaust_self`? Then the permanent must be READY each
   iteration. Units **enter exhausted** (143.4) — so a freshly played/bounced unit is
   inert on arrival unless something readies it or it has Accelerate.
3. Does the loop need sacrifice **fodder** every iteration? Is fodder actually replaced?
4. Does a cost require a *specific state* the loop doesn't restore (Mighty, Empowered, Level N)?

**Threshold traps** (the Malzahar class of error)
5. `Mighty` = Might **>= 5** (708). Check the ACTUAL printed Might plus buffs. A 3-Might
   unit with a +1 anthem is 4 and is NOT Mighty.
6. "**Becomes** Mighty" (709) is a threshold CROSSING, not a state. A unit already at 5+
   that gains more Might does **not** re-trigger. The loop must push it below 5 and back.
7. Same logic for `Empowered` (828) and `Level N` (824).

**Per-turn limiters**
8. Any `limiter` field on a participating ability — "once each turn", "N times each turn"
   (371), "only while I'm at a battlefield", "if you haven't..." — usually kills the loop
   outright. Check every one.
9. `Score` is capped **once per battlefield per turn** (470). Only `gain_point` (ability-granted)
   is uncapped. A loop that repeats `score` is REFUTED on rule 470.

**Self-limiting cards**
10. `[Flow]` (829) plays from trash then **banishes** — at most 2 uses, never infinite.
11. Does a card banish itself, or banish the thing the loop needs to recur?
12. Can the card actually rebuy/recur *itself*, or only other cards?
13. Minimum floors ("reduced to a minimum of 1") cap cost-reduction loops.

**Timing legality**
14. Activated abilities work only on the controller's turn during an Open State (381)
    **unless** tagged Action or Reaction. A loop mixing speeds may be illegal.
15. Reaction-speed resource abilities CAN be used mid-cost-payment (429.3) — this is how
    "floating power" works and it is legal. Do not refute this incorrectly.

**Zone and identity**
16. `Recycle` goes to the **bottom of the deck** (416.5), not to hand. A recycle loop needs
    a draw engine to actually reuse the cards, and enough deck to not deck out.
17. Zone change makes a **new object** (124) — this RESETS "once each turn" state, which can
    legitimately *enable* bounce loops. Consider both directions.
18. Does the loop draw? Drawing from an empty deck = **Burn Out**, and Burn Out gives an
    **opponent a point** (431.2.c). An infinite draw loop with no sink LOSES the game.

**Deck legality**
19. **Domain Identity**: every card's domains must be a SUBSET of the Legend's domains
    (103.1.b). A candidate mixing e.g. Mind and Order needs a two-domain Legend — say so
    in `missing_pieces`, don't silently assume it.
20. Max 3 copies of a name; `Unique` cards max 1 (825.3.a).
21. Battlefield-dependent combos: you bring 3, only **1** is used, chosen randomly in Duel
    (485.5). Flag as low consistency, do not treat as reliable.

**Known hard blockers seen in this card pool**
22. `VEN-022 Endless Riches` — replacement effect banishes anything headed to the trash;
    breaks every trash-recursion loop.
23. 1:1 resource converters (e.g. `SFD-083 Hextech Anomaly`, `SFD-117 Ancient Henge`) have
    **no net gain** — they convert Power↔Energy. They are not engines.
24. Modal cards ("choose one") resolve exactly ONE mode. If the candidate needs two modes
    of the same card simultaneously, REFUTED.

## Calibration

- `WORKS` — you can write the numbered steps, every cost is paid, net is non-negative,
  and it repeats. State what it terminates in.
- `UNCERTAIN` — mechanically plausible but depends on a rules reading you cannot confirm
  from the primer, or on a card whose text is ambiguous. Say exactly what you'd need.
- `REFUTED` — cite the specific cost or rule number that breaks it. Be concrete:
  "Malzahar is 3 Might, +1 from Garen = 4, Mighty needs 5+ (rule 708), Fiora never triggers"
  is a good refutation. "Seems unlikely to work" is not.

A "combo" that produces an engine but no way to convert it into points is **not refuted** —
it's `WORKS` with `terminates_in: "none (engine only)"`. Riftbound caps its natural point
sources deliberately, so engine-without-kill is a real and common category.
