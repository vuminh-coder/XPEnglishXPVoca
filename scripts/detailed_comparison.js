const fs = require('fs');

const off = JSON.parse(fs.readFileSync('scripts/steve_jobs_official.en-eEY6OEpapPo.json3', 'utf8'));
const auto = JSON.parse(fs.readFileSync('scripts/steve_jobs_auto.en.json3', 'utf8'));

// Official events between 20s and 175s
const offEvents = off.events.filter(e => e.segs && e.tStartMs >= 20000 && e.tStartMs <= 175000).map(e => {
  return {
    start: e.tStartMs / 1000,
    end: (e.tStartMs + (e.dDurationMs || 0)) / 1000,
    dur: (e.dDurationMs || 0) / 1000,
    text: e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim()
  };
});

// Auto words between 20s and 175s
const autoWords = [];
auto.events.forEach(e => {
  if (e.segs) {
    e.segs.forEach(s => {
      const text = s.utf8.trim();
      if (!text || text === '\n') return;
      const start = (e.tStartMs + (s.tOffsetMs || 0)) / 1000;
      autoWords.push({ text, start });
    });
  }
});
for (let i = 0; i < autoWords.length - 1; i++) {
  autoWords[i].end = autoWords[i + 1].start;
}

console.log('=== OFFICIAL EVENTS ===');
offEvents.forEach((ev, i) => {
  console.log(`[OFF #${i}] ${ev.start.toFixed(2)}s -> ${ev.end.toFixed(2)}s (${ev.dur.toFixed(2)}s): "${ev.text}"`);
});
