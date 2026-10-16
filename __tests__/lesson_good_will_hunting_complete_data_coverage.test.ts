import { describe, it, expect } from "vitest";
import {
  LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE,
  QUIZ_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE,
} from "../features/listening/data/lessons/movies/inspirational/lesson_good_will_hunting";

function tokenizeSentence(sentence: string, properNouns: string[] = []) {
  if (!sentence) return [];
  const normalizedPNDict: Record<string, string> = {};
  properNouns.forEach((pn) => {
    normalizedPNDict[pn.toLowerCase().trim()] = pn.trim();
  });
  const words = sentence.trim().split(/\s+/);
  return words
    .map((w, idx) => {
      const clean = w.replace(/^[^\w\s']+|[^\w\s']+$/g, "");
      const isPN = !!normalizedPNDict[clean.toLowerCase()];
      return {
        index: idx,
        text: w,
        cleanText: clean,
        isProperNoun: isPN,
        isPunctuation: /^[^\w\s]+$/.test(w),
      };
    })
    .filter((t) => t.cleanText.length > 0 || t.isPunctuation);
}

describe("Good Will Hunting: Park Bench Monologue (mov_insp_01) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE;
    expect(lesson.id).toBe("mov_insp_01");
    expect(lesson.slug).toBe("good-will-hunting-park-bench-monologue");
    expect(lesson.categoryId).toBe("cat_inspirational_life");
    expect(lesson.categorySlug).toBe("inspirational-life");
    expect(lesson.externalId).toBe("8GY3sO47YYo");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("05:01");
    expect(lesson.durationSeconds).toBe(301);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(4704113);
    expect(lesson.thumbnailUrl).toContain("8GY3sO47YYo");
  });

  it("Test 2: Master Segments Volume & Chronological Progression (1-indexed)", () => {
    const segments = LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE.segments;
    expect(segments.length).toBeGreaterThanOrEqual(50);
    expect(segments.length).toBe(56);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(0.8);
    expect(segments[segments.length - 1].endTime).toBe(275.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE.segments;
    for (const seg of segments) {
      expect(seg.text.trim().length).toBeGreaterThan(0);
      expect(seg.translationVi.trim().length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.trim().length).toBeGreaterThan(0);
      expect(seg.ipaUs!.startsWith("/")).toBe(true);
      expect(seg.ipaUs!.endsWith("/")).toBe(true);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length).toBeGreaterThanOrEqual(1);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.trim().length).toBeGreaterThan(10);
      expect(Array.isArray(seg.properNouns)).toBe(true);
      expect(typeof seg.tokenCount).toBe("number");
      expect(seg.tokenCount).toBeGreaterThan(0);
    }
  });

  it("Test 4: Pure Master Segments & Zero Merged Utterances Standard", () => {
    const segments = LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE.segments;
    for (const seg of segments) {
      // Must not contain YouTube auto-caption markers
      expect(seg.text).not.toContain(">>");
      expect(seg.text).not.toContain("[Music]");
      expect(seg.text).not.toContain("[Applause]");

      // Token count check matching tokenizeSentence
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
    }
  });

  it("Test 5: Comprehensive CEFR B2 Quiz Structure (1-indexed references)", () => {
    const quiz = QUIZ_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE;
    expect(quiz.lessonId).toBe("mov_insp_01");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);
    expect(quiz.xpReward).toBe(100);

    for (const q of quiz.questions) {
      expect(q.id).toMatch(/^mov_insp_01_q\d+$/);
      expect(q.question.trim().length).toBeGreaterThan(15);
      expect(q.questionEn).toBeDefined();
      expect(q.questionEn!.trim().length).toBeGreaterThan(15);
      expect(q.questionVi).toBeDefined();
      expect(q.questionVi!.trim().length).toBeGreaterThan(15);
      expect(q.options.length).toBe(4);
      expect(q.optionsEn).toBeDefined();
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi).toBeDefined();
      expect(q.optionsVi!.length).toBe(4);
      expect([0, 1, 2, 3]).toContain(q.correctAnswer);
      expect(q.explanation.trim().length).toBeGreaterThan(20);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationEn!.trim().length).toBeGreaterThan(20);
      expect(q.explanationVi).toBeDefined();
      expect(q.explanationVi!.trim().length).toBeGreaterThan(20);
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConcept!.trim().length).toBeGreaterThan(10);
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(typeof q.referenceSegmentIndex).toBe("number");
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex!).toBeLessThanOrEqual(LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE.segments.length);
    }
  });

  it("Test 6: Zero Missing Attributes & Schema Adherence", () => {
    const lesson = LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE;
    expect(lesson.description).toBeDefined();
    expect(lesson.description.length).toBeGreaterThan(30);
    expect(lesson.wpmSpeed).toBeGreaterThan(100);
    expect(lesson.studyCount).toBeGreaterThan(0);
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
  });

  it("Test 7: Thematic & Key Moments Vocabulary Coverage", () => {
    const segments = LESSON_GOOD_WILL_HUNTING_PARK_BENCH_MONOLOGUE.segments;
    const allText = segments.map((s) => s.text).join(" ");

    expect(allText).toContain("swans");
    expect(allText).toContain("painting");
    expect(allText).toContain("kid");
    expect(allText).toContain("Boston");
    expect(allText).toContain("the skinny on");
    expect(allText).toContain("Michelangelo");
    expect(allText).toContain("Sistine Chapel");
    expect(allText).toContain("syllabus");
    expect(allText).toContain("wake up next to a woman and feel truly happy");
    expect(allText).toContain("Shakespeare");
    expect(allText).toContain("Once more unto the breach, dear friends");
    expect(allText).toContain("gasp his last breath");
    expect(allText).toContain("sonnet");
    expect(allText).toContain("totally vulnerable");
    expect(allText).toContain("cancer");
    expect(allText).toContain("visiting hours");
  });
});
