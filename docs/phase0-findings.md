# Phase 0 findings — combo mining feasibility

**Verdict: the gate FAILED for the architecture I planned, and the failure identified a better one.**
**Addendum 2026-09-02 (Result 5): the follow-up hunt's claim that Riftbound has no infinite
combos was wrong — two are verified against primary sources, and the product concept stands.**

Phase 0 existed to answer one question before any product code was written: *can we mine
Riftbound combos at acceptable precision?* It cost roughly a day of agent time and produced
three results that would each have been expensive to learn later.

---

## Result 1 — The card-pool filter was wrong, and load-bearing

The plan proposed restricting mining to a 316-card "engine subset" (cards matching combo
primitives: Add / Ready / trash-recursion / Repeat / sacrifice / tokens / copy / bounce).

**Tested against the validation set, that filter misses 9 of 20 cards** — including the two
that matter most:

| Missed card | Why it matters |
|---|---|
| **Renata Glasc, Mastermind** | `⟳: Score 1 point` — the actual win condition of the archetype |
| **Time Warp** | `Take a turn after this one` |
| Shadow's Call, Lecturing Yordle, Detonate, Hidden Blade | draw effects |
| Eye of the Herald, Stealthy Pursuer, Garen Commander | equip / move / might-buff |

**Cause:** the primitive list was ported from MTG intuitions (mana, untap, recursion, tokens)
rather than derived from Riftbound's payoff taxonomy. Draw, point-scoring, extra turns,
equip, move and might-buffs are all combo-relevant here and all fell through.

**Fix: delete the optimization.** Pruning solves MTG's 30,000-card scale problem. Riftbound has
935 cards / 30,521 tokens — there is no scale problem. Prune at search time on extracted
primitives, never on the card pool.

---

## Result 2 — Structured extraction WORKS (keep this)

921/921 cards extracted to structured primitives across 8 parallel agents.

- **0 schema violations** against the closed vocabularies
- **0 missing cards**
- Spot-checked the Lux combo pieces by hand: every ability faithful
  (`Forge` → `{kill_self} → recycle 4 from trash`; `Ekko` → `{recycle_self} → ready runes`)

Two integration bugs caught here, both real:
1. **Trailing-newline inconsistency.** Per-file counts summed to 805; `cat` yielded 802 —
   three records fused at chunk boundaries. Fused lines are invalid JSON and would have been
   *silently dropped* by a lenient loader. Normalize before merging.
2. **Convention divergence.** Trash→hand recursion has no op in the spec; some agents encoded
   it `bounce`, others `other`. Mechanically identical cards would get different loop verdicts.

Known recall gaps in the spec (fix in Phase 1, not urgent — they cause under-finding, not
false claims): no op for trash→hand return, no `banish` zone in `play_free`, no deck-top
recycle, no modal construct, no cost-*increase* op, dual-domain power symbols unrecoverable
from the source data.

---

## Result 3 — The combinatorial search FAILED, decisively

Resource-flow covering search over the extracted primitives:

| Metric | Result |
|---|---|
| Candidates generated | **19,750** |
| Lux infinite energy (2 independent sources) | **0 found** — not even a 2-card subset |
| Lux infinite power / Renata / Kai'Sa | **0 found** |
| Infinite Recruits (Riot-confirmed) | 0 exact, 1 partial |
| **Known-BROKEN Malzahar loop** | **23 candidates** |

Not merely imprecise — **anti-correlated with truth**.

**Root cause: every resource in the model dangles.**

```
RUNE_READY   10 producers /  0 consumers
CARD_DECK     8 producers /  0 consumers
POINT        14 producers /  0 consumers
```

The conversions that actually close a Riftbound loop were never modeled:

```
readied rune -> energy     (exhaust to pay)   <- closes the ENERGY deficit
deck         -> hand       (draw)             <- closes the card cycle
hand         -> body/trash (play)
trash        -> deck       (recycle)          <- closes the loop
```

The Lux loop nets `ENERGY −3, BODY −3` under this model and is rejected, because readied
runes can't *pay* for anything. With no closed cycles in the graph, the search found 19,750
phantom ones instead.

**Two problems survive even a repaired model:**
- The real combo is **4 cards**. Brute-force 4-subsets of 921 cards ≈ 3×10¹⁰.
- It requires an **empty deck** precondition — game state a static resource model can't express.

