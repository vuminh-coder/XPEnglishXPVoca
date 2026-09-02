export type PvPGameMode = "quiz" | "spelling" | "listening";
export type PvPDifficulty = "easy" | "medium" | "hard";
export type PvPMatchType = "quick" | "room";
export type PvPGameState = "lobby" | "room_created" | "searching" | "starting_count" | "battle" | "results";

export interface Opponent {
  name: string;
  avatarEmoji: string;
  level: number;
  title: string;
}

export interface QuestionPackage {
  question: {
    id: string;
    word: string;
    meaning: string;
    ipa?: string;
    pos?: string;
    example?: string;
    audioUrl?: string;
  };
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
}

export interface DifficultySettings {
  totalQuestions: number;
  timeLimit: number;
  aiAccuracy: number;
  aiDelay: [number, number];
  vocabFilter: (word: string) => boolean;
}

export interface PvPScoreRecord {
  userScore: number;
  oppScore: number;
  userStreak: number;
  userLives: number;
  oppLives: number;
}
