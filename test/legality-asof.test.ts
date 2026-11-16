import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { loadCardIndex } from "../src/load.js";
// @ts-expect-error plain .mjs helper, no declaration file
import { inForce, parseAsOf } from "../scripts/legality-asof.mjs";

/**
 * #668: the script readers of data/legality.json read it as of a date, with the rule CardIndex uses.
 * OGN-194 is one of the Radiance cards banned from 2026-11-23 (#669): legal on 11-22, banned on 11-23.
 */
const CARD = "OGN-194";
const run = (script: string, args: string[]) => {
  try {
    return execFileSync("node", [script, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    return String((e as { stdout?: string }).stdout ?? "");
  }
};

describe("dated legality for scripts (#668)", () => {
  it("parseAsOf takes --as-of in both forms and rejects a bad date", () => {
    expect(parseAsOf(["x", "--as-of", "2026-11-22", "--turns"])).toEqual({ asOf: "2026-11-22", rest: ["x", "--turns"] });
    expect(parseAsOf(["--as-of=2026-11-23"]).asOf).toBe("2026-11-23");
    expect(() => parseAsOf(["--as-of", "tomorrow"])).toThrow();
    expect(() => parseAsOf(["--as-of", "2026-02-31"])).toThrow();
    expect(() => parseAsOf(["--as-of"])).toThrow();
  });

  it("inForce agrees with CardIndex on the Radiance card the day before and the day of", () => {
    const rows = loadCardIndex("2026-11-22"); // reads data/legality.json through CardIndex
    const all = JSON.parse(readFileSync("data/legality.json", "utf8")).entries;
    for (const [day, banned] of [["2026-11-22", false], ["2026-11-23", true]] as const) {
      const viaScript = inForce(all, day).some((r: { bases: string[]; status: string; format: string }) =>
        r.bases.includes(CARD) && r.status === "banned" && r.format === "constructed");
      expect(viaScript, day).toBe(banned);
      expect(loadCardIndex(day).legality(CARD, "constructed")?.status === "banned", `CardIndex ${day}`).toBe(banned);
    }
    expect(rows.asOf).toBe("2026-11-22");
  });

  it("check-stage passes a staged row using the Radiance card on 2026-11-22 and flags it on 2026-11-23", () => {
    const dir = mkdtempSync(join(tmpdir(), "rc668-"));
    const stage = join(dir, "stage.json");
    writeFileSync(stage, JSON.stringify([{
      id: "t668", class: "ENGINE", status: "candidate", rulesVersion: "none", produces: [],
      uses: [{ card: CARD, quantity: 1 }], prerequisites: { easy: [] },
    }]));
    // The script must have reached the row (its own banner and the row's uses line) before an absence counts.
    const day22 = run("scripts/check-stage.mjs", [stage, "--as-of", "2026-11-22"]);
    expect(day22).toContain("=== t668");
    expect(day22).toContain(`uses: ${CARD} `);
    expect(day22).not.toContain(`LEGALITY ${CARD}`);
    expect(run("scripts/check-stage.mjs", [stage, "--as-of", "2026-11-23"])).toContain(`LEGALITY ${CARD} banned constructed`);
  });

  it("adversarial-check counts the Radiance bans only from their date", () => {
    const line = (d: string) => run("scripts/adversarial-check.mjs", ["--turns", "--as-of", d]).split("\n")
      .filter((l) => l.includes("desert-call-vi-sand-soldier-plaza"));
    const day22 = line("2026-11-22");
    expect(day22.length, "the row was printed").toBe(1);
    expect(day22.join()).not.toContain("BANNED in constructed");
    expect(line("2026-11-23").join()).toContain("BANNED in constructed");
  }, 60_000);
});
