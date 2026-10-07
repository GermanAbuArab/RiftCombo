# RiftCombo — project rules

## Orientation
- **Everything in English** (user order, 2026-09-06): replies, issues, commit messages, walk documents, session prompts and reports. Earlier prompts said "contestale en español"; that is reversed.
- Read `docs/status.md` first — it is the measured state of the project, with the command behind every number and an index of the hand walks. `docs/plan.md` and `docs/phase0-findings.md` are the 2026-09-02 plan and spike, kept as history: read them for the reasoning, not for the current state, and mind their inline `[2026-09-06: …]` notes.
- `docs/design/research-2026-09-02.md` holds the design research (LOOPLINE's CSS, Riftbound's palette, graph-UI conventions). Read it before touching the visual layer.
- Repo: `github.com/GermanAbuArab/RiftCombo`, **public** since the de-clone (issues #1–#3) was done — `gh repo view --json visibility` says `PUBLIC`, so the `docs/phase0/...` blob links `sourceHref` builds do resolve for a reader. Account `GermanAbuArab` — run `gh auth switch --user GermanAbuArab` before any push or PR.

- **Rules notes live in `docs/rules-notes/`, read on demand (#274).** This file holds only the rules every turn obeys; the dated findings, measurements and fleet history moved there verbatim. Grep them by rule number or card code instead of reading them whole:
  - `docs/rules-notes/workflow.md` — before committing, pushing, spawning or retiring tabs, or touching another lane's `.scratch` files.
  - `docs/rules-notes/data.md` — before touching `scripts/build-cards.mjs`, `data/errata.json`, legality, code/name resolution or deck construction.
  - `docs/rules-notes/combos.md` — before authoring, promoting or auditing any entry in `data/combos.json` (classes, authoring traps, BURST arithmetic, loop budgets).
  - `docs/rules-notes/rules-findings.md` and `docs/rules-notes/rules-pairs.md` — before walking a line, citing a Core/Tournament Rules paragraph, or filing a rules reading (R-numbers).
  - `docs/rules-notes/method.md` — before writing a probe, census, checker, test, script or lane brief, and before promoting to `master`.
  - `docs/rules-notes/synergies.md` — before editing `data/synergies.json` or a synergy predicate.
  - Scripts that used to read this file as a haystack (`scripts/claude-md-gap.mjs`, `scripts/uncited-examples.mjs`, `scripts/check-walk-quotes.mjs`) read `CLAUDE.md` plus every file in `docs/rules-notes/` through `scripts/rules-notes.mjs`. A rule promoted "into CLAUDE.md" now goes into the matching notes file.

## Workflow — GitHub issues are the backlog
- **The owner does nothing; `needs-owner` is retired for this project (owner rule 2026-09-25, scope soluciones-panel, panorama, mamparas-web, aures and riftcombo, #237).** Tokens, env vars, production migrations and dashboard reads are done by the orchestrator or an agent it delegates to (playwright MCP on the logged-in profile, the CLIs); only a password, 2FA or captcha screen is handed to him, in the same window. Do not file items as `needs-owner`.
- Every task the user names becomes a GitHub issue. Create it immediately with `gh issue create`, don't batch them up.
- Labels: `de-clone`, `ui`, `bug`, `data`, `legal`, `infra`. Reuse them; only add a new label when none fits.
- An issue body states what is wrong, the measured evidence, the files involved, and its dependencies on other issues. No vague one-liners.
- Close issues from commit messages (`Closes #4`) so the backlog does not drift from the code. Qualifying it does NOT scope it: `Closes #23 for web/main.ts` still closed all of #23 on push, and its second half had to be reopened by hand. When a commit does part of an issue, write `Refs #23`.
- `tasks/todo.md` is scratch for the current session only. GitHub issues are the durable backlog.
- **The orchestrator never stops**: when a task is done, pick the next one (open issues, or measure something and open an issue). An offer to continue is a stop. Independent units of work are separate tabs with disjoint paths; contended files (`CLAUDE.md`, `data/combos.json`, `data/synergies.json`) stay with one owner and other lanes stage. Details: `docs/rules-notes/workflow.md`.
- **CLOSE TABS WHEN THEY ARE NOT NEEDED (user rule, 2026-09-13).** A finished or idle tab is archived, not left on the shelf: `maestro archive <id> --force` (there is no `maestro close`; `maestro unarchive <id>` brings one back). Archive it once its work is committed and its findings are in a walk document or an issue - those are the durable records, and a tab id stops meaning anything the moment the session behind it is spent. 126 archived RiftCombo tabs had accumulated by 2026-09-13 and four more were sitting stopped; the shelf is not a log.
- **Commit with `git commit --only <paths>`, never from the shared index**; a new file needs `git add -N <path>` first. Never stash or reset someone else's changes. A lane's `.scratch-*` directory and scripts belong to their author: never run them yourself.
- **A failed commit is usually `.git/index.lock`: retry, never delete the lock.** Verify a push with `git merge-base --is-ancestor <YOUR OWN SHA> origin/<branch>`, never with the push's message or `HEAD`. A red suite in a file you do not own on a shared tree is re-run at a committed sha in a throwaway worktree before anyone acts.

## Data
- Card text comes ONLY from Riot's gallery API via `scripts/build-cards.mjs`. Errata is a dated overlay in `data/errata.json` and the build fails if a find-string stops matching. Legality is hand-transcribed into `data/legality.src.json`, format-scoped. Match on base codes, never names. Card `type` is an ARRAY; Equipment is `gear` + the `Equipment` tag. Base codes are not all `SET-NNN`; normalise case-insensitively. Riot's text anomalies go to `docs/data-anomalies.md`, never into errata. Full notes: `docs/rules-notes/data.md`.

## Combos
- `data/combos.json` is AUTHORED: `status: verified` needs a hand-walked loop against card text + Core Rules with sources; agent output enters as `candidate`. Classes: INFINITE, BURST, CHAIN, ALT_WIN, ENGINE (typed in `src/types.ts`, ranked in `src/combos.ts`, sorted in `web/graph.ts` and `web/main.ts` — update all together). A BURST must reach 8 with its declared quantities. Before authoring or auditing an entry, read `docs/rules-notes/combos.md` and grep `docs/rules-notes/rules-findings.md` / `rules-pairs.md` for every rule and card the entry uses.
- Before filing a new numbered rules reading, try a different legal ordering of the same cards, and grep the rules for the term (with `-i`, no quotes). Rulings R1–R33 are on issue #11; a ruling never promotes an entry by itself.
- Quote rules text by pasting it, untruncated; state the predicate with any count and name the members; an absence needs a second instrument. Method lessons: `docs/rules-notes/method.md`.

## Synergies (#22)
- `data/synergies.json` is a SEPARATE file and must stay separate: a verified rule plus text-matched instances, never presented as a combo. Print and read a rule's whole match list before shipping it (`npm run synergies`). Details: `docs/rules-notes/synergies.md`.

## Web gotchas — three from the 2026-09-07 deck-card work (#177, #178)
- **The shared text-field style is scoped to `input[type=url], textarea, select`, so a bare text input renders WHITE.** Extend it with a CLASS (`.field-input`), never with `input[type=text]`: an attribute selector out-specifies `.detail-name` and would silently change the deckbuilder's own name field.
- **`.empty` is taken.** `web/styles.css:178` makes it a page-wide `position: absolute; inset: 0` empty state, so a LOCAL "nothing here" modifier needs its own name (`noart`, after the existing `.pool-noart`). Using `.empty` threw the deck-card thumbnail to the top of the viewport and read as a layout bug rather than a class collision.
- **Riot's card images are FULL-CARD scans (744x1039, illustration down to ~64%, name plate below that), and the CDN honours Sanity's `rect=x,y,w,h` in SOURCE pixels**, with the source size in the filename. That is how to crop to the illustration without coupling the crop to any layout dimension. `object-fit: cover` alone cannot do it: it trims only the axis the box has proportionally less of, so any box narrower than 1.38:1 crops the SIDES and shows the whole card - which is why a 58px full-height strip displayed the card's own printed title, and why the fix is a CDN rect and not a guessed `object-position`.
- **Never put backticks or `[ ]` inside a `maestro send` argument.** The receiving side is an interactive zsh: it evaluates the backticks and globs the brackets, and pieces of the message vanish silently. Write the text to a file and send `"$(cat file)"`.

## Legal posture
- No ads, no donations, no meta stats (play/win rates), no combo *execution*, exact Riot disclaimer text from `docs/plan.md` §1.
- **Do not copy LOOPLINE.** It is the reference for *what a combo route map does*, never for how it looks or what it calls things. Copying its colour tokens, wordmark lockup, nav labels, headings or column labels is out of bounds — the 2026-09-02 build did exactly that and had to be reworked (issues #1–#3).
- Before shipping any UI string, check it is not lifted verbatim from the reference.

## UI — visual identity
- Palette (from playriftbound.com, not from LOOPLINE), named as `web/styles.css` names it, which is the only place these numbers live: bg `#0f1a1e`, text `#f9eedc`, muted `#8fa7b3`, faint `#8199a4`, accent `#EF7D00`. The panels are THREE tiers and the lines TWO — `--panel` `#16242b` (cards and rows on the page), `--panel-2` `#1e3043` (the step above it: a checked segment, a filled chip, a pip), `--panel-3` `#293a4c` (defined, drawn nowhere today), `--line` `#24404c` (the ordinary border), `--line-2` `#336073` (the one that has to be seen). Until 2026-09-06 this line named only two panels and one line and used the old names, so "the panel colour" read as `#1E3043` when the code means `#16242b` (#131). Contrast is measured from the tokens in `test/a11y.test.ts`, never from here.
- One type family: Inter. Hierarchy comes from size and weight, never from a display face. Cinzel (the Trajan analog) was tried on 2026-09-03 and rejected by the user as poster-like and illegible at diagram sizes — do not reintroduce a serif or display face.
- Corners are rounded: containers 10px, controls 6px, diagram nodes 9–10px. Sharp 2–3px corners were tried and rejected as "too square". The diamond motif lives on the brand mark only; status dots and swatches are circles.
- Battlefields are printed landscape (`orientation: "landscape"` in cards.json, 66 printings). Any card rendering must honour that or the art gets cropped and the text stands on end.
- Domain colours are reserved and must not be reused for anything else: Fury `#ce212d`, Calm `#15ac72`, Mind `#22799c`, Body `#e4720c`, Chaos `#6c4993`, Order `#d0ab01`.
- One accent. Outcome classes read through text and weight, not through a categorical rainbow.
- **The grey scale is measured, not chosen: `--muted` `#8fa7b3` and `--faint` `#8199a4` both clear WCAG AA (4.5:1) on `--bg`, `--panel` and `--panel-2`, and a new tint has to as well** (#81, 2026-09-06). `--faint` was `#6a8794` and measured 4.17:1 on `--panel` and 3.53:1 on `--panel-2` — the tray chip's class line, the "What to add" class tag, the drawer's card sub-line, the import note in My decks. The fix was the same hue and saturation with the lightness raised 49.8% → 57.5%, the first step that passes all three; nothing on `--panel-3` is `--faint`, which is why AA is not asked of it. `test/a11y.test.ts` computes the ratios from the tokens in `web/styles.css` rather than repeating numbers, so it fails the moment a token moves. Same file pins the one focus ring — `:focus-visible { outline: 2px solid var(--accent) }`, since Chrome's default is a light blue that appears nowhere else here — and allows `outline: none` only where another element draws the focus (the segmented control's label, the SVG node's frame).
- No emoji, no blue/purple gradients, no decorative shadows, no glassmorphism.
- Hand-rolled SVG graph — no graph library.
- The **What to add** panel (#18, 2026-09-04) lives in the deck panel under the status card, not as a third view segment and not as a separate page — the user chose that placement over both. Its logic is `src/plan.ts` (`planDeck`), kept out of `web/` so it has tests. Three rules the user set and that must not be quietly reversed: it ranks by **copies to add**, with the combo class only breaking a tie; it shows the cheapest route **whatever it costs** — a six-card route is still displayed, because the count itself is the honest signal and hiding it hides a real answer; and it never suggests a card outside the legend's two domains (Domain Identity 103.1.b), which `test/plan.test.ts` pins against the mono-Fury fixture. It also drops any line whose ingredients are banned in the format being matched, so the panel never recommends buying an illegal card even when the matcher correctly reports the hit.
- **The editor at `#/decks/<id>` is the deckbuilder (#101, 2026-09-06), not a textarea.** Two fixed columns (pool with search, domain chips, zone, type/set/cost/sort; deck in text rows per zone with −/+, Runes Auto, a cost curve and Construction as a one-line-per-rule checklist), `Pool | Deck` tabs under 900px. The arithmetic (caps, auto-runes, curve, identity filter) is `src/builder.ts` with tests; `web/builder.ts` is the DOM; paste/deck code/Piltover URL import lives in a dialog and still goes through `loadDeck`. A saved deck is still `text` + `name` + `format`, so nothing in Supabase changed. The spec the user approved is `docs/superpowers/specs/2026-09-06-deckbuilder-design.md`; Stats, sample hand and playtest are out of scope by decision. The sideboard an imported list carries is drawn read-only.
- The **Banned and restricted** panel (#23, 2026-09-04) is the first thing in the deck panel, above the status card, because a list brought to a tournament wants that before any combo. `deckRestrictions(deck, cards, format)` in `src/deck.ts` takes the format rather than storing a flag on the parse, so the panel re-reads on the format toggle. `banned` and `restricted` are NOT the same thing and must not render the same: restricted is a cap, not an illegal card, and `OGS-019` is restricted in 2v2 only.
- The panel answers only what is computable. The narrative half of a hunt entry ("Svellsongur on Hwei fires twice per move") came from an agent reading card text and is NOT derivable from `combos.json`; "Already in this list" therefore means catalogued lines the deck completes plus catalogued pieces it holds, and nothing is invented to fill that section.

## Web gotchas
- CSP forbids inline `style=`: colour SVG through attributes, and HTML through CSSOM (`el.style.x = …`).
- `wrangler.toml` needs `run_worker_first = true` or the security headers never apply to static files.
- `[hidden]` needs `display:none !important` because `.empty` sets `display:grid`.
- Playwright MCP can only write screenshots into `.playwright-mcp/` (gitignored).
- **Every card field that `src/` reads at match time or in `checkBuild` MUST be listed in `scripts/web-card-fields.mjs`**, or it reaches the browser as `undefined` while every test passes (the tests read `data/cards.json`, the bundle reads the trimmed payload). It happened twice: the Mech tags (#27) and `signature` (#103, caught by rc-builder on the live site: 103.2.d said "No Signature cards" with four in the deck). `test/web-payload.test.ts` pins the list now; add the field there too.
- **Every card field that `src/` reads at match time or in `checkBuild` MUST be listed in `scripts/web-card-fields.mjs`**, or it reaches the browser as `undefined` while every test passes (tests read `data/cards.json`, the bundle reads the trimmed payload). It happened twice: the Mech tags (#27) and `signature` (#103, caught by rc-builder on the live site, where 103.2.d said "No Signature cards" with four in the deck). `test/web-payload.test.ts` pins the list now; add any new field there too.

## Accounts (#31)
- **The site lives at `https://riftcombo.app`** (bought through Vercel on 2026-09-05, #42; renewal US$15/yr,
  Vercel nameservers). `www.riftcombo.app` and `riftcombo.vercel.app` answer 308 to the apex, and that
  redirect is a **project-domain setting** (`PATCH /v9/projects/<id>/domains/<host>` with
  `{"redirect":"riftcombo.app","redirectStatusCode":308}`), not a `vercel.json` rule: a host-matched
  `redirects` entry in `vercel.json` was tried first on 2026-09-05 and never matched on a Git deploy.
  The old host stays in the Supabase redirect allow-list; every link, `site_url` and doc names `.app`.
- The hosted Supabase project is `bpbwsimgiyxzaorunqeo` in `us-east-1`, the region iad deploys to.
  Its **anon key is public by design** and rides in `public/app.js`; what keeps one player's rows
  away from another is RLS, proved by `node scripts/check-rls.mjs` (14 checks, two real users,
  run it **against the hosted project**, not only a local stack). The `service_role` key and the
  database password live in `.env.local` and reach nothing else — `test/headers.test.ts` fails if
  either name appears anywhere under `web/`.
- **`supabase/config.toml` is the source of truth for Auth, and `supabase config push` applies it.**
  Site URL, the redirect allow-list and the Google provider are all in there, with the client id and
  secret read as `env(...)`. Changing them in the dashboard by hand puts the repo and the project out
  of step, and the next `config push` silently reverts it.
- **`vercel.json` is generated, never hand-edited.** `SUPABASE_URL=… node scripts/build-headers.mjs`
  writes it and the result is committed, because Vercel reads it before the build command runs. The
  same variable feeds the bundle through esbuild's `define`, so the origin is set in one place.
- Sign-in is a **full-page redirect**, and that is load-bearing: `Cross-Origin-Opener-Policy:
  same-origin` severs a popup from the window that opened it and the flow never reports back, with
  no error printed anywhere.
- A Google OAuth client **caps at two client secrets and offers no way to delete one** — only to
  disable it. Rotating past that cap means deleting the whole client and creating a new one, which
  costs re-entering the redirect URI and updating the client id. Google keeps a deleted client
  restorable for 30 days.
- **The whole app sits behind sign-in (#39, user decision 2026-09-05, reversing #31's "anonymous stays
  identical").** `<body data-auth>` carries the state — `pending` (HTML default, shows neither side so
  nothing flashes), `out` (the entrance only), `in` (the app), `open` (a build with no `SUPABASE_URL`,
  which has no gate to open and behaves as before). `gate()` in `web/account.ts` sets it from the
  same supabase-js listener that reports the exchanged `?code=` session, and `web/styles.css` does the
  showing. The entrance carries the ONE sign-in button; the header shows only name + Sign out.
  `test/headers.test.ts` pins the single button and the pending default.
- Adding a redirect URI can take Google "5 minutes to a few hours" to apply. Do not debug it blind:
  `curl -sL "$(curl -s -o /dev/null -w '%{redirect_url}' 'https://<ref>.supabase.co/auth/v1/authorize?provider=google&redirect_to=https%3A%2F%2Friftcombo.app')"`
  answers `redirect_uri_mismatch` until it is live and the Google sign-in page after.

## Verify
- Run `npm test` and `npm run typecheck` before claiming anything works. Rebuild data with `npm run build:data`.
- **Deploy quota (2026-09-06): sessions push to `work`, the orchestrator promotes to `master`.** Vercel's Hobby cap is "Deployments Created per Day: 100", scoped to the ACCOUNT (shared with the other projects on it) over a rolling 24 h window, and a build cancelled by the Ignored Build Step still counts as created; on 2026-09-06 this repo's 130 commits spent the whole quota and blocked another project's production deploys. So every session commits as usual and runs `git push origin HEAD:work` — `work` has deployments disabled in `vercel.json` (`git.deploymentEnabled`), so it is a backup, never a build — and only the orchestrator runs `git push origin HEAD:master`, in batches, at most a handful of times a day. Never push `master` from a child session. The `*/*` and `*/**` globs in that block switch off previews only for branches with a slash, and `issue-*` switches off the implementer branches (`issue-<n>-<short>`, #277); an unslashed branch other than `work` or `issue-*` would still deploy, and `"*": false` must never be used because it also matches `master` and kills production (recoverable only from the dashboard).
- **Deploy is a push to master.** The Vercel project has been connected to `GermanAbuArab/RiftCombo`
  since 2026-09-05 (`vercel git connect`), so every push to master builds `npm run build:web` on
  Vercel from the COMMITTED tree and goes live; check it with `npx vercel ls riftcombo`. Before that,
  `npx vercel deploy --prod --yes </dev/null` uploaded the working tree, which twice shipped another
  session's uncommitted files. Keep that command only as a fallback when the Git build is broken.
- `npm run dev` serves the app on http://127.0.0.1:8787. Kill the wrangler process when the session ends.
- **Do not loop-poll the live bundle.** On 2026-09-06 repeated `curl https://riftcombo.app/app.js` (1.7 MB, from this IP, by several sessions at once) tripped Vercel's automatic mitigation: every request from this machine — curl, browser UA, headless Chromium — got `403` + `x-vercel-mitigated: challenge` ("Vercel Security Checkpoint") while `r.jina.ai/https://riftcombo.app/` from another network answered 200, and the project has no firewall config at all. So a 403 challenge from here is NOT an outage: confirm from another vantage before touching anything, check a deploy ONCE with `npx vercel ls riftcombo`, and read the live bundle at most once per deploy.

## Team
- Repo: GermanAbuArab/RiftCombo
- Implementers: 1
- Verify: npm run typecheck && npm test && npm run build:web
- Needs the owner: nothing (owner rule 2026-09-25: the orchestrator does it or delegates it; only a password, 2FA or captcha screen is handed over, in the same window)
