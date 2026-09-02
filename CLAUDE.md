# RiftCombo — project rules

## Orientation
- Read `docs/plan.md` then `docs/phase0-findings.md` before changing architecture; both are current as of 2026-09-02.
- `docs/design/research-2026-09-02.md` holds the design research (LOOPLINE's CSS, Riftbound's palette, graph-UI conventions). Read it before touching the visual layer.
- Repo: `github.com/GermanAbuArab/RiftCombo`, **private** until the de-clone (issues #1–#3) is done. Account `GermanAbuArab` — run `gh auth switch --user GermanAbuArab` before any push or PR.

## Workflow — GitHub issues are the backlog
- Every task the user names becomes a GitHub issue. Create it immediately with `gh issue create`, don't batch them up.
- Labels: `de-clone`, `ui`, `bug`, `data`, `legal`, `infra`. Reuse them; only add a new label when none fits.
- An issue body states what is wrong, the measured evidence, the files involved, and its dependencies on other issues. No vague one-liners.
- Close issues from commit messages (`Closes #4`) so the backlog does not drift from the code.
- `tasks/todo.md` is scratch for the current session only. GitHub issues are the durable backlog.

## Data
- Card text comes ONLY from Riot's gallery content API via `scripts/build-cards.mjs`; never from RiftScribe or other mirrors (they drop Equipment `effect` text and have no ban data).
- Errata is a dated overlay in `data/errata.json`; the build must fail if a find-string stops matching exactly once.
- Legality is hand-transcribed from Riot's Rules Hub into `data/legality.src.json` (names) and resolved to codes at build time; it is format-scoped and entity-typed, never a boolean on the card.
- Match cards on base codes (`OGN-212`), never on names. Names are only for parsing pasted decklists.

## Combos
- `data/combos.json` is AUTHORED. `status: verified` requires a hand-walked loop against card text + Core Rules with sources; agent output enters as `candidate` until a human reviews it.
- Every combo carries a class: INFINITE (walked, unbounded), BURST (one scoring event reaches 8), ALT_WIN, or ENGINE. Never label INFINITE without a "repeat" step.
- Do not accept structural verdicts from agents ("no X exists in the pool") without walking the validation set first; the first hunt's "no infinite combos" was wrong.
- Riftbound is not MTG: no life total, win at 8 points, infinite draw is a liability (Burn Out), units enter exhausted, Rune Pool empties each turn, Domain Identity is subset-of-legend and every Legend has exactly two domains.

## Legal posture
- No ads, no donations, no meta stats (play/win rates), no combo *execution*, exact Riot disclaimer text from `docs/plan.md` §1.
- **Do not copy LOOPLINE.** It is the reference for *what a combo route map does*, never for how it looks or what it calls things. Copying its colour tokens, wordmark lockup, nav labels, headings or column labels is out of bounds — the 2026-09-02 build did exactly that and had to be reworked (issues #1–#3).
- Before shipping any UI string, check it is not lifted verbatim from the reference.

## UI — visual identity
- Palette (from playriftbound.com, not from LOOPLINE): bg `#0f1a1e`, panel `#1E3043`, panel-alt `#293a4c`, rule `#336073`, text `#f9eedc`, muted `#8fa7b3`, accent `#EF7D00`.
- Headings in Cinzel 600 (the free analog of Riot's "Beaufort for LOL"); body in Inter / system stack. Display face for headings only, as Riot does.
- Domain colours are reserved and must not be reused for anything else: Fury `#ce212d`, Calm `#15ac72`, Mind `#22799c`, Body `#e4720c`, Chaos `#6c4993`, Order `#d0ab01`.
- One accent. Outcome classes read through text and weight, not through a categorical rainbow.
- No emoji, no blue/purple gradients, no decorative shadows, no glassmorphism.
- Hand-rolled SVG graph — no graph library.

## Web gotchas
- CSP forbids inline `style=`: colour SVG through attributes, and HTML through CSSOM (`el.style.x = …`).
- `wrangler.toml` needs `run_worker_first = true` or the security headers never apply to static files.
- `[hidden]` needs `display:none !important` because `.empty` sets `display:grid`.
- Playwright MCP can only write screenshots into `.playwright-mcp/` (gitignored).

## Verify
- Run `npm test` and `npm run typecheck` before claiming anything works. Rebuild data with `npm run build:data`.
- `npm run dev` serves the app on http://127.0.0.1:8787. Kill the wrangler process when the session ends.
