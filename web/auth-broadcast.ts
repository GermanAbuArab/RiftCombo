// The auth SDK's cross-tab channel (Better Auth's `WindowBroadcastChannel`, inside
// @neondatabase/auth) tells other tabs about a session change by WRITING the whole message to
// `localStorage["better-auth.message"]`, and nothing ever removes it. Measured on a Neon child
// branch (#591): after a token refresh the stored message carries the session JWT at
// `data.sessionData.session.token`, and that JWT is a live bearer for the Data API. The SDK has no
// option to turn the channel off, so this file removes the key (panel on #588, option a):
//
// - in the tab that wrote it, right after the write, because a tab gets no `storage` event for its
//   own writes and a single open tab would otherwise keep the JWT on disk;
// - in every other tab, when the write's `storage` event arrives, for a tab still running an older
//   build that writes without removing.
//
// The write itself still happens, and so does its `storage` event in the other tabs, which carries
// the value in `newValue`: that is how the SDK hears a sign-out made elsewhere, and it keeps working.
// The removal fires a second event with `newValue: null`, which the SDK's handler ignores.
// `test/dom/auth-broadcast.dom.test.ts` drives the SDK's real hooks and is pinned to its version.

export const BROADCAST_KEY = "better-auth.message";

let installed = false;

/** The page's localStorage, or null where there is none (a test in Node) or the browser blocks it. */
function pageStorage(): Storage | null {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    // Reading the global throws a SecurityError when the user blocks site data; the SDK's channel
    // cannot write there either, and the app must still get its client.
    return null;
  }
}

/** Install once, before the SDK client exists, so its first write is already covered. */
export function scrubAuthBroadcast(): void {
  if (installed) return;
  const storage = pageStorage();
  if (!storage) return;
  installed = true;
  const setItem = Storage.prototype.setItem;
  // On the prototype, because a Storage object turns any property assigned on it into a stored item.
  // The removal goes to whichever storage took the write (`this`), not to a captured reference, so
  // no identity check is needed; the SDK writes only to localStorage. `finally`, so a write that
  // fails on quota still clears what an earlier one left.
  Storage.prototype.setItem = function (this: Storage, ...args: [string, string]) {
    try {
      setItem.apply(this, args);
    } finally {
      if (`${args[0]}` === BROADCAST_KEY) this.removeItem(BROADCAST_KEY);
    }
  };
  addEventListener("storage", (event) => {
    if (event.key === BROADCAST_KEY && event.newValue !== null) storage.removeItem(BROADCAST_KEY);
  });
  // What an earlier build left behind.
  storage.removeItem(BROADCAST_KEY);
}
