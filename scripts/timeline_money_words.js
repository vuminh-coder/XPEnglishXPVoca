const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/money.en.json3', 'utf8'));

// Build list of all spoken words with their precise start and end times
const words = [];
raw.events.forEach((ev) => {
  if (ev.segs) {
    ev.segs.forEach((s) => {
      const text = (s.utf8 || '').trim();
      if (text && text !== '\n') {
        const offset = s.tOffsetMs || 0;
        const start = (ev.tStartMs + offset) / 1000;
        words.push({ word: text, start });
      }
    });
  }
});

// Remove duplicates caused by rolling window events in json3
const dedupedWords = [];
words.forEach((w) => {
  const last = dedupedWords[dedupedWords.length - 1];
  // If same word within 0.4s, it's a rolling duplicate
  if (last && last.word === w.word && Math.abs(w.start - last.start) < 0.5) {
    return;
  }
  dedupedWords.push(w);
});

console.log('Deduped words count:', dedupedWords.length);
dedupedWords.forEach((w, idx) => {
  console.log(`[${idx}] ${w.start.toFixed(2)}s: ${w.word}`);
});
