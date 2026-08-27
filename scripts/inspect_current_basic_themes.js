const fs = require('fs');

const raw = fs.readFileSync('lib/data/basicVocabularies.ts', 'utf-8');
const themeMatch = raw.match(/export const BASIC_VOCABULARY_THEMES: BasicTheme\[\] = (\[[\s\S]*?\]);/);

if (themeMatch) {
  const themes = JSON.parse(themeMatch[1]);
  console.log(`Found ${themes.length} themes in basicVocabularies.ts:`);
  themes.forEach((t, i) => console.log(`${i+1}: ${t.id} -> ${t.name}`));
}
