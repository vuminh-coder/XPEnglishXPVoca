const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('scripts/oxford_meeting.en.json3', 'utf8'));

console.log('Total events:', raw.events.length);
raw.events.forEach((e, idx) => {
  if (!e.segs) return;
  const txt = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ');
  const startSec = (e.tStartMs / 1000).toFixed(1);
  const durSec = (e.dDurationMs / 1000).toFixed(1);
  if (idx < 60) {
    console.log(`[${idx}] ${startSec}s (+${durSec}s): ${txt}`);
  }
});
