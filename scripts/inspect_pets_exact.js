const fs = require('fs');

const off = JSON.parse(fs.readFileSync('scripts/pets_official.en.json3', 'utf8'));

// Print each event and its timing
off.events.forEach((e, idx) => {
  if (!e.segs) return;
  const start = (e.tStartMs / 1000).toFixed(2);
  const end = ((e.tStartMs + e.dDurationMs) / 1000).toFixed(2);
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`[#${idx}] ${start}s - ${end}s: "${text}"`);
});
