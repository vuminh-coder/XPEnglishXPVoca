import { describe, it, expect } from "vitest";
import {
  LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS,
  QUIZ_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS_EXTENDED,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_the_office_michael_scott";

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

  it("should provide full rich linguistic annotations for every segment", () => {
    for (const seg of LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.segments) {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs?.length).toBeGreaterThan(0);
      expect(seg.keywords?.length).toBeGreaterThan(0);
      expect(seg.explanationAi?.length).toBeGreaterThan(0);
      expect(seg.orderIndex).toBeDefined();
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

  it("should accurately synchronize tokenCount with JavaScript ASCII word regex", () => {
    for (const seg of LESSON_THE_OFFICE_MICHAEL_SCOTT_CONFERENCE_MEETINGS.segments) {
      const expectedTokens = (seg.text.match(/\b\w+\b/g) || []).length;
      expect(seg.tokenCount).toBe(expectedTokens);
    }
  });

  it("should verify extended bilingual quiz contains 8 comprehensive questions", () => {
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
    }
  });
});
