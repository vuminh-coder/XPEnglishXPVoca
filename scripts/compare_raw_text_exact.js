const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/ted_bilingual_raw.en.json3', 'utf8'));
const calibrated = JSON.parse(fs.readFileSync('scripts/ted_bilingual_18_calibrated.json', 'utf8'));

console.log('=== EXACT WORD-FOR-WORD TEXT AUDIT ===\n');

// Group raw events into 18 chunks matching our segments:
const groups = [
  [0],             // 1
  [1],             // 2
  [2],             // 3
  [3, 4],          // 4
  [5, 6],          // 5
  [7],             // 6
  [8, 9],          // 7
  [10, 11],        // 8
  [12, 13],        // 9
  [14, 15],        // 10
  [16, 17],        // 11
  [18, 19, 20],    // 12
  [21, 22],        // 13
  [23, 24],        // 14
  [25, 26],        // 15
  [27, 28, 29],    // 16
  [30, 31, 32],    // 17
  [33, 34, 35],    // 18
];

let mismatches = 0;

groups.forEach((g, idx) => {
  const rawText = g.map(evIdx => {
    const ev = raw.events[evIdx];
    return ev.segs ? ev.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim() : '';
  }).join(' ').replace(/\s+/g, ' ').trim();

  const calText = calibrated[idx].text.replace(/\s+/g, ' ').trim();

  // Normalize for comparison
  const normRaw = rawText.replace(/[\.,\?!:;"]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
  const normCal = calText.replace(/[\.,\?!:;"]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

  const isExact = normRaw === normCal;
  console.log(`[Seg #${idx + 1}]`);
  console.log(`  Raw Events : ${g.map(i => '#' + i).join(', ')}`);
  console.log(`  Raw Text   : "${rawText}"`);
  console.log(`  Cal Text   : "${calText}"`);
  console.log(`  Match      : ${isExact ? '✅ 100% EXACT VERBATIM' : '❌ MISMATCH'}`);

  if (!isExact) {
    console.log(`    Diff Raw: "${normRaw}"`);
    console.log(`    Diff Cal: "${normCal}"`);
    mismatches++;
  }
});

console.log(`\nTotal text mismatches: ${mismatches}`);
