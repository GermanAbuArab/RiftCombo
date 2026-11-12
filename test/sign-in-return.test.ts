import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * #580: the sign-in hands the auth host a return target, and it has to be the page the player is on
 * (origin + pathname) with no query and no hash. The SDK client is replaced by a recorder, so the
 * only thing under test is what `signIn` passes.
 */
const signInWithOAuth = vi.fn(async (_args: unknown) => ({ error: null }));
vi.mock("@neondatabase/neon-js", () => ({
  createClient: () => ({ auth: { signInWithOAuth } }),
  SupabaseAuthAdapter: () => ({}),
}));

const { signIn } = await import("../web/supabase.js");

const from = (href: string) => {
  const u = new URL(href);
  vi.stubGlobal("location", { origin: u.origin, pathname: u.pathname, search: u.search, hash: u.hash });
};
const redirectTo = () => (signInWithOAuth.mock.calls.at(-1)![0] as { options: { redirectTo: string } }).options.redirectTo;

describe("sign-in return target", () => {
  afterEach(() => { vi.unstubAllGlobals(); signInWithOAuth.mockClear(); });

  it("returns to the deck page the player signed in from", async () => {
    from("https://riftcombo.app/decks/abc-123");
    await signIn();
    expect(redirectTo()).toBe("https://riftcombo.app/decks/abc-123");
  });

  it("returns to the root from the root", async () => {
    from("https://riftcombo.app/");
    await signIn();
    expect(redirectTo()).toBe("https://riftcombo.app/");
  });

  it("drops a query and a hash", async () => {
    from("https://riftcombo.app/decks/abc-123?x=1#deck=ZZZ");
    await signIn();
    expect(redirectTo()).toBe("https://riftcombo.app/decks/abc-123");
    expect(redirectTo()).not.toMatch(/[?#]/);
  });
});
