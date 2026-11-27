// Vercel Edge Function: the report target of the ad surface's Content-Security-Policy-Report-Only
// (#290, #272 §5). A browser POSTs each violation here and the function writes one line per report to
// the function's log, which is where the Report-Only window is read from. It answers nothing a page
// could use and stores nothing. It comes off once the policy is enforced.
//
// It is public because a browser sends reports without credentials. Its guards, in order: POST only,
// a report content type only, a byte cap counted off the stream, a JSON shape check, a per-instance
// cap on lines logged per minute, and every logged value cut to a fixed length.
//
// The per-minute cap lives in module state, so it bounds one instance, never the whole deployment: each
// new instance starts a fresh minute (`vercel dev` starts one per request, so it bounds only a batch
// there). It keeps one POST, or one warm instance, from writing more than its budget of lines; it is no
// global rate limit, and a request this function refuses is still a line in Vercel's own request log.

export const config = { runtime: "edge" };

import { readCapped, TooLargeError } from "./_deck-url-guards.js";

/** A report is a few hundred bytes; a `report-to` batch a few KB. */
export const MAX_REPORT_BYTES = 16 * 1024;

/** Lines logged per instance per minute; past it the report is dropped with 429. */
export const MAX_LINES_PER_MINUTE = 120;

/** The longest value written for any one field. */
export const MAX_FIELD = 300;

/** `report-uri` sends application/csp-report; `report-to` sends application/reports+json. */
const TYPES = new Set(["application/csp-report", "application/reports+json", "application/json"]);

/** The fields of a report worth a line, in the two shapes browsers send (camel and kebab case). */
const FIELDS: [string, string[]][] = [
  ["document", ["document-uri", "documentURL", "documentURI"]],
  ["directive", ["effective-directive", "effectiveDirective", "violated-directive", "violatedDirective"]],
  ["blocked", ["blocked-uri", "blockedURL", "blockedURI"]],
  ["disposition", ["disposition"]],
  ["source", ["source-file", "sourceFile"]],
  ["line", ["line-number", "lineNumber"]],
  ["sample", ["script-sample", "sample"]],
];

let budget = { start: 0, lines: 0 };

/** For the suite only: start a fresh minute. */
export function resetBudget(): void {
  budget = { start: 0, lines: 0 };
}

function spend(now: number): boolean {
  if (now - budget.start >= 60_000) budget = { start: now, lines: 0 };
  return ++budget.lines <= MAX_LINES_PER_MINUTE;
}

/** The report bodies inside one POST: a `{"csp-report": {...}}` object or a `report-to` array. */
function reportsIn(payload: unknown): Record<string, unknown>[] | null {
  const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
  if (Array.isArray(payload)) {
    const bodies = payload.filter((r) => isObject(r) && r["type"] === "csp-violation" && isObject(r["body"])).map((r) => r["body"] as Record<string, unknown>);
    return bodies.length === payload.length && bodies.length > 0 ? bodies : null;
  }
  return isObject(payload) && isObject(payload["csp-report"]) ? [payload["csp-report"]] : null;
}

/**
 * One log line: the known fields only, each a string cut to MAX_FIELD, control characters removed. A field
 * whose value is not a string or a number is left out: browsers send only those, and `String()` of a
 * crafted object (`{"toString":1}`) throws.
 */
export function reportLine(report: Record<string, unknown>): string {
  const out: Record<string, string> = {};
  for (const [name, keys] of FIELDS) {
    const key = keys.find((k) => typeof report[k] === "string" || typeof report[k] === "number");
    if (key === undefined) continue;
    out[name] = String(report[key]).replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, MAX_FIELD);
  }
  return `csp-report ${JSON.stringify(out)}`;
}

const answer = (status: number) => new Response(null, { status, headers: { "cache-control": "no-store" } });

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") return answer(405);
  const type = (request.headers.get("content-type") ?? "").split(";")[0]!.trim().toLowerCase();
  if (!TYPES.has(type)) return answer(415);
  let reports: Record<string, unknown>[] | null;
  try { reports = reportsIn(JSON.parse(await readCapped(request.body, MAX_REPORT_BYTES))); }
  catch (err) { return answer(err instanceof TooLargeError ? 413 : 400); }
  if (!reports) return answer(400);
  const now = Date.now();
  for (const r of reports) {
    if (!spend(now)) return answer(429);
    console.log(reportLine(r));
  }
  return answer(204);
}
