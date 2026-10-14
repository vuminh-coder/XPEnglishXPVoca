import { describe, it, expect } from "vitest";
import { LESSON_NATGEO_RENEWABLE_ENERGY } from "@/features/listening/data/lessons/lesson_natgeo_renewable_energy";

describe("National Geographic: Renewable Energy 101 - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for National Geographic Renewable Energy 101", () => {
    expect(LESSON_NATGEO_RENEWABLE_ENERGY.id).toBe("vid_ielts_environmental_sustainability");
    expect(LESSON_NATGEO_RENEWABLE_ENERGY.externalId).toBe("1kUE0BZtTRc");
    expect(LESSON_NATGEO_RENEWABLE_ENERGY.slug).toBe("ielts-listening-environmental-sustainability");
    expect(LESSON_NATGEO_RENEWABLE_ENERGY.categoryId).toBe("cat_ielts_listen");
    expect(LESSON_NATGEO_RENEWABLE_ENERGY.durationSeconds).toBe(196);
    expect(LESSON_NATGEO_RENEWABLE_ENERGY.durationFormatted).toBe("03:16");
    expect(LESSON_NATGEO_RENEWABLE_ENERGY.cefrLevel).toBe("B2");
    expect(LESSON_NATGEO_RENEWABLE_ENERGY.accent).toBe("en-US");
  });

  it("should have exactly 35 master segments with complete fields and 1-indexed orderIndex", () => {
    expect(LESSON_NATGEO_RENEWABLE_ENERGY.segments).toBeDefined();
    expect(LESSON_NATGEO_RENEWABLE_ENERGY.segments.length).toBe(35);

    for (let i = 0; i < LESSON_NATGEO_RENEWABLE_ENERGY.segments.length; i++) {
      const seg = LESSON_NATGEO_RENEWABLE_ENERGY.segments[i];
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

  it("should maintain chronological continuity across all 35 segments", () => {
    const segments = LESSON_NATGEO_RENEWABLE_ENERGY.segments;
    let prevStartTime = -1;
    for (let i = 0; i < segments.length; i++) {
      const curr = segments[i];
      expect(curr.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = curr.startTime;
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_NATGEO_RENEWABLE_ENERGY.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_NATGEO_RENEWABLE_ENERGY.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_natgeo_renewable_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(35);
    }
  });

  it("should cover key thematic vocabulary across segments and quiz", () => {
    const allText = LESSON_NATGEO_RENEWABLE_ENERGY.segments.map((s) => s.text).join(" ").toLowerCase();
    expect(allText).toContain("renewable energy");
    expect(allText).toContain("fossil fuels");
    expect(allText).toContain("climate change");
    expect(allText).toContain("geothermal");
    expect(allText).toContain("biomass");
    expect(allText).toContain("hydroelectric");
    expect(allText).toContain("intermittent");
    expect(allText).toContain("greenhouse gas emissions");
    expect(allText).toContain("accessible");
    expect(allText).toContain("affordable");
    expect(allText).toContain("efficient");
    expect(allText).toContain("national geographic");
  });
});
