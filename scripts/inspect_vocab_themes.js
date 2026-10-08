const fs = require('fs');

const content = fs.readFileSync('features/vocabulary/data/basicVocabularies.ts', 'utf8');

// Find all themes
const themeMatch = content.match(/export const BASIC_VOCABULARY_THEMES: BasicTheme\[\] = (\[[\s\S]*?\]);/);
let themes = [];
if (themeMatch) {
  themes = JSON.parse(themeMatch[1]);
}
console.log('Total themes:', themes.length);

// Extract vocabs
const vocabMatch = content.match(/export const BASIC_VOCABULARIES: BasicVocabularyItem\[\] = (\[[\s\S]*?\]);/);
if (vocabMatch) {
  const vocabs = JSON.parse(vocabMatch[1]);
  console.log('Total vocabs:', vocabs.length);
  
  const themeMap = new Map();
  vocabs.forEach(v => {
    if (!themeMap.has(v.themeId)) {
      themeMap.set(v.themeId, []);
    }
    themeMap.get(v.themeId).push(v);
  });
  
  console.log('Theme count in vocabs:', themeMap.size);
  themes.forEach(t => {
    const count = (themeMap.get(t.id) || []).length;
    console.log(`${t.id} | ${t.name} (${t.nameEn}): ${count} items`);
  });
}
