import { describe, it, expect } from "vitest";
import { LESSON_OXFORD_MEETING } from "@/features/listening/data/lessons/lesson_oxford_meeting";

describe("Oxford Online English: Attending a Meeting in English - Complete Data Coverage Test Suite", () => {
  it("should have correct metadata for Oxford Meeting lesson", () => {
    expect(LESSON_OXFORD_MEETING.id).toBe("vid_oxford_business_meeting");
    expect(LESSON_OXFORD_MEETING.externalId).toBe("NEKZFA7L7Lg");
    expect(LESSON_OXFORD_MEETING.slug).toBe("oxford-attending-a-meeting-in-english");
    expect(LESSON_OXFORD_MEETING.categoryId).toBe("cat_toeic_listen");
    expect(LESSON_OXFORD_MEETING.durationSeconds).toBe(102);
    expect(LESSON_OXFORD_MEETING.durationFormatted).toBe("01:42");
    expect(LESSON_OXFORD_MEETING.cefrLevel).toBe("B1");
    expect(LESSON_OXFORD_MEETING.accent).toBe("en-GB");
  });

  it("should have exactly 15 master segments with complete fields and 1-indexed orderIndex", () => {
    expect(LESSON_OXFORD_MEETING.segments).toBeDefined();
    expect(LESSON_OXFORD_MEETING.segments.length).toBe(15);

    for (let i = 0; i < LESSON_OXFORD_MEETING.segments.length; i++) {
      const seg = LESSON_OXFORD_MEETING.segments[i];
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

  it("should maintain chronological continuity across all 15 segments", () => {
    const segments = LESSON_OXFORD_MEETING.segments;
    let prevStartTime = -1;
    for (let i = 0; i < segments.length; i++) {
      const curr = segments[i];
      expect(curr.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = curr.startTime;
    }
  });

  it("should have an attached bilingual reading comprehension quiz with 8 questions", () => {
    const quiz = LESSON_OXFORD_MEETING.quiz;
    expect(quiz).toBeDefined();
    expect(quiz?.lessonId).toBe(LESSON_OXFORD_MEETING.id);
    expect(quiz?.totalQuestions).toBe(8);
    expect(quiz?.xpReward).toBe(40);
    expect(quiz?.questions.length).toBe(8);

    for (let i = 0; i < quiz!.questions.length; i++) {
      const q = quiz!.questions[i];
      expect(q.id).toBe(`q_oxford_meeting_${i + 1}`);
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
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(15);
    }
  });

  it("should cover key thematic British meeting and negotiation vocabulary across segments", () => {
    const allText = LESSON_OXFORD_MEETING.segments.map((s) => s.text.toLowerCase()).join(" ");
    expect(allText).toContain("meeting will begin");
    expect(allText).toContain("agenda items");
    expect(allText).toContain("suggestions");
    expect(allText).toContain("modal verbs");
    expect(allText).toContain("ought to");
    expect(allText).toContain("priority");
    expect(allText).toContain("obligation");
    expect(allText).toContain("budget is very tight");
  });
});
