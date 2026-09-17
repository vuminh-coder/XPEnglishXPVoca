export type GameMode = "scramble" | "memory" | "wordle";

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

export interface GameRecordPayload {
  gameType: GameMode;
  score: number;
  xpGained: number;
  wordsCompleted?: number;
  moves?: number;
}
