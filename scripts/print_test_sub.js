const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/test_sub.en.json3', 'utf8'));

console.log('Total events in test_sub.en.json3:', raw.events.length);
raw.events.forEach((ev, i) => {
  if (ev.segs) {
    const text = ev.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
    if (text) {
      const start = (ev.tStartMs / 1000).toFixed(2);
      const dur = ((ev.dDurationMs || 0) / 1000).toFixed(2);
      console.log(`[#${i}] ${start}s - ${(parseFloat(start) + parseFloat(dur)).toFixed(2)}s: "${text}"`);
    }
  }
});
