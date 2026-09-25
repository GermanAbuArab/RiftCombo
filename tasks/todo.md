# RiftCombo — todo (session rc-neon4, 2026-09-25)

Neon migration, steps still open up to 8b, on the us-east-1 project `quiet-breeze-27436036`
(branch `main` = `br-wandering-haze-av7v6x9v`). Worktree `/private/tmp/rc-neon3`, branch
`neon-migration`, starting at `f6f0bf5`. Plan: `docs/superpowers/plans/2026-09-21-neon-migration-plan.md`.

Hard stops: nothing deleted or paused (Neon projects, the sa-east-1 orphan, Supabase, branches,
data); no Vercel env, no deploy, no merge; O2/O3 are the owner's.

## Steps

- [x] **R3. The two `riftcombo` projects (review finding 3).** Confirm §0 names the us-east-1 one.
      → verify: `neonctl projects list --org-id org-billowing-dawn-47109886` →
      `quiet-breeze-27436036 riftcombo aws-us-east-1` and `round-waterfall-07137684 riftcombo
      aws-sa-east-1`; §0 of the plan names `quiet-breeze-27436036` (f6f0bf5 did it). The step BODIES
      still named the sa-east-1 ids in six places — fixed in this session (item below).
- [x] **R5. Distinct owners on Supabase (review finding 5), read-only.**
      → verify: `node .scratch-neon/count-owners.mjs` → `status 200 | decks total(header) 2 | rows
      arrived 2 | distinct user_id 2 | auth users 7`; `node .scratch-neon/owner-identities.mjs` →
      both owners have exactly one identity, Google, numeric sub. Count is 2, so the staging design
      (0004) stands and the one-line re-key does not apply.
- [x] **Neon main is empty and ready.**
      → verify: psql on main → `staged:0 decks:0 users:0 profiles:0`, FK
      `REFERENCES neon_auth."user"(id) ON DELETE CASCADE`, `claim_staged_decks` and `delete_account` present.
- [x] **Plan body: replace the stale sa-east-1 ids and the obsolete O1-region paragraph.**
      → verify: `grep -n "round-waterfall\|br-tiny-bird\|sa-east" <plan>` returns only the lines
      that name the orphan as retired. RAN: two hits, line 17 ("retired") and the O1 paragraph now
      prefixed "Settled 2026-09-21 — kept for the record".
- [x] **Step 8, rehearsal on a throwaway Neon branch** (not main: a run on main now would strand any
      deck saved on Supabase before cutover, and undoing it is a delete). Run the real script
      `scripts/stage-supabase-decks.mjs` against a child branch of main, export outside the repo.
      → verify: script prints `supabase decks: 2 from 2 owners | staged on Neon: 2` and exits 0;
      staged google_sub set = the two owners' subs (count of distinct = 2); export file mode 0600
      outside the repo; `select count(*) from public.decks` still 0 on main.
      RAN on `br-aged-term-avkxc7iw`: `supabase decks: 2 from 2 owners | staged on Neon: 2`, exit 0;
      `staged:2 distinct subs:2 numeric subs:2`, branch `public.decks` 0; export 0600 in
      `~/riftcombo-exports/`; main `staged:0 decks:0`; re-run refused `already holds 2 rows`, exit 1,
      no export written.
- [x] **Step 8, the production run is written as the first command of the O2 sequence** (it must run
      at cutover, immediately before the deploy), with its verify. Done: plan section "Step 8 at cutover".
- [x] **Step 8b.** A scan exists (`security_runs/RiftCombo_3ba7df34`, completed 2026-09-24T20:14Z,
      3 findings, 0 blocking), newer than every commit it covered. Triage it in writing in the plan.
      → verify: run.json `status: completed`, end_time later than the newest scanned commit;
      triage table committed; the gate hook accepts it (checked by the push-time hook, not bypassed).
      RAN: run.json `completed`, end 2026-09-24T20:14Z (17:14 -03) after f6f0bf5 (16:43 -03) and
      the merge-base (15:36 -03); report.md non-empty; triage table in plan Step 8b. This session
      changed docs only, so no new scan is owed.
- [x] **Gates** at the final sha: typecheck 0, `npm test` exit 0 with a `Tests N passed` line and no
      `failed`, `build:web` 0.
      RAN: typecheck 0; `npm test` exit 0, `Tests 749 passed (749)`, 55 files, 0 `failed`; build:web 0.
- [ ] **Handoff** `docs/handoffs/2026-09-25-rc-neon4.md`, committed; `git status` clean.
