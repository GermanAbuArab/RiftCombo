// #590: the cleanup of the RLS scripts must not report success when it failed, and a hung neonctl
// must end a scan as a `fail` verdict, never a hang. neonctl is stubbed with a script on PATH.
import { describe, expect, it, onTestFinished } from "vitest";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
    onTestFinished(() => rmSync(dir, { recursive: true }));
    const started = Date.now();
    const r = spawnSync(process.execPath, [join(process.cwd(), "scripts/scan-rls.mjs"), "--run", "590-test", "--out", out], {
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

// #603: the two calls #590 left without a timeout.
function stubDir(script: string) {
  const dir = mkdtempSync(join(tmpdir(), "rls-603-"));
  writeFileSync(join(dir, "neonctl"), script);
  chmodSync(join(dir, "neonctl"), 0o755);
  onTestFinished(() => rmSync(dir, { recursive: true }));
  return dir;
}

describe("check-rls-neon with a hung neonctl (#603)", () => {
  it("exits non-zero within its timeout", () => {
    const dir = stubDir("#!/bin/sh\nexec sleep 30\n");
    const started = Date.now();
    const r = spawnSync(process.execPath, [join(process.cwd(), "scripts/check-rls-neon.mjs")], {
      encoding: "utf8",
      env: {
        ...process.env, PATH: `${dir}:${process.env.PATH}`, CHECK_RLS_NEON_TIMEOUT_MS: "300",
        NEON_DATA_API_URL: "https://x.example/d", NEON_AUTH_URL: "https://x.example/a", NEON_PROJECT_ID: "p", NEON_BRANCH_ID: "b",
      },
      timeout: 20000,
    });
    expect(Date.now() - started).toBeLessThan(15000);
    expect(r.status).not.toBe(0);
    expect(r.status).not.toBeNull();
    expect(r.stderr).toMatch(/ETIMEDOUT|timed out/);
  });
});

describe("scan-rls with a hung check-rls-neon child (#603)", () => {
  it("records the timeout in verdict.error and still deletes the branch", () => {
    const dir = stubDir(`#!/bin/sh
echo "$*" >> "$(dirname "$0")/calls"
case "$*" in
  *"branches create"*) echo '{"branch":{"id":"br-1"}}';;
  *"neon-auth status"*"--branch main"*) echo '{"base_url":"https://main.example/auth"}';;
  *"neon-auth status"*) echo '{"base_url":"https://b.example/auth"}';;
  *"data-api get"*"--branch main"*) echo '{"url":"https://main.example/d"}';;
  *"data-api get"*) echo '{"url":"https://b.example/d"}';;
  *"branches get"*) if [ -n "$NEON_BRANCH_ID" ]; then exec sleep 30; fi; echo '{"branch":{"id":"br-1","default":false}}';;
  *"branches list"*) echo '{"branches":[]}';;
  *"email-password get"*) echo '{"enabled":false}';;
  *) echo '{}';;
esac
`);
    const out = join(dir, "out");
    const started = Date.now();
    const r = spawnSync(process.execPath, [join(process.cwd(), "scripts/scan-rls.mjs"), "--run", "603-test", "--out", out], {
      encoding: "utf8",
      env: { ...process.env, PATH: `${dir}:${process.env.PATH}`, SCAN_RLS_CHILD_TIMEOUT_MS: "500", CHECK_RLS_NEON_TIMEOUT_MS: "60000" },
      timeout: 20000,
    });
    expect(Date.now() - started).toBeLessThan(15000);
    expect(r.status).toBe(1);
    const verdict = JSON.parse(readFileSync(join(out, "check-rls.json"), "utf8"));
    expect(verdict.result).toBe("fail");
    expect(verdict.error).toMatch(/did not finish: ETIMEDOUT/);
    expect(readFileSync(join(dir, "calls"), "utf8")).toMatch(/branches delete br-1/);
  });
});
