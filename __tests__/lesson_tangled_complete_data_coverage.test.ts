import { describe, it, expect } from "vitest";
import {
  LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT,
  QUIZ_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT,
} from "../features/listening/data/lessons/movies/animation/lesson_tangled";

describe("Tangled: Rapunzel & Flynn Rider Floating Lanterns & I See The Light (mov_ani_10) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT;
    expect(lesson.id).toBe("mov_ani_10");
    expect(lesson.slug).toBe("tangled-lantern-festival-i-see-the-light");
    expect(lesson.categoryId).toBe("cat_animation_pixar_disney");
    expect(lesson.categorySlug).toBe("animation-pixar-disney");
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
    expect(lesson.externalId).toBe("uQ2rJKiiRiU");
    expect(lesson.cefrLevel).toBe("B1");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("20:15");
    expect(lesson.durationSeconds).toBe(1215);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(3765078);
    expect(lesson.thumbnailUrl).toContain("uQ2rJKiiRiU");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments;
    expect(segments.length).toBe(50);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(10.0);
    expect(segments[segments.length - 1].endTime).toBe(1210.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments;
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
    const segments = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments;
    for (const seg of segments) {
      const tokens = seg.text.match(/\b[A-Za-z0-9_]+\b/g) || [];
      expect(seg.tokenCount).toBe(tokens.length);
    }
  });

  it("Test 5: Full Bilingual Quiz Rigor (8 CEFR Questions)", () => {
    const quiz = QUIZ_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT;
    expect(quiz.lessonId).toBe("mov_ani_10");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_ani_10_${idx + 1}`);
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
        LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments.length
      );
    });
  });

  it("Test 6: Zero Missing Attributes Across Lesson Object", () => {
    const lesson = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT;
    expect(lesson.description).toBeDefined();
    expect(lesson.description.length).toBeGreaterThan(20);
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
  });
});
