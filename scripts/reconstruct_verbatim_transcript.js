const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/test_sub.en.json3', 'utf8'));

// YouTube timedtext json3 events use rolling 2-line windows.
// When an event has "aAppend": 1, it appends to the current window.
// Let's accurately extract every spoken token by its unique (startMs, word) or by parsing the timeline.
const rawTokens = [];
for (const ev of data.events || []) {
  if (!ev.segs) continue;
  const evStart = ev.tStartMs || 0;
  for (const seg of ev.segs) {
    const text = seg.utf8;
    if (!text || text === '\n') continue;
    const clean = text.trim();
    if (!clean) continue;
    const wordStart = evStart + (seg.tOffsetMs || 0);
    rawTokens.push({
      word: clean,
      startMs: wordStart,
      sec: Number((wordStart / 1000).toFixed(2))
    });
  }
}

// Deduplicate words that appear in consecutive rolling windows with the same startMs
const uniqueWords = [];
for (let i = 0; i < rawTokens.length; i++) {
  const cur = rawTokens[i];
  if (uniqueWords.length > 0) {
    const prev = uniqueWords[uniqueWords.length - 1];
    if (prev.word.toLowerCase() === cur.word.toLowerCase() && Math.abs(prev.startMs - cur.startMs) < 200) {
      continue;
    }
  }
  uniqueWords.push(cur);
}

console.log('Unique spoken words count:', uniqueWords.length);

// Print all words formatted with indices
let out = '';
uniqueWords.forEach((w, i) => {
  out += `[${i}:${w.sec}s] ${w.word} `;
});
console.log(out);
