import { describe, it, expect } from "vitest";
import {
  LESSON_STEVE_JOBS,
  QUIZ_STEVE_JOBS,
} from "../features/listening/data/lessons/lesson_steve_jobs";

describe("Steve Jobs: Stanford Commencement Address (0678a126-f94d-4930-81ce-ebe1e6731e7e) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_STEVE_JOBS;
    expect(lesson.id).toBe("0678a126-f94d-4930-81ce-ebe1e6731e7e");
    expect(lesson.slug).toBe("steve-jobs-stanford-stay-hungry");
    expect(lesson.categoryId).toBe("cat_stories_culture");
    expect(lesson.categorySlug).toBe("stories-culture");
    expect(lesson.categoryName).toBe("Câu Chuyện & Văn Hóa");
    expect(lesson.externalId).toBe("UF8uR6Z6KLc");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("en-US");
    expect(lesson.durationFormatted).toBe("02:53");
    expect(lesson.durationSeconds).toBe(173);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(3820);
    expect(lesson.studyCount).toBe(1240);
    expect(lesson.thumbnailUrl).toBeDefined();
  });

  it("Test 2: Master Segments Volume & Chronological Progression (1-indexed 1..18)", () => {
    const segments = LESSON_STEVE_JOBS.segments;
    expect(segments.length).toBe(18);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(22.49);
    expect(segments[segments.length - 1].endTime).toBe(172.92);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_STEVE_JOBS.segments;
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
    const segments = LESSON_STEVE_JOBS.segments;
    for (const seg of segments) {
      const expectedTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(expectedTokens);
    }
  });

  it("Test 5: Zero Merged Utterances Standard", () => {
    const segments = LESSON_STEVE_JOBS.segments;
    for (const seg of segments) {
      expect(seg.text).not.toMatch(/^[A-Za-z]+:\s/);
      expect(seg.text).not.toContain("\n");
      expect(seg.text).not.toContain(" - ");
    }
  });

  it("Test 6: Quiz Structure & Reference Integrity (8 CEFR B2 Questions)", () => {
    const quiz = QUIZ_STEVE_JOBS;
    expect(quiz.lessonId).toBe("0678a126-f94d-4930-81ce-ebe1e6731e7e");
    expect(quiz.questions.length).toBe(8);
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.xpReward).toBe(40);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_steve_jobs_${i + 1}`);
      expect(q.question.trim().length).toBeGreaterThan(15);
      expect(q.questionEn).toBeDefined();
      expect(q.questionVi).toBeDefined();
      expect(q.options.length).toBe(4);
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanation.trim().length).toBeGreaterThan(15);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationVi).toBeDefined();
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(typeof q.referenceSegmentIndex).toBe("number");
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_STEVE_JOBS.segments.length);
    }
  });

  it("Test 7: Authentic Proper Nouns in Steve Jobs Stanford Address", () => {
    const segments = LESSON_STEVE_JOBS.segments;
    const allProperNouns = segments.flatMap((s) => s.properNouns || []);
    expect(allProperNouns).toContain("Stanford");
    expect(allProperNouns).toContain("Reed College");
  });
});
