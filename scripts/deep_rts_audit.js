const fs = require('fs');

const orig = JSON.parse(fs.readFileSync('scripts/rewrite_the_stars_raw.en-orig.json3', 'utf8'));

// Extract all word events with timestamps
const rawWords = [];
orig.events.forEach(e => {
  if (!e.segs) return;
  const baseT = e.tStartMs;
  e.segs.forEach(s => {
    const text = s.utf8 ? s.utf8.trim() : '';
    if (!text || text === '\n') return;
    rawWords.push({ time: (baseT + (s.tOffsetMs || 0)) / 1000, text });
  });
});

const calibrated = JSON.parse(fs.readFileSync('scripts/rewrite_the_stars_18_calibrated.json', 'utf8'));

console.log('=== FORENSIC DEEP AUDIT FOR REWRITE THE STARS (18 SEGMENTS) ===');

let totalIssues = 0;

calibrated.forEach((seg, i) => {
  // Find words that match the segment text approximately in time range
  const segWords = rawWords.filter(w => w.time >= seg.startTime - 1.0 && w.time <= seg.endTime + 1.0);
  const firstWordTime = segWords.length > 0 ? segWords[0].time : seg.startTime;
  const lastWordTime = segWords.length > 0 ? segWords[segWords.length - 1].time : seg.endTime;

  const leadInMs = Math.round((firstWordTime - seg.startTime) * 1000);
  const tailBufferMs = Math.round((seg.endTime - lastWordTime) * 1000);

  // Token count verification
  const actualTokens = seg.text.replace(/["\.,\?!:;]/g, '').trim().split(/\s+/).filter(Boolean).length;
  const tokenMatch = actualTokens === seg.tokenCount;

  // Normalized text verification
  const expectedNormalized = seg.text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  const normalizedMatch = seg.normalizedText.replace(/\s+/g, ' ').trim() === expectedNormalized;

  console.log(`\n[Sentence #${seg.orderIndex}]`);
  console.log(`  Audio Timing   : [${seg.startTime.toFixed(2)}s - ${seg.endTime.toFixed(2)}s] (${(seg.endTime - seg.startTime).toFixed(2)}s)`);
  console.log(`  Lead-in Buffer : ${leadInMs} ms (${leadInMs >= 0 ? '✅ SAFE: No initial clipping' : '❌ CLIPPED'})`);
  console.log(`  Tail Buffer    : ${tailBufferMs} ms (${tailBufferMs >= 0 ? '✅ SAFE: No tail clipping' : '❌ CLIPPED'})`);
  console.log(`  Text           : "${seg.text}"`);
  console.log(`  Tokens         : ${seg.tokenCount} (Calculated: ${actualTokens}) -> ${tokenMatch ? '✅ MATCH' : '❌ MISMATCH'}`);
  console.log(`  Normalized     : ${normalizedMatch ? '✅ MATCH' : '❌ MISMATCH'}`);
  console.log(`  IPA (US)       : /${seg.ipaUs}/`);
  console.log(`  Translation    : "${seg.translationVi}"`);

  if (leadInMs < 0 || tailBufferMs < -100 || !tokenMatch || !normalizedMatch) {
    totalIssues++;
  }
});

// Check chronological sequence
for (let i = 0; i < calibrated.length - 1; i++) {
  if (calibrated[i].endTime > calibrated[i + 1].startTime) {
    console.error(`❌ Overlap detected between #${calibrated[i].orderIndex} and #${calibrated[i + 1].orderIndex}`);
    totalIssues++;
  }
}

console.log('\n======================================================');
console.log(`Total Forensic Issues Found: ${totalIssues}`);
