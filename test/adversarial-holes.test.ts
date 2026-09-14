import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync } from "node:fs";
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

/**
 * Written by the --holds-notables assertions below; gitignored, and removed by each test.
 *
 * PID-SUFFIXED, because two tests in this file write it and a concurrent run collided once, failing on
 * a missing file rather than on anything it asserts. That is the same shared-path defect this session
 * fixed in the script's own `--out` default — applied to the script and not, at first, to its test.
 */
const HOLDS_PROBE = `.scratch-emit/holds-test-probe-${process.pid}.json`;

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
 * THE STALLED-BOARD BUCKETS, and why INDEPENDENT is the one to distrust.
 *
 * It is the ELSE BRANCH of the other predicates, so it collects whatever they cannot see — and it has
 * been wrong twice for exactly that reason. First it held four rows standing on `SFD-088 Renata Glasc,
 * Mastermind`, whose text ends "Use my abilities only while I'm at a battlefield" (fixed by adding
 * LOCATED). Then it held both Gutter Palace rows: `UNL-088` reads "if you have exactly 4 cards in hand
 * and exactly 4 units at battlefields, YOU WIN THE GAME", which is a board gate none of hold, conquer,
 * attack or location-gate can see. CLAUDE.md had diagnosed that one and it had never reached the code.
 *
 * With GARRISONED added, the bucket agrees with a sentence CLAUDE.md derived BY HAND and independently
 * — that exactly one finisher both scores and needs nothing from the board — which is the strongest
 * validation available here: two derivations that never touched each other meeting on the same rows.
 *
 * Asserted as an INVARIANT rather than a membership list, because the roster is perishable and the
 * property is not: nothing carrying a printed garrison requirement may sit in INDEPENDENT.
 */
