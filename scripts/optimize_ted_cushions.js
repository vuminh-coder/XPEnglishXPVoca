const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/ted_bilingual_raw.en.json3', 'utf8'));
const calibrated = JSON.parse(fs.readFileSync('scripts/ted_bilingual_18_calibrated.json', 'utf8'));

// Exact raw event groupings:
const groups = [
  [0],             // 1: ¿Hablas español?
  [1],             // 2: If you answered...
  [2],             // 3: chances are...
  [3, 4],          // 4: And besides...
  [5, 6],          // 5: knowing two...
  [7],             // 6: So what does...
  [8, 9],          // 7: Language ability...
  [10, 11],        // 8: While a balanced...
  [12, 13],        // 9: most bilinguals...
  [14, 15],        // 10: And depending...
  [16, 17],        // 11: For example, let's take...
  [18, 19, 20],    // 12: As a compound...
  [21, 22],        // 13: learning both...
  [23, 24],        // 14: Her teenage brother...
  [25, 26],        // 15: learning English...
  [27, 28, 29],    // 16: Finally, Gabriella's...
  [30, 31, 32],    // 17: Because all types...
  [33, 34, 35],    // 18: But recent advances...
];

const exactSegments = groups.map((g, idx) => {
  const firstEv = raw.events[g[0]];
  const lastEv = raw.events[g[g.length - 1]];

  const rawStartMs = firstEv.tStartMs;
  const rawEndMs = lastEv.tStartMs + (lastEv.dDurationMs || 0);

  return {
    orderIndex: idx,
    rawStart: rawStartMs / 1000,
    rawEnd: rawEndMs / 1000,
    dur: (rawEndMs - rawStartMs) / 1000
  };
});

console.log('--- EXACT RAW SPEECH BOUNDARIES ---');
exactSegments.forEach(s => {
  console.log(`[Seg #${s.orderIndex + 1}] Raw: ${s.rawStart.toFixed(3)}s -> ${s.rawEnd.toFixed(3)}s (${s.dur.toFixed(3)}s)`);
});

// Now let's calculate optimal playback intervals:
// We want:
// - Start time = rawStart - 0.05s (safe lead-in of 50ms)
// - End time = rawEnd + 0.05s (safe tail cushion of 50ms)
// But we ensure startTime of next segment is >= endTime of current segment - 0.01s (prevent overlap)

const optimized = [];
for (let i = 0; i < exactSegments.length; i++) {
  const cur = exactSegments[i];
  const prev = i > 0 ? optimized[i - 1] : null;
  const next = i < exactSegments.length - 1 ? exactSegments[i + 1] : null;

  let start = cur.rawStart - 0.04; // 40ms lead-in
  if (prev && start < prev.end) {
    // If adjacent, split cleanly at the exact midpoint
    const mid = (prev.rawEnd + cur.rawStart) / 2;
    prev.end = Number(mid.toFixed(2));
    start = Number(mid.toFixed(2));
  }

  let end = cur.rawEnd + 0.05; // 50ms tail cushion
  if (next && end > next.rawStart) {
    const mid = (cur.rawEnd + next.rawStart) / 2;
    end = Number(mid.toFixed(2));
  }

  // Segment 1 starts at 6.55s (to catch first consonant of ¿Hablas español? smoothly)
  if (i === 0) start = 6.55;

  optimized.push({
    orderIndex: i,
    start: Number(start.toFixed(2)),
    end: Number(end.toFixed(2)),
    rawStart: cur.rawStart,
    rawEnd: cur.rawEnd
  });
}

console.log('\n--- OPTIMIZED PLAYBACK INTERVALS ---');
optimized.forEach(s => {
  const leadMs = Math.round((s.rawStart - s.start) * 1000);
  const tailMs = Math.round((s.end - s.rawEnd) * 1000);
  console.log(`[Seg #${s.orderIndex + 1}] [${s.start.toFixed(2)}s -> ${s.end.toFixed(2)}s] (dur: ${(s.end - s.start).toFixed(2)}s) | lead: +${leadMs}ms, tail: +${tailMs}ms ✅`);
});

// Check overlap
for (let i = 0; i < optimized.length - 1; i++) {
  if (optimized[i].end > optimized[i + 1].start) {
    console.error(`Overlap between #${i + 1} and #${i + 2}!`);
  }
}
