const fs = require('fs');
const en = JSON.parse(fs.readFileSync('scripts/simon_sinek_ted.en.json3', 'utf8'));
const vi = JSON.parse(fs.readFileSync('scripts/simon_sinek_ted_vi.vi.json3', 'utf8'));

const viEvents = vi.events.filter(e => e.tStartMs >= 16000 && e.tStartMs < 125000 && e.segs);
console.log('VI Events count:', viEvents.length);
viEvents.forEach(e => {
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ');
  console.log(`${(e.tStartMs/1000).toFixed(2)} - ${((e.tStartMs + e.dDurationMs)/1000).toFixed(2)}: ${text}`);
});
