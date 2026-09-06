// @vitest-environment happy-dom
//
// The first DOM tests in the project (#138). Everything under web/ was unreachable from the suite —
// no jsdom, no happy-dom, so no test could mount a document — which left the whole account gate, the
// router, the builder's rendering and My decks' CRUD covered only by reading the source as text.
// The environment is chosen per file with the docblock above rather than in a config, so the other
// eighteen test files keep running in node exactly as they did.
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * `web/supabase.ts` is the network, and `accountsEnabled` is a build-time constant inside it, so the
 * gate can only be exercised by replacing that module. The handle lets each test decide what the
 * build knows and when the session arrives.
 */
const supabase = vi.hoisted(() => ({
  accountsEnabled: true,
  listeners: [] as ((a: { id: string; label: string } | null) => void)[],
  signIn: vi.fn(async () => {}),
  signOut: vi.fn(async () => {}),
  deleteAccount: vi.fn(async () => {}),
}));

vi.mock("../../web/supabase.js", () => ({
  get accountsEnabled() { return supabase.accountsEnabled; },
  onAccount: (cb: (a: { id: string; label: string } | null) => void) => { supabase.listeners.push(cb); },
  signIn: supabase.signIn,
  signOut: supabase.signOut,
  deleteAccount: supabase.deleteAccount,
}));

const GATE_HTML = `
  <div id="gate"><button id="gate-signin" type="button">Sign in with Google</button></div>
  <div id="account-top" hidden><span id="acct-who" hidden><span id="acct-label"></span></span>
    <button id="acct-signout" type="button">Sign out</button></div>
  <section id="account" hidden><div id="account-body"></div><p id="account-msg"></p></section>`;

beforeEach(() => {
  vi.resetModules();
  supabase.accountsEnabled = true;
  supabase.listeners.length = 0;
  supabase.signIn.mockClear();
  document.body.innerHTML = GATE_HTML;
  // The HTML ships this default so the page shows neither side until the session is known.
  document.body.dataset["auth"] = "pending";
});

const load = async () => await import("../../web/account.js");

describe("the gate (#39)", () => {
  it("stays pending until the session is known", async () => {
    const { gate } = await load();
    gate();
    // gate() only registers the listener; nothing has answered yet.
    expect(document.body.dataset["auth"]).toBe("pending");
    expect(supabase.listeners).toHaveLength(1);
  });

  it("opens outright for a build with no Supabase project", async () => {
    supabase.accountsEnabled = false;
    const { gate } = await load();
    gate();
    expect(document.body.dataset["auth"]).toBe("open");
    // No listener is registered either: there is no session to wait for.
    expect(supabase.listeners).toHaveLength(0);
  });

  it("shows the entrance with no session and the app with one", async () => {
    const { gate } = await load();
    gate();
    supabase.listeners[0]!(null);
    expect(document.body.dataset["auth"]).toBe("out");
    supabase.listeners[0]!({ id: "u1", label: "german abu arab" });
    expect(document.body.dataset["auth"]).toBe("in");
    supabase.listeners[0]!(null);
    expect(document.body.dataset["auth"]).toBe("out");
  });

  it("wires the one sign-in button the entrance carries", async () => {
    const { gate } = await load();
    gate();
    document.querySelector<HTMLButtonElement>("#gate-signin")!.click();
    expect(supabase.signIn).toHaveBeenCalledTimes(1);
  });
});

describe("the account panel", () => {
  it("names the player and offers the two-step close", async () => {
    const { gate, initAccount } = await load();
    gate();
    initAccount();
    supabase.listeners.forEach((cb) => cb({ id: "u1", label: "german abu arab" }));

    expect(document.querySelector<HTMLElement>("#account-top")!.hidden).toBe(false);
    expect(document.querySelector("#acct-label")!.textContent).toBe("german abu arab");
    expect(document.querySelector<HTMLElement>("#account")!.hidden).toBe(false);

    // Deleting an account is never one click, and never the default one.
    expect(document.querySelector("#account-body")!.textContent).toContain("Delete account");
    document.querySelector<HTMLButtonElement>('[data-act="close"]')!.click();
    expect(document.querySelector("#account-body")!.textContent).toContain("Delete for good");
    expect(supabase.deleteAccount).not.toHaveBeenCalled();
    document.querySelector<HTMLButtonElement>('[data-act="close-cancel"]')!.click();
    expect(document.querySelector("#account-body")!.textContent).toContain("Delete account");
  });

  it("draws nothing at all without a session", async () => {
    const { gate, initAccount } = await load();
    gate();
    initAccount();
    supabase.listeners.forEach((cb) => cb(null));
    expect(document.querySelector<HTMLElement>("#acct-who")!.hidden).toBe(true);
    expect(document.querySelector<HTMLElement>("#account")!.hidden).toBe(true);
    expect(document.querySelector("#account-body")!.innerHTML).toBe("");
  });
});
