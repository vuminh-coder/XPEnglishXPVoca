const fs = require('fs');

const off = JSON.parse(fs.readFileSync('scripts/pets_official.en.json3', 'utf8'));

console.log('Total events in pets official:', off.events.length);

off.events.forEach((e, idx) => {
  if (!e.segs) return;
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  const start = ((e.tStartMs || 0) / 1000).toFixed(3);
  const end = (((e.tStartMs || 0) + (e.dDurationMs || 0)) / 1000).toFixed(3);
  const dur = ((e.dDurationMs || 0) / 1000).toFixed(3);
  console.log(`[#${idx}] ${start}s -> ${end}s (${dur}s): "${text}"`);
});
