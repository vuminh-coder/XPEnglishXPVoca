import { describe, it, expect } from "vitest";
import {
  LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE,
  QUIZ_SOUL_THE_SPARK_AND_OCEAN_PARABLE,
} from "../features/listening/data/lessons/movies/animation/lesson_soul";

describe("Soul: The Spark, Lost Souls & Ocean Parable (mov_ani_03) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE;
    expect(lesson.id).toBe("mov_ani_03");
    expect(lesson.slug).toBe("soul-the-spark-and-ocean-parable");
    expect(lesson.categoryId).toBe("cat_animation_pixar_disney");
    expect(lesson.categorySlug).toBe("animation-pixar-disney");
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
    expect(lesson.externalId).toBe("e1Mno2A2N5E");
    expect(lesson.cefrLevel).toBe("B1");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("23:22");
    expect(lesson.durationSeconds).toBe(1402);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(1119240);
    expect(lesson.thumbnailUrl).toContain("e1Mno2A2N5E");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments;
    expect(segments.length).toBe(50);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(38.0);
    expect(segments[segments.length - 1].endTime).toBe(1402.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments;
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
    const segments = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments;
    for (const seg of segments) {
      const tokens = seg.text.match(/\b[A-Za-z0-9_]+\b/g) || [];
      expect(seg.tokenCount).toBe(tokens.length);
    }
  });

  it("Test 5: Full Bilingual Quiz Rigor (8 CEFR Questions)", () => {
    const quiz = QUIZ_SOUL_THE_SPARK_AND_OCEAN_PARABLE;
    expect(quiz.lessonId).toBe("mov_ani_03");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_ani_03_${idx + 1}`);
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
        LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments.length
      );
    });
  });

  it("Test 6: Zero Missing Attributes Across Lesson Object", () => {
    const lesson = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE;
    expect(lesson.title.trim().length).toBeGreaterThan(10);
    expect(lesson.description.trim().length).toBeGreaterThan(30);
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
  });

  it("Test 7: Zero Merged Utterances Across Character Dialogue Segments", () => {
    const segments = LESSON_SOUL_THE_SPARK_AND_OCEAN_PARABLE.segments;
    // Dorothea and Joe dialogue lines must be completely separated
    expect(segments[8].text).toContain("Can you play, middle school teacher?");
    expect(segments[9].text).toContain("Joe sat down at the piano, took a deep breath");
    expect(segments[11].text).toContain("Alright, Teach. You got the gig.");

    // Ocean Parable fish dialogue must also be strictly independent
    expect(segments[36].text).toContain("I’m trying to find this thing they call the ocean");
    expect(segments[37].text).toBe("'The ocean?' the older fish says, 'That’s what you’re in right now.'");
    expect(segments[38].text).toBe("'This?' says the young fish, 'This is water. What I want is the ocean!'");
  });
});
