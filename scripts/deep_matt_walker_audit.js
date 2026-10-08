const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/matt_walker.en.json3', 'utf8'));
const { LESSON_MATT_WALKER_SLEEP } = require('../features/listening/data/lessons/lesson_matt_walker_sleep');

// Extract speech words from raw events between 0.83s and 121s
const rawWords = [];
raw.events.forEach(e => {
  if (!e.segs) return;
  const baseT = e.tStartMs;
  if (baseT > 122000) return;
  e.segs.forEach(s => {
    const text = s.utf8;
    if (!text || text === '\n') return;
    const offset = s.tOffsetMs || 0;
    const startMs = baseT + offset;
    const trimmed = text.trim();
    if (trimmed && !trimmed.startsWith('(') && !trimmed.startsWith('[')) {
      const parts = trimmed.split(/\s+/);
      parts.forEach(p => {
        if (p) rawWords.push({ word: p, startMs });
      });
    }
  });
});

const calWords = [];
LESSON_MATT_WALKER_SLEEP.segments.forEach((c, cIdx) => {
  const words = c.text.trim().split(/\s+/);
  words.forEach(w => {
    calWords.push({ word: w, segIdx: cIdx, startTime: c.startTime, endTime: c.endTime });
  });
});

console.log('=== MATT WALKER TED SLEEP: DEEP 100% VERBATIM WORD AUDIT ===');
console.log(`Raw YouTube words detected: ${rawWords.length}`);
console.log(`Calibrated Lesson words: ${calWords.length}`);

const normalize = (w) => w.replace(/[.,!?:;\"\'\(\)\-]/g, '').toLowerCase();

let diffCount = 0;
const len = Math.max(rawWords.length, calWords.length);
for (let i = 0; i < len; i++) {
  const rw = rawWords[i] ? normalize(rawWords[i].word) : '<EOF>';
  const cw = calWords[i] ? normalize(calWords[i].word) : '<EOF>';
  if (rw !== cw) {
    console.log(`Mismatch at index ${i}: raw="${rawWords[i]?.word}" (${(rawWords[i]?.startMs/1000).toFixed(2)}s) vs cal="${calWords[i]?.word}" (Seg #${calWords[i]?.segIdx + 1})`);
    diffCount++;
    if (diffCount > 15) break;
  }
}

if (diffCount === 0 && rawWords.length === calWords.length) {
  console.log('🏆 100% PERFECT WORD-FOR-WORD VERBATIM MATCH! (0 differences)');
} else {
  console.log(`Total differences: ${diffCount}`);
}

console.log('\n=== SEGMENT TIMING & CONTINUITY AUDIT ===');
LESSON_MATT_WALKER_SLEEP.segments.forEach((s, idx) => {
  const dur = (s.endTime - s.startTime).toFixed(2);
  const words = s.text.trim().split(/\s+/).length;
  console.log(`[Seg #${idx + 1}] [${s.startTime.toFixed(2)}s - ${s.endTime.toFixed(2)}s] (${dur}s, ${words} words)`);
  console.log(`   Text: "${s.text}"`);
  console.log(`   IPA: ${s.ipaUs}`);
  console.log(`   VI: "${s.translationVi}"`);
});
