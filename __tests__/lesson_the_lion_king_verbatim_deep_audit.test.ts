import { describe, it, expect } from "vitest";
import {
  LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST,
  QUIZ_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST,
} from "../features/listening/data/lessons/movies/animation/lesson_the_lion_king";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

describe("The Lion King Lesson Deep Audit & Pedagogical Standards", () => {
  it("should conform to cinema lesson metadata standards", () => {
    expect(LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.id).toBe("mov_ani_08");
    expect(LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.externalId).toBe("HeQTJE99OXo");
    expect(LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.categoryId).toBe("cat_animation_pixar_disney");
    expect(LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.cefrLevel).toBe("A2");
    expect(LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.durationSeconds).toBe(1444);
    expect(LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments.length).toBe(31);
  });

  it("should have comprehensive timeline coverage across all 16 video chapters (0s to 1444s)", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    expect(segments[0].startTime).toBe(0.0);
    expect(segments[segments.length - 1].endTime).toBe(1444.0);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
  });

  it("should guarantee rigorous verbatim, pedagogical, and phonetic annotations in all 31 segments", () => {
    LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments.forEach((seg, idx) => {
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

  it("should have 100% exact tokenCount synchrony with DictationWorkspace.tokenizeSentence across all 31 segments", () => {
    LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments.forEach((seg, idx) => {
      const calculatedTokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(
        seg.tokenCount,
        `Segment ${idx} tokenCount mismatch: expected ${calculatedTokens.length}, got ${seg.tokenCount}`
      ).toBe(calculatedTokens.length);
    });
  });

  it("should have a high-quality bilingual quiz with 6 questions matching segments", () => {
    const quiz = QUIZ_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST;
    expect(quiz).toBeDefined();
    expect(quiz.lessonId).toBe("mov_ani_08");
    expect(quiz.totalQuestions).toBe(6);
    expect(quiz.xpReward).toBe(120);
    expect(quiz.questions.length).toBe(6);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_ani_08_${idx + 1}`);
      expect(q.question.trim().length).toBeGreaterThan(10);
      expect(q.questionEn!.trim().length).toBeGreaterThan(10);
      expect(q.questionVi!.trim().length).toBeGreaterThan(10);
      expect(q.options.length).toBe(4);
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi!.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanation.trim().length).toBeGreaterThan(15);
      expect(q.explanationEn!.trim().length).toBeGreaterThan(15);
      expect(q.explanationVi!.trim().length).toBeGreaterThan(15);
      expect(q.targetedConcept!.trim().length).toBeGreaterThan(5);
      expect(q.targetedConceptEn!.trim().length).toBeGreaterThan(5);
      expect(q.targetedConceptVi!.trim().length).toBeGreaterThan(5);
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(
        LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments.length
      );
    });
  });
});
