import { describe, it, expect } from "vitest";
import { calculateSM2 } from "../lib/utils/sm2";

describe("SM-2 Spaced Repetition Algorithm", () => {
  it("should reset repetitions and interval to 1 on quality < 3 (incorrect response)", () => {
    const result = calculateSM2(2, 5, 2.5, 3);
    expect(result.repetitions).toBe(0);
    expect(result.interval).toBe(1);
    expect(result.easeFactor).toBeLessThan(2.5); // EF should decrease
  });

  it("should increment repetitions on quality >= 3 (correct response)", () => {
    // Initial repetition
    const r1 = calculateSM2(4, 1, 2.5, 0);
    expect(r1.repetitions).toBe(1);
    expect(r1.interval).toBe(1);

    // Second repetition
    const r2 = calculateSM2(4, 1, 2.5, 1);
    expect(r2.repetitions).toBe(2);
    expect(r2.interval).toBe(6);

    // Third repetition
    const r3 = calculateSM2(5, 6, 2.5, 2);
    expect(r3.repetitions).toBe(3);
    expect(r3.interval).toBe(15); // Math.round(6 * 2.5) = 15
  });

  it("should maintain easeFactor at a minimum of 1.3", () => {
    let ef = 1.4;
    // Repeat with very bad score (quality = 0) to lower EF
    const res = calculateSM2(0, 1, ef, 1);
    expect(res.easeFactor).toBe(1.3);
  });
});
