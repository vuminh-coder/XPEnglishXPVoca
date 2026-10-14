import { describe, it, expect } from "vitest";
import {
  LESSON_RESTAURANT_ORDERING,
  QUIZ_RESTAURANT_ORDERING,
} from "../features/listening/data/lessons/lesson_restaurant_ordering";

describe("English for Dining: Ordering Food at a Restaurant (vid_travel_restaurant_ordering) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_RESTAURANT_ORDERING;
    expect(lesson.id).toBe("vid_travel_restaurant_ordering");
    expect(lesson.slug).toBe("english-dining-ordering-food-restaurant");
    expect(lesson.categoryId).toBe("cat_daily_conv");
    expect(lesson.categorySlug).toBe("daily-conversations");
    expect(lesson.categoryName).toBe("Giao Tiếp Đời Thực");
    expect(lesson.externalId).toBe("bgfdqVmVjfk");
    expect(lesson.cefrLevel).toBe("A2");
    expect(lesson.accent).toBe("en-US");
    expect(lesson.durationFormatted).toBe("02:55");
    expect(lesson.durationSeconds).toBe(175);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(224000);
    expect(lesson.thumbnailUrl).toBeDefined();
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_RESTAURANT_ORDERING.segments;
    expect(segments.length).toBe(53);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(7.92);
    expect(segments[segments.length - 1].endTime).toBe(174.50);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_RESTAURANT_ORDERING.segments;
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
    const segments = LESSON_RESTAURANT_ORDERING.segments;
    for (const seg of segments) {
      const expectedTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(expectedTokens);
    }
  });

  it("Test 5: Zero Merged Utterances Standard", () => {
    const segments = LESSON_RESTAURANT_ORDERING.segments;
    for (const seg of segments) {
      expect(seg.text).not.toMatch(/^[A-Za-z]+:\s/);
      expect(seg.text).not.toContain("\n");
      expect(seg.text).not.toContain(" - ");
    }
  });

  it("Test 6: Quiz Structure & Reference Integrity (8 CEFR Questions)", () => {
    const quiz = QUIZ_RESTAURANT_ORDERING;
    expect(quiz.lessonId).toBe("vid_travel_restaurant_ordering");
    expect(quiz.questions.length).toBe(8);
    expect(quiz.totalQuestions).toBe(8);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_restaurant_ordering_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(LESSON_RESTAURANT_ORDERING.segments.length);
    }
  });

  it("Test 7: Authentic Proper Nouns in Family Dining Scene", () => {
    const segments = LESSON_RESTAURANT_ORDERING.segments;
    const allProperNouns = segments.flatMap((s) => s.properNouns || []);
    expect(allProperNouns).toContain("Paul");
    expect(allProperNouns).toContain("Amy");
  });
});
