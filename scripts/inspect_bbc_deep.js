const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scripts/bbc_brain_official.en-GB.json3', 'utf8'));
const events = data.events.filter(e => e.segs && e.segs.some(s => s.utf8 && s.utf8.trim()));

console.log('Total non-empty events:', events.length);

events.slice(0, 30).forEach((e, idx) => {
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  const start = e.tStartMs / 1000;
  const dur = e.dDurationMs / 1000;
  const end = start + dur;
  let gapFromPrev = '';
  if (idx > 0) {
    const prevEnd = (events[idx - 1].tStartMs + events[idx - 1].dDurationMs) / 1000;
    gapFromPrev = ' | gap: ' + (start - prevEnd).toFixed(3) + 's';
  }
  console.log(`[${idx + 1}] ${start.toFixed(3)}s -> ${end.toFixed(3)}s (${dur.toFixed(3)}s)${gapFromPrev}: "${text}"`);
});
