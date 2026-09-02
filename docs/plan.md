# RiftCombo — implementation plan

A combo finder and visualizer for Riftbound TCG. Paste a decklist or deck code, get every known combo in it rendered as a graph.

Modeled on [LOOPLINE](https://loopline.robiichi.workers.dev/) (MTG, by ろびいち), which cross-references a Moxfield deck against Commander Spellbook. The critical difference is stated up front, because it determines the whole plan:

> **LOOPLINE is a visualization layer over a database somebody else spent six years building. For Riftbound that database does not exist. We are building the database *and* the tool, and the database is the hard 90%.**

Research date: 2026-08-30, revised 2026-09-02 after Phase 0 (see `phase0-findings.md`). Every fact below marked ✅ was verified against a live source or primary document, not inferred.

---

## 1. Verified foundations

### Card corpus ✅ (source changed 2026-09-02)
- **1,189 printings · 1,042 distinct card codes (set + number, incl. token/rune/special prefixes) · 935 distinct names**, 5 sets: OGN 352, SFD 288, UNL 288, VEN 237, OGS 24
- Types: Unit 629, Spell 233, Legend 127, Gear 114, Battlefield 66, Rune 18
- **Full corpus with rules text ≈ 45k tokens.** Fits in one context window.
- **Source: Riot's own gallery content API** — `content.publishing.riotgames.com/publishing-content/v2.0/public/channel/riftbound_website/list/riftbound_gallery_cards?locale=en_US&from=0&limit=200` (6 pages). It is the JSON behind `playriftbound.com/en-us/card-gallery`. Fields: `text` (rules text), **`effect` — Equipment text granted to the equipped unit, which RiftScribe drops for 27 of 39 Equipment cards and which hid the Eye of the Herald engine from the Phase 0 hunt**, `mightBonus`, `tags`, costs, official `cmsassets.rgpub.io` card images.
- **Errata is not in the API.** Riot's 2026-07-23 Vendetta errata changed 8 cards; `data/errata.json` applies them as exact-substring replacements in `scripts/build-cards.mjs`, which fails if a printed text drifts.
- Alt-art printings (`SFD-227*`, `UNL-079a`) sometimes drop reminder text. Match on the base code; read text from the base printing.
- ~~`riftscribe.gg/api/cards`~~ — cross-check only. Its `is_banned` is `false` for every card, including the banned ones.

Engine primitive census (from the abandoned 316-card filter — orientation only, see `phase0-findings.md` Result 1):

| Primitive | Cards | | Primitive | Cards |
|---|---:|---|---|---:|
| ready / untap | 97 | | recursion from trash | 29 |
| cost reduction | 28 | | return-to-hand | 26 |
| Repeat keyword | 25 | | exhaust-for-resource | 21 |
| recruit / token gen | 13 | | sacrifice outlet | 11 |
| copy effect | 5 | | play-for-free | 1 |

### Rules model ✅ (Riot Core Rules 2026-07-16, primary)

The single most important correction to any MTG intuition:

> **There is no life total. "Infinite damage" is not a win condition.**

You win at **8 points**. Points come from two mechanically distinct families:

| Source | Cap | Combo relevance |
|---|---|---|
| Conquer / Hold a battlefield | **once per battlefield per turn** (rule 470) | hard-capped, max 2/turn in 1v1 |
| Ability-granted "extra points" | **uncapped** | every infinite-point loop lives here |

Riot's Spiritforged FAQ confirms the split and flags it as unstable: *"the 'gain points' meaning of score is underdeveloped in the current rules, so in the future we are likely to revisit."* Store a `rules_version` on every combo verdict.

Corrected outcome taxonomy:

| MTG | Riftbound |
|---|---|
| Infinite mana | Infinite Energy + Power — **turn-scoped** (Rune Pool wipes at Main Phase start and turn end, rule 167) and **domain-typed** |
| Infinite damage → win | ❌ no equivalent |
| Infinite mill → win | ⚠️ **inverted** — decking yourself gives the *opponent* a point (Burn Out, 431.2.c). Forcing *their* Burn Out loop **is** a kill |
| Infinite untap | **Infinite Ready** — strongest primitive, since units enter exhausted (143.4) |
| Color identity | **Domain Identity**, subset semantics (103.1.b) |
| Storm count | `Legion` keyword |

Other load-bearing rules:
- **Domain Identity** is dictated by the Champion Legend. `card.domains ⊆ legend.domains` — subset, not intersection.
- **Three near-miss failure modes**, not one: (a) domain not a subset, (b) Signature card whose Champion Tag ≠ your Legend's, (c) >3 Signature cards. LOOPLINE's single color filter covers only (a).
- Deck: 40 cards constructed, ≤3 copies, 12-card Rune Deck, 3 Battlefields (**only 1 used, randomly chosen in Duel** — battlefield-dependent combos need a consistency penalty).
- `is_banned` **must be format-scoped and entity-typed**. Bans exist on cards, battlefields *and* legends; the 2v2 list differs from 1v1 by one Legend. Current list (Rules Hub, retrieved 2026-09-02; the Stealthy Pursuer / Arena's Greatest / Aspirant's Climb bans took effect 2026-07-24): **cards** Called Shot, Draven Vanquisher, Fight or Flight, Scrapheap, Stealthy Pursuer; **battlefields** The Arena's Greatest, Aspirant's Climb, The Dreaming Tree, Obelisk of Power, Reaver's Row; **2v2** additionally restricts the Legend Master Yi, Wuju Bladesman (gallery name "Wuju Bladesman - Starter"). Source of truth in the repo: `data/legality.src.json` → `data/legality.json`.
- 25 official keywords (rules 805–829).

### Deck ingestion ✅
**Solved, offline, licence-clean.** `@piltoverarchive/riftbound-deck-codes` v1.4.0, **Apache-2.0, zero dependencies**. Verified by round-trip encode/decode and by decoding a real published 56-card deck.

```
getDeckFromCode(code) -> { mainDeck: [{cardCode, count}], sideboard: [...], chosenChampion? }
SET_MAP = {OGN:0, OGS:1, ARC:2, SFD:3, UNL:4, VEN:5, RAD:6}
```

There is **no official Riot deck format** — this community codec (adapted from LoRDeckCodes) is the ecosystem's real interchange format, consumed by Piltover Archive, Hextech, riftatlas, tcg-arena.

Ingestion priority:
1. **Deck code** — offline, no network, no ToS surface. Primary.
2. **Plaintext paste** — accept all observed dialects: `N Name`, `Nx Name`, `Name xN`, `N Name (OGN-001)`, TTS `OGN-265-1` tokens. Headers: `Legend / Champion / MainDeck / Battlefields / Runes / Sideboard` plus aliases (`main`, `mainboard`, `rune pool`) and `~~Legend~~` strikethrough form.
3. **Piltover Archive deck page** — `GET /decks/view/<uuid>` with `RSC: 1` header returns 190 KB vs 460 KB HTML. Deck pages are robots-*allowed*; `/api/` is *disallowed*, so use the page. Missing decks return **HTTP 200**, detect via absence of `"deck":{`.
4. ~~riftmana.com~~ — hard Cloudflare challenge, not ingestible. Paste-only.

**Match on card codes, never names** — sources disagree (`Ashe, Focused` vs `Ashe - Focused`).

**Honesty constraint:** `api.dotgg.gg` (which backs riftbound.gg) serves `Disallow: /` to `ClaudeBot`/`GPTBot`/`CCBot` and enforces it by UA. Identify the tool truthfully. If they block it, respect the block and fall back — do not spoof a UA.

### Legal ✅ (verified against Riot's own policy page)

Riot has a **Riftbound-specific Digital Tools Policy**, stricter than the 2018 fan policy.

**Hard constraints:**
- *"Your App may only use Riftbound assets (including cards) provided by the Riot API. **No external or unofficial materials.**"* → **hotlinking `cdn.riftscribe.gg` is out.** RiftScribe's robots.txt also says `Disallow: /api/`.
- Riftbound apps need *"either a written license from us or a valid App-specific API key."* `riftbound-content-v1` exists on the dev portal.
- *"No publishing or retaining **metagame-defining data**... play rates... win rates."* → **never add meta stats.**
- *"No automated rule enforcement."* → a combo **visualizer** is approved; a combo **executor** is prohibited. Stay descriptive.

**Explicitly blessed:** *"Examples of Approved Use Cases: **Deckbuilders / Card libraries**."*

**Required disclaimer — exact wording, do not paraphrase:**
```
RiftCombo was created under Riot Games' "Legal Jibber Jabber" policy
using assets owned by Riot Games. Riot Games does not endorse or
sponsor this project.
```
(4 of 5 Riftbound fan sites get this wrong. Piltover Archive gets it right.)

**Launch posture: no ads, no donations, no legal entity, no paywall.** Moots the ads/donations conflict between Riot's two policy documents entirely.

### Combo data landscape ✅
**Nothing exists.** No structured combo DB on Piltover Archive (88,050 decks, zero combo entities), riftbound.gg, RiftScribe, Hextech, RIFT TCG Dex, or ~60 GitHub repos. **No competitor is building one.**

Precedent: Commander Spellbook bootstrapped **socially** — a Discord accumulated ~1,000 combos over 3 months, then a website over a **Google Sheet**. Today: 27,332 combos → **106,351 variants**. Open Combo Codex (Yu-Gi-Oh, the only structured non-MTG combo DB) has **27 combos** — contributor supply is the bottleneck, not schema.

**Seed lever:** riftbound.gg writes combos as set-code IDs (*"you will need OGN-212, OGN-110, UNL-165 and UNL-173"*) which resolve to names via one API call. A parseable combo corpus hiding inside prose — worth a few dozen entries, not thousands.

**Verified infinite combos (2026-09-02)** — two, both against primary sources; the walk is in `phase0-findings.md` Result 5:
- **Lux infinite energy** — Forge of the Future · Ekko, Recurrent · Shadow's Call · Sacrifice under Lady of Luminosity. Legal. Played to 19th of 640 (Tianjin Regional Open) and a later top 8 (Hartford). Kill: Retreat + Lecturing Yordle turn the energy into unlimited Power, then Renata Glasc, Mastermind scores 8 in a turn.
- **Infinite Recruits** — Stealthy Pursuer · Eye of the Herald · Renata Glasc, Industrialist under any Chaos+Order legend. **Stealthy Pursuer banned 2026-07-24**; Riot's stated reason is this combo. Stays in the DB as a dated, format-scoped legality fact.

### Validation set (for Phase 0)

| # | Combo | Cards | Evidence |
|---|---|---|---|
| 1 | Lux infinite energy | Forge of the Future · Ekko, Recurrent · Shadow's Call · Sacrifice | ✅ **2 independent origins; walked 2026-09-02, closes at +1 Energy +1 Recruit per pass** |
| 2 | Lux infinite power | Forge of the Future · Retreat · Lecturing Yordle | ⚠️ single source |
| 3 | Lux hand-strip | Ashe, Focused · Retreat + Forge engine | ⚠️ single source |
| 4 | Infinite Recruits T3 | Stealthy Pursuer · Eye of the Herald · Renata Glasc, Industrialist | ✅ **Riot primary** (ban announcement, effective 2026-07-24) — Stealthy Pursuer **banned**; needs Eye of the Herald's `effect` text, absent from RiftScribe |
| 5 | Renata double Time Warp | Renata Glasc, Mastermind · Time Warp · Ekko, Recurrent · Hidden Blade/Deathgrip | ⚠️ single source |
| 6 | Kai'Sa "Garbage" infinite | Detonate · Garbage Grabber · Malzahar, Fanatic · Upstage Comedy · Ekko, Recurrent | ⚠️ single source (deck author) |
| 9 | Eye of the Herald / Facebreaker package | Eye of the Herald · Facebreaker · Fiora, Worthy · Kai'Sa, Survivor | ✅ recurring across 3 unrelated decks |

Combos 7 (Jhinpendium) and 8 (Malzahar/Fiora/Garen) are **NOT VERIFIED** — every source 403s. Treat as rumor.

---

## 2. The hard problem

**Mining combos from card text at acceptable precision.**

Naive approach — "here are 935 cards, find combos" — produces plausible-sounding garbage. I proved this on myself: I derived a "Malzahar/Fiora/Garen infinite runes" loop from card text in seconds, and it was **wrong**. Malzahar has 3 Might, Garen Commander gives +1 → 4, but Mighty requires **5+**, so Fiora never triggers. I also ignored that each Malzahar activation requires killing a friendly unit or gear — fodder every iteration.

That failure is the design spec for the pipeline. Note also what it reveals: **the rules that make combos work are not in the card text.** Floating power at Reaction speed mid-cost-payment (429.3), threshold re-triggering on `becomes Mighty` (709), zone-change resetting object identity (124) — all live in a 114,472-token rulebook. Card text alone is insufficient.

### Approach (revised after Phase 0): read, propose, refute, review

The original design was *EXTRACT → SEARCH → VERIFY → REFUTE*, with a deterministic resource-flow
search doing the combinatorics. Phase 0 killed the SEARCH step (`phase0-findings.md` Result 3):
19,750 candidates, zero real combos, 23 clustered around a known-broken line. Real Riftbound
combos are 4–5 cards deep with **game-state preconditions** — an empty Main Deck so that
"recycle to the bottom" means "draw it next"; an equipped unit being *moved* rather than played;
tokens entering ready — that no static producer/consumer model expresses. The whole pool fits in
one context window, so the pipeline reads instead of searching:

```
1. PROPOSE  (LLM; full corpus + rules primer; several agents in parallel, each with a different lens)
   Every agent first walks the two verified infinites (Lux energy, Recruits) to calibrate, then
   states which game states it is allowed to assume (empty Main Deck, empty Rune Deck, tokens
   entering ready, equipped movers, held battlefield through a Beginning Phase).
   Output per candidate: quoted card text, rule numbers, per-iteration cost/gain arithmetic,
   outcome class (INFINITE / BURST / ALT_WIN), domain identity, preconditions.

2. REFUTE   (LLM, adversarial, independent; default verdict REFUTED)
   REFUTE_SPEC checklist. Must attack: per-turn limiters, domain identity (every Legend is exactly
   two domains), Rune Deck cap 12, enters-exhausted, Might thresholds, fodder supply, zone of return
   (trash vs bottom-of-deck vs banish), Rune Pool emptying, Burn Out as an anti-win.
   Must NOT refute on "bottom of deck is unreachable" when the deck can be empty, nor on
   "Equipment has no text" — read the `effect` field.

3. REVIEW   (human)
   Survivors -> queue -> approve/reject -> DB. Nothing publishes unverified. Every entry carries
   its outcome class, rules_version and format-scoped legality.
```

The Phase 0 structured extraction (921/921 cards, 0 schema violations) is kept for **indexing
and filtering**, not discovery. No structural "impossibility" claim is accepted from an agent
until it has been checked against the validation set — the first hunt's "no infinites exist"
was exactly such a claim, and it was wrong.

**Recommended sourcing strategy — auto-mine + human review, seeded.** The evidence supports this over the alternatives: pure curation caps out at ~27 combos (Open Combo Codex); community submission has a cold-start problem Commander Spellbook only solved with a 3-month Discord and an existing player base; pure live auto-detection is non-deterministic and can't be quality-gated. Auto-mining is the only path past the cold start without an audience, *provided* Phase 0 proves precision.

---

## 3. Architecture

Single Cloudflare Worker: static assets + `/api/*`. Matches LOOPLINE's proven shape (`cf-cache-status: HIT` on assets, `no-store` on API).

**Decision 2026-09-02 — the matcher runs in the browser.** The whole database is ~1k cards and
under 100 combos: a slimmed `cards.json` + `combos.json` + `legality.json` bundle is a few hundred
KB, the deck codec is a dependency-free library, and `src/matcher.ts` is pure TypeScript. Shipping
them as static assets removes the 10 ms CPU concern, the API rate-limit surface and any server
state for v1. The only server endpoint is `/api/deck-url`, a proxy for Piltover Archive deck pages
(browser CORS forbids fetching them directly), with an allowlist and an honest User-Agent. D1
enters only with the review queue.

### Data model — adapted from Commander Spellbook

The one idea worth copying above all others: **separate an authored `Combo` from a generated `Variant`.**

```
Feature       controlled outcome vocabulary, with a status enum
              STANDALONE  -> show the user      (Infinite Energy, Win the game)
              HELPER      -> graph plumbing     (Infinite Ready, Untapped engine)
              HIDDEN      -> generator internals
              + uncountable:bool  (prunes the generation search space)
              Keep to ~20 entries, two-level (category + free-text detail).
              CSB's 1,310 features forced LOOPLINE to build a second 17-bucket
              taxonomy on top. Don't repeat that.

Combo         AUTHORED. uses[Card] / needs[Feature] / produces[Feature] / removes[Feature]
              steps, easy_prerequisites, notable_prerequisites, status, rules_version
              Because A.produces feeds B.needs, combos compose into a DAG.

Variant       GENERATED. Flatten each reachable DAG path into concrete cards.
              This is what the matcher queries. O(n) authored -> O(n²) coverage.

Ingredient    quantity, zone_locations[BASE|BATTLEFIELD|HAND|TRASH|CHAMPION|RUNE],
              per-zone state (exhausted/ready, buffs), must_be_chosen_champion
              Riftbound has real zones and states — model starting state, not membership.

Legality      format-scoped, entity-typed (card|battlefield|legend), date-stamped.
              NOT a boolean.
```

Riftbound-specific feature vocabulary (replaces MTG's mana/damage/mill):
```
CLASS:    INFINITE (unbounded engine) · BURST (bounded points that clear 8 in one scoring event)
          · ALT_WIN (assemble-and-win)
ENGINE:   Infinite Energy · Infinite Power[domain] · Infinite Ready · Infinite Recruits
          Infinite Draw(⚠liability) · Infinite XP · Additional Turns · Unbounded Might
TERMINAL: Ability Points · Conquer/Hold Points · Opponent Burn Out · Effect Win
```
A loop with an engine but no terminal is a **"combo without a kill"** — common here by design, since the game caps natural point sources. Surface it as its own category. `BURST` and `ALT_WIN` exist because Phase 0 showed most of Riftbound's combo space is *multiplicative* (Ahri × Blue Sentinel, Tryndamere × Red Brambleback) or *assembly* (The Grand Plaza, Gutter Palace), with only two known infinites on top. The class is displayed, never inferred: nothing is labelled `INFINITE` without a walked loop in its steps.

### Matcher

Copy CSB's six-bucket response shape, adapted to Riftbound's identity axes:

```
included                              have everything, playable now
includedByChangingLegend              have the cards, wrong Legend
almostIncluded                        N cards away, in-domain
almostIncludedByAddingDomains         needs a domain your Legend lacks
almostIncludedByChangingLegend
almostIncludedByAddingDomainsAndChangingLegend
```
Use **multisets** (a combo may need 2 copies). Near-miss in SQL, not app code: `missing = Σ max(0, required − owned)`, filter `<= N`, parameterized so "1 away" and "2 away" share a code path.

### Frontend

**No graph library.** LOOPLINE's 139 KB hand-written `app.js` has **zero** matches for d3/cytoscape/vis-network/sigma/reactflow/echarts/dagre and **zero** imports, and produces the best-looking combo graph in this space. Verified by grep.

- Three static SVG `<g>` layers (edge / node / highlight), `insertAdjacentHTML`
- **Closed-form trig, not force simulation** — deterministic, no settling animation, reproducible PNG export
- Two orthogonal toggles, not four buttons: `view` (network | suggestions) × `layout` (circular | layered)
- Layered = Cards → Combo routes → Outcomes; sort the card lane by **mean-y of connected route nodes** for near-free crossing reduction
- Mobile: transpose coordinates (`(x,y) => vertical ? {x:y,y:x} : {x,y}`), not a second layout
- Tag each card with its **role** in the combo (enabler / payoff / resource / ready) and sort by it

Per house design rules: no emoji in UI (LOOPLINE uses them — skip that), one consistent icon set, one accent color, hierarchy through typography.

### Hosting

**Cloudflare Workers + D1.** Only option with a genuine always-on free tier and no non-commercial clause (Vercel Hobby forbids ads *and* donations; Render free has ~1-minute cold starts and 30-day Postgres expiry).

Budget the **$5/mo paid plan early** — free tier is 10 ms CPU (tight for graph building over a 40-card deck) and **1,000 KV writes/day**. Use D1 (100k writes/day) for cache, not KV.

Copy LOOPLINE's security posture wholesale: `connect-src 'self'` (browser never calls upstream), strict CSP, COOP, `X-Frame-Options: DENY`, nosniff, Permissions-Policy.

---

## 4. Phases

Each phase has a verify gate. Do not proceed past a failed gate.

### Phase 0 — Mining validation spike ← **de-risks the entire project**
**Status: DONE (2026-08-30 → 2026-09-02).** Outcome in `phase0-findings.md`: the search step
failed and was dropped; reading works (48 proposed → 7 survived, ~15%); two infinites verified
against primary sources; the data source changed to Riot's gallery API. The third gate bullet
(precision ≥ 50% on 30 candidates) is superseded by the re-hunt's precision on *novel* candidates.

Build nothing permanent. Answer one question: *can we mine combos at acceptable precision?*

1. Distill a **rules primer** from the 114k-token Core Rules → ~8k tokens of loop-relevant rules (timing states, resource model, scoring, Burn Out, keywords, per-turn limiters)
2. Encode the validation set above as exact card codes
3. Implement EXTRACT → SEARCH → VERIFY → REFUTE on the 316-card engine subset
4. Measure

**Gate:**
- ✅ Rediscovers Lux combo #1 (the 2-source-confirmed one)
- ✅ Correctly **refutes** my broken Malzahar/Fiora/Garen loop
- ✅ Precision ≥ 50% on a hand-audited sample of 30 candidates
- ❌ If precision is unsalvageable → **pivot to curation-first**, ship a smaller hand-built DB, keep the same schema and UI

### Phase 1 — Data foundation
- ✅ Card corpus pipeline: `scripts/build-cards.mjs` (Riot gallery API, 6 requests) + `data/errata.json` overlay + `data/legality.src.json` → `data/cards.json`, `data/legality.json`; `scripts/build-corpus.mjs` → `data/corpus_flat.txt`. Built 2026-09-02. Re-run on set release, errata or ban update.
- Schema: features / combos / variants / ingredients / legality. At this scale (~1k cards, <100 combos) the combo DB is a **static JSON bundle** shipped with the Worker; D1 is only for the review queue and submissions.
- Variant generator (flatten the feature DAG)
- Seed: the two verified infinites (Lux energy → power → Renata kill; Recruits, banned) + the hunt's re-verified survivors (Ahri × Blue Sentinel, Tryndamere × Red Brambleback, Grand Plaza + Recruit the Vanguard, Gutter Palace, Death from Below) + riftbound.gg's ID-based combo prose
- ✅ Legality table from Riot's Rules Hub (format-scoped, entity-typed, dated)

**Gate:** query "which combos are in this 40-card deck" returns correct results against 3 hand-checked decks.

### Phase 2 — Ingestion + matcher
- Deck code decode (offline), plaintext paste (all dialects), Piltover Archive RSC
- Six-bucket matcher, multiset, three near-miss axes
- `/api/combos` + `/api/suggestions`, Worker-side only

**Gate:** all three ingestion paths produce identical card lists for the same deck.

### Phase 3 — Visualization
- Hand-rolled SVG, circular + layered, pan/zoom, role-sorted lanes
- Outcome nodes = Riftbound's point taxonomy, not MTG's
- Theme-aware, responsive, PNG export

**Gate:** renders the Lux combo deck legibly at mobile and desktop widths.

### Phase 4 — Launch
- Section 6 disclaimer, verbatim
- Rate limiting, allowlist-not-blocklist for any URL fetching, SSRF guards, honest User-Agent
- Deploy to Workers
- **Apply for the Riot API key** (see open decision below)

---

## 5. Open decisions

**D1 — Riot API key: apply first, or build now and swap?** ⚠️ *Needs a call before Phase 4, not before Phase 0.*

Policy says assets must come from the Riot API. Unknown: what `riftbound-content-v1` actually returns, whether it includes images, and the approval timeline — R4 could not authenticate against it.

| Option | Trade |
|---|---|
| **A. Apply now, build in parallel, swap before launch** (recommended) | Phases 0–3 are unblocked (they use card *text*, held locally). Only launch depends on the answer. |
| B. Apply and wait | Blocks everything on an unknown timeline for an unknown payload |
| C. Launch on RiftScribe/gallery data | Stated policy violation on the one requirement that's cheap to satisfy |

Phases 0–3 need no decision here — proceed, and the answer arrives before it's load-bearing.

**D2 — Card images.** `cdn.riftscribe.gg` is out (policy + their robots.txt). Riot's own `cmsassets.rgpub.io` serves official card images, responds 200 with no hotlink protection, and supports resize params — closer to compliant, still not "the Riot API." The gallery content API now returns each card's `cmsassets.rgpub.io` image URL alongside its text, so image and text come from the same Riot-operated source (`data/cards.json` → `image`). Resolve alongside D1.

**D3 — Scope of v1.** Full LOOPLINE parity (network + suggestions + circular + layered + PNG export) or ship the matcher with one layout first? Recommend: one layout (layered/Sankey — it's the more legible of the two) through Phase 3, add circular after real decks have been run through it.

---

## 6. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Mining precision too low | **Kills the concept** | Phase 0 gate, before anything else is built |
| Rules volatility — Riot flagged "gain points" as likely to be revised | High | `rules_version` on every combo; re-validate against the Rules Hub PDF, **not** the stale article-page PDF |
| Fast bans (Stealthy Pursuer: discovery → ban in under a month) | Medium | Legality as a first-class dated, format-scoped field from day one |
| Riot API key denied or unusable | Medium | D1 option A keeps it off the critical path until launch |
| Card-text drift — errata lives in announcements, not in the gallery API; mirrors (RiftScribe) miss Equipment `effect` text and all bans | High (it hid a Riot-banned combo from the first hunt) | Riot API as the only text source; errata as a dated overlay whose build fails on mismatch; legality only from the Rules Hub; committed snapshots in `data/` |
| An agent's structural verdict ("no X exists") adopted unverified | High (happened once) | Walk the validation set before accepting any impossibility claim; pessimistic verdicts get checked at the primary source |
| Combo corpus is genuinely small | Medium | Riftbound is 10 months old with maybe a dozen well-known loops. Auto-mining is what makes the tool worth using vs. a wiki page. This *is* the differentiator. |
| Small audience — no community to crowdsource from | Low | Auto-mine-first inverts CSB's order deliberately: ship value before an audience exists, rather than needing one first |

---

## Links
- Reference: [LOOPLINE](https://loopline.robiichi.workers.dev/) · [source tweet](https://x.com/robiichi/status/2092916968634700248)
- Schema precedent: [Commander Spellbook backend](https://github.com/SpaceCowMedia/commander-spellbook-backend)
- Deck codec: [RiftboundDeckCodes](https://github.com/Piltover-Archive/RiftboundDeckCodes) (Apache-2.0)
- Card API: [RiftScribe](https://riftscribe.gg/api-docs)
- Rules: [Riftbound Rules Hub](https://playriftbound.com/en-us/rules-hub/) — use this, not the article page
- Policy: [Riot Riftbound Digital Tools Policy](https://developer.riotgames.com/docs/riftbound) · [Legal Jibber Jabber](https://www.riotgames.com/en/legal)
