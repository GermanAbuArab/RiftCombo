# RiftCombo — todo (session 2026-09-02)

## 0. Verify the handoff's load-bearing claim ("no infinite combos")
- [x] Walk the Lux infinite-energy loop from the TCGplayer article → CLOSES (+1 Energy, +1 Recruit per pass)
- [x] Confirm Stealthy Pursuer / Eye of the Herald / Renata Industrialist via Riot's ban notice ("infinite Recruits")
- [x] Root-cause why the hunt missed both: RiftScribe drops Equipment `effect` text (27/39 cards); "empty deck ⇒ bottom == top" precondition ignored
- [x] Verify current ban list from raw Rules Hub HTML; verify errata list (8 cards, 2026-07-23)
- [x] Confirm Riot's public gallery JSON API (paginated, 1197 items) as the card-text source

## 1. Correct the record
- [x] docs/phase0-findings.md — add Result 5 (structural claim refuted), data defects, revised taxonomy
- [x] docs/plan.md — data source, legality, errata overlay, taxonomy, phases
- [x] docs/.handoff-fable.md — stale-notice header
- [x] verify: both docs read coherently end to end

## 2. Data foundation (repo `data/` + `scripts/`)
- [x] scripts/build-cards.mjs — fetch Riot gallery API → data/cards.json (text + effect + mightBonus + tags + costs + image)
- [x] data/errata.json — 8 Vendetta errata entries (old/new, date, source URL); applied as overlay
- [x] data/legality.json — format-scoped, entity-typed, dated (Rules Hub, 2026-07-16/24)
- [x] scripts/build-corpus.mjs — data/corpus_flat.txt for LLM reading (with effect text, full domain names)
- [x] verify: Eye of the Herald has effect text; Stealthy Pursuer banned in constructed; errata applied to Draven

## 3. Re-hunt with corrected corpus (parallel agents, background)
- [x] Update REFUTE_SPEC with the two verified infinites as worked examples (empty-deck, equipment-effect, exhausted-rune-recycle)
- [x] Dispatch N hunt agents by lens (state-precondition loops; equipment/move/token; point multipliers; alt-wins; recursion)
- [ ] Refute pass on union of candidates → survivors file
- [ ] verify: Lux loop and Recruits loop are rediscovered by at least one agent

## 4. Phase 1 — schema + seed + ingestion + matcher
- [x] package.json, TypeScript, vitest
- [x] schema (features / combos / variants / ingredients / legality)
- [x] seed combos (authored): Lux energy, Lux power, Lux→Renata kill, Recruits (banned), Ahri×Sentinel, Tryndamere×Brambleback, Grand Plaza, Gutter Palace, Death from Below
- [x] deck-code ingestion via @piltoverarchive/riftbound-deck-codes; plaintext paste
- [x] matcher (six buckets, multiset, domain-identity)
- [x] verify: the article's Lux deck list → finds Lux combos; a random deck → finds none

## 5. Web app (static, client-side matcher) + deck-URL proxy
- [ ] esbuild bundle of the matcher + slim data for the browser
- [ ] UI: paste / deck code / URL input → buckets → SVG graph (layered layout first)
- [ ] Cloudflare Worker: static assets + /api/deck-url proxy (Piltover Archive RSC), honest UA, allowlist
- [ ] Riot disclaimer verbatim; CSP/COOP headers
- [ ] verify: renders the Lux fixture legibly at 375px and 1280px
