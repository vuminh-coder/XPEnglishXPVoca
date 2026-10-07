const fs = require('fs');

const off = JSON.parse(fs.readFileSync('scripts/bbc_brain_official.en-GB.json3', 'utf8'));

console.log('Total events in BBC official:', off.events.length);

const events = off.events.filter(e => e.segs).map((e, idx) => {
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  const start = ((e.tStartMs || 0) / 1000).toFixed(3);
  const end = (((e.tStartMs || 0) + (e.dDurationMs || 0)) / 1000).toFixed(3);
  const dur = ((e.dDurationMs || 0) / 1000).toFixed(3);
  return { idx, start, end, dur, text, tStartMs: e.tStartMs, dDurationMs: e.dDurationMs };
});

console.log('Valid text events:', events.length);
events.slice(0, 30).forEach(ev => {
  console.log(`[#${ev.idx}] ${ev.start}s -> ${ev.end}s (${ev.dur}s): "${ev.text}"`);
});
