# RiftCombo — todo (session rc-manager13, 2026-09-20)

Baseline before any change (worktree at `991ce48`): `npm test` 707 passed / 51 files, exit 0 ·
`npm run typecheck` exit 0 · `npm run adversarial` exit 0.

## A. Disposition of the 2026-09-02 todo (the previous contents of this file)

Every item that was still unchecked is either done by later work or deferred with a written
reason in `docs/status.md` §8. Summary:

- §3 re-hunt / refute pass / rediscovery → SUPERSEDED (the lens hunts and 108 hand walks replaced
  it; 771 verified entries). Deferred-with-reason in status §8.
- §5 esbuild bundle, UI (paste / code / URL → buckets → SVG), disclaimer + CSP/COOP → DONE (Vercel
  replaced the Worker; `test/headers.test.ts` pins the headers and the disclaimer).
- §5 "renders the Lux fixture legibly at 375px and 1280px" → item C below.
- §6 polish (name plates vs qty badge, truncated route names, circular + drawer + near misses in a
  browser, 375px pass) → item C below.
- §6 D1/D2 (Riot API key / card images) → user decision, deferred in status §8.
- §6 deploy → done (Vercel, push to master); the wrangler line is obsolete.

## B. Open app items (from docs/plan.md, tasks/todo.md and the two 2026-09-19 handoffs)

- [x] B1. Run plays: edit the 16 plays for a reader (remove sections addressed to another agent,
      reword lane/manager language) → verify: `grep -lE '\b(lane|manager|rc-[a-z]+[0-9]*|not mine)\b' docs/plays/*.md` is empty.
- [x] B2. Pin it: a test asserts no play carries fleet language or a "For the manager" section →
      verify: test fails when a fixture line is injected (proved out of band), then passes.
- [x] B3. Republish: `PUBLISH_PLAYS = true`, restore the four nav links + the Guide bullet, delete
      the `plays` exception in `test/a11y.test.ts` → verify: `public/data/plays.json` lists 16 plays;
      `npm test` green.
- [x] B4. Signature "Not <tag>" badge (rc-manager10 §5.3): DOM test that an in-domain, wrong-tag
      Signature card shows the badge → verify: test passes (fix the cell if it fails). Result: it
      renders; the case rc-manager10 looked at was an OFF-DOMAIN card, where the badge is hidden by
      the 2026-09-06 decision. Test pins both.
- [x] B5. Gates → verify: `npm test && npm run typecheck && npm run adversarial` all exit 0, output
      shown in the final report.

## C. UI/UX review (gstack:design-review, local build only)

- [x] C1. Build with `SUPABASE_URL=` (open mode), serve `public/` statically, review at 375 and
      1280 with playwright-cli: Combos (Lux fixture, tray, drawer, circular, near misses), My decks
      + builder, Plays, Guide, Sources, privacy/terms → verify: screenshots in `.playwright-cli/`,
      console clean.
- [x] C2. Fix what is fixable in this session; write the rest to
      `docs/reviews/2026-09-20-ui-ux-review.md` → verify: file exists with findings + fixed list.

## D. Close

- [x] D1. `docs/status.md`: re-photograph the numbers at the final sha; add §8 "Plan items closed
      or deferred, 2026-09-20" → verify: every unchecked item of the old todo and of plan.md §4–5
      is named there.
- [x] D2. Commit with `git commit --only`, run the security-scan skill (the repo's `.security-gate`
      asks for it before a push), push, open the PR against `infra-audit-fixes-2026-09-13` →
      verify: `git status` clean, PR URL.
