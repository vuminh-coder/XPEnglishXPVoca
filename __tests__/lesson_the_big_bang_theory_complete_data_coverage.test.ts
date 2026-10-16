import { describe, it, expect } from "vitest";
import {
  LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT,
  QUIZ_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT_EXTENDED,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_the_big_bang_theory";

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

describe("The Big Bang Theory: Complete Data Coverage & Integrity Tests", () => {
  it("Test 1: Video metadata, IDs and duration should match canonical requirements", () => {
    expect(LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.id).toBe("mov_sit_09");
    expect(LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.slug).toBe(
      "the-big-bang-theory-sheldon-roommate-agreement"
    );
    expect(LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.categoryId).toBe("cat_classic_sitcoms");
    expect(LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.externalId).toBe("WjM9M-AdNho");
    expect(LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.durationSeconds).toBe(1328);
    expect(LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.cefrLevel).toBe("B2");
    expect(LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.accent).toBe("American");
    expect(LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.viewCount).toBeGreaterThanOrEqual(6000000);
  });

  it("Test 2: Segments sequence must be strictly 1-indexed and continuous", () => {
    const segments = LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.segments;
    expect(segments.length).toBeGreaterThanOrEqual(100);

    segments.forEach((seg, idx) => {
      expect(seg.orderIndex).toBe(idx + 1);
      expect(seg.startTime).toBeLessThan(seg.endTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeLessThanOrEqual(1329);
    });
  });

  it("Test 3: Zero Merged Utterances - all required linguistics fields must be populated", () => {
    const segments = LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.segments;

    segments.forEach((seg, idx) => {
      expect(seg.text.trim().length, `Segment ${idx} text is empty`).toBeGreaterThan(0);
      expect(seg.translationVi.trim().length, `Segment ${idx} translationVi is empty`).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.trim().length, `Segment ${idx} ipaUs is empty`).toBeGreaterThan(0);
      expect(seg.ipaUs!.startsWith("/"), `Segment ${idx} ipaUs missing leading slash`).toBe(true);
      expect(seg.ipaUs!.endsWith("/"), `Segment ${idx} ipaUs missing trailing slash`).toBe(true);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.trim().length, `Segment ${idx} explanationAi is empty`).toBeGreaterThan(0);
      expect(Array.isArray(seg.keywords), `Segment ${idx} keywords is not array`).toBe(true);
      expect(seg.keywords!.length, `Segment ${idx} keywords is empty`).toBeGreaterThan(0);
    });
  });

  it("Test 4: Token counts must accurately match tokenizeSentence token count", () => {
    const segments = LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.segments;

    segments.forEach((seg, idx) => {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(seg.tokenCount, `Segment ${idx} tokenCount mismatch: text='${seg.text}'`).toBe(tokens.length);
      expect(seg.tokenCount).toBeGreaterThan(0);
    });
  });

  it("Test 5: Timeline chronological progression must not regress", () => {
    const segments = LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.segments;

    for (let i = 1; i < segments.length; i++) {
      expect(
        segments[i].startTime,
        `Segment ${i} startTime (${segments[i].startTime}) precedes Segment ${i - 1} startTime (${segments[i - 1].startTime})`
      ).toBeGreaterThanOrEqual(segments[i - 1].startTime);
    }
  });

  it("Test 6: Extended Quiz must contain exactly 8 comprehensive CEFR B2 questions", () => {
    const quiz = QUIZ_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT_EXTENDED;
    expect(quiz.lessonId).toBe("mov_sit_09");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);

    quiz.questions.forEach((q, idx) => {
      expect(q.id).toBe(`mov_sit_09_q${idx + 1}`);
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
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThanOrEqual(3);
      expect(q.explanation.trim().length).toBeGreaterThan(20);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationEn!.trim().length).toBeGreaterThan(20);
      expect(q.explanationVi).toBeDefined();
      expect(q.explanationVi!.trim().length).toBeGreaterThan(20);
      expect(q.targetedConcept).toBeDefined();
      expect(q.targetedConcept!.trim().length).toBeGreaterThan(10);
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptEn!.trim().length).toBeGreaterThan(10);
      expect(q.targetedConceptVi).toBeDefined();
      expect(q.targetedConceptVi!.trim().length).toBeGreaterThan(10);
    });
  });

  it("Test 7: Quiz options must be strictly distinct and reference segment indices must be valid 1-indexed", () => {
    const quiz = QUIZ_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT_EXTENDED;
    const maxSegmentIndex = LESSON_THE_BIG_BANG_THEORY_SHELDON_ROOMMATE_AGREEMENT.segments.length;

    quiz.questions.forEach((q, idx) => {
      const uniqueOptions = new Set(q.options);
      expect(uniqueOptions.size, `Question ${idx + 1} has duplicate options`).toBe(4);

      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex!).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex!).toBeLessThanOrEqual(maxSegmentIndex);
    });
  });
});
