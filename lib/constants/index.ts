import { BASIC_VOCABULARY_THEMES } from "@/lib/data/basicVocabularies";
import { ADVANCED_VOCABULARY_THEMES } from "@/lib/data/advancedVocabularies";

export const LEVEL_XP = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200, 7600, 9200, 11000];

export const LEVEL_TITLES: Record<number, string> = {
  1: 'Newbie',
  2: 'Beginner',
  3: 'Learner',
  4: 'Student',
  5: 'Word Explorer',
  6: 'Vocabulary Builder',
  7: 'Rising Star',
  8: 'Word Crafter',
  9: 'Vocabulary Master',
  10: 'Word Wizard',
  11: 'Word Wizard',
  12: 'Language Legend',
  13: 'Language Legend',
  14: 'Vocabulary Sage',
  15: 'Grandmaster'
};

export const MOCK_THEMES = [
  ...BASIC_VOCABULARY_THEMES.map((bt) => ({
    id: bt.id,
    name: bt.name,
    nameEn: bt.nameEn,
    icon: bt.icon,
    difficulty: bt.difficulty,
    totalVocabs: bt.totalVocabs,
    color: bt.color,
  })),
  ...ADVANCED_VOCABULARY_THEMES.map((at) => ({
    id: at.id,
    name: at.name,
    nameEn: at.nameEn,
    icon: at.icon,
    difficulty: at.difficulty,
    totalVocabs: at.totalVocabs,
    color: at.color,
  })),
];
