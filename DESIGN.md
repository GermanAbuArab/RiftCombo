---
# gstack: design-md-format=spec
# Values live in web/styles.css :root only; these names point at its custom properties (#574).
tokens:
  color:
    bg: "var(--bg)"              # panels step up: --panel, --panel-2, --panel-3
    text: "var(--text)"
    accent: "var(--accent)"      # one per screen: primary action, active nav, focus, missing piece
    support: "var(--line-2)"     # the line that has to be seen; quiet emphasis instead of the accent
    muted: "var(--muted)"        # and --faint; both clear WCAG AA on bg, panel, panel-2 (test/a11y.test.ts)
  font:
    display: "var(--font)"       # Inter; no display face (Cinzel rejected 2026-09-03)
    body: "var(--font)"          # var(--mono) only for card codes and deck codes
  type:
    scale: 1.2                   # dense product UI: 12, 14, 16, 20, 24, 32 px
    body-px: 16                  # body and prose; app chrome steps down to 14
  spacing: [4, 8, 12, 16, 24, 32, 48]
  radius: 10                     # containers 10, controls 6, diagram nodes 9-10
  motion:
    duration-ms: 180             # opacity and stroke-width on the graph only; ease
    reduced-motion: respect      # @media (prefers-reduced-motion) turns transitions off
---
# Design direction — RiftCombo

## Audience & tone
Riftbound players building or checking a deck: desktop first for the finder and the deckbuilder, phone for the public combo pages read between rounds. Calm and exact: a reference tool, not a poster.

## References
playriftbound.com only (designlang extract 2026-11-26): its orange `#ef7d00` as the single accent, deep teal surfaces, a 4px grid, 6px controls; we take the palette, not its display faces. personal-claude-issues#609 closed with no other reference. LOOPLINE is the reference for what a route map does, never for how it looks (legal posture, issues #1-#3).

## Type
Inter for everything; hierarchy from size and weight. Scale 1.2 on 14/16: page h1 32px/1.2 at weight 600, h2 20px, h3 16px bold, body 16px/1.5, UI 14px, captions 12px; no size below 12px. Counts use `tabular-nums`, not mono. Prose `max-width: 65ch`, line-height 1.65. A display face is a flagged option only, never the default.

## Color
`--bg` with three panel tiers and two lines, `--text`, `--muted`/`--faint` for secondary text. ONE accent, in four roles: the primary button, the active nav tab, the focus ring, the missing-piece mark (dashed edge, `+1` count). Section headings, pills, counts, toggles and links are `--text` or `--muted` with `--line-2`. Domain colours (`--dom-*`) mean their domain only. `--danger-text` for banned only. Contrast is measured from the tokens in `test/a11y.test.ts`.

## Layout & spacing
4/8 grid from the token list. Prose pages 820px centred; the app is full-width with a 320px deck panel and a 124px tray. Mobile padding 16px; touch targets 44px. The primary action of a screen is above the fold at 1440 and 390. Battlefields render landscape and take two pool columns so rows keep one height.

## Components
Buttons: one filled accent primary per view, the rest outlined `--line-2` at 6px. Cards: flat `--panel`, 10px, one border, never a card in a card. Forms: the shared field style through a class (`.field-input`). Diagram: hand-rolled SVG, nodes 9-10px, card art cropped with the CDN `rect` so the name plate is ours. Empty states: one sentence and one action.

## Motion
Only where it explains a state: graph highlight and dim on hover (opacity, stroke-width, 180ms). No entrance animation, no page transitions. CSP forbids inline `style=`; motion lives in `web/styles.css`.

## Never
A display or serif face (Cinzel rejected) · emoji · blue/purple gradients · decorative shadows · glassmorphism · the accent on headings, pills, counts or links · domain colours for anything but their domain · mono as a second display voice · sharp 2-3px corners · the diamond anywhere but the brand mark · a graph library · anything lifted from LOOPLINE · grey text below AA.

## Screens
Priority order; each audited at 1440 and 390 on issue #574, with a before/after proposal comment there.
1. Entrance (signed out) · 2. `/app` combo finder and diagram · 3. `/combos` catalogue · 4. `/combos/<id>` · 5. `/decks` · 6. `/decks/<id>` deckbuilder · 7. 404
