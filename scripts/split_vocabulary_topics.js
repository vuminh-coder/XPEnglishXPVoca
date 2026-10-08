const fs = require('fs');
const path = require('path');

const sourceFile = path.resolve('features/vocabulary/data/basicVocabularies.ts');
const content = fs.readFileSync(sourceFile, 'utf8');

// Extract themes
const themeMatch = content.match(/export const BASIC_VOCABULARY_THEMES: BasicTheme\[\] = (\[[\s\S]*?\]);/);
if (!themeMatch) {
  console.error('Failed to match BASIC_VOCABULARY_THEMES');
  process.exit(1);
}
const themes = JSON.parse(themeMatch[1]);

// Extract vocabularies
const vocabMatch = content.match(/export const BASIC_VOCABULARIES: BasicVocabularyItem\[\] = (\[[\s\S]*?\]);/);
if (!vocabMatch) {
  console.error('Failed to match BASIC_VOCABULARIES');
  process.exit(1);
}
const vocabs = JSON.parse(vocabMatch[1]);

console.log(`[Validation] Themes found: ${themes.length}`);
console.log(`[Validation] Total Vocabs found: ${vocabs.length}`);

// Group vocabs by themeId
const vocabByTheme = new Map();
vocabs.forEach(v => {
  if (!vocabByTheme.has(v.themeId)) {
    vocabByTheme.set(v.themeId, []);
  }
  vocabByTheme.get(v.themeId).push(v);
});

// PascalCase converter
function toPascal(str) {
  const noVn = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  return noVn.replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

// SCREAMING_SNAKE_CASE converter
function toScreamingSnake(str) {
  const noVn = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  return noVn.replace(/[^a-zA-Z0-9]/g, '_')
    .split('_')
    .filter(Boolean)
    .map(w => w.toUpperCase())
    .join('_');
}

const topicMapping = themes.map((theme, idx) => {
  const pascalName = toPascal(theme.name);
  const snakeName = toScreamingSnake(theme.name);
  const fileName = `ChuDe${pascalName}.ts`;
  const themeVocabs = vocabByTheme.get(theme.id) || [];
  return {
    index: idx + 1,
    id: theme.id,
    name: theme.name,
    nameEn: theme.nameEn,
    pascalName,
    snakeName,
    fileName,
    theme,
    vocabs: themeVocabs,
  };
});

// Check if all 60 themes have vocabs
let totalCheckVocabs = 0;
topicMapping.forEach(tm => {
  totalCheckVocabs += tm.vocabs.length;
  if (tm.vocabs.length === 0) {
    console.error(`Theme ${tm.id} has NO vocabs!`);
  }
});

console.log(`[Validation] Total aggregated vocabs across 60 themes: ${totalCheckVocabs}`);
if (totalCheckVocabs !== vocabs.length) {
  console.error(`Mismatch! Expected ${vocabs.length}, got ${totalCheckVocabs}`);
  process.exit(1);
} else {
  console.log('✅ Validation 100% matched! Ready for splitting.');
}