Interim fixes that helped but didn't save it: requiring a genuine cycle (a resource both
produced and consumed) cut 78,213 → 19,750 and eliminated all 265 bogus "1-card loops";
charging play-triggered abilities their card's printed cost; excluding MIGHT as a payoff
(no life total, so unbounded Might isn't a win condition).

---

## Result 4 — Reading beats searching

The strongest evidence came from an accident. The 8 extraction agents, doing pure mechanical
data transformation and **never asked to find combos**, spontaneously surfaced combo
intelligence in their notes. All verified against card text — **7/7 correct**:

| Card | Finding | Verified text |
|---|---|---|
| **Dominus** VEN-142 | unbounded ready enabler, no limiter | `double a unit's Might and give it "🔮🔮: Ready me"` |
| **Matriarch of War** VEN-153 | Legend; readies a unit, re-arms on any empower | `When you empower something else, empower me. / Disempower me, 🔮, ⟳: Ready a unit` |
| **Endless Riches** VEN-022 | hard kill for ALL trash recursion | `If a card would go to your trash from anywhere other than your Main Deck, banish it instead` |
| **Bloodharbor Ripper** UNL-185 | Gold token inert on arrival | token has `Kill this, ⟳: Add 🔮` but **enters exhausted** — can't pay its own cost |
| **Wuju Master** UNL-191 | overrides rule 143.4 | `[Level 11] Your units enter ready` |
| **Questionable Tome** VEN-054 | needs two ready-states per draw | Empower costs ⟳, draw costs ⟳ |
| **Sanction + Apprentice Mage** | Empowered-threshold oscillator | Reaction empower/disempower + `When I become Empowered` trigger |

Note these include **refutations**, not just finds — the kind of reasoning the combinatorial
search structurally cannot do.

Using one lead, two candidate loops were refuted by hand in minutes with exact arithmetic:
- `Lux, Crownguard (⟳: Add 2 Energy)` + Dominus → converts 2 Power to 2 Energy. Break-even,
  not an engine. Also limited to `Use only to play spells`.
- `Malzahar, Fanatic (Kill a friendly unit or gear, ⟳: Add 🔮🔮)` + Dominus → produces exactly
  the 2 Power needed to ready him while **eating a permanent per iteration**. Net-negative.

---

## Revised architecture

**Drop the combinatorial search step entirely.**

```
BEFORE (failed)
  extract primitives -> brute-force subset search -> LLM verify -> human review

AFTER
  full corpus (30k tok) + rules primer  ->  LLM proposes loops
                                        ->  adversarial REFUTE pass (default: refuted)
                                        ->  human review queue -> DB
```

The whole card pool fits in one context window. That was the R6 finding, and the original
design threw it away by converting a comprehension problem into a combinatorics problem.
Riftbound combos are 4-5 cards deep with state preconditions and precise sequencing — legible
to a reader, invisible to a resource-flow matcher.

**Keep from Phase 0:** the structured extraction (it works, 921/921, and the primitives are
useful for *filtering and indexing* even though they're insufficient for *discovery*); the
rules primer; the validation set; and the 24-item refutation checklist in `REFUTE_SPEC.md`,
which is now grounded in verified real examples.

## Result 5 — The propose-then-refute hunt ran; its headline conclusion was wrong

The hunt (`docs/phase0/hunt.md`) read all 920 cards, proposed 48 candidates, refuted 41 and
kept 7 — a reviewable ~15% survival rate, which is the precision signal Phase 0 wanted. But it
also concluded **"there are NO infinite loops in this pool"**, defended by three structural
arguments. Two are true and useful (all 49 Legends have exactly 2 domains; the Rune Deck is a
hard 12). The third — *"no net-positive repeatable resource engine exists"* — is **false**, and
the headline falls with it. Verified against primary sources on 2026-09-02:

| Combo | Status | Evidence |
|---|---|---|
| **Lux infinite energy** — Forge of the Future (OGN-212) · Ekko, Recurrent (OGN-110) · Shadow's Call (UNL-165) · Sacrifice (UNL-173) | **Real, legal, played competitively** | TCGplayer, Scott Mines, 2026-06-10: 19th of 640 at the Tianjin Regional Open, "a guaranteed win as early as turn five on stream". riftbound.gg: later top 8 in Hartford; community "still advocating for bans to remove the possibility of an infinite loop" |
| **Infinite Recruits** — Stealthy Pursuer (OGN-177) · Eye of the Herald (SFD-153) · Renata Glasc, Industrialist (SFD-171) | **Real — Riot banned Stealthy Pursuer for it**, effective 2026-07-24 | Riot, July ban-list update: *"the potential to create infinite Recruits as early as turn three with only small windows for interaction"* |

### The Lux loop, walked (my own walk, using the article's sequencing)

Precondition: Main Deck empty, 12 runes in play, a Forge of the Future in play, one Shadow's
Call and one Sacrifice already in the trash, Ekko + a second Shadow's Call + a second Sacrifice
in hand. Lady of Luminosity (Mind + Order) covers every card.

1. Activate Forge: *Kill this: Recycle up to 4 cards from trashes* → recycle Forge itself,
   Shadow's Call, Sacrifice. Deck: 3 cards.
2. Play Ekko (5 Energy + 1 Mind Power). The Power comes from recycling a rune — rule 164.2.b
   `Recycle this: Add [Power]` has **no exhaust in its cost**, so you recycle an *exhausted* rune.
3. Play Shadow's Call (2 Energy) on any friendly unit. In response, play Sacrifice (1 Energy,
   Reaction), killing Ekko as its cost. Exhaust every still-ready rune for floating Energy first.
4. Ekko's Deathknell: *Recycle me to ready your runes* → Ekko to the bottom of the deck (now 4
   cards), all 11 runes on the board ready.
