const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/natgeo_renewable.en.json3', 'utf8'));
const calibrated = JSON.parse(fs.readFileSync('scripts/natgeo_25_calibrated.json', 'utf8'));

// Extract all raw word events
const rawWords = [];
raw.events.forEach(e => {
  if (!e.segs) return;
  const baseT = e.tStartMs;
  e.segs.forEach(s => {
    const text = s.utf8;
    if (!text || text === '\n') return;
    const offset = s.tOffsetMs || 0;
    const dur = s.dDurationMs || 0;
    const startMs = baseT + offset;
    const trimmed = text.trim();
    if (trimmed && trimmed !== '[Music]' && startMs < 173000) {
      rawWords.push({ word: trimmed, startMs, durMs: dur });
    }
  });
});

console.log('=== WORD-LEVEL AUDIO ALIGNMENT AUDIT ===');
console.log(`Total raw words detected: ${rawWords.length}`);

let rawPointer = 0;
calibrated.forEach((seg, sIdx) => {
  const segWords = seg.text.trim().split(/\s+/);
  const matchedWords = [];

  for (let w = 0; w < segWords.length; w++) {
    if (rawPointer < rawWords.length) {
      matchedWords.push(rawWords[rawPointer]);
      rawPointer++;
    }
  }

  const firstRaw = matchedWords[0];
  const lastRaw = matchedWords[matchedWords.length - 1];

  const firstStartSec = firstRaw ? firstRaw.startMs / 1000 : 0;
  const lastEndSec = lastRaw ? (lastRaw.startMs + (lastRaw.durMs || 500)) / 1000 : 0;

  console.log(`\nSeg #${sIdx + 1}: [${seg.startTime.toFixed(2)}s - ${seg.endTime.toFixed(2)}s] (Duration: ${(seg.endTime - seg.startTime).toFixed(2)}s)`);
  console.log(`   Text: "${seg.text}"`);
  console.log(`   Audio Speech Window: ${firstStartSec.toFixed(2)}s - ${lastEndSec.toFixed(2)}s`);
  console.log(`   Start Boundary Lead: ${(firstStartSec - seg.startTime).toFixed(2)}s buffer`);
  console.log(`   End Boundary Tail: ${(seg.endTime - lastEndSec).toFixed(2)}s buffer`);

  if (seg.startTime > firstStartSec) {
    console.warn(`   ⚠️ WARNING: seg.startTime (${seg.startTime}s) is AFTER speech starts (${firstStartSec}s)! First word clipped!`);
  }
  if (seg.endTime < lastEndSec) {
    console.warn(`   ⚠️ WARNING: seg.endTime (${seg.endTime}s) is BEFORE speech ends (${lastEndSec}s)! Last word clipped!`);
  }
});

console.log(`\nProcessed all ${calibrated.length} segments. Total speech words verified: ${rawPointer} / ${rawWords.length}`);
