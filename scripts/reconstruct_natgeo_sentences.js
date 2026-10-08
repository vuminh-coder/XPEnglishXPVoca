const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/natgeo_renewable.en.json3', 'utf8'));

// Extract words with start time
const words = [];
raw.events.forEach(e => {
  if (!e.segs) return;
  const baseT = e.tStartMs;
  e.segs.forEach(s => {
    const text = s.utf8;
    if (!text || text === '\n') return;
    const offset = s.tOffsetMs || 0;
    const startMs = baseT + offset;
    const trimmed = text.trim();
    if (trimmed && trimmed !== '[Music]') {
      words.push({ word: trimmed, startMs });
    }
  });
});

console.log(`Total words: ${words.length}`);

// Print all words formatted as running text
let running = '';
words.forEach((w, i) => {
  running += `${w.word} (${(w.startMs/1000).toFixed(2)}s) `;
  if ((i + 1) % 10 === 0) running += '\n';
});
console.log(running);
