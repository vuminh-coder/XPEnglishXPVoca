import { describe, it, expect } from "vitest";
import {
  LESSON_PSYCHOLOGY_OF_MONEY,
  QUIZ_PSYCHOLOGY_OF_MONEY,
} from "../features/listening/data/lessons/lesson_psychology_of_money";

describe("The Psychology of Money: Warren Buffett's Greatest Secret (vid_psychology_of_money) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_PSYCHOLOGY_OF_MONEY;
    expect(lesson.id).toBe("vid_psychology_of_money");
    expect(lesson.slug).toBe("psychology-of-money-warren-buffett");
    expect(lesson.categoryId).toBe("cat_finance_wealth");
    expect(lesson.categorySlug).toBe("finance-wealth");
    expect(lesson.categoryName).toBe("Tài Chính & Tư Duy Đầu Tư");
    expect(lesson.externalId).toBe("DOgVUMfcb7U");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("en-US");
    expect(lesson.durationFormatted).toBe("00:48");
    expect(lesson.durationSeconds).toBe(48);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.thumbnailUrl).toBeDefined();
    expect(lesson.wpmSpeed).toBe(145);
  });

  it("Test 2: Master Segments Volume & Chronological Progression (16 Segments)", () => {
    const segments = LESSON_PSYCHOLOGY_OF_MONEY.segments;
    expect(segments.length).toBe(16);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(0.08);
    expect(segments[segments.length - 1].endTime).toBe(47.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_PSYCHOLOGY_OF_MONEY.segments;
    for (const seg of segments) {
      expect(seg.text.trim().length).toBeGreaterThan(0);
      expect(seg.translationVi.trim().length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.trim().length).toBeGreaterThan(0);
      expect(seg.ipaUs!.startsWith("/")).toBe(true);
      expect(seg.ipaUs!.endsWith("/")).toBe(true);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length).toBeGreaterThanOrEqual(1);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.trim().length).toBeGreaterThan(10);
      expect(Array.isArray(seg.properNouns)).toBe(true);
      expect(typeof seg.tokenCount).toBe("number");
      expect(seg.tokenCount).toBeGreaterThan(0);
    }
  });

  it("Test 4: Token Count Precision with Regular Expressions", () => {
    const segments = LESSON_PSYCHOLOGY_OF_MONEY.segments;
    for (const seg of segments) {
      const expectedTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(expectedTokens);
    }
  });

  it("Test 5: Zero Merged Utterances Standard", () => {
    const segments = LESSON_PSYCHOLOGY_OF_MONEY.segments;
    for (const seg of segments) {
      expect(seg.text).not.toMatch(/^[A-Za-z]+:\s/);
      expect(seg.text).not.toContain("\n");
      expect(seg.text).not.toContain(" - ");
    }
  });

  it("Test 6: Quiz Structure & Reference Integrity (8 CEFR Questions)", () => {
    const quiz = QUIZ_PSYCHOLOGY_OF_MONEY;
    expect(quiz.lessonId).toBe("vid_psychology_of_money");
    expect(quiz.questions.length).toBe(8);
    expect(quiz.totalQuestions).toBe(8);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_psychology_of_money_${i + 1}`);
      expect(q.question.trim().length).toBeGreaterThan(10);
      expect(q.questionEn).toBeDefined();
      expect(q.questionVi).toBeDefined();
      expect(q.options.length).toBe(4);
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanation.trim().length).toBeGreaterThan(10);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationVi).toBeDefined();
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(typeof q.referenceSegmentIndex).toBe("number");
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_PSYCHOLOGY_OF_MONEY.segments.length);
    }
  });

  it("Test 7: Financial & Behavioral Proper Nouns Verification", () => {
    const segments = LESSON_PSYCHOLOGY_OF_MONEY.segments;
    const allProperNouns = segments.flatMap((s) => s.properNouns || []);
    expect(allProperNouns).toContain("The Psychology of Money");
    expect(allProperNouns).toContain("Morgan Housel");
    expect(allProperNouns).toContain("Warren Buffett's");
    expect(allProperNouns).toContain("Housel");
    expect(allProperNouns).toContain("Buffett");
    expect(allProperNouns).toContain("IQ");
  });
});
