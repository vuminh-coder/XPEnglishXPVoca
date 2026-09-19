import { describe, it, expect } from "vitest";
import { formatPercent, roundPercent } from "@/shared/utils/formatPercent";

describe("Progress Percentage Formatting & Rounding Suite", () => {
  describe("1. formatPercent (UI string formatting)", () => {
    it("should round repeating decimals to at most 2 decimal places with clean trim", () => {
      // 1/3 * 100 = 33.333333333333336
      expect(formatPercent(33.333333333333336)).toBe("33.33%");
      // 2/3 * 100 = 66.66666666666667
      expect(formatPercent(66.66666666666667)).toBe("66.67%");
      // 1/6 * 100 = 16.666666666666664
      expect(formatPercent(16.666666666666664)).toBe("16.67%");
      // 20/150 * 100 = 13.333333333333334
      expect(formatPercent(13.333333333333334)).toBe("13.33%");
    });

    it("should trim redundant trailing zeros when trimZero is true (default)", () => {
      expect(formatPercent(50)).toBe("50%");
      expect(formatPercent(0)).toBe("0%");
      expect(formatPercent(100)).toBe("100%");
      expect(formatPercent(12.5)).toBe("12.5%");
      expect(formatPercent(75.8)).toBe("75.8%");
    });

    it("should maintain fixed 2 decimal places when trimZero is false", () => {
      expect(formatPercent(50, { trimZero: false })).toBe("50.00%");
      expect(formatPercent(0, { trimZero: false })).toBe("0.00%");
      expect(formatPercent(12.5, { trimZero: false })).toBe("12.50%");
      expect(formatPercent(33.3333, { trimZero: false })).toBe("33.33%");
    });

    it("should clamp values between 0 and 100", () => {
      expect(formatPercent(-15)).toBe("0%");
      expect(formatPercent(150)).toBe("100%");
      expect(formatPercent(999.99)).toBe("100%");
    });

    it("should handle edge cases safely without crashing", () => {
      // @ts-expect-error testing invalid type
      expect(formatPercent(null)).toBe("0%");
      // @ts-expect-error testing invalid type
      expect(formatPercent(undefined)).toBe("0%");
      expect(formatPercent(NaN)).toBe("0%");
      expect(formatPercent(Infinity)).toBe("0%");
      expect(formatPercent(-Infinity)).toBe("0%");
    });
  });

  describe("2. roundPercent (Numeric value rounding)", () => {
    it("should round numeric percentages to at most 2 decimal places", () => {
      expect(roundPercent(33.333333333333336)).toBe(33.33);
      expect(roundPercent(16.666666666666664)).toBe(16.67);
      expect(roundPercent(13.333333333333334)).toBe(13.33);
      expect(roundPercent(50)).toBe(50);
      expect(roundPercent(12.5)).toBe(12.5);
    });

    it("should clamp numeric values between 0 and 100", () => {
      expect(roundPercent(-10)).toBe(0);
      expect(roundPercent(120)).toBe(100);
    });

    it("should handle non-finite numbers safely", () => {
      expect(roundPercent(NaN)).toBe(0);
      expect(roundPercent(Infinity)).toBe(0);
    });
  });
});
