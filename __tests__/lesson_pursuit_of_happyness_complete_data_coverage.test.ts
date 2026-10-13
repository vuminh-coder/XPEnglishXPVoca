import { describe, it, expect } from "vitest";
import {
  LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS,
  QUIZ_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS,
} from "../features/listening/data/lessons/movies/inspirational/lesson_pursuit_of_happyness";

describe("The Pursuit of Happyness: Job Interview & Dream Speech (mov_insp_02) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS;
    expect(lesson.id).toBe("mov_insp_02");
    expect(lesson.slug).toBe("pursuit-of-happyness-basketball-happiness");
    expect(lesson.categoryId).toBe("cat_inspirational_life");
    expect(lesson.categorySlug).toBe("inspirational-life");
    expect(lesson.externalId).toBe("pKoH9GkEKxQ");
    expect(lesson.cefrLevel).toBe("B1");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("20:17");
    expect(lesson.durationSeconds).toBe(1217);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(6914465);
    expect(lesson.thumbnailUrl).toContain("pKoH9GkEKxQ");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS.segments;
    expect(segments.length).toBeGreaterThanOrEqual(70);
    expect(segments.length).toBe(80);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(0.0);
    expect(segments[segments.length - 1].endTime).toBe(1217.2);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS.segments;
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
    const segments = LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS.segments;
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
    const quiz = QUIZ_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS;
    expect(quiz.lessonId).toBe("mov_insp_02");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);
    expect(quiz.xpReward).toBe(100);

    for (const q of quiz.questions) {
      expect(q.id).toMatch(/^mov_insp_02_q\d+$/);
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
        LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS.segments.length
      );
    }
  });

  it("Test 6: Zero Missing Attributes & Schema Adherence", () => {
    const lesson = LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS;
    expect(lesson.description).toBeDefined();
    expect(lesson.description.length).toBeGreaterThan(30);
    expect(lesson.wpmSpeed).toBeGreaterThan(100);
    expect(lesson.studyCount).toBeGreaterThan(0);
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
  });

  it("Test 7: Thematic & Key Moments Vocabulary Coverage", () => {
    const segments = LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS.segments;
    const allText = segments.map((s) => s.text).join(" ");

    // Dean Witter interview keywords
    expect(allText).toContain("Will Smith");
    expect(allText).toContain("The Pursuit of Happyness");
    expect(allText).toContain("job interview");
    expect(allText).toContain("connected speech");
    expect(allText).toContain("Chris Gardner");
    expect(allText).toContain("come up with a story");
    expect(allText).toContain("earnestness");
    expect(allText).toContain("diligence");
    expect(allText).toContain("team-playing");
    expect(allText).toContain("failure to pay parking tickets");
    expect(allText).toContain("Polk Station");
    expect(allText).toContain("painting my apartment");
    expect(allText).toContain("Is it dry now?");
    expect(allText).toContain("40-pound gizmo");
    expect(allText).toContain("I'd like to think so");
    expect(allText).toContain("First in your class in school?");
    expect(allText).toContain("radar class in the Navy");
    expect(allText).toContain("I will find the answer");
    expect(allText).toContain("without a shirt on");
    expect(allText).toContain("He must've had on some really nice pants");

    // Basketball court & life wisdom keywords
    expect(allText).toContain("Don't ever let somebody tell you you can't do something");
    expect(allText).toContain("You got a dream... You gotta protect it");
    expect(allText).toContain("If you want something, go get it. Period");
    expect(allText).toContain("called happiness");
    expect(allText).toContain("perseverance truly breaks barriers");
  });
});
