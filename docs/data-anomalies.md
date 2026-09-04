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
| `SFD-096` Laurent Bladekeeper | `Ganking` with no brackets; the rest of the pool writes `[Ganking]`. | API body: `<p>Ganking (I can move from battlefield to battlefield.)</p>`. Corpus L424. |
| `SFD-138` Windsinger | `Hidden` with no brackets; the rest writes `[Hidden]`. | Corpus L466. |
| `VEN-103` Shadows of the Past | Carries an `effect` field containing the single character `1`, on a **spell**. `effect` is the Equipment-only field holding the text granted to the equipped unit, so the corpus renders a dangling `[Effect] 1`. | API body: `"effect": {"richText": {"body": "<p>1</p>"}}`. Corpus L878. |
| `OGN-235` Karma, Channeler | Tagged `[Tags: Vi, Ionia]`. Should be Karma; Vi is a different champion. | Corpus L241. |
| `SFD-217` Seat of Power | Sentence ends in a double period: `…you or allies control..` | API body ends `control..</p>`. Corpus L544. |
| `UNL-160` Ultrasoft Poro, `VEN-109` Illaoi | Token Might printed as `:rb_energy_1: :rb_might:` — Riot uses the *Energy* glyph for the numeral `1` in front of the Might icon. Reads as "1 Energy of Might" if taken literally; it means a 1 Might token. Rule 187.7 is the authority for the Bird token, 187 for the shape. | Corpus L709, L884. |

None of these change what a card does, so none of them blocks a rules walk. The three
bracket-less keywords are the ones with teeth: any parser that finds keywords by `[…]` misses
`Equip` on `VEN-073`, `Ganking` on `SFD-096` and `Hidden` on `SFD-138`. Nothing in the repo
parses keywords that way today.

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

## Links

- Issue [#14](https://github.com/GermanAbuArab/RiftCombo/issues/14) — the ticket this register closes.
- `CLAUDE.md` § Data — the sourcing rules this register exists to protect.
- `scripts/build-cards.mjs` — the only writer of card text.
