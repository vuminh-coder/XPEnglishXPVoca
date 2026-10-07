const fs = require('fs');

const sub = JSON.parse(fs.readFileSync('scripts/kurzgesagt_raw.en.json3', 'utf8'));
const lines = sub.events.filter(e => e.segs).map(e => ({
  start: e.tStartMs / 1000,
  duration: e.dDurationMs / 1000,
  end: (e.tStartMs + e.dDurationMs) / 1000,
  text: e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
})).filter(l => l.text);

const calibrated = JSON.parse(fs.readFileSync('scripts/kurzgesagt_21_calibrated.json', 'utf8'));

console.log('Verifying all 21 segments against official YouTube subtitles:');

// Official groups corresponding to our 21 sentences:
const segMap = [
  [0],
  [1, 2],
  [3, 4],
  [5, 6],
  [7],
  [8],
  [9, 10],
  [11],
  [12],
  [13],
  [14, 15],
  [16, 17],
  [18, 19],
  [20, 21, 22],
  [23],
  [24],
  [25],
  [26],
  [27, 28],
  [29],
  [30, 31, 32]
];

let allMatch = true;

for (let i = 0; i < 21; i++) {
  const segs = segMap[i];
  const offText = segs.map(idx => lines[idx].text).join(' ');
  const calText = calibrated[i].text;
  const match = offText.toLowerCase().replace(/[^a-z0-9]/g, '') === calText.toLowerCase().replace(/[^a-z0-9]/g, '');
  console.log(`\nSentence ${i + 1}:`);
  console.log(`  Official  : "${offText}"`);
  console.log(`  Calibrated: "${calText}"`);
  console.log(`  Match: ${match ? '✅ EXACT 100%' : '❌ MISMATCH'}`);
  if (!match) allMatch = false;
}

console.log('\n=======================================');
console.log('Overall Match Result:', allMatch ? '100% IDENTICAL' : 'HAS DIFFERENCES');
