import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import {
  LESSON_BEFORE_SUNRISE_VIENNA_NIGHT_WALK,
  QUIZ_BEFORE_SUNRISE_VIENNA_NIGHT_WALK,
} from "@/features/listening/data/lessons/movies/romance/lesson_before_sunrise";

describe("Senior Deep Audit: Before Sunrise / The Before Trilogy (100% Video Sync)", () => {
  it("should have valid lesson metadata and YouTube external ID matching QV1tiEDvkkw", () => {
    const lesson = LESSON_BEFORE_SUNRISE_VIENNA_NIGHT_WALK;
    expect(lesson.id).toBe("mov_rom_02");
    expect(lesson.slug).toBe("the-before-trilogy-jesse-celine-love-over-time");
    expect(lesson.externalId).toBe("QV1tiEDvkkw");
    expect(lesson.durationSeconds).toBe(819);
    expect(lesson.durationFormatted).toBe("13:39");
    expect(lesson.cefrLevel).toBe("C1");
    expect(lesson.accent).toContain("American");
    expect(lesson.categoryId).toBe("cat_romance_cinema");
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.thumbnailUrl).toContain("QV1tiEDvkkw");
  });

  it("should contain 127 high-fidelity chronological pure segments matching video QV1tiEDvkkw audio", () => {
    const { segments } = LESSON_BEFORE_SUNRISE_VIENNA_NIGHT_WALK;
    expect(segments.length).toBe(127);

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

  it("should tokenize all 118 segments cleanly with DictationWorkspace tokenizer and match tokenCount", () => {
    let totalTokens = 0;
    for (const seg of LESSON_BEFORE_SUNRISE_VIENNA_NIGHT_WALK.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBe(tokens.length);
      totalTokens += tokens.length;
      for (const tok of tokens) {
        expect(tok.clean.length).toBeGreaterThan(0);
        expect(tok.dots.length).toBe(tok.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(500);
  });

  it("should have comprehensive 8-question bilingual quiz matching actual video dialogue", () => {
    const quiz = QUIZ_BEFORE_SUNRISE_VIENNA_NIGHT_WALK;
    expect(quiz.lessonId).toBe("mov_rom_02");
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

      // Reference segment (1-indexed)
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(127);

      // Targeted concept
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
    }
  });
});
