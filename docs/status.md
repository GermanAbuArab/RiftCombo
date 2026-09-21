# RiftCombo — status as of 2026-09-20

This is the orientation document. `docs/plan.md` and `docs/phase0-findings.md` are the plan and the
spike of 2026-09-02 and are kept as history: they describe decisions that were later taken
differently. Read them for the reasoning, not for the current state.

Every number below carries the command that produces it, measured against commit **`ecf7a88`** on
2026-09-20 (branch `feat/2026-09-20-rc-manager13`). The catalogue grows with every walk: **if a number does not match, the command is the
truth and this is a photo.**

---

## 1. What the site is

`https://riftcombo.app`. You paste a Riftbound list (text, deck code, or a public Piltover Archive
link) and it tells you which known combos the list already contains, which it is one or two cards
short of, and which cards in it are banned or restricted in the format you pick. Matching runs
entirely in the browser against a static bundle; there is no matching server.

**The whole site sits behind sign-in** (#39, user decision of 2026-09-05, which deliberately reverses
the "anonymous is identical" posture #31 was built with). `<body data-auth>` carries the state —
`pending` (the HTML default, which shows neither side so nothing flashes), `out` (the entrance only),
`in` (the application) and `open` (a build with no `SUPABASE_URL`, which has no gate to open). The CSS
decides what is visible; `web/account.ts` sets the attribute.

**Five views**, routed by hash (`web/router.ts`, `VIEWS = ["combos","decks","plays","guide","sources"]`):

- **Combos** (`#/combos`) — the deck panel and the diagram. The panel, top to bottom: **Banned and
  restricted** (first, because a list going to a tournament wants that before any combo), the status
  card, **What to add** (`src/plan.ts`, ranked by copies to add) and **Pairs in this deck** (the
  synergies). The diagram is hand-rolled SVG, no library, in two shapes: `layered` (Pieces → Combos →
  Payoff in columns) and `circular` (the legend as a hub).
- **My decks** (`#/decks`) — the saved-deck library, with a **visual editor** (`web/builder.ts`, #101:
  a card search with filters and click-to-add, not the raw textarea the Combos view still uses for
  pasting a list) and construction validation (`src/build.ts` → `checkBuild`, which reports
  `pass | fail | unknown` per rule). The Signature row is no longer `unknown`: Riot's gallery ships no
  marker for it, but #103 resolved it from two independent mirrors that agree on 51 names
  (`data/signature.src.json` → `Card.signature`), so 103.2.d and 103.2.a.2 now report `pass`/`fail`
  like every other rule. Import from Piltover Archive, export to deck code.
- **Plays** (`#/plays`, `#/plays/<slug>`) — the run plays, added by #206 (user decision, 2026-09-12).
  **Rendered markdown from `docs/plays/`, with no schema and no `data/plays.json`**: the value of a
  play is the prose and the verdict, and a `turns[]` array would carry the table and lose the
  reasoning between the rows. The markdown is the single source of truth; nothing is authored twice.
  **Withheld on 2026-09-19** (15 of 15 carried text addressed to another agent — a "For the manager"
  punch-list rendered beside the Riot disclaimer) and **republished on 2026-09-20** after all sixteen
  were edited for a reader; `test/plays-reader.test.ts` pins that standard, and the index shows the
  subject entry's name rather than its id (`scripts/web-plays.mjs`, resolved from `combos.json`).
- **Guide** (`#/guide`) — what the classes mean (INFINITE, BURST, CHAIN, ALT WIN, ENGINE) and how to
  read an entry.
- **Sources** (`#/sources`) — where each thing comes from: Riot's gallery API, the Rules Hub, the Core
  Rules, and the sources of each combo.

---

## 2. The numbers

| What | Value | Command |
|---|---:|---|
| Entries in the catalogue | **771** | `node -pe 'require("./data/combos.json").combos.length'` |
| Unverified | **0** | `node -pe 'require("./data/combos.json").combos.filter(e=>e.status!=="verified").length'` |
| By class | INFINITE 14 · BURST 23 · CHAIN 19 · ALT_WIN 27 · ENGINE 688 | `node -pe 'const a=require("./data/combos.json").combos,b={};for(const e of a)b[e.class]=(b[e.class]||0)+1;JSON.stringify(b)'` |
| Entries by card count (`uses.length`) | 1:26 · 2:468 · 3:194 · 4:53 · 5:17 · 6:5 · 8:2 · 11:1 | `node -pe 'const a=require("./data/combos.json").combos,b={};for(const e of a)b[e.uses.length]=(b[e.uses.length]\|\|0)+1;Object.keys(b).map(Number).sort((x,y)=>x-y).map(k=>k+":"+b[k]).join(" · ")'` |
| Entries declaring `anyBodies` | **84** | `node -pe 'require("./data/combos.json").combos.filter(e=>e.anyBodies).length'` |
| Distinct cards used by some entry | **897** | `node -pe 'const a=require("./data/combos.json").combos,s=new Set();for(const e of a)for(const u of e.uses)s.add(u.card);s.size'` |
| Sources cited | **2281** | `node -pe 'require("./data/combos.json").combos.reduce((n,e)=>n+(e.sources\|\|[]).length,0)'` |
| Synergy rules | **222** | `node -pe 'require("./data/synergies.json").synergies.length'` |
| Anchor–partner pairs produced | **5475** | `npm run synergies \| tail -1` |
| Printings in the pool | **1189** | `node -pe 'require("./data/cards.json").cards.length'` |
| Flat corpus lines | **947** | `wc -l < data/corpus_flat.txt` |
| Errata replacements | **52** | `node -pe 'require("./data/errata.json").entries.length'` |
| Legality rows (ban/restricted) | **21** | `node -pe 'require("./data/legality.json").entries.length'` |
| Hand walks archived | **108** | `ls docs/phase0/walks/*.md \| grep -v README \| wc -l` |
| Run plays | **16** | `ls docs/plays/*.md \| wc -l` |
| Tests | **710 in 52 files** | `npm test` |
| Adversarial check | exit 0 | `npm run adversarial` |
| Typecheck | clean | `npm run typecheck` |

All 766 entries are `verified`: somebody walked the loop by hand against card text and the Core
Rules, and left the walk document in `docs/phase0/walks/`. `candidate` still exists in the schema for
what comes out of a hunt and has not been walked yet, but there is none today.

---

## 3. Architecture, one layer per paragraph

**`src/` — pure logic, with tests.** Everything testable without a browser lives here, which is why it
is not in `web/`: `matcher.ts` (the six matching buckets: `included`, `includedByChangingLegend`,
`almostIncluded`, `almostIncludedByAddingDomains`, and the two combinations), `combos.ts` (catalogue
loading, `CLASS_RANK`, and the variant generator that flattens the `needs`/`produces` DAG), `deck.ts`
(list parsing in all its dialects, deck codes, `deckRestrictions(deck, cards, format)`), `plan.ts`
(`planDeck`, the "What to add" panel), `build.ts` (`checkBuild`, the nine construction rules),
`synergies.ts` (evaluates the predicates of `data/synergies.json` over the pool), `builder.ts`
(`poolOf`, `filterPool` and the deckbuilder arithmetic — **note that `checkBuild` is in `build.ts` and
the deckbuilder is in `builder.ts`; a session brief once had these swapped**), `cards.ts`
(`readableCardText`, which turns the cost symbols into readable text), `saved.ts`, `load.ts`,
`types.ts`, and two CLIs (`cli.ts`, `cli-synergies.ts`).

**`web/` — the interface.** `main.ts` builds the Combos view and an entry's drawer; `graph.ts` draws
the SVG diagram by hand (two layouts, closed-form trigonometry, no force simulation and no library);
`decks.ts` is all of My decks; `plays.ts` renders the run plays; `router.ts` is the hash routing and
the five views — **it is the only file that knows the view names, and `test/a11y.test.ts` imports
`VIEWS` from it rather than repeating the list**; `account.ts` and `supabase.ts` are the Google login
and the gate; `index.html`, `styles.css`, `privacy.html`, `terms.html`. **`public/` is a build
artifact of `web/`** — never edited by hand.

**`api/` — the only server code.** `api/deck-url.ts`, a Vercel Edge Function, proxies Piltover Archive
deck pages, which the browser cannot fetch because of CORS. Host allowlist, honest User-Agent, short
cache. Nothing else runs on a server. Its header notes it was ported from a Cloudflare Worker at
`web/worker.ts`; **that file no longer exists** — it was removed in `b241bc6`, "Move hosting from
Cloudflare Workers to Vercel".

**`data/` — four authored files, the rest generated or downloaded.** Authored: `combos.json` (the
catalogue, every entry by hand with its sources), `synergies.json` (220 pattern rules: the rule is
hand-verified, the instances are found by a text predicate over the pool), `legality.src.json` (the
ban list transcribed from Riot's Rules Hub by name, resolved to codes at build time) and
`signature.src.json` (#103: the 51 Signature cards, resolved from two independent mirrors that Riot's
gallery does not mark, carried into `Card.signature` at build time). Generated: `cards.json` and
`corpus_flat.txt`. Downloaded once and committed: `Riftbound-Core-Rules-2026-07-16.txt`,
`Riftbound-Tournament-Rules-2026-07-16.txt`, `cards_full.json`. `errata.json` is a dated find/replace
overlay whose build **fails** if a find-string stops matching exactly once per printing — that failure
is the only mechanism keeping our card text honest.

Two artifacts that are read by nothing and are easy to mistake for inputs (both confirmed by grep on
2026-09-13, answering #199):

- **`data/cards_full.json`** (1.3 MB) is a **snapshot**, not a build input. `scripts/build-cards.mjs`
  fetches from Riot's gallery API and writes `cards.json`; no file under `src/`, `web/`, `scripts/` or
  `test/` opens `cards_full.json`. It exists so a walk can grep Riot's raw payload by hand, which is
  how #103 established that the gallery ships no Signature marker.
- **`data/extract/*.jsonl`** (8 files, 444 KB) is a **superseded phase-0 artifact** with a README of
  its own. It is an abandoned attempt at reducing every card to structured primitives, and it is
  hand-derived rather than Riot text, so it must never be used as a source for card text or a walk.

**`scripts/` — the builds.** `build-cards.mjs` downloads the 6 pages of Riot's gallery API, applies the
errata, resolves legality and resolves `signature.src.json` → `cards.json` (with `Card.signature`) +
`legality.json`; `build-corpus.mjs` → `corpus_flat.txt`; `build-web.mjs` compiles `web/` into `public/`
with esbuild, baking in `SUPABASE_URL` and `SUPABASE_ANON_KEY` via `define`; `build-headers.mjs`
**generates `vercel.json`** (never edited by hand, because Vercel reads it before running the build
command, so it is committed); `check-rls.mjs` proves row isolation with two real users against the
hosted project; `adversarial-check.mjs` is the turn clock and the answer sweeps; `claude-md-gap.mjs`
joins the catalogue's rule citations against `CLAUDE.md`.

**`test/` — 710 tests in 52 files** with vitest (the 525/40 figure dated 2026-09-13). `headers.test.ts` is the one that watches the posture:
it fails if the `service_role` name or the database password appears anywhere under `web/`, if there
is more than one sign-in button, or if the `data-auth` default stops being `pending`.
**#138 (HIGH, ultrareview 2026-09-06)** found that day's whole DOM layer untested — no DOM environment
was installed at all, so nothing could mount `web/builder.ts`, the router, the gate or `web/decks.ts`.
Fixed by adding `happy-dom` as a `devDependency` and a per-file `// @vitest-environment happy-dom`
pragma rather than a global config, so the files under `test/dom/` opt in while every other test still
runs with no DOM and no per-test startup cost. `source-quotes.test.ts` proves every quoted passage is
verbatim against its source; `rule-refs.test.ts` proves every cited paragraph exists.

**`supabase/` — Auth and saved decks.** `config.toml` is the source of truth for Auth (site URL, the
allowed-redirect list, the Google provider with client and secret as `env(...)`) and is applied with
`supabase config push`; changing it from the dashboard puts the repo and the project out of step. Two
migrations: `decks.sql` and `delete_account.sql`.

---

## 4. How it deploys

**Production is at `beb15b2` since 2026-09-21** (sub-project A of the 2026-09-20 program plan: PR #223
merged, the branch's full history restored on the remote, 14 of 14 RLS checks on the hosted project,
`scripts/promote.sh` gate green, deploy read live once — 16 plays served, CSP and HSTS present — and a
signed-in smoke on production: Piltover URL import, save, rename, delete, the other deck untouched,
console clean). Before that it had served `88470b1` (2026-09-14) for a week.

**Deploying is a push to master.** The Vercel project has been connected to `GermanAbuArab/RiftCombo`
since 2026-09-05, so every push to master runs `npm run build:web` on Vercel **against the committed
tree** and goes to production. Check it with `npx vercel ls riftcombo`. `npx vercel deploy --prod`
still exists but uploads the working tree, which twice published another session's uncommitted files:
it is a fallback, not the normal path.

> ⚠️ There is no staging environment: any push to `master` deploys to production immediately, and the
> only configured Supabase project is also the production one.

**Since 2026-09-06, sessions push to `work` and only the orchestrator pushes `master`** — see
CLAUDE.md's "Deploy quota" bullet for the full rule (Vercel's Hobby cap is 100 deployments/day, scoped
to the whole account, and it has been spent more than once). Re-run `npx vercel inspect
https://riftcombo.app --logs` before trusting any claim that production is caught up; it is a photo,
not a guarantee.

The domain is **`riftcombo.app`**, bought on 2026-09-05 through Vercel (US$15/yr, Vercel nameservers).
`www.riftcombo.app` and `riftcombo.vercel.app` answer 308 to the apex, and that redirect is a
**project domain setting**, not a rule in `vercel.json` — a `redirects` entry with `has: host` was
tried first and never matched on a Git deploy.

The hosted Supabase project is `bpbwsimgiyxzaorunqeo` in `us-east-1` (the region Vercel deploys to).
Its **anon key is public by design** and ships in `public/app.js`; what keeps one player's rows away
from another is RLS, proved by `node scripts/check-rls.mjs` (14 checks, two real users, against the
hosted project). The `service_role` key and the password live in `.env.local` and reach nothing else.
**That guard runs nowhere automatic** (#199 §5) and cannot as written, because it needs live
credentials against the hosted project; run it by hand after any change to `supabase/` or to RLS.

Sign-in is a **full-page redirect**, and that is structural: `Cross-Origin-Opener-Policy: same-origin`
severs a popup from the window that opened it and the flow never reports back, with no error in any
console.

Verification before claiming anything works — all three:

```
npm test && npm run typecheck && npm run build:web
```

Read all three results, not just the exit code: a hang reports as a worker crash with neither a pass
nor a fail, so the gate is the exit code **and** the absence of the word `failed` **and** the presence
of a `Tests N passed` summary line.

`npm run dev` is **broken**: the Vercel project's Development Command is `npm run dev`, so `vercel dev`
rejects it as a recursive invocation. To look at the UI, serve `public/` statically
(`cd public && python3 -m http.server 8788`), which covers everything except the `/api/deck-url` route.

---

## 5. The process

**GitHub issues are the backlog.** Every named task becomes an issue immediately, labelled
`de-clone`, `ui`, `bug`, `data`, `legal` or `infra`. The body states what is wrong, the measured
evidence, the files and the dependencies. Issues are closed from the commit message (`Closes #N`); for
partial work, `Refs #N` — qualifying a `Closes` does not narrow it, and `Closes #23 for web/main.ts`
closed all of #23. `tasks/todo.md` is session scratch, not the backlog.

**How a combo enters the catalogue**, in three steps that are not skipped:

1. **Hunt by lens.** Pick an axis of the pool (a mechanic: `[Repeat]`, `[Hidden]`, `[Equip]`, tokens,
   movement, ready, draw, stun; or a data axis: domain, legend; or internet mining) and sweep the
   whole pool against it. A keyword lens opens with `grep -i <word>`, never with `[Keyword]`: the
   bracketed form misses every card that writes the mechanic in prose.
2. **Candidate issue.** The hunt produces an issue with the candidates, the refutations and the
   structural findings — as hypotheses, not as facts.
3. **Hand walk.** A session opens every cited rule in `data/Riftbound-Core-Rules-2026-07-16.txt` and
   every card text in `data/corpus_flat.txt`, with grep and verbatim, and writes the document into
   `docs/phase0/walks/`. Only then does the entry become `verified`. A structural verdict from an
   agent ("no X exists in the pool") is not accepted without walking it: the first hunt said there
   were no infinites and was wrong.

One owner of `data/combos.json` at a time, because all sessions share one working tree **and one
index**: commits are made with `git commit --only <paths>`, never from the staging area.

**Rules readings are numbered R1–R33 and recorded on issue #11**, which is the durable register of
which are ruled, which are open, and which were retired by finding the rule instead of asking. A
ruling never promotes an entry by itself: `verified` still requires a person to walk the loop.

**Synergies are a different thing and live in a different file.** `data/synergies.json` is *verified
rule, text-matched instances*: an anchor card plus a predicate over the pool, with `basis.rules` (Core
Rules paragraphs), `basis.readings` (R-numbers) and `basis.combos` (the entries it was extracted
from). It is kept apart from `combos.json` deliberately, because the value of `combos.json` is that
every row was walked by hand, and a text-matched row in there would destroy that invariant. The UI
says so in its own words and never presents a pair as a combo.

**Run plays are documents, not data** (#206). They live in `docs/plays/` as markdown and are rendered
at `#/plays`; a play links to a combo entry by naming its id in the prose, and the convention is to
**name the subject entry before citing any other**, because position separates subject from digression.

---

## 6. The walks

The full index — date, issue, entries it left behind — is in
[`docs/phase0/walks/README.md`](phase0/walks/README.md).

**85 walk files exist on disk today (`ls docs/phase0/walks/*.md | grep -v README | wc -l`); that
README's own table lists 62 of them.** This session owns `docs/status.md`, not
`phase0/walks/README.md`, so the missing rows are recorded here instead of being merged into that
file — whoever next owns the README should fold this table in and delete it from here. **The table
below covers 18 of them and is itself now behind: five more walks have landed since 2026-09-09.**

| Date | File | Issue | What it did |
|---|---|---|---|
| 09-06 | `2026-09-06-engine-payoff-walk.md` | #159 (candidates from #155, #154) | The engine × payoff candidates and the tournament cores: 8 entries authored, 6 refusals recorded, 1 reclass proposed, 2 hunt errors corrected, 1 open lead handed on. |
| 09-06 | `2026-09-06-finisher-feeders.md` | #161 | Mirror of #155's engine-side pass: for each of the catalogue's 36 finishers (18 ALT_WIN, 12 BURST, 4 CHAIN, plus two same-day Grand Plaza wins), asks which uncatalogued in-domain feeder changes the ledger rather than just restating it. |
| 09-06 | `2026-09-06-orphan-synergy-rules.md` | #153 | Of the then-96 hand-verified synergy patterns, 55 had an empty `basis.combos`; this walk asks, for each, whether the anchor plus a partner plus two or three more in-domain cards reaches a repeat step or a scoring event. |
| 09-06 | `2026-09-06-proven-rule-instances.md` | #160 | Of 66 synergy rules already proven to terminate in at least one combo (2,090 reviewed partner slots, only 180 pairs in `combos.json`), prices the unwalked remainder. |
| 09-07 | `2026-09-07-families-rows-6-18.md` | #169 | Second pass on rows 6–18 of the cause/trigger matrix (discard, stun, hide, choose-friendly families); adds the Nami exception to "a Hold-triggered ready is a no-op". |
| 09-07 | `2026-09-07-families-rows-19-47.md` | #168 | Second pass on rows 19–47 of the same matrix: several rows collapse into notables on existing entries by shared mechanism/arithmetic; three disempowerer partners refused because they hit enemy permanents or reset themselves. |
| 09-07 | `2026-09-07-orphan-remainder.md` | #193 | Successor slice to #180/#186/#188 (mono-Order, mono-Body, Calm/Mind closed); closes the remaining orphan cards and states the "does this engine's payoff need an enemy garrison?" test that bounds every Time-Warp-chained conquer engine. |
| 09-07 | `2026-09-07-rules-second-pass.md` | #170 | Second pass on the orphan and under-walked synergy rules; extensive rules citations (204.3.a, 416.1.c, 466.5 ordering) and the four-tag (Bird/Cat/Dog/Poro) population measurement (61 cards, none carrying two tags). |
| 09-07 | `2026-09-07-uncatalogued-body.md` | #186 | The uncatalogued mono-Body cards, successor to #180; closes the lane 137/137. |
| 09-07 | `2026-09-07-uncatalogued-calm-mind-order.md` | (lane split with `rc-walk-uncat`) | The uncatalogued Calm/Mind cards (plus any multi-domain card mixing Order with Calm or Mind); Order-only cards handed to the sibling walk. |
| 09-07 | `2026-09-07-uncatalogued-cards.md` | #171 | The deckable cards in no entry: battlefields first, then legends, then the rest; closes all 64 non-token battlefields and all 49 legend names catalogued, staged or refused by rule. |
| 09-07 | `2026-09-07-uncatalogued-fury-body-chaos.md` | #173 | The uncatalogued Fury/Body/Chaos cards; closes that slice (39 entries across batches plus ten orphan dual-domain Signature spells) and pins the base-code-vs-name+type census method. |
| 09-07 | `2026-09-07-uncatalogued-order.md` | #180 | The uncatalogued mono-Order cards, successor to #171; closes the lane 139/139. |
| 09-07 | `2026-09-07-uncited-rules-blocks.md` | #187 | Measures that 207 of the Core Rules' 385 top-level numbers are cited by nothing in `combos.json`/`synergies.json`, then walks the mechanically-rich blocks (432 Doubling, 433 Swapping, 465.2.c.6–.c.10 Backline/Tank ordering, 734–738 Additional Turns). |
| 09-07 | `2026-09-07-uncited-subrules-500-899.md` | #191 | Successor to #187, one level down: every `NNN.x.y` sub-rule heading in 500–899 with a worked `Example:` line that nothing cites; also the `grep "^NNN\."` form-feed trap (112 headings including 718 are invisible to a bare `^` anchor). |
| 09-09 | `2026-09-09-citation-audit.md` | #137 | Audits the 774 `riot`-type sources in `combos.json`: 1,358 quotes verbatim, 7 truncated, 7 paraphrased and repaired; confirms no Core Rules worked example is misattributed as the paragraph itself; 11 external-page quotes (ban-list posts, set FAQs) can't be checked from files this repo ships. |
| 09-09 | `2026-09-09-produces-tagging.md` | #157 | Tags the untagged ENGINE entries (measured at 102 of 714, then 715, all class ENGINE) with `produces` values — four reused, five new (`combat-might`, `board-protection`, `tempo-denial`, `unit-delivery`, `xp-engine`) — so the drawer and the diagram show a payoff for entries that previously showed none. |

---

## 7. What is open today

| Issue | What |
|---|---|
| #187 | Walk: the Core Rules blocks this catalogue has never cited |
| #191 | Walk: uncited Core Rules sub-rules 500–829, mined by worked example |
| #200 | Synthesise combos and run plays instead of only extracting them |
| #218 | `bodyCheck`'s approximation fails flattering, and the mitigation that covers it is one edit from disappearing |

`gh issue list --state open` is the live list; **this table is a photo of 2026-09-20 and goes stale
the way every count here does.** Closed since the 2026-09-13 photo: #137, #143, #195, #196, #198,
#199, #201, #205, #206, #207, #216, #217, #219, #220, #221, #222.

The mechanic lenses are all swept, as are the six unit-domain hunts (Order / Fury / Chaos / Body /
Calm / Mind) and the legend hunt, so what remains open is residual: pending citations, two veins of
never-cited rules, and quality audits over the newest entries. **The card vein is spent** — roughly
926 deckable names with only a few dozen walkable ones left — which is why the rules file replaced it
as the source of new work, and why #200's synthesis direction (design from a target rather than from
a card) is the standing brief rather than another lens.

---

## 8. Plan items closed or deferred, 2026-09-20

`docs/plan.md` (2026-09-02) and the 2026-09-02 `tasks/todo.md` still carried unchecked items for the
app. Session rc-manager13 closed each one or deferred it here with the reason; `tasks/todo.md` now
holds that session's own plan. The UI/UX review that went with it is
[`docs/reviews/2026-09-20-ui-ux-review.md`](reviews/2026-09-20-ui-ux-review.md) (9 findings fixed,
8 deferred with reasons, all on this branch).

| Item | Disposition |
|---|---|
| todo §3: re-run the hunt agents L1–L6, refute pass, "Lux and Recruits rediscovered by an agent" | **Superseded.** The lens hunts and the 108 hand walks replaced the agent re-hunt entirely (§5 above); the catalogue holds 771 verified entries including both loops. Nothing to re-run. |
| todo §5: esbuild bundle, paste / code / URL → buckets → SVG, Riot disclaimer, CSP/COOP | **Done** (Vercel replaced the Worker in #12; `test/headers.test.ts` pins the headers and the disclaimer). |
| todo §5: "renders the Lux fixture legibly at 375px and 1280px" | **Done 2026-09-20** in the review: screenshots at both widths, console clean. |
| todo §6: name plates overlapping the qty badge; combo names truncated in route boxes; circular + drawer + near misses in a browser; mobile pass at 375 | **Done 2026-09-20**: not reproducible / wrapped since the graph model gained `lines` / all walked in the review. |
| todo §6 and plan D1/D2: Riot API key application; card images | **Deferred — user decision.** Images come from Riot's own `cmsassets` URLs as returned by the gallery API (the source of the text too); applying for `riftbound-content-v1` is the owner's call and was never on the critical path (plan §5, option A). |
| todo §6: deploy via `wrangler login` and set the GitHub remote | **Done long ago** (Vercel from a push to `master`, repo public); the line was obsolete. |
| plan Phase 3: pan/zoom, PNG export, theme-aware | Pan and zoom exist (`web/graph.ts`). **PNG export and a light theme deferred**: neither was requested after 2026-09-02, the site is dark by decision (CLAUDE.md "UI — visual identity"), and export is a feature, not a gap. |
| plan Phase 4: rate limiting on `/api/deck-url` | **Deferred.** The proxy has a host allowlist, an honest User-Agent and a short cache; Vercel's Edge runtime has no shared state for a counter without adding a store. Recorded in #199's loose ends. |
| rc-manager10 §5.1: HSTS `includeSubDomains` | **Deferred — user decision** (a two-year commitment for every future subdomain). |
| rc-manager10 §5.3: the off-domain reason in the pool is tooltip-only | **Deferred** (review D5); the `Not <tag>` Signature badge does render and is pinned by `test/dom/builder.dom.test.ts`. |
| rc-manager11 §4.3: the Neon migration | **Out of scope for this branch** — ceded to the `neon-migration` worktree and its spec (`docs/superpowers/specs/2026-09-19-neon-migration.md`), which rc-manager12 finished reviewing; it needs the owner. |
| rc-manager11 §3: URL import happy path | **Untestable locally** — needs `/api/deck-url`, which exists only on a Vercel deploy (`vercel dev` self-recurses, §4). The error path and the empty-URL guard are tested. |
