#!/usr/bin/env node
// `npm run dev` ends here (#586). `vercel dev` refuses to start when the project's package.json `dev` script
// itself names it (DEV_RECURSIVE_INVOCATION), so the call lives in this file and the script only names this one.
// The `devCommand` in vercel.json (scripts/dev-static.mjs) is what `vercel dev` runs behind its router.
import { spawn } from "node:child_process";

const child = spawn("vercel", ["dev", ...process.argv.slice(2)], { stdio: "inherit" });
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => child.kill(sig));
child.on("exit", (code) => process.exit(code ?? 1));
