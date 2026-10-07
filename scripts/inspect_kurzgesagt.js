const fs = require('fs');
const sub = JSON.parse(fs.readFileSync('scripts/kurzgesagt_raw.en.json3', 'utf8'));
const lines = sub.events.filter(e => e.segs).map(e => ({
  start: e.tStartMs / 1000,
  duration: e.dDurationMs / 1000,
  end: (e.tStartMs + e.dDurationMs) / 1000,
  text: e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
})).filter(l => l.text);

console.log('Total lines:', lines.length);
lines.filter(l => l.end <= 150).forEach((l, idx) => {
  console.log(`${idx + 1}. [${l.start.toFixed(2)}s - ${l.end.toFixed(2)}s] (${l.duration.toFixed(2)}s): "${l.text}"`);
});
