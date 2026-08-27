const fs = require('fs');

const bvContent = fs.readFileSync('./lib/data/basicVocabularies.ts', 'utf8');
const lines = bvContent.split('\n');
console.log('basicVocabularies.ts total lines:', lines.length);

const part1 = require('./basic_themes_1_15.js');
const part2 = require('./basic_themes_16_30.js');
const part3 = require('./basic_themes_31_45.js');
const part4 = require('./basic_themes_46_60.js');

const rawData = {
  ...part1.THEMES_1_15,
  ...part2.THEMES_16_30,
  ...part3.THEMES_31_45,
  ...part4.THEMES_46_60
};

let totalRaw = 0;
const counts = {};
Object.entries(rawData).forEach(([k, v]) => {
  counts[k] = v.length;
  totalRaw += v.length;
});

console.log('Total themes in raw data:', Object.keys(counts).length);
console.log('Total words in raw themes:', totalRaw);

// Check extra pools
const pools = [
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

pools.forEach(p => {
  try {
    const mod = require(p);
    const keys = Object.keys(mod);
    let totalItems = 0;
    keys.forEach(k => {
      if (Array.isArray(mod[k])) totalItems += mod[k].length;
      else if (typeof mod[k] === 'object' && mod[k] !== null) {
        Object.values(mod[k]).forEach(arr => {
          if (Array.isArray(arr)) totalItems += arr.length;
        });
      }
    });
    console.log(`Pool ${p}: keys=${keys.join(',')}, totalItems=${totalItems}`);
  } catch (e) {
    console.log(`Pool ${p}: error ${e.message}`);
  }
});
