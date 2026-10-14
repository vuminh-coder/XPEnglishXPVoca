import { describe, it, expect } from "vitest";
import {
  LESSON_RATATOUILLE_ANTON_EGO,
  QUIZ_RATATOUILLE_ANTON_EGO,
} from "../features/listening/data/lessons/lesson_ratatouille_anton_ego";

describe("Ratatouille: Anton Ego's Food Critic Review (vid_ratatouille_anton_ego) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_RATATOUILLE_ANTON_EGO;
    expect(lesson.id).toBe("vid_ratatouille_anton_ego");
    expect(lesson.slug).toBe("ratatouille-anton-ego-food-critic-review");
    expect(lesson.categoryId).toBe("cat_stories_culture");
    expect(lesson.categorySlug).toBe("stories-culture");
    expect(lesson.categoryName).toBe("Câu Chuyện & Văn Hóa");
    expect(lesson.externalId).toBe("tAyQL1inris");
    expect(lesson.cefrLevel).toBe("C1");
    expect(lesson.accent).toBe("en-GB");
    expect(lesson.durationFormatted).toBe("01:59");
    expect(lesson.durationSeconds).toBe(119);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(68400);
    expect(lesson.studyCount).toBe(16700);
    expect(lesson.thumbnailUrl).toBeDefined();
  });

  it("Test 2: Master Segments Volume & Chronological Progression (1-indexed 1..14)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO.segments;
    expect(segments.length).toBe(14);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(2.76);
    expect(segments[segments.length - 1].endTime).toBe(118.94);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO.segments;
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
    const segments = LESSON_RATATOUILLE_ANTON_EGO.segments;
    for (const seg of segments) {
      const expectedTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(expectedTokens);
    }
  });

  it("Test 5: Zero Merged Utterances Standard", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO.segments;
    for (const seg of segments) {
      expect(seg.text).not.toMatch(/^[A-Za-z]+:\s/);
      expect(seg.text).not.toContain("\n");
      expect(seg.text).not.toContain(" - ");
    }
  });

  it("Test 6: Quiz Structure & Reference Integrity (8 CEFR C1 Questions)", () => {
    const quiz = QUIZ_RATATOUILLE_ANTON_EGO;
    expect(quiz.lessonId).toBe("vid_ratatouille_anton_ego");
    expect(quiz.questions.length).toBe(8);
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.xpReward).toBe(40);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_ratatouille_ego_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_RATATOUILLE_ANTON_EGO.segments.length);
    }
  });

  it("Test 7: Authentic Proper Nouns in Anton Ego Monologue", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO.segments;
    const allProperNouns = segments.flatMap((s) => s.properNouns || []);
    expect(allProperNouns).toContain("Chef Gusteau's");
    expect(allProperNouns).toContain("Gusteau's");
    expect(allProperNouns).toContain("France");
  });
});
