import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_BBC_FOOD_MOOD } from "@/features/listening/data/lessons/lesson_bbc_food_mood";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("BBC Learning English: Food and Mood - 100% Verbatim Audit", () => {
  it("should have exactly 10 segments with valid duration and metadata", () => {
    expect(LESSON_BBC_FOOD_MOOD.segments.length).toBe(10);
    expect(LESSON_BBC_FOOD_MOOD.externalId).toBe("8K8s9U8_i50");
    expect(LESSON_BBC_FOOD_MOOD.durationSeconds).toBe(66);
    expect(LESSON_BBC_FOOD_MOOD.cefrLevel).toBe("B1");
    expect(LESSON_BBC_FOOD_MOOD.accent).toBe("en-GB");
    expect(LESSON_BBC_FOOD_MOOD.categoryId).toBe("cat_bbc_6min");
  });

  it("should have chronological timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_BBC_FOOD_MOOD.segments.length; i++) {
      const seg = LESSON_BBC_FOOD_MOOD.segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, valid IPA, and rich pedagogical metadata", () => {
    for (const seg of LESSON_BBC_FOOD_MOOD.segments) {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.keywords!.length).toBeGreaterThan(0);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
    }
  });

  it("should tokenize all 10 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_BBC_FOOD_MOOD.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBe(142);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 10 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "8K8s9U8_i50");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(10);
    for (let i = 0; i < 10; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_BBC_FOOD_MOOD.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_BBC_FOOD_MOOD.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_BBC_FOOD_MOOD.segments[i].endTime);
    }
  });

  it("should have comprehensive bilingual reading quiz attached", () => {
    expect(LESSON_BBC_FOOD_MOOD.quiz).toBeDefined();
    const quiz = LESSON_BBC_FOOD_MOOD.quiz!;
    expect(quiz.lessonId).toBe("vid_bbc_food_and_mood");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.xpReward).toBe(40);
    expect(quiz.questions.length).toBe(8);

    for (const q of quiz.questions) {
      expect(q.id.length).toBeGreaterThan(0);
      expect(q.questionEn).toBeDefined();
      expect(q.questionVi).toBeDefined();
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi!.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationVi).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(q.referenceSegmentIndex).toBeDefined();
    }
  });
});
