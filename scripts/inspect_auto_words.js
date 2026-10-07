const fs = require('fs');

const off = JSON.parse(fs.readFileSync('scripts/steve_jobs_official.en-eEY6OEpapPo.json3', 'utf8'));
const auto = JSON.parse(fs.readFileSync('scripts/steve_jobs_auto.en.json3', 'utf8'));

// Look at words in auto.events between 80s and 100s
console.log('=== AUTO WORDS DETAIL (80s - 100s) ===');
auto.events.forEach(e => {
  if (e.tStartMs >= 80000 && e.tStartMs <= 100000 && e.segs) {
    e.segs.forEach(s => {
      const w = s.utf8.trim();
      const t = ((e.tStartMs + (s.tOffsetMs || 0)) / 1000).toFixed(3);
      if (w) console.log(`${t}s: "${w}"`);
    });
  }
});
