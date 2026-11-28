import { spawn } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { BUDGET_MS } from "./budget.js";

// A teardown that kills `vercel dev` by its port never reached scripts/dev-static.mjs: the child was reparented
// to pid 1 and kept serving from a removed worktree (four orphans measured 2026-11-27, #780). It now exits on
// its own once its parent is gone, so the parent here is killed with SIGKILL, which it cannot forward.
const DEV_STATIC = join(import.meta.dirname, "..", "scripts", "dev-static.mjs");
const PARENT = `
  const { spawn } = require("node:child_process");
  const child = spawn(process.execPath, [process.argv[1]], { stdio: ["ignore", "ignore", "inherit"], env: { ...process.env, PORT: "0" } });
  console.log(child.pid);
  setInterval(() => {}, 1000);
`;

const alive = (pid: number) => {
  try { process.kill(pid, 0); return true; } catch (e) { return (e as NodeJS.ErrnoException).code !== "ESRCH"; }
};

describe("dev-static exits when its parent dies (#780)", () => {
  it("is gone within 5 s of a SIGKILL to its parent", async () => {
    const parent = spawn(process.execPath, ["-e", PARENT, DEV_STATIC], { stdio: ["ignore", "pipe", "inherit"] });
    const pid = Number(await new Promise<string>((ok) => parent.stdout.once("data", (d) => ok(String(d).trim()))));
    expect(pid).toBeGreaterThan(0);
    // Let it start listening, so the exit is the watch's and not a crash before listen.
    await new Promise((ok) => setTimeout(ok, 500));
    expect(alive(pid)).toBe(true);
    parent.kill("SIGKILL");
    const deadline = Date.now() + 5_000;
    while (alive(pid) && Date.now() < deadline) await new Promise((ok) => setTimeout(ok, 100));
    const survived = alive(pid);
    if (survived) process.kill(pid, "SIGKILL");
    expect(survived).toBe(false);
  }, BUDGET_MS);
});
