import { describe, it, expect } from "vitest";
import {
  LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST,
  QUIZ_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST,
} from "../features/listening/data/lessons/movies/animation/lesson_the_lion_king";

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
        clean,
        isProperNoun: isPN,
      };
    })
    .filter((t) => t.clean.length > 0);
}

describe("The Lion King: Rafiki, Timon & Pumbaa 'Hakuna Matata & The Past Can Hurt' (mov_ani_08) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST;
    expect(lesson.id).toBe("mov_ani_08");
    expect(lesson.slug).toBe("the-lion-king-rafiki-teaches-simba-the-past");
    expect(lesson.categoryId).toBe("cat_animation_pixar_disney");
    expect(lesson.categorySlug).toBe("animation-pixar-disney");
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
    expect(lesson.externalId).toBe("HeQTJE99OXo");
    expect(lesson.cefrLevel).toBe("A2");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("24:04");
    expect(lesson.durationSeconds).toBe(1444);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(1453059);
    expect(lesson.thumbnailUrl).toContain("HeQTJE99OXo");
  });

  it("Test 2: Master Segments Volume & Chronological Progression (1-indexed)", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    expect(segments.length).toBe(50);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(0.0);
    expect(segments[segments.length - 1].endTime).toBe(1440.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
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
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    for (const seg of segments) {
      expect(seg.text).not.toContain(">>");
      expect(seg.text).not.toContain("[Music]");
      expect(seg.text).not.toContain("[Applause]");
      expect(seg.text).not.toContain(" — ");

      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
    }
  });

  it("Test 5: Full Bilingual Quiz Rigor (8 CEFR Questions, 1-indexed)", () => {
    const quiz = QUIZ_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST;
    expect(quiz.lessonId).toBe("mov_ani_08");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_ani_08_${idx + 1}`);
      expect(q.question.length).toBeGreaterThan(15);
      expect(q.questionEn).toBeDefined();
      expect(q.questionVi).toBeDefined();
      expect(q.options.length).toBe(4);
      expect(q.optionsEn?.length).toBe(4);
      expect(q.optionsVi?.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanation.length).toBeGreaterThan(15);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationVi).toBeDefined();
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(typeof q.referenceSegmentIndex).toBe("number");
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(
        LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments.length
      );
    });
  });

  it("Test 6: Zero Missing Attributes Across Lesson Object", () => {
    const lesson = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST;
    expect(lesson.description).toBeDefined();
    expect(lesson.description.length).toBeGreaterThan(20);
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
  });

  it("Test 7: Direct Quiz Reference Integrity & Linkage (1-indexed)", () => {
    const lesson = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST;
    const quiz = lesson.quiz;
    for (const q of quiz!.questions) {
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(lesson.segments.length);
      const referencedSegment = lesson.segments[q.referenceSegmentIndex! - 1];
      expect(referencedSegment).toBeDefined();
      expect(referencedSegment.orderIndex).toBe(q.referenceSegmentIndex);
      expect(referencedSegment.text.length).toBeGreaterThan(0);
    }
  });
});
