/**
 * Core Vocabulary Types & Interfaces
 */

export interface BasicVocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  definition: string;
  definitionVn: string;
  pos: "noun" | "verb" | "adj" | "adverb" | "pronoun" | "preposition" | "interjection" | "phrase";
  difficulty: 1;
  frequency: number;
  themeId: string;
  themeNameVn: string;
  themeNameEn: string;
  examples: string[];
  exampleTranslations?: string[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface BasicTheme {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  difficulty: 1;
  totalVocabs: number;
  color: string;
  description: string;
}

export interface VocabularyTopicPackage {
  theme: BasicTheme;
  vocabs: BasicVocabularyItem[];
}
