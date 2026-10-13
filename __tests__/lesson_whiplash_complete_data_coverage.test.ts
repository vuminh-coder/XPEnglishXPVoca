import { describe, it, expect } from "vitest";
import {
  LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL,
  QUIZ_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL,
} from "../features/listening/data/lessons/movies/inspirational/lesson_whiplash";

describe("Whiplash: Not My Tempo Masterclass (mov_insp_07) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL;
    expect(lesson.id).toBe("mov_insp_07");
    expect(lesson.slug).toBe("whiplash-there-are-no-two-words-harmful");
    expect(lesson.categoryId).toBe("cat_inspirational_life");
    expect(lesson.categorySlug).toBe("inspirational-life");
    expect(lesson.externalId).toBe("gfceCnMJZ3c");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("05:49");
    expect(lesson.durationSeconds).toBe(349);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(3161204);
    expect(lesson.thumbnailUrl).toContain("gfceCnMJZ3c");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments;
    expect(segments.length).toBeGreaterThanOrEqual(50);
    expect(segments.length).toBe(59);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(1.12);
    expect(segments[segments.length - 1].endTime).toBe(344.58);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments;
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

  it("Test 4: Strict Token Count Accuracy via Regex", () => {
    const segments = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments;
    for (const seg of segments) {
      const tokens = seg.text.match(/\b[A-Za-z0-9_]+\b/g) || [];
      expect(seg.tokenCount).toBe(tokens.length);
    }
  });

  it("Test 5: Full Bilingual Quiz Rigor (8 CEFR Questions)", () => {
    const quiz = QUIZ_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL;
    expect(quiz.lessonId).toBe("mov_insp_07");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_insp_07_${idx + 1}`);
      expect(q.question.length).toBeGreaterThan(15);
      expect(q.questionEn).toBeDefined();
      expect(q.questionVi).toBeDefined();
      expect(q.options.length).toBe(4);
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanation.length).toBeGreaterThan(15);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationVi).toBeDefined();
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(typeof q.referenceSegmentIndex).toBe("number");
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(
        LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments.length
      );
    });
  });

  it("Test 6: Zero Missing Attributes Across Lesson Object", () => {
    const lesson = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL;
    expect(lesson.title).toBeTruthy();
    expect(lesson.description).toBeTruthy();
    expect(lesson.wpmSpeed).toBeGreaterThan(0);
    expect(lesson.studyCount).toBeGreaterThan(0);

    lesson.segments.forEach((seg) => {
      expect(seg.orderIndex).toBeDefined();
      expect(seg.startTime).toBeDefined();
      expect(seg.endTime).toBeDefined();
      expect(seg.text).toBeDefined();
      expect(seg.translationVi).toBeDefined();
      expect(seg.ipaUs).toBeDefined();
      expect(seg.keywords).toBeDefined();
      expect(seg.explanationAi).toBeDefined();
      expect(seg.tokenCount).toBeDefined();
      expect(seg.properNouns).toBeDefined();
    });
  });

  it("Test 7: Thematic Vocabulary Verification", () => {
    const textAll = LESSON_WHIPLASH_THERE_ARE_NO_TWO_WORDS_HARMFUL.segments
      .map((s) => s.text)
      .join(" ");
    expect(textAll).toContain("Whiplash");
    expect(textAll).toContain("tempo");
    expect(textAll).toContain("rushing");
    expect(textAll).toContain("dragging");
    expect(textAll).toContain("hurled a chair");
    expect(textAll).toContain("Eugene O'Neill");
    expect(textAll).toContain("big boy tempo");
  });
});
