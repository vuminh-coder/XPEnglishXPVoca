import { describe, it, expect } from "vitest";
import { LESSON_JENSEN_HUANG } from "@/features/listening/data/lessons/lesson_jensen_huang";

describe("Jensen Huang: How Elon Musk Built the World's Fastest Supercomputer - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for Jensen Huang Supercomputer lesson", () => {
    expect(LESSON_JENSEN_HUANG.id).toBe("1481dc60-fe8a-4fa9-830b-9a227ede9b6e");
    expect(LESSON_JENSEN_HUANG.externalId).toBe("lpLFjQ-bRv8");
    expect(LESSON_JENSEN_HUANG.slug).toBe("jensen-huang-elon-musk-supercomputer");
    expect(LESSON_JENSEN_HUANG.categoryId).toBe("cat_science_tech");
    expect(LESSON_JENSEN_HUANG.durationSeconds).toBe(109);
    expect(LESSON_JENSEN_HUANG.durationFormatted).toBe("01:49");
    expect(LESSON_JENSEN_HUANG.cefrLevel).toBe("B2");
    expect(LESSON_JENSEN_HUANG.accent).toBe("en-US");
  });

  it("should have exactly 31 master segments with complete fields and 1-indexed orderIndex", () => {
    expect(LESSON_JENSEN_HUANG.segments).toBeDefined();
    expect(LESSON_JENSEN_HUANG.segments.length).toBe(31);

    for (let i = 0; i < LESSON_JENSEN_HUANG.segments.length; i++) {
      const seg = LESSON_JENSEN_HUANG.segments[i];
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
      expect(seg.properNouns).toBeDefined();
      expect(seg.tokenCount).toBeDefined();
      expect(seg.tokenCount).toBeGreaterThan(0);

      // Verify tokenCount matches regex JS exactly
      const regexTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(regexTokens);
    }
  });

  it("should maintain chronological continuity across all 31 segments", () => {
    const segments = LESSON_JENSEN_HUANG.segments;
    let prevStartTime = -1;
    for (let i = 0; i < segments.length; i++) {
      const curr = segments[i];
      expect(curr.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = curr.startTime;
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_JENSEN_HUANG.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_JENSEN_HUANG.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_jensen_huang_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(31);
    }
  });

  it("should cover key thematic engineering vocabulary across segments", () => {
    const allText = LESSON_JENSEN_HUANG.segments.map((s) => s.text.toLowerCase()).join(" ");
    expect(allText).toContain("supercomputer");
    expect(allText).toContain("liquid-cooled");
    expect(allText).toContain("singular");
    expect(allText).toContain("infrastructure");
    expect(allText).toContain("cluster");
    expect(allText).toContain("gpus");
  });
});
