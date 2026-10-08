const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/bbc_laughter_medicine.en-GB.json3', 'utf8'));

console.log('--- ALL MID-EVENT PUNCTUATION CHECKS (Events 0 to 58) ---');
for (let i = 0; i < 59; i++) {
  const e = raw.events[i];
  const text = e.segs ? e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim() : '';
  const start = (e.tStartMs / 1000).toFixed(2);
  const end = ((e.tStartMs + (e.dDurationMs || 0)) / 1000).toFixed(2);

  // Check if . ! ? appears NOT at the end
  const trimmed = text.replace(/["'\)]+$/, '');
  const match = trimmed.match(/[\.!\?]\s+[A-Z]/);
  if (match) {
    console.log(`[Event #${i}] [${start}s - ${end}s] MID-SENTENCE BREAK DETECTED:`);
    console.log(`     "${text}"`);
  }
}
