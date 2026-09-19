const fs = require('fs');

const content = fs.readFileSync('./lib/data/basicVocabularies.ts', 'utf8');
const markerStart = 'export const BASIC_VOCABULARIES: BasicVocabularyItem[] = ';
const markerEnd = 'export function getBasicVocabulariesByTheme';

const idxStart = content.indexOf(markerStart);
const idxEnd = content.indexOf(markerEnd);

let arrayStr = content.substring(idxStart + markerStart.length, idxEnd).trim();
if (arrayStr.endsWith(';')) arrayStr = arrayStr.slice(0, -1).trim();

// find last index of ']'
const lastBracket = arrayStr.lastIndexOf(']');
console.log('lastBracket at:', lastBracket, 'total length:', arrayStr.length);
if (lastBracket !== -1) {
  const afterBracket = arrayStr.substring(lastBracket + 1);
  console.log('After bracket:', JSON.stringify(afterBracket));
  const validJson = arrayStr.substring(0, lastBracket + 1);
  try {
    const vocabs = JSON.parse(validJson);
    console.log('Parsed successfully! Count:', vocabs.length);
    const themeCounts = {};
    vocabs.forEach(v => {
      themeCounts[v.themeId] = (themeCounts[v.themeId] || 0) + 1;
    });
    console.log('Total themes:', Object.keys(themeCounts).length);
    Object.entries(themeCounts).forEach(([tid, count], idx) => {
      console.log(`  ${idx + 1}. ${tid}: ${count} words`);
    });
  } catch (e) {
    console.error('Parse error with substring:', e.message);
  }
}
