// `/api/csp-report` (#290), classified public in scripts/api-routes.mjs: it proves its own guards in
// process, as api/deck-url.ts does in test/api-routes.test.ts. The handler makes no request of its
// own, so `fetch` is stubbed to fail loudly if it ever does.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler, { MAX_FIELD, MAX_LINES_PER_MINUTE, MAX_REPORT_BYTES, reportLine, resetBudget } from "../api/csp-report.js";
// @ts-expect-error plain .mjs shared with scripts/check-functions.mjs.
import { ROUTES } from "../scripts/api-routes.mjs";

const URL_ = "https://riftcombo.app/api/csp-report";
const REPORT = {
  "csp-report": {
    "document-uri": "https://riftcombo.app/combos/x",
    "effective-directive": "script-src-elem",
    "blocked-uri": "https://example.com/a.js",
    disposition: "report",
    "line-number": 3,
    "original-policy": "script-src 'none'",
  },
};
const post = (body: string, type = "application/csp-report", method = "POST") =>
  handler(new Request(URL_, { method, headers: { "content-type": type }, body: method === "GET" || method === "HEAD" ? undefined : body }));

let logged: string[] = [];
beforeEach(() => {
  logged = [];
  resetBudget();
  vi.spyOn(console, "log").mockImplementation((line: string) => { logged.push(line); });
  vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("csp-report made a request"); }));
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("/api/csp-report (#290)", () => {
  it("is classified public, with its reason", () => {
    expect(ROUTES["api/csp-report.ts"]?.kind).toBe("public");
  });

  it("logs one line per report-uri report, with the known fields only, and answers 204", async () => {
    const res = await post(JSON.stringify(REPORT));
    expect(res.status).toBe(204);
    expect(logged).toEqual([
      `csp-report {"document":"https://riftcombo.app/combos/x","directive":"script-src-elem","blocked":"https://example.com/a.js","disposition":"report","line":"3"}`,
    ]);
  });

  it("reads a report-to batch, one line per violation", async () => {
    const body = { documentURL: "https://riftcombo.app/guide", effectiveDirective: "script-src-elem", blockedURL: "inline", disposition: "report", sample: "x()" };
    const res = await post(JSON.stringify([{ type: "csp-violation", body }, { type: "csp-violation", body }]), "application/reports+json");
    expect(res.status).toBe(204);
    expect(logged).toHaveLength(2);
    expect(logged[0]).toBe(`csp-report {"document":"https://riftcombo.app/guide","directive":"script-src-elem","blocked":"inline","disposition":"report","sample":"x()"}`);
  });

  it("refuses every method but POST, and any other content type, without logging", async () => {
    for (const m of ["GET", "HEAD", "PUT", "DELETE"]) expect((await post(JSON.stringify(REPORT), "application/csp-report", m)).status, m).toBe(405);
    for (const t of ["text/plain", "application/x-www-form-urlencoded", ""]) expect((await post(JSON.stringify(REPORT), t)).status, t).toBe(415);
    expect(logged).toEqual([]);
  });

  it("refuses a body over the cap with 413, and a body that is not a report with 400", async () => {
    expect((await post(`{"csp-report":{"x":"${"a".repeat(MAX_REPORT_BYTES)}"}}`)).status).toBe(413);
    for (const body of ["not json", "{}", "[]", `{"csp-report":"x"}`, `[{"type":"deprecation","body":{}}]`, "null"]) {
      expect((await post(body)).status, body).toBe(400);
    }
    expect(logged).toEqual([]);
  });

  it("cuts every value and strips control characters, so a report cannot forge a log line", async () => {
    const line = reportLine({ "blocked-uri": `x\ncsp-report {"forged":1}${"b".repeat(MAX_FIELD * 2)}` });
    expect(line).not.toContain("\n");
    expect((JSON.parse(line.slice("csp-report ".length)) as { blocked: string }).blocked).toHaveLength(MAX_FIELD);
  });

  it("leaves out a field that is not a string or a number, so a crafted object cannot throw (500)", async () => {
    const res = await post(`{"csp-report":{"blocked-uri":{"toString":1},"document-uri":["a"],"effective-directive":"script-src-elem","line-number":3}}`);
    expect(res.status).toBe(204);
    expect(logged).toEqual([`csp-report {"directive":"script-src-elem","line":"3"}`]);
  });

  it("logs at most its per-minute budget and answers 429 past it", async () => {
    for (let i = 0; i < MAX_LINES_PER_MINUTE; i++) expect((await post(JSON.stringify(REPORT))).status).toBe(204);
    expect((await post(JSON.stringify(REPORT))).status).toBe(429);
    expect(logged).toHaveLength(MAX_LINES_PER_MINUTE);
  });
});
