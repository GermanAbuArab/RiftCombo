// Check 4 of #585 runs only inside a security-scan run, on a real Neon branch, so the suite pins only
// what it can decide in process: the branch is named after the run and can never be `main`.
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs run by `npm run scan:rls`.
import { branchName } from "../scripts/scan-rls.mjs";

describe("scan:rls branch name (#585)", () => {
  it("names the throwaway branch after the scan run", () => {
    expect(branchName("RiftCombo_1e6375cf")).toBe("rls-RiftCombo_1e6375cf");
    expect(branchName("585-1794495376")).toBe("rls-585-1794495376");
  });

  it("refuses a missing run name or one that could reach another branch", () => {
    for (const bad of [undefined, "", "a b", "../main", "x".repeat(49)]) expect(() => branchName(bad)).toThrow(/--run/);
    // The prefix keeps even a run called main off the name `main`; check-rls-neon.mjs refuses main by id.
    expect(branchName("main")).toBe("rls-main");
    // Verbatim, so two run names never collapse onto one branch.
    expect(branchName("Run_A")).not.toBe(branchName("run-a"));
  });
});

// #604: the delete path reads the branch back and deletes only `default === false`. A stub neonctl on PATH
// stands in for Neon; nothing touches the real project.
describe("scan:rls refuses to delete a default branch (#604)", () => {
  const runScan = (isDefault: boolean | "garbage" | "nokey") => {
    const dir = mkdtempSync(join(tmpdir(), "scan-rls-"));
    const calls = join(dir, "calls.log");
    const stub = join(dir, "neonctl");
    writeFileSync(stub, `#!/bin/bash
echo "$1 $2 $3" >> "$STUB_CALLS"
case "$1 $2" in
  "branches create") echo '{"branch":{"id":"br-stub","name":"rls-stub"}}' ;;
  "branches get") echo '${isDefault === "garbage" ? "not json" : isDefault === "nokey" ? '{"branch":{"id":"br-stub"}}' : `{"branch":{"id":"br-stub","default":${isDefault}}}`}' ;;
  "branches list") echo '{"branches":[]}' ;;
  "neon-auth config") echo '{"enabled":false}' ;;
  *) echo '{}' ;;
esac
`);
    chmodSync(stub, 0o755);
    const out = join(dir, "out");
    const r = spawnSync(process.execPath, [join(process.cwd(), "scripts", "scan-rls.mjs"), "--run", "stub604", "--out", out], {
      encoding: "utf8",
      env: { ...process.env, PATH: `${dir}:${process.env.PATH}`, STUB_CALLS: calls },
    });
    return { r, calls: readFileSync(calls, "utf8").split("\n").filter(Boolean), verdict: JSON.parse(readFileSync(join(out, "check-rls.json"), "utf8")) };
  };

  it("does not call branches delete and records the refusal when the branch reads default: true", () => {
    const { r, calls, verdict } = runScan(true);
    expect(r.status).toBe(1);
    expect(calls).toContain("branches get br-stub");
    expect(calls.some((c) => c.startsWith("branches delete"))).toBe(false);
    expect(verdict.result).toBe("fail");
    expect(verdict.error).toMatch(/refusing to delete br-stub/);
  });

  it("records the failure and does not delete when the read-back is not JSON", () => {
    const { calls, verdict } = runScan("garbage");
    expect(calls.some((c) => c.startsWith("branches delete"))).toBe(false);
    expect(verdict.result).toBe("fail");
    expect(verdict.error).toMatch(/branch cleanup of br-stub/);
  });

  it("does not delete when the read-back has no default key", () => {
    const { calls, verdict } = runScan("nokey");
    expect(calls.some((c) => c.startsWith("branches delete"))).toBe(false);
    expect(verdict.error).toMatch(/refusing to delete br-stub/);
  });

  it("deletes the branch when it reads default: false", () => {
    const { calls } = runScan(false);
    expect(calls).toContain("branches delete br-stub");
  });
});
