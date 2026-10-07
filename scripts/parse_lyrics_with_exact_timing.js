const fs = require('fs');

const orig = JSON.parse(fs.readFileSync('scripts/rewrite_the_stars_raw.en-orig.json3', 'utf8'));

// Extract all word tokens with absolute timestamps
const words = [];
orig.events.forEach(e => {
  if (!e.segs) return;
  const baseT = e.tStartMs;
  e.segs.forEach(s => {
    const text = s.utf8 ? s.utf8.trim() : '';
    if (!text || text === '\n') return;
    const timeMs = baseT + (s.tOffsetMs || 0);
    words.push({
      time: timeMs / 1000,
      text: text
    });
  });
});

console.log('Total words extracted:', words.length);
console.log('First 40 words:');
words.slice(0, 40).forEach(w => console.log(`${w.time.toFixed(2)}s: ${w.text}`));
