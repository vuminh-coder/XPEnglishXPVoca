const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/money.en.json3', 'utf8'));

// Extract unique word timeline from json3
const words = [];
raw.events.forEach((ev) => {
  if (ev.segs) {
    ev.segs.forEach((s) => {
      const text = (s.utf8 || '').trim();
      if (text && text !== '\n') {
        const offset = s.tOffsetMs || 0;
        const start = (ev.tStartMs + offset) / 1000;
        words.push({ word: text, start });
      }
    });
  }
});

const dedupedWords = [];
words.forEach((w) => {
  const last = dedupedWords[dedupedWords.length - 1];
  if (last && last.word === w.word && Math.abs(w.start - last.start) < 0.5) {
    return;
  }
  dedupedWords.push(w);
});

// Define calibrated segments
const calibratedSegments = [
  {
    orderIndex: 0,
    startTime: 0.08,
    endTime: 5.20,
    text: "In the book, The Psychology of Money, Morgan Housel shares Warren Buffett's real secret.",
    wordCount: 14
  },
  {
    orderIndex: 1,
    startTime: 5.50,
    endTime: 8.60,
    text: "It's not stock-picking, it's patience.",
    wordCount: 5
  },
  {
    orderIndex: 2,
    startTime: 8.80,
    endTime: 13.00,
    text: "Housel explains that compound interest only works if you stay in the game.",
    wordCount: 12
  },
  {
    orderIndex: 3,
    startTime: 13.20,
    endTime: 19.00,
    text: "Most people want to get rich fast. They jump in, jump out, chase trends, and end up with nothing.",
    wordCount: 19
  },
  {
    orderIndex: 4,
    startTime: 19.00,
    endTime: 23.00,
    text: "But Buffett? He's been investing for more than 70 years.",
    wordCount: 10
  },
  {
    orderIndex: 5,
    startTime: 23.10,
    endTime: 27.00,
    text: "The magic isn't his IQ. It's that he never left the table.",
    wordCount: 12
  },
  {
    orderIndex: 6,
    startTime: 27.10,
    endTime: 33.00,
    text: "Compounding needs time, not genius. That's the lesson from The Psychology of Money.",
    wordCount: 13
  },
  {
    orderIndex: 7,
    startTime: 33.10,
    endTime: 42.00,
    text: "If you want wealth, stop rushing. Be patient. Stay consistent. That's the real secret. So master your mind, not the market.",
    wordCount: 22
  },
  {
    orderIndex: 8,
    startTime: 42.20,
    endTime: 47.50,
    text: "Comment. Do you think money is more math or behavior?",
    wordCount: 10
  }
];

function clean(w) {
  return w.toLowerCase().replace(/[^a-z0-9]/g, '');
}

console.log('--- WORD COVERAGE PER SEGMENT ---');
let curWordIdx = 0;
calibratedSegments.forEach((seg, sIdx) => {
  const segWords = seg.text.split(/\s+/).map(clean).filter(Boolean);
  const matchedWords = [];
  while (curWordIdx < dedupedWords.length && matchedWords.length < segWords.length) {
    const rawW = dedupedWords[curWordIdx];
    matchedWords.push(rawW);
    curWordIdx++;
  }
  const firstWord = matchedWords[0];
  const lastWord = matchedWords[matchedWords.length - 1];
  console.log(`Seg #${sIdx} [${seg.startTime}s - ${seg.endTime}s]:`);
  console.log(`  Spoken words: "${firstWord?.word}" (${firstWord?.start.toFixed(2)}s) -> "${lastWord?.word}" (${lastWord?.start.toFixed(2)}s)`);
  console.log(`  Segment boundaries contain all words: ${seg.startTime <= firstWord?.start && seg.endTime >= lastWord?.start}`);
});