5. Spells resolve: Sacrifice draws 2 and channels the recycled rune back (exhausted); Shadow's
   Call draws 2. The four draws are exactly Forge, Shadow's Call, Sacrifice, Ekko.
6. Replay Forge (2 Energy; its play trigger makes a Recruit token). State is identical to step 1.

Per iteration: 10 Energy + 1 Power spent, 11 runes readied plus the one channeled back →
**+1 floating Energy and +1 Recruit token, unbounded.** The kill documented in the article:
Retreat + Lecturing Yordle convert the energy into unlimited Power, then Renata Glasc,
Mastermind (`4 Energy + 4 Mind Power, exhaust: Score 1 point`) bounced with Retreat and readied
by Fiora scores 8 points in one turn. The hunt's B-01 refuted Renata on a "12-resource
ceiling" that the loop removes.

### Why the hunt missed both — three independent causes

1. **Data.** The corpus came from RiftScribe, whose `description` field is *rules text only*.
   Riot's own gallery carries a separate `effect` field for Equipment — the text granted to the
   equipped unit. **27 of 39 Equipment cards had no effect text in our corpus.** Eye of the
   Herald read as a vanilla `[Equip]`; its real text is *"When I move, play a 1 Might Recruit
   unit token here."* Riot's gallery also has 9 more Vendetta printings than RiftScribe.
2. **Game-state reasoning.** Hunt entry A-07 argued Ekko "puts himself out of reach of his own
   loop" because Recycle sends him to the *bottom* of the deck. True — and irrelevant when the
   deck is empty, because bottom is top and you draw him. The handoff flagged this exact caveat.
   The hunt never modelled preconditions (empty deck, empty rune deck, tokens entering ready).
3. **Method.** The hunt never walked the validation set. It built an impossibility proof by
   enumerating exhaust-gated `Add` abilities and never counted *"ready your runes"* (11–12
   resources for a 6-cost unit) as a repeatable resource engine. §0.2's premise — "readying
   costs ≥ what the readied thing produces" — is exactly what Ekko violates.

A fourth data defect surfaced alongside: RiftScribe's `is_banned` is `false` for **every** card,
including Stealthy Pursuer. Legality has to come from Riot's Rules Hub, not from a mirror.

### What the hunt got right (keep, re-verify, seed)

The refutations of individual cards read well and its non-infinite survivors are real product
content: **Ahri, Alluring × Blue Sentinel** (Hold-trigger multiplication), **Tryndamere ×
Red Brambleback** (Conquer multiplication, mono-Fury), **The Grand Plaza + Recruit the
Vanguard** (7 units → win), **Gutter Palace** (1-card alternate win), **Death from Below** (the
pool's one non-Flow recursive spell), **Svellsongur** text-doubling. These are the *bounded
burst* and *alternate win* families the plan's taxonomy did not name.

## Consequences

- **The LOOPLINE concept stands.** Infinite combos exist in Riftbound. They are rare (two known
  in ~1,020 printings), state-heavy (empty deck; an equipped mover plus a token-readier), found
  slowly by the community, and treated as bannable when found — which is exactly why a
  deck-level "do I have one / am I N cards away" check has value.
- **Broaden the outcome taxonomy** rather than pivot: `INFINITE` (unbounded engine, with or
  without a kill) · `BURST` (bounded multiplicative points that clear 8 in one scoring event) ·
  `ALT_WIN` (assemble-and-win). Every entry states which it is; nothing is labelled infinite
  without a walked loop.
- **Change the data source** to Riot's public gallery content API (`content.publishing.riotgames.com`,
  1,189 printings, `text` + `effect` + `mightBonus` + `tags`, official `cmsassets.rgpub.io`
  images). It does **not** carry the 2026-07-23 errata (8 cards) — those are a dated overlay.
  Legality comes from the Rules Hub, format-scoped and entity-typed.
- **Re-run the hunt** on the corrected corpus with the two verified infinites as worked
  examples, explicit game-state preconditions in the prompt, and the validation set walked
  before any structural claim is allowed. Parallel agents with different lenses, then a refute
  pass, then human review.

## Still open

Precision on *novel* candidates is now the only Phase 0 question left: the pipeline
rediscovering Lux is table stakes (it will be seeded, not discovered). The re-hunt measures
whether it finds combos we do not already know at a rate worth reviewing.
