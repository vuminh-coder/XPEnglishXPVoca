const fs = require('fs');

const en = JSON.parse(fs.readFileSync('scripts/ted_bilingual_raw.en.json3', 'utf8'));
const vi = JSON.parse(fs.readFileSync('scripts/ted_bilingual_vi.vi.json3', 'utf8'));

console.log('--- ALL ENGLISH SUBTITLE EVENTS (45 to 89) ---');
for (let i = 45; i < en.events.length; i++) {
  const e = en.events[i];
  const start = (e.tStartMs / 1000).toFixed(2);
  const end = ((e.tStartMs + (e.dDurationMs || 0)) / 1000).toFixed(2);
  const dur = ((e.dDurationMs || 0) / 1000).toFixed(2);
  const text = e.segs ? e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ') : '';
  console.log(`[${i}] ${start}s -> ${end}s (${dur}s): ${text}`);
}
