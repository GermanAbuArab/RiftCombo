# Multi-agent review of 2026-09-06

A five-reviewer pass over everything that landed on `master` on 2026-09-06, run in one session
(`rc-review`) with five parallel subagents. Every finding below was re-verified by hand before it was
filed — a subagent's finding entered this document only after the file was opened and the repro run.
One of them was **rejected on verification**, and it is recorded here with the others, because the
proposed fix would have broken the build.

## Scope

| | |
|---|---|
| Base | `2b8ffad`, the last commit before 2026-09-06 |
| Head | `97988e4` at the time of writing (the branch moved during the review; see below) |
| Commits | 148 |
| Diff | 308 files, +43,955 / −1,736 |
| Code only (`web/ src/ test/ scripts/ supabase/ api/`) | 261 files, +13,400 / −313 |

What shipped that day: the sign-in gate (#39), the custom domain (#42), My decks (#43), a hash router
and real tabs, the visual deckbuilder (#101, #104, #109, #112, #113), the Signature overlay (#103),
parser fixes (#86, #87, #90), the needs/produces vocabulary (#64), a tournament-list fixtures test
(#88), an accessibility pass (#75–#84), the Vercel ignore step, and roughly ninety catalogue and
synergy commits.

The review read the **committed** tree. `master` moved seven times during the pass because another
session (`rc-qa5`) was working in the same worktree; reviewers were told which files were dirty and
read those with `git show origin/master:<path>`.

## Method

Five reviewers ran in parallel on Sonnet, each with a written brief naming its files, the specific
defect classes to hunt, and a required output shape (claim → pasted repro → expected → fix →
confidence). Lanes:

1. **Deck logic** — `src/deck.ts`, `build.ts`, `builder.ts`, `saved.ts`, `plan.ts`
2. **Security and privacy** — `web/account.ts`, `supabase/`, `scripts/build-headers.mjs`, XSS, RLS, CSP, secrets
3. **UI and accessibility** — `web/*.ts`, `web/styles.css`, contrast, keyboard, the visual-identity rules
4. **Data integrity** — `scripts/build-cards.mjs`, the `data/` files and their schema invariants
5. **Tests and build** — coverage holes, vacuous assertions, determinism, type-safety holes

Each reviewer was read-only. Fixes were made only by this session, only in `scripts/`, `supabase/`,
`docs/` and new `test/review-*.test.ts` files. Everything in `web/` and `src/` was filed as an issue
for `rc-qa5`, which owns those paths, and reported to it directly.

Baseline on the reviewed tree: **318 tests across 17 files, all passing**; `npm run typecheck` clean.
(314/16 before this session added two test files.)

## Findings

### Fixed in this pass

**#126 — HIGH — the Vercel ignore step silently skipped real deploys.** `d3ef269`

`0f0ab6f` added `ignoreCommand: git diff --quiet HEAD^ HEAD -- web src data scripts …`. Three defects,
each verified:

- Vercel creates one deployment for the **head commit of a push**, so `HEAD^ HEAD` is blind to every
  other commit that push carried. Today's own history has the shape: `55e24f3` changed
  `data/combos.json`, and the next commit `793ebad` changed only `CLAUDE.md`. Evaluated at `793ebad`
  the command exits `0` — skip — while the range `07c373a..793ebad` contains `data/combos.json`. Pushed
  together, the catalogue change would never have reached the site, with no error anywhere.
- `api/` was not watched at all, so a fix to `api/deck-url.ts` — the live serverless route — would
  never deploy.
- **The premise was false.** Vercel: *"Canceled builds are counted as full deployments … any canceled
  builds initiated using the ignore build step will still count towards your deployment quotas."* The
  change could not relieve the 100-deployments/day cap it was added for. It saves build minutes only.

Fixed with `${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}` — *"the git SHA of the last successful deployment for
the project and branch"*, exposed precisely when an ignore step is set — plus `api` in the pathspec and
a corrected comment. Diffing from what was last *deployed* cannot skip anything still undeployed.

**CSP `object-src 'none'`.** `6d2477c` (content swept into `68e2752` by a concurrent commit)

`default-src 'self'` already covered plugin content, but its fallback is `'self'`, not `'none'`. Also
pinned `script-src`, `object-src`, `base-uri` and `form-action` in a test: `test/headers.test.ts` pins
COOP and `connect-src` because those break the app when they move, whereas these four weaken without a
symptom.

**`resolveLegality` must not insist on one base — and the comment said it did.** `d0c428d`

See *Rejected*, below. The comment was the defect; a test now pins both the fact and the asymmetry.

**Preview deployments off for every branch but `master`, and the shared `work` branch.** `59606ff`, `97988e4`

Requested by the orchestrator mid-review, implemented in the generator and regenerated. Recorded here
with its honest limit: `*/*`, `*/**` and `work` do not cover an *unslashed* branch name, and Vercel's
default for an unmatched branch is enabled — the only pattern catching them all is `"*": false`, which
also catches `master` and would switch production off.

### Filed for `rc-qa5` (`web/`, `src/` — not this session's paths)

| # | Severity | Finding |
|---|---|---|
| #132 | HIGH | A `0` or negative count corrupts every rule that iterates the deck bag |
| #133 | HIGH | A Legend pasted under "Champion" is certified a legal Chosen Champion |
| #128 | HIGH | The card-detail modal has no keyboard entry point anywhere in the app |
| #129 | HIGH | The Construction verdict and all four status lines are never announced |
| #134 | MEDIUM | `championTagSet` caches globally instead of per `CardIndex` |
| #135 | LOW | `planDeck` treats *restricted* as *banned*; unresolved lines lose their section |
| #130 | LOW | `esc()` is triplicated, escapes no `'`, and nothing tests it |
| #131 | LOW | Three off-scale corner radii, a dead `--panel-3`, a stale palette in CLAUDE.md |

The two most serious are worth restating, because both defeat `checkBuild`, which is the app's entire
answer to *is this deck legal*:

- **#132.** `src/deck.ts:117`'s `add` sums with no guard, while `src/builder.ts:295`'s `bump` — the
  click path — already does `if (n > 0) … else delete`. So `0 Clockwork Keeper` puts a key with value
  `0` in the bag, and `checkBuild` reports `103.1.b fail — Outside fury + mind` for a card the deck does
  not contain; `deckRestrictions` likewise reports a banned card at count 0, in the panel a player
  checks before a tournament. And a negative count cancels real copies: a deck holding five copies
  reports `103.2.b pass`. `parseDeckText` cannot emit a negative, but `decodeDeckCode` and the Piltover
  import can — the untrusted boundary.
- **#133.** `championRule` checks the champion tag and the Signature flag but never the card's *type*,
  so a Champion Legend named under "Champion" passes 103.2.a.2, and `normalizeDeck` also adds it to
  `deck.main`, inflating the 40-card count. The click builder is immune; only the text path — paste,
  deck code, URL import — has the hole.

### Filed as data debt

| # | Severity | Finding |
|---|---|---|
| #136 | LOW | The errata "already reprinted" skip is a content heuristic, not the two documented cards |
| #137 | LOW | 20 external citations across 12 verified combos have no `accessed` date |

#136 was filed rather than patched on purpose: `scripts/build-cards.mjs` cannot be exercised without
`npm run build:data`, which hits Riot's gallery API and rewrites files another session owns. Changing a
build script that cannot be run in the same pass is not a trade worth making.

### Rejected on verification

**"`resolveLegality` is missing `resolveSignature`'s single-base throw."**

A reviewer noticed that `resolveSignature` throws when a name resolves to two or more base codes while
`resolveLegality` does not, and proposed adding the throw. Checking the pool first:

```
card NAMES spanning 2+ base codes: 104
   vi, destructive   -> OGN-036, VEN-167
   ahri, inquisitive -> OGN-119, SFD-227, VEN-SP3
   kai'sa, survivor  -> OGN-039, VEN-SP1
```

A ban is on the **card**, so it has to reach every printing family of it. Collecting `bases` as a set
is the required behaviour. The proposed throw would fail the build the first time a reprinted card is
banned, and "fixing" that by taking `bases[0]` would leave the reprint quietly legal.

The reviewer was led there by a comment in the file asserting *"the same discipline resolveLegality
already applies"* — a sentence that was wrong and that actively invited the wrong change. That comment
was the real defect and is fixed, with a test pinning both the fact about the pool and the asymmetry.

The asymmetry is a live risk in the *other* direction, now recorded in the code: the day a Signature
card is reprinted under a second base, `resolveSignature` throws and the build stops until someone
decides whether Signature is a property of the card or of the printing. None of the 51 spans two bases
today.

## What the reviewers claimed that could not be verified

Stated explicitly, as required:

- **Live Piltover Archive quantity semantics.** Whether the upstream API can emit a `champions` entry
  whose quantity double-counts against a separate `maindeck` entry for the same card. Only the static
  fixture was exercised; the live API was not called.
- **A second `CardIndex` in production.** #134's cache bug needs two indexes in one process. No call
  site outside the reviewed files was audited for that, so the *live* impact remains unproven — the
  repro is synthetic, and the finding is filed on the inconsistency, not on an observed failure.
- **The REFUTE/WOUNDED note sweep in `data/combos.json`.** 162 raw regex hits; roughly six entries were
  hand-checked, not all of them. A full audit that every "corrected numbers" note matches its entry's
  current `class`/`uses`/`terminatesIn` was out of budget. This is the failure mode CLAUDE.md names by
  hand — *grep for corrections that were diagnosed and never applied* — and it is **not** discharged by
  this review.
- **Synergy match lists read line by line.** Counts and the enforcement mechanism were checked; the
  ~2,568 anchor–partner pairs were not read individually, so "a rule that is a fact about the pool
  rather than a pairing" cannot be ruled out below the 150 cap.
- **Off-screen keyboard focus in the diagram** (a11y finding 4, not filed): reasoned from the pan/zoom
  code, never observed in a browser, because this pass was static by instruction.
- **Google's redirect-URI allowlist** and Supabase Auth rate-limiting/CAPTCHA settings: both live
  outside the repo and were not inspected.

Two corrections to this session's own framing, both settled by evidence rather than argument:

- The brief asked reviewer 5 whether committed `public/` matches a fresh build of `web/`. `public/` is
  in `.gitignore` and `git ls-files public/` is empty — it is a pure build output. That risk does not
  exist, and the question was withdrawn.
- A resume message for the tests reviewer was misrouted to the data reviewer. It correctly declined to
  pivot and finished its own brief. Recorded because the failure mode — an agent silently obeying a
  redirect meant for someone else — would have cost the whole data lane.

## What was checked and found correct

Worth recording, because a review that only lists defects misrepresents the tree.

- **RLS.** Verified directly, not taken on report. `public.decks` has RLS enabled with four policies all
  keyed on `auth.uid() = user_id`; `insert` carries `WITH CHECK`; `update` carries both `USING` and
  `WITH CHECK`, so a row's `user_id` cannot be repointed. `delete_account()` is `SECURITY DEFINER` with
  `set search_path = ''`, execute revoked from `public` and `anon`, granted only to `authenticated`.
  This is correct, and it is the property the whole account layer rests on.
- **No secrets.** No `service_role`, no JWT-shaped string, no password-bearing Postgres URL in the tree
  or in full history. `.gitignore` covers `.env*`.
- **XSS.** Every `innerHTML`/`insertAdjacentHTML` site was traced by hand; every user-derived string is
  escaped, and the one raw pasted field reaches only `.textContent`. No `eval`, no `new Function`, no
  string-form `setTimeout`. #130 is about the missing guard rail, not a live hole.
- **SSRF.** `api/deck-url.ts` pins the protocol to `https:`, allowlists the hostname through WHATWG
  `URL.hostname` (so the `user@host` trick fails), and regex-pins the path.
- **The web payload field gap** that shipped twice (#27, #103) is closed: every field `src/` reads at
  match time or in `checkBuild` is in `scripts/web-card-fields.mjs`. The guard is still two
  hand-maintained arrays, so it depends on someone remembering — but it is currently correct.
- **BURST arithmetic.** All twelve recomputed from their own declared quantities; all reach 8+. The four
  the 2026-09-04 audit found short are confirmed fixed.
- **Domain Identity across all combos**, duplicate ids, unknown codes, and the INFINITE-needs-a-repeat
  rule: all clean and all enforced by `validateCombos`.
- **Round-trip** `deckEntries → deckToText → loadDeck` is lossless across all 225 fixture decklists.
- **The copy cap counts by name across reprints**, and runes and battlefields are kept out of it —
  the trap that would declare every legal deck illegal.
- **Accessibility.** `test/a11y.test.ts` is genuinely strong: it recomputes contrast from the live CSS
  custom properties rather than repeating numbers, pins the single focus ring and its two legitimate
  exceptions, and pins the overlay's focus trap and restore. The deckbuilder uses real buttons,
  `aria-disabled` rather than `disabled` so capped cells keep their reason, and arrow-key grid
  navigation. #128 and #129 are gaps beside that work, not evidence against it.

## The five biggest risks in the codebase as it stands

1. **`checkBuild` can be made to lie, and it is the product's core claim.** #132 and #133 are two
   independent ways to get a wrong legality verdict, both through the text-parsing path — paste, deck
   code, Piltover import — which is how every list from outside arrives. The root cause of #132 is one
   unguarded line that the click path already guards correctly.
2. **The catalogue's honesty rests on hand-walks that no test can check.** 236 entries are `verified`,
   and `verified` means a human walked the loop. The mechanisms that keep that true — the errata
   overlay's exact-match failure (#136), the `accessed` discipline (#137), the REFUTE-note sweep that
   this review could not finish — are all convention rather than enforcement. The known failure mode is
   a correction diagnosed in a note and never applied to the entry.
3. **Deploy correctness is invisible when it breaks.** #126 was found by reading, not by a symptom: a
   skipped deployment produces no error, and the site simply sits a commit behind. The class survives
   the fix — anything gating deploys on a heuristic fails this way, and there is no check anywhere that
   the live bundle matches `master`.
4. **One working tree, several sessions, one index.** During this review a concurrent commit swept this
   session's uncommitted `object-src` change into an unrelated commit with a message that does not
   describe it. `git commit --only` prevents the reverse case but not this one, and the history now
   contains a commit whose message and diff disagree. The `work`-branch batching added mid-review helps
   the deployment quota, not this.
5. **The guard rails are hand-maintained lists.** `scripts/web-card-fields.mjs` is an array someone must
   remember to extend — the gap it exists to prevent shipped twice already. `esc()` is copy-pasted three
   times with no shared source and no test (#130). Both are correct today and neither is enforced by
   anything that fails when someone forgets.

## Process note

40 of the 148 commit subjects from 2026-09-06 are in Spanish, against the "Everything in English" rule
set the same day. History is not worth rewriting; the rule now holds going forward.
