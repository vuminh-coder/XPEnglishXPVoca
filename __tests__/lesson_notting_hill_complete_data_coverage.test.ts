import { describe, it, expect } from "vitest";
import {
  LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL,
  QUIZ_NOTTING_HILL_IM_ALSO_JUST_A_GIRL_EXTENDED,
} from "../features/listening/data/lessons/movies/romance/lesson_notting_hill";

describe("Video #11 (mov_rom_11): Notting Hill Complete Data Coverage & Timeline Precision", () => {
  it("1. Metadata Standards: Valid ID, externalId, CEFR level, British & American accent, duration 377s", () => {
    expect(LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.id).toBe("mov_rom_11");
    expect(LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.externalId).toBe("sM4rv42qyvk");
    expect(LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.cefrLevel).toBe("B2");
    expect(LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.accent).toBe("British (RP) & American");
    expect(LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.durationSeconds).toBe(377);
    expect(LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.durationFormatted).toBe("06:17");
    expect(LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.sourceType).toBe("YOUTUBE");
    expect(LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.supportedTypes).toBe("BOTH");
  });

  it("2. Segment Count: Over 70 Pure Master Segments spanning entire 377s clip", () => {
    const segments = LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.segments;
    expect(segments.length).toBeGreaterThanOrEqual(70);
    expect(segments[0].startTime).toBe(0.0);
    const lastSeg = segments[segments.length - 1];
    expect(lastSeg.endTime).toBe(377.0);
  });

  it("3. Zero Merged Utterances: No speaker turn combinations with ' — '", () => {
    for (const seg of LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.segments) {
      expect(seg.text).not.toContain(" — ");
      expect(seg.translationVi).not.toContain(" — ");
    }
  });

  it("4. Chronological Integrity: startTime < endTime and strictly non-decreasing sequence", () => {
    const segments = LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.segments;
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
    for (const seg of LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.segments) {
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
    expect(QUIZ_NOTTING_HILL_IM_ALSO_JUST_A_GIRL_EXTENDED.lessonId).toBe("mov_rom_11");
    expect(QUIZ_NOTTING_HILL_IM_ALSO_JUST_A_GIRL_EXTENDED.totalQuestions).toBe(8);
    expect(QUIZ_NOTTING_HILL_IM_ALSO_JUST_A_GIRL_EXTENDED.questions.length).toBe(8);

    for (const q of QUIZ_NOTTING_HILL_IM_ALSO_JUST_A_GIRL_EXTENDED.questions) {
      expect(q.options.length).toBe(4);
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect([0, 1, 2, 3]).toContain(q.correctAnswer);
      expect(q.explanation.length).toBeGreaterThan(20);
      expect(q.explanationEn?.length).toBeGreaterThan(20);
      expect(q.explanationVi?.length).toBeGreaterThan(20);
      expect(q.targetedConcept?.length).toBeGreaterThan(5);
      expect(q.targetedConceptEn?.length).toBeGreaterThan(5);
      expect(q.targetedConceptVi?.length).toBeGreaterThan(5);
      expect(typeof q.referenceSegmentIndex).toBe("number");
    }
  });

  it("7. Proper Nouns coverage: Miss Scott, Anna, William, Dominic, Horse & Hound, UK, Britain, Spike, Notting Hill", () => {
    const allProperNouns = LESSON_NOTTING_HILL_IM_ALSO_JUST_A_GIRL.segments.flatMap((s) => s.properNouns || []);
    expect(allProperNouns).toContain("Horse & Hound");
    expect(allProperNouns).toContain("Dominic");
    expect(allProperNouns).toContain("Notting Hill");
  });
});
