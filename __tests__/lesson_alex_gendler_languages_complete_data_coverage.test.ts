import { describe, it, expect } from "vitest";
import {
  LESSON_ALEX_GENDLER_LANGUAGES,
  QUIZ_ALEX_GENDLER_LANGUAGES,
} from "../features/listening/data/lessons/lesson_alex_gendler_languages";

describe("TED-Ed: How Languages Evolve - Alex Gendler (vid_alex_gendler_languages) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_ALEX_GENDLER_LANGUAGES;
    expect(lesson.id).toBe("vid_alex_gendler_languages");
    expect(lesson.slug).toBe("ted-ed-how-languages-evolve-alex-gendler");
    expect(lesson.categoryId).toBe("cat_ted_ed");
    expect(lesson.categorySlug).toBe("ted-ed");
    expect(lesson.categoryName).toBe("TED-Ed & Tư Duy Sâu");
    expect(lesson.externalId).toBe("iWDKsHm6gTA");
    expect(lesson.cefrLevel).toBe("B1");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("04:03");
    expect(lesson.durationSeconds).toBe(243);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(3437297);
    expect(lesson.thumbnailUrl).toContain("iWDKsHm6gTA");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_ALEX_GENDLER_LANGUAGES.segments;
    expect(segments.length).toBe(33);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(7.4);
    expect(segments[segments.length - 1].endTime).toBe(226.6);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_ALEX_GENDLER_LANGUAGES.segments;
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
    const segments = LESSON_ALEX_GENDLER_LANGUAGES.segments;
    for (const seg of segments) {
      const expectedTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(expectedTokens);
    }
  });

  it("Test 5: Zero Merged Utterances Standard", () => {
    const segments = LESSON_ALEX_GENDLER_LANGUAGES.segments;
    for (const seg of segments) {
      // Must not contain character prefixes like 'Alex:' or dialogue mergers
      expect(seg.text).not.toMatch(/^[A-Za-z]+:\s/);
      expect(seg.text).not.toContain("\n");
    }
  });

  it("Test 6: Quiz Structure & Reference Integrity (8 CEFR B2 Questions)", () => {
    const quiz = QUIZ_ALEX_GENDLER_LANGUAGES;
    expect(quiz.lessonId).toBe("vid_alex_gendler_languages");
    expect(quiz.questions.length).toBe(8);
    expect(quiz.totalQuestions).toBe(8);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_ted_alex_0${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_ALEX_GENDLER_LANGUAGES.segments.length);
    }
  });

  it("Test 7: Direct Lesson-Quiz Attachment", () => {
    expect(LESSON_ALEX_GENDLER_LANGUAGES.quiz).toBeDefined();
    expect(LESSON_ALEX_GENDLER_LANGUAGES.quiz).toBe(QUIZ_ALEX_GENDLER_LANGUAGES);
  });
});
