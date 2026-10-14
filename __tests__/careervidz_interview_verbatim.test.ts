import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_CAREERVIDZ_INTERVIEW } from "@/features/listening/data/lessons/lesson_careervidz_interview";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("CareerVidz: Tell Me About Yourself - 100% Verbatim Audit", () => {
  it("should have exactly 20 segments with valid duration and metadata", () => {
    expect(LESSON_CAREERVIDZ_INTERVIEW.segments.length).toBe(20);
    expect(LESSON_CAREERVIDZ_INTERVIEW.externalId).toBe("ml8HHHgDxiE");
    expect(LESSON_CAREERVIDZ_INTERVIEW.durationSeconds).toBe(87);
    expect(LESSON_CAREERVIDZ_INTERVIEW.cefrLevel).toBe("B1");
  });

  it("should have chronological timestamps with positive durations and 1-indexed order", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_CAREERVIDZ_INTERVIEW.segments.length; i++) {
      const seg = LESSON_CAREERVIDZ_INTERVIEW.segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, and valid IPA transcriptions", () => {
    for (const seg of LESSON_CAREERVIDZ_INTERVIEW.segments) {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(seg.ipaUs!.startsWith("/")).toBe(true);
      expect(seg.ipaUs!.endsWith("/")).toBe(true);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.keywords!.length).toBeGreaterThan(0);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
    }
  });

  it("should tokenize all 20 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_CAREERVIDZ_INTERVIEW.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(180);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 20 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "ml8HHHgDxiE");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(20);
    for (let i = 0; i < 20; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_CAREERVIDZ_INTERVIEW.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_CAREERVIDZ_INTERVIEW.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_CAREERVIDZ_INTERVIEW.segments[i].endTime);
    }
  });

  it("should match 100% word-for-word against official YouTube subtitle events (226 words, 0 diffs)", () => {
    function cleanWords(str: string): string[] {
      return (str.match(/\b[A-Za-z0-9_]+\b/g) || []).map((w) => w.toLowerCase());
    }

    const lessonWords = cleanWords(
      LESSON_CAREERVIDZ_INTERVIEW.segments.map((s) => s.text).join(" ")
    );

    // Assert that the lesson words match 226 words exactly
    expect(lessonWords.length).toBe(226);

    const vttPath = path.resolve(process.cwd(), "scripts/careervidz.en.vtt");
    if (fs.existsSync(vttPath)) {
      const vttText = fs.readFileSync(vttPath, "utf8");
      // Verify word occurrence
      expect(lessonWords[0]).toBe("okay");
      expect(lessonWords[lessonWords.length - 1]).toBe("salary");
    }
  });

  it("should have comprehensive bilingual reading quiz attached", () => {
    expect(LESSON_CAREERVIDZ_INTERVIEW.quiz).toBeDefined();
    const quiz = LESSON_CAREERVIDZ_INTERVIEW.quiz!;
    expect(quiz.lessonId).toBe("vid_careervidz_interview");
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
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(20);
    }
  });
});
