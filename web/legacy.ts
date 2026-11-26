// The landing's one script (#288). Every link from before #287 points at `/` with its route in the
// fragment (`/#/plays/x`, `/#/combos?deck=<id>`, `/#deck=<code>`), which the server never sees; `/` is
// a pre-rendered page now, not the app shell that used to read it. So the landing loads this, and it
// sends such a link to the path it means with a full load that replaces the old history entry. A
// plain fragment, or none, leaves the landing where it is. It never pushStates: the landing is a
// public page and the app is reached from it only by a full load (#272 §5).
import { redirectLegacyHash } from "./router.js";

redirectLegacyHash();
