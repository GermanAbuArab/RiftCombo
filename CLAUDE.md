# RiftCombo — project rules

- Read `docs/plan.md` then `docs/phase0-findings.md` before changing architecture; both are current as of 2026-09-02.
- Card text comes ONLY from Riot's gallery content API via `scripts/build-cards.mjs`; never from RiftScribe or other mirrors (they drop Equipment `effect` text and have no ban data).
- Errata is a dated overlay in `data/errata.json`; the build must fail if a find-string stops matching exactly once.
- Legality is hand-transcribed from Riot's Rules Hub into `data/legality.src.json` (names) and resolved to codes at build time; it is format-scoped and entity-typed, never a boolean on the card.
- Match cards on base codes (`OGN-212`), never on names. Names are only for parsing pasted decklists.
- `data/combos.json` is AUTHORED. `status: verified` requires a hand-walked loop against card text + Core Rules with sources; agent output enters as `candidate` until a human reviews it.
- Every combo carries a class: INFINITE (walked, unbounded), BURST (one scoring event reaches 8), ALT_WIN, or ENGINE. Never label INFINITE without a "repeat" step.
- Do not accept structural verdicts from agents ("no X exists in the pool") without walking the validation set first; the first hunt's "no infinite combos" was wrong.
- Riftbound is not MTG: no life total, win at 8 points, infinite draw is a liability (Burn Out), units enter exhausted, Rune Pool empties each turn, Domain Identity is subset-of-legend and every Legend has exactly two domains.
- Legal posture: no ads, no donations, no meta stats (play/win rates), no combo *execution*, exact Riot disclaimer text from `docs/plan.md` §1.
- UI: no emoji, one accent colour, no blue/purple gradients, no decorative shadows, hand-rolled SVG graph (no graph library).
- Run `npm test` and `npm run typecheck` before claiming anything works. Rebuild data with `npm run build:data`.
