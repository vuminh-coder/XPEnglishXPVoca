const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/ted_bilingual_raw.en.json3', 'utf8'));

console.log('Total events:', raw.events.length);

raw.events.forEach((ev, idx) => {
  const startSec = (ev.tStartMs / 1000).toFixed(2);
  const durSec = ((ev.dDurationMs || 0) / 1000).toFixed(2);
  const endSec = ((ev.tStartMs + (ev.dDurationMs || 0)) / 1000).toFixed(2);
  const text = ev.segs ? ev.segs.map(s => s.utf8).join('').replace(/\n/g, ' ') : '';
  const segDetails = ev.segs ? ev.segs.map(s => {
    return `${s.utf8}${s.tOffsetMs !== undefined ? ' (' + s.tOffsetMs + 'ms)' : ''}`;
  }).join(' | ') : '';

  console.log(`[#${idx}] ${startSec}s - ${endSec}s (${durSec}s): "${text}"`);
});
