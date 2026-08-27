const fs = require('fs');

const content = fs.readFileSync('./lib/data/basicVocabularies.ts', 'utf8');
const markerStart = 'export const BASIC_VOCABULARIES: BasicVocabularyItem[] = ';
const markerEnd = 'export function getBasicVocabulariesByTheme';

const idxStart = content.indexOf(markerStart);
const idxEnd = content.indexOf(markerEnd);
const arrayStr = content.substring(idxStart + markerStart.length, idxEnd).trim();
const lastBracket = arrayStr.lastIndexOf(']');
const existingVocabs = JSON.parse(arrayStr.substring(0, lastBracket + 1));

// Group existing by themeId and track existing word lowercases
const themeItems = {};
const existingWordSet = {};

existingVocabs.forEach(v => {
  if (!themeItems[v.themeId]) themeItems[v.themeId] = [];
  themeItems[v.themeId].push(v);
  if (!existingWordSet[v.themeId]) existingWordSet[v.themeId] = new Set();
  existingWordSet[v.themeId].add(v.word.toLowerCase().trim());
});

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
  './fresh_pool_51_60.js'
];

let totalAdded = 0;

poolFiles.forEach(file => {
  try {
    const mod = require(file);
    Object.entries(mod).forEach(([themeKey, items]) => {
      if (Array.isArray(items)) {
        if (!themeItems[themeKey]) themeItems[themeKey] = [];
        if (!existingWordSet[themeKey]) existingWordSet[themeKey] = new Set();
        
        items.forEach(it => {
          const w = (it.word || '').toLowerCase().trim();
          if (w && !existingWordSet[themeKey].has(w)) {
            existingWordSet[themeKey].add(w);
            themeItems[themeKey].push(it);
            totalAdded++;
          }
        });
      }
    });
  } catch (e) {
    console.error(`Error loading ${file}:`, e.message);
  }
});

console.log(`Initial words: ${existingVocabs.length}`);
console.log(`Total new unique words added from existing pools: ${totalAdded}`);

let grandTotal = 0;
let minWords = 999;
let maxWords = 0;

console.log('\nWord counts per theme after combining:');
Object.entries(themeItems).forEach(([tid, list], idx) => {
  grandTotal += list.length;
  if (list.length < minWords) minWords = list.length;
  if (list.length > maxWords) maxWords = list.length;
  console.log(`  ${idx + 1}. ${tid}: ${list.length} words`);
});

console.log(`\nGrand Total: ${grandTotal} words (Min: ${minWords}, Max: ${maxWords})`);
