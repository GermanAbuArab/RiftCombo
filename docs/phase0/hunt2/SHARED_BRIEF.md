# Riftbound combo hunt v2 — shared brief for every PROPOSE agent

You are one of six agents reading the ENTIRE Riftbound card pool to propose combos. Each agent
has a different lens (given in your task). This is the PROPOSE pass: propose generously, label
confidence honestly, and attach raw evidence. An independent REFUTE pass runs afterwards.

## Files (absolute paths; read them fully with the Read tool, they fit)
- Corpus (935 cards, ~47k tokens): /Users/germanabuarab/proyectos/RiftCombo/data/corpus_flat.txt
  Columns: code | name | type | domains | cost | text. Equipment carries "[Effect] ..." = text
  granted to the equipped unit ("I" = that unit). "[BANNED ...]" = on Riot's current ban list.
  Domains are full names (Calm and Chaos are different domains; "Colorless" = no domain).
- Rules primer (~39k tokens): /Users/germanabuarab/proyectos/RiftCombo/docs/phase0/rules-primer.md
- Refute spec with two WORKED EXAMPLES of loops that close: /Users/germanabuarab/proyectos/RiftCombo/docs/phase0/REFUTE_SPEC.md
  Read the worked examples first. They show what evidence and arithmetic a candidate needs.
- Previous hunt (48 candidates, 7 survived): /Users/germanabuarab/proyectos/RiftCombo/docs/phase0/hunt.md
  WARNING: its §0.2 and §0.3 ("no net-positive engine", "no infinite loops") are WRONG — it read
  a corpus with no Equipment effect text and ignored empty-deck state. Its individual card
  refutations are mostly sound; do not re-propose its B-xx entries unless you have a NEW reason
  (equipment effect text, a game-state precondition it ignored, or an infinite resource engine
  now being available). Its A-xx survivors are known; you may refine them, not re-derive them.

## Facts you may rely on (verified against primary sources)
- Win at 8 points. NO life total; damage is not a win condition. Infinite draw is a LIABILITY
  (Burn Out gives an opponent a point).
- Conquer/Hold scoring capped once per battlefield per turn (470); ability-granted points are not.
- Units enter exhausted (143.4); gear enters ready; Rune Pool empties at Main Phase start and turn end (167).
- Every Legend has exactly TWO domains; card.domains must be a subset of the legend's (103.1.b).
- Rune Deck is exactly 12; channel stops when empty. Recycling a rune returns it to the Rune Deck.
- Rune abilities: exhaust → 1 Energy; RECYCLE (no exhaust needed) → 1 Power of its domain.
- Recycle puts a card on the BOTTOM of the deck. With an EMPTY deck, bottom == next draw.
- Two infinite combos are VERIFIED: Lux infinite energy (Forge of the Future · Ekko, Recurrent ·
  Shadow's Call · Sacrifice; empty deck) and infinite Recruits (Stealthy Pursuer · Eye of the
  Herald · Renata Glasc, Industrialist; Stealthy Pursuer is now banned). Assume infinite Energy
  and Power ARE available to a Mind+Order deck via the Lux loop when evaluating kills.

## Method (do all of it)
1. Calibration: locate the cards of both verified infinites in the corpus and confirm in 5-10
   lines each that you can see why they close. If you cannot, say so — do not proceed on a
   misreading.
2. Read every card in the corpus. Build an explicit index for your lens (list the card codes).
3. For each candidate you propose, provide:
   - cards: code + name + the QUOTED text that matters (copy from the corpus, do not paraphrase)
   - class: INFINITE (unbounded) | BURST (a single scoring event that can reach 8 from a realistic
     score) | ALT_WIN (assemble-and-win) | ENGINE (repeatable value with no kill)
   - preconditions / game state assumed (empty deck, held battlefield, N runes, tokens ready, etc.)
   - numbered steps, with per-iteration cost/gain arithmetic where applicable
   - legend domains required (2 max) and one concrete Legend that covers them
   - rule numbers you rely on (from the primer)
   - your own best attack on it, and why it survives (or "UNRESOLVED: <exact question>")
   - confidence: high | medium | low
4. Re-examine hunt.md's B-xx refutations that your lens touches. If the corrected corpus or the
   infinite-resource assumption changes a verdict, say which and why.
5. List data anomalies you notice (cards whose text seems truncated, inconsistent, or missing).

## Rules
- Raw evidence over verdicts: quotes and rule numbers, always.
- Never emit structural claims ("no X exists"). Absence of finds is just absence of finds.
- Do not browse the web. Local files only.
- Write your full report to the output path given in your task (markdown). Then reply with a
  10-line summary: number of candidates by class, your top 3 with one line each, and anomalies.
