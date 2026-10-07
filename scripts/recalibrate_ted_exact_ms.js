const fs = require('fs');

const calibrated = JSON.parse(fs.readFileSync('scripts/ted_bilingual_18_calibrated.json', 'utf8'));

// Exact millisecond-aligned boundaries from official TED subtitles
const exactTimings = [
  { start: 6.60, end: 12.49 }, // #0: 6.635 - 12.495
  { start: 12.49, end: 18.33 }, // #1: 12.495 - 18.333
  { start: 18.33, end: 23.47 }, // #2: 18.333 - 23.469
  { start: 23.47, end: 27.47 }, // #3,4: 23.469 - 27.471
  { start: 27.47, end: 34.78 }, // #5,6: 27.471 - 34.777
  { start: 34.78, end: 38.27 }, // #7: 34.777 - 38.272
  { start: 38.27, end: 46.98 }, // #8,9: 38.272 - 46.985
  { start: 46.98, end: 52.38 }, // #10,11: 46.985 - 52.377
  { start: 52.38, end: 57.98 }, // #12,13: 52.377 - 57.981
  { start: 57.98, end: 64.92 }, // #14,15: 57.981 - 64.915
  { start: 64.92, end: 72.01 }, // #16,17: 64.915 - 72.007
  { start: 72.01, end: 80.30 }, // #18,19,20: 72.007 - 80.297
  { start: 80.30, end: 85.36 }, // #21,22: 80.297 - 85.358
  { start: 85.36, end: 91.34 }, // #23,24: 85.358 - 91.338
  { start: 91.34, end: 96.76 }, // #25,26: 91.338 - 96.764
  { start: 96.76, end: 106.20 }, // #27,28,29: 96.764 - 106.198
  { start: 106.20, end: 115.84 }, // #30,31,32: 106.198 - 115.843
  { start: 115.84, end: 125.72 }, // #33,34,35: 115.843 - 125.714
];

for (let i = 0; i < calibrated.length; i++) {
  calibrated[i].startTime = exactTimings[i].start;
  calibrated[i].endTime = exactTimings[i].end;
}

fs.writeFileSync('scripts/ted_bilingual_18_calibrated.json', JSON.stringify(calibrated, null, 2), 'utf8');
console.log('Successfully recalibrated scripts/ted_bilingual_18_calibrated.json to exact ms boundaries!');
