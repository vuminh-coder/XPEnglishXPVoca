import { BASIC_VOCABULARIES, BASIC_VOCABULARY_THEMES } from '../lib/data/basicVocabularies';

console.log(`Themes count: ${BASIC_VOCABULARY_THEMES.length}`);
console.log(`Vocabularies count: ${BASIC_VOCABULARIES.length}`);

const themeMap: Record<string, number> = {};
BASIC_VOCABULARIES.forEach(v => {
  themeMap[v.themeId] = (themeMap[v.themeId] || 0) + 1;
});

console.log('Themes breakdown:');
Object.entries(themeMap).forEach(([t, count]) => {
  console.log(`${t}: ${count}`);
});
