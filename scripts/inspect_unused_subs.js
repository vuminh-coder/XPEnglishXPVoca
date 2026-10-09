const fs = require('fs');

function inspectJson3(filepath) {
  console.log(`\n=== INSPECTING ${filepath} ===`);
  const raw = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  console.log('Events count:', raw.events ? raw.events.length : 0);
  if (raw.events) {
    const valid = raw.events
      .filter(e => e.segs && e.segs.some(s => s.utf8 && s.utf8.trim() && s.utf8 !== '\n'))
      .slice(0, 10);
    valid.forEach((e, idx) => {
      const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
      const start = (e.tStartMs / 1000).toFixed(2);
      const dur = ((e.dDurationMs || 0) / 1000).toFixed(2);
      console.log(`[${idx}] ${start}s (dur ${dur}s): "${text}"`);
    });
  }
}

inspectJson3('scripts/bbc_brain_official.en-GB.json3');
inspectJson3('scripts/bbc_laughter_medicine.en-GB.json3');
inspectJson3('scripts/test_sub.en.json3');
