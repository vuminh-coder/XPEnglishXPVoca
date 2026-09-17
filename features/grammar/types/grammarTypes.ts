export type GrammarLevel = "basic" | "intermediate" | "advanced";

export interface GrammarTopic {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  desc: string;
  level: GrammarLevel;
  focus: string;
}

export interface GrammarExample {
  en: string;
  vi: string;
  highlight: string;
}

export interface GrammarMistake {
  wrong: string;
  correct: string;
  explanation: string;
}

export interface GrammarUsage {
  context: string; // e.g. "IELTS Writing Task 1", "TOEIC Part 5 & 6"
  example: string;
  note?: string;
}

export interface GrammarLesson {
  topicId: string;
  title: string;
  titleEn: string;
  formulas: string[];
  usages: GrammarUsage[];
  examples: GrammarExample[];
  commonMistakes: GrammarMistake[];
  memoryTip: string;
  signalWords: string[];
  extraRules?: string[];
}

export interface GrammarExercise {
  id: number;
  sentence: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  difficulty?: string;
}

export interface GrammarQuizResult {
  topicId: string;
  correctCount: number;
  totalCount: number;
  percent: number;
  completedAt: string;
}

export interface GrammarChatMessage {
  role: "user" | "ai";
  text: string;
}

export type GrammarTopicStatus = "unstarted" | "in_progress" | "completed";
