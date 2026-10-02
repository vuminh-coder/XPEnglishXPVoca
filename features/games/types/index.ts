export type GameMode = "scramble" | "memory" | "wordle" | "blitz" | "sentence" | "picture";

export interface GameReviewItem {
  id?: string;
  word: string;
  phonetic?: string;
  definitionVn: string;
  pos?: string;
  imageUrl?: string;
  example?: string;
  exampleTranslation?: string;
  isCorrect: boolean;
  userAnswer?: string;
  correctAnswer?: string;
}

export interface PictureQuizQuestion {
  id: string;
  word: string;
  phonetic: string;
  pos?: string;
  definitionVn: string;
  imageUrl: string;
  example?: string;
  options: { word: string; definitionVn: string; isCorrect: boolean }[];
}

export interface ScrambleWordPackage {
  id?: string;
  word: string;
  definitionVn: string;
  scrambled: string;
  phonetic?: string;
  pos?: string;
  examples?: string[];
}

export interface MemoryCard {
  id: number;
  text: string;
  pairId: string;
  type: "word" | "definition";
  phonetic?: string;
  flipped: boolean;
  matched: boolean;
}

export type WordleLetterStatus = "correct" | "present" | "absent" | "empty";

export interface WordleRowState {
  letters: string[];
  statuses: WordleLetterStatus[];
}

export interface SpeedBlitzQuestion {
  id?: string;
  word: string;
  phonetic?: string;
  pos?: string;
  correctDef: string;
  options: string[];
  example?: string;
}

export interface SentenceScramblePackage {
  id?: string;
  originalSentence: string;
  translationVn: string;
  tokens: string[];
  hintWord?: string;
}

export interface GameRecordPayload {
  gameType: GameMode;
  score: number;
  xpGained: number;
  wordsCompleted?: number;
  moves?: number;
  attempts?: number;
  accuracy?: number;
  durationSeconds?: number;
}

