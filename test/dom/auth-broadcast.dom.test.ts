// @vitest-environment happy-dom
//
// #591: the auth SDK's cross-tab channel writes `localStorage["better-auth.message"]` and never
// removes it. Measured on a Neon child branch (evidence on #591): after a TOKEN_REFRESH the stored
// value carries the session JWT at `data.sessionData.session.token`, and that JWT read the test
// identity's rows from the Data API. `web/auth-broadcast.ts` removes the key in the tab that wrote
// it and in every other tab, and these tests drive the SDK's REAL hooks, not a copy of them.
//
// PINNED TO THE SDK VERSION. The hooks are imported from an internal chunk of @neondatabase/auth
// whose file name changes with every release, so an upgrade fails this file at import or at the
// version check below. That is the point: on an upgrade, re-measure the payload (#591's recipe)
// before touching the pins.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
// @ts-expect-error internal chunk of @neondatabase/auth 0.5.0-beta, no types; pinned on purpose.
import { n as SESSION_CACHE, r as HOOKS } from "../../node_modules/@neondatabase/auth/dist/adapter-core-CZ8saNEY.mjs";
import { BROADCAST_KEY, scrubAuthBroadcast } from "../../web/auth-broadcast.js";

const ROOT = join(import.meta.dirname, "..", "..");
const versionOf = (dir: string) => JSON.parse(readFileSync(join(ROOT, "node_modules", dir, "package.json"), "utf8")).version;

/** A JWT-shaped string with a future `exp`, so the SDK's cache keeps it (its TTL is read from `exp`). */
const jwt = (n: number) => {
  const part = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  return `${part({ alg: "EdDSA" })}.${part({ sub: "u1", n, exp: Math.floor(Date.now() / 1000) + 900 })}.sig${n}`;
};
const sessionData = (n: number) => ({
  session: { id: "s1", userId: "u1", token: jwt(n), expiresAt: "2099-01-01T00:00:00.000Z" },
  user: { id: "u1", name: "QA", email: "qa@example.test" },
});

// Node 25 and later define their own `localStorage` global, undefined without `--localstorage-file`,
// and it hides happy-dom's (measured on the Mac's Node 26; CI runs `.nvmrc`'s 22). Both get a fresh
// happy-dom Storage, which is also what the SDK reads, since it names the bare global.
vi.stubGlobal("localStorage", new Storage());

/** The browser's own write, taken before anything wraps it: what ANOTHER tab's write looks like here. */
const nativeSetItem = Storage.prototype.setItem;

/** Every write the SDK made to the key, so a test cannot pass because the SDK wrote nothing. */
const writes: string[] = [];

beforeAll(() => {
  const set = Storage.prototype.setItem;
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (this: Storage, key: string, value: string) {
    if (key === BROADCAST_KEY) writes.push(JSON.parse(value).data?.trigger);
    return set.call(this, key, value);
  });
  scrubAuthBroadcast();
});

afterEach(() => {
  writes.length = 0;
  HOOKS.signOut.onSuccess();
  writes.length = 0;
  localStorage.clear();
});

describe("the auth SDK this file was measured against", () => {
  it("is the pinned version: re-measure #591 before moving these", () => {
    expect(versionOf("@neondatabase/neon-js")).toBe("0.7.0-beta");
    expect(versionOf("@neondatabase/auth")).toBe("0.5.0-beta");
    expect(versionOf("@neondatabase/auth/node_modules/better-auth")).toBe("1.6.23");
  });
});

