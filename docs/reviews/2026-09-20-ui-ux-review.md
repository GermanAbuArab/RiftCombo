# UI and UX review — 2026-09-20

Session rc-manager13, branch `feat/2026-09-20-rc-manager13`, run with the `gstack:design-review`
skill against the **local build only** (`SUPABASE_URL=` so the app runs in `open` mode, served from
`public/` on `127.0.0.1:8791`; never production). Driver: gstack `browse` (Playwright). Viewports
1280x720 and 375x812, plus 768 for the home. Screenshots are under `.playwright-cli/design/`
(gitignored): `first-impression`, `home-{mobile,tablet,desktop}`, `combos-lux-{desktop,fit,drawer,
radial,nearmiss,mobile}`, `decks-desktop`, `plays-{desktop,mobile}`, `play-{desktop,mobile}`,
`guide-desktop`, `sources-desktop`, `privacy-desktop`, `notfound-desktop`, and `after-00N-*` for the
fixes. The Codex outside voice was unavailable (usage limit), so the source-consistency audit is the
Claude subagent alone, tagged `[single-model]`; every one of its findings was verified in the code
before being adopted, and two of its seven were declined (below).

Classifier: **APP UI** (a sidebar deck panel, an SVG diagram, a visual deckbuilder, rendered
documents). No `DESIGN.md`; the design system is `CLAUDE.md`'s "UI — visual identity" section and
`web/styles.css`'s tokens, and the audit was calibrated against those.

## First impression (1280, Combos view, empty)

The site communicates **a tool, not a launch page**: a dark workspace, one orange accent, a deck
panel with a URL field and a paste box, and an honest empty state ("Nothing to draw yet"). I notice
the brand mark and the five nav links first, then the paste box's example list, then the
`Constructed | 2v2` toggle at the top right. Those are the three things a first-time user needs, in
that order. One word: **calm**.

Page-area test: every area names its purpose in two seconds (Your deck; Combos in this deck;
the diagram stage; results). Trunk test: PASS on every view (site id, page name via the active
nav underline, sections, options; there is no search and none is needed).

## Inferred design system (measured on the rendered page)

- **Fonts:** Inter for everything, `ui-monospace` for codes. One family, as the house rule says.
- **Colours:** eleven distinct rendered values, all from the tokens (`--bg #0f1a1e`, `--text
  #f9eedc`, `--muted #8fa7b3`, `--faint #8199a4`, `--panel/--panel-2`, `--accent #EF7D00`, the red
  `--danger-text`). No purple, no gradients.
- **Headings:** h1 22px/600, h2 17px/600; no skipped levels in any view.
- **Body:** 15px (`0.9375rem`) — under the 16px guideline, see deferred D1.
- **Radii:** 10px containers, 6px controls, 4px chips — systematic (one 9px outlier, `.pool-add`).
- **Breakpoints:** 560, 760, 900 — three, each justified in a comment, not tokenised.
- **Motion:** `prefers-reduced-motion` respected; transitions are colour and opacity only.
- **AI slop:** none of the eleven patterns. No emoji, no icon-in-circle grids, no centred hero.

## Findings and what was done

Impact is high / medium / polish. "Fixed" means committed on this branch, one commit per finding,
and re-verified in the rebuilt local site.

