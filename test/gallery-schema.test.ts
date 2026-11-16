import { describe, expect, it } from "vitest";
// scripts/build-cards.mjs is plain JS with no declaration file; see test/errata.test.ts.
// @ts-expect-error — untyped .mjs import
import { displayName, gearMight } from "../scripts/build-cards.mjs";

// Shaped like the gallery items read 2026-11-16 (#660): the epithet in `subtitle`, the card type
// in `cardType.type`, the Signature marker in `cardType.superType`.
const item = (o: { name: string; subtitle?: string; type: string[]; superType?: string[]; might?: number; mightBonus?: number }) => ({
  name: o.name,
  subtitle: o.subtitle,
  publicCode: "TST-001/001",
  cardType: { type: o.type.map((id) => ({ id })), superType: (o.superType ?? []).map((id) => ({ id })) },
  might: o.might === undefined ? undefined : { value: o.might },
  mightBonus: o.mightBonus === undefined ? undefined : { value: o.mightBonus },
});

describe("displayName rebuilds the joined names the pool, errata and saved decks use (#660)", () => {
  it("joins a champion unit with a comma", () => {
    expect(displayName(item({ name: "Draven", subtitle: "Vanquisher", type: ["unit"], superType: ["champion"] }))).toBe("Draven, Vanquisher");
  });
  it("joins a legend with a dash, the gallery's old Proving Grounds spelling", () => {
    expect(displayName(item({ name: "Dark Child", subtitle: "Starter", type: ["legend"] }))).toBe("Dark Child - Starter");
  });
  it("keeps a Signature card's bare name: its subtitle is the champion it belongs to", () => {
    expect(displayName(item({ name: "Tibbers", subtitle: "Annie", type: ["unit"], superType: ["signature"] }))).toBe("Tibbers");
  });
  it("leaves a card with no subtitle alone", () => {
    expect(displayName(item({ name: "Unchecked Power", type: ["spell"] }))).toBe("Unchecked Power");
  });
});

describe("gearMight keeps Equipment's bonus out of `might` (#660)", () => {
  it("drops a gear's might when it repeats the bonus", () => {
    expect(gearMight(item({ name: "Trinity Force", type: ["gear"], might: 2, mightBonus: 2 }))).toBeNull();
  });
  it("fails the build on a gear whose might and bonus differ", () => {
    expect(() => gearMight(item({ name: "Odd Gear", type: ["gear"], might: 3, mightBonus: 2 }))).toThrow(/differs from mightBonus/);
  });
  it("keeps a unit's might", () => {
    expect(gearMight(item({ name: "Unit", type: ["unit"], might: 5 }))).toBe(5);
  });
  it("keeps a gear with no might as null", () => {
    expect(gearMight(item({ name: "Gear", type: ["gear"] }))).toBeNull();
  });
});
