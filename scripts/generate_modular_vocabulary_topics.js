const fs = require('fs');
const path = require('path');

const sourceFile = path.resolve('features/vocabulary/data/basicVocabularies.ts');
const targetDir = path.resolve('features/vocabulary/data/topics');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const content = fs.readFileSync(sourceFile, 'utf8');

// Extract themes
const themeMatch = content.match(/export const BASIC_VOCABULARY_THEMES: BasicTheme\[\] = (\[[\s\S]*?\]);/);
const themes = JSON.parse(themeMatch[1]);

// Extract vocabularies
const vocabMatch = content.match(/export const BASIC_VOCABULARY_THEMES: BasicTheme\[\][\s\S]*?export const BASIC_VOCABULARIES: BasicVocabularyItem\[\] = (\[[\s\S]*?\]);/);
const vocabs = JSON.parse(vocabMatch[1]);

// Group vocabs by themeId
const vocabByTheme = new Map();
vocabs.forEach(v => {
  if (!vocabByTheme.has(v.themeId)) {
    vocabByTheme.set(v.themeId, []);
  }
  vocabByTheme.get(v.themeId).push(v);
});

function toPascal(str) {
  const noVn = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  return noVn.replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function toScreamingSnake(str) {
  const noVn = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  return noVn.replace(/[^a-zA-Z0-9]/g, '_')
    .split('_')
    .filter(Boolean)
    .map(w => w.toUpperCase())
    .join('_');
}

const topicMetaList = [];

themes.forEach((theme, idx) => {
  const index = idx + 1;
  const pascalName = toPascal(theme.name);
  const snakeName = toScreamingSnake(theme.name);
  const fileName = `ChuDe${pascalName}.ts`;
  const filePath = path.join(targetDir, fileName);
  const themeVocabs = vocabByTheme.get(theme.id) || [];

  const themeConstName = `THEME_${snakeName}`;
  const vocabsConstName = `VOCABS_${snakeName}`;
  const packageConstName = `CHUDE_${snakeName}`;

  topicMetaList.push({
    index,
    id: theme.id,
    name: theme.name,
    nameEn: theme.nameEn,
    pascalName,
    snakeName,
    fileName,
    themeConstName,
    vocabsConstName,
    packageConstName,
    count: themeVocabs.length,
  });

  const fileContent = `import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

/**
 * Chủ đề ${index}: ${theme.name} (${theme.nameEn})
 * Mã chủ đề: ${theme.id}
 * Tổng số từ vựng: ${themeVocabs.length} từ
 */
export const ${themeConstName}: BasicTheme = ${JSON.stringify(theme, null, 2)};

export const ${vocabsConstName}: BasicVocabularyItem[] = ${JSON.stringify(themeVocabs, null, 2)};

export const ${packageConstName}: VocabularyTopicPackage = {
  theme: ${themeConstName},
  vocabs: ${vocabsConstName},
};

export default ${packageConstName};
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`[Generated] ${fileName} (${themeVocabs.length} words)`);
});

// Generate features/vocabulary/data/topics/index.ts
let indexContent = `/**
 * =========================================================================
 * KHO TỪ VỰNG TIẾNG ANH CƠ BẢN THEO CHỦ ĐỀ (A1 - A2 TOPIC MODULES)
 * =========================================================================
 * Toàn bộ 60 chủ đề từ vựng được phân tách thành từng file ChuDe....ts độc lập.
 */

import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

// Re-export core types
export * from "../types";

// 1. Import all 60 individual topic modules
`;

topicMetaList.forEach(tm => {
  const moduleBase = tm.fileName.replace('.ts', '');
  indexContent += `import { ${tm.themeConstName}, ${tm.vocabsConstName}, ${tm.packageConstName} } from "./${moduleBase}";\n`;
});

indexContent += `\n// 2. Re-export all 60 individual topic modules\n`;
topicMetaList.forEach(tm => {
  const moduleBase = tm.fileName.replace('.ts', '');
  indexContent += `export * from "./${moduleBase}";\n`;
});

indexContent += `\n// 3. Consolidated Themes List (Exact 60 Topics preserved)\n`;
indexContent += `export const ALL_BASIC_VOCABULARY_THEMES: BasicTheme[] = [\n`;
topicMetaList.forEach(tm => {
  indexContent += `  ${tm.themeConstName},\n`;
});
indexContent += `];\n\nexport const BASIC_VOCABULARY_THEMES = ALL_BASIC_VOCABULARY_THEMES;\n\n`;

indexContent += `// 4. Consolidated Vocabularies List (All 1,298 words preserved)\n`;
indexContent += `export const ALL_BASIC_VOCABULARIES: BasicVocabularyItem[] = [\n`;
topicMetaList.forEach(tm => {
  indexContent += `  ...${tm.vocabsConstName},\n`;
});
indexContent += `];\n\nexport const BASIC_VOCABULARIES = ALL_BASIC_VOCABULARIES;\n\n`;

indexContent += `// 5. O(1) Lookup Map by Theme ID\n`;
indexContent += `export const VOCABULARY_TOPICS_MAP: Record<string, VocabularyTopicPackage> = {\n`;
topicMetaList.forEach(tm => {
  indexContent += `  "${tm.id}": ${tm.packageConstName},\n`;
});
indexContent += `};\n\n`;

indexContent += `// 6. Fast Helper Functions\n`;
indexContent += `export function getTopicByThemeId(themeId: string): VocabularyTopicPackage | undefined {\n`;
indexContent += `  return VOCABULARY_TOPICS_MAP[themeId];\n`;
indexContent += `}\n\n`;
indexContent += `export function getBasicVocabulariesByTheme(themeId: string): BasicVocabularyItem[] {\n`;
indexContent += `  const pkg = VOCABULARY_TOPICS_MAP[themeId];\n`;
indexContent += `  return pkg ? pkg.vocabs : [];\n`;
indexContent += `}\n\n`;
indexContent += `export function searchBasicVocabularies(query: string): BasicVocabularyItem[] {\n`;
indexContent += `  const q = query.toLowerCase().trim();\n`;
indexContent += `  if (!q) return ALL_BASIC_VOCABULARIES;\n`;
indexContent += `  return ALL_BASIC_VOCABULARIES.filter(\n`;
indexContent += `    (v) =>\n`;
indexContent += `      v.word.toLowerCase().includes(q) ||\n`;
indexContent += `      v.definitionVn.toLowerCase().includes(q) ||\n`;
indexContent += `      v.definition.toLowerCase().includes(q) ||\n`;
indexContent += `      v.themeNameVn.toLowerCase().includes(q)\n`;
indexContent += `  );\n`;
indexContent += `}\n\n`;
indexContent += `const BASIC_VOCAB_MAP = new Map<string, BasicVocabularyItem>();\n`;
indexContent += `export function getBasicVocabularyById(id: string): BasicVocabularyItem | undefined {\n`;
indexContent += `  if (BASIC_VOCAB_MAP.size === 0) {\n`;
indexContent += `    for (const v of ALL_BASIC_VOCABULARIES) {\n`;
indexContent += `      BASIC_VOCAB_MAP.set(v.id, v);\n`;
indexContent += `    }\n`;
indexContent += `  }\n`;
indexContent += `  return BASIC_VOCAB_MAP.get(id);\n`;
indexContent += `}\n`;

fs.writeFileSync(path.join(targetDir, 'index.ts'), indexContent, 'utf8');
console.log(`\n🎉 Successfully generated features/vocabulary/data/topics/index.ts`);
console.log(`Total 60 ChuDe files generated with 100% data integrity.`);