| # | Finding | Impact | Status |
|---|---|---|---|
| 001 | `linklike danger` was written at three delete buttons (`web/decks.ts:464,466`, `web/account.ts:100`) and defined by no CSS rule, so **"Delete for good" rendered in the same grey as "Keep it"** beside it. | high | **Fixed** `96486f2` — `.linklike.danger { color: var(--danger-text) }`, the red that clears AA on text. Verified computed colour `rgb(224,121,90)`. |
| 002 | `.size-row` used `var(--rule)`, a token that does not exist; an invalid `var()` voids the whole `border-left` declaration, so the 2px accent edge on the deck-size row never drew. | high (silent) | **Fixed** `8414469` — `--line-2`, the token every sibling left-accent row uses. Verified `2px rgb(51,96,115)`. |
| 003 | `.icon-btn.tiny` (every +/− stepper in the deckbuilder, the control drawn most often per screen) was 22x22, under WCAG 2.2 2.5.8's 24x24 floor, while `.pool-view` and `.gate-links` had already been padded past it with a comment each. | medium | **Fixed** `f23d359` — `position: relative` plus a `::before` at `inset: -3px`; drawn size unchanged, hit box measured 26x26 (−2px measured 24, the floor exactly). |
| 004 | At 375 the nav scrolled with its scrollbar hidden and **"Sources" sat at x=437 on a 375px screen** — reachable by a swipe nobody is told about. | medium | **Fixed** `0b2bc18` — inside the existing 560px block, `padding 0 8px` and a 13px label: measured `scrollWidth 347 = clientWidth 347`, Sources' right edge 361. |
| 005 | The page is dark and `color-scheme` was `normal`, so scrollbars and the native `<select>` popup ("Within N cards") arrived light. | polish | **Fixed** `fb992d4` — `html { color-scheme: dark }`. Verified. |
| 006 | The plays index printed each play's whole first paragraph as its lede: twelve of sixteen ran 5–9 lines, the page was 3,484px tall at 1280 and an unbroken scroll at 375. Titles are filed lowercase ("the order is free…"). | medium | **Fixed** `8cf941c` — `-webkit-line-clamp: 3` on the lede, `::first-letter` capitals on index titles and the page h1. Page 3,484 → 2,727px; lede 134 → 67px. |
| 007 | The diagram's zoom buttons used text glyphs `+`/`−`, which sit on the baseline and read a pixel high in a square box — the exact defect `web/builder.ts:66` documents and fixes with SVG paths for its own steppers. | polish | **Fixed** `aaf3e42` — same SVG paths inline in `web/index.html`. |
| 008 | In a build without accounts (`SUPABASE_URL` unset, the documented `open` mode) `#/decks` routed, the nav linked to it, and **the page was blank**: `initDecks` returned before rendering anything. | medium (local builds only; production always has accounts) | **Fixed** `b22d91d` — one sentence in the host saying the build has nowhere to save a list. |
| 009 | In near-miss mode the header pill said **33** and the radial hub said **9 combos**: the hub counts what is drawn (the nearest slice, capped by the tray) and the pill counts every hit, and nothing told the reader they were different questions. | medium | **Fixed** `f7be728` — `GraphContext.total`; the hub now reads "9 · of 33 combos" when it draws fewer. |

### Reviewed and found correct (so nobody re-reports them)

