const fs = require('fs');

const off = JSON.parse(fs.readFileSync('scripts/steve_jobs_official.en-eEY6OEpapPo.json3', 'utf8'));
const auto = JSON.parse(fs.readFileSync('scripts/steve_jobs_auto.en.json3', 'utf8'));

// Build complete list of auto words
const words = [];
auto.events.forEach(e => {
  if (e.segs) {
    e.segs.forEach(s => {
      const text = s.utf8.trim();
      if (!text || text === '\n') return;
      const start = (e.tStartMs + (s.tOffsetMs || 0)) / 1000;
      words.push({ text, start });
    });
  }
});
for (let i = 0; i < words.length - 1; i++) {
  words[i].end = words[i + 1].start;
}
if (words.length > 0) words[words.length - 1].end = words[words.length - 1].start + 0.5;

console.log(`Total spoken words extracted: ${words.length}`);

// Function to find word range for a given phrase
function inspectRange(phraseWords, approxStart) {
  const startIdx = words.findIndex(w => Math.abs(w.start - approxStart) < 5 && w.text.toLowerCase().replace(/[^a-z0-9]/g, '') === phraseWords[0].toLowerCase().replace(/[^a-z0-9]/g, ''));
  if (startIdx === -1) {
    console.log(`NOT FOUND: ${phraseWords[0]} around ${approxStart}s`);
    return;
  }
  const matchedWords = words.slice(startIdx, startIdx + phraseWords.length);
  const firstWord = matchedWords[0];
  const lastWord = matchedWords[matchedWords.length - 1];
  console.log(`Matched: "${matchedWords.map(w => w.text).join(' ')}"`);
  console.log(`  Start: ${firstWord.start.toFixed(3)}s (word: "${firstWord.text}")`);
  console.log(`  Last word start: ${lastWord.start.toFixed(3)}s (word: "${lastWord.text}"), next word start: ${lastWord.end ? lastWord.end.toFixed(3) : 'N/A'}s`);
}

// Let's print all words between 20s and 175s
console.log('\n=== WORDS FROM 20s to 175s ===');
const rangeWords = words.filter(w => w.start >= 20 && w.start <= 175);
let currentLine = '';
let lineStart = rangeWords[0]?.start || 0;
rangeWords.forEach((w, idx) => {
  currentLine += w.text + ' ';
  if (idx > 0 && (w.end - w.start > 0.6 || idx === rangeWords.length - 1)) {
    console.log(`[${lineStart.toFixed(2)}s - ${w.end.toFixed(2)}s] (gap: ${(w.end - w.start).toFixed(2)}s): ${currentLine.trim()}`);
    currentLine = '';
    lineStart = w.end;
  }
});
