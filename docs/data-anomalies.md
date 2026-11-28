# Card data anomalies

Register of things that look wrong in `data/cards.json` and `data/corpus_flat.txt`. Audited
2026-09-04 against Riot's gallery content API (`content.publishing.riotgames.com`, the same
endpoint `scripts/build-cards.mjs` reads) and against the built corpus.

**Why a register and not a fix.** Card text comes only from Riot's API. `data/errata.json` is a
dated overlay for errata *Riot published*, matched by an exact find-string, and the build fails
when a find stops matching — that failure is the only mechanism keeping our text honest. Putting
a cosmetic normalisation in there would spend that mechanism on a typo and hide a real text change
behind it. So anything that is Riot's own text stays exactly as Riot ships it and is listed below
instead. What *is* ours to fix is the decoding of Riot's HTML, and two such defects were found and
fixed in this audit (last section).

Line numbers are `data/corpus_flat.txt` as of this audit and drift with every rebuild; the card
code is the stable key.

## Upstream — Riot's text, left alone

| Card | Anomaly | Evidence |
|---|---|---|
| `VEN-073` Jagged Cutlass | Keyword written `Equip` with no brackets, unlike the other 39 Equipment printings, which write `[Equip]`. | API body: `<p>Equip :rb_rune_body: (…)</p>`. Corpus L848. |
| `RAD-071` Nazuman Ntofo | `Equip` with no brackets, the same as `VEN-073`; the other two Radiance Equipment (`RAD-123`, `RAD-150`) write `[Equip]`. Five synergy predicates match `\[Equip\]` and miss both cards (#664 read, 2026-11-23). | API body read 2026-11-23: `<p>Equip :rb_energy_1: (:rb_energy_1:: Attach this to a unit you control.)</p>`. |
| `SFD-096` Laurent Bladekeeper | `Ganking` with no brackets; the rest of the pool writes `[Ganking]`. | API body: `<p>Ganking (I can move from battlefield to battlefield.)</p>`. Corpus L424. |
| `SFD-138` Windsinger | `Hidden` with no brackets; the rest writes `[Hidden]`. | Corpus L466. |
| `VEN-103` Shadows of the Past | Carries an `effect` field containing the single character `1`, on a **spell**. `effect` is the Equipment-only field holding the text granted to the equipped unit, so the corpus renders a dangling `[Effect] 1`. | API body: `"effect": {"richText": {"body": "<p>1</p>"}}`. Corpus L878. |
| `OGN-235` Karma, Channeler | Tagged `[Tags: Vi, Ionia]`. Should be Karma; Vi is a different champion. | Corpus L241. |
| `SFD-217` Seat of Power | Sentence ended in a double period: `…you or allies control..`. **Gone upstream**: the gallery read 2026-11-16 (#660) ends `…you or allies control.`, so the row stays as history. | API body ended `control..</p>` on 2026-09-04. |
| `VEN-109` Illaoi (and `UNL-160` Ultrasoft Poro until 2026-11) | Token Might printed as `:rb_energy_1: :rb_might:` — Riot uses the *Energy* glyph for the numeral `1` in front of the Might icon. Reads as "1 Energy of Might" if taken literally; it means a 1 Might token. Rule 187.7 is the authority for the Bird token, 187 for the shape. `UNL-160` reads `Play two 1 :rb_might: Bird unit` in the gallery read 2026-11-16 (#660); `VEN-109` still carries the Energy glyph. | Corpus L709, L884 as of the audit. |
| `RAD-012` Runeblade Anvil | The kill cost names a Chaos rune, `:rb_energy_2::rb_rune_chaos:, :rb_exhaust:: Kill this.`, where the card prints a Fury rune. The gallery also ships the card as Chaos, and `data/gallery-fixes.json` corrects its domain to the printed Fury, but that overlay never touches text. Only the colour is wrong, and no script prices this cost: the turn clock reads rune glyphs only in an `[Equip]` cost (`equipCost`, `scripts/adversarial-check.mjs:1962`) or an `[Add]` (`POWER_ADD`, `LEGEND_ADD`, `HENGE`), and the card has neither. The site shows the text as shipped, `2 Energy + 1 Chaos Power, Exhaust: Kill this.` (`readableCardText` in `src/cards.ts`, also the deckbuilder's search text), and four synergy excludes quote it. The only RAD card whose text names a rune outside its own domains (measured 2026-11-23, #664). | API text read 2026-11-23. The card image, the `source` of its `data/gallery-fixes.json` entry, read 2026-11-23: `2`, a Fury rune, exhaust: Kill this. |
| `OGN-259` Unforgiven against `OGN-305` / `OGN-305*` Unforgiven | Two printings of one legend with different text (#663). Riot re-worded `OGN-259` from `to or from its base` to `to or from your base` with no errata page; the showcase `OGN-305` and `OGN-305*` still read `its base`. In 1v1 the two are the same base, since a friendly unit is your own (740.1.a) and resides in your Base (107.1.c); in a team mode a teammate's unit is friendly too, and `OGN-259` now moves it to or from your base rather than its controller's. `equivalents` in `src/cards.ts` still treats them as one card. No catalogue entry moves a teammate's unit. | API bodies read 2026-11-27T21:15:24Z: `OGN-259/298` `<p>:rb_energy_2:, :rb_exhaust:: Move a friendly unit to or from your base.</p>`; `OGN-305/298` and `OGN-305*/298` `<p>…to or from its base.</p>`. |
| `VEN-058` Patched Porobot | The gallery types it `["unit"]`; the card prints the type line `UNIT GEAR • PILTOVER • MECH • PORO`, cost 2, Might 2, no Might bonus. As a gear it triggers `OGN-091` Pit Crew ("When you play a gear, ready me.") and counts toward every "control N or more gear" clause, its own "3 or more OTHER gear" included for a second Porobot. **Overlaid**: `data/gallery-fixes.json` entry `VEN-058` sets `type` to `["unit","gear"]` (#692), and `gearMight` in `scripts/build-cards.mjs` keeps a unit gear's own Might. | Gallery read 2026-11-27 (`npm run build:data`): `type` `["unit"]`. The card image, the entry's `source`, read 2026-11-27. |
| `VEN-155` Heart of the Tempest | The gallery tags it `["Yordle","Kennen"]`; the card prints the type line `LEGEND • KENNEN`, with no `Yordle`. **Overlaid**: `data/gallery-fixes.json` entry `VEN-155` sets `tags` to `["Kennen"]` (#692). No synergy rule matched it on `Yordle`: `npm run synergies` lists it under the same rules before and after. | Gallery read 2026-11-27: `tags` `["Yordle","Kennen"]`. The card image, the entry's `source`, read 2026-11-27. |
| `VEN-197` / `VEN-197*` Heart of the Tempest | The same `Yordle` tag on the showcase printing and its signed `VEN-197*`; both images print `LEGEND • KENNEN`. **Overlaid**: `data/gallery-fixes.json` entry `VEN-197`, which applies to every printing of the base, so it covers `VEN-197*` too; `VEN-155` is a separate base and has its own entry (#692). | Gallery read 2026-11-27: `tags` `["Yordle","Kennen"]` on both. The images of `VEN-197` (the entry's `source`) and `VEN-197*` (`https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/853681913bcd2a2e2b42217e290b530b72518142-744x1039.png`, cited in the file's `#692` note) read 2026-11-27. |

Except `RAD-012`, whose walk pays its kill cost with the Fury rune the card prints, and the two
Unforgivens in a team mode, none of these change what a card does, so none of them blocks a rules
walk. The three type and tag rows (`VEN-058`, `VEN-155`, `VEN-197`) did change what a card is, and
the built data no longer carries them: `data/gallery-fixes.json` overlays the printed value. The
bracket-less keywords are the ones with teeth: any parser that finds keywords by `[…]` misses
`Equip` on `VEN-073` and `RAD-071`, `Ganking` on `SFD-096` and `Hidden` on `SFD-138`. Five synergy
predicates do find `[Equip]` that way (`fiora-equipment-ready`, `aphelios-equipment-attach`,
`weaponmaster-equip-discount`, `rell-magnetic-free-equip-attach`, `jax-unrelenting-attach-draw`), and
all five leave out `VEN-073` and `RAD-071` (measured 2026-11-23).

## Gallery metadata against the printed card — overlaid, not registered (#664)

Riot's gallery shipped Radiance (read 2026-11-23) with the wrong type, domain or tags on 111 of its
bases: `RAD-108` Bushwhack Trap prints as a Chaos gear and the gallery calls it a Fury unit with a
`Device` tag, and `RAD-049` ships with no type and no domain at all. That is not cosmetic: type and
domain decide Domain Identity (103.1.b), the deckbuilder's pool and every synergy predicate, so a
register row would have left 111 cards playable in the wrong decks. Text still follows the rule
above; only `type`, `domains` and `tags` may be corrected, and only from Riot's own card image.

`data/gallery-fixes.json` holds one entry per base: the value the gallery ships, the value the
card prints, the `cmsassets.rgpub.io` image it was read from and the read date. Its notes give the
method (a blind transcription of every image, cross-checked). `applyGalleryFixes` in
`scripts/build-cards.mjs` applies it to every printing of the base and records `galleryFix` on the
card, and like the errata overlay it fails the build when the gallery stops shipping the named value,
so an entry retires itself when Riot corrects the data. `test/gallery-fixes.test.ts` pins both.

The same class of error in the older sets is overlaid by the same file since #692: `VEN-058`
Patched Porobot typed `unit` against a printed `UNIT GEAR`, and the `Yordle` tag on `VEN-155` and
`VEN-197` (rows in the table above). `OGN-235` Karma's `Vi` tag stays a register row only.

## Not anomalies — checked and explained

- **The 22 base codes that are not `SET-NNN`.** Tokens `SFD-T03`, `UNL-T01`–`T08`, `VEN-T04`;
  runes `VEN-R01`–`R06`; and six *playable* cards `VEN-SP1`–`SP6` (Kai'Sa, Sona, Ahri, Sett,
  Ezreal, Lux). Every code-shaped regex in the repo already accepts them — verified by running
  all 1189 printed codes through each one; see the audit note below.
- **The collector-number gaps** `OGN-007/042/073/089/126/166/214`, `SFD-187/197/222…`. Nothing is
  missing from `cards.json`. `scripts/build-corpus.mjs` keys the corpus by *name + type*, so a
  reprint under a second number collapses into one row and the loser's number reads as a gap:
  `OGN-007 Fury Rune` = `VEN-R01`, `OGN-073 Sona, Harmonious` = `VEN-SP2`, `SFD-222 Seal of Rage`
  = `OGN-040`, `SFD-244 Fire Below the Mountain` = `SFD-189`.
- **`type: []` on `UNL-T04` Buff and `UNL-T08` XP Tracker.** Riot really does ship them with no
  card type; they are score-tracking aids. They stay in the corpus (see below) and now render
  their type as `-` rather than a blank column.
- **Reprints under their own `base`.** Refuted 2026-09-04: `CardIndex.equivalents()` collapses by
  name + type and `src/matcher.ts:47` uses it, so a decklist bringing `VEN-SP6` matches a combo
  authored on `OGS-014`.
- **`" - Starter"` in legend names.** Refuted in issue #14: both forms resolve.
- **`energy: null` on the tokens `OGN-271`–`OGN-274`** (three Recruits and Sprite). Piltover
  Archive and dotgg give them `0`; Riot's gallery gives `null`. The gallery is right: each card
  image prints `TOKEN UNIT` and a Might (1, 1, 1, 3) and no cost at all. `OGN-271` was read by the
  #664 cross-check (2026-11-23), `OGN-272`, `OGN-273` and `OGN-274` on 2026-11-27 (#692). A token
  is never paid for, so no cost is the printed value and nothing is overlaid.

## Corpus membership

Tokens, runes and the two typeless helpers stay in `data/corpus_flat.txt`. Excluding them would
buy 13 fewer lines out of 935 (1.4%) and cost the ability to look up text that card text itself
points at: 79 corpus lines tell you to play a token without printing what the token does. The
Gold token's rules text lives *only* on `UNL-T05`, and the R25 ruling turned on exactly that text;
`UNL-T06 Reflection` is what R27 is about. Rule 187 defines the token shapes in the Core Rules,
which makes the corpus row the second half of a lookup a walk will legitimately need.

## Ours, and fixed — `stripHtml` in `scripts/build-cards.mjs`

Two of the reported anomalies were not Riot's data at all but our HTML decoder, which handled
`<br>`, `</p><p>`, `&gt;`, `&lt;`, `&amp;` and `&nbsp;` and nothing else. A full scan of every
`text` and `effect` body in the API shows Riot uses exactly four tags (`p`, `br`, `ul`, `li`) and
two entities (`&gt;`, `&quot;`).

- **`&quot;` reached the corpus undecoded on 12 cards** (`SFD-184`, `SFD-208`, `UNL-018`,
  `UNL-073`, `UNL-145`, `UNL-147`, `UNL-185`, `UNL-213`, `VEN-023`, `VEN-112`, `VEN-142`,
  `VEN-144`), 24 occurrences. Every one of them is quoting granted rules text — the Gold token's
  own ability, Baron Pit's, Shadow Clone's — so the mangling landed on the exact clause a walk
  reads. Now decoded, before `&amp;` so a literal `&amp;quot;` cannot double-decode.
- **Modal abilities came out glued.** Riot ships modes as `<ul><li>`; stripping tags bare produced
  `…this turn —Ready 2 runes.Channel 1 rune exhausted.Buff a friendly unit.` on 15 cards,
  including `UNL-182 Curtain Call`, which the Jhin pursuit route uses. `<li>` now becomes a
  newline and a bullet, so the modes are separable again.

## Audit note — base-code regexes

Every regex in the repo that matches a card code, run against all 1189 printed codes and all 1042
bases:

| Location | Regex | Result |
|---|---|---|
| `src/deck.ts:24` `CODE_RE` | `^([A-Z]{3})-([A-Z]*\d{1,3}[a-z*]?)(?:\/\d+)?(?:-(\d+))?$` | 0 failures |
| `src/deck.ts:57` trailing `Name (CODE)` | `[A-Z]{3}-[A-Z]*\d{1,3}[a-z*]?(?:\/\d+)?` | 0 failures |
| `scripts/build-cards.mjs:75` `splitVariant` | `^([A-Z]{3}-(?:[A-Z]*\d+))([a-z*]?)$` | 0 failures |
| `src/deck.ts:43` TTS line guard | `^(?:[A-Z]{3}-[A-Z]*\d{1,3}[a-z]?-\d+\s*)+$` | **45 failures — fixed** |

The `^[A-Z]{3}-\d{3}$` shape the issue warns about is not used anywhere; `[A-Z]*\d{1,3}` in front
of the digits is what carries `SP1`, `T04` and `R01`.

The TTS guard was a real bug and not the one the issue predicted. It is a **whole-line** test on a
token dump, and its variant class was `[a-z]?` where `CODE_RE` has `[a-z*]?`. 45 printings are
alt-arts whose code ends in `*`, so a single alt-art anywhere on the line made the line fail the
guard and fall through to the name branch — every code on it lost at once, as one bogus card name.
Fixed in `src/deck.ts:43` with a regression test in `test/deck.test.ts`.


## Reminder-text variance — registered 2026-09-12, settled by rule

Found while sweeping `[Empower]` and `[Equip]` clauses for text that alters their **timing**
(`827.1.c.4`, `818.1.c.5`): of 39 `[Empower]` clauses and 39 `[Equip]` clauses across the pool, **none**
alters timing, and the sweep instead surfaced one reminder-text outlier.

| Card | Anomaly | Evidence |
|---|---|---|
| `VEN-134` / `VEN-185` Kayle, Justified | Its `[Empower]` reminder reads `(3 Energy: Empower me.)` and **omits "Use only if not Empowered."**, which every other Empower printing in the pool carries. Two printings of one name; no other card does this. | Measured over `data/cards.json` 2026-09-12: 39 `[Empower]` clauses in **nine** distinct reminder forms, and Kayle's two are the only ones missing that sentence. |

**It changes nothing, and the rule says so in one line.** Core Rules **135.2.d.3**: *"The presence,
absence, or exact wording of reminder text has no effect on game function."* And **827.1.c.1** supplies
the omitted clause anyway: *"Empower is functionally short for “[Cost]: Empower this. Play only if not
Empowered.”"*, with **441.1.b** — *"An Empowered Game Object can not be Empowered."* — as the rule proper.
So Kayle obeys the once-per-object limit exactly like the other 37 clauses, and **no entry may treat her
as repeatably empowerable.**

Registered rather than normalised, for the reason at the top of this file. `135.2.d.3` is the general
licence for that decision on **any** reminder-text difference and is cited by nothing in the catalogue.

## Links

- Issue [#14](https://github.com/GermanAbuArab/RiftCombo/issues/14) — the ticket this register closes.
- `CLAUDE.md` § Data — the sourcing rules this register exists to protect.
- `scripts/build-cards.mjs` — the only writer of card text.
