import { describe, it, expect } from "vitest";
import {
  LESSON_TED_BILINGUAL_BRAIN,
  QUIZ_TED_BILINGUAL_BRAIN,
} from "../features/listening/data/lessons/lesson_ted_bilingual_brain";

describe("TED-Ed: The Benefits of a Bilingual Brain (vid_ted_bilingual_brain) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_TED_BILINGUAL_BRAIN;
    expect(lesson.id).toBe("vid_ted_bilingual_brain");
    expect(lesson.slug).toBe("ted-ed-benefits-of-a-bilingual-brain");
    expect(lesson.categoryId).toBe("cat_ted_ed");
    expect(lesson.categorySlug).toBe("ted-ed");
    expect(lesson.categoryName).toBe("TED-Ed & Tư Duy Sâu");
    expect(lesson.externalId).toBe("MMmOLN5zBLY");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("en-US");
    expect(lesson.durationFormatted).toBe("05:04");
    expect(lesson.durationSeconds).toBe(304);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(18299706);
    expect(lesson.thumbnailUrl).toContain("MMmOLN5zBLY");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    expect(segments.length).toBe(39);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(6.63);
    expect(segments[segments.length - 1].endTime).toBe(288.08);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
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
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    for (const seg of segments) {
      const expectedTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(expectedTokens);
    }
  });

  it("Test 5: Zero Merged Utterances Standard", () => {
    const segments = LESSON_TED_BILINGUAL_BRAIN.segments;
    for (const seg of segments) {
      expect(seg.text).not.toMatch(/^[A-Za-z]+:\s/);
      expect(seg.text).not.toContain("\n");
    }
  });

  it("Test 6: Quiz Structure & Reference Integrity (8 CEFR B2 Questions)", () => {
    const quiz = QUIZ_TED_BILINGUAL_BRAIN;
    expect(quiz.lessonId).toBe("vid_ted_bilingual_brain");
    expect(quiz.questions.length).toBe(8);
    expect(quiz.totalQuestions).toBe(8);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_ted_bilingual_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_TED_BILINGUAL_BRAIN.segments.length);
    }
  });

  it("Test 7: Direct Lesson-Quiz Attachment", () => {
    expect(LESSON_TED_BILINGUAL_BRAIN.quiz).toBeDefined();
    expect(LESSON_TED_BILINGUAL_BRAIN.quiz).toBe(QUIZ_TED_BILINGUAL_BRAIN);
  });
});