describe("the stalled-board buckets", () => {
  const st = execFileSync("node", ["scripts/adversarial-check.mjs", "--stalled"], { encoding: "utf8", maxBuffer: 1 << 24 });
  const bucket = (name: string) => {
    const m = st.match(new RegExp(`## ${name} {2}\\((\\d+)\\)([\\s\\S]*?)(?=\\n## |$)`));
    return { n: Number(m?.[1] ?? -1), body: m?.[2] ?? "" };
  };

  it("classifies every finisher into exactly one bucket", () => {
    const names = ["ATTACK", "CONQUER", "HOLD", "LOCATED", "GARRISONED", "INDEPENDENT"];
    const total = st.match(/# Stalled-board classification of all (\d+) finishers/);
    expect(total, "the classification header is missing").toBeTruthy();
    const sum = names.reduce((a, n) => a + bucket(n).n, 0);
    expect(sum).toBe(Number(total![1]));
    expect(Number(total![1]), "the finisher population went empty").toBeGreaterThan(40);
  });

  /**
   * The invariant. A line whose printed win condition requires bodies at battlefields is NOT
   * board-independent, whatever the other predicates say.
   */
  it("never files a printed garrison requirement as board-independent", () => {
    const indep = bucket("INDEPENDENT");
    expect(indep.n).toBeGreaterThanOrEqual(0);
    expect(indep.body).not.toMatch(/gutter-palace/);
    // and the bucket that should hold them is populated, so this cannot pass by the predicate matching nothing
    expect(bucket("GARRISONED").n, "the garrison bucket is empty — the predicate may have gone blind").toBeGreaterThan(0);
  });

  /**
   * A bucket label is a generalisation, and a row that scores outside its bucket's own gate is the
   * exception the label cannot carry. HOLD has had an `also` rider since the precedence fix; ATTACK and
   * CONQUER had none, so draven-yasuo-battle-mistress-contested-chain read as "Dead on an empty board"
   * while `OGN-205 Yasuo, Windrider` scores on the third time it MOVES — the entry's own terminatesIn
   * says "the same board unopposed yields only five".
   *
   * Pinned as a property, not a roster: the rider must exist, and it must not fire on a row whose only
   * scoring leg IS the bucket's gate — a first version excluded attack wording but not conquer wording
   * and flagged 10 of 18 CONQUER rows, every one of them for its own Conquer trigger.
   */
  it("flags a scoring leg the bucket's own gate does not cover, and not the gate itself", () => {
    const riders = st.split("\n").filter((l) => l.includes("scores without that gate too"));
    expect(riders.length, "the second-leg rider never fires — the predicate may have gone blind").toBeGreaterThan(0);
    // Every flagged row names a card, so the rider can never be a bare assertion.
    for (const r of riders) expect(r).toMatch(/scores without that gate too - .+ - read it/);
    // It must stay a narrow exception. If most of a bucket trips it, the gate is being flagged as a leg.
    const conq = bucket("CONQUER");
    const conqRiders = conq.body.split("\n").filter((l) => l.includes("scores without that gate too")).length;
    expect(conqRiders).toBeLessThan(conq.n / 2);
  });

  /**
   * A fuel engine has no board verdict to give. Ten of the 80 rows produce only fuel and score nothing,
   * so "does a stall switch this finisher off" is malformed for them — the board question belongs to
   * whatever consumes the fuel. Read off `produces`, which is structured; a prose predicate over
   * terminatesIn agrees on 9 of the 10 and differs on gemdragon-henge-vi-blind-fury only because its own
   * text mentions the points that the entry it BUYS scores.
   */
  it("says so when a classified row scores nothing at all", () => {
    const fuel = st.split("\n").filter((l) => l.includes("SCORES NOTHING"));
    expect(fuel.length, "no row is marked as a fuel engine — the produces read may have gone blind").toBeGreaterThan(0);
    // Every such row must name what it DOES produce, so the claim is checkable in one look.
    for (const l of fuel) expect(l).toMatch(/SCORES NOTHING: produces \S/);
    // It is a minority of the population; if most rows trip it, the tag names were guessed again.
    const total = Number(st.match(/classification of all (\d+) finishers/)![1]);
    expect(fuel.length).toBeLessThan(total / 3);
  });

  it("keeps INDEPENDENT small, and labelled as a claim to check", () => {
    expect(bucket("INDEPENDENT").n).toBeLessThanOrEqual(4);
    // NOT the count in that sentence — it moves every time the bucket overclaims again, and pinning it
    // failed this test on a label edit it had no opinion about. The durable half is the warning itself.
    expect(st).toMatch(/else branch of too few predicates/);
    expect(st).toMatch(/claim to check, not a conclusion/);
  });
});

/**
 * THE GARRISON FLOOR, which decides WHICH answer card the Hold modes name to a player.
 *
 * It has been wrong twice, both times shipping a false notable, and neither was visible to any test.
 * The second one is the one worth remembering: both Hold modes folded `prerequisites.notable` into the
 * prose they scanned for token names — and this script WRITES those notables. Its own `scope()` emits
 * "(Mech bodies only)" into an answer list, in a sentence saying that answer does NOT apply; the next
 * run matched the word Mech inside it and told eight entries their garrison was Might-3 Mechs. None of
 * the eight plays a token at all; their real floor is 4. An instrument that reads its own emissions has
 * no fixed point, and it grows more confident the more often it runs.
 *
 * `--selftest-garrison` pins it against HAND-DERIVED answers on REAL entries, in both directions,
 * because a floor that is too LOW is the dangerous one — it names a confident answer that does not work,
 * and a check that only asks "did it find something" cannot see that at all.
 *
 * Every clause was proved to FIRE out of band, and the FIRST version of the self-test pinned only one
 * of the four — the other three were added only because breaking them changed nothing:
 *   zone filter dropped                    -> ready-recruits-grand-plaza FAILs
 *   token played to the BASE counted       -> rumble-scrapper-sentinel-mechs FAILs (reads 3, off the
 *                                             same card whose prose caused the original bug)
 *   a token NAME matched instead of a PLAY -> ivern-nurturer-hold-tutor FAILs (the clause the whole
 *                                             defect turned on)
 *   self-scaling body counted              -> spiderling-swarm-grand-plaza FAILs (the FIRST false notable)
 */
/**
 * A PROTECTION IS AN ANSWER ONLY IF IT REACHES.
 *
 * Both Hold modes named "THE IDENTITY DOES HOLD AN ANSWER" and listed +1 Might grants beside a
 * 12-damage sweep. 143.2.a kills on marked damage at or above Might, so +1 on a Might-4 body against
 * OGN-123 Unchecked Power changes nothing — and every garrison-wide protection in this pool is +1 or
 * +2 (measured: 105 and 11 instances), so NOTHING in the pool protects a garrison from that card. Four
 * pending corrections were about to tell a player otherwise.
 *
 * The card facts were right and the premise about the board was wrong, which is this emitter's whole
 * failure family. The gate is arithmetic: floor + plus must EXCEED the damage.
 *
 * Found by reading the four pending rows before handing them over, not by any check.
 */
/**
 * A sweeper that hits the caster's own board is half the price of one that does not, and the emitter
 * quoted the text without drawing the conclusion. `OGN-123 Unchecked Power` reads "Exhaust all friendly
 * units, then deal 12 to ALL units at battlefields"; `OGS-002 Firestorm` reads "all ENEMY units". Four
 * of the seven swept answers are symmetric and three are enemy-only, and which one a row names changes
 * whether the opponent would cast it at all. The EQUIPMENT arm has said this about Thermo Beam from the
 * start; the garrison arm did not.
 */
/**
 * "Nothing answers this" and "we do not know how big this is" are different claims, and --holds printed
 * the same sentence for both. All five rows saying "no swept mass answer reaches it" had a floor of M?
 * — CANNOT DETERMINE — so a reader was being told the garrison is too big for everything in the pool
 * when the truth is that its size is unknown. Asserting a conclusion the mode cannot support is the
 * family every defect in this script belongs to.
 */
describe("a row that names no answer", () => {
  const h = execFileSync("node", ["scripts/adversarial-check.mjs", "--holds"], { encoding: "utf8", maxBuffer: 1 << 24 });
  const lines = h.split("\n");

  it("never says nothing reaches when the floor is unknown", () => {
    let checked = 0;
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i]!.match(/floor M(\S+)/);
      if (!m) continue;
      checked++;
      if (m[1] === "?") {
        expect(lines[i + 1], `${lines[i]!.trim()} has an unknown floor`).not.toMatch(/no swept mass answer reaches it/);
      }
    }
    expect(checked, "no row was parsed — the --holds layout may have moved").toBeGreaterThan(5);
  });
});

