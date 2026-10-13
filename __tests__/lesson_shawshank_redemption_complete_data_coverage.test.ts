import { describe, it, expect } from "vitest";
import {
  LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC,
  QUIZ_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC,
} from "../features/listening/data/lessons/movies/inspirational/lesson_shawshank_redemption";

describe("The Shawshank Redemption: Hope & Choice Words (mov_insp_04) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC;
    expect(lesson.id).toBe("mov_insp_04");
    expect(lesson.slug).toBe("shawshank-redemption-get-busy-living-pacific");
    expect(lesson.categoryId).toBe("cat_inspirational_life");
    expect(lesson.categorySlug).toBe("inspirational-life");
    expect(lesson.externalId).toBe("accOHNw_qX8");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("55:11");
    expect(lesson.durationSeconds).toBe(3311);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(9839170);
    expect(lesson.thumbnailUrl).toContain("accOHNw_qX8");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC.segments;
    expect(segments.length).toBeGreaterThanOrEqual(45);
    expect(segments.length).toBe(50);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(9.7);
    expect(segments[segments.length - 1].endTime).toBe(3285.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC.segments;
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
    const segments = LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC.segments;
    for (const seg of segments) {
      // Must not contain YouTube caption artifacts
      expect(seg.text).not.toContain(">>");
      expect(seg.text).not.toContain("[Music]");
      expect(seg.text).not.toContain("[Applause]");

      // Token count check matching word boundary
      const jsTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(jsTokens);
    }
  });

  it("Test 5: Comprehensive CEFR B2 Quiz Structure", () => {
    const quiz = QUIZ_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC;
    expect(quiz.lessonId).toBe("mov_insp_04");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);
    expect(quiz.xpReward).toBe(100);

    for (const q of quiz.questions) {
      expect(q.id).toMatch(/^mov_insp_04_q\d+$/);
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
      expect(q.referenceSegmentIndex!).toBeLessThan(
        LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC.segments.length
      );
    }
  });

  it("Test 6: Zero Missing Attributes & Schema Adherence", () => {
    const lesson = LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC;
    expect(lesson.description).toBeDefined();
    expect(lesson.description.length).toBeGreaterThan(30);
    expect(lesson.wpmSpeed).toBeGreaterThan(100);
    expect(lesson.studyCount).toBeGreaterThan(0);
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
  });

  it("Test 7: Thematic & Key Moments Vocabulary Coverage", () => {
    const segments = LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC.segments;
    const allText = segments.map((s) => s.text).join(" ");

    expect(allText).toContain("innocent of this crime");
    expect(allText).toContain("decidedly inconvenient that the gun was never found");
    expect(allText).toContain("Shawshank prison");
    expect(allText).toContain("naked as the day you were born");
    expect(allText).toContain("rock hammer");
    expect(allText).toContain("digging through a wall");
    expect(allText).toContain("trust your wife");
    expect(allText).toContain("three beers apiece");
    expect(allText).toContain("felt like free men");
    expect(allText).toContain("Italian ladies");
    expect(allText).toContain("beautiful bird flapped into our drab little cage");
    expect(allText).toContain("walls dissolve away");
    expect(allText).toContain("Mozart");
    expect(allText).toContain("places not made out of stone");
    expect(allText).toContain("Hope is a dangerous thing");
    expect(allText).toContain("Zihuatanejo");
    expect(allText).toContain("Pacific Ocean");
    expect(allText).toContain("warm place with no memory");
    expect(allText).toContain("Buxton");
    expect(allText).toContain("big oak tree");
    expect(allText).toContain("Get busy living, or get busy dying");
    expect(allText).toContain("rehabilitated");
    expect(allText).toContain("bullshit word");
    expect(allText).toContain("hope is a good thing, maybe the best of things, and no good thing ever dies");
    expect(allText).toContain("I hope the Pacific is as blue as it has been in my dreams");
    expect(allText).toContain("I hope");
  });
});
