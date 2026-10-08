const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve(process.cwd(), 'scripts/money.en.json3');
const rawJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function cleanWords(str) {
  return str
    .replace(/stock-picking/gi, 'stockpicking')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/['"]+/g, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim().toLowerCase())
    .filter(Boolean);
}

// Extract word timeline from events
const wordEvents = [];
rawJson.events.forEach((e) => {
  if (e.segs) {
    e.segs.forEach((s) => {
      const txt = (s.utf8 || '').trim();
      if (txt && txt !== '\n') {
        const offset = s.tOffsetMs || 0;
        const time = (e.tStartMs + offset) / 1000;
        const words = cleanWords(txt);
        words.forEach((w) => {
          wordEvents.push({ time, word: w });
        });
      }
    });
  }
});

// Deduplicate rolling events
const uniqueWords = [];
for (let i = 0; i < wordEvents.length; i++) {
  const w = wordEvents[i];
  const last = uniqueWords[uniqueWords.length - 1];
  if (last && last === w.word && Math.abs(w.time - (wordEvents[i - 1]?.time || 0)) < 0.5) {
    continue;
  }
  uniqueWords.push(w.word);
}

const lessonCode = fs.readFileSync('features/listening/data/lessons/lesson_psychology_of_money.ts', 'utf8');
const lessonMatches = [...lessonCode.matchAll(/text:\s*"([^"]+)"/g)].map(m => m[1]);
const lessonWords = cleanWords(lessonMatches.join(' '));

// Normalize ASR phonetic differences
function normalizeAsr(words) {
  return words.map(w => {
    if (w === 'howell' || w === 'howel') return 'housel';
    return w;
  });
}

const normRaw = normalizeAsr(uniqueWords);
const normLesson = normalizeAsr(lessonWords);

console.log('\n--- VERBATIM COMPARISON ---');
console.log('Norm Raw count:', normRaw.length);
console.log('Norm Lesson count:', normLesson.length);

let diffs = 0;
for (let i = 0; i < Math.max(normRaw.length, normLesson.length); i++) {
  const rw = normRaw[i];
  const lw = normLesson[i];
  if (rw !== lw) {
    console.log(`Diff at ${i}: raw="${rw}" vs lesson="${lw}"`);
    diffs++;
  }
}

if (diffs === 0 && normRaw.length === normLesson.length) {
  console.log(`\nPERFECT 100% MATCH! All ${normRaw.length} words match with 0 diffs!`);
} else {
  console.log(`\nTotal diffs: ${diffs}`);
}
