import { describe, it, expect } from "vitest";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";

describe("TOEIC Part 3/4 & Listening Master Edition Standards", () => {
  // Extract the 104 core listening lessons (3 general + 101 TOEIC)
  const coreLessons = MOCK_LESSONS_DATA.filter(
    (l) => l.id.startsWith("listen_toeic_") || ["listen_001", "listen_002", "listen_003"].includes(l.id)
  );

  const toeicLessons = coreLessons.filter((l) => l.id.includes("toeic"));

  it("should contain exactly 104 core lessons (3 general + 101 TOEIC)", () => {
    expect(coreLessons.length).toBe(104);
    expect(toeicLessons.length).toBe(101);
  });

  it("should have a completely continuous TOEIC ID sequence from 001 to 101 without skipping 021", () => {
    for (let i = 1; i <= 101; i++) {
      const expectedId = `listen_toeic_q3_${String(i).padStart(3, "0")}`;
      const found = toeicLessons.find((l) => l.id === expectedId);
      expect(found, `Missing TOEIC lesson ID: ${expectedId}`).toBeDefined();
    }
  });

  it("should verify listen_toeic_q3_021 DevOps Cloud lesson exists with correct metadata", () => {
    const l021 = toeicLessons.find((l) => l.id === "listen_toeic_q3_021");
    expect(l021).toBeDefined();
    expect(l021?.title).toContain("Cloud DevOps CI/CD Pipeline");
    expect(l021?.category).toBe("TOEIC Part 4");
    expect(l021?.level).toBe("Intermediate");
  });

  it("should ensure every core lesson has at least 3 questions with 4 options and 1 correct answer", () => {
    coreLessons.forEach((l) => {
      const questions = l.quizzes || l.quizList || [];
      expect(
        questions.length,
        `Lesson ${l.id} has ${questions.length} questions, expected >= 3`
      ).toBeGreaterThanOrEqual(3);

      questions.slice(0, 3).forEach((q, qIdx) => {
        expect(
          q.question.trim().length,
          `Lesson ${l.id} Q${qIdx + 1} has empty question`
        ).toBeGreaterThan(0);
        expect(
          q.options.length,
          `Lesson ${l.id} Q${qIdx + 1} does not have exactly 4 options`
        ).toBe(4);
        expect(
          q.correctIndex,
          `Lesson ${l.id} Q${qIdx + 1} correct answer index must be 0, 1, 2, or 3`
        ).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThanOrEqual(3);
        expect(
          q.explanation?.trim().length,
          `Lesson ${l.id} Q${qIdx + 1} explanation missing`
        ).toBeGreaterThan(0);
      });
    });
  });

  it("should achieve perfect 25.0% Key Distribution Parity (exactly 78 A, 78 B, 78 C, 78 D across 312 questions)", () => {
    const keyCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };
    let totalQuestions = 0;

    coreLessons.forEach((l) => {
      const questions = (l.quizzes || l.quizList || []).slice(0, 3);
      questions.forEach((q) => {
        keyCounts[q.correctIndex as 0 | 1 | 2 | 3]++;
        totalQuestions++;
      });
    });

    expect(totalQuestions).toBe(312);
    expect(keyCounts[0], "Correct key 0 (A) must appear exactly 78 times").toBe(78);
    expect(keyCounts[1], "Correct key 1 (B) must appear exactly 78 times").toBe(78);
    expect(keyCounts[2], "Correct key 2 (C) must appear exactly 78 times").toBe(78);
    expect(keyCounts[3], "Correct key 3 (D) must appear exactly 78 times").toBe(78);
  });

  it("should ensure every core lesson has at least 4 vocabulary items with IPA format /.../ and examples", () => {
    coreLessons.forEach((l) => {
      const vocabs = l.vocabularyList || l.vocabList || [];
      expect(
        vocabs.length,
        `Lesson ${l.id} has ${vocabs.length} vocabs, expected >= 4`
      ).toBeGreaterThanOrEqual(4);

      vocabs.forEach((v, vIdx) => {
        expect(
          v.word.trim().length,
          `Lesson ${l.id} vocab ${vIdx} has empty word`
        ).toBeGreaterThan(0);
        expect(
          v.ipa,
          `Lesson ${l.id} vocab "${v.word}" missing /.../ IPA`
        ).toMatch(/^\/.*\/$/);
        expect(
          v.vietnamese?.trim().length,
          `Lesson ${l.id} vocab "${v.word}" missing vietnamese`
        ).toBeGreaterThan(0);
      });
    });
  });

  it("should ensure every transcript line has timestamp, word timings, and Vietnamese translation", () => {
    coreLessons.forEach((l) => {
      const transcript = l.transcript || [];
      expect(
        transcript.length,
        `Lesson ${l.id} transcript must have lines`
      ).toBeGreaterThan(0);

      transcript.forEach((line, lineIdx) => {
        expect(
          line.text.trim().length,
          `Lesson ${l.id} line ${lineIdx} has empty text`
        ).toBeGreaterThan(0);
        expect(
          line.translation?.trim().length || line.vietnamese?.trim().length,
          `Lesson ${l.id} line ${lineIdx} missing Vietnamese translation`
        ).toBeGreaterThan(0);
        expect(
          line.wordTimings?.length,
          `Lesson ${l.id} line ${lineIdx} missing wordTimings`
        ).toBeGreaterThan(0);
      });
    });
  });
});
