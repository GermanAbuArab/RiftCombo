import { describe, expect, it } from "vitest";
import { BUDGET_MS, budgetMs } from "./budget.js";

describe("budgetMs (#765)", () => {
  it("keeps the base budget on a machine with spare cores", () => {
    expect(budgetMs(60000, [0.5, 0.5, 0.5], 12)).toBe(60000);
    expect(budgetMs(60000, [0, 0, 0], 12)).toBe(60000); // os.loadavg() on Windows
    expect(budgetMs(60000, [12, 12, 12], 12)).toBe(60000);
  });

  it("scales by the load per core: load 57 on 12 cores is 4.75x", () => {
    expect(budgetMs(60000, [57, 50, 40], 12)).toBe(285000);
  });

  it("reads the larger of the 1- and 5-minute averages, so a run that starts in a lull still gets room", () => {
    expect(budgetMs(60000, [10, 30, 0], 12)).toBe(150000);
    expect(budgetMs(60000, [30, 10, 0], 12)).toBe(150000);
  });

  it("ignores the 15-minute average", () => {
    expect(budgetMs(60000, [0, 0, 120], 12)).toBe(60000);
  });

  it("caps the factor at 8, so a hang stays bounded", () => {
    expect(budgetMs(60000, [200, 200, 200], 12)).toBe(480000);
  });

  it("rounds to whole milliseconds", () => {
    expect(budgetMs(60000, [13, 0, 0], 7)).toBe(111429);
  });

  it("counts a non-finite or negative load, or fewer than 1 core, as factor 1", () => {
    expect(budgetMs(60000, [Number.NaN, 50, 0], 12)).toBe(60000);
    expect(budgetMs(60000, [50, Number.POSITIVE_INFINITY, 0], 12)).toBe(60000);
    expect(budgetMs(60000, [-1, 50, 0], 12)).toBe(60000);
    expect(budgetMs(60000, [], 12)).toBe(60000);
    expect(budgetMs(60000, [50, 50, 50], 0)).toBe(60000);
    expect(budgetMs(60000, [50, 50, 50], Number.NaN)).toBe(60000);
  });

  it("samples this machine into BUDGET_MS, between the base and 8x the base", () => {
    expect(Number.isInteger(BUDGET_MS)).toBe(true);
    expect(BUDGET_MS).toBeGreaterThanOrEqual(60000);
    expect(BUDGET_MS).toBeLessThanOrEqual(480000);
  });
});
