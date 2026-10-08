const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/bbc_laughter_medicine.en-GB.json3', 'utf8'));
const calibrated = JSON.parse(fs.readFileSync('scripts/bbc_laugh_18_calibrated.json', 'utf8'));

const events = raw.events.filter(e => e.segs && e.tStartMs >= 2000 && e.tStartMs <= 106000);

console.log('Auditing boundaries across all 18 segments...\n');

calibrated.forEach((seg, sIdx) => {
  const segStartMs = Math.round(seg.startTime * 1000);
  const segEndMs = Math.round(seg.endTime * 1000);
  
  // Find events overlapping with this segment
  const overlapping = events.filter(e => {
    const eStart = e.tStartMs;
    const eEnd = e.tStartMs + (e.dDurationMs || 0);
    return eEnd > segStartMs && eStart < segEndMs;
  });

  const eventTexts = overlapping.map(e => {
    const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ');
    return `[${(e.tStartMs/1000).toFixed(2)}s - ${((e.tStartMs + (e.dDurationMs||0))/1000).toFixed(2)}s] "${text}"`;
  });

  console.log(`=== Seg #${sIdx + 1} [${seg.startTime.toFixed(2)}s - ${seg.endTime.toFixed(2)}s] ===`);
  console.log(`Text: "${seg.text}"`);
  console.log(`Overlapping events:`);
  eventTexts.forEach(et => console.log(`  ${et}`));
  console.log('');
});
