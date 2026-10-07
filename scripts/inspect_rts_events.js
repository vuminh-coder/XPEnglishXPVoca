const fs = require('fs');

const orig = JSON.parse(fs.readFileSync('scripts/rewrite_the_stars_raw.en-orig.json3', 'utf8'));

// Find occurrences of key phrases in events
orig.events.forEach((e, idx) => {
  if (!e.segs) return;
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  const start = e.tStartMs / 1000;
  const end = (e.tStartMs + e.dDurationMs) / 1000;
  console.log(`[${start.toFixed(2)}s - ${end.toFixed(2)}s] ${text}`);
});
