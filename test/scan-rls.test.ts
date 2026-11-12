// Check 4 of #585 runs only inside a security-scan run, on a real Neon branch, so the suite pins only
// what it can decide in process: the branch is named after the run and can never be `main`.
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
