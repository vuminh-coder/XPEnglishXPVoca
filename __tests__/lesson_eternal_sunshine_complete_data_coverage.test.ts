import { describe, it, expect } from "vitest";
import {
  LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK,
  QUIZ_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK_EXTENDED,
} from "../features/listening/data/lessons/movies/romance/lesson_eternal_sunshine";

describe("Video #10 (mov_rom_10): Eternal Sunshine Complete Data Coverage & Timeline Precision", () => {
  it("1. Metadata Standards: Valid ID, externalId, CEFR level, American accent, duration 316s", () => {
    expect(LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.id).toBe("mov_rom_10");
    expect(LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.externalId).toBe("9lo1ncSInLI");
    expect(LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.cefrLevel).toBe("B2");
    expect(LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.accent).toBe("American");
    expect(LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.durationSeconds).toBe(316);
    expect(LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.durationFormatted).toBe("05:16");
    expect(LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.sourceType).toBe("YOUTUBE");
    expect(LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.supportedTypes).toBe("BOTH");
  });

  it("2. Segment Count: Over 90 Pure Master Segments spanning entire 316s clip", () => {
    const segments = LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.segments;
    expect(segments.length).toBeGreaterThanOrEqual(90);
    expect(segments[0].startTime).toBe(0.0);
    const lastSeg = segments[segments.length - 1];
    expect(lastSeg.endTime).toBeGreaterThanOrEqual(310.0);
  });

  it("3. Zero Merged Utterances: No speaker turn combinations with ' — '", () => {
    for (const seg of LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.segments) {
      expect(seg.text).not.toContain(" — ");
      expect(seg.translationVi).not.toContain(" — ");
    }
  });

  it("4. Chronological Integrity: startTime < endTime and strictly non-decreasing sequence", () => {
    const segments = LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.segments;
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
    for (const seg of LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.segments) {
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
    expect(QUIZ_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK_EXTENDED.lessonId).toBe("mov_rom_10");
    expect(QUIZ_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK_EXTENDED.totalQuestions).toBe(8);
    expect(QUIZ_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK_EXTENDED.questions.length).toBe(8);

    for (const q of QUIZ_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK_EXTENDED.questions) {
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

  it("7. Proper Nouns coverage: Joel, Clementine, Montauk, Ruth, Naomi, Stan, Mary, Patrick", () => {
    const allProperNouns = LESSON_ETERNAL_SUNSHINE_MEET_ME_IN_MONTAUK.segments.flatMap((s) => s.properNouns || []);
    expect(allProperNouns).toContain("Montauk");
    expect(allProperNouns).toContain("Joel");
    expect(allProperNouns).toContain("Ruth");
  });
});
