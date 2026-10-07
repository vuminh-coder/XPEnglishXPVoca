const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/test_sub.en.json3', 'utf8'));

const words = [];
for (const ev of data.events || []) {
  if (!ev.segs) continue;
  const evStart = ev.tStartMs || 0;
  for (const seg of ev.segs) {
    const text = seg.utf8;
    if (!text || text === '\n') continue;
    const clean = text.trim();
    if (!clean) continue;
    const wordStart = evStart + (seg.tOffsetMs || 0);
    words.push({ word: clean, startMs: wordStart, sec: wordStart / 1000 });
  }
}

console.log('=== GAPS > 0.6s (Natural speech pauses) ===');
for (let i = 0; i < words.length - 1; i++) {
  const current = words[i];
  const next = words[i + 1];
  const gap = next.sec - current.sec;
  if (gap > 0.7) {
    console.log(`[${i}] "${current.word}" (${current.sec.toFixed(2)}s) -> [${i+1}] "${next.word}" (${next.sec.toFixed(2)}s) | Pause: ${gap.toFixed(2)}s`);
  }
}
