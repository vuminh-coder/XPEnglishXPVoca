const fs = require('fs');

const content = fs.readFileSync('./lib/data/basicVocabularies.ts', 'utf8');

// Parse BASIC_VOCABULARIES items
// Let's count items per themeId
const themeCounts = {};
const themeWords = {};

const itemRegex = /id:\s*"(bv_[^"]+)",\s*word:\s*"([^"]+)",[\s\S]*?themeId:\s*"([^"]+)"/g;
let match;
let count = 0;
while ((match = itemRegex.exec(content)) !== null) {
  count++;
  const id = match[1];
  const word = match[2];
  const themeId = match[3];
  themeCounts[themeId] = (themeCounts[themeId] || 0) + 1;
  if (!themeWords[themeId]) themeWords[themeId] = [];
  themeWords[themeId].push(word);
}

console.log('Total items found in basicVocabularies.ts:', count);
console.log('Total unique themes found:', Object.keys(themeCounts).length);
console.log('Counts per theme:', themeCounts);
