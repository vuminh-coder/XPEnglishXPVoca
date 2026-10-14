import { describe, it, expect } from "vitest";
import {
  LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE,
  QUIZ_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE,
} from "../features/listening/data/lessons/movies/inspirational/lesson_12_angry_men";

describe("12 Angry Men: Juror 8 Classic Deliberation (mov_insp_12) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE;
    expect(lesson.id).toBe("mov_insp_12");
    expect(lesson.slug).toBe("12-angry-men-juror-8-first-doubt-sequence");
    expect(lesson.categoryId).toBe("cat_inspirational_life");
    expect(lesson.categorySlug).toBe("inspirational-life");
    expect(lesson.externalId).toBe("ngbEpZ0tTjI");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("104:36");
    expect(lesson.durationSeconds).toBe(6276);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(3662164);
    expect(lesson.thumbnailUrl).toContain("ngbEpZ0tTjI");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE.segments;
    expect(segments.length).toBeGreaterThanOrEqual(50);
    expect(segments.length).toBe(56);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(403.9);
    expect(segments[segments.length - 1].endTime).toBe(760.5);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE.segments;
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
    const segments = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE.segments;
    for (const seg of segments) {
      const tokens = seg.text.match(/\b[A-Za-z0-9_]+\b/g) || [];
      expect(seg.tokenCount).toBe(tokens.length);
    }
  });

  it("Test 5: Full Bilingual Quiz Rigor (8 CEFR Questions)", () => {
    const quiz = QUIZ_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE;
    expect(quiz.lessonId).toBe("mov_insp_12");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_insp_12_${idx + 1}`);
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
        LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE.segments.length
      );
    });
  });

  it("Test 6: Zero Missing Attributes Across Lesson Object", () => {
    const lesson = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE;
    expect(lesson.title).toBeDefined();
    expect(lesson.description).toBeDefined();
    expect(lesson.description.length).toBeGreaterThan(20);
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
    expect(lesson.wpmSpeed).toBe(140);
    expect(lesson.studyCount).toBeGreaterThan(1000);
  });

  it("Test 7: Direct Quiz Reference Integrity & Linkage", () => {
    const lesson = LESSON_12_ANGRY_MEN_JUROR_8_FIRST_DOUBT_SEQUENCE;
    const quiz = lesson.quiz;
    for (const q of quiz!.questions) {
      const referencedSegment = lesson.segments[q.referenceSegmentIndex!];
      expect(referencedSegment).toBeDefined();
      expect(referencedSegment.orderIndex).toBe(q.referenceSegmentIndex);
      expect(referencedSegment.text.length).toBeGreaterThan(0);
    }
  });
});
