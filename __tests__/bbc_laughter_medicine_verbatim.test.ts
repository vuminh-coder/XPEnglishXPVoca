import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_BBC_LAUGHTER_MEDICINE } from "@/features/listening/data/lessons/lesson_bbc_laughter_medicine";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("BBC Learning English: What Makes Us Laugh? - 100% Verbatim Audit", () => {
  it("should have exactly 84 segments with valid duration and metadata", () => {
    expect(LESSON_BBC_LAUGHTER_MEDICINE.segments.length).toBe(84);
    expect(LESSON_BBC_LAUGHTER_MEDICINE.externalId).toBe("jIt35Ey2GN4");
    expect(LESSON_BBC_LAUGHTER_MEDICINE.durationSeconds).toBe(376);
    expect(LESSON_BBC_LAUGHTER_MEDICINE.cefrLevel).toBe("B1");
    expect(LESSON_BBC_LAUGHTER_MEDICINE.accent).toBe("en-GB");
    expect(LESSON_BBC_LAUGHTER_MEDICINE.categoryId).toBe("cat_bbc_6min");
  });

  it("should have chronological timestamps with positive durations and 1-based indexing", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_BBC_LAUGHTER_MEDICINE.segments.length; i++) {
      const seg = LESSON_BBC_LAUGHTER_MEDICINE.segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, valid IPA, and rich pedagogical metadata", () => {
    for (const seg of LESSON_BBC_LAUGHTER_MEDICINE.segments) {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(seg.ipaUs!.startsWith("/")).toBe(true);
      expect(seg.ipaUs!.endsWith("/")).toBe(true);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBeDefined();
      const regexTokens = (seg.text.match(/\b[A-Za-z0-9_]+\b/g) || []).length;
      expect(seg.tokenCount).toBe(regexTokens);
    }
  });

  it("should tokenize all 84 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_BBC_LAUGHTER_MEDICINE.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(800);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 84 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "jIt35Ey2GN4");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(84);
    for (let i = 0; i < 84; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_BBC_LAUGHTER_MEDICINE.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_BBC_LAUGHTER_MEDICINE.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_BBC_LAUGHTER_MEDICINE.segments[i].endTime);
    }
  });

  it("should have comprehensive bilingual reading quiz attached", () => {
    expect(LESSON_BBC_LAUGHTER_MEDICINE.quiz).toBeDefined();
    const quiz = LESSON_BBC_LAUGHTER_MEDICINE.quiz!;
    expect(quiz.lessonId).toBe("vid_bbc_laughter_medicine");
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
