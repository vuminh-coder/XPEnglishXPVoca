import { describe, it, expect } from "vitest";
import {
  LESSON_OXFORD_FOOD_COOKING,
  QUIZ_OXFORD_FOOD_COOKING,
} from "../features/listening/data/lessons/lesson_oxford_food_cooking";

describe("Oxford Online English: Talk About Food and Cooking (vid_oxford_food_cooking) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_OXFORD_FOOD_COOKING;
    expect(lesson.id).toBe("vid_oxford_food_cooking");
    expect(lesson.slug).toBe("oxford-talk-about-food-and-cooking");
    expect(lesson.categoryId).toBe("cat_food_dining");
    expect(lesson.categorySlug).toBe("food-dining");
    expect(lesson.categoryName).toBe("Ẩm Thực & Nhà Hàng");
    expect(lesson.externalId).toBe("SlTrn13aez4");
    expect(lesson.cefrLevel).toBe("A2");
    expect(lesson.accent).toBe("en-GB");
    expect(lesson.durationFormatted).toBe("02:02");
    expect(lesson.durationSeconds).toBe(122);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.thumbnailUrl).toBeDefined();
    expect(lesson.wpmSpeed).toBe(125);
  });

  it("Test 2: Master Segments Volume & Chronological Progression (22 Segments)", () => {
    const segments = LESSON_OXFORD_FOOD_COOKING.segments;
    expect(segments.length).toBe(22);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(52.85);
    expect(segments[segments.length - 1].endTime).toBe(122.20);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_OXFORD_FOOD_COOKING.segments;
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
    const segments = LESSON_OXFORD_FOOD_COOKING.segments;
    for (const seg of segments) {
      const expectedTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(expectedTokens);
    }
  });

  it("Test 5: Zero Merged Utterances Standard", () => {
    const segments = LESSON_OXFORD_FOOD_COOKING.segments;
    for (const seg of segments) {
      expect(seg.text).not.toMatch(/^[A-Za-z]+:\s/);
      expect(seg.text).not.toContain("\n");
      expect(seg.text).not.toContain(" - ");
    }
  });

  it("Test 6: Quiz Structure & Reference Integrity (8 CEFR Questions)", () => {
    const quiz = QUIZ_OXFORD_FOOD_COOKING;
    expect(quiz.lessonId).toBe("vid_oxford_food_cooking");
    expect(quiz.questions.length).toBe(8);
    expect(quiz.totalQuestions).toBe(8);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_oxford_food_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_OXFORD_FOOD_COOKING.segments.length);
    }
  });

  it("Test 7: Cultural & Culinary Proper Nouns", () => {
    const segments = LESSON_OXFORD_FOOD_COOKING.segments;
    const allProperNouns = segments.flatMap((s) => s.properNouns || []);
    expect(allProperNouns).toContain("UK");
    expect(allProperNouns).toContain("French");
    expect(allProperNouns).toContain("Italian");
    expect(allProperNouns).toContain("Indian");
    expect(allProperNouns).toContain("British");
    expect(allProperNouns).toContain("Sunday");
    expect(allProperNouns).toContain("Spanish");
    expect(allProperNouns).toContain("Mediterranean");
    expect(allProperNouns).toContain("Berlin");
  });
});
