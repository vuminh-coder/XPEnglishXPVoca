import { describe, it, expect } from "vitest";
import {
  LESSON_MATT_WALKER_SLEEP,
  QUIZ_MATT_WALKER_SLEEP,
} from "../features/listening/data/lessons/lesson_matt_walker_sleep";

describe("Sleep Is Your Superpower - Matt Walker (vid_matt_walker_sleep) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_MATT_WALKER_SLEEP;
    expect(lesson.id).toBe("vid_matt_walker_sleep");
    expect(lesson.slug).toBe("matt-walker-sleep-is-your-superpower");
    expect(lesson.categoryId).toBe("cat_ted_ed");
    expect(lesson.categorySlug).toBe("ted-ed");
    expect(lesson.categoryName).toBe("TED-Ed & Tư Duy Sâu");
    expect(lesson.externalId).toBe("5MuIMqhT8DM");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("en-US");
    expect(lesson.durationFormatted).toBe("19:05");
    expect(lesson.durationSeconds).toBe(1145);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(17445000);
    expect(lesson.thumbnailUrl).toContain("5MuIMqhT8DM");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
    expect(segments.length).toBe(140);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(0.83);
    expect(segments[segments.length - 1].endTime).toBe(1144.95);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
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
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
    for (const seg of segments) {
      const expectedTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(expectedTokens);
    }
  });

  it("Test 5: Zero Merged Utterances Standard", () => {
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
    for (const seg of segments) {
      expect(seg.text).not.toMatch(/^[A-Za-z]+:\s/);
      expect(seg.text).not.toContain("\n");
      expect(seg.text).not.toContain("David Biello:");
      expect(seg.text).not.toContain("Matt Walker:");
      expect(seg.text).not.toContain("DB:");
      expect(seg.text).not.toContain("MW:");
    }
  });

  it("Test 6: Quiz Structure & Reference Integrity (8 CEFR B2 Questions)", () => {
    const quiz = QUIZ_MATT_WALKER_SLEEP;
    expect(quiz.lessonId).toBe("vid_matt_walker_sleep");
    expect(quiz.questions.length).toBe(8);
    expect(quiz.totalQuestions).toBe(8);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_matt_walker_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_MATT_WALKER_SLEEP.segments.length);
    }
  });

  it("Test 7: Direct Lesson-Quiz Attachment", () => {
    expect(LESSON_MATT_WALKER_SLEEP.quiz).toBeDefined();
    expect(LESSON_MATT_WALKER_SLEEP.quiz).toBe(QUIZ_MATT_WALKER_SLEEP);
  });
});
