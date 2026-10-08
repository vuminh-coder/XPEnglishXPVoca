const fs = require('fs');

// 1. Read raw json3
const rawJson = JSON.parse(fs.readFileSync('scripts/oxford_food.en.json3', 'utf8'));

// Dialogue runs strictly from event 12 through event 38 (52.85s to 122.20s)
const dialogueEvents = rawJson.events.slice(12, 39);

function cleanWords(str) {
  return str
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/[^a-zA-Z0-9\s']/g, ' ')
    .split(/\s+/)
    .map(w => w.trim().toLowerCase())
    .filter(Boolean);
}

const rawTexts = dialogueEvents.map(e => (e.segs || []).map(s => s.utf8).join('').replace(/\n/g, ' ').trim());
const rawWords = cleanWords(rawTexts.join(' '));

const lessonContent = fs.readFileSync('features/listening/data/lessons/lesson_oxford_food_cooking.ts', 'utf8');

// Parse segments from TypeScript file
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
console.log(' OXFORD ONLINE ENGLISH: FOOD & COOKING - 100% VERBATIM AUDIT');
console.log('================================================================');
console.log(`YouTube Raw Subtitle Events:  ${dialogueEvents.length} events (Events #12 -> #38, 52.85s -> 122.20s)`);
console.log(`YouTube Total Word Count:     ${rawWords.length} words`);
console.log(`Lesson File Segment Count:    ${parsedSegments.length} segments`);
console.log(`Lesson File Total Word Count: ${lessonWords.length} words`);
console.log('----------------------------------------------------------------');

let diffCount = 0;
const maxLen = Math.max(rawWords.length, lessonWords.length);
for (let i = 0; i < maxLen; i++) {
  const rw = rawWords[i] || '<END_RAW>';
  const lw = lessonWords[i] || '<END_LESSON>';
  if (rw !== lw) {
    console.log(`DIFF [Word #${i + 1}]: YouTube="${rw}" | Lesson="${lw}"`);
    diffCount++;
  }
}

if (diffCount === 0) {
  console.log(`STATUS: [100% VERBATIM MATCH] - 0 differences detected!`);
} else {
  console.log(`STATUS: [FAIL] - ${diffCount} differences detected.`);
  process.exit(1);
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
console.log('\n================================================================');
console.log('AUDIT COMPLETED: 100% VERIFIED!');
console.log('================================================================');
