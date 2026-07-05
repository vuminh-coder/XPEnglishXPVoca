export interface SM2Result {
  interval: number;
  easeFactor: number;
  repetitions: number;
}

/**
 * Calculates the next interval, ease factor, and repetitions for a vocabulary card
 * based on the SuperMemo-2 (SM-2) Spaced Repetition Algorithm.
 * 
 * @param quality Response quality from 0 to 5:
 *                0: "Total blackout", complete failure to recall
 *                1: Incorrect response, but upon seeing the correct answer it felt familiar
 *                2: Incorrect response, but easy to recall once corrected
 *                3: Correct response recalled with serious difficulty
 *                4: Correct response after a hesitation
 *                5: Perfect response
 * @param prevInterval Previous interval in days
 * @param prevEaseFactor Previous ease factor (default is 2.5)
 * @param prevRepetitions Number of consecutive correct repetitions
 */
export function calculateSM2(
  quality: number,
  prevInterval: number,
  prevEaseFactor: number,
  prevRepetitions: number
): SM2Result {
  let interval = 1;
  let easeFactor = prevEaseFactor;
  let repetitions = prevRepetitions;

  if (quality < 3) {
    // Incorrect answer: reset repetitions and schedule for 1 day
    repetitions = 0;
    interval = 1;
  } else {
    // Correct answer: increment repetitions
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(prevInterval * easeFactor);
    }
    repetitions++;
  }

  // Adjust Ease Factor (EF)
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Keep EF at least 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  return { interval, easeFactor, repetitions };
}
