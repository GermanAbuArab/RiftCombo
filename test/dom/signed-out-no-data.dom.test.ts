// @vitest-environment happy-dom
//
// Check 3 of #585, a suite check the security scan's auth role runs (personal-claude-issues#808):
// SIGNED OUT, THE APP TOUCHES NO DATA. The whole shell boots from `web/index.html` with the REAL
// `web/supabase.ts`; only the Neon SDK under it is replaced, by a client whose Data API entry points
// (`from`, `rpc`) record the call and throw a marker, and `fetch` throws the same marker for any
// Neon host. Nothing here reaches a server. Each app path is opened with the auth state `out` (the
// SDK reports no session) and `pending` (it never answers), then the shell is walked through the
// other paths; any Data API call fails the test with the path and the call by name.
//
// The second half proves that no pre-rendered public page carries a Neon host at all, so the only
// page code that can reach the Data API is the shell above.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { renderSite, type SiteInput } from "../../src/render/site.js";
// @ts-expect-error plain .mjs shared with scripts/build-web.mjs.
import { slimCard } from "../../scripts/web-card-fields.mjs";
// @ts-expect-error same.
import { loadPlays } from "../../scripts/web-plays.mjs";
// @ts-expect-error same.
import { stripInternalDeep } from "../../scripts/web-combo-prose.mjs";
// @ts-expect-error same.
import { appShell } from "../../scripts/web-seo.mjs";

const DATA_API = "data API touched (test #585)";
const AUTH_URL = "https://ep-test585.neonauth.c-0.us-east-1.aws.neon.tech/neondb/auth";
const DATA_URL = "https://ep-test585.apirest.c-0.us-east-1.aws.neon.tech/neondb/rest/v1";

type AuthCb = (event: string, session: unknown) => void;
const neon = vi.hoisted(() => ({
  calls: [] as string[],
  listeners: [] as ((event: string, session: unknown) => void)[],
  /** Off only in the control below, where a call is recorded and answered empty instead of thrown. */
  throwing: true,
}));

vi.mock("@neondatabase/neon-js", () => {
  // An empty answer to any query chain, for the control: every step returns the chain, awaiting it
  // gives no rows and no error.
  const empty: unknown = new Proxy(() => {}, {
    get: (_, p) => (p === "then" ? (ok: (v: unknown) => void) => ok({ data: [], error: null }) : () => empty),
  });
  const touch = (what: string): unknown => {
    neon.calls.push(what);
    if (!neon.throwing) return empty;
    throw new Error(`${DATA_API}: ${what}`);
  };
  const auth = {
    onAuthStateChange: (cb: AuthCb) => { neon.listeners.push(cb); return { data: { subscription: { unsubscribe() {} } } }; },
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithOAuth: async () => ({ error: null }),
    signOut: async () => ({ error: null }),
  };
  // Anything on the client other than `auth` is the Data API, named or not.
  const client = new Proxy({ auth } as Record<string, unknown>, {
    get: (t, p) => (p === "auth" ? t["auth"] : (...args: unknown[]) => touch(`${String(p)}(${args.map(String).join(", ")})`)),
  });
  return { createClient: () => client, SupabaseAuthAdapter: () => ({}) };
});

const root = process.cwd();
const file = (p: string) => readFileSync(join(root, p), "utf8");
const cardsJson = file("data/cards.json");
const settle = () => new Promise((r) => setTimeout(r, 60));

/** `fetch` serves the shell's two static data files and throws the marker for any Neon host. */
const fakeFetch = vi.fn(async (input: unknown) => {
  const url = new URL(String(input), location.href);
  if (url.hostname.endsWith("neon.tech")) {
    neon.calls.push(`fetch ${url.origin}${url.pathname}`);
    throw new Error(`${DATA_API}: fetch ${url.href}`);
  }
  if (url.pathname === "/data/cards.json") return new Response(cardsJson, { status: 200 });
  if (url.pathname === "/data/plays.json") return new Response(JSON.stringify({ plays: [] }), { status: 200 });
  return new Response("not found", { status: 404 });
});

