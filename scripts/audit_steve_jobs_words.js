const fs = require('fs');

const off = JSON.parse(fs.readFileSync('scripts/steve_jobs_official.en-eEY6OEpapPo.json3', 'utf8'));
const auto = JSON.parse(fs.readFileSync('scripts/steve_jobs_auto.en.json3', 'utf8'));
const segments = JSON.parse(fs.readFileSync('scripts/steve_jobs_15_calibrated.json', 'utf8'));

// Print all official events with exact timestamps and seg text
console.log('=== OFFICIAL SEGMENTS ===');
const offEvents = off.events.filter(e => e.segs && (e.tStartMs || 0) >= 20000 && (e.tStartMs || 0) <= 170000);
offEvents.forEach((e, idx) => {
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  const start = ((e.tStartMs || 0) / 1000).toFixed(2);
  const end = (((e.tStartMs || 0) + (e.dDurationMs || 0)) / 1000).toFixed(2);
  console.log(`[${start} - ${end}] ${text}`);
});
