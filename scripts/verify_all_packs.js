const pack1 = require('./extra_words_pool.js');
const pack2 = require('./expansion_pack_16_30.js');
const pack3 = require('./expansion_pack_31_45.js');
const pack4 = require('./expansion_pack_46_60.js');

const allPacks = { ...pack1, ...pack2, ...pack3, ...pack4 };
const allThemeKeys = Object.keys(allPacks);
console.log(`Total expanded themes configured: ${allThemeKeys.length}`);

let totalExtra = 0;
allThemeKeys.forEach((key, index) => {
  const count = allPacks[key].length;
  totalExtra += count;
  console.log(`${index + 1}. ${key}: +${count} words`);
});

console.log(`Total Extra Words across all 60 themes: ${totalExtra}`);
