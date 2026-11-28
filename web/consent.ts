// Reopening Google's consent message (#293, #272 §4). Google's Privacy & messaging API
// (https://developers.google.com/funding-choices/fc-api-docs, read 2026-11-27) says "The only
// supported way to invoke any function is by adding it to the `callbackQueue`", keyed by when it may
// run, and that `showRevocationMessage()` "Clears the current EU regulations consent record, if
// present, and shows the EU regulations message again". Its tip: "If the googlefc API has not been
// loaded onto the page at the time the link is clicked, then the link will have no effect." So this
// queues the call only when Google's code is there, and says whether it did; the caller lets the
// link fall through to the privacy notice when it did not.

export interface Googlefc {
  showRevocationMessage?: () => void;
  callbackQueue?: Record<string, () => void>[];
}

export function reopenConsent(w: { googlefc?: Googlefc }): boolean {
  const fc = w.googlefc;
  if (typeof fc?.showRevocationMessage !== "function") return false;
  fc.callbackQueue = fc.callbackQueue || [];
  fc.callbackQueue.push({ CONSENT_API_READY: () => fc.showRevocationMessage!() });
  return true;
}
