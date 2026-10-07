const fs = require('fs');

const sub = JSON.parse(fs.readFileSync('scripts/kurzgesagt_raw.en.json3', 'utf8'));
const lines = sub.events.filter(e => e.segs).map(e => ({
  start: e.tStartMs / 1000,
  duration: e.dDurationMs / 1000,
  end: (e.tStartMs + e.dDurationMs) / 1000,
  text: e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
})).filter(l => l.text);

const segMap = [
  [0],
  [1, 2],
  [3, 4],
  [5, 6],
  [7],
  [8],
  [9, 10],
  [11],
  [12],
  [13],
  [14, 15],
  [16, 17],
  [18, 19],
  [20, 21, 22],
  [23],
  [24],
  [25],
  [26],
  [27, 28],
  [29],
  [30, 31, 32]
];

const calibrated = JSON.parse(fs.readFileSync('scripts/kurzgesagt_21_calibrated.json', 'utf8'));

// Calibrate each sentence with:
// - Exact lead-in (never cutting off initial consonant)
// - Exact tail cushion (never cutting off last word, within gap between sentences)
// - Exact token count matching actual words in text
const perfectSegments = calibrated.map((seg, i) => {
  const idxs = segMap[i];
  const rawStart = lines[idxs[0]].start;
  const rawEnd = lines[idxs[idxs.length - 1]].end;
  const nextRawStart = i < segMap.length - 1 ? lines[segMap[i + 1][0]].start : (rawEnd + 1.0);

  // Lead-in: give 50ms - 100ms lead-in, or for S1 start at 0.00
  let startTime = i === 0 ? 0.00 : Number(Math.max(0, rawStart - 0.08).toFixed(2));
  
  // If previous segment ends after this startTime, adjust
  // EndTime: give up to 100ms tail cushion, but stay at least 50ms before nextRawStart
  const maxPossibleEnd = nextRawStart - 0.04;
  let endTime = Number(Math.min(rawEnd + 0.10, maxPossibleEnd).toFixed(2));

  // If gap is tiny (< 0.1s), ensure no overlap
  if (endTime >= nextRawStart) {
    endTime = Number((nextRawStart - 0.02).toFixed(2));
  }

  // Exact word count
  const actualTokenCount = seg.text.replace(/["\.,\?!:;]/g, '').trim().split(/\s+/).filter(Boolean).length;

  return {
    ...seg,
    startTime,
    endTime,
    tokenCount: actualTokenCount
  };
});

// Post-check for any overlap
for (let i = 0; i < perfectSegments.length - 1; i++) {
  if (perfectSegments[i].endTime > perfectSegments[i + 1].startTime) {
    perfectSegments[i].endTime = Number((perfectSegments[i + 1].startTime - 0.01).toFixed(2));
  }
}

fs.writeFileSync('scripts/kurzgesagt_21_calibrated.json', JSON.stringify(perfectSegments, null, 2), 'utf8');
console.log('Successfully saved perfectly calibrated Kurzgesagt segments to scripts/kurzgesagt_21_calibrated.json');
