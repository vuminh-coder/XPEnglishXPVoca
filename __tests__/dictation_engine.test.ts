import { describe, it, expect } from 'vitest';
import {
  calculateLevenshteinDistance,
  checkNearMissTypo,
  checkEquivalenceMatch,
  saveSentenceDraft,
  loadSentenceDraft,
  clearSentenceDraft,
} from '@/features/listening/utils/dictationEngine';

describe('Dictation Engine 2.0 Unit Tests', () => {
  it('correctly calculates Levenshtein distances', () => {
    expect(calculateLevenshteinDistance('hello', 'hello')).toBe(0);
    expect(calculateLevenshteinDistance('unforseen', 'unforeseen')).toBe(1);
    expect(calculateLevenshteinDistance('kitten', 'sitting')).toBe(3);
  });

  it('detects near-miss typos on long words', () => {
    const res1 = checkNearMissTypo('unforseen', 'unforeseen');
    expect(res1.isNearMiss).toBe(true);
    expect(res1.hint).toContain('unforeseen');

    const res2 = checkNearMissTypo('cat', 'dog');
    expect(res2.isNearMiss).toBe(false);
  });

  it('normalizes contractions and equivalents properly', () => {
    expect(checkEquivalenceMatch("don't", 'do')).toBe(true);
    expect(checkEquivalenceMatch("can't", 'not')).toBe(true);
    expect(checkEquivalenceMatch('5', 'five')).toBe(true);
    expect(checkEquivalenceMatch('&', 'and')).toBe(true);
  });
});
