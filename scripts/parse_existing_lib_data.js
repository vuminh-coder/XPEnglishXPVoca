const fs = require('fs');

const raw = fs.readFileSync('lib/data/basicVocabularies.ts', 'utf-8');
const itemsMatch = raw.match(/export const BASIC_VOCABULARIES: BasicVocabularyItem\[\] = (\[[\s\S]*?\]);\s*$/);

if (itemsMatch) {
  const items = eval(itemsMatch[1]);
  console.log(`Successfully parsed ${items.length} items from basicVocabularies.ts`);
  
  const themeCounts = {};
  items.forEach(it => {
    themeCounts[it.themeId] = (themeCounts[it.themeId] || 0) + 1;
  });
  
  console.log(`Themes found: ${Object.keys(themeCounts).length}`);
  Object.entries(themeCounts).forEach(([tid, cnt]) => {
    console.log(`${tid}: ${cnt} words`);
  });
}
