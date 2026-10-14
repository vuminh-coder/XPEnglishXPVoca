import { describe, it, expect } from "vitest";
import { LESSON_CAREERVIDZ_INTERVIEW } from "@/features/listening/data/lessons/lesson_careervidz_interview";

describe("CareerVidz: Tell Me About Yourself - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for CareerVidz lesson", () => {
    expect(LESSON_CAREERVIDZ_INTERVIEW.id).toBe("vid_careervidz_interview");
    expect(LESSON_CAREERVIDZ_INTERVIEW.externalId).toBe("ml8HHHgDxiE");
    expect(LESSON_CAREERVIDZ_INTERVIEW.slug).toBe("careervidz-tell-me-about-yourself");
    expect(LESSON_CAREERVIDZ_INTERVIEW.categoryId).toBe("cat_career_business");
    expect(LESSON_CAREERVIDZ_INTERVIEW.durationSeconds).toBe(87);
    expect(LESSON_CAREERVIDZ_INTERVIEW.durationFormatted).toBe("01:27");
    expect(LESSON_CAREERVIDZ_INTERVIEW.cefrLevel).toBe("B1");
    expect(LESSON_CAREERVIDZ_INTERVIEW.accent).toBe("en-GB");
  });

  it("should have exactly 20 master segments with complete fields and 1-indexed orderIndex", () => {
    expect(LESSON_CAREERVIDZ_INTERVIEW.segments).toBeDefined();
    expect(LESSON_CAREERVIDZ_INTERVIEW.segments.length).toBe(20);

    for (let i = 0; i < LESSON_CAREERVIDZ_INTERVIEW.segments.length; i++) {
      const seg = LESSON_CAREERVIDZ_INTERVIEW.segments[i];
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

  it("should maintain chronological continuity across all 20 segments", () => {
    const segments = LESSON_CAREERVIDZ_INTERVIEW.segments;
    let prevStartTime = -1;
    for (let i = 0; i < segments.length; i++) {
      const curr = segments[i];
      expect(curr.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = curr.startTime;
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_CAREERVIDZ_INTERVIEW.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_CAREERVIDZ_INTERVIEW.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_careervidz_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(20);
    }
  });

  it("should cover key interview coaching terminology across segments", () => {
    const allText = LESSON_CAREERVIDZ_INTERVIEW.segments.map((s) => s.text.toLowerCase()).join(" ");
    expect(allText).toContain("job interview");
    expect(allText).toContain("tell me about yourself");
    expect(allText).toContain("get hired");
    expect(allText).toContain("skills");
    expect(allText).toContain("experience");
    expect(allText).toContain("achievements");
    expect(allText).toContain("add value");
    expect(allText).toContain("team player");
    expect(allText).toContain("job description");
    expect(allText).toContain("customer service");
    expect(allText).toContain("work ethic");
    expect(allText).toContain("return on my salary");
  });
});
