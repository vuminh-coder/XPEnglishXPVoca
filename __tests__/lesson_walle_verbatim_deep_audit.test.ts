import { describe, it, expect } from "vitest";
import {
  LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE,
  QUIZ_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE,
} from "../features/listening/data/lessons/movies/animation/lesson_walle";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

describe("WALL-E Lesson Deep Audit & Pedagogical Standards", () => {
  it("should conform to cinema lesson metadata standards", () => {
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.id).toBe("mov_ani_11");
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.externalId).toBe("_Y6jc1mLT-8");
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.categoryId).toBe("cat_animation_pixar_disney");
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.cefrLevel).toBe("B2");
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.durationSeconds).toBe(397);
    expect(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments.length).toBe(20);
  });

  it("should have comprehensive timeline coverage across the video duration", () => {
    const segments = LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments;
    expect(segments[0].startTime).toBeLessThanOrEqual(10.0);
    expect(segments[segments.length - 1].endTime).toBeGreaterThanOrEqual(315.0);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
  });

  it("should guarantee rigorous verbatim, pedagogical, and phonetic annotations in all 20 segments", () => {
    LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments.forEach((seg, idx) => {
      expect(seg.text.trim().length, `Segment ${idx} text`).toBeGreaterThan(15);
      expect(seg.translationVi.trim().length, `Segment ${idx} translationVi`).toBeGreaterThan(15);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.startsWith("/"), `Segment ${idx} ipaUs start`).toBe(true);
      expect(seg.ipaUs!.endsWith("/"), `Segment ${idx} ipaUs end`).toBe(true);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length, `Segment ${idx} keywords count`).toBeGreaterThanOrEqual(3);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.trim().length, `Segment ${idx} explanationAi`).toBeGreaterThan(20);
      expect(Array.isArray(seg.properNouns), `Segment ${idx} properNouns`).toBe(true);
    });
  });

  it("should have 100% exact tokenCount synchrony with DictationWorkspace.tokenizeSentence", () => {
    LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments.forEach((seg, idx) => {
      const calculatedTokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(
        seg.tokenCount,
        `Segment ${idx} tokenCount mismatch: expected ${calculatedTokens.length}, got ${seg.tokenCount}`
      ).toBe(calculatedTokens.length);
    });
  });

  it("should have a high-quality bilingual quiz with 6 questions matching segments", () => {
    const quiz = QUIZ_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE;
    expect(quiz).toBeDefined();
    expect(quiz.lessonId).toBe("mov_ani_11");
    expect(quiz.questions.length).toBe(6);
    expect(quiz.totalQuestions).toBe(6);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_ani_11_${idx + 1}`);
      expect(q.question.trim().length).toBeGreaterThan(10);
      expect(q.questionEn?.trim().length).toBeGreaterThan(10);
      expect(q.questionVi?.trim().length).toBeGreaterThan(10);
      expect(q.options.length).toBe(4);
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanation.trim().length).toBeGreaterThan(15);
      expect(q.explanationEn?.trim().length).toBeGreaterThan(15);
      expect(q.explanationVi?.trim().length).toBeGreaterThan(15);
      expect(q.targetedConcept?.trim().length).toBeGreaterThan(5);
      expect(q.targetedConceptVi?.trim().length).toBeGreaterThan(5);
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments.length);
    });
  });
});
