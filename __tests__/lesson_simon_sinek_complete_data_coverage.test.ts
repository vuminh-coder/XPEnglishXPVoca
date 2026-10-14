import { describe, it, expect } from "vitest";
import { LESSON_SIMON_SINEK } from "@/features/listening/data/lessons/lesson_simon_sinek";

describe("Simon Sinek: How Great Leaders Inspire Action - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for Simon Sinek Golden Circle lesson", () => {
    expect(LESSON_SIMON_SINEK.id).toBe("vid_simon_sinek_golden_circle");
    expect(LESSON_SIMON_SINEK.externalId).toBe("qp0HIF3SfI4");
    expect(LESSON_SIMON_SINEK.slug).toBe("simon-sinek-how-great-leaders-inspire-action");
    expect(LESSON_SIMON_SINEK.categoryId).toBe("cat_ielts_listen");
    expect(LESSON_SIMON_SINEK.durationSeconds).toBe(350);
    expect(LESSON_SIMON_SINEK.durationFormatted).toBe("05:50");
    expect(LESSON_SIMON_SINEK.cefrLevel).toBe("B2");
    expect(LESSON_SIMON_SINEK.accent).toBe("en-US");
  });

  it("should have exactly 72 master segments with complete fields and 1-indexed orderIndex", () => {
    expect(LESSON_SIMON_SINEK.segments).toBeDefined();
    expect(LESSON_SIMON_SINEK.segments.length).toBe(72);

    for (let i = 0; i < LESSON_SIMON_SINEK.segments.length; i++) {
      const seg = LESSON_SIMON_SINEK.segments[i];
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

  it("should maintain chronological continuity across all 72 segments", () => {
    const segments = LESSON_SIMON_SINEK.segments;
    let prevStartTime = -1;
    for (let i = 0; i < segments.length; i++) {
      const curr = segments[i];
      expect(curr.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = curr.startTime;
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_SIMON_SINEK.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_SIMON_SINEK.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_simon_sinek_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(72);
    }
  });

  it("should cover key thematic vocabulary across segments and quiz", () => {
    const allText = LESSON_SIMON_SINEK.segments.map((s) => s.text).join(" ").toLowerCase();
    expect(allText).toContain("golden circle");
    expect(allText).toContain("apple");
    expect(allText).toContain("martin luther king");
    expect(allText).toContain("wright brothers");
    expect(allText).toContain("status quo");
    expect(allText).toContain("innovative");
    expect(allText).toContain("gateway");
    expect(allText).toContain("dell");
    expect(allText).toContain("people don't buy what you do");
    expect(allText).toContain("they buy why you do it");
  });
});
