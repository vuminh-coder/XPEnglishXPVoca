import { describe, it, expect } from "vitest";
import {
  LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE,
  QUIZ_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE,
} from "../features/listening/data/lessons/movies/animation/lesson_ratatouille";

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

describe("Ratatouille: Remy, Linguini & Anton Ego Food Philosophy (mov_ani_04) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE;
    expect(lesson.id).toBe("mov_ani_04");
    expect(lesson.slug).toBe("ratatouille-anton-ego-food-review-monologue");
    expect(lesson.categoryId).toBe("cat_animation_pixar_disney");
    expect(lesson.categorySlug).toBe("animation-pixar-disney");
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
    expect(lesson.externalId).toBe("8WRjQAKUlio");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("British");
    expect(lesson.durationFormatted).toBe("23:41");
    expect(lesson.durationSeconds).toBe(1421);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(3090371);
    expect(lesson.thumbnailUrl).toContain("8WRjQAKUlio");
  });

  it("Test 2: Master Segments Volume & Chronological Progression (1-indexed)", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments;
    expect(segments.length).toBe(50);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(12.0);
    expect(segments[segments.length - 1].endTime).toBe(1421.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments;
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
    const segments = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments;
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
    const quiz = QUIZ_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE;
    expect(quiz.lessonId).toBe("mov_ani_04");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_ani_04_${idx + 1}`);
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
        LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments.length
      );
    });
  });

  it("Test 6: Zero Missing Attributes Across Lesson Object", () => {
    const lesson = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE;
    expect(lesson.title.trim().length).toBeGreaterThan(10);
    expect(lesson.description.trim().length).toBeGreaterThan(30);
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
  });

  it("Test 7: Direct Quiz Reference Integrity & Linkage (1-indexed)", () => {
    const lesson = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE;
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
    const segments = LESSON_RATATOUILLE_ANTON_EGO_FOOD_REVIEW_MONOLOGUE.segments;
    // Skinner & Linguini kitchen confrontation
    expect(segments[7].text).toBe("What are you doing?! Where do you get the gall to even attempt to cook in my kitchen?!");
    expect(segments[8].text).toBe("No, Chef! I was just cleaning! I spilled the soup by mistake and I was trying to wipe the counter!");
    expect(segments[9].text).toBe("You will be fired! You will be drawn and quartered! I'll do it, I think the law is on my side!");

    // Anton Ego review monologue lines
    expect(segments[40].text).toContain("In many ways, the work of a critic is easy.");
    expect(segments[41].text).toContain("We thrive on negative criticism, which is fun to write and to read.");
    expect(segments[42].text).toContain("There are times when a critic truly risks something");
    expect(segments[46].text).toContain("Not everyone can become a great artist, but a great artist can come from anywhere.");
  });
});
