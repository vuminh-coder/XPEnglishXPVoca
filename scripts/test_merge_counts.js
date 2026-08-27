const fsData = require('./generate_basic_data_part.js');
const rawThemes = fsData.RAW_THEMES_DATA;

const extraPool = require('./extra_words_pool.js').EXTRA_THEMES_VOCAB || require('./extra_words_pool.js');
const pack16_30 = require('./expansion_pack_16_30.js');
const pack31_45 = require('./expansion_pack_31_45.js');
const pack46_60 = require('./expansion_pack_46_60.js');

const aliasMap = {
  't_basic_light_visual': 't_basic_light_visual_effects',
  't_basic_airport_flight': 't_basic_airport_station_travel',
  't_basic_hotel_stay': 't_basic_hotel_accommodation',
  't_basic_street_food_culture': 't_basic_street_food_snacks',
  't_basic_life_stages': 't_basic_life_stages_age',
  't_basic_holidays_festivals': 't_basic_holidays_customs',
  't_basic_safety_emergency': 't_basic_safety_warnings_rules'
};

const allExtraPacks = [extraPool, pack16_30, pack31_45, pack46_60];

const mergedData = {};
let totalWords = 0;

Object.keys(rawThemes).forEach((themeId) => {
  const baseItems = rawThemes[themeId] || [];
  const wordsSet = new Set(baseItems.map(i => i.word.toLowerCase().trim()));
  const list = [...baseItems];

  allExtraPacks.forEach(pack => {
    // Check direct themeId or aliased themeId
    const extraItems = pack[themeId] || [];
    extraItems.forEach(item => {
      if (item && item.word && !wordsSet.has(item.word.toLowerCase().trim())) {
        wordsSet.add(item.word.toLowerCase().trim());
        list.push(item);
      }
    });

    // Also check reverse alias
    Object.entries(aliasMap).forEach(([shortId, longId]) => {
      if (longId === themeId && pack[shortId]) {
        pack[shortId].forEach(item => {
          if (item && item.word && !wordsSet.has(item.word.toLowerCase().trim())) {
            wordsSet.add(item.word.toLowerCase().trim());
            list.push(item);
          }
        });
      }
    });
  });

  mergedData[themeId] = list;
  totalWords += list.length;
  console.log(`${themeId}: ${list.length} words (base ${baseItems.length} + extras)`);
});

console.log(`\n--------------------------------------------`);
console.log(`TOTAL THEMES: ${Object.keys(mergedData).length}`);
console.log(`TOTAL WORDS: ${totalWords}`);
console.log(`AVERAGE PER THEME: ${(totalWords / Object.keys(mergedData).length).toFixed(1)} words/theme`);
