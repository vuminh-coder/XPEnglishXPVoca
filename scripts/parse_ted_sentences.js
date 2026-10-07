const fs = require('fs');

const en = JSON.parse(fs.readFileSync('scripts/ted_bilingual_raw.en.json3', 'utf8'));

// Let's inspect each event and see how punctuation ends sentences (. ? !)
let currentSentence = [];
let sentences = [];

en.events.forEach((ev, idx) => {
  const text = ev.segs ? ev.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim() : '';
  if (!text) return;

  const startMs = ev.tStartMs;
  const endMs = ev.tStartMs + (ev.dDurationMs || 0);

  currentSentence.push({ idx, text, startMs, endMs });

  // If text ends with . or ? or !
  if (/[.?!]["']?$/.test(text)) {
    sentences.push(currentSentence);
    currentSentence = [];
  }
});

if (currentSentence.length > 0) {
  sentences.push(currentSentence);
}

console.log('Total grammatical sentences found:', sentences.length);
sentences.forEach((s, i) => {
  const fullText = s.map(x => x.text).join(' ');
  const startSec = (s[0].startMs / 1000).toFixed(2);
  const endSec = (s[s.length - 1].endMs / 1000).toFixed(2);
  const durSec = ((s[s.length - 1].endMs - s[0].startMs) / 1000).toFixed(2);
  console.log(`[S${i + 1}] (${startSec}s - ${endSec}s, ${durSec}s) Events ${s[0].idx}-${s[s.length - 1].idx}:`);
  console.log(`     "${fullText}"`);
});
