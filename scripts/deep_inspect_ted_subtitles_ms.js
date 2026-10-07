const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/ted_bilingual_raw.en.json3', 'utf8'));
const calibrated = JSON.parse(fs.readFileSync('scripts/ted_bilingual_18_calibrated.json', 'utf8'));

console.log('=== EXACT MILLISECOND COMPARISON: RAW YT VS CALIBRATED ===\n');

// Map raw events 0 to 35
const rawEvents = raw.events.slice(0, 36).map((e, idx) => {
  const start = e.tStartMs / 1000;
  const dur = (e.dDurationMs || 0) / 1000;
  const end = start + dur;
  const text = e.segs ? e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim() : '';
  return { idx, start, end, dur, text };
});

calibrated.forEach((cal, i) => {
  console.log(`-----------------------------------------------------------------`);
  console.log(`[Segment #${cal.orderIndex + 1}]`);
  console.log(`  Calibrated  : [${cal.startTime.toFixed(3)}s - ${cal.endTime.toFixed(3)}s] (dur: ${(cal.endTime - cal.startTime).toFixed(3)}s)`);
  console.log(`  Cal Text    : "${cal.text}"`);

  // Find corresponding raw events that make up this segment
  // Search raw events matching the text
  const matchingRaw = rawEvents.filter(r => cal.text.includes(r.text) || r.text.includes(cal.text) || (r.start >= cal.startTime - 0.5 && r.end <= cal.endTime + 0.5));
  
  if (matchingRaw.length > 0) {
    const rawStart = matchingRaw[0].start;
    const rawEnd = matchingRaw[matchingRaw.length - 1].end;
    const leadBufferMs = Math.round((rawStart - cal.startTime) * 1000);
    const tailBufferMs = Math.round((cal.endTime - rawEnd) * 1000);

    console.log(`  Raw YT Sub  : [${rawStart.toFixed(3)}s - ${rawEnd.toFixed(3)}s] (events ${matchingRaw.map(m => '#' + m.idx).join(', ')})`);
    console.log(`  Lead-in ms  : ${leadBufferMs >= 0 ? '+' : ''}${leadBufferMs}ms (${leadBufferMs < 0 ? '⚠️ CLIPPED START' : leadBufferMs === 0 ? 'Exact' : 'Safe cushion'})`);
    console.log(`  Tail ms     : ${tailBufferMs >= 0 ? '+' : ''}${tailBufferMs}ms (${tailBufferMs < 0 ? '⚠️ CLIPPED TAIL' : tailBufferMs === 0 ? 'Exact' : 'Safe cushion'})`);
    matchingRaw.forEach(m => console.log(`      Raw #${m.idx}: [${m.start.toFixed(3)}s - ${m.end.toFixed(3)}s] "${m.text}"`));
  } else {
    console.log(`  Raw YT Sub  : None found matching`);
  }
});