/** Boot the real shell on `path` with the two build-time constants set, as a build with accounts has. */
async function boot(path: string) {
  vi.resetModules();
  neon.throwing = true;
  neon.calls.length = 0;
  neon.listeners.length = 0;
  vi.stubGlobal("__NEON_AUTH_URL__", AUTH_URL);
  vi.stubGlobal("__NEON_DATA_API_URL__", DATA_URL);
  vi.stubGlobal("fetch", fakeFetch);
  document.documentElement.innerHTML = file("web/index.html")
    .replace(/^[\s\S]*?<body[^>]*>/i, "").replace(/<\/body>[\s\S]*$/i, "");
  document.body.dataset["auth"] = "pending";
  history.replaceState(null, "", path);
  await import("../../web/main.js");
  await settle();
  const router = await import("../../web/router.js");
  // A navigation that would leave the shell is a full load in the browser; here it is recorded only.
  vi.spyOn(router.navigate, "load").mockImplementation(() => {});
  return router;
}

const PATHS = ["/decks", "/decks/0b8e6a52-6f0e-4d1b-9f1e-58500000585a", "/app", "/app?deck=0b8e6a52-6f0e-4d1b-9f1e-58500000585a"];

describe("check 3: signed out, the app touches no data (#585)", () => {
  for (const state of ["out", "pending"] as const) {
    it.each(PATHS)(`opened on %s with the auth state ${state}, it makes no Data API call on any path`, async (start) => {
      const router = await boot(start);
      const seen: string[] = [];
      const record = (where: string) => { for (const c of neon.calls.splice(0)) seen.push(`${where}: ${c}`); };
      record(`boot on ${start}`);
      expect(neon.listeners.length, "the shell never subscribed to the session").toBeGreaterThan(0);
      if (state === "out") for (const cb of [...neon.listeners]) cb("INITIAL_SESSION", null);
      await settle();
      expect(document.body.dataset["auth"]).toBe(state);
      record(`${start} ${state}`);
      for (const next of PATHS) {
        router.go(next);
        await settle();
        record(`${start} then ${next}`);
      }
      expect(seen, `Data API reached while signed out: ${seen.join("; ")}`).toEqual([]);
    }, 60_000);
  }

  it("is not vacuous: the same stubs see the reads once a session arrives", async () => {
    await boot("/decks");
    neon.throwing = false;
    const session = { user: { id: "u585", email: "u585@example.test", user_metadata: { full_name: "Test 585" } } };
    for (const cb of [...neon.listeners]) cb("SIGNED_IN", session);
    await settle();
    expect(document.body.dataset["auth"]).toBe("in");
    expect(neon.calls.some((c) => c.startsWith("from(profiles)"))).toBe(true);
    expect(neon.calls.some((c) => c.startsWith("rpc(claim_staged_decks"))).toBe(true);
    expect(neon.calls.some((c) => c.startsWith("from(decks)"))).toBe(true);
  }, 60_000);
});

describe("check 3: no pre-rendered page references the Data API (#585)", () => {
  const data = (f: string) => stripInternalDeep(JSON.parse(file(`data/${f}`)));
  const cardsFile = JSON.parse(cardsJson) as { resultsUpdatedAt: string; cards: object[] };
  const input: SiteInput = {
    combos: (data("combos.json") as { combos: SiteInput["combos"] }).combos,
    cards: cardsFile.cards.map(slimCard),
    legality: (data("legality.json") as { entries: SiteInput["legality"] }).entries,
    features: (data("features.json") as { features: SiteInput["features"] }).features,
    plays: (loadPlays(root) as SiteInput["plays"]).map((p) => ({ ...p, file: `docs/plays/${p.slug}.md` })),
    resultsUpdatedAt: cardsFile.resultsUpdatedAt,
  };
  // The origins the CSP allows the bundle to call: the real endpoints, read from the generated file.
  const neonOrigins = (file("vercel.json").match(/https:\/\/[a-z0-9.-]+\.neon\.tech/g) ?? []);

  it("reads the real Neon origins from vercel.json, so the check is not vacuous", () => {
    expect(neonOrigins.some((o) => o.includes(".apirest."))).toBe(true);
  });

  it("finds no Neon host in any public page, the copied HTML or the app shell", () => {
    const pages: { file: string; html: string }[] = renderSite(input).map((p) => ({ file: p.file, html: p.html }));
    for (const f of readdirSync(join(root, "web")).filter((f) => f.endsWith(".html"))) pages.push({ file: `web/${f}`, html: file(`web/${f}`) });
    pages.push({ file: "app.html", html: appShell(file("web/index.html")) });
    expect(pages.length).toBeGreaterThan(100);
    const hits = pages.filter((p) => /neon\.tech|apirest\.|\/rest\/v1/.test(p.html) || neonOrigins.some((o) => p.html.includes(o))).map((p) => p.file);
    expect(hits, `pre-rendered pages referencing the Data API: ${hits.join(", ")}`).toEqual([]);
  });
});
