const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('scripts/oxford_meeting.en.json3', 'utf8'));

for (let i = 44; i <= 90; i++) {
  if (!raw.events[i]) break;
  const e = raw.events[i];
  const txt = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ');
  console.log(`${i}. [${(e.tStartMs/1000).toFixed(2)} - ${((e.tStartMs+e.dDurationMs)/1000).toFixed(2)}] ${txt}`);
}
