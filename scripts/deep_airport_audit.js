const fs = require('fs');

const whisperData = JSON.parse(fs.readFileSync('scripts/airport_audio.json', 'utf8'));
const calibrated = JSON.parse(fs.readFileSync('scripts/airport_checkin_16_calibrated.json', 'utf8'));

// Extract all whisper words
const whisperWords = [];
whisperData.segments.forEach(s => {
  if (s.words) {
    s.words.forEach(w => {
      const trimmed = w.word.trim();
      if (trimmed) whisperWords.push({ word: trimmed, start: w.start, end: w.end });
    });
  }
});

// Extract all calibrated words
const calWords = [];
calibrated.forEach((seg, sIdx) => {
  const words = seg.text.trim().split(/\s+/);
  words.forEach(w => {
    calWords.push({ word: w, segIdx: sIdx, startTime: seg.startTime, endTime: seg.endTime });
  });
});

console.log('=== AIRPORT CHECK-IN DEEP VERBATIM AUDIT ===');
console.log(`Whisper words detected: ${whisperWords.length}`);
console.log(`Calibrated words: ${calWords.length}`);

const normalize = (w) => w.replace(/[.,!?:;\"\'\(\)\-]/g, '').toLowerCase();

let diffCount = 0;
const len = Math.max(whisperWords.length, calWords.length);
for (let i = 0; i < len; i++) {
  const ww = whisperWords[i] ? normalize(whisperWords[i].word) : '<EOF>';
  const cw = calWords[i] ? normalize(calWords[i].word) : '<EOF>';
  if (ww !== cw) {
    console.log(`Mismatch at index ${i}: whisper="${whisperWords[i]?.word}" vs cal="${calWords[i]?.word}" (Seg #${calWords[i]?.segIdx + 1})`);
    diffCount++;
  }
}

if (diffCount === 0 && whisperWords.length === calWords.length) {
  console.log('🏆 100% PERFECT WORD-FOR-WORD VERBATIM MATCH! (0 differences)');
} else {
  console.log(`Total differences: ${diffCount}`);
}

console.log('\n=== SEGMENT TIMING CONTINUITY & BUFFER AUDIT ===');
calibrated.forEach((s, idx) => {
  const dur = (s.endTime - s.startTime).toFixed(2);
  const words = s.text.trim().split(/\s+/).length;
  console.log(`[Seg #${idx + 1}] [${s.startTime.toFixed(2)}s - ${s.endTime.toFixed(2)}s] (${dur}s, ${words} words)`);
  console.log(`   Text: "${s.text}"`);
  console.log(`   IPA: ${s.ipaUs}`);
  console.log(`   VI: "${s.translationVi}"`);

  if (idx > 0) {
    const gap = s.startTime - calibrated[idx - 1].endTime;
    if (Math.abs(gap) > 0.05) {
      console.warn(`   ⚠️ Warning: Gap of ${gap.toFixed(2)}s between #${idx} and #${idx + 1}`);
    }
  }
});
