export type SubMode = "quiz" | "flashcard" | "writing" | "speaking";

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
