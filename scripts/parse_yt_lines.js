const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/test_sub.en.json3', 'utf8'));

const lines = [];
for (const ev of data.events || []) {
  if (!ev.segs) continue;
  const startSec = (ev.tStartMs / 1000).toFixed(2);
  const durSec = ((ev.dDurationMs || 0) / 1000).toFixed(2);
  const endSec = ((ev.tStartMs + (ev.dDurationMs || 0)) / 1000).toFixed(2);
  const fullText = ev.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  if (fullText) {
    lines.push({ startSec, endSec, durSec, fullText });
  }
}

console.log('Total caption lines in YouTube raw:', lines.length);
lines.forEach((l, idx) => {
  console.log(`[${idx+1}] ${l.startSec}s - ${l.endSec}s (${l.durSec}s): "${l.fullText}"`);
});
