import { describe, it, expect } from 'vitest';
import { EXTENDED_SHADOWING_LESSONS } from '@/features/shadowing/data/extendedShadowingData';

describe('Audio Shadowing Master Edition - 12 Extended Lessons Standard', () => {
  it('should contain exactly 12 lessons with valid IDs shadow_ext_001 to shadow_ext_012', () => {
    expect(EXTENDED_SHADOWING_LESSONS).toHaveLength(12);
    
    for (let i = 1; i <= 12; i++) {
      const expectedId = `shadow_ext_${String(i).padStart(3, '0')}`;
      const lesson = EXTENDED_SHADOWING_LESSONS.find(l => l.id === expectedId);
      expect(lesson, `Lesson ${expectedId} should exist`).toBeDefined();
      expect(lesson?.title).toBeTruthy();
      expect(lesson?.audio_url || lesson?.audioUrl).toBeTruthy();
      expect(lesson?.level).toBeTruthy();
      expect(lesson?.category).toBeTruthy();
      expect(Array.isArray(lesson?.tags)).toBe(true);
      expect(lesson?.tags?.length).toBeGreaterThan(0);
    }
  });

  it('should have >= 4 academic vocabulary items per lesson with valid IPA, pos, vietnamese, and meaning', () => {
    EXTENDED_SHADOWING_LESSONS.forEach(lesson => {
      expect(lesson.vocabularyList, `Lesson ${lesson.id} vocabularyList should be defined`).toBeDefined();
      expect(lesson.vocabularyList!.length, `Lesson ${lesson.id} should have >= 4 vocabulary items`).toBeGreaterThanOrEqual(4);

      lesson.vocabularyList!.forEach((vocab, idx) => {
        expect(vocab.word, `Lesson ${lesson.id} vocab #${idx + 1} word must be valid`).toBeTruthy();
        expect(vocab.ipa, `Lesson ${lesson.id} vocab #${idx + 1} ipa must be formatted`).toMatch(/^\/.+\/$/);
        expect(vocab.pos, `Lesson ${lesson.id} vocab #${idx + 1} pos must be defined`).toBeTruthy();
        expect(vocab.vietnamese, `Lesson ${lesson.id} vocab #${idx + 1} vietnamese must be defined`).toBeTruthy();
        expect(vocab.meaning, `Lesson ${lesson.id} vocab #${idx + 1} meaning must match vietnamese`).toBe(vocab.vietnamese);
      });
    });
  });

  it('should have exactly 14 transcript sentences per lesson with wordTimings, bilingual translations and duration', () => {
    EXTENDED_SHADOWING_LESSONS.forEach(lesson => {
      expect(lesson.transcript, `Lesson ${lesson.id} transcript must be defined`).toBeDefined();
      expect(lesson.transcript!.length, `Lesson ${lesson.id} must have exactly 14 sentences`).toBe(14);

      lesson.transcript!.forEach((sentence, idx) => {
        expect(sentence.id, `Lesson ${lesson.id} sentence #${idx + 1} id must exist`).toBeTruthy();
        expect(sentence.speaker, `Lesson ${lesson.id} sentence #${idx + 1} speaker must exist`).toBeTruthy();
        expect(sentence.text, `Lesson ${lesson.id} sentence #${idx + 1} text must exist`).toBeTruthy();
        expect(sentence.vietnamese, `Lesson ${lesson.id} sentence #${idx + 1} vietnamese must exist`).toBeTruthy();
        expect(sentence.translation, `Lesson ${lesson.id} sentence #${idx + 1} translation must match vietnamese`).toBe(sentence.vietnamese);
        
        expect(sentence.startTime).toBeGreaterThanOrEqual(0);
        expect(sentence.endTime).toBeGreaterThan(sentence.startTime);
        expect(sentence.duration).toBeCloseTo(sentence.endTime - sentence.startTime, 2);

        // Word Timings Check
        expect(Array.isArray(sentence.wordTimings), `Sentence #${idx + 1} wordTimings must be array`).toBe(true);
        expect(sentence.wordTimings!.length, `Sentence #${idx + 1} wordTimings should not be empty`).toBeGreaterThan(0);
        sentence.wordTimings!.forEach((wt, wtIdx) => {
          expect(wt.word).toBeTruthy();
          expect(wt.start).toBeGreaterThanOrEqual(0);
          expect(wt.end).toBeGreaterThan(wt.start);
        });
      });
    });
  });

  it('should have exactly 4 pedagogical quizzes per lesson and synchronous quizList/quizzes properties', () => {
    let totalQuizzes = 0;
    const distribution = { 0: 0, 1: 0, 2: 0, 3: 0 };

    EXTENDED_SHADOWING_LESSONS.forEach(lesson => {
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

    expect(totalQuizzes).toBe(48);

    // Global Key Balance: 12 A, 12 B, 12 C, 12 D (25% each)
    expect(distribution[0], 'Option A count').toBe(12);
    expect(distribution[1], 'Option B count').toBe(12);
    expect(distribution[2], 'Option C count').toBe(12);
    expect(distribution[3], 'Option D count').toBe(12);
  });
});
