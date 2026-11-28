import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Riot's Developer Portal verifies a production application by fetching https://riftcombo.app/riot.txt
// and requires "nothing else in the file but the above code" (#285, application 888790).
describe("riot.txt (#285)", () => {
  it("holds only the verification code the portal issued", () => {
    const txt = readFileSync(new URL("../web/riot.txt", import.meta.url), "utf8");
    expect(txt).toBe("39b7004b-6fa2-4792-9801-61f19a9abb8b");
  });

  it("is copied into public/ by build:web", () => {
    const build = readFileSync(new URL("../scripts/build-web.mjs", import.meta.url), "utf8");
    expect(build).toContain('"riot.txt"');
  });
});
