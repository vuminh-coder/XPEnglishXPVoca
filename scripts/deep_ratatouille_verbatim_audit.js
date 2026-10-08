const fs = require('fs');

const rawSubtitles = JSON.parse(fs.readFileSync('scripts/ratatouille_ego.en.json3', 'utf8'));

// Extract raw text
let rawEvents = [];
if (rawSubtitles.events) {
  for (const ev of rawSubtitles.events) {
    if (ev.segs) {
      const segText = ev.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
      if (segText) {
        rawEvents.push({
          start: (ev.tStartMs / 1000).toFixed(2),
          duration: ((ev.dDurationMs || 0) / 1000).toFixed(2),
          end: ((ev.tStartMs + (ev.dDurationMs || 0)) / 1000).toFixed(2),
          text: segText
        });
      }
    }
  }
}

console.log('--- RAW SUBTITLE EVENTS (' + rawEvents.length + ') ---');
rawEvents.forEach((ev, idx) => {
  console.log(`[${idx}] ${ev.start}s -> ${ev.end}s: "${ev.text}"`);
});

// Load typescript lesson data
const lessonContent = fs.readFileSync('features/listening/data/lessons/lesson_ratatouille_anton_ego.ts', 'utf8');

// Normalize helper
function normalizeWords(str) {
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

const rawFullText = rawEvents.map(e => e.text).join(' ');
const rawWords = normalizeWords(rawFullText);

// Extract segments from lesson file regex
const segMatches = [...lessonContent.matchAll(/text:\s*"([^"]+)"/g)].map(m => m[1]);

console.log('\n--- LESSON SEGMENTS (' + segMatches.length + ') ---');
segMatches.forEach((t, i) => console.log(`Segment ${i}: "${t}"`));

const lessonFullText = segMatches.join(' ');
const lessonWords = normalizeWords(lessonFullText);

console.log('\n--- COMPARISON ---');
console.log('Raw words count:', rawWords.length);
console.log('Lesson words count:', lessonWords.length);

// Compare word by word
let diffs = 0;
const maxLen = Math.max(rawWords.length, lessonWords.length);
for (let i = 0; i < maxLen; i++) {
  const rw = rawWords[i];
  const lw = lessonWords[i];
  if (rw !== lw) {
    console.log(`Diff at word index ${i}: raw="${rw}" vs lesson="${lw}"`);
    diffs++;
    if (diffs > 10) break;
  }
}

if (diffs === 0 && rawWords.length === lessonWords.length) {
  console.log(`\nPERFECT 100% MATCH! All ${rawWords.length} words are exactly identical! 0 diffs.`);
} else {
  console.log(`\nFound ${diffs} diffs.`);
}
