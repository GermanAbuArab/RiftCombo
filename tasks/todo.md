# RiftCombo — todo (session 2026-09-02)

## 0. Verify the handoff's load-bearing claim ("no infinite combos")
- [x] Walk the Lux infinite-energy loop from the TCGplayer article → CLOSES (+1 Energy, +1 Recruit per pass)
- [x] Confirm Stealthy Pursuer / Eye of the Herald / Renata Industrialist via Riot's ban notice ("infinite Recruits")
- [x] Root-cause why the hunt missed both: RiftScribe drops Equipment `effect` text (27/39 cards); "empty deck ⇒ bottom == top" precondition ignored
- [x] Verify current ban list from raw Rules Hub HTML; verify errata list (8 cards, 2026-07-23)
- [x] Confirm Riot's public gallery JSON API (paginated, 1197 items) as the card-text source

## 1. Correct the record
- [ ] docs/phase0-findings.md — add Result 5 (structural claim refuted), data defects, revised taxonomy
- [ ] docs/plan.md — data source, legality, errata overlay, taxonomy, phases
- [ ] docs/.handoff-fable.md — stale-notice header
- [ ] verify: both docs read coherently end to end

## 2. Data foundation (repo `data/` + `scripts/`)
- [ ] scripts/build-cards.mjs — fetch Riot gallery API → data/cards.json (text + effect + mightBonus + tags + costs + image)
- [ ] data/errata.json — 8 Vendetta errata entries (old/new, date, source URL); applied as overlay
- [ ] data/legality.json — format-scoped, entity-typed, dated (Rules Hub, 2026-07-16/24)
- [ ] scripts/build-corpus.mjs — data/corpus_flat.txt for LLM reading (with effect text, full domain names)
- [ ] verify: Eye of the Herald has effect text; Stealthy Pursuer banned in constructed; errata applied to Draven

## 3. Re-hunt with corrected corpus (parallel agents, background)
- [ ] Update REFUTE_SPEC with the two verified infinites as worked examples (empty-deck, equipment-effect, exhausted-rune-recycle)
- [ ] Dispatch N hunt agents by lens (state-precondition loops; equipment/move/token; point multipliers; alt-wins; recursion)
- [ ] Refute pass on union of candidates → survivors file
- [ ] verify: Lux loop and Recruits loop are rediscovered by at least one agent

## 4. Phase 1 — schema + seed + ingestion + matcher
- [ ] package.json, TypeScript, vitest
- [ ] schema (features / combos / variants / ingredients / legality)
- [ ] seed combos (authored): Lux energy, Lux power, Lux→Renata kill, Recruits (banned), Ahri×Sentinel, Tryndamere×Brambleback, Grand Plaza, Gutter Palace, Death from Below
- [ ] deck-code ingestion via @piltoverarchive/riftbound-deck-codes; plaintext paste
- [ ] matcher (six buckets, multiset, domain-identity)
- [ ] verify: the article's Lux deck list → finds Lux combos; a random deck → finds none
