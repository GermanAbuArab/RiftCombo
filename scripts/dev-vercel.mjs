#!/usr/bin/env node
// `npm run dev` ends here (#586). `vercel dev` refuses to start when the project's package.json `dev` script
// itself names it (DEV_RECURSIVE_INVOCATION), so the call lives in this file and the script only names this one.
// The `devCommand` in vercel.json (scripts/dev-static.mjs) is what `vercel dev` runs behind its router.
import { spawn } from "node:child_process";
import { devListenArgs, devNodeOptions } from "./dev-support.mjs";

// NODE_OPTIONS: IPv4 first and 2 s per address, or the builder install hangs on a black-holed IPv6 route (#597).
const env = { ...process.env, NODE_OPTIONS: devNodeOptions(process.env.NODE_OPTIONS) };
// The router on 127.0.0.1 unless the caller names a host: vercel dev binds 0.0.0.0 by default (#605).
const child = spawn("vercel", ["dev", ...devListenArgs(process.argv.slice(2))], { stdio: "inherit", env });
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => child.kill(sig));
child.on("exit", (code) => process.exit(code ?? 1));
