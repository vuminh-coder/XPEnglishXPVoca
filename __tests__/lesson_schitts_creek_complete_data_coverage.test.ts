import { describe, it, expect } from "vitest";
import {
  LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS,
  QUIZ_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_schitts_creek";

describe("Schitt's Creek: Alexis & David's Bickering (mov_sit_12) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS;
    expect(lesson.id).toBe("mov_sit_12");
    expect(lesson.slug).toBe("schitts-creek-alexis-david-vocabulary-dinners");
    expect(lesson.categoryId).toBe("cat_classic_sitcoms");
    expect(lesson.categorySlug).toBe("classic-sitcoms");
    expect(lesson.externalId).toBe("S_acAHyAKuI");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("Canadian / Transatlantic");
    expect(lesson.durationFormatted).toBe("05:15");
    expect(lesson.durationSeconds).toBe(315);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(2905806);
    expect(lesson.thumbnailUrl).toContain("S_acAHyAKuI");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS.segments;
    expect(segments.length).toBeGreaterThanOrEqual(60);
    expect(segments.length).toBe(71);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(0.0);
    expect(segments[segments.length - 1].endTime).toBe(315.2);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS.segments;
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

  it("Test 4: Pure Master Segments & Zero Merged Utterances Standard", () => {
    const segments = LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS.segments;
    for (const seg of segments) {
      // Must not contain YouTube auto-caption markers
      expect(seg.text).not.toContain(">>");
      expect(seg.text).not.toContain("[Music]");
      expect(seg.text).not.toContain("[Applause]");

      // Token count check matching word boundary
      const jsTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(jsTokens);
    }
  });

  it("Test 5: Comprehensive CEFR B2 Quiz Structure", () => {
    const quiz = QUIZ_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS;
    expect(quiz.lessonId).toBe("mov_sit_12");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);
    expect(quiz.xpReward).toBe(100);

    for (const q of quiz.questions) {
      expect(q.id).toMatch(/^mov_sit_12_q\d+$/);
      expect(q.question.trim().length).toBeGreaterThan(15);
      expect(q.questionEn).toBeDefined();
      expect(q.questionEn!.trim().length).toBeGreaterThan(15);
      expect(q.questionVi).toBeDefined();
      expect(q.questionVi!.trim().length).toBeGreaterThan(15);
      expect(q.options.length).toBe(4);
      expect(q.optionsEn).toBeDefined();
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi).toBeDefined();
      expect(q.optionsVi!.length).toBe(4);
      expect([0, 1, 2, 3]).toContain(q.correctAnswer);
      expect(q.explanation.trim().length).toBeGreaterThan(20);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationEn!.trim().length).toBeGreaterThan(20);
      expect(q.explanationVi).toBeDefined();
      expect(q.explanationVi!.trim().length).toBeGreaterThan(20);
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConcept!.trim().length).toBeGreaterThan(10);
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(typeof q.referenceSegmentIndex).toBe("number");
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex!).toBeLessThan(LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS.segments.length);
    }
  });

  it("Test 6: Zero Missing Attributes & Schema Adherence", () => {
    const lesson = LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS;
    expect(lesson.description).toBeDefined();
    expect(lesson.description.length).toBeGreaterThan(30);
    expect(lesson.wpmSpeed).toBeGreaterThan(100);
    expect(lesson.studyCount).toBeGreaterThan(0);
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
  });

  it("Test 7: Thematic & Key Moments Vocabulary Coverage", () => {
    const segments = LESSON_SCHITTS_CREEK_ALEXIS_DAVID_VOCABULARY_DINNERS.segments;
    const allText = segments.map((s) => s.text).join(" ");

    expect(allText).toContain("murdered first");
    expect(allText).toContain("hiccups");
    expect(allText).toContain("heart attack");
    expect(allText).toContain("eating my yogurt");
    expect(allText).toContain("sketchy bar");
    expect(allText).toContain("edible nail polish");
    expect(allText).toContain("Guangzhou");
    expect(allText).toContain("lead-free");
    expect(allText).toContain("only left the icing");
    expect(allText).toContain("share a piece of cake");
    expect(allText).toContain("parallel parking in a burka");
    expect(allText).toContain("hard pass");
    expect(allText).toContain("eat glass, Ken");
    expect(allText).toContain("Tamagotchis");
    expect(allText).toContain("Kate Winslet");
    expect(allText).toContain("Billy Zane");
    expect(allText).toContain("wearing a wedding dress");
    expect(allText).toContain("walk me down the aisle");
    expect(allText).toContain("my honor");
  });
});
