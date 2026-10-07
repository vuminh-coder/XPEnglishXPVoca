const fs = require('fs');

const off = JSON.parse(fs.readFileSync('scripts/steve_jobs_official.en-eEY6OEpapPo.json3', 'utf8'));
const auto = JSON.parse(fs.readFileSync('scripts/steve_jobs_auto.en.json3', 'utf8'));

console.log('=== OFFICIAL EVENTS (First 25 events) ===');
const offEvents = off.events.filter(e => e.segs && (e.tStartMs || 0) < 180000);
offEvents.forEach((e, idx) => {
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  if (!text) return;
  const start = ((e.tStartMs || 0) / 1000).toFixed(3);
  const end = (((e.tStartMs || 0) + (e.dDurationMs || 0)) / 1000).toFixed(3);
  console.log(`[OFF #${idx}] ${start}s -> ${end}s: "${text}"`);
});

console.log('\n=== AUTO EVENTS (First 35 events) ===');
const autoEvents = auto.events.filter(e => e.segs && (e.tStartMs || 0) < 180000);
autoEvents.forEach((e, idx) => {
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  if (!text) return;
  const start = ((e.tStartMs || 0) / 1000).toFixed(3);
  const end = (((e.tStartMs || 0) + (e.dDurationMs || 0)) / 1000).toFixed(3);
  console.log(`[AUTO #${idx}] ${start}s -> ${end}s: "${text}"`);
});
