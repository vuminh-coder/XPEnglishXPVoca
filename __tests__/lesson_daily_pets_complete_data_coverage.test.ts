import { describe, it, expect } from "vitest";
import {
  LESSON_DAILY_PETS,
  QUIZ_DAILY_PETS,
} from "../features/listening/data/lessons/lesson_daily_pets";

describe("Daily English: Pets, Animals & Nature Conversation (575d216f-b275-468e-8a41-c3b26c0ac1ea) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_DAILY_PETS;
    expect(lesson.id).toBe("575d216f-b275-468e-8a41-c3b26c0ac1ea");
    expect(lesson.slug).toBe("daily-pets-animals-nature");
    expect(lesson.categoryId).toBe("cat_daily_conv");
    expect(lesson.categorySlug).toBe("daily-conversations");
    expect(lesson.categoryName).toBe("Giao Tiếp Hàng Ngày");
    expect(lesson.externalId).toBe("AK42GhbTZ9w");
    expect(lesson.cefrLevel).toBe("A2");
    expect(lesson.accent).toBe("en-US");
    expect(lesson.durationFormatted).toBe("01:12");
    expect(lesson.durationSeconds).toBe(72);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(2450);
    expect(lesson.thumbnailUrl).toContain("AK42GhbTZ9w");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_DAILY_PETS.segments;
    expect(segments.length).toBe(11);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThan(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(13.0);
    expect(segments[segments.length - 1].endTime).toBe(71.5);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_DAILY_PETS.segments;
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
    const segments = LESSON_DAILY_PETS.segments;
    for (const seg of segments) {
      const expectedTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(expectedTokens);
    }
  });

  it("Test 5: Zero Merged Utterances Standard", () => {
    const segments = LESSON_DAILY_PETS.segments;
    for (const seg of segments) {
      expect(seg.text).not.toMatch(/^[A-Za-z]+:\s/);
      expect(seg.text).not.toContain("\n");
    }
  });

  it("Test 6: Quiz Structure & Reference Integrity (8 CEFR Questions)", () => {
    const quiz = QUIZ_DAILY_PETS;
    expect(quiz.lessonId).toBe("575d216f-b275-468e-8a41-c3b26c0ac1ea");
    expect(quiz.questions.length).toBe(8);
    expect(quiz.totalQuestions).toBe(8);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_daily_pets_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThan(LESSON_DAILY_PETS.segments.length);
    }
  });

  it("Test 7: Direct Lesson-Quiz Attachment", () => {
    expect(LESSON_DAILY_PETS.quiz).toBeDefined();
    expect(LESSON_DAILY_PETS.quiz).toBe(QUIZ_DAILY_PETS);
  });
});
