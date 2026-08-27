const part1 = require('./basic_themes_1_15.js');
const part2 = require('./basic_themes_16_30.js');
const part3 = require('./basic_themes_31_45.js');
const part4 = require('./basic_themes_46_60.js');

console.log('Part 1 themes:', Object.keys(part1.THEMES_1_15 || {}));
console.log('Part 2 themes:', Object.keys(part2.THEMES_16_30 || {}));
console.log('Part 3 themes:', Object.keys(part3.THEMES_31_45 || {}));
console.log('Part 4 themes:', Object.keys(part4.THEMES_46_60 || {}));
