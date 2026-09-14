import { execFileSync } from "node:child_process";
import { existsSync, unlinkSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * The hole sweep and the notable emitter of `scripts/adversarial-check.mjs` had no test, and that is
 * how #220 survived.
 *
 * The script detects two holes in a finisher — it stands on attached Equipment and names no gear
 * answer, or it stands on a Might-1-or-less body at a battlefield and never names OGN-133 Flurry of
 * Blades — and `--emit-notables` writes the sentence explaining each one into `data/combos.json`, so
 * a player reading riftcombo.app sees it. The fragile-body check was widened from `might === 1` to
 * `might <= 1` and its message was reworded to match; the emitter, which found its own hole again
 * with `startsWith("stands on a Might-1 body")`, was not. From that commit the notable could never
 * be emitted, and the report went on naming the hole as though it had been.
 *
 * NOTHING COULD HAVE CAUGHT IT FROM THE LIVE DATA. Every hole in the catalogue is currently
 * answered, so the sweep reports `0 of 80 finishers` and `--emit-notables` prints `[]` — both paths
 * are dormant, and a test over `data/combos.json` would go green either side of the break. The same
 * is true of the zone guard that closed the second FALSE notable this emitter shipped (#200 batch
 * 17): deleting it left the entire suite green.
 *
 * So the instrument is `--selftest-holes`, synthetic entries with hand-derived answers, in the shape
 * of the `--selftest` the allocator already uses. This file asserts it passes and, first, that it is
 * not vacuous.
 *
 * Each assertion below was proved to FIRE by breaking the thing it pins in a scratch copy of the
 * script and watching the self-test name it:
 *   - producer/consumer tag drift (the #220 shape)      -> 2 cases FAIL by name
 *   - the zone guard deleted                            -> "the SAME body declared at the base" FAILs
 *   - the Might threshold widened to 2                  -> "a Might-2 body at a battlefield" FAILs
 *   - the payload dropped from the sentence             -> 2 cases FAIL on MISSING FROM THE SENTENCE
 *   - the equipment arm removed                         -> 3 cases FAIL
 *   - namesAnswer stopped closing a hole                -> the "already names the sweeper" case FAILs
 *   - the unhandled-kind report swallowed               -> the last case FAILs
 */

/**
 * Run it WITHOUT letting a non-zero exit throw. `execFileSync` throws on a failing exit code, and at
 * module scope that aborts collection — the suite then reports "no tests" for this file, which is a
 * red with no diagnosis in it. Capturing the status instead means a broken script fails the
 * assertion that names the case, which is the difference between "something is wrong" and "the zone
 * guard is gone".
 */
function selftest(): { status: number; out: string } {
  try {
    return { status: 0, out: execFileSync("node", ["scripts/adversarial-check.mjs", "--selftest-holes"], { encoding: "utf8", maxBuffer: 1 << 22 }) };
  } catch (e) {
    const err = e as { status?: number; stdout?: string; stderr?: string };
    return { status: err.status ?? 1, out: `${err.stdout ?? ""}${err.stderr ?? ""}` };
  }
}
const { status, out } = selftest();

describe("the hole sweep and its notable emitter", () => {
  /** A probe that silently runs no cases prints a clean pass. Assert the population first. */
  it("runs a non-trivial number of cases, in both directions", () => {
    const m = out.match(/# (\d+) cases, (\d+) expect a hole and (\d+) expect none/);
    expect(m, "the non-vacuity header is missing").toBeTruthy();
    expect(Number(m![1])).toBeGreaterThanOrEqual(8);
    // Both directions matter, and only one of them is the bug: a suite that only ever asserts
    // "this produces a hole" cannot see a FALSE hole, which is the defect the zone guard fixed.
    expect(Number(m![2]), "no case expects a hole").toBeGreaterThan(0);
    expect(Number(m![3]), "no case expects a clean entry").toBeGreaterThan(0);
    expect(Number(m![2]) + Number(m![3])).toBe(Number(m![1]));
    expect(out).toMatch(/kinds exercised: equipment, fragile-body/);
  });

  it("passes every case", () => {
    const failures = out.split("\n").filter((l) => l.startsWith("  FAIL"));
    expect(failures.join("\n")).toBe("");
    expect(out).toContain("# all pass");
    expect(status, "the self-test exited non-zero").toBe(0);
  });

  /**
   * The two halves of #220 named individually, so a regression says which one went.
   *
   * The first is the lookup: a Might-1-or-less body at a battlefield with no answer named must
   * produce the hole AND the sentence. The second is the zone guard — OGN-133 Flurry of Blades reads
   * "Deal 1 to all units AT BATTLEFIELDS", so the same body declared at the base is NOT answered by
   * it, and claiming otherwise is the false notable that shipped to three entries.
   */
  it("emits the notable for a fragile body at a battlefield", () => {
    expect(out).toMatch(/ok {4}fragile body at a battlefield, no answer named\n\s+holes=\[fragile-body\][^\n]*notables=1 want 1/);
  });

  it("emits nothing at all for the same body at the base", () => {
    expect(out).toMatch(/ok {4}the SAME body declared at the base\n\s+holes=\[\][^\n]*notables=0 want 0/);
  });

  /** #220 WAS this asymmetry: the equipment arm worked and the fragile arm did not. */
  it("lets neither hole kind mask the other on one entry", () => {
    expect(out).toMatch(/ok {4}BOTH holes on one entry\n\s+holes=\[equipment, fragile-body\][^\n]*notables=3 want 3/);
  });

  /**
   * The half that closes the CLASS rather than the instance. Repairing the string alone would leave
   * the NEXT hole kind somebody adds free to vanish the same way — detected, named in the report, and
   * never explained. An unhandled kind is now loud on stderr and emits no empty correction row.
   */
  it("reports a hole kind nobody wrote a sentence for instead of swallowing it", () => {
    expect(out).toMatch(/ok {4}an unhandled hole kind is reported, not swallowed/);
  });
});


/**
 * Where a corrections file goes.
 *
 * `--recheck-notables` and `--holds-notables` write a FILE rather than stdout, because the report
 * sections would otherwise be interleaved with the JSON and a human applies the file. The default
 * used to be a fixed name under `/tmp/rc-walks/`, which every lane on this fleet shares and which
 * currently holds ~187 files — so two lanes running the same mode is the NORMAL case, `writeFileSync`
 * truncates without complaint, and the loser reads somebody else's plausible, correct-looking data.
 * This project has already had a lane read a file another lane wrote an hour earlier and come within
 * one step of reporting it as its own measurement.
 *
 * The `data/` refusal is the other half, and it is the accident this repo has actually had: a script
 * run against a file its runner did not own, which recased ~270 correct spans. These modes emit
 * corrections for a human to apply and have no business writing anything under `data/`.
 */
describe("the corrections file", () => {
  /** A probe pointed at a path that does NOT exist, so a broken guard leaves junk rather than eating a data file. */
  const PROBE = "data/__outguard_probe_do_not_commit.json";

  it("refuses an --out under data/, and refuses it before doing the analysis", () => {
    const t0 = Date.now();
    let status = 0, err = "";
    try {
      execFileSync("node", ["scripts/adversarial-check.mjs", "--holds-notables", "--out", PROBE], { encoding: "utf8", maxBuffer: 1 << 22 });
    } catch (e) {
      const x = e as { status?: number; stderr?: string };
      status = x.status ?? 1;
      err = x.stderr ?? "";
    }
    expect(status, "an --out under data/ was accepted").toBe(2);
    expect(err).toContain("REFUSING --out");
    expect(existsSync(PROBE), `${PROBE} was created — the guard did not hold`).toBe(false);
    // Fast, because the refusal is at flag-parse time and the analysis it would otherwise precede is
    // the expensive part. A refusal that arrives after the work is one the caller has already paid for.
    expect(Date.now() - t0).toBeLessThan(5000);
  });

  it("defaults to a session-unique path and says which one", () => {
    const out = execFileSync("node", ["scripts/adversarial-check.mjs", "--recheck-notables"], { encoding: "utf8", maxBuffer: 1 << 22 });
    const m = out.match(/-> (\S+)/);
    expect(m, "the mode does not print where it wrote").toBeTruthy();
    const written = m![1] as string;
    // The pid is what makes two lanes running this in the same second not collide.
    expect(written).toMatch(/rc-synth-recheck-\d+\.json$/);
    expect(existsSync(written), "the printed path does not exist").toBe(true);
    unlinkSync(written);
  });
});

/**
 * The live sweep, which is the population the report's own denominator is taken over. This is NOT a
 * substitute for the self-test above — it is green whatever the emitter does, which is the whole
 * point — but it pins that the sweep still runs over the finisher classes and still reports its
 * denominator, so "0 of 80" cannot become "0 of 0" unnoticed.
 */
describe("the live sweep", () => {
  const live = execFileSync("node", ["scripts/adversarial-check.mjs"], { encoding: "utf8", maxBuffer: 1 << 24 });

  it("states its denominator, and it is the finisher population", () => {
    const m = live.match(/# Unanswered holes: (\d+) of (\d+) finishers/);
    expect(m, "the holes header is missing").toBeTruthy();
    expect(Number(m![2]), "the finisher population went empty").toBeGreaterThan(40);
  });

  it("names every hole it counts, so the count and the list cannot drift apart", () => {
    const m = live.match(/# Unanswered holes: (\d+) of/);
    const listed = live.split("\n").filter((l) => /^\s{9}stands on /.test(l)).length;
    expect(listed).toBe(Number(m![1]));
  });
});
