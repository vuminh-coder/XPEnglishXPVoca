import { describe, it, expect } from "vitest";
import {
  resolveReadingPassage,
  gradeReadingPassageAttempt,
} from "@/features/reading/services/readingGradingService";
import { READING_PASSAGES_DATA } from "@/features/reading/data/readingMockData";

describe("Reading Backend Grading Engine (readingGradingService)", () => {
  it("resolves reading passages by canonical id, case-insensitive, and numeric shorthand", () => {
    // Exact match
    const p1 = resolveReadingPassage("r1");
    expect(p1).toBeDefined();
    expect(p1?.id).toBe("r1");

    // Case-insensitive match
    const pUpper = resolveReadingPassage("R1");
    expect(pUpper).toBeDefined();
    expect(pUpper?.id).toBe("r1");

    // Numeric shorthand match (e.g., '5' -> 'r5')
    const p5 = resolveReadingPassage("5");
    expect(p5).toBeDefined();
    expect(p5?.id).toBe("r5");

    // Unknown id returns null
    const pUnknown = resolveReadingPassage("nonexistent_passage_9999");
    expect(pUnknown).toBeNull();
  });

  it("grades a 100% correct reading attempt accurately with full XP and bonus", () => {
    const passage = READING_PASSAGES_DATA[0];
    expect(passage.questions.length).toBeGreaterThan(0);

    // Build perfect answers
    const answers: Record<string, number> = {};
    passage.questions.forEach((q) => {
      answers[q.id] = q.correct;
    });

    const result = gradeReadingPassageAttempt(passage.id, answers, 120);

    expect(result.summary.passageId).toBe(passage.id);
    expect(result.summary.totalQuestions).toBe(passage.questions.length);
    expect(result.summary.correctCount).toBe(passage.questions.length);
    expect(result.summary.accuracy).toBe(100);

    // Expected XP: Base 20 + questions * 15 + Accuracy bonus 15
    const expectedXp = 20 + passage.questions.length * 15 + 15;
    expect(result.summary.xpEarned).toBe(expectedXp);
    expect(result.summary.breakdown.accuracyBonus).toBe(15);

    // Verify all question results are marked correct
    expect(result.results.length).toBe(passage.questions.length);
    result.results.forEach((r) => {
      expect(r.isCorrect).toBe(true);
      expect(r.selectedOption).toBe(r.correctOption);
    });
  });

  it("grades a partial reading attempt and handles incorrect choices properly", () => {
    const passage = READING_PASSAGES_DATA[0];
    const totalQ = passage.questions.length;
    expect(totalQ).toBeGreaterThanOrEqual(2);

    // Intentionally answer only the first question correctly, and others wrong
    const answers: Record<string, number> = {};
    passage.questions.forEach((q, idx) => {
      if (idx === 0) {
        answers[q.id] = q.correct;
      } else {
        answers[q.id] = (q.correct + 1) % q.options.length;
      }
    });

    const result = gradeReadingPassageAttempt(passage.id, answers, 90);

    expect(result.summary.correctCount).toBe(1);
    expect(result.results[0].isCorrect).toBe(true);
    for (let i = 1; i < totalQ; i++) {
      expect(result.results[i].isCorrect).toBe(false);
    }

    // Expected XP: Base 20 + (1 * 15) + (accuracy < 70% => bonus 0)
    expect(result.summary.xpEarned).toBe(20 + 15);
    expect(result.summary.breakdown.accuracyBonus).toBe(0);
  });

  it("grades a 0% correct attempt by granting base XP only", () => {
    const passage = READING_PASSAGES_DATA[0];

    // All wrong
    const answers: Record<string, number> = {};
    passage.questions.forEach((q) => {
      answers[q.id] = (q.correct + 1) % q.options.length;
    });

    const result = gradeReadingPassageAttempt(passage.id, answers, 60);

    expect(result.summary.correctCount).toBe(0);
    expect(result.summary.accuracy).toBe(0);
    expect(result.summary.xpEarned).toBe(20);
    expect(result.summary.breakdown.perQuestionXp).toBe(0);
    expect(result.summary.breakdown.accuracyBonus).toBe(0);
  });

  it("clamps abnormal time spent to secure anti-cheat boundaries", () => {
    const passage = READING_PASSAGES_DATA[0];
    const answers: Record<string, number> = {};
    passage.questions.forEach((q) => {
      answers[q.id] = q.correct;
    });

    // Time spent negative or too small (< 5 seconds)
    const resultTooFast = gradeReadingPassageAttempt(passage.id, answers, -10);
    expect(resultTooFast.summary.timeSpentSeconds).toBe(5);

    // Time spent excessively large (> 7200 seconds / 2 hours)
    const resultTooSlow = gradeReadingPassageAttempt(passage.id, answers, 999999);
    expect(resultTooSlow.summary.timeSpentSeconds).toBe(7200);
  });

  it("rejects non-existent passage with descriptive error", () => {
    expect(() => {
      gradeReadingPassageAttempt("invalid-id-xyz", {}, 30);
    }).toThrow("Reading passage not found");
  });
});
