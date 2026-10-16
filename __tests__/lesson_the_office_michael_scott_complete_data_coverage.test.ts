import { describe, it, expect } from "vitest";
import {
  LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS,
  QUIZ_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS_EXTENDED,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_the_office_michael_scott";

function tokenizeSentence(sentence: string, properNouns: string[] = []) {
  if (!sentence) return [];
  const normalizedPNDict: Record<string, string> = {};
  properNouns.forEach((pn) => {
    normalizedPNDict[pn.toLowerCase().trim()] = pn.trim();
  });
  const words = sentence.trim().split(/\s+/);
  return words
    .map((w, idx) => {
      const clean = w.replace(/^[^\w\s']+|[^\w\s']+$/g, "");
      const isPN = !!normalizedPNDict[clean.toLowerCase()];
      return {
        index: idx,
        text: w,
        cleanText: clean,
        isProperNoun: isPN,
        isPunctuation: /^[^\w\s]+$/.test(w),
      };
    })
    .filter((t) => t.cleanText.length > 0 || t.isPunctuation);
}

describe("The Office: Michael Scott's Conference Meetings - Complete Data Coverage Test Suite", () => {
  it("should verify lesson metadata conforms to high standards", () => {
    expect(LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.id).toBe("mov_sit_06");
    expect(LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.externalId).toBe("Db1NdYbQhAA");
    expect(LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.durationSeconds).toBe(908);
    expect(LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.durationFormatted).toBe("15:08");
    expect(LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.cefrLevel).toBe("B2");
    expect(LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.categoryId).toBe("cat_classic_sitcoms");
    expect(LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.viewCount).toBeGreaterThanOrEqual(10000000);
  });

  it("should have comprehensive segment coverage across the entire video", () => {
    const segments = LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.segments;
    expect(segments.length).toBe(121);
    expect(segments[0].startTime).toBe(0.0);
    expect(segments[segments.length - 1].endTime).toBe(858.0);
  });

  it("should enforce ZERO MERGED UTTERANCES constraint across all segments", () => {
    for (const seg of LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.segments) {
      expect(seg.text).not.toContain(" — ");
      expect(seg.translationVi).not.toContain(" — ");
    }
  });

  it("should provide full rich linguistic annotations for every segment (1-indexed)", () => {
    const segments = LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.segments;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs?.length).toBeGreaterThan(0);
      expect(seg.keywords?.length).toBeGreaterThan(0);
      expect(seg.explanationAi?.length).toBeGreaterThan(0);
      expect(seg.orderIndex).toBe(i + 1);
    }
  });

  it("should maintain strict chronological ordering with no inverted timestamps", () => {
    const segments = LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.segments;
    for (let i = 0; i < segments.length; i++) {
      expect(segments[i].endTime).toBeGreaterThan(segments[i].startTime);
      if (i > 0) {
        expect(segments[i].startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
  });

  it("should accurately synchronize tokenCount with tokenizeSentence", () => {
    for (const seg of LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
    }
  });

  it("should verify extended bilingual quiz contains 8 comprehensive questions with valid 1-indexed references", () => {
    const quiz = QUIZ_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS_EXTENDED;
    expect(quiz.lessonId).toBe("mov_sit_06");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    for (const q of quiz.questions) {
      expect(q.id).toBeDefined();
      expect(q.question.length).toBeGreaterThan(0);
      expect(q.questionEn).toBeDefined();
      expect(q.questionVi).toBeDefined();
      expect(q.options.length).toBe(4);
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanation.length).toBeGreaterThan(0);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationVi).toBeDefined();
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(typeof q.referenceSegmentIndex).toBe("number");
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.segments.length);
    }
  });
});
