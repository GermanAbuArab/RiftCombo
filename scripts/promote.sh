#!/usr/bin/env bash
#
# Promote a PINNED SHA to master, behind a gate that WITHHOLDS THE PUSH.
#
# Usage: scripts/promote.sh <sha>            # gate, then push if green
#        scripts/promote.sh <sha> --dry-run  # gate only, never push
#
# WHY THIS EXISTS, and why the shape matters more than the checks.
#
# On 2026-09-13 a manager promoted a RED sha to master. The gate had already said so: it printed
# `exit 1` and `2 failed | 664 passed`, and then ran `git push` anyway, because the push was the NEXT
# STATEMENT rather than a CONSEQUENCE of the result. A gate whose output you have to read is a report.
# A gate that withholds the action is a gate. Every check below feeds one `if`, and the push lives
# inside it; there is no path to the push that does not pass through the verdict.
#
# WHY A PINNED SHA AND NEVER A MOVING REF. Up to six sessions share one working tree and push to
# `work` every few minutes. A manager who gates `origin/work` and then pushes `origin/work` may push
# something it never tested: on the first promotion of 2026-09-13 a lane pushed between the fetch and
# the worktree creation. The sha is the only thing that means the same thing twice.
#
# WHY A THROWAWAY WORKTREE. The shared tree is mid-edit by construction, so a suite run in it answers
# a question about nobody's committed state. A coherent change spanning two files is INCOHERENT at
# every instant between the two writes, which is how a lane once got a red on a file it did not own
# at a sha where the suite is green. `git worktree add --detach` at the pinned sha costs under a
# minute and is the same instrument the promotion gate needs anyway.
#
# WHY THREE TEST CHECKS AND NOT ONE. Each catches what the others cannot:
#   exit code    - a hang, a crash, a missing script
#   the word     - a red test in a suite that still summarised (`npm test | grep Tests` once matched
#   "failed"       a line reading "2 failed | 467 passed" and shipped red twice)
#   the summary  - a run that ended WITHOUT reporting. A worker crash prints "Worker exited
#     line        unexpectedly" and no failure at all; fed that log, a two-check gate returns GREEN.
#
# AND A RED GATE IS A QUESTION BEFORE IT IS AN ANSWER. Under fleet load a TIMEOUT reads in the log
# exactly like a failed assertion. The script says which it saw, because the two demand opposite
# responses: an assertion is a defect to fix, a timeout is a budget to widen on a test whose cost is
# the point of it.
set -uo pipefail

SHA="${1:-}"
DRY="${2:-}"
[ -n "$SHA" ] || { echo "usage: scripts/promote.sh <sha> [--dry-run]"; exit 64; }

REPO="$(git rev-parse --show-toplevel)"
cd "$REPO" || exit 1

git fetch origin --quiet || { echo "GATE RED -> REFUSING TO PROMOTE: fetch failed"; exit 1; }

# Resolve ONCE, and report it. A sha that does not resolve, or that is not an ancestor of what we are
# promoting from, is a typo we want to die on rather than a ref we want to guess at.
FULL="$(git rev-parse --verify "${SHA}^{commit}" 2>/dev/null)" || {
  echo "GATE RED -> REFUSING TO PROMOTE: $SHA does not resolve to a commit"; exit 1; }
SHORT="$(git rev-parse --short "$FULL")"
echo "# promoting PINNED sha $SHORT"
echo "#   origin/master  $(git rev-parse --short origin/master)"
echo "#   origin/work    $(git rev-parse --short origin/work)"

if git merge-base --is-ancestor "$FULL" origin/master; then
  echo "# $SHORT is ALREADY an ancestor of origin/master - nothing to promote."; exit 0
fi

WT="/tmp/rc-promote-$SHORT-$$"
git worktree add --detach "$WT" "$FULL" --quiet || {
  echo "GATE RED -> REFUSING TO PROMOTE: could not create worktree"; exit 1; }
# Symlinked, never copied: node_modules is ~hundreds of MB and the gate runs many times a day.
ln -s "$REPO/node_modules" "$WT/node_modules"

LOG="$WT/.gate-test.log"
( cd "$WT" && npm test >"$LOG" 2>&1 ); TEST_EXIT=$?
( cd "$WT" && npm run typecheck >"$WT/.gate-tc.log" 2>&1 ); TC_EXIT=$?
( cd "$WT" && npm run build:web >"$WT/.gate-build.log" 2>&1 ); BUILD_EXIT=$?

FAILED_HITS=$(grep -ci 'failed' "$LOG" || true)
SUMMARY=$(grep -cE 'Tests[[:space:]]+[0-9]+ passed' "$LOG" || true)
TIMEOUTS=$(grep -c 'Test timed out' "$LOG" || true)

echo "# ---- gate ----"
echo "#   npm test exit      : $TEST_EXIT   (need 0)"
echo "#   'failed' occurrences: $FAILED_HITS   (need 0)"
echo "#   'Tests N passed'   : $SUMMARY   (need >=1)"
echo "#   typecheck exit     : $TC_EXIT   (need 0)"
echo "#   build:web exit     : $BUILD_EXIT   (need 0)"
grep -E 'Tests[[:space:]]+[0-9]+ (passed|failed)' "$LOG" | tail -2 || true

# ONE `if`. The push is INSIDE it. There is no other path to a push in this file.
if [ "$TEST_EXIT" -eq 0 ] && [ "$FAILED_HITS" -eq 0 ] && [ "$SUMMARY" -ge 1 ] \
   && [ "$TC_EXIT" -eq 0 ] && [ "$BUILD_EXIT" -eq 0 ]; then
  echo "# GATE GREEN"
  if [ "$DRY" = "--dry-run" ]; then
    echo "# --dry-run: not pushing."
  else
    git push origin "$FULL:master" || { echo "push refused - re-verify before retrying"; }
    git fetch origin --quiet
    # Verify by OUR OWN SHA, never by HEAD, which is shared and moves. On this branch a rejected push
    # may mean somebody already pushed your commit, and a successful one may mean nothing happened;
    # only the ancestor test answers both directions.
    if git merge-base --is-ancestor "$FULL" origin/master; then
      echo "# PROMOTED: $SHORT is an ancestor of origin/master"
    else
      echo "# NOT PROMOTED: $SHORT is NOT an ancestor of origin/master"
    fi
  fi
else
  echo "# GATE RED -> REFUSING TO PROMOTE. master stays at $(git rev-parse --short origin/master)"
  if [ "$TIMEOUTS" -gt 0 ]; then
    echo "#   $TIMEOUTS test(s) TIMED OUT. That is a budget question, not necessarily a defect -"
    echo "#   two corpus sweeps legitimately take ~6s against vitest's 5s default and tip over under"
    echo "#   fleet load. Read them before treating this as a failed assertion."
  fi
  grep -E '(FAIL|AssertionError|Test timed out|Worker exited)' "$LOG" | head -20 || true
  echo "#   full log kept at $LOG"
fi

# Never `rm -rf`; a hook blocks it and the worktree command is the correct tool anyway.
git worktree remove --force "$WT" 2>/dev/null || echo "# note: worktree left at $WT"
