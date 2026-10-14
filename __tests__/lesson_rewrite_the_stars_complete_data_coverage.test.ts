import { describe, it, expect } from "vitest";
import {
  LESSON_REWRITE_THE_STARS,
  QUIZ_REWRITE_THE_STARS,
} from "../features/listening/data/lessons/lesson_rewrite_the_stars";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

describe("Anne-Marie & James Arthur: Rewrite The Stars (ff4c64b7-ea82-4963-a4f6-1ff808d929e6) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_REWRITE_THE_STARS;
    expect(lesson.id).toBe("ff4c64b7-ea82-4963-a4f6-1ff808d929e6");
    expect(lesson.slug).toBe("anne-marie-rewrite-the-stars");
    expect(lesson.categoryId).toBe("cat_stories_culture");
    expect(lesson.categorySlug).toBe("stories-culture");
    expect(lesson.categoryName).toBe("Câu Chuyện & Văn Hóa");
    expect(lesson.externalId).toBe("pRfmrE0ToTo");
    expect(lesson.cefrLevel).toBe("B1");
    expect(lesson.accent).toBe("en-US");
    expect(lesson.durationFormatted).toBe("01:45");
    expect(lesson.durationSeconds).toBe(105);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(3950);
    expect(lesson.studyCount).toBe(1420);
    expect(lesson.thumbnailUrl).toBeDefined();
  });

  it("Test 2: Master Segments Volume & Chronological Progression (1-indexed 1..18)", () => {
    const segments = LESSON_REWRITE_THE_STARS.segments;
    expect(segments.length).toBe(18);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(0.8);
    expect(segments[segments.length - 1].endTime).toBe(105);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_REWRITE_THE_STARS.segments;
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

  it("Test 4: Token Count Precision with Workspace Tokenizer & Cumulative Word Count", () => {
    const segments = LESSON_REWRITE_THE_STARS.segments;
    let totalTokens = 0;
    for (const seg of segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
      totalTokens += seg.tokenCount!;
    }
    expect(totalTokens).toBe(184);
  });

  it("Test 5: Zero Merged Utterances Standard", () => {
    const segments = LESSON_REWRITE_THE_STARS.segments;
    for (const seg of segments) {
      expect(seg.text).not.toMatch(/^[A-Za-z]+:\s/);
      expect(seg.text).not.toContain("\n");
      expect(seg.text).not.toContain(" - ");
    }
  });

  it("Test 6: Quiz Structure & Reference Integrity (8 CEFR B1 Questions)", () => {
    const quiz = QUIZ_REWRITE_THE_STARS;
    expect(quiz.lessonId).toBe("ff4c64b7-ea82-4963-a4f6-1ff808d929e6");
    expect(quiz.questions.length).toBe(8);
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.xpReward).toBe(40);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_rewrite_the_stars_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_REWRITE_THE_STARS.segments.length);
    }
  });

  it("Test 7: Core Idiomatic Expressions and Musical Anthems", () => {
    const segments = LESSON_REWRITE_THE_STARS.segments;
    const allKeywords = segments.flatMap((s) => s.keywords || []);
    expect(allKeywords).toContain("hands are tied");
    expect(allKeywords).toContain("not in the cards");
    expect(allKeywords).toContain("rewrite the stars");
    expect(allKeywords).toContain("within these walls");
    expect(allKeywords).toContain("hopeless");
  });
});
