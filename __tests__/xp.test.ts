import { describe, it, expect } from "vitest";
import { calculateXp } from "../lib/utils/xp";

describe("PVP Match XP Calculation", () => {
  it("should calculate correct XP for WIN with various margin bounds", () => {
    // Capped at max 80 (50 base + 30 max margin bonus)
    const xpMax = calculateXp("WIN", 20, 5);
    expect(xpMax).toBe(80);

    // WIN with a margin of 5: 50 base + (5 * 2) = 60 XP
    const xpMargin = calculateXp("WIN", 10, 5);
    expect(xpMargin).toBe(60);

    // WIN with no margin (or margin of 0): 50 base + 0 = 50 XP
    const xpNoMargin = calculateXp("WIN", 5, 5);
    expect(xpNoMargin).toBe(50);
  });

  it("should calculate correct XP for DRAW", () => {
    const xpDraw = calculateXp("DRAW", 5, 5);
    expect(xpDraw).toBe(25);
  });

  it("should calculate correct XP for LOSE", () => {
    const xpLose = calculateXp("LOSE", 2, 8);
    expect(xpLose).toBe(10);
  });

  it("should enforce bounds between 0 and 80 XP", () => {
    // Loss shouldn't be negative, must be minimum 10
    const xpNegative = calculateXp("LOSE", -5, 10);
    expect(xpNegative).toBe(10);

    // Capped at 80 even with huge margin
    const xpOverflow = calculateXp("WIN", 100, 0);
    expect(xpOverflow).toBe(80);
  });
});
