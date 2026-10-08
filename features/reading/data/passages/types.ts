export interface ReadingQuestion {
  id: string;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface ReadingVocab {
  word: string;
  ipa?: string;
  pos?: string;
  meaning: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  category: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Beginner" | "Intermediate" | "Advanced" | "Easy" | "Hard";
  icon: string;
  coverImage?: string;
  duration?: string;
  wordCount: number;
  passage: string;
  translation?: string;
  vocabularies?: ReadingVocab[];
  questions: ReadingQuestion[];
}
