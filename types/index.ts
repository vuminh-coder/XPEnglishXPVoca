export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  level: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  avatarEmoji: string;
  bio: string;
  title: string;
  wordsLearned: number;
  wordsToReview: number;
  minutesStudied: number;
  imageUrl?: string;
  coins?: number;
  streakFreezes?: number;
}

export interface Vocabulary {
  id: string;
  word: string;
  phonetic: string;
  definition: string;
  definitionVn: string;
  pos: string;
  difficulty: number;
  frequency: number;
  themeId: string;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
}

export interface LearnedVocabulary {
  userId: string;
  vocabId: string;
  proficiency: number;
  lastPracticed: string | null;
  nextReview: string | null;
  isFavorite: boolean;
  word?: string;
  phonetic?: string;
  definition?: string;
  definitionVn?: string;
  pos?: string;
  difficulty?: number;
  frequency?: number;
  themeId?: string;
  examples?: string[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface Achievement {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  category: string;
  condition: { type: string; value: number };
  xpBonus: number;
}