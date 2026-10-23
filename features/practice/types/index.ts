export type SubMode =
  | "quiz"
  | "flashcard"
  | "writing"
  | "speaking"
  | "match_pairs"
  | "sentence_builder";

export interface MatchCardItem {
  id: string; // unique card id, e.g. "word_123_en" or "word_123_vi"
  vocabId: string;
  text: string;
  type: "en" | "vi";
  matched: boolean;
}

export interface SentenceWordToken {
  id: string;
  text: string;
  isDistractor?: boolean;
}

export interface PracticeWord {
  id: string;
  word: string;
  meaning: string;
  ipa: string;
  type: string;
  level: string;
  topic: string;
  example: string;
  exampleVi: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export type FlashcardRating = "again" | "good" | "easy";

export interface PracticeSessionStats {
  totalWords: number;
  totalXp: number;
  elapsedTime: number;
  correctCount: number;
  accuracyPercent: number;
}
