# Deckbuilder UX inventory — Piltover Archive, riftbound.gg, RiftScribe, dotgg.gg

Issue #101. Factual inventory only — no design proposal. Everything below was observed with headless
Python Playwright (Chromium), a fresh/unauthenticated browser context (no persistent profile, no
cookies from any other session), at 1440×900 desktop and 390×844 mobile. Screenshots are under
`/tmp/rc-builders/` (gitignored, not committed — paths listed at the end of each section). Anything
not directly observed is marked **NOT VERIFIED**.

## 1. Piltover Archive — `https://piltoverarchive.com/deckbuilder`

**Access**: fully public, no login wall. Linked from the homepage nav as "Build a deck". A
cookie-consent modal (CookieYes, "our 1734 partners") and a first-run tour tooltip ("Hey there,
Summoner!") appear on first load. Only **Save Deck** requires login (not tested — NOT VERIFIED what
it does when clicked signed-out).

**Layout (desktop)**: two fixed columns. Left = card pool (search bar, sort dropdown, filter toggle,
active-filter chips, live card count, image grid). Right = deck panel with its own tab row
(**Deck / Stats / Sample Hand**), a progress-tab strip that drops items as they're satisfied
(`Legend (0/1)`, `Champion (0/1)`, `Battlefields (0/3)`, `Runes (0/12)`, `Main Deck (0/40)`), a
**View** toggle (list/grid/stack) and a **Cols** stepper (2/4/6/8/10) for the pool grid, then the
deck sections stacked vertically (Legend, Champion, Battlefields, Runes, Main Deck, Sideboard, "The
Bench"), and a bottom bar (Import / Export / Clear / Save Deck).

**Layout (mobile, 390px)**: the two columns become **tabs**, not a stack/drawer — top row
**Gallery / &lt;n&gt;/40 / Stats / Hand** (the deck tab's label live-updates with main-deck progress),
a second abbreviated pool-scope row **All / Legend / Main / BF / Runes**. Card grid becomes 4 columns
with a **floating round filter button** bottom-right that opens filters as a **bottom sheet**
(drag handle, "Filters" title, "Done"); that sheet adds a mobile-only "Gallery Settings" block (Foil
toggle, Card Size stepper) not present on desktop. Global bottom nav (Home/Cards/Decks/Events/Tools)
persists underneath.

**Filters & search**: text search ("Search cards... (type / for filters)"), a Sort dropdown (only
default "ID" observed, other options NOT VERIFIED), six circular domain-icon toggle chips (Colors),
and dropdowns for Set / Type / Supertype / Variant / Rarity (all default "All"). Three **dual-handle
range sliders** for Energy (0–12), Power (0–4), Might (0–10), each labeled "Any". Active filters
render as dismissible chips plus a live "N cards" count and "Clear All".

**Add/remove**: click-to-add, no drag for adding (drag handles appear later for reordering rows).
Clicking a pool card adds 1 copy; the tile shows a "− x1 +" stepper. A 4th click on the same card is
silently blocked and triggers a **toast**: "Maximum copies reached — You can only have 3 copies of
&lt;name&gt; in your deck." List view gives each deck row an explicit "− qty +" stepper plus a drag
handle (⠿). Stack view shows card art with an "x1" badge overlay instead. Hitting the 40-card Main
Deck cap itself was not tested — NOT VERIFIED.

**Legend/Champion/Battlefield/Rune**: sections inside the same deck panel, no forced wizard order.
Picking a Legend fills "Legend 1/1" and **auto-switches the pool to Main Deck with the legend's two
domain colors pre-applied as filter chips** (confirmed: pool count changed from a full list to a
domain-scoped one). Champion: a "Select" button; a candidate outside the legend's domain/tag shows
"0/1 No matches" (greyed) rather than being accepted — champion legality looks live-checked. In list
view, eligible Main Deck rows carry an inline "Champion" tag badge. Battlefields: the domain-filtered
pool **still shows battlefields banned in the current ruleset**, marked with a diagonal red "BANNED"
ribbon on the art — clicking one still adds it (no block), and the ribbon carries into the deck slot.
Runes: **auto-populated the instant a Legend is chosen** (12/12, split evenly across the legend's two
domains), with an "Auto" toggle next to the header implying manual override is possible (list view
shows a per-domain "− count +" stepper).

**Deck display**: default grid view is a plain image grid (no type grouping), with a fixed
"Sort: Energy > Power > Name" label. List view = text rows (drag handle, thumbnail, name, Champion
tag if applicable, cost badge, qty stepper). Stack view = card art with "x1" badge. Running counts are
pervasive and live: `Legend 1/1`, `Champion 0/1`, `Battlefields 3/3`, `Runes 12/12`, `Main Deck 8/40`,
`Sideboard 0/10 (opt)`, plus a freeform "The Bench" scratch zone explicitly excluded from legality
counts. Stats tab (needs ≥1 card): Total Cards / Avg Energy / Avg Power tiles, an Energy Curve bar
chart, a Power Curve bar chart (both domain-colour-coded), a Domains donut, a Card Types donut, and an
"ADVERTISEMENTS / REMOVE ADS" line. Sample Hand tab: just a "Draw Opening Hand" CTA (result not
tested — NOT VERIFIED).

**Validation**: ban status is a big red "BANNED" ribbon on the card art itself (pool and deck), not a
text warning — does not block adding. Copy-limit overflow is blocked silently at the click plus a
dismissible toast naming the exact card. No other validation state (missing battlefield count, wrong
domain in main deck) was actually triggered — NOT VERIFIED.

**Import/Export**: Export modal, tabs **Code | Text | TTS | Image | Proxies | Registration**. Default
(Code) tab shows a real generated code in a textarea, e.g.
`CMAAAAAAAAAAACAQAAAADVSAAAAAAAAECQAAAAQEAYEAUDPOAMTAKKAFFICAIBAAAIDAAAAAAA`, with Copy/Download
buttons. Import modal, tabs **Deck Code | Text | TTS**, textarea placeholder `CIAAA...`, plus an
"Upload File" button and Cancel/Import. Other export tabs' actual output content NOT VERIFIED (tab
labels only).

**Polish**: hover-preview was tested with a real Playwright pointer move over a pool card — **no
zoom/tooltip appeared** in either attempt (reported as observed-absent for this interaction path, not
proven absent for a real mouse/touch). No autosave/draft indicator anywhere — persistence appears
gated behind the login-required Save Deck button (NOT VERIFIED whether local/session persistence
exists pre-login). Ads line visible on Stats/Sample Hand tabs implying an ad-supported model with a
paid removal tier. Global search advertises a `⌘K` shortcut in the header; no in-builder shortcuts
found.

**Screenshots** (`/tmp/rc-builders/piltoverarchive-*.png`, 27 files): `home`, `1-initial`,
`2-legend-pool`, `3-all-pool`, `4-filters-open`, `5-after-legend-click`, `6-champion-select`,
`7-after-champion`, `8-6cards-added`, `9-copy-cap-test`, `10-deck-panel-full`, `11-stats-tab`,
`12-samplehand-tab`, `14-debug`, `3-deck-populated`, `stats-populated`, `samplehand-populated`,
`listview`, `stackview`, `export-modal`, `import-modal`, `hover-preview`, `hover-preview2`,
`mobile-1-initial`, `mobile-2-after-legend`, `mobile-3-cards-added`, `mobile-4-deck-tab`,
`mobile-5-listview-scrolled`, `mobile-6-filters`.

---

## 2. riftbound.gg — `https://riftbound.gg/builder/`

**Access**: fully public, no login. Visiting `/builder/` silently provisions an anonymous draft at
`/builder/<random-id>/` (e.g. `zpap02wi27`) and **autosaves** ("Deck saved successfully" toast, "All
changes saved" indicator). No Cloudflare/CAPTCHA encountered anywhere inside the builder itself
(contrary to the project's prior note that only `/decks/<slug>` is gated — the builder was not
previously checked and is confirmed open).

**Layout (desktop)**: single-page, **not** a persistent two-column pool+deck split. The deck list is
the only always-visible panel; the card pool lives in an **"Add Card" modal** triggered by a
"+ Click to Add a Card" placeholder or header link. A right sidebar holds Deck Rules/requirements, a
mana-curve chart, and deck metadata (name, format, privacy, description). Toolbar above the deck
list: Playtest / Get Image / Export / Import Deck / Options, then a second row: Mode / Group / Sort /
Details dropdowns + a Layout-settings icon.

**Layout (mobile, 390px)**: top nav collapses to hamburger + search + account icon; the toolbar
collapses into a "•••" menu; Mode/Group/Sort/Details become full-width stacked selects. The Deck
Rules/curve sidebar becomes a **collapsible accordion** (tap a chevron next to "Main Deck 5/56" to
expand inline). A **sticky floating action bar** mid-scroll shows "+ Add cards" (primary) and a
"● Saved" pill, replacing the desktop inline add-link. Card grid drops from 5 to 2 columns. Sideboard
empty-state copy changes from "drop a card here" (desktop, drag-and-drop) to "add from the picker, or
move a card here" (mobile, no drag).

**Filters & search** (inside the Add Card modal): free-text search ("Search Cards by Name, ID, set,
type etc"). "Tags Filter" dropdown — Owned / Not Owned / In Wishlist / For Trade / Used in Deck / Not
Used in Deck — this is a **collection-status** filter, not a card-attribute one. "Set" dropdown
(default "Any"). "CARD TYPE" is a **removable chip that the app auto-applies and auto-advances**:
empty deck → defaults to `Legend`; after Legend added → auto-switches to `Battlefield`; then to `Rune`
once battlefields are filled (verified by reopening the modal after each add). A "Picker settings"
modal (sliders icon) has only a "Cards in row" slider — **no Energy/rarity/keyword/domain filter or
cost-range slider exists anywhere in the picker** (confirmed by a full-page text search for
"energy"/"rarity"/"keyword" — zero hits). Separate "Layout settings" (main page) controls the deck
LIST grid density and a "Spacious" toggle. Sort dropdown: Id / Name / Price / Cost. Group dropdown:
Cardtype / Color / Rarity / Cost / None. Details dropdown: None / Collection / Changes. Mode dropdown:
Text / Image (display mode for the deck list; the resulting Text-mode render was not captured —
NOT VERIFIED).

**Add/remove**: click a pool thumbnail → adds 1 copy instantly, modal closes, toast + autosave. Then
quantity is controlled by a **−/+ stepper inline on the deck-list row** (not by re-opening the
picker). Quantity shows as an orange circular "×N" badge next to the name (with its own × to delete
the whole line) and again on the stepper. **Per-card caps (3 for main-deck cards, 1 for
battlefield/rune/legend) are enforced by graying out the "+" button** — clicking at cap does nothing,
no toast (verified pixel-level: "+" renders visibly dimmer than "−"/magnifier at cap). Hovering a deck
row reveals a "⇄ SIDE" quick-action to move to Sideboard without dragging; the Sideboard itself also
accepts drag-and-drop.

**Legend/Battlefield/Rune/Champion**: not a wizard — all are Card-Type-filtered entries in the same
modal, but the type filter **auto-advances** Legend → Battlefield → Rune in unmet-requirement order.
**Choosing the Legend filters the Rune pool by domain** (Kai'Sa, Fury+Mind → only Fury/Mind rune art
shown, zero others). Battlefields were **not** domain-filtered (unrelated-color battlefields still
appeared). Whether Units/Spells get the same domain filter as Runes — NOT VERIFIED (attempt errored
before capture). Champion is a separate "CHOSEN CHAMPION" sidebar panel/dropdown ("No chosen champion
— Add a Champion unit to the main deck to choose one"), independent of the picker flow.

**Deck display**: grouped by card type by default (section headers "Legend [1]", "Battlefield [3]",
"Rune [1]", "Unit [2]" with counts), each an image-thumbnail row with name/set-code/market-price/qty
stepper/magnifier button. Sidebar mana-curve bar chart (buckets 0–7+) with running "Avg. cost: X.X"
plus three small domain-pip counters (exact semantics beyond "domain-cost symbol counts" not
confirmed). Running counts throughout: "Main Board (7/56)", "Side Board (0/10)", per-requirement
fractions ("Legend ✓1/1", "Battlefield ✓3/3", "Rune ✗1/12"). **Note the main-deck target reads 56
here**, not 40 (see RiftScribe below for the discrepancy).

**Validation**: sidebar "Deck Rules" panel — unmet rules are **red rows with ✗** ("Main Deck has 4
cards (needs 56)"); satisfied rules turn solid green with ✓ and drop out of the top error list. A
banned card gets a **red "BANNED" ribbon** on its deck-list thumbnail plus red "· Banned" text next to
its price (triggered live by adding the real-money-banned Aspirant's Climb, OGN-276). Not blocking —
banned cards can still be added, just flagged.

**Import/Export**: **Export** menu — Code (shareable), Tourney (sections, no card numbers), Text,
JSON, Image, each with Copy + Download icons; a separate "PRINT & EMBED" section with Proxy sheet,
Registration sheet (tournament PDF), and Embed (oEmbed JSON/XML snippet for blogs/forums). **Get
Image** is a distinct feature from Export→Image: "A shareable Full HD picture of the deck", with
Background (Default/Deck colours), "Sort within type", a "Separate cards" toggle (every copy its own
card art, no ×n badge), a QR-code toggle linking back to the deck, and "Generate preview". **Import
Deck**: one textarea accepting two dialects at once per its own placeholder —
`1 Ornn - Fire Below the Mountain (SFD-244)` or `3_SFD_086` — with a "Preview Import" button.

**Polish**: autosave with a visible "All changes saved"/"Unsaved changes…" indicator plus a manual
"Save deck" button; "Reset deck" appears once dirty; toast on every add/save. Each deck row has its
own magnifier/zoom icon presumably for a hover-preview, but a large preview render could not be
confirmed within the test window — NOT VERIFIED for hover-zoom specifically. "Playtest" button
tooltip: "goldfish this deck on a rules-aware board" (a full solitaire simulator — not opened, NOT
VERIFIED beyond the tooltip). No in-builder keyboard-shortcut hints found.

**dotgg.gg**: `https://dotgg.gg/riftbound` returns HTTP 200 but redirects straight to
`https://riftbound.gg/` (confirmed via `page.url` after networkidle) — riftbound.gg **is** dotgg's
Riftbound property, not a separate skin over a generic dotgg builder. No independent dotgg builder to
inventory.

**Screenshots** (`/tmp/rc-builders/riftboundgg-*.png` + `crop-stepper*.png` + `dotgg-1-home.png`, 25
files): `home`, `1-empty`, `1-empty-full`, `2-addcard-modal`, `3-tagsfilter`, `5-advfilter-click`,
`6-layout-settings`, `7-picker-settings`, `9-after-click-card`, `10-modal-after-legend`,
`11-search-recruit`, `12-after-4cards`, `13-cap-test`, `14-stepper-cap`, `crop-stepper`,
`crop-stepper2`, `crop-stepper3`, `15-rune-pool`, `16-noRuneFilter-pool`, `18-export-menu`,
`20-import-modal`, `opt-mode2`, `opt-group`, `opt-sort`, `opt-details`, `3-deck-with-cards`,
`4-mobile-deck`, `4c-mobile-chevron`, `4d-mobile-chevron2`, `dotgg-1-home`.

---

## 3. RiftScribe — `https://riftscribe.gg/deck` ("Deck Workshop")

Bonus site, reached quickly. Self-declared independent fan project, "not affiliated with... Riot
Games" (`riftscribe.com` does not resolve — DNS failure; `.gg` is the live domain). Per project rules
this site's card **text/ban data** is never used as a RiftCombo data source, but that restriction does
not cover UX/layout, so it was inventoried for that purpose only.

**Layout (desktop)**: inverse of riftbound.gg — the card pool is the **main, wide, left content**
(4-column image grid) and the deck state is a **persistent right sidebar**, always showing every zone
(Legend/Battlefields/Runes/Main Deck/Sideboard) as stacked sections — no modal. A horizontal numbered
stepper above the pool doubles as section tabs: "1 LEGEND · choose one / 2 MAIN DECK 0/40 /
3 BATTLEFIELDS 0/3 / 4 RUNES 0/12". **Note: main deck target reads 40 here**, vs. 56 on
riftbound.gg — a real discrepancy not resolved by this research (could be a different/older format
default; NOT VERIFIED which is current).

**Layout (mobile, 390px)**: no hamburger — nav links wrap to a second row. Pool grid narrows to 2
columns and stays on top; the whole deck sidebar reflows to the bottom of one long scroll — no tabs,
no drawer, no sticky action bar (a third distinct mobile pattern vs. Piltover's tabs and
riftbound.gg's accordion+sticky-bar).

**Filters**: only "All sets" and "All rarities" dropdowns, plus a text search whose placeholder
changes per active zone ("Find a legend card…"). No domain/color, cost, or keyword filter widgets.

**Add/remove**: "+ ADD" button per pool card; once added, the same tile flips in place to a
"− N +" stepper plus an "SB" (sideboard) quick-button — no modal, no reload. Toast confirms each add
("Blazing Scorcher added to Main Deck."). Cost and Might render as numeric badges directly on the card
art (top-left/top-right); domain shown as text pills ("Fury", "Mind") rather than icons.

**Domain filtering**: confirmed — after adding a Fury/Mind legend, the Main Deck pool showed only
Fury-tagged cards.

**Champion**: chosen inline via a "CHOOSE CHAMPION" link under the relevant unit row in the deck
sidebar, not a separate selector screen.

**Validation**: "DECK CHECK" sidebar list states unmet rules as plain bullet text, no colour coding
observed: "Choose exactly one Legend", "Choose exactly 3 Battlefields (0/3)", "Runes must total 12
cards (0/12)", "Main Deck must total 40 cards (0/40)", "Choose a Champion from the Main Deck" — plus
an explicit disclaimer: "Validation covers RiftPack structure, obvious zone mismatches, domains, and
banned-card warnings. It does not certify tournament legality or copy limits."

**Import/Export**: proprietary "RiftPack code". Import = single textarea, "Paste RiftPack code…",
with "Importing replaces the current local draft. The code is decoded entirely in your browser."
Export button was greyed out/disabled even with a legend + card added, so its dialog is **NOT
VERIFIED** — could not be opened this session. Deck state is explicitly local-only ("Your working
draft stays in this browser"), with a "SHARE LINK" button as the presumed sharing mechanism (not
opened).

**Screenshots** (`/tmp/rc-builders/riftscribe-*.png`, 8 files): `1-home`, `2-deck`, `3-filters`,
`4-after-legend`, `6-import`, `7-mobile`, `mobile-top`, `mobile-bottom`.

---

## 4. Comparison table

| Feature | Piltover Archive | riftbound.gg | RiftScribe |
|---|---|---|---|
| URL | `/deckbuilder` | `/builder/` (auto-creates draft) | `/deck` |
| Login required | No (Save Deck only, untested) | No (autosaves anonymously) | No (local-only) |
| Pool/deck split | Two fixed columns | Deck list only; pool is a modal | Pool wide-left, deck fixed-right sidebar |
| Mobile pattern | Top tabs (Gallery/Deck/Stats/Hand) | Accordion sidebar + sticky "+Add cards" bar | Long single scroll, no tabs/drawer |
| Domain/color filter | 6 icon toggle chips | **None found** | **None found** |
| Cost filter | Dual-handle sliders (Energy/Power/Might) | **None found** | **None found** |
| Set / Type / Rarity filters | Yes (dropdowns) | Set only (Tags Filter is collection-status, not attributes) | Set + Rarity dropdowns only |
| Text search | Yes, with `/`-shortcut hint | Yes | Yes, placeholder changes per zone |
| Add mechanic | Click in pool | Click in modal, then closes | Click "+ ADD" in place |
| Quantity display | Stepper on tile / list row / stack badge | Stepper on deck row + orange "×N" badge | Stepper in place of "+ ADD" |
| 3-copy cap enforcement | Blocked click + toast naming the card | Blocked click, "+" greyed out, **no toast** | Not directly observed at cap |
| Legend picks domain filter for | Main Deck pool (colors) | Rune pool only (confirmed); Units/Spells NOT VERIFIED | Main Deck pool |
| Champion selection | "Select"/"Select from deck", live domain/tag check, badge on eligible rows | Separate "CHOSEN CHAMPION" sidebar panel | Inline "CHOOSE CHAMPION" link on the unit row |
| Auto-fill runes | Yes, on Legend pick, with "Auto" toggle | No — Rune is just the next auto-advanced filter step | Not observed to auto-fill |
| Banned-card display | Red "BANNED" ribbon on art, doesn't block | Red "BANNED" ribbon + red text, doesn't block | Mentioned in Deck Check disclaimer only |
| Deck grouping | View toggle: grid / list / stack | Grouped by type by default, Group dropdown (type/color/rarity/cost/none) | Fixed sections, no grouping options |
| Mana curve chart | Stats tab: Energy curve + Power curve (2 charts) + 2 donuts | Sidebar bar chart (0–7+) + domain pips | Not observed |
| Main deck size target | 40 | **56** | **40** |
| Export formats | Code, Text, TTS, Image, Proxies, Registration | Code, Tourney, Text, JSON, Image, Proxy sheet, Registration, Embed | RiftPack code only (export dialog not opened — disabled in session) |
| Import | Deck Code / Text / TTS + file upload | Deck code or text, "Preview Import" | RiftPack code textarea |
| Shareable image export | Yes (Export→Image tab) | Yes, plus a separate richer "Get Image" tool (QR code, background, per-copy art) | Not observed |
| Autosave | Not observed pre-login | Yes, visible "All changes saved" + toasts | Explicitly local-only, no server save |
| Hover/zoom preview | Tested, not observed to trigger | Magnifier icon present, zoom itself not confirmed | Not tested |
| Ads | Yes ("REMOVE ADS" line) | None observed | None observed |
| Playtest/goldfish mode | No | Yes ("Playtest" button, not opened) | No |

## 5. Cross-cutting NOT VERIFIED list (do not treat as fact)

- Piltover Archive: Save Deck behavior when signed out; Sort dropdown's non-default options; hitting
  the 40-card Main Deck cap; Sample Hand's actual drawn-hand render; Export tabs beyond Code (Text,
  TTS, Image, Proxies, Registration); whether a real (non-CDP) mouse hover triggers a card preview.
- riftbound.gg: whether Units/Spells are domain-filtered by Legend the same way Runes are; the "Text"
  display Mode's actual row layout; hover-zoom via the magnifier icon; the Playtest/goldfish mode's
  actual screen; exact semantics of the three domain-pip counters under the curve chart.
- RiftScribe: the Export dialog (button was disabled all session); the "SHARE LINK" mechanism.
- Not attempted at all in this pass: any login-gated feature on any site; RiftScribe's format-legality
  data source; whether Piltover Archive's or riftbound.gg's cost/domain filters exist somewhere not
  found (e.g. behind an "Advanced" toggle not discovered).

## 6. Screenshot index

All under `/tmp/rc-builders/` (gitignored — not committed). 60 total across the three sites, listed by
prefix at the end of each section above (`piltoverarchive-*`, `riftboundgg-*` / `crop-stepper*` /
`dotgg-1-home`, `riftscribe-*`).
