import { describe, it, expect } from 'vitest';
import { CURATED_LEVEL_LESSONS } from '@/features/listening/data/curatedLevelLessons';

describe('Curated Level Lessons Master Edition - 7 Curated Lessons Standard', () => {
  const expectedLessonIds = [
    'listen_a1_001',
    'listen_a1_002',
    'listen_a1_003',
    'listen_a1_004',
    'listen_a1_005',
    'listen_c1_001',
    'listen_c1_002'
  ];

  it('should contain exactly 7 curated lessons with expected IDs and metadata', () => {
    expect(CURATED_LEVEL_LESSONS).toHaveLength(7);

    expectedLessonIds.forEach(id => {
      const lesson = CURATED_LEVEL_LESSONS.find(l => l.id === id);
      expect(lesson, `Lesson ${id} must exist`).toBeDefined();
      expect(lesson?.title).toBeTruthy();
      expect(lesson?.level).toBeTruthy();
      expect(lesson?.duration).toBeTruthy();
      expect(lesson?.category).toBeTruthy();
      expect(Array.isArray(lesson?.tags)).toBe(true);
      expect(lesson?.tags?.length).toBeGreaterThan(0);
    });
  });

  it('should have >= 4 academic vocabulary items per lesson with valid IPA, pos, vietnamese, and meaning', () => {
    CURATED_LEVEL_LESSONS.forEach(lesson => {
      expect(lesson.vocabularyList, `Lesson ${lesson.id} vocabularyList should be defined`).toBeDefined();
      expect(lesson.vocabularyList!.length, `Lesson ${lesson.id} should have >= 4 vocabulary items`).toBeGreaterThanOrEqual(4);

      lesson.vocabularyList!.forEach((vocab, idx) => {
        expect(vocab.word, `Lesson ${lesson.id} vocab #${idx + 1} word must be valid`).toBeTruthy();
        expect(vocab.ipa, `Lesson ${lesson.id} vocab #${idx + 1} ipa must be formatted with slashes`).toMatch(/^\/.+\/$/);
        expect(vocab.pos, `Lesson ${lesson.id} vocab #${idx + 1} pos must be defined`).toBeTruthy();
        expect(vocab.vietnamese, `Lesson ${lesson.id} vocab #${idx + 1} vietnamese must be defined`).toBeTruthy();
        expect(vocab.meaning, `Lesson ${lesson.id} vocab #${idx + 1} meaning must match vietnamese`).toBe(vocab.vietnamese);
      });
    });
  });

  it('should have exactly 10 transcript sentences per lesson with wordTimings, bilingual translations and duration', () => {
    CURATED_LEVEL_LESSONS.forEach(lesson => {
      expect(lesson.transcript, `Lesson ${lesson.id} transcript must be defined`).toBeDefined();
      expect(lesson.transcript!.length, `Lesson ${lesson.id} must have exactly 10 sentences`).toBe(10);

      lesson.transcript!.forEach((sentence, idx) => {
        expect(sentence.sentenceId || sentence.id, `Lesson ${lesson.id} sentence #${idx + 1} id must exist`).toBeTruthy();
        expect(sentence.text, `Lesson ${lesson.id} sentence #${idx + 1} text must exist`).toBeTruthy();
        expect(sentence.vietnamese, `Lesson ${lesson.id} sentence #${idx + 1} vietnamese must exist`).toBeTruthy();
        expect(sentence.translation, `Lesson ${lesson.id} sentence #${idx + 1} translation must match vietnamese`).toBe(sentence.vietnamese);

        expect(sentence.startTime).toBeGreaterThanOrEqual(0);
        expect(sentence.endTime).toBeGreaterThan(sentence.startTime);
        expect(sentence.duration).toBeGreaterThan(0);

        // Word Timings Check
        expect(Array.isArray(sentence.wordTimings), `Sentence #${idx + 1} wordTimings must be array`).toBe(true);
        expect(sentence.wordTimings!.length, `Sentence #${idx + 1} wordTimings should not be empty`).toBeGreaterThan(0);
        sentence.wordTimings!.forEach((wt) => {
          expect(wt.word).toBeTruthy();
          expect(wt.start).toBeGreaterThanOrEqual(0);
          expect(wt.end).toBeGreaterThan(wt.start);
        });
      });
    });
  });

  it('should have exactly 4 pedagogical quizzes per lesson with 4 options and balanced key distribution (7 each for A, B, C, D)', () => {
    let totalQuizzes = 0;
    const distribution = { 0: 0, 1: 0, 2: 0, 3: 0 };

    CURATED_LEVEL_LESSONS.forEach(lesson => {
      expect(lesson.quizzes, `Lesson ${lesson.id} quizzes must be defined`).toBeDefined();
      expect(lesson.quizList, `Lesson ${lesson.id} quizList must be defined`).toBeDefined();
      expect(lesson.quizzes!.length, `Lesson ${lesson.id} must have 4 quizzes`).toBe(4);
      expect(lesson.quizList!.length, `Lesson ${lesson.id} quizList must have 4 quizzes`).toBe(4);
      expect(lesson.quizzes).toEqual(lesson.quizList);

      lesson.quizzes!.forEach((quiz, qIdx) => {
        totalQuizzes++;
        expect(quiz.question, `Lesson ${lesson.id} quiz #${qIdx + 1} question must exist`).toBeTruthy();
        expect(quiz.options, `Lesson ${lesson.id} quiz #${qIdx + 1} options must have 4 choices`).toHaveLength(4);
        expect([0, 1, 2, 3]).toContain(quiz.correctIndex);
        expect(quiz.explanation, `Lesson ${lesson.id} quiz #${qIdx + 1} explanation must be comprehensive`).toBeTruthy();
        expect(quiz.explanation!.length).toBeGreaterThan(15);

        distribution[quiz.correctIndex as 0 | 1 | 2 | 3]++;
      });
    });

    expect(totalQuizzes).toBe(28);

    // Global Key Balance across 28 questions: exactly 7 A, 7 B, 7 C, 7 D (25% each)
    expect(distribution[0], 'Option A count').toBe(7);
    expect(distribution[1], 'Option B count').toBe(7);
    expect(distribution[2], 'Option C count').toBe(7);
    expect(distribution[3], 'Option D count').toBe(7);
  });
});
