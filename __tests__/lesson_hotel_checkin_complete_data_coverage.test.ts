import { describe, it, expect } from "vitest";
import { LESSON_HOTEL_CHECKIN } from "@/features/listening/data/lessons/lesson_hotel_checkin";

describe("English for Travel: Hotel Check-in & Guest Services - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for Hotel Check-in lesson", () => {
    expect(LESSON_HOTEL_CHECKIN.id).toBe("vid_travel_hotel_checkin");
    expect(LESSON_HOTEL_CHECKIN.externalId).toBe("wyqfYJX23lg");
    expect(LESSON_HOTEL_CHECKIN.slug).toBe("english-travel-hotel-checkin-guest-services");
    expect(LESSON_HOTEL_CHECKIN.categoryId).toBe("cat_daily_conv");
    expect(LESSON_HOTEL_CHECKIN.durationSeconds).toBe(158);
    expect(LESSON_HOTEL_CHECKIN.durationFormatted).toBe("02:38");
    expect(LESSON_HOTEL_CHECKIN.cefrLevel).toBe("A2");
    expect(LESSON_HOTEL_CHECKIN.accent).toBe("en-US");
  });

  it("should have exactly 37 master segments with complete fields and 1-indexed orderIndex", () => {
    expect(LESSON_HOTEL_CHECKIN.segments).toBeDefined();
    expect(LESSON_HOTEL_CHECKIN.segments.length).toBe(37);

    for (let i = 0; i < LESSON_HOTEL_CHECKIN.segments.length; i++) {
      const seg = LESSON_HOTEL_CHECKIN.segments[i];
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

  it("should maintain chronological continuity across all 37 segments", () => {
    const segments = LESSON_HOTEL_CHECKIN.segments;
    let prevStartTime = -1;
    for (let i = 0; i < segments.length; i++) {
      const curr = segments[i];
      expect(curr.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = curr.startTime;
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_HOTEL_CHECKIN.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_HOTEL_CHECKIN.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_hotel_checkin_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(37);
    }
  });

  it("should cover key hotel hospitality terminology across segments", () => {
    const allText = LESSON_HOTEL_CHECKIN.segments.map((s) => s.text.toLowerCase()).join(" ");
    expect(allText).toContain("transnational hotel");
    expect(allText).toContain("reservation");
    expect(allText).toContain("deposit");
    expect(allText).toContain("booking system");
    expect(allText).toContain("single rooms");
    expect(allText).toContain("business suites");
    expect(allText).toContain("jacuzzi");
    expect(allText).toContain("no extra charge");
    expect(allText).toContain("wireless internet");
    expect(allText).toContain("amenities");
    expect(allText).toContain("valet");
    expect(allText).toContain("san francisco");
    expect(allText).toContain("big apple");
    expect(allText).toContain("room 653");
    expect(allText).toContain("sixth floor");
    expect(allText).toContain("bell boy");
  });
});
