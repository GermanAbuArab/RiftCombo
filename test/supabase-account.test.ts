import { describe, expect, it } from "vitest";
import { accountOf } from "../web/supabase.js";
import type { Session } from "@supabase/supabase-js";

/**
 * The one function in web/supabase.ts that needs no network (#138): what to call the player in the
 * header. Google gives a `full_name` most of the time and a `name` sometimes, an email always, and
 * the fallback exists so the header never reads "undefined" for an account that has none of them.
 */
const session = (user: Record<string, unknown>) => ({ user } as unknown as Session);

describe("who is signed in", () => {
  it("is nobody without a session", () => {
    expect(accountOf(null)).toBeNull();
  });

  it("prefers the full name, then the short one, then the email", () => {
    expect(accountOf(session({ id: "u1", email: "p@example.com", user_metadata: { full_name: "German Abu Arab", name: "German" } })))
      .toEqual({ id: "u1", label: "German Abu Arab" });
    expect(accountOf(session({ id: "u1", email: "p@example.com", user_metadata: { name: "German" } })).label)
      .toBe("German");
    expect(accountOf(session({ id: "u1", email: "p@example.com", user_metadata: {} })).label)
      .toBe("p@example.com");
  });

  it("never leaves the header empty, whatever the provider sent", () => {
    expect(accountOf(session({ id: "u1", user_metadata: null })).label).toBe("Signed in");
    // An empty string is not a name either: the || chain has to fall through it.
    expect(accountOf(session({ id: "u1", email: "", user_metadata: { full_name: "" } })).label).toBe("Signed in");
  });

  it("carries the id through, which is what a row is written against", () => {
    expect(accountOf(session({ id: "abc", email: "p@example.com", user_metadata: {} })).id).toBe("abc");
  });
});
