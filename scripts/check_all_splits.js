const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/bbc_laughter_medicine.en-GB.json3', 'utf8'));
const calibrated = JSON.parse(fs.readFileSync('scripts/bbc_laugh_18_calibrated.json', 'utf8'));

const events = raw.events.filter(e => e.segs && e.tStartMs >= 2000 && e.tStartMs <= 105500);

console.log('Auditing split events...\n');

events.forEach((e, eIdx) => {
  const eText = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  const eWords = eText.split(/\s+/).map(w => w.replace(/[.,!?:;\"\'\(\)]/g, '').toLowerCase()).filter(Boolean);
  
  // Find which segments contain these words in sequence
  const containingSegs = [];
  calibrated.forEach((c, cIdx) => {
    const cWords = c.text.split(/\s+/).map(w => w.replace(/[.,!?:;\"\'\(\)]/g, '').toLowerCase());
    const hasAny = eWords.some(w => cWords.includes(w));
    if (hasAny) {
      containingSegs.push(cIdx + 1);
    }
  });

  const unique = Array.from(new Set(containingSegs));
  if (unique.length > 1) {
    console.log(`Event #${eIdx} [${(e.tStartMs/1000).toFixed(2)}s - ${((e.tStartMs + (e.dDurationMs||0))/1000).toFixed(2)}s]: "${eText}"`);
    console.log(`  Spans segments: ${unique.join(', ')}`);
  }
});
