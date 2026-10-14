import { describe, it, expect } from "vitest";
import { LESSON_BBC_SUNKEN_SHIP } from "@/features/listening/data/lessons/lesson_bbc_sunken_ship";

describe("BBC Learning English: Sunken Ship - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for BBC Sunken Ship lesson", () => {
    expect(LESSON_BBC_SUNKEN_SHIP.id).toBe("e4476093-9f0c-4620-a7f3-345d0e6b64db");
    expect(LESSON_BBC_SUNKEN_SHIP.externalId).toBe("doOlP7NLUwc");
    expect(LESSON_BBC_SUNKEN_SHIP.slug).toBe("bbc-6min-brain-boost");
    expect(LESSON_BBC_SUNKEN_SHIP.categoryId).toBe("cat_bbc_6min");
    expect(LESSON_BBC_SUNKEN_SHIP.durationSeconds).toBe(434);
    expect(LESSON_BBC_SUNKEN_SHIP.cefrLevel).toBe("B1");
    expect(LESSON_BBC_SUNKEN_SHIP.accent).toBe("en-GB");
  });

  it("should have exactly 84 master segments with complete fields", () => {
    expect(LESSON_BBC_SUNKEN_SHIP.segments).toBeDefined();
    expect(LESSON_BBC_SUNKEN_SHIP.segments.length).toBe(84);

    for (let i = 0; i < LESSON_BBC_SUNKEN_SHIP.segments.length; i++) {
      const seg = LESSON_BBC_SUNKEN_SHIP.segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.text.trim().length).toBeGreaterThan(0);
      expect(seg.normalizedText?.trim().length).toBeGreaterThan(0);
      expect(seg.translationVi.trim().length).toBeGreaterThan(0);
      expect(seg.explanationAi?.trim().length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs?.startsWith("/")).toBe(true);
      expect(seg.ipaUs?.endsWith("/")).toBe(true);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords?.length).toBeGreaterThan(0);
      expect(seg.properNouns).toBeDefined();
      expect(seg.tokenCount).toBeDefined();
      expect(seg.tokenCount).toBeGreaterThan(0);

      // Verify tokenCount matches regex JS exactly
      const regexTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(regexTokens);
    }
  });

  it("should maintain chronological continuity and zero overlap across all 84 segments", () => {
    const segments = LESSON_BBC_SUNKEN_SHIP.segments;
    for (let i = 1; i < segments.length; i++) {
      const prev = segments[i - 1];
      const curr = segments[i];
      expect(curr.startTime).toBeGreaterThanOrEqual(prev.endTime);
      expect(curr.orderIndex).toBe(prev.orderIndex + 1);
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_BBC_SUNKEN_SHIP.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_BBC_SUNKEN_SHIP.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_bbc_sunken_ship_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(84);
    }
  });

  it("should cover all 3 headline vocabularies (wrecked, holy grail, legendary) in segments and quiz", () => {
    const allText = LESSON_BBC_SUNKEN_SHIP.segments.map((s) => s.text.toLowerCase()).join(" ");
    expect(allText).toContain("wrecked");
    expect(allText).toContain("holy grail");
    expect(allText).toContain("legendary");

    const quizConcepts = LESSON_BBC_SUNKEN_SHIP.quiz?.questions.map((q) => q.targetedConceptEn).join(" ");
    expect(quizConcepts).toContain("Wrecked");
    expect(quizConcepts).toContain("Holy Grail");
    expect(quizConcepts).toContain("Legendary");
  });

  it("should ensure zero speaker prefix and zero character colon prefixes in all texts", () => {
    for (const seg of LESSON_BBC_SUNKEN_SHIP.segments) {
      expect(seg.text).not.toMatch(/^(Georgie|Phil|News Reader|Voiceover):/i);
      expect(seg.text).not.toContain("\n");
      expect(seg.text).not.toMatch(/^\s*-\s+/);
    }
  });

  it("should verify valid IPA format without illegal punctuations", () => {
    for (const seg of LESSON_BBC_SUNKEN_SHIP.segments) {
      const inner = seg.ipaUs!.slice(1, -1);
      expect(inner).not.toMatch(/[.,?!:;]/);
    }
  });
});
