const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/bbc_laughter_medicine.en-GB.json3', 'utf8'));

console.log('Total raw events:', raw.events.length);

for (let i = 0; i < 59; i++) {
  const e = raw.events[i];
  const start = (e.tStartMs / 1000).toFixed(2);
  const end = ((e.tStartMs + (e.dDurationMs || 0)) / 1000).toFixed(2);
  const text = e.segs ? e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim() : '';
  console.log(`[#${i}] ${start}s - ${end}s: "${text}"`);
}
