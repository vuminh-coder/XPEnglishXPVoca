const part1 = require('./basic_themes_1_15.js');
const part2 = require('./basic_themes_16_30.js');
const part3 = require('./basic_themes_31_45.js');
const part4 = require('./basic_themes_46_60.js');

module.exports = {
  RAW_THEMES_DATA: {
    ...part1.THEMES_1_15,
    ...part2.THEMES_16_30,
    ...part3.THEMES_31_45,
    ...part4.THEMES_46_60
  }
};
