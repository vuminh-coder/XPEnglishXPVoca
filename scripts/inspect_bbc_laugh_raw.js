const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/bbc_why_we_laugh_raw.en-orig.json3', 'utf8'));

console.log('Total events in bbc_why_we_laugh_raw:', raw.events ? raw.events.length : 0);

for (let i = 0; i < Math.min(35, raw.events.length); i++) {
  const ev = raw.events[i];
  const startSec = (ev.tStartMs / 1000).toFixed(2);
  const durSec = ((ev.dDurationMs || 0) / 1000).toFixed(2);
  const endSec = ((ev.tStartMs + (ev.dDurationMs || 0)) / 1000).toFixed(2);
  const text = ev.segs ? ev.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim() : '';

  if (text) {
    console.log(`[#${i}] ${startSec}s - ${endSec}s (${durSec}s): "${text}"`);
  }
}
