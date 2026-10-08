const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/bbc_laughter_medicine.en-GB.json3', 'utf8'));
const calibrated = JSON.parse(fs.readFileSync('scripts/bbc_laugh_18_calibrated.json', 'utf8'));

// Get all text from raw events between 2.78s and 105.5s (events 0 to 58)
const events = raw.events.filter(e => e.segs && e.tStartMs >= 2000 && e.tStartMs <= 105500);

const rawWords = [];
events.forEach((e, idx) => {
  const t = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ');
  t.trim().split(/\s+/).forEach(w => {
    if (w) rawWords.push({ word: w, eventIdx: idx, time: e.tStartMs });
  });
});

const calWords = [];
calibrated.forEach((c, cIdx) => {
  c.text.trim().split(/\s+/).forEach(w => {
    if (w) calWords.push({ word: w, segIdx: cIdx, startTime: c.startTime, endTime: c.endTime });
  });
});

console.log('Raw words count:', rawWords.length);
console.log('Calibrated words count:', calWords.length);

let rIdx = 0;
let cIdx = 0;

while (rIdx < rawWords.length || cIdx < calWords.length) {
  const rw = rawWords[rIdx] ? rawWords[rIdx].word.replace(/[.,!?:;\"\'\(\)]/g, '').toLowerCase() : '<EOF>';
  const cw = calWords[cIdx] ? calWords[cIdx].word.replace(/[.,!?:;\"\'\(\)]/g, '').toLowerCase() : '<EOF>';
  
  if (rw === cw) {
    rIdx++;
    cIdx++;
  } else {
    console.log(`Mismatch at rIdx=${rIdx} (raw="${rawWords[rIdx]?.word}" at ${(rawWords[rIdx]?.time/1000).toFixed(2)}s) vs cIdx=${cIdx} (cal="${calWords[cIdx]?.word}" in Seg #${calWords[cIdx]?.segIdx + 1})`);
    console.log(`  Raw context:`, rawWords.slice(Math.max(0, rIdx-3), rIdx+4).map(x => x.word).join(' '));
    console.log(`  Cal context:`, calWords.slice(Math.max(0, cIdx-3), cIdx+4).map(x => x.word).join(' '));
    break;
  }
}
