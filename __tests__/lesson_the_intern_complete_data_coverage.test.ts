import { describe, it, expect } from "vitest";
import {
  LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM,
  QUIZ_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM,
} from "../features/listening/data/lessons/movies/inspirational/lesson_the_intern";

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

describe("The Intern: Ben Whittacker Gentleman Wisdom (mov_insp_06) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM;
    expect(lesson.id).toBe("mov_insp_06");
    expect(lesson.slug).toBe("the-intern-ben-whittacker-gentleman-wisdom");
    expect(lesson.categoryId).toBe("cat_inspirational_life");
    expect(lesson.categorySlug).toBe("inspirational-life");
    expect(lesson.externalId).toBe("XVYZxarPOhM");
    expect(lesson.cefrLevel).toBe("B2");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("31:32");
    expect(lesson.durationSeconds).toBe(1892);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(835439);
    expect(lesson.thumbnailUrl).toContain("XVYZxarPOhM");
  });

  it("Test 2: Master Segments Volume & Chronological Progression (1-indexed)", () => {
    const segments = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments;
    expect(segments.length).toBeGreaterThanOrEqual(50);
    expect(segments.length).toBe(55);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(0.08);
    expect(segments[segments.length - 1].endTime).toBe(1874.28);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments;
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
    const segments = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments;
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
    const quiz = QUIZ_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM;
    expect(quiz.lessonId).toBe("mov_insp_06");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_insp_06_${idx + 1}`);
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
        LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments.length
      );
    });
  });

  it("Test 6: Zero Missing Attributes Across Lesson Object", () => {
    const lesson = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM;
    expect(lesson.title).toBeTruthy();
    expect(lesson.description).toBeTruthy();
    expect(lesson.wpmSpeed).toBeGreaterThan(0);
    expect(lesson.studyCount).toBeGreaterThan(0);

    lesson.segments.forEach((seg) => {
      expect(seg.orderIndex).toBeDefined();
      expect(seg.startTime).toBeDefined();
      expect(seg.endTime).toBeDefined();
      expect(seg.text).toBeDefined();
      expect(seg.translationVi).toBeDefined();
      expect(seg.ipaUs).toBeDefined();
      expect(seg.keywords).toBeDefined();
      expect(seg.explanationAi).toBeDefined();
      expect(seg.tokenCount).toBeDefined();
      expect(seg.properNouns).toBeDefined();
    });
  });

  it("Test 7: Thematic Vocabulary Verification", () => {
    const textAll = LESSON_THE_INTERN_BEN_WHITTACKER_GENTLEMAN_WISDOM.segments
      .map((s) => s.text)
      .join(" ");
    expect(textAll).toContain("handkerchief");
    expect(textAll).toContain("Experience never gets old");
    expect(textAll).toContain("Tai Chi");
    expect(textAll).toContain("7:00 this morning");
  });
});
