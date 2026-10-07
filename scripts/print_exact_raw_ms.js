const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/ted_bilingual_raw.en.json3', 'utf8'));
raw.events.slice(0, 36).forEach((e, idx) => {
  const tStart = e.tStartMs;
  const tEnd = e.tStartMs + (e.dDurationMs || 0);
  const text = e.segs ? e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim() : '';
  console.log(`Raw #${idx}: [${(tStart/1000).toFixed(3)}s -> ${(tEnd/1000).toFixed(3)}s] (dur ${(e.dDurationMs/1000).toFixed(3)}s) "${text}"`);
});