describe("the emitted answer", () => {
  it("says whether its answer costs the opponent their own board", () => {
    const out = execFileSync("node", ["scripts/adversarial-check.mjs", "--holds-notables", "--out", HOLDS_PROBE], { encoding: "utf8", maxBuffer: 1 << 22 });
    expect(out).toMatch(/append a missing one/);
    const rows = JSON.parse(readFileSync(HOLDS_PROBE, "utf8")) as { notables_to_append: string[] }[];
    unlinkSync(HOLDS_PROBE);
    // Only meaningful if rows exist; when the mode goes quiet this is vacuous and says so.
    if (!rows.length) return;
    for (const r of rows)
      expect(r.notables_to_append[0], "an emitted answer says nothing about whether it is symmetric")
        .toMatch(/IT IS SYMMETRIC|It reads "enemy units"/);
  });
});

describe("a garrison protection", () => {
  const h = execFileSync("node", ["scripts/adversarial-check.mjs", "--holds"], { encoding: "utf8", maxBuffer: 1 << 24 });
  const rows = h.split("\n");

  it("is never claimed when it cannot lift the garrison above the answer", () => {
    let checked = 0;
    for (let i = 0; i < rows.length; i++) {
      const f = rows[i]!.match(/floor M(\d+)/);
      if (!f) continue;
      const ans = rows[i + 1]?.match(/dmg(\d+)/);
      const prot = rows[i + 2]?.match(/identity HOLDS a protection: (.*)/);
      if (!ans || !prot) continue;
      checked++;
      const floor = Number(f[1]), dmg = Number(ans[1]);
      for (const p of prot[1]!.matchAll(/\+(\d+)/g))
        expect(floor + Number(p[1]), `${rows[i]!.trim()} names a +${p[1]} against ${dmg} damage`).toBeGreaterThan(dmg);
    }
    // Non-vacuity: a parse that matched nothing would pass silently.
    expect(checked, "no row was checked — the --holds layout may have moved").toBeGreaterThan(5);
  });

  /** An Empowered-gated grant reaches no token garrison: 441.1 makes Empowering an act per body. */
  it("never names a grant gated on a state a token garrison cannot have", () => {
    expect(h).not.toMatch(/identity HOLDS a protection:[^\n]*Aurok General/);
  });
});

