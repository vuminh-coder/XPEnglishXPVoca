const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/oxford_food.en.json3', 'utf8'));

console.log('=== RAW YOUTUBE SUBTITLES IN SCRIPTS/OXFORD_FOOD.EN.JSON3 ===');
data.events.forEach((e, idx) => {
  const text = (e.segs || []).map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  const startSec = (e.tStartMs / 1000).toFixed(2);
  const endSec = ((e.tStartMs + (e.dDurationMs || 0)) / 1000).toFixed(2);
  if (e.tStartMs >= 35000 && e.tStartMs <= 130000) {
    console.log(`Event #${idx} [${startSec}s - ${endSec}s]: "${text}"`);
  }
});
