const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve(__dirname, '../lib/data/basicVocabularies.ts'), 'utf8');

const markerStart = 'export const BASIC_VOCABULARIES: BasicVocabularyItem[] = ';
const markerEnd = 'export function getBasicVocabulariesByTheme';
const idxStart = content.indexOf(markerStart);
const idxEnd = content.indexOf(markerEnd);
let arrayStr = content.substring(idxStart + markerStart.length, idxEnd).trim();
if (arrayStr.endsWith(';')) arrayStr = arrayStr.slice(0, -1).trim();
const lastBracket = arrayStr.lastIndexOf(']');
const existingVocabs = JSON.parse(arrayStr.substring(0, lastBracket + 1));

const themesMarkerStart = 'export const BASIC_VOCABULARY_THEMES: BasicTheme[] = ';
const themesMarkerEnd = 'export const BASIC_VOCABULARIES: BasicVocabularyItem[] = ';
const idxTStart = content.indexOf(themesMarkerStart);
const idxTEnd = content.indexOf(themesMarkerEnd);
let themesStr = content.substring(idxTStart + themesMarkerStart.length, idxTEnd).trim();
if (themesStr.endsWith(';')) themesStr = themesStr.slice(0, -1).trim();
const themesLastBracket = themesStr.lastIndexOf(']');
const themesList = JSON.parse(themesStr.substring(0, themesLastBracket + 1));

const themeWordsMap = {};
themesList.forEach(t => {
  themeWordsMap[t.id] = new Map();
});

existingVocabs.forEach(v => {
  if (themeWordsMap[v.themeId]) {
    themeWordsMap[v.themeId].set(v.word.toLowerCase().trim(), v);
  }
});

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

const poolFiles = [
  './extra_pool_1_15.js',
  './extra_pool_16_30.js',
  './extra_pool_31_45.js',
  './extra_pool_46_60.js',
  './universal_top_up_pool.js',
  './final_mega_booster.js',
  './fresh_pool_16_30.js',
  './fresh_pool_24_35.js',
  './fresh_pool_31_45.js',
  './fresh_pool_36_45.js',
  './fresh_pool_41_50.js',
  './fresh_pool_51_60.js',
  './expansion_pack_1_15.js',
  './expansion_pack_16_30.js',
  './expansion_pack_31_45.js',
  './expansion_pack_46_60.js',
  './extra_words_pool.js',
  './huge_pool_1_15.js',
  './master_expansion_data.js',
  './master_expansion_data_part2.js'
];

poolFiles.forEach(file => {
  try {
    const fullPath = path.resolve(__dirname, file);
    if (!fs.existsSync(fullPath)) return;
    const mod = require(fullPath);
    function processObject(obj) {
      if (!obj || typeof obj !== 'object') return;
      Object.entries(obj).forEach(([key, val]) => {
        const themeId = resolveThemeId(key);
        if (themeId && Array.isArray(val)) {
          val.forEach(item => {
            if (!item || !item.word) return;
            const wKey = item.word.toLowerCase().trim();
            if (!themeWordsMap[themeId].has(wKey)) {
              themeWordsMap[themeId].set(wKey, item);
            }
          });
        } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          processObject(val);
        }
      });
    }
    processObject(mod);
  } catch(e) {}
});

console.log('--- WORD COUNT PER THEME ---');
let total = 0;
themesList.forEach((t, i) => {
  const count = themeWordsMap[t.id].size;
  total += count;
  console.log(`${(i+1).toString().padStart(2, ' ')}. ${t.id.padEnd(35, ' ')} : ${count} words (${t.name})`);
});
console.log(`TOTAL: ${total} words across ${themesList.length} themes. Average: ${(total/themesList.length).toFixed(1)}`);
