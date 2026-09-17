export type GameMode =
  | "scramble"
  | "memory"
  | "wordle"
  | "blitz"
  | "sentence"
  | "chain";

export interface ScrambleWordPackage {
  word: string;
  definitionVn: string;
  scrambled: string;
  ipa?: string;
}

export interface MemoryCard {
  id: number;
  text: string;
  pairId: string;
  flipped: boolean;
  matched: boolean;
}

export type WordleLetterStatus = "correct" | "present" | "absent" | "empty";

export interface WordleRowState {
  letters: string[];
  statuses: WordleLetterStatus[];
}

export interface BlitzFallingWord {
  id: string;
  word: string;
  definitionVn: string;
  y: number; // percentage from top 0 to 100
  x: number; // percentage from left 10 to 80
  speed: number;
}

export interface SentenceScramblePackage {
  id: string;
  originalSentence: string;
  vietnameseMeaning: string;
  tokens: string[];
  grammarNote?: string;
}

export interface WordChainEntry {
  id: string;
  word: string;
  playedBy: "player" | "ai";
  definitionVn?: string;
  ipa?: string;
}

export interface GameRecordPayload {
  gameType: GameMode;
  score: number;
  xpGained: number;
  coinsGained?: number;
  wordsCompleted?: number;
  moves?: number;
  highestStreak?: number;
}
