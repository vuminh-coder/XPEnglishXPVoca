import { describe, it, expect } from "vitest";
import {
  LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH,
  QUIZ_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH,
} from "../features/listening/data/lessons/movies/animation/lesson_inside_out";

describe("Inside Out: Joy, Sadness & Headquarters Emotional Journey (mov_ani_02) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH;
    expect(lesson.id).toBe("mov_ani_02");
    expect(lesson.slug).toBe("inside-out-joy-sadness-anxiety-breakthrough");
    expect(lesson.categoryId).toBe("cat_animation_pixar_disney");
    expect(lesson.categorySlug).toBe("animation-pixar-disney");
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
    expect(lesson.externalId).toBe("Uky-jgd3M3E");
    expect(lesson.cefrLevel).toBe("A2");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("13:13");
    expect(lesson.durationSeconds).toBe(793);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(5862110);
    expect(lesson.thumbnailUrl).toContain("Uky-jgd3M3E");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments;
    expect(segments.length).toBe(50);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(2.5);
    expect(segments[segments.length - 1].endTime).toBe(793.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments;
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
    const segments = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments;
    for (const seg of segments) {
      const tokens = seg.text.match(/\b[A-Za-z0-9_]+\b/g) || [];
      expect(seg.tokenCount).toBe(tokens.length);
    }
  });

  it("Test 5: Full Bilingual Quiz Rigor (8 CEFR Questions)", () => {
    const quiz = QUIZ_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH;
    expect(quiz.lessonId).toBe("mov_ani_02");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_ani_02_${idx + 1}`);
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
        LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments.length
      );
    });
  });

  it("Test 6: Zero Missing Attributes Across Lesson Object", () => {
    const lesson = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH;
    expect(lesson.title.trim().length).toBeGreaterThan(10);
    expect(lesson.description.trim().length).toBeGreaterThan(30);
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
  });

  it("Test 7: Zero Merged Utterances Across Character Dialogue Segments", () => {
    const segments = LESSON_INSIDE_OUT_JOY_SADNESS_ANXIETY_BREAKTHROUGH.segments;
    // Core memory and Goofball Island lines must be independent
    expect(segments[4].text).toContain("each core memory powers a different aspect");
    expect(segments[5].text).toBe("Yep, Goofball Island is the best!");

    // Moving crisis dialogue separation
    expect(segments[11].text).toContain("The moving van won't be here until Thursday.");
    expect(segments[12].text).toContain("You're telling me we have to sleep on the floor?");

    // Emotional resolution separation
    expect(segments[47].text).toContain("Sadness, it's up to you.");
    expect(segments[48].text).toContain("I miss Minnesota.");
  });
});
