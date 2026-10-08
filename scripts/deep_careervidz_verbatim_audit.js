const fs = require('fs');

// 1. Read raw json3
const rawJson = JSON.parse(fs.readFileSync('scripts/careervidz.en.json3', 'utf8'));

function cleanWords(str) {
  return str
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/['"]+/g, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .map(w => w.trim().toLowerCase())
    .filter(Boolean);
}

// In YouTube json3 rolling subtitles, new words are emitted with timestamps.
const wordEvents = [];
rawJson.events.forEach(e => {
  if (e.tStartMs < 87000 && e.segs) {
    e.segs.forEach(s => {
      const txt = (s.utf8 || '').trim();
      if (txt && txt !== '\n') {
        const offset = s.tOffsetMs || 0;
        const time = (e.tStartMs + offset) / 1000;
        const words = cleanWords(txt);
        words.forEach(w => {
          wordEvents.push({ time, word: w, raw: txt });
        });
      }
    });
  }
});

// Dedup consecutive identical words in rolling buffer re-renders
const uniqueWords = [];
for (let i = 0; i < wordEvents.length; i++) {
  const w = wordEvents[i];
  const last = uniqueWords[uniqueWords.length - 1];
  if (last && last.word === w.word && Math.abs(w.time - last.time) < 0.5) {
    continue;
  }
  uniqueWords.push(w);
}

// 2. Read lesson file
const lessonContent = fs.readFileSync('features/listening/data/lessons/lesson_careervidz_interview.ts', 'utf8');

const segPattern = /{\s*orderIndex:\s*(\d+),\s*startTime:\s*([\d.]+),\s*endTime:\s*([\d.]+),\s*text:\s*"([^"]+)",\s*translationVi:\s*"([^"]+)",\s*ipaUs:\s*"([^"]+)",/g;

const parsedSegments = [];
let m;
while ((m = segPattern.exec(lessonContent)) !== null) {
  parsedSegments.push({
    orderIndex: parseInt(m[1], 10),
    startTime: parseFloat(m[2]),
    endTime: parseFloat(m[3]),
    text: m[4],
    translationVi: m[5],
    ipaUs: m[6]
  });
}

const lessonWords = cleanWords(parsedSegments.map(s => s.text).join(' '));

console.log('================================================================');
console.log(' CAREERVIDZ: TELL ME ABOUT YOURSELF - 100% VERBATIM AUDIT');
console.log('================================================================');
console.log(`Unique YouTube Subtitle Words: ${uniqueWords.length} words`);
console.log(`Lesson Segment Count:          ${parsedSegments.length} segments`);
console.log(`Lesson Total Word Count:       ${lessonWords.length} words`);
console.log('----------------------------------------------------------------');

let diffCount = 0;
const maxLen = Math.max(uniqueWords.length, lessonWords.length);
for (let i = 0; i < maxLen; i++) {
  const rw = uniqueWords[i]?.word || '<END_RAW>';
  const lw = lessonWords[i] || '<END_LESSON>';
  if (rw !== lw) {
    console.log(`DIFF [Word #${i + 1}]: Raw="${rw}" | Lesson="${lw}"`);
    diffCount++;
    if (diffCount > 15) {
      console.log('... stopping diffs output after 15');
      break;
    }
  }
}

if (diffCount === 0) {
  console.log(`STATUS: [100% VERBATIM MATCH] - 0 differences detected!`);
} else {
  console.log(`STATUS: [DIFFS DETECTED] - ${diffCount} differences`);
}

console.log('\n================================================================');
console.log(' CHRONOLOGICAL TIMELINE & WORD-BY-WORD AUDIT (12 SEGMENTS)');
console.log('================================================================');

parsedSegments.forEach((seg, idx) => {
  const duration = (seg.endTime - seg.startTime).toFixed(2);
  const words = cleanWords(seg.text);
  console.log(`\n[Segment #${idx + 1}] [${seg.startTime.toFixed(2)}s - ${seg.endTime.toFixed(2)}s] (${duration}s, ${words.length} words):`);
  console.log(`  EN:  "${seg.text}"`);
  console.log(`  VI:  "${seg.translationVi}"`);
  console.log(`  IPA: ${seg.ipaUs}`);
});
