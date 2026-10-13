import { describe, it, expect } from "vitest";
import {
  LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS,
  QUIZ_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_ted_lasso";

describe("Ted Lasso: Iconic Darts Scene & Top Moments (mov_sit_11) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS;
    expect(lesson.id).toBe("mov_sit_11");
    expect(lesson.slug).toBe("ted-lasso-be-curious-not-judgmental-darts");
    expect(lesson.categoryId).toBe("cat_classic_sitcoms");
    expect(lesson.categorySlug).toBe("classic-sitcoms");
    expect(lesson.externalId).toBe("t1bveUz8RD0");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("American & British");
    expect(lesson.durationFormatted).toBe("17:27");
    expect(lesson.durationSeconds).toBe(1047);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(1855225);
    expect(lesson.thumbnailUrl).toContain("t1bveUz8RD0");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS.segments;
    expect(segments.length).toBeGreaterThanOrEqual(80);
    expect(segments.length).toBe(138);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(4.3);
    expect(segments[segments.length - 1].endTime).toBe(1039.9);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS.segments;
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

  it("Test 4: Pure Master Segments & Zero Merged Utterances Standard", () => {
    const segments = LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS.segments;
    for (const seg of segments) {
      // Must not contain YouTube auto-caption markers
      expect(seg.text).not.toContain(">>");
      expect(seg.text).not.toContain("[Music]");
      expect(seg.text).not.toContain("[Applause]");
      expect(seg.text).not.toContain("[Laughter]");

      // Token count check matching word boundary
      const jsTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(jsTokens);
    }
  });

  it("Test 5: Comprehensive CEFR B2 Quiz Structure", () => {
    const quiz = QUIZ_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS;
    expect(quiz.lessonId).toBe("mov_sit_11");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);
    expect(quiz.xpReward).toBe(100);

    for (const q of quiz.questions) {
      expect(q.id).toMatch(/^mov_sit_11_q\d+$/);
      expect(q.question.trim().length).toBeGreaterThan(15);
      expect(q.questionEn).toBeDefined();
      expect(q.questionEn!.trim().length).toBeGreaterThan(15);
      expect(q.questionVi).toBeDefined();
      expect(q.questionVi!.trim().length).toBeGreaterThan(15);
      expect(q.options.length).toBe(4);
      expect(q.optionsEn).toBeDefined();
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi).toBeDefined();
      expect(q.optionsVi!.length).toBe(4);
      expect([0, 1, 2, 3]).toContain(q.correctAnswer);
      expect(q.explanation.trim().length).toBeGreaterThan(20);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationEn!.trim().length).toBeGreaterThan(20);
      expect(q.explanationVi).toBeDefined();
      expect(q.explanationVi!.trim().length).toBeGreaterThan(20);
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConcept!.trim().length).toBeGreaterThan(10);
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(typeof q.referenceSegmentIndex).toBe("number");
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS.segments.length);
    }
  });

  it("Test 6: Zero Missing Attributes & Schema Adherence", () => {
    const lesson = LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS;
    expect(lesson.description).toBeDefined();
    expect(lesson.description.length).toBeGreaterThan(30);
    expect(lesson.wpmSpeed).toBeGreaterThan(100);
    expect(lesson.studyCount).toBeGreaterThan(0);
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
  });

  it("Test 7: Thematic & Key Moments Vocabulary Coverage", () => {
    const segments = LESSON_TED_LASSO_BE_CURIOUS_NOT_JUDGMENTAL_DARTS.segments;
    const allText = segments.map((s) => s.text).join(" ");

    expect(allText).toContain("Be curious, not judgmental");
    expect(allText).toContain("Barbecue sauce");
    expect(allText).toContain("I forgive you");
    expect(allText).toContain("Divorce is hard");
    expect(allText).toContain("ride a bike");
    expect(allText).toContain("asparagus");
    expect(allText).toContain("second chance");
    expect(allText).toContain("Willis");
  });
});
