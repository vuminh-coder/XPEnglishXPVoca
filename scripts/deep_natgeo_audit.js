const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/natgeo_renewable.en.json3', 'utf8'));
const calibrated = JSON.parse(fs.readFileSync('scripts/natgeo_25_calibrated.json', 'utf8'));

// Extract speech words from raw events between 1.44s and 172.5s
const rawWords = [];
raw.events.forEach(e => {
  if (!e.segs) return;
  const baseT = e.tStartMs;
  e.segs.forEach(s => {
    const text = s.utf8;
    if (!text || text === '\n') return;
    const offset = s.tOffsetMs || 0;
    const startMs = baseT + offset;
    const trimmed = text.trim();
    if (trimmed && trimmed !== '[Music]' && startMs < 173000) {
      rawWords.push({ word: trimmed, startMs });
    }
  });
});

const calWords = [];
calibrated.forEach((c, cIdx) => {
  const words = c.text.trim().split(/\s+/);
  words.forEach(w => {
    calWords.push({ word: w, segIdx: cIdx, startTime: c.startTime, endTime: c.endTime });
  });
});

console.log('=== WORD SEQUENCE VERIFICATION ===');
console.log(`Raw speech words: ${rawWords.length}`);
console.log(`Calibrated words: ${calWords.length}`);

const normalize = (w) => w.replace(/[.,!?:;\"\'\(\)\-]/g, '').toLowerCase();

let diffCount = 0;
const len = Math.max(rawWords.length, calWords.length);
for (let i = 0; i < len; i++) {
  const rw = rawWords[i] ? normalize(rawWords[i].word) : '<EOF>';
  const cw = calWords[i] ? normalize(calWords[i].word) : '<EOF>';
  if (rw !== cw) {
    console.log(`Mismatch at index ${i}: raw="${rawWords[i]?.word}" (${(rawWords[i]?.startMs/1000).toFixed(2)}s) vs cal="${calWords[i]?.word}" (Seg #${calWords[i]?.segIdx + 1})`);
    diffCount++;
    if (diffCount > 10) break;
  }
}

if (diffCount === 0 && rawWords.length === calWords.length) {
  console.log('🏆 100% PERFECT WORD-FOR-WORD VERBATIM MATCH! (0 differences)');
} else {
  console.log(`Total differences: ${diffCount}`);
}

console.log('\n=== SEGMENT TIMING & CONTINUITY AUDIT ===');
calibrated.forEach((s, idx) => {
  const dur = (s.endTime - s.startTime).toFixed(2);
  const words = s.text.trim().split(/\s+/).length;
  console.log(`[Seg #${idx + 1}] [${s.startTime.toFixed(2)}s - ${s.endTime.toFixed(2)}s] (${dur}s, ${words} words)`);
  console.log(`   Text: "${s.text}"`);
  console.log(`   IPA: ${s.ipaUs}`);
  console.log(`   VI: "${s.translationVi}"`);
  
  // Continuity check (except across music break between Seg 2 and Seg 3)
  if (idx > 0 && idx !== 2) {
    const gap = s.startTime - calibrated[idx - 1].endTime;
    if (Math.abs(gap) > 0.05) {
      console.warn(`   ⚠️ Gap warning: gap of ${gap.toFixed(2)}s between #${idx} and #${idx + 1}`);
    }
  }
});