- The diagram opens at **100%, not fitted, on desktop**, and the Payoff column can sit off-screen at
  1280x720 until "Fit diagram to view" is pressed. `web/graph.ts:140-150` documents why (centring
  cropped the lane headings at 1280, #69) and fits automatically under 640px. A design decision,
  left alone.
- "Within N cards" changes the pill and not the diagram: correct, the nearest seven are identical
  (rc-manager11's handoff, and the docblock at `web/main.ts:343`).
- Focus: one 2px accent ring on every control (`test/a11y.test.ts` pins it). Keyboard order
  passes (rc-manager11).
- Truncated card names on diagram nodes ("Forge of the Fu…") are the node's own width at 100% and
  read in full in the drawer and at fit; the 2026-09-02 todo item "combo names truncated in route
  boxes" is now wrapped (`lines` in the graph model) — closed.
- "Name plates overlap the next card's qty badge in the zigzag" (2026-09-02 todo): not reproducible
  on the Lux fixture at 1280 or 375; the plates sit below the art and the qty badge top-right.
- The drawer, the radial layout, near misses (dashed outlines on the missing pieces, `MISSING 1×`
  in the tray) and the mobile layout at 375 all render correctly, console clean throughout.
- Guide, Sources, privacy and 404 pages: measure ~85 characters per line at 1280, one h1 each,
  the Riot disclaimer verbatim.

### Deferred, with the reason

- **D1 — body text is 15px** (`body { font: 0.9375rem/1.5 }`), under the 16px guideline. It is the
  site's deliberate base; every measured tap target and the 320px deck panel's rows were sized
  against it, so changing it is a reflow of the whole panel, not a CSS line. Recommend as its own
  issue with a measured pass.
- **D2 — five unrelated "nothing here" classes** (`.tray-empty`, `.play-notice`, `.plan-note`,
  `.pool-noart`, `.dzone-empty`) at five sizes. Consistency debt, no user-visible defect; a shared
  base class is a refactor of five call sites and was out of scope for a review pass.
- **D3 — five raw hex values outside the tokens** (`.primary:hover #ff8c14`, `.primary:disabled
  #d8c4ae`, `.stage #0c161a`, `.name-bg`/`.qty-bg #0b1417`) and two differently tuned modal scrims.
  Name them (`--accent-hover`, `--scrim`) when the palette next moves; no visible defect today.
- **D4 — spacing is eyeballed** (27× 7px, 25× 9px, 14× 11px, 25× 13px in `styles.css`). Declined
  rather than deferred: every one of those was measured against the 320px panel, and forcing an
  8px grid would move things that were placed on purpose.
- **D5 — the off-domain reason is tooltip-only** in the deckbuilder pool (rc-manager10 §5.3): the
  card is dimmed and the reason lives in `title`/`aria-label`. A visible one-line reason under the
  grid is a small feature, not a style fix; the `Not <tag>` Signature badge does render for an
  in-domain wrong-tag card (`test/dom/builder.dom.test.ts:261`), which is the half rc-manager10
  thought was missing.
- **D6 — on mobile the diagram sits below ~1,800px of deck panel** (status card, What to add, Pairs).
  A "See the diagram" jump link near the status card would help; deliberately not added without
  the owner's call on the panel-first mobile order.
- **D7 — one play's lede ends in a colon** ("…on the day's headline numbers. It is:") because its
  first paragraph introduces a list. A one-line edit to that play's prose, not a renderer issue.
- **D8 — the deckbuilder and the account menu could not be exercised in open mode** (both need an
  account); their styles were verified by injecting the markup and reading computed styles, and
  the DOM tests cover the builder. Sign-in flows were reviewed on production by rc-manager10.

## Scores

Grades start at A per category and drop one letter per high finding, half per medium.

| Category | Before | After |
|---|---|---|
| Visual hierarchy | A | A |
| Typography | B (15px body) | B |
| Colour and contrast | A | A |
| Spacing and layout | B (nav clip, size-row token) | A- |
| Interaction states | C (danger link, 22px steppers) | A- |
| Responsive | B- (Sources unreachable at 375) | A- |
| Content and microcopy | B- (plays index walls, blank My decks, 9 vs 33) | A- |
| Motion | A | A |
| AI slop | A (none of the eleven) | A |

**Design score: B+ → A-. AI slop score: A → A.** PR summary: *Design review found 9 fixable
issues, fixed 9 (all verified in the rebuilt local build); 8 deferred with reasons. Design score
B+ → A-, AI slop A → A.*

## Method notes worth keeping

- The static server sends no cache headers and the browser reused the old `index.html`,
  `styles.css` and `app.js` after a rebuild: the first verification pass measured the previous
  build and reported every fix as absent. `fetch(url, {cache: "reload"})` on each asset, then a
  reload, is the cure. **A verification that comes back "nothing changed" after a rebuild is a
  cache question before it is a code question.**
- The subagent's seven findings were 5 real, 2 declined — the ones declined were consistency
  preferences rather than defects. Its file:line evidence made the verification a grep each.
