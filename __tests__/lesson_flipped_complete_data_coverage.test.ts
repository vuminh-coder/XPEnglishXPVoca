import { describe, it, expect } from "vitest";
import {
  LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS,
  QUIZ_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS_EXTENDED,
} from "../features/listening/data/lessons/movies/romance/lesson_flipped";

describe("Video #12 (mov_rom_12): Flipped Complete Data Coverage & Timeline Precision", () => {
  it("1. Metadata Standards: Valid ID, externalId, CEFR level, American accent, duration 335s", () => {
    expect(LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.id).toBe("mov_rom_12");
    expect(LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.externalId).toBe("KTUvOpY89RE");
    expect(LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.cefrLevel).toBe("B1");
    expect(LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.accent).toBe("American");
    expect(LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.durationSeconds).toBe(335);
    expect(LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.durationFormatted).toBe("05:35");
    expect(LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.sourceType).toBe("YOUTUBE");
    expect(LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.supportedTypes).toBe("BOTH");
  });

  it("2. Segment Count: Over 60 Pure Master Segments spanning entire 335s clip", () => {
    const segments = LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.segments;
    expect(segments.length).toBeGreaterThanOrEqual(60);
    expect(segments[0].startTime).toBe(0.0);
    const lastSeg = segments[segments.length - 1];
    expect(lastSeg.endTime).toBe(335.0);
  });

  it("3. Zero Merged Utterances: No speaker turn combinations with ' — '", () => {
    for (const seg of LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.segments) {
      expect(seg.text).not.toContain(" — ");
      expect(seg.translationVi).not.toContain(" — ");
    }
  });

  it("4. Chronological Integrity: startTime < endTime and strictly non-decreasing sequence", () => {
    const segments = LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.segments;
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
    for (const seg of LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.segments) {
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
    expect(QUIZ_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS_EXTENDED.lessonId).toBe("mov_rom_12");
    expect(QUIZ_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS_EXTENDED.totalQuestions).toBe(8);
    expect(QUIZ_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS_EXTENDED.questions.length).toBe(8);

    for (const q of QUIZ_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS_EXTENDED.questions) {
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
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.segments.length);
    }
  });

  it("7. Proper Nouns coverage: Bryce, Juli, Garrett, Shelly, Eddie Trulock", () => {
    const allProperNouns = LESSON_FLIPPED_THE_SYCAMORE_TREE_AND_BASKET_BOYS.segments.flatMap((s) => s.properNouns || []);
    expect(allProperNouns).toContain("Bryce");
    expect(allProperNouns).toContain("Juli");
    expect(allProperNouns).toContain("Garrett");
  });
});
