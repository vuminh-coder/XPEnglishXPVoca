const fs = require('fs');

const off = JSON.parse(fs.readFileSync('scripts/steve_jobs_official.en-eEY6OEpapPo.json3', 'utf8'));
const auto = JSON.parse(fs.readFileSync('scripts/steve_jobs_auto.en.json3', 'utf8'));

// Build flat array of auto words with their start and estimate end
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
  autoWords[i].nextStart = autoWords[i + 1].start;
}

// Print official events with exact times
console.log('=== OFFICIAL SPEECH EVENTS WITH DURATIONS (22s to 175s) ===');
const relevantEvents = off.events.filter(e => e.segs && e.tStartMs >= 20000 && e.tStartMs <= 175000);
relevantEvents.forEach((e, idx) => {
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  const start = (e.tStartMs / 1000).toFixed(3);
  const end = ((e.tStartMs + (e.dDurationMs || 0)) / 1000).toFixed(3);
  console.log(`[Event #${idx}] ${start}s -> ${end}s (dur ${(e.dDurationMs/1000).toFixed(3)}s): "${text}"`);
});
