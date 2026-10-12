import { describe, it, expect } from "vitest";
import {
  LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES,
  QUIZ_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES_EXTENDED,
  LESSON_MODERN_FAMILY_GLORIA_FUNNIEST_LANGUAGE_STRUGGLES,
  QUIZ_MODERN_FAMILY_GLORIA_FUNNIEST_LANGUAGE_STRUGGLES,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_modern_family_gloria";

describe("Video #16 (mov_sit_04): Modern Family Gloria Complete Data Coverage & Timeline Precision", () => {
  it("1. Metadata Standards: Valid ID, externalId, CEFR level, Latina American accent, duration 888s", () => {
    expect(LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.id).toBe("mov_sit_04");
    expect(LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.externalId).toBe("72okAeSn5Tc");
    expect(LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.cefrLevel).toBe("B1");
    expect(LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.accent).toBe("Latina American");
    expect(LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.durationSeconds).toBe(888);
    expect(LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.durationFormatted).toBe("14:48");
    expect(LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.sourceType).toBe("YOUTUBE");
    expect(LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.supportedTypes).toBe("BOTH");
    expect(LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.viewCount).toBeGreaterThanOrEqual(100000);
  });

  it("2. Segment Count: Over 70 Pure Master Segments spanning entire 888s clip", () => {
    const segments = LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.segments;
    expect(segments.length).toBeGreaterThanOrEqual(70);
    expect(segments[0].startTime).toBe(0.0);
    const lastSeg = segments[segments.length - 1];
    expect(lastSeg.endTime).toBe(888.0);
  });

  it("3. Zero Merged Utterances: No speaker turn combinations with ' — '", () => {
    for (const seg of LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.segments) {
      expect(seg.text).not.toContain(" — ");
      expect(seg.translationVi).not.toContain(" — ");
    }
  });

  it("4. Chronological Integrity: startTime < endTime and strictly non-decreasing sequence", () => {
    const segments = LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.segments;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
  });

  it("5. Rich Field Completeness: text, translationVi, ipaUs, keywords, explanationAi, and tokenCount", () => {
    for (const seg of LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.segments) {
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

  it("6. Quiz Extended: 8 comprehensive bilingual questions with CEFR targeted concepts", () => {
    expect(QUIZ_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES_EXTENDED.lessonId).toBe("mov_sit_04");
    expect(QUIZ_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES_EXTENDED.totalQuestions).toBe(8);
    expect(QUIZ_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES_EXTENDED.questions.length).toBe(8);

    for (const q of QUIZ_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES_EXTENDED.questions) {
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
    }
  });

  it("7. Backward-compatible Aliases: Legacy exports match modern ones", () => {
    expect(LESSON_MODERN_FAMILY_GLORIA_FUNNIEST_LANGUAGE_STRUGGLES).toBe(
      LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES
    );
    expect(QUIZ_MODERN_FAMILY_GLORIA_FUNNIEST_LANGUAGE_STRUGGLES).toBe(
      QUIZ_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES_EXTENDED
    );
  });
});
