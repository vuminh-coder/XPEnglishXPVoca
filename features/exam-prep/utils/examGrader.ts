/**
 * TOEIC non-linear scoring mapping
 * Converts a raw percentage score (or raw correct out of 100 questions) to scaled 5-495 score
 */
export function mapToeicScore(raw: number, isListening: boolean): number {
  if (raw >= 96) return 495;
  if (raw <= 5) return 5;
  
  let score = 5;
  if (isListening) {
    if (raw > 90) score = 450 + (raw - 90) * 9;
    else if (raw > 70) score = 345 + (raw - 70) * 5.25;
    else if (raw > 40) score = 160 + (raw - 40) * 6.16;
    else score = 5 + (raw - 5) * 5.14;
  } else {
    // Reading
    if (raw > 90) score = 450 + (raw - 90) * 9;
    else if (raw > 70) score = 325 + (raw - 70) * 6.25;
    else if (raw > 40) score = 150 + (raw - 40) * 5.83;
    else score = 5 + (raw - 5) * 4.85;
  }
  
  // Round to nearest 5 points as per TOEIC regulations
  return Math.min(495, Math.max(5, Math.round(score / 5) * 5));
}

/**
 * IELTS Academic Reading band scale mapping
 * Converts raw correct questions count (out of 40 questions) to band score (1.0 - 9.0)
 */
export function mapIeltsBand(raw: number): number {
  if (raw >= 39) return 9.0;
  if (raw >= 37) return 8.5;
  if (raw >= 35) return 8.0;
  if (raw >= 32) return 7.5;
  if (raw >= 30) return 7.0;
  if (raw >= 27) return 6.5;
  if (raw >= 23) return 6.0;
  if (raw >= 19) return 5.5;
  if (raw >= 15) return 5.0;
  if (raw >= 13) return 4.5;
  if (raw >= 10) return 4.0;
  if (raw >= 8) return 3.5;
  if (raw >= 6) return 3.0;
  if (raw >= 4) return 2.5;
  if (raw >= 3) return 2.0;
  if (raw >= 2) return 1.5;
  return 1.0;
}
