const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('scripts/oxford_meeting.en.json3', 'utf8'));

const events = raw.events.slice(44, 61);
let allWords = [];

events.forEach((e, idx) => {
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ');
  console.log(`[Seg ${idx}] ${(e.tStartMs/1000).toFixed(2)} - ${((e.tStartMs+e.dDurationMs)/1000).toFixed(2)}: ${text}`);
  const words = text.split(/\s+/).filter(Boolean);
  allWords.push(...words);
});

console.log('Total words:', allWords.length);
