import mockVocabsData from "./mock-vocabularies.json";

export interface MockVocabularyItem {
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
  exampleTranslations?: string[];
  synonyms?: string[];
  antonyms?: string[];
}

export const MOCK_VOCABULARIES: MockVocabularyItem[] = mockVocabsData as MockVocabularyItem[];
