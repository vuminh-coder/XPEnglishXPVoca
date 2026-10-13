import { describe, it, expect } from "vitest";
import {
  LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN,
  QUIZ_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN,
} from "../features/listening/data/lessons/movies/inspirational/lesson_dead_poets_society";

describe("Dead Poets Society: Robin Williams 'Rip It Out' (mov_insp_03) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN;
    expect(lesson.id).toBe("mov_insp_03");
    expect(lesson.slug).toBe("dead-poets-society-carpe-diem-captain");
    expect(lesson.categoryId).toBe("cat_inspirational_life");
    expect(lesson.categorySlug).toBe("inspirational-life");
    expect(lesson.externalId).toBe("8x0COtH4Vrw");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("05:32");
    expect(lesson.durationSeconds).toBe(332);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(707269);
    expect(lesson.thumbnailUrl).toContain("8x0COtH4Vrw");
  });

  it("Test 2: Master Segments Volume & Chronological Progression", () => {
    const segments = LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN.segments;
    expect(segments.length).toBeGreaterThanOrEqual(50);
    expect(segments.length).toBe(59);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(0.88);
    expect(segments[segments.length - 1].endTime).toBe(332.5);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN.segments;
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
    const segments = LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN.segments;
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
    const quiz = QUIZ_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN;
    expect(quiz.lessonId).toBe("mov_insp_03");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);
    expect(quiz.xpReward).toBe(100);

    for (const q of quiz.questions) {
      expect(q.id).toMatch(/^mov_insp_03_q\d+$/);
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
        LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN.segments.length
      );
    }
  });

  it("Test 6: Zero Missing Attributes & Schema Adherence", () => {
    const lesson = LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN;
    expect(lesson.description).toBeDefined();
    expect(lesson.description.length).toBeGreaterThan(30);
    expect(lesson.wpmSpeed).toBeGreaterThan(100);
    expect(lesson.studyCount).toBeGreaterThan(0);
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
  });

  it("Test 7: Thematic & Key Moments Vocabulary Coverage", () => {
    const segments = LESSON_DEAD_POETS_SOCIETY_CARPE_DIEM_CAPTAIN.segments;
    const allText = segments.map((s) => s.text).join(" ");

    expect(allText).toContain("Gentlemen, open your text to page 21");
    expect(allText).toContain("Understanding Poetry");
    expect(allText).toContain("Pritchard");
    expect(allText).toContain("meter, rhyme, and figures of speech");
    expect(allText).toContain("plotted on the horizontal of a graph");
    expect(allText).toContain("plotted on the vertical");
    expect(allText).toContain("total area of the poem yields the measure of its greatness");
    expect(allText).toContain("sonnet by Byron");
    expect(allText).toContain("Shakespearean sonnet");
    expect(allText).toContain("Excrement!");
    expect(allText).toContain("We're not laying pipe! We're talking about poetry");
    expect(allText).toContain("American Bandstand");
    expect(allText).toContain("rip out that page");
    expect(allText).toContain("tear out the entire introduction");
    expect(allText).toContain("Is that the Bible? You're not going to go to hell for this!");
    expect(allText).toContain("Mr. McAllister");
    expect(allText).toContain("battle, a war, and the casualties could be your hearts and souls");
    expect(allText).toContain("words and ideas can change the world");
    expect(allText).toContain("Huddle up!");
    expect(allText).toContain("human race is filled with passion");
    expect(allText).toContain("Medicine, law, business, engineering, these are noble pursuits and necessary to sustain life");
    expect(allText).toContain("poetry, beauty, romance, love, these are what we stay alive for");
    expect(allText).toContain("Whitman");
    expect(allText).toContain("O me! O life!");
    expect(allText).toContain("powerful play goes on, and you may contribute a verse");
    expect(allText).toContain("What will your verse be?");
  });
});
