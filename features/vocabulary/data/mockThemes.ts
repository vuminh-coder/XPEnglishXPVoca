import { BASIC_VOCABULARY_THEMES } from "./themes";
import { ADVANCED_VOCABULARY_THEMES } from "./advancedVocabularies";

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
