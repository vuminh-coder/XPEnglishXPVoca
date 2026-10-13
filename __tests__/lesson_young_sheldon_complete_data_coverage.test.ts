import { describe, it, expect } from "vitest";
import {
  LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES,
  QUIZ_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_young_sheldon";

describe("Young Sheldon Outsmarting Everyone (mov_sit_10) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES;
    expect(lesson.id).toBe("mov_sit_10");
    expect(lesson.slug).toBe("young-sheldon-outsmarting-everyone-debates");
    expect(lesson.categoryId).toBe("cat_classic_sitcoms");
    expect(lesson.categorySlug).toBe("classic-sitcoms");
    expect(lesson.externalId).toBe("EKEEalhsDOA");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("Texan American");
    expect(lesson.durationFormatted).toBe("31:22");
    expect(lesson.durationSeconds).toBe(1882);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(18700000);
    expect(lesson.thumbnailUrl).toContain("EKEEalhsDOA");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES.segments;
    expect(segments.length).toBeGreaterThanOrEqual(200);
    expect(segments.length).toBe(240);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(0.5);
    expect(segments[segments.length - 1].endTime).toBe(1795.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES.segments;
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
    const segments = LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES.segments;
    for (const seg of segments) {
      // Must not contain YouTube auto-caption marker
      expect(seg.text).not.toContain(">>");
      expect(seg.text).not.toContain("[Music]");
      expect(seg.text).not.toContain("[Applause]");

      // Token count check matching regex boundary
      const jsTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(jsTokens);
    }
  });

  it("Test 5: Comprehensive CEFR B2 Quiz Structure", () => {
    const quiz = QUIZ_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES;
    expect(quiz.lessonId).toBe("mov_sit_10");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);
    expect(quiz.xpReward).toBe(100);

    for (const q of quiz.questions) {
      expect(q.id).toMatch(/^q_mov_sit_10_\d+$/);
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
      expect(q.targetedConcept!.trim().length).toBeGreaterThan(5);
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptEn!.trim().length).toBeGreaterThan(5);
      expect(q.targetedConceptVi).toBeDefined();
      expect(q.targetedConceptVi!.trim().length).toBeGreaterThan(5);
    }
  });

  it("Test 6: Quiz Reference Validity & Semantic Alignment", () => {
    const lesson = LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES;
    const quiz = QUIZ_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES;

    for (const q of quiz.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(lesson.segments.length);

      const targetSeg = lesson.segments[q.referenceSegmentIndex!];
      expect(targetSeg).toBeDefined();
    }

    // Specific semantic checks
    expect(lesson.segments[quiz.questions[0].referenceSegmentIndex!].text).toContain("sandwich tastes different");
    expect(lesson.segments[quiz.questions[1].referenceSegmentIndex!].text).toContain("really cheap and fast");
    expect(lesson.segments[quiz.questions[2].referenceSegmentIndex!].text).toContain("centralized control");
    expect(lesson.segments[quiz.questions[3].referenceSegmentIndex!].text).toContain("land the booster rockets");
    expect(lesson.segments[quiz.questions[4].referenceSegmentIndex!].text).toContain("PID controller");
    expect(lesson.segments[quiz.questions[5].referenceSegmentIndex!].text).toContain("in my spot");
    expect(lesson.segments[quiz.questions[6].referenceSegmentIndex!].text).toContain("TARDIS");
    expect(lesson.segments[quiz.questions[7].referenceSegmentIndex!].text).toContain("headed to Rusk");
  });

  it("Test 7: Lexical & Scientific Key Concepts Coverage", () => {
    const textCorpus = LESSON_YOUNG_SHELDON_OUTSMARTING_EVERYONE_DEBATES.segments
      .map((s) => s.text)
      .join(" ");

    expect(textCorpus).toContain("broke the curve");
    expect(textCorpus).toContain("doing battle with corporate America");
    expect(textCorpus).toContain("grand unified field theory");
    expect(textCorpus).toContain("Kurt Godel");
    expect(textCorpus).toContain("supercritical assembly");
    expect(textCorpus).toContain("land the booster rockets");
    expect(textCorpus).toContain("PID controller");
    expect(textCorpus).toContain("apogee");
    expect(textCorpus).toContain("quantum chromodynamics");
    expect(textCorpus).toContain("TARDIS");
    expect(textCorpus).toContain("Morse code");
  });
});
