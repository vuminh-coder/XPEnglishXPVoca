import { describe, it, expect } from "vitest";
import {
  LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE,
  QUIZ_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE,
} from "../features/listening/data/lessons/movies/animation/lesson_up";

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

describe("Up: Carl & Ellie's Adventure Book & Russell Wilderness Explorer (mov_ani_06) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE;
    expect(lesson.id).toBe("mov_ani_06");
    expect(lesson.slug).toBe("up-carl-and-ellie-thanks-for-adventure");
    expect(lesson.categoryId).toBe("cat_animation_pixar_disney");
    expect(lesson.categorySlug).toBe("animation-pixar-disney");
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
    expect(lesson.externalId).toBe("0zbPeoZzcPg");
    expect(lesson.cefrLevel).toBe("B1");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("24:06");
    expect(lesson.durationSeconds).toBe(1446);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(1608833);
    expect(lesson.thumbnailUrl).toContain("0zbPeoZzcPg");
  });

  it("Test 2: Master Segments Volume & Chronological Progression (1-indexed)", () => {
    const segments = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments;
    expect(segments.length).toBe(50);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(42.0);
    expect(segments[segments.length - 1].endTime).toBe(1446.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments;
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
    const segments = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments;
    for (const seg of segments) {
      expect(seg.text).not.toContain(">>");
      expect(seg.text).not.toContain("[Music]");
      expect(seg.text).not.toContain("[Applause]");

      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount).toBe(tokens.length);
    }
  });

  it("Test 5: Full Bilingual Quiz Rigor (8 CEFR Questions, 1-indexed)", () => {
    const quiz = QUIZ_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE;
    expect(quiz.lessonId).toBe("mov_ani_06");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_ani_06_${idx + 1}`);
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
        LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments.length
      );
    });
  });

  it("Test 6: Zero Missing Attributes Across Lesson Object", () => {
    const lesson = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE;
    expect(lesson.title.trim().length).toBeGreaterThan(10);
    expect(lesson.description.trim().length).toBeGreaterThan(30);
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
  });

  it("Test 7: Direct Quiz Reference Integrity & Linkage (1-indexed)", () => {
    const lesson = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE;
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

  it("Test 8: Zero Merged Utterances Across Character Dialogue Segments", () => {
    const segments = LESSON_UP_CARL_AND_ELLIE_THANKS_FOR_ADVENTURE.segments;
    // Carl and Russell porch encounter must be completely separated
    expect(segments[4].text).toBe("Good afternoon! My name is Russell, and I am a Wilderness Explorer in Tribe 54, Sweatlodge 12.");
    expect(segments[5].text).toBe("Are you in need of any assistance today, sir?");
    expect(segments[6].text).toBe("No.");
    expect(segments[7].text).toBe("I could help you cross the street.");
    expect(segments[8].text).toBe("No.");
    expect(segments[9].text).toBe("I could help you cross your yard.");
    expect(segments[10].text).toBe("No.");
    expect(segments[11].text).toBe("I could help you cross your porch.");
    expect(segments[12].text).toBe("No.");
    expect(segments[13].text).toBe("Well, I got to help you cross something!");
    expect(segments[14].text).toBe("Uh, no, I'm doing fine. Good afternoon.");

    // Ellie's message must be strictly independent
    expect(segments[48].text).toContain("Thanks for the adventure — now go have a new one! Love, Ellie.");
  });
});
