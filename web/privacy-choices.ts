// The "Privacy choices" footer link's one script (#293), loaded only by pages that carry the link
// (`withPrivacyChoices` in src/render/layout.ts). A click reopens Google's consent message when
// Google's code is on the page; otherwise the link goes to the privacy notice as a plain link.
import { reopenConsent, type Googlefc } from "./consent.js";

document.addEventListener("click", (e) => {
  const link = (e.target as Element | null)?.closest?.("a[data-privacy-choices]");
  if (link && reopenConsent(window as unknown as { googlefc?: Googlefc })) e.preventDefault();
});
