# RiftCombo

Paste a Riftbound deck list, deck code, or public Piltover Archive link and see which known combos it already contains — and which it is a few cards short of — drawn as a map of pieces, combos and payoffs.

**Live:** https://riftcombo.vercel.app

Riftbound has no public combo database. This repository is one: every entry in `data/combos.json` is hand-authored from Riot's card text and the Core Rules, with its sources attached. Entries marked `verified` were walked step by step by a person; entries marked `candidate` were proposed by an automated sweep or documented by the community and have not been walked yet. Treat candidates as leads, not facts.

## What it does

- Matches on card codes (`OGN-212`), never on names, so alternate printings and errata never split a combo.
- Composes combos through a small dependency graph: a line that needs infinite Energy is shown together with the loop that produces it.
- Shows near misses: combos within one to three cards, with the missing pieces outlined.
- Reports legality per format from Riot's Rules Hub, and applies Riot's published errata as a dated overlay.
- Runs entirely in the browser. Deck lists are never stored. A Piltover Archive link is fetched once through this site's own edge function and cached for ten minutes.

## Running it

```
npm install
npm run build:data   # fetch Riot's card gallery -> data/cards.json, apply errata, resolve legality
npm test && npm run typecheck
npm run dev          # build web/ into public/ and serve it with the Vercel CLI
```

Deploys with `npm run deploy` (Vercel). `api/deck-url.ts` is the only server-side code.

## Data

| file | what | source |
|---|---|---|
| `data/cards.json` | every printing, with rules text and the Equipment `effect` text most mirrors drop | Riot's card gallery API, via `scripts/build-cards.mjs` |
| `data/errata.json` | dated find/replace overlay | Riot's errata announcements |
| `data/legality.src.json` | ban list per format | Riot's Rules Hub, transcribed by hand |
| `data/combos.json` | the catalogue | authored; see each entry's `sources` |
| `docs/phase0/` | the search itself: rules primer, refute spec, per-lens sweep reports | — |

## Contributing a combo

Open an issue with the cards (codes, not just names), the exact card text that matters, the game state it needs, numbered steps with per-iteration arithmetic, the rule numbers you rely on, and where you found it. Anything that reaches 8 points, loops without bound, wins by alternate condition, or produces repeatable value belongs here. "It feels strong" does not.

## Legal

RiftCombo was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.

No advertising, no donations, no play-rate or win-rate data. RiftCombo describes combos; it never plays them for you.
