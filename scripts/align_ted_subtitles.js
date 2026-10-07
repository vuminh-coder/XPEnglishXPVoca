const fs = require('fs');

const en = JSON.parse(fs.readFileSync('scripts/ted_bilingual_raw.en.json3', 'utf8'));
const vi = JSON.parse(fs.readFileSync('scripts/ted_bilingual_vi.vi.json3', 'utf8'));

console.log('En events:', en.events.length, 'Vi events:', vi.events.length);

for (let i = 0; i < Math.min(25, en.events.length); i++) {
  const enEv = en.events[i];
  const viEv = vi.events[i] || {};
  const enText = enEv.segs ? enEv.segs.map(s => s.utf8).join('').replace(/\n/g, ' ') : '';
  const viText = viEv.segs ? viEv.segs.map(s => s.utf8).join('').replace(/\n/g, ' ') : '';
  console.log(`[${i}] ${(enEv.tStartMs/1000).toFixed(2)}s - ${((enEv.tStartMs + (enEv.dDurationMs||0))/1000).toFixed(2)}s`);
  console.log(`    EN: ${enText}`);
  console.log(`    VI: ${viText}`);
}
