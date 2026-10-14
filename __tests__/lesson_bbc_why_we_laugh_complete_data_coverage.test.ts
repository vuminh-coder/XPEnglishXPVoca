import { describe, it, expect } from "vitest";
import { LESSON_BBC_WHY_WE_LAUGH } from "@/features/listening/data/lessons/lesson_bbc_why_we_laugh";

describe("BBC 6 Minute English: Why Laughter is the Best Medicine - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for BBC Why We Laugh lesson", () => {
    expect(LESSON_BBC_WHY_WE_LAUGH.id).toBe("vid_bbc_why_we_laugh");
    expect(LESSON_BBC_WHY_WE_LAUGH.externalId).toBe("Fez57g8jMNM");
    expect(LESSON_BBC_WHY_WE_LAUGH.slug).toBe("bbc-6-minute-why-laughter-is-the-best-medicine");
    expect(LESSON_BBC_WHY_WE_LAUGH.categoryId).toBe("cat_bbc_6min");
    expect(LESSON_BBC_WHY_WE_LAUGH.durationSeconds).toBe(380);
    expect(LESSON_BBC_WHY_WE_LAUGH.cefrLevel).toBe("B1");
    expect(LESSON_BBC_WHY_WE_LAUGH.accent).toBe("en-GB");
  });

  it("should have exactly 69 master segments with complete fields and 1-indexed orderIndex", () => {
    expect(LESSON_BBC_WHY_WE_LAUGH.segments).toBeDefined();
    expect(LESSON_BBC_WHY_WE_LAUGH.segments.length).toBe(69);

    for (let i = 0; i < LESSON_BBC_WHY_WE_LAUGH.segments.length; i++) {
      const seg = LESSON_BBC_WHY_WE_LAUGH.segments[i];
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

  it("should maintain chronological continuity and zero overlap across all 69 segments", () => {
    const segments = LESSON_BBC_WHY_WE_LAUGH.segments;
    for (let i = 1; i < segments.length; i++) {
      const prev = segments[i - 1];
      const curr = segments[i];
      expect(curr.startTime).toBeGreaterThanOrEqual(prev.endTime);
      expect(curr.orderIndex).toBe(prev.orderIndex + 1);
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_BBC_WHY_WE_LAUGH.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_BBC_WHY_WE_LAUGH.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_bbc_why_we_laugh_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(69);
    }
  });

  it("should cover key scientific concepts (rib cage, primitive, giggle, guffaw, mammals, juvenile, gelotology)", () => {
    const allText = LESSON_BBC_WHY_WE_LAUGH.segments.map((s) => s.text.toLowerCase()).join(" ");
    expect(allText).toContain("rib cage");
    expect(allText).toContain("primitive");
    expect(allText).toContain("giggle");
    expect(allText).toContain("guffaw");
    expect(allText).toContain("mammals");
    expect(allText).toContain("juvenile");
    expect(allText).toContain("gelotology");
  });

  it("should ensure zero speaker prefix and zero character colon prefixes in all texts", () => {
    for (const seg of LESSON_BBC_WHY_WE_LAUGH.segments) {
      expect(seg.text).not.toMatch(/^(Sam|Neil|Sophie Scott|Professor Scott):/i);
      expect(seg.text).not.toContain("\n");
      expect(seg.text).not.toMatch(/^\s*-\s+/);
    }
  });

  it("should verify valid IPA format without illegal punctuations", () => {
    for (const seg of LESSON_BBC_WHY_WE_LAUGH.segments) {
      const inner = seg.ipaUs!.slice(1, -1);
      expect(inner).not.toMatch(/[.,?!:;]/);
    }
  });
});
