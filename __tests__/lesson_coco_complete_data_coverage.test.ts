import { describe, it, expect } from "vitest";
import {
  LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED,
  QUIZ_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED,
} from "../features/listening/data/lessons/movies/animation/lesson_coco";

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

describe("Coco: Miguel & Héctor 'Remember Me' with Mama Coco (mov_ani_05) - Complete Data Coverage Suite", () => {
  it("Test 1: Full Metadata & Duration Alignment", () => {
    const lesson = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED;
    expect(lesson.id).toBe("mov_ani_05");
    expect(lesson.slug).toBe("coco-remember-me-with-mama-coco-extended");
    expect(lesson.categoryId).toBe("cat_animation_pixar_disney");
    expect(lesson.categorySlug).toBe("animation-pixar-disney");
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
    expect(lesson.externalId).toBe("EQ9RFbIHrFw");
    expect(lesson.cefrLevel).toBe("B1");
    expect(lesson.accent).toBe("American");
    expect(lesson.durationFormatted).toBe("16:18");
    expect(lesson.durationSeconds).toBe(978);
    expect(lesson.sourceType).toBe("YOUTUBE");
    expect(lesson.supportedTypes).toBe("BOTH");
    expect(lesson.viewCount).toBe(835393);
    expect(lesson.thumbnailUrl).toContain("EQ9RFbIHrFw");
  });

  it("Test 2: Master Segments Volume & Chronological Progression (1-indexed)", () => {
    const segments = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments;
    expect(segments.length).toBe(50);

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].startTime);
      }
    }
    expect(segments[0].startTime).toBe(10.0);
    expect(segments[segments.length - 1].endTime).toBe(978.0);
  });

  it("Test 3: Comprehensive Segment Field Integrity", () => {
    const segments = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments;
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
    const segments = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments;
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
    const quiz = QUIZ_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED;
    expect(quiz.lessonId).toBe("mov_ani_05");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`q_mov_ani_05_${idx + 1}`);
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
        LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments.length
      );
    });
  });

  it("Test 6: Zero Missing Attributes Across Lesson Object", () => {
    const lesson = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED;
    expect(lesson.title.trim().length).toBeGreaterThan(10);
    expect(lesson.description.trim().length).toBeGreaterThan(30);
    expect(lesson.categoryName).toBe("Hoạt Hình Pixar & Disney");
    expect(lesson.quiz).toBeDefined();
    expect(lesson.quiz!.questions.length).toBe(8);
  });

  it("Test 7: Direct Quiz Reference Integrity & Linkage (1-indexed)", () => {
    const lesson = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED;
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

  it("Test 8: Zero Merged Utterances Across Character Dialogue & Song Segments", () => {
    const segments = LESSON_COCO_REMEMBER_ME_WITH_MAMA_COCO_EXTENDED.segments;
    // Papel picado narration lines must be strictly independent
    expect(segments[6].text).toBe("The papa, he was a musician.");
    expect(segments[7].text).toBe("He and his family would sing, and dance, and count their blessings.");
    expect(segments[8].text).toBe("But he also had a dream: to play music for the world.");
    expect(segments[9].text).toBe("And one day, he left with his guitar, and he never returned.");
    expect(segments[10].text).toBe("And the mama? She didn't have time to cry over that walkaway musician!");
    expect(segments[11].text).toBe("After banishing all music from her life, she rolled up her sleeves and she learned how to make shoes.");

    // Academy Award-winning song Remember Me lines must also be strictly independent
    expect(segments[37].text).toBe("Remember me, though I have to say goodbye.");
    expect(segments[38].text).toBe("Remember me, don't let it make you cry.");
    expect(segments[39].text).toBe("For even if I'm far away, I hold you in my heart.");
    expect(segments[40].text).toBe("I sing a secret song to you each night we are apart.");
    expect(segments[41].text).toBe("Remember me, though I have to travel far.");
    expect(segments[42].text).toBe("Each time you hear a sad guitar, know that I'm with you the only way that I can be.");
    expect(segments[43].text).toBe("Until you're in my arms again, remember me.");
  });
});
