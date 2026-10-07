const fs = require('fs');

const sub = JSON.parse(fs.readFileSync('scripts/kurzgesagt_raw.en.json3', 'utf8'));
const lines = sub.events.filter(e => e.segs).map(e => ({
  start: e.tStartMs / 1000,
  duration: e.dDurationMs / 1000,
  end: (e.tStartMs + e.dDurationMs) / 1000,
  text: e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
})).filter(l => l.text);

const calibrated = JSON.parse(fs.readFileSync('scripts/kurzgesagt_21_calibrated.json', 'utf8'));

console.log('=== FORENSIC DEEP AUDIT FOR KURZGESAGT (21 SEGMENTS) ===');

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

let totalIssues = 0;

calibrated.forEach((seg, i) => {
  const rawIdxs = segMap[i];
  const rawStart = lines[rawIdxs[0]].start;
  const rawEnd = lines[rawIdxs[rawIdxs.length - 1]].end;
  const rawText = rawIdxs.map(idx => lines[idx].text).join(' ');

  // Lead-in check: calibrated.startTime must be <= rawStart so the first syllable is NEVER clipped
  const leadInMs = Math.round((rawStart - seg.startTime) * 1000);
  const tailBufferMs = Math.round((seg.endTime - rawEnd) * 1000);

  // Token count verification
  const actualTokens = seg.text.replace(/["\.,\?!:;]/g, '').trim().split(/\s+/).filter(Boolean).length;
  const tokenMatch = actualTokens === seg.tokenCount;

  // Normalized text verification
  const expectedNormalized = seg.text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  const normalizedMatch = seg.normalizedText.replace(/\s+/g, ' ').trim() === expectedNormalized;

  console.log(`\n[Sentence #${seg.orderIndex}]`);
  console.log(`  Audio Timing   : Calibrated [${seg.startTime.toFixed(2)}s - ${seg.endTime.toFixed(2)}s] | Raw Spoken [${rawStart.toFixed(2)}s - ${rawEnd.toFixed(2)}s]`);
  console.log(`  Lead-in Buffer : ${leadInMs} ms (${leadInMs >= 0 ? '✅ SAFE: No initial clipping' : '❌ CLIPPED'})`);
  console.log(`  Tail Buffer    : ${tailBufferMs} ms (${tailBufferMs >= 0 ? '✅ SAFE: No tail clipping' : '❌ CLIPPED'})`);
  console.log(`  Text           : "${seg.text}"`);
  console.log(`  Raw Text       : "${rawText}"`);
  console.log(`  Tokens         : ${seg.tokenCount} (Calculated: ${actualTokens}) -> ${tokenMatch ? '✅ MATCH' : '❌ MISMATCH'}`);
  console.log(`  Normalized     : ${normalizedMatch ? '✅ MATCH' : '❌ MISMATCH'}`);
  console.log(`  IPA (US)       : /${seg.ipaUs}/`);
  console.log(`  Translation    : "${seg.translationVi}"`);

  if (leadInMs < 0 || tailBufferMs < -100 || !tokenMatch || !normalizedMatch) {
    totalIssues++;
  }
});

console.log('\n======================================================');
console.log(`Total Forensic Issues Found: ${totalIssues}`);
