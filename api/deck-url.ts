// Vercel Edge Function: proxies the one thing the browser cannot fetch itself — a Piltover
// Archive deck page (CORS). Allowlisted host, honest User-Agent, short cache.
//
// Ported from the Cloudflare Worker (web/worker.ts) with the logic unchanged; it only ever used
// standard web APIs. Security headers now come from vercel.json, which also covers static files.

export const config = { runtime: "edge" };

const UA = "RiftCombo/0.1 (+https://github.com/GermanAbuArab/RiftCombo)";
const ALLOWED_HOSTS = new Set(["piltoverarchive.com", "www.piltoverarchive.com"]);

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra } });

/** Reassemble the React Flight payload a Next.js page ships in self.__next_f.push([1, "..."]) chunks. */
function flight(html: string): string {
  const re = /self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)<\/script>/g;
  let out = "";
  for (let m = re.exec(html); m; m = re.exec(html)) out += JSON.parse(m[1]!) as string;
  return out;
}

/** Slice a balanced JSON object starting at `start` (which must be a "{"). */
function balanced(s: string, start: number): string | null {
  let depth = 0, inStr = false, escaped = false;
  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) return s.slice(start, i + 1);
  }
  return null;
}

interface PAEntry { quantity: number; variantId: string | number; card: { name: string; cardVariants: { id: number; variantNumber: string }[] } }
interface PADeck { name: string; legend?: { variantNumber: string }; champions: PAEntry[]; battlefields: PAEntry[]; runes: PAEntry[]; maindeck: PAEntry[]; sideboard: PAEntry[] }

const cleanCode = (v: string) => v.replace(/-(Foil|Nexus|Release)$/i, "");

async function deckFromPiltover(target: URL): Promise<Response> {
  if (!ALLOWED_HOSTS.has(target.hostname) || !/^\/decks\/view\/[a-z0-9-]+\/?$/i.test(target.pathname)) {
    return json({ error: "Only Piltover Archive deck links (piltoverarchive.com/decks/view/…) are supported." }, 400);
  }
  const upstream = await fetch(target.toString(), { headers: { "User-Agent": UA, RSC: "1", Accept: "text/x-component, text/html" } });
  if (!upstream.ok) return json({ error: `Piltover Archive answered ${upstream.status}.` }, 502);
  const body = await upstream.text();
  const text = body.includes("__next_f.push") ? flight(body) : body;
  const at = text.indexOf('"deck":{');
  if (at < 0) return json({ error: "That page does not contain a deck (private, deleted, or not a deck page)." }, 404);
  const raw = balanced(text, text.indexOf("{", at + 7));
  if (!raw) return json({ error: "Could not read the deck payload." }, 502);
  const deck = JSON.parse(raw) as PADeck;
  const variantOf = (e: PAEntry) =>
    e.card.cardVariants.find((v) => v.variantNumber === e.variantId) ?? e.card.cardVariants.find((v) => v.id === e.variantId) ?? e.card.cardVariants[0]!;
  const entries: { code: string; name: string; count: number; section: string }[] = [];
  if (deck.legend) entries.push({ code: cleanCode(deck.legend.variantNumber), name: "", count: 1, section: "legend" });
  const sections: [keyof PADeck, string][] = [["champions", "champion"], ["battlefields", "battlefields"], ["runes", "runes"], ["maindeck", "main"], ["sideboard", "sideboard"]];
  for (const [key, section] of sections) {
    for (const e of (deck[key] as PAEntry[] | undefined) ?? []) entries.push({ code: cleanCode(variantOf(e).variantNumber), name: e.card.name, count: e.quantity, section });
  }
  return json({ title: deck.name, source: target.toString(), entries }, 200, { "cache-control": "public, max-age=600" });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "GET") return json({ error: "GET only" }, 405);
  const raw = new URL(request.url).searchParams.get("url") ?? "";
  let target: URL;
  try { target = new URL(raw); } catch { return json({ error: "Not a URL." }, 400); }
  if (target.protocol !== "https:") return json({ error: "https only" }, 400);
  try { return await deckFromPiltover(target); }
  catch (err) { return json({ error: `Upstream failure: ${(err as Error).message}` }, 502); }
}
