import { describe, it, expect } from "vitest";
import {
  LESSON_MODERN_FAMILY_PHIL_DUNPHY,
  QUIZ_MODERN_FAMILY_PHIL_DUNPHY_EXTENDED,
  LESSON_MODERN_FAMILY_BEST_OF_PHIL_DUNPHY_DAD,
  QUIZ_MODERN_FAMILY_BEST_OF_PHIL_DUNPHY_DAD,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_modern_family_phil_dunphy";

describe("Video #15 (mov_sit_03): Modern Family Phil Dunphy Complete Data Coverage & Timeline Precision", () => {
  it("1. Metadata Standards: Valid ID, externalId, CEFR level, American accent, duration 710s", () => {
    expect(LESSON_MODERN_FAMILY_PHIL_DUNPHY.id).toBe("mov_sit_03");
    expect(LESSON_MODERN_FAMILY_PHIL_DUNPHY.externalId).toBe("qMNsPjt7L4M");
    expect(LESSON_MODERN_FAMILY_PHIL_DUNPHY.cefrLevel).toBe("B1");
    expect(LESSON_MODERN_FAMILY_PHIL_DUNPHY.accent).toBe("American");
    expect(LESSON_MODERN_FAMILY_PHIL_DUNPHY.durationSeconds).toBe(710);
    expect(LESSON_MODERN_FAMILY_PHIL_DUNPHY.durationFormatted).toBe("11:50");
    expect(LESSON_MODERN_FAMILY_PHIL_DUNPHY.sourceType).toBe("YOUTUBE");
    expect(LESSON_MODERN_FAMILY_PHIL_DUNPHY.supportedTypes).toBe("BOTH");
    expect(LESSON_MODERN_FAMILY_PHIL_DUNPHY.viewCount).toBeGreaterThanOrEqual(1000000);
  });

  it("2. Segment Count: Over 120 Pure Master Segments spanning entire 710s clip", () => {
    const segments = LESSON_MODERN_FAMILY_PHIL_DUNPHY.segments;
    expect(segments.length).toBeGreaterThanOrEqual(120);
    expect(segments[0].startTime).toBe(0.0);
    const lastSeg = segments[segments.length - 1];
    expect(lastSeg.endTime).toBe(710.0);
  });

  it("3. Zero Merged Utterances: No speaker turn combinations with ' — '", () => {
    for (const seg of LESSON_MODERN_FAMILY_PHIL_DUNPHY.segments) {
      expect(seg.text).not.toContain(" — ");
      expect(seg.translationVi).not.toContain(" — ");
    }
  });

  it("4. Chronological Integrity: startTime < endTime and strictly non-decreasing sequence (1-indexed)", () => {
    const segments = LESSON_MODERN_FAMILY_PHIL_DUNPHY.segments;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
  });

  it("5. Rich Field Completeness: text, translationVi, ipaUs, keywords, explanationAi, and tokenCount", () => {
    for (const seg of LESSON_MODERN_FAMILY_PHIL_DUNPHY.segments) {
      expect(seg.text.trim().length).toBeGreaterThan(0);
      expect(seg.translationVi.trim().length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.trim().length).toBeGreaterThan(0);
      expect(seg.ipaUs!.startsWith("/")).toBe(true);
      expect(seg.ipaUs!.endsWith("/")).toBe(true);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length).toBeGreaterThanOrEqual(1);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.trim().length).toBeGreaterThan(15);
      expect(seg.tokenCount).toBeGreaterThan(0);
    }
  });

  it("6. Quiz Extended: 8 comprehensive bilingual questions with valid 1-indexed references", () => {
    expect(QUIZ_MODERN_FAMILY_PHIL_DUNPHY_EXTENDED.lessonId).toBe("mov_sit_03");
    expect(QUIZ_MODERN_FAMILY_PHIL_DUNPHY_EXTENDED.totalQuestions).toBe(8);
    expect(QUIZ_MODERN_FAMILY_PHIL_DUNPHY_EXTENDED.questions.length).toBe(8);

    for (const q of QUIZ_MODERN_FAMILY_PHIL_DUNPHY_EXTENDED.questions) {
      expect(q.options.length).toBe(4);
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.questionEn!.trim().length).toBeGreaterThan(10);
      expect(q.questionVi!.trim().length).toBeGreaterThan(10);
      expect(q.explanationEn!.trim().length).toBeGreaterThan(15);
      expect(q.explanationVi!.trim().length).toBeGreaterThan(15);
      expect(q.targetedConceptEn?.trim().length).toBeGreaterThan(5);
      expect(q.targetedConceptVi?.trim().length).toBeGreaterThan(5);
      expect(typeof q.referenceSegmentIndex).toBe("number");
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_MODERN_FAMILY_PHIL_DUNPHY.segments.length);
    }
  });

  it("7. Backward-compatible Aliases: Legacy exports match modern ones", () => {
    expect(LESSON_MODERN_FAMILY_BEST_OF_PHIL_DUNPHY_DAD).toBe(LESSON_MODERN_FAMILY_PHIL_DUNPHY);
    expect(QUIZ_MODERN_FAMILY_BEST_OF_PHIL_DUNPHY_DAD).toBe(QUIZ_MODERN_FAMILY_PHIL_DUNPHY_EXTENDED);
  });
});
