// @vitest-environment happy-dom
/**
 * The "Privacy choices" footer link (#293): a click reopens Google's consent message through the
 * `callbackQueue` when Google's code is on the page, and is a plain link to the privacy notice when
 * it is not, so the link never does nothing.
 */
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { reopenConsent, type Googlefc } from "../../web/consent.js";

const w = window as unknown as { googlefc?: Googlefc };

describe("reopenConsent", () => {
  it("queues showRevocationMessage under CONSENT_API_READY when Google's code is there", () => {
    const show = vi.fn();
    const fc: Googlefc = { showRevocationMessage: show };
    expect(reopenConsent({ googlefc: fc })).toBe(true);
    expect(fc.callbackQueue).toHaveLength(1);
    expect(show).not.toHaveBeenCalled();
    fc.callbackQueue![0]!.CONSENT_API_READY!();
    expect(show).toHaveBeenCalledTimes(1);
  });

  it("does nothing and says so when Google's code is absent", () => {
    expect(reopenConsent({})).toBe(false);
    expect(reopenConsent({ googlefc: { callbackQueue: [] } })).toBe(false);
  });
});

describe("the footer link's click", () => {
  beforeAll(async () => {
    document.body.innerHTML = `<footer class="doc colophon"><p><a href="/privacy#choices" data-privacy-choices>Privacy choices</a> <a href="/terms" id="terms">Terms</a></p></footer>`;
    await import("../../web/privacy-choices.js");
  });
  afterEach(() => { delete w.googlefc; });

  const click = (sel: string) => {
    const e = new MouseEvent("click", { bubbles: true, cancelable: true });
    document.querySelector(sel)!.dispatchEvent(e);
    return e;
  };

  it("opens the message in place of following the link when Google's code is on the page", () => {
    const show = vi.fn();
    w.googlefc = { showRevocationMessage: show, callbackQueue: [] };
    expect(click("a[data-privacy-choices]").defaultPrevented).toBe(true);
    w.googlefc.callbackQueue![0]!.CONSENT_API_READY!();
    expect(show).toHaveBeenCalledTimes(1);
  });

  it("follows the link to the privacy notice when it is not", () => {
    expect(click("a[data-privacy-choices]").defaultPrevented).toBe(false);
  });

  it("leaves every other link alone", () => {
    w.googlefc = { showRevocationMessage: vi.fn(), callbackQueue: [] };
    expect(click("#terms").defaultPrevented).toBe(false);
    expect(w.googlefc.callbackQueue).toHaveLength(0);
  });
});
