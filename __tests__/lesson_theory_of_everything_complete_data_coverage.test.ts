import { describe, it, expect } from "vitest";
import {
  LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE,
  QUIZ_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE,
} from "../features/listening/data/lessons/movies/inspirational/lesson_theory_of_everything";

describe("The Theory of Everything: Stephen Hawking Ending (mov_insp_08) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE;
    expect(lesson.id).toBe("mov_insp_08");
    expect(lesson.slug).toBe("theory-of-everything-where-there-is-life-hope");
    expect(lesson.categoryId).toBe("cat_inspirational_life");
    expect(lesson.categorySlug).toBe("inspirational-life");
    expect(lesson.externalId).toBe("0RdvRJGl-_w");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("British");
    expect(lesson.durationFormatted).toBe("05:18");
    expect(lesson.durationSeconds).toBe(318);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(1321038);
    expect(lesson.thumbnailUrl).toContain("0RdvRJGl-_w");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments;
    expect(segments.length).toBeGreaterThanOrEqual(30);
    expect(segments.length).toBe(34);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(5.0);
    expect(segments[segments.length - 1].endTime).toBe(318.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments;
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
    const segments = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments;
    for (const seg of segments) {
      const tokens = seg.text.match(/\b[A-Za-z0-9_]+\b/g) || [];
      expect(seg.tokenCount).toBe(tokens.length);
    }
  });

  it("Test 5: Full Bilingual Quiz Rigor (8 CEFR Questions)", () => {
    const quiz = QUIZ_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE;
    expect(quiz.lessonId).toBe("mov_insp_08");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_insp_08_${idx + 1}`);
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
        LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments.length
      );
    });
  });

  it("Test 6: Zero Missing Attributes Across Lesson Object", () => {
    const lesson = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE;
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
    const textAll = LESSON_THEORY_OF_EVERYTHING_WHERE_THERE_IS_LIFE_HOPE.segments
      .map((s) => s.text)
      .join(" ");
    expect(textAll).toContain("primates");
    expect(textAll).toContain("boundary conditions");
    expect(textAll).toContain("no boundary to human endeavor");
    expect(textAll).toContain("fountain pen");
    expect(textAll).toContain("While there's life, there is hope");
    expect(textAll).toContain("Look what we made");
    expect(textAll).toContain("Arrival of the Birds");
    expect(textAll).toContain("Hawking radiation");
  });
});
