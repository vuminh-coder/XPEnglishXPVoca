import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import {
  LESSON_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE,
  QUIZ_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE,
} from "@/features/listening/data/lessons/movies/romance/lesson_about_time";

describe("Senior Deep Audit: About Time - Tim Learns Secret of Happiness from Dad (100% Video Sync)", () => {
  it("should have valid lesson metadata and YouTube external ID matching iUB-sCiZIUw", () => {
    const lesson = LESSON_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE;
    expect(lesson.id).toBe("mov_rom_01");
    expect(lesson.slug).toBe("about-time-extraordinary-ordinary-life");
    expect(lesson.externalId).toBe("iUB-sCiZIUw");
    expect(lesson.durationSeconds).toBe(323);
    expect(lesson.durationFormatted).toBe("05:23");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toContain("British");
    expect(lesson.categoryId).toBe("cat_romance_cinema");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("iUB-sCiZIUw");
  });

  it("should contain 83 high-fidelity chronological pure segments matching video iUB-sCiZIUw audio", () => {
    const { segments } = LESSON_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE;
    expect(segments.length).toBe(83);

    let prevStart = -1;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStart);
      prevStart = seg.startTime;

      // Verbatim and translation checks
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);

      // IPA and pedagogical checks
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(3);
      expect(seg.ipaUs!).toContain("/");

      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length).toBeGreaterThanOrEqual(1);

      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(15);

      // Zero merged utterances
      expect(seg.text.startsWith("- ")).toBe(false);
      expect(seg.text).not.toContain(" - ");
    }
  });

  it("should tokenize all 83 segments cleanly with DictationWorkspace tokenizer and match tokenCount", () => {
    let totalTokens = 0;
    for (const seg of LESSON_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBe(tokens.length);
      totalTokens += tokens.length;
      for (const tok of tokens) {
        expect(tok.clean.length).toBeGreaterThan(0);
        expect(tok.dots.length).toBe(tok.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(400);
  });

  it("should have comprehensive 8-question bilingual quiz matching actual video dialogue", () => {
    const quiz = QUIZ_ABOUT_TIME_EXTRAORDINARY_ORDINARY_LIFE;
    expect(quiz.lessonId).toBe("mov_rom_01");
    expect(quiz.questions.length).toBe(8);

    for (const q of quiz.questions) {
      expect(q.id.length).toBeGreaterThan(0);
      expect(q.questionEn).toBeDefined();
      expect(q.questionVi).toBeDefined();
      expect(q.questionEn!.length).toBeGreaterThan(10);
      expect(q.questionVi!.length).toBeGreaterThan(10);

      // 4 bilingual options
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.options.length).toBe(4);
      expect([0, 1, 2, 3]).toContain(q.correctAnswer);

      // In-depth explanations
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationVi).toBeDefined();
      expect(q.explanationEn!.length).toBeGreaterThan(20);
      expect(q.explanationVi!.length).toBeGreaterThan(20);

      // Reference segment
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(83);

      // Targeted concept
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
    }
  });
});
