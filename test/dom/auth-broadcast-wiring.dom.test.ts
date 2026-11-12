// @vitest-environment happy-dom
//
// #591: `web/supabase.ts` installs the better-auth.message scrub BEFORE it creates the SDK client, so
// the client's very first write is covered, and it still creates the client where the browser blocks
// storage. The SDK is replaced by one whose `createClient` makes the write the real one would and
// records what survived it; `test/dom/auth-broadcast.dom.test.ts` drives the real SDK.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BROADCAST_KEY } from "../../web/auth-broadcast.js";

const sdk = vi.hoisted(() => ({ created: 0, survived: [] as (string | null)[] }));

vi.mock("@neondatabase/neon-js", () => ({
  createClient: () => {
    sdk.created++;
    try {
      localStorage.setItem(BROADCAST_KEY, '{"event":"session"}');
      sdk.survived.push(localStorage.getItem(BROADCAST_KEY));
    } catch {
      // Blocked storage: the real SDK's channel swallows this the same way.
    }
    return { auth: { onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }) } };
  },
  SupabaseAuthAdapter: () => ({}),
}));

const nativeSetItem = Storage.prototype.setItem;

/** A fresh `web/supabase.ts` (and scrub), as a build with accounts has it, subscribed the way the shell boots. */
async function boot() {
  vi.resetModules();
  vi.stubGlobal("__NEON_AUTH_URL__", "https://ep-test591.neonauth.example.test/neondb/auth");
  vi.stubGlobal("__NEON_DATA_API_URL__", "https://ep-test591.apirest.example.test/neondb/rest/v1");
  const account = await import("../../web/supabase.js");
  account.onAccount(() => {});
}

beforeEach(() => {
  sdk.created = 0;
  sdk.survived.length = 0;
});

afterEach(() => {
  vi.unstubAllGlobals();
  Storage.prototype.setItem = nativeSetItem;
});

describe("web/supabase.ts installs the scrub (#591)", () => {
  it("before it creates the SDK client, so the client's first write does not survive", async () => {
    // Node 25 and later shadow happy-dom's localStorage with an undefined one (see the other file).
    vi.stubGlobal("localStorage", new Storage());
    await boot();
    expect(sdk.created).toBe(1);
    expect(sdk.survived).toEqual([null]);
  });

  it("and still creates the client where reading localStorage throws (site data blocked)", async () => {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get: () => { throw new DOMException("The operation is insecure.", "SecurityError"); },
    });
    try {
      await boot();
      expect(sdk.created).toBe(1);
    } finally {
      Object.defineProperty(globalThis, "localStorage", { configurable: true, writable: true, value: new Storage() });
    }
  });
});