describe("the garrison Might floor", () => {
  const g = execFileSync("node", ["scripts/adversarial-check.mjs", "--selftest-garrison"], { encoding: "utf8", maxBuffer: 1 << 22 });

  it("runs real entries in both directions, so it cannot pass by finding nothing", () => {
    const m = g.match(/(\d+) real entries with hand-derived floors/);
    expect(m, "the non-vacuity header is missing").toBeTruthy();
    expect(Number(m![1])).toBeGreaterThanOrEqual(8);
    const d = g.match(/# (\d+) expect a floor, (\d+) expect CANNOT DETERMINE; (\d+) expect token bodies/);
    expect(d, "the direction split is missing").toBeTruthy();
    expect(Number(d![1]), "no case expects a floor").toBeGreaterThan(0);
    expect(Number(d![2]), "no case expects CANNOT DETERMINE — a wrong floor would pass").toBeGreaterThan(0);
    expect(Number(d![3]), "no case expects token bodies").toBeGreaterThan(0);
  });

  it("agrees with every hand-derived floor", () => {
    expect(g.split("\n").filter((l) => l.startsWith("  FAIL")).join("\n")).toBe("");
    expect(g).toContain("# all pass");
  });

  /** The emitter must never read what the emitter wrote. */
  it("does not fold prerequisites.notable into the prose either Hold mode scans", () => {
    const src = readFileSync("scripts/adversarial-check.mjs", "utf8");
    const proseLines = src.split("\n").filter((l) => /const prose = /.test(l));
    expect(proseLines.length, "the prose definitions moved; re-read them").toBeGreaterThanOrEqual(3);
    for (const l of proseLines) expect(l, "a prose scan reads this script's own emitted notables").not.toContain("notable");
  });
});

/**
 * A ZERO THAT CANNOT EXPLAIN ITSELF IS NOT A RESULT — #220's lesson one level up.
 *
 * `--recheck-notables` is a ONE-SHOT repair: it finds a shipped notable that turned out to be wrong
 * and emits a replacement row per entry. Once applied it prints 0 forever, and a reader cannot tell
 * that from "the predicate is broken" or "the catalogue changed underneath it". Measured 2026-09-14
 * over 766 entries: ZERO carry the stale needle and FOURTEEN carry the replacement — so the mode is
 * SPENT, and the evidence for that is POSITIVE rather than an absence.
 *
 * It was kept rather than deleted or generalised. Deleting it would throw away the only worked example
 * in this repo of replacing a shipped sentence by machine, and notables here have shipped wrong at
 * least four times (the Spiderling Might count, the zone/false-Flurry claim, the kill-predicate
 * Reaction claim, and the "repairs are narrow" list, which a manager then applied BY HAND to six
 * entries). Generalising it would mean parameterising a thirty-line replacement constant with
 * interpolated measurements and a bespoke `why` — an interface nobody asked for, and the kind of
 * widening that makes a mode go looking for work.
 *
 * What it now does instead is tell the three states apart, which is the only thing that was actually
 * wrong. `--holds-notables` has the same shape in HALF of it: its REPLACE half is spent (1 entry
 * carries the replacement) while its APPEND half is live (8 corrections at the time of writing), and
 * a single row count hid that.
 *
 * The "means NOTHING" branch was proved OUT OF BAND, the same way every other assertion here was: a
 * scratch copy of data/combos.json with the landed replacements stripped (15 notables) makes both
 * modes print it, and data/combos.json was verified untouched afterwards.
 */
/**
 * The allocator's own trust signal has to NAME what it distrusts.
 *
 * CLAUDE.md's standing instruction is that a row priced by the greedy fallback is "a row to re-derive
 * by hand rather than quote" — which a reader cannot act on when the header only says how many. It also
 * counted the wrong population: `greedyFallbacks` counts every call to `deployTurn`, and the
 * needs/produces fold prices candidate closures that never reach the table, so the line read "exact on
 * 79 of 80 rows" while all 80 PUBLISHED rows were exact.
 *
 * Measured 2026-09-14: one fallback, at the fold's candidate-pricing call site (stack-traced), and with
 * `RC_GUARD=4000000` making every intermediate price exact (~32s against ~0.4s) the table is
 * BYTE-IDENTICAL. So it changes nothing today, and the header says that rather than implying a bad row.
 */
describe("the allocator's trust signal", () => {
  const turns = execFileSync("node", ["scripts/adversarial-check.mjs", "--turns"], { encoding: "utf8", maxBuffer: 1 << 24 });

  it("names the rows it priced greedily, rather than only counting them", () => {
    const m = turns.match(/# allocator: exact on (\d+) of (\d+) rows, greedy fallback on (\d+)(.*)/);
    expect(m, "the allocator line is missing").toBeTruthy();
    const [exact, total, greedy] = [Number(m![1]), Number(m![2]), Number(m![3])];
    expect(total, "the row population went empty").toBeGreaterThan(40);
    expect(exact + greedy).toBe(total);
    // The population it counts must be the PUBLISHED rows, not every call to the allocator.
    const rows = turns.split("\n").filter((l) => /^ {2}T\s*(\d+|Infinity) vs T\d+ baseline/.test(l)).length;
    expect(rows).toBe(total);
    // If any row IS greedy, it has to be named — that is the whole point of the signal.
    if (greedy > 0) expect(m![4], "greedy rows are counted but not named").toMatch(/\S/);
  });

  it("reports an intermediate fallback separately from a row, so neither can hide in the other", () => {
    const note = turns.match(/# NOTE (\d+) fallbacks? priced a CANDIDATE closure/);
    if (note) {
      // It must say what it costs, not merely that it happened.
      expect(turns).toContain("Every published turn is still exact");
      expect(turns).toMatch(/RC_GUARD=\d+/);
    }
  });
});

describe("a spent mode says so", () => {
  it("explains its own zero, with the positive evidence and a date", () => {
    const out = execFileSync("node", ["scripts/adversarial-check.mjs", "--recheck-notables"], { encoding: "utf8", maxBuffer: 1 << 22 });
    const m = out.match(/# --recheck-notables: (\d+) /);
    expect(m, "the mode does not report a count").toBeTruthy();
    if (Number(m![1]) === 0) {
      // It must say WHICH zero. Either is acceptable; silence is not.
      // Keyed on the STATE TOKEN, never on the prose beside it. Matching prose is exactly the defect
      // this file exists for, and the first version of this assertion committed it.
      expect(out).toMatch(/\[SPENT\]|\[INDETERMINATE\]/);
      expect(out).toMatch(/Verified \d{4}-\d{2}-\d{2}|re-derive/);
    }
    const written = out.match(/-> (\S+)/)![1] as string;
    unlinkSync(written);
  });

  it("reports the two halves of --holds-notables separately when one is spent", () => {
    const out = execFileSync("node", ["scripts/adversarial-check.mjs", "--holds-notables", "--out", HOLDS_PROBE], { encoding: "utf8", maxBuffer: 1 << 22 });
    const m = out.match(/\((\d+) REPLACE[^,]*, (\d+) append/);
    expect(m, "the mode does not split its two halves").toBeTruthy();
    if (Number(m![1]) === 0) expect(out).toMatch(/REPLACE half is \[SPENT\]|REPLACE half is \[INDETERMINATE\]/);
    unlinkSync(HOLDS_PROBE);
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
