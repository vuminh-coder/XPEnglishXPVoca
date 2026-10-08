const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/money.en.json3', 'utf8'));

console.log('Events length:', raw.events.length);
raw.events.forEach((ev, i) => {
  const tStart = (ev.tStartMs / 1000).toFixed(2);
  const dDur = ((ev.dDurationMs || 0) / 1000).toFixed(2);
  let segText = '';
  if (ev.segs) {
    segText = ev.segs.map(s => s.utf8).join('');
  }
  console.log(`[${i}] ${tStart}s (dur ${dDur}s): ${JSON.stringify(segText)}`);
  if (ev.segs && ev.segs.length > 1) {
    ev.segs.forEach((s, si) => {
      console.log(`    seg[${si}] ${(s.tOffsetMs || 0)}ms: ${JSON.stringify(s.utf8)}`);
    });
  }
});
