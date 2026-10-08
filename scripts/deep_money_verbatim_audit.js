const fs = require('fs');

const rawSubtitles = JSON.parse(fs.readFileSync('scripts/money.en.json3', 'utf8'));

console.log('--- ALL RAW SUBTITLE EVENTS IN money.en.json3 ---');
let rawEvents = [];
if (rawSubtitles.events) {
  rawSubtitles.events.forEach((ev, i) => {
    if (ev.segs) {
      const segText = ev.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
      if (segText) {
        const start = (ev.tStartMs / 1000).toFixed(2);
        const dur = ((ev.dDurationMs || 0) / 1000).toFixed(2);
        const end = ((ev.tStartMs + (ev.dDurationMs || 0)) / 1000).toFixed(2);
        rawEvents.push({ i, start, dur, end, text: segText });
        console.log(`Event #${i} [${start}s - ${end}s]: "${segText}"`);
      }
    }
  });
}

const lessonCode = fs.readFileSync('features/listening/data/lessons/lesson_psychology_of_money.ts', 'utf8');

function cleanWords(str) {
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

const rawAllWords = cleanWords(rawEvents.map(e => e.text).join(' '));
const lessonMatches = [...lessonCode.matchAll(/text:\s*"([^"]+)"/g)].map(m => m[1]);

console.log('\n--- LESSON SEGMENTS (' + lessonMatches.length + ') ---');
lessonMatches.forEach((t, i) => console.log(`Segment ${i}: "${t}"`));

const lessonAllWords = cleanWords(lessonMatches.join(' '));

console.log('\n--- COMPARISON ---');
console.log('Raw words count:', rawAllWords.length);
console.log('Lesson words count:', lessonAllWords.length);

let diffs = 0;
const maxLen = Math.max(rawAllWords.length, lessonAllWords.length);
for (let i = 0; i < maxLen; i++) {
  const rw = rawAllWords[i];
  const lw = lessonAllWords[i];
  if (rw !== lw) {
    console.log(`Diff at word index ${i}: raw="${rw}" vs lesson="${lw}"`);
    diffs++;
    if (diffs > 15) break;
  }
}

if (diffs === 0 && rawAllWords.length === lessonAllWords.length) {
  console.log(`\nPERFECT 100% MATCH! All ${rawAllWords.length} words match exactly! 0 diffs.`);
} else {
  console.log(`\nFound ${diffs} diffs.`);
}
