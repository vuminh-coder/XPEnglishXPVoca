export interface Goal {
  id: string;
  name: string;
  nameEn: string;
  keywords: string[];
}

export interface SuggestedWord {
  word: string;
  meaning?: string;
}

export interface Topic {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  goals: Goal[];
  welcomeMessage: { text: string; vi: string };
  suggestions: string[];
  suggestedWords: SuggestedWord[];
  advice: string;
}

export interface GrammarCorrection {
  hasError?: boolean;
  original: string;
  corrected: string;
  explanation: string;
}

export interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
  vietnameseTranslation?: string;
  grammarCorrection?: GrammarCorrection;
  betterPhrasing?: string;
  suggestedWords?: SuggestedWord[];
  suggestedPhrases?: string[];
}

export interface SessionEvaluation {
  overallScore: number;
  grade: 'S' | 'A' | 'B' | 'C';
  label: string;
  color: string;
  xpAward: number;
  goalsScore: number;
  grammarScore: number;
  interactionScore: number;
  vocabScore: number;
}

export interface WordLookupData {
  word: string;
  ipa?: string;
  meaning?: string;
  example?: string;
}

export interface PastSession {
  sessionId: string;
  topicId: string;
  messages: Message[];
  timeSpentSeconds: number;
  overallScore?: number;
  grade?: string;
  xpEarned?: number;
  createdAt?: string;
}