describe("better-auth.message does not survive in this tab (#591)", () => {
  it("is removed after a TOKEN_REFRESH, which carries the JWT", () => {
    // Three get-sessions, because the SDK compares a new token with the cache as it stood BEFORE the
    // previous write (`lastSessionData`, adapter-core-CZ8saNEY.mjs:209-211 and 232-235): the second
    // call compares against nothing, the third against the first.
    for (const n of [1, 2, 3]) HOOKS.getSession.onSuccess(sessionData(n));
    expect(writes).toContain("TOKEN_REFRESHED");
    expect(localStorage.getItem(BROADCAST_KEY)).toBeNull();
    // The SDK still has the session in memory, where the app reads it.
    expect(SESSION_CACHE.getCachedSession()?.session.token).toBe(jwt(3));
  });

  it("is removed after a SIGN_IN", () => {
    HOOKS.signIn.onSuccess(sessionData(1));
    expect(writes).toContain("SIGNED_IN");
    expect(localStorage.getItem(BROADCAST_KEY)).toBeNull();
  });

  it("is removed when another tab's write arrives", () => {
    const value = JSON.stringify({ event: "session", data: { trigger: "TOKEN_REFRESHED", sessionData: sessionData(3) }, clientId: "other" });
    // What the other tab left behind, then the event this tab receives for it.
    nativeSetItem.call(localStorage, BROADCAST_KEY, value);
    nativeSetItem.call(localStorage, "untouched", "1");
    window.dispatchEvent(new StorageEvent("storage", { key: BROADCAST_KEY, newValue: value, storageArea: localStorage }));
    expect(localStorage.getItem(BROADCAST_KEY)).toBeNull();
    expect(localStorage.getItem("untouched")).toBe("1");
  });

  it("leaves every other key alone, written before or after it", () => {
    localStorage.setItem("riftcombo.before", "kept");
    HOOKS.signIn.onSuccess(sessionData(1));
    localStorage.setItem("riftcombo.after", "kept");
    expect(writes).toContain("SIGNED_IN");
    expect(localStorage.getItem(BROADCAST_KEY)).toBeNull();
    expect([localStorage.getItem("riftcombo.before"), localStorage.getItem("riftcombo.after")]).toEqual(["kept", "kept"]);
  });
});

describe("sign-out still clears the session (#591)", () => {
  it("in this tab: the cache empties and no message is left behind", () => {
    HOOKS.signIn.onSuccess(sessionData(1));
    expect(SESSION_CACHE.getCachedSession()).not.toBeNull();
    HOOKS.signOut.onRequest();
    HOOKS.signOut.onSuccess();
    expect(writes).toContain("SIGNED_OUT");
    expect(SESSION_CACHE.getCachedSession()).toBeNull();
    expect(localStorage.getItem(BROADCAST_KEY)).toBeNull();
  });

  it("from another tab: the SDK still hears it, the app is told, and the key is gone", async () => {
    // Stubbed for the rest of the file: the client keeps refetching the session after this test.
    globalThis.fetch = vi.fn(async () => Response.json(null));
    const { createClient, SupabaseAuthAdapter } = await import("@neondatabase/neon-js");
    // The app's exact construction (web/supabase.ts), on hosts that are never reached.
    const client = createClient({
      auth: { adapter: SupabaseAuthAdapter(), url: "https://ep-test591.neonauth.example.test/neondb/auth" },
      dataApi: { url: "https://ep-test591.apirest.example.test/neondb/rest/v1" },
    });
    const events: [string, unknown][] = [];
    client.auth.onAuthStateChange((event, session) => { events.push([event, session]); });
    await vi.waitFor(() => expect(events.length).toBeGreaterThan(0));
    HOOKS.signIn.onSuccess(sessionData(1));
    events.length = 0;

    const value = JSON.stringify({ event: "session", data: { trigger: "SIGNED_OUT", sessionData: null }, clientId: "other" });
    nativeSetItem.call(localStorage, BROADCAST_KEY, value);
    window.dispatchEvent(new StorageEvent("storage", { key: BROADCAST_KEY, newValue: value, storageArea: localStorage }));
    await vi.waitFor(() => expect(events).toContainEqual(["SIGNED_OUT", null]));
    expect(SESSION_CACHE.getCachedSession()).toBeNull();
    expect(localStorage.getItem(BROADCAST_KEY)).toBeNull();
  });
});
