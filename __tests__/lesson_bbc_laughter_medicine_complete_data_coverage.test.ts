import { describe, it, expect } from "vitest";
import { LESSON_BBC_LAUGHTER_MEDICINE } from "@/features/listening/data/lessons/lesson_bbc_laughter_medicine";

describe("BBC Learning English: What Makes Us Laugh? - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for BBC What Makes Us Laugh lesson", () => {
    expect(LESSON_BBC_LAUGHTER_MEDICINE.id).toBe("vid_bbc_laughter_medicine");
    expect(LESSON_BBC_LAUGHTER_MEDICINE.externalId).toBe("jIt35Ey2GN4");
    expect(LESSON_BBC_LAUGHTER_MEDICINE.slug).toBe("bbc-learning-english-is-laughter-the-best-medicine");
    expect(LESSON_BBC_LAUGHTER_MEDICINE.categoryId).toBe("cat_bbc_6min");
    expect(LESSON_BBC_LAUGHTER_MEDICINE.durationSeconds).toBe(376);
    expect(LESSON_BBC_LAUGHTER_MEDICINE.cefrLevel).toBe("B1");
    expect(LESSON_BBC_LAUGHTER_MEDICINE.accent).toBe("en-GB");
  });

  it("should have exactly 84 master segments with complete fields and 1-indexed orderIndex", () => {
    expect(LESSON_BBC_LAUGHTER_MEDICINE.segments).toBeDefined();
    expect(LESSON_BBC_LAUGHTER_MEDICINE.segments.length).toBe(84);

    for (let i = 0; i < LESSON_BBC_LAUGHTER_MEDICINE.segments.length; i++) {
      const seg = LESSON_BBC_LAUGHTER_MEDICINE.segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.text.trim().length).toBeGreaterThan(0);
      expect(seg.translationVi.trim().length).toBeGreaterThan(0);
      expect(seg.explanationAi?.trim().length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs?.startsWith("/")).toBe(true);
      expect(seg.ipaUs?.endsWith("/")).toBe(true);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.keywords!.length).toBeGreaterThanOrEqual(1);
      expect(seg.properNouns).toBeDefined();
      expect(seg.tokenCount).toBeDefined();
      expect(seg.tokenCount).toBeGreaterThan(0);

      // Verify tokenCount matches regex JS exactly
      const regexTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(regexTokens);
    }
  });

  it("should maintain chronological continuity across all 84 segments", () => {
    const segments = LESSON_BBC_LAUGHTER_MEDICINE.segments;
    let prevStartTime = -1;
    for (let i = 0; i < segments.length; i++) {
      const curr = segments[i];
      expect(curr.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = curr.startTime;
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_BBC_LAUGHTER_MEDICINE.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_BBC_LAUGHTER_MEDICINE.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_bbc_laughter_med_${i + 1}`);
      expect(q.questionEn?.length).toBeGreaterThan(15);
      expect(q.questionVi?.length).toBeGreaterThan(15);
      expect(q.options.length).toBe(4);
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanationEn?.length).toBeGreaterThan(20);
      expect(q.explanationVi?.length).toBeGreaterThan(20);
      expect(q.targetedConceptEn?.length).toBeGreaterThan(5);
      expect(q.targetedConceptVi?.length).toBeGreaterThan(5);
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
    }
  });

  it("should cover key thematic vocabulary across segments and quiz", () => {
    const allText = LESSON_BBC_LAUGHTER_MEDICINE.segments.map((s) => s.text).join(" ").toLowerCase();
    expect(allText).toContain("juan direction");
    expect(allText).toContain("gag");
    expect(allText).toContain("gelotology");
    expect(allText).toContain("stand-up comedy");
    expect(allText).toContain("narcissistic");
    expect(allText).toContain("aspiring");
    expect(allText).toContain("perseverance");
    expect(allText).toContain("outwork");
    expect(allText).toContain("introverts");
    expect(allText).toContain("extroverts");
  });
});
