const fs = require('fs');
const path = require('path');

// 1. Load existing 1248 words from basicVocabularies.ts
const content = fs.readFileSync('./lib/data/basicVocabularies.ts', 'utf8');
const markerStart = 'export const BASIC_VOCABULARIES: BasicVocabularyItem[] = ';
const markerEnd = 'export function getBasicVocabulariesByTheme';
const idxStart = content.indexOf(markerStart);
const idxEnd = content.indexOf(markerEnd);
let arrayStr = content.substring(idxStart + markerStart.length, idxEnd).trim();
if (arrayStr.endsWith(';')) arrayStr = arrayStr.slice(0, -1).trim();
const lastBracket = arrayStr.lastIndexOf(']');
const existingVocabs = JSON.parse(arrayStr.substring(0, lastBracket + 1));

console.log('Loaded base vocabularies:', existingVocabs.length);

// Theme metadata mapping
const themeMetadata = {};
const themesMarkerStart = 'export const BASIC_VOCABULARY_THEMES: BasicTheme[] = ';
const themesMarkerEnd = 'export const BASIC_VOCABULARIES: BasicVocabularyItem[] = ';
const idxTStart = content.indexOf(themesMarkerStart);
const idxTEnd = content.indexOf(themesMarkerEnd);
let themesStr = content.substring(idxTStart + themesMarkerStart.length, idxTEnd).trim();
if (themesStr.endsWith(';')) themesStr = themesStr.slice(0, -1).trim();
const themesLastBracket = themesStr.lastIndexOf(']');
const themesList = JSON.parse(themesStr.substring(0, themesLastBracket + 1));

themesList.forEach(t => {
  themeMetadata[t.id] = {
    nameVn: t.name,
    nameEn: t.nameEn
  };
});

// Set up dictionary by theme
const themeWordsMap = {};
themesList.forEach(t => {
  themeWordsMap[t.id] = new Map();
});

// Seed with existing items
existingVocabs.forEach(v => {
  if (themeWordsMap[v.themeId]) {
    themeWordsMap[v.themeId].set(v.word.toLowerCase().trim(), v);
  }
});

// Alias mapping for pool files
const aliasMap = {
  't_basic_light_visual': 't_basic_light_visual_effects',
  't_basic_airport_flight': 't_basic_airport_station_travel',
  't_basic_hotel_stay': 't_basic_hotel_accommodation',
  't_basic_street_food_culture': 't_basic_street_food_snacks',
  't_basic_life_stages': 't_basic_life_stages_age',
  't_basic_holidays_festivals': 't_basic_holidays_customs',
  't_basic_safety_emergency': 't_basic_safety_warnings_rules'
};

function resolveThemeId(rawId) {
  if (themeWordsMap[rawId]) return rawId;
  if (aliasMap[rawId] && themeWordsMap[aliasMap[rawId]]) return aliasMap[rawId];
  return null;
}

// Pool files to ingest
const poolFiles = [
  './scripts/extra_pool_1_15.js',
  './scripts/extra_pool_16_30.js',
  './scripts/extra_pool_31_45.js',
  './scripts/extra_pool_46_60.js',
  './scripts/universal_top_up_pool.js',
  './scripts/final_mega_booster.js',
  './scripts/fresh_pool_16_30.js',
  './scripts/fresh_pool_24_35.js',
  './scripts/fresh_pool_31_45.js',
  './scripts/fresh_pool_36_45.js',
  './scripts/fresh_pool_41_50.js',
  './scripts/fresh_pool_51_60.js',
  './scripts/expansion_pack_1_15.js',
  './scripts/expansion_pack_16_30.js',
  './scripts/expansion_pack_31_45.js',
  './scripts/expansion_pack_46_60.js',
  './scripts/extra_words_pool.js',
  './scripts/huge_pool_1_15.js',
  './scripts/master_expansion_data.js',
  './scripts/master_expansion_data_part2.js'
];

poolFiles.forEach(file => {
  try {
    const fullPath = path.resolve(file);
    if (!fs.existsSync(fullPath)) return;
    const mod = require(fullPath);
    
    // Ingest keys
    function processObject(obj) {
      if (!obj || typeof obj !== 'object') return;
      Object.entries(obj).forEach(([key, val]) => {
        const themeId = resolveThemeId(key);
        if (themeId && Array.isArray(val)) {
          val.forEach(item => {
            if (!item || !item.word) return;
            const wKey = item.word.toLowerCase().trim();
            if (!themeWordsMap[themeId].has(wKey)) {
              // Convert to full BasicVocabularyItem
              const meta = themeMetadata[themeId] || { nameVn: '', nameEn: '' };
              const newItem = {
                id: `bv_${themeId.replace('t_basic_', '')}_${String(themeWordsMap[themeId].size + 1).padStart(2, '0')}`,
                word: item.word.trim(),
                phonetic: item.phonetic || '',
                definition: item.definition || item.def || '',
                definitionVn: item.definitionVn || item.defVn || item.meaning || '',
                pos: item.pos || 'noun',
                difficulty: 1,
                frequency: item.frequency || 5,
                themeId: themeId,
                themeNameVn: meta.nameVn,
                themeNameEn: meta.nameEn,
                examples: Array.isArray(item.examples) ? item.examples : (item.ex || []),
                exampleTranslations: Array.isArray(item.exampleTranslations) ? item.exampleTranslations : (item.exVn || []),
                synonyms: item.synonyms || [],
                antonyms: item.antonyms || []
              };
              themeWordsMap[themeId].set(wKey, newItem);
            }
          });
        } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          processObject(val);
        }
      });
    }

    processObject(mod);
  } catch (err) {
    console.error(`Error loading pool ${file}:`, err.message);
  }
});

// Summary
let totalCombined = 0;
const counts = [];
themesList.forEach((t, i) => {
  const count = themeWordsMap[t.id].size;
  totalCombined += count;
  counts.push({ id: t.id, name: t.name, count });
});

console.log('\n================ MERGED TOTALS ================');
console.log(`TOTAL THEMES: ${themesList.length}`);
console.log(`TOTAL WORDS: ${totalCombined}`);
console.log(`AVERAGE PER THEME: ${(totalCombined / themesList.length).toFixed(1)} words`);
console.log('-----------------------------------------------');
counts.sort((a, b) => a.count - b.count);
console.log('Top 5 lowest count themes:');
counts.slice(0, 10).forEach((c, idx) => console.log(`  ${idx + 1}. ${c.id} (${c.name}): ${c.count} words`));
console.log('Top 5 highest count themes:');
counts.slice(-5).reverse().forEach((c, idx) => console.log(`  ${idx + 1}. ${c.id} (${c.name}): ${c.count} words`));
