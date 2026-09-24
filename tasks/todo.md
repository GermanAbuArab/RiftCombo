# RiftCombo — todo (session rc-ux, 2026-09-21)

Sub-project **B** of `effervescent-imagining-globe.md`: the eight deferred UX items and the proxy
hardening. Branch `feat/2026-09-21-ux-hardening` off `infra-audit-fixes-2026-09-13` at `beb15b2`.
One commit per item, `git commit --only <paths>`.

## Baseline (measured 2026-09-21, before any change, at `beb15b2`)

| Gate | Result |
|---|---|
| `npm test` | **710 passed / 52 files**, exit 0 |
| `npm run typecheck` | exit 0 |
| `npm run adversarial` | exit 0 |

## The eight items, in the plan's order

- [x] **1. Type scale retune.** `.doc` 0.90625rem → 1rem, `.doc h1`/`.doc h3` up one step, `body`
      0.9375rem → 1rem. The dense UI classes keep their own sizes (they were measured against the
      320px panel and the `.pool-view` tap-target arithmetic).
      → verify: `test/type-scale.test.ts` green; `.doc p` line length ≤ 75ch at 1280 (`max-width:
      65ch` holds it); `.pool-view` still ≥ 24x24 at 390px; measured in the browser.
- [x] **2. Off-domain reason visible in the pool.** One `<p class="pool-note">` under `.pool-cells`,
      counted in `gridHtml()`'s own loop; hidden at N = 0 or with no legend. Nothing painted on art.
      → verify: DOM test in `test/dom/builder.dom.test.ts` — the count in the note equals
      `.pool-cell.off`, and the note is absent with no legend.
- [x] **3. Mobile jump to the diagram.** A static link inside `#status-card` (so `setStatus`, which
      writes only `#status-title`/`#status-body`, cannot destroy it), shown only ≤900px,
      `scroll-margin-top` on `#stage` for the two-row topbar.
      → verify: DOM test that it exists and targets a real element; playwright-cli at 375 — click,
      `#stage` top inside the viewport, results intact, route state intact.
- [x] **4. SVG/PNG export of the diagram.** `web/export.ts`: `serialize`, `stripArt`, `download`.
      SVG is primary (exact, never tainted); PNG is rendered from an art-free copy because
      `cmsassets.rgpub.io` sends no `access-control-allow-origin` and a canvas holding the art
      throws on `toBlob`.
      → verify: unit tests on `serialize`/`stripArt`; the raster checked by hand in a real browser.
- [x] **5. `/api/deck-url` hardening** (no counter, by decision): 8s `AbortSignal.timeout`, a 5 MB
      byte cap counted off the stream rather than trusted from `content-length`, and the post-fetch
      hostname re-checked against the allowlist (a redirect can leave it). Pure guards in
      `api/deck-url-guards.ts`.
      → verify: `test/deck-url-guards.test.ts` covers each guard both ways; the route itself only
      runs on a Vercel deploy, so it is exercised in sub-project A/D and NOT here.
- [x] **6. One de-emphasised base class.** Additive `.quiet` plus the class added at the five call
      sites (`.tray-empty`, `.play-notice`, `.plan-note`, `.pool-noart`, `.dzone-empty`); the names
      stay and their overrides shrink.
      → verify: suite green; each of the five states seen in the rebuilt site.
- [x] **7. Tokens for the last raw colours.** `--accent-hover`, `--accent-disabled-text`,
      `--stage-bg`, `--node-plate`, `--scrim`, `--scrim-2`, `--selection`.
      → verify: a11y suite unchanged (its `token()` reads only the named contrast pairs, so new
      tokens are inert); no six-digit hex outside `:root` except the six domain colours.
- [x] **8. The one play whose lede ends in a colon**
      (`2026-09-13-the-entry-the-clock-condemned-hardest`): its first paragraph only.
      → verify: `test/plays-reader.test.ts` and `test/web-payload.test.ts` green.

## Close

- [x] Rebuild (`SUPABASE_URL= SUPABASE_ANON_KEY= npm run build:web`), serve `public/`, verify every
      item with playwright-cli at 1280 and 375 reading computed styles and the DOM; write the
      measurements into a new section of `docs/reviews/2026-09-20-ui-ux-review.md`.
- [ ] All three gates exit 0; `security-scan`; push the branch; PR against
      `infra-audit-fixes-2026-09-13` (do not merge).
- [ ] `docs/handoffs/2026-09-21-rc-ux.md`; report the PR URL and the gate counts to rc-manager13.
