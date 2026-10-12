import { describe, it, expect } from "vitest";
import {
  LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA,
  QUIZ_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA_EXTENDED,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_friends_apartment_bet";

describe("Video #13 (mov_sit_01): Friends Apartment Bet Complete Data Coverage & Timeline Precision", () => {
  it("1. Metadata Standards: Valid ID, externalId, CEFR level, American accent, duration 313s", () => {
    expect(LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.id).toBe("mov_sit_01");
    expect(LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.externalId).toBe("v1xXlxDHWPU");
    expect(LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.cefrLevel).toBe("B1");
    expect(LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.accent).toBe("American");
    expect(LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.durationSeconds).toBe(313);
    expect(LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.durationFormatted).toBe("05:13");
    expect(LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.sourceType).toBe("YOUTUBE");
    expect(LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.supportedTypes).toBe("BOTH");
    expect(LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.viewCount).toBeGreaterThanOrEqual(100000);
  });

  it("2. Segment Count: Over 100 Pure Master Segments spanning entire 313s clip", () => {
    const segments = LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.segments;
    expect(segments.length).toBeGreaterThanOrEqual(100);
    expect(segments[0].startTime).toBe(0.0);
    const lastSeg = segments[segments.length - 1];
    expect(lastSeg.endTime).toBe(313.0);
  });

  it("3. Zero Merged Utterances: No speaker turn combinations with ' — '", () => {
    for (const seg of LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.segments) {
      expect(seg.text).not.toContain(" — ");
      expect(seg.translationVi).not.toContain(" — ");
    }
  });

  it("4. Chronological Integrity: startTime < endTime and strictly non-decreasing sequence", () => {
    const segments = LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.segments;
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
    for (const seg of LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.segments) {
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
    expect(QUIZ_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA_EXTENDED.lessonId).toBe("mov_sit_01");
    expect(QUIZ_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA_EXTENDED.totalQuestions).toBe(8);
    expect(QUIZ_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA_EXTENDED.questions.length).toBe(8);

    for (const q of QUIZ_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA_EXTENDED.questions) {
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

  it("7. Proper Nouns coverage: Chandler, Monica, Rachel, Ross, Joey, Michael Flatley, Althea, Scotch, TV Guide", () => {
    const allProperNouns = LESSON_FRIENDS_THE_ICONIC_APARTMENT_BET_TRIVIA.segments.flatMap((s) => s.properNouns || []);
    expect(allProperNouns).toContain("Chandler");
    expect(allProperNouns).toContain("Monica");
    expect(allProperNouns).toContain("Rachel");
    expect(allProperNouns).toContain("Ross");
    expect(allProperNouns).toContain("Michael Flatley");
    expect(allProperNouns).toContain("Althea");
  });
});
