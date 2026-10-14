import { describe, it, expect } from "vitest";
import { LESSON_BUSINESS_PHONE_CALL } from "@/features/listening/data/lessons/lesson_business_phone_call";

describe("Business English: Professional Phone Calls & Telephone Etiquette - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for Business Phone Call lesson", () => {
    expect(LESSON_BUSINESS_PHONE_CALL.id).toBe("vid_business_phone_call");
    expect(LESSON_BUSINESS_PHONE_CALL.externalId).toBe("Tw2r9DkL5co");
    expect(LESSON_BUSINESS_PHONE_CALL.slug).toBe("business-english-professional-phone-calls-etiquette");
    expect(LESSON_BUSINESS_PHONE_CALL.categoryId).toBe("cat_toeic_listen");
    expect(LESSON_BUSINESS_PHONE_CALL.durationSeconds).toBe(79);
    expect(LESSON_BUSINESS_PHONE_CALL.durationFormatted).toBe("01:19");
    expect(LESSON_BUSINESS_PHONE_CALL.cefrLevel).toBe("B1");
    expect(LESSON_BUSINESS_PHONE_CALL.accent).toBe("en-GB");
  });

  it("should have exactly 22 master segments with complete fields and 1-indexed orderIndex", () => {
    expect(LESSON_BUSINESS_PHONE_CALL.segments).toBeDefined();
    expect(LESSON_BUSINESS_PHONE_CALL.segments.length).toBe(22);

    for (let i = 0; i < LESSON_BUSINESS_PHONE_CALL.segments.length; i++) {
      const seg = LESSON_BUSINESS_PHONE_CALL.segments[i];
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

  it("should maintain chronological continuity across all 22 segments", () => {
    const segments = LESSON_BUSINESS_PHONE_CALL.segments;
    let prevStartTime = -1;
    for (let i = 0; i < segments.length; i++) {
      const curr = segments[i];
      expect(curr.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = curr.startTime;
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_BUSINESS_PHONE_CALL.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_BUSINESS_PHONE_CALL.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_business_phone_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(22);
    }
  });

  it("should cover key thematic British business phone vocabulary across segments", () => {
    const allText = LESSON_BUSINESS_PHONE_CALL.segments.map((s) => s.text.toLowerCase()).join(" ");
    expect(allText).toContain("chic boutique");
    expect(allText).toContain("morgan");
    expect(allText).toContain("wright");
    expect(allText).toContain("international fashion supplies");
    expect(allText).toContain("engaged");
    expect(allText).toContain("shipment");
    expect(allText).toContain("dresses");
  });
});
