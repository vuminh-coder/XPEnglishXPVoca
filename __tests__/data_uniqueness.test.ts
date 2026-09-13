import { describe, it, expect } from 'vitest';
import { MOCK_LESSONS_DATA } from '@/features/listening/data/listeningMockData';

describe('Data Uniqueness & Transcript Integrity Audit', () => {
  it('verifies ZERO duplicate sentences across all lessons in MOCK_LESSONS_DATA', () => {
    const sentenceOccurrences = new Map<string, string[]>();
    let totalSentencesCount = 0;

    MOCK_LESSONS_DATA.forEach((lesson) => {
      (lesson.transcript || []).forEach((s) => {
        totalSentencesCount++;
        const text = s.text.trim().toLowerCase();
        if (!sentenceOccurrences.has(text)) {
          sentenceOccurrences.set(text, []);
        }
        sentenceOccurrences.get(text)!.push(lesson.id);
      });
    });

    const duplicates: { text: string; lessons: string[] }[] = [];
    sentenceOccurrences.forEach((lessons, text) => {
      if (lessons.length > 1) {
        duplicates.push({ text, lessons });
      }
    });

    console.log('=== DATA UNIQUENESS AUDIT ===');
    console.log('Total Lessons:', MOCK_LESSONS_DATA.length);
    console.log('Total Sentences:', totalSentencesCount);
    console.log('Unique Sentences:', sentenceOccurrences.size);
    console.log('Duplicate Sentences Count:', duplicates.length);

    if (duplicates.length > 0) {
      console.error('Found duplicate sentences:', duplicates.slice(0, 5));
    }

    expect(duplicates.length).toBe(0);
    expect(totalSentencesCount).toBe(sentenceOccurrences.size);
  });
});
