import { describe, it, expect } from "vitest";
import { LESSON_AIRPORT_CHECKIN } from "@/features/listening/data/lessons/lesson_airport_checkin";

describe("English for Travel: Checking in at the Airport - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for Airport Check-in lesson", () => {
    expect(LESSON_AIRPORT_CHECKIN.id).toBe("vid_airport_checkin");
    expect(LESSON_AIRPORT_CHECKIN.externalId).toBe("bIz2Gzu3DKE");
    expect(LESSON_AIRPORT_CHECKIN.slug).toBe("daily-english-airport-check-in");
    expect(LESSON_AIRPORT_CHECKIN.categoryId).toBe("cat_daily_conv");
    expect(LESSON_AIRPORT_CHECKIN.durationSeconds).toBe(60);
    expect(LESSON_AIRPORT_CHECKIN.durationFormatted).toBe("01:00");
    expect(LESSON_AIRPORT_CHECKIN.cefrLevel).toBe("A2");
    expect(LESSON_AIRPORT_CHECKIN.accent).toBe("en-US");
  });

  it("should have exactly 16 master segments with complete fields and 1-indexed orderIndex", () => {
    expect(LESSON_AIRPORT_CHECKIN.segments).toBeDefined();
    expect(LESSON_AIRPORT_CHECKIN.segments.length).toBe(16);

    for (let i = 0; i < LESSON_AIRPORT_CHECKIN.segments.length; i++) {
      const seg = LESSON_AIRPORT_CHECKIN.segments[i];
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

  it("should maintain contiguous, non-overlapping timestamps across all 16 segments", () => {
    const segments = LESSON_AIRPORT_CHECKIN.segments;
    for (let i = 0; i < segments.length; i++) {
      const curr = segments[i];
      expect(curr.endTime).toBeGreaterThan(curr.startTime);
      if (i > 0) {
        expect(curr.startTime).toBe(segments[i - 1].endTime);
      }
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_AIRPORT_CHECKIN.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_AIRPORT_CHECKIN.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_airport_checkin_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(16);
    }
  });

  it("should cover key aviation and travel terminology across segments", () => {
    const allText = LESSON_AIRPORT_CHECKIN.segments.map((s) => s.text.toLowerCase()).join(" ");
    expect(allText).toContain("boarding");
    expect(allText).toContain("ticket");
    expect(allText).toContain("passport");
    expect(allText).toContain("traveling alone");
    expect(allText).toContain("scale");
    expect(allText).toContain("window");
    expect(allText).toContain("aisle seat");
    expect(allText).toContain("gate 17b");
    expect(allText).toContain("departure time");
  });
});
