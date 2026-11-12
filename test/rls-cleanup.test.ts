// #590: the cleanup of the RLS scripts must not report success when it failed, and a hung neonctl
// must end a scan as a `fail` verdict, never a hang. neonctl is stubbed with a script on PATH.
import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
// @ts-expect-error plain .mjs.
import { cleanupUsers } from "../scripts/rls-cleanup.mjs";

describe("cleanupUsers (#590)", () => {
  it("counts the deletes that worked and gives a FAIL line when one did not", async () => {
    const lines: string[] = [];
    const deleteUser = async (id: string) => { if (id === "b") throw new Error("boom"); };
    const failed = await cleanupUsers([{ id: "a" }, { id: "b" }, { id: "c" }], deleteUser, (l: string) => lines.push(l));
    expect(failed).toBe(1);
    expect(lines.join("\n")).toMatch(/^FAIL {2}cleanup: 2 of 3 test users deleted/m);
    expect(lines.join("\n")).not.toMatch(/all 3/);
  });

  it("is quiet about failure when every delete worked", async () => {
    const lines: string[] = [];
    const failed = await cleanupUsers([{ id: "a" }], async () => {}, (l: string) => lines.push(l));
    expect(failed).toBe(0);
    expect(lines).toEqual(["pass  cleanup: 1 of 1 test users deleted"]);
  });
});

describe("scan-rls with a hung neonctl (#590)", () => {
  it("times out into a fail verdict", () => {
    const dir = mkdtempSync(join(tmpdir(), "scan-rls-"));
    writeFileSync(join(dir, "neonctl"), "#!/bin/sh\nexec sleep 30\n");
    chmodSync(join(dir, "neonctl"), 0o755);
    const out = join(dir, "out");
    const started = Date.now();
    const r = spawnSync(process.execPath, ["scripts/scan-rls.mjs", "--run", "590-test", "--out", out], {
      encoding: "utf8",
      env: { ...process.env, PATH: `${dir}:${process.env.PATH}`, SCAN_RLS_NEON_TIMEOUT_MS: "300" },
      timeout: 20000,
    });
    expect(Date.now() - started).toBeLessThan(15000);
    expect(r.status).toBe(1);
    const verdict = JSON.parse(readFileSync(join(out, "check-rls.json"), "utf8"));
    expect(verdict.result).toBe("fail");
    expect(verdict.error).toMatch(/timed out|ETIMEDOUT/);
  });
});
